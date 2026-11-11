// V136: "His beanie was soaked before the ridge." in the cinematic C01 style, winter climb. Story for the Fleece Ear Warmer
// Headband (Unisex, Windproof, $12.99, live Shopify, black). Advice: a beanie on a hard climb gets hot and sweaty; on the climb wear
// an ear warmer headband (covers the ears, heat escapes from the top of the head); save the beanie for the stops. No medical claims.
// End card = real Shopify product photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject, Sweat } from "../fall";
import { Blizzard, FrostTrail, STORM, Summit, WGOLD, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v136.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const BEANIE = "#C2923A";
const BEANIE2 = "#9E7428";
const BAND = "#1d1e21";
const BAND2 = "#34363b";
const COLD = "#ff5a4a";

const JK: Outfit = {
  ...JAKE,
  cap: "none",
  capShade: "none",
  jacket: "#2F5E7A",
  jacketShade: "#22465C",
  pack: "#B5553A",
  packShade: "#8E3F2A",
  glove: "#2a2a2a",
};

type Head = "beanie" | "bare" | "band" | "both";

// Head gear on a Person (hiker coords). Hair is drawn for bare / band heads (the Person has no cap).
const HeadGear: React.FC<{ p: HikerProps; mode: Head; cold?: number; lift?: number; fade?: number }> = ({ p, mode, cold = 0, lift = 0, fade = 1 }) => {
  const g = hikerGeometry(p);
  const [hx, hy] = g.head;
  const beanie = (
    <g transform={`translate(0,${-lift})`} opacity={fade}>
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
      {mode !== "beanie" && (
        <path d={`M${hx - 27},${hy - 2} Q${hx - 27},${hy - 33} ${hx + 2},${hy - 34} Q${hx + 24},${hy - 32} ${hx + 25},${hy - 12} Q${hx + 12},${hy - 20} ${hx - 6},${hy - 14} Z`} fill={JK.hair} />
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
const FaceJake: React.FC<{ cx: number; cy: number; s: number; mode: Head; beanieOff?: number; sweat?: number; cold?: number; ears?: number; steam?: number; bandOn?: number; eyes?: "tired" | "neutral" | "happy"; t: number }> = ({
  cx,
  cy,
  s,
  mode,
  beanieOff = 0,
  sweat = 0,
  cold = 0,
  ears = 0,
  steam = 0,
  bandOn = 1,
  eyes = "neutral",
  t,
}) => {
  const pulse = 0.75 + 0.25 * Math.sin(t * 7);
  const o = JK;
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      <defs>
        <filter id="fjBlur" x="-50%" y="-50%" width="200%" height="200%">
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
      {/* beard */}
      <path d="M-44,30 Q-30,104 32,100 Q96,96 104,34 Q86,64 44,66 Q6,66 -6,44 Q-20,40 -44,30 Z" fill={o.beard ?? o.hair} opacity={0.92} />
      {/* ear */}
      <ellipse cx={-62} cy={12} rx={20} ry={30} fill={o.skin} />
      <path d="M-66,-6 q-10,18 0,36" stroke={o.skinShade} strokeWidth={5} fill="none" strokeLinecap="round" />
      <ellipse cx={-62} cy={12} rx={20} ry={30} fill={COLD} opacity={0.45 * cold} />
      {ears > 0 && <ellipse cx={-62} cy={12} rx={34} ry={44} fill={COLD} opacity={0.5 * ears * pulse} filter="url(#fjBlur)" />}
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
          <path d={`M${dx},-32 q11,${eyes === "tired" ? 3 : -5} 22,${eyes === "tired" ? 4 : 0}`} stroke={o.hair} strokeWidth={4.5} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <path d="M44,0 q12,18 0,26" stroke={o.skinShade} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={eyes === "happy" ? "M22,50 q14,10 28,0" : eyes === "tired" ? "M22,54 q14,-3 28,0" : "M22,52 q14,2 28,0"} stroke="#5a2e22" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* hair (bare / band heads) */}
      {mode !== "beanie" && (
        <g>
          <path d="M-100,-10 Q-124,-110 -74,-136 q14,-26 44,-14 q20,-30 54,-12 q28,-24 56,0 q36,-10 50,26 q26,22 14,52 Q132,-60 118,-24 Q74,-66 0,-62 Q-62,-58 -100,-10 Z" fill={o.hair} />
          <path d="M-70,-100 q20,-30 50,-34 M-10,-118 q24,-22 56,-20 M50,-110 q30,-10 56,14 M-90,-60 q10,-30 30,-44" stroke="#3a281d" strokeWidth={6} fill="none" strokeLinecap="round" />
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
        <g transform={`translate(${beanieOff * 160},${-beanieOff * 260}) rotate(${beanieOff * 18})`} opacity={1 - at(beanieOff, [0.6, 1], [0, 1])}>
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

// ============ S1 HOOK MEDIUM: cold trailhead, Jake pulls his beanie on (0 - 2.84) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 2.84), rot: hh.rot };
  const g = 1560;
  const on = at(t, [0.3, 1.2], [0, 1], outExpo);
  const pulling = on < 0.98;
  const p: HikerProps = { x: 470, y: g + 40, scale: 2.5, walk: 0, lean: 0.04, poles: false, handOverride: pulling ? [30, -170] : [30, 20], breathe: Math.sin(t * 2.4) * 1.2 };
  const s = p.scale ?? 1;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={JK} expression="neutral" />
          <HeadGear p={p} mode="bare" />
          <g transform={`translate(0,${-(1 - on) * 26 * s})`}>
            <HeadGear p={p} mode="beanie" />
          </g>
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Particles seed={1361} n={18} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="248,240,228" cool="40,60,90" />
      <Title text={"His beanie\nwas soaked\nbefore the ridge."} t={t} t0={0} top={110} size={124} />
      <Chip text="Cold trailhead" t={t} t0={1.0} x={60} y={640} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: the steep climb, he heats up (2.84 - 5.40) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x - lt * 18, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.56), rot: hh.rot };
  const g = 1540;
  const ph = t * 2.2;
  const p: HikerProps = { x: 330 + lt * 60, y: g + 40 - lt * 40 * 0.25, scale: 2.0, phase: ph, walk: 0.7, lean: 0.26, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0, slope: 0.25 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={g - 200} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={0.25} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={JK} expression="tired" />
          <HeadGear p={p} mode="beanie" />
          <Sweat p={p} t={t} on={at(t, [3.6, 4.2], [0, 1])} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,246,226" />
      <Particles seed={1362} n={16} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="252,240,222" cool="40,60,90" />
      <Chip text="Steep climb" t={t} t0={3.05} x={60} y={200} icon="none" big />
      <Chip text="Head too hot" t={t} t0={4.2} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: sweaty face, beanie off and into the pocket (5.40 - 7.66) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.09, lt / 2.26), rot: hh.rot };
  const offB = at(t, [6.4, 7.2], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,240,220,0.8)">
          <Svg>
            <FaceJake cx={520} cy={1000} s={3.1} mode="both" beanieOff={offB} sweat={1} eyes="tired" t={t} bandOn={0} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1363} n={12} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="252,238,220" cool="40,55,80" vignette={0.55} />
      <Chip text="Sweaty beanie" t={t} t0={5.55} x={60} y={200} icon="x" big />
      <Chip text="Into the pocket" t={t} t0={6.5} x={60} y={330} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: open ridge wind on bare, damp ears (7.66 - 10.42) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6, at(t, [8.0, 8.1, 8.6], [0, 1, 0]) * 3);
  const cam: Cam = { x: hh.x - lt * 18, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.76), rot: hh.rot };
  const g = 1520;
  const ph = t * 2.4;
  const ear = at(t, [9.2, 9.6], [0, 1], outExpo);
  const p: HikerProps = { x: 420 + lt * 34, y: g + 30, scale: 2.3, phase: ph, walk: 0.45, lean: 0.24, poles: false, handOverride: ear > 0 ? [mix(40, -6, ear), mix(-10, -168, ear)] : [40, -10], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={g + 120} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={6} col="rgba(230,238,246,0.85)">
          <Person {...p} outfit={JK} expression="tired" />
          <HeadGear p={p} mode="bare" cold={at(t, [8.2, 9.4], [0, 1])} />
        </Subject>
      </Plane>
      <Blizzard seed={1364} n={36} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" />
      <Chip text="Ridge wind" t={t} t0={7.9} x={60} y={200} icon="none" big />
      <Chip text="Bare, damp ears" t={t} t0={9.0} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: the fix: on the climb, ear warmer headband on (10.42 - 14.12) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.7), rot: hh.rot };
  const g = 1560;
  const on = at(t, [11.7, 12.5], [0, 1], outExpo);
  const pulling = on > 0.02 && on < 0.98;
  const p: HikerProps = { x: 470, y: g + 40, scale: 2.5, walk: 0, lean: 0.04, poles: false, handOverride: pulling ? [30, -170] : [30, 20], breathe: Math.sin(t * 2.4) * 1.2 };
  const s = p.scale ?? 1;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={JK} expression="neutral" />
          <HeadGear p={p} mode="bare" />
          <g transform={`translate(0,${-(1 - on) * 50 * s})`} opacity={at(t, [11.6, 11.8], [0, 1])}>
            <HeadGear p={p} mode="band" />
          </g>
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,246,226" />
      <Particles seed={1365} n={16} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,226" cool="40,60,90" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={11.55} top={200} size={124} />
      <Chip text="On the climb" t={t} t0={11.65} x={60} y={200} icon="none" big />
      <Chip text="Ear warmer headband" t={t} t0={12.5} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: ears covered, heat out of the top (14.12 - 17.73) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 3.61), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,240,220,0.8)">
          <Svg>
            <FaceJake cx={520} cy={1040} s={3.1} mode="band" steam={at(t, [15.6, 16.3], [0, 1])} eyes="neutral" t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1366} n={12} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="252,240,224" cool="40,55,80" vignette={0.55} />
      <Chip text="Ears covered" t={t} t0={14.3} x={60} y={200} icon="check" big />
      <Chip text="Heat out the top" t={t} t0={15.75} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 MEDIUM: at the stop, beanie on over the band (17.73 - 19.45) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.06, 1.1, lt / 1.72), rot: hh.rot };
  const g = 1560;
  const on = at(t, [18.0, 18.7], [0, 1], outExpo);
  const pulling = on > 0.02 && on < 0.98;
  const p: HikerProps = { x: 560, y: g + 40, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: pulling ? [30, -170] : [30, 20], breathe: Math.sin(t * 2.4) * 1.2 };
  const s = p.scale ?? 1;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={JK} expression="happy" />
          <HeadGear p={p} mode="band" />
          <g transform={`translate(0,${-(1 - on) * 60 * s})`} opacity={at(t, [17.9, 18.05], [0, 1])}>
            <HeadGear p={p} mode="beanie" />
          </g>
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Particles seed={1367} n={14} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,226" cool="40,60,90" />
      <Chip text="Beanie at the stops" t={t} t0={17.9} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: on the ridge in golden light, dry and warm (19.45 - 21.55) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1520;
  const ph = t * 2.6;
  const p: HikerProps = { x: 400 + lt * 50, y: g + 40, scale: 2.4, phase: ph, walk: 0.55, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="h" treeY={g + 120} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={JK} expression="happy" />
          <HeadGear p={p} mode="band" />
          <HeadSteam p={p} t={t} k={0.6} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.45} col="255,236,200" />
      <Particles seed={1368} n={22} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,226,180" />
      <Readout label="AT THE RIDGE" value="Dry and warm" ok={true} t={t} t0={19.6} x={60} y={200} />
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

export const V136: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.89} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.84} to={5.45} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.84} />
    </Scene>
    <Scene from={5.4} to={7.71} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.4} />
    </Scene>
    <Scene from={7.66} to={10.47} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.66} />
    </Scene>
    <Scene from={10.42} to={14.17} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={10.42} />
    </Scene>
    <Scene from={14.12} to={17.78} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.12} />
    </Scene>
    <Scene from={17.73} to={19.5} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={17.73} />
    </Scene>
    <Scene from={19.45} to={21.6} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={19.45} />
    </Scene>
    <Scene from={21.45} to={27} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.84, 1600],
        [2.84, 5.4, 1600],
        [5.4, 7.66, 1660],
        [7.66, 10.42, 1600],
        [10.42, 14.12, 1600],
        [14.12, 17.73, 1660],
        [17.73, 19.45, 1600],
        [19.45, 21.45, 1600],
      ]}
    />
  </AbsoluteFill>
);
