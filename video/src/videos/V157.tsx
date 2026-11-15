// V157: "One storm wrecked his whole road trip." in the cinematic C01 style, mountain park road trip in the rain.
// Story for the National Parks Road Trip Planner ($7.99, live Shopify). Advice (simple, safe): plan one loose day every
// few days with no booking you can't move; keep a rainy-day plan for each park (visitor center, scenic drive); check the
// park's alerts on nps.gov each morning. No invented figures. End card = real Shopify cover (boxed card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, CLEAR, FALL, GOLD, OVERCAST, Subject, Trail } from "../fall";
import { Blizzard } from "../winter";
import vo from "../vo/v157.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC<{ k?: number }> = ({ k = 0.5 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: `linear-gradient(180deg, rgba(12,18,24,0) 0%, rgba(12,18,24,${k}) 45%, rgba(12,18,24,${k}) 70%, rgba(12,18,24,0) 100%)` }} />
);

const RAINSKY = { top: "#3f4a58", mid: "#7d8792", low: "#b9bcb8", sun: [820, 480] as [number, number], sunR: 26, sunCol: "#e6e6e2", glow: "#cfccc4" };

const CAR = "#3f6f8f";
const CAR2 = "#2f5670";

const JK: Outfit = {
  ...JAKE,
  skin: "#D9A47E",
  skinShade: "#BA855F",
  hair: "#2a1d14",
  beard: "#2a1d14",
  cap: "#2f4f3a",
  capShade: "#233c2c",
  jacket: "#b8452f",
  jacketShade: "#933624",
  pants: "#3e434a",
  pantsShade: "#2d3136",
  pack: "#4a5a3a",
  packShade: "#38452c",
  glove: null,
};

const Rain: React.FC<{ seed: number; n?: number }> = ({ seed, n = 40 }) => <Blizzard seed={seed} n={n} angle={-78} />;

// Wet road / parking strip.
const Lot: React.FC<{ y: number; wet?: number }> = ({ y, wet = 1 }) => (
  <Svg>
    <path d={`M-300,${y - 30} L1400,${y - 30} L1400,2600 L-300,2600 Z`} fill="#4c5258" />
    <path d={`M-300,${y - 30} L1400,${y - 30} L1400,${y - 12} L-300,${y - 12} Z`} fill="#62686e" />
    {[0, 1, 2].map((i) => (
      <ellipse key={i} cx={-60 + i * 520} cy={y + 120 + (i % 2) * 90} rx={170} ry={20} fill="#9fb0bc" opacity={0.35 * wet} />
    ))}
  </Svg>
);

// Trail closed barricade with sign (local coords, feet at 0).
const Closed: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-150} y={-150} width={18} height={150} fill="#5a4a3a" />
    <rect x={132} y={-150} width={18} height={150} fill="#5a4a3a" />
    <rect x={-170} y={-130} width={340} height={34} fill="#f2f0ea" />
    {[0, 1, 2, 3, 4].map((i) => (
      <path key={i} d={`M${-160 + i * 70},-96 L${-130 + i * 70},-130 L${-100 + i * 70},-130 L${-130 + i * 70},-96 Z`} fill="#c8432f" />
    ))}
    <rect x={-120} y={-300} width={240} height={150} rx={10} fill="#f2f0ea" />
    <rect x={-108} y={-288} width={216} height={126} rx={6} fill="none" stroke="#c8432f" strokeWidth={8} />
    <text x={0} y={-238} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#2a2a2a">
      TRAIL
    </text>
    <text x={0} y={-188} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#c8432f">
      CLOSED
    </text>
    <rect x={-8} y={-150} width={16} height={20} fill="#5a4a3a" />
  </g>
);

// Phone held upright, screen content given as children in a 360x640 box.
const PhoneBig: React.FC<{ x: number; y: number; s?: number; rot?: number; children: React.ReactNode; light?: boolean }> = ({ x, y, s = 1, rot = 0, children, light = true }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-200} y={-360} width={400} height={720} rx={50} fill="#1b1d1e" />
    <rect x={-180} y={-330} width={360} height={660} rx={34} fill={light ? "#f4f5f2" : "#20262c"} />
    <g transform="translate(-180,-330)">{children}</g>
  </g>
);

const Hand: React.FC<{ x: number; y: number; r?: number; flip?: boolean }> = ({ x, y, r = 0, flip }) => (
  <g transform={`translate(${x},${y}) rotate(${r}) scale(${flip ? -1 : 1},1)`}>
    <rect x={-80} y={-60} width={160} height={120} rx={50} fill={JK.skin} />
    {[0, 1, 2].map((i) => (
      <line key={i} x1={-40 + i * 40} y1={-56} x2={-40 + i * 40} y2={-20} stroke={JK.skinShade} strokeWidth={6} strokeLinecap="round" />
    ))}
    <path d="M60,-40 L260,-60 L270,60 L60,60 Z" fill={JK.jacket} />
  </g>
);

const Row: React.FC<{ y: number; a: string; b: string; col: string; k?: number; strong?: boolean }> = ({ y, a, b, col, k = 1, strong }) => (
  <g opacity={k} transform={`translate(0,${(1 - k) * 20})`}>
    <rect x={20} y={y} width={320} height={96} rx={16} fill={strong ? col : "#ffffff"} stroke={col} strokeWidth={4} />
    <text x={44} y={y + 42} fontFamily={HEAD} fontWeight={800} fontSize={34} fill={strong ? "#ffffff" : "#2a2a2a"}>
      {a}
    </text>
    <text x={44} y={y + 78} fontFamily={HEAD} fontWeight={600} fontSize={26} fill={strong ? "#ffffff" : col}>
      {b}
    </text>
  </g>
);

// ============ S1 HOOK MEDIUM: Jake in the rain at a closed trailhead, car behind (0 - 3.4) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - t * 10, y: hh.y, zoom: mix(1.04, 1.1, t / 3.4), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 560, y: g + 40, scale: 2.4, walk: 0, lean: 0.02, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={RAINSKY} uid="a" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <Lot y={g + 40} />
        <Svg>
          <Car x={200} y={g + 20} s={2.2} body={CAR} shade={CAR2} lights />
          <Closed x={900} y={g + 10} s={1.1} />
        </Svg>
        <Subject rimX={5} col="rgba(230,234,238,0.75)">
          <Person {...p} outfit={JK} expression="tired" />
        </Subject>
      </Plane>
      <Rain seed={1571} n={46} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#26352a" side="left" />
      </Plane>
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="226,230,234" cool="30,40,60" />
      <Title text={"One storm\nwrecked his\nroad trip."} t={t} t0={0} top={120} size={124} />
      <Chip text="Day 3" t={t} t0={1.4} x={60} y={640} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the closed sign in the rain, nine hours of driving for nothing (3.4 - 6.23) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.05, 1.12, lt / 2.83), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={RAINSKY} uid="b" treeY={1200} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,1500 L1300,1500 L1300,2400 L-200,2400 Z" fill="#5b5f4c" />
          <Closed x={540} y={1560} s={2.6} />
        </Svg>
      </Plane>
      <Rain seed={1572} n={50} />
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="226,230,234" cool="30,40,60" vignette={0.55} />
      <Chip text="Trail closed" t={t} t0={3.6} x={60} y={200} icon="x" big />
      <Chip text="9 hours of driving" t={t} t0={4.7} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: phone, every night booked somewhere else (6.23 - 8.6) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.37), rot: hh.rot };
  const k = (i: number) => at(t, [6.5 + i * 0.35, 6.8 + i * 0.35], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={RAINSKY} uid="c" treeY={1100} blur={18} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(230,234,238,0.7)">
          <Svg>
            <PhoneBig x={560} y={1020} rot={-5}>
              <text x={30} y={70} fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#2a2a2a">
                MY BOOKINGS
              </text>
              <Row y={110} a="Night 3" b="Booked · this park" col="#c8432f" k={k(0)} />
              <Row y={226} a="Night 4" b="Booked · next park" col="#c8432f" k={k(1)} />
              <Row y={342} a="Night 5" b="Booked · next park" col="#c8432f" k={k(2)} />
              <Row y={458} a="Night 6" b="Booked · next park" col="#c8432f" k={k(3)} />
            </PhoneBig>
            <Hand x={380} y={1360} r={-100} />
          </Svg>
        </Subject>
      </Plane>
      <div style={{ position: "absolute", inset: 0, opacity: 0.6 }}>
        <Rain seed={1573} n={24} />
      </div>
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="226,230,234" cool="30,40,60" vignette={0.55} />
      <Chip text="Every night booked" t={t} t0={6.6} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 WIDE: the car drives on in the rain, the trail left behind (8.6 - 10.94) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.02, 1.07, lt / 2.34), rot: hh.rot };
  const g = 1540;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={RAINSKY} uid="d" treeY={g - 180} t={t} />
      <Plane cam={cam} depth={1}>
        <Lot y={g + 40} />
        <Svg>
          <Closed x={240} y={g + 10} s={0.9} />
          <Car x={mix(520, 980, lt / 2.34)} y={g + 140} s={2.4} body={CAR} shade={CAR2} lights />
        </Svg>
      </Plane>
      <Rain seed={1574} n={50} />
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="226,230,234" cool="30,40,60" />
      <Readout label="THE HIKE HE CAME FOR" value="Skipped" ok={false} t={t} t0={8.9} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: the fix, Jake plans at a picnic table in the sun (10.94 - 14.1) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y - lt * 4, zoom: mix(1.04, 1.1, lt / 3.16), rot: hh.rot };
  const g = 1540;
  const p: HikerProps = { x: 380, y: g + 40, scale: 2.4, walk: 0, lean: 0.12, poles: false, handOverride: [70, 0], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={g - 180} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={JK} expression="neutral" />
          <Svg>
            {/* picnic table with the open planner */}
            <rect x={470} y={g - 110} width={520} height={30} rx={6} fill="#8a6440" />
            <rect x={500} y={g - 80} width={24} height={160} fill="#6e4e32" />
            <rect x={930} y={g - 80} width={24} height={160} fill="#6e4e32" />
            <rect x={460} y={g - 10} width={540} height={22} rx={6} fill="#7a5838" />
            <g transform={`translate(640,${g - 118}) skewX(-20)`}>
              <rect x={0} y={-22} width={110} height={22} fill="#f7f4ec" />
              <rect x={112} y={-22} width={110} height={22} fill="#efeadf" />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a2c" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.3} />
      <Particles seed={1575} n={14} bokeh fall={8} leaves={FALL} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,236,205" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={12.2} top={200} size={124} />
      <Chip text="One loose day" t={t} t0={12.3} x={60} y={200} icon="check" big />
      <Chip text="Every few days" t={t} t0={13.2} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the plan with a loose day, nothing booked that can't move (14.1 - 16.23) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.13), rot: hh.rot };
  const k = (i: number) => at(t, [14.2 + i * 0.3, 14.5 + i * 0.3], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={1100} blur={18} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,170,0.85)">
          <Svg>
            <PhoneBig x={540} y={1000} rot={4}>
              <text x={30} y={70} fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#2a2a2a">
                MY PLAN
              </text>
              <Row y={110} a="Day 3" b="Park hike" col="#2f6a4a" k={k(0)} />
              <Row y={226} a="Day 4" b="Park hike" col="#2f6a4a" k={k(1)} />
              <Row y={342} a="Day 5 · LOOSE DAY" b="Nothing booked" col="#2f6a4a" k={k(2)} strong />
              <Row y={458} a="Day 6" b="Drive on" col="#2f6a4a" k={k(3)} />
            </PhoneBig>
            <Hand x={720} y={1340} r={-80} flip />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1576} n={10} bokeh fall={6} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,236,205" vignette={0.5} />
      <Chip text="Only bookings you can move" t={t} t0={14.9} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// Small visitor center building (feet at 0).
const Visitor: React.FC<{ x: number; y: number; s?: number; lit?: number }> = ({ x, y, s = 1, lit = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-220} y={-200} width={440} height={200} fill="#8a6a4a" />
    <path d="M-260,-200 L0,-330 L260,-200 Z" fill="#4a3a2e" />
    {[-150, -60, 60, 150].map((wx) => (
      <rect key={wx} x={wx - 34} y={-160} width={68} height={70} rx={4} fill={`rgba(255,214,140,${0.55 + 0.4 * lit})`} />
    ))}
    <rect x={-40} y={-110} width={80} height={110} fill="#3a2c22" />
    <rect x={-150} y={-260} width={300} height={44} rx={6} fill="#2f4a36" />
    <text x={0} y={-228} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={30} fill="#f2f0ea">
      VISITOR CENTER
    </text>
  </g>
);

// ============ S7 MEDIUM: rainy-day plan, Jake heads into the visitor center, smiling (16.23 - 21.21) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 8, y: hh.y, zoom: mix(1.03, 1.1, lt / 4.98), rot: hh.rot };
  const g = 1540;
  const ph = t * 2.2;
  const walk = at(t, [16.4, 18.4], [0, 1]);
  const p: HikerProps = { x: mix(220, 420, walk), y: g + 40, scale: 2.3, phase: ph, walk: walk < 1 ? 0.5 : 0, lean: 0.03, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="g" treeY={g - 180} t={t} />
      <Plane cam={cam} depth={1}>
        <Lot y={g + 40} wet={0.7} />
        <Svg>
          <Visitor x={730} y={g + 60} s={2.3} />
        </Svg>
        <Subject rimX={5} col="rgba(240,236,225,0.8)">
          <Person {...p} outfit={JK} expression="happy" />
        </Subject>
      </Plane>
      <div style={{ position: "absolute", inset: 0, opacity: 0.55 }}>
        <Rain seed={1577} n={30} />
      </div>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#26352a" side="left" />
      </Plane>
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="240,234,222" cool="40,50,66" />
      <Chip text="Rainy-day plan" t={t} t0={16.4} x={60} y={200} icon="check" big />
      <Chip text="Visitor center" t={t} t0={18.4} x={60} y={330} icon="check" big />
      <Chip text="Scenic drive" t={t} t0={19.8} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: morning, the park alerts page on the phone (21.21 - 24.0) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.79), rot: hh.rot };
  const k = at(t, [21.5, 22.0], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="i" treeY={1100} blur={18} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,170,0.85)">
          <Svg>
            <PhoneBig x={540} y={1000} rot={-3}>
              <rect x={0} y={0} width={360} height={110} fill="#2f4a36" />
              <text x={30} y={68} fontFamily={HEAD} fontWeight={800} fontSize={38} fill="#ffffff">
                PARK ALERTS
              </text>
              <g opacity={k}>
                <rect x={20} y={140} width={320} height={130} rx={16} fill="#fff4dc" stroke="#d99a2b" strokeWidth={4} />
                <text x={44} y={190} fontFamily={HEAD} fontWeight={800} fontSize={32} fill="#2a2a2a">
                  Trail conditions
                </text>
                <text x={44} y={236} fontFamily={HEAD} fontWeight={600} fontSize={26} fill="#8a5a10">
                  Read before you go
                </text>
                <rect x={20} y={290} width={320} height={130} rx={16} fill="#ffffff" stroke="#9aa3a6" strokeWidth={4} />
                <text x={44} y={340} fontFamily={HEAD} fontWeight={800} fontSize={32} fill="#2a2a2a">
                  Road status
                </text>
                <text x={44} y={386} fontFamily={HEAD} fontWeight={600} fontSize={26} fill="#555">
                  Check each morning
                </text>
              </g>
            </PhoneBig>
            <Hand x={360} y={1340} r={-100} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1578} n={12} bokeh fall={6} />
      <LowScrim />
      <Grade sunX={760} sunY={620} warm="255,230,190" vignette={0.5} />
      <Chip text="Check park alerts" t={t} t0={21.4} x={60} y={200} icon="check" big />
      <Chip text="nps.gov, each morning" t={t} t0={22.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF WIDE: golden light, Jake on the trail after all (24.0 - 25.3) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y + lt * 6, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const tilt = -0.08;
  const x = 340 + lt * 90;
  const g = 1560 - tilt * (x - 540);
  const ph = t * 2.6;
  const p: HikerProps = { x, y: g + 40, scale: 2.4, phase: ph, walk: 0.6, lean: -0.02, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={1560} tilt={tilt} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={JK} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2a3a2c" side="right" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1] - 100} strength={0.45} />
      <Particles seed={1579} n={22} bokeh fall={8} leaves={FALL} />
      <LowScrim />
      <Grade sunX={760} sunY={620} warm="255,226,180" />
      <Readout label="THE HIKE HE CAME FOR" value="Done" ok={true} t={t} t0={24.1} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/national-parks-road-trip-planner-card.jpg"
      photoH={800}
      spec="32 PRINTABLE PAGES · BUDGET + BOOKINGS"
      name={
        <>
          National Parks
          <br />
          Road Trip Planner
        </>
      }
      nameSize={88}
      price="$7.99"
      save="Save this while you plan"
    />
  );
};

export const V157: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.45} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.4} to={6.28} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.4} />
    </Scene>
    <Scene from={6.23} to={8.65} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={6.23} />
    </Scene>
    <Scene from={8.6} to={10.99} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={8.6} />
    </Scene>
    <Scene from={10.94} to={14.15} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={10.94} />
    </Scene>
    <Scene from={14.1} to={16.28} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.1} />
    </Scene>
    <Scene from={16.23} to={21.26} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={16.23} />
    </Scene>
    <Scene from={21.21} to={24.05} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={21.21} />
    </Scene>
    <Scene from={24.0} to={25.3} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={24.0} />
    </Scene>
    <Scene from={25.1} to={29.5} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.4, 1600],
        [3.4, 6.23, 1660],
        [6.23, 8.6, 1660],
        [8.6, 10.94, 1600],
        [10.94, 14.1, 1600],
        [14.1, 16.23, 1660],
        [16.23, 21.21, 1600],
        [21.21, 24.0, 1660],
        [24.0, 25.1, 1600],
      ]}
    />
  </AbsoluteFill>
);
