// V190: "Ice balls between his paws." Short format (16.5 s, 41 words), cinematic C01 style, winter woods with a dog.
// Product: Hiking With Your Dog — Trail Guide & Checklists (Printable), $5.99 (live Shopify, 20 pages).
// Advice (simple, safe): on snowy hikes check your dog's paws often and clear packed ice from between the pads;
// wipe road salt off the paws after. No numbers, no medical claims. End card = real Shopify cover (boxed photo card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { Dog, dogCollar, DogLook } from "../dog";
import { WINTER, WGOLD, WinterBackdrop, FrostTrail } from "../winter";
import vo from "../vo/v190.json";

const words = vo.words as unknown as Word[];

const LEASH = "#C8463A";
const MAX: DogLook = { coat: "#D9A86A", shade: "#B9874C", belly: "#F1D7AE", ear: "#9E6A35", collar: "#C8463A", nose: "#2a1d14" };

const TOM: Outfit = {
  ...JAKE,
  skin: "#D9A47E",
  skinShade: "#B98662",
  hair: "#3b2a1e",
  beard: "#3b2a1e",
  cap: "#2F5D6E",
  capShade: "#234755",
  jacket: "#3E6B48",
  jacketShade: "#2f5236",
  pants: "#3a3f46",
  pantsShade: "#2b2f35",
  glove: "#4a4f57",
};

const toScreen = (p: HikerProps, q: readonly number[]): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};
const handOf = (p: HikerProps) => toScreen(p, hikerGeometry(p).arms[1].hand);

const Leash: React.FC<{ a: [number, number]; b: [number, number]; w?: number; sag?: number }> = ({ a, b, w = 6, sag = 60 }) => (
  <path d={`M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${Math.max(a[1], b[1]) + sag} ${b[0]},${b[1]}`} stroke={LEASH} strokeWidth={w} fill="none" strokeLinecap="round" />
);

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Ice balls packed between the pads, in paw-local units (paw centred at 0,0).
const ICE: [number, number, number][] = [
  [-100, -128, 26], [0, -168, 26], [100, -128, 26], [-150, -6, 22], [-92, -46, 26],
  [0, -80, 28], [92, -46, 26], [150, -6, 22], [-46, -112, 18], [46, -112, 18],
];

// Big paw close-up, pads facing the camera (dog's foot lifted). Screen position cx,cy, scale s.
// clear 0..1 removes the ice balls one after another; salt 0..1 = white salt grains in the fur.
const PawClose: React.FC<{ cx: number; cy: number; s: number; clear?: number; salt?: number; t: number }> = ({ cx, cy, s, clear = 0, salt = 0, t }) => {
  const L = MAX;
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      {/* leg and furry foot */}
      <path d="M-110,40 L-120,640 L120,640 L110,40 Z" fill={L.coat} />
      <path d="M-60,140 Q-70,380 -50,620" stroke={L.shade} strokeWidth={12} fill="none" opacity={0.7} />
      <ellipse cx={0} cy={10} rx={180} ry={160} fill={L.coat} />
      {[[-140, -80], [-55, -160], [55, -160], [140, -80]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={78} fill={L.coat} />
      ))}
      {Array.from({ length: 14 }, (_, i) => {
        const a = Math.PI * (0.05 + (i / 13) * 0.9);
        return <path key={i} d={`M${Math.cos(a) * 165},${Math.sin(a) * 140 + 20} l${Math.cos(a) * 18},${Math.sin(a) * 18}`} stroke={L.shade} strokeWidth={8} strokeLinecap="round" opacity={0.7} />;
      })}
      {/* metacarpal pad */}
      <path d="M-100,50 Q-115,-15 -50,-28 Q0,-12 50,-28 Q115,-15 100,50 Q90,135 0,145 Q-90,135 -100,50 Z" fill="#3a2a28" />
      <path d="M-70,36 Q-50,0 0,4" stroke="#6b5550" strokeWidth={10} fill="none" strokeLinecap="round" />
      {/* toe pads */}
      {[[-140, -80, -0.5], [-55, -160, -0.15], [55, -160, 0.15], [140, -80, 0.5]].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x},${y}) rotate(${r * 57})`}>
          <ellipse cx={0} cy={0} rx={44} ry={54} fill="#3a2a28" />
          <ellipse cx={-10} cy={-16} rx={14} ry={18} fill="#6b5550" />
        </g>
      ))}
      {/* packed ice balls */}
      {ICE.map(([x, y, r], i) => {
        const gone = at(clear, [i / ICE.length, (i + 0.8) / ICE.length], [0, 1]);
        if (gone >= 1) return null;
        const sh = 1 + 0.03 * Math.sin(t * 3 + i);
        return (
          <g key={i} opacity={1 - gone} transform={`translate(${x + gone * 160},${y - gone * 120}) scale(${sh * (1 - gone * 0.4)})`}>
            <circle cx={0} cy={0} r={r} fill="#dbe9f1" />
            <circle cx={-r * 0.3} cy={-r * 0.3} r={r * 0.45} fill="#ffffff" />
            <circle cx={r * 0.35} cy={r * 0.25} r={r * 0.3} fill="#b5ccd9" />
          </g>
        );
      })}
      {/* road salt grains */}
      {salt > 0 &&
        Array.from({ length: 26 }, (_, i) => {
          const x = -170 + ((i * 71) % 340);
          const y = -160 + ((i * 113) % 300);
          return <rect key={i} x={x} y={y} width={12} height={12} rx={2} transform={`rotate(${i * 37} ${x} ${y})`} fill="#f4f6f8" opacity={salt} />;
        })}
    </g>
  );
};

// Gloved hand (index finger and thumb pinching), pointing left. Screen units.
const Glove: React.FC<{ x: number; y: number; s?: number; col?: string }> = ({ x, y, s = 1, col = TOM.glove as string }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={40} y={-60} width={320} height={130} rx={60} fill={TOM.jacket} />
    <rect x={20} y={-70} width={60} height={150} rx={24} fill={TOM.jacketShade} />
    <path d="M30,-60 Q-60,-70 -120,-40 Q-150,-20 -120,0 Q-60,10 -10,-5 Q-60,30 -80,60 Q-90,90 -55,90 Q0,80 40,50 Z" fill={col} />
    <path d="M-110,-30 Q-60,-36 -10,-24" stroke="#3a3e45" strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

// Towel wiping over the paw. k 0..1 = sweep position.
const Towel: React.FC<{ x: number; y: number; k: number }> = ({ x, y, k }) => (
  <g transform={`translate(${x + Math.sin(k * Math.PI * 4) * 120},${y}) rotate(${-8 + Math.sin(k * 9) * 6})`}>
    <path d="M-180,-110 Q-60,-150 160,-120 Q210,0 170,120 Q-40,150 -190,110 Q-220,0 -180,-110 Z" fill="#e4cfa6" />
    {[-120, -60, 0, 60, 120].map((xx) => (
      <line key={xx} x1={xx} y1={-120} x2={xx + 10} y2={120} stroke="#cdb488" strokeWidth={8} />
    ))}
  </g>
);

// Salt grains on a cleared winter road edge (screen units).
const SaltRoad: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={-400} y={y} width={1900} height={500} fill="#5d6268" />
    <rect x={-400} y={y} width={1900} height={16} fill="#e9eef1" />
    {Array.from({ length: 70 }, (_, i) => (
      <rect key={i} x={-200 + ((i * 97) % 1500)} y={y + 30 + ((i * 53) % 400)} width={10} height={10} rx={2} fill="#eef2f5" opacity={0.75} />
    ))}
  </g>
);

// ============ S1 HOOK MEDIUM: Tom and Max in the snowy woods, Max starts to limp (0 - 2.15) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.04, 1.1, t / 2.15), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.0;
  const slow = at(t, [0.9, 1.8], [1, 0.3]);
  const p: HikerProps = { x: 300 + t * 30 * slow, y: g + 20, scale: 2.3, phase: ph, walk: 0.55 * slow, lean: 0.06, poles: false, handOverride: [40, 22] };
  const dx = 660 + t * 34 * slow;
  // limp: front foot held up, body dips
  const limp = at(t, [1.0, 1.4], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 220} t={t} snow={0.8} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,248,232,0.85)">
          <Person {...p} outfit={TOM} expression={t > 1.3 ? "tired" : "neutral"} noPack />
          <g transform={`translate(0,${limp * Math.abs(Math.sin(t * 6)) * 8})`}>
            <Dog x={dx} y={g + 26} s={1.25} look={MAX} phase={t * 5} walk={0.8 * slow} mood={t > 1.2 ? "sad" : "happy"} tailWag={t * 10 * slow} />
          </g>
          <Leash a={handOf(p)} b={dogCollar(dx, g + 26, 1.25)} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} col="255,248,232" />
      <Particles seed={1901} n={18} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="252,240,220" cool="30,45,80" />
      <Title text={"Ice balls\nbetween\nhis paws."} t={t} t0={0} top={110} size={140} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the lifted paw, hard ice packed between the pads (2.15 - 5.56) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 3.4], [1.0, 1.1]), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1200} blur={14} t={t} snow={0.8} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={1380} width={1500} height={700} fill="#eef2f4" />
        </Svg>
        <Subject rimX={6} col="rgba(255,248,232,0.85)">
          <Svg>
            <PawClose cx={540} cy={860} s={1.7} t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1902} n={14} col="#ffffff" fall={12} />
      <Grade sunX={800} sunY={560} warm="250,240,225" cool="30,45,90" vignette={0.55} />
      <Chip text="Ice packed between pads" t={t} t0={3.4} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Tom's glove picks the ice out, ball by ball (5.56 - 10.32) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 6, y: hh.y, zoom: at(lt, [0, 1.0], [1.12, 1.04], outExpo), rot: hh.rot };
  const clear = at(t, [7.3, 9.7], [0, 1], (x) => x);
  const i = Math.min(ICE.length - 1, Math.floor(clear * ICE.length));
  const target = ICE[i];
  const gx = 540 + target[0] * 1.7 + 60 + Math.sin(t * 9) * 8;
  const gy = 860 + target[1] * 1.7 + 20;
  const inK = at(lt, [1.2, 1.7], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="c" treeY={1200} blur={14} t={t} snow={0.8} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={1380} width={1500} height={700} fill="#f1ece4" />
        </Svg>
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Svg>
            <PawClose cx={540} cy={860} s={1.7} clear={clear} t={t} />
            <Glove x={mix(1300, gx, inK)} y={mix(1200, gy, inK)} s={0.85} />
          </Svg>
        </Subject>
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.35} col="255,236,200" />
      <Particles seed={1903} n={14} col="#fff3d6" fall={6} />
      <Grade sunX={760} sunY={560} warm="255,226,180" vignette={0.5} />
      <Chip text="The rule" t={t} t0={5.7} x={60} y={170} icon="none" big />
      <Chip text="Check paws often" t={t} t0={6.9} x={60} y={300} icon="check" big />
      <Chip text="Clear the ice" t={t} t0={9.2} x={60} y={430} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: back at the salted road, towel over the paws, Max happy again (10.32 - 12.1) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.1, 1.04, lt / 1.8), rot: hh.rot };
  const salt = at(t, [10.6, 11.6], [1, 0]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="d" treeY={1150} blur={10} t={t} snow={0.8} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <SaltRoad y={1380} />
        </Svg>
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Svg>
            <PawClose cx={540} cy={860} s={1.5} clear={1} salt={salt} t={t} />
            <Towel x={560} y={860} k={at(t, [10.5, 11.9], [0, 1])} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1904} n={12} col="#fff3d6" fall={6} />
      <Grade sunX={760} sunY={560} warm="255,226,180" vignette={0.5} />
      <Chip text="Wipe off road salt" t={t} t0={10.45} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-with-your-dog-trail-guide.jpg"
      spec="20 PAGES · PRINTABLE GUIDE & CHECKLISTS"
      name={
        <>
          Hiking With
          <br />
          Your Dog
        </>
      }
      nameSize={96}
      price="$5.99"
      save="Save this for winter dog walks"
    />
  );
};

export const V190: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.23} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.15} to={5.64} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.15} />
    </Scene>
    <Scene from={5.56} to={10.4} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.56} />
    </Scene>
    <Scene from={10.32} to={12.2} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={10.32} />
    </Scene>
    <Scene from={12.1} to={16.5} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.15, 1600],
        [2.15, 5.56, 1600],
        [5.56, 10.32, 1600],
        [10.32, 12.1, 1600],
      ]}
    />
  </AbsoluteFill>
);
