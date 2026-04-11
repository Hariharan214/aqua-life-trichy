/* ============================================================
   AQUA LIFE RO WATER PURIFIER — JAVASCRIPT v3
   ============================================================ */

/* ---- 1. Active navbar on scroll ---- */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const scrollY   = window.scrollY + 100;
  let current = '';

  sections.forEach(section => {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

/* ---- 2. Smooth scroll for all internal links ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      e.preventDefault();
      const navH = document.querySelector('.navbar').offsetHeight;
      window.scrollTo({ top: targetEl.offsetTop - navH - 8, behavior: 'smooth' });
    });
  });
}

/* ---- 3. Back to top ---- */
function initBackToTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
}

/* ---- 4. Mobile menu ---- */
function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn   = document.getElementById('mobileClose');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeMobile() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeMobile);
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobile));
}

/* ---- 5. Product tabs ---- */
function showTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const target = document.getElementById('tab-' + id);
  if (target) target.classList.add('active');
  if (btn) btn.classList.add('active');
}

/* ---- 6. Scroll fade-up animations ---- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* ---- 7. Stagger card animations ---- */
function initStaggerCards() {
  const groups = document.querySelectorAll('.prod-grid, .why-grid, .services-grid');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.prod-card, .why-card, .serv-card');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity   = '1';
            card.style.transform = 'translateY(0)';
          }, i * 80);
        });
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  groups.forEach(group => {
    group.querySelectorAll('.prod-card, .why-card, .serv-card').forEach(card => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    cardObserver.observe(group);
  });
}

/* ---- 8. Navbar shadow on scroll ---- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 4px 32px rgba(0,0,0,0.4)'
      : '0 2px 24px rgba(0,0,0,0.3)';
  });
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initBackToTop();
  initMobileMenu();
  initScrollAnimations();
  initNavbarScroll();
  initStaggerCards();
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
});

window.showTab = showTab;
