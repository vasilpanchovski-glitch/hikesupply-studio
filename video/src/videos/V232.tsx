// V232: "Cold day. Dog licking snow." Short format (15.5 s, 44 words), cinematic C01 style, winter woods trail with a dog.
// Product: Dog Water Bottle — 2-in-1 Portable Bottle and Drinking Bowl, 350 ml or 550 ml, from $19.99 (live Shopify,
// $19.99 / $22.99 by size). End card: real turquoise studio photo from media/products/dogbottle, cut out (rembg, holes filled).
// Advice (plain, conservative): dogs still need water on cold hikes; carry a bottle just for them and offer small sips at each break.
// No medical claims, no numbers beyond the story's "mile three". Dog, trail and hiker parts as in V226.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays } from "../cine";
import { Subject } from "../fall";
import { FrostTrail, STORM, WINTER, WGOLD, WinterBackdrop } from "../winter";
import { Dog, dogCollar, DogLook } from "../dog";
import vo from "../vo/v232.json";

const words = vo.words as unknown as Word[];

const LEO: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#B98262",
  hair: "#3b2a1e",
  beard: "#3b2a1e",
  cap: "#B83A3A",
  capShade: "#8f2c2c",
  jacket: "#2F5F8A",
  jacketShade: "#234868",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#3F6B55",
  packShade: "#2D5141",
  glove: "#2a2a2a",
};
const MAPLE: DogLook = { coat: "#e8e2d6", shade: "#c9c0b0", belly: "#f6f2ea", ear: "#b88a5a", collar: "#2F7F86", nose: "#1d1512" };
const LEASH = "#B83A3A";
const TEAL = { c: "#3fb7bd", s: "#2c969c", d: "#257f84" };

const toScreen = (p: HikerProps, q: readonly number[]): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};
const handOf = (p: HikerProps, i: number) => toScreen(p, hikerGeometry(p).arms[i].hand);

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const Leash: React.FC<{ a: [number, number]; b: [number, number]; w?: number; sag?: number }> = ({ a, b, w = 6, sag = 60 }) => (
  <path d={`M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${Math.max(a[1], b[1]) + sag} ${b[0]},${b[1]}`} stroke={LEASH} strokeWidth={w} fill="none" strokeLinecap="round" />
);

// Snout tip of the Dog when headUp = -3 (head lowered to the ground), dog local units facing right.
const SNOUT_DOWN: [number, number] = [108, -34];

// The 2-in-1 bottle lying in the hand: clear bottle on the left, teal bowl lid opened flat on the right (local units).
const DogBottle: React.FC<{ x: number; y: number; s?: number; rot?: number; fill?: number; t: number }> = ({ x, y, s = 1, rot = 0, fill = 1, t }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    {/* clear bottle */}
    <rect x={-210} y={-52} width={200} height={104} rx={40} fill="rgba(225,240,245,0.55)" stroke="rgba(255,255,255,0.9)" strokeWidth={4} />
    <rect x={-196} y={-30} width={170} height={70} rx={30} fill="rgba(180,220,235,0.55)" />
    <path d="M-190,-36 L-40,-36" stroke="rgba(255,255,255,0.8)" strokeWidth={6} strokeLinecap="round" />
    {/* teal bowl */}
    <path d="M-20,-58 L120,-58 Q180,-58 180,0 Q180,58 120,58 L-20,58 Z" fill={TEAL.c} />
    <path d="M0,-40 L110,-40 Q156,-40 156,0 Q156,40 110,40 L0,40 Z" fill={TEAL.d} />
    <path d={`M10,-28 L106,-28 Q140,-28 140,0 Q140,28 106,28 L10,28 Z`} fill="#a9dbe6" opacity={fill} />
    <path d={`M30,${-8 + Math.sin(t * 6) * 3} Q70,${-16 + Math.sin(t * 6) * 3} 110,${-8 + Math.sin(t * 6) * 3}`} stroke="#ffffff" strokeWidth={5} fill="none" opacity={0.7 * fill} strokeLinecap="round" />
    {/* button and lanyard */}
    <rect x={-30} y={-24} width={22} height={48} rx={8} fill={TEAL.s} />
    <path d="M-20,58 Q-60,140 -150,120" stroke="#a8adb1" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>
);

const SnowMound: React.FC<{ x: number; y: number; s?: number; bite?: number }> = ({ x, y, s = 1, bite = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={120} ry={40} fill="#f3f6f8" />
    <ellipse cx={-20} cy={-14} rx={70} ry={26} fill="#ffffff" />
    {bite > 0 && <ellipse cx={30} cy={-18} rx={26 * bite} ry={12 * bite} fill="#cfdbe3" />}
  </g>
);

// ============ S1 HOOK WIDE: cold morning, Leo and his dog head out, no water for her (0 - 3.3) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.04, 1.1, t / 3.3), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.3;
  const p: HikerProps = { x: 260 + t * 40, y: g + 20, scale: 2.3, phase: ph, walk: 0.7, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.7), breathe: 0 };
  const dx = 640 + t * 40;
  const dy = g + 26;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={g - 200} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,240,220,0.8)">
          <Dog x={dx} y={dy} s={1.25} phase={t * 8} walk={1} look={MAPLE} mood="happy" tailWag={t * 10} />
          <Person {...p} outfit={LEO} expression="happy" />
          <Leash a={handOf(p, 1)} b={dogCollar(dx, dy, 1.25)} sag={40} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f3a3a" side="right" />
      </Plane>
      <Particles seed={2321} n={18} col="#ffffff" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="235,236,236" cool="30,45,80" vignette={0.5} />
      <Title text={"Cold day.\nDog licking\nsnow."} t={t} t0={0} top={110} size={128} />
      <Chip text="No water for her" t={t} t0={1.9} x={60} y={600} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: mile three, she licks snow at every stop (3.3 - 6.2) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.7], [1.12, 1.03], outExpo), rot: hh.rot };
  const s = 3.6;
  const x = 260;
  const y = 1600;
  const lick = Math.max(0, Math.sin(t * 9)) ** 2;
  const nx = x + SNOUT_DOWN[0] * s;
  const ny = y + SNOUT_DOWN[1] * s;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={1260} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={y - 20} snow={1} />
        <Subject rimX={6} col="rgba(255,240,220,0.8)">
          <SnowMound x={nx + 40} y={ny + 70} s={1.8} bite={at(t, [3.6, 5.5], [0.4, 1])} />
          <Dog x={x} y={y} s={s} phase={0} walk={0} look={MAPLE} mood="sad" headUp={-3} tailWag={0} />
          <ellipse cx={nx + 14} cy={ny + 16 + lick * 18} rx={16} ry={12 + lick * 16} fill="#d9667a" />
        </Subject>
      </Plane>
      <Particles seed={2322} n={14} col="#ffffff" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="235,236,236" cool="30,45,80" vignette={0.55} />
      <Readout label="MILE" value="3" ok={null} t={t} t0={3.45} x={60} y={170} />
      <Chip text="Licking snow at every stop" t={t} t0={4.6} x={60} y={420} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: Leo stops and looks at her: dogs still need water (6.2 - 8.1) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.08, 1.02, lt / 1.9), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 330, y: g + 20, scale: 2.4, walk: 0, lean: 0.14, poles: false, handOverride: [60, 30], breathe: Math.sin(t * 2) * 1.5 };
  const ds = 1.5;
  const dx = 700;
  const dy = g + 26;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={g - 200} t={t} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,240,220,0.85)">
          <Dog x={dx} y={dy} s={ds} phase={0} walk={0} look={MAPLE} mood="sad" headUp={0.6} tailWag={0} flip />
          <Person {...p} outfit={LEO} expression="neutral" />
          <Leash a={handOf(p, 1)} b={dogCollar(dx, dy, ds, true)} sag={70} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f3a3a" side="left" />
      </Plane>
      <Particles seed={2323} n={14} col="#ffffff" fall={5} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="245,236,224" cool="30,45,80" vignette={0.5} />
      <Chip text="Dogs still need water" t={t} t0={6.3} x={60} y={170} icon="none" big />
      <Chip text="Even in winter" t={t} t0={7.2} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: a bottle just for her, small sips at the break (8.1 - 11.0) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.9), rot: hh.rot };
  const s = 3.4;
  const x = 150;
  const y = 1640;
  const come = at(t, [8.2, 8.8], [0, 1], outExpo);
  const bx = mix(1200, 760, come);
  const by = 1250;
  const drink = at(t, [9.0, 9.3], [0, 1]);
  const lap = Math.max(0, Math.sin(t * 10)) ** 2 * drink;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="d" treeY={1300} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,214,150,0.9)">
          <Dog x={x} y={y} s={s} phase={0} walk={0} look={MAPLE} mood="happy" headUp={-0.6 * drink} tailWag={t * 9} />
          {drink > 0 && <ellipse cx={x + 150 * s} cy={y - 120 * s + lap * 14} rx={14} ry={10 + lap * 14} fill="#d9667a" />}
          {/* Leo's arm from the right, gloved hand under the bottle */}
          <path d={`M${bx + 120},${by + 40} L1400,${by + 420}`} stroke={LEO.jacket} strokeWidth={150} strokeLinecap="round" />
          <ellipse cx={bx + 90} cy={by + 40} rx={86} ry={60} fill="#2a2a2a" />
          <DogBottle x={bx} y={by} s={1.25} rot={180} fill={at(t, [8.6, 9.0], [0, 1])} t={t} />
        </Subject>
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 200} strength={0.28} col="255,214,150" />
      <Particles seed={2324} n={12} col="#fff3d6" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={600} warm="255,214,170" vignette={0.5} />
      <Chip text="A bottle just for her" t={t} t0={8.2} x={60} y={170} icon="check" big />
      <Chip text="Sips at each break" t={t} t0={9.6} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/dog-water-bottle-with-bowl-cut.png"
      cutoutH={760}
      spec="BOTTLE + BOWL · 350 OR 550 ML"
      name={
        <>
          Dog Water
          <br />
          Bottle
        </>
      }
      nameSize={108}
      price="From $19.99"
      save="Save this for your next hike"
    />
  );
};

export const V232: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.38} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.3} to={6.28} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.3} />
    </Scene>
    <Scene from={6.2} to={8.18} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={6.2} />
    </Scene>
    <Scene from={8.1} to={11.1} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={8.1} />
    </Scene>
    <Scene from={11.0} to={15.5} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.3, 1600],
        [3.3, 6.2, 1600],
        [6.2, 8.1, 1600],
        [8.1, 11.0, 1600],
      ]}
    />
  </AbsoluteFill>
);
