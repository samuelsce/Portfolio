import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { academicProject, profile, projects } from "./data/portfolio";
import RoomIllustration from "./components/RoomIllustration";
import SentinelIllustration from "./components/SentinelIllustration";
import HeaderStretch from "./components/HeaderStretch";
import type { HeaderSurface } from "./components/HeaderStretch";
import PageMascot from "./components/PageMascot";
import MascotArtwork from "./components/MascotArtwork";
import Icon from "./components/Icon";
import SectionStroke from "./components/SectionStroke";
import DeferredContributions from "./components/DeferredContributions";
import { useLanguage, LanguageSwitcher } from "./i18n/LanguageProvider";
import { englishProjects, englishAcademicProject } from "./i18n/projects";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m50 4 8 29 26-17-17 26 29 8-29 8 17 26-26-17-8 29-8-29-26 17 17-26L4 50l29-8-17-26 26 17Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

const Workbench = memo(function Workbench({
  motion,
  mascotAway,
  onMotionChange,
}: {
  motion: boolean;
  mascotAway: boolean;
  onMotionChange: () => void;
}) {
  const { t } = useLanguage();
  const [format, setFormat] = useState<"card" | "poster">("card");
  const [dark, setDark] = useState(false);
  const [radius, setRadius] = useState(24);
  const [idea, setIdea] = useState<string | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const [celebrationId, setCelebrationId] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const benchRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLButtonElement>(null);
  const gazeFrame = useRef<number | null>(null);
  const pendingGaze = useRef({ x: 0, y: 0 });
  function restGaze() {
    if (gazeFrame.current !== null) cancelAnimationFrame(gazeFrame.current);
    gazeFrame.current = null;
    mascotRef.current?.style.setProperty("--gaze-x", "0px");
    mascotRef.current?.style.setProperty("--gaze-y", "0px");
    mascotRef.current?.style.setProperty("--gaze-angle", "0deg");
  }
  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (
      !motion ||
      mascotAway ||
      event.pointerType !== "mouse" ||
      !mascotRef.current
    )
      return;
    pendingGaze.current = { x: event.clientX, y: event.clientY };
    if (gazeFrame.current !== null) return;
    gazeFrame.current = requestAnimationFrame(() => {
      gazeFrame.current = null;
      const { x: clientX, y: clientY } = pendingGaze.current;
      const face = mascotRef.current?.getBoundingClientRect();
      const mascot = mascotRef.current;
      if (!face || !mascot) return;
      const dx = clientX - (face.left + face.width / 2);
      const dy = clientY - (face.top + face.height / 2);
      const distance = Math.max(Math.hypot(dx, dy), 1);
      const strength = Math.min(distance / 24, 1);
      const x = (dx / distance) * strength * 6;
      const y = (dy / distance) * strength * 4;
      for (const [name, value] of [
        ["--gaze-x", `${x.toFixed(2)}px`],
        ["--gaze-y", `${y.toFixed(2)}px`],
        ["--gaze-angle", `${(x * 0.65).toFixed(2)}deg`],
      ])
        if (mascot.style.getPropertyValue(name) !== value)
          mascot.style.setProperty(name, value);
    });
  }
  useEffect(() => {
    if (!motion || mascotAway) restGaze();
  }, [motion, mascotAway]);
  useEffect(() => {
    const bench = benchRef.current;
    if (!bench) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        bench.dataset.inView = String(entry.isIntersecting);
      },
      { rootMargin: "80px" },
    );
    observer.observe(bench);
    return () => observer.disconnect();
  }, []);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (gazeFrame.current !== null) cancelAnimationFrame(gazeFrame.current);
    },
    [],
  );
  function play() {
    if (timer.current) clearTimeout(timer.current);
    setCelebrate(true);
    setCelebrationId((current) => current + 1);
    timer.current = setTimeout(() => setCelebrate(false), 2200);
  }
  function reset() {
    setFormat("card");
    setDark(false);
    setRadius(24);
    setIdea(null);
    setCelebrate(false);
    if (timer.current) clearTimeout(timer.current);
    restGaze();
  }
  return (
    <div
      className="workbench"
      id="laboratorio"
      ref={benchRef}
      onPointerMove={followPointer}
      onPointerLeave={restGaze}
    >
      <div className={`studio-window ${celebrate ? "is-activated" : ""}`}>
        <div className="window-chrome">
          <span className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="chrome-symbol" aria-hidden="true">
            <Icon name="asterisk" />
          </span>
        </div>
        <div className={`preview-stage ${dark ? "is-dark" : ""}`}>
          <div className="stage-grid" aria-hidden="true" />
          <div
            className={`idea-preview ${format === "poster" ? "is-poster" : ""} ${celebrate ? "is-celebrating" : ""}`}
            style={{ "--idea-radius": `${radius}px` } as CSSProperties}
          >
            <div className="idea-art" key={celebrationId}>
              <div className="art-ring ring-one" aria-hidden="true" />
              <div className="art-ring ring-two" aria-hidden="true" />
              <button
                className="art-dot"
                ref={mascotRef}
                type="button"
                aria-label={t.cardMascot}
                tabIndex={motion && !mascotAway ? 0 : -1}
              >
                <MascotArtwork docked />
              </button>
              <Spark className="art-spark" />
            </div>
            <h2>
              {idea?.trim() || t.defaultIdea}
              <span>{t.startsHere}</span>
            </h2>
            <button className="idea-action" onClick={play}>
              {celebrate ? t.ideaAlive : t.bringToLife}
              <Arrow />
            </button>
          </div>
          <span className="sr-only" role="status">
            {celebrate
              ? t.ideaStatus
              : ""}
          </span>
        </div>
        <div className="bench-controls">
          <div
            className="format-control"
            role="group"
            aria-label={t.formatLabel}
          >
            <button
              aria-pressed={format === "card"}
              onClick={() => setFormat("card")}
            >
              {t.card}
            </button>
            <button
              aria-pressed={format === "poster"}
              onClick={() => setFormat("poster")}
            >
              {t.poster}
            </button>
          </div>
          <button
            className="theme-control"
            role="switch"
            aria-checked={dark}
            onClick={() => setDark(!dark)}
            aria-label={t.benchDark}
          >
            <span aria-hidden="true">
              <Icon name={dark ? "moon" : "sun"} />
            </span>
            <span>{dark ? t.dark : t.light}</span>
          </button>
          <label className="radius-control" htmlFor="radius">
            <span>{t.corners}</span>
            <input
              id="radius"
              type="range"
              min="0"
              max="48"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            />
            <span>{radius}</span>
          </label>
        </div>
      </div>
      <div className="bench-bottom">
        <button onClick={reset}>
          {t.reset}
          <span aria-hidden="true">
            <Icon name="reset" />
          </span>
        </button>
      </div>
      <label className="idea-input">
        {t.nameIdea}
        <input
          maxLength={28}
          value={idea ?? t.defaultIdea}
          onChange={(e) => setIdea(e.target.value)}
        />
      </label>
      <div className="bench-motion-row">
        <span>{motion ? t.motionOn : t.motionReduced}</span>
        <button
          className="motion-toggle"
          aria-pressed={motion}
          onClick={onMotionChange}
        >
          {motion ? t.disableMotion : t.enableMotion}
        </button>
      </div>
    </div>
  );
});

function MonitorIllustration() {
  const { t, language } = useLanguage();
  return (
    <div
      className="monitor-illustration"
      aria-label={t.monitorLabel}
    >
      <div className="monitor-top">
        <span>
          <span className="monitor-logo">
            <Icon name="link" />
          </span>{" "}
          LinkWatch
        </span>
        <span className="monitor-status">
          <i /> {t.systemsOperational}
        </span>
      </div>
      <div className="monitor-content">
        <span className="monitor-caption">{t.overview}</span>
        <div className="monitor-metrics">
          <div>
            <span>{t.uptime}</span>
            <strong>
              {language === "pt" ? "99,98" : "99.98"}
              <small>%</small>
            </strong>
          </div>
          <div>
            <span>{t.averageLatency}</span>
            <strong>
              124<small>ms</small>
            </strong>
          </div>
        </div>
        <div className="monitor-chart">
          <div className="chart-label">
            <span>{t.responseTime}</span>
            <span>{t.last24h}</span>
          </div>
          <svg viewBox="0 0 480 130" fill="none" aria-hidden="true">
            <path d="M0 30h480M0 65h480M0 100h480" stroke="#ebe6f1" />
            <path
              d="m0 83 20-5 20 11 20-25 20 8 20-3 20 8 20-11 20 7 20-32 20 19 20-4 20 19 20-8 20-6 20 11 20-36 20 21 20-7 20 13 20-3 20-13 20 7 20-9 20 5"
              stroke="#8872bb"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
          <div className="chart-hours">
            <span>00:00</span>
            <span>12:00</span>
            <span>23:59</span>
          </div>
        </div>
        <div className="endpoint-row">
          <span>
            <i /> {language === "pt" ? "api.exemplo.dev" : "api.example.dev"}
          </span>
          <span>{t.operational}</span>
          <span>112 ms</span>
        </div>
        <div className="endpoint-row">
          <span>
            <i /> {language === "pt" ? "exemplo.dev" : "example.dev"}
          </span>
          <span>{t.operational}</span>
          <span>136 ms</span>
        </div>
      </div>
      <span className="monitor-demo-note">{t.illustrativeData}</span>
    </div>
  );
}

function BarberIllustration() {
  const { t } = useLanguage();
  return (
    <div
      className="barber-illustration"
      role="img"
      aria-label={t.barberLabel}
    >
      <div className="barber-agenda">
        <div className="agenda-heading">
          <span>
            {t.betweenCuts}
            <br />
            {t.andAnother}
          </span>
          <span className="agenda-mini">
            {t.aSchedule}
            <br />
            {t.wellOrganized}
          </span>
        </div>
        <div className="agenda-days" aria-hidden="true">
          <span>{t.mon}</span>
          <span>{t.tue}</span>
          <span className="selected-day">{t.wed}</span>
          <span>{t.thu}</span>
          <span>{t.fri}</span>
        </div>
        <div className="agenda-slot">
          <span>09:00</span>
          <div>
            <strong>{t.cutStyle}</strong>
            <span>{t.sampleTime}</span>
          </div>
          <span aria-hidden="true">
            <Arrow diagonal />
          </span>
        </div>
        <div className="agenda-slot">
          <span>10:30</span>
          <div>
            <strong>{t.beardCare}</strong>
            <span>{t.sampleTime}</span>
          </div>
          <span aria-hidden="true">
            <Arrow diagonal />
          </span>
        </div>
        <div className="agenda-free">
          <span>11:30</span>
          <span>{t.roomForNext}</span>
          <span aria-hidden="true">
            <Icon name="plus" />
          </span>
        </div>
      </div>
    </div>
  );
}

const Project = memo(function Project({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const { t, language } = useLanguage();
  const copy = language === "pt" ? project : englishProjects[project.id];
  const [expanded, setExpanded] = useState(false);
  const [roomNight, setRoomNight] = useState(false);
  const [illustrationDark, setIllustrationDark] = useState(false);
  return (
    <article className={`project project-${project.id}`}>
      <div
        className={`project-art ${illustrationDark ? "illustration-dark" : ""}`}
      >
        <div className="art-toolbar">
          <span>{project.name}</span>
          {project.id === "roomlab" ? (
            <button
              className="room-light-toggle"
              role="switch"
              aria-checked={roomNight}
              aria-label={t.roomNightLabel}
              onClick={() => setRoomNight(!roomNight)}
            >
              <span aria-hidden="true">
                <Icon name={roomNight ? "moon" : "sun"} />
              </span>{" "}
              {roomNight ? t.nightLight : t.dayLight}
            </button>
          ) : (
            <button
              className="room-light-toggle illustration-theme-toggle"
              role="switch"
              aria-checked={illustrationDark}
              aria-label={`${t.illustrationDarkLabel}: ${project.name}`}
              onClick={() => setIllustrationDark(!illustrationDark)}
            >
              <span aria-hidden="true">
                <Icon name={illustrationDark ? "sun" : "moon"} />
              </span>
              {illustrationDark ? t.lightMode : t.darkMode}
            </button>
          )}
        </div>
        <div className="project-visual">
          <div className="visual-layer illustration-layer is-active">
            {project.id === "barberag" ? (
              <BarberIllustration />
            ) : project.id === "roomlab" ? (
              <RoomIllustration night={roomNight} />
            ) : project.id === "sentinel" ? (
              <SentinelIllustration />
            ) : (
              <MonitorIllustration />
            )}
          </div>
        </div>
      </div>
      <div className="project-info">
        <span className="project-category">{copy.category}</span>
        <h3>{project.name}</h3>
        <p>{copy.description}</p>
        <ul className="project-tags" aria-label={t.technologies}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="project-links">
          {project.demo && (
            <a
              className="text-link"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
            >
              {t.exploreProject} <Arrow diagonal />
            </a>
          )}
          {project.repo && (
            <a
              className="text-link secondary-link"
              href={project.repo}
              target="_blank"
              rel="noreferrer"
            >
              {t.viewCode} <Arrow diagonal />
            </a>
          )}
        </div>
        <button
          className="project-detail-toggle"
          aria-expanded={expanded}
          aria-controls={`${project.id}-detail`}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? t.closeDetails : t.insideProject}
          <span aria-hidden="true">
            <Icon name={expanded ? "minus" : "plus"} />
          </span>
        </button>
        <div
          id={`${project.id}-detail`}
          aria-hidden={!expanded}
          inert={!expanded}
          className={`project-detail ${expanded ? "is-open" : ""}`}
        >
          <div className="project-detail-content">
            <p>{copy.note}</p>
            <p>{copy.details}</p>
          </div>
        </div>
      </div>
    </article>
  );
});

function AcademicProject() {
  const { t, language } = useLanguage();
  const copy = language === "pt" ? academicProject : englishAcademicProject;
  return (
    <article className="academic-project" aria-labelledby="recette-title">
      <div className="academic-heading">
        <svg
          className="recipe-notebook"
          viewBox="0 0 86 104"
          fill="none"
          aria-hidden="true"
        >
          <path d="M12 14 70 8l6 82-58 6Z" fill="#e7b5ca" />
          <path d="m9 10 58-6 6 82-58 6Z" fill="#fff8fb" stroke="#cda2b6" />
          <path d="m19 9 6 82" stroke="#e7cdd8" />
          <path
            d="m29 54 27-3m-26 11 23-3m-22 11 18-2"
            stroke="#ad708b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="m37 39-1-8c-8-3-3-14 3-10 3-8 14-4 12 3 8 1 9 10 1 12l1 3Z"
            stroke="#691b3e"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="m38 34 13-2"
            stroke="#691b3e"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="m56 88 2 12 4-4 5 3-2-12" fill="#ef75a3" />
        </svg>
        <div>
          <p className="academic-category">{t.academicCategory}</p>
          <h3 id="recette-title">{academicProject.name}</h3>
        </div>
      </div>
      <div className="academic-copy">
        <p>{copy.description}</p>
        <p className="academic-contribution">{copy.contribution}</p>
        <div className="academic-footer">
          <ul className="project-tags" aria-label={t.recetteTechnologies}>
            {academicProject.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <a
            className="text-link"
            href={academicProject.repo}
            target="_blank"
            rel="noreferrer"
          >
            {t.viewGithubProject} <Arrow diagonal />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const { t } = useLanguage();
  const [motion, setMotion] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const toggleMotion = useCallback(() => setMotion((on) => !on), []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mascotAway, setMascotAway] = useState(false);
  const [headerSurface, setHeaderSurface] = useState<HeaderSurface>({
    expanded: false,
    covered: false,
  });
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 650px)");
    function resizeMenu(event: MediaQueryListEvent) {
      if (event.matches && navigation.current?.contains(document.activeElement))
        menuButton.current?.focus({ preventScroll: true });
      if (!event.matches) {
        setMenuOpen(false);
        if (document.activeElement === menuButton.current)
          document
            .querySelector<HTMLAnchorElement>(".brand")
            ?.focus({ preventScroll: true });
      }
    }
    mobile.addEventListener("change", resizeMenu);
    return () => mobile.removeEventListener("change", resizeMenu);
  }, []);
  useEffect(() => {
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    function outside(event: globalThis.PointerEvent) {
      if (
        menuOpen &&
        event.target instanceof Element &&
        !event.target.closest(".site-header")
      )
        setMenuOpen(false);
    }
    window.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [menuOpen]);
  async function copyContact() {
    try {
      await navigator.clipboard.writeText(profile.email || profile.github);
      setCopied(true);
      setCopyFailed(false);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  }
  return (
    <div
      className="portfolio"
      data-motion={motion ? "on" : "off"}
      data-mascot-away={mascotAway}
    >
      <a className="skip-link" href="#conteudo">
        {t.skip}
      </a>
      <header className="site-header">
        <HeaderStretch {...headerSurface} />
        <div className="site-header-inner">
          <a
            className="brand"
            href="#inicio"
            aria-label={`${profile.name}, ${t.home}`}
          >
            <span className="sr-only">S</span>
            <svg
              className="brand-initial"
              viewBox="13 13 35 41"
              aria-hidden="true"
              fill="none"
            >
              <path
                d="M43 20c-4-4-20-5-20 3 0 9 21 4 21 16 0 11-21 12-27 3"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
            <span>amuel</span>
            <span className="sr-only"> S</span>
            <svg
              className="brand-initial brand-surname"
              viewBox="13 13 35 41"
              aria-hidden="true"
              fill="none"
            >
              <path
                d="M43 20c-4-4-20-5-20 3 0 9 21 4 21 16 0 11-21 12-27 3"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
            <span>antos</span>
          </a>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? t.close : t.menu}
            <span aria-hidden="true">
              <Icon name={menuOpen ? "close" : "plus"} />
            </span>
          </button>
          <nav
            ref={navigation}
            id="main-nav"
            className={menuOpen ? "nav-open" : ""}
            aria-label={t.navigation}
          >
            <a href="#projetos" onClick={() => setMenuOpen(false)}>
              {t.projects}
            </a>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>
              {t.about}
            </a>
            <a href="#contato" onClick={() => setMenuOpen(false)}>
              {t.contact}
            </a>
            <a
              className="nav-github"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <Arrow diagonal />
            </a>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>
      <main id="conteudo" tabIndex={-1}>
        <section
          className="hero section-shell"
          id="inicio"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <h1 id="hero-title">
              <span className="hero-greeting">{t.hello}</span>samuel
              <span className="name-period">.</span>
            </h1>
            <p className="hero-description">
              {t.heroLead}
            </p>
            <p className="hero-support">
              {t.heroRole}
              <br />
              {t.heroSupport}
            </p>
            <a className="primary-button" href="#projetos">
              {t.seeProjects} <Arrow />
            </a>
            <div className="hero-location">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M15 8c0 4-5 9-5 9S5 12 5 8a5 5 0 0 1 10 0Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <circle
                  cx="10"
                  cy="8"
                  r="1.7"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
              {t.location}
            </div>
          </div>
          <Workbench
            mascotAway={mascotAway}
            motion={motion}
            onMotionChange={toggleMotion}
          />
        </section>
        <div className="section-transition section-shell">
          <span>
            {t.scroll}
            <span aria-hidden="true">
              <Icon name="down" />
            </span>
          </span>
        </div>
        <section
          id="projetos"
          className="projects-section section-shell"
          aria-labelledby="projects-title"
        >
          <div className="section-heading">
            <div>
              <h2 id="projects-title" className="projects-heading-title">
                {t.projectsTitle}
                <SectionStroke motion={motion} />
              </h2>
            </div>
          </div>
          <div className="projects-list">
            {projects.map((project) => (
              <Project key={project.id} project={project} />
            ))}
          </div>
          <AcademicProject />
          <a
            className="all-projects"
            href={`${profile.github}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
            {t.moreGithub}
            <Arrow diagonal />
          </a>
        </section>
        <section
          id="sobre"
          className="about-section"
          aria-labelledby="about-title"
        >
          <div className="section-shell about-layout">
            <div className="about-heading">
              <h2 id="about-title">
                {t.niceToMeet}
                <br />
                Samuel.
              </h2>
              <div className="about-signature">
                <span className="signature-loop" aria-hidden="true">
                  s.
                </span>
              </div>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                {t.aboutLead}
              </p>
              <p>
                {t.aboutFocus}
              </p>
              <p>
                {t.aboutAI}
              </p>
              <p>
                {t.aboutEducation}
              </p>
              <p>{t.aboutLanguages}</p>
              <div className="toolbox">
                <h3>{t.toolbox}</h3>
                <ul>
                  {profile.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
              <div className="about-footer">
                <span>{t.location}</span>
                <a
                  className="text-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.followBuild} <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
        </section>
        <DeferredContributions motion={motion} />
        <section
          id="contato"
          className="contact-section section-shell"
          aria-labelledby="contact-title"
        >
          <div className="contact-prelude">
            <Spark />
          </div>
          <div className="contact-main">
            <h2 id="contact-title">
              {t.letsBuild}
              <br />
              {t.somethingGood}
            </h2>
            <div className="contact-copy">
              <p>
                {t.haveIdea}
                <br /> {t.opportunity}
                <br /> {t.connect}
              </p>
              <a
                className="primary-button"
                href={
                  profile.email ? `mailto:${profile.email}` : profile.github
                }
                target={profile.email ? undefined : "_blank"}
                rel={profile.email ? undefined : "noreferrer"}
              >
                {profile.email ? t.emailMe : t.findGithub}
                <Arrow diagonal />
              </a>
              <button className="copy-contact" onClick={copyContact}>
                {copied
                  ? t.copied
                  : profile.email
                    ? t.copyEmail
                    : t.copyProfile}
                <span aria-hidden="true">
                  <Icon name={copied ? "check" : "copy"} />
                </span>
              </button>
              <span className="copy-status" role="status">
                {copyFailed
                  ? t.copyFailed
                  : copied
                    ? t.copySuccess
                    : ""}
              </span>
            </div>
          </div>
          <div className="contact-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <Arrow diagonal />
            </a>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <Arrow diagonal />
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`}>
                {profile.email}
                <Arrow diagonal />
              </a>
            )}
            <a className="back-top" href="#inicio">
              {t.backTop} <span aria-hidden="true">↑</span>
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <span>
          © {new Date().getFullYear()} {profile.fullName}
        </span>
      </footer>
      <PageMascot
        motion={motion}
        onAwayChange={setMascotAway}
        onHeaderChange={setHeaderSurface}
      />
    </div>
  );
}
