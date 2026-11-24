// V166: "Two days to town. One day of food." Short format (17.0 s, 45 words), cinematic C01 style, snowy section hike + desk.
// Product: Long Trail Planner — Section Hike & Thru-Hike Planning Workbook (Printable), $8.99 (live Shopify). End card: boxed store photo (as in V161).
// Advice (standard trip planning, conservative): plan honest daily miles, count the days between resupply points, pack one spare
// day of food. Example numbers on the plan page are Owen's own plan, not a recommendation.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { PlanPage } from "../home";
import { Desk } from "../trip";
import { WINTER, WGOLD, STORM, WinterBackdrop, FrostTrail } from "../winter";
import vo from "../vo/v166.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const OWEN: Outfit = {
  ...JAKE,
  skin: "#E0AC8A",
  skinShade: "#C28C6C",
  hair: "#6a4a30",
  beard: "#6a4a30",
  cap: "#3E4F5C",
  capShade: "#2C3943",
  jacket: "#c9a24a",
  jacketShade: "#a08035",
  pants: "#3f444b",
  pantsShade: "#2e3237",
  pack: "#3E7C6A",
  packShade: "#2f6152",
  glove: "#2a2a2a",
};

// Open food bag on the snow (screen coords): only a little food left inside.
const FoodBag: React.FC<{ x: number; y: number; s: number; t: number }> = ({ x, y, s, t }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={150} rx={250} ry={34} fill="rgba(0,0,0,0.25)" />
    <path d="M-200,140 Q-230,-20 -160,-110 L160,-110 Q230,-20 200,140 Z" fill="#B5553A" />
    <path d="M-200,140 Q-230,-20 -160,-110 L-90,-110 Q-150,0 -130,140 Z" fill="#8E3F2A" />
    <ellipse cx={0} cy={-110} rx={160} ry={40} fill="#5e2a1c" />
    <path d="M-150,-120 Q0,-150 150,-120" stroke="#2a2a2a" strokeWidth={8} fill="none" />
    {/* what is left: one bar, one small pouch */}
    <g transform={`translate(-50,-150) rotate(${-14 + Math.sin(t * 2) * 1})`}>
      <rect x={-50} y={-24} width={100} height={48} rx={8} fill="#e2b33c" />
      <rect x={-50} y={-6} width={100} height={12} fill="#c9962a" />
    </g>
    <g transform="translate(70,-160) rotate(10)">
      <rect x={-46} y={-60} width={92} height={110} rx={14} fill="#3E7C6A" />
      <rect x={-46} y={-60} width={92} height={22} rx={8} fill="#2f6152" />
    </g>
  </g>
);

// Wooden trail signpost (screen coords).
const Signpost: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-14} y={-420} width={28} height={420} fill="#5a3e2a" />
    <path d="M-150,-400 L150,-400 L190,-350 L150,-300 L-150,-300 Z" fill="#7a5638" />
    <text x={10} y={-336} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={58} fill="#f3e6cc" letterSpacing={3}>
      TOWN
    </text>
    <path d="M-160,-404 L160,-404" stroke="#ffffff" strokeWidth={10} strokeLinecap="round" opacity={0.9} />
  </g>
);

// ============ S1 HOOK WIDE: day four of the section hike, snowy ridge trail (0 - 2.0) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 16, y: hh.y, zoom: mix(1.03, 1.1, t / 2.0), rot: hh.rot };
  const g = 1470;
  const ph = t * 3.0;
  const p: HikerProps = { x: 420 + t * 60, y: g + 40, scale: 2.0, phase: ph, walk: 0.7, lean: 0.12, poles: true, breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="a" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={0.08} snow={1} />
        <Subject rimX={-6} col="rgba(255,226,180,0.9)">
          <Person {...p} outfit={OWEN} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.3} col="255,230,190" />
      <Particles seed={1661} n={16} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,225,180" cool="40,50,80" />
      <Title text={"Two days to town.\nOne day of food."} t={t} t0={0} top={110} size={116} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the food bag, almost empty (2.0 - 4.04) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35, at(lt, [0.6, 0.9], [1, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.12, 1.03], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="b" treeY={1150} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={1250} width={1480} height={900} fill="#eef1ee" />
          <path d="M-200,1250 Q540,1200 1280,1260" stroke="#dbe3e8" strokeWidth={30} fill="none" />
        </Svg>
        <Subject rimX={5} col="rgba(255,226,180,0.85)">
          <Svg>
            <FoodBag x={540} y={1040} s={1.7} t={t} />
            {/* gloved hand holding the bag open */}
            <path d="M1300,700 Q1050,760 920,820" stroke={OWEN.jacket} strokeWidth={150} strokeLinecap="round" fill="none" />
            <ellipse cx={880} cy={840} rx={80} ry={66} fill="#2a2a2a" />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1662} n={12} col="#fff1d6" fall={8} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,225,180" cool="40,50,80" vignette={0.5} />
      <Chip text="Day 4" t={t} t0={2.1} x={60} y={170} icon="none" big />
      <Readout label="FOOD LEFT" value="1 DAY" ok={false} t={t} t0={2.6} x={60} y={300} pulseAt={3.3} />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: at the signpost, town is still two days away (4.04 - 5.73) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.69), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 380, y: g + 110, scale: 2.4, walk: 0, lean: 0.06, poles: true, breathe: Math.sin(t * 2) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g - 120} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <Signpost x={790} y={g + 40} s={1.3} />
        </Svg>
        <Subject rimX={-6} col="rgba(240,240,235,0.8)">
          <Person {...p} outfit={OWEN} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2a22" side="left" />
      </Plane>
      <Particles seed={1663} n={20} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="240,240,235" cool="40,50,80" vignette={0.5} />
      <Chip text="Town: 2 days away" t={t} t0={4.2} x={60} y={170} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the fix on the plan page: honest miles, days between resupply, a spare day (5.73 - 10.5) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.9], [1.1, 1.02], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <Svg>
            <g transform="translate(110,440) scale(1.11)">
              <PlanPage
                x={0}
                y={0}
                w={770}
                rows={[
                  ["Honest miles per day", "About 10 mi · 16 km"],
                  ["Days to next resupply", "3 days"],
                  ["Food to pack", "3 days + 1 spare"],
                ]}
                t={t}
                t0={6.45}
                gap={1.9}
              />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1664} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="The fix" t={t} t0={5.8} x={60} y={170} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: next trip, he walks into town with food to spare (10.5 - 12.6) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.1), rot: hh.rot };
  const g = 1480;
  const ph = t * 3.2;
  const p: HikerProps = { x: 380 + lt * 50, y: g + 110, scale: 2.4, phase: ph, walk: 0.7, lean: 0.04, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 80} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={-6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={OWEN} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,246,220" />
      <Particles seed={1665} n={16} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Chip text="One spare day of food" t={t} t0={10.7} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/long-trail-planner.jpg"
      photoH={760}
      spec="32 PRINTABLE PAGES · MI + KM · ANY LONG TRAIL"
      name={
        <>
          Long Trail
          <br />
          Planner
        </>
      }
      nameSize={100}
      price="$8.99"
      save="Save this before your long hike"
    />
  );
};

export const V166: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.08} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.0} to={4.12} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.0} />
    </Scene>
    <Scene from={4.04} to={5.81} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.04} />
    </Scene>
    <Scene from={5.73} to={10.58} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={5.73} />
    </Scene>
    <Scene from={10.5} to={12.7} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={10.5} />
    </Scene>
    <Scene from={12.6} to={17.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.0, 1600],
        [2.0, 4.04, 1600],
        [4.04, 5.73, 1600],
        [5.73, 10.5, 1600],
        [10.5, 12.6, 1600],
      ]}
    />
  </AbsoluteFill>
);
