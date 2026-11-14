// V155: "One gust and her glove was gone." in the cinematic C01 style, windy winter lookout. Story for the
// Winter Hiking Guide & Cold-Weather Checklist ($7.99, live Shopify). Advice (simple, safe): take gloves off only out of
// the wind, tuck them inside your jacket, never on the ground; wear thin liners for your phone; pack a spare pair.
// No numbers, no medical claims. End card = real Shopify cover photo (boxed card, it is a guide cover).
import React from "react";
import { AbsoluteFill } from "remotion";
import { hikerGeometry, hikerTransform, HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { Blizzard, FrostTrail, STORM, WGOLD, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v155.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC<{ k?: number }> = ({ k = 0.55 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: `linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,${k}) 45%, rgba(12,22,28,${k}) 70%, rgba(12,22,28,0) 100%)` }} />
);

const RED = "#b0362e"; // her warm gloves
const RED2 = "#842620";
const LINER = "#4a5560"; // thin liner gloves
const LINER2 = "#353e47";

const KATE: Outfit = {
  ...JAKE,
  skin: "#E8B996",
  skinShade: "#C9946F",
  hair: "#7a4a2a",
  ponytail: "#7a4a2a",
  beard: null,
  cap: "#e6e1d6",
  capShade: "#c4beb0",
  jacket: "#2f6f8f",
  jacketShade: "#235670",
  pants: "#3a3f46",
  pantsShade: "#2a2e33",
  pack: "#5a4a3a",
  packShade: "#463a2d",
  glove: null,
};
const K_RED: Outfit = { ...KATE, glove: RED };
const K_LINER: Outfit = { ...KATE, glove: LINER };

// Big glove, local coords, wrist at the right.
const Glove: React.FC<{ col: string; shade: string; thin?: boolean }> = ({ col, shade, thin }) => {
  const s = thin ? 0.86 : 1;
  return (
    <g transform={`scale(${s})`}>
      <path d="M-150,-60 Q-190,-20 -170,40 Q-150,90 -60,100 L140,100 Q190,60 180,-20 L120,-110 Q-20,-130 -150,-60 Z" fill={col} />
      <path d="M-120,-90 Q-200,-150 -180,-210 Q-130,-230 -70,-130 Z" fill={col} />
      {[-40, 10, 60].map((y, i) => (
        <path key={i} d={`M-160,${y} L90,${y + 6}`} stroke={shade} strokeWidth={thin ? 6 : 12} strokeLinecap="round" />
      ))}
      {!thin && <rect x={120} y={-120} width={90} height={230} rx={26} fill={shade} />}
    </g>
  );
};

// Bare hand, same local frame as Glove.
const Hand: React.FC = () => (
  <g>
    <path d="M-150,-50 Q-185,-10 -165,40 Q-145,85 -60,92 L140,92 Q185,55 175,-20 L120,-100 Q-20,-118 -150,-50 Z" fill={KATE.skin} />
    <path d="M-115,-82 Q-190,-140 -172,-198 Q-128,-216 -68,-122 Z" fill={KATE.skin} />
    {[-30, 15, 58].map((y, i) => (
      <path key={i} d={`M-150,${y} L60,${y + 6}`} stroke={KATE.skinShade} strokeWidth={6} strokeLinecap="round" />
    ))}
    <rect x={130} y={-110} width={100} height={210} rx={26} fill={KATE.jacket} />
  </g>
);

// Phone held in the near hand of a Person.
const Phone: React.FC<{ p: HikerProps }> = ({ p }) => {
  const g = hikerGeometry(p);
  const h = g.arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] + 4},${h[1] - 10}) rotate(-12)`}>
        <rect x={-12} y={-22} width={24} height={40} rx={4} fill="#1d1f1e" />
        <rect x={-9} y={-18} width={18} height={31} rx={2} fill="#dfeef3" />
      </g>
    </g>
  );
};

// Edge of the lookout: rock ledge falling away to the right, distant valley below.
const Ledge: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-300,${y + 20} Q300,${y - 30} 760,${y} L860,${y + 40} L900,2600 L-300,2600 Z`} fill="#6f747a" />
    <path d={`M-300,${y + 20} Q300,${y - 30} 760,${y} L800,${y + 20} Q300,${y - 6} -300,${y + 44} Z`} fill="#eef2f4" />
    <path d={`M760,${y} L860,${y + 40} L900,2600 L820,2600 L800,${y + 60} Z`} fill="#565b61" />
    <path d={`M200,${y + 200} L420,${y + 400} M600,${y + 160} L700,${y + 420}`} stroke="#5d6268" strokeWidth={8} opacity={0.6} />
  </Svg>
);

// ============ S1 HOOK MEDIUM: Kate at the windy lookout, phone up for a photo, one glove off (0 - 3.0) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x - t * 10, y: hh.y, zoom: mix(1.04, 1.1, t / 3), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 430, y: g + 40, scale: 2.5, walk: 0, lean: 0.02, poles: false, handOverride: [64, -36], breathe: Math.sin(t * 4) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={1760} woods={false} t={t} />
      <Plane cam={cam} depth={1}>
        <Ledge y={g} />
        <Subject rimX={6} col="rgba(236,240,246,0.85)">
          <Person {...p} outfit={KATE} expression="happy" />
          <Phone p={p} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Blizzard seed={1551} n={26} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <LowScrim k={0.6} />
      <Grade sunX={820} sunY={520} warm="230,234,242" cool="30,45,80" />
      <Title text={"One gust and\nher glove\nwas gone."} t={t} t0={0} top={110} size={128} />
      <Chip text="Windy lookout" t={t} t0={1.4} x={60} y={660} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: bare hand sets the red glove down on the rock (3.0 - 5.15) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.05, 1.12, lt / 2.15), rot: hh.rot };
  const down = at(t, [3.2, 4.1], [0, 1], outExpo);
  const away = at(t, [4.3, 5.0], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={1700} woods={false} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,1240 Q300,1180 700,1210 Q1000,1240 1300,1200 L1300,2400 L-200,2400 Z" fill="#7d8288" />
          <path d="M-200,1240 Q300,1180 700,1210 Q1000,1240 1300,1200 L1300,1240 Q1000,1280 700,1250 Q300,1220 -200,1280 Z" fill="#e9eef1" />
          <path d="M100,1450 L400,1650 M700,1400 L900,1750" stroke="#666b71" strokeWidth={8} opacity={0.6} />
        </Svg>
        <Subject rimX={6} col="rgba(236,240,246,0.85)">
          {/* glove resting on the rock */}
          <g transform={`translate(${mix(560, 470, down)},${mix(940, 1170, down)}) rotate(${mix(-20, -6, down)}) scale(1.15)`}>
            <Glove col={RED} shade={RED2} />
          </g>
          {/* bare hand lets go and pulls back up */}
          <g transform={`translate(${mix(860, 940, away)},${mix(mix(760, 980, down), 700, away)}) rotate(-10) scale(1.1)`}>
            <Hand />
          </g>
        </Subject>
      </Plane>
      <Blizzard seed={1552} n={18} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="236,236,240" cool="30,45,80" vignette={0.55} />
      <Chip text="Glove on the rock" t={t} t0={3.6} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: the gust, the glove tumbles over the edge (5.15 - 7.7) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6, at(t, [5.4, 5.6, 6.0], [0, 1.4, 0]));
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.08, 1.02, lt / 2.5), rot: hh.rot };
  const g = 1520;
  const fly = at(t, [5.45, 7.3], [0, 1]);
  const gx = mix(640, 960, fly);
  const gy = g - 30 - Math.sin(fly * Math.PI) * 520 + fly * fly * 300;
  const reach = at(t, [5.7, 6.2], [0, 1], outExpo);
  const p: HikerProps = { x: 360, y: g + 40, scale: 2.2, walk: 0, lean: mix(0.02, 0.18, reach), poles: false, handOverride: [mix(64, 110, reach), mix(-36, 10, reach)], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={1760} woods={false} t={t} />
      <Plane cam={cam} depth={1}>
        <Ledge y={g} />
        <Svg>
          <g transform={`translate(${gx},${gy}) rotate(${fly * 540}) scale(0.62)`}>
            <Glove col={RED} shade={RED2} />
          </g>
        </Svg>
        <Subject rimX={6} col="rgba(236,240,246,0.85)">
          <Person {...p} outfit={KATE} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Blizzard seed={1553} n={44} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <LowScrim k={0.6} />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" />
      <Chip text="One gust" t={t} t0={5.5} x={60} y={200} icon="x" big />
      <Chip text="Over the edge" t={t} t0={6.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: hiking down, one bare hand stuffed in her pocket (7.7 - 11.05) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 8, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.35), rot: hh.rot };
  const g = 1500;
  const ph = t * 2.2;
  const p: HikerProps = { x: 560, y: g + 900, scale: 4.4, phase: ph, walk: 0.15, lean: 0.06, poles: false, handOverride: [36, 30], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={1500} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={7} col="rgba(236,240,246,0.85)">
          <Person {...p} outfit={KATE} expression="tired" />
          <Breath p={p} t={t} />
          {/* pocket flap over the tucked hand */}
          <g transform={hikerTransform(p)}>
            <rect x={14} y={22} width={44} height={30} rx={6} fill={KATE.jacketShade} />
          </g>
        </Subject>
      </Plane>
      <Blizzard seed={1554} n={30} />
      <LowScrim k={0.6} />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" vignette={0.6} />
      <Readout label="ONE HAND" value="Bare" ok={false} t={t} t0={8.6} x={60} y={200} />
      <Chip text="Stuffed in her pocket" t={t} t0={9.6} x={60} y={420} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: the fix, glove off only behind a boulder, out of the wind (11.05 - 14.6) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y - lt * 4, zoom: mix(1.04, 1.1, lt / 3.55), rot: hh.rot };
  const g = 1540;
  const pull = at(t, [13.0, 13.8], [0, 1]);
  const p: HikerProps = { x: 640, y: g + 40, scale: 2.4, walk: 0, lean: 0.04, poles: false, handOverride: [mix(40, 70, pull), mix(40, -10, pull)], breathe: Math.sin(t * 4) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={1300} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={0} snow={1} />
        <Subject rimX={6} col="rgba(255,240,215,0.85)">
          <Person {...p} outfit={pull > 0.5 ? K_LINER : K_RED} expression="neutral" />
          <Breath p={p} t={t} />
        </Subject>
        {/* big sheltering boulder on the windward side */}
        <Svg>
          <path d={`M-120,${g + 120} Q-60,${g - 520} 200,${g - 600} Q380,${g - 580} 420,${g - 300} Q450,${g - 40} 380,${g + 140} Z`} fill="#6c7177" />
          <path d={`M-60,${g - 420} Q60,${g - 600} 200,${g - 600} Q330,${g - 590} 380,${g - 480} Q230,${g - 540} 60,${g - 470} Z`} fill="#eef2f4" />
          <path d={`M120,${g - 300} L240,${g - 120}`} stroke="#5b6066" strokeWidth={8} opacity={0.6} />
        </Svg>
      </Plane>
      {/* wind streaks only on the far left, blocked by the boulder */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 360, height: 1920, overflow: "hidden" }}>
        <Blizzard seed={1555} n={24} />
      </div>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,246,226" />
      <Particles seed={1556} n={10} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="252,236,214" cool="40,60,90" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={12.4} top={200} size={124} />
      <Chip text="Gloves off only" t={t} t0={12.7} x={60} y={200} icon="check" big />
      <Chip text="Out of the wind" t={t} t0={13.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the glove goes inside the jacket, not on the ground (14.6 - 17.85) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.25), rot: hh.rot };
  const tuck = at(t, [15.0, 16.2], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1100} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,240,215,0.8)">
          {/* jacket front filling the frame, collar zipped open */}
          <path d="M60,700 Q540,620 1020,700 L1060,2000 L20,2000 Z" fill={KATE.jacket} />
          <path d="M330,680 Q540,760 750,680 L560,1240 L520,1240 Z" fill="#132a36" />
          <path d="M330,680 L520,1240 M750,680 L560,1240" stroke="#c9ced3" strokeWidth={8} />
          {/* glove slides down into the open jacket, fingers first */}
          <g transform={`translate(540,${mix(560, 1000, tuck)}) rotate(-90) scale(0.62)`}>
            <Glove col={RED} shade={RED2} />
          </g>
          {/* lower jacket covers the tucked part */}
          <path d="M20,1180 L500,1180 L540,1250 L580,1180 L1060,1180 L1060,2000 L20,2000 Z" fill={KATE.jacket} />
          <path d="M540,1250 L540,2000" stroke={KATE.jacketShade} strokeWidth={16} />
          <path d="M20,1180 L500,1180 L540,1250 L580,1180 L1060,1180" stroke={KATE.jacketShade} strokeWidth={10} fill="none" />
          {/* liner-gloved hand pushing the cuff in */}
          <g transform={`translate(${mix(600, 620, tuck)},${mix(400, 830, tuck)}) rotate(-70) scale(0.85)`}>
            <Glove col={LINER} shade={LINER2} thin />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1557} n={10} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,236,210" vignette={0.55} />
      <Chip text="Inside your jacket" t={t} t0={15.2} x={60} y={200} icon="check" big />
      <Chip text="Never on the ground" t={t} t0={16.4} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: thin liners on, she takes the photo (17.85 - 20.2) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.05, 1.12, lt / 2.35), rot: hh.rot };
  const tap = at(t, [18.9, 19.05, 19.25], [0, 1, 0]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={1500} woods={false} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,240,215,0.85)">
          <g transform="translate(520,1080) rotate(-8)">
            {/* phone */}
            <rect x={-200} y={-360} width={400} height={720} rx={50} fill="#1b1d1e" />
            <rect x={-178} y={-330} width={356} height={660} rx={34} fill="#9db7cc" />
            <path d="M-178,40 L-60,-80 L40,10 L120,-60 L178,0 L178,330 L-178,330 Z" fill="#e9eef1" />
            <path d="M-178,140 L178,90 L178,330 L-178,330 Z" fill="#6f747a" />
            <circle cx={0} cy={260} r={36} fill="#ffffff" opacity={0.9} />
            <rect x={-178} y={-330} width={356} height={660} rx={34} fill="#ffffff" opacity={tap * 0.7} />
            {/* liner-gloved hands holding it */}
            <g transform="translate(-230,120) rotate(-80) scale(0.95)">
              <Glove col={LINER} shade={LINER2} thin />
            </g>
            <g transform={`translate(${230},${120 - tap * 20}) rotate(-100) scale(-0.95,0.95)`}>
              <Glove col={LINER} shade={LINER2} thin />
            </g>
          </g>
        </Subject>
      </Plane>
      <Particles seed={1558} n={14} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="252,236,214" cool="40,60,90" vignette={0.55} />
      <Chip text="Thin liners for your phone" t={t} t0={18.2} x={60} y={200} icon="check" big />
      <Chip text="Spare pair in the pack" t={t} t0={19.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: golden light, Kate walks down, both gloves on (20.2 - 22.1) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y + lt * 6, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const tilt = -0.1;
  const x = 340 + lt * 80;
  const g = 1560 - tilt * (x - 540);
  const ph = t * 2.6;
  const p: HikerProps = { x, y: g + 40, scale: 2.4, phase: ph, walk: 0.6, lean: -0.04, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="h" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={1560} tilt={tilt} snow={1} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={K_RED} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.45} col="255,236,200" />
      <Particles seed={1559} n={22} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,226,180" />
      <Readout label="BOTH GLOVES" value="Still hers" ok={true} t={t} t0={20.4} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/winter-hiking-guide-cold-weather-checklist-card.jpg"
      photoH={800}
      spec="22 PAGES · PRINTABLE CHECKLISTS"
      name={
        <>
          Winter Hiking
          <br />
          Guide
        </>
      }
      nameSize={96}
      price="$7.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V155: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.05} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.0} to={5.2} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.0} />
    </Scene>
    <Scene from={5.15} to={7.75} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.15} />
    </Scene>
    <Scene from={7.7} to={11.1} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={7.7} />
    </Scene>
    <Scene from={11.05} to={14.65} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.05} />
    </Scene>
    <Scene from={14.6} to={17.9} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.6} />
    </Scene>
    <Scene from={17.85} to={20.25} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={17.85} />
    </Scene>
    <Scene from={20.2} to={22.1} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={20.2} />
    </Scene>
    <Scene from={21.9} to={26.5} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.0, 1600],
        [3.0, 5.15, 1660],
        [5.15, 7.7, 1600],
        [7.7, 11.05, 1660],
        [11.05, 14.6, 1600],
        [14.6, 17.85, 1660],
        [17.85, 20.2, 1660],
        [20.2, 21.9, 1600],
      ]}
    />
  </AbsoluteFill>
);
