// V80: "The Yellowstone gate was closed" in the cinematic C01 style, mid-November.
// Facts from nps.gov/yell news 26026: most park roads and the West, South and East entrances close to regular vehicles on Nov 1;
// the road from the North Entrance (Gardiner) through Mammoth Hot Springs, Tower and Lamar Valley to the Northeast Entrance
// (Cooke City) is open all year, weather permitting. Bison: stay at least 25 yards away (NPS). Map is a simple schematic, not to scale.
// End card = Yellowstone & Grand Teton — Trip Planning Guide, 30 pages, $9.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, rim, Svg } from "../cine";
import { SNOW, SNOW2, STORM, WGOLD, WINTER, WinterBackdrop } from "../winter";
import { Breath } from "../fall";
import vo from "../vo/v80.json";

const words = vo.words as unknown as Word[];

const ELI: Outfit = {
  ...JAKE,
  skin: "#8D5B3E",
  skinShade: "#714630",
  hair: "#1a1210",
  beard: null,
  cap: "#B83A55",
  capShade: "#8E2B42",
  jacket: "#2F5D8A",
  jacketShade: "#244a6f",
  pants: "#4a4e55",
  pantsShade: "#363a40",
  pack: "#6b6f3a",
  packShade: "#555930",
  glove: "#2C3B2E",
};

const CAR = "#B5553A";
const CAR_D = "#8E3F2A";

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Snowy road running into the distance (screen units). y = horizon line of the road.
const Road: React.FC<{ y: number; snowOnRoad?: number }> = ({ y, snowOnRoad = 0 }) => (
  <Svg>
    <rect x={-200} y={y} width={1500} height={1400} fill={SNOW} />
    <path d={`M500,${y} L580,${y} L1300,${y + 900} L-220,${y + 900} Z`} fill="#5c6166" />
    <path d={`M500,${y} L580,${y} L1300,${y + 900} L-220,${y + 900} Z`} fill={SNOW2} opacity={snowOnRoad} />
    <path d={`M540,${y + 10} L540,${y + 900}`} stroke="#e8c84a" strokeWidth={10} strokeDasharray="40 40" opacity={1 - snowOnRoad} />
    <path d={`M-200,${y + 4} Q540,${y - 16} 1300,${y + 4}`} stroke="#ffffff" strokeWidth={14} fill="none" />
  </Svg>
);

const Gate: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-210} y={-160} width={16} height={160} fill="#5a5a5a" />
    <rect x={194} y={-160} width={16} height={160} fill="#5a5a5a" />
    <rect x={-220} y={-126} width={440} height={38} fill="#f2f0ea" />
    {Array.from({ length: 8 }, (_, i) => (
      <path key={i} d={`M${-210 + i * 56},-126 l26,0 l-20,38 l-26,0 Z`} fill="#c8432f" />
    ))}
    {Array.from({ length: 10 }, (_, i) => (
      <path key={i} d={`M${-200 + i * 44},-88 l8,0 l-4,${16 + (i % 3) * 10} Z`} fill="#e8f4fa" />
    ))}
    <g transform="translate(0,-216)">
      <rect x={-150} y={-52} width={300} height={104} rx={8} fill="#f2f0ea" stroke="#c8432f" strokeWidth={8} />
      <text x={0} y={-6} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={46} fill="#c8432f">
        ROAD CLOSED
      </text>
      <text x={0} y={36} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={30} fill="#3a3a3a">
        TO CARS UNTIL SPRING
      </text>
    </g>
  </g>
);

// Brown roadside entrance sign (generic, no logos).
const EntranceSign: React.FC<{ x: number; y: number; s?: number; text: string }> = ({ x, y, s = 1, text }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-120} y={-150} width={18} height={150} fill="#4a3424" />
    <rect x={102} y={-150} width={18} height={150} fill="#4a3424" />
    <rect x={-160} y={-260} width={320} height={130} rx={10} fill="#5a3d27" stroke="#e6dccb" strokeWidth={6} />
    <text x={0} y={-208} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#f2ead8">
      {text}
    </text>
    <text x={0} y={-160} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={30} fill="#d9cfb8">
      YELLOWSTONE
    </text>
    <rect x={-160} y={-268} width={320} height={16} rx={8} fill={SNOW} />
  </g>
);

const Bison: React.FC<{ x: number; y: number; s?: number; head?: number; t: number }> = ({ x, y, s = 1, head = 0, t }) => {
  const tail = Math.sin(t * 3) * 12;
  const rot = mix(38, -4, head);
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <ellipse cx={0} cy={6} rx={300} ry={22} fill="rgba(0,0,0,0.22)" />
      <rect x={-190} y={-170} width={40} height={170} rx={14} fill="#2a1c12" />
      <rect x={150} y={-150} width={40} height={150} rx={14} fill="#2a1c12" />
      <path d={`M300,-250 q30,40 ${20 + tail},110`} stroke="#2a1c12" strokeWidth={12} fill="none" strokeLinecap="round" />
      <ellipse cx={150} cy={-230} rx={170} ry={120} fill="#5a3d27" />
      <rect x={-120} y={-170} width={46} height={172} rx={16} fill="#3a271a" />
      <rect x={200} y={-160} width={46} height={162} rx={16} fill="#3a271a" />
      <path d="M-260,-200 Q-280,-420 -80,-470 Q60,-480 110,-330 Q120,-200 40,-140 L-200,-130 Q-250,-150 -260,-200 Z" fill="#7a5434" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${-230 + i * 34},${-420 + Math.abs(i - 3) * 22} q12,30 -4,58`} stroke="#5f3f25" strokeWidth={8} fill="none" strokeLinecap="round" />
      ))}
      <path d="M-260,-420 Q-80,-500 100,-380" stroke={SNOW} strokeWidth={22} fill="none" strokeLinecap="round" opacity={0.85} />
      <g transform={`translate(-230,-260) rotate(${-rot})`}>
        <path d="M-10,-40 Q-140,-80 -170,20 Q-180,110 -110,130 Q-40,140 -10,70 Z" fill="#3a2618" />
        <path d="M-60,-60 Q-120,-110 -150,-40 Q-120,-50 -90,-30 Z" fill="#5f3f25" />
        <path d="M-80,-56 Q-90,-110 -50,-120 Q-70,-100 -64,-60 Z" fill="#e6dccb" />
        <path d="M-120,110 Q-110,190 -70,200 Q-60,150 -40,110 Z" fill="#4a3220" />
        <ellipse cx={-110} cy={-6} rx={11} ry={9} fill="#120c08" />
        <ellipse cx={-158} cy={90} rx={14} ry={10} fill="#1a120c" />
      </g>
    </g>
  );
};

// Schematic park map. open: 0..1 how far the north-to-northeast road is drawn green; closed: 0..1 grey-out of the rest.
type Pt = [number, number];
const N: Record<string, Pt> = {
  north: [380, 470],
  mammoth: [380, 630],
  tower: [690, 650],
  lamar: [850, 560],
  ne: [990, 480],
  norris: [410, 860],
  canyon: [720, 880],
  madison: [300, 1010],
  west: [100, 1000],
  faithful: [330, 1230],
  thumb: [570, 1250],
  lake: [770, 1120],
  east: [1000, 1080],
  south: [570, 1430],
};
const CLOSED_ROADS: [string, string][] = [
  ["mammoth", "norris"],
  ["norris", "canyon"],
  ["canyon", "tower"],
  ["norris", "madison"],
  ["madison", "west"],
  ["madison", "faithful"],
  ["faithful", "thumb"],
  ["thumb", "lake"],
  ["lake", "canyon"],
  ["lake", "east"],
  ["thumb", "south"],
];
const OPEN_ROUTE = ["north", "mammoth", "tower", "lamar", "ne"];

const ParkMap: React.FC<{ t: number; closed: number; open: number; pin?: string; pinK?: number; labels?: number }> = ({ t, closed, open, pin, pinK = 0, labels = 1 }) => {
  const seg = OPEN_ROUTE.slice(1).map((k, i) => [N[OPEN_ROUTE[i]], N[k]] as [Pt, Pt]);
  const lens = seg.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1]));
  const total = lens.reduce((a, b) => a + b, 0);
  const pathD = "M" + OPEN_ROUTE.map((k) => N[k].join(",")).join(" L");
  const label = (k: string, text: string, dx: number, dy: number, anchor: "start" | "end" | "middle" = "start", strong = false) => (
    <text x={N[k][0] + dx} y={N[k][1] + dy} textAnchor={anchor} fontFamily={HEAD} fontWeight={strong ? 800 : 700} fontSize={strong ? 46 : 38} fill={strong ? "#1f3a2a" : "#4a4a46"} opacity={labels}>
      {text}
    </text>
  );
  return (
    <g>
      <rect x={40} y={380} width={1000} height={1110} rx={36} fill="#f4f1e6" />
      <path d="M140,440 L980,430 L1010,1150 L960,1460 L160,1460 L70,1020 Z" fill="#dfe8d2" />
      <path d="M140,440 L980,430 L1010,1150 L960,1460 L160,1460 L70,1020 Z" fill="none" stroke="#b9c4a8" strokeWidth={6} strokeDasharray="18 12" />
      <ellipse cx={700} cy={1230} rx={120} ry={90} fill="#a9cde0" />
      {CLOSED_ROADS.map(([a, b], i) => (
        <line key={i} x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} stroke={closed > 0.5 ? "#b8b4aa" : "#7a6a58"} strokeWidth={14} strokeLinecap="round" strokeDasharray={closed > 0.5 ? "4 26" : undefined} />
      ))}
      <path d={pathD} fill="none" stroke="#7a6a58" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
      <path d={pathD} fill="none" stroke="#2F8F4E" strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={total} strokeDashoffset={total * (1 - open)} />
      {(["west", "south", "east"] as const).map((k) => (
        <g key={k} opacity={closed}>
          <circle cx={N[k][0]} cy={N[k][1]} r={34} fill="#D9443A" />
          <path d={`M${N[k][0] - 14},${N[k][1] - 14} L${N[k][0] + 14},${N[k][1] + 14} M${N[k][0] + 14},${N[k][1] - 14} L${N[k][0] - 14},${N[k][1] + 14}`} stroke="#fff" strokeWidth={8} strokeLinecap="round" />
        </g>
      ))}
      {(["north", "ne"] as const).map((k) => (
        <circle key={k} cx={N[k][0]} cy={N[k][1]} r={22} fill={open > 0 ? "#2F8F4E" : "#7a6a58"} stroke="#fff" strokeWidth={6} />
      ))}
      <circle cx={N.faithful[0]} cy={N.faithful[1]} r={14} fill="#4a4a46" />
      {label("north", "Gardiner", 30, -10, "start", true)}
      {label("mammoth", "Mammoth", -26, 14, "end")}
      {label("lamar", "Lamar Valley", -20, -36, "middle")}
      {label("ne", "Cooke City", -10, -40, "end")}
      {label("west", "West", 10, 70, "start")}
      {label("faithful", "Old Faithful", 0, 60, "middle")}
      {pin && (
        <g transform={`translate(${N[pin][0]},${N[pin][1] - 30 - (1 - pinK) * 80})`} opacity={pinK}>
          <path d="M0,0 C-40,-50 -40,-100 0,-100 C40,-100 40,-50 0,0 Z" fill="#D9443A" />
          <circle cx={0} cy={-66} r={14} fill="#fff" />
        </g>
      )}
      {/* small pulse on the moving route head */}
      {open > 0 && open < 1 && <circle cx={N.north[0]} cy={N.north[1]} r={30 + Math.sin(t * 8) * 6} fill="none" stroke="#2F8F4E" strokeWidth={4} />}
    </g>
  );
};

// ============ S1 HOOK WIDE: car stopped at a closed gate, snow beyond (0 - 2.7) ============
const S1: React.FC = () => {
  const t = useT();
  const brake = at(t, [0, 0.9], [0, 1], outExpo);
  const shake = at(t, [0.85, 0.95, 1.3], [0, 0.5, 0]);
  const hh = handheld(t, 0.5, shake);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, t / 2.7), rot: hh.rot };
  const g = 1240;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={g} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <Road y={g} snowOnRoad={0.2} />
        <Svg>
          <Gate x={560} y={g + 150} s={1.15} />
          <EntranceSign x={920} y={g + 120} s={0.9} text="WEST ENTRANCE" />
        </Svg>
        <Subject rimX={-5} col="rgba(240,240,240,0.7)">
          <Car x={mix(160, 330, brake)} y={g + 560} s={3} body={CAR} shade={CAR_D} lights />
        </Subject>
      </Plane>
      <Particles seed={801} n={30} col="#ffffff" fall={40} />
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Title text={"The Yellowstone\ngate was\nclosed"} t={t} t0={0} top={110} size={120} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: driving in, ready for Old Faithful (2.7 - 5.37) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: mix(1.06, 1.12, lt / 2.67), rot: hh.rot };
  const g = 1350;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={g - 40} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-300} y={g} width={1800} height={900} fill={SNOW} />
          <rect x={-300} y={g + 60} width={1800} height={160} fill="#5c6166" />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={((i * 260 - t * 500) % 1800 + 1800) % 1800 - 300} y={g + 134} width={120} height={10} fill="#e8c84a" />
          ))}
        </Svg>
        <Subject rimX={5}>
          <Car x={520} y={g + 210 + Math.sin(t * 18) * 2} s={3.4} body={CAR} shade={CAR_D} lights />
          {/* Eli at the wheel, seen through the side window */}
          <g transform={`translate(520,${g + 210}) scale(3.4)`}>
            <circle cx={30} cy={-98} r={13} fill={ELI.skin} />
            <path d="M17,-104 Q30,-118 43,-104 Z" fill={ELI.cap} />
            <rect x={36} y={-106} width={14} height={4} rx={2} fill={ELI.capShade} />
            <path d="M24,-92 Q30,-88 36,-92" stroke="#2a1a12" strokeWidth={1.6} fill="none" />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} />
      <Particles seed={802} n={16} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="255,226,190" />
      <Readout label="MID-NOVEMBER" value="West Entrance" ok={null} t={t} t0={2.9} x={80} y={200} />
      <Chip text="Next stop: Old Faithful" t={t} t0={4.0} x={80} y={420} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Eli's face, the gate is closed (5.37 - 6.71) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6, at(t, [5.4, 5.5, 5.9], [0, 0.5, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 1.34), rot: hh.rot };
  const p: HikerProps = { x: 640, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: -0.06, poles: false, handOverride: [20, 30], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={0.85} blur={6}>
        <Svg>
          <Gate x={200} y={1200} s={1.5} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(240,240,240,0.8)">
          <Person {...p} outfit={ELI} expression="tired" flip />
          <Breath p={{ ...p }} t={t} />
        </Subject>
      </Plane>
      <Particles seed={803} n={26} col="#ffffff" fall={40} />
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Chip text="Gate closed" t={t} t0={5.45} x={80} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MAP: since Nov 1, most roads closed to cars (6.71 - 11.34) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.04, lt / 4.6), rot: hh.rot };
  const closed = at(t, [7.6, 8.4], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1300} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4}>
          <ParkMap t={t} closed={closed} open={0} pin="faithful" pinK={at(t, [6.8, 7.3], [0, 1], outExpo)} />
        </Subject>
      </Plane>
      <Particles seed={804} n={12} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="236,236,236" cool="20,40,70" vignette={0.55} />
      <Readout label="SINCE NOV 1, TO CARS" value="Most roads closed" ok={false} t={t} t0={6.9} x={60} y={150} />
    </AbsoluteFill>
  );
};

// ============ S5 FIX MAP: enter at the North Entrance in Gardiner (11.34 - 14.57) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.04, lt / 3.2), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={1300} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4}>
          <ParkMap t={t} closed={1} open={0} pin="north" pinK={at(t, [12.2, 12.7], [0, 1], outExpo)} />
        </Subject>
      </Plane>
      <Particles seed={805} n={12} col="#fff3d6" fall={10} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Chip text="North Entrance, Gardiner" t={t} t0={11.6} x={80} y={150} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 WIDE: Mammoth Hot Springs, open all winter (14.57 - 17.3) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 25, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.73), rot: hh.rot };
  const g = 1300;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={g - 120} blur={3} t={t} />
      <Plane cam={cam} depth={0.8} blur={2}>
        <Svg>
          {/* travertine terraces on a hillside */}
          <path d={`M-200,${g} Q60,${g - 200} 380,${g - 300} Q640,${g - 350} 900,${g - 280} Q1150,${g - 200} 1300,${g} Z`} fill="#efe6d2" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <path d={`M${-60 + i * 80},${g - 50 - i * 52} Q450,${g - 80 - i * 58} ${1080 - i * 80},${g - 40 - i * 52}`} stroke="#d4bf98" strokeWidth={14} fill="none" strokeLinecap="round" />
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <path key={j} d={`M${80 + j * 150 + i * 20},${g - 60 - i * 56} q6,20 0,${26 + ((i + j) % 3) * 10}`} stroke="#c9a77a" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.6} />
              ))}
            </g>
          ))}
          <path d={`M300,${g - 300} Q520,${g - 320} 700,${g - 290}`} stroke="#d98b4a" strokeWidth={18} fill="none" opacity={0.45} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const k = (t * 0.2 + i / 7) % 1;
            return <circle key={i} cx={300 + (i % 3) * 140 + k * 60} cy={g - 400 - k * 380} r={40 + k * 110} fill="#ffffff" opacity={0.45 * (1 - k)} />;
          })}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-300} y={g} width={1800} height={900} fill={SNOW} />
          <rect x={-300} y={g + 60} width={1800} height={160} fill="#5c6166" />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={((i * 260 - t * 400) % 1800 + 1800) % 1800 - 300} y={g + 134} width={120} height={10} fill="#e8c84a" />
          ))}
        </Svg>
        <Subject rimX={5}>
          <Car x={640} y={g + 200} s={2.6} body={CAR} shade={CAR_D} lights />
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} />
      <Particles seed={806} n={16} col="#ffffff" fall={15} />
      <Grade sunX={800} sunY={560} warm="255,226,190" />
      <Chip text="Mammoth Hot Springs" t={t} t0={14.7} x={80} y={200} icon="check" big />
      <Chip text="Road open all winter" t={t} t0={16.0} x={80} y={330} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S7 MAP: through Lamar Valley, weather permitting (17.3 - 20.31) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.04, lt / 3), rot: hh.rot };
  const open = at(t, [17.4, 19.0], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={1300} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4}>
          <ParkMap t={t} closed={1} open={open} />
        </Subject>
      </Plane>
      <Particles seed={807} n={12} col="#fff3d6" fall={10} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Chip text="Open all year" t={t} t0={17.5} x={60} y={170} icon="check" big />
      <Chip text="Weather permitting" t={t} t0={18.9} x={540} y={180} icon="none" />
    </AbsoluteFill>
  );
};

// Phone with a road status screen held up (screen units).
const Phone: React.FC<{ x: number; y: number; rows: number }> = ({ x, y, rows }) => {
  const items: [string, string][] = [
    ["Road status", "Check today"],
    ["Gardiner to Cooke City", "Weather permitting"],
  ];
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-380} y={330} width={300} height={520} rx={90} fill={ELI.jacket} transform="rotate(-20)" />
      <rect x={-250} y={-470} width={500} height={940} rx={60} fill="#1c1f22" />
      <rect x={-224} y={-430} width={448} height={860} rx={36} fill="#f4f2ec" />
      <rect x={-224} y={-430} width={448} height={130} rx={36} fill="#2F5D3E" />
      <text x={0} y={-345} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={56} fill="#fff">
        BEFORE YOU GO
      </text>
      {items.map(([a, b], i) => (
        <g key={i} opacity={i < rows ? 1 : 0} transform={`translate(0,${-180 + i * 230})`}>
          <rect x={-200} y={-80} width={400} height={190} rx={22} fill="#ffffff" stroke="#d9d6cc" strokeWidth={6} />
          <text x={-170} y={-16} fontFamily={HEAD} fontWeight={700} fontSize={40} fill="#4a4a46">
            {a}
          </text>
          <text x={-170} y={60} fontFamily={HEAD} fontWeight={800} fontSize={52} fill="#2F5D3E">
            {b}
          </text>
        </g>
      ))}
    </g>
  );
};

// ============ S8 CLOSE-UP: check road status the morning you go (20.31 - 22.51) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.2), rot: hh.rot };
  const inK = at(t, [20.35, 21.0], [0, 1], outExpo);
  const rows = t > 21.5 ? 2 : t > 21.0 ? 1 : 0;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="h" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <Phone x={600} y={mix(1900, 1040, inK)} rows={rows} />
        </Subject>
      </Plane>
      <Particles seed={808} n={14} col="#fff3d6" fall={8} />
      <Grade sunX={760} sunY={640} warm="255,200,140" vignette={0.55} />
      <Chip text="The morning you go" t={t} t0={20.5} x={80} y={150} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF MEDIUM: bison in Lamar Valley from a safe distance (22.51 - 25.92) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 20, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.06], outExpo), rot: hh.rot };
  const g = 1400;
  const look = at(t, [22.8, 23.3], [0, 1], outExpo);
  const p: HikerProps = { x: 300, y: g + 182 * 2.3 - 130, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [mix(30, 44, look), mix(10, -118, look)], breathe: Math.sin(t * 2) * 2 };
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="i" treeY={g - 140} t={t} snow={1} woods={false} />
      <Plane cam={cam} depth={0.6} blur={1.2}>
        <Svg>
          <path d={`M-200,${g - 150} Q500,${g - 200} 1300,${g - 160} L1300,2200 L-200,2200 Z`} fill="#eef1ee" />
          <path d={`M300,${g - 120} Q700,${g - 100} 1250,${g - 130}`} stroke="#9fb7c6" strokeWidth={14} fill="none" />
          <Bison x={760} y={g - 70} s={0.32} head={0} t={t} />
          <Bison x={960} y={g - 90} s={0.24} head={0.4} t={t + 1} />
          <Bison x={600} y={g - 95} s={0.22} head={0} t={t + 2} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-300} y={g} width={1800} height={900} fill={SNOW} />
          <path d={`M-300,${g + 4} Q500,${g - 14} 1500,${g + 4}`} stroke="#ffffff" strokeWidth={14} fill="none" />
          <Car x={-60} y={g + 240} s={2.6} body={CAR} shade={CAR_D} />
        </Svg>
        <Subject rimX={6} col="rgba(255,190,120,0.9)">
          <Person {...p} outfit={ELI} expression="happy" />
          <g transform={hikerTransform(p)}>
            <g transform={`translate(${h[0] + 4},${h[1] - 10})`} opacity={look}>
              <rect x={-6} y={-12} width={16} height={22} rx={5} fill="#1f2222" />
              <rect x={-6} y={6} width={16} height={22} rx={5} fill="#2a2e2e" />
            </g>
          </g>
        </Subject>
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={809} n={24} col="#ffe7b8" />
      <Grade sunX={760} sunY={640} warm="255,180,100" />
      <Chip text="Lamar Valley" t={t} t0={22.7} x={80} y={200} icon="check" big />
      <Readout label="BISON" value="Stay 25+ yards away" ok={true} t={t} t0={24.0} x={80} y={330} />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/yellowstone-grand-teton-trip-planning-guide.jpg"
      photoH={800}
      spec="30 PAGES · PRINTABLE PDF"
      name={
        <>
          Yellowstone &amp;
          <br />
          Grand Teton Guide
        </>
      }
      nameSize={96}
      price="$9.99"
      save="Save this before your winter trip"
    />
  );
};

export const V80: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.75} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.7} to={5.42} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.7} />
    </Scene>
    <Scene from={5.37} to={6.76} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.37} />
    </Scene>
    <Scene from={6.71} to={11.39} fadeIn={0.08} fadeOut={0.1}>
      <S4 off={6.71} />
    </Scene>
    <Scene from={11.34} to={14.62} fadeIn={0.1} fadeOut={0.08}>
      <S5 off={11.34} />
    </Scene>
    <Scene from={14.57} to={17.35} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.57} />
    </Scene>
    <Scene from={17.3} to={20.36} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={17.3} />
    </Scene>
    <Scene from={20.31} to={22.56} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={20.31} />
    </Scene>
    <Scene from={22.51} to={26.0} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={22.51} />
    </Scene>
    <Scene from={25.75} to={30} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 5.37, 1560],
        [5.37, 6.71, 1560],
        [6.71, 11.34, 1560],
        [11.34, 14.57, 1560],
        [14.57, 20.31, 1560],
        [20.31, 22.51, 1560],
        [22.51, 25.75, 1560],
      ]}
    />
  </AbsoluteFill>
);
