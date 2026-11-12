// V144: "The border was closed for the night." in the cinematic C01 style. Launch story for the Glacier & Canadian Rockies Pair
// (Glacier and Banff & Jasper Trip Planning Guides, $16.99, live Shopify). Facts kept general and true: the small US-Canada
// crossings near Glacier National Park keep limited daily hours, and some are seasonal; check the border hours before you leave;
// every traveller needs a passport or another accepted travel document; plan your nights around the crossing you will use.
// No specific hours, names of crossings or official logos on screen. The map is a simple hand-drawn diagram.
// End card = real Shopify cover (products/glacier-canadian-rockies-pair.jpg, boxed photo card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, HEAD, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, Haze, handheld, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Backdrop, Subject } from "../fall";
import { Desk, INK, PAPER } from "../trip";
import vo from "../vo/v144.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const NIGHT: Sky = { top: "#0f182c", mid: "#1f2c48", low: "#3a4864", sun: [820, 360], sunR: 24, sunCol: "#eef0f4", glow: "#7d8cab" };
const SUMMER: Sky = { top: "#3f74a6", mid: "#a6c8e2", low: "#f2e6c4", sun: [800, 520], sunR: 52, sunCol: "#fff8e0", glow: "#ffe1a0" };
const LAMP = "255,214,170";
const RED = "#c23a32";
const GREEN = "#2f8a55";
const CAR = "#C9A23A";
const CAR2 = "#a0801f";

const NINA: Outfit = {
  ...JAKE,
  skin: "#8D5A3E",
  skinShade: "#734631",
  hair: "#1c130e",
  ponytail: "#1c130e",
  beard: null,
  cap: "#3E6B8A",
  capShade: "#2C4F69",
  jacket: "#2F6B5A",
  jacketShade: "#225044",
  pants: "#4a4540",
  pantsShade: "#36322e",
  pack: "#B5553A",
  packShade: "#8E3F2A",
  glove: null,
};

const Stars: React.FC<{ k?: number }> = ({ k = 1 }) => (
  <Svg>
    {Array.from({ length: 50 }, (_, i) => (
      <circle key={i} cx={(i * 263) % 1080} cy={40 + ((i * 151) % 760)} r={1.5 + (i % 3)} fill="#f4f1e6" opacity={(0.4 + (i % 4) * 0.13) * k} />
    ))}
  </Svg>
);

// Night mountains: sky, stars, dark ridges and a dark tree line.
const NightBackdrop: React.FC<{ cam: Cam; uid: string; treeY: number; t: number; blur?: number }> = ({ cam, uid, treeY, blur = 0 }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.5}>
      <SkyPlane sky={NIGHT} uid={uid} />
      <Stars />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2.4 + blur}>
      <Ridge seed={43} base={treeY - 280} amp={380} scale={240} col="#2a3650" lit="#b9c2d4" peak={120} />
    </Plane>
    <Haze y={treeY - 380} h={300} col={NIGHT.low} opacity={0.4} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={49} base={treeY - 100} amp={220} scale={180} col="#1c2638" />
    </Plane>
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Svg>
        {Array.from({ length: 12 }, (_, i) => {
          const x = ((((-160 + i * 150 - cam.x * 0.2) % 1800) + 1800) % 1800) - 300;
          return <Pine key={i} x={x} y={treeY + (i % 2) * 20} h={380 + (i % 3) * 90} c="#142019" c2="#0e1812" />;
        })}
      </Svg>
    </Plane>
  </>
);

// Small border post: booth, a sign and the gate arm (up = 0 down, 1 raised). Generic, no official marks.
const BorderPost: React.FC<{ y: number; up: number; night: boolean; t: number; signX?: number }> = ({ y, up, night, t, signX = 330 }) => (
  <Svg>
    {/* road */}
    <rect x={-400} y={y - 20} width={1880} height={1400} fill={night ? "#1d2229" : "#8a8f7a"} />
    <path d={`M330,${y - 20} L760,${y - 20} L1300,2300 L-300,2300 Z`} fill={night ? "#2b3036" : "#5c6166"} />
    <path d={`M540,${y - 20} L548,${y - 20} L620,2300 L560,2300 Z`} fill="#e9d36a" opacity={night ? 0.6 : 1} />
    {/* booth */}
    <g transform={`translate(860,${y - 20})`}>
      <rect x={-130} y={-330} width={260} height={330} fill={night ? "#3a4048" : "#d9d4c4"} />
      <rect x={-160} y={-370} width={320} height={50} rx={8} fill={night ? "#2a2f36" : "#6b6f75"} />
      <rect x={-90} y={-270} width={180} height={120} rx={8} fill={night ? "#1a1f26" : "#cfe3ee"} />
      <rect x={-40} y={-140} width={80} height={140} fill={night ? "#262b31" : "#8e8a7c"} />
    </g>
    {/* sign */}
    <g transform={`translate(${signX},${y - 330})`}>
      <rect x={-6} y={100} width={18} height={220} fill="#6a6a6a" />
      <rect x={-170} y={-20} width={340} height={130} rx={10} fill={night ? RED : GREEN} />
      <text x={0} y={36} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#fff" letterSpacing={2}>
        BORDER CROSSING
      </text>
      <text x={0} y={90} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#fff" letterSpacing={3}>
        {night ? "CLOSED" : "OPEN"}
      </text>
    </g>
    {/* gate arm pivoting at the right post */}
    <rect x={700} y={y - 150} width={30} height={150} fill="#6a6a6a" />
    <g transform={`rotate(${up * 70} 715 ${y - 135})`}>
      <rect x={220} y={y - 150} width={510} height={30} rx={8} fill="#f4f4f4" />
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x={240 + i * 96} y={y - 150} width={48} height={30} fill={RED} />
      ))}
      <circle cx={232} cy={y - 135} r={10} fill={night ? `rgba(255,80,60,${0.6 + 0.4 * Math.sin(t * 6)})` : "#c9c9c9"} />
    </g>
  </Svg>
);

// Headlight beams on the ground in front of the car (screen coords).
const Beams: React.FC<{ x: number; y: number; k: number }> = ({ x, y, k }) => (
  <Svg>
    <defs>
      <linearGradient id="beamG" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff6c8" stopOpacity={0.55 * k} />
        <stop offset="1" stopColor="#fff6c8" stopOpacity={0} />
      </linearGradient>
    </defs>
    <path d={`M${x},${y - 30} L${x + 700},${y - 160} L${x + 700},${y + 120} Z`} fill="url(#beamG)" />
  </Svg>
);

// Hand-drawn diagram: Glacier, the border, two small crossings with clocks, the road north to Banff.
const BorderMap: React.FC<{ road: number; clocks: number; t: number }> = ({ road, clocks, t }) => {
  const label = (lx: number, ly: number, s: string, size = 34, col = INK, anchor: "start" | "middle" | "end" = "middle") => (
    <text x={lx} y={ly} textAnchor={anchor} fontFamily={HEAD} fontWeight={800} fontSize={size} fill={col} letterSpacing={2}>
      {s}
    </text>
  );
  const ROAD = "M540,1250 Q560,1100 470,980 Q400,880 520,780 Q620,700 600,560 Q590,500 640,470";
  const clock = (cx: number, cy: number, k: number, tag: string) => (
    <g opacity={k} transform={`translate(${cx},${cy}) scale(${mix(1.4, 1, k)})`}>
      <circle r={44} fill="#fff" stroke={RED} strokeWidth={8} />
      <path d={`M0,0 L0,-26 M0,0 L${Math.sin(t * 2) * 18},${-Math.cos(t * 2) * 18}`} stroke={INK} strokeWidth={7} strokeLinecap="round" />
      <text x={64} y={14} fontFamily={HEAD} fontWeight={800} fontSize={32} fill={RED} letterSpacing={1}>
        {tag}
      </text>
    </g>
  );
  return (
    <g transform="rotate(2 540 900)">
      <rect x={100} y={420} width={880} height={900} rx={12} fill={PAPER} />
      <rect x={100} y={420} width={880} height={900} rx={12} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={4} />
      {[
        [260, 1150, 50],
        [800, 1180, 56],
        [880, 700, 44],
        [220, 640, 46],
      ].map(([px, py, h], i) => (
        <path key={i} d={`M${px - h},${py} L${px},${py - h * 1.3} L${px + h},${py} Z`} fill="#c9c3b4" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      ))}
      {/* border line */}
      <path d="M120,900 L960,900" stroke={INK} strokeWidth={6} strokeDasharray="26 18" />
      {label(950, 880, "CANADA", 30, INK, "end")}
      {label(950, 945, "USA", 30, INK, "end")}
      {/* road */}
      <path d={ROAD} stroke={INK} strokeWidth={10} fill="none" opacity={0.2} />
      <path d={ROAD} stroke={INK} strokeWidth={10} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - road} strokeLinecap="round" />
      <circle cx={540} cy={1250} r={16} fill={INK} />
      <circle cx={640} cy={470} r={16} fill={INK} />
      {label(540, 1300, "GLACIER", 36)}
      {label(760, 480, "TO BANFF", 34)}
      {/* crossings on the border */}
      <circle cx={440} cy={900} r={14} fill={RED} />
      <circle cx={700} cy={900} r={14} fill={RED} />
      {clock(300, 820, at(clocks, [0, 0.4], [0, 1]), "SHORT")}
      {clock(640, 1010, at(clocks, [0.5, 0.9], [0, 1]), "SEASONAL")}
    </g>
  );
};

// Trip checklist on paper: three lines that tick off (k1..k3 0..1).
const Checklist: React.FC<{ k: number[] }> = ({ k }) => {
  const items = ["Border hours", "Passports for all", "Nights booked"];
  return (
    <g transform="rotate(-2 540 960)">
      <rect x={150} y={520} width={780} height={820} rx={12} fill={PAPER} />
      <text x={210} y={640} fontFamily={HEAD} fontWeight={800} fontSize={70} fill={INK} letterSpacing={2}>
        BEFORE WE DRIVE
      </text>
      <path d="M210,670 L860,670" stroke={INK} strokeWidth={4} opacity={0.4} />
      {items.map((s, i) => (
        <g key={i} transform={`translate(220,${790 + i * 170})`}>
          <rect x={0} y={-60} width={80} height={80} rx={12} fill="none" stroke={INK} strokeWidth={7} />
          <path d="M14,-22 L36,4 L74,-56" stroke={GREEN} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - (k[i] ?? 0)} />
          <text x={120} y={6} fontFamily={HEAD} fontWeight={700} fontSize={62} fill={INK}>
            {s}
          </text>
        </g>
      ))}
    </g>
  );
};

// Generic passport booklet (screen coords).
const Passport: React.FC<{ x: number; y: number; rot?: number; col: string; s?: number }> = ({ x, y, rot = 0, col, s = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-130} y={-180} width={260} height={360} rx={18} fill={col} />
    <rect x={-130} y={-180} width={260} height={360} rx={18} fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth={6} />
    <circle cx={0} cy={-20} r={56} fill="none" stroke="#d9c27a" strokeWidth={8} />
    <path d="M-30,-20 L30,-20 M0,-50 L0,10" stroke="#d9c27a" strokeWidth={8} />
    <text x={0} y={110} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#d9c27a" letterSpacing={6}>
      PASSPORT
    </text>
  </g>
);

// ============ S1 HOOK WIDE: night, Nina's car stops at a closed border crossing (0 - 3.49) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.03, 1.1, t / 3.49), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 500, y: g + 300, scale: 2.2, walk: 0, lean: -0.02, poles: false, handOverride: [26, -30], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <NightBackdrop cam={cam} uid="a" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <BorderPost y={g} up={0} night t={t} signX={190} />
        <Svg>
          <Car x={130} y={g + 260} s={2.2} body={CAR} shade={CAR2} lights />
        </Svg>
        <Beams x={420} y={g + 130} k={1} />
        <Subject rimX={6} col="rgba(255,240,200,0.8)">
          <Person {...p} outfit={NINA} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0e1812" side="right" />
      </Plane>
      <Particles seed={1441} n={14} col="#fff3d6" fall={2} />
      <LowScrim />
      <Grade sunX={600} sunY={1300} warm="255,236,200" cool="20,30,60" vignette={0.6} />
      <Title text={"The border was\nclosed for\nthe night."} t={t} t0={0} top={100} size={120} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the gate arm down in the headlights, red light blinking (3.49 - 7.0) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3, at(t, [5.99, 6.1, 6.5], [0, 1, 0]) * 3);
  const cam: Cam = { x: hh.x - 200 + lt * 20, y: hh.y + 350, zoom: mix(1.45, 1.55, lt / 3.51), rot: hh.rot };
  const g = 1500;
  return (
    <AbsoluteFill>
      <NightBackdrop cam={cam} uid="b" treeY={g - 160} t={t} blur={6} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,240,200,0.6)">
          <BorderPost y={g} up={0} night t={t} signX={190} />
        </Subject>
        <Beams x={-300} y={g - 60} k={1} />
      </Plane>
      <Particles seed={1442} n={10} col="#fff3d6" fall={2} />
      <LowScrim />
      <Grade sunX={300} sunY={1300} warm="255,236,200" cool="20,30,60" vignette={0.6} />
      <Chip text="Small crossing near the park" t={t} t0={3.9} x={60} y={200} icon="none" big />
      <Chip text="Gate down" t={t} t0={6.0} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the fix on the map: crossings near Glacier keep short or seasonal hours (7.0 - 11.5) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 4.5), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <BorderMap road={at(t, [8.1, 9.4], [0, 1])} clocks={at(t, [9.8, 11.2], [0, 1])} t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1443} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={8.1} top={200} size={124} />
      <Chip text="Crossings near Glacier" t={t} t0={8.45} x={60} y={200} icon="none" big />
      <Chip text="Short or seasonal hours" t={t} t0={10.3} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: Nina at her laptop, checking the border hours before she leaves (11.5 - 14.18) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.68), rot: hh.rot };
  const g = 1620;
  const p: HikerProps = { x: 330, y: g, scale: 2.4, walk: 0, lean: 0.2, poles: false, handOverride: [80, -10], breathe: Math.sin(t * 2) * 1.2 };
  const scroll = at(t, [11.8, 13.6], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#2b2620" }}>
      <Plane cam={cam} depth={0.4} blur={8}>
        <Svg>
          <rect x={-200} y={0} width={1500} height={1300} fill="#4a4238" />
          <rect x={620} y={260} width={360} height={460} rx={10} fill="#1f2a3a" />
          <rect x={640} y={280} width={320} height={420} fill="#2c3e5a" />
          <Stars k={0.5} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,180,0.8)">
          <Person {...p} outfit={NINA} expression="neutral" />
        </Subject>
        <Svg>
          <rect x={-200} y={g - 120} width={1500} height={60} fill="#6e4c34" />
          <rect x={-200} y={g - 60} width={1500} height={600} fill="#55392a" />
          {/* laptop */}
          <g transform={`translate(700,${g - 120})`}>
            <path d="M-230,0 L230,0 L250,24 L-250,24 Z" fill="#9aa3a6" />
            <rect x={-210} y={-300} width={420} height={300} rx={14} fill="#2a2f36" />
            <rect x={-192} y={-282} width={384} height={264} rx={6} fill="#f5f3ee" />
            <text x={-170} y={-230} fontFamily={HEAD} fontWeight={800} fontSize={40} fill={INK}>
              BORDER HOURS
            </text>
            {[0, 1, 2].map((i) => (
              <g key={i} opacity={at(scroll, [i * 0.25, i * 0.25 + 0.2], [0, 1])}>
                <rect x={-170} y={-200 + i * 60} width={230} height={22} rx={6} fill="#d6d2c8" />
                <rect x={80} y={-206 + i * 60} width={90} height={34} rx={17} fill={i === 1 ? "#b8862c" : GREEN} />
              </g>
            ))}
          </g>
        </Svg>
      </Plane>
      <Particles seed={1444} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={900} warm={LAMP} vignette={0.6} />
      <Chip text="Check the border hours" t={t} t0={11.65} x={60} y={200} icon="check" big />
      <Chip text="Before you leave" t={t} t0={12.9} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: a passport for everyone in the car (14.18 - 18.94) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + lt * 8, y: hh.y, zoom: mix(1.02, 1.08, lt / 4.76), rot: hh.rot };
  const a = at(t, [14.5, 15.1], [0, 1], outExpo);
  const b = at(t, [17.4, 18.0], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <g transform={`translate(0,${(1 - a) * 900})`}>
              <Passport x={420} y={1000} rot={-8} col="#1f3352" s={1.3} />
            </g>
            <g transform={`translate(${(1 - b) * 900},0)`}>
              <Passport x={700} y={1060} rot={6} col="#6a1f2a" s={1.3} />
              {/* hand placing it */}
              <path d="M900,1080 Q860,1040 830,1060 L790,1120 Q800,1160 850,1150 L1200,1180 L1200,1050 Z" fill={NINA.skin} opacity={1 - at(t, [18.3, 18.7], [0, 1])} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1445} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Chip text="Passport or accepted document" t={t} t0={14.8} x={60} y={200} icon="check" big />
      <Chip text="For everyone in the car" t={t} t0={17.45} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the checklist ticks off, nights booked around the crossing (18.94 - 21.42) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.0, lt / 2.48), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <Checklist k={[1, 1, at(t, [19.6, 20.2], [0, 1])]} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1446} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Chip text="Book nights around your crossing" t={t} t0={19.1} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: next summer, daylight, the gate is up and Nina crosses (21.42 - 24.0) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 165, y: g + 320, scale: 2.0, walk: 0, lean: -0.02, poles: false, handOverride: [30, 20], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SUMMER} uid="g" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <BorderPost y={g} up={at(t, [21.6, 22.4], [0, 1], outExpo)} night={false} t={t} signX={420} />
        <Svg>
          <Car x={mix(380, 560, at(t, [22.3, 24.0], [0, 1]))} y={g + 260} s={2.2} body={CAR} shade={CAR2} />
        </Svg>
        <Subject rimX={6} col="rgba(255,236,190,0.9)">
          <Person {...p} outfit={NINA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2c4a2e" side="right" />
      </Plane>
      <Rays x={SUMMER.sun[0]} y={SUMMER.sun[1]} strength={0.4} />
      <Particles seed={1447} n={20} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={800} sunY={520} warm="255,232,190" />
      <Readout label="NEXT SUMMER" value="Crossed in daylight" ok={true} t={t} t0={21.6} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/glacier-canadian-rockies-pair.jpg"
      photoH={800}
      spec="2 GUIDES · GLACIER + BANFF & JASPER"
      name={
        <>
          Glacier & Canadian
          <br />
          Rockies Pair
        </>
      }
      nameSize={92}
      price="$16.99"
      save="Save this while you plan"
    />
  );
};

export const V144: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.54} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.49} to={7.05} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.49} />
    </Scene>
    <Scene from={7.0} to={11.55} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={7.0} />
    </Scene>
    <Scene from={11.5} to={14.23} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={11.5} />
    </Scene>
    <Scene from={14.18} to={18.99} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={14.18} />
    </Scene>
    <Scene from={18.94} to={21.47} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={18.94} />
    </Scene>
    <Scene from={21.42} to={24.1} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={21.42} />
    </Scene>
    <Scene from={23.95} to={28} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.49, 1600],
        [3.49, 7.0, 1660],
        [7.0, 11.5, 1660],
        [11.5, 14.18, 1660],
        [14.18, 18.94, 1660],
        [18.94, 21.42, 1660],
        [21.42, 23.95, 1600],
      ]}
    />
  </AbsoluteFill>
);
