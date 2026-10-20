import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, JAKE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v33.json";

const words = vo.words as unknown as Word[];

const COOL: Palette = {
  sky: ["#6d8aa6", "#b9c8d2", "#e9ebe4"],
  sun: { x: 780, y: 540, r: 54, color: "#fbf8ec", glow: "#f2ecd0" },
  layers: ["#a9b3ba", "#919ea3", "#7b8a78", "#677556", "#525c42"],
  mist: "#e9eeea",
};
const GREY: Palette = {
  sky: ["#69737e", "#9aa5ad", "#c9ced0"],
  sun: { x: 780, y: 540, r: 54, color: "#d9dcdc", glow: "#c9cfd2" },
  layers: ["#9ba3a8", "#868f93", "#6f7a6c", "#5c6750", "#4a533e"],
  mist: "#d8dddd",
};
const BRIGHT: Palette = {
  sky: ["#5b8fc0", "#bdd5e3", "#f1f0e4"],
  sun: { x: 820, y: 480, r: 58, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#b7c3cb", "#9cadb4", "#82967f", "#6a7d5e", "#56684a"],
  mist: "#eef3f0",
};

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lerpC = (a: string, b: string, k: number) => {
  const A = hex(a);
  const B = hex(b);
  return "#" + A.map((v, i) => Math.round(mix(v, B[i], k)).toString(16).padStart(2, "0")).join("");
};

const BEN: Outfit = {
  ...JAKE,
  hair: "#6b4a2e",
  beard: null,
  cap: "#4A4E55",
  capShade: "#363A40",
  jacket: "#C8963E",
  jacketShade: "#A37828",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};
// Jeans: k = 0 dry, 1 soaked (darker).
const jeans = (k: number) => ({ pants: lerpC("#5b7fa8", "#2c4260", k), pantsShade: lerpC("#46668b", "#213249", k) });
const TRAIL = { pants: "#8a7f62", pantsShade: "#6e654d" };

const Woods: React.FC<{ y: number; shift: number; n?: number }> = ({ y, shift, n = 8 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const x = (((-120 + i * 190 - shift) % 1520) + 1520) % 1520 - 220;
      return i % 3 === 1 ? (
        <LeafTree key={i} x={x} y={y + 20} h={480} c="#C9822F" c2="#A8641F" />
      ) : (
        <Pine key={i} x={x} y={y + (i % 2) * 18} h={460 + (i % 3) * 60} c="#36634a" c2="#254a37" />
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
const Drizzle: React.FC<{ t: number; on: number }> = ({ t, on }) => (
  <g opacity={on} stroke="#e8eef4" strokeLinecap="round">
    {Array.from({ length: 70 }, (_, i) => {
      const x = ((i * 157) % 1180) - 50;
      const y = (((t * 1500 + i * 293) % 2100) + 2100) % 2100 - 100;
      return <line key={i} x1={x} y1={y} x2={x - 8} y2={y + 46} strokeWidth={3} opacity={0.35 + (i % 4) * 0.1} />;
    })}
  </g>
);

// Two fabric swatches in drizzle: cotton soaks, synthetic beads and dries.
const Swatches: React.FC<{ t: number }> = ({ t }) => {
  const wet = at(t, [9.6, 11.0], [0, 1]);
  const dry = at(t, [11.6, 13.6], [0, 1]);
  const stretch = at(t, [13.6, 14.1], [0, 1], outExpo) * at(t, [14.6, 15.0], [1, 0]);
  const label = { fontFamily: HEAD, fontWeight: 800, fontSize: 44, letterSpacing: 1 } as const;
  return (
    <svg width={920} height={520} viewBox="0 0 920 520">
      {/* cotton */}
      <text x={210} y={64} textAnchor="middle" fill={C.ink} style={label}>
        COTTON
      </text>
      <rect x={70} y={90} width={280} height={300} rx={22} fill={lerpC("#5b7fa8", "#2c4260", wet)} />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={70 + i * 24} y1={90} x2={70 + i * 24 + 40} y2={390} stroke="#fff" strokeWidth={2} opacity={0.12} />
      ))}
      <text x={210} y={450} textAnchor="middle" fill="#D9443A" style={{ ...label, fontSize: 38, opacity: wet }}>
        STAYS WET
      </text>
      {/* synthetic */}
      <text x={650} y={64} textAnchor="middle" fill={C.ink} style={label}>
        SYNTHETIC
      </text>
      <g transform={`translate(650,240) scale(${1 + stretch * 0.12},1) translate(-650,-240)`}>
        <rect x={510} y={90} width={280} height={300} rx={22} fill="#5a6a4a" />
        {Array.from({ length: 9 }, (_, i) => {
          const bx = 540 + (i % 3) * 90 + (i % 2) * 20;
          const by0 = 120 + Math.floor(i / 3) * 90;
          const roll = at(t, [10.4 + i * 0.12, 11.6 + i * 0.12], [0, 1]);
          return <ellipse key={i} cx={bx} cy={by0 + roll * 260} rx={14} ry={16} fill="#cfe6f6" opacity={at(t, [9.8 + i * 0.08, 10.1 + i * 0.08], [0, 0.9]) * (1 - dry)} />;
        })}
      </g>
      {stretch > 0.05 && (
        <g opacity={stretch} stroke={C.ink} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M470,240 L420,240 M440,215 L415,240 L440,265" />
          <path d="M830,240 L880,240 M860,215 L885,240 L860,265" />
        </g>
      )}
      <text x={650} y={450} textAnchor="middle" fill="#3E8E5A" style={{ ...label, fontSize: 38, opacity: dry }}>
        DRIES AS YOU WALK
      </text>
    </svg>
  );
};

// ============ S1 HOOK: jeans on a cool fall hike (0 - 2.5) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1680;
  const ph = t * 4.4;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={COOL}
        camX={t * 20}
        zoom={mix(1.03, 1.08, t / 2.5)}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={t * 60} />
            <Ground y={groundY} />
            <Person x={560} y={groundY + 40} scale={1.7} phase={ph} walk={0.9} lean={0.1} poles={false} handOverride={freeHand(ph, 0.9)} outfit={{ ...BEN, ...jeans(0) }} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"What pants\nto wear hiking?\nNot jeans."} t={t} t0={0} top={150} size={124} />
      <Chip text="Jeans" t={t} t0={0.75} x={80} y={570} icon="none" />
      <Chip text="Cool fall hike" t={t} t0={1.4} x={80} y={670} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: drizzle soaks the cotton (2.45 - 7.2) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const wet = at(t, [3.0, 5.0], [0, 1]);
  const groundY = 1720;
  const ph = lt * (t > 5.2 ? 2.8 : 4.0);
  const walk = t > 5.2 ? 0.5 : 0.8;
  const shiver = t > 5.3 ? Math.sin(t * 50) * 2.5 : 0;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={GREY}
        camX={30 + lt * 10}
        zoom={mix(1.02, 1.08, lt / 4.7)}
        foreground={
          <g>
            <Woods y={groundY - 120} shift={300 + lt * 30} n={7} />
            <Ground y={groundY} base="#55603a" trail="#8f7c5e" />
            <Person x={560 + shiver} y={groundY + 40} scale={1.6} phase={ph} walk={walk} lean={0.12} poles={false} handOverride={freeHand(ph, walk)} outfit={{ ...BEN, ...jeans(wet) }} expression={t > 4.4 ? "tired" : "neutral"} light={0.9} />
            <Drizzle t={t} on={at(t, [2.5, 2.9], [0, 1])} />
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim />
      <Readout label="COTTON JEANS" value="SOAKED" ok={false} t={t} t0={3.41} x={80} y={420} pulseAt={3.41} />
      <Chip text="Cold and heavy for hours" t={t} t0={5.3} x={80} y={650} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: what to wear instead (7.15 - 20.2) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1830;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={COOL}
        camX={lt * 6}
        foreground={
          <g>
            <Woods y={groundY - 200} shift={600 + lt * 6} />
            <Ground y={groundY} />
            <Person x={720} y={groundY} scale={1.5} walk={0} lean={0.06} poles={false} handOverride={[30, 34]} outfit={{ ...BEN, ...TRAIL }} expression="happy" breathe={Math.sin(t * 2.4) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={600} />
      <Title text={"What to wear\ninstead."} t={t} t0={7.25} t1={9.25} top={200} size={150} />
      {!isClean() && (
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            top: 330,
            height: 560,
            borderRadius: 30,
            background: "#fff",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            overflow: "hidden",
            opacity: at(t, [9.2, 9.5], [0, 1]),
            scale: `${at(t, [9.2, 9.7], [0.92, 1], outExpo)}`,
            display: "flex",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <Swatches t={t} />
        </div>
      )}
      <Chip text="Quick-dry synthetic" t={t} t0={10.32} t1={13.55} x={80} y={200} icon="check" big />
      <Chip text="Stretch for big steps" t={t} t0={13.63} t1={15.0} x={80} y={200} icon="check" big />
      <Chip text="Leggings: dry days" t={t} t0={15.07} t1={16.72} x={80} y={200} icon="check" big />
      <Chip text="Convertible: warmer days" t={t} t0={16.79} t1={18.85} x={80} y={200} icon="check" big />
      <Chip text="Skip cotton" t={t} t0={18.9} x={80} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: sheds the drizzle, dries while walking (20.15 - 25.8) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  const ph = lt * 4.6;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={BRIGHT}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.22, 1.06], outExpo)}
        foreground={
          <g>
            <Woods y={groundY - 40} shift={lt * 50} />
            <Ground y={groundY} base="#6c7448" trail="#c2a47b" />
            <Person x={560} y={groundY + 40} scale={1.6} phase={ph} walk={1} lean={0.12} poles={false} handOverride={freeHand(ph, 1)} outfit={{ ...BEN, ...TRAIL }} expression="happy" />
            <Drizzle t={t} on={at(t, [20.2, 21.0, 22.2, 23.0], [0.8, 0.8, 0.8, 0])} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Dry while\nhe walks."} t={t} t0={off + 0.12} top={200} size={160} />
      <Chip text="Quick-dry trail pants" t={t} t0={20.82} x={80} y={560} icon="check" />
      <Chip text="Real rain? Add a rain shell" t={t} t0={23.53} x={80} y={660} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/cool-touch-trail-pants-mens-card.jpg"
      spec="MEN'S · QUICK-DRY · 4 COLOURS"
      name={
        <>
          Cool-Touch
          <br />
          Trail Pants
        </>
      }
      nameSize={100}
      price="$64.99"
      save="Save this before your next hike"
    />
  );
};

export const V33: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={2.5} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={2.45} to={7.2}>
        <S2 off={2.45} />
      </Scene>
      <Scene from={7.1} to={20.25}>
        <S3 off={7.1} />
      </Scene>
      <Scene from={20.15} to={25.8} fadeIn={0.12}>
        <S4 off={20.15} />
      </Scene>
      <Scene from={25.7} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions words={words} windows={[[0.3, 2.45, 900], [2.45, 7.1, 760], [9.25, 20.15, 1050], [20.15, 25.7, 780]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
