// V218: "No water past the park gate." Short format (16.4 s, 42 words), cinematic C01 style, Joshua Tree desert.
// Product: Joshua Tree National Park — Trip Planning Guide, $9.99 (live Shopify, 30 pages). End card = the real cover (boxed photo card).
// Facts (NPS): no water in the park's interior (only at a few visitor centers, entrances and two campgrounds at the edges),
// cell service is very limited. Advice (conservative): fill every bottle in town before you drive in, and turn back at half your water.
// No litre numbers on screen.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, Clouds, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { Tap } from "../canyon";
import vo from "../vo/v218.json";

const words = vo.words as unknown as Word[];

const MOJAVE: Sky = { top: "#2f6aa6", mid: "#9cc4e2", low: "#f6e2c4", sun: [800, 470], sunR: 50, sunCol: "#fffbea", glow: "#ffe6b8" };
const TOWN: Sky = { top: "#4a78a8", mid: "#b9d2e6", low: "#f8e8d0", sun: [260, 520], sunR: 46, sunCol: "#fffbea", glow: "#ffe1b0" };

const MAYA: Outfit = {
  ...GUIDE,
  skin: "#C98E6A",
  skinShade: "#A8704F",
  hair: "#2b1a12",
  ponytail: "#2b1a12",
  beard: null,
  cap: "#E7DCC3",
  capShade: "#C9BDA3",
  jacket: "#5E8C8A",
  jacketShade: "#46706e",
  pants: "#8a7a62",
  pantsShade: "#6e6150",
  boot: "#6b4630",
  sole: "#2a2421",
  pack: "#C2662E",
  packShade: "#9B4E20",
};
const BOTTLE = "#cfe3ea";

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(30,20,12,0) 0%, rgba(30,20,12,0.45) 45%, rgba(30,20,12,0.45) 70%, rgba(30,20,12,0) 100%)" }} />
);

// A Joshua tree (screen units, base at x,y, height about 520*s). seed varies the branches.
const JTree: React.FC<{ x: number; y: number; s?: number; seed?: number; col?: string; trunk?: string }> = ({ x, y, s = 1, seed = 0, col = "#5d6a3a", trunk = "#7a6650" }) => {
  const arms: [number, number, number, number][] =
    seed % 3 === 0
      ? [[0, -300, -130, -430], [0, -300, 120, -470], [0, -230, 170, -330], [0, -360, -30, -520]]
      : seed % 3 === 1
        ? [[0, -260, -160, -380], [0, -320, 90, -500], [0, -200, 150, -300]]
        : [[0, -340, -110, -480], [0, -340, 140, -420], [0, -250, -170, -310], [0, -360, 30, -540]];
  const Cluster = ({ cx, cy }: { cx: number; cy: number }) => (
    <g>
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const r = 34 + ((i * 7 + seed) % 5) * 4;
        return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r * 0.9} stroke={col} strokeWidth={7} strokeLinecap="round" />;
      })}
      <circle cx={cx} cy={cy} r={16} fill={col} />
    </g>
  );
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M-22,0 Q-18,-160 -10,-320 L10,-320 Q18,-160 24,0 Z" fill={trunk} />
      {arms.map(([x0, y0, x1, y1], i) => (
        <path key={i} d={`M${x0},${y0} Q${(x0 + x1) / 2 + (x1 > 0 ? 30 : -30)},${y0 - 20} ${x1},${y1}`} stroke={trunk} strokeWidth={22} fill="none" strokeLinecap="round" />
      ))}
      {arms.map(([, , x1, y1], i) => (
        <Cluster key={i} cx={x1} cy={y1 - 10} />
      ))}
    </g>
  );
};

// Pile of rounded granite boulders (screen units).
const Boulders: React.FC<{ x: number; y: number; s?: number; col?: string; shade?: string }> = ({ x, y, s = 1, col = "#d7a982", shade = "#b8875f" }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {[
      [-200, -90, 150, 100],
      [60, -110, 190, 120],
      [-60, -250, 140, 110],
      [180, -280, 110, 90],
      [-250, -230, 90, 80],
      [40, -380, 100, 80],
    ].map(([cx, cy, rx, ry], i) => (
      <g key={i}>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={col} />
        <ellipse cx={cx + rx * 0.3} cy={cy + ry * 0.25} rx={rx * 0.75} ry={ry * 0.7} fill={shade} opacity={0.6} />
        <ellipse cx={cx - rx * 0.35} cy={cy - ry * 0.4} rx={rx * 0.35} ry={ry * 0.22} fill="#f2cfa8" opacity={0.6} />
      </g>
    ))}
  </g>
);

const DesertBackdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; y: number; blur?: number; t: number }> = ({ cam, sky, uid, y, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={360} col="#ffffff" seed={7} drift={t * 10} opacity={0.3} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2.6 + blur}>
      <Ridge seed={63} base={y - 330} amp={260} scale={260} col="#9d93a8" lit="#f3d9c0" peak={60} />
    </Plane>
    <Haze y={y - 460} h={360} col={sky.low} opacity={0.6} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Svg>
        <Boulders x={180} y={y - 150} s={0.9} col="#cf9f7a" shade="#b08360" />
        <Boulders x={900} y={y - 170} s={1.1} col="#cf9f7a" shade="#b08360" />
        <JTree x={560} y={y - 140} s={0.45} seed={2} col="#6e7748" trunk="#8b7560" />
      </Svg>
    </Plane>
    <Haze y={y - 240} h={220} col={sky.low} opacity={0.35} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Svg>
        <JTree x={120} y={y - 40} s={0.8} seed={0} />
        <JTree x={980} y={y - 30} s={0.95} seed={1} />
        <JTree x={720} y={y - 60} s={0.55} seed={2} />
      </Svg>
    </Plane>
  </>
);

// Sandy trail ground with scrub.
const Sand: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y - 40} L1480,${y - 40} L1480,2600 L-400,2600 Z`} fill="#c99c72" />
    <path d={`M-400,${y - 8} L1480,${y - 8} L1480,${y + 90} L-400,${y + 90} Z`} fill="#e2bd92" />
    {Array.from({ length: 9 }, (_, i) => {
      const x = -260 + i * 210;
      return <ellipse key={i} cx={x} cy={y + 60 + (i % 3) * 16} rx={22 + (i % 3) * 10} ry={8} fill="#a8805c" />;
    })}
    {Array.from({ length: 5 }, (_, i) => {
      const x = -150 + i * 360;
      return (
        <g key={`s${i}`}>
          <ellipse cx={x} cy={y - 44} rx={56} ry={26} fill="#8c8f5a" />
          <ellipse cx={x + 26} cy={y - 56} rx={36} ry={20} fill="#a0a46a" />
        </g>
      );
    })}
  </Svg>
);

// Clear plastic bottle (screen units, base at x,y). level 0..1 of water.
const ClearBottle: React.FC<{ x: number; y: number; s?: number; level: number; rot?: number; cap?: string }> = ({ x, y, s = 1, level, rot = 0, cap = "#2f6aa6" }) => {
  const h = 300;
  const wy = -h + 20 + (h - 40) * (1 - level);
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      <defs>
        <clipPath id={`cb${Math.round(x)}${Math.round(y)}`}>
          <rect x={-60} y={-h} width={120} height={h} rx={34} />
        </clipPath>
      </defs>
      <rect x={-60} y={-h} width={120} height={h} rx={34} fill={BOTTLE} opacity={0.45} />
      <g clipPath={`url(#cb${Math.round(x)}${Math.round(y)})`}>
        {level > 0.01 && <rect x={-60} y={wy} width={120} height={h} fill="#5fb3d6" opacity={0.85} />}
        {level > 0.01 && <rect x={-60} y={wy} width={120} height={8} fill="#bfe7f5" />}
      </g>
      <rect x={-60} y={-h} width={120} height={h} rx={34} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={5} />
      <rect x={-44} y={-h + 30} width={14} height={h - 70} rx={7} fill="rgba(255,255,255,0.55)" />
      <rect x={-30} y={-h - 44} width={60} height={50} rx={10} fill={cap} />
    </g>
  );
};

// Close-up hand gripping something at (x,y) from the left (screen units).
const Grip: React.FC<{ x: number; y: number; s?: number; skin: string; shade: string; sleeve: string }> = ({ x, y, s = 1, skin, shade, sleeve }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-520,120 L-150,40 L-130,150 L-520,260 Z" fill={sleeve} />
    <path d="M-170,20 Q-60,-20 40,0 L60,150 Q-60,190 -170,150 Z" fill={skin} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={10} y={-6 + i * 38} width={84} height={34} rx={17} fill={i % 2 ? shade : skin} />
    ))}
    <path d="M-60,-10 Q20,-60 70,-40 Q80,-20 40,-4 Z" fill={shade} />
  </g>
);

// Phone in a hand: status bar shows "No service".
const NoSignalPhone: React.FC<{ x: number; y: number; s?: number; rot?: number; k: number }> = ({ x, y, s = 1, rot = 0, k }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-170} y={-330} width={340} height={660} rx={46} fill="#1d1f22" />
    <rect x={-152} y={-310} width={304} height={620} rx={34} fill="#e9eef2" />
    <rect x={-152} y={-310} width={304} height={180} rx={34} fill="#cfdbe4" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={-120 + i * 26} y={-262 - i * 10} width={18} height={20 + i * 10} rx={4} fill="#9aa6ae" opacity={0.5} />
    ))}
    <text x={0} y={-150} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={64} fill="#2a2f33" opacity={k}>
      NO SERVICE
    </text>
    <rect x={-120} y={-60} width={240} height={26} rx={13} fill="#cbd3d9" />
    <rect x={-120} y={-10} width={180} height={26} rx={13} fill="#cbd3d9" />
    <circle cx={0} cy={150} r={70} fill="#d9443a" opacity={0.15 * k} />
    <path d="M-34,116 L34,184 M34,116 L-34,184" stroke="#d9443a" strokeWidth={16} strokeLinecap="round" opacity={k} />
  </g>
);

// ============ S1 HOOK WIDE: Maya walks into Joshua Tree, empty bottle swinging (0 - 3.68) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.04, 1.12, t / 3.7), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.2;
  const p: HikerProps = { x: 330 + t * 40, y: g + 20, scale: 2.3, phase: ph, walk: 0.6, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.6), breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <DesertBackdrop cam={cam} sky={MOJAVE} uid="a" y={g - 100} t={t} />
      <Plane cam={cam} depth={1}>
        <Sand y={g} />
        <Subject rimX={5}>
          <JTree x={880} y={g - 20} s={1.35} seed={0} />
          <Person {...p} outfit={MAYA} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <Svg>
          <Boulders x={1020} y={2080} s={1.6} col="#9c7556" shade="#7d5b42" />
        </Svg>
      </Plane>
      <Rays x={800} y={470} strength={0.18} spin={t * 2} />
      <Particles seed={2181} n={14} col="#fff1d6" fall={-3} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={470} warm="255,214,160" cool="40,40,80" vignette={0.5} />
      <Title text={"No water\npast the\npark gate."} t={t} t0={0} top={110} size={128} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: her bottle held up to the sun, almost empty (3.68 - 5.8) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.02], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill>
      <DesertBackdrop cam={cam} sky={MOJAVE} uid="b" y={1400} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6}>
          <ClearBottle x={620} y={1240} s={2.1} level={0.06} rot={-8} />
          <Grip x={540} y={980} s={1.6} skin={MAYA.skin} shade={MAYA.skinShade} sleeve={MAYA.jacket} />
        </Subject>
      </Plane>
      <Rays x={800} y={470} strength={0.24} spin={t * 3} />
      <Particles seed={2182} n={12} col="#fff1d6" fall={-2} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={470} warm="255,214,160" cool="40,40,80" vignette={0.5} />
      <Chip text="No water inside" t={t} t0={3.8} x={60} y={170} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: her phone, no service (5.8 - 8.01) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + Math.sin(t * 1.3) * 8, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.2), rot: hh.rot };
  const k = at(t, [6.2, 6.5], [0, 1]);
  return (
    <AbsoluteFill>
      <DesertBackdrop cam={cam} sky={MOJAVE} uid="c" y={1450} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6}>
          <NoSignalPhone x={560} y={1060} s={1.35} rot={-6} k={k} />
          <Grip x={330} y={1400} s={1.6} skin={MAYA.skin} shade={MAYA.skinShade} sleeve={MAYA.jacket} />
        </Subject>
      </Plane>
      <Particles seed={2183} n={10} col="#fff1d6" fall={-2} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={470} warm="255,214,160" cool="40,40,80" vignette={0.55} />
      <Chip text="Very little signal" t={t} t0={6.3} x={60} y={170} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: in town, filling every bottle at a tap (8.01 - 10.26) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.25), rot: hh.rot };
  const g = 1540;
  const fills = [at(t, [8.1, 8.8], [0.05, 1]), at(t, [8.8, 9.5], [0.05, 1]), at(t, [9.5, 10.2], [0.05, 1])];
  const active = t < 8.8 ? 0 : t < 9.5 ? 1 : 2;
  const p: HikerProps = { x: 300, y: g + 30, scale: 2.4, walk: 0, lean: 0.12, poles: false, handOverride: [64, -10], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={TOWN} uid="d" />
      </Plane>
      <Plane cam={cam} depth={0.25} blur={6}>
        <Svg>
          <rect x={-200} y={g - 700} width={760} height={520} fill="#d8c4a4" />
          <rect x={-200} y={g - 740} width={780} height={60} fill="#8a5a3c" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={-120 + i * 220} y={g - 600} width={140} height={150} fill="#5c7d8f" opacity={0.8} />
          ))}
          <rect x={640} y={g - 560} width={560} height={380} fill="#c9a882" />
          <JTree x={760} y={g - 170} s={0.5} seed={1} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={g - 20} width={1500} height={900} fill="#b9a68c" />
          <rect x={-200} y={g - 20} width={1500} height={16} fill="#d8c8b0" />
        </Svg>
        <Subject rimX={5}>
          <Person {...p} outfit={MAYA} expression="neutral" noPack />
          <Tap x={700} y={g - 10} s={1.25} turn={1} flow={1} />
          {fills.map((f, i) => (
            <ClearBottle key={i} x={i === active ? 902 : i < active ? 990 + i * 75 : 520 + (i - active - 1) * 120 + (active === 0 ? 0 : 60)} y={g - 20} s={0.9} level={f} />
          ))}
        </Subject>
      </Plane>
      <Particles seed={2184} n={10} col="#fff1d6" fall={-2} bokeh />
      <LowScrim />
      <Grade sunX={260} sunY={520} warm="255,220,170" cool="40,40,80" vignette={0.45} />
      <Chip text="The rule" t={t} t0={8.05} x={60} y={170} icon="none" big />
      <Chip text="Fill every bottle in town" t={t} t0={8.7} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: on the trail, bottle at half, Maya turns back (10.26 - 12.06) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.8), rot: hh.rot };
  const g = 1500;
  const turned = t > 11.0;
  const ph = t * 3.2;
  const walk = turned ? 0.6 : 0;
  const p: HikerProps = { x: 560 - Math.max(0, t - 11.0) * 60, y: g + 20, scale: 2.4, phase: ph, walk, lean: 0.04, poles: false, handOverride: turned ? freeHand(ph, walk) : [40, -30], breathe: 0 };
  return (
    <AbsoluteFill>
      <DesertBackdrop cam={cam} sky={MOJAVE} uid="e" y={g - 100} t={t} />
      <Plane cam={cam} depth={1}>
        <Sand y={g} />
        <Subject rimX={5}>
          <Person {...p} outfit={MAYA} expression="happy" flip={turned} />
          {!turned && <ClearBottle x={560 + 40 * 2.4 + 30} y={g + 20 - (182 + 10) * 2.4 + 230} s={0.75} level={0.5} />}
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <Svg>
          <JTree x={60} y={2150} s={1.8} seed={2} col="#3f4a2a" trunk="#5a4a3a" />
        </Svg>
      </Plane>
      <Rays x={800} y={470} strength={0.2} spin={t * 2} />
      <Particles seed={2185} n={14} col="#fff1d6" fall={-3} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={470} warm="255,214,160" cool="40,40,80" vignette={0.5} />
      <Chip text="Half your water gone?" t={t} t0={10.3} x={60} y={170} icon="none" big />
      <Chip text="Turn back" t={t} t0={10.9} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/joshua-tree-trip-planning-guide.jpg"
      photoH={720}
      spec="30 PAGES · 12 HIKES · PRINTABLE PDF"
      name={
        <>
          Joshua Tree
          <br />
          Trip Planning Guide
        </>
      }
      nameSize={84}
      price="$9.99"
      save="Save this before your desert trip"
    />
  );
};

export const V218: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.76} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.68} to={5.88} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.68} />
    </Scene>
    <Scene from={5.8} to={8.09} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.8} />
    </Scene>
    <Scene from={8.01} to={10.34} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={8.01} />
    </Scene>
    <Scene from={10.26} to={12.08} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={10.26} />
    </Scene>
    <Scene from={12.0} to={16.4} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.68, 1600],
        [3.68, 5.8, 1600],
        [5.8, 8.01, 1600],
        [8.01, 10.26, 1600],
        [10.26, 12.0, 1600],
      ]}
    />
  </AbsoluteFill>
);
