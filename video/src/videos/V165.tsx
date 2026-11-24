// V165: "Her headlamp shines forward. Cars come from behind." Short format (16.8 s, 43 words), cinematic C01 style, pre-dawn road.
// Product: LED Reflective Vest — Hi-Vis Harness with Red Lights Front and Back, Adjustable, $24.99 (live Shopify). End card: real studio photo, cut out.
// Advice (standard pedestrian guidance, no numbers): a headlamp lights the way ahead but does not make you visible from behind;
// wear lights and reflective straps on front and back. Parts from V201 (road, car, headlamp) and V160 (chest close-up).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { WinterBackdrop, SNOW, SNOW2 } from "../winter";
import vo from "../vo/v165.json";

const words = vo.words as unknown as Word[];

const PREDAWN: Sky = { top: "#101a34", mid: "#2b3760", low: "#7a6478", sun: [900, 1500], sunR: 1, sunCol: "#7a6478", glow: "#8a6a78" };
const NEON = "#a6e22e";
const NEON2 = "#86bf1c";

const JESS: Outfit = {
  ...GUIDE,
  skin: "#E8B996",
  skinShade: "#C99877",
  hair: "#3a2418",
  ponytail: "#3a2418",
  beard: null,
  cap: "#2a2530",
  capShade: "#1d1a22",
  jacket: "#33293a",
  jacketShade: "#251e2b",
  pants: "#2b2d33",
  pantsShade: "#202227",
  boot: "#4a3a2e",
  sole: "#1d1916",
  pack: "#2e3238",
  packShade: "#22252a",
  glove: "#222026",
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

// Front close-up of a chest in a dark jacket wearing the LED harness. lit = reflective strips catching light,
// led = red LEDs on (blink), clip = 0..1 the belt buckle closing.
const ChestVest: React.FC<{ lit: number; led: number; clip: number; t: number }> = ({ lit, led, clip, t }) => {
  const strip = `rgb(${mix(158, 250, lit)},${mix(164, 252, lit)},${mix(168, 245, lit)})`;
  const blink = led > 0 ? (Math.sin(t * 9) > -0.3 ? 1 : 0.35) * led : 0;
  const bx = mix(140, 0, clip);
  return (
    <g>
      {/* jacket torso, arms at the sides */}
      <path d="M90,620 Q120,470 330,430 L750,430 Q960,470 990,620 L1040,1920 L40,1920 Z" fill={JESS.jacket} />
      <path d="M90,620 Q60,900 70,1920 L190,1920 Q170,1100 220,720 Z" fill={JESS.jacketShade} />
      <path d="M990,620 Q1020,900 1010,1920 L890,1920 Q910,1100 860,720 Z" fill={JESS.jacketShade} />
      <line x1={540} y1={470} x2={540} y2={1920} stroke="#161b23" strokeWidth={8} />
      {/* chin and neck gaiter at the top edge */}
      <path d="M410,-300 L670,-300 L700,470 Q540,510 380,470 Z" fill="#4a5568" />
      <path d="M690,-300 Q760,100 720,420 Q700,520 650,560 Q720,420 690,120 Z" fill={JESS.hair} />
      <path d="M350,400 Q540,450 730,400" stroke="#3a4352" strokeWidth={10} fill="none" />
      {/* shoulder straps to the Y panel */}
      <path d="M250,450 L360,450 L560,900 L470,960 Z" fill={NEON} />
      <path d="M720,450 L830,450 L610,960 L520,900 Z" fill={NEON} />
      <path d="M285,450 L320,450 L520,905 L500,920 Z" fill={strip} />
      <path d="M760,450 L795,450 L580,920 L560,905 Z" fill={strip} />
      {/* slider buckle on the right strap */}
      <rect x={700} y={600} width={70} height={26} rx={6} fill="#1c1f22" transform="rotate(-62 735 613)" />
      {/* Y panel with the LEDs */}
      <path d="M460,880 L620,880 L600,1330 Q540,1360 480,1330 Z" fill={NEON} stroke={NEON2} strokeWidth={6} />
      {[960, 1040, 1120, 1200].map((yy) => (
        <g key={yy}>
          <circle cx={540} cy={yy} r={18} fill="#e9eee0" stroke="#8a9a6a" strokeWidth={3} />
          {blink > 0 && <circle cx={540} cy={yy} r={18} fill="#ff2a2a" opacity={blink} />}
        </g>
      ))}
      <circle cx={540} cy={1280} r={14} fill="none" stroke="#2a3a20" strokeWidth={4} />
      {/* waist belt with two clip buckles */}
      <rect x={30} y={1330} width={1020} height={90} fill={NEON} />
      <rect x={30} y={1358} width={1020} height={34} fill={strip} />
      <g transform={`translate(${-bx},0)`}>
        <path d="M380,1320 l40,55 l-40,55 h30 l30,-40 l30,40 h30 l-40,-55 l40,-55 h-30 l-30,40 l-30,-40 Z" fill="#141618" />
      </g>
      <path d="M640,1320 l40,55 l-40,55 h30 l30,-40 l30,40 h30 l-40,-55 l40,-55 h-30 l-30,40 l-30,-40 Z" fill="#141618" />
      {/* gloved hands closing the left buckle */}
      {clip < 1 && (
        <g opacity={1 - at(clip, [0.85, 1], [0, 1])} transform={`translate(${-bx},0)`}>
          <ellipse cx={330} cy={1395} rx={80} ry={60} fill={JESS.glove ?? "#222"} />
          <ellipse cx={540} cy={1395} rx={80} ry={60} fill={JESS.glove ?? "#222"} transform={`translate(${bx},0)`} />
        </g>
      )}
      {/* red light glow halo */}
      {blink > 0 && <ellipse cx={540} cy={1080} rx={170} ry={240} fill="#ff3030" opacity={0.18 * blink} />}
    </g>
  );
};


// Red LED on the back of the harness (hiker local coords), seen from behind as a blinking dot between the shoulders.
const BackLed: React.FC<{ p: HikerProps; t: number; k?: number }> = ({ p, t, k = 1 }) => {
  const g = hikerGeometry(p);
  const [sx, sy] = g.sh;
  const [hx, hy] = g.hip;
  const blink = Math.sin(t * 9) > -0.3 ? 1 : 0.35;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      <circle cx={(sx + hx) / 2 - 22} cy={(sy + hy) / 2 - 6} r={7} fill="#ff2a2a" opacity={blink} />
      <circle cx={(sx + hx) / 2 - 22} cy={(sy + hy) / 2 - 6} r={18} fill="#ff2a2a" opacity={0.25 * blink} />
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Jess on the road shoulder before sunrise, headlamp beam ahead (0 - 2.93) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.04, 1.1, t / 2.93), rot: hh.rot };
  const g = 1440;
  const ph = t * 3.2;
  const p: HikerProps = { x: 420 + t * 30, y: g + 30, scale: 2.3, phase: ph, walk: 0.6, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.6), breathe: Math.sin(t * 2.2) * 1.5 };
  const lp = lampPos(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={PREDAWN} uid="a" treeY={g - 160} t={t} snow={0.7} mid="#3e4862" />
      <Night k={0.35} />
      <Plane cam={cam} depth={1}>
        <Road y={g} shift={0} />
        <Beam from={lp} to={[lp[0] + 460, g + 10]} w={170} k={1} />
        <Subject rimX={3} col="rgba(150,170,210,0.4)">
          <Person {...p} outfit={JESS} expression="neutral" />
          <HeadLamp p={p} on={1} />
        </Subject>
      </Plane>
      <Glow x={lp[0]} y={lp[1]} r={110} k={0.8} />
      <Night k={0.08} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0b1018" side="left" />
      </Plane>
      <Particles seed={1651} n={16} col="#dfe6f0" fall={10} />
      <LowScrim />
      <Grade sunX={lp[0]} sunY={lp[1]} warm="220,205,190" cool="20,30,70" vignette={0.65} />
      <Title text={"Her headlamp\nshines forward.\nCars come\nfrom behind."} t={t} t0={0} top={100} size={104} />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: a car comes up behind her; from behind she is a dark shape (2.93 - 7.24) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35, lt > 2.6 && lt < 3.2 ? 0.8 : 0);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.0, 1.07, lt / 4.3), rot: hh.rot };
  const g = 1280;
  const ph = t * 3.2;
  const p: HikerProps = { x: 700, y: g + 20, scale: 1.4, phase: ph, walk: 0.6, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.6) };
  const lp = lampPos(p);
  const cx = mix(-1400, 700, at(lt, [0.3, 4.3], [0, 1], (x) => x));
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={PREDAWN} uid="b" treeY={g - 120} t={t} snow={0.7} mid="#3e4862" blur={2} />
      <Night k={0.42} />
      <Plane cam={cam} depth={1}>
        <Road y={g} shift={0} />
        <Beam from={lp} to={[lp[0] + 300, g + 10]} w={110} k={0.9} />
        <Subject rimX={2} col="rgba(150,170,210,0.25)">
          <Person {...p} outfit={JESS} expression="neutral" />
          <HeadLamp p={p} on={1} />
        </Subject>
        <Svg>
          <Car x={cx} y={g + 230} s={2.3} body="#8d949c" shade="#62686f" lights />
        </Svg>
      </Plane>
      <Glow x={cx + 300} y={g + 100} r={420} k={at(lt, [0.4, 1.6, 4.0], [0.3, 0.9, 0.6])} />
      <Particles seed={1652} n={18} col="#dfe6f0" fall={8} />
      <LowScrim />
      <Grade sunX={900} sunY={1500} warm="220,210,190" cool="20,30,70" vignette={0.6} />
      <Chip text="Light ahead only" t={t} t0={3.6} x={60} y={200} icon="x" big />
      <Chip text="Dark from behind" t={t} t0={5.4} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the fix, the harness clips on, strips shine, red lights on (7.24 - 10.0) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y + mix(-20, 20, lt / 2.8), zoom: mix(1.0, 1.06, lt / 2.8), rot: hh.rot };
  const clip = at(t, [7.3, 8.0], [0, 1]);
  const led = at(t, [8.5, 8.7], [0, 1]);
  const lit = at(t, [8.9, 9.4], [0.15, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={PREDAWN} uid="c" treeY={1100} blur={14} t={t} snow={0.7} mid="#3e4862" />
      <Night k={0.5} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,240,210,0.55)">
          <Svg>
            <g transform="translate(0,260) scale(1,0.92)">
              <ChestVest lit={lit} led={led} clip={clip} t={t} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Glow x={1180} y={900} r={480} k={at(t, [8.8, 9.4], [0, 0.7])} />
      <Particles seed={1653} n={18} col="#e6edf5" fall={8} />
      <LowScrim />
      <Grade sunX={1000} sunY={900} warm="230,220,200" cool="20,30,70" vignette={0.55} />
      <Chip text="The fix" t={t} t0={7.3} x={60} y={170} icon="none" big />
      <Chip text="Visible from every side" t={t} t0={8.0} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: walking on, red light blinking on her back, the car's lights catch the straps (10.0 - 12.62) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.6), rot: hh.rot };
  const g = 1440;
  const ph = t * 3.2;
  const p: HikerProps = { x: 560 + lt * 30, y: g + 30, scale: 2.4, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  const lp = lampPos(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={PREDAWN} uid="d" treeY={g - 160} t={t} snow={0.7} mid="#3e4862" />
      <Night k={0.36} />
      <Plane cam={cam} depth={1}>
        <Road y={g} shift={0} />
        <Beam from={lp} to={[lp[0] + 420, g + 10]} w={170} k={1} />
        <Subject rimX={-4} col="rgba(255,240,200,0.65)">
          <Person {...p} outfit={JESS} expression="happy" />
          <VestOn p={p} t={t} />
          <BackLed p={p} t={t} />
          <HeadLamp p={p} on={1} />
        </Subject>
      </Plane>
      <Glow x={-80} y={g - 40} r={360} k={0.7} />
      <Glow x={lp[0]} y={lp[1]} r={110} k={0.8} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0b1018" side="right" />
      </Plane>
      <Particles seed={1654} n={16} col="#dfe6f0" fall={10} />
      <LowScrim />
      <Grade sunX={200} sunY={1300} warm="235,220,195" cool="20,30,70" vignette={0.6} />
      <Chip text="Red lights front and back" t={t} t0={10.3} x={60} y={170} icon="check" big />
      <Chip text="Reflective straps" t={t} t0={11.2} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/led-reflective-vest-cut.png"
      spec="RED LEDS FRONT AND BACK · ADJUSTABLE"
      name={
        <>
          LED Reflective
          <br />
          Vest
        </>
      }
      nameSize={96}
      price="$24.99"
      save="Save this before your next early start"
    />
  );
};

export const V165: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.01} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.93} to={7.32} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.93} />
    </Scene>
    <Scene from={7.24} to={10.08} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={7.24} />
    </Scene>
    <Scene from={10.0} to={12.72} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={10.0} />
    </Scene>
    <Scene from={12.62} to={16.8} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.93, 1600],
        [2.93, 7.24, 1600],
        [7.24, 10.0, 1600],
        [10.0, 12.62, 1600],
      ]}
    />
  </AbsoluteFill>
);
