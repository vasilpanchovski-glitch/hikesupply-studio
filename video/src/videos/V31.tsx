import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, GUIDE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v31.json";

const words = vo.words as unknown as Word[];

const FALL: Palette = {
  sky: ["#4f86b6", "#b2cfe0", "#efeedf"],
  sun: { x: 800, y: 520, r: 58, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#adb9c2", "#93a3a8", "#7c8c78", "#677556", "#525c42"],
  mist: "#eef1ec",
};

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lerpC = (a: string, b: string, k: number) => {
  const A = hex(a);
  const B = hex(b);
  return "#" + A.map((v, i) => Math.round(mix(v, B[i], k)).toString(16).padStart(2, "0")).join("");
};
// Late afternoon sliding toward sunset: k 0 = mid afternoon, 1 = sun on the ridge.
const dusk = (k: number): Palette => ({
  sky: [lerpC("#5a88b4", "#3d4f7a", k), lerpC("#bcd2df", "#d79a72", k), lerpC("#f0ecdc", "#f2c48e", k)],
  sun: { x: 820, y: mix(560, 1010, k), r: 62, color: lerpC("#fffbe8", "#ffd9a0", k), glow: lerpC("#fff0b8", "#ff9f5a", k) },
  layers: [lerpC("#aab4bd", "#8a8796", k), lerpC("#93a0a6", "#6f6d7c", k), lerpC("#7c8a76", "#5c5f5c", k), lerpC("#66734f", "#4a4f3e", k), lerpC("#525c42", "#3a3e30", k)],
  mist: lerpC("#eef1ec", "#f0cfae", k),
});

const EMMA: Outfit = {
  ...GUIDE,
  skin: "#E8B996",
  skinShade: "#CC9A76",
  hair: "#5b3a24",
  ponytail: "#5b3a24",
  beard: null,
  cap: "#C9B48E",
  capShade: "#A8946F",
  jacket: "#8E5A7A",
  jacketShade: "#6F4560",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};

const Woods: React.FC<{ y: number; shift: number; n?: number; dim?: number }> = ({ y, shift, n = 8, dim = 0 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const x = (((-120 + i * 190 - shift) % 1520) + 1520) % 1520 - 220;
      return i % 3 === 1 ? (
        <LeafTree key={i} x={x} y={y + 20} h={480} c={lerpC("#C9822F", "#8a5a2c", dim)} c2={lerpC("#A8641F", "#6e4420", dim)} />
      ) : (
        <Pine key={i} x={x} y={y + (i % 2) * 18} h={460 + (i % 3) * 60} c={lerpC("#36634a", "#26402f", dim)} c2={lerpC("#254a37", "#1a3024", dim)} />
      );
    })}
  </g>
);
const Ground: React.FC<{ y: number; base?: string; trail?: string }> = ({ y, base = "#62703f", trail = "#b39a72" }) => (
  <g>
    <rect x={-300} y={y - 60} width={1700} height={700} fill={base} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={trail} />
  </g>
);

// Wind streaks drifting across the scene.
const Wind: React.FC<{ t: number; on: number }> = ({ t, on }) => (
  <g opacity={on} stroke="#fff" strokeLinecap="round" fill="none">
    {Array.from({ length: 9 }, (_, i) => {
      const y = 380 + ((i * 173) % 1100);
      const x = ((t * (520 + i * 40) + i * 260) % 1600) - 300;
      return <path key={i} d={`M${x},${y} q120,-18 240,0 t180,6`} strokeWidth={5} opacity={0.35 + (i % 3) * 0.12} />;
    })}
  </g>
);

// ============ S1 HOOK: three-hour fall day hike (0 - 3.0) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1680;
  const ph = t * 4.4;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={FALL}
        camX={t * 20}
        zoom={mix(1.03, 1.08, t / 3)}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={t * 60} />
            <Ground y={groundY} />
            <Person x={560} y={groundY + 40} scale={1.7} phase={ph} walk={0.9} lean={0.1} poles={false} handOverride={freeHand(ph, 0.9)} outfit={EMMA} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Water and\na phone isn't\nenough."} t={t} t0={0} top={150} size={124} />
      <Chip text="Fall day hike" t={t} t0={0.73} x={80} y={570} icon="none" />
      <Chip text="Planned: 3 hours" t={t} t0={2.16} x={80} y={670} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: wrong turn, sun dropping, wind (2.95 - 8.95) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const k = at(t, [5.6, 8.9], [0, 1]);
  const groundY = 1720;
  const ph = lt * (t > 6.6 ? 3.0 : 4.2);
  const walk = t > 6.6 ? 0.55 : 0.85;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={dusk(k)}
        camX={30 + lt * 10}
        zoom={mix(1.02, 1.08, lt / 6)}
        foreground={
          <g>
            <Woods y={groundY - 120} shift={300 + lt * 30} n={7} dim={k} />
            <Ground y={groundY} base={lerpC("#6c7448", "#4b5034", k)} trail={lerpC("#b39a72", "#8a765a", k)} />
            <Person x={560} y={groundY + 40} scale={1.6} phase={ph} walk={walk} lean={t > 7.5 ? 0.02 : 0.14} poles={false} handOverride={t > 7.5 ? [40, -10] : freeHand(ph, walk)} outfit={EMMA} expression={t > 5.2 ? "tired" : "neutral"} light={mix(1, 0.8, k)} />
            <Wind t={t} on={at(t, [7.5, 7.9], [0, 1])} />
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim />
      <Readout label="PACKED" value="WATER + PHONE" ok={false} t={t} t0={3.22} t1={5.15} x={80} y={420} pulseAt={3.22} />
      <Chip text="Wrong turn: +2 hours" t={t} t0={5.27} x={80} y={420} icon="x" />
      <Chip text="Sun dropping" t={t} t0={6.77} x={80} y={520} icon="x" />
      <Chip text="Wind picking up" t={t} t0={7.6} x={80} y={620} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: the Ten Essentials (8.9 - 21.5) ============
const ITEMS: [string, number][] = [
  ["Navigation", 12.38],
  ["Headlamp", 13.52],
  ["Sun protection", 14.14],
  ["First aid", 15.09],
  ["Knife", 15.96],
  ["Fire starter", 16.43],
  ["Shelter", 17.43],
  ["Extra food", 19.44],
  ["Extra water", 19.92],
  ["Extra clothes", 20.52],
];
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1830;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={FALL}
        camX={lt * 6}
        foreground={
          <g>
            <Woods y={groundY - 200} shift={600 + lt * 6} />
            <Ground y={groundY} />
            <Person x={720} y={groundY} scale={1.5} walk={0} lean={0.06} poles={false} handOverride={[34, 30]} outfit={EMMA} expression="happy" breathe={Math.sin(t * 2.4) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={900} />
      <Title text={"Here's\nthe fix."} t={t} t0={9.0} t1={10.1} top={200} size={160} />
      <Chip text="The Ten Essentials. Every time." t={t} t0={10.16} x={60} y={190} icon="check" big />
      {ITEMS.map(([label, t0], i) => (
        <Chip key={label} text={label} t={t} t0={t0} x={i < 5 ? 60 : 560} y={330 + (i % 5) * 110} icon="check" />
      ))}
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: a wrong turn is just a longer day (21.45 - 25.2) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  const ph = lt * 4.6;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={GOLDEN}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.22, 1.06], outExpo)}
        foreground={
          <g>
            <Woods y={groundY - 40} shift={lt * 50} />
            <Ground y={groundY} base="#7a7a40" trail="#c2a47b" />
            <Person x={560} y={groundY + 40} scale={1.6} phase={ph} walk={1} lean={0.12} poles={false} handOverride={freeHand(ph, 1)} outfit={EMMA} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Just a\nlonger day."} t={t} t0={off + 0.12} top={200} size={160} />
      <Chip text="Ten Essentials in the pack" t={t} t0={22.34} x={80} y={570} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/ultimate-hiking-packing-checklist-card.jpg"
      spec="SIX PACKING LISTS · DIGITAL DOWNLOAD"
      name={
        <>
          Ultimate Hiking
          <br />
          Packing Checklist
        </>
      }
      nameSize={84}
      price="$4.99"
      save="Save this before your next hike"
    />
  );
};

export const V31: React.FC = () => {
  void C;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={3.05} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={2.95} to={9.0}>
        <S2 off={2.95} />
      </Scene>
      <Scene from={8.9} to={21.55}>
        <S3 off={8.9} />
      </Scene>
      <Scene from={21.45} to={25.25} fadeIn={0.12}>
        <S4 off={21.45} />
      </Scene>
      <Scene from={25.15} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions words={words} windows={[[0.3, 3.0, 900], [3.0, 8.9, 760], [10.1, 21.45, 1000], [21.45, 25.15, 700]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
