// V139: "Her bottle was still full at the summit." in the cinematic C01 style, cold winter summit. Story for the Insulated
// Neoprene Bottle Sleeve (Shoulder Strap, Fits 550 ml to 1 L, from $12.99, live Shopify, black). Advice: on cold days you feel
// less thirsty, so drinking gets forgotten; carry the bottle at your hip in an insulated sleeve on a strap (not buried at the
// bottom of the pack) and take a few sips at every stop; the neoprene sleeve slows the water from freezing (slows, never "stops").
// No medical claims, no numbers. End card = real Shopify product photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { Blizzard, FrostTrail, SNOW, STORM, Summit, WGOLD, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v139.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const AVA: Outfit = {
  ...JAKE,
  skin: "#F0C2A0",
  skinShade: "#D3A181",
  hair: "#8a5a2b",
  ponytail: "#8a5a2b",
  beard: null,
  cap: "none",
  capShade: "none",
  jacket: "#2F6F86",
  jacketShade: "#22566A",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#B5553A",
  packShade: "#8E3F2A",
  glove: null,
};

const BEANIE = "#E4B53A";
const BEANIE2 = "#C29525";
const NEO = "#1d1f22";
const NEO2 = "#33373c";
const WATER = "#7fc0de";

const Beanie: React.FC<{ p: HikerProps }> = ({ p }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 39} ${hx},${hy - 41} Q${hx + 28},${hy - 39} ${hx + 26},${hy - 7} Z`} fill={BEANIE} />
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 39} ${hx},${hy - 41} Q${hx - 14},${hy - 30} ${hx - 15},${hy - 5} Z`} fill={BEANIE2} />
      <rect x={hx - 29} y={hy - 12} width={57} height={10} rx={4} fill={BEANIE2} />
      <circle cx={hx} cy={hy - 43} r={7} fill={BEANIE2} />
    </g>
  );
};

// Steel bottle in a black neoprene sleeve, local coords: base centre at 0,0, height ~ 200.
const Sleeve: React.FC<{ x: number; y: number; s: number; rot?: number; o?: number }> = ({ x, y, s, rot = 0, o = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-34} y={-196} width={68} height={196} rx={18} fill={NEO} />
    <rect x={-34} y={-196} width={18} height={196} rx={9} fill={NEO2} opacity={0.7} />
    <rect x={-24} y={-226} width={48} height={34} rx={6} fill="#c9ced2" />
    <rect x={-24} y={-226} width={14} height={34} rx={5} fill="#f2f4f6" />
    <path d="M-34,-150 Q-60,-210 -10,-250" stroke={NEO} strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>
);

// Strap from shoulder to the hip on the far side + sleeve at the hip (hiker coords).
const HipSleeve: React.FC<{ p: HikerProps; o?: number; lift?: number }> = ({ p, o = 1, lift = 0 }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={o}>
      <path d={`M${g.sh[0] - 10},${g.sh[1] - 4} Q${g.sh[0] + 22},${g.sh[1] + 60} ${g.hip[0] + 28},${g.hip[1] - 8}`} stroke={NEO} strokeWidth={8} fill="none" strokeLinecap="round" />
      <Sleeve x={g.hip[0] + 34} y={g.hip[1] + 46 - lift} s={0.32} rot={-4} />
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Ava reaches the cold summit, tired and slow (0 - 3.10) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.03, 1.1, t / 3.1), rot: hh.rot };
  const g = 1540;
  const stop = at(t, [1.6, 2.2], [0, 1]);
  const ph = Math.min(t, 2.0) * 2.0;
  const p: HikerProps = { x: 420 + Math.min(t, 2.0) * 40, y: g + 40, scale: 2.4, phase: ph, walk: mix(0.45, 0, stop), lean: 0.22, poles: false, handOverride: stop > 0.5 ? [44, 40] : freeHand(ph, 0.4), breathe: Math.sin(t * 4) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 120} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={AVA} expression="tired" />
          <Beanie p={p} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,246,226" />
      <Particles seed={1391} n={18} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="248,240,228" cool="40,60,90" />
      <Title text={"Her bottle was\nstill full at\nthe summit."} t={t} t0={0} top={110} size={124} />
      <Chip text="Cold summit" t={t} t0={1.0} x={60} y={640} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: inside the pack, the full bottle buried at the bottom (3.10 - 6.91) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y + lt * 10, zoom: mix(1.04, 1.1, lt / 3.81), rot: hh.rot };
  const open = at(t, [3.3, 4.1], [0, 1], outExpo);
  const dig = at(t, [4.6, 5.6], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={1250} blur={12} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,1500 L1300,1460 L1300,2400 L-200,2400 Z" fill={SNOW} />
          <g transform="translate(540,1540)">
            <ellipse cx={0} cy={10} rx={380} ry={34} fill="rgba(0,0,0,0.25)" />
            {/* pack body cutaway */}
            <path d="M-320,0 Q-350,-560 -260,-820 L260,-820 Q350,-560 320,0 Z" fill={AVA.pack} />
            <path d="M-280,-30 Q-300,-540 -230,-780 L230,-780 Q300,-540 280,-30 Z" fill="#3a2418" />
            {/* jacket bundle on top */}
            <g transform={`translate(${-dig * 120},${-dig * 260}) rotate(${-dig * 14})`}>
              <path d="M-230,-760 Q-240,-620 -150,-560 L180,-560 Q250,-640 220,-770 Z" fill="#5d6f86" />
              <path d="M-200,-720 Q0,-680 200,-730" stroke="#475769" strokeWidth={12} fill="none" />
            </g>
            {/* food bag */}
            <g transform={`translate(${dig * 140},${-dig * 160}) rotate(${dig * 10})`}>
              <rect x={-220} y={-540} width={440} height={200} rx={50} fill="#C9822E" />
              <path d="M-200,-500 L200,-500" stroke="#A06520" strokeWidth={10} />
            </g>
            {/* spare layer */}
            <rect x={-230} y={-330} width={300} height={150} rx={40} fill="#6b5a7a" />
            {/* the bottle, lying at the bottom, full */}
            <g transform="translate(150,-75) rotate(-90) scale(1.25)">
              <rect x={-58} y={-260} width={116} height={260} rx={28} fill="#2f7fa8" />
              <rect x={-58} y={-245} width={116} height={240} rx={26} fill="#3f8fb0" />
              <rect x={-50} y={-235} width={30} height={220} rx={14} fill="#eef1f3" opacity={0.6} />
              <rect x={-40} y={-300} width={80} height={46} rx={10} fill="#2b3a40" />
            </g>
            {/* top flap */}
            <path d={`M-270,-820 Q0,${-900 - open * 280} 270,-820 Q0,${-860 - open * 140} -270,-820 Z`} fill={AVA.packShade} />
          </g>
          {/* full-level gauge */}
          <g opacity={at(t, [5.2, 5.6], [0, 1])} transform="translate(930,1480)">
            <rect x={-40} y={-260} width={80} height={260} rx={18} fill="rgba(255,255,255,0.25)" stroke="#fff" strokeWidth={6} />
            <rect x={-32} y={-246} width={64} height={238} rx={12} fill={WATER} />
          </g>
        </Svg>
      </Plane>
      <Particles seed={1392} n={12} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="236,236,240" cool="30,45,80" vignette={0.55} />
      <Chip text="Still full" t={t} t0={4.2} x={60} y={200} icon="x" big />
      <Chip text="Bottom of the pack" t={t} t0={5.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: cold wind on the ridge, she never feels thirsty (6.91 - 9.92) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 24, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.01), rot: hh.rot };
  const g = 1460;
  const ph = t * 2.2;
  const p: HikerProps = { x: 380 + lt * 70, y: g + 30, scale: 1.3, phase: ph, walk: 0.55, lean: 0.12, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={0.06} snow={1} />
        <Subject rimX={4} col="rgba(230,238,246,0.85)">
          <Person {...p} outfit={AVA} expression="neutral" />
          <Beanie p={p} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24403a" side="both" />
      </Plane>
      <Blizzard seed={1393} n={22} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" />
      <Chip text="Cold hides thirst" t={t} t0={7.1} x={60} y={200} icon="x" big />
      <Readout label="SIPS SINCE THE CAR" value="0" ok={false} t={t} t0={8.5} x={60} y={330} />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the fix: bottle at the hip in an insulated sleeve on a strap (9.92 - 14.46) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.04, 1.12, lt / 4.54), rot: hh.rot };
  const g = 1560;
  const strap = at(t, [11.3, 11.9], [0, 1], outExpo);
  const p: HikerProps = { x: 470, y: g + 40, scale: 2.5, walk: 0, lean: 0.04, poles: false, handOverride: [mix(30, 50, strap), mix(20, 60, strap)], breathe: Math.sin(t * 2.4) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={AVA} expression="neutral" />
          <Beanie p={p} />
          <HipSleeve p={p} o={strap} lift={(1 - strap) * 40} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,246,226" />
      <Particles seed={1394} n={16} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,226" cool="40,60,90" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={11.1} top={200} size={124} />
      <Chip text="At your hip" t={t} t0={11.9} x={60} y={200} icon="check" big />
      <Chip text="Insulated sleeve" t={t} t0={12.9} x={60} y={330} icon="check" big />
      <Chip text="On a strap" t={t} t0={13.6} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: at the stop, a few sips (14.46 - 16.57) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.1, lt / 2.11), rot: hh.rot };
  const raise = at(t, [14.6, 15.2], [0, 1], outExpo);
  const p: HikerProps = { x: 430, y: 1380 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.02, poles: false, handOverride: [mix(40, 44, raise), mix(40, -70, raise)], breathe: Math.sin(t * 2.2) * 1.5 };
  const g = hikerGeometry(p);
  const th = mix(-4, 24, raise);
  const mouth: [number, number] = [g.head[0] + 30, g.head[1] + 14];
  const L = 70;
  const rest: [number, number] = [g.hip[0] + 34, g.hip[1] + 46];
  const drink: [number, number] = [g.arms[1].hand[0] - 4, g.arms[1].hand[1] + 30];
  void mouth; void L;
  const base: [number, number] = [mix(rest[0], drink[0], raise), mix(rest[1], drink[1], raise)];
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,240,220,0.85)">
          <Person {...p} outfit={AVA} expression="happy" />
          <Beanie p={p} />
          <g transform={hikerTransform(p)}>
            <path d={`M${g.sh[0] - 10},${g.sh[1] - 4} Q${g.sh[0] + 22},${g.sh[1] + 60} ${g.hip[0] + 28},${g.hip[1] - 8}`} stroke={NEO} strokeWidth={8} fill="none" strokeLinecap="round" />
            <Sleeve x={base[0]} y={base[1]} s={0.3} rot={th} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1395} n={14} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={820} sunY={560} warm="252,240,224" vignette={0.6} />
      <Readout label="EVERY STOP" value="A few sips" ok={true} t={t} t0={14.7} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S6 MACRO: the sleeve slows the water from freezing (16.57 - 19.57) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.0), rot: hh.rot };
  const frost = at(t, [16.8, 18.6], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="f" treeY={1150} blur={16} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <g transform="translate(540,1420)">
            {/* cold air arrows */}
            {[0, 1, 2, 3].map((i) => {
              const k = ((t * 0.6 + i * 0.25) % 1);
              const y = -820 + i * 200;
              return <path key={i} d={`M${-520 + k * 200},${y} l120,0 m-30,-22 l30,22 l-30,22`} stroke="#dfeaf2" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.8 * Math.sin(k * Math.PI)} />;
            })}
            {/* sleeve cutaway */}
            <rect x={-200} y={-900} width={400} height={900} rx={70} fill={NEO} />
            <rect x={-200} y={-900} width={90} height={900} rx={45} fill={NEO2} opacity={0.6} />
            {/* neoprene layer label band */}
            <rect x={-150} y={-850} width={300} height={800} rx={50} fill="#4a5056" />
            {/* steel bottle wall */}
            <rect x={-130} y={-830} width={260} height={760} rx={40} fill="#c9ced2" />
            {/* water, still liquid */}
            <rect x={-110} y={-700} width={220} height={610} rx={30} fill={WATER} />
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M-100,${-690 + i * 8} q50,${-14 + Math.sin(t * 3 + i) * 6} 100,0 t100,0`} stroke="#bfe3f2" strokeWidth={6} fill="none" opacity={0.7} />
            ))}
            {/* frost on the outside only */}
            {Array.from({ length: 14 }, (_, i) => {
              const side = i % 2 ? 1 : -1;
              const y = -860 + (i * 61) % 820;
              const x = side * 205;
              return (
                <g key={i} transform={`translate(${x},${y})`} opacity={frost}>
                  <path d="M-16,0 L16,0 M0,-16 L0,16 M-11,-11 L11,11 M-11,11 L11,-11" stroke="#ffffff" strokeWidth={4} strokeLinecap="round" />
                </g>
              );
            })}
          </g>
          {/* temperature drop readout bar */}
        </Svg>
      </Plane>
      <Particles seed={1396} n={16} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" vignette={0.55} />
      <Chip text="Neoprene sleeve" t={t} t0={16.75} x={60} y={200} icon="check" big />
      <Chip text="Slows freezing" t={t} t0={18.1} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF MEDIUM: Ava drinks on the way down, golden light (19.57 - 21.58) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1560;
  const ph = t * 2.4;
  const p: HikerProps = { x: 360 + lt * 70, y: g + 40, scale: 2.4, phase: ph, walk: 0.5, lean: -0.04, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="g" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={-0.1} snow={1} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={AVA} expression="happy" />
          <Beanie p={p} />
          <HipSleeve p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.45} col="255,236,200" />
      <Particles seed={1397} n={22} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,226,180" />
      <Readout label="ON THE WAY DOWN" value="She drank" ok={true} t={t} t0={19.75} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/insulated-neoprene-bottle-sleeve-cut.png"
      cutoutH={640}
      spec="NEOPRENE · STRAP · 550 ML TO 1 L"
      name={
        <>
          Insulated
          <br />
          Bottle Sleeve
        </>
      }
      nameSize={96}
      price="From $12.99"
      save="Save this before your next winter hike"
    />
  );
};

export const V139: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.15} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.1} to={6.96} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.1} />
    </Scene>
    <Scene from={6.91} to={9.97} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.91} />
    </Scene>
    <Scene from={9.92} to={14.51} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.92} />
    </Scene>
    <Scene from={14.46} to={16.62} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={14.46} />
    </Scene>
    <Scene from={16.57} to={19.62} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={16.57} />
    </Scene>
    <Scene from={19.57} to={21.6} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={19.57} />
    </Scene>
    <Scene from={21.45} to={27} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.1, 1600],
        [3.1, 6.91, 1660],
        [6.91, 9.92, 1600],
        [9.92, 14.46, 1600],
        [14.46, 16.57, 1660],
        [16.57, 19.57, 1660],
        [19.57, 21.45, 1600],
      ]}
    />
  </AbsoluteFill>
);
