import React from "react";
import { AbsoluteFill } from "remotion";
import { hikerTransform, HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v38.json";

const words = vo.words as unknown as Word[];

const RIDGE: Palette = {
  sky: ["#4f6f92", "#a9bccb", "#e4e6e2"],
  sun: { x: 780, y: 600, r: 52, color: "#fffbef", glow: "#f6efd6" },
  layers: ["#b9c4cc", "#9eadb7", "#86969a", "#6f7f7c", "#5d6b66"],
  mist: "#eef2f3",
};
const SUMMIT: Palette = {
  sky: ["#3f73a8", "#b5d0e4", "#f4efdc"],
  sun: { x: 820, y: 760, r: 60, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#b7c3cb", "#9cadb4", "#8a9790", "#74827a", "#5f6c64"],
  mist: "#eef3f0",
};

const LUKE: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#BB8262",
  hair: "#2a1c14",
  beard: "#2a1c14",
  cap: "#B5553A",
  capShade: "#8E3F2A",
  jacket: "#3E5F4B",
  jacketShade: "#2E4A39",
  pack: "#3E4F5C",
  packShade: "#2C3943",
};

const WATER = "#4f97cf";
const ICE = "#eaf5fb";

// Drink tube drawn in the hiker's own coordinates. mode: sip = to the mouth, hang = over the shoulder strap, tuck = under the jacket.
const Tube: React.FC<{ p: HikerProps; mode: "sip" | "hang" | "tuck"; ice: number }> = ({ p, mode, ice }) => {
  const d =
    mode === "sip"
      ? "M-30,-128 Q6,-112 30,-128 Q42,-136 46,-146"
      : mode === "hang"
        ? "M-30,-128 Q8,-118 20,-104 Q26,-94 26,-82"
        : "M-30,-128 Q6,-118 16,-104 Q22,-94 22,-82";
  const valve = mode === "sip" ? [46, -150] : [26, -80];
  const col = ice > 0.5 ? ICE : WATER;
  return (
    <g transform={hikerTransform(p)} opacity={mode === "tuck" ? 0.45 : 1}>
      <path d={d} stroke="#2b3a44" strokeWidth={13} fill="none" strokeLinecap="round" />
      <path d={d} stroke={col} strokeWidth={8} fill="none" strokeLinecap="round" />
      <rect x={valve[0] - 6} y={valve[1] - 4} width={12} height={16} rx={5} fill="#3a7fb8" />
    </g>
  );
};

// White info card: the bladder and its drink tube. water = how much of the tube holds water (0..1), ice = frozen (0..1).
const TubeCard: React.FC<{ t: number; t0: number; t1?: number; water: number; ice: number; bubbles?: number; warm?: number }> = ({ t, t0, t1 = 999, water, ice, bubbles = 0, warm = 0 }) => {
  if (isClean()) return null;
  const tube = "M260,330 Q300,410 400,390 Q560,360 640,250 Q690,180 780,170";
  const o = at(t, [t0, t0 + 0.3], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]);
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 440,
        height: 470,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        overflow: "hidden",
        opacity: o,
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <svg width={920} height={470} viewBox="0 0 920 470">
        {/* bladder */}
        <rect x={120} y={60} width={200} height={300} rx={34} fill="#d8eef2" stroke="#9cc3cc" strokeWidth={4} />
        <rect x={124} y={130} width={192} height={226} rx={30} fill={warm > 0 ? "#79b4d8" : "#8cc6e4"} />
        <circle cx={220} cy={92} r={26} fill="#2F62B0" />
        {Array.from({ length: 6 }, (_, i) => {
          const k = ((bubbles * 1.6 + i * 0.17) % 1 + 1) % 1;
          return <circle key={i} cx={170 + i * 22} cy={330 - k * 180} r={7 - (i % 3)} fill="#fff" opacity={bubbles > 0 ? 0.8 * (1 - k) : 0} />;
        })}
        {warm > 0 &&
          [0, 1, 2].map((i) => (
            <path key={i} d={`M${180 + i * 30},${50 - ((t * 40 + i * 12) % 30)} q10,-12 0,-24`} stroke="#d9a07e" strokeWidth={4} fill="none" opacity={warm * 0.7} />
          ))}
        {/* tube */}
        <path d={tube} stroke="#c9d6dc" strokeWidth={30} fill="none" strokeLinecap="round" />
        <path d={tube} stroke="#f4f8fa" strokeWidth={20} fill="none" strokeLinecap="round" />
        <path d={tube} pathLength={1} strokeDasharray={`${water} 1`} stroke={ice > 0.5 ? ICE : WATER} strokeWidth={20} fill="none" strokeLinecap="butt" />
        {ice > 0 &&
          Array.from({ length: 9 }, (_, i) => {
            const pts = [
              [300, 395],
              [360, 394],
              [430, 384],
              [500, 368],
              [560, 340],
              [610, 296],
              [650, 238],
              [700, 192],
              [750, 172],
            ][i];
            return (
              <g key={i} transform={`translate(${pts[0]},${pts[1]}) rotate(${i * 25})`} opacity={at(ice, [i / 12, i / 12 + 0.3], [0, 1])}>
                <path d="M-9,0 H9 M0,-9 V9 M-6,-6 L6,6 M-6,6 L6,-6" stroke="#7fb0cf" strokeWidth={2.5} />
              </g>
            );
          })}
        <rect x={772} y={156} width={44} height={28} rx={12} fill="#3a7fb8" />
        <text x={220} y={420} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={30} letterSpacing={3} fill="#6b6b66">
          BLADDER
        </text>
        <text x={700} y={110} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={30} letterSpacing={3} fill="#6b6b66">
          DRINK TUBE
        </text>
      </svg>
    </div>
  );
};

const Rocks: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <path d={`M-300,${y - 40} L120,${y - 70} L380,${y - 50} L700,${y - 80} L1000,${y - 55} L1400,${y - 70} L1400,${y + 700} L-300,${y + 700} Z`} fill="#7d8580" />
    <path d={`M-300,${y - 10} L1400,${y - 20} L1400,${y + 700} L-300,${y + 700} Z`} fill="#6c746f" />
    {Array.from({ length: 7 }, (_, i) => (
      <path key={i} d={`M${-40 + i * 170},${y + 60 + (i % 2) * 40} l40,-30 l50,10 l20,30 Z`} fill="#5b625e" />
    ))}
  </g>
);
const Wind: React.FC<{ t: number; o?: number }> = ({ t, o = 0.6 }) => (
  <g>
    {Array.from({ length: 9 }, (_, i) => {
      const x = ((t * 700 + i * 260) % 1600) - 300;
      const y = 600 + ((i * 173) % 900);
      return <path key={i} d={`M${x},${y} q90,-14 180,0`} stroke="#fff" strokeWidth={4} fill="none" opacity={o * 0.6} strokeLinecap="round" />;
    })}
  </g>
);

// ============ S1 HOOK: two liters on his back, not a drop (0 - 3.8) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1700;
  const p: HikerProps = { x: 560, y: groundY + 40, scale: 1.7, walk: 0, lean: 0.06, poles: false, handOverride: [44, -118] };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={RIDGE}
        camX={t * 14}
        zoom={mix(1.03, 1.08, t / 3.8)}
        foreground={
          <g>
            <Rocks y={groundY} />
            <Wind t={t} o={0.5} />
            <Person {...p} outfit={LUKE} expression={t > 2.6 ? "tired" : "neutral"} />
            <Tube p={p} mode="sip" ice={1} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"His water\nfroze in\nthe tube."} t={t} t0={0} top={150} size={150} />
      <Chip text="2 liters on his back" t={t} t0={0.81} x={80} y={630} icon="none" />
      <Chip text="Not a drop" t={t} t0={2.85} x={80} y={730} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: cold windy ridge, the water in the tube freezes (3.75 - 8.9) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1760;
  const ph = lt * 3.4;
  const ice = at(t, [6.4, 7.95], [0, 1]);
  const walk = t < 7.4 ? 0.7 : 0;
  const p: HikerProps = { x: 560, y: groundY + 30, scale: 1.45, phase: ph, walk, lean: walk ? 0.12 : 0.06, poles: false, handOverride: walk ? freeHand(ph, walk) : [44, -118] };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={RIDGE}
        camX={lt * 18}
        zoom={mix(1.02, 1.07, lt / 5.15)}
        foreground={
          <g>
            <Rocks y={groundY} />
            <Wind t={t} />
            <Person {...p} outfit={LUKE} expression={walk ? "neutral" : "tired"} />
            <Tube p={p} mode={walk ? "hang" : "sip"} ice={ice} />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim />
      <Chip text="Cold, windy ridge" t={t} t0={4.19} t1={7.5} x={80} y={220} icon="none" />
      <Readout label="WATER IN THE TUBE" value="FROZEN" ok={false} t={t} t0={7.58} x={80} y={190} pulseAt={7.58} />
      <TubeCard t={t} t0={5.45} water={1} ice={ice} />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: blow it back, tuck the tube, warm water (8.85 - 20.05) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1840;
  const water = at(t, [11.07, 12.9], [1, 0]);
  const tuck = t >= 14.75;
  const sip = t >= 9.89 && t < 11.0;
  const p: HikerProps = { x: 720, y: groundY, scale: 1.5, walk: 0, lean: 0.06, poles: false, handOverride: sip || (t >= 11.0 && t < 12.9) ? [44, -118] : [30, 34], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={RIDGE}
        camX={lt * 6}
        foreground={
          <g>
            <Rocks y={groundY} />
            <Wind t={t} o={0.35} />
            <Person {...p} outfit={LUKE} expression="happy" />
            <Tube p={p} mode={tuck ? "tuck" : t >= 9.89 && t < 12.9 ? "sip" : "hang"} ice={0} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={600} />
      <Title text={"Here's\nthe fix."} t={t} t0={8.95} t1={10.0} top={200} size={160} />
      <TubeCard t={t} t0={9.85} t1={14.7} water={t < 10.68 ? 0.25 : water} ice={0} bubbles={t > 11.07 && t < 13.2 ? t : 0} />
      <Chip text="After every sip" t={t} t0={10.19} t1={11.0} x={80} y={220} icon="none" big />
      <Chip text="Blow the water back" t={t} t0={11.07} t1={14.6} x={80} y={220} icon="check" big />
      <Readout label="DRINK TUBE" value="EMPTY" ok={true} t={t} t0={13.75} t1={14.6} x={520} y={190} />
      <Chip text="Tube under your jacket" t={t} t0={14.75} t1={17.5} x={80} y={220} icon="check" big />
      <Chip text="Close to your body" t={t} t0={16.37} t1={17.5} x={80} y={330} icon="check" big />
      <Chip text="Fill with warm water" t={t} t0={17.78} x={80} y={220} icon="check" big />
      <Chip text="Not hot" t={t} t0={19.21} x={80} y={330} icon="x" big />
      <TubeCard t={t} t0={17.7} water={0} ice={0} warm={1} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: sipping all the way to the top (20.0 - 22.1) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  const ph = lt * 4.2;
  const sip = lt > 1.0;
  const p: HikerProps = { x: 500 + lt * 30, y: groundY + 40, scale: 1.6, phase: ph, walk: sip ? 0 : 0.9, lean: 0.1, poles: false, handOverride: sip ? [44, -118] : freeHand(ph, 0.9) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={SUMMIT}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <Pine x={-40} y={groundY - 40} h={420} c="#3b6550" c2="#2b4d3c" />
            <Pine x={1060} y={groundY - 50} h={460} c="#3b6550" c2="#2b4d3c" />
            <Rocks y={groundY} />
            <Person {...p} outfit={LUKE} expression="happy" />
            <Tube p={p} mode={sip ? "sip" : "hang"} ice={0} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Sipping\nall the way\nto the top."} t={t} t0={off + 0.1} top={190} size={140} />
      <Chip text="Empty tube, no ice" t={t} t0={20.62} x={80} y={650} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hydration-bladder-insulated-water-reservoir-card.jpg"
      photoH={760}
      spec="INSULATED · 1L OR 2L · DRINK TUBE"
      name={
        <>
          Hydration
          <br />
          Bladder
        </>
      }
      nameSize={100}
      price="From $14.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V38: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={3.8} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={3.75} to={8.9}>
        <S2 off={3.75} />
      </Scene>
      <Scene from={8.85} to={20.05}>
        <S3 off={8.85} />
      </Scene>
      <Scene from={20.0} to={22.1} fadeIn={0.12}>
        <S4 off={20.0} />
      </Scene>
      <Scene from={22.0} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions words={words} windows={[[0.3, 3.75, 900], [3.75, 8.85, 960], [8.85, 20.0, 960], [20.0, 22.0, 900]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
