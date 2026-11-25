// V220: "Two poles. One dog. No hands." Short format (15.6 s, 42 words), cinematic C01 style, autumn trail with a dog.
// Product: Hands-Free Dog Leash — Adjustable Waist Belt with Reflective Double Bungee, $26.99 (live Shopify). End card: real store cover, cut out.
// Advice (from the listing's own guidance, conservative): clip the leash to a waist belt so a pull goes through your hips, not
// your arm; keep it short (short handle near the clip) when you pass people. Dog and leash drawing like V162 / V217.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, CLEAR, FALL, GOLD, Subject, Trail } from "../fall";
import { Dog, dogCollar, JUNIPER } from "../dog";
import vo from "../vo/v220.json";

const words = vo.words as unknown as Word[];

const BELT = "#7d8288"; // grey, like the store photo
const BLUE = "#2f56c8";
const SAM: Outfit = {
  ...JAKE,
  skin: "#8E5B3E",
  skinShade: "#734630",
  hair: "#1c130e",
  beard: "#1c130e",
  cap: "#C9B48E",
  capShade: "#A8946F",
  jacket: "#4E6E3A",
  jacketShade: "#3b552b",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#C2662E",
  packShade: "#9B4E20",
  glove: null,
};
const PASSER: Outfit = { ...GUIDE, jacket: "#8E3B46", jacketShade: "#6f2c36", ponytail: "#3b2416", hair: "#3b2416", beard: null };

const toScreen = (p: HikerProps, q: readonly number[]): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};
const handOf = (p: HikerProps, i: number) => toScreen(p, hikerGeometry(p).arms[i].hand);
const beltFront = (p: HikerProps) => toScreen(p, [hikerGeometry(p).hip[0] + 22, hikerGeometry(p).hip[1] - 4]);

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Plain leash line (grey bungee part optional) from a to b.
const Leash: React.FC<{ a: [number, number]; b: [number, number]; w?: number; sag?: number; col?: string }> = ({ a, b, w = 6, sag = 60, col = BLUE }) => (
  <path d={`M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${Math.max(a[1], b[1]) + sag} ${b[0]},${b[1]}`} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />
);

// Waist belt on a Person (hiker coords), worn at the hips.
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

// ============ S1 HOOK WIDE: Sam with two poles, the dog pulls ahead on a hand-held leash (0 - 3.22) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.04, 1.1, t / 3.2), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.4;
  const tug = Math.max(0, Math.sin(t * 2.6)) ;
  const p: HikerProps = { x: 300 + t * 40, y: g + 20, scale: 2.2, phase: ph, walk: 0.6, lean: 0.2 + tug * 0.08, poles: true, breathe: Math.sin(t * 3) * 1.5 };
  const dx = 720 + t * 44 + tug * 20;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="a" treeY={g - 220} t={t} />
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.2} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={5}>
          <Person {...p} outfit={SAM} expression="tired" />
          <Dog x={dx} y={g + 26} s={1.15} phase={t * 8} walk={1} look={JUNIPER} mood="happy" tailWag={t * 12} />
          <Leash a={handOf(p, 1)} b={dogCollar(dx, g + 26, 1.15)} sag={4} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="right" />
      </Plane>
      <Particles seed={2201} n={14} col="#fff3d6" fall={6} leaves={FALL} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,226,180" cool="40,50,70" vignette={0.5} />
      <Title text={"Two poles.\nOne dog.\nNo hands."} t={t} t0={0} top={110} size={132} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: one hand on the pole AND the leash, yanked forward on the steep part (3.22 - 5.6) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const jerk = Math.max(0, Math.sin(t * 5)) ** 4;
  const hh = handheld(t, 0.4, jerk * 1.2);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.02], outExpo), rot: hh.rot };
  const hx = 470 + jerk * 50;
  const hy = 980;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="b" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6}>
          <Svg>
            {/* sleeve and fist */}
            <path d={`M-200,${hy + 300} L${hx - 120},${hy + 40} L${hx - 40},${hy + 140} L-200,${hy + 480} Z`} fill={SAM.jacket} />
            {/* pole shaft through the fist, tip down the slope */}
            <rect x={hx - 16} y={hy - 420} width={32} height={1300} rx={14} fill="#B9C0C4" transform={`rotate(${-12 + jerk * 8} ${hx} ${hy})`} />
            <rect x={hx - 30} y={hy - 130} width={60} height={210} rx={22} fill="#222" transform={`rotate(${-12 + jerk * 8} ${hx} ${hy})`} />
            {/* leash loop round the wrist, pulled taut to the right */}
            <path d={`M${hx - 70},${hy + 60} Q${hx - 20},${hy + 120} ${hx + 60},${hy + 70}`} stroke={BLUE} strokeWidth={22} fill="none" strokeLinecap="round" />
            <path d={`M${hx + 60},${hy + 70} L1240,${hy + 120 - jerk * 60}`} stroke={BLUE} strokeWidth={22} strokeLinecap="round" />
            <ellipse cx={hx} cy={hy} rx={92} ry={74} fill={SAM.skin} />
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={hx + 26} y={hy - 58 + i * 32} width={64} height={30} rx={15} fill={i % 2 ? SAM.skinShade : SAM.skin} />
            ))}
            <path d={`M${hx - 70},${hy - 40} Q${hx},${hy - 90} ${hx + 60},${hy - 60}`} stroke={SAM.skinShade} strokeWidth={22} fill="none" strokeLinecap="round" />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2202} n={12} col="#fff3d6" fall={6} leaves={FALL} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,226,180" cool="40,50,70" vignette={0.55} />
      <Chip text="The steep part" t={t} t0={3.3} x={60} y={170} icon="none" big />
      <Chip text="No hand left" t={t} t0={4.3} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the fix: the leash clips onto the waist belt's ring (5.6 - 7.6) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.0), rot: hh.rot };
  const clip = at(t, [6.1, 6.9], [0, 1], outExpo);
  const ringX = 560;
  const ringY = 1010;
  const hookX = mix(980, ringX + 40, clip);
  const hookY = mix(1180, ringY + 40, clip);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="c" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Svg>
            {/* jacket hem and trousers */}
            <path d="M-100,-200 L1180,-200 L1180,880 L-100,860 Z" fill={SAM.jacket} />
            <path d="M-100,-200 L300,-200 L250,870 L-100,860 Z" fill={SAM.jacketShade} opacity={0.6} />
            <path d="M610,-200 L600,872" stroke={SAM.jacketShade} strokeWidth={14} />
            <rect x={590} y={300} width={22} height={60} rx={6} fill="#c9ced2" />
            <path d="M-100,820 L1180,840" stroke={SAM.jacketShade} strokeWidth={30} />
            <path d="M-100,860 L1180,880 L1180,2000 L-100,2000 Z" fill={SAM.pants} />
            <path d="M520,1000 L540,2000" stroke={SAM.pantsShade} strokeWidth={10} />
            {/* the grey waist belt with buckle and ring */}
            <path d="M-100,900 Q540,960 1180,920 L1180,1030 Q540,1070 -100,1010 Z" fill={BELT} />
            <path d="M-100,915 Q540,975 1180,935" stroke="#9aa0a6" strokeWidth={4} fill="none" strokeDasharray="14 10" />
            <rect x={230} y={918} width={130} height={110} rx={18} fill="#1d1f22" />
            <circle cx={295} cy={973} r={22} fill="#d9443a" />
            <circle cx={ringX} cy={ringY + 30} r={36} fill="none" stroke="#c9ced2" strokeWidth={12} />
            {/* the leash: snap hook moving to the ring, grey strap, blue section */}
            <path d={`M${hookX + 70},${hookY + 40} Q${hookX + 260},${hookY + 260} 1200,${hookY + 420}`} stroke={BELT} strokeWidth={46} fill="none" strokeLinecap="round" />
            <path d={`M${hookX + 200},${hookY + 180} Q${hookX + 320},${hookY + 300} 1200,${hookY + 420}`} stroke={BLUE} strokeWidth={46} fill="none" strokeLinecap="round" />
            <g transform={`translate(${hookX},${hookY}) rotate(35)`}>
              <rect x={-14} y={-60} width={28} height={110} rx={12} fill="#c9ced2" />
              <path d="M0,-60 Q-40,-110 0,-140 Q34,-112 14,-72" stroke="#c9ced2" strokeWidth={14} fill="none" />
              <rect x={-24} y={40} width={48} height={40} rx={10} fill="#aeb4b9" />
            </g>
            {/* hand guiding the hook */}
            <g opacity={at(t, [5.7, 5.9, 7.0, 7.3], [0, 1, 1, 0])}>
              <ellipse cx={hookX + 110} cy={hookY + 90} rx={90} ry={66} fill={SAM.skin} />
              <path d={`M${hookX + 160},${hookY + 130} L1300,${hookY + 520}`} stroke={SAM.jacket} strokeWidth={150} strokeLinecap="round" />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1] - 200} strength={0.3} />
      <Particles seed={2203} n={12} col="#fff3d6" fall={5} bokeh />
      <LowScrim />
      <Grade sunX={740} sunY={560} warm="255,226,180" vignette={0.5} />
      <Chip text="The fix" t={t} t0={5.7} x={60} y={170} icon="none" big />
      <Chip text="Leash on a waist belt" t={t} t0={6.6} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: up the steep part, both poles free, the dog's pull goes to the hips (7.6 - 9.72) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.1), rot: hh.rot };
  const g = 1520;
  const ph = t * 3.2;
  const tug = Math.max(0, Math.sin(t * 2.4));
  const p: HikerProps = { x: 330 + lt * 40, y: g + 20, scale: 2.4, phase: ph, walk: 0.6, lean: 0.16, poles: true, breathe: 0 };
  const dx = 780 + lt * 40 + tug * 24;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={g - 220} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={5}>
          <Person {...p} outfit={SAM} expression="happy" />
          <Belt p={p} />
          <Dog x={dx} y={g + 26} s={1.2} phase={t * 6} walk={0.9} look={JUNIPER} mood="happy" tailWag={t * 12} />
          <Leash a={beltFront(p)} b={dogCollar(dx, g + 26, 1.2)} sag={mix(40, 6, tug)} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Particles seed={2204} n={14} col="#fff3d6" fall={6} leaves={FALL} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,226,180" cool="40,50,70" vignette={0.5} />
      <Chip text="Both hands free" t={t} t0={7.7} x={60} y={170} icon="check" big />
      <Chip text="The pull goes to your hips" t={t} t0={8.4} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: other hikers pass, the dog is kept short at his side (9.72 - 11.38) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.06, lt / 1.7), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 300, y: g + 20, scale: 2.4, walk: 0, lean: 0.04, poles: false, handOverride: [26, 30], breathe: Math.sin(t * 2) * 1.5 };
  const ph2 = t * 3.4;
  const q: HikerProps = { x: 1150 - lt * 170, y: g + 30, scale: 2.3, phase: ph2, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph2, 0.6), breathe: 0 };
  const dx = 470;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={g - 220} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={5}>
          <Person {...q} outfit={PASSER} expression="happy" flip />
          <Dog x={dx} y={g + 30} s={1.2} phase={0} walk={0} look={JUNIPER} mood="happy" tailWag={t * 6} />
          <Person {...p} outfit={SAM} expression="happy" />
          <Belt p={p} />
          <Leash a={handOf(p, 1)} b={dogCollar(dx, g + 30, 1.2)} sag={4} />
        </Subject>
      </Plane>
      <Particles seed={2205} n={12} col="#fff3d6" fall={5} leaves={FALL} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,226,180" cool="40,50,70" vignette={0.5} />
      <Chip text="Near people" t={t} t0={9.8} x={60} y={170} icon="none" big />
      <Chip text="Keep it short" t={t} t0={10.3} x={60} y={300} icon="check" big />
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
      save="Save this for your next dog hike"
    />
  );
};

export const V220: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.3} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.22} to={5.68} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.22} />
    </Scene>
    <Scene from={5.6} to={7.68} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.6} />
    </Scene>
    <Scene from={7.6} to={9.8} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={7.6} />
    </Scene>
    <Scene from={9.72} to={11.38} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.72} />
    </Scene>
    <Scene from={11.3} to={15.6} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.22, 1600],
        [3.22, 5.6, 1600],
        [5.6, 7.6, 1600],
        [7.6, 9.72, 1600],
        [9.72, 11.3, 1600],
      ]}
    />
  </AbsoluteFill>
);
