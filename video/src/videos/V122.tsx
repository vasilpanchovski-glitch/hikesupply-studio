// V122: "Warm in Banff. Deep snow at Lake Agnes." in the cinematic C01 style. Launch story for the Banff & Jasper Trip
// Planning Guide ($9.99, live Shopify). Facts kept to what Parks Canada says: higher trails in the Rockies can hold snow
// into July; thawed lakes and open high trails are usually late June to mid-September; check Parks Canada trail
// conditions before you go and pack for winter conditions up high. No invented temperatures or numbers on screen.
// End card = real Shopify cover (products/banff-jasper-trip-planning-guide.jpg, boxed photo card, no plain background).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Pine, Readout, Scene, Title, useT, freeHand } from "../kit";
import { Cam, FrameLeaves, Grade, Haze, handheld, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { Room, WindowView } from "../home";
import { Desk, INK, PAPER } from "../trip";
import { SNOW, SNOW2, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v122.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const SUMMER: Sky = { top: "#3a6a98", mid: "#9fc2dc", low: "#f4e2bc", sun: [790, 520], sunR: 52, sunCol: "#fff6dc", glow: "#ffd79a" };
const AUGUST: Sky = { top: "#3d6fa0", mid: "#a8cbe0", low: "#f6e8c8", sun: [300, 560], sunR: 54, sunCol: "#fff6dc", glow: "#ffdca0" };
const LAMP = "255,200,140";
const TEAL = "#3fb2bf";
const TEAL2 = "#1d7f8f";

const JAKE_T: Outfit = { ...JAKE, jacket: "#5a8f6a", jacketShade: "#46735a", pants: "#7a6a54", pantsShade: "#5e523f", glove: null };
const JAKE_A: Outfit = { ...JAKE, jacket: "#C2662E", jacketShade: "#9B4E20", glove: null };

// Low mesh trail runner, side view, local units (sole at y=0, toe to the right).
const Runner: React.FC<{ x: number; y: number; s?: number; wet?: number }> = ({ x, y, s = 1, wet = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-120,0 L150,0 Q190,-6 186,-34 L-124,-34 Z" fill="#e9e6dc" />
    <path d="M-124,-34 L186,-34 Q176,-80 120,-96 L40,-108 L-20,-150 L-96,-150 Q-128,-110 -124,-34 Z" fill="#3f8fb0" />
    <path d="M-96,-150 L-20,-150 L-10,-130 L-104,-128 Z" fill="#2c6e8a" />
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1={-10 + i * 26} y1={-120 + i * 6} x2={20 + i * 26} y2={-100 + i * 4} stroke="#f4f4f4" strokeWidth={7} strokeLinecap="round" />
    ))}
    <path d="M-80,-60 Q20,-76 150,-54" stroke="#d9a34a" strokeWidth={8} fill="none" />
    {wet > 0 && <path d="M-124,-34 L186,-34 Q176,-80 120,-96 L40,-108 L-20,-150 L-96,-150 Q-128,-110 -124,-34 Z" fill="#1d3a4a" opacity={wet * 0.45} />}
  </g>
);

// Snowy slope at Lake Agnes height: deep drift with footholes.
const DeepSnow: React.FC<{ y: number; holes?: boolean }> = ({ y, holes = true }) => (
  <Svg>
    <path d={`M-400,${y} Q300,${y - 50} 700,${y - 20} Q1100,${y + 10} 1480,${y - 30} L1480,2600 L-400,2600 Z`} fill={SNOW} />
    <path d={`M-400,${y + 180} Q540,${y + 140} 1480,${y + 190} L1480,2600 L-400,2600 Z`} fill={SNOW2} opacity={0.55} />
    {holes &&
      [
        [140, 70],
        [300, 120],
        [80, 230],
      ].map(([hx, hy], i) => <ellipse key={i} cx={hx} cy={y + hy} rx={46} ry={18} fill="#b8c6d0" />)}
  </Svg>
);

// ============ S1 HOOK WIDE: Jake knee-deep in snow on the climb, trail runners gone (0 - 2.6) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.1, t / 2.6), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 560, y: g + 330, scale: 2.5, walk: 0.15, phase: 1, lean: 0.12, poles: false, handOverride: [60, 60], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(240,246,255,0.85)">
          <Person {...p} outfit={JAKE_T} expression="tired" />
        </Subject>
        <DeepSnow y={g - 170} />
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" />
      </Plane>
      <Particles seed={1221} n={22} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="245,244,236" cool="40,60,90" />
      <Title text={"Warm in Banff.\nDeep snow at\nLake Agnes."} t={t} t0={0} top={110} size={118} />
    </AbsoluteFill>
  );
};

// Small mountain-town street: shop fronts with awnings, flower boxes. Generic, no real business names.
const Town: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    {[
      [-200, "#b5553a", "#e7d6b8"],
      [180, "#3e7d4f", "#efe4cf"],
      [560, "#4f6f8f", "#e9dcc4"],
      [940, "#8e3f2a", "#efe4cf"],
    ].map(([x, aw, wall], i) => (
      <g key={i} transform={`translate(${x},${y})`}>
        <rect x={0} y={-520} width={360} height={520} fill={wall as string} />
        <path d="M-10,-520 L180,-640 L370,-520 Z" fill="#5a4a40" />
        <rect x={40} y={-430} width={110} height={130} fill="#9cc4d6" />
        <rect x={210} y={-430} width={110} height={130} fill="#9cc4d6" />
        <path d="M20,-250 L340,-250 L360,-190 L0,-190 Z" fill={aw as string} />
        <rect x={130} y={-170} width={100} height={170} fill="#5a4030" />
        <rect x={30} y={-290} width={130} height={26} fill="#6b4a2e" />
        {[50, 80, 110, 140].map((fx) => (
          <circle key={fx} cx={fx} cy={-296} r={12} fill={fx % 60 === 50 ? "#d94a5a" : "#f2c94c"} />
        ))}
      </g>
    ))}
  </Svg>
);

// ============ S2 MEDIUM: a warm June morning on the town street, Jake sets off in trail runners (2.6 - 4.4) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.8), rot: hh.rot };
  const g = 1640;
  const ph = t * 5;
  const p: HikerProps = { x: 380 + lt * 60, y: g + 160, scale: 2.4, phase: ph, walk: 0.7, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={SUMMER} uid="b" />
      </Plane>
      <Plane cam={cam} depth={0.14} blur={2.6}>
        <Ridge seed={73} base={g - 520} amp={720} scale={150} col="#8d96a2" lit="#ffffff" peak={260} />
      </Plane>
      <Haze y={g - 760} h={300} col={SUMMER.low} opacity={0.4} />
      <Plane cam={cam} depth={0.5} blur={2}>
        <Town y={g - 20} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 30} width={1880} height={1400} fill="#9a9a94" />
          <rect x={-400} y={g - 30} width={1880} height={24} fill="#c8c4b8" />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={JAKE_T} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f5a3a" side="left" top={200} />
      </Plane>
      <Rays x={SUMMER.sun[0]} y={SUMMER.sun[1]} strength={0.35} />
      <Particles seed={1222} n={16} col="#fff1d6" fall={4} />
      <LowScrim />
      <Grade sunX={790} sunY={520} warm="255,226,170" />
      <Readout label="BANFF TOWN, JUNE" value="Warm morning" ok={null} t={t} t0={2.75} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: trail runners on a dry, sunny path (4.4 - 6.19) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: mix(1.04, 1.12, lt / 1.79), rot: hh.rot };
  const g = 1300;
  const step = Math.sin(t * 5);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={SUMMER} uid="c" />
      </Plane>
      <Plane cam={cam} depth={0.4} blur={8}>
        <Svg>
          {Array.from({ length: 10 }, (_, i) => (
            <Pine key={i} x={-300 + i * 180} y={g - 200} h={520} c="#2f5446" c2="#24443a" />
          ))}
          <rect x={-400} y={g - 210} width={1880} height={400} fill="#76804a" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g} L1480,${g - 40} L1480,2600 L-400,2600 Z`} fill="#9a7f5c" />
          {Array.from({ length: 10 }, (_, i) => (
            <ellipse key={i} cx={-200 + i * 170} cy={g + 120 + ((i * 71) % 300)} rx={26} ry={10} fill="#7d6448" />
          ))}
        </Svg>
        <Subject rimX={5} col="rgba(255,236,200,0.85)">
          <Svg>
            {/* legs (bare ankles, shorts-length pants) */}
            <rect x={310} y={-300 + Math.max(0, step) * -40} width={90} height={g - 120 + 300} rx={40} fill={JAKE_T.pants} />
            <rect x={600} y={-300 + Math.max(0, -step) * -40} width={90} height={g - 140 + 300} rx={40} fill={JAKE_T.pantsShade} />
            <Runner x={350} y={g - 10 + Math.max(0, step) * -40} s={1.5} />
            <Runner x={640} y={g - 30 + Math.max(0, -step) * -40} s={1.5} />
          </Svg>
        </Subject>
      </Plane>
      <Rays x={SUMMER.sun[0]} y={SUMMER.sun[1]} strength={0.3} />
      <Particles seed={1223} n={14} col="#fff1d6" fall={4} />
      <LowScrim />
      <Grade sunX={790} sunY={520} warm="255,226,170" vignette={0.5} />
      <Chip text="Trail runners" t={t} t0={4.6} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: an hour later, the runner sinks into deep snow (6.19 - 9.01) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const sink = at(t, [6.4, 7.3], [0, 1], outExpo);
  const shake = at(t, [7.1, 7.2, 7.6], [0, 1, 0]);
  const hh = handheld(t, 0.35, shake * 4);
  const cam: Cam = { x: hh.x, y: hh.y + sink * 20, zoom: mix(1.04, 1.12, lt / 2.82), rot: hh.rot };
  const g = 1260;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={g - 260} t={t} blur={4} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(240,246,255,0.85)">
          <Svg>
            <rect x={380} y={-400 + sink * 300} width={120} height={g + 480} rx={54} fill={JAKE_T.pants} />
            <Runner x={440} y={g + 40 + sink * 300} s={2.0} wet={sink} />
          </Svg>
        </Subject>
        <Svg>
          <path d={`M-400,${g} Q540,${g - 40} 1480,${g + 10} L1480,2600 L-400,2600 Z`} fill={SNOW} />
          <path d={`M300,${g - 4} Q440,${g - 50 - sink * 30} 600,${g - 6}`} fill={SNOW2} />
          <path d={`M-400,${g + 260} Q540,${g + 220} 1480,${g + 270} L1480,2600 L-400,2600 Z`} fill={SNOW2} opacity={0.5} />
        </Svg>
      </Plane>
      <Particles seed={1224} n={26} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={400} warm="245,244,236" cool="40,60,90" vignette={0.55} />
      <Readout label="AN HOUR LATER" value="Deep snow" ok={false} t={t} t0={6.3} x={60} y={200} />
      <Chip text="Wet feet" t={t} t0={7.6} x={60} y={420} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: the valley is green, the high trail above is still white (9.01 - 12.74) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y - lt * 16, zoom: mix(1.0, 1.08, lt / 3.73), rot: hh.rot };
  const line = 1080;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={SUMMER} uid="e" />
      </Plane>
      <Plane cam={cam} depth={0.14} blur={2.2}>
        <Ridge seed={83} base={line - 80} amp={760} scale={160} col="#eef2f4" lit="#ffffff" peak={280} />
      </Plane>
      <Haze y={line - 380} h={260} col={SUMMER.low} opacity={0.35} />
      <Plane cam={cam} depth={0.35} blur={1.1}>
        <Ridge seed={89} base={line + 220} amp={360} scale={140} col="#dfe7ec" lit="#ffffff" />
        <Svg>
          {/* switchback trail climbing into the white */}
          <path d={`M180,${line + 560} L760,${line + 420} L300,${line + 300} L820,${line + 160} L420,${line + 40}`} stroke="#9a7f5c" strokeWidth={14} fill="none" strokeLinejoin="round" opacity={0.9} />
          <path d={`M300,${line + 300} L820,${line + 160} L420,${line + 40}`} stroke={SNOW} strokeWidth={16} fill="none" strokeLinejoin="round" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={0.6} blur={0.6}>
        <Svg>
          <rect x={-400} y={line + 520} width={1880} height={1400} fill="#5f7a4a" />
          {Array.from({ length: 16 }, (_, i) => (
            <Pine key={i} x={-300 + i * 110} y={line + 560 + (i % 2) * 14} h={240 + (i % 3) * 60} c="#2f5446" c2="#24443a" />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f3a30" side="left" />
      </Plane>
      <Particles seed={1225} n={14} col="#ffffff" fall={6} />
      <LowScrim />
      <Grade sunX={790} sunY={520} warm="250,240,222" cool="40,55,70" />
      <Chip text="Green down low" t={t} t0={9.1} x={60} y={200} icon="check" big />
      <Chip text="Snow up high into July" t={t} t0={10.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

const MONTHS = ["JUNE", "JULY", "AUG", "SEPT"];
const SeasonBar: React.FC<{ x: number; y: number; w: number; a: number; b: number; k: number; col: string; label: string }> = ({ x, y, w, a, b, k, col, label }) => {
  const mw = w / 4;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={14} y={20} width={w} height={420} rx={18} fill="rgba(0,0,0,0.3)" />
      <rect x={0} y={0} width={w} height={420} rx={18} fill={PAPER} />
      {MONTHS.map((m, i) => (
        <g key={m}>
          <text x={i * mw + mw / 2} y={80} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={48} fill={INK} letterSpacing={2}>
            {m}
          </text>
          {i > 0 && <line x1={i * mw} y1={30} x2={i * mw} y2={300} stroke="#d8d0c0" strokeWidth={4} />}
        </g>
      ))}
      <rect x={20} y={150} width={w - 40} height={90} rx={14} fill="#e6dfd2" />
      <rect x={a * mw} y={150} width={(b - a) * mw * k} height={90} rx={14} fill={col} />
      <text x={w / 2} y={360} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={50} fill={col} opacity={k} letterSpacing={2}>
        {label}
      </text>
    </g>
  );
};

// ============ S6 MEDIUM: back home, Jake at his laptop: "here's the fix" (12.74 - 14.9) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.16), rot: hh.rot };
  const floorY = 1700;
  const p: HikerProps = { x: 420, y: floorY, scale: 2.5, walk: 0, lean: 0.14, poles: false, handOverride: [110, -20], breathe: Math.sin(t * 2) * 1.2 };
  const EVE: Sky = { top: "#2a3a5c", mid: "#6a7a96", low: "#c9b8a8", sun: [800, 620], sunR: 30, sunCol: "#f6efe0", glow: "#d8c0a8" };
  return (
    <AbsoluteFill style={{ background: "#1a120c" }}>
      <Plane cam={cam} depth={0.8} blur={2.5}>
        <WindowView x={80} y={360} w={340} h={420} sky={EVE} uid="f" snow={false} />
        <Room floorY={floorY} win={[80, 360, 340, 420]} lamp={[900, 560]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,180,0.8)">
          <Person {...p} outfit={JAKE_A} expression="neutral" noPack />
          <Svg>
            <rect x={520} y={1290} width={640} height={30} rx={6} fill="#6e4c34" />
            <rect x={560} y={1320} width={30} height={400} fill="#5a3e2a" />
            <g transform="translate(760,1290)">
              <path d="M-150,0 L150,0 L170,-14 L-170,-14 Z" fill="#9aa0a6" />
              <path d="M-140,-14 L-120,-230 L150,-230 L130,-14 Z" fill="#2a2e34" />
              <path d="M-126,-26 L-110,-216 L138,-216 L122,-26 Z" fill="#9fc2dc" opacity={0.9} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="left" top={300} />
      </Plane>
      <Particles seed={1226} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={900} sunY={600} warm={LAMP} />
      <Chip text="Here's the fix" t={t} t0={12.8} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: the season bar, late June to mid-September (14.9 - 18.1) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.2), rot: hh.rot };
  const k = at(t, [15.2, 16.9], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,226,180,0.7)">
          <Svg>
            <SeasonBar x={70} y={640} w={940} a={0.6} b={3.5} k={k} col="#2C6E63" label="LAKES THAWED, TRAILS OPEN" />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1227} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.6} />
      <Readout label="PLAN FOR" value="Late June to mid-Sept" ok={true} t={t} t0={15.0} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: phone with trail conditions, then a winter layer goes in the pack (18.1 - 22.63) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 4.53), rot: hh.rot };
  const pack = at(t, [20.2, 21.4], [0, 1], outExpo);
  const rows: [string, string][] = [
    ["Valley trails", "#3e7d4f"],
    ["Higher trails", "#c9662e"],
    ["Passes and lakes up high", "#c9662e"],
  ];
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-5} col="rgba(230,240,255,0.8)">
          <Svg>
            <g transform={`translate(${mix(400, 300, pack)},940) rotate(-4)`}>
              <rect x={-190} y={-380} width={380} height={760} rx={50} fill="#1d2126" />
              <rect x={-170} y={-350} width={340} height={700} rx={30} fill="#f4f6f8" />
              <rect x={-170} y={-350} width={340} height={120} rx={30} fill="#2C3B2E" />
              <rect x={-170} y={-260} width={340} height={30} fill="#2C3B2E" />
              <text x={-146} y={-272} fontFamily={HEAD} fontWeight={800} fontSize={34} fill={PAPER} letterSpacing={2}>
                TRAIL CONDITIONS
              </text>
              {rows.map(([r, c], i) => (
                <g key={r} opacity={at(t, [18.4 + i * 0.35, 18.7 + i * 0.35], [0, 1])}>
                  <rect x={-150} y={-190 + i * 130} width={300} height={110} rx={14} fill="#e9ecef" />
                  <circle cx={-110} cy={-135 + i * 130} r={20} fill={c} />
                  <text x={-74} y={-125 + i * 130} fontFamily="Inter" fontWeight={700} fontSize={i === 2 ? 19 : 24} fill={INK}>
                    {r}
                  </text>
                </g>
              ))}
            </g>
            {/* daypack with a warm jacket and gloves going in */}
            <g transform={`translate(${mix(1300, 780, pack)},1240)`}>
              <rect x={-170} y={-300} width={340} height={420} rx={70} fill="#2C6E63" />
              <rect x={-130} y={-120} width={260} height={150} rx={30} fill="#1f5249" />
              <path d="M-150,-290 Q0,-360 150,-290" stroke="#1f5249" strokeWidth={26} fill="none" />
              <g transform={`translate(0,${mix(-260, -330, pack)})`}>
                <rect x={-120} y={-80} width={240} height={110} rx={30} fill="#B83A55" />
                <rect x={-120} y={-80} width={240} height={30} rx={14} fill="#8E2B42" />
                <ellipse cx={150} cy={-60} rx={46} ry={30} fill="#3a3f46" />
              </g>
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1228} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,220,180" vignette={0.55} />
      <Chip text="Check Parks Canada conditions" t={t} t0={18.2} x={60} y={200} icon="check" big />
      <Chip text="Pack for winter up high" t={t} t0={20.2} x={60} y={1400} icon="check" big />
    </AbsoluteFill>
  );
};

// Thawed lake below cliffs for the payoff.
const AgnesLake: React.FC<{ cam: Cam; sky: Sky; uid: string; shore: number; t: number }> = ({ cam, sky, uid, shore, t }) => (
  <>
    <Plane cam={cam} depth={0.04}>
      <SkyPlane sky={sky} uid={uid} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={1.8}>
      <Ridge seed={73} base={shore - 60} amp={760} scale={150} col="#7d7f8c" lit="#ffe6c4" peak={300} />
    </Plane>
    <Haze y={shore - 420} h={300} col={sky.low} opacity={0.3} />
    <Plane cam={cam} depth={0.45} blur={0.6}>
      <Svg>
        <defs>
          <linearGradient id={`ag${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={TEAL} />
            <stop offset="1" stopColor={TEAL2} />
          </linearGradient>
        </defs>
        <rect x={-400} y={shore} width={1880} height={1400} fill={`url(#ag${uid})`} />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={-200 + ((i * 197 + t * 20) % 1500)} y={shore + 40 + (i % 5) * 60} width={120 + (i % 3) * 60} height={4} fill="rgba(255,255,255,0.45)" />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <Pine key={i} x={-300 + i * 110} y={shore + 6} h={160 + (i % 3) * 40} c="#244a40" c2="#1a3a32" />
        ))}
      </Svg>
    </Plane>
  </>
);

// ============ S9 PAYOFF: August at the lake, Jake in hiking boots, dry trail (22.63 - 25.5) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.04], outExpo), rot: hh.rot };
  const shore = 1160;
  const g = 1700;
  const p: HikerProps = { x: 430, y: g, scale: 2.4, walk: 0, lean: -0.02, poles: false, handOverride: [80, 40], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <AgnesLake cam={cam} sky={AUGUST} uid="i" shore={shore} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g + 20} L200,${g - 100} L460,${g - 50} L760,${g - 130} L1060,${g - 50} L1480,${g - 20} L1480,2400 L-400,2400 Z`} fill="#8a7a5e" />
          <path d={`M200,${g - 100} L460,${g - 50} L760,${g - 130}`} fill="none" stroke="#ffe0b0" strokeWidth={8} opacity={0.6} />
        </Svg>
        <Subject rimX={-6} col="rgba(255,224,170,0.95)">
          <Person {...p} outfit={JAKE_A} expression="happy" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1f3a30" side="right" />
      </Plane>
      <Rays x={AUGUST.sun[0]} y={AUGUST.sun[1]} strength={0.45} col="255,232,190" />
      <Particles seed={1229} n={20} col="#fff1d6" fall={4} />
      <LowScrim />
      <Grade sunX={300} sunY={560} warm="255,224,176" />
      <Readout label="BACK IN AUGUST" value="Dry feet" ok={true} t={t} t0={23.3} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/banff-jasper-trip-planning-guide.jpg"
      photoH={800}
      spec="30 PAGES · 12 DAY HIKES · MI + KM"
      name={
        <>
          Banff & Jasper
          <br />
          Trip Planning Guide
        </>
      }
      nameSize={96}
      price="$9.99"
      save="Save this before you plan Banff"
    />
  );
};

export const V122: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.65} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.6} to={4.45} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.6} />
    </Scene>
    <Scene from={4.4} to={6.24} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={4.4} />
    </Scene>
    <Scene from={6.19} to={9.06} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={6.19} />
    </Scene>
    <Scene from={9.01} to={12.79} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={9.01} />
    </Scene>
    <Scene from={12.74} to={14.95} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={12.74} />
    </Scene>
    <Scene from={14.9} to={18.15} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={14.9} />
    </Scene>
    <Scene from={18.1} to={22.68} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={18.1} />
    </Scene>
    <Scene from={22.63} to={25.95} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={22.63} />
    </Scene>
    <Scene from={25.4} to={30.0} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.6, 1560],
        [2.6, 4.4, 1560],
        [4.4, 6.19, 1560],
        [6.19, 9.01, 1560],
        [9.01, 12.74, 1560],
        [12.74, 14.9, 1560],
        [14.9, 18.1, 1560],
        [18.1, 22.63, 1640],
        [22.63, 25.4, 1560],
      ]}
    />
  </AbsoluteFill>
);
