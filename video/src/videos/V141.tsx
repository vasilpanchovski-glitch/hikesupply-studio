// V141: "His boot lace snapped at the trailhead." in the cinematic C01 style, cold late-fall morning. Story for the Round Hiking
// Boot Laces (4 mm Two-Tone, 1 Pair, $10.99, live Shopify). Advice (simple gear care): laces wear where they rub the eyelets and
// top hooks; before winter run your fingers along each lace there; fuzzy or thin means replace both; carry one spare lace in the
// pack. No numbers or claims beyond that. End card = real Shopify product photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, Breath, CLEAR, FALL, GOLD, OVERCAST, Subject, Trail } from "../fall";
import vo from "../vo/v141.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const LEO: Outfit = {
  ...JAKE,
  skin: "#D7A27E",
  skinShade: "#B98360",
  hair: "#3a2a1e",
  beard: "#3a2a1e",
  cap: "#B5553A",
  capShade: "#8E3F2A",
  jacket: "#3E4F5C",
  jacketShade: "#2C3943",
  pants: "#5B5546",
  pantsShade: "#45402F",
  pack: "#3F6B55",
  packShade: "#2D5141",
  glove: null,
};

const BOOT = "#6B4630";
const BOOT2 = "#55361f";
const LACE = "#C27A2C";
const LACE2 = "#2a1c12";
const METAL = "#b9c0c4";

// Two-tone lace stroke.
const Lace: React.FC<{ d: string; w?: number; o?: number }> = ({ d, w = 14, o = 1 }) => (
  <g opacity={o}>
    <path d={d} stroke={LACE2} strokeWidth={w} fill="none" strokeLinecap="round" />
    <path d={d} stroke={LACE} strokeWidth={w * 0.6} strokeDasharray={`${w * 0.7} ${w * 0.7}`} fill="none" strokeLinecap="round" />
  </g>
);

// Big hiking boot, side view, screen coords. Eyelets up the front edge, two top hooks.
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

const BigBoot: React.FC<{ snap?: number; loose?: number; fuzz?: number; t: number }> = ({ snap = 0, loose = 0, fuzz = 0, t }) => {
  const pts = [...EYES, ...HOOKS];
  const top = HOOKS[1];
  const flop = snap * (1 + Math.sin(t * 6) * 0.1);
  return (
    <Svg>
      <ellipse cx={560} cy={1520} rx={430} ry={34} fill="rgba(0,0,0,0.25)" />
      {/* pants */}
      <path d="M300,300 L560,300 L580,760 L300,760 Z" fill={LEO.pants} />
      {/* shaft + foot */}
      <path d={`M300,${740 + loose * 30} Q420,${700 + loose * 30} ${560 + loose * 30},${760 + loose * 20} L660,1290 Q760,1330 880,1370 Q940,1400 930,1460 L930,1490 L190,1490 L200,1100 Q230,900 300,${740 + loose * 30} Z`} fill={BOOT} stroke="rgba(0,0,0,0.3)" strokeWidth={4} />
      <path d="M200,1300 Q500,1320 930,1440" stroke={BOOT2} strokeWidth={14} fill="none" />
      <path d="M240,780 Q300,1000 260,1240" stroke={BOOT2} strokeWidth={10} fill="none" opacity={0.6} />
      {/* tongue */}
      <path d={`M560,${740 + loose * 20} Q600,${700} 640,${740} L700,1280 L650,1290 Z`} fill="#7d5a40" />
      <rect x={190} y={1480} width={750} height={44} rx={16} fill={LEO.sole} />
      {/* lace zigzag between eyelets */}
      {pts.slice(0, snap > 0 ? 4 : 5).map((p, i) => {
        const q = pts[i + 1];
        return <Lace key={i} d={`M${p[0]},${p[1]} L${q[0] + 60 + loose * 30},${q[1] + 30} M${p[0] + 60 + loose * 30},${p[1] + 30} L${q[0]},${q[1]}`} />;
      })}
      {/* last section at the top hook: whole, or snapped with frayed ends */}
      {snap > 0 && (
        <>
          <Lace d={`M${HOOKS[0][0]},${HOOKS[0][1]} Q${HOOKS[0][0] + 40},${HOOKS[0][1] - 40 + flop * 30} ${HOOKS[0][0] + 50},${HOOKS[0][1] - 50 + flop * 120}`} />
          <Lace d={`M${top[0]},${top[1]} Q${top[0] - 80},${top[1] + 40 * flop} ${top[0] - 120},${top[1] + 160 * flop}`} />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${HOOKS[0][0] + 50},${HOOKS[0][1] - 50 + flop * 120} l${-10 + i * 7},${14 + (i % 2) * 6}`} stroke={LACE} strokeWidth={4} strokeLinecap="round" />
          ))}
        </>
      )}
      {/* eyelets + hooks */}
      {EYES.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={15} fill={METAL} />
          <circle cx={x} cy={y} r={7} fill="#3a3f44" />
          <circle cx={x + 60 + loose * 30} cy={y + 30} r={15} fill={METAL} opacity={0.7} />
        </g>
      ))}
      {HOOKS.map(([x, y], i) => (
        <path key={i} d={`M${x - 14},${y + 14} L${x + 6},${y + 14} Q${x + 24},${y + 8} ${x + 18},${y - 12}`} stroke={METAL} strokeWidth={12} fill="none" strokeLinecap="round" />
      ))}
      {/* fuzzy wear marks at the top hook */}
      {fuzz > 0 &&
        Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M${top[0] + 6 + (i % 5) * 8},${top[1] + 20 + Math.floor(i / 5) * 10} l${(i % 3) - 1 * 6},${-12 - (i % 4) * 3}`} stroke="#e8c68e" strokeWidth={3} strokeLinecap="round" opacity={fuzz} />
        ))}
    </Svg>
  );
};

// ============ S1 HOOK MEDIUM: cold parking lot, Leo pulls his laces tight (0 - 4.00) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5, at(t, [3.95, 4.0], [0, 1]) * 3);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.03, 1.1, t / 4.0), rot: hh.rot };
  const g = 1560;
  const pull = Math.max(0, Math.sin(t * 5)) * at(t, [1.2, 1.5], [0, 1]);
  const p: HikerProps = { x: 520, y: g + 40, scale: 2.4, walk: 0, lean: 0.55, poles: false, handOverride: [96, 110 - pull * 30], breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="a" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={0.85} blur={2}>
        <Svg>
          <Car x={880} y={g - 30} s={2.6} body="#7d8a92" shade="#5f6b72" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g - 30} L1480,${g - 40} L1480,2600 L-400,2600 Z`} fill="#77736b" />
          <path d={`M60,${g + 160} L300,${g + 150} M700,${g + 140} L960,${g + 130}`} stroke="#d9d4c4" strokeWidth={10} />
        </Svg>
        <Subject rimX={6} col="rgba(240,240,236,0.8)">
          <Person {...p} outfit={LEO} expression="neutral" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2e2618" side="right" />
      </Plane>
      <Particles seed={1411} n={14} leaves={FALL} fall={30} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="240,232,220" cool="40,55,80" />
      <Title text={"His boot lace\nsnapped at\nthe trailhead."} t={t} t0={0} top={110} size={124} />
      <Chip text="Cold parking lot" t={t} t0={1.2} x={60} y={640} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: SNAP at the top hook, frayed for months (4.00 - 7.44) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const snap = at(t, [4.1, 4.4], [0, 1], outExpo);
  const hh = handheld(t, 0.35, at(t, [4.1, 4.2, 4.6], [0, 1, 0]) * 5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.05, 1.12, lt / 3.44), rot: hh.rot };
  const flash = at(t, [4.1, 4.15, 4.45], [0, 1, 0]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="b" treeY={1050} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,1440 L1300,1430 L1300,2400 L-200,2400 Z" fill="#77736b" />
        </Svg>
        <Subject rimX={6} col="rgba(240,240,236,0.8)">
          <BigBoot snap={snap} fuzz={at(t, [5.0, 5.4], [0, 1])} t={t} />
          <circle cx={600} cy={780} r={30 + flash * 120} fill="#fff7e0" opacity={flash * 0.6} />
        </Subject>
      </Plane>
      <Particles seed={1412} n={10} leaves={FALL} fall={20} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="240,232,220" cool="40,55,80" vignette={0.55} />
      <Chip text="Snap" t={t} t0={4.1} x={60} y={200} icon="x" big />
      <Chip text="Frayed for months" t={t} t0={5.4} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: knotted short ends, a loose, sloppy boot all hike (7.44 - 12.37) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 22, y: hh.y, zoom: mix(1.0, 1.06, lt / 4.93), rot: hh.rot };
  const g = 1480;
  const ph = t * 2.2;
  const limp = Math.max(0, Math.sin(ph)) * 0.06;
  const p: HikerProps = { x: 300 + lt * 70, y: g + 30, scale: 1.5, phase: ph, walk: 0.5, lean: 0.1 + limp, poles: false, handOverride: freeHand(ph, 0.4), breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="c" treeY={g - 100} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={5}>
          <Person {...p} outfit={LEO} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2e2618" side="both" />
      </Plane>
      <Particles seed={1413} n={16} leaves={FALL} fall={40} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="240,232,220" cool="40,55,80" />
      <Chip text="Knotted short ends" t={t} t0={7.8} x={60} y={200} icon="x" big />
      <Readout label="ALL HIKE" value="Loose, sloppy boot" ok={false} t={t} t0={10.0} x={60} y={330} />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the fix: before winter, fingers along each lace where it rubs (12.37 - 17.88) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 5.51), rot: hh.rot };
  const run = at(t, [14.2, 17.4], [0, 1]);
  const pts = [...EYES, ...HOOKS];
  const seg = Math.min(pts.length - 1.001, run * (pts.length - 1));
  const i = Math.floor(seg);
  const k = seg - i;
  const fx = mix(pts[i][0], pts[i + 1][0], k);
  const fy = mix(pts[i][1], pts[i + 1][1], k);
  const show = at(t, [13.6, 14.0], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={1050} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,1440 L1300,1430 L1300,2400 L-200,2400 Z" fill="#8a7560" />
        </Svg>
        <Subject rimX={6}>
          <BigBoot t={t} fuzz={at(t, [16.6, 17.0], [0, 1])} />
          <g opacity={show} transform={`translate(${fx},${fy})`}>
            {/* finger + hand from the right */}
            <path d="M-6,-14 Q30,-30 120,-26 L360,-60 L400,60 L140,40 Q40,40 -6,14 Q-20,0 -6,-14 Z" fill={LEO.skin} />
            <path d="M-4,-10 Q-14,0 -4,10" stroke={LEO.skinShade} strokeWidth={4} fill="none" />
            <path d="M360,-60 L520,-110 L560,10 L400,60 Z" fill={LEO.jacket} />
            <circle cx={0} cy={0} r={34} fill="none" stroke="#ffffff" strokeWidth={5} opacity={0.8} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1414} n={10} leaves={FALL} fall={20} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,226,190" vignette={0.55} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={13.4} top={200} size={124} />
      <Chip text="Before winter" t={t} t0={13.55} x={60} y={200} icon="check" big />
      <Chip text="Check where it rubs" t={t} t0={15.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MACRO: fuzzy or thin? replace both (17.88 - 19.76) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.88), rot: hh.rot };
  const fuzz = at(t, [17.95, 18.3], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={1150} blur={18} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Svg>
            {/* one lace across the frame, worn in the middle */}
            <Lace d="M-100,1000 Q200,960 380,990" w={70} />
            <Lace d="M700,990 Q900,1020 1200,980" w={70} />
            <path d="M380,990 Q540,1000 700,990" stroke={LACE2} strokeWidth={34} fill="none" />
            <path d="M380,990 Q540,1000 700,990" stroke={LACE} strokeWidth={18} strokeDasharray="10 14" fill="none" opacity={0.7} />
            {Array.from({ length: 26 }, (_, i) => (
              <path key={i} d={`M${400 + i * 11},${990 + (i % 2 ? 14 : -14)} l${(i % 3) * 6 - 6},${i % 2 ? 22 : -22}`} stroke="#e8c68e" strokeWidth={4} strokeLinecap="round" opacity={fuzz} />
            ))}
            <ellipse cx={540} cy={995} rx={200} ry={90} fill="none" stroke="#ffffff" strokeWidth={6} strokeDasharray="16 12" opacity={fuzz} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1415} n={12} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,226,190" vignette={0.55} />
      <Chip text="Fuzzy or thin?" t={t} t0={18.0} x={60} y={200} icon="x" big />
      <Chip text="Replace both" t={t} t0={19.0} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 MEDIUM: one spare lace into the pack (19.76 - 21.59) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.83), rot: hh.rot };
  const drop = at(t, [19.9, 20.6], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={1100} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,1500 L1300,1480 L1300,2400 L-200,2400 Z" fill="#8a7560" />
          <g transform="translate(540,1560)">
            <ellipse cx={0} cy={10} rx={360} ry={30} fill="rgba(0,0,0,0.25)" />
            <path d="M-300,0 Q-330,-520 -240,-760 L240,-760 Q330,-520 300,0 Z" fill={LEO.pack} />
            <path d="M-260,-720 Q0,-800 260,-720 L250,-560 Q0,-600 -250,-560 Z" fill={LEO.packShade} />
            <rect x={-150} y={-660} width={300} height={70} rx={20} fill="#244236" />
            <path d="M-120,-630 L120,-630" stroke="#c9ced2" strokeWidth={8} />
          </g>
          {/* coiled spare lace dropping into the lid pocket */}
          <g transform={`translate(540,${mix(500, 920, drop)}) scale(${mix(1, 0.7, drop)})`} opacity={1 - at(t, [20.6, 20.9], [0, 1])}>
            <Lace d="M-120,0 a120,60 0 1,0 240,0 a120,60 0 1,0 -240,0" w={22} />
            <Lace d="M-90,0 a90,44 0 1,0 180,0 a90,44 0 1,0 -180,0" w={22} />
          </g>
        </Svg>
      </Plane>
      <Particles seed={1416} n={12} leaves={FALL} fall={20} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,226,190" />
      <Chip text="One spare in your pack" t={t} t0={19.95} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF MEDIUM: next weekend, boots held tight (21.59 - 23.95) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1560;
  const ph = t * 2.8;
  const p: HikerProps = { x: 320 + lt * 90, y: g + 40, scale: 2.4, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="g" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} tilt={0.04} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={LEO} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2e2618" side="right" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1] - 100} strength={0.45} />
      <Particles seed={1417} n={22} leaves={FALL} fall={30} />
      <LowScrim />
      <Grade sunX={740} sunY={660} warm="255,214,160" />
      <Readout label="NEXT WEEKEND" value="Held tight" ok={true} t={t} t0={21.75} x={60} y={200} />
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
      save="Save this before your next hike"
    />
  );
};

export const V141: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.0} fadeIn={0} fadeOut={0.04}>
      <S1 />
    </Scene>
    <Scene from={3.98} to={7.49} fadeIn={0.02} fadeOut={0.08}>
      <S2 off={3.98} />
    </Scene>
    <Scene from={7.44} to={12.42} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={7.44} />
    </Scene>
    <Scene from={12.37} to={17.93} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={12.37} />
    </Scene>
    <Scene from={17.88} to={19.81} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={17.88} />
    </Scene>
    <Scene from={19.76} to={21.64} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={19.76} />
    </Scene>
    <Scene from={21.59} to={24.0} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={21.59} />
    </Scene>
    <Scene from={23.85} to={29} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.98, 1600],
        [3.98, 7.44, 1660],
        [7.44, 12.37, 1600],
        [12.37, 17.88, 1660],
        [17.88, 19.76, 1660],
        [19.76, 21.59, 1600],
        [21.59, 23.85, 1600],
      ]}
    />
  </AbsoluteFill>
);
