import { useEffect, useRef, type CSSProperties } from 'react';
import { profile } from '../../data/portfolio';
import { useLanguage } from '../../i18n/PixelLanguageProvider';
import { content } from './content';
import { GitHubIcon, LinkedInIcon } from './Icons';

export default function SceneHero() {
  const { language } = useLanguage();
  const text = content[language];
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scene.current;
    if (!element || !('IntersectionObserver' in window)) return;
    let visible = false;
    const update = () => { element.dataset.active = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);

  return <section className="hero page-width" aria-labelledby="hero-name">
    <div className="hero-stage" ref={scene} data-active="false">
      <h1 className="hero-name" id="hero-name" translate="no" aria-label="Samuel Santos">
        {['Samuel', 'Santos'].map((word, wordIndex) => <span key={word} className="hero-word" aria-hidden="true">
          {Array.from(word).map((letter, index) => <span className="hero-letter" key={index} style={{ '--letter-delay': `${(wordIndex * 6 + index) * 65}ms` } as CSSProperties}>{letter}</span>)}
        </span>)}
      </h1>
      <span className="name-detail name-detail-left" aria-hidden="true" />
      <span className="name-detail name-detail-right" aria-hidden="true" />
      <picture className="hero-scenery">
        <source media="(max-width: 599px)" srcSet="/pixel/scene-mobile.webp" width="888" height="444" />
        <img src="/pixel/scene.webp" width="2172" height="724" alt="" fetchPriority="high" />
      </picture>
      <picture className="hero-character">
        <source media="(max-width: 599px)" srcSet="/pixel/samuel-small.webp" />
        <img src="/pixel/samuel.webp" width="1024" height="1536" alt={text.avatarAlt} fetchPriority="high" />
      </picture>
      <span className="scene-signal" aria-hidden="true" />
      <a className="scene-link scene-projects" href="#projetos"><span className="scene-label"><span className="scene-caption">{text.projects}</span></span></a>
      <a className="scene-link scene-studies" href="#estudos"><span className="scene-label"><span className="scene-caption">{text.studies}</span></span></a>
    </div>
    <div className="hero-intro">
      <p className="hero-role">{text.role}</p>
      <p className="hero-description">{text.description}</p>
      <div className="hero-actions">
        <a className="pixel-button pixel-button-primary" href="#projetos">{text.viewProjects}</a>
        <a className="pixel-button" href="/samuel-santos-curriculo.pdf?v=20261015" target="_blank" rel="noreferrer" aria-label={text.resumeLabel}>{text.resume}</a>
      </div>
      <div className="hero-social">
        <a href={profile.github} target="_blank" rel="noreferrer"><GitHubIcon /><span>GitHub</span></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon /><span>LinkedIn</span></a>
      </div>
    </div>
  </section>;
}
