import { useId } from 'react';

/** Coordinates share the source artwork's canvas, so details stay on the pixels. */
export function SceneLights() {
  return <svg className="scene-lights" viewBox="0 0 2172 724" fill="none" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
    <g className="lamp-steady">
      <path d="M85 194h41v8h9v26h-9v9H85v-9h-8v-26h8Z" fill="#edbd65" opacity=".07" />
      <path d="M98 222h15l60 349H48Z" fill="#e5be74" opacity=".025" />
      <path d="M70 568h83v5h17v5H53v-5h17Z" fill="#f3c779" opacity=".08" />
      <path fill="#efbd62" d="M95 206h22v14H95z" />
      <path fill="#ffe7a3" d="M100 207h13v11h-13z" />
      <path fill="#fff2c8" d="M103 208h8v7h-8z" />
    </g>
    <path fill="#302b20" d="M2054 200h30v16h-30z" />
    <g className="lamp-unsteady">
      <path d="M2046 190h44v7h8v27h-8v9h-44v-9h-8v-27h8Z" fill="#edbd65" opacity=".08" />
      <path d="M2057 218h17l48 352h-111Z" fill="#e5be74" opacity=".03" />
      <path d="M2029 565h80v6h17v5h-113v-5h16Z" fill="#f3c779" opacity=".08" />
      <path fill="#efbd62" d="M2054 200h30v16h-30z" />
      <path fill="#ffe7a3" d="M2058 201h13v13h-13z" />
      <path fill="#fff2c8" d="M2061 202h8v9h-8z" />
    </g>
  </svg>;
}

export function CharacterExpression() {
  const id = useId();
  // Include the source image's pale edge pixels so none remain during a blink.
  const leftEye = 'M514 503h55v40h-55z';
  const rightEye = 'M608 503h42v40h-42z';
  return <svg className="character-expression" viewBox="0 0 1024 1536" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
    <defs>
      <clipPath id={`${id}-left`}><path d={leftEye} /></clipPath>
      <clipPath id={`${id}-right`}><path d={rightEye} /></clipPath>
    </defs>
    <g fill="#bc8c6b"><path d={leftEye} /><path d={rightEye} /></g>
    <path d="M514 521h55v5h-55zM608 521h42v5h-42z" fill="#38251d" />
    <g className="character-eyes-open">
      <g clipPath={`url(#${id}-left)`}>
        <path d={leftEye} fill="#f3f0e9" />
        <path className="character-pupil" d="M536 500h35v44h-35z" fill="#291b15" />
      </g>
      <g clipPath={`url(#${id}-right)`}>
        <path d={rightEye} fill="#f3f0e9" />
        <path className="character-pupil" d="M620 500h21v44h-21z" fill="#291b15" />
      </g>
    </g>
  </svg>;
}
