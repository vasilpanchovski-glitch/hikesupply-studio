// V219: "His face was raw by noon." Short format (16.0 s, 44 words), cinematic C01 style, cold windy open ridge.
// Product: Multifunctional Neck Gaiter — Seamless Stretch Tube, $9.99 (live Shopify). End card: the real store cover, cut out.
// Advice (simple, common practice, no numbers): cold wind on bare skin leaves the face raw; pull a gaiter over the nose and
// cheeks before you reach the exposed ridge, not after. Face close-ups built like V212 (no glasses here).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { Blizzard, FrostTrail, STORM, WGOLD, WinterBackdrop } from "../winter";
import vo from "../vo/v219.json";

const words = vo.words as unknown as Word[];

const GAITER = "#26272a"; // black, like the store photo
const GAITER2 = "#141517";

const BEN: Outfit = {
  ...JAKE,
  skin: "#E0AC8C",
  skinShade: "#C08868",
  hair: "#5a3a24",
  beard: null,
  cap: "none",
  capShade: "none",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  pack: "#3F6B55",
  packShade: "#2D5141",
  glove: "#2a2a2a",
};
const HAT = "#2F5D7C";
const HAT2 = "#244a63";

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Wind streaks blowing right to left across the frame.
const Wind: React.FC<{ t: number; k?: number; seed?: number }> = ({ t, k = 1, seed = 1 }) => (
  <Svg>
    {Array.from({ length: 14 }, (_, i) => {
      const y = 260 + ((i * 137 + seed * 53) % 1300);
      const sp = 900 + ((i * 71) % 5) * 180;
      const x = 1300 - (((t * sp + i * 400 + seed * 90) % 2000) as number);
      const len = 160 + ((i * 37) % 4) * 60;
      return <path key={i} d={`M${x},${y} q${len / 2},-10 ${len},0`} stroke="#ffffff" strokeWidth={4} fill="none" opacity={0.35 * k} strokeLinecap="round" />;
    })}
  </Svg>
);

// Beanie and gaiter on a Person (hiker coords). up 0 = gaiter round the neck, 1 = over nose and cheeks.
const Gear: React.FC<{ p: HikerProps; up: number }> = ({ p, up }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const top = mix(hy + 30, hy + 8, up);
  const front = mix(hx + 14, hx + 27, up);
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 41} ${hx},${hy - 43} Q${hx + 28},${hy - 41} ${hx + 26},${hy - 7} Z`} fill={HAT} />
      <rect x={hx - 29} y={hy - 14} width={57} height={12} rx={4} fill={HAT2} />
      <path d={`M${hx - 14},${top + 3} Q${hx + 6},${top - 3} ${front},${top} Q${front + 3},${hy + 34} ${hx + 14},${hy + 48} L${hx - 14},${hy + 48} Z`} fill={GAITER} />
      <path d={`M${hx - 12},${top + 5} Q${hx + 6},${top - 1} ${front - 2},${top + 2}`} stroke={GAITER2} strokeWidth={2.5} fill="none" />
    </g>
  );
};

// Close-up face, three-quarter view to the right (local units, scaled by s). Beanie, black tube gaiter.
// up 0..1: gaiter from the neck (0) to over the nose and cheeks (1). raw 0..1: red, stinging cheeks.
const Face: React.FC<{ cx: number; cy: number; s: number; up: number; raw: number; eyes?: "tired" | "happy" | "neutral" | "squint" }> = ({ cx, cy, s, up, raw, eyes = "neutral" }) => {
  const top = mix(104, 8, up);
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      <path d="M-200,190 Q-140,120 -50,118 L80,118 Q170,120 220,200 L230,320 L-210,320 Z" fill={BEN.jacket} />
      <path d="M-50,118 L80,118 L70,200 L-40,200 Z" fill={BEN.jacketShade} />
      <ellipse cx={20} cy={4} rx={84} ry={94} fill={BEN.skin} />
      <ellipse cx={-34} cy={12} rx={16} ry={22} fill={BEN.skinShade} />
      {/* raw, wind-burned cheeks and nose */}
      <ellipse cx={70} cy={30} rx={30} ry={20} fill="#d9443a" opacity={0.15 + 0.45 * raw} />
      <ellipse cx={-2} cy={30} rx={24} ry={18} fill="#d9443a" opacity={0.1 + 0.35 * raw} />
      <ellipse cx={52} cy={14} rx={12} ry={10} fill="#d9443a" opacity={0.3 * raw} />
      {[0, 46].map((dx, i) => (
        <g key={i}>
          {eyes === "happy" ? (
            <path d={`M${2 + dx},-14 q9,-9 18,0`} stroke="#1c1410" strokeWidth={4.5} fill="none" strokeLinecap="round" />
          ) : eyes === "squint" ? (
            <path d={`M${2 + dx},-12 l18,0`} stroke="#1c1410" strokeWidth={5} fill="none" strokeLinecap="round" />
          ) : (
            <ellipse cx={11 + dx} cy={-12} rx={6.5} ry={eyes === "tired" ? 4 : 8} fill="#1c1410" />
          )}
          <path d={eyes === "squint" ? `M${dx - 2},-34 q12,4 24,-2` : `M${dx - 2},-38 q12,-6 24,0`} stroke={BEN.hair} strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <path d="M44,0 q12,18 0,26" stroke={BEN.skinShade} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={eyes === "happy" ? "M20,54 q16,12 32,0" : eyes === "squint" ? "M22,58 q14,-6 28,0" : "M22,56 q14,2 28,0"} stroke="#4a2418" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* beanie */}
      <path d="M-92,-30 Q-96,-140 20,-146 Q130,-140 118,-30 Z" fill={HAT} />
      <rect x={-98} y={-52} width={222} height={34} rx={14} fill={HAT2} />
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={-70 + i * 30} y1={-130 + Math.abs(i - 3) * 4} x2={-74 + i * 30} y2={-56} stroke={HAT2} strokeWidth={4} opacity={0.6} />
      ))}
      {/* the gaiter */}
      <path d={`M-70,${Math.min(top, 96)} Q20,${top - 14} 108,${top} L116,150 Q20,176 -78,150 Z`} fill={GAITER} />
      <path d={`M-66,${Math.min(top, 96) + 8} Q20,${top - 4} 104,${top + 8}`} stroke={GAITER2} strokeWidth={7} fill="none" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M-74,${120 + i * 12} Q20,${140 + i * 12} 112,${120 + i * 12}`} stroke={GAITER2} strokeWidth={4} fill="none" opacity={0.6} />
      ))}
    </g>
  );
};

// ============ S1 HOOK WIDE: Ben on the open ridge, face bare to the wind (0 - 3.82) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45, 0.2);
  const cam: Cam = { x: hh.x + t * 20, y: hh.y, zoom: mix(1.03, 1.1, t / 3.8), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.6;
  const p: HikerProps = { x: 330 + t * 40, y: g, scale: 2.3, phase: ph, walk: 0.6, lean: 0.16, poles: false, handOverride: freeHand(ph, 0.6), breathe: Math.sin(t * 5) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={g - 120} t={t} woods={false} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={-0.03} snow={0.5} />
        <Subject rimX={5} col="rgba(240,244,250,0.8)">
          <Person {...p} outfit={BEN} expression="tired" />
          <Gear p={p} up={0} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a4248" side="right" />
      </Plane>
      <Wind t={t} seed={1} />
      <Blizzard seed={2191} n={16} angle={-75} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="220,228,240" cool="30,45,80" vignette={0.55} />
      <Title text={"His face\nwas raw\nby noon."} t={t} t0={0} top={110} size={132} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: raw, stinging cheeks, gaiter still round the neck (3.82 - 6.12) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.02], outExpo), rot: hh.rot };
  const raw = at(t, [3.9, 5.0], [0.4, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={1250} blur={14} t={t} woods={false} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(240,244,250,0.85)">
          <Svg>
            <Face cx={500} cy={860} s={3.3} up={0} raw={raw} eyes="squint" />
          </Svg>
        </Subject>
      </Plane>
      <Wind t={t} seed={2} />
      <Blizzard seed={2192} n={12} angle={-75} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="220,228,240" cool="30,45,80" vignette={0.55} />
      <Chip text="Cold wind" t={t} t0={3.9} x={60} y={170} icon="x" big />
      <Chip text="Bare skin" t={t} t0={4.6} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the fix: gloved hand pulls the gaiter over nose and cheeks (6.12 - 9.2) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x - 20, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.1), rot: hh.rot };
  const up = at(t, [7.7, 8.4], [0, 1], outExpo);
  const top = mix(104, 8, up);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="c" treeY={1250} blur={14} t={t} woods={false} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Svg>
            <Face cx={500} cy={860} s={3.3} up={up} raw={mix(0.7, 0.4, up)} eyes={up > 0.9 ? "happy" : "neutral"} />
            <g opacity={at(t, [6.9, 7.2, 8.6, 8.9], [0, 1, 1, 0])}>
              <ellipse cx={500 + 92 * 3.3} cy={860 + (top + 10) * 3.3} rx={96} ry={70} fill={BEN.glove ?? GAITER} />
              <path d={`M${500 + 92 * 3.3 + 60},${860 + (top + 10) * 3.3 + 40} L1200,${860 + (top + 10) * 3.3 + 420}`} stroke={BEN.jacket} strokeWidth={140} strokeLinecap="round" />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <LowScrim />
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 200} strength={0.3} col="255,236,200" />
      <Particles seed={2193} n={14} col="#fff3d6" fall={6} bokeh />
      <Grade sunX={760} sunY={500} warm="255,226,180" vignette={0.5} />
      <Chip text="The fix: two seconds" t={t} t0={6.2} x={60} y={170} icon="none" big />
      <Chip text="Over nose and cheeks" t={t} t0={8.0} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: back on the ridge into the wind, gaiter up, comfortable (9.2 - 11.16) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45, 0.2);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: mix(1.05, 1.1, lt / 2.0), rot: hh.rot };
  const g = 1520;
  const ph = t * 3.6;
  const p: HikerProps = { x: 420 + lt * 40, y: g, scale: 2.5, phase: ph, walk: 0.6, lean: 0.14, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={g - 120} t={t} woods={false} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={-0.03} snow={0.5} />
        <Subject rimX={4} col="rgba(240,244,250,0.8)">
          <Person {...p} outfit={BEN} expression="happy" />
          <Gear p={p} up={1} />
        </Subject>
      </Plane>
      <Wind t={t} seed={3} />
      <Blizzard seed={2194} n={18} angle={-75} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="230,232,240" cool="30,45,80" />
      <Chip text="Before the wind hits" t={t} t0={9.3} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/multifunctional-neck-gaiter-cut.png"
      cutoutH={720}
      spec="SEAMLESS STRETCH TUBE"
      name={
        <>
          Multifunctional
          <br />
          Neck Gaiter
        </>
      }
      nameSize={96}
      price="$9.99"
      save="Save this for your next ridge"
    />
  );
};

export const V219: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.9} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.82} to={6.2} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.82} />
    </Scene>
    <Scene from={6.12} to={9.28} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={6.12} />
    </Scene>
    <Scene from={9.2} to={11.24} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={9.2} />
    </Scene>
    <Scene from={11.16} to={16.0} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.82, 1600],
        [3.82, 6.12, 1600],
        [6.12, 9.2, 1600],
        [9.2, 11.16, 1600],
      ]}
    />
  </AbsoluteFill>
);
