// C01: the V54 creek story rebuilt in the new cinematic illustrated style (cine.tsx):
// depth layers with blur, wide / medium / close-up shots, rim light, sun rays, particles, colour grade.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v54.json";

const words = vo.words as unknown as Word[];

const COOL: Sky = { top: "#4d6a86", mid: "#a9bac4", low: "#e6e3d4", sun: [790, 600], sunR: 46, sunCol: "#fbf7ea", glow: "#f1ecd8" };
const WARM: Sky = { top: "#3a6d9e", mid: "#b9cfe0", low: "#f7e6c4", sun: [820, 620], sunR: 52, sunCol: "#fffbe8", glow: "#ffe2a6" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const JAKE2: Outfit = { ...JAKE, jacket: "#3E5F4B", jacketShade: "#2E4A39", cap: "#B5553A", capShade: "#8E3F2A", pack: "#4E6B8A", packShade: "#3a536c" };
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e"];

// ---------- scenery pieces ----------
const Woods: React.FC<{ y: number; shift: number; s?: number }> = ({ y, shift, s = 1 }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = (440 + (i % 3) * 70) * s;
      return i % 3 === 1 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c="#3b6550" c2="#2b4d3c" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={i % 2 ? "#d9963a" : "#b9582c"} c2={i % 2 ? "#b77a28" : "#94461f"} />
      );
    })}
  </Svg>
);

const Water: React.FC<{ y: number; t: number; fast?: number; front?: boolean; depth?: number; col?: [string, string]; s?: number }> = ({ y, t, fast = 1, front, depth = 500, col = ["#4f7f99", "#6f9db5"], s = 1 }) => {
  const flow = t * 260 * fast;
  return (
    <Svg>
      <defs>
        <linearGradient id={`wg${front ? 1 : 0}${y}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={front ? col[1] : col[0]} stopOpacity={front ? 0.75 : 1} />
          <stop offset="1" stopColor={front ? col[0] : "#2f5a70"} stopOpacity={front ? 0.9 : 1} />
        </linearGradient>
      </defs>
      <rect x={-400} y={y} width={1880} height={depth} fill={`url(#wg${front ? 1 : 0}${y})`} />
      {Array.from({ length: 14 }, (_, i) => {
        const x = ((((i * 173 + flow * (0.7 + (i % 3) * 0.2)) % 1700) + 1700) % 1700) - 300;
        const yy = y + 24 + (i % 5) * (depth / 6);
        const w = (40 + (i % 3) * 30) * s;
        return <path key={i} d={`M${x},${yy} q${w / 2},-${10 * s} ${w},0 q${w / 2},${10 * s} ${w},0`} stroke="#e4f2f7" strokeWidth={5 * s} fill="none" opacity={front ? 0.85 : 0.45} strokeLinecap="round" />;
      })}
      {front && <path d={`M-400,${y} Q0,${y - 10 * s} 300,${y} T900,${y} T1600,${y}`} stroke="#eef7fa" strokeWidth={7 * s} fill="none" />}
    </Svg>
  );
};

const Bank: React.FC<{ y: number; x1?: number; x2?: number }> = ({ y, x1 = -400, x2 = 1480 }) => (
  <Svg>
    <path d={`M${x1},${y - 30} Q${(x1 + x2) / 2},${y - 60} ${x2},${y - 30} L${x2},${y + 700} L${x1},${y + 700} Z`} fill="#7c7446" />
    <path d={`M${x1},${y + 4} Q${(x1 + x2) / 2},${y - 20} ${x2},${y + 4} L${x2},${y + 700} L${x1},${y + 700} Z`} fill="#665838" />
    {Array.from({ length: 12 }, (_, i) => (
      <path key={i} d={`M${x1 + 40 + i * ((x2 - x1) / 12)},${y - 34} l-8,-34 m8,34 l6,-40 m-6,40 l14,-28`} stroke="#5d6b38" strokeWidth={5} strokeLinecap="round" />
    ))}
  </Svg>
);

const HipBelt: React.FC<{ p: HikerProps; buckled: boolean; drop?: number }> = ({ p, buckled, drop = 1 }) => {
  const h = hikerGeometry(p).hip;
  return (
    <g transform={hikerTransform(p)}>
      {buckled ? (
        <g>
          <rect x={h[0] - 30} y={h[1] - 14} width={66} height={12} rx={4} fill="#222" />
          <rect x={h[0] + 22} y={h[1] - 18} width={20} height={20} rx={4} fill="#111" />
          <rect x={h[0] + 26} y={h[1] - 14} width={12} height={4} rx={1} fill="#555" />
        </g>
      ) : (
        <g>
          <rect x={h[0] + 14} y={h[1] - 12} width={10} height={14 + 30 * drop} rx={4} fill="#222" transform={`rotate(${-10 * drop} ${h[0] + 18} ${h[1] - 12})`} />
          <rect x={h[0] - 22} y={h[1] - 12} width={10} height={14 + 24 * drop} rx={4} fill="#222" transform={`rotate(${12 * drop} ${h[0] - 18} ${h[1] - 12})`} />
        </g>
      )}
    </g>
  );
};

const DryBag: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-34} y={-70} width={68} height={120} rx={24} fill="#F2C531" />
    <rect x={8} y={-70} width={26} height={120} rx={12} fill="#D9AC1E" />
    <rect x={-26} y={-60} width={10} height={96} rx={5} fill="#fff2b0" opacity={0.6} />
    <rect x={-38} y={-84} width={76} height={22} rx={8} fill="#E8BA28" />
    <rect x={-10} y={-100} width={20} height={22} rx={4} fill="#222" />
  </g>
);

const Splash: React.FC<{ x: number; y: number; k: number; s?: number }> = ({ x, y, k, s = 1 }) =>
  k <= 0 || k >= 1 ? null : (
    <g opacity={1 - k}>
      {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={x + i * 46 * s * (0.5 + k)} cy={y - Math.sin(((i + 4.5) / 9) * Math.PI) * 220 * s * k} r={(14 - Math.abs(i)) * s} fill="#eef7fa" />
      ))}
    </g>
  );

// Big out-of-focus droplets in front of the lens (foreground plane).
const LensDrops: React.FC<{ k: number }> = ({ k }) =>
  k <= 0 || k >= 1.4 ? null : (
    <Svg>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx={120 + i * 170 + Math.sin(i * 3) * 60} cy={1300 + Math.cos(i * 2) * 260 - k * 500} r={40 + (i % 3) * 22} fill="#eaf6fb" opacity={0.35 * (1 - k / 1.4)} />
      ))}
    </Svg>
  );

// ---------- shared world: sky -> far ridge -> haze -> mid ridge -> tree line ----------
const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={3} drift={t * 12} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={11} base={treeY - 260} amp={380} scale={250} col="#8fa3b4" lit="#e8eef2" peak={160} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.75} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={23} base={treeY - 120} amp={260} scale={180} col="#6f8577" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.45} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

// Person wrapper with rim light toward the sun (rimX > 0: sun on the right).
const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// ============ S1 HOOK: wide, he walks up to the high creek (0 - 3.25) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: t * 14 + hh.x, y: hh.y, zoom: mix(1.0, 1.08, t / 3.25), rot: hh.rot };
  const g = 1430;
  const ph = t * 3.6;
  const walking = t < 2.1;
  const p: HikerProps = walking
    ? { x: 150 + t * 85, y: g, scale: 1.25, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.7) }
    : { x: 328, y: g, scale: 1.25, walk: 0, lean: 0.05, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COOL} uid="a" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Bank y={g} x1={-400} x2={560} />
        <Water y={g + 30} t={t} fast={1.7} depth={700} />
        <Bank y={g + 4} x1={-400} x2={470} />
        <Subject>
          <Person {...p} outfit={JAKE2} />
          <HipBelt p={p} buckled />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={COOL.sun[0]} y={COOL.sun[1]} strength={0.16} />
      <Particles seed={1} n={20} />
      <Grade sunX={790} sunY={600} warm="255,214,170" />
      <Title text={"He crossed the\ncreek with his\nhip belt buckled"} t={t} t0={0} top={130} size={124} />
      <Chip text="High after the rain" t={t} t0={1.9} x={80} y={570} />
    </AbsoluteFill>
  );
};

// ============ S2a CLOSE-UP: click, buckled tight (3.2 - 5.35) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y + lt * -10, zoom: mix(1.04, 1.1, lt / 2.15), rot: hh.rot };
  const click = t >= 3.95;
  const p: HikerProps = { x: 610, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: click ? [36, 30] : [40, -4], breathe: Math.sin(t * 2.2) * 1.5 };
  const flash = at(t, [3.95, 4.05, 4.5], [0, 1, 0]);
  const g = hikerGeometry(p);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COOL} uid="b" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={0.8} blur={8}>
        <Water y={1330} t={t} fast={1.7} depth={800} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={JAKE2} />
          <HipBelt p={p} buckled={click} />
          <g transform={hikerTransform(p)}>
            <circle cx={g.hip[0] + 32} cy={g.hip[1] - 8} r={20 + flash * 40} fill="none" stroke="#fff" strokeWidth={4} opacity={flash} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={2} n={14} />
      <Grade sunX={790} sunY={600} warm="255,214,170" vignette={0.6} />
      <Chip text="Pack buckled tight" t={t} t0={4.0} x={80} y={1160} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b MEDIUM: in the water, one slip (5.3 - 8.3) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [5.62, 5.7, 6.4], [0, 1, 0]);
  const hh = handheld(t, 0.8, shake);
  const cam: Cam = { x: 60 + lt * 10 + hh.x, y: hh.y, zoom: mix(1.05, 1.12, lt / 3) + shake * 0.04, rot: hh.rot };
  const g = 1360;
  const slip = at(t, [5.6, 5.9], [0, 1]) * at(t, [6.8, 7.4], [1, 0.5]);
  const ph = lt * 2.4;
  const p: HikerProps = {
    x: 470 + Math.min(lt, 0.4) * 40,
    y: g + 230 + slip * 120,
    scale: 2.3,
    phase: ph,
    walk: t < 5.6 ? 0.35 : 0,
    lean: 0.06 + slip * 0.5,
    poles: false,
    handOverride: slip > 0.2 ? [70, -60] : freeHand(ph, 0.35),
  };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COOL} uid="c" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Water y={g} t={t} fast={1.7} depth={800} s={1.6} />
        <Subject>
          <Person {...p} outfit={JAKE2} expression={t > 5.6 ? "tired" : "neutral"} />
          <HipBelt p={p} buckled />
        </Subject>
        <Water y={g + 150} t={t} fast={1.7} front depth={700} s={1.6} />
        <Svg>
          <Splash x={p.x + 40} y={g + 170} k={(t - 5.62) / 0.9} s={1.6} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.8} blur={6}>
        <LensDrops k={t - 5.65} />
      </Plane>
      <Particles seed={3} n={12} />
      <Grade sunX={790} sunY={600} warm="255,214,170" cool="20,50,70" vignette={0.6} />
      <Chip text="One slip" t={t} t0={5.67} x={80} y={240} icon="x" big />
      <Chip text="Spare layers: soaked" t={t} t0={6.5} x={80} y={370} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3a WIDE high angle: the wide, slow, shallow spot (8.25 - 11.9) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 12 + hh.x, y: at(lt, [0, 3.6], [-140, 0]) + hh.y, zoom: at(lt, [0, 3.6], [1.14, 1.02]), rot: hh.rot };
  const g = 1440;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="d" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Bank y={g} />
        <Water y={g + 40} t={t} fast={0.35} depth={260} col={["#6d9fb3", "#8dbccc"]} />
        <Svg>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <ellipse cx={360 + i * 140} cy={g + 90 + (i % 2) * 50} rx={54} ry={18} fill="#8e8b7c" />
              <ellipse cx={350 + i * 140} cy={g + 84 + (i % 2) * 50} rx={36} ry={8} fill="#b4b0a0" />
            </g>
          ))}
        </Svg>
        <Bank y={g + 300} />
        <Subject>
          <Person x={190} y={g + 20} scale={1.3} walk={0} lean={0.04} poles={false} handOverride={[56, -50]} outfit={JAKE2} expression="happy" breathe={Math.sin(t * 2.3) * 2} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#4a2e14" side="left" />
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.2} />
      <Particles seed={4} n={22} leaves={LEAVES} fall={60} />
      <Grade sunX={820} sunY={620} />
      <Title text={"Here's\nthe fix."} t={t} t0={8.4} t1={9.28} top={200} size={160} />
      <Chip text="Wide" t={t} t0={9.93} x={80} y={220} icon="check" big />
      <Chip text="Slow" t={t} t0={10.4} x={80} y={340} icon="check" big />
      <Chip text="Shallow" t={t} t0={10.74} x={80} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: unclip the hip belt (11.85 - 15.1) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 3.25), rot: hh.rot };
  const open = t >= 12.6;
  const drop = at(t, [12.6, 13.1], [0, 1]);
  const p: HikerProps = { x: 620, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: open && t < 13.4 ? [16, -14] : t < 12.6 ? [38, -6] : [30, 34], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="e" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={0.8} blur={8}>
        <Water y={1330} t={t} fast={0.4} depth={800} col={["#6d9fb3", "#8dbccc"]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={JAKE2} expression="happy" />
          <HipBelt p={p} buckled={!open} drop={drop} />
        </Subject>
      </Plane>
      <Particles seed={5} n={16} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} vignette={0.6} />
      <Chip text="Hip belt unclipped" t={t} t0={12.0} x={80} y={1160} icon="check" big />
      <Chip text="So you can drop the pack" t={t} t0={13.56} x={80} y={1290} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S3c MEDIUM: face upstream, use a pole (15.05 - 17.2) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: -lt * 14 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.15), rot: hh.rot };
  const g = 1380;
  const p: HikerProps = { x: 600 - lt * 18, y: g + 200, scale: 2.3, phase: lt * 1.6, walk: 0.2, lean: 0.1, poles: t >= 16.1, handOverride: t >= 16.1 ? null : [30, 34], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="f" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Water y={g} t={t} fast={0.6} depth={800} col={["#6d9fb3", "#8dbccc"]} s={1.6} />
        <Subject rimX={-4}>
          <Person {...p} outfit={JAKE2} expression="happy" flip />
          <g transform={`translate(${2 * p.x},0) scale(-1,1)`}>
            <HipBelt p={p} buckled={false} />
          </g>
        </Subject>
        <Water y={g + 140} t={t} fast={0.6} front depth={700} col={["#6d9fb3", "#8dbccc"]} s={1.6} />
      </Plane>
      <Particles seed={6} n={14} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} />
      <Chip text="Face upstream" t={t} t0={15.19} x={80} y={240} icon="check" big />
      <Chip text="Use a pole" t={t} t0={16.11} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3d WIDE: fast or above your knees, turn back (17.15 - 20.5) ============
const S3d: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: lt * 8 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.35), rot: hh.rot };
  const g = 1430;
  const back = t > 19.48;
  const ph = (t - 19.48) * 3.4;
  const p: HikerProps = back
    ? { x: 330 - (t - 19.48) * 70, y: g, scale: 1.3, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6) }
    : { x: 330, y: g, scale: 1.3, walk: 0, lean: 0.04, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COOL} uid="g" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Bank y={g} x1={-400} x2={500} />
        <Water y={g + 30} t={t} fast={2.6} depth={700} col={["#5f7480", "#8a9aa2"]} />
        <Bank y={g + 4} x1={-400} x2={430} />
        <Subject rimX={back ? -4 : 4}>
          <Person {...p} outfit={JAKE2} flip={back} />
          <HipBelt p={p} buckled={false} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2e2618" side="right" />
      </Plane>
      <Particles seed={7} n={16} />
      <Grade sunX={790} sunY={600} warm="255,214,170" cool="20,45,60" vignette={0.6} />
      <Chip text="Fast water?" t={t} t0={18.13} x={80} y={220} icon="x" />
      <Chip text="Above your knees?" t={t} t0={18.57} x={80} y={320} icon="x" />
      <Readout label="THEN" value="TURN BACK" ok={null} t={t} t0={19.48} x={80} y={440} pulseAt={19.48} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: golden light, dry bag (20.45 - 22.8) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 16 + hh.x, y: hh.y, zoom: at(lt, [0, 1.2], [1.16, 1.04], outExpo), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 1420 + 182 * 3, scale: 3, walk: 0, lean: 0.04, poles: false, handOverride: [80, 10], breathe: Math.sin(t * 2.4) * 2 };
  const hand = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={1420} blur={6} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={JAKE2} expression="happy" />
          <HipBelt p={p} buckled />
          <g transform={hikerTransform(p)}>
            <DryBag x={hand[0] + 14} y={hand[1] - 16} rot={-6} />
          </g>
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.26} col="255,214,150" />
      <Particles seed={8} n={26} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"Dry layers\nin a dry bag."} t={t} t0={off + 0.1} top={170} size={150} />
      <Chip text="Across, and still dry" t={t} t0={21.45} x={80} y={520} icon="check" />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/waterproof-dry-bag-card.jpg"
      spec="ROLL-TOP · TAPED SEAMS · 3L TO 75L"
      name={
        <>
          Waterproof
          <br />
          Dry Bag
        </>
      }
      nameSize={104}
      price="from $16.99"
      save="Save this before your next fall hike"
    />
  );
};

export const C01: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.25} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.2} to={5.35} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={3.2} />
    </Scene>
    <Scene from={5.3} to={8.3} fadeIn={0.08} fadeOut={0.12}>
      <S2b off={5.3} />
    </Scene>
    <Scene from={8.25} to={11.9} fadeIn={0.12} fadeOut={0.12}>
      <S3a off={8.25} />
    </Scene>
    <Scene from={11.85} to={15.1} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={11.85} />
    </Scene>
    <Scene from={15.05} to={17.2} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={15.05} />
    </Scene>
    <Scene from={17.15} to={20.5} fadeIn={0.1} fadeOut={0.12}>
      <S3d off={17.15} />
    </Scene>
    <Scene from={20.45} to={22.8} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={20.45} />
    </Scene>
    <Scene from={22.75} to={27.5} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.2, 1560],
        [3.2, 5.3, 1560],
        [5.3, 8.25, 1560],
        [8.25, 11.85, 1560],
        [11.85, 15.05, 1560],
        [15.05, 17.15, 1560],
        [17.15, 20.45, 1560],
        [20.45, 22.75, 1560],
      ]}
    />
  </AbsoluteFill>
);
