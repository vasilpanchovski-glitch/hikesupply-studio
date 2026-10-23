// Cinematic layer kit for the illustrated series: depth layers with blur (depth of field),
// camera moves with parallax, sun rays, bloom, floating particles, foreground framing and a colour grade.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fbm, FPS, ridgePath } from "./lib";

export type Cam = { x: number; y: number; zoom: number; rot?: number };

// One depth plane. depth 0 = infinitely far (does not move), 1 = subject plane, >1 = foreground (moves faster).
export const Plane: React.FC<{ cam: Cam; depth: number; blur?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ cam, depth, blur = 0, children, style }) => {
  const z = 1 + (cam.zoom - 1) * depth;
  return (
    <AbsoluteFill
      style={{
        transform: `translate(${-cam.x * depth}px, ${-cam.y * depth}px) scale(${z}) rotate(${(cam.rot ?? 0) * depth}deg)`,
        transformOrigin: "50% 55%",
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const Svg: React.FC<{ children: React.ReactNode; w?: number; h?: number }> = ({ children, w = 1080, h = 1920 }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
    {children}
  </svg>
);

export type Sky = { top: string; mid: string; low: string; sun: [number, number]; sunR: number; sunCol: string; glow: string };

export const SkyPlane: React.FC<{ sky: Sky; uid: string }> = ({ sky, uid }) => (
  <Svg>
    <defs>
      <linearGradient id={`sk${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={sky.top} />
        <stop offset="0.5" stopColor={sky.mid} />
        <stop offset="0.8" stopColor={sky.low} />
      </linearGradient>
      <radialGradient id={`gl${uid}`}>
        <stop offset="0" stopColor={sky.glow} stopOpacity="0.95" />
        <stop offset="0.3" stopColor={sky.glow} stopOpacity="0.35" />
        <stop offset="1" stopColor={sky.glow} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect x={-400} y={-400} width={1880} height={2720} fill={`url(#sk${uid})`} />
    <circle cx={sky.sun[0]} cy={sky.sun[1]} r={sky.sunR * 9} fill={`url(#gl${uid})`} />
    <circle cx={sky.sun[0]} cy={sky.sun[1]} r={sky.sunR} fill={sky.sunCol} />
  </Svg>
);

// Soft painterly clouds.
export const Clouds: React.FC<{ y: number; col: string; seed: number; drift?: number; opacity?: number }> = ({ y, col, seed, drift = 0, opacity = 0.7 }) => (
  <Svg>
    {Array.from({ length: 6 }, (_, i) => {
      const x = ((((i * 290 + seed * 97 + drift) % 1800) + 1800) % 1800) - 360;
      const yy = y + Math.sin(i * 2.1 + seed) * 70;
      const w = 220 + (i % 3) * 90;
      return (
        <g key={i} opacity={opacity}>
          <ellipse cx={x} cy={yy} rx={w} ry={w * 0.22} fill={col} />
          <ellipse cx={x + w * 0.3} cy={yy - w * 0.12} rx={w * 0.5} ry={w * 0.2} fill={col} />
        </g>
      );
    })}
  </Svg>
);

// A mountain ridge silhouette with a lighter sunlit edge.
export const Ridge: React.FC<{ seed: number; base: number; amp: number; scale: number; col: string; lit?: string; peak?: number }> = ({ seed, base, amp, scale, col, lit, peak = 0 }) => {
  const d = ridgePath(seed, 1080, 2400, base, amp, scale, 0, peak);
  return (
    <Svg>
      <path d={d} fill={col} />
      {lit && <path d={d} fill="none" stroke={lit} strokeWidth={5} opacity={0.6} />}
    </Svg>
  );
};

// Haze band between depth planes (atmospheric perspective).
export const Haze: React.FC<{ y: number; h: number; col: string; opacity?: number }> = ({ y, h, col, opacity = 0.6 }) => (
  <div style={{ position: "absolute", left: -300, right: -300, top: y, height: h, background: `linear-gradient(180deg, transparent, ${col} 50%, transparent)`, opacity }} />
);

// Volumetric sun rays, screen-blended.
export const Rays: React.FC<{ x: number; y: number; col?: string; strength?: number; spin?: number }> = ({ x, y, col = "255,236,190", strength = 0.22, spin = 0 }) => {
  const f = useCurrentFrame();
  const a0 = spin + f * 0.04;
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
      <Svg>
        <defs>
          <radialGradient id="rayfade" cx={x / 1080} cy={y / 1920} r="1">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.7" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="raymask">
            <rect width={1080} height={1920} fill="url(#rayfade)" />
          </mask>
          <filter id="raysoft">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <g mask="url(#raymask)" filter="url(#raysoft)">
          {Array.from({ length: 14 }, (_, i) => {
            const a = ((a0 + i * 25.7 + Math.sin(i * 3.3) * 8) * Math.PI) / 180;
            const w = 0.035 + (i % 3) * 0.02;
            const L = 2600;
            const p1 = [x + Math.cos(a - w) * L, y + Math.sin(a - w) * L];
            const p2 = [x + Math.cos(a + w) * L, y + Math.sin(a + w) * L];
            return <path key={i} d={`M${x},${y} L${p1[0]},${p1[1]} L${p2[0]},${p2[1]} Z`} fill={`rgba(${col},${strength * (0.6 + 0.4 * Math.sin(f / 20 + i))})`} />;
          })}
        </g>
      </Svg>
    </AbsoluteFill>
  );
};

// Floating particles: sharp dust motes plus big out-of-focus bokeh.
export const Particles: React.FC<{ n?: number; col?: string; seed?: number; bokeh?: boolean; fall?: number; leaves?: string[] }> = ({ n = 26, col = "#fff3d6", seed = 1, bokeh = true, fall = 30, leaves }) => {
  const t = useCurrentFrame() / FPS;
  return (
    <Svg>
      <defs>
        <filter id={`bk${seed}`}>
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      {Array.from({ length: n }, (_, i) => {
        const r0 = fbm(i * 1.7, seed);
        const x = ((((r0 * 1400 + Math.sin(t * 0.6 + i) * 40 + t * 18) % 1300) + 1300) % 1300) - 110;
        const y = ((((fbm(i * 2.3, seed + 3) * 2200 + t * fall * (0.5 + (i % 3) * 0.4)) % 2100) + 2100) % 2100) - 90;
        const big = bokeh && i % 5 === 0;
        if (leaves && i % 2 === 0) {
          const rot = t * 90 * (i % 2 ? 1 : -1) + i * 40;
          return <path key={i} d="M0,-12 Q10,0 0,12 Q-10,0 0,-12 Z" fill={leaves[i % leaves.length]} transform={`translate(${x},${y}) rotate(${rot}) scale(${1.2 + (i % 3) * 0.5})`} opacity={0.9} />;
        }
        return big ? (
          <circle key={i} cx={x} cy={y} r={26 + (i % 4) * 10} fill={col} opacity={0.18} filter={`url(#bk${seed})`} />
        ) : (
          <circle key={i} cx={x} cy={y} r={1.6 + (i % 3)} fill={col} opacity={0.55 + 0.3 * Math.sin(t * 2 + i)} />
        );
      })}
    </Svg>
  );
};

// Dark out-of-focus leaves framing the shot from the edges (foreground plane).
export const FrameLeaves: React.FC<{ col?: string; side?: "left" | "right" | "both"; top?: number; sway?: number }> = ({ col = "#2a2a1a", side = "both", top = 0, sway = 0 }) => {
  const t = useCurrentFrame() / FPS;
  const s = Math.sin(t * 1.3) * 6 + sway;
  const cluster = (cx: number, cy: number, flip: number, k: number) => (
    <g transform={`translate(${cx},${cy}) rotate(${s * flip}) scale(${flip},1)`} key={k}>
      {Array.from({ length: 9 }, (_, i) => {
        const a = -40 + i * 14;
        const L = 140 + (i % 3) * 60;
        return (
          <path
            key={i}
            d={`M0,0 Q${L * 0.4},${-30} ${L},0 Q${L * 0.4},${30} 0,0 Z`}
            transform={`rotate(${a}) translate(${40 + (i % 2) * 50},0)`}
            fill={col}
          />
        );
      })}
    </g>
  );
  return (
    <Svg>
      {(side === "left" || side === "both") && [cluster(-60, 300 + top, 1, 1), cluster(-90, 1550 + top, 1, 2)]}
      {(side === "right" || side === "both") && [cluster(1140, 520 + top, -1, 3), cluster(1170, 1720 + top, -1, 4)]}
    </Svg>
  );
};

// Colour grade: warm highlights from the sun side, cool shadows, light bloom, film grain and vignette.
export const Grade: React.FC<{ warm?: string; cool?: string; sunX?: number; sunY?: number; vignette?: number; grain?: number }> = ({
  warm = "255,190,120",
  cool = "30,60,80",
  sunX = 800,
  sunY = 500,
  vignette = 0.5,
  grain = 0.05,
}) => {
  const f = useCurrentFrame();
  return (
    <>
      <AbsoluteFill style={{ mixBlendMode: "soft-light", background: `linear-gradient(180deg, rgba(${warm},0.35) 0%, rgba(${cool},0.4) 100%)` }} />
      <AbsoluteFill style={{ mixBlendMode: "screen", background: `radial-gradient(circle at ${sunX}px ${sunY}px, rgba(${warm},0.38) 0%, rgba(${warm},0.1) 25%, rgba(0,0,0,0) 55%)` }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 80% 65% at 50% 48%, rgba(0,0,0,0) 55%, rgba(0,0,0,${vignette}) 100%)` }} />
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, mixBlendMode: "overlay", pointerEvents: "none" }}>
        <filter id="cgrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 10} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width={1080} height={1920} filter="url(#cgrain)" opacity={grain * 4} />
      </svg>
    </>
  );
};

// Smooth handheld drift + optional shake impulse.
export const handheld = (t: number, amp = 1, shake = 0) => ({
  x: (fbm(t * 0.35, 5) - 0.5) * 24 * amp + (fbm(t * 9, 7) - 0.5) * 50 * shake,
  y: (fbm(t * 0.3, 9) - 0.5) * 18 * amp + (fbm(t * 9, 11) - 0.5) * 50 * shake,
  rot: (fbm(t * 0.25, 13) - 0.5) * 0.6 * amp + (fbm(t * 8, 17) - 0.5) * 3 * shake,
});

// Rim light: thin warm edge on the side facing the light, plus soft shadow on the other side.
export const rim = (dx: number, col = "rgba(255,214,150,0.85)") => `drop-shadow(${dx}px ${-Math.abs(dx) * 0.6}px 0 ${col}) drop-shadow(${-dx * 2}px 10px 18px rgba(0,0,0,0.35))`;
