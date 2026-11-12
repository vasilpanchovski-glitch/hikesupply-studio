// V143: "Her beanie kept sliding off her ponytail." in the cinematic C01 style, cold winter climb. Story for the Fleece Ear
// Warmer Headband (Unisex, Windproof, $12.99, live Shopify, black). Advice: a beanie pulled over a high ponytail rides up and
// leaves the ears in the wind; an ear warmer headband sits under the ponytail, covers ears and forehead and stays put, and the
// open top lets heat out on the climb. No medical claims. End card = real Shopify product photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { Blizzard, FrostTrail, STORM, Summit, WGOLD, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v143.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const BEANIE = "#3E7C8C";
const BEANIE2 = "#2C5E6B";
const BAND = "#1d1e21";
const BAND2 = "#34363b";
const COLD = "#ff5a4a";

const GR: Outfit = {
  ...JAKE,
  skin: "#E2B08E",
  skinShade: "#C48F6C",
  hair: "#7a4a26",
  beard: null,
  ponytail: null,
  cap: "none",
  capShade: "none",
  jacket: "#6B4C8A",
  jacketShade: "#4F3768",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#3F6B55",
  packShade: "#2D5141",
  glove: "#2a2a2a",
};
const PONY = "#7a4a26";
const PONY2 = "#5e3819";

type Head = "beanie" | "bare" | "band" | "both";

// Head gear on a Person (hiker coords). Hair is drawn for bare / band heads (the Person has no cap).
const HeadGear: React.FC<{ p: HikerProps; mode: Head; cold?: number; lift?: number; fade?: number }> = ({ p, mode, cold = 0, lift = 0, fade = 1 }) => {
  const g = hikerGeometry(p);
  const [hx, hy] = g.head;
  const beanie = (
    <g transform={`translate(0,${-lift}) rotate(${-lift * 0.9} ${hx + 20} ${hy - 8})`} opacity={fade}>
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 39} ${hx},${hy - 41} Q${hx + 28},${hy - 39} ${hx + 26},${hy - 7} Z`} fill={BEANIE} />
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 39} ${hx},${hy - 41} Q${hx - 14},${hy - 30} ${hx - 15},${hy - 5} Z`} fill={BEANIE2} />
      <rect x={hx - 29} y={hy - 12} width={57} height={10} rx={4} fill={BEANIE2} />
    </g>
  );
  const band = (
    <g transform={`translate(0,${mode === "band" ? -lift : 0})`} opacity={mode === "band" ? fade : 1}>
      <path
        d={`M${hx - 28},${hy - 17} Q${hx - 2},${hy - 25} ${hx + 25},${hy - 20} L${hx + 26},${hy - 11} Q${hx + 12},${hy - 11} ${hx + 6},${hy - 6} Q${hx + 4},${hy + 13} ${hx - 6},${hy + 14} Q${hx - 21},${hy + 12} ${hx - 28},${hy + 1} Z`}
        fill={BAND}
      />
      <path d={`M${hx - 27},${hy - 15} Q${hx - 2},${hy - 23} ${hx + 24},${hy - 18}`} stroke={BAND2} strokeWidth={2} fill="none" />
    </g>
  );
  return (
    <g transform={hikerTransform(p)}>
      {cold > 0 && <ellipse cx={hx - 3} cy={hy + 3} rx={8} ry={10} fill={COLD} opacity={0.6 * cold} />}
      <path d={`M${hx - 16},${hy - 30} Q${hx - 50},${hy - 40} ${hx - 58},${hy - 4} Q${hx - 60},${hy + 20} ${hx - 48},${hy + 30} Q${hx - 50},${hy + 4} ${hx - 36},${hy - 14} Q${hx - 26},${hy - 22} ${hx - 10},${hy - 20} Z`} fill={PONY} />
      <circle cx={hx - 18} cy={hy - 27} r={5} fill="#c23a55" />
      {mode !== "beanie" && (
        <path d={`M${hx - 27},${hy - 2} Q${hx - 27},${hy - 33} ${hx + 2},${hy - 34} Q${hx + 24},${hy - 32} ${hx + 25},${hy - 12} Q${hx + 12},${hy - 20} ${hx - 6},${hy - 14} Z`} fill={GR.hair} />
      )}
      {(mode === "band" || mode === "both") && band}
      {(mode === "beanie" || mode === "both") && beanie}
    </g>
  );
};

// Steam lines rising off the top of the head (hiker coords).
const HeadSteam: React.FC<{ p: HikerProps; t: number; k: number }> = ({ p, t, k }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      {[0, 1, 2].map((i) => {
        const q = (t * 0.8 + i / 3) % 1;
        return (
          <path
            key={i}
            d={`M${hx - 10 + i * 10},${hy - 40 - q * 50} q6,-8 0,-16 q-6,-8 0,-16`}
            stroke="#ffffff"
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            opacity={0.6 * Math.sin(q * Math.PI)}
          />
        );
      })}
    </g>
  );
};

// Big close-up face (screen coords), three-quarter view to the right.
const FaceGrace: React.FC<{ cx: number; cy: number; s: number; mode: Head; beanieOff?: number; sweat?: number; cold?: number; ears?: number; steam?: number; ride?: number; bandOn?: number; eyes?: "tired" | "neutral" | "happy"; t: number }> = ({
  cx,
  cy,
  s,
  mode,
  beanieOff = 0,
  sweat = 0,
  cold = 0,
  ears = 0,
  steam = 0,
  ride = 0,
  bandOn = 1,
  eyes = "neutral",
  t,
}) => {
  const pulse = 0.75 + 0.25 * Math.sin(t * 7);
  const o = GR;
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      <defs>
        <filter id="fgBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={10} />
        </filter>
      </defs>
      {/* jacket + collar */}
      <path d="M-170,190 Q-120,150 -40,150 L60,150 Q150,150 190,200 L190,280 L-170,280 Z" fill={o.jacket} />
      <path d="M-50,150 L70,150 L60,196 L-40,196 Z" fill={o.jacketShade} />
      {/* neck */}
      <path d="M-36,60 L56,60 L58,150 L-38,150 Z" fill={o.skinShade} />
      {/* face */}
      <ellipse cx={20} cy={4} rx={84} ry={92} fill={o.skin} />
      <ellipse cx={-30} cy={10} rx={16} ry={22} fill={o.skinShade} />
      {/* high ponytail out the back */}
      <g transform={`rotate(${Math.sin(t * 3.2) * 4} -60 -110)`}>
        <path d="M-60,-120 Q-190,-150 -220,-40 Q-240,60 -190,130 Q-200,40 -150,-20 Q-110,-70 -40,-80 Z" fill={PONY} />
        <path d="M-80,-118 Q-180,-120 -200,-30 M-90,-100 Q-160,-80 -180,20" stroke={PONY2} strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>
      <ellipse cx={-62} cy={-112} rx={18} ry={22} fill="#c23a55" />
      {/* ear */}
      <ellipse cx={-62} cy={12} rx={20} ry={30} fill={o.skin} />
      <path d="M-66,-6 q-10,18 0,36" stroke={o.skinShade} strokeWidth={5} fill="none" strokeLinecap="round" />
      <ellipse cx={-62} cy={12} rx={20} ry={30} fill={COLD} opacity={0.45 * cold} />
      {ears > 0 && <ellipse cx={-62} cy={12} rx={34} ry={44} fill={COLD} opacity={0.5 * ears * pulse} filter="url(#fgBlur)" />}
      {/* cheeks */}
      <ellipse cx={62} cy={22} rx={20} ry={14} fill={sweat > 0 ? "#e0705a" : COLD} opacity={0.18 + 0.3 * Math.max(cold, sweat)} />
      {/* eyes */}
      {[0, 46].map((dx, i) => (
        <g key={i}>
          {eyes === "happy" ? (
            <path d={`M${4 + dx},-10 q7,-8 14,0`} stroke="#2a1f1a" strokeWidth={5} fill="none" strokeLinecap="round" />
          ) : (
            <ellipse cx={11 + dx} cy={-12} rx={6.5} ry={eyes === "tired" ? 4 : 8} fill="#2a1f1a" />
          )}
          <path d={`M${dx},-32 q11,${eyes === "tired" ? 3 : -5} 22,${eyes === "tired" ? 4 : 0}`} stroke={o.hair} strokeWidth={4} fill="none" strokeLinecap="round" />
          {eyes !== "happy" && <path d={`M${18 + dx},-18 l7,-6`} stroke="#2a1f1a" strokeWidth={3} strokeLinecap="round" />}
        </g>
      ))}
      <path d="M44,0 q12,18 0,26" stroke={o.skinShade} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={eyes === "happy" ? "M22,50 q14,10 28,0" : eyes === "tired" ? "M22,54 q14,-3 28,0" : "M22,52 q14,2 28,0"} stroke="#5a2e22" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* hair (always, the beanie sits over it) */}
      {(
        <g>
          <path d="M-96,0 Q-118,-120 -40,-140 Q40,-160 104,-110 Q130,-80 112,-30 Q70,-80 0,-74 Q-60,-70 -96,0 Z" fill={o.hair} />
          <path d="M-60,-112 Q-10,-136 60,-120 M-80,-70 Q-40,-110 20,-110" stroke={PONY2} strokeWidth={6} fill="none" strokeLinecap="round" />
          {sweat > 0 && <path d="M-70,-40 q10,-30 30,-40 M-20,-62 q14,-24 36,-30 M40,-64 q16,-20 40,-22" stroke="#2c1d14" strokeWidth={5} fill="none" opacity={sweat} strokeLinecap="round" />}
        </g>
      )}
      {/* sweat drops */}
      {sweat > 0 &&
        [0, 1, 2, 3].map((i) => {
          const q = (t * 0.9 + i / 4) % 1;
          const x = [96, -20, 70, -80][i];
          const y0 = [-50, -40, 30, -10][i];
          return <path key={i} d="M0,-14 Q11,3 0,13 Q-11,3 0,-14 Z" fill="#dff1fb" stroke="#8fbcd4" strokeWidth={2.5} transform={`translate(${x},${y0 + q * 60})`} opacity={sweat * (1 - q)} />;
        })}
      {/* ear warmer headband: forehead + ears, top of the head open */}
      {(mode === "band" || mode === "both") && (
        <g transform={`translate(0,${-(1 - bandOn) * 120})`} opacity={at(bandOn, [0, 0.15], [0, 1])}>
          <path d="M-106,-50 Q12,-86 128,-50 L124,-20 Q24,-58 -32,-30 Q-24,52 -62,54 Q-102,52 -104,10 Z" fill={BAND} />
          <path d="M-104,-46 Q12,-82 126,-46" stroke={BAND2} strokeWidth={6} fill="none" />
          <path d="M122,-22 Q24,-56 -30,-30 Q-22,50 -62,52" stroke={BAND2} strokeWidth={5} fill="none" />
          <path d="M-60,-40 Q-80,0 -66,30" stroke="#2a2c30" strokeWidth={8} fill="none" strokeLinecap="round" />
        </g>
      )}
      {/* steam out of the open top */}
      {steam > 0 &&
        [0, 1, 2, 3].map((i) => {
          const q = (t * 0.7 + i / 4) % 1;
          return (
            <path
              key={i}
              d={`M${-50 + i * 40},${-140 - q * 120} q14,-18 0,-36 q-14,-18 0,-36`}
              stroke="#ffffff"
              strokeWidth={7}
              fill="none"
              strokeLinecap="round"
              opacity={0.55 * steam * Math.sin(q * Math.PI)}
            />
          );
        })}
      {/* beanie */}
      {(mode === "beanie" || mode === "both") && (
        <g transform={`translate(${beanieOff * 160},${-beanieOff * 260 - ride * 70}) rotate(${beanieOff * 18 - ride * 9})`} opacity={1 - at(beanieOff, [0.6, 1], [0, 1])}>
          <path d="M-100,-26 Q-112,-150 12,-152 Q132,-150 120,-30 Z" fill={BEANIE} />
          <path d="M-100,-26 Q-112,-150 12,-152 Q-40,-120 -46,-28 Z" fill={BEANIE2} />
          <rect x={-108} y={-60} width={236} height={40} rx={16} fill={BEANIE2} />
          {[-80, -50, -20, 10, 40, 70, 100].map((x) => (
            <path key={x} d={`M${x},-56 v32`} stroke={BEANIE} strokeWidth={5} opacity={0.6} />
          ))}
          {sweat > 0 && <ellipse cx={0} cy={-40} rx={100} ry={22} fill="#5d4214" opacity={0.35 * sweat} />}
        </g>
      )}
    </g>
  );
};

// ============ S1 HOOK MEDIUM: cold trailhead, Grace pulls a beanie over her high ponytail (0 - 4.28) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.03, 1.1, t / 4.28), rot: hh.rot };
  const g = 1560;
  const on = at(t, [1.9, 3.0], [0, 1], outExpo);
  const pulling = on > 0.02 && on < 0.98;
  const p: HikerProps = { x: 470, y: g + 40, scale: 2.5, walk: 0, lean: 0.04, poles: false, handOverride: pulling ? [30, -170] : [30, 20], breathe: Math.sin(t * 2.4) * 1.2 };
  const s = p.scale ?? 1;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={GR} expression="neutral" />
          <HeadGear p={p} mode="bare" />
          <g transform={`translate(0,${-(1 - on) * 40 * s})`} opacity={at(t, [1.8, 1.95], [0, 1])}>
            <HeadGear p={p} mode="beanie" lift={at(t, [3.2, 4.2], [0, 7])} />
          </g>
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Particles seed={1431} n={18} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="248,240,228" cool="40,60,90" />
      <Title text={"Her beanie kept\nsliding off her\nponytail."} t={t} t0={0} top={110} size={120} />
      <Chip text="Hair up for the climb" t={t} t0={1.1} x={570} y={880} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the beanie rides up over the ponytail (4.28 - 5.9) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.09, lt / 1.62), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,240,220,0.8)">
          <Svg>
            <FaceGrace cx={560} cy={1010} s={3.0} mode="beanie" ride={at(t, [4.6, 5.6], [0, 1])} eyes="tired" t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1432} n={12} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="252,238,220" cool="40,55,80" vignette={0.55} />
      <Chip text="Kept riding up" t={t} t0={4.75} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: open slope, the wind finds her ears (5.9 - 7.58) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6, at(t, [6.0, 6.1, 6.6], [0, 1, 0]) * 3);
  const cam: Cam = { x: hh.x - lt * 18, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.68), rot: hh.rot };
  const g = 1520;
  const ph = t * 2.4;
  const p: HikerProps = { x: 420 + lt * 40, y: g + 30, scale: 1.9, phase: ph, walk: 0.5, lean: 0.24, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g + 120} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={6} col="rgba(230,238,246,0.85)">
          <Person {...p} outfit={GR} expression="tired" />
          <HeadGear p={p} mode="beanie" lift={7} cold={at(t, [6.3, 7.0], [0, 1])} />
        </Subject>
      </Plane>
      <Blizzard seed={1433} n={36} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" />
      <Chip text="Wind on the ridge" t={t} t0={6.0} x={60} y={200} icon="none" big />
      <Chip text="Cold ears" t={t} t0={6.9} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: she pulls the beanie off and stuffs it in her pocket (7.58 - 9.93) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.35), rot: hh.rot };
  const offB = at(t, [8.2, 9.0], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(230,238,246,0.8)">
          <Svg>
            <FaceGrace cx={540} cy={1020} s={3.0} mode="beanie" ride={1} beanieOff={offB} cold={0.8} ears={at(t, [8.8, 9.4], [0, 1])} eyes="tired" t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Blizzard seed={1434} n={22} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="230,234,240" cool="30,45,80" vignette={0.55} />
      <Chip text="Into the pocket" t={t} t0={8.3} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: the fix: fleece ear warmer headband goes on (9.93 - 13.64) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.71), rot: hh.rot };
  const g = 1560;
  const on = at(t, [11.6, 12.5], [0, 1], outExpo);
  const pulling = on > 0.02 && on < 0.98;
  const p: HikerProps = { x: 520, y: g + 40, scale: 2.5, walk: 0, lean: 0.04, poles: false, handOverride: pulling ? [30, -170] : [30, 20], breathe: Math.sin(t * 2.4) * 1.2 };
  const s = p.scale ?? 1;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={GR} expression="neutral" />
          <HeadGear p={p} mode="bare" />
          <g transform={`translate(0,${-(1 - on) * 50 * s})`} opacity={at(t, [11.5, 11.7], [0, 1])}>
            <HeadGear p={p} mode="band" />
          </g>
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,246,226" />
      <Particles seed={1435} n={16} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,226" cool="40,60,90" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={11.35} top={200} size={124} />
      <Chip text="Fleece ear warmer headband" t={t} t0={11.75} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: under the ponytail, ears and forehead covered, stays put (13.64 - 18.3) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 6, y: hh.y, zoom: mix(1.02, 1.1, lt / 4.66), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,240,220,0.8)">
          <Svg>
            <FaceGrace cx={560} cy={1060} s={3.0} mode="band" bandOn={at(t, [13.7, 14.3], [0, 1], outExpo)} eyes="neutral" t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1436} n={12} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="252,240,224" cool="40,55,80" vignette={0.55} />
      <Chip text="Under the ponytail" t={t} t0={14.6} x={60} y={200} icon="check" big />
      <Chip text="Ears and forehead" t={t} t0={15.8} x={60} y={330} icon="check" big />
      <Chip text="Stays put" t={t} t0={17.45} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 WIDE: the steep climb, heat out of the open top (18.3 - 21.6) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x - lt * 18, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.3), rot: hh.rot };
  const g = 1540;
  const ph = t * 2.2;
  const p: HikerProps = { x: 330 + lt * 50, y: g + 40 - lt * 50 * 0.25, scale: 2.0, phase: ph, walk: 0.7, lean: 0.26, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0, slope: 0.25 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={g - 200} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={0.25} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={GR} expression="neutral" />
          <HeadGear p={p} mode="band" />
          <HeadSteam p={p} t={t} k={at(t, [19.0, 19.6], [0, 0.9])} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,246,226" />
      <Particles seed={1437} n={16} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="252,240,222" cool="40,60,90" />
      <Chip text="On the climb" t={t} t0={18.45} x={60} y={200} icon="none" big />
      <Chip text="Heat out the top" t={t} t0={19.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: at the top in golden light, warm ears (21.6 - 23.45) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1520;
  const ph = t * 2.6;
  const p: HikerProps = { x: 380 + lt * 60, y: g + 40, scale: 2.4, phase: ph, walk: 0.55, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="h" treeY={g + 120} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={GR} expression="happy" />
          <HeadGear p={p} mode="band" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.45} col="255,236,200" />
      <Particles seed={1438} n={22} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,226,180" />
      <Readout label="AT THE TOP" value="Warm ears" ok={true} t={t} t0={21.75} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/fleece-ear-warmer-headband-cut.png"
      cutoutH={560}
      spec="UNISEX · WINDPROOF · FLEECE"
      name={
        <>
          Fleece Ear Warmer
          <br />
          Headband
        </>
      }
      nameSize={96}
      price="$12.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V143: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.33} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.28} to={5.95} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.28} />
    </Scene>
    <Scene from={5.9} to={7.63} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.9} />
    </Scene>
    <Scene from={7.58} to={9.98} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.58} />
    </Scene>
    <Scene from={9.93} to={13.69} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={9.93} />
    </Scene>
    <Scene from={13.64} to={18.35} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={13.64} />
    </Scene>
    <Scene from={18.3} to={21.65} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={18.3} />
    </Scene>
    <Scene from={21.6} to={23.6} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={21.6} />
    </Scene>
    <Scene from={23.45} to={27.5} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.28, 1600],
        [4.28, 5.9, 1660],
        [5.9, 7.58, 1600],
        [7.58, 9.93, 1660],
        [9.93, 13.64, 1600],
        [13.64, 18.3, 1660],
        [18.3, 21.6, 1600],
        [21.6, 23.45, 1600],
      ]}
    />
  </AbsoluteFill>
);
