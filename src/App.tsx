import { useEffect, useRef, useState } from 'react';
import { profile } from './data/portfolio';
import { useLanguage } from './i18n/LanguageProvider';
import PortfolioHeader from './components/redesign/PortfolioHeader';
import Portrait from './components/redesign/Portrait';
import ToddyPeek from './components/redesign/ToddyPeek';
import BarberFeature from './components/redesign/BarberFeature';
import { copy } from './components/redesign/copy';

function initialMotion() {
  try { const saved = localStorage.getItem('samuel-redesign-motion'); if (saved) return saved === 'on'; } catch { /* Device preference remains available without storage. */ }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
export default function App() {
  const { language } = useLanguage(), text = copy[language];
  const [motion, setMotion] = useState(initialMotion);
  const chosenMotion = useRef(false);
  useEffect(() => {
    try { chosenMotion.current = localStorage.getItem('samuel-redesign-motion') !== null; } catch { /* Device preference. */ }
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { if (!chosenMotion.current) setMotion(!query.matches); };
    query.addEventListener('change', update); return () => query.removeEventListener('change', update);
  }, []);
  function toggleMotion() { const next = !motion; chosenMotion.current = true; setMotion(next); try { localStorage.setItem('samuel-redesign-motion', next ? 'on' : 'off'); } catch { /* Memory fallback. */ } }
  return <div className="redesign" data-motion={motion ? 'on' : 'off'}>
    <a className="skip-link" href="#conteudo">{text.skip}</a>
    <PortfolioHeader motion={motion} onMotionChange={toggleMotion} />
    <main id="conteudo" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-art"><Portrait /><span className="hero-cut" aria-hidden="true" /></div>
        <div className="hero-copy">
          <h1 id="hero-title"><span>Samuel</span><span>Santos<span className="name-stop" aria-hidden="true">.</span></span></h1>
          <p className="hero-role">{text.role}</p><p className="hero-description">{text.description}</p>
          <div className="hero-actions"><a className="button button-light" href="#projetos">{text.viewProjects}<span aria-hidden="true">↗</span></a><a className="quiet-link" href="/samuel-santos-curriculo.pdf" target="_blank" rel="noreferrer">{text.resume}<span aria-hidden="true">↗</span></a></div>
          <div className="hero-social"><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><span>{text.location}</span></div>
        </div>
        <div className="hero-foot"><a href="#projetos">{text.selectedWork}<span aria-hidden="true">↓</span></a><ToddyPeek motion={motion} /></div>
      </section>
      <BarberFeature motion={motion} />
      <section className="about" id="sobre" aria-labelledby="about-title"><h2 id="about-title">{text.aboutTitle}</h2><div><p>{text.about}</p><p className="about-secondary">{text.education}</p><a className="quiet-link" href="/samuel-santos-curriculo.pdf" target="_blank" rel="noreferrer">{text.resume}<span aria-hidden="true">↗</span></a></div></section>
      <section className="contact" id="contato" aria-labelledby="contact-title"><h2 id="contact-title">{text.contactTitle}</h2><a className="contact-email" href={'mailto:' + profile.email}>{profile.email}<span aria-hidden="true">↗</span></a><div className="contact-links"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></div></section>
    </main>
    <footer className="footer"><span>Samuel Santos</span><span>{text.location}</span><a href="#conteudo">{text.backTop}<span aria-hidden="true">↑</span></a></footer>
  </div>;
}
