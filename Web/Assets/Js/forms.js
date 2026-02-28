/**
 * forms.js  —  Contact form validation & submission
 */

const form    = document.getElementById('contact-form');
const success = document.getElementById('form-success');
const submit  = document.getElementById('contact-submit');

if (!form) throw new Error('[Forms] contact-form not found');

// ── Validators ──
const validators = {
  name: v => {
    if (!v.trim()) return 'Full name is required.';
    if (v.trim().length < 2) return 'Name must be at least 2 characters.';
    return null;
  },
  email: v => {
    if (!v.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address.';
    return null;
  },
  message: v => {
    if (!v.trim()) return 'Message is required.';
    if (v.trim().length < 10) return 'Message must be at least 10 characters.';
    return null;
  },
};

function setError(fieldName, message) {
  const input = form.querySelector(`[name="${fieldName}"]`);
  const errEl = document.getElementById(`error-${fieldName}`);
  if (!input || !errEl) return;
  if (message) {
    input.classList.add('is-error');
    errEl.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', `error-${fieldName}`);
  } else {
    input.classList.remove('is-error');
    errEl.textContent = '';
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
  }
}

function validateAll(data) {
  let valid = true;
  Object.entries(validators).forEach(([field, fn]) => {
    const err = fn(data[field] || '');
    setError(field, err);
    if (err) valid = false;
  });
  return valid;
}

// Live validation on blur
form.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('blur', () => {
    const fn = validators[input.name];
    if (fn) setError(input.name, fn(input.value));
  });
  input.addEventListener('input', () => {
    if (input.classList.contains('is-error')) {
      const fn = validators[input.name];
      if (fn) setError(input.name, fn(input.value));
    }
  });
});

// ── Form submission ──
form.addEventListener('submit', async e => {
  e.preventDefault();

  const data = {
    name:    form.querySelector('[name="name"]').value,
    email:   form.querySelector('[name="email"]').value,
    message: form.querySelector('[name="message"]').value,
  };

  if (!validateAll(data)) return;

  // Loading state
  submit.classList.add('is-loading');
  submit.disabled = true;

  try {
    const res = await fetch('/api/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || `Server error ${res.status}`);
    }

    // Success
    form.reset();
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (window.showToast) window.showToast('✓ Message sent successfully!');

  } catch (err) {
    console.error('[Forms] Submission error:', err);
    if (window.showToast) {
      window.showToast('⚠ Could not send message. Please try again.');
    }
  } finally {
    submit.classList.remove('is-loading');
    submit.disabled = false;
  }
});
