// V188: "Who steps aside on the hill?" Short format (17.0 s, 44 words), cinematic C01 style.
// Product: Beginner's Hiking Guide, $9.99 (live Shopify). End card: the real store photo, boxed.
// Advice (common US trail etiquette): hikers going downhill step aside for hikers coming up; bikes yield to hikers;
// everyone yields to horses. No numbers.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, OVERCAST, Subject, Trail } from "../fall";
import vo from "../vo/v188.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const SKY = { ...OVERCAST, sun: [820, 420] as [number, number], sunR: 40 };

const AVA: Outfit = {
  ...JAKE,
  skin: "#8D5A3E",
  skinShade: "#6f4430",
  hair: "#1f1612",
  beard: null,
  cap: "#E0B23A",
  capShade: "#b88f28",
  jacket: "#2F7F86",
  jacketShade: "#236068",
  pants: "#3b3f45",
  pantsShade: "#2a2d31",
  pack: "#C4553A",
  packShade: "#9c432e",
};

const MAN: Outfit = {
  ...JAKE,
  skin: "#EDC2A2",
  skinShade: "#CFA282",
  hair: "#6b6b6b",
  cap: "#3E5E8E",
  capShade: "#2f4a70",
  jacket: "#B8433A",
  jacketShade: "#90342d",
  pants: "#5b5446",
  pantsShade: "#463f33",
  pack: "#4d6b46",
  packShade: "#3b5236",
};

const TILT = 0.34;
const gy = (y0: number, x: number) => y0 - TILT * (x - 540);

// ============ S1 HOOK WIDE: Ava coming down, a man huffing up the same narrow climb (0 - 2.67) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, t / 2.67), rot: hh.rot };
  const y0 = 1430;
  const ax = 860 - t * 55;
  const mx = 300 + t * 40;
  const pa: HikerProps = { x: ax, y: gy(y0, ax), scale: 1.75, phase: t * 3.6, walk: 0.7, lean: 0.02, poles: false, handOverride: freeHand(t * 3.6, 0.5) };
  const pm: HikerProps = { x: mx, y: gy(y0, mx), scale: 1.75, phase: t * 3.0, walk: 0.8, lean: 0.24, poles: false, handOverride: freeHand(t * 3.0, 0.5) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SKY} uid="a" treeY={1050} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={y0 + 10} tilt={TILT} grass="#6e7a4a" dirt="#94795a" />
        <Subject rimX={4} col="rgba(255,246,226,0.8)">
          <Person {...pm} outfit={MAN} expression="tired" />
          <Person {...pa} outfit={AVA} expression="happy" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a3a24" side="left" />
      </Plane>
      <Particles seed={1881} n={14} col="#e6b46a" fall={12} />
      <LowScrim />
      <Grade sunX={820} sunY={420} warm="246,236,216" cool="30,45,80" />
      <Title text={"Who steps\naside on\nthe hill?"} t={t} t0={0} top={110} size={130} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE TWO-SHOT: face to face, both step aside, nobody moves (2.67 - 5.97) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.3), rot: hh.rot };
  const y0 = 2120;
  // both shuffle to the same side, then back: the trail dance
  const side = at(t, [3.7, 4.05, 4.5, 4.85], [0, 1, 1, 0], outExpo) + at(t, [5.0, 5.3], [0, 0.6], outExpo);
  const ax = 760 + side * 40;
  const mx = 300 - side * 40;
  const pa: HikerProps = { x: ax, y: gy(y0, ax) + side * 30, scale: 3.3, walk: 0, lean: -0.04, poles: false, handOverride: [40, 40] };
  const pm: HikerProps = { x: mx, y: gy(y0, mx) + side * 30, scale: 3.3, walk: 0, lean: 0.16, poles: false, breathe: Math.sin(t * 8) * 3, handOverride: [36, 30] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SKY} uid="b" treeY={950} t={t} blur={6} />
      <Plane cam={cam} depth={1}>
        <Trail y={y0 - 280} tilt={TILT} grass="#6e7a4a" dirt="#94795a" />
        <Subject rimX={5} col="rgba(255,246,226,0.85)">
          <Person {...pm} outfit={MAN} expression="tired" />
          <Person {...pa} outfit={AVA} expression="neutral" flip />
        </Subject>
      </Plane>
      <Particles seed={1882} n={10} col="#e6b46a" fall={10} bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={420} warm="246,236,216" cool="30,45,80" vignette={0.55} />
      <Chip text="Both stepped aside" t={t} t0={3.75} x={60} y={200} icon="none" big />
      <Chip text="Nobody moved" t={t} t0={5.1} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: Ava steps off the trail, he keeps climbing (5.97 - 10.22) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.05, 1.12, lt / 4.25), rot: hh.rot };
  const y0 = 1420;
  const off1 = at(t, [6.4, 7.0], [0, 1], outExpo);
  const ax = 640;
  const mx = mix(140, 900, at(t, [7.0, 10.2], [0, 1]));
  const ph = t * 3.0;
  const pa: HikerProps = { x: ax, y: gy(y0, ax) + off1 * 150, scale: 2.3, walk: 0, lean: -0.02, poles: false, handOverride: [30, 40] };
  const pm: HikerProps = { x: mx, y: gy(y0, mx), scale: 2.1, phase: ph, walk: t > 7.0 ? 0.8 : 0, lean: 0.24, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SKY} uid="c" treeY={1000} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <Trail y={y0 + 10} tilt={TILT} grass="#6e7a4a" dirt="#94795a" />
        <Svg>
          {/* flat spot beside the trail where Ava waits */}
          <ellipse cx={ax} cy={gy(y0, ax) + 160} rx={200} ry={26} fill="#5f6a3c" />
        </Svg>
        <Subject rimX={5} col="rgba(255,246,226,0.85)">
          <Person {...pm} outfit={MAN} expression="happy" />
          <Person {...pa} outfit={AVA} expression="happy" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a3a24" side="right" />
      </Plane>
      <Rays x={SKY.sun[0]} y={SKY.sun[1]} strength={0.18} col="255,246,226" />
      <Particles seed={1883} n={14} col="#e6b46a" fall={12} />
      <LowScrim />
      <Grade sunX={820} sunY={420} warm="246,236,216" cool="30,45,80" />
      <Chip text="The trail rule" t={t} t0={6.05} x={60} y={200} icon="none" big />
      <Chip text="Going down? Step aside" t={t} t0={7.1} x={60} y={330} icon="check" big />
      <Chip text="Uphill hiker keeps going" t={t} t0={8.6} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// Simple white pictograms for the trail sign.
const Bike: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x},${y})`} stroke="#f4efe4" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx={-45} cy={20} r={30} />
    <circle cx={45} cy={20} r={30} />
    <path d="M-45,20 L-10,-25 L30,-25 L45,20 M-10,-25 L0,20 L-45,20 M30,-25 L24,-42 M-16,-38 h20" />
  </g>
);
const Walker: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x},${y})`} stroke="#f4efe4" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx={4} cy={-58} r={13} fill="#f4efe4" />
    <path d="M0,-40 L-6,8 L-30,50 M-6,8 L20,50 M-2,-30 L-30,0 M-2,-30 L28,-4 L40,50" />
  </g>
);
const Horse: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x},${y})`} fill="#f4efe4">
    <path d="M-60,-10 Q-50,-30 10,-28 L40,-60 Q50,-72 66,-64 L72,-50 L52,-40 L46,-10 L46,50 L36,50 L32,8 L-30,10 L-38,50 L-48,50 L-50,8 Q-70,0 -78,30 L-82,26 Q-76,-6 -60,-10 Z" />
  </g>
);
const Arrow: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <path d={`M${x - 40},${y} h70 m-22,-20 l22,20 l-22,20`} stroke="#f4efe4" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
);

// ============ S4 CLOSE-UP: the wooden yield sign at the trailhead (10.22 - 13.56) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 3.3), rot: hh.rot };
  const r1 = at(t, [10.35, 10.75], [0, 1], outExpo);
  const r2 = at(t, [11.7, 12.1], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SKY} uid="d" treeY={1000} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={500} y={1300} width={80} height={900} fill="#5e4129" />
          <rect x={150} y={640} width={780} height={700} rx={26} fill="#7a5233" />
          <rect x={174} y={664} width={732} height={652} rx={18} fill="none" stroke="#5e4129" strokeWidth={8} />
          {[760, 900, 1040, 1180].map((y, i) => (
            <path key={i} d={`M190,${y} Q540,${y + (i % 2 ? 10 : -10)} 890,${y}`} stroke="#6b4729" strokeWidth={4} fill="none" opacity={0.6} />
          ))}
          <g opacity={r1} transform={`translate(0,${(1 - r1) * 20})`}>
            <Bike x={310} y={860} />
            <Arrow x={540} y={870} />
            <Walker x={770} y={860} />
          </g>
          <g opacity={r2} transform={`translate(0,${(1 - r2) * 20})`}>
            <Bike x={260} y={1150} />
            <Walker x={420} y={1150} />
            <Arrow x={590} y={1160} />
            <Horse x={790} y={1150} />
          </g>
          <circle cx={190} cy={680} r={10} fill="#4a3320" />
          <circle cx={890} cy={680} r={10} fill="#4a3320" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a3a24" side="left" />
      </Plane>
      <Particles seed={1884} n={10} col="#e6b46a" fall={12} bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={420} warm="246,236,216" cool="30,45,80" vignette={0.5} />
      <Chip text="Bikes yield to hikers" t={t} t0={10.3} x={60} y={200} icon="check" big />
      <Chip text="Everyone yields to horses" t={t} t0={11.65} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/beginners-hiking-guide.jpg"
      spec="12 CHAPTERS · PRINTABLE PDF"
      name={
        <>
          Beginner's
          <br />
          Hiking Guide
        </>
      }
      nameSize={104}
      price="$9.99"
      save="Save this for your next hike"
    />
  );
};

export const V188: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.75} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.67} to={6.05} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.67} />
    </Scene>
    <Scene from={5.97} to={10.3} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.97} />
    </Scene>
    <Scene from={10.22} to={13.6} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={10.22} />
    </Scene>
    <Scene from={13.5} to={17.0} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.2, 2.67, 1600],
        [2.67, 5.97, 1600],
        [5.97, 10.22, 1600],
        [10.22, 13.5, 1660],
      ]}
    />
  </AbsoluteFill>
);
