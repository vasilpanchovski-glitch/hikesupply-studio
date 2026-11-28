// V237: "One squirrel. The leash clip opened." Short format (16.8 s, 41 words), cinematic C01 style, snowy winter trail with a dog.
// Product: Hands-Free Dog Leash — Adjustable Waist Belt with Reflective Double Bungee, $26.99 (live Shopify). End card: real store cover, cut out.
// Advice (plain, conservative): check the leash clip, rings and buckle before every hike; hold the short handle when people,
// bikes or horses pass. Dog, belt and leash drawing from V220.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { FrostTrail, WINTER, WGOLD, WinterBackdrop } from "../winter";
import { PlanPage } from "../home";
import { Dog, dogCollar, DogLook } from "../dog";
import vo from "../vo/v237.json";

const words = vo.words as unknown as Word[];

const BELT = "#7d8288";
const BLUE = "#2f56c8";
const RED = "#B8453A";
const AVA: Outfit = {
  ...GUIDE,
  skin: "#E2B08E",
  skinShade: "#C48F6C",
  hair: "#7a4a2a",
  ponytail: "#7a4a2a",
  beard: null,
  cap: "#2E7D6B",
  capShade: "#236152",
  jacket: "#6B4C8A",
  jacketShade: "#553a6f",
  pants: "#33373e",
  pantsShade: "#25282d",
  pack: "#C2662E",
  packShade: "#9B4E20",
  glove: null,
};
const PASSER: Outfit = { ...GUIDE, jacket: "#2F6E5A", jacketShade: "#235546", ponytail: null, hair: "#2a1c14", beard: "#2a1c14", cap: "#a33a32", capShade: "#82302a" };
const BEAR: DogLook = { coat: "#2b2622", shade: "#1c1916", belly: "#a88a6a", ear: "#1c1916", collar: "#d9443a", nose: "#120e0b" };

const toScreen = (p: HikerProps, q: readonly number[]): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};
const handOf = (p: HikerProps, i: number) => toScreen(p, hikerGeometry(p).arms[i].hand);

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const Leash: React.FC<{ a: [number, number]; b: [number, number]; w?: number; sag?: number; col?: string }> = ({ a, b, w = 6, sag = 60, col = RED }) => (
  <path d={`M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${Math.max(a[1], b[1]) + sag} ${b[0]},${b[1]}`} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />
);

const Belt: React.FC<{ p: HikerProps }> = ({ p }) => {
  const [hx, hy] = hikerGeometry(p).hip;
  return (
    <g transform={hikerTransform(p)}>
      <rect x={hx - 26} y={hy - 12} width={52} height={11} rx={4} fill={BELT} />
      <rect x={hx + 4} y={hy - 13} width={10} height={13} rx={2} fill="#1d1f22" />
      <circle cx={hx + 22} cy={hy - 3} r={4} fill="none" stroke="#c9ced2" strokeWidth={2} />
    </g>
  );
};

// A grey squirrel, facing left, feet at (0,0).
const Squirrel: React.FC<{ x: number; y: number; s?: number; t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d={`M18,-10 Q70,-30 56,-90 Q46,-130 ${20 + Math.sin(t * 6) * 6},-120 Q40,-80 14,-40 Z`} fill="#8a7f78" />
    <ellipse cx={0} cy={-26} rx={22} ry={26} fill="#9a8f87" />
    <ellipse cx={-6} cy={-18} rx={12} ry={16} fill="#d8cfc6" />
    <circle cx={-12} cy={-58} r={15} fill="#9a8f87" />
    <path d="M-8,-72 l4,-12 l6,10 z" fill="#8a7f78" />
    <circle cx={-18} cy={-60} r={3} fill="#1a1412" />
    <ellipse cx={-6} cy={-2} rx={12} ry={5} fill="#7a706a" />
  </g>
);

// ============ S1 HOOK MEDIUM: Ava walks her dog, a squirrel on the trail ahead (0 - 2.0) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.04, 1.1, t / 2.0), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.2;
  const lunge = at(t, [1.3, 1.7], [0, 1], outExpo);
  const p: HikerProps = { x: 260 + t * 34, y: g + 20, scale: 2.2, phase: ph, walk: 0.5, lean: 0.05 + lunge * 0.15, poles: false, handOverride: [60, 40] };
  const dx = 560 + t * 30 + lunge * 60;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 200} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.3} />
        <Subject rimX={5} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={AVA} expression={lunge > 0.5 ? "tired" : "happy"} />
          <Dog x={dx} y={g + 26} s={1.35} phase={t * 8} walk={1} look={BEAR} mood="alert" tailWag={t * 12} headUp={0.3} />
          <Leash a={handOf(p, 1)} b={dogCollar(dx, g + 26, 1.35)} sag={mix(30, 2, lunge)} />
          <Squirrel x={960} y={g + 20} s={2.2} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2c3f2a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.24} col="255,246,220" />
      <Particles seed={2371} n={14} col="#fff3d6" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" vignette={0.5} />
      <Title text={"One squirrel.\nThe leash\nclip opened."} t={t} t0={0} top={110} size={120} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the old snap clip springs open and the collar ring slips out (2.0 - 3.7) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const pop = at(t, [2.9, 3.1], [0, 1]);
  const hh = handheld(t, 0.35, pop > 0 && pop < 1 ? 1 : at(t, [3.1, 3.4], [1, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.12, 1.03], outExpo), rot: hh.rot };
  const gate = at(t, [2.85, 3.0], [0, 1]);
  const fly = at(t, [3.0, 3.6], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1250} blur={12} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,236,200,0.85)">
          <Svg>
            {/* leash strap coming in from the left */}
            <path d="M-100,1150 Q240,1060 430,980" stroke={RED} strokeWidth={60} fill="none" strokeLinecap="round" />
            {/* worn snap clip */}
            <g transform="translate(470,960) rotate(-20)">
              <rect x={-30} y={-26} width={70} height={52} rx={14} fill="#8d8a84" />
              <path d="M40,-14 L260,-14 Q330,-14 330,40 Q330,96 260,96 L200,96" stroke="#9c9890" strokeWidth={30} fill="none" strokeLinecap="round" />
              <path d="M40,14 L210,14" stroke="#7a766f" strokeWidth={24} strokeLinecap="round" />
              {/* spring gate */}
              <g transform={`translate(200,96) rotate(${-gate * 55})`}>
                <rect x={-150} y={-12} width={150} height={24} rx={10} fill="#b5b1a8" />
              </g>
              {/* rust spots */}
              <circle cx={120} cy={-14} r={9} fill="#8a5a36" opacity={0.7} />
              <circle cx={280} cy={10} r={7} fill="#8a5a36" opacity={0.7} />
            </g>
            {/* collar ring slipping out and away to the right */}
            <g transform={`translate(${mix(700, 1240, fly)},${mix(1030, 880, fly)}) rotate(${fly * 80})`}>
              <circle cx={0} cy={0} r={48} fill="none" stroke="#c9ced2" strokeWidth={16} />
              <path d="M40,10 L400,60" stroke={BEAR.collar} strokeWidth={56} strokeLinecap="round" />
            </g>
            {/* Ava's hand on the strap */}
            <ellipse cx={130} cy={1110} rx={90} ry={70} fill={AVA.skin} />
            <path d="M-200,1260 L80,1120" stroke={AVA.jacket} strokeWidth={170} strokeLinecap="round" />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2372} n={12} col="#fff3d6" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,236,214" cool="40,60,90" vignette={0.55} />
      <Chip text="Old leash clip" t={t} t0={2.1} x={60} y={170} icon="none" big />
      <Chip text="Opened" t={t} t0={3.1} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: the dog runs off down the trail, Ava holds an empty leash (3.7 - 5.2) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.07, lt / 1.5), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 300, y: g + 20, scale: 2.1, walk: 0, lean: 0.12, poles: false, handOverride: [90, 10], breathe: Math.sin(t * 4) * 2 };
  const dx = 640 + lt * 380;
  const hand = handOf(p, 1);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={g - 200} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.3} />
        <Subject rimX={5} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={AVA} expression="tired" />
          <path d={`M${hand[0]},${hand[1]} Q${hand[0] + 40},${hand[1] + 160} ${hand[0] + 110},${g + 16}`} stroke={RED} strokeWidth={6} fill="none" strokeLinecap="round" />
          <Dog x={dx} y={g + 26} s={1.1} phase={t * 12} walk={1.2} look={BEAR} mood="alert" tailWag={t * 14} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2c3f2a" side="left" />
      </Plane>
      <Particles seed={2373} n={12} col="#fff3d6" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" vignette={0.5} />
      <Chip text="Gone down the trail" t={t} t0={3.8} x={60} y={170} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the rule, the pre-hike check (5.2 - 8.9) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 3.7), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1250} blur={14} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,236,200,0.7)">
          <Svg>
            <g transform="translate(170,470) rotate(-2) scale(1.3)">
              <PlanPage x={0} y={0} w={560} rows={[["Clip", "Snaps shut"], ["Rings", "No cracks, no rust"], ["Buckle", "Clicks, holds"]]} t={t} t0={6.2} gap={0.5} title="LEASH CHECK" />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2374} n={10} col="#fff3d6" fall={3} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" vignette={0.55} />
      <Chip text="The rule" t={t} t0={5.35} x={60} y={170} icon="none" big />
      <Chip text="Check before every hike" t={t} t0={7.6} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: a hiker passes, Ava holds the short handle, dog close at her side (8.9 - 12.7) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.06, lt / 3.8), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 300, y: g + 20, scale: 2.4, walk: 0, lean: 0.04, poles: false, handOverride: [26, 30], breathe: Math.sin(t * 2) * 1.5 };
  const ph2 = t * 3.4;
  const q: HikerProps = { x: 1250 - lt * 150, y: g + 30, scale: 2.3, phase: ph2, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph2, 0.6), breathe: 0 };
  const dx = 470;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="e" treeY={g - 200} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.3} />
        <Subject rimX={5} col="rgba(255,214,150,0.85)">
          <Person {...q} outfit={PASSER} expression="happy" flip />
          <Dog x={dx} y={g + 30} s={1.2} phase={0} walk={0} look={BEAR} mood="happy" tailWag={t * 6} />
          <Person {...p} outfit={AVA} expression="happy" />
          <Belt p={p} />
          <Leash a={handOf(p, 1)} b={dogCollar(dx, g + 30, 1.2)} sag={4} col={BLUE} />
        </Subject>
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 200} strength={0.26} col="255,214,150" />
      <Particles seed={2375} n={12} col="#fff3d6" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={600} warm="255,214,170" vignette={0.5} />
      <Chip text="People, bikes, horses" t={t} t0={10.5} x={60} y={170} icon="none" big />
      <Chip text="Hold the short handle" t={t} t0={9.5} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/hands-free-dog-leash-cut.png"
      cutoutH={640}
      spec="WAIST BELT · DOUBLE BUNGEE · REFLECTIVE"
      name={
        <>
          Hands-Free
          <br />
          Dog Leash
        </>
      }
      nameSize={104}
      price="$26.99"
      save="Save this before your next dog hike"
    />
  );
};

export const V237: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.08} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.0} to={3.78} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.0} />
    </Scene>
    <Scene from={3.7} to={5.28} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={3.7} />
    </Scene>
    <Scene from={5.2} to={8.98} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={5.2} />
    </Scene>
    <Scene from={8.9} to={12.8} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={8.9} />
    </Scene>
    <Scene from={12.7} to={16.8} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.0, 1600],
        [2.0, 3.7, 1600],
        [3.7, 5.2, 1600],
        [5.2, 8.9, 1600],
        [8.9, 12.7, 1600],
      ]}
    />
  </AbsoluteFill>
);
