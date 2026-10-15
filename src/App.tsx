import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './i18n/LanguageProvider';
import { content, projectLinks, type ProjectId } from './components/pixel/content';
import SiteHeader from './components/pixel/SiteHeader';
import SceneHero from './components/pixel/SceneHero';
import Projects from './components/pixel/Projects';
import ProfileSections from './components/pixel/ProfileSections';
import ProjectDialog from './components/pixel/ProjectDialog';
import { Arrow } from './components/pixel/Icons';
import useRevealMotion from './components/pixel/useRevealMotion';
import useMotionPreference from './components/pixel/useMotionPreference';

function projectFromHash(): ProjectId | null {
  if (!location.hash.startsWith('#projeto-')) return null;
  const id = location.hash.slice('#projeto-'.length);
  return Object.hasOwn(projectLinks, id) ? id as ProjectId : null;
}

export default function App() {
  const { language } = useLanguage();
  const text = content[language];
  const [project, setProject] = useState<ProjectId | null>(projectFromHash);
  const returnHash = useRef(projectFromHash() ? '#projetos' : location.hash);
  const main = useRef<HTMLElement>(null);
  const motion = useMotionPreference();
  useRevealMotion(main, motion.enabled);

  useEffect(() => {
    const sync = () => setProject(projectFromHash());
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  function openProject(id: ProjectId) {
    returnHash.current = location.hash;
    history.pushState(null, '', `#projeto-${id}`);
    setProject(id);
  }

  function closeProject() {
    if (projectFromHash()) history.replaceState(null, '', `${location.pathname}${location.search}${returnHash.current}`);
    setProject(null);
  }

  return <div className="pixel-portfolio" data-motion={motion.enabled ? 'on' : 'off'}>
    <a className="skip-link" href="#conteudo">{text.skip}</a>
    <SiteHeader motion={motion.enabled} onMotionChange={motion.toggle} />
    <main ref={main} id="conteudo" tabIndex={-1}>
      <SceneHero />
      <Projects onProject={openProject} />
      <ProfileSections onProject={openProject} />
    </main>
    <footer className="site-footer page-width">
      <span translate="no">Samuel Santos</span>
      <span>Mauá, São Paulo</span>
      <a href="#conteudo">{text.backTop}<Arrow direction="up" /></a>
    </footer>
    <ProjectDialog projectId={project} onClose={closeProject} />
  </div>;
}
