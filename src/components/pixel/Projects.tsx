import { useLanguage } from '../../i18n/LanguageProvider';
import { content, projectLinks, type ProjectId } from './content';
import { Arrow, GitHubIcon, PixelDocument } from './Icons';

export default function Projects({ onProject }: { onProject: (id: ProjectId) => void }) {
  const { language } = useLanguage();
  const text = content[language];

  return <section className="projects section page-width" id="projetos" aria-labelledby="projects-title">
    <div className="section-heading"><h2 id="projects-title">{text.projects}</h2><span aria-hidden="true" /></div>
    <article className="featured-project" aria-labelledby="barber-title">
      <figure className="project-media">
        <button type="button" className="project-image-button pixel-frame" onClick={() => onProject('barberag')} aria-label={`${text.viewProject}: BarberAg`}>
          <img src="/projects/barberag-public.webp" width="1265" height="728" alt={text.screenshotAlt} loading="lazy" decoding="async" />
          <span className="media-action" aria-hidden="true"><Arrow external /></span>
        </button>
        <figcaption>{text.screenshot}</figcaption>
      </figure>
      <div className="project-info">
        <h3 id="barber-title" translate="no">BarberAg</h3>
        <p className="project-status"><span aria-hidden="true" />{text.production}</p>
        <p className="project-description">{text.barberDescription}</p>
        <div className="project-contribution"><p>{text.contribution}</p><p>{text.barberContribution}</p></div>
        <div className="project-actions">
          <button type="button" className="pixel-button pixel-button-primary" onClick={() => onProject('barberag')}>{text.viewProject}<Arrow /></button>
          <a className="pixel-button" href={projectLinks.barberag.site} target="_blank" rel="noreferrer">{text.visitSite}<Arrow external /></a>
        </div>
      </div>
    </article>
    <article className="project-row">
      <PixelDocument />
      <div><h3><button className="title-button" type="button" onClick={() => onProject('recette')} translate="no">Recette<Arrow /></button></h3><p>{text.recetteDescription}</p></div>
      <a className="pixel-button" href={projectLinks.recette.repo} target="_blank" rel="noreferrer"><GitHubIcon />GitHub<Arrow external /></a>
    </article>
    <details className="other-projects">
      <summary>{text.otherProjects}<span className="expand-mark" aria-hidden="true">+</span></summary>
      <div>
        {(['roomlab', 'linkwatch'] as const).map(id => <article className="project-row compact-row" key={id}>
          <PixelDocument terminal={id === 'linkwatch'} />
          <div><h3 translate="no">{text.caseStudies[id].name}</h3><p>{id === 'roomlab' ? text.roomlabDescription : text.linkwatchDescription}</p></div>
          <button className="text-action" type="button" onClick={() => onProject(id)}>{text.viewProject}<Arrow /></button>
        </article>)}
      </div>
    </details>
  </section>;
}
