// V225: "Old Faithful road? Closed to cars." Short format (17.3 s, 43 words), cinematic C01 style, Yellowstone in January.
// Product: Yellowstone & Grand Teton — Trip Planning Guide, $9.99 (live Shopify). End card: store cover photo (boxed, like V66 / V80).
// Facts (NPS, as in V80): in winter most park roads close to regular cars; only the road from the North Entrance (Gardiner) to the
// Northeast Entrance (Cooke City) stays open to cars, weather permitting. Old Faithful in winter is reached by guided snowcoach or
// snowmobile tours, which should be booked ahead. Map is a simple schematic, not to scale. No prices or dates.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, rim, Svg } from "../cine";
import { SNOW, SNOW2, STORM, WGOLD, WINTER, WinterBackdrop } from "../winter";
import { Breath } from "../fall";
import vo from "../vo/v225.json";

const words = vo.words as unknown as Word[];

const MIKE: Outfit = {
  ...JAKE,
  skin: "#E0A788",
  skinShade: "#C2866A",
  hair: "#3a2a1e",
  beard: "#3a2a1e",
  cap: "#2F3B45",
  capShade: "#222c34",
  jacket: "#B83A3A",
  jacketShade: "#8f2c2c",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  pack: "#3F6B55",
  packShade: "#2D5141",
  glove: "#2a2a2a",
};

const CAR = "#3F6E8C";
const CAR_D = "#2f566e";

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
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
        TO CARS IN WINTER
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

// Tracked winter snowcoach (side view, facing right). (x, y) = ground under the middle.
const Snowcoach: React.FC<{ x: number; y: number; s?: number; t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={170} ry={12} fill="rgba(0,0,0,0.22)" />
    {/* tracks */}
    <rect x={-160} y={-48} width={320} height={46} rx={23} fill="#2a2d30" />
    {Array.from({ length: 12 }, (_, i) => (
      <rect key={i} x={-150 + ((i * 28 + t * 120) % 300)} y={-46} width={8} height={42} fill="#44494d" />
    ))}
    {[-120, -60, 0, 60, 120].map((wx) => (
      <circle key={wx} cx={wx} cy={-25} r={15} fill="#5c6166" />
    ))}
    {/* body */}
    <path d="M-150,-52 L-150,-160 Q-148,-176 -130,-178 L110,-178 Q128,-176 136,-160 L160,-110 L160,-52 Z" fill="#D9A43A" />
    <rect x={-150} y={-74} width={310} height={22} fill="#b7862a" />
    {[-128, -66, -4, 58].map((wx) => (
      <rect key={wx} x={wx} y={-162} width={50} height={52} rx={6} fill="#cfe3ee" />
    ))}
    <path d="M112,-162 L130,-162 L150,-112 L112,-112 Z" fill="#cfe3ee" />
    <rect x={150} y={-100} width={10} height={12} rx={3} fill="#fff6c8" />
    {/* skis at the front */}
    <path d="M110,-6 L190,-6 Q206,-8 210,-24" stroke="#1f2222" strokeWidth={8} fill="none" strokeLinecap="round" />
    <rect x={-150} y={-188} width={290} height={12} rx={6} fill={SNOW} />
  </g>
);

// Steam plume of a geyser (screen units), h = 0..1 eruption height.
const Geyser: React.FC<{ x: number; y: number; h: number; t: number }> = ({ x, y, h, t }) => (
  <g>
    <path d={`M${x - 40},${y} Q${x - 20},${y - 340 * h} ${x - 80},${y - 620 * h} L${x + 80},${y - 620 * h} Q${x + 20},${y - 340 * h} ${x + 40},${y} Z`} fill="#ffffff" opacity={0.95} />
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const k = (t * 0.25 + i / 6) % 1;
      return <circle key={i} cx={x + Math.sin(i * 2 + t) * 40 + k * 120} cy={y - 560 * h - k * 300} r={90 + k * 150} fill="#ffffff" opacity={0.7 * (1 - k) * h} />;
    })}
    <ellipse cx={x} cy={y} rx={120} ry={18} fill="#e9e2d2" />
  </g>
);

// Phone with a tour booking screen (screen units).
const BookPhone: React.FC<{ x: number; y: number; rows: number }> = ({ x, y, rows }) => {
  const items: [string, string][] = [
    ["Snowcoach tour", "Old Faithful"],
    ["Status", "Booked"],
  ];
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-380} y={330} width={300} height={520} rx={90} fill={MIKE.jacket} transform="rotate(-20)" />
      <rect x={-250} y={-470} width={500} height={940} rx={60} fill="#1c1f22" />
      <rect x={-224} y={-430} width={448} height={860} rx={36} fill="#f4f2ec" />
      <rect x={-224} y={-430} width={448} height={130} rx={36} fill="#2F5D3E" />
      <text x={0} y={-345} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={56} fill="#fff">
        WINTER TOUR
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
      <ellipse cx={240} cy={300} rx={70} ry={90} fill={MIKE.glove ?? "#2a2a2a"} />
    </g>
  );
};

// ============ S1 HOOK WIDE: the car stops at a closed gate in the snow (0 - 2.4) ============
const S1: React.FC = () => {
  const t = useT();
  const brake = at(t, [0, 0.9], [0, 1], outExpo);
  const shake = at(t, [0.85, 0.95, 1.3], [0, 0.5, 0]);
  const hh = handheld(t, 0.5, shake);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, t / 2.4), rot: hh.rot };
  const g = 1240;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={g} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <Road y={g} snowOnRoad={0.6} />
        <Svg>
          <Gate x={560} y={g + 150} s={1.15} />
          <EntranceSign x={920} y={g + 120} s={0.9} text="WEST ENTRANCE" />
        </Svg>
        <Subject rimX={-5} col="rgba(240,240,240,0.7)">
          <Car x={mix(160, 330, brake)} y={g + 560} s={3} body={CAR} shade={CAR_D} lights />
        </Subject>
      </Plane>
      <Particles seed={2251} n={30} col="#ffffff" fall={40} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Title text={"Old Faithful\nroad? Closed\nto cars."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: Mike's face, the gate behind him (2.4 - 4.05) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6, at(t, [2.45, 2.55, 2.9], [0, 0.4, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 1.65), rot: hh.rot };
  const p: HikerProps = { x: 640, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: -0.06, poles: false, handOverride: [20, 30], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={0.85} blur={6}>
        <Svg>
          <Gate x={200} y={1200} s={1.5} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(240,240,240,0.8)">
          <Person {...p} outfit={MIKE} expression="tired" flip />
          <Breath p={{ ...p }} t={t} />
        </Subject>
      </Plane>
      <Particles seed={2252} n={26} col="#ffffff" fall={40} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Chip text="January" t={t} t0={2.5} x={80} y={200} icon="none" big />
      <Chip text="No way to Old Faithful" t={t} t0={3.1} x={80} y={330} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 MAP: most roads closed to cars in winter (4.05 - 7.4) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.04, lt / 3.4), rot: hh.rot };
  const closed = at(t, [4.7, 5.5], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={1300} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4}>
          <ParkMap t={t} closed={closed} open={0} pin="faithful" pinK={at(t, [4.1, 4.6], [0, 1], outExpo)} />
        </Subject>
      </Plane>
      <Particles seed={2253} n={12} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="236,236,236" cool="20,40,70" vignette={0.55} />
      <Readout label="IN WINTER, TO CARS" value="Most roads closed" ok={false} t={t} t0={4.2} x={60} y={150} />
    </AbsoluteFill>
  );
};

// ============ S4 MAP: only North to Northeast stays open (7.4 - 10.5) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.04, lt / 3.1), rot: hh.rot };
  const open = at(t, [7.6, 9.4], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1300} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4}>
          <ParkMap t={t} closed={1} open={open} />
        </Subject>
      </Plane>
      <Particles seed={2254} n={12} col="#fff3d6" fall={10} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Chip text="Open to cars" t={t} t0={7.5} x={60} y={170} icon="check" big />
      <Chip text="North to Northeast only" t={t} t0={8.4} x={60} y={300} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the rule: book the snowcoach tour ahead (10.5 - 12.2) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.7), rot: hh.rot };
  const inK = at(t, [10.5, 11.0], [0, 1], outExpo);
  const rows = t > 11.5 ? 2 : t > 11.1 ? 1 : 0;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="e" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <BookPhone x={600} y={mix(1900, 1000, inK)} rows={rows} />
        </Subject>
      </Plane>
      <Particles seed={2255} n={14} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,200,140" vignette={0.55} />
      <Chip text="The rule" t={t} t0={10.6} x={80} y={150} icon="none" big />
      <Chip text="Book a tour ahead" t={t} t0={11.3} x={80} y={280} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 WIDE: the snowcoach rolls past Old Faithful erupting (12.2 - 13.95) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 25, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.8), rot: hh.rot };
  const g = 1300;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="f" treeY={g - 120} blur={3} t={t} />
      <Plane cam={cam} depth={0.7} blur={1.5}>
        <Svg>
          <path d={`M-200,${g - 60} Q500,${g - 90} 1300,${g - 60} L1300,2200 L-200,2200 Z`} fill="#eef1ee" />
          <Geyser x={760} y={g - 70} h={at(t, [12.2, 13.0], [0.5, 1], outExpo)} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-300} y={g} width={1800} height={900} fill={SNOW} />
          <rect x={-300} y={g + 60} width={1800} height={160} fill={SNOW2} />
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={((i * 200 - t * 400) % 2000 + 2000) % 2000 - 300} y={g + 120 + (i % 2) * 40} width={80} height={8} rx={4} fill="#c3ccd2" />
          ))}
        </Svg>
        <Subject rimX={5} col="rgba(255,214,150,0.9)">
          <Snowcoach x={420 + lt * 30} y={g + 200} s={2.4} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={2256} n={18} col="#ffe7b8" fall={6} />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,190,120" />
      <Chip text="Snowcoach or snowmobile" t={t} t0={12.3} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

const S7: React.FC = () => {
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
      save="Save this for your winter trip"
    />
  );
};

export const V225: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.48} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.4} to={4.13} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.4} />
    </Scene>
    <Scene from={4.05} to={7.48} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={4.05} />
    </Scene>
    <Scene from={7.4} to={10.58} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.4} />
    </Scene>
    <Scene from={10.5} to={12.28} fadeIn={0.06} fadeOut={0.08}>
      <S5 off={10.5} />
    </Scene>
    <Scene from={12.2} to={14.03} fadeIn={0.06} fadeOut={0.1}>
      <S6 off={12.2} />
    </Scene>
    <Scene from={13.95} to={17.3} fadeOut={0}>
      <S7 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.4, 1600],
        [2.4, 4.05, 1600],
        [4.05, 7.4, 1600],
        [7.4, 10.5, 1600],
        [10.5, 12.2, 1600],
        [12.2, 13.95, 1600],
      ]}
    />
  </AbsoluteFill>
);
