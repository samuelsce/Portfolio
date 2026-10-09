import { memo, useId } from "react";

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
    <defs><linearGradient id={coat} x1="0" y1="0" x2=".8" y2="1"><stop stopColor="#e0cab3" /><stop offset=".45" stopColor="#bca08a" /><stop offset="1" stopColor="#94715f" /></linearGradient></defs>
    <ellipse className="dog-shadow" cx="80" cy="128" rx="61" ry="5" fill="#9c7586" opacity=".14" />
    <g className="dog-body">
      <g className="dog-tail"><path d="M34 89C4 83 5 52 18 46c11 14 10 22 3 28" fill="none" stroke="#886d60" strokeWidth="12" strokeLinecap="round" /><path d="M19 46q5 8 4 14" stroke="#c5a793" strokeWidth="5" strokeLinecap="round" /></g>
      <g className="dog-paw rear-back"><path d="m48 104 3 19-10 2" fill="none" stroke="#876c5d" strokeWidth="10" strokeLinecap="round" /></g>
      <g className="dog-paw front-back"><path d="m104 102 5 21h10" fill="none" stroke="#876c5d" strokeWidth="10" strokeLinecap="round" /></g>
      <path d="M32 94q-5-24 38-25 30-2 42 20 8 9 3 18l-9 11q-19 8-51 0Q31 117 32 94Z" fill={`url(#${coat})`} stroke="#9d7d6b" />
      <path d="M38 96q5 16 21 16h35q12-2 14-9" stroke="#8d6a59" strokeWidth="4" fill="none" opacity=".24" /><path d="M40 87q14-11 41-10" stroke="#f0ddc4" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".6" /><path d="m45 78 7 4 7-6 7 6 8-5 8 6 8-5" fill="none" stroke="#d7c0a9" strokeWidth="5" strokeLinecap="round" />
      <g className="dog-paw rear-front"><path d="m44 103-2 19 9 4" fill="none" stroke="#b3957e" strokeWidth="11" strokeLinecap="round" /><ellipse cx="48" cy="126" rx="7" ry="3" fill="#c7aa91" /><path d="M46 126h7" stroke="#806455" strokeWidth="3" strokeLinecap="round" /></g>
      <g className="dog-paw front-front"><path d="m99 103-4 22h10" fill="none" stroke="#b3957e" strokeWidth="11" strokeLinecap="round" /><ellipse cx="102" cy="126" rx="7" ry="3" fill="#c7aa91" /><path d="M100 128h7" stroke="#806455" strokeWidth="3" strokeLinecap="round" /></g>
      <g className="dog-head">
        <path d="M83 48q7-21 33-17 31 2 31 34l-9 25-40 2-18-23Z" fill="#d1b9a0" stroke="#a88b76" />
        <path d="m90 39 6 9 7-12 7 10 7-11 7 11 8-6" fill="none" stroke="#e4d1b9" strokeWidth="5" strokeLinecap="round" />
        <g className="dog-ear"><path d="M95 40q-26-10-27 16t19 39q13-10 8-55Z" fill="#806356" /><path d="M83 48q-10 14 1 35" stroke="#a18471" strokeWidth="5" fill="none" strokeLinecap="round" /><path d="M77 51q-8 17 10 31" stroke="#b59a85" strokeWidth="1.2" strokeLinecap="round" fill="none" /></g>
        <ellipse cx="125" cy="62" rx="5" ry="6" fill="#382c29" /><circle cx="126" cy="60" r="1.6" fill="#fff7fa" />
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
