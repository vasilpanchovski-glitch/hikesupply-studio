// V193: "Can't see the next marker?" Short format (16.0 s, 44 words), cinematic C01 style, snow starting on a ridge.
// Product: What To Do If You Get Lost, $5.99 (live Shopify). End card = boxed store photo (as in V110).
// Advice (conservative): if you can't see the next trail marker, stop and go back to the last one you saw, then decide.
// No numbers, no claims.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, WINTER, STORM, WinterBackdrop, Blizzard } from "../winter";
import vo from "../vo/v193.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const BLAZE = "#e8b320";

const CLAIRE: Outfit = {
  ...JAKE,
  skin: "#E2B08E",
  skinShade: "#C69072",
  hair: "#6b3a22",
  beard: null,
  cap: "#3E6E5A",
  capShade: "#2f5646",
  jacket: "#B8452F",
  jacketShade: "#933624",
  pants: "#3a3f4a",
  pantsShade: "#2a2e36",
  pack: "#5b6b7a",
  packShade: "#46535f",
  glove: "#2a2a2a",
};

const SnowGround: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y} Q540,${y - 30} 1480,${y} L1480,2600 L-400,2600 Z`} fill={SNOW} />
    <path d={`M-400,${y + 160} Q540,${y + 130} 1480,${y + 160} L1480,2600 L-400,2600 Z`} fill={SNOW2} opacity={0.6} />
    {Array.from({ length: 12 }, (_, i) => (
      <ellipse key={i} cx={-300 + i * 150} cy={y + 60 + ((i * 71) % 260)} rx={60} ry={8} fill="#cfd9df" opacity={0.6} />
    ))}
  </Svg>
);

const Prints: React.FC<{ x0: number; y0: number; x1: number; y1: number; n: number; s?: number; k?: number }> = ({ x0, y0, x1, y1, n, s = 1, k = 1 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const u = i / (n - 1);
      if (u > k) return null;
      const side = i % 2 ? 1 : -1;
      const ss = s * mix(0.6, 1.2, u);
      return <ellipse key={i} cx={mix(x0, x1, u) + side * 14 * ss} cy={mix(y0, y1, u)} rx={16 * ss} ry={7 * ss} fill="#b3c2cc" />;
    })}
  </g>
);

// Tree trunk with optional yellow paint blaze; snow = 0..1 how much snow is plastered on the windward side.
const Trunk: React.FC<{ x: number; y: number; h: number; w?: number; blaze?: number; snow?: number; o?: number }> = ({ x, y, h, w = 70, blaze = 0, snow = 0, o = 1 }) => (
  <g opacity={o}>
    <rect x={x - w / 2} y={y - h} width={w} height={h} fill="#5a4636" />
    <rect x={x - w / 2} y={y - h} width={w * 0.3} height={h} fill="#6e5643" />
    {snow > 0 && <rect x={x + w * 0.18} y={y - h} width={w * 0.32} height={h} fill={SNOW} opacity={0.8 * snow} />}
    {blaze > 0 && <rect x={x - w * 0.18} y={y - h * 0.62} width={w * 0.36} height={w * 0.7} rx={3} fill={BLAZE} opacity={blaze} />}
  </g>
);

const Breath: React.FC<{ p: HikerProps; t: number; flip?: boolean }> = ({ p, t, flip }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const k = (t * 0.5) % 1;
  return (
    <g transform={hikerTransform(p)}>
      <circle cx={hx + (flip ? -1 : 1) * (55 + k * 70)} cy={hy + 10 - k * 24} r={8 + k * 22} fill="#ffffff" opacity={0.35 * (1 - k)} />
    </g>
  );
};

// Fog wall that thickens with k.
const Fog: React.FC<{ k: number }> = ({ k }) => (
  <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(225,232,238,${0.15 + 0.5 * k}) 0%, rgba(225,232,238,${0.25 + 0.45 * k}) 55%, rgba(225,232,238,0) 85%)` }} />
);

// ============ S1 HOOK WIDE: snow starts on the ridge, Claire passes a blazed tree and walks on (0 - 3.0) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 3.0), rot: hh.rot };
  const g = 1460;
  const ph = t * 3;
  const p: HikerProps = { x: 420 + t * 50, y: g + 120, scale: 2.3, phase: ph, walk: 0.7, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Svg>
          <Prints x0={60} y0={g + 150} x1={400} y1={g + 125} n={8} s={1.0} />
          <Trunk x={150} y={g + 40} h={760} w={80} blaze={1} />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={CLAIRE} expression="neutral" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={at(t, [0, 3], [0.26, 0.1])} col="255,246,220" />
      <Particles seed={1931} n={20} col="#ffffff" fall={30} />
      <Fog k={at(t, [0, 3], [0, 0.35])} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Title text={"Can't see\nthe next\nmarker?"} t={t} t0={0} top={110} size={135} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: snow thickens, Claire walks on, sure the next marker is close (3.0 - 4.6) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.6), rot: hh.rot };
  const g = 1500;
  const ph = t * 3;
  const p: HikerProps = { x: 330 + lt * 60, y: g + 150, scale: 3.0, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={g - 80} t={t} blur={4} />
      <Fog k={0.6} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Svg>
          <Trunk x={900} y={g + 20} h={820} w={70} snow={1} o={0.45} />
          <Trunk x={1060} y={g + 10} h={760} w={60} snow={1} o={0.35} />
        </Svg>
        <Subject rimX={5} col="rgba(220,230,255,0.8)">
          <Person {...p} outfit={CLAIRE} expression="neutral" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Blizzard seed={1932} n={30} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="230,235,245" cool="40,60,90" vignette={0.55} />
      <Chip text="Next marker must be close" t={t} t0={3.35} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the tree ahead, plastered with snow: no marker (4.6 - 5.45) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 0.85), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={1250} t={t} blur={12} />
      <Fog k={0.8} />
      <Plane cam={cam} depth={0.7} blur={6}>
        <Svg>
          <Trunk x={160} y={2000} h={2200} w={120} snow={1} o={0.4} />
          <Trunk x={880} y={2000} h={2200} w={100} snow={1} o={0.3} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(230,235,255,0.7)">
          <Svg>
            <rect x={370} y={-200} width={340} height={2400} fill="#5a4636" />
            <rect x={370} y={-200} width={100} height={2400} fill="#6e5643" />
            {Array.from({ length: 9 }, (_, i) => (
              <path key={i} d={`M${400 + (i % 3) * 90},${-100 + i * 260} q20,90 0,180`} stroke="#43342a" strokeWidth={8} fill="none" />
            ))}
            <path d="M610,-200 L710,-200 L710,2200 L590,2200 Q640,1600 600,1000 Q650,400 610,-200 Z" fill={SNOW} opacity={0.92} />
          </Svg>
        </Subject>
      </Plane>
      <Blizzard seed={1933} n={26} />
      <Grade sunX={820} sunY={520} warm="230,235,245" cool="40,60,90" vignette={0.6} />
      <Chip text="No marker" t={t} t0={4.7} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: Claire's face, she stops (5.45 - 8.4) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.95), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 520, y: 1700 + 182 * s - 80, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 1.4) * 1.6 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={1250} t={t} blur={9} />
      <Fog k={0.5} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(220,230,255,0.85)">
          <Person {...p} outfit={CLAIRE} expression="neutral" />
          <Breath p={p} t={t * 0.6} />
        </Subject>
      </Plane>
      <Particles seed={1934} n={22} col="#ffffff" fall={40} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="230,235,245" cool="40,60,90" vignette={0.6} />
      <Chip text="The rule" t={t} t0={5.55} x={60} y={200} icon="none" big />
      <Chip text="Can't see the next one?" t={t} t0={6.3} x={60} y={330} icon="none" big />
      <Chip text="Stop" t={t} t0={7.93} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: back along her own tracks to the last blaze, then decide (8.4 - 11.66) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 16, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.26), rot: hh.rot };
  const g = 1480;
  const walk = at(t, [9.6, 10.4], [0.7, 0]);
  const ph = t * 3;
  const p: HikerProps = { x: mix(940, 600, at(t, [8.4, 10.4], [0, 1])), y: g + 100, scale: 2.4, phase: ph, walk, lean: 0.06, poles: false, handOverride: walk > 0.1 ? freeHand(ph, 0.5) : [70, -30], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 80} t={t} blur={2} />
      <Fog k={0.3} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Svg>
          <Prints x0={1150} y0={g + 150} x1={640} y1={g + 110} n={10} s={1.1} />
          <Trunk x={330} y={g + 60} h={1100} w={110} blaze={at(t, [8.5, 8.9], [0.4, 1])} />
        </Svg>
        <Subject rimX={-6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={CLAIRE} expression={t > 10.3 ? "happy" : "neutral"} flip />
          <Breath p={p} t={t} flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} col="255,246,220" />
      <Particles seed={1935} n={20} col="#ffffff" fall={24} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Chip text="Go back to the last one" t={t} t0={8.42} x={60} y={200} icon="check" big />
      <Chip text="Then decide" t={t} t0={10.48} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/what-to-do-if-you-get-lost.jpg"
      photoH={720}
      spec="PRINTABLE GUIDE · INSTANT DOWNLOAD"
      name={
        <>
          What To Do If
          <br />
          You Get Lost
        </>
      }
      nameSize={96}
      price="$5.99"
      save="Save this before your next winter hike"
    />
  );
};

export const V193: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.08} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.0} to={4.68} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.0} />
    </Scene>
    <Scene from={4.6} to={5.53} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.6} />
    </Scene>
    <Scene from={5.45} to={8.48} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={5.45} />
    </Scene>
    <Scene from={8.4} to={11.66} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={8.4} />
    </Scene>
    <Scene from={11.56} to={16.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.0, 1600],
        [3.0, 5.45, 1600],
        [5.45, 8.4, 1600],
        [8.4, 11.56, 1600],
      ]}
    />
  </AbsoluteFill>
);
