// V201: "Longest night. Dark road back." Short format (16.0 s, 41 words), cinematic C01 style, winter solstice evening.
// Product: After Dark Set — Motion-Sensor Headlamp + LED Reflective Vest, $35.99 (live Shopify). End card: real store cover, cut out.
// Advice (standard pedestrian guidance, no numbers): after dark carry a headlamp and wear lights drivers can see.
// Fact: the December solstice in 2026 falls on December 21 (longest night of the year in the Northern Hemisphere).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { WinterBackdrop, SNOW, SNOW2 } from "../winter";
import vo from "../vo/v201.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#0b1328", mid: "#1f2c4a", low: "#4a5272", sun: [820, 1500], sunR: 1, sunCol: "#4a5272", glow: "#4a5272" };
const NEON = "#a6e22e";
const NEON2 = "#86bf1c";

const SAM: Outfit = {
  ...JAKE,
  skin: "#C99272",
  skinShade: "#A87556",
  hair: "#2a1d14",
  beard: "#2a1d14",
  cap: "#1c1f24",
  capShade: "#131518",
  jacket: "#1e2126",
  jacketShade: "#15171b",
  pants: "#2a2d33",
  pantsShade: "#1f2126",
  boot: "#3a3028",
  sole: "#1a1714",
  pack: "#2a2e34",
  packShade: "#1e2125",
  glove: "#1a1c20",
};

const Night: React.FC<{ k: number }> = ({ k }) => <AbsoluteFill style={{ background: `rgba(5,8,20,${k})` }} />;

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(6,10,20,0) 0%, rgba(6,10,20,0.5) 45%, rgba(6,10,20,0.5) 70%, rgba(6,10,20,0) 100%)" }} />
);

// Snowy roadside, asphalt and edge line (screen coords, y = road edge).
const Road: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <rect x={-300} y={y - 40} width={1700} height={60} fill={SNOW2} />
    {Array.from({ length: 10 }, (_, i) => (
      <ellipse key={i} cx={-200 + i * 160 + ((i * 41) % 60)} cy={y - 40} rx={110} ry={30} fill={i % 2 ? SNOW : SNOW2} />
    ))}
    <rect x={-300} y={y} width={1700} height={900} fill="#26292e" />
    <rect x={-300} y={y + 26} width={1700} height={10} fill="#d8d8d0" opacity={0.7} />
    {Array.from({ length: 8 }, (_, i) => {
      const x = ((i * 300 - shift) % 2400 + 2400) % 2400 - 400;
      return <rect key={i} x={x} y={y + 330} width={160} height={14} fill="#d9b54a" opacity={0.6} />;
    })}
  </Svg>
);

const Glow: React.FC<{ x: number; y: number; r: number; k: number; col?: string }> = ({ x, y, r, k, col = "255,246,214" }) =>
  k <= 0 ? null : (
    <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: "50%", background: `radial-gradient(circle, rgba(${col},${0.95 * k}) 0%, rgba(${col},${0.35 * k}) 35%, rgba(${col},0) 70%)` }} />
    </AbsoluteFill>
  );

// Small phone torch dot in the front hand (hiker local coords).
const PhoneDot: React.FC<{ p: HikerProps; k?: number }> = ({ p, k = 1 }) => {
  const g = hikerGeometry(p);
  const [hx, hy] = g.arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <rect x={hx - 4} y={hy - 18} width={12} height={22} rx={3} fill="#111" />
      <circle cx={hx + 6} cy={hy - 12} r={5} fill="#fffbe6" opacity={k} />
      <path d={`M${hx + 8},${hy - 12} L${hx + 120},${hy + 40} L${hx + 70},${hy + 70} Z`} fill={`rgba(255,250,220,${0.12 * k})`} />
    </g>
  );
};

const HeadLamp: React.FC<{ p: HikerProps; on: number }> = ({ p, on }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${hx - 26},${hy - 12} Q${hx},${hy - 6} ${hx + 24},${hy - 14}`} stroke="#1d2024" strokeWidth={6} fill="none" />
      <rect x={hx + 12} y={hy - 24} width={22} height={15} rx={4} fill="#1d2024" />
      <rect x={hx + 14} y={hy - 21} width={16} height={4} rx={2} fill="#f2e04a" />
      <circle cx={hx + 34} cy={hy - 16} r={10} fill="#fff6c8" opacity={0.85 * on} />
    </g>
  );
};

const Beam: React.FC<{ from: [number, number]; to: [number, number]; w: number; k?: number }> = ({ from, to, w, k = 1 }) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const L = Math.hypot(dx, dy);
  const nx = -dy / L;
  const ny = dx / L;
  return (
    <Svg>
      <path d={`M${from[0]},${from[1]} L${to[0] + nx * w},${to[1] + ny * w} L${to[0] - nx * w},${to[1] - ny * w} Z`} fill={`rgba(255,246,200,${0.2 * k})`} />
      <ellipse cx={to[0]} cy={to[1]} rx={w * 1.1} ry={w * 0.35} fill={`rgba(255,246,200,${0.3 * k})`} />
    </Svg>
  );
};

const lampPos = (p: HikerProps): [number, number] => {
  const [hx, hy] = hikerGeometry(p).head;
  const s = p.scale ?? 1;
  return [p.x + (hx + 34) * s, p.y + (hy - 16 - 182) * s];
};

// Simple LED harness over the dark jacket (hiker local coords), drawn on the chest.
const VestOn: React.FC<{ p: HikerProps; t: number }> = ({ p, t }) => {
  const g = hikerGeometry(p);
  const [sx, sy] = g.sh;
  const [hx, hy] = g.hip;
  const blink = Math.sin(t * 9) > -0.3 ? 1 : 0.35;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${sx - 14},${sy + 4} L${hx + 8},${hy - 20}`} stroke={NEON} strokeWidth={9} />
      <path d={`M${sx + 14},${sy + 4} L${hx + 16},${hy - 20}`} stroke={NEON} strokeWidth={9} />
      <path d={`M${hx - 18},${hy - 16} L${hx + 34},${hy - 16}`} stroke={NEON} strokeWidth={10} />
      <circle cx={(sx + hx) / 2 + 14} cy={(sy + hy) / 2} r={5} fill="#ff2a2a" opacity={blink} />
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Sam on the dark road shoulder, black jacket, phone light (0 - 3.35) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.04, 1.1, t / 3.35), rot: hh.rot };
  const g = 1440;
  const ph = t * 3.2;
  const p: HikerProps = { x: 470 + t * 30, y: g + 30, scale: 2.3, phase: ph, walk: 0.6, lean: 0.05, poles: false, handOverride: [64, 70], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="a" treeY={g - 160} t={t} snow={0.7} mid="#3e4862" />
      <Night k={0.4} />
      <Plane cam={cam} depth={1}>
        <Road y={g} shift={0} />
        <Subject rimX={3} col="rgba(150,170,210,0.4)">
          <Person {...p} outfit={SAM} expression="neutral" />
          <PhoneDot p={p} />
        </Subject>
      </Plane>
      <Night k={0.1} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0b1018" side="right" />
      </Plane>
      <Particles seed={2011} n={16} col="#dfe6f0" fall={10} />
      <LowScrim />
      <Grade sunX={0} sunY={1400} warm="200,190,170" cool="20,30,70" vignette={0.65} />
      <Title text={"Longest night.\nDark road\nback."} t={t} t0={0} top={110} size={124} />
      <Chip text="December 21" t={t} t0={0.9} x={60} y={600} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: a car comes up behind him, he is almost invisible (3.35 - 5.95) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35, lt > 1.6 && lt < 2.1 ? 0.8 : 0);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.6), rot: hh.rot };
  const g = 1280;
  const ph = t * 3.2;
  const p: HikerProps = { x: 640, y: g + 20, scale: 1.4, phase: ph, walk: 0.6, lean: 0.05, poles: false, handOverride: [64, 70] };
  const cx = mix(-900, 1500, at(lt, [0.2, 2.5], [0, 1], (x) => x));
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="b" treeY={g - 120} t={t} snow={0.7} mid="#3e4862" blur={2} />
      <Night k={0.42} />
      <Plane cam={cam} depth={1}>
        <Road y={g} shift={0} />
        <Subject rimX={2} col="rgba(150,170,210,0.3)">
          <Person {...p} outfit={SAM} expression="neutral" />
          <PhoneDot p={p} />
        </Subject>
        <Svg>
          <Car x={cx} y={g + 230} s={2.3} body="#8d949c" shade="#62686f" lights />
        </Svg>
      </Plane>
      <Glow x={cx + 300} y={g + 100} r={420} k={at(lt, [0.2, 1.0, 2.4], [0.3, 0.9, 0.6])} />
      <Particles seed={2012} n={18} col="#dfe6f0" fall={8} />
      <LowScrim />
      <Grade sunX={900} sunY={1500} warm="220,210,190" cool="20,30,70" vignette={0.6} />
      <Chip text="After-work walk" t={t} t0={3.5} x={60} y={200} icon="none" big />
      <Chip text="Dark road, no sidewalk" t={t} t0={4.9} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: gloved hand, phone torch, black sleeve; headlights flare (5.95 - 8.58) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.6), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="c" treeY={1100} blur={14} t={t} snow={0.7} mid="#3e4862" />
      <Night k={0.5} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,240,210,0.4)">
          <Svg>
            {/* black jacket sleeve from the lower left */}
            <path d="M-60,1920 L-60,1280 Q120,1120 380,1060 L520,1180 Q300,1320 220,1920 Z" fill={SAM.jacket} />
            <path d="M-60,1500 Q100,1340 300,1260 L330,1300 Q160,1400 60,1920 L-60,1920 Z" fill={SAM.jacketShade} />
            <path d="M330,1040 L560,1000 L600,1180 L400,1220 Z" fill="#2a2d33" />
            {/* phone, back side, torch on */}
            <g transform="rotate(-18 640 880)">
              <rect x={520} y={560} width={250} height={500} rx={34} fill="#141518" />
              <rect x={548} y={590} width={90} height={150} rx={20} fill="#26282c" />
              <circle cx={575} cy={625} r={20} fill="#0a0a0c" />
              <circle cx={575} cy={690} r={20} fill="#0a0a0c" />
              <circle cx={615} cy={655} r={11} fill="#fffbe8" />
            </g>
            {/* gloved hand around the phone */}
            <path d="M470,980 Q460,860 540,840 L640,900 Q700,960 660,1060 Q600,1130 500,1110 Q460,1060 470,980 Z" fill={SAM.glove ?? "#1a1c20"} />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={640 + i * 6} y={880 + i * 56} width={110} height={46} rx={22} fill={SAM.glove ?? "#1a1c20"} transform={`rotate(-18 640 880)`} />
            ))}
          </Svg>
        </Subject>
      </Plane>
      {/* the weak torch glow: small and quickly lost */}
      <Glow x={560} y={640} r={90} k={0.8} />
      <Glow x={1120} y={820} r={520} k={at(lt, [0.4, 2.0], [0.15, 0.75])} />
      <Particles seed={2013} n={18} col="#e6edf5" fall={8} />
      <LowScrim />
      <Grade sunX={1000} sunY={900} warm="230,220,200" cool="20,30,70" vignette={0.6} />
      <Chip text="Phone light in hand" t={t} t0={6.0} x={60} y={200} icon="x" big />
      <Chip text="Black jacket" t={t} t0={7.2} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the rule. Headlamp on, beam on the road shoulder (8.58 - 10.55) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.0), rot: hh.rot };
  const g = 1440;
  const ph = t * 3.2;
  const p: HikerProps = { x: 400 + lt * 40, y: g + 30, scale: 2.4, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  const on = at(t, [9.9, 10.1], [0, 1]);
  const lp = lampPos(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="d" treeY={g - 160} t={t} snow={0.7} mid="#3e4862" />
      <Night k={0.4} />
      <Plane cam={cam} depth={1}>
        <Road y={g} shift={0} />
        {on > 0 && <Beam from={lp} to={[lp[0] + 420, g + 10]} w={170} k={on} />}
        <Subject rimX={4} col={`rgba(255,240,200,${0.3 + 0.4 * on})`}>
          <Person {...p} outfit={SAM} expression="happy" />
          <VestOn p={p} t={t} />
          <HeadLamp p={p} on={on} />
        </Subject>
      </Plane>
      <Glow x={lp[0]} y={lp[1]} r={120} k={0.8 * on} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0b1018" side="left" />
      </Plane>
      <Particles seed={2014} n={16} col="#dfe6f0" fall={10} />
      <LowScrim />
      <Grade sunX={lp[0]} sunY={lp[1]} warm="230,220,190" cool="20,30,70" vignette={0.6} />
      <Chip text="The rule" t={t} t0={8.7} x={60} y={200} icon="none" big />
      <Chip text="Carry a headlamp" t={t} t0={9.94} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// Chest close-up with the LED harness (as in V160), lights on, strips shining.
const ChestVest: React.FC<{ t: number }> = ({ t }) => {
  const strip = "rgb(246,248,240)";
  const blink = Math.sin(t * 9) > -0.3 ? 1 : 0.35;
  return (
    <g>
      <path d="M90,620 Q120,470 330,430 L750,430 Q960,470 990,620 L1040,1920 L40,1920 Z" fill={SAM.jacket} />
      <path d="M90,620 Q60,900 70,1920 L190,1920 Q170,1100 220,720 Z" fill={SAM.jacketShade} />
      <path d="M990,620 Q1020,900 1010,1920 L890,1920 Q910,1100 860,720 Z" fill={SAM.jacketShade} />
      <line x1={540} y1={470} x2={540} y2={1920} stroke="#0e1013" strokeWidth={8} />
      <path d="M420,-300 L660,-300 L690,470 Q540,510 390,470 Z" fill={SAM.skinShade} />
      <ellipse cx={540} cy={-120} rx={250} ry={230} fill={SAM.beard ?? "#2a1d14"} />
      <path d="M380,380 Q540,440 700,380 L720,470 Q540,520 360,470 Z" fill="#2a2f38" />
      <path d="M350,400 Q540,450 730,400" stroke="#2a2f38" strokeWidth={10} fill="none" />
      <path d="M250,450 L360,450 L560,900 L470,960 Z" fill={NEON} />
      <path d="M720,450 L830,450 L610,960 L520,900 Z" fill={NEON} />
      <path d="M285,450 L320,450 L520,905 L500,920 Z" fill={strip} />
      <path d="M760,450 L795,450 L580,920 L560,905 Z" fill={strip} />
      <path d="M460,880 L620,880 L600,1330 Q540,1360 480,1330 Z" fill={NEON} stroke={NEON2} strokeWidth={6} />
      {[960, 1040, 1120, 1200].map((yy) => (
        <g key={yy}>
          <circle cx={540} cy={yy} r={18} fill="#e9eee0" stroke="#8a9a6a" strokeWidth={3} />
          <circle cx={540} cy={yy} r={18} fill="#ff2a2a" opacity={blink} />
        </g>
      ))}
      <rect x={30} y={1330} width={1020} height={90} fill={NEON} />
      <rect x={30} y={1358} width={1020} height={34} fill={strip} />
      <path d="M380,1320 l40,55 l-40,55 h30 l30,-40 l30,40 h30 l-40,-55 l40,-55 h-30 l-30,40 l-30,-40 Z" fill="#141618" />
      <path d="M640,1320 l40,55 l-40,55 h30 l30,-40 l30,40 h30 l-40,-55 l40,-55 h-30 l-30,40 l-30,-40 Z" fill="#141618" />
      <ellipse cx={540} cy={1080} rx={170} ry={240} fill="#ff3030" opacity={0.18 * blink} />
    </g>
  );
};

// ============ S5 CLOSE-UP: lights drivers can see, headlights catch the strips (10.55 - 11.95) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.4), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="e" treeY={1100} blur={14} t={t} snow={0.7} mid="#3e4862" />
      <Night k={0.5} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,240,210,0.55)">
          <Svg>
            <g transform="translate(0,260) scale(1,0.92)">
              <ChestVest t={t} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Glow x={1180} y={900} r={480} k={0.6} />
      <Particles seed={2015} n={16} col="#e6edf5" fall={8} />
      <LowScrim />
      <Grade sunX={1000} sunY={900} warm="230,220,200" cool="20,30,70" vignette={0.55} />
      <Chip text="Lights drivers can see" t={t} t0={10.7} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/after-dark-set-cut.png"
      cutoutH={620}
      spec="MOTION-SENSOR HEADLAMP + LED REFLECTIVE VEST"
      name={
        <>
          After Dark
          <br />
          Set
        </>
      }
      nameSize={108}
      price="$35.99"
      save="Save this for the dark months"
    />
  );
};

export const V201: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.43} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.35} to={6.03} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.35} />
    </Scene>
    <Scene from={5.95} to={8.66} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.95} />
    </Scene>
    <Scene from={8.58} to={10.63} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={8.58} />
    </Scene>
    <Scene from={10.55} to={12.0} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={10.55} />
    </Scene>
    <Scene from={11.9} to={16.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.35, 1600],
        [3.35, 8.58, 1600],
        [8.58, 11.9, 1600],
      ]}
    />
  </AbsoluteFill>
);
