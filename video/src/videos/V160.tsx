// V160: "Last mile on the road. Nobody sees her." Short format (16 s, 40 words), cinematic C01 style.
// Product: LED Reflective Vest — Hi-Vis Harness with Red Lights Front and Back, Adjustable, $24.99 (live Shopify, Neon Green).
// Advice (conservative, standard pedestrian guidance): where there is no sidewalk, walk facing traffic, carry a light and
// wear reflective gear. End card = real Shopify main photo, cut out (our studio photo, peach background removed).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { WinterBackdrop, SNOW, SNOW2 } from "../winter";
import vo from "../vo/v160.json";

const words = vo.words as unknown as Word[];

const DUSKNIGHT: Sky = { top: "#0f1830", mid: "#273556", low: "#5a5f7a", sun: [820, 1500], sunR: 1, sunCol: "#5a5f7a", glow: "#5a5f7a" };
const NEON = "#a6e22e";
const NEON2 = "#86bf1c";

const NORA: Outfit = {
  ...GUIDE,
  skin: "#F1C6A6",
  skinShade: "#D3A383",
  hair: "#7a4a2a",
  ponytail: "#7a4a2a",
  beard: null,
  cap: "#2a2f38",
  capShade: "#1d2128",
  jacket: "#2b3340",
  jacketShade: "#1f2530",
  pants: "#2e3138",
  pantsShade: "#22252a",
  boot: "#4a3a2e",
  sole: "#1d1916",
  pack: "#363c44",
  packShade: "#272b31",
  glove: "#24272c",
};

const Night: React.FC<{ k: number }> = ({ k }) => <AbsoluteFill style={{ background: `rgba(6,10,24,${k})` }} />;

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(6,10,20,0) 0%, rgba(6,10,20,0.5) 45%, rgba(6,10,20,0.5) 70%, rgba(6,10,20,0) 100%)" }} />
);

// Country road in perspective-free side view: snow bank, asphalt, white edge line (screen coords, y = road edge).
const Road: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <rect x={-300} y={y - 40} width={1700} height={60} fill={SNOW2} />
    {Array.from({ length: 10 }, (_, i) => (
      <ellipse key={i} cx={-200 + i * 160 + ((i * 41) % 60)} cy={y - 40} rx={110} ry={30} fill={i % 2 ? SNOW : SNOW2} />
    ))}
    <rect x={-300} y={y} width={1700} height={900} fill="#2b2e33" />
    <rect x={-300} y={y + 26} width={1700} height={10} fill="#d8d8d0" opacity={0.8} />
    {Array.from({ length: 8 }, (_, i) => {
      const x = ((i * 300 - shift) % 2400 + 2400) % 2400 - 400;
      return <rect key={i} x={x} y={y + 330} width={160} height={14} fill="#d9b54a" opacity={0.7} />;
    })}
  </Svg>
);

// Headlight glow from a vehicle (screen coords).
const Glow: React.FC<{ x: number; y: number; r: number; k: number; col?: string }> = ({ x, y, r, k, col = "255,246,214" }) =>
  k <= 0 ? null : (
    <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: "50%", background: `radial-gradient(circle, rgba(${col},${0.95 * k}) 0%, rgba(${col},${0.35 * k}) 35%, rgba(${col},0) 70%)` }} />
    </AbsoluteFill>
  );

// Big box truck, side view, facing left (local units, wheels on y = 0, about 1500 wide).
const Truck: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={260} y={-560} width={1240} height={480} rx={10} fill="#9aa2aa" />
    <rect x={260} y={-120} width={1240} height={40} fill="#555b61" />
    <path d="M0,-80 L0,-330 Q0,-380 40,-400 L180,-470 Q200,-480 230,-480 L270,-480 L270,-80 Z" fill="#8a2f2a" />
    <path d="M40,-340 L150,-440 L230,-440 L230,-340 Z" fill="#1b2230" />
    <rect x={-10} y={-150} width={60} height={30} rx={8} fill="#fff6d0" />
    {[150, 1150, 1360].map((wx) => (
      <g key={wx}>
        <circle cx={wx} cy={-40} r={70} fill="#16181b" />
        <circle cx={wx} cy={-40} r={30} fill="#6b7074" />
      </g>
    ))}
  </g>
);

// ============ S1 HOOK MEDIUM: Nora on the dark road shoulder, dark jacket, light behind her (0 - 3.57) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.04, 1.1, t / 3.57), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 470 + t * 30, y: g + 30, scale: 2.3, phase: t * 3.2, walk: 0.6, lean: 0.05, poles: false, handOverride: freeHand(t * 3.2, 0.6), breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSKNIGHT} uid="a" treeY={g - 160} t={t} snow={0.7} mid="#4a5670" />
      <Night k={0.38} />
      <Plane cam={cam} depth={1}>
        <Road y={g} shift={0} />
        <Subject rimX={3} col="rgba(150,170,210,0.45)">
          <Person {...p} outfit={NORA} expression="neutral" noPack={false} />
        </Subject>
      </Plane>
      <Night k={0.12} />
      <Glow x={-60} y={g - 30} r={260} k={at(t, [0.6, 3.4], [0.25, 0.85])} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0e141c" side="right" />
      </Plane>
      <Particles seed={1601} n={16} col="#dfe6f0" fall={10} />
      <LowScrim />
      <Grade sunX={0} sunY={1400} warm="200,190,170" cool="20,30,70" vignette={0.65} />
      <Title text={"Last mile\non the road.\nNobody sees her."} t={t} t0={0} top={110} size={112} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the truck roars past far too close, glare and wind (3.57 - 5.47) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const pass = at(lt, [0.15, 1.5], [0, 1]);
  const hh = handheld(t, 0.5, lt > 0.5 && lt < 1.4 ? 1 : 0);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.9), rot: hh.rot };
  const g = 1700;
  const p: HikerProps = { x: 640, y: g + 260, scale: 4.4, phase: 0, walk: 0, lean: -0.08 * at(lt, [0.4, 0.7], [0, 1]), poles: false, handOverride: [10, 50], breathe: Math.sin(t * 6) * 3 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSKNIGHT} uid="b" treeY={1200} blur={12} t={t} snow={0.7} mid="#4a5670" />
      <Night k={0.45} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col={`rgba(255,240,200,${0.4 + 0.5 * at(lt, [0.3, 0.7, 1.3], [0, 1, 0.2])})`}>
          <Person {...p} outfit={NORA} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.25} blur={3}>
        <Svg>
          <Truck x={mix(1300, -2600, pass)} y={2350} s={1.9} />
        </Svg>
      </Plane>
      <Glow x={mix(1260, -900, pass)} y={1720} r={520} k={at(lt, [0.1, 0.5, 1.2], [0.6, 1, 0.3])} />
      <Particles seed={1602} n={26} col="#e6edf5" fall={4} />
      <LowScrim />
      <Grade sunX={900} sunY={1600} warm="230,220,200" cool="20,30,70" vignette={0.6} />
      <Chip text="Dark jacket, no light" t={t} t0={3.8} x={60} y={200} icon="x" big />
      <Chip text="Far too close" t={t} t0={4.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
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
      <path d="M90,620 Q120,470 330,430 L750,430 Q960,470 990,620 L1040,1920 L40,1920 Z" fill={NORA.jacket} />
      <path d="M90,620 Q60,900 70,1920 L190,1920 Q170,1100 220,720 Z" fill={NORA.jacketShade} />
      <path d="M990,620 Q1020,900 1010,1920 L890,1920 Q910,1100 860,720 Z" fill={NORA.jacketShade} />
      <line x1={540} y1={470} x2={540} y2={1920} stroke="#161b23" strokeWidth={8} />
      {/* chin and neck gaiter at the top edge */}
      <path d="M410,-300 L670,-300 L700,470 Q540,510 380,470 Z" fill="#4a5568" />
      <path d="M690,-300 Q760,100 720,420 Q700,520 650,560 Q720,420 690,120 Z" fill={NORA.hair} />
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
          <ellipse cx={330} cy={1395} rx={80} ry={60} fill={NORA.glove ?? "#222"} />
          <ellipse cx={540} cy={1395} rx={80} ry={60} fill={NORA.glove ?? "#222"} transform={`translate(${bx},0)`} />
        </g>
      )}
      {/* red light glow halo */}
      {blink > 0 && <ellipse cx={540} cy={1080} rx={170} ry={240} fill="#ff3030" opacity={0.18 * blink} />}
    </g>
  );
};

// ============ S3 CLOSE-UP: the fix: harness on, lights on, strips shine in the headlights (5.47 - 11.26) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y + mix(-20, 20, lt / 5.8), zoom: mix(1.0, 1.06, lt / 5.8), rot: hh.rot };
  const clip = at(t, [5.7, 6.5], [0, 1]);
  const led = at(t, [9.7, 9.9], [0, 1]);
  const lit = at(t, [8.6, 9.1, 10.4, 11.0], [0.15, 1, 1, 0.7]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSKNIGHT} uid="c" treeY={1100} blur={14} t={t} snow={0.7} mid="#4a5670" />
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
      <Glow x={1180} y={900} r={480} k={at(t, [8.4, 9.0], [0, 0.7])} />
      <Particles seed={1603} n={18} col="#e6edf5" fall={8} />
      <LowScrim />
      <Grade sunX={1000} sunY={900} warm="230,220,200" cool="20,30,70" vignette={0.55} />
      <Chip text="Walk facing traffic" t={t} t0={6.0} x={60} y={170} icon="check" big />
      <Chip text="Carry a light" t={t} t0={7.3} x={60} y={300} icon="check" big />
      <Chip text="Reflective straps" t={t} t0={8.8} x={60} y={430} icon="check" big />
      <Chip text="Red lights front and back" t={t} t0={9.6} x={60} y={560} icon="check" big />
    </AbsoluteFill>
  );
};

const S4: React.FC = () => {
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
      save="Save this before your next winter hike"
    />
  );
};

export const V160: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.62} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.57} to={5.55} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={3.57} />
    </Scene>
    <Scene from={5.47} to={11.36} fadeIn={0.06} fadeOut={0.12}>
      <S3 off={5.47} />
    </Scene>
    <Scene from={11.26} to={16.0} fadeOut={0}>
      <S4 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.57, 1600],
        [3.57, 5.47, 1600],
        [5.47, 11.26, 1600],
      ]}
    />
  </AbsoluteFill>
);
