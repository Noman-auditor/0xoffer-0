/**
 * animations.js  —  Intersection Observer-based scroll reveals
 */

// ── Animate-in elements ──
const animateEls = document.querySelectorAll('.animate-in');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('is-visible'), Number(delay));
      revealObserver.unobserve(el);
    });
  },
  { threshold: 0.15 }
);

animateEls.forEach(el => revealObserver.observe(el));

// ── Feature card stagger ──
const cardObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      cardObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.1 }
);

// Observe cards after brand-loader has injected them
requestAnimationFrame(() => {
  document.querySelectorAll('.feature-card').forEach(card => {
    cardObserver.observe(card);
  });
});

// ── Smooth counter animation for hero stats ──
function animateCounter(el, target, duration = 1800) {
  const isString = isNaN(target.replace(/[^0-9.]/g, ''));
  if (isString) return;

  const suffix = target.replace(/[0-9.]/g, '');
  const num    = parseFloat(target);
  const start  = performance.now();

  function tick(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const current  = Math.round(num * ease * 10) / 10;
    el.textContent = (Number.isInteger(num) ? Math.round(current) : current) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.hero-stat-number').forEach(el => {
        animateCounter(el, el.textContent.trim());
      });
      statsObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

const heroStats = document.getElementById('hero-stats');
if (heroStats) statsObserver.observe(heroStats);
