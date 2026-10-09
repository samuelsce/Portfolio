import { memo, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { personalCopy } from "../i18n/personal";
import MascotArtwork from "./MascotArtwork";
import "../sky-jump.css";

const islands = [
  { x: 88, y: 220, w: 120 }, { x: 275, y: 202, w: 86 },
  { x: 463, y: 220, w: 76 }, { x: 638, y: 194, w: 88 },
  { x: 840, y: 208, w: 74 }, { x: 1048, y: 188, w: 84 },
  { x: 1230, y: 212, w: 106 },
];
const chargeDuration = 1100, recordKey = "samuel-sky-jump-best";
type Phase = "ready" | "charging" | "jumping" | "falling" | "respawning" | "won" | "over";
function readBest() {
  try { const n = Number(localStorage.getItem(recordKey)); return Number.isInteger(n) && n >= 0 && n <= 6 ? n : 0; } catch { return 0; }
}
const Island = memo(function Island({ index }: { index: number }) {
  const p = islands[index], left = p.x - p.w / 2;
  return <g transform={`translate(${left} ${p.y})`}>
    <path d={`M0 0h${p.w}v12H0Z`} fill="#8ca37b" />
    <path d={`m0 12 16 7h${p.w}l-16-7Z`} fill="#647c61" />
    <path d={`M0 12h${p.w}v37l-18 16H20L0 47Z`} fill="#b08c77" />
    <path d={`m${p.w} 12 16 7v32l-34 14 18-16Z`} fill="#7d6056" />
    <path d={`M0 0h${p.w}v3H0Z`} fill="#b8cda2" />
    <path d={`M18 20h16v12H18Zm${p.w - 38} 22h13v11h-13ZM35 46h20v9H35Z`} fill="#967261" opacity=".65" />
    <path d={`M7 7h14m13-2h22m12 4h12`} stroke="#6b855f" strokeWidth="2" />
    {index === 0 && <g transform="translate(17 -27)"><path d="M0 27V0h3v27" fill="#9c7a67" /><path d="M3 0h30v17H3Z" fill="#b45d84" /><path d="M7 4h22" stroke="#e7bbcd" /></g>}
    {index === 6 && <g className="sky-bed" transform="translate(52 -27)"><path d="m0 6 45-5 14 9-45 5Z" fill="#fff5ed" /><path d="m0 6 14 9v12L0 18Z" fill="#915c63" /><path d="m14 15 45-5v12l-45 5Z" fill="#b76583" /><path d="m0 6 13-2 14 9-13 2Z" fill="#fffaf4" /><path d="M14 15v12m45-17v12" stroke="#703d53" strokeWidth="3" /><path d="m15 16 40-4" stroke="#e498b2" strokeWidth="2" /></g>}
  </g>;
});

// One charge animation and finite trajectories. No game loop, layout reads or
// React updates on each frame; camera and character use the same SVG units.
export default function SkyJumpGame({ motion }: { motion: boolean }) {
  const { language } = useLanguage(), c = personalCopy[language].blocks;
  const [phase, setPhase] = useState<Phase>("ready"), [step, setStep] = useState(0);
  const [lives, setLives] = useState(3), [best, setBest] = useState(readBest);
  const [assist, setAssist] = useState(!motion), [feedback, setFeedback] = useState<"ready" | "landed" | "miss" | "won" | "over">("ready");
  const player = useRef<SVGGElement>(null), world = useRef<SVGGElement>(null), marker = useRef<SVGGElement>(null);
  const shadow = useRef<SVGEllipseElement>(null), button = useRef<HTMLButtonElement>(null);
  const charge = useRef<Animation | null>(null), animations = useRef(new Set<Animation>());
  const alive = useRef(true), locked = useRef(false), holding = useRef(false);
  const cancelledPointer = useRef(false);
  const input = useRef<{ kind: "pointer"; id: number } | { kind: "key"; key: string } | null>(null);
  const position = useRef({ x: islands[0].x, y: islands[0].y }), camera = useRef(0);
  const still = !motion || assist;
  const view = (x: number) => Math.min(0, Math.max(-1040, 112 - x));
  function native(el: Element, frames: Keyframe[], ms: number, easing = "linear") {
    const a = el.animate(frames, { duration: ms, easing, fill: "forwards" }); animations.current.add(a);
    if (document.hidden) a.pause();
    return a.finished.then(() => alive.current).catch(() => false).finally(() => { animations.current.delete(a); });
  }
  useEffect(() => {
    alive.current = true;
    const focus = requestAnimationFrame(() => button.current?.focus({ preventScroll: true }));
    const visibility = () => {
      // A key/pointer released in another app may never deliver its up event.
      if (document.hidden) cancelCharge();
      animations.current.forEach(a => document.hidden ? a.pause() : a.play());
    };
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("blur", cancelCharge);
    return () => { alive.current = false; cancelAnimationFrame(focus); charge.current?.cancel(); animations.current.forEach(a => a.cancel()); animations.current.clear(); document.removeEventListener("visibilitychange", visibility); window.removeEventListener("blur", cancelCharge); };
  }, []);
  function reset() {
    position.current = { x: islands[0].x, y: islands[0].y }; camera.current = 0;
    player.current!.style.opacity = "1"; player.current!.style.transform = ""; world.current!.style.transform = "";
    player.current!.getAnimations().forEach(a => a.cancel()); world.current!.getAnimations().forEach(a => a.cancel());
    locked.current = false; setStep(0); setLives(3); setPhase("ready"); setFeedback("ready");
  }
  function cancelCharge() {
    if (!holding.current) return;
    cancelledPointer.current = input.current?.kind === "pointer";
    input.current = null; holding.current = false;
    charge.current?.cancel(); charge.current = null;
    if (alive.current) setPhase("ready");
  }
  function startCharge() {
    if (still || locked.current || holding.current || document.hidden || phase !== "ready") return false;
    holding.current = true; setPhase("charging");
    const target = islands[step + 1];
    const low = Math.max(.02, (target.x - target.w*.43 - position.current.x - 105)/210);
    const high = Math.min(.98, (target.x + target.w*.43 - position.current.x - 105)/210);
    const frames = [0, low, low+.015, high-.015, high, 1].map((u, i) => ({ offset:u, transform:`translateX(${105+210*u}px)`, color:i===2 || i===3 ? "#8bd6b5" : "#f9cae0" }));
    charge.current = marker.current!.animate(frames, { duration: chargeDuration, iterations: Infinity, direction: "alternate", easing: "linear" });
    return true;
  }
  async function jump(exact = false) {
    if (locked.current || document.hidden || step >= 6 || phase !== "ready" && phase !== "charging") return;
    locked.current = true;
    const t = Number(charge.current?.currentTime ?? 0) % (chargeDuration * 2) / chargeDuration;
    const power = t > 1 ? 2 - t : t;
    input.current = null; holding.current = false; charge.current?.cancel(); charge.current = null;
    const next = islands[step + 1], from = position.current;
    const to = { x: exact ? next.x : from.x + 105 + power * 210, y: next.y };
    const hit = Math.abs(to.x - next.x) <= next.w * .43, nextCamera = view(to.x);
    const shadowNode = shadow.current!;
    setPhase("jumping"); shadowNode.style.opacity = "0";
    if (motion) {
      const frames = Array.from({ length: 33 }, (_, i) => { const u = i / 32; return { offset: u, transform: `translate(${from.x + (to.x - from.x) * u}px,${from.y + (to.y - from.y) * u - 4 * 100 * u * (1 - u)}px)` }; });
      void native(world.current!, [{ transform: `translateX(${camera.current}px)` }, { transform: `translateX(${nextCamera}px)` }], 880, "cubic-bezier(.25,.1,.25,1)");
      if (!await native(player.current!, frames, 880)) return;
    }
    if (!alive.current) return;
    player.current!.style.transform = `translate(${to.x}px,${to.y}px)`; world.current!.style.transform = `translateX(${nextCamera}px)`;
    player.current!.getAnimations().forEach(a => a.cancel()); world.current!.getAnimations().forEach(a => a.cancel()); camera.current = nextCamera;
    if (hit) {
      const settled = { x:Math.max(next.x-next.w/2+16, Math.min(next.x+next.w/2-16, to.x)), y:to.y };
      position.current = settled; const n = step + 1; setStep(n); setFeedback(n === 6 ? "won" : "landed");
      if (n > best) { setBest(n); try { localStorage.setItem(recordKey, String(n)); } catch { /* A session record still works. */ } }
      shadowNode.style.opacity = ".3";
      if (motion) {
        const body = player.current!.querySelector(".sky-body")!;
        void native(player.current!, [{transform:`translate(${to.x}px,${to.y}px)`},{transform:`translate(${settled.x}px,${settled.y}px)`}],240,"ease-out");
        if (!await native(body, [{ transform: "scale(1.12,.88)" }, { transform: "scale(.97,1.03)", offset: .55 }, { transform: "scale(1)" }], 340, "ease-out")) return;
        body.getAnimations().forEach(a => a.cancel());
        player.current!.style.transform = `translate(${settled.x}px,${settled.y}px)`;
        player.current!.getAnimations().forEach(a => a.cancel());
      }
      if (!motion) player.current!.style.transform = `translate(${settled.x}px,${settled.y}px)`;
      setPhase(n === 6 ? "won" : "ready"); locked.current = false;
    } else {
      setPhase("falling");
      if (motion && !await native(player.current!, [{ transform: `translate(${to.x}px,${to.y}px)`, opacity: 1 }, { transform: `translate(${to.x + 14}px,${to.y + 150}px) rotate(18deg)`, opacity: 0 }], 560, "ease-in")) return;
      if (!alive.current) return;
      setPhase("respawning");
      player.current!.style.opacity = "0";
      player.current!.style.transform = `translate(${from.x}px,${from.y}px)`; player.current!.getAnimations().forEach(a => a.cancel());
      const restoreCamera = view(from.x);
      if (motion && !await native(world.current!, [{transform:`translateX(${camera.current}px)`},{transform:`translateX(${restoreCamera}px)`}],280,"ease-in-out")) return;
      camera.current = restoreCamera; world.current!.style.transform = `translateX(${restoreCamera}px)`; world.current!.getAnimations().forEach(a => a.cancel());
      shadowNode.style.opacity = ".3";
      if (motion && !await native(player.current!, [{opacity:0},{opacity:1}],220,"ease-out")) return;
      player.current!.style.opacity = "1"; player.current!.getAnimations().forEach(a => a.cancel());
      setLives(lives - 1); setFeedback(lives === 1 ? "over" : "miss"); setPhase(lives === 1 ? "over" : "ready"); locked.current = false;
    }
  }
  function pointerDown(e: PointerEvent<HTMLButtonElement>) {
    cancelledPointer.current = false;
    if (e.button !== 0 || input.current || !startCharge()) return;
    input.current = { kind: "pointer", id: e.pointerId };
    cancelledPointer.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function pointerUp(e: PointerEvent<HTMLButtonElement>) {
    if (input.current?.kind === "pointer" && input.current.id === e.pointerId) void jump();
  }
  function keyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (!["Enter", " "].includes(e.key) || e.altKey || e.ctrlKey || e.metaKey) return;
    e.preventDefault();
    if (e.repeat || input.current || locked.current || document.hidden) return;
    if (phase === "won" || phase === "over") { reset(); return; }
    if (still) { void jump(true); return; }
    if (startCharge()) input.current = { kind: "key", key: e.key };
  }
  function keyUp(e: KeyboardEvent<HTMLButtonElement>) {
    if (!["Enter", " "].includes(e.key)) return;
    e.preventDefault();
    if (input.current?.kind === "key" && input.current.key === e.key) void jump();
  }
  return <div className="sky-game" data-phase={phase}>
    <div className="sky-hud"><span>{c.jumps} <strong>{step}/6</strong></span><span className="sky-lives" aria-label={`${c.lives}: ${lives}`}>{[0,1,2].map(i => <svg key={i} viewBox="0 0 20 20" data-active={i < lives} aria-hidden="true"><path d="M2 4h6v2h4V4h6v8l-8 6-8-6Z" /></svg>)}</span><span>{c.best} <strong>{best}/6</strong></span></div>
    <div className="personal-stage sky-stage"><svg viewBox="0 0 520 320" aria-hidden="true">
      <defs><linearGradient id="sky-back" x2="0" y2="1"><stop stopColor="#3d334b" /><stop offset="1" stopColor="#766079" /></linearGradient></defs>
      <path d="M0 0h520v320H0Z" fill="url(#sky-back)" />
      <g fill="#ad91ad" opacity=".3"><path d="M32 72h45v8h30v12H22V80h10ZM333 48h63v11h37v14H317V59h16ZM201 106h26v8h16v9h-51v-9h9Z" /><path d="M145 40h3v3h-3ZM276 73h4v4h-4ZM464 124h3v3h-3ZM80 143h3v3h-3Z" fill="#f5dae7" /></g>
      <g ref={world} className="sky-world">
        {islands.map((_, i) => <Island key={i} index={i} />)}
        {step < 6 && <g className="sky-next" transform={`translate(${islands[step + 1].x} ${islands[step + 1].y - 12})`}><path d="m-7-9 7 5 7-5" fill="none" stroke="#f5c8dc" strokeWidth="2" /><ellipse cy="8" rx={islands[step+1].w*.43} ry="4" fill="none" stroke="#f5c8dc" strokeDasharray="3 4" opacity=".6" /></g>}
        <ellipse ref={shadow} cx={position.current.x} cy={position.current.y+2} rx="21" ry="4" fill="#342731" opacity=".3" />
        <g transform={`translate(${position.current.x} ${step < 6 ? islands[step + 1].y - 1 : position.current.y})`}><g ref={marker} className="sky-marker"><ellipse rx="20" ry="5" fill="currentColor" opacity=".7" /><path d="M0-12v7m-4-4 4 4 4-4" stroke="#fff5fa" fill="none" strokeWidth="2" /></g></g>
        <g ref={player} className="sky-runner" transform={`translate(${islands[0].x} ${islands[0].y})`}><g className="sky-body"><svg x="-32" y="-62" width="64" height="72" viewBox="0 0 112 126"><MascotArtwork /></svg></g></g>
      </g>
    </svg></div>
    <p className="game-instructions">{still ? c.calmReady : c.ready}</p>
    <div className="game-feedback" role="status">{phase === "jumping" || phase === "falling" || phase === "respawning" ? c.flying : feedback === "ready" ? "" : c[feedback]}</div>
    <button ref={button} className="personal-action sky-action" aria-disabled={phase === "jumping" || phase === "falling" || phase === "respawning"} onPointerDown={pointerDown} onPointerUp={pointerUp} onPointerCancel={cancelCharge} onLostPointerCapture={() => { if (input.current?.kind === "pointer") cancelCharge(); }} onKeyDown={keyDown} onKeyUp={keyUp} onBlur={cancelCharge} onClick={() => { if (input.current) return; if (cancelledPointer.current) { cancelledPointer.current = false; return; } if (phase === "won" || phase === "over") reset(); else void jump(true); }}>{phase === "won" || phase === "over" ? personalCopy[language].restart : phase === "charging" ? c.release : still ? c.jump : c.action}</button>
    <label className="still-aim"><input type="checkbox" checked={still} disabled={!motion || phase === "charging" || locked.current} onChange={e => setAssist(e.target.checked)} />{c.assist}</label>
  </div>;
}
