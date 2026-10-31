// Shared cold-weather scenery for the November winter videos (V76, V77, V78), built on the C01 cine kit.
// Taken from the V73 summit set so the winter look stays the same across videos.
import React from "react";
import { AbsoluteFill } from "remotion";
import { Pine } from "./kit";
import { Cam, Clouds, Haze, Particles, Plane, Ridge, Sky, SkyPlane, Svg } from "./cine";

export const WINTER: Sky = { top: "#3f6e9c", mid: "#a9c3d8", low: "#eef1ee", sun: [800, 560], sunR: 46, sunCol: "#fffdf2", glow: "#f3efe0" };
export const STORM: Sky = { top: "#56677a", mid: "#9aa8b3", low: "#d9dde0", sun: [820, 520], sunR: 34, sunCol: "#f4f4ee", glow: "#dde0e0" };
export const DAWN: Sky = { top: "#2f4f78", mid: "#9db2c9", low: "#f1d9c0", sun: [300, 760], sunR: 50, sunCol: "#fff2dc", glow: "#ffcf9c" };
export const WGOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 640], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

export const SNOW = "#f3f6f8";
export const SNOW2 = "#dbe3e8";

export const SnowWoods: React.FC<{ y: number; shift: number; snow?: number }> = ({ y, shift, snow = 1 }) => (
  <Svg>
    {Array.from({ length: 11 }, (_, i) => {
      const x = ((((-160 + i * 150 - shift) % 1650) + 1650) % 1650) - 300;
      const h = 460 + (i % 3) * 90;
      const yy = y + (i % 2) * 22;
      return (
        <g key={i}>
          <Pine x={x} y={yy} h={h} c="#2f5446" c2="#24443a" />
          {snow > 0 &&
            [0, 1, 2, 3].map((k) => {
              const w = h * (0.42 - k * 0.08);
              const ty = yy - h * 0.12 - k * h * 0.21;
              return <path key={k} d={`M${x - w * 0.8},${ty - 4} Q${x - w * 0.2},${ty - h * 0.06} ${x + w * 0.3},${ty - 6} L${x + w * 0.1},${ty} Z`} fill={SNOW} opacity={0.9 * snow} />;
            })}
        </g>
      );
    })}
  </Svg>
);

export const WinterBackdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; woods?: boolean; snow?: number; mid?: string }> = ({
  cam,
  sky,
  uid,
  treeY,
  blur = 0,
  t,
  woods = true,
  snow = 1,
  mid = "#8ea1ad",
}) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#ffffff" seed={uid.charCodeAt(0) + 3} drift={t * 14} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={17} base={treeY - 260} amp={420} scale={240} col="#b9c7d3" lit="#ffffff" peak={180} />
    </Plane>
    <Haze y={treeY - 430} h={380} col={sky.low} opacity={0.75} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={31} base={treeY - 110} amp={250} scale={170} col={mid} lit="#e9f0f4" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.45} />
    {woods && (
      <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
        <SnowWoods y={treeY} shift={cam.x * 0.2} snow={snow} />
      </Plane>
    )}
  </>
);

// Frosty forest trail: frozen dirt path with white frost on the grass. tilt > 0 rises to the right.
export const FrostTrail: React.FC<{ y: number; tilt?: number; snow?: number }> = ({ y, tilt = 0, snow = 0 }) => {
  const Y = (x: number) => y - tilt * (x - 540);
  return (
    <Svg>
      <path d={`M-400,${Y(-400) - 40} L1480,${Y(1480) - 40} L1480,2600 L-400,2600 Z`} fill={snow > 0.5 ? SNOW2 : "#8b9478"} />
      <path d={`M-400,${Y(-400) - 4} L1480,${Y(1480) - 4} L1480,${Y(1480) + 70} L-400,${Y(-400) + 70} Z`} fill={snow > 0.5 ? "#e6ecef" : "#8a7560"} />
      <path d={`M-400,${Y(-400) + 70} L1480,${Y(1480) + 70} L1480,2600 L-400,2600 Z`} fill={snow > 0.5 ? "#cfd9df" : "#6b7356"} />
      {Array.from({ length: 22 }, (_, i) => {
        const x = -360 + i * 86;
        const yy = Y(x) + 120 + ((i * 53) % 280);
        return <path key={`g${i}`} d={`M${x},${yy} q6,-30 12,-56 M${x + 10},${yy} q-4,-26 -10,-44`} stroke={snow > 0.5 ? "#b8c4cb" : "#dfe6e2"} strokeWidth={5} fill="none" strokeLinecap="round" />;
      })}
      {Array.from({ length: 14 }, (_, i) => {
        const x = -330 + i * 130;
        return <ellipse key={`f${i}`} cx={x} cy={Y(x) + 18 + (i % 3) * 14} rx={18 + (i % 4) * 5} ry={5} fill="#ffffff" opacity={0.55} />;
      })}
    </Svg>
  );
};

// Rocky snowy summit ground.
export const Summit: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y + 30} L200,${y - 20} Q520,${y - 50} 820,${y - 10} L1480,${y + 60} L1480,2600 L-400,2600 Z`} fill="#7d8288" />
    <path d={`M-400,${y + 50} L200,${y} Q520,${y - 30} 820,${y + 10} L1480,${y + 80} L1480,2600 L-400,2600 Z`} fill="#e9eef1" />
    <path d={`M-400,${y + 120} L1480,${y + 150} L1480,2600 L-400,2600 Z`} fill={SNOW2} />
    {[[-80, 70], [960, 110], [300, 180], [700, 240]].map(([x, dy], i) => (
      <g key={i}>
        <ellipse cx={x} cy={y + dy} rx={90} ry={34} fill="#6f747a" />
        <ellipse cx={x - 8} cy={y + dy - 18} rx={74} ry={14} fill={SNOW} />
      </g>
    ))}
  </Svg>
);

// Blowing snow across the frame.
export const Blizzard: React.FC<{ seed: number; n?: number; angle?: number }> = ({ seed, n = 26, angle = -55 }) => (
  <AbsoluteFill style={{ transform: `rotate(${angle}deg) scale(1.8)` }}>
    <Particles seed={seed} n={n} col="#ffffff" fall={240} bokeh={false} />
  </AbsoluteFill>
);
