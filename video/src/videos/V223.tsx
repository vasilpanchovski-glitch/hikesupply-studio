// V223: "Snow melted right into his fleece." Short format (16.0 s, 44 words), cinematic C01 style, falling snow in a winter forest.
// Product: Packable UPF 50+ Windbreaker — Unisex, $29.99 (live Shopify). End card: the real store cover (grey), cut out.
// Advice (simple, common layering practice): fleece holds falling snow, which melts and soaks in; a light shell over the fleece
// lets the snow slide off. No waterproof claims for the shell.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { FrostTrail, STORM, WINTER, WinterBackdrop } from "../winter";
import { ShellSheen, SnowCoat, WetPatch } from "../cold";
import vo from "../vo/v223.json";

const words = vo.words as unknown as Word[];

const FLEECE = "#C2662E";
const FLEECE2 = "#9B4E20";
const SHELL = "#8c9399"; // grey, like the store photo
const SHELL2 = "#6f767c";
const TOM: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#BC8262",
  hair: "#2b1d14",
  beard: "#2b1d14",
  cap: "#2F3B45",
  capShade: "#222c34",
  jacket: FLEECE,
  jacketShade: FLEECE2,
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  pack: "#3F6B55",
  packShade: "#2D5141",
  glove: "#2a2a2a",
};
const TOM_SHELL: Outfit = { ...TOM, jacket: SHELL, jacketShade: SHELL2 };

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Big soft falling flakes (screen units).
const Flakes: React.FC<{ t: number; seed: number; n?: number; r?: number }> = ({ t, seed, n = 40, r = 6 }) => (
  <Svg>
    {Array.from({ length: n }, (_, i) => {
      const sp = 120 + ((i * 53 + seed) % 7) * 30;
      const y = ((t * sp + i * 211 + seed * 37) % 2100) - 100;
      const x = ((i * 389 + seed * 71) % 1180) - 50 + Math.sin(t * 1.3 + i) * 30;
      return <circle key={i} cx={x} cy={y} r={r + (i % 3) * 2} fill="#ffffff" opacity={0.85} />;
    })}
  </Svg>
);

// Fleece fabric close-up: flakes land, sit, then melt into dark wet spots.
const FLAKES: [number, number, number][] = [
  [260, 820, 3.0], [640, 700, 3.15], [840, 1060, 3.3], [420, 1180, 3.4], [700, 1380, 3.55], [220, 1460, 3.65], [560, 980, 3.75], [900, 1320, 3.85], [330, 620, 3.95], [760, 560, 4.05],
];
const FleeceCU: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    <path d="M-100,300 Q540,200 1180,300 L1180,2000 L-100,2000 Z" fill={FLEECE} />
    <path d="M-100,300 Q540,200 1180,300 L1180,380 Q540,290 -100,380 Z" fill={FLEECE2} />
    {/* pile texture */}
    {Array.from({ length: 220 }, (_, i) => {
      const x = (i * 97) % 1200 - 40;
      const y = 400 + ((i * 61) % 1500);
      return <circle key={i} cx={x} cy={y} r={5 + (i % 3)} fill={i % 2 ? FLEECE2 : "#d47a42"} opacity={0.5} />;
    })}
    {/* zip seam */}
    <path d="M610,240 L640,2000" stroke={FLEECE2} strokeWidth={26} />
    <path d="M610,240 L640,2000" stroke="#2a2a2a" strokeWidth={8} strokeDasharray="10 8" />
    {FLAKES.map(([x, y, t0], i) => {
      const fall = at(t, [t0 - 0.5, t0], [0, 1]);
      const melt = at(t, [t0 + 0.4, t0 + 1.2], [0, 1]);
      const fy = mix(y - 500, y, fall);
      return (
        <g key={i}>
          <ellipse cx={x} cy={y} rx={mix(10, 70, melt)} ry={mix(8, 52, melt)} fill="rgba(40,14,4,0.45)" opacity={melt} />
          <g opacity={(t > t0 - 0.5 ? 1 : 0) * (1 - melt)}>
            <circle cx={x} cy={fy} r={26 * (1 - melt * 0.6)} fill="#ffffff" />
            <path d={`M${x - 30},${fy} L${x + 30},${fy} M${x},${fy - 30} L${x},${fy + 30} M${x - 21},${fy - 21} L${x + 21},${fy + 21} M${x + 21},${fy - 21} L${x - 21},${fy + 21}`} stroke="#ffffff" strokeWidth={6} />
          </g>
        </g>
      );
    })}
  </Svg>
);

// ============ S1 HOOK WIDE: Tom in his fleece in falling snow, snow piling on his shoulders (0 - 2.91) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.04, 1.1, t / 2.9), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.3;
  const p: HikerProps = { x: 330 + t * 40, y: g + 10, scale: 2.4, phase: ph, walk: 0.6, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={g - 180} t={t} woods snow={0.9} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.9} />
        <Subject rimX={5} col="rgba(240,244,250,0.85)">
          <Person {...p} outfit={TOM} expression="neutral" />
          <SnowCoat p={p} k={at(t, [0, 2.6], [0.4, 1])} />
          <Breath p={p} t={t} k={1} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f3a3a" side="right" />
      </Plane>
      <Flakes t={t} seed={1} n={34} r={5} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="225,230,240" cool="30,45,80" vignette={0.55} />
      <Title text={"Snow melted\nright into\nhis fleece."} t={t} t0={0} top={110} size={128} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: flakes land on the fleece and melt into it (2.91 - 4.62) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.0, lt / 1.7), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={1250} blur={14} t={t} woods snow={0.9} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(240,244,250,0.85)">
          <FleeceCU t={t} />
        </Subject>
      </Plane>
      <Flakes t={t} seed={2} n={14} r={9} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="225,230,240" cool="30,45,80" vignette={0.55} />
      <Chip text="It melts right in" t={t} t0={3.6} x={60} y={170} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: lunch stop, fleece wet, Tom cold (4.62 - 6.42) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4, 0.2);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.8), rot: hh.rot };
  const g = 1520;
  const jx = Math.sin(t * 70) * 3;
  const p: HikerProps = { x: 480 + jx, y: g + 10, scale: 2.7, walk: 0, lean: 0.14, poles: false, handOverride: [30, -40], breathe: Math.sin(t * 9) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g - 180} t={t} woods snow={0.9} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.9} />
        <Subject rimX={5} col="rgba(240,244,250,0.85)">
          <Person {...p} outfit={TOM} expression="tired" />
          <WetPatch p={p} k={1} />
          <Breath p={p} t={t} k={1} />
        </Subject>
      </Plane>
      <Flakes t={t} seed={3} n={30} r={5} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="220,228,240" cool="30,45,80" vignette={0.55} />
      <Chip text="By lunch" t={t} t0={4.7} x={60} y={170} icon="none" big />
      <Chip text="Wet and cold" t={t} t0={5.2} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the fix: a light grey shell zipped over the fleece (6.42 - 8.9) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.5), rot: hh.rot };
  const z = at(t, [7.0, 8.2], [0, 1], outExpo); // zip height 0..1
  const zy = mix(1900, 380, z);
  const gap = mix(240, 70, z);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1250} blur={14} t={t} woods snow={0.9} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(240,244,250,0.9)">
          <Svg>
            {/* fleece underneath */}
            <path d="M-100,300 Q540,200 1180,300 L1180,2000 L-100,2000 Z" fill={FLEECE} />
            {Array.from({ length: 120 }, (_, i) => (
              <circle key={i} cx={(i * 97) % 1200 - 40} cy={400 + ((i * 61) % 1500)} r={6} fill={FLEECE2} opacity={0.5} />
            ))}
            {/* the shell: two front panels; below the zip slider they meet, above it they gape open */}
            <path d={`M-100,260 L${540 - gap},280 L540,${zy} L540,2000 L-100,2000 Z`} fill={SHELL} />
            <path d={`M1180,260 L${560 + gap},280 L560,${zy} L560,2000 L1180,2000 Z`} fill={SHELL2} />
            <path d={`M-100,700 Q300,640 500,900`} stroke="rgba(255,255,255,0.25)" strokeWidth={14} fill="none" />
            <path d={`M540,${zy} L540,2000`} stroke="#2a2a2a" strokeWidth={10} strokeDasharray="10 8" />
            <rect x={522} y={zy - 30} width={56} height={70} rx={10} fill="#3a3a3a" />
            <rect x={538} y={zy + 30} width={24} height={60} rx={8} fill="#3a3a3a" />
            {/* gloved hand on the slider */}
            <path d={`M640,${zy + 170} L1300,${zy + 600}`} stroke="#2e3236" strokeWidth={164} strokeLinecap="round" />
            <path d={`M640,${zy + 170} L1300,${zy + 600}`} stroke="#5f666b" strokeWidth={150} strokeLinecap="round" />
            <ellipse cx={600} cy={zy + 120} rx={100} ry={74} fill={TOM.glove ?? "#2a2a2a"} />
            <ellipse cx={560} cy={zy + 90} rx={34} ry={26} fill="#3a3a3a" />
          </Svg>
        </Subject>
      </Plane>
      <Flakes t={t} seed={4} n={12} r={8} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="235,236,232" cool="30,45,80" vignette={0.5} />
      <Chip text="The fix" t={t} t0={6.5} x={60} y={170} icon="none" big />
      <Chip text="Light shell over fleece" t={t} t0={8.0} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: walking on in falling snow, the shell sheds it (8.9 - 11.43) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: mix(1.03, 1.09, lt / 2.5), rot: hh.rot };
  const g = 1520;
  const ph = t * 3.3;
  const p: HikerProps = { x: 360 + lt * 45, y: g + 10, scale: 2.5, phase: ph, walk: 0.6, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  const sx = p.x + 20 * 2.5;
  const sy = p.y - 150 * 2.5;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 180} t={t} woods snow={0.9} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.9} />
        <Subject rimX={5} col="rgba(240,244,250,0.85)">
          <Person {...p} outfit={TOM_SHELL} expression="happy" />
          <ShellSheen p={p} />
          {/* flakes sliding off the shoulder */}
          <Svg>
            {[0, 1, 2, 3].map((i) => {
              const k = (t * 1.1 + i / 4) % 1;
              return <circle key={i} cx={sx + 40 + k * 60} cy={sy + k * 260} r={7} fill="#fff" opacity={1 - k} />;
            })}
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f3a3a" side="left" />
      </Plane>
      <Flakes t={t} seed={5} n={34} r={5} />
      <Particles seed={2235} n={10} col="#ffffff" fall={3} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="235,236,232" cool="30,45,80" vignette={0.5} />
      <Chip text="In falling snow" t={t} t0={9.0} x={60} y={170} icon="check" big />
      <Chip text="It slides off" t={t} t0={10.3} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/packable-upf50-windbreaker-unisex-cover-cut.png"
      cutoutH={760}
      spec="PACKS INTO ITS OWN POUCH · UPF 50+"
      name={
        <>
          Packable
          <br />
          Windbreaker
        </>
      }
      nameSize={100}
      price="$29.99"
      save="Save this for the next snowy hike"
    />
  );
};

export const V223: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.99} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.91} to={4.7} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.91} />
    </Scene>
    <Scene from={4.62} to={6.5} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.62} />
    </Scene>
    <Scene from={6.42} to={8.98} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={6.42} />
    </Scene>
    <Scene from={8.9} to={11.43} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={8.9} />
    </Scene>
    <Scene from={11.35} to={16.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.91, 1600],
        [2.91, 4.62, 1600],
        [4.62, 6.42, 1600],
        [6.42, 8.9, 1600],
        [8.9, 11.35, 1600],
      ]}
    />
  </AbsoluteFill>
);
