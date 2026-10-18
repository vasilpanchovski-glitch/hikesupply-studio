import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, GUIDE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v25.json";

const words = vo.words as unknown as Word[];

const MORNING: Palette = {
  sky: ["#5d8fbe", "#bcd6e6", "#eef0e6"],
  sun: { x: 820, y: 540, r: 58, color: "#fffcec", glow: "#f8eec8" },
  layers: ["#a9bcc6", "#8ea4ac", "#71908a", "#577460", "#435a48"],
  mist: "#eef3f2",
};
const DEEP: Palette = {
  sky: ["#5f7286", "#a9b4b6", "#d8d8cc"],
  sun: { x: 260, y: 480, r: 50, color: "#f6f2e0", glow: "#dcd6bc" },
  layers: ["#8e9a98", "#76847e", "#5e6e62", "#4a5a4c", "#36443a"],
  mist: "#dfe2da",
};
const TRAILHEAD: Palette = {
  sky: ["#4f8cc0", "#b0d0e4", "#eef0e4"],
  sun: { x: 800, y: 500, r: 60, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#a8bcc8", "#8ca4b0", "#72908c", "#5a7458", "#475c46"],
  mist: "#eef3f2",
};

const EMMA: Outfit = {
  ...GUIDE,
  skin: "#EDC3A4",
  skinShade: "#D0A283",
  hair: "#6b3f22",
  ponytail: "#6b3f22",
  beard: null,
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#2F6E8C",
  jacketShade: "#24576F",
  pants: "#3E4650",
  pantsShade: "#2E353D",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};

const Forest: React.FC<{ y: number; shift: number; n?: number; c?: string; c2?: string }> = ({ y, shift, n = 8, c = "#36634a", c2 = "#254a37" }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const x = (((-120 + i * 190 - shift) % 1520) + 1520) % 1520 - 220;
      return <Pine key={i} x={x} y={y + (i % 2) * 18} h={460 + (i % 3) * 60} c={c} c2={c2} />;
    })}
  </g>
);
const Ground: React.FC<{ y: number; base?: string; trail?: string }> = ({ y, base = "#56703f", trail = "#b39a72" }) => (
  <g>
    <rect x={-300} y={y - 60} width={1700} height={700} fill={base} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={trail} />
  </g>
);

// Two trails splitting at a wooden signpost.
const Fork: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={-300} y={y - 60} width={1700} height={700} fill="#4e6338" />
    <path d={`M-300,${y + 10} Q300,${y - 10} 540,${y - 20} L540,${y + 90} Q300,${y + 90} -300,${y + 120} Z`} fill="#a68c66" />
    <path d={`M520,${y - 18} Q820,${y - 120} 1400,${y - 160} L1400,${y - 100} Q820,${y - 50} 560,${y + 20} Z`} fill="#a68c66" />
    <path d={`M520,${y} Q820,${y + 60} 1400,${y + 90} L1400,${y + 190} Q820,${y + 150} 540,${y + 90} Z`} fill="#a68c66" />
    <g transform={`translate(840,${y - 30})`}>
      <rect x={-8} y={-230} width={16} height={240} fill="#6b4a30" />
      <path d="M-6,-225 L120,-225 L150,-200 L120,-175 L-6,-175 Z" fill="#8a6440" />
      <path d="M6,-160 L-120,-160 L-150,-135 L-120,-110 L6,-110 Z" fill="#7a5636" />
    </g>
  </g>
);

const PhoneInHand: React.FC<{ x: number; y: number; s: number; glow?: number }> = ({ x, y, s, glow = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-11} y={-20} width={22} height={38} rx={4} fill="#1d1f1e" />
    <rect x={-8} y={-16} width={16} height={29} rx={2} fill={glow > 0 ? "#dfeef3" : "#3a4a50"} />
  </g>
);

// Chat bubbles on a big phone screen: the plan text, sent line by line.
const Bubble: React.FC<{ text: string; t: number; t0: number; me?: boolean }> = ({ text, t, t0, me = true }) => (
  <div
    style={{
      alignSelf: me ? "flex-end" : "flex-start",
      maxWidth: 560,
      padding: "14px 24px",
      borderRadius: 26,
      background: me ? "#3E8E5A" : "#e6e2d8",
      color: me ? "#fff" : C.ink,
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: 38,
      lineHeight: 1.2,
      opacity: at(t, [t0, t0 + 0.2], [0, 1]),
      translate: `0px ${at(t, [t0, t0 + 0.35], [30, 0], outExpo)}px`,
      scale: `${at(t, [t0, t0 + 0.35], [0.9, 1], outExpo)}`,
      transformOrigin: me ? "right bottom" : "left bottom",
    }}
  >
    {text}
  </div>
);

const ChatPhone: React.FC<{ t: number; t0: number }> = ({ t, t0 }) =>
  isClean() ? null : (
    <div
      style={{
        position: "absolute",
        left: 170,
        top: 330,
        width: 740,
        height: 700,
        borderRadius: 54,
        background: "#1d1f1e",
        padding: 18,
        boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
        opacity: at(t, [t0, t0 + 0.3], [0, 1]),
        scale: `${at(t, [t0, t0 + 0.5], [0.9, 1], outExpo)}`,
      }}
    >
      <div style={{ width: "100%", height: "100%", borderRadius: 40, background: "#f7f4ec", display: "flex", flexDirection: "column", padding: "22px 26px", gap: 16, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 12, borderBottom: "2px solid #e2ddd0" }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, background: "#B5553A", color: "#fff", fontFamily: HEAD, fontWeight: 800, fontSize: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>S</div>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 40, letterSpacing: 1, color: C.ink, textTransform: "uppercase" }}>Sister</div>
        </div>
        <Bubble text="Hiking Pine Ridge Trail today" t={t} t0={11.75} />
        <Bubble text="Parked at the north lot" t={t} t0={12.4} />
        <Bubble text="Back by 4 pm" t={t} t0={13.65} />
        <Bubble text="If I'm late, call the ranger station" t={t} t0={15.25} />
        <Bubble text="Got it. Text me when you're out" t={t} t0={17.1} me={false} />
      </div>
    </div>
  );

// ============ S1 HOOK: alone on the trail (0 - 3.3) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1660;
  const ph = t * 4.2;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={MORNING}
        camX={t * 30}
        zoom={mix(1.03, 1.08, t / 3.3)}
        foreground={
          <g>
            <Forest y={groundY - 60} shift={t * 40} />
            <Ground y={groundY} />
            <Person x={520} y={groundY + 40} scale={1.75} phase={ph} walk={0.9} lean={0.1} poles={false} handOverride={freeHand(ph, 0.9)} outfit={EMMA} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Nobody\nknew where\nshe was."} t={t} t0={0} top={160} size={124} />
      <Chip text="Quick solo hike" t={t} t0={1.55} x={80} y={570} icon="none" />
      <Chip text="Told no one" t={t} t0={2.25} x={80} y={670} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: wrong fork, no signal (3.2 - 8.3) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  const s = 1.7;
  const x = 380;
  const hand: [number, number] = [44, -96];
  const hx = x + hand[0] * s;
  const hy = groundY + 40 + s * (hand[1] - 182);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={DEEP}
        camX={30 + lt * 10}
        zoom={mix(1.02, 1.08, lt / 5)}
        foreground={
          <g>
            <Forest y={groundY - 170} shift={60 + lt * 10} c="#2f5440" c2="#203d2e" />
            <Fork y={groundY - 60} />
            <Person x={x} y={groundY + 40} scale={s} walk={0} lean={0.06} poles={false} handOverride={hand} outfit={EMMA} expression="tired" breathe={Math.sin(lt * 2.4) * 2} />
            <PhoneInHand x={hx} y={hy} s={s} glow={1} />
          </g>
        }
      />
      <Vignette strength={0.5} />
      <Scrim />
      <Chip text="Wrong fork" t={t} t0={4.2} x={80} y={480} icon="x" />
      <Readout label="PHONE" value="NO SIGNAL" ok={false} t={t} t0={5.45} x={80} y={590} pulseAt={5.45} />
      <Chip text="Nobody knows her plan" t={t} t0={6.42} x={80} y={830} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: text the plan before the hike (8.2 - 18.5) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1800;
  const s = 1.3;
  const x = 760;
  const hand: [number, number] = [44, -96];
  const hx = x + hand[0] * s;
  const hy = groundY + s * (hand[1] - 182);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={TRAILHEAD}
        camX={lt * 8}
        foreground={
          <g>
            <Forest y={groundY - 210} shift={140 + lt * 6} />
            <Ground y={groundY} base="#5f7a44" trail="#b8a27c" />
            <Car x={330} y={groundY + 30} s={1.6} body="#5F7F99" shade="#4A6478" />
            <Person x={x} y={groundY} scale={s} walk={0} lean={0.04} poles={false} handOverride={hand} outfit={EMMA} expression="happy" breathe={Math.sin(lt * 2) * 2} />
            <PhoneInHand x={hx} y={hy} s={s} glow={1} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={600} />
      <Title text={"Here's\nthe fix."} t={t} t0={8.35} t1={9.5} top={200} size={160} />
      <Chip text="Before every hike" t={t} t0={9.55} t1={11.4} x={80} y={200} icon="check" big />
      <ChatPhone t={t} t0={10.9} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: on the summit, plan sent (18.4 - 20.7) ============
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
            <Forest y={groundY - 40} shift={lt * 50} c="#2f4a3a" c2="#1f3428" />
            <Ground y={groundY} base="#6e6a3c" trail="#c2a47b" />
            <Person x={460} y={groundY + 50} scale={1.7} phase={ph} walk={1} lean={0.12} poles={false} handOverride={freeHand(ph, 1)} outfit={EMMA} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Someone\nalways knows."} t={t} t0={off + 0.12} top={200} size={150} />
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
      photo="products/solo-hiking-guide-card.jpg"
      spec="DIGITAL GUIDE · INSTANT PDF DOWNLOAD"
      name={
        <>
          Solo Hiking
          <br />
          Guide
        </>
      }
      nameSize={110}
      price="$7.99"
      save="Save this. Send it to a hiking friend"
    />
  );
};

export const V25: React.FC = () => {
  void C;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={3.3} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={3.2} to={8.3}>
        <S2 off={3.2} />
      </Scene>
      <Scene from={8.2} to={18.5}>
        <S3 off={8.2} />
      </Scene>
      <Scene from={18.4} to={20.7} fadeIn={0.12}>
        <S4 off={18.4} />
      </Scene>
      <Scene from={20.6} to={30} fadeOut={0}>
        <S5 off={20.6} />
      </Scene>
      <Captions words={words} windows={[[0.3, 3.25, 900], [3.25, 8.25, 300], [9.5, 18.45, 1090]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
