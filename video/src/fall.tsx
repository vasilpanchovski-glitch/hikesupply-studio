// Shared late-autumn scenery for the November videos (V63, V64, V65), built on the C01 cine kit.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "./Hiker";
import { LeafTree, Pine } from "./kit";
import { Cam, Clouds, Haze, Plane, Ridge, rim, Sky, SkyPlane, Svg } from "./cine";
import { mix } from "./lib";

export const CLEAR: Sky = { top: "#3a6a98", mid: "#9fc2dc", low: "#f4e2bc", sun: [790, 560], sunR: 52, sunCol: "#fff6dc", glow: "#ffd79a" };
export const OVERCAST: Sky = { top: "#56657a", mid: "#9aa6b0", low: "#d6d6cc", sun: [760, 640], sunR: 32, sunCol: "#f0f0ea", glow: "#dcdcd2" };
export const GOLD: Sky = { top: "#4a6890", mid: "#e5b487", low: "#ffdca6", sun: [740, 660], sunR: 62, sunCol: "#fff4d8", glow: "#ffc274" };

export const FALL = ["#c9662e", "#d9a34a", "#b5553a", "#8e3f2a"];

// Mixed late-autumn tree line: pines with a few orange broadleaf trees.
export const Woods: React.FC<{ y: number; shift: number; s?: number }> = ({ y, shift, s = 1 }) => (
  <Svg>
    {Array.from({ length: 11 }, (_, i) => {
      const x = ((((-160 + i * 160 - shift) % 1760) + 1760) % 1760) - 300;
      const h = (380 + (i % 3) * 90) * s;
      const yy = y + (i % 2) * 20;
      return i % 3 === 1 ? (
        <LeafTree key={i} x={x} y={yy} h={h * 0.9} c={FALL[i % 4]} c2={FALL[(i + 2) % 4]} />
      ) : (
        <Pine key={i} x={x} y={yy} h={h} c="#30513f" c2="#243f31" />
      );
    })}
  </Svg>
);

// Dirt trail across a grassy slope. tilt > 0 rises to the right.
export const Trail: React.FC<{ y: number; tilt?: number; grass?: string; dirt?: string }> = ({ y, tilt = 0, grass = "#76804a", dirt = "#9a7f5c" }) => {
  const Y = (x: number) => y - tilt * (x - 540);
  return (
    <Svg>
      <path d={`M-400,${Y(-400) - 40} L1480,${Y(1480) - 40} L1480,2600 L-400,2600 Z`} fill={grass} />
      <path d={`M-400,${Y(-400) - 4} L1480,${Y(1480) - 4} L1480,${Y(1480) + 70} L-400,${Y(-400) + 70} Z`} fill={dirt} />
      <path d={`M-400,${Y(-400) + 70} L1480,${Y(1480) + 70} L1480,2600 L-400,2600 Z`} fill="#5f6a3c" />
      {Array.from({ length: 16 }, (_, i) => {
        const x = -300 + i * 120;
        return <ellipse key={i} cx={x} cy={Y(x) + 18 + (i % 3) * 14} rx={14 + (i % 4) * 4} ry={5} fill="#7b6448" opacity={0.7} />;
      })}
      {Array.from({ length: 22 }, (_, i) => {
        const x = -360 + i * 86;
        const yy = Y(x) + 120 + ((i * 53) % 280);
        return <path key={`g${i}`} d={`M${x},${yy} q6,-30 12,-56 M${x + 10},${yy} q-4,-26 -10,-44`} stroke={i % 2 ? "#8c9a52" : "#a39a4a"} strokeWidth={5} fill="none" strokeLinecap="round" />;
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const x = -340 + i * 150;
        return <ellipse key={`l${i}`} cx={x + 40} cy={Y(x) + 200 + ((i * 71) % 260)} rx={9} ry={5} fill={FALL[i % 4]} opacity={0.85} />;
      })}
    </Svg>
  );
};

export const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; far?: string; mid?: string }> = ({
  cam,
  sky,
  uid,
  treeY,
  blur = 0,
  t,
  far = "#7d8aa0",
  mid = "#56634f",
}) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#fbf3e8" seed={uid.charCodeAt(0)} drift={t * 12} opacity={0.5} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2.6 + blur}>
      <Ridge seed={41} base={treeY - 270} amp={360} scale={250} col={far} lit="#f0dcc4" peak={120} />
    </Plane>
    <Haze y={treeY - 420} h={380} col={sky.low} opacity={0.62} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={47} base={treeY - 110} amp={230} scale={180} col={mid} />
    </Plane>
    <Haze y={treeY - 200} h={250} col={sky.low} opacity={0.4} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

export const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

export const Sweat: React.FC<{ p: HikerProps; t: number; on: number }> = ({ p, t, on }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={on}>
      {[0, 1, 2].map((i) => {
        const k = (t * 1.3 + i / 3) % 1;
        return <path key={i} d="M0,-9 Q7,2 0,8 Q-7,2 0,-9 Z" fill="#cfe9f7" stroke="#8fbcd4" strokeWidth={1.5} transform={`translate(${g.head[0] + 30 + i * 12},${g.head[1] - 8 + k * 50})`} opacity={1 - k} />;
      })}
    </g>
  );
};

export const Breath: React.FC<{ p: HikerProps; t: number; k?: number }> = ({ p, t, k: on = 1 }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const k = (t * 0.7) % 1;
  return (
    <g transform={hikerTransform(p)} opacity={on}>
      <circle cx={hx + 50 + k * 60} cy={hy + 12 - k * 20} r={7 + k * 18} fill="#f2f4f6" opacity={0.35 * (1 - k)} />
    </g>
  );
};

// Simple water bottle (local units, base at 0,0).
export const Bottle: React.FC<{ x: number; y: number; s?: number; rot?: number; col?: string }> = ({ x, y, s = 1, rot = 0, col = "#3f8fb0" }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-34} y={-200} width={68} height={200} rx={20} fill={col} stroke="rgba(0,0,0,0.25)" strokeWidth={2} />
    <rect x={-34} y={-150} width={68} height={60} fill="rgba(255,255,255,0.18)" />
    <rect x={-22} y={-232} width={44} height={36} rx={8} fill="#2b3a40" />
    <rect x={-24} y={-190} width={10} height={160} rx={5} fill="rgba(255,255,255,0.25)" />
  </g>
);

export const lerp2 = (a: [number, number], b: [number, number], k: number): [number, number] => [mix(a[0], b[0], k), mix(a[1], b[1], k)];
