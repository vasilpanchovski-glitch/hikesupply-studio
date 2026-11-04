// V101: "Wet leaves. One slip. Grit in her palm." in the cinematic C01 style, wet late-fall trail, posted Nov 30 (Cyber Monday).
// Advice (conservative, basic first aid): don't wipe a scrape on your clothes, rinse it with clean water until the grit is gone,
// pat it dry, cover it with a bandage. No gore: a light pink graze with a few grey specks. End card = Trail First-Aid Kit, 13 pieces,
// $16.99 (live Shopify), real product photo (red pouch). Sale wording stays in the caption only.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, Bottle, Subject, Trail, OVERCAST, GOLD, FALL } from "../fall";
import vo from "../vo/v101.json";

const words = vo.words as unknown as Word[];

const ANA: Outfit = {
  ...JAKE,
  skin: "#C98E6A",
  skinShade: "#AC7353",
  hair: "#2a1d15",
  ponytail: "#2a1d15",
  beard: null,
  cap: "#2C6E63",
  capShade: "#1f5249",
  jacket: "#B83A55",
  jacketShade: "#8E2B42",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  pack: "#5B6B3A",
  packShade: "#46542C",
  glove: null,
};

const RED = "#c8242b";
const RED2 = "#a01c22";
const GRAZE = "#e9a0a0";

// Wet, leaf-covered rock slab across the trail.
const WetRock: React.FC<{ x: number; y: number; w: number; t: number }> = ({ x, y, w, t }) => (
  <g>
    <path d={`M${x - w / 2},${y + 20} Q${x - w / 3},${y - 60} ${x},${y - 70} Q${x + w / 3},${y - 70} ${x + w / 2},${y + 20} Z`} fill="#6f7377" />
    <path d={`M${x - w / 3},${y - 30} Q${x},${y - 66} ${x + w / 3},${y - 40}`} stroke="rgba(255,255,255,0.45)" strokeWidth={10} fill="none" strokeLinecap="round" />
    <ellipse cx={x + w * 0.15} cy={y - 50} rx={60} ry={8} fill="rgba(255,255,255,0.35)" opacity={0.6 + 0.4 * Math.sin(t * 3)} />
    {Array.from({ length: 9 }, (_, i) => (
      <ellipse key={i} cx={x - w / 2.4 + i * (w / 9.5)} cy={y - 20 - ((i * 37) % 40)} rx={20} ry={9} fill={FALL[i % 4]} transform={`rotate(${(i * 47) % 180} ${x - w / 2.4 + i * (w / 9.5)} ${y - 20 - ((i * 37) % 40)})`} />
    ))}
  </g>
);

// Big open palm seen from the front (screen coords, centre of the palm at x,y). grit 0..1, wet 0..1, bandage 0..1.
const Palm: React.FC<{ x: number; y: number; s?: number; rot?: number; grit: number; wet?: number; bandage?: number; sleeve?: string }> = ({ x, y, s = 1, rot = 0, grit, wet = 0, bandage = 0, sleeve = ANA.jacket }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M-120,180 Q-150,600 -200,900 L200,900 Q150,600 120,180 Z" fill={ANA.skinShade} />
    <path d="M-190,520 L190,520 L230,1100 L-230,1100 Z" fill={sleeve} />
    <rect x={-200} y={500} width={400} height={60} rx={24} fill={ANA.jacketShade} />
    {/* fingers */}
    {[-96, -34, 30, 92].map((fx, i) => (
      <rect key={i} x={fx - 28} y={-330 + Math.abs(i - 1.5) * 34} width={56} height={260} rx={28} fill={ANA.skin} />
    ))}
    <rect x={-210} y={-60} width={60} height={190} rx={30} fill={ANA.skin} transform="rotate(-38 -180 40)" />
    <path d="M-130,-110 Q-140,200 -90,230 L90,230 Q140,200 130,-110 Z" fill={ANA.skin} />
    <path d="M-80,40 Q0,70 90,20" stroke={ANA.skinShade} strokeWidth={6} fill="none" opacity={0.6} />
    {/* graze at the heel of the hand */}
    <ellipse cx={20} cy={140} rx={78} ry={46} fill={GRAZE} opacity={1 - bandage} />
    {Array.from({ length: 11 }, (_, i) => (
      <circle key={i} cx={-40 + ((i * 29) % 120)} cy={118 + ((i * 17) % 48)} r={6 + (i % 3) * 2} fill="#6b6259" opacity={grit * (1 - bandage)} />
    ))}
    {/* water sheen */}
    <ellipse cx={-10} cy={60} rx={110} ry={150} fill="rgba(170,220,250,0.35)" opacity={wet} />
    {/* bandage */}
    <g opacity={bandage}>
      <rect x={-110} y={98} width={260} height={88} rx={30} fill="#e6c9a4" />
      <rect x={-30} y={108} width={100} height={68} rx={10} fill="#f6efe2" />
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={-90 + i * 24} cy={i % 2 ? 120 : 165} r={3} fill="#c9a983" />
      ))}
    </g>
  </g>
);

// The red first-aid pouch (screen coords, centre).
const Pouch: React.FC<{ x: number; y: number; w: number; rot?: number; open?: number }> = ({ x, y, w, rot = 0, open = 0 }) => {
  const h = w * 0.7;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <rect x={-w / 2 + 10} y={-h / 2 + 16} width={w} height={h} rx={26} fill="rgba(0,0,0,0.25)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={26} fill={RED} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h * 0.18} rx={20} fill={RED2} />
      <line x1={-w / 2 + 30} y1={-h / 2 + h * 0.18} x2={w / 2 - 30} y2={-h / 2 + h * 0.18} stroke="#5b1013" strokeWidth={6} strokeDasharray="10 6" />
      <rect x={-w * 0.08} y={-h * 0.18} width={w * 0.16} height={w * 0.05} fill="#fff" />
      <rect x={-w * 0.025} y={-h * 0.18 - w * 0.055} width={w * 0.05} height={w * 0.16} fill="#fff" />
      {open > 0 && (
        <g opacity={open}>
          <rect x={-w * 0.3} y={-h / 2 - h * 0.25 * open} width={w * 0.22} height={h * 0.3} rx={8} fill="#f4f6f8" />
          <rect x={-w * 0.02} y={-h / 2 - h * 0.32 * open} width={w * 0.3} height={h * 0.34} rx={8} fill="#e6c9a4" />
        </g>
      )}
    </g>
  );
};

// ============ S1 HOOK: Ana on a leafy wet rock, the slip (0 - 5.19) ============
const S1: React.FC = () => {
  const t = useT();
  const slip = at(t, [2.45, 2.9], [0, 1], outExpo);
  const hh = handheld(t, 0.5, slip > 0 && t < 3.3 ? 6 * (1 - (t - 2.45) / 0.85) : 0);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.04, 1.12, t / 5.19), rot: hh.rot };
  const g = 1600;
  const s = 2.4;
  const ph = t * 5;
  const walk = slip > 0 ? 0 : 0.7;
  const p: HikerProps = {
    x: mix(420 + t * 40, 560, slip),
    y: mix(g, g + 40, slip),
    scale: s,
    phase: ph,
    walk,
    lean: mix(0.1, 0.95, slip),
    poles: false,
    handOverride: slip > 0.5 ? [150, 170] : null,
    breathe: 0,
  };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="a" treeY={g - 280} t={t} far="#7f8796" mid="#55614f" />
      <Plane cam={cam} depth={1}>
        <Trail y={g} grass="#6c7446" dirt="#7d6750" />
        <Svg>
          <WetRock x={600} y={g + 30} w={620} t={t} />
        </Svg>
        <Subject rimX={5} col="rgba(240,240,236,0.85)">
          <Person {...p} outfit={ANA} expression={slip > 0.5 ? "tired" : "neutral"} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a1a" side="right" />
      </Plane>
      <Particles seed={1011} n={20} leaves={FALL} fall={34} />
      <Grade sunX={760} sunY={640} warm="236,232,222" cool="40,50,60" />
      <Title text={"Wet leaves.\nOne slip.\nGrit in her palm."} t={t} t0={0} top={120} size={112} />
      <Chip text="Slick rock" t={t} t0={1.2} x={60} y={600} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: her palm, gravel in the graze; three miles to go (5.19 - 8.09) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 2.9), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="b" treeY={1300} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(240,240,236,0.85)">
          <Palm x={560} y={1040} s={1.25} rot={-6} grit={1} />
        </Subject>
      </Plane>
      <Particles seed={1012} n={14} leaves={FALL} fall={28} />
      <Grade sunX={760} sunY={640} warm="236,232,222" vignette={0.6} />
      <Chip text="Gravel in the scrape" t={t} t0={5.3} x={60} y={200} icon="x" big />
      <Readout label="TO THE CAR" value="3 miles" ok={null} t={t} t0={6.5} x={60} y={330} />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the palm heads for her pants, then stops (8.09 - 11.21) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.07, lt / 3.12), rot: hh.rot };
  const go = at(t, [8.3, 9.3], [0, 1], outExpo);
  const back = at(t, [10.2, 10.9], [0, 1], outExpo);
  const k = go * (1 - back * 0.6);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="c" treeY={1300} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(240,240,236,0.85)">
          {/* her hip and thigh in dark trail pants (waist band, pocket, side seam) */}
          <path d="M470,620 Q760,560 1100,640 L1140,2000 L430,2000 Q420,1300 470,620 Z" fill={ANA.pants} />
          <path d="M900,620 Q1040,640 1100,660 L1140,2000 L960,2000 Q980,1300 900,620 Z" fill={ANA.pantsShade} />
          <path d="M460,600 Q760,540 1110,620 L1110,700 Q760,620 460,690 Z" fill="#2a2e33" />
          <rect x={720} y={590} width={90} height={70} rx={10} fill="none" stroke="#8b949b" strokeWidth={10} />
          <path d="M560,720 Q600,900 760,930" stroke="#2a2e33" strokeWidth={8} fill="none" />
          <path d="M940,720 L1000,2000" stroke="#2a2e33" strokeWidth={6} strokeDasharray="18 12" fill="none" />
          <Palm x={mix(260, 560, k)} y={mix(1200, 1160, k)} s={0.95} rot={mix(-10, -70, k)} grit={1} />
        </Subject>
      </Plane>
      <Particles seed={1013} n={12} leaves={FALL} fall={24} />
      <Grade sunX={760} sunY={640} warm="236,232,222" vignette={0.6} />
      <Chip text="Wipe it on your pants?" t={t} t0={8.2} x={60} y={200} icon="x" big />
      <Chip text="Pushes the dirt in" t={t} t0={9.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: she stops, sits on a rock, pack off (11.21 - 12.49) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.04, 1.08, lt / 1.28), rot: hh.rot };
  const g = 1620;
  const s = 2.6;
  const seat = g - 150;
  const p: HikerProps = { x: 460, y: seat + 182 * s, scale: s, walk: 0, lean: 0.2, poles: false, handOverride: [90, 110], breathe: Math.sin(t * 2.4) * 1.2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="d" treeY={g - 300} t={t} far="#7f8796" mid="#55614f" />
      <Plane cam={cam} depth={1}>
        <Trail y={g} grass="#6c7446" dirt="#7d6750" />
        <Subject rimX={5} col="rgba(240,240,236,0.85)">
          <Person {...p} outfit={ANA} expression="neutral" noPack />
        </Subject>
        <Svg>
          {/* the rock she sits on */}
          <path d={`M220,${g + 40} Q240,${seat - 10} 460,${seat - 20} Q690,${seat - 10} 700,${g + 40} Z`} fill="#6f7377" />
          <path d={`M300,${seat + 10} Q460,${seat - 14} 620,${seat + 10}`} stroke="rgba(255,255,255,0.3)" strokeWidth={8} fill="none" />
          {/* her pack on the ground */}
          <rect x={720} y={g - 230} width={200} height={260} rx={40} fill={ANA.pack} />
          <rect x={740} y={g - 180} width={160} height={30} rx={12} fill={ANA.packShade} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Particles seed={1014} n={18} leaves={FALL} fall={30} />
      <Grade sunX={760} sunY={640} warm="236,232,222" />
      <Chip text="She stops" t={t} t0={11.3} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: clean water from her bottle rinses the grit out (12.49 - 16.95) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 4.46), rot: hh.rot };
  const pour = at(t, [12.7, 13.2], [0, 1], outExpo);
  const grit = at(t, [13.4, 15.8], [1, 0]);
  const bx = 660;
  const by = 520;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="e" treeY={1300} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(240,240,236,0.85)">
          <Palm x={500} y={1180} s={1.05} rot={-4} grit={grit} wet={pour} />
          {/* water stream */}
          <g opacity={pour}>
            {Array.from({ length: 6 }, (_, i) => {
              const k = (t * 2.2 + i / 6) % 1;
              return <ellipse key={i} cx={bx - 120 + Math.sin(i) * 8} cy={by + 90 + k * 560} rx={14} ry={30} fill="#bfe3f6" opacity={0.9} />;
            })}
            <path d={`M${bx - 120},${by + 80} L${bx - 120},${by + 700}`} stroke="rgba(190,228,248,0.7)" strokeWidth={22} strokeLinecap="round" />
            {/* splash drops falling off the hand */}
            {Array.from({ length: 6 }, (_, i) => {
              const k = (t * 1.6 + i / 6) % 1;
              return <circle key={`d${i}`} cx={420 + i * 40} cy={1330 + k * 420} r={9} fill="#bfe3f6" opacity={1 - k} />;
            })}
            {/* grit specks washing away */}
            {Array.from({ length: 5 }, (_, i) => {
              const k = (t * 1.2 + i / 5) % 1;
              return <circle key={`g${i}`} cx={460 + i * 30} cy={1340 + k * 380} r={7} fill="#6b6259" opacity={(1 - k) * (grit > 0.05 ? 1 : 0)} />;
            })}
          </g>
          {/* her other hand tipping the bottle in from the top right */}
          <path d={`M1300,-100 Q${bx + 260},${by - 300} ${bx + 60},${by - 120}`} stroke={ANA.jacket} strokeWidth={110} fill="none" strokeLinecap="round" />
          <Bottle x={bx} y={by} s={1.5} rot={mix(-20, -120, pour)} />
          <ellipse cx={bx + 40} cy={by - 140} rx={60} ry={52} fill={ANA.skin} />
        </Subject>
      </Plane>
      <Particles seed={1015} n={12} leaves={FALL} fall={20} />
      <Grade sunX={760} sunY={640} warm="240,236,226" vignette={0.55} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={13.3} top={200} size={124} />
      <Chip text="Rinse with clean water" t={t} t0={13.4} x={60} y={200} icon="check" big />
      <Chip text="Until the grit is gone" t={t} t0={15.0} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: pat dry with gauze, bandage from the red kit (16.95 - 21.82) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.08, lt / 4.87), rot: hh.rot };
  const pat = at(t, [17.1, 18.6], [0, 1]);
  const dab = Math.abs(Math.sin(t * 8)) * (pat > 0 && pat < 1 ? 1 : 0);
  const band = at(t, [19.0, 19.7], [0, 1], outExpo);
  const gauzeOut = at(t, [18.6, 18.9], [1, 0]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="f" treeY={1300} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,190,0.9)">
          {/* the kit open on the rock beside her, in the lower left */}
          <path d="M-100,1500 Q200,1380 560,1420 L560,2000 L-100,2000 Z" fill="#6f7377" />
          <Pouch x={250} y={1330} w={380} rot={-6} open={1} />
          <Palm x={680} y={980} s={1.0} rot={8} grit={0} wet={at(t, [17.1, 18.6], [0.6, 0])} bandage={band} />
          <path d={`M1300,1600 Q1020,1300 ${790},${1060 - dab * 30}`} stroke={ANA.jacket} strokeWidth={100} fill="none" strokeLinecap="round" opacity={gauzeOut} />
          {/* gauze pad dabbing */}
          <g opacity={gauzeOut} transform={`translate(${720},${1110 - dab * 30})`}>
            <rect x={-90} y={-70} width={180} height={140} rx={10} fill="#ffffff" stroke="#d6dde2" strokeWidth={4} />
            <ellipse cx={70} cy={-50} rx={58} ry={46} fill={ANA.skin} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1016} n={14} leaves={FALL} fall={20} />
      <Grade sunX={740} sunY={660} warm="255,214,170" vignette={0.55} />
      <Chip text="Pat it dry" t={t} t0={17.1} x={60} y={200} icon="check" big />
      <Chip text="Cover it" t={t} t0={19.0} x={60} y={330} icon="check" big />
      <Chip text="Kit lives in her daypack" t={t} t0={20.0} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: golden light, Ana walks out (21.82 - 23.31) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: at(lt, [0, 1.0], [1.12, 1.04], outExpo), rot: hh.rot };
  const g = 1580;
  const p: HikerProps = { x: 360 + lt * 120, y: g, scale: 2.3, phase: t * 5, walk: 0.8, lean: 0.08, poles: false, breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="g" treeY={g - 280} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={-6} col="rgba(255,206,150,0.95)">
          <Person {...p} outfit={ANA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a1a" side="both" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,160" />
      <Particles seed={1017} n={20} leaves={FALL} fall={20} />
      <Grade sunX={740} sunY={660} warm="255,200,150" />
      <Readout label="ANA" value="Walked out" ok={true} t={t} t0={21.95} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/trail-first-aid-kit-13-pieces-card.jpg"
      photoH={760}
      spec="13 PIECES · FITS ANY DAYPACK"
      name={
        <>
          Trail
          <br />
          First-Aid Kit
        </>
      }
      nameSize={104}
      price="$16.99"
      save="Save this for your next fall hike"
    />
  );
};

export const V101: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={5.24} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={5.19} to={8.14} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={5.19} />
    </Scene>
    <Scene from={8.09} to={11.26} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={8.09} />
    </Scene>
    <Scene from={11.21} to={12.54} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={11.21} />
    </Scene>
    <Scene from={12.49} to={17.0} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.49} />
    </Scene>
    <Scene from={16.95} to={21.87} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={16.95} />
    </Scene>
    <Scene from={21.82} to={23.4} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={21.82} />
    </Scene>
    <Scene from={23.25} to={29} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 5.19, 1560],
        [5.19, 8.09, 1560],
        [8.09, 11.21, 1560],
        [11.21, 12.49, 1560],
        [12.49, 16.95, 1560],
        [16.95, 21.82, 1560],
        [21.82, 23.25, 1560],
      ]}
    />
  </AbsoluteFill>
);
