/**
 * main.js  —  App entry point & header scroll behaviour
 */

// ── Sticky header on scroll ──
const header = document.getElementById('site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 20);
  header.classList.toggle('header-hidden', y > lastScroll && y > 80);
  lastScroll = y;
}, { passive: true });

// ── Mobile nav toggle ──
const navToggle  = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  mobileMenu.classList.toggle('is-open', !open);
  mobileMenu.setAttribute('aria-hidden', String(open));
});

// Close mobile menu on link click
mobileMenu?.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }
});

// ── Active nav link highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach(s => sectionObserver.observe(s));

// ── Footer year ──
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Toast utility (global) ──
export function showToast(message, duration = 3500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  setTimeout(() => toast.classList.remove('is-visible'), duration);
}
window.showToast = showToast;
