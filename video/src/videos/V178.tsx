// V178: "How much daylight left? Ask your hand." Short format (16.0 s, 43 words), cinematic C01 style.
// Product: Motion-Sensor Headlamp — Rechargeable USB-C, Wide Beam, from $16.99 (live Shopify). End card: real product cutout.
// Advice (common outdoor rule of thumb, stated as rough): hold your hand out flat at arm's length; each finger between the
// sun and the horizon is about 15 minutes of sunlight. It varies with your hand, latitude and season, so turn around early.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, Haze, handheld, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Backdrop, Subject, Trail } from "../fall";
import vo from "../vo/v178.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const LOW: Sky = { top: "#3f5a86", mid: "#e0a07a", low: "#ffcf96", sun: [800, 1080], sunR: 56, sunCol: "#fff0cc", glow: "#ffa860" };
const DUSK: Sky = { top: "#26304f", mid: "#8a6a7e", low: "#f09a6a", sun: [760, 1250], sunR: 48, sunCol: "#ffd9a8", glow: "#ff8a50" };
const BARE = ["#8e3f2a", "#b5553a", "#d9a34a"];

const BEN: Outfit = {
  ...JAKE,
  skin: "#D8A47F",
  skinShade: "#B98763",
  hair: "#3a2a1e",
  beard: "#3a2a1e",
  cap: "#2F6B4F",
  capShade: "#22513b",
  jacket: "#C2662E",
  jacketShade: "#9B4E20",
  pants: "#4a4f45",
  pantsShade: "#373b33",
  pack: "#2f3e5c",
  packShade: "#25314a",
};

// Headlamp over the cap, on = 0..1.
const HeadLamp: React.FC<{ p: HikerProps; on: number }> = ({ p, on }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${hx - 26},${hy - 12} Q${hx},${hy - 6} ${hx + 24},${hy - 14}`} stroke="#1d2024" strokeWidth={6} fill="none" />
      <rect x={hx + 16} y={hy - 22} width={16} height={14} rx={4} fill="#1d2024" />
      {on > 0.05 && <circle cx={hx + 33} cy={hy - 15} r={10} fill="#fff6c8" opacity={0.8 * on} />}
    </g>
  );
};

// ============ S1 HOOK MEDIUM: late afternoon, Ben on the trail, the sun already low (0 - 2.46) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.1, t / 2.46), rot: hh.rot };
  const g = 1500;
  const ph = t * 4.5;
  const p: HikerProps = { x: 300 + t * 40, y: g, scale: 2.3, phase: ph, walk: 0.5, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LOW} uid="a" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} grass="#7a6a44" dirt="#9a7f5c" />
        <Subject rimX={-5} col="rgba(255,200,130,0.95)">
          <Person {...p} outfit={BEN} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Rays x={LOW.sun[0]} y={LOW.sun[1]} strength={0.32} col="255,210,150" />
      <Particles seed={1781} n={16} col="#ffe2b0" fall={6} leaves={BARE} />
      <LowScrim />
      <Grade sunX={800} sunY={1080} warm="255,200,140" cool="40,40,80" />
      <Title text={"How much\ndaylight left?\nAsk your hand."} t={t} t0={0} top={110} size={120} />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: twenty minutes later the sun is gone, Ben small on the ridge in the dusk (2.46 - 3.85) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.4), rot: hh.rot };
  const g = 1450;
  const p: HikerProps = { x: 520, y: g, scale: 1.1, walk: 0, lean: 0.02, poles: false, breathe: 0 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={DUSK} uid="b" />
      </Plane>
      <Plane cam={cam} depth={0.14} blur={2.4}>
        <Ridge seed={88} base={g - 140} amp={300} scale={140} col="#4a3f58" lit="#f0a07a" />
      </Plane>
      <Haze y={g - 380} h={260} col={DUSK.low} opacity={0.3} />
      <Plane cam={cam} depth={0.4} blur={1}>
        <Ridge seed={91} base={g - 20} amp={160} scale={110} col="#2e2a3c" />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-300,${g + 10} Q540,${g - 40} 1400,${g + 30} L1400,2200 L-300,2200 Z`} fill="#26222e" />
        </Svg>
        <Subject rimX={3} col="rgba(255,160,110,0.8)">
          <Person {...p} outfit={BEN} expression="tired" />
        </Subject>
      </Plane>
      <Particles seed={1782} n={12} col="#ffd0b0" fall={4} />
      <LowScrim />
      <Grade sunX={760} sunY={1250} warm="255,160,110" cool="20,25,60" vignette={0.6} />
      <Chip text="Twenty minutes" t={t} t0={2.55} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: Ben holds his arm out flat toward the low sun (3.85 - 6.73) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 2.9), rot: hh.rot };
  const g = 1560;
  const raise = at(t, [4.2, 5.0], [0, 1], outExpo);
  const ho: [number, number] = [mix(40, 140, raise), mix(30, -150, raise)];
  const p: HikerProps = { x: 330, y: g + 120, scale: 2.4, walk: 0, lean: 0.02, poles: false, handOverride: ho, breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LOW} uid="c" treeY={g - 260} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 120} grass="#7a6a44" dirt="#9a7f5c" />
        <Subject rimX={-5} col="rgba(255,200,130,0.95)">
          <Person {...p} outfit={BEN} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Rays x={LOW.sun[0]} y={LOW.sun[1]} strength={0.3} col="255,210,150" />
      <Particles seed={1783} n={14} col="#ffe2b0" fall={6} leaves={BARE} />
      <LowScrim />
      <Grade sunX={800} sunY={1080} warm="255,200,140" cool="40,40,80" />
      <Chip text="Rough check" t={t} t0={3.95} x={60} y={200} icon="none" big />
      <Chip text="Arm out, hand flat" t={t} t0={4.9} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// Flat hand at arm's length, palm toward us, fingers pointing right; bottom finger on the horizon line at y.
const FW = 92; // finger height
const FlatHand: React.FC<{ y: number; k: number }> = ({ y, k }) => {
  const x0 = 120;
  return (
    <g transform={`translate(0,${(1 - k) * 600})`}>
      {/* forearm from the lower left */}
      <path d={`M-200,${y + 700} L${x0 + 40},${y - 40} L${x0 + 200},${y + 40} L60,${y + 800} Z`} fill={BEN.jacket} />
      <path d={`M-200,${y + 700} L${x0 + 40},${y - 40} L${x0 + 70},${y - 20} L-150,${y + 740} Z`} fill={BEN.jacketShade} />
      {/* palm */}
      <rect x={x0} y={y - FW * 4 - 6} width={240} height={FW * 4 + 70} rx={60} fill={BEN.skin} />
      {/* fingers, top to bottom (index on top) */}
      {[0, 1, 2, 3].map((i) => {
        const len = [300, 330, 310, 250][i];
        const yy = y - FW * (4 - i);
        return (
          <g key={i}>
            <rect x={x0 + 150} y={yy + 3} width={len} height={FW - 6} rx={(FW - 6) / 2} fill={i % 2 ? BEN.skinShade : BEN.skin} />
            <line x1={x0 + 150 + len - 70} y1={yy + 16} x2={x0 + 150 + len - 70} y2={yy + FW - 18} stroke={BEN.skinShade} strokeWidth={4} opacity={0.6} />
          </g>
        );
      })}
    </g>
  );
};

// ============ S4 CLOSE-UP: the hand against the sky, each finger about fifteen minutes (6.73 - 10.06) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.3), rot: hh.rot };
  const hor = 1330;
  const k = at(t, [6.75, 7.3], [0, 1], outExpo);
  const sunY = hor - FW * 1.35;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={{ ...LOW, sun: [830, sunY], sunR: 50 }} uid="d" />
      </Plane>
      <Plane cam={cam} depth={0.14} blur={6}>
        <Svg>
          <path d={`M-300,${hor} Q200,${hor - 30} 540,${hor - 10} Q900,${hor + 10} 1400,${hor - 20} L1400,2200 L-300,2200 Z`} fill="#4a3c50" />
        </Svg>
      </Plane>
      <Haze y={hor - 200} h={200} col={LOW.low} opacity={0.3} />
      <Rays x={830} y={sunY} strength={0.35} col="255,210,150" />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,200,130,0.95)">
          <Svg>
            <FlatHand y={hor} k={k} />
            {[1, 2, 3, 4].map((n) => {
              const o = at(t, [7.0 + n * 0.45, 7.3 + n * 0.45], [0, 1]);
              return (
                <text key={n} x={78} y={hor - FW * (n - 1) - 26} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={58} fill="#fff" opacity={o} style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.6))" }}>
                  {n * 15}
                </text>
              );
            })}
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1784} n={10} col="#ffe2b0" fall={4} bokeh />
      <Grade sunX={830} sunY={sunY} warm="255,200,140" cool="40,40,80" vignette={0.5} />
      <Chip text="1 finger ≈ 15 min" t={t} t0={7.4} x={60} y={170} icon="check" big />
      <Chip text="Sun to horizon" t={t} t0={8.6} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: Ben turns back early, headlamp ready (10.06 - 11.2) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.05, 1.1, lt / 1.2), rot: hh.rot };
  const g = 1520;
  const ph = t * 4.5;
  const p: HikerProps = { x: 700 - lt * 50, y: g, scale: 2.3, phase: ph, walk: 0.5, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LOW} uid="e" treeY={g - 120} blur={1} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} grass="#7a6a44" dirt="#9a7f5c" />
        <Subject rimX={5} col="rgba(255,200,130,0.95)">
          <g transform={`translate(${2 * p.x},0) scale(-1,1)`}>
            <Person {...p} outfit={BEN} expression="happy" />
            <HeadLamp p={p} on={0} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="right" />
      </Plane>
      <Rays x={LOW.sun[0]} y={LOW.sun[1]} strength={0.28} col="255,210,150" />
      <Particles seed={1785} n={14} col="#ffe2b0" fall={6} leaves={BARE} />
      <LowScrim />
      <Grade sunX={800} sunY={1080} warm="255,200,140" cool="40,40,80" />
      <Chip text="Turn around early" t={t} t0={10.1} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/motion-sensor-rechargeable-headlamp-cut.png"
      cutoutH={700}
      spec="RECHARGEABLE USB-C · WIDE BEAM"
      name={
        <>
          Motion-Sensor
          <br />
          Headlamp
        </>
      }
      nameSize={84}
      price="from $16.99"
      save="Save this for your next afternoon hike"
    />
  );
};

export const V178: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.54} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.46} to={3.95} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={2.46} />
    </Scene>
    <Scene from={3.85} to={6.83} fadeIn={0.06} fadeOut={0.1}>
      <S3 off={3.85} />
    </Scene>
    <Scene from={6.73} to={10.16} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={6.73} />
    </Scene>
    <Scene from={10.06} to={11.3} fadeIn={0.06} fadeOut={0.12}>
      <S5 off={10.06} />
    </Scene>
    <Scene from={11.2} to={16.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.46, 1600],
        [2.46, 3.85, 1600],
        [3.85, 6.73, 1600],
        [6.73, 10.06, 1600],
        [10.06, 11.2, 1600],
      ]}
    />
  </AbsoluteFill>
);
