/* ================================================
   DANIELLE GODWIN KAWULUSAN - PORTFOLIO
   script.js - Global JavaScript
   ================================================ */

/* ── Custom Cursor ── */
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

if (cursor && cursorRing) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .card, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorRing.style.opacity = '1';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.opacity = '0.6';
    });
  });
}

/* ── Active Nav Link ── */
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── Mobile Nav Toggle ── */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 0.07) + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Parallax bg-mask ── */
const bgImg = document.querySelector('.bg-mask-layer img');
if (bgImg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    bgImg.style.transform = `translate(-50%, calc(-50% + ${y * 0.12}px))`;
  }, { passive: true });
}

/* ── Typed text effect (used on Home) ── */
function typedText(el, texts, speed = 80, pause = 2000) {
  if (!el) return;
  let tIdx = 0, cIdx = 0, deleting = false;

  function tick() {
    const current = texts[tIdx];
    if (deleting) {
      el.textContent = current.slice(0, --cIdx);
    } else {
      el.textContent = current.slice(0, ++cIdx);
    }

    let delay = deleting ? speed / 2 : speed;
    if (!deleting && cIdx === current.length) {
      delay = pause;
      deleting = true;
    } else if (deleting && cIdx === 0) {
      deleting = false;
      tIdx = (tIdx + 1) % texts.length;
      delay = 400;
    }
    setTimeout(tick, delay);
  }
  tick();
}

/* ── Contact Form ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    const name = this.querySelector('#name').value;
    btn.textContent = 'Sending...';
    setTimeout(() => {
      btn.textContent = '✓ Message Sent';
      btn.style.borderColor = '#6dbf7e';
      btn.style.color = '#6dbf7e';
      this.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 4000);
    }, 1200);
  });
}
