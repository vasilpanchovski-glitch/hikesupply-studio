// V230: "He let go. The pole slid away." Short format (15.6 s, 42 words), cinematic C01 style, snowy slope in the woods.
// Product: Telescoping Trekking Pole — 4-Section Aluminum (Single), $19.99 (live Shopify). End card: store cutout as in V72.
// Advice (common, safe): use the wrist strap: slide the hand up through it from below, then grip over the strap, so the
// strap takes some weight and the pole stays on the wrist if you let go. No numbers beyond the story's twenty feet.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { FrostTrail, SNOW, SNOW2, WINTER, WGOLD, WinterBackdrop } from "../winter";
import vo from "../vo/v230.json";

const words = vo.words as unknown as Word[];

const OWEN: Outfit = {
  ...JAKE,
  skin: "#E2B08E",
  skinShade: "#C4916E",
  hair: "#5a3a22",
  beard: "#5a3a22",
  cap: "#2F7F86",
  capShade: "#256870",
  jacket: "#C9662E",
  jacketShade: "#9B4E20",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  pack: "#3a4a6a",
  packShade: "#2b3850",
  glove: "#2a2a2a",
};
const SHAFT = "#B9C0C4";
const GRIP = "#2a2d31";
const STRAP = "#3a3d42";
const STRAP_HI = "#6e747b";
const GLOVE = "#2a2a2a";

const toScreen = (p: HikerProps, q: readonly number[]): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};
const handOf = (p: HikerProps, i: number) => toScreen(p, hikerGeometry(p).arms[i].hand);

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// A whole pole in screen units from grip top (x, y), at angle rot (deg from vertical), length len.
const LoosePole: React.FC<{ x: number; y: number; len: number; rot: number; w?: number }> = ({ x, y, len, rot, w = 8 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot})`}>
    <line x1={0} y1={0} x2={0} y2={len} stroke={SHAFT} strokeWidth={w} strokeLinecap="round" />
    <rect x={-w * 1.1} y={-4} width={w * 2.2} height={len * 0.2} rx={w} fill={GRIP} />
    <line x1={0} y1={len * 0.94} x2={0} y2={len} stroke="#333" strokeWidth={w * 1.2} strokeLinecap="round" />
    <path d={`M0,${-2} Q${w * 3.2},${len * 0.1} ${w * 0.6},${len * 0.2}`} stroke={STRAP} strokeWidth={w * 0.7} fill="none" strokeLinecap="round" />
  </g>
);

// A snowy branch reaching in from the right (screen units).
const Branch: React.FC<{ x: number; y: number; s?: number; bend?: number }> = ({ x, y, s = 1, bend = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d={`M300,0 Q120,${-10 + bend * 20} -40,${30 + bend * 30}`} stroke="#5a4030" strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d={`M120,${-4 + bend * 14} Q60,-40 10,-50`} stroke="#5a4030" strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d={`M280,-12 Q120,${-24 + bend * 20} -30,${16 + bend * 30}`} stroke="#ffffff" strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.95} />
  </g>
);

// Close-up grip: pole grip at the centre, strap loop hanging to the right. strapIn 0..1 draws the loop around a wrist.
const GripCU: React.FC<{ cx: number; top: number; s?: number }> = ({ cx, top, s = 1 }) => (
  <g transform={`translate(${cx},${top}) scale(${s})`}>
    <rect x={-22} y={420} width={44} height={1400} fill={SHAFT} />
    <rect x={-22} y={420} width={12} height={1400} fill="#dfe4e7" opacity={0.7} />
    <rect x={-60} y={-20} width={120} height={460} rx={46} fill={GRIP} />
    {Array.from({ length: 8 }, (_, i) => (
      <line key={i} x1={-56} y1={40 + i * 50} x2={56} y2={40 + i * 50} stroke="#1c1e21" strokeWidth={6} />
    ))}
    <rect x={-66} y={-34} width={132} height={60} rx={26} fill="#1c1e21" />
  </g>
);

// ============ S1 HOOK MEDIUM: on the snowy slope Owen lets go of the pole to grab a branch (0 - 2.6) ============
const S1: React.FC = () => {
  const t = useT();
  const grab = at(t, [0.8, 1.3], [0, 1], outExpo);
  const hh = handheld(t, 0.45, at(t, [1.3, 1.4, 1.8], [0, 0.6, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, t / 2.6), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = {
    x: 400,
    y: g + 20,
    scale: 2.4,
    walk: 0,
    lean: mix(0.1, 0.22, grab),
    poles: false,
    handOverride: [mix(70, 150, grab), mix(40, -90, grab)],
    breathe: Math.sin(t * 2.4) * 1.5,
  };
  const h = handOf(p, 1);
  const fall = at(t, [1.3, 2.6], [0, 1]);
  const px = mix(h[0] - 30, h[0] - 520, fall * fall);
  const py = mix(h[1] + 40, h[1] + 260, fall);
  const prot = mix(-8, -70, fall);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 220} t={t} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} tilt={-0.12} />
        <Svg>
          <Pine x={1020} y={g - 30} h={900} c="#2f4a3a" c2="#243a2e" />
          <Branch x={760} y={g - 640} s={1.3} bend={grab} />
        </Svg>
        <Subject rimX={5} col="rgba(255,240,220,0.85)">
          <Person {...p} outfit={OWEN} expression={grab > 0.5 ? "tired" : "neutral"} />
          {grab < 0.98 ? (
            <LoosePole x={h[0]} y={h[1]} len={560} rot={-6} />
          ) : (
            <LoosePole x={px} y={py} len={560} rot={prot} />
          )}
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f3a3a" side="left" />
      </Plane>
      <Particles seed={2301} n={16} col="#ffffff" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="245,236,224" cool="30,45,80" vignette={0.5} />
      <Title text={"He let go.\nThe pole\nslid away."} t={t} t0={0} top={110} size={128} />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: the pole slides twenty feet down the snowy slope (2.6 - 4.7) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y + lt * 10, zoom: at(lt, [0, 0.8], [1.12, 1.03], outExpo), rot: hh.rot };
  // slope from top left (120, 1000) to bottom right (1080, 1720)
  const k = at(t, [2.6, 4.2], [0.08, 1], outExpo);
  const sx = mix(120, 1080, 0.14 + k * 0.6);
  const sy = mix(1000, 1720, 0.14 + k * 0.6);
  const p: HikerProps = { x: 150, y: 1010, scale: 1.25, walk: 0, lean: 0.2, poles: false, handOverride: [90, 60], breathe: 0, slope: -0.35 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={980} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,900 L120,1000 Q600,1300 1300,1760 L1300,2200 L-200,2200 Z" fill={SNOW} />
          <path d="M120,1000 Q600,1300 1300,1760" stroke={SNOW2} strokeWidth={18} fill="none" />
          {/* slide track in the snow */}
          <path d={`M${mix(120, 1080, 0.14)},${mix(1000, 1720, 0.14) + 6} L${sx},${sy + 6}`} stroke="#c3d0d9" strokeWidth={14} strokeLinecap="round" />
          <Pine x={900} y={1450} h={520} c="#2f4a3a" c2="#243a2e" />
          <Pine x={-40} y={1200} h={420} c="#2f4a3a" c2="#243a2e" />
        </Svg>
        <Subject rimX={4} col="rgba(255,240,220,0.85)">
          <Person {...p} outfit={OWEN} expression="tired" />
          <LoosePole x={sx - 150} y={sy - 110} len={330} rot={-56} w={9} />
        </Subject>
      </Plane>
      <Particles seed={2302} n={18} col="#ffffff" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="240,236,230" cool="30,45,80" vignette={0.55} />
      <Readout label="SLID" value="20 FT" ok={false} t={t} t0={2.9} x={60} y={170} />
      <Chip text="Down the snowy slope" t={t} t0={3.6} x={60} y={420} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the fix: slide the hand up through the strap from below (4.7 - 6.8) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.1), rot: hh.rot };
  const up = at(t, [4.9, 6.2], [0, 1], outExpo);
  const hy = mix(1750, 1060, up); // glove centre
  const hx = 700;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="c" treeY={1300} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <GripCU cx={420} top={600} s={1.1} />
          {/* back half of the strap loop */}
          <path d="M470,600 C640,560 820,800 800,1080" stroke={STRAP} strokeWidth={40} fill="none" strokeLinecap="round" />
          {/* arm and glove coming up from below */}
          <path d={`M${hx + 20},${hy + 60} L${hx + 60},2300`} stroke={OWEN.jacket} strokeWidth={190} strokeLinecap="round" />
          <rect x={hx - 70} y={hy + 30} width={180} height={70} rx={30} fill={OWEN.jacketShade} />
          <ellipse cx={hx} cy={hy - 40} rx={95} ry={130} fill={GLOVE} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={hx - 78 + i * 40} y={hy - 230} width={34} height={120} rx={16} fill={GLOVE} />
          ))}
          <rect x={hx - 120} y={hy - 70} width={46} height={110} rx={22} fill={GLOVE} transform={`rotate(-30 ${hx - 97} ${hy - 15})`} />
          {/* front half of the strap loop, over the wrist once the hand is through */}
          <path d="M800,1080 C780,1240 560,1180 470,1040" stroke={STRAP} strokeWidth={40} fill="none" strokeLinecap="round" opacity={mix(1, 0.15, at(t, [5.6, 5.9], [0, 1]))} />
          <path d={`M${hx - 110},${hy + 120} Q${hx},${hy + 170} ${hx + 120},${hy + 120}`} stroke={STRAP} strokeWidth={40} fill="none" strokeLinecap="round" opacity={at(t, [5.6, 5.9], [0, 1])} />
          <path d={`M${hx - 110},${hy + 110} Q${hx},${hy + 158} ${hx + 120},${hy + 110}`} stroke={STRAP_HI} strokeWidth={6} fill="none" strokeLinecap="round" opacity={at(t, [5.6, 5.9], [0, 1])} />
          {/* up arrow */}
          <path d={`M980,${1500 - up * 260} l0,-160 m-40,50 l40,-50 l40,50`} stroke="#ffffff" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={at(t, [4.9, 5.2, 6.2, 6.5], [0, 0.9, 0.9, 0])} />
        </Svg>
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 200} strength={0.25} col="255,214,150" />
      <Particles seed={2303} n={10} col="#fff3d6" fall={4} bokeh />
      <Grade sunX={760} sunY={600} warm="255,214,170" vignette={0.5} />
      <Chip text="The fix" t={t} t0={4.8} x={60} y={170} icon="none" big />
      <Chip text="Hand up through the strap" t={t} t0={5.4} x={60} y={300} icon="check" big />
      <Chip text="From below" t={t} t0={6.0} x={60} y={430} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: then grip over it, the strap runs under the palm (6.8 - 8.9) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.0, lt / 2.1), rot: hh.rot };
  const close = at(t, [7.0, 7.7], [0, 1], outExpo);
  const cx = 520;
  const gy = 900;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="d" treeY={1300} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <GripCU cx={cx} top={560} s={1.1} />
          {/* both strap ends run down from the grip top, between grip and palm, around the back of the wrist */}
          <path d={`M${cx - 30},560 L${cx - 60},${gy + 300}`} stroke={STRAP} strokeWidth={34} strokeLinecap="round" />
          <path d={`M${cx + 30},560 L${cx + 70},${gy + 300}`} stroke={STRAP} strokeWidth={34} strokeLinecap="round" />
          {/* arm from the lower right */}
          <path d={`M${cx + 60},${gy + 300} L1300,2200`} stroke={OWEN.jacket} strokeWidth={200} strokeLinecap="round" />
          <rect x={cx - 110} y={gy + 250} width={260} height={90} rx={36} fill={OWEN.jacketShade} transform={`rotate(-30 ${cx + 20} ${gy + 295})`} />
          {/* wrist band of the strap */}
          <path d={`M${cx - 80},${gy + 290} Q${cx + 20},${gy + 350} ${cx + 120},${gy + 270}`} stroke={STRAP} strokeWidth={42} fill="none" strokeLinecap="round" />
          <path d={`M${cx - 80},${gy + 278} Q${cx + 20},${gy + 336} ${cx + 120},${gy + 258}`} stroke={STRAP_HI} strokeWidth={6} fill="none" strokeLinecap="round" />
          {/* glove: open (fingers out) to closed around the grip and strap */}
          <ellipse cx={cx + 30} cy={gy + 120} rx={130} ry={150} fill={GLOVE} />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={mix(cx + 120, cx - 110, close)}
              y={gy - 30 + i * 62}
              width={mix(150, 230, close)}
              height={54}
              rx={26}
              fill={i % 2 ? "#323232" : GLOVE}
            />
          ))}
          <rect x={cx - 150} y={gy + 60} width={150} height={60} rx={28} fill="#323232" transform={`rotate(${mix(-60, -10, close)} ${cx - 20} ${gy + 90})`} />
        </Svg>
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 200} strength={0.25} col="255,214,150" />
      <Particles seed={2304} n={10} col="#fff3d6" fall={4} bokeh />
      <Grade sunX={760} sunY={600} warm="255,214,170" vignette={0.5} />
      <Chip text="Then grip over it" t={t} t0={7.0} x={60} y={170} icon="check" big />
      <Chip text="Strap under your palm" t={t} t0={7.9} x={60} y={300} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: he leans on the strap, lets go for a branch, the pole stays on his wrist (8.9 - 11.3) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const grab = at(t, [9.9, 10.4], [0, 1], outExpo);
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.4), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = {
    x: 400,
    y: g + 20,
    scale: 2.4,
    walk: 0,
    lean: mix(0.14, 0.22, grab),
    poles: false,
    handOverride: [mix(70, 150, grab), mix(40, -90, grab)],
    breathe: Math.sin(t * 2.4) * 1.5,
  };
  const h = handOf(p, 1);
  const swing = Math.sin((t - 10.2) * 6) * 10 * Math.exp(-Math.max(0, t - 10.2) * 2) * grab;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="e" treeY={g - 220} t={t} />
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.26} col="255,214,150" />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} tilt={-0.12} />
        <Svg>
          <Pine x={1020} y={g - 30} h={900} c="#2f4a3a" c2="#243a2e" />
          <Branch x={760} y={g - 640} s={1.3} bend={grab} />
        </Svg>
        <Subject rimX={5} col="rgba(255,214,150,0.9)">
          <Person {...p} outfit={OWEN} expression="happy" />
          {grab < 0.3 ? (
            <LoosePole x={h[0]} y={h[1]} len={560} rot={-6} />
          ) : (
            <>
              {/* pole hanging from the strap on his wrist */}
              <path d={`M${h[0]},${h[1] + 20} L${h[0] + 10},${h[1] + 90}`} stroke={STRAP} strokeWidth={8} strokeLinecap="round" />
              <LoosePole x={h[0] + 10} y={h[1] + 90} len={560} rot={swing - 4} />
            </>
          )}
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f3a3a" side="left" />
      </Plane>
      <Particles seed={2305} n={14} col="#ffe7b8" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,214,170" vignette={0.5} />
      <Chip text="The strap carries weight" t={t} t0={9.0} x={60} y={170} icon="check" big />
      <Chip text="The pole stays" t={t} t0={10.3} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/folding-trekking-pole-cut.png"
      cutoutH={800}
      spec="4-SECTION ALUMINUM · SOLD SINGLE"
      name={
        <>
          Telescoping
          <br />
          Trekking Pole
        </>
      }
      nameSize={100}
      price="$19.99"
      save="Save this before your next climb"
    />
  );
};

export const V230: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.68} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.6} to={4.78} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.6} />
    </Scene>
    <Scene from={4.7} to={6.88} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.7} />
    </Scene>
    <Scene from={6.8} to={8.98} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={6.8} />
    </Scene>
    <Scene from={8.9} to={11.3} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={8.9} />
    </Scene>
    <Scene from={11.2} to={15.6} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.6, 1600],
        [2.6, 4.7, 1600],
        [4.7, 6.8, 1600],
        [6.8, 8.9, 1600],
        [8.9, 11.2, 1600],
      ]}
    />
  </AbsoluteFill>
);
