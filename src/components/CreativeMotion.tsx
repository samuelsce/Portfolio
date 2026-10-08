import { memo, useEffect, useRef } from "react";
import { creativeReaction } from "./creative-events";
import { useLanguage } from "../i18n/LanguageProvider";

type Timer = ReturnType<typeof setTimeout>;
type Rig = { visible: boolean; animations: Set<Animation>; timer?: Timer; traceFrames?: Keyframe[] };
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
    const preview = bench.querySelector<HTMLElement>(".idea-preview")!;
    const scene = bench.querySelector<HTMLElement>(".constellation-scene")!;
    const rigs = new Map<HTMLElement, Rig>();
    const gestures = new Set<Animation>();
    const sky = new Set<Animation>();
    const jobs = new Set<ReturnType<typeof setTimeout>>();
    let taps = 0, lastTap = 0, lastName = -Infinity, particleTurn = 0;
    let skyTimer: Timer | undefined, coffeeTimer: Timer | undefined;
    let coffeeWord = false;
    let active = true;
    const canRun = () => motion && !document.hidden && portfolio.dataset.arcadeOpen !== "true";
    function later(delay: number, fn: () => void) {
      const timer = setTimeout(() => { jobs.delete(timer); if (active) fn(); }, delay);
      jobs.add(timer);
      return timer;
    }
    function clearJob(timer?: Timer) {
      if (timer === undefined) return;
      clearTimeout(timer);
      jobs.delete(timer);
    }
    function animate(node: Element | null, frames: Keyframe[], duration: number, bucket = gestures, delay = 0) {
      if (!node || !canRun()) return;
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
      if (!canRun()) return;
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
      if (!rig?.visible || !canRun()) return;
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
        if (!rig.traceFrames) {
          const trace = art.querySelector<SVGPathElement>(".chart-trace")!;
          const length = trace.getTotalLength();
          // Cache drawing coordinates across automatic repetitions.
          rig.traceFrames = Array.from({ length: 33 }, (_, i) => {
            const p = trace.getPointAtLength(length * i / 32);
            return { translate: `${p.x}px ${p.y - 83}px`, opacity: i === 0 || i === 32 ? 0 : 1, offset: i / 32 };
          });
        }
        animate(art.querySelector(".chart-probe"), rig.traceFrames, 1600, rig.animations);
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
    function stopRig(rig: Rig) {
      clearJob(rig.timer);
      rig.timer = undefined;
      cancel(rig.animations);
    }
    function scheduleRig(art: HTMLElement, rig: Rig, delay = 6800) {
      clearJob(rig.timer);
      rig.timer = undefined;
      if (!rig.visible || !canRun()) return;
      rig.timer = later(delay, () => {
        rig.timer = undefined;
        if (!rig.visible || !canRun()) return;
        demo(art);
        scheduleRig(art, rig);
      });
    }
    function finishSky() {
      clearJob(skyTimer);
      skyTimer = undefined;
      cancel(sky);
      delete portfolio.dataset.constellation;
      preview.inert = false;
      secret.setAttribute("aria-pressed", "false");
    }
    function constellation() {
      if (portfolio.dataset.constellation === "true") { finishSky(); return; }
      portfolio.dataset.constellation = "true";
      preview.inert = true;
      secret.setAttribute("aria-pressed", "true");
      status.current!.textContent = copy.current.constellationFound;
      creativeReaction("discovery");
      burst(secret, 8);
      animate(scene.querySelector(".constellation-trace"), [{ strokeDasharray: "1", strokeDashoffset: "1" }, { strokeDasharray: "1", strokeDashoffset: "0" }], 2300, sky);
      scene.querySelectorAll(".constellation-star").forEach((node, i) => {
        animate(node, [{ opacity: .2, scale: ".6" }, { opacity: 1, scale: "1.25", offset: .28 }, { opacity: .7, scale: "1", offset: .55 }, { opacity: 1, scale: "1" }], 2600, sky, i * 180);
      });
      animate(scene.querySelector(".constellation-comet"), [{ translate: "90px -50px", opacity: 0 }, { translate: "0 0", opacity: 1, offset: .3 }, { translate: "-130px 90px", opacity: 0 }], 1300, sky, 2400);
      animate(scene.querySelector(".constellation-planet"), [{ translate: "0 0" }, { translate: "0 -6px", offset: .3 }, { translate: "0 3px", offset: .7 }, { translate: "0 0" }], 6000, sky);
      skyTimer = later(8000, finishSky);
    }
    function input(event: Event) {
      if (!(event.target instanceof HTMLInputElement) || !event.target.closest(".idea-input")) return;
      const word = event.target.value.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const isCoffee = word === "cafe" || word === "coffee";
      if (isCoffee && !coffeeWord) {
        clearJob(coffeeTimer);
        bench.dataset.coffee = "true";
        creativeReaction("coffee");
        status.current!.textContent = copy.current.coffeeFound;
        coffeeTimer = later(3600, () => { delete bench.dataset.coffee; coffeeTimer = undefined; });
      } else if (!isCoffee) creativeReaction("typing");
      coffeeWord = isCoffee;
    }
    function click(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>(".name-play, .chrome-secret, .agenda-days button, .idea-action");
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
        if (taps === 3 || portfolio.dataset.constellation === "true") { taps = 0; constellation(); }
      } else if (target.matches(".idea-action")) { burst(target); }
      else {
        const art = target.closest<HTMLElement>(".project-art");
        // React commits the selected day before reading the new illustration.
        if (art) queueMicrotask(() => {
          if (!active) return;
          demo(art, true);
          scheduleRig(art, rigs.get(art)!);
        });
      }
    }
    function enter(event: PointerEvent) {
      if (event.pointerType === "mouse" && event.target instanceof Element && event.target.closest(".name-play") && !(event.relatedTarget instanceof Element && event.relatedTarget.closest(".name-play"))) wave();
    }
    function stop() {
      cancel(gestures);
      finishSky();
      clearJob(coffeeTimer);
      coffeeTimer = undefined;
      delete bench.dataset.coffee;
      for (const rig of rigs.values()) stopRig(rig);
    }
    function key(event: KeyboardEvent) { if (event.key === "Escape") finishSky(); }
    function visibility() {
      if (document.hidden || portfolio.dataset.arcadeOpen === "true") stop();
      else for (const [node, rig] of rigs) if (node !== bench) scheduleRig(node, rig, 500);
    }
    let observer: IntersectionObserver | undefined;
    if (motion && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          const node = entry.target as HTMLElement, rig = rigs.get(node)!;
          const visible = entry.isIntersecting && entry.intersectionRatio >= (node === bench ? .18 : .4);
          if (visible === rig.visible) continue;
          rig.visible = visible;
          if (!visible) {
            stopRig(rig);
            if (node === bench) { finishSky(); delete bench.dataset.coffee; }
          } else if (node !== bench) scheduleRig(node, rig, 350);
        }
      }, { threshold: [.18, .4], rootMargin: "-90px 0px -70px 0px" });
    }
    for (const node of [bench, ...portfolio.querySelectorAll<HTMLElement>(".project-art")]) {
      rigs.set(node, { visible: !observer, animations: new Set() });
      observer?.observe(node);
    }
    portfolio.addEventListener("click", click);
    portfolio.addEventListener("input", input);
    document.addEventListener("keydown", key);
    if (motion) later(650, () => {
      const r = name.getBoundingClientRect();
      if (r.top >= 0 && r.bottom < innerHeight) wave();
    });
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
      portfolio.removeEventListener("input", input);
      document.removeEventListener("keydown", key);
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
