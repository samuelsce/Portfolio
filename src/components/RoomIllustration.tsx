// Every object uses the same projection, including its height. This keeps the
// keyboard on the desk and the chair, cabinet and plant on separate floor areas.
import { memo } from "react";
import { useLanguage } from "../i18n/LanguageProvider";

type Point = readonly [number, number, number];
const project = ([x, z, height]: Point) =>
  `${320 + (x - z) * 0.9},${210 + (x + z) * 0.46 - height}`;
const face = (...points: Point[]) => points.map(project).join(" ");

function Box({
  x,
  z,
  width,
  depth,
  height,
  bottom = 0,
  top,
  left,
  right,
}: {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  bottom?: number;
  top: string;
  left: string;
  right: string;
}) {
  const y = bottom + height;
  return (
    <g>
      <polygon
        points={face(
          [x, z + depth, bottom],
          [x + width, z + depth, bottom],
          [x + width, z + depth, y],
          [x, z + depth, y],
        )}
        fill={left}
      />
      <polygon
        points={face(
          [x + width, z, bottom],
          [x + width, z + depth, bottom],
          [x + width, z + depth, y],
          [x + width, z, y],
        )}
        fill={right}
      />
      <polygon
        points={face(
          [x, z, y],
          [x + width, z, y],
          [x + width, z + depth, y],
          [x, z + depth, y],
        )}
        fill={top}
      />
    </g>
  );
}

function RoomIllustration({ night }: { night: boolean }) {
  const { t } = useLanguage();
  return (
    <svg
      className={`room-illustration ${night ? "room-night" : ""}`}
      viewBox="70 35 500 425"
      role="img"
      aria-labelledby="room-illustration-title"
    >
      <title id="room-illustration-title">
        {t.roomDescription} {night ? t.nightLight : t.dayLight}.
      </title>
      <defs>
        <filter
          id="room-floor-shadow"
          x="-30%"
          y="-100%"
          width="160%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <linearGradient id="room-window-glass" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="var(--room-glass-top)" />
          <stop offset="1" stopColor="var(--room-glass-bottom)" />
        </linearGradient>
      </defs>
      <ellipse
        cx="320"
        cy="421"
        rx="183"
        ry="19"
        fill="var(--room-shadow)"
        opacity=".18"
        filter="url(#room-floor-shadow)"
      />
      <Box
        x={0}
        z={0}
        width={220}
        depth={220}
        height={9}
        bottom={-9}
        top="var(--room-floor)"
        left="var(--room-floor-edge)"
        right="var(--room-floor-edge)"
      />
      <polygon
        points={face([0, 0, 0], [0, 220, 0], [0, 220, 155], [0, 0, 155])}
        fill="var(--room-wall-left)"
      />
      <polygon
        points={face([0, 0, 0], [220, 0, 0], [220, 0, 155], [0, 0, 155])}
        fill="var(--room-wall-right)"
      />
      <polyline
        points={face([0, 220, 155], [0, 0, 155], [220, 0, 155])}
        fill="none"
        stroke="var(--room-trim)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <polyline
        points={face([0, 220, 0], [0, 0, 0], [220, 0, 0])}
        fill="none"
        stroke="var(--room-trim)"
        strokeWidth="3"
      />
      <g className="room-window">
        <polygon
          points={face(
            [133, 0, 65],
            [205, 0, 65],
            [205, 0, 133],
            [133, 0, 133],
          )}
          fill="url(#room-window-glass)"
          stroke="var(--room-trim)"
          strokeWidth="5"
        />
        <path
          d={`M${project([169, 0, 65])} L${project([169, 0, 133])} M${project([133, 0, 99])} L${project([205, 0, 99])}`}
          stroke="var(--room-trim)"
          strokeWidth="3"
        />
        <path
          className="room-moon"
          d="M487 171a8 8 0 1 0 0 14 8 8 0 0 1 0-14Z"
          fill="#fef5d9"
        />
      </g>
      <polygon
        points={face([90, 10, 1], [162, 10, 1], [207, 127, 1], [134, 127, 1])}
        className="room-sunlight"
      />
      <g>
        <polygon
          points={face(
            [0, 145, 70],
            [0, 182, 70],
            [0, 182, 119],
            [0, 145, 119],
          )}
          fill="#fff5e8"
        />
        <polygon
          points={face(
            [1, 151, 77],
            [1, 176, 77],
            [1, 176, 112],
            [1, 151, 112],
          )}
          fill="#eea3b7"
        />
        <path
          d={`M${project([2, 155, 81])} L${project([2, 162, 102])} L${project([2, 169, 86])} L${project([2, 173, 99])}`}
          fill="none"
          stroke="#ae506a"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <polygon
        points={face([24, 30, 1], [148, 30, 1], [148, 194, 1], [24, 194, 1])}
        fill="var(--room-rug-edge)"
      />
      <polygon
        points={face([30, 36, 2], [142, 36, 2], [142, 188, 2], [30, 188, 2])}
        fill="var(--room-rug)"
      />
      <g className="room-desk">
        {[
          [34, 40],
          [130, 40],
          [34, 90],
          [130, 90],
        ].map(([x, z]) => (
          <Box
            key={`${x}-${z}`}
            x={x}
            z={z}
            width={6}
            depth={6}
            height={61}
            top="var(--room-wood-top)"
            left="var(--room-wood-left)"
            right="var(--room-wood-right)"
          />
        ))}
        <Box
          x={28}
          z={34}
          width={112}
          depth={68}
          height={6}
          bottom={61}
          top="var(--room-wood-top)"
          left="var(--room-wood-left)"
          right="var(--room-wood-right)"
        />
        <polygon
          points={face(
            [78, 51, 67.2],
            [104, 51, 67.2],
            [104, 65, 67.2],
            [78, 65, 67.2],
          )}
          fill="#655a6b"
        />
        <Box
          x={90}
          z={55}
          width={5}
          depth={4}
          height={14}
          bottom={67}
          top="#6b6475"
          left="#514c58"
          right="#45404c"
        />
        <Box
          x={66}
          z={55}
          width={58}
          depth={4}
          height={42}
          bottom={79}
          top="#51495c"
          left="#423b4c"
          right="#302b37"
        />
        <polygon
          className="room-screen"
          points={face(
            [70, 59.1, 83],
            [120, 59.1, 83],
            [120, 59.1, 117],
            [70, 59.1, 117],
          )}
          fill="var(--room-monitor)"
        />
        {[108, 100, 92].map((height, index) => (
          <polyline
            key={height}
            points={face(
              [76, 59.3, height],
              [index === 1 ? 111 : 100, 59.3, height],
            )}
            stroke="var(--room-code)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        <Box
          x={65}
          z={79}
          width={46}
          depth={13}
          height={2}
          bottom={67}
          top="#e9e0e9"
          left="#c3b9c7"
          right="#b0a6b5"
        />
        {[82, 86, 90].map((z) => (
          <polyline
            key={z}
            points={face([69, z, 69.2], [106, z, 69.2])}
            stroke="#9c8ba9"
            strokeWidth="1"
          />
        ))}
        <polygon
          points={face(
            [117, 80, 67.4],
            [131, 80, 67.4],
            [131, 94, 67.4],
            [117, 94, 67.4],
          )}
          fill="#b999a3"
        />
        <ellipse
          cx="355"
          cy="239"
          rx="4.5"
          ry="3"
          fill="#eee5ea"
          transform="rotate(27 355 239)"
        />
      </g>
      <g className="room-cabinet">
        <Box
          x={170}
          z={42}
          width={40}
          depth={44}
          height={53}
          top="var(--room-wood-top)"
          left="var(--room-wood-left)"
          right="var(--room-wood-right)"
        />
        {[16, 34].map((height) => (
          <polyline
            key={height}
            points={face([174, 86, height], [206, 86, height])}
            stroke="var(--room-wood-right)"
            strokeWidth="1.5"
          />
        ))}
        {[20, 38].map((height) => (
          <polyline
            key={height}
            points={face([187, 86, height], [194, 86, height])}
            stroke="#674d44"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        ))}
        <Box
          x={183}
          z={55}
          width={15}
          depth={15}
          height={16}
          bottom={53}
          top="#c39b91"
          left="#ad8174"
          right="#936d63"
        />
        <g className="room-plant">
          <path
            d="M431 256q-5-22 1-38"
            fill="none"
            stroke="#607d58"
            strokeWidth="2.5"
          />
          <path
            d="M429 243c-21-1-23-14-21-21 16-1 22 9 21 21Z"
            fill="#739366"
          />
          <path
            d="M432 230c-2-19 10-26 20-25 2 16-8 24-20 25Z"
            fill="#628654"
          />
        </g>
      </g>
      <g className="room-chair">
        {[
          [70, 147],
          [94, 147],
          [70, 170],
          [94, 170],
        ].map(([x, z]) => (
          <Box
            key={`${x}-${z}`}
            x={x}
            z={z}
            width={3}
            depth={3}
            height={35}
            top="#706174"
            left="#655869"
            right="#504854"
          />
        ))}
        <Box
          x={67}
          z={144}
          width={34}
          depth={33}
          height={6}
          bottom={35}
          top="var(--room-chair-top)"
          left="#827088"
          right="#6c5d72"
        />
        <Box
          x={67}
          z={172}
          width={34}
          depth={5}
          height={34}
          bottom={41}
          top="#8e7d93"
          left="var(--room-chair-top)"
          right="#6c5d72"
        />
      </g>
    </svg>
  );
}

export default memo(RoomIllustration);
