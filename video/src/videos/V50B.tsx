// V50B: v50 "Hug a tree if you're lost" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v50b.json";

const words = vo.words as unknown as Word[];

const DAY: Sky = { top: "#3a6d9e", mid: "#b9cfe0", low: "#f3e8cc", sun: [830, 560], sunR: 52, sunCol: "#fffbe8", glow: "#ffe2a6" };
const DEEP: Sky = { top: "#3c536a", mid: "#8fa0a8", low: "#cfd2c4", sun: [220, 700], sunR: 40, sunCol: "#f4f0e0", glow: "#e6e0c8" };
const GOLD: Sky = { top: "#4a6c98", mid: "#e9b487", low: "#ffdcaa", sun: [760, 760], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const DAD: Outfit = {
  ...JAKE,
  skin: "#B47A58",
  skinShade: "#965F40",
  hair: "#2a1d16",
  beard: "#2a1d16",
  cap: "#B5553A",
  capShade: "#8E3F2A",
  jacket: "#3E5F4B",
  jacketShade: "#2E4A39",
  pack: "#4E6B8A",
  packShade: "#3a536c",
};
const LEO: Outfit = {
  ...JAKE,
  skin: "#C08562",
  skinShade: "#A26A49",
  hair: "#2a1d16",
  beard: null,
  cap: "#2F7F86",
  capShade: "#256870",
  jacket: "#E0A33A",
  jacketShade: "#B9822A",
  pants: "#3E4650",
  pantsShade: "#2E353D",
  pack: "#C8476A",
  packShade: "#A23552",
};
const KID = 0.66; // Leo's size relative to his dad
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e", "#e0b040"];

// ---------- scenery ----------
const Woods: React.FC<{ y: number; shift: number; dense?: boolean }> = ({ y, shift, dense }) => (
  <Svg>
    {Array.from({ length: dense ? 14 : 10 }, (_, i) => {
      const step = dense ? 125 : 170;
      const x = ((((-160 + i * step - shift) % 1750) + 1750) % 1750) - 300;
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

const Creek: React.FC<{ x0: number; y: number; t: number }> = ({ x0, y, t }) => (
  <Svg>
    <path d={`M${x0},${y - 10} Q${x0 + 200},${y - 30} 1500,${y - 20} L1500,${y + 90} Q${x0 + 200},${y + 80} ${x0 - 60},${y + 90} Z`} fill="#5d9fc2" />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M${x0 + ((i * 160 + t * 120) % 500)},${y + 20 + i * 20} q30,-8 60,0`} stroke="#e2f2f8" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.75} />
    ))}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; dense?: boolean }> = ({ cam, sky, uid, treeY, blur = 0, t, dense }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={21} drift={t * 10} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={57} base={treeY - 280} amp={330} scale={260} col="#93a3b8" />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.6} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={61} base={treeY - 120} amp={230} scale={190} col="#7a8a62" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.4} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} dense={dense} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Thick trunk to hug.
const Trunk: React.FC<{ x: number; y: number; w?: number }> = ({ x, y, w = 90 }) => (
  <g>
    <rect x={x - w / 2} y={y - 2400} width={w} height={2400} fill="#5a4030" />
    <rect x={x + w * 0.1} y={y - 2400} width={w * 0.4} height={2400} fill="#4a3426" />
    {[0, 1, 2, 3, 4].map((i) => (
      <path key={i} d={`M${x - w * 0.3},${y - 200 - i * 260} q8,-40 0,-80`} stroke="#3e2c20" strokeWidth={6} fill="none" />
    ))}
  </g>
);

// Orange whistle in the near hand, plus sound arcs when blowing.
const Whistle: React.FC<{ p: HikerProps; blow: number; mouth?: boolean }> = ({ p, blow, mouth }) => {
  const geo = hikerGeometry(p);
  const hd = geo.head;
  const h: [number, number] = mouth ? [hd[0] + 22, hd[1] + 28] : geo.arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] - 2},${h[1] - 10})`}>
        <rect x={0} y={-8} width={26} height={16} rx={4} fill="#E0784A" />
        <circle cx={26} cy={2} r={11} fill="#E0784A" />
        <path d="M-4,0 q-10,10 -6,26" stroke="#2b2b2b" strokeWidth={2} fill="none" />
      </g>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${h[0] + 50 + i * 26},${h[1] - 40} q18,30 0,60`}
          stroke="#fff"
          strokeWidth={7}
          fill="none"
          strokeLinecap="round"
          opacity={blow * (0.9 - i * 0.25)}
        />
      ))}
    </g>
  );
};

// Sound rings spreading from a point (wide shot).
const Rings: React.FC<{ x: number; y: number; t: number; k: number }> = ({ x, y, t, k }) =>
  k <= 0 ? null : (
    <Svg>
      {[0, 1, 2].map((i) => {
        const kk = (t * 0.8 + i / 3) % 1;
        return <circle key={i} cx={x} cy={y} r={60 + kk * 520} fill="none" stroke="#fff" strokeWidth={8} opacity={k * 0.7 * (1 - kk)} />;
      })}
    </Svg>
  );

// ============ S1 HOOK: Leo runs ahead to the creek (0 - 2.2) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: t * 40 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 2.2), rot: hh.rot };
  const g = 1460;
  const ph = t * 8;
  const pL: HikerProps = { x: 420 + t * 150, y: g + 50, scale: 2.3 * KID * 1.2, phase: ph, walk: 1, lean: 0.14, poles: false, handOverride: freeHand(ph, 1) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAY} uid="a" treeY={g - 80} blur={1.2} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Creek x0={880 - cam.x * 0.3} y={g + 130} t={t} />
        <Subject>
          <Person {...pL} outfit={LEO} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2c2a1c" side="left" />
      </Plane>
      <Rays x={DAY.sun[0]} y={DAY.sun[1]} strength={0.25} />
      <Particles seed={501} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={830} sunY={560} />
      <Title text={"Why he told his son\nto hug a tree"} t={t} t0={0} top={130} size={104} />
      <Chip text="Ran ahead to the creek" t={t} t0={0.66} x={80} y={420} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2a CLOSE-UP: he turns around, the trail looks different (2.15 - 5.9) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: -lt * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.13, lt / 3.75), rot: hh.rot };
  const turned = t >= 2.84;
  const p: HikerProps = { x: turned ? 600 : 480, y: 2330, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DEEP} uid="b" treeY={1250} blur={8} t={t} dense />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col="rgba(240,230,200,0.6)">
          <Person {...p} outfit={LEO} expression={t >= 4.6 ? "tired" : "neutral"} flip={turned} />
        </Subject>
      </Plane>
      <Particles seed={502} n={14} leaves={LEAVES} fall={40} />
      <Grade sunX={220} sunY={700} warm="220,225,215" vignette={0.65} />
      <Chip text="Trail looks different" t={t} t0={3.45} x={80} y={240} icon="x" big />
      <Chip text="Dad is gone" t={t} t0={5.12} x={80} y={370} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b MEDIUM: he wants to run (5.85 - 7.45) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6, at(t, [6.4, 6.8], [1, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.12, 1.04, lt / 1.6), rot: hh.rot };
  const g = 1460;
  const ph = t * 6;
  const p: HikerProps = { x: 540, y: g + 50, scale: 2.3 * KID * 1.4, phase: ph, walk: 0.3, lean: 0.2, poles: false, handOverride: freeHand(ph, 0.3) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DEEP} uid="c" treeY={g - 80} blur={2} t={t} dense />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject rimX={3} col="rgba(240,230,200,0.6)">
          <Person {...p} outfit={LEO} expression="tired" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f2018" side="both" />
      </Plane>
      <Particles seed={503} n={14} leaves={LEAVES} fall={40} />
      <Grade sunX={220} sunY={700} warm="220,225,215" vignette={0.7} />
      <Readout label="FIRST THOUGHT" value="RUN" ok={false} t={t} t0={6.1} x={80} y={240} pulseAt={6.55} />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: at the trailhead, before the hike (7.4 - 9.6) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 8 + hh.x, y: at(lt, [0, 1.0], [-40, 0]) + hh.y, zoom: at(lt, [0, 1.0], [1.12, 1.05]), rot: hh.rot };
  const g = 1460;
  const pD: HikerProps = { x: 330, y: g + 40, scale: 2.3, walk: 0, lean: 0.16, poles: false, handOverride: [64, -20 + Math.sin(t * 5) * 8], breathe: Math.sin(t * 2.2) * 2 };
  const pL: HikerProps = { x: 720, y: g + 50, scale: 2.3 * KID, walk: 0, lean: 0.02, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAY} uid="d" treeY={g - 80} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject>
          <Person {...pD} outfit={DAD} expression="happy" />
          <Person {...pL} outfit={LEO} expression="neutral" flip />
        </Subject>
      </Plane>
      <Rays x={DAY.sun[0]} y={DAY.sun[1]} strength={0.25} />
      <Particles seed={504} n={16} leaves={LEAVES} fall={40} />
      <Grade sunX={830} sunY={560} />
      <Title text={"Taught before\nthe hike."} t={t} t0={8.3} top={200} size={130} />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: stay put and hug a tree (9.55 - 11.95) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.4), rot: hh.rot };
  const hug = at(t, [10.8, 11.3], [0, 1]);
  const p: HikerProps = { x: 400, y: 2330, scale: 4.4, walk: 0, lean: mix(0.04, 0.14, hug), poles: false, handOverride: [mix(30, 96, hug), mix(30, -70, hug)], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DEEP} uid="e" treeY={1250} blur={8} t={t} dense />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,236,200,0.75)">
          <Trunk x={880} y={2100} w={260} />
          <Person {...p} outfit={LEO} expression="neutral" />
        </Subject>
      </Plane>
      <Particles seed={505} n={14} leaves={LEAVES} fall={40} />
      <Grade sunX={220} sunY={700} warm="240,230,210" vignette={0.6} />
      <Title text={"Stay put.\nHug a tree."} t={t} t0={10.37} top={200} size={140} />
    </AbsoluteFill>
  );
};

// ============ S3c CLOSE-UP: whistle, three blasts, keep blowing (11.9 - 14.7) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.12, lt / 2.8), rot: hh.rot };
  const blasts = [12.67, 12.91, 13.2, 13.65, 13.9, 14.2];
  const blow = Math.max(...blasts.map((b) => at(t, [b - 0.02, b + 0.05, b + 0.18], [0, 1, 0])));
  const raised = at(t, [12.0, 12.4], [0, 1]);
  const p: HikerProps = { x: 430, y: 2330, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: [mix(30, 50, raised), mix(30, -126, raised)], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DEEP} uid="f" treeY={1250} blur={8} t={t} dense />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,236,200,0.75)">
          <Trunk x={140} y={2100} w={240} />
          <Person {...p} outfit={LEO} expression="neutral" />
          <Whistle p={p} blow={raised >= 1 ? blow : 0} mouth={raised >= 1} />
        </Subject>
      </Plane>
      <Particles seed={506} n={14} leaves={LEAVES} fall={40} />
      <Grade sunX={220} sunY={700} warm="240,230,210" vignette={0.6} />
      <Chip text="Whistle: 3 blasts" t={t} t0={12.53} x={80} y={240} icon="check" big />
      <Chip text="Keep blowing" t={t} t0={13.65} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3d WIDE: one place is easier to find (14.65 - 17.75) ============
const S3d: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 14 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.1), rot: hh.rot };
  const g = 1500;
  const pL: HikerProps = { x: 620, y: g + 40, scale: 1.5 * KID * 1.3, walk: 0, lean: 0.12, poles: false, handOverride: [52, -124], breathe: Math.sin(t * 3) * 1.5 };
  const hand = hikerGeometry(pL).arms[1].hand;
  const hx = pL.x + hand[0] * (pL.scale ?? 1);
  const hy = pL.y + (hand[1] - 182) * (pL.scale ?? 1);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DEEP} uid="g" treeY={g - 80} blur={1.5} t={t} dense />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject rimX={2} col="rgba(240,230,200,0.6)">
          <Trunk x={720} y={g + 30} w={110} />
          <Person {...pL} outfit={LEO} expression="neutral" />
          <Whistle p={pL} blow={0} mouth />
        </Subject>
        <Rings x={hx} y={hy} t={t} k={1} />
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f2018" side="right" />
      </Plane>
      <Particles seed={507} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={220} sunY={700} warm="230,225,210" vignette={0.6} />
      <Chip text="Stay in one place" t={t} t0={14.72} x={80} y={240} icon="check" big />
      <Chip text="Easier to find" t={t} t0={16.33} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: dad heard the whistle within minutes (17.7 - 19.95) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 20 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.04]), rot: hh.rot };
  const g = 1460;
  const arrive = at(t, [17.7, 18.9], [0, 1]);
  const ph = t * 6;
  const pD: HikerProps =
    arrive < 1
      ? { x: mix(80, 380, arrive), y: g + 40, scale: 2.3, phase: ph, walk: 0.8, lean: 0.12, poles: false, handOverride: freeHand(ph, 0.8) }
      : { x: 380, y: g + 40, scale: 2.3, walk: 0, lean: 0.14, poles: false, handOverride: [80, -10], breathe: Math.sin(t * 2.4) * 2 };
  const pL: HikerProps = { x: 690, y: g + 50, scale: 2.3 * KID, walk: 0, lean: 0.04, poles: false, handOverride: arrive >= 1 ? [60, -40] : [34, -100], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject rimX={-5} col="rgba(255,200,140,0.85)">
          <Trunk x={830} y={g + 30} w={110} />
          <Person {...pD} outfit={DAD} expression="happy" />
          <Person {...pL} outfit={LEO} expression="happy" flip />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,200,150" />
      <Particles seed={508} n={20} col="#ffe7b8" bokeh />
      <Grade sunX={760} sunY={760} warm="255,190,120" />
      <Title text={"Found in\nminutes."} t={t} t0={off + 0.1} top={170} size={140} />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: teach the rules at the trailhead (19.9 - 22.65) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.75), rot: hh.rot };
  const g = 1460;
  const pD: HikerProps = { x: 330, y: g + 40, scale: 2.3, walk: 0, lean: 0.16, poles: false, handOverride: [64, -30 + Math.sin(t * 5) * 8], breathe: Math.sin(t * 2.2) * 2 };
  const pL: HikerProps = { x: 700, y: g + 50, scale: 2.3 * KID, walk: 0, lean: 0.02, poles: false, handOverride: [48, -60], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAY} uid="i" treeY={g - 80} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject>
          <Person {...pD} outfit={DAD} expression="happy" />
          <Person {...pL} outfit={LEO} expression="happy" flip />
          <Whistle p={{ ...pL }} blow={0} />
        </Subject>
      </Plane>
      <Rays x={DAY.sun[0]} y={DAY.sun[1]} strength={0.25} />
      <Particles seed={509} n={16} leaves={LEAVES} fall={40} />
      <Grade sunX={830} sunY={560} />
      <Chip text="Teach it at the trailhead" t={t} t0={19.92} x={80} y={240} icon="check" big />
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

export const V50B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.2} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={2.15} to={5.9} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={2.15} />
    </Scene>
    <Scene from={5.85} to={7.45} fadeIn={0.08} fadeOut={0.1}>
      <S2b off={5.85} />
    </Scene>
    <Scene from={7.4} to={9.6} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={7.4} />
    </Scene>
    <Scene from={9.55} to={11.95} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={9.55} />
    </Scene>
    <Scene from={11.9} to={14.7} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={11.9} />
    </Scene>
    <Scene from={14.65} to={17.75} fadeIn={0.1} fadeOut={0.1}>
      <S3d off={14.65} />
    </Scene>
    <Scene from={17.7} to={19.95} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={17.7} />
    </Scene>
    <Scene from={19.9} to={22.65} fadeIn={0.1} fadeOut={0.1}>
      <S5 off={19.9} />
    </Scene>
    <Scene from={22.55} to={28} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.15, 1560],
        [2.15, 5.85, 1560],
        [5.85, 7.4, 1560],
        [7.4, 9.55, 1560],
        [9.55, 11.9, 1560],
        [11.9, 14.65, 1560],
        [14.65, 17.7, 1560],
        [17.7, 19.9, 1560],
        [19.9, 22.55, 1560],
      ]}
    />
  </AbsoluteFill>
);
