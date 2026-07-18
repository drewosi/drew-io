Preview convention for DREW.OS (dark-first):

Every preview wraps its content in a local `Frame` so components render on the
native near-black canvas (`--bg`) instead of the product card's white chrome.
DREW.OS is dark-first; bare components on white misrepresent the brand.

    const Frame = ({ children, pad = 28, center = false }) => (
      <div style={{
        background: 'var(--bg)', padding: pad, borderRadius: 4,
        border: '1px solid var(--border)', color: 'var(--text)',
        display: center ? 'flex' : 'block',
        alignItems: 'center', justifyContent: 'center', minHeight: center ? 120 : undefined,
      }}>{children}</div>
    );

This file is documentation only — it is not a component and is ignored by the
build (no PascalCase default export). Each preview defines its own Frame inline
so it stays self-contained.
