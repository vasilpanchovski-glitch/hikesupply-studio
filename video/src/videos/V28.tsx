import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, JAKE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v28.json";

const words = vo.words as unknown as Word[];

const FOREST: Palette = {
  sky: ["#5a92c2", "#b8d4e4", "#eef0e2"],
  sun: { x: 780, y: 560, r: 58, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#a6b8c4", "#8aa0ac", "#6e8c86", "#577254", "#455a44"],
  mist: "#eef3f2",
};
const RIDGE: Palette = {
  sky: ["#5d7a92", "#a9bccb", "#dfe6ea"],
  sun: { x: 820, y: 470, r: 50, color: "#f4f6f6", glow: "#d8e2e8" },
  layers: ["#b4c2cc", "#98a8b4", "#7e8e98", "#66747c", "#525e64"],
  mist: "#e6ecef",
};

// Tom in a t-shirt (jacket left in the car).
const TOM: Outfit = {
  ...JAKE,
  jacket: "#B8473A",
  jacketShade: "#93362B",
  hair: "#3a2a20",
  beard: "#4a3528",
  cap: "#2F3B45",
  capShade: "#222c34",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};
// Tom in the packable shell (colour of the store windbreaker).
const TOM_SHELL: Outfit = { ...TOM, jacket: "#6E8C8E", jacketShade: "#566F71" };

const Trees: React.FC<{ y: number; shift: number; n?: number }> = ({ y, shift, n = 8 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const x = (((-120 + i * 190 - shift) % 1520) + 1520) % 1520 - 220;
      return <Pine key={i} x={x} y={y + (i % 2) * 18} h={460 + (i % 3) * 60} c="#36634a" c2="#254a37" />;
    })}
  </g>
);
const Ground: React.FC<{ y: number; base?: string; trail?: string }> = ({ y, base = "#5f7a44", trail = "#c0a67e" }) => (
  <g>
    <rect x={-300} y={y - 60} width={1700} height={700} fill={base} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={trail} />
  </g>
);

// Open rocky ridge top: no trees, grass and stones.
const RidgeTop: React.FC<{ y: number; shift: number; base?: string; rock?: string }> = ({ y, shift, base = "#7b8466", rock = "#9a9a90" }) => (
  <g>
    <path d={`M-300,${y - 40} Q300,${y - 90} 700,${y - 60} Q1000,${y - 40} 1400,${y - 20} L1400,2100 L-300,2100 Z`} fill={base} />
    <path d={`M-300,${y + 10} Q540,${y - 14} 1400,${y + 14} L1400,${y + 100} Q540,${y + 80} -300,${y + 110} Z`} fill="#b3a68a" />
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const x = (((i * 260 - shift) % 1560) + 1560) % 1560 - 240;
      const s = 0.7 + (i % 3) * 0.25;
      return (
        <g key={i} transform={`translate(${x},${y + 150 + (i % 2) * 40}) scale(${s})`}>
          <path d="M-60,0 Q-50,-48 -6,-56 Q40,-52 60,0 Z" fill={rock} />
          <path d="M-6,-56 Q40,-52 60,0 L10,0 Z" fill="rgba(0,0,0,0.12)" />
        </g>
      );
    })}
  </g>
);

// Wind streaks blowing right to left.
const Wind: React.FC<{ t: number; k?: number; n?: number }> = ({ t, k = 1, n = 14 }) => (
  <g opacity={0.75 * k}>
    {Array.from({ length: n }, (_, i) => {
      const y = 520 + ((i * 137) % 1200);
      const speed = 1500 + (i % 4) * 300;
      const len = 160 + (i % 3) * 90;
      const x = 1300 - ((((t + i * 0.37) * speed) % 1900) + 1900) % 1900;
      const wave = Math.sin(t * 6 + i) * 10;
      return (
        <path
          key={i}
          d={`M${x},${y + wave} q${len * 0.3},-14 ${len * 0.6},0 t${len * 0.4},0`}
          stroke="#fff"
          strokeWidth={5 - (i % 3)}
          strokeLinecap="round"
          fill="none"
          opacity={0.35 + (i % 3) * 0.2}
        />
      );
    })}
  </g>
);

// Packed windbreaker: small stuff sack, the same colour as the shell.
const ShellPouch: React.FC<{ x: number; y: number; s: number; o: number }> = ({ x, y, s, o }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
    <rect x={-30} y={-40} width={60} height={82} rx={18} fill="#6E8C8E" />
    <rect x={-30} y={-40} width={60} height={18} rx={9} fill="#566F71" />
    <path d="M-6,-40 Q0,-58 6,-40" stroke="#2a2a2a" strokeWidth={4} fill="none" />
  </g>
);

// ============ S1 HOOK: mild in the forest, jacket left in the car (0 - 4.35) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1660;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={FOREST}
        camX={t * 18}
        zoom={mix(1.03, 1.08, t / 4.35)}
        foreground={
          <g>
            <Trees y={groundY - 60} shift={t * 22} />
            <Ground y={groundY} />
            <Car x={250} y={groundY + 70} s={1.6} body="#4f6f8c" shade="#3c5670" />
            <Person x={680} y={groundY + 50} scale={1.75} walk={0} lean={0.04} poles={false} handOverride={[20, 36]} outfit={TOM} expression="happy" breathe={Math.sin(t * 2.4) * 2} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"This is why\nthe ridge\nfeels freezing."} t={t} t0={0} top={150} size={118} />
      <Chip text="Mild in the forest" t={t} t0={1.41} x={80} y={560} icon="none" />
      <Chip text="Jacket left in the car" t={t} t0={2.92} x={80} y={660} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: the open ridge, wind, cold sweaty shirt (4.3 - 13.7) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  const walking = at(t, [7.1, 7.7], [1, 0]);
  const ph = lt * 4.2 * walking + 2;
  const shiver = t > 7.4 ? Math.sin(t * 55) * 3.5 : 0;
  const hugging = at(t, [7.4, 7.9], [0, 1]);
  const hand = freeHand(ph, walking);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={RIDGE}
        camX={30 + lt * 10}
        zoom={mix(1.02, 1.08, lt / 9.4)}
        foreground={
          <g>
            <RidgeTop y={groundY} shift={lt * 40 * (0.3 + walking)} />
            <Wind t={t} k={at(t, [6.8, 7.3], [0.25, 1])} />
            <Person
              x={560 + shiver}
              y={groundY + 40}
              scale={1.6}
              phase={ph}
              walk={walking}
              lean={mix(0.08, -0.06, hugging)}
              poles={false}
              handOverride={[mix(hand[0], 46, hugging), mix(hand[1], -62, hugging)]}
              outfit={TOM}
              expression={t > 7.3 ? "tired" : "neutral"}
            />
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim />
      <Readout label="OPEN RIDGE" value="WINDY" ok={false} t={t} t0={7.25} x={80} y={420} pulseAt={7.25} />
      <Chip text="Sweaty shirt" t={t} t0={8.86} x={80} y={650} icon="x" />
      <Chip text="Cold in seconds" t={t} t0={10.07} x={80} y={750} icon="x" />
      <Chip text="Wind pulls heat fast" t={t} t0={11.34} x={80} y={850} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: carry a light windbreaker (13.6 - 21.8) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1840;
  const ph = lt * 4.2;
  // Before 18.7 the shell is still in its pouch; it goes on as he reaches the open ground.
  const on = t > 18.8;
  const pouch = at(t, [15.6, 16.0], [0, 1]) * at(t, [18.5, 18.8], [1, 0]);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={RIDGE}
        camX={lt * 14}
        foreground={
          <g>
            <RidgeTop y={groundY} shift={lt * 60} />
            <Wind t={t} k={0.8} n={10} />
            <Person
              x={540}
              y={groundY}
              scale={1.3}
              phase={ph}
              walk={0.8}
              lean={0.1}
              poles={false}
              handOverride={pouch > 0.05 ? [44, -10] : freeHand(ph, 0.8)}
              outfit={on ? TOM_SHELL : TOM}
              expression={on ? "happy" : "neutral"}
            />
            <ShellPouch x={540 + 50 * 1.3} y={groundY - 182 * 1.3 + 6 * 1.3} s={1.3} o={pouch} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={700} />
      <Title text={"Here's\nthe fix."} t={t} t0={13.75} t1={14.9} top={200} size={160} />
      <Chip text="Carry a light windbreaker" t={t} t0={14.94} x={80} y={200} icon="check" big />
      <Chip text="Packs small" t={t} t0={16.68} x={80} y={340} icon="check" />
      <Chip text="Blocks the wind" t={t} t0={17.53} x={80} y={440} icon="check" />
      <Chip text="On at the open ground" t={t} t0={19.34} x={80} y={540} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: the next ridge, comfortable (21.75 - 24.0) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  const ph = lt * 4.8;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={GOLDEN}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.22, 1.06])}
        foreground={
          <g>
            <RidgeTop y={groundY} shift={lt * 70} base="#8a7c52" rock="#a89a80" />
            <Wind t={t} k={0.45} n={8} />
            <Person x={560} y={groundY + 40} scale={1.6} phase={ph} walk={1} lean={0.12} poles={false} handOverride={freeHand(ph, 1)} outfit={TOM_SHELL} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Warm on\nthe ridge."} t={t} t0={off + 0.12} top={200} size={170} />
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
      photo="products/packable-upf50-windbreaker-unisex-card.jpg"
      spec="PACKS INTO ITS OWN POUCH · UPF 50+"
      name={
        <>
          Packable
          <br />
          Windbreaker
        </>
      }
      nameSize={96}
      price="$29.99"
      save="Save this before your next ridge hike"
    />
  );
};

export const V28: React.FC = () => {
  void C;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={4.4} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={4.3} to={13.7}>
        <S2 off={4.3} />
      </Scene>
      <Scene from={13.6} to={21.8}>
        <S3 off={13.6} />
      </Scene>
      <Scene from={21.7} to={24.0} fadeIn={0.12}>
        <S4 off={21.7} />
      </Scene>
      <Scene from={23.9} to={30} fadeOut={0}>
        <S5 off={23.9} />
      </Scene>
      <Captions words={words} windows={[[0.3, 4.35, 900], [4.35, 13.65, 300], [14.9, 21.7, 1150]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
