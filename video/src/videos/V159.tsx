// V159: "Twenty minutes with the dog. Frozen toes." Short format (16 s, 42 words), cinematic C01 style.
// Everyday cold-weather use of the Merino Wool Hiking Socks (80% Merino, Cushioned Crew, $19.99, live Shopify).
// Advice (conservative): wool keeps much of its warmth when damp, cotton does not; pair wool socks with shoes that keep the wet out.
// End card = the real Shopify main photo (four colours on wood, a lifestyle shot, so the boxed photo card is used).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { Dog, dogCollar } from "../dog";
import { DAWN, WGOLD, WinterBackdrop, FrostTrail } from "../winter";
import vo from "../vo/v159.json";

const words = vo.words as unknown as Word[];

const SOCK = "#5f7346"; // green merino, like the real green pair
const SOCK2 = "#4a5a36";
const COTTON = "#eceae4";
const LEASH = "#2F7F86";

const EMMA: Outfit = {
  ...GUIDE,
  skin: "#F0C4A0",
  skinShade: "#D4A27E",
  hair: "#4a2e1c",
  ponytail: "#4a2e1c",
  beard: null,
  cap: "#B83A55",
  capShade: "#8E2B42",
  jacket: "#2F5D6E",
  jacketShade: "#234755",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  boot: "#8a8f96",
  sole: "#e8e8e8",
  pack: "#3E4F5C",
  packShade: "#2C3943",
  glove: "#3a3f46",
};

const toScreen = (p: HikerProps, q: readonly number[]): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};
const handOf = (p: HikerProps) => toScreen(p, hikerGeometry(p).arms[1].hand);

const Leash: React.FC<{ a: [number, number]; b: [number, number]; w?: number; sag?: number }> = ({ a, b, w = 6, sag = 60 }) => (
  <path d={`M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${Math.max(a[1], b[1]) + sag} ${b[0]},${b[1]}`} stroke={LEASH} strokeWidth={w} fill="none" strokeLinecap="round" />
);

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Wet slush on the path: grey-white lumps and puddles (screen coords, y = surface line).
const Slush: React.FC<{ y: number; big?: boolean }> = ({ y, big = false }) => {
  const k = big ? 2.4 : 1;
  return (
    <g>
      {Array.from({ length: 9 }, (_, i) => {
        const x = -100 + i * 150 + ((i * 37) % 60);
        return <ellipse key={`p${i}`} cx={x} cy={y + 30 * k + (i % 3) * 22 * k} rx={(70 + (i % 4) * 22) * k} ry={(10 + (i % 2) * 5) * k} fill="#7f97a6" opacity={0.55} />;
      })}
      {Array.from({ length: 14 }, (_, i) => {
        const x = -60 + i * 90 + ((i * 53) % 50);
        const yy = y + 4 * k + ((i * 29) % 70) * k;
        return <ellipse key={`s${i}`} cx={x} cy={yy} rx={(26 + (i % 3) * 12) * k} ry={(9 + (i % 2) * 4) * k} fill={i % 2 ? "#dfe5e8" : "#c3ccd2"} />;
      })}
    </g>
  );
};

// Close-up lower leg, side view, facing right (screen coords). shoe: low mesh sneaker or waterproof boot.
// wet 0..1 darkens a cotton sock; cold 0..1 = blue chill glow at the toes. step = 0..1 lift of the foot.
const Leg: React.FC<{ shoe: "sneaker" | "boot"; sock: string; sockShade: string; wet?: number; cold?: number; step: number; t: number }> = ({ shoe, sock, sockShade, wet = 0, cold = 0, step, t }) => {
  const dy = -step * 70;
  const dx = step * 30;
  const sneaker = shoe === "sneaker";
  const cuffY = sneaker ? 1240 : 1150;
  return (
    <g transform={`translate(${dx},${dy}) rotate(${-step * 4} 520 1600)`}>
      <rect x={380} y={-200} width={300} height={1110} rx={40} fill={EMMA.pants} />
      <rect x={370} y={880} width={320} height={70} rx={20} fill={EMMA.pantsShade} />
      {/* sock between pants and shoe */}
      <rect x={404} y={940} width={252} height={sneaker ? 440 : 300} fill={sock} />
      <rect x={400} y={940} width={260} height={34} rx={10} fill={sockShade} />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={430 + i * 40} y1={985} x2={430 + i * 40} y2={cuffY} stroke={sockShade} strokeWidth={5} opacity={0.5} />
      ))}
      {wet > 0 && <rect x={404} y={mix(1380, 1000, wet)} width={252} height={mix(0, 380, wet)} fill="#8d99a0" opacity={0.6} />}
      {sneaker ? (
        <g>
          {/* low mesh running shoe */}
          <path d="M390,1250 L670,1250 Q700,1380 760,1450 Q960,1490 1010,1580 Q1030,1660 990,1690 L330,1690 Q300,1560 340,1420 Z" fill="#8fa7b8" />
          {Array.from({ length: 8 }, (_, i) => (
            <circle key={i} cx={460 + i * 62} cy={1520 + (i % 2) * 30} r={10} fill="#7e8892" />
          ))}
          <path d="M600,1300 Q700,1420 820,1460" stroke="#eeeeee" strokeWidth={14} fill="none" strokeLinecap="round" />
          <rect x={310} y={1680} width={720} height={44} rx={16} fill="#e8e8e8" />
          {/* dark wet patch soaking through the mesh */}
          <ellipse cx={850} cy={1600} rx={mix(0, 170, wet)} ry={mix(0, 80, wet)} fill="#4f5a66" opacity={0.55} />
        </g>
      ) : (
        <g>
          {/* waterproof hiking boot */}
          <path d="M360,1180 L700,1180 L720,1480 Q900,1500 990,1570 Q1040,1620 1030,1700 L300,1700 Q280,1580 330,1470 Z" fill="#6B4630" />
          <path d="M360,1180 L700,1180 L700,1230 L360,1230 Z" fill="#8a5f42" />
          {[1290, 1360, 1430].map((yy) => (
            <path key={yy} d={`M420,${yy} l200,-14`} stroke="#d9c49a" strokeWidth={10} strokeLinecap="round" />
          ))}
          <path d="M300,1640 L1035,1640 L1032,1700 L300,1700 Z" fill="#4a3222" />
          <rect x={290} y={1690} width={760} height={44} rx={14} fill="#2A2421" />
        </g>
      )}
      {cold > 0 && (
        <g opacity={cold}>
          <circle cx={880} cy={1600} r={110 * (1 + 0.12 * Math.sin(t * 7))} fill="#7fc4ff" opacity={0.3} />
          <circle cx={880} cy={1600} r={55 * (1 + 0.12 * Math.sin(t * 7))} fill="#bfe4ff" opacity={0.55} />
        </g>
      )}
    </g>
  );
};

// Slush splash drops around the landing foot. k = 0..1 progress of one splash.
const Splash: React.FC<{ x: number; y: number; k: number }> = ({ x, y, k }) =>
  k <= 0 || k >= 1 ? null : (
    <g opacity={1 - k}>
      {Array.from({ length: 9 }, (_, i) => {
        const a = Math.PI * (0.1 + (0.8 * i) / 8);
        const r = 60 + 220 * k;
        return <circle key={i} cx={x - Math.cos(a) * r} cy={y - Math.sin(a) * r * 0.8 + 260 * k * k} r={12 - i % 3 * 3} fill="#d7e1e6" />;
      })}
    </g>
  );

// ============ S1 HOOK MEDIUM: Emma and the dog on a slushy dawn path (0 - 3.15) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.04, 1.1, t / 3.15), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.2;
  const slow = at(t, [1.6, 2.6], [1, 0.35]);
  const p: HikerProps = { x: 300 + t * 34, y: g + 20, scale: 2.3, phase: ph, walk: 0.55 * slow, lean: 0.06, poles: false, handOverride: [40, 22], breathe: Math.sin(t * 2.2) * 1.5 };
  const dx = 640 + t * 40;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="a" treeY={g - 220} t={t} snow={0.6} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <Slush y={g + 10} />
        </Svg>
        <Subject rimX={5} col="rgba(255,226,190,0.85)">
          <Person {...p} outfit={EMMA} expression={t > 1.8 ? "tired" : "neutral"} noPack />
          <Dog x={dx} y={g + 26} s={1.2} phase={t * 5} walk={0.8} mood="happy" tailWag={t * 12} />
          <Leash a={handOf(p)} b={dogCollar(dx, g + 26, 1.2)} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a40" side="right" />
      </Plane>
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.2} col="255,220,180" />
      <Particles seed={1591} n={16} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={300} sunY={760} warm="255,214,170" cool="40,60,90" />
      <Title text={"Twenty minutes\nwith the dog.\nFrozen toes."} t={t} t0={0} top={110} size={120} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: mesh sneaker in the slush, the cotton sock soaks through (3.15 - 6.65) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y - 40, zoom: mix(1.0, 1.07, lt / 3.5), rot: hh.rot };
  // two steps: foot lifts, lands in slush
  const cyc = (lt * 0.9) % 1;
  const step = Math.max(0, Math.sin(cyc * Math.PI)) * at(lt, [0, 0.2], [0, 1]);
  const landK = lt < 0.4 ? -1 : ((lt * 0.9 + 0.0) % 1) * 2.2;
  const wet = at(t, [3.6, 5.6], [0.05, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="b" treeY={1250} blur={12} t={t} snow={0.6} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={1690} snow={1} />
        <Svg>
          <Slush y={1690} big />
        </Svg>
        <Subject rimX={5} col="rgba(255,226,190,0.8)">
          <Leg shoe="sneaker" sock={COTTON} sockShade="#d6d3cb" wet={wet} cold={at(t, [5.0, 5.6], [0, 1])} step={step} t={t} />
          <Splash x={760} y={1700} k={landK} />
        </Subject>
      </Plane>
      <Particles seed={1592} n={12} col="#ffffff" fall={10} />
      <Grade sunX={300} sunY={760} warm="250,230,210" cool="40,60,100" vignette={0.55} />
      <Chip text="Cotton socks" t={t} t0={3.5} x={60} y={200} icon="x" big />
      <Chip text="Cold and damp" t={t} t0={5.0} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: wool socks in boots, the dog trots alongside in golden light (6.65 - 11.35) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y - 40, zoom: at(lt, [0, 1.0], [1.12, 1.03], outExpo), rot: hh.rot };
  const cyc = (lt * 0.8) % 1;
  const step = Math.max(0, Math.sin(cyc * Math.PI)) * at(lt, [0.6, 1.0], [0, 1]);
  const ph = t * 5;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="c" treeY={1250} blur={12} t={t} snow={0.6} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={1690} snow={1} />
        <Svg>
          <Slush y={1690} big />
        </Svg>
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Dog x={mix(560, 700, at(lt, [0, 4.7], [0, 1]))} y={1730} s={2.6} phase={ph} walk={0.9} mood="happy" tailWag={t * 14} flip={false} />
          <Leg shoe="boot" sock={SOCK} sockShade={SOCK2} step={step} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2e2618" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.4} col="255,236,200" />
      <Particles seed={1593} n={20} col="#fff3d6" fall={6} />
      <Grade sunX={760} sunY={560} warm="255,226,180" vignette={0.5} />
      <Chip text="Wool socks" t={t} t0={7.9} x={60} y={200} icon="check" big />
      <Chip text="Warm even when damp" t={t} t0={9.0} x={60} y={330} icon="check" big />
      <Chip text="Shoes that keep wet out" t={t} t0={10.1} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

const S4: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/merino-socks-wood.jpg"
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
      save="Save this before your next cold walk"
    />
  );
};

export const V159: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.2} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.15} to={6.78} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={3.15} />
    </Scene>
    <Scene from={6.68} to={11.45} fadeIn={0.06} fadeOut={0.12}>
      <S3 off={6.68} />
    </Scene>
    <Scene from={11.3} to={16.0} fadeOut={0}>
      <S4 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.15, 1600],
        [3.15, 6.65, 1600],
        [6.65, 11.3, 1600],
      ]}
    />
  </AbsoluteFill>
);
