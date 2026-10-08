import { memo } from "react";
import MascotArtwork from "./MascotArtwork";

const points = [[340,64],[230,56],[148,112],[192,184],[294,218],[348,278],[282,342],[168,334]];
const stars = [[48,56],[100,270],[432,48],[550,94],[516,308],[430,362],[62,352],[382,174]];

// Kept within the workbench; the controller animates only while it is revealed.
export default memo(function ConstellationScene() {
  return <div className="constellation-scene" aria-hidden="true">
    <svg className="constellation-map" viewBox="0 0 600 400" fill="none">
      <path className="constellation-trace" d="M340 64 230 56 148 112 192 184 294 218 348 278 282 342 168 334" pathLength="1" />
      {points.map(([x,y],i)=><g className="constellation-star" key={i} style={{transformOrigin:`${x}px ${y}px`}}>
        <path d={`M${x} ${y-8}l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z`} fill="#ffe6f1" />
        <circle cx={x} cy={y} r="2" fill="#ef75a3" />
      </g>)}
      {stars.map(([x,y],i)=><circle className="constellation-dust" key={i} cx={x} cy={y} r={i%2?1.7:2.5} fill="#e798b7" />)}
      <path className="constellation-comet" d="m445 34-50 31" stroke="#fff3fa" strokeWidth="2" strokeLinecap="round" />
    </svg>
    <div className="constellation-planet">
      <i className="constellation-orbit" />
      <i className="constellation-orbit orbit-cross" />
      <MascotArtwork docked />
    </div>
  </div>;
});
