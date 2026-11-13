// V151: "Her lace came undone on the icy descent." in the cinematic C01 style, icy early-winter trail. Story for the Round
// Hiking Boot Laces (4 mm Two-Tone, 1 Pair, $10.99, live Shopify). Advice (simple, safe): tie your boots at the trailhead with
// warm, bare hands; double knot, then tuck the loops in; if laces are worn smooth or fuzzy, replace them before winter.
// No numbers beyond the story, no medical claims. End card = real Shopify product photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { Blizzard, FrostTrail, STORM, WGOLD, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v151.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC<{ k?: number }> = ({ k = 0.55 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: `linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,${k}) 45%, rgba(12,22,28,${k}) 70%, rgba(12,22,28,0) 100%)` }} />
);

const KATE: Outfit = {
  ...JAKE,
  skin: "#EDBE9C",
  skinShade: "#D09C7A",
  hair: "#b5702f",
  ponytail: "#b5702f",
  beard: null,
  cap: "#8E3F2A",
  capShade: "#6e2f1f",
  jacket: "#6a4a8a",
  jacketShade: "#523870",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#3E5A4A",
  packShade: "#2E4538",
  glove: null,
};
const KATE_GLOVES: Outfit = { ...KATE, glove: "#2a2d33" };
const GLOVE = "#2a2d33";

const BOOT = "#6B4630";
const BOOT2 = "#55361f";
const LACE = "#C27A2C";
const LACE2 = "#2a1c12";
const METAL = "#b9c0c4";

const Lace: React.FC<{ d: string; w?: number; o?: number }> = ({ d, w = 14, o = 1 }) => (
  <g opacity={o}>
    <path d={d} stroke={LACE2} strokeWidth={w} fill="none" strokeLinecap="round" />
    <path d={d} stroke={LACE} strokeWidth={w * 0.6} strokeDasharray={`${w * 0.7} ${w * 0.7}`} fill="none" strokeLinecap="round" />
  </g>
);

const EYES: [number, number][] = [
  [640, 1260],
  [615, 1170],
  [592, 1080],
  [572, 990],
];
const HOOKS: [number, number][] = [
  [556, 890],
  [544, 800],
];

// Big boot, side view. undone 0..1: the bow falls open and the ends dangle. bow 0..1: a bow is tied at the top.
// tuck 0..1: the bow loops are tucked in under the top laces.
const BigBoot: React.FC<{ undone?: number; bow?: number; tuck?: number; t: number }> = ({ undone = 0, bow = 0, tuck = 0, t }) => {
  const pts = [...EYES, ...HOOKS];
  const top = HOOKS[1];
  const sw = Math.sin(t * 5) * 14 * undone;
  const ls = mix(1, 0.45, tuck);
  return (
    <Svg>
      <ellipse cx={560} cy={1520} rx={430} ry={34} fill="rgba(0,0,0,0.25)" />
      <path d="M300,300 L560,300 L580,760 L300,760 Z" fill={KATE.pants} />
      <path d="M300,740 Q420,700 560,760 L660,1290 Q760,1330 880,1370 Q940,1400 930,1460 L930,1490 L190,1490 L200,1100 Q230,900 300,740 Z" fill={BOOT} stroke="rgba(0,0,0,0.3)" strokeWidth={4} />
      <path d="M200,1300 Q500,1320 930,1440" stroke={BOOT2} strokeWidth={14} fill="none" />
      <path d="M240,780 Q300,1000 260,1240" stroke={BOOT2} strokeWidth={10} fill="none" opacity={0.6} />
      <path d="M560,740 Q600,700 640,740 L700,1280 L650,1290 Z" fill="#7d5a40" />
      <rect x={190} y={1480} width={750} height={44} rx={16} fill={KATE.sole} />
      {/* snow crust on the toe */}
      <path d="M700,1360 Q800,1350 900,1400 Q920,1430 900,1450 Q800,1420 700,1400 Z" fill="#eef2f4" opacity={0.85} />
      {pts.slice(0, 5).map((p, i) => {
        const q = pts[i + 1];
        return <Lace key={i} d={`M${p[0]},${p[1]} L${q[0] + 60},${q[1] + 30} M${p[0] + 60},${p[1] + 30} L${q[0]},${q[1]}`} />;
      })}
      {EYES.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={15} fill={METAL} />
          <circle cx={x} cy={y} r={7} fill="#3a3f44" />
          <circle cx={x + 60} cy={y + 30} r={15} fill={METAL} opacity={0.7} />
        </g>
      ))}
      {HOOKS.map(([x, y], i) => (
        <path key={i} d={`M${x - 14},${y + 14} L${x + 6},${y + 14} Q${x + 24},${y + 8} ${x + 18},${y - 12}`} stroke={METAL} strokeWidth={12} fill="none" strokeLinecap="round" />
      ))}
      {/* untied ends dangling down the boot */}
      {undone > 0 && (
        <g opacity={undone}>
          <Lace d={`M${top[0]},${top[1]} Q${top[0] - 90},${top[1] + 140} ${top[0] - 60 + sw},${top[1] + 330 * undone}`} />
          <Lace d={`M${top[0] + 60},${top[1] + 30} Q${top[0] + 170},${top[1] + 160} ${top[0] + 130 - sw},${top[1] + 380 * undone}`} />
        </g>
      )}
      {/* tied bow (double knot), loops shrink and slide under the top laces when tucked */}
      {bow > 0 && (
        <g opacity={bow} transform={`translate(${top[0] + 30},${top[1] - 10 + tuck * 60})`}>
          <g transform={`scale(${ls * bow})`}>
            <Lace d="M0,0 C-120,-110 -200,-10 -150,40 C-110,80 -40,30 0,0" w={14} />
            <Lace d="M0,0 C120,-110 200,-10 150,40 C110,80 40,30 0,0" w={14} />
            <Lace d={`M0,0 Q-40,60 ${-60 + tuck * 40},${120 - tuck * 80}`} w={14} />
            <Lace d={`M0,0 Q40,60 ${70 - tuck * 40},${110 - tuck * 70}`} w={14} />
          </g>
          <circle r={18} fill={LACE2} />
          <circle r={11} fill={LACE} />
          <circle cx={0} cy={-6} r={8} fill={LACE2} opacity={at(bow, [0.6, 1], [0, 1])} />
        </g>
      )}
    </Svg>
  );
};

// A dangling untied lace at the near boot of a Person (hiker coords).
const LooseLace: React.FC<{ p: HikerProps; t: number; o?: number }> = ({ p, t, o = 1 }) => {
  const f = hikerGeometry(p).legs[1].foot;
  const s = Math.sin(t * 7) * 4;
  return (
    <g transform={hikerTransform(p)} opacity={o}>
      <path d={`M${f[0] + 4},${f[1] - 22} q${-8 + s},12 ${-4 + s},26`} stroke={LACE} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d={`M${f[0] + 10},${f[1] - 22} q${10 - s},10 ${12 - s},24`} stroke={LACE2} strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Kate on the icy descent, she stops, a lace dangles (0 - 4.09) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y + t * 4, zoom: mix(1.03, 1.1, t / 4.09), rot: hh.rot };
  const tilt = -0.14;
  const stop = at(t, [2.6, 3.1], [0, 1]);
  const tm = Math.min(t, 3.0);
  const x = 380 + tm * 40;
  const g = 1560 - tilt * (x - 540);
  const ph = tm * 2.0;
  const p: HikerProps = { x, y: g + 40, scale: 2.4, phase: ph, walk: mix(0.35, 0, stop), lean: mix(-0.08, 0.1, stop), poles: false, handOverride: stop > 0.5 ? [40, 30] : freeHand(ph, 0.35), breathe: Math.sin(t * 3) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={1300} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={1560} tilt={tilt} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={KATE_GLOVES} expression={stop > 0.5 ? "tired" : "neutral"} />
          <LooseLace p={p} t={t} o={at(t, [2.6, 3.0], [0, 1])} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,246,226" />
      <Particles seed={1511} n={18} col="#ffffff" fall={14} />
      <LowScrim k={0.6} />
      <Grade sunX={800} sunY={560} warm="248,240,228" cool="40,60,90" />
      <Title text={"Her lace came\nundone on the\nicy descent."} t={t} t0={0} top={110} size={124} />
      <Chip text="Halfway down" t={t} t0={1.2} x={60} y={640} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the undone lace, a thick glove can't grip it (4.09 - 6.31) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.05, 1.12, lt / 2.22), rot: hh.rot };
  const fumble = Math.sin(t * 6) * 18;
  const come = at(t, [4.2, 4.7], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1050} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,1440 L1300,1430 L1300,2400 L-200,2400 Z" fill="#dfe6ea" />
        </Svg>
        <Subject rimX={6} col="rgba(240,240,236,0.8)">
          <BigBoot undone={1} t={t} />
          {/* thick gloved hand fumbling at the lace ends */}
          <g transform={`translate(${mix(1000, 640, come) + fumble},${980 + fumble * 0.5}) rotate(-20)`}>
            <path d="M-120,-70 Q-150,0 -110,70 L120,90 Q170,40 150,-40 L60,-110 Q-40,-120 -120,-70 Z" fill={GLOVE} />
            <path d="M-120,-70 Q-180,-120 -150,-170 Q-110,-180 -70,-100 Z" fill={GLOVE} />
            <path d="M-80,-30 L100,-20 M-80,20 L110,30" stroke="#3c4048" strokeWidth={10} strokeLinecap="round" />
            <path d="M120,90 L420,140 L440,-60 L150,-40 Z" fill={KATE.jacket} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1512} n={14} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="240,236,228" cool="40,55,80" vignette={0.55} />
      <Chip text="Thick gloves on" t={t} t0={4.3} x={60} y={200} icon="none" big />
      <Chip text="Couldn't tie it" t={t} t0={5.4} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: gloves off, fingers numb, crouched in the wind (6.31 - 9.59) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.55);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.28), rot: hh.rot };
  const g = 1560;
  const pull = Math.max(0, Math.sin(t * 4)) * 0.6;
  const p: HikerProps = { x: 520, y: g + 40, scale: 2.4, walk: 0, lean: 0.55, poles: false, handOverride: [96, 110 - pull * 20], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          {/* the gloves dropped in the snow */}
          <ellipse cx={820} cy={g + 70} rx={46} ry={20} fill={GLOVE} />
          <ellipse cx={880} cy={g + 84} rx={42} ry={18} fill={GLOVE} />
        </Svg>
        <Subject rimX={6} col="rgba(236,240,246,0.8)">
          <Person {...p} outfit={KATE} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Blizzard seed={1513} n={30} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <LowScrim k={0.6} />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" />
      <Chip text="Gloves off" t={t} t0={6.4} x={60} y={200} icon="x" big />
      <Readout label="IN THE WIND" value="Fingers numb" ok={false} t={t} t0={7.5} x={60} y={330} />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the fix, at the trailhead, tie your boots with warm, bare hands (9.59 - 14.09) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.04, 1.1, lt / 4.5), rot: hh.rot };
  const g = 1560;
  const pull = Math.max(0, Math.sin(t * 5)) * at(t, [11.0, 11.4], [0, 1]);
  const p: HikerProps = { x: 470, y: g + 40, scale: 2.4, walk: 0, lean: 0.55, poles: false, handOverride: [96, 110 - pull * 30], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={0.85} blur={2}>
        <Svg>
          <Car x={880} y={g - 30} s={2.6} body="#7d8a92" shade="#5f6b72" />
          <path d={`M170,880 L190,880 L190,${g} L170,${g} Z`} fill="#5a3e2b" />
          <rect x={50} y={860} width={260} height={110} rx={10} fill="#5a3e2b" />
          <text x={180} y={935} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={52} fill="#f3e6c4" letterSpacing={3}>
            TRAILHEAD
          </text>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g - 30} L1480,${g - 40} L1480,2600 L-400,2600 Z`} fill="#8b8a84" />
          <path d={`M-400,${g - 30} L1480,${g - 40} L1480,${g} L-400,${g + 10} Z`} fill="#e6ecef" />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,215,0.85)">
          <Person {...p} outfit={KATE} expression="neutral" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,246,226" />
      <Particles seed={1514} n={14} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="252,236,214" cool="40,60,90" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={10.75} top={200} size={124} />
      <Chip text="At the trailhead" t={t} t0={11.6} x={60} y={200} icon="check" big />
      <Chip text="Warm, bare hands" t={t} t0={12.8} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: double knot, then tuck the loops in (14.09 - 16.34) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + 120, zoom: mix(1.25, 1.32, lt / 2.25), rot: hh.rot };
  const bow = at(t, [14.1, 14.6], [0, 1], outExpo);
  const tuck = at(t, [15.2, 15.8], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={1050} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,1440 L1300,1430 L1300,2400 L-200,2400 Z" fill="#8b8a84" />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,215,0.8)">
          <BigBoot bow={bow} tuck={tuck} t={t} />
        </Subject>
      </Plane>
      <Particles seed={1515} n={10} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,232,200" vignette={0.55} />
      <Chip text="Double knot" t={t} t0={14.2} x={60} y={200} icon="check" big />
      <Chip text="Tuck the loops in" t={t} t0={15.0} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 MACRO: worn smooth or fuzzy? replace them before winter (16.34 - 20.61) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 4.27), rot: hh.rot };
  const fuzz = at(t, [17.9, 18.2], [0, 1]);
  const swap = at(t, [18.9, 19.5], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1150} blur={18} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Svg>
            {/* old lace: smooth shiny stretch, then a fuzzy stretch; slides out when swapped */}
            <g transform={`translate(${-swap * 1300},0)`}>
              <Lace d="M-100,900 Q200,860 380,890" w={70} />
              <path d="M380,890 Q540,900 700,890" stroke="#4a3a2c" strokeWidth={50} fill="none" strokeLinecap="round" />
              <path d="M390,878 Q540,886 690,878" stroke="#d9c7a8" strokeWidth={8} fill="none" opacity={0.5} />
              <Lace d="M700,890 Q900,920 1200,880" w={70} />
              {Array.from({ length: 30 }, (_, i) => (
                <path key={i} d={`M${740 + i * 13},${890 + (i % 2 ? 16 : -16)} l${(i % 3) * 6 - 6},${i % 2 ? 24 : -24}`} stroke="#e8c68e" strokeWidth={4} strokeLinecap="round" opacity={fuzz} />
              ))}
              <ellipse cx={540} cy={890} rx={180} ry={80} fill="none" stroke="#ffffff" strokeWidth={6} strokeDasharray="16 12" opacity={at(t, [17.5, 17.8], [0, 1])} />
              <ellipse cx={920} cy={890} rx={180} ry={80} fill="none" stroke="#ffffff" strokeWidth={6} strokeDasharray="16 12" opacity={fuzz} />
            </g>
            {/* fresh lace slides in */}
            <g transform={`translate(${(1 - swap) * 1300},180)`}>
              <Lace d="M-100,900 Q300,860 700,900 T1300,880" w={70} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1516} n={12} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="250,240,226" vignette={0.55} />
      <Chip text="Worn smooth or fuzzy?" t={t} t0={17.5} x={60} y={200} icon="x" big />
      <Chip text="Replace before winter" t={t} t0={18.8} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: golden light, Kate walks down, laces held (20.61 - 22.9) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y + lt * 6, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const tilt = -0.1;
  const x = 340 + lt * 80;
  const g = 1560 - tilt * (x - 540);
  const ph = t * 2.6;
  const p: HikerProps = { x, y: g + 40, scale: 2.4, phase: ph, walk: 0.6, lean: -0.04, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="g" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={1560} tilt={tilt} snow={0} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={KATE_GLOVES} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.45} col="255,236,200" />
      <Particles seed={1517} n={22} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,226,180" />
      <Readout label="ALL THE WAY DOWN" value="Laces held" ok={true} t={t} t0={20.75} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/round-hiking-boot-laces-two-tone-cut.png"
      cutoutH={600}
      spec="4 MM ROUND · TWO-TONE · 1 PAIR"
      name={
        <>
          Hiking Boot
          <br />
          Laces
        </>
      }
      nameSize={96}
      price="$10.99"
      save="Save this before your winter hike"
    />
  );
};

export const V151: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.14} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.09} to={6.36} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.09} />
    </Scene>
    <Scene from={6.31} to={9.64} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.31} />
    </Scene>
    <Scene from={9.59} to={14.14} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.59} />
    </Scene>
    <Scene from={14.09} to={16.39} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={14.09} />
    </Scene>
    <Scene from={16.34} to={20.66} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={16.34} />
    </Scene>
    <Scene from={20.61} to={22.95} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={20.61} />
    </Scene>
    <Scene from={22.75} to={27.5} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.09, 1600],
        [4.09, 6.31, 1660],
        [6.31, 9.59, 1600],
        [9.59, 14.09, 1600],
        [14.09, 16.34, 1660],
        [16.34, 20.61, 1660],
        [20.61, 22.75, 1600],
      ]}
    />
  </AbsoluteFill>
);
