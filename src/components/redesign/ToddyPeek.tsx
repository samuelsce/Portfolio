import { useCallback, useEffect, useRef } from 'react';
import { languageChangeEvent, useLanguage } from '../../i18n/LanguageProvider';
import { copy } from './copy';
export default function ToddyPeek({ motion }: { motion: boolean }) {
  const { language } = useLanguage(), root = useRef<HTMLButtonElement>(null), tracks = useRef<Animation[]>([]);
  const greeted = useRef(false);
  const stop = useCallback(() => { tracks.current.forEach(track => track.cancel()); tracks.current = []; }, []);
  const hello = useCallback(() => {
    stop(); const node = root.current; if (!node) return;
    if (!motion) { node.dataset.greeting = node.dataset.greeting === 'yes' ? 'no' : 'yes'; return; }
    node.dataset.greeting = 'no';
    const gestures: [string, Keyframe[]][] = [
      ['.dog-head', [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-9deg)', offset: .2 }, { transform: 'rotate(8deg)', offset: .55 }, { transform: 'rotate(0deg)' }]],
      ['.dog-ear', [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-15deg)', offset: .3 }, { transform: 'rotate(5deg)', offset: .65 }, { transform: 'rotate(0deg)' }]],
      ['.dog-body', [{ transform: 'translateY(0)' }, { transform: 'translateY(-3px)', offset: .25 }, { transform: 'translateY(1px)', offset: .65 }, { transform: 'translateY(0)' }]],
    ];
    for (const [selector, frames] of gestures) { const target = node.querySelector(selector); if (target) tracks.current.push(target.animate(frames, { duration: 950, easing: 'cubic-bezier(.22,.7,.25,1)' })); }
  }, [motion, stop]);
  useEffect(() => {
    const node = root.current; if (!node) return;
    if (!motion) stop();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) stop();
        else if (motion && !greeted.current && !document.hidden) { greeted.current = true; hello(); }
      }
    }, { threshold: .5 });
    observer.observe(node);
    function visibility() { if (document.hidden) stop(); }
    function languageReaction() { if (motion && !document.hidden) { const bounds = node!.getBoundingClientRect(); if (bounds.bottom > 0 && bounds.top < innerHeight) hello(); } }
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener(languageChangeEvent, languageReaction);
    return () => { observer.disconnect(); stop(); document.removeEventListener('visibilitychange', visibility); window.removeEventListener(languageChangeEvent, languageReaction); };
  }, [motion, hello, stop]);
  return <button ref={root} className="toddy-peek" type="button" aria-label={copy[language].dogLabel} onClick={hello} onPointerEnter={event => { if (event.pointerType === 'mouse') hello(); }}>
    <svg viewBox="0 0 210 110" aria-hidden="true"><ellipse cx="101" cy="94" rx="80" ry="5" fill="#141213" opacity=".32" />
      <g className="dog-body"><path d="M33 61q-7-8-11-4q-4 7 4 12" fill="#754829" /><path d="M42 58q-13 11-11 26l5 8h15l3-15 66 2 4 13h16l1-22q-1-19-19-24L64 44q-13 0-22 14Z" fill="#8E5935" /><path d="m54 76-2 15H38m79-13 5 13h15" fill="none" stroke="#573622" strokeWidth="5" strokeLinecap="round" /><path d="M43 60q16-14 46-12l20 4" fill="none" stroke="#B88350" strokeWidth="5" strokeLinecap="round" />
        <g className="dog-head"><path d="M129 39q-8-20 12-24q30-7 43 17l9 16q3 13-13 21l-28 2q-23-8-23-32Z" fill="#A16D43" /><path className="dog-ear" d="M133 25q-12 2-14 16q-2 18 9 29q13-2 17-15l-2-20Z" fill="#5E3B27" /><path d="M172 44q14-1 22 9q3 15-17 15q-14-4-15-12Z" fill="#684630" /><path d="M182 50q7-4 12 1q2 7-6 8q-7-1-6-9" fill="#242123" /><ellipse cx="160" cy="38" rx="4.3" ry="5.5" fill="#242123" /><circle cx="161" cy="36" r="1.3" fill="#ECE8E5" /><path d="M178 62q-1 5 5 5" stroke="#242123" strokeWidth="2" fill="none" strokeLinecap="round" /><path d="m148 22 5-7 5 5" fill="#B78353" /></g>
      </g>
    </svg>
  </button>;
}
