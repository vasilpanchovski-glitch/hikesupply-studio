// V187: "The key fell out at mile two." Short format (15.8 s, 44 words), cinematic C01 style.
// Product: Heart Carabiner Clip — Aluminum Keychain, $6.99 (live Shopify). End card: the real store cover, cut out.
// Advice (simple, safe): clip the car key to a loop inside your pack, never loose in a pocket. No numbers.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { FrostTrail, WINTER, WinterBackdrop, SNOW, SNOW2 } from "../winter";
import { SnowCar } from "../icy";
import vo from "../vo/v187.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const LENA: Outfit = {
  ...JAKE,
  skin: "#F0C7A8",
  skinShade: "#D2A586",
  hair: "#3b2a20",
  beard: null,
  cap: "#B8433A",
  capShade: "#90342d",
  jacket: "#D99A2B",
  jacketShade: "#b07a1e",
  pants: "#30363c",
  pantsShade: "#22272c",
  pack: "#4F5E86",
  packShade: "#3c486a",
  glove: "#2a2a2a",
};

const BLUE = "#2f86c8";
const BLUE_D = "#1f5f92";

// The heart carabiner, centred at 0,0 (about 240 wide at s=1). gate: 0 closed, 1 pushed in.
const Heart: React.FC<{ x: number; y: number; s: number; rot?: number; gate?: number }> = ({ x, y, s, rot = 0, gate = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M0,110 L-100,0 Q-140,-50 -105,-92 Q-60,-132 0,-78 Q60,-132 105,-92 Q140,-50 100,0 Z" fill="none" stroke={BLUE_D} strokeWidth={30} strokeLinejoin="round" />
    <path d="M0,110 L-100,0 Q-140,-50 -105,-92 Q-60,-132 0,-78 Q60,-132 105,-92 Q140,-50 100,0 Z" fill="none" stroke={BLUE} strokeWidth={22} strokeLinejoin="round" />
    <path d="M-104,-88 Q-60,-124 -6,-80" fill="none" stroke="#9fd0f2" strokeWidth={6} strokeLinecap="round" opacity={0.8} />
    {/* silver gate on the right lower side */}
    <g transform={`rotate(${-gate * 18}, 100, 0)`}>
      <line x1={100} y1={0} x2={10} y2={98} stroke="#c9ced3" strokeWidth={16} strokeLinecap="round" />
      <line x1={96} y1={-2} x2={8} y2={94} stroke="#f2f5f7" strokeWidth={5} strokeLinecap="round" />
    </g>
  </g>
);

// A car key on a ring, ring centre at 0,0, key hanging down.
const Key: React.FC<{ x: number; y: number; s: number; rot?: number; shine?: number }> = ({ x, y, s, rot = 0, shine = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <circle cx={0} cy={0} r={34} fill="none" stroke="#b9bfc4" strokeWidth={9} />
    <rect x={-40} y={30} width={80} height={110} rx={30} fill="#22262b" />
    <rect x={-26} y={50} width={52} height={22} rx={8} fill="#3a4047" />
    <circle cx={0} cy={104} r={12} fill="#3a4047" />
    <path d="M-14,138 L14,138 L14,300 L0,316 L-14,300 Z" fill="#c4c9ce" />
    <path d="M14,170 l14,8 l-14,8 M14,206 l12,8 l-12,8 M14,244 l14,8 l-14,8" fill="#c4c9ce" stroke="#c4c9ce" strokeWidth={4} />
    <line x1={-4} y1={146} x2={-4} y2={300} stroke="#eef1f3" strokeWidth={4} />
    {shine > 0 && <path d="M0,200 l10,-40 l10,40 l40,10 l-40,10 l-10,40 l-10,-40 l-40,-10 Z" fill="#ffffff" opacity={shine} transform="translate(-10,-10)" />}
  </g>
);

// ============ S1 HOOK: Lena on the snowy trail, hand on her pocket (0 - 2.75) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.04, 1.12, t / 2.75), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.4;
  const p: HikerProps = { x: 430 + t * 30, y: g, scale: 2.3, phase: ph, walk: 0.75, lean: 0.06, poles: false, handOverride: t < 1.4 ? [26, -20] : freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={1150} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 20} snow={1} />
        <Subject rimX={5} col="rgba(255,250,236,0.85)">
          <Person {...p} outfit={LENA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} col="255,250,236" />
      <Particles seed={1871} n={16} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,222" cool="30,45,80" />
      <Title text={"The key fell\nout at\nmile two."} t={t} t0={0} top={110} size={130} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: back at the car, the pocket is empty (2.75 - 4.09) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35, at(t, [3.0, 3.1, 3.5], [0, 1, 0]) * 5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.12, lt / 1.34), rot: hh.rot };
  const g = 1500;
  const pat = Math.sin(t * 14) * 10;
  const p: HikerProps = { x: 400, y: g, scale: 2.5, walk: 0, lean: 0.02, poles: false, handOverride: [30 + pat, -10] };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1100} t={t} snow={1} blur={4} />
      <Plane cam={cam} depth={0.92} blur={2.5}>
        <Svg>
          <rect x={-400} y={g - 60} width={1900} height={900} fill={SNOW2} />
          <SnowCar x={820} y={g - 20} s={2.2} body="#7a3b3b" shade="#5e2c2c" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 20} snow={1} />
        <Subject rimX={5} col="rgba(255,250,236,0.85)">
          <Person {...p} outfit={LENA} expression="tired" />
        </Subject>
      </Plane>
      <Particles seed={1872} n={12} col="#ffffff" fall={10} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="240,236,226" cool="30,45,80" vignette={0.55} />
      <Chip text="No key" t={t} t0={2.9} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the key, back on the trail, going under the snow (4.09 - 6.69) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y - lt * 8, zoom: mix(1.0, 1.1, lt / 2.6), rot: hh.rot };
  const cover = at(t, [4.6, 6.6], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={900} t={t} snow={1} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-400,1020 Q300,960 1480,1040 L1480,2600 L-400,2600 Z" fill={SNOW} />
          <path d="M-400,1020 Q300,960 1480,1040" stroke="#ffffff" strokeWidth={10} fill="none" />
          {/* boot prints leading away */}
          {[0, 1, 2, 3].map((i) => (
            <ellipse key={i} cx={260 + i * 150 + (i % 2) * 40} cy={1110 - i * 22} rx={50 - i * 7} ry={18 - i * 3} fill={SNOW2} />
          ))}
          <Key x={520} y={1250} s={1.5} rot={-72} shine={0.6 + 0.4 * Math.sin(t * 6)} />
          {/* snow drifting over it */}
          <path d={`M180,${1420 - cover * 110} Q520,${1330 - cover * 180} 900,${1420 - cover * 110} L900,1700 L180,1700 Z`} fill={SNOW} opacity={0.35 + cover * 0.6} />
          <path d="M-400,1500 Q500,1440 1480,1520 L1480,2600 L-400,2600 Z" fill={SNOW2} opacity={0.6} />
        </Svg>
      </Plane>
      <Particles seed={1873} n={22} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={400} warm="244,244,240" cool="30,45,80" vignette={0.55} />
      <Chip text="Back on the trail" t={t} t0={4.15} x={60} y={200} icon="none" big />
      <Chip text="Under the snow" t={t} t0={5.4} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the key clipped to the loop inside her pack (6.69 - 11.36) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const clip = at(t, [7.3, 8.3], [0, 1], outExpo);
  const gate = at(t, [8.0, 8.2, 8.45, 8.6], [0, 1, 1, 0]);
  const hand = at(t, [8.6, 9.2], [0, 1], outExpo);
  const hh = handheld(t, 0.25, at(t, [8.55, 8.65, 8.9], [0, 1, 0]) * 3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.09, lt / 4.7), rot: hh.rot };
  const cx = mix(760, 560, clip);
  const cy = mix(1150, 760, clip);
  const swing = clip >= 1 ? Math.sin((t - 8.6) * 4) * 6 * Math.exp(-(t - 8.6) * 1.2) : 0;
  return (
    <AbsoluteFill style={{ background: "#2b3138" }}>
      <Plane cam={cam} depth={0.5} blur={10}>
        <WinterBackdropFlat />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* pack body seen from above, lid open */}
          <path d="M60,420 Q540,330 1020,420 L1080,1900 L0,1900 Z" fill={LENA.pack} />
          <path d="M140,500 Q540,430 940,500 L960,1800 L120,1800 Z" fill="#1d232c" />
          <path d="M140,500 Q540,430 940,500" stroke={LENA.packShade} strokeWidth={36} fill="none" />
          <path d="M140,500 Q540,430 940,500" stroke="#7d8bb0" strokeWidth={6} fill="none" opacity={0.6} />
          {/* drawcord */}
          <path d="M150,520 Q540,460 930,520" stroke="#d9d4c7" strokeWidth={8} fill="none" strokeDasharray="30 18" />
          {/* key-loop tab sewn inside */}
          <rect x={510} y={540} width={100} height={150} rx={12} fill="#c7a24a" />
          <rect x={530} y={560} width={60} height={90} rx={10} fill="#1d232c" />
          <line x1={516} y1={556} x2={604} y2={556} stroke="#e6cf8e" strokeWidth={4} strokeDasharray="10 8" />
          {/* gear inside, dim */}
          <rect x={200} y={980} width={300} height={520} rx={60} fill="#3f6e5b" opacity={0.7} />
          <rect x={580} y={1060} width={280} height={420} rx={50} fill="#8a4a3a" opacity={0.6} />
          <g transform={`rotate(${swing}, ${cx}, ${cy - 80})`}>
            <Heart x={cx} y={cy} s={0.9} rot={8} gate={gate} />
            <Key x={cx + 6} y={cy + 120} s={1.05} rot={mix(-30, 4, clip)} />
          </g>
          {/* gloved fingers holding the clip until it clicks */}
          <g transform={`translate(${hand * 520},${hand * 360})`} opacity={1 - hand}>
            <path d={`M${cx + 70},${cy - 40} q90,-20 160,30 l180,120 l-60,110 l-200,-80 q-80,-40 -80,-180 Z`} fill="#2a2a2a" />
            <ellipse cx={cx + 90} cy={cy - 10} rx={46} ry={34} fill="#3a3a3a" />
            <path d={`M${cx + 300},${cy + 120} L${cx + 700},${cy + 500} L${cx + 640},${cy + 640} L${cx + 240},${cy + 240} Z`} fill={LENA.jacket} />
          </g>
          {gate > 0.5 && <circle cx={cx + 50} cy={cy + 40} r={60 * gate} fill="none" stroke="#ffffff" strokeWidth={5} opacity={0.6} />}
        </Svg>
      </Plane>
      <Particles seed={1874} n={10} col="#ffffff" fall={8} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={300} warm="250,240,222" cool="30,45,80" vignette={0.5} />
      <Chip text="The rule" t={t} t0={6.75} x={60} y={170} icon="none" big />
      <Chip text="Clip it inside your pack" t={t} t0={7.4} x={60} y={300} icon="check" big />
      <Chip text="Never loose in a pocket" t={t} t0={9.6} x={60} y={430} icon="x" big />
    </AbsoluteFill>
  );
};

// Soft snowy blur behind the pack close-up.
const WinterBackdropFlat: React.FC = () => (
  <Svg>
    <rect x={-400} y={-400} width={1900} height={1400} fill="#a9c3d8" />
    <rect x={-400} y={900} width={1900} height={1700} fill={SNOW2} />
  </Svg>
);

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/heart-carabiner-clip-cut.png"
      cutoutH={760}
      spec="ALUMINUM · 1.7 x 1.6 IN (4.4 x 4.1 CM)"
      name={
        <>
          Heart Carabiner
          <br />
          Clip
        </>
      }
      nameSize={92}
      price="$6.99"
      save="Save this before your next hike"
    />
  );
};

export const V187: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.83} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.75} to={4.17} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.75} />
    </Scene>
    <Scene from={4.09} to={6.77} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.09} />
    </Scene>
    <Scene from={6.69} to={11.4} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={6.69} />
    </Scene>
    <Scene from={11.3} to={15.8} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.75, 1600],
        [2.75, 4.09, 1600],
        [4.09, 6.69, 1660],
        [6.69, 11.3, 1660],
      ]}
    />
  </AbsoluteFill>
);
