// V91: "You can't drink from a trickle" in the cinematic C01 style. Late-fall creek that is down to a trickle.
// Facts from the live Shopify listing (Clean Water Kit): fill the bottle at the stream, then drink through the filter straw;
// squash the empty bottle flat and it slides into a hip-belt pocket. The straw removes bacteria, protozoa and sediment,
// not viruses or chemicals (no "drink anything" claims). End card = Clean Water Kit — Filter Straw + Collapsible 600ml Bottle, $29.99.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, CLEAR, FALL, GOLD, Subject, Trail } from "../fall";
import vo from "../vo/v91.json";

const words = vo.words as unknown as Word[];

const NOON: Sky = { top: "#3f6f9c", mid: "#a8c6dc", low: "#f2e4c4", sun: [820, 500], sunR: 50, sunCol: "#fff8e4", glow: "#ffdca0" };

const AVA: Outfit = {
  ...GUIDE,
  skin: "#E9B48C",
  skinShade: "#C8916C",
  hair: "#2a1d14",
  ponytail: "#2a1d14",
  beard: null,
  cap: "#C2662E",
  capShade: "#9a4f22",
  jacket: "#2F6F5E",
  jacketShade: "#22544a",
  pants: "#4a4f57",
  pantsShade: "#363a40",
  pack: "#7a3b4a",
  packShade: "#5c2c38",
  glove: null,
};

const BLUE = "#9CCBEA";
const BLUE_D = "#78ABD0";
const CAP = "#2840B0";
const CAP_D = "#1c2f86";
const SIL = "#8fd3d6"; // bottle silicone
const SIL_D = "#6fb7bb";
const SIL_CAP = "#a9b8bb";
const ROCK = "#7d7f78";
const ROCK_D = "#61635d";
const ROCK_L = "#9a9c94";
const WATER = "#bfe3f2";

const toScreen = (p: HikerProps, q: readonly number[]): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};
const mouthOf = (p: HikerProps): [number, number] => {
  const h = hikerGeometry(p).head;
  return toScreen(p, [h[0] + 24, h[1] + 10]);
};

// Straw filter, vertical, centred at (0,0), 320 long in local units (mouthpiece at the top).
const Straw: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-14} y={-160} width={28} height={30} rx={8} fill={CAP} />
    <path d="M-34,-132 L34,-132 L34,-104 L-34,-104 Z" fill={CAP} />
    <rect x={-34} y={-110} width={68} height={8} fill={CAP_D} />
    <rect x={-30} y={-104} width={60} height={210} fill={BLUE} />
    <rect x={10} y={-104} width={20} height={210} fill={BLUE_D} />
    <rect x={-22} y={-100} width={8} height={200} rx={4} fill="#ffffff" opacity={0.45} />
    <rect x={-36} y={104} width={72} height={46} rx={8} fill={CAP} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={-30 + i * 17} y={110} width={6} height={34} fill={CAP_D} />
    ))}
  </g>
);
// Straw from a to b (a = mouthpiece end).
const StrawAB: React.FC<{ a: [number, number]; b: [number, number] }> = ({ a, b }) => {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const rot = (Math.atan2(b[0] - a[0], b[1] - a[1]) * -180) / Math.PI;
  return <Straw x={(a[0] + b[0]) / 2} y={(a[1] + b[1]) / 2} s={L / 310} rot={rot} />;
};

// Collapsible silicone bottle, origin = bottom centre, 300 tall in local units. squash 0..1 folds it flat.
// water 0..1 fill level, grit 0..1 (cloudy, settling), cap: show the cap on.
const KitBottle: React.FC<{ x: number; y: number; s?: number; rot?: number; squash?: number; water?: number; grit?: number; t?: number; cap?: boolean }> = ({
  x,
  y,
  s = 1,
  rot = 0,
  squash = 0,
  water = 0,
  grit = 0,
  t = 0,
  cap = true,
}) => {
  const h = mix(240, 70, squash);
  const w = mix(110, 128, squash);
  const wl = h * water;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      <defs>
        <clipPath id={`kb${Math.round(x)}${Math.round(y)}`}>
          <rect x={-w / 2} y={-h} width={w} height={h} rx={26} />
        </clipPath>
      </defs>
      <rect x={-w / 2} y={-h} width={w} height={h} rx={26} fill={SIL} opacity={0.92} />
      <g clipPath={`url(#kb${Math.round(x)}${Math.round(y)})`}>
        <rect x={-w / 2} y={-wl} width={w} height={wl} fill="#5fa9b8" opacity={0.55} />
        {grit > 0 &&
          Array.from({ length: 16 }).map((_, i) => {
            const gx = -w / 2 + 12 + ((i * 37) % (w - 24));
            const top = -wl + 14 + ((i * 53) % Math.max(10, wl - 30));
            const gy = mix(top, -8 - (i % 3) * 5, 1 - grit);
            return <circle key={i} cx={gx} cy={gy} r={3 + (i % 3)} fill="#7a6a52" opacity={0.85} />;
          })}
        {/* facet lines */}
        {squash < 0.6 && (
          <g stroke={SIL_D} strokeWidth={4} fill="none" opacity={0.9}>
            <path d={`M${-w / 2},${-h * 0.75} L0,${-h * 0.55} L${w / 2},${-h * 0.75}`} />
            <path d={`M${-w / 2},${-h * 0.35} L0,${-h * 0.55} L${w / 2},${-h * 0.35}`} />
            <path d={`M${-w / 2},${-h * 0.35} L0,${-h * 0.15} L${w / 2},${-h * 0.35}`} />
            <line x1={0} y1={-h * 0.55} x2={0} y2={-h * 0.15} />
          </g>
        )}
        {squash >= 0.6 &&
          [0.3, 0.55, 0.8].map((k) => <line key={k} x1={-w / 2} y1={-h * k} x2={w / 2} y2={-h * k} stroke={SIL_D} strokeWidth={5} />)}
      </g>
      <rect x={-w / 2 + 10} y={-h + 14} width={12} height={h - 30} rx={6} fill="#fff" opacity={0.35} />
      {/* collar */}
      <rect x={-w / 2 - 4} y={-h - 26} width={w + 8} height={30} rx={8} fill={SIL_CAP} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={-w / 2 + 6 + i * ((w - 8) / 6)} y={-h - 22} width={5} height={22} fill="#8e9da0" />
      ))}
      {cap && <rect x={-24} y={-h - 60} width={48} height={36} rx={8} fill={SIL_CAP} stroke="#8e9da0" strokeWidth={3} />}
      {cap && <path d={`M24,${-h - 44} Q60,${-h - 40} ${w / 2 + 6},${-h + 30}`} stroke={SIL_CAP} strokeWidth={6} fill="none" />}
      {water > 0 && !cap && <ellipse cx={0} cy={-h - 26} rx={w / 2 - 6} ry={8} fill="#5fa9b8" opacity={0.7} />}
      {t > 0 && null}
    </g>
  );
};

// A rock step with a thin trickle running over its lip. top = y of the rock top, lip at x = lx.
const TrickleRock: React.FC<{ x: number; top: number; w: number; t: number; flow?: number; pour?: boolean }> = ({ x, top, w, t, flow = 1, pour = false }) => (
  <g>
    <path d={`M${x - w / 2},2100 L${x - w / 2},${top + 60} Q${x - w * 0.42},${top} ${x - w * 0.2},${top - 6} L${x + w * 0.3},${top + 4} Q${x + w / 2},${top + 20} ${x + w / 2},${top + 120} L${x + w / 2},2100 Z`} fill={ROCK} />
    <path d={`M${x + w * 0.1},${top} L${x + w * 0.3},${top + 4} Q${x + w / 2},${top + 20} ${x + w / 2},${top + 120} L${x + w / 2},2100 L${x + w * 0.2},2100 Z`} fill={ROCK_D} />
    <path d={`M${x - w * 0.4},${top + 18} Q${x - w * 0.1},${top + 2} ${x + w * 0.25},${top + 10}`} stroke={ROCK_L} strokeWidth={10} fill="none" />
    {/* the trickle: a thin wet line down the face */}
    <path d={`M${x - w * 0.3},${top - 2} Q${x},${top + 4} ${x + w * 0.3},${top + 8} Q${x + w * 0.44},${top + 30} ${x + w * 0.46},${top + 260}`} stroke={WATER} strokeWidth={10 * flow} fill="none" opacity={0.9} strokeLinecap="round" />
    {[0, 1, 2].map((i) => {
      const k = (t * 0.9 + i / 3) % 1;
      return <circle key={i} cx={mix(x - w * 0.25, x + w * 0.45, k)} cy={mix(top, top + 200, Math.max(0, k - 0.5) * 2)} r={6} fill="#fff" opacity={0.8 * (1 - k)} />;
    })}
    {pour && (
      <g>
        <path d={`M${x + w * 0.46},${top + 6} q30,40 34,160`} stroke={WATER} strokeWidth={14} fill="none" opacity={0.9} strokeLinecap="round" />
        {[0, 1, 2, 3].map((i) => {
          const k = (t * 2 + i / 4) % 1;
          return <circle key={i} cx={x + w * 0.46 + 24 + k * 8} cy={top + 20 + k * 150} r={5} fill="#fff" opacity={0.8} />;
        })}
      </g>
    )}
  </g>
);

// ============ S1 HOOK MEDIUM: Ava kneels at the trickle, straw in her mouth (0 - 4.24) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.02, 1.08, t / 4.24), rot: hh.rot };
  const g = 1480;
  const p: HikerProps = { x: 260, y: g + 400, scale: 2.3, walk: 0, lean: 0.62, poles: false, handOverride: [128, -60], breathe: Math.sin(t * 2.4) * 1.5 };
  const m = mouthOf(p);
  const tip: [number, number] = [700, g + 6];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NOON} uid="a" treeY={g - 150} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={AVA} expression={t > 1.8 ? "tired" : "neutral"} />
          <StrawAB a={m} b={tip} />
        </Subject>
        <Svg>
          {/* rocks in front of her knees */}
          <path d={`M-100,2100 L-100,${g + 40} Q100,${g - 20} 360,${g + 10} Q520,${g + 30} 560,${g + 120} L560,2100 Z`} fill={ROCK_D} />
          <path d={`M-100,${g + 60} Q100,${g} 340,${g + 26}`} stroke={ROCK_L} strokeWidth={12} fill="none" />
          <TrickleRock x={760} top={g} w={420} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Rays x={NOON.sun[0]} y={NOON.sun[1]} strength={0.14} />
      <Particles seed={911} n={18} leaves={FALL} fall={30} />
      <Grade sunX={820} sunY={500} warm="255,220,180" />
      <Title text={"You can't drink\nfrom a trickle"} t={t} t0={0} top={130} size={104} />
      <Chip text="Only a thin trickle" t={t} t0={1.0} x={80} y={380} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: her face, the straw sucks air and grit (4.24 - 8.34) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4, at(t, [6.3, 6.4, 6.7], [0, 1, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 4.1), rot: hh.rot };
  const p: HikerProps = { x: 60, y: 2230, scale: 4.4, walk: 0, lean: 0.62, poles: false, handOverride: [134, -66], breathe: Math.sin(t * 2.4) * 1.2 };
  const m = mouthOf(p);
  const top = 1480;
  const tip: [number, number] = [800, top + 2];
  const suck = at(t, [5.2, 5.6], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NOON} uid="b" treeY={1350} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={AVA} expression="tired" />
          <StrawAB a={m} b={tip} />
        </Subject>
        <Svg>
          <path d={`M-100,2100 L-100,${top + 30} Q200,${top - 30} 560,${top + 20} L560,2100 Z`} fill={ROCK_D} />
          <TrickleRock x={860} top={top} w={520} t={t} flow={1.4} />
          {/* air bubbles + grit pulled up the straw tip */}
          {Array.from({ length: 8 }).map((_, i) => {
            const k = (t * 1.4 + i / 8) % 1;
            const bx = tip[0] - 20 + (i % 3) * 18 - k * 110;
            const by = tip[1] - 30 - k * 430;
            return i % 2 ? (
              <circle key={i} cx={bx} cy={by} r={9} fill="none" stroke="#fff" strokeWidth={4} opacity={suck * (1 - k)} />
            ) : (
              <circle key={i} cx={bx} cy={by} r={6} fill="#6b5a44" opacity={suck * (1 - k)} />
            );
          })}
        </Svg>
      </Plane>
      <Particles seed={912} n={12} leaves={FALL} fall={26} />
      <Grade sunX={820} sunY={500} warm="255,220,180" vignette={0.55} />
      <Chip text="Air" t={t} t0={5.9} x={80} y={220} icon="x" big />
      <Chip text="Grit" t={t} t0={6.5} x={80} y={350} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP MACRO: the straw tip sits above a film of water (8.34 - 11.82) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.5), rot: hh.rot };
  const top = 1240;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="c" treeY={1100} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-100} y={top} width={1300} height={900} fill={ROCK} />
          <path d={`M-100,${top} L1200,${top}`} stroke={ROCK_L} strokeWidth={18} />
          {/* water film: only a few mm deep */}
          <rect x={-100} y={top - 14} width={1300} height={16} fill={WATER} opacity={0.9} />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${((t * 160 + i * 330) % 1400) - 150},${top - 8} q40,-6 80,0`} stroke="#fff" strokeWidth={4} fill="none" opacity={0.8} />
          ))}
          {[160, 420, 880].map((x, i) => (
            <ellipse key={x} cx={x} cy={top + 30 + i * 40} rx={40 + i * 10} ry={18} fill={ROCK_D} />
          ))}
        </Svg>
        <Subject rimX={6}>
          <Straw x={560} y={top - 330} s={3.0} rot={-8} />
        </Subject>
        <Svg>
          {/* the intake sits above most of the water: air gets in */}
          {Array.from({ length: 6 }).map((_, i) => {
            const k = (t * 1.2 + i / 6) % 1;
            return <circle key={i} cx={600 + (i % 2) * 40} cy={top - 90 - k * 360} r={14} fill="none" stroke="#fff" strokeWidth={5} opacity={1 - k} />;
          })}
        </Svg>
      </Plane>
      <Particles seed={913} n={12} leaves={FALL} fall={26} />
      <Grade sunX={790} sunY={560} warm="255,220,180" vignette={0.5} />
      <Readout label="WATER DEPTH" value="Too thin" ok={false} t={t} t0={8.5} x={60} y={200} />
      <Chip text="A straw needs depth to reach" t={t} t0={9.9} x={60} y={440} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: "Here's the fix" — Ava pulls the folded bottle from her pack (11.82 - 14.06) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.06, 1.0, lt / 2.24), rot: hh.rot };
  const g = 1520;
  const up = at(t, [12.9, 13.5], [0, 1], outExpo);
  const p: HikerProps = { x: 420, y: g, scale: 2.3, walk: 0, lean: 0.03, poles: false, handOverride: [mix(30, 64, up), mix(30, -110, up)], breathe: Math.sin(t * 2) * 1.5 };
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} dirt="#8f8a80" />
        <Subject rimX={5}>
          <Person {...p} outfit={AVA} expression="happy" />
          <g transform={hikerTransform(p)}>
            <KitBottle x={h[0] + 6} y={h[1] + 50} s={0.4} squash={mix(1, 0, up)} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.2} />
      <Particles seed={914} n={18} leaves={FALL} fall={30} />
      <Grade sunX={790} sunY={560} warm="255,214,170" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={12.85} top={200} size={124} />
      <Chip text="Carry a bottle" t={t} t0={12.95} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: fill the bottle at the clearest pour-off (14.06 - 16.11) ============
const Hand: React.FC<{ x: number; y: number; s?: number; rot?: number; sleeve?: string }> = ({ x, y, s = 1, rot = 0, sleeve = AVA.jacket }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-300} y={-60} width={260} height={120} rx={50} fill={sleeve} />
    <ellipse cx={-30} cy={0} rx={70} ry={58} fill={AVA.skin} />
    {[-36, -12, 12, 36].map((d) => (
      <ellipse key={d} cx={30} cy={d} rx={34} ry={14} fill={AVA.skin} stroke={AVA.skinShade} strokeWidth={2} />
    ))}
    <ellipse cx={-20} cy={-50} rx={40} ry={16} fill={AVA.skin} transform="rotate(-20,-20,-50)" />
  </g>
);

const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y - lt * 10, zoom: mix(1.0, 1.06, lt / 2.05), rot: hh.rot };
  const fill = at(t, [14.3, 16.0], [0.05, 0.85]);
  const top = 520;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={900} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <TrickleRock x={300} top={top} w={720} t={t} flow={1.6} pour />
        </Svg>
        <Subject rimX={6}>
          <KitBottle x={680} y={1340} s={2.2} water={fill} cap={false} />
          <Hand x={560} y={1060} s={1.6} rot={-10} />
        </Subject>
        <Svg>
          <path d={`M${300 + 720 * 0.46 + 34},${top + 160} L690,${1340 - 2.2 * 266}`} stroke={WATER} strokeWidth={22} opacity={0.85} strokeLinecap="round" />
        </Svg>
      </Plane>
      <Particles seed={915} n={14} leaves={FALL} fall={24} />
      <Grade sunX={790} sunY={560} warm="255,220,180" vignette={0.5} />
      <Chip text="Fill where it runs clearest" t={t} t0={14.2} x={60} y={1420 - 1220} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the bottle rests on a rock, grit settles (16.11 - 17.48) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.07, lt / 1.37), rot: hh.rot };
  const settle = at(t, [16.2, 17.4], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={1100} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-100,2100 L-100,1360 Q300,1300 700,1330 Q1000,1350 1200,1400 L1200,2100 Z" fill={ROCK} />
          <path d="M-100,1380 Q300,1320 700,1350" stroke={ROCK_L} strokeWidth={14} fill="none" />
        </Svg>
        <Subject rimX={6}>
          <KitBottle x={540} y={1350} s={2.8} water={0.85} grit={settle} cap={false} />
        </Subject>
      </Plane>
      <Particles seed={916} n={14} leaves={FALL} fall={24} />
      <Grade sunX={790} sunY={560} warm="255,220,180" vignette={0.5} />
      <Chip text="Let the grit settle" t={t} t0={16.2} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE MEDIUM: Ava drinks through the filter in the bottle (17.48 - 19.33) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.85), rot: hh.rot };
  const p: HikerProps = { x: 220, y: 2420, scale: 4.4, walk: 0, lean: 0.08, poles: false, handOverride: [96, -36], breathe: Math.sin(t * 2) * 1.2 };
  const m = mouthOf(p);
  const h = toScreen(p, hikerGeometry(p).arms[1].hand);
  const bTop: [number, number] = [h[0] + 30, h[1] - 120];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="g" treeY={1300} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,200,140,0.9)">
          <Person {...p} outfit={AVA} expression="happy" />
          <KitBottle x={h[0] + 30} y={h[1] + 380} s={2.1} water={0.7} cap={false} />
          <StrawAB a={m} b={[bTop[0] + 10, bTop[1] + 260]} />
        </Subject>
      </Plane>
      <Particles seed={917} n={18} col="#ffe7b8" />
      <Grade sunX={740} sunY={660} warm="255,200,140" vignette={0.5} />
      <Chip text="Drink through the filter" t={t} t0={17.55} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: the empty bottle folds flat and slides into the hip pocket (19.33 - 22.61) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.28), rot: hh.rot };
  const sq = at(t, [19.6, 20.6], [0, 1], outExpo);
  const slide = at(t, [20.9, 21.7], [0, 1], outExpo);
  const bx = mix(560, 520, slide);
  const by = mix(980, 1330, slide);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="h" treeY={1100} blur={16} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* hip belt + pocket, big and close */}
          <path d="M-100,1060 Q540,1000 1200,1060 L1200,1600 Q540,1540 -100,1600 Z" fill={AVA.pack} />
          <path d="M-100,1100 Q540,1040 1200,1100" stroke={AVA.packShade} strokeWidth={16} fill="none" />
          <rect x={-100} y={1600} width={1300} height={500} fill={AVA.pants} />
        </Svg>
        <Subject rimX={6}>
          <KitBottle x={bx} y={by} s={2.4} squash={sq} />
          {slide < 0.95 && <Hand x={bx - 60} y={by - 120} s={1.4} rot={-20} />}
        </Subject>
        <Svg>
          {/* pocket front covers the bottle once it is in */}
          <path d="M300,1220 L780,1220 L780,1500 Q540,1530 300,1500 Z" fill={AVA.packShade} />
          <path d="M300,1220 L780,1220" stroke="#d9d9d9" strokeWidth={6} strokeDasharray="18 12" opacity={0.6} />
          <rect x={300} y={1206} width={480} height={20} rx={8} fill="#2b2b2b" />
        </Svg>
      </Plane>
      <Particles seed={918} n={12} leaves={FALL} fall={24} />
      <Grade sunX={790} sunY={560} warm="255,220,180" vignette={0.55} />
      <Chip text="Empty, it folds flat" t={t} t0={19.7} x={60} y={200} icon="check" big />
      <Chip text="Fits a hip pocket" t={t} t0={21.2} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF WIDE-MEDIUM: Ava drinks sitting on a sunny rock (22.61 - 24.6) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 26, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1470;
  const sip = at(t, [22.9, 23.4], [0, 1], outExpo);
  const s = 2.6;
  const p: HikerProps = { x: 440, y: g + 182 * s - 40, scale: s, walk: 0, lean: -0.04, poles: false, handOverride: [mix(50, 40, sip), mix(-20, -120, sip)], breathe: Math.sin(t * 2) * 2 };
  const h = toScreen(p, hikerGeometry(p).arms[1].hand);
  const m = mouthOf(p);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="i" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,200,140,0.9)">
          <Person {...p} outfit={AVA} expression="happy" />
          <KitBottle x={h[0] + 20} y={h[1] + 170} s={0.85} water={0.6} cap={false} />
          {sip > 0.5 && <StrawAB a={m} b={[h[0] + 22, h[1] + 10]} />}
        </Subject>
        <Svg>
          {/* the boulder she sits on (hides her legs) */}
          <ellipse cx={470} cy={g + 110} rx={330} ry={24} fill="rgba(0,0,0,0.22)" />
          <path d={`M170,${g + 110} C170,${g - 20} 280,${g - 60} 470,${g - 60} C700,${g - 60} 780,${g - 10} 780,${g + 110} Z`} fill={ROCK} />
          <path d={`M480,${g - 60} C700,${g - 60} 780,${g - 10} 780,${g + 110} L540,${g + 110} Z`} fill={ROCK_D} />
          <path d={`M230,${g - 24} C320,${g - 52} 520,${g - 52} 660,${g - 30}`} stroke={ROCK_L} strokeWidth={10} fill="none" />
          <rect x={-100} y={g + 100} width={1300} height={600} fill="#76804a" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#4a2a14" side="both" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.34} col="255,214,160" />
      <Particles seed={919} n={26} leaves={FALL} fall={34} />
      <Grade sunX={740} sunY={660} warm="255,200,140" />
      <Chip text="Clean water, easy" t={t} t0={22.8} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/clean-water-kit-cut.png"
      cutoutH={560}
      spec="FILTER STRAW + 20 OZ (600 ML) FOLDING BOTTLE"
      name={
        <>
          Clean Water
          <br />
          Kit
        </>
      }
      nameSize={110}
      price="$29.99"
      save="Save this before your next hike"
    />
  );
};

export const V91: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.29} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.24} to={8.39} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.24} />
    </Scene>
    <Scene from={8.34} to={11.87} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={8.34} />
    </Scene>
    <Scene from={11.82} to={14.11} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={11.82} />
    </Scene>
    <Scene from={14.06} to={16.16} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={14.06} />
    </Scene>
    <Scene from={16.11} to={17.53} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={16.11} />
    </Scene>
    <Scene from={17.48} to={19.38} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={17.48} />
    </Scene>
    <Scene from={19.33} to={22.66} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={19.33} />
    </Scene>
    <Scene from={22.61} to={24.6} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={22.61} />
    </Scene>
    <Scene from={24.45} to={29.0} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.24, 1560],
        [4.24, 8.34, 1560],
        [8.34, 11.82, 1560],
        [11.82, 14.06, 1560],
        [14.06, 16.11, 1560],
        [16.11, 17.48, 1560],
        [17.48, 19.33, 1560],
        [19.33, 22.61, 1560],
        [22.61, 24.45, 1560],
      ]}
    />
  </AbsoluteFill>
);
