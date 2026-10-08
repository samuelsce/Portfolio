import { memo, useEffect, useRef } from "react";
import { creativeReaction } from "./creative-events";
import { useLanguage } from "../i18n/LanguageProvider";

type Rig = { visible: boolean; seen: boolean; animations: Set<Animation>; gravity: Set<Animation> };
const spring = "cubic-bezier(.2,.7,.2,1)";

// Every clock belongs to a visible piece or a finite gesture. No idle frame loop.
const CreativeMotion = memo(function CreativeMotion({ motion }: { motion: boolean }) {
  const layer = useRef<HTMLDivElement>(null);
  const status = useRef<HTMLSpanElement>(null);
  const { t } = useLanguage();
  const copy = useRef(t);
  copy.current = t;
  useEffect(() => {
    const pool = layer.current!;
    const portfolio = pool.closest<HTMLElement>(".portfolio")!;
    const name = portfolio.querySelector<HTMLElement>(".name-play")!;
    const bench = portfolio.querySelector<HTMLElement>(".workbench")!;
    const secret = bench.querySelector<HTMLElement>(".chrome-secret")!;
    const rigs = new Map<HTMLElement, Rig>();
    const gestures = new Set<Animation>();
    const jobs = new Set<ReturnType<typeof setTimeout>>();
    let taps = 0, lastTap = 0, lastName = -Infinity, particleTurn = 0;
    let gravityTimer: ReturnType<typeof setTimeout> | undefined;
    let gravityUntil = 0;
    let active = true;
    function later(delay: number, fn: () => void) {
      const timer = setTimeout(() => { jobs.delete(timer); if (active) fn(); }, delay);
      jobs.add(timer);
      return timer;
    }
    function animate(node: Element | null, frames: Keyframe[], duration: number, bucket = gestures, delay = 0) {
      if (!node || !motion || document.hidden || portfolio.dataset.arcadeOpen === "true") return;
      const animation = node.animate(frames, { duration, delay, easing: spring });
      bucket.add(animation);
      const done = () => bucket.delete(animation);
      animation.onfinish = done;
      animation.oncancel = done;
    }
    function cancel(bucket: Set<Animation>) {
      for (const animation of bucket) animation.cancel();
      bucket.clear();
    }
    function wave() {
      const now = performance.now();
      if (now - lastName < 1000) return;
      lastName = now;
      for (const [i, letter] of Array.from(name.querySelectorAll(".name-letter")).entries())
        animate(letter, [{ translate: "0 0", rotate: "0deg" }, { translate: "0 -.13em", rotate: `${i % 2 ? 3 : -3}deg`, offset: .32 }, { translate: "0 .025em", rotate: "0deg", offset: .7 }, { translate: "0 0", rotate: "0deg" }], 700, gestures, i * 45);
    }
    function burst(target: Element, count = 6) {
      if (!motion || document.hidden) return;
      const r = target.getBoundingClientRect();
      const x = Math.min(innerWidth - 18, Math.max(18, r.left + r.width / 2));
      const y = Math.min(innerHeight - 18, Math.max(18, r.top + r.height / 2));
      for (let i = 0; i < count; i++) {
        const node = pool.children[particleTurn++ % pool.children.length] as HTMLElement;
        for (const old of node.getAnimations()) { old.cancel(); gestures.delete(old); }
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        const angle = (i / count) * Math.PI * 2 - .5;
        const dx = Math.cos(angle) * 42, dy = Math.sin(angle) * 42;
        animate(node, [{ transform: "translate(-50%,-50%) scale(.2) rotate(0deg)", opacity: 0 }, { transform: `translate(calc(-50% + ${dx * .5}px),calc(-50% + ${dy * .5}px)) scale(1) rotate(30deg)`, opacity: 1, offset: .25 }, { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy + 14}px)) scale(.4) rotate(75deg)`, opacity: 0 }], 850);
      }
    }
    function demo(art: HTMLElement, explicit = false) {
      const rig = rigs.get(art);
      if (!rig?.visible || !motion || document.hidden) return;
      cancel(rig.animations);
      const run = (selector: string, frames: Keyframe[], duration = 1000, stagger = 90, delay = 0) => {
        art.querySelectorAll(selector).forEach((node, i) => animate(node, frames, duration, rig.animations, delay + i * stagger));
      };
      const lift = [{ translate: "0 0" }, { translate: "0 -7px", offset: .35 }, { translate: "0 1px", offset: .75 }, { translate: "0 0" }];
      if (art.closest(".project-barberag")) {
        run(".agenda-days .selected-day", [{ scale: "1" }, { scale: "1.18", offset: .3 }, { scale: "1" }], 700);
        run(".agenda-slot", lift, 950, 180, 180);
        run(".agenda-free svg", [{ rotate: "0deg" }, { rotate: "180deg" }], 800, 0, 550);
      } else if (art.closest(".project-roomlab")) {
        run(".room-code-line", [{ opacity: .2 }, { opacity: 1 }], 900, 220);
        run(".room-screen", [{ opacity: .65 }, { opacity: 1 }], 1400);
        run(".room-plant", [{ rotate: "0deg" }, { rotate: "-6deg", offset: .28 }, { rotate: "4deg", offset: .55 }, { rotate: "-2deg", offset: .8 }, { rotate: "0deg" }], 1600);
      } else if (art.closest(".project-linkwatch")) {
        run(".chart-trace", [{ strokeDasharray: "1", strokeDashoffset: "1" }, { strokeDasharray: "1", strokeDashoffset: "0" }], 1600);
        const trace = art.querySelector<SVGPathElement>(".chart-trace");
        if (trace) {
          const length = trace.getTotalLength();
          // Sample once per play; follow the actual drawing without frame-by-frame reads.
          const frames = Array.from({ length: 33 }, (_, i) => {
            const p = trace.getPointAtLength(length * i / 32);
            return { translate: `${p.x}px ${p.y - 83}px`, opacity: i === 0 || i === 32 ? 0 : 1, offset: i / 32 };
          });
          animate(art.querySelector(".chart-probe"), frames, 1600, rig.animations);
        }
        run(".monitor-metrics > div", lift, 900, 140);
      } else {
        run(".sentinel-node", lift, 800, 450);
        run(".sentinel-packet", [{ translate: "0px 0px", opacity: 0 }, { translate: "3px 0px", opacity: 1, offset: .2 }, { translate: "14px 0px", opacity: 1, offset: .8 }, { translate: "17px 0px", opacity: 0 }], 650, 500, 300);
        run(".sentinel-capabilities > div", [{ opacity: .55 }, { opacity: 1 }], 700, 160, 1000);
      }
      if (explicit) {
        creativeReaction("proud");
        status.current!.textContent = copy.current.demoStatus;
      }
    }
    function finishGravity() {
      clearTimeout(gravityTimer);
      jobs.delete(gravityTimer!);
      gravityUntil = 0;
      for (const rig of rigs.values()) cancel(rig.gravity);
      delete portfolio.dataset.zeroGravity;
      secret.setAttribute("aria-pressed", "false");
    }
    function floatRig(node: HTMLElement, rig: Rig) {
      const remaining = gravityUntil - performance.now();
      if (!motion || !rig.visible || remaining < 600 || rig.gravity.size) return;
      const pieces = node === bench ? ".art-ring, .art-spark" : ".barber-agenda, .monitor-window, .sentinel-panel, .room-plant";
      for (const [i, piece] of Array.from(node.querySelectorAll(pieces)).entries())
        animate(piece, [{ translate: "0 0", rotate: "0deg" }, { translate: `0 ${-14 - i * 4}px`, rotate: `${i % 2 ? -7 : 7}deg`, offset: .24 }, { translate: "0 -9px", rotate: "-3deg", offset: .48 }, { translate: "0 -16px", rotate: "4deg", offset: .72 }, { translate: "0 0", rotate: "0deg" }], remaining, rig.gravity);
    }
    function gravity() {
      if (portfolio.dataset.zeroGravity === "true") { finishGravity(); cancel(gestures); return; }
      portfolio.dataset.zeroGravity = "true";
      secret.setAttribute("aria-pressed", "true");
      status.current!.textContent = copy.current.gravityFound;
      creativeReaction("discovery");
      wave();
      burst(secret, 8);
      gravityUntil = performance.now() + 8600;
      for (const [node, rig] of rigs) floatRig(node, rig);
      gravityTimer = later(8800, finishGravity);
    }
    function click(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>(".name-play, .chrome-secret, .project-demo, .agenda-days button, .idea-action");
      if (!target) return;
      if (target.matches(".name-play")) { wave(); creativeReaction("proud"); }
      else if (target.matches(".chrome-secret")) {
        const now = performance.now();
        taps = now - lastTap < 1500 ? taps + 1 : 1;
        lastTap = now;
        for (const old of target.getAnimations()) {
          if (gestures.has(old)) { old.cancel(); gestures.delete(old); }
        }
        animate(target, [{ rotate: "0deg", scale: "1" }, { rotate: `${45 * taps}deg`, scale: "1.2", offset: .4 }, { rotate: "0deg", scale: "1" }], 500);
        if (taps === 3 || portfolio.dataset.zeroGravity === "true") { taps = 0; gravity(); }
      } else if (target.matches(".idea-action")) { burst(target); }
      else {
        const art = target.closest<HTMLElement>(".project-art");
        // React commits the selected day before reading the new illustration.
        if (art) queueMicrotask(() => { if (active) demo(art, true); });
      }
    }
    function enter(event: PointerEvent) {
      if (event.pointerType === "mouse" && event.target instanceof Element && event.target.closest(".name-play") && !(event.relatedTarget instanceof Element && event.relatedTarget.closest(".name-play"))) wave();
    }
    function stop() {
      cancel(gestures);
      finishGravity();
      for (const rig of rigs.values()) cancel(rig.animations);
    }
    function visibility() { if (document.hidden || portfolio.dataset.arcadeOpen === "true") stop(); }
    let observer: IntersectionObserver | undefined;
    if (motion && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          const node = entry.target as HTMLElement, rig = rigs.get(node)!;
          rig.visible = entry.isIntersecting && entry.intersectionRatio >= .18;
          if (!rig.visible) { cancel(rig.animations); cancel(rig.gravity); }
          else {
            if (!rig.seen && node !== bench) { rig.seen = true; demo(node); }
            if (gravityUntil) floatRig(node, rig);
          }
        }
      }, { threshold: .18, rootMargin: "-90px 0px -40px 0px" });
    }
    for (const node of [bench, ...portfolio.querySelectorAll<HTMLElement>(".project-art")]) {
      rigs.set(node, { visible: !observer, seen: false, animations: new Set(), gravity: new Set() });
      observer?.observe(node);
    }
    portfolio.addEventListener("click", click);
    if (motion) portfolio.addEventListener("pointerover", enter, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("portfolio:arcadechange", visibility);
    return () => {
      active = false;
      stop();
      for (const timer of jobs) clearTimeout(timer);
      jobs.clear();
      observer?.disconnect();
      portfolio.removeEventListener("click", click);
      portfolio.removeEventListener("pointerover", enter);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("portfolio:arcadechange", visibility);
    };
  }, [motion]);
  return <>
    <div className="creative-particles" ref={layer} aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => <svg key={i} viewBox="0 0 24 24"><path d={i % 2 ? "M12 3v18M3 12h18" : "m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"} /></svg>)}
    </div>
    <span className="sr-only" ref={status} role="status" />
  </>;
});
export default CreativeMotion;
