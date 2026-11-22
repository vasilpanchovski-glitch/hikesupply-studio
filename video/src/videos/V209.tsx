// V209: "No pack. It was only two miles." Short format (17.0 s, 43 words), cinematic C01 style, Christmas afternoon walk.
// Product: Lightweight Trail Backpack — Unisex, $39.99 (live Shopify). End card: the real store photo (grey), cut out.
// Advice (simple, safe): winter daylight ends early and wind can rise; even on a short winter walk carry a small pack with
// a warm layer, water and a light. No numbers beyond the two miles in the story, no claims.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky } from "../cine";
import { Breath, Bottle, Subject } from "../fall";
import { Blizzard, SNOW, SNOW2, WGOLD, WINTER, WinterBackdrop, FrostTrail } from "../winter";
import { SnowCar } from "../icy";
import vo from "../vo/v209.json";

const words = vo.words as unknown as Word[];

const DUSKW: Sky = { top: "#26375a", mid: "#6f7896", low: "#d49a7c", sun: [860, 1130], sunR: 40, sunCol: "#ffd6a0", glow: "#e89468" };

const GREY = "#b9bcbd"; // the grey trail backpack, like the store photo
const GREY2 = "#9a9d9e";

const DAN: Outfit = {
  ...JAKE,
  skin: "#C98F6B",
  skinShade: "#AC7351",
  hair: "#2b2019",
  beard: "#2b2019",
  cap: "#2F5F8A",
  capShade: "#234868",
  jacket: "#6E7C86",
  jacketShade: "#56626b",
  pants: "#3b3f46",
  pantsShade: "#2a2d33",
  boot: "#5E4230",
  sole: "#26211e",
  pack: GREY,
  packShade: GREY2,
  glove: "#2a2a2a",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// ============ S1 HOOK MEDIUM: Christmas afternoon, Dan sets off with no pack (0 - 3.7) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 3.7), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.2;
  const p: HikerProps = { x: 300 + t * 60, y: g + 30, scale: 2.3, phase: ph, walk: 0.6, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 240} t={t} snow={1} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,248,230" />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={DAN} expression="happy" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Particles seed={2091} n={12} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="252,246,234" cool="40,60,90" />
      <Title text={"No pack.\nIt was only\ntwo miles."} t={t} t0={0} top={110} size={128} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: the sun drops, the wind rises, Dan hunches and shivers (3.7 - 5.87) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.16, lt / 2.17), rot: hh.rot };
  const g = 1480;
  const wind = at(t, [4.7, 5.2], [0, 1]);
  const shiver = Math.sin(t * 40) * 3 * wind;
  const p: HikerProps = { x: 520 + shiver, y: g + 30, scale: 2.7, walk: 0, lean: 0.2, poles: false, handOverride: [34, -30], breathe: Math.sin(t * 3) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSKW} uid="b" treeY={g - 240} t={t} snow={1} blur={2} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={4} col="rgba(255,190,150,0.7)">
          <Person {...p} outfit={DAN} expression="tired" noPack />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Blizzard seed={2092} n={Math.round(10 + 18 * wind)} angle={-62} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,30,60,0.18)" }} />
      <LowScrim />
      <Grade sunX={860} sunY={1130} warm="240,190,160" cool="30,40,90" vignette={0.6} />
      <Chip text="Sun down" t={t} t0={4.0} x={60} y={200} icon="x" big />
      <Chip text="Wind up" t={t} t0={4.9} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the warm jacket, left on the back seat of the car (5.87 - 8.1) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + lt * 8, y: hh.y, zoom: mix(1.0, 1.08, lt / 2.23), rot: hh.rot };
  const S = 5.2;
  const cx = 560;
  const cy = 1420;
  // back window in screen coords (Car geometry: x -58..-4, y -112..-82)
  const wx0 = cx - 58 * S;
  const wy0 = cy - 112 * S;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSKW} uid="c" treeY={1000} blur={14} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,190,150,0.6)">
          <rect x={-300} y={cy - 40} width={1700} height={900} fill={SNOW2} />
          <SnowCar x={cx} y={cy} s={S} body="#7a3b3b" shade="#5e2c2c" />
          {/* the puffy jacket on the back seat, seen through the window */}
          <g transform={`translate(${wx0 + 50},${wy0 + 46}) scale(0.82)`}>
            <path d="M0,150 Q10,40 70,20 L170,20 Q230,40 240,150 Z" fill="#C4572E" />
            {[50, 85, 120].map((yy) => (
              <path key={yy} d={`M${8 + (150 - yy) * 0.08},${yy} L${232 - (150 - yy) * 0.08},${yy}`} stroke="#9a4322" strokeWidth={6} />
            ))}
            <path d="M120,22 L120,150" stroke="#7d3519" strokeWidth={6} />
            <path d="M80,20 Q120,0 160,20 Q120,40 80,20 Z" fill="#9a4322" />
          </g>
          <rect x={wx0} y={wy0} width={54 * S} height={30 * S} fill="rgba(200,220,235,0.28)" />
          <path d={`M${wx0 + 20},${wy0 + 20} l60,-0 M${wx0 + 30},${wy0 + 40} l120,0`} stroke="#ffffff" strokeWidth={6} opacity={0.35} strokeLinecap="round" />
        </Subject>
      </Plane>
      <Particles seed={2093} n={14} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={860} sunY={1130} warm="240,196,170" cool="30,40,90" vignette={0.6} />
      <Chip text="Warm layer?" t={t} t0={6.1} x={60} y={200} icon="none" big />
      <Chip text="Back in the car" t={t} t0={6.9} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the rule. Dan heads out again with the grey pack, golden light (8.1 - 10.4) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: at(lt, [0, 1.0], [1.12, 1.04], outExpo), rot: hh.rot };
  const g = 1480;
  const ph = t * 3.2;
  const p: HikerProps = { x: 360 + lt * 70, y: g + 30, scale: 2.5, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="d" treeY={g - 240} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={DAN} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2e2618" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.4} col="255,226,170" />
      <Particles seed={2094} n={18} col="#fff4dc" bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,226,186" cool="40,60,90" />
      <Chip text="The rule" t={t} t0={8.2} x={60} y={200} icon="none" big />
      <Chip text="Short winter walk?" t={t} t0={9.0} x={60} y={330} icon="none" big />
      <Chip text="Carry a pack" t={t} t0={10.1} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// Grey daypack, front view, top open (screen coords centred on x, bottom at y).
const Pack: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={250} ry={22} fill="rgba(0,0,0,0.2)" />
    <path d="M-200,0 Q-230,-300 -170,-520 L170,-520 Q230,-300 200,0 Z" fill={GREY} />
    <path d="M-170,-520 Q0,-470 170,-520 L160,-560 Q0,-520 -160,-560 Z" fill={GREY2} />
    <path d="M-150,-330 Q0,-400 150,-330" stroke={GREY2} strokeWidth={10} fill="none" />
    <path d="M-120,-280 L120,-60 M120,-280 L-120,-60" stroke="#e2e3e2" strokeWidth={8} />
    <circle cx={0} cy={-40} r={14} fill="#55595c" />
    <path d="M-200,-120 Q-240,-80 -205,-10" stroke={GREY2} strokeWidth={14} fill="none" />
    <path d="M200,-120 Q240,-80 205,-10" stroke={GREY2} strokeWidth={14} fill="none" />
  </g>
);

// ============ S5 CLOSE-UP: what goes in the pack, a layer, water, a light (10.4 - 12.8) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.4), rot: hh.rot };
  const k1 = at(t, [11.2, 11.45], [0, 1], outExpo);
  const k2 = at(t, [11.7, 11.95], [0, 1], outExpo);
  const k3 = at(t, [12.2, 12.45], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="e" treeY={1000} blur={14} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,170,0.85)">
          <rect x={-300} y={1340} width={1700} height={900} fill={SNOW} />
          <Pack x={540} y={1440} s={1.25} />
          {/* folded warm layer */}
          <g transform={`translate(${mix(540, 260, k1)},${mix(820, 760, k1)}) scale(${k1})`}>
            <rect x={-130} y={-80} width={260} height={160} rx={30} fill="#C4572E" />
            <path d="M-130,-10 L130,-10" stroke="#9a4322" strokeWidth={8} />
            <path d="M0,-80 L0,80" stroke="#7d3519" strokeWidth={6} />
          </g>
          {/* water bottle */}
          <g transform={`translate(${mix(540, 560, k2)},${mix(820, 700, k2)}) scale(${k2})`}>
            <Bottle x={0} y={110} s={1.3} />
          </g>
          {/* headlamp */}
          <g transform={`translate(${mix(540, 830, k3)},${mix(820, 760, k3)}) scale(${k3})`}>
            <ellipse cx={0} cy={0} rx={120} ry={60} fill="none" stroke="#2a2a2a" strokeWidth={18} />
            <rect x={-46} y={-36} width={92} height={72} rx={16} fill="#3a3f44" />
            <circle cx={0} cy={0} r={24} fill="#fff6d6" />
            <circle cx={0} cy={0} r={46 + 6 * Math.sin(t * 6)} fill="#fff1b8" opacity={0.3} />
          </g>
        </Subject>
      </Plane>
      <Rays x={760} y={300} strength={0.35} col="255,236,200" />
      <Particles seed={2095} n={14} col="#fff3d6" fall={6} bokeh />
      <Grade sunX={760} sunY={400} warm="255,226,186" cool="40,60,90" vignette={0.5} />
      <Chip text="A warm layer" t={t} t0={11.2} x={60} y={200} icon="check" big />
      <Chip text="Water" t={t} t0={11.7} x={60} y={330} icon="check" big />
      <Chip text="A light" t={t} t0={12.2} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/lightweight-trail-backpack-cut.png"
      cutoutH={800}
      spec="LIGHTWEIGHT DAYPACK · UNISEX"
      name={
        <>
          Lightweight
          <br />
          Trail Backpack
        </>
      }
      nameSize={100}
      price="$39.99"
      save="Save this for winter walks"
    />
  );
};

export const V209: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.78} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.7} to={5.95} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.7} />
    </Scene>
    <Scene from={5.87} to={8.18} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.87} />
    </Scene>
    <Scene from={8.1} to={10.48} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={8.1} />
    </Scene>
    <Scene from={10.4} to={12.88} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={10.4} />
    </Scene>
    <Scene from={12.8} to={17.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.7, 1600],
        [3.7, 5.87, 1600],
        [5.87, 8.1, 1600],
        [8.1, 10.4, 1600],
        [10.4, 12.8, 1600],
      ]}
    />
  </AbsoluteFill>
);
