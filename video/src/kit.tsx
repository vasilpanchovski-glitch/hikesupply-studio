// Shared scene pieces for the series (taken from V01 so every video looks the same).
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { at, C, FPS, outExpo } from "./lib";
import { SANS } from "./Type";

export const HEAD = "Barlow Condensed";
export const useT = () => useCurrentFrame() / FPS;

export const Scene: React.FC<{ from: number; to: number; children: React.ReactNode; fadeIn?: number; fadeOut?: number }> = ({
  from,
  to,
  children,
  fadeIn = 0.25,
  fadeOut = 0.25,
}) => {
  const f0 = Math.round(from * FPS);
  const f1 = Math.round(to * FPS);
  return (
    <Sequence from={f0} durationInFrames={f1 - f0} layout="absolute-fill">
      <Fade dur={to - from} fadeIn={fadeIn} fadeOut={fadeOut}>
        {children}
      </Fade>
    </Sequence>
  );
};
const Fade: React.FC<{ dur: number; fadeIn: number; fadeOut: number; children: React.ReactNode }> = ({ dur, fadeIn, fadeOut, children }) => {
  const t = useT();
  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(fadeIn ? at(t, [0, fadeIn], [0, 1]) : 1, fadeOut ? at(t, [dur - fadeOut, dur], [1, 0]) : 1),
        scale: `${fadeIn ? at(t, [0, fadeIn + 0.35], [1.05, 1]) : 1}`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Hook / section headline. With t0 <= 0 it is fully on screen at frame 0.
export const Title: React.FC<{ text: string; t: number; t0: number; t1?: number; top?: number; size?: number }> = ({ text, t, t0, t1 = 999, top = 200, size = 132 }) => {
  const lines = text.split("\n");
  return (
    <div style={{ position: "absolute", top, left: 80, right: 80, opacity: at(t, [t1 - 0.3, t1], [1, 0]) }}>
      {lines.map((l, i) => {
        const s = t0 + i * 0.12;
        return (
          <div key={i} style={{ overflow: "hidden", lineHeight: 0.98 }}>
            <div
              style={{
                fontFamily: HEAD,
                fontWeight: 800,
                fontSize: size,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "#fff",
                textShadow: "0 6px 30px rgba(0,0,0,0.35)",
                translate: `0px ${t0 <= 0 ? 0 : at(t, [s, s + 0.5], [size, 0], outExpo)}px`,
              }}
            >
              {l}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Chip: React.FC<{ text: string; t: number; t0: number; t1?: number; x: number; y: number; icon?: "x" | "check" | "none"; big?: boolean }> = ({
  text,
  t,
  t0,
  t1 = 999,
  x,
  y,
  icon = "none",
  big,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: big ? "16px 30px" : "12px 24px",
      borderRadius: 16,
      background: "#fff",
      boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
      fontFamily: HEAD,
      fontWeight: 700,
      fontSize: big ? 56 : 44,
      letterSpacing: 1,
      textTransform: "uppercase",
      color: C.ink,
      whiteSpace: "nowrap",
      opacity: Math.min(at(t, [t0, t0 + 0.2], [0, 1]), at(t, [t1 - 0.2, t1], [1, 0])),
      scale: `${at(t, [t0, t0 + 0.35], [0.85, 1], outExpo)}`,
      transformOrigin: "left center",
    }}
  >
    {icon === "x" && <Dot ok={false} />}
    {icon === "check" && <Dot ok />}
    {text}
  </div>
);

export const Dot: React.FC<{ ok: boolean; size?: number }> = ({ ok, size = 40 }) => (
  <span
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      background: ok ? "#3E8E5A" : "#D9443A",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: SANS,
      fontSize: size * 0.6,
      fontWeight: 800,
      flexShrink: 0,
    }}
  >
    {ok ? "✓" : "✕"}
  </span>
);

// Readout card in the style of V01's elbow-angle card.
export const Readout: React.FC<{ label: string; value: string; ok: boolean | null; t: number; t0: number; t1?: number; x: number; y: number; pulseAt?: number }> = ({
  label,
  value,
  ok,
  t,
  t0,
  t1 = 999,
  x,
  y,
  pulseAt,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      padding: "18px 30px 22px",
      borderRadius: 22,
      background: "#fff",
      boxShadow: "0 14px 40px rgba(0,0,0,0.25)",
      opacity: at(t, [t0, t0 + 0.3], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]),
      scale: `${pulseAt !== undefined && t > pulseAt ? at(t, [pulseAt, pulseAt + 0.3], [1.12, 1]) : 1}`,
    }}
  >
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, letterSpacing: 3, color: "#6b6b66" }}>{label}</div>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 110, lineHeight: 1, color: ok === true ? "#3E8E5A" : ok === false ? "#D9443A" : C.ink }}>{value}</div>
      {ok !== null && <Dot ok={ok} size={54} />}
    </div>
  </div>
);

export const Pine: React.FC<{ x: number; y: number; h: number; c: string; c2: string }> = ({ x, y, h, c, c2 }) => (
  <g>
    <rect x={x - h * 0.03} y={y - h * 0.15} width={h * 0.06} height={h * 0.18} fill="#4a3a2c" />
    {[0, 1, 2, 3].map((i) => {
      const w = h * (0.42 - i * 0.08);
      const yy = y - h * 0.12 - i * h * 0.21;
      return (
        <g key={i}>
          <path d={`M${x - w},${yy} L${x},${yy - h * 0.34} L${x + w},${yy} Z`} fill={c} />
          <path d={`M${x},${yy - h * 0.34} L${x + w},${yy} L${x},${yy} Z`} fill={c2} />
        </g>
      );
    })}
  </g>
);

// Round-crowned deciduous tree for fall scenes.
export const LeafTree: React.FC<{ x: number; y: number; h: number; c: string; c2: string; trunk?: string }> = ({ x, y, h, c, c2, trunk = "#5a4030" }) => (
  <g>
    <path d={`M${x - h * 0.035},${y} L${x - h * 0.02},${y - h * 0.55} L${x + h * 0.02},${y - h * 0.55} L${x + h * 0.035},${y} Z`} fill={trunk} />
    <circle cx={x} cy={y - h * 0.68} r={h * 0.27} fill={c} />
    <circle cx={x - h * 0.17} cy={y - h * 0.55} r={h * 0.18} fill={c} />
    <circle cx={x + h * 0.18} cy={y - h * 0.57} r={h * 0.19} fill={c2} />
    <circle cx={x + h * 0.06} cy={y - h * 0.84} r={h * 0.16} fill={c2} opacity={0.85} />
  </g>
);

// Simple side-view car, facing right. y = ground.
export const Car: React.FC<{ x: number; y: number; s?: number; body: string; shade: string; flip?: boolean; lights?: boolean }> = ({ x, y, s = 1, body, shade, flip, lights }) => (
  <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
    <ellipse cx={0} cy={2} rx={130} ry={10} fill="rgba(0,0,0,0.22)" />
    <path d="M-125,-30 L-125,-62 Q-122,-74 -105,-76 L-70,-78 L-40,-118 Q-34,-124 -24,-124 L50,-124 Q60,-124 66,-116 L92,-80 L118,-74 Q130,-70 130,-58 L130,-30 Z" fill={body} />
    <path d="M-125,-30 L130,-30 L130,-48 L-125,-48 Z" fill={shade} />
    <path d="M-30,-112 L-4,-112 L-4,-82 L-58,-82 Z" fill="#cfe3ee" />
    <path d="M6,-112 L48,-112 Q54,-112 58,-106 L76,-82 L6,-82 Z" fill="#cfe3ee" />
    <rect x={118} y={-68} width={12} height={10} rx={3} fill={lights ? "#fff6c8" : "#f1e5b8"} />
    <rect x={-125} y={-68} width={10} height={12} rx={3} fill="#d9443a" />
    {[-72, 78].map((wx) => (
      <g key={wx}>
        <circle cx={wx} cy={-22} r={24} fill="#1f2222" />
        <circle cx={wx} cy={-22} r={11} fill="#9aa3a6" />
      </g>
    ))}
  </g>
);

export const Scrim: React.FC<{ h?: number }> = ({ h = 760 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h, background: "linear-gradient(180deg, rgba(12,22,28,0.42) 0%, rgba(12,22,28,0.18) 55%, rgba(12,22,28,0) 100%)" }} />
);

// End card shell: forest background, brand line, product art slot, name, price chip, save bar, url.
export const EndCard: React.FC<{ lt: number; art: React.ReactNode; spec: string; name: React.ReactNode; nameSize?: number; price: string; save: string; shadowY?: number }> = ({
  lt,
  shadowY = 1000,
  art,
  spec,
  name,
  nameSize = 112,
  price,
  save,
}) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse 90% 70% at 50% 42%, #3a5244 0%, ${C.forestDeep} 78%)` }}>
    <div style={{ position: "absolute", top: 130, left: 0, right: 0, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 44, letterSpacing: 10, color: C.stone, opacity: at(lt, [0, 0.4], [0, 1]) }}>
      HIKESUPPLY CO.
    </div>
    <svg width={1080} height={1100} style={{ position: "absolute", top: 220 }}>
      <ellipse cx={540} cy={shadowY} rx={360} ry={26} fill="rgba(0,0,0,0.25)" />
      {art}
    </svg>
    <div style={{ position: "absolute", top: 1170, left: 80, right: 80, opacity: at(lt, [0.6, 1.0], [0, 1]), translate: `0px ${at(lt, [0.6, 1.1], [30, 0])}px` }}>
      <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 34, letterSpacing: 4, color: C.sage }}>{spec}</div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 8, gap: 20 }}>
        <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: nameSize, lineHeight: 0.92, color: C.stone, textTransform: "uppercase" }}>{name}</div>
        <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 76, color: C.forestDeep, background: C.stone, padding: "4px 24px", borderRadius: 14, flexShrink: 0 }}>{price}</div>
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        top: 1520,
        left: 80,
        right: 80,
        display: "flex",
        alignItems: "center",
        gap: 26,
        padding: "28px 34px",
        borderRadius: 24,
        background: C.stone,
        opacity: at(lt, [0.1, 0.4], [0, 1]),
      }}
    >
      <svg width={50} height={64} viewBox="0 0 56 70" style={{ scale: `${at(lt, [0.15, 0.5], [0.4, 1], outExpo)}`, flexShrink: 0 }}>
        <path d="M6,4 H50 V66 L28,50 L6,66 Z" fill={lt > 0.5 ? C.forest : "none"} stroke={C.forest} strokeWidth={5} strokeLinejoin="round" />
      </svg>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: C.forestDeep, textTransform: "uppercase", lineHeight: 1 }}>{save}</div>
    </div>
    <div style={{ position: "absolute", top: 1730, left: 0, right: 0, textAlign: "center", fontFamily: SANS, fontWeight: 600, fontSize: 34, letterSpacing: 1, color: "rgba(245,241,234,0.75)", opacity: at(lt, [1.2, 1.6], [0, 1]) }}>
      hikesupplyco.com
    </div>
  </AbsoluteFill>
);

// Arms hanging relaxed (no poles): near-hand position in local hiker units, swinging with the walk.
export const freeHand = (phase: number, walk: number): [number, number] => [18 + Math.sin(phase) * 30 * walk, 36 - Math.abs(Math.sin(phase)) * 6 * walk];
