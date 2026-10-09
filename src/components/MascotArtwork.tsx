import { memo, useId } from "react";

// Both the card and the roaming character use the same face and material.
// Limbs, props and orbital halves share the body rig, so they travel together.
const silhouette =
  "M56 15C79 14 93 29 93 51C94 75 79 90 56 89C32 90 18 75 19 52C18 29 33 14 56 15Z";

function Orbit({ front }: { front: boolean }) {
  return (
    <g className={`mascot-orbits orbit-${front ? "front" : "back"}`}>
      <g transform="rotate(-24 56 52)">
        <path
          className="orbital-track"
          d={front ? "M106 52a50 20 0 0 1-100 0" : "M6 52a50 20 0 0 1 100 0"}
        />
        <path
          className="orbital-echo"
          d={front ? "M105 55a49 21 0 0 1-98 0" : "M7 49a49 21 0 0 1 98 0"}
        />
        <g className={`orbit-satellite satellite-${front ? "front" : "back"}`}>
          <circle r="3.2" fill="#fba4c3" stroke="#a63a65" strokeWidth=".8" />
          <circle cx="-.8" cy="-.9" r="1" fill="#fff7fa" opacity=".8" />
        </g>
      </g>
    </g>
  );
}

function MascotArtwork({
  docked = false,
}: {
  docked?: boolean;
}) {
  const id = useId().replaceAll(":", "");
  return (
    <svg
      className={`mascot-artwork ${docked ? "mascot-artwork-docked" : ""}`}
      viewBox={docked ? "19 15 74 74" : "0 0 112 126"}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-material`} cx=".28" cy=".22" r=".86">
          <stop stopColor="#fff7fa" stopOpacity=".46" />
          <stop offset=".42" stopColor="#fff7fa" stopOpacity=".03" />
          <stop offset=".74" stopColor="#a52b58" stopOpacity=".1" />
          <stop offset="1" stopColor="#731b42" stopOpacity=".36" />
        </radialGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff7fa" stopOpacity=".5" /><stop offset=".4" stopColor="#fff7fa" stopOpacity="0" /><stop offset="1" stopColor="#731b42" stopOpacity=".25" /></linearGradient>
        <linearGradient id={`${id}-palm`} x2=".8" y2="1"><stop stopColor="#f8b5ce" /><stop offset=".5" stopColor="#f393b6" /><stop offset="1" stopColor="#c65c87" /></linearGradient>
        <radialGradient id={`${id}-shadow`}>
          <stop stopColor="#691b3e" stopOpacity=".22" />
          <stop offset=".55" stopColor="#691b3e" stopOpacity=".1" />
          <stop offset="1" stopColor="#691b3e" stopOpacity="0" />
        </radialGradient>
      </defs>
      {!docked && (
        <g className="mascot-shadow">
          <ellipse
            cx="56"
            cy="113"
            rx="28"
            ry="5"
            fill={`url(#${id}-shadow)`}
          />
          <ellipse
            cx="56"
            cy="111"
            rx="16"
            ry="1.8"
            fill="#691b3e"
            opacity=".09"
          />
        </g>
      )}
      <g className="mascot-body">
        <g className="mascot-attitude">
          {!docked && (
            <>
              <Orbit front={false} />
              <g
                className="mascot-limbs"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g className="mascot-leg leg-left">
                  <path
                    d="M44 81Q43 87 42 92"
                    stroke="#a54268"
                    strokeWidth="8"
                  />
                  <path
                    d="M43 83Q42 88 42 92"
                    stroke="#ec83aa"
                    strokeWidth="5"
                  />
                  <g className="mascot-lower-leg lower-leg-left">
                  <path d="M42 92Q41 98 40 103" stroke="#a54268" strokeWidth="7" />
                  <path d="M41.5 93Q40.5 98 40 102" stroke="#ec83aa" strokeWidth="4.5" />
                  <g className="mascot-shoe shoe-left">
                  <path
                    d="M40 100c-4-1-9 2-9 5 0 3 6 4 13 2 3-1 1-6-4-7Z"
                    fill="#77334f"
                  />
                  <path
                    d="M34 104q4-2 8-1"
                    stroke="#c27a98"
                    strokeWidth="1.4"
                  />
                  </g>
                  </g>
                </g>
                <g className="mascot-leg leg-right">
                  <path
                    d="M67 81Q68 87 69 92"
                    stroke="#a54268"
                    strokeWidth="8"
                  />
                  <path
                    d="M67 83Q68 88 69 92"
                    stroke="#ec83aa"
                    strokeWidth="5"
                  />
                  <g className="mascot-lower-leg lower-leg-right">
                  <path d="M69 92Q70 98 72 103" stroke="#a54268" strokeWidth="7" />
                  <path d="M69 93Q70 98 71 102" stroke="#ec83aa" strokeWidth="4.5" />
                  <g className="mascot-shoe shoe-right">
                  <path
                    d="M72 100c4-1 9 2 9 5 0 3-6 4-13 2-3-1-1-6 4-7Z"
                    fill="#77334f"
                  />
                  <path
                    d="M70 103q4-1 8 1"
                    stroke="#c27a98"
                    strokeWidth="1.4"
                  />
                  </g>
                  </g>
                </g>
                <g className="mascot-arm arm-left">
                  <path
                    d="M25 57Q11 61 12 76"
                    stroke="#ae4a71"
                    strokeWidth="8"
                  />
                  <path
                    d="M24 58Q12 62 13 75"
                    stroke="#f18bb0"
                    strokeWidth="5.5"
                  />
                  <path
                    d="M10 73c-5 1-6 6-3 9 3 4 9 3 11-1 2-5-2-9-8-8Z"
                    fill={`url(#${id}-palm)`}
                    stroke="#bf557d"
                    strokeWidth=".8"
                  />
                  <path d="m9 77 2 2" stroke="#c65c86" strokeWidth="1" />
                </g>
                <g className="mascot-arm arm-right">
                  <path
                    d="M87 57Q101 61 100 76"
                    stroke="#ae4a71"
                    strokeWidth="8"
                  />
                  <path
                    d="M88 58Q100 62 99 75"
                    stroke="#f18bb0"
                    strokeWidth="5.5"
                  />
                  <path
                    d="M102 73c5 1 6 6 3 9-3 4-9 3-11-1-2-5 2-9 8-8Z"
                    fill={`url(#${id}-palm)`}
                    stroke="#bf557d"
                    strokeWidth=".8"
                  />
                  <path d="m103 77-2 2" stroke="#c65c86" strokeWidth="1" />
                </g>
              </g>
            </>
          )}
          <g className="mascot-head">
            <path d={silhouette} className="mascot-skin" />
            <path d={silhouette} fill={`url(#${id}-material)`} />
            <path d={silhouette} stroke={`url(#${id}-rim)`} strokeWidth="1.1" />
            <path
              d="M30 35q5-10 15-12"
              stroke="#fff7fa"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity=".38"
            />
            <path
              d="M32 77q23 18 46-1"
              stroke="#a73460"
              strokeWidth="1"
              opacity=".12"
            />
            <g className="mascot-face-volume"><g className="mascot-gaze">
              <g
                className="mascot-brows"
                stroke="#691b3e"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path className="brow-left" d="m41 37 6-1" />
                <path className="brow-right" d="m64 36 6 1" />
              </g>
              <g className="mascot-eyes" fill="#291b24">
                <g className="mascot-eye eye-left">
                  <ellipse cx="45" cy="47" rx="2.6" ry="4.2" />
                  <circle
                    cx="44.3"
                    cy="45.7"
                    r=".7"
                    fill="#fff7fa"
                    opacity=".65"
                  />
                </g>
                <g className="mascot-eye eye-right">
                  <ellipse cx="67" cy="47" rx="2.6" ry="4.2" />
                  <circle
                    cx="66.3"
                    cy="45.7"
                    r=".7"
                    fill="#fff7fa"
                    opacity=".65"
                  />
                </g>
              </g>
              <ellipse
                className="mascot-cheek"
                cx="35"
                cy="59"
                rx="5"
                ry="2.5"
                fill="#b82f60"
                opacity=".18"
              />
              <ellipse
                className="mascot-cheek"
                cx="77"
                cy="59"
                rx="5"
                ry="2.5"
                fill="#b82f60"
                opacity=".18"
              />
              <g stroke="#291b24" strokeWidth="2" strokeLinecap="round">
                <path className="mascot-smile" d="M48 62q8 11 16 0" />
                <path className="mascot-smirk" d="M46 63q10 8 20-2" />
                <g className="mascot-snarl">
                  <path
                    d="M48 64q7-6 16-1v5q-7 4-15 1Z"
                    fill="#fff7fa"
                    strokeWidth="1.6"
                  />
                  <path d="M52 63v5m5-6v7m4-7v6" strokeWidth=".75" />
                </g>
                <path
                  className="mascot-furrow"
                  d="m52 36 2 3m6-3-2 3"
                  stroke="#913052"
                  strokeWidth="1.2"
                />
                <path className="mascot-effort" d="M49 65q7-4 14 0" />
                <path
                  className="mascot-frown"
                  d="M48 68q8-9 16 0"
                  strokeWidth="2.4"
                />
                <path
                  className="mascot-closed-eyes"
                  d="M40 48q5-5 10 0m12 0q5-5 10 0"
                />
              </g>
              <ellipse
                className="mascot-gasp"
                cx="56"
                cy="65"
                rx="4"
                ry="5"
                fill="#691b3e"
              />
            </g></g>
          </g>
          <g className="mascot-coffee" strokeLinecap="round" strokeLinejoin="round">
            <path d="M85 58q7 16-3 19" stroke="#b9557d" strokeWidth="7" />
            <path d="M85 59q6 14-3 17" stroke="#f18bb0" strokeWidth="4.5" />
            <g className="coffee-cup">
              <path d="M81 69h3a4 4 0 0 1 0 8h-3" stroke="#e7cdd8" strokeWidth="2.8" />
              <path d="M66 67h16v12q0 5-8 5t-8-5Z" fill="#fff8fb" stroke="#b88a9f" strokeWidth="1" />
              <ellipse cx="74" cy="67" rx="8" ry="2.1" fill="#8a5262" stroke="#e7cdd8" strokeWidth="1" />
              <path d="M69 71v7" stroke="#fff" strokeWidth="1.4" />
              <path className="coffee-steam" d="M71 61q-4-4 0-8m6 8q-4-4 0-8" stroke="#b9557d" strokeWidth="1.5" />
            </g>
            <ellipse cx="82" cy="76" rx="4.5" ry="3.2" fill="#f393b6" stroke="#bf557d" />
            <path d="M81 74v3m2-3v3" stroke="#a54268" strokeWidth=".7" />
          </g>
          {!docked && (
            <>
              <Orbit front />
              <g
                className="mascot-paper-grip"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M88 59Q94 78 76 86" stroke="#b9557d" strokeWidth="7" />
                <path
                  d="M88 60Q93 77 77 85"
                  stroke="#f18bb0"
                  strokeWidth="4.5"
                />
                <path d="M70 82h16v10H70Z" fill="#fff7fa" stroke="#b88a9f" />
                <path d="m81 82 5 5h-5Z" fill="#e7cdd8" stroke="#b88a9f" />
                <ellipse
                  cx="76"
                  cy="86"
                  rx="5"
                  ry="3.6"
                  fill="#f393b6"
                  stroke="#bf557d"
                />
                <path
                  d="M74 85v2m2-2v2m2-2v2"
                  stroke="#a54268"
                  strokeWidth=".7"
                />
              </g>
              {/* One rig: shoulder, forearm, handle and gripping fingers. */}
              <g
                className="mascot-inspection-rig"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M88 57Q91 78 103 67"
                  stroke="#b9557d"
                  strokeWidth="7"
                />
                <path
                  d="M88 58Q92 76 102 67"
                  stroke="#f18bb0"
                  strokeWidth="4.5"
                />
                <g className="mascot-magnifier">
                  <circle
                    cx="88"
                    cy="47"
                    r="11"
                    fill="#fff7fa"
                    fillOpacity=".64"
                    stroke="#77334f"
                    strokeWidth="2.8"
                  />
                  <path d="m96 55 9 13" stroke="#77334f" strokeWidth="5" />
                  <path d="M81 46q0-6 6-6" stroke="#fff7fa" strokeWidth="2" />
                  <path
                    d="m94 50 2-3"
                    stroke="#fff7fa"
                    strokeWidth="1.4"
                    opacity=".6"
                  />
                </g>
                <path
                  d="M104 62c-5-1-8 2-6 6 2 4 7 4 9 0 1-2 0-5-3-6Z"
                  fill="#f393b6"
                  stroke="#bf557d"
                  strokeWidth=".9"
                />
                <path d="m102 65 2 2" stroke="#a54268" strokeWidth=".8" />
              </g>
              <g className="mascot-night" fill="#fff0bd">
                <path d="M99 9a8 8 0 1 0 8 12A8 8 0 0 1 99 9Z" />
                <path d="m15 13 1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5Z" />
              </g>
              <g
                className="mascot-anger"
                stroke="#b82f60"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path
                  className="anger-mark"
                  d="M87 18v5h5m3-5v5h-1m-7 11v-5h5m3 5v-5h-1"
                />
                <path className="steam steam-left" d="M23 26q-6-5 0-10t0-9" />
                <path className="steam steam-right" d="M86 27q6-5 0-10t0-9" />
              </g>
              <g className="mascot-heart" fill="#ef75a3">
                <path d="M17 18C7 8 0 23 17 32c17-9 10-24 0-14Z" />
                <path d="M98 8c-6-6-10 3 0 9 10-6 6-15 0-9Z" />
              </g>
              <g
                className="mascot-sweat"
                stroke="#ef75a3"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="m90 22 5-7m-3 17 9-1" />
              </g>
              <g
                className="mascot-delight"
                stroke="#ef75a3"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M15 20v10m-5-5h10M96 8v8m-4-4h8" />
              </g>
            </>
          )}
        </g>
      </g>
    </svg>
  );
}

export default memo(MascotArtwork);
