import { useId } from "react";
import type { ActorPoint } from "./personal-secrets";
import { limbPose } from "./rig-math";

type Foot = { slide: number; heel: number };
type Stance = { left: Foot; right: Foot };
type Track = { element: Element; frames: Keyframe[] };
export type SceneTrack = (element: Element, frames: Keyframe[], ms: number, options?: KeyframeAnimationOptions & { startTime?: number }) => Animation;
const flat: Stance = { left: { slide: 0, heel: 0 }, right: { slide: 0, heel: 0 } };
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t); };
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const fixed = (n: number) => n.toFixed(4);

// Solve two fixed-length bones to the sock's attachment point. The sock and
// loafer pivot together around the toe; the shin always ends at that same point.
export function danceLeg(right: boolean, foot: Foot) {
  const hip = { x: right ? 67 : 44, y: 81 };
  const toe = { x: right ? 86 : 57, y: 107 };
  const ankle = { x: right ? 69 : 40, y: 98 };
  const angle = foot.heel * Math.PI / 180;
  const end = {
    x: toe.x + foot.slide + (ankle.x - toe.x) * Math.cos(angle) - (ankle.y - toe.y) * Math.sin(angle),
    y: toe.y + (ankle.x - toe.x) * Math.sin(angle) + (ankle.y - toe.y) * Math.cos(angle),
  };
  return {
    ...limbPose(hip, end, 12),
    shoe: `translateX(${fixed(foot.slide)}px) rotate(${fixed(foot.heel)}deg)`,
  };
}

export default function MoonwalkRig() {
  const id = useId().replaceAll(":", "");
  return <g className="dance-rig">
    <defs>
      <linearGradient id={`${id}-limb`}><stop stopColor="#a74066" /><stop offset=".38" stopColor="#ed87af" /><stop offset="1" stopColor="#c4507b" /></linearGradient>
      <linearGradient id={`${id}-shoe`} x2=".2" y2="1"><stop stopColor="#665266" /><stop offset=".45" stopColor="#392c3c" /><stop offset="1" stopColor="#211b28" /></linearGradient>
    </defs>
    {[false, true].map(right => {
      const side = right ? "right" : "left", rest = danceLeg(right, flat[side]);
      const x = right ? 69 : 40;
      return <g key={side} className={`dance-leg dance-leg-${side}`}>
        <g className="dance-thigh" style={{ transform: rest.thigh }}><path d="M0 0V12" stroke={`url(#${id}-limb)`} strokeWidth="7" /><path d="M-1 2v7" stroke="#f4a3c0" strokeWidth="1.3" opacity=".6" /></g>
        <g className="dance-shin" style={{ transform: rest.shin }}><path d="M0 0V12" stroke={`url(#${id}-limb)`} strokeWidth="6" /><path d="M-1 2v8" stroke="#f4a3c0" strokeWidth="1.1" opacity=".5" /></g>
        <g className={`dance-shoe dance-shoe-${side}`}>
          <path d={`M${x-3.5} 96h7v8h-7Z`} fill="#e5d9e6" stroke="#bca9c1" strokeWidth=".55" />
          <path d={`M${x-2} 97v5`} stroke="#fff7fa" strokeWidth="1.5" />
          <path d={`M${x-6} 103q2-3 8-2l3 2q9-1 12 3l-1 3h-21q-4-1-1-6Z`} fill={`url(#${id}-shoe)`} stroke="#211b28" strokeWidth=".65" />
          <path d={`M${x-6} 107h23`} stroke="#1d1721" strokeWidth="1.5" />
          <path d={`M${x+1} 102q3 2 7 2`} stroke="#b8a3bb" strokeWidth=".8" fill="none" />
          <path d={`M${x-5} 104v2`} stroke="#806881" strokeWidth="1" />
        </g>
      </g>;
    })}
  </g>;
}

// Only keyframes are calculated here. The browser plays the whole choreography
// on one timeline; no frame loop, layout reads or React updates during dancing.
export async function performMoonwalk(root: HTMLElement, point: ActorPoint, track: SceneTrack, active: () => boolean) {
  const tracks: Animation[] = [];
  const parts = (selector: string) => root.querySelector(selector)!;
  const left = parts(".dance-leg-left"), right = parts(".dance-leg-right");
  const head = parts(".mascot-head"), gaze = parts(".mascot-gaze"), armL = parts(".arm-left"), armR = parts(".arm-right");
  const face = parts(".mascot-face-volume"), shadow = parts(".mascot-shadow");
  let stance = flat;
  let headTilt = 0, leftArm = 0, rightArm = 0, faceX = 0;
  const batch = async (items: Track[], ms: number) => {
    if (!active()) return false;
    const replaced = new Set(items.map(item => item.element));
    const previous = tracks.filter(a => replaced.has((a.effect as KeyframeEffect).target!));
    previous.forEach(a => tracks.splice(tracks.indexOf(a), 1));
    const startTime = Number(document.timeline.currentTime);
    for (const item of items) tracks.push(track(item.element, item.frames, ms, { easing: "linear", startTime }));
    previous.forEach(a => a.cancel());
    return Promise.all(tracks.filter(a => replaced.has((a.effect as KeyframeEffect).target!)).map(a => a.finished)).then(() => active()).catch(() => false);
  };
  const legTracks = (samples: Stance[]): Track[] => [left, right].flatMap((leg, side) => {
    const poses = samples.map(s => danceLeg(!!side, s[side ? "right" : "left"]));
    return (["thigh", "shin", "shoe"] as const).map(part => ({ element: leg.querySelector(`.dance-${part}`)!, frames: poses.map((p, i) => ({ offset: i / (poses.length - 1), transform: p[part] })) }));
  });
  const transition = async (action: string, next: Stance, ms: number, headTo: number, armTo: [number, number], faceTo = 5) => {
    root.dataset.secretAction = action;
    const steps = Array.from({ length: 33 }, (_, i) => smooth(i / 32));
    const samples = steps.map(t => ({ left: { slide: mix(stance.left.slide, next.left.slide, t), heel: mix(stance.left.heel, next.left.heel, t) }, right: { slide: mix(stance.right.slide, next.right.slide, t), heel: mix(stance.right.heel, next.right.heel, t) } }));
    const frames = (from: number, to: number, key: string, unit: string) => steps.map((t, i) => ({ offset: i / 32, [key]: `${mix(from, to, t)}${unit}` }));
    const items = legTracks(samples);
    const rightFrames = action === "dance-ready" ? steps.map((_, i) => {
      const t = i / 32;
      const angle = t < .38 ? mix(0, -139, smooth(t / .38)) : t < .62 ? -139 : mix(-139, -14, smooth((t - .62) / .38));
      return { offset: t, rotate: `${angle}deg` };
    }) : frames(rightArm, armTo[1], "rotate", "deg");
    items.push({ element: head, frames: frames(headTilt, headTo, "rotate", "deg") }, { element: armL, frames: frames(leftArm, armTo[0], "rotate", "deg") }, { element: armR, frames: rightFrames }, { element: gaze, frames: steps.map((t, i) => ({ offset: i / 32, translate: `${mix(faceX, faceTo, t)}px 0` })) });
    const ok = await batch(items, ms);
    stance = next; headTilt = headTo; leftArm = armTo[0]; rightArm = armTo[1]; faceX = faceTo;
    return ok;
  };
  const first: Stance = { left: { slide: -6, heel: 18 }, right: { slide: 6, heel: 0 } };
  // Anticipation: set the supporting foot and touch the fitted brim once.
  root.dataset.secretAction = "dance-ready";
  if (!await transition("dance-ready", first, 720, 4, [-10, -14])) return false;
  root.dataset.secretAction = "moonwalk";
  const cycle = (phase: number): Foot => {
    const p = (phase + 1) % 1;
    const heel = p < .44 ? 18 : p < .5 ? 18 * (1 - smooth((p - .44) / .06)) : p < .94 ? 0 : 18 * smooth((p - .94) / .06);
    return { slide: p <= .5 ? -6 + 24 * p : 6 - 24 * (p - .5), heel };
  };
  const count = 160, samples = Array.from({ length: count + 1 }, (_, i) => ({ left: cycle(i / count * 4), right: cycle(i / count * 4 + .5) }));
  const items = legTracks(samples);
  items.push({ element: root, frames: [{ transform: `translate3d(${point.x}px,${point.y}px,0) scale(${point.size / 112})` }, { transform: `translate3d(${point.x - 96 * point.size / 112}px,${point.y}px,0) scale(${point.size / 112})` }] });
  const sway = (base: number, amplitude: number, phase = 0) => samples.map((_, i) => ({ offset: i / count, rotate: `${base + Math.sin(i / count * Math.PI * 4 + phase) * amplitude}deg` }));
  items.push({ element: head, frames: sway(4, 1) }, { element: armL, frames: sway(-10, 5) }, { element: armR, frames: sway(-14, 5, Math.PI) }, { element: gaze, frames: [{ translate: "5px 0" }, { translate: "5px 0" }] });
  if (!await batch(items, 3600)) return false;
  stance = first;
  if (!await transition("dance-settle", flat, 240, 0, [15, -24], 0)) return false;
  // A spherical yaw: the silhouette retains volume while the face travels
  // round the surface and disappears on the far side. Feet remain on the floor.
  root.dataset.secretAction = "spin";
  const turn = Array.from({ length: 65 }, (_, i) => {
    const t = i / 64, sine = Math.sin(t * Math.PI * 2), cosine = Math.cos(t * Math.PI * 2);
    return { t, sine, cosine, depth: sine * sine };
  });
  if (!await batch([
    ...legTracks([flat, flat]),
    { element: head, frames: turn.map(({ t, sine, depth }) => ({ offset: t, scale: `${1 - .09 * depth} ${1 + .015 * depth}`, rotate: `${-3 * sine}deg` })) },
    { element: gaze, frames: turn.map(({ t, sine }) => ({ offset: t, translate: `${19 * sine}px 0` })) },
    { element: face, frames: turn.map(({ t, cosine }) => ({ offset: t, opacity: smooth((cosine - .1) / .5) })) },
    { element: armL, frames: turn.map(({ t, sine }) => ({ offset: t, rotate: `${15 * (1 - smooth(t)) - 25 * sine}deg`, scale: `${1 - .5 * Math.max(0, sine)} 1` })) },
    { element: armR, frames: turn.map(({ t, sine }) => ({ offset: t, rotate: `${-24 * (1 - smooth(t)) + 25 * sine}deg`, scale: `${1 - .5 * Math.max(0, -sine)} 1` })) },
    { element: shadow, frames: turn.map(({ t, depth }) => ({ offset: t, scale: `${1 - .12 * depth} 1` })) },
  ], 880)) return false;
  headTilt = 0; leftArm = 0; rightArm = 0; faceX = 0;
  const toes: Stance = { left: { slide: 0, heel: 28 }, right: { slide: 0, heel: 28 } };
  if (!await transition("toe-stand", toes, 320, 6, [25, -112], 5)) return false;
  // Hold the accent, then lower both heels before bowing.
  if (!await batch(legTracks([toes, toes]), 200)) return false;
  if (!await transition("dance-settle", flat, 280, 0, [0, 0], 0)) return false;
  root.dataset.secretAction = "hat-tip";
  if (!await batch([
    ...legTracks([flat, flat]),
    { element: head, frames: [{ rotate: "0deg", translate: "0 0" }, { rotate: "9deg", translate: "0 2px", offset: .35 }, { rotate: "9deg", translate: "0 2px", offset: .6 }, { rotate: "0deg", translate: "0 0" }] },
    { element: armR, frames: [{ rotate: "0deg" }, { rotate: "-139deg", offset: .3 }, { rotate: "-139deg", offset: .64 }, { rotate: "0deg" }] },
    { element: armL, frames: [{ rotate: "0deg" }, { rotate: "-10deg", offset: .5 }, { rotate: "0deg" }] },
  ], 1080)) return false;
  return true;
}
