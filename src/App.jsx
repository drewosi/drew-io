import React from 'react';
import { Landing } from './pages/Landing.jsx';
import { Console } from './pages/Console.jsx';
import { Kits } from './pages/Kits.jsx';
import { Auth } from './pages/Auth.jsx';
import { Settings } from './pages/Settings.jsx';
import { Pricing } from './pages/Pricing.jsx';
import { Docs } from './pages/Docs.jsx';
import { ComponentsPage } from './pages/ComponentsPage.jsx';
import { MotionLab } from './pages/MotionLab.jsx';
import { Portfolio } from './pages/Portfolio.jsx';
import { PageTransition } from './components/motion/PageTransition.jsx';
import { ToastHost, toast } from './components/feedback/Toast.jsx';
import { CommandPalette } from './components/overlays/CommandPalette.jsx';
import { Keymap } from './components/overlays/Keymap.jsx';
import { toggleTheme } from './theme.js';

/* True when a key event originated inside a field that consumes typing. */
const inTypingContext = (e) =>
  e.target && e.target.closest && e.target.closest('input, textarea, select, [contenteditable="true"]');

/* Everything the system answers to — rendered by the "?" overlay. */
const KEYMAP_ROWS = [
  { keys: ['⌘', 'K'], label: 'Command palette' },
  { keys: ['?'], label: 'This keymap' },
  { keys: ['T'], label: 'Theme — dark / frost' },
  { keys: ['1', '–', '5'], label: 'Jump to specimen (portfolio)' },
  { keys: ['↑', '↓', '↵', '⎋'], label: 'Palette — move, run, close' },
];

/* Hash routing: "#/route" selects a page; anything else (including in-page
   anchors like "#work") stays on Landing. */
const ROUTES = {
  '/console': Console,
  '/kits': Kits,
  '/auth': Auth,
  '/settings': Settings,
  '/pricing': Pricing,
  '/docs': Docs,
  '/components': ComponentsPage,
  '/motion': MotionLab,
  '/portfolio': Portfolio,
};

function routeFromHash() {
  const h = window.location.hash.replace(/^#/, '');
  return ROUTES[h] ? h : '/';
}

/* Palette destinations — the landing plus every registered route. */
const ROUTE_LABELS = {
  '/': 'Landing',
  '/portfolio': 'Portfolio',
  '/motion': 'Motion Lab',
  '/components': 'Components',
  '/docs': 'Docs',
  '/kits': 'Kits',
  '/pricing': 'Pricing',
  '/console': 'Console',
  '/settings': 'Settings',
  '/auth': 'Auth',
};

export default function App() {
  const [route, setRoute] = React.useState(routeFromHash);
  const [palOpen, setPalOpen] = React.useState(false);
  const [keysOpen, setKeysOpen] = React.useState(false);

  /* Global hotkeys: ctrl/cmd-K palette, ? keymap, T theme.
     Bare letters never fire while typing in a field. */
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setKeysOpen(false);
        setPalOpen(o => !o);
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey || inTypingContext(e)) return;
      if (e.key === '?') {
        e.preventDefault();
        setPalOpen(false);
        setKeysOpen(o => !o);
      } else if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleTheme();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const palItems = React.useMemo(() => [
    ...Object.keys(ROUTE_LABELS).map((r) => ({
      group: 'navigate',
      label: 'Go to ' + ROUTE_LABELS[r],
      onSelect: () => {
        setPalOpen(false);
        window.location.hash = r === '/' ? '' : r;
        toast('Route set — ' + ROUTE_LABELS[r].toLowerCase() + '.');
      },
    })),
    {
      group: 'system',
      label: 'Toggle theme — dark / frost',
      hint: 'T',
      onSelect: () => {
        setPalOpen(false);
        const next = toggleTheme();
        toast('Theme set — ' + (next === 'dark' ? 'dark' : 'frost') + '.');
      },
    },
    {
      group: 'system',
      label: 'Show keymap',
      hint: '?',
      onSelect: () => {
        setPalOpen(false);
        setKeysOpen(true);
      },
    },
  ], []);

  React.useEffect(() => {
    const onHash = () => {
      const next = routeFromHash();
      setRoute(prev => {
        if (prev !== next) window.scrollTo(0, 0);
        return next;
      });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const Page = ROUTES[route] || Landing;

  return (
    <>
      {/* preventDefault: on hash routing, letting "#main" through would navigate to Landing. */}
      <a href="#main" className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const m = document.getElementById('main');
          if (m) { m.focus(); m.scrollIntoView(); }
        }}>Skip to content</a>
      <main id="main" tabIndex={-1} style={{ display: 'contents', outline: 'none' }}>
        <PageTransition routeKey={route}>
          <Page />
        </PageTransition>
      </main>
      <ToastHost />
      <CommandPalette open={palOpen} onClose={() => setPalOpen(false)} items={palItems} />
      <Keymap open={keysOpen} onClose={() => setKeysOpen(false)} rows={KEYMAP_ROWS} />
    </>
  );
}
