// V206: "No shuttle to the giant sequoias." Short format (16.8 s, 44 words), cinematic C01 style, Yosemite in winter.
// Product: Yosemite National Park — Trip Planning Guide, $9.99 (live Shopify). End card = the real store cover (full-bleed photo,
// so the boxed photo card, not a cutout). Facts (NPS Yosemite, Mariposa Grove): in winter the Mariposa Grove Road is closed to
// cars and the shuttle does not run; visitors walk, snowshoe or ski about 2 miles (3.2 km) each way from the Welcome Plaza.
// The caption tells viewers to check nps.gov. Signs are generic (no NPS logo).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, WinterBackdrop } from "../winter";
import { BootClose } from "../icy";
import vo from "../vo/v206.json";

const words = vo.words as unknown as Word[];

// Clear, cold Sierra morning.
const SIERRA: Sky = { top: "#3a6a9c", mid: "#a8c4dc", low: "#f0ece2", sun: [780, 540], sunR: 46, sunCol: "#fffdf2", glow: "#f6e8cc" };
const BARK = "#9a4a2c";
const BARK2 = "#7a3820";
const BARK3 = "#b8603a";

const ANA: Outfit = {
  ...GUIDE,
  skin: "#C68B63",
  skinShade: "#A8714D",
  hair: "#1e1612",
  ponytail: "#1e1612",
  beard: null,
  cap: "#E3B23C",
  capShade: "#c0952c",
  jacket: "#2F5F8A",
  jacketShade: "#234868",
  pants: "#3d4148",
  pantsShade: "#2c2f35",
  boot: "#6B4630",
  sole: "#2A2421",
  pack: "#B5553A",
  packShade: "#8E3F2A",
  glove: "#2a2a2a",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// One giant sequoia trunk (screen coords): base centre x, ground y, width w, fluted red bark with snow on the flare.
const Sequoia: React.FC<{ x: number; y: number; w: number; top?: number }> = ({ x, y, w, top = -400 }) => (
  <g>
    <path d={`M${x - w * 0.42},${top} L${x + w * 0.42},${top} L${x + w * 0.5},${y - w * 0.4} Q${x + w * 0.62},${y - 30} ${x + w * 0.8},${y} L${x - w * 0.8},${y} Q${x - w * 0.62},${y - 30} ${x - w * 0.5},${y - w * 0.4} Z`} fill={BARK} />
    {Array.from({ length: 7 }, (_, i) => {
      const k = (i + 0.5) / 7 - 0.5;
      return <path key={i} d={`M${x + k * w * 0.8},${top} L${x + k * w * 1.05},${y - 10}`} stroke={i % 2 ? BARK2 : BARK3} strokeWidth={w * 0.04} opacity={0.8} />;
    })}
    <path d={`M${x - w * 0.42},${top} L${x - w * 0.5},${y - w * 0.4} Q${x - w * 0.62},${y - 30} ${x - w * 0.8},${y} L${x - w * 0.55},${y} Q${x - w * 0.42},${y - 40} ${x - w * 0.3},${top}`} fill={BARK2} opacity={0.6} />
    <path d={`M${x - w * 0.85},${y + 4} Q${x - w * 0.6},${y - 50} ${x - w * 0.3},${y - 20} Q${x},${y - 40} ${x + w * 0.3},${y - 22} Q${x + w * 0.6},${y - 50} ${x + w * 0.85},${y + 4} Z`} fill={SNOW} />
  </g>
);

const GroveFloor: React.FC<{ y: number; path?: boolean }> = ({ y, path = true }) => (
  <Svg>
    <rect x={-400} y={y - 20} width={1880} height={1400} fill={SNOW} />
    {path && <path d={`M440,${y - 20} L640,${y - 20} L1100,${y + 700} L-60,${y + 700} Z`} fill={SNOW2} />}
    {path &&
      Array.from({ length: 9 }, (_, i) => (
        <ellipse key={i} cx={520 + (i % 2 ? 40 : -40) + i * 10} cy={y + 60 + i * 70} rx={14 + i * 2} ry={6 + i} fill="#c4ced6" />
      ))}
  </Svg>
);

// Snowy road with a closed gate (generic sign).
const GateRoad: React.FC<{ y: number; gx?: number; s?: number; sub?: boolean }> = ({ y, gx = 720, s = 1, sub = true }) => (
  <Svg>
    <rect x={-400} y={y - 30} width={1880} height={1400} fill={SNOW} />
    <path d={`M200,${y - 30} L900,${y - 30} L1480,${y + 700} L-400,${y + 700} Z`} fill={SNOW2} />
    <g transform={`translate(${gx},${y + 60}) scale(${s})`}>
      <rect x={-260} y={-130} width={22} height={150} fill="#6a6a6a" />
      <rect x={238} y={-150} width={22} height={150} fill="#6a6a6a" />
      <rect x={-260} y={-130} width={520} height={26} rx={8} fill="#f4f4f4" />
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x={-240 + i * 104} y={-130} width={52} height={26} fill="#c23a32" />
      ))}
      <rect x={-8} y={-190} width={16} height={66} fill="#6a6a6a" />
      <rect x={sub ? -230 : -170} y={-330} width={sub ? 460 : 340} height={150} rx={10} fill="#c23a32" />
      <text x={0} y={-262} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={58} fill="#fff" letterSpacing={3}>
        ROAD CLOSED
      </text>
      {sub && (
        <text x={0} y={-208} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={36} fill="#fff" letterSpacing={2}>
          NO VEHICLES · NO SHUTTLE
        </text>
      )}
      <rect x={-260} y={-150} width={520} height={18} rx={8} fill={SNOW} />
    </g>
  </Svg>
);

// ============ S1 HOOK WIDE: Ana small among giant sequoias in snow (0 - 4.15) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y - t * 8, zoom: mix(1.03, 1.1, t / 4.15), rot: hh.rot };
  const g = 1560;
  const p: HikerProps = { x: 660, y: g + 30, scale: 1.1, walk: 0, lean: -0.08, poles: false, handOverride: [20, 40], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={SIERRA} uid="a" treeY={g - 300} t={t} snow={1} />
      <Plane cam={cam} depth={0.7} blur={2}>
        <Svg>
          <Sequoia x={830} y={g - 60} w={150} />
          <Sequoia x={130} y={g - 50} w={130} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <GroveFloor y={g} />
        <Svg>
          <Sequoia x={300} y={g + 20} w={330} top={-600} />
        </Svg>
        <Subject rimX={4} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={ANA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={SIERRA.sun[0]} y={SIERRA.sun[1]} strength={0.32} col="255,246,225" />
      <Particles seed={2061} n={16} col="#ffffff" fall={10} bokeh />
      <LowScrim />
      <Grade sunX={780} sunY={540} warm="255,240,220" cool="40,60,90" />
      <Title text={"No shuttle\nto the giant\nsequoias."} t={t} t0={0} top={110} size={128} />
      <Chip text="Yosemite, at Christmas" t={t} t0={1.0} x={60} y={600} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: Ana at the closed Mariposa Grove road (4.15 - 6.3) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.15), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 300, y: g + 270, scale: 2.4, walk: 0, lean: -0.04, poles: false, handOverride: [20, 40], breathe: Math.sin(t * 2) * 1.4 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={SIERRA} uid="b" treeY={g - 80} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <GateRoad y={g} gx={760} sub={false} />
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={ANA} expression="tired" />
        </Subject>
      </Plane>
      <Particles seed={2062} n={14} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={780} sunY={540} warm="250,242,232" cool="40,60,90" />
      <Chip text="Grove road: closed to cars" t={t} t0={4.3} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the sign, no shuttle in winter (6.3 - 8.61) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.3), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={SIERRA} uid="c" treeY={1150} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,244,225,0.8)">
          <GateRoad y={1260} gx={560} s={2.2} />
        </Subject>
      </Plane>
      <Particles seed={2063} n={14} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={780} sunY={540} warm="250,242,228" cool="40,60,90" vignette={0.55} />
      <Chip text="No shuttle in winter" t={t} t0={6.6} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 WIDE: the long walk up the snowy road to the grove (8.61 - 12.29) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.0, 1.08, lt / 3.68), rot: hh.rot };
  const g = 1300;
  const ph = t * 3;
  const p: HikerProps = { x: 560, y: g + 330 - lt * 40, scale: 1.25, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={SIERRA} uid="d" treeY={g - 200} t={t} snow={1} />
      <Plane cam={cam} depth={0.8} blur={1.5}>
        <Svg>
          <Sequoia x={980} y={g - 10} w={120} />
          <Sequoia x={90} y={g - 10} w={110} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <GroveFloor y={g} />
        <Subject rimX={4} col="rgba(255,240,210,0.8)">
          <Person {...p} outfit={ANA} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={SIERRA.sun[0]} y={SIERRA.sun[1]} strength={0.26} col="255,246,225" />
      <Particles seed={2064} n={16} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={780} sunY={540} warm="255,240,220" cool="40,60,90" />
      <Readout label="WALK, EACH WAY" value="2 mi" ok={null} t={t} t0={8.8} x={60} y={200} />
      <Chip text="3.2 km, often on snow" t={t} t0={9.6} x={60} y={420} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the rule, traction on the boot, early start (12.29 - 14.0) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.7), rot: hh.rot };
  const toe = at(t, [12.35, 12.8], [0, 1], outExpo);
  const heel = at(t, [12.8, 13.2], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={SIERRA} uid="e" treeY={1000} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={1290} width={1480} height={800} fill={SNOW} />
          <BootClose toe={toe} heel={heel} pants={ANA.pants} pantsShade={ANA.pantsShade} boot={ANA.boot} sole={ANA.sole} y={60} />
        </Svg>
      </Plane>
      <Particles seed={2065} n={12} col="#ffffff" fall={10} bokeh />
      <LowScrim />
      <Grade sunX={780} sunY={540} warm="255,240,220" cool="40,60,90" vignette={0.5} />
      <Chip text="The rule" t={t} t0={12.35} x={60} y={200} icon="none" big />
      <Chip text="Bring traction" t={t} t0={12.9} x={60} y={330} icon="check" big />
      <Chip text="Start early" t={t} t0={13.6} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/yosemite-national-park-trip-planning-guide.jpg"
      spec="30 PAGES · 16 DAY HIKES · WHEN TO GO"
      name={
        <>
          Yosemite
          <br />
          Trip Planning Guide
        </>
      }
      nameSize={80}
      price="$9.99"
      save="Save this for Yosemite"
    />
  );
};

export const V206: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.23} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.15} to={6.38} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.15} />
    </Scene>
    <Scene from={6.3} to={8.69} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={6.3} />
    </Scene>
    <Scene from={8.61} to={12.37} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={8.61} />
    </Scene>
    <Scene from={12.29} to={14.1} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={12.29} />
    </Scene>
    <Scene from={14.0} to={16.8} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.15, 1600],
        [4.15, 8.61, 1600],
        [8.61, 12.29, 1600],
        [12.29, 14.0, 1660],
      ]}
    />
  </AbsoluteFill>
);
