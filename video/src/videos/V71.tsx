// V71: "His dad said hiking wasn't for him" in the cinematic C01 style. Launch video 2 for the Hike Together Gift Coupons (p07).
// Product facts from the live Shopify listing: hot chocolate after and I drive coupons, plan-the-hike page (distance, turnaround time,
// weather check), 44 coupons, $5.99. No Black Friday wording, no other prices.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import { Boots, Coupon, Mug, Room, SofaBack, SofaFront, WindowView } from "../home";
import vo from "../vo/v71.json";

const words = vo.words as unknown as Word[];

const COLD: Sky = { top: "#4d6a86", mid: "#a9bac4", low: "#e6e3d4", sun: [790, 600], sunR: 46, sunCol: "#fbf7ea", glow: "#f1ecd8" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };
const LAMP = "255,200,140";

// Indoors: sweaters, no packs, cap drawn in the hair colour.
const DAD: Outfit = { ...GUIDE, hair: "#9a958e", beard: "#9a958e", cap: "#9a958e", capShade: "#7d7871", jacket: "#7a4a3a", jacketShade: "#5e392c", pants: "#4b4f55", pantsShade: "#383b40", glove: null };
const SAM: Outfit = { ...JAKE, skin: "#C98E6E", skinShade: "#AA7254", hair: "#2a1d15", beard: null, cap: "#2a1d15", capShade: "#1b120c", jacket: "#3E5F7A", jacketShade: "#2E475C", pants: "#3f444b", pantsShade: "#2e3238", glove: null };
// Outdoors: warm layers for a cold easy loop.
const DAD_W: Outfit = { ...DAD, jacket: "#3E5F4B", jacketShade: "#2E4A39", cap: "#B83A55", capShade: "#8E2B42", pack: "#5B6B3A", packShade: "#46542C", boot: "#5a3e2a", sole: "#1d1916" };
const SAM_W: Outfit = { ...SAM, jacket: "#C2662E", jacketShade: "#9B4E20", cap: "#2C3B2E", capShade: "#1B2620", pack: "#3E4F5C", packShade: "#2C3943", boot: "#5a3e2a", sole: "#1d1916" };

const SOFA = "#6f8a8f";
const SOFA2 = "#566e73";

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

const Table: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y} width={1880} height={1600} fill="#9b6d48" />
    {Array.from({ length: 12 }, (_, i) => (
      <path key={i} d={`M-400,${y + 40 + i * 110} Q300,${y + 20 + i * 110} 1480,${y + 50 + i * 110}`} stroke="rgba(80,50,30,0.25)" strokeWidth={4} fill="none" />
    ))}
    <rect x={-400} y={y} width={1880} height={16} fill="rgba(255,240,220,0.25)" />
  </Svg>
);

// Lake world: sky, snowy far ridge, haze, forest ridge, pines, lake with reflections.
const Pines: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 11 }, (_, i) => {
      const x = ((((-100 + i * 170 - shift) % 1870) + 1870) % 1870) - 300;
      return <Pine key={i} x={x} y={y + (i % 2) * 16} h={300 + (i % 3) * 70} c={i % 4 === 1 ? "#b98a3a" : "#3b6550"} c2={i % 4 === 1 ? "#94702e" : "#2b4d3c"} />;
    })}
  </Svg>
);

const Lake: React.FC<{ y: number; h: number; t: number; sky: Sky }> = ({ y, h, t, sky }) => (
  <Svg>
    <defs>
      <linearGradient id={`lk${y}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={sky.mid} />
        <stop offset="1" stopColor="#3f6378" />
      </linearGradient>
    </defs>
    <rect x={-400} y={y} width={1880} height={h} fill={`url(#lk${y})`} />
    <ellipse cx={sky.sun[0]} cy={y + 30} rx={60} ry={10} fill={sky.sunCol} opacity={0.6} />
    {Array.from({ length: 12 }, (_, i) => {
      const x = ((((i * 160 + t * 20) % 1800) + 1800) % 1800) - 360;
      return <path key={i} d={`M${x},${y + 20 + (i % 5) * (h / 6)} h${60 + (i % 3) * 40}`} stroke="#eaf3f6" strokeWidth={4} opacity={0.5} strokeLinecap="round" />;
    })}
  </Svg>
);

const LakeBackdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; y: number; blur?: number; t: number }> = ({ cam, sky, uid, y, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={4} drift={t * 12} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2.5 + blur}>
      <Ridge seed={19} base={y - 380} amp={340} scale={240} col="#9aa9b8" lit="#ffffff" peak={120} />
    </Plane>
    <Haze y={y - 500} h={340} col={sky.low} opacity={0.7} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={31} base={y - 200} amp={200} scale={170} col="#6f8577" />
    </Plane>
    <Plane cam={cam} depth={0.45} blur={1.2 + blur}>
      <Pines y={y - 120} shift={cam.x * 0.15} />
    </Plane>
    <Plane cam={cam} depth={0.5} blur={1 + blur}>
      <Lake y={y - 120} h={260} t={t} sky={sky} />
    </Plane>
  </>
);

const Shore: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y - 40} Q540,${y - 70} 1480,${y - 40} L1480,2600 L-400,2600 Z`} fill="#8c8458" />
    <path d={`M-400,${y - 6} Q540,${y - 24} 1480,${y - 6} L1480,${y + 60} Q540,${y + 44} -400,${y + 60} Z`} fill="#b5a079" />
    {Array.from({ length: 14 }, (_, i) => (
      <path key={i} d={`M${-360 + i * 140},${y - 44} l-8,-30 m8,30 l6,-36 m-6,36 l14,-24`} stroke="#6f7040" strokeWidth={5} strokeLinecap="round" />
    ))}
    {Array.from({ length: 8 }, (_, i) => (
      <ellipse key={`f${i}`} cx={-200 + i * 220} cy={y + 200 + (i % 3) * 80} rx={90} ry={12} fill="#7a7349" />
    ))}
  </Svg>
);

// ============ S1 HOOK WIDE: dad on the sofa, hiking boots by the door (0 - 2.86) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: t * 10 + hh.x, y: hh.y, zoom: mix(1.03, 1.1, t / 2.86), rot: hh.rot };
  const floorY = 1520;
  const seat = 1110;
  const s = 2.3;
  const shake = Math.sin(t * 9) * 5 * at(t, [0.8, 1.1, 2.4, 2.7], [0, 1, 1, 0]);
  const p: HikerProps = { x: 640, y: seat + 182 * s, scale: s, walk: 0, lean: -0.08, poles: false, handOverride: [40, 30], breathe: Math.sin(t * 2) * 1.5 };
  const g = hikerGeometry(p);
  const neck = [p.x - g.sh[0] * s, seat + g.sh[1] * s];
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={560} y={360} w={440} h={520} sky={COLD} uid="a" />
        <Room floorY={floorY} win={[560, 360, 440, 520]} lamp={[200, 500]} />
        <Svg>
          {/* front door on the left with the boots waiting by it */}
          <rect x={-60} y={520} width={320} height={1000} fill="#6b4a33" />
          <rect x={-30} y={560} width={260} height={940} fill="#7d573c" />
          <circle cx={200} cy={1060} r={14} fill="#c9a776" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <Boots x={150} y={1560} s={1.1} />
        </Svg>
        <SofaBack x={440} y={seat} w={600} col={SOFA} shade={SOFA2} />
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <g transform={`rotate(${shake} ${neck[0]} ${neck[1]})`}>
            <Person {...p} outfit={DAD} expression="neutral" noPack flip />
          </g>
        </Subject>
        <SofaFront x={440} y={seat} w={600} col={SOFA} shade={SOFA2} floorY={floorY + 10} />
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={300} />
      </Plane>
      <Rays x={800} y={560} strength={0.12} col="255,236,200" />
      <Particles seed={80} n={18} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={560} warm={LAMP} cool="40,40,60" />
      <Title text={"His dad said\nhiking wasn't\nfor him"} t={t} t0={0} top={130} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: dad shaking his head (2.86 - 4.9) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.04), rot: hh.rot };
  const s = 4.4;
  const seat = 1500;
  const p: HikerProps = { x: 560, y: seat + 182 * s, scale: s, walk: 0, lean: 0.0, poles: false, handOverride: [40, 30], breathe: Math.sin(t * 2) * 1.2 };
  const g = hikerGeometry(p);
  const neck = [p.x - g.sh[0] * s, seat + g.sh[1] * s];
  const shake = Math.sin(t * 8) * 2.5;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={8}>
        <WindowView x={520} y={200} w={600} h={700} sky={COLD} uid="b" />
        <Room floorY={1900} win={[520, 200, 600, 700]} lamp={[150, 400]} />
        <Svg>
          <rect x={-200} y={1060} width={1500} height={1000} rx={90} fill={SOFA2} />
          <rect x={-160} y={1100} width={620} height={900} rx={70} fill={SOFA} />
          <rect x={500} y={1100} width={700} height={900} rx={70} fill={SOFA} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,236,200,0.85)">
          <g transform={`rotate(${shake} ${neck[0]} ${neck[1]})`}>
            <Person {...p} outfit={DAD} expression="neutral" noPack flip />
          </g>
        </Subject>
        <Svg>
          <rect x={-200} y={1540} width={1500} height={500} rx={60} fill={SOFA} />
          <rect x={-200} y={1540} width={1500} height={24} rx={12} fill="rgba(255,255,255,0.18)" />
        </Svg>
      </Plane>
      <Particles seed={81} n={12} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={400} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Chip text="Too long" t={t} t0={2.92} x={80} y={1080} icon="x" big />
      <Chip text="Too steep" t={t} t0={3.46} x={80} y={1200} icon="x" big />
      <Chip text="Too cold" t={t} t0={4.0} x={80} y={1320} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: Sam hands him a coupon (4.9 - 8.94) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: at(lt, [0, 2], [-50, 0]) + hh.y, zoom: at(lt, [0, 3], [1.1, 1.02]), rot: hh.rot };
  const floorY = 1540;
  const seat = 1140;
  const reach = at(t, [7.3, 7.9], [0, 1], outExpo);
  const sam: HikerProps = { x: 300, y: floorY, scale: 2.3, walk: 0, lean: 0.06 + reach * 0.06, poles: false, handOverride: [mix(30, 100, reach), mix(30, -20, reach)], breathe: Math.sin(t * 2.2) * 2 };
  const dad: HikerProps = { x: 800, y: seat + 182 * 2.2, scale: 2.2, walk: 0, lean: -0.04, poles: false, handOverride: [40, 30], breathe: Math.sin(t * 2) * 1.5 };
  const hand = hikerGeometry(sam).arms[1].hand;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={3}>
        <WindowView x={480} y={330} w={420} h={520} sky={COLD} uid="c" />
        <Room floorY={floorY} win={[480, 330, 420, 520]} lamp={[160, 500]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <SofaBack x={600} y={seat} w={560} col={SOFA} shade={SOFA2} />
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...dad} outfit={DAD} expression={t > 8.0 ? "happy" : "neutral"} noPack flip />
        </Subject>
        <SofaFront x={600} y={seat} w={560} col={SOFA} shade={SOFA2} floorY={floorY + 10} />
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...sam} outfit={SAM} expression="happy" noPack />
          <g transform={hikerTransform(sam)}>
            <Coupon x={hand[0] + 40} y={hand[1] - 16} w={110} rot={-8} title="HIKE TOGETHER" lines={["One short hike"]} k={1} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24402e" side="left" top={300} />
      </Plane>
      <Rays x={760} y={560} strength={0.12} col="255,236,200" />
      <Particles seed={82} n={14} col="#ffe8c0" fall={8} />
      <Grade sunX={760} sunY={560} warm={LAMP} cool="40,40,60" />
      <Title text={"Stop asking.\nGive a coupon."} t={t} t0={off + 0.1} top={160} size={140} />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the coupon and the hot chocolate (8.94 - 12.24) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.3), rot: hh.rot };
  const k = at(t, [9.0, 9.6], [0, 1]) + at(t, [9.9, 10.6], [0, 1]) + at(t, [11.2, 11.8], [0, 1]);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.5} blur={10}>
        <WindowView x={520} y={0} w={560} h={640} sky={COLD} uid="d" />
        <Room floorY={1900} win={[520, 0, 560, 640]} lamp={[150, 300]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Table y={720} />
        <Svg>
          <g transform="rotate(-4 520 1080)">
            <Coupon x={520} y={1080} w={860} title="HIKE TOGETHER COUPON" lines={["One short hike", "Hot chocolate after", "Sam drives"]} k={k} />
          </g>
          <Mug x={860} y={820} s={1.15} t={t} />
        </Svg>
      </Plane>
      <Particles seed={83} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={300} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Chip text="His coupon" t={t} t0={9.05} x={80} y={230} big />
    </AbsoluteFill>
  );
};

// Trail map card: lake, an easy loop around it, start marker.
const MapCard: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const k = at(t, [t0, t0 + 1.0], [0, 1]);
  return (
    <g>
      <rect x={110} y={430} width={860} height={940} rx={20} fill="rgba(0,0,0,0.25)" transform="translate(14,18)" />
      <rect x={110} y={430} width={860} height={940} rx={20} fill="#efe9d8" />
      <path d="M150,470 Q400,520 600,460 Q800,420 930,520 L930,1330 L150,1330 Z" fill="#cfdcb8" />
      <path d="M180,900 Q260,760 420,780 Q560,700 700,800 Q860,860 820,1000 Q760,1120 560,1110 Q380,1140 260,1080 Q160,1020 180,900 Z" fill="#8fb8cc" />
      {Array.from({ length: 6 }, (_, i) => (
        <Pine key={i} x={200 + i * 140} y={620 + (i % 2) * 40} h={110} c="#3b6550" c2="#2b4d3c" />
      ))}
      <path
        d="M150,930 Q190,700 420,720 Q600,630 760,750 Q920,850 880,1030 Q800,1190 560,1170 Q330,1200 210,1110 Q130,1040 150,930 Z"
        fill="none"
        stroke="#B83A55"
        strokeWidth={12}
        strokeDasharray="2400"
        strokeDashoffset={2400 * (1 - k)}
        strokeLinecap="round"
      />
      <circle cx={150} cy={930} r={26} fill="#2C3B2E" />
      <path d="M140,918 L164,930 L140,942 Z" fill="#fff" />
    </g>
  );
};

// ============ S5 CLOSE-UP: the plan, an easy loop (12.24 - 16.93) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: lt * -6 + hh.y, zoom: mix(1.0, 1.06, lt / 4.7), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.5} blur={10}>
        <Room floorY={1900} win={[620, -200, 500, 500]} lamp={[300, 200]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Table y={340} />
        <Svg>
          <g transform="rotate(-2 540 900)">
            <MapCard t={t} t0={13.0} />
          </g>
        </Svg>
      </Plane>
      <Particles seed={84} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={700} sunY={200} warm={LAMP} cool="40,40,60" vignette={0.5} />
      <Readout label="EASY LOOP" value="2 MI · 3.2 KM" ok={true} t={t} t0={13.2} x={80} y={150} pulseAt={13.7} />
      <Chip text="Weather checked" t={t} t0={14.6} x={80} y={1180} icon="check" big />
      <Chip text="Turnaround time set" t={t} t0={15.66} x={80} y={1300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 PAYOFF WIDE: halfway round, dad stops at the lake (16.93 - 20.1) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 26 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.04], outExpo), rot: hh.rot };
  const g = 1420;
  const stop = at(t, [18.0, 18.6], [1, 0]);
  const ph = lt * 3.2;
  const dad: HikerProps = { x: 520 + Math.min(lt, 1.3) * 50, y: g, scale: 1.8, phase: ph, walk: 0.7 * stop, lean: 0.06, poles: false, handOverride: stop > 0.1 ? freeHand(ph, 0.7 * stop) : [30, 34], breathe: Math.sin(t * 2) * 2 };
  const sam: HikerProps = { x: 230 + Math.min(lt, 1.5) * 60, y: g + 20, scale: 1.85, phase: ph + 1.3, walk: 0.7 * at(t, [18.2, 18.8], [1, 0]), lean: 0.06, poles: false, handOverride: freeHand(ph + 1.3, 0.7), breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <LakeBackdrop cam={cam} sky={GOLD} uid="f" y={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <Shore y={g} />
        <Subject rimX={6}>
          <Person {...sam} outfit={SAM_W} expression="happy" />
          <Person {...dad} outfit={DAD_W} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={85} n={24} col="#fff3d6" fall={20} />
      <Grade sunX={760} sunY={700} warm="255,190,120" />
      <Chip text="Halfway round" t={t} t0={17.0} x={80} y={240} />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: "same time next month?" (20.1 - 21.85) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.75), rot: hh.rot };
  const p: HikerProps = { x: 480, y: 1380 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.02, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <LakeBackdrop cam={cam} sky={GOLD} uid="g" y={1200} blur={8} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={7}>
          <Person {...p} outfit={DAD_W} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={86} n={20} col="#fff3d6" fall={16} />
      <Grade sunX={760} sunY={700} warm="255,190,120" vignette={0.55} />
      <Chip text="Same time next month?" t={t} t0={20.25} x={80} y={1180} icon="check" big />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/hike-together-gift-coupons-printable-trail-experience-gift-set.jpg"
      cutoutH={800}
      spec="PRINTABLE · 44 COUPONS · PRINT AT HOME"
      name={
        <>
          Hike Together
          <br />
          Gift Coupons
        </>
      }
      nameSize={100}
      price="$5.99"
      save="Save this gift idea"
    />
  );
};

export const V71: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.91} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.86} to={4.95} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.86} />
    </Scene>
    <Scene from={4.9} to={8.99} fadeIn={0.1} fadeOut={0.08}>
      <S3 off={4.9} />
    </Scene>
    <Scene from={8.94} to={12.29} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.94} />
    </Scene>
    <Scene from={12.24} to={16.98} fadeIn={0.08} fadeOut={0.1}>
      <S5 off={12.24} />
    </Scene>
    <Scene from={16.93} to={20.15} fadeIn={0.12} fadeOut={0.08}>
      <S6 off={16.93} />
    </Scene>
    <Scene from={20.1} to={21.9} fadeIn={0.08} fadeOut={0.12}>
      <S7 off={20.1} />
    </Scene>
    <Scene from={21.65} to={27} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.88, 1560],
        [2.88, 4.92, 1560],
        [4.92, 8.96, 1560],
        [8.96, 12.26, 1560],
        [12.26, 16.95, 1560],
        [16.95, 21.65, 1560],
      ]}
    />
  </AbsoluteFill>
);
