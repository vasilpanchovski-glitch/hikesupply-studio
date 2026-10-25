// V34B: v34 "How to choose a waterproof hiking jacket" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, FPS, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v34b.json";

const words = vo.words as unknown as Word[];

const GREY: Sky = { top: "#4f5a64", mid: "#8f9aa1", low: "#c9ccc6", sun: [760, 560], sunR: 38, sunCol: "#eceee8", glow: "#d9dcd6" };
const STORM: Sky = { top: "#3c4650", mid: "#727d86", low: "#aeb3b0", sun: [740, 540], sunR: 30, sunCol: "#dfe2de", glow: "#c4c8c4" };
const CLEAR: Sky = { top: "#4a6f92", mid: "#a7bccb", low: "#e7e2cf", sun: [800, 620], sunR: 48, sunCol: "#fbf7ea", glow: "#efe6c8" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lerpC = (a: string, b: string, k: number) => {
  const A = hex(a);
  const B = hex(b);
  return "#" + A.map((v, i) => Math.round(mix(v, B[i], k)).toString(16).padStart(2, "0")).join("");
};

const LILY_BASE: Outfit = {
  ...GUIDE,
  skin: "#EDBE9C",
  skinShade: "#D29F7C",
  hair: "#7a4a2a",
  ponytail: "#7a4a2a",
  beard: null,
  cap: "#3d4a52",
  capShade: "#2c363d",
  pants: "#3f4448",
  pantsShade: "#2e3236",
  pack: "#5d6b4a",
  packShade: "#46523a",
};
// Cheap water-resistant jacket: pale sand, darkens as it soaks (k 0..1).
const cheap = (k: number): Outfit => ({ ...LILY_BASE, jacket: lerpC("#d8c690", "#8f8158", k), jacketShade: lerpC("#b9a874", "#6f6444", k) });
// Real waterproof shell: deep teal.
const SHELL: Outfit = { ...LILY_BASE, jacket: "#1f6f78", jacketShade: "#17565d" };
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e"];

const Woods: React.FC<{ y: number; shift: number; s?: number }> = ({ y, shift, s = 1 }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = (440 + (i % 3) * 70) * s;
      return i % 3 === 1 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c="#3b6550" c2="#2b4d3c" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={i % 2 ? "#c98a38" : "#a5562e"} c2={i % 2 ? "#a67028" : "#84431f"} />
      );
    })}
  </Svg>
);

const Trail: React.FC<{ y: number; wet?: number }> = ({ y, wet = 0 }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={900} fill={lerpC("#5f7a44", "#4a6236", wet)} />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 4} L1480,${y + 120} Q540,${y + 90} -400,${y + 120} Z`} fill={lerpC("#c0a67e", "#8a755a", wet)} />
    {wet > 0.3 && (
      <g opacity={wet}>
        <ellipse cx={300} cy={y + 50} rx={90} ry={12} fill="#a9b6bd" opacity={0.55} />
        <ellipse cx={820} cy={y + 70} rx={120} ry={14} fill="#a9b6bd" opacity={0.5} />
      </g>
    )}
    {Array.from({ length: 14 }, (_, i) => (
      <path key={i} d={`M${-300 + i * 120},${y - 46} l-8,-30 m8,30 l6,-36 m-6,36 l14,-24`} stroke="#4d6436" strokeWidth={5} strokeLinecap="round" />
    ))}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#e9ecee" seed={11} drift={t * 14} opacity={0.55} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={17} base={treeY - 260} amp={360} scale={240} col="#8a9aa6" lit="#dfe5ea" peak={150} />
    </Plane>
    <Haze y={treeY - 420} h={380} col={sky.low} opacity={0.8} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={37} base={treeY - 120} amp={240} scale={170} col="#6a7d72" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.5} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

const Rain: React.FC<{ on: number; n?: number; blur?: number; speed?: number }> = ({ on, n = 80, blur = 0, speed = 1700 }) => {
  const t = useCurrentFrame() / FPS;
  if (on <= 0) return null;
  return (
    <AbsoluteFill style={{ filter: blur ? `blur(${blur}px)` : undefined }}>
      <Svg>
        <g opacity={on} stroke="#e8eef4" strokeLinecap="round">
          {Array.from({ length: n }, (_, i) => {
            const x = ((i * 157) % 1180) - 50;
            const y = ((((t * speed + i * 293) % 2100) + 2100) % 2100) - 100;
            return <line key={i} x1={x} y1={y} x2={x - 10} y2={y + 54} strokeWidth={3} opacity={0.3 + (i % 4) * 0.1} />;
          })}
        </g>
      </Svg>
    </AbsoluteFill>
  );
};

// Dark soaked patches on the shoulders (local hiker units).
const Soak: React.FC<{ p: HikerProps; k: number }> = ({ p, k }) => {
  if (k <= 0) return null;
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={k * 0.55}>
      <ellipse cx={g.sh[0] - 6} cy={g.sh[1] + 16} rx={34} ry={22} fill="#4d4632" />
      <ellipse cx={g.sh[0] + 14} cy={g.sh[1] + 30} rx={22} ry={16} fill="#4d4632" />
    </g>
  );
};

// Beads bouncing off the shoulders (a shell sheds the rain).
const Beads: React.FC<{ p: HikerProps; t: number; on: number }> = ({ p, t, on }) => {
  if (on <= 0) return null;
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={on}>
      {Array.from({ length: 10 }, (_, i) => {
        const k = (t * 1.3 + i * 0.29) % 1;
        const dx = (i % 2 ? 1 : -1) * (14 + k * 46);
        const dy = -Math.sin(k * Math.PI) * 26 + k * 34;
        return <ellipse key={i} cx={g.sh[0] + dx} cy={g.sh[1] + 4 + dy} rx={2.4} ry={3.6} fill="#e3f2fa" opacity={1 - k} />;
      })}
    </g>
  );
};

// Sweat vapor rising from the collar and the open vents.
const Vapor: React.FC<{ p: HikerProps; t: number; on: number }> = ({ p, t, on }) => {
  if (on <= 0) return null;
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={on}>
      {Array.from({ length: 7 }, (_, i) => {
        const k = (t * 0.55 + i / 7) % 1;
        const x = g.sh[0] + (i % 3) * 14 - 14 + Math.sin(t * 2 + i) * 8;
        const y = g.sh[1] + 30 - k * 120;
        return <ellipse key={i} cx={x} cy={y} rx={8 + k * 16} ry={6 + k * 10} fill="#ffffff" opacity={(1 - k) * 0.45} />;
      })}
    </g>
  );
};

// ============ S1 HOOK: wide, Lily in a cheap jacket on a rainy fall hike (0 - 4.25) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: t * 16 + hh.x, y: hh.y, zoom: mix(1.0, 1.08, t / 4.25), rot: hh.rot };
  const g = 1440;
  const ph = t * 3.5;
  const p: HikerProps = { x: 240 + t * 60, y: g, scale: 1.45, phase: ph, walk: 0.7, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="a" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} wet={0.5} />
        <Subject rimX={3}>
          <Person {...p} outfit={cheap(0)} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rain on={0.7} n={60} />
      <Particles seed={41} n={14} leaves={LEAVES} fall={60} />
      <Grade sunX={760} sunY={560} warm="225,220,205" cool="25,45,65" />
      <Title text={"Water-resistant\nis not\nwaterproof"} t={t} t0={0} top={130} size={124} />
      <Chip text="Cheap water-resistant jacket" t={t} t0={2.31} x={80} y={560} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: an hour in, the shoulders soak through (4.2 - 6.65) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: lt * 18 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.45), rot: hh.rot };
  const g = 1380;
  const ph = lt * 3.2;
  const wet = at(t, [5.3, 6.4], [0, 1]);
  const p: HikerProps = { x: 400 + lt * 40, y: g + 200, scale: 2.3, phase: ph, walk: 0.6, lean: 0.14, poles: false, handOverride: freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={STORM} uid="b" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} wet={1} />
        <Subject rimX={2}>
          <Person {...p} outfit={cheap(wet * 0.6)} expression={wet > 0.5 ? "tired" : "neutral"} />
          <Soak p={p} k={wet} />
        </Subject>
      </Plane>
      <Rain on={1} n={90} />
      <Grade sunX={740} sunY={540} warm="215,215,210" cool="25,45,70" vignette={0.6} />
      <Chip text="An hour in" t={t} t0={4.28} x={80} y={240} icon="none" big />
      <Chip text="Shoulders soaked" t={t} t0={5.75} x={80} y={370} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: damp inside from sweat too (6.6 - 9.05) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.45), rot: hh.rot };
  const ph = 0.6 + lt * 1.4;
  const p: HikerProps = { x: 470, y: 2330, scale: 4.4, phase: ph, walk: 0.35, lean: 0.12, poles: false, handOverride: freeHand(ph, 0.35) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={STORM} uid="c" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3}>
          <Person {...p} outfit={cheap(0.6)} expression="tired" />
          <Soak p={p} k={1} />
        </Subject>
      </Plane>
      <Rain on={0.85} n={70} blur={1} />
      <Grade sunX={740} sunY={540} warm="215,215,210" cool="25,45,70" vignette={0.65} />
      <Readout label="INSIDE THE JACKET" value="DAMP FROM SWEAT" ok={false} t={t} t0={7.17} x={80} y={230} pulseAt={8.18} />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: how to choose a waterproof jacket (9.0 - 11.75) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: at(lt, [0, 2.75], [-80, 0]) + hh.y, zoom: at(lt, [0, 2.75], [1.12, 1.04]), rot: hh.rot };
  const g = 1380;
  const p: HikerProps = { x: 560, y: g + 200, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [40, 28], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} wet={0.5} />
        <Subject>
          <Person {...p} outfit={SHELL} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#4a2e14" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.16} />
      <Particles seed={43} n={18} leaves={LEAVES} fall={50} />
      <Grade sunX={800} sunY={620} />
      <Title text={"How to choose\na waterproof\njacket."} t={t} t0={9.1} top={170} size={130} />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: taped seams + membrane, rain beads off (11.7 - 15.65) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 3.95), rot: hh.rot };
  const ph = 0.8 + lt * 1.3;
  const p: HikerProps = { x: 470, y: 2330, scale: 4.4, phase: ph, walk: 0.35, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.35) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="e" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={SHELL} expression="happy" />
          <Beads p={p} t={t} on={at(t, [11.9, 12.3], [0, 1])} />
        </Subject>
      </Plane>
      <Rain on={0.8} n={70} blur={1} />
      <Grade sunX={760} sunY={560} vignette={0.6} />
      <Chip text="Waterproof" t={t} t0={11.74} x={80} y={240} icon="none" big />
      <Chip text="Taped seams" t={t} t0={12.82} x={80} y={370} icon="check" big />
      <Chip text="A membrane keeps rain out" t={t} t0={13.86} x={80} y={500} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3c MEDIUM: breathable, open the vents on the climb (15.6 - 20.1) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 14 + hh.x, y: hh.y, zoom: mix(1.03, 1.09, lt / 4.5), rot: hh.rot };
  const g = 1420;
  const ph = lt * 2.8;
  const slope = 0.16;
  const p: HikerProps = { x: 360 + lt * 34, y: g + 170 - lt * 5, scale: 2.3, phase: ph, walk: 0.6, lean: 0.22, slope, poles: false, handOverride: freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="f" treeY={g - 80} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g + 360} L1480,${g + 360 - 1880 * Math.tan(slope)} L1480,2400 L-400,2400 Z`} fill="#5a7441" />
          <path d={`M-400,${g + 400} L1480,${g + 400 - 1880 * Math.tan(slope)} L1480,${g + 520 - 1880 * Math.tan(slope)} L-400,${g + 520} Z`} fill="#a9926c" />
        </Svg>
        <Subject rimX={3}>
          <Person {...p} outfit={SHELL} expression="neutral" />
          <Vapor p={p} t={t} on={at(t, [16.3, 17.0], [0, 1])} />
        </Subject>
      </Plane>
      <Rain on={0.45} n={50} />
      <Particles seed={44} n={12} leaves={LEAVES} fall={50} />
      <Grade sunX={760} sunY={560} vignette={0.55} />
      <Chip text="Breathable" t={t} t0={15.68} x={80} y={240} icon="none" big />
      <Chip text="Sweat vapor escapes" t={t} t0={17.1} x={80} y={370} icon="check" big />
      <Chip text="Open the vents on climbs" t={t} t0={18.2} x={80} y={500} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3d WIDE: water-resistant only handles a light drizzle (20.05 - 23.25) ============
const S3d: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: lt * 14 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.2), rot: hh.rot };
  const g = 1440;
  const ph = lt * 3.3;
  const passer = { ...cheap(0.15), skin: "#B87C5C", skinShade: "#9A6247", hair: "#2a1f1a", ponytail: null, cap: "#7a2f2a", capShade: "#5c2320", pack: "#3E4F5C", packShade: "#2C3943" };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="g" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} wet={0.4} />
        <Subject>
          <Person x={260 + lt * 44} y={g} scale={1.35} phase={ph + 1.3} walk={0.6} lean={0.08} poles={false} handOverride={freeHand(ph + 1.3, 0.6)} outfit={passer} />
          <Person x={560 + lt * 44} y={g + 12} scale={1.35} phase={ph} walk={0.6} lean={0.08} poles={false} handOverride={freeHand(ph, 0.6)} outfit={SHELL} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Rain on={0.3} n={40} speed={1300} />
      <Particles seed={45} n={18} leaves={LEAVES} fall={50} />
      <Grade sunX={760} sunY={560} />
      <Readout label="WATER-RESISTANT" value="LIGHT DRIZZLE ONLY" ok={null} t={t} t0={20.13} x={80} y={230} pulseAt={22.4} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: the rain clears, Lily is dry all day (23.2 - 25.75) ============
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
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} wet={0.4} />
        <Subject rimX={6}>
          <Person {...p} outfit={SHELL} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.26} col="255,214,150" />
      <Particles seed={48} n={22} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"Dry\nall day."} t={t} t0={off + 0.1} top={180} size={160} />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/beginners-hiking-guide-card.jpg"
      spec="PRINTABLE GUIDE · 12 SHORT CHAPTERS"
      name={
        <>
          Beginner's
          <br />
          Hiking Guide
        </>
      }
      nameSize={100}
      price="$9.99"
      save="Save this before your next rainy hike"
    />
  );
};

export const V34B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.25} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={4.2} to={6.65} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={4.2} />
    </Scene>
    <Scene from={6.6} to={9.05} fadeIn={0.08} fadeOut={0.12}>
      <S2b off={6.6} />
    </Scene>
    <Scene from={9.0} to={11.75} fadeIn={0.12} fadeOut={0.1}>
      <S3a off={9.0} />
    </Scene>
    <Scene from={11.7} to={15.65} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={11.7} />
    </Scene>
    <Scene from={15.6} to={20.1} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={15.6} />
    </Scene>
    <Scene from={20.05} to={23.25} fadeIn={0.1} fadeOut={0.12}>
      <S3d off={20.05} />
    </Scene>
    <Scene from={23.2} to={25.75} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={23.2} />
    </Scene>
    <Scene from={25.7} to={30} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.2, 1560],
        [4.2, 6.6, 1560],
        [6.6, 9.0, 1560],
        [9.0, 11.7, 1560],
        [11.7, 15.6, 1560],
        [15.6, 20.05, 1560],
        [20.05, 23.2, 1560],
        [23.2, 25.7, 1560],
      ]}
    />
  </AbsoluteFill>
);
