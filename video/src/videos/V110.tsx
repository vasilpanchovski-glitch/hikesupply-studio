// V110: "Those footprints aren't the trail." in the cinematic C01 style. Story for What To Do If You Get Lost ($5.99, live
// Shopify), posted Dec 4. Advice kept conservative: in fresh snow other people's tracks can lead anywhere; stop, stay calm,
// check the map, go back to the last blaze you passed. No walking on the frozen creek is shown.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, WINTER, STORM, WinterBackdrop } from "../winter";
import { PAPER, INK } from "../trip";
import vo from "../vo/v110.json";

const words = vo.words as unknown as Word[];

// Soft dark band behind the lower-third captions on bright snow.
const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.38) 45%, rgba(12,22,28,0.38) 70%, rgba(12,22,28,0) 100%)" }} />
);

const BLAZE = "#e8b320";

const SAM: Outfit = {
  ...JAKE,
  skin: "#C58C68",
  skinShade: "#A7704E",
  hair: "#2a201a",
  beard: null,
  cap: "#C2662E",
  capShade: "#9a4f22",
  jacket: "#2F5D86",
  jacketShade: "#24486a",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#6d7f4a",
  packShade: "#566539",
  glove: "#2a2a2a",
};

// Snowy ground. tilt > 0 rises to the right.
const SnowGround: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y} Q540,${y - 30} 1480,${y} L1480,2600 L-400,2600 Z`} fill={SNOW} />
    <path d={`M-400,${y + 160} Q540,${y + 130} 1480,${y + 160} L1480,2600 L-400,2600 Z`} fill={SNOW2} opacity={0.6} />
    {Array.from({ length: 12 }, (_, i) => (
      <ellipse key={i} cx={-300 + i * 150} cy={y + 60 + ((i * 71) % 260)} rx={60} ry={8} fill="#cfd9df" opacity={0.6} />
    ))}
  </Svg>
);

// A line of boot prints from (x0,y0) to (x1,y1), shown up to k (0..1).
const Prints: React.FC<{ x0: number; y0: number; x1: number; y1: number; n: number; s?: number; k?: number }> = ({ x0, y0, x1, y1, n, s = 1, k = 1 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const u = i / (n - 1);
      if (u > k) return null;
      const x = mix(x0, x1, u);
      const y = mix(y0, y1, u);
      const side = i % 2 ? 1 : -1;
      const ss = s * mix(0.6, 1.2, u);
      return <ellipse key={i} cx={x + side * 14 * ss} cy={y} rx={16 * ss} ry={7 * ss} fill="#b3c2cc" />;
    })}
  </g>
);

const Trunk: React.FC<{ x: number; y: number; h: number; w?: number; blaze?: number }> = ({ x, y, h, w = 70, blaze = 0 }) => (
  <g>
    <rect x={x - w / 2} y={y - h} width={w} height={h} fill="#5a4636" />
    <rect x={x - w / 2} y={y - h} width={w * 0.3} height={h} fill="#6e5643" />
    <rect x={x - w / 2 - 6} y={y - h} width={w + 12} height={18} rx={9} fill={SNOW} />
    {blaze > 0 && <rect x={x - w * 0.18} y={y - h * 0.62} width={w * 0.36} height={w * 0.7} rx={3} fill={BLAZE} opacity={blaze} />}
  </g>
);

const Creek: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y} Q540,${y - 20} 1480,${y + 10} L1480,${y + 150} Q540,${y + 130} -400,${y + 160} Z`} fill="#a9c8d8" />
    <path d={`M-400,${y + 20} Q540,${y} 1480,${y + 30}`} stroke="#e6f1f6" strokeWidth={10} fill="none" opacity={0.8} />
    <path d={`M100,${y + 40} l60,40 l-20,40 M500,${y + 30} l40,50 l50,10 M820,${y + 50} l-40,40`} stroke="#7fa7bb" strokeWidth={5} fill="none" />
    <path d={`M-400,${y - 10} Q540,${y - 40} 1480,${y} L1480,${y + 8} Q540,${y - 22} -400,${y + 4} Z`} fill={SNOW} />
  </Svg>
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

// ============ S1 HOOK WIDE: fresh snow, Sam follows a line of footprints, a blaze off to the side (0 - 4.67) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 4.67), rot: hh.rot };
  const g = 1460;
  const ph = t * 3;
  const p: HikerProps = { x: 300 + t * 40, y: g + 120, scale: 2.2, phase: ph, walk: 0.7, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Svg>
          <Prints x0={420} y0={g + 120} x1={1100} y1={g + 20} n={16} s={1.1} />
          <Trunk x={140} y={g + 30} h={700} blaze={1} />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={SAM} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.26} col="255,246,220" />
      <Particles seed={1101} n={22} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Title text={"Those footprints\naren't the trail."} t={t} t0={0} top={130} size={120} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: boots stepping into the prints: easy (4.67 - 5.66) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: mix(1.04, 1.09, lt / 0.99), rot: hh.rot };
  const s = 4.6;
  const ph = t * 3;
  const p: HikerProps = { x: 420 + lt * 120, y: 1500, scale: s, phase: ph, walk: 0.7, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={700} t={t} blur={10} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={1180} />
        <Svg>
          <Prints x0={-200} y0={1560} x1={1300} y1={1420} n={10} s={2.6} />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={SAM} expression="happy" />
        </Subject>
      </Plane>
      <Particles seed={1102} n={22} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Chip text="Easy to follow" t={t} t0={4.7} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: the prints end at a frozen creek, nowhere near the trail (5.66 - 9.31) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45, at(lt, [0.6, 0.9], [0.8, 0]));
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.0, 1.08, lt / 3.65), rot: hh.rot };
  const g = 1360;
  const walk = at(lt, [0, 0.8], [0.7, 0]);
  const ph = t * 3;
  const p: HikerProps = { x: mix(300, 380, at(lt, [0, 0.8], [0, 1])), y: g + 30, scale: 2.1, phase: ph, walk, lean: 0.08, poles: false, handOverride: walk > 0.1 ? freeHand(ph, 0.5) : [40, 40], breathe: Math.sin(t * 3) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Creek y={g + 90} />
        <Svg>
          <Prints x0={-100} y0={g + 10} x1={560} y1={g + 60} n={9} s={1.0} />
        </Svg>
        <Subject rimX={5} col="rgba(220,230,255,0.8)">
          <Person {...p} outfit={SAM} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="both" />
      </Plane>
      <Particles seed={1103} n={22} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="230,235,245" cool="40,60,90" vignette={0.55} />
      <Chip text="Tracks end at a frozen creek" t={t} t0={7.0} x={60} y={200} icon="x" big />
      <Chip text="No trail here" t={t} t0={7.7} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP (looking down): the prints wander in a loop: someone else was lost too (9.31 - 11.24) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 1.93), rot: hh.rot + lt * 0.6 };
  const k = at(t, [9.35, 10.6], [0, 1]);
  const N = 30;
  return (
    <AbsoluteFill style={{ background: SNOW }}>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={-400} width={1880} height={2720} fill={SNOW} />
          {Array.from({ length: 20 }, (_, i) => (
            <ellipse key={i} cx={(i * 263) % 1080} cy={(i * 397) % 1920} rx={90} ry={14} fill={SNOW2} opacity={0.5} />
          ))}
        </Svg>
        <Subject rimX={0}>
            {Array.from({ length: N }, (_, i) => {
              const u = i / (N - 1);
              if (u > k) return null;
              const a = u * Math.PI * 2.6 - 1.2;
              const r = 330 - u * 90;
              const x = 540 + Math.cos(a) * r;
              const y = 960 + Math.sin(a) * r * 1.25;
              const rot = (a * 180) / Math.PI + 90;
              const side = i % 2 ? 1 : -1;
              return (
                <g key={i} transform={`translate(${x + Math.cos(a) * side * 22},${y + Math.sin(a) * side * 22}) rotate(${rot})`}>
                  <ellipse cx={0} cy={0} rx={22} ry={44} fill="#a9b9c4" />
                  <ellipse cx={0} cy={-28} rx={18} ry={14} fill="#97a9b5" />
                </g>
              );
            })}
        </Subject>
      </Plane>
      <Particles seed={1104} n={18} col="#ffffff" fall={20} />
      <LowScrim />
      <Grade sunX={800} sunY={400} warm="240,240,250" cool="40,60,90" vignette={0.5} />
      <Chip text="Someone else was lost too" t={t} t0={9.4} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: Sam's face: stop, stay calm, think (11.24 - 13.77) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.07, lt / 2.53), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 520, y: 1700 + 182 * s - 80, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 1.4) * 1.6 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="e" treeY={1250} t={t} blur={9} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(220,230,255,0.85)">
          <Person {...p} outfit={SAM} expression="neutral" />
          <Breath p={p} t={t * 0.6} />
        </Subject>
      </Plane>
      <Particles seed={1105} n={18} col="#ffffff" fall={20} />
      <Grade sunX={820} sunY={520} warm="230,235,245" cool="40,60,90" vignette={0.6} />
      <Chip text="Stop" t={t} t0={11.52} x={60} y={200} icon="check" big />
      <Chip text="Stay calm" t={t} t0={12.07} x={60} y={330} icon="check" big />
      <Chip text="Think" t={t} t0={12.93} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the map in gloved hands, last blaze marked (13.77 - 15.25) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.48), rot: hh.rot };
  const open = at(t, [13.8, 14.3], [0, 1], outExpo);
  const pin = at(t, [14.6, 14.9], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="f" treeY={1000} t={t} blur={10} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(230,235,255,0.8)">
          <g transform={`translate(540,1000) scale(${mix(0.6, 1, open)}) rotate(-3)`}>
            <rect x={-410} y={-330} width={820} height={660} rx={10} fill={PAPER} />
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M-400,${-200 + i * 90} q200,-60 400,0 t400,0`} stroke="#c9bfa8" strokeWidth={4} fill="none" />
            ))}
            <path d="M-380,240 Q-200,100 -60,60 Q120,0 200,-140 Q260,-240 380,-280" stroke="#a24a2e" strokeWidth={8} strokeDasharray="22 14" fill="none" />
            <path d="M-100,330 Q-120,150 -160,40" stroke="#6fa0c0" strokeWidth={10} fill="none" />
            <g opacity={pin} transform={`translate(-60,60) scale(${pin})`}>
              <circle cx={0} cy={-40} r={26} fill={BLAZE} stroke={INK} strokeWidth={5} />
              <path d="M0,-14 L0,0" stroke={INK} strokeWidth={6} />
            </g>
            <text x={-380} y={-270} fontFamily="Inter" fontWeight={700} fontSize={34} fill={INK}>
              TRAIL MAP
            </text>
          </g>
          <ellipse cx={150} cy={1320} rx={110} ry={80} fill="#2a2a2a" />
          <ellipse cx={930} cy={1320} rx={110} ry={80} fill="#2a2a2a" />
          <rect x={20} y={1340} width={230} height={500} rx={80} fill={SAM.jacket} />
          <rect x={830} y={1340} width={230} height={500} rx={80} fill={SAM.jacket} />
        </Subject>
      </Plane>
      <Particles seed={1106} n={18} col="#ffffff" fall={20} />
      <Grade sunX={820} sunY={520} warm="230,235,245" cool="40,60,90" vignette={0.55} />
      <Chip text="Checked the map" t={t} t0={14.27} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 MEDIUM: back at the tree with the last blaze (15.25 - 18.27) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 16, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.02), rot: hh.rot };
  const g = 1480;
  const walk = at(t, [16.6, 17.9], [0.7, 0]);
  const ph = t * 3;
  const p: HikerProps = { x: mix(900, 560, at(t, [15.4, 17.9], [0, 1])), y: g + 100, scale: 2.4, phase: ph, walk, lean: 0.06, poles: false, handOverride: walk > 0.1 ? freeHand(ph, 0.5) : [70, -30], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={g - 80} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Svg>
          <Trunk x={330} y={g + 60} h={1100} w={110} blaze={at(t, [15.4, 15.7], [0.4, 1])} />
          <Prints x0={960} y0={g + 140} x1={560} y1={g + 110} n={8} s={1.1} k={at(t, [15.4, 17.9], [0, 1])} />
        </Svg>
        <Subject rimX={-6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={SAM} expression="happy" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.24} col="255,246,220" />
      <Particles seed={1107} n={20} col="#ffffff" fall={24} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Chip text="Back to the last blaze" t={t} t0={15.5} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: the real trail, blazes tree to tree, Sam on it (18.27 - 22.75) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 26, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1480;
  const ph = t * 3.2;
  const p: HikerProps = { x: 300 + lt * 55, y: g + 100, scale: 2.2, phase: ph, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="h" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Svg>
          {[60, 520, 980, 1440].map((x, i) => (
            <Trunk key={x} x={x} y={g + 40 - (i % 2) * 20} h={760} blaze={at(t, [18.6 + i * 0.3, 19.0 + i * 0.3], [0, 1])} />
          ))}
          <Prints x0={1300} y0={g + 60} x1={1500} y1={g - 10} n={6} s={0.9} />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,210,0.9)">
          <Person {...p} outfit={SAM} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.34} col="255,240,210" />
      <Particles seed={1108} n={22} col="#ffffff" fall={24} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,236,200" />
      <Chip text="Follow the blazes" t={t} t0={19.5} x={60} y={200} icon="check" big />
      <Chip text="And your map" t={t} t0={20.08} x={60} y={330} icon="check" big />
      <Chip text="Not other people's tracks" t={t} t0={20.9} x={60} y={460} icon="x" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
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
      save="Save this before your first snowy hike"
    />
  );
};

export const V110: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.72} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.67} to={5.71} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.67} />
    </Scene>
    <Scene from={5.66} to={9.36} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.66} />
    </Scene>
    <Scene from={9.31} to={11.29} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.31} />
    </Scene>
    <Scene from={11.24} to={13.82} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.24} />
    </Scene>
    <Scene from={13.77} to={15.3} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={13.77} />
    </Scene>
    <Scene from={15.25} to={18.32} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={15.25} />
    </Scene>
    <Scene from={18.27} to={22.8} fadeIn={0.12} fadeOut={0.1}>
      <S8 off={18.27} />
    </Scene>
    <Scene from={22.6} to={27.5} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.67, 1560],
        [4.67, 5.66, 1560],
        [5.66, 9.31, 1560],
        [9.31, 11.24, 1560],
        [11.24, 13.77, 1560],
        [13.77, 15.25, 1560],
        [15.25, 18.27, 1560],
        [18.27, 22.6, 1560],
      ]}
    />
  </AbsoluteFill>
);
