// V194: "The gate locked at sunset." Short format (16.4 s, 43 words), cinematic C01 style, a December trailhead at dusk.
// Product: Hiking Trip Planner, $5.99 (live Shopify). End card = boxed planner photo (as in V174).
// Advice (simple, true): many parks and parking areas close their gates at sunset, which is early in December;
// check the closing time before you start. No times or numbers shown.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { DAWN, WinterBackdrop, FrostTrail } from "../winter";
import vo from "../vo/v194.json";

const words = vo.words as unknown as Word[];

const DUSK: Sky = { top: "#26304f", mid: "#a8677a", low: "#f0a56e", sun: [820, 1080], sunR: 54, sunCol: "#fff0d0", glow: "#ff9a5c" };

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const JEN: Outfit = {
  ...JAKE,
  skin: "#8D5A3E",
  skinShade: "#714630",
  hair: "#1d1512",
  beard: null,
  cap: "#D9A33A",
  capShade: "#b0832c",
  jacket: "#3F6F5C",
  jacketShade: "#305646",
  pants: "#3b3a44",
  pantsShade: "#2a2930",
  pack: "#8b4a3a",
  packShade: "#6e3a2d",
  glove: "#2a2a2a",
};

const GATE = "#d9b23a";
const GATE2 = "#a8862a";

// Gravel lot / road surface.
const Lot: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y} L1480,${y} L1480,2600 L-400,2600 Z`} fill="#8c8478" />
    <path d={`M-400,${y} L1480,${y} L1480,${y + 30} L-400,${y + 30} Z`} fill="#a19887" />
    {Array.from({ length: 30 }, (_, i) => (
      <circle key={i} cx={(i * 137) % 1500 - 200} cy={y + 50 + ((i * 89) % 420)} r={4 + (i % 3) * 2} fill="#6f685e" opacity={0.6} />
    ))}
  </Svg>
);

// Swing gate: posts at x0 and x1, ground y, bar height h. Padlock and chain at the latch post (x1).
const Gate: React.FC<{ x0: number; x1: number; y: number; h: number; s?: number }> = ({ x0, x1, y, h, s = 1 }) => {
  const by = y - h;
  return (
    <g>
      <rect x={x0 - 22 * s} y={by - 60 * s} width={44 * s} height={h + 60 * s} fill="#4a4038" />
      <rect x={x1 - 22 * s} y={by - 60 * s} width={44 * s} height={h + 60 * s} fill="#4a4038" />
      <rect x={x0} y={by - 14 * s} width={x1 - x0} height={28 * s} rx={14 * s} fill={GATE} />
      <rect x={x0} y={by + 70 * s} width={x1 - x0} height={20 * s} rx={10 * s} fill={GATE} />
      <path d={`M${x0 + 20},${by + 80 * s} L${x0 + (x1 - x0) * 0.45},${by}`} stroke={GATE2} strokeWidth={16 * s} />
      <path d={`M${x0 + (x1 - x0) * 0.45},${by + 80 * s} L${x1 - 20},${by}`} stroke={GATE2} strokeWidth={16 * s} />
      {/* chain + padlock */}
      <path d={`M${x1 - 40 * s},${by} q20,40 40,0`} stroke="#9aa1a6" strokeWidth={8 * s} fill="none" />
      <rect x={x1 - 52 * s} y={by + 26 * s} width={44 * s} height={36 * s} rx={6 * s} fill="#c9a43a" />
      <path d={`M${x1 - 44 * s},${by + 28 * s} q14,-30 28,0`} stroke="#9aa1a6" strokeWidth={7 * s} fill="none" />
    </g>
  );
};

// Brown park sign on two legs; lines of text.
const Board: React.FC<{ x: number; y: number; w: number; lines: string[]; size: number; o?: number }> = ({ x, y, w, lines, size, o = 1 }) => {
  const h = lines.length * size * 1.35 + size * 1.1;
  return (
    <g opacity={o}>
      <rect x={x + w * 0.12} y={y} width={w * 0.07} height={h + w * 0.6} fill="#4a3a2c" />
      <rect x={x + w * 0.81} y={y} width={w * 0.07} height={h + w * 0.6} fill="#4a3a2c" />
      <rect x={x} y={y} width={w} height={h} rx={w * 0.03} fill="#6b4a2f" />
      <rect x={x + w * 0.03} y={y + w * 0.03} width={w * 0.94} height={h - w * 0.06} rx={w * 0.02} fill="none" stroke="#e8dcc0" strokeWidth={Math.max(3, w * 0.008)} />
      {lines.map((l, i) => (
        <text key={i} x={x + w / 2} y={y + size * 1.3 + i * size * 1.35} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={700} fontSize={size} fill="#f3ead6" letterSpacing={2}>
          {l}
        </text>
      ))}
    </g>
  );
};

// ============ S1 HOOK WIDE: Jen walks back down the trail at dusk (0 - 2.5) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 2.5), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.2;
  const p: HikerProps = { x: 380 + t * 60, y: g + 30, scale: 2.4, phase: ph, walk: 0.75, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSK} uid="a" treeY={g - 200} t={t} snow={0.3} mid="#6d6a80" />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.3} />
        <Subject rimX={6} col="rgba(255,190,140,0.9)">
          <Person {...p} outfit={JEN} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e2230" side="right" />
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.3} col="255,180,130" />
      <Particles seed={1941} n={14} col="#ffd9b0" bokeh fall={4} />
      <LowScrim />
      <Grade sunX={820} sunY={1080} warm="255,170,120" cool="40,40,90" vignette={0.5} />
      <Title text={"The gate\nlocked at\nsunset."} t={t} t0={0} top={110} size={135} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM-WIDE: her car behind the locked gate (2.5 - 4.69) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4, at(lt, [1.15, 1.4], [0.8, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 2.2), rot: hh.rot };
  const g = 1460;
  const walk = at(t, [2.5, 3.4], [0.7, 0]);
  const ph = t * 3;
  const p: HikerProps = { x: mix(120, 230, at(t, [2.5, 3.4], [0, 1])), y: g + 220, scale: 2.4, phase: ph, walk, lean: 0.05, poles: false, handOverride: walk > 0.1 ? freeHand(ph, 0.5) : [40, 40] };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSK} uid="b" treeY={g - 120} t={t} snow={0.3} mid="#6d6a80" blur={2} />
      <Plane cam={cam} depth={1}>
        <Lot y={g} />
        <Svg>
          <Car x={760} y={g + 40} s={1.9} body="#7d2f35" shade="#5c2227" />
          <Gate x0={380} x1={1060} y={g + 190} h={300} />
        </Svg>
        <Subject rimX={6} col="rgba(255,190,140,0.9)">
          <Person {...p} outfit={JEN} expression={t > 3.3 ? "tired" : "neutral"} />
        </Subject>
      </Plane>
      <Particles seed={1942} n={12} col="#ffd9b0" bokeh fall={4} />
      <LowScrim />
      <Grade sunX={820} sunY={1080} warm="255,170,120" cool="40,40,90" vignette={0.55} />
      <Chip text="Car inside the gate" t={t} t0={3.0} x={60} y={200} icon="x" big />
      <Chip text="Locked" t={t} t0={4.06} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: chain and padlock on the gate bar (4.69 - 6.7) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.0), rot: hh.rot };
  const swing = Math.sin(t * 2.2) * 4 * at(lt, [0, 1.5], [1, 0.3]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSK} uid="c" treeY={1300} t={t} snow={0.3} mid="#6d6a80" blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,190,140,0.9)">
          {/* post */}
          <rect x={700} y={300} width={200} height={1800} fill="#4a4038" />
          <rect x={700} y={300} width={50} height={1800} fill="#5e5247" />
          {/* gate bar */}
          <rect x={-200} y={700} width={960} height={110} rx={55} fill={GATE} />
          <rect x={-200} y={700} width={960} height={30} rx={15} fill="#efcd60" />
          <rect x={-200} y={1080} width={960} height={70} rx={35} fill={GATE} />
          <path d="M0,1110 L420,760" stroke={GATE2} strokeWidth={50} />
          {/* chain wrapping bar and post */}
          {Array.from({ length: 7 }, (_, i) => (
            <ellipse key={i} cx={620 + i * 34} cy={760 + Math.sin(i * 0.9) * 26} rx={26} ry={16} fill="none" stroke="#a7aeb3" strokeWidth={12} transform={`rotate(${i % 2 ? 60 : -20} ${620 + i * 34} ${760 + Math.sin(i * 0.9) * 26})`} />
          ))}
          {/* padlock hanging */}
          <g transform={`rotate(${swing} 680 830)`}>
            <path d="M620,900 L620,860 Q680,780 740,860 L740,900" stroke="#b9c0c4" strokeWidth={22} fill="none" />
            <rect x={580} y={890} width={200} height={170} rx={22} fill="#c9a43a" />
            <rect x={580} y={890} width={200} height={40} rx={18} fill="#e0bf55" />
            <circle cx={680} cy={970} r={18} fill="#4a3a1a" />
            <rect x={673} y={975} width={14} height={40} rx={4} fill="#4a3a1a" />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1943} n={12} col="#ffd9b0" bokeh fall={4} />
      <LowScrim />
      <Grade sunX={820} sunY={1080} warm="255,170,120" cool="40,40,90" vignette={0.6} />
      <Chip text="Parks close at sunset" t={t} t0={6.39} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the gate sign as the sun drops behind the ridge (6.7 - 9.28) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.6), rot: hh.rot };
  const sunY = mix(1080, 1260, lt / 2.6);
  const sky: Sky = { ...DUSK, sun: [760, sunY] };
  const dark = at(lt, [0, 2.6], [0, 0.35]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={sky} uid="d" treeY={1380} t={t} snow={0.3} mid="#6d6a80" blur={7} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,190,140,0.9)">
          <Board x={130} y={560} w={820} lines={["GATE CLOSES", "AT SUNSET"]} size={150} />
        </Subject>
      </Plane>
      <AbsoluteFill style={{ background: `rgba(20,20,50,${dark})` }} />
      <Particles seed={1944} n={12} col="#ffd9b0" bokeh fall={4} />
      <LowScrim />
      <Grade sunX={760} sunY={sunY} warm="255,170,120" cool="40,40,90" vignette={0.6} />
      <Chip text="December: sunset comes early" t={t} t0={7.7} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: next morning at the trailhead board, she reads the hours first (9.28 - 12.26) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: at(lt, [0, 1.0], [1.1, 1.02], outExpo), rot: hh.rot };
  const g = 1480;
  const walk = at(t, [11.4, 11.8], [0, 0.7]);
  const ph = t * 3;
  const p: HikerProps = { x: 720 + Math.max(0, t - 11.4) * 120, y: g + 140, scale: 2.4, phase: ph, walk, lean: 0.04, poles: false, handOverride: walk > 0.1 ? freeHand(ph, 0.5) : [40, 40] };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="e" treeY={g - 160} t={t} snow={0.3} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.3} />
        <Svg>
          <Board x={70} y={g - 560} w={480} lines={["TRAILHEAD", "OPEN SUNRISE", "TO SUNSET"]} size={78} />
        </Svg>
        <Subject rimX={-6} col="rgba(255,226,190,0.9)">
          <Person {...p} outfit={JEN} expression="happy" flip={t < 11.4} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a40" side="right" />
      </Plane>
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.35} col="255,220,180" />
      <Particles seed={1945} n={16} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={300} sunY={760} warm="255,214,170" cool="40,60,90" />
      <Chip text="The rule" t={t} t0={9.35} x={60} y={200} icon="none" big />
      <Chip text="Check the closing time" t={t} t0={9.83} x={60} y={330} icon="check" big />
      <Chip text="Before you start" t={t} t0={10.88} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-trip-planner-card.jpg"
      photoH={760}
      spec="DIGITAL DOWNLOAD · PRINTABLE PLANNER"
      name={
        <>
          Hiking Trip
          <br />
          Planner
        </>
      }
      nameSize={100}
      price="$5.99"
      save="Save this before your next hike"
    />
  );
};

export const V194: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.58} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.5} to={4.77} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.5} />
    </Scene>
    <Scene from={4.69} to={6.78} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.69} />
    </Scene>
    <Scene from={6.7} to={9.36} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={6.7} />
    </Scene>
    <Scene from={9.28} to={12.26} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.28} />
    </Scene>
    <Scene from={12.16} to={16.4} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.5, 1600],
        [2.5, 4.69, 1600],
        [4.69, 6.7, 1600],
        [6.7, 9.28, 1600],
        [9.28, 12.16, 1600],
      ]}
    />
  </AbsoluteFill>
);
