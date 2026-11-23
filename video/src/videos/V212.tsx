// V212: "Her glasses fogged on every breath." Short format (15.8 s, 43 words), cinematic C01 style, winter climb.
// Product: Multifunctional Neck Gaiter — Seamless Stretch Tube, $9.99 (live Shopify). End card: the real store cover, cut out.
// Advice (simple, common practice, no numbers): a gaiter pulled over the nose pushes warm, moist breath up into the glasses, so
// they fog; on the climb keep it below the nose, and pull it up when you stop or turn into the wind.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { Blizzard, FrostTrail, STORM, WGOLD, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v212.json";

const words = vo.words as unknown as Word[];

const GAITER = "#26272a"; // black, like the store photo
const GAITER2 = "#141517";

const IVY: Outfit = {
  ...JAKE,
  skin: "#B97A55",
  skinShade: "#9A5F3E",
  hair: "#20160f",
  ponytail: "#20160f",
  beard: null,
  cap: "#E3B23C",
  capShade: "#c0952c",
  jacket: "#3E6FA8",
  jacketShade: "#2f5683",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  pack: "#C2662E",
  packShade: "#9B4E20",
  glove: "#26272a",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Close-up face, three-quarter view to the right (local units, scaled by s). Beanie, round glasses, black tube gaiter.
// up 0..1: gaiter from the neck (0) to over the nose (1). fog 0..1 white mist on the lenses. puff: breath phase.
const Face: React.FC<{ cx: number; cy: number; s: number; up: number; fog: number; t: number; eyes?: "tired" | "happy" | "neutral"; breathUp: number; breathOut: number }> = ({
  cx,
  cy,
  s,
  up,
  fog,
  t,
  eyes = "neutral",
  breathUp,
  breathOut,
}) => {
  const top = mix(104, 8, up);
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      {/* jacket shoulders */}
      <path d="M-200,190 Q-140,120 -50,118 L80,118 Q170,120 220,200 L230,320 L-210,320 Z" fill={IVY.jacket} />
      <path d="M-50,118 L80,118 L70,200 L-40,200 Z" fill={IVY.jacketShade} />
      {/* hair behind */}
      <path d="M-86,-40 Q-110,60 -70,130 L-30,120 Q-60,40 -50,-30 Z" fill={IVY.hair} />
      {/* face */}
      <ellipse cx={20} cy={4} rx={84} ry={94} fill={IVY.skin} />
      <ellipse cx={-34} cy={12} rx={16} ry={22} fill={IVY.skinShade} />
      {/* eyes */}
      {[0, 46].map((dx, i) => (
        <g key={i}>
          {eyes === "happy" ? (
            <path d={`M${2 + dx},-14 q9,-9 18,0`} stroke="#1c1410" strokeWidth={4.5} fill="none" strokeLinecap="round" />
          ) : (
            <ellipse cx={11 + dx} cy={-12} rx={6.5} ry={eyes === "tired" ? 4 : 8} fill="#1c1410" />
          )}
          <path d={`M${dx - 2},-38 q12,-6 24,0`} stroke="#20160f" strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      ))}
      {/* nose + mouth */}
      <path d="M44,0 q12,18 0,26" stroke={IVY.skinShade} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={eyes === "happy" ? "M20,54 q16,12 32,0" : "M22,56 q14,2 28,0"} stroke="#4a2418" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* beanie */}
      <path d="M-92,-30 Q-96,-140 20,-146 Q130,-140 118,-30 Z" fill={IVY.cap} />
      <rect x={-98} y={-52} width={222} height={34} rx={14} fill={IVY.capShade} />
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={-70 + i * 30} y1={-130 + Math.abs(i - 3) * 4} x2={-74 + i * 30} y2={-56} stroke={IVY.capShade} strokeWidth={4} opacity={0.6} />
      ))}
      {/* the gaiter: tube round the neck, and its top edge rising over the face */}
      <path d={`M-70,${Math.min(top, 96)} Q20,${top - 14} 108,${top} L116,150 Q20,176 -78,150 Z`} fill={GAITER} />
      <path d={`M-66,${Math.min(top, 96) + 8} Q20,${top - 4} 104,${top + 8}`} stroke={GAITER2} strokeWidth={7} fill="none" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M-74,${120 + i * 12} Q20,${140 + i * 12} 112,${120 + i * 12}`} stroke={GAITER2} strokeWidth={4} fill="none" opacity={0.6} />
      ))}
      {/* glasses */}
      {[0, 46].map((dx, i) => (
        <g key={i}>
          <rect x={-8 + dx} y={-34} width={38} height={36} rx={14} fill={`rgba(240,246,250,${0.12 + fog * 0.78})`} />
          <rect x={-8 + dx} y={-34} width={38} height={36} rx={14} fill="none" stroke="#1d1f22" strokeWidth={5} />
          <path d={`M${-2 + dx},-26 l10,-4`} stroke="#ffffff" strokeWidth={3} opacity={0.7 * (1 - fog)} strokeLinecap="round" />
        </g>
      ))}
      <path d="M30,-18 q8,-6 16,0" stroke="#1d1f22" strokeWidth={4} fill="none" />
      <path d="M-8,-20 L-62,-26" stroke="#1d1f22" strokeWidth={4} />
      {/* breath: forced up out of the gaiter's top edge into the lenses */}
      {breathUp > 0 &&
        [0, 0.5].map((o) => {
          const q = (t * 1.2 + o) % 1;
          return <circle key={o} cx={50 + Math.sin(o * 6) * 20} cy={top - 6 - q * 40} r={10 + q * 22} fill="#f2f6f8" opacity={0.5 * breathUp * (1 - q)} />;
        })}
      {/* breath: out in front, away from the lenses */}
      {breathOut > 0 &&
        [0, 0.5].map((o) => {
          const q = (t * 0.9 + o) % 1;
          return <circle key={o} cx={70 + q * 110} cy={60 + q * 20} r={10 + q * 28} fill="#f2f6f8" opacity={0.45 * breathOut * (1 - q)} />;
        })}
    </g>
  );
};

// ============ S1 HOOK WIDE: Ivy climbing a snowy trail, gaiter up (0 - 3.1) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + t * 24, y: hh.y, zoom: mix(1.03, 1.09, t / 3.1), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 360 + t * 40, y: g, scale: 2.3, phase: t * 4.2, walk: 0.7, lean: 0.2, poles: false, breathe: Math.sin(t * 5) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 250} t={t} snow={1} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,248,230" />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={-0.05} snow={1} />
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={IVY} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Particles seed={2121} n={14} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="252,244,232" cool="40,60,90" />
      <Title text={"Her glasses\nfogged on\nevery breath."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: gaiter over the nose, every breath goes up into the lenses (3.1 - 5.3) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 2.2), rot: hh.rot };
  const fog = at(t, [3.2, 4.2], [0.3, 0.95]) * (0.85 + 0.15 * Math.sin(t * 6));
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1150} blur={14} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <Svg>
            <Face cx={500} cy={860} s={3.3} up={1} fog={fog} t={t} eyes="tired" breathUp={1} breathOut={0} />
          </Svg>
        </Subject>
      </Plane>
      <LowScrim />
      <Particles seed={2122} n={12} col="#ffffff" fall={8} bokeh />
      <Grade sunX={800} sunY={500} warm="252,244,232" cool="40,60,90" vignette={0.55} />
      <Chip text="Gaiter over the nose" t={t} t0={3.2} x={60} y={170} icon="x" big />
      <Chip text="Breath goes up" t={t} t0={4.2} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the rule: on the climb the gaiter goes below the nose, the lenses clear (5.3 - 8.6) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x - 20, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.3), rot: hh.rot };
  const down = at(t, [6.3, 7.0], [0, 1], outExpo);
  const fog = mix(0.9, 0, at(t, [6.9, 7.9], [0, 1]));
  const top = mix(8, 104, mix(0, 0.88, down));
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="c" treeY={1150} blur={14} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Svg>
            <Face cx={500} cy={860} s={3.3} up={1 - down * 0.88} fog={fog} t={t} eyes={down > 0.9 && fog < 0.2 ? "happy" : "neutral"} breathUp={1 - down} breathOut={down} />
            {/* gloved hand pulling the gaiter's edge down */}
            <g opacity={at(t, [5.9, 6.2, 7.2, 7.5], [0, 1, 1, 0])}>
              <ellipse cx={500 + 90 * 3.3} cy={860 + (top + 4) * 3.3} rx={96} ry={70} fill={IVY.glove ?? GAITER} />
              <path d={`M${500 + 90 * 3.3 + 60},${860 + (top + 4) * 3.3 + 40} L1200,${860 + (top + 4) * 3.3 + 420}`} stroke={IVY.jacket} strokeWidth={140} strokeLinecap="round" />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <LowScrim />
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 200} strength={0.35} col="255,236,200" />
      <Particles seed={2123} n={14} col="#fff3d6" fall={6} bokeh />
      <Grade sunX={760} sunY={500} warm="255,226,180" vignette={0.5} />
      <Chip text="The rule" t={t} t0={5.4} x={60} y={170} icon="none" big />
      <Chip text="Climbing: below the nose" t={t} t0={6.6} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: a stop on the windy ridge, gaiter up (8.6 - 11.2) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.05, 1.11, lt / 2.6), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 470, y: g, scale: 2.4, walk: 0, lean: 0.08, poles: false, breathe: Math.sin(t * 3) * 2, handOverride: [34, -40] };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={g - 200} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={-0.02} snow={1} />
        <Subject rimX={4} col="rgba(240,244,250,0.8)">
          <Person {...p} outfit={IVY} expression="neutral" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Blizzard seed={2124} n={30} angle={-62} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="220,228,240" cool="30,45,80" />
      <Chip text="Stopped or in the wind" t={t} t0={8.7} x={60} y={170} icon="none" big />
      <Chip text="Pull it up" t={t} t0={9.7} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/multifunctional-neck-gaiter-cut.png"
      cutoutH={720}
      spec="SEAMLESS STRETCH TUBE"
      name={
        <>
          Multifunctional
          <br />
          Neck Gaiter
        </>
      }
      nameSize={96}
      price="$9.99"
      save="Save this for cold days"
    />
  );
};

export const V212: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.18} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.1} to={5.38} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.1} />
    </Scene>
    <Scene from={5.3} to={8.68} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.3} />
    </Scene>
    <Scene from={8.6} to={11.28} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={8.6} />
    </Scene>
    <Scene from={11.2} to={15.8} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.1, 1600],
        [3.1, 5.3, 1600],
        [5.3, 8.6, 1600],
        [8.6, 11.2, 1600],
      ]}
    />
  </AbsoluteFill>
);
