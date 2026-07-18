import React from 'react';
import { Toast } from 'drew-io';

export const Shown = () => (
  <div style={{ position: 'relative', minHeight: 150, background: 'var(--bg)', borderRadius: 4, border: '1px solid var(--border)' }}>
    <Toast show style={{ position: 'absolute' }}>OK · Profile saved.</Toast>
  </div>
);
