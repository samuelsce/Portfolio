import { useEffect, useRef, useState } from 'react';
import { LanguageSwitcher, useLanguage } from '../../i18n/LanguageProvider';
import { copy } from './copy';
export default function PortfolioHeader({ motion, onMotionChange }: { motion: boolean; onMotionChange: () => void }) {
  const { language } = useLanguage(), text = copy[language];
  const [open, setOpen] = useState(false), trigger = useRef<HTMLButtonElement>(null), nav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    nav.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const query = window.matchMedia('(min-width: 800px)');
    function key(event: KeyboardEvent) { if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); } }
    function outside(event: PointerEvent) { if (event.target instanceof Node && !nav.current?.contains(event.target) && !trigger.current?.contains(event.target)) setOpen(false); }
    function resize() { if (query.matches) setOpen(false); }
    document.addEventListener('keydown', key); document.addEventListener('pointerdown', outside); query.addEventListener('change', resize);
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', outside); query.removeEventListener('change', resize); };
  }, [open]);
  return <header className="site-header">
    <a className="brand" href="#conteudo" aria-label="Samuel Santos">Samuel <span className="brand-surname"><svg className="brand-s" viewBox="10 12 40 40" aria-hidden="true"><path d="M43 20c-4-4-20-5-20 3 0 9 21 4 21 16 0 11-21 12-27 3" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></svg>antos</span></a>
    <nav ref={nav} className="site-navigation" id="site-navigation" data-open={open} aria-label={language === 'pt' ? 'Navegação principal' : 'Main navigation'}>
      <a href="#projetos" onClick={() => setOpen(false)}>{text.projects}</a><a href="#sobre" onClick={() => setOpen(false)}>{text.aboutNav}</a><a href="#contato" onClick={() => setOpen(false)}>{text.contactNav}</a><a href="/samuel-santos-curriculo.pdf" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>{text.resume}<span aria-hidden="true">↗</span></a>
      <button className="motion-toggle" aria-label={text.motion} aria-pressed={motion} onClick={onMotionChange}><svg viewBox="0 0 24 24" aria-hidden="true">{motion ? <path d="M8 6v12M16 6v12" /> : <path d="m9 5 10 7-10 7Z" />}</svg><span className="motion-caption">{text.motion}</span></button>
    </nav>
    <div className="header-tools"><LanguageSwitcher /><button ref={trigger} className="menu-toggle" aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(value => !value)}>{open ? text.close : text.menu}<span aria-hidden="true">{open ? '−' : '+'}</span></button></div>
  </header>;
}
