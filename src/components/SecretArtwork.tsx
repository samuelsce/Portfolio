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
      <path d="M136 12v95" stroke="#896448" strokeWidth="4" strokeLinecap="round" />
      <path d="M129 20h14l-2 8h-10Z" fill="#ba956d" stroke="#896448" />
      <path d="M129 18h14m-11 2v6m5-6v6m4-6v6" stroke="#f0d6b3" strokeWidth="1" />
      <g className="vessel-pennant"><path d="m138 9 19 3-5 5-14-3Z" fill="#3d2b37" /><path d="M144 11v3m3-3v3" stroke="#f8ede0" strokeWidth="1.2" /></g>
      <g className="vessel-sail"><path d="M128 34q31-8 59 0l-4 49q-28-6-56 4 7-28 1-53Z" fill={`url(#${id}-sail)`} stroke="#bbaa94" strokeWidth="1" /><path d="M129 34q26 5 57 0m-57 47q23-7 50-2" fill="none" stroke="#fffaf3" strokeWidth="2" /><path d="M143 35q5 24-3 47m29-48q-4 23-1 45" fill="none" stroke="#d6c8b5" strokeWidth=".7" />
      <g transform="translate(156 55)" fill="#665143"><path d="m-10 13 20-15m-21-1 22 15" fill="none" stroke="#665143" strokeWidth="2" strokeLinecap="round" /><path d="M-7 1q-1-9 7-9t7 9q0 4-4 5v5h-6V6Q-7 5-7 1Z" /><ellipse cx="-3" cy="0" rx="1.8" ry="2" fill="#f8efdf" /><ellipse cx="3" cy="0" rx="1.8" ry="2" fill="#f8efdf" /><path d="m0 3-1 2h2Z" fill="#f8efdf" /><path d="M-8-6q8-6 16 0l-1-5q-7-6-14 0Z" fill="#d6b278" /><path d="M-8-8H8" stroke="#ac546d" strokeWidth="2" /></g></g>
      <path d="m135 29-22 76m23-76 58 72" fill="none" stroke="#a79780" strokeWidth=".85" />
      <path d="M189 42v66" stroke="#9a7657" strokeWidth="2" />
      <g className="vessel-jib"><path d="m188 44 23 54-24-5Z" fill="#f5e6d5" stroke="#b3a08c" /><path d="m190 51 6 15-8-2m11 11 6 14-17-4" fill="#b96e7d" opacity=".7" /></g>
    </g>
    <g className="vessel-cabin"><path d="M28 88h40v19H28Z" fill="#eee0c5" stroke="#a88b65" /><path d="m22 87 24-12 26 10-4 5H27Z" fill="#b27362" stroke="#936347" /><path d="M31 94h7v8h-7Zm17-2h7v10h-7Zm12 3h5v7h-5Z" fill="#665247" stroke="#ceba97" /><path d="M26 87q20-5 43-1" stroke="#e1aa87" fill="none" /></g>
    <path d="m21 106 170-8 20 10-176 15Z" fill="#d4b18a" stroke="#997352" /><path d="m31 111 156-7" stroke="#f3d9b4" fill="none" />
    <ellipse className="vessel-crew-contact" cx="87" cy="104" rx="11" ry="1.8" fill="#765345" opacity=".18" />
    <path d="m23 111 181-7-10 33q-75 21-152 5Z" fill={`url(#${id}-hull)`} stroke="#95735b" strokeWidth="1.3" />
    <path d="m24 111 180-7-3 7-173 10Z" fill="#936c4e" /><path d="m28 120 172-9-2 6-166 9Z" fill="#ead8ba" />
    <path d="m35 132 161-9-2 7-155 10Z" fill="#a77d56" /><path d="m41 141 153-11-9 10q-67 18-137 9Z" fill={`url(#${id}-wood)`} />
    <path d="m54 142 5 10m29-12 3 14m29-16 1 14m29-15-1 10" stroke="#735143" strokeWidth=".8" opacity=".65" />
    <g fill="#665045" stroke="#bfa283" strokeWidth="1.3"><circle cx="73" cy="126" r="4" /><circle cx="98" cy="124.5" r="4" /><circle cx="123" cy="123" r="4" /><circle cx="148" cy="121.5" r="4" /></g>
    <path d="m25 103 161-7m-156 15 153-7" fill="none" stroke="#a98560" strokeWidth="2" strokeLinecap="round" /><path d="m35 103 1 8m19-9v8m21-9v8m22-9v8m21-9v8m21-9v8m21-9v8m19-9v8" stroke="#b3926e" strokeWidth="1.5" />
    <g className="vessel-figurehead"><path d="M193 115q-7-22 8-34l16 6q-14 11-9 25Z" fill="#eee2ca" stroke="#ae967d" /><path d="M202 80q-4-12 8-13 11-1 13 9l-3 11q-3 9-12 8-12-1-11-9Z" fill="#fff2da" stroke="#ae967d" /><path d="M205 69q-11-4-11 6 0 10 9 9 7-1 6-7-1-5-5-4-4 1-2 4" fill="#d2bba1" stroke="#aa8a6a" strokeWidth="1.2" /><path d="M201 72q-5 0-4 5" fill="none" stroke="#f1e0c6" strokeWidth="1.3" strokeLinecap="round" /><path className="vessel-ear" d="m219 77 8-2q2 6-6 8Z" fill="#ebd6b8" stroke="#ae967d" /><circle cx="216" cy="81" r="1.5" fill="#60483a" /><path d="M214 86q9-3 9 3-3 6-8 1Z" fill="#f5e4c6" /><path d="M215 89q4 4 7-1" stroke="#85654d" fill="none" strokeLinecap="round" /><path d="M216 83q1 2 3 1" stroke="#c09b77" fill="none" /></g>
    <path d="m34 112 154-8" stroke="#fff9e8" strokeWidth="1" opacity=".6" />
  </svg>;

});

export const Sea = memo(function Sea() {
  return <svg viewBox="0 0 360 80" aria-hidden="true"><ellipse cx="180" cy="33" rx="114" ry="12" fill="#bc7e9920" /><g className="sea-ripple ripple-one"><path d="M26 27q24-9 48 0t48 0t48 0t48 0t48 0t48 0" /></g><g className="sea-ripple ripple-two"><path d="M56 45q21-7 42 0t42 0t42 0t42 0t42 0t42 0" /></g><g className="sea-ripple ripple-three"><path d="M105 63q20-5 40 0t40 0t40 0" /></g></svg>;
});

export const Ghost = memo(function Ghost({ second = false }: { second?: boolean }) {
  const id = useId().replace(/:/g, "");
  return <svg viewBox="0 0 80 104" aria-hidden="true"><defs><linearGradient id={id} x2=".6" y2="1"><stop stopColor="#fffafb" /><stop offset="1" stopColor={second ? "#d9bfdc" : "#e8d7ed"} /></linearGradient></defs>
    <g className="ghost-body">
      <g className="ghost-arm ghost-arm-left"><path d="M21 51q-17 3-14 15 4 3 8-7" fill="#f8edf7" stroke="#b59ab7" strokeWidth="1.2" /></g>
      <g className="ghost-arm ghost-arm-right"><path d="M60 51q17 3 14 15-4 3-8-7" fill="#e3cde4" stroke="#b59ab7" strokeWidth="1.2" /></g>
      <path d="M16 82q-5-16-2-42Q15 11 39 11t27 29q4 22-2 45l-9-5-9 8-10-7-11 6-5-7Z" fill={`url(#${id})`} stroke="#b59ab7" strokeWidth="1.2" />
      <path d="M23 39q0-17 15-20" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".65" />
      <path className="ghost-hem" d="M18 75q9 6 17 1t15 1 12-1" stroke="#c4a9cd" strokeWidth="1" fill="none" opacity=".6" />
      <g className="ghost-face"><g className="ghost-eyes" fill="#63405e"><ellipse cx="30" cy="40" rx="3" ry="4.8" /><ellipse cx="49" cy="40" rx="3" ry="4.8" /><circle cx="29.4" cy="38.4" r=".8" fill="#fff" /><circle cx="48.4" cy="38.4" r=".8" fill="#fff" /></g><path d={second ? "M35 54q5 5 10-1" : "M35 54q5 7 10 0"} fill="none" stroke="#63405e" strokeWidth="1.6" strokeLinecap="round" /><ellipse cx="23" cy="51" rx="4" ry="2" fill="#bd80a6" opacity=".2" /><ellipse cx="57" cy="51" rx="4" ry="2" fill="#bd80a6" opacity=".2" /></g>
    </g>
  </svg>;
});

export const Treasure = memo(function Treasure() {
  return <svg viewBox="0 0 76 74" aria-hidden="true">
    <ellipse cx="37" cy="66" rx="29" ry="4" fill="#714f4920" />
    <g className="treasure-coins" fill="#f2d595" stroke="#ae8451" strokeWidth=".8"><ellipse cx="25" cy="28" rx="6" ry="3" /><ellipse cx="39" cy="25" rx="7" ry="3" /><ellipse cx="50" cy="29" rx="6" ry="3" /></g>
    <path d="m11 35 43-7 13 8-44 9Z" fill="#704f45" stroke="#7c594b" />
    <path d="m11 35 12 10v20L11 56Z" fill="#9b7059" stroke="#7c594b" />
    <path d="m23 45 44-9v20L23 65Z" fill="#c3936f" stroke="#7c594b" />
    <path d="m31 43 1 20m23-25v20" stroke="#e9c887" strokeWidth="4" /><path d="m41 42 9-2v10l-9 2Z" fill="#f3d699" stroke="#9d784a" /><circle cx="46" cy="45" r="1" fill="#8b633f" />
    <g className="treasure-lid"><path d="m11 35 1-11q3-14 22-17l21 3q11 0 12 14v12l-44 9Z" fill="#b98765" stroke="#7c594b" strokeWidth="1.2" /><path d="m12 25 43-9 12 8-44 10Z" fill="#ceab80" /><path d="m23 34 44-10v12l-44 9Z" fill="#a97b5e" /><path d="m30 12 3 20v11m22-32 3 19v8" fill="none" stroke="#ebc988" strokeWidth="4" /><path d="m17 22 33-7" stroke="#e7be95" strokeWidth="1" /></g>
    <g className="treasure-glints" fill="none" stroke="#dfb56d" strokeWidth="1.5" strokeLinecap="round"><path d="M7 16v8m-4-4h8M65 5v10m-5-5h10M44 0v6m-3-3h6" /></g>
  </svg>;
});
