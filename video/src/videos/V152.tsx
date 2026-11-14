// V152: "Her gloves were soaked by the summit." in the cinematic C01 style, early-winter climb. Story for the
// Winter Hiking Guide & Cold-Weather Checklist ($7.99, live Shopify). Advice (simple, safe): climb in thin liner gloves,
// or none if you're warm; keep a dry, warm pair in a plastic bag in your pack and put them on at the top before you cool down.
// No numbers, no medical claims. End card = real Shopify cover photo (boxed card, it is a guide cover).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { Blizzard, FrostTrail, STORM, Summit, WGOLD, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v152.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC<{ k?: number }> = ({ k = 0.55 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: `linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,${k}) 45%, rgba(12,22,28,${k}) 70%, rgba(12,22,28,0) 100%)` }} />
);

const WARM = "#9b2f2a"; // thick warm gloves
const WARM2 = "#7a2420";
const LINER = "#8d969e"; // thin liner gloves
const LINER2 = "#6f7880";

const RACHEL: Outfit = {
  ...JAKE,
  skin: "#C98E6A",
  skinShade: "#AA7150",
  hair: "#2b1d16",
  ponytail: "#2b1d16",
  beard: null,
  cap: "#2f5d7a",
  capShade: "#244a62",
  jacket: "#d9a441",
  jacketShade: "#b48530",
  pants: "#35393f",
  pantsShade: "#26292e",
  pack: "#3E5A4A",
  packShade: "#2E4538",
  glove: null,
};
const R_WARM: Outfit = { ...RACHEL, glove: WARM };
const R_LINER: Outfit = { ...RACHEL, glove: LINER };

// Big glove, local coords, wrist at the right. col/shade colours, thin = slimmer liner shape.
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

// ============ S1 HOOK MEDIUM: Rachel on the steep climb in thick warm gloves (0 - 3.85) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y - t * 6, zoom: mix(1.03, 1.1, t / 3.85), rot: hh.rot };
  const tilt = 0.22;
  const x = 360 + t * 34;
  const g = 1560 - tilt * (x - 540);
  const ph = t * 1.9;
  const p: HikerProps = { x, y: g + 40, scale: 2.4, phase: ph, walk: 0.4, lean: 0.22, poles: false, handOverride: freeHand(ph, 0.4), breathe: Math.sin(t * 4) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={1280} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={1560} tilt={tilt} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={R_WARM} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.28} col="255,246,226" />
      <Particles seed={1521} n={16} col="#ffffff" fall={12} />
      <LowScrim k={0.6} />
      <Grade sunX={800} sunY={560} warm="248,240,228" cool="40,60,90" />
      <Title text={"Her gloves were\nsoaked by the\nsummit."} t={t} t0={0} top={110} size={124} />
      <Chip text="Warm gloves on" t={t} t0={1.5} x={60} y={640} icon="none" big />
      <Chip text="The whole steep climb" t={t} t0={2.8} x={60} y={770} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: thick glove gripping a rock, sweat and steam at the cuff (3.85 - 5.4) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.05, 1.12, lt / 1.55), rot: hh.rot };
  const grip = Math.sin(t * 3) * 6;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1100} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* rock slab */}
          <path d="M-200,1060 Q300,980 700,1020 Q1000,1060 1300,1000 L1300,2400 L-200,2400 Z" fill="#7d8288" />
          <path d="M-200,1060 Q300,980 700,1020 Q1000,1060 1300,1000 L1300,1040 Q1000,1100 700,1060 Q300,1020 -200,1100 Z" fill="#e9eef1" />
          <path d="M100,1300 L400,1500 M700,1250 L900,1600" stroke="#666b71" strokeWidth={8} opacity={0.6} />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,215,0.8)">
          <g transform={`translate(${520 + grip},${960}) rotate(8)`}>
            <path d="M180,-90 L700,-210 L760,60 L200,110 Z" fill={RACHEL.jacket} />
            <path d="M180,-90 L700,-210 L710,-150 L190,-30 Z" fill={RACHEL.jacketShade} />
            <g transform="scale(1.6)">
              <Glove col={WARM} shade={WARM2} />
            </g>
            {/* steam wisps from the cuff */}
            {[0, 1, 2].map((i) => {
              const k = (t * 0.8 + i / 3) % 1;
              return <circle key={`s${i}`} cx={250 + i * 30 + k * 40} cy={-160 - k * 220} r={20 + k * 40} fill="#ffffff" opacity={0.35 * (1 - k)} />;
            })}
            {/* sweat drops at the cuff */}
            {[0, 1, 2, 3].map((i) => {
              const k = (t * 1.1 + i / 4) % 1;
              return <path key={`d${i}`} d="M0,-14 Q10,3 0,12 Q-10,3 0,-14 Z" fill="#cfe9f7" stroke="#8fbcd4" strokeWidth={2} transform={`translate(${200 + i * 22},${-60 + k * 200}) scale(1.6)`} opacity={1 - k} />;
            })}
          </g>
        </Subject>
      </Plane>
      <Particles seed={1522} n={10} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="250,236,220" cool="40,55,80" vignette={0.55} />
      <Chip text="Hands sweating" t={t} t0={4.3} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: windy summit, she pulls off a damp glove (5.4 - 7.4) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6, at(t, [5.4, 5.6, 5.9], [0, 1, 0]));
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.05, 1.12, lt / 2), rot: hh.rot };
  const g = 1520;
  const pull = at(t, [6.2, 6.9], [0, 1]);
  const p: HikerProps = { x: 470, y: g + 40, scale: 2.6, walk: 0, lean: 0.06, poles: false, handOverride: [mix(40, 70, pull), mix(60, 20, pull)], breathe: Math.sin(t * 5) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={1700} woods={false} t={t} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Svg>
          {/* the damp glove she pulled off, dark wet patches */}
          <g opacity={pull} transform={`translate(${860},${g - 6}) rotate(-12) scale(0.42)`}>
            <Glove col={WARM} shade={WARM2} />
            <ellipse cx={-40} cy={10} rx={90} ry={40} fill="#4a1512" opacity={0.6} />
          </g>
        </Svg>
        <Subject rimX={6} col="rgba(236,240,246,0.8)">
          <Person {...p} outfit={pull > 0.5 ? RACHEL : R_WARM} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Blizzard seed={1523} n={30} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <LowScrim k={0.6} />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" />
      <Chip text="Windy summit" t={t} t0={5.6} x={60} y={200} icon="none" big />
      <Readout label="HER GLOVES" value="Damp" ok={false} t={t} t0={7.1} x={60} y={330} />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: face in the wind, bare hands, fingers numb (7.4 - 9.05) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.65), rot: hh.rot };
  const g = 1500;
  const rub = Math.sin(t * 9) * 8;
  const p: HikerProps = { x: 560, y: g + 900, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: [70 + rub * 0.4, -30], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={1700} woods={false} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={7} col="rgba(236,240,246,0.85)">
          <Person {...p} outfit={RACHEL} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Blizzard seed={1524} n={34} />
      <LowScrim k={0.6} />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" vignette={0.6} />
      <Chip text="Fingers numb" t={t} t0={7.9} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: the fix, climbing in thin liner gloves (9.05 - 13.55) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y - lt * 5, zoom: mix(1.04, 1.1, lt / 4.5), rot: hh.rot };
  const tilt = 0.2;
  const x = 330 + lt * 36;
  const g = 1560 - tilt * (x - 540);
  const ph = t * 2.1;
  const p: HikerProps = { x, y: g + 40, scale: 2.4, phase: ph, walk: 0.45, lean: 0.2, poles: false, handOverride: freeHand(ph, 0.45), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={1290} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={1560} tilt={tilt} snow={1} />
        <Subject rimX={6} col="rgba(255,240,215,0.85)">
          <Person {...p} outfit={R_LINER} expression="neutral" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.32} col="255,246,226" />
      <Particles seed={1525} n={14} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="252,236,214" cool="40,60,90" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={10.3} top={200} size={124} />
      <Chip text="Thin liner gloves" t={t} t0={10.9} x={60} y={200} icon="check" big />
      <Chip text="Or none if you're warm" t={t} t0={12.1} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: dry warm pair goes into a plastic bag in the pack (13.55 - 16.8) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.25), rot: hh.rot };
  const bagIn = at(t, [14.6, 15.4], [0, 1], outExpo);
  const zip = at(t, [15.6, 16.1], [0, 1]);
  const drop = at(t, [15.9, 16.6], [0, 1], outExpo);
  const PK = RACHEL.pack;
  const PK2 = RACHEL.packShade;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1100} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,1500 L1300,1490 L1300,2400 L-200,2400 Z" fill="#dfe6ea" />
        </Svg>
        <Subject rimX={5} col="rgba(255,240,215,0.8)">
          {/* open pack, back part */}
          <path d="M220,1000 Q540,940 860,1000 L900,1520 Q540,1570 180,1520 Z" fill={PK2} />
          {/* plastic bag with the warm gloves, sliding down into the pack */}
          <g transform={`translate(540,${mix(560, 920, drop)})`}>
            <g transform={`translate(0,${mix(80, 0, bagIn)})`}>
              <g transform="translate(-70,0) rotate(-12) scale(0.62)">
                <Glove col={WARM} shade={WARM2} />
              </g>
              <g opacity={bagIn} transform="translate(60,30) rotate(10) scale(0.62)">
                <Glove col={WARM} shade={WARM2} />
              </g>
            </g>
            <g opacity={bagIn}>
              <rect x={-230} y={-200} width={460} height={380} rx={26} fill="rgba(225,240,250,0.32)" stroke="rgba(255,255,255,0.85)" strokeWidth={6} />
              <path d="M-210,-170 L210,-170" stroke="#5f8fb0" strokeWidth={10} strokeLinecap="round" />
              <path d={`M-210,-170 L${mix(-210, 210, zip)},-170`} stroke="#2f6f9a" strokeWidth={14} strokeLinecap="round" />
              <path d="M-180,-120 Q-190,0 -170,120" stroke="rgba(255,255,255,0.6)" strokeWidth={10} fill="none" strokeLinecap="round" />
            </g>
          </g>
          {/* pack front */}
          <path d="M170,1180 Q540,1240 910,1180 L900,1520 Q540,1570 180,1520 Z" fill={PK} />
          <path d="M170,1180 Q540,1240 910,1180" stroke={PK2} strokeWidth={14} fill="none" />
          <rect x={430} y={1300} width={220} height={120} rx={20} fill={PK2} />
        </Subject>
      </Plane>
      <Particles seed={1526} n={10} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,236,210" vignette={0.55} />
      <Chip text="Dry, warm pair" t={t} t0={14.0} x={60} y={200} icon="check" big />
      <Chip text="In a plastic bag" t={t} t0={15.2} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: at the top, the warm glove goes on over the liner (16.8 - 19.45) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.05, 1.12, lt / 2.65), rot: hh.rot };
  const on = at(t, [17.3, 18.2], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="g" treeY={1750} woods={false} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(236,240,246,0.85)">
          <g transform="translate(470,1000) rotate(-14)">
            {/* sleeve */}
            <path d="M250,-120 L760,-200 L800,120 L260,130 Z" fill={RACHEL.jacket} />
            <path d="M250,-120 L760,-200 L770,-140 L260,-60 Z" fill={RACHEL.jacketShade} />
            {/* liner-gloved hand */}
            <g transform="scale(1.5)">
              <Glove col={LINER} shade={LINER2} thin />
            </g>
            {/* warm glove slides on from the left */}
            <g transform={`translate(${mix(-700, 0, on)},${mix(-120, 0, on)}) scale(1.62)`} opacity={at(t, [16.85, 17.1], [0, 1])}>
              <Glove col={WARM} shade={WARM2} />
            </g>
          </g>
        </Subject>
      </Plane>
      <Blizzard seed={1527} n={22} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="236,236,240" cool="30,45,80" vignette={0.55} />
      <Chip text="On at the top" t={t} t0={17.6} x={60} y={200} icon="check" big />
      <Chip text="Before you cool down" t={t} t0={18.5} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: golden light, Rachel walks down, hands warm (19.45 - 22.15) ============
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
          <Person {...p} outfit={R_WARM} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.45} col="255,236,200" />
      <Particles seed={1528} n={22} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,226,180" />
      <Readout label="ALL THE WAY DOWN" value="Hands warm" ok={true} t={t} t0={19.7} x={60} y={200} />
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

export const V152: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.9} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.85} to={5.45} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.85} />
    </Scene>
    <Scene from={5.4} to={7.45} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.4} />
    </Scene>
    <Scene from={7.4} to={9.1} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={7.4} />
    </Scene>
    <Scene from={9.05} to={13.6} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={9.05} />
    </Scene>
    <Scene from={13.55} to={16.85} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={13.55} />
    </Scene>
    <Scene from={16.8} to={19.5} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={16.8} />
    </Scene>
    <Scene from={19.45} to={22.15} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={19.45} />
    </Scene>
    <Scene from={21.95} to={27.0} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.85, 1600],
        [3.85, 5.4, 1660],
        [5.4, 7.4, 1600],
        [7.4, 9.05, 1660],
        [9.05, 13.55, 1600],
        [13.55, 16.8, 1660],
        [16.8, 19.45, 1660],
        [19.45, 21.95, 1600],
      ]}
    />
  </AbsoluteFill>
);
