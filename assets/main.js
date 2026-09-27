(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  const mobile = window.matchMedia('(max-width: 699px)');
  const setMenu = (open, restoreFocus = false) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span').textContent = open ? 'Close' : 'Menu';
    if (restoreFocus) toggle.focus();
  };
  header.classList.add('has-js');
  toggle.hidden = !mobile.matches;
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (!mobile.matches) return;
      setMenu(false);
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target) && toggle.getAttribute('aria-expanded') === 'true') setMenu(false);
  });
  mobile.addEventListener('change', () => {
    toggle.hidden = !mobile.matches;
    setMenu(false);
  });
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
