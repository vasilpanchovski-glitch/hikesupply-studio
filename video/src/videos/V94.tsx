// V94: "10 minutes in, he couldn't breathe" in the cinematic C01 style. Launch video 2 for the Rocky Mountain National Park guide (p11).
// Facts: most RMNP trailheads sit between 8,000 and 9,500 ft (Shopify listing, checked against nps.gov), about 2,400-2,900 m.
// Advice kept general and conservative (not medical advice): easy flat first day, go slow enough to talk, drink and eat,
// head back down if the headache gets worse or you feel dizzy. No medical imagery.
// End card = Rocky Mountain National Park — Trip Planning Guide, 30 pages, $9.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { FrostTrail, SNOW, SNOW2, WGOLD, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v94.json";

const words = vo.words as unknown as Word[];

const BEN: Outfit = {
  ...GUIDE,
  skin: "#D9A47E",
  skinShade: "#B98463",
  hair: "#3a2a1c",
  ponytail: null,
  beard: "#3a2a1c",
  cap: "#2F6F5E",
  capShade: "#22544a",
  jacket: "#C2662E",
  jacketShade: "#9a4f22",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  pack: "#2F5D8A",
  packShade: "#244a6f",
  glove: "#2b2b2b",
};
const JO: Outfit = {
  ...GUIDE,
  skin: "#F0C4A0",
  skinShade: "#D4A27E",
  hair: "#b07a3a",
  ponytail: "#b07a3a",
  beard: null,
  cap: "#6a3d7a",
  capShade: "#55306a",
  jacket: "#2F7F86",
  jacketShade: "#24646a",
  pants: "#4a4f57",
  pantsShade: "#363a40",
  pack: "#7a5236",
  packShade: "#5b3c27",
  glove: "#2b2b2b",
};

// Big white peaks in the subject plane (sharp, close behind the trail)
const BigPeaks: React.FC<{ g: number }> = ({ g }) => (
  <Svg>
    <path d={`M-200,${g} L120,${g - 620} L300,${g - 420} L560,${g - 860} L820,${g - 460} L980,${g - 640} L1300,${g} Z`} fill="#8fa6ba" />
    <path d={`M120,${g - 620} L60,${g - 520} L150,${g - 540} L200,${g - 480} Z`} fill={SNOW} />
    <path d={`M560,${g - 860} L460,${g - 700} L540,${g - 720} L600,${g - 650} L660,${g - 720} Z`} fill={SNOW} />
    <path d={`M980,${g - 640} L920,${g - 540} L990,${g - 560} L1040,${g - 520} Z`} fill={SNOW} />
    <path d={`M-200,${g} L-200,${g - 120} Q300,${g - 200} 600,${g - 140} Q900,${g - 90} 1300,${g - 160} L1300,${g} Z`} fill="#dfe8ee" />
  </Svg>
);

// ============ S1 HOOK WIDE-MEDIUM: Ben bent over, hands on knees, breath in the cold air (0 - 3.96) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.02, 1.08, t / 3.96), rot: hh.rot };
  const g = 1500;
  const heave = Math.sin(t * 7) * 3;
  const p: HikerProps = { x: 420, y: g, scale: 2.3, walk: 0, lean: 0.5, poles: false, handOverride: [70, 60], breathe: heave };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 120} t={t} woods={false} />
      <Plane cam={cam} depth={0.85} blur={1.5}>
        <BigPeaks g={g - 120} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,240,220,0.9)">
          <Person {...p} outfit={BEN} expression="tired" />
          <Breath p={p} t={t * 1.6} />
          <Breath p={p} t={t * 1.6 + 0.5} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.18} col="255,250,235" />
      <Particles seed={941} n={20} col="#ffffff" fall={18} />
      <Grade sunX={800} sunY={560} warm="235,240,250" />
      <Title text={"10 minutes in,\nhe couldn't breathe"} t={t} t0={0} top={130} size={104} />
      <Chip text="Flew in yesterday" t={t} t0={1.2} x={80} y={390} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: Ben's face, gasping, hand to his head (3.96 - 7.33) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5, at(t, [6.4, 6.5, 6.8], [0, 0.7, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.37), rot: hh.rot };
  const p: HikerProps = { x: 440, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.12, poles: false, handOverride: [52, -112], breathe: Math.sin(t * 8) * 2.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1250} blur={12} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,240,220,0.9)">
          <Person {...p} outfit={BEN} expression="tired" />
          <Breath p={p} t={t * 1.5} />
          <Breath p={p} t={t * 1.5 + 0.5} />
        </Subject>
      </Plane>
      <Particles seed={942} n={14} col="#ffffff" fall={16} />
      <Grade sunX={800} sunY={560} warm="235,240,250" vignette={0.6} />
      <Chip text="Gasping" t={t} t0={5.29} x={60} y={200} icon="x" big />
      <Chip text="Pounding headache" t={t} t0={5.98} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: high trailhead, Ben small under huge peaks (7.33 - 13.08) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y - lt * 6, zoom: mix(1.0, 1.08, lt / 5.75), rot: hh.rot };
  const g = 1560;
  const p: HikerProps = { x: 330, y: g, scale: 1.1, walk: 0, lean: 0.3, poles: false, handOverride: [60, 50], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={g - 260} t={t} woods={false} />
      <Plane cam={cam} depth={0.85} blur={1}>
        <BigPeaks g={g - 200} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          {/* plain wooden trailhead post, no logos */}
          <rect x={700} y={g - 330} width={22} height={330} fill="#6b4a32" />
          <rect x={600} y={g - 340} width={230} height={120} rx={10} fill="#7a5236" stroke="#5b3c27" strokeWidth={6} />
          <text x={715} y={g - 268} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={46} fill="#f3ead8" letterSpacing={2}>
            TRAILHEAD
          </text>
          <rect x={604} y={g - 344} width={222} height={12} rx={6} fill={SNOW} />
        </Svg>
        <Subject rimX={3} col="rgba(255,240,220,0.9)">
          <Person {...p} outfit={BEN} expression="tired" />
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} col="255,250,235" />
      <Particles seed={943} n={20} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="235,240,250" />
      <Readout label="MOST TRAILHEADS IN ROCKY" value="8,000–9,500 ft" ok={null} t={t} t0={9.5} x={60} y={200} />
      <Chip text="About 2,400–2,900 m" t={t} t0={10.7} x={60} y={450} big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: "Here's the fix" — an easy, flat walk by a frozen creek (13.08 - 16.48) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: mix(1.06, 1.02, lt / 3.4), rot: hh.rot };
  const g = 1520;
  const ph = t * 2.6;
  const p: HikerProps = { x: 300 + lt * 40, y: g, scale: 2.3, phase: ph, walk: 0.55, lean: 0.03, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={g - 180} t={t} snow={0.6} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.6} />
        <Subject rimX={5} col="rgba(255,240,220,0.9)">
          <Person {...p} outfit={BEN} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} col="255,250,235" />
      <Particles seed={944} n={16} col="#ffffff" fall={12} />
      <Grade sunX={800} sunY={560} warm="240,236,226" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={14.05} top={200} size={124} />
      <Chip text="Day one: easy" t={t} t0={14.1} x={60} y={200} icon="check" big />
      <Chip text="Flat" t={t} t0={15.58} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM TWO-SHOT: walking slow enough to talk with Jo (16.48 - 18.08) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.02, 1.06, lt / 1.6), rot: hh.rot };
  const g = 1540;
  const ph = t * 2.4;
  const pj: HikerProps = { x: 330, y: g - 30, scale: 2.2, phase: ph + 1.4, walk: 0.5, lean: 0.03, poles: false, handOverride: freeHand(ph + 1.4, 0.5), breathe: 0 };
  const pb: HikerProps = { x: 640, y: g, scale: 2.35, phase: ph, walk: 0.5, lean: 0.03, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 200} t={t} snow={0.6} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.6} />
        <Subject rimX={5} col="rgba(255,240,220,0.9)">
          <Person {...pj} outfit={JO} expression="happy" />
          <Person {...pb} outfit={BEN} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} col="255,250,235" />
      <Particles seed={945} n={14} col="#ffffff" fall={12} />
      <Grade sunX={800} sunY={560} warm="240,236,226" />
      <Chip text="Slow enough to talk" t={t} t0={16.55} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: gloved hands open a water bottle, a snack bar beside (18.08 - 19.58) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.5), rot: hh.rot };
  const lift = at(t, [18.1, 18.5], [0, 1], outExpo);
  const cap = at(t, [18.4, 18.8], [0, 1], outExpo);
  const bar = at(t, [18.85, 19.2], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1100} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-100} y={1460} width={1300} height={700} fill={SNOW2} />
          <path d="M-100,1470 Q300,1400 700,1450 Q1000,1480 1200,1440 L1200,1500 L-100,1500 Z" fill={SNOW} />
        </Svg>
        <Subject rimX={6}>
          <Svg>
            {/* jacket sleeves + gloves holding the bottle */}
            <g transform={`translate(0,${(1 - lift) * 220})`}>
              <line x1={-80} y1={1760} x2={330} y2={1230} stroke={BEN.jacket} strokeWidth={170} strokeLinecap="round" />
              <line x1={-80} y1={1760} x2={330} y2={1230} stroke={BEN.jacketShade} strokeWidth={40} strokeLinecap="round" opacity={0.5} />
              <g transform="translate(470,1400) scale(2.6)">
                <rect x={-34} y={-200} width={68} height={200} rx={20} fill="#3f8fb0" stroke="rgba(0,0,0,0.25)" strokeWidth={2} />
                <rect x={-34} y={-150} width={68} height={60} fill="rgba(255,255,255,0.18)" />
                <rect x={-14} y={-214} width={28} height={18} rx={4} fill="#2f6f88" />
                <rect x={-24} y={-190} width={10} height={160} rx={5} fill="rgba(255,255,255,0.25)" />
              </g>
              <ellipse cx={370} cy={1220} rx={100} ry={80} fill={BEN.glove ?? "#2b2b2b"} />
              {/* right hand twists the cap off and lifts it */}
              <g transform={`translate(${mix(0, 170, cap)},${mix(0, -110, cap)})`}>
                <line x1={1180} y1={1300} x2={560} y2={790} stroke={BEN.jacket} strokeWidth={170} strokeLinecap="round" />
                <g transform={`rotate(${cap * 35},470,850)`}>
                  <rect x={413} y={-232 * 2.6 + 1400} width={114} height={94} rx={20} fill="#2b3a40" />
                </g>
                <ellipse cx={560} cy={790} rx={96} ry={76} fill={BEN.glove ?? "#2b2b2b"} />
              </g>
            </g>
            {/* snack bar on the snow */}
            <g transform={`translate(${mix(1300, 790, bar)},1420) rotate(-10)`}>
              <rect x={-130} y={-60} width={260} height={100} rx={16} fill="#e0b84a" />
              <rect x={-130} y={-60} width={50} height={100} rx={10} fill="#c9443a" />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={946} n={12} col="#ffffff" fall={12} />
      <Grade sunX={800} sunY={560} warm="240,236,226" vignette={0.55} />
      <Chip text="Drink water" t={t} t0={18.1} x={60} y={200} icon="check" big />
      <Chip text="Eat" t={t} t0={18.85} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 MEDIUM: headache worse? dizzy? He turns and heads back down (19.58 - 23.33) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.08, lt / 3.75), rot: hh.rot };
  const g = 1520;
  const turned = t > 22.0;
  const wk = at(t, [22.0, 22.4], [0, 0.6]);
  const ph = t * 2.6;
  const x = turned ? 560 - (t - 22.0) * 60 : 560;
  const p: HikerProps = turned
    ? { x, y: g, scale: 2.3, phase: ph, walk: wk, lean: 0.04, poles: false, handOverride: freeHand(ph, wk), breathe: 0 }
    : { x, y: g, scale: 2.3, walk: 0, lean: 0.06, poles: false, handOverride: [52, -112], breathe: Math.sin(t * 6) * 1.8 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={g - 240} t={t} woods={false} />
      <Plane cam={cam} depth={0.85} blur={1.5}>
        <BigPeaks g={g - 200} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} tilt={-0.04} />
        <Subject rimX={5} col="rgba(255,240,220,0.9)">
          <Person {...p} outfit={BEN} expression={turned ? "neutral" : "tired"} flip={turned} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.16} col="255,250,235" />
      <Particles seed={947} n={18} col="#ffffff" fall={18} />
      <Grade sunX={800} sunY={560} warm="235,240,250" />
      <Chip text="Headache worse?" t={t} t0={19.95} x={60} y={200} icon="x" big />
      <Chip text="Dizzy?" t={t} t0={21.64} x={60} y={330} icon="x" big />
      <Chip text="Head back down" t={t} t0={22.0} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF: day three, Ben at a frozen lake ringed by peaks (23.33 - 26.05) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x + lt * 22, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1540;
  const p: HikerProps = { x: 380, y: g, scale: 2.2, walk: 0, lean: -0.04, poles: false, handOverride: [60, -150], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="h" treeY={g - 200} t={t} woods={false} />
      <Plane cam={cam} depth={0.85} blur={1.5}>
        <BigPeaks g={g - 170} />
      </Plane>
      <Plane cam={cam} depth={0.92} blur={1}>
        <Svg>
          <ellipse cx={600} cy={g - 130} rx={760} ry={90} fill="#cfe2ec" />
          <ellipse cx={600} cy={g - 138} rx={620} ry={50} fill="#e8f2f7" opacity={0.85} />
          <path d="M200,1405 l140,10 M720,1418 l170,-6" stroke="#ffffff" strokeWidth={6} opacity={0.8} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={-6} col="rgba(255,200,140,0.9)">
          <Person {...p} outfit={BEN} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="both" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.34} col="255,214,160" />
      <Particles seed={948} n={20} col="#ffffff" fall={10} />
      <Grade sunX={760} sunY={640} warm="255,200,140" />
      <Chip text="Day three" t={t} t0={23.5} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/rocky-mountain-national-park-trip-planning-guide.jpg"
      spec="30 PAGES · PRINTABLE TRIP PLANNER"
      name={
        <>
          Rocky Mountain
          <br />
          Trip Guide
        </>
      }
      nameSize={96}
      price="$9.99"
      save="Save this before your Rocky trip"
    />
  );
};

export const V94: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.01} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.96} to={7.38} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.96} />
    </Scene>
    <Scene from={7.33} to={13.13} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={7.33} />
    </Scene>
    <Scene from={13.08} to={16.53} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={13.08} />
    </Scene>
    <Scene from={16.48} to={18.13} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={16.48} />
    </Scene>
    <Scene from={18.08} to={19.63} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={18.08} />
    </Scene>
    <Scene from={19.58} to={23.38} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={19.58} />
    </Scene>
    <Scene from={23.33} to={26.05} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={23.33} />
    </Scene>
    <Scene from={25.9} to={30} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.96, 1560],
        [3.96, 7.33, 1560],
        [7.33, 13.08, 1560],
        [13.08, 16.48, 1560],
        [16.48, 18.08, 1560],
        [18.08, 19.58, 1560],
        [19.58, 23.33, 1560],
        [23.33, 25.9, 1560],
      ]}
    />
  </AbsoluteFill>
);
