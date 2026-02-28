/**
 * config/brands.js
 * ─────────────────
 * Central brand registry.
 * Each key is a brand identifier passed via BRAND env var or ?brand= query.
 *
 * Add a new brand: copy the `default` entry, change values, export the key.
 */

export const brands = {

  /* ─────────────────────────────────────────
     DEFAULT / TECH
     Dark, electric, developer-focused
  ──────────────────────────────────────────*/
  default: {
    companyName:  'Nexus',
    tagline:      'Build faster. Ship smarter.',
    visualStyle:  'tech',
    primaryColor: '#0f1117',
    accentColor:  '#6c63ff',
    logoUrl:      '/assets/img/logo.svg',

    hero: {
      badge:        'Now in Public Beta',
      headline:     'The platform that <em>scales</em> with you',
      subtext:      'Ship production-ready apps in hours, not months. Fully automated CI/CD, global edge delivery, and zero cold starts.',
      ctaPrimary:   'Start Building Free',
      ctaSecondary: 'View Demo',
    },

    sections: {
      featuresHeadline: 'Everything you need to ship',
      featuresSubtext:  'A complete toolkit built for modern engineering teams.',
      aboutHeadline:    'We believe great tools change everything',
      aboutBody:        'Nexus was built by engineers tired of stitching together a dozen services. We unified the entire stack so your team can focus on what matters — your product.',
      aboutCta:         'Meet the team',
    },

    stats: [
      { value: '99.99%', label: 'Uptime SLA' },
      { value: '200ms',  label: 'P99 Latency' },
      { value: '50K+',   label: 'Developers' },
    ],

    features: [
      { icon: '⚡', title: 'Instant Deployments',    description: 'Push to production in under 60 seconds with atomic rollbacks and zero downtime.' },
      { icon: '🔒', title: 'Enterprise Security',    description: 'SOC 2 Type II certified with end-to-end encryption and RBAC built in from day one.' },
      { icon: '🌍', title: 'Global Edge Network',    description: 'Your app runs on 300+ edge nodes worldwide. CDN, compute, and storage unified.' },
      { icon: '📊', title: 'Real-time Analytics',    description: 'Dashboards that actually make sense. From p99 latency to error rates — all in one place.' },
      { icon: '🔗', title: 'Third-party Integrations', description: 'Connect GitHub, Slack, PagerDuty, Datadog and 100+ more with a single click.' },
      { icon: '🤖', title: 'AI-powered Insights',    description: 'Anomaly detection and predictive autoscaling powered by ML trained on your traffic patterns.' },
    ],

    navLinks: [
      { label: 'Features',  href: '#features' },
      { label: 'Pricing',   href: '#pricing'  },
      { label: 'Docs',      href: '/docs'     },
      { label: 'Blog',      href: '/blog'     },
    ],

    socialLinks: [
      { platform: 'Twitter',  url: 'https://twitter.com/' },
      { platform: 'GitHub',   url: 'https://github.com/' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/' },
    ],
  },

  /* ─────────────────────────────────────────
     RETAIL
     Warm, vibrant, product-focused
  ──────────────────────────────────────────*/
  retail: {
    companyName:  'Lumière',
    tagline:      'Curated style, delivered to your door.',
    visualStyle:  'retail',
    primaryColor: '#fff8f5',
    accentColor:  '#ff5722',
    logoUrl:      '/assets/img/logo-retail.svg',

    hero: {
      badge:        'Free Shipping on Orders $75+',
      headline:     'Style that speaks <em>for you</em>',
      subtext:      'Discover hand-picked collections from independent designers worldwide. Ethically sourced, beautifully crafted.',
      ctaPrimary:   'Shop New Arrivals',
      ctaSecondary: 'Explore Lookbook',
    },

    sections: {
      featuresHeadline: 'Why customers love us',
      featuresSubtext:  'More than a store — a shopping experience designed around you.',
      aboutHeadline:    'Fashion that feels good',
      aboutBody:        'Lumière was born from a belief that style and sustainability aren't opposites. Every piece in our collection is ethically produced and designed to last.',
      aboutCta:         'Our story',
    },

    stats: [
      { value: '4.9★', label: 'Customer Rating' },
      { value: '30K+', label: 'Happy Shoppers' },
      { value: '100%', label: 'Ethically Sourced' },
    ],

    features: [
      { icon: '🚚', title: 'Free & Fast Delivery',  description: 'Free shipping on orders over $75. Express options available. Real-time tracking included.' },
      { icon: '↩',  title: 'Hassle-free Returns',   description: 'Not the right fit? Return or exchange within 60 days, no questions asked.' },
      { icon: '🌿', title: 'Sustainable Sourcing',  description: 'Every garment is verified fair trade. We audit every supplier in our chain.' },
      { icon: '✂',  title: 'Exclusive Designs',     description: 'Collaborations with independent designers you won't find anywhere else.' },
      { icon: '💌', title: 'Loyalty Rewards',       description: 'Earn points on every purchase. Redeem for discounts, early access, and free gifts.' },
      { icon: '🎁', title: 'Gift Wrapping',         description: 'Complimentary gift wrapping with a personalised message for any order.' },
    ],

    navLinks: [
      { label: 'New In',     href: '#features' },
      { label: 'Collections', href: '#about'   },
      { label: 'About',      href: '#about'    },
      { label: 'Contact',    href: '#contact'  },
    ],

    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/' },
      { platform: 'TikTok',    url: 'https://tiktok.com/'    },
      { platform: 'Pinterest', url: 'https://pinterest.com/' },
    ],
  },

  /* ─────────────────────────────────────────
     FINANCE
     Authoritative, clean, trustworthy
  ──────────────────────────────────────────*/
  finance: {
    companyName:  'Meridian',
    tagline:      'Wealth management, reimagined.',
    visualStyle:  'finance',
    primaryColor: '#f5f7fa',
    accentColor:  '#0d7c66',
    logoUrl:      '/assets/img/logo-finance.svg',

    hero: {
      badge:        'FCA Regulated & FDIC Insured',
      headline:     'Your money, <em>working harder</em>',
      subtext:      'Intelligent investment strategies, personalised to your goals. Start with as little as $100 and watch your wealth grow.',
      ctaPrimary:   'Open an Account',
      ctaSecondary: 'View Returns',
    },

    sections: {
      featuresHeadline: 'Built for the long game',
      featuresSubtext:  'Every feature designed to protect and grow your wealth.',
      aboutHeadline:    'Trusted by over 200,000 investors',
      aboutBody:        'Meridian combines decades of institutional expertise with the transparency and accessibility of a modern fintech. Your financial future deserves both.',
      aboutCta:         'Our approach',
    },

    stats: [
      { value: '$4.2B',  label: 'Assets Managed' },
      { value: '18.3%',  label: 'Avg Annual Return' },
      { value: '200K+',  label: 'Active Investors' },
    ],

    features: [
      { icon: '📈', title: 'Smart Portfolios',       description: 'Algorithm-driven, automatically rebalanced portfolios aligned to your risk tolerance.' },
      { icon: '🛡', title: 'Capital Protection',      description: 'Downside protection strategies and diversified holdings to guard against volatility.' },
      { icon: '💰', title: 'Tax-loss Harvesting',    description: 'Automated tax optimisation that saves the average investor 1.2% per year.' },
      { icon: '📱', title: 'Real-time Dashboard',    description: 'Monitor performance, dividends, and risk metrics from any device, anytime.' },
      { icon: '🤝', title: 'Human Advisors',         description: 'Access certified financial planners for quarterly reviews and major life decisions.' },
      { icon: '🔐', title: '256-bit Encryption',     description: 'Bank-grade security, two-factor authentication, and biometric login on mobile.' },
    ],

    navLinks: [
      { label: 'Invest',   href: '#features' },
      { label: 'Pricing',  href: '#pricing'  },
      { label: 'About',    href: '#about'    },
      { label: 'Contact',  href: '#contact'  },
    ],

    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/' },
      { platform: 'Twitter',  url: 'https://twitter.com/' },
    ],
  },

  /* ─────────────────────────────────────────
     CREATIVE / AGENCY
     Bold, expressive, portfolio-led
  ──────────────────────────────────────────*/
  creative: {
    companyName:  'Studio Vex',
    tagline:      'We make things people talk about.',
    visualStyle:  'creative',
    primaryColor: '#0c0010',
    accentColor:  '#ff2d78',
    logoUrl:      '/assets/img/logo-creative.svg',

    hero: {
      badge:        'Open for 2025 Projects',
      headline:     'We turn ideas into<br><em>experiences</em>',
      subtext:      'Award-winning design, motion, and digital experiences for brands that refuse to be ignored.',
      ctaPrimary:   'See Our Work',
      ctaSecondary: 'Start a Project',
    },

    sections: {
      featuresHeadline: 'What we do best',
      featuresSubtext:  'Full-service creative from strategy to delivery.',
      aboutHeadline:    'We are Studio Vex',
      aboutBody:        'A collective of designers, directors, and strategists who believe great creative work changes how people feel about brands. No templates, no shortcuts.',
      aboutCta:         'Meet the team',
    },

    features: [
      { icon: '🎨', title: 'Brand Identity',   description: 'Logos, type systems, and visual languages that carve out unmistakable territory in any market.' },
      { icon: '✦',  title: 'Motion Design',    description: 'Film, 3D, and interactive experiences that stop the scroll and demand attention.' },
      { icon: '💻', title: 'Digital Products', description: 'Apps and websites built around human behaviour, tested obsessively until they delight.' },
      { icon: '📸', title: 'Photography',      description: 'Original photography and art direction with a consistent, editorial point of view.' },
      { icon: '📢', title: 'Campaign Strategy', description: 'Integrated campaigns across social, OOH, and digital that actually move the needle.' },
      { icon: '🔊', title: 'Sound Design',     description: 'Sonic identities and custom sound design that complete the sensory brand picture.' },
    ],

    navLinks: [
      { label: 'Work',    href: '#features' },
      { label: 'Services', href: '#about'   },
      { label: 'About',   href: '#about'    },
      { label: 'Contact', href: '#contact'  },
    ],

    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/' },
      { platform: 'Twitter',   url: 'https://twitter.com/'   },
      { platform: 'Dribbble',  url: 'https://dribbble.com/'  },
    ],
  },

  /* ─────────────────────────────────────────
     HEALTH / WELLNESS
  ──────────────────────────────────────────*/
  health: {
    companyName:  'Vela',
    tagline:      'Wellness, guided by science.',
    visualStyle:  'health',
    primaryColor: '#f0faf8',
    accentColor:  '#2a9d8f',
    logoUrl:      '/assets/img/logo-health.svg',

    hero: {
      badge:        'Backed by 40+ Clinical Studies',
      headline:     'Your healthiest self<br><em>starts here</em>',
      subtext:      'Personalised nutrition plans, expert coaching, and evidence-based programmes designed around your unique biology.',
      ctaPrimary:   'Get Your Plan',
      ctaSecondary: 'How it Works',
    },

    sections: {
      featuresHeadline: 'Science-backed, human-centred',
      featuresSubtext:  'Everything you need for lasting, meaningful change.',
      aboutHeadline:    'Health that lasts',
      aboutBody:        'Vela was founded by nutritionists and researchers who were frustrated by the wellness industry\'s obsession with quick fixes. We believe in sustainable change, backed by real science.',
      aboutCta:         'Our science',
    },

    features: [
      { icon: '🧬', title: 'DNA-based Nutrition',  description: 'Upload your genetic data for hyper-personalised macro and micronutrient recommendations.' },
      { icon: '🧘', title: 'Expert Coaches',       description: 'Licensed nutritionists and fitness coaches available 7 days a week via in-app messaging.' },
      { icon: '📱', title: 'Smart Tracking',       description: 'Log meals with AI-powered photo recognition. Track sleep, stress, and activity in one app.' },
      { icon: '🔬', title: 'Lab Testing at Home',  description: 'Quarterly blood panels delivered to your door. Results interpreted by your care team.' },
      { icon: '🌱', title: 'Plant-forward Plans',  description: 'Evidence-based plant-rich protocols that improve metabolic markers within 12 weeks.' },
      { icon: '💤', title: 'Sleep Optimisation',   description: 'Personalised wind-down routines and sleep environment coaching for deeper, restorative rest.' },
    ],

    navLinks: [
      { label: 'How it Works', href: '#features' },
      { label: 'Science',      href: '#about'    },
      { label: 'Pricing',      href: '#pricing'  },
      { label: 'Contact',      href: '#contact'  },
    ],

    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/' },
      { platform: 'Twitter',   url: 'https://twitter.com/'   },
      { platform: 'LinkedIn',  url: 'https://linkedin.com/'  },
    ],
  },
};
