import { useId } from "react";
import { BoneShape } from "./DogArtwork";

const headContour = "M56 15C79 14 93 29 93 51C94 75 79 90 56 89C32 90 18 75 19 52C18 29 33 14 56 15Z";

export function StrawHat() {
  const id = useId().replaceAll(":", "");
  return <g className="secret-costume-hat straw-hat">
    <defs><clipPath id={`${id}-fit`}><path d={headContour} /></clipPath><linearGradient id={`${id}-straw`} x2=".75" y2="1"><stop stopColor="#f4dca8" /><stop offset=".45" stopColor="#dcb87c" /><stop offset="1" stopColor="#a97c45" /></linearGradient><radialGradient id={`${id}-contact`}><stop stopColor="#652e40" stopOpacity=".36" /><stop offset="1" stopColor="#652e40" stopOpacity="0" /></radialGradient></defs>
    <ellipse className="hat-contact" cx="56" cy="32" rx="37" ry="9" fill={`url(#${id}-contact)`} clipPath={`url(#${id}-fit)`} />
    <ellipse cx="56" cy="28" rx="41" ry="6.5" fill="#ac8048" stroke="#956b3f" strokeWidth=".8" />
    <ellipse cx="56" cy="26.5" rx="41" ry="6.5" fill={`url(#${id}-straw)`} stroke="#a7834e" strokeWidth=".7" />
    <path d="M30 26 34 10Q56 0 78 10l5 16q-26 8-53 0Z" fill={`url(#${id}-straw)`} stroke="#9d7446" strokeWidth=".75" />
    <path d="M36 12q18-8 34-3" fill="none" stroke="#fff0c8" strokeWidth="1.8" strokeLinecap="round" />
    <path d="m31 19 2 7q24 7 49 0l-2-7q-24 7-49 0Z" fill="#a84b61" /><path d="M34 20q22 6 44 0" fill="none" stroke="#d18589" />
    <path d="m37 12-2 7m11-11-1 12m11-13v12m11-11 1 10m9-7 2 7" fill="none" stroke="#ad8751" strokeWidth=".65" />
    <path className="hat-front-brim" d="M16 27q40 12 80 0l-1 3q-39 12-78 0Z" fill="#d5b176" stroke="#a7834e" strokeWidth=".65" />
    <path d="M20 28q35 8 68 2" stroke="#f9dfae" strokeWidth="1.1" fill="none" />
  </g>;
}
export function Fedora() {
  const id = useId().replaceAll(":", "");
  return <g className="secret-costume-hat fedora">
    <defs><clipPath id={`${id}-fit`}><path d={headContour} /></clipPath><linearGradient id={`${id}-felt`} x2=".8" y2="1"><stop stopColor="#655066" /><stop offset=".45" stopColor="#3e3041" /><stop offset="1" stopColor="#211926" /></linearGradient><radialGradient id={`${id}-contact`}><stop stopColor="#552034" stopOpacity=".46" /><stop offset="1" stopColor="#552034" stopOpacity="0" /></radialGradient></defs>
    <ellipse className="hat-contact" cx="56" cy="31" rx="36" ry="9" fill={`url(#${id}-contact)`} clipPath={`url(#${id}-fit)`} />
    <ellipse cx="56" cy="25" rx="39" ry="4.8" fill="#302534" stroke="#211926" strokeWidth=".7" />
    <path d="m28 25 5-21q7-5 22 3 16-8 23-3l6 21Z" fill={`url(#${id}-felt)`} stroke="#211926" strokeWidth=".8" />
    <path d="M36 7q12 1 19 5 10-5 20-6" fill="none" stroke="#847086" strokeWidth="1.4" strokeLinecap="round" opacity=".7" />
    <path d="m31 19 1 6q24 6 50 0l-1-6q-25 5-50 0Z" fill="#e9dfe9" /><path d="M34 23q21 5 43 0" fill="none" stroke="#fff5fa" strokeWidth=".75" />
    <path className="hat-front-brim" d="M17 26q39 9 78 0v3q-39 10-78 0Z" fill={`url(#${id}-felt)`} stroke="#211926" strokeWidth=".7" />
    <path d="M20 27q38 7 71 0" fill="none" stroke="#958094" strokeWidth=".8" opacity=".8" />
  </g>;
}
export function WhiteGlove() {
  const id = useId().replaceAll(":", "");
  return <g className="secret-glove"><defs><linearGradient id={id} x2=".8" y2="1"><stop stopColor="#fffaff" /><stop offset=".5" stopColor="#efe4ef" /><stop offset="1" stopColor="#cdb7d2" /></linearGradient></defs><path d="m96 72 5 1-1 4-5-1Z" fill="#e9dce9" stroke="#b29cb8" strokeWidth=".7" /><path d="M102 73c5 1 6 6 3 9-3 4-9 3-11-1-2-5 2-9 8-8Z" fill={`url(#${id})`} stroke="#a58aac" strokeWidth=".75" /><path d="m100 76 2 2m-3 1 2 2" stroke="#c6afcf" strokeWidth=".7" /><path d="M99 74q3-1 4 1" stroke="#fffaff" strokeWidth="1.1" strokeLinecap="round" /></g>;
}
export function HandBone() {
  return <g className="moment-hand-bone" transform="translate(94 69) rotate(-22 9 6)"><g transform="scale(.45)"><BoneShape /></g><path d="m3 6 4 3 4-2" stroke="#eb91b3" strokeWidth="2.5" strokeLinecap="round" fill="none" /></g>;
}
