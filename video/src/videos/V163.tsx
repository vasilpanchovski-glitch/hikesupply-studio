// V163: "Why is grandpa on the chairlift?" Short format (16.8 s, 44 words), cinematic C01 style, ski day.
// Product: Funny Old Man Ski Mask — Realistic 3D Print Balaclava, Unisex, from $17.99 (live Shopify; Lightweight $17.99, Winter $19.99).
// Advice (plain, no numbers): wind on a lift stings the skin left bare between goggles and collar; a balaclava covers head, face and
// neck in one piece. Hers is the Grumpy Grandpa print (a real face on the store). Goggles always stay down over the eye opening.
// End card: the real Shopify cover (Grumpy Grandpa), cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { WINTER, WinterBackdrop, SNOW, SNOW2 } from "../winter";
import vo from "../vo/v163.json";

const words = vo.words as unknown as Word[];

const CLAIRE: Outfit = {
  ...GUIDE,
  skin: "#F1C6A6",
  skinShade: "#D6A482",
  hair: "#7a4a26",
  ponytail: "#7a4a26",
  beard: null,
  cap: "none",
  capShade: "none",
  jacket: "#2F7F86",
  jacketShade: "#24646a",
  pants: "#2b2f36",
  pantsShade: "#1f2228",
  boot: "#e9e9e9",
  sole: "#2a2a2a",
  glove: "#1f1f22",
};
const HELMET = "#f2f2f0";
const HELMET2 = "#d4d6d8";
const LENS = "#e0873a";
const LENS2 = "#9a4a8a";
const PRINT = "#d79a80"; // the mask's printed skin tone
const PRINT2 = "#b97c64";
const STASH = "#f1efea";
const STASH2 = "#c9c6bf";

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Wind streaks across the frame.
const Wind: React.FC<{ t: number; k?: number; n?: number }> = ({ t, k = 1, n = 14 }) => (
  <g opacity={k}>
    {Array.from({ length: n }, (_, i) => {
      const y = 200 + ((i * 137) % 1500);
      const x = ((t * (900 + (i % 4) * 200) + i * 271) % 1800) - 400;
      return <path key={i} d={`M${1080 - x},${y} q-120,-14 -260,0`} stroke="#ffffff" strokeWidth={4 + (i % 3) * 2} fill="none" strokeLinecap="round" opacity={0.35} />;
    })}
  </g>
);

// Lift line: cable from lower left to upper right, a tower, and the chair hanging at (cx, cy) = seat point.
const Cable: React.FC<{ y0: number; y1: number; tower?: number }> = ({ y0, y1, tower }) => (
  <g>
    <path d={`M-400,${y0} L1480,${y1}`} stroke="#2a2f36" strokeWidth={6} />
    <path d={`M-400,${y0 + 60} L1480,${y1 + 60}`} stroke="#2a2f36" strokeWidth={5} opacity={0.8} />
    {tower !== undefined && (
      <g>
        <rect x={tower - 16} y={y0 + ((y1 - y0) * (tower + 400)) / 1880 - 20} width={32} height={2000} fill="#5d646c" />
        <rect x={tower - 90} y={y0 + ((y1 - y0) * (tower + 400)) / 1880 - 30} width={180} height={22} fill="#4a5058" />
      </g>
    )}
  </g>
);

// Seated rider on a chair. Hip at (hx, hy), scale s, facing right. mask 0..1 = balaclava on.
const Rider: React.FC<{ hx: number; hy: number; s: number; cableY: number; mask: number; t: number; swing?: number }> = ({ hx, hy, s, cableY, mask, t, swing = 0 }) => {
  const p: HikerProps = { x: hx, y: hy + 182 * s, scale: s, walk: 0, lean: -0.08, poles: false, handOverride: [46, 8], breathe: Math.sin(t * 2) * 1.2 };
  const id = `cl${Math.round(hx)}${Math.round(hy)}`;
  return (
    <g transform={`rotate(${swing} ${hx} ${cableY})`}>
      {/* hanger from the cable and the chair frame */}
      <path d={`M${hx - 20 * s},${cableY} L${hx - 20 * s},${hy - 110 * s} Q${hx - 20 * s},${hy - 130 * s} ${hx - 50 * s},${hy - 120 * s} L${hx - 50 * s},${hy + 20 * s}`} stroke="#3a3f46" strokeWidth={8 * s} fill="none" strokeLinejoin="round" />
      <rect x={hx - 62 * s} y={hy - 100 * s} width={18 * s} height={110 * s} rx={4 * s} fill="#4a7ab0" />
      <rect x={hx - 60 * s} y={hy + 8 * s} width={150 * s} height={16 * s} rx={5 * s} fill="#4a7ab0" />
      <defs>
        <clipPath id={id}>
          <rect x={hx - 200 * s} y={hy - 400 * s} width={400 * s} height={400 * s + 6 * s} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <Person {...p} outfit={CLAIRE} expression={mask > 0.5 ? "happy" : "tired"} noPack />
      </g>
      <HeadKit p={p} mask={mask} />
      {/* bent legs: thigh forward on the seat, shin down, ski boot and ski */}
      <path d={`M${hx},${hy} L${hx + 80 * s},${hy + 2 * s}`} stroke={CLAIRE.pants} strokeWidth={30 * s} strokeLinecap="round" />
      <path d={`M${hx + 80 * s},${hy + 2 * s} L${hx + 88 * s},${hy + 78 * s}`} stroke={CLAIRE.pantsShade} strokeWidth={24 * s} strokeLinecap="round" />
      <rect x={hx + 70 * s} y={hy + 70 * s} width={44 * s} height={30 * s} rx={6 * s} fill={CLAIRE.boot} />
      <path d={`M${hx + 10 * s},${hy + 104 * s} L${hx + 210 * s},${hy + 96 * s}`} stroke="#c23a32" strokeWidth={8 * s} strokeLinecap="round" />
      <path d={`M${hx + 205 * s},${hy + 96 * s} q14,-2 16,-12`} stroke="#c23a32" strokeWidth={6 * s} fill="none" strokeLinecap="round" />
      {/* lowered safety bar and footrest */}
      <path d={`M${hx - 20 * s},${hy - 110 * s} L${hx + 110 * s},${hy - 60 * s} L${hx + 110 * s},${hy + 60 * s} L${hx + 70 * s},${hy + 60 * s}`} stroke="#3a3f46" strokeWidth={6 * s} fill="none" strokeLinejoin="round" />
    </g>
  );
};

// Helmet, goggles and (optionally) the grandpa balaclava on a Person head (hiker coords).
const HeadKit: React.FC<{ p: HikerProps; mask: number }> = ({ p, mask }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)}>
      {mask > 0 && (
        <g opacity={mask}>
          <ellipse cx={hx} cy={hy - 2} rx={28} ry={30} fill={PRINT} />
          <rect x={hx - 16} y={hy + 14} width={30} height={24} fill={PRINT2} />
          <path d={`M${hx + 4},${hy + 8} q10,-6 24,4 q-10,8 -24,0 Z`} fill={STASH} />
          <circle cx={hx + 22} cy={hy + 2} r={4} fill="#c06a5a" />
        </g>
      )}
      <path d={`M${hx - 28},${hy - 4} Q${hx - 30},${hy - 42} ${hx},${hy - 44} Q${hx + 30},${hy - 42} ${hx + 28},${hy - 8} Z`} fill={HELMET} />
      <path d={`M${hx - 28},${hy - 4} Q${hx - 30},${hy - 42} ${hx},${hy - 44} Q${hx - 14},${hy - 30} ${hx - 16},${hy - 6} Z`} fill={HELMET2} />
      <rect x={hx - 26} y={hy - 12} width={52} height={5} fill="#2a2a2a" />
      <rect x={hx + 2} y={hy - 15} width={28} height={13} rx={5} fill={LENS} stroke="#2a2a2a" strokeWidth={2} />
    </g>
  );
};

// Big close-up face (screen coords), three-quarter view to the right, helmet and goggles on. mask 0..1 pulls the balaclava up.
const FaceClaire: React.FC<{ cx: number; cy: number; s: number; sting: number; mask: number; t: number }> = ({ cx, cy, s, sting, mask, t }) => {
  const o = CLAIRE;
  const pulse = 0.7 + 0.3 * Math.sin(t * 9);
  const top = mix(230, -170, mask); // top edge of the pulled-up balaclava
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      <defs>
        <filter id="fcBlur" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation={10} />
        </filter>
        <clipPath id="fcMask">
          <rect x={-300} y={top} width={600} height={600} />
        </clipPath>
        <linearGradient id="fcLens" x1="0" y1="-60" x2="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={LENS} />
          <stop offset="1" stopColor={LENS2} />
        </linearGradient>
      </defs>
      {/* ponytail behind */}
      {mask < 0.5 && <path d="M-80,-40 Q-170,0 -150,120 Q-120,60 -70,10 Z" fill={o.hair} />}
      {/* neck + face */}
      <path d="M-36,60 L56,60 L58,170 L-38,170 Z" fill={o.skinShade} />
      <ellipse cx={20} cy={4} rx={84} ry={92} fill={o.skin} />
      <ellipse cx={-30} cy={10} rx={16} ry={22} fill={o.skinShade} />
      <ellipse cx={-62} cy={12} rx={20} ry={30} fill={o.skin} />
      {/* stinging cheeks in the gap */}
      <ellipse cx={60} cy={30} rx={34} ry={24} fill="#e2523e" opacity={0.25 + 0.4 * sting * pulse} />
      <ellipse cx={-14} cy={34} rx={26} ry={22} fill="#e2523e" opacity={0.2 + 0.35 * sting * pulse} />
      {sting > 0 && <ellipse cx={30} cy={36} rx={110} ry={44} fill="#ff6a50" opacity={0.25 * sting * pulse} filter="url(#fcBlur)" />}
      <path d="M44,4 q12,18 0,26" stroke={o.skinShade} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={sting > 0.5 ? "M22,56 q14,-6 28,0" : "M22,52 q14,2 28,0"} stroke="#5a2e22" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* the balaclava: printed grumpy grandpa, covers head, face and neck */}
      {mask > 0 && (
        <g clipPath="url(#fcMask)">
          <path d="M-70,90 L110,90 L130,250 L-90,250 Z" fill={PRINT2} />
          {[120, 150, 180, 210].map((y) => (
            <path key={y} d={`M-80,${y} q100,${-12} 200,0`} stroke="#9e6450" strokeWidth={4} fill="none" opacity={0.7} />
          ))}
          <ellipse cx={18} cy={-4} rx={98} ry={112} fill={PRINT} />
          <ellipse cx={-74} cy={10} rx={22} ry={34} fill={PRINT2} />
          {/* grey side hair printed on the sides */}
          <path d="M-96,-40 q-14,40 6,90 M-84,-60 q-18,50 2,100" stroke="#e8e6e0" strokeWidth={8} fill="none" strokeLinecap="round" />
          {/* forehead wrinkles */}
          {[-110, -92, -74].map((y) => (
            <path key={y} d={`M-30,${y} q50,-10 100,0`} stroke="#a86a54" strokeWidth={4} fill="none" />
          ))}
          {/* big nose, white handlebar mustache, grumpy mouth */}
          <ellipse cx={58} cy={22} rx={22} ry={20} fill="#d07563" />
          <path d="M-10,52 Q20,30 56,46 Q92,30 122,52 Q130,74 112,66 Q90,56 56,60 Q22,56 0,66 Q-18,74 -10,52 Z" fill={STASH} />
          <path d="M6,56 Q30,46 56,54 M70,54 Q96,46 116,58" stroke={STASH2} strokeWidth={4} fill="none" />
          <path d="M34,90 q22,-10 44,0" stroke="#7a3e30" strokeWidth={5} fill="none" strokeLinecap="round" />
          <ellipse cx={56} cy={104} rx={26} ry={12} fill="#c9c6bf" opacity={0.6} />
        </g>
      )}
      {/* helmet */}
      <path d="M-104,-30 Q-118,-176 14,-178 Q146,-176 128,-34 Z" fill={HELMET} />
      <path d="M-104,-30 Q-118,-176 14,-178 Q-44,-140 -50,-32 Z" fill={HELMET2} />
      {[-60, 0, 60].map((x) => (
        <rect key={x} x={x} y={-160} width={22} height={40} rx={8} fill={HELMET2} />
      ))}
      {/* goggles: strap and big lens, down over the eyes */}
      <path d="M-110,-34 L-50,-30" stroke="#2a2a2a" strokeWidth={20} />
      <rect x={-50} y={-66} width={186} height={78} rx={30} fill="#2a2a2a" />
      <rect x={-42} y={-58} width={170} height={62} rx={24} fill="url(#fcLens)" />
      <path d="M-20,-50 q40,-8 80,0" stroke="#ffffff" strokeWidth={6} opacity={0.6} fill="none" strokeLinecap="round" />
      {/* jacket collar zipped high */}
      <path d="M-190,250 Q-150,150 -60,140 L80,140 Q170,150 210,250 L210,320 L-190,320 Z" fill={o.jacket} />
      <path d="M-70,124 L90,124 L100,190 L-80,190 Z" fill={o.jacketShade} />
      <path d="M10,124 L10,320" stroke="#1f4a4e" strokeWidth={5} />
    </g>
  );
};

// ============ S1 HOOK WIDE: a rider in a grandpa face rides the chairlift (0 - 2.0) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 2.0), rot: hh.rot };
  const g = 1500;
  const cy = 820 - t * 30;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 40} width={1880} height={1400} fill={SNOW} />
          <path d={`M-400,${g + 120} Q540,${g - 40} 1480,${g + 60}`} stroke={SNOW2} strokeWidth={40} fill="none" />
          <Cable y0={cy + 420} y1={cy - 300} tower={880} />
        </Svg>
        <Subject rimX={6} col="rgba(255,246,225,0.9)">
          <Svg>
            <Rider hx={480} hy={cy + 300} s={1.7} cableY={cy + 420 - ((cy + 420 - (cy - 300)) * 860) / 1880} mask={1} t={t} swing={Math.sin(t * 2) * 1.5} />
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,246,225" />
      <Particles seed={1631} n={16} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,222" cool="40,60,90" />
      <Title text={"Why is grandpa\non the chairlift?"} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: earlier, the wind stings the bare gap between goggles and collar (2.0 - 5.4) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const shake = Math.sin(t * 30) * 4;
  const cam: Cam = { x: hh.x + shake, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.4), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,244,225,0.85)">
          <Svg>
            <FaceClaire cx={470} cy={1000} s={3.0} sting={at(t, [2.0, 2.6], [0.3, 1])} mask={0} t={t} />
            <Wind t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1632} n={18} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,242,228" cool="40,60,100" vignette={0.55} />
      <Chip text="Wind on the lift" t={t} t0={2.2} x={60} y={170} icon="x" big />
      <Chip text="Bare skin under the goggles" t={t} t0={3.5} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the fix, the balaclava comes up over the gap (5.4 - 8.4) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.0), rot: hh.rot };
  const mask = at(t, [6.0, 7.0], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,244,225,0.85)">
          <Svg>
            <FaceClaire cx={470} cy={1000} s={3.0} sting={1 - mask} mask={mask} t={t} />
            <Wind t={t} k={0.6} n={8} />
          </Svg>
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,246,225" />
      <Particles seed={1633} n={14} col="#ffffff" fall={18} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" vignette={0.5} />
      <Chip text="The fix" t={t} t0={5.5} x={60} y={170} icon="none" big />
      <Chip text="Cover the gap" t={t} t0={6.3} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: on the chair, covered head to neck, wind passes by (8.4 - 10.7) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.3), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1500} t={t} blur={3} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <Cable y0={900} y1={260} />
        </Svg>
        <Subject rimX={6} col="rgba(255,246,225,0.9)">
          <Svg>
            <Rider hx={420} hy={1120} s={2.4} cableY={900 - (640 * 760) / 1880} mask={1} t={t} swing={Math.sin(t * 2) * 1.2} />
          </Svg>
        </Subject>
        <Svg>
          <Wind t={t} k={0.5} n={10} />
        </Svg>
      </Plane>
      <Particles seed={1634} n={16} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Chip text="Head, face and neck" t={t} t0={8.5} x={60} y={170} icon="check" big />
      <Chip text="One piece" t={t} t0={9.6} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the payoff, her grumpy grandpa face in the sun (10.7 - 12.68) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.7], [1.12, 1.02], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,240,210,0.9)">
          <Svg>
            <FaceClaire cx={500} cy={1000} s={3.0} sting={0} mask={1} t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.35} col="255,240,210" />
      <Particles seed={1635} n={18} col="#fff6e0" bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,232,200" cool="40,60,90" vignette={0.5} />
      <Chip text="Grumpy Grandpa print" t={t} t0={11.2} x={60} y={170} icon="none" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/funny-old-man-ski-mask-balaclava-cut.png"
      cutoutH={800}
      spec="3D PRINT BALACLAVA · HEAD, FACE + NECK"
      name={
        <>
          Funny Old Man
          <br />
          Ski Mask
        </>
      }
      nameSize={88}
      price="from $17.99"
      save="Save this before your next cold day out"
    />
  );
};

export const V163: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.08} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.0} to={5.48} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.0} />
    </Scene>
    <Scene from={5.4} to={8.48} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.4} />
    </Scene>
    <Scene from={8.4} to={10.78} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={8.4} />
    </Scene>
    <Scene from={10.7} to={12.76} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={10.7} />
    </Scene>
    <Scene from={12.68} to={16.8} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.0, 1600],
        [2.0, 5.4, 1600],
        [5.4, 8.4, 1600],
        [8.4, 10.7, 1600],
        [10.7, 12.68, 1600],
      ]}
    />
  </AbsoluteFill>
);
