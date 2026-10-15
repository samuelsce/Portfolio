import { useEffect, useRef, useState } from 'react';
import { LanguageSwitcher, useLanguage } from '../../i18n/LanguageProvider';
import { content } from './content';

export default function SiteHeader() {
  const { language } = useLanguage();
  const text = content[language];
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const query = window.matchMedia('(min-width: 960px)');
    function key(event: KeyboardEvent) {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    }
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !nav.current?.contains(event.target) && !trigger.current?.contains(event.target)) setOpen(false);
    }
    function resize() { if (query.matches) setOpen(false); }
    document.addEventListener('keydown', key);
    document.addEventListener('pointerdown', outside);
    query.addEventListener('change', resize);
    return () => {
      document.removeEventListener('keydown', key);
      document.removeEventListener('pointerdown', outside);
      query.removeEventListener('change', resize);
    };
  }, [open]);

  return <header className="site-header page-width">
    <a className="brand" href="#conteudo" translate="no">Samuel Santos</a>
    <div className="header-controls">
      <LanguageSwitcher />
      <button ref={trigger} type="button" className="menu-toggle" aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(value => !value)}>
        {open ? text.close : text.menu}<span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
    </div>
    <nav ref={nav} id="site-navigation" className="site-navigation" data-open={open} aria-label={text.navigation} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      {(['projects', 'studies', 'about', 'contact'] as const).map((key, index) => <a key={key} href={['#projetos', '#estudos', '#sobre', '#contato'][index]} onClick={() => setOpen(false)}>{text[key]}</a>)}
      <a className="header-resume pixel-button pixel-button-small" href="/samuel-santos-curriculo.pdf" target="_blank" rel="noreferrer" aria-label={text.resumeLabel} onClick={() => setOpen(false)}>{text.resume}</a>
    </nav>
  </header>;
}
