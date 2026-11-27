// V227: "In the bivy. Still freezing." Short format (16.0 s, 43 words), cinematic C01 style, snowy winter trail.
// Product: Emergency Bivy Sack — Thermal Survival Shelter, from $14.99 (live Shopify, $14.99-$44.99). End card: real photo cut out (as V97).
// Advice (conservative, same as V97 and the bivy listing): a bivy reflects body heat and blocks wind, but lying on snow the cold
// comes from the ground. Put on every dry layer and a hat first, then get off the snow (sit on your pack). No injury close-ups.
// Cocoon and hat parts reused from V97.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { FrostTrail, SNOW, SNOW2, WINTER, STORM, WinterBackdrop } from "../winter";
import vo from "../vo/v227.json";

const words = vo.words as unknown as Word[];

const CHRIS: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#BA8262",
  hair: "#2e2018",
  beard: "#3a2a1f",
  cap: "#2e2018",
  capShade: "#241811",
  jacket: "#B04A3A",
  jacketShade: "#8A382B",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#3F6B55",
  packShade: "#2D5141",
  glove: "#2a2a2a",
};
// After the fix: dry grey fleece on and a navy beanie.
const CHRIS_FIX: Outfit = { ...CHRIS, jacket: "#5d646c", jacketShade: "#464c53", cap: "#2C3E66", capShade: "#1f2d4c" };

const ORANGE = "#E8642A";
const ORANGE2 = "#C24E1C";
const COLD = "120,175,235";

const headAt = (p: HikerProps, flip = false): [number, number] => {
  const s = p.scale ?? 1;
  const g = hikerGeometry(p);
  return [p.x + (flip ? -1 : 1) * g.head[0] * s, p.y - 182 * s + g.head[1] * s];
};

const Cocoon: React.FC<{ x: number; yTop: number; w: number; h: number; k?: number }> = ({ x, yTop, w, h, k = 1 }) => (
  <g opacity={k}>
    <path d={`M${x - w / 2},${yTop + 40} Q${x},${yTop - 30} ${x + w / 2},${yTop + 40} L${x + w / 2 + 30},${yTop + h} L${x - w / 2 - 30},${yTop + h} Z`} fill={ORANGE} />
    <path d={`M${x + w * 0.15},${yTop + 10} Q${x + w / 2},${yTop + 30} ${x + w / 2},${yTop + 40} L${x + w / 2 + 30},${yTop + h} L${x + w * 0.2},${yTop + h} Z`} fill={ORANGE2} />
    {[0.25, 0.5, 0.75].map((f) => (
      <path key={f} d={`M${x - w / 2 + 10},${yTop + h * f + 30} Q${x},${yTop + h * f} ${x + w / 2 + 10},${yTop + h * f + 30}`} stroke="rgba(0,0,0,0.12)" strokeWidth={6} fill="none" />
    ))}
    <path d={`M${x - w / 2},${yTop + 40} Q${x},${yTop - 30} ${x + w / 2},${yTop + 40}`} stroke="#d8dde2" strokeWidth={14} fill="none" />
  </g>
);

// Navy beanie over the head (drawn on top of the cap), head centre (hx, hy), person scale s.
const Beanie: React.FC<{ hx: number; hy: number; s: number }> = ({ hx, hy, s }) => (
  <g transform={`translate(${hx},${hy + 5 * s}) scale(0.9)`}>
    <path d={`M${-30 * s},${-2 * s} Q${-30 * s},${-44 * s} 0,${-46 * s} Q${30 * s},${-44 * s} ${30 * s},${-2 * s} Z`} fill="#2C3E66" />
    <rect x={-32 * s} y={-12 * s} width={64 * s} height={14 * s} rx={5 * s} fill="#1f2d4c" />
  </g>
);

// Cold rising out of the snow: soft blue chevrons drifting up into whatever sits on it.
const ColdRise: React.FC<{ x: number; y: number; w: number; t: number; k: number; h?: number }> = ({ x, y, w, t, k, h = 260 }) => (
  <g opacity={k}>
    <ellipse cx={x} cy={y} rx={w / 2} ry={36} fill={`rgba(${COLD},0.45)`} />
    {[0, 1, 2, 3, 4].map((i) => {
      const f = (t * 0.7 + i / 5) % 1;
      const cx = x - w / 2 + 60 + ((i * 0.23) % 1) * (w - 120);
      const cy = y - f * h;
      return <path key={i} d={`M${cx - 34},${cy + 16} L${cx},${cy - 10} L${cx + 34},${cy + 16}`} stroke={`rgba(${COLD},0.95)`} strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={Math.sin(f * Math.PI)} />;
    })}
  </g>
);

// ============ S1 HOOK WIDE: Chris in the orange bivy, sitting right on the snow, shivering (0 - 2.6) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.04, 1.1, t / 2.6), rot: hh.rot };
  const g = 1560;
  const s = 2.3;
  const seat = g - 70;
  const shiver = Math.sin(t * 46) * 3;
  const p: HikerProps = { x: 470 + shiver, y: seat + 182 * s, scale: s, walk: 0, lean: 0.1, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 3) * 1.2 };
  const [hx, hy] = headAt(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={g - 200} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(240,244,250,0.9)">
          <Person {...p} outfit={CHRIS} expression="tired" noPack />
          <Cocoon x={hx - 10} yTop={hy + 60} w={360} h={g + 30 - hy - 60} />
          <Breath p={p} t={t} />
        </Subject>
        <Svg>
          <rect x={-200} y={g + 22} width={1500} height={700} fill={SNOW2} />
          <path d={`M-200,${g + 24} Q470,${g + 4} 1300,${g + 24}`} fill={SNOW} />
          <ColdRise x={460} y={g + 20} w={460} t={t} k={at(t, [0.8, 1.4], [0, 0.8])} h={200} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Particles seed={2271} n={22} col="#ffffff" fall={24} />
      <Grade sunX={820} sunY={520} warm="225,232,240" cool="30,45,80" />
      <Title text={"In the bivy.\nStill\nfreezing."} t={t} t0={0} top={120} size={128} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: his face at the bivy opening, breath and shivers (2.6 - 4.78) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.02], outExpo), rot: hh.rot };
  const s = 4.4;
  const seat = 1700;
  const shiver = Math.sin(t * 46) * 4;
  const p: HikerProps = { x: 520 + shiver, y: seat + 182 * s, scale: s, walk: 0, lean: 0.08, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 3) * 1 };
  const [hx, hy] = headAt(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={1250} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(230,238,250,0.9)">
          <Person {...p} outfit={CHRIS} expression="tired" noPack />
          <Cocoon x={hx - 20} yTop={hy + 150} w={760} h={2000 - hy - 150} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={2272} n={26} col="#ffffff" fall={28} />
      <Grade sunX={820} sunY={520} warm="215,226,244" vignette={0.6} />
      <Chip text="Twisted ankle" t={t} t0={2.7} x={60} y={170} icon="none" big />
      <Chip text="Bivy on, still cold" t={t} t0={3.5} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM, LOW ANGLE: the cold comes up from the snow into the bivy (4.78 - 8.0) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.2), rot: hh.rot };
  const g = 1460;
  const s = 3.0;
  const seat = g - 60;
  const p: HikerProps = { x: 560, y: seat + 182 * s, scale: s, walk: 0, lean: 0.12, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 3) * 1 };
  const [hx, hy] = headAt(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g - 240} blur={6} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={-5} col="rgba(240,244,250,0.9)">
          <Person {...p} outfit={CHRIS} expression="tired" noPack />
          <Cocoon x={hx - 10} yTop={hy + 80} w={470} h={g + 40 - hy - 80} />
        </Subject>
        <Svg>
          <ColdRise x={550} y={g + 40} w={620} t={t} k={at(t, [5.0, 5.6], [0, 1])} h={380} />
          {/* snow under him, in front */}
          <rect x={-200} y={g + 70} width={1500} height={600} fill={SNOW2} />
          <path d={`M-200,${g + 70} Q540,${g + 30} 1300,${g + 70}`} fill={SNOW} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Particles seed={2273} n={20} col="#ffffff" fall={20} />
      <Grade sunX={820} sunY={520} warm="220,230,245" cool="30,45,80" vignette={0.55} />
      <Chip text="The cold comes from below" t={t} t0={5.2} x={60} y={170} icon="x" big />
      <Chip text="Snow under the bivy" t={t} t0={6.4} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the rule: dry layer zipped up, beanie pulled on (8.0 - 9.95) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.95), rot: hh.rot };
  const s = 4.4;
  const seat = 1600;
  const layer = at(t, [8.5, 8.9], [0, 1], outExpo);
  const hatOn = at(t, [9.0, 9.5], [0, 1], outExpo);
  const p: HikerProps = { x: 520, y: seat + 182 * s, scale: s, walk: 0, lean: 0.06, poles: false, handOverride: [50, -70 + 40 * layer], breathe: 0 };
  const [hx, hy] = headAt(p);
  const base: Outfit = layer > 0.5 ? { ...CHRIS, jacket: CHRIS_FIX.jacket, jacketShade: CHRIS_FIX.jacketShade } : CHRIS;
  const outfit: Outfit = base;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1250} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,190,0.9)">
          <Person {...p} outfit={outfit} expression="neutral" noPack />
          <g opacity={at(t, [8.85, 9.0], [0, 1])}>
            <Beanie hx={hx} hy={mix(hy - 380, hy, hatOn)} s={s} />
          </g>
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} />
      <Particles seed={2274} n={16} col="#ffffff" fall={18} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Chip text="The rule" t={t} t0={8.05} x={60} y={170} icon="none" big />
      <Chip text="Dry layers and hat first" t={t} t0={8.7} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: in the bivy, sitting on his pack, off the snow (9.95 - 11.75) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.03, 1.08, lt / 1.8), rot: hh.rot };
  const g = 1560;
  const s = 2.6;
  const up = at(t, [10.1, 10.6], [0, 1], outExpo);
  const seat = g - 70 - up * 150;
  const p: HikerProps = { x: 500, y: seat + 182 * s, scale: s, walk: 0, lean: 0.12, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 2) * 1 };
  const [hx, hy] = headAt(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 220} t={t} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.24} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,236,210,0.9)">
          <Person {...p} outfit={CHRIS_FIX} expression="happy" noPack />
          <Beanie hx={hx} hy={hy} s={s} />
          <Svg>
          <g opacity={up}>
            <rect x={340} y={seat - 10} width={320} height={g - seat + 30} rx={40} fill={CHRIS.pack} />
            <rect x={360} y={seat + 20} width={280} height={30} rx={12} fill={CHRIS.packShade} />
          </g>
          </Svg>
          <Cocoon x={hx - 10} yTop={hy + 70} w={400} h={seat + 40 - hy - 70} />
        </Subject>
        <Svg>
          <ColdRise x={500} y={g + 20} w={500} t={t} k={1 - up} h={160} />
          <rect x={-200} y={g + 20} width={1500} height={700} fill={SNOW2} />
          <path d={`M-200,${g + 22} Q500,${g + 2} 1300,${g + 22}`} fill={SNOW} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Particles seed={2275} n={18} col="#ffffff" fall={16} />
      <Grade sunX={800} sunY={560} warm="250,232,206" />
      <Chip text="Sit on your pack" t={t} t0={10.1} x={60} y={170} icon="check" big />
      <Chip text="Off the snow" t={t} t0={10.8} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/emergency-bivy-sack-card-cut.png"
      cutoutH={760}
      spec="REFLECTIVE · WINDPROOF · PACKS PALM-SIZE"
      name={
        <>
          Emergency
          <br />
          Bivy Sack
        </>
      }
      nameSize={104}
      price="From $14.99"
      save="Save this before your next winter hike"
    />
  );
};

export const V227: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.68} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.6} to={4.86} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.6} />
    </Scene>
    <Scene from={4.78} to={8.08} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.78} />
    </Scene>
    <Scene from={8.0} to={10.03} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={8.0} />
    </Scene>
    <Scene from={9.95} to={11.85} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.95} />
    </Scene>
    <Scene from={11.75} to={16.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.6, 1600],
        [2.6, 4.78, 1600],
        [4.78, 8.0, 1600],
        [8.0, 9.95, 1600],
        [9.95, 11.75, 1600],
      ]}
    />
  </AbsoluteFill>
);
