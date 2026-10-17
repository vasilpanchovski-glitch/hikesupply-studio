import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { DAWN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v22.json";

const words = vo.words as unknown as Word[];

const LATE: Palette = {
  sky: ["#58708a", "#c7a88a", "#f2c99a"],
  sun: { x: 820, y: 980, r: 62, color: "#fff0d0", glow: "#ffb878" },
  layers: ["#a58e86", "#87767a", "#695e64", "#4b4a48", "#34382e"],
  mist: "#f0c8a2",
};
const DUSK: Palette = {
  sky: ["#2c3a52", "#6b6577", "#c39a82"],
  sun: { x: 260, y: 1120, r: 46, color: "#f6dcc0", glow: "#d79a74" },
  layers: ["#6e6672", "#58525e", "#45414a", "#34333a", "#24262a"],
  mist: "#a99088",
  stars: 0.35,
};
const NIGHT: Palette = {
  sky: ["#18233a", "#33405a", "#6c6a7c"],
  sun: { x: 820, y: 360, r: 34, color: "#eef0f2", glow: "#9aa4b8" },
  layers: ["#4a5064", "#3c4254", "#303646", "#262b38", "#1b1f28"],
  mist: "#5e6478",
  stars: 1,
};

const DAN: Outfit = {
  ...JAKE,
  jacket: "#3D5A80",
  jacketShade: "#2E4563",
  cap: "#B5553A",
  capShade: "#8E3F2A",
  pack: "#5B5546",
  packShade: "#45402F",
  hair: "#6b4a30",
  beard: "#6b4a30",
};
const RESCUE: Outfit = { ...GUIDE, jacket: "#C2452D", jacketShade: "#9A3523", cap: "#C2452D", capShade: "#9A3523" };

const FALL_TREES = [
  ["#C9772E", "#A85E22"],
  ["#B8862E", "#966B22"],
  ["#9C4A2A", "#7E3A20"],
];

const Woods: React.FC<{ y: number; shift: number; dark?: number }> = ({ y, shift, dark = 0 }) => (
  <g opacity={1 - dark * 0.35}>
    {Array.from({ length: 8 }, (_, i) => {
      const x = (((-120 + i * 190 - shift) % 1520) + 1520) % 1520 - 220;
      const [c, c2] = FALL_TREES[i % 3];
      return i % 2 ? (
        <LeafTree key={i} x={x} y={y + (i % 3) * 14} h={430 + (i % 3) * 50} c={c} c2={c2} />
      ) : (
        <Pine key={i} x={x} y={y + 10} h={520 + (i % 3) * 50} c="#36634a" c2="#254a37" />
      );
    })}
  </g>
);

// Small stuff sack the bivy folds into.
const Pouch: React.FC<{ x: number; y: number; s: number; o: number }> = ({ x, y, s, o }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
    <rect x={-26} y={-34} width={52} height={70} rx={14} fill="#C2662E" />
    <rect x={-26} y={-34} width={52} height={16} rx={8} fill="#9B4E20" />
    <path d="M-6,-34 Q0,-50 6,-34" stroke="#2a2a2a" strokeWidth={4} fill="none" />
    <rect x={-14} y={0} width={28} height={6} rx={3} fill="rgba(255,255,255,0.4)" />
  </g>
);

// Dan wrapped in the reflective bivy, sitting against a log, head and shoulders out.
const BivyDan: React.FC<{ x: number; y: number; s: number; t: number; happy?: boolean; o?: number }> = ({ x, y, s, t, happy, o = 1 }) => {
  const shimmer = (Math.sin(t * 2.2) + 1) / 2;
  const br = Math.sin(t * 1.4) * 3;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
      <defs>
        <linearGradient id="mylar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f6f8" />
          <stop offset={0.35 + shimmer * 0.2} stopColor="#b9c2c9" />
          <stop offset="0.7" stopColor="#e8ecef" />
          <stop offset="1" stopColor="#8f9aa3" />
        </linearGradient>
      </defs>
      {/* log behind */}
      <rect x={-210} y={-150} width={420} height={70} rx={35} fill="#5a4030" />
      <ellipse cx={-210} cy={-115} rx={18} ry={35} fill="#7a5a40" />
      <ellipse cx={0} cy={6} rx={240} ry={18} fill="rgba(0,0,0,0.25)" />
      {/* sack: sitting, legs stretched to the right */}
      <path
        d={`M-110,${-170 + br} Q-150,-120 -140,-40 Q-136,0 -90,4 L230,4 Q262,0 258,-34 Q252,-70 200,-74 L-10,-80 Q-10,${-150 + br} -40,${-176 + br} Z`}
        fill="url(#mylar)"
        stroke="#7d8790"
        strokeWidth={3}
      />
      {/* crinkles */}
      <path d="M-100,-120 L-70,-60 M-60,-140 L-30,-90 M20,-70 L60,-20 M90,-72 L120,-12 M160,-70 L190,-20" stroke="rgba(255,255,255,0.8)" strokeWidth={4} strokeLinecap="round" />
      <path d="M-120,-80 L-80,-20 M40,-50 L70,0 M130,-50 L150,-8" stroke="rgba(90,100,110,0.45)" strokeWidth={3} strokeLinecap="round" />
      {/* head */}
      <g transform={`translate(-72,${-206 + br})`}>
        <circle r={40} fill={DAN.skin} />
        <path d="M-40,6 Q-30,44 0,46 Q30,44 40,6 Q30,24 0,26 Q-30,24 -40,6 Z" fill={DAN.beard ?? DAN.hair} />
        <path d="M-44,-6 Q-42,-48 0,-50 Q42,-48 44,-6 Z" fill={DAN.cap} />
        <rect x={-6} y={-12} width={64} height={12} rx={6} fill={DAN.capShade} />
        <circle cx={10} cy={6} r={4.5} fill="#2a1f1a" />
        <circle cx={-14} cy={6} r={4.5} fill="#2a1f1a" />
        <path d={happy ? "M-12,22 Q0,32 12,22" : "M-10,26 Q0,22 10,26"} stroke="#5a3022" strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>
      {/* bivy hood edge around the shoulders */}
      <path d={`M-128,${-150 + br} Q-72,${-128 + br} -18,${-152 + br}`} stroke="#d9dee2" strokeWidth={16} fill="none" strokeLinecap="round" />
    </g>
  );
};

// ============ S1 HOOK: twisted ankle, sun dropping (0 - 4.9) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1660;
  const ph = t * 2.2;
  const limp = Math.max(0, Math.sin(ph)) * 10;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={LATE}
        camX={t * 10}
        zoom={mix(1.03, 1.09, t / 4.9)}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={t * 22} />
            <rect x={-300} y={groundY - 60} width={1700} height={700} fill="#6a5a36" />
            <path d={`M-300,${groundY - 6} Q540,${groundY - 26} 1400,${groundY - 4} L1400,${groundY + 110} Q540,${groundY + 84} -300,${groundY + 110} Z`} fill="#a88a62" />
            <Person x={560} y={groundY + 40} scale={1.75} phase={ph} walk={0.35} lean={0.22} poles={false} handOverride={[40, 70 + limp]} outfit={DAN} expression="tired" breathe={limp * 0.4} />
          </g>
        }
      />
      <Vignette strength={0.42} />
      <Scrim h={860} />
      <Title text={"A sprained\nankle. 4 miles\nfrom the car."} t={t} t0={0} top={170} size={128} />
      <Chip text="Twisted ankle" t={t} t0={1.3} t1={3.4} x={80} y={620} icon="x" />
      <Readout label="TO THE CAR" value="4 MILES" ok={false} t={t} t0={3.4} t1={4.9} x={80} y={600} />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: cold, help hours away (4.8 - 11.0) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={DUSK}
        camX={30 + lt * 5}
        zoom={mix(1.02, 1.08, lt / 6.2)}
        foreground={
          <g>
            <Woods y={groundY - 150} shift={80} dark={0.6} />
            <rect x={-300} y={groundY - 160} width={1700} height={700} fill="#3f3c2e" />
            <path d={`M-300,${groundY - 40} Q540,${groundY - 60} 1400,${groundY - 40} L1400,${groundY + 70} Q540,${groundY + 50} -300,${groundY + 70} Z`} fill="#6f6250" />
            {/* drifting cold air */}
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M${((lt * 120 + i * 400) % 1500) - 300},${1180 + i * 120} q60,-24 120,0 t120,0`}
                stroke="rgba(220,230,240,0.35)"
                strokeWidth={8}
                fill="none"
                strokeLinecap="round"
              />
            ))}
            <Person x={720} y={groundY + 100} scale={1.75} walk={0} lean={0.1} poles={false} handOverride={[30, 10]} outfit={DAN} flip expression="tired" breathe={Math.sin(t * 22) * 1.6} />
          </g>
        }
      />
      <Vignette strength={0.5} />
      <Scrim />
      <Chip text="Cold air rolling in" t={t} t0={4.9} x={80} y={560} icon="x" />
      <Readout label="HELP" value="HOURS AWAY" ok={false} t={t} t0={6.6} x={80} y={660} />
      <Chip text="No tent" t={t} t0={8.45} x={80} y={870} icon="x" />
      <Chip text="No sleeping bag" t={t} t0={9.55} x={80} y={970} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: the pouch, the bivy (10.9 - 19.5) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1760;
  const s = 1.3;
  const x = 760;
  const inside = t > 15.75;
  const pouchK = at(t, [11.6, 12.1], [0, 1]);
  const hand: [number, number] = [mix(30, 70, pouchK), mix(10, -40, pouchK)];
  const hx = x - hand[0] * s;
  const hy = groundY + s * (hand[1] - 182);
  const bivyIn = at(t, [15.75, 16.15], [0, 1]);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={NIGHT}
        camX={40 + lt * 4}
        foreground={
          <g>
            <Woods y={groundY - 220} shift={160} dark={0.9} />
            <rect x={-300} y={groundY - 230} width={1700} height={700} fill="#2c2e26" />
            <path d={`M-300,${groundY - 40} Q540,${groundY - 60} 1400,${groundY - 40} L1400,${groundY + 60} Q540,${groundY + 40} -300,${groundY + 60} Z`} fill="#4c4a40" />
            {!inside && (
              <g>
                <Person x={x} y={groundY} scale={s} walk={0} lean={0.08} poles={false} handOverride={hand} outfit={DAN} flip expression={pouchK > 0.5 ? "neutral" : "tired"} breathe={Math.sin(t * 20) * 1.4} />
                <Pouch x={hx - 6} y={hy - 30} s={1.4} o={pouchK} />
              </g>
            )}
            {inside && <BivyDan x={560} y={groundY - 20} s={1.55} t={t} o={bivyIn} />}
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim />
      <Chip text="Tiny pouch, bottom of the pack" t={t} t0={11.0} t1={14.2} x={80} y={380} icon="check" />
      <Readout label="EMERGENCY" value="BIVY" ok={null} t={t} t0={14.24} x={80} y={360} pulseAt={14.24} />
      <Chip text="Slides on in seconds" t={t} t0={15.8} x={80} y={590} icon="check" />
      <Chip text="Traps your body heat" t={t} t0={17.3} x={80} y={690} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: dawn, rescue arrives (19.4 - 23.1) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  const rx = mix(1240, 900, at(lt, [0, 2.6], [0, 1], outExpo));
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={DAWN}
        camX={lt * 10}
        zoom={at(lt, [0, 0.9], [1.22, 1.05], outExpo)}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={60 + lt * 10} dark={0.3} />
            <rect x={-300} y={groundY - 60} width={1700} height={700} fill="#4f4a34" />
            <path d={`M-300,${groundY - 6} Q540,${groundY - 26} 1400,${groundY - 4} L1400,${groundY + 110} Q540,${groundY + 84} -300,${groundY + 110} Z`} fill="#8a7458" />
            <BivyDan x={380} y={groundY + 40} s={1.35} t={t} happy />
            <Person x={rx} y={groundY + 40} scale={1.6} phase={lt * 4} walk={at(lt, [1.8, 2.6], [0.8, 0])} lean={0.08} poles={false} handOverride={freeHand(lt * 4, 0.6)} outfit={RESCUE} flip expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Cold,\nbut okay."} t={t} t0={off + 0.12} top={200} size={180} />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const BivyArt: React.FC<{ lt: number }> = ({ lt }) => {
  const s = at(lt, [0.2, 1.1], [0.85, 1], outExpo);
  const o = at(lt, [0.1, 0.5], [0, 1]);
  const shimmer = (Math.sin(lt * 2) + 1) / 2;
  return (
    <g transform={`translate(540,520) scale(${s})`} opacity={o}>
      <defs>
        <linearGradient id="mylarEnd" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6f8fa" />
          <stop offset={0.3 + shimmer * 0.25} stopColor="#b3bdc5" />
          <stop offset="0.75" stopColor="#eef1f3" />
          <stop offset="1" stopColor="#8b97a1" />
        </linearGradient>
      </defs>
      {/* unrolled bivy */}
      <g transform="rotate(-8)">
        <path d="M-300,-150 Q-320,-40 -290,140 Q-280,220 -200,230 L240,250 Q300,250 305,190 L320,-140 Q318,-210 250,-212 L-230,-220 Q-296,-218 -300,-150 Z" fill="url(#mylarEnd)" stroke="#6f7a83" strokeWidth={4} />
        <path d="M-300,-150 Q-200,-110 -230,-220" fill="#d7dde1" stroke="#6f7a83" strokeWidth={3} />
        <path d="M-200,-150 L-120,40 M-80,-180 L-10,-10 M40,-190 L110,30 M150,-170 L230,60 M-240,60 L-160,200 M20,60 L80,220" stroke="rgba(255,255,255,0.85)" strokeWidth={6} strokeLinecap="round" />
        <path d="M-150,-60 L-90,120 M90,-120 L150,60 M180,100 L230,220" stroke="rgba(80,92,104,0.4)" strokeWidth={4} strokeLinecap="round" />
      </g>
      {/* stuff sack in front */}
      <g transform="translate(190,170) rotate(6)">
        <rect x={-70} y={-90} width={140} height={180} rx={36} fill="#C2662E" />
        <rect x={-70} y={-90} width={140} height={40} rx={20} fill="#9B4E20" />
        <path d="M-16,-90 Q0,-130 16,-90" stroke="#2a2a2a" strokeWidth={8} fill="none" />
        <rect x={-40} y={0} width={80} height={14} rx={7} fill="rgba(255,255,255,0.45)" />
      </g>
    </g>
  );
};

const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  void off;
  return (
    <EndCard
      lt={lt}
      art={<BivyArt lt={lt} />}
      spec="REFLECTIVE MYLAR · PACKS SMALL"
      name={
        <>
          Emergency
          <br />
          Bivy Sack
        </>
      }
      nameSize={104}
      shadowY={830}
      price="$14.99"
      save="Save this before your next fall hike"
    />
  );
};

export const V22: React.FC = () => {
  void HEAD;
  void C;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={4.9} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={4.8} to={11.0}>
        <S2 off={4.8} />
      </Scene>
      <Scene from={10.9} to={19.5}>
        <S3 off={10.9} />
      </Scene>
      <Scene from={19.4} to={23.1} fadeIn={0.12}>
        <S4 off={19.4} />
      </Scene>
      <Scene from={23.0} to={30} fadeOut={0}>
        <S5 off={23.0} />
      </Scene>
      <Captions words={words} windows={[[0.3, 4.8, 860], [4.85, 10.9, 300], [10.95, 19.4, 1110]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
