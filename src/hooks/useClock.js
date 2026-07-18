import React from 'react';

/** Live UTC clock — HH MM SS parts, ticking once per second. */
export function useClock() {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const p = (x) => String(x).padStart(2, '0');
  return {
    h: p(now.getUTCHours()),
    m: p(now.getUTCMinutes()),
    s: p(now.getUTCSeconds()),
  };
}
