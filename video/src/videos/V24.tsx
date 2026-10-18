import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, JAKE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v24.json";

const words = vo.words as unknown as Word[];

const CRISP: Palette = {
  sky: ["#6f9cc4", "#c4d8e4", "#eef0ea"],
  sun: { x: 800, y: 560, r: 56, color: "#fffdf0", glow: "#f6eccc" },
  layers: ["#b4c0c8", "#97a6ae", "#7c8e92", "#62766e", "#4c5e50"],
  mist: "#f0f4f4",
};
const HAZY: Palette = {
  sky: ["#8aa2b4", "#d4d6cc", "#efe6d2"],
  sun: { x: 300, y: 500, r: 64, color: "#fffbe8", glow: "#f8e6b8" },
  layers: ["#c0b6a6", "#a49a88", "#887e6a", "#6c6450", "#544e3c"],
  mist: "#f2e8d4",
};
const CLEAR: Palette = {
  sky: ["#4f8cc0", "#b0d0e4", "#eef0e4"],
  sun: { x: 780, y: 520, r: 60, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#a8bcc8", "#8ca4b0", "#72908c", "#5a7458", "#475c46"],
  mist: "#eef3f2",
};

const MARK: Outfit = {
  ...JAKE,
  skin: "#E8B494",
  skinShade: "#C99474",
  hair: "#8a5a32",
  beard: null,
  cap: "#2F3B45",
  capShade: "#222c34",
  jacket: "#6B4E8A",
  jacketShade: "#523B6B",
  pants: "#3E4650",
  pantsShade: "#2E353D",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};

const FALL = [
  ["#D9822B", "#B8641E"],
  ["#C9A23A", "#A8842A"],
  ["#B04A2A", "#8E3A20"],
];
const Woods: React.FC<{ y: number; shift: number; n?: number }> = ({ y, shift, n = 8 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const x = (((-120 + i * 190 - shift) % 1520) + 1520) % 1520 - 220;
      const [c, c2] = FALL[i % 3];
      return i % 3 === 1 ? (
        <Pine key={i} x={x} y={y + 10} h={520} c="#36634a" c2="#254a37" />
      ) : (
        <LeafTree key={i} x={x} y={y + (i % 2) * 16} h={440 + (i % 3) * 50} c={c} c2={c2} />
      );
    })}
  </g>
);
const Path: React.FC<{ y: number; base?: string; trail?: string }> = ({ y, base = "#5f6a3e", trail = "#a68c66" }) => (
  <g>
    <rect x={-300} y={y - 60} width={1700} height={700} fill={base} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={trail} />
    {/* fallen leaves */}
    {Array.from({ length: 14 }, (_, i) => (
      <ellipse key={i} cx={(i * 97) % 1080} cy={y + 20 + ((i * 37) % 70)} rx={9} ry={5} fill={FALL[i % 3][0]} opacity={0.8} />
    ))}
  </g>
);

// Full bottle in the side pocket, never touched.
const Bottle: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-14} y={-50} width={28} height={70} rx={8} fill="#7fb6d6" stroke="#2c4f63" strokeWidth={3} />
    <rect x={-9} y={-62} width={18} height={14} rx={3} fill="#2c4f63" />
    <rect x={-10} y={-36} width={6} height={44} rx={3} fill="rgba(255,255,255,0.55)" />
  </g>
);

// ============ S1 HOOK: crisp morning, water untouched (0 - 6.0) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1660;
  const ph = t * 4.2;
  const x = 520;
  const s = 1.75;
  const breath = (Math.sin(t * 2.6) + 1) / 2;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={CRISP}
        camX={t * 30}
        zoom={mix(1.03, 1.08, t / 6)}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={t * 40} />
            <Path y={groundY} />
            <Person x={x} y={groundY + 40} scale={s} phase={ph} walk={0.9} lean={0.1} poles={false} handOverride={freeHand(ph, 0.9)} outfit={MARK} expression="neutral" />
            <Bottle x={x - 62 * s} y={groundY + 40 + s * (-100 - 182) + 60} s={1.3} />
            {/* cold breath */}
            <ellipse cx={x + 70 * s + breath * 30} cy={groundY + 40 + s * (-200 - 182) + 40} rx={20 + breath * 18} ry={12 + breath * 8} fill="#fff" opacity={0.35 * (1 - breath)} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"You're not\nthirsty.\nThat's the\nproblem."} t={t} t0={0} top={160} size={118} />
      <Chip text="Water: barely touched" t={t} t0={1.2} x={80} y={660} icon="x" />
      <Chip text="Cold, so no thirst" t={t} t0={3.55} x={80} y={760} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: last mile, headache (5.9 - 13.0) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  const ph = lt * 2.6;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={HAZY}
        camX={40 + lt * 12}
        zoom={mix(1.02, 1.08, lt / 7)}
        foreground={
          <g>
            <Woods y={groundY - 150} shift={100 + lt * 12} />
            <Path y={groundY - 90} base="#5a5a36" trail="#9a8260" />
            <Person x={620} y={groundY + 40} scale={1.75} phase={ph} walk={0.45} lean={0.3} poles={false} handOverride={[46, 60]} outfit={MARK} expression="tired" />
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim />
      <Readout label="LAST MILE" value="HEADACHE" ok={false} t={t} t0={6.1} x={80} y={560} pulseAt={6.1} />
      <Chip text="Heavy legs" t={t} t0={7.75} x={80} y={770} icon="x" />
      <Chip text="Cold air dulls thirst" t={t} t0={9.05} x={80} y={870} icon="x" />
      <Chip text="You still lose water" t={t} t0={10.6} x={80} y={970} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: water within reach, sip on a schedule (12.9 - 19.8) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1760;
  const s = 1.3;
  const x = 700;
  const sip = Math.max(at(t, [16.1, 16.4], [0, 1]) * at(t, [17.1, 17.4], [1, 0]), at(t, [18.4, 18.7], [0, 1]) * at(t, [19.3, 19.6], [1, 0]));
  const ph = lt * 4;
  const walkK = 0.75 * (1 - sip * 0.7);
  const rest = freeHand(ph, walkK);
  const hand: [number, number] = [mix(rest[0], 52, sip), mix(rest[1], -150, sip)];
  const hx = x + hand[0] * s;
  const hy = groundY + s * (hand[1] - 182);
  const px = x - 44 * s;
  const py = groundY + s * (-130 - 182);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={CLEAR}
        camX={lt * 14}
        foreground={
          <g>
            <Woods y={groundY - 220} shift={200 + lt * 18} />
            <Path y={groundY} />
            <Person x={x} y={groundY} scale={s} phase={ph} walk={walkK} lean={0.1} poles={false} handOverride={hand} outfit={MARK} expression="happy" />
            {/* drinking tube from the pack, clipped to the strap */}
            <path d={`M${px},${py} Q${px + 40 * s},${py - 40 * s} ${mix(x + 24 * s, hx, 0.5)},${mix(py + 10 * s, hy, 0.5)} T${hx},${hy - 8}`} stroke="#2c4f63" strokeWidth={7} fill="none" strokeLinecap="round" />
            <circle cx={hx} cy={hy - 10} r={8} fill="#1f2a30" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Title text={"Here's\nthe fix."} t={t} t0={13.06} t1={14.15} top={200} size={160} />
      <Chip text="Water within reach" t={t} t0={14.24} x={80} y={380} icon="check" />
      <Readout label="SIP EVERY" value="15-20 MIN" ok={null} t={t} t0={16.03} x={80} y={480} pulseAt={16.03} />
      <Chip text="Thirsty or not" t={t} t0={18.35} x={80} y={700} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: finished strong (19.7 - 23.1) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1640;
  const ph = lt * 4.8;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={GOLDEN}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.25, 1.06], outExpo)}
        foreground={
          <g>
            <Woods y={groundY - 40} shift={lt * 50} n={8} />
            <Path y={groundY} base="#7a7a40" trail="#c2a47b" />
            <Person x={430} y={groundY + 50} scale={1.7} phase={ph} walk={1} lean={0.12} poles={false} handOverride={freeHand(ph, 1)} outfit={MARK} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Strong to\nthe last mile."} t={t} t0={off + 0.12} top={200} size={160} />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  void off;
  return (
    <EndCard
      lt={lt}
      photo="products/hydration-backpack-18l-card.jpg"
      spec="18L · HYDRATION SLEEVE · UNISEX"
      name={
        <>
          18L Hydration
          <br />
          Backpack
        </>
      }
      nameSize={100}
      shadowY={830}
      price="$54.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V24: React.FC = () => {
  void C;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={6.0} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={5.9} to={13.0}>
        <S2 off={5.9} />
      </Scene>
      <Scene from={12.9} to={19.8}>
        <S3 off={12.9} />
      </Scene>
      <Scene from={19.7} to={23.1} fadeIn={0.12}>
        <S4 off={19.7} />
      </Scene>
      <Scene from={23.0} to={30} fadeOut={0}>
        <S5 off={23.0} />
      </Scene>
      <Captions words={words} windows={[[0.3, 5.95, 900], [6.0, 12.9, 300], [14.15, 19.7, 1110]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
