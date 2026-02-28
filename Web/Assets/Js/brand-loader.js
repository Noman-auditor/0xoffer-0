/**
 * brand-loader.js
 * ───────────────
 * Reads the brand config injected by the server into
 * <script id="brand-config"> and applies all dynamic
 * brand customisations to the DOM without a framework.
 *
 * Usage: imported as a module in index.html
 */

export const Brand = (() => {
  /* ── 1. Parse config from script tag ── */
  function loadConfig() {
    const tag = document.getElementById('brand-config');
    if (!tag) throw new Error('[Brand] Missing #brand-config script tag');
    try {
      return JSON.parse(tag.textContent);
    } catch (e) {
      throw new Error('[Brand] Invalid JSON in brand config: ' + e.message);
    }
  }

  /* ── 2. Apply CSS variable overrides from config ── */
  function applyColorTokens(config) {
    const root = document.documentElement;
    if (config.primaryColor) {
      root.style.setProperty('--color-accent', config.primaryColor);
    }
    if (config.accentColor) {
      root.style.setProperty('--color-accent-hover', config.accentColor);
      // Auto-generate glow from accent
      root.style.setProperty(
        '--color-accent-glow',
        hexToRgba(config.accentColor, 0.3)
      );
    }
    if (config.bgColor)      root.style.setProperty('--color-bg', config.bgColor);
    if (config.surfaceColor) root.style.setProperty('--color-surface', config.surfaceColor);
    if (config.textColor)    root.style.setProperty('--color-text', config.textColor);

    // Font overrides
    if (config.fontDisplay) {
      root.style.setProperty('--font-display', `'${config.fontDisplay}', sans-serif`);
    }
    if (config.fontBody) {
      root.style.setProperty('--font-body', `'${config.fontBody}', sans-serif`);
    }
  }

  /* ── 3. Apply visual style class to <body> ── */
  function applyVisualStyle(visualStyle) {
    if (!visualStyle) return;
    document.body.className = document.body.className
      .replace(/\bstyle-\S+/g, '')
      .trim();
    document.body.classList.add(`style-${visualStyle}`);
  }

  /* ── 4. Populate navigation links ── */
  function buildNav(navLinks) {
    const desktopList  = document.getElementById('nav-links');
    const mobileList   = document.getElementById('mobile-nav-links');
    const footerList   = document.getElementById('footer-nav-links');
    if (!navLinks?.length) return;

    const makeItem = (link) => {
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href        = link.href;
      a.textContent = link.label;
      if (link.external) {
        a.target = '_blank';
        a.rel    = 'noopener noreferrer';
      }
      li.appendChild(a);
      return li;
    };

    navLinks.forEach(link => {
      desktopList?.appendChild(makeItem(link));
      mobileList?.appendChild(makeItem(link));
      footerList?.appendChild(makeItem(link));
    });
  }

  /* ── 5. Build feature cards ── */
  function buildFeatures(features) {
    const grid = document.getElementById('features-grid');
    if (!grid || !features?.length) return;

    features.forEach((feat, i) => {
      const card = document.createElement('article');
      card.className = 'feature-card';
      card.setAttribute('role', 'listitem');
      card.style.transitionDelay = `${i * 80}ms`;

      card.innerHTML = `
        <div class="feature-icon" aria-hidden="true">${feat.icon || '✦'}</div>
        <h3 class="feature-title">${escapeHtml(feat.title)}</h3>
        <p class="feature-desc">${escapeHtml(feat.description)}</p>
        ${feat.link ? `<a class="feature-link" href="${escapeHtml(feat.link)}">Learn more →</a>` : ''}
      `;

      grid.appendChild(card);
    });
  }

  /* ── 6. Build social links in footer ── */
  function buildSocialLinks(socialLinks) {
    const container = document.getElementById('footer-social');
    if (!container || !socialLinks?.length) return;

    const ICONS = {
      twitter:  '𝕏',
      x:        '𝕏',
      linkedin: 'in',
      github:   '⌥',
      instagram:'◎',
      youtube:  '▶',
      facebook: 'f',
      tiktok:   '♩',
    };

    socialLinks.forEach(social => {
      const a = document.createElement('a');
      a.className  = 'social-link';
      a.href       = social.url;
      a.target     = '_blank';
      a.rel        = 'noopener noreferrer';
      a.setAttribute('aria-label', social.platform);
      a.textContent = ICONS[social.platform.toLowerCase()] || social.platform[0].toUpperCase();
      container.appendChild(a);
    });
  }

  /* ── 7. Populate hero stats ── */
  function buildHeroStats(stats) {
    const container = document.getElementById('hero-stats');
    if (!container || !stats?.length) return;

    stats.forEach(stat => {
      const div = document.createElement('div');
      div.className = 'hero-stat';
      div.innerHTML = `
        <div class="hero-stat-number">${escapeHtml(stat.value)}</div>
        <div class="hero-stat-label">${escapeHtml(stat.label)}</div>
      `;
      container.appendChild(div);
    });
  }

  /* ── 8. Populate text placeholders ── */
  function applyTextContent(config) {
    const setText = (id, val) => {
      const el = document.getElementById(id);
      if (el && val) el.textContent = val;
    };
    const setHtml = (id, val) => {
      const el = document.getElementById(id);
      if (el && val) el.innerHTML = val;
    };

    setText('nav-logo-text',    config.companyName);
    setText('footer-logo-text', config.companyName);
    setText('footer-tagline',   config.tagline);
    setText('footer-company-name', config.companyName);
    setText('hero-badge-text',  config.heroBadge);
    setHtml('hero-heading',     config.heroHeadline);
    setText('hero-subtext',     config.heroSubtext);
    setText('hero-cta-primary',    config.heroCtaPrimary   || 'Get Started');
    setText('hero-cta-secondary',  config.heroCtaSecondary || 'Learn More');
    setText('nav-cta-primary',     config.navCtaPrimary    || 'Get Started');
    setText('features-heading', config.featuresHeadline);
    setText('features-subtext', config.featuresSubtext);
    setText('about-heading',    config.aboutHeadline);
    setText('about-body',       config.aboutBody);
    setText('about-cta',        config.aboutCta || 'Learn More');

    // Page title
    if (config.companyName || config.tagline) {
      document.title = [config.companyName, config.tagline]
        .filter(Boolean).join(' — ');
    }

    // Logo image
    const logoImg = document.getElementById('nav-logo-img');
    if (logoImg && config.logoUrl) {
      logoImg.src = config.logoUrl;
      logoImg.alt = config.companyName + ' logo';
    } else if (logoImg) {
      logoImg.style.display = 'none';
    }
  }

  /* ── 9. Hero visual mockup per style ── */
  function buildHeroMockup(visualStyle) {
    const mockup = document.getElementById('hero-mockup');
    if (!mockup) return;

    const MOCKUPS = {
      tech: `
        <div style="padding:20px;height:100%;background:var(--color-surface);display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;gap:6px;align-items:center;padding-bottom:12px;border-bottom:1px solid var(--color-border);">
            <div style="width:10px;height:10px;border-radius:50%;background:#ef4444;"></div>
            <div style="width:10px;height:10px;border-radius:50%;background:#f59e0b;"></div>
            <div style="width:10px;height:10px;border-radius:50%;background:#22c55e;"></div>
            <div style="flex:1;height:20px;background:var(--color-surface-2);border-radius:4px;margin-left:8px;"></div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 2fr;gap:12px;flex:1;">
            <div style="background:var(--color-surface-2);border-radius:8px;"></div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div class="skeleton" style="height:14px;width:70%;border-radius:4px;"></div>
              <div class="skeleton" style="height:14px;width:90%;border-radius:4px;"></div>
              <div class="skeleton" style="height:14px;width:60%;border-radius:4px;"></div>
              <div style="margin-top:8px;padding:12px;background:var(--color-accent-glow);border:1px solid var(--color-border);border-radius:8px;font-size:11px;color:var(--color-accent);font-family:var(--font-mono);">
                $ npm run deploy ✓
              </div>
            </div>
          </div>
        </div>`,
      retail: `
        <div style="padding:20px;height:100%;background:var(--color-surface);display:grid;grid-template-columns:repeat(2,1fr);gap:10px;align-content:start;">
          ${[...Array(6)].map(() => `
            <div style="background:var(--color-surface-2);border-radius:8px;padding:10px;">
              <div style="width:100%;aspect-ratio:1;background:var(--color-border);border-radius:4px;margin-bottom:6px;"></div>
              <div class="skeleton" style="height:10px;width:80%;border-radius:3px;margin-bottom:4px;"></div>
              <div style="color:var(--color-accent);font-size:12px;font-weight:700;">$49.99</div>
            </div>`).join('')}
        </div>`,
      finance: `
        <div style="padding:20px;height:100%;background:var(--color-surface);">
          <div style="margin-bottom:12px;font-family:var(--font-display);font-size:14px;font-weight:600;color:var(--color-text);">Portfolio Overview</div>
          <div style="background:var(--color-surface-2);border-radius:8px;padding:12px;margin-bottom:10px;">
            <div style="font-size:11px;color:var(--color-text-muted);margin-bottom:4px;">Total Value</div>
            <div style="font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--color-text);">$248,540</div>
            <div style="font-size:11px;color:var(--color-success);margin-top:2px;">▲ 12.4% this month</div>
          </div>
          <div style="height:80px;background:var(--color-surface-2);border-radius:8px;display:flex;align-items:flex-end;padding:10px;gap:4px;">
            ${[40,60,45,80,65,90,75,100,85,95].map(h => 
              `<div style="flex:1;height:${h}%;background:var(--color-accent);border-radius:2px 2px 0 0;opacity:0.7;"></div>`
            ).join('')}
          </div>
        </div>`,
      default: `
        <div style="padding:20px;height:100%;background:var(--color-surface);display:flex;flex-direction:column;gap:10px;">
          <div class="skeleton" style="height:160px;border-radius:8px;"></div>
          <div class="skeleton" style="height:14px;width:75%;border-radius:4px;"></div>
          <div class="skeleton" style="height:14px;width:55%;border-radius:4px;"></div>
          <div style="margin-top:auto;display:flex;gap:8px;">
            <div style="flex:1;height:36px;background:var(--color-accent);border-radius:18px;"></div>
            <div style="flex:1;height:36px;background:var(--color-border);border-radius:18px;"></div>
          </div>
        </div>`,
    };

    mockup.innerHTML = MOCKUPS[visualStyle] || MOCKUPS.default;
  }

  /* ── Helpers ── */
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function hexToRgba(hex, alpha) {
    if (!hex || !hex.startsWith('#')) return `rgba(108,99,255,${alpha})`;
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  /* ── Public init ── */
  function init() {
    const config = loadConfig();
    window.BRAND = config; // expose globally for other modules

    applyVisualStyle(config.visualStyle);
    applyColorTokens(config);
    applyTextContent(config);
    buildNav(config.navLinks);
    buildFeatures(config.features);
    buildSocialLinks(config.socialLinks);
    buildHeroStats(config.stats);
    buildHeroMockup(config.visualStyle);

    document.getElementById('footer-year').textContent = new Date().getFullYear();

    console.log(`[Brand] Loaded: ${config.companyName} (${config.visualStyle})`);
  }

  return { init, loadConfig };
})();

// Auto-initialise
Brand.init();
