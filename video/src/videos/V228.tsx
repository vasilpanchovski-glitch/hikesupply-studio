// V228: "First snow hike. Trail vanished." Short format (15.6 s, 43 words), cinematic C01 style, fresh snow in the woods.
// Product: Beginner's Hiking Guide, $9.99 (live Shopify), boxed store photo as in V95.
// Advice (plain, conservative): fresh snow can hide a trail you have never walked. For a first winter hike pick a trail you
// already know from summer, and keep it short. No numbers or statistics.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Pine, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, Breath, CLEAR, Subject, Trail } from "../fall";
import { FrostTrail, SNOW, SNOW2, STORM, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v228.json";

const words = vo.words as unknown as Word[];

const PRIYA: Outfit = {
  ...GUIDE,
  skin: "#B97F5E",
  skinShade: "#9A6447",
  hair: "#1b1210",
  beard: null,
  ponytail: "#1b1210",
  cap: "#C2662E",
  capShade: "#9a4f22",
  jacket: "#2F6F8E",
  jacketShade: "#22546c",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#7A3E4E",
  packShade: "#5d2f3b",
  glove: "#2a2a2a",
};
// Summer look: no gloves, light shirt.
const PRIYA_SUMMER: Outfit = { ...PRIYA, jacket: "#5E8C6A", jacketShade: "#476d51", glove: null };

// Paint blaze on a tree trunk (screen coords), optionally half buried in snow.
const BlazeTree: React.FC<{ x: number; y: number; h: number; w?: number; blaze?: boolean; snow?: number }> = ({ x, y, h, w = 70, blaze = true, snow = 0 }) => (
  <g>
    <rect x={x - w / 2} y={y - h} width={w} height={h} fill="#5a4030" />
    <rect x={x - w / 2} y={y - h} width={w * 0.35} height={h} fill="#4a3426" />
    {blaze && <rect x={x - w * 0.22} y={y - h * 0.55} width={w * 0.44} height={w * 0.7} rx={4} fill="#f2f2ee" />}
    {snow > 0 && <path d={`M${x - w / 2 - 6},${y - h} q${w / 2 + 6},-${18 * snow} ${w + 12},0`} fill={SNOW} />}
  </g>
);

// Footprints in the snow behind her, ending where she stands.
const Prints: React.FC<{ x0: number; x1: number; y: number; k?: number }> = ({ x0, x1, y, k = 1 }) => (
  <g opacity={k}>
    {Array.from({ length: 9 }, (_, i) => {
      const x = mix(x0, x1, i / 8);
      return <ellipse key={i} cx={x} cy={y + (i % 2) * 22} rx={26} ry={9} fill="#b9c6cf" />;
    })}
  </g>
);

// ============ S1 HOOK WIDE: Priya sets off on a brand new trail in fresh snow (0 - 2.5) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.04, 1.1, t / 2.5), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.3;
  const p: HikerProps = { x: 380 + t * 50, y: g + 20, scale: 2.3, phase: ph, walk: 1, lean: 0.06, poles: false, breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 200} t={t} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <rect x={-200} y={g - 40} width={1500} height={900} fill={SNOW2} />
          <path d={`M-200,${g - 30} Q540,${g - 60} 1300,${g - 30}`} fill={SNOW} />
          <Prints x0={60} x1={p.x - 40} y={g + 30} />
          {/* trailhead sign */}
          <rect x={860} y={g - 300} width={16} height={320} fill="#5a4030" />
          <rect x={760} y={g - 320} width={240} height={80} rx={8} fill="#6b4a32" />
          <rect x={776} y={g - 306} width={208} height={52} rx={4} fill="#7d5a3e" />
          <path d={`M770,${g - 322} q120,-24 236,0`} fill={SNOW} />
        </Svg>
        <Subject rimX={5} col="rgba(255,240,220,0.85)">
          <Person {...p} outfit={PRIYA} expression="happy" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f3a3a" side="right" />
      </Plane>
      <Particles seed={2281} n={18} col="#ffffff" fall={10} bokeh />
      <Grade sunX={800} sunY={560} warm="245,236,224" cool="30,45,80" vignette={0.5} />
      <Title text={"First snow hike.\nTrail\nvanished."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: she looks around, no path anywhere (2.5 - 4.6) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.02], outExpo), rot: hh.rot };
  const s = 4.4;
  const turn = at(t, [3.3, 3.5, 4.0, 4.2], [0, 1, 1, 0]);
  const p: HikerProps = { x: 520, y: 2420, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [40, 30], breathe: Math.sin(t * 3) * 1 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={1300} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(230,238,250,0.9)">
          <Person {...p} outfit={PRIYA} expression="tired" flip={turn > 0.5} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={2282} n={26} col="#ffffff" fall={22} />
      <Grade sunX={820} sunY={520} warm="220,230,245" cool="30,45,80" vignette={0.6} />
      <Chip text="Brand new trail" t={t} t0={2.6} x={60} y={170} icon="none" big />
      <Chip text="Fresh snow everywhere" t={t} t0={3.4} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: a mile in, the path is gone under the snow (4.6 - 6.41) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: at(lt, [0, 1.0], [1.14, 1.04], outExpo), rot: hh.rot };
  const g = 1480;
  const p: HikerProps = { x: 560, y: g + 20, scale: 2.1, walk: 0, lean: 0.02, poles: false, handOverride: [60, 20], breathe: Math.sin(t * 3) * 1 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g - 220} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <rect x={-200} y={g - 40} width={1500} height={900} fill={SNOW2} />
          <path d={`M-200,${g - 30} Q540,${g - 70} 1300,${g - 30}`} fill={SNOW} />
          <Prints x0={0} x1={500} y={g + 40} />
          <Pine x={150} y={g - 10} h={760} c="#2f5a48" c2="#244a3a" />
          <Pine x={950} y={g - 20} h={840} c="#2f5a48" c2="#244a3a" />
          {/* snow loading on the near pines */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <ellipse cx={150 + (i - 1) * 60} cy={g - 260 - i * 160} rx={70} ry={14} fill={SNOW} />
              <ellipse cx={950 + (i - 1) * 60} cy={g - 280 - i * 170} rx={70} ry={14} fill={SNOW} />
            </g>
          ))}
        </Svg>
        <Subject rimX={5} col="rgba(240,244,250,0.9)">
          <Person {...p} outfit={PRIYA} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Particles seed={2283} n={30} col="#ffffff" fall={26} />
      <Grade sunX={820} sunY={520} warm="220,230,245" cool="30,45,80" vignette={0.55} />
      <Chip text="One mile in" t={t} t0={4.7} x={60} y={170} icon="none" big />
      <Chip text="The path is gone" t={t} t0={5.4} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the rule: a trail you know from summer (summer memory, then the same trail in snow) (6.41 - 9.0) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.6), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.2;
  const p: HikerProps = { x: 420 + lt * 40, y: g + 20, scale: 2.5, phase: ph, walk: 1, lean: 0.05, poles: false, breathe: 0 };
  const snowK = at(t, [7.9, 8.3], [0, 1]);
  return (
    <AbsoluteFill>
      {/* summer */}
      <AbsoluteFill style={{ opacity: 1 - snowK }}>
        <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={g - 200} t={t} mid="#4f6b45" />
        <Plane cam={cam} depth={1}>
          <Trail y={g} grass="#6f8a46" />
          <Svg>
            <BlazeTree x={900} y={g - 10} h={900} />
          </Svg>
          <Subject rimX={5} col="rgba(255,226,170,0.9)">
            <Person {...p} outfit={PRIYA_SUMMER} expression="happy" />
          </Subject>
        </Plane>
        <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.3} />
        <Grade sunX={790} sunY={560} warm="255,226,170" vignette={0.45} />
      </AbsoluteFill>
      {/* the same trail in winter */}
      <AbsoluteFill style={{ opacity: snowK }}>
        <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 200} t={t} />
        <Plane cam={cam} depth={1}>
          <FrostTrail y={g} snow={1} />
          <Svg>
            <BlazeTree x={900} y={g - 10} h={900} snow={1} />
          </Svg>
          <Subject rimX={5} col="rgba(255,240,220,0.85)">
            <Person {...p} outfit={PRIYA} expression="happy" />
          </Subject>
        </Plane>
        <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.24} />
        <Particles seed={2284} n={14} col="#ffffff" fall={8} bokeh />
        <Grade sunX={800} sunY={560} warm="250,236,214" vignette={0.5} />
      </AbsoluteFill>
      <Chip text="The rule" t={t} t0={6.5} x={60} y={170} icon="none" big />
      <Chip text="A trail you know from summer" t={t} t0={7.2} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: her gloved hand on the familiar blaze, short loop sign (9.0 - 11.45) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.45), rot: hh.rot };
  const reach = at(t, [9.2, 9.7], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD_LIKE} uid="f" treeY={1300} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,214,150,0.9)">
          {/* big trunk with the white blaze */}
          <rect x={360} y={-100} width={360} height={2100} fill="#5a4030" />
          <rect x={360} y={-100} width={120} height={2100} fill="#4a3426" />
          {[200, 520, 900, 1300].map((y) => (
            <path key={y} d={`M${400 + (y % 3) * 60},${y} q20,60 0,140`} stroke="#3f2c20" strokeWidth={10} fill="none" />
          ))}
          <rect x={470} y={700} width={150} height={230} rx={10} fill="#f2f2ee" />
          <path d={`M350,${-100} q190,-30 380,0`} fill={SNOW} />
          {/* gloved hand and sleeve reaching in from the left */}
          <g transform={`translate(${mix(-300, 0, reach)},0)`}>
            <path d="M-200,1240 Q200,1150 420,1000" stroke={PRIYA.jacketShade} strokeWidth={170} fill="none" strokeLinecap="round" />
            <path d="M-200,1240 Q200,1150 420,1000" stroke={PRIYA.jacket} strokeWidth={140} fill="none" strokeLinecap="round" />
            <ellipse cx={480} cy={960} rx={95} ry={80} fill="#2a2a2a" />
            <ellipse cx={540} cy={900} rx={34} ry={60} fill="#2a2a2a" transform="rotate(-20 540 900)" />
          </g>
        </Subject>
      </Plane>
      <Rays x={760} y={440} strength={0.26} col="255,214,150" />
      <Particles seed={2285} n={12} col="#fff3d6" fall={5} bokeh />
      <Grade sunX={760} sunY={600} warm="255,214,170" vignette={0.5} />
      <Chip text="Same blazes, same turns" t={t} t0={9.1} x={60} y={170} icon="check" big />
      <Chip text="Keep it short" t={t} t0={10.3} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const WGOLD_LIKE = { ...WINTER, mid: "#e8b98a", low: "#ffe0ae", glow: "#ffc77a" };

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/beginners-hiking-guide.jpg"
      spec="12 CHAPTERS · PRINTABLE PDF"
      name={
        <>
          Beginner's
          <br />
          Hiking Guide
        </>
      }
      nameSize={104}
      price="$9.99"
      save="Save this before you go"
    />
  );
};

export const V228: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.58} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.5} to={4.68} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.5} />
    </Scene>
    <Scene from={4.6} to={6.49} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.6} />
    </Scene>
    <Scene from={6.41} to={9.08} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={6.41} />
    </Scene>
    <Scene from={9.0} to={11.53} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.0} />
    </Scene>
    <Scene from={11.45} to={15.6} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.5, 1600],
        [2.5, 4.6, 1600],
        [4.6, 6.41, 1600],
        [6.41, 9.0, 1600],
        [9.0, 11.45, 1600],
      ]}
    />
  </AbsoluteFill>
);
