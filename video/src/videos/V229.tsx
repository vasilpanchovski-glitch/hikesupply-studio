// V229: "Rated 20°F. Freezing at 30°F." Short format (17.0 s, 43 words), cinematic C01 style, winter camp night.
// Product: Camping Trip Planner & Checklists — Tent and Car Camping (Printable), $5.99 (live Shopify), boxed store cover as in V213.
// Advice (plain, common): many sleeping bag temperature numbers are a survival or limit rating, not comfort. Pick a bag rated
// well below the coldest night you expect, and sleep on a warm (insulated) pad. No invented numbers beyond the story's 20 and 30°F.
// Tent interior, sleeping bag and pad parts reused from V213 / V176.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { FrostTrail, WinterBackdrop } from "../winter";
import { Subject } from "../fall";
import vo from "../vo/v229.json";

const words = vo.words as unknown as Word[];

const DAN: Outfit = {
  ...JAKE,
  skin: "#E7B596",
  skinShade: "#C99478",
  hair: "#7a4a26",
  beard: "#7a4a26",
  cap: "#3a4a6a",
  capShade: "#2b3850",
  jacket: "#3F6B55",
  jacketShade: "#2D5141",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#B5553A",
  packShade: "#8E3F2A",
  glove: "#2a2a2a",
};
const BAG = { c: "#C2662E", s: "#9B4E20" };
const WARM = { c: "#2C4F7A", s: "#213c5e" };
const THIN = "#d9c34a";
const THICK = { c: "#2F7F86", s: "#256870" };
const TENT = { wall: "#2b3d58", wall2: "#22324a", floor: "#1c2433" };
const NIGHT = { top: "#0f1a2e", mid: "#22385a", low: "#3d5778", sun: [820, 380] as [number, number], sunR: 30, sunCol: "#f2f4ff", glow: "#7f95b8" };

const Puff: React.FC<{ x: number; y: number; t: number; dir?: number; s?: number }> = ({ x, y, t, dir = 1, s = 1 }) => (
  <g>
    {[0, 0.5].map((o) => {
      const q = (t * 0.7 + o) % 1;
      return <circle key={o} cx={x + dir * (20 + q * 80) * s} cy={y - q * 30 * s} r={(8 + q * 26) * s} fill="#eef3f8" opacity={0.45 * (1 - q)} />;
    })}
  </g>
);

const Frost: React.FC<{ n: number; y0: number; y1: number; seed: number; op?: number }> = ({ n, y0, y1, seed, op = 0.8 }) => (
  <g opacity={op}>
    {Array.from({ length: n }, (_, i) => {
      const x = (i * 157 + seed * 31) % 1180 - 50;
      const y = y0 + ((i * 97 + seed * 13) % Math.max(1, y1 - y0));
      const r = 6 + (i % 4) * 4;
      return (
        <g key={i} transform={`translate(${x},${y}) rotate(${i * 23})`} stroke="#e8f3ff" strokeWidth={2.4}>
          <line x1={-r} y1={0} x2={r} y2={0} />
          <line x1={-r * 0.5} y1={-r * 0.87} x2={r * 0.5} y2={r * 0.87} />
          <line x1={-r * 0.5} y1={r * 0.87} x2={r * 0.5} y2={-r * 0.87} />
        </g>
      );
    })}
  </g>
);

const TentInside: React.FC<{ y: number; frost?: number; glow?: string }> = ({ y, frost = 1, glow = "#9fb2cc" }) => (
  <Svg>
    <rect x={-200} y={-200} width={1500} height={2400} fill={TENT.wall} />
    <path d={`M-200,${y} L540,-200 L1300,${y} Z`} fill={TENT.wall2} />
    <path d={`M540,-200 L540,${y}`} stroke="#1a2638" strokeWidth={10} />
    <path d={`M-200,${y - 600} Q540,${y - 760} 1300,${y - 600}`} stroke="#1a2638" strokeWidth={8} fill="none" />
    <circle cx={800} cy={300} r={500} fill={glow} opacity={0.08} />
    <Frost n={46} y0={-100} y1={y - 300} seed={3} op={frost} />
    <rect x={-200} y={y} width={1500} height={1200} fill={TENT.floor} />
  </Svg>
);

// Dan lying in his bag, head to the left. thick 0..1 swaps the thin pad for a thick one.
const InBag: React.FC<{ x: number; y: number; s: number; t: number; shiver?: number; thick?: number; bag?: { c: string; s: string }; expr?: "tired" | "neutral" | "happy" }> = ({
  x,
  y,
  s,
  t,
  shiver = 0,
  thick = 0,
  bag = BAG,
  expr = "tired",
}) => {
  const j = Math.sin(t * 44) * 3 * shiver;
  const k = s / 3;
  const lift = thick * 34 * k;
  const p: HikerProps = { x: 0, y: 0, scale: s, walk: 0, lean: 0, poles: false, breathe: 0, handOverride: [8, -8] };
  return (
    <g transform={`translate(${x + j},${y - lift})`}>
      <rect x={-560 * k} y={60 * k + lift} width={1300 * k} height={14 * k} rx={6} fill={THIN} opacity={1 - thick} />
      <g opacity={thick}>
        <rect x={-560 * k} y={40 * k} width={1300 * k} height={50 * k + lift} rx={18} fill={THICK.c} />
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1={-500 * k + i * 125 * k} y1={44 * k} x2={-500 * k + i * 125 * k} y2={84 * k + lift} stroke={THICK.s} strokeWidth={6} />
        ))}
      </g>
      <g transform={`translate(${700 * k},${-72 * k}) rotate(-90)`}>
        <Person {...p} outfit={DAN} expression={expr} noPack />
      </g>
      <path
        d={`M${-330 * k},${-70 * k} Q${-200 * k},${-180 * k} ${200 * k},${-165 * k} Q${640 * k},${-140 * k} ${700 * k},${-10 * k} Q${720 * k},${50 * k} ${600 * k},${60 * k} L${-330 * k},${60 * k} Q${-380 * k},${0} ${-330 * k},${-70 * k} Z`}
        fill={bag.c}
      />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M${(-200 + i * 140) * k},${-165 * k} Q${(-220 + i * 140) * k},${-30 * k} ${(-200 + i * 140) * k},${58 * k}`} stroke={bag.s} strokeWidth={7} fill="none" />
      ))}
      <path d={`M${-330 * k},${-70 * k} Q${-420 * k},${-10 * k} ${-330 * k},${60 * k}`} stroke={bag.s} strokeWidth={22 * k} fill="none" strokeLinecap="round" />
    </g>
  );
};

const Tent: React.FC<{ x: number; y: number; s?: number; glow?: number }> = ({ x, y, s = 1, glow = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={8} rx={230} ry={20} fill="rgba(0,0,0,0.35)" />
    <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill="#5f7a4a" />
    <path d="M0,-250 Q200,-230 220,0 L80,0 Q90,-150 0,-250 Z" fill="#4c6339" />
    {glow > 0 && <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill={`rgba(255,200,120,${0.3 * glow})`} />}
    <path d="M-90,0 Q-80,-160 0,-180 Q80,-160 90,0 Z" fill={glow > 0 ? `rgba(255,214,150,${0.55 + glow * 0.35})` : "#2a3322"} />
    <path d="M-200,-60 Q0,-120 200,-60" stroke="#2f3f26" strokeWidth={5} fill="none" />
  </g>
);

// Sewn-in temperature label on the bag (screen units). hi 0..1 highlights the small "survival" line.
const BagLabel: React.FC<{ x: number; y: number; s?: number; hi?: number; rot?: number }> = ({ x, y, s = 1, hi = 0, rot = -4 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-230} y={-170} width={460} height={340} rx={14} fill="#f4f1ea" stroke="#d8d2c4" strokeWidth={4} />
    <rect x={-230} y={-170} width={460} height={64} rx={14} fill="#2a2d31" />
    <text x={0} y={-124} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={36} letterSpacing={4} fill="#f4f1ea">
      TEMP RATING
    </text>
    <text x={0} y={40} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={170} fill="#2a2d31">
      20°F
    </text>
    <rect x={-170} y={78} width={340} height={56} rx={10} fill={`rgba(217,68,58,${hi})`} />
    <text x={0} y={118} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={38} letterSpacing={3} fill={hi > 0.5 ? "#ffffff" : "#6b6b66"}>
      SURVIVAL LIMIT
    </text>
    {/* stitches */}
    <rect x={-218} y={-158} width={436} height={316} rx={10} fill="none" stroke="#bdb5a4" strokeWidth={3} strokeDasharray="10 8" />
  </g>
);

// ============ S1 HOOK: inside the frosty tent, Dan shivering in his bag (0 - 2.52) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, t / 2.52), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <TentInside y={1460} frost={1} />
        <Svg>
          <InBag x={470} y={1400} s={2.8} t={t} shiver={1} />
          <Puff x={280} y={1220} t={t} dir={-1} s={1.6} />
        </Svg>
      </Plane>
      <Particles seed={2291} n={12} col="#e8f3ff" fall={3} bokeh />
      <Grade sunX={800} sunY={300} warm="200,215,240" cool="20,35,70" vignette={0.6} />
      <Title text={"Rated 20°F.\nFreezing\nat 30°F."} t={t} t0={0} top={120} size={128} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the label says 20°F, tonight is 30°F (2.52 - 5.17) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.7], [1.12, 1.02], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1500} height={2400} fill={BAG.c} />
          {Array.from({ length: 7 }, (_, i) => (
            <path key={i} d={`M-200,${100 + i * 300} Q540,${40 + i * 300} 1300,${120 + i * 300}`} stroke={BAG.s} strokeWidth={14} fill="none" />
          ))}
          <BagLabel x={540} y={1020} s={1.5} />
          {/* gloved thumb on the corner */}
          <ellipse cx={170} cy={1300} rx={110} ry={80} fill="#2a2a2a" transform="rotate(-20 170 1300)" />
          <path d="M-200,1600 Q60,1440 150,1330" stroke={DAN.jacket} strokeWidth={170} fill="none" strokeLinecap="round" />
        </Svg>
        <Svg>
          <Frost n={18} y0={0} y1={1800} seed={7} op={0.5} />
        </Svg>
      </Plane>
      <Particles seed={2292} n={10} col="#e8f3ff" fall={3} bokeh />
      <Grade sunX={540} sunY={700} warm="230,226,220" cool="20,35,70" vignette={0.55} />
      <Readout label="TONIGHT" value="30°F" ok={null} t={t} t0={2.9} x={60} y={170} />
      <Chip text="He barely slept" t={t} t0={4.2} x={60} y={420} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the small line on the label: survival, not comfort (5.17 - 7.86) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 2.7), rot: hh.rot };
  const hi = at(t, [5.6, 6.0], [0, 1]);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1500} height={2400} fill={BAG.c} />
          {Array.from({ length: 7 }, (_, i) => (
            <path key={i} d={`M-200,${60 + i * 300} Q540,${0 + i * 300} 1300,${80 + i * 300}`} stroke={BAG.s} strokeWidth={14} fill="none" />
          ))}
          <BagLabel x={560} y={900} s={2.1} hi={hi} rot={-2} />
        </Svg>
      </Plane>
      <Grade sunX={540} sunY={700} warm="240,232,220" cool="20,35,70" vignette={0.55} />
      <Chip text="Often a survival number" t={t} t0={5.3} x={60} y={170} icon="x" big />
      <Chip text="Not comfort" t={t} t0={6.5} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 WIDE: the rule: next trip, a bag rated well below the coldest night (7.86 - 10.5) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.04], outExpo), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 330, y: g + 20, scale: 2.4, walk: 0, lean: 0.03, poles: false, handOverride: [64, 40], breathe: Math.sin(t * 2) * 1.5 };
  const bx = 330 + 64 * 2.4 + 30;
  const by = g + 20 - 182 * 2.4 + 40 * 2.4 + 40;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="d" treeY={g - 240} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <Tent x={780} y={g + 10} s={1.5} glow={1} />
        </Svg>
        <Subject rimX={-5} col="rgba(255,214,150,0.9)">
          <Person {...p} outfit={DAN} expression="happy" noPack />
          {/* the warmer bag, rolled in his arms */}
          <g transform={`translate(${bx},${by})`}>
            <rect x={-70} y={-110} width={150} height={230} rx={60} fill={WARM.c} />
            {[-60, 0, 60].map((y) => (
              <path key={y} d={`M-66,${y} Q5,${y + 16} 76,${y}`} stroke={WARM.s} strokeWidth={8} fill="none" />
            ))}
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0f1c22" side="right" />
      </Plane>
      <Rays x={1000} y={1100} strength={0.16} col="255,200,140" />
      <Particles seed={2294} n={22} col="#ffffff" fall={6} />
      <Grade sunX={780} sunY={1300} warm="255,200,150" cool="20,35,70" vignette={0.55} />
      <Chip text="The rule" t={t} t0={7.95} x={60} y={170} icon="none" big />
      <Chip text="Rated well below" t={t} t0={8.6} x={60} y={300} icon="check" big />
      <Chip text="your coldest night" t={t} t0={9.3} x={60} y={430} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: a warm pad slides under him, he sleeps (10.5 - 13.3) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.8), rot: hh.rot };
  const thick = at(t, [11.0, 11.6], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <TentInside y={1480} frost={0} glow="#ffd9a0" />
        <Svg>
          <InBag x={530} y={1420} s={3.2} t={t} thick={thick} bag={WARM} expr={thick > 0.5 ? "happy" : "neutral"} />
        </Svg>
      </Plane>
      <Particles seed={2295} n={10} col="#fff3d6" fall={2} bokeh />
      <Grade sunX={800} sunY={300} warm="255,214,170" vignette={0.5} />
      <Chip text="And a warm pad" t={t} t0={11.0} x={60} y={170} icon="check" big />
      <Chip text="Warm all night" t={t} t0={11.9} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/camping-trip-planner-checklists.jpg"
      photoH={720}
      spec="24 PAGES · TENT + CAR CAMPING"
      name={
        <>
          Camping Trip
          <br />
          Planner
        </>
      }
      nameSize={104}
      price="$5.99"
      save="Save this before your winter camp"
    />
  );
};

export const V229: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.6} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.52} to={5.25} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.52} />
    </Scene>
    <Scene from={5.17} to={7.94} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.17} />
    </Scene>
    <Scene from={7.86} to={10.58} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={7.86} />
    </Scene>
    <Scene from={10.5} to={13.4} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={10.5} />
    </Scene>
    <Scene from={13.3} to={17.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.52, 1600],
        [2.52, 5.17, 1600],
        [5.17, 7.86, 1600],
        [7.86, 10.5, 1600],
        [10.5, 13.3, 1600],
      ]}
    />
  </AbsoluteFill>
);
