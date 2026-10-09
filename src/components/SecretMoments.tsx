import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../i18n/LanguageProvider";
import { personalCopy } from "../i18n/personal";
import { claimActor } from "./personal-secrets";
import type { ActorClaim, ActorPoint, MomentKind, SecretRequest } from "./personal-secrets";
import { creativeReaction } from "./creative-events";
import DogArtwork, { Bone } from "./DogArtwork";
import { Fedora, HandBone, StrawHat, WhiteGlove } from "./SecretCostume";
import "../secret-moments.css";

const clamp = (n: number, low: number, high: number) => Math.max(low, Math.min(n, high));
const pose = (p: ActorPoint) => `translate3d(${p.x}px,${p.y}px,0) scale(${p.size / 112})`;
const ease = "cubic-bezier(.22,.65,.25,1)";

function PaperBoat() {
  return <svg viewBox="0 0 230 140" aria-hidden="true"><path d="M15 77 105 19l110 58-51 44H68Z" fill="#fff8fb" stroke="#b08a9c" strokeWidth="1.5" /><path d="m15 77 100 14 100-14-51 44H68Z" fill="#ecd3df" stroke="#b08a9c" strokeWidth="1.5" /><path d="m105 19 10 72-67-21Z" fill="#f9eaf1" stroke="#b08a9c" strokeWidth="1.2" /><path d="M115 91 192 67 105 19" fill="#fff8fb" stroke="#b08a9c" strokeWidth="1.2" /><path d="m74 119 42-28 43 28" fill="none" stroke="#c9a5b6" /><path d="M21 130q24 7 47 0m37 0q24 7 47 0m24 0q16 5 31 0" stroke="#b87994" strokeWidth="1.5" fill="none" /></svg>;
}
function Ghost({ second = false }: { second?: boolean }) {
  return <svg viewBox="0 0 80 100" aria-hidden="true"><path d="M15 87V38q0-27 25-27t25 27v49l-10-7-8 7-8-7-12 7-6-7Z" fill={second ? "#efd9e6" : "#fff8fb"} stroke="#b896a9" strokeWidth="1.5" /><ellipse cx="31" cy="39" rx="3" ry="5" fill="#5f3850" /><ellipse cx="49" cy="39" rx="3" ry="5" fill="#5f3850" /><path d="M35 54q5 6 10 0" fill="none" stroke="#5f3850" strokeWidth="1.5" strokeLinecap="round" /><path d="m18 57-11 9m56-9 10 9" stroke="#b896a9" strokeWidth="2" strokeLinecap="round" /><ellipse cx="40" cy="95" rx="20" ry="3" fill="#8d5470" opacity=".1" /></svg>;
}
function Treasure() {
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 30q0-18 22-18t22 18v24H10Z" fill="#ba8872" stroke="#855946" strokeWidth="1.4" /><path d="M10 30h44v7H10Z" fill="#e2ba79" /><path d="M20 15v39m24-39v39" stroke="#e2ba79" strokeWidth="4" /><path d="M29 32h6v10h-6Z" fill="#f4d998" stroke="#9d7544" /><path d="M5 11v8m-4-4h8m47-10v8m-4-4h8" fill="none" stroke="#d6a466" strokeWidth="1.5" /></svg>;
}

// One finite scene owns the existing character rig. Transform keyframes run in
// the browser; scroll only offsets the scene once per frame, never its timeline.
export default function SecretMoments({ request, motion, onDone }: {
  request: SecretRequest; motion: boolean; onDone: () => void;
}) {
  const { language } = useLanguage();
  const c = personalCopy[language].moment;
  const kind = request.kind as MomentKind;
  const layer = useRef<HTMLDivElement>(null), boat = useRef<HTMLDivElement>(null);
  const dog = useRef<HTMLDivElement>(null), bone = useRef<HTMLDivElement>(null);
  const ghostA = useRef<HTMLDivElement>(null), ghostB = useRef<HTMLDivElement>(null);
  const treasure = useRef<HTMLDivElement>(null), spotlight = useRef<HTMLDivElement>(null);
  const aimRoot = useRef<HTMLDivElement>(null), aimTarget = useRef<HTMLButtonElement>(null);
  const finishRef = useRef<() => void>(() => {}), doneRef = useRef(onDone);
  doneRef.current = onDone;
  const [actor, setActor] = useState<ActorClaim | null>(null);
  const [dogBone, setDogBone] = useState(false), [handBone, setHandBone] = useState(false);
  const [hits, setHits] = useState(0);
  const aimHits = useRef(0);

  useEffect(() => {
    const node = layer.current!;
    const portfolio = document.querySelector<HTMLElement>(".portfolio")!;
    const initialWidth = document.documentElement.clientWidth;
    const area = (kind === "aim" ? request.source.closest("section")?.querySelector<HTMLElement>(".contact-main") : kind === "voyage" ? request.source.closest(".workbench")?.querySelector<HTMLElement>(".preview-stage") : request.source.closest<HTMLElement>(kind === "ghosts" ? ".project-art" : ".about-signature")) || request.source;
    const initial = area.getBoundingClientRect();
    const preview = kind === "voyage" ? area.querySelector<HTMLElement>(".idea-preview") : null;
    const previewInert = preview?.inert;
    if (preview) { (area as HTMLElement).dataset.voyage = "true"; preview.inert = true; }
    const animations = new Set<Animation>(), timers = new Set<ReturnType<typeof setTimeout>>();
    let active = true, frame = 0, owner: ActorClaim | undefined;
    let dx = 0, dy = 0;
    function stop(notify = true) {
      if (!active) return;
      active = false;
      const rect = owner?.root.getBoundingClientRect();
      animations.forEach(a => a.cancel()); animations.clear();
      timers.forEach(clearTimeout); timers.clear(); cancelAnimationFrame(frame);
      if (preview) { delete (area as HTMLElement).dataset.voyage; preview.inert = portfolio.dataset.constellation === "true" || previewInert || false; }
      if (owner) {
        delete owner.root.dataset.secretAction;
        delete owner.root.dataset.secretAir;
        if (rect) owner.release({ x: rect.left, y: rect.top, size: rect.width });
      }
      if (kind === "aim" && node.contains(document.activeElement)) request.source.focus({ preventScroll: true });
      if (notify) doneRef.current();
    }
    finishRef.current = stop;
    function later(fn: () => void, ms: number) {
      const timer = setTimeout(() => { timers.delete(timer); if (active) fn(); }, ms);
      timers.add(timer);
    }
    function wait(ms: number) { return new Promise<boolean>(resolve => later(() => resolve(active), ms)); }
    function animate(el: Element, frames: Keyframe[], ms: number, options: KeyframeAnimationOptions = {}) {
      if (!active) return Promise.resolve(false);
      const a = el.animate(frames, { duration: ms, easing: ease, fill: "forwards", ...options });
      animations.add(a);
      return a.finished.then(() => active).catch(() => false);
    }
    function at(el: HTMLElement, x: number, y: number, width: number) {
      el.style.width = `${width}px`; el.style.transform = `translate3d(${x}px,${y}px,0)`;
    }
    async function fly(to: ActorPoint, ms = 650, arc = 35) {
      if (!owner || !active) return active;
      const r = owner.root.getBoundingClientRect();
      const from = { x: r.left - dx, y: r.top - dy, size: r.width };
      const frames = Array.from({ length: 25 }, (_, i) => {
        const t = i / 24;
        return { offset: t, transform: pose({ x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t - 4 * arc * t * (1 - t), size: from.size + (to.size - from.size) * t }) };
      });
      owner.root.dataset.secretAir = "true";
      const completed = await animate(owner.root, frames, ms);
      if (active) delete owner.root.dataset.secretAir;
      return completed;
    }
    function sync() {
      frame = 0;
      if (!active) return;
      const r = area.getBoundingClientRect();
      if (r.bottom < headerBottom || r.top > innerHeight) { stop(); return; }
      dx = r.left - initial.left; dy = r.top - initial.top;
      node.style.translate = `${dx}px ${dy}px`;
      if (owner) owner.root.style.translate = `${dx}px ${dy}px`;
    }
    const scroll = () => { if (!frame) frame = requestAnimationFrame(sync); };
    const visibility = () => { if (document.hidden) stop(); };
    // Safari changes viewport height when its address bar opens during scroll.
    // Preserve the performance in that case; rotation/layout changes cancel.
    const resize = () => { if (document.documentElement.clientWidth !== initialWidth) stop(); else scroll(); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") stop(); };
    const menu = () => { queueMicrotask(() => { if (document.querySelector('.menu-toggle[aria-expanded="true"]')) stop(); }); };
    const arcade = () => { if (portfolio.dataset.arcadeOpen === "true") stop(); };
    const otherDiscovery = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest(".chrome-secret")) queueMicrotask(() => { if (portfolio.dataset.constellation === "true") stop(); });
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", key);
    document.addEventListener("visibilitychange", visibility);
    document.querySelector(".menu-toggle")?.addEventListener("click", menu);
    window.addEventListener("portfolio:arcadechange", arcade);
    portfolio.addEventListener("click", otherDiscovery);
    const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom || 70;
    const floor = clamp(initial.bottom + (kind === "toddy" ? 14 : kind === "voyage" ? -70 : -26), headerBottom + 150, innerHeight - 40);
    // Close is always within the visible part of the originating section.
    const close = node.querySelector<HTMLElement>(".moment-close")!;
    close.style.left = `${clamp(initial.right - 44, 8, innerWidth - 52)}px`;
    close.style.top = `${clamp(initial.top + 8, headerBottom + 8, innerHeight - 52)}px`;
    later(stop, kind === "aim" ? 20000 : 14000);

    const size = clamp(innerWidth * .16, 86, 106);
    async function voyage() {
      const w = clamp(initial.width * .4, 160, 216), h = w * 140 / 230;
      const x = clamp(initial.left + initial.width * .5 - w / 2, 16, innerWidth - w - 16);
      const y = floor - h * .86;
      at(boat.current!, x - w * .75, y, w);
      at(treasure.current!, x + w * .7, y + h * .3, 40);
      const dest = { x: x + w * .38 - size / 2, y: y + h * .55 - size * 108 / 112, size };
      if (!motion) { boat.current!.style.transform = `translate3d(${x}px,${y}px,0)`; boat.current!.style.opacity = "1"; treasure.current!.style.opacity = "1"; later(stop, 2800); return; }
      const arrival = animate(boat.current!, [{ transform: `translate3d(${x-w*.75}px,${y+8}px,0) rotate(-5deg)`, opacity: 0 }, { transform: `translate3d(${x}px,${y}px,0) rotate(0deg)`, opacity: 1 }], 800);
      if (owner) { owner.root.dataset.secretAction = "boarding"; fly(dest, 800, 55); }
      if (!await arrival) return;
      if (owner) owner.root.dataset.secretAction = "sailing";
      const steps = [0, .16, .33, .5, .67, .84, 1];
      const sway = (t: number) => Math.sin(t * Math.PI * 4);
      const sailing = animate(boat.current!, steps.map(t => ({ offset: t, transform: `translate3d(${x + t * 22}px,${y + sway(t) * 3}px,0) rotate(${sway(t) * 1.5}deg)` })), 3500, { easing: "linear" });
      if (owner) animate(owner.root, steps.map(t => ({ offset: t, transform: pose({ ...dest, x: dest.x + t * 22, y: dest.y + sway(t) * 3 }) })), 3500, { easing: "linear" });
      await wait(850); if (!active) return;
      animate(treasure.current!, [{ opacity: 0, transform: `translate3d(${x+w*.7}px,${y+h*.3+14}px,0) scale(.5)` }, { opacity: 1, transform: `translate3d(${x+w*.7+7}px,${y+h*.3}px,0) scale(1)` }], 550);
      if (!await sailing) return;
      if (owner) {
        owner.root.dataset.secretAction = "salute";
        await wait(700); if (!active) return;
        const hat = owner.root.querySelector(".secret-costume-hat");
        if (hat) animate(hat, [{ opacity: 1 }, { opacity: 0 }], 450);
        const r = owner.root.getBoundingClientRect();
        const p = { x: r.left - dx, y: r.top - dy, size: r.width };
        await fly({ ...p, x: p.x + 28, y: p.y - 55 }, 550, 12);
      }
      if (!active) return;
      animate(boat.current!, [{ opacity: 1 }, { opacity: 0, transform: `translate3d(${x+w*.65}px,${y+20}px,0) rotate(4deg)` }], 550);
      animate(treasure.current!, [{ opacity: 1 }, { opacity: 0 }], 450);
      later(stop, 550);
    }
    async function ghosts() {
      const r = request.source.getBoundingClientRect();
      const gx = clamp(r.left + r.width * .45 - 24, 10, innerWidth - 64), gy = clamp(r.top + r.height * .35, headerBottom + 60, floor - 130);
      at(ghostA.current!, gx, gy, 48); at(ghostB.current!, gx + 22, gy + 4, 40);
      const x = clamp(initial.left + initial.width * .5 - size / 2, 50, innerWidth - size - 30), y = floor - size * 108 / 112;
      at(spotlight.current!, x - 45, floor - 8, size + 90);
      if (!motion) { ghostA.current!.style.opacity = "1"; ghostB.current!.style.opacity = "1"; later(stop, 2800); return; }
      const frames = (left: number, offset: number) => [
        { opacity: 0, transform: `translate3d(${left}px,${gy}px,0) scale(.25)` },
        { opacity: 1, transform: `translate3d(${left + offset}px,${gy - 16}px,0) scale(1)`, offset: .24 },
        { opacity: 1, transform: `translate3d(${left + offset - 14}px,${gy - 25}px,0) rotate(-5deg)`, offset: .6 },
        { opacity: 1, transform: `translate3d(${left + offset + 8}px,${gy - 12}px,0) rotate(4deg)` }
      ];
      animate(ghostA.current!, frames(gx, -30), 4200);
      animate(ghostB.current!, frames(gx + 22, 20), 4400);
      animate(spotlight.current!, [{ opacity: 0, scale: ".6" }, { opacity: .65, scale: "1" }], 650);
      if (owner) {
        if (!await fly({ x: x + 26, y, size }, 700, 40)) return;
        owner.root.dataset.secretAction = "moonwalk";
        const steps = Array.from({ length: 17 }, (_, i) => ({ offset: i / 16, transform: pose({ x: x + 26 - i * 4.5, y, size }) }));
        if (!await animate(owner.root, steps, 3100, { easing: "linear" })) return;
        owner.root.dataset.secretAction = "hat-tip";
        await wait(900);
      } else await wait(4400);
      if (!active) return;
      animate(ghostA.current!, [{ opacity: 1 }, { opacity: 0, translate: "0 -14px" }], 700);
      animate(ghostB.current!, [{ opacity: 1 }, { opacity: 0, translate: "0 -20px" }], 700);
      animate(spotlight.current!, [{ opacity: .65 }, { opacity: 0 }], 700);
      owner?.root.querySelectorAll(".secret-costume-hat,.secret-glove").forEach(prop => animate(prop, [{ opacity: 1 }, { opacity: 0 }], 650));
      later(stop, 700);
    }
    async function toddy() {
      const w = clamp(innerWidth * .27, 104, 126);
      const x = clamp(initial.left + initial.width * .36, 20, innerWidth - w - size - 26);
      const y = floor - w * 128 / 160;
      const actorX = x + w * .87, actorY = floor - size * 108 / 112;
      at(dog.current!, -w - 12, y, w);
      dog.current!.style.opacity = "1";
      if (!motion) { at(dog.current!, x, y, w); setDogBone(true); later(stop, 2800); return; }
      dog.current!.dataset.action = "run";
      const arrival = animate(dog.current!, [{ transform: `translate3d(${-w-12}px,${y}px,0)` }, { transform: `translate3d(${x}px,${y}px,0)` }], 1000, { easing: "cubic-bezier(.2,.1,.35,1)" });
      if (owner) fly({ x: actorX, y: actorY, size }, 850, 45);
      if (!await arrival) return;
      dog.current!.dataset.action = "wag";
      if (owner) { owner.root.dataset.secretAction = "offer"; setHandBone(true); }
      if (!await wait(700)) return;
      const hand = owner?.root.querySelector(".moment-hand-bone")?.getBoundingClientRect();
      const startX = hand ? hand.left - dx : initial.left + initial.width / 2;
      const startY = hand ? hand.top - dy : y - 20;
      const endX = x + w * 136 / 160 - 11.5, endY = y + w * 80 / 160 - 7;
      setHandBone(false); bone.current!.style.opacity = "1";
      at(bone.current!, startX, startY, 23);
      if (owner) owner.root.dataset.secretAction = "toss";
      later(() => { dog.current!.dataset.action = "catch"; }, 200);
      const flight = Array.from({ length: 25 }, (_, i) => {
        const t = i / 24;
        return { offset: t, transform: `translate3d(${startX+(endX-startX)*t}px,${startY+(endY-startY)*t-4*48*t*(1-t)}px,0) rotate(${-20+t*200}deg)` };
      });
      if (!await animate(bone.current!, flight, 600, { easing: "linear" })) return;
      bone.current!.style.opacity = "0"; setDogBone(true);
      dog.current!.dataset.action = "proud";
      if (owner) owner.root.dataset.secretAction = "delight";
      if (!await wait(1200)) return;
      dog.current!.dataset.action = "turn";
      if (!await wait(350)) return;
      dog.current!.dataset.action = "leave";
      if (owner) owner.root.dataset.secretAction = "goodbye";
      if (!await animate(dog.current!, [{ transform: `translate3d(${x}px,${y}px,0)` }, { transform: `translate3d(${-w-24}px,${y}px,0)` }], 1000, { easing: "cubic-bezier(.4,0,.8,.6)" })) return;
      later(stop, 250);
    }
    function aim() {
      const w = Math.min(280, innerWidth - 48), x = clamp(initial.left + 16, 12, innerWidth - w - 12);
      const y = clamp(initial.top + 46, headerBottom + 60, innerHeight - 220);
      at(aimRoot.current!, x, y, w);
      aimRoot.current!.style.opacity = "1";
      // Discovery does not steal focus from a visitor using the mouse. A
      // keyboard visitor receives a focusable first target and native buttons.
      if (request.source === document.activeElement && request.source.matches(":focus-visible")) aimTarget.current?.focus({ preventScroll: true });
    }
    if (kind === "aim") aim();
    else {
      function begin(attempt = 0) {
        if (motion) {
          owner = claimActor(kind, stop);
          if (!owner && attempt < 6 && ["departing", "climbing", "pulling", "landing", "returning", "bracing", "pushing", "reappearing"].includes(document.querySelector<HTMLElement>(".page-mascot")?.dataset.phase || "")) {
            // Let the existing header/return gesture finish; never interrupt a
            // visitor holding the character. The bounded fallback is environmental.
            later(() => begin(attempt + 1), 250); return;
          }
          if (owner) setActor(owner);
        }
        // Wait for React to mount costume portals before measuring grips.
        later(() => { if (kind === "voyage") void voyage(); else if (kind === "ghosts") void ghosts(); else void toddy(); }, 40);
      }
      begin();
    }
    return () => {
      stop(false);
      window.removeEventListener("scroll", scroll); window.removeEventListener("resize", resize); window.removeEventListener("keydown", key);
      document.removeEventListener("visibilitychange", visibility); document.querySelector(".menu-toggle")?.removeEventListener("click", menu);
      window.removeEventListener("portfolio:arcadechange", arcade); portfolio.removeEventListener("click", otherDiscovery);
    };
  }, [request.id, motion]);

  useEffect(() => {
    if (hits !== 3) return;
    creativeReaction("proud");
    const timer = setTimeout(() => finishRef.current(), 1700);
    return () => clearTimeout(timer);
  }, [hits]);
  function hit() {
    if (aimHits.current >= 3) return;
    const next = ++aimHits.current;
    const focused = document.activeElement === aimTarget.current;
    // The final target is removed. Move focus before that removal instead of
    // letting the browser drop a keyboard visitor back to the document body.
    if (focused && next === 3) request.source.focus({ preventScroll: true });
    setHits(next);
    if (focused && next < 3) requestAnimationFrame(() => aimTarget.current?.focus({ preventScroll: true }));
  }
  const head = actor?.root.querySelector(".mascot-head"), arm = actor?.root.querySelector(".arm-right");
  return createPortal(<>
    <div ref={layer} className="secret-moment-layer" data-kind={kind} data-motion={motion ? "on" : "off"}>
      <span className="sr-only" role="status">{kind === "aim" && hits === 3 ? c.found : c[kind]}</span>
      <button className="moment-close" aria-label={c.close} onClick={() => finishRef.current()}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17" /></svg></button>
      {kind === "voyage" && <><div className="moment-boat" ref={boat}><PaperBoat />{!actor && <svg className="boat-hat" viewBox="0 0 112 42" aria-hidden="true"><StrawHat /></svg>}</div><div className="moment-treasure" ref={treasure}><Treasure /></div></>}
      {kind === "ghosts" && <><div className="moment-spotlight" ref={spotlight} /><div className="moment-ghost" ref={ghostA}><Ghost /></div><div className="moment-ghost" ref={ghostB}><Ghost second /></div></>}
      {kind === "toddy" && <><div className="moment-dog" ref={dog}><DogArtwork bone={dogBone} /></div><div className="moment-bone" ref={bone}><Bone /></div></>}
      {kind === "aim" && <div className="moment-aim" ref={aimRoot} data-complete={hits === 3}>
        <div className="aim-count" aria-label={`${hits}/3`}><i data-hit={hits > 0} /><i data-hit={hits > 1} /><i data-hit={hits > 2} /></div>
        {hits < 3 ? <button ref={aimTarget} key={hits} className={`aim-target aim-target-${hits}`} aria-label={`${c.target} ${hits+1}/3`} onClick={hit}><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="21" /><circle cx="32" cy="32" r="11" /><path d="M32 2v14m0 32v14M2 32h14m32 0h14" /><circle cx="32" cy="32" r="3" /></svg></button> : <div className="aim-badge"><svg viewBox="0 0 90 90" aria-hidden="true"><path d="m45 7 31 21v34L45 84 14 62V28Z" fill="#387e71" /><path d="m45 16 23 17v25L45 74 22 58V33Z" fill="#6ec2a4" /><path d="m29 42 16 16 16-16-16-13Z" fill="#e8f8ef" /><path d="m45 29 16 13-16 4-16-4Z" fill="#b6e5d1" /></svg></div>}
      </div>}
    </div>
    {head && kind === "voyage" && createPortal(<StrawHat />, head)}
    {head && kind === "ghosts" && createPortal(<Fedora />, head)}
    {arm && kind === "ghosts" && createPortal(<WhiteGlove />, arm)}
    {arm && kind === "toddy" && handBone && createPortal(<HandBone />, arm)}
  </>, document.body);
}
