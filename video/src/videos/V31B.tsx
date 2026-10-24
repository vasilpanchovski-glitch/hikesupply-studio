// V31B: v31 "The Ten Essentials on a short fall hike" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v31b.json";

const words = vo.words as unknown as Word[];

const WARM: Sky = { top: "#3a6d9e", mid: "#b9cfe0", low: "#f7e6c4", sun: [820, 620], sunR: 52, sunCol: "#fffbe8", glow: "#ffe2a6" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };
const DUSK: Sky = { top: "#2f3d5e", mid: "#b77a62", low: "#efae7e", sun: [700, 1000], sunR: 56, sunCol: "#ffe0b0", glow: "#ff9a5a" };

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lerpC = (a: string, b: string, k: number) => {
  const A = hex(a);
  const B = hex(b);
  return "#" + A.map((v, i) => Math.round(mix(v, B[i], k)).toString(16).padStart(2, "0")).join("");
};
const lerpSky = (a: Sky, b: Sky, k: number): Sky => ({
  top: lerpC(a.top, b.top, k),
  mid: lerpC(a.mid, b.mid, k),
  low: lerpC(a.low, b.low, k),
  sun: [mix(a.sun[0], b.sun[0], k), mix(a.sun[1], b.sun[1], k)],
  sunR: mix(a.sunR, b.sunR, k),
  sunCol: lerpC(a.sunCol, b.sunCol, k),
  glow: lerpC(a.glow, b.glow, k),
});

const EMMA: Outfit = {
  ...GUIDE,
  skin: "#E8B996",
  skinShade: "#CC9A76",
  hair: "#5b3a24",
  ponytail: "#5b3a24",
  beard: null,
  cap: "#C9B48E",
  capShade: "#A8946F",
  jacket: "#8E5A7A",
  jacketShade: "#6F4560",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e"];

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

const Trail: React.FC<{ y: number; dim?: number }> = ({ y, dim = 0 }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={900} fill={lerpC("#5f7a44", "#3f5236", dim)} />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 4} L1480,${y + 120} Q540,${y + 90} -400,${y + 120} Z`} fill={lerpC("#c0a67e", "#8f7a5c", dim)} />
    {Array.from({ length: 14 }, (_, i) => (
      <path key={i} d={`M${-300 + i * 120},${y - 46} l-8,-30 m8,30 l6,-36 m-6,36 l14,-24`} stroke="#4d6436" strokeWidth={5} strokeLinecap="round" />
    ))}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; trees?: boolean }> = ({ cam, sky, uid, treeY, blur = 0, t, trees = true }) => (
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
    {trees && (
      <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
        <Woods y={treeY} shift={cam.x * 0.2} />
      </Plane>
    )}
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Wind streaks.
const Wind: React.FC<{ t: number; on: number }> = ({ t, on }) => (
  <Svg>
    <g opacity={on} stroke="#fff" strokeLinecap="round" fill="none">
      {Array.from({ length: 9 }, (_, i) => {
        const y = 380 + ((i * 173) % 1100);
        const x = ((t * (620 + i * 40) + i * 260) % 1700) - 400;
        return <path key={i} d={`M${x},${y} q120,-18 240,0 t180,6`} strokeWidth={5} opacity={0.3 + (i % 3) * 0.1} />;
      })}
    </g>
  </Svg>
);

// Trail fork signpost (arrows only, no text).
const Signpost: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-9} y={-250} width={18} height={250} rx={4} fill="#6b4e33" />
    <path d="M-10,-236 L120,-236 L150,-212 L120,-188 L-10,-188 Z" fill="#8a6a45" stroke="#5a4129" strokeWidth={4} />
    <path d="M10,-170 L-120,-170 L-150,-146 L-120,-122 L10,-122 Z" fill="#8a6a45" stroke="#5a4129" strokeWidth={4} />
  </g>
);

// ---------- the Ten Essentials as small illustrations (origin = bottom centre) ----------
const MapCompass: React.FC = () => (
  <g>
    <path d="M-80,0 L-70,-90 L-20,-80 L20,-96 L70,-84 L80,0 L30,-8 L-10,6 Z" fill="#E8DDBF" stroke="#b9a97f" strokeWidth={3} />
    <path d="M-20,-80 L-10,6 M20,-96 L30,-8" stroke="#b9a97f" strokeWidth={3} />
    <path d="M-60,-40 q30,-30 60,-6 t60,-14" stroke="#5f8a6a" strokeWidth={5} fill="none" />
    <circle cx={44} cy={-26} r={30} fill="#2f3b45" />
    <circle cx={44} cy={-26} r={23} fill="#f4f1e8" />
    <path d="M44,-46 L50,-26 L44,-6 L38,-26 Z" fill="#D9443A" />
  </g>
);
const Headlamp: React.FC = () => (
  <g>
    <ellipse cx={0} cy={-30} rx={74} ry={28} fill="none" stroke="#3a4a5a" strokeWidth={14} />
    <rect x={-34} y={-62} width={68} height={50} rx={12} fill="#2b2f33" />
    <circle cx={0} cy={-37} r={16} fill="#fff6c8" />
    <circle cx={0} cy={-37} r={8} fill="#fff" />
  </g>
);
const SunKit: React.FC = () => (
  <g>
    <rect x={-80} y={-110} width={44} height={110} rx={10} fill="#F2C531" />
    <rect x={-74} y={-128} width={32} height={22} rx={5} fill="#3a4a5a" />
    <g transform="translate(30,-30)">
      <ellipse cx={-28} cy={0} rx={26} ry={20} fill="#2a2f35" />
      <ellipse cx={28} cy={0} rx={26} ry={20} fill="#2a2f35" />
      <path d="M-4,-4 q4,-6 8,0" stroke="#2a2f35" strokeWidth={6} fill="none" />
      <ellipse cx={-34} cy={-6} rx={9} ry={5} fill="#fff" opacity={0.35} />
    </g>
  </g>
);
const AidKit: React.FC = () => (
  <g transform="translate(0,-40)">
    <rect x={-60} y={-40} width={120} height={80} rx={14} fill="#C9302C" />
    <rect x={-60} y={-40} width={120} height={14} rx={7} fill="#a52521" />
    <rect x={-10} y={-20} width={20} height={50} rx={2} fill="#fff" />
    <rect x={-25} y={-5} width={50} height={20} rx={2} fill="#fff" />
  </g>
);
const Knife: React.FC = () => (
  <g transform="translate(0,-24) rotate(-8)">
    <path d="M-10,-10 L90,-6 Q110,0 90,8 L-10,8 Z" fill="#c9d0d4" stroke="#8e979c" strokeWidth={3} />
    <rect x={-90} y={-14} width={86} height={28} rx={12} fill="#B5553A" />
    <circle cx={-70} cy={0} r={4} fill="#f4e7d0" />
  </g>
);
const FireStarter: React.FC = () => (
  <g>
    <rect x={-60} y={-90} width={34} height={90} rx={8} fill="#D9443A" />
    <rect x={-58} y={-104} width={30} height={18} rx={4} fill="#c9d0d4" />
    <rect x={6} y={-80} width={14} height={80} rx={6} fill="#4a4e55" />
    <rect x={2} y={-100} width={22} height={24} rx={6} fill="#B5553A" />
  </g>
);
const Bivy: React.FC = () => (
  <g>
    <rect x={-70} y={-70} width={140} height={70} rx={20} fill="#E67E22" />
    <rect x={-70} y={-70} width={140} height={18} rx={9} fill="#c9661a" />
    <path d="M-40,-44 h80 M-40,-26 h80" stroke="#f5b07a" strokeWidth={5} strokeLinecap="round" />
  </g>
);
const Food: React.FC = () => (
  <g>
    <rect x={-70} y={-40} width={90} height={40} rx={8} fill="#5f8a6a" />
    <rect x={-60} y={-80} width={90} height={40} rx={8} fill="#C8963E" transform="rotate(-6 -15 -60)" />
    <path d="M-60,-22 h70" stroke="#e8e3d0" strokeWidth={5} />
  </g>
);
const Bottle: React.FC = () => (
  <g>
    <rect x={-28} y={-130} width={56} height={130} rx={16} fill="#4E7FA8" />
    <rect x={-18} y={-152} width={36} height={26} rx={6} fill="#2b2f33" />
    <rect x={-20} y={-112} width={10} height={90} rx={5} fill="#fff" opacity={0.35} />
  </g>
);
const Layer: React.FC = () => (
  <g>
    <ellipse cx={0} cy={-36} rx={80} ry={36} fill="#3E6E8E" />
    <path d="M-70,-50 q70,-24 140,0 M-74,-30 q74,-24 148,0" stroke="#2f566f" strokeWidth={5} fill="none" />
  </g>
);

const pop = (t: number, t0: number) => at(t, [t0, t0 + 0.35], [0, 1], outExpo);

// ============ S1 HOOK: wide, a three-hour fall day hike (0 - 3.0) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: t * 18 + hh.x, y: hh.y, zoom: mix(1.0, 1.08, t / 3), rot: hh.rot };
  const g = 1440;
  const ph = t * 3.6;
  const p: HikerProps = { x: 200 + t * 70, y: g, scale: 1.4, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="a" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject>
          <Person {...p} outfit={EMMA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.2} />
      <Particles seed={41} n={22} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} />
      <Title text={"Water and a\nphone isn't\nenough"} t={t} t0={0} top={130} size={136} />
      <Chip text="A 3-hour fall day hike" t={t} t0={1.2} x={80} y={570} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2a CLOSE-UP: she packed water and her phone (2.95 - 4.8) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y - lt * 8, zoom: mix(1.04, 1.1, lt / 1.85), rot: hh.rot };
  const p: HikerProps = { x: 600, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.05, poles: false, handOverride: [58, -18], breathe: Math.sin(t * 2.2) * 1.5 };
  const g = hikerGeometry(p);
  const hand = g.arms[1].hand;
  const bottle = pop(t, 3.48);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="b" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={EMMA} expression="neutral" />
          <g transform={hikerTransform(p)}>
            {/* phone in hand */}
            <g transform={`translate(${hand[0] + 4},${hand[1] - 22}) rotate(-8)`}>
              <rect x={-12} y={-24} width={24} height={44} rx={5} fill="#1f2326" />
              <rect x={-9} y={-20} width={18} height={34} rx={3} fill="#9fd0ea" />
            </g>
            {/* bottle in the side pocket */}
            <g transform={`translate(${g.hip[0] - 52},${g.hip[1] - 20}) scale(${0.32 * bottle})`}>
              <Bottle />
            </g>
          </g>
        </Subject>
      </Plane>
      <Particles seed={42} n={14} leaves={LEAVES} fall={40} />
      <Grade sunX={820} sunY={620} vignette={0.6} />
      <Chip text="Water" t={t} t0={3.48} x={80} y={240} icon="check" big />
      <Chip text="Phone" t={t} t0={4.21} x={80} y={360} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S2b MEDIUM: wrong turn, sun drops, wind picks up (4.75 - 8.9) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: lt * 14 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 4.15), rot: hh.rot };
  const g = 1380;
  const k = at(t, [6.3, 8.5], [0.15, 1]);
  const sky = lerpSky(WARM, DUSK, k);
  const walking = t < 6.4;
  const ph = lt * 3.2;
  const p: HikerProps = walking
    ? { x: 520 + lt * 40, y: g + 200, scale: 2.3, phase: ph, walk: 0.55, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.55) }
    : { x: 520 + 1.65 * 40, y: g + 200, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [34, 30], breathe: Math.sin(t * 2.6) * 2 };
  const wind = at(t, [7.5, 7.9], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={sky} uid="c" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} dim={k * 0.7} />
        <Subject rimX={3}>
          <Signpost x={230} y={g + 60} s={1.5} />
          <Person {...p} outfit={EMMA} expression={t > 6.4 ? "tired" : "neutral"} flip={t > 7.2} />
        </Subject>
      </Plane>
      <Wind t={t} on={wind} />
      <Particles seed={43} n={22} leaves={LEAVES} fall={40 + wind * 60} />
      <Grade sunX={sky.sun[0]} sunY={sky.sun[1]} warm="255,170,110" cool="25,35,60" vignette={0.5 + 0.2 * k} />
      <Chip text="Wrong turn: +2 hours" t={t} t0={5.38} x={80} y={240} icon="x" big />
      <Chip text="Sun dropping" t={t} t0={6.84} x={80} y={370} icon="x" />
      <Chip text="Wind picking up" t={t} t0={7.6} x={80} y={470} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: here's the fix, the Ten Essentials every time (8.85 - 12.3) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: at(lt, [0, 3.4], [-80, 0]) + hh.y, zoom: at(lt, [0, 3.4], [1.12, 1.03]), rot: hh.rot };
  const g = 1380;
  const p: HikerProps = { x: 560, y: g + 200, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [40, 28], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="d" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject>
          <Person {...p} outfit={EMMA} expression="happy" packOut={6} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#4a2e14" side="left" />
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.2} />
      <Particles seed={44} n={20} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} />
      <Title text={"Here's\nthe fix."} t={t} t0={8.95} t1={10.1} top={200} size={160} />
      <Chip text="The Ten Essentials" t={t} t0={10.61} x={80} y={240} icon="check" big />
      <Chip text="Every time" t={t} t0={11.46} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE: essentials 1-5 laid out on a flat rock (12.25 - 16.4) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 8 + hh.x, y: hh.y, zoom: mix(1.03, 1.1, lt / 4.15), rot: hh.rot };
  const items: [React.FC, number, number, number, number][] = [
    [MapCompass, 12.38, 270, 1170, 1.25],
    [Headlamp, 13.52, 560, 1160, 1.2],
    [SunKit, 14.14, 840, 1170, 1.2],
    [AidKit, 15.09, 380, 1420, 1.45],
    [Knife, 15.96, 730, 1420, 1.45],
  ];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="e" treeY={1150} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          {/* flat granite slab, seen from a low angle */}
          <path d="M-200,1060 Q540,990 1280,1060 L1320,1520 Q540,1560 -240,1520 Z" fill="#9a9488" />
          <path d="M-200,1060 Q540,990 1280,1060 L1290,1100 Q540,1040 -210,1100 Z" fill="#c4bdae" />
          <path d="M-240,1520 Q540,1560 1320,1520 L1340,1700 L-260,1700 Z" fill="#6f6a60" />
          {items.map(([Icon, t0, x, y, s], i) => {
            const k = pop(t, t0);
            return (
              <g key={i} transform={`translate(${x},${y - (1 - k) * 60}) scale(${s * k})`} opacity={k}>
                <ellipse cx={0} cy={4} rx={80} ry={10} fill="rgba(0,0,0,0.25)" />
                <Icon />
              </g>
            );
          })}
        </Subject>
      </Plane>
      <Particles seed={45} n={14} leaves={LEAVES} fall={40} />
      <Grade sunX={820} sunY={620} vignette={0.6} />
      <Chip text="Navigation" t={t} t0={12.38} x={80} y={220} icon="check" />
      <Chip text="Headlamp" t={t} t0={13.52} x={80} y={315} icon="check" />
      <Chip text="Sun protection" t={t} t0={14.14} x={80} y={410} icon="check" />
      <Chip text="First aid" t={t} t0={15.09} x={80} y={505} icon="check" />
      <Chip text="Knife" t={t} t0={15.96} x={80} y={600} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S3c CLOSE-UP: essentials 6-10 go into her pack (16.35 - 21.5) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 5.15), rot: hh.rot };
  const p: HikerProps = { x: 640, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.05, poles: false, handOverride: [34, 30], breathe: Math.sin(t * 2.2) * 1.5 };
  const g = hikerGeometry(p);
  // pack centre in screen space (pack sits behind the shoulders, local ~(-50,-80))
  const px = p.x + (g.hip[0] - 50) * 4.4;
  const py = p.y + (g.hip[1] - 182 - 70) * 4.4;
  const items: [React.FC, number][] = [
    [FireStarter, 16.43],
    [Bivy, 17.43],
    [Food, 19.44],
    [Bottle, 19.92],
    [Layer, 20.52],
  ];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="f" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={EMMA} expression="happy" packOut={at(t, [16.4, 20.9], [0, 10])} />
          {items.map(([Icon, t0], i) => {
            const k = at(t, [t0, t0 + 0.55], [0, 1], outExpo);
            if (k <= 0 || k >= 1) return null;
            const x = mix(1000, px, k);
            const y = mix(1180 - i * 20, py, k) - Math.sin(k * Math.PI) * 160;
            return (
              <g key={i} transform={`translate(${x},${y}) scale(${mix(1.3, 0.5, k)})`}>
                <Icon />
              </g>
            );
          })}
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.18} col="255,214,150" />
      <Particles seed={46} n={16} leaves={LEAVES} fall={50} />
      <Grade sunX={760} sunY={700} warm="255,190,120" vignette={0.6} />
      <Chip text="Fire starter" t={t} t0={16.43} x={80} y={220} icon="check" />
      <Chip text="Emergency shelter" t={t} t0={17.43} x={80} y={315} icon="check" />
      <Chip text="Extra food" t={t} t0={19.44} x={80} y={410} icon="check" />
      <Chip text="Extra water" t={t} t0={19.92} x={80} y={505} icon="check" />
      <Chip text="Extra clothes" t={t} t0={20.52} x={80} y={600} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: dusk, headlamp on, just a longer day (21.45 - 25.25) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 16 + hh.x, y: hh.y, zoom: at(lt, [0, 1.2], [1.16, 1.04], outExpo), rot: hh.rot };
  const g = 1380;
  const ph = lt * 3.2;
  const p: HikerProps = { x: 470 + lt * 36, y: g + 200, scale: 2.3, phase: ph, walk: 0.55, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.55) };
  const geo = hikerGeometry(p);
  const lamp: [number, number] = [geo.head[0] + 16, geo.head[1] - 22];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DUSK} uid="h" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} dim={0.6} />
        <Subject rimX={5}>
          <Person {...p} outfit={{ ...EMMA, jacket: "#3E6E8E", jacketShade: "#2f566f" }} expression="happy" />
          <g transform={hikerTransform(p)}>
            <path d={`M${lamp[0]},${lamp[1]} L${lamp[0] + 420},${lamp[1] + 120} L${lamp[0] + 420},${lamp[1] + 250} Z`} fill="#fff3c4" opacity={0.28} />
            <rect x={lamp[0] - 10} y={lamp[1] - 7} width={20} height={14} rx={4} fill="#2b2f33" />
            <circle cx={lamp[0] + 9} cy={lamp[1]} r={5} fill="#fffbe0" />
          </g>
        </Subject>
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.22} col="255,190,130" />
      <Particles seed={48} n={26} col="#ffe7b8" />
      <Grade sunX={700} sunY={1000} warm="255,170,100" cool="25,35,60" />
      <Title text={"Just a\nlonger day."} t={t} t0={off + 0.1} top={170} size={150} />
      <Chip text="Headlamp on, warm layer on" t={t} t0={23.09} x={80} y={520} icon="check" />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/ultimate-hiking-packing-checklist-card.jpg"
      spec="SIX PACKING LISTS · DIGITAL DOWNLOAD"
      name={
        <>
          Ultimate Hiking
          <br />
          Packing Checklist
        </>
      }
      nameSize={84}
      price="$4.99"
      save="Save this before your next hike"
    />
  );
};

export const V31B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.0} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={2.95} to={4.8} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={2.95} />
    </Scene>
    <Scene from={4.75} to={8.9} fadeIn={0.08} fadeOut={0.12}>
      <S2b off={4.75} />
    </Scene>
    <Scene from={8.85} to={12.3} fadeIn={0.12} fadeOut={0.1}>
      <S3a off={8.85} />
    </Scene>
    <Scene from={12.25} to={16.4} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={12.25} />
    </Scene>
    <Scene from={16.35} to={21.5} fadeIn={0.1} fadeOut={0.12}>
      <S3c off={16.35} />
    </Scene>
    <Scene from={21.45} to={25.25} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={21.45} />
    </Scene>
    <Scene from={25.2} to={30} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.95, 1560],
        [2.95, 4.75, 1560],
        [4.75, 8.85, 1560],
        [8.85, 12.25, 1560],
        [12.25, 16.35, 1560],
        [16.35, 21.45, 1560],
        [21.45, 25.2, 1560],
      ]}
    />
  </AbsoluteFill>
);
