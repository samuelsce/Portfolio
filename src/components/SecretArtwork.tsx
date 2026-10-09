import { memo, useId } from "react";

export const SailingBoat = memo(function SailingBoat() {
  const id = useId().replace(/:/g, "");
  return <svg viewBox="0 0 230 160" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-wood`} x2=".3" y2="1"><stop stopColor="#d5b58d" /><stop offset=".55" stopColor="#b38a65" /><stop offset="1" stopColor="#765345" /></linearGradient>
      <linearGradient id={`${id}-sail`} x2=".9" y2=".4"><stop stopColor="#fffaf1" /><stop offset=".5" stopColor="#f8efdf" /><stop offset="1" stopColor="#d9c9b4" /></linearGradient>
      <linearGradient id={`${id}-hull`} x2="0" y2="1"><stop stopColor="#fff8e9" /><stop offset="1" stopColor="#e0ceb6" /></linearGradient>
    </defs>
    <g className="vessel-rig">
      <path d="M128 9v101" stroke="#896448" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M126 30v67" stroke="#dfc3a0" strokeWidth="1" />
      <path d="M121 20h14l-2 8h-10Z" fill="#ba956d" stroke="#896448" />
      <path d="M121 18h14m-11 2v6m5-6v6m4-6v6" stroke="#f0d6b3" strokeWidth="1" />
      <g className="vessel-pennant"><path d="m128 9 19 3-5 5-14-3Z" fill="#3d2b37" /><path d="M134 11v3m3-3v3" stroke="#f8ede0" strokeWidth="1.2" /></g>
      <path d="M81 27h94" stroke="#896448" strokeWidth="3" strokeLinecap="round" />
      <g className="vessel-sail"><path d="M84 29q44-5 88 0l-4 57q-38 12-83 1 9-30-1-58Z" fill={`url(#${id}-sail)`} stroke="#bbaa94" strokeWidth="1.1" /><path d="M86 30q39 7 84 0M88 82q36 9 77 1" fill="none" stroke="#fffaf3" strokeWidth="2" /><path d="M102 31q5 27-1 54m50-55q-5 28-1 56" fill="none" stroke="#d6c8b5" strokeWidth=".85" />
      <g transform="translate(128 57) scale(1.15)" fill="#665143"><path d="m-10 13 20-15m-21-1 22 15" fill="none" stroke="#665143" strokeWidth="2" strokeLinecap="round" /><path d="M-7 1q-1-9 7-9t7 9q0 4-4 5v5h-6V6Q-7 5-7 1Z" /><ellipse cx="-3" cy="0" rx="1.8" ry="2" fill="#f8efdf" /><ellipse cx="3" cy="0" rx="1.8" ry="2" fill="#f8efdf" /><path d="m0 3-1 2h2Z" fill="#f8efdf" /><path d="M-8-6q8-6 16 0l-1-5q-7-6-14 0Z" fill="#d6b278" /><path d="M-8-8H8" stroke="#ac546d" strokeWidth="2" /></g></g>
      <path d="m128 27-52 76m52-76 68 69M83 28l-26 75m116-75 29 72" fill="none" stroke="#a79780" strokeWidth=".85" />
      <path d="M189 42v66" stroke="#9a7657" strokeWidth="2" />
      <g className="vessel-jib"><path d="m188 44 23 54-24-5Z" fill="#f5e6d5" stroke="#b3a08c" /><path d="m190 51 6 15-8-2m11 11 6 14-17-4" fill="#b96e7d" opacity=".7" /></g>
    </g>
    <g className="vessel-cabin"><path d="M25 84h47v24H25Z" fill="#eee0c5" stroke="#a88b65" /><path d="m20 84 28-16 29 14-5 5H25Z" fill="#b27362" stroke="#936347" /><path d="M29 92h8v10h-8Zm17-3h8v13h-8Zm17 3h6v10h-6Z" fill="#665247" stroke="#ceba97" /><path d="M24 84q25-7 48-1" stroke="#e1aa87" fill="none" /><path d="M34 78h27m-17-5h9" stroke="#d9a28b" strokeWidth="1" /><path d="M23 88h50" stroke="#b08e67" /></g>
    <path d="m21 106 170-8 20 10-176 15Z" fill="#d4b18a" stroke="#997352" /><path d="m31 111 156-7" stroke="#f3d9b4" fill="none" />
    <ellipse className="vessel-crew-contact" cx="87" cy="104" rx="11" ry="1.8" fill="#765345" opacity=".18" />
    <path d="m23 111 181-7-10 33q-75 21-152 5Z" fill={`url(#${id}-hull)`} stroke="#95735b" strokeWidth="1.3" />
    <path d="m24 111 180-7-3 7-173 10Z" fill="#936c4e" /><path d="m28 120 172-9-2 6-166 9Z" fill="#ead8ba" />
    <path d="m35 132 161-9-2 7-155 10Z" fill="#a77d56" /><path d="m41 141 153-11-9 10q-67 18-137 9Z" fill={`url(#${id}-wood)`} />
    <path d="m54 142 5 10m29-12 3 14m29-16 1 14m29-15-1 10" stroke="#735143" strokeWidth=".8" opacity=".65" />
    <g fill="#665045" stroke="#bfa283" strokeWidth="1.3"><circle cx="73" cy="126" r="4" /><circle cx="98" cy="124.5" r="4" /><circle cx="123" cy="123" r="4" /><circle cx="148" cy="121.5" r="4" /></g>
    <path d="m25 103 161-7m-156 15 153-7" fill="none" stroke="#a98560" strokeWidth="2" strokeLinecap="round" /><path d="m35 103 1 8m19-9v8m21-9v8m22-9v8m21-9v8m21-9v8m21-9v8m19-9v8" stroke="#b3926e" strokeWidth="1.5" />
    <path d="M193 116q-15 14-24 2t-16 5" fill="none" stroke="#d3bb99" strokeWidth="5" strokeLinecap="round" />
    <g className="vessel-figurehead"><path d="M192 118q-13-23 6-40l17 9q-16 11-9 28Z" fill="#eee2ca" stroke="#ae967d" strokeWidth="1.2" /><path d="M201 73q1-13 14-12 12 2 12 16l-3 13q-6 8-15 3-14-3-11-14Z" fill="#fff2da" stroke="#ae967d" /><path d="M200 67c-16-7-22 9-13 19 8 9 19 2 16-7-2-6-9-5-9 0 0 3 4 4 5 1" fill="#d2bba1" stroke="#aa8a6a" strokeWidth="1.5" /><path d="M191 68q-7 0-6 8" fill="none" stroke="#f1e0c6" strokeWidth="1.5" strokeLinecap="round" /><path className="vessel-ear" d="m215 69 12-4q4 7-7 10Z" fill="#ebd6b8" stroke="#ae967d" /><circle cx="219" cy="78" r="1.8" fill="#60483a" /><circle cx="219.5" cy="77.5" r=".55" fill="#fff" /><path d="M218 81q13-3 11 6-4 9-12 3Z" fill="#f5e4c6" stroke="#b69a77" strokeWidth=".7" /><path d="M218 86q7 6 10-1" stroke="#85654d" fill="none" strokeLinecap="round" /><path d="m202 100 7-7m-10 13 7-7" stroke="#d3bb99" strokeWidth="1" /></g>
    <path d="m34 112 154-8" stroke="#fff9e8" strokeWidth="1" opacity=".6" />
  </svg>;

});

export const Sea = memo(function Sea() {
  return <svg viewBox="0 0 360 80" aria-hidden="true"><ellipse cx="180" cy="33" rx="114" ry="12" fill="#bc7e9920" /><g className="sea-ripple ripple-one"><path d="M26 27q24-9 48 0t48 0t48 0t48 0t48 0t48 0" /></g><g className="sea-ripple ripple-two"><path d="M56 45q21-7 42 0t42 0t42 0t42 0t42 0t42 0" /></g><g className="sea-ripple ripple-three"><path d="M105 63q20-5 40 0t40 0t40 0" /></g></svg>;
});
