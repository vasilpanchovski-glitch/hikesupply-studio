// V208: "His feet shot out on the descent." Short format (17.0 s, 42 words), cinematic C01 style, snowy descent.
// Product: Telescoping Trekking Pole — 4-Section Aluminum (Single), $19.99 (live Shopify). End card: the real store photo, cut out
// (shows the colours; the spec line says sold single, as in V72).
// Advice (simple, safe): on soft snow going downhill, keep weight over the feet, knees bent, pole planted ahead, press the heels in.
// On ice, wear traction. No numbers, no claims beyond that.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, WGOLD, WINTER, WinterBackdrop, FrostTrail } from "../winter";
import { BootClose, Puff } from "../icy";
import vo from "../vo/v208.json";

const words = vo.words as unknown as Word[];

const LEO: Outfit = {
  ...JAKE,
  skin: "#E0A884",
  skinShade: "#C2896A",
  hair: "#6b4a2e",
  beard: "#6b4a2e",
  cap: "#2E3A46",
  capShade: "#212a33",
  jacket: "#B5402F",
  jacketShade: "#8f3123",
  pants: "#3b4048",
  pantsShade: "#2a2e34",
  boot: "#5E4230",
  sole: "#26211e",
  pack: "#3E5A6E",
  packShade: "#2e4352",
  glove: "#2a2a2a",
};

const TILT = 0.16; // ground drops to the right (downhill)
const SLOPE = -Math.atan(TILT);

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// ground height on a descent built with FrostTrail(y=g, tilt=-TILT)
const gy = (g: number, x: number) => g + TILT * (x - 540);

// ============ S1 HOOK MEDIUM: Leo heads down the snowy trail, leaning back (0 - 2.9) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 16, y: hh.y, zoom: mix(1.03, 1.1, t / 2.9), rot: hh.rot };
  const g = 1440;
  const ph = t * 3.4;
  const x = 300 + t * 70;
  const p: HikerProps = { x, y: gy(g, x) + 30, scale: 2.2, phase: ph, walk: 0.55, lean: -0.24 + Math.sin(t * 3) * 0.03, slope: SLOPE, poles: false, handOverride: [-40, 10] };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 260} t={t} snow={1} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} col="255,248,230" />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={-TILT} snow={1} />
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={LEO} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Particles seed={2081} n={14} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,244,232" cool="40,60,90" />
      <Title text={"His feet\nshot out on\nthe descent."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM CLOSE: weight too far back, the feet shoot out, he sits down hard (2.9 - 4.97) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const fall = at(t, [3.35, 3.75], [0, 1], outExpo);
  const hh = handheld(t, 0.4, at(t, [3.7, 3.8, 4.2], [0, 1, 0]) * 6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.08, 1.14, lt / 2.07), rot: hh.rot };
  const g = 1400;
  const s = 2.9;
  const x = 400 + fall * 20;
  const y = gy(g, x) + 40;
  const hipY = y - 182 * s;
  const p: HikerProps = { x, y, scale: s, phase: 0.6, walk: 0.3 * (1 - fall), lean: -0.26, slope: SLOPE, poles: false, handOverride: fall > 0.3 ? [-60, -60] : [-40, 10], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={g - 220} t={t} snow={1} blur={2} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={-TILT} snow={1} />
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <g transform={`translate(${fall * 170},${fall * (150 * s * 0.55 + 150)}) rotate(${-fall * 66} ${x} ${hipY})`}>
            <Person {...p} outfit={LEO} expression={fall > 0.2 ? "tired" : "neutral"} />
          </g>
          <Puff x={x - 40} y={gy(g, x) + 10} t={t} k={at(t, [3.7, 3.8, 4.7], [0, 1, 0])} s={2.2} />
        </Subject>
      </Plane>
      <Particles seed={2082} n={14} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="246,244,240" cool="30,50,90" vignette={0.55} />
      <Chip text="Leaning back" t={t} t0={3.0} x={60} y={200} icon="x" big />
      <Chip text="Feet shoot out" t={t} t0={3.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: the rule. Weight over the feet, knees bent, pole ahead (4.97 - 8.85) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: at(lt, [0, 1.0], [1.12, 1.04], outExpo), rot: hh.rot };
  const g = 1400;
  const bend = at(t, [8.1, 8.6], [0, 1]);
  const ph = 1.0 + lt * 2.2;
  const x = 420 + lt * 36;
  const s = 2.5;
  const p: HikerProps = { x, y: gy(g, x) + 40 + bend * 18 * s, scale: s, phase: ph, walk: 0.32, lean: mix(0.0, 0.1, at(t, [6.9, 7.6], [0, 1])), slope: SLOPE, poles: true, poleLen: 230, breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={g - 240} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={-TILT} snow={1} />
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={LEO} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Particles seed={2083} n={14} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,244,232" cool="40,60,90" />
      <Chip text="The rule: soft snow" t={t} t0={5.3} x={60} y={170} icon="none" big />
      <Chip text="Weight over your feet" t={t} t0={6.9} x={60} y={300} icon="check" big />
      <Chip text="Knees bent" t={t} t0={8.2} x={60} y={430} icon="check" big />
    </AbsoluteFill>
  );
};

// Close-up: boot heel pressed into soft snow on the slope, the pole tip planted ahead (screen coords).
const HeelIn: React.FC<{ press: number; plant: number; t: number }> = ({ press, plant, t }) => {
  const surf = (x: number) => 1300 + 0.07 * x; // snow surface, dropping to the right
  const tipX = 960;
  const tipY = mix(1150, surf(tipX) + 60, plant);
  return (
    <g>
      <rect x={-300} y={1200} width={1700} height={1200} fill={SNOW2} />
      {/* the boot, heel sinking in as it presses */}
      <g transform={`translate(-60,${press * 40}) rotate(${-press * 8} 850 1300)`}>
        <BootClose toe={0} heel={0} pants={LEO.pants} pantsShade={LEO.pantsShade} boot={LEO.boot} sole={LEO.sole} />
      </g>
      {/* soft snow in front of the heel, covering its bottom */}
      <path d={`M-300,${surf(-300)} L1400,${surf(1400)} L1400,2400 L-300,2400 Z`} fill={SNOW} />
      <path d={`M-300,${surf(-300)} L1400,${surf(1400)}`} stroke="#ffffff" strokeWidth={10} opacity={0.8} />
      {/* snow pushed up around the heel */}
      <path d={`M60,${surf(60) + 4} q60,${-34 * press} 150,${-30 * press} q70,${6 * press} 110,${30 * press}`} fill={SNOW} stroke="#cfd9df" strokeWidth={4} />
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx={-200 + i * 260} cy={surf(-200 + i * 260) + 120 + (i % 3) * 90} rx={110} ry={20} fill={SNOW2} opacity={0.6} />
      ))}
      {/* trekking pole planted ahead, downhill */}
      <g>
        <path d={`M760,120 L${tipX},${tipY}`} stroke="#B9C0C4" strokeWidth={22} strokeLinecap="round" />
        <path d={`M760,120 L${mix(760, tipX, 0.42)},${mix(120, tipY, 0.42)}`} stroke="#8d969b" strokeWidth={26} strokeLinecap="round" />
        <rect x={730} y={40} width={60} height={160} rx={22} fill="#222" transform={`rotate(${-Math.atan2(tipX - 760, tipY - 120) * 57.3} 760 120)`} />
        <ellipse cx={tipX - (tipY - surf(tipX)) * 0.1} cy={Math.min(tipY - 40, surf(tipX) + 6)} rx={70} ry={14} fill="#2a2a2a" opacity={0.9} />
        {plant > 0.9 && <ellipse cx={tipX - 6} cy={surf(tipX) + 8} rx={90 + Math.sin(t * 5) * 2} ry={16} fill="none" stroke="#cfd9df" strokeWidth={6} />}
      </g>
    </g>
  );
};

// ============ S4 CLOSE-UP: pole ahead, heel pressed in (8.85 - 11.09) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.24), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="d" treeY={1000} blur={14} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,230,190,0.85)">
          <HeelIn press={at(t, [9.8, 10.3], [0, 1], outExpo)} plant={at(t, [8.95, 9.3], [0, 1], outExpo)} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={16}>
        <FrameLeaves col="#2e2618" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 200} strength={0.35} col="255,236,200" />
      <Particles seed={2084} n={12} col="#fff3d6" fall={8} bokeh />
      <Grade sunX={760} sunY={500} warm="255,226,186" cool="40,60,90" vignette={0.5} />
      <Chip text="Pole ahead" t={t} t0={9.0} x={60} y={200} icon="check" big />
      <Chip text="Heels pressed in" t={t} t0={9.8} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: on ice, traction on the boot (11.09 - 12.7) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.61), rot: hh.rot };
  const toe = at(t, [11.1, 11.5], [0, 1], outExpo);
  const heel = at(t, [11.5, 11.95], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={900} t={t} blur={12} snow={1} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={1200} width={1880} height={900} fill="#b9d3df" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${-60 + i * 420},${1420 + i * 50} l240,-10`} stroke="#ffffff" strokeWidth={12} strokeLinecap="round" opacity={0.6 + 0.3 * Math.sin(t * 6 + i)} />
          ))}
          <BootClose toe={toe} heel={heel} pants={LEO.pants} pantsShade={LEO.pantsShade} boot={LEO.boot} sole={LEO.sole} />
        </Svg>
      </Plane>
      <Particles seed={2085} n={12} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={500} warm="236,236,240" cool="30,45,80" vignette={0.5} />
      <Readout label="ON ICE" value="WEAR TRACTION" ok={heel > 0.9 ? true : null} t={t} t0={11.15} x={60} y={200} pulseAt={11.95} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/folding-trekking-pole-cut.png"
      cutoutH={800}
      spec="4-SECTION ALUMINUM · SOLD SINGLE"
      name={
        <>
          Telescoping
          <br />
          Trekking Pole
        </>
      }
      nameSize={100}
      price="$19.99"
      save="Save this for winter"
    />
  );
};

export const V208: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.98} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.9} to={5.05} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.9} />
    </Scene>
    <Scene from={4.97} to={8.93} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.97} />
    </Scene>
    <Scene from={8.85} to={11.17} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={8.85} />
    </Scene>
    <Scene from={11.09} to={12.78} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={11.09} />
    </Scene>
    <Scene from={12.6} to={17.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.9, 1600],
        [2.9, 4.97, 1600],
        [4.97, 8.85, 1600],
        [8.85, 11.09, 1600],
        [11.09, 12.6, 1600],
      ]}
    />
  </AbsoluteFill>
);
