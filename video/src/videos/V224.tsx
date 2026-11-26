// V224: "The edge was only snow." Short format (16.0 s, 41 words), cinematic C01 style, snowy ridge in winter.
// Product: Hiking Safety Guide, $8.99 (live Shopify). End card: the store cover photo (boxed card, like V78 / V89).
// Advice (conservative, standard winter mountain safety): on snowy ridges the edge can be a cornice, wind-blown snow hanging
// over the drop with no rock under it. Stay well back from the edge and stand where you can see rock or ground. No numbers.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { BootClose } from "../icy";
import { SNOW, SNOW2, WINTER, WGOLD, WinterBackdrop, Blizzard } from "../winter";
import vo from "../vo/v224.json";

const words = vo.words as unknown as Word[];

const AVA: Outfit = {
  ...GUIDE,
  skin: "#E7B596",
  skinShade: "#C9937A",
  hair: "#6b3f22",
  beard: null,
  ponytail: "#6b3f22",
  cap: "#C8432F",
  capShade: "#9E3324",
  jacket: "#2E7C86",
  jacketShade: "#22606a",
  pants: "#2f3338",
  pantsShade: "#22252a",
  pack: "#3E4F5C",
  packShade: "#2C3943",
  glove: "#2a2a2a",
};

const ROCK = "#6f6a66";
const ROCK2 = "#57534f";
const VOID = "#4f6678";

const toScreen = (p: HikerProps, q: readonly number[]): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Phone held up in the front hand (screen units).
const PhoneInHand: React.FC<{ p: HikerProps }> = ({ p }) => {
  const s = p.scale ?? 1;
  const [x, y] = toScreen(p, hikerGeometry(p).arms[1].hand);
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x={-4} y={-22} width={12} height={22} rx={2.5} fill="#1c1f22" />
      <rect x={-2.5} y={-20} width={9} height={17} rx={1.5} fill="#7fb6d9" />
    </g>
  );
};

// Snowy ridge seen from the side. The snow runs past the end of the rock and hangs over the drop (a cornice).
// rockEnd = x where the rock ends, lip = x of the snow lip, y = snow surface.
const Cornice: React.FC<{ y: number; rockEnd: number; lip: number; crack?: number; t: number; crumbs?: number }> = ({ y, rockEnd, lip, crack = 0, t, crumbs = 0 }) => (
  <Svg>
    {/* the drop: hazy valley far below */}
    <rect x={-300} y={y - 40} width={1800} height={1400} fill="url(#v224void)" />
    <defs>
      <linearGradient id="v224void" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8fa6b8" />
        <stop offset="1" stopColor={VOID} />
      </linearGradient>
    </defs>
    {Array.from({ length: 14 }, (_, i) => (
      <path key={i} d={`M${-200 + i * 110},${y + 700 + (i % 3) * 30} l30,-90 l30,90 Z`} fill="#3f5566" opacity={0.7} />
    ))}
    {/* rock body under the snow, ending in a cliff */}
    <path d={`M-300,${y + 40} L${rockEnd},${y + 50} L${rockEnd + 40},${y + 260} L${rockEnd + 10},${y + 520} L${rockEnd + 70},${y + 900} L-300,${y + 900} Z`} fill={ROCK} />
    <path d={`M${rockEnd},${y + 50} L${rockEnd + 40},${y + 260} L${rockEnd + 10},${y + 520} L${rockEnd + 70},${y + 900} L${rockEnd - 40},${y + 900} L${rockEnd - 30},${y + 400} Z`} fill={ROCK2} />
    {/* snow layer on the rock, then over thin air */}
    <path
      d={`M-300,${y} L${rockEnd},${y - 4} Q${(rockEnd + lip) / 2},${y - 14} ${lip},${y + 6} Q${lip + 40},${y + 30} ${lip - 10},${y + 70} Q${(rockEnd + lip) / 2},${y + 110} ${rockEnd},${y + 140} L${rockEnd},${y + 60} L-300,${y + 48} Z`}
      fill={SNOW}
    />
    <path d={`M${lip - 10},${y + 70} Q${(rockEnd + lip) / 2},${y + 110} ${rockEnd},${y + 140}`} stroke="#b4c4d0" strokeWidth={22} fill="none" />
    <path d={`M-300,${y} L${rockEnd},${y - 4} Q${(rockEnd + lip) / 2},${y - 14} ${lip},${y + 6}`} stroke="#ffffff" strokeWidth={10} fill="none" />
    {/* wind ripples on the surface */}
    {Array.from({ length: 7 }, (_, i) => (
      <path key={i} d={`M${-200 + i * 160},${y + 14} q40,-8 80,0`} stroke={SNOW2} strokeWidth={5} fill="none" opacity={0.8} />
    ))}
    {/* crack line over the rock's end */}
    {crack > 0 && <path d={`M${rockEnd + 10},${y - 4} l-14,${30 * crack} l18,${28 * crack} l-10,${30 * crack}`} stroke="#5d7487" strokeWidth={6} fill="none" strokeLinecap="round" />}
    {/* small snow crumbs breaking off the lip */}
    {crumbs > 0 &&
      [0, 1, 2, 3, 4].map((i) => {
        const k = (t * 0.7 + i / 5) % 1;
        return <circle key={i} cx={lip - 20 + i * 8 + k * 30} cy={y + 60 + k * 700} r={9 - i} fill="#ffffff" opacity={crumbs * (1 - k)} />;
      })}
  </Svg>
);

// ============ S1 HOOK WIDE: Ava walks out toward the snowy edge for a photo (0 - 2.5) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 16, y: hh.y, zoom: mix(1.04, 1.1, t / 2.5), rot: hh.rot };
  const g = 1440;
  const walk = at(t, [0, 1.8, 2.2], [0.6, 0.6, 0]);
  const ph = t * 3.2;
  const p: HikerProps = { x: 300 + Math.min(t, 2.0) * 120, y: g + 10, scale: 2.3, phase: ph, walk, lean: 0.06, poles: false, handOverride: t > 1.8 ? [44, -120] : freeHand(ph, walk), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g + 260} t={t} woods={false} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.24} />
      <Plane cam={cam} depth={1}>
        <Cornice y={g} rockEnd={720} lip={1040} t={t} />
        <Subject rimX={5} col="rgba(255,240,220,0.85)">
          <Person {...p} outfit={AVA} expression="happy" />
          {t > 1.8 && <PhoneInHand p={p} />}
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f3a3a" side="left" />
      </Plane>
      <Particles seed={2241} n={16} col="#ffffff" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,236,214" cool="30,45,80" vignette={0.5} />
      <Title text={"The edge\nwas only\nsnow."} t={t} t0={0} top={110} size={136} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: her boot on the snow; cut-away shows nothing under it (2.5 - 4.6) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.08, 1.0, lt / 2.1), rot: hh.rot };
  const reveal = at(t, [2.7, 3.4], [0, 1], outExpo);
  const top = 1324;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1500} blur={12} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* void under the snow slab */}
          <rect x={-200} y={top} width={1500} height={900} fill="#8fa6b8" />
          <rect x={-200} y={top + 160} width={1500} height={900} fill={VOID} opacity={reveal} />
          {/* rock only far to the left */}
          <path d={`M-200,${top + 30} L60,${top + 40} L110,${top + 300} L60,${top + 700} L-200,${top + 700} Z`} fill={ROCK} />
          {/* the snow slab she stands on */}
          <path d={`M-200,${top} L1300,${top} L1300,${top + 90} Q700,${top + 200} 60,${top + 150} L-200,${top + 140} Z`} fill={SNOW} />
          <path d={`M1300,${top + 90} Q700,${top + 200} 60,${top + 150}`} stroke={SNOW2} strokeWidth={14} fill="none" />
          {[0, 1, 2, 3].map((i) => {
            const k = (t * 0.6 + i / 4) % 1;
            return <circle key={i} cx={500 + i * 140} cy={top + 170 + k * 600} r={10} fill="#ffffff" opacity={reveal * (1 - k)} />;
          })}
        </Svg>
        <Subject rimX={6} col="rgba(255,240,220,0.85)">
          <BootClose toe={0} heel={0} pants={AVA.pants} pantsShade={AVA.pantsShade} boot={AVA.boot} sole={AVA.sole} hand={0} />
        </Subject>
      </Plane>
      <Particles seed={2242} n={10} col="#ffffff" fall={6} bokeh />
      <Grade sunX={800} sunY={560} warm="240,240,238" cool="30,45,80" vignette={0.55} />
      <Chip text="No rock under her" t={t} t0={2.9} x={60} y={170} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE SIDE VIEW: the snow hangs over the drop, she is standing on it (4.6 - 7.02) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4, at(t, [5.9, 6.0, 6.3], [0, 0.4, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.4), rot: hh.rot };
  const g = 1150;
  const p: HikerProps = { x: 780, y: g + 4, scale: 1.7, walk: 0, lean: 0.02, poles: false, handOverride: [44, -120], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={g + 400} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Cornice y={g} rockEnd={480} lip={940} crack={at(t, [5.9, 6.4], [0, 1])} t={t} crumbs={at(t, [5.0, 5.4], [0, 1])} />
        <Svg>
          {/* dotted line where the rock really ends */}
          <path d={`M480,${g - 260} L480,${g + 120}`} stroke="#ffffff" strokeWidth={6} strokeDasharray="14 12" opacity={at(t, [4.9, 5.3], [0, 1])} />
        </Svg>
        <Subject rimX={5} col="rgba(255,240,220,0.85)">
          <Person {...p} outfit={AVA} expression="happy" />
          <PhoneInHand p={p} />
        </Subject>
      </Plane>
      <Blizzard seed={2243} n={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="245,240,232" cool="30,45,80" vignette={0.5} />
      <Chip text="Rock ends here" t={t} t0={4.9} x={60} y={170} icon="none" big />
      <Chip text="Snow over the drop" t={t} t0={5.6} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the rule: she walks well back from the edge (7.02 - 9.3) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 20, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.3), rot: hh.rot };
  const g = 1460;
  const ph = t * 3.3;
  const p: HikerProps = { x: 760 - lt * 120, y: g + 10, scale: 2.4, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="d" treeY={g + 240} t={t} woods={false} />
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.28} col="255,214,150" />
      <Plane cam={cam} depth={1}>
        <Cornice y={g} rockEnd={1020} lip={1300} t={t} />
        <Svg>
          {/* rocks showing through the snow, back from the edge */}
          {[[120, 30, 1], [380, 60, 0.8], [-60, 80, 1.2]].map(([x, dy, s], i) => (
            <g key={i}>
              <ellipse cx={x} cy={g + dy} rx={90 * s} ry={34 * s} fill={ROCK} />
              <ellipse cx={x - 8} cy={g + dy - 14 * s} rx={70 * s} ry={12 * s} fill={SNOW} />
            </g>
          ))}
        </Svg>
        <Subject rimX={-5} col="rgba(255,214,150,0.9)">
          <Person {...p} outfit={AVA} expression="neutral" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f3a3a" side="right" />
      </Plane>
      <Particles seed={2244} n={14} col="#ffe7b8" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,210,160" vignette={0.5} />
      <Chip text="The rule" t={t} t0={7.1} x={60} y={170} icon="none" big />
      <Chip text="Stay well back" t={t} t0={8.0} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: boot on bare rock (9.3 - 11.65) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.3), rot: hh.rot };
  const step = at(t, [9.35, 9.9], [-160, 0], outExpo);
  const top = 1324;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="e" treeY={1500} blur={12} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-200,${top + 10} Q300,${top - 20} 700,${top - 6} Q1000,${top + 4} 1300,${top + 20} L1300,2100 L-200,2100 Z`} fill={ROCK} />
          <path d={`M-200,${top + 80} Q500,${top + 50} 1300,${top + 90}`} stroke={ROCK2} strokeWidth={18} fill="none" />
          <path d={`M200,${top + 200} l120,60 l-40,120`} stroke={ROCK2} strokeWidth={12} fill="none" />
          <ellipse cx={-40} cy={top + 6} rx={180} ry={30} fill={SNOW} />
          <ellipse cx={1180} cy={top + 22} rx={160} ry={26} fill={SNOW} />
          <path d={`M-200,${top + 10} Q300,${top - 20} 700,${top - 6}`} stroke="#8a847f" strokeWidth={8} fill="none" />
        </Svg>
        <Subject rimX={6} col="rgba(255,214,150,0.9)">
          <g transform={`translate(0,${step})`}>
            <BootClose toe={0} heel={0} pants={AVA.pants} pantsShade={AVA.pantsShade} boot={AVA.boot} sole={AVA.sole} hand={0} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={2245} n={12} col="#ffe7b8" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,210,160" vignette={0.5} />
      <Chip text="Stand where you see rock" t={t} t0={9.6} x={60} y={170} icon="check" big />
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
      spec="10 CHAPTERS · PRINT + PHONE PDF"
      name={
        <>
          Hiking
          <br />
          Safety Guide
        </>
      }
      nameSize={104}
      price="$8.99"
      save="Save this before your next ridge"
    />
  );
};

export const V224: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.58} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.5} to={4.68} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.5} />
    </Scene>
    <Scene from={4.6} to={7.1} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.6} />
    </Scene>
    <Scene from={7.02} to={9.38} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={7.02} />
    </Scene>
    <Scene from={9.3} to={11.72} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.3} />
    </Scene>
    <Scene from={11.64} to={16.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.5, 1600],
        [2.5, 4.6, 1600],
        [4.6, 7.02, 1600],
        [7.02, 9.3, 1600],
        [9.3, 11.64, 1600],
      ]}
    />
  </AbsoluteFill>
);
