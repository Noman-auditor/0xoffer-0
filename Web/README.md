# Brandable Web Template

A production-ready, modular frontend + backend template. Swap brands with a single environment variable. Zero build step required.

---

## Quick Start

```bash
npm install
npm run dev          # runs on http://localhost:3000
```

### Switch brands instantly
```bash
BRAND=retail   npm start    # Retail / e-commerce
BRAND=finance  npm start    # Finance / fintech
BRAND=creative npm start    # Creative agency
BRAND=health   npm start    # Health & wellness
```
Or preview via URL: `http://localhost:3000/?brand=retail`

---

## Project Structure

```
web-template/
├── index.html                 # Master HTML template (token-based)
├── server.js                  # Express server + SSR brand injection
├── package.json
├── .env.example
│
├── assets/
│   ├── css/
│   │   ├── base.css           # Design tokens, reset, typography
│   │   ├── components.css     # All UI component styles
│   │   └── animations.css     # Keyframes & scroll reveals
│   ├── js/
│   │   ├── brand-loader.js    # Reads brand config, renders dynamic content
│   │   ├── animations.js      # IntersectionObserver-based reveals
│   │   ├── forms.js           # Contact form validation & submission
│   │   ├── components.js      # Shared component helpers
│   │   └── main.js            # App entry, nav, toast
│   └── img/                   # Brand logos (logo.svg, logo-retail.svg, …)
│
├── config/
│   └── brands.js              # ← ADD NEW BRANDS HERE
│
├── middleware/
│   └── validate.js            # Joi request validation middleware
│
├── schemas/
│   └── contact.js             # Contact form Joi schema
│
├── services/
│   └── mailer.js              # Email abstraction (Resend/SendGrid/SMTP)
│
└── utils/
    └── logger.js              # Minimal structured logger
```

---

## Adding a New Brand

1. Open `config/brands.js`
2. Copy the `default` entry and add a new key:

```js
export const brands = {
  // ...existing brands...

  mycorp: {
    companyName:  'MyCorp',
    tagline:      'Your tagline here.',
    visualStyle:  'tech',          // tech | retail | finance | creative | health
    primaryColor: '#0a0b0f',
    accentColor:  '#00d4ff',
    logoUrl:      '/assets/img/logo-mycorp.svg',

    hero: {
      badge:        'Launching Soon',
      headline:     'Your bold hero headline',
      subtext:      'Supporting description text.',
      ctaPrimary:   'Get Started',
      ctaSecondary: 'Learn More',
    },

    features: [
      { icon: '⚡', title: 'Feature One', description: 'Description here.' },
      // ...
    ],

    // navLinks, socialLinks, stats, sections...
  },
};
```

3. Run `BRAND=mycorp npm start`

---

## Custom Visual Styles

Visual styles are CSS classes applied to `<body>` with token overrides in `base.css`:

| Class              | Palette       | Best For            |
|--------------------|---------------|---------------------|
| `style-tech`       | Dark / purple | SaaS, developer     |
| `style-retail`     | Warm / orange | E-commerce, fashion |
| `style-finance`    | Light / green | Fintech, insurance  |
| `style-creative`   | Dark / pink   | Agencies, portfolio |
| `style-health`     | Mint / teal   | Wellness, health    |

To add a new style, add a CSS block in `base.css`:
```css
.style-mycustom {
  --color-accent:   #your-color;
  --color-bg:       #your-bg;
  --color-text:     #your-text;
  /* etc. */
}
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```
PORT=3000
NODE_ENV=development
BRAND=default

CONTACT_EMAIL=hello@yourcompany.com

# Email provider (pick one):
MAIL_PROVIDER=console     # dev: logs to console
# MAIL_PROVIDER=resend
# RESEND_API_KEY=re_xxx

# MAIL_PROVIDER=sendgrid
# SENDGRID_API_KEY=SG.xxx

# MAIL_PROVIDER=nodemailer
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=user@example.com
# SMTP_PASS=secret

CORS_ORIGIN=https://yourdomain.com
```

---

## API Endpoints

| Method | Path             | Description               |
|--------|------------------|---------------------------|
| GET    | `/`              | Branded HTML page         |
| GET    | `/api/brand`     | Active brand config JSON  |
| GET    | `/api/brands`    | List all brand keys       |
| POST   | `/api/contact`   | Contact form submission   |
| POST   | `/api/newsletter`| Newsletter signup (stub)  |

---

## Deployment

**Node.js (any VPS / Railway / Render):**
```bash
NODE_ENV=production BRAND=retail npm start
```

**Docker:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci --omit=dev
ENV NODE_ENV=production PORT=3000
CMD ["node", "server.js"]
```

**Vercel / Netlify** — export as static after rendering, or use the serverless adapter.

---

## License

MIT
