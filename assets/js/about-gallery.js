/* Scoped About Us slideshow. Autoplay + explicit pause, keyboard, swipe and thumbnails. */
(() => {
  'use strict';
  const gallery = document.querySelector('[data-about-gallery]');
  if (!gallery) return;
  const stage = gallery.querySelector('.about-gallery-stage');
  const slides = [...gallery.querySelectorAll('.about-gallery-slide')];
  const thumbs = [...gallery.querySelectorAll('[data-gallery-to]')];
  const label = gallery.querySelector('[data-gallery-label]');
  const toggle = gallery.querySelector('[data-gallery-toggle]');
  const prev = gallery.querySelector('[data-gallery-prev]');
  const next = gallery.querySelector('[data-gallery-next]');
  const progress = gallery.querySelector('[data-gallery-progress]');
  if (!stage || !slides.length || !toggle || !prev || !next) return;

  const duration = 5500;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let paused = reducedMotion;
  let inView = !('IntersectionObserver' in window);
  let hovered = false;
  let timer = null;
  let startX = null;
  let startY = null;

  function display(target, announce = false) {
    index = ((target % slides.length) + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('is-current', i === index);
      thumb.setAttribute('aria-pressed', String(i === index));
    });
    label.textContent = slides[index].dataset.galleryTitle || '';
    if (announce) {
      const meta = gallery.querySelector('.about-gallery-meta');
      meta.setAttribute('aria-live', 'polite');
    } else {
      gallery.querySelector('.about-gallery-meta').setAttribute('aria-live', 'off');
    }
  }

  function cancel() {
    if (timer !== null) window.clearTimeout(timer);
    timer = null;
    gallery.classList.remove('is-playing');
  }
  function schedule() {
    cancel();
    if (paused || hovered || !inView || document.hidden || slides.length < 2) return;
    // Reset the decorative progress bar for each complete 5.5-second interval.
    if (progress) { progress.style.animation = 'none'; void progress.offsetWidth; progress.style.animation = ''; }
    gallery.classList.add('is-playing');
    timer = window.setTimeout(() => { display(index + 1); schedule(); }, duration);
  }
  function go(target) { display(target, true); schedule(); }
  function syncToggle() {
    toggle.setAttribute('data-paused', String(paused));
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Play automatic slideshow' : 'Pause automatic slideshow');
  }
  prev.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));
  thumbs.forEach((button,i) => button.addEventListener('click', () => go(i)));
  toggle.addEventListener('click', () => { paused = !paused; syncToggle(); schedule(); });
  // Arrow-key navigation when users tab to the slideshow controls.
  gallery.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    if (!gallery.contains(document.activeElement)) return;
    event.preventDefault();
    go(index + (event.key === 'ArrowRight' ? 1 : -1));
  });
  stage.addEventListener('mouseenter', () => { hovered = true; cancel(); });
  stage.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  stage.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) return;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  }, {passive:true});
  stage.addEventListener('touchend', event => {
    if (startX === null || event.changedTouches.length === 0) return;
    const dx = event.changedTouches[0].clientX - startX;
    const dy = event.changedTouches[0].clientY - startY;
    startX = null;
    startY = null;
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.35) go(index + (dx < 0 ? 1 : -1));
  }, {passive:true});
  document.addEventListener('visibilitychange', schedule);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      schedule();
    }, {threshold:.15}).observe(stage);
  }
  syncToggle();
  display(0);
  schedule();
})();
