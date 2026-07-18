import React from 'react';

/**
 * Scene progress plumbing. ScrollScene publishes a subscribe function through
 * this context; descendants register frame callbacks with useSceneProgress and
 * receive (progress 0..1, velocity) as the scene scrubs. All ref-write — a
 * scene full of moving layers re-renders nothing while scrolling.
 */
export const SceneContext = React.createContext(null);

/**
 * Subscribe onProgress(p, velocity) to the nearest ScrollScene. Outside a
 * scene this is a no-op and reports a single (1, 0) so content rests in its
 * final state.
 */
export function useSceneProgress(onProgress) {
  const subscribe = React.useContext(SceneContext);
  const cb = React.useRef(onProgress);
  cb.current = onProgress;
  React.useEffect(() => {
    if (!subscribe) {
      cb.current(1, 0);
      return;
    }
    return subscribe((p, v) => cb.current(p, v));
  }, [subscribe]);
}
