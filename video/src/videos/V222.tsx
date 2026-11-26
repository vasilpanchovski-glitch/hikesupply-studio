// V222: "Desert trip. Freezing by sunset." Short format (16.6 s, 41 words), cinematic C01 style, Joshua Tree in January.
// Product: Joshua Tree National Park — Trip Planning Guide, $9.99 (live Shopify). End card = the real cover (boxed photo card, like V218).
// Facts (NPS): winter nights in Joshua Tree are cold and can drop below freezing. Advice (conservative): for any hike that
// could run near dark, pack a warm jacket, hat and gloves. No temperature numbers beyond "below freezing (32°F / 0°C)".
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { Shorts } from "../cold";
import { Boulders, DesertBackdrop, JTree, Sand } from "./V218";
import vo from "../vo/v222.json";

const words = vo.words as unknown as Word[];

const MOJAVE: Sky = { top: "#2f6aa6", mid: "#9cc4e2", low: "#f6e2c4", sun: [800, 470], sunR: 50, sunCol: "#fffbea", glow: "#ffe6b8" };
const DUSK: Sky = { top: "#2c3e6b", mid: "#c98a7a", low: "#f3b27a", sun: [820, 1080], sunR: 56, sunCol: "#ffe2b0", glow: "#ff9d5c" };
const NIGHT: Sky = { top: "#0b1430", mid: "#1d2c52", low: "#3a4870", sun: [800, 400], sunR: 34, sunCol: "#f4f1e0", glow: "#7f90bb" };

const KHAKI = "#b59a6a";
const KHAKI2 = "#98804f";
const JAKE_T: Outfit = {
  ...JAKE,
  skin: "#E2A98A",
  skinShade: "#C4876A",
  beard: "#5A3E2E",
  cap: "#C9B48E",
  capShade: "#A8946F",
  jacket: "#C9D4D8", // light T-shirt
  jacketShade: "#a9b6bb",
  pants: "#E2A98A", // bare legs, shorts drawn on top
  pantsShade: "#C4876A",
  pack: "#3F6B55",
  packShade: "#2D5141",
};
const JAKE_WARM: Outfit = { ...JAKE_T, jacket: "#B5553A", jacketShade: "#8E3F2A", cap: "#2F5D7C", capShade: "#244a63", glove: "#2a2a2a", pants: "#4A4E55", pantsShade: "#363A40" };

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(30,20,12,0) 0%, rgba(30,20,12,0.45) 45%, rgba(30,20,12,0.45) 70%, rgba(30,20,12,0) 100%)" }} />
);

const Stars: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    {Array.from({ length: 70 }, (_, i) => {
      const x = (i * 157) % 1080;
      const y = 60 + ((i * 97) % 900);
      const tw = 0.5 + 0.5 * Math.sin(t * 3 + i);
      return <circle key={i} cx={x} cy={y} r={1.5 + (i % 3)} fill="#fff" opacity={0.35 + 0.5 * tw} />;
    })}
  </Svg>
);

// ============ S1 HOOK WIDE: Jake in shorts and a T-shirt, sunny Joshua Tree in January (0 - 3.06) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.04, 1.11, t / 3.1), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.3;
  const p: HikerProps = { x: 330 + t * 40, y: g + 20, scale: 2.3, phase: ph, walk: 0.6, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <DesertBackdrop cam={cam} sky={MOJAVE} uid="a" y={g - 100} t={t} />
      <Plane cam={cam} depth={1}>
        <Sand y={g} />
        <Subject rimX={5}>
          <JTree x={880} y={g - 20} s={1.35} seed={1} />
          <Person {...p} outfit={JAKE_T} expression="happy" />
          <Shorts p={p} col={KHAKI} shade={KHAKI2} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <Svg>
          <Boulders x={1020} y={2080} s={1.6} col="#9c7556" shade="#7d5b42" />
        </Svg>
      </Plane>
      <Rays x={800} y={470} strength={0.18} spin={t * 2} />
      <Particles seed={2221} n={14} col="#fff1d6" fall={-3} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={470} warm="255,214,160" cool="40,40,80" vignette={0.5} />
      <Title text={"Desert trip.\nFreezing by\nsunset."} t={t} t0={0} top={110} size={128} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: bare legs, shorts and boots on warm sand (3.06 - 4.24) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: at(lt, [0, 0.5], [1.08, 1.02], outExpo), rot: hh.rot };
  const g = 1460;
  const ph = t * 3.3;
  const p: HikerProps = { x: 420 + lt * 70, y: g - 4.4 * 182 + 820, scale: 4.4, phase: ph, walk: 0.7, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.7), breathe: 0 };
  return (
    <AbsoluteFill>
      <DesertBackdrop cam={cam} sky={MOJAVE} uid="b" y={1200} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Sand y={g + 30} />
        <Subject rimX={5}>
          <Person {...p} outfit={JAKE_T} expression="happy" />
          <Shorts p={p} col={KHAKI} shade={KHAKI2} />
        </Subject>
      </Plane>
      <Rays x={800} y={470} strength={0.22} spin={t * 3} />
      <Particles seed={2222} n={10} col="#fff1d6" fall={-2} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={470} warm="255,214,160" cool="40,40,80" vignette={0.5} />
      <Chip text="It's a desert, right?" t={t} t0={3.1} x={60} y={170} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: sunset, Jake shivering in his T-shirt (4.24 - 5.95) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4, 0.2);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.7), rot: hh.rot };
  const g = 1520;
  const jx = Math.sin(t * 70) * 3;
  const p: HikerProps = { x: 470 + jx, y: g + 20, scale: 2.6, walk: 0, lean: 0.14, poles: false, handOverride: [30, -40], breathe: Math.sin(t * 9) * 2 };
  return (
    <AbsoluteFill>
      <DesertBackdrop cam={cam} sky={DUSK} uid="c" y={g - 100} t={t} />
      <Plane cam={cam} depth={1}>
        <Sand y={g} />
        <Subject rimX={-6} col="rgba(255,170,110,0.9)">
          <Person {...p} outfit={JAKE_T} expression="tired" />
          <Shorts p={p} col={KHAKI} shade={KHAKI2} />
          <Breath p={p} t={t} k={1} />
        </Subject>
      </Plane>
      <Rays x={820} y={1080} strength={0.25} spin={t} col="255,180,120" />
      <LowScrim />
      <div style={{ position: "absolute", inset: 0, background: "rgba(40,30,80,0.18)" }} />
      <Grade sunX={820} sunY={1080} warm="255,170,110" cool="40,40,90" vignette={0.55} />
      <Chip text="Sunset" t={t} t0={4.3} x={60} y={170} icon="none" big />
      <Chip text="Shivering" t={t} t0={4.9} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 WIDE: night over the Joshua trees, cold (5.95 - 8.51) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.6), rot: hh.rot };
  const g = 1540;
  const jx = Math.sin(t * 70) * 2.5;
  const p: HikerProps = { x: 640 + jx, y: g + 20, scale: 2.0, walk: 0, lean: 0.16, poles: false, handOverride: [30, -40], breathe: Math.sin(t * 9) * 2 };
  return (
    <AbsoluteFill>
      <DesertBackdrop cam={cam} sky={NIGHT} uid="d" y={g - 100} t={t} />
      <Plane cam={cam} depth={0.05}>
        <Stars t={t} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Sand y={g} />
        <Subject rimX={-4} col="rgba(170,190,240,0.8)">
          <JTree x={250} y={g - 10} s={1.4} seed={0} col="#1f2a22" trunk="#2a2520" />
          <Person {...p} outfit={JAKE_T} expression="tired" />
          <Shorts p={p} col={KHAKI} shade={KHAKI2} />
          <Breath p={p} t={t} k={1} />
        </Subject>
      </Plane>
      <div style={{ position: "absolute", inset: 0, background: "rgba(8,16,48,0.42)" }} />
      <Particles seed={2224} n={8} col="#dfe7ff" fall={1} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={400} warm="200,210,255" cool="10,20,60" vignette={0.6} />
      <Chip text="Winter nights here" t={t} t0={6.0} x={60} y={170} icon="none" big />
      <Chip text="Can drop below 32°F / 0°C" t={t} t0={7.0} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: warm jacket, hat and gloves on a granite boulder by the pack (8.51 - 10.6) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.1), rot: hh.rot };
  const pop = (t0: number) => at(t, [t0, t0 + 0.35], [0, 1], outExpo);
  const a = pop(8.6);
  const b = pop(9.3);
  const c = pop(9.75);
  return (
    <AbsoluteFill>
      <DesertBackdrop cam={cam} sky={DUSK} uid="e" y={1150} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,200,140,0.9)">
          <Svg>
            {/* granite slab */}
            <path d="M-100,1120 Q540,1040 1180,1110 L1180,2000 L-100,2000 Z" fill="#c99a76" />
            <path d="M-100,1120 Q540,1040 1180,1110 L1180,1170 Q540,1100 -100,1180 Z" fill="#e2b892" />
            {/* puffy jacket, folded */}
            <g transform={`translate(330,${mix(1300, 1240, a)}) scale(${0.6 + 0.4 * a})`} opacity={a}>
              <rect x={-230} y={-120} width={460} height={260} rx={90} fill={JAKE_WARM.jacket} />
              {[0, 1, 2].map((i) => (
                <path key={i} d={`M-220,${-60 + i * 70} Q0,${-40 + i * 70} 220,${-60 + i * 70}`} stroke={JAKE_WARM.jacketShade} strokeWidth={10} fill="none" />
              ))}
              <rect x={-12} y={-120} width={24} height={260} fill="#d9d9d9" opacity={0.7} />
            </g>
            {/* beanie */}
            <g transform={`translate(760,${mix(1260, 1200, b)}) scale(${0.6 + 0.4 * b})`} opacity={b}>
              <path d="M-150,40 Q-160,-150 0,-160 Q160,-150 150,40 Z" fill={JAKE_WARM.cap} />
              <rect x={-160} y={10} width={320} height={60} rx={24} fill={JAKE_WARM.capShade} />
              <circle cx={0} cy={-170} r={36} fill={JAKE_WARM.capShade} />
            </g>
            {/* gloves */}
            <g transform={`translate(560,${mix(1520, 1470, c)}) scale(${0.6 + 0.4 * c})`} opacity={c}>
              {[-130, 130].map((dx, i) => (
                <g key={i} transform={`translate(${dx},0) rotate(${i ? 12 : -12})`}>
                  <rect x={-70} y={-90} width={140} height={170} rx={50} fill="#2a2a2a" />
                  <rect x={-90} y={-40} width={50} height={90} rx={25} fill="#2a2a2a" transform="rotate(-30 -65 0)" />
                  <rect x={-70} y={70} width={140} height={40} rx={12} fill="#444" />
                </g>
              ))}
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Rays x={820} y={1080} strength={0.2} spin={t} col="255,190,130" />
      <Particles seed={2225} n={10} col="#fff1d6" fall={-2} bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={1080} warm="255,190,130" cool="40,40,90" vignette={0.5} />
      <Chip text="Warm jacket" t={t} t0={8.65} x={60} y={170} icon="check" big />
      <Chip text="Hat" t={t} t0={9.35} x={60} y={300} icon="check" big />
      <Chip text="Gloves" t={t} t0={9.8} x={60} y={430} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 MEDIUM: dusk, Jake dressed warm, walking back happy (10.6 - 12.05) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.04, 1.09, lt / 1.5), rot: hh.rot };
  const g = 1520;
  const ph = t * 3.3;
  const p: HikerProps = { x: 380 + lt * 50, y: g + 20, scale: 2.5, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <DesertBackdrop cam={cam} sky={DUSK} uid="f" y={g - 100} t={t} />
      <Plane cam={cam} depth={1}>
        <Sand y={g} />
        <Subject rimX={-6} col="rgba(255,170,110,0.9)">
          <JTree x={900} y={g - 20} s={1.3} seed={2} />
          <Person {...p} outfit={JAKE_WARM} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={820} y={1080} strength={0.25} spin={t} col="255,180,120" />
      <LowScrim />
      <Grade sunX={820} sunY={1080} warm="255,170,110" cool="40,40,90" vignette={0.5} />
      <Chip text="Any hike near dark" t={t} t0={10.65} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

const S7: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/joshua-tree-trip-planning-guide.jpg"
      photoH={800}
      spec="30 PAGES · 12 HIKES · PRINTABLE PDF"
      name={
        <>
          Joshua Tree
          <br />
          Trip Guide
        </>
      }
      nameSize={104}
      price="$9.99"
      save="Save this for your trip"
    />
  );
};

export const V222: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.14} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.06} to={4.32} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.06} />
    </Scene>
    <Scene from={4.24} to={6.03} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.24} />
    </Scene>
    <Scene from={5.95} to={8.59} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={5.95} />
    </Scene>
    <Scene from={8.51} to={10.68} fadeIn={0.06} fadeOut={0.08}>
      <S5 off={8.51} />
    </Scene>
    <Scene from={10.6} to={12.13} fadeIn={0.06} fadeOut={0.1}>
      <S6 off={10.6} />
    </Scene>
    <Scene from={12.05} to={16.6} fadeOut={0}>
      <S7 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.06, 1600],
        [3.06, 4.24, 1600],
        [4.24, 5.95, 1600],
        [5.95, 8.51, 1600],
        [8.51, 10.6, 1600],
        [10.6, 12.05, 1600],
      ]}
    />
  </AbsoluteFill>
);
