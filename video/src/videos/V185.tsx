// V185: "White spot on his cheek." Short format (16.6 s, 41 words), cinematic C01 style.
// Product: Winter Hiking Guide & Cold-Weather Checklist, $7.99 (live Shopify; the guide covers frostnip and frostbite warning signs).
// Advice (conservative, widely taught, no numbers, no medical promises): in cold wind a pale, waxy patch you cannot feel can be early
// frostnip; check each other's faces, cover up and warm it gently (a warm hand, out of the wind); never rub it.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { Blizzard, FrostTrail, STORM, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v185.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const BEN: Outfit = {
  ...JAKE,
  skin: "#D9A07C",
  skinShade: "#BC835F",
  hair: "#3a2a1c",
  beard: null,
  cap: "#B5553A",
  capShade: "#8E3F2A",
  jacket: "#2F5F8A",
  jacketShade: "#234868",
  pants: "#3d4148",
  pantsShade: "#2c2f35",
  pack: "#4A5A3A",
  packShade: "#38452c",
  glove: "#2a2a2a",
};
const KIM: Outfit = {
  ...JAKE,
  skin: "#C68B63",
  skinShade: "#A8714D",
  hair: "#1e1612",
  beard: null,
  cap: "#E3B23C",
  capShade: "#c0952c",
  jacket: "#7A4E9A",
  jacketShade: "#5f3b78",
  pants: "#2f3338",
  pantsShade: "#22262a",
  pack: "#3E6E8E",
  packShade: "#2F5670",
  glove: "#2a2a2a",
};

// Big close-up of Ben's bare face in a beanie (screen coords). patch = pale waxy spot on the cheek (0..1),
// gaiter = neck gaiter pulled up over the cheeks (0..1), hand = gloved hand cupped over the cheek (0..1).
const FaceBare: React.FC<{ cx: number; cy: number; s: number; patch: number; gaiter?: number; hand?: number; eyes?: "neutral" | "happy" | "tired"; t: number }> = ({
  cx,
  cy,
  s,
  patch,
  gaiter = 0,
  hand = 0,
  eyes = "neutral",
  t,
}) => {
  const gTop = mix(150, 28, gaiter);
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      {/* jacket collar */}
      <path d="M-180,170 Q-120,110 -40,112 L70,112 Q160,112 200,180 L200,280 L-180,280 Z" fill={BEN.jacket} />
      <path d="M-40,112 L70,112 L60,170 L-30,170 Z" fill={BEN.jacketShade} />
      {/* neck */}
      <rect x={-20} y={70} width={70} height={60} fill={BEN.skinShade} />
      {/* face, three-quarter view to the right */}
      <ellipse cx={20} cy={4} rx={84} ry={94} fill={BEN.skin} />
      <ellipse cx={-34} cy={12} rx={16} ry={22} fill={BEN.skinShade} />
      {/* wind-reddened cheek around the patch */}
      <ellipse cx={4} cy={34} rx={30} ry={22} fill="#d9705c" opacity={0.4} />
      {/* the pale, waxy patch */}
      {patch > 0 && (
        <g opacity={patch}>
          <ellipse cx={4} cy={34} rx={20} ry={15} fill="#efe6dc" />
          <ellipse cx={0} cy={29} rx={8} ry={4} fill="#ffffff" opacity={0.7 + 0.2 * Math.sin(t * 4)} />
        </g>
      )}
      {/* eyes and brows */}
      {[0, 46].map((dx, i) => (
        <g key={i}>
          {eyes === "happy" ? (
            <path d={`M${2 + dx},-14 q9,-9 18,0`} stroke="#2a1f1a" strokeWidth={4.5} fill="none" strokeLinecap="round" />
          ) : (
            <ellipse cx={11 + dx} cy={-12} rx={6.5} ry={eyes === "tired" ? 4 : 8} fill="#2a1f1a" />
          )}
          <path d={`M${dx},-32 q11,-5 22,0`} stroke="#3a2a1e" strokeWidth={4.5} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <path d="M44,0 q12,18 0,26" stroke={BEN.skinShade} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={eyes === "happy" ? "M20,56 q16,12 32,0" : "M22,58 q14,2 28,0"} stroke="#5a2e22" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* beanie */}
      <path d="M-74,-50 Q-80,-150 20,-152 Q120,-150 112,-50 Z" fill={BEN.cap} />
      <rect x={-84} y={-66} width={206} height={40} rx={16} fill={BEN.capShade} />
      {[-60, -30, 0, 30, 60, 90].map((x) => (
        <line key={x} x1={x} y1={-62} x2={x} y2={-30} stroke={BEN.cap} strokeWidth={5} opacity={0.6} />
      ))}
      <path d="M-80,-40 Q-94,10 -70,60" stroke={BEN.hair} strokeWidth={14} fill="none" strokeLinecap="round" />
      {/* neck gaiter, pulled up as gaiter -> 1 */}
      <path d={`M-96,${gTop + 20} Q20,${gTop - 6} 112,${gTop} L118,150 Q20,170 -96,150 Z`} fill="#4A5A3A" />
      <path d={`M-92,${gTop + 22} Q20,${gTop - 2} 110,${gTop + 4}`} stroke="#38452c" strokeWidth={8} fill="none" />
      {/* gloved hand cupped over the cheek, held still (not rubbing) */}
      {hand > 0 && (
        <g transform={`translate(${mix(200, 10, hand)},${mix(220, 92, hand)}) rotate(-12) scale(0.62)`}>
          <path d="M-40,-50 Q-50,-80 -24,-84 L40,-84 Q66,-80 60,-40 L54,70 L-40,70 Z" fill="#2a2a2a" />
          {[-24, -4, 16, 36].map((x) => (
            <path key={x} d={`M${x},-82 l0,-26`} stroke="#2a2a2a" strokeWidth={18} strokeLinecap="round" />
          ))}
          <path d="M-40,70 L54,70 L64,180 L-50,180 Z" fill={BEN.jacket} />
        </g>
      )}
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Kim points at Ben's face on a windy snowy ridge (0 - 2.4) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.1, t / 2.4), rot: hh.rot };
  const g = 1540;
  const point = at(t, [0.9, 1.3], [0, 1], outExpo);
  const ben: HikerProps = { x: 330, y: g + 60, scale: 2.3, walk: 0, lean: 0, poles: false, handOverride: [20, 40], breathe: Math.sin(t * 2.2) * 1.5 };
  const kim: HikerProps = { x: 760, y: g + 60, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [mix(20, 95, point), mix(40, -85, point)], breathe: Math.sin(t * 2.4) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={g - 220} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(240,244,250,0.8)">
          <Person {...ben} outfit={BEN} expression="neutral" />
          <Person {...kim} outfit={KIM} expression="neutral" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Blizzard seed={1851} n={22} angle={-60} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" />
      <Title text={"White spot\non his\ncheek."} t={t} t0={0} top={110} size={130} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the pale, waxy patch (2.4 - 4.7) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.04, 1.14, lt / 2.3), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={900} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <FaceBare cx={470} cy={1020} s={3.4} patch={at(t, [2.5, 3.1], [0.4, 1])} t={t} />
        </Svg>
      </Plane>
      <Particles seed={1852} n={16} col="#ffffff" fall={30} bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="232,236,244" cool="30,45,80" vignette={0.55} />
      <Chip text="Pale, waxy patch" t={t} t0={2.7} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: the wind keeps blowing, he didn't feel a thing (4.7 - 7.4) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.02, 1.07, lt / 2.7), rot: hh.rot };
  const g = 1500;
  const ph = t * 3;
  const ben: HikerProps = { x: 420, y: g + 40, scale: 1.5, phase: ph, walk: 0.5, lean: 0.08, poles: false, handOverride: [20, 40] };
  const kim: HikerProps = { x: 640, y: g + 30, scale: 1.45, phase: ph + 1.5, walk: 0.5, lean: 0.08, poles: false, handOverride: [20, 40] };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g - 260} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={-0.03} snow={1} />
        <Subject rimX={4} col="rgba(240,244,250,0.8)">
          <Person {...ben} outfit={BEN} expression="neutral" />
          <Person {...kim} outfit={KIM} expression="tired" />
        </Subject>
      </Plane>
      <Blizzard seed={1853} n={30} angle={-62} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="220,228,240" cool="30,45,80" />
      <Chip text="He didn't feel it" t={t} t0={4.9} x={60} y={200} icon="x" big />
      <Chip text="Can be early frostnip" t={t} t0={6.2} x={60} y={330} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the rule, check each other's faces (7.4 - 9.7) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.08, 1.02, lt / 2.3), rot: hh.rot };
  const g = 1480;
  const ben: HikerProps = { x: 330, y: g + 182 * 2.4 - 180, scale: 2.4, walk: 0, lean: 0.03, poles: false, handOverride: [30, 40], breathe: Math.sin(t * 2) * 1.5 };
  const kim: HikerProps = { x: 760, y: g + 182 * 2.4 - 180, scale: 2.4, walk: 0, lean: 0.03, poles: false, handOverride: [30, 40], breathe: Math.sin(t * 2.3) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={g - 200} t={t} snow={1} blur={1.5} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} col="255,248,230" />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 200} snow={1} />
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <Person {...ben} outfit={BEN} expression="neutral" />
          <Person {...kim} outfit={KIM} expression="neutral" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Particles seed={1854} n={16} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,244,232" cool="40,60,90" />
      <Chip text="The rule" t={t} t0={7.5} x={60} y={200} icon="none" big />
      <Chip text="Check each other's faces" t={t} t0={8.0} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: gaiter up, warm hand held still on the cheek, never rub (9.7 - 12.2) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.5), rot: hh.rot };
  const hand = at(t, [10.0, 10.4], [0, 1], outExpo);
  const gaiter = at(t, [9.8, 10.2], [0, 0.7], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={900} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <FaceBare cx={430} cy={1040} s={3.2} patch={1 - at(t, [10.6, 12.0], [0, 0.6])} gaiter={gaiter} hand={hand} eyes="neutral" t={t} />
        </Svg>
      </Plane>
      <Particles seed={1855} n={12} col="#ffffff" fall={14} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,244,232" cool="40,60,90" vignette={0.5} />
      <Chip text="Cover up" t={t} t0={9.8} x={60} y={200} icon="check" big />
      <Chip text="Warm it gently" t={t} t0={10.2} x={60} y={330} icon="check" big />
      <Chip text="Never rub it" t={t} t0={11.0} x={60} y={460} icon="x" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/winter-hiking-guide-cold-weather-checklist-cover-cut.png"
      cutoutH={800}
      spec="22 PRINTABLE PAGES · COLD-WEATHER CHECKLIST"
      name={
        <>
          Winter Hiking
          <br />
          Guide
        </>
      }
      nameSize={100}
      price="$7.99"
      save="Save this for cold days"
    />
  );
};

export const V185: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.48} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.4} to={4.78} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.4} />
    </Scene>
    <Scene from={4.7} to={7.48} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.7} />
    </Scene>
    <Scene from={7.4} to={9.78} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={7.4} />
    </Scene>
    <Scene from={9.7} to={12.2} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.7} />
    </Scene>
    <Scene from={12.1} to={16.6} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.4, 1600],
        [2.4, 4.7, 1660],
        [4.7, 7.4, 1600],
        [7.4, 9.7, 1600],
        [9.7, 12.1, 1660],
      ]}
    />
  </AbsoluteFill>
);
