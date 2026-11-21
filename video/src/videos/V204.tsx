// V204: "The Loop Road was gated." Short format (15.8 s, 37 words), cinematic C01 style, Acadia in December.
// Product: Acadia National Park — Trip Planning Guide, $9.99 (live Shopify). End card: the real store cover, cut out.
// Facts (NPS Acadia): most of the Park Loop Road is closed to cars from December 1 to April 14 (Ocean Drive and the
// Jordan Pond road stay open, weather permitting, as the caption says). The carriage roads are open to walkers in winter.
// The gate sign is generic (no NPS logo).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, WinterBackdrop } from "../winter";
import { SnowCar } from "../icy";
import vo from "../vo/v204.json";

const words = vo.words as unknown as Word[];

// Grey-blue December day on the Maine coast.
const MAINE: Sky = { top: "#4a6684", mid: "#a6b6c4", low: "#e6e4dc", sun: [760, 600], sunR: 40, sunCol: "#fff8e8", glow: "#efdcc0" };
const SEA = "#3d6575";
const GRANITE = "#b88f80";
const GRANITE2 = "#93705f";

const KATE: Outfit = {
  ...GUIDE,
  skin: "#EDC0A0",
  skinShade: "#CE9C7C",
  hair: "#b8742e",
  ponytail: "#b8742e",
  beard: null,
  cap: "#2c4a6e",
  capShade: "#203856",
  jacket: "#B23A3A",
  jacketShade: "#8a2c2c",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  boot: "#5a3e2c",
  sole: "#231d19",
  pack: "#3E4F5C",
  packShade: "#2C3943",
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

// Winter coast: rounded hills, grey sea, pink granite ledges dusted with snow.
const CoastWinter: React.FC<{ cam: Cam; uid: string; y: number; t: number; blur?: number }> = ({ cam, uid, y, t, blur = 0 }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.5}>
      <SkyPlane sky={MAINE} uid={uid} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2 + blur}>
      <Ridge seed={71} base={y - 260} amp={260} scale={300} col="#8a9aa8" lit="#f2f2ee" />
    </Plane>
    <Haze y={y - 380} h={300} col={MAINE.low} opacity={0.55} />
    <Plane cam={cam} depth={0.3} blur={1.2 + blur}>
      <Svg>
        <rect x={-400} y={y - 120} width={1880} height={1600} fill={SEA} />
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={i} x={-200 + ((i * 211 + t * 24) % 1600)} y={y - 90 + (i % 5) * 46} width={110 + (i % 3) * 50} height={4} fill="rgba(255,255,255,0.4)" />
        ))}
      </Svg>
    </Plane>
    <Plane cam={cam} depth={0.55} blur={0.5 + blur}>
      <Svg>
        <path d={`M-400,${y + 120} Q-100,${y + 10} 200,${y + 60} Q420,${y + 100} 640,${y + 40} Q900,${y - 20} 1480,${y + 80} L1480,${y + 600} L-400,${y + 600} Z`} fill={GRANITE} />
        <path d={`M-400,${y + 200} Q100,${y + 140} 500,${y + 190} Q900,${y + 230} 1480,${y + 160} L1480,${y + 600} L-400,${y + 600} Z`} fill={GRANITE2} />
        <path d={`M-100,${y + 40} Q100,${y + 10} 200,${y + 58} M560,${y + 52} Q760,${y} 960,${y + 6}`} stroke={SNOW} strokeWidth={16} fill="none" strokeLinecap="round" />
        {Array.from({ length: 8 }, (_, i) => (
          <Pine key={i} x={980 + i * 70} y={y + 20 - (i % 2) * 20} h={200 + (i % 3) * 40} c="#2c4a3c" c2="#1f382c" />
        ))}
      </Svg>
    </Plane>
  </>
);

// Road with the closed gate (generic sign).
const GateRoad: React.FC<{ y: number; gx?: number; s?: number }> = ({ y, gx = 720, s = 1 }) => (
  <Svg>
    <rect x={-400} y={y - 30} width={1880} height={1400} fill={SNOW} />
    <path d={`M-400,${y + 60} L1480,${y - 10} L1480,${y + 120} L-400,${y + 300} Z`} fill="#6a6f74" />
    <path d={`M-400,${y + 180} L1480,${y + 55}`} stroke="#e9d36a" strokeWidth={6} strokeDasharray="60 40" />
    <path d={`M-400,${y + 300} L1480,${y + 120} L1480,${y + 150} L-400,${y + 340} Z`} fill={SNOW2} />
    <g transform={`translate(${gx},${y + 60}) scale(${s})`}>
      <rect x={-260} y={-130} width={22} height={150} fill="#6a6a6a" />
      <rect x={238} y={-150} width={22} height={150} fill="#6a6a6a" />
      <rect x={-260} y={-130} width={520} height={26} rx={8} fill="#f4f4f4" transform="rotate(-4)" />
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x={-240 + i * 104} y={-130} width={52} height={26} fill="#c23a32" transform="rotate(-4)" />
      ))}
      <rect x={-150} y={-300} width={300} height={110} rx={10} fill="#c23a32" />
      <text x={0} y={-230} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={56} fill="#fff" letterSpacing={3}>
        ROAD CLOSED
      </text>
      <rect x={-8} y={-190} width={16} height={66} fill="#6a6a6a" />
    </g>
  </Svg>
);

// Wide gravel carriage road through snowy woods, with a granite arch bridge behind.
const CarriageRoad: React.FC<{ y: number; bridge?: boolean }> = ({ y, bridge = true }) => (
  <Svg>
    {bridge && (
      <g transform={`translate(560,${y - 40})`}>
        <path d="M-420,0 L-420,-300 L420,-300 L420,0 L200,0 Q200,-200 0,-210 Q-200,-200 -200,0 Z" fill="#a89a8c" />
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M${-420 + i * 120},-300 l0,-40 l100,0 l0,40`} fill="#8f8276" />
        ))}
        <path d="M-200,0 Q-200,-200 0,-210 Q200,-200 200,0" stroke="#7b6f64" strokeWidth={14} fill="none" />
        <rect x={-430} y={-350} width={860} height={22} fill={SNOW} />
      </g>
    )}
    <rect x={-400} y={y - 20} width={1880} height={1400} fill={SNOW} />
    <path d={`M330,${y - 20} L790,${y - 20} L1480,${y + 700} L-400,${y + 700} Z`} fill="#cfc3ae" />
    <path d={`M330,${y - 20} L-400,${y + 700} M790,${y - 20} L1480,${y + 700}`} stroke={SNOW2} strokeWidth={30} fill="none" />
    {Array.from({ length: 10 }, (_, i) => (
      <ellipse key={i} cx={200 + i * 80} cy={y + 120 + (i % 3) * 120} rx={26} ry={8} fill="#b8ab95" />
    ))}
  </Svg>
);

// ============ S1 HOOK WIDE: Kate's car on the snowy coast road, December (0 - 2.0) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 18, y: hh.y, zoom: mix(1.03, 1.1, t / 2.0), rot: hh.rot };
  const y = 1240;
  const cx = 120 + t * 240;
  return (
    <AbsoluteFill>
      <CoastWinter cam={cam} uid="a" y={y} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={y + 330} width={1880} height={800} fill={SNOW} />
          <rect x={-400} y={y + 380} width={1880} height={150} fill="#6a6f74" />
          <path d={`M-400,${y + 455} L1480,${y + 455}`} stroke="#e9d36a" strokeWidth={6} strokeDasharray="60 40" />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,215,0.85)">
          <SnowCar x={cx} y={y + 500} s={2.2} body="#2f5a7a" shade="#234560" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={MAINE.sun[0]} y={MAINE.sun[1]} strength={0.2} col="255,246,225" />
      <Particles seed={2041} n={16} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={760} sunY={600} warm="255,240,222" cool="40,60,90" />
      <Title text={"The Loop Road\nwas gated."} t={t} t0={0} top={110} size={132} />
      <Chip text="Acadia, December" t={t} t0={0.9} x={60} y={460} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S1b MEDIUM: she stops at the closed gate (2.0 - 3.93) ============
const S1b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.93), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 430, y: g + 270, scale: 2.4, walk: 0, lean: -0.04, poles: false, handOverride: [60, 20], breathe: Math.sin(t * 2) * 1.4 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={MAINE} uid="b" treeY={g - 80} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <GateRoad y={g} gx={850} />
        <Svg>
          <SnowCar x={120} y={g + 300} s={2.0} body="#2f5a7a" shade="#234560" />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={KATE} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={2042} n={20} col="#ffffff" fall={22} />
      <LowScrim />
      <Grade sunX={760} sunY={600} warm="250,242,232" cool="40,60,90" />
      <Chip text="Park Loop Road" t={t} t0={2.4} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the gate and its sign, the closed dates (3.93 - 6.1) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.17), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={MAINE} uid="c" treeY={1150} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,244,225,0.8)">
          <GateRoad y={1260} gx={560} s={2.3} />
        </Subject>
      </Plane>
      <Particles seed={2043} n={16} col="#ffffff" fall={18} />
      <LowScrim />
      <Grade sunX={760} sunY={600} warm="250,242,228" cool="40,60,90" vignette={0.55} />
      <Chip text="December 1 to April 14" t={t} t0={4.2} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Kate's face at the gate, closed to cars (6.1 - 8.18) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.08), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 540, y: 1700 + 182 * s - 80, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 1.4) * 1.6 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={MAINE} uid="d" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={KATE} expression="tired" />
          <Breath p={p} t={t * 0.6} />
        </Subject>
      </Plane>
      <Particles seed={2044} n={18} col="#ffffff" fall={20} />
      <LowScrim />
      <Grade sunX={760} sunY={600} warm="255,240,220" cool="40,60,90" vignette={0.6} />
      <Chip text="Most of it closed to cars" t={t} t0={6.2} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 WIDE: the rule. A carriage road and its stone bridge, open to walkers (8.18 - 10.0) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.0, 1.07, lt / 1.82), rot: hh.rot };
  const g = 1300;
  const ph = t * 3;
  const p: HikerProps = { x: 560, y: g + 260 - lt * 50, scale: 1.3, phase: ph, walk: 0.7, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={MAINE} uid="e" treeY={g - 200} t={t} />
      <Plane cam={cam} depth={1}>
        <CarriageRoad y={g} />
        <Subject rimX={4} col="rgba(255,240,210,0.8)">
          <Person {...p} outfit={KATE} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={MAINE.sun[0]} y={MAINE.sun[1]} strength={0.28} col="255,246,225" />
      <Particles seed={2045} n={16} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={760} sunY={600} warm="255,240,220" cool="40,60,90" />
      <Chip text="The rule" t={t} t0={8.3} x={60} y={200} icon="none" big />
      <Chip text="Winter: walk the carriage roads" t={t} t0={9.5} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: Kate walks the snowy carriage road, happy (10.0 - 11.3) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 24, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.3), rot: hh.rot };
  const g = 1440;
  const ph = t * 3;
  const p: HikerProps = { x: 400 + lt * 120, y: g + 40, scale: 2.4, phase: ph, walk: 0.7, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={MAINE} uid="f" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 20} width={1880} height={1400} fill={SNOW} />
          <rect x={-400} y={g + 10} width={1880} height={140} fill="#cfc3ae" />
          <rect x={-400} y={g + 4} width={1880} height={14} fill={SNOW2} />
          <rect x={-400} y={g + 146} width={1880} height={14} fill={SNOW2} />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={KATE} expression="happy" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={MAINE.sun[0]} y={MAINE.sun[1]} strength={0.3} col="255,246,225" />
      <Particles seed={2046} n={16} col="#ffffff" bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={600} warm="255,240,220" cool="40,60,90" />
      <Chip text="No cars, open to walkers" t={t} t0={10.1} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/acadia-national-park-trip-planning-guide-cover-cut.png"
      cutoutH={800}
      spec="30-PAGE TRIP PLANNING GUIDE · DOWNLOAD"
      name={
        <>
          Acadia National Park
          <br />
          Trip Planning Guide
        </>
      }
      nameSize={72}
      price="$9.99"
      save="Save this before your Acadia trip"
    />
  );
};

export const V204: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.08} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.0} to={4.01} fadeIn={0.06} fadeOut={0.08}>
      <S1b off={2.0} />
    </Scene>
    <Scene from={3.93} to={6.18} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.93} />
    </Scene>
    <Scene from={6.1} to={8.26} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={6.1} />
    </Scene>
    <Scene from={8.18} to={10.08} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={8.18} />
    </Scene>
    <Scene from={10.0} to={11.4} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={10.0} />
    </Scene>
    <Scene from={11.3} to={15.8} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.93, 1600],
        [3.93, 8.18, 1600],
        [8.18, 11.3, 1600],
      ]}
    />
  </AbsoluteFill>
);
