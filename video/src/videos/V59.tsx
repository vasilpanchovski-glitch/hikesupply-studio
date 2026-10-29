// V59: "Headlamp glare at camp" in the cinematic illustrated style of C01.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v59.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#0b1222", mid: "#1b2440", low: "#3a3450", sun: [820, 1600], sunR: 1, sunCol: "#3a3450", glow: "#3a3450" };

const LEO: Outfit = {
  ...JAKE,
  skin: "#E0A888",
  skinShade: "#C28668",
  hair: "#3a2a1e",
  beard: "#3a2a1e",
  cap: "#4a5a3a",
  capShade: "#38462c",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#3a3d42",
  pantsShade: "#2a2c30",
  pack: "#3E4F5C",
  packShade: "#2C3943",
};
const NIA: Outfit = {
  ...GUIDE,
  skin: "#A8714F",
  skinShade: "#8C5A3C",
  hair: "#1f1712",
  ponytail: "#1f1712",
  beard: null,
  cap: "#C9B48E",
  capShade: "#A8946F",
  jacket: "#2F7F86",
  jacketShade: "#256870",
  pants: "#4A4E55",
  pantsShade: "#363A40",
};
const BEN: Outfit = {
  ...JAKE,
  skin: "#EBC0A0",
  skinShade: "#CFA07E",
  hair: "#b07a3c",
  beard: null,
  cap: "#2f4a5e",
  capShade: "#223848",
  jacket: "#6E7B3A",
  jacketShade: "#56612c",
};

const LEAVES = ["#b5553a", "#c98a3a", "#8e3f2a", "#d9a34a"];

// ---------- scenery ----------
const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 11 }, (_, i) => {
      const x = ((((-160 + i * 160 - shift) % 1760) + 1760) % 1760) - 300;
      const h = 440 + (i % 3) * 90;
      return <Pine key={i} x={x} y={y + (i % 2) * 20} h={h} c="#1f2e2a" c2="#16221f" />;
    })}
  </Svg>
);

const Ground: React.FC<{ y: number; glow?: number; gx?: number }> = ({ y, glow = 0, gx = 540 }) => (
  <Svg>
    <defs>
      <radialGradient id="gglow" cx={gx} cy={y + 60} r={700} gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#ffcf8a" stopOpacity={0.35 * glow} />
        <stop offset="1" stopColor="#ffcf8a" stopOpacity={0} />
      </radialGradient>
    </defs>
    <rect x={-400} y={y - 50} width={1880} height={1000} fill="#3a3a30" />
    <ellipse cx={540} cy={y + 120} rx={900} ry={170} fill="#4a4636" />
    {Array.from({ length: 16 }, (_, i) => (
      <path key={i} d={`M${-300 + i * 110},${y + 40 + (i % 3) * 60} l14,-10 l14,10 Z`} fill={LEAVES[i % 4]} opacity={0.6} />
    ))}
    <rect x={-400} y={y - 50} width={1880} height={1000} fill="url(#gglow)" />
  </Svg>
);

// A-frame tent with a loop at the front peak.
const Tent: React.FC<{ x: number; y: number; s?: number; glow?: number }> = ({ x, y, s = 1, glow = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-300,0 L-40,-330 L260,0 Z" fill="#c2662e" />
    <path d="M-40,-330 L260,0 L330,0 L20,-330 Z" fill="#9b4e20" />
    <path d="M-150,0 L-40,-220 L70,0 Z" fill="#5a2c14" />
    <path d="M-40,-220 L-40,0" stroke="#3e1e0e" strokeWidth={4} />
    <path d="M-300,0 L-380,30 M260,0 L360,28" stroke="#cfc8b8" strokeWidth={3} opacity={0.6} />
    <circle cx={-40} cy={-322} r={10} fill="none" stroke="#e6dccb" strokeWidth={5} />
    {glow > 0 && <path d="M-150,0 L-40,-220 L70,0 Z" fill="#ffcf8a" opacity={0.25 * glow} />}
  </g>
);

// Camp table with a pot.
const Table: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-170} y={-120} width={340} height={22} rx={6} fill="#8a6a4a" />
    <rect x={-150} y={-100} width={10} height={100} fill="#5a4636" />
    <rect x={140} y={-100} width={10} height={100} fill="#5a4636" />
    <rect x={-60} y={-180} width={100} height={60} rx={10} fill="#9aa3a6" />
    <rect x={-70} y={-186} width={120} height={12} rx={6} fill="#b9c0c4" />
    <path d="M-10,-200 q10,-20 0,-40 M15,-200 q10,-20 0,-40" stroke="#e8eef6" strokeWidth={5} fill="none" opacity={0.35} />
  </g>
);

// Soft squeeze lantern; on = 0..1. Drawn at (x,y) = ring top.
const Lantern: React.FC<{ x: number; y: number; s?: number; on: number; cord?: number }> = ({ x, y, s = 1, on, cord = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {cord > 0 && <path d={`M0,${-cord} L0,0`} stroke="#2a2420" strokeWidth={4} />}
    <circle cx={0} cy={60} r={170} fill="#ffcf8a" opacity={0.22 * on} />
    <circle cx={0} cy={60} r={95} fill="#ffdca0" opacity={0.3 * on} />
    <path d="M-18,8 Q0,-14 18,8" stroke="#9aa0a6" strokeWidth={8} fill="none" />
    <path d="M-44,30 Q-50,8 0,8 Q50,8 44,30 L48,96 Q48,118 0,118 Q-48,118 -48,96 Z" fill={on > 0.3 ? "#fff1d2" : "#e8e4dc"} />
    <ellipse cx={0} cy={116} rx={40} ry={8} fill="#b9b2a6" />
    <ellipse cx={-14} cy={50} rx={10} ry={26} fill="#fff" opacity={0.5} />
  </g>
);

const Night: React.FC<{ k: number }> = ({ k }) => (k <= 0 ? null : <AbsoluteFill style={{ background: `rgba(8,12,28,${0.6 * k})` }} />);

const Backdrop: React.FC<{ cam: Cam; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={NIGHT} uid={uid} />
      <Clouds y={420} col="#252e48" seed={23} drift={t * 10} opacity={0.4} />
      <Svg>
        {Array.from({ length: 40 }, (_, i) => (
          <circle key={i} cx={(i * 263) % 1080} cy={80 + ((i * 151) % 650)} r={1.5 + (i % 3)} fill="#f4f1e6" opacity={0.4 + (i % 4) * 0.12} />
        ))}
      </Svg>
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={59} base={treeY - 260} amp={300} scale={260} col="#1e2638" lit="#5a6480" peak={70} />
    </Plane>
    <Haze y={treeY - 380} h={320} col={NIGHT.low} opacity={0.4} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={73} base={treeY - 110} amp={200} scale={190} col="#161d2a" />
    </Plane>
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

const toScreen = (p: HikerProps, l: [number, number]): [number, number] => [p.x + l[0] * (p.scale ?? 1), p.y + (l[1] - 182) * (p.scale ?? 1)];

// Headlamp strapped over the cap. on = brightness 0..1
const HeadLamp: React.FC<{ p: HikerProps; on: number; tilt?: number }> = ({ p, on, tilt = 0 }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${hx - 26},${hy - 12} Q${hx},${hy - 6} ${hx + 24},${hy - 14}`} stroke="#1d2024" strokeWidth={6} fill="none" />
      <g transform={`rotate(${tilt * 30},${hx + 24},${hy - 15})`}>
        <rect x={hx + 16} y={hy - 22} width={16} height={14} rx={4} fill="#1d2024" />
        <rect x={hx + 28} y={hy - 20} width={5} height={10} rx={2} fill={on > 0.5 ? "#fffbe0" : "#9aa0a6"} />
        {on > 0.05 && <circle cx={hx + 33} cy={hy - 15} r={10} fill="#fff6c8" opacity={0.7 * on} />}
      </g>
    </g>
  );
};

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
            <stop offset="0" stopColor="#fff8dc" stopOpacity={0.9 * k} />
            <stop offset="1" stopColor="#fff8dc" stopOpacity={0.15 * k} />
          </linearGradient>
          <filter id={`bf${id}`}>
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        <path d={`M${from[0]},${from[1]} L${to[0] + nx * w},${to[1] + ny * w} L${to[0] - nx * w},${to[1] - ny * w} Z`} fill={`url(#bm${id})`} filter={`url(#bf${id})`} />
      </Svg>
    </AbsoluteFill>
  );
};

// Hard glare flare at a point (the beam hitting the viewer's eyes).
const Flare: React.FC<{ x: number; y: number; k: number; r?: number }> = ({ x, y, k, r = 160 }) =>
  k <= 0.01 ? null : (
    <AbsoluteFill style={{ mixBlendMode: "screen" }}>
      <Svg>
        <defs>
          <radialGradient id={`fl${Math.round(x)}`} cx={x} cy={y} r={r * 2.4} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity={1 * k} />
            <stop offset="0.25" stopColor="#fff6d0" stopOpacity={0.6 * k} />
            <stop offset="1" stopColor="#fff6d0" stopOpacity={0} />
          </radialGradient>
        </defs>
        <circle cx={x} cy={y} r={r * 2.4} fill={`url(#fl${Math.round(x)})`} />
        <rect x={x - r * 3} y={y - 4} width={r * 6} height={8} fill="#fff" opacity={0.4 * k} />
      </Svg>
    </AbsoluteFill>
  );


// ============ S1 HOOK: camp dinner, Leo's beam in Nia's face (0 - 2.75) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: t * 14 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, t / 2.75), rot: hh.rot };
  const g = 1500;
  const leo: HikerProps = { x: 300, y: g, scale: 2.1, walk: 0, lean: 0.06, poles: false, handOverride: [36, 30], breathe: Math.sin(t * 2.2) * 2 };
  const nia: HikerProps = { x: 820, y: g, scale: 2.1, walk: 0, lean: 0.02, poles: false, handOverride: [44, -150], breathe: Math.sin(t * 2.5) * 2 };
  const hd = hikerGeometry(leo).head;
  const src = toScreen(leo, [hd[0] + 33, hd[1] - 15]);
  const nh = hikerGeometry(nia).head;
  const eye: [number, number] = [nia.x - (nh[0]) * 2.1, nia.y + (nh[1] - 182) * 2.1];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} uid="a" treeY={g - 120} blur={1.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} />
        <Svg>
          <Tent x={560} y={g - 60} s={0.9} />
        </Svg>
        <Svg>
          <Table x={560} y={g + 40} s={1.2} />
        </Svg>
        <Subject rimX={2} col="rgba(170,190,230,0.55)">
          <Person {...leo} outfit={LEO} expression="neutral" />
          <HeadLamp p={leo} on={1} />
          <Person {...nia} outfit={NIA} expression="tired" flip />
        </Subject>
      </Plane>
      <Night k={0.5} />
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={eye} w={110} k={1} id="a" />
        <Flare x={eye[0]} y={eye[1]} k={0.8} r={70} />
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#0a0e10" side="right" />
      </Plane>
      <Particles seed={591} n={14} col="#ffe2b0" leaves={LEAVES} fall={40} />
      <Grade sunX={300} sunY={900} cool="150,170,220" vignette={0.6} />
      <Title text={"His headlamp\nblinded everyone\nat camp"} t={t} t0={0} top={130} size={118} />
    </AbsoluteFill>
  );
};

// ============ S1b CLOSE-UP: Leo, headlamp blazing, dark by five (2.7 - 4.9) ============
const S1b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 2.2), rot: hh.rot };
  const p: HikerProps = { x: 430, y: 2330, scale: 4.4, walk: 0, lean: 0.03, poles: false, handOverride: [40, 20], breathe: Math.sin(t * 2.4) * 2 };
  const hd = hikerGeometry(p).head;
  const src = toScreen(p, [hd[0] + 33, hd[1] - 15]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} uid="b" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col="rgba(170,190,230,0.55)">
          <Person {...p} outfit={LEO} expression="happy" />
          <HeadLamp p={p} on={1} />
        </Subject>
      </Plane>
      <Night k={0.45} />
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={[1250, 700]} w={260} k={1} id="b" />
      </Plane>
      <Particles seed={592} n={12} col="#ffe2b0" leaves={LEAVES} fall={40} />
      <Grade sunX={300} sunY={900} cool="150,170,220" vignette={0.7} />
      <Readout label="SUNSET" value="DARK BY 5 PM" ok={null} t={t} t0={2.75} x={80} y={220} />
      <Chip text="Squinting contest" t={t} t0={3.72} x={80} y={440} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: friend squinting into the glare (4.9 - 8.55) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const look = at(t, [5.3, 5.6, 6.8, 7.1], [0, 1, 1, 0]);
  const hh = handheld(t, 0.4, t > 7.3 && t < 7.5 ? 0.6 : 0);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 3.65), rot: hh.rot };
  const p: HikerProps = { x: 620, y: 2330, scale: 4.4, walk: 0, lean: 0.02, poles: false, handOverride: [mix(30, 46, look), mix(30, -160, look)], breathe: Math.sin(t * 2.4) * 2 };
  const nh = hikerGeometry(p).head;
  const eye: [number, number] = [p.x - (nh[0] + 20) * 4.4, p.y + (nh[1] - 182) * 4.4];
  const glare = 0.55 + 0.45 * at(t, [7.2, 7.4], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} uid="c" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-3} col="rgba(255,240,200,0.8)">
          <Person {...p} outfit={NIA} expression="tired" flip />
        </Subject>
      </Plane>
      <Night k={0.4} />
      <Plane cam={cam} depth={1}>
        <Beam from={[-200, 760]} to={eye} w={160} k={glare} id="c" />
        <Flare x={eye[0] - 40} y={eye[1]} k={glare} r={110} />
      </Plane>
      <Grade sunX={0} sunY={800} cool="150,170,220" vignette={0.7} />
      <Readout label="HEADLAMP" value="STRAIGHT IN HER EYES" ok={false} t={t} t0={5.0} x={80} y={220} pulseAt={7.33} />
    </AbsoluteFill>
  );
};

// ============ S3a CLOSE-UP: tilt it down, or switch it off (8.55 - 14.0) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.03, lt / 5.45), rot: hh.rot };
  const tilt = at(t, [10.1, 10.6], [0, 1]);
  const on = at(t, [11.6, 11.75], [1, 0]);
  const reach = at(t, [9.7, 10.1, 11.9, 12.3], [0, 1, 1, 0]);
  const p: HikerProps = { x: 430, y: 2330, scale: 4.4, walk: 0, lean: 0.03, poles: false, handOverride: [mix(36, 70, reach), mix(24, -175, reach)], breathe: Math.sin(t * 2.2) * 2 };
  const hd = hikerGeometry(p).head;
  const src = toScreen(p, [hd[0] + 33, hd[1] - 15]);
  const target: [number, number] = [mix(1250, 900, tilt), mix(700, 1900, tilt)];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} uid="d" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col="rgba(170,190,230,0.55)">
          <Person {...p} outfit={LEO} expression="neutral" />
          <HeadLamp p={p} on={on} tilt={tilt} />
        </Subject>
      </Plane>
      <Night k={0.45} />
      <Plane cam={cam} depth={1}>
        <Beam from={src} to={target} w={mix(260, 200, tilt)} k={on} id="d" />
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0a0e10" side="right" />
      </Plane>
      <Particles seed={593} n={10} col="#ffe2b0" leaves={LEAVES} fall={40} />
      <Grade sunX={300} sunY={900} cool="150,170,220" vignette={0.65} />
      <Chip text="Tilt it down" t={t} t0={10.12} x={80} y={220} icon="check" big />
      <Chip text="Or switch it off" t={t} t0={11.64} x={80} y={350} icon="check" big />
      <Chip text="When you talk to people" t={t} t0={12.38} x={80} y={480} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: hang one soft lantern from a tent loop (14.0 - 16.65) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: at(lt, [0, 1], [-30, 0]) + hh.y, zoom: mix(1.08, 1.02, lt / 2.65), rot: hh.rot };
  const lift = at(t, [14.0, 14.9], [260, 0]);
  const on = at(t, [15.2, 15.5], [0, 1]);
  const loopX = 560;
  const loopY = 640;
  return (
    <AbsoluteFill style={{ background: "#120f14" }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 50% at 52% 45%, rgba(150,80,40,${0.35 + on * 0.4}) 0%, #120f14 75%)` }} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* tent fabric close-up */}
          <path d={`M-200,1900 L${loopX},${loopY - 40} L1300,1900 Z`} fill={on > 0.5 ? "#c87a40" : "#7a3e1c"} />
          <path d={`M${loopX},${loopY - 40} L1300,1900 L1500,1900 L${loopX + 60},${loopY - 40} Z`} fill="#5a2c14" />
          <path d={`M${loopX - 60},${loopY - 20} Q${loopX},${loopY - 120} ${loopX + 60},${loopY - 20}`} stroke="#3e1e0e" strokeWidth={10} fill="none" />
          <circle cx={loopX} cy={loopY - 30} r={26} fill="none" stroke="#e6dccb" strokeWidth={10} />
          <Lantern x={loopX} y={loopY - 4 + lift} s={2.6} on={on} cord={lift > 5 ? 0 : 20} />
          {/* hand from the right holding the lantern up */}
          <g transform={`translate(${loopX + 150},${loopY + 230 + lift}) rotate(-20)`} opacity={at(t, [15.8, 16.3], [1, 0])}>
            <rect x={0} y={-30} width={420} height={110} rx={50} fill="#B5553A" />
            <ellipse cx={-10} cy={20} rx={80} ry={60} fill="#E0A888" />
            <rect x={-90} y={-20} width={70} height={30} rx={15} fill="#E0A888" />
          </g>
        </Svg>
      </Plane>
      <Particles seed={594} n={16} col="#ffe2b0" />
      <Grade sunX={560} sunY={760} warm="255,190,130" vignette={0.6} />
      <Title text={"Hang one\nsoft lantern."} t={t} t0={14.31} top={1080} size={120} />
    </AbsoluteFill>
  );
};

// ============ S3c MEDIUM: lantern on the tent loop, everyone can see (16.6 - 19.4) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 14 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.8), rot: hh.rot };
  const g = 1500;
  const leo: HikerProps = { x: 300, y: g, scale: 2.1, walk: 0, lean: 0.04, poles: false, handOverride: [36, 30], breathe: Math.sin(t * 2.2) * 2 };
  const nia: HikerProps = { x: 830, y: g, scale: 2.1, walk: 0, lean: 0.02, poles: false, handOverride: [36, 30], breathe: Math.sin(t * 2.5) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} uid="e" treeY={g - 120} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} glow={1} gx={560} />
        <Svg>
          <Tent x={560} y={g - 60} s={0.9} glow={1} />
          <Lantern x={524} y={g - 60 - 297} s={0.9} on={1} cord={10} />
        </Svg>
        <Svg>
          <Table x={560} y={g + 40} s={1.2} />
        </Svg>
        <Subject rimX={3} col="rgba(255,206,150,0.8)">
          <Person {...leo} outfit={LEO} expression="happy" />
          <HeadLamp p={leo} on={0} tilt={1} />
          <Person {...nia} outfit={NIA} expression="happy" flip />
        </Subject>
      </Plane>
      <Night k={0.3} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0a0e10" side="left" />
      </Plane>
      <Particles seed={595} n={18} col="#ffe2b0" leaves={LEAVES} fall={40} />
      <Grade sunX={540} sunY={1150} warm="255,190,130" vignette={0.55} />
      <Chip text="Everyone can see" t={t} t0={16.71} x={80} y={220} icon="check" big />
      <Chip text="Without the glare" t={t} t0={17.78} x={80} y={350} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF WIDE: same dinner, warm light, three friends (19.4 - 22.35) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 18 + hh.x, y: hh.y, zoom: mix(1.1, 1.0, at(lt, [0, 1.2], [0, 1])), rot: hh.rot };
  const g = 1520;
  const a: HikerProps = { x: 240, y: g, scale: 1.8, walk: 0, lean: 0.04, poles: false, handOverride: [40, 20], breathe: Math.sin(t * 2.2) * 2 };
  const b: HikerProps = { x: 560, y: g + 30, scale: 1.8, walk: 0, lean: 0.04, poles: false, handOverride: [40, 26], breathe: Math.sin(t * 2.0) * 2 };
  const c: HikerProps = { x: 860, y: g, scale: 1.8, walk: 0, lean: 0.02, poles: false, handOverride: [36, 30], breathe: Math.sin(t * 2.6) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} uid="f" treeY={g - 160} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} glow={1.2} gx={560} />
        <Svg>
          <Tent x={420} y={g - 120} s={0.75} glow={1} />
          <Lantern x={390} y={g - 120 - 248} s={0.75} on={1} cord={10} />
          <Table x={560} y={g + 80} s={1.1} />
        </Svg>
        <Subject rimX={3} col="rgba(255,206,150,0.8)">
          <Person {...a} outfit={LEO} expression="happy" />
          <HeadLamp p={a} on={0} tilt={1} />
          <Person {...b} outfit={BEN} expression="happy" />
          <Person {...c} outfit={NIA} expression="happy" flip />
        </Subject>
      </Plane>
      <Night k={0.25} />
      <Particles seed={596} n={22} col="#ffe2b0" leaves={LEAVES} fall={40} />
      <Grade sunX={420} sunY={1100} warm="255,190,130" vignette={0.5} />
      <Chip text="Warm light" t={t} t0={20.21} x={80} y={220} icon="check" big />
      <Readout label="SQUINTING" value="NOBODY" ok={true} t={t} t0={20.8} x={80} y={350} pulseAt={21.2} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/mini-camping-lantern-card.jpg"
      photoH={760}
      spec="SQUEEZE TO DIM · USB-C · 65 G"
      name={
        <>
          Mini Camping
          <br />
          Lantern
        </>
      }
      nameSize={88}
      price="$22.99"
      save="Save this before your next camping trip"
    />
  );
};

export const V59: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.75} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={2.7} to={4.95} fadeIn={0.1} fadeOut={0.1}>
      <S1b off={2.7} />
    </Scene>
    <Scene from={4.9} to={8.6} fadeIn={0.1} fadeOut={0.1}>
      <S2 off={4.9} />
    </Scene>
    <Scene from={8.55} to={14.05} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={8.55} />
    </Scene>
    <Scene from={14.0} to={16.7} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={14.0} />
    </Scene>
    <Scene from={16.65} to={19.45} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={16.65} />
    </Scene>
    <Scene from={19.4} to={22.4} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={19.4} />
    </Scene>
    <Scene from={22.3} to={27.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.7, 1560],
        [2.7, 4.9, 1560],
        [4.9, 8.55, 1560],
        [8.55, 14.0, 1560],
        [14.0, 16.65, 1560],
        [16.65, 19.4, 1560],
        [19.4, 22.3, 1560],
      ]}
    />
  </AbsoluteFill>
);
