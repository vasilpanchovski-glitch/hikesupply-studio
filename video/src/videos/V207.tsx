// V207: "Winter break. Bored kids by mile one." Short format (15.0 s, 39 words), cinematic C01 style.
// Product: Kids Trail Explorer Pack — Scavenger Hunts & Junior Hiker Journal, $4.99 (live Shopify). End card = the real store
// card image (full-bleed photo cover, so the boxed photo card). Advice: give kids a small mission (find three animal tracks)
// instead of a distance goal. No numbers or claims beyond that.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { FrostTrail, SNOW, SNOW2, WGOLD, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v207.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const MARCO: Outfit = {
  ...JAKE,
  skin: "#D9A07C",
  skinShade: "#BC835F",
  hair: "#2a1e16",
  beard: "#2a1e16",
  cap: "#3E4F5C",
  capShade: "#2C3943",
  jacket: "#3F6B55",
  jacketShade: "#2D5141",
  pants: "#3d4148",
  pantsShade: "#2c2f35",
  pack: "#B5553A",
  packShade: "#8E3F2A",
  glove: "#2a2a2a",
};
const LIA: Outfit = {
  ...JAKE,
  skin: "#D9A07C",
  skinShade: "#BC835F",
  hair: "#2a1e16",
  ponytail: "#2a1e16",
  beard: null,
  cap: "#C8476A",
  capShade: "#A23552",
  jacket: "#E3B23C",
  jacketShade: "#c0952c",
  pants: "#3E4650",
  pantsShade: "#2E353D",
  pack: "#2F7F86",
  packShade: "#235f64",
  glove: "#C8476A",
};
const TEO: Outfit = {
  ...JAKE,
  skin: "#D9A07C",
  skinShade: "#BC835F",
  hair: "#2a1e16",
  beard: null,
  cap: "#2F5F8A",
  capShade: "#234868",
  jacket: "#C4572E",
  jacketShade: "#9a4322",
  pants: "#33373e",
  pantsShade: "#25282d",
  pack: "#E3B23C",
  packShade: "#c0952c",
  glove: "#2F5F8A",
};

// Rabbit-style track group (two small front prints behind two long hind prints), local coords.
const Rabbit: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
    <ellipse cx={-14} cy={40} rx={9} ry={10} fill="#b9c6d0" />
    <ellipse cx={6} cy={58} rx={9} ry={10} fill="#b9c6d0" />
    <ellipse cx={-26} cy={-10} rx={12} ry={26} fill="#b9c6d0" />
    <ellipse cx={22} cy={-12} rx={12} ry={26} fill="#b9c6d0" />
  </g>
);
// Deer-style hoof print (two split teardrops), local coords.
const Hoof: React.FC<{ x: number; y: number; s?: number; rot?: number; o?: number }> = ({ x, y, s = 1, rot = 0, o = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M-4,-34 Q-24,-10 -20,18 Q-12,30 -4,18 Z" fill="#b9c6d0" />
    <path d="M4,-34 Q24,-10 20,18 Q12,30 4,18 Z" fill="#b9c6d0" />
  </g>
);
// Bird track (three toes forward, one back), local coords.
const Bird: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={o} stroke="#aebbc6" strokeWidth={6} strokeLinecap="round" fill="none">
    <path d="M0,0 L0,-30 M0,0 L-20,-22 M0,0 L20,-22 M0,0 L0,18" />
  </g>
);

// ============ S1 HOOK WIDE: Marco and two bored kids on a snowy trail (0 - 3.63) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.1, t / 3.63), rot: hh.rot };
  const g = 1560;
  const m: HikerProps = { x: 760, y: g + 50, scale: 2.0, walk: 0, lean: 0, poles: false, handOverride: [20, 40], breathe: Math.sin(t * 2) * 1.4 };
  const a: HikerProps = { x: 300, y: g + 70, scale: 1.35, walk: 0, lean: 0.14, poles: false, handOverride: [10, 46], breathe: Math.sin(t * 2.6) * 1.2 };
  const b: HikerProps = { x: 480, y: g + 80, scale: 1.25, walk: 0, lean: 0.16, poles: false, handOverride: [10, 46], breathe: Math.sin(t * 2.4) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 240} t={t} snow={1} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} col="255,248,230" />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <Person {...a} outfit={LIA} expression="tired" noPack />
          <Person {...b} outfit={TEO} expression="tired" noPack />
          <Person {...m} outfit={MARCO} expression="neutral" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Particles seed={2071} n={14} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,244,232" cool="40,60,90" />
      <Title text={"Winter break.\nBored kids\nby mile one."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: Marco gives them a job (3.63 - 5.5) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.87), rot: hh.rot };
  const g = 1480;
  const point = at(t, [3.9, 4.3], [0, 1], outExpo);
  const m: HikerProps = { x: 700, y: g + 182 * 2.4 - 180, scale: 2.4, walk: 0, lean: 0.06, poles: false, handOverride: [mix(20, 70, point), mix(40, -20, point)], breathe: Math.sin(t * 2) * 1.4 };
  const a: HikerProps = { x: 260, y: g + 182 * 1.6 - 90, scale: 1.6, walk: 0, lean: 0.02, poles: false, handOverride: [20, 40], breathe: Math.sin(t * 2.6) * 1.2 };
  const b: HikerProps = { x: 440, y: g + 182 * 1.5 - 80, scale: 1.5, walk: 0, lean: 0.02, poles: false, handOverride: [20, 40], breathe: Math.sin(t * 2.4) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={g - 200} t={t} snow={1} blur={1.5} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 200} snow={1} />
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <Person {...a} outfit={LIA} expression={t > 4.6 ? "happy" : "neutral"} noPack />
          <Person {...b} outfit={TEO} expression={t > 4.8 ? "happy" : "neutral"} noPack />
          <Person {...m} outfit={MARCO} expression="happy" flip />
        </Subject>
      </Plane>
      <Particles seed={2072} n={14} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,244,232" cool="40,60,90" />
      <Chip text="Their job:" t={t} t0={3.8} x={60} y={200} icon="none" big />
      <Chip text="Find 3 animal tracks" t={t} t0={4.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: tracks in the snow, a mitten points, the count goes up (5.5 - 7.62) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 2.12), rot: hh.rot };
  const f1 = at(t, [5.6, 5.9], [0, 1]);
  const f2 = at(t, [6.2, 6.5], [0, 1]);
  const f3 = at(t, [6.8, 7.1], [0, 1]);
  const found = t < 6.2 ? "1 / 3" : t < 6.8 ? "2 / 3" : "3 / 3";
  const mx = t < 6.2 ? 330 : t < 6.8 ? 760 : 520;
  const my = t < 6.2 ? 900 : t < 6.8 ? 1120 : 1420;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill={SNOW} />
          {Array.from({ length: 12 }, (_, i) => (
            <ellipse key={i} cx={(i * 263) % 1080} cy={300 + ((i * 397) % 1500)} rx={120} ry={30} fill={SNOW2} opacity={0.6} />
          ))}
          {[0, 1, 2].map((i) => (
            <Rabbit key={i} x={260 + i * 70} y={1020 - i * 170} s={1.6} o={0.3 + 0.7 * f1} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <Hoof key={i} x={700 + (i % 2) * 70} y={1500 - i * 150} s={1.7} rot={-8} o={0.3 + 0.7 * f2} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <Bird key={i} x={380 + i * 60 + (i % 2) * 20} y={1660 - i * 30} s={1.4} o={0.3 + 0.7 * f3} />
          ))}
          {/* a child's mittened hand pointing at the newest find, arm in from the right edge */}
          <g transform={`translate(${mx + 70},${my - 30}) rotate(-35)`}>
            <path d="M40,40 L170,40 L190,420 L30,420 Z" fill={LIA.jacket} />
            <path d="M40,40 L170,40 L168,70 L42,70 Z" fill={LIA.jacketShade} />
            <rect x={36} y={-10} width={138} height={56} rx={18} fill="#f1e6d6" />
            <path d="M44,0 Q20,-120 90,-150 Q160,-140 166,-60 L170,0 Z" fill={LIA.glove ?? "#C8476A"} />
            <ellipse cx={34} cy={-50} rx={22} ry={40} fill={LIA.glove ?? "#C8476A"} transform="rotate(-25 34 -50)" />
            <path d="M80,-130 L80,-30 M120,-132 L122,-30" stroke="#A23552" strokeWidth={5} opacity={0.6} />
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={16}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(120,150,180,0.25) 0%, rgba(255,255,255,0) 45%, rgba(110,140,170,0.2) 100%)" }} />
      <Particles seed={2073} n={10} col="#ffffff" fall={8} bokeh />
      <Grade sunX={800} sunY={300} warm="255,244,228" cool="40,60,90" vignette={0.5} />
      <Readout label="TRACKS FOUND" value={found} ok={t >= 6.8 ? true : null} t={t} t0={5.6} x={60} y={180} pulseAt={t >= 6.8 ? 6.8 : t >= 6.2 ? 6.2 : undefined} />
    </AbsoluteFill>
  );
};

// ============ S4 WIDE: the rule. Kids run ahead on the trail, happy (7.62 - 10.3) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 22, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.68), rot: hh.rot };
  const g = 1500;
  const ph = t * 4;
  const a: HikerProps = { x: 560 + lt * 120, y: g + 40, scale: 1.3, phase: ph, walk: 0.9, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.9) };
  const b: HikerProps = { x: 380 + lt * 120, y: g + 50, scale: 1.2, phase: ph + 1.4, walk: 0.9, lean: 0.08, poles: false, handOverride: freeHand(ph + 1.4, 0.9) };
  const m: HikerProps = { x: 150 + lt * 100, y: g + 40, scale: 1.8, phase: t * 3, walk: 0.6, lean: 0.05, poles: false, handOverride: freeHand(t * 3, 0.5) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="d" treeY={g - 240} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,226,180,0.9)">
          <Person {...m} outfit={MARCO} expression="happy" />
          <Person {...b} outfit={TEO} expression="happy" noPack />
          <Person {...a} outfit={LIA} expression="happy" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.4} col="255,226,170" />
      <Particles seed={2074} n={18} col="#fff4dc" bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,226,186" cool="40,60,90" />
      <Chip text="The rule" t={t} t0={7.7} x={60} y={200} icon="none" big />
      <Chip text="A mission, not a distance" t={t} t0={8.3} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/kids-trail-explorer-pack-scavenger-hunts-junior-hiker-journal-card.jpg"
      spec="SCAVENGER HUNTS · JUNIOR HIKER JOURNAL"
      name={
        <>
          Kids Trail
          <br />
          Explorer Pack
        </>
      }
      nameSize={96}
      price="$4.99"
      save="Save this for your next family hike"
    />
  );
};

export const V207: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.71} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.63} to={5.58} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.63} />
    </Scene>
    <Scene from={5.5} to={7.7} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.5} />
    </Scene>
    <Scene from={7.62} to={10.4} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={7.62} />
    </Scene>
    <Scene from={10.3} to={15.0} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.63, 1600],
        [3.63, 7.62, 1600],
        [7.62, 10.3, 1600],
      ]}
    />
  </AbsoluteFill>
);
