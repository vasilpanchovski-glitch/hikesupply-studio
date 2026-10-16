import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { hikerGeometry, hikerTransform, HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, FPS, inOut, mix, outExpo } from "../lib";
import { Captions, SANS, Word, isClean } from "../Type";
import vo from "../vo/v01.json";

const words = vo.words as unknown as Word[];
const useT = () => useCurrentFrame() / FPS;
const HEAD = "Barlow Condensed";

const MORNING: Palette = {
  sky: ["#6f9cc0", "#b9cfd8", "#f1dfbf"],
  sun: { x: 820, y: 640, r: 60, color: "#fff6e0", glow: "#ffe2a8" },
  layers: ["#a9bccb", "#8aa3b3", "#6f8f8a", "#557868", "#3f604f"],
  mist: "#f3ead8",
};
const SUMMIT: Palette = {
  sky: ["#4f7fae", "#f0c48c", "#ffe7bb"],
  sun: { x: 760, y: 860, r: 90, color: "#fff7df", glow: "#ffcf86" },
  layers: ["#d8b291", "#b88d74", "#8a6c5f", "#5d4c46", "#3b3230"],
  mist: "#ffe6c2",
};

const PALE: Outfit[] = [
  { ...GUIDE, jacket: "#3D6E8F", jacketShade: "#2C5470", pack: "#D4A23B", packShade: "#A87E26", cap: "#E8E2D4", capShade: "#c9c1ae", hair: "#2b1d16", beard: null, skin: "#F0C2A2", skinShade: "#D5A283" },
  { ...GUIDE, jacket: "#7A4E8A", jacketShade: "#5D3A6B", pack: "#3E5F4B", packShade: "#2E4A39", cap: "#2F3B45", hair: "#6b3f22", beard: null, skin: "#8F5B3E", skinShade: "#734631" },
];

const Scene: React.FC<{ from: number; to: number; children: React.ReactNode; fadeIn?: number; fadeOut?: number }> = ({
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

const Title: React.FC<{ text: string; t: number; t0: number; t1?: number; top?: number; size?: number; color?: string }> = ({
  text,
  t,
  t0,
  t1 = 999,
  top = 200,
  size = 132,
  color = "#fff",
}) => {
  const lines = text.split("\n");
  if (isClean()) return null;
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
                color,
                textShadow: color === "#fff" ? "0 6px 30px rgba(0,0,0,0.35)" : "none",
                translate: `0px ${at(t, [s, s + 0.5], [size, 0], outExpo)}px`,
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

const Chip: React.FC<{ text: string; t: number; t0: number; t1?: number; x: number; y: number; icon?: "x" | "check" | "none"; big?: boolean }> = ({
  text,
  t,
  t0,
  t1 = 999,
  x,
  y,
  icon = "none",
  big,
}) => isClean() ? null : (
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
      opacity: Math.min(at(t, [t0, t0 + 0.2], [0, 1]), at(t, [t1 - 0.2, t1], [1, 0])),
      scale: `${at(t, [t0, t0 + 0.35], [0.85, 1], outExpo)}`,
      transformOrigin: "left center",
    }}
  >
    {icon === "x" && (
      <span style={{ width: 40, height: 40, borderRadius: 20, background: "#D9443A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontSize: 24, fontWeight: 800 }}>✕</span>
    )}
    {icon === "check" && (
      <span style={{ width: 40, height: 40, borderRadius: 20, background: "#3E8E5A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontSize: 24, fontWeight: 800 }}>✓</span>
    )}
    {text}
  </div>
);

const Pine: React.FC<{ x: number; y: number; h: number; c: string; c2: string }> = ({ x, y, h, c, c2 }) => (
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

const Drops: React.FC<{ g: ReturnType<typeof hikerGeometry>; tr: string; t: number; on: number }> = ({ g, tr, t, on }) => (
  <g transform={tr} opacity={on}>
    {[0, 1, 2].map((i) => {
      const k = ((t * 0.9 + i * 0.33) % 1 + 1) % 1;
      const x = g.head[0] + 30 + i * 6;
      const y = g.head[1] - 10 + k * 40;
      return <path key={i} d={`M${x},${y - 8} Q${x + 5},${y} ${x},${y + 4} Q${x - 5},${y} ${x},${y - 8} Z`} fill="#8fd0ff" opacity={1 - k} />;
    })}
  </g>
);

const Scrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 760, background: "linear-gradient(180deg, rgba(12,22,28,0.42) 0%, rgba(12,22,28,0.18) 55%, rgba(12,22,28,0) 100%)" }} />
);

// ============ S1 HOOK ============
const S1: React.FC = () => {
  const t = useT();
  const k = 0.22;
  const sl = Math.atan(k);
  const gy = (x: number) => 1760 - (x + 100) * k;
  const ground = `M-300,2200 L-300,${gy(-300)} L1500,${gy(1500)} L1500,2200 Z`;
  const trail = `M-300,${gy(-300) + 30} L1500,${gy(1500) + 30} L1500,${gy(1500) + 120} L-300,${gy(-300) + 120} Z`;
  const jx = 330;
  const jake: HikerProps = { x: jx, y: gy(jx) + 70, scale: 1.45, phase: t * 4.2, walk: 0.7, lean: 0.34, poleLen: 300, slope: sl * 0.75 };
  const g = hikerGeometry(jake);
  const energy = at(t, [2.7, 5.3], [0.72, 0.12], inOut);
  return (
    <AbsoluteFill>
      <Landscape
        uid="b1"
        pal={MORNING}
        camX={t * 28}
        zoom={mix(1.03, 1.1, t / 5.6)}
        foreground={
          <g>
            {[ -40, 120, 980, 1100].map((x, i) => (
              <Pine key={i} x={x - t * 10} y={gy(x) + 10} h={380 + (i % 2) * 80} c="#2f5a43" c2="#254a37" />
            ))}
            <path d={ground} fill="#5f8a4f" />
            <path d={trail} fill="#b99a72" />
            {Array.from({ length: 14 }, (_, i) => {
              const x = -100 + i * 95;
              return <path key={i} d={`M${x},${gy(x) + 8} l8,-22 l6,20 l7,-16 l5,18 Z`} fill="#4d7a40" />;
            })}
            {[0, 1].map((i) => {
              const x = 780 + i * 160 + t * 24;
              return <Person key={i} x={x} y={gy(x) + 70} scale={1.0 - i * 0.07} phase={t * 5 + i} walk={1} lean={0.2} poleLen={240} slope={sl * 0.75} outfit={PALE[i]} expression="happy" />;
            })}
            <Person {...jake} expression="tired" />
            <Drops g={g} tr={hikerTransform(jake)} t={t} on={at(t, [2.6, 3.0], [0, 1])} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim />
      <Title text={"Every climb,\nhe blamed\nhis legs."} t={t} t0={0.0} top={190} size={150} />
      <div style={{ position: "absolute", top: 700, left: 80, opacity: at(t, [2.6, 3.0], [0, 1]) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 22px", borderRadius: 16, background: "rgba(255,255,255,0.92)", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 34, letterSpacing: 2, color: C.ink }}>ENERGY</div>
          <div style={{ width: 260, height: 16, borderRadius: 8, background: "#e3e0d8", overflow: "hidden" }}>
            <div style={{ width: 260 * energy, height: 16, background: energy < 0.3 ? "#D9443A" : "#E8A33D" }} />
          </div>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 34, color: C.ink, width: 70 }}>{Math.round(energy * 100)}%</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ S2+S3 TRAILHEAD (5.5 - 18.7) ============
const Trailhead: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const groundY = 1640;
  const handChin: [number, number] = [74, -150];
  const hand90: [number, number] = [75, -47];
  const k = at(t, [15.3, 16.9], [0, 1], inOut);
  const hand: [number, number] = [mix(handChin[0], hand90[0], k), mix(handChin[1], hand90[1], k)];
  const jake: HikerProps = { x: 400, y: groundY, scale: 1.9, walk: 0, lean: 0.06, breathe: Math.sin(t * 2.2) * 2, handOverride: hand };
  const g = hikerGeometry(jake);
  const tr = hikerTransform(jake);
  // camera: push in on fix
  const zoom = mix(1.0, 1.04, at(t, [5.5, 12], [0, 1])) * mix(1, 1.32, at(t, [12.0, 13.2], [0, 1], inOut));
  const focusY = mix(0, 140, at(t, [12.0, 13.2], [0, 1], inOut));
  const a = g.arms[1];
  const v1 = [a.s[0] - a.elbow[0], a.s[1] - a.elbow[1]];
  const v2 = [a.hand[0] - a.elbow[0], a.hand[1] - a.elbow[1]];
  const a1 = Math.atan2(v1[1], v1[0]);
  const a2 = Math.atan2(v2[1], v2[0]);
  let d = a2 - a1;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  const R = 30;
  const good = t > 16.85;
  const arcOn = at(t, [14.9, 15.2], [0, 1]);
  const annOn = at(t, [9.3, 9.6], [0, 1]) * at(t, [12.0, 12.3], [1, 0]);
  return (
    <AbsoluteFill style={{ scale: `${zoom}`, translate: `0px ${focusY}px`, transformOrigin: "40% 55%" }}>
      <Landscape
        uid="b2"
        pal={MORNING}
        camX={80 + (t - off) * 10}
        foreground={
          <g>
            <Pine x={-60} y={groundY - 40} h={620} c="#2f5a43" c2="#254a37" />
            <Pine x={1120} y={groundY - 30} h={700} c="#2f5a43" c2="#254a37" />
            <rect x={-300} y={groundY - 30} width={1700} height={600} fill="#5f8a4f" />
            <path d={`M-300,${groundY - 10} Q540,${groundY - 30} 1400,${groundY - 6} L1400,${groundY + 120} Q540,${groundY + 90} -300,${groundY + 120} Z`} fill="#c2a47b" />
            {/* trailhead sign */}
            <g transform={`translate(150,${groundY - 10})`}>
              <rect x={-70} y={-400} width={18} height={400} fill="#6a4a32" />
              <rect x={52} y={-400} width={18} height={400} fill="#6a4a32" />
              <rect x={-110} y={-470} width={220} height={150} rx={10} fill="#8a6342" stroke="#5c4029" strokeWidth={6} />
              <text x={0} y={-410} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#f3e6cf">TRAILHEAD</text>
              <text x={0} y={-362} textAnchor="middle" fontFamily={HEAD} fontWeight={600} fontSize={30} fill="#f3e6cf">SUMMIT 4.2 MI</text>
            </g>
            <Person x={820} y={groundY} scale={1.85} walk={0} lean={0.08} poleLen={240} outfit={GUIDE} flip expression="happy" breathe={Math.sin(t * 2) * 2} />
            <Person {...jake} expression={t < 15 ? "tired" : "happy"} />
            {/* problem annotation */}
            <g transform={tr} opacity={annOn}>
              <circle cx={a.hand[0]} cy={a.hand[1] - 6} r={34} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="6 6" />
              <line x1={a.tip[0] + 36} y1={a.tip[1]} x2={a.tip[0] + 36} y2={a.hand[1] - 24} stroke="#fff" strokeWidth={3} />
              <line x1={a.tip[0] + 26} y1={a.tip[1]} x2={a.tip[0] + 46} y2={a.tip[1]} stroke="#fff" strokeWidth={3} />
              <line x1={a.tip[0] + 26} y1={a.hand[1] - 24} x2={a.tip[0] + 46} y2={a.hand[1] - 24} stroke="#fff" strokeWidth={3} />
            </g>
            {/* elbow angle */}
            <g transform={tr} opacity={arcOn}>
              <path
                d={`M${a.elbow[0] + R * Math.cos(a1)},${a.elbow[1] + R * Math.sin(a1)} A${R},${R} 0 0 ${d > 0 ? 1 : 0} ${a.elbow[0] + R * Math.cos(a2)},${a.elbow[1] + R * Math.sin(a2)}`}
                fill="none"
                stroke={good ? "#3E8E5A" : "#ffffff"}
                strokeWidth={5}
                strokeLinecap="round"
              />
              <circle cx={a.elbow[0]} cy={a.elbow[1]} r={4} fill={C.ink} />
            </g>
          </g>
        }
      />
      <Vignette strength={0.3} />
    </AbsoluteFill>
  );
};

const TrailheadOverlay: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const g = hikerGeometry({ x: 400, y: 1640, scale: 1.9, walk: 0, lean: 0.06, handOverride: [75, -47] });
  void g;
  const deg = Math.round(mix(64, 90, at(t, [15.3, 16.9], [0, 1], inOut)));
  return (
    <AbsoluteFill>
      <Scrim />
      <Chip text="Hands at chin height" t={t} t0={9.4} t1={12.1} x={80} y={560} icon="x" />
      <Chip text="Poles too long" t={t} t0={10.4} t1={12.1} x={80} y={660} icon="x" />
      <div style={{ opacity: at(t, [11.95, 12.15], [1, 0]) }} />
      <Title text={"Here's\nthe fix."} t={t} t0={12.15} t1={13.6} top={200} size={160} />
      {/* angle readout card */}
      <div
        style={{
          position: "absolute",
          left: 640,
          top: 600,
          padding: "18px 30px 22px",
          borderRadius: 22,
          background: "#fff",
          boxShadow: "0 14px 40px rgba(0,0,0,0.25)",
          opacity: at(t, [14.9, 15.2], [0, 1]) * at(t, [18.4, 18.7], [1, 0]),
          scale: `${t > 16.85 ? at(t, [16.85, 17.15], [1.12, 1]) : 1}`,
        }}
      >
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, letterSpacing: 3, color: "#6b6b66" }}>ELBOW ANGLE</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 130, lineHeight: 1, color: t > 16.85 ? "#3E8E5A" : C.ink }}>{deg}°</div>
          {t > 16.85 && <span style={{ width: 54, height: 54, borderRadius: 27, background: "#3E8E5A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontSize: 32, fontWeight: 800 }}>✓</span>}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SLOPES (18.6 - 21.9) ============
const Slopes: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const panel = (up: boolean, top: number, on: number) => {
    const k = 0.34;
    const sl = Math.atan(k) * (up ? 1 : -1);
    const gy = (x: number) => 700 - (up ? 1 : -1) * (x - 540) * k;
    const ground = `M-200,1200 L-200,${gy(-200)} L1300,${gy(1300)} L1300,1200 Z`;
    const x = 520;
    return (
      <div style={{ position: "absolute", left: 0, right: 0, top, height: 940, overflow: "hidden", opacity: on, translate: `${mix(up ? -120 : 120, 0, on)}px 0px` }}>
        <svg width={1080} height={940}>
          <defs>
            <linearGradient id={`sk${up}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={up ? "#6f9cc0" : "#86a9c0"} />
              <stop offset="1" stopColor="#efe0c4" />
            </linearGradient>
          </defs>
          <rect width={1080} height={940} fill={`url(#sk${up})`} />
          <Pine x={up ? 160 : 900} y={gy(up ? 160 : 900) + 20} h={420} c="#2f5a43" c2="#254a37" />
          <path d={ground} fill="#5f8a4f" />
          <path d={`M-200,${gy(-200) + 20} L1300,${gy(1300) + 20} L1300,${gy(1300) + 90} L-200,${gy(-200) + 90} Z`} fill="#c2a47b" />
          <Person x={x} y={gy(x) + 52} scale={1.25} walk={0.85} phase={lt * 4.5} lean={up ? 0.3 : -0.02} slope={sl * 0.8} poleLen={up ? 215 : 265} expression="happy" />
        </svg>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      {panel(true, 0, at(t, [18.75, 19.15], [0, 1]))}
      {panel(false, 980, at(t, [19.95, 20.35], [0, 1]))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 940, height: 40, background: "#fff" }} />
      <Chip text="Uphill · 5 cm shorter" t={t} t0={18.95} x={80} y={150} big />
      <Chip text="Downhill · 5 cm longer" t={t} t0={20.15} x={80} y={1130} big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const crestY = 1540;
  const ground = `M-300,2200 L-300,1700 Q250,1560 620,${crestY} Q900,1548 1400,1720 L1400,2200 Z`;
  return (
    <AbsoluteFill>
      <Landscape
        uid="b4"
        pal={SUMMIT}
        camX={lt * 18}
        zoom={at(lt, [0, 0.9], [1.25, 1.06], outExpo)}
        foreground={
          <g>
            <g opacity={0.25} transform={`rotate(${lt * 5},760,860)`}>
              {Array.from({ length: 10 }, (_, i) => (
                <path key={i} d={`M760,860 L${760 + 1800 * Math.cos((i / 10) * Math.PI * 2)},${860 + 1800 * Math.sin((i / 10) * Math.PI * 2)} L${760 + 1800 * Math.cos((i / 10 + 0.025) * Math.PI * 2)},${860 + 1800 * Math.sin((i / 10 + 0.025) * Math.PI * 2)} Z`} fill="#fff3d0" />
              ))}
            </g>
            <path d={ground} fill="#7d8f55" />
            <path d={`M-300,1760 Q250,1610 620,${crestY + 30} Q900,1590 1400,1770 L1400,1820 Q900,1640 620,${crestY + 80} Q250,1660 -300,1820 Z`} fill="#c7a77a" />
            <Person x={190} y={1660} scale={0.95} walk={0.9} phase={lt * 5 + 2} lean={0.16} poleLen={240} slope={0.22} outfit={PALE[1]} expression="happy" />
            <Person x={360} y={1610} scale={1.02} walk={0.9} phase={lt * 5 + 1} lean={0.16} poleLen={240} slope={0.2} outfit={PALE[0]} expression="happy" />
            <Person x={640} y={crestY + 46} scale={1.45} walk={0.35} phase={lt * 3} lean={0.04} poleLen={240} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"He led\nthe group."} t={t} t0={off + 0.12} top={200} size={170} />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const unfold = at(lt, [0.3, 1.4], [0, 1], outExpo);
  const segLen = 250;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse 90% 70% at 50% 42%, #3a5244 0%, ${C.forestDeep} 78%)` }}>
      <div style={{ position: "absolute", top: 130, left: 0, right: 0, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 44, letterSpacing: 10, color: C.stone, opacity: at(lt, [0, 0.4], [0, 1]) }}>
        HIKESUPPLY CO.
      </div>
      <svg width={1080} height={1100} style={{ position: "absolute", top: 220 }}>
        <ellipse cx={540} cy={1000} rx={360} ry={26} fill="rgba(0,0,0,0.25)" />
        <g transform="translate(540,560) rotate(-62)">
          {[0, 1, 2, 3].map((i) => {
            const pos = mix(0, (i - 1.5) * segLen * 0.98, unfold);
            const w = 26 - i * 3;
            return (
              <g key={i} transform={`translate(${pos},0)`}>
                <rect x={-segLen / 2} y={-w / 2} width={segLen} height={w} rx={w / 2} fill={["#2a2f2c", "#3a403c", "#4a514c", "#5a625c"][i]} />
                <rect x={-segLen / 2} y={-w / 2} width={segLen} height={w * 0.35} rx={w / 4} fill="rgba(255,255,255,0.12)" />
                <rect x={segLen / 2 - 18} y={-w / 2 - 3} width={16} height={w + 6} rx={4} fill={C.clay} />
              </g>
            );
          })}
          <g transform={`translate(${mix(-segLen / 2, -2 * segLen * 0.98, unfold) - 120},0)`}>
            <rect x={-60} y={-24} width={150} height={48} rx={20} fill="#1d1f1e" />
            {Array.from({ length: 8 }, (_, i) => (
              <rect key={i} x={-50 + i * 17} y={-24} width={6} height={48} fill="#2c2f2d" />
            ))}
            <path d="M-60,-10 C-150,-60 -170,60 -60,10" fill="none" stroke={C.clay} strokeWidth={10} strokeLinecap="round" />
          </g>
          <g transform={`translate(${mix(segLen / 2, 2 * segLen * 0.98, unfold) - 8},0)`}>
            <path d="M0,-8 L60,-3 L72,0 L60,3 L0,8 Z" fill="#9aa39c" />
            <ellipse cx={30} cy={0} rx={6} ry={30} fill="#1d1f1e" />
          </g>
        </g>
      </svg>
      <div style={{ position: "absolute", top: 1170, left: 80, right: 80, opacity: at(lt, [0.6, 1.0], [0, 1]), translate: `0px ${at(lt, [0.6, 1.1], [30, 0])}px` }}>
        <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 34, letterSpacing: 4, color: C.sage }}>4-SECTION · ALUMINIUM · SOLD SINGLE</div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 8 }}>
          <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 112, lineHeight: 0.92, color: C.stone, textTransform: "uppercase" }}>
            Folding
            <br />
            Trekking Pole
          </div>
          <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 76, color: C.forestDeep, background: C.stone, padding: "4px 24px", borderRadius: 14 }}>$19.99</div>
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
        <svg width={50} height={64} viewBox="0 0 56 70" style={{ scale: `${at(lt, [0.15, 0.5], [0.4, 1], outExpo)}` }}>
          <path d="M6,4 H50 V66 L28,50 L6,66 Z" fill={lt > 0.5 ? C.forest : "none"} stroke={C.forest} strokeWidth={5} strokeLinejoin="round" />
        </svg>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: C.forestDeep, textTransform: "uppercase", lineHeight: 1 }}>Save this before your next climb</div>
      </div>
      <div style={{ position: "absolute", top: 1730, left: 0, right: 0, textAlign: "center", fontFamily: SANS, fontWeight: 600, fontSize: 34, letterSpacing: 1, color: "rgba(245,241,234,0.75)", opacity: at(lt, [1.2, 1.6], [0, 1]) }}>
        hikesupplyco.com
      </div>
    </AbsoluteFill>
  );
};

export const V01: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={5.6} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={5.5} to={18.75}>
        <Trailhead off={5.5} />
        <TrailheadOverlay off={5.5} />
      </Scene>
      <Scene from={18.6} to={21.9} fadeIn={0.15}>
        <Slopes off={18.6} />
      </Scene>
      <Scene from={21.8} to={24.0} fadeIn={0.12}>
        <S4 off={21.8} />
      </Scene>
      <Scene from={23.9} to={30} fadeOut={0}>
        <S5 off={23.9} />
      </Scene>
      <Captions words={words} windows={[[2.6, 5.5, 830], [5.6, 12.0, 300], [13.3, 18.5, 300]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
