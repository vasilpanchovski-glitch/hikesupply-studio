// V226: "Every pull hit her dog's throat." Short format (15.8 s, 41 words), cinematic C01 style, winter woods trail with a dog.
// Product: Padded Dog Harness — Reflective, Adjustable, with Handle and Quick-Release Buckles, S to XL, from $29.99 (live Shopify,
// $29.99-$32.99 by size). End card: real store cover (black), cut out.
// Advice (plain, common): a leash on a collar puts a pull on the dog's throat; on a harness the pull spreads across the chest,
// and the handle helps over logs and steps. No medical claims. Dog and leash drawing like V220.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { FrostTrail, WINTER, WGOLD, WinterBackdrop } from "../winter";
import { Dog, dogCollar, DogLook } from "../dog";
import vo from "../vo/v226.json";

const words = vo.words as unknown as Word[];

const ROSIE: Outfit = {
  ...GUIDE,
  skin: "#C68E6C",
  skinShade: "#A87253",
  hair: "#2a1a12",
  beard: null,
  ponytail: "#2a1a12",
  cap: "#D9A43A",
  capShade: "#b7862a",
  jacket: "#5B4A8A",
  jacketShade: "#45386b",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  pack: "#3F6B55",
  packShade: "#2D5141",
  glove: null,
};
const BRUNO: DogLook = { coat: "#3b2f2a", shade: "#2a211d", belly: "#c9a27a", ear: "#2a211d", collar: "#B83A3A", nose: "#141010" };
const LEASH = "#2f56c8";
const HARN = "#1d1f22";
const TRIM = "#b9bfc4";

const toScreen = (p: HikerProps, q: readonly number[]): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};
const handOf = (p: HikerProps, i: number) => toScreen(p, hikerGeometry(p).arms[i].hand);
// Harness back ring and handle in screen units (dog faces right, not flipped).
const dogRing = (x: number, y: number, s: number): [number, number] => [x + 54 * s, y - 146 * s];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const Leash: React.FC<{ a: [number, number]; b: [number, number]; w?: number; sag?: number }> = ({ a, b, w = 6, sag = 60 }) => (
  <path d={`M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${Math.max(a[1], b[1]) + sag} ${b[0]},${b[1]}`} stroke={LEASH} strokeWidth={w} fill="none" strokeLinecap="round" />
);

// Padded harness drawn over the Dog (same transform as Dog: dog local units, facing right).
const Harness: React.FC<{ x: number; y: number; s: number; glow?: number }> = ({ x, y, s, glow = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {/* girth strap behind the front legs */}
    <rect x={2} y={-136} width={20} height={76} rx={8} fill={HARN} />
    <path d="M12,-132 L12,-64" stroke={TRIM} strokeWidth={2.4} strokeDasharray="5 4" />
    {/* padded chest piece around the front of the chest */}
    <path d="M36,-134 Q96,-134 100,-100 Q100,-70 66,-64" stroke={HARN} strokeWidth={20} fill="none" strokeLinecap="round" />
    <path d="M36,-134 Q96,-134 100,-100 Q100,-70 66,-64" stroke={TRIM} strokeWidth={2.6} fill="none" strokeLinecap="round" opacity={0.9} />
    {/* back pad */}
    <rect x={-10} y={-146} width={74} height={20} rx={9} fill={HARN} stroke={TRIM} strokeWidth={2.4} />
    {/* handle */}
    <path d="M8,-146 Q28,-172 48,-146" stroke={HARN} strokeWidth={7} fill="none" strokeLinecap="round" />
    {/* buckle */}
    <rect x={4} y={-96} width={16} height={12} rx={2} fill="#3a3d40" />
    {/* back D-ring */}
    <circle cx={54} cy={-150} r={5.5} fill="none" stroke="#2a2d30" strokeWidth={3} />
    {glow > 0 && <path d="M36,-134 Q96,-134 100,-100 Q100,-70 66,-64" stroke="#ffffff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={glow * 0.5} />}
  </g>
);

const Squirrel: React.FC<{ x: number; y: number; s?: number; t: number; flip?: boolean }> = ({ x, y, s = 1, t, flip }) => (
  <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
    <path d={`M-20,-20 Q-70,-40 -60,-90 Q-50,-120 -24,-${100 + Math.sin(t * 10) * 6}`} stroke="#8a5a36" strokeWidth={26} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={-22} rx={28} ry={18} fill="#9a6640" />
    <circle cx={26} cy={-36} r={13} fill="#9a6640" />
    <circle cx={31} cy={-40} r={2.6} fill="#111" />
    <path d="M22,-48 l4,-10 l4,10 Z" fill="#7a4e30" />
    <ellipse cx={4} cy={-14} rx={14} ry={6} fill="#d9b48a" />
  </g>
);

// ============ S1 HOOK WIDE: the dog lunges at a squirrel, the collar takes it (0 - 2.4) ============
const S1: React.FC = () => {
  const t = useT();
  const lunge = at(t, [1.0, 1.25, 1.9, 2.4], [0, 1, 1, 0.6], outExpo);
  const hh = handheld(t, 0.45, at(t, [1.15, 1.25, 1.6], [0, 0.7, 0]));
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.04, 1.1, t / 2.4), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.3;
  const p: HikerProps = { x: 280 + Math.min(t, 1.1) * 50, y: g + 20, scale: 2.3, phase: ph, walk: mix(0.6, 0, lunge), lean: mix(0.06, -0.12, lunge), poles: false, handOverride: lunge > 0.2 ? [60, 0] : freeHand(ph, 0.6), breathe: 0 };
  const dx = 650 + Math.min(t, 1.1) * 50 + lunge * 50;
  const dy = g + 26 - lunge * 20;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 200} t={t} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.9} />
        <Subject rimX={5} col="rgba(255,240,220,0.85)">
          <Squirrel x={mix(1250, 1020, at(t, [0.6, 1.0], [0, 1], outExpo))} y={g + 30} s={1.4} t={t} flip />
          <Dog x={dx} y={dy} s={1.25} phase={t * 8} walk={lunge > 0.2 ? 0.3 : 1} look={BRUNO} mood="alert" tailWag={t * 10} headUp={lunge * 0.4} />
          <Person {...p} outfit={ROSIE} expression={lunge > 0.2 ? "tired" : "happy"} />
          <Leash a={handOf(p, 1)} b={dogCollar(dx, dy, 1.25)} sag={mix(40, 0, lunge)} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f3a3a" side="right" />
      </Plane>
      <Particles seed={2261} n={14} col="#ffffff" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="245,236,224" cool="30,45,80" vignette={0.5} />
      <Title text={"Every pull\nhit her dog's\nthroat."} t={t} t0={0} top={110} size={128} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the collar yanks at his neck (2.4 - 4.5) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const jerk = Math.max(0, Math.sin((t - 2.4) * 4.2)) ** 4;
  const hh = handheld(t, 0.4, jerk * 1.1);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.02], outExpo), rot: hh.rot };
  const s = 4.4;
  const x = 190 + jerk * 30;
  const y = 1546;
  const c = dogCollar(x, y, s);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1300} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,240,220,0.85)">
          <Dog x={x} y={y} s={s} phase={0} walk={0} look={BRUNO} mood="sad" headUp={0.3 - jerk * 0.3} />
          <path d={`M${c[0]},${c[1]} L${-200},${c[1] + 260 - jerk * 60}`} stroke={LEASH} strokeWidth={26} strokeLinecap="round" />
          <circle cx={c[0]} cy={c[1]} r={22} fill="none" stroke="#c9ced2" strokeWidth={9} />
          {/* strain marks at the throat */}
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${c[0] + 140 + i * 26},${c[1] - 60 + i * 50} l40,-10`} stroke="#ffffff" strokeWidth={8} strokeLinecap="round" opacity={jerk} />
          ))}
        </Subject>
      </Plane>
      <Particles seed={2262} n={10} col="#ffffff" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="240,236,230" cool="30,45,80" vignette={0.55} />
      <Chip text="Leash on the collar" t={t} t0={2.5} x={60} y={170} icon="none" big />
      <Chip text="The pull hits his throat" t={t} t0={3.3} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the fix: leash clips to the padded harness (4.5 - 6.9) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.4), rot: hh.rot };
  const s = 4.0;
  const x = 304;
  const y = 1476 + 120;
  const [rx, ry] = dogRing(x, y, s);
  const clip = at(t, [5.0, 5.8], [0, 1], outExpo);
  const hx = mix(-60, rx, clip);
  const hy = mix(500, ry - 30, clip);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="c" treeY={1300} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,214,150,0.9)">
          <Dog x={x} y={y} s={s} phase={0} walk={0} look={BRUNO} mood="happy" tailWag={t * 8} />
          <Harness x={x} y={y} s={s} />
          {/* leash from the top left to the snap hook */}
          <path d={`M-200,${hy - 400} Q${hx - 200},${hy - 120} ${hx - 20},${hy - 40}`} stroke={LEASH} strokeWidth={24} fill="none" strokeLinecap="round" />
          <g transform={`translate(${hx},${hy}) rotate(-30)`}>
            <rect x={-12} y={-50} width={24} height={70} rx={10} fill="#c9ced2" />
            <path d="M0,20 Q-26,40 0,56 Q22,40 10,24" stroke="#c9ced2" strokeWidth={10} fill="none" />
          </g>
          {/* her hand guiding the hook */}
          <g opacity={at(t, [4.55, 4.75, 6.2, 6.6], [0, 1, 1, 0])}>
            <ellipse cx={hx - 70} cy={hy - 60} rx={80} ry={58} fill={ROSIE.skin} />
            <path d={`M${hx - 110},${hy - 90} L-300,${hy - 500}`} stroke={ROSIE.jacket} strokeWidth={140} strokeLinecap="round" />
          </g>
        </Subject>
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 200} strength={0.28} col="255,214,150" />
      <Particles seed={2263} n={12} col="#fff3d6" fall={5} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={600} warm="255,214,170" vignette={0.5} />
      <Chip text="The fix" t={t} t0={4.6} x={60} y={170} icon="none" big />
      <Chip text="Leash on a padded harness" t={t} t0={5.6} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: another squirrel, the pull spreads across the chest (6.9 - 9.15) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const lunge = at(t, [7.3, 7.55, 8.4, 9.0], [0, 1, 1, 0.5], outExpo);
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.25), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 300, y: g + 20, scale: 2.4, walk: 0, lean: mix(0.04, -0.06, lunge), poles: false, handOverride: [56, 6], breathe: Math.sin(t * 2) * 1.5 };
  const ds = 1.35;
  const dx = 640 + lunge * 40;
  const dy = g + 26;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="d" treeY={g - 200} t={t} />
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.26} col="255,214,150" />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.9} />
        <Subject rimX={5} col="rgba(255,214,150,0.9)">
          <Squirrel x={1040} y={g + 30} s={1.4} t={t} flip />
          <Dog x={dx} y={dy} s={ds} phase={0} walk={0} look={BRUNO} mood="alert" tailWag={t * 10} headUp={lunge * 0.3} />
          <Harness x={dx} y={dy} s={ds} glow={lunge} />
          <Person {...p} outfit={ROSIE} expression="happy" />
          <Leash a={handOf(p, 1)} b={dogRing(dx, dy, ds)} sag={mix(30, 0, lunge)} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f3a3a" side="right" />
      </Plane>
      <Particles seed={2264} n={14} col="#ffe7b8" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,214,170" vignette={0.5} />
      <Chip text="He lunges again" t={t} t0={7.0} x={60} y={170} icon="none" big />
      <Chip text="Spread across the chest" t={t} t0={7.8} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: her hand on the handle helps him over a log (9.15 - 11.33) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.2), rot: hh.rot };
  const s = 2.8;
  const hop = at(t, [9.4, 10.0, 10.6], [0, 1, 0]);
  const x = mix(220, 520, at(t, [9.3, 10.7], [0, 1]));
  const g = 1560;
  const y = g - hop * 170;
  const hx = x + 28 * s;
  const hy = y - 164 * s;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="e" treeY={g - 260} blur={8} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g - 40} snow={0.9} />
        <Svg>
          {/* fallen log across the trail */}
          <rect x={300} y={g - 130} width={900} height={130} rx={60} fill="#6b4a32" />
          <ellipse cx={330} cy={g - 65} rx={50} ry={64} fill="#a07a56" />
          <ellipse cx={330} cy={g - 65} rx={28} ry={36} fill="none" stroke="#7a5a3e" strokeWidth={6} />
          <path d={`M420,${g - 120} Q800,${g - 140} 1200,${g - 118}`} stroke="#f3f6f8" strokeWidth={22} fill="none" strokeLinecap="round" />
        </Svg>
        <Subject rimX={6} col="rgba(255,214,150,0.9)">
          <Dog x={x} y={y} s={s} phase={t * 6} walk={hop > 0.1 ? 0.2 : 0.8} look={BRUNO} mood="happy" tailWag={t * 10} />
          <Harness x={x} y={y} s={s} />
          {/* her arm from the top left, hand on the handle */}
          <path d={`M${hx - 40},${hy - 40} L-260,${hy - 520}`} stroke={ROSIE.jacket} strokeWidth={130} strokeLinecap="round" />
          <ellipse cx={hx} cy={hy - 10} rx={64} ry={48} fill={ROSIE.skin} />
          <path d={`M${hx - 40},${hy + 14} Q${hx},${hy + 40} ${hx + 44},${hy + 10}`} stroke={ROSIE.skinShade} strokeWidth={16} fill="none" strokeLinecap="round" />
        </Subject>
      </Plane>
      <Particles seed={2265} n={12} col="#ffe7b8" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,214,170" vignette={0.5} />
      <Chip text="A handle" t={t} t0={9.25} x={60} y={170} icon="check" big />
      <Chip text="For logs and steps" t={t} t0={10.0} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/padded-reflective-dog-harness-cut.png"
      cutoutH={700}
      spec="REFLECTIVE · HANDLE · S TO XL"
      name={
        <>
          Padded
          <br />
          Dog Harness
        </>
      }
      nameSize={104}
      price="From $29.99"
      save="Save this for your next dog hike"
    />
  );
};

export const V226: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.48} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.4} to={4.58} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.4} />
    </Scene>
    <Scene from={4.5} to={6.98} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.5} />
    </Scene>
    <Scene from={6.9} to={9.23} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={6.9} />
    </Scene>
    <Scene from={9.15} to={11.4} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.15} />
    </Scene>
    <Scene from={11.32} to={15.8} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.4, 1600],
        [2.4, 4.5, 1600],
        [4.5, 6.9, 1600],
        [6.9, 9.15, 1600],
        [9.15, 11.32, 1600],
      ]}
    />
  </AbsoluteFill>
);
