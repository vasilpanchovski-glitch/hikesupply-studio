import React from "react";
import { useCurrentFrame } from "remotion";
import { ridgePath } from "./lib";

export type Palette = {
  sky: [string, string, string]; // top, mid, horizon
  sun: { x: number; y: number; r: number; color: string; glow: string };
  layers: string[]; // far -> near
  mist: string;
  stars?: number;
};

export const DAWN: Palette = {
  sky: ["#1c2a3a", "#8a5a62", "#f0b07a"],
  sun: { x: 300, y: 1010, r: 70, color: "#ffe2b0", glow: "#ffb46b" },
  layers: ["#b48a8a", "#86707e", "#5a5466", "#363846", "#1b2224"],
  mist: "#f6c9a0",
  stars: 0.5,
};

export const GOLDEN: Palette = {
  sky: ["#3f6a8f", "#e8b07a", "#ffe0a8"],
  sun: { x: 760, y: 820, r: 95, color: "#fff4d6", glow: "#ffc978" },
  layers: ["#d9a985", "#b5836c", "#7f6157", "#4b3f3c", "#1d1a19"],
  mist: "#ffe2b8",
};

export const Landscape: React.FC<{
  pal: Palette;
  W?: number;
  H?: number;
  camX?: number;
  camY?: number;
  zoom?: number;
  dim?: number;
  children?: React.ReactNode; // drawn above the near ridge layer index 3
  foreground?: React.ReactNode;
  uid?: string;
}> = ({ pal, W = 1080, H = 1920, camX = 0, camY = 0, zoom = 1, dim = 0, children, foreground, uid = "a" }) => {
  const frame = useCurrentFrame();
  const bases = [1080, 1180, 1290, 1420, 1600];
  const amps = [330, 300, 260, 230, 180];
  const scales = [260, 210, 170, 140, 120];
  const par = [0.1, 0.2, 0.35, 0.55, 0.8];
  const stars = Array.from({ length: 70 }, (_, i) => {
    const x = (Math.sin(i * 91.7) * 0.5 + 0.5) * W;
    const y = (Math.sin(i * 47.3 + 1) * 0.5 + 0.5) * 700;
    const tw = 0.5 + 0.5 * Math.sin(frame / 9 + i);
    return <circle key={i} cx={x} cy={y} r={i % 7 === 0 ? 2.2 : 1.3} fill="#fff" opacity={(pal.stars ?? 0) * tw * (1 - y / 800)} />;
  });
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id={`sky${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={pal.sky[0]} />
          <stop offset="0.45" stopColor={pal.sky[1]} />
          <stop offset="0.62" stopColor={pal.sky[2]} />
        </linearGradient>
        <radialGradient id={`sunglow${uid}`}>
          <stop offset="0" stopColor={pal.sun.glow} stopOpacity="0.9" />
          <stop offset="0.35" stopColor={pal.sun.glow} stopOpacity="0.35" />
          <stop offset="1" stopColor={pal.sun.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`mist${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={pal.mist} stopOpacity="0" />
          <stop offset="0.6" stopColor={pal.mist} stopOpacity="0.45" />
          <stop offset="1" stopColor={pal.mist} stopOpacity="0" />
        </linearGradient>
        <filter id={`soft${uid}`}><feGaussianBlur stdDeviation="18" /></filter>
      </defs>
      <rect width={W} height={H} fill={`url(#sky${uid})`} />
      {stars}
      <g transform={`translate(${W / 2},${H / 2}) scale(${zoom}) translate(${-W / 2},${-H / 2})`}>
        <g transform={`translate(${-camX * 0.05},${camY * 0.05})`}>
          <circle cx={pal.sun.x} cy={pal.sun.y} r={pal.sun.r * 6} fill={`url(#sunglow${uid})`} />
          <circle cx={pal.sun.x} cy={pal.sun.y} r={pal.sun.r} fill={pal.sun.color} />
        </g>
        {pal.layers.map((col, i) => (
          <g key={i} transform={`translate(${-camX * par[i]},${camY * par[i]})`}>
            {i > 0 && i < 4 && (
              <rect x={-400} y={bases[i - 1] - 120} width={W + 800} height={260} fill={`url(#mist${uid})`} filter={`url(#soft${uid})`} />
            )}
            <path d={ridgePath(11 + i * 5, W, H, bases[i], amps[i], scales[i], camX * par[i] * 0, i === 0 ? 120 : 0)} fill={col} />
            {i === 3 && children}
          </g>
        ))}
        {foreground}
      </g>
      {dim > 0 && <rect width={W} height={H} fill="#000" opacity={dim} />}
    </svg>
  );
};

export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.09 }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <filter id="grainf">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 12} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="1080" height="1920" filter="url(#grainf)" opacity={opacity * 4} />
    </svg>
  );
};

export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.55 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: `radial-gradient(ellipse 75% 60% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,${strength}) 100%)`,
      pointerEvents: "none",
    }}
  />
);
