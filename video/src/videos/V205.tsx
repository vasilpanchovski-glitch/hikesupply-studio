// V205: "30°F on the app. Felt far colder." Short format (15.0 s, 43 words), cinematic C01 style.
// Product: Winter Ready Set — Headlamp, Neck Gaiter & Winter Hiking Guide, $29.99 (live Shopify). End card = the set's
// real studio cover from Shopify, cut out. Advice (conservative, standard): wind makes cold feel colder (wind chill), so check
// the forecast's feels-like temperature, not only the air temperature, and cover face and neck. No wind-chill number invented.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { Blizzard, FrostTrail, STORM, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v205.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const JESS: Outfit = {
  ...GUIDE,
  skin: "#F0C4A4",
  skinShade: "#D3A07F",
  hair: "#5a3a22",
  ponytail: "#5a3a22",
  beard: null,
  cap: "#2F7F86",
  capShade: "#235f64",
  jacket: "#C4572E",
  jacketShade: "#9a4322",
  pants: "#33373e",
  pantsShade: "#25282d",
  boot: "#5a3e2c",
  sole: "#231d19",
  pack: "#3E4F5C",
  packShade: "#2C3943",
  glove: "#2a2a2a",
};
const GAITER = "#2a2d31";
const GAITER2 = "#1b1d20";

// Phone with a simple, generic weather screen (screen coords, centre).
const WeatherPhone: React.FC<{ x: number; y: number; s: number; rot?: number }> = ({ x, y, s, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-120} y={-230} width={240} height={460} rx={34} fill="#1d2126" />
    <rect x={-106} y={-212} width={212} height={424} rx={22} fill="#7fa6c8" />
    <circle cx={44} cy={-120} r={34} fill="#fff4c8" />
    <path d="M-70,-90 q20,-36 56,-20 q30,-18 50,10 q26,4 20,26 l-126,0 q-14,-10 0,-16 Z" fill="#f4f6f8" />
    <text x={0} y={40} textAnchor="middle" fontFamily="Inter" fontWeight={300} fontSize={96} fill="#ffffff">30°</text>
    <rect x={-70} y={80} width={140} height={14} rx={7} fill="rgba(255,255,255,0.7)" />
    <rect x={-50} y={110} width={100} height={12} rx={6} fill="rgba(255,255,255,0.5)" />
  </g>
);

// Big close-up of Jess's face (screen coords). red = wind-red cheeks (0..1), gaiter = neck gaiter pulled up (0..1).
const FaceJess: React.FC<{ cx: number; cy: number; s: number; red: number; gaiter?: number; eyes?: "neutral" | "happy" | "tired" }> = ({ cx, cy, s, red, gaiter = 0, eyes = "neutral" }) => {
  const gTop = mix(150, 26, gaiter);
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      <path d="M-180,170 Q-120,110 -40,112 L70,112 Q160,112 200,180 L200,280 L-180,280 Z" fill={JESS.jacket} />
      <path d="M-40,112 L70,112 L60,170 L-30,170 Z" fill={JESS.jacketShade} />
      <rect x={-20} y={70} width={70} height={60} fill={JESS.skinShade} />
      {/* hair behind the face */}
      <path d="M-86,-60 Q-120,40 -96,140 L-40,140 Q-70,40 -60,-40 Z" fill={JESS.hair} />
      <ellipse cx={20} cy={4} rx={82} ry={92} fill={JESS.skin} />
      <ellipse cx={-32} cy={12} rx={16} ry={22} fill={JESS.skinShade} />
      {/* wind-red cheeks and nose tip */}
      <ellipse cx={0} cy={32} rx={30} ry={22} fill="#d9604c" opacity={0.15 + 0.4 * red} />
      <ellipse cx={74} cy={30} rx={18} ry={14} fill="#d9604c" opacity={0.1 + 0.35 * red} />
      <circle cx={52} cy={22} r={10} fill="#d9604c" opacity={0.3 * red} />
      {[0, 46].map((dx, i) => (
        <g key={i}>
          {eyes === "happy" ? (
            <path d={`M${2 + dx},-14 q9,-9 18,0`} stroke="#2a1f1a" strokeWidth={4.5} fill="none" strokeLinecap="round" />
          ) : (
            <ellipse cx={11 + dx} cy={-12} rx={6.5} ry={eyes === "tired" ? 4 : 8} fill="#2a1f1a" />
          )}
          <path d={`M${dx},-32 q11,${eyes === "tired" ? 4 : -5} 22,${eyes === "tired" ? 5 : 0}`} stroke="#3a2a1e" strokeWidth={4.5} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <path d="M44,0 q12,18 0,26" stroke={JESS.skinShade} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={eyes === "happy" ? "M20,56 q16,12 32,0" : eyes === "tired" ? "M22,60 q14,-6 28,0" : "M22,58 q14,2 28,0"} stroke="#5a2e22" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* beanie */}
      <path d="M-74,-50 Q-80,-150 20,-152 Q120,-150 112,-50 Z" fill={JESS.cap} />
      <rect x={-84} y={-66} width={206} height={40} rx={16} fill={JESS.capShade} />
      {[-60, -30, 0, 30, 60, 90].map((x) => (
        <line key={x} x1={x} y1={-62} x2={x} y2={-30} stroke={JESS.cap} strokeWidth={5} opacity={0.6} />
      ))}
      {/* neck gaiter */}
      <path d={`M-96,${gTop + 20} Q20,${gTop - 6} 112,${gTop} L118,150 Q20,170 -96,150 Z`} fill={GAITER} />
      <path d={`M-92,${gTop + 22} Q20,${gTop - 2} 110,${gTop + 4}`} stroke={GAITER2} strokeWidth={8} fill="none" />
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Jess at the trailhead checks the app, 30°F (0 - 3.2) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.1, t / 3.2), rot: hh.rot };
  const g = 1540;
  const p: HikerProps = { x: 420, y: g + 60, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [70, -10], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 220} t={t} snow={1} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} col="255,248,230" />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={JESS} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Particles seed={2051} n={14} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,244,232" cool="40,60,90" />
      <Title text={"30°F on the app.\nFelt far colder."} t={t} t0={0} top={110} size={120} />
      <Readout label="ON THE APP" value="30°F" ok={null} t={t} t0={0.9} x={600} y={620} />
    </AbsoluteFill>
  );
};

// ============ S1b CLOSE-UP: the phone in her gloved hand, face bare (3.2 - 4.9) ============
const S1b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 1.7), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1000} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <FaceJess cx={360} cy={760} s={2.6} red={0.1} eyes="neutral" />
          <WeatherPhone x={740} y={1150} s={1.5} rot={-8} />
          <path d="M600,1560 Q570,1470 640,1450 L860,1430 Q920,1480 880,1590 Z" fill="#2a2a2a" />
          <path d="M610,1580 L880,1600 L900,1760 L590,1760 Z" fill={JESS.jacket} />
        </Svg>
      </Plane>
      <Particles seed={2052} n={12} col="#ffffff" fall={10} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,244,232" cool="40,60,90" vignette={0.5} />
      <Chip text="Face left bare" t={t} t0={3.3} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: the wind on the open ridge (4.9 - 6.4) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5, 0.4);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: mix(1.02, 1.07, lt / 1.5), rot: hh.rot };
  const g = 1500;
  const ph = t * 3;
  const p: HikerProps = { x: 500, y: g + 40, scale: 1.5, phase: ph, walk: 0.5, lean: 0.14, poles: false, handOverride: [20, 40] };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g - 260} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={-0.03} snow={1} />
        <Subject rimX={4} col="rgba(240,244,250,0.8)">
          <Person {...p} outfit={JESS} expression="tired" />
        </Subject>
      </Plane>
      <Blizzard seed={2053} n={32} angle={-62} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="220,228,240" cool="30,45,80" />
      <Chip text="Wind on the ridge" t={t} t0={5.0} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: red, numb cheeks in the wind (6.4 - 7.5) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4, 0.3);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.04, 1.12, lt / 1.1), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={900} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <FaceJess cx={470} cy={1020} s={3.4} red={at(t, [6.4, 7.0], [0.5, 1])} eyes="tired" />
        </Svg>
      </Plane>
      <Blizzard seed={2054} n={22} angle={-62} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" vignette={0.55} />
      <Chip text="Cheeks went numb" t={t} t0={6.5} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the rule, check the feels-like temperature (7.5 - 9.6) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.08, 1.02, lt / 2.1), rot: hh.rot };
  const g = 1480;
  const p: HikerProps = { x: 360, y: g + 182 * 2.4 - 180, scale: 2.4, walk: 0, lean: 0.03, poles: false, handOverride: [70, -10], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 200} t={t} snow={1} blur={1.5} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} col="255,248,230" />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 200} snow={1} />
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={JESS} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Particles seed={2055} n={16} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,244,232" cool="40,60,90" />
      <Chip text="The rule" t={t} t0={7.6} x={60} y={200} icon="none" big />
      <Chip text="Check the feels-like temp" t={t} t0={8.0} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: gaiter up over face and neck, comfortable (9.6 - 11.5) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.9), rot: hh.rot };
  const gaiter = at(t, [9.7, 10.2], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={900} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <FaceJess cx={430} cy={1040} s={3.2} red={0.4} gaiter={gaiter} eyes={t > 10.3 ? "happy" : "neutral"} />
        </Svg>
      </Plane>
      <Particles seed={2056} n={12} col="#ffffff" fall={14} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,244,232" cool="40,60,90" vignette={0.5} />
      <Chip text="Cover face and neck" t={t} t0={10.2} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/winter-ready-set-hsc-cut.png"
      cutoutH={760}
      spec="HEADLAMP · NECK GAITER · WINTER GUIDE"
      name={
        <>
          Winter Ready
          <br />
          Set
        </>
      }
      nameSize={100}
      price="$29.99"
      save="Save this before your next winter hike"
    />
  );
};

export const V205: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.28} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.2} to={4.98} fadeIn={0.06} fadeOut={0.08}>
      <S1b off={3.2} />
    </Scene>
    <Scene from={4.9} to={6.48} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.9} />
    </Scene>
    <Scene from={6.4} to={7.58} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={6.4} />
    </Scene>
    <Scene from={7.5} to={9.68} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={7.5} />
    </Scene>
    <Scene from={9.6} to={11.6} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.6} />
    </Scene>
    <Scene from={11.5} to={15.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.2, 1600],
        [3.2, 7.5, 1660],
        [7.5, 11.5, 1660],
      ]}
    />
  </AbsoluteFill>
);
