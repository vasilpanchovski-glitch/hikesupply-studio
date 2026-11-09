// V120: "He booked Glacier for June 10. The top was still snow." in the cinematic C01 style. Launch story for the Glacier
// National Park Trip Planning Guide ($9.99, live Shopify). Facts as NPS gives them: the alpine section of Going-to-the-Sun
// Road is plowed every spring and usually opens fully between mid-June and early July; the date is not known in advance.
// Mid-July to mid-September is the season for the whole road and most trails. Lower-park options in June: Lake McDonald,
// Avalanche Lake (Trail of the Cedars) and Many Glacier. No invented numbers on screen.
// End card = real Shopify cover (products/glacier-national-park-trip-planning-guide.jpg, boxed photo card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, Haze, handheld, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { Room, WindowView } from "../home";
import { Calendar, Desk, INK, PAPER, Wildflowers } from "../trip";
import { SNOW, SNOW2, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v120.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const EVE: Sky = { top: "#2a3a5c", mid: "#6a7a96", low: "#c9b8a8", sun: [800, 620], sunR: 30, sunCol: "#f6efe0", glow: "#d8c0a8" };
const SUMMER: Sky = { top: "#3a6a98", mid: "#9fc2dc", low: "#f4e2bc", sun: [790, 560], sunR: 52, sunCol: "#fff6dc", glow: "#ffd79a" };
const GOLDEN: Sky = { top: "#4a6890", mid: "#e5b487", low: "#ffdca6", sun: [740, 660], sunR: 62, sunCol: "#fff4d8", glow: "#ffc274" };
const LAMP = "255,200,140";

const MARCUS: Outfit = {
  ...JAKE,
  skin: "#8A5A3E",
  skinShade: "#6E452E",
  hair: "#1a120c",
  beard: "#1a120c",
  cap: "#B83A55",
  capShade: "#8E2B42",
  jacket: "#3f6e8c",
  jacketShade: "#2f5670",
  pants: "#4a4f57",
  pantsShade: "#363a40",
  pack: "#c9662e",
  packShade: "#a04f22",
  glove: null,
};
const MARCUS_S: Outfit = { ...MARCUS, jacket: "#E3B23C", jacketShade: "#b88d26" };

// Road under snow: asphalt band ending in a tall snow wall, with a closed gate.
const SnowRoad: React.FC<{ y: number; gate?: boolean }> = ({ y, gate = true }) => (
  <Svg>
    <rect x={-400} y={y - 30} width={1880} height={1400} fill={SNOW2} />
    <path d={`M180,${y - 30} L900,${y - 30} L1400,2300 L-300,2300 Z`} fill="#5c6166" />
    <path d={`M538,${y - 30} L544,${y - 30} L600,2300 L540,2300 Z`} fill="#e9d36a" />
    {/* the snow wall across the road */}
    <path d={`M120,${y - 30} L120,${y - 250} Q300,${y - 300} 520,${y - 270} Q760,${y - 310} 960,${y - 260} L960,${y - 30} Z`} fill={SNOW} />
    {Array.from({ length: 6 }, (_, i) => (
      <line key={i} x1={140} y1={y - 60 - i * 34} x2={940} y2={y - 64 - i * 34} stroke={SNOW2} strokeWidth={6} opacity={0.8} />
    ))}
    {gate && (
      <g transform={`translate(540,${y + 60})`}>
        <rect x={-330} y={-120} width={24} height={120} fill="#6a6a6a" />
        <rect x={-330} y={-120} width={660} height={28} rx={8} fill="#f4f4f4" />
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} x={-310 + i * 94} y={-120} width={46} height={28} fill="#c23a32" />
        ))}
        <rect x={-150} y={-250} width={300} height={100} rx={10} fill="#c23a32" />
        <text x={0} y={-186} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={54} fill="#fff" letterSpacing={3}>
          ROAD CLOSED
        </text>
        <rect x={-8} y={-150} width={16} height={30} fill="#6a6a6a" />
      </g>
    )}
  </Svg>
);

// ============ S1 HOOK WIDE: the road stops at a snow wall, Marcus at the gate (0 - 2.67) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.1, t / 2.67), rot: hh.rot };
  const g = 1540;
  const p: HikerProps = { x: 300, y: g + 250, scale: 2.4, walk: 0, lean: -0.04, poles: false, breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowRoad y={g} />
        <Subject rimX={6} col="rgba(240,246,255,0.85)">
          <Person {...p} outfit={MARCUS} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" />
      </Plane>
      <Particles seed={1201} n={22} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="245,244,236" cool="40,60,90" />
      <Title text={"He booked Glacier\nfor June 10.\nThe top was\nstill snow."} t={t} t0={0} top={100} size={106} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: June 10 circled on the calendar, "Sun Road day" (2.67 - 5.37) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 2.7), rot: hh.rot };
  const k = at(t, [2.9, 3.7], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#cbb89a" />
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={-200 + i * 120} y={-200} width={4} height={2400} fill="rgba(0,0,0,0.05)" />
          ))}
        </Svg>
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <Calendar x={150} y={430} w={780} month="JUNE" year="GLACIER" ring={10} k={k} note="SUN ROAD DAY" />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1202} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Chip text="Going-to-the-Sun Road" t={t} t0={2.8} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// Rotary snowplow (local units, ground at 0), facing left.
const Plow: React.FC<{ x: number; y: number; s?: number; t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={40} cy={4} rx={230} ry={14} fill="rgba(0,0,0,0.25)" />
    <rect x={-60} y={-200} width={260} height={160} rx={18} fill="#E3B23C" />
    <rect x={40} y={-290} width={140} height={110} rx={14} fill="#E3B23C" />
    <rect x={60} y={-272} width={100} height={60} rx={8} fill="#9cc4d6" />
    <rect x={-190} y={-170} width={140} height={150} rx={20} fill="#c23a32" />
    <circle cx={-120} cy={-95} r={56} fill="#8e252c" />
    <g transform={`translate(-120,-95) rotate(${t * 400})`}>
      {[0, 60, 120].map((a) => (
        <rect key={a} x={-52} y={-8} width={104} height={16} rx={6} fill="#5a1a1e" transform={`rotate(${a})`} />
      ))}
    </g>
    {[-10, 150].map((wx) => (
      <g key={wx}>
        <circle cx={wx} cy={-30} r={34} fill="#1f2222" />
        <circle cx={wx} cy={-30} r={14} fill="#9aa3a6" />
      </g>
    ))}
    <rect x={-120} y={-260} width={30} height={100} fill="#c23a32" transform="rotate(-20 -105 -210)" />
  </g>
);

// ============ S3 WIDE: high on the mountain, a plow cuts through the snow on the road (5.37 - 8.5) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 18, y: hh.y, zoom: mix(1.0, 1.08, lt / 3.13), rot: hh.rot };
  const g = 1400;
  const px = mix(820, 520, lt / 3.13);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={g - 160} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g - 60} L1480,${g - 160} L1480,2400 L-400,2400 Z`} fill={SNOW} />
          {/* cleared road behind the plow */}
          <path d={`M${px + 120},${g + 120 - (px + 120) * 0.05} L1480,${g + 40} L1480,${g + 140} L${px + 120},${g + 220 - (px + 120) * 0.05} Z`} fill="#5c6166" />
          <path d={`M-400,${g + 140} L${px - 100},${g + 120 - (px - 100) * 0.05} L${px - 100},${g + 220 - (px - 100) * 0.05} L-400,${g + 240} Z`} fill="#f7f9fb" />
          <path d={`M-400,${g + 240} L1480,${g + 140} L1480,2400 L-400,2400 Z`} fill={SNOW2} />
          {Array.from({ length: 5 }, (_, i) => (
            <path key={i} d={`M${-300 + i * 400},${g + 400 + i * 30} l120,-40 l140,30`} stroke="#c9d4dc" strokeWidth={8} fill="none" />
          ))}
          <Plow x={px} y={g + 210 - px * 0.05} s={1.15} t={t} />
          {/* snow spray from the rotary */}
          {Array.from({ length: 14 }, (_, i) => {
            const k = (t * 1.6 + i / 14) % 1;
            return <circle key={i} cx={px - 140 - k * 260} cy={g + 60 - px * 0.05 - Math.sin(k * 3.1) * 260} r={10 + (i % 3) * 6} fill="#ffffff" opacity={1 - k} />;
          })}
        </Svg>
      </Plane>
      <Particles seed={1203} n={20} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="245,244,236" cool="40,60,90" />
      <Chip text="The high road" t={t} t0={5.5} x={60} y={200} icon="none" big />
      <Chip text="Plowed every spring" t={t} t0={7.33} x={60} y={330} icon="none" big />
    </AbsoluteFill>
  );
};

// Season bar: June to September, with a highlighted window (0..4 month units from June 1).
const MONTHS = ["JUNE", "JULY", "AUG", "SEPT"];
const SeasonBar: React.FC<{ x: number; y: number; w: number; a: number; b: number; k: number; col: string; label: string; mark?: number }> = ({ x, y, w, a, b, k, col, label, mark }) => {
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
      {mark !== undefined && (
        <g transform={`translate(${mark * mw},0)`}>
          <line x1={0} y1={120} x2={0} y2={270} stroke="#B83A55" strokeWidth={8} />
          <circle cx={0} cy={120} r={14} fill="#B83A55" />
        </g>
      )}
      <text x={w / 2} y={360} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={50} fill={col} opacity={k} letterSpacing={2}>
        {label}
      </text>
    </g>
  );
};

// ============ S4 CLOSE-UP: the opening window: mid-June to early July, his June 10 before it (8.5 - 12.38) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.88), rot: hh.rot };
  const k = at(t, [9.9, 11.6], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,226,180,0.7)">
          <Svg>
            <SeasonBar x={70} y={620} w={940} a={0.45} b={1.25} k={k} col="#3f6e8c" label="ROAD USUALLY OPENS" mark={0.32} />
            <text x={70 + 0.32 * 235} y={1000} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#B83A55" opacity={at(t, [8.7, 9.0], [0, 1])}>
              JUNE 10
            </text>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1204} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.6} />
      <Readout label="USUALLY OPENS" value="Mid-June to early July" ok={null} t={t} t0={9.7} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: Marcus at the gate, shrugging at the snow (12.38 - 14.03) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.05, 1.1, lt / 1.65), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 470, y: g + 330, scale: 3.4, walk: 0, lean: 0.02, poles: false, handOverride: [100, -70], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 100} t={t} blur={3} />
      <Plane cam={cam} depth={0.7} blur={3}>
        <SnowRoad y={g + 40} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(240,246,255,0.85)">
          <Person {...p} outfit={MARCUS} expression="tired" />
        </Subject>
      </Plane>
      <Particles seed={1205} n={18} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="245,244,236" cool="40,60,90" vignette={0.5} />
      <Chip text="Nobody knows the day" t={t} t0={12.4} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S6 MEDIUM: back home, Marcus rethinks the dates at his laptop (14.03 - 16.4) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.37), rot: hh.rot };
  const floorY = 1700;
  const p: HikerProps = { x: 400, y: floorY, scale: 2.5, walk: 0, lean: 0.14, poles: false, handOverride: [110, -20], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill style={{ background: "#1a120c" }}>
      <Plane cam={cam} depth={0.8} blur={2.5}>
        <WindowView x={600} y={360} w={360} h={440} sky={EVE} uid="f" snow={false} />
        <Room floorY={floorY} win={[600, 360, 360, 440]} lamp={[180, 560]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,180,0.8)">
          <Person {...p} outfit={MARCUS} expression="neutral" noPack />
          <Svg>
            <rect x={500} y={1290} width={640} height={30} rx={6} fill="#6e4c34" />
            <rect x={560} y={1320} width={30} height={400} fill="#5a3e2a" />
            <g transform="translate(740,1290)">
              <path d="M-150,0 L150,0 L170,-14 L-170,-14 Z" fill="#9aa0a6" />
              <path d="M-140,-14 L-120,-230 L150,-230 L130,-14 Z" fill="#2a2e34" />
              <path d="M-126,-26 L-110,-216 L138,-216 L122,-26 Z" fill="#e9eef2" />
              <rect x={-90} y={-190} width={200} height={26} rx={6} fill="#3e5f4a" />
              <rect x={-90} y={-140} width={200} height={40} rx={8} fill="#3e7d4f" opacity={at(t, [15.0, 15.6], [0, 1])} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="left" top={300} />
      </Plane>
      <Particles seed={1206} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={600} warm={LAMP} />
      <Chip text="Here's the fix" t={t} t0={14.04} x={60} y={200} icon="none" big />
      <Chip text="Whole road and most trails" t={t} t0={15.73} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: the season bar: mid-July to mid-September (16.4 - 19.38) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.98), rot: hh.rot };
  const k = at(t, [17.2, 18.6], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,226,180,0.7)">
          <Svg>
            <SeasonBar x={70} y={620} w={940} a={1.5} b={3.5} k={k} col="#3e7d4f" label="GO HERE" />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1207} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.6} />
      <Readout label="BEST WINDOW" value="Mid-July to mid-Sept" ok={true} t={t} t0={17.28} x={60} y={200} />
    </AbsoluteFill>
  );
};

// Lower-park lake valley: green forest, clear lake, colored pebbles on the shore.
const LowLake: React.FC<{ cam: Cam; sky: Sky; uid: string; shore: number; t: number; falls?: boolean }> = ({ cam, sky, uid, shore, t, falls }) => (
  <>
    <Plane cam={cam} depth={0.04}>
      <SkyPlane sky={sky} uid={uid} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2}>
      <Ridge seed={91} base={shore - 160} amp={560} scale={170} col="#7d8aa0" lit="#ffffff" peak={180} />
    </Plane>
    <Haze y={shore - 460} h={320} col={sky.low} opacity={0.45} />
    <Plane cam={cam} depth={0.3} blur={1.2}>
      <Ridge seed={97} base={shore - 40} amp={300} scale={140} col="#4f6a52" />
      {falls && (
        <Svg>
          {[380, 560, 720].map((x, i) => (
            <path key={x} d={`M${x},${shore - 300 + i * 30} q${8},120 ${-4},280`} stroke="#ffffff" strokeWidth={10 - i * 2} fill="none" opacity={0.85} strokeDasharray="40 14" strokeDashoffset={-t * 80} />
          ))}
        </Svg>
      )}
    </Plane>
    <Plane cam={cam} depth={0.45} blur={0.6}>
      <Svg>
        <defs>
          <linearGradient id={`ll${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6fb6c8" />
            <stop offset="1" stopColor="#3a8a8a" />
          </linearGradient>
        </defs>
        <rect x={-400} y={shore} width={1880} height={1400} fill={`url(#ll${uid})`} />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={-200 + ((i * 197 + t * 20) % 1500)} y={shore + 40 + (i % 5) * 60} width={120 + (i % 3) * 60} height={4} fill="rgba(255,255,255,0.45)" />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <Pine key={i} x={-300 + i * 110} y={shore + 6} h={170 + (i % 3) * 40} c="#2f5446" c2="#24443a" />
        ))}
      </Svg>
    </Plane>
  </>
);

const PEBBLES = ["#b5553a", "#3e7d4f", "#4f6f8f", "#d9a34a", "#8e3f2a", "#6a8a5a"];
const Pebbles: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y} width={1880} height={1400} fill="#8a7a6a" />
    {Array.from({ length: 90 }, (_, i) => {
      const x = -300 + ((i * 131) % 1700);
      const yy = y + 20 + ((i * 71) % 520);
      return <ellipse key={i} cx={x} cy={yy} rx={26 + (i % 4) * 8} ry={14 + (i % 3) * 5} fill={PEBBLES[i % 6]} />;
    })}
  </Svg>
);

// ============ S8 WIDE: June plan B: Lake McDonald's colored stones (19.38 - 22.2) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.82), rot: hh.rot };
  const shore = 1150;
  const g = 1620;
  const p: HikerProps = { x: 380, y: g, scale: 2.3, walk: 0, lean: 0.06, poles: false, breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <LowLake cam={cam} sky={SUMMER} uid="h" shore={shore} t={t} />
      <Plane cam={cam} depth={1}>
        <Pebbles y={g - 330} />
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={MARCUS_S} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f3a30" side="right" />
      </Plane>
      <Particles seed={1208} n={16} col="#fff6dc" fall={4} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,240,215" />
      <Chip text="June only?" t={t} t0={19.4} x={60} y={200} icon="none" big />
      <Chip text="Lake McDonald" t={t} t0={21.25} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 MEDIUM: Avalanche Lake and Many Glacier, waterfalls off the cliffs (22.2 - 25.35) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.15), rot: hh.rot };
  const shore = 1180;
  const g = 1700;
  const p: HikerProps = { x: 560, y: g + 120, scale: 3.0, phase: t * 4.5, walk: 0.55, lean: 0.06, poles: false, breathe: 0 };
  return (
    <AbsoluteFill>
      <LowLake cam={cam} sky={SUMMER} uid="i" shore={shore} t={t} falls />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 300} width={1880} height={1600} fill="#6f7a4c" />
          <path d={`M-400,${g + 60} Q540,${g + 10} 1480,${g + 60} L1480,${g + 260} Q540,${g + 210} -400,${g + 260} Z`} fill="#9a7a56" />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={MARCUS_S} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f3a30" side="left" />
      </Plane>
      <Particles seed={1209} n={16} col="#fff6dc" fall={4} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,240,215" />
      <Chip text="Avalanche Lake" t={t} t0={22.29} x={60} y={200} icon="check" big />
      <Chip text="Many Glacier" t={t} t0={23.42} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S10 PAYOFF WIDE: late July, the high road open, Marcus in the wildflowers (25.35 - 27.0) ============
const S10: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 24, y: hh.y, zoom: at(lt, [0, 1.2], [1.14, 1.04], outExpo), rot: hh.rot };
  const g = 1560;
  const p: HikerProps = { x: 360 + lt * 60, y: g + 120, scale: 2.4, phase: t * 5, walk: 0.8, lean: 0.06, poles: false, breathe: 0 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={GOLDEN} uid="j" />
      </Plane>
      <Plane cam={cam} depth={0.14} blur={2}>
        <Ridge seed={91} base={g - 300} amp={600} scale={170} col="#8a7f8a" lit="#ffe2b8" peak={220} />
      </Plane>
      <Haze y={g - 600} h={320} col={GOLDEN.low} opacity={0.4} />
      <Plane cam={cam} depth={0.35} blur={1}>
        <Ridge seed={101} base={g - 120} amp={260} scale={150} col="#5a6a4a" lit="#ffd7a0" />
        <Svg>
          <path d={`M-400,${g - 220} L1480,${g - 330}`} stroke="#5c6166" strokeWidth={22} />
          <path d={`M-400,${g - 232} L1480,${g - 342}`} stroke="#8a8f94" strokeWidth={6} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 160} width={1880} height={1600} fill="#7d8a4c" />
          <path d={`M-400,${g + 60} Q540,${g + 10} 1480,${g + 60} L1480,${g + 200} Q540,${g + 150} -400,${g + 200} Z`} fill="#a08560" />
        </Svg>
        <Wildflowers y={g + 220} n={30} seed={120} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={MARCUS_S} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2a3a2c" side="right" />
      </Plane>
      <Rays x={GOLDEN.sun[0]} y={GOLDEN.sun[1] - 100} strength={0.4} col="255,236,200" />
      <Particles seed={1210} n={20} col="#fff1d6" fall={4} />
      <LowScrim />
      <Grade sunX={740} sunY={660} warm="255,226,180" />
      <Readout label="NEW DATES" value="Late July" ok={true} t={t} t0={25.84} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S11: React.FC = () => {
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
      save="Save this before you book Glacier"
    />
  );
};

export const V120: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.72} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.67} to={5.42} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.67} />
    </Scene>
    <Scene from={5.37} to={8.55} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.37} />
    </Scene>
    <Scene from={8.5} to={12.43} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.5} />
    </Scene>
    <Scene from={12.38} to={14.08} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.38} />
    </Scene>
    <Scene from={14.03} to={16.45} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.03} />
    </Scene>
    <Scene from={16.4} to={19.43} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={16.4} />
    </Scene>
    <Scene from={19.38} to={22.25} fadeIn={0.08} fadeOut={0.08}>
      <S8 off={19.38} />
    </Scene>
    <Scene from={22.2} to={25.4} fadeIn={0.08} fadeOut={0.1}>
      <S9 off={22.2} />
    </Scene>
    <Scene from={25.35} to={27.05} fadeIn={0.12} fadeOut={0.12}>
      <S10 off={25.35} />
    </Scene>
    <Scene from={26.9} to={30.0} fadeOut={0}>
      <S11 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.67, 1560],
        [2.67, 5.37, 1560],
        [5.37, 8.5, 1560],
        [8.5, 12.38, 1560],
        [12.38, 14.03, 1560],
        [14.03, 16.4, 1560],
        [16.4, 19.38, 1560],
        [19.38, 22.2, 1560],
        [22.2, 25.35, 1560],
        [25.35, 26.9, 1560],
      ]}
    />
  </AbsoluteFill>
);
