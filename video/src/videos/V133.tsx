// V133: "Her feet were ice in a warm sleeping bag." in the cinematic C01 style, cold late-fall camp. Story for the Merino Wool
// Hiking Socks (80% Merino, Cushioned Crew, $19.99, live Shopify). Advice (common, conservative camp practice): socks you hiked
// in are damp with sweat, and damp socks make cold feet; keep one dry pair of wool socks only for sleeping, sealed in a bag;
// at camp dry your feet and put them on loose, not tight. No temperature ratings or numbers on screen. No stove in the tent.
// End card = real Shopify product photo cut out (products/merino-wool-hiking-socks-cut.png).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { Mug } from "../home";
import vo from "../vo/v133.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#121a30", mid: "#26334f", low: "#4a5672", sun: [800, 330], sunR: 30, sunCol: "#f1efe4", glow: "#8f9ab4" };
const DUSK: Sky = { top: "#2c3f63", mid: "#8c8fa8", low: "#e6b998", sun: [780, 760], sunR: 44, sunCol: "#fff0d8", glow: "#f2a878" };
const SUNRISE: Sky = { top: "#3d5f8a", mid: "#e2b38c", low: "#ffdcae", sun: [300, 820], sunR: 56, sunCol: "#fff4dc", glow: "#ffc27a" };
const LAMP = "255,206,140";
const COLDB = "#7cc0ff";
const SOCK = "#2f3e5c"; // navy merino sleep socks
const SOCK2 = "#25314a";

const NORA: Outfit = {
  ...JAKE,
  skin: "#F0C3A4",
  skinShade: "#D2A385",
  hair: "#7a3b1e",
  ponytail: "#7a3b1e",
  beard: null,
  cap: "#5B6B3A",
  capShade: "#46542C",
  jacket: "#6b4a7a",
  jacketShade: "#52385e",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#2F6F8E",
  packShade: "#22546c",
  glove: null,
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(10,14,24,0) 0%, rgba(10,14,24,0.42) 45%, rgba(10,14,24,0.42) 70%, rgba(10,14,24,0) 100%)" }} />
);

// ---------- scenery ----------
const Stars: React.FC<{ k?: number }> = ({ k = 1 }) => (
  <Svg>
    {Array.from({ length: 46 }, (_, i) => (
      <circle key={i} cx={(i * 263) % 1080} cy={60 + ((i * 151) % 760)} r={1.5 + (i % 3)} fill="#f4f1e6" opacity={(0.45 + (i % 4) * 0.12) * k} />
    ))}
  </Svg>
);

const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 12 }, (_, i) => {
      const x = ((((-160 + i * 150 - shift) % 1800) + 1800) % 1800) - 300;
      return <Pine key={i} x={x} y={y + (i % 2) * 20} h={420 + (i % 3) * 90} c="#1d3328" c2="#152820" />;
    })}
  </Svg>
);

const CampBackdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; t: number; blur?: number; stars?: number }> = ({ cam, sky, uid, treeY, t, blur = 0, stars = 0 }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      {stars > 0 && <Stars k={stars} />}
      <Clouds y={300} col={stars > 0 ? "#5a6684" : "#ffffff"} seed={uid.charCodeAt(0)} drift={t * 10} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2.6 + blur}>
      <Ridge seed={61} base={treeY - 260} amp={320} scale={250} col="#2f3a52" lit="#6f7c98" peak={110} />
    </Plane>
    <Haze y={treeY - 400} h={360} col={sky.low} opacity={0.4} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={67} base={treeY - 90} amp={180} scale={180} col="#22303a" />
    </Plane>
    <Plane cam={cam} depth={0.5} blur={1 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Ground: React.FC<{ y: number; frost?: number }> = ({ y, frost = 0 }) => (
  <Svg>
    <path d={`M-400,${y} Q540,${y - 30} 1480,${y} L1480,2600 L-400,2600 Z`} fill="#3a4030" />
    <path d={`M-400,${y + 200} Q540,${y + 170} 1480,${y + 200} L1480,2600 L-400,2600 Z`} fill="#30362a" />
    {Array.from({ length: 20 }, (_, i) => {
      const x = -360 + i * 96;
      const yy = y + 40 + ((i * 59) % 300);
      return <path key={i} d={`M${x},${yy} q6,-26 12,-48 M${x + 10},${yy} q-4,-22 -10,-38`} stroke={frost > 0 ? "#9fb0b8" : "#4b5238"} strokeWidth={5} fill="none" strokeLinecap="round" />;
    })}
  </Svg>
);

const Lantern: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <circle cx={0} cy={-60} r={120} fill="#ffd690" opacity={0.18} />
    <rect x={-30} y={-100} width={60} height={86} rx={12} fill="#fff1c8" />
    <rect x={-36} y={-112} width={72} height={18} rx={6} fill="#2f3a2c" />
    <rect x={-36} y={-18} width={72} height={18} rx={6} fill="#2f3a2c" />
    <path d="M-20,-112 Q0,-150 20,-112" stroke="#2f3a2c" strokeWidth={6} fill="none" />
  </g>
);

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

// Side-view sock (local: cuff top-left, toe to the right). damp = dark sweat patches.
const Sock: React.FC<{ x: number; y: number; s?: number; rot?: number; col?: string; heel?: string; damp?: number }> = ({ x, y, s = 1, rot = 0, col = SOCK, heel = SOCK2, damp = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M-40,-160 L40,-160 L40,-20 Q40,30 90,30 L120,30 Q150,30 150,60 Q150,90 110,90 L10,90 Q-40,90 -40,40 Z" fill={col} />
    <rect x={-40} y={-160} width={80} height={30} fill={heel} />
    {[-148, -140].map((yy) => (
      <line key={yy} x1={-40} y1={yy} x2={40} y2={yy} stroke={col} strokeWidth={2} opacity={0.6} />
    ))}
    <path d="M110,30 Q150,30 150,60 Q150,90 110,90 Z" fill={heel} />
    <path d="M-40,40 Q-40,90 10,90 L10,50 Q-10,50 -10,20 L-40,20 Z" fill={heel} />
    {damp > 0 && (
      <g opacity={damp}>
        <path d="M-40,-10 Q-40,90 10,90 L110,90 Q150,90 150,60 Q140,40 100,44 Q40,40 20,10 Q0,-20 -40,-10 Z" fill="#1b2026" opacity={0.35} />
        <path d="M-40,-120 Q0,-90 40,-110 L40,-60 Q0,-40 -40,-70 Z" fill="#1b2026" opacity={0.18} />
      </g>
    )}
  </g>
);

// Close-up bare foot, side view, toes to the right (local: ankle top at 0,-260, sole at y=0).
const FOOT = "M-70,-260 L50,-260 L56,-120 Q70,-96 140,-70 Q230,-44 250,-20 Q262,0 236,6 L-40,6 Q-98,6 -96,-50 Q-92,-110 -70,-150 Z";
const Foot: React.FC<{ x: number; y: number; s?: number; on: number; wet?: number; t: number }> = ({ x, y, s = 1, on, wet = 0, t }) => {
  // the sock slides on from the toes back to the heel, then up over the ankle
  const front = mix(300, -120, Math.min(1, on / 0.7));
  const up = at(on, [0.6, 1], [20, -280]);
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <defs>
        <clipPath id="footClip">
          <path d={FOOT} />
        </clipPath>
      </defs>
      <rect x={-74} y={-460} width={128} height={220} fill={NORA.skin} />
      <rect x={-84} y={-900} width={148} height={460} rx={20} fill={NORA.pants} />
      <rect x={-88} y={-480} width={156} height={44} rx={14} fill={NORA.pantsShade} />
      <path d={FOOT} fill={NORA.skin} />
      <path d="M-96,-50 Q-92,-110 -70,-150 L-50,-150 Q-60,-80 -40,6 L-40,6 Q-98,6 -96,-50 Z" fill={NORA.skinShade} />
      {[200, 222, 240].map((tx, i) => (
        <path key={i} d={`M${tx},-36 q8,-6 12,4`} stroke={NORA.skinShade} strokeWidth={4} fill="none" />
      ))}
      {wet > 0 &&
        Array.from({ length: 8 }, (_, i) => (
          <circle key={i} cx={-40 + ((i * 47) % 260)} cy={-40 - ((i * 31) % 160) * (i % 2 ? 0.4 : 1)} r={5 + (i % 3) * 2} fill="#dff2ff" opacity={0.6 * wet * (0.8 + 0.2 * Math.sin(t * 6 + i))} />
        ))}
      {on > 0 && (
        <g clipPath="url(#footClip)">
          <rect x={front} y={-400} width={600} height={420} fill={SOCK} />
          <rect x={-200} y={up} width={600} height={420} fill={SOCK} opacity={on > 0.6 ? 1 : 0} />
          <path d="M-96,-50 Q-92,-110 -70,-150 L-50,-150 Q-60,-80 -40,6 L-40,6 Q-98,6 -96,-50 Z" fill={SOCK2} opacity={on > 0.55 ? 1 : 0} />
          <path d="M200,6 Q262,0 250,-20 Q230,-44 190,-58 Z" fill={SOCK2} opacity={on > 0.15 ? 1 : 0} />
        </g>
      )}
      {on > 0.6 && (
        <g>
          <rect x={-76} y={at(on, [0.6, 1], [-262, -400])} width={132} height={at(on, [0.6, 1], [4, 142])} fill={SOCK} />
          <rect x={-78} y={at(on, [0.6, 1], [-262, -400])} width={136} height={24} rx={6} fill={SOCK2} />
        </g>
      )}
    </g>
  );
};

// Clear zip bag (screen coords centre bottom). seal 0..1 = the zip closes left to right.
const ZipBag: React.FC<{ x: number; y: number; w: number; h: number; seal: number }> = ({ x, y, w, h, seal }) => (
  <g>
    <rect x={x - w / 2} y={y - h} width={w} height={h} rx={26} fill="rgba(220,236,248,0.22)" stroke="rgba(240,248,255,0.85)" strokeWidth={6} />
    <path d={`M${x - w / 2 + 30},${y - h + 40} L${x + w / 2 - 30},${y - h + 40}`} stroke="rgba(240,248,255,0.5)" strokeWidth={8} />
    <path d={`M${x - w / 2 + 30},${y - h + 40} L${x - w / 2 + 30 + (w - 60) * seal},${y - h + 40}`} stroke="#3c7fbf" strokeWidth={10} strokeLinecap="round" />
    <path d={`M${x - w / 2 + 40},${y - h + 70} Q${x - w / 2 + 30},${y - 40} ${x - w / 2 + 50},${y - 30}`} stroke="rgba(255,255,255,0.55)" strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>
);

// Tent floor + lantern light for the close-ups.
const Floor: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y} width={1880} height={1600} fill="#3b4656" />
    {Array.from({ length: 7 }, (_, i) => (
      <line key={i} x1={-400} y1={y + 60 + i * 130} x2={1480} y2={y + 40 + i * 130} stroke="#334050" strokeWidth={6} />
    ))}
    <ellipse cx={760} cy={y + 120} rx={700} ry={260} fill="#ffd690" opacity={0.12} />
  </Svg>
);

// Nora in her bag inside the tent cutaway (screen coords: tent centre x, ground y, scale). cold = blue glow at the feet end.
const InBag: React.FC<{ x: number; y: number; s: number; cold: number; awake: boolean; t: number; happy?: boolean }> = ({ x, y, s, cold, awake, t, happy }) => {
  const shiver = cold > 0.3 ? Math.sin(t * 40) * 1.5 * cold : 0;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <ellipse cx={0} cy={8} rx={230} ry={20} fill="rgba(0,0,0,0.35)" />
      <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill="#2a3524" />
      <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill="rgba(255,200,120,0.18)" />
      <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill="none" stroke="#5f7a4a" strokeWidth={10} />
      <rect x={-200} y={-22} width={400} height={22} rx={8} fill="#2F7F86" />
      <g transform={`translate(${shiver},0)`}>
        {/* bag */}
        <path d="M-150,-20 Q-150,-84 -96,-84 L150,-74 Q186,-60 176,-20 Z" fill="#C9A23E" />
        <path d="M-60,-82 L150,-73" stroke="#a5832c" strokeWidth={3} />
        <path d="M-40,-60 L170,-48 M-30,-40 L172,-32" stroke="#a5832c" strokeWidth={2} opacity={0.6} />
        {/* head */}
        <circle cx={-118} cy={-82} r={28} fill={NORA.skin} />
        <path d="M-146,-86 Q-118,-136 -90,-86 Z" fill={NORA.cap} />
        <circle cx={-118} cy={-134} r={8} fill="#e8e2d0" />
        {awake ? <ellipse cx={-106} cy={-80} rx={3.2} ry={4} fill="#2a2a2a" /> : <path d="M-110,-80 q5,3 10,0" stroke="#2a2a2a" strokeWidth={2.5} fill="none" />}
        <path d={happy ? "M-108,-66 q7,5 14,0" : "M-108,-64 q7,-3 14,0"} stroke="#5a2e22" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      </g>
      {/* cold feet glow at the foot end */}
      {cold > 0 && <ellipse cx={150} cy={-46} rx={46 + Math.sin(t * 5) * 4} ry={36} fill={COLDB} opacity={0.75 * cold} filter="url(#bagBlur)" />}
      <defs>
        <filter id="bagBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={10} />
        </filter>
      </defs>
      <g transform="translate(-60,-150)">
        <Lantern x={0} y={0} s={0.35} />
      </g>
    </g>
  );
};

// ============ S1 HOOK MEDIUM: midnight, tent cutaway, Nora awake in her bag, cold feet glow (0 - 3.3) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, t / 3.3), rot: hh.rot };
  const g = 1480;
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} sky={NIGHT} uid="a" treeY={g - 320} t={t} blur={3} stars={1} />
      <Plane cam={cam} depth={1}>
        <Ground y={g - 40} frost={1} />
        <Subject rimX={4} col="rgba(170,200,255,0.6)">
          <Svg>
            <InBag x={600} y={g + 40} s={2.6} cold={at(t, [0, 1.5], [0.8, 1])} awake t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#13241c" side="right" />
      </Plane>
      <Particles seed={1331} n={16} col="#dfe8ff" fall={10} />
      <LowScrim />
      <Grade sunX={540} sunY={1200} warm="200,210,255" cool="20,30,70" vignette={0.6} />
      <Title text={"Her feet were ice\nin a warm\nsleeping bag."} t={t} t0={0} top={110} size={124} />
      <Chip text="Bag rated for the cold" t={t} t0={1.6} x={60} y={600} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the damp hiking socks inside the bag, cold (3.3 - 5.74) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3, at(t, [4.45, 4.55, 4.9], [0, 1, 0]) * 2.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.09, lt / 2.44), rot: hh.rot };
  const shiver = Math.sin(t * 38) * 3;
  return (
    <AbsoluteFill style={{ background: "#141a26" }}>
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* inside of the bag: quilted lining */}
          <rect x={-200} y={-200} width={1480} height={2400} fill="#3c3424" />
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M-200,${200 + i * 210} Q540,${150 + i * 210} 1280,${200 + i * 210}`} stroke="#2c2619" strokeWidth={10} fill="none" />
          ))}
          <ellipse cx={560} cy={1060} rx={420} ry={300} fill={COLDB} opacity={0.12} />
        </Svg>
        <Subject rimX={-4} col="rgba(160,200,255,0.7)">
          <g transform={`translate(${shiver},0)`}>
            <Sock x={430} y={1040} s={2.6} rot={-8} col="#8a8f96" heel="#6c7178" damp={1} />
            <Sock x={560} y={1150} s={2.4} rot={4} col="#7b8088" heel="#5e636a" damp={1} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1332} n={18} col="#cfe6ff" fall={6} />
      <LowScrim />
      <Grade sunX={540} sunY={900} warm="190,210,255" cool="20,30,70" vignette={0.65} />
      <Chip text="Midnight" t={t} t0={3.35} x={60} y={200} icon="none" big />
      <Chip text="Feet freezing" t={t} t0={4.45} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: earlier, at dusk: she walks into camp and crawls in, still in her hiking socks (5.74 - 10.25) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: mix(1.0, 1.07, lt / 4.51), rot: hh.rot };
  const g = 1520;
  const ph = t * 2.6;
  const walk = at(t, [5.74, 8.4], [0, 1]);
  const p: HikerProps = { x: mix(170, 560, walk), y: g + 40, scale: 2.2, phase: ph, walk: walk < 1 ? 0.55 : 0, lean: 0.12, poles: false, handOverride: walk < 1 ? freeHand(ph, 0.5) : [30, 20], breathe: 0 };
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} sky={DUSK} uid="c" treeY={g - 300} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <Ground y={g - 40} />
        <Svg>
          <Tent x={820} y={g + 40} s={1.2} glow={0.6} />
        </Svg>
        <Subject rimX={6} col="rgba(255,214,170,0.85)">
          <Person {...p} outfit={NORA} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1d3024" side="left" />
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.25} col="255,214,170" />
      <Particles seed={1333} n={16} col="#ffe8c8" fall={8} />
      <LowScrim />
      <Grade sunX={780} sunY={760} warm="255,210,170" cool="40,40,80" />
      <Chip text="Earlier" t={t} t0={5.8} x={60} y={200} icon="none" big />
      <Chip text="Same socks she hiked in" t={t} t0={7.2} x={60} y={330} icon="x" big />
      <Chip text="Damp with sweat" t={t} t0={8.3} x={60} y={460} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the fix: one dry wool pair, only for sleeping, sealed in a bag (10.25 - 15.85) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + mix(-20, 20, lt / 5.6), y: hh.y, zoom: mix(1.0, 1.07, lt / 5.6), rot: hh.rot };
  const drop = at(t, [11.7, 12.5], [0, 1], outExpo);
  const seal = at(t, [14.2, 14.9], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#141a26" }}>
      <Plane cam={cam} depth={0.4} blur={16}>
        <Svg>
          <rect x={-400} y={-200} width={1880} height={1400} fill="#4c6339" />
          <path d="M140,1200 Q160,300 540,200 Q920,300 940,1200 Z" fill="#26334f" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Floor y={1080} />
        <Svg>
          <Lantern x={900} y={1080} s={1.4} />
        </Svg>
        <Subject rimX={-4} col="rgba(255,214,160,0.8)">
          <g opacity={drop} transform={`translate(0,${(1 - drop) * -200})`}>
            <Sock x={400} y={1120} s={1.15} rot={-6} />
            <Sock x={520} y={1140} s={1.15} rot={6} col="#344566" />
          </g>
          <ZipBag x={490} y={1290} w={560} h={520} seal={seal} />
        </Subject>
      </Plane>
      <Particles seed={1334} n={12} col="#ffe8c0" fall={6} />
      <LowScrim />
      <Grade sunX={900} sunY={1000} warm={LAMP} vignette={0.55} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={11.55} top={200} size={124} />
      <Chip text="One dry wool pair" t={t} t0={11.6} x={60} y={200} icon="check" big />
      <Chip text="Just for sleeping" t={t} t0={13.25} x={60} y={330} icon="check" big />
      <Chip text="Sealed in a bag" t={t} t0={14.2} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: dry the feet, pull the socks on, loose (15.85 - 19.79) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.09, lt / 3.94), rot: hh.rot };
  const towel = at(t, [16.3, 17.2], [0, 1]);
  const on = at(t, [17.3, 18.2], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#141a26" }}>
      <Plane cam={cam} depth={0.4} blur={16}>
        <Svg>
          <rect x={-400} y={-200} width={1880} height={1400} fill="#4c6339" />
          <ellipse cx={820} cy={700} rx={300} ry={300} fill="#ffd690" opacity={0.25} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Floor y={1180} />
        <Subject rimX={-4} col="rgba(255,214,160,0.8)">
          <Svg>
            <rect x={-100} y={1150} width={1300} height={70} rx={30} fill="#2F7F86" />
            <Foot x={420} y={1160} s={1.9} on={on} wet={1 - towel} t={t} />
            {towel > 0 && towel < 1 && (
              <g transform={`translate(${mix(380, 760, towel)},${1000 + Math.sin(towel * 12) * 20}) rotate(-12)`}>
                <rect x={-140} y={-90} width={280} height={180} rx={24} fill="#d9d2c2" />
                <path d="M-140,-50 L140,-50 M-140,50 L140,50" stroke="#bdb5a4" strokeWidth={8} />
              </g>
            )}
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1335} n={12} col="#ffe8c0" fall={6} />
      <LowScrim />
      <Grade sunX={820} sunY={700} warm={LAMP} vignette={0.55} />
      <Chip text="Dry your feet" t={t} t0={16.4} x={60} y={200} icon="check" big />
      <Chip text="Pull them on" t={t} t0={17.3} x={60} y={330} icon="check" big />
      <Chip text="Loose, not tight" t={t} t0={18.24} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 PAYOFF MEDIUM: sunrise, Nora outside the tent with a warm drink (19.79 - 22.5) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.3], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 330, y: g + 40, scale: 2.4, walk: 0, lean: 0.02, poles: false, handOverride: [44, -60], breathe: Math.sin(t * 2.2) * 1.5 };
  const s = p.scale ?? 1;
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} sky={SUNRISE} uid="f" treeY={g - 300} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <Ground y={g - 40} frost={1} />
        <Svg>
          <Tent x={760} y={g + 40} s={1.3} />
        </Svg>
        <Subject rimX={-6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={NORA} expression="happy" noPack />
          <Svg>
            <Mug x={p.x + 64 * s} y={p.y - 236 * s} s={0.55} t={t} col="#2F7F86" />
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1d3024" side="right" />
      </Plane>
      <Rays x={SUNRISE.sun[0]} y={SUNRISE.sun[1] - 80} strength={0.5} col="255,226,180" />
      <Particles seed={1336} n={20} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={300} sunY={820} warm="255,222,176" />
      <Readout label="SLEPT WARM" value="Until sunrise" ok={true} t={t} t0={19.9} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S7: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/merino-wool-hiking-socks-cut.png"
      cutoutH={720}
      spec="80% MERINO · CUSHIONED CREW"
      name={
        <>
          Merino Wool
          <br />
          Hiking Socks
        </>
      }
      nameSize={104}
      price="$19.99"
      save="Save this before your next cold camp"
    />
  );
};

export const V133: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.35} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.3} to={5.79} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.3} />
    </Scene>
    <Scene from={5.74} to={10.3} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.74} />
    </Scene>
    <Scene from={10.25} to={15.9} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={10.25} />
    </Scene>
    <Scene from={15.85} to={19.84} fadeIn={0.08} fadeOut={0.1}>
      <S5 off={15.85} />
    </Scene>
    <Scene from={19.79} to={22.55} fadeIn={0.12} fadeOut={0.12}>
      <S6 off={19.79} />
    </Scene>
    <Scene from={22.45} to={27.0} fadeOut={0}>
      <S7 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.3, 1600],
        [3.3, 5.74, 1660],
        [5.74, 10.25, 1600],
        [10.25, 15.85, 1660],
        [15.85, 19.79, 1660],
        [19.79, 22.45, 1600],
      ]}
    />
  </AbsoluteFill>
);
