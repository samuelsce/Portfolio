import { memo, useId } from "react";
import { limbPose } from "./rig-math";
import type { SceneTrack } from "./MoonwalkRig";

const paws = [
  // Facing right: rear knees point forward, front elbows point backward.
  // Rest poses and running frames use the same joint direction.
  { name: "rear-back", x: 48, foot: 43, behind: true, bend: 1 },
  { name: "front-back", x: 104, foot: 113, behind: true, bend: -1 },
  { name: "rear-front", x: 44, foot: 48, behind: false, bend: 1 },
  { name: "front-front", x: 99, foot: 102, behind: false, bend: -1 },
];

function Paw({ name }: { name: string }) {
  const paw = paws.find(p => p.name === name)!;
  const pose = limbPose({ x: paw.x, y: 103 }, { x: paw.foot, y: 125 }, 14.5, paw.bend);
  // A vertical path has a zero-width object bounding box: gradient strokes can
  // disappear, leaving floating feet. Solid fur strokes keep every limb visible.
  const color = paw.behind ? "#886b5d" : "#bca08a";
  return <g className={`dog-paw ${name}`} strokeLinecap="round">
    <g className="dog-upper-leg" style={{ transform: pose.thigh }}><path d="M0 0v14.5" stroke={color} strokeWidth="10" /></g>
    <g className="dog-lower-leg" style={{ transform: pose.shin }}><path d="M0 0v14.5" stroke={color} strokeWidth="8" /></g>
    <g className="dog-foot" style={{ transform: `translate(${paw.foot}px,125px)` }}><ellipse rx="7" ry="3.2" fill={paw.behind ? "#947563" : "#ccb098"} /><path d="m-2 1h5" stroke="#856856" strokeWidth="1.5" /><path d="m-3-1h4" stroke="#e3cbb3" strokeWidth=".7" opacity={paw.behind ? 0 : .65} /></g>
  </g>;
}

export function runDogGait(root: HTMLElement, track: SceneTrack, speed: number) {
  const duration = Math.max(180, Math.min(340, 12 * root.getBoundingClientRect().width / 160 / Math.max(.02, speed) * 2));
  const steps = Array.from({ length: 65 }, (_, i) => i / 64);
  const bob = (t: number) => -.8 * (1 - Math.cos(t * Math.PI * 4));
  const animations: Animation[] = [];
  const startTime = Number(document.timeline.currentTime);
  const add = (element: Element, frames: Keyframe[]) => animations.push(track(element, frames, duration, { easing: "linear", iterations: 8, startTime }));
  paws.forEach((paw, index) => {
    const leg = root.querySelector(`.${paw.name}`)!;
    const samples = steps.map(t => {
      const p = (t + (index === 0 || index === 3 ? .5 : 0)) % 1;
      const slide = p < .5 ? 6 - 24 * p : -6 + 12 * (.5 - .5 * Math.cos((p - .5) * Math.PI * 2));
      const lift = p < .5 ? 0 : -4 * Math.sin((p - .5) * Math.PI * 2);
      const end = { x: paw.foot + slide, y: 125 + lift - bob(t) };
      return { ...limbPose({ x: paw.x, y: 103 }, end, 14.5, paw.bend), foot: `translate(${end.x}px,${end.y}px)` };
    });
    add(leg.querySelector(".dog-upper-leg")!, samples.map((s, i) => ({ offset: steps[i], transform: s.thigh })));
    add(leg.querySelector(".dog-lower-leg")!, samples.map((s, i) => ({ offset: steps[i], transform: s.shin })));
    add(leg.querySelector(".dog-foot")!, samples.map((s, i) => ({ offset: steps[i], transform: s.foot })));
  });
  add(root.querySelector(".dog-body")!, steps.map(t => ({ offset: t, translate: `0 ${bob(t)}px` })));
  return (settle = false) => {
    if (settle) {
      const startTime = Number(document.timeline.currentTime);
      animations.forEach(a => {
        const target = (a.effect as KeyframeEffect).target as SVGElement;
        const body = target.classList.contains("dog-body");
        const key = body ? "translate" : "transform";
        const from = getComputedStyle(target)[key];
        const to = body ? "0 0" : target.style.transform;
        const settling = track(target, [{ [key]: from }, { [key]: to }], 190, { easing: "cubic-bezier(.2,.7,.3,1)", startTime });
        void settling.finished.then(() => settling.cancel(), () => {});
      });
    }
    animations.forEach(a => a.cancel());
  };
}

// One silhouette in the hand, flight and mouth. Mouth grip is in dog SVG units.
export const dogBitePoint = { x: 139, y: 86 } as const;
export function BoneShape() {
  return <path d="m10 10 22-2c2-7 8-6 8-1 0 3-2 4-2 5 4 3 1 10-4 8-2-1-3-3-3-5l-19 2c-2 8-9 7-9 1 0-3 3-4 3-5-5-3-2-10 3-8 2 1 2 3 1 5Z" fill="#fff7fa" stroke="#ba96a8" strokeWidth="1.2" />;
}
export function Bone({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 42 26" aria-hidden="true"><BoneShape /></svg>;
}

// Side silhouette with four independent paws. Shadow and body have separate
// transforms so the shadow never hops with the dog or flips into its legs.
export default memo(function DogArtwork({ bone = false }: { bone?: boolean }) {
  const coat = useId().replace(/:/g, "");
  return <svg className="dog-sprite" viewBox="0 0 160 140" aria-hidden="true">
    <defs><linearGradient id={coat} x1="0" y1="0" x2=".8" y2="1"><stop stopColor="#e8d4bc" /><stop offset=".45" stopColor="#bca08a" /><stop offset="1" stopColor="#876553" /></linearGradient><radialGradient id={`${coat}-head`} cx=".25" cy=".18" r=".9"><stop stopColor="#eddbc3" /><stop offset=".5" stopColor="#d1b9a0" /><stop offset="1" stopColor="#ae8a72" /></radialGradient></defs>
    <ellipse className="dog-shadow" cx="80" cy="128" rx="61" ry="5" fill="#9c7586" opacity=".14" />
    <g className="dog-body">
      <g className="dog-tail"><path d="M34 89C4 83 5 52 18 46c11 14 10 22 3 28" fill="none" stroke="#886d60" strokeWidth="12" strokeLinecap="round" /><path d="M19 46q5 8 4 14" stroke="#c5a793" strokeWidth="5" strokeLinecap="round" /></g>
      <Paw name="rear-back" /><Paw name="front-back" />
      <path d="M32 94q-5-24 38-25 30-2 42 20 8 9 3 18l-9 11q-19 8-51 0Q31 117 32 94Z" fill={`url(#${coat})`} stroke="#9d7d6b" />
      <path d="M38 96q5 16 21 16h35q12-2 14-9" stroke="#8d6a59" strokeWidth="4" fill="none" opacity=".24" /><path d="M40 87q14-11 41-10" stroke="#f0ddc4" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".6" /><path d="m45 78 7 4 7-6 7 6 8-5 8 6 8-5" fill="none" stroke="#d7c0a9" strokeWidth="5" strokeLinecap="round" />
      <Paw name="rear-front" /><Paw name="front-front" />
      <g className="dog-head">
        <path d="M83 48q7-21 33-17 31 2 31 34l-9 25-40 2-18-23Z" fill={`url(#${coat}-head)`} stroke="#a88b76" />
        <path d="m90 39 6 9 7-12 7 10 7-11 7 11 8-6" fill="none" stroke="#e4d1b9" strokeWidth="5" strokeLinecap="round" />
        <g className="dog-ear"><path d="M95 40q-26-10-27 16t19 39q13-10 8-55Z" fill="#806356" /><path d="M83 48q-10 14 1 35" stroke="#a18471" strokeWidth="5" fill="none" strokeLinecap="round" /><path d="M77 51q-8 17 10 31" stroke="#b59a85" strokeWidth="1.2" strokeLinecap="round" fill="none" /></g>
        <g className="dog-eye"><ellipse cx="125" cy="62" rx="5" ry="6" fill="#382c29" /><circle cx="126" cy="60" r="1.6" fill="#fff7fa" /></g>
        <path d="M96 91q17 8 37-1" stroke="#b86283" strokeWidth="5" fill="none" /><g className="dog-tag"><circle cx="118" cy="99" r="6" fill="#ebc386" /><path d="M116 96h4m-2 0v6" stroke="#8e6644" strokeWidth="1" /><circle cx="116" cy="97" r="1.5" fill="#fff1cb" opacity=".65" /></g>
        <path className="dog-mouth" d="M125 80q14-4 27 1l-5 10q-11 5-23-4Z" fill="#6b4943" />
        <g className="dog-jaw"><path d="M121 85q13 8 29-1l-3 10q-16 9-26-2Z" fill="#deceb4" stroke="#b49a7e" strokeWidth=".8" /><path d="M126 91q9 4 16 0" stroke="#f2e4d0" strokeWidth="1.5" fill="none" /><path className="dog-tongue" d="M138 87q8-1 7 6-5 6-10 0Z" fill="#d7939f" /></g>
        {bone && <g className="dog-mouth-bone" transform="translate(124 78) rotate(-8 14.7 8.4)"><g transform="scale(.7)"><BoneShape /></g></g>}
        {/* The upper muzzle and teeth occlude the shaft, creating a real bite. */}
        <g className="dog-upper-muzzle"><path d="M123 73q19-11 30 0l-3 10q-15 5-28-2Z" fill="#e8d9c3" /><path d="M126 77q10-4 17-1" stroke="#fff3e2" strokeWidth="2" strokeLinecap="round" fill="none" /><path d="m143 73q11-6 13 0-2 8-8 7Z" fill="#49352f" /><path d="m146 73 5-1" stroke="#796053" strokeWidth="1.2" strokeLinecap="round" /><path d="M126 82q10 4 22-1" stroke="#957357" strokeWidth="1" fill="none" />{bone && <path className="dog-teeth" d="m133 84 2 4 2-4m7-1 2 4 2-5" fill="#fff8ed" stroke="#b29b84" strokeWidth=".5" />}</g>

      </g>
    </g>
  </svg>;
});
