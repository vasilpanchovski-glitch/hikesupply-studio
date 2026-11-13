// V148: "His U.S. park pass didn't work in Canada." in the cinematic C01 style. Story for the Glacier & Canadian Rockies Pair
// (Glacier and Banff & Jasper Trip Planning Guides, $16.99, live Shopify). Facts kept general and true: the U.S. annual
// park pass covers U.S. federal parks only; Canada's national parks need their own Parks Canada pass (bought online or at
// the park gate); check fees and reservations for both parks before you go; carry passports for the border.
// No prices, no official logos or names of real pass products on screen (generic "annual pass" card).
// End card = real Shopify cover (products/glacier-canadian-rockies-pair.jpg, boxed photo card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, Subject } from "../fall";
import { Desk, INK, PAPER } from "../trip";
import vo from "../vo/v148.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Late-summer afternoon in the Rockies, and a bright next-summer morning for the payoff.
const LATE: Sky = { top: "#4a78a6", mid: "#b7cfe0", low: "#f0dcb6", sun: [820, 480], sunR: 50, sunCol: "#fff6dc", glow: "#ffd9a0" };
const SUMMER: Sky = { top: "#3f74a6", mid: "#a6c8e2", low: "#f2e6c4", sun: [300, 520], sunR: 52, sunCol: "#fff8e0", glow: "#ffe1a0" };
const LAMP = "255,214,170";
const RED = "#c23a32";
const GREEN = "#2f8a55";
const CAR = "#4E7A9A";
const CAR2 = "#3a5d78";

const JAKE2: Outfit = {
  ...JAKE,
  skin: "#E8B48F",
  skinShade: "#C99272",
  hair: "#3a2a1c",
  beard: "#3a2a1c",
  cap: "#B5553A",
  capShade: "#8E3F2A",
  jacket: "#3E5A4A",
  jacketShade: "#2E4538",
  pants: "#5a5248",
  pantsShade: "#433d35",
  pack: "#C9A23A",
  packShade: "#a0801f",
};

// Generic annual pass card (screen coords), no official marks. us = true: "U.S. PARKS", false: Canada pass (green).
const PassCard: React.FC<{ x: number; y: number; s?: number; rot?: number; us?: boolean; cross?: number }> = ({ x, y, s = 1, rot = 0, us = true, cross = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-160} y={-100} width={320} height={200} rx={18} fill={us ? "#f4efe2" : "#e9f1ea"} />
    <rect x={-160} y={-100} width={320} height={64} rx={18} fill={us ? "#2C3B2E" : GREEN} />
    <rect x={-160} y={-56} width={320} height={20} fill={us ? "#2C3B2E" : GREEN} />
    <text x={0} y={-52} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={36} fill="#fff" letterSpacing={3}>
      ANNUAL PASS
    </text>
    {/* little mountain mark */}
    <path d="M-140,70 L-105,16 L-82,44 L-64,22 L-30,70 Z" fill={us ? "#8a7a5e" : "#6a8f74"} />
    <text x={-10} y={30} fontFamily={HEAD} fontWeight={800} fontSize={36} fill={INK} letterSpacing={1}>
      {us ? "U.S. PARKS" : "CANADA"}
    </text>
    <text x={-10} y={70} fontFamily={HEAD} fontWeight={700} fontSize={28} fill={INK} opacity={0.6} letterSpacing={2}>
      {us ? "12 MONTHS" : "PARKS PASS"}
    </text>
    {cross > 0 && (
      <g opacity={cross}>
        <path d="M-150,-90 L150,90 M150,-90 L-150,90" stroke={RED} strokeWidth={22} strokeLinecap="round" />
      </g>
    )}
  </g>
);

// Park entrance: kiosk booth with a window, a sign and the gate arm (up 0 = down, 1 = raised). Generic, no official marks.
const ParkGate: React.FC<{ y: number; up: number; t: number; signX?: number; boothX?: number }> = ({ y, up, t, signX = 330, boothX = 860 }) => (
  <Svg>
    <rect x={-400} y={y - 20} width={1880} height={1400} fill="#7d8a6a" />
    <path d={`M330,${y - 20} L760,${y - 20} L1300,2300 L-300,2300 Z`} fill="#5c6166" />
    <path d={`M540,${y - 20} L548,${y - 20} L620,2300 L560,2300 Z`} fill="#e9d36a" />
    {/* log-cabin style kiosk */}
    <g transform={`translate(${boothX},${y - 20})`}>
      <rect x={-140} y={-320} width={280} height={320} fill="#8a5f42" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={-140} y={-310 + i * 46} width={280} height={8} fill="#6B4630" />
      ))}
      <path d="M-190,-310 L0,-430 L190,-310 Z" fill="#4a5a4a" />
      <rect x={-100} y={-250} width={200} height={130} rx={8} fill="#cfe3ee" />
      <rect x={-100} y={-250} width={200} height={130} rx={8} fill="none" stroke="#5a3e2b" strokeWidth={10} />
      <rect x={-130} y={-120} width={260} height={24} fill="#6B4630" />
    </g>
    {/* sign */}
    <g transform={`translate(${signX},${y - 330})`}>
      <rect x={-6} y={100} width={18} height={220} fill="#5a3e2b" />
      <rect x={-180} y={-20} width={360} height={130} rx={10} fill="#5a3e2b" />
      <rect x={-168} y={-8} width={336} height={106} rx={6} fill="none" stroke="#e8d9b0" strokeWidth={4} />
      <text x={0} y={36} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={42} fill="#f3e6c4" letterSpacing={2}>
        NATIONAL PARK
      </text>
      <text x={0} y={86} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#f3e6c4" letterSpacing={3}>
        ENTRANCE
      </text>
    </g>
    {/* gate arm */}
    <rect x={700} y={y - 150} width={30} height={150} fill="#6a6a6a" />
    <g transform={`rotate(${up * 70} 715 ${y - 135})`}>
      <rect x={220} y={y - 150} width={510} height={30} rx={8} fill="#f4f4f4" />
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x={240 + i * 96} y={y - 150} width={48} height={30} fill={RED} />
      ))}
      <circle cx={232} cy={y - 135} r={10} fill={`rgba(255,80,60,${(0.6 + 0.4 * Math.sin(t * 6)) * (1 - up)})`} />
    </g>
  </Svg>
);

// Trip checklist on paper: lines that tick off (k 0..1 each).
const Checklist: React.FC<{ k: number[] }> = ({ k }) => {
  const items = ["Fees for both parks", "Reservations for both", "Passports"];
  return (
    <g transform="rotate(-2 540 960)">
      <rect x={130} y={500} width={820} height={860} rx={12} fill={PAPER} />
      <text x={190} y={620} fontFamily={HEAD} fontWeight={800} fontSize={70} fill={INK} letterSpacing={2}>
        BEFORE WE GO
      </text>
      <path d="M190,650 L880,650" stroke={INK} strokeWidth={4} opacity={0.4} />
      {items.map((s, i) => (
        <g key={i} transform={`translate(200,${780 + i * 170})`}>
          <rect x={0} y={-60} width={80} height={80} rx={12} fill="none" stroke={INK} strokeWidth={7} />
          <path d="M14,-22 L36,4 L74,-56" stroke={GREEN} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - (k[i] ?? 0)} />
          <text x={120} y={6} fontFamily={HEAD} fontWeight={700} fontSize={60} fill={INK}>
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

// ============ S1 HOOK MEDIUM-WIDE: Jake by his car at a park entrance, holding up his pass (0 - 3.6) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.03, 1.1, t / 3.6), rot: hh.rot };
  const g = 1500;
  const lift = at(t, [0.6, 1.1], [0, 1], outExpo);
  const p: HikerProps = { x: 500, y: g + 300, scale: 2.3, walk: 0, lean: -0.02, poles: false, handOverride: [mix(26, 70, lift), mix(-30, -90, lift)], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LATE} uid="a" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <ParkGate y={g} up={0} t={t} signX={190} />
        <Svg>
          <Car x={130} y={g + 260} s={2.2} body={CAR} shade={CAR2} />
        </Svg>
        <Subject rimX={6} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={JAKE2} expression={t > 2.4 ? "tired" : "neutral"} />
          <g transform={hikerTransform(p)} opacity={lift}>
            <PassCard x={hikerGeometry(p).arms[1].hand[0] + 10} y={hikerGeometry(p).arms[1].hand[1] - 30} s={0.2} rot={-12} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" />
      </Plane>
      <Rays x={LATE.sun[0]} y={LATE.sun[1]} strength={0.3} col="255,240,210" />
      <Particles seed={1481} n={14} col="#fff3d6" fall={4} />
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="255,232,196" />
      <Title text={"His U.S. park pass\ndidn't work\nin Canada."} t={t} t0={0} top={100} size={118} />
      <Chip text="Glacier, then Banff" t={t} t0={1.6} x={60} y={600} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: inside the car, the annual pass on the dashboard, mountains through the windshield (3.6 - 6.9) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.1, lt / 3.3), rot: hh.rot };
  const slide = at(t, [3.9, 4.6], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={{ ...cam, y: cam.y - 200 }} sky={LATE} uid="b" treeY={1250} t={t} blur={5} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* windshield frame and roof */}
          <path d="M-200,-200 L1300,-200 L1300,330 Q540,240 -200,330 Z" fill="#1d2226" />
          <path d="M-200,330 L60,330 L-60,1400 L-200,1400 Z" fill="#23292e" />
          <path d="M1300,330 L1020,330 L1140,1400 L1300,1400 Z" fill="#23292e" />
          {/* rear-view mirror */}
          <rect x={470} y={300} width={16} height={80} fill="#2a3036" />
          <rect x={380} y={370} width={200} height={70} rx={20} fill="#2a3036" />
          <rect x={392} y={380} width={176} height={50} rx={14} fill="#6f8aa2" opacity={0.7} />
          {/* dashboard */}
          <path d="M-200,1260 Q540,1150 1300,1260 L1300,2300 L-200,2300 Z" fill="#2d3237" />
          <path d="M-200,1260 Q540,1150 1300,1260 L1300,1300 Q540,1190 -200,1300 Z" fill="#3c4248" />
        </Svg>
        <Subject rimX={4} col="rgba(255,236,200,0.7)">
          <Svg>
            <g transform={`translate(${mix(-500, 0, slide)},0)`}>
              <PassCard x={540} y={1150} s={1.7} rot={-4} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.5} blur={10}>
        <Svg>
          <circle cx={150} cy={500} r={22} fill="#ffffff" opacity={0.18} />
          <circle cx={900} cy={700} r={16} fill="#ffffff" opacity={0.14} />
        </Svg>
      </Plane>
      <Rays x={820} y={300} strength={0.3} col="255,240,210" />
      <Particles seed={1482} n={12} col="#fff3d6" fall={2} />
      <LowScrim />
      <Grade sunX={820} sunY={300} warm="255,232,196" vignette={0.6} />
      <Chip text="U.S. annual park pass" t={t} t0={4.5} x={60} y={520} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: at the Canadian park gate, Jake shows his pass at the kiosk window (6.9 - 11.13) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4, at(t, [9.45, 9.55, 9.9], [0, 1, 0]) * 3);
  const cam: Cam = { x: hh.x + 280 + lt * 12, y: hh.y + 180, zoom: mix(1.3, 1.38, lt / 4.23), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 620, y: g + 180, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [70, -110], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LATE} uid="c" treeY={g - 160} t={t} blur={4} />
      <Plane cam={cam} depth={1}>
        <ParkGate y={g} up={0} t={t} signX={-300} boothX={900} />
        <Subject rimX={6} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={JAKE2} expression={t > 9.4 ? "tired" : "neutral"} />
          <Svg>
            <PassCard x={760} y={g - 200} s={0.5} rot={-8} cross={at(t, [9.5, 9.8], [0, 1])} />
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="left" />
      </Plane>
      <Particles seed={1483} n={14} col="#fff3d6" fall={4} />
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="255,232,196" />
      <Chip text="Canadian park gate" t={t} t0={7.2} x={60} y={200} icon="none" big />
      <Readout label="HIS PASS" value="U.S. parks only" ok={false} t={t} t0={9.5} x={60} y={330} />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the fix, Jake buys a Parks Canada pass online (11.13 - 17.76) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 8, y: hh.y, zoom: mix(1.04, 1.1, lt / 6.63), rot: hh.rot };
  const g = 1620;
  const p: HikerProps = { x: 330, y: g, scale: 2.4, walk: 0, lean: 0.2, poles: false, handOverride: [80, -10], breathe: Math.sin(t * 2) * 1.2 };
  const page = at(t, [12.3, 13.0], [0, 1]);
  const bought = at(t, [15.9, 16.3], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#2b2620" }}>
      <Plane cam={cam} depth={0.4} blur={8}>
        <Svg>
          <rect x={-200} y={0} width={1500} height={1300} fill="#5a4e40" />
          <rect x={620} y={260} width={360} height={460} rx={10} fill="#1f2a3a" />
          <rect x={640} y={280} width={320} height={420} fill="#9fb8cf" />
          <path d="M640,620 L720,500 L780,560 L860,450 L960,600 L960,700 L640,700 Z" fill="#6f8696" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,180,0.8)">
          <Person {...p} outfit={JAKE2} expression={bought > 0.5 ? "happy" : "neutral"} />
        </Subject>
        <Svg>
          <rect x={-200} y={g - 120} width={1500} height={60} fill="#6e4c34" />
          <rect x={-200} y={g - 60} width={1500} height={600} fill="#55392a" />
          {/* laptop */}
          <g transform={`translate(700,${g - 120})`}>
            <path d="M-230,0 L230,0 L250,24 L-250,24 Z" fill="#9aa3a6" />
            <rect x={-210} y={-300} width={420} height={300} rx={14} fill="#2a2f36" />
            <rect x={-192} y={-282} width={384} height={264} rx={6} fill="#f5f3ee" />
            <g opacity={page}>
              <rect x={-192} y={-282} width={384} height={56} fill={GREEN} />
              <text x={-170} y={-242} fontFamily={HEAD} fontWeight={800} fontSize={34} fill="#fff" letterSpacing={1}>
                CANADA PARKS PASS
              </text>
              <rect x={-170} y={-200} width={230} height={20} rx={6} fill="#d6d2c8" />
              <rect x={-170} y={-165} width={180} height={20} rx={6} fill="#d6d2c8" />
              <rect x={-170} y={-112} width={200} height={64} rx={32} fill={bought > 0.5 ? GREEN : "#b8862c"} />
              <text x={-70} y={-68} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={30} fill="#fff" letterSpacing={2}>
                {bought > 0.5 ? "DONE" : "BUY ONLINE"}
              </text>
            </g>
          </g>
        </Svg>
      </Plane>
      <Particles seed={1484} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={900} warm={LAMP} vignette={0.6} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={12.2} top={200} size={124} />
      <Chip text="Canada's parks need their own pass" t={t} t0={14.2} x={60} y={200} icon="check" big />
      <Chip text="Online or at the gate" t={t} t0={15.8} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the checklist on the desk, fees and reservations for both parks (17.76 - 21.46) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.0, lt / 3.7), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <Checklist k={[at(t, [18.0, 18.5], [0, 1]), at(t, [18.6, 19.1], [0, 1]), 0]} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1485} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Chip text="Check before you go" t={t} t0={19.9} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: two passports land on the checklist, last line ticks (21.46 - 23.27) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.18, 1.26, lt / 1.81), rot: hh.rot };
  const a = at(t, [21.6, 22.1], [0, 1], outExpo);
  const b = at(t, [21.9, 22.4], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <Checklist k={[1, 1, at(t, [22.5, 22.9], [0, 1])]} />
            <g transform={`translate(${(1 - a) * 900},0)`}>
              <Passport x={700} y={1265} rot={-82} col="#1f3352" s={0.75} />
            </g>
            <g transform={`translate(${(1 - b) * 900},0)`}>
              <Passport x={830} y={1285} rot={-96} col="#6a1f2a" s={0.75} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1486} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Chip text="Passports for the border" t={t} t0={21.7} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: next summer, the gate arm rises, both passes on the dash (23.27 - 25.6) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 165, y: g + 320, scale: 2.0, walk: 0, lean: -0.02, poles: false, handOverride: [60, -80], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SUMMER} uid="g" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <ParkGate y={g} up={at(t, [23.5, 24.3], [0, 1], outExpo)} t={t} signX={-300} boothX={880} />
        <Svg>
          <Car x={mix(380, 520, at(t, [24.2, 25.6], [0, 1]))} y={g + 260} s={2.2} body={CAR} shade={CAR2} />
        </Svg>
        <Subject rimX={6} col="rgba(255,236,190,0.9)">
          <Person {...p} outfit={JAKE2} expression="happy" />
          <Svg>
            <PassCard x={260} y={g - 40} s={0.32} rot={-10} />
            <PassCard x={310} y={g - 10} s={0.32} rot={6} us={false} />
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2c4a2e" side="right" />
      </Plane>
      <Rays x={SUMMER.sun[0]} y={SUMMER.sun[1]} strength={0.4} />
      <Particles seed={1487} n={20} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={300} sunY={520} warm="255,232,190" />
      <Readout label="NEXT SUMMER" value="Both passes ready" ok={true} t={t} t0={23.4} x={60} y={200} />
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

export const V148: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.65} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.6} to={6.95} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.6} />
    </Scene>
    <Scene from={6.9} to={11.18} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.9} />
    </Scene>
    <Scene from={11.13} to={17.81} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={11.13} />
    </Scene>
    <Scene from={17.76} to={21.51} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={17.76} />
    </Scene>
    <Scene from={21.46} to={23.32} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={21.46} />
    </Scene>
    <Scene from={23.27} to={25.7} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={23.27} />
    </Scene>
    <Scene from={25.5} to={30} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.6, 1600],
        [3.6, 6.9, 1660],
        [6.9, 11.13, 1600],
        [11.13, 17.76, 1660],
        [17.76, 21.46, 1660],
        [21.46, 23.27, 1660],
        [23.27, 25.5, 1600],
      ]}
    />
  </AbsoluteFill>
);
