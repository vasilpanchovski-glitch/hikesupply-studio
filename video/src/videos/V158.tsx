// V158: "He was stumbling and said he was fine." in the cinematic C01 style, cold drizzle on a forest trail. Story for
// the Hiking Emergency Checklist ($5.99, live Shopify). Advice (conservative, widely taught): learn the "umbles" (stumbles,
// mumbles, fumbles, grumbles); they can be early signs of hypothermia. Stop, get out of the wind, swap wet layers for dry,
// add a hat, turn back together; if he doesn't improve, call for help. No numbers, no medical promises.
// End card = real Shopify cover (boxed card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, FALL, GOLD, Subject, Trail } from "../fall";
import { Blizzard } from "../winter";
import { FaceClose } from "../icy";
import vo from "../vo/v158.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC<{ k?: number }> = ({ k = 0.5 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: `linear-gradient(180deg, rgba(12,18,24,0) 0%, rgba(12,18,24,${k}) 45%, rgba(12,18,24,${k}) 70%, rgba(12,18,24,0) 100%)` }} />
);

const RAINSKY = { top: "#3f4a58", mid: "#7d8792", low: "#b9bcb8", sun: [820, 480] as [number, number], sunR: 26, sunCol: "#e6e6e2", glow: "#cfccc4" };

const DAN: Outfit = {
  ...JAKE,
  skin: "#E4B392",
  skinShade: "#C69373",
  hair: "#5a3a22",
  beard: "#5a3a22",
  cap: "#3f5f78",
  capShade: "#2f4a5f",
  jacket: "#3f5f78",
  jacketShade: "#2f4a5f",
  pants: "#4a4f57",
  pantsShade: "#363a40",
  pack: "#6b5a3a",
  packShade: "#54462c",
  glove: null,
};
// dry layers on: warm fleece colour and a knit hat
const DAN_DRY: Outfit = { ...DAN, jacket: "#c4553a", jacketShade: "#9f432c", cap: "#d9a34a", capShade: "#b5843a" };

const MIA: Outfit = {
  ...JAKE,
  skin: "#B98060",
  skinShade: "#9C6648",
  hair: "#20160f",
  ponytail: "#20160f",
  beard: null,
  cap: "#2f6a4a",
  capShade: "#23523a",
  jacket: "#d9a34a",
  jacketShade: "#b5843a",
  pants: "#3a3f46",
  pantsShade: "#2a2e33",
  pack: "#3E4F5C",
  packShade: "#2f3d47",
  glove: null,
};

const Rain: React.FC<{ seed: number; n?: number }> = ({ seed, n = 40 }) => <Blizzard seed={seed} n={n} angle={-78} />;

// Roots across the wet trail (screen coords).
const Roots: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M200,${y + 30} Q320,${y - 4} 460,${y + 26} Q560,${y + 50} 680,${y + 20}`} stroke="#5a3e2a" strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d={`M560,${y + 70} Q700,${y + 40} 860,${y + 80}`} stroke="#4e3624" strokeWidth={18} fill="none" strokeLinecap="round" />
    <ellipse cx={380} cy={y + 120} rx={140} ry={18} fill="#9fb0bc" opacity={0.35} />
  </Svg>
);

// ============ S1 HOOK MEDIUM: Dan stumbles on the wet trail in the drizzle (0 - 3.4) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5, at(t, [2.9, 3.05, 3.35], [0, 0.8, 0]));
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.04, 1.1, t / 3.4), rot: hh.rot };
  const g = 1500;
  const ph = t * 1.8;
  const trip = at(t, [2.9, 3.15, 3.4], [0, 1, 0.6]);
  const p: HikerProps = { x: 520 + t * 20, y: g + 60, scale: 2.4, phase: ph, walk: 0.45, lean: 0.06 + trip * 0.3, poles: false, handOverride: freeHand(ph, 0.4), breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={RAINSKY} uid="a" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 60} grass="#5b6a3c" dirt="#6d5a44" />
        <Roots y={g + 50} />
        <Subject rimX={5} col="rgba(230,234,238,0.75)">
          <Person {...p} outfit={DAN} expression="tired" />
        </Subject>
      </Plane>
      <Rain seed={1581} n={44} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#26352a" side="right" />
      </Plane>
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="226,230,234" cool="30,40,60" />
      <Title text={"He was\nstumbling and\nsaid he was fine."} t={t} t0={0} top={120} size={118} />
      <Chip text="Cold drizzle" t={t} t0={1.6} x={60} y={600} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: clumsy hands fumble the zipper (3.4 - 5.9) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.5), rot: hh.rot };
  const jit = Math.sin(t * 23) * 14;
  const slip = at(t, [4.4, 4.6, 5.2, 5.4], [0, 1, 1, 0]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={RAINSKY} uid="b" treeY={1100} blur={18} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(230,234,238,0.7)">
          <Svg>
            <path d="M40,560 Q540,480 1040,560 L1080,2000 L0,2000 Z" fill={DAN.jacket} />
            <path d="M40,560 Q540,480 1040,560 L1040,600 Q540,520 40,600 Z" fill={DAN.jacketShade} />
            {/* zipper line, open at the top */}
            <path d="M540,540 L540,2000" stroke="#22262a" strokeWidth={14} />
            {Array.from({ length: 30 }, (_, i) => (
              <rect key={i} x={530} y={560 + i * 48} width={20} height={10} fill="#8a9096" />
            ))}
            {/* zipper pull slipping out of the fingers */}
            <g transform={`translate(540,${1180 + slip * 60})`}>
              <rect x={-16} y={0} width={32} height={70} rx={8} fill="#c9ced3" />
            </g>
            {/* rain drops beading on the jacket */}
            {Array.from({ length: 16 }, (_, i) => (
              <ellipse key={i} cx={120 + ((i * 137) % 860)} cy={700 + ((i * 251) % 1100)} rx={8} ry={11} fill="#ffffff" opacity={0.35} />
            ))}
            {/* two clumsy bare hands */}
            <g transform={`translate(${470 + jit},${1180 + slip * 40}) rotate(-20)`}>
              <rect x={-80} y={-60} width={160} height={120} rx={50} fill={DAN.skin} />
              <path d="M-80,-10 L-240,40 L-230,140 L-60,60 Z" fill={DAN.jacketShade} />
            </g>
            <g transform={`translate(${650 - jit},${1260 - slip * 30}) rotate(25)`}>
              <rect x={-80} y={-60} width={160} height={120} rx={50} fill={DAN.skin} />
              <path d="M80,-10 L240,40 L230,140 L60,60 Z" fill={DAN.jacketShade} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <div style={{ position: "absolute", inset: 0, opacity: 0.6 }}>
        <Rain seed={1582} n={26} />
      </div>
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="226,230,234" cool="30,40,60" vignette={0.55} />
      <Chip text="Tripping on roots" t={t} t0={3.5} x={60} y={200} icon="x" big />
      <Chip text="Mumbling" t={t} t0={4.1} x={60} y={330} icon="x" big />
      <Chip text="Fumbling his zipper" t={t} t0={5.2} x={60} y={460} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: Mia stops beside him, he waves her off (5.9 - 7.24) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.06, 1.1, lt / 1.34), rot: hh.rot };
  const g = 1500;
  const pD: HikerProps = { x: 640, y: g + 60, scale: 2.3, walk: 0, lean: 0.14, poles: false, handOverride: [40, 30], breathe: Math.sin(t * 5) * 3 };
  const pM: HikerProps = { x: 300, y: g + 60, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [60, -10], breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={RAINSKY} uid="c" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 60} grass="#5b6a3c" dirt="#6d5a44" />
        <Subject rimX={5} col="rgba(230,234,238,0.75)">
          <Person {...pM} outfit={MIA} expression="neutral" />
          <Person {...pD} outfit={DAN} expression="tired" flip />
        </Subject>
      </Plane>
      <Rain seed={1583} n={44} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#26352a" side="left" />
      </Plane>
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="226,230,234" cool="30,40,60" />
      <Chip text="Cold and wet" t={t} t0={6.0} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: Dan's face in the wet hood, "I'm fine" (7.24 - 8.99) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.75), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={RAINSKY} uid="d" treeY={1100} blur={18} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(230,234,238,0.7)">
          <Svg>
            <FaceClose cx={540} cy={1020} s={3.2} skin={DAN.skin} skinShade={DAN.skinShade} col={DAN.jacket} shade={DAN.jacketShade} jacket={DAN.jacket} up={0} eyes="tired" />
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse key={i} cx={420 + ((i * 97) % 300)} cy={900 + ((i * 131) % 260)} rx={6} ry={9} fill="#ffffff" opacity={0.45} />
            ))}
          </Svg>
        </Subject>
      </Plane>
      <div style={{ position: "absolute", inset: 0, opacity: 0.6 }}>
        <Rain seed={1584} n={26} />
      </div>
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="226,230,234" cool="30,40,60" vignette={0.6} />
      <Readout label="HE KEPT SAYING" value="I'm fine" ok={false} t={t} t0={7.4} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: the fix, learn the umbles (8.99 - 14.2) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 8, y: hh.y - lt * 3, zoom: mix(1.03, 1.1, lt / 5.2), rot: hh.rot };
  const g = 1500;
  const pD: HikerProps = { x: 660, y: g + 60, scale: 2.3, walk: 0, lean: 0.12, poles: false, handOverride: [40, 30], breathe: Math.sin(t * 5) * 3 };
  const pM: HikerProps = { x: 330, y: g + 60, scale: 2.3, walk: 0, lean: 0.06, poles: false, handOverride: [90, -20], breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={RAINSKY} uid="e" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 60} grass="#5b6a3c" dirt="#6d5a44" />
        <Subject rimX={5} col="rgba(240,236,225,0.8)">
          <Person {...pM} outfit={MIA} expression="neutral" />
          <Person {...pD} outfit={DAN} expression="tired" flip />
        </Subject>
      </Plane>
      <div style={{ position: "absolute", inset: 0, opacity: 0.6 }}>
        <Rain seed={1585} n={30} />
      </div>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#26352a" side="right" />
      </Plane>
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="236,234,228" cool="30,40,60" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={10.3} top={200} size={124} />
      <Chip text="Stumbles" t={t} t0={11.38} x={60} y={200} icon="none" big />
      <Chip text="Mumbles" t={t} t0={12.02} x={60} y={330} icon="none" big />
      <Chip text="Fumbles" t={t} t0={12.63} x={60} y={460} icon="none" big />
      <Chip text="Grumbles" t={t} t0={13.23} x={60} y={590} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: Mia's face, she knows the signs (14.2 - 16.68) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.48), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={RAINSKY} uid="f" treeY={1100} blur={18} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(240,236,225,0.75)">
          <Svg>
            <FaceClose cx={520} cy={1040} s={3.2} skin={MIA.skin} skinShade={MIA.skinShade} col={MIA.jacket} shade={MIA.jacketShade} jacket={MIA.jacket} up={0} eyes="neutral" />
          </Svg>
        </Subject>
      </Plane>
      <div style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
        <Rain seed={1586} n={22} />
      </div>
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="236,234,228" cool="30,40,60" vignette={0.55} />
      <Readout label="THE UMBLES" value="Early signs" ok={null} t={t} t0={14.3} x={60} y={200} />
      <Chip text="of hypothermia" t={t} t0={15.3} x={60} y={420} icon="none" big />
    </AbsoluteFill>
  );
};

// Big boulder that blocks the wind (screen coords, base at y).
const Boulder: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M600,${y + 120} Q640,${y - 520} 860,${y - 600} Q1080,${y - 620} 1180,${y - 300} L1200,${y + 140} Z`} fill="#6c7177" />
    <path d={`M700,${y - 360} Q760,${y - 560} 880,${y - 590} Q800,${y - 470} 760,${y - 300} Z`} fill="#82878c" />
    <path d={`M860,${y - 300} L960,${y - 120}`} stroke="#5b6066" strokeWidth={8} opacity={0.6} />
  </Svg>
);

// ============ S7 MEDIUM: out of the wind behind a boulder, dry layer, hat on, turn back (16.68 - 22.41) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 6, y: hh.y - lt * 3, zoom: mix(1.03, 1.1, lt / 5.73), rot: hh.rot };
  const g = 1500;
  const dry = t > 19.4;
  const turn = t > 21.0;
  const ph = t * 2.0;
  const wk = at(t, [21.0, 21.4], [0, 0.5]);
  const pD: HikerProps = { x: 470 - wk * (t - 21) * 60, y: g + 60, scale: 2.3, phase: ph, walk: wk, lean: 0.04, poles: false, handOverride: turn ? freeHand(ph, 0.4) : [50, 10], breathe: 0 };
  const pM: HikerProps = { x: 250 - wk * (t - 21) * 60, y: g + 60, scale: 2.3, phase: ph + 1.4, walk: wk, lean: 0.03, poles: false, handOverride: turn ? freeHand(ph + 1.4, 0.4) : [90, -10], breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={RAINSKY} uid="g" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 60} grass="#5b6a3c" dirt="#6d5a44" />
        <Subject rimX={5} col="rgba(240,236,225,0.8)">
          <Person {...pM} outfit={MIA} expression="neutral" flip={turn} />
          <Person {...pD} outfit={dry ? DAN_DRY : DAN} expression={dry ? "neutral" : "tired"} flip={turn} />
        </Subject>
        <Boulder y={g + 60} />
      </Plane>
      {/* rain only beyond the boulder side */}
      <div style={{ position: "absolute", left: 640, top: 0, width: 440, height: 1920, overflow: "hidden", opacity: 0.7 }}>
        <Rain seed={1587} n={30} />
      </div>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#26352a" side="left" />
      </Plane>
      <LowScrim />
      <Grade sunX={820} sunY={480} warm="240,236,228" cool="30,40,60" />
      <Chip text="Stop, out of the wind" t={t} t0={16.8} x={60} y={200} icon="check" big />
      <Chip text="Wet layers off, dry on" t={t} t0={18.3} x={60} y={330} icon="check" big />
      <Chip text="Add a hat" t={t} t0={19.86} x={60} y={460} icon="check" big />
      <Chip text="Turn back together" t={t} t0={20.9} x={60} y={590} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: warm light, walking back down together (22.41 - 24.75) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y + lt * 6, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1540;
  const ph = t * 2.4;
  const pD: HikerProps = { x: 620 - lt * 60, y: g + 40, scale: 2.4, phase: ph, walk: 0.55, lean: 0.02, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  const pM: HikerProps = { x: 380 - lt * 60, y: g + 40, scale: 2.4, phase: ph + 1.4, walk: 0.55, lean: 0.02, poles: false, handOverride: freeHand(ph + 1.4, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g - 220} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...pM} outfit={MIA} expression="happy" flip />
          <Person {...pD} outfit={DAN_DRY} expression="neutral" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2a3a2c" side="right" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1] - 100} strength={0.4} />
      <Particles seed={1588} n={20} bokeh fall={8} leaves={FALL} />
      <LowScrim />
      <Grade sunX={760} sunY={620} warm="255,226,180" />
      <Readout label="NOT IMPROVING?" value="Call for help" ok={null} t={t} t0={22.5} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-emergency-checklist-card.jpg"
      photoH={800}
      spec="PRINTABLE · YOUR KIT, CHECKS AND STEPS"
      name={
        <>
          Hiking Emergency
          <br />
          Checklist
        </>
      }
      nameSize={86}
      price="$5.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V158: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.45} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.4} to={5.95} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.4} />
    </Scene>
    <Scene from={5.9} to={7.29} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.9} />
    </Scene>
    <Scene from={7.24} to={9.04} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={7.24} />
    </Scene>
    <Scene from={8.99} to={14.25} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={8.99} />
    </Scene>
    <Scene from={14.2} to={16.73} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.2} />
    </Scene>
    <Scene from={16.68} to={22.46} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={16.68} />
    </Scene>
    <Scene from={22.41} to={24.8} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={22.41} />
    </Scene>
    <Scene from={24.6} to={29.2} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.4, 1600],
        [3.4, 5.9, 1660],
        [5.9, 7.24, 1600],
        [7.24, 8.99, 1660],
        [8.99, 14.2, 1600],
        [14.2, 16.68, 1660],
        [16.68, 22.41, 1600],
        [22.41, 24.6, 1600],
      ]}
    />
  </AbsoluteFill>
);
