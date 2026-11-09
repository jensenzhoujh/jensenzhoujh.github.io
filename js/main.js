/* Highlight the section being viewed, leaving the introduction unselected. */
(() => {
  'use strict';
  const sections = ['publications', 'experiences'].map(id => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;
  const links = [...document.querySelectorAll('.site-header nav a')];
  let selectedId;
  let pendingFrame = false;

  function activate(id) {
    if (id === selectedId) return;
    selectedId = id;
    for (const link of links) {
      if (link.hash === '#' + id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }

  function updateSelection() {
    const marker = (document.querySelector('.site-header')?.getBoundingClientRect().height || 0) + 48;
    let visibleSection = null;
    for (const section of sections) {
      const bounds = section.getBoundingClientRect();
      if (bounds.top <= marker && bounds.bottom > marker) visibleSection = section.id;
    }
    // A short last section may never reach the marker before scrolling ends.
    const last = sections.at(-1);
    const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    if (atBottom && last.getBoundingClientRect().top < window.innerHeight) visibleSection = last.id;
    activate(visibleSection);
  }

  function scheduleUpdate() {
    if (pendingFrame) return;
    pendingFrame = true;
    requestAnimationFrame(() => {
      pendingFrame = false;
      updateSelection();
    });
  }

  for (const link of links) {
    link.addEventListener('click', event => {
      if (!link.hash || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = document.getElementById(link.hash.slice(1));
      const section = target?.closest('#publications, #experiences');
      if (section) activate(section.id);
    });
  }
  window.addEventListener('scroll', scheduleUpdate, {passive: true});
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  document.fonts?.ready.then(scheduleUpdate);
  updateSelection();
})();
