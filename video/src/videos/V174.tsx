// V174: "Hiked Thanksgiving morning. Missed the turkey." Short format (16.8 s, 43 words), cinematic C01 style.
// Product: Hiking Trip Planner, $5.99 (live Shopify). End card uses the boxed planner photo (as in V170).
// Advice (conservative): short known trail, start at first light, set a turnaround time; blaze orange where hunting season is open
// (caption tells viewers to check their state wildlife agency).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, Subject, Trail, FALL } from "../fall";
import { PlanPage } from "../home";
import { Desk } from "../trip";
import vo from "../vo/v174.json";

const words = vo.words as unknown as Word[];

const DUSK: Sky = { top: "#3a4f78", mid: "#d49470", low: "#ffc890", sun: [820, 980], sunR: 64, sunCol: "#fff0d0", glow: "#ff9e5c" };
const MORNING: Sky = { top: "#4a72a0", mid: "#b9cfe0", low: "#f6e4c4", sun: [260, 700], sunR: 50, sunCol: "#fff8e4", glow: "#ffd9a0" };

const SAM: Outfit = {
  ...JAKE,
  skin: "#D9A07A",
  skinShade: "#B9805C",
  hair: "#3a2a1e",
  beard: "#3a2a1e",
  cap: "#3E4F5C",
  capShade: "#2C3943",
  jacket: "#2F6B4F",
  jacketShade: "#22513b",
  pants: "#5a5348",
  pantsShade: "#433d35",
};
// Hunting season: blaze orange jacket and cap.
const SAM_ORANGE: Outfit = { ...SAM, jacket: "#FF6A13", jacketShade: "#d4520a", cap: "#FF6A13", capShade: "#d4520a" };

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// ============ S1 HOOK MEDIUM: Sam still far out on a long trail, sun going down (0 - 2.88) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.04, 1.1, t / 2.9), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 420 + t * 30, y: g, scale: 2.3, phase: t * 2.5, walk: 0.55, lean: 0.12, poles: true, breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DUSK} uid="a" treeY={g - 230} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={5} col="rgba(255,206,160,0.9)">
          <Person {...p} outfit={SAM} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1c" side="left" />
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.35} col="255,200,150" />
      <Particles seed={1741} n={18} col="#e9b07a" fall={10} leaves={FALL} />
      <LowScrim />
      <Grade sunX={820} sunY={980} warm="255,196,140" cool="40,50,90" />
      <Title text={"Hiked Thanksgiving\nmorning.\nMissed the turkey."} t={t} t0={0} top={110} size={112} />
    </AbsoluteFill>
  );
};

// The carved-out turkey: a ribcage on a platter.
const Carcass: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={40} rx={330} ry={110} fill="#e9e4da" />
    <ellipse cx={0} cy={34} rx={290} ry={88} fill="#f6f2ea" />
    <ellipse cx={0} cy={22} rx={170} ry={58} fill="#b0703c" />
    {Array.from({ length: 7 }, (_, i) => (
      <path key={i} d={`M${-120 + i * 40},${30} Q${-110 + i * 40},${-60} ${-90 + i * 40},${-70}`} stroke="#ead9bc" strokeWidth={14} fill="none" strokeLinecap="round" />
    ))}
    <path d="M-150,-60 Q0,-110 150,-60" stroke="#e1cba6" strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d="M180,10 L250,-30" stroke="#ead9bc" strokeWidth={16} strokeLinecap="round" />
    <circle cx={258} cy={-36} r={14} fill="#ead9bc" />
    <ellipse cx={-210} cy={52} rx={30} ry={10} fill="#7a9a4a" />
    <ellipse cx={200} cy={62} rx={26} ry={9} fill="#7a9a4a" />
  </g>
);

const Plate: React.FC<{ x: number; y: number; s?: number; crumbs?: boolean }> = ({ x, y, s = 1, crumbs = true }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={150} ry={56} fill="#e8e2d6" />
    <ellipse cx={0} cy={-4} rx={110} ry={38} fill="#f6f2ea" />
    {crumbs && (
      <g>
        <ellipse cx={-30} cy={-6} rx={22} ry={6} fill="#c08a4a" opacity={0.6} />
        <ellipse cx={30} cy={2} rx={14} ry={5} fill="#8a3a2a" opacity={0.6} />
      </g>
    )}
    <rect x={130} y={-50} width={10} height={110} rx={4} fill="#b9bec4" transform="rotate(14)" />
  </g>
);

// ============ S2 CLOSE-UP: home late, the table already cleared down to bones (2.88 - 4.91) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.7], [1.12, 1.04], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1a10" }}>
      <Plane cam={cam} depth={0.4} blur={10}>
        <Svg>
          <rect x={-200} y={-200} width={1500} height={1300} fill="#5a3a26" />
          <rect x={160} y={180} width={360} height={480} rx={10} fill="#1d2a40" />
          <rect x={560} y={180} width={360} height={480} rx={10} fill="#1d2a40" />
          <circle cx={820} cy={260} r={18} fill="#f4f0e0" opacity={0.7} />
          <circle cx={900} cy={620} r={220} fill="#ffcf8a" opacity={0.18} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={1000} width={1500} height={1300} fill="#7a4a2c" />
          <rect x={-200} y={1000} width={1500} height={26} fill="#8e5a36" />
          <rect x={-200} y={1060} width={1500} height={1200} fill="#efe6d2" opacity={0.92} />
        </Svg>
        <Subject rimX={-4} col="rgba(255,226,180,0.8)">
          <Svg>
            <Carcass x={540} y={1300} s={1.25} />
            <Plate x={180} y={1620} s={1.1} />
            <Plate x={900} y={1640} s={1.1} />
            {/* burnt-down candles */}
            {[330, 760].map((x, i) => (
              <g key={i}>
                <rect x={x - 22} y={1150} width={44} height={60} rx={6} fill="#efe2c4" />
                <rect x={x - 32} y={1205} width={64} height={18} rx={6} fill="#a8823a" />
                <path d={`M${x},1150 l0,-14`} stroke="#3a2a1e" strokeWidth={4} />
              </g>
            ))}
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1742} n={10} col="#ffe2b0" fall={4} bokeh />
      <Grade sunX={900} sunY={620} warm="255,206,150" vignette={0.6} />
      <Readout label="DINNER" value="3:00 PM" ok={null} t={t} t0={3.0} x={60} y={170} />
      <Readout label="SAM HOME" value="5:40 PM" ok={false} t={t} t0={3.7} x={60} y={420} pulseAt={3.7} />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the plan on the desk: short known trail, first light, turnaround (4.91 - 10.15) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.9], [1.1, 1.02], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <Svg>
            <g transform="translate(135,470) scale(1.2)">
              <PlanPage
                x={0}
                y={0}
                w={600}
                rows={[
                  ["Trail", "Short loop you know"],
                  ["Start", "First light"],
                  ["Turnaround", "9:30 AM, firm"],
                ]}
                t={t}
                t0={5.6}
                gap={1.5}
              />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1743} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="Short trail you know" t={t} t0={5.3} x={60} y={190} icon="check" big />
      <Chip text="Turnaround time, set" t={t} t0={8.6} x={60} y={320} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: next year, early morning, blaze orange in the woods (10.15 - 12.7) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.1, 1.04, lt / 2.6), rot: hh.rot };
  const g = 1540;
  const p: HikerProps = { x: 560, y: g, scale: 2.4, phase: t * 2.4, walk: 0.45, lean: 0.08, poles: true, breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={MORNING} uid="d" treeY={g - 230} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={-5} col="rgba(255,240,210,0.9)">
          <Person {...p} outfit={SAM_ORANGE} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2c1e" side="right" />
      </Plane>
      <Rays x={MORNING.sun[0]} y={MORNING.sun[1]} strength={0.4} col="255,236,200" />
      <Particles seed={1744} n={18} col="#e9c48a" fall={10} leaves={FALL} />
      <LowScrim />
      <Grade sunX={260} sunY={700} warm="255,232,190" cool="50,70,100" />
      <Chip text="Hunting season: blaze orange" t={t} t0={10.5} x={60} y={190} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-trip-planner-card.jpg"
      photoH={760}
      spec="DIGITAL DOWNLOAD · PRINTABLE PLANNER"
      name={
        <>
          Hiking Trip
          <br />
          Planner
        </>
      }
      nameSize={100}
      price="$5.99"
      save="Save this for Thursday"
    />
  );
};

export const V174: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.96} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.88} to={5.0} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={2.88} />
    </Scene>
    <Scene from={4.91} to={10.25} fadeIn={0.06} fadeOut={0.1}>
      <S3 off={4.91} />
    </Scene>
    <Scene from={10.15} to={12.8} fadeIn={0.06} fadeOut={0.12}>
      <S4 off={10.15} />
    </Scene>
    <Scene from={12.7} to={16.8} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.88, 1600],
        [2.88, 4.91, 1600],
        [4.91, 10.15, 1600],
        [10.15, 12.7, 1600],
      ]}
    />
  </AbsoluteFill>
);
