// V236: "He walked. Then he wanted up." Short format (16.0 s, 40 words), cinematic C01 style, sunny winter trail.
// Product: Little Hikers Pair — Hiking With Babies & Toddlers Guide + Kids Trail Explorer Pack, $10.99 (live Shopify).
// End card: the real store cover (lifestyle photo with text, so the boxed photo card).
// Advice (plain, conservative): with a toddler, plan a walking part and a carrying part, and give them a goal they can see
// (a bridge, a big rock). No numbers beyond the story's "ten minutes". Toddler drawing from V235, with arms-up added.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { FrostTrail, WINTER, WGOLD, WinterBackdrop } from "../winter";
import { PlanPage } from "../home";
import vo from "../vo/v236.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const MIA: Outfit = {
  ...GUIDE,
  skin: "#C98E68",
  skinShade: "#A9724F",
  hair: "#3a2416",
  ponytail: null,
  beard: "#3a2416",
  cap: "#8E5B2E",
  capShade: "#6f4521",
  jacket: "#2F5E7E",
  jacketShade: "#244a63",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  boot: "#5a3e2c",
  sole: "#231d19",
  pack: "#4F6B4A",
  packShade: "#3b5137",
  glove: null,
};

const KID = { skin: "#E0A982", shade: "#C38A64", jacket: "#D9543E", jacketShade: "#b54230", pants: "#4A5A3A", boot: "#7a4a2e", beanie: "#E2B93B", pom: "#f2efe6" };

// A toddler, facing right, feet at (0,0), about 190 units tall. asleep closes the eyes, sit bends the legs forward
// (held on a hip), walk/phase swing the legs and arms.
const Toddler: React.FC<{ x: number; y: number; s?: number; rot?: number; asleep?: boolean; sit?: boolean; walk?: number; phase?: number; happy?: boolean; armsUp?: boolean }> = ({
  x,
  y,
  s = 1,
  rot = 0,
  asleep = false,
  sit = false,
  walk = 0,
  phase = 0,
  happy = true,
  armsUp = false,
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
        <path d={armsUp ? "M-14,-104 L-74,-186" : `M-14,-100 L${-18 - sw * 14},-56`} stroke={KID.jacketShade} strokeWidth={18} strokeLinecap="round" fill="none" />
        {armsUp && <circle cx={-78} cy={-192} r={9} fill={KID.shade} />}
        {/* torso */}
        <rect x={-30} y={-114} width={58} height={78} rx={24} fill={KID.jacket} />
        <path d="M-2,-112 L-2,-40" stroke={KID.jacketShade} strokeWidth={3} />
        {/* near leg */}
        <path d={leg(8, sw)} stroke={KID.pants} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <ellipse cx={sit ? 60 : sw * 22 + 14} cy={-2} rx={16} ry={9} fill={KID.boot} />
        {/* near arm */}
        <path d={armsUp ? "M6,-104 L78,-186" : `M4,-100 L${10 + sw * 14},-56`} stroke={KID.jacket} strokeWidth={18} strokeLinecap="round" fill="none" />
        <circle cx={armsUp ? 82 : 10 + sw * 14} cy={armsUp ? -192 : -52} r={9} fill={KID.skin} />
        {/* head */}
        <circle cx={4} cy={-152} r={40} fill={KID.skin} />
        <ellipse cx={-26} cy={-148} rx={9} ry={12} fill={KID.shade} />
        {/* beanie */}
        <path d="M-38,-158 Q-36,-200 6,-200 Q46,-198 46,-160 Z" fill={KID.beanie} />
        <rect x={-40} y={-166} width={88} height={14} rx={7} fill="#c49e2a" />
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
      <Toddler x={sh[0] + 40} y={sh[1] + 140 + Math.sin(t * 2) * 1.5} s={0.8} rot={-8} sit />
      <ellipse cx={hx} cy={hy} rx={11} ry={9} fill={MIA.skin} />
      <ellipse cx={hx - 18} cy={hy - 40} rx={10} ry={9} fill={MIA.skinShade} />
    </g>
  );
};

// A small wooden footbridge over a frozen creek, the goal Leo can see. Feet of the deck at (0,0), w wide.
const Bridge: React.FC<{ x: number; y: number; w: number; s?: number }> = ({ x, y, w, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={w / 2} cy={34} rx={w * 0.62} ry={26} fill="#b9cbd6" opacity={0.9} />
    <path d={`M0,0 Q${w / 2},-40 ${w},0 L${w},18 Q${w / 2},-22 0,18 Z`} fill="#8a5a36" />
    {[0, 0.25, 0.5, 0.75, 1].map((k) => {
      const px = k * w;
      const py = -40 * 4 * k * (1 - k);
      return <rect key={k} x={px - 6} y={py - 70} width={12} height={74} rx={4} fill="#6f4627" />;
    })}
    <path d={`M0,-62 Q${w / 2},-102 ${w},-62`} stroke="#7a4f2d" strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d={`M0,-32 Q${w / 2},-72 ${w},-32`} stroke="#7a4f2d" strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>
);

// ============ S1 HOOK MEDIUM: Leo marches ahead on his own, Dad behind (0 - 2.5) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 2.5), rot: hh.rot };
  const g = 1500;
  const ph = t * 3;
  const p: HikerProps = { x: 260 + t * 36, y: g + 20, scale: 2.3, phase: ph, walk: 0.5, lean: 0.04, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 200} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0} />
        <Subject rimX={5} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={MIA} expression="happy" />
          <Toddler x={720 + t * 40} y={g + 22} s={1.9} walk={0.9} phase={t * 6} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2c3f2a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.26} col="255,246,220" />
      <Particles seed={2361} n={14} col="#fff3d6" bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Title text={"He walked.\nThen he\nwanted up."} t={t} t0={0} top={110} size={120} />
      <Chip text="Leo walks it himself" t={t} t0={1.0} x={60} y={560} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: ten minutes in, arms up (2.5 - 4.5) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.7], [1.12, 1.03], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1250} blur={12} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={1640} snow={0} />
        <Subject rimX={-6} col="rgba(255,236,200,0.85)">
          <Toddler x={520} y={1760 + Math.sin(t * 5) * 6} s={4.0} armsUp happy={false} />
        </Subject>
      </Plane>
      <Particles seed={2362} n={12} col="#fff3d6" fall={3} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,236,214" cool="40,60,90" vignette={0.55} />
      <Chip text="Ten minutes later" t={t} t0={2.6} x={60} y={170} icon="none" big />
      <Chip text="Wants up" t={t} t0={3.8} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: Dad carries him in his arms, no carrier (4.5 - 5.95) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.45), rot: hh.rot };
  const g = 1520;
  const ph = t * 2.4;
  const p: HikerProps = { x: 520 - lt * 20, y: g + 20, scale: 2.5, phase: ph, walk: 0.4, lean: 0.1, poles: false, handOverride: [44, 70], breathe: Math.sin(t * 3) * 1.6 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={g - 200} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0} />
        <Subject rimX={6} col="rgba(255,236,200,0.9)">
          <Person {...p} outfit={MIA} expression="tired" />
          <Held p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2c3f2a" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.24} col="255,246,220" />
      <Particles seed={2363} n={12} col="#fff3d6" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={600} warm="255,236,214" vignette={0.5} />
      <Readout label="CARRIER" value="NONE" ok={false} t={t} t0={4.8} x={60} y={170} />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the fix, the plan page (5.95 - 8.8) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.85), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1250} blur={14} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,236,200,0.7)">
          <Svg>
            <g transform="translate(170,470) rotate(-2) scale(1.3)">
              <PlanPage x={0} y={0} w={560} rows={[["Walking part", "His pace"], ["Carrying part", "Bring a carrier"], ["Goal", "The bridge"]]} t={t} t0={6.7} gap={0.7} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2364} n={10} col="#fff3d6" fall={3} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" vignette={0.55} />
      <Chip text="The fix" t={t} t0={6.1} x={60} y={170} icon="none" big />
      <Chip text="Walk part, carry part" t={t} t0={7.5} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: next time, Leo walks toward the bridge, Dad has a carrier pack (8.8 - 11.4) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.07, lt / 2.6), rot: hh.rot };
  const g = 1500;
  const ph = t * 3;
  const p: HikerProps = { x: 300 + lt * 30, y: g + 30, scale: 2.2, phase: ph, walk: 0.5, lean: 0.04, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="e" treeY={g - 200} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0} />
        <Svg>
          <Bridge x={740} y={g + 10} w={460} s={1.15} />
        </Svg>
        <Subject rimX={5} col="rgba(255,214,150,0.85)">
          <Person {...p} outfit={MIA} expression="happy" packOut={1.3} />
          <Toddler x={580 + lt * 34} y={g + 32} s={1.8} walk={0.9} phase={t * 6} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2c3f2a" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 200} strength={0.28} col="255,214,150" />
      <Particles seed={2365} n={14} col="#fff3d6" bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={600} warm="255,214,170" />
      <Chip text="A goal he can see" t={t} t0={9.4} x={60} y={170} icon="check" big />
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
      save="Save this before your next family hike"
    />
  );
};

export const V236: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.58} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.5} to={4.58} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.5} />
    </Scene>
    <Scene from={4.5} to={6.03} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.5} />
    </Scene>
    <Scene from={5.95} to={8.88} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={5.95} />
    </Scene>
    <Scene from={8.8} to={11.5} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={8.8} />
    </Scene>
    <Scene from={11.4} to={16.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.5, 1600],
        [2.5, 4.5, 1600],
        [4.5, 5.95, 1600],
        [5.95, 8.8, 1600],
        [8.8, 11.4, 1600],
      ]}
    />
  </AbsoluteFill>
);
