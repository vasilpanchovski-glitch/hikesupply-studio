// V213: "She woke up to a wet tent." Short format (15.0 s, 39 words), cinematic C01 style, winter camp night.
// Product: Camping Trip Planner & Checklists — Tent and Car Camping (Printable), $5.99 (live Shopify), boxed store cover as in V108.
// Advice (standard camping practice, no numbers): the moisture in a closed tent mostly comes from your own breath; it condenses on
// the cold walls. Keep the vents open a little, even on cold nights. Tent interior and sleeping-bag parts reused from V176.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { FrostTrail, WinterBackdrop } from "../winter";
import { Subject } from "../fall";
import vo from "../vo/v213.json";

const words = vo.words as unknown as Word[];

const LILY: Outfit = {
  ...GUIDE,
  skin: "#EDC1A0",
  skinShade: "#CFA080",
  hair: "#b06a3a",
  ponytail: "#b06a3a",
  beard: null,
  cap: "#2F6B4F",
  capShade: "#22513b",
  jacket: "#C8476A",
  jacketShade: "#A23552",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  pack: "#C2662E",
  packShade: "#9B4E20",
  glove: null,
};
const THIN = "#d9c34a";
const BAG = { c: "#C2662E", s: "#9B4E20", in: "#7a3a18" };
const THICK = { c: "#2F7F86", s: "#256870" };
const TENT = { wall: "#2b3d58", wall2: "#22324a", floor: "#1c2433" };

// Breath cloud near a head position (screen units).
const Puff: React.FC<{ x: number; y: number; t: number; dir?: number; s?: number }> = ({ x, y, t, dir = 1, s = 1 }) => (
  <g>
    {[0, 0.5].map((o) => {
      const q = (t * 0.7 + o) % 1;
      return <circle key={o} cx={x + dir * (20 + q * 80) * s} cy={y - q * 30 * s} r={(8 + q * 26) * s} fill="#eef3f8" opacity={0.45 * (1 - q)} />;
    })}
  </g>
);

const Frost: React.FC<{ n: number; y0: number; y1: number; seed: number; op?: number }> = ({ n, y0, y1, seed, op = 0.8 }) => (
  <g opacity={op}>
    {Array.from({ length: n }, (_, i) => {
      const x = (i * 157 + seed * 31) % 1180 - 50;
      const y = y0 + ((i * 97 + seed * 13) % Math.max(1, y1 - y0));
      const r = 6 + (i % 4) * 4;
      return (
        <g key={i} transform={`translate(${x},${y}) rotate(${i * 23})`} stroke="#e8f3ff" strokeWidth={2.4}>
          <line x1={-r} y1={0} x2={r} y2={0} />
          <line x1={-r * 0.5} y1={-r * 0.87} x2={r * 0.5} y2={r * 0.87} />
          <line x1={-r * 0.5} y1={r * 0.87} x2={r * 0.5} y2={-r * 0.87} />
        </g>
      );
    })}
  </g>
);

// Tent interior at night (screen units), floor at y.
const TentInside: React.FC<{ y: number; frost?: number; glow?: string }> = ({ y, frost = 1, glow = "#9fb2cc" }) => (
  <Svg>
    <rect x={-200} y={-200} width={1500} height={2400} fill={TENT.wall} />
    <path d={`M-200,${y} L540,-200 L1300,${y} Z`} fill={TENT.wall2} />
    <path d={`M540,-200 L540,${y}`} stroke="#1a2638" strokeWidth={10} />
    <path d={`M-200,${y - 600} Q540,${y - 760} 1300,${y - 600}`} stroke="#1a2638" strokeWidth={8} fill="none" />
    <circle cx={800} cy={300} r={500} fill={glow} opacity={0.08} />
    <Frost n={46} y0={-100} y1={y - 300} seed={3} op={frost} />
    <rect x={-200} y={y} width={1500} height={1200} fill={TENT.floor} />
  </Svg>
);

// Lena lying in her bag, head to the left. thick 0..1 swaps the thin pad for a thick one; hat shows a beanie.
const InBag: React.FC<{ x: number; y: number; s: number; t: number; shiver?: number; thick?: number; hat?: boolean; expr?: "tired" | "neutral" | "happy" }> = ({ x, y, s, t, shiver = 0, thick = 0, hat = false, expr = "tired" }) => {
  const j = Math.sin(t * 44) * 3 * shiver;
  const lift = thick * 34 * (s / 3);
  const p: HikerProps = { x: 0, y: 0, scale: s, walk: 0, lean: 0, poles: false, breathe: 0, handOverride: [8, -8] };
  return (
    <g transform={`translate(${x + j},${y - lift})`}>
      {/* pads under */}
      <rect x={-560 * (s / 3)} y={60 * (s / 3) + lift} width={1300 * (s / 3)} height={14 * (s / 3)} rx={6} fill={THIN} opacity={1 - thick} />
      <g opacity={thick}>
        <rect x={-560 * (s / 3)} y={40 * (s / 3)} width={1300 * (s / 3)} height={50 * (s / 3) + lift} rx={18} fill={THICK.c} />
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1={-500 * (s / 3) + i * 125 * (s / 3)} y1={44 * (s / 3)} x2={-500 * (s / 3) + i * 125 * (s / 3)} y2={84 * (s / 3) + lift} stroke={THICK.s} strokeWidth={6} />
        ))}
      </g>
      {/* the person, rotated to lie with the head on the left */}
      <g transform={`translate(${700 * (s / 3)},${-72 * (s / 3)}) rotate(-90)`}>
        <Person {...p} outfit={hat ? { ...LILY, cap: "#2F5D3E", capShade: "#244a31" } : LILY} expression={expr} noPack />
      </g>
      {/* mummy bag over the body */}
      <path
        d={`M${-330 * (s / 3)},${-70 * (s / 3)} Q${-200 * (s / 3)},${-180 * (s / 3)} ${200 * (s / 3)},${-165 * (s / 3)} Q${640 * (s / 3)},${-140 * (s / 3)} ${700 * (s / 3)},${-10 * (s / 3)} Q${720 * (s / 3)},${50 * (s / 3)} ${600 * (s / 3)},${60 * (s / 3)} L${-330 * (s / 3)},${60 * (s / 3)} Q${-380 * (s / 3)},${0} ${-330 * (s / 3)},${-70 * (s / 3)} Z`}
        fill={BAG.c}
      />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M${(-200 + i * 140) * (s / 3)},${-165 * (s / 3)} Q${(-220 + i * 140) * (s / 3)},${-30 * (s / 3)} ${(-200 + i * 140) * (s / 3)},${58 * (s / 3)}`} stroke={BAG.s} strokeWidth={7} fill="none" />
      ))}
      {/* hood around the face */}
      <path d={`M${-330 * (s / 3)},${-70 * (s / 3)} Q${-420 * (s / 3)},${-10 * (s / 3)} ${-330 * (s / 3)},${60 * (s / 3)}`} stroke={BAG.s} strokeWidth={22 * (s / 3)} fill="none" strokeLinecap="round" />
    </g>
  );
};


const Tent: React.FC<{ x: number; y: number; s?: number; glow?: number }> = ({ x, y, s = 1, glow = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={8} rx={230} ry={20} fill="rgba(0,0,0,0.35)" />
    <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill="#5f7a4a" />
    <path d="M0,-250 Q200,-230 220,0 L80,0 Q90,-150 0,-250 Z" fill="#4c6339" />
    {glow > 0 && <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill={`rgba(255,200,120,${0.3 * glow})`} />}
    <path d="M-90,0 Q-80,-160 0,-180 Q80,-160 90,0 Z" fill={glow > 0 ? `rgba(255,214,150,${0.55 + glow * 0.35})` : "#2a3322"} />
    <path d="M-200,-60 Q0,-120 200,-60" stroke="#2f3f26" strokeWidth={5} fill="none" />
  </g>
);

// Water drops beaded on the tent walls (screen units). k 0..1 how many; t for slow running drips.
const Drops: React.FC<{ k: number; t: number; y0?: number; y1?: number }> = ({ k, t, y0 = -100, y1 = 1300 }) => {
  if (k <= 0) return null;
  return (
    <g>
      {Array.from({ length: 70 }, (_, i) => {
        const x = ((i * 173) % 1240) - 70;
        const y = y0 + ((i * 89) % Math.max(1, y1 - y0));
        const r = 12 + (i % 4) * 5;
        const show = at(k, [i / 90, i / 90 + 0.15], [0, 1]);
        const run = i % 7 === 0 ? ((t * 60 + i * 13) % 220) : 0;
        return (
          <g key={i} opacity={show} transform={`translate(${x},${y + run})`}>
            <path d={`M0,${-r * 1.3} Q${r},0 0,${r} Q${-r},0 0,${-r * 1.3} Z`} fill="#a9c8dc" opacity={0.85} stroke="#e8f4fb" strokeWidth={2} />
            <circle cx={-r * 0.3} cy={-r * 0.2} r={r * 0.28} fill="#ffffff" opacity={0.9} />
            {i % 7 === 0 && <line x1={0} y1={-run} x2={0} y2={-r} stroke="#cfe6f5" strokeWidth={3} opacity={0.4} />}
          </g>
        );
      })}
    </g>
  );
};

// Close-up of a tent's high vent (screen units): green fly fabric, a mesh window and a zip flap.
// open 0..1: 0 = flap zipped shut over the mesh, 1 = flap rolled up a little and propped open.
const Vent: React.FC<{ open: number; t: number; flow?: number }> = ({ open, t, flow = 0 }) => {
  const flapTop = mix(640, 470, open); // flap top edge drops as it is propped open
  return (
    <g>
      <rect x={-300} y={-300} width={1700} height={2600} fill="#5f7a4a" />
      <path d="M-300,1500 Q540,1100 1400,1500 L1400,2300 L-300,2300 Z" fill="#4c6339" />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M${-100 + i * 260},-300 Q${-60 + i * 260},900 ${-120 + i * 260},2300`} stroke="#566f43" strokeWidth={6} fill="none" opacity={0.6} />
      ))}
      {/* vent opening with mesh */}
      <path d="M220,640 Q540,460 860,640 L860,1120 L220,1120 Z" fill="#1b2416" />
      <g opacity={0.55}>
        {Array.from({ length: 22 }, (_, i) => (
          <line key={`a${i}`} x1={220 + i * 30} y1={460} x2={220 + i * 30} y2={1120} stroke="#8a9a7c" strokeWidth={2} />
        ))}
        {Array.from({ length: 24 }, (_, i) => (
          <line key={`b${i}`} x1={220} y1={480 + i * 28} x2={860} y2={480 + i * 28} stroke="#8a9a7c" strokeWidth={2} />
        ))}
      </g>
      {/* warm, moist air leaving through the vent */}
      {flow > 0 &&
        [0, 1, 2, 3].map((i) => {
          const q = (t * 0.55 + i / 4) % 1;
          return <circle key={i} cx={540 + Math.sin(i * 2 + t) * 120} cy={mix(1080, 520, q)} r={40 + q * 70} fill="#eef3f8" opacity={0.32 * flow * (1 - q)} />;
        })}
      {/* the zip flap */}
      <path d={`M200,${flapTop} Q540,${flapTop - 150 * (1 - open)} 880,${flapTop} L880,1140 L200,1140 Z`} fill="#6c8a54" transform={`translate(0,${open * 520})`} />
      <path d={`M200,${1140 + open * 520} L880,${1140 + open * 520}`} stroke="#33402a" strokeWidth={14} />
      {/* rolled top of the flap and the strut that props it */}
      {open > 0.05 && (
        <g opacity={open}>
          <rect x={200} y={mix(640, 1080, open) - 30} width={680} height={60} rx={30} fill="#7d9a64" />
          <path d={`M540,${mix(640, 1080, open) - 20} L540,${mix(640, 1080, open) - 20 - 180 * open}`} stroke="#2a2f26" strokeWidth={16} strokeLinecap="round" />
        </g>
      )}
      {/* zipper track */}
      <path d="M200,1140 L200,640 Q540,440 880,640 L880,1140" stroke="#33402a" strokeWidth={10} fill="none" />
    </g>
  );
};

// A hand in a red sleeve reaching up to the vent (screen units).
const Hand: React.FC<{ x: number; y: number; rot?: number }> = ({ x, y, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot})`}>
    <path d="M0,0 L-260,700" stroke={LILY.jacket} strokeWidth={150} strokeLinecap="round" />
    <path d="M-20,40 L-70,180" stroke={LILY.jacketShade} strokeWidth={156} />
    <ellipse cx={20} cy={-40} rx={70} ry={58} fill={LILY.skin} />
    <path d="M60,-70 q40,-10 50,20 M50,-30 q40,-6 46,22" stroke={LILY.skinShade} strokeWidth={14} fill="none" strokeLinecap="round" />
  </g>
);

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const NIGHT = { top: "#0f1a2e", mid: "#22385a", low: "#3d5778", sun: [820, 380] as [number, number], sunR: 30, sunCol: "#f2f4ff", glow: "#7f95b8" };

// ============ S1 HOOK WIDE: winter camp at dusk, Lily by her glowing tent (0 - 2.4) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - t * 20, y: hh.y, zoom: mix(1.03, 1.09, t / 2.4), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 300, y: g, scale: 2.3, walk: 0, lean: 0.04, poles: false, breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="a" treeY={g - 240} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <Tent x={720} y={g + 10} s={1.6} glow={1} />
        </Svg>
        <Subject rimX={5} col="rgba(255,214,160,0.85)">
          <Person {...p} outfit={{ ...LILY, cap: "#2F5D3E", capShade: "#244a31" }} expression="neutral" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#13202a" side="right" />
      </Plane>
      <Particles seed={2131} n={18} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={720} sunY={1300} warm="255,210,160" cool="20,30,70" vignette={0.55} />
      <Title text={"She woke up\nto a wet tent."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: every vent zipped shut against the cold (2.4 - 3.68) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.03], outExpo), rot: hh.rot };
  const shut = at(t, [2.45, 3.2], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#1b2416" }}>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,214,160,0.7)">
          <Svg>
            <Vent open={1 - shut} t={t} />
            <Hand x={mix(900, 860, shut)} y={mix(1200, 760, shut)} rot={-8} />
          </Svg>
        </Subject>
      </Plane>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(255,190,120,0.15) 0%, rgba(0,0,0,0) 60%)" }} />
      <Particles seed={2132} n={10} col="#ffffff" fall={6} bokeh />
      <Grade sunX={540} sunY={500} warm="255,210,160" cool="20,30,60" vignette={0.6} />
      <Chip text="Every vent shut" t={t} t0={2.6} x={60} y={170} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: morning inside, the walls drip and the bag is damp (3.68 - 6.6) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.9), rot: hh.rot };
  const wet = at(t, [3.7, 5.2], [0.3, 1]);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <TentInside y={1440} frost={0} glow="#c9d6e6" />
        <Svg>
          <Drops k={wet} t={t} y1={1250} />
        </Svg>
        <Subject rimX={5} col="rgba(210,225,245,0.6)">
          <InBag x={430} y={1380} s={2.3} t={t} thick={1} hat expr="tired" />
        </Subject>
        <Svg>
          <Puff x={250} y={1250} t={t} dir={-1} s={1.1} />
          {/* damp dark patch on the bag's foot, a drip falling onto it */}
          <ellipse cx={1010} cy={1290} rx={150} ry={60} fill="#3a1a08" opacity={0.45 * at(t, [4.6, 5.4], [0, 1])} />
          {[0, 1].map((i) => {
            const q = (t * 0.9 + i * 0.5) % 1;
            return <path key={i} d="M0,-16 Q11,3 0,13 Q-11,3 0,-16 Z" transform={`translate(${980 + i * 70},${mix(300, 1240, q)}) scale(1.5)`} fill="#cfe6f5" opacity={0.85 * (1 - q * 0.3)} />;
          })}
        </Svg>
      </Plane>
      <Particles seed={2133} n={8} col="#e6f0fb" fall={4} bokeh />
      <Grade sunX={800} sunY={300} warm="220,228,240" cool="20,30,60" vignette={0.6} />
      <Chip text="Wet tent walls" t={t} t0={4.3} x={60} y={170} icon="x" big />
      <Chip text="Damp sleeping bag" t={t} t0={5.3} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the rule, the vent propped open a little, moist air drifts out (6.6 - 10.24) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y - 30, zoom: mix(1.0, 1.07, lt / 3.6), rot: hh.rot };
  const open = at(t, [7.2, 8.1], [0, 0.55], outExpo);
  return (
    <AbsoluteFill style={{ background: "#1b2416" }}>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,180,0.8)">
          <Svg>
            <Vent open={open} t={t} flow={at(t, [7.9, 8.6], [0, 1])} />
            <g opacity={at(t, [8.2, 8.6], [1, 0])}>
              <Hand x={mix(860, 960, open / 0.55)} y={mix(760, 1100, open / 0.55)} rot={-8} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Rays x={540} y={420} strength={0.25} col="255,236,200" />
      <Particles seed={2134} n={14} col="#fff3d6" fall={-4} bokeh />
      <Grade sunX={540} sunY={420} warm="255,226,180" vignette={0.5} />
      <Chip text="The rule" t={t} t0={6.8} x={60} y={170} icon="none" big />
      <Chip text="Vents open a little" t={t} t0={7.9} x={60} y={300} icon="check" big />
      <Chip text="Even in the cold" t={t} t0={9.1} x={60} y={430} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/camping-trip-planner-checklists.jpg"
      photoH={720}
      spec="24 PAGES · TENT + CAR CAMPING"
      name={
        <>
          Camping Trip
          <br />
          Planner
        </>
      }
      nameSize={104}
      price="$5.99"
      save="Save this for winter camping"
    />
  );
};

export const V213: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.48} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.4} to={3.76} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.4} />
    </Scene>
    <Scene from={3.68} to={6.68} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={3.68} />
    </Scene>
    <Scene from={6.6} to={10.32} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={6.6} />
    </Scene>
    <Scene from={10.24} to={15.0} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.4, 1600],
        [2.4, 3.68, 1600],
        [3.68, 6.6, 1600],
        [6.6, 10.24, 1600],
      ]}
    />
  </AbsoluteFill>
);
