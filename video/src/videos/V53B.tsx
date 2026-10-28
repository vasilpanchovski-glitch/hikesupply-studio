// V53B: v53 "Jacket on, then sit" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v53b.json";

const words = vo.words as unknown as Word[];

const COLD: Sky = { top: "#45627f", mid: "#a7b8c6", low: "#e4e6e4", sun: [800, 620], sunR: 44, sunCol: "#f8f8f2", glow: "#e8ecec" };
const GREY: Sky = { top: "#53667a", mid: "#9eabb6", low: "#d9dcdc", sun: [300, 700], sunR: 36, sunCol: "#f0f0ea", glow: "#dfe2e1" };
const CLEAR: Sky = { top: "#3a6d9e", mid: "#b6cbdc", low: "#eef0e8", sun: [830, 580], sunR: 50, sunCol: "#fffbe8", glow: "#ffeac0" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

// Kate hikes in a thin base layer; the warm layer is a puffy orange jacket.
const KATE: Outfit = {
  ...GUIDE,
  skin: "#F0C8A8",
  skinShade: "#D4A888",
  hair: "#c08a3e",
  ponytail: "#c08a3e",
  beard: null,
  cap: "#2F4F5F",
  capShade: "#223b47",
  jacket: "#8fb3c4",
  jacketShade: "#7298aa",
  pants: "#3f4349",
  pantsShade: "#2e3136",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};
const KATE_WARM: Outfit = { ...KATE, jacket: "#D2733C", jacketShade: "#A9592C" };

// ---------- scenery ----------
const Firs: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 11 }, (_, i) => {
      const x = ((((-160 + i * 150 - shift) % 1650) + 1650) % 1650) - 300;
      const h = 380 + (i % 3) * 80;
      return <Pine key={i} x={x} y={y + (i % 2) * 22} h={h} c="#4d6e62" c2="#3a574d" />;
    })}
  </Svg>
);

const Ledge: React.FC<{ y: number; frost?: number }> = ({ y, frost = 0.5 }) => (
  <Svg>
    <path d={`M-400,${y + 10} L120,${y - 30} L460,${y - 10} L820,${y - 40} L1480,${y} L1480,${y + 900} L-400,${y + 900} Z`} fill="#6e6a62" />
    <path d={`M-400,${y + 10} L120,${y - 30} L460,${y - 10} L820,${y - 40} L1480,${y} L1480,${y + 40} L820,${y} L460,${y + 30} L120,${y + 10} L-400,${y + 50} Z`} fill="#e9eef0" opacity={frost} />
    <path d={`M60,${y + 120} l120,-40 l90,60 Z M640,${y + 200} l160,-50 l110,70 Z M300,${y + 380} l140,-40 l120,60 Z`} fill="#58554e" />
  </Svg>
);

const Path: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={1000} fill="#7b7f6a" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 6} L1480,${y + 110} Q540,${y + 90} -400,${y + 110} Z`} fill="#a89c86" />
    {Array.from({ length: 12 }, (_, i) => {
      const x = ((((i * 170 - shift) % 2040) + 2040) % 2040) - 400;
      return <ellipse key={i} cx={x} cy={y + 190 + (i % 3) * 60} rx={20} ry={7} fill="#e6ebec" opacity={0.7} />;
    })}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#ffffff" seed={12} drift={t * 30} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.12} blur={2.8 + blur}>
      <Ridge seed={41} base={treeY - 300} amp={420} scale={240} col="#9aabba" lit="#f2f5f7" peak={200} />
    </Plane>
    <Haze y={treeY - 440} h={380} col={sky.low} opacity={0.7} />
    <Plane cam={cam} depth={0.25} blur={1.8 + blur}>
      <Ridge seed={47} base={treeY - 150} amp={260} scale={200} col="#7a8d94" lit="#dfe6ea" peak={90} />
    </Plane>
    <Haze y={treeY - 240} h={280} col={sky.low} opacity={0.5} />
    <Plane cam={cam} depth={0.5} blur={1 + blur}>
      <Firs y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col = "rgba(235,240,255,0.8)" }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

const Wind: React.FC<{ t: number; k?: number }> = ({ t, k = 1 }) => (
  <Svg>
    {Array.from({ length: 9 }, (_, i) => {
      const x = ((((i * 260 + t * 900 * (0.8 + (i % 3) * 0.2)) % 1800) + 1800) % 1800) - 400;
      const y = 300 + ((i * 197) % 1300);
      return <path key={i} d={`M${x},${y} q90,-14 180,0 t180,0`} stroke="#ffffff" strokeWidth={4} fill="none" opacity={0.28 * k} strokeLinecap="round" />;
    })}
  </Svg>
);

// Sweat drops on the forehead and steam rising off a warm, damp body.
const Sweat: React.FC<{ p: HikerProps; t: number; k?: number }> = ({ p, t, k = 1 }) => {
  const g = hikerGeometry(p);
  const [hx, hy] = g.head;
  const [sx, sy] = g.sh;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      {[0, 1].map((i) => {
        const ph = (t * 0.7 + i * 0.5) % 1;
        return <path key={i} d={`M${hx + 14 + i * 8},${hy - 6 + ph * 18} q4,7 0,10 q-4,-3 0,-10 Z`} fill="#dff3ff" stroke="#9ccbe4" strokeWidth={0.8} opacity={1 - ph * 0.6} />;
      })}
      {[0, 1, 2].map((i) => {
        const ph = (t * 0.5 + i * 0.33) % 1;
        const x = sx - 20 + i * 18;
        return <path key={`s${i}`} d={`M${x},${sy - 10 - ph * 70} q8,-12 0,-24 q-8,-12 0,-24`} stroke="#ffffff" strokeWidth={4} fill="none" opacity={0.55 * (1 - ph)} strokeLinecap="round" />;
      })}
    </g>
  );
};

const Breath: React.FC<{ p: HikerProps; t: number }> = ({ p, t }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const ph = (t * 0.9) % 1;
  return (
    <g transform={hikerTransform(p)} opacity={(1 - ph) * 0.7}>
      <circle cx={hx + 34 + ph * 40} cy={hy + 8 - ph * 16} r={8 + ph * 18} fill="#ffffff" />
      <circle cx={hx + 50 + ph * 50} cy={hy + 2 - ph * 22} r={6 + ph * 14} fill="#ffffff" />
    </g>
  );
};

// Sandwich in the near hand.
const Sandwich: React.FC<{ p: HikerProps; shake: number }> = ({ p, shake }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] + 2 + shake},${h[1] - 22}) rotate(-12)`}>
        <path d="M-24,0 L24,0 L0,-30 Z" fill="#e8c48a" />
        <path d="M-20,-4 L20,-4 L0,-24 Z" fill="#7aa85a" />
        <path d="M-24,0 L24,0 L0,-30 Z" fill="none" stroke="#b88a4a" strokeWidth={3} />
      </g>
    </g>
  );
};

// Warm jacket held in the near hand (before it goes on) or strapped on the pack.
const HeldJacket: React.FC<{ p: HikerProps }> = ({ p }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] - 6},${h[1] - 6})`}>
        <path d="M-14,0 Q-30,40 -18,90 L22,92 Q34,40 18,0 Z" fill={KATE_WARM.jacket} />
        <path d="M-10,20 L18,20 M-14,46 L22,46 M-16,70 L22,70" stroke={KATE_WARM.jacketShade} strokeWidth={4} />
      </g>
    </g>
  );
};
const PackRoll: React.FC<{ p: HikerProps }> = ({ p }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)}>
      <rect x={g.sh[0] - 98} y={g.sh[1] - 22} width={70} height={34} rx={16} fill={KATE_WARM.jacket} />
      <rect x={g.sh[0] - 80} y={g.sh[1] - 24} width={6} height={38} fill="#2e3136" />
      <rect x={g.sh[0] - 50} y={g.sh[1] - 24} width={6} height={38} fill="#2e3136" />
    </g>
  );
};

// Foreground boulder she sits on (close-ups).
const Boulder: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-200,${y + 40} Q120,${y - 80} 520,${y - 60} Q900,${y - 50} 1280,${y + 60} L1280,2200 L-200,2200 Z`} fill="#6e6a62" />
    <path d={`M-200,${y + 40} Q120,${y - 80} 520,${y - 60} Q900,${y - 50} 1280,${y + 60} L1280,${y + 90} Q900,${y - 20} 520,${y - 30} Q120,${y - 50} -200,${y + 70} Z`} fill="#e9eef0" opacity={0.45} />
  </Svg>
);

// ============ S1 HOOK: medium, warm and sweaty at the cold overlook (0 - 2.75) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: t * 20 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 2.75), rot: hh.rot };
  const g = 1420;
  const p: HikerProps = { x: 470, y: g - 10, scale: 2.3, walk: 0, lean: 0.14, poles: false, handOverride: [40, 10], breathe: Math.sin(t * 5) * 3 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="a" treeY={1320} t={t} />
      <Plane cam={cam} depth={1}>
        <Ledge y={g} />
        <Subject>
          <Person {...p} outfit={KATE} expression="tired" />
          <Sweat p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24342c" side="right" sway={Math.sin(t * 5) * 12} />
      </Plane>
      <Wind t={t} k={0.6} />
      <Particles seed={531} n={22} col="#ffffff" fall={50} />
      <Grade sunX={800} sunY={620} cool="150,180,220" />
      <Title text={"She sat down sweaty.\nTen minutes later,\nshe was shivering."} t={t} t0={0} top={130} size={96} />
      <Chip text="Warm and sweaty" t={t} t0={1.49} x={80} y={480} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2a CLOSE-UP: sits on a rock, lunch, photos (2.7 - 5.75) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 3.05), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 2380, scale: 4.4, walk: 0, lean: 0.08, poles: false, handOverride: [46, -60], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="b" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={KATE} expression="happy" />
          <Sandwich p={p} shake={0} />
          <Sweat p={p} t={t} k={0.8} />
        </Subject>
        <Boulder y={1700} />
      </Plane>
      <Particles seed={532} n={16} col="#ffffff" fall={40} />
      <Grade sunX={800} sunY={620} vignette={0.58} cool="150,180,220" />
      <Chip text="Sat on a rock" t={t} t0={2.99} x={80} y={240} icon="none" big />
      <Chip text="Lunch" t={t} t0={4.05} x={80} y={370} icon="none" big />
      <Chip text="Photos" t={t} t0={4.76} x={300} y={370} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: ten minutes later she was shivering (5.7 - 8.25) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shiver = at(t, [7.0, 7.3], [0, 1]);
  const hh = handheld(t, 0.4, shiver * 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.14, lt / 2.55), rot: hh.rot };
  const p: HikerProps = { x: 470 + Math.sin(t * 60) * 4 * shiver, y: 2380, scale: 4.4, walk: 0, lean: 0.16, poles: false, handOverride: [30, -10], breathe: Math.sin(t * 9) * 2 * shiver };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="c" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(220,230,250,0.7)">
          <Person {...p} outfit={KATE} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
        <Boulder y={1700} />
      </Plane>
      <Wind t={t} k={1} />
      <Particles seed={533} n={26} col="#ffffff" fall={70} />
      <Grade sunX={300} sunY={700} warm="225,228,232" vignette={0.66} cool="150,180,220" />
      <Readout label="TEN MINUTES LATER" value="SHIVERING" ok={false} t={t} t0={5.88} x={80} y={240} pulseAt={7.24} />
    </AbsoluteFill>
  );
};

// ============ S2c WIDE: the cold stays with her all the way down (8.2 - 10.65) ============
const S2c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: -lt * 30 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.45), rot: hh.rot };
  const g = 1460;
  const ph = t * 4.4;
  const p: HikerProps = { x: 700 - lt * 50, y: g + 40, scale: 1.8, phase: ph, walk: 0.45, lean: 0.22, poles: false, handOverride: [30, -20], breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="d" treeY={g - 80} blur={1.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Path y={g} shift={cam.x} />
        <Subject col="rgba(220,230,250,0.7)">
          <Person {...p} outfit={KATE} flip expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24342c" side="left" sway={Math.sin(t * 5) * 12} />
      </Plane>
      <Wind t={t} k={1} />
      <Particles seed={534} n={26} col="#ffffff" fall={70} />
      <Grade sunX={300} sunY={700} warm="225,228,232" vignette={0.55} cool="150,180,220" />
      <Chip text="Cold all the way down" t={t} t0={8.24} x={80} y={240} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: the rule, jacket on, then sit (10.6 - 13.15) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const on = t >= 11.95;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 8 + hh.x, y: at(lt, [0, 1.2], [-50, 0]) + hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.05]), rot: hh.rot };
  const g = 1420;
  const zipK = at(t, [11.95, 12.3], [0, 1]);
  const p: HikerProps = { x: 470, y: g - 10, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: on ? [mix(34, 30, zipK), mix(-60, 30, zipK)] : [46, -20], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={1300} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Ledge y={g} frost={0.4} />
        <Subject>
          <Person {...p} outfit={on ? KATE_WARM : KATE} expression={on ? "happy" : "neutral"} />
          {!on && <HeldJacket p={p} />}
        </Subject>
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.18} />
      <Particles seed={535} n={14} col="#ffffff" fall={40} />
      <Grade sunX={830} sunY={580} />
      <Title text={"Jacket on,\nthen sit."} t={t} t0={11.52} top={200} size={150} />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: the moment you stop, warm layer on first (13.1 - 18.55) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: -lt * 6 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 5.45), rot: hh.rot };
  const p: HikerProps = { x: 480, y: 2380, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: [46, -60], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...p} outfit={KATE_WARM} expression="happy" />
          <Sandwich p={p} shake={0} />
        </Subject>
        <Boulder y={1700} />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.16} />
      <Particles seed={536} n={14} col="#ffffff" fall={30} />
      <Grade sunX={830} sunY={580} vignette={0.58} />
      <Chip text="The moment you stop" t={t} t0={13.47} x={80} y={240} icon="check" big />
      <Chip text="Warm layer on first" t={t} t0={15.21} x={80} y={370} icon="check" big />
      <Readout label="THEN SIT" value="BEFORE YOU COOL" ok={true} t={t} t0={16.77} x={80} y={500} />
    </AbsoluteFill>
  );
};

// ============ S3c MEDIUM: take it off before you start walking (18.5 - 21.05) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.55), rot: hh.rot };
  const g = 1460;
  const off2 = t >= 19.3;
  const walk = at(t, [19.6, 20.2], [0, 0.6]);
  const ph = t * 5;
  const p: HikerProps = { x: 330 + Math.max(0, t - 19.6) * 70, y: g + 40, scale: 2.3, phase: ph, walk, lean: 0.06, poles: false, handOverride: off2 ? freeHand(ph, walk) : [46, -20] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="g" treeY={g - 80} blur={1.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Path y={g} shift={cam.x} />
        <Subject>
          <Person {...p} outfit={off2 ? KATE : KATE_WARM} expression="happy" />
          {off2 && <PackRoll p={p} />}
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24342c" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.2} />
      <Particles seed={537} n={14} col="#ffffff" fall={30} />
      <Grade sunX={830} sunY={580} />
      <Chip text="Layer off" t={t} t0={18.82} x={80} y={240} icon="check" big />
      <Chip text="Before you walk" t={t} t0={19.62} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: warm at the top, warm on the way down (21.0 - 22.75) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 24 + hh.x, y: hh.y, zoom: at(lt, [0, 1.2], [1.14, 1.05]), rot: hh.rot };
  const g = 1400;
  const p: HikerProps = { x: 500, y: g - 10, scale: 2.3, walk: 0, lean: -0.04, poles: false, handOverride: [30, -190], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={1340} t={t} />
      <Plane cam={cam} depth={1}>
        <Ledge y={g} frost={0.4} />
        <Subject rimX={6} col="rgba(255,214,150,0.9)">
          <Person {...p} outfit={KATE_WARM} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={538} n={22} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"Warm all\nthe way down."} t={t} t0={off + 0.1} top={150} size={140} />
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
      spec="DIGITAL DOWNLOAD · GUIDE + CHECKLIST"
      name={
        <>
          Winter Hiking Guide
          <br />& Cold-Weather Checklist
        </>
      }
      nameSize={72}
      price="$7.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V53B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.75} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={2.7} to={5.75} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={2.7} />
    </Scene>
    <Scene from={5.7} to={8.25} fadeIn={0.08} fadeOut={0.1}>
      <S2b off={5.7} />
    </Scene>
    <Scene from={8.2} to={10.65} fadeIn={0.1} fadeOut={0.1}>
      <S2c off={8.2} />
    </Scene>
    <Scene from={10.6} to={13.15} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={10.6} />
    </Scene>
    <Scene from={13.1} to={18.55} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={13.1} />
    </Scene>
    <Scene from={18.5} to={21.05} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={18.5} />
    </Scene>
    <Scene from={21.0} to={22.75} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={21.0} />
    </Scene>
    <Scene from={22.6} to={27.5} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.7, 1560],
        [2.7, 5.7, 1560],
        [5.7, 8.2, 1560],
        [8.2, 10.6, 1560],
        [10.6, 13.1, 1560],
        [13.1, 18.5, 1560],
        [18.5, 21.0, 1560],
        [21.0, 22.6, 1560],
      ]}
    />
  </AbsoluteFill>
);
