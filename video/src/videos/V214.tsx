// V214: "The North Rim gate was locked." Short format (16.8 s, 42 words), cinematic C01 style, Grand Canyon in winter.
// Product: Grand Canyon South Rim — Trip Planning Guide, $9.99 (live Shopify). End card: the real store cover (boxed photo card).
// Facts (NPS Grand Canyon): the road to the North Rim (Arizona Highway 67) closes for winter, usually on December 1 or earlier
// with snow, and reopens in mid-May. The South Rim is open all year. Gate sign is generic (no NPS logo).
// Scene parts (gate road, car, breath) built like V204.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, WinterBackdrop } from "../winter";
import { SnowCar } from "../icy";
import { CanyonBackdrop } from "../canyon";
import vo from "../vo/v214.json";

const words = vo.words as unknown as Word[];

// Cold, clear plateau day.
const KAIBAB: Sky = { top: "#3f6690", mid: "#a9bfd2", low: "#ece8de", sun: [780, 560], sunR: 42, sunCol: "#fffaec", glow: "#f2e2c4" };
const RIM: Sky = { top: "#4a6f98", mid: "#b8c8d6", low: "#f0dcc6", sun: [820, 480], sunR: 44, sunCol: "#fff8e6", glow: "#ffdcae" };

const BETH: Outfit = {
  ...GUIDE,
  skin: "#C99470",
  skinShade: "#A87552",
  hair: "#2e1f16",
  ponytail: "#2e1f16",
  beard: null,
  cap: "#C2662E",
  capShade: "#9B4E20",
  jacket: "#2F6B7A",
  jacketShade: "#235561",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  boot: "#5a3e2c",
  sole: "#231d19",
  pack: "#7a5a3a",
  packShade: "#5e4429",
  glove: "#2a2a2a",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const Breath: React.FC<{ p: HikerProps; t: number }> = ({ p, t }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const k = (t * 0.5) % 1;
  return (
    <g transform={hikerTransform(p)}>
      <circle cx={hx + 55 + k * 70} cy={hy + 10 - k * 24} r={8 + k * 22} fill="#ffffff" opacity={0.35 * (1 - k)} />
    </g>
  );
};

// Snowy highway with a locked swing gate and a generic closed sign.
const GateRoad: React.FC<{ y: number; gx?: number; s?: number; lock?: boolean }> = ({ y, gx = 720, s = 1, lock = true }) => (
  <Svg>
    <rect x={-400} y={y - 30} width={1880} height={1400} fill={SNOW} />
    <path d={`M-400,${y + 60} L1480,${y - 10} L1480,${y + 120} L-400,${y + 300} Z`} fill="#6a6f74" />
    <path d={`M-400,${y + 60} L1480,${y - 10} L1480,${y + 30} L-400,${y + 110} Z`} fill={SNOW2} opacity={0.8} />
    <path d={`M-400,${y + 300} L1480,${y + 120} L1480,${y + 150} L-400,${y + 340} Z`} fill={SNOW2} />
    <g transform={`translate(${gx},${y + 60}) scale(${s})`}>
      <rect x={-270} y={-160} width={26} height={180} fill="#5d6166" />
      <rect x={244} y={-170} width={26} height={190} fill="#5d6166" />
      {/* swing gate: two rails and a diagonal brace, yellow */}
      <rect x={-250} y={-150} width={500} height={22} rx={6} fill="#e2b93b" />
      <rect x={-250} y={-80} width={500} height={22} rx={6} fill="#e2b93b" />
      <path d="M-240,-62 L240,-140" stroke="#c99f2a" strokeWidth={16} />
      <rect x={-250} y={-150} width={500} height={4} fill="#ffffff" opacity={0.7} />
      {/* snow on the top rail */}
      <path d="M-252,-150 Q-120,-170 0,-158 Q120,-170 252,-152" stroke={SNOW} strokeWidth={12} fill="none" strokeLinecap="round" />
      {/* chain and padlock at the latch post */}
      {lock && (
        <g transform="translate(232,-110)">
          <path d="M-14,-30 q-14,30 0,60 M14,-30 q14,30 0,60" stroke="#8a8f94" strokeWidth={6} fill="none" />
          <rect x={-22} y={20} width={44} height={40} rx={6} fill="#3a3d40" />
          <path d="M-12,22 v-14 a12,12 0 0 1 24,0 v14" stroke="#8a8f94" strokeWidth={6} fill="none" />
        </g>
      )}
      {/* sign */}
      <rect x={-8} y={-290} width={16} height={140} fill="#5d6166" />
      <rect x={-200} y={-420} width={400} height={150} rx={10} fill="#c23a32" />
      <rect x={-190} y={-410} width={380} height={130} rx={8} fill="none" stroke="#ffffff" strokeWidth={4} />
      <text x={0} y={-355} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={58} fill="#fff" letterSpacing={3}>
        ROAD CLOSED
      </text>
      <text x={0} y={-302} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={36} fill="#fff" letterSpacing={3}>
        FOR WINTER
      </text>
    </g>
  </Svg>
);

// Snow on the South Rim edge: rocks, a few junipers, a low stone wall.
const RimEdge: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y} Q100,${y - 30} 500,${y - 10} Q900,${y + 10} 1480,${y - 20} L1480,2600 L-400,2600 Z`} fill="#b68a66" />
    <path d={`M-400,${y + 4} Q100,${y - 26} 500,${y - 6} Q900,${y + 14} 1480,${y - 16} L1480,${y + 40} Q900,${y + 70} 500,${y + 50} Q100,${y + 30} -400,${y + 60} Z`} fill={SNOW} />
    <rect x={-400} y={y + 60} width={1880} height={1400} fill={SNOW} />
    <rect x={-400} y={y + 40} width={1880} height={40} fill="#9b8a78" />
    {Array.from({ length: 16 }, (_, i) => (
      <rect key={i} x={-380 + i * 120} y={y + 42} width={110} height={36} rx={8} fill={i % 2 ? "#a89684" : "#8f7e6c"} />
    ))}
    <rect x={-400} y={y + 34} width={1880} height={12} fill={SNOW} />
    {[60, 980].map((x, i) => (
      <g key={i} transform={`translate(${x},${y + 30})`}>
        <ellipse cx={0} cy={-60} rx={80} ry={70} fill="#3f5a3a" />
        <ellipse cx={30} cy={-110} rx={56} ry={50} fill="#4a6a44" />
        <path d="M-60,-90 Q0,-140 60,-100" stroke={SNOW} strokeWidth={14} fill="none" strokeLinecap="round" />
      </g>
    ))}
  </Svg>
);

// ============ S1 HOOK WIDE: Beth drives the snowy plateau road (0 - 2.0) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 18, y: hh.y, zoom: mix(1.03, 1.1, t / 2.0), rot: hh.rot };
  const y = 1240;
  const cx = 120 + t * 240;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={KAIBAB} uid="a" treeY={y + 200} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={y + 330} width={1880} height={800} fill={SNOW} />
          <rect x={-400} y={y + 380} width={1880} height={150} fill="#6a6f74" />
          <path d={`M-400,${y + 455} L1480,${y + 455}`} stroke="#e9d36a" strokeWidth={6} strokeDasharray="60 40" />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,215,0.85)">
          <SnowCar x={cx} y={y + 500} s={2.2} body="#7a3b2e" shade="#5e2c22" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={KAIBAB.sun[0]} y={KAIBAB.sun[1]} strength={0.22} col="255,246,225" />
      <Particles seed={2141} n={16} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={780} sunY={560} warm="255,240,222" cool="40,60,90" />
      <Title text={"The North Rim\ngate was locked."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S1b MEDIUM: she stops at the locked gate (2.0 - 3.93) ============
const S1b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.93), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 400, y: g + 270, scale: 2.4, walk: 0, lean: -0.04, poles: false, handOverride: [60, 20], breathe: Math.sin(t * 2) * 1.4 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={KAIBAB} uid="b" treeY={g - 80} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <GateRoad y={g} gx={800} s={0.95} />
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={BETH} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={2142} n={20} col="#ffffff" fall={22} />
      <LowScrim />
      <Grade sunX={780} sunY={560} warm="250,242,232" cool="40,60,90" />
      <Chip text="North Rim, Christmas week" t={t} t0={2.2} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the locked gate and the sign (3.93 - 7.6) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.67), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={KAIBAB} uid="c" treeY={1150} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,244,225,0.8)">
          <GateRoad y={1300} gx={500} s={2.0} />
        </Subject>
      </Plane>
      <Particles seed={2143} n={16} col="#ffffff" fall={18} />
      <LowScrim />
      <Grade sunX={780} sunY={560} warm="250,242,228" cool="40,60,90" vignette={0.55} />
      <Chip text="Road closes for winter" t={t} t0={4.7} x={60} y={170} icon="x" big />
      <Chip text="Usually by December 1" t={t} t0={6.0} x={60} y={300} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Beth's face at the gate, locked until May (7.6 - 10.36) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.76), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 540, y: 1700 + 182 * s - 80, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 1.4) * 1.6 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={KAIBAB} uid="d" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={BETH} expression="tired" />
          <Breath p={p} t={t * 0.6} />
        </Subject>
      </Plane>
      <Particles seed={2144} n={18} col="#ffffff" fall={20} />
      <LowScrim />
      <Grade sunX={780} sunY={560} warm="255,240,220" cool="40,60,90" vignette={0.6} />
      <Chip text="Locked until mid-May" t={t} t0={8.5} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the rule. Beth at the snowy South Rim, open all year (10.36 - 12.74) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.38), rot: hh.rot };
  const g = 1420;
  const ph = t * 3;
  const p: HikerProps = { x: 380 + lt * 90, y: g + 120, scale: 2.3, phase: ph, walk: 0.6, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={RIM} uid="e" y={1250} t={t} />
      <Plane cam={cam} depth={1}>
        <RimEdge y={g} />
        <Subject rimX={6} col="rgba(255,236,200,0.9)">
          <Person {...p} outfit={BETH} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2c3f2a" side="left" />
      </Plane>
      <Rays x={RIM.sun[0]} y={RIM.sun[1]} strength={0.3} col="255,240,210" />
      <Particles seed={2145} n={14} col="#ffffff" bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="255,232,200" cool="40,60,90" />
      <Chip text="The rule" t={t} t0={10.5} x={60} y={200} icon="none" big />
      <Chip text="Winter: plan the South Rim" t={t} t0={11.7} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/grand-canyon-south-rim-trip-planning-guide.jpg"
      photoH={800}
      spec="30 PAGES · 10 WALKS AND HIKES · MI + KM"
      name={
        <>
          Grand Canyon
          <br />
          South Rim Guide
        </>
      }
      nameSize={88}
      price="$9.99"
      save="Save this before your Grand Canyon trip"
    />
  );
};

export const V214: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.08} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.0} to={4.01} fadeIn={0.06} fadeOut={0.08}>
      <S1b off={2.0} />
    </Scene>
    <Scene from={3.93} to={7.68} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.93} />
    </Scene>
    <Scene from={7.6} to={10.44} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={7.6} />
    </Scene>
    <Scene from={10.36} to={12.84} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={10.36} />
    </Scene>
    <Scene from={12.76} to={16.8} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.93, 1600],
        [3.93, 7.6, 1600],
        [7.6, 10.36, 1600],
        [10.36, 12.76, 1600],
      ]}
    />
  </AbsoluteFill>
);
