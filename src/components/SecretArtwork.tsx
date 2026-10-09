import { memo, useId } from "react";

export const SailingBoat = memo(function SailingBoat() {
  const id = useId().replace(/:/g, "");
  return <svg viewBox="0 0 230 160" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-wood`} x2="0" y2="1"><stop stopColor="#cfaa84" /><stop offset="1" stopColor="#95715b" /></linearGradient>
      <linearGradient id={`${id}-sail`} x2="1" y2=".7"><stop stopColor="#fffaf3" /><stop offset="1" stopColor="#e6d8cb" /></linearGradient>
    </defs>
    <g className="vessel-rig">
      <path d="M142 23v80" stroke="#8e6550" strokeWidth="4" strokeLinecap="round" />
      <path d="m142 27 17 7-17 7Z" fill="#9c4768" />
      <g className="vessel-sail"><path d="M140 42q28-8 53-1l-2 43q-32-4-50 7Z" fill={`url(#${id}-sail)`} stroke="#bcab9b" strokeWidth="1.1" /><path d="M146 44q24 0 40 2m-43 38q20-7 42-4" fill="none" stroke="#fffaf3" strokeWidth="2" /><path d="M168 42q-9 20-3 43" fill="none" stroke="#d0bdad" strokeWidth=".8" /><path d="m178 56-15 12 15 6" fill="none" stroke="#c17791" strokeWidth="2" strokeLinecap="round" /></g>
      <path d="m143 33-43 68m43-68 62 76" fill="none" stroke="#a89789" strokeWidth="1" />
    </g>
    <path d="m28 104 151-7 27 12-158 10Z" fill="#dec0a1" stroke="#9d7962" />
    <path d="m23 107 183-6-16 31q-63 27-142 2Z" fill={`url(#${id}-wood)`} stroke="#7f5c4d" strokeWidth="1.4" />
    <path d="m24 108 182-6-3 7-170 9Z" fill="#ead2b8" stroke="#9d7962" strokeWidth=".8" />
    <path d="m40 124 151-8m-140 17 129-8" stroke="#9a6e58" fill="none" strokeWidth="1.2" />
    <path d="m57 119 7 21m29-23 5 25m30-27 1 23m31-25-3 18" stroke="#85624f" strokeWidth="1" opacity=".6" />
    <path d="m43 133 139-5-8 8q-63 20-122 4Z" fill="#7d5749" opacity=".65" />
    <g className="vessel-figurehead"><path d="m196 110 1-19 12-6 9 11-7 14Z" fill="#eadcca" stroke="#aa937e" /><path d="M198 88q-7-13 4-16 7 0 9 9-2 6-9 6" fill="#f8ede0" stroke="#aa937e" /><path d="M205 78q-4-6-7-1t4 5" fill="none" stroke="#b99b80" strokeWidth="1.5" /><circle cx="215" cy="96" r="1.5" fill="#63483f" /><path d="m211 101 4 1" stroke="#967767" strokeLinecap="round" /></g>
    <path d="m31 112 160-6" stroke="#fff5e6" strokeWidth="1.3" opacity=".6" />
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
