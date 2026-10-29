// V61: "Headlamp fading on a cold morning" in the cinematic illustrated style of C01.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v61.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#0b1222", mid: "#18243e", low: "#2f3b58", sun: [820, 1600], sunR: 1, sunCol: "#2f3b58", glow: "#2f3b58" };
const PREDAWN: Sky = { top: "#141d36", mid: "#3a3f62", low: "#8a6f7a", sun: [760, 1250], sunR: 1, sunCol: "#8a6f7a", glow: "#8a6f7a" };

const SAM: Outfit = {
  ...JAKE,
  skin: "#E0A888",
  skinShade: "#C28668",
  hair: "#2e231c",
  beard: "#2e231c",
  cap: "#2f4a5e",
  capShade: "#223848",
  jacket: "#3E6E8E",
  jacketShade: "#2C5470",
  pants: "#3a3d42",
  pantsShade: "#2a2c30",
  pack: "#7a4a2e",
  packShade: "#5e3822",
};
const GLOVE = "#2b2f33";

const mixCol = (a: string, b: string, k: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return "#" + pa.map((v, i) => Math.round(mix(v, pb[i], k)).toString(16).padStart(2, "0")).join("");
};

// ---------- scenery ----------
const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 11 }, (_, i) => {
      const x = ((((-160 + i * 160 - shift) % 1760) + 1760) % 1760) - 300;
      const h = 420 + (i % 3) * 80;
      return (
        <g key={i}>
          <Pine x={x} y={y + (i % 2) * 20} h={h} c="#2c3f3a" c2="#1f2e2a" />
          <path d={`M${x - h * 0.16},${y - h * 0.32 + (i % 2) * 20} l${h * 0.16},-${h * 0.12} l${h * 0.16},${h * 0.12}`} stroke="#dfe7f0" strokeWidth={6} fill="none" opacity={0.5} />
        </g>
      );
    })}
  </Svg>
);

// Frosty trail: pale ground, white crystals.
const FrostTrail: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={1000} fill="#56645e" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 6} L1480,${y + 110} Q540,${y + 90} -400,${y + 110} Z`} fill="#8f8b80" />
    {Array.from({ length: 40 }, (_, i) => {
      const x = ((((i * 57 - shift) % 2280) + 2280) % 2280) - 400;
      const yy = y - 30 + ((i * 71) % 420);
      return <path key={i} d={`M${x},${yy} l10,-24 l10,24`} stroke="#e6eef6" strokeWidth={4} fill="none" opacity={0.75} />;
    })}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#2a3550" seed={19} drift={t * 10} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={61} base={treeY - 280} amp={340} scale={260} col="#24304a" lit="#c9d3e6" peak={90} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.45} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={67} base={treeY - 120} amp={230} scale={190} col="#1a2433" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.3} />
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

const toScreen = (p: HikerProps, l: [number, number]): [number, number] => [p.x + l[0] * (p.scale ?? 1), p.y + (l[1] - 182) * (p.scale ?? 1)];

// Headlamp strapped over the cap. on = brightness 0..1
const HeadLamp: React.FC<{ p: HikerProps; on: number }> = ({ p, on }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${hx - 26},${hy - 12} Q${hx},${hy - 6} ${hx + 24},${hy - 14}`} stroke="#1d2024" strokeWidth={6} fill="none" />
      <rect x={hx + 16} y={hy - 22} width={16} height={14} rx={4} fill="#1d2024" />
      <rect x={hx + 28} y={hy - 20} width={5} height={10} rx={2} fill={mixCol("#9aa0a6", "#fffbe0", on)} />
      {on > 0.05 && <circle cx={hx + 33} cy={hy - 15} r={9} fill="#fff6c8" opacity={0.6 * on} />}
    </g>
  );
};

// Light cone from a point toward a target on the ground, screen-blended.
const Beam: React.FC<{ from: [number, number]; to: [number, number]; w: number; k: number; id: string }> = ({ from, to, w, k, id }) => {
  if (k <= 0.01) return null;
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
        <path d={`M${from[0]},${from[1]} L${to[0] + nx * w},${to[1] + ny * w} L${to[0] - nx * w},${to[1] - ny * w} Z`} fill={`url(#bm${id})`} filter={`url(#bf${id})`} />
        <ellipse cx={to[0]} cy={to[1]} rx={w * 1.1} ry={w * 0.35} fill="#fff1c0" opacity={0.35 * k} filter={`url(#bf${id})`} />
      </Svg>
    </AbsoluteFill>
  );
};

// Breath clouds in the cold.
const Breath: React.FC<{ p: HikerProps; t: number; flip?: boolean }> = ({ p, t, flip }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const k = (t * 0.5) % 1;
  return (
    <g transform={hikerTransform(p)}>
      <circle cx={hx + (flip ? -1 : 1) * (55 + k * 70)} cy={hy + 10 - k * 24} r={8 + k * 22} fill="#e8eef6" opacity={0.28 * (1 - k)} />
    </g>
  );
};

// Close-up: headlamp on a camp table charging from a USB-C cable, battery bar filling.
const Charging: React.FC<{ t: number; fill: number }> = ({ t, fill }) => (
  <Svg>
    <rect x={-100} y={1240} width={1280} height={800} fill="#5a4636" />
    <rect x={-100} y={1240} width={1280} height={24} fill="#6e5644" />
    <g transform="translate(540,1080)">
      <ellipse cx={0} cy={180} rx={360} ry={50} fill="#000" opacity={0.35} />
      <path d="M-330,40 Q0,-30 330,40 L330,90 Q0,20 -330,90 Z" fill="#1d2024" />
      <rect x={-150} y={-100} width={300} height={230} rx={50} fill="#262a2f" />
      <rect x={-120} y={-70} width={240} height={140} rx={30} fill="#3a3f45" />
      <circle cx={0} cy={0} r={56} fill="#cfd5da" />
      <circle cx={0} cy={0} r={36} fill="#eef2f4" />
      <rect x={120} y={60} width={34} height={22} rx={6} fill="#111" />
      <path d={`M154,71 C300,71 330,200 480,220`} stroke="#e8e8e8" strokeWidth={14} fill="none" strokeLinecap="round" />
      <g transform="translate(-120,-300)">
        <rect x={0} y={0} width={220} height={90} rx={18} fill="none" stroke="#fff" strokeWidth={8} />
        <rect x={222} y={28} width={16} height={34} rx={4} fill="#fff" />
        <rect x={12} y={12} width={196 * fill} height={66} rx={10} fill={fill > 0.95 ? "#3E8E5A" : "#e8c547"} />
        <path d={`M100,22 L84,48 L104,48 L92,72`} stroke="#1d2024" strokeWidth={8} fill="none" opacity={0.5 + 0.5 * Math.sin(t * 6)} />
      </g>
    </g>
  </Svg>
);

// Lamp tucked into an inside pocket: warm dot at the chest.
const PocketLamp: React.FC<{ p: HikerProps; k: number; flip?: boolean }> = ({ p, k }) => {
  const g = hikerGeometry(p);
  const [sx, sy] = g.sh;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      <path d={`M${sx - 4},${sy + 22} l26,0 l-2,34 l-22,0 Z`} fill="#2C5470" stroke="#1f3e54" strokeWidth={3} />
      <rect x={sx} y={sy + 10} width={16} height={14} rx={4} fill="#1d2024" />
      <circle cx={sx + 10} cy={sy + 40} r={34} fill="#ffcf8a" opacity={0.18} />
    </g>
  );
};

// Close-up: gear laid out on a rock, spare flashlight in focus.
const SpareLight: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const s = at(t, [t0, t0 + 0.4], [0.9, 1]);
  return (
    <Svg>
      <ellipse cx={540} cy={1300} rx={700} ry={260} fill="#5d5a4e" />
      <ellipse cx={460} cy={1240} rx={520} ry={150} fill="#7a7566" />
      <g transform={`translate(540,1180) rotate(-12) scale(${s})`}>
        <ellipse cx={0} cy={110} rx={260} ry={34} fill="#000" opacity={0.35} />
        <rect x={-240} y={-48} width={380} height={96} rx={30} fill="#3a3f45" />
        <rect x={130} y={-70} width={110} height={140} rx={24} fill="#262a2f" />
        <ellipse cx={240} cy={0} rx={18} ry={58} fill="#eef2f4" />
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} x={-210 + i * 40} y={-48} width={14} height={96} fill="#2c3035" />
        ))}
        <circle cx={60} cy={-48} r={14} fill="#B5553A" />
      </g>
      <g transform="translate(220,1040) rotate(8)">
        <rect x={-70} y={-40} width={140} height={80} rx={20} fill="#2a2c30" opacity={0.85} />
      </g>
    </Svg>
  );
};

// ============ S1 HOOK: pre-dawn, his beam already weak (0 - 2.6) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: t * 24 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, t / 2.6), rot: hh.rot };
  const g = 1440;
  const ph = t * 5;
  const p: HikerProps = { x: 330 + t * 50, y: g + 40, scale: 2.3, phase: ph, walk: 0.55, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.55) };
  const hd = hikerGeometry(p).head;
  const src = toScreen(p, [hd[0] + 33, hd[1] - 15]);
  const flick = 0.42 + 0.12 * Math.sin(t * 19) + 0.08 * Math.sin(t * 7);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="a" treeY={g - 80} blur={1.5} t={t} />
      <Stars k={0.8} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} shift={cam.x} />
        <Subject rimX={2} col="rgba(170,190,230,0.6)">
          <Person {...p} outfit={SAM} expression="tired" />
          <HeadLamp p={p} on={flick} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Night k={0.5} />
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={[src[0] + 420, g + 80]} w={150} k={flick} id="a" />
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#0a0e10" side="right" />
      </Plane>
      <Particles seed={611} n={20} col="#dfe8ff" fall={20} bokeh={false} />
      <Grade sunX={820} sunY={1500} cool="150,170,220" vignette={0.65} />
      <Title text={"His headlamp\nfaded before\nsunrise"} t={t} t0={0} top={130} size={120} />
    </AbsoluteFill>
  );
};

// ============ S2a WIDE: below freezing, twenty minutes in, dimming (2.6 - 7.0) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: -lt * 18 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 4.4), rot: hh.rot };
  const g = 1470;
  const ph = t * 4.4;
  const walk = at(t, [5.6, 6.4], [0.5, 0]);
  const p: HikerProps = { x: 420 + lt * 30, y: g, scale: 1.5, phase: ph, walk, lean: 0.06, poles: false, handOverride: freeHand(ph, walk) };
  const hd = hikerGeometry(p).head;
  const src = toScreen(p, [hd[0] + 33, hd[1] - 15]);
  const k = at(t, [3, 6.6], [0.6, 0.18]) * (0.9 + 0.1 * Math.sin(t * 21));
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="b" treeY={g - 140} t={t} />
      <Stars k={0.9} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} shift={cam.x} />
        <Subject rimX={2} col="rgba(170,190,230,0.6)">
          <Person {...p} outfit={SAM} expression="neutral" />
          <HeadLamp p={p} on={k} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Night k={0.5} />
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={[src[0] + 330, g + 60]} w={120} k={k} id="b" />
      </Plane>
      <Particles seed={612} n={22} col="#dfe8ff" fall={20} bokeh={false} />
      <Grade sunX={820} sunY={1500} cool="150,170,220" vignette={0.6} />
      <Readout label="AIR TEMP" value="BELOW 32°F / 0°C" ok={false} t={t} t0={2.9} x={80} y={220} pulseAt={3.38} />
      <Chip text="20 minutes in" t={t} t0={4.0} x={80} y={460} icon="none" big />
      <Chip text="Already dimming" t={t} t0={5.91} x={80} y={590} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: cold weakens batteries (7.0 - 8.85) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4, t > 7.3 && t < 7.5 ? 0.6 : 0);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 1.85), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 2330, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.4) * 2 };
  const hd = hikerGeometry(p).head;
  const src = toScreen(p, [hd[0] + 33, hd[1] - 15]);
  const k = 0.2 + 0.06 * Math.sin(t * 23);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="c" treeY={1250} blur={10} t={t} />
      <Stars k={0.6} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col="rgba(170,190,230,0.6)">
          <Person {...p} outfit={SAM} expression="tired" />
          <HeadLamp p={p} on={k} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Night k={0.45} />
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={[1150, 1650]} w={220} k={k} id="c" />
      </Plane>
      <Grade sunX={820} sunY={1500} cool="150,170,220" vignette={0.7} />
      <Readout label="COLD" value="WEAKENS BATTERIES" ok={false} t={t} t0={7.04} x={80} y={240} pulseAt={7.81} />
    </AbsoluteFill>
  );
};

// ============ S3a CLOSE-UP: charge it full the night before (8.85 - 11.7) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: at(lt, [0, 1.2], [-40, 0]) + hh.y, zoom: mix(1.08, 1.02, lt / 2.85), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#1a1410" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 50% at 50% 45%, #6a4a2e 0%, #1a1410 75%)" }} />
      <Plane cam={cam} depth={1}>
        <Charging t={t} fill={at(t, [9.8, 11.3], [0.25, 1])} />
      </Plane>
      <Particles seed={613} n={14} col="#ffe2b0" />
      <Grade sunX={540} sunY={900} warm="255,190,130" vignette={0.6} />
      <Title text={"Charge it full\nthe night before."} t={t} t0={9.81} top={200} size={120} />
    </AbsoluteFill>
  );
};

// ============ S3b MEDIUM: lamp in an inside pocket, close to the body (11.7 - 16.15) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 12 + hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 4.45), rot: hh.rot };
  const g = 1480;
  const reach = at(t, [11.9, 12.6], [0, 1]);
  const p: HikerProps = {
    x: 600,
    y: g,
    scale: 2.3,
    walk: 0,
    lean: 0.04,
    poles: false,
    handOverride: [mix(30, 6, reach), mix(30, -96, reach)],
    breathe: Math.sin(t * 2.2) * 2,
  };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={PREDAWN} uid="d" treeY={g - 100} blur={2.5} t={t} />
      <Stars k={0.4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} shift={cam.x} />
        <Subject rimX={-3} col="rgba(255,206,160,0.7)">
          <Person {...p} outfit={SAM} expression="neutral" flip />
          <g transform={`translate(${2 * p.x},0) scale(-1,1)`}>
            <PocketLamp p={p} k={at(t, [12.4, 12.8], [0, 1])} />
            <Breath p={p} t={t} />
          </g>
        </Subject>
      </Plane>
      <Night k={0.3} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0a0e10" side="left" />
      </Plane>
      <Particles seed={614} n={16} col="#dfe8ff" fall={20} bokeh={false} />
      <Grade sunX={760} sunY={1250} cool="150,170,220" vignette={0.55} />
      <Chip text="Inside pocket" t={t} t0={12.87} x={80} y={240} icon="check" big />
      <Chip text="Close to your body" t={t} t0={13.63} x={80} y={370} icon="check" big />
      <Chip text="Until you need it" t={t} t0={14.91} x={80} y={500} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3c CLOSE-UP: always carry a backup light (16.15 - 18.2) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: -lt * 10 + hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 2.05), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={PREDAWN} uid="e" treeY={1200} blur={11} t={t} />
      <Plane cam={cam} depth={1}>
        <SpareLight t={t} t0={16.2} />
      </Plane>
      <Night k={0.25} />
      <Plane cam={cam} depth={1.7} blur={16}>
        <FrameLeaves col="#0a0e10" side="right" />
      </Plane>
      <Particles seed={615} n={12} col="#dfe8ff" fall={20} bokeh={false} />
      <Grade sunX={760} sunY={1250} cool="150,170,220" vignette={0.6} />
      <Title text={"Carry a\nbackup light."} t={t} t0={16.34} top={200} size={130} />
    </AbsoluteFill>
  );
};

// ============ S4a MEDIUM: next cold morning, gloves on, sensor mode on (18.2 - 21.1) ============
const S4a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 16 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.9), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 430, y: g + 40, scale: 2.3, walk: 0, lean: 0.05, poles: false, handOverride: [40, 26], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NIGHT} uid="f" treeY={g - 80} blur={2.5} t={t} />
      <Stars k={0.8} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} shift={cam.x} />
        <Subject rimX={2} col="rgba(170,190,230,0.6)">
          <Person {...p} outfit={{ ...SAM, glove: GLOVE }} expression="neutral" />
          <HeadLamp p={p} on={0} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Night k={0.5} />
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#0a0e10" side="right" />
      </Plane>
      <Particles seed={616} n={18} col="#dfe8ff" fall={20} bokeh={false} />
      <Grade sunX={820} sunY={1500} cool="150,170,220" vignette={0.6} />
      <Chip text="Gloves on" t={t} t0={19.28} x={80} y={240} icon="check" big />
      <Chip text="Sensor mode on" t={t} t0={19.99} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4b PAYOFF CLOSE-UP: one wave of the hand, light on (21.1 - 24.35) ============
const S4b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const on = at(t, [22.75, 22.95], [0, 1]);
  const hh = handheld(t, 0.4, t > 22.75 && t < 22.95 ? 0.5 : 0);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 3.25), rot: hh.rot };
  const wave = at(t, [21.4, 21.8, 22.3, 22.7], [0, 1, 1, 0]);
  const sway = Math.sin(t * 9) * 16 * wave;
  const p: HikerProps = {
    x: 430,
    y: 2330,
    scale: 4.4,
    walk: 0,
    lean: 0.04,
    poles: false,
    handOverride: [mix(30, 70, wave) + sway, mix(30, -150, wave)],
    breathe: Math.sin(t * 2.2) * 2,
  };
  const hd = hikerGeometry(p).head;
  const src = toScreen(p, [hd[0] + 33, hd[1] - 15]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={skyMixNP(on)} uid="g" treeY={1250} blur={9} t={t} />
      <Stars k={0.7} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col={on > 0.5 ? "rgba(255,230,170,0.75)" : "rgba(170,190,230,0.6)"}>
          <Person {...p} outfit={{ ...SAM, glove: GLOVE }} expression={on > 0.5 ? "happy" : "neutral"} />
          <HeadLamp p={p} on={on} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Night k={0.45 - on * 0.1} />
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={[1200, 1600]} w={280} k={on} id="g" />
      </Plane>
      <Particles seed={617} n={18} col="#fff3d6" />
      <Grade sunX={900} sunY={1400} warm="255,220,160" vignette={0.6} />
      <Chip text="One wave" t={t} t0={21.38} x={80} y={240} icon="none" big />
      <Readout label="LIGHT" value="ON" ok={true} t={t} t0={22.8} x={80} y={370} pulseAt={23.3} />
    </AbsoluteFill>
  );
};
const skyMixNP = (k: number): Sky => ({ ...NIGHT, mid: mixCol(NIGHT.mid, PREDAWN.mid, k * 0.4), low: mixCol(NIGHT.low, PREDAWN.low, k * 0.4) });

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
      save="Save this before your next early start"
    />
  );
};

export const V61: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.65} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={2.6} to={7.05} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={2.6} />
    </Scene>
    <Scene from={7.0} to={8.9} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={7.0} />
    </Scene>
    <Scene from={8.85} to={11.75} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={8.85} />
    </Scene>
    <Scene from={11.7} to={16.2} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={11.7} />
    </Scene>
    <Scene from={16.15} to={18.25} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={16.15} />
    </Scene>
    <Scene from={18.2} to={21.15} fadeIn={0.1} fadeOut={0.1}>
      <S4a off={18.2} />
    </Scene>
    <Scene from={21.1} to={24.4} fadeIn={0.12} fadeOut={0.12}>
      <S4b off={21.1} />
    </Scene>
    <Scene from={24.25} to={29.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.6, 1560],
        [2.6, 7.0, 1560],
        [7.0, 8.85, 1560],
        [8.85, 11.7, 1560],
        [11.7, 16.15, 1560],
        [16.15, 18.2, 1560],
        [18.2, 21.1, 1560],
        [21.1, 24.25, 1560],
      ]}
    />
  </AbsoluteFill>
);
