/* Highlight the section being viewed, leaving the introduction unselected. */
(() => {
  'use strict';
  const sections = ['publications', 'experiences'].map(id => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;
  const links = [...document.querySelectorAll('.site-header nav a')];
  const jumpLinks = [...links, ...document.querySelectorAll('.news-list a[href^="#"]')];
  const jumpTargets = [...sections, ...document.querySelectorAll('.publication[id]')];
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

  function targetForHash(hash) {
    return jumpTargets.find(target => '#' + target.id === hash);
  }

  function showTarget(target) {
    if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
    target.focus({preventScroll: true});
    target.scrollIntoView();
    activate(sections.find(section => section.contains(target))?.id);
  }

  for (const link of jumpLinks) {
    link.addEventListener('click', event => {
      if (!link.hash || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = targetForHash(link.hash);
      if (!target) return;
      event.preventDefault();
      showTarget(target);
    });
  }
  window.addEventListener('scroll', scheduleUpdate, {passive: true});
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  document.fonts?.ready.then(scheduleUpdate);
  const initialTarget = targetForHash(location.hash);
  if (initialTarget) showTarget(initialTarget);
  updateSelection();
})();
