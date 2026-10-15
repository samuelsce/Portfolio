import { useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { content, projectLinks, type ProjectId } from './content';
import { Arrow, GitHubIcon } from './Icons';

export default function ProjectDialog({ projectId, onClose }: { projectId: ProjectId | null; onClose: () => void }) {
  const { language } = useLanguage();
  const text = content[language];
  const ref = useRef<HTMLDialogElement>(null);
  const scrollArea = useRef<HTMLDivElement>(null);
  const project = projectId ? text.caseStudies[projectId] : null;
  const links = projectId ? projectLinks[projectId] : {};

  useEffect(() => {
    if (!projectId) return;
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    if (scrollArea.current) scrollArea.current.scrollTop = 0;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [projectId]);

  return <dialog className="project-dialog" ref={ref} aria-labelledby="case-title" onClose={() => { if (!ref.current?.open) onClose(); }}>
    {project && <>
      <div className="dialog-heading"><span>{project.status}</span><button type="button" className="close-button" onClick={() => ref.current?.close()}>{text.close}<span aria-hidden="true">×</span></button></div>
      <div className="dialog-body" ref={scrollArea} tabIndex={0} role="region" aria-labelledby="case-title">
      <h2 id="case-title" translate="no">{project.name}</h2>
      <p className="case-intro">{project.intro}</p>
      {projectId === 'barberag' && <img className="case-image" src="/projects/barberag-public.webp" width="1265" height="728" alt={text.screenshotAlt} loading="lazy" decoding="async" />}
      <dl className="case-details">
        <div><dt>{text.scope}</dt><dd>{project.scope}</dd></div>
        <div><dt>{text.implementation}</dt><dd>{project.implementation}</dd></div>
        <div><dt>{text.context}</dt><dd>{project.context}</dd></div>
      </dl>
      <div className="project-actions">
        {links.site && <a className="pixel-button pixel-button-primary" href={links.site} target="_blank" rel="noreferrer">{text.visitSite}<Arrow external /></a>}
        {links.repo && <a className="pixel-button" href={links.repo} target="_blank" rel="noreferrer"><GitHubIcon />{text.viewCode}<Arrow external /></a>}
      </div>
      </div>
    </>}
  </dialog>;
}
