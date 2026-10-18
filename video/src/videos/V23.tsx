import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, JAKE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v23.json";

const words = vo.words as unknown as Word[];

const CANYON: Palette = {
  sky: ["#4f86b8", "#a9c9dc", "#efe2cc"],
  sun: { x: 820, y: 520, r: 60, color: "#fffbe8", glow: "#fff0c0" },
  layers: ["#d8a88a", "#c98a64", "#b46a48", "#9a5236", "#7a3e28"],
  mist: "#f3dcc4",
};
const MIDDAY: Palette = {
  sky: ["#3f7fb8", "#a4c8e0", "#f2e8d6"],
  sun: { x: 300, y: 440, r: 60, color: "#fffef0", glow: "#fff4c8" },
  layers: ["#e0b496", "#d29672", "#bd7650", "#a35c3c", "#84462e"],
  mist: "#f6e2cc",
};
const SUNRISE: Palette = {
  sky: ["#5e7fa8", "#e9b98e", "#fbe0b4"],
  sun: { x: 240, y: 940, r: 70, color: "#fff2d2", glow: "#ffc888" },
  layers: ["#e6aa86", "#d48a62", "#bc6a44", "#9c4e30", "#7a3a24"],
  mist: "#ffd8b0",
};
const GOLD: Palette = {
  sky: ["#4a78a8", "#e8b680", "#ffdca4"],
  sun: { x: 760, y: 860, r: 90, color: "#fff4d6", glow: "#ffc978" },
  layers: ["#e2a47c", "#cc8058", "#b06040", "#8c442c", "#5e2c1e"],
  mist: "#ffe0b4",
};

const ANA: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#BB8262",
  hair: "#3a2418",
  beard: null,
  ponytail: "#3a2418",
  cap: "#E8DCC0",
  capShade: "#C9BB9A",
  jacket: "#2F6E78",
  jacketShade: "#22545C",
  pants: "#5B5546",
  pantsShade: "#45402F",
  pack: "#C2662E",
  packShade: "#9B4E20",
};
const RANGER: Outfit = {
  ...JAKE,
  skin: "#C08A68",
  skinShade: "#A06E50",
  hair: "#3b3b3b",
  beard: null,
  cap: "#8a7a56",
  capShade: "#6e6142",
  jacket: "#6E7B4F",
  jacketShade: "#555F3C",
  pants: "#7a6a4f",
  pantsShade: "#5e513b",
  pack: "#6E7B4F",
  packShade: "#555F3C",
};

// Tall sandstone fin in the distance (Angels Landing style).
const Fin: React.FC<{ x: number; y: number; s: number; col: string; shade: string }> = ({ x, y, s, col, shade }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-260,0 L-200,-120 L-150,-170 L-110,-330 L-70,-420 L-30,-470 L10,-460 L40,-400 L70,-300 L120,-220 L190,-140 L260,0 Z" fill={col} />
    <path d="M10,-460 L40,-400 L70,-300 L120,-220 L190,-140 L260,0 L60,0 L40,-200 Z" fill={shade} />
    <path d="M-150,-170 L-110,-120 M-90,-260 L-60,-210 M60,-250 L90,-200" stroke="rgba(255,255,255,0.18)" strokeWidth={6} />
  </g>
);
const Mesa: React.FC<{ x: number; y: number; w: number; h: number; col: string; shade: string }> = ({ x, y, w, h, col, shade }) => (
  <g>
    <path d={`M${x - w / 2},${y} L${x - w / 2 + 40},${y - h} L${x + w / 2 - 40},${y - h} L${x + w / 2},${y} Z`} fill={col} />
    <path d={`M${x + w / 2 - 120},${y - h} L${x + w / 2 - 40},${y - h} L${x + w / 2},${y} L${x + w / 2 - 90},${y} Z`} fill={shade} />
    <rect x={x - w / 2 + 40} y={y - h} width={w - 80} height={14} fill="rgba(255,255,255,0.12)" />
  </g>
);
const Shrub: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <circle cx={-26} cy={-22} r={30} fill="#5f7048" />
    <circle cx={20} cy={-30} r={38} fill="#6d7f52" />
    <circle cx={50} cy={-14} r={24} fill="#55653f" />
  </g>
);
const Ground: React.FC<{ y: number; base?: string; path?: string }> = ({ y, base = "#b9774c", path = "#e2c09a" }) => (
  <g>
    <rect x={-300} y={y - 60} width={1700} height={700} fill={base} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={path} />
  </g>
);

// ============ S1 HOOK: walking up to Angels Landing (0 - 4.8) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1660;
  const ph = t * 4.2;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={CANYON}
        camX={t * 30}
        zoom={mix(1.03, 1.08, t / 4.8)}
        children={<Fin x={640 - t * 6} y={1240} s={1.4} col="#c47a52" shade="#a35e3e" />}
        foreground={
          <g>
            <Shrub x={980 - t * 40} y={groundY - 50} s={1.4} />
            <Shrub x={90 - t * 40} y={groundY - 54} />
            <Ground y={groundY} />
            <Person x={430} y={groundY + 40} scale={1.75} phase={ph} walk={0.9} lean={0.1} poles={false} handOverride={freeHand(ph, 0.9)} outfit={ANA} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={860} />
      <Title text={"Don't show up\nat Angels Landing\nlike this"} t={t} t0={0} top={170} size={118} />
      <Chip text="Zion National Park" t={t} t0={1.6} x={80} y={600} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: ranger turns her back (4.7 - 7.7) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  const turn = t > 5.6;
  const ph = Math.max(0, t - 5.6) * 3.4;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={MIDDAY}
        camX={40 + lt * 6}
        zoom={mix(1.02, 1.07, lt / 3)}
        children={<Fin x={540} y={1280} s={1.6} col="#c98058" shade="#a86240" />}
        foreground={
          <g>
            <Ground y={groundY} />
            {/* trail sign with a closed chain */}
            <g transform={`translate(560,${groundY + 20})`}>
              <rect x={-8} y={-360} width={16} height={360} fill="#6b4a30" />
              <rect x={-150} y={-380} width={300} height={90} rx={10} fill="#5a3e28" />
              <text x={0} y={-322} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={38} fill="#f2e6cf">ANGELS LANDING</text>
              <path d="M-260,-120 Q-130,-80 0,-120 Q130,-80 260,-120" stroke="#3a3a3a" strokeWidth={8} fill="none" />
            </g>
            <Person x={860} y={groundY + 90} scale={1.7} walk={0} lean={0.04} poles={false} handOverride={[-40, -60]} outfit={RANGER} flip expression="neutral" />
            <Person
              x={turn ? 300 - ph * 14 : 320}
              y={groundY + 100}
              scale={1.75}
              phase={ph}
              walk={turn ? 0.6 : 0}
              lean={0.06}
              poles={false}
              handOverride={turn ? freeHand(ph, 0.5) : [22, 34]}
              outfit={ANA}
              flip={turn}
              expression="tired"
            />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim />
      <Chip text="Turned back at the trail" t={t} t0={4.92} x={80} y={560} icon="x" />
      <Readout label="PERMIT" value="NONE" ok={false} t={t} t0={6.48} x={80} y={660} pulseAt={6.48} />
    </AbsoluteFill>
  );
};

// ============ S3 CONTEXT: fall is the season, plan it (7.6 - 14.4) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={CANYON}
        camX={lt * 22}
        zoom={mix(1.08, 1.02, lt / 6.8)}
        children={
          <g>
            <Mesa x={260 - lt * 4} y={1300} w={520} h={260} col="#c47a52" shade="#a35e3e" />
            <Mesa x={880 - lt * 4} y={1320} w={460} h={200} col="#b86c48" shade="#985236" />
          </g>
        }
        foreground={
          <g>
            {/* cottonwood in fall colour */}
            <g transform={`translate(${900 - lt * 30},${groundY - 40})`}>
              <path d="M-14,0 L-8,-300 L8,-300 L14,0 Z" fill="#6b4a30" />
              <circle cx={0} cy={-360} r={130} fill="#E0A63A" />
              <circle cx={-90} cy={-300} r={80} fill="#D69430" />
              <circle cx={90} cy={-300} r={84} fill="#C9862A" />
            </g>
            <Ground y={groundY} />
            <Person x={420} y={groundY + 60} scale={1.7} phase={lt * 4} walk={0.8} lean={0.1} poles={false} handOverride={freeHand(lt * 4, 0.8)} outfit={ANA} expression="neutral" />
          </g>
        }
      />
      <Vignette strength={0.32} />
      <Scrim />
      <Chip text="Fall: cool, clear days" t={t} t0={7.75} x={80} y={560} icon="check" />
      <Chip text="Famous hikes need planning" t={t} t0={11.6} x={80} y={660} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S4 FIX (14.3 - 23.0) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1760;
  const ph = lt * 4;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={SUNRISE}
        camX={lt * 14}
        children={<Fin x={720 - lt * 3} y={1300} s={1.3} col="#c47a52" shade="#a35e3e" />}
        foreground={
          <g>
            <Shrub x={1010 - lt * 30} y={groundY - 50} s={1.2} />
            <Ground y={groundY} />
            <Person x={760} y={groundY} scale={1.3} phase={ph} walk={0.75} lean={0.1} poles={false} handOverride={freeHand(ph, 0.75)} outfit={ANA} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Title text={"Here's\nthe fix."} t={t} t0={14.42} t1={15.55} top={200} size={160} />
      <Readout label="ANGELS LANDING" value="PERMIT" ok={true} t={t} t0={15.62} x={80} y={380} pulseAt={15.62} />
      <Chip text="Start early, days are short" t={t} t0={17.82} x={80} y={590} icon="check" />
      <Chip text="Check the flash flood forecast" t={t} t0={19.82} x={80} y={690} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 PAYOFF: the trip went perfectly (22.9 - 25.3) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1640;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l5"
        pal={GOLD}
        camX={lt * 16}
        zoom={at(lt, [0, 0.9], [1.25, 1.06], outExpo)}
        children={<Fin x={760} y={1260} s={1.5} col="#c06a44" shade="#9c4e30" />}
        foreground={
          <g>
            <Ground y={groundY} base="#a5603c" path="#d9aa7e" />
            <Person x={360} y={groundY + 50} scale={1.7} walk={0} lean={0.02} poles={false} handOverride={[-20, -150]} outfit={ANA} expression="happy" breathe={Math.sin(lt * 2) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Worth\nthe plan."} t={t} t0={off + 0.12} top={200} size={180} />
    </AbsoluteFill>
  );
};

// ============ S6 END CARD ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  void off;
  return (
    <EndCard
      lt={lt}
      photo="products/utahs-mighty-5-trip-pack-card.jpg"
      photoH={760}
      spec="PLANNING GUIDE + 10 GPX DAY HIKES"
      name={
        <>
          Utah's Mighty 5
          <br />
          Trip Pack
        </>
      }
      nameSize={96}
      shadowY={830}
      price="$19.99"
      save="Save this before your Utah trip"
    />
  );
};

export const V23: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={4.8} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={4.7} to={7.7}>
        <S2 off={4.7} />
      </Scene>
      <Scene from={7.6} to={14.4}>
        <S3 off={7.6} />
      </Scene>
      <Scene from={14.3} to={23.0}>
        <S4 off={14.3} />
      </Scene>
      <Scene from={22.9} to={25.3} fadeIn={0.12}>
        <S5 off={22.9} />
      </Scene>
      <Scene from={25.2} to={30} fadeOut={0}>
        <S6 off={25.2} />
      </Scene>
      <Captions words={words} windows={[[0.3, 4.75, 860], [4.8, 7.65, 300], [7.7, 14.35, 300], [15.55, 22.9, 1110]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
