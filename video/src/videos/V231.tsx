// V231: "No chains. Turned around at Yosemite." Short format (17.0 s, 43 words), cinematic C01 style, Yosemite in winter.
// Product: Yosemite National Park — Trip Planning Guide, $9.99 (live Shopify). End card: real store cover, boxed photo (as V135).
// Facts as NPS gives them: in Yosemite's winter chain control areas you must carry tire chains, even with four-wheel drive
// (rental cars included); vehicles without them are turned back at chain control. Pack chains before you leave home.
// Sign wording is generic ("CHAIN CONTROL / CHAINS REQUIRED"), no agency logo. Granite valley, chain tyre and road parts from V135.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, Haze, handheld, Particles, Plane, Rays, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, SnowWoods, WINTER, WinterBackdrop } from "../winter";
import { SnowCar } from "../icy";
import vo from "../vo/v231.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const VALLEY: Sky = { top: "#4a74a0", mid: "#b4c8da", low: "#f1efe8", sun: [820, 500], sunR: 46, sunCol: "#fffdf2", glow: "#f3efe0" };
const RED = "#c23a32";
const AMBER = "#E3A82B";
const CARB = { c: "#2F6F8A", s: "#235569" };

const RANGER: Outfit = {
  ...GUIDE,
  jacket: "#4f5a3a",
  jacketShade: "#3c452c",
  cap: "#6b5a3a",
  capShade: "#544629",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  glove: "#2a2a2a",
};

const GraniteValley: React.FC<{ cam: Cam; sky: Sky; uid: string; floorY: number; t: number }> = ({ cam, sky, uid, floorY }) => (
  <>
    <Plane cam={cam} depth={0.04}>
      <SkyPlane sky={sky} uid={uid} />
    </Plane>
    <Plane cam={cam} depth={0.16} blur={2.4}>
      <Svg>
        <path d={`M-300,${floorY - 60} L-300,${floorY - 1040} Q-60,${floorY - 1120} 200,${floorY - 1060} Q330,${floorY - 1000} 380,${floorY - 800} L470,${floorY - 60} Z`} fill="#9aa1a8" />
        <path d={`M-300,${floorY - 1040} Q-60,${floorY - 1120} 200,${floorY - 1060} Q120,${floorY - 1030} -300,${floorY - 990} Z`} fill="#f4f6f8" />
        <path d={`M200,${floorY - 1060} Q330,${floorY - 1000} 380,${floorY - 800} L420,${floorY - 500} Q330,${floorY - 820} 200,${floorY - 1060} Z`} fill="#c9cdd1" />
        <path d={`M560,${floorY - 60} L600,${floorY - 640} Q700,${floorY - 1000} 920,${floorY - 960} Q1080,${floorY - 900} 1100,${floorY - 700} L1380,${floorY - 60} Z`} fill="#a3a9af" />
        <path d={`M700,${floorY - 880} Q800,${floorY - 1000} 920,${floorY - 960} Q980,${floorY - 940} 1010,${floorY - 900} Q860,${floorY - 930} 700,${floorY - 880} Z`} fill="#f4f6f8" />
        <path d={`M920,${floorY - 960} Q1080,${floorY - 900} 1100,${floorY - 700} L1160,${floorY - 500} Q1000,${floorY - 800} 920,${floorY - 960} Z`} fill="#9da3a9" />
      </Svg>
    </Plane>
    <Haze y={floorY - 500} h={380} col={sky.low} opacity={0.5} />
    <Plane cam={cam} depth={0.55} blur={0.8}>
      <SnowWoods y={floorY - 120} shift={cam.x * 0.2} snow={1} />
    </Plane>
  </>
);

// Snowy road running away to the valley, with the chain control sign on the right (screen units).
const ChainRoad: React.FC<{ y: number; sign?: boolean; flash?: number }> = ({ y, sign = true, flash = 0 }) => (
  <Svg>
    <rect x={-400} y={y - 30} width={1880} height={1400} fill={SNOW2} />
    <path d={`M380,${y - 30} L700,${y - 30} L1300,2300 L-300,2300 Z`} fill="#5c6166" />
    <path d={`M536,${y - 30} L544,${y - 30} L620,2300 L560,2300 Z`} fill="#e9d36a" />
    <path d={`M380,${y - 30} L-300,2300 L-400,2300 L-400,${y - 30} Z`} fill={SNOW} />
    <path d={`M700,${y - 30} L1300,2300 L1480,2300 L1480,${y - 30} Z`} fill={SNOW} />
    {sign && (
      <g transform={`translate(270,${y + 20})`}>
        <rect x={-10} y={-300} width={20} height={300} fill="#6a6a6a" />
        <rect x={-170} y={-420} width={340} height={170} rx={12} fill="#f4f4f4" stroke="#2a2a2a" strokeWidth={6} />
        <text x={0} y={-356} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={58} fill="#2a2a2a" letterSpacing={2}>
          CHAIN CONTROL
        </text>
        <text x={0} y={-290} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={50} fill={RED} letterSpacing={2}>
          CHAINS REQUIRED
        </text>
        {[-130, 130].map((dx) => (
          <circle key={dx} cx={dx} cy={-440} r={16} fill={AMBER} opacity={0.4 + 0.6 * flash} />
        ))}
      </g>
    )}
  </Svg>
);

const ChainTire: React.FC<{ x: number; y: number; r: number; k: number; t: number }> = ({ x, y, r, k, t }) => (
  <g transform={`translate(${x},${y})`}>
    <path d={`M${-r * 1.6},${-r * 0.2} Q${-r * 1.4},${-r * 1.35} 0,${-r * 1.35} Q${r * 1.4},${-r * 1.35} ${r * 1.6},${-r * 0.2} L${r * 2.4},${-r * 0.2} L${r * 2.4},${-r * 2.6} L${-r * 2.4},${-r * 2.6} L${-r * 2.4},${-r * 0.2} Z`} fill={CARB.c} />
    <path d={`M${-r * 1.6},${-r * 0.2} Q${-r * 1.4},${-r * 1.35} 0,${-r * 1.35} Q${r * 1.4},${-r * 1.35} ${r * 1.6},${-r * 0.2}`} stroke={CARB.s} strokeWidth={18} fill="none" />
    <circle r={r * 1.18} fill="#15181a" />
    <circle r={r} fill="#1f2222" />
    <circle r={r * 0.62} fill="#9aa3a6" />
    <circle r={r * 0.5} fill="#7d878b" />
    {Array.from({ length: 5 }, (_, i) => {
      const a = (i / 5) * Math.PI * 2;
      return <circle key={i} cx={Math.cos(a) * r * 0.3} cy={Math.sin(a) * r * 0.3} r={r * 0.05} fill="#c9d0d3" />;
    })}
    <path d={`M${-r * 1.18},${r * 0.2} Q0,${r * 1.5} ${r * 1.18},${r * 0.2} L${r * 1.18},${r * 1.4} L${-r * 1.18},${r * 1.4} Z`} fill="rgba(240,246,250,0.35)" />
    {k > 0 && (
      <g opacity={k} transform={`rotate(${t * 4})`}>
        <circle r={r * 0.82} fill="none" stroke="#c9d0d3" strokeWidth={14} strokeDasharray="22 10" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <line key={i} x1={Math.cos(a) * r * 0.82} y1={Math.sin(a) * r * 0.82} x2={Math.cos(a) * r * 1.2} y2={Math.sin(a) * r * 1.2} stroke="#d9dfe2" strokeWidth={14} strokeDasharray="14 8" strokeLinecap="round" />
          );
        })}
      </g>
    )}
  </g>
);

// A boxy 4x4 (screen units, faces right).
const SUV: React.FC<{ x: number; y: number; s?: number; body: string; shade: string }> = ({ x, y, s = 1, body, shade }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={2} rx={140} ry={10} fill="rgba(0,0,0,0.22)" />
    <path d="M-135,-34 L-135,-130 Q-132,-142 -118,-142 L60,-142 Q72,-142 78,-132 L102,-92 L126,-86 Q138,-82 138,-68 L138,-34 Z" fill={body} />
    <path d="M-135,-34 L138,-34 L138,-54 L-135,-54 Z" fill={shade} />
    <path d="M-110,-130 L-30,-130 L-30,-96 L-110,-96 Z" fill="#cfe3ee" />
    <path d="M-18,-130 L56,-130 Q62,-130 66,-124 L88,-96 L-18,-96 Z" fill="#cfe3ee" />
    <rect x={-120} y={-160} width={200} height={14} rx={5} fill="#3a3a3a" />
    <path d="M-110,-160 Q0,-178 70,-160 Z" fill={SNOW} />
    <rect x={126} y={-80} width={12} height={10} rx={3} fill="#f1e5b8" />
    {[-80, 86].map((wx) => (
      <g key={wx}>
        <circle cx={wx} cy={-26} r={30} fill="#1f2222" />
        <circle cx={wx} cy={-26} r={13} fill="#9aa3a6" />
      </g>
    ))}
    <text x={-60} y={-62} fontFamily={HEAD} fontWeight={800} fontSize={30} fill="#ffffff" opacity={0.9}>
      4X4
    </text>
  </g>
);

// Red chain bag (screen units).
const ChainBag: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-150} y={-90} width={300} height={180} rx={30} fill={RED} />
    <rect x={-150} y={-90} width={300} height={40} rx={20} fill="#a52f28" />
    <path d="M-60,-90 Q0,-150 60,-90" stroke="#2a2a2a" strokeWidth={14} fill="none" />
    {Array.from({ length: 5 }, (_, i) => (
      <ellipse key={i} cx={-90 + i * 45} cy={20} rx={22} ry={13} fill="none" stroke="#d9dfe2" strokeWidth={8} />
    ))}
  </g>
);

// ============ S1 HOOK WIDE: Kate drives into the snowy valley (0 - 2.5) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.1, t / 2.5), rot: hh.rot };
  const g = 1460;
  const k = t / 2.5;
  return (
    <AbsoluteFill>
      <GraniteValley cam={cam} sky={VALLEY} uid="a" floorY={g} t={t} />
      <Rays x={VALLEY.sun[0]} y={VALLEY.sun[1]} strength={0.18} />
      <Plane cam={cam} depth={1}>
        <ChainRoad y={g} sign={false} />
        <Svg>
          <SnowCar x={mix(560, 560, k)} y={mix(1900, 1720, k)} s={mix(3.0, 2.6, k)} body={CARB.c} shade={CARB.s} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" />
      </Plane>
      <Particles seed={2311} n={24} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={520} warm="245,244,236" cool="40,60,90" />
      <Title text={"No chains.\nTurned around\nat Yosemite."} t={t} t0={0} top={100} size={118} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: bare tyre in the snow, no chains in the car (2.5 - 4.0) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.02], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1200} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={1500} width={1500} height={800} fill={SNOW} />
          <ChainTire x={560} y={1360} r={250} k={0} t={t} />
          <path d="M-200,1560 Q560,1500 1300,1580 L1300,2200 L-200,2200 Z" fill={SNOW} />
        </Svg>
      </Plane>
      <Particles seed={2312} n={20} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="240,242,236" cool="40,60,90" />
      <Readout label="JANUARY" value="NO CHAINS" ok={false} t={t} t0={2.6} x={60} y={170} />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: chain control sign, she is turned back (4.0 - 6.55) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y + 60, zoom: mix(1.04, 1.09, lt / 2.55), rot: hh.rot };
  const g = 1300;
  const p: HikerProps = { x: 860, y: g + 330, scale: 2.2, walk: 0, lean: -0.02, poles: false, handOverride: [mix(30, 60, at(t, [4.6, 5.0], [0, 1])), mix(20, -130, at(t, [4.6, 5.0], [0, 1]))], breathe: Math.sin(t * 2) * 1.2 };
  const turn = at(t, [5.6, 6.3], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <GraniteValley cam={cam} sky={VALLEY} uid="c" floorY={g} t={t} />
      <Plane cam={cam} depth={1}>
        <ChainRoad y={g} flash={Math.round((t * 2) % 1)} />
        <Svg>
          <SnowCar x={mix(560, 500, turn)} y={g + 470} s={2.2} flip={turn > 0.5} body={CARB.c} shade={CARB.s} />
        </Svg>
        <Subject rimX={6} col="rgba(240,246,255,0.85)">
          <Person {...p} outfit={RANGER} expression="neutral" flip noPack />
        </Subject>
      </Plane>
      <Particles seed={2313} n={26} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={520} warm="240,242,236" cool="40,60,90" />
      <Chip text="Chain control" t={t} t0={4.2} x={60} y={170} icon="none" big />
      <Chip text="Turned back" t={t} t0={5.6} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the rule: in winter, carry chains there (6.55 - 8.9) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.35), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1200} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={1500} width={1500} height={800} fill={SNOW} />
          <ChainTire x={560} y={1360} r={250} k={at(t, [7.6, 8.3], [0, 1], outExpo)} t={t} />
          <path d="M-200,1560 Q560,1500 1300,1580 L1300,2200 L-200,2200 Z" fill={SNOW} />
        </Svg>
      </Plane>
      <Rays x={800} y={300} strength={0.22} />
      <Particles seed={2314} n={16} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={800} sunY={400} warm="250,240,225" cool="40,60,90" />
      <Chip text="In winter" t={t} t0={6.65} x={60} y={170} icon="none" big />
      <Chip text="Carry chains" t={t} t0={7.6} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: even a 4x4, even a rental car (8.9 - 11.6) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y + 80, zoom: mix(1.04, 1.09, lt / 2.7), rot: hh.rot };
  const g = 1300;
  const a = at(t, [9.4, 9.9], [0, 1], outExpo);
  const b = at(t, [10.7, 11.1], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <GraniteValley cam={cam} sky={VALLEY} uid="e" floorY={g} t={t} />
      <Rays x={VALLEY.sun[0]} y={VALLEY.sun[1]} strength={0.2} />
      <Plane cam={cam} depth={1}>
        <ChainRoad y={g} flash={Math.round((t * 2) % 1)} />
        <Svg>
          <g opacity={a}>
            <SUV x={mix(-200, 380, a)} y={g + 380} s={1.9} body="#3a4a3a" shade="#2b382b" />
          </g>
          <g opacity={b}>
            <Car x={mix(1300, 720, b)} y={g + 560} s={2.3} body="#d9d9d4" shade="#b5b5ae" flip />
            <g transform={`translate(${mix(1300, 720, b)},${g + 560 - 330})`}>
              <rect x={-90} y={-34} width={180} height={60} rx={10} fill="#ffffff" stroke="#2a2a2a" strokeWidth={4} />
              <text x={0} y={12} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#2a2a2a" letterSpacing={2}>
                RENTAL
              </text>
            </g>
          </g>
        </Svg>
      </Plane>
      <Particles seed={2315} n={22} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={520} warm="245,240,230" cool="40,60,90" />
      <Chip text="Even with 4-wheel drive" t={t} t0={9.2} x={60} y={170} icon="check" big />
      <Chip text="Even a rental car" t={t} t0={10.6} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: at home, chains go in the trunk before she leaves (11.6 - 13.05) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.07, lt / 1.45), rot: hh.rot };
  const drop = at(t, [11.7, 12.3], [0, 1], outExpo);
  const by = mix(700, 1240, drop);
  return (
    <AbsoluteFill style={{ background: "#1b2229" }}>
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* trunk opening seen from behind the car */}
          <rect x={-200} y={-200} width={1500} height={2400} fill="#2b343c" />
          <path d="M60,420 L1020,420 L960,520 L120,520 Z" fill={CARB.s} />
          <rect x={120} y={520} width={840} height={900} fill="#1a1f24" />
          <rect x={160} y={1000} width={760} height={420} fill="#262c32" />
          <rect x={40} y={1400} width={1000} height={260} rx={30} fill={CARB.c} />
          <rect x={430} y={1460} width={220} height={60} rx={10} fill="#e9e9e4" />
          {/* a duffel already packed */}
          <rect x={600} y={1110} width={280} height={150} rx={60} fill="#3E4F5C" />
          <ChainBag x={360} y={by} s={1.2} rot={mix(-14, 0, drop)} />
        </Svg>
      </Plane>
      <Particles seed={2316} n={10} col="#ffe8c0" fall={3} bokeh />
      <LowScrim />
      <Grade sunX={540} sunY={300} warm="255,224,180" vignette={0.55} />
      <Chip text="Pack them before you leave" t={t} t0={11.65} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

const S7: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/yosemite-national-park-trip-planning-guide.jpg"
      photoH={800}
      spec="30 PAGES · 16 DAY HIKES · WHEN TO GO"
      name={
        <>
          Yosemite Trip
          <br />
          Planning Guide
        </>
      }
      nameSize={104}
      price="$9.99"
      save="Save this for your trip"
    />
  );
};

export const V231: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.58} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.5} to={4.08} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.5} />
    </Scene>
    <Scene from={4.0} to={6.63} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.0} />
    </Scene>
    <Scene from={6.55} to={8.98} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={6.55} />
    </Scene>
    <Scene from={8.9} to={11.68} fadeIn={0.06} fadeOut={0.08}>
      <S5 off={8.9} />
    </Scene>
    <Scene from={11.6} to={13.05} fadeIn={0.06} fadeOut={0.1}>
      <S6 off={11.6} />
    </Scene>
    <Scene from={12.97} to={17.0} fadeOut={0}>
      <S7 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.5, 1600],
        [2.5, 4.0, 1600],
        [4.0, 6.55, 1600],
        [6.55, 8.9, 1600],
        [8.9, 11.6, 1600],
        [11.6, 12.97, 1600],
      ]}
    />
  </AbsoluteFill>
);
