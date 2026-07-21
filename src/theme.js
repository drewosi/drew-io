/* DREW.OS — Theme state. One write point: sets data-theme on <html>,
   persists to localStorage, and broadcasts so every control stays in sync.
   Initial detection happens pre-paint in index.html. */

const KEY = 'drewos-theme';

export function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function setTheme(next) {
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem(KEY, next); } catch (e) { /* private mode — theme just won't persist */ }
  window.dispatchEvent(new CustomEvent('drewos:theme', { detail: next }));
}

export function toggleTheme() {
  const next = getTheme() === 'light' ? 'dark' : 'light';
  setTheme(next);
  return next;
}
