import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../i18n/LanguageProvider";
import { personalCopy } from "../i18n/personal";
import { personalTopics } from "./personal-secrets";
import type { PersonalTopic } from "./personal-secrets";
import { ThreePointGame, BridgeGame } from "./PersonalGames";
import MascotArtwork from "./MascotArtwork";
import Icon from "./Icon";
import "../personal-arcade.css";

function TopicIcon({ topic }: { topic: PersonalTopic }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {topic === "voyage" && <><path d="M4 20c0-2 5-4 12-4s12 2 12 4-5 4-12 4S4 22 4 20Zm4-3 2-7c3-2 9-2 12 0l2 7M9 13c4 2 10 2 14 0" /></>}
    {topic === "ghosts" && <><path d="M5 21h22L23 9l-7 2-7-2-4 12Zm2-4h18" /><path d="m22 26 3 3m-15-3-3 3" /></>}
    {topic === "basketball" && <><circle cx="16" cy="16" r="11" /><path d="M5 16h22M16 5v22M8 8c12 3 12 13 0 16M24 8c-12 3-12 13 0 16" /></>}
    {topic === "blocks" && <><path d="m5 10 11-5 11 5-11 6-11-6Zm0 0v13l11 5 11-5V10M16 16v12M5 15l11 5 11-5" /></>}
    {topic === "valorant" && <><path d="m16 4 11 10-11 14L5 14 16 4Zm0 8 5 4-5 6-5-6 5-4Z" /></>}
    {topic === "bahia" && <><path d="M4 17h24c-1 8-7 11-12 11S5 25 4 17Zm2 0c-1-7 8-10 10-6 5-8 12 1 9 6M8 5l9 8M23 4l-4 9" /></>}
    {topic === "toddy" && <><path d="M10 10 5 7c-5 5 0 13 4 12M22 10l5-3c5 5 0 13-4 12M9 11c3-5 11-5 14 0v10c-2 8-12 8-14 0V11Z" /><circle cx="13" cy="17" r=".8" /><circle cx="20" cy="17" r=".8" /><path d="m14 21 2 2 2-2M16 23v2" /></>}
  </svg>;
}

function CostumeMascot({ type, className = "" }: { type?: "straw" | "fedora"; className?: string }) {
  return <div className={`personal-mascot ${className}`} aria-hidden="true"><MascotArtwork />{type && <svg className="personal-costume" viewBox="0 0 112 126">
    {type === "straw" ? <><path d="M30 28 34 10Q56 0 78 10l5 18Z" fill="#d6ae66" stroke="#8f653c" /><path d="M30 21h51v7H30Z" fill="#a94d64" /><ellipse cx="56" cy="29" rx="42" ry="7" fill="#e8c27c" stroke="#8f653c" /><path d="m20 29 72 0M36 12l-2 9m11-12-1 12m11-13v13m12-12 1 12m10-9 2 9" fill="none" stroke="#ad8751" strokeWidth="1" /></> : <><path d="m25 25 6-24 24 7 24-7 7 24Z" fill="#382732" stroke="#21151d" /><path d="M29 18h54v7H29Z" fill="#fff0f5" /><path d="M16 25h79v5H16Z" fill="#21151d" /><path d="m86 79 2-7 3 1 2 8 7 0 1 5-4 5-10-1-4-7Z" fill="#fff7fa" stroke="#a48493" /></>}
  </svg>}</div>;
}

function VoyageScene({ replay, action }: { replay: number; action: string }) {
  return <div className="personal-stage voyage-stage" key={replay} aria-hidden="true">
    <svg viewBox="0 0 440 280" className="voyage-ocean"><circle cx="345" cy="60" r="27" fill="#f0d6b6" /><path d="M0 198q30-10 60 0t60 0t60 0t60 0t60 0t60 0t90 0v90H0Z" fill="#e0bfd2" /><path d="M0 234q30-8 60 0t60 0t60 0t60 0t60 0t60 0t90 0" fill="none" stroke="#bb829e" strokeWidth="2" /><path d="M42 93q10-10 20 0m0 0q10-10 20 0M100 62q8-8 16 0m0 0q8-8 16 0" fill="none" stroke="#b29aac" strokeWidth="2" /><path d="m348 192 49-51 43 45v23h-92Z" fill="#b79eaf" /></svg>
    <div className="voyage-boat"><CostumeMascot type="straw" /><svg viewBox="0 0 230 140"><path d="M20 72h193l-36 56H54Z" fill="#a56e62" stroke="#705151" strokeWidth="2" /><path d="M23 81h184m-163 20h151m-138 17h116" stroke="#d1a899" fill="none" /><path d="M157 9v67" stroke="#745761" strokeWidth="4" /><path d="m160 11 0 53h57Q211 35 160 11Z" fill="#fff7fa" stroke="#c5a1b4" /><path d="m160 13 27 51" stroke="#ecd7e1" /></svg></div>
    <span className="sr-only">{action}</span>
  </div>;
}

function GhostsScene({ replay }: { replay: number }) {
  return <div className="personal-stage ghosts-stage" key={replay} aria-hidden="true"><svg viewBox="0 0 440 280" className="ghosts-set"><path d="M62 244 130 34h182l66 210Z" fill="#e7ccd9" /><path d="M43 244h354" stroke="#ac8298" strokeWidth="2" /><g className="ghosts-visitors" fill="#fff7fa" stroke="#c299b1"><path d="M59 129q0-28 22-28t22 28v44l-11-6-11 6-11-6-11 6Z" /><path d="M340 110q0-26 20-26t20 26v40l-10-6-10 6-10-6-10 6Z" /></g><g fill="#79566d"><circle cx="75" cy="126" r="2" /><circle cx="88" cy="126" r="2" /><circle cx="354" cy="109" r="2" /><circle cx="366" cy="109" r="2" /></g><g className="ghosts-spark" stroke="#a97090"><path d="M113 52v14m-7-7h14M318 190v14m-7-7h14" /></g></svg><CostumeMascot type="fedora" className="moonwalk-mascot" /><span className="ghosts-track">Ghosts</span></div>;
}

function TargetScene({ labels }: { labels: { target: string; found: string; action: string } }) {
  const [hits, setHits] = useState<boolean[]>([false, false, false]);
  const restart = useRef<HTMLButtonElement>(null);
  const done = hits.every(Boolean);
  useEffect(() => { if (done) restart.current?.focus({ preventScroll: true }); }, [done]);
  return <><div className="personal-stage target-stage" data-complete={done}>
    <svg viewBox="0 0 440 280" aria-hidden="true"><path d="m40 34 360 0 0 205-360 0Z" fill="none" stroke="#e5c9d7" /><path d="M40 190h360M220 34v205" stroke="#e5c9d7" strokeDasharray="3 8" /><g className="ascendant-badge"><path d="m220 54 73 67-73 90-73-90Z" fill="#88b2a3" stroke="#497765" strokeWidth="2" /><path d="m220 92 31 28-31 40-31-40Z" fill="#f1fff7" /><path d="m174 102 46-29 46 29" fill="none" stroke="#d2ecdf" strokeWidth="2" /></g></svg>
    {hits.map((hit, i) => <button className="personal-target" key={i} data-target={i} data-hit={hit} aria-label={`${labels.target} ${i + 1}`} aria-pressed={hit} onClick={() => setHits(old => old.map((value, n) => n === i || value))}><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="18" /><circle cx="24" cy="24" r="8" /><path d="M24 2v12m0 20v12M2 24h12m20 0h12" /></svg></button>)}
  </div><div className="game-feedback" role="status">{done ? labels.found : `${hits.filter(Boolean).length}/3`}</div><button className="personal-action" ref={restart} onClick={() => setHits([false, false, false])}>{labels.action}</button></>;
}

function ToddyScene({ replay }: { replay: number }) {
  return <div className="personal-stage toddy-stage" key={replay} aria-hidden="true"><svg viewBox="0 0 440 280">
    <path d="M35 241h370" stroke="#d7b4c7" strokeWidth="2" /><ellipse className="toddy-shadow" cx="217" cy="243" rx="71" ry="7" fill="#ead5df" />
    <g className="toddy-dog"><g className="toddy-tail"><path d="M263 192q40-27 22-49" fill="none" stroke="#8b6c62" strokeWidth="18" strokeLinecap="round" /></g><path d="M162 196q4-39 61-29t50 57h-101Z" fill="#ad9182" /><g className="toddy-feet" fill="#7e625a"><rect x="172" y="215" width="15" height="26" rx="6" /><rect x="246" y="215" width="15" height="26" rx="6" /></g><g className="toddy-head"><path d="M163 120q-39-18-30 29t35 31m57-60q40-18 32 28t-32 32" fill="#7e625a" /><path d="M158 119q16-22 48-16t27 49q0 45-36 45t-45-43Z" fill="#baa08e" /><path d="m166 115 5 11 8-14 8 12 8-14 7 12 9-11 6 14" fill="none" stroke="#dbc5b1" strokeWidth="6" strokeLinecap="round" /><ellipse cx="177" cy="149" rx="4" ry="5" fill="#382c2b" /><ellipse cx="215" cy="149" rx="4" ry="5" fill="#382c2b" /><ellipse cx="197" cy="171" rx="24" ry="18" fill="#e7d3bc" /><path d="m189 164q9-7 17 0l-9 8Z" fill="#44302e" /><path d="M197 172v8m-9-2q9 8 18 0" fill="none" stroke="#674d47" strokeWidth="2" /><path d="M196 183q7-1 6 9t-9 0Z" fill="#da8c9e" /><path d="M170 189q24 12 50 0" fill="none" stroke="#b86384" strokeWidth="5" /><circle cx="200" cy="200" r="6" fill="#efc788" /></g></g>
    <g className="toddy-bone" fill="#fff7fa" stroke="#be9aab"><path d="m313 227 19-8q2-11 9-5 7 5 1 10 11 2 6 10-6 7-12-1l-19 8q-3 11-10 5-7-6 0-11-11-1-6-9 6-7 12 1Z" /></g>
  </svg></div>;
}

function FoodScene({ food }: { food: number }) {
  return <div className="personal-stage food-stage" data-food={food} key={food} aria-hidden="true"><svg viewBox="0 0 440 280">
    <ellipse cx="220" cy="216" rx="125" ry="15" fill="#e9d0dc" /><ellipse cx="220" cy="190" rx="114" ry="38" fill="#fff7fa" stroke="#c9a0b5" strokeWidth="2" />
    {food === 0 ? <><path d="M145 158q-4-52 76-54t79 54q-2 57-80 57t-75-57Z" fill="#b46f40" stroke="#805038" strokeWidth="2" /><path d="M152 152q66-29 139 0l-6 19q-61 20-127 0Z" fill="#ecd6a4" /><path d="m164 151 23-8 17 8 28-13 36 10 18 9" fill="none" stroke="#a75c40" strokeWidth="10" /><path d="m171 154 15 5m31-14 11 8m22-1 13 7" stroke="#73916c" strokeWidth="5" /><path d="m204 121q26-17 43 0l-9 11q-19-13-29 0Z" fill="#dc9c78" /></> : food === 1 ? <><path d="M119 158h202q-14 68-101 68t-101-68Z" fill="#b77b99" stroke="#8a5672" strokeWidth="2" /><ellipse cx="220" cy="158" rx="101" ry="26" fill="#dfbb86" /><path d="M142 148q30-19 58 0t58 0t33 2m-134 18q30-19 58 0t58 0m-109-14q30 19 58 0t58 0" fill="none" stroke="#aa7c4e" strokeWidth="3" /><path d="m173 145 14-10m60 20 18-10m-45 24 14-8" stroke="#678764" strokeWidth="7" /><path d="m153 161 14-8m62-15 15 8m34 24 13-11" stroke="#d28253" strokeWidth="6" /><path d="m283 124 51-47m-39 51 51-46" stroke="#785245" strokeWidth="4" strokeLinecap="round" /></> : <><g fill="#e4a18c" stroke="#ba7266" strokeWidth="2">{[0,1,2].map(i => <g key={i} transform={`translate(${i * 55} ${i % 2 ? -24 : 0})`}><path d="M150 153q-22 10-7 32t35 10q19-14 3-28l-12 6q11 7-1 13t-13-8q-6-13 5-17Z" /><path d="m150 153 14-9 3 17Z" /><path d="m147 166 8 2m-10 10 9-2m-3 15 7-6m5 11 1-10" /></g>)}</g><path d="m151 213 10-11m108 9 8-10" stroke="#73916c" strokeWidth="5" /></>}
  </svg></div>;
}

export default function PersonalArcade({ initial, motion, onClose }: { initial: PersonalTopic; motion: boolean; onClose: () => void }) {
  const { language } = useLanguage();
  const c = personalCopy[language];
  const [topic, setTopic] = useState(initial), [replay, setReplay] = useState(0), [food, setFood] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const activeTab = useRef<HTMLButtonElement>(null);
  const info = c[topic];
  useEffect(() => {
    const node = dialog.current!, portfolio = document.querySelector<HTMLElement>(".portfolio")!;
    const overflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    portfolio.dataset.arcadeOpen = "true";
    window.dispatchEvent(new Event("portfolio:arcadechange"));
    const visibility = () => { node.dataset.paused = String(document.hidden); };
    document.addEventListener("visibilitychange", visibility); visibility();
    return () => { node.close(); document.body.style.overflow = overflow; delete portfolio.dataset.arcadeOpen; window.dispatchEvent(new Event("portfolio:arcadechange")); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  function choose(next: PersonalTopic) { setTopic(next); setReplay(n => n + 1); }
  function keepFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled)')).filter(node => node.tabIndex >= 0);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  function tabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowRight" ? (index + 1) % personalTopics.length : event.key === "ArrowLeft" ? (index + personalTopics.length - 1) % personalTopics.length : event.key === "Home" ? 0 : event.key === "End" ? personalTopics.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault(); choose(personalTopics[next]);
    dialog.current?.querySelector<HTMLButtonElement>(`[data-topic="${personalTopics[next]}"]`)?.focus();
  }
  let content: ReactNode;
  if (topic === "basketball") content = <ThreePointGame motion={motion} />;
  else if (topic === "blocks") content = <BridgeGame />;
  else if (topic === "valorant") content = <TargetScene labels={c.valorant} />;
  else if (topic === "bahia") content = <><FoodScene food={food} /><div className="food-choices" role="group" aria-label={c.bahia.detail}>{c.bahia.foods.map((label, index) => <button key={index} aria-pressed={food === index} onClick={() => setFood(index)}>{label}</button>)}</div></>;
  else content = <>{topic === "voyage" ? <VoyageScene replay={replay} action={c.voyage.action} /> : topic === "ghosts" ? <GhostsScene replay={replay} /> : <ToddyScene replay={replay} />}<button className="personal-action" onClick={() => setReplay(n => n + 1)}>{c[topic].action}</button></>;
  return createPortal(<dialog className="personal-arcade" ref={dialog} data-motion={motion ? "on" : "off"} aria-labelledby="personal-title" aria-describedby="personal-story" onKeyDown={keepFocus} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target !== event.currentTarget) return; const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) onClose(); }}>
    <div className="personal-heading"><span>{c.title}</span><button className="personal-close" onClick={onClose} aria-label={c.close}><Icon name="close" /></button></div>
    <nav className="personal-tabs" role="tablist" aria-label={c.collection}>{personalTopics.map((kind, i) => <button key={kind} ref={kind === topic ? activeTab : undefined} data-topic={kind} id={`personal-tab-${kind}`} role="tab" aria-selected={kind === topic} aria-controls="personal-panel" tabIndex={kind === topic ? 0 : -1} title={c[kind].title} aria-label={c[kind].title} onClick={() => choose(kind)} onKeyDown={event => tabs(event, i)}><TopicIcon topic={kind} /></button>)}</nav>
    <div id="personal-panel" role="tabpanel" aria-labelledby={`personal-tab-${topic}`}>
      <div className="personal-layout"><div className="personal-story"><h2 id="personal-title">{info.title}</h2><p id="personal-story">{info.story}</p><p>{info.detail}</p></div><div className="personal-play" key={topic}>{content}</div></div>
    </div>
  </dialog>, document.body);
}
