// V142: "The road to Glacier Point was closed." in the cinematic C01 style, Yosemite in December. Story for the Yosemite
// National Park Trip Planning Guide ($9.99, live Shopify). Facts as NPS gives them: in winter Glacier Point Road is usually
// closed beyond the Badger Pass ski area until late spring; Tunnel View is on the Wawona Road (Hwy 41) at the east end of the
// Wawona Tunnel and looks at El Capitan; carry tire chains in winter and check road status on nps.gov the morning you go.
// Map is a simple hand-drawn diagram, not an official map. Phone UI is generic (no NPS logo or branding).
// End card = real Shopify cover (products/yosemite-national-park-trip-planning-guide.jpg, boxed photo card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, Haze, handheld, Particles, Plane, Rays, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { Desk, INK, PAPER } from "../trip";
import { DAWN, SNOW, SNOW2, WINTER, WinterBackdrop } from "../winter";
import { SnowCar } from "../icy";
import vo from "../vo/v142.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const DUSK: Sky = { top: "#3d5a86", mid: "#d9a77e", low: "#ffd6a0", sun: [900, 760], sunR: 58, sunCol: "#fff2d6", glow: "#ffb870" };
const LAMP = "255,214,170";
const RED = "#c23a32";
const GREEN = "#2f8a55";
const CAR = "#3f6a8a";
const CAR2 = "#2c4f69";

const MARCO: Outfit = {
  ...JAKE,
  skin: "#C8916B",
  skinShade: "#A9724F",
  hair: "#1f1a16",
  beard: "#1f1a16",
  cap: "#2F4F6B",
  capShade: "#22394F",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#3F6B55",
  packShade: "#2D5141",
  glove: "#2a2a2a",
};

// Snowy road ending at a locked winter gate.
const GateRoad: React.FC<{ y: number; sign?: string }> = ({ y, sign = "ROAD CLOSED" }) => (
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
      <rect x={-160} y={-270} width={320} height={110} rx={10} fill={RED} />
      <text x={0} y={-200} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={56} fill="#fff" letterSpacing={3}>
        {sign}
      </text>
      <rect x={-8} y={-160} width={16} height={30} fill="#6a6a6a" />
    </g>
  </Svg>
);

// Close-up of the gate bar, chain and padlock, snow on top (screen coords).
const GateClose: React.FC<{ t: number; swing: number }> = ({ t, swing }) => (
  <Svg>
    <rect x={-200} y={1330} width={1500} height={900} fill={SNOW2} />
    <path d="M-200,1330 Q300,1290 700,1320 Q1000,1340 1300,1310 L1300,1360 L-200,1360 Z" fill={SNOW} />
    {/* post */}
    <rect x={760} y={760} width={110} height={640} fill="#6a6a6a" />
    <rect x={760} y={760} width={110} height={40} fill={SNOW} />
    {/* bar */}
    <g transform={`rotate(${Math.sin(t * 5) * swing * 1.2} 815 900)`}>
      <rect x={-200} y={850} width={1060} height={110} rx={20} fill="#f4f4f4" />
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={-170 + i * 170} y={850} width={84} height={110} fill={RED} />
      ))}
      <path d="M-200,852 Q300,820 860,850 L860,862 L-200,862 Z" fill={SNOW} />
      {/* chain loop */}
      {Array.from({ length: 7 }, (_, i) => (
        <ellipse key={i} cx={700 + (i % 2) * 6} cy={960 + i * 34} rx={20} ry={28} fill="none" stroke="#9aa3a6" strokeWidth={9} />
      ))}
      {/* padlock */}
      <g transform={`translate(706,${1220 + Math.sin(t * 6) * swing * 8})`}>
        <path d="M-40,-30 L-40,-70 Q0,-120 40,-70 L40,-30" stroke="#a7aeb2" strokeWidth={16} fill="none" />
        <rect x={-64} y={-40} width={128} height={120} rx={16} fill="#2f3438" />
        <rect x={-64} y={-40} width={128} height={20} rx={10} fill="#454b50" />
        <circle cx={0} cy={22} r={12} fill="#11151a" />
        <rect x={-4} y={22} width={8} height={30} fill="#11151a" />
      </g>
    </g>
  </Svg>
);

// Hand-drawn diagram (screen coords). gp = Glacier Point Road drawn, x = closed beyond Badger Pass, west = Wawona Road to Tunnel View.
const MapSketch: React.FC<{ gp: number; x: number; west: number; view: number }> = ({ gp, x, west, view }) => {
  const label = (lx: number, ly: number, s: string, size = 34, col = INK, anchor: "start" | "middle" | "end" = "middle") => (
    <text x={lx} y={ly} textAnchor={anchor} fontFamily={HEAD} fontWeight={800} fontSize={size} fill={col} letterSpacing={2}>
      {s}
    </text>
  );
  const WAWONA = "M300,1290 Q350,1170 330,1050 Q280,900 300,800 Q312,700 320,640";
  const TOVALLEY = "M320,640 Q420,560 560,560";
  const GP_A = "M330,1050 Q470,1090 580,1010";
  const GP_B = "M580,1010 Q730,930 770,790 Q800,680 850,640";
  return (
    <g transform="rotate(-2 540 900)">
      <rect x={100} y={420} width={880} height={900} rx={12} fill={PAPER} />
      <rect x={100} y={420} width={880} height={900} rx={12} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={4} />
      {/* valley walls */}
      <path d="M420,520 Q520,480 640,520 Q720,500 780,530" stroke={INK} strokeWidth={5} fill="none" opacity={0.6} />
      <path d="M420,610 Q540,640 760,600" stroke={INK} strokeWidth={5} fill="none" opacity={0.6} />
      {/* peaks */}
      {[
        [880, 520, 46],
        [700, 760, 40],
        [200, 560, 44],
      ].map(([px, py, h], i) => (
        <path key={i} d={`M${px - h},${py} L${px},${py - h * 1.3} L${px + h},${py} Z`} fill="#c9c3b4" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      ))}
      {/* roads, faint */}
      <path d={WAWONA} stroke={INK} strokeWidth={10} fill="none" opacity={0.2} />
      <path d={TOVALLEY} stroke={INK} strokeWidth={10} fill="none" opacity={0.2} />
      <path d={GP_A} stroke={INK} strokeWidth={10} fill="none" opacity={0.2} />
      <path d={GP_B} stroke={INK} strokeWidth={10} fill="none" opacity={0.2} />
      {/* Glacier Point Road drawn */}
      <path d={GP_A} stroke={INK} strokeWidth={10} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - at(gp, [0, 0.4], [0, 1])} strokeLinecap="round" />
      <path d={GP_B} stroke={INK} strokeWidth={10} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - at(gp, [0.4, 1], [0, 1])} strokeLinecap="round" />
      {/* closed section, red, beyond Badger Pass */}
      {x > 0 && <path d={GP_B} stroke={RED} strokeWidth={14} fill="none" strokeDasharray="22 16" opacity={x} strokeLinecap="round" />}
      {/* Wawona Road to Tunnel View, green */}
      <path d={WAWONA} stroke={GREEN} strokeWidth={14} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - west} strokeLinecap="round" />
      {/* points */}
      <circle cx={580} cy={1010} r={16} fill={INK} />
      <circle cx={850} cy={640} r={16} fill={INK} />
      <circle cx={320} cy={640} r={16 + view * 8} fill={view > 0 ? GREEN : INK} />
      {label(560, 500, "YOSEMITE VALLEY", 36)}
      {label(860, 700, "GLACIER POINT", 32, INK, "middle")}
      {label(600, 1070, "BADGER PASS", 32)}
      {label(350, 650, "TUNNEL VIEW", 34, view > 0 ? GREEN : INK, "start")}
      {label(130, 1270, "WAWONA RD", 30, INK, "start")}
      {x > 0 && (
        <g transform={`translate(720,860) scale(${mix(1.6, 1, x)})`} opacity={x}>
          <circle r={58} fill="rgba(194,58,50,0.15)" />
          <path d="M-38,-38 L38,38 M38,-38 L-38,38" stroke={RED} strokeWidth={16} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// Close-up of a car tyre with snow chains appearing (k 0..1).
const ChainTire: React.FC<{ x: number; y: number; r: number; k: number; t: number }> = ({ x, y, r, k, t }) => (
  <g transform={`translate(${x},${y})`}>
    <path d={`M${-r * 1.6},${-r * 0.2} Q${-r * 1.4},${-r * 1.35} 0,${-r * 1.35} Q${r * 1.4},${-r * 1.35} ${r * 1.6},${-r * 0.2} L${r * 2.4},${-r * 0.2} L${r * 2.4},${-r * 2.6} L${-r * 2.4},${-r * 2.6} L${-r * 2.4},${-r * 0.2} Z`} fill={CAR} />
    <path d={`M${-r * 1.6},${-r * 0.2} Q${-r * 1.4},${-r * 1.35} 0,${-r * 1.35} Q${r * 1.4},${-r * 1.35} ${r * 1.6},${-r * 0.2}`} stroke={CAR2} strokeWidth={18} fill="none" />
    <circle r={r * 1.18} fill="#15181a" />
    <circle r={r} fill="#1f2222" />
    <circle r={r * 0.62} fill="#9aa3a6" />
    <circle r={r * 0.5} fill="#7d878b" />
    {Array.from({ length: 5 }, (_, i) => {
      const a = (i / 5) * Math.PI * 2;
      return <circle key={i} cx={Math.cos(a) * r * 0.3} cy={Math.sin(a) * r * 0.3} r={r * 0.05} fill="#c9d0d3" />;
    })}
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
      <text x={-134} y={-62 + i * 120} fontFamily="Inter" fontWeight={700} fontSize={25} fill="#22302a">
        {name}
      </text>
      <rect x={34} y={-92 + i * 120} width={104} height={44} rx={22} fill={col} />
      <text x={86} y={-62 + i * 120} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={22} fill="#fff">
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
        Today, 7:05 AM
      </text>
      {row(0, "Glacier Pt Rd", "CLOSED", RED)}
      {row(1, "Wawona Road", "OPEN", GREEN)}
      {row(2, "Chains", "CARRY", "#b8862c")}
      <rect x={-50} y={318} width={100} height={8} rx={4} fill="rgba(0,0,0,0.3)" />
    </g>
  );
};

// Tunnel View: El Capitan on the left, Half Dome far back, Bridalveil Fall on the right, valley forest below.
// gold = 0..1, how far the sunset light has turned El Capitan gold.
const TunnelView: React.FC<{ cam: Cam; sky: Sky; uid: string; floorY: number; t: number; gold: number }> = ({ cam, sky, uid, floorY: f, t, gold }) => (
  <>
    <Plane cam={cam} depth={0.04}>
      <SkyPlane sky={sky} uid={uid} />
    </Plane>
    <Plane cam={cam} depth={0.1} blur={2.5}>
      <Svg>
        {/* Half Dome, far */}
        <path d={`M500,${f} L520,${f - 470} Q560,${f - 640} 660,${f - 650} Q700,${f - 640} 705,${f - 590} L720,${f} Z`} fill="#9b98a8" />
        <path d={`M705,${f - 590} L720,${f} L690,${f} Z`} fill="#86849a" />
        <path d={`M540,${f - 560} Q580,${f - 640} 660,${f - 650} Q600,${f - 620} 560,${f - 520} Z`} fill="#f6eee6" />
        <path d={`M660,${f - 650} Q700,${f - 640} 705,${f - 590} L690,${f - 300} Q690,${f - 560} 660,${f - 650} Z`} fill="#f0b070" opacity={0.6 * gold} />
      </Svg>
    </Plane>
    <Haze y={f - 420} h={300} col={sky.low} opacity={0.4} />
    <Plane cam={cam} depth={0.2} blur={1.2}>
      <Svg>
        <g transform={`translate(0,${f}) scale(1,0.74) translate(0,${-f})`}>
        {/* El Capitan, left: a huge granite wall with a lit face */}
        <path d={`M-260,${f + 60} L-260,${f - 930} Q120,${f - 1000} 360,${f - 900} Q460,${f - 840} 490,${f - 680} L560,${f + 60} Z`} fill="#6f737d" />
        <path d={`M360,${f - 900} Q460,${f - 840} 490,${f - 680} L560,${f + 60} L250,${f + 60} Q340,${f - 400} 360,${f - 900} Z`} fill="#b3b4b8" />
        <path d={`M360,${f - 900} Q460,${f - 840} 490,${f - 680} L560,${f + 60} L250,${f + 60} Q340,${f - 400} 360,${f - 900} Z`} fill="#f2a656" opacity={0.8 * gold} />
        <path d={`M300,${f - 700} Q330,${f - 400} 300,${f - 100} M420,${f - 760} Q450,${f - 400} 470,${f - 60}`} stroke="#7d7f86" strokeWidth={6} fill="none" opacity={0.5} />
        <path d={`M-260,${f - 930} Q120,${f - 1000} 360,${f - 900} Q140,${f - 930} -260,${f - 870} Z`} fill="#f4f6f8" />
        <path d={`M-260,${f - 930} Q120,${f - 1000} 360,${f - 900} Q140,${f - 930} -260,${f - 870} Z`} fill="#ffc98a" opacity={0.7 * gold} />
        </g>
        <g transform={`translate(0,${f}) scale(1,0.78) translate(0,${-f})`}>
        {/* Cathedral Rocks with Bridalveil Fall, right */}
        <path d={`M760,${f + 60} L820,${f - 640} Q950,${f - 760} 1120,${f - 700} L1340,${f + 60} Z`} fill="#6c727b" />
        <path d={`M820,${f - 640} Q950,${f - 760} 1120,${f - 700} Q950,${f - 720} 828,${f - 600} Z`} fill="#f4f6f8" />
        <path d={`M872,${f - 520} Q886,${f - 300} 880,${f - 40}`} stroke="#eef5fa" strokeWidth={14} fill="none" opacity={0.9} />
        <path d={`M872,${f - 520} Q886,${f - 300} 880,${f - 40}`} stroke="#c9dbe6" strokeWidth={5} fill="none" strokeDasharray="40 30" strokeDashoffset={-t * 120} />
        <ellipse cx={880} cy={f - 30} rx={60} ry={22} fill="#ffffff" opacity={0.6} />
        </g>
      </Svg>
    </Plane>
    <Haze y={f - 160} h={200} col="#e8d6c4" opacity={0.35} />
    <Plane cam={cam} depth={0.45} blur={0.8}>
      <Svg>
        <rect x={-300} y={f + 40} width={1700} height={600} fill="#243f36" />
        {Array.from({ length: 26 }, (_, i) => {
          const x = -200 + i * 60;
          const h = 120 + ((i * 37) % 5) * 22;
          const y = f + 70 + (i % 3) * 14;
          return (
            <g key={i}>
              <path d={`M${x},${y - h} L${x + h * 0.28},${y} L${x - h * 0.28},${y} Z`} fill={i % 2 ? "#2f5446" : "#24443a"} />
              <path d={`M${x},${y - h} L${x + h * 0.1},${y - h * 0.65} L${x - h * 0.1},${y - h * 0.65} Z`} fill={SNOW} opacity={0.8} />
            </g>
          );
        })}
      </Svg>
    </Plane>
  </>
);

// Stone wall of the viewpoint (foreground, screen coords).
const StoneWall: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-300} y={y} width={1700} height={900} fill="#6f6a62" />
    <path d={`M-300,${y} L1400,${y} L1400,${y + 26} L-300,${y + 26} Z`} fill={SNOW} />
    {Array.from({ length: 9 }, (_, i) => (
      <g key={i}>
        <rect x={-260 + i * 190} y={y + 40} width={170} height={90} rx={14} fill="#7c766d" />
        <rect x={-170 + i * 190} y={y + 140} width={170} height={90} rx={14} fill="#756f66" />
      </g>
    ))}
  </Svg>
);

// ============ S1 HOOK MEDIUM: Marco at a locked gate on Glacier Point Road (0 - 4.34) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - t * 8, y: hh.y, zoom: mix(1.04, 1.11, t / 4.34), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 820, y: g + 300, scale: 2.4, walk: 0, lean: -0.03, poles: false, handOverride: [30, 20], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <GateRoad y={g} />
        <Svg>
          <SnowCar x={180} y={g + 340} s={2.0} body={CAR} shade={CAR2} />
        </Svg>
        <Subject rimX={-6} col="rgba(240,246,255,0.85)">
          <Person {...p} outfit={MARCO} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="left" />
      </Plane>
      <Particles seed={1421} n={22} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="245,244,236" cool="40,60,90" />
      <Title text={"The road to\nGlacier Point\nwas closed."} t={t} t0={0} top={100} size={120} />
      <Chip text="December sunset plan" t={t} t0={1.5} x={60} y={560} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: chain and padlock on the gate, a few miles up (4.34 - 6.58) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hit = at(t, [6.0, 6.1, 6.5], [0, 1, 0]);
  const hh = handheld(t, 0.3, hit * 3);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.04, 1.12, lt / 2.24), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1150} t={t} blur={14} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(240,246,255,0.8)">
          <GateClose t={t} swing={at(t, [6.0, 6.2, 6.58], [0, 1, 0.3])} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={16}>
        <FrameLeaves col="#24402e" side="right" />
      </Plane>
      <Particles seed={1422} n={24} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="245,244,236" cool="40,60,90" vignette={0.55} />
      <Chip text="A few miles up" t={t} t0={4.5} x={60} y={200} icon="none" big />
      <Chip text="Gated" t={t} t0={6.05} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the map: Glacier Point Road closed beyond Badger Pass (6.58 - 11.0) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3, at(t, [9.94, 10.04, 10.4], [0, 1, 0]) * 2.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 4.42), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <MapSketch gp={at(t, [7.4, 9.4], [0, 1])} x={at(t, [9.94, 10.3], [0, 1], outExpo)} west={0} view={0} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1423} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Chip text="In winter" t={t} t0={6.7} x={60} y={200} icon="none" big />
      <Chip text="Closed past Badger Pass" t={t} t0={10.0} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 WIDE: snow over the gated road, usually until late spring (11.0 - 13.05) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y + 180, zoom: mix(1.14, 1.06, lt / 2.05), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 300, y: g + 140, scale: 2.0, walk: 0, lean: 0.04, poles: false, handOverride: [24, -36], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <GateRoad y={g} />
        <Subject rimX={6} col="rgba(240,246,255,0.85)">
          <Person {...p} outfit={MARCO} expression="tired" />
        </Subject>
      </Plane>
      <Particles seed={1424} n={34} col="#ffffff" fall={24} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="240,242,236" cool="40,60,90" />
      <Chip text="Usually until late spring" t={t} t0={11.9} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the fix on the map: Wawona Road to Tunnel View (13.05 - 18.1) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 5.05), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <MapSketch gp={1} x={1} west={at(t, [15.4, 16.9], [0, 1])} view={at(t, [16.2, 16.5], [0, 1])} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1425} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={14.3} top={200} size={124} />
      <Chip text="For a winter view" t={t} t0={14.6} x={60} y={200} icon="none" big />
      <Chip text="Tunnel View, Wawona Road" t={t} t0={15.8} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: tire chains in the car (18.1 - 19.7) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.6), rot: hh.rot };
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
            <ChainTire x={540} y={1080} r={230} k={at(t, [18.4, 18.9], [0, 1], outExpo)} t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1426} n={22} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="245,244,236" cool="40,60,90" vignette={0.5} />
      <Chip text="Carry tire chains" t={t} t0={18.2} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: morning, phone in his hand: road status on nps.gov (19.7 - 22.95) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.25), rot: hh.rot };
  const up = at(t, [19.7, 20.2], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="f" treeY={1200} t={t} blur={14} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,190,0.8)">
          <Svg>
            <g transform={`translate(0,${(1 - up) * 500})`}>
              <path d="M490,1460 L700,1460 L710,1560 L480,1560 Z" fill="#2a2a2a" />
              <path d="M480,1560 L710,1560 L740,1900 L450,1900 Z" fill={MARCO.jacket} />
              <StatusPhone x={560} y={1000} s={1.05} k={at(t, [20.1, 22.0], [0, 1])} rot={3} />
              <path d="M380,1300 Q370,1420 480,1470 L690,1470 Q770,1410 750,1300 Q720,1380 650,1395 L490,1395 Q420,1380 380,1300 Z" fill={MARCO.glove ?? "#2a2a2a"} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1427} n={12} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={300} sunY={760} warm="255,226,190" vignette={0.5} />
      <Chip text="Check road status" t={t} t0={19.8} x={60} y={200} icon="check" big />
      <Chip text="That morning" t={t} t0={21.8} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE-MEDIUM: Tunnel View at sunset, El Capitan turns gold (22.95 - 25.15) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: at(lt, [0, 1.6], [1.08, 1.0], outExpo), rot: hh.rot };
  const g = 1480;
  const p: HikerProps = { x: 850, y: g + 110, scale: 1.8, walk: 0, lean: -0.02, poles: false, handOverride: [30, 24], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <TunnelView cam={cam} sky={DUSK} uid="h" floorY={1230} t={t} gold={at(t, [23.2, 24.6], [0.2, 1])} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,214,160,0.95)">
          <Person {...p} outfit={MARCO} expression="happy" />
        </Subject>
        <StoneWall y={g + 40} />
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.45} />
      <Particles seed={1428} n={18} col="#fff1d6" bokeh fall={4} />
      <LowScrim />
      <Grade sunX={DUSK.sun[0]} sunY={DUSK.sun[1]} warm="255,210,160" />
      <Readout label="TUNNEL VIEW" value="El Capitan turns gold" ok={true} t={t} t0={23.3} x={60} y={200} />
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

export const V142: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.39} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.34} to={6.63} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.34} />
    </Scene>
    <Scene from={6.58} to={11.05} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.58} />
    </Scene>
    <Scene from={11.0} to={13.1} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={11.0} />
    </Scene>
    <Scene from={13.05} to={18.15} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={13.05} />
    </Scene>
    <Scene from={18.1} to={19.75} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={18.1} />
    </Scene>
    <Scene from={19.7} to={23.0} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={19.7} />
    </Scene>
    <Scene from={22.95} to={25.3} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={22.95} />
    </Scene>
    <Scene from={25.15} to={29.5} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.34, 1600],
        [4.34, 6.58, 1660],
        [6.58, 11.0, 1660],
        [11.0, 13.05, 1600],
        [13.05, 18.1, 1660],
        [18.1, 19.7, 1660],
        [19.7, 22.95, 1660],
        [22.95, 25.15, 1600],
      ]}
    />
  </AbsoluteFill>
);
