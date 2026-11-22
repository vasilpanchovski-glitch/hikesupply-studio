// V210: "Her feet were damp before the hike." Short format (15.9 s, 38 words), cinematic C01 style, winter trailhead.
// Product: Merino Wool Hiking Socks — 80% Merino, Cushioned Crew, $19.99 (live Shopify). End card: the real store photo, cut out (as V192).
// Advice (simple, safe): socks worn for a long warm drive get sweaty; damp feet chill fast at a cold trailhead; pull on a fresh,
// dry pair of wool socks at the trailhead. No numbers beyond the two-hour drive in the story, no medical claims.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { SNOW2, WGOLD, WINTER, WinterBackdrop, FrostTrail } from "../winter";
import { SnowCar } from "../icy";
import vo from "../vo/v210.json";

const words = vo.words as unknown as Word[];

const WOOL = "#8e8b86"; // grey merino, like the real pair on the store photo
const WOOL2 = "#5d5b58";
const OLD = "#3f6f8f"; // the socks she drove in
const OLD2 = "#2f566f";

const MIA: Outfit = {
  ...JAKE,
  skin: "#E6B08E",
  skinShade: "#C8916F",
  hair: "#5a3a24",
  ponytail: "#5a3a24",
  beard: null,
  cap: "#C8476A",
  capShade: "#A23552",
  jacket: "#2F7F86",
  jacketShade: "#235f64",
  pants: "#3E4650",
  pantsShade: "#2E353D",
  boot: "#6B4630",
  sole: "#2A2421",
  pack: "#E3B23C",
  packShade: "#c0952c",
  glove: "#C8476A",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Close-up lower leg in a hiking boot, side view, facing right (screen coords). damp 0..1 darkens the sock,
// sweat 0..1 shows drops, cold 0..1 = blue chill at the toes.
const Leg: React.FC<{ damp?: number; sweat?: number; cold?: number; t: number }> = ({ damp = 0, sweat = 0, cold = 0, t }) => (
  <g>
    <rect x={380} y={-200} width={300} height={1110} rx={40} fill={MIA.pants} />
    <rect x={370} y={880} width={320} height={70} rx={20} fill={MIA.pantsShade} />
    <rect x={404} y={940} width={252} height={260} fill={OLD} />
    <rect x={400} y={940} width={260} height={34} rx={10} fill={OLD2} />
    {Array.from({ length: 6 }, (_, i) => (
      <line key={i} x1={430 + i * 40} y1={985} x2={430 + i * 40} y2={1180} stroke={OLD2} strokeWidth={5} opacity={0.5} />
    ))}
    {damp > 0 && <rect x={404} y={mix(1180, 980, damp)} width={252} height={mix(0, 200, damp)} fill="#1d3442" opacity={0.5} />}
    <path d="M360,1180 L700,1180 L720,1480 Q900,1500 990,1570 Q1040,1620 1030,1700 L300,1700 Q280,1580 330,1470 Z" fill={MIA.boot} />
    <path d="M360,1180 L700,1180 L700,1230 L360,1230 Z" fill="#8a5f42" />
    {[1290, 1360, 1430].map((yy) => (
      <path key={yy} d={`M420,${yy} l200,-14`} stroke="#d9c49a" strokeWidth={10} strokeLinecap="round" />
    ))}
    <path d="M300,1640 L1035,1640 L1032,1700 L300,1700 Z" fill="#4a3222" />
    <rect x={290} y={1690} width={760} height={44} rx={14} fill={MIA.sole} />
    {sweat > 0 &&
      [0, 1, 2, 3].map((i) => {
        const k = (t * 1.1 + i / 4) % 1;
        return <path key={i} d="M0,-18 Q14,4 0,16 Q-14,4 0,-18 Z" fill="#cfe9f7" stroke="#8fbcd4" strokeWidth={3} transform={`translate(${440 + i * 60},${980 + k * 160}) scale(1.6)`} opacity={sweat * (1 - k)} />;
      })}
    {cold > 0 && (
      <g opacity={cold}>
        <circle cx={880} cy={1600} r={110 * (1 + 0.12 * Math.sin(t * 7))} fill="#7fc4ff" opacity={0.3} />
        <circle cx={880} cy={1600} r={55 * (1 + 0.12 * Math.sin(t * 7))} fill="#bfe4ff" opacity={0.55} />
      </g>
    )}
  </g>
);

// ============ S1 HOOK WIDE: two hours on a snowy road, heater on (0 - 2.3) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + t * 30, y: hh.y, zoom: mix(1.03, 1.08, t / 2.3), rot: hh.rot };
  const g = 1460;
  const cx = 360 + t * 120;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 240} t={t} snow={1} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} col="255,248,230" />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <g transform={`translate(0,${Math.sin(t * 18) * 2})`}>
            <Car x={cx} y={g + 120} s={2.6} body="#2f5a7a" shade="#234560" lights />
          </g>
          {/* warm glow in the cabin */}
          <path d={`M${cx - 30 * 2.6},${g + 120 - 112 * 2.6} L${cx + 48 * 2.6},${g + 120 - 112 * 2.6} L${cx + 76 * 2.6},${g + 120 - 82 * 2.6} L${cx - 58 * 2.6},${g + 120 - 82 * 2.6} Z`} fill="#ffb56b" opacity={0.35} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Particles seed={2101} n={12} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="252,244,232" cool="40,60,90" />
      <Title text={"Her feet\nwere damp\nbefore the hike."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: in the warm footwell, hiking socks already on, feet start to sweat (2.3 - 5.75) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y - 40, zoom: mix(1.0, 1.07, lt / 3.45), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a2622" }}>
      <Plane cam={cam} depth={0.9} blur={10}>
        <Svg>
          <rect x={-300} y={-300} width={1700} height={2600} fill="#3a332c" />
          <path d="M-300,500 L1400,380 L1400,700 L-300,780 Z" fill="#26221e" />
          {/* heater vent with warm air */}
          <rect x={60} y={560} width={260} height={90} rx={20} fill="#1a1816" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={80} y={572 + i * 18} width={220} height={8} rx={4} fill="#3b3631" />
          ))}
        </Svg>
      </Plane>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 20% 40%, rgba(255,150,70,${0.35 + 0.05 * Math.sin(t * 3)}) 0%, rgba(255,150,70,0) 55%)` }} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,190,130,0.8)">
          <rect x={-300} y={1700} width={1700} height={600} fill="#1f1c19" />
          <Leg damp={at(t, [4.6, 5.5], [0, 1])} sweat={at(t, [4.5, 4.9], [0, 1])} t={t} />
          {[0, 1, 2].map((i) => {
            const k = (t * 0.6 + i / 3) % 1;
            return <path key={i} d={`M${200 + i * 60},${900 - k * 300} q30,-40 0,-80 q-30,-40 0,-80`} stroke="#ffcf9c" strokeWidth={8} fill="none" opacity={0.5 * (1 - k)} strokeLinecap="round" />;
          })}
        </Subject>
      </Plane>
      <Grade sunX={200} sunY={600} warm="255,200,150" cool="40,40,60" vignette={0.6} />
      <Chip text="Hiking socks on for the drive" t={t} t0={2.4} x={60} y={200} icon="x" big />
      <Chip text="Sweaty feet" t={t} t0={4.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: the cold trailhead, Mia shivers by the car (5.75 - 7.84) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.12, lt / 2.09), rot: hh.rot };
  const g = 1500;
  const shiver = Math.sin(t * 40) * 3 * at(t, [6.6, 6.9], [0, 1]);
  const p: HikerProps = { x: 400 + shiver, y: g, scale: 2.5, walk: 0, lean: 0.14, poles: false, handOverride: [34, -30], breathe: Math.sin(t * 3) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={1100} t={t} snow={1} blur={4} />
      <Plane cam={cam} depth={0.92} blur={2.5}>
        <Svg>
          <rect x={-400} y={g - 60} width={1900} height={900} fill={SNOW2} />
          <SnowCar x={820} y={g - 20} s={2.2} body="#2f5a7a" shade="#234560" open={1} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 20} snow={1} />
        <Subject rimX={5} col="rgba(236,242,250,0.85)">
          <Person {...p} outfit={MIA} expression="tired" noPack />
          <Breath p={p} t={t} />
          <circle cx={430} cy={g - 10} r={90 * (1 + 0.12 * Math.sin(t * 7))} fill="#7fc4ff" opacity={0.3 * at(t, [6.6, 7.0], [0, 1])} />
        </Subject>
      </Plane>
      <Particles seed={2103} n={14} col="#ffffff" fall={12} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="236,238,242" cool="30,45,90" vignette={0.55} />
      <Chip text="Cold trailhead" t={t} t0={5.8} x={60} y={200} icon="x" big />
      <Chip text="Damp feet chill fast" t={t} t0={6.7} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// Close-up: a bare foot resting on the car's door sill, a fresh grey wool sock pulled on from the toes up (screen coords).
const SockOn: React.FC<{ k: number; t: number }> = ({ k, t }) => {
  // sock covers from the toes (right) back over the heel and up the ankle as k goes 0..1
  const cover = mix(1060, 360, Math.min(1, k * 1.4));
  const cuffY = k < 0.55 ? 1700 : mix(1500, 1000, (k - 0.55) / 0.45);
  return (
    <g>
      <defs>
        <clipPath id="sockclip">
          <path d={`M${cover},900 L1200,900 L1200,1900 L${cover},1900 Z M300,${cuffY} L${cover},${cuffY} L${cover},1900 L300,1900 Z`} />
        </clipPath>
      </defs>
      {/* car sill and the snowy lot */}
      <rect x={-300} y={1640} width={1700} height={700} fill={SNOW2} />
      <rect x={-300} y={1610} width={1700} height={60} fill="#234560" />
      {/* lower leg (rolled pants) and bare foot */}
      <rect x={380} y={-200} width={300} height={1000} rx={40} fill={MIA.pants} />
      <rect x={370} y={760} width={320} height={80} rx={24} fill={MIA.pantsShade} />
      <path d="M410,830 L650,830 L660,1400 Q860,1430 980,1500 Q1050,1560 1020,1610 L360,1610 Q330,1500 400,1400 Z" fill={MIA.skin} />
      <path d="M660,1400 Q860,1430 980,1500" stroke={MIA.skinShade} strokeWidth={8} fill="none" />
      {/* the wool sock */}
      <g clipPath="url(#sockclip)">
        <path d="M400,980 L660,980 L672,1400 Q870,1426 990,1500 Q1062,1560 1030,1618 L352,1618 Q322,1500 392,1400 Z" fill={WOOL} />
        <rect x={396} y={980} width={268} height={50} rx={12} fill={WOOL2} />
        {Array.from({ length: 6 }, (_, i) => (
          <line key={i} x1={426 + i * 42} y1={1040} x2={426 + i * 42} y2={1380} stroke={WOOL2} strokeWidth={5} opacity={0.5} />
        ))}
        <path d="M830,1440 Q960,1470 1030,1610 L830,1610 Z" fill={WOOL2} opacity={0.6} />
        <path d="M352,1520 Q380,1430 470,1420 L470,1618 L352,1618 Z" fill={WOOL2} opacity={0.6} />
      </g>
      {/* two hands pulling the cuff */}
      {k < 0.98 && (
        <g transform={`translate(0,${Math.min(cuffY, 1500) - 1000})`}>
          <path d="M300,990 L80,640" stroke={MIA.jacket} strokeWidth={120} strokeLinecap="round" />
          <path d="M760,990 L980,640" stroke={MIA.jacket} strokeWidth={120} strokeLinecap="round" />
          <path d="M300,990 L250,910" stroke={MIA.jacketShade} strokeWidth={124} />
          <path d="M760,990 L810,910" stroke={MIA.jacketShade} strokeWidth={124} />
          <ellipse cx={360} cy={1010} rx={70} ry={50} fill={MIA.skin} />
          <ellipse cx={700} cy={1010} rx={70} ry={50} fill={MIA.skin} />
        </g>
      )}
      <g opacity={at(k, [0.9, 1], [0, 1])}>
        <circle cx={760} cy={1460} r={150 * (1 + 0.06 * Math.sin(t * 4))} fill="#ffb15e" opacity={0.2} />
        <circle cx={760} cy={1460} r={70} fill="#ffd9a0" opacity={0.25} />
      </g>
    </g>
  );
};

// ============ S4 CLOSE-UP: the rule. Fresh, dry wool socks go on at the trailhead (7.84 - 11.4) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y - 60, zoom: mix(1.0, 1.06, lt / 3.56), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="d" treeY={1100} blur={14} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <g transform="translate(0,-330)">
            <rect x={-300} y={1640} width={1700} height={1200} fill={SNOW2} />
            <SockOn k={at(t, [8.4, 9.9], [0, 1], (x) => x * x * (3 - 2 * x))} t={t} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2e2618" side="right" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 200} strength={0.4} col="255,236,200" />
      <Particles seed={2104} n={16} col="#fff3d6" fall={6} bokeh />
      <Grade sunX={760} sunY={500} warm="255,226,180" vignette={0.5} />
      <Chip text="The rule" t={t} t0={8.0} x={60} y={170} icon="none" big />
      <Chip text="Fresh, dry wool socks" t={t} t0={9.0} x={60} y={300} icon="check" big />
      <Chip text="Put on at the trailhead" t={t} t0={10.1} x={60} y={430} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/merino-wool-hiking-socks-2026-cut.png"
      cutoutH={760}
      spec="80% MERINO · CUSHIONED CREW"
      name={
        <>
          Merino Wool
          <br />
          Hiking Socks
        </>
      }
      nameSize={96}
      price="$19.99"
      save="Save this for winter"
    />
  );
};

export const V210: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.38} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.3} to={5.83} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.3} />
    </Scene>
    <Scene from={5.75} to={7.92} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.75} />
    </Scene>
    <Scene from={7.84} to={11.48} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={7.84} />
    </Scene>
    <Scene from={11.4} to={15.9} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.3, 1600],
        [2.3, 5.75, 1600],
        [5.75, 7.84, 1600],
        [7.84, 11.4, 1600],
      ]}
    />
  </AbsoluteFill>
);
