// Grand Canyon kit for the cinematic illustrated series: layered canyon walls with rock bands, switchback trail,
// stone resthouse, water tap. Built on the depth planes from cine.tsx.
import React from "react";
import { fbm } from "./lib";
import { Cam, Clouds, Haze, Plane, Sky, SkyPlane, Svg } from "./cine";

export const DESERT: Sky = { top: "#3d6fa3", mid: "#a8c7df", low: "#f4dcc0", sun: [820, 520], sunR: 48, sunCol: "#fffbea", glow: "#ffe1b0" };
export const DUSK: Sky = { top: "#4a5f8a", mid: "#e0a37c", low: "#ffd29c", sun: [760, 700], sunR: 60, sunCol: "#fff2d0", glow: "#ffb46a" };
export const SHADE: Sky = { top: "#4f6a8a", mid: "#b3c2cf", low: "#ead8c8", sun: [880, 420], sunR: 34, sunCol: "#fff8ea", glow: "#f0dcc4" };

// Stepped, flat-topped canyon profile (terraces and cliffs), as an SVG path filled down to the bottom.
export const mesaPath = (seed: number, base: number, amp: number, step = 70, w = 1080, x0 = -500, x1 = 1600) => {
  const pts: string[] = [];
  let prev = 0;
  for (let x = x0; x <= x1; x += 40) {
    const h = fbm(x / 420, seed) * amp;
    const q = Math.round(h / step) * step;
    if (x === x0) pts.push(`M${x},${base - q}`);
    else {
      if (q !== prev) pts.push(`L${x - 14},${base - prev}`);
      pts.push(`L${x},${base - q}`);
    }
    prev = q;
  }
  pts.push(`L${x1},2600 L${x0},2600 Z`);
  void w;
  return pts.join(" ");
};

// One canyon wall layer with horizontal rock bands.
export const Wall: React.FC<{ seed: number; base: number; amp: number; col: string; band: string; uid: string; step?: number }> = ({ seed, base, amp, col, band, uid, step }) => {
  const d = mesaPath(seed, base, amp, step);
  return (
    <Svg>
      <defs>
        <clipPath id={`w${uid}${seed}`}>
          <path d={d} />
        </clipPath>
      </defs>
      <path d={d} fill={col} />
      <g clipPath={`url(#w${uid}${seed})`}>
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={-500} y={base - amp + i * 46} width={2100} height={10 + (i % 3) * 6} fill={band} opacity={0.35} />
        ))}
      </g>
    </Svg>
  );
};

// Canyon backdrop: sky, far rim, mid buttes, near wall, each blurred more the further away.
export const CanyonBackdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; y: number; blur?: number; t: number }> = ({ cam, sky, uid, y, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={380} col="#ffffff" seed={4} drift={t * 10} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.12} blur={3 + blur}>
      <Wall seed={3} base={y - 420} amp={220} col="#d9a07a" band="#f1c9a2" uid={uid} step={60} />
    </Plane>
    <Haze y={y - 520} h={360} col={sky.low} opacity={0.7} />
    <Plane cam={cam} depth={0.3} blur={1.8 + blur}>
      <Wall seed={9} base={y - 200} amp={420} col="#c47a4c" band="#e09a66" uid={uid} />
    </Plane>
    <Haze y={y - 260} h={280} col={sky.low} opacity={0.4} />
    <Plane cam={cam} depth={0.55} blur={1 + blur}>
      <Wall seed={21} base={y} amp={300} col="#a85a35" band="#c8774a" uid={uid} />
    </Plane>
  </>
);

// Red dirt trail ground with a gentle tilt (tilt > 0 rises to the right), scrub and stones.
export const CanyonTrail: React.FC<{ y: number; tilt?: number }> = ({ y, tilt = 0 }) => {
  const Y = (x: number) => y - tilt * (x - 540);
  return (
    <Svg>
      <path d={`M-400,${Y(-400) - 40} L1480,${Y(1480) - 40} L1480,2600 L-400,2600 Z`} fill="#9b5a36" />
      <path d={`M-400,${Y(-400) - 6} L1480,${Y(1480) - 6} L1480,${Y(1480) + 90} L-400,${Y(-400) + 90} Z`} fill="#c98b5e" />
      {Array.from({ length: 10 }, (_, i) => {
        const x = -300 + i * 200;
        return <ellipse key={i} cx={x} cy={Y(x) + 50 + (i % 3) * 14} rx={26 + (i % 3) * 10} ry={9} fill="#7d4a2c" />;
      })}
      {Array.from({ length: 6 }, (_, i) => {
        const x = -200 + i * 320;
        return (
          <g key={`s${i}`}>
            <ellipse cx={x} cy={Y(x) - 48} rx={60} ry={30} fill="#7a7f4a" />
            <ellipse cx={x + 30} cy={Y(x) - 60} rx={40} ry={22} fill="#8d935a" />
          </g>
        );
      })}
    </Svg>
  );
};

// Switchbacks climbing a wall from (x, yBot) up to yTop. Zig-zag width w.
export const Switchbacks: React.FC<{ x: number; yBot: number; yTop: number; n: number; w: number; col?: string; lw?: number }> = ({ x, yBot, yTop, n, w, col = "#efc79c", lw = 10 }) => {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const yy = yBot - ((yBot - yTop) * i) / n;
    const xx = x + (i % 2 ? w / 2 : -w / 2) * (1 - i / (n * 2.2));
    pts.push(`${i === 0 ? "M" : "L"}${xx},${yy}`);
  }
  return <path d={pts.join(" ")} stroke={col} strokeWidth={lw} fill="none" strokeLinejoin="round" strokeLinecap="round" />;
};

// Small stone resthouse with a flat roof (screen units, base centre at x,y).
export const Resthouse: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-200} y={-230} width={400} height={230} fill="#a98a6a" />
    {Array.from({ length: 6 }, (_, r) =>
      Array.from({ length: 5 }, (_, c) => (
        <rect key={`${r}-${c}`} x={-196 + c * 80 + (r % 2) * 30} y={-226 + r * 38} width={70} height={32} rx={8} fill={r % 2 ? "#b8997a" : "#9c7d5e"} opacity={0.9} />
      )),
    )}
    <rect x={-240} y={-270} width={480} height={50} fill="#6b4a32" />
    <rect x={-60} y={-160} width={120} height={160} fill="#3a2a1e" />
  </g>
);

// Water tap on a post (screen units, base at x,y). flow 0..1 draws running water.
export const Tap: React.FC<{ x: number; y: number; s?: number; turn?: number; flow?: number }> = ({ x, y, s = 1, turn = 0, flow = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-40} y={-520} width={80} height={520} rx={10} fill="#7a7f86" />
    <rect x={-40} y={-520} width={20} height={520} fill="rgba(255,255,255,0.18)" />
    <path d="M40,-440 L130,-440 Q160,-440 160,-410 L160,-370" stroke="#5f646a" strokeWidth={34} fill="none" strokeLinecap="round" />
    <g transform={`rotate(${turn * 90} 80 -480)`}>
      <rect x={70} y={-500} width={20} height={40} fill="#5f646a" />
      <rect x={30} y={-512} width={100} height={22} rx={10} fill="#c0392b" />
    </g>
    {flow > 0 && <rect x={150} y={-360} width={20} height={300 * flow} rx={10} fill="#8fd0ea" opacity={0.85} />}
  </g>
);
