// V221: "Soaked shirt. Long way down." Short format (15.6 s, 44 words), cinematic C01 style, snowy winter summit.
// Product: Winter Hiking Guide & Cold-Weather Checklist, $7.99 (live Shopify). End card: the real store cover, cut out.
// Advice (common, conservative layering practice, no numbers): a shirt soaked with sweat chills you fast once you stop working
// hard on the way down; pack one dry base layer, swap it at the top before the descent, then add the warm layer.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject, Sweat } from "../fall";
import { FrostTrail, STORM, Summit, WGOLD, WINTER, WinterBackdrop } from "../winter";
import { BreathCU, FaceCU, WetPatch } from "../cold";
import vo from "../vo/v221.json";

const words = vo.words as unknown as Word[];

const SHIRT = "#3f7f8c"; // the sweaty base layer
const SHIRT2 = "#2f636d";
const DRY = "#8E3B46"; // the dry spare base layer
const DRY2 = "#6f2c36";
const LENA: Outfit = {
  ...GUIDE,
  skin: "#E3B394",
  skinShade: "#C69274",
  hair: "#6b3f22",
  ponytail: "#6b3f22",
  beard: null,
  cap: "#d8cfc0",
  capShade: "#b9af9f",
  jacket: SHIRT,
  jacketShade: SHIRT2,
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  boot: "#5a3e2a",
  sole: "#2a2421",
  pack: "#C2662E",
  packShade: "#9B4E20",
  glove: null,
};
const LENA_DRY: Outfit = { ...LENA, jacket: DRY, jacketShade: DRY2 };
const LENA_WARM: Outfit = { ...LENA, jacket: "#2F5D7C", jacketShade: "#244a63", glove: "#2a2a2a" };

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Close-up hand from the right (screen units), fingers pointing left.
const HandR: React.FC<{ x: number; y: number; s?: number; skin: string; shade: string; sleeve: string }> = ({ x, y, s = 1, skin, shade, sleeve }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M520,120 L150,40 L130,150 L520,260 Z" fill={sleeve} />
    <path d="M170,20 Q60,-20 -40,0 L-60,150 Q60,190 170,150 Z" fill={skin} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={-94} y={-6 + i * 38} width={84} height={34} rx={17} fill={i % 2 ? shade : skin} />
    ))}
    <path d="M60,-10 Q-20,-60 -70,-40 Q-80,-20 -40,-4 Z" fill={shade} />
  </g>
);

// ============ S1 HOOK WIDE: Lena on the snowy summit, shirt soaked with sweat (0 - 2.87) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.04, 1.1, t / 2.9), rot: hh.rot };
  const g = 1480;
  const p: HikerProps = { x: 470, y: g + 10, scale: 2.4, walk: 0, lean: 0.12, poles: false, handOverride: [30, 20], breathe: Math.sin(t * 6) * 3 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 100} t={t} woods={false} snow={0.7} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={5} col="rgba(240,244,250,0.85)">
          <Person {...p} outfit={LENA} expression="tired" />
          <WetPatch p={p} k={1} />
          <Sweat p={p} t={t} on={1} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a4248" side="right" />
      </Plane>
      <Particles seed={2211} n={14} col="#ffffff" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="240,236,226" cool="30,45,80" vignette={0.5} />
      <Title text={"Soaked shirt.\nLong way\ndown."} t={t} t0={0} top={110} size={132} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: twenty minutes down, she is shivering (2.87 - 4.98) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.02], outExpo), rot: hh.rot };
  const sh = at(t, [3.0, 3.8], [0.2, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={1250} blur={14} t={t} woods snow={0.6} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(240,244,250,0.85)">
          <Svg>
            <FaceCU cx={480} cy={880} s={3.3} o={LENA} t={t} shiver={sh} eyes="tired" collar={SHIRT} collarShade={SHIRT2} wet={1} />
            <BreathCU x={850} y={1060} t={t} s={1.4} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2212} n={16} col="#ffffff" fall={5} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="220,228,240" cool="30,45,80" vignette={0.55} />
      <Chip text="Wet shirt" t={t} t0={2.95} x={60} y={170} icon="x" big />
      <Chip text="Shivering" t={t} t0={3.9} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the rule: a dry base layer comes out of the pack (4.98 - 7.3) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.3), rot: hh.rot };
  const up = at(t, [5.6, 6.5], [0, 1], outExpo);
  const sy = mix(1080, 760, up);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="c" treeY={1250} blur={14} t={t} woods={false} snow={0.6} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Svg>
            {/* pack body, open top */}
            <rect x={150} y={980} width={780} height={1100} rx={140} fill={LENA.pack} />
            <rect x={150} y={980} width={240} height={1100} rx={120} fill={LENA.packShade} />
            <rect x={300} y={1500} width={480} height={260} rx={60} fill={LENA.packShade} />
            {/* the folded dry base layer rising */}
            <g transform={`translate(540,${sy})`}>
              <rect x={-230} y={-40} width={460} height={300} rx={30} fill={DRY} />
              <rect x={-230} y={60} width={460} height={18} fill={DRY2} />
              <path d="M-70,-40 Q0,30 70,-40" stroke={DRY2} strokeWidth={18} fill="none" />
              <rect x={-230} y={180} width={460} height={14} fill={DRY2} />
            </g>
            {/* pack opening rim, in front of the shirt bottom */}
            <path d="M150,1110 Q540,1060 930,1110 L930,1200 Q540,1150 150,1200 Z" fill={LENA.packShade} />
            <path d="M150,1110 Q540,1060 930,1110" stroke="#2a2a2a" strokeWidth={10} fill="none" />
            <circle cx={720} cy={1110} r={22} fill="#2a2a2a" />
            <HandR x={840} y={mix(1040, 720, up)} s={1.5} skin={LENA.skin} shade={LENA.skinShade} sleeve={SHIRT} />
          </Svg>
        </Subject>
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 200} strength={0.3} col="255,236,200" />
      <Particles seed={2213} n={12} col="#fff3d6" fall={5} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={500} warm="255,226,180" vignette={0.5} />
      <Chip text="The rule" t={t} t0={5.05} x={60} y={170} icon="none" big />
      <Chip text="Pack one dry base layer" t={t} t0={5.9} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: on top, in the dry shirt, before the descent (7.3 - 9.58) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.02, 1.07, lt / 2.3), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 520, y: g + 10, scale: 2.5, walk: 0, lean: 0.04, poles: false, handOverride: [26, 30], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="d" treeY={g - 100} t={t} woods={false} snow={0.7} />
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.28} col="255,236,200" />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={LENA_DRY} expression="happy" />
        </Subject>
      </Plane>
      <Particles seed={2214} n={12} col="#fff3d6" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,226,180" vignette={0.5} />
      <Chip text="Swap it at the top" t={t} t0={7.35} x={60} y={170} icon="check" big />
      <Chip text="Before the descent" t={t} t0={8.2} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: warm layer on, heading down comfortably (9.58 - 11.15) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 18, y: hh.y, zoom: mix(1.04, 1.09, lt / 1.6), rot: hh.rot };
  const g = 1520;
  const ph = t * 3.4;
  const p: HikerProps = { x: 720 - lt * 50, y: g, scale: 2.4, phase: ph, walk: 0.55, lean: -0.04, poles: false, handOverride: freeHand(ph, 0.55), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 140} t={t} woods snow={0.6} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={0.03} snow={0.7} />
        <Subject rimX={-5} col="rgba(240,244,250,0.85)">
          <Person {...p} outfit={LENA_WARM} expression="happy" flip />
          <Breath p={p} t={t} k={1} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a4248" side="left" />
      </Plane>
      <Particles seed={2215} n={14} col="#ffffff" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="240,236,226" cool="30,45,80" vignette={0.5} />
      <Chip text="Then your warm layer" t={t} t0={9.65} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/winter-hiking-guide-cold-weather-checklist-cover-cut.png"
      cutoutH={800}
      spec="22 PRINTABLE PAGES · COLD-WEATHER CHECKLIST"
      name={
        <>
          Winter Hiking
          <br />
          Guide
        </>
      }
      nameSize={100}
      price="$7.99"
      save="Save this for your next climb"
    />
  );
};

export const V221: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.95} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.87} to={5.06} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.87} />
    </Scene>
    <Scene from={4.98} to={7.38} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.98} />
    </Scene>
    <Scene from={7.3} to={9.66} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={7.3} />
    </Scene>
    <Scene from={9.58} to={11.13} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.58} />
    </Scene>
    <Scene from={11.05} to={15.6} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.87, 1600],
        [2.87, 4.98, 1600],
        [4.98, 7.3, 1600],
        [7.3, 9.58, 1600],
        [9.58, 11.05, 1600],
      ]}
    />
  </AbsoluteFill>
);
