import { memo, useId } from "react";

export function Bone({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 42 26" aria-hidden="true"><path d="m10 10 22-2c2-7 8-6 8-1 0 3-2 4-2 5 4 3 1 10-4 8-2-1-3-3-3-5l-19 2c-2 8-9 7-9 1 0-3 3-4 3-5-5-3-2-10 3-8 2 1 2 3 1 5Z" fill="#fff7fa" stroke="#ba96a8" strokeWidth="1.2" /></svg>;
}

// Side silhouette with four independent paws. Shadow and body have separate
// transforms so the shadow never hops with the dog or flips into its legs.
export default memo(function DogArtwork({ bone = false }: { bone?: boolean }) {
  const coat = useId().replace(/:/g, "");
  return <svg className="dog-sprite" viewBox="0 0 160 140" aria-hidden="true">
    <defs><linearGradient id={coat} x1="0" y1="0" x2=".8" y2="1"><stop stopColor="#c9b19b" /><stop offset="1" stopColor="#9d7e6b" /></linearGradient></defs>
    <ellipse className="dog-shadow" cx="80" cy="128" rx="61" ry="5" fill="#9c7586" opacity=".14" />
    <g className="dog-body">
      <g className="dog-tail"><path d="M34 89C4 83 5 52 18 46c11 14 10 22 3 28" fill="none" stroke="#886d60" strokeWidth="12" strokeLinecap="round" /><path d="M19 46q5 8 4 14" stroke="#c5a793" strokeWidth="5" strokeLinecap="round" /></g>
      <g className="dog-paw rear-back"><path d="m48 104 3 19-10 2" fill="none" stroke="#876c5d" strokeWidth="10" strokeLinecap="round" /></g>
      <g className="dog-paw front-back"><path d="m104 102 5 21h10" fill="none" stroke="#876c5d" strokeWidth="10" strokeLinecap="round" /></g>
      <path d="M32 94q-5-24 38-25t48 32l-11 17H51Q32 115 32 94Z" fill={`url(#${coat})`} stroke="#9d7d6b" />
      <path d="m45 78 7 4 7-6 7 6 8-5 8 6 8-5" fill="none" stroke="#d7c0a9" strokeWidth="5" strokeLinecap="round" />
      <g className="dog-paw rear-front"><path d="m44 103-2 19 9 4" fill="none" stroke="#b3957e" strokeWidth="11" strokeLinecap="round" /><path d="M46 126h7" stroke="#806455" strokeWidth="3" strokeLinecap="round" /></g>
      <g className="dog-paw front-front"><path d="m99 103-4 22h10" fill="none" stroke="#b3957e" strokeWidth="11" strokeLinecap="round" /><path d="M100 128h7" stroke="#806455" strokeWidth="3" strokeLinecap="round" /></g>
      <g className="dog-head">
        <path d="M83 48q7-21 33-17 31 2 31 34l-9 25-40 2-18-23Z" fill="#d1b9a0" stroke="#a88b76" />
        <path d="m90 39 6 9 7-12 7 10 7-11 7 11 8-6" fill="none" stroke="#e4d1b9" strokeWidth="5" strokeLinecap="round" />
        <path d="M95 40q-26-10-27 16t19 39q13-10 8-55Z" fill="#806356" /><path d="M83 48q-10 14 1 35" stroke="#a18471" strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="125" cy="62" rx="5" ry="6" fill="#382c29" /><circle cx="126" cy="60" r="1.6" fill="#fff7fa" />
        <path d="M124 73q20-10 29 0-1 15-17 17-16 0-18-8Z" fill="#e8d9c3" /><path d="m143 73q11-6 13 0-2 8-8 7Z" fill="#49352f" /><path d="M149 80q-4 9-15 7" stroke="#795c4c" strokeWidth="1.5" fill="none" /><path className="dog-tongue" d="M140 87q7 0 5 7-7 5-9-2Z" fill="#d7939f" />
        <path d="M96 91q17 8 37-1" stroke="#b86283" strokeWidth="5" fill="none" /><circle cx="118" cy="99" r="6" fill="#ebc386" /><path d="M116 96h4m-2 0v6" stroke="#8e6644" strokeWidth="1" />
        {bone && <g className="dog-mouth-bone" transform="translate(123 76) rotate(-12)"><path d="m4 5 18-2c1-5 6-4 6-1 0 2-2 3-1 4 3 2 1 6-2 5-2 0-2-2-3-3L5 10c-1 5-5 4-5 1 0-2 2-3 2-4C-1 5 0 1 3 2l1 3Z" fill="#fff7fa" stroke="#ba96a8" strokeWidth=".8" /></g>}
      </g>
    </g>
  </svg>;
});
