// V198: "The road stopped at the lake." Short format (17.6 s, 43 words), cinematic C01 style, Glacier in December.
// Product: Glacier National Park — Trip Planning Guide, $9.99 (live Shopify). End card = boxed store photo (as in V120).
// Facts (NPS Glacier): in winter Going-to-the-Sun Road is closed to cars beyond Lake McDonald Lodge; the closed road can be
// walked, skied or snowshoed. Logan Pass is not reachable by car in winter. No numbers.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, WINTER, WinterBackdrop } from "../winter";
import { SnowCar } from "../icy";
import vo from "../vo/v198.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const ADAM: Outfit = {
  ...JAKE,
  skin: "#D7A07A",
  skinShade: "#B98260",
  hair: "#4a3020",
  beard: "#4a3020",
  cap: "#8C2F2F",
  capShade: "#6f2424",
  jacket: "#2E5E7E",
  jacketShade: "#224962",
  pants: "#3b3b3b",
  pantsShade: "#2b2b2b",
  pack: "#a0782f",
  packShade: "#7f5f24",
  glove: "#2a2a2a",
};

const Breath: React.FC<{ p: HikerProps; t: number; flip?: boolean }> = ({ p, t, flip }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const k = (t * 0.5) % 1;
  return (
    <g transform={hikerTransform(p)}>
      <circle cx={hx + (flip ? -1 : 1) * (55 + k * 70)} cy={hy + 10 - k * 24} r={8 + k * 22} fill="#ffffff" opacity={0.35 * (1 - k)} />
    </g>
  );
};

// Snowy road receding to the right, optional closed gate across it.
const Road: React.FC<{ y: number; gate?: boolean; gx?: number }> = ({ y, gate = false, gx = 720 }) => (
  <Svg>
    <rect x={-400} y={y - 30} width={1880} height={1400} fill={SNOW} />
    <path d={`M-400,${y + 60} L1480,${y - 10} L1480,${y + 120} L-400,${y + 300} Z`} fill="#6a6f74" />
    <path d={`M-400,${y + 180} L1480,${y + 55}`} stroke="#e9d36a" strokeWidth={6} strokeDasharray="60 40" />
    <path d={`M-400,${y + 300} L1480,${y + 120} L1480,${y + 150} L-400,${y + 340} Z`} fill={SNOW2} />
    {gate && (
      <g transform={`translate(${gx},${y + 60})`}>
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
    )}
  </Svg>
);

// Lake McDonald in winter: snowy peaks over a long blue lake, a lodge with lit windows on the near shore.
const WinterLake: React.FC<{ cam: Cam; sky: Sky; uid: string; shore: number; t: number; lodge?: number }> = ({ cam, sky, uid, shore, t, lodge = 1 }) => (
  <>
    <Plane cam={cam} depth={0.04}>
      <SkyPlane sky={sky} uid={uid} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2}>
      <Ridge seed={91} base={shore - 160} amp={560} scale={170} col="#aebdcb" lit="#ffffff" peak={180} />
    </Plane>
    <Haze y={shore - 460} h={320} col={sky.low} opacity={0.5} />
    <Plane cam={cam} depth={0.3} blur={1.2}>
      <Ridge seed={97} base={shore - 40} amp={300} scale={140} col="#5f7484" lit="#e9f0f4" />
    </Plane>
    <Plane cam={cam} depth={0.45} blur={0.6}>
      <Svg>
        <defs>
          <linearGradient id={`wl${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7fa9bd" />
            <stop offset="1" stopColor="#3d6f82" />
          </linearGradient>
        </defs>
        <rect x={-400} y={shore} width={1880} height={1400} fill={`url(#wl${uid})`} />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={-200 + ((i * 197 + t * 20) % 1500)} y={shore + 40 + (i % 5) * 60} width={120 + (i % 3) * 60} height={4} fill="rgba(255,255,255,0.45)" />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <Pine key={i} x={-300 + i * 110} y={shore + 6} h={170 + (i % 3) * 40} c="#3a5a50" c2="#2c4840" />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <path key={`s${i}`} d={`M${-300 + i * 110 - 30},${shore - 80 - (i % 3) * 30} l30,-40 l30,40 Z`} fill={SNOW} opacity={0.85} />
        ))}
      </Svg>
    </Plane>
    <Plane cam={cam} depth={0.75}>
      <Svg>
        <rect x={-400} y={shore + 420} width={1880} height={1400} fill={SNOW} />
        <path d={`M-400,${shore + 420} Q540,${shore + 380} 1480,${shore + 420}`} stroke={SNOW2} strokeWidth={14} fill="none" />
        <g opacity={lodge} transform={`translate(700,${shore + 430})`}>
          <rect x={-230} y={-200} width={460} height={200} fill="#6b4a32" />
          <path d="M-270,-200 L0,-340 L270,-200 Z" fill="#4a3426" />
          <path d="M-280,-196 L0,-350 L280,-196 L260,-180 L0,-322 L-260,-180 Z" fill={SNOW} />
          {[-160, -80, 0, 80, 160].map((x) => (
            <rect key={x} x={x - 22} y={-150} width={44} height={56} fill="#ffd79a" opacity={0.6 + 0.3 * Math.sin(t * 2 + x)} />
          ))}
          <rect x={-30} y={-80} width={60} height={80} fill="#3a281c" />
        </g>
      </Svg>
    </Plane>
  </>
);

// ============ S1 HOOK WIDE: Adam's car drives into the snowy park (0 - 2.1) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 20, y: hh.y, zoom: mix(1.03, 1.1, t / 2.1), rot: hh.rot };
  const g = 1360;
  const cx = 160 + t * 220;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Road y={g} />
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <SnowCar x={cx} y={g + 205 - (cx + 400) * 0.1} s={2.2} body="#7a2f2a" shade="#5e2420" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.24} col="255,246,220" />
      <Particles seed={1981} n={18} col="#ffffff" fall={20} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Title text={"The road\nstopped at\nthe lake."} t={t} t0={0} top={110} size={140} />
    </AbsoluteFill>
  );
};

// ============ S1b CLOSE-UP: phone map in his gloved hand, pin on Logan Pass (2.1 - 3.85) ============
const S1b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.75), rot: hh.rot };
  const route = at(t, [2.3, 3.4], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1200} t={t} blur={10} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,244,225,0.8)">
          <Svg>
            <path d="M160,1920 Q240,1560 360,1360 L460,1400 Q370,1600 340,1920 Z" fill={ADAM.jacket} />
            <rect x={330} y={640} width={430} height={860} rx={50} fill="#1b1d22" />
            <rect x={354} y={668} width={382} height={804} rx={30} fill="#e8eee6" />
            <path d="M354,1180 Q500,1120 600,1150 Q680,1170 736,1120 L736,1260 Q620,1290 520,1250 Q430,1220 354,1280 Z" fill="#8fb7c9" />
            <path d="M380,900 Q470,860 560,940 Q620,990 700,900" stroke="#b7c7b0" strokeWidth={30} fill="none" />
            <path
              d="M420,1220 Q480,1120 540,1060 Q600,980 640,880"
              stroke="#c23a32"
              strokeWidth={10}
              fill="none"
              strokeDasharray="520"
              strokeDashoffset={520 * (1 - route)}
              strokeLinecap="round"
            />
            <circle cx={640} cy={862} r={22} fill="#c23a32" opacity={route} />
            <circle cx={640} cy={862} r={8} fill="#fff" opacity={route} />
            <text x={545} y={790} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={48} fill="#2a2a2a" opacity={route}>
              LOGAN PASS
            </text>
            <path d="M300,1260 q-40,-40 0,-120 l70,0 l0,160 Z" fill={ADAM.glove ?? "#2a2a2a"} />
            <path d="M790,1260 q40,-40 0,-120 l-70,0 l0,160 Z" fill={ADAM.glove ?? "#2a2a2a"} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1982} n={14} col="#ffffff" bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,242,228" cool="40,60,90" />
      <Chip text="December" t={t} t0={2.2} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: the car stops at the closed gate, Adam gets out (3.85 - 6.4) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.55), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 430, y: g + 270, scale: 2.4, walk: 0, lean: -0.04, poles: false, handOverride: [60, 20], breathe: Math.sin(t * 2) * 1.4 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={g - 80} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <Road y={g} gate gx={850} />
        <Svg>
          <SnowCar x={150} y={g + 300} s={2.0} body="#7a2f2a" shade="#5e2420" />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={ADAM} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={1983} n={22} col="#ffffff" fall={24} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,242,232" cool="40,60,90" />
      <Chip text="Going-to-the-Sun Road" t={t} t0={4.0} x={60} y={200} icon="none" big />
      <Chip text="Closed to cars in winter" t={t} t0={5.1} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: Lake McDonald and the lodge, where the plowed road ends (6.4 - 8.85) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 18, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.45), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterLake cam={cam} sky={WINTER} uid="d" shore={1100} t={t} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.26} col="255,246,220" />
      <Particles seed={1984} n={16} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Chip text="Cars stop here" t={t} t0={6.6} x={60} y={200} icon="none" big />
      <Chip text="Lake McDonald Lodge" t={t} t0={7.3} x={60} y={330} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: Adam's face by the lake, the rule (8.85 - 11.1) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.25), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 540, y: 1700 + 182 * s - 80, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 1.4) * 1.6 };
  return (
    <AbsoluteFill>
      <WinterLake cam={cam} sky={WINTER} uid="e" shore={1200} t={t} lodge={0} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={ADAM} expression="happy" />
          <Breath p={p} t={t * 0.6} />
        </Subject>
      </Plane>
      <Particles seed={1985} n={18} col="#ffffff" fall={20} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" vignette={0.6} />
      <Chip text="The rule" t={t} t0={8.95} x={60} y={200} icon="none" big />
      <Chip text="Plan winter Glacier" t={t} t0={9.6} x={60} y={330} icon="none" big />
      <Chip text="around the lake" t={t} t0={10.4} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: on foot past the gate, up the snowy closed road (11.1 - 13.3) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 26, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.2), rot: hh.rot };
  const g = 1440;
  const ph = t * 3;
  const x = 240 + lt * 150;
  const p: HikerProps = { x, y: g + 280 - (x + 400) * 0.1, scale: 2.4, phase: ph, walk: 0.7, lean: 0.07, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 30} width={1880} height={1400} fill={SNOW} />
          <path d={`M-400,${g + 60} L1480,${g - 10} L1480,${g + 120} L-400,${g + 300} Z`} fill="#eef2f4" />
          {Array.from({ length: 12 }, (_, i) => {
            const xx = -380 + i * 80;
            return <ellipse key={i} cx={xx} cy={g + 240 - (xx + 400) * 0.1 + (i % 2) * 18} rx={18} ry={7} fill="#c3cfd6" opacity={xx < x - 60 ? 1 : 0} />;
          })}
        </Svg>
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={ADAM} expression="happy" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,246,220" />
      <Particles seed={1986} n={16} col="#ffffff" bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Chip text="The closed road, on foot" t={t} t0={11.6} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/glacier-national-park-trip-planning-guide.jpg"
      photoH={800}
      spec="30 PAGES · 12 DAY HIKES · MI + KM"
      name={
        <>
          Glacier National Park
          <br />
          Trip Planning Guide
        </>
      }
      nameSize={74}
      price="$9.99"
      save="Save this before your Glacier trip"
    />
  );
};

export const V198: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.18} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.1} to={3.93} fadeIn={0.06} fadeOut={0.08}>
      <S1b off={2.1} />
    </Scene>
    <Scene from={3.85} to={6.48} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.85} />
    </Scene>
    <Scene from={6.4} to={8.93} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={6.4} />
    </Scene>
    <Scene from={8.85} to={11.18} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={8.85} />
    </Scene>
    <Scene from={11.1} to={13.4} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={11.1} />
    </Scene>
    <Scene from={13.3} to={17.6} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.85, 1600],
        [3.85, 8.85, 1600],
        [8.85, 13.3, 1600],
      ]}
    />
  </AbsoluteFill>
);
