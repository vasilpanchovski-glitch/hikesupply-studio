// V47B: v47 "Are we there yet at mile one" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v47b.json";

const words = vo.words as unknown as Word[];

const DAY: Sky = { top: "#3a6d9e", mid: "#b9cfe0", low: "#f3e8cc", sun: [830, 560], sunR: 52, sunCol: "#fffbe8", glow: "#ffe2a6" };
const SHADE: Sky = { top: "#4a6a8a", mid: "#aebfcc", low: "#e8e0cc", sun: [240, 640], sunR: 44, sunCol: "#fffbe8", glow: "#fff0c8" };
const GOLD: Sky = { top: "#4a6c98", mid: "#e9b487", low: "#ffdcaa", sun: [760, 760], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const TOM: Outfit = {
  ...JAKE,
  skin: "#C68E6E",
  skinShade: "#A87253",
  hair: "#3b2a20",
  beard: "#3b2a20",
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#4E6B8A",
  jacketShade: "#3a536c",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};
const LILY: Outfit = {
  ...GUIDE,
  skin: "#D6A383",
  skinShade: "#B88566",
  hair: "#5a3a24",
  ponytail: "#5a3a24",
  beard: null,
  cap: "#E0A33A",
  capShade: "#B9822A",
  jacket: "#C8476A",
  jacketShade: "#A23552",
  pants: "#3E4650",
  pantsShade: "#2E353D",
  pack: "#2F7F86",
  packShade: "#256870",
};
const KID = 0.66; // Lily's size relative to Tom
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e", "#e0b040"];

// ---------- scenery ----------
const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = 440 + (i % 3) * 70;
      return i % 3 === 1 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c="#3b6550" c2="#2b4d3c" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={["#d9963a", "#b9582c", "#e0b040"][i % 3]} c2={["#b77a28", "#94461f", "#b88a2a"][i % 3]} />
      );
    })}
  </Svg>
);

const Trail: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={1000} fill="#76844c" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 6} L1480,${y + 110} Q540,${y + 90} -400,${y + 110} Z`} fill="#b8966c" />
    {Array.from({ length: 12 }, (_, i) => {
      const x = ((((i * 170 - shift) % 2040) + 2040) % 2040) - 400;
      return <circle key={i} cx={x} cy={y + 190 + (i % 3) * 50} r={9} fill={LEAVES[i % 4]} opacity={0.85} />;
    })}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={14} drift={t * 10} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={93} base={treeY - 280} amp={340} scale={260} col="#93a3b8" />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.6} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={97} base={treeY - 120} amp={230} scale={190} col="#6f8577" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.4} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// A fallen log, drawn in front of a sitting child (hides the legs).
const Log: React.FC<{ x: number; y: number; w?: number; h?: number }> = ({ x, y, w = 380, h = 78 }) => (
  <g>
    <ellipse cx={x} cy={y + 8} rx={w / 2 + 20} ry={16} fill="rgba(0,0,0,0.2)" />
    <rect x={x - w / 2} y={y - h} width={w} height={h + 4} rx={h / 2} fill="#7a5638" />
    <rect x={x - w / 2 + 20} y={y - h} width={w - 40} height={h * 0.25} rx={h * 0.12} fill="#8f6744" />
    <ellipse cx={x + w / 2 - 10} cy={y - h / 2} rx={h * 0.38} ry={h * 0.5} fill="#b48a5e" />
    <ellipse cx={x + w / 2 - 10} cy={y - h / 2} rx={h * 0.2} ry={h * 0.26} fill="none" stroke="#8f6744" strokeWidth={4} />
  </g>
);

// Tree trunk with a painted trail blaze.
const BlazeTree: React.FC<{ x: number; y: number; s?: number; glow?: number }> = ({ x, y, s = 1, glow = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-30} y={-1400} width={60} height={1404} fill="#5a4030" />
    <rect x={-30} y={-1400} width={18} height={1404} fill="#4a3426" />
    {glow > 0 && <circle cx={0} cy={-420} r={70} fill="none" stroke="#ffffff" strokeWidth={6} opacity={glow * 0.9} />}
    <rect x={-17} y={-454} width={34} height={64} rx={3} fill="#f2f0e6" />
  </g>
);

// Junction signpost with two arms.
const Signpost: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-9} y={-260} width={18} height={264} fill="#6b4b30" />
    <path d="M-10,-250 h150 l26,22 l-26,22 h-150 Z" fill="#8d6a48" />
    <path d="M10,-190 h-150 l-26,22 l26,22 h150 Z" fill="#7a5a3c" />
  </g>
);

// Small hunt card held in the near hand.
const Paper: React.FC<{ p: HikerProps }> = ({ p }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] + 4},${h[1] - 18}) rotate(-8)`}>
        <rect x={-22} y={-30} width={46} height={58} rx={3} fill="#fbf8f1" stroke="#c9c2b2" strokeWidth={2} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <circle cx={-12} cy={-18 + i * 13} r={3.5} fill="#3E8E5A" />
            <rect x={-4} y={-20 + i * 13} width={22} height={3} fill="#9a9488" />
          </g>
        ))}
      </g>
    </g>
  );
};

// Hunt finds on the forest floor.
const RedLeaf: React.FC<{ x: number; y: number; s: number; rot?: number }> = ({ x, y, s, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M0,-60 L14,-30 L44,-40 L32,-10 L58,4 L28,14 L34,44 L6,30 L0,60 L-6,30 L-34,44 L-28,14 L-58,4 L-32,-10 L-44,-40 L-14,-30 Z" fill="#c8442e" />
    <path d="M0,-50 L0,70" stroke="#8e2e1e" strokeWidth={4} />
  </g>
);
const Pinecone: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x},${y}) scale(${s}) rotate(-20)`}>
    <ellipse cx={0} cy={0} rx={34} ry={56} fill="#7a4e2c" />
    {Array.from({ length: 5 }, (_, r) =>
      [-1, 1].map((sd) => <path key={`${r}${sd}`} d={`M0,${-44 + r * 20} q${sd * 26},6 ${sd * 30},18`} stroke="#5a3820" strokeWidth={5} fill="none" />),
    )}
  </g>
);
const Mushroom: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-12} y={-50} width={24} height={52} rx={10} fill="#efe6d4" />
    <path d="M-50,-46 Q0,-110 50,-46 Z" fill="#a8683a" />
    <circle cx={-16} cy={-66} r={6} fill="#e9d6b8" />
    <circle cx={14} cy={-72} r={5} fill="#e9d6b8" />
  </g>
);
const Ring: React.FC<{ x: number; y: number; r: number; k: number }> = ({ x, y, r, k }) =>
  k <= 0 ? null : <circle cx={x} cy={y} r={r * mix(1.3, 1, k)} fill="none" stroke="#ffffff" strokeWidth={7} opacity={k * 0.9} />;

// ============ S1 HOOK: first fall hike, walking together (0 - 3.05) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: t * 34 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 3.05), rot: hh.rot };
  const g = 1460;
  const ph = t * 4.6;
  const pT: HikerProps = { x: 300 + t * 34, y: g + 40, scale: 2.3, phase: ph, walk: 0.55, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.55) };
  const pL: HikerProps = { x: 640 + t * 34, y: g + 50, scale: 2.3 * KID, phase: ph * 1.3, walk: 0.7, lean: 0.06, poles: false, handOverride: freeHand(ph * 1.3, 0.7) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAY} uid="a" treeY={g - 80} blur={1.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject>
          <Person {...pT} outfit={TOM} expression="happy" />
          <Person {...pL} outfit={LILY} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a1d12" side="right" />
      </Plane>
      <Particles seed={81} n={22} leaves={LEAVES} fall={40} />
      <Grade sunX={830} sunY={560} />
      <Title text={'"Are we there yet?"\nat mile one'} t={t} t0={0} top={130} size={110} />
      <Chip text="Her first fall hike" t={t} t0={2.03} x={80} y={420} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: one mile in, she sits down on a log (3.0 - 5.6) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.03, 1.1, lt / 2.6), rot: hh.rot };
  const g = 1460;
  const sit = at(t, [4.1, 4.5], [0, 1]);
  const ls = 2.3 * KID;
  const pT: HikerProps = { x: 300, y: g + 40, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.2) * 2 };
  const pL: HikerProps = { x: 700, y: g + 50 + 70 * ls * sit, scale: ls, walk: 0, lean: mix(0.04, 0.22, sit), poles: false, handOverride: [40, 10], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SHADE} uid="b" treeY={g - 80} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject>
          <Person {...pT} outfit={TOM} expression="neutral" />
          <Person {...pL} outfit={LILY} expression={sit > 0.5 ? "tired" : "neutral"} flip />
          <Log x={700} y={g + 165} w={460} h={225} />
        </Subject>
      </Plane>
      <Particles seed={82} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={240} sunY={640} vignette={0.5} />
      <Readout label="DISTANCE" value="1 MILE" ok={null} t={t} t0={3.12} x={80} y={240} />
      <Chip text="Sat down on a log" t={t} t0={4.11} x={80} y={470} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: "Are we there yet?" (5.55 - 7.15) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.05, 1.14, lt / 1.6), rot: hh.rot };
  const p: HikerProps = { x: 540, y: 2250, scale: 4.4, walk: 0, lean: 0.2, poles: false, handOverride: [40, 10], breathe: Math.sin(t * 2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SHADE} uid="c" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={LILY} expression="tired" flip />
          <Log x={540} y={2050} w={1100} h={200} />
        </Subject>
      </Plane>
      <Particles seed={83} n={14} leaves={LEAVES} fall={30} />
      <Grade sunX={240} sunY={640} vignette={0.6} />
      <Chip text={'"Are we there yet?"'} t={t} t0={5.66} x={80} y={240} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: the fix, a mission, not a distance (7.1 - 10.45) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const handed = t >= 9.6;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: at(lt, [0, 1.4], [-40, 0]) + hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.05]), rot: hh.rot };
  const g = 1460;
  const ls = 2.3 * KID;
  const pT: HikerProps = { x: 340, y: g + 40, scale: 2.3, walk: 0, lean: 0.14, poles: false, handOverride: handed ? [30, 34] : [70, -4], breathe: Math.sin(t * 2.2) * 2 };
  const pL: HikerProps = { x: 700, y: g + 50, scale: ls, walk: 0, lean: 0.04, poles: false, handOverride: handed ? [44, -40] : [30, 34], breathe: Math.sin(t * 2.6) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAY} uid="d" treeY={g - 80} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject>
          <Person {...pT} outfit={TOM} expression="happy" />
          {!handed && <Paper p={pT} />}
          <Person {...pL} outfit={LILY} expression={handed ? "happy" : "neutral"} flip />
          {handed && <Paper p={{ ...pL, x: pL.x }} />}
        </Subject>
      </Plane>
      <Rays x={DAY.sun[0]} y={DAY.sun[1]} strength={0.22} />
      <Particles seed={84} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={830} sunY={560} />
      <Title text={"A mission,\nnot a distance."} t={t} t0={8.09} top={200} size={124} />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: the hunt, item by item (10.4 - 15.85) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: at(lt, [0, 5.45], [-60, 60]) + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 5.45), rot: hh.rot };
  const k = (t0: number) => at(t, [t0, t0 + 0.3], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="e" treeY={1100} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={1150} width={1880} height={900} fill="#6f7a44" />
          {Array.from({ length: 26 }, (_, i) => (
            <circle key={i} cx={-300 + ((i * 113) % 1700)} cy={1200 + ((i * 71) % 700)} r={10 + (i % 3) * 4} fill={LEAVES[i % 4]} opacity={0.8} />
          ))}
          <BlazeTree x={880} y={1300} glow={k(14.83)} />
          <RedLeaf x={220} y={1310} s={1.6} rot={-14} />
          <Ring x={220} y={1310} r={120} k={k(12.38)} />
          <Pinecone x={580} y={1290} s={1.5} />
          <Ring x={580} y={1290} r={110} k={k(13.14)} />
          <Mushroom x={430} y={1820} s={1.7} />
          <Ring x={430} y={1745} r={110} k={k(14.13)} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#3a2614" side="left" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.24} col="255,214,150" />
      <Particles seed={85} n={20} leaves={LEAVES} fall={40} />
      <Grade sunX={760} sunY={760} warm="255,190,110" vignette={0.5} />
      <Chip text="Scavenger hunt" t={t} t0={11.3} x={80} y={200} icon="none" big />
      <Chip text="A red leaf" t={t} t0={12.38} x={80} y={330} icon="check" big />
      <Chip text="A pinecone" t={t} t0={13.14} x={80} y={460} icon="check" big />
      <Chip text="A mushroom" t={t} t0={14.13} x={80} y={590} icon="check" big />
      <Chip text="A trail blaze" t={t} t0={14.83} x={80} y={720} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3c WIDE: she leads to the next blaze, stop at every junction (15.8 - 19.65) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.85), rot: hh.rot };
  const g = 1500;
  const ph = lt * 5;
  const stop = t >= 17.9;
  const lx = stop ? 760 : 380 + lt * 180;
  const pL: HikerProps = stop
    ? { x: 760, y: g + 40, scale: 1.8 * KID * 1.25, walk: 0, lean: 0.04, poles: false, handOverride: [44, -40], breathe: Math.sin(t * 2.6) * 1.5 }
    : { x: lx, y: g + 40, scale: 1.8 * KID * 1.25, phase: ph, walk: 0.85, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.85) };
  const tx = 160 + Math.min(lt, 2.4) * 120;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAY} uid="f" treeY={g - 90} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Svg>
          <BlazeTree x={920} y={g + 20} s={0.8} glow={at(t, [16.2, 16.5], [0, 1]) * at(t, [17.6, 17.9], [1, 0])} />
          <Signpost x={620} y={g + 20} s={1.4} />
        </Svg>
        <Subject>
          <Person x={tx} y={g + 40} scale={1.8} phase={lt * 3.4} walk={lt < 2.4 ? 0.6 : 0} lean={0.06} poles={false} handOverride={lt < 2.4 ? freeHand(lt * 3.4, 0.6) : [30, 34]} outfit={TOM} expression="happy" />
          <Person {...pL} outfit={LILY} expression="happy" />
        </Subject>
      </Plane>
      <Particles seed={86} n={20} leaves={LEAVES} fall={40} />
      <Grade sunX={830} sunY={560} />
      <Chip text="She leads to the next blaze" t={t} t0={16.2} x={80} y={240} icon="check" big />
      <Chip text="Stop at every junction" t={t} t0={17.68} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: racing ahead, then "another hike?" at the car (19.6 - 23.5) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const atCar = t >= 21.3;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: (atCar ? 0 : lt * 30) + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.04]), rot: hh.rot };
  const g = 1460;
  const ph = lt * 6;
  const ls = 2.3 * KID;
  const pL: HikerProps = atCar
    ? { x: 640, y: g + 50, scale: ls, walk: 0, lean: 0.02, poles: false, handOverride: [40, -70], breathe: Math.sin(t * 3) * 1.5 }
    : { x: 560 + lt * 180, y: g + 50, scale: ls, phase: ph, walk: 1, lean: 0.16, poles: false, handOverride: freeHand(ph, 1) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="g" treeY={g - 80} blur={1.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject col="rgba(255,200,130,0.9)">
          {atCar && <Car x={880} y={g + 50} s={2.0} body="#4E6B8A" shade="#3a536c" />}
          {atCar ? (
            <Person x={330} y={g + 40} scale={2.3} walk={0} lean={0.04} poles={false} handOverride={[30, 34]} outfit={TOM} expression="happy" breathe={Math.sin(t * 2.2) * 2} />
          ) : (
            <Person x={160 + lt * 70} y={g + 40} scale={2.3} phase={lt * 3.8} walk={0.75} lean={0.08} poles={false} handOverride={freeHand(lt * 3.8, 0.75)} outfit={TOM} expression="happy" />
          )}
          <Person {...pL} outfit={LILY} expression="happy" flip={atCar} />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={87} n={24} leaves={LEAVES} fall={40} />
      <Grade sunX={760} sunY={760} warm="255,180,100" />
      <Title text={"Racing ahead."} t={t} t0={off + 0.1} t1={21.3} top={170} size={140} />
      <Chip text={'"Another hike?"'} t={t} t0={21.91} x={80} y={240} icon="none" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/kids-trail-explorer-pack-scavenger-hunts-junior-hiker-journal-card.jpg"
      photoH={760}
      spec="24 PRINTABLE PAGES · AGES 4 TO 10"
      name={
        <>
          Kids Trail
          <br />
          Explorer Pack
        </>
      }
      nameSize={96}
      price="$4.99"
      save="Save this for your next family hike"
    />
  );
};

export const V47B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.05} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.0} to={5.6} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={3.0} />
    </Scene>
    <Scene from={5.55} to={7.15} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={5.55} />
    </Scene>
    <Scene from={7.1} to={10.45} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={7.1} />
    </Scene>
    <Scene from={10.4} to={15.85} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={10.4} />
    </Scene>
    <Scene from={15.8} to={19.65} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={15.8} />
    </Scene>
    <Scene from={19.6} to={23.5} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={19.6} />
    </Scene>
    <Scene from={23.45} to={28} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.0, 1560],
        [3.0, 5.55, 1560],
        [5.55, 7.1, 1560],
        [7.1, 10.4, 1560],
        [10.4, 15.8, 1560],
        [15.8, 19.6, 1560],
        [19.6, 23.45, 1560],
      ]}
    />
  </AbsoluteFill>
);
