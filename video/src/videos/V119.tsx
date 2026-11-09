// V119: "You can't drive to Moraine Lake." in the cinematic C01 style. Launch story for the Banff & Jasper Trip Planning
// Guide ($9.99, live Shopify). Facts kept to what Parks Canada says: Moraine Lake Road is closed to personal vehicles all
// year; visitors use the Parks Canada shuttle from the Lake Louise Park and Ride, reserved on the official Parks Canada
// reservation site when seats are released in spring. No invented dates, prices or numbers on screen. The phone UI is
// generic (no Parks Canada logo or branding).
// End card = real Shopify cover (products/banff-jasper-trip-planning-guide.jpg, boxed photo card, no plain background).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, HEAD, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, Haze, handheld, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { Room, WindowView } from "../home";
import { Desk, INK, PAPER } from "../trip";
import vo from "../vo/v119.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const EVE: Sky = { top: "#2a3a5c", mid: "#6a7a96", low: "#c9b8a8", sun: [800, 620], sunR: 30, sunCol: "#f6efe0", glow: "#d8c0a8" };
const DAY: Sky = { top: "#3a6a98", mid: "#9fc2dc", low: "#e8eef0", sun: [820, 480], sunR: 44, sunCol: "#fffbea", glow: "#f2ead2" };
const SUNRISE: Sky = { top: "#3c5a88", mid: "#e2a988", low: "#ffd9a8", sun: [300, 700], sunR: 58, sunCol: "#fff3d6", glow: "#ffbf80" };
const LAMP = "255,200,140";
const SCREEN = "210,230,255";
const TEAL = "#2aa3b3";
const TEAL2 = "#1d7f8f";

const PRIYA: Outfit = {
  ...GUIDE,
  skin: "#B98466",
  skinShade: "#9A6A4F",
  hair: "#1c1410",
  ponytail: "#1c1410",
  beard: null,
  cap: "#1c1410",
  capShade: "#120c08",
  jacket: "#6a4a8a",
  jacketShade: "#53386e",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  glove: null,
};
const PRIYA_H: Outfit = { ...PRIYA, jacket: "#C2662E", jacketShade: "#9B4E20", cap: "#2C6E63", capShade: "#1f5249", pack: "#2C6E63", packShade: "#1f5249" };

// Jagged lake-valley peaks (hand drawn, local units w x h) for the phone photo.
const LakePic: React.FC<{ w: number; h: number; uid: string }> = ({ w, h, uid }) => (
  <g>
    <defs>
      <linearGradient id={`lk${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#4a6aa0" />
        <stop offset="0.6" stopColor="#f0b48c" />
        <stop offset="1" stopColor="#ffd8a0" />
      </linearGradient>
      <linearGradient id={`lw${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={TEAL} />
        <stop offset="1" stopColor={TEAL2} />
      </linearGradient>
    </defs>
    <rect x={0} y={0} width={w} height={h} fill={`url(#lk${uid})`} />
    <path
      d={`M0,${h * 0.56} L${w * 0.08},${h * 0.3} L${w * 0.16},${h * 0.42} L${w * 0.26},${h * 0.22} L${w * 0.36},${h * 0.38} L${w * 0.46},${h * 0.2} L${w * 0.56},${h * 0.36} L${w * 0.66},${h * 0.24} L${w * 0.76},${h * 0.4} L${w * 0.86},${h * 0.28} L${w},${h * 0.44} L${w},${h * 0.6} L0,${h * 0.6} Z`}
      fill="#8a7c86"
    />
    <path d={`M${w * 0.26},${h * 0.22} L${w * 0.3},${h * 0.3} L${w * 0.22},${h * 0.3} Z M${w * 0.46},${h * 0.2} L${w * 0.5},${h * 0.28} L${w * 0.42},${h * 0.28} Z M${w * 0.66},${h * 0.24} L${w * 0.7},${h * 0.32} L${w * 0.62},${h * 0.32} Z`} fill="#ffe6cc" />
    <path d={`M0,${h * 0.56} L${w * 0.08},${h * 0.3} L${w * 0.16},${h * 0.42} L${w * 0.26},${h * 0.22}`} fill="none" stroke="#ffcfa0" strokeWidth={3} />
    <rect x={0} y={h * 0.6} width={w} height={h * 0.4} fill={`url(#lw${uid})`} />
    {Array.from({ length: 6 }, (_, i) => (
      <rect key={i} x={w * (0.1 + i * 0.13)} y={h * (0.66 + (i % 3) * 0.07)} width={w * 0.1} height={3} fill="rgba(255,230,200,0.5)" />
    ))}
    {Array.from({ length: 7 }, (_, i) => (
      <path key={i} d={`M${w * (i * 0.16)},${h * 0.62} l${w * 0.035},-${h * (0.12 + (i % 2) * 0.05)} l${w * 0.035},${h * (0.12 + (i % 2) * 0.05)} Z`} fill="#1f3a34" />
    ))}
    <path d={`M${w * 0.62},${h} L${w * 0.7},${h * 0.8} L${w * 0.8},${h * 0.78} L${w * 0.92},${h * 0.84} L${w},${h * 0.8} L${w},${h} Z`} fill="#5a524e" />
  </g>
);

const Phone: React.FC<{ x: number; y: number; s?: number; rot?: number; children: React.ReactNode; uid: string }> = ({ x, y, s = 1, rot = 0, children, uid }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <defs>
      <clipPath id={`pc${uid}`}>
        <rect x={-170} y={-350} width={340} height={700} rx={30} />
      </clipPath>
    </defs>
    <rect x={-190} y={-380} width={380} height={760} rx={50} fill="#1d2126" />
    <g clipPath={`url(#pc${uid})`}>
      <g transform="translate(-170,-350)">{children}</g>
    </g>
    <rect x={-50} y={330} width={100} height={8} rx={4} fill="rgba(255,255,255,0.7)" />
  </g>
);

// Big lake valley for the payoff: sunrise peaks, teal lake with reflection, rock pile in front.
const LakeValley: React.FC<{ cam: Cam; sky: Sky; uid: string; shore: number; t: number }> = ({ cam, sky, uid, shore, t }) => (
  <>
    <Plane cam={cam} depth={0.04}>
      <SkyPlane sky={sky} uid={uid} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={1.8}>
      <Ridge seed={73} base={shore - 120} amp={620} scale={150} col="#8d7f8c" lit="#ffd2a8" peak={260} />
    </Plane>
    <Haze y={shore - 420} h={300} col={sky.low} opacity={0.35} />
    <Plane cam={cam} depth={0.3} blur={1.1}>
      <Ridge seed={79} base={shore - 20} amp={300} scale={130} col="#6a6470" lit="#f2b88e" />
    </Plane>
    <Plane cam={cam} depth={0.45} blur={0.6}>
      <Svg>
        <defs>
          <linearGradient id={`lv${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3fb2bf" />
            <stop offset="1" stopColor={TEAL2} />
          </linearGradient>
        </defs>
        <rect x={-400} y={shore} width={1880} height={1400} fill={`url(#lv${uid})`} />
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={-200 + ((i * 197 + t * 20) % 1500)} y={shore + 40 + (i % 5) * 70} width={120 + (i % 3) * 60} height={4} fill="rgba(255,226,190,0.45)" />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <Pine key={i} x={-300 + i * 110} y={shore + 6} h={150 + (i % 3) * 40} c="#244a40" c2="#1a3a32" />
        ))}
      </Svg>
    </Plane>
  </>
);

// ============ S1 HOOK CLOSE-UP: the lake photo on Priya's phone (0 - 3.4) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, t / 3.4), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#1a120c" }}>
      <Plane cam={cam} depth={0.6} blur={10}>
        <WindowView x={560} y={260} w={480} h={560} sky={EVE} uid="a" snow={false} />
        <Room floorY={1900} win={[560, 260, 480, 560]} wall="#5a4c40" floor="#3a2c22" lamp={[180, 560]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col={`rgba(${SCREEN},0.6)`}>
          <Svg>
            <rect x={400} y={1640} width={400} height={500} rx={120} fill={PRIYA.jacket} />
            <Phone x={540} y={1160} s={1.1} rot={-4} uid="a">
              <LakePic w={340} h={700} uid="a" />
            </Phone>
            <ellipse cx={540} cy={1610} rx={200} ry={70} fill={PRIYA.skinShade} />
            <ellipse cx={330} cy={1340} rx={60} ry={34} fill={PRIYA.skin} transform="rotate(-30 330 1340)" />
            <ellipse cx={756} cy={1370} rx={60} ry={34} fill={PRIYA.skinShade} transform="rotate(30 756 1370)" />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1191} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={540} sunY={1000} warm={LAMP} cool="30,30,60" vignette={0.6} />
      <Title text={"You can't\ndrive to\nMoraine Lake."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: Priya at her desk, the photo pinned above the laptop (3.4 - 5.4) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: mix(1.04, 1.1, lt / 2), rot: hh.rot };
  const floorY = 1700;
  const p: HikerProps = { x: 420, y: floorY, scale: 2.5, walk: 0, lean: 0.14, poles: false, handOverride: [110, -20], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill style={{ background: "#1a120c" }}>
      <Plane cam={cam} depth={0.8} blur={2.5}>
        <WindowView x={80} y={360} w={340} h={420} sky={EVE} uid="b" snow={false} />
        <Room floorY={floorY} win={[80, 360, 340, 420]} lamp={[900, 560]} />
        <Svg>
          {/* the printed lake photo pinned to the wall */}
          <g transform="translate(600,420) rotate(3)">
            <rect x={-8} y={-8} width={336} height={256} fill="#f3ece0" />
            <svg x={0} y={0} width={320} height={240} viewBox="0 0 340 255" preserveAspectRatio="xMidYMid slice">
              <g transform="translate(0,-120)">
                <LakePic w={340} h={480} uid="b" />
              </g>
            </svg>
            <circle cx={160} cy={-2} r={10} fill="#B83A55" />
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,180,0.8)">
          <Person {...p} outfit={PRIYA} expression="happy" noPack />
          <Svg>
            {/* desk and laptop */}
            <rect x={520} y={1290} width={640} height={30} rx={6} fill="#6e4c34" />
            <rect x={560} y={1320} width={30} height={400} fill="#5a3e2a" />
            <g transform="translate(760,1290)">
              <path d="M-150,0 L150,0 L170,-14 L-170,-14 Z" fill="#9aa0a6" />
              <path d="M-140,-14 L-120,-230 L150,-230 L130,-14 Z" fill="#2a2e34" />
              <path d="M-126,-26 L-110,-216 L138,-216 L122,-26 Z" fill="#3f9fb0" opacity={0.85} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="left" top={300} />
      </Plane>
      <Particles seed={1192} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={900} sunY={600} warm={LAMP} />
      <Readout label="THE WHOLE TRIP" value="One sunrise" ok={null} t={t} t0={3.5} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the fine print on the laptop, one line lights up (5.4 - 7.23) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y - lt * 10, zoom: mix(1.02, 1.12, lt / 1.83), rot: hh.rot };
  const hi = at(t, [6.3, 6.8], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#14181c" }}>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#1d2228" />
          <rect x={90} y={360} width={900} height={1180} rx={20} fill="#f4f6f8" />
          <rect x={90} y={360} width={900} height={110} rx={20} fill="#2C3B2E" />
          <text x={140} y={436} fontFamily={HEAD} fontWeight={800} fontSize={56} fill={PAPER} letterSpacing={3}>
            GETTING TO MORAINE LAKE
          </text>
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={140} y={530 + i * 62} width={i % 3 === 2 ? 560 : 800} height={22} rx={8} fill="#cfd5da" />
          ))}
          <rect x={120} y={1100} width={840} height={180} rx={12} fill="#ffe7a8" opacity={hi} />
          <text x={150} y={1175} fontFamily="Inter" fontWeight={700} fontSize={44} fill={INK}>
            Moraine Lake Road is closed
          </text>
          <text x={150} y={1240} fontFamily="Inter" fontWeight={700} fontSize={44} fill={INK}>
            to personal vehicles.
          </text>
          {Array.from({ length: 3 }, (_, i) => (
            <rect key={i} x={140} y={1320 + i * 62} width={i === 2 ? 420 : 780} height={22} rx={8} fill="#cfd5da" />
          ))}
        </Svg>
      </Plane>
      <Particles seed={1193} n={8} col="#dfe8ff" fall={4} />
      <Grade sunX={540} sunY={900} warm={SCREEN} cool="30,40,60" vignette={0.6} />
      <Chip text="The fine print" t={t} t0={5.6} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// Road gate: a barrier arm across the road and a sign.
const Gate: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-300} y={-150} width={26} height={150} fill="#6a6a6a" />
    <rect x={-300} y={-150} width={620} height={30} rx={8} fill="#f4f4f4" />
    {Array.from({ length: 6 }, (_, i) => (
      <rect key={i} x={-280 + i * 100} y={-150} width={50} height={30} fill="#c23a32" />
    ))}
    <rect x={300} y={-160} width={26} height={160} fill="#6a6a6a" />
    <g transform="translate(-40,-420)">
      <rect x={-6} y={120} width={20} height={150} fill="#5a4030" />
      <rect x={-200} y={-30} width={420} height={170} rx={10} fill="#6b4a2e" stroke="#f3e6cf" strokeWidth={6} />
      <text x={10} y={36} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#f3e6cf" letterSpacing={2}>
        MORAINE LAKE ROAD
      </text>
      <text x={10} y={96} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={36} fill="#f3e6cf" letterSpacing={1}>
        NO PERSONAL VEHICLES
      </text>
    </g>
  </g>
);

// ============ S4 WIDE: the closed road, her rental car stops at the gate (7.23 - 10.3) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const stop = at(t, [7.3, 8.6], [0, 1], outExpo);
  const shake = at(t, [8.5, 8.6, 9.0], [0, 1, 0]);
  const hh = handheld(t, 0.45, shake * 4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 3.07), rot: hh.rot };
  const g = 1500;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={DAY} uid="d" />
      </Plane>
      <Plane cam={cam} depth={0.14} blur={2.4}>
        <Ridge seed={73} base={g - 300} amp={520} scale={150} col="#8d96a2" lit="#ffffff" peak={200} />
      </Plane>
      <Haze y={g - 560} h={300} col={DAY.low} opacity={0.4} />
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
          <path d={`M300,${g - 40} L780,${g - 40} L1300,2200 L-200,2200 Z`} fill="#5c6166" />
          <path d={`M538,${g - 40} L542,${g - 40} L560,2200 L520,2200 Z`} fill="#e9d36a" />
          <Gate x={540} y={g + 120} s={1.1} />
        </Svg>
        <Svg>
          <g transform={`translate(${mix(-120, 250, stop)},${g + 120}) scale(1.4)`}>
            <Car x={0} y={0} body="#c9cdd2" shade="#9aa0a6" />
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f3a30" side="right" />
      </Plane>
      <Particles seed={1194} n={14} col="#ffffff" fall={6} />
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="245,240,228" cool="40,55,70" />
      <Chip text="Closed to personal vehicles" t={t} t0={8.44} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: Priya at the gate, no parking anywhere (10.3 - 13.32) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.03, 1.1, lt / 3.02), rot: hh.rot };
  const g = 1560;
  const p: HikerProps = { x: 470, y: g + 200, scale: 2.5, walk: 0, lean: 0.02, poles: false, handOverride: [70, 70], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={DAY} uid="e" />
      </Plane>
      <Plane cam={cam} depth={0.14} blur={3}>
        <Ridge seed={73} base={g - 360} amp={520} scale={150} col="#8d96a2" lit="#ffffff" peak={200} />
      </Plane>
      <Plane cam={cam} depth={0.5} blur={2.2}>
        <Svg>
          {Array.from({ length: 16 }, (_, i) => (
            <Pine key={i} x={-300 + i * 110} y={g - 60 + (i % 2) * 10} h={280 + (i % 3) * 60} c="#2f5446" c2="#24443a" />
          ))}
          <g transform={`translate(780,${g - 20}) scale(0.9)`}>
            <rect x={-300} y={-150} width={620} height={30} rx={8} fill="#f4f4f4" />
            {Array.from({ length: 6 }, (_, i) => (
              <rect key={i} x={-280 + i * 100} y={-150} width={50} height={30} fill="#c23a32" />
            ))}
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 20} width={1880} height={1400} fill="#5c6166" />
        </Svg>
        <Subject rimX={5} col="rgba(240,236,225,0.8)">
          <Person {...p} outfit={PRIYA} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f3a30" side="left" />
      </Plane>
      <Particles seed={1195} n={12} col="#ffffff" fall={6} />
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="245,240,228" cool="40,55,70" />
      <Chip text="All year" t={t} t0={10.34} x={60} y={200} icon="x" big />
      <Chip text="No parking" t={t} t0={11.3} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// Shuttle bus (side view, local units, ground at y=0).
const Bus: React.FC<{ x: number; y: number; s?: number; flip?: boolean }> = ({ x, y, s = 1, flip }) => (
  <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
    <ellipse cx={0} cy={4} rx={300} ry={14} fill="rgba(0,0,0,0.25)" />
    <rect x={-290} y={-250} width={580} height={220} rx={30} fill="#f2f2ee" />
    <rect x={-290} y={-80} width={580} height={50} fill="#2C6E63" />
    {Array.from({ length: 5 }, (_, i) => (
      <rect key={i} x={-260 + i * 96} y={-220} width={80} height={90} rx={10} fill="#9cc4d6" />
    ))}
    <rect x={226} y={-220} width={50} height={130} rx={8} fill="#9cc4d6" />
    <text x={-60} y={-44} transform={flip ? "scale(-1,1) translate(120,0)" : undefined} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#f2f2ee" letterSpacing={6}>
      SHUTTLE
    </text>
    {[-190, 190].map((wx) => (
      <g key={wx}>
        <circle cx={wx} cy={-24} r={36} fill="#1f2222" />
        <circle cx={wx} cy={-24} r={16} fill="#9aa3a6" />
      </g>
    ))}
  </g>
);

// ============ S6 WIDE: the Park and Ride, the shuttle pulls in, Priya walks over (13.32 - 16.21) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.89), rot: hh.rot };
  const g = 1540;
  const bus = at(t, [13.4, 15.2], [0, 1], outExpo);
  const p: HikerProps = { x: 470 + lt * 50, y: g + 230, scale: 2.2, phase: t * 5, walk: 0.7, lean: 0.06, poles: false, breathe: 0 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={DAY} uid="f" />
      </Plane>
      <Plane cam={cam} depth={0.14} blur={2.6}>
        <Ridge seed={83} base={g - 260} amp={460} scale={160} col="#8d96a2" lit="#ffffff" peak={180} />
      </Plane>
      <Haze y={g - 520} h={300} col={DAY.low} opacity={0.45} />
      <Plane cam={cam} depth={0.45} blur={1.2}>
        <Svg>
          {Array.from({ length: 16 }, (_, i) => (
            <Pine key={i} x={-300 + i * 110} y={g - 50 + (i % 2) * 10} h={230 + (i % 3) * 50} c="#2f5446" c2="#24443a" />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 60} width={1880} height={1400} fill="#5c6166" />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={-200 + i * 190} y={g + 280} width={12} height={160} fill="#e9e6dc" transform={`skewX(-20)`} />
          ))}
          <g transform={`translate(250,${g - 40})`}>
            <rect x={-8} y={-300} width={16} height={300} fill="#5a4030" />
            <rect x={-150} y={-380} width={300} height={110} rx={10} fill="#6b4a2e" stroke="#f3e6cf" strokeWidth={5} />
            <text x={0} y={-336} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#f3e6cf" letterSpacing={2}>
              PARK AND RIDE
            </text>
            <text x={0} y={-292} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={32} fill="#f3e6cf" letterSpacing={1}>
              SHUTTLE STOP
            </text>
          </g>
          <Bus x={mix(1500, 700, bus)} y={g + 120} s={1.1} flip />
        </Svg>
        <Subject rimX={5} col="rgba(255,240,215,0.85)">
          <Person {...p} outfit={PRIYA_H} expression="happy" />
        </Subject>
      </Plane>
      <Particles seed={1196} n={14} col="#ffffff" fall={6} />
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="250,240,222" cool="40,55,70" />
      <Chip text="Here's the fix" t={t} t0={13.35} x={60} y={200} icon="none" big />
      <Chip text="Parks Canada shuttle" t={t} t0={15.2} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 MEDIUM-CLOSE: shuttle door, from the Lake Louise Park and Ride (16.21 - 18.68) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.05, 1.12, lt / 2.47), rot: hh.rot };
  const g = 1640;
  const p: HikerProps = { x: 560, y: g + 260, scale: 4.2, walk: 0, lean: 0.05, poles: false, breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={DAY} uid="g" />
      </Plane>
      <Plane cam={cam} depth={0.4} blur={6}>
        <Svg>
          {Array.from({ length: 12 }, (_, i) => (
            <Pine key={i} x={-300 + i * 150} y={g - 300} h={420} c="#2f5446" c2="#24443a" />
          ))}
          <rect x={-400} y={g - 320} width={1880} height={1400} fill="#5c6166" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={0.75} blur={2}>
        <Svg>
          <g transform={`translate(560,${g - 120}) scale(2.6)`}>
            <rect x={-290} y={-250} width={580} height={220} rx={30} fill="#f2f2ee" />
            <rect x={-290} y={-80} width={580} height={50} fill="#2C6E63" />
            <rect x={-50} y={-236} width={100} height={200} rx={8} fill="#2a3a40" />
            <rect x={-200} y={-220} width={120} height={90} rx={10} fill="#9cc4d6" />
            <rect x={80} y={-220} width={120} height={90} rx={10} fill="#9cc4d6" />
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,240,215,0.85)">
          <Person {...p} outfit={PRIYA_H} expression="happy" />
        </Subject>
      </Plane>
      <Particles seed={1197} n={12} col="#ffffff" fall={6} />
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="250,240,222" cool="40,55,70" vignette={0.5} />
      <Readout label="SHUTTLE FROM" value="Lake Louise" ok={true} t={t} t0={16.6} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: booking a seat on the official site the day seats open (18.68 - 23.59) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const tap = at(t, [21.9, 22.05, 22.3], [0, 1, 0]);
  const hh = handheld(t, 0.3, tap * 2);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 4.91), rot: hh.rot };
  const booked = t > 22.1;
  const ok = at(t, [22.1, 22.4], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-5} col="rgba(230,240,255,0.8)">
          <Svg>
            <Phone x={540} y={1000} s={1.25} rot={3} uid="h">
              <rect x={0} y={0} width={340} height={700} fill="#f4f6f8" />
              <rect x={0} y={0} width={340} height={120} fill="#2C3B2E" />
              <text x={24} y={80} fontFamily={HEAD} fontWeight={800} fontSize={34} fill={PAPER} letterSpacing={2}>
                SHUTTLE SEATS
              </text>
              <text x={24} y={170} fontFamily="Inter" fontWeight={700} fontSize={20} fill={INK}>
                Lake Louise Park and Ride
              </text>
              <text x={24} y={200} fontFamily="Inter" fontWeight={500} fontSize={20} fill="#5b625c">
                to Moraine Lake
              </text>
              {Array.from({ length: 4 }, (_, i) => (
                <g key={i}>
                  <rect x={24} y={240 + i * 80} width={292} height={64} rx={12} fill={i === 0 ? (booked ? "#3e7d4f" : "#e3eef0") : "#e9ecef"} />
                  <rect x={44} y={264 + i * 80} width={110} height={16} rx={6} fill={i === 0 && booked ? "#d8eedd" : "#b9c2c8"} />
                </g>
              ))}
              <rect x={24} y={590} width={292} height={76} rx={38} fill={booked ? "#3e7d4f" : "#2C3B2E"} />
              <text x={170} y={640} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={34} fill="#fff" letterSpacing={3}>
                {booked ? "BOOKED" : "BOOK"}
              </text>
              {ok > 0 && (
                <g transform={`translate(270,160) scale(${ok})`}>
                  <circle r={30} fill="#3e7d4f" />
                  <path d="M-13,1 L-3,11 L15,-9" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              )}
            </Phone>
            {/* thumb */}
            <g transform={`translate(${mix(820, 760, at(t, [21.4, 21.9], [0, 1]))},${1820 - tap * 30})`}>
              <rect x={-60} y={-80} width={120} height={300} rx={58} fill={PRIYA.skin} />
              <ellipse cx={0} cy={-60} rx={46} ry={40} fill={PRIYA.skinShade} opacity={0.4} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1198} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,220,180" vignette={0.55} />
      <Chip text="Official Parks Canada site" t={t} t0={19.65} x={60} y={200} icon="check" big />
      <Chip text="Book the day seats open" t={t} t0={21.7} x={60} y={1400} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF WIDE: sunrise at the lake, Priya on the rocks (23.59 - 26.4) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.04], outExpo), rot: hh.rot };
  const shore = 1180;
  const g = 1700;
  const p: HikerProps = { x: 420, y: g, scale: 2.4, walk: 0, lean: -0.02, poles: false, handOverride: [80, 40], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <LakeValley cam={cam} sky={SUNRISE} uid="i" shore={shore} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g + 20} L200,${g - 120} L420,${g - 60} L700,${g - 160} L1000,${g - 60} L1480,${g - 20} L1480,2400 L-400,2400 Z`} fill="#6a5f58" />
          <path d={`M200,${g - 120} L420,${g - 60} L700,${g - 160} L760,${g - 140}`} fill="none" stroke="#ffcf9c" strokeWidth={8} opacity={0.6} />
          <ellipse cx={850} cy={g + 60} rx={160} ry={60} fill="#5a504a" />
        </Svg>
        <Subject rimX={-6} col="rgba(255,214,160,0.95)">
          <Person {...p} outfit={PRIYA_H} expression="happy" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1f3a30" side="right" />
      </Plane>
      <Rays x={SUNRISE.sun[0]} y={SUNRISE.sun[1]} strength={0.45} col="255,226,180" />
      <Particles seed={1199} n={20} col="#fff1d6" fall={4} />
      <LowScrim />
      <Grade sunX={300} sunY={700} warm="255,214,170" />
      <Readout label="ONE SEAT BOOKED" value="Her sunrise" ok={true} t={t} t0={24.41} x={60} y={200} />
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

export const V119: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.45} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.4} to={5.45} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.4} />
    </Scene>
    <Scene from={5.4} to={7.28} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.4} />
    </Scene>
    <Scene from={7.23} to={10.35} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.23} />
    </Scene>
    <Scene from={10.3} to={13.37} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={10.3} />
    </Scene>
    <Scene from={13.32} to={16.26} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={13.32} />
    </Scene>
    <Scene from={16.21} to={18.73} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={16.21} />
    </Scene>
    <Scene from={18.68} to={23.64} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={18.68} />
    </Scene>
    <Scene from={23.59} to={26.45} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={23.59} />
    </Scene>
    <Scene from={25.9} to={30.0} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.4, 1560],
        [3.4, 5.4, 1560],
        [5.4, 7.23, 1640],
        [7.23, 10.3, 1560],
        [10.3, 13.32, 1560],
        [13.32, 16.21, 1560],
        [16.21, 18.68, 1560],
        [18.68, 23.59, 1560],
        [23.59, 25.9, 1560],
      ]}
    />
  </AbsoluteFill>
);
