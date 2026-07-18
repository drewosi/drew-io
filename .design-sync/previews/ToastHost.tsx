import React from 'react';
import { ToastHost, toast } from 'drew-io';

export const Live = () => {
  React.useEffect(() => {
    toast('Signal verified. Opening the console.', { code: 'OK', duration: 60000 });
  }, []);
  return (
    <div style={{ position: 'relative', minHeight: 170, background: 'var(--bg)', borderRadius: 4, border: '1px solid var(--border)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: 16 }}>toast() stack · bottom-center</div>
      <ToastHost />
    </div>
  );
};
