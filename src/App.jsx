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
import { ToastHost } from './components/feedback/Toast.jsx';

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

export default function App() {
  const [route, setRoute] = React.useState(routeFromHash);

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
    </>
  );
}
