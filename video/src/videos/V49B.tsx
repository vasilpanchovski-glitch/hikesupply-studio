// V49B: v49 "Phone dies in the cold" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, C, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v49b.json";

const words = vo.words as unknown as Word[];

const COLD: Sky = { top: "#4a6f98", mid: "#a9bfd2", low: "#e6ecef", sun: [820, 640], sunR: 48, sunCol: "#fffcf0", glow: "#eef0e6" };
const GREY: Sky = { top: "#5d6f82", mid: "#a5afb8", low: "#d9dddd", sun: [260, 700], sunR: 38, sunCol: "#f4f4ee", glow: "#e2e4df" };
const CLEAR: Sky = { top: "#3a6fa8", mid: "#b4d0e6", low: "#f6efda", sun: [800, 720], sunR: 58, sunCol: "#fffbe8", glow: "#ffe9b0" };

const MAYA: Outfit = {
  ...GUIDE,
  skin: "#C99070",
  skinShade: "#AA7354",
  hair: "#231915",
  ponytail: "#231915",
  beard: null,
  cap: "#2F5D8A",
  capShade: "#23476B",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#3C4148",
  pantsShade: "#2C3036",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
  glove: "#2E3438",
};

// ---------- scenery ----------
const Pines: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 9 }, (_, i) => {
      const x = ((((-160 + i * 190 - shift) % 1700) + 1700) % 1700) - 300;
      return <Pine key={i} x={x} y={y + (i % 2) * 22} h={400 + (i % 3) * 80} c="#3d6352" c2="#2c4a3d" />;
    })}
  </Svg>
);

const FrostTrail: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={1000} fill="#c9d3d0" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 6} L1480,${y + 110} Q540,${y + 90} -400,${y + 110} Z`} fill="#9c9b92" />
    {Array.from({ length: 18 }, (_, i) => {
      const x = ((((i * 131 - shift) % 2040) + 2040) % 2040) - 400;
      return <path key={i} d={`M${x},${y + 170 + ((i * 47) % 260)} l7,-26 l7,26`} stroke="#eef3f2" strokeWidth={5} fill="none" />;
    })}
    {[120, 520, 900].map((x, i) => (
      <ellipse key={x} cx={x} cy={y + 44 + (i % 2) * 26} rx={60} ry={12} fill="#e6ecec" />
    ))}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#ffffff" seed={14} drift={t * 12} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={41} base={treeY - 300} amp={360} scale={260} col="#a9b7c6" lit="#f2f5f7" />
    </Plane>
    <Haze y={treeY - 430} h={360} col={sky.low} opacity={0.6} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={47} base={treeY - 130} amp={230} scale={190} col="#7d8f8c" lit="#dfe6e6" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.4} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Pines y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Breath puffs in the cold air.
const Breath: React.FC<{ p: HikerProps; t: number }> = ({ p, t }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const k = (t * 0.7) % 1;
  return (
    <g transform={hikerTransform(p)}>
      {[0, 1].map((j) => {
        const kk = (k + j * 0.5) % 1;
        return <circle key={j} cx={hx + 40 + kk * 50} cy={hy + 6 - kk * 16} r={8 + kk * 18} fill="#fff" opacity={0.3 * (1 - kk)} />;
      })}
    </g>
  );
};

// Hip belt with the phone pocket (phone sticks out a little).
const HipBelt: React.FC<{ p: HikerProps; phone: number }> = ({ p, phone }) => (
  <g transform={hikerTransform(p)}>
    <rect x={-34} y={-8} width={70} height={16} rx={6} fill="#2E4A39" />
    <rect x={12} y={-14} width={26} height={26} rx={5} fill="#3E5F4B" stroke="#24382c" strokeWidth={2} />
    {phone > 0 && <rect x={17} y={-24} width={16} height={12} rx={2} fill="#1d1f1e" />}
  </g>
);

// Phone held in the near hand. lit: 1 screen on, 0 black.
const Phone: React.FC<{ p: HikerProps; lit: number; rot?: number }> = ({ p, lit, rot = -18 }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] + 4},${h[1] - 8}) rotate(${rot})`}>
        <rect x={-12} y={-22} width={24} height={40} rx={4} fill="#1d1f1e" />
        <rect x={-9} y={-18} width={18} height={31} rx={2} fill={lit > 0 ? "#dfeef3" : "#0b0b0b"} />
        {lit > 0 && <circle cx={0} cy={-2} r={22} fill="#eaf6fa" opacity={0.25 * lit} />}
      </g>
    </g>
  );
};

// Inside chest pocket: phone slides down behind the jacket flap (k 0 -> 1).
const InsidePocket: React.FC<{ p: HikerProps; k: number }> = ({ p, k }) => {
  const [sx, sy] = hikerGeometry(p).sh;
  return (
    <g transform={hikerTransform(p)}>
      <rect x={sx - 6} y={sy + mix(-4, 34, k)} width={18} height={30} rx={3} fill="#1d1f1e" opacity={k > 0 && k < 1 ? 1 : 0} />
      <path d={`M${sx - 14},${sy + 30} h38 v26 h-38 Z`} fill="#8E3F2A" />
      <line x1={sx - 14} y1={sy + 30} x2={sx + 24} y2={sy + 30} stroke="#d8d2c4" strokeWidth={2} />
    </g>
  );
};

const SignPost: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-9} y={-330} width={18} height={330} fill="#6b4a32" />
    <path d="M-10,-320 h170 l26,24 l-26,24 h-170 Z" fill="#8a5e3c" />
    <path d="M10,-250 h-170 l-26,24 l26,24 h170 Z" fill="#7a5234" />
    <rect x={10} y={-306} width={120} height={8} rx={4} fill="#e9dcc4" opacity={0.8} />
    <rect x={-140} y={-236} width={110} height={8} rx={4} fill="#e9dcc4" opacity={0.8} />
  </g>
);

// Big phone screen with a battery bar that drains to black.
const BatteryCard: React.FC<{ t: number; t0: number; tDead: number }> = ({ t, t0, tDead }) => {
  if (isClean()) return null;
  const pct = t < tDead - 0.5 ? 40 : Math.round(at(t, [tDead - 0.5, tDead], [40, 0]));
  const dead = t >= tDead;
  return (
    <div
      style={{
        position: "absolute",
        left: 290,
        top: 470,
        width: 500,
        height: 860,
        borderRadius: 70,
        background: "#1d1f1e",
        boxShadow: "0 30px 70px rgba(0,0,0,0.45)",
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 24,
          borderRadius: 50,
          background: dead ? "#050505" : "#eef4f6",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 34,
        }}
      >
        {!dead && (
          <>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 40, letterSpacing: 4, color: "#6b6b66" }}>BATTERY</div>
            <div style={{ width: 300, height: 130, borderRadius: 22, border: "8px solid #1f2421", padding: 10, position: "relative" }}>
              <div style={{ width: `${pct}%`, height: "100%", borderRadius: 10, background: pct > 20 ? "#3E8E5A" : "#D9443A" }} />
              <div style={{ position: "absolute", right: -26, top: 36, width: 16, height: 42, borderRadius: 4, background: "#1f2421" }} />
            </div>
            <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 140, color: C.ink, lineHeight: 1 }}>{pct}%</div>
          </>
        )}
      </div>
    </div>
  );
};

// Airplane mode toggle card.
const ToggleCard: React.FC<{ t: number; t0: number; tOn: number }> = ({ t, t0, tOn }) => {
  if (isClean()) return null;
  const o = at(t, [t0, t0 + 0.25], [0, 1]);
  const k = at(t, [tOn, tOn + 0.25], [0, 1], outExpo);
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 240,
        height: 190,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        opacity: o,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 50px",
      }}
    >
      <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 76, textTransform: "uppercase", color: C.ink }}>Airplane mode</div>
      <div style={{ width: 190, height: 104, borderRadius: 52, background: k > 0.5 ? "#3E8E5A" : "#cfcac0", position: "relative" }}>
        <div style={{ position: "absolute", top: 8, left: 8 + k * 86, width: 88, height: 88, borderRadius: 44, background: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.25)" }} />
      </div>
    </div>
  );
};

// Close-up prop: phone and a small power bank on a jacket, cable plugged, charge bar filling.
const PowerBank: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const plug = at(t, [t0 + 0.2, t0 + 0.6], [0, 1], outExpo);
  const fill = at(t, [t0 + 0.6, t0 + 2.2], [0.15, 0.7]);
  return (
    <Svg>
      {/* jacket fabric */}
      <rect x={-200} y={-200} width={1480} height={2400} fill="#7a3a28" />
      {Array.from({ length: 14 }, (_, i) => (
        <path key={i} d={`M-200,${300 + i * 120} Q540,${260 + i * 120} 1280,${310 + i * 120}`} stroke="#8E3F2A" strokeWidth={10} fill="none" opacity={0.5} />
      ))}
      <path d="M540,-200 L540,2200" stroke="#d8d2c4" strokeWidth={10} strokeDasharray="14 10" opacity={0.7} />
      {/* power bank */}
      <g transform="translate(330,1080) rotate(-6)">
        <rect x={-150} y={-260} width={300} height={520} rx={46} fill="#2b2f33" />
        <rect x={-150} y={-260} width={300} height={60} rx={30} fill="#3a3f45" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={-60 + i * 40} cy={190} r={11} fill={i < 3 ? "#5fc77a" : "#4a4f55"} />
        ))}
      </g>
      {/* cable */}
      <path d={`M360,820 C380,${mix(700, 640, plug)} 640,${mix(700, 640, plug)} 700,${mix(760, 720, plug)}`} stroke="#e8e8e8" strokeWidth={16} fill="none" />
      {/* phone */}
      <g transform="translate(760,1000) rotate(8)">
        <rect x={-150} y={-290} width={300} height={580} rx={40} fill="#1d1f1e" />
        <rect x={-130} y={-268} width={260} height={536} rx={28} fill="#eef4f6" />
        <rect x={-80} y={-40} width={160} height={70} rx={14} fill="none" stroke="#1f2421" strokeWidth={8} />
        <rect x={-72} y={-32} width={144 * fill} height={54} rx={8} fill="#3E8E5A" />
        <rect x={80} y={-18} width={10} height={26} rx={3} fill="#1f2421" />
        {plug > 0.9 && <path d="M-8,-110 l-22,50 h26 l-14,46 l40,-62 h-26 l14,-34 Z" fill="#3E8E5A" />}
      </g>
    </Svg>
  );
};

// ============ S1 HOOK: freezing ridge, phone in the hip belt pocket (0 - 3.85) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: t * 26 + hh.x, y: hh.y, zoom: mix(1.0, 1.08, t / 3.85), rot: hh.rot };
  const g = 1460;
  const ph = t * 5;
  const p: HikerProps = { x: 300 + t * 40, y: g + 40, scale: 2.3, phase: ph, walk: 0.6, lean: 0.12, poles: false, handOverride: freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="a" treeY={g - 80} blur={1.2} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} shift={cam.x} />
        <Subject rimX={-4} col="rgba(255,248,230,0.8)">
          <Person {...p} outfit={MAYA} expression="neutral" />
          <HipBelt p={p} phone={1} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f2e28" side="right" />
      </Plane>
      <Rays x={COLD.sun[0]} y={COLD.sun[1]} strength={0.18} col="255,250,235" />
      <Particles seed={491} n={22} col="#ffffff" fall={30} />
      <Grade sunX={820} sunY={640} warm="235,240,255" vignette={0.5} />
      <Title text={"Her phone died\nat 40 percent"} t={t} t0={0} top={130} size={112} />
      <Chip text="Phone in hip belt pocket" t={t} t0={1.73} x={80} y={440} icon="none" big />
      <Chip text="Freezing ridge" t={t} t0={2.91} x={80} y={570} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2a CLOSE-UP: at the junction, phone out for the map (3.85 - 6.2) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 2.35), rot: hh.rot };
  const lift = at(t, [4.8, 5.5], [0, 1], outExpo);
  const p: HikerProps = { x: 430, y: 2330, scale: 4.4, walk: 0, lean: 0.1, poles: false, handOverride: [mix(22, 60, lift), mix(10, -120, lift)], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="b" treeY={1250} blur={8} t={t} />
      <Plane cam={cam} depth={0.7} blur={5}>
        <Svg>
          <SignPost x={880} y={1500} s={1.6} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(255,248,230,0.8)">
          <Person {...p} outfit={MAYA} expression="neutral" />
          <Phone p={p} lit={1} rot={mix(-60, -18, lift)} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={492} n={16} col="#ffffff" fall={30} />
      <Grade sunX={820} sunY={640} warm="235,240,255" vignette={0.6} />
      <Chip text="Trail junction" t={t} t0={4.14} x={80} y={240} icon="none" big />
      <Chip text="Phone out for the map" t={t} t0={5.27} x={80} y={370} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2b PHONE CLOSE-UP: 40 percent, then black (6.15 - 8.0) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const dead = t >= 7.27;
  const hh = handheld(t, 0.4, dead ? at(t, [7.27, 7.6], [1, 0]) : 0);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.85), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="c" treeY={1300} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <BatteryCard t={t} t0={off} tDead={7.27} />
      </Plane>
      <Particles seed={493} n={14} col="#ffffff" fall={30} />
      <Grade sunX={260} sunY={700} warm="230,235,245" vignette={0.65} />
    </AbsoluteFill>
  );
};

// ============ S2c MEDIUM: dead phone, cold drains batteries (7.95 - 11.05) ============
const S2c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.1), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 470, y: g + 40, scale: 2.3, walk: 0, lean: 0.16, poles: false, handOverride: [50, -80], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="d" treeY={g - 80} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} shift={cam.x} />
        <Subject rimX={3} col="rgba(240,244,250,0.7)">
          <SignPost x={860} y={g + 30} />
          <Person {...p} outfit={MAYA} expression="tired" />
          <Phone p={p} lit={0} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f2e28" side="left" />
      </Plane>
      <Particles seed={494} n={22} col="#ffffff" fall={34} />
      <Grade sunX={260} sunY={700} warm="230,235,245" vignette={0.6} />
      <Readout label="PHONE" value="DEAD" ok={false} t={t} t0={8.28} x={80} y={240} pulseAt={8.84} />
      <Chip text="Cold drains batteries faster" t={t} t0={9.37} x={80} y={470} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a CLOSE-UP: the fix, inside pocket close to the body (11.0 - 15.65) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: at(lt, [0, 1.0], [-40, 0]) + hh.y, zoom: at(lt, [0, 1.0], [1.14, 1.06]), rot: hh.rot };
  const k = at(t, [12.6, 13.6], [0, 1]);
  const p: HikerProps = {
    x: 430,
    y: 2330,
    scale: 4.4,
    walk: 0,
    lean: 0.06,
    poles: false,
    handOverride: k < 1 ? [mix(60, 22, k), mix(-110, -96, k)] : [24, 20],
    breathe: Math.sin(t * 2.4) * 2,
  };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="e" treeY={1250} blur={8} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(255,248,230,0.8)">
          <Person {...p} outfit={MAYA} expression="happy" />
          {k <= 0 && <Phone p={p} lit={0} />}
          <InsidePocket p={p} k={k} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={495} n={16} col="#ffffff" fall={30} />
      <Grade sunX={820} sunY={640} warm="240,240,250" vignette={0.6} />
      <Title text={"Inside pocket,\nclose to your body."} t={t} t0={11.98} top={200} size={112} />
    </AbsoluteFill>
  );
};

// ============ S3b MEDIUM: airplane mode when you're not using it (15.6 - 18.3) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 12 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.7), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 400, y: g + 40, scale: 2.3, walk: 0, lean: 0.12, poles: false, handOverride: [52, -84], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="f" treeY={g - 80} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} shift={cam.x} />
        <Subject rimX={-4} col="rgba(255,248,230,0.8)">
          <Person {...p} outfit={MAYA} expression="happy" />
          <Phone p={p} lit={1} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Rays x={COLD.sun[0]} y={COLD.sun[1]} strength={0.2} col="255,250,235" />
      <Particles seed={496} n={18} col="#ffffff" fall={30} />
      <Grade sunX={820} sunY={640} warm="240,240,250" vignette={0.55} />
      <ToggleCard t={t} t0={15.72} tOn={16.64} />
      <Chip text="When you're not using it" t={t} t0={16.89} x={80} y={470} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3c PROP CLOSE-UP: small charged power bank (18.25 - 20.8) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.55), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#5a2a1c" }}>
      <Plane cam={cam} depth={1}>
        <PowerBank t={t} t0={18.32} />
      </Plane>
      <Particles seed={497} n={10} col="#ffe7b8" bokeh />
      <Grade sunX={540} sunY={700} warm="255,215,170" vignette={0.6} />
      <Chip text="Small power bank, charged" t={t} t0={18.92} x={80} y={240} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: clear sky, phone lasted the whole loop (20.75 - 23.2) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.04]), rot: hh.rot };
  const g = 1460;
  const ph = t * 5;
  const p: HikerProps = { x: 320 + lt * 60, y: g + 40, scale: 2.3, phase: ph, walk: 0.6, lean: 0.1, poles: false, handOverride: [50, -70] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="g" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} shift={cam.x} />
        <Subject rimX={-5} col="rgba(255,220,160,0.85)">
          <Person {...p} outfit={MAYA} expression="happy" />
          <Phone p={p} lit={1} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f2e28" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.3} col="255,230,170" />
      <Particles seed={498} n={20} col="#fff4d8" bokeh />
      <Grade sunX={800} sunY={720} warm="255,210,150" />
      <Title text={"It lasted the\nwhole loop."} t={t} t0={off + 0.1} top={170} size={130} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/winter-hiking-guide-cold-weather-checklist-card.jpg"
      photoH={760}
      spec="PRINTABLE PDF · 22 PAGES · °F + °C"
      name={
        <>
          Winter
          <br />
          Hiking Guide
        </>
      }
      nameSize={96}
      price="$7.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V49B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.9} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.85} to={6.2} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={3.85} />
    </Scene>
    <Scene from={6.15} to={8.0} fadeIn={0.08} fadeOut={0.1}>
      <S2b off={6.15} />
    </Scene>
    <Scene from={7.95} to={11.05} fadeIn={0.1} fadeOut={0.1}>
      <S2c off={7.95} />
    </Scene>
    <Scene from={11.0} to={15.65} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={11.0} />
    </Scene>
    <Scene from={15.6} to={18.3} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={15.6} />
    </Scene>
    <Scene from={18.25} to={20.8} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={18.25} />
    </Scene>
    <Scene from={20.75} to={23.2} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={20.75} />
    </Scene>
    <Scene from={23.1} to={28} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.85, 1560],
        [3.85, 6.15, 1560],
        [6.15, 7.95, 1560],
        [7.95, 11.0, 1560],
        [11.0, 15.6, 1560],
        [15.6, 18.25, 1560],
        [18.25, 20.75, 1560],
        [20.75, 23.1, 1560],
      ]}
    />
  </AbsoluteFill>
);
