/* =============================================
   PORTFOLIO - Interactive JavaScript
   ============================================= */

// --- Loader ---
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.style.overflow = 'auto';
    revealElements();
  }, 650);
});

// --- Custom Cursor ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 4 + 'px';
  cursor.style.top = mouseY - 4 + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.28;
  followerY += (mouseY - followerY) * 0.28;
  follower.style.left = followerX - 18 + 'px';
  follower.style.top = followerY - 18 + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects
document.querySelectorAll('a, button, [data-magnetic]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
    follower.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    follower.classList.remove('active');
  });
});

// --- Magnetic Effect ---
document.querySelectorAll('[data-magnetic]').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
  });
});

// --- Navigation ---
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- Scroll Reveal ---
function revealElements() {
  const reveals = document.querySelectorAll('.reveal-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// --- Counter Animation ---
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        const prefix = entry.target.getAttribute('data-prefix') || '';
        const suffix = entry.target.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            entry.target.textContent = prefix + target + suffix;
            clearInterval(timer);
          } else {
            entry.target.textContent = prefix + Math.floor(current) + suffix;
          }
        }, 40);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

animateCounters();

// --- Copy to Clipboard ---
const toast = document.getElementById('copyToast');
let toastTimeout;

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const text = btn.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      toast.textContent = `Copied: ${text}`;
      toast.classList.add('show');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        btn.classList.remove('copied');
      }, 2000);
    });
  });
});

// --- Active Nav Link Highlight ---
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// --- Tilt Effect on Project Cards ---
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
  });
});

// --- Parallax on Gradient Orbs ---
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const orbs = document.querySelectorAll('.gradient-orb');
  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 0.05;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// --- Role Typing Rotator ---
const roleEl = document.getElementById('roleText');
if (roleEl) {
  const roles = [
    'System Architect',
    'API Designer',
    'Cloud Engineer',
    'DevOps Enthusiast',
    'Problem Solver',
    'Microservices Expert',
    'Database Optimizer'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeRole() {
    const current = roles[roleIndex];
    if (isDeleting) {
      roleEl.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 400);
        return;
      }
      setTimeout(typeRole, 40);
    } else {
      roleEl.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) {
        isDeleting = true;
        setTimeout(typeRole, 2000);
        return;
      }
      setTimeout(typeRole, 80);
    }
  }

  setTimeout(typeRole, 950);
}

// --- Name Scramble Effect ---
const titleFirst = document.querySelector('.title-first');
const titleLast = document.querySelector('.title-last');
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

function scrambleText(element, finalText) {
  let iteration = 0;
  const interval = setInterval(() => {
    element.textContent = finalText
      .split('')
      .map((char, index) => {
        if (index < iteration) return finalText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    iteration += 0.5;
    if (iteration >= finalText.length) {
      element.textContent = finalText;
      clearInterval(interval);
    }
  }, 35);
}

if (titleFirst && titleLast) {
  const firstName = titleFirst.textContent;
  const lastName = titleLast.textContent;
  setTimeout(() => scrambleText(titleFirst, firstName), 680);
  setTimeout(() => scrambleText(titleLast, lastName), 800);
}

// --- Skill Card Glow Effect ---
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(47, 109, 246, 0.06), transparent 40%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});
