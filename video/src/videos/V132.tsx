// V132: "His ears went numb in ten minutes." in the cinematic C01 style, winter ridge. Story for the Fleece Balaclava
// (Windproof Hood, Face and Neck Warmer, $16.99, live Shopify). Advice: a beanie plus a neck gaiter leaves gaps (ears,
// cheeks, the strip of neck between them); cover up before the wind hits; a balaclava covers it in one piece: hood over the
// ears, face panel over cheeks and chin, long neck tucked into the collar. No medical claims, no numbers beyond the story.
// End card = real Shopify product photo cut out (same cutout as V131).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { Blizzard, FrostTrail, STORM, Summit, WGOLD, WINTER, WinterBackdrop } from "../winter";
import { Balaclava, FaceClose } from "../icy";
import vo from "../vo/v132.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const NAVY = "#2a3346";
const NAVY2 = "#1b2231";
const BEANIE = "#3D5A4C";
const BEANIE2 = "#2D4439";
const GAITER = "#6b7480";
const GAITER2 = "#555d68";
const COLD = "#ff5a4a";

const OWEN: Outfit = {
  ...JAKE,
  skin: "#B97A56",
  skinShade: "#9A6244",
  hair: "#2a1d16",
  beard: null,
  ponytail: null,
  cap: "none",
  capShade: "none",
  jacket: "#A4532F",
  jacketShade: "#843F22",
  pants: "#3F4349",
  pantsShade: "#2E3136",
  pack: "#3E5A4A",
  packShade: "#2E4538",
  glove: "#2a2a2a",
};

// Beanie + neck gaiter drawn over a Person (hiker coords). Ears and the strip of neck stay open; cold = red tint there.
const BeanieGaiter: React.FC<{ p: HikerProps; cold?: number }> = ({ p, cold = 0 }) => {
  const g = hikerGeometry(p);
  const [hx, hy] = g.head;
  return (
    <g transform={hikerTransform(p)}>
      {cold > 0 && (
        <g opacity={cold}>
          <ellipse cx={hx - 3} cy={hy + 3} rx={7} ry={9} fill={COLD} opacity={0.55} />
          <ellipse cx={hx + 9} cy={hy + 9} rx={7} ry={5} fill={COLD} opacity={0.45} />
          <rect x={hx - 12} y={hy + 24} width={22} height={8} rx={3} fill={COLD} opacity={0.35} />
        </g>
      )}
      {/* gaiter, slipped low on the neck */}
      <path d={`M${hx - 20},${hy + 32} Q${hx - 2},${hy + 28} ${hx + 16},${hy + 32} L${hx + 18},${hy + 54} Q${hx - 2},${hy + 58} ${hx - 22},${hy + 54} Z`} fill={GAITER} />
      <path d={`M${hx - 19},${hy + 40} Q${hx - 2},${hy + 37} ${hx + 16},${hy + 40}`} stroke={GAITER2} strokeWidth={2.5} fill="none" />
      {/* beanie */}
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 39} ${hx},${hy - 41} Q${hx + 28},${hy - 39} ${hx + 26},${hy - 7} Z`} fill={BEANIE} />
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 39} ${hx},${hy - 41} Q${hx - 14},${hy - 30} ${hx - 15},${hy - 5} Z`} fill={BEANIE2} />
      <rect x={hx - 29} y={hy - 12} width={57} height={10} rx={4} fill={BEANIE2} />
      <circle cx={hx} cy={hy - 43} r={7} fill="#e9e2d6" />
    </g>
  );
};

// Big close-up face (screen coords) with a beanie and a slipped neck gaiter: ears, cheeks and a neck strip exposed.
// hl = [ears, cheeks, neck] highlight 0..1 (cold glow pulse), cold = overall red tint.
const FaceBeanie: React.FC<{ cx: number; cy: number; s: number; cold: number; hl: [number, number, number]; eyes?: "tired" | "neutral"; t: number }> = ({ cx, cy, s, cold, hl, eyes = "neutral", t }) => {
  const pulse = 0.75 + 0.25 * Math.sin(t * 7);
  const glow = (x: number, y: number, rx: number, ry: number, k: number) =>
    k > 0 ? <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={COLD} opacity={0.5 * k * pulse} filter="url(#fbBlur)" /> : null;
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      <defs>
        <filter id="fbBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={10} />
        </filter>
      </defs>
      {/* jacket */}
      <path d="M-170,190 Q-120,150 -40,150 L60,150 Q150,150 190,200 L190,280 L-170,280 Z" fill={OWEN.jacket} />
      <path d="M-40,150 L60,150 L50,190 L-30,190 Z" fill={OWEN.jacketShade} />
      {/* neck */}
      <path d="M-36,60 L56,60 L58,140 L-38,140 Z" fill={OWEN.skinShade} />
      <rect x={-36} y={86} width={94} height={36} fill={OWEN.skin} opacity={0.5} />
      {glow(10, 104, 70, 26, hl[2])}
      <rect x={-36} y={86} width={94} height={36} fill={COLD} opacity={0.18 * cold} />
      {/* gaiter, slipped down to the collar */}
      <path d="M-58,124 Q8,112 76,124 L82,186 Q8,200 -64,186 Z" fill={GAITER} />
      <path d="M-56,146 Q8,134 78,146 M-58,166 Q8,154 80,166" stroke={GAITER2} strokeWidth={6} fill="none" />
      {/* face (three-quarter view to the right) */}
      <ellipse cx={20} cy={4} rx={84} ry={92} fill={OWEN.skin} />
      <ellipse cx={-30} cy={10} rx={16} ry={22} fill={OWEN.skinShade} />
      {/* ear */}
      <ellipse cx={-62} cy={12} rx={20} ry={30} fill={OWEN.skin} />
      <path d="M-66,-6 q-10,18 0,36" stroke={OWEN.skinShade} strokeWidth={5} fill="none" strokeLinecap="round" />
      <ellipse cx={-62} cy={12} rx={20} ry={30} fill={COLD} opacity={0.35 * cold} />
      {glow(-62, 12, 34, 44, hl[0])}
      {/* cheeks */}
      <ellipse cx={62} cy={24} rx={20} ry={14} fill={COLD} opacity={0.2 + 0.35 * cold} />
      <ellipse cx={-6} cy={34} rx={16} ry={12} fill={COLD} opacity={0.12 + 0.3 * cold} />
      {glow(62, 26, 40, 30, hl[1])}
      {glow(-6, 36, 30, 24, hl[1])}
      {/* eyes */}
      {[0, 46].map((dx, i) => (
        <g key={i}>
          <ellipse cx={11 + dx} cy={-12} rx={6.5} ry={eyes === "tired" ? 4 : 8} fill="#2a1f1a" />
          <path d={`M${dx},-32 q11,${eyes === "tired" ? 3 : -5} 22,${eyes === "tired" ? 4 : 0}`} stroke={OWEN.hair} strokeWidth={4.5} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <path d="M44,0 q12,18 0,26" stroke={OWEN.skinShade} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={eyes === "tired" ? "M22,56 q14,-3 28,0" : "M22,54 q14,2 28,0"} stroke="#5a2e22" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* hair under the beanie */}
      <path d="M-84,-40 Q-92,-6 -80,10 L-70,-20 Z" fill={OWEN.hair} />
      {/* beanie */}
      <path d="M-100,-26 Q-112,-150 12,-152 Q132,-150 120,-30 Z" fill={BEANIE} />
      <path d="M-100,-26 Q-112,-150 12,-152 Q-40,-120 -46,-28 Z" fill={BEANIE2} />
      <rect x={-108} y={-60} width={236} height={40} rx={16} fill={BEANIE2} />
      {[-80, -50, -20, 10, 40, 70, 100].map((x) => (
        <path key={x} d={`M${x},-56 v32`} stroke={BEANIE} strokeWidth={5} opacity={0.6} />
      ))}
      <circle cx={12} cy={-160} r={30} fill="#e9e2d6" />
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Owen in beanie + gaiter walks out onto the open ridge, wind picks up (0 - 5.19) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 16, y: hh.y, zoom: mix(1.03, 1.1, t / 5.19), rot: hh.rot };
  const g = 1560;
  const ph = t * 2.8;
  const wind = at(t, [3.4, 4.6], [0, 1]);
  const p: HikerProps = { x: 360 + t * 40, y: g + 40 - t * 12, scale: 2.4, phase: ph, walk: 0.6, lean: 0.14 + wind * 0.08, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0, slope: 0.1 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={0.1} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={OWEN} expression="neutral" />
          <BeanieGaiter p={p} cold={wind * 0.6} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Particles seed={1321} n={20} col="#ffffff" fall={20} />
      <AbsoluteFill style={{ opacity: wind }}>
        <Blizzard seed={1320} n={24} />
      </AbsoluteFill>
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="248,240,228" cool="40,60,90" />
      <Title text={"His ears went numb\nin ten minutes."} t={t} t0={0} top={110} size={124} />
      <Chip text="Beanie + neck gaiter" t={t} t0={1.0} x={60} y={580} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the gaps: ears, cheeks, the strip of neck (5.19 - 8.88) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.09, lt / 3.69), rot: hh.rot };
  const ears = at(t, [6.0, 6.3, 8.9], [0, 1, 0.5]);
  const cheeks = at(t, [6.55, 6.85, 8.9], [0, 1, 0.5]);
  const neck = at(t, [7.75, 8.05], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(230,238,246,0.8)">
          <Svg>
            <FaceBeanie cx={520} cy={960} s={3.1} cold={at(t, [5.2, 8.8], [0.3, 0.8])} hl={[ears, cheeks, neck]} eyes="tired" t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Blizzard seed={1322} n={26} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" vignette={0.55} />
      <Chip text="Ears open" t={t} t0={6.09} x={60} y={200} icon="x" big />
      <Chip text="Cheeks open" t={t} t0={6.59} x={60} y={330} icon="x" big />
      <Chip text="Neck gap" t={t} t0={7.8} x={60} y={460} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: open ridge in the wind, hand over a numb ear (8.88 - 11.58) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6, at(t, [10.35, 10.45, 10.9], [0, 1, 0]) * 3);
  const cam: Cam = { x: hh.x - lt * 20, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.7), rot: hh.rot };
  const g = 1520;
  const ph = t * 2.4;
  const ear = at(t, [10.2, 10.6], [0, 1], outExpo);
  const p: HikerProps = { x: 420 + lt * 36, y: g + 30, scale: 2.2, phase: ph, walk: 0.45, lean: 0.24, poles: false, handOverride: ear > 0 ? [mix(40, -6, ear), mix(-10, -168, ear)] : [40, -10], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g + 120} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={6} col="rgba(230,238,246,0.85)">
          <Person {...p} outfit={OWEN} expression="tired" />
          <BeanieGaiter p={p} cold={1} />
        </Subject>
      </Plane>
      <Blizzard seed={1323} n={36} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" />
      <Chip text="Ten minutes in" t={t} t0={9.25} x={60} y={200} icon="none" big />
      <Chip text="Ears numb" t={t} t0={10.4} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the fix: at the tree line, before the ridge, he pulls the balaclava on (11.58 - 14.70) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.12), rot: hh.rot };
  const g = 1560;
  const on = at(t, [12.85, 13.6], [0, 1], outExpo);
  const pulling = on > 0.02 && on < 0.98;
  const p: HikerProps = { x: 470, y: g + 40, scale: 2.5, walk: 0, lean: 0.04, poles: false, handOverride: pulling ? [30, -170] : [30, 20], breathe: Math.sin(t * 2.4) * 1.2 };
  const s = p.scale ?? 1;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={OWEN} expression="neutral" />
          {on < 0.6 && <BeanieGaiter p={p} />}
          <g transform={`translate(0,${-(1 - on) * 70 * s})`} opacity={at(t, [12.75, 12.95], [0, 1])}>
            <Balaclava p={p} col={NAVY} shade={NAVY2} up={1} />
          </g>
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,246,226" />
      <Particles seed={1324} n={16} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,226" cool="40,60,90" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={12.75} top={200} size={124} />
      <Chip text="Before the ridge" t={t} t0={12.85} x={60} y={200} icon="none" big />
      <Chip text="Cover up first" t={t} t0={13.3} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: one piece: hood over the ears, panel over cheeks and chin (14.70 - 19.85) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 5.15), rot: hh.rot };
  const snug = at(t, [16.9, 17.5], [0, 1], outExpo);
  const up = at(t, [18.2, 18.8], [0.35, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="e" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(230,238,246,0.8)">
          <Svg>
            <FaceClose cx={500} cy={1000} s={3.2} skin={OWEN.skin} skinShade={OWEN.skinShade} col={NAVY} shade={NAVY2} up={up} snug={snug} eyes="neutral" jacket={OWEN.jacket} />
          </Svg>
        </Subject>
      </Plane>
      <Blizzard seed={1325} n={24} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" vignette={0.55} />
      <Chip text="One piece" t={t} t0={15.8} x={60} y={200} icon="none" big />
      <Chip text="Hood over the ears" t={t} t0={16.9} x={60} y={330} icon="check" big />
      <Chip text="Panel over cheeks and chin" t={t} t0={18.27} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the long neck tucked into the collar (19.85 - 22.72) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.87), rot: hh.rot };
  const s = 4.4;
  const tuck = at(t, [20.4, 21.6], [0, 1]);
  const p: HikerProps = { x: 520, y: 1600 + 182 * s, scale: s, walk: 0, lean: 0.06, poles: false, handOverride: [mix(56, 40, tuck), mix(-120, -96, tuck)], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1250} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,236,210,0.9)">
          <Person {...p} outfit={OWEN} expression="neutral" />
          <Balaclava p={p} col={NAVY} shade={NAVY2} up={1} snug={1} />
        </Subject>
      </Plane>
      <Particles seed={1326} n={14} col="#ffffff" fall={16} />
      <Grade sunX={800} sunY={560} warm="255,236,210" vignette={0.55} />
      <Chip text="Long neck in your collar" t={t} t0={20.2} x={60} y={200} icon="check" big />
      <Chip text="No gaps" t={t} t0={21.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: across the ridge in golden light, warm (22.72 - 24.33) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1520;
  const ph = t * 2.6;
  const p: HikerProps = { x: 400 + lt * 50, y: g + 40, scale: 2.4, phase: ph, walk: 0.55, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="g" treeY={g + 120} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={OWEN} expression="happy" />
          <Balaclava p={p} col={NAVY} shade={NAVY2} up={1} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.45} col="255,236,200" />
      <Particles seed={1327} n={22} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,226,180" />
      <Readout label="ACROSS THE RIDGE" value="Warm" ok={true} t={t} t0={22.85} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/fleece-balaclava-windproof-hood-cut.png"
      cutoutH={760}
      spec="HOOD · FACE PANEL · LONG NECK"
      name={
        <>
          Fleece Balaclava
          <br />
          Hood &amp; Neck Warmer
        </>
      }
      nameSize={96}
      price="$16.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V132: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={5.24} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={5.19} to={8.93} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={5.19} />
    </Scene>
    <Scene from={8.88} to={11.63} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={8.88} />
    </Scene>
    <Scene from={11.58} to={14.75} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={11.58} />
    </Scene>
    <Scene from={14.7} to={19.9} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={14.7} />
    </Scene>
    <Scene from={19.85} to={22.77} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={19.85} />
    </Scene>
    <Scene from={22.72} to={24.38} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={22.72} />
    </Scene>
    <Scene from={24.23} to={28.8} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 5.19, 1600],
        [5.19, 8.88, 1660],
        [8.88, 11.58, 1600],
        [11.58, 14.7, 1600],
        [14.7, 19.85, 1660],
        [19.85, 22.72, 1660],
        [22.72, 24.23, 1600],
      ]}
    />
  </AbsoluteFill>
);
