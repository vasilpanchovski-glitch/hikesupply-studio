// V130: "Slush at noon. Ice by three." in the cinematic C01 style. Story for the Chain Ice Cleats (Stainless Steel Spikes for
// Boots, Pair, $26.99, live Shopify; comes with a storage bag). Advice: afternoon slush refreezes once the sun drops behind the
// ridge, so plan for the trail you walk out on; keep the cleats rolled in their bag in your pack, not in the car; pull them on
// at the first shine of ice. End card = real Shopify product photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { FrostTrail, WinterBackdrop } from "../winter";
import { BootClose, CleatBag, CLEAT, CHAIN, SnowCar, Spikes } from "../icy";
import vo from "../vo/v130.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const NOON: Sky = { top: "#3a6fa6", mid: "#9cc3e0", low: "#eef3f0", sun: [700, 380], sunR: 52, sunCol: "#fffef4", glow: "#f6f0da" };
const LATE: Sky = { top: "#2f4a72", mid: "#7f93ad", low: "#c9cfd6", sun: [820, 1180], sunR: 40, sunCol: "#ffe9c8", glow: "#e8b98a" };
const DUSKG: Sky = { top: "#3c5478", mid: "#d6a487", low: "#f7cf9e", sun: [300, 980], sunR: 50, sunCol: "#fff0d0", glow: "#ffb878" };

const BEN: Outfit = {
  ...JAKE,
  skin: "#C98F6B",
  skinShade: "#AC7553",
  hair: "#2a1d14",
  beard: "#2a1d14",
  cap: "#2F5446",
  capShade: "#24443a",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#3E6E8E",
  packShade: "#2F5670",
  glove: "#2a2a2a",
};

// Slushy (k = 0) to refrozen icy ruts (k = 1) trail surface, close up (screen coords).
const Ruts: React.FC<{ k: number; y?: number }> = ({ k, y = 1100 }) => (
  <Svg>
    <path d={`M-300,${y} L1400,${y - 60} L1400,2400 L-300,2400 Z`} fill={k > 0.5 ? "#a9c2cf" : "#8b8274"} />
    <path d={`M-300,${y} L1400,${y - 60} L1400,2400 L-300,2400 Z`} fill="#8b8274" opacity={k > 0.5 ? 1 - k : 0} />
    {[0, 1, 2].map((i) => (
      <path
        key={i}
        d={`M-300,${y + 180 + i * 260} Q540,${y + 120 + i * 260} 1400,${y + 140 + i * 250}`}
        stroke={k > 0.5 ? "#7ea1b5" : "#6d6457"}
        strokeWidth={60 - i * 8}
        fill="none"
        strokeLinecap="round"
      />
    ))}
    {[0, 1, 2].map((i) => (
      <path key={`s${i}`} d={`M${-200 + i * 380},${y + 160 + i * 260} l240,-12`} stroke="#ffffff" strokeWidth={12} strokeLinecap="round" opacity={0.85 * k} />
    ))}
    {/* slush blobs and puddle sheen fade out as it freezes */}
    {Array.from({ length: 10 }, (_, i) => (
      <ellipse key={`b${i}`} cx={-200 + i * 160} cy={y + 80 + ((i * 97) % 700)} rx={70} ry={20} fill="#c9c5bb" opacity={0.8 * (1 - k)} />
    ))}
  </Svg>
);

// ============ S1 HOOK WIDE: sunny noon, slushy trail, Ben walks away from the car (0 - 2.62) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.09, t / 2.62), rot: hh.rot };
  const g = 1540;
  const ph = t * 3;
  const p: HikerProps = { x: 520 + t * 40, y: g + 40, scale: 2.3, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NOON} uid="a" treeY={g - 220} t={t} snow={0.6} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} />
        <Svg>
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse key={i} cx={-200 + i * 190} cy={g + 60 + ((i * 61) % 160)} rx={80} ry={16} fill="#cfcbc2" opacity={0.85} />
          ))}
          <SnowCar x={120} y={g + 30} s={1.9} />
        </Svg>
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={BEN} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={NOON.sun[0]} y={NOON.sun[1]} strength={0.3} col="255,248,230" />
      <Particles seed={1301} n={18} col="#fff8e6" fall={6} />
      <LowScrim />
      <Grade sunX={700} sunY={380} warm="252,244,228" cool="40,60,90" />
      <Title text={"Slush at noon.\nIce by three."} t={t} t0={0} top={110} size={130} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the cleats bag on the car seat, the door shuts on it (2.62 - 4.84) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shut = at(t, [3.75, 4.0], [0, 1]);
  const hh = handheld(t, 0.3, at(t, [3.95, 4.05, 4.4], [0, 1, 0]) * 6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.1, lt / 2.22), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#5d7488" }}>
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* car body side + open window */}
          <rect x={-200} y={0} width={1500} height={2000} fill="#5d7488" />
          <rect x={-200} y={1500} width={1500} height={500} fill="#465a6c" />
          <path d="M80,420 L1000,420 Q1040,420 1040,470 L1040,1240 L80,1240 Z" fill="#6f7f8c" />
          {/* seat */}
          <path d="M140,1240 L140,700 Q140,620 230,610 L520,600 Q600,600 600,690 L600,1000 L1000,1000 Q1040,1000 1040,1060 L1040,1240 Z" fill="#4a3a32" />
          <path d="M600,1000 L1000,1000 Q1040,1000 1040,1060 L1040,1100 L600,1100 Z" fill="#5a4840" />
          <CleatBag x={800} y={1010} s={2.4} />
          <path d="M660,1000 Q800,960 940,1000" stroke="#f1c99d" strokeWidth={0} />
          <path d="M80,420 L1000,420" stroke="#cfe3ee" strokeWidth={16} opacity={0.6} />
          {/* door glass sliding across as it shuts */}
          <rect x={80} y={420} width={960 * shut} height={820} fill="#9fb8c8" opacity={0.75} />
          <rect x={80} y={420} width={960 * shut} height={820} fill="none" stroke="#465a6c" strokeWidth={shut > 0 ? 24 : 0} />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${140 + i * 120},${500 + i * 60} l220,-60`} stroke="#ffffff" strokeWidth={14} opacity={0.5 * shut} strokeLinecap="round" />
          ))}
        </Svg>
      </Plane>
      <Particles seed={1302} n={10} col="#fff8e6" fall={6} />
      <LowScrim />
      <Grade sunX={700} sunY={300} warm="252,244,228" cool="40,60,90" vignette={0.55} />
      <Chip text="Cleats left in the car" t={t} t0={3.3} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: by three the sun slides behind the ridge, the light goes cold (4.84 - 7.23) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.39), rot: hh.rot };
  const g = 1500;
  const k = at(t, [5.0, 6.8], [0, 1]);
  const sky: Sky = { ...LATE, sun: [820, mix(560, 1180, k)] };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={sky} uid="c" treeY={g - 200} t={t} snow={0.8} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={-0.04} snow={1} />
      </Plane>
      <AbsoluteFill style={{ background: `rgba(30,50,90,${0.28 * k})` }} />
      <Rays x={820} y={mix(560, 1180, k)} strength={0.6 * (1 - k)} col="255,226,180" />
      <Particles seed={1303} n={14} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={900} warm={k > 0.6 ? "205,218,240" : "255,226,190"} cool="30,45,80" />
      <Readout label="3 PM" value="Sun behind the ridge" ok={null} t={t} t0={5.4} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the slush freezes into ruts of ice, a boot skids on the way down (7.23 - 10.52) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const slip = at(t, [9.45, 9.75], [0, 1]);
  const hh = handheld(t, 0.35, at(t, [9.6, 9.7, 10.2], [0, 1, 0]) * 5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 3.29), rot: hh.rot };
  const k = at(t, [7.7, 8.6], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#40566c" }}>
      <Plane cam={cam} depth={0.5} blur={10}>
        <Svg>
          <rect x={-300} y={0} width={1700} height={1200} fill="#5d6e85" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Ruts k={k} y={1080} />
        {lt > 1.6 && (
          <Svg>
            <g transform={`translate(${slip * 170},${-120 - slip * 8}) rotate(${-slip * 9} 520 1240) scale(0.9) translate(60,60)`}>
              <BootClose toe={0} heel={0} pants={BEN.pants} pantsShade={BEN.pantsShade} boot={BEN.boot} sole={BEN.sole} />
            </g>
            {slip > 0 &&
              [0, 1, 2].map((i) => (
                <line key={i} x1={240 - i * 20} y1={1260 + i * 16} x2={240 - i * 20 - 220 * slip} y2={1262 + i * 16} stroke="#ffffff" strokeWidth={10} strokeLinecap="round" opacity={0.9} />
              ))}
          </Svg>
        )}
      </Plane>
      <Particles seed={1304} n={10} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={700} sunY={500} warm="210,222,240" cool="30,45,80" vignette={0.55} />
      <Chip text="The slush froze" t={t} t0={8.1} x={60} y={200} icon="x" big />
      <Chip text="Ruts of ice on the way down" t={t} t0={8.7} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: next trip, Ben at the trailhead looks up at the ridge he will walk out under (10.52 - 14.67) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.02, 1.08, lt / 4.15), rot: hh.rot };
  const g = 1540;
  const p: HikerProps = { x: 400, y: g + 60, scale: 2.4, walk: 0, lean: -0.02, poles: false, handOverride: [40, 30], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NOON} uid="e" treeY={g - 220} t={t} snow={0.8} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <SnowCar x={-60} y={g + 40} s={1.8} />
        </Svg>
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={BEN} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={NOON.sun[0]} y={NOON.sun[1]} strength={0.25} col="255,248,230" />
      <Particles seed={1305} n={16} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={700} sunY={380} warm="252,244,228" cool="40,60,90" />
      <Readout label="PLAN FOR" value="The walk out" ok={null} t={t} t0={12.6} x={60} y={200} />
      <Chip text="In: slush. Out: ice" t={t} t0={13.6} x={60} y={520} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: gloved hands roll the cleats into their bag, the bag goes into the pack (14.67 - 17.95) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.28), rot: hh.rot };
  const roll = at(t, [14.9, 15.8], [0, 1], outExpo);
  const drop = at(t, [16.4, 17.2], [0, 1], outExpo);
  const by = mix(1080, 1560, drop);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NOON} uid="f" treeY={900} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* open pack, top view-ish */}
          <path d="M120,1180 Q120,1100 220,1090 L860,1090 Q960,1100 960,1180 L980,2000 L100,2000 Z" fill={BEN.pack} />
          <ellipse cx={540} cy={1180} rx={380} ry={70} fill="#1f2c36" />
          {/* the pair of cleats rolls down into the open bag (drawn behind the bag so it disappears inside) */}
          <g opacity={1 - drop}>
            <g transform={`translate(540,${mix(300, 760, roll)}) scale(${1 - roll * 0.5})`}>
              {[-120, 120].map((dx) => (
                <g key={dx} transform={`translate(${dx},0)`}>
                  <ellipse cx={0} cy={0} rx={105} ry={120} fill="none" stroke={CLEAT} strokeWidth={26} />
                  <path d={`M-70,-30 L0,40 L70,-30 M-60,50 L60,50`} stroke={CHAIN} strokeWidth={9} fill="none" />
                  {[-60, 0, 60].map((sx) => (
                    <path key={sx} d={`M${sx - 9},120 l9,24 l9,-24`} fill="#e8edf0" stroke="#7d868c" strokeWidth={2} />
                  ))}
                </g>
              ))}
            </g>
          </g>
          <CleatBag x={540} y={by} s={2.3} full={0.4 + roll * 0.6} />
          {/* pack front lip over the bag as it drops in */}
          <path d="M150,1200 Q540,1290 930,1200 L960,2000 L120,2000 Z" fill={BEN.pack} />
          <path d="M150,1200 Q540,1290 930,1200" stroke={BEN.packShade} strokeWidth={18} fill="none" />
        </Svg>
      </Plane>
      <Particles seed={1306} n={12} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={700} sunY={380} warm="252,244,228" cool="40,60,90" vignette={0.5} />
      <Chip text="Cleats in their bag" t={t} t0={15.3} x={60} y={200} icon="check" big />
      <Chip text="Bag in your pack" t={t} t0={16.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: first shine of ice on the trail, cleats go on (17.95 - 20.35) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.4), rot: hh.rot };
  const toe = at(t, [18.4, 18.9], [0, 1], outExpo);
  const heel = at(t, [19.0, 19.6], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={LATE} uid="g" treeY={900} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={1200} width={1880} height={900} fill="#a9c2cf" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${-60 + i * 420},${1420 + i * 50} l240,-10`} stroke="#ffffff" strokeWidth={12} strokeLinecap="round" opacity={0.6 + 0.3 * Math.sin(t * 6 + i)} />
          ))}
          <BootClose toe={toe} heel={heel} hand={at(t, [18.9, 19.05, 19.7, 19.95], [0, 1, 1, 0])} pants={BEN.pants} pantsShade={BEN.pantsShade} boot={BEN.boot} sole={BEN.sole} />
        </Svg>
      </Plane>
      <Particles seed={1307} n={12} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={700} warm="230,226,236" cool="30,45,80" vignette={0.5} />
      <Chip text="First shine of ice" t={t} t0={18.9} x={60} y={200} icon="none" big />
      <Chip text="Cleats on" t={t} t0={19.5} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: late light, Ben walks down the icy ruts, steady (20.35 - 22.8) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 24, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1500;
  const ph = t * 3;
  const p: HikerProps = { x: 640 - lt * 60, y: g + 60 + lt * 10, scale: 2.4, phase: ph, walk: 0.5, lean: -0.02, poles: false, handOverride: freeHand(ph, 0.4), breathe: 0, slope: -0.05 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSKG} uid="h" treeY={g - 200} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={0.05} snow={1} />
        <Svg>
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${-200 + i * 380},${g + 40 - (i * 380 - 740) * 0.05} l160,-8`} stroke="#ffffff" strokeWidth={9} strokeLinecap="round" opacity={0.8} />
          ))}
        </Svg>
        <Subject rimX={-6} col="rgba(255,214,160,0.9)">
          <Person {...p} outfit={BEN} expression="happy" flip />
        </Subject>
        <Subject rimX={-6} col="rgba(255,214,160,0.9)">
          <g transform={`translate(${2 * p.x},0) scale(-1,1)`}>
            <Spikes p={p} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={DUSKG.sun[0]} y={DUSKG.sun[1] - 100} strength={0.4} col="255,220,180" />
      <Particles seed={1308} n={20} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={300} sunY={900} warm="255,214,170" />
      <Readout label="THE WALK OUT" value="Steady" ok={true} t={t} t0={20.5} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/chain-ice-cleats-cut.png"
      cutoutH={560}
      spec="PAIR · STORAGE BAG INCLUDED · US W4 - M11"
      name={
        <>
          Chain Ice Cleats
          <br />
          for Boots, Pair
        </>
      }
      nameSize={100}
      price="$26.99"
      save="Save this before your next winter hike"
    />
  );
};

export const V130: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.67} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.62} to={4.89} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.62} />
    </Scene>
    <Scene from={4.84} to={7.28} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={4.84} />
    </Scene>
    <Scene from={7.23} to={10.57} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.23} />
    </Scene>
    <Scene from={10.52} to={14.72} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={10.52} />
    </Scene>
    <Scene from={14.67} to={18.0} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.67} />
    </Scene>
    <Scene from={17.95} to={20.4} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={17.95} />
    </Scene>
    <Scene from={20.35} to={22.85} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={20.35} />
    </Scene>
    <Scene from={22.75} to={27.0} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.62, 1600],
        [2.62, 4.84, 1660],
        [4.84, 7.23, 1600],
        [7.23, 10.52, 1660],
        [10.52, 14.67, 1600],
        [14.67, 17.95, 1700],
        [17.95, 20.35, 1660],
        [20.35, 22.75, 1600],
      ]}
    />
  </AbsoluteFill>
);
