// V95: "Skip the mall. Take them here." in the cinematic C01 style. Black Friday sale day 1 (Nov 27, 07:00 ET).
// Advice (standard, conservative): pick a shorter trail than you think, check the forecast, layers not cotton, tell someone
// your plan, be back well before dark (early sunset). Sale is real: offer o02, 25% off the Beginner's Hiking Guide
// Nov 27 - Dec 1 (US Eastern). Base price $9.99 from live Shopify. No store names or logos, no countdowns, no was-price.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, Breath, CLEAR, FALL, GOLD, Subject, Trail } from "../fall";
import vo from "../vo/v95.json";

const words = vo.words as unknown as Word[];

const ANA: Outfit = {
  ...GUIDE,
  skin: "#D9A47E",
  skinShade: "#B98463",
  hair: "#2a1d14",
  ponytail: "#2a1d14",
  beard: null,
  cap: "#2F7F86",
  capShade: "#24646a",
  jacket: "#B83A55",
  jacketShade: "#8E2B42",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  pack: "#2F5D8A",
  packShade: "#244a6f",
  glove: null,
};
const DAD: Outfit = {
  ...JAKE,
  skin: "#D9A47E",
  skinShade: "#B98463",
  hair: "#2a1d14",
  beard: "#2a1d14",
  cap: "#5d6b3a",
  capShade: "#46512b",
  jacket: "#2F5D8A",
  jacketShade: "#244a6f",
  pack: "#7a5236",
  packShade: "#5b3c27",
  glove: null,
};
const KID1: Outfit = { ...JAKE, skin: "#D9A47E", skinShade: "#B98463", hair: "#2a1d14", beard: null, cap: "#E3B23C", capShade: "#b88d26", jacket: "#6a3d7a", jacketShade: "#55306a", pack: "#3E4F5C", packShade: "#2C3943", glove: null };
const KID2: Outfit = { ...GUIDE, skin: "#D9A47E", skinShade: "#B98463", hair: "#2a1d14", ponytail: "#2a1d14", beard: null, cap: "#C2662E", capShade: "#9a4f22", jacket: "#2F6F5E", jacketShade: "#22544a", pants: "#4a4f57", pantsShade: "#363a40", pack: "#E3B23C", packShade: "#b88d26", glove: null };

type M = { o: Outfit; dx: number; s: number };
const FAMILY: M[] = [
  { o: KID1, dx: 0, s: 1.35 },
  { o: ANA, dx: 170, s: 1.9 },
  { o: KID2, dx: 340, s: 1.25 },
  { o: DAD, dx: 500, s: 2.0 },
];

const Family: React.FC<{ x: number; g: number; t: number; walk?: number; k?: number; flip?: boolean }> = ({ x, g, t, walk = 0.6, k = 1, flip }) => (
  <>
    {FAMILY.map((m, i) => {
      const ph = t * 3 + i * 1.3;
      const p: HikerProps = { x: x + m.dx * k, y: g + (i % 2) * 14, scale: m.s * k, phase: ph, walk, lean: 0.05, poles: false, handOverride: freeHand(ph, walk), breathe: 0 };
      return <Person key={i} {...p} outfit={m.o} expression="happy" flip={flip} />;
    })}
  </>
);

// Plain wooden trail sign, no logos.
const TrailSign: React.FC<{ x: number; g: number; s?: number; text?: string }> = ({ x, g, s = 1, text = "TRAIL" }) => (
  <g transform={`translate(${x},${g}) scale(${s})`}>
    <rect x={-10} y={-300} width={20} height={300} fill="#6b4a32" />
    <path d="M-120,-300 L110,-300 L150,-250 L110,-200 L-120,-200 Z" fill="#7a5236" stroke="#5b3c27" strokeWidth={6} />
    <text x={0} y={-232} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={54} fill="#f3ead8" letterSpacing={3}>
      {text}
    </text>
  </g>
);

const Lot: React.FC<{ g: number }> = ({ g }) => (
  <Svg>
    <path d={`M-200,2100 L-200,${g - 40} L1300,${g - 40} L1300,2100 Z`} fill="#6d6a64" />
    <path d={`M-200,${g - 40} L1300,${g - 40}`} stroke="#8a857c" strokeWidth={10} />
    {[120, 520, 920].map((x) => (
      <path key={x} d={`M${x},${g + 40} L${x - 60},2100`} stroke="#e8e4da" strokeWidth={10} opacity={0.7} />
    ))}
  </Svg>
);

const Phone: React.FC<{ x: number; y: number; s?: number; children: React.ReactNode }> = ({ x, y, s = 1, children }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-170} y={-330} width={340} height={660} rx={46} fill="#1f2326" />
    <rect x={-152} y={-306} width={304} height={612} rx={32} fill="#f4f6f8" />
    {children}
  </g>
);

// ============ S1 HOOK: car park, Ana points the family at the trail sign, shopping bags left in the car (0 - 3.93) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.02, 1.08, t / 3.93), rot: hh.rot };
  const g = 1500;
  const point = at(t, [0.8, 1.2], [0, 1], outExpo);
  const pa: HikerProps = { x: 560, y: g, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [mix(30, 110, point), mix(30, -70, point)], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="a" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <Lot g={g} />
        <Svg>
          <Car x={150} y={g - 30} s={2.4} body="#8a9aa6" shade="#6d7c87" />
          {/* shopping bags on the back seat, no store names */}
          <rect x={60} y={g - 290} width={60} height={70} rx={6} fill="#e8d9b8" />
          <rect x={100} y={g - 280} width={56} height={60} rx={6} fill="#c9a0a0" />
          <TrailSign x={940} g={g + 10} s={1.3} />
        </Svg>
        <Subject rimX={5}>
          <Person x={380} y={g + 20} scale={1.4} walk={0} lean={0} poles={false} breathe={0} outfit={KID1} expression="happy" />
          <Person x={760} y={g + 30} scale={1.3} walk={0} lean={0} poles={false} breathe={0} outfit={KID2} expression="happy" />
          <Person {...pa} outfit={ANA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a1a" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.2} />
      <Particles seed={951} n={18} leaves={FALL} fall={20} />
      <Grade sunX={790} sunY={560} warm="255,226,180" />
      <Title text={"Skip the mall.\nTake them here."} t={t} t0={0} top={130} size={112} />
      <Chip text="Black Friday" t={t} t0={0.45} x={80} y={420} />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: the family walks into the late-fall woods (3.93 - 6.07) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 20, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.14), rot: hh.rot };
  const g = 1500;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="b" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={4}>
          <Family x={120 + lt * 60} g={g} t={t} k={0.75} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a1a" side="both" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.24} />
      <Particles seed={952} n={22} leaves={FALL} fall={22} />
      <Grade sunX={790} sunY={560} warm="255,226,180" />
      <Chip text="A trail instead" t={t} t0={4.0} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: "Here's the fix" — Ana at the trail map picks the short loop (6.07 - 9.04) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.06, 1.02, lt / 2.97), rot: hh.rot };
  const g = 1540;
  const draw = at(t, [7.2, 8.2], [0, 1]);
  const p: HikerProps = { x: 300, y: g, scale: 2.4, walk: 0, lean: 0.02, poles: false, handOverride: [110, -60], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="c" treeY={g - 200} t={t} blur={6} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          {/* map board */}
          <rect x={560} y={g - 560} width={24} height={560} fill="#5b3c27" />
          <rect x={940} y={g - 560} width={24} height={560} fill="#5b3c27" />
          <rect x={520} y={g - 760} width={480} height={360} rx={14} fill="#7a5236" />
          <rect x={545} y={g - 735} width={430} height={310} rx={8} fill="#ece4cf" />
          <path d={`M600,${g - 470} C680,${g - 700} 860,${g - 720} 920,${g - 600} C960,${g - 520} 800,${g - 440} 600,${g - 470}`} stroke="#b5a68a" strokeWidth={10} fill="none" strokeDasharray="18 12" />
          <path d={`M600,${g - 470} C640,${g - 560} 720,${g - 580} 760,${g - 520} C790,${g - 470} 700,${g - 440} 600,${g - 470}`} stroke="#2F7F86" strokeWidth={14} fill="none" pathLength={1} strokeDasharray={`${draw} 1`} />
          <circle cx={600} cy={g - 470} r={16} fill="#B83A55" />
        </Svg>
        <Subject rimX={5}>
          <Person {...p} outfit={ANA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Particles seed={953} n={16} leaves={FALL} fall={18} />
      <Grade sunX={790} sunY={560} warm="255,226,180" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={6.9} top={200} size={124} />
      <Chip text="Shorter than you think" t={t} t0={6.95} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the forecast on Ana's phone (9.04 - 10.48) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.44), rot: hh.rot };
  const up = at(t, [9.04, 9.4], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={1150} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Svg>
            <g transform={`translate(0,${(1 - up) * 400})`}>
              <path d="M820,2100 L760,1500 Q760,1430 830,1420 L1200,1420 L1200,2100 Z" fill={ANA.jacket} />
              <Phone x={560} y={1060} s={1.25}>
                <text x={0} y={-220} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={700} fontSize={44} fill="#5a6066">TODAY</text>
                <circle cx={-10} cy={-90} r={60} fill="#f2b632" />
                <ellipse cx={40} cy={-50} rx={80} ry={44} fill="#c9d3dc" />
                <text x={0} y={70} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={92} fill="#1f2326">Dry</text>
                <text x={0} y={140} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={700} fontSize={46} fill="#5a6066">Light wind</text>
                <rect x={-110} y={190} width={220} height={12} rx={6} fill="#dde3e8" />
                <rect x={-110} y={230} width={160} height={12} rx={6} fill="#dde3e8" />
              </Phone>
              <ellipse cx={810} cy={1400} rx={110} ry={90} fill={ANA.skin} />
              <ellipse cx={330} cy={1300} rx={70} ry={50} fill={ANA.skinShade} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={954} n={12} leaves={FALL} fall={16} />
      <Grade sunX={790} sunY={560} warm="255,226,180" vignette={0.55} />
      <Chip text="Check the forecast" t={t} t0={9.1} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: her son dressed in layers (base, fleece, shell) (10.48 - 12.92) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.44), rot: hh.rot };
  const p: HikerProps = { x: 340, y: 1300 + 182 * 4.2, scale: 4.2, walk: 0, lean: 0.02, poles: false, breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={KID1} expression="happy" noPack />
          <Breath p={p} t={t} k={0.8} />
          <Svg>
            {/* three layers stacking in beside him: base, fleece, shell */}
            {[
              ["#d9d2c4", "#bfb7a8", 10.7],
              ["#2F7F86", "#24646a", 11.0],
              ["#6a3d7a", "#55306a", 11.3],
            ].map(([c, c2, t0], i) => {
              const k = at(t, [t0 as number, (t0 as number) + 0.3], [0, 1], outExpo);
              const y = 760 + i * 230;
              return (
                <g key={i} transform={`translate(${mix(1300, 860, k)},${y})`} opacity={k}>
                  <path d="M-120,-80 L-60,-110 Q0,-80 60,-110 L120,-80 L150,10 L100,20 L100,110 L-100,110 L-100,20 L-150,10 Z" fill={c as string} stroke={c2 as string} strokeWidth={8} />
                </g>
              );
            })}
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={955} n={12} leaves={FALL} fall={16} />
      <Grade sunX={790} sunY={560} warm="255,226,180" vignette={0.55} />
      <Chip text="Layers" t={t} t0={11.56} x={60} y={200} icon="check" big />
      <Chip text="Not cotton" t={t} t0={11.8} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the trail plan text goes out (12.92 - 14.63) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.71), rot: hh.rot };
  const sent = at(t, [13.5, 13.8], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={1150} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Svg>
            <path d="M820,2100 L760,1500 Q760,1430 830,1420 L1200,1420 L1200,2100 Z" fill={ANA.jacket} />
            <Phone x={560} y={1060} s={1.25}>
              <g transform={`translate(0,${(1 - sent) * 40})`} opacity={sent}>
                <rect x={-120} y={-80} width={250} height={150} rx={30} fill="#2F7F86" />
                <text x={5} y={-22} textAnchor="middle" fontFamily="Inter" fontWeight={600} fontSize={30} fill="#fff">Trail plan:</text>
                <text x={5} y={26} textAnchor="middle" fontFamily="Inter" fontWeight={600} fontSize={30} fill="#fff">back by 3</text>
              </g>
              <text x={100} y={110} textAnchor="middle" fontFamily="Inter" fontSize={22} fill="#5a6066" opacity={sent}>Sent</text>
            </Phone>
            <ellipse cx={810} cy={1400} rx={110} ry={90} fill={ANA.skin} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={956} n={12} leaves={FALL} fall={16} />
      <Grade sunX={790} sunY={560} warm="255,226,180" vignette={0.55} />
      <Chip text="Tell someone" t={t} t0={12.95} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 WIDE: low November sun, the family walking back well before dark (14.63 - 18.54) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 18, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.9), rot: hh.rot };
  const g = 1500;
  const sky = { ...GOLD, sun: [300, mix(700, 780, lt / 3.9)] as [number, number] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={sky} uid="g" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={-5} col="rgba(255,200,140,0.9)">
          <Family x={760 - lt * 50} g={g} t={t} k={0.7} flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a1a" side="right" />
      </Plane>
      <Rays x={300} y={740} strength={0.3} col="255,200,140" />
      <Particles seed={957} n={18} leaves={FALL} fall={20} />
      <Grade sunX={300} sunY={740} warm="255,190,120" />
      <Chip text="Back before dark" t={t} t0={15.55} x={60} y={200} icon="check" big />
      <Chip text="Sun sets early now" t={t} t0={16.8} x={60} y={330} big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: the family at a lookout over late-fall hills (18.54 - 20.75) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 16, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.05], outExpo), rot: hh.rot };
  const g = 1420;
  const people: [Outfit, number, number][] = [
    [DAD, 200, 2.0],
    [KID1, 400, 1.35],
    [ANA, 580, 1.9],
    [KID2, 790, 1.25],
  ];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g + 160} t={t} far="#8f8aa6" mid="#6a6a58" />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g} Q300,${g - 50} 700,${g - 20} Q1000,${g} 1480,${g - 30} L1480,2600 L-400,2600 Z`} fill="#7d7468" />
          <path d={`M-400,${g + 60} Q500,${g + 30} 1480,${g + 50} L1480,2600 L-400,2600 Z`} fill="#665f55" />
        </Svg>
        <Subject rimX={-6} col="rgba(255,190,120,0.9)">
          {people.map(([o, x, s], i) => (
            <Person key={i} x={x} y={g + (i % 2) * 10} scale={s} walk={0} lean={0} poles={false} handOverride={i === 2 ? [80, -150] : null} breathe={Math.sin(t * 3 + i) * 2} outfit={o} expression="happy" flip={i % 2 === 1} />
          ))}
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.32} col="255,214,150" />
      <Particles seed={958} n={24} col="#ffe7b8" leaves={FALL} />
      <Grade sunX={740} sunY={660} warm="255,180,100" />
    </AbsoluteFill>
  );
};

// ============ S9 CLOSE-UP: Ana and her daughter laughing at the lookout, sale chip (20.75 - 23.45) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.07, lt / 2.7), rot: hh.rot };
  const laugh = Math.abs(Math.sin(t * 7)) * 3;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="i" treeY={1350} blur={10} t={t} far="#8f8aa6" mid="#6a6a58" />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,190,120,0.9)">
          <Person x={330} y={1300 + 182 * 4.2 - laugh} scale={4.2} walk={0} lean={-0.05} poles={false} breathe={laugh} outfit={ANA} expression="happy" />
          <Person x={820} y={1520 + 182 * 3.2} scale={3.2} walk={0} lean={-0.04} poles={false} breathe={laugh} outfit={KID2} expression="happy" flip />
        </Subject>
      </Plane>
      <Particles seed={959} n={20} col="#ffe7b8" leaves={FALL} />
      <Grade sunX={740} sunY={660} warm="255,180,100" vignette={0.55} />
      <Chip text="25% off through Dec 1" t={t} t0={22.41} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <AbsoluteFill>
      <EndCard
        lt={lt}
        photo="products/beginners-hiking-guide.jpg"
        spec="12 CHAPTERS · PRINTABLE PDF"
        name={
          <>
            Beginner's
            <br />
            Hiking Guide
          </>
        }
        nameSize={104}
        price="$9.99"
        save="Save this for your next free day"
      />
      <Chip text="25% off through Dec 1" t={lt} t0={0.5} x={270} y={1800} big />
    </AbsoluteFill>
  );
};

export const V95: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.98} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.93} to={6.12} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.93} />
    </Scene>
    <Scene from={6.07} to={9.09} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.07} />
    </Scene>
    <Scene from={9.04} to={10.53} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.04} />
    </Scene>
    <Scene from={10.48} to={12.97} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={10.48} />
    </Scene>
    <Scene from={12.92} to={14.68} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={12.92} />
    </Scene>
    <Scene from={14.63} to={18.59} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={14.63} />
    </Scene>
    <Scene from={18.54} to={20.8} fadeIn={0.12} fadeOut={0.08}>
      <S8 off={18.54} />
    </Scene>
    <Scene from={20.75} to={23.5} fadeIn={0.08} fadeOut={0.12}>
      <S9 off={20.75} />
    </Scene>
    <Scene from={23.4} to={29} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.93, 1560],
        [3.93, 6.07, 1560],
        [6.07, 9.04, 1560],
        [9.04, 10.48, 1560],
        [10.48, 12.92, 1560],
        [12.92, 14.63, 1560],
        [14.63, 18.54, 1560],
        [18.54, 20.75, 1560],
        [20.75, 23.4, 1560],
      ]}
    />
  </AbsoluteFill>
);
