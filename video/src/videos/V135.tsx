// V135: "Her road into Yosemite was closed until spring." in the cinematic C01 style, Yosemite in winter. Story for the
// Yosemite National Park Trip Planning Guide ($9.99, live Shopify). Facts as NPS gives them: Tioga Road (the high road over
// Tioga Pass, the only way in from the east) closes for winter, usually from November until late spring; in winter come in
// from the west, carry tire chains, and check road status on nps.gov the morning you go; Yosemite Valley is open all year.
// Map is a simple hand-drawn diagram, not an official map. Phone UI is generic (no NPS logo or branding).
// End card = real Shopify cover (products/yosemite-national-park-trip-planning-guide.jpg, boxed photo card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, Haze, handheld, Particles, Plane, Rays, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { Desk, INK, PAPER } from "../trip";
import { DAWN, FrostTrail, SNOW, SNOW2, SnowWoods, WINTER, WinterBackdrop } from "../winter";
import { SnowCar } from "../icy";
import vo from "../vo/v135.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const VALLEY: Sky = { top: "#4a74a0", mid: "#b4c8da", low: "#f1efe8", sun: [820, 500], sunR: 46, sunCol: "#fffdf2", glow: "#f3efe0" };
const LAMP = "255,214,170";
const RED = "#c23a32";
const GREEN = "#2f8a55";

const LENA: Outfit = {
  ...JAKE,
  skin: "#C98E6A",
  skinShade: "#AA7150",
  hair: "#2a1a12",
  ponytail: "#2a1a12",
  beard: null,
  cap: "#B83A55",
  capShade: "#8E2B42",
  jacket: "#E3B23C",
  jacketShade: "#b88d26",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#3E4F5C",
  packShade: "#2C3943",
  glove: "#2a2a2a",
};

// Road over the pass, ending at a locked winter gate with deep snow beyond.
const GateRoad: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y - 30} width={1880} height={1400} fill={SNOW2} />
    <path d={`M300,${y - 30} L780,${y - 30} L1300,2300 L-300,2300 Z`} fill="#5c6166" />
    <path d={`M536,${y - 30} L544,${y - 30} L620,2300 L560,2300 Z`} fill="#e9d36a" />
    <path d={`M200,${y - 30} Q540,${y - 150} 900,${y - 30} Z`} fill={SNOW} />
    <g transform={`translate(560,${y + 80})`}>
      <rect x={-330} y={-130} width={26} height={130} fill="#6a6a6a" />
      <rect x={304} y={-130} width={26} height={130} fill="#6a6a6a" />
      <rect x={-330} y={-130} width={660} height={30} rx={8} fill="#f4f4f4" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={-310 + i * 94} y={-130} width={46} height={30} fill={RED} />
      ))}
      <rect x={-12} y={-112} width={24} height={30} rx={4} fill="#3a3a3a" />
      <path d="M-8,-112 q8,-18 16,0" stroke="#3a3a3a" strokeWidth={5} fill="none" />
      <rect x={-160} y={-270} width={320} height={110} rx={10} fill={RED} />
      <text x={0} y={-200} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={56} fill="#fff" letterSpacing={3}>
        ROAD CLOSED
      </text>
      <rect x={-8} y={-160} width={16} height={30} fill="#6a6a6a" />
    </g>
  </Svg>
);

// Hand-drawn diagram (screen coords). east / west = route draw 0..1, closed = red X on the pass.
const MapSketch: React.FC<{ east: number; closed: number; west: number; valley: number }> = ({ east, closed, west, valley }) => {
  const label = (x: number, y: number, s: string, size = 34, col = INK, anchor: "start" | "middle" | "end" = "middle") => (
    <text x={x} y={y} textAnchor={anchor} fontFamily={HEAD} fontWeight={800} fontSize={size} fill={col} letterSpacing={2}>
      {s}
    </text>
  );
  const EAST = "M960,700 Q880,690 820,640 Q700,560 600,700 Q520,820 380,900";
  const WEST = "M110,1040 Q220,1000 260,960 Q300,920 360,906";
  return (
    <g>
      <g transform="rotate(-2 540 900)">
        <rect x={100} y={420} width={880} height={900} rx={12} fill={PAPER} />
        <rect x={100} y={420} width={880} height={900} rx={12} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={4} />
        {/* peaks around the pass */}
        {[
          [700, 560, 70],
          [820, 590, 56],
          [600, 610, 50],
          [900, 610, 44],
        ].map(([x, y, h], i) => (
          <path key={i} d={`M${x - h},${y} L${x},${y - h * 1.3} L${x + h},${y} Z`} fill="#c9c3b4" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        ))}
        {/* valley walls */}
        <path d="M300,880 Q340,820 400,860 Q450,830 480,880" stroke={INK} strokeWidth={5} fill="none" />
        <path d="M300,950 Q360,1000 470,950" stroke={INK} strokeWidth={5} fill="none" />
        {/* routes */}
        <path d={EAST} stroke={INK} strokeWidth={10} fill="none" strokeDasharray="1 0" pathLength={1} strokeDashoffset={0} opacity={0.18} />
        <path d={EAST} stroke={INK} strokeWidth={10} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - east} strokeLinecap="round" />
        <path d={WEST} stroke={INK} strokeWidth={10} fill="none" opacity={0.18} />
        <path d={WEST} stroke={GREEN} strokeWidth={14} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - west} strokeLinecap="round" />
        {/* valley dot */}
        <circle cx={385} cy={912} r={16 + valley * 6} fill={valley > 0 ? GREEN : INK} />
        {label(390, 1060, "YOSEMITE VALLEY", 38)}
        {label(760, 462, "TIOGA PASS", 34)}
        {label(950, 760, "EAST", 32, INK, "end")}
        {label(130, 1110, "WEST", 32, INK, "start")}
        {/* closed X on the high road */}
        {closed > 0 && (
          <g transform={`translate(710,600) scale(${mix(1.6, 1, closed)})`} opacity={closed}>
            <circle r={58} fill="rgba(194,58,50,0.15)" />
            <path d="M-38,-38 L38,38 M38,-38 L-38,38" stroke={RED} strokeWidth={16} strokeLinecap="round" />
          </g>
        )}
      </g>
    </g>
  );
};

// Close-up of a car tyre (screen coords) with snow chains appearing (k 0..1).
const ChainTire: React.FC<{ x: number; y: number; r: number; k: number; t: number }> = ({ x, y, r, k, t }) => (
  <g transform={`translate(${x},${y})`}>
    {/* fender */}
    <path d={`M${-r * 1.6},${-r * 0.2} Q${-r * 1.4},${-r * 1.35} 0,${-r * 1.35} Q${r * 1.4},${-r * 1.35} ${r * 1.6},${-r * 0.2} L${r * 2.4},${-r * 0.2} L${r * 2.4},${-r * 2.6} L${-r * 2.4},${-r * 2.6} L${-r * 2.4},${-r * 0.2} Z`} fill="#7a4f6e" />
    <path d={`M${-r * 1.6},${-r * 0.2} Q${-r * 1.4},${-r * 1.35} 0,${-r * 1.35} Q${r * 1.4},${-r * 1.35} ${r * 1.6},${-r * 0.2}`} stroke="#5f3c55" strokeWidth={18} fill="none" />
    <circle r={r * 1.18} fill="#15181a" />
    <circle r={r} fill="#1f2222" />
    <circle r={r * 0.62} fill="#9aa3a6" />
    <circle r={r * 0.5} fill="#7d878b" />
    {Array.from({ length: 5 }, (_, i) => {
      const a = (i / 5) * Math.PI * 2;
      return <circle key={i} cx={Math.cos(a) * r * 0.3} cy={Math.sin(a) * r * 0.3} r={r * 0.05} fill="#c9d0d3" />;
    })}
    {/* snow on the tyre */}
    <path d={`M${-r * 1.18},${r * 0.2} Q0,${r * 1.5} ${r * 1.18},${r * 0.2} L${r * 1.18},${r * 1.4} L${-r * 1.18},${r * 1.4} Z`} fill="rgba(240,246,250,0.35)" />
    {k > 0 && (
      <g opacity={k} transform={`rotate(${t * 4})`}>
        <circle r={r * 0.82} fill="none" stroke="#c9d0d3" strokeWidth={14} strokeDasharray="22 10" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <line key={i} x1={Math.cos(a) * r * 0.82} y1={Math.sin(a) * r * 0.82} x2={Math.cos(a) * r * 1.2} y2={Math.sin(a) * r * 1.2} stroke="#d9dfe2" strokeWidth={14} strokeDasharray="14 8" strokeLinecap="round" />
          );
        })}
      </g>
    )}
  </g>
);

// Phone with a generic road status page (screen coords centre).
const StatusPhone: React.FC<{ x: number; y: number; s?: number; k: number; rot?: number }> = ({ x, y, s = 1, k, rot = 0 }) => {
  const row = (i: number, name: string, state: string, col: string) => (
    <g key={i} opacity={at(k, [0.15 + i * 0.25, 0.35 + i * 0.25], [0, 1])}>
      <rect x={-150} y={-120 + i * 120} width={300} height={100} rx={16} fill="#f3f1ec" />
      <text x={-130} y={-62 + i * 120} fontFamily="Inter" fontWeight={700} fontSize={28} fill="#22302a">
        {name}
      </text>
      <rect x={30} y={-92 + i * 120} width={104} height={44} rx={22} fill={col} />
      <text x={82} y={-62 + i * 120} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={22} fill="#fff">
        {state}
      </text>
    </g>
  );
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-190} y={-380} width={380} height={760} rx={50} fill="#1d2126" />
      <rect x={-170} y={-350} width={340} height={700} rx={30} fill="#ffffff" />
      <rect x={-150} y={-320} width={300} height={50} rx={25} fill="#eceae4" />
      <text x={0} y={-286} textAnchor="middle" fontFamily="Inter" fontWeight={600} fontSize={26} fill="#555">
        nps.gov
      </text>
      <text x={-150} y={-190} fontFamily={HEAD} fontWeight={800} fontSize={54} fill="#22302a">
        ROAD STATUS
      </text>
      <text x={-150} y={-150} fontFamily="Inter" fontWeight={500} fontSize={22} fill="#777">
        Today, 7:10 AM
      </text>
      {row(0, "Tioga Road", "CLOSED", RED)}
      {row(1, "Valley roads", "OPEN", GREEN)}
      {row(2, "Chains", "CARRY", "#b8862c")}
      <rect x={-50} y={318} width={100} height={8} rx={4} fill="rgba(0,0,0,0.3)" />
    </g>
  );
};

// Winter Yosemite Valley: granite walls, a waterfall, snowy pines (falls = waterfall strength, near = closer cliff).
const GraniteValley: React.FC<{ cam: Cam; sky: Sky; uid: string; floorY: number; t: number; near?: boolean }> = ({ cam, sky, uid, floorY, t, near }) => (
  <>
    <Plane cam={cam} depth={0.04}>
      <SkyPlane sky={sky} uid={uid} />
    </Plane>
    <Plane cam={cam} depth={0.16} blur={2.4}>
      <Svg>
        {/* left granite wall with the falls */}
        <path d={`M-300,${floorY - 60} L-300,${floorY - 1040} Q-60,${floorY - 1120} 200,${floorY - 1060} Q330,${floorY - 1000} 380,${floorY - 800} L470,${floorY - 60} Z`} fill="#9aa1a8" />
        <path d={`M-300,${floorY - 1040} Q-60,${floorY - 1120} 200,${floorY - 1060} Q120,${floorY - 1030} -300,${floorY - 990} Z`} fill="#f4f6f8" />
        <path d={`M200,${floorY - 1060} Q330,${floorY - 1000} 380,${floorY - 800} L420,${floorY - 500} Q330,${floorY - 820} 200,${floorY - 1060} Z`} fill="#c9cdd1" />
        {/* dome on the right */}
        <path d={`M560,${floorY - 60} L600,${floorY - 640} Q700,${floorY - 1000} 920,${floorY - 960} Q1080,${floorY - 900} 1100,${floorY - 700} L1380,${floorY - 60} Z`} fill="#a3a9af" />
        <path d={`M700,${floorY - 880} Q800,${floorY - 1000} 920,${floorY - 960} Q980,${floorY - 940} 1010,${floorY - 900} Q860,${floorY - 930} 700,${floorY - 880} Z`} fill="#f4f6f8" />
        <path d={`M920,${floorY - 960} Q1080,${floorY - 900} 1100,${floorY - 700} L1160,${floorY - 500} Q1000,${floorY - 800} 920,${floorY - 960} Z`} fill="#9da3a9" />

      </Svg>
    </Plane>
    <Haze y={floorY - 500} h={380} col={sky.low} opacity={0.5} />
    {near && (
      <Plane cam={cam} depth={0.32} blur={1.2}>
        <Svg>
          <path d={`M60,${floorY + 20} L120,${floorY - 900} Q400,${floorY - 980} 700,${floorY - 900} L760,${floorY + 20} Z`} fill="#a3a9ae" />
          <path d={`M120,${floorY - 900} Q400,${floorY - 980} 700,${floorY - 900} Q400,${floorY - 930} 120,${floorY - 860} Z`} fill="#f4f6f8" />
          <path d={`M300,${floorY - 900} L520,${floorY - 900} L500,${floorY - 300} L320,${floorY - 300} Z`} fill="#8e959b" />
          <path d={`M370,${floorY - 920} L450,${floorY - 920} Q470,${floorY - 600} 470,${floorY - 280} L350,${floorY - 280} Q352,${floorY - 600} 370,${floorY - 920} Z`} fill="#f4f8fb" opacity={0.92} />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${375 + i * 22},${floorY - 900} q6,320 ${-2},610`} stroke="#c9dbe6" strokeWidth={5} fill="none" opacity={0.7} strokeDasharray="70 50" strokeDashoffset={-t * 160 - i * 37} />
          ))}
          <ellipse cx={410} cy={floorY - 270} rx={150} ry={46} fill="#ffffff" opacity={0.75} />
          <ellipse cx={410} cy={floorY - 260} rx={220} ry={60} fill="#dfe9ef" opacity={0.5} />
        </Svg>
      </Plane>
    )}
    <Plane cam={cam} depth={0.55} blur={0.8}>
      <SnowWoods y={floorY - 120} shift={cam.x * 0.2} snow={1} />
    </Plane>
  </>
);

// ============ S1 HOOK WIDE: Lena at a locked gate on the snowy high road (0 - 3.54) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.1, t / 3.54), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 250, y: g + 280, scale: 2.3, walk: 0, lean: -0.04, poles: false, handOverride: [30, 20], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <GateRoad y={g} />
        <Svg>
          <SnowCar x={900} y={g + 330} s={2.0} flip body="#7a4f6e" shade="#5f3c55" />
        </Svg>
        <Subject rimX={6} col="rgba(240,246,255,0.85)">
          <Person {...p} outfit={LENA} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" />
      </Plane>
      <Particles seed={1351} n={24} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="245,244,236" cool="40,60,90" />
      <Title text={"Her road into\nYosemite was\nclosed until spring."} t={t} t0={0} top={100} size={112} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the plan on paper: in from the east over Tioga Pass (3.54 - 6.68) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3, at(t, [6.1, 6.2, 6.6], [0, 1, 0]) * 2.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.14), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <MapSketch east={at(t, [3.6, 5.3], [0, 1])} closed={at(t, [6.1, 6.4], [0, 1], outExpo)} west={0} valley={0} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1352} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Chip text="From the east" t={t} t0={3.6} x={60} y={200} icon="none" big />
      <Chip text="Locked gate" t={t} t0={6.1} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: at the gate, snow falling: the high road is shut for the season (6.68 - 11.64) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y + 260, zoom: mix(1.18, 1.24, lt / 4.96), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 240, y: g + 120, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [26, -40], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <GateRoad y={g} />
        <Subject rimX={6} col="rgba(240,246,255,0.85)">
          <Person {...p} outfit={LENA} expression="tired" />
        </Subject>
      </Plane>
      <Particles seed={1353} n={30} col="#ffffff" fall={22} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="240,242,236" cool="40,60,90" />
      <Chip text="Tioga Road: closed for winter" t={t} t0={7.0} x={60} y={200} icon="x" big />
      <Chip text="Usually November to late spring" t={t} t0={9.28} x={60} y={330} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the fix: in winter, come in from the west (11.64 - 15.29) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.65), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <MapSketch east={1} closed={1} west={at(t, [13.6, 15.0], [0, 1])} valley={at(t, [14.9, 15.2], [0, 1])} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1354} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={12.75} top={200} size={124} />
      <Chip text="In winter" t={t} t0={12.8} x={60} y={200} icon="none" big />
      <Chip text="Drive in from the west" t={t} t0={13.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: tire chains in the car (15.29 - 16.77) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.48), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={1150} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={1300} width={1880} height={1000} fill={SNOW} />
          <rect x={-400} y={1360} width={1880} height={1000} fill={SNOW2} />
        </Svg>
        <Subject rimX={5} col="rgba(240,246,255,0.8)">
          <Svg>
            <ChainTire x={540} y={1080} r={230} k={at(t, [15.6, 16.1], [0, 1], outExpo)} t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1355} n={22} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="245,244,236" cool="40,60,90" vignette={0.5} />
      <Chip text="Carry tire chains" t={t} t0={15.6} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: morning, phone in her hand: road status on nps.gov (16.77 - 20.39) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.62), rot: hh.rot };
  const up = at(t, [16.8, 17.3], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="f" treeY={1200} t={t} blur={14} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,190,0.8)">
          <Svg>
            <g transform={`translate(0,${(1 - up) * 500})`}>
              {/* sleeve + glove holding the phone */}
              <path d="M490,1460 L700,1460 L710,1560 L480,1560 Z" fill="#2a2a2a" />
              <path d="M480,1560 L710,1560 L740,1900 L450,1900 Z" fill={LENA.jacket} />
              <StatusPhone x={560} y={1000} s={1.05} k={at(t, [17.2, 19.2], [0, 1])} rot={-3} />
              <path d="M380,1300 Q370,1420 480,1470 L690,1470 Q770,1410 750,1300 Q720,1380 650,1395 L490,1395 Q420,1380 380,1300 Z" fill={LENA.glove ?? "#2a2a2a"} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1356} n={12} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={300} sunY={760} warm="255,226,190" vignette={0.5} />
      <Chip text="Check road status" t={t} t0={16.77} x={60} y={200} icon="check" big />
      <Chip text="The morning you go" t={t} t0={18.97} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 WIDE: Yosemite Valley in winter, open, her car on the valley road (20.39 - 22.89) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.5), rot: hh.rot };
  const g = 1500;
  return (
    <AbsoluteFill>
      <GraniteValley cam={cam} sky={VALLEY} uid="g" floorY={g} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 20} width={1880} height={1400} fill={SNOW} />
          <path d={`M-400,${g + 120} Q540,${g + 60} 1480,${g + 130} L1480,${g + 230} Q540,${g + 160} -400,${g + 220} Z`} fill="#5c6166" />
          <SnowCar x={mix(-100, 620, lt / 2.5)} y={g + 210} s={1.8} body="#7a4f6e" shade="#5f3c55" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="left" />
      </Plane>
      <Rays x={VALLEY.sun[0]} y={VALLEY.sun[1]} strength={0.3} col="255,246,226" />
      <Particles seed={1357} n={16} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={820} sunY={500} warm="250,244,232" cool="40,60,90" />
      <Chip text="Yosemite Valley" t={t} t0={20.4} x={60} y={200} icon="none" big />
      <Chip text="Open all year" t={t} t0={21.7} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF MEDIUM: next day, Lena walks to Lower Yosemite Fall in fresh snow (22.89 - 26.75) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1560;
  const ph = t * 2.6;
  const p: HikerProps = { x: 560 + lt * 30, y: g + 40, scale: 2.4, phase: ph, walk: 0.55, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <GraniteValley cam={cam} sky={VALLEY} uid="h" floorY={g - 40} t={t} near />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={-6} col="rgba(255,240,210,0.9)">
          <Person {...p} outfit={LENA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24402e" side="right" />
      </Plane>
      <Rays x={820} y={420} strength={0.4} col="255,240,214" />
      <Particles seed={1358} n={26} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={460} warm="255,238,210" />
      <Readout label="NEXT DAY" value="Lower Yosemite Fall" ok={true} t={t} t0={23.0} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/yosemite-national-park-trip-planning-guide.jpg"
      photoH={800}
      spec="30 PAGES · 16 DAY HIKES · WHEN TO GO"
      name={
        <>
          Yosemite Trip
          <br />
          Planning Guide
        </>
      }
      nameSize={104}
      price="$9.99"
      save="Save this before your Yosemite trip"
    />
  );
};

export const V135: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.59} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.54} to={6.73} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.54} />
    </Scene>
    <Scene from={6.68} to={11.69} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.68} />
    </Scene>
    <Scene from={11.64} to={15.34} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={11.64} />
    </Scene>
    <Scene from={15.29} to={16.82} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={15.29} />
    </Scene>
    <Scene from={16.77} to={20.44} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={16.77} />
    </Scene>
    <Scene from={20.39} to={22.94} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={20.39} />
    </Scene>
    <Scene from={22.89} to={26.5} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={22.89} />
    </Scene>
    <Scene from={26.35} to={30.0} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.54, 1600],
        [3.54, 6.68, 1660],
        [6.68, 11.64, 1600],
        [11.64, 15.29, 1660],
        [15.29, 16.77, 1660],
        [16.77, 20.39, 1660],
        [20.39, 22.89, 1600],
        [22.89, 26.35, 1600],
      ]}
    />
  </AbsoluteFill>
);
