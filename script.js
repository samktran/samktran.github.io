/* =============================================
   CUSTOM CURSOR
============================================= */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
});

// Ring follows with slight lag
(function animateCursor() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
})();

// Expand ring on interactive elements
document.querySelectorAll('a, button, .project-card, .about-card, .tilt-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* =============================================
   THEME TOGGLE
============================================= */
const html   = document.documentElement;
const toggle = document.getElementById('themeToggle');
const icon   = toggle.querySelector('.theme-icon');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
icon.textContent = savedTheme === 'dark' ? '\u2600' : '\u263D';

toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  icon.textContent = next === 'dark' ? '\u2600' : '\u263D';
  localStorage.setItem('theme', next);
});

/* =============================================
   NAV: HIDE ON SCROLL DOWN, SHOW ON SCROLL UP
============================================= */
const nav = document.getElementById('mainNav');
let lastY = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 20);
  nav.classList.toggle('hide', y > lastY && y > 120);
  lastY = y;
}, { passive: true });

/* =============================================
   MOBILE NAV TOGGLE
============================================= */
const navToggle  = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* =============================================
   SMOOTH SCROLL
============================================= */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* =============================================
   SCROLL REVEAL
============================================= */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings within same parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =============================================
   TYPED TEXT IN HERO
============================================= */
const phrases = [
  'Full-Stack Developer',
  'UI/UX Designer',
  'Creative Coder',
  'Experience Builder',
];
const typedEl = document.getElementById('heroTyped');
let pIdx = 0, cIdx = 0, deleting = false;

function type() {
  const phrase = phrases[pIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 45 : 90);
}
type();

/* =============================================
   PROJECT CARD 3D TILT
============================================= */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r    = card.getBoundingClientRect();
    const x    = e.clientX - r.left - r.width  / 2;
    const y    = e.clientY - r.top  - r.height / 2;
    const rotX = (-y / r.height * 8).toFixed(2);
    const rotY = ( x / r.width  * 8).toFixed(2);
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.015)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s ease';
    card.style.transform  = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

/* =============================================
   PROJECT CARD CLICKABLE — handled by overlay anchor in markup

/* =============================================
   MAGNETIC BUTTONS
============================================= */
document.querySelectorAll('.mag-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r  = btn.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) * 0.25;
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.25;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform 0.4s ease';
    btn.style.transform  = 'translate(0,0)';
    setTimeout(() => { btn.style.transition = ''; }, 400);
  });
});

/* =============================================
   CONTACT FORM — REAL-TIME VALIDATION + SEND
============================================= */

// ─── EmailJS config ───────────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add an Email Service (Gmail) → copy the Service ID below
// 3. Create an Email Template → copy the Template ID below
//    Template variables to include: {{from_name}}, {{from_email}}, {{message}}
//    Set "To Email" in the template to: ksamtran@gmail.com
// 4. Go to Account → API Keys → copy your Public Key below
const EMAILJS_PUBLIC_KEY  = 'p2yV_LT7bWnDdaLjm';   // ← paste here
const EMAILJS_SERVICE_ID  = 'service_42boygq';   // ← paste here
const EMAILJS_TEMPLATE_ID = 'template_se4aq76';  // ← paste here

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
// ─────────────────────────────────────────────────────────────────────────────

const form = document.getElementById('contactForm');

function showError(input, msg) {
  const err = input.closest('.form-group').querySelector('.field-error');
  if (err) err.textContent = msg;
  input.style.borderColor = '#f87171';
}
function clearError(input) {
  const err = input.closest('.form-group').querySelector('.field-error');
  if (err) err.textContent = '';
  input.style.borderColor = '';
}

if (form) {
  // Live validation
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      if (field.validity.valid) clearError(field);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    const note = form.querySelector('.form-note');

    const name  = form.querySelector('#fieldName');
    const email = form.querySelector('#fieldEmail');
    const msg   = form.querySelector('#fieldMessage');

    if (!name.value.trim()) {
      showError(name, 'Please enter your name.');
      valid = false;
    } else { clearError(name); }

    if (!email.value.trim() || !email.validity.valid) {
      showError(email, 'Please enter a valid email.');
      valid = false;
    } else { clearError(email); }

    if (!msg.value.trim()) {
      showError(msg, 'Please write a message.');
      valid = false;
    } else { clearError(msg); }

    if (!valid) return;

    // Send via EmailJS
    const sendBtn = form.querySelector('.send-btn');
    const label   = sendBtn.querySelector('.send-label');
    sendBtn.disabled  = true;
    label.textContent = 'Sending…';

    const templateParams = {
      from_name:  name.value.trim(),
      from_email: email.value.trim(),
      message:    msg.value.trim(),
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        note.textContent  = '✓ Message sent — I\'ll reply soon!';
        note.style.color  = '#4ade80';
        label.textContent = 'Send message';
        sendBtn.disabled  = false;
        form.reset();
        setTimeout(() => { note.textContent = ''; }, 6000);
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        note.textContent  = '✗ Something went wrong. Please try again.';
        note.style.color  = '#f87171';
        label.textContent = 'Send message';
        sendBtn.disabled  = false;
        setTimeout(() => { note.textContent = ''; }, 6000);
      });
  });
}