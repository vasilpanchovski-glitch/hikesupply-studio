// V181: "January. The bear wasn't asleep." Short format (16.6 s, 43 words), cinematic C01 style, a mild January day in the Smokies.
// Product: Great Smoky Mountains Trip Pack — Planning Guide + 10 GPX Day Hikes, $19.99 (live Shopify). End card = boxed store card.
// Advice (NPS Great Smoky Mountains): black bears may leave their dens on warm winter days; stay at least 50 yards (150 ft, 46 m)
// away and never leave food out. The bear only wanders and sniffs; no charge, no injury shown.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { CLEAR, Subject, Trail } from "../fall";
import { WinterBackdrop } from "../winter";
import vo from "../vo/v181.json";

const words = vo.words as unknown as Word[];

const NORA: Outfit = {
  ...GUIDE,
  skin: "#D9A47E",
  skinShade: "#B98460",
  hair: "#5a3420",
  ponytail: "#5a3420",
  beard: null,
  cap: "#4E6B3A",
  capShade: "#3c532c",
  jacket: "#2F6E9A",
  jacketShade: "#24557a",
  pants: "#4a4238",
  pantsShade: "#383128",
  pack: "#9a4a2c",
  packShade: "#7a3a22",
  glove: "#2a2a2a",
};
const FUR = "#18171a";
const FUR2 = "#26252a";
const MUZZLE = "#a57d56";
const GRASS = "#857a52";
const DIRT = "#8f7556";

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// American black bear, side view facing left. (x, y) = ground under the body. head 0 level, 1 nose down sniffing.
const Bear: React.FC<{ x: number; y: number; s?: number; phase?: number; walk?: number; head?: number; flip?: boolean }> = ({ x, y, s = 1, phase = 0, walk = 0, head = 0, flip = false }) => {
  const sw = (o: number) => Math.sin(phase + o) * 0.35 * walk;
  const leg = (hx: number, a: number, col: string, w: number) => {
    const px = hx + Math.sin(a) * 50;
    const lift = Math.max(0, Math.sin(a)) * 12 * walk;
    return (
      <g>
        <path d={`M${hx},-90 L${hx + Math.sin(a) * 26},-44 L${px},${-lift - 6}`} stroke={col} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <ellipse cx={px - 8} cy={-lift - 6} rx={22} ry={10} fill={col} />
      </g>
    );
  };
  const hr = head * 22;
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
      <ellipse cx={0} cy={4} rx={150} ry={14} fill="rgba(0,0,0,0.25)" />
      {leg(-70, sw(Math.PI), FUR2, 34)}
      {leg(80, sw(0), FUR2, 34)}
      <ellipse cx={0} cy={-110} rx={140} ry={66} fill={FUR} />
      <ellipse cx={40} cy={-150} rx={70} ry={34} fill={FUR2} opacity={0.6} />
      <path d="M130,-120 q24,-10 26,6" stroke={FUR} strokeWidth={18} strokeLinecap="round" fill="none" />
      {leg(-90, sw(0), FUR, 38)}
      {leg(70, sw(Math.PI), FUR, 38)}
      <g transform={`rotate(${hr},-110,-120)`}>
        <path d="M-90,-150 Q-130,-160 -150,-130 L-140,-90 Q-110,-80 -90,-100 Z" fill={FUR} />
        <circle cx={-160} cy={-130} r={44} fill={FUR} />
        <circle cx={-148} cy={-176} r={16} fill={FUR} />
        <circle cx={-182} cy={-170} r={15} fill={FUR} />
        <circle cx={-148} cy={-176} r={7} fill={FUR2} />
        <ellipse cx={-206} cy={-118} rx={30} ry={20} fill={MUZZLE} />
        <ellipse cx={-230} cy={-124} rx={10} ry={8} fill="#0c0c0c" />
        <circle cx={-176} cy={-142} r={5} fill="#0c0c0c" />
        <circle cx={-177} cy={-144} r={1.6} fill="#fff" />
      </g>
    </g>
  );
};

// Big close-up bear head (screen coords), three-quarter view to the left, nose lifted to the warm air.
const BearHead: React.FC<{ cx: number; cy: number; s: number; t: number }> = ({ cx, cy, s, t }) => {
  const sniff = Math.sin(t * 9) * 3;
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      <path d="M-40,60 Q60,200 260,220 L300,400 L-120,400 Z" fill={FUR} />
      <ellipse cx={30} cy={0} rx={130} ry={120} fill={FUR} />
      <circle cx={-40} cy={-110} r={42} fill={FUR} />
      <circle cx={100} cy={-108} r={40} fill={FUR} />
      <circle cx={-40} cy={-110} r={20} fill={FUR2} />
      <circle cx={100} cy={-108} r={18} fill={FUR2} />
      <ellipse cx={-50} cy={50} rx={78} ry={56} fill={MUZZLE} />
      <ellipse cx={-90} cy={30 + sniff * 0.3} rx={30} ry={22} fill="#0c0c0c" />
      <ellipse cx={-98} cy={24} rx={8} ry={5} fill="#555" />
      <path d="M-60,80 q30,14 60,0" stroke="#3a2a1c" strokeWidth={6} fill="none" strokeLinecap="round" />
      <circle cx={-20} cy={-30} r={11} fill="#0c0c0c" />
      <circle cx={70} cy={-28} r={10} fill="#0c0c0c" />
      <circle cx={-23} cy={-34} r={3} fill="#fff" />
      <circle cx={67} cy={-32} r={3} fill="#fff" />
      <path d="M-120,-40 q-20,40 0,80" stroke={FUR2} strokeWidth={8} fill="none" opacity={0.6} />
      {/* breath in the cool air */}
      <ellipse cx={-170 - ((t * 60) % 60)} cy={20} rx={40 + ((t * 40) % 30)} ry={20} fill="#ffffff" opacity={0.18} />
    </g>
  );
};

// Den: a hollow at the base of a big tree, rocks around it.
const Den: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-90,-2000 L90,-2000 L100,-40 Q160,0 200,10 L-200,10 Q-160,0 -100,-40 Z" fill="#5a4a3c" />
    <rect x={-90} y={-2000} width={60} height={1960} fill="#4a3c30" />
    {[-1700, -1300, -900, -500].map((y) => (
      <path key={y} d={`M-60,${y} q20,40 0,90 M40,${y + 120} q-16,50 0,100`} stroke="#3e3228" strokeWidth={8} fill="none" />
    ))}
    <path d="M-60,0 Q-60,-150 0,-160 Q60,-150 60,0 Z" fill="#1a1410" />
    <ellipse cx={-150} cy={-20} rx={90} ry={50} fill="#6d6a64" />
    <ellipse cx={150} cy={-14} rx={80} ry={40} fill="#7a766e" />
  </g>
);

// Close-up of gloved hands putting a food bag into the pack.
const FoodHands: React.FC<{ t: number }> = ({ t }) => {
  const k = at(t, [11.0, 11.8], [0, 1], outExpo);
  const by = mix(760, 1060, k);
  return (
    <g>
      <rect x={180} y={1080} width={720} height={700} rx={120} fill={NORA.pack} />
      <rect x={180} y={1080} width={260} height={700} rx={120} fill={NORA.packShade} opacity={0.5} />
      <path d="M220,1110 Q540,1040 860,1110" stroke="#5a2a18" strokeWidth={18} fill="none" />
      <ellipse cx={540} cy={1110} rx={300} ry={60} fill="#3a1d12" />
      <g transform={`translate(540,${by})`}>
        <rect x={-130} y={-120} width={260} height={220} rx={24} fill="#e9eef0" opacity={0.92} />
        <rect x={-130} y={-120} width={260} height={30} rx={10} fill="#3a8f5a" />
        <ellipse cx={-40} cy={0} rx={60} ry={40} fill="#c9944a" />
        <ellipse cx={50} cy={20} rx={50} ry={36} fill="#b5553a" />
      </g>
      <path d={`M-160,${by + 500} Q140,${by + 260} 360,${by}`} stroke={NORA.jacketShade} strokeWidth={130} strokeLinecap="round" fill="none" />
      <ellipse cx={385} cy={by - 10} rx={62} ry={72} fill={NORA.glove ?? "#2a2a2a"} />
      <path d={`M1240,${by + 500} Q940,${by + 260} 720,${by}`} stroke={NORA.jacketShade} strokeWidth={130} strokeLinecap="round" fill="none" />
      <ellipse cx={695} cy={by - 10} rx={62} ry={72} fill={NORA.glove ?? "#2a2a2a"} />
    </g>
  );
};

const Woodsy: React.FC<{ cam: Cam; uid: string; g: number; t: number; blur?: number }> = ({ cam, uid, g, t, blur = 0 }) => (
  <WinterBackdrop cam={cam} sky={CLEAR} uid={uid} treeY={g - 200} t={t} snow={0.2} blur={blur} mid="#7f8f8a" />
);

// ============ S1 HOOK WIDE: Nora on a sunny January trail, something dark in the trees (0 - 3.1) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.03, 1.1, t / 3.1), rot: hh.rot };
  const g = 1460;
  const ph = t * 3.2;
  const p: HikerProps = { x: 280 + t * 40, y: g + 20, scale: 2.1, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <Woodsy cam={cam} uid="a" g={g} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} grass={GRASS} dirt={DIRT} />
        <Svg>
          <Bear x={900} y={g - 30} s={0.9} phase={t * 2} walk={0.4} head={0.6} />
        </Svg>
        <Subject rimX={6} col="rgba(255,236,190,0.85)">
          <Person {...p} outfit={NORA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2a1a" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.3} />
      <Particles seed={1811} n={16} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,232,196" cool="40,60,90" />
      <Title text={"January.\nThe bear\nwasn't asleep."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: the bear by the trail, Nora stops (3.1 - 4.6) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5, 1);
  const shake = lt < 0.3 ? Math.sin(t * 40) * 6 : 0;
  const cam: Cam = { x: hh.x + shake, y: hh.y, zoom: at(lt, [0, 0.5], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1480;
  const p: HikerProps = { x: 220, y: g + 20, scale: 2.2, walk: 0, lean: -0.08, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 4) * 2 };
  return (
    <AbsoluteFill>
      <Woodsy cam={cam} uid="b" g={g} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} grass={GRASS} dirt={DIRT} />
        <Subject rimX={5} col="rgba(255,236,190,0.8)">
          <Svg>
            <Bear x={800} y={g + 10} s={1.4} phase={0} walk={0} head={0.2} />
          </Svg>
          <Person {...p} outfit={NORA} expression="tired" />
        </Subject>
      </Plane>
      <Particles seed={1812} n={12} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,232,196" cool="40,60,90" vignette={0.55} />
      <Chip text="Right by the trail" t={t} t0={3.25} x={60} y={170} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the bear's head out in the warm sun, sniffing (4.6 - 6.6) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.0), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Woodsy cam={cam} uid="c" g={1350} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,236,190,0.9)">
          <Svg>
            <BearHead cx={560} cy={1060} s={2.6} t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.4} />
      <Particles seed={1813} n={16} col="#fff3d6" bokeh />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,228,190" cool="40,60,90" vignette={0.5} />
      <Chip text="Smokies, January" t={t} t0={4.7} x={60} y={170} icon="none" big />
      <Chip text="Warm day, bear awake" t={t} t0={5.8} x={60} y={300} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 WIDE: the den at a big tree, the bear wandering out (6.6 - 8.6) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.0), rot: hh.rot };
  const g = 1460;
  return (
    <AbsoluteFill>
      <Woodsy cam={cam} uid="d" g={g} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} grass={GRASS} dirt={DIRT} />
        <Svg>
          <Den x={760} y={g - 20} s={1.0} />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,190,0.85)">
          <Svg>
            <Bear x={560 - lt * 60} y={g + 40} s={1.2} phase={t * 3} walk={0.7} head={0.4} />
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2a1a" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.3} />
      <Particles seed={1814} n={14} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,232,196" cool="40,60,90" />
      <Chip text="They may leave the den" t={t} t0={6.7} x={60} y={170} icon="none" big />
      <Chip text="on warm winter days" t={t} t0={7.3} x={60} y={300} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: the rule, Nora far back, the bear small up the trail (8.6 - 10.9) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.3), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 200, y: g + 20, scale: 2.0, walk: 0, lean: 0, poles: false, handOverride: [26, 40], breathe: 0 };
  const line = at(t, [9.3, 10.0], [0, 1], outExpo);
  const y0 = g - 60;
  return (
    <AbsoluteFill>
      <Woodsy cam={cam} uid="e" g={g} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} grass={GRASS} dirt={DIRT} />
        <Svg>
          <Bear x={900} y={g - 10} s={0.55} phase={t * 2} walk={0.3} head={0.6} />
          {line > 0 && (
            <path d={`M${330},${y0} L${330 + 440 * line},${y0}`} stroke="#ffffff" strokeWidth={8} strokeDasharray="22 18" strokeLinecap="round" />
          )}
        </Svg>
        <Subject rimX={6} col="rgba(255,236,190,0.85)">
          <Person {...p} outfit={NORA} expression="neutral" />
        </Subject>
      </Plane>
      <Particles seed={1815} n={12} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,232,196" cool="40,60,90" />
      <Chip text="The rule" t={t} t0={8.7} x={60} y={170} icon="none" big />
      <Chip text="Stay 50 yards (46 m) away" t={t} t0={9.6} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: hands pack the food away (10.9 - 12.3) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.0, lt / 1.4), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Woodsy cam={cam} uid="f" g={1300} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(255,236,190,0.85)">
          <Svg>
            <FoodHands t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1816} n={12} col="#fff3d6" bokeh />
      <Grade sunX={790} sunY={560} warm="255,228,190" cool="40,60,90" vignette={0.5} />
      <Chip text="Never leave food out" t={t} t0={11.1} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

const S7: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/great-smoky-mountains-trip-pack.jpg"
      photoH={720}
      spec="PLANNING GUIDE + 10 GPX DAY HIKES"
      name={
        <>
          Great Smoky
          <br />
          Mountains
          <br />
          Trip Pack
        </>
      }
      nameSize={82}
      price="$19.99"
      save="Save this before your Smokies trip"
    />
  );
};

export const V181: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.18} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.1} to={4.68} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.1} />
    </Scene>
    <Scene from={4.6} to={6.68} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.6} />
    </Scene>
    <Scene from={6.6} to={8.68} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={6.6} />
    </Scene>
    <Scene from={8.6} to={10.98} fadeIn={0.06} fadeOut={0.08}>
      <S5 off={8.6} />
    </Scene>
    <Scene from={10.9} to={12.38} fadeIn={0.06} fadeOut={0.1}>
      <S6 off={10.9} />
    </Scene>
    <Scene from={12.3} to={16.6} fadeOut={0}>
      <S7 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.1, 1600],
        [3.1, 4.6, 1600],
        [4.6, 6.6, 1600],
        [6.6, 8.6, 1600],
        [8.6, 10.9, 1600],
        [10.9, 12.3, 1600],
      ]}
    />
  </AbsoluteFill>
);
