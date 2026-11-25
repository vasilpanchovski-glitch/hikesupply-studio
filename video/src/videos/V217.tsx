// V217: "Black dog. Dark park. Gone." Short format (16.0 s, 41 words), cinematic C01 style, winter dusk walk with a black lab.
// Product: LED Dog Collar — USB Rechargeable Light-Up Collar with 3 Light Modes, XS to XXL, $17.99 (live Shopify, orange shown).
// Advice (plain, safe): on dark winter walks put a light on the dog, not only on yourself, and charge it before you go.
// No brightness or battery numbers. Dog and leash like V162; end card = real Shopify cover, cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { Dog, DogLook } from "../dog";
import { FrostTrail, WinterBackdrop } from "../winter";
import vo from "../vo/v217.json";

const words = vo.words as unknown as Word[];

const DUSK: Sky = { top: "#121c33", mid: "#2b3f62", low: "#5a6f8e", sun: [820, 420], sunR: 22, sunCol: "#e8eeff", glow: "#7f95b8" };
const LEASH = "#3a6f9a";
const GLOW = "#ffb25e";
const BAND = "#E8742A";

const LAB: DogLook = { coat: "#1f1f23", shade: "#141417", belly: "#2c2c31", ear: "#16161a", collar: BAND, nose: "#0a0a0a" };

const NINA: Outfit = {
  ...GUIDE,
  skin: "#E9B995",
  skinShade: "#C99674",
  hair: "#3b2416",
  ponytail: "#3b2416",
  beard: null,
  cap: "none",
  capShade: "none",
  jacket: "#8E3B46",
  jacketShade: "#6f2c36",
  pants: "#2f343b",
  pantsShade: "#23272c",
  boot: "#4a3a2c",
  sole: "#1d1916",
  glove: "#2a2a2a",
};
const HAT = "#d9d4c8";
const HAT2 = "#b9b3a6";

const toScreen = (p: HikerProps, q: readonly number[]): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};
const handOf = (p: HikerProps, i: number) => toScreen(p, hikerGeometry(p).arms[i].hand);

const Leash: React.FC<{ a: [number, number]; b: [number, number]; w?: number; sag?: number }> = ({ a, b, w = 6, sag = 60 }) => (
  <path d={`M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${Math.max(a[1], b[1]) + sag} ${b[0]},${b[1]}`} stroke={LEASH} strokeWidth={w} fill="none" strokeLinecap="round" />
);

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);
const Dark: React.FC<{ k?: number }> = ({ k = 0.4 }) => <AbsoluteFill style={{ background: `rgba(6,12,30,${k})` }} />;

// Knit beanie on a Person (hiker coords).
const Beanie: React.FC<{ p: HikerProps }> = ({ p }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 41} ${hx},${hy - 43} Q${hx + 28},${hy - 41} ${hx + 26},${hy - 7} Z`} fill={HAT} />
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 41} ${hx},${hy - 43} Q${hx - 14},${hy - 30} ${hx - 15},${hy - 5} Z`} fill={HAT2} />
      <rect x={hx - 29} y={hy - 14} width={57} height={12} rx={4} fill={HAT2} />
      <circle cx={hx - 2} cy={hy - 46} r={9} fill={HAT} />
    </g>
  );
};

// The lit collar drawn over the Dog's own collar (same local coords as dog.tsx). on 0..1.
const CollarGlow: React.FC<{ x: number; y: number; s: number; phase?: number; walk?: number; on: number; t: number }> = ({ x, y, s, phase = 0, walk = 0, on, t }) => {
  if (on <= 0) return null;
  const bob = Math.abs(Math.sin(phase)) * 4 * walk;
  const pulse = 0.85 + 0.15 * Math.sin(t * 7);
  return (
    <g transform={`translate(${x},${y - bob}) scale(${s})`} opacity={on}>
      <defs>
        <filter id={`cg${Math.round(x)}`} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation={10} />
        </filter>
      </defs>
      <ellipse cx={84} cy={-124} rx={70 * pulse} ry={52 * pulse} fill={GLOW} opacity={0.45} filter={`url(#cg${Math.round(x)})`} />
      <path d="M68,-121 Q84,-129 100,-126" stroke={BAND} strokeWidth={14} strokeLinecap="round" fill="none" />
      <path d="M70,-122 Q84,-128 98,-126" stroke="#fff1d6" strokeWidth={4} strokeLinecap="round" fill="none" />
    </g>
  );
};

// Big close-up face (screen coords), three-quarter view to the right, knit beanie, ponytail. look: 0 worried, 1 relieved.
const FaceNina: React.FC<{ cx: number; cy: number; s: number; look: number; t: number }> = ({ cx, cy, s, look }) => {
  const o = NINA;
  const happy = look > 0.5;
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      <path d="M-80,-40 Q-170,0 -150,120 Q-120,60 -70,10 Z" fill={o.hair} />
      <path d="M-170,190 Q-120,150 -40,150 L60,150 Q150,150 190,200 L190,280 L-170,280 Z" fill={o.jacket} />
      <path d="M-50,150 L70,150 L60,196 L-40,196 Z" fill={o.jacketShade} />
      <path d="M-36,60 L56,60 L58,150 L-38,150 Z" fill={o.skinShade} />
      <ellipse cx={20} cy={4} rx={84} ry={92} fill={o.skin} />
      <ellipse cx={-30} cy={10} rx={16} ry={22} fill={o.skinShade} />
      <ellipse cx={-62} cy={12} rx={20} ry={30} fill={o.skin} />
      <path d="M-66,-6 q-10,18 0,36" stroke={o.skinShade} strokeWidth={5} fill="none" strokeLinecap="round" />
      {[0, 46].map((dx, i) => (
        <g key={i}>
          {happy ? (
            <path d={`M${4 + dx},-10 q7,-8 14,0`} stroke="#2a1f1a" strokeWidth={5} fill="none" strokeLinecap="round" />
          ) : (
            <ellipse cx={13 + dx} cy={-12} rx={7} ry={9} fill="#2a1f1a" />
          )}
          <path d={happy ? `M${dx},-32 q11,-5 22,0` : `M${dx + (i ? 0 : 2)},${i ? -30 : -36} q11,${i ? -8 : 4} 22,${i ? 2 : 6}`} stroke={o.hair} strokeWidth={4.5} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <path d="M44,0 q12,18 0,26" stroke={o.skinShade} strokeWidth={4} fill="none" strokeLinecap="round" />
      {happy ? (
        <path d="M22,50 q14,10 28,0" stroke="#5a2e22" strokeWidth={4} fill="none" strokeLinecap="round" />
      ) : (
        <ellipse cx={36} cy={54} rx={9} ry={11} fill="#5a2e22" />
      )}
      <ellipse cx={58} cy={30} rx={22} ry={14} fill="#e2736a" opacity={0.25} />
      {/* knit beanie with a pompom */}
      <path d="M-100,-26 Q-112,-158 12,-160 Q132,-158 120,-30 Z" fill={HAT} />
      <path d="M-100,-26 Q-112,-158 12,-160 Q-40,-126 -46,-28 Z" fill={HAT2} />
      {[-40, -10, 20, 50].map((x) => (
        <path key={x} d={`M${x},-130 Q${x - 4},-100 ${x},-64`} stroke={HAT2} strokeWidth={4} fill="none" opacity={0.8} />
      ))}
      <rect x={-110} y={-66} width={240} height={48} rx={18} fill={HAT2} />
      {[-90, -66, -42, -18, 6, 30, 54, 78, 102].map((x) => (
        <path key={x} d={`M${x},-62 v40`} stroke={HAT} strokeWidth={5} opacity={0.7} />
      ))}
      <circle cx={8} cy={-172} r={34} fill={HAT} />
    </g>
  );
};

// ============ S1 HOOK WIDE: the black lab runs ahead into the dusk and disappears (0 - 2.5) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.04, 1.1, t / 2.5), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.2;
  const p: HikerProps = { x: 300 + t * 30, y: g + 20, scale: 2.2, phase: ph, walk: 0.5, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: Math.sin(t * 2.2) * 1.5 };
  const dx = 640 + t * 210;
  const fade = at(t, [1.1, 2.2], [1, 0.05]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSK} uid="a" treeY={g - 220} t={t} snow={0.5} />
      <Dark k={0.35} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.6} />
        <Subject rimX={5} col="rgba(200,215,255,0.55)">
          <Person {...p} outfit={NINA} expression="neutral" noPack />
          <Beanie p={p} />
          <g opacity={fade}>
            <Dog x={dx} y={g + 22} s={1.15} phase={t * 9} walk={1} look={LAB} mood="happy" tailWag={t * 14} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0b131c" side="right" />
      </Plane>
      <Particles seed={2171} n={14} col="#dfe8ff" fall={8} bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={420} warm="230,215,200" cool="20,30,70" vignette={0.6} />
      <Title text={"Black dog.\nDark park.\nGone."} t={t} t0={0} top={110} size={128} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: Nina stops, the path ahead is dark, no dog to see (2.5 - 4.05) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.55), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 380, y: g + 30, scale: 2.4, walk: 0, lean: -0.04, poles: false, handOverride: [30, 20], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSK} uid="b" treeY={g - 220} t={t} snow={0.5} blur={2} />
      <Dark k={0.45} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.6} />
        <Subject rimX={5} col="rgba(200,215,255,0.55)">
          <Person {...p} outfit={NINA} expression="tired" noPack />
          <Beanie p={p} />
          <Leash a={handOf(p, 1)} b={[handOf(p, 1)[0] + 40, handOf(p, 1)[1] + 160]} sag={10} />
        </Subject>
      </Plane>
      <Particles seed={2172} n={12} col="#dfe8ff" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={420} warm="230,215,200" cool="20,30,70" vignette={0.65} />
      <Chip text="Ten steps ahead" t={t} t0={2.6} x={60} y={170} icon="none" big />
      <Chip text="Gone in the dark" t={t} t0={3.2} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: her worried face, scanning the dark (4.05 - 6.6) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + Math.sin(t * 1.4) * 10, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.02], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSK} uid="c" treeY={1250} blur={12} t={t} snow={0.5} />
      <Dark k={0.4} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(200,215,255,0.6)">
          <Svg>
            <FaceNina cx={470} cy={1030} s={3.1} look={0} t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2173} n={12} col="#dfe8ff" fall={5} bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={420} warm="230,215,200" cool="20,30,70" vignette={0.6} />
      <Chip text="Dark dog" t={t} t0={4.1} x={60} y={170} icon="x" big />
      <Chip text="Dark path" t={t} t0={4.75} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the fix, the collar on the lab's neck lights up (6.6 - 9.4) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.8), rot: hh.rot };
  const on = at(t, [7.9, 8.2], [0, 1], outExpo);
  const s = 3.6;
  const x = 150;
  const y = 1560;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSK} uid="d" treeY={1250} blur={12} t={t} snow={0.5} />
      <Dark k={0.45} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(200,215,255,0.5)">
          <Svg>
            <Dog x={x} y={y} s={s} phase={0} walk={0} look={LAB} mood={on > 0.5 ? "happy" : "alert"} tailWag={t * 8} headUp={0.3} />
            <CollarGlow x={x} y={y} s={s} on={on} t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2174} n={12} col="#ffe2b8" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={600} sunY={900} warm="255,220,170" cool="20,30,70" vignette={0.55} />
      <Chip text="The fix" t={t} t0={6.7} x={60} y={170} icon="none" big />
      <Chip text="A light on your dog" t={t} t0={8.0} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: the lit collar far ahead on the dark path, Nina relaxed (9.4 - 11.7) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.3), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.2;
  const p: HikerProps = { x: 280 + lt * 50, y: g + 20, scale: 2.3, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  const dx = 800 + lt * 50;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSK} uid="e" treeY={g - 220} t={t} snow={0.5} />
      <Dark k={0.5} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.6} />
        <Subject rimX={5} col="rgba(200,215,255,0.55)">
          <Person {...p} outfit={NINA} expression="happy" noPack />
          <Beanie p={p} />
          <Dog x={dx} y={g + 22} s={1.15} phase={t * 5} walk={0.8} look={LAB} mood="happy" tailWag={t * 12} />
          <CollarGlow x={dx} y={g + 22} s={1.15} phase={t * 5} walk={0.8} on={1} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0b131c" side="left" />
      </Plane>
      <Particles seed={2175} n={16} col="#ffe2b8" fall={5} bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={420} warm="255,220,170" cool="20,30,70" vignette={0.55} />
      <Chip text="Not only on you" t={t} t0={9.5} x={60} y={170} icon="check" big />
      <Chip text="Charge it first" t={t} t0={10.6} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/led-dog-collar-rechargeable-cut.png"
      cutoutH={560}
      spec="USB RECHARGEABLE · 3 LIGHT MODES · XS TO XXL"
      name={
        <>
          LED Dog Collar
        </>
      }
      nameSize={104}
      price="$17.99"
      save="Save this for tonight's walk"
    />
  );
};

export const V217: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.58} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.5} to={4.13} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.5} />
    </Scene>
    <Scene from={4.05} to={6.68} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.05} />
    </Scene>
    <Scene from={6.6} to={9.48} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={6.6} />
    </Scene>
    <Scene from={9.4} to={11.78} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.4} />
    </Scene>
    <Scene from={11.7} to={16.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.5, 1600],
        [2.5, 4.05, 1600],
        [4.05, 6.6, 1600],
        [6.6, 9.4, 1600],
        [9.4, 11.7, 1600],
      ]}
    />
  </AbsoluteFill>
);
