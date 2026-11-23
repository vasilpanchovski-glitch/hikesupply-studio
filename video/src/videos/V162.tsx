// V162: "Leash, poop bag, phone light. No hands left." Short format (16.8 s, 46 words), cinematic C01 style, evening dog walk.
// Product: LED Beanie — Knit Hat with USB Rechargeable 4-LED Light, Unisex, $22.99 (live Shopify). End card: real studio photo, cut out.
// Claims only from the listing: 4 LEDs in the front cuff, USB rechargeable. No brightness or battery numbers.
// Head-gear overlay and the close-up face are built like V136; dog and leash like V159.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { Dog, dogCollar } from "../dog";
import { FrostTrail, WinterBackdrop } from "../winter";
import vo from "../vo/v162.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#0e1729", mid: "#1f3352", low: "#3a5272", sun: [840, 360], sunR: 26, sunCol: "#eef2ff", glow: "#7f95b8" };
const LEASH = "#C2662E";
const HAT = "#1c1d20";
const HAT2 = "#2c2e33";
const LED = "#fff6d8";

const LUIS: Outfit = {
  ...GUIDE,
  skin: "#B98262",
  skinShade: "#9A6648",
  hair: "#231812",
  ponytail: null,
  beard: "#231812",
  cap: "none",
  capShade: "none",
  jacket: "#4E6B3A",
  jacketShade: "#3c532c",
  pants: "#2f343b",
  pantsShade: "#23272c",
  boot: "#4a3a2c",
  sole: "#1d1916",
  glove: "#2a2a2a",
};

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

const Dark: React.FC = () => <AbsoluteFill style={{ background: "rgba(6,12,30,0.4)" }} />;

// A soft cone of light from (x,y) to a pool on the ground around (gx,gy).
const Beam: React.FC<{ x: number; y: number; gx: number; gy: number; w: number; k?: number; uid: string }> = ({ x, y, gx, gy, w, k = 1, uid }) =>
  k <= 0 ? null : (
    <g opacity={k}>
      <defs>
        <linearGradient id={`bm${uid}`} x1={x} y1={y} x2={gx} y2={gy} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff4cf" stopOpacity={0.55} />
          <stop offset="1" stopColor="#fff4cf" stopOpacity={0.12} />
        </linearGradient>
        <filter id={`bf${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={18} />
        </filter>
      </defs>
      <path d={`M${x},${y} L${gx - w},${gy} L${gx + w},${gy} Z`} fill={`url(#bm${uid})`} filter={`url(#bf${uid})`} />
      <ellipse cx={gx} cy={gy} rx={w * 1.1} ry={w * 0.22} fill="#fff1c4" opacity={0.35} filter={`url(#bf${uid})`} />
    </g>
  );

// A raised far arm holding the phone torch (hiker coords). up > 0 lifts the hand higher.
const phoneHand = (p: HikerProps, up = 0): [number, number] => {
  const sh = hikerGeometry(p).sh;
  return [sh[0] + 84, sh[1] + 46 - up];
};
const PhoneArm: React.FC<{ p: HikerProps; up?: number; rot?: number }> = ({ p, up = 0, rot = 0 }) => {
  const sh = hikerGeometry(p).sh;
  const h = phoneHand(p, up);
  const e: [number, number] = [sh[0] + 26, sh[1] + 66 - up * 0.3];
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${sh[0] - 2},${sh[1] + 12} L${e[0]},${e[1]} L${h[0]},${h[1]}`} stroke={LUIS.jacketShade} strokeWidth={21} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx={h[0]} cy={h[1]} r={10} fill={LUIS.glove ?? "#2a2a2a"} />
      <g transform={`translate(${h[0] + 4},${h[1] - 10}) rotate(${rot})`}>
        <rect x={-6} y={-12} width={12} height={22} rx={3} fill="#22262b" />
        <circle cx={0} cy={-7} r={2.4} fill={LED} />
        <circle cx={0} cy={-7} r={8} fill={LED} opacity={0.5} />
      </g>
    </g>
  );
};

// LED beanie on a Person (hiker coords). on 0..1 lights the four LEDs.
const LedBeanie: React.FC<{ p: HikerProps; on: number; t: number }> = ({ p, on, t }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 41} ${hx},${hy - 43} Q${hx + 28},${hy - 41} ${hx + 26},${hy - 7} Z`} fill={HAT} />
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 41} ${hx},${hy - 43} Q${hx - 14},${hy - 30} ${hx - 15},${hy - 5} Z`} fill={HAT2} />
      <rect x={hx - 29} y={hy - 14} width={57} height={12} rx={4} fill={HAT2} />
      <rect x={hx + 13} y={hy - 15} width={14} height={13} rx={3} fill="#d9dde2" />
      {on > 0 && <circle cx={hx + 22} cy={hy - 9} r={10 + Math.sin(t * 9) * 0.6} fill={LED} opacity={0.6 * on} />}
    </g>
  );
};

// Big close-up face (screen coords), three-quarter view to the right, wearing the LED beanie.
const FaceLuis: React.FC<{ cx: number; cy: number; s: number; on: number; eyes?: "tired" | "neutral" | "happy"; t: number }> = ({ cx, cy, s, on, eyes = "neutral", t }) => {
  const o = LUIS;
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      <defs>
        <filter id="flBlur" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation={12} />
        </filter>
      </defs>
      {/* jacket + collar */}
      <path d="M-170,190 Q-120,150 -40,150 L60,150 Q150,150 190,200 L190,280 L-170,280 Z" fill={o.jacket} />
      <path d="M-50,150 L70,150 L60,196 L-40,196 Z" fill={o.jacketShade} />
      <path d="M-36,60 L56,60 L58,150 L-38,150 Z" fill={o.skinShade} />
      {/* face */}
      <ellipse cx={20} cy={4} rx={84} ry={92} fill={o.skin} />
      <ellipse cx={-30} cy={10} rx={16} ry={22} fill={o.skinShade} />
      <path d="M-44,30 Q-30,104 32,100 Q96,96 104,34 Q86,64 44,66 Q6,66 -6,44 Q-20,40 -44,30 Z" fill={o.beard ?? o.hair} opacity={0.92} />
      <ellipse cx={-62} cy={12} rx={20} ry={30} fill={o.skin} />
      <path d="M-66,-6 q-10,18 0,36" stroke={o.skinShade} strokeWidth={5} fill="none" strokeLinecap="round" />
      {[0, 46].map((dx, i) => (
        <g key={i}>
          {eyes === "happy" ? (
            <path d={`M${4 + dx},-10 q7,-8 14,0`} stroke="#2a1f1a" strokeWidth={5} fill="none" strokeLinecap="round" />
          ) : (
            <ellipse cx={11 + dx} cy={-12} rx={6.5} ry={eyes === "tired" ? 4 : 8} fill="#2a1f1a" />
          )}
          <path d={`M${dx},-32 q11,${eyes === "tired" ? 3 : -5} 22,${eyes === "tired" ? 4 : 0}`} stroke={o.hair} strokeWidth={4.5} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <path d="M44,0 q12,18 0,26" stroke={o.skinShade} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={eyes === "happy" ? "M22,50 q14,10 28,0" : "M22,52 q14,2 28,0"} stroke="#5a2e22" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* warm light on the face from the LEDs above */}
      <ellipse cx={30} cy={-10} rx={70} ry={50} fill="#ffe9b0" opacity={0.18 * on} filter="url(#flBlur)" />
      {/* the beanie: knit body, folded cuff, LED module front-right */}
      <path d="M-100,-26 Q-112,-158 12,-160 Q132,-158 120,-30 Z" fill={HAT} />
      <path d="M-100,-26 Q-112,-158 12,-160 Q-40,-126 -46,-28 Z" fill={HAT2} />
      {[-40, -10, 20, 50].map((x) => (
        <path key={x} d={`M${x},-130 Q${x - 4},-100 ${x},-64`} stroke="#2a2c31" strokeWidth={4} fill="none" opacity={0.8} />
      ))}
      <rect x={-110} y={-66} width={240} height={48} rx={18} fill={HAT2} />
      {[-90, -66, -42, -18, 6, 30].map((x) => (
        <path key={x} d={`M${x},-62 v40`} stroke={HAT} strokeWidth={5} opacity={0.7} />
      ))}
      <g transform="translate(84,-42)">
        <rect x={-34} y={-24} width={68} height={48} rx={12} fill="#d9dde2" stroke="#9aa1a8" strokeWidth={3} />
        <circle cx={0} cy={0} r={7} fill="#2a2c30" />
        {[[-18, -12], [18, -12], [-18, 12], [18, 12]].map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 7} y={y - 5} width={14} height={10} rx={2} fill={on > 0.3 ? LED : "#8a9096"} />
          </g>
        ))}
        {on > 0 && <circle cx={0} cy={0} r={70 + Math.sin(t * 8) * 3} fill={LED} opacity={0.55 * on} filter="url(#flBlur)" />}
      </g>
      {/* beam forward from the cuff */}
      {on > 0 && <path d="M110,-50 L520,-260 L560,240 Z" fill="#fff4cf" opacity={0.16 * on} filter="url(#flBlur)" />}
    </g>
  );
};

// Close-up of two gloved hands, leash with a bag roll in one, phone torch in the other (screen coords).
const Hands: React.FC<{ t: number; fumble: number }> = ({ t, fumble }) => {
  const wob = Math.sin(t * 7) * 10 * fumble;
  return (
    <g>
      {/* left arm: leash hand */}
      <path d="M-120,1500 Q120,1300 300,1120" stroke={LUIS.jacket} strokeWidth={170} strokeLinecap="round" fill="none" />
      <path d="M-120,1500 Q120,1300 300,1120" stroke={LUIS.jacketShade} strokeWidth={170} strokeLinecap="round" fill="none" opacity={0.35} strokeDasharray="10 900" />
      <ellipse cx={330} cy={1080} rx={86} ry={74} fill={LUIS.glove ?? "#2a2a2a"} />
      <path d="M330,1080 Q300,1400 420,1900" stroke={LEASH} strokeWidth={22} fill="none" strokeLinecap="round" />
      <rect x={292} y={1040} width={76} height={34} rx={10} fill={LEASH} />
      {/* poop bag roll clipped to the leash */}
      <g transform={`translate(${352 + wob},1250) rotate(${wob})`}>
        <rect x={-36} y={0} width={72} height={110} rx={30} fill="#3f8f5a" />
        <path d="M-36,40 h72 M-36,70 h72" stroke="#2f6b43" strokeWidth={6} />
        <path d="M0,0 v-30" stroke="#888" strokeWidth={6} />
      </g>
      {/* right arm: phone hand */}
      <path d="M1220,1560 Q920,1300 760,1050" stroke={LUIS.jacket} strokeWidth={170} strokeLinecap="round" fill="none" />
      <ellipse cx={730} cy={1010} rx={86} ry={74} fill={LUIS.glove ?? "#2a2a2a"} />
      <g transform={`translate(${730 + wob * 0.6},${930}) rotate(${-14 + wob * 0.4})`}>
        <rect x={-62} y={-120} width={124} height={220} rx={22} fill="#22262b" />
        <rect x={-52} y={-110} width={104} height={200} rx={16} fill="#30363d" />
        <circle cx={-28} cy={-86} r={14} fill={LED} />
        <circle cx={-28} cy={-86} r={50} fill={LED} opacity={0.4} />
      </g>
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Luis and the dog on a dark path, phone torch in one hand (0 - 2.7) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.04, 1.1, t / 2.7), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.2;
  const p: HikerProps = { x: 330 + t * 34, y: g + 20, scale: 2.3, phase: ph, walk: 0.5, lean: 0.06, poles: false, handOverride: [40, 22], breathe: Math.sin(t * 2.2) * 1.5 };
  const dx = 680 + t * 40;
  const ph0 = toScreen(p, phoneHand(p));
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="a" treeY={g - 220} t={t} snow={0.5} />
      <Dark />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.6} />
        <Svg>
          <Beam x={ph0[0]} y={ph0[1]} gx={ph0[0] + 380} gy={g + 60} w={150} uid="a" />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,190,0.7)">
          <Person {...p} outfit={LUIS} expression="neutral" noPack />
          <Dog x={dx} y={g + 26} s={1.2} phase={t * 5} walk={0.8} mood="happy" tailWag={t * 12} />
          <Leash a={handOf(p, 1)} b={dogCollar(dx, g + 26, 1.2)} />
          <PhoneArm p={p} rot={70} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0f1a22" side="right" />
      </Plane>
      <Particles seed={1621} n={14} col="#dfe8ff" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={840} sunY={360} warm="255,220,170" cool="20,30,70" vignette={0.6} />
      <Title text={"Leash, poop bag,\nphone light.\nNo hands left."} t={t} t0={0} top={110} size={112} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: both hands full, leash and bags in one, phone in the other (2.7 - 5.14) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.02], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="b" treeY={1250} blur={12} t={t} snow={0.5} />
      <Dark />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,190,0.6)">
          <Svg>
            <Hands t={t} fumble={0.4} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1622} n={10} col="#dfe8ff" fall={5} bokeh />
      <Grade sunX={600} sunY={800} warm="255,220,170" cool="20,30,70" vignette={0.6} />
      <Chip text="Leash in one hand" t={t} t0={2.3 + 0.3} x={60} y={170} icon="none" big />
      <Chip text="Phone light in the other" t={t} t0={3.4} x={60} y={300} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: the dog stops, Luis needs a third hand, the torch swings away (5.14 - 6.84) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.7), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 460, y: g + 30, scale: 2.4, walk: 0, lean: 0.18, poles: false, handOverride: [10, 60], breathe: 0 };
  const ph0 = toScreen(p, phoneHand(p, 60));
  const swing = Math.sin(t * 5) * 140;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="c" treeY={g - 220} t={t} snow={0.5} blur={2} />
      <Dark />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.6} />
        <Svg>
          <Beam x={ph0[0]} y={ph0[1]} gx={ph0[0] + 200 + swing} gy={g - 700} w={120} k={0.8} uid="c" />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,190,0.7)">
          <Person {...p} outfit={LUIS} expression="tired" noPack />
          <Dog x={800} y={g + 30} s={1.3} phase={0} walk={0} mood="alert" tailWag={t * 6} />
          <Leash a={handOf(p, 1)} b={dogCollar(800, g + 30, 1.3)} sag={20} />
          <PhoneArm p={p} up={60} rot={swing * 0.1} />
        </Subject>
      </Plane>
      <Particles seed={1623} n={12} col="#dfe8ff" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={840} sunY={360} warm="255,220,170" cool="20,30,70" vignette={0.62} />
      <Chip text="Needs a third hand" t={t} t0={5.5} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the fix, the beanie's LEDs switch on (6.84 - 9.5) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.66), rot: hh.rot };
  const on = at(t, [7.45, 7.8], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="d" treeY={1250} blur={12} t={t} snow={0.5} />
      <Dark />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,236,190,0.7)">
          <Svg>
            <FaceLuis cx={470} cy={1030} s={3.2} on={on} eyes={on > 0.5 ? "happy" : "neutral"} t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1624} n={12} col="#fff3d6" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={700} warm="255,226,180" cool="20,30,70" vignette={0.55} />
      <Chip text="The fix" t={t} t0={7.0} x={60} y={170} icon="none" big />
      <Chip text="Wear the light" t={t} t0={7.6} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: hands free, the path lit from his hat, the dog trots ahead (9.5 - 12.84) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 20, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.34), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.2;
  const p: HikerProps = { x: 300 + lt * 60, y: g + 20, scale: 2.3, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  const dx = 720 + lt * 60;
  const head = toScreen(p, hikerGeometry(p).head);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="e" treeY={g - 220} t={t} snow={0.5} />
      <Dark />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.6} />
        <Svg>
          <Beam x={head[0] + 50} y={head[1] - 20} gx={head[0] + 520} gy={g + 70} w={210} uid="e" />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,190,0.8)">
          <Person {...p} outfit={LUIS} expression="happy" noPack />
          <LedBeanie p={p} on={1} t={t} />
          <Dog x={dx} y={g + 26} s={1.2} phase={t * 5} walk={0.8} mood="happy" tailWag={t * 12} />
          <Leash a={handOf(p, 1)} b={dogCollar(dx, g + 26, 1.2)} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0f1a22" side="left" />
      </Plane>
      <Particles seed={1625} n={16} col="#fff3d6" fall={5} bokeh />
      <LowScrim />
      <Grade sunX={840} sunY={360} warm="255,226,180" cool="20,30,70" vignette={0.55} />
      <Chip text="4 LEDs in the cuff" t={t} t0={9.7} x={60} y={200} icon="check" big />
      <Chip text="Charges by USB" t={t} t0={11.2} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/led-beanie-rechargeable-headlamp-hat-cut.png"
      cutoutH={760}
      spec="4 LEDS · USB RECHARGEABLE · UNISEX"
      name={
        <>
          LED Beanie
        </>
      }
      nameSize={112}
      price="$22.99"
      save="Save this for your next dark walk"
    />
  );
};

export const V162: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.78} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.7} to={5.22} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.7} />
    </Scene>
    <Scene from={5.14} to={6.92} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.14} />
    </Scene>
    <Scene from={6.84} to={9.58} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={6.84} />
    </Scene>
    <Scene from={9.5} to={12.92} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.5} />
    </Scene>
    <Scene from={12.84} to={16.8} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.7, 1600],
        [2.7, 5.14, 1600],
        [5.14, 6.84, 1600],
        [6.84, 9.5, 1600],
        [9.5, 12.84, 1600],
      ]}
    />
  </AbsoluteFill>
);
