import { useEffect, useRef } from 'react';
import { profile, projects } from '../../data/portfolio';
import { useLanguage } from '../../i18n/LanguageProvider';
import { copy } from './copy';
export default function BarberFeature({ motion }: { motion: boolean }) {
  const { language } = useLanguage(), text = copy[language], media = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = media.current; if (!node || !motion) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { animation = node.animate([{ opacity: .65, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 550, easing: 'cubic-bezier(.2,.7,.25,1)' }); observer.disconnect(); } }, { threshold: .18 });
    const visibility = () => { if (document.hidden) animation?.cancel(); };
    document.addEventListener('visibilitychange', visibility);
    observer.observe(node); return () => { observer.disconnect(); animation?.cancel(); document.removeEventListener('visibilitychange', visibility); };
  }, [motion]);
  const barber = projects.find(project => project.id === 'barberag')!;
  return <section className="featured-project" id="projetos" aria-labelledby="barber-title">
    <div className="project-heading"><h2 id="barber-title">BarberAg<span aria-hidden="true">.</span></h2><p><span className="production-mark" aria-hidden="true" />{text.production}</p></div>
    <a className="project-visual-link" href={barber.demo} target="_blank" rel="noreferrer" aria-label={text.visit}><div className="project-media" ref={media}><div className="project-image-wrap"><img src="/projects/barberag-agenda.webp" width="896" height="459" loading="lazy" decoding="async" alt={text.mediaAlt} /></div><span className="media-open" aria-hidden="true">↗</span></div></a>
    <div className="project-summary"><div><h3>{text.barberDescription}</h3><p className="project-stack">React, Next.js, TypeScript, Tailwind CSS</p></div><div><p>{text.barberContribution}</p><details><summary>{text.barberDetails}<span aria-hidden="true">+</span></summary><p>{text.barberDetailBody}</p></details><a className="quiet-link" href={barber.demo} target="_blank" rel="noreferrer">{text.visit}<span aria-hidden="true">↗</span></a></div></div>
    <div className="project-bottom"><p>{text.mediaSource}</p><a href={profile.github + '?tab=repositories'} target="_blank" rel="noreferrer">{text.githubProjects}<span aria-hidden="true">↗</span></a></div>
  </section>;
}
