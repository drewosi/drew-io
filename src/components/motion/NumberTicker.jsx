import React from 'react';
import { useReducedMotion } from '../../hooks/useReveal.js';

/**
 * DREW.OS NumberTicker — a live instrument readout. Drifts around a base
 * value at a steady interval, mono + tabular. For "live" dashboards.
 */
export function NumberTicker({ value = 0, jitter = 0, interval = 2000, decimals = 0, prefix = '', suffix = '', style }) {
  const reduced = useReducedMotion();
  const [n, setN] = React.useState(value);
  React.useEffect(() => {
    setN(value);
    if (reduced || jitter <= 0) return;
    const id = setInterval(() => {
      setN(value + (Math.random() * 2 - 1) * jitter);
    }, interval);
    return () => clearInterval(id);
  }, [value, jitter, interval, reduced]);
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', transition: 'color var(--ease)', ...style }}>
      {prefix}{n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}
