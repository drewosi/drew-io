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

  /* The one global hotkey: ctrl/cmd-K toggles the palette. */
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalOpen(o => !o);
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
      onSelect: () => {
        setPalOpen(false);
        const el = document.documentElement;
        const next = el.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        el.setAttribute('data-theme', next);
        toast('Theme set — ' + (next === 'dark' ? 'dark' : 'frost') + '.');
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
      <PageTransition routeKey={route}>
        <Page />
      </PageTransition>
      <ToastHost />
      <CommandPalette open={palOpen} onClose={() => setPalOpen(false)} items={palItems} />
    </>
  );
}
