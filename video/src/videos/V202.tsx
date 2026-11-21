// V202: "6 AM. Still dark. Road first." Short format (15.4 s, 44 words), cinematic C01 style, winter pre-dawn.
// Product: After Dark Set — Motion-Sensor Headlamp + LED Reflective Vest, $35.99 (live Shopify). End card: real store cover, cut out.
// Advice (standard pedestrian guidance, no numbers): headlamp on before you leave the car, a light on your back for the road walk.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { WinterBackdrop, SNOW, SNOW2 } from "../winter";
import vo from "../vo/v202.json";

const words = vo.words as unknown as Word[];

// Pre-dawn: full dark above, the faintest blue on the horizon.
const NIGHT: Sky = { top: "#0a1226", mid: "#1d2a4a", low: "#4f5a80", sun: [820, 1500], sunR: 1, sunCol: "#4f5a80", glow: "#4f5a80" };
const NEON = "#a6e22e";
const NEON2 = "#86bf1c";

const SAM: Outfit = {
  ...GUIDE,
  skin: "#E6B08C",
  skinShade: "#C68F6C",
  hair: "#5a3420",
  ponytail: "#5a3420",
  beard: null,
  cap: "#2a2f3a",
  capShade: "#1d2129",
  jacket: "#26303c",
  jacketShade: "#1b222b",
  pants: "#2c2f36",
  pantsShade: "#202328",
  boot: "#4a3628",
  sole: "#1c1814",
  pack: "#384452",
  packShade: "#28313b",
  glove: "#1c1f24",
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

// ============ S1 HOOK MEDIUM: Nora sets off from the parked car, full dark, phone light (0 - 2.39) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.04, 1.1, t / 2.39), rot: hh.rot };
  const g = 1440;
  const ph = t * 3.2;
  const p: HikerProps = { x: 700 + t * 30, y: g + 30, scale: 2.3, phase: ph, walk: 0.6, lean: 0.05, poles: false, handOverride: [64, 70], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="a" treeY={g - 160} t={t} snow={0.7} mid="#3e4862" />
      <Night k={0.4} />
      <Plane cam={cam} depth={1}>
        <Road y={g} shift={0} />
        <Svg>
          <Car x={-60} y={g + 250} s={2.2} body="#5d6670" shade="#434a52" />
        </Svg>
        <Subject rimX={3} col="rgba(150,170,210,0.4)">
          <Person {...p} outfit={SAM} expression="neutral" />
          <PhoneDot p={p} />
        </Subject>
      </Plane>
      <Night k={0.1} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0b1018" side="right" />
      </Plane>
      <Particles seed={2021} n={16} col="#dfe6f0" fall={10} />
      <LowScrim />
      <Grade sunX={0} sunY={1400} warm="200,190,170" cool="20,30,70" vignette={0.65} />
      <Title text={"6 AM.\nStill dark.\nRoad first."} t={t} t0={0} top={110} size={124} />
      <Chip text="Goal: summit at sunrise" t={t} t0={0.9} x={60} y={600} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: the road walk, a car comes up behind her, she is almost invisible (2.39 - 4.75) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35, lt > 1.4 && lt < 1.9 ? 0.8 : 0);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.36), rot: hh.rot };
  const g = 1280;
  const ph = t * 3.2;
  const p: HikerProps = { x: 640, y: g + 20, scale: 1.4, phase: ph, walk: 0.6, lean: 0.05, poles: false, handOverride: [64, 70] };
  const cx = mix(-900, 1500, at(lt, [0.2, 2.3], [0, 1], (x) => x));
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
      <Glow x={cx + 300} y={g + 100} r={420} k={at(lt, [0.2, 1.0, 2.2], [0.3, 0.9, 0.6])} />
      <Particles seed={2022} n={18} col="#dfe6f0" fall={8} />
      <LowScrim />
      <Grade sunX={900} sunY={1500} warm="220,210,190" cool="20,30,70" vignette={0.6} />
      <Chip text="6:00 AM, full dark" t={t} t0={2.6} x={60} y={200} icon="none" big />
      <Chip text="Road walk to the trailhead" t={t} t0={3.9} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: gloved hand, small phone torch, dark sleeve; headlights flare (4.75 - 6.69) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.94), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="c" treeY={1100} blur={14} t={t} snow={0.7} mid="#3e4862" />
      <Night k={0.5} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,240,210,0.4)">
          <Svg>
            <path d="M-60,1920 L-60,1280 Q120,1120 380,1060 L520,1180 Q300,1320 220,1920 Z" fill={SAM.jacket} />
            <path d="M-60,1500 Q100,1340 300,1260 L330,1300 Q160,1400 60,1920 L-60,1920 Z" fill={SAM.jacketShade} />
            <path d="M330,1040 L560,1000 L600,1180 L400,1220 Z" fill="#2a2d33" />
            <g transform="rotate(-18 640 880)">
              <rect x={520} y={560} width={250} height={500} rx={34} fill="#141518" />
              <rect x={548} y={590} width={90} height={150} rx={20} fill="#26282c" />
              <circle cx={575} cy={625} r={20} fill="#0a0a0c" />
              <circle cx={575} cy={690} r={20} fill="#0a0a0c" />
              <circle cx={615} cy={655} r={11} fill="#fffbe8" />
            </g>
            <path d="M470,980 Q460,860 540,840 L640,900 Q700,960 660,1060 Q600,1130 500,1110 Q460,1060 470,980 Z" fill={SAM.glove ?? "#1a1c20"} />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={640 + i * 6} y={880 + i * 56} width={110} height={46} rx={22} fill={SAM.glove ?? "#1a1c20"} transform={`rotate(-18 640 880)`} />
            ))}
          </Svg>
        </Subject>
      </Plane>
      <Glow x={560} y={640} r={90} k={0.8} />
      <Glow x={1120} y={820} r={520} k={at(lt, [0.3, 1.6], [0.15, 0.75])} />
      <Particles seed={2023} n={18} col="#e6edf5" fall={8} />
      <LowScrim />
      <Grade sunX={1000} sunY={900} warm="230,220,200" cool="20,30,70" vignette={0.6} />
      <Chip text="Only a phone light" t={t} t0={4.9} x={60} y={200} icon="x" big />
      <Chip text="Dark jacket, dark road" t={t} t0={5.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the rule. At the open car door, headlamp on before she steps off (6.69 - 9.25) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.56), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 640, y: g + 30, scale: 2.4, walk: 0, lean: 0.0, poles: false, handOverride: [40, -70], breathe: Math.sin(t * 2) * 1.4 };
  const on = at(t, [7.25, 7.45], [0, 1]);
  const lp = lampPos(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="d" treeY={g - 160} t={t} snow={0.7} mid="#3e4862" />
      <Night k={0.4} />
      <Plane cam={cam} depth={1}>
        <Road y={g} shift={0} />
        <Svg>
          <Car x={40} y={g + 250} s={2.3} body="#5d6670" shade="#434a52" />
        </Svg>
        {on > 0 && <Beam from={lp} to={[lp[0] + 380, g + 10]} w={160} k={on} />}
        <Subject rimX={4} col={`rgba(255,240,200,${0.3 + 0.4 * on})`}>
          <Person {...p} outfit={SAM} expression={on > 0.5 ? "happy" : "neutral"} />
          <HeadLamp p={p} on={on} />
        </Subject>
      </Plane>
      <Glow x={lp[0]} y={lp[1]} r={120} k={0.8 * on} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0b1018" side="left" />
      </Plane>
      <Particles seed={2024} n={16} col="#dfe6f0" fall={10} />
      <LowScrim />
      <Grade sunX={lp[0]} sunY={lp[1]} warm="230,220,190" cool="20,30,70" vignette={0.6} />
      <Chip text="The rule" t={t} t0={6.8} x={60} y={200} icon="none" big />
      <Chip text="Headlamp on at the car" t={t} t0={7.3} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// Back close-up: LED harness over the dark jacket, red light blinking between the shoulders.
const BackVest: React.FC<{ t: number }> = ({ t }) => {
  const strip = "rgb(246,248,240)";
  const blink = Math.sin(t * 9) > -0.3 ? 1 : 0.3;
  return (
    <g>
      <path d="M90,620 Q120,470 330,430 L750,430 Q960,470 990,620 L1040,1920 L40,1920 Z" fill={SAM.jacket} />
      <path d="M90,620 Q60,900 70,1920 L190,1920 Q170,1100 220,720 Z" fill={SAM.jacketShade} />
      <path d="M990,620 Q1020,900 1010,1920 L890,1920 Q910,1100 860,720 Z" fill={SAM.jacketShade} />
      {/* neck, hair and ponytail from behind */}
      <path d="M470,240 L610,240 L640,450 Q540,475 440,450 Z" fill={SAM.skinShade} />
      <ellipse cx={540} cy={130} rx={165} ry={180} fill={SAM.hair} />
      <path d="M375,110 Q380,-60 540,-62 Q700,-60 705,110 Q540,80 375,110 Z" fill={SAM.cap} />
      <path d="M360,112 Q540,80 720,112 L716,132 Q540,104 364,132 Z" fill={SAM.capShade} />
      <path d="M515,250 Q480,360 540,440 Q600,360 565,250 Z" fill={SAM.hair} />
      <path d="M440,220 Q540,250 640,220" stroke={SAM.capShade} strokeWidth={6} fill="none" opacity={0.5} />
      <path d="M360,410 Q540,460 720,410 L730,480 Q540,520 350,480 Z" fill="#20262e" />
      {/* X harness across the back */}
      <path d="M250,450 L360,450 L830,1330 L720,1330 Z" fill={NEON} />
      <path d="M720,450 L830,450 L360,1330 L250,1330 Z" fill={NEON} />
      <path d="M290,450 L320,450 L790,1330 L760,1330 Z" fill={strip} />
      <path d="M760,450 L790,450 L320,1330 L290,1330 Z" fill={strip} />
      <rect x={30} y={1330} width={1020} height={90} fill={NEON} />
      <rect x={30} y={1358} width={1020} height={34} fill={strip} />
      {/* red LED unit at the cross */}
      <rect x={470} y={820} width={140} height={150} rx={30} fill="#2a2d30" stroke={NEON2} strokeWidth={6} />
      <circle cx={540} cy={895} r={44} fill="#ff2a2a" opacity={blink} />
      <ellipse cx={540} cy={895} rx={230} ry={230} fill="#ff3030" opacity={0.2 * blink} />
    </g>
  );
};

// ============ S5 CLOSE-UP: from behind, the light on her back as headlights come up (9.25 - 10.88) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.63), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="e" treeY={1100} blur={14} t={t} snow={0.7} mid="#3e4862" />
      <Night k={0.5} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,240,210,0.55)">
          <Svg>
            <g transform="translate(0,300) scale(1,0.9)">
              <BackVest t={t} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Glow x={980} y={300} r={360} k={0.5} />
      <Particles seed={2025} n={16} col="#e6edf5" fall={8} />
      <LowScrim />
      <Grade sunX={1000} sunY={400} warm="230,220,200" cool="20,30,70" vignette={0.55} />
      <Chip text="A light on your back" t={t} t0={9.5} x={60} y={200} icon="check" big />
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
      save="Save this for dark mornings"
    />
  );
};

export const V202: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.47} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.39} to={4.83} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.39} />
    </Scene>
    <Scene from={4.75} to={6.77} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.75} />
    </Scene>
    <Scene from={6.69} to={9.33} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={6.69} />
    </Scene>
    <Scene from={9.25} to={10.98} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.25} />
    </Scene>
    <Scene from={10.88} to={15.4} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.39, 1600],
        [2.39, 6.69, 1600],
        [6.69, 10.88, 1600],
      ]}
    />
  </AbsoluteFill>
);
