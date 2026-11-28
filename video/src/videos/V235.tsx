// V235: "She planned the hike. Not the nap." Short format (16.0 s, 40 words), cinematic C01 style, sunny winter trail.
// Product: Little Hikers Pair — Hiking With Babies & Toddlers Guide + Kids Trail Explorer Pack, $10.99 (live Shopify).
// End card: the real store cover (lifestyle photo with text, so the boxed photo card, cropped to keep the title).
// Advice (plain, conservative): with a toddler, pick short trails, plan them around nap time and keep the turnaround close
// to the car. No numbers beyond the story's "two miles". The toddler is a simple illustrated child (Toddler below).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { FrostTrail, WINTER, WGOLD, WinterBackdrop } from "../winter";
import { PlanPage } from "../home";
import vo from "../vo/v235.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const MIA: Outfit = {
  ...GUIDE,
  skin: "#D7A07A",
  skinShade: "#B7815D",
  hair: "#2a1c14",
  ponytail: "#2a1c14",
  beard: null,
  cap: "#3E6E8E",
  capShade: "#2f566f",
  jacket: "#B8453A",
  jacketShade: "#93362d",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  boot: "#5a3e2c",
  sole: "#231d19",
  pack: "#4F6B4A",
  packShade: "#3b5137",
  glove: null,
};

const KID = { skin: "#E3AD86", shade: "#C68E68", jacket: "#E2B93B", jacketShade: "#c49e2a", pants: "#3F6B8A", boot: "#7a4a2e", beanie: "#2E7D6B", pom: "#f2efe6" };

// A toddler, facing right, feet at (0,0), about 190 units tall. asleep closes the eyes, sit bends the legs forward
// (held on a hip), walk/phase swing the legs and arms.
const Toddler: React.FC<{ x: number; y: number; s?: number; rot?: number; asleep?: boolean; sit?: boolean; walk?: number; phase?: number; happy?: boolean }> = ({
  x,
  y,
  s = 1,
  rot = 0,
  asleep = false,
  sit = false,
  walk = 0,
  phase = 0,
  happy = true,
}) => {
  const sw = Math.sin(phase) * walk;
  const bob = walk * 3 * Math.abs(Math.sin(phase));
  const leg = (dx: number, k: number) =>
    sit ? `M${dx},-44 L${dx + 40},-40 L${dx + 44},-6` : `M${dx},-44 L${dx + k * 22},-4`;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      <g transform={`translate(0,${-bob})`}>
        {/* far leg and arm */}
        <path d={leg(-8, -sw)} stroke="#33597a" strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <ellipse cx={sit ? 44 : -sw * 22 + 6} cy={-2} rx={16} ry={9} fill={KID.boot} />
        <path d={`M-14,-100 L${-18 - sw * 14},-56`} stroke={KID.jacketShade} strokeWidth={18} strokeLinecap="round" fill="none" />
        {/* torso */}
        <rect x={-30} y={-114} width={58} height={78} rx={24} fill={KID.jacket} />
        <path d="M-2,-112 L-2,-40" stroke={KID.jacketShade} strokeWidth={3} />
        {/* near leg */}
        <path d={leg(8, sw)} stroke={KID.pants} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <ellipse cx={sit ? 60 : sw * 22 + 14} cy={-2} rx={16} ry={9} fill={KID.boot} />
        {/* near arm */}
        <path d={`M4,-100 L${10 + sw * 14},-56`} stroke={KID.jacket} strokeWidth={18} strokeLinecap="round" fill="none" />
        <circle cx={10 + sw * 14} cy={-52} r={9} fill={KID.skin} />
        {/* head */}
        <circle cx={4} cy={-152} r={40} fill={KID.skin} />
        <ellipse cx={-26} cy={-148} rx={9} ry={12} fill={KID.shade} />
        {/* beanie */}
        <path d="M-38,-158 Q-36,-200 6,-200 Q46,-198 46,-160 Z" fill={KID.beanie} />
        <rect x={-40} y={-166} width={88} height={14} rx={7} fill="#256556" />
        <circle cx={4} cy={-204} r={11} fill={KID.pom} />
        {/* face */}
        {asleep ? (
          <path d="M18,-146 q8,6 16,0" stroke="#3a2a20" strokeWidth={4} fill="none" strokeLinecap="round" />
        ) : (
          <circle cx={26} cy={-148} r={4.5} fill="#2a1c14" />
        )}
        <circle cx={18} cy={-134} r={8} fill="#e98a7a" opacity={0.45} />
        {asleep ? (
          <ellipse cx={24} cy={-124} rx={5} ry={4} fill="#a0584a" />
        ) : happy ? (
          <path d="M16,-126 q7,6 13,-1" stroke="#a0584a" strokeWidth={4} fill="none" strokeLinecap="round" />
        ) : (
          <path d="M18,-124 l10,0" stroke="#a0584a" strokeWidth={4} strokeLinecap="round" />
        )}
      </g>
    </g>
  );
};

// Mia holding the sleeping toddler at her chest, head on her shoulder (drawn in hiker coords over the Person).
const Held: React.FC<{ p: HikerProps; t: number }> = ({ p, t }) => {
  const { sh, arms } = hikerGeometry(p);
  const [hx, hy] = arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <Toddler x={sh[0] + 40} y={sh[1] + 140 + Math.sin(t * 2) * 1.5} s={0.8} rot={-8} asleep sit />
      <ellipse cx={hx} cy={hy} rx={11} ry={9} fill={MIA.skin} />
      <ellipse cx={hx - 18} cy={hy - 40} rx={10} ry={9} fill={MIA.skinShade} />
    </g>
  );
};

const Zs: React.FC<{ x: number; y: number; t: number; s?: number }> = ({ x, y, t, s = 1 }) => (
  <g>
    {[0, 1, 2].map((i) => {
      const k = (t * 0.6 + i / 3) % 1;
      return (
        <text key={i} x={x + k * 60 * s} y={y - k * 120 * s} fontFamily="Barlow Condensed" fontWeight={800} fontSize={(30 + i * 8) * s} fill="#ffffff" opacity={0.8 * Math.sin(k * Math.PI)}>
          z
        </text>
      );
    })}
  </g>
);

// ============ S1 HOOK MEDIUM: Mia and her toddler start the sunny loop (0 - 2.4) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 2.4), rot: hh.rot };
  const g = 1500;
  const ph = t * 3;
  const p: HikerProps = { x: 300 + t * 36, y: g + 20, scale: 2.3, phase: ph, walk: 0.5, lean: 0.04, poles: false, handOverride: [80, 60] };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 200} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0} />
        <Subject rimX={5} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={MIA} expression="happy" />
          <Toddler x={700 + t * 36} y={g + 22} s={1.9} walk={0.9} phase={t * 6} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2c3f2a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.26} col="255,246,220" />
      <Particles seed={2351} n={14} col="#fff3d6" bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Title text={"She planned the\nhike. Not the nap."} t={t} t0={0} top={110} size={120} />
      <Chip text="Sunny loop with her toddler" t={t} t0={1.0} x={60} y={430} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: at the far end, he falls asleep on her shoulder (2.4 - 4.3) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.7], [1.12, 1.03], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1250} blur={12} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,236,200,0.85)">
          <Svg>
            {/* Mia's shoulder and arm in her red jacket */}
            <path d="M560,1920 Q560,1300 900,1180 Q1160,1120 1300,1200 L1300,1920 Z" fill={MIA.jacket} />
            <path d="M900,1180 Q1000,1260 1000,1500" stroke={MIA.jacketShade} strokeWidth={10} fill="none" />
            <ellipse cx={1040} cy={1080} rx={120} ry={60} fill={MIA.hair} />
          </Svg>
          <Toddler x={420} y={1800 + Math.sin(t * 2) * 4} s={4.2} rot={18} asleep sit />
        </Subject>
      </Plane>
      <Svg>
        <Zs x={620} y={900} t={t} s={2} />
      </Svg>
      <Particles seed={2352} n={12} col="#fff3d6" fall={3} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,236,214" cool="40,60,90" vignette={0.55} />
      <Chip text="Far end of the loop" t={t} t0={2.6} x={60} y={170} icon="none" big />
      <Chip text="Fast asleep" t={t} t0={3.5} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: she carries him all the way back (4.3 - 6.25) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.95), rot: hh.rot };
  const g = 1520;
  const ph = t * 2.4;
  const p: HikerProps = { x: 520 - lt * 20, y: g + 20, scale: 2.5, phase: ph, walk: 0.4, lean: 0.1, poles: false, handOverride: [44, 70], breathe: Math.sin(t * 3) * 1.6 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="c" treeY={g - 200} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0} />
        <Subject rimX={6} col="rgba(255,214,150,0.9)">
          <Person {...p} outfit={MIA} expression="tired" />
          <Held p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2c3f2a" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 200} strength={0.24} col="255,214,150" />
      <Particles seed={2353} n={12} col="#fff3d6" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={600} warm="255,214,170" vignette={0.5} />
      <Readout label="CARRIED BACK" value="2 MILES" ok={false} t={t} t0={5.0} x={60} y={170} />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the rule, the plan page (6.25 - 9.0) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.75), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1250} blur={14} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,236,200,0.7)">
          <Svg>
            <g transform="translate(170,470) rotate(-2) scale(1.3)">
              <PlanPage x={0} y={0} w={560} rows={[["Trail", "Short loop"], ["Start", "After the nap"], ["Turnaround", "Close to the car"]]} t={t} t0={7.0} gap={0.6} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2354} n={10} col="#fff3d6" fall={3} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" vignette={0.55} />
      <Chip text="The rule" t={t} t0={6.4} x={60} y={170} icon="none" big />
      <Chip text="Short trails, around naps" t={t} t0={7.3} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: next time, a short loop near the car, toddler awake and happy (9.0 - 11.65) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.07, lt / 2.65), rot: hh.rot };
  const g = 1500;
  const ph = t * 3;
  const p: HikerProps = { x: 560 + lt * 30, y: g + 30, scale: 2.2, phase: ph, walk: 0.5, lean: 0.04, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 200} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0} />
        <Subject rimX={5} col="rgba(255,236,200,0.85)">
          <Car x={170} y={g + 40} s={1.6} body="#4a6a8a" shade="#37516b" />
          <Person {...p} outfit={MIA} expression="happy" />
          <Toddler x={860 + lt * 30} y={g + 32} s={1.8} walk={0.9} phase={t * 6} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2c3f2a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.28} col="255,246,220" />
      <Particles seed={2355} n={14} col="#fff3d6" bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Chip text="Turn around near the car" t={t} t0={9.6} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/little-hikers-pair-card.jpg"
      photoH={800}
      spec="TODDLER GUIDE + KIDS TRAIL PACK"
      name={
        <>
          Little Hikers
          <br />
          Pair
        </>
      }
      nameSize={104}
      price="$10.99"
      save="Save this before your family hike"
    />
  );
};

export const V235: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.48} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.4} to={4.38} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.4} />
    </Scene>
    <Scene from={4.3} to={6.33} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.3} />
    </Scene>
    <Scene from={6.25} to={9.08} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={6.25} />
    </Scene>
    <Scene from={9.0} to={11.75} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.0} />
    </Scene>
    <Scene from={11.65} to={16.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.4, 1600],
        [2.4, 4.3, 1600],
        [4.3, 6.25, 1600],
        [6.25, 9.0, 1600],
        [9.0, 11.65, 1600],
      ]}
    />
  </AbsoluteFill>
);
