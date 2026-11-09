// V123: "Quarter tank. No gas inside Glacier." in the cinematic C01 style. Launch story for the Glacier National Park
// Trip Planning Guide ($9.99, live Shopify). Facts as NPS gives them: there are no gas stations inside Glacier National
// Park, fuel is in the towns around it; on the east side Many Glacier, St. Mary and Two Medicine are separate valleys
// reached from the highway outside the park, so places close on the map can be a long drive apart. No invented drive
// times or numbers on screen. Map is a simple hand-drawn diagram, not an official map.
// End card = real Shopify cover (products/glacier-national-park-trip-planning-guide.jpg, boxed photo card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, HEAD, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, Haze, handheld, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { Desk, INK, PAPER } from "../trip";
import vo from "../vo/v123.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const SUMMER: Sky = { top: "#3a6a98", mid: "#9fc2dc", low: "#f4e2bc", sun: [790, 560], sunR: 52, sunCol: "#fff6dc", glow: "#ffd79a" };
const GOLDEN: Sky = { top: "#4a6890", mid: "#e5b487", low: "#ffdca6", sun: [740, 660], sunR: 62, sunCol: "#fff4d8", glow: "#ffc274" };
const LAMP = "255,200,140";
const RED = "#d9443a";
const GREEN = "#3e7d4f";

const LENA: Outfit = {
  ...GUIDE,
  skin: "#F0C8A8",
  skinShade: "#D2A888",
  hair: "#c99a52",
  ponytail: "#c99a52",
  beard: null,
  cap: "#3f6e8c",
  capShade: "#2f5670",
  jacket: "#3e7d4f",
  jacketShade: "#2f603c",
  pants: "#4a4f57",
  pantsShade: "#363a40",
  pack: "#c9662e",
  packShade: "#a04f22",
  glove: null,
};

// Round fuel gauge, k = 0 empty .. 1 full.
const Gauge: React.FC<{ x: number; y: number; r: number; k: number }> = ({ x, y, r, k }) => {
  const a = (-150 + 120 * k) * (Math.PI / 180);
  const low = k < 0.3;
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r={r + 24} fill="#14171b" />
      <circle r={r} fill="#1f2328" stroke="#3a4048" strokeWidth={6} />
      {Array.from({ length: 5 }, (_, i) => {
        const b = (-150 + 30 * i) * (Math.PI / 180);
        return <line key={i} x1={Math.cos(b) * r * 0.78} y1={Math.sin(b) * r * 0.78} x2={Math.cos(b) * r * 0.94} y2={Math.sin(b) * r * 0.94} stroke={i === 0 ? RED : "#e9eef2"} strokeWidth={10} strokeLinecap="round" />;
      })}
      <text x={Math.cos((-150 * Math.PI) / 180) * r * 0.58} y={Math.sin((-150 * Math.PI) / 180) * r * 0.58 + 16} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={r * 0.22} fill={RED}>
        E
      </text>
      <text x={Math.cos((-30 * Math.PI) / 180) * r * 0.58} y={Math.sin((-30 * Math.PI) / 180) * r * 0.58 + 16} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={r * 0.22} fill="#e9eef2">
        F
      </text>
      <text x={0} y={r * 0.5} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={r * 0.2} fill={low ? "#ffb04a" : "#9fd0a8"} letterSpacing={3}>
        FUEL
      </text>
      <line x1={0} y1={0} x2={Math.cos(a) * r * 0.82} y2={Math.sin(a) * r * 0.82} stroke="#ff7a3a" strokeWidth={12} strokeLinecap="round" />
      <circle r={22} fill="#3a4048" />
    </g>
  );
};

// ============ S1 HOOK CLOSE-UP: the fuel needle on a quarter, mountains through the windshield (0 - 2.6) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, t / 2.6), rot: hh.rot };
  const blink = Math.sin(t * 8) > 0 ? 1 : 0.35;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.1} blur={8}>
        <SkyPlane sky={SUMMER} uid="a" />
        <Ridge seed={91} base={1000} amp={600} scale={170} col="#7d8aa0" lit="#ffffff" peak={220} />
        <Svg>
          <rect x={-400} y={980} width={1880} height={600} fill="#4f6a52" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(255,226,180,0.6)">
          <Svg>
            {/* dashboard */}
            <path d="M-200,1100 Q540,1000 1280,1100 L1280,2400 L-200,2400 Z" fill="#2a2e34" />
            <path d="M-200,1100 Q540,1000 1280,1100" stroke="#3a4048" strokeWidth={20} fill="none" />
            <rect x={150} y={1150} width={780} height={560} rx={80} fill="#181b1f" />
            <Gauge x={540} y={1450} r={240} k={0.25} />
            <g opacity={blink} transform="translate(790,1300)">
              <rect x={-30} y={-40} width={50} height={70} rx={8} fill="#ffb04a" />
              <rect x={20} y={-26} width={22} height={12} fill="#ffb04a" />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1231} n={10} col="#fff1d6" fall={4} />
      <Grade sunX={790} sunY={560} warm="255,226,170" vignette={0.6} />
      <Title text={"Quarter tank.\nNo gas inside\nGlacier."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: the car rolls past the park entrance sign (2.6 - 4.83) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.23), rot: hh.rot };
  const g = 1500;
  const car = at(t, [2.6, 4.8], [0, 1]);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={SUMMER} uid="b" />
      </Plane>
      <Plane cam={cam} depth={0.14} blur={2.4}>
        <Ridge seed={91} base={g - 300} amp={620} scale={170} col="#7d8aa0" lit="#ffffff" peak={220} />
      </Plane>
      <Haze y={g - 560} h={300} col={SUMMER.low} opacity={0.4} />
      <Plane cam={cam} depth={0.4} blur={1}>
        <Svg>
          {Array.from({ length: 16 }, (_, i) => (
            <Pine key={i} x={-300 + i * 110} y={g - 40 + (i % 2) * 10} h={260 + (i % 3) * 60} c="#2f5446" c2="#24443a" />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 40} width={1880} height={1400} fill="#6f7a4c" />
          <rect x={-400} y={g + 60} width={1880} height={170} fill="#5c6166" />
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={-300 + i * 200} y={g + 140} width={100} height={10} fill="#e9d36a" />
          ))}
          <g transform={`translate(760,${g + 40})`}>
            <rect x={-170} y={-300} width={24} height={300} fill="#5a4030" />
            <rect x={146} y={-300} width={24} height={300} fill="#5a4030" />
            <rect x={-220} y={-400} width={440} height={130} rx={10} fill="#6b4a2e" stroke="#f3e6cf" strokeWidth={6} />
            <text x={0} y={-322} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={60} fill="#f3e6cf" letterSpacing={4}>
              PARK ENTRANCE
            </text>
          </g>
          <g transform={`translate(${mix(-150, 620, car)},${g + 200}) scale(1.5)`}>
            <Car x={0} y={0} body="#c23a32" shade="#9a2c26" />
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f3a30" side="right" />
      </Plane>
      <Particles seed={1232} n={14} col="#ffffff" fall={6} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="250,240,222" cool="40,55,70" />
      <Readout label="LENA'S PLAN" value="Fill up later" ok={null} t={t} t0={2.75} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: Lena at a pullout, searching her phone for gas (4.83 - 7.97) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.03, 1.1, lt / 3.14), rot: hh.rot };
  const g = 1560;
  const p: HikerProps = { x: 430, y: g + 200, scale: 2.5, walk: 0, lean: 0.06, poles: false, handOverride: [90, -10], breathe: Math.sin(t * 2) * 1.2 };
  const hx = 430 + 90 * 2.5;
  const hy = g + 200 - 182 * 2.5 - 10 * 2.5;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={SUMMER} uid="c" />
      </Plane>
      <Plane cam={cam} depth={0.14} blur={3}>
        <Ridge seed={97} base={g - 360} amp={600} scale={160} col="#7d8aa0" lit="#ffffff" peak={240} />
      </Plane>
      <Plane cam={cam} depth={0.5} blur={2.2}>
        <Svg>
          {Array.from({ length: 16 }, (_, i) => (
            <Pine key={i} x={-300 + i * 110} y={g - 60 + (i % 2) * 10} h={280 + (i % 3) * 60} c="#2f5446" c2="#24443a" />
          ))}
          <g transform={`translate(880,${g + 40}) scale(2.4)`}>
            <Car x={0} y={0} body="#c23a32" shade="#9a2c26" flip />
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 20} width={1880} height={1400} fill="#8a7a5e" />
        </Svg>
        <Subject rimX={5} col="rgba(255,240,215,0.8)">
          <Person {...p} outfit={LENA} expression="tired" noPack />
          <Svg>
            <g transform={`translate(${hx + 10},${hy - 30}) rotate(-8)`}>
              <rect x={-36} y={-66} width={72} height={132} rx={12} fill="#1d2126" />
              <rect x={-30} y={-58} width={60} height={116} rx={8} fill="#cfe3ee" />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f3a30" side="left" />
      </Plane>
      <Particles seed={1233} n={12} col="#ffffff" fall={6} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="250,240,222" cool="40,55,70" />
      <Chip text="No gas station in the park" t={t} t0={5.0} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// Hand-drawn diagram of the east side: highway outside the park, three dead-end valley roads.
const EastMap: React.FC<{ t: number }> = ({ t }) => {
  const route = at(t, [9.6, 12.4], [0, 1]);
  const look = at(t, [8.6, 9.2], [0, 1]);
  const valleys: [string, number, number][] = [
    ["MANY GLACIER", 330, 520],
    ["ST. MARY", 640, 360],
    ["TWO MEDICINE", 990, 480],
  ];
  return (
    <g>
      <rect x={14} y={20} width={940} height={1140} rx={20} fill="rgba(0,0,0,0.3)" />
      <rect x={0} y={0} width={940} height={1140} rx={20} fill={PAPER} />
      {/* park side shaded */}
      <path d="M0,0 L560,0 Q600,500 560,1140 L0,1140 Z" fill="#d6e2cf" />
      <text x={60} y={90} fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#3e5a3e" letterSpacing={3}>
        PARK
      </text>
      <text x={790} y={90} fontFamily={HEAD} fontWeight={800} fontSize={34} fill="#8a7a5e" letterSpacing={2}>
        OUTSIDE
      </text>
      {/* highway outside the park */}
      <path d="M760,40 Q700,560 760,1100" stroke="#7a7f86" strokeWidth={22} fill="none" />
      {valleys.map(([name, vy, len]) => (
        <g key={name}>
          <line x1={730} y1={vy} x2={730 - len} y2={vy - 40} stroke="#7a7f86" strokeWidth={16} strokeLinecap="round" />
          <circle cx={730 - len} cy={vy - 40} r={20} fill={INK} />
          <text x={730 - len} y={vy - 80} fontFamily={HEAD} fontWeight={800} fontSize={40} fill={INK} letterSpacing={1}>
            {name}
          </text>
        </g>
      ))}
      {/* looks close: dashed line between two valley ends */}
      <line x1={400} y1={290} x2={260} y2={950} stroke={RED} strokeWidth={8} strokeDasharray="22 16" opacity={look} />
      {/* the real drive: out to the highway, along it, back in */}
      <path
        d="M210,290 L730,330 Q700,640 730,990 L260,950"
        stroke="#ff7a3a"
        strokeWidth={14}
        fill="none"
        strokeLinejoin="round"
        strokeDasharray="2400"
        strokeDashoffset={2400 * (1 - route)}
      />
    </g>
  );
};

// ============ S4 CLOSE-UP: the east side map, valleys are dead ends (7.97 - 11.2) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.23), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,226,180,0.7)">
          <Svg>
            <g transform="translate(70,360)">
              <EastMap t={t} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1234} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.6} />
      <Chip text="Each valley: a dead end" t={t} t0={8.2} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: the long drive along the mountain front (11.2 - 14.77) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 20, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.57), rot: hh.rot };
  const g = 1420;
  const car = at(t, [11.2, 14.7], [0, 1]);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={GOLDEN} uid="e" />
      </Plane>
      <Plane cam={cam} depth={0.12} blur={2.4}>
        <Ridge seed={101} base={g - 160} amp={680} scale={190} col="#7a7280" lit="#ffd8a8" peak={260} />
      </Plane>
      <Haze y={g - 420} h={300} col={GOLDEN.low} opacity={0.45} />
      <Plane cam={cam} depth={0.4} blur={1}>
        <Svg>
          <path d={`M-400,${g} Q300,${g - 60} 700,${g - 20} Q1100,${g + 20} 1480,${g - 30} L1480,2400 L-400,2400 Z`} fill="#a89a5e" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g + 160} Q540,${g + 100} 1480,${g + 180} L1480,2400 L-400,2400 Z`} fill="#b8a46a" />
          <path d={`M-400,${g + 300} Q300,${g + 220} 600,${g + 290} Q900,${g + 360} 1480,${g + 270}`} stroke="#5c6166" strokeWidth={110} fill="none" />
          <path d={`M-400,${g + 300} Q300,${g + 220} 600,${g + 290} Q900,${g + 360} 1480,${g + 270}`} stroke="#e9d36a" strokeWidth={6} strokeDasharray="60 50" fill="none" />
          <g transform={`translate(${mix(-100, 900, car)},${g + 300 + Math.sin(car * 3) * 20}) scale(1.4)`}>
            <Car x={0} y={0} body="#c23a32" shade="#9a2c26" />
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a3a22" side="right" />
      </Plane>
      <Rays x={GOLDEN.sun[0]} y={GOLDEN.sun[1]} strength={0.35} />
      <Particles seed={1235} n={16} col="#fff1d6" fall={4} />
      <LowScrim />
      <Grade sunX={740} sunY={660} warm="255,214,170" />
      <Readout label="CLOSE ON THE MAP" value="An hour in the car" ok={false} t={t} t0={11.6} x={60} y={200} />
    </AbsoluteFill>
  );
};

// Generic fuel pump (no brand).
const Pump: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-80} y={-360} width={160} height={360} rx={16} fill="#e9e6dc" />
    <rect x={-80} y={-360} width={160} height={60} rx={16} fill={GREEN} />
    <text x={0} y={-318} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#fff" letterSpacing={4}>
      FUEL
    </text>
    <rect x={-56} y={-270} width={112} height={70} rx={8} fill="#1f2328" />
    <path d="M80,-220 Q130,-200 120,-120" stroke="#2a2e34" strokeWidth={12} fill="none" />
    <rect x={-100} y={-6} width={200} height={20} rx={6} fill="#9a9a94" />
  </g>
);

// ============ S6 WIDE: here's the fix, the gas station in town before the gate (14.77 - 18.14) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.0, 1.08, lt / 3.37), rot: hh.rot };
  const g = 1560;
  const car = at(t, [14.8, 16.2], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={SUMMER} uid="f" />
      </Plane>
      <Plane cam={cam} depth={0.14} blur={2.6}>
        <Ridge seed={91} base={g - 320} amp={620} scale={170} col="#7d8aa0" lit="#ffffff" peak={220} />
      </Plane>
      <Haze y={g - 560} h={300} col={SUMMER.low} opacity={0.45} />
      <Plane cam={cam} depth={0.45} blur={1.2}>
        <Svg>
          {Array.from({ length: 16 }, (_, i) => (
            <Pine key={i} x={-300 + i * 110} y={g - 50 + (i % 2) * 10} h={230 + (i % 3) * 50} c="#2f5446" c2="#24443a" />
          ))}
          {/* canopy */}
          <rect x={-60} y={g - 520} width={1200} height={60} fill="#e9e6dc" />
          <rect x={-60} y={g - 470} width={1200} height={16} fill={GREEN} />
          {[80, 980].map((x) => (
            <rect key={x} x={x} y={g - 460} width={30} height={430} fill="#c8c4b8" />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 40} width={1880} height={1400} fill="#8f8f8a" />
          <Pump x={360} y={g + 160} s={1.4} />
          <g transform={`translate(${mix(1300, 760, car)},${g + 230}) scale(2.0)`}>
            <Car x={0} y={0} body="#c23a32" shade="#9a2c26" flip />
          </g>
        </Svg>
      </Plane>
      <Particles seed={1236} n={14} col="#ffffff" fall={6} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="250,240,222" cool="40,55,70" />
      <Chip text="Here's the fix" t={t} t0={14.8} x={60} y={200} icon="none" big />
      <Chip text="Fill up in town first" t={t} t0={16.1} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: the day plan by drive time, not by the map (18.14 - 21.42) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 3.28), rot: hh.rot };
  const rows = ["Morning: one valley", "Check the drive time", "Gas before you go in"];
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,226,180,0.7)">
          <Svg>
            <g transform="translate(110,520) rotate(-2)">
              <rect x={14} y={20} width={860} height={760} rx={18} fill="rgba(0,0,0,0.3)" />
              <rect x={0} y={0} width={860} height={760} rx={18} fill={PAPER} />
              <rect x={0} y={0} width={860} height={130} rx={18} fill={INK} />
              <text x={50} y={88} fontFamily={HEAD} fontWeight={800} fontSize={60} fill={PAPER} letterSpacing={3}>
                PLAN BY DRIVE TIME
              </text>
              {rows.map((r, i) => {
                const k = at(t, [18.5 + i * 0.6, 18.9 + i * 0.6], [0, 1]);
                return (
                  <g key={r} opacity={k}>
                    <rect x={50} y={190 + i * 180} width={760} height={140} rx={16} fill="#ece5d8" />
                    <circle cx={120} cy={260 + i * 180} r={34} fill={GREEN} />
                    <path d={`M104,${261 + i * 180} L116,${273 + i * 180} L138,${249 + i * 180}`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <text x={180} y={278 + i * 180} fontFamily="Inter" fontWeight={700} fontSize={46} fill={INK}>
                      {r}
                    </text>
                  </g>
                );
              })}
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1237} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.6} />
      <Chip text="Drive times, not the map" t={t} t0={18.3} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF MEDIUM: Lena tops up first, then heads in at golden light (21.42 - 23.75) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.04], outExpo), rot: hh.rot };
  const g = 1600;
  const p: HikerProps = { x: 330, y: g + 200, scale: 2.4, walk: 0, lean: -0.02, poles: false, handOverride: [70, 30], breathe: Math.sin(t * 2) * 1.2 };
  const fill = at(t, [21.5, 22.6], [0.25, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={GOLDEN} uid="h" />
      </Plane>
      <Plane cam={cam} depth={0.14} blur={2}>
        <Ridge seed={91} base={g - 300} amp={660} scale={170} col="#7a7280" lit="#ffd8a8" peak={240} />
      </Plane>
      <Haze y={g - 560} h={300} col={GOLDEN.low} opacity={0.4} />
      <Plane cam={cam} depth={0.45} blur={1}>
        <Svg>
          {Array.from({ length: 16 }, (_, i) => (
            <Pine key={i} x={-300 + i * 110} y={g - 40 + (i % 2) * 10} h={250 + (i % 3) * 50} c="#2f5446" c2="#24443a" />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 30} width={1880} height={1400} fill="#8a7a5e" />
          <g transform={`translate(760,${g + 200}) scale(2.4)`}>
            <Car x={0} y={0} body="#c23a32" shade="#9a2c26" flip />
          </g>
        </Svg>
        <Subject rimX={-6} col="rgba(255,214,160,0.95)">
          <Person {...p} outfit={LENA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1f3a30" side="right" />
      </Plane>
      <Rays x={GOLDEN.sun[0]} y={GOLDEN.sun[1]} strength={0.45} col="255,226,180" />
      <Particles seed={1238} n={20} col="#fff1d6" fall={4} />
      <LowScrim />
      <Grade sunX={740} sunY={660} warm="255,214,170" />
      <Svg>
        <g transform="translate(860,330)">
          <Gauge x={0} y={0} r={110} k={fill} />
        </g>
      </Svg>
      <Readout label="LENA TOPS UP FIRST" value="Full tank" ok={true} t={t} t0={21.5} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
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
      save="Save this before Glacier"
    />
  );
};

export const V123: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.65} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.6} to={4.88} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.6} />
    </Scene>
    <Scene from={4.83} to={8.02} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={4.83} />
    </Scene>
    <Scene from={7.97} to={11.25} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.97} />
    </Scene>
    <Scene from={11.2} to={14.82} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.2} />
    </Scene>
    <Scene from={14.77} to={18.19} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.77} />
    </Scene>
    <Scene from={18.14} to={21.47} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={18.14} />
    </Scene>
    <Scene from={21.42} to={23.8} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={21.42} />
    </Scene>
    <Scene from={23.25} to={27.5} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.6, 1560],
        [2.6, 4.83, 1560],
        [4.83, 7.97, 1560],
        [7.97, 11.2, 1640],
        [11.2, 14.77, 1560],
        [14.77, 18.14, 1560],
        [18.14, 21.42, 1560],
        [21.42, 23.25, 1560],
      ]}
    />
  </AbsoluteFill>
);
