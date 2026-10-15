import { useEffect, useState } from 'react';

const storageKey = 'samuel-pixel-motion';

function savedPreference() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === 'on' || saved === 'off' ? saved : null;
  } catch { return null; }
}

export default function useMotionPreference() {
  const [preference, setPreference] = useState(() => {
    const saved = savedPreference();
    return { enabled: saved ? saved === 'on' : !window.matchMedia('(prefers-reduced-motion: reduce)').matches, explicit: saved !== null };
  });
  const enabled = preference.enabled;

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPreference(current => current.explicit || current.enabled === !query.matches ? current : { ...current, enabled: !query.matches });
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const previous = document.documentElement.dataset.motion;
    document.documentElement.dataset.motion = enabled ? 'on' : 'off';
    return () => {
      if (previous === undefined) delete document.documentElement.dataset.motion;
      else document.documentElement.dataset.motion = previous;
    };
  }, [enabled]);

  function toggle() {
    const next = !enabled;
    setPreference({ enabled: next, explicit: true });
    try { localStorage.setItem(storageKey, next ? 'on' : 'off'); } catch { /* The in-memory choice still works. */ }
  }

  return { enabled, toggle };
}
