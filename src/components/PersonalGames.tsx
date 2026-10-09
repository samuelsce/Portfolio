import { useEffect, useRef, useState } from "react";

import { useLanguage } from "../i18n/LanguageProvider";
import { personalCopy } from "../i18n/personal";
import MascotArtwork from "./MascotArtwork";

type ShotPhase = "ready" | "aiming" | "flying" | "done";
const shotDuration = 1100;
const recordKey = "samuel-personal-three-best";
function readRecord() {
  try {
    const value = Number(localStorage.getItem(recordKey));
    return Number.isInteger(value) && value >= 0 && value <= 15 && value % 3 === 0 ? value : 0;
  } catch { return 0; }
}

export function ThreePointGame({ motion }: { motion: boolean }) {
  const { language } = useLanguage();
  const c = personalCopy[language].basketball;
  const [phase, setPhase] = useState<ShotPhase>("aiming");
  const [shots, setShots] = useState(0), [points, setPoints] = useState(0);
  const [best, setBest] = useState(readRecord);
  const [assist, setAssist] = useState(false), [stillAim, setStillAim] = useState(.5);
  const [hit, setHit] = useState(false);
  const meter = useRef<HTMLDivElement>(null), marker = useRef<HTMLSpanElement>(null);
  const ball = useRef<SVGGElement>(null), player = useRef<HTMLDivElement>(null), net = useRef<SVGGElement>(null);
  const aim = useRef<Animation | null>(null);
  const locked = useRef(false);
  const still = !motion || assist;

  useEffect(() => {
    if (phase !== "aiming" || still) return;
    const track = meter.current!, node = marker.current!;
    function start() {
      const time = aim.current?.currentTime;
      aim.current?.cancel();
      aim.current = node.animate([{ transform: "translateX(0px)" }, { transform: `translateX(${track.clientWidth - 10}px)` }], { duration: shotDuration, iterations: Infinity, direction: "alternate", easing: "linear" });
      if (typeof time === "number") aim.current.currentTime = time;
      if (document.hidden) aim.current.pause();
    }
    start();
    const resize = new ResizeObserver(start);
    resize.observe(track);
    const visibility = () => { if (document.hidden) aim.current?.pause(); else aim.current?.play(); };
    document.addEventListener("visibilitychange", visibility);
    return () => { resize.disconnect(); aim.current?.cancel(); aim.current = null; document.removeEventListener("visibilitychange", visibility); };
  }, [phase, still]);

  useEffect(() => {
    if (phase !== "flying") return;
    let active = true;
    function finish() {
      if (!active) return;
      locked.current = false;
      setPhase(shots >= 5 ? "done" : "aiming");
    }
    if (!motion) { finish(); return; }
    // The flight stays in a fixed SVG coordinate system. No geometry reads or
    // React updates per frame; the ball crosses the rim from above.
    const rimX = hit ? 351 : 329, rimY = hit ? 135 : 129;
    const frames: Keyframe[] = Array.from({ length: 27 }, (_, i) => {
      const u = i / 26;
      const y = 208 * (1 - u) ** 2 - 40 * (1 - u) * u + rimY * u ** 2;
      return { transform: `translate(${(rimX - 149) * u}px,${y - 208}px) rotate(${330 * u}deg)`, offset: .14 + .71 * u };
    });
    for (let i = 1; i <= 7; i++) {
      const u = i / 7;
      const x = rimX - (hit ? 0 : 22 * u);
      const y = rimY + (hit ? 107 * u ** 2 : -70 * u + 165 * u ** 2);
      frames.push({ transform: `translate(${x - 149}px,${y - 208}px) rotate(${330 + 90 * u}deg)`, offset: .85 + .15 * u });
    }
    frames.unshift({ transform: "translate(0px,0px) rotate(0deg)", offset: 0 }, { transform: "translate(-9px,3px) rotate(-12deg)", offset: .08 });
    const animation = ball.current!.animate(frames, { duration: 1000, easing: "linear" });
    const step = player.current!.animate([{ transform: "translate(0px,0px)" }, { transform: "translate(-9px,3px)", offset: .15 }, { transform: "translate(-10px,-8px)", offset: .42 }, { transform: "translate(-8px,1px)", offset: .8 }, { transform: "translate(0px,0px)" }], { duration: 740, easing: "cubic-bezier(.2,.7,.2,1)" });
    const swish = hit ? net.current!.animate([{ transform: "scaleY(1)" }, { transform: "scaleY(1.14)", offset: .4 }, { transform: "scaleY(1)" }], { duration: 200, delay: 780 }) : undefined;
    const animations = [animation, step, swish].filter((a): a is Animation => Boolean(a));
    if (document.hidden) animations.forEach(a => a.pause());
    const visibility = () => animations.forEach(a => document.hidden ? a.pause() : a.play());
    document.addEventListener("visibilitychange", visibility);
    animation.finished.then(finish, () => {});
    return () => { active = false; animations.forEach(a => a.cancel()); document.removeEventListener("visibilitychange", visibility); };
  }, [phase, motion, shots, hit]);

  function shoot() {
    if (document.hidden || locked.current) return;
    if (phase === "ready" || phase === "done") {
      setShots(0); setPoints(0); setHit(false); setPhase("aiming"); return;
    }
    if (phase !== "aiming") return;
    locked.current = true;
    const time = Number(aim.current?.currentTime ?? 0);
    const progress = (time % (shotDuration * 2)) / shotDuration;
    const position = still ? stillAim : progress > 1 ? 2 - progress : progress;
    const made = Math.abs(position - .5) <= .115;
    const score = points + (made ? 3 : 0);
    setHit(made); setShots(n => n + 1); setPoints(score); setPhase("flying");
    if (score > best) {
      setBest(score);
      try { localStorage.setItem(recordKey, String(score)); } catch { /* Session record works without storage. */ }
    }
  }
  return <div className="three-game" data-phase={phase}>
    <div className="personal-stage court-stage">
      <svg className="court-lines" viewBox="0 0 440 280" aria-hidden="true">
        <defs><radialGradient id="basketball-material" cx=".3" cy=".25" r=".8"><stop stopColor="#efbe91" /><stop offset=".6" stopColor="#d58c5d" /><stop offset="1" stopColor="#b56c49" /></radialGradient></defs><path d="M0 238h440v42H0Z" fill="#e9cbd7" /><path d="M40 261h70m18 0h96m25 0h110M90 242v38m164-38v38" stroke="#dab4c5" fill="none" /><path d="M28 238h384M50 220v-36c0-43 64-78 143-78s143 35 143 78v36M273 238v-47h128v47" fill="none" stroke="#d8a8bd" strokeWidth="2" />
        <path d="M366 170v61" stroke="#745563" strokeWidth="5" />
        <rect x="318" y="83" width="66" height="54" rx="4" fill="#fff7fa" stroke="#957483" strokeWidth="3" />
        <path d="M336 99h28v22h-28Z" fill="none" stroke="#ef75a3" strokeWidth="2" />
        <g ref={net} className="basket-net" stroke="#947381" fill="none"><path d="m330 139 7 26h29l7-26m-37 0 9 26m0-26 7 26m4-26 3 26m-26-15h34m-30 8h28" /></g>
        <ellipse cx="351" cy="138" rx="24" ry="4" fill="none" stroke="#a24b65" strokeWidth="4" />
        <g ref={ball} className="shot-ball"><circle cx="149" cy="208" r="12" fill="url(#basketball-material)" stroke="#694630" strokeWidth="1.5" /><path d="M137 208h24m-12-12v24m-8-20c9 3 9 13 0 16m16-16c-9 3-9 13 0 16" fill="none" stroke="#694630" /></g>
      </svg>
      <div ref={player} className="court-player"><MascotArtwork /></div>
      <button className="court-shoot-zone" aria-label={c.action} onClick={shoot} disabled={phase === "flying"} />
    </div>
    <p className="game-instructions">{c.ready}</p>
    <div className="shot-meter" ref={meter} role="img" aria-label={c.aim} data-still={still}>
      <span className="shot-zone" /><span className="shot-marker" ref={marker} style={still ? { left: `${stillAim * 100}%`, transform: "translateX(-50%)" } : undefined} />
    </div>
    <div className="game-score"><span>{c.attempts} <strong>{shots}/5</strong></span><span>{c.points} <strong>{points}</strong></span><span>{c.best} <strong>{best}</strong></span></div>
    <div className="game-feedback" role="status">{phase === "flying" ? c.flying : shots === 0 ? c.aiming : `${hit ? c.swish : c.miss}${phase === "done" ? ` ${c.end}` : ""}`}</div>
    <button className="personal-action shoot-action" onClick={shoot} disabled={phase === "flying"}>{phase === "ready" ? c.start : phase === "done" ? personalCopy[language].restart : c.action}</button>
    <label className="still-aim"><input type="checkbox" checked={still} disabled={!motion || phase === "flying"} onChange={event => setAssist(event.target.checked)} />{c.assist}</label>
    {still && <div className="still-choices" role="group" aria-label={c.aim}>{[c.left, c.center, c.right].map((label, i) => <button key={i} aria-pressed={stillAim === i / 2} disabled={phase === "flying"} onClick={() => setStillAim(i / 2)}>{label}</button>)}</div>}
  </div>;
}
