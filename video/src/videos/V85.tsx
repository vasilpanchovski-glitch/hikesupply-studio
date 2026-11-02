// V85: "The cold hit after the hike" in the cinematic C01 style, November trailhead parking lot at dusk.
// Advice (standard cold-weather practice, no numbers): a wet layer pulls heat from you fast once you stop moving.
// Leave a dry shirt and a warm fleece in the car; change the wet top first, then zip up the fleece before packing up.
// End card = Polar Fleece Soft-Shell Jacket — Men's, $39.99 (live Shopify), real product photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT, Car } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, FALL, GOLD, Subject } from "../fall";
import vo from "../vo/v85.json";

const words = vo.words as unknown as Word[];

const DUSKY: Sky = { top: "#3c4d68", mid: "#9a8f98", low: "#e6c7a6", sun: [800, 700], sunR: 40, sunCol: "#fff0d8", glow: "#f6c48e" };

const WET = { c: "#4b5866", s: "#36414d" };
const DRY = { c: "#b9c0c6", s: "#959ca3" };
const FLEECE = { c: "#2E64B4", s: "#234e8f" };

const SAM = (top: { c: string; s: string }): Outfit => ({
  ...JAKE,
  skin: "#E2A98A",
  skinShade: "#C4876A",
  hair: "#5a3a22",
  beard: "#5a3a22",
  cap: "#3f4650",
  capShade: "#2e343c",
  jacket: top.c,
  jacketShade: top.s,
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#B5553A",
  packShade: "#8E3F2A",
  glove: null,
});
const CAR = { body: "#6f8a7a", shade: "#566d60" };

// Breath for a person facing right (screen units from geometry).
const Steam: React.FC<{ p: HikerProps; t: number; k?: number; flip?: boolean }> = ({ p, t, k = 1, flip }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      {[0, 0.5].map((o) => {
        const q = (t * 0.8 + o) % 1;
        const dx = (flip ? -1 : 1) * (40 + q * 70);
        return <circle key={o} cx={(flip ? -hx : hx) + dx} cy={hy + 14 - q * 26} r={6 + q * 20} fill="#f2f4f6" opacity={0.42 * (1 - q)} />;
      })}
    </g>
  );
};

// Dark sweat patches on the chest and back (local units, facing right).
const SweatPatch: React.FC<{ p: HikerProps; k: number }> = ({ p, k }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      <ellipse cx={g.sh[0] * 0.55 + 10} cy={g.sh[1] * 0.45} rx={16} ry={30} fill="#26303a" opacity={0.6} />
      <ellipse cx={g.sh[0] * 0.5 - 16} cy={g.sh[1] * 0.6} rx={12} ry={24} fill="#26303a" opacity={0.5} />
    </g>
  );
};

// Gravel parking lot, screen units.
const Lot: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y} L1480,${y - 20} L1480,2600 L-400,2600 Z`} fill="#7c7366" />
    <path d={`M-400,${y + 120} L1480,${y + 100} L1480,2600 L-400,2600 Z`} fill="#6c6458" />
    {Array.from({ length: 40 }, (_, i) => (
      <circle key={i} cx={(i * 211) % 1500 - 200} cy={y + 30 + ((i * 97) % 500)} r={3 + (i % 3)} fill="#5a5348" opacity={0.6} />
    ))}
  </Svg>
);

// SUV seen from behind with the hatch open, screen units, centre x, ground y.
const OpenHatch: React.FC<{ x: number; y: number; s?: number; items?: number }> = ({ x, y, s = 1, items = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={360} ry={22} fill="rgba(0,0,0,0.3)" />
    {/* hatch lifted */}
    <path d="M-280,-430 L280,-430 L250,-650 L-250,-650 Z" fill={CAR.body} />
    <path d="M-240,-470 L240,-470 L220,-620 L-220,-620 Z" fill="#2b3640" />
    <path d="M-200,-600 L-120,-600 L-170,-490 L-220,-490 Z" fill="#ffffff" opacity={0.12} />
    {/* body */}
    <rect x={-320} y={-440} width={640} height={380} rx={40} fill={CAR.body} />
    <rect x={-270} y={-410} width={540} height={210} rx={14} fill="#1e1a17" />
    <rect x={-270} y={-240} width={540} height={40} fill="#3a332d" />
    {/* cargo: a pack, plus (items) folded dry shirt and fleece */}
    <rect x={120} y={-340} width={120} height={110} rx={24} fill="#B5553A" />
    <rect x={130} y={-300} width={100} height={14} fill="#8E3F2A" />
    <g opacity={items}>
      <rect x={-230} y={-270} width={170} height={36} rx={10} fill={DRY.c} />
      <rect x={-230} y={-306} width={170} height={36} rx={10} fill={FLEECE.c} />
      <rect x={-150} y={-306} width={8} height={36} fill="#1c3f78" />
    </g>
    {/* tail lights, bumper, wheels */}
    <rect x={-310} y={-400} width={36} height={90} rx={8} fill="#c43a30" />
    <rect x={274} y={-400} width={36} height={90} rx={8} fill="#c43a30" />
    <rect x={-330} y={-200} width={660} height={60} rx={14} fill="#3a3f44" />
    <rect x={-80} y={-185} width={160} height={30} rx={4} fill="#e8e4d8" />
    <rect x={-310} y={-140} width={100} height={140} rx={18} fill="#1f2222" />
    <rect x={210} y={-140} width={100} height={140} rx={18} fill="#1f2222" />
  </g>
);

// ============ S1 HOOK MEDIUM: Sam at the open trunk in a soaked shirt, shivering (0 - 3.2) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - t * 10, y: hh.y, zoom: mix(1.06, 1.12, t / 3.2), rot: hh.rot };
  const g = 1430;
  const shiver = Math.sin(t * 42) * 2.5;
  const p: HikerProps = { x: 300 + shiver, y: g + 182 * 2.3 - 130, scale: 2.3, walk: 0, lean: 0.12, poles: false, breathe: Math.sin(t * 9) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DUSKY} uid="a" treeY={g - 120} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <Lot y={g - 40} />
        <Svg>
          <OpenHatch x={760} y={g + 60} s={0.95} />
        </Svg>
        <Subject rimX={5} col="rgba(255,214,170,0.85)">
          <Person {...p} outfit={SAM(WET)} expression="tired" noPack />
          <SweatPatch p={p} k={1} />
          <Steam p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2418" side="left" />
      </Plane>
      <Particles seed={851} n={18} col="#fff3d6" fall={30} leaves={FALL} />
      <Grade sunX={800} sunY={700} warm="240,214,190" cool="30,40,70" vignette={0.6} />
      <Title text={"The cold hit\nafter the hike"} t={t} t0={0} top={130} size={136} />
      <Chip text="Sweaty shirt" t={t} t0={1.2} x={80} y={440} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: trailhead lot at dusk, Sam packing up in the wet shirt (3.2 - 6.3) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 26, y: hh.y, zoom: mix(1.0, 1.05, lt / 3.1), rot: hh.rot };
  const g = 1320;
  const lift = Math.sin(t * 2.2) * 0.5 + 0.5;
  const p: HikerProps = { x: 640, y: g + 182 * 1.3 - 40, scale: 1.3, walk: 0, lean: 0.25 + lift * 0.15, poles: false, handOverride: [70, -40 - lift * 30], breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DUSKY} uid="b" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <Lot y={g - 10} />
        <Svg>
          <Car x={180} y={g + 30} s={1.2} body="#8a3a2e" shade="#6c2c22" />
          <OpenHatch x={860} y={g + 70} s={0.55} />
        </Svg>
        <Subject rimX={4}>
          <Person {...p} outfit={SAM(WET)} expression="neutral" noPack />
          <SweatPatch p={p} k={1} />
          <Steam p={p} t={t} k={0.8} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2418" side="right" />
      </Plane>
      <Particles seed={852} n={18} col="#fff3d6" fall={30} leaves={FALL} />
      <Grade sunX={800} sunY={700} warm="240,214,190" cool="30,40,70" />
      <Chip text="Packing up in a wet shirt" t={t} t0={3.5} x={60} y={200} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Sam's face, shivering within minutes (6.3 - 8.2) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 1.9), rot: hh.rot };
  const shiver = Math.sin(t * 46) * 4;
  const p: HikerProps = { x: 430 + shiver, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.16, poles: false, breathe: Math.sin(t * 11) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DUSKY} uid="c" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,214,170,0.85)">
          <Person {...p} outfit={SAM(WET)} expression="tired" noPack />
          <SweatPatch p={p} k={1} />
          <Steam p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={853} n={14} col="#fff3d6" fall={20} leaves={FALL} />
      <Grade sunX={800} sunY={700} warm="235,214,200" cool="30,40,70" vignette={0.65} />
      <Chip text="Shivering in minutes" t={t} t0={6.5} x={80} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MACRO: wet fabric, heat leaving once you stop (8.2 - 12.0) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y - lt * 10, zoom: mix(1.0, 1.08, lt / 3.8), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: WET.s }}>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1500} height={2400} fill={WET.c} />
          {Array.from({ length: 70 }, (_, i) => (
            <line key={i} x1={-200} y1={-200 + i * 36} x2={1300} y2={-160 + i * 36} stroke={WET.s} strokeWidth={6} opacity={0.5} />
          ))}
          {/* darker soaked area */}
          <ellipse cx={540} cy={1100} rx={620} ry={760} fill="#2a333d" opacity={0.3} />
          {/* droplets */}
          {Array.from({ length: 16 }, (_, i) => {
            const x = 140 + ((i * 263) % 820);
            const y = 600 + ((i * 181) % 900) + ((t * 30 + i * 13) % 40);
            return <path key={i} d={`M${x},${y - 18} Q${x + 13},${y + 4} ${x},${y + 16} Q${x - 13},${y + 4} ${x},${y - 18} Z`} fill="#cfe9f7" opacity={0.75} />;
          })}
          {/* heat wisps leaving the body, warm to cold */}
          {Array.from({ length: 6 }, (_, i) => {
            const q = (t * 0.55 + i / 6) % 1;
            const x = 180 + i * 140;
            const y = 1400 - q * 900;
            const col = q < 0.5 ? "#ffb070" : "#bcd8ee";
            return (
              <path
                key={i}
                d={`M${x},${y} q30,-50 0,-100 q-30,-50 0,-100`}
                stroke={col}
                strokeWidth={14}
                fill="none"
                strokeLinecap="round"
                opacity={Math.sin(q * Math.PI) * 0.85}
              />
            );
          })}
        </Svg>
      </Plane>
      <Particles seed={854} n={10} col="#e6f0f8" fall={10} />
      <Grade sunX={540} sunY={400} warm="220,220,230" cool="20,40,70" vignette={0.6} />
      <Readout label="WET SHIRT" value="Pulls heat fast" ok={false} t={t} t0={8.4} x={80} y={200} />
      <Chip text="Once you stop moving" t={t} t0={10.1} x={80} y={420} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S5 FIX CLOSE-UP: dry shirt and fleece waiting in the trunk (12.0 - 16.05) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 8, y: hh.y, zoom: mix(1.04, 1.1, lt / 4), rot: hh.rot };
  const a = at(t, [13.6, 14.2], [0, 1], outExpo);
  const b = at(t, [14.6, 15.2], [0, 1], outExpo);
  const Fold: React.FC<{ y: number; c: { c: string; s: string }; k: number; zip?: boolean }> = ({ y, c, k, zip }) => (
    <g transform={`translate(0,${mix(-120, 0, k)})`} opacity={k}>
      <rect x={200} y={y} width={680} height={150} rx={30} fill={c.c} />
      <rect x={200} y={y + 110} width={680} height={40} rx={20} fill={c.s} />
      <path d={`M240,${y + 40} Q540,${y + 20} 840,${y + 40}`} stroke={c.s} strokeWidth={8} fill="none" />
      {zip && <rect x={520} y={y} width={14} height={150} fill="#163a70" />}
      {zip && Array.from({ length: 10 }, (_, i) => <rect key={i} x={516} y={y + 8 + i * 14} width={22} height={4} fill="#9fb4d8" />)}
      {!zip && <path d={`M440,${y} Q540,${y + 50} 640,${y}`} stroke={c.s} strokeWidth={10} fill="none" />}
    </g>
  );
  return (
    <AbsoluteFill style={{ background: "#151210" }}>
      <Plane cam={cam} depth={0.6} blur={8}>
        <Svg>
          <rect x={-200} y={-200} width={1500} height={900} fill="#5c6b78" />
          <path d="M-200,700 L1300,700 L1300,-200 L-200,-200 Z" fill="#8c8f98" opacity={0.4} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* hatch edge and cargo floor */}
          <rect x={-200} y={560} width={1500} height={90} fill={CAR.body} />
          <rect x={-200} y={650} width={1500} height={1400} fill="#2a2420" />
          <rect x={-200} y={1240} width={1500} height={900} fill="#3a332d" />
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1={-200} y1={1260 + i * 30} x2={1300} y2={1260 + i * 30} stroke="#332c27" strokeWidth={6} />
          ))}
        </Svg>
        <Subject rimX={5} col="rgba(255,226,180,0.8)">
          <Fold y={1090} c={DRY} k={a} />
          <Fold y={940} c={FLEECE} k={b} zip />
        </Subject>
      </Plane>
      <Particles seed={855} n={12} col="#ffe7b8" fall={10} />
      <Grade sunX={540} sunY={600} warm="255,214,170" vignette={0.55} />
      <Title text={"Leave dry layers\nin the car."} t={t} t0={off + 0.05} t1={13.5} top={170} size={128} />
      <Chip text="Dry shirt" t={t} t0={13.7} x={80} y={200} icon="check" big />
      <Chip text="Warm fleece" t={t} t0={14.7} x={80} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 MEDIUM: wet top off first, dry shirt on (16.05 - 17.65) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: mix(1.08, 1.12, lt / 1.6), rot: hh.rot };
  const g = 1430;
  const k = at(t, [16.4, 16.9], [0, 1], outExpo);
  const p: HikerProps = { x: 330, y: g + 182 * 2.3 - 130, scale: 2.3, walk: 0, lean: 0.04, poles: false, breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DUSKY} uid="f" treeY={g - 120} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <Lot y={g - 40} />
        <Svg>
          <OpenHatch x={790} y={g + 60} s={0.95} items={1 - k} />
        </Svg>
        <Subject rimX={5} col="rgba(255,214,170,0.85)">
          <g opacity={1 - k}>
            <Person {...p} outfit={SAM(WET)} expression="neutral" noPack />
          </g>
          <g opacity={k}>
            <Person {...p} outfit={SAM(DRY)} expression="happy" noPack />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2418" side="left" />
      </Plane>
      <Particles seed={856} n={14} col="#fff3d6" fall={30} leaves={FALL} />
      <Grade sunX={800} sunY={700} warm="245,214,190" cool="30,40,70" />
      <Chip text="Wet top off first" t={t} t0={16.15} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: the fleece zip goes up (17.65 - 20.75) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.1), rot: hh.rot };
  const z = at(t, [18.4, 19.6], [0, 1], outExpo);
  const zy = mix(1880, 470, z);
  const gap = (y: number) => (y > zy ? 0 : Math.min(70, (zy - y) * 0.09));
  const left: string[] = [];
  const right: string[] = [];
  for (let y = 300; y <= 2000; y += 40) {
    left.push(`${540 - gap(y)},${y}`);
    right.push(`${540 + gap(y)},${y}`);
  }
  return (
    <AbsoluteFill style={{ background: "#1b2a3a" }}>
      <Plane cam={cam} depth={0.5} blur={12}>
        <Svg>
          <rect x={-200} y={-200} width={1500} height={2400} fill="#4d5a6e" />
          <circle cx={900} cy={300} r={260} fill="#f6c48e" opacity={0.35} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,214,170,0.8)">
          {/* dry shirt underneath */}
          <rect x={380} y={420} width={320} height={1700} fill={DRY.c} />
          {/* fleece halves */}
          <path d={`M-100,380 L${left[0]} ${left.join(" ")} L-100,2100 Z`} fill={FLEECE.c} />
          <path d={`M1180,380 L${right[0]} ${right.join(" ")} L1180,2100 Z`} fill={FLEECE.s} />
          {Array.from({ length: 90 }, (_, i) => (
            <circle key={i} cx={-60 + ((i * 137) % 1240)} cy={420 + ((i * 89) % 1600)} r={4} fill="#ffffff" opacity={0.07} />
          ))}
          {/* collar */}
          <path d="M220,380 Q540,300 860,380 L860,470 Q540,400 220,470 Z" fill={FLEECE.s} />
          {/* closed zipper teeth below the slider */}
          {Array.from({ length: 40 }, (_, i) => {
            const y = 300 + i * 44;
            return y > zy ? <rect key={i} x={528} y={y} width={24} height={8} fill="#163a70" /> : null;
          })}
          {/* slider, pull and fingers */}
          <rect x={518} y={zy - 30} width={44} height={60} rx={8} fill="#2a2e33" />
          <rect x={530} y={zy + 26} width={20} height={70} rx={8} fill="#1c1f22" />
          <ellipse cx={600} cy={zy + 70} rx={70} ry={44} fill="#E2A98A" />
          <ellipse cx={575} cy={zy + 44} rx={34} ry={22} fill="#C4876A" />
        </Subject>
      </Plane>
      <Particles seed={857} n={12} col="#ffe7b8" fall={10} />
      <Grade sunX={900} sunY={300} warm="255,214,170" vignette={0.55} />
      <Chip text="Zip up the fleece" t={t} t0={17.8} x={80} y={200} icon="check" big />
      <Chip text="Before you pack up" t={t} t0={19.0} x={80} y={330} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF MEDIUM: Sam in the driver's seat, heater glow (20.75 - 22.6) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.05], outExpo), rot: hh.rot };
  const p: HikerProps = { x: 520, y: 1180 + 182 * 3.2, scale: 3.2, walk: 0, lean: -0.05, poles: false, breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={1200} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* car interior behind him */}
          <rect x={-200} y={620} width={1500} height={1600} fill="#2a2522" />
          <circle cx={780} cy={1200} r={420} fill="#ffb05a" opacity={0.28} />
          <rect x={170} y={700} width={300} height={700} rx={60} fill="#3a3330" />
        </Svg>
        <Subject rimX={-6} col="rgba(255,190,120,0.9)">
          <Person {...p} outfit={SAM(FLEECE)} expression="happy" noPack />
        </Subject>
        <Svg>
          {/* door and window frame in front */}
          <path d="M-200,1260 L1300,1220 L1300,2200 L-200,2200 Z" fill={CAR.body} />
          <path d="M-200,1260 L1300,1220 L1300,1260 L-200,1300 Z" fill={CAR.shade} />
          <rect x={-200} y={560} width={1500} height={70} fill={CAR.shade} />
          <rect x={930} y={560} width={70} height={700} fill={CAR.shade} />
          <path d="M120,660 L360,660 L180,1100 L60,1100 Z" fill="#ffffff" opacity={0.08} />
          {/* steering wheel rim */}
          <ellipse cx={780} cy={1180} rx={170} ry={60} fill="none" stroke="#1c1a18" strokeWidth={34} />
        </Svg>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.24} col="255,214,150" />
      <Particles seed={858} n={18} col="#ffe7b8" leaves={FALL} />
      <Grade sunX={740} sunY={660} warm="255,190,120" />
      <Chip text="Drove home warm" t={t} t0={20.9} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/polar-fleece-soft-shell-jacket-mens-cut.png"
      cutoutH={780}
      spec="MEN'S · 320G FLEECE · WINDPROOF FACE"
      name={
        <>
          Polar Fleece
          <br />
          Soft-Shell Jacket
        </>
      }
      nameSize={88}
      price="$39.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V85: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.25} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.2} to={6.35} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.2} />
    </Scene>
    <Scene from={6.3} to={8.25} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.3} />
    </Scene>
    <Scene from={8.2} to={12.05} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.2} />
    </Scene>
    <Scene from={12.0} to={16.1} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.0} />
    </Scene>
    <Scene from={16.05} to={17.7} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={16.05} />
    </Scene>
    <Scene from={17.65} to={20.8} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={17.65} />
    </Scene>
    <Scene from={20.75} to={22.6} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={20.75} />
    </Scene>
    <Scene from={22.45} to={27.3} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.2, 1560],
        [3.2, 6.3, 1560],
        [6.3, 8.2, 1560],
        [8.2, 12.0, 1560],
        [12.0, 16.05, 1560],
        [16.05, 17.65, 1560],
        [17.65, 20.75, 1560],
        [20.75, 22.45, 1560],
      ]}
    />
  </AbsoluteFill>
);
