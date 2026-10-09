import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { createPortal } from "react-dom";

import { useLanguage } from "../i18n/LanguageProvider";
import { personalCopy } from "../i18n/personal";
import MascotArtwork from "./MascotArtwork";

type ShotPhase = "ready" | "aiming" | "flying" | "done";
const shotDuration = 1100;
function Basketball({ held = false, material }: { held?: boolean; material: string }) {
  return <g transform={held ? "translate(100 76)" : undefined}><circle r="11" fill={`url(#${material})`} stroke="#80523a" strokeWidth="1" /><path d="M-10.5 0h21M0-10.5v21M-7-8c5 4 5 12 0 16M7-8c-5 4-5 12 0 16" fill="none" stroke="#80523a" strokeWidth=".9" /><path d="M-7-5q2-3 5-3" stroke="#ffe1b7" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity=".7" />{held && <path d="M-7 4q1 5 7 5m-5-1 4-1m-1 2 3-2" stroke="#ed99b8" strokeWidth="2.4" strokeLinecap="round" fill="none" />}</g>;
}
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
  const material = `court-${useId().replace(/:/g, "")}`;
  const [phase, setPhase] = useState<ShotPhase>("aiming");
  const [shots, setShots] = useState(0), [points, setPoints] = useState(0);
  const [best, setBest] = useState(readRecord);
  const [assist, setAssist] = useState(false), [stillAim, setStillAim] = useState(.5);
  const [hit, setHit] = useState(false);
  const meter = useRef<HTMLDivElement>(null), marker = useRef<HTMLSpanElement>(null);
  const ball = useRef<SVGGElement>(null), player = useRef<HTMLDivElement>(null), net = useRef<SVGGElement>(null);
  const aim = useRef<Animation | null>(null);
  const shootButton = useRef<HTMLButtonElement>(null);
  const [hand, setHand] = useState<Element | null>(null);
  const shotStart = useRef({ x:146, y:208, shoulderX:133, shoulderY:189 });
  const ground = useRef<SVGEllipseElement>(null);
  useEffect(() => { setHand(player.current!.querySelector(".arm-right")); }, []);
  const locked = useRef(false);
  const still = !motion || assist;

  useEffect(() => {
    // Run after showModal, which otherwise focuses the dialog's close button.
    const frame = requestAnimationFrame(() => shootButton.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase !== "aiming" || still) return;
    const track = meter.current!, node = marker.current!;
    let travel = -1;
    function start() {
      const nextTravel = Math.max(0, track.clientWidth - 10);
      if (nextTravel === travel) return;
      travel = nextTravel;
      const time = aim.current?.currentTime;
      aim.current?.cancel();
      aim.current = node.animate([{ transform: "translateX(0px)" }, { transform: `translateX(${travel}px)` }], { duration: shotDuration, iterations: Infinity, direction: "alternate", easing: "linear" });
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
    // Read the hand once at release. Preflight follows the same shoulder
    // rotation as the arm; the independent ball only leaves it at the apex.
    const rimX = hit ? 351 : 329, rimY = hit ? 135 : 129;
    const grip = shotStart.current, vx = grip.x-grip.shoulderX, vy = grip.y-grip.shoulderY;
    const releaseAngle = -95*Math.PI/180;
    const releaseX = grip.shoulderX + vx*Math.cos(releaseAngle)-vy*Math.sin(releaseAngle)-9;
    const releaseY = grip.shoulderY + vx*Math.sin(releaseAngle)+vy*Math.cos(releaseAngle)+3;
    const preparation=Array.from({length:17},(_,i)=>{const t=i/16;return{offset:.25*t,u:t*t*(3-2*t)};});
    const frames: Keyframe[] = preparation.map(({offset,u}) => {
      const angle=releaseAngle*u;
      return {offset, transform:`translate(${grip.shoulderX+vx*Math.cos(angle)-vy*Math.sin(angle)-9*u}px,${grip.shoulderY+vx*Math.sin(angle)+vy*Math.cos(angle)+3*u}px) rotate(${-12*u}deg)`};
    });
    for (let i=1;i<=26;i++) {
      const u=i/26;
      const y=releaseY*(1-u)**2-40*(1-u)*u+rimY*u**2;
      frames.push({transform:`translate(${releaseX+(rimX-releaseX)*u}px,${y}px) rotate(${-12+342*u}deg)`,offset:.25+.6*u});
    }
    for (let i=1;i<=7;i++) {
      const u=i/7, x=rimX-(hit?0:22*u), y=rimY+(hit?107*u**2:-70*u+165*u**2);
      frames.push({transform:`translate(${x}px,${y}px) rotate(${330+90*u}deg)`,offset:.85+.15*u});
    }
    const animation=ball.current!.animate(frames,{duration:1000,easing:"linear"});
    const actorFrames=[...preparation.map(({offset,u})=>({offset,transform:`translate(${-9*u/110*100}%,${3*u/123.75*100}%)`})),...[[.4,-10,-8],[.78,-8,1],[.85,0,0],[1,0,0]].map(([offset,x,y])=>({offset,transform:`translate(${x/110*100}%,${y/123.75*100}%)`}))];
    const step=player.current!.animate(actorFrames,{duration:1000,easing:"linear"});
    const arm=hand?.animate([...preparation.map(({offset,u})=>({offset,rotate:`${-95*u}deg`})),{rotate:"-125deg",offset:.38},{rotate:"-90deg",offset:.64},{rotate:"0deg",offset:.85},{rotate:"0deg",offset:1}],{duration:1000,easing:"linear"});
    const groundMotion=ground.current!.animate([{opacity:.18,scale:"1"},{opacity:.1,scale:".85",offset:.4},{opacity:.18,scale:"1",offset:.85},{opacity:.18,scale:"1"}],{duration:1000});
    const swish = hit ? net.current!.animate([{ transform: "scaleY(1)" }, { transform: "scaleY(1.14)", offset: .4 }, { transform: "scaleY(1)" }], { duration: 200, delay: 830 }) : undefined;
    const animations = [animation, step, arm, groundMotion, swish].filter((a): a is Animation => Boolean(a));
    if (document.hidden) animations.forEach(a => a.pause());
    const visibility = () => animations.forEach(a => document.hidden ? a.pause() : a.play());
    document.addEventListener("visibilitychange", visibility);
    animation.finished.then(finish, () => {});
    return () => { active = false; animations.forEach(a => a.cancel()); document.removeEventListener("visibilitychange", visibility); };
  }, [phase, motion, shots, hit, hand]);

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
    const court=ball.current!.ownerSVGElement!, handMatrix=(hand as SVGGraphicsElement | null)?.getScreenCTM(), inverse=court.getScreenCTM()?.inverse();
    if (handMatrix && inverse) {
      const grip=new DOMPoint(100,76).matrixTransform(handMatrix).matrixTransform(inverse);
      const shoulder=new DOMPoint(87,57).matrixTransform(handMatrix).matrixTransform(inverse);
      shotStart.current={x:grip.x,y:grip.y,shoulderX:shoulder.x,shoulderY:shoulder.y};
    }
    setHit(made); setShots(n => n + 1); setPoints(score); setPhase("flying");
    if (score > best) {
      setBest(score);
      try { localStorage.setItem(recordKey, String(score)); } catch { /* Session record works without storage. */ }
    }
  }
  function shotKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    const from = event.target as HTMLElement;
    // Checkbox and aim choices retain their native keyboard behavior.
    if (from.closest("button,input") && !from.closest(".shoot-action,.court-shoot-zone")) return;
    event.preventDefault();
    if (!event.repeat) shoot();
  }
  return <div className="three-game" data-phase={phase} onKeyDown={shotKey} onKeyUp={event => {
    if (event.key === " " && (event.target as HTMLElement).closest(".shoot-action,.court-shoot-zone")) event.preventDefault();
  }}>
    <div className="personal-stage court-stage">
      <svg className="court-lines" viewBox="0 0 440 280" aria-hidden="true">
        <defs><linearGradient id={`${material}-floor`} x2=".2" y2="1"><stop stopColor="#ecd5df" /><stop offset="1" stopColor="#dfbccd" /></linearGradient></defs>
        <path d="M0 176h440v104H0Z" fill={`url(#${material}-floor)`} />
        <g className="court-markings" fill="none" stroke="#bc809b" strokeWidth="1.4" strokeLinejoin="round" opacity=".6">
          <path d="m353 192 61 88M353 192C225 181 96 204 100 242c3 32 162 43 289 25" />
          <path d="m368 220-109 6 18 25 110-4M259 226q-25 16 18 25" />
        </g>
        <ellipse cx="372" cy="242" rx="23" ry="4" fill="#795262" opacity=".13" />
        <path d="m356 234 31-1 6 9-31 2Z" fill="#a58192" stroke="#7d6070" strokeWidth="1" />
        <path d="M371 114v122" stroke="#765a68" strokeWidth="5" strokeLinecap="round" /><path d="M370 143v89" stroke="#bd9aaa" strokeWidth="1.2" />
        <path d="m382 87 4 3v48l-4-2Z" fill="#c3a2b3" />
        <rect x="318" y="83" width="66" height="54" rx="4" fill="#fff8fb" stroke="#957483" strokeWidth="2.5" />
        <path d="M321 87h59" stroke="#fff" strokeWidth="1.5" /><path d="M337 101h27v23h-27Z" fill="none" stroke="#d56b94" strokeWidth="1.7" />
        <g ref={net} className="basket-net" stroke="#947381" strokeWidth=".9" fill="none"><path d="M330 140q3 18 9 28 12 4 24 0 6-12 9-28M335 141l10 28m-2-27 6 28m3-28v28m8-28-5 28m11-29-7 27M333 150q18 5 36 0m-33 8q15 5 29 0" /></g>
        <ellipse cx="351" cy="138" rx="23" ry="4" fill="#e8bbcd" fillOpacity=".2" stroke="#a24b65" strokeWidth="3" />
        <ellipse ref={ground} className="court-ground-shadow" cx="104" cy="243" rx="24" ry="4" fill="#795262" opacity=".18" />
      </svg>
      <div ref={player} className="court-player"><MascotArtwork /></div>
      <svg className="shot-overlay" viewBox="0 0 440 280" aria-hidden="true">
        <defs><radialGradient id={material} cx=".3" cy=".25" r=".8"><stop stopColor="#f9cf9f" /><stop offset=".6" stopColor="#dd985f" /><stop offset="1" stopColor="#ac643f" /></radialGradient></defs>
        <g ref={ball} className="shot-ball"><Basketball material={material} /></g>
        <path d="M328 138q23 8 46 0" fill="none" stroke="#a24b65" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {hand && phase === "aiming" && createPortal(<Basketball held material={material} />,hand)}
      <button className="court-shoot-zone" aria-label={c.action} onClick={shoot} aria-disabled={phase === "flying"} />
    </div>
    <p className="game-instructions">{c.ready}</p>
    <div className="shot-meter" ref={meter} role="img" aria-label={c.aim} data-still={still}>
      <span className="shot-zone" /><span className="shot-marker" ref={marker} style={still ? { left: `${stillAim * 100}%`, transform: "translateX(-50%)" } : undefined} />
    </div>
    <div className="game-score"><span>{c.attempts} <strong>{shots}/5</strong></span><span>{c.points} <strong>{points}</strong></span><span>{c.best} <strong>{best}</strong></span></div>
    <div className="game-feedback" role="status">{phase === "flying" ? c.flying : shots === 0 ? c.aiming : `${hit ? c.swish : c.miss}${phase === "done" ? ` ${c.end}` : ""}`}</div>
    <button ref={shootButton} className="personal-action shoot-action" onClick={shoot} aria-disabled={phase === "flying"}>{phase === "ready" ? c.start : phase === "done" ? personalCopy[language].restart : c.action}</button>
    <label className="still-aim"><input type="checkbox" checked={still} disabled={!motion || phase === "flying"} onChange={event => setAssist(event.target.checked)} />{c.assist}</label>
    {still && <div className="still-choices" role="group" aria-label={c.aim}>{[c.left, c.center, c.right].map((label, i) => <button key={i} aria-pressed={stillAim === i / 2} disabled={phase === "flying"} onClick={() => setStillAim(i / 2)}>{label}</button>)}</div>}
  </div>;
}
