// Indoor pieces for gift stories (v70, v71): room, window view, dresser drawer, sofa, coupon, plan page, mug.
import React from "react";
import { AbsoluteFill } from "remotion";
import { Pine } from "./kit";
import { Ridge, Sky, SkyPlane, Svg } from "./cine";

// A winter mountain view seen through a window, clipped to the window rectangle (screen coords before the plane transform).
export const WindowView: React.FC<{ x: number; y: number; w: number; h: number; sky: Sky; uid: string; snow?: boolean }> = ({ x, y, w, h, sky, uid, snow = true }) => (
  <AbsoluteFill style={{ clipPath: `inset(${y}px ${1080 - x - w}px ${1920 - y - h}px ${x}px)` }}>
    <SkyPlane sky={sky} uid={uid} />
    <div style={{ position: "absolute", inset: 0, filter: "blur(3px)" }}>
      <Ridge seed={41} base={y + h * 0.55} amp={h * 0.35} scale={160} col="#9fb0c0" lit={snow ? "#ffffff" : undefined} peak={60} />
    </div>
    <div style={{ position: "absolute", inset: 0, filter: "blur(2px)" }}>
      <Ridge seed={43} base={y + h * 0.75} amp={h * 0.2} scale={120} col="#5f7568" />
      <Svg>
        {Array.from({ length: 9 }, (_, i) => (
          <Pine key={i} x={x + i * (w / 8)} y={y + h + 10 - (i % 2) * 14} h={h * 0.32} c="#2f5446" c2="#24443a" />
        ))}
        {snow && <rect x={x} y={y + h - 26} width={w} height={30} fill="#eef2f4" />}
      </Svg>
    </div>
  </AbsoluteFill>
);

// Warm interior wall, floor and the window frame (draw WindowView before this).
export const Room: React.FC<{ floorY: number; win: [number, number, number, number]; wall?: string; floor?: string; lamp?: [number, number] }> = ({
  floorY,
  win,
  wall = "#d8c6a8",
  floor = "#8a6446",
  lamp,
}) => {
  const [x, y, w, h] = win;
  return (
    <Svg>
      <defs>
        <radialGradient id="lampglow">
          <stop offset="0" stopColor="#ffe2a8" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ffe2a8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={`M-400,-400 H1480 V${floorY} H-400 Z M${x},${y} V${y + h} H${x + w} V${y} Z`} fill={wall} fillRule="evenodd" />
      {lamp && <circle cx={lamp[0]} cy={lamp[1]} r={520} fill="url(#lampglow)" />}
      <rect x={x - 22} y={y - 22} width={w + 44} height={h + 44} fill="none" stroke="#f3ece0" strokeWidth={30} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="#f3ece0" strokeWidth={16} />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke="#f3ece0" strokeWidth={16} />
      <rect x={x - 50} y={y + h + 18} width={w + 100} height={22} rx={6} fill="#efe6d6" />
      <rect x={-400} y={floorY} width={1880} height={1400} fill={floor} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={-400} y1={floorY + 30 + i * i * 14} x2={1480} y2={floorY + 30 + i * i * 14} stroke="rgba(0,0,0,0.12)" strokeWidth={3} />
      ))}
      <rect x={-400} y={floorY - 26} width={1880} height={30} fill="#efe6d6" />
    </Svg>
  );
};

// A boxed hiking gadget (never opened): box with a simple compass-like icon on the front.
export const GadgetBox: React.FC<{ x: number; y: number; w: number; h: number; col: string; rot?: number; dust?: number }> = ({ x, y, w, h, col, rot = 0, dust = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot})`}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={6} fill={col} />
    <path d={`M${-w / 2},${-h} l${w * 0.18},${-h * 0.16} h${w} l${-w * 0.18},${h * 0.16} Z`} fill="rgba(255,255,255,0.35)" />
    <path d={`M${w / 2},${-h} l${w * 0.18},${-h * 0.16} v${h} l${-w * 0.18},${h * 0.16} Z`} fill="rgba(0,0,0,0.22)" />
    <rect x={-w * 0.36} y={-h * 0.82} width={w * 0.72} height={h * 0.56} rx={8} fill="#f5f1ea" opacity={0.9} />
    <circle cx={0} cy={-h * 0.54} r={Math.min(w, h) * 0.17} fill="none" stroke={col} strokeWidth={Math.max(3, w * 0.025)} />
    <path d={`M0,${-h * 0.54 - Math.min(w, h) * 0.13} L${w * 0.03},${-h * 0.54} L0,${-h * 0.54 + Math.min(w, h) * 0.13} L${-w * 0.03},${-h * 0.54} Z`} fill={col} />
    <rect x={-w * 0.3} y={-h * 0.18} width={w * 0.6} height={h * 0.05} rx={3} fill="rgba(255,255,255,0.7)" />
    {dust > 0 && <rect x={-w / 2} y={-h * 1.16} width={w * 1.18} height={h * 0.16} fill="#cfc6b8" opacity={dust * 0.5} />}
  </g>
);

// Dresser seen from the front with the top drawer pulled out; children drawn inside the drawer (clipped).
export const Dresser: React.FC<{ x: number; y: number; w: number; h: number; open: number; children?: React.ReactNode }> = ({ x, y, w, h, open, children }) => {
  const dh = h * 0.3;
  const dy = y + h * 0.08;
  const pull = open * dh * 0.9;
  return (
    <Svg>
      <defs>
        <clipPath id="drawerclip">
          <rect x={x + w * 0.05} y={dy - pull - dh * 0.9} width={w * 0.9} height={dh * 0.9 + pull + 4} />
        </clipPath>
      </defs>
      <rect x={x - 20} y={y - 30} width={w + 40} height={34} rx={6} fill="#6b4a33" />
      <rect x={x} y={y} width={w} height={h} fill="#7d573c" />
      {[1, 2].map((i) => (
        <g key={i}>
          <rect x={x + w * 0.05} y={y + h * 0.08 + i * h * 0.31} width={w * 0.9} height={dh * 0.86} rx={6} fill="#8c6446" stroke="#5e4029" strokeWidth={4} />
          <rect x={x + w * 0.42} y={y + h * 0.08 + i * h * 0.31 + dh * 0.36} width={w * 0.16} height={dh * 0.12} rx={6} fill="#c9a776" />
        </g>
      ))}
      {/* open drawer: inside, then contents, then the front panel lowered toward the viewer */}
      <rect x={x + w * 0.05} y={dy - pull - dh * 0.9} width={w * 0.9} height={dh * 0.9 + pull} fill="#4a3322" />
      <g clipPath="url(#drawerclip)">{children}</g>
      <rect x={x + w * 0.02} y={dy + pull * 0.1} width={w * 0.96} height={dh * 0.9} rx={6} fill="#94694a" stroke="#5e4029" strokeWidth={4} />
      <rect x={x + w * 0.42} y={dy + pull * 0.1 + dh * 0.36} width={w * 0.16} height={dh * 0.12} rx={6} fill="#c9a776" />
      <rect x={x + 10} y={y + h} width={w * 0.08} height={30} fill="#5e4029" />
      <rect x={x + w * 0.92 - 10} y={y + h} width={w * 0.08} height={30} fill="#5e4029" />
    </Svg>
  );
};

// Sofa back (draw behind the person) and front (draw in front of the person's legs).
export const SofaBack: React.FC<{ x: number; y: number; w: number; col: string; shade: string }> = ({ x, y, w, col, shade }) => (
  <Svg>
    <rect x={x} y={y - 330} width={w} height={340} rx={60} fill={shade} />
    <rect x={x + 30} y={y - 300} width={w * 0.45} height={280} rx={46} fill={col} />
    <rect x={x + w * 0.52} y={y - 300} width={w * 0.45 - 30} height={280} rx={46} fill={col} />
  </Svg>
);
export const SofaFront: React.FC<{ x: number; y: number; w: number; col: string; shade: string; floorY: number }> = ({ x, y, w, col, shade, floorY }) => (
  <Svg>
    <rect x={x + 40} y={y - 30} width={w - 80} height={70} rx={26} fill={col} />
    <rect x={x} y={y + 20} width={w} height={floorY - y - 40} rx={20} fill={shade} />
    <rect x={x - 40} y={y - 160} width={110} height={floorY - y + 120} rx={46} fill={col} />
    <rect x={x + w - 70} y={y - 160} width={110} height={floorY - y + 120} rx={46} fill={col} />
    <rect x={x + 20} y={floorY - 20} width={30} height={24} fill="#3a2a1c" />
    <rect x={x + w - 50} y={floorY - 20} width={30} height={24} fill="#3a2a1c" />
  </Svg>
);

// Pair of hiking boots standing on the floor (side view). s = scale.
export const Boots: React.FC<{ x: number; y: number; s?: number; col?: string }> = ({ x, y, s = 1, col = "#6b4a2e" }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {[0, 70].map((dx, i) => (
      <g key={i} transform={`translate(${dx},${-i * 6})`}>
        <path d="M0,0 L0,-110 Q0,-130 22,-130 L70,-130 Q86,-130 86,-112 L86,-60 Q130,-50 150,-30 Q160,-14 158,0 Z" fill={col} />
        <path d="M14,-122 L70,-122" stroke="#d8b46a" strokeWidth={6} />
        {[-100, -82, -64].map((yy) => (
          <path key={yy} d={`M30,${yy} l40,-4`} stroke="#e9d9b0" strokeWidth={5} strokeLinecap="round" />
        ))}
        <rect x={-4} y={-8} width={166} height={14} rx={6} fill="#2a2018" />
      </g>
    ))}
  </g>
);

// Mug with optional steam.
export const Mug: React.FC<{ x: number; y: number; s?: number; t: number; col?: string }> = ({ x, y, s = 1, t, col = "#B83A55" }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M60,-90 q46,0 46,40 q0,40 -46,40" stroke={col} strokeWidth={14} fill="none" />
    <rect x={-60} y={-110} width={124} height={110} rx={18} fill={col} />
    <ellipse cx={2} cy={-108} rx={58} ry={12} fill="#5a3222" />
    {[0, 1, 2].map((i) => {
      const k = (t * 0.5 + i / 3) % 1;
      return <path key={i} d={`M${-24 + i * 24},${-124 - k * 90} q14,-20 0,-40 q-14,-20 0,-40`} stroke="#ffffff" strokeWidth={8} fill="none" opacity={0.5 * (1 - k)} strokeLinecap="round" />;
    })}
  </g>
);

// A write-in coupon card. lines appear one by one as k goes 0..lines.length (handwritten feel).
export const Coupon: React.FC<{ x: number; y: number; w: number; rot?: number; title: string; lines: string[]; k: number; col?: string }> = ({ x, y, w, rot = 0, title, lines, k, col = "#2C3B2E" }) => {
  const h = w * 0.62;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <rect x={-w / 2 + 10} y={-h / 2 + 16} width={w} height={h} rx={20} fill="rgba(0,0,0,0.25)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={20} fill="#f7f2e8" />
      <rect x={-w / 2 + 18} y={-h / 2 + 18} width={w - 36} height={h - 36} rx={12} fill="none" stroke={col} strokeWidth={4} strokeDasharray="14 10" />
      <rect x={-w / 2 + 18} y={-h / 2 + 18} width={w - 36} height={h * 0.2} rx={12} fill={col} />
      <text x={0} y={-h / 2 + 18 + h * 0.145} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={w * 0.075} fill="#f7f2e8" letterSpacing={3}>
        {title}
      </text>
      {lines.map((l, i) => {
        const v = Math.max(0, Math.min(1, k - i));
        const yy = -h / 2 + h * 0.4 + i * h * 0.17;
        return (
          <g key={i}>
            <line x1={-w / 2 + 60} y1={yy + 12} x2={w / 2 - 60} y2={yy + 12} stroke="#c8bfae" strokeWidth={3} />
            <clipPath id={`cl${i}${Math.round(x)}`}>
              <rect x={-w / 2 + 60} y={yy - h * 0.15} width={(w - 120) * v} height={h * 0.2} />
            </clipPath>
            <text x={-w / 2 + 64} y={yy} fontFamily="Barlow Condensed" fontWeight={700} fontSize={w * 0.068} fill="#2a3a8a" clipPath={`url(#cl${i}${Math.round(x)})`}>
              {l}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// Plan-the-hike page: rows tick one by one from t0, 0.6 s apart.
export const PlanPage: React.FC<{ x: number; y: number; w: number; rows: [string, string][]; t: number; t0: number; gap?: number }> = ({ x, y, w, rows, t, t0, gap = 0.6 }) => {
  const h = 260 + rows.length * 180;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={14} y={20} width={w} height={h} rx={18} fill="rgba(0,0,0,0.25)" />
      <rect x={0} y={0} width={w} height={h} rx={18} fill="#f7f2e8" />
      <text x={56} y={120} fontFamily="Barlow Condensed" fontWeight={800} fontSize={76} fill="#2C3B2E" letterSpacing={2}>
        PLAN THE HIKE
      </text>
      <line x1={56} y1={150} x2={w - 56} y2={150} stroke="#2C3B2E" strokeWidth={4} />
      {rows.map(([a, b], i) => {
        const k = Math.max(0, Math.min(1, (t - t0 - i * gap) / 0.35));
        const yy = 250 + i * 180;
        return (
          <g key={i}>
            <rect x={56} y={yy - 50} width={64} height={64} rx={12} fill="none" stroke="#2C3B2E" strokeWidth={5} />
            <path d={`M70,${yy - 18} l16,18 l28,-40`} stroke="#3e7d4f" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="80" strokeDashoffset={80 * (1 - k)} />
            <text x={150} y={yy - 8} fontFamily="Inter" fontWeight={600} fontSize={40} fill="#5b625c">
              {a}
            </text>
            <text x={150} y={yy + 52} fontFamily="Barlow Condensed" fontWeight={700} fontSize={58} fill="#2a3a8a" opacity={k}>
              {b}
            </text>
            <line x1={150} y1={yy + 66} x2={w - 56} y2={yy + 66} stroke="#d8d0c0" strokeWidth={3} />
          </g>
        );
      })}
    </g>
  );
};
