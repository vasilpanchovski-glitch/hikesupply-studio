import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, GUIDE, JAKE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v19.json";

const words = vo.words as unknown as Word[];

const DAY: Palette = {
  sky: ["#6f9cc4", "#b9d2e2", "#e8eee6"],
  sun: { x: 840, y: 520, r: 60, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#9fb4c4", "#86a0b0", "#6f8a8a", "#5b7550", "#4a6040"],
  mist: "#eef3f2",
};
const COOL: Palette = {
  sky: ["#7d93a6", "#b8c4cc", "#dfe2df"],
  sun: { x: 200, y: 560, r: 50, color: "#f6f6ee", glow: "#e6e8de" },
  layers: ["#a3afb6", "#8b9aa2", "#74858a", "#5d6f5a", "#4c5c48"],
  mist: "#e9ecea",
};

const LEO: Outfit = {
  ...JAKE,
  jacket: "#2F5D7C",
  jacketShade: "#234862",
  beard: null,
  cap: "#B5553A",
  capShade: "#8E3F2A",
  pack: "#C9A24A",
  packShade: "#A6843A",
};
const PAL: Outfit = {
  ...GUIDE,
  hair: "#2b1d16",
  beard: "#2b1d16",
  skin: "#8A5A3E",
  skinShade: "#6E4630",
  jacket: "#4E7A4A",
  jacketShade: "#3B5E38",
  cap: "#E3B23C",
  capShade: "#C4952A",
  pack: "#7B3A2F",
  packShade: "#5E2C24",
};

// Crew sock, side view, toe pointing right. Local box ~190 x 230.
const SOCK = "M0,0 L72,0 L72,118 Q74,140 98,148 L162,160 Q192,168 188,196 Q184,228 150,228 L46,228 Q0,228 0,182 Z";
const Sock: React.FC<{ x: number; y: number; s?: number; rot?: number; body: string; trim: string; wet?: boolean; t?: number; label?: string }> = ({
  x,
  y,
  s = 1,
  rot = 0,
  body,
  trim,
  wet,
  t = 0,
  label,
}) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d={SOCK} fill={body} stroke="rgba(0,0,0,0.18)" strokeWidth={3} />
    <rect x={0} y={0} width={72} height={30} fill={trim} />
    {[40, 52, 64].map((yy) => (
      <rect key={yy} x={4} y={yy} width={64} height={3} fill="rgba(0,0,0,0.08)" />
    ))}
    <path d="M0,182 Q0,228 46,228 L58,228 Q30,206 34,170 Z" fill={trim} />
    <path d="M150,228 Q184,228 188,196 Q190,178 172,166 Q160,200 150,228 Z" fill={trim} />
    {label && (
      <text x={36} y={96} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={20} fill="rgba(255,255,255,0.9)" transform="rotate(-90 36 96)">
        {label}
      </text>
    )}
    {wet && (
      <g>
        <path d="M0,150 Q60,170 110,150 L150,166 L150,228 L46,228 Q0,228 0,182 Z" fill="rgba(70,90,110,0.28)" />
        {[0, 1, 2].map((i) => {
          const k = ((t * 0.9 + i * 0.33) % 1 + 1) % 1;
          return <path key={i} d={`M${50 + i * 45},${236 + k * 90} q-9,14 0,20 q9,-6 0,-20 Z`} fill="#7fb2d6" opacity={1 - k} />;
        })}
      </g>
    )}
  </g>
);

const Trees: React.FC<{ y: number; shift: number; h?: number }> = ({ y, shift, h = 460 }) => (
  <g>
    {Array.from({ length: 8 }, (_, i) => {
      const x = -120 + i * 190 - shift;
      return i % 3 === 2 ? (
        <LeafTree key={i} x={x} y={y} h={h - 40} c="#D9822B" c2="#B8641E" />
      ) : (
        <Pine key={i} x={x} y={y} h={h + (i % 2) * 70} c="#2f5a43" c2="#254a37" />
      );
    })}
  </g>
);

// ============ S1 HOOK: crossing the stream (0 - 3.6) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1660;
  const px = mix(150, 560, Math.min(1, t / 3.4));
  const splash = Math.max(0, Math.sin(t * 5));
  return (
    <AbsoluteFill>
      <Landscape
        uid="d1"
        pal={DAY}
        camX={t * 8}
        zoom={mix(1.03, 1.08, t / 3.6)}
        foreground={
          <g>
            <Trees y={groundY - 140} shift={t * 5} />
            <rect x={-300} y={groundY - 150} width={1700} height={700} fill="#6a7a40" />
            <path d={`M-300,${groundY - 40} Q540,${groundY - 70} 1400,${groundY - 40} L1400,${groundY + 140} Q540,${groundY + 110} -300,${groundY + 140} Z`} fill="#5d8fae" />
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M${-200 + ((i * 360 + t * 120) % 1600)},${groundY + 10 + i * 26} q40,-10 80,0`}
                stroke="#cfe6f2"
                strokeWidth={6}
                fill="none"
                strokeLinecap="round"
                opacity={0.7}
              />
            ))}
            {[210, 400, 590, 780].map((x, i) => (
              <ellipse key={x} cx={x} cy={groundY + 70 - (i % 2) * 14} rx={70} ry={22} fill="#8d8a80" />
            ))}
            <path d={`M-300,${groundY + 130} Q540,${groundY + 100} 1400,${groundY + 130} L1400,2200 L-300,2200 Z`} fill="#6b5236" />
            <Person x={px} y={groundY + 70} scale={1.7} phase={t * 5} walk={0.9} lean={0.1} poles={false} handOverride={freeHand(t * 5, 0.9)} outfit={LEO} expression={t < 2.2 ? "neutral" : "tired"} />
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} cx={px + 40 + (i - 2) * 22} cy={groundY + 50 - splash * (30 + i * 8)} r={7} fill="#cfe6f2" opacity={splash * 0.9} />
            ))}
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim />
      <Title text={"Your socks\nare ruining\nyour hike."} t={t} t0={0} top={190} size={140} />
      <Chip text="Cotton gym socks" t={t} t0={2.2} t1={3.6} x={80} y={660} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: cold, wet, raw (3.5 - 10.5) ============
const SockCard: React.FC<{ t: number; t0: number; t1: number; x: number; y: number }> = ({ t, t0, t1, x, y }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      padding: "18px 22px 10px",
      borderRadius: 22,
      background: "#fff",
      boxShadow: "0 14px 40px rgba(0,0,0,0.25)",
      opacity: at(t, [t0, t0 + 0.3], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]),
      scale: `${at(t, [t0, t0 + 0.4], [0.85, 1], outExpo)}`,
      transformOrigin: "50% 0%",
    }}
  >
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, letterSpacing: 3, color: "#6b6b66" }}>COTTON</div>
    <svg width={300} height={360} viewBox="0 0 300 360">
      <Sock x={50} y={10} s={1.05} body="#d9d6cf" trim="#b9b5ab" wet t={t} />
    </svg>
    <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 64, lineHeight: 1, color: "#D9443A", marginTop: -8, marginBottom: 6 }}>HOLDS WATER</div>
  </div>
);

const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  return (
    <AbsoluteFill>
      <Landscape
        uid="d2"
        pal={COOL}
        camX={40 + lt * 6}
        zoom={mix(1.0, 1.05, lt / 7)}
        foreground={
          <g>
            <Trees y={groundY - 150} shift={120} h={430} />
            <rect x={-300} y={groundY - 160} width={1700} height={700} fill="#5f6e3c" />
            <path d={`M-300,${groundY - 20} Q540,${groundY - 50} 1400,${groundY - 20} L1400,${groundY + 90} Q540,${groundY + 60} -300,${groundY + 90} Z`} fill="#8a7253" />
            <Person x={300} y={groundY + 60} scale={1.75} walk={0} lean={0.12} poles={false} handOverride={[22, 34]} outfit={LEO} expression="tired" breathe={Math.sin(t * 3) * 2.5} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim />
      <Chip text="Cold" t={t} t0={5.35} t1={7.15} x={80} y={560} icon="x" />
      <Chip text="Wet" t={t} t0={5.63} t1={7.15} x={80} y={660} icon="x" />
      <Chip text="Rubbing raw" t={t} t0={6.08} t1={7.15} x={80} y={760} icon="x" />
      <SockCard t={t} t0={7.2} t1={10.5} x={620} y={900} />
    </AbsoluteFill>
  );
};

// ============ S3 A FRIEND HANDS OVER MERINO (10.4 - 14.1) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  const reach: [number, number] = [96, -88];
  const k = at(t, [11.0, 12.0], [0, 1], outExpo);
  const sx = mix(600, 500, k);
  const sy = groundY + 60 - (182 + 88) * 1.75 - 120;
  return (
    <AbsoluteFill>
      <Landscape
        uid="d3"
        pal={DAY}
        camX={120 + lt * 6}
        foreground={
          <g>
            <Trees y={groundY - 150} shift={240} h={440} />
            <rect x={-300} y={groundY - 160} width={1700} height={700} fill="#6a7a40" />
            <path d={`M-300,${groundY - 20} Q540,${groundY - 50} 1400,${groundY - 20} L1400,${groundY + 90} Q540,${groundY + 60} -300,${groundY + 90} Z`} fill="#8a7253" />
            <Person x={300} y={groundY + 60} scale={1.75} walk={0} lean={0.06} poles={false} handOverride={k > 0.6 ? reach : [22, 34]} outfit={LEO} expression={k > 0.6 ? "happy" : "tired"} breathe={Math.sin(t * 2) * 2} />
            <Person x={790} y={groundY + 60} scale={1.75} walk={0} lean={0.06} poles={false} handOverride={reach} outfit={PAL} flip expression="happy" breathe={Math.sin(t * 2 + 1) * 2} />
            <g opacity={at(lt, [0.2, 0.5], [0, 1])}>
              <Sock x={sx - 90} y={sy} s={0.7} rot={-8} body="#2E3F5C" trim="#1F2C42" />
              <Sock x={sx - 40} y={sy + 10} s={0.7} rot={6} body="#4E7A5E" trim="#2C4536" />
            </g>
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Chip text="Dry merino wool socks" t={t} t0={12.43} t1={14.1} x={80} y={560} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 FIX (14.0 - 21.4) ============
const BagCard: React.FC<{ t: number; t0: number; t1: number; x: number; y: number }> = ({ t, t0, t1, x, y }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      padding: "18px 26px 20px",
      borderRadius: 22,
      background: "#fff",
      boxShadow: "0 14px 40px rgba(0,0,0,0.25)",
      opacity: at(t, [t0, t0 + 0.3], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]),
      scale: `${at(t, [t0, t0 + 0.4], [0.85, 1], outExpo)}`,
      rotate: `${Math.sin(t * 2.2) * 2}deg`,
      transformOrigin: "50% 0%",
    }}
  >
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, letterSpacing: 3, color: "#6b6b66" }}>SPARE PAIR</div>
    <svg width={260} height={280} viewBox="0 0 260 280">
      <path d="M50,60 Q50,40 70,40 L190,40 Q210,40 210,60 L222,250 Q222,268 204,268 L56,268 Q38,268 38,250 Z" fill="#E3B23C" />
      <rect x={60} y={14} width={140} height={34} rx={10} fill="#C4952A" />
      <path d="M70,30 Q130,0 190,30" stroke="#2C3B2E" strokeWidth={8} fill="none" />
      <Sock x={84} y={100} s={0.5} body="#3E5F4B" trim="#2C4536" />
      <text x={130} y={246} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={34} fill={C.forestDeep}>DRY BAG</text>
    </svg>
  </div>
);

const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1680;
  const scroll = lt * 40;
  return (
    <AbsoluteFill>
      <Landscape
        uid="d4"
        pal={DAY}
        camX={scroll * 0.3}
        foreground={
          <g>
            <Trees y={groundY - 40} shift={(scroll * 0.6) % 570} h={520} />
            <rect x={-300} y={groundY - 40} width={1700} height={700} fill="#6a7a40" />
            <path d={`M-300,${groundY - 6} Q540,${groundY - 26} 1400,${groundY - 4} L1400,${groundY + 110} Q540,${groundY + 84} -300,${groundY + 110} Z`} fill="#a88a62" />
            <Person x={360} y={groundY + 30} scale={1.75} phase={t * 4.4} walk={0.75} lean={0.14} poles={false} handOverride={freeHand(t * 4.4, 0.75)} outfit={LEO} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Title text={"Here's\nthe fix."} t={t} t0={14.15} t1={15.3} top={200} size={160} />
      <Chip text="Warm when damp" t={t} t0={15.5} t1={21.3} x={80} y={420} icon="check" />
      <Chip text="Pulls sweat away" t={t} t0={17.02} t1={21.3} x={80} y={520} icon="check" />
      <Chip text="Spare pair in a dry bag" t={t} t0={18.97} t1={21.3} x={80} y={620} icon="check" />
      <BagCard t={t} t0={19.4} t1={21.3} x={690} y={1080} />
    </AbsoluteFill>
  );
};

// ============ S5 PAYOFF (21.3 - 23.6) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const crestY = 1560;
  return (
    <AbsoluteFill>
      <Landscape
        uid="d5"
        pal={GOLDEN}
        camX={lt * 18}
        zoom={at(lt, [0, 0.9], [1.25, 1.06], outExpo)}
        foreground={
          <g>
            <Trees y={crestY + 40} shift={lt * 10} h={380} />
            <path d={`M-300,2200 L-300,${crestY + 60} Q540,${crestY - 10} 1400,${crestY + 60} L1400,2200 Z`} fill="#8a7a40" />
            <path d={`M-300,${crestY + 110} Q540,${crestY + 40} 1400,${crestY + 110} L1400,${crestY + 190} Q540,${crestY + 120} -300,${crestY + 190} Z`} fill="#c7a77a" />
            <Person x={560} y={crestY + 120} scale={1.7} walk={0} lean={0.02} poles={false} handOverride={[14, 30]} outfit={LEO} expression="happy" breathe={Math.sin(lt * 2) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Happy\nfeet."} t={t} t0={off + 0.12} top={200} size={200} />
    </AbsoluteFill>
  );
};

// ============ S6 END CARD ============
const SockArt: React.FC<{ lt: number }> = ({ lt }) => {
  const s = at(lt, [0.2, 1.1], [0.85, 1], outExpo);
  const o = at(lt, [0.1, 0.5], [0, 1]);
  return (
    <g transform={`translate(540,520) scale(${s})`} opacity={o}>
      <g transform="translate(-250,-330) scale(2.2) rotate(-6)">
        <Sock x={0} y={0} body="#2E3F5C" trim="#1F2C42" label="MERINO" />
      </g>
      <g transform="translate(-120,-250) scale(2.2) rotate(5)">
        <Sock x={0} y={0} body="#3E5F4B" trim="#2C4536" label="MERINO" />
      </g>
    </g>
  );
};

const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  void off;
  return (
    <EndCard
      lt={lt}
      art={<SockArt lt={lt} />}
      spec="80% MERINO · CUSHIONED CREW"
      name={
        <>
          Merino Wool
          <br />
          Hiking Socks
        </>
      }
      nameSize={104}
      shadowY={860}
      price="$19.99"
      save="Save this before your next hike"
    />
  );
};

export const V19: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={3.6} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={3.5} to={10.5}>
        <S2 off={3.5} />
      </Scene>
      <Scene from={10.4} to={14.1}>
        <S3 off={10.4} />
      </Scene>
      <Scene from={14.0} to={21.4}>
        <S4 off={14.0} />
      </Scene>
      <Scene from={21.3} to={23.6} fadeIn={0.12}>
        <S5 off={21.3} />
      </Scene>
      <Scene from={23.5} to={30} fadeOut={0}>
        <S6 off={23.5} />
      </Scene>
      <Captions words={words} windows={[[0.3, 3.5, 860], [3.55, 14.0, 300], [15.3, 21.3, 860]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
