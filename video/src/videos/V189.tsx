// V189: "The wind went right through." Short format (16.5 s, 43 words), cinematic C01 style.
// Product: Polar Fleece Soft-Shell Jacket — Women's, $39.99 (live Shopify: 320g polar fleece, windproof finish, stand collar).
// End card: the real store photo, cut out. Advice (simple, safe): a warm layer needs a wind-blocking layer over it,
// or one jacket that does both. No numbers.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { FrostTrail, STORM, Summit, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v189.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const SARA: Outfit = {
  ...JAKE,
  skin: "#E9BC98",
  skinShade: "#CB9C7A",
  hair: "#7a4a26",
  beard: null,
  cap: "#3A5B7A",
  capShade: "#2c465e",
  jacket: "#CDB08A",
  jacketShade: "#b0936e",
  pants: "#2f3338",
  pantsShade: "#22262a",
  pack: "#556B4A",
  packShade: "#425438",
};
const SARA_FLEECE: Outfit = { ...SARA, jacket: "#C8235A", jacketShade: "#a01a47" };

// Horizontal gusts. through: streaks pass across everything; around: they bend round a body at bx,by.
const Gusts: React.FC<{ t: number; seed: number; n?: number; y0?: number; y1?: number; around?: { x: number; y: number; r: number } }> = ({ t, seed, n = 14, y0 = 300, y1 = 1500, around }) => (
  <Svg>
    {Array.from({ length: n }, (_, i) => {
      const r = ((i * 7919 + seed) % 997) / 997;
      const y = y0 + (y1 - y0) * ((i + 0.5) / n) + (r - 0.5) * 40;
      const len = 180 + r * 220;
      const x = ((t * (1300 + r * 500) + r * 2000) % 2000) - 500;
      let d = `M${x},${y} q${len / 2},${-14 + r * 10} ${len},0`;
      if (around && Math.abs(y - around.y) < around.r && x > around.x - around.r - len && x < around.x + around.r) {
        const dy = y < around.y ? -1 : 1;
        const push = (around.r - Math.abs(y - around.y)) * dy;
        d = `M${x},${y} q${len / 2},${push} ${len},${push * 0.4}`;
      }
      return <path key={i} d={d} stroke="#ffffff" strokeWidth={5 + r * 4} fill="none" strokeLinecap="round" opacity={0.35 + r * 0.35} />;
    })}
  </Svg>
);

// ============ S1 HOOK: Sara climbs toward the ridge in her knit sweater (0 - 2.76) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 2.76), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.3;
  const p: HikerProps = { x: 420 + t * 34, y: g, scale: 2.2, phase: ph, walk: 0.75, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={1120} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 20} snow={0} />
        <Subject rimX={5} col="rgba(255,248,232,0.85)">
          <Person {...p} outfit={SARA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} col="255,248,232" />
      <Particles seed={1891} n={14} col="#fff6e0" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="252,240,220" cool="30,45,80" />
      <Title text={"The wind\nwent right\nthrough."} t={t} t0={0} top={110} size={130} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: still in the trees, warm and fine (2.76 - 4.04) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.08, 1.13, lt / 1.28), rot: hh.rot };
  const g = 1560;
  const ph = t * 3.3;
  const p: HikerProps = { x: 560, y: g, scale: 2.7, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1250} t={t} snow={0.5} blur={4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 20} snow={0} />
        <Subject rimX={5} col="rgba(255,248,232,0.85)">
          <Person {...p} outfit={SARA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Particles seed={1892} n={12} col="#fff6e0" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="252,240,220" cool="30,45,80" />
      <Chip text="Warm in the trees" t={t} t0={2.85} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: on the open ridge, the gusts go straight through the knit (4.04 - 6.27) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shiver = Math.sin(t * 40) * 3 * at(t, [4.5, 4.8], [0, 1]);
  const hh = handheld(t, 0.5, 2);
  const cam: Cam = { x: hh.x + shiver, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.23), rot: hh.rot };
  const g = 2280;
  const p: HikerProps = { x: 520, y: g, scale: 4.4, walk: 0, lean: 0.02, poles: false, handOverride: [10, -40], breathe: Math.sin(t * 9) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={1500} t={t} woods={false} snow={0.6} blur={8} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(236,242,248,0.85)">
          <Person {...p} outfit={SARA} expression="tired" />
          {/* knit texture on the sweater */}
          {Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={`M${440 + i * 34},${1020} q-10,40 0,80 q10,40 0,80 q-10,40 0,80 q10,40 0,80`} stroke={SARA.jacketShade} strokeWidth={6} fill="none" opacity={0.7} />
          ))}
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.05}>
        <Gusts t={t} seed={13} n={16} y0={420} y1={1500} />
      </Plane>
      <Particles seed={1893} n={20} col="#ffffff" fall={40} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" vignette={0.55} />
      <Chip text="Open ridge" t={t} t0={4.1} x={60} y={200} icon="none" big />
      <Chip text="Wind goes through knit" t={t} t0={4.9} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: same ridge, the wind-blocking layer on, gusts go around her (6.27 - 12.04) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 8, y: hh.y, zoom: mix(1.02, 1.1, lt / 5.77), rot: hh.rot };
  const g = 1530;
  const zip = at(t, [6.4, 7.1], [0, 1], outExpo);
  const ph = t * 3.0;
  const walking = t > 8.2;
  const p: HikerProps = { x: 470 + Math.max(0, t - 8.2) * 30, y: g, scale: 2.2, phase: ph, walk: walking ? 0.6 : 0, lean: 0.06, poles: false, handOverride: walking ? freeHand(ph, 0.5) : [mix(20, 26, zip), mix(40, -90, zip)] };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={1500} t={t} woods={false} snow={0.6} blur={2} />
      <Plane cam={cam} depth={1}>
        <Summit y={g + 40} />
        <Gusts t={t} seed={29} n={12} y0={560} y1={1380} />
        <Subject rimX={5} col="rgba(236,242,248,0.85)">
          <Person {...p} outfit={SARA_FLEECE} expression="happy" />
        </Subject>
      </Plane>
      <Particles seed={1894} n={18} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="236,236,240" cool="30,45,80" />
      <Chip text="The rule" t={t} t0={6.3} x={60} y={170} icon="none" big />
      <Chip text="Warm layer + wind layer" t={t} t0={7.4} x={60} y={300} icon="check" big />
      <Chip text="Or one jacket for both" t={t} t0={9.9} x={60} y={430} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/polar-fleece-soft-shell-jacket-womens-cut.png"
      cutoutH={780}
      spec="320G POLAR FLEECE · WINDPROOF FINISH"
      name={
        <>
          Polar Fleece Soft-Shell
          <br />
          Jacket — Women's
        </>
      }
      nameSize={66}
      price="$39.99"
      save="Save this before your cold hike"
    />
  );
};

export const V189: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.84} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.76} to={4.12} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.76} />
    </Scene>
    <Scene from={4.04} to={6.35} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.04} />
    </Scene>
    <Scene from={6.27} to={12.05} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={6.27} />
    </Scene>
    <Scene from={11.95} to={16.5} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.76, 1600],
        [2.76, 4.04, 1600],
        [4.04, 6.27, 1660],
        [6.27, 11.95, 1600],
      ]}
    />
  </AbsoluteFill>
);
