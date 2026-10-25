// V36B: v36 "One big coat vs thin layers" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v36b.json";

const words = vo.words as unknown as Word[];

const FROST: Sky = { top: "#4e6d8c", mid: "#a8bccb", low: "#e9ece6", sun: [780, 640], sunR: 44, sunCol: "#fdfbf2", glow: "#eef0e6" };
const CLIMB: Sky = { top: "#4a7099", mid: "#b2c6d4", low: "#f1ead8", sun: [840, 560], sunR: 48, sunCol: "#fffbe8", glow: "#f6e6c0" };
const CHILL: Sky = { top: "#3e5770", mid: "#8ea2b2", low: "#d2d8d8", sun: [760, 600], sunR: 36, sunCol: "#eef0ea", glow: "#d8dde0" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lerpC = (a: string, b: string, k: number) => {
  const A = hex(a);
  const B = hex(b);
  return "#" + A.map((v, i) => Math.round(mix(v, B[i], k)).toString(16).padStart(2, "0")).join("");
};

const RYAN: Outfit = {
  ...JAKE,
  skin: "#E6B08F",
  skinShade: "#C99273",
  hair: "#8a5a32",
  beard: "#8a5a32",
  cap: "#3b4650",
  capShade: "#2b343c",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};
const COAT: Outfit = { ...RYAN, jacket: "#7a3b2e", jacketShade: "#5e2d23" };
const tshirt = (damp: number): Outfit => ({ ...RYAN, jacket: lerpC("#b9bfc4", "#7f878e", damp), jacketShade: lerpC("#9aa1a7", "#646b72", damp) });
const BASE: Outfit = { ...RYAN, jacket: "#6f7f8c", jacketShade: "#566572" };
const FLEECE: Outfit = { ...RYAN, jacket: "#2f62b8", jacketShade: "#244d92" };
const SHELL: Outfit = { ...RYAN, jacket: "#3e5c45", jacketShade: "#2f4735" };
const LEAVES = ["#c9863a", "#a5552c", "#b57a3e"];

const Woods: React.FC<{ y: number; shift: number; frost?: number }> = ({ y, shift, frost = 0 }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = 440 + (i % 3) * 70;
      return i % 3 === 2 ? (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={lerpC("#a8662e", "#b9a28a", frost * 0.4)} c2="#84481f" />
      ) : (
        <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c={lerpC("#3b6550", "#7d9a8e", frost * 0.45)} c2={lerpC("#2b4d3c", "#5e7a70", frost * 0.45)} />
      );
    })}
  </Svg>
);

const Trail: React.FC<{ y: number; frost?: number }> = ({ y, frost = 0 }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={900} fill={lerpC("#5f7a44", "#a7b4a8", frost)} />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 4} L1480,${y + 120} Q540,${y + 90} -400,${y + 120} Z`} fill={lerpC("#c0a67e", "#cfc7ba", frost * 0.6)} />
    {Array.from({ length: 14 }, (_, i) => (
      <path key={i} d={`M${-300 + i * 120},${y - 46} l-8,-30 m8,30 l6,-36 m-6,36 l14,-24`} stroke={lerpC("#4d6436", "#dfe6ea", frost)} strokeWidth={5} strokeLinecap="round" />
    ))}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; frost?: number }> = ({ cam, sky, uid, treeY, blur = 0, t, frost = 0 }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#ffffff" seed={9} drift={t * 10} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={19} base={treeY - 260} amp={400} scale={250} col="#8fa3b4" lit="#f1f4f6" peak={190} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.75} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={29} base={treeY - 120} amp={260} scale={180} col="#6f8577" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.45} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} frost={frost} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Cold breath puffs in front of the face (local hiker units).
const Breath: React.FC<{ p: HikerProps; t: number; on: number }> = ({ p, t, on }) => {
  if (on <= 0) return null;
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={on}>
      {Array.from({ length: 3 }, (_, i) => {
        const k = (t * 0.6 + i / 3) % 1;
        return <ellipse key={i} cx={g.head[0] + 34 + k * 60} cy={g.head[1] + 10 - k * 20} rx={8 + k * 18} ry={6 + k * 10} fill="#ffffff" opacity={(1 - k) * 0.5} />;
      })}
    </g>
  );
};

// Sweat drops at the temple.
const Sweat: React.FC<{ p: HikerProps; t: number; on: number }> = ({ p, t, on }) => {
  if (on <= 0) return null;
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={on}>
      {Array.from({ length: 3 }, (_, i) => {
        const k = (t * 0.9 + i / 3) % 1;
        return <path key={i} d={`M${g.head[0] - 18 + i * 10},${g.head[1] - 6 + k * 26} q-3,6 0,8 q3,-2 0,-8 Z`} fill="#dff1fb" opacity={1 - k * 0.6} transform={`scale(1)`} />;
      })}
    </g>
  );
};

// ============ S1 HOOK: wide, Ryan in his heaviest coat on a frosty morning (0 - 3.85) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: t * 16 + hh.x, y: hh.y, zoom: mix(1.0, 1.08, t / 3.85), rot: hh.rot };
  const g = 1440;
  const ph = t * 3.4;
  const p: HikerProps = { x: 240 + t * 56, y: g, scale: 1.45, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={FROST} uid="a" treeY={g - 40} t={t} frost={1} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} frost={1} />
        <Subject rimX={3}>
          <Person {...p} outfit={COAT} />
          <Breath p={p} t={t} on={1} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3328" side="right" />
      </Plane>
      <Rays x={FROST.sun[0]} y={FROST.sun[1]} strength={0.16} col="235,240,255" />
      <Particles seed={71} n={26} col="#ffffff" fall={40} />
      <Grade sunX={780} sunY={640} warm="235,230,220" cool="30,50,75" />
      <Title text={"One big coat\nwas his\nmistake"} t={t} t0={0} top={130} size={128} />
      <Chip text="His heaviest coat" t={t} t0={1.54} x={80} y={600} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: first climb, sweating, coat off (3.8 - 6.6) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: lt * 14 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.8), rot: hh.rot };
  const g = 1420;
  const off2 = t > 5.98;
  const ph = lt * 2.8;
  const slope = 0.15;
  const walk = off2 ? 0.1 : 0.6;
  const p: HikerProps = { x: 360 + Math.min(lt, 2.1) * 34, y: g + 170 - Math.min(lt, 2.1) * 5, scale: 2.3, phase: ph, walk, lean: 0.2, slope, poles: false, handOverride: freeHand(ph, walk) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLIMB} uid="b" treeY={g - 80} blur={2.5} t={t} frost={0.6} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g + 360} L1480,${g + 360 - 1880 * Math.tan(slope)} L1480,2400 L-400,2400 Z`} fill="#8a9a80" />
          <path d={`M-400,${g + 400} L1480,${g + 400 - 1880 * Math.tan(slope)} L1480,${g + 520 - 1880 * Math.tan(slope)} L-400,${g + 520} Z`} fill="#bfb3a0" />
        </Svg>
        <Subject rimX={3}>
          <Person {...p} outfit={off2 ? tshirt(0.4) : COAT} expression="tired" />
          <Sweat p={p} t={t} on={at(t, [4.9, 5.3], [0, 1])} />
        </Subject>
      </Plane>
      <Particles seed={72} n={14} col="#ffffff" fall={30} />
      <Grade sunX={840} sunY={560} vignette={0.55} />
      <Chip text="First climb" t={t} t0={4.17} x={80} y={240} icon="none" big />
      <Chip text="Sweating" t={t} t0={5.09} x={80} y={370} icon="x" big />
      <Chip text="Coat off" t={t} t0={5.98} x={80} y={500} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: minutes later, frozen in a damp T-shirt (6.55 - 9.3) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shiver = Math.sin(t * 38) * 3;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.75), rot: hh.rot };
  const p: HikerProps = { x: 480 + shiver, y: 2350, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: [40, 22], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CHILL} uid="c" treeY={1250} blur={9} t={t} frost={1} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3}>
          <Person {...p} outfit={tshirt(1)} expression="tired" />
          <Breath p={p} t={t} on={1} />
        </Subject>
      </Plane>
      <Particles seed={73} n={22} col="#ffffff" fall={40} />
      <Grade sunX={760} sunY={600} warm="215,220,230" cool="25,45,75" vignette={0.65} />
      <Chip text="Minutes later" t={t} t0={6.63} x={80} y={240} icon="none" big />
      <Readout label="DAMP T-SHIRT" value="FREEZING" ok={false} t={t} t0={8.44} x={80} y={370} pulseAt={8.53} />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: the fix, dress in thin layers (9.25 - 11.75) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: at(lt, [0, 2.5], [-80, 0]) + hh.y, zoom: at(lt, [0, 2.5], [1.12, 1.04]), rot: hh.rot };
  const g = 1380;
  const p: HikerProps = { x: 560, y: g + 200, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [40, 28], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLIMB} uid="d" treeY={g - 60} blur={2.5} t={t} frost={0.5} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} frost={0.5} />
        <Subject>
          <Person {...p} outfit={FLEECE} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#2a3328" side="left" />
      </Plane>
      <Rays x={CLIMB.sun[0]} y={CLIMB.sun[1]} strength={0.2} />
      <Particles seed={74} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={840} sunY={560} />
      <Title text={"Dress in\nthin layers."} t={t} t0={9.33} top={200} size={150} />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: base layer, fleece, shell stack up (11.7 - 16.8) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 8 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 5.1), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 2330, scale: 4.4, walk: 0, lean: 0.05, poles: false, handOverride: [40, 22], breathe: Math.sin(t * 2.3) * 2 };
  const stage = t < 13.54 ? BASE : t < 14.85 ? FLEECE : SHELL;
  const flash = Math.max(at(t, [13.54, 13.62, 13.85], [0, 1, 0]), at(t, [14.85, 14.93, 15.16], [0, 1, 0]));
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLIMB} uid="e" treeY={1250} blur={9} t={t} frost={0.5} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={stage} expression="happy" />
        </Subject>
      </Plane>
      <AbsoluteFill style={{ background: "#fff", opacity: flash * 0.25 }} />
      <Particles seed={75} n={16} leaves={LEAVES} fall={40} />
      <Grade sunX={840} sunY={560} vignette={0.6} />
      <Chip text="Base layer: wicks sweat" t={t} t0={11.92} x={80} y={240} icon="check" />
      <Chip text="Fleece: warmth" t={t} t0={13.59} x={80} y={350} icon="check" />
      <Chip text="Wind or rain shell on top" t={t} t0={15.14} x={80} y={460} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S3c MEDIUM: too warm, take one off; cold at the break, add it back (16.75 - 20.5) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 12 + hh.x, y: hh.y, zoom: mix(1.03, 1.09, lt / 3.75), rot: hh.rot };
  const g = 1380;
  const stopped = at(t, [18.1, 18.5], [0, 1]);
  const ph = Math.min(t, 18.3) * 3.2;
  const walk = 0.6 * (1 - stopped);
  const outfit = t < 17.9 ? SHELL : t < 19.45 ? FLEECE : SHELL;
  const p: HikerProps = { x: 380 + Math.min(lt, 1.5) * 60, y: g + 200, scale: 2.3, phase: ph, walk, lean: 0.08, poles: false, handOverride: freeHand(ph, walk), breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={t < 18.1 ? CLIMB : CHILL} uid={t < 18.1 ? "f1" : "f2"} treeY={g - 60} blur={2.5} t={t} frost={0.5} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} frost={0.5} />
        <Svg>
          <path d="M760,1560 Q780,1480 880,1470 L1080,1468 L1080,1600 Q900,1610 760,1560 Z" fill="#8d877b" />
        </Svg>
        <Subject rimX={3}>
          <Person {...p} outfit={outfit} expression="happy" />
          <Breath p={p} t={t} on={stopped} />
        </Subject>
      </Plane>
      <Particles seed={76} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={840} sunY={560} vignette={0.5} />
      <Chip text="Too warm? Take one off" t={t} t0={17.08} x={80} y={240} icon="check" big />
      <Chip text="Cold at the break? Add it back" t={t} t0={18.26} x={80} y={370} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: comfortable all morning (20.45 - 22.9) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 16 + hh.x, y: hh.y, zoom: at(lt, [0, 1.2], [1.16, 1.04]), rot: hh.rot };
  const g = 1380;
  const ph = lt * 3.2;
  const p: HikerProps = { x: 420 + lt * 30, y: g + 200, scale: 2.3, phase: ph, walk: 0.6, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g - 60} blur={2.5} t={t} frost={0.2} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} frost={0.2} />
        <Subject rimX={6}>
          <Person {...p} outfit={FLEECE} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.26} col="255,214,150" />
      <Particles seed={78} n={22} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"Comfortable\nall morning."} t={t} t0={off + 0.1} top={180} size={140} />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/polar-fleece-soft-shell-jacket-mens-cut.png"
      cutoutH={780}
      spec="MEN'S · 320G FLEECE · WINDPROOF FACE"
      name={
        <>
          Polar Fleece
          <br />
          Soft-Shell Jacket
        </>
      }
      nameSize={88}
      price="$39.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V36B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.85} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.8} to={6.6} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={3.8} />
    </Scene>
    <Scene from={6.55} to={9.3} fadeIn={0.08} fadeOut={0.12}>
      <S2b off={6.55} />
    </Scene>
    <Scene from={9.25} to={11.75} fadeIn={0.12} fadeOut={0.1}>
      <S3a off={9.25} />
    </Scene>
    <Scene from={11.7} to={16.8} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={11.7} />
    </Scene>
    <Scene from={16.75} to={20.5} fadeIn={0.1} fadeOut={0.12}>
      <S3c off={16.75} />
    </Scene>
    <Scene from={20.45} to={22.9} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={20.45} />
    </Scene>
    <Scene from={22.85} to={27.5} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.8, 1560],
        [3.8, 6.55, 1560],
        [6.55, 9.25, 1560],
        [9.25, 11.7, 1560],
        [11.7, 16.75, 1560],
        [16.75, 20.45, 1560],
        [20.45, 22.85, 1560],
      ]}
    />
  </AbsoluteFill>
);
