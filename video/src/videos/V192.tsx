// V192: "Two pairs of socks. Colder feet." Short format (16.2 s, 42 words), cinematic C01 style, cold winter walk.
// Product: Merino Wool Hiking Socks — 80% Merino, Cushioned Crew, $19.99 (live Shopify). End card = real store cover, cut out.
// Advice (simple, safe): doubling cotton socks in tight boots squeezes the feet and the cotton gets damp; squeezed feet get
// less warm blood flow. One good wool pair with room to wiggle the toes. No numbers, no medical promises.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { DAWN, WGOLD, WINTER, WinterBackdrop, FrostTrail } from "../winter";
import vo from "../vo/v192.json";

const words = vo.words as unknown as Word[];

const WOOL = "#8e8b86"; // grey merino, like the real pair on the store cover
const WOOL2 = "#5d5b58";
const COTTON = "#eceae4";
const COTTON2 = "#d6d3cb";

const NICK: Outfit = {
  ...JAKE,
  skin: "#C68E68",
  skinShade: "#A8724F",
  hair: "#1f1a16",
  beard: "#1f1a16",
  cap: "#8E2B42",
  capShade: "#6e2134",
  jacket: "#2C4A63",
  jacketShade: "#203a4f",
  pants: "#4b4f3e",
  pantsShade: "#383b2e",
  boot: "#6B4630",
  sole: "#2A2421",
  pack: "#556B4A",
  packShade: "#425438",
  glove: "#3a3f46",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Close-up lower leg in a hiking boot, side view, facing right (screen coords).
// layers: 1 or 2 sock cuffs showing. tight 0..1 = pressure marks on the boot; cold 0..1 = blue chill at the toes;
// warm 0..1 = soft warm glow; wiggle 0..1 = toe-room arrows. step = 0..1 lift of the foot.
const Leg: React.FC<{ sock: string; sockShade: string; layers: 1 | 2; damp?: number; tight?: number; cold?: number; warm?: number; wiggle?: number; step: number; t: number }> = ({
  sock,
  sockShade,
  layers,
  damp = 0,
  tight = 0,
  cold = 0,
  warm = 0,
  wiggle = 0,
  step,
  t,
}) => {
  const dy = -step * 70;
  const dx = step * 30;
  const pinch = tight * 14 * (1 + 0.15 * Math.sin(t * 6));
  return (
    <g transform={`translate(${dx},${dy}) rotate(${-step * 4} 520 1600)`}>
      <rect x={380} y={-200} width={300} height={1110} rx={40} fill={NICK.pants} />
      <rect x={370} y={880} width={320} height={70} rx={20} fill={NICK.pantsShade} />
      {/* sock cuffs: two layers bunch up as a thick double roll */}
      {layers === 2 && <rect x={392} y={930} width={276} height={60} rx={18} fill={COTTON2} />}
      <rect x={404} y={layers === 2 ? 980 : 940} width={252} height={layers === 2 ? 220 : 260} fill={sock} />
      <rect x={400} y={layers === 2 ? 980 : 940} width={260} height={34} rx={10} fill={sockShade} />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={430 + i * 40} y1={layers === 2 ? 1022 : 985} x2={430 + i * 40} y2={1180} stroke={sockShade} strokeWidth={5} opacity={0.5} />
      ))}
      {layers === 2 && Array.from({ length: 4 }, (_, i) => <path key={`w${i}`} d={`M410,${1040 + i * 34} q120,-14 240,0`} stroke={COTTON2} strokeWidth={6} fill="none" />)}
      {damp > 0 && <rect x={404} y={mix(1180, 1000, damp)} width={252} height={mix(0, 180, damp)} fill="#8d99a0" opacity={0.55} />}
      {/* hiking boot; tight = sides pressed in */}
      <path d={`M${360 + pinch},1180 L${700 - pinch},1180 L${720 - pinch},1480 Q900,${1500 + pinch} 990,1570 Q1040,1620 1030,1700 L300,1700 Q280,1580 ${330 + pinch},1470 Z`} fill={NICK.boot} />
      <path d={`M${360 + pinch},1180 L${700 - pinch},1180 L${700 - pinch},1230 L${360 + pinch},1230 Z`} fill="#8a5f42" />
      {[1290, 1360, 1430].map((yy) => (
        <path key={yy} d={`M${420 + pinch},${yy} l${200 - pinch * 2},-14`} stroke="#d9c49a" strokeWidth={10} strokeLinecap="round" />
      ))}
      <path d="M300,1640 L1035,1640 L1032,1700 L300,1700 Z" fill="#4a3222" />
      <rect x={290} y={1690} width={760} height={44} rx={14} fill={NICK.sole} />
      {tight > 0 && (
        <g opacity={tight}>
          {[[250, 1420, 1], [1100, 1560, -1], [560, 1110, 0]].map(([x, y, d], i) =>
            d === 0 ? (
              <path key={i} d={`M${x},${y - 60} l0,50 m-22,-22 l22,22 l22,-22`} stroke="#ffffff" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path key={i} d={`M${x},${y} l${d * 60},0 m${-d * 22},-22 l${d * 22},22 l${-d * 22},22`} stroke="#ffffff" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            ),
          )}
        </g>
      )}
      {cold > 0 && (
        <g opacity={cold}>
          <circle cx={880} cy={1600} r={110 * (1 + 0.12 * Math.sin(t * 7))} fill="#7fc4ff" opacity={0.3} />
          <circle cx={880} cy={1600} r={55 * (1 + 0.12 * Math.sin(t * 7))} fill="#bfe4ff" opacity={0.55} />
        </g>
      )}
      {warm > 0 && (
        <g opacity={warm}>
          <circle cx={820} cy={1590} r={130 * (1 + 0.08 * Math.sin(t * 4))} fill="#ffb15e" opacity={0.22} />
          <circle cx={820} cy={1590} r={65} fill="#ffd9a0" opacity={0.3} />
        </g>
      )}
      {wiggle > 0 && (
        <g opacity={wiggle} transform={`translate(${Math.sin(t * 10) * 10},0)`}>
          <path d="M860,1450 q60,-50 120,0" stroke="#ffffff" strokeWidth={9} fill="none" strokeLinecap="round" />
          <path d="M975,1450 l-6,-30 m6,30 l-30,-4" stroke="#ffffff" strokeWidth={9} fill="none" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// Cut-away view of a foot inside the boot: a warm red line (blood flow) that thins as the boot squeezes.
const FootFlow: React.FC<{ squeeze: number; t: number }> = ({ squeeze, t }) => {
  const w = mix(26, 7, squeeze);
  const dash = (t * 260) % 80;
  const cold = squeeze;
  return (
    <g>
      {/* boot outline */}
      <path d={`M${330 + squeeze * 40},700 L${690 - squeeze * 40},700 L${720 - squeeze * 30},1240 Q940,${1270 + squeeze * 20} 1010,1350 Q1050,1420 1030,1500 L280,1500 Q250,1340 ${320 + squeeze * 30},1200 Z`} fill="none" stroke={NICK.boot} strokeWidth={34} strokeLinejoin="round" />
      <rect x={270} y={1490} width={780} height={44} rx={14} fill={NICK.sole} />
      {/* foot and lower leg */}
      <path d={`M${400 + squeeze * 30},500 L${620 - squeeze * 30},500 L${640 - squeeze * 26},1230 Q880,${1260 + squeeze * 18} 960,1360 Q990,1430 950,1460 L340,1460 Q310,1320 ${370 + squeeze * 26},1200 Z`} fill={NICK.skin} opacity={0.92} />
      {/* blood flow line from leg to toes */}
      <path d="M520,520 L525,1230 Q560,1330 700,1360 Q840,1380 920,1410" stroke="#c0392b" strokeWidth={w} fill="none" strokeLinecap="round" />
      <path d="M520,520 L525,1230 Q560,1330 700,1360 Q840,1380 920,1410" stroke="#ff8a7a" strokeWidth={w * 0.4} fill="none" strokeLinecap="round" strokeDasharray="20 60" strokeDashoffset={-dash} />
      {/* toes go cold */}
      <circle cx={900} cy={1410} r={90 * (1 + 0.1 * Math.sin(t * 7))} fill="#7fc4ff" opacity={0.35 * cold} />
      {/* squeeze arrows */}
      <g opacity={squeeze}>
        <path d="M150,1000 l90,0 m-28,-28 l28,28 l-28,28" stroke="#ffffff" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M930,1000 l-90,0 m28,-28 l-28,28 l28,28" stroke="#ffffff" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Nick sets off on a cold morning walk (0 - 3.25) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.04, 1.1, t / 3.25), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.1;
  const slow = at(t, [1.8, 2.9], [1, 0.4]);
  const p: HikerProps = { x: 360 + t * 40 * slow, y: g + 20, scale: 2.4, phase: ph, walk: 0.6 * slow, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5 * slow) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="a" treeY={g - 220} t={t} snow={0.8} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,226,190,0.85)">
          <Person {...p} outfit={NICK} expression={t > 2.2 ? "tired" : "neutral"} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a40" side="right" />
      </Plane>
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.22} col="255,220,180" />
      <Particles seed={1921} n={16} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={300} sunY={760} warm="255,214,170" cool="40,60,90" />
      <Title text={"Two pairs\nof socks.\nColder feet."} t={t} t0={0} top={110} size={135} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: double cotton socks crammed in the boot, toes go cold (3.25 - 6.25) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y - 40, zoom: mix(1.0, 1.07, lt / 3.0), rot: hh.rot };
  const cyc = (lt * 0.8) % 1;
  const step = Math.max(0, Math.sin(cyc * Math.PI)) * at(lt, [0, 0.2], [0, 1]) * at(t, [5.2, 5.6], [1, 0]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1250} blur={12} t={t} snow={0.8} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={1690} snow={1} />
        <Subject rimX={5} col="rgba(236,242,248,0.85)">
          <Leg sock={COTTON} sockShade={COTTON2} layers={2} damp={at(t, [4.2, 5.4], [0, 1])} tight={at(t, [3.4, 3.9], [0, 1])} cold={at(t, [5.2, 5.9], [0, 1])} step={step} t={t} />
        </Subject>
      </Plane>
      <Particles seed={1922} n={14} col="#ffffff" fall={12} />
      <Grade sunX={800} sunY={560} warm="240,240,240" cool="30,50,100" vignette={0.55} />
      <Chip text="Tight boots" t={t} t0={3.4} x={60} y={200} icon="x" big />
      <Chip text="Damp cotton" t={t} t0={4.2} x={60} y={330} icon="x" big />
      <Chip text="Numb toes" t={t} t0={5.3} x={60} y={460} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP CUT-AWAY: squeezed foot, the warm flow thins (6.25 - 8.33) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.1), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={1250} blur={18} t={t} snow={0.8} />
      <AbsoluteFill style={{ background: "rgba(16,28,40,0.45)" }} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(236,242,248,0.6)">
          <Svg>
            <g transform="translate(0,-40)">
              <FootFlow squeeze={at(t, [6.5, 7.6], [0, 1], outExpo)} t={t} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Grade sunX={800} sunY={560} warm="240,240,240" cool="30,50,100" vignette={0.6} />
      <Chip text="Squeezed foot" t={t} t0={6.4} x={60} y={200} icon="none" big />
      <Chip text="Less warm blood" t={t} t0={7.3} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: one grey wool pair, room to wiggle, warm trail light (8.33 - 11.78) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y - 40, zoom: at(lt, [0, 1.0], [1.12, 1.03], outExpo), rot: hh.rot };
  const cyc = (lt * 0.8) % 1;
  const step = Math.max(0, Math.sin(cyc * Math.PI)) * at(lt, [0.3, 0.6], [0, 1]) * at(t, [10.1, 10.4], [1, 0]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="d" treeY={1250} blur={12} t={t} snow={0.8} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={1690} snow={1} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Leg sock={WOOL} sockShade={WOOL2} layers={1} warm={at(t, [8.8, 9.6], [0, 1])} wiggle={at(t, [10.3, 10.6], [0, 1])} step={step} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2e2618" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.4} col="255,236,200" />
      <Particles seed={1924} n={18} col="#fff3d6" fall={6} />
      <Grade sunX={760} sunY={560} warm="255,226,180" vignette={0.5} />
      <Chip text="The rule" t={t} t0={8.45} x={60} y={170} icon="none" big />
      <Chip text="One good wool pair" t={t} t0={9.2} x={60} y={300} icon="check" big />
      <Chip text="Room to wiggle your toes" t={t} t0={10.4} x={60} y={430} icon="check" big />
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
      save="Save this before winter"
    />
  );
};

export const V192: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.33} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.25} to={6.33} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.25} />
    </Scene>
    <Scene from={6.25} to={8.41} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={6.25} />
    </Scene>
    <Scene from={8.33} to={11.86} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={8.33} />
    </Scene>
    <Scene from={11.76} to={16.2} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.25, 1600],
        [3.25, 6.25, 1600],
        [6.25, 8.33, 1600],
        [8.33, 11.76, 1600],
      ]}
    />
  </AbsoluteFill>
);
