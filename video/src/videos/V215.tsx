// V215: "First hike in months. Sore for days." Short format (15.6 s, 43 words), cinematic C01 style, winter trail, new year.
// Product: Trail Ready: 8-Week Beginner Hiking Training Plan (Printable), $12.99 (live Shopify). End card: boxed store photo (as in V65).
// Advice (simple, safe, no numbers beyond Grace's story): after a long break, start with short, easy hikes and add a little each
// week. The week ladder shows growing bars only, no distances. No medical claims.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject, Sweat } from "../fall";
import { WINTER, WGOLD, WinterBackdrop, FrostTrail } from "../winter";
import vo from "../vo/v215.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const GRACE: Outfit = {
  ...GUIDE,
  skin: "#F0C4A2",
  skinShade: "#D3A282",
  hair: "#b5793e",
  ponytail: "#b5793e",
  beard: null,
  cap: "#7a3b5a",
  capShade: "#5e2c45",
  jacket: "#3E7C6A",
  jacketShade: "#2f6152",
  pants: "#33363e",
  pantsShade: "#25272d",
  boot: "#5a3e2a",
  sole: "#1d1916",
  pack: "#c9a24a",
  packShade: "#a08035",
  glove: "#2a2a2a",
};
const GRACE_HOME: Outfit = { ...GRACE, cap: "#b5793e", capShade: "#9a6430", jacket: "#c9b49a", jacketShade: "#ab967c" };

// Week ladder card: bars that grow a little each week (no numbers on the bars).
const Ladder: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => (
  <g>
    <rect x={110} y={520} width={860} height={820} rx={30} fill="#f7f2e8" stroke="#d6cbb6" strokeWidth={4} />
    {[0, 1, 2, 3, 4].map((w) => {
      const y = 620 + w * 140;
      const k = at(t, [t0 + w * 0.35, t0 + w * 0.35 + 0.3], [0, 1], outExpo);
      return (
        <g key={w} opacity={k}>
          <text x={160} y={y + 46} fontFamily="Barlow Condensed" fontWeight={800} fontSize={52} fill="#2c3b2e" letterSpacing={2}>
            WEEK {w + 1}
          </text>
          <rect x={400} y={y + 6} width={520} height={50} rx={25} fill="#e6dfd0" />
          <rect x={400} y={y + 6} width={(150 + w * 70) * k} height={50} rx={25} fill={w === 0 ? "#3E8E5A" : "#5f9a74"} />
        </g>
      );
    })}
  </g>
);

// ============ S1 HOOK WIDE: Grace sets off on her old long loop, first time since summer (0 - 2.4) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 2.4), rot: hh.rot };
  const g = 1460;
  const ph = t * 3.4;
  const p: HikerProps = { x: 360 + t * 70, y: g + 40, scale: 2.0, phase: ph, walk: 0.8, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.7), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={GRACE} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.26} col="255,246,220" />
      <Particles seed={2151} n={16} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Title text={"First hike\nin months.\nSore for days."} t={t} t0={0} top={110} size={130} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: miles later, uphill, late light, she is spent (2.4 - 4.58) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.18), rot: hh.rot };
  const g = 1520;
  const ph = t * 2.0;
  const p: HikerProps = { x: 470 + lt * 20, y: g + 110, scale: 2.4, phase: ph, walk: 0.45, lean: 0.2, poles: false, handOverride: [30, 70], breathe: Math.sin(t * 5) * 3 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="b" treeY={g - 120} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={0.18} snow={1} />
        <Subject rimX={-6} col="rgba(255,220,170,0.9)">
          <Person {...p} outfit={GRACE} expression="tired" />
          <Sweat p={p} t={t} on={1} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2a22" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.3} col="255,230,190" />
      <Particles seed={2152} n={14} col="#fff1d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,225,180" cool="40,50,80" />
      <Chip text="Months off" t={t} t0={2.5} x={60} y={170} icon="x" big />
      <Chip text="Straight back to the long loop" t={t} t0={3.3} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: at home the next day, sore (4.58 - 6.32) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.02], outExpo), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 520, y: 1700 + 182 * s - 80, scale: s, walk: 0, lean: 0.12, poles: false, handOverride: [20, 90], breathe: Math.sin(t * 1.4) * 1.6 };
  return (
    <AbsoluteFill style={{ background: "#3a2a20" }}>
      <Plane cam={cam} depth={0.4} blur={14}>
        <Svg>
          <rect x={-200} y={-200} width={1500} height={2400} fill="#c2a581" />
          <rect x={720} y={220} width={320} height={480} rx={10} fill="#e9f0f4" opacity={0.7} />
          <rect x={-200} y={1500} width={1500} height={800} fill="#7a5a40" />
          <circle cx={860} cy={420} r={360} fill="#fff1d0" opacity={0.35} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(255,230,190,0.85)">
          <Person {...p} outfit={GRACE_HOME} expression="tired" noPack />
        </Subject>
      </Plane>
      <Particles seed={2153} n={10} col="#ffe8c0" fall={4} bokeh />
      <Grade sunX={860} sunY={420} warm="255,220,170" vignette={0.55} />
      <Chip text="Sore for three days" t={t} t0={4.7} x={60} y={170} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the rule, start short and easy, a little more each week (6.32 - 8.9) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.58), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1250} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <g transform="translate(0,120)">
            <Ladder t={t} t0={7.0} />
          </g>
        </Svg>
      </Plane>
      <Particles seed={2154} n={14} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" vignette={0.45} />
      <Chip text="The rule" t={t} t0={6.4} x={60} y={170} icon="none" big />
      <Chip text="Start short and easy" t={t} t0={7.1} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: a short, easy walk on a flat trail, smiling (8.9 - 11.06) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.16), rot: hh.rot };
  const g = 1480;
  const ph = t * 3.0;
  const p: HikerProps = { x: 400 + lt * 40, y: g + 110, scale: 2.4, phase: ph, walk: 0.6, lean: 0.03, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 80} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={-6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={GRACE} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,246,220" />
      <Particles seed={2155} n={16} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Chip text="Add a little each week" t={t} t0={9.2} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/trail-ready-8-week-beginner-hiking-training-plan-printable.jpg"
      photoH={800}
      spec="8 WEEKS · MI + KM, LB + KG · PRINTABLE LOG"
      name={
        <>
          Trail Ready
          <br />
          Training Plan
        </>
      }
      nameSize={104}
      price="$12.99"
      save="Save this for your new year of hiking"
    />
  );
};

export const V215: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.48} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.4} to={4.66} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.4} />
    </Scene>
    <Scene from={4.58} to={6.4} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.58} />
    </Scene>
    <Scene from={6.32} to={8.98} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={6.32} />
    </Scene>
    <Scene from={8.9} to={11.16} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={8.9} />
    </Scene>
    <Scene from={11.06} to={15.6} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.4, 1600],
        [2.4, 4.58, 1600],
        [4.58, 6.32, 1600],
        [6.32, 8.9, 1600],
        [8.9, 11.06, 1600],
      ]}
    />
  </AbsoluteFill>
);
