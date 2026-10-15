import { useEffect, useRef, useState } from 'react';
import { profile } from '../../data/portfolio';
import { useLanguage } from '../../i18n/LanguageProvider';
import { content, projectLinks, type ProjectId } from './content';
import { GitHubIcon, LinkedInIcon, PixelDocument } from './Icons';

export default function ProfileSections({ onProject }: { onProject: (id: ProjectId) => void }) {
  const { language } = useLanguage();
  const text = content[language];
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const reset = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (reset.current) clearTimeout(reset.current); }, []);

  async function copyEmail() {
    if (reset.current) clearTimeout(reset.current);
    try { await navigator.clipboard.writeText(profile.email); setCopyState('copied'); }
    catch { setCopyState('failed'); }
    reset.current = setTimeout(() => setCopyState('idle'), 5000);
  }

  return <>
    <section className="studies section page-width" id="estudos" aria-labelledby="studies-title">
      <div className="section-heading"><h2 id="studies-title">{text.studies}</h2><span aria-hidden="true" /></div>
      <p className="section-intro">{text.studiesIntro}</p>
      <article className="study-lab">
        <PixelDocument terminal />
        <div><p className="study-status">{text.localLab}</p><h3 translate="no">Sentinel</h3><p>{text.sentinelDescription}</p></div>
        <div className="study-actions"><button className="text-action" type="button" onClick={() => onProject('sentinel')}>{text.viewProject}</button><a className="text-action" href={projectLinks.sentinel.repo} target="_blank" rel="noreferrer">GitHub</a></div>
      </article>
      <div className="study-list">
        <article><div><h3 translate="no">TryHackMe</h3><p>{text.thmDescription}</p></div><span className="study-status">{text.ongoing}</span><a className="text-action" href="https://tryhackme.com/p/samuelsce" target="_blank" rel="noreferrer">{text.viewProfile}</a></article>
        <article><div><h3 translate="no">Hackers do Bem</h3><p>{text.hdbDescription}</p></div><span className="study-status">{text.ongoing}</span><a className="text-action" href="https://hackersdobem.org.br/" target="_blank" rel="noreferrer">{text.viewProgram}</a></article>
      </div>
    </section>
    <section className="about section page-width" id="sobre" aria-labelledby="about-title">
      <div className="section-heading"><h2 id="about-title">{text.aboutTitle}</h2><span aria-hidden="true" /></div>
      <div className="about-layout">
        <div className="about-copy"><p>{text.aboutBody}</p><p>{text.aboutWork}</p><a className="text-action" href="/samuel-santos-curriculo.pdf" target="_blank" rel="noreferrer" aria-label={text.resumeLabel}>{text.resume}</a></div>
        <div className="about-background">
          <h3>{text.education}</h3>
          <ul className="education-list"><li><p>{text.degree}</p><span>{text.degreePlace}</span></li><li><p>{text.diploma}</p><span>{text.diplomaPlace}</span></li></ul>
          <dl className="background-details"><div><dt>{text.development}</dt><dd>{text.developmentBody}</dd></div><div><dt>{text.workflow}</dt><dd>{text.workflowBody}</dd></div></dl>
        </div>
      </div>
    </section>
    <section className="contact section page-width" id="contato" aria-labelledby="contact-title">
      <div className="section-heading"><h2 id="contact-title">{text.contact}</h2><span aria-hidden="true" /></div>
      <div className="contact-layout"><div><p>{text.contactBody}</p><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
        <div className="email-copy"><button type="button" className="text-action" onClick={copyEmail}>{text.copyEmail}<svg className="icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 2h8v9H5zM2 5v9h8" stroke="currentColor" fill="none" /></svg></button><span className="copy-status" role="status">{copyState === 'copied' ? text.copied : copyState === 'failed' ? text.copyFailed : ''}</span></div>
      </div><div className="contact-links"><a href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon />LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer"><GitHubIcon />GitHub</a></div></div>
    </section>
  </>;
}
