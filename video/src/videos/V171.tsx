// V171: "40°F and no idea what to wear". Short format (17.2 s, 41 words), cinematic C01 style.
// Product: Winter Hiking Guide & Cold-Weather Checklist, $7.99 (live Shopify). End card: the real store cover, whole.
// Advice (conservative): at about 40°F, layers beat one heavy coat: wool or synthetic base, light fleece, wind shell,
// plus hat and thin gloves; you warm up fast on a climb and sweat soaks a heavy coat.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky } from "../cine";
import { Backdrop, Breath, Subject, Sweat, Trail, FALL } from "../fall";
import vo from "../vo/v171.json";

const words = vo.words as unknown as Word[];

// Cold, bright late-November morning.
const COLD: Sky = { top: "#4a6f96", mid: "#a9c0d4", low: "#ece4d4", sun: [800, 620], sunR: 44, sunCol: "#fff8e6", glow: "#f3d6a8" };

// Heavy dark winter parka (the mistake).
const JESS_COAT: Outfit = {
  ...GUIDE,
  skin: "#F0C3A0",
  skinShade: "#D29E7C",
  hair: "#7a4a2a",
  ponytail: "#7a4a2a",
  beard: null,
  cap: "#3b3f46",
  capShade: "#2b2e33",
  jacket: "#2E3B55",
  jacketShade: "#1f283b",
  pants: "#4a4f45",
  pantsShade: "#363a32",
  boot: "#5a3e2c",
  sole: "#231d19",
  pack: "#7a5a3a",
  packShade: "#5c432a",
  glove: null,
};

// The fix: thin wind shell over a light fleece, beanie and thin gloves.
const JESS_LAYERS: Outfit = {
  ...JESS_COAT,
  cap: "#C7543A",
  capShade: "#9c3f2a",
  jacket: "#2F8A84",
  jacketShade: "#226a65",
  glove: "#2f343a",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Puffy parka bulk drawn over the torso so the coat reads as heavy (local hiker units via the same transform).
export const CoatBulk: React.FC<{ p: HikerProps }> = ({ p }) => {
  const s = p.scale ?? 1;
  return (
    <g transform={`translate(${p.x},${p.y}) scale(${s})`} opacity={0.9}>
      {[-150, -120, -90].map((y, i) => (
        <path key={i} d={`M-34,${y} Q0,${y + 10} 34,${y}`} stroke="#1a2232" strokeWidth={3} fill="none" opacity={0.7} />
      ))}
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Jess climbs in a heavy parka, starting to sweat (0 - 3.44) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.04, 1.1, t / 3.44), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 470 + t * 22, y: g + 10, scale: 2.3, phase: t * 2.6, walk: 0.55, lean: 0.18, poles: false, slope: -0.08, breathe: Math.sin(t * 4) * 3 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="a" treeY={g - 230} t={t} far="#8592a6" mid="#5c6652" />
      <Plane cam={cam} depth={1}>
        <Trail y={g} tilt={-0.06} grass="#7d7a52" dirt="#9a7e5e" />
        <Subject rimX={5} col="rgba(255,236,200,0.9)">
          <Person {...p} outfit={JESS_COAT} expression={t > 1.6 ? "tired" : "neutral"} />
          <Sweat p={p} t={t} on={at(t, [1.4, 2.0], [0, 1])} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2c1e" side="right" />
      </Plane>
      <Rays x={COLD.sun[0]} y={COLD.sun[1]} strength={0.28} col="255,236,200" />
      <Particles seed={1711} n={18} col="#e9c48a" fall={10} leaves={FALL} />
      <LowScrim />
      <Grade sunX={800} sunY={620} warm="255,226,180" cool="50,70,100" />
      <Title text={"40°F and\nno idea\nwhat to wear"} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: red face, soaked in sweat ten minutes in (3.44 - 6.08) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.64), rot: hh.rot };
  const g = 1700;
  const p: HikerProps = { x: 620, y: g + 260, scale: 4.4, phase: 0, walk: 0, lean: 0.12, poles: false, breathe: Math.sin(t * 7) * 5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="b" treeY={1250} blur={12} t={t} far="#8592a6" mid="#5c6652" />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={JESS_COAT} expression="tired" />
          <Sweat p={p} t={t} on={1} />
        </Subject>
      </Plane>
      <Particles seed={1712} n={12} col="#e9c48a" fall={8} leaves={FALL} />
      <LowScrim />
      <Grade sunX={800} sunY={620} warm="255,214,170" cool="50,70,100" vignette={0.55} />
      <Readout label="AIR" value="40°F · 4°C" ok={null} t={t} t0={3.6} x={60} y={170} />
      <Readout label="10 MIN UPHILL" value="SOAKED" ok={false} t={t} t0={4.4} x={60} y={420} pulseAt={4.4} />
      <Chip text="Heavy coat = sweat" t={t} t0={5.2} x={60} y={680} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM-CLOSE: same climb in three thin layers, hat and thin gloves (6.08 - 12.95) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + lt * 6, y: hh.y, zoom: at(lt, [0, 0.9], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1640;
  const p: HikerProps = { x: 600, y: g + 120, scale: 3.4, phase: lt * 2.4, walk: 0.4, lean: 0.12, poles: false, slope: -0.06, breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="c" treeY={1260} blur={6} t={t} far="#8592a6" mid="#5c6652" />
      <Plane cam={cam} depth={1}>
        <Trail y={g} tilt={-0.05} grass="#7d7a52" dirt="#9a7e5e" />
        <Subject rimX={5} col="rgba(255,236,200,0.9)">
          <Person {...p} outfit={JESS_LAYERS} expression="happy" />
          <Breath p={p} t={t} k={0.8} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2c1e" side="left" />
      </Plane>
      <Rays x={COLD.sun[0]} y={COLD.sun[1]} strength={0.35} col="255,236,200" />
      <Particles seed={1713} n={14} col="#e9c48a" fall={8} leaves={FALL} />
      <LowScrim />
      <Grade sunX={800} sunY={620} warm="255,226,180" cool="50,70,100" />
      <Chip text="Base: wool or synthetic" t={t} t0={7.9} x={60} y={170} icon="check" big />
      <Chip text="Light fleece" t={t} t0={9.6} x={60} y={300} icon="check" big />
      <Chip text="Wind shell" t={t} t0={10.5} x={60} y={430} icon="check" big />
      <Chip text="Hat + thin gloves" t={t} t0={11.6} x={60} y={560} icon="check" big />
    </AbsoluteFill>
  );
};

const S4: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/winter-hiking-guide-cold-weather-checklist-cover-cut.png"
      cutoutH={800}
      spec="DIGITAL GUIDE · COLD-WEATHER CHECKLIST"
      name={
        <>
          Winter Hiking
          <br />
          Guide
        </>
      }
      nameSize={100}
      price="$7.99"
      save="Save this for your next cold hike"
    />
  );
};

export const V171: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.5} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.44} to={6.18} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={3.44} />
    </Scene>
    <Scene from={6.08} to={13.05} fadeIn={0.06} fadeOut={0.12}>
      <S3 off={6.08} />
    </Scene>
    <Scene from={12.95} to={17.2} fadeOut={0}>
      <S4 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.44, 1600],
        [3.44, 6.08, 1600],
        [6.08, 12.95, 1600],
      ]}
    />
  </AbsoluteFill>
);
