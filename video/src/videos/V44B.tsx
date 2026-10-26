// V44B: v44 "Phone flashlight drains the map" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v44b.json";

const words = vo.words as unknown as Word[];

const DUSK: Sky = { top: "#2e3f66", mid: "#b27a68", low: "#eba374", sun: [760, 1180], sunR: 56, sunCol: "#ffe0b0", glow: "#ff8f50" };
const NIGHT: Sky = { top: "#0b1222", mid: "#16213a", low: "#2c3852", sun: [820, 1600], sunR: 1, sunCol: "#2c3852", glow: "#2c3852" };

const SAM: Outfit = {
  ...JAKE,
  skin: "#8d5a3e",
  skinShade: "#734631",
  hair: "#1d1612",
  beard: "#1d1612",
  cap: "#3a4a5a",
  capShade: "#2a3644",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#3a3d42",
  pantsShade: "#2a2c30",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e", "#e0b040"];

const mixCol = (a: string, b: string, k: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return "#" + pa.map((v, i) => Math.round(mix(v, pb[i], k)).toString(16).padStart(2, "0")).join("");
};
const skyMix = (a: Sky, b: Sky, k: number): Sky => ({
  top: mixCol(a.top, b.top, k),
  mid: mixCol(a.mid, b.mid, k),
  low: mixCol(a.low, b.low, k),
  sun: [mix(a.sun[0], b.sun[0], k), mix(a.sun[1], b.sun[1], k)],
  sunR: mix(a.sunR, b.sunR, k),
  sunCol: mixCol(a.sunCol, b.sunCol, k),
  glow: mixCol(a.glow, b.glow, k),
});

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

// Phone in the near hand, screen facing out, small torch dot.
const HandPhone: React.FC<{ p: HikerProps; on: number }> = ({ p, on }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] - 4},${h[1] - 50}) rotate(-8)`}>
        <rect x={0} y={0} width={30} height={56} rx={5} fill="#1b1f23" />
        <rect x={2.5} y={3} width={25} height={50} rx={3} fill="#6f8a9a" />
        <path d="M6,44 Q12,30 18,26 T25,10" stroke="#B5553A" strokeWidth={2.5} fill="none" />
        {on > 0 && <circle cx={27} cy={8} r={6} fill="#fff6c8" />}
      </g>
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

const Rocks: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y - 40} width={1880} height={1000} fill="#5d5a4e" />
    {[[-80, 70, 160], [260, 40, 120], [600, 60, 180], [940, 30, 140]].map(([x, dy, r], i) => (
      <g key={i}>
        <ellipse cx={x} cy={y + dy} rx={r} ry={r * 0.45} fill="#7a7566" />
        <ellipse cx={x - r * 0.2} cy={y + dy - r * 0.12} rx={r * 0.6} ry={r * 0.2} fill="#8f8a7a" />
      </g>
    ))}
  </Svg>
);

// Big phone close-up: trail map with a red battery warning.
const BigPhone: React.FC<{ t: number; pct: number; warn: number }> = ({ t, pct, warn }) => (
  <Svg>
    <g transform="translate(540,1000) rotate(-4)">
      <ellipse cx={-30} cy={420} rx={260} ry={150} fill="#734631" />
      <rect x={-250} y={-470} width={500} height={920} rx={60} fill="#15181b" />
      <rect x={-226} y={-440} width={452} height={860} rx={40} fill="#5f7a6a" />
      <path d="M-226,-200 Q-60,-260 60,-120 T226,-60 L226,420 L-226,420 Z" fill="#6d8a74" />
      <path d="M-160,360 Q-120,160 -20,120 T60,-100 T150,-330" stroke="#B5553A" strokeWidth={14} fill="none" strokeDasharray="30 18" />
      <circle cx={-20} cy={120} r={22} fill="#3a78d8" stroke="#fff" strokeWidth={6} />
      <rect x={-226} y={-440} width={452} height={80} rx={40} fill="#1f2a24" opacity={0.85} />
      <g transform="translate(110,-400)">
        <rect x={0} y={-18} width={80} height={36} rx={8} fill="none" stroke={warn > 0.5 ? "#ff5a4a" : "#fff"} strokeWidth={5} />
        <rect x={82} y={-8} width={8} height={16} rx={2} fill={warn > 0.5 ? "#ff5a4a" : "#fff"} />
        <rect x={6} y={-12} width={68 * pct} height={24} rx={4} fill={warn > 0.5 ? "#ff5a4a" : "#fff"} opacity={warn > 0.5 ? 0.6 + 0.4 * Math.sin(t * 10) : 1} />
      </g>
      <text x={-190} y={-388} fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#fff">MAP</text>
    </g>
  </Svg>
);

// ============ S1 HOOK: still on the trail as the sun goes down (0 - 3.05) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: t * 26 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 3), rot: hh.rot };
  const g = 1440;
  const ph = t * 5.4;
  const dark = at(t, [0.5, 3], [0.15, 0.45]);
  const p: HikerProps = { x: 330 + t * 70, y: g + 40, scale: 1.9, phase: ph, walk: 0.7, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={skyMix(DUSK, NIGHT, dark * 0.6)} uid="a" treeY={g - 60} t={t} dark={dark * 0.6} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject col="rgba(255,170,110,0.85)">
          <Person {...p} outfit={SAM} expression="neutral" />
        </Subject>
      </Plane>
      <Night k={dark * 0.5} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1a120c" side="right" />
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.16} col="255,170,110" />
      <Particles seed={91} n={20} leaves={LEAVES} fall={40} />
      <Grade sunX={760} sunY={1180} warm="255,150,90" />
      <Title text={"His flashlight\nwas also\nhis map"} t={t} t0={0} top={130} size={120} />
    </AbsoluteFill>
  );
};

// ============ S2a CLOSE-UP: he switches on his phone flashlight (3.0 - 5.05) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const on = at(t, [4.2, 4.35], [0, 1]);
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2), rot: hh.rot };
  const p: HikerProps = { x: 430, y: 2330, scale: 4.4, walk: 0, lean: 0.14, poles: false, handOverride: [60, -30], breathe: Math.sin(t * 2.2) * 2 };
  const h = hikerGeometry(p).arms[1].hand;
  const src = toScreen(p, [h[0] + 23, h[1] - 42]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="b" treeY={1250} blur={9} t={t} dark={1} />
      <Stars k={0.7} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col="rgba(170,190,230,0.6)">
          <Person {...p} outfit={SAM} expression="neutral" />
          <HandPhone p={p} on={on} />
        </Subject>
      </Plane>
      <Night k={0.55} />
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={[1100, 1700]} w={260} k={on} id="a" />
      </Plane>
      <Grade sunX={820} sunY={1500} warm="200,200,255" vignette={0.7} />
      <Chip text="Phone flashlight" t={t} t0={3.92} x={80} y={240} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2b MEDIUM: one hand on the phone, one on the rocks, cold drains it (5.0 - 9.75) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6, t > 6.4 && t < 6.6 ? 0.7 : 0);
  const cam: Cam = { x: lt * 18 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 4.75), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 440 + lt * 22, y: g + 60, scale: 2.3, walk: 0.15, phase: t * 2, lean: 0.32, poles: false, handOverride: [70, -20], breathe: Math.sin(t * 2.5) * 2 };
  const h = hikerGeometry(p).arms[1].hand;
  const src = toScreen(p, [h[0] + 23, h[1] - 42]);
  const flick = 0.85 + 0.15 * Math.sin(t * 23);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="c" treeY={g - 80} blur={2.5} t={t} dark={1} />
      <Stars k={0.8} />
      <Plane cam={cam} depth={1}>
        <Rocks y={g} />
        <Subject rimX={2} col="rgba(170,190,230,0.6)">
          <Person {...p} outfit={SAM} expression="tired" />
          <HandPhone p={p} on={1} />
        </Subject>
      </Plane>
      <Night k={0.6} />
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={[src[0] + 360, g + 140]} w={170} k={flick * at(t, [7.9, 9.5], [1, 0.55])} id="b" />
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#0c0a08" side="left" />
      </Plane>
      <Particles seed={92} n={14} col="#cfd8ff" />
      <Grade sunX={820} sunY={1500} warm="200,200,255" vignette={0.7} />
      <Chip text="One hand on the phone" t={t} t0={5.05} x={80} y={240} icon="x" big />
      <Chip text="One on the rocks" t={t} t0={6.41} x={80} y={370} icon="x" big />
      <Chip text="Cold drains the battery" t={t} t0={7.89} x={80} y={500} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2c CLOSE-UP: twenty percent, his map and his call are dying (9.7 - 14.1) ============
const S2c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const pct = at(t, [9.7, 10.4], [0.35, 0.2]);
  const hh = handheld(t, 0.4, t > 10.3 && t < 10.5 ? 0.6 : 0);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.12, lt / 4.4), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="d" treeY={1200} blur={12} t={t} dark={1} />
      <Stars k={0.6} />
      <Plane cam={cam} depth={1}>
        <BigPhone t={t} pct={pct} warn={t > 10.3 ? 1 : 0} />
      </Plane>
      <Grade sunX={540} sunY={1000} warm="200,200,255" vignette={0.75} />
      <Readout label="BATTERY" value="20%" ok={false} t={t} t0={9.79} x={80} y={200} pulseAt={10.34} />
      <Chip text="His map" t={t} t0={10.96} x={620} y={240} icon="x" big />
      <Chip text="His only call" t={t} t0={12.16} x={560} y={370} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a CLOSE-UP: here's the fix, a separate light (14.05 - 16.4) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const on = at(t, [15.4, 15.55], [0, 1]);
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 6 + hh.x, y: at(lt, [0, 1.2], [-40, 0]) + hh.y, zoom: mix(1.1, 1.04, lt / 2.35), rot: hh.rot };
  const p: HikerProps = { x: 430, y: 2330, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.2) * 2 };
  const hd = hikerGeometry(p).head;
  const src = toScreen(p, [hd[0] + 33, hd[1] - 15]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="e" treeY={1250} blur={9} t={t} dark={1} />
      <Stars k={0.7} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col="rgba(170,190,230,0.6)">
          <Person {...p} outfit={SAM} expression="happy" />
          <HeadLamp p={p} k={at(t, [14.6, 14.9], [0, 1])} on={on} />
        </Subject>
      </Plane>
      <Night k={0.5} />
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={[1250, 1500]} w={260} k={on} id="c" />
      </Plane>
      <Grade sunX={820} sunY={1500} warm="220,210,255" vignette={0.65} />
      <Title text={"Carry a\nseparate light."} t={t} t0={14.92} top={200} size={130} />
    </AbsoluteFill>
  );
};

// ============ S3b MEDIUM: both hands free, the trail lit ahead (16.35 - 19.95) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.6), rot: hh.rot };
  const g = 1460;
  const ph = t * 5;
  const p: HikerProps = { x: 330 + lt * 45, y: g + 40, scale: 2.3, phase: ph, walk: 0.6, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.6) };
  const hd = hikerGeometry(p).head;
  const src = toScreen(p, [hd[0] + 33, hd[1] - 15]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="f" treeY={g - 80} blur={2.5} t={t} dark={1} />
      <Stars k={0.8} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject rimX={2} col="rgba(170,190,230,0.6)">
          <Person {...p} outfit={SAM} expression="happy" />
          <HeadLamp p={p} k={1} on={1} />
        </Subject>
      </Plane>
      <Night k={0.55} />
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={[src[0] + 520, g + 70]} w={200} k={1} id="d" />
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#0c0a08" side="right" />
      </Plane>
      <Particles seed={93} n={16} col="#cfd8ff" />
      <Grade sunX={820} sunY={1500} warm="220,210,255" vignette={0.6} />
      <Chip text="Both hands free" t={t} t0={17.27} x={80} y={240} icon="check" big />
      <Chip text="Trail lit ahead" t={t} t0={18.43} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: the phone stays for the map and emergencies (19.9 - 23.05) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 8 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.04]), rot: hh.rot };
  const p: HikerProps = { x: 430, y: 2330, scale: 4.4, walk: 0, lean: 0.14, poles: false, handOverride: [60, -30], breathe: Math.sin(t * 2.2) * 2 };
  const hd = hikerGeometry(p).head;
  const src = toScreen(p, [hd[0] + 33, hd[1] - 15]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="g" treeY={1250} blur={9} t={t} dark={1} />
      <Stars k={0.8} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col="rgba(255,230,170,0.7)">
          <Person {...p} outfit={SAM} expression="happy" />
          <HeadLamp p={p} k={1} on={1} />
          <HandPhone p={p} on={0} />
        </Subject>
      </Plane>
      <Night k={0.45} />
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={[1150, 1650]} w={240} k={0.9} id="e" />
      </Plane>
      <Particles seed={94} n={18} col="#fff3d6" />
      <Grade sunX={900} sunY={1400} warm="255,220,160" vignette={0.6} />
      <Chip text="Phone: map + emergencies" t={t} t0={19.98} x={80} y={240} icon="check" big />
      <Readout label="BATTERY" value="SAVED" ok={true} t={t} t0={21.45} x={80} y={370} pulseAt={21.95} />
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
      spec="RECHARGEABLE USB-C · WIDE BEAM"
      name={
        <>
          Motion-Sensor
          <br />
          Headlamp
        </>
      }
      nameSize={84}
      price="from $16.99"
      save="Save this before your next fall hike"
    />
  );
};

export const V44B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.05} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.0} to={5.05} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={3.0} />
    </Scene>
    <Scene from={5.0} to={9.75} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={5.0} />
    </Scene>
    <Scene from={9.7} to={14.1} fadeIn={0.1} fadeOut={0.1}>
      <S2c off={9.7} />
    </Scene>
    <Scene from={14.05} to={16.4} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={14.05} />
    </Scene>
    <Scene from={16.35} to={19.95} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={16.35} />
    </Scene>
    <Scene from={19.9} to={23.05} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={19.9} />
    </Scene>
    <Scene from={22.9} to={27.5} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.0, 1560],
        [3.0, 5.0, 1560],
        [5.0, 9.7, 1560],
        [9.7, 14.05, 1560],
        [14.05, 16.35, 1560],
        [16.35, 19.9, 1560],
        [19.9, 22.9, 1560],
      ]}
    />
  </AbsoluteFill>
);
