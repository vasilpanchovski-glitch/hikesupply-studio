// V46B: v46 "Eat before you get cold" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v46b.json";

const words = vo.words as unknown as Word[];

const COLD: Sky = { top: "#45627f", mid: "#a7b8c6", low: "#e4e6e4", sun: [800, 620], sunR: 44, sunCol: "#f8f8f2", glow: "#e8ecec" };
const GREY: Sky = { top: "#53667a", mid: "#9eabb6", low: "#d9dcdc", sun: [300, 700], sunR: 36, sunCol: "#f0f0ea", glow: "#dfe2e1" };
const CLEAR: Sky = { top: "#3a6d9e", mid: "#b6cbdc", low: "#eef0e8", sun: [830, 580], sunR: 50, sunCol: "#fffbe8", glow: "#ffeac0" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const DAN: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#BC8462",
  hair: "#3b2a1e",
  beard: "#3b2a1e",
  cap: "#B5553A",
  capShade: "#8E3F2A",
  jacket: "#2F5F7A",
  jacketShade: "#244a60",
  pants: "#3a3d42",
  pantsShade: "#2a2c30",
  pack: "#C9A23E",
  packShade: "#a5832c",
  glove: "#2E3438",
};

// ---------- scenery ----------
const Firs: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 11 }, (_, i) => {
      const x = ((((-160 + i * 150 - shift) % 1650) + 1650) % 1650) - 300;
      const h = 380 + (i % 3) * 80;
      return (
        <g key={i}>
          <Pine x={x} y={y + (i % 2) * 22} h={h} c="#4d6e62" c2="#3a574d" />
        </g>
      );
    })}
  </Svg>
);

// Frosty trail with snow patches.
const SnowTrail: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={1000} fill="#8a9488" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 6} L1480,${y + 110} Q540,${y + 90} -400,${y + 110} Z`} fill="#a89a84" />
    {Array.from({ length: 9 }, (_, i) => {
      const x = ((((i * 230 - shift) % 2070) + 2070) % 2070) - 400;
      return <ellipse key={i} cx={x} cy={y + 180 + (i % 3) * 70} rx={120 + (i % 2) * 60} ry={26} fill="#eef2f3" opacity={0.9} />;
    })}
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 6} L1480,${y + 8} Q540,${y - 10} -400,${y + 8} Z`} fill="#eef2f3" opacity={0.7} />
  </Svg>
);

// Rocky summit with frost.
const Summit: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y + 10} L120,${y - 30} L460,${y - 10} L820,${y - 40} L1480,${y} L1480,${y + 900} L-400,${y + 900} Z`} fill="#6e6a62" />
    <path d={`M-400,${y + 10} L120,${y - 30} L460,${y - 10} L820,${y - 40} L1480,${y} L1480,${y + 40} L820,${y} L460,${y + 30} L120,${y + 10} L-400,${y + 50} Z`} fill="#e9eef0" opacity={0.6} />
    <path d={`M60,${y + 120} l120,-40 l90,60 Z M640,${y + 200} l160,-50 l110,70 Z M300,${y + 380} l140,-40 l120,60 Z`} fill="#58554e" />
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#ffffff" seed={12} drift={t * 20} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.12} blur={2.8 + blur}>
      <Ridge seed={71} base={treeY - 300} amp={420} scale={240} col="#9aabba" lit="#f2f5f7" peak={220} />
    </Plane>
    <Haze y={treeY - 440} h={380} col={sky.low} opacity={0.7} />
    <Plane cam={cam} depth={0.25} blur={1.8 + blur}>
      <Ridge seed={77} base={treeY - 150} amp={260} scale={200} col="#7a8d94" lit="#dfe6ea" peak={90} />
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

// Breath clouds from the mouth.
const Breath: React.FC<{ p: HikerProps; t: number; k?: number }> = ({ p, t, k = 1 }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const ph = (t * 0.9) % 1;
  return (
    <g transform={hikerTransform(p)} opacity={k * (1 - ph) * 0.7}>
      <circle cx={hx + 34 + ph * 40} cy={hy + 8 - ph * 16} r={8 + ph * 18} fill="#ffffff" />
      <circle cx={hx + 50 + ph * 50} cy={hy + 2 - ph * 22} r={6 + ph * 14} fill="#ffffff" />
    </g>
  );
};

// Snack bar in the near hand (wrapper peeled back when eating).
const Bar: React.FC<{ p: HikerProps; open?: number }> = ({ p, open = 0 }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] - 4},${h[1] - 40}) rotate(-12)`}>
        <rect x={0} y={0} width={18} height={50} rx={3} fill="#8a5a32" />
        <rect x={0} y={14 * open} width={18} height={50 - 14 * open} rx={3} fill="#E2B33C" />
        <rect x={2} y={24} width={14} height={10} rx={2} fill="#fff6d8" opacity={0.85} />
      </g>
    </g>
  );
};

// Snack bag still zipped inside the pack, the "treat" for the top.
const PackTreat: React.FC<{ x: number; y: number; s: number; glow: number }> = ({ x, y, s, glow }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-60} y={-200} width={120} height={200} rx={36} fill="#C9A23E" stroke="rgba(0,0,0,0.25)" strokeWidth={2} />
    <rect x={-60} y={-200} width={40} height={200} rx={24} fill="#a5832c" />
    <rect x={-50} y={-226} width={100} height={46} rx={20} fill="#a5832c" />
    <g transform="translate(10,-246) rotate(10)">
      <path d="M-22,0 L22,0 L26,52 L-26,52 Z" fill="#B5553A" />
      <rect x={-23} y={-6} width={46} height={8} rx={2} fill="#8E3F2A" />
      <rect x={-12} y={18} width={24} height={14} rx={3} fill="#fff6d8" opacity={0.85} />
    </g>
    {glow > 0 && <circle cx={10} cy={-230} r={84} fill="none" stroke="#ffffff" strokeWidth={6} opacity={glow * 0.8} />}
  </g>
);

// Close-up of the open jacket: an inside pocket on the fleece lining, a gloved hand slides a bar in.
const Pocket: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const slide = at(t, [t0, t0 + 1.3], [0, 1]);
  const bx = mix(760, 470, slide);
  const by = mix(380, 860, slide);
  return (
    <Svg>
      {/* fleece lining fills the frame */}
      <rect x={-200} y={-200} width={1480} height={2400} fill="#c9c2b3" />
      {Array.from({ length: 60 }, (_, i) => (
        <circle key={i} cx={(i * 197) % 1080} cy={(i * 331) % 1920} r={3 + (i % 3)} fill="#b9b2a3" />
      ))}
      {/* outer shell on the left, zipper edge */}
      <path d="M-200,-200 L260,-200 Q300,900 230,2200 L-200,2200 Z" fill="#2F5F7A" />
      <path d="M-200,-200 L120,-200 Q150,900 100,2200 L-200,2200 Z" fill="#244a60" />
      <path d="M260,-200 Q300,900 230,2200" stroke="#1d2f3c" strokeWidth={22} fill="none" strokeDasharray="10 8" />
      {/* inside pocket back */}
      <rect x={380} y={780} width={420} height={560} rx={30} fill="#a9a191" stroke="#8f887a" strokeWidth={6} />
      {/* bar */}
      <g transform={`translate(${bx},${by}) rotate(${mix(-28, 0, slide)})`}>
        <rect x={0} y={0} width={240} height={420} rx={22} fill="#E2B33C" />
        <rect x={0} y={0} width={240} height={50} rx={14} fill="#C9962A" />
        <rect x={30} y={170} width={180} height={100} rx={14} fill="#fff6d8" opacity={0.9} />
      </g>
      {/* pocket front with zip, covers the bar's lower part */}
      <rect x={380} y={1020} width={420} height={320} rx={30} fill="#b7af9f" stroke="#8f887a" strokeWidth={6} />
      <line x1={400} y1={1020} x2={780} y2={1020} stroke="#4a4a4a" strokeWidth={12} strokeDasharray="12 6" />
      <circle cx={790} cy={1020} r={14} fill="#4a4a4a" />
      {/* gloved hand pushing the bar from the top right */}
      <g transform={`translate(${bx + 170},${by - 60}) rotate(30)`} opacity={at(t, [t0 + 1.25, t0 + 1.7], [1, 0])}>
        <rect x={60} y={-60} width={700} height={230} rx={110} fill="#2F5F7A" />
        <rect x={40} y={-70} width={60} height={250} rx={24} fill="#244a60" />
        <path d="M-150,-40 Q-170,60 -140,140 Q-60,190 40,150 L60,-40 Q-40,-90 -150,-40 Z" fill="#2E3438" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-200} y={-30 + i * 42} width={110} height={36} rx={18} fill="#2E3438" />
        ))}
      </g>
    </Svg>
  );
};

// ============ S1 HOOK: wide, the climb, treat saved for the top (0 - 4.3) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: t * 26 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 4.3), rot: hh.rot };
  const g = 1460;
  const ph = t * 4.2;
  const p: HikerProps = { x: 420 + t * 30, y: g + 40, scale: 2.3, phase: ph, walk: 0.55, lean: 0.12, poles: false, handOverride: freeHand(ph, 0.55), breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="a" treeY={g - 80} blur={1.5} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowTrail y={g} shift={cam.x} />
        <Subject>
          <Person {...p} outfit={DAN} expression="neutral" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24342c" side="right" sway={Math.sin(t * 2) * 8} />
      </Plane>
      <Particles seed={71} n={30} col="#ffffff" fall={50} />
      <Grade sunX={800} sunY={620} cool="150,180,220" />
      <Title text={"He saved his snacks\nfor the summit"} t={t} t0={0} top={130} size={104} />
      <Chip text="3 cold hours" t={t} t0={1.95} x={80} y={400} icon="none" big />
      <Chip text="Nothing to eat" t={t} t0={3.01} x={80} y={530} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2a CLOSE-UP: shivering and slow, even in warm layers (4.25 - 8.1) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const shiver = Math.sin(t * 48) * 2.2;
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.13, lt / 3.85), rot: hh.rot };
  const p: HikerProps = { x: 470 + shiver, y: 2330, scale: 4.4, walk: 0, lean: 0.12, poles: false, handOverride: [26, 4], breathe: Math.sin(t * 5) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="b" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={DAN} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={72} n={26} col="#ffffff" fall={60} />
      <Grade sunX={300} sunY={700} vignette={0.6} cool="150,180,220" />
      <Chip text="Shivering" t={t} t0={5.28} x={80} y={240} icon="x" big />
      <Chip text="Slow" t={t} t0={6.3} x={80} y={370} icon="x" big />
      <Chip text="Even in warm layers" t={t} t0={7.15} x={80} y={500} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2b MEDIUM: nothing left to burn, snacks still in the pack (8.05 - 10.65) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 12 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.6), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 360, y: g - 10, scale: 2.3, walk: 0, lean: 0.24, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 5) * 3 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="c" treeY={1300} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Svg>
          <PackTreat x={790} y={g - 20} s={1.5} glow={at(t, [8.9, 9.2], [0, 1])} />
        </Svg>
        <Subject>
          <Person {...p} outfit={DAN} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={73} n={24} col="#ffffff" fall={60} />
      <Grade sunX={300} sunY={700} vignette={0.5} cool="150,180,220" />
      <Readout label="FUEL" value="EMPTY" ok={false} t={t} t0={8.31} x={80} y={240} pulseAt={9.66} />
      <Chip text="Snacks still packed" t={t} t0={8.9} x={80} y={470} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: the fix, a small snack about every hour (10.6 - 16.2) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const eat = t >= 12.6;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 8 + hh.x, y: at(lt, [0, 1.4], [-50, 0]) + hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.05]), rot: hh.rot };
  const g = 1460;
  const bite = eat ? Math.max(0, Math.sin((t - 12.6) * 2.2)) : 0;
  const p: HikerProps = { x: 400, y: g + 40, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: eat ? [mix(40, 30, bite), mix(-10, -80, bite)] : [40, 30], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={g - 80} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowTrail y={g} shift={cam.x} />
        <Subject>
          <Person {...p} outfit={DAN} expression={eat ? "happy" : "neutral"} />
          {eat && <Bar p={p} open={at(t, [12.6, 13.0], [0, 1])} />}
        </Subject>
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.18} />
      <Particles seed={74} n={16} col="#ffffff" fall={40} />
      <Grade sunX={830} sunY={580} />
      <Title text={"A small snack\nabout every hour."} t={t} t0={11.26} top={190} size={106} />
      <Chip text="Before you feel hungry" t={t} t0={14.58} x={80} y={500} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: food is fuel, fuel makes heat (16.15 - 18.4) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: -lt * 6 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 2.25), rot: hh.rot };
  const p: HikerProps = { x: 520, y: 2350, scale: 4.4, walk: 0, lean: 0.02, poles: false, handOverride: [30, -76], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,214,150,0.85)">
          <Person {...p} outfit={DAN} expression="happy" />
          <Bar p={p} open={1} />
        </Subject>
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.22} />
      <Particles seed={75} n={14} col="#ffffff" fall={30} />
      <Grade sunX={830} sunY={580} vignette={0.55} warm="255,200,140" />
      <Chip text="Food is fuel" t={t} t0={16.24} x={80} y={240} icon="check" big />
      <Chip text="Fuel makes heat" t={t} t0={17.09} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3c CLOSE-UP: bars in an inside pocket (18.35 - 22.3) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.95), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Pocket t={t} t0={18.5} />
      </Plane>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 62%, rgba(20,24,28,0.45) 85%, rgba(20,24,28,0.3) 100%)" }} />
      <Particles seed={76} n={10} col="#ffffff" fall={30} />
      <Grade sunX={830} sunY={580} vignette={0.6} />
      <Chip text="Inside pocket" t={t} t0={19.39} x={80} y={240} icon="check" big />
      <Chip text="Bars don't freeze hard" t={t} t0={20.82} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: Dan reached the top warm (22.25 - 24.4) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 24 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.04]), rot: hh.rot };
  const g = 1400;
  const p: HikerProps = { x: 500, y: g - 10, scale: 2.0, walk: 0, lean: -0.04, poles: false, handOverride: [30, -150], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="g" treeY={1340} t={t} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={6} col="rgba(255,214,150,0.9)">
          <Person {...p} outfit={DAN} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={77} n={22} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"Warm at\nthe top."} t={t} t0={off + 0.1} top={150} size={140} />
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

export const V46B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.3} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={4.25} to={8.1} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={4.25} />
    </Scene>
    <Scene from={8.05} to={10.65} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={8.05} />
    </Scene>
    <Scene from={10.6} to={16.2} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={10.6} />
    </Scene>
    <Scene from={16.15} to={18.4} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={16.15} />
    </Scene>
    <Scene from={18.35} to={22.3} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={18.35} />
    </Scene>
    <Scene from={22.25} to={24.4} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={22.25} />
    </Scene>
    <Scene from={24.3} to={29} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.25, 1560],
        [4.25, 8.05, 1560],
        [8.05, 10.6, 1560],
        [10.6, 16.15, 1560],
        [16.15, 18.35, 1560],
        [18.35, 22.25, 1560],
        [22.25, 24.3, 1560],
      ]}
    />
  </AbsoluteFill>
);
