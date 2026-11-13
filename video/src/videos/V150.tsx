// V150: "One hand on the rock. One on his bottle." in the cinematic C01 style, rocky early-winter climb. Story for the Insulated
// Neoprene Bottle Sleeve (Shoulder Strap, Fits 550 ml to 1 L, from $12.99, live Shopify, black). Advice (simple, safe): on a
// rocky climb keep both hands free; slide the bottle into an insulated sleeve on a shoulder strap and wear it across your body,
// so the water stays at your hip; the neoprene slows the water from freezing (slows, never "stops").
// No numbers, no medical claims. End card = real Shopify product photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { FrostTrail, STORM, Summit, WGOLD, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v150.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC<{ k?: number }> = ({ k = 0.4 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: `linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,${k}) 45%, rgba(12,22,28,${k}) 70%, rgba(12,22,28,0) 100%)` }} />
);

const OWEN: Outfit = {
  ...JAKE,
  skin: "#C68A64",
  skinShade: "#A86E4C",
  hair: "#241a14",
  beard: "#241a14",
  cap: "#2F6F86",
  capShade: "#22566A",
  jacket: "#C9A23A",
  jacketShade: "#a0801f",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#3E5A4A",
  packShade: "#2E4538",
  glove: null,
};

const NEO = "#1d1f22";
const NEO2 = "#33373c";
const STEEL = "#c9ced2";
const WATER = "#7fc0de";
const ROCK = "#7a7f86";
const ROCK2 = "#5f646b";

// Bare steel bottle, local coords: base centre at 0,0, height ~ 230.
const SteelBottle: React.FC<{ x: number; y: number; s: number; rot?: number }> = ({ x, y, s, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-34} y={-196} width={68} height={196} rx={18} fill={STEEL} />
    <rect x={-34} y={-196} width={18} height={196} rx={9} fill="#f2f4f6" opacity={0.8} />
    <rect x={-24} y={-230} width={48} height={38} rx={6} fill="#4a5058" />
  </g>
);

// Bottle in the black neoprene sleeve (same local frame as SteelBottle). k = how far the sleeve is on (0..1).
const Sleeve: React.FC<{ x: number; y: number; s: number; rot?: number; k?: number; strap?: boolean }> = ({ x, y, s, rot = 0, k = 1, strap = true }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-34} y={-196} width={68} height={196} rx={18} fill={STEEL} />
    <rect x={-24} y={-230} width={48} height={38} rx={6} fill="#4a5058" />
    <rect x={-37} y={-170 * k} width={74} height={170 * k + 4} rx={16} fill={NEO} />
    <rect x={-37} y={-170 * k} width={18} height={170 * k + 4} rx={9} fill={NEO2} opacity={0.7} />
    {strap && k > 0.95 && <path d="M-34,-150 Q-60,-210 -10,-260" stroke={NEO} strokeWidth={10} fill="none" strokeLinecap="round" />}
  </g>
);

// Strap from the near shoulder across the body to the far hip, sleeve at the hip (hiker coords).
const HipSleeve: React.FC<{ p: HikerProps; o?: number; lift?: number }> = ({ p, o = 1, lift = 0 }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={o}>
      <path d={`M${g.sh[0] - 10},${g.sh[1] - 4} Q${g.sh[0] + 22},${g.sh[1] + 60} ${g.hip[0] + 28},${g.hip[1] - 8}`} stroke={NEO} strokeWidth={8} fill="none" strokeLinecap="round" />
      <Sleeve x={g.hip[0] + 34} y={g.hip[1] + 46 - lift} s={0.3} rot={-4} strap={false} />
    </g>
  );
};

// Bare bottle held in the near hand (hiker coords).
const HandBottle: React.FC<{ p: HikerProps }> = ({ p }) => {
  const g = hikerGeometry(p);
  const h = g.arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <SteelBottle x={h[0] + 2} y={h[1] + 34} s={0.28} rot={8} />
    </g>
  );
};

// A boulder step (screen coords), dusted with snow.
const Boulder: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <g>
    <path d={`M${x - w / 2},${y} Q${x - w / 2 + 10},${y - h} ${x - w / 6},${y - h} L${x + w / 4},${y - h * 1.05} Q${x + w / 2},${y - h * 0.9} ${x + w / 2},${y} Z`} fill={ROCK} />
    <path d={`M${x - w / 2},${y} Q${x - w / 2 + 10},${y - h} ${x - w / 6},${y - h} L${x - w / 10},${y} Z`} fill={ROCK2} />
    <path d={`M${x - w / 6 - 10},${y - h + 4} L${x + w / 4},${y - h * 1.05 + 2} Q${x + w / 2 - 20},${y - h * 0.95} ${x + w / 2 - 10},${y - h * 0.86} Q${x},${y - h * 0.92} ${x - w / 6 - 10},${y - h + 14} Z`} fill="#eef2f4" />
  </g>
);

// Steep rocky ground rising to the right: snowy slope + boulders.
const RockSlope: React.FC<{ y: number; tilt: number }> = ({ y, tilt }) => {
  const Y = (x: number) => y - tilt * (x - 540);
  return (
    <Svg>
      <path d={`M-400,${Y(-400)} L1480,${Y(1480)} L1480,2600 L-400,2600 Z`} fill={ROCK2} />
      <path d={`M-400,${Y(-400)} L1480,${Y(1480)} L1480,${Y(1480) + 40} L-400,${Y(-400) + 40} Z`} fill="#e6ecef" />
      {[[-120, 160, 120], [240, 260, 90], [640, 190, 140], [980, 300, 110]].map(([x, dy, r], i) => (
        <g key={i}>
          <ellipse cx={x} cy={Y(x) + dy} rx={r} ry={r * 0.42} fill={ROCK} />
          <ellipse cx={x - 10} cy={Y(x) + dy - r * 0.28} rx={r * 0.8} ry={r * 0.14} fill="#eef2f4" />
        </g>
      ))}
    </Svg>
  );
};

// Illustrated hand, local: wrist at 0,0, fingers toward -y. grip 0 = open/flat, 1 = curled. cuff = sleeve colour.
const Hand: React.FC<{ x: number; y: number; s?: number; rot?: number; grip?: number; skin: string; shade: string; cuff: string; flip?: boolean }> = ({ x, y, s = 1, rot = 0, grip = 0, skin, shade, cuff, flip }) => {
  const fl = mix(150, 90, grip);
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${flip ? -s : s},${s})`}>
      <rect x={-90} y={40} width={180} height={260} rx={40} fill={cuff} />
      <rect x={-80} y={-150} width={160} height={200} rx={60} fill={skin} />
      {[-58, -20, 18, 54].map((fx, i) => (
        <rect key={i} x={fx - 18} y={-150 - fl + (i === 0 || i === 3 ? 30 : 0)} width={36} height={fl + 40} rx={18} fill={skin} />
      ))}
      <rect x={-112} y={-120} width={46} height={140} rx={23} transform="rotate(-28 -90 -10)" fill={skin} />
      <rect x={-80} y={-40} width={160} height={36} rx={18} fill={shade} opacity={0.5} />
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Owen climbs a rocky snowy slope, bottle in one hand (0 - 4.31) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y - t * 6, zoom: mix(1.03, 1.1, t / 4.31), rot: hh.rot };
  const tilt = 0.22;
  const ph = t * 1.8;
  const x = 360 + t * 40;
  const g = 1560 - tilt * (x - 540);
  const p: HikerProps = { x, y: g + 40, scale: 2.4, phase: ph, walk: 0.4, lean: 0.24, poles: false, handOverride: [44, 26], breathe: Math.sin(t * 4) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={1300} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <RockSlope y={1560} tilt={tilt} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={OWEN} expression="tired" />
          <HandBottle p={p} />
          <Breath p={p} t={t} />
        </Subject>
        <Svg>
          <Boulder x={900} y={1560 - tilt * 360 + 40} w={360} h={230} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,246,226" />
      <Particles seed={1501} n={16} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="248,240,228" cool="40,60,90" />
      <Title text={"One hand on\nthe rock. One\non his bottle."} t={t} t0={0} top={110} size={124} />
      <Chip text="Rocky climb" t={t} t0={1.2} x={60} y={640} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: one hand gripping the rock, the other stuck holding the bottle (4.31 - 8.56) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const slip = at(t, [7.8, 7.9, 8.3], [0, 1, 0]);
  const hh = handheld(t, 0.35, slip * 3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 4.25), rot: hh.rot };
  const reach = at(t, [4.5, 5.2], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1200} blur={14} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,246,225,0.8)">
          <Svg>
            {/* the rock ledge, big, diagonal */}
            <path d="M-200,1100 L700,760 Q900,700 1300,740 L1300,2400 L-200,2400 Z" fill={ROCK} />
            <path d="M-200,1100 L700,760 Q900,700 1300,740 L1300,800 Q900,760 700,820 L-200,1160 Z" fill="#eef2f4" />
            <path d="M200,1400 l160,-40 M640,1240 l180,-30 M300,1700 l220,-50" stroke={ROCK2} strokeWidth={14} strokeLinecap="round" />
            {/* left hand flat on the ledge */}
            <g transform={`translate(0,${(1 - reach) * 300})`}>
              <Hand x={720} y={980} s={0.95} rot={70} grip={0.5} skin={OWEN.skin} shade={OWEN.skinShade} cuff={OWEN.jacketShade} />
            </g>
            {/* right hand holding the bottle */}
            <g transform={`translate(${Math.sin(t * 3) * 6},${slip * 20})`}>
              <SteelBottle x={330} y={1300} s={1.6} rot={-12} />
              <Hand x={300} y={1340} s={0.9} rot={-20} grip={1} skin={OWEN.skin} shade={OWEN.skinShade} cuff={OWEN.jacket} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1502} n={14} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="250,240,226" vignette={0.6} />
      <Chip text="Steep section" t={t} t0={5.8} x={60} y={200} icon="none" big />
      <Chip text="Only one hand free" t={t} t0={7.0} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the fix, the bottle slides into an insulated sleeve (8.56 - 12.22) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.66), rot: hh.rot };
  const k = at(t, [10.1, 11.4], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={1150} blur={16} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,246,225,0.8)">
          <Svg>
            <Sleeve x={540} y={1480} s={3.2} rot={0} k={k} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1503} n={14} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="250,240,226" vignette={0.55} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={9.75} top={200} size={124} />
      <Chip text="Insulated sleeve" t={t} t0={11.2} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: on a shoulder strap, worn across the body (12.22 - 15.27) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.04, 1.12, lt / 3.05), rot: hh.rot };
  const g = 1560;
  const strap = at(t, [12.5, 13.2], [0, 1], outExpo);
  const p: HikerProps = { x: 470, y: g + 40, scale: 2.5, walk: 0, lean: 0.04, poles: false, handOverride: [mix(30, 50, strap), mix(20, 60, strap)], breathe: Math.sin(t * 2.4) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={OWEN} expression="neutral" />
          <HipSleeve p={p} o={strap} lift={(1 - strap) * 40} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,246,226" />
      <Particles seed={1504} n={16} col="#ffffff" fall={14} />
      <LowScrim k={0.6} />
      <Grade sunX={800} sunY={560} warm="250,240,226" cool="40,60,90" />
      <Chip text="Shoulder strap" t={t} t0={12.5} x={60} y={200} icon="check" big />
      <Chip text="Across your body" t={t} t0={13.9} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: back on the rocks, both hands on the rock, water at his hip (15.27 - 18.38) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y - lt * 8, zoom: mix(1.06, 1.12, lt / 3.11), rot: hh.rot };
  const tilt = 0.22;
  const x = 380 + lt * 24;
  const g = 1560 - tilt * (x - 540);
  const ph = t * 1.6;
  const p: HikerProps = { x, y: g + 40, scale: 2.5, phase: ph, walk: 0.3, lean: 0.34, poles: false, handOverride: [96 + Math.sin(t * 3) * 4, -10], breathe: Math.sin(t * 4) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={1300} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <RockSlope y={1560} tilt={tilt} />
        <Svg>
          <Boulder x={x + 300} y={g + 60} w={380} h={300} />
        </Svg>
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={OWEN} expression="neutral" />
          <HipSleeve p={p} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,246,226" />
      <Particles seed={1505} n={16} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,226" cool="40,60,90" />
      <Chip text="Both hands free" t={t} t0={15.4} x={60} y={200} icon="check" big />
      <Chip text="Water at your hip" t={t} t0={17.0} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 MACRO: the neoprene slows the water from freezing (18.38 - 20.64) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.26), rot: hh.rot };
  const frost = at(t, [18.5, 19.8], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="f" treeY={1150} blur={16} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <g transform="translate(540,1420)">
            {[0, 1, 2, 3].map((i) => {
              const k = (t * 0.6 + i * 0.25) % 1;
              const y = -820 + i * 200;
              return <path key={i} d={`M${-520 + k * 200},${y} l120,0 m-30,-22 l30,22 l-30,22`} stroke="#dfeaf2" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.8 * Math.sin(k * Math.PI)} />;
            })}
            <rect x={-200} y={-900} width={400} height={900} rx={70} fill={NEO} />
            <rect x={-200} y={-900} width={90} height={900} rx={45} fill={NEO2} opacity={0.6} />
            <rect x={-150} y={-850} width={300} height={800} rx={50} fill="#4a5056" />
            <rect x={-130} y={-830} width={260} height={760} rx={40} fill={STEEL} />
            <rect x={-110} y={-700} width={220} height={610} rx={30} fill={WATER} />
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M-100,${-690 + i * 8} q50,${-14 + Math.sin(t * 3 + i) * 6} 100,0 t100,0`} stroke="#bfe3f2" strokeWidth={6} fill="none" opacity={0.7} />
            ))}
            {Array.from({ length: 14 }, (_, i) => {
              const side = i % 2 ? 1 : -1;
              const y = -860 + ((i * 61) % 820);
              return (
                <g key={i} transform={`translate(${side * 205},${y})`} opacity={frost}>
                  <path d="M-16,0 L16,0 M0,-16 L0,16 M-11,-11 L11,11 M-11,11 L11,-11" stroke="#ffffff" strokeWidth={4} strokeLinecap="round" />
                </g>
              );
            })}
          </g>
        </Svg>
      </Plane>
      <Particles seed={1506} n={16} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" vignette={0.55} />
      <Chip text="Neoprene" t={t} t0={18.8} x={60} y={200} icon="check" big />
      <Chip text="Slows freezing" t={t} t0={19.4} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: Owen at the top in golden light, sleeve at his hip (20.64 - 22.8) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1540;
  const up = at(t, [20.9, 21.5], [0, 1], outExpo);
  const p: HikerProps = { x: 480, y: g + 40, scale: 2.4, walk: 0, lean: -0.04, poles: false, handOverride: [mix(30, 40, up), mix(30, -150, up)], breathe: Math.sin(t * 3) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="g" treeY={g - 160} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={OWEN} expression="happy" />
          <HipSleeve p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.45} col="255,236,200" />
      <Particles seed={1507} n={22} col="#fff3d6" fall={8} />
      <LowScrim k={0.6} />
      <Grade sunX={760} sunY={560} warm="255,226,180" />
      <Readout label="AT THE TOP" value="Both hands free" ok={true} t={t} t0={20.8} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/insulated-neoprene-bottle-sleeve-cut.png"
      cutoutH={640}
      spec="NEOPRENE · STRAP · 550 ML TO 1 L"
      name={
        <>
          Insulated
          <br />
          Bottle Sleeve
        </>
      }
      nameSize={96}
      price="From $12.99"
      save="Save this before your next climb"
    />
  );
};

export const V150: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.36} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.31} to={8.61} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.31} />
    </Scene>
    <Scene from={8.56} to={12.27} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={8.56} />
    </Scene>
    <Scene from={12.22} to={15.32} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={12.22} />
    </Scene>
    <Scene from={15.27} to={18.43} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={15.27} />
    </Scene>
    <Scene from={18.38} to={20.69} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={18.38} />
    </Scene>
    <Scene from={20.64} to={22.9} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={20.64} />
    </Scene>
    <Scene from={22.7} to={27.5} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.31, 1600],
        [4.31, 8.56, 1660],
        [8.56, 12.22, 1660],
        [12.22, 15.27, 1600],
        [15.27, 18.38, 1600],
        [18.38, 20.64, 1660],
        [20.64, 22.7, 1600],
      ]}
    />
  </AbsoluteFill>
);
