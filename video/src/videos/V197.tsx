// V197: "The snow hid the creek." Short format (16.9 s, 44 words), cinematic C01 style, winter woods.
// Product: Hiking Safety Guide, $8.99 (live Shopify). End card = boxed store photo (as in V180).
// Advice (conservative): snow can bridge over a creek that is still running underneath; never walk on snow over running
// water, cross where it is solid (a footbridge or a clear, safe crossing). No numbers, no injury shown (a wet leg, he climbs out).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v197.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const OWEN: Outfit = {
  ...JAKE,
  skin: "#E0AE8A",
  skinShade: "#C28E6C",
  hair: "#3a2a1c",
  beard: "#3a2a1c",
  cap: "#2F4A6B",
  capShade: "#233955",
  jacket: "#C77A23",
  jacketShade: "#a1611a",
  pants: "#2f3a40",
  pantsShade: "#232b30",
  pack: "#3d5a45",
  packShade: "#2e4434",
  glove: "#2a2a2a",
};

const WATER = "#3f6f80";
const WATER2 = "#5c8fa0";

const Breath: React.FC<{ p: HikerProps; t: number; flip?: boolean }> = ({ p, t, flip }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const k = (t * 0.5) % 1;
  return (
    <g transform={hikerTransform(p)}>
      <circle cx={hx + (flip ? -1 : 1) * (55 + k * 70)} cy={hy + 10 - k * 24} r={8 + k * 22} fill="#ffffff" opacity={0.35 * (1 - k)} />
    </g>
  );
};

// Snowy ground with a smooth, slightly sunken band where a creek runs under the snow.
const SnowField: React.FC<{ y: number; bandX: number; bandW: number; sag?: number }> = ({ y, bandX, bandW, sag = 14 }) => (
  <Svg>
    <path d={`M-400,${y} Q540,${y - 30} 1480,${y} L1480,2600 L-400,2600 Z`} fill={SNOW} />
    <path d={`M${bandX - bandW / 2},${y - 10} Q${bandX},${y + sag} ${bandX + bandW / 2},${y - 10} L${bandX + bandW * 0.9},2600 L${bandX - bandW * 0.9},2600 Z`} fill="#e9eff3" />
    <path d={`M${bandX - bandW / 2},${y - 10} L${bandX - bandW * 0.9},2600`} stroke="#d2dde4" strokeWidth={6} />
    <path d={`M${bandX + bandW / 2},${y - 10} L${bandX + bandW * 0.9},2600`} stroke="#d2dde4" strokeWidth={6} />
    {Array.from({ length: 10 }, (_, i) => (
      <ellipse key={i} cx={-300 + i * 190} cy={y + 80 + ((i * 71) % 260)} rx={60} ry={8} fill="#cfd9df" opacity={0.6} />
    ))}
  </Svg>
);

// ============ S1 HOOK WIDE: smooth snow across the trail, Owen walks toward it (0 - 2.7) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 2.7), rot: hh.rot };
  const g = 1480;
  const ph = t * 3;
  const p: HikerProps = { x: 280 + t * 60, y: g + 130, scale: 2.3, phase: ph, walk: 0.7, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowField y={g} bandX={760} bandW={260} />
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={OWEN} expression="happy" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.24} col="255,246,220" />
      <Particles seed={1971} n={18} col="#ffffff" fall={20} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Title text={"The snow\nhid the\ncreek."} t={t} t0={0} top={110} size={140} />
    </AbsoluteFill>
  );
};

// ============ S2 CUTAWAY: the camera dips under the surface, water runs beneath a thin snow bridge (2.7 - 4.8) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y - lt * 30, zoom: mix(1.0, 1.06, lt / 2.1), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={700} t={t} blur={6} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={800} width={1500} height={1400} fill="#6b5a4a" />
          <path d="M-200,820 L1300,820 L1300,940 Q540,1000 -200,940 Z" fill={SNOW} />
          <path d="M-200,820 L1300,820" stroke="#ffffff" strokeWidth={6} />
          <path d="M140,940 Q540,1080 940,940 L1000,1500 Q540,1560 80,1500 Z" fill="#20323a" />
          <path d="M120,1260 Q540,1320 960,1260 L990,1500 Q540,1560 90,1500 Z" fill={WATER} />
          {Array.from({ length: 12 }, (_, i) => {
            const k = (t * 0.9 + i * 0.083) % 1;
            return <path key={i} d={`M${100 + k * 900},${1300 + (i % 4) * 45} l70,0`} stroke={WATER2} strokeWidth={8} strokeLinecap="round" opacity={0.9 * Math.sin(k * Math.PI)} />;
          })}
          {Array.from({ length: 6 }, (_, i) => (
            <path key={`ic${i}`} d={`M${200 + i * 130},${975 + Math.sin(i) * 12} l10,${30 + (i % 3) * 14} l10,-${30 + (i % 3) * 14}`} fill="#dfeef4" />
          ))}
          <path d="M-200,940 Q-40,980 140,940 L80,1500 L-200,1500 Z" fill="#7a6855" />
          <path d="M940,940 Q1100,980 1300,940 L1300,1500 L1000,1500 Z" fill="#7a6855" />
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={`r${i}`} cx={-60 + i * 300} cy={1560 + (i % 2) * 40} rx={120} ry={40} fill="#4e4a44" />
          ))}
        </Svg>
      </Plane>
      <Particles seed={1972} n={10} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={300} warm="245,240,230" cool="30,50,70" vignette={0.55} />
      <Chip text="Still running underneath" t={t} t0={2.85} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: one step, the crust breaks, his boot goes into the water (4.8 - 8.0) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const drop = at(t, [5.3, 5.65], [0, 1]);
  const shake = t > 5.3 ? Math.max(0, 1 - (t - 5.3) * 2.2) : 0;
  const hh = handheld(t, 0.3, shake * 3.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 3.2), rot: hh.rot };
  const out = at(t, [7.0, 7.9], [0, 1]);
  const legY = drop * 460 - out * 380;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={900} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={1300} width={1500} height={1100} fill={SNOW} />
          <rect x={-200} y={1300} width={1500} height={40} fill="#ffffff" />
          {drop > 0 && (
            <g>
              <path d="M180,1300 L260,1250 L420,1280 L560,1240 L720,1290 L880,1260 L940,1300 L900,1900 L220,1900 Z" fill="#20323a" opacity={Math.min(1, drop * 2)} />
              <rect x={220} y={1640} width={680} height={260} fill={WATER} opacity={Math.min(1, drop * 2)} />
              {Array.from({ length: 8 }, (_, i) => {
                const k = (t * 1.1 + i * 0.12) % 1;
                return <path key={i} d={`M${240 + k * 600},${1680 + (i % 3) * 60} l60,0`} stroke={WATER2} strokeWidth={8} strokeLinecap="round" opacity={0.8} />;
              })}
              {[0, 1, 2, 3, 4].map((i) => (
                <path key={`c${i}`} d={`M${200 + i * 160},1300 l${30 + i * 4},${80 + (i % 2) * 40 + drop * 160}`} stroke="#c8d6de" strokeWidth={14} />
              ))}
            </g>
          )}
        </Svg>
        <Subject rimX={4} col="rgba(230,240,255,0.7)">
          <g transform={`translate(${0},${-260 + legY}) translate(560,1200) scale(0.9) translate(-560,-1200)`}>
            <path d="M300,560 Q380,520 470,560 L500,1090 L280,1090 Z" fill={OWEN.pants} />
            <path d="M300,700 Q380,680 480,700 L500,1090 L280,1090 Z" fill="#1d262b" opacity={drop * 0.4} />
            <path d="M330,640 Q360,800 330,960" stroke={OWEN.pantsShade} strokeWidth={10} fill="none" />
            <path d="M240,1060 L520,1060 Q560,1120 700,1160 Q840,1190 850,1260 L850,1300 L220,1300 Z" fill="#5a3f2c" stroke="rgba(0,0,0,0.3)" strokeWidth={4} />
            <path d="M300,1080 L500,1080" stroke="#c9b48e" strokeWidth={10} />
            {[0, 1, 2, 3].map((i) => (
              <path key={i} d={`M${540 + i * 46},${1130 + i * 14} l26,-18`} stroke="#c9b48e" strokeWidth={7} strokeLinecap="round" />
            ))}
            <rect x={210} y={1290} width={650} height={34} rx={14} fill="#2a2522" />
          </g>
        </Subject>
        <Svg>
          {drop > 0 &&
            Array.from({ length: 14 }, (_, i) => {
              const k = Math.max(0, Math.min(1, (t - 5.45) / 0.7));
              const a = -Math.PI * (0.1 + (i / 13) * 0.8);
              return k > 0 && k < 1 ? <circle key={i} cx={560 + Math.cos(a) * 380 * k} cy={1360 + Math.sin(a) * 300 * k + k * k * 260} r={12} fill={i % 2 ? "#ffffff" : WATER2} opacity={1 - k} /> : null;
            })}
          <rect x={-200} y={1900} width={1500} height={600} fill={SNOW2} />
        </Svg>
      </Plane>
      <Particles seed={1973} n={14} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={800} sunY={300} warm="240,240,240" cool="30,50,80" vignette={0.6} />
      <Chip text="Leg in cold water" t={t} t0={5.6} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: Owen's face, the rule (8.0 - 10.9) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.9), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 540, y: 1700 + 182 * s - 80, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 1.4) * 1.6 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1250} t={t} blur={9} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={OWEN} expression="neutral" />
          <Breath p={p} t={t * 0.6} />
        </Subject>
      </Plane>
      <Particles seed={1974} n={20} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,225" cool="40,60,90" vignette={0.6} />
      <Chip text="The rule" t={t} t0={8.1} x={60} y={200} icon="none" big />
      <Chip text="Never walk on snow" t={t} t0={8.9} x={60} y={330} icon="x" big />
      <Chip text="over running water" t={t} t0={9.9} x={60} y={460} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: Owen crosses on a wooden footbridge, open water below (10.9 - 12.5) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 20, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.6), rot: hh.rot };
  const g = 1440;
  const ph = t * 3;
  const p: HikerProps = { x: 300 + lt * 140, y: g, scale: 2.4, phase: ph, walk: 0.7, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={1150} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-400,1300 Q540,1270 1480,1300 L1480,2600 L-400,2600 Z" fill={SNOW} />
          <path d="M-400,1560 Q540,1520 1480,1560 L1480,1820 Q540,1780 -400,1820 Z" fill={WATER} />
          {Array.from({ length: 10 }, (_, i) => {
            const k = (t * 0.8 + i * 0.1) % 1;
            return <path key={i} d={`M${-200 + k * 1500},${1600 + (i % 4) * 50} l90,0`} stroke={WATER2} strokeWidth={8} strokeLinecap="round" opacity={0.8} />;
          })}
          <rect x={-200} y={g} width={1500} height={46} fill="#7a5a3c" />
          <rect x={-200} y={g + 46} width={1500} height={16} fill="#5d432c" />
          {Array.from({ length: 6 }, (_, i) => (
            <rect key={i} x={-120 + i * 260} y={g + 60} width={30} height={420} fill="#5d432c" />
          ))}
          <rect x={-200} y={g - 190} width={1500} height={18} fill="#7a5a3c" />
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={`p${i}`} x={-160 + i * 230} y={g - 190} width={22} height={200} fill="#6a4d33" />
          ))}
          <rect x={-200} y={g - 196} width={1500} height={8} fill="#ffffff" opacity={0.9} />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={OWEN} expression="happy" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.28} col="255,246,220" />
      <Particles seed={1975} n={16} col="#ffffff" bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Chip text="Find a solid crossing" t={t} t0={11.0} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-safety-guide.jpg"
      photoH={800}
      spec="PDF GUIDE · TEN SHORT CHAPTERS"
      name={
        <>
          Hiking Safety
          <br />
          Guide
        </>
      }
      nameSize={96}
      price="$8.99"
      save="Save this before your winter hike"
    />
  );
};

export const V197: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.78} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.7} to={4.88} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.7} />
    </Scene>
    <Scene from={4.8} to={8.08} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.8} />
    </Scene>
    <Scene from={8.0} to={10.98} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={8.0} />
    </Scene>
    <Scene from={10.9} to={12.5} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={10.9} />
    </Scene>
    <Scene from={12.4} to={16.9} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.7, 1600],
        [2.7, 4.8, 1600],
        [4.8, 8.0, 1600],
        [8.0, 10.9, 1600],
        [10.9, 12.4, 1600],
      ]}
    />
  </AbsoluteFill>
);
