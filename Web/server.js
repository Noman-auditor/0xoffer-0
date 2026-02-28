/**
 * server.js  —  Express backend for the brandable web template
 * ─────────────────────────────────────────────────────────────
 * Handles:
 *  • Brand config injection into HTML (server-side templating)
 *  • REST API routes (/api/contact, /api/brand)
 *  • Static file serving
 *  • Environment-based brand switching
 *
 * Usage:
 *   node server.js                      → uses default brand
 *   BRAND=retail node server.js         → retail theme
 *   BRAND=finance node server.js        → finance theme
 */

import express        from 'express';
import path           from 'path';
import { fileURLToPath } from 'url';
import fs             from 'fs/promises';
import rateLimit      from 'express-rate-limit';
import helmet         from 'helmet';
import cors           from 'cors';
import { brands }     from './config/brands.js';
import { validate }   from './middleware/validate.js';
import { contactSchema } from './schemas/contact.js';
import { mailer }     from './services/mailer.js';
import { logger }     from './utils/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app       = express();
const PORT      = process.env.PORT || 3000;
const BRAND_KEY = process.env.BRAND || 'default';

// ════════════════════════════════════════════
//  MIDDLEWARE
// ════════════════════════════════════════════

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", "'unsafe-inline'"],  // tighten in prod
      styleSrc:    ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc:     ["'self'", 'https://fonts.gstatic.com'],
      imgSrc:      ["'self'", 'data:', 'https:'],
      connectSrc:  ["'self'"],
    }
  }
}));

app.use(cors({
  origin:  process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST'],
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max:      50,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { error: 'Too many requests, please try again later.' },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max:      10,
  message: { error: 'Too many contact requests. Please try again later.' },
});

app.use('/api', apiLimiter);
app.use(express.static(path.join(__dirname, '.')));

// ════════════════════════════════════════════
//  BRAND TEMPLATE INJECTION
// ════════════════════════════════════════════

/**
 * Reads index.html and replaces all {{PLACEHOLDER}} tokens
 * with values from the active brand config.
 */
async function renderBrandedHtml(brand) {
  const templatePath = path.join(__dirname, 'index.html');
  let html = await fs.readFile(templatePath, 'utf-8');

  const replacements = {
    '{{COMPANY_NAME}}':      brand.companyName,
    '{{TAGLINE}}':           brand.tagline,
    '{{VISUAL_STYLE}}':      brand.visualStyle,
    '{{PRIMARY_COLOR}}':     brand.primaryColor,
    '{{ACCENT_COLOR}}':      brand.accentColor,
    '{{LOGO_URL}}':          brand.logoUrl || '/assets/img/logo.svg',
    '{{HERO_HEADLINE}}':     brand.hero?.headline || `Welcome to ${brand.companyName}`,
    '{{HERO_SUBTEXT}}':      brand.hero?.subtext  || brand.tagline,
    '{{HERO_CTA_PRIMARY}}':  brand.hero?.ctaPrimary  || 'Get Started',
    '{{HERO_CTA_SECONDARY}}':brand.hero?.ctaSecondary || 'Learn More',
    '{{HERO_BADGE_TEXT}}':   brand.hero?.badge || 'Now Live',
    '{{FEATURES_HEADLINE}}': brand.sections?.featuresHeadline || 'Everything you need',
    '{{FEATURES_SUBTEXT}}':  brand.sections?.featuresSubtext  || '',
    '{{ABOUT_HEADLINE}}':    brand.sections?.aboutHeadline    || `About ${brand.companyName}`,
    '{{ABOUT_BODY}}':        brand.sections?.aboutBody        || '',
    '{{FEATURES_JSON}}':     JSON.stringify(brand.features    || []),
    '{{SOCIAL_LINKS_JSON}}': JSON.stringify(brand.socialLinks || []),
  };

  Object.entries(replacements).forEach(([token, value]) => {
    html = html.replaceAll(token, value ?? '');
  });

  // Inject full brand config as JSON (for brand-loader.js)
  const configScript = `<script id="brand-config" type="application/json">
${JSON.stringify(brand, null, 2)}
</script>`;
  html = html.replace(
    /<script id="brand-config"[\s\S]*?<\/script>/,
    configScript
  );

  return html;
}

// ════════════════════════════════════════════
//  PAGE ROUTES
// ════════════════════════════════════════════

/**
 * GET /
 * Serve the branded index page
 */
app.get('/', async (req, res) => {
  try {
    // Allow ?brand= query param to switch brands (useful for previewing)
    const brandKey = req.query.brand || BRAND_KEY;
    const brand    = brands[brandKey] || brands.default;
    const html     = await renderBrandedHtml(brand);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');  // use CDN cache in prod
    res.send(html);
  } catch (err) {
    logger.error('Page render error:', err);
    res.status(500).send('<h1>Internal Server Error</h1>');
  }
});

// ════════════════════════════════════════════
//  API ROUTES
// ════════════════════════════════════════════

/**
 * GET /api/brand
 * Returns the active brand config (useful for SPAs)
 */
app.get('/api/brand', (req, res) => {
  const brandKey = req.query.brand || BRAND_KEY;
  const brand    = brands[brandKey] || brands.default;
  const { ...publicBrand } = brand; // strip any secret keys if needed
  res.json({ brand: publicBrand });
});

/**
 * GET /api/brands
 * Lists available brand keys
 */
app.get('/api/brands', (req, res) => {
  res.json({ brands: Object.keys(brands) });
});

/**
 * POST /api/contact
 * Processes contact form submissions
 */
app.post('/api/contact',
  contactLimiter,
  validate(contactSchema),
  async (req, res) => {
    const { name, email, message } = req.body;

    try {
      await mailer.send({
        to:      process.env.CONTACT_EMAIL || 'hello@example.com',
        subject: `New contact from ${name}`,
        text:    `Name: ${name}\nEmail: ${email}\n\n${message}`,
        replyTo: email,
      });

      logger.info(`Contact form submitted by ${email}`);
      res.status(200).json({ message: 'Message received. We will be in touch soon.' });

    } catch (err) {
      logger.error('Mailer error:', err);
      res.status(500).json({ error: 'Could not send message. Please try again.' });
    }
  }
);

/**
 * POST /api/newsletter
 * Newsletter subscription endpoint (stub — plug in your email provider)
 */
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required.' });
  }
  // TODO: integrate Mailchimp / ConvertKit / Resend etc.
  logger.info(`Newsletter signup: ${email}`);
  res.status(200).json({ message: 'Subscribed successfully.' });
});

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ error: 'Not found.' });
});

// ── Global error handler ──
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error.'
      : err.message,
  });
});

// ════════════════════════════════════════════
//  START
// ════════════════════════════════════════════
app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT} [brand: ${BRAND_KEY}]`);
});

export default app;
