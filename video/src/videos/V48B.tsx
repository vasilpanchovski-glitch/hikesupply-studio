// V48B: v48 "Gloves off for a light switch" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v48b.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#0b1222", mid: "#16213a", low: "#2c3852", sun: [820, 1600], sunR: 1, sunCol: "#2c3852", glow: "#2c3852" };

const JEN: Outfit = {
  ...JAKE,
  skin: "#E3B494",
  skinShade: "#C69574",
  hair: "#2b1d16",
  beard: null,
  ponytail: "#2b1d16",
  cap: "#3a4a5a",
  capShade: "#2a3644",
  jacket: "#3E7A6A",
  jacketShade: "#2E5E51",
  pants: "#3a3d42",
  pantsShade: "#2a2c30",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};
const JEN_GLOVES: Outfit = { ...JEN, glove: "#2E3438" };
const FIRST: Sky = { top: "#22355a", mid: "#7c6f8c", low: "#e8b48a", sun: [300, 1180], sunR: 58, sunCol: "#ffe2b0", glow: "#ffb46b" };
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e", "#e0b040"];

const mixCol = (a: string, b: string, k: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return "#" + pa.map((v, i) => Math.round(mix(v, pb[i], k)).toString(16).padStart(2, "0")).join("");
};

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

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; dark?: number }> = ({ cam, sky, uid, treeY, blur = 0, t, dark = 0 }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col={mixCol("#ffffff", "#2a3550", dark)} seed={9} drift={t * 10} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={83} base={treeY - 280} amp={340} scale={260} col={mixCol("#93a3b8", "#1e2a40", dark)} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.6 * (1 - dark * 0.6)} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={89} base={treeY - 120} amp={230} scale={190} col={mixCol("#6f8577", "#16202f", dark)} />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.4 * (1 - dark * 0.6)} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Night: React.FC<{ k: number }> = ({ k }) => (k <= 0 ? null : <AbsoluteFill style={{ background: `rgba(8,14,32,${0.62 * k})` }} />);

const Stars: React.FC<{ k: number }> = ({ k }) =>
  k <= 0 ? null : (
    <Svg>
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={(i * 263) % 1080} cy={80 + ((i * 151) % 700)} r={1.5 + (i % 3)} fill="#f4f1e6" opacity={k * (0.5 + (i % 4) * 0.12)} />
      ))}
    </Svg>
  );

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Local hiker point -> screen point (no slope, no flip).
const toScreen = (p: HikerProps, l: [number, number]): [number, number] => [p.x + l[0] * (p.scale ?? 1), p.y + (l[1] - 182) * (p.scale ?? 1)];

// Headlamp strapped over the cap.
const HeadLamp: React.FC<{ p: HikerProps; k: number; on: number }> = ({ p, k, on }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      <path d={`M${hx - 26},${hy - 12} Q${hx},${hy - 6} ${hx + 24},${hy - 14}`} stroke="#1d2024" strokeWidth={6} fill="none" />
      <rect x={hx + 16} y={hy - 22} width={16} height={14} rx={4} fill="#1d2024" />
      <rect x={hx + 28} y={hy - 20} width={5} height={10} rx={2} fill={on > 0 ? "#fffbe0" : "#9aa0a6"} />
      {on > 0 && <circle cx={hx + 33} cy={hy - 15} r={9} fill="#fff6c8" opacity={0.6 * on} />}
    </g>
  );
};

// Light cone from a point toward a target on the ground, screen-blended.
const Beam: React.FC<{ from: [number, number]; to: [number, number]; w: number; k: number; id: string }> = ({ from, to, w, k, id }) => {
  if (k <= 0) return null;
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const L = Math.hypot(dx, dy);
  const nx = -dy / L;
  const ny = dx / L;
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen" }}>
      <Svg>
        <defs>
          <linearGradient id={`bm${id}`} gradientUnits="userSpaceOnUse" x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]}>
            <stop offset="0" stopColor="#fff4c8" stopOpacity={0.85 * k} />
            <stop offset="1" stopColor="#fff4c8" stopOpacity={0.05 * k} />
          </linearGradient>
          <filter id={`bf${id}`}>
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        <path
          d={`M${from[0]},${from[1]} L${to[0] + nx * w},${to[1] + ny * w} L${to[0] - nx * w},${to[1] - ny * w} Z`}
          fill={`url(#bm${id})`}
          filter={`url(#bf${id})`}
        />
        <ellipse cx={to[0]} cy={to[1]} rx={w * 1.1} ry={w * 0.35} fill="#fff1c0" opacity={0.35 * k} filter={`url(#bf${id})`} />
      </Svg>
    </AbsoluteFill>
  );
};

// Frost on the ground.
const Frost: React.FC<{ y: number; k?: number }> = ({ y, k = 1 }) => (
  <Svg>
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 6} L1480,${y + 10} Q540,${y - 8} -400,${y + 10} Z`} fill="#e9eef4" opacity={0.7 * k} />
    {Array.from({ length: 40 }, (_, i) => (
      <circle key={i} cx={-300 + ((i * 97) % 1700)} cy={y + 30 + ((i * 53) % 600)} r={3 + (i % 3)} fill="#eef3f8" opacity={0.75 * k} />
    ))}
  </Svg>
);

// Close-up prop: the headlamp charging on USB-C, then a spare light beside it.
const LampCharge: React.FC<{ t: number; t0: number; tSpare: number }> = ({ t, t0, tSpare }) => {
  const fill = at(t, [t0 + 0.3, t0 + 2.2], [0.2, 1]);
  const spare = at(t, [tSpare, tSpare + 0.4], [0, 1]);
  return (
    <Svg>
      <g transform="translate(-40,-260) scale(1.08)">
      <rect x={-200} y={1150} width={1480} height={1200} fill="#4a3a2c" />
      <rect x={-200} y={1150} width={1480} height={30} fill="#5c4a38" />
      {/* strap */}
      <ellipse cx={500} cy={1130} rx={330} ry={90} fill="none" stroke="#1d2024" strokeWidth={36} />
      {/* lamp body with COB strip */}
      <g transform="translate(500,1010)">
        <rect x={-210} y={-90} width={420} height={150} rx={40} fill="#1d2024" />
        <rect x={-180} y={-60} width={360} height={52} rx={18} fill="#e9e3c8" />
        <circle cx={0} cy={36} r={20} fill="#9aa0a6" />
        {/* battery bar */}
        <rect x={-120} y={-150} width={240} height={40} rx={10} fill="none" stroke="#ffffff" strokeWidth={6} />
        <rect x={-112} y={-142} width={224 * fill} height={24} rx={6} fill={fill > 0.95 ? "#5fc77a" : "#ffffff"} />
      </g>
      {/* USB-C cable */}
      <path d="M700,1040 C860,1060 900,1260 1180,1300" stroke="#e8e8e8" strokeWidth={16} fill="none" />
      <rect x={692} y={1024} width={40} height={30} rx={8} fill="#cfcfcf" />
      {/* spare light */}
      <g opacity={spare} transform={`translate(${mix(260, 200, spare)},1330) rotate(-12)`}>
        <rect x={-30} y={-110} width={60} height={200} rx={20} fill="#3E7A6A" />
        <rect x={-38} y={-150} width={76} height={50} rx={14} fill="#2E5E51" />
        <circle cx={0} cy={-150} r={26} fill="#fff6c8" opacity={0.9} />
      </g>
      </g>
    </Svg>
  );
};

// ============ S1 HOOK: 5 a.m., frosty trailhead (0 - 2.7) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: t * 14 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 2.7), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 330, y: g + 40, scale: 2.3, walk: 0, lean: 0.06, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="a" treeY={g - 80} blur={1.5} t={t} dark={1} />
      <Stars k={0.9} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Frost y={g} />
        <Subject rimX={2} col="rgba(170,190,230,0.6)">
          <Car x={820} y={g + 50} s={2.0} body="#4E6B8A" shade="#3a536c" flip />
          <Person {...p} outfit={JEN_GLOVES} expression="neutral" />
          <HeadLamp p={p} k={1} on={0} />
        </Subject>
      </Plane>
      <Night k={0.45} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#07080c" side="right" />
      </Plane>
      <Particles seed={101} n={18} col="#dfe6ff" fall={20} />
      <Grade sunX={820} sunY={1500} warm="220,210,255" vignette={0.6} />
      <Title text={"She took off her\ngloves for a light"} t={t} t0={0} top={130} size={104} />
      <Chip text="5:00 a.m." t={t} t0={0.53} x={80} y={420} icon="none" big />
      <Chip text="Frosty trailhead" t={t} t0={1.36} x={80} y={550} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2a CLOSE-UP: gloves off, hunting for the tiny button (2.65 - 6.4) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const bare = t >= 3.6;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.13, lt / 3.75), rot: hh.rot };
  const fumble = Math.sin(t * 9) * 6;
  const p: HikerProps = { x: 470, y: 2330, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: bare ? [44 + fumble * 0.3, -150 + fumble * 0.4] : [30, 30], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="b" treeY={1250} blur={9} t={t} dark={1} />
      <Stars k={0.6} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col="rgba(170,190,230,0.6)">
          <Person {...p} outfit={bare ? JEN : JEN_GLOVES} expression={bare ? "tired" : "neutral"} />
          <HeadLamp p={p} k={1} on={0} />
        </Subject>
      </Plane>
      <Night k={0.35} />
      <Particles seed={102} n={14} col="#dfe6ff" fall={20} />
      <Grade sunX={820} sunY={1500} warm="220,210,255" vignette={0.65} />
      <Chip text="Gloves off" t={t} t0={3.66} x={80} y={240} icon="x" big />
      <Chip text="Tiny button" t={t} t0={4.71} x={80} y={370} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b MEDIUM: light on at last, fingers numb (6.35 - 11.2) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const on = at(t, [7.6, 7.7], [0, 1]);
  const hh = handheld(t, 0.5);
  const shiver = Math.sin(t * 46) * 1.8;
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 4.85), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 400 + shiver, y: g + 40, scale: 2.3, walk: 0, lean: 0.14, poles: false, handOverride: on > 0 ? [24, 0] : [44, -150], breathe: Math.sin(t * 4) * 2 };
  const hd = hikerGeometry(p).head;
  const src = toScreen(p, [hd[0] + 33, hd[1] - 15]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="c" treeY={g - 80} blur={2.5} t={t} dark={1} />
      <Stars k={0.8} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Frost y={g} />
        <Subject rimX={2} col="rgba(170,190,230,0.6)">
          <Person {...p} outfit={JEN} expression="tired" />
          <HeadLamp p={p} k={1} on={on} />
        </Subject>
      </Plane>
      <Night k={0.5} />
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={[src[0] + 480, g + 70]} w={190} k={on} id="b" />
      </Plane>
      <Particles seed={103} n={16} col="#dfe6ff" fall={20} />
      <Grade sunX={820} sunY={1500} warm="220,210,255" vignette={0.6} />
      <Readout label="FINGERS" value="NUMB" ok={false} t={t} t0={7.92} x={80} y={240} pulseAt={8.63} />
      <Chip text="Hike not started yet" t={t} t0={9.39} x={80} y={470} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: the fix, keep your gloves on (11.15 - 13.5) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 8 + hh.x, y: at(lt, [0, 1.2], [-40, 0]) + hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.05]), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 520, y: g + 40, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="d" treeY={g - 80} blur={2.5} t={t} dark={1} />
      <Stars k={0.8} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Frost y={g} />
        <Subject rimX={2} col="rgba(170,190,230,0.6)">
          <Person {...p} outfit={JEN_GLOVES} expression="happy" />
          <HeadLamp p={p} k={1} on={0} />
        </Subject>
      </Plane>
      <Night k={0.4} />
      <Particles seed={104} n={16} col="#dfe6ff" fall={20} />
      <Grade sunX={820} sunY={1500} warm="220,210,255" vignette={0.6} />
      <Title text={"Keep your\ngloves on."} t={t} t0={11.91} top={200} size={140} />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: wave on, wave off (13.45 - 17.6) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 4.15), rot: hh.rot };
  // two waves: on at 15.25, off at 16.9 (after "on and off")
  const wave1 = at(t, [14.7, 15.0, 15.25, 15.5], [0, 1, 1, 0]);
  const wave2 = at(t, [16.3, 16.6, 16.9, 17.15], [0, 1, 1, 0]);
  const w = Math.max(wave1, wave2);
  const on = t >= 15.25 && t < 16.9 ? 1 : 0;
  const p: HikerProps = { x: 430, y: 2330, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: [mix(30, 70, w) + Math.sin(t * 14) * 10 * w, mix(30, -150, w)], breathe: Math.sin(t * 2.2) * 2 };
  const hd = hikerGeometry(p).head;
  const src = toScreen(p, [hd[0] + 33, hd[1] - 15]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="e" treeY={1250} blur={9} t={t} dark={1} />
      <Stars k={0.7} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col="rgba(170,190,230,0.6)">
          <Person {...p} outfit={JEN_GLOVES} expression="happy" />
          <HeadLamp p={p} k={1} on={on} />
        </Subject>
      </Plane>
      <Night k={0.45} />
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={[1250, 1500]} w={260} k={on} id="c" />
      </Plane>
      <Grade sunX={820} sunY={1500} warm="220,210,255" vignette={0.65} />
      <Chip text="Motion sensor" t={t} t0={13.81} x={80} y={240} icon="check" big />
      <Chip text="Wave on, wave off" t={t} t0={15.12} x={80} y={370} icon="check" big />
      <Chip text="Gloves stay on" t={t} t0={16.47} x={80} y={500} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3c CLOSE-UP: charge it the night before, pack a spare (17.55 - 21.7) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 4.15), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 80% 60% at 50% 45%, #3a3f52 0%, #16192a 80%)" }}>
      <Plane cam={cam} depth={1}>
        <LampCharge t={t} t0={17.65} tSpare={19.49} />
      </Plane>
      <Particles seed={105} n={12} col="#ffe7b8" />
      <Grade sunX={540} sunY={900} warm="255,210,160" vignette={0.6} />
      <Chip text="Charge it the night before" t={t} t0={17.65} x={80} y={240} icon="check" big />
      <Chip text="Spare light on longer hikes" t={t} t0={19.49} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: first light, Jen started warm (21.65 - 23.45) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.04]), rot: hh.rot };
  const g = 1460;
  const ph = t * 5;
  const p: HikerProps = { x: 330 + lt * 60, y: g + 40, scale: 2.3, phase: ph, walk: 0.6, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.6) };
  const hd = hikerGeometry(p).head;
  const src = toScreen(p, [hd[0] + 33, hd[1] - 15]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={FIRST} uid="g" treeY={g - 80} t={t} dark={0.35} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Frost y={g} k={0.6} />
        <Subject rimX={-5} col="rgba(255,200,140,0.85)">
          <Person {...p} outfit={JEN_GLOVES} expression="happy" />
          <HeadLamp p={p} k={1} on={1} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={[src[0] + 480, g + 70]} w={190} k={0.7} id="g" />
      </Plane>
      <Rays x={FIRST.sun[0]} y={FIRST.sun[1]} strength={0.28} col="255,200,150" />
      <Particles seed={107} n={20} col="#ffe7b8" />
      <Grade sunX={300} sunY={1180} warm="255,180,110" />
      <Title text={"She started\nwarm."} t={t} t0={off + 0.1} top={170} size={140} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/motion-sensor-rechargeable-headlamp-cut.png"
      cutoutH={700}
      spec="MOTION SENSOR · USB-C RECHARGEABLE"
      name={
        <>
          Motion-Sensor
          <br />
          Headlamp
        </>
      }
      nameSize={84}
      price="from $16.99"
      save="Save this for early starts"
    />
  );
};

export const V48B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.7} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={2.65} to={6.4} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={2.65} />
    </Scene>
    <Scene from={6.35} to={11.2} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={6.35} />
    </Scene>
    <Scene from={11.15} to={13.5} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={11.15} />
    </Scene>
    <Scene from={13.45} to={17.6} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={13.45} />
    </Scene>
    <Scene from={17.55} to={21.7} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={17.55} />
    </Scene>
    <Scene from={21.65} to={23.45} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={21.65} />
    </Scene>
    <Scene from={23.35} to={28} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.65, 1560],
        [2.65, 6.35, 1560],
        [6.35, 11.15, 1560],
        [11.15, 13.45, 1560],
        [13.45, 17.55, 1560],
        [17.55, 21.65, 1560],
        [21.65, 23.35, 1560],
      ]}
    />
  </AbsoluteFill>
);
