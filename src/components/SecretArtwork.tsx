import { memo, useId } from "react";

export const SailingBoat = memo(function SailingBoat() {
  const id = useId().replace(/:/g, "");
  return <svg viewBox="0 0 230 160" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-wood`} x2=".15" y2="1"><stop stopColor="#dbb785" /><stop offset=".5" stopColor="#be9568" /><stop offset="1" stopColor="#805d48" /></linearGradient>
      <linearGradient id={`${id}-sail`} x2="1" y2=".35"><stop stopColor="#dfd0b9" /><stop offset=".2" stopColor="#fffaf0" /><stop offset=".55" stopColor="#fff7e7" /><stop offset="1" stopColor="#d6c3a8" /></linearGradient>
      <linearGradient id={`${id}-hull`} x2=".2" y2="1"><stop stopColor="#fff9e9" /><stop offset=".6" stopColor="#f0e1c6" /><stop offset="1" stopColor="#ccb698" /></linearGradient>
      <linearGradient id={`${id}-ram`} x2=".7" y2="1"><stop stopColor="#fffaf0" /><stop offset=".5" stopColor="#f6ebd6" /><stop offset="1" stopColor="#cbb898" /></linearGradient>
      <radialGradient id={`${id}-horn`} cx=".32" cy=".25" r=".85"><stop stopColor="#ebd5b3" /><stop offset=".6" stopColor="#c6a27c" /><stop offset="1" stopColor="#99765b" /></radialGradient>
    </defs>
    <g className="vessel-rig">
      <path d="M128 9v101" stroke="#896448" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M126 30v67" stroke="#dfc3a0" strokeWidth="1" />
      <path d="M117 20q11-4 22 0l-3 8q-8 3-16 0Z" fill="#ba956d" stroke="#896448" />
      <path d="M117 20q11 3 22 0m-17 1 1 6m5-5v6m5-7-1 6" fill="none" stroke="#f0d6b3" strokeWidth="1" />
      <g className="vessel-pennant"><path d="m128 9 19 3-5 5-14-3Z" fill="#3d2b37" /><path d="M134 11v3m3-3v3" stroke="#f8ede0" strokeWidth="1.2" /></g>
      <path d="M81 27h94" stroke="#896448" strokeWidth="3" strokeLinecap="round" />
      <g className="vessel-sail"><path d="M84 29q46 3 88-1c-1 16-3 35-1 58-25 15-59 16-89 3 12-20 15-41 2-60Z" fill={`url(#${id}-sail)`} stroke="#a99479" strokeWidth="1.1" /><path d="M86 32q17 32-1 55m84-56q-7 28-2 53M87 89q39 12 79-1" fill="none" stroke="#fffaf3" strokeWidth="1.7" /><path d="M101 32q10 31-2 59m25-59q5 35-2 64m28-65q-4 34 2 60" fill="none" stroke="#cdbb9f" strokeWidth=".75" opacity=".7" />
      <g transform="translate(128 57) scale(1.15)" fill="#665143"><path d="m-10 13 20-15m-21-1 22 15" fill="none" stroke="#665143" strokeWidth="2" strokeLinecap="round" /><path d="M-7 1q-1-9 7-9t7 9q0 4-4 5v5h-6V6Q-7 5-7 1Z" /><ellipse cx="-3" cy="0" rx="1.8" ry="2" fill="#f8efdf" /><ellipse cx="3" cy="0" rx="1.8" ry="2" fill="#f8efdf" /><path d="m0 3-1 2h2Z" fill="#f8efdf" /><path d="M-8-6q8-6 16 0l-1-5q-7-6-14 0Z" fill="#d6b278" /><path d="M-8-8H8" stroke="#ac546d" strokeWidth="2" /></g></g>
      <path d="m128 27-52 76m52-76 68 69M83 28l-26 75m116-75 29 72" fill="none" stroke="#9f8b70" strokeWidth=".85" /><path d="m163 45 16-8m-12 18 18-8m-14 18 18-9m-13 19 17-10m-12 19 15-10" stroke="#aa987e" strokeWidth=".65" />
      <path d="M189 42v66" stroke="#9a7657" strokeWidth="2" />
      <g className="vessel-jib"><path d="m188 44 23 54-24-5Z" fill="#f5e6d5" stroke="#b3a08c" /><path d="m190 51 6 15-8-2m11 11 6 14-17-4" fill="#b96e7d" opacity=".7" /></g>
    </g>
    <g className="vessel-cabin"><path d="m25 86 36-1v23l-36 1Z" fill="#f0e4cb" stroke="#9b7c5c" /><path d="m61 85 11 4v17l-11 2Z" fill="#c3ac87" stroke="#9b7c5c" /><path d="m20 85 27-15 29 14-15 3Z" fill="#b47765" stroke="#936347" /><path d="m47 70 14 17 15-3Z" fill="#955e51" /><path d="m22 85 39 2 14-3" stroke="#e1aa87" fill="none" strokeLinecap="round" /><path d="m34 79 22 1m-13-6h9" stroke="#d9a28b" strokeWidth=".8" /><path d="m29 92 9-.3v10.5l-9 .3Zm17-2 9-.3v16l-9 .3Z" fill="#574b41" stroke="#bda17a" /><path d="M31 93v6m17-7v11" stroke="#8d9185" strokeWidth="1.2" /><path d="m65 92 4 1v8l-4-1Z" fill="#574b41" /><path d="m25 89 36-1m-36 16 18-.5" stroke="#c7b08b" strokeWidth=".7" /></g>
    <path d="m21 106 170-8 20 10-176 15Z" fill="#d4b18a" stroke="#997352" /><path d="m31 111 156-7" stroke="#f3d9b4" fill="none" />
    <ellipse className="vessel-crew-contact" cx="87" cy="104" rx="11" ry="1.8" fill="#765345" opacity=".18" />
    <path d="m23 111 180-7q-1 21-12 36c-40 17-96 18-145 9-11-9-17-23-23-38Z" fill={`url(#${id}-wood)`} stroke="#8c6a50" strokeWidth="1.3" />
    <path d="m25 113 175-7-2 6-170 10Z" fill="#805d45" /><path d="m28 122 170-10-2 6-165 11Z" fill={`url(#${id}-hull)`} />
    <path d="m33 130 161-10m-156 17 153-11m-148 19 146-12" stroke="#805b43" strokeWidth=".65" opacity=".65" /><path d="m36 131 156-10m-149 24 144-11" stroke="#ebc99b" strokeWidth=".7" opacity=".65" />
    <path d="m38 136 153-11-2 6-144 11Z" fill={`url(#${id}-hull)`} /><path d="m48 149 17 3 114-7 12-5q-43 16-143 9Z" fill="#624b3e" opacity=".24" />
    <path d="m56 142 4 10m30-12 2 14m29-16 1 14m29-16-1 12" stroke="#735143" strokeWidth=".7" opacity=".6" />
    <g fill="#4c463c" stroke="#e5cfad" strokeWidth="1.4"><circle cx="73" cy="128" r="3.7" /><circle cx="98" cy="126.5" r="3.7" /><circle cx="123" cy="125" r="3.7" /><circle cx="148" cy="123.5" r="3.7" /></g>
    <path d="m25 102 161-7m-156 15 153-7" fill="none" stroke="#997a59" strokeWidth="3" strokeLinecap="round" /><path d="m25 101 161-7m-156 15 153-7" fill="none" stroke="#fff4db" strokeWidth="1.6" strokeLinecap="round" /><path d="m35 102 1 8m19-9v8m21-9v8m22-9v8m21-9v8m21-9v8m21-9v8m19-9v8" stroke="#e8d5b4" strokeWidth="2" />
    <path d="M197 113c-13 1-13 14-23 14-10 0-13-14-20-9-5 4 0 9 4 5" fill="none" stroke="#f7ebd0" strokeWidth="3.5" strokeLinecap="round" />
    <g className="vessel-figurehead" strokeLinecap="round" strokeLinejoin="round">
      {/* Skull, muzzle and neck share one contour; only carved details overlay it. */}
      <path className="vessel-ram-silhouette" d="M189 120c-7-11-5-23 1-32l3-8c-4-9-2-17 5-20 10-5 22-2 26 7 2 4 1 7 4 10v7c-1 6-7 9-17 9-9 7-10 17-7 24l-4 4Z" fill={`url(#${id}-ram)`} stroke="#a08868" strokeWidth="1.2" />
      <path d="M195 86c2 5 7 6 12 5-8 9-11 20-9 27l-7 1c-6-10-3-21 4-33Z" fill="#bfa884" opacity=".24" />
      <path d="M198 61c9-3 17-1 21 5M193 96q-5 12-1 19" fill="none" stroke="#fffdf5" strokeWidth="1.6" />
      <path d="M198 67c-6-6-17-5-20 4-3 10 3 19 12 19 10 0 15-8 11-15-2-5-9-6-12-2-3 4-1 9 3 9" fill={`url(#${id}-horn)`} stroke="#957355" strokeWidth="1.2" />
      <path d="M198 68c-8-7-18 0-17 9 1 7 6 11 12 9" fill="none" stroke="#f1ddbc" strokeWidth="1.3" /><path d="M196 71c-5-3-11 1-10 7 1 7 8 9 12 4 3-4-2-9-5-6-1 2 0 3 2 3" fill="none" stroke="#9b7758" strokeWidth="1.1" />
      <path d="m183 68 2 3m-6 4 3 1m-2 6 3-1m1 7 2-3m6 4v-3" stroke="#a28362" strokeWidth=".7" />
      <path d="m202 64 3 4" stroke="#d3bea0" strokeWidth=".8" />
      <ellipse cx="215" cy="73" rx="3.4" ry="3.6" fill="#fffaf0" stroke="#76614b" strokeWidth=".85" /><ellipse cx="216" cy="73.3" rx="1.5" ry="1.9" fill="#4e4236" /><circle cx="216.4" cy="72.5" r=".5" fill="#fff" />
      <path d="M222 79q3-2 5 0m-8 7q5 3 8-1" fill="none" stroke="#8d7255" strokeWidth=".85" /><path d="M210 90q6 2 11 0" fill="none" stroke="#c3ad8c" strokeWidth=".7" />
      <path d="m188 105 15 4m-16 3 15 4" stroke="#a98b64" strokeWidth="2.5" /><path d="m188 104 15 4m-16 3 15 4" stroke="#ebd6b1" strokeWidth="1.4" /><g fill="#8c7257"><circle cx="192" cy="106" r=".7" /><circle cx="198" cy="108" r=".7" /><circle cx="191" cy="109" r=".7" /><circle cx="197" cy="111" r=".7" /></g>
    </g>
    <path d="m34 112 154-8" stroke="#fff9e8" strokeWidth="1" opacity=".6" />
  </svg>;

});

export const Sea = memo(function Sea() {
  return <svg viewBox="0 0 360 80" aria-hidden="true"><ellipse cx="180" cy="33" rx="114" ry="12" fill="#bc7e9920" /><g className="sea-ripple ripple-one"><path d="M26 27q24-9 48 0t48 0t48 0t48 0t48 0t48 0" /></g><g className="sea-ripple ripple-two"><path d="M56 45q21-7 42 0t42 0t42 0t42 0t42 0t42 0" /></g><g className="sea-ripple ripple-three"><path d="M105 63q20-5 40 0t40 0t40 0" /></g></svg>;
});
