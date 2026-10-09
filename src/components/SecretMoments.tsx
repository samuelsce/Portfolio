import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../i18n/LanguageProvider";
import { personalCopy } from "../i18n/personal";
import { claimActor } from "./personal-secrets";
import type { ActorClaim, ActorPoint, MomentKind, SecretRequest } from "./personal-secrets";
import { creativeReaction } from "./creative-events";
import DogArtwork, { Bone, dogBitePoint } from "./DogArtwork";
import { DanceShoe, Fedora, HandBone, StrawHat, WhiteGlove } from "./SecretCostume";
import { SailingBoat, Sea, Ghost, Treasure } from "./SecretArtwork";
import "../secret-moments.css";

const clamp = (n: number, low: number, high: number) => Math.max(low, Math.min(n, high));
const pose = (p: ActorPoint) => `translate3d(${p.x}px,${p.y}px,0) scale(${p.size / 112})`;
const ease = "cubic-bezier(.22,.65,.25,1)";

// One finite scene owns the existing character rig. Transform keyframes run in
// the browser; scroll only offsets the scene once per frame, never its timeline.
export default function SecretMoments({ request, motion, onDone }: {
  request: SecretRequest; motion: boolean; onDone: () => void;
}) {
  const { language } = useLanguage();
  const c = personalCopy[language].moment;
  const kind = request.kind as MomentKind;
  const layer = useRef<HTMLDivElement>(null), boat = useRef<HTMLDivElement>(null);
  const sea = useRef<HTMLDivElement>(null);
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
    const desiredFloor = kind === "voyage" ? initial.top + initial.height * .68 : initial.bottom + (kind === "toddy" ? 14 : -26);
    const floor = clamp(desiredFloor, headerBottom + 150, innerHeight - 40);
    // Close is always within the visible part of the originating section.
    const close = node.querySelector<HTMLElement>(".moment-close")!;
    close.style.left = `${clamp(initial.right - 44, 8, innerWidth - 52)}px`;
    close.style.top = `${clamp(initial.top + 8, headerBottom + 8, innerHeight - 52)}px`;
    later(stop, kind === "aim" ? 20000 : 14000);

    const size = clamp(innerWidth * .16, 86, 106);
    async function voyage() {
      const w = clamp(initial.width * .52, 190, 280), h = w * 160 / 230;
      const x = clamp(initial.left + initial.width * .5 - w / 2, 16, innerWidth - w - 16);
      const y = floor - h * .86, seaWidth = Math.min(w * 1.45, innerWidth - 28);
      at(boat.current!, x - w * .75, y, w);
      at(sea.current!, x + w / 2 - seaWidth / 2, y + h * .72, seaWidth);
      const dest = { x: x + w * .38 - size / 2, y: y + h * (103 / 160) - size * 108 / 112, size };
      // The chest is a child of the hull: it shares every roll and translation.
      treasure.current!.style.width = "20%";
      if (!motion) { boat.current!.style.transform = `translate3d(${x}px,${y}px,0)`; boat.current!.style.opacity = "1"; sea.current!.style.opacity = "1"; treasure.current!.style.opacity = "1"; treasure.current!.dataset.open = "true"; later(stop, 2800); return; }
      void animate(sea.current!, [{ opacity: 0, scale: ".85" }, { opacity: 1, scale: "1" }], 850);
      const arrival = animate(boat.current!, [{ transform: `translate3d(${x-w*.75}px,${y+8}px,0) rotate(-5deg)`, opacity: 0 }, { transform: `translate3d(${x-8}px,${y-3}px,0) rotate(1deg)`, opacity: 1, offset: .8 }, { transform: `translate3d(${x}px,${y}px,0) rotate(0deg)`, opacity: 1 }], 1050);
      if (owner) { owner.root.dataset.secretAction = "boarding"; void fly(dest, 1050, 65); }
      if (!await arrival) return;
      if (owner) owner.root.dataset.secretAction = "sailing";
      const steps = Array.from({ length: 65 }, (_, i) => i / 64);
      const wave = (t: number) => Math.sin(t * Math.PI * 4), turn = (t: number) => wave(t) * 1.6;
      const sailing = animate(boat.current!, steps.map(t => ({ offset: t, transform: `translate3d(${x+t*22}px,${y+wave(t)*3}px,0) rotate(${turn(t)}deg)` })), 3700, { easing: "linear" });
      if (owner) {
        const pivot = { x: x + w / 2, y: y + h * .7 };
        void animate(owner.root, steps.map(t => {
          const angle = turn(t) * Math.PI / 180, ox = dest.x - pivot.x, oy = dest.y - pivot.y;
          return { offset: t, transform: `${pose({ ...dest, x: pivot.x + ox*Math.cos(angle)-oy*Math.sin(angle)+t*22, y: pivot.y + ox*Math.sin(angle)+oy*Math.cos(angle)+wave(t)*3 })} rotate(${turn(t)}deg)` };
        }), 3700, { easing: "linear" });
      }
      if (!await wait(650)) return;
      void animate(treasure.current!, [{ opacity: 0, translate: "0 9px", scale: ".8" }, { opacity: 1, translate: "0 0", scale: "1" }], 500);
      if (!await wait(450)) return;
      treasure.current!.dataset.open = "true";
      if (!await sailing) return;
      if (owner) {
        owner.root.dataset.secretAction = "salute";
        if (!await wait(900)) return;
        const hat = owner.root.querySelector(".secret-costume-hat");
        if (hat) void animate(hat, [{ opacity: 1 }, { opacity: 0 }], 450);
        const r = owner.root.getBoundingClientRect(), p = { x: r.left-dx, y: r.top-dy, size: r.width };
        if (!await fly({ ...p, x: p.x + 28, y: p.y - 55 }, 600, 18)) return;
      }
      if (!active) return;
      void animate(boat.current!, [{ opacity: 1 }, { opacity: 0, transform: `translate3d(${x+w*.65}px,${y+20}px,0) rotate(4deg)` }], 700);
      void animate(sea.current!, [{ opacity: 1 }, { opacity: 0, scale: "1.06" }], 850);
      later(stop, 850);
    }
    async function ghosts() {
      const r = request.source.getBoundingClientRect();
      const gx = clamp(r.left+r.width*.4-26, 22, innerWidth-100), gy = clamp(r.top+r.height*.35, headerBottom+65, floor-130);
      at(ghostA.current!, gx, gy, 56); at(ghostB.current!, gx+28, gy+4, 48);
      const x = clamp(initial.left+initial.width*.5-size/2, 50, innerWidth-size-30), y = floor-size*108/112;
      at(spotlight.current!, x-45, floor-8, size+90);
      if (!motion) { ghostA.current!.style.opacity = "1"; ghostB.current!.style.opacity = "1"; later(stop, 2800); return; }
      const appear = (left: number, direction: number) => Array.from({ length: 33 }, (_, i) => {
        const t = i/32, emerge = Math.min(1, t*5), drift = direction * (1-Math.exp(-t*5));
        return { offset:t, opacity:emerge, transform:`translate3d(${left+drift}px,${gy-24*emerge+Math.sin(t*Math.PI*3)*5}px,0) scale(${.25+emerge*.75}) rotate(${Math.sin(t*Math.PI*3)*4}deg)` };
      });
      void animate(ghostA.current!, appear(gx,-30), 6800, { easing:"linear" });
      void animate(ghostB.current!, appear(gx+28,27), 6800, { easing:"linear" });
      void animate(spotlight.current!, [{ opacity:0, scale:".6" },{ opacity:.65, scale:"1" }], 750);
      if (owner) {
        if (!await fly({x:x+26,y,size}, 800, 40)) return;
        owner.root.dataset.secretAction = "dance-ready";
        if (!await wait(600)) return;
        owner.root.dataset.secretAction = "moonwalk";
        if (!await animate(owner.root, [{transform:pose({x:x+26,y,size})},{transform:pose({x:x+26-96*size/112,y,size})}], 3600, {easing:"linear"})) return;
        owner.root.dataset.secretAction = "spin";
        if (!await wait(760)) return;
        owner.root.dataset.secretAction = "toe-stand";
        if (!await wait(750)) return;
        owner.root.dataset.secretAction = "hat-tip";
        ghostA.current!.dataset.action = "clap"; ghostB.current!.dataset.action = "clap";
        if (!await wait(1100)) return;
      } else if (!await wait(5700)) return;
      if (!active) return;
      void animate(ghostA.current!, [{opacity:1},{opacity:0,translate:"0 -24px",scale:".85"}], 850);
      void animate(ghostB.current!, [{opacity:1},{opacity:0,translate:"0 -30px",scale:".85"}], 850);
      void animate(spotlight.current!, [{opacity:.65},{opacity:0}], 850);
      owner?.root.querySelectorAll(".secret-costume-hat,.secret-glove").forEach(prop => void animate(prop,[{opacity:1},{opacity:0}],750));
      later(stop,850);
    }
    async function toddy() {
      const w = clamp(innerWidth*.29, 112, 134), x = clamp(initial.left+initial.width*.36,20,innerWidth-w-size-26);
      const y = floor-w*128/160, actorX = x+w*.9, actorY = floor-size*108/112;
      at(dog.current!,-w-12,y,w); dog.current!.style.opacity="1";
      if (!motion) { at(dog.current!,x,y,w);setDogBone(true);later(stop,2800);return; }
      dog.current!.dataset.action="run";
      const arrival = animate(dog.current!,[{transform:`translate3d(${-w-12}px,${y}px,0)`},{transform:`translate3d(${x-18}px,${y}px,0)`,offset:.72},{transform:`translate3d(${x+3}px,${y}px,0)`,offset:.9},{transform:`translate3d(${x}px,${y}px,0)`}],1150,{easing:"linear"});
      later(()=>{dog.current!.dataset.action="brake";},830);
      if(owner) void fly({x:actorX,y:actorY,size},950,45);
      if(!await arrival)return;
      dog.current!.dataset.action="wag";
      if(owner){owner.root.dataset.secretAction="offer";setHandBone(true);}
      if(!await wait(650))return;
      dog.current!.dataset.action="ready";
      if(owner)owner.root.dataset.secretAction="windup";
      if(!await wait(350))return;
      const hand=owner?.root.querySelector(".moment-hand-bone")?.getBoundingClientRect();
      const startX=hand?hand.left-dx:initial.left+initial.width/2, startY=hand?hand.top-dy:y-20;
      const boneWidth=w*42*.7/160;
      const endX=x+w*dogBitePoint.x/160-boneWidth/2, endY=y+w*dogBitePoint.y/160-boneWidth*26/42/2-9*w/160;
      setHandBone(false);bone.current!.style.opacity="1";at(bone.current!,startX,startY,boneWidth);
      if(owner)owner.root.dataset.secretAction="toss";
      later(()=>{dog.current!.dataset.action="catch";},320);
      const flight=Array.from({length:33},(_,i)=>{const t=i/32;return{offset:t,transform:`translate3d(${startX+(endX-startX)*t}px,${startY+(endY-startY)*t-4*48*t*(1-t)}px,0) rotate(${-20+t*372}deg)`};});
      if(!await animate(bone.current!,flight,680,{easing:"linear"}))return;
      bone.current!.style.opacity="0";setDogBone(true);
      // Keep the jump rig alive through landing; changing to proud at the catch
      // would cut off the descent and make the dog snap back to the floor.
      if(!await wait(290))return;
      dog.current!.dataset.action="proud";
      if(owner)owner.root.dataset.secretAction="delight";
      if(!await wait(1300))return;
      dog.current!.dataset.action="turn";
      if(!await wait(450))return;
      dog.current!.dataset.action="leave";
      if(owner)owner.root.dataset.secretAction="goodbye";
      if(!await animate(dog.current!,[{transform:`translate3d(${x}px,${y}px,0)`},{transform:`translate3d(${-w-24}px,${y}px,0)`}],1150,{easing:"cubic-bezier(.4,0,.8,.6)"}))return;
      later(stop,300);
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
          if (!owner && attempt < 12 && ["docked", "observing", "departing", "climbing", "pulling", "landing", "returning", "released", "walking", "settling", "cooling", "bracing", "pushing", "yielding", "waiting", "reappearing"].includes(document.querySelector<HTMLElement>(".page-mascot")?.dataset.phase || "")) {
            // Allow up to three seconds for registration or a return/walk gesture.
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
  const leftLeg = actor?.root.querySelector(".leg-left"), rightLeg = actor?.root.querySelector(".leg-right");
  return createPortal(<>
    <div ref={layer} className="secret-moment-layer" data-kind={kind} data-motion={motion ? "on" : "off"}>
      <span className="sr-only" role="status">{kind === "aim" && hits === 3 ? c.found : c[kind]}</span>
      <button className="moment-close" aria-label={c.close} onClick={() => finishRef.current()}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17" /></svg></button>
      {kind === "voyage" && <><div className="moment-sea" ref={sea}><Sea /></div><div className="moment-boat" ref={boat}><SailingBoat />{!actor && <svg className="boat-hat" viewBox="0 0 112 42" aria-hidden="true"><StrawHat /></svg>}<div className="moment-treasure" ref={treasure}><Treasure /></div></div></>}
      {kind === "ghosts" && <><div className="moment-spotlight" ref={spotlight} /><div className="moment-ghost" ref={ghostA}><Ghost /></div><div className="moment-ghost" ref={ghostB}><Ghost second /></div></>}
      {kind === "toddy" && <><div className="moment-dog" ref={dog}><DogArtwork bone={dogBone} /></div><div className="moment-bone" ref={bone}><Bone /></div></>}
      {kind === "aim" && <div className="moment-aim" ref={aimRoot} data-complete={hits === 3}>
        <div className="aim-count" aria-label={`${hits}/3`}><i data-hit={hits > 0} /><i data-hit={hits > 1} /><i data-hit={hits > 2} /></div>
        {hits < 3 ? <button ref={aimTarget} key={hits} className={`aim-target aim-target-${hits}`} aria-label={`${c.target} ${hits+1}/3`} onClick={hit}><svg viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="32" cy="35" rx="23" ry="22" fill="#ba8da433" stroke="none" /><circle className="target-rim" cx="32" cy="32" r="23" /><path className="target-light" d="M17 25a17 17 0 0 1 16-10" fill="none" strokeLinecap="round" /><circle cx="32" cy="32" r="18" /><circle cx="32" cy="32" r="11" /><path d="M32 2v14m0 32v14M2 32h14m32 0h14" /><circle className="target-core" cx="32" cy="32" r="4" /></svg></button> : <div className="aim-badge"><svg viewBox="0 0 90 90" aria-hidden="true"><ellipse cx="45" cy="83" rx="27" ry="4" fill="#387e711a" /><path d="M8 27 2 23m78 4 7-4M45 4V0" stroke="#91c8b3" strokeWidth="2" strokeLinecap="round" /><path d="m45 7 31 21v34L45 84 14 62V28Z" fill="#387e71" /><path d="m45 16 23 17v25L45 74 22 58V33Z" fill="#6ec2a4" /><path d="m29 42 16 16 16-16-16-13Z" fill="#e8f8ef" /><path d="m45 29 16 13-16 4-16-4Z" fill="#b6e5d1" /></svg></div>}
      </div>}
    </div>
    {head && kind === "voyage" && createPortal(<StrawHat />, head)}
    {head && kind === "ghosts" && createPortal(<Fedora />, head)}
    {arm && kind === "ghosts" && createPortal(<WhiteGlove />, arm)}
    {leftLeg && kind === "ghosts" && createPortal(<DanceShoe />, leftLeg)}
    {rightLeg && kind === "ghosts" && createPortal(<DanceShoe right />, rightLeg)}
    {arm && kind === "toddy" && handBone && createPortal(<HandBone />, arm)}
  </>, document.body);
}
