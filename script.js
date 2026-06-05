/* ============================================================
   Eugene Nnamdi — Portfolio
   JavaScript: Interactions & Animations
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. TYPEWRITER — types out roles character by character
     ---------------------------------------------------------- */
  const roleTextEl = document.getElementById('role-text');
  const roles = [
    'Marketing Strategist',
    'Growth Architect',
    'Content Creator',
    'DeFi Native',
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeRole() {
    const current = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      roleTextEl.textContent = current.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 500);
        return;
      }
      setTimeout(typeRole, 35);
    } else {
      charIndex++;
      roleTextEl.textContent = current.substring(0, charIndex);

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeRole, 2200);
        return;
      }
      setTimeout(typeRole, 85);
    }
  }

  if (roleTextEl) {
    setTimeout(typeRole, 600);
  }

  /* ----------------------------------------------------------
     2. CONTACT TOGGLE — dropdown for social links
     ---------------------------------------------------------- */
  const contactMenu = document.querySelector('.contact-menu');
  const contactToggle = document.querySelector('.contact-toggle');
  const contactPanel = document.querySelector('#contact-links');

  function setContactState(isOpen) {
    contactMenu.classList.toggle('is-open', isOpen);
    contactToggle.setAttribute('aria-expanded', String(isOpen));
    contactPanel.setAttribute('aria-hidden', String(!isOpen));
  }

  if (contactToggle) {
    contactToggle.addEventListener('click', () => {
      setContactState(!contactMenu.classList.contains('is-open'));
    });

    document.addEventListener('click', (e) => {
      if (!contactMenu.contains(e.target)) {
        setContactState(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setContactState(false);
        contactToggle.focus();
      }
    });

    contactPanel.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        setContactState(false);
      }
    });
  }

  /* ----------------------------------------------------------
     3. SCROLL REVEAL — entrance animations
     ---------------------------------------------------------- */
  const supportsScrollTimeline = CSS.supports('animation-timeline', 'view()');

  if (!supportsScrollTimeline) {
    const revealEls = document.querySelectorAll('.reveal');

    if (revealEls.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
      );

      revealEls.forEach((el) => observer.observe(el));
    }
  } else {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  /* ----------------------------------------------------------
     4. SMOOTH SCROLL — nav link offset
     ---------------------------------------------------------- */
  document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.getElementById(
        link.getAttribute('href').slice(1)
      );
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ----------------------------------------------------------
     5. LOCAL TIME CLOCK — Port Harcourt (Africa/Lagos)
     ---------------------------------------------------------- */
  const localTimeEl = document.getElementById('local-time');

  function updateLocalTime() {
    const now = new Date();
    const formatted = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Lagos',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now);

    localTimeEl.textContent = formatted;
    localTimeEl.setAttribute('datetime', now.toISOString());
  }

  if (localTimeEl) {
    updateLocalTime();
    setInterval(updateLocalTime, 1000);
  }
})();
