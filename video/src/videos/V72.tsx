// V72: "Her boot skidded on frost" in the cinematic C01 style. Shaded parts of a trail can stay icy after sunrise in November.
// Advice kept conservative: watch for shine, step on gravel / leaves / rough edges, short steps, pole planted first, turn back if glazed.
// End card = Telescoping Trekking Pole, 4-section aluminum, sold single, $19.99 (live Shopify). No traction claims for the pole.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, LeafTree, Pine, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v72.json";

const words = vo.words as unknown as Word[];

const COLD: Sky = { top: "#56677a", mid: "#9aa8b3", low: "#dfe0e0", sun: [820, 520], sunR: 34, sunCol: "#f4f4ee", glow: "#dde0e0" };
const BRIGHT: Sky = { top: "#3a6d9e", mid: "#b9cfe0", low: "#f7e6c4", sun: [860, 460], sunR: 50, sunCol: "#fffbe8", glow: "#ffe2a6" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 660], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const MAYA: Outfit = {
  ...GUIDE,
  skin: "#E2B08F",
  skinShade: "#C69373",
  hair: "#2a1d15",
  ponytail: "#2a1d15",
  beard: null,
  cap: "#B83A55",
  capShade: "#8E2B42",
  jacket: "#2F7F86",
  jacketShade: "#256870",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  boot: "#5a3e2a",
  sole: "#1d1916",
  pack: "#C2662E",
  packShade: "#9B4E20",
  pole: "#2a2e33",
  grip: "#111",
  glove: "#2C3B2E",
};

const FROST = "#e8f0f4";
const DIRT = "#8a7254";
const ROCKC = "#7d8288";

const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = 440 + (i % 3) * 70;
      return i % 3 === 1 ? (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c="#9a6a3a" c2="#7a5230" />
      ) : (
        <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c="#3b6550" c2="#2b4d3c" />
      );
    })}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={6} drift={t * 12} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={11} base={treeY - 260} amp={380} scale={250} col="#8fa3b4" lit="#ffffff" peak={160} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.75} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={23} base={treeY - 120} amp={260} scale={180} col="#6f8577" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.45} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

// Trail on a slope (tilt > 0 rises to the right). shade: [x0, x1] screen range in tree shadow, where rocks are frosted.
const Trail: React.FC<{ y: number; tilt?: number; shade?: [number, number]; glaze?: number }> = ({ y, tilt = 0, shade = [-400, 1480], glaze = 0 }) => {
  const Y = (x: number) => y - tilt * (x - 540);
  const inShade = (x: number) => x >= shade[0] && x <= shade[1];
  return (
    <Svg>
      <path d={`M-400,${Y(-400) - 50} L1480,${Y(1480) - 50} L1480,2600 L-400,2600 Z`} fill="#6f6a48" />
      <path d={`M-400,${Y(-400) - 10} L1480,${Y(1480) - 10} L1480,${Y(1480) + 90} L-400,${Y(-400) + 90} Z`} fill={DIRT} />
      {/* tree shadow band with frost */}
      <path d={`M${shade[0]},${Y(shade[0]) - 60} L${shade[1]},${Y(shade[1]) - 60} L${shade[1]},2600 L${shade[0]},2600 Z`} fill="rgba(40,60,90,0.28)" />
      <path d={`M${shade[0]},${Y(shade[0]) - 10} L${shade[1]},${Y(shade[1]) - 10} L${shade[1]},${Y(shade[1]) + 90} L${shade[0]},${Y(shade[0]) + 90} Z`} fill={FROST} opacity={0.35 + glaze * 0.4} />
      {Array.from({ length: 9 }, (_, i) => {
        const x = -300 + i * 220;
        const f = inShade(x);
        return (
          <g key={i}>
            <ellipse cx={x} cy={Y(x) + 40} rx={70} ry={22} fill={ROCKC} />
            {f && <ellipse cx={x - 6} cy={Y(x) + 32} rx={60} ry={12} fill={FROST} opacity={0.9} />}
            {f && <path d={`M${x - 30},${Y(x) + 30} l40,-6`} stroke="#ffffff" strokeWidth={6} strokeLinecap="round" />}
          </g>
        );
      })}
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse key={`l${i}`} cx={-320 + i * 160} cy={Y(-320 + i * 160) + 70 + (i % 3) * 8} rx={14} ry={6} fill={i % 2 ? "#b77a28" : "#94461f"} />
      ))}
    </Svg>
  );
};

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

const Slide: React.FC<{ p: HikerProps; k: number }> = ({ p, k }) => {
  const f = hikerGeometry(p).legs[0].foot;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      {[0, 1, 2].map((i) => (
        <line key={i} x1={f[0] - 30 - i * 10} y1={f[1] - 4 - i * 8} x2={f[0] - 90 - i * 20} y2={f[1] - 4 - i * 8} stroke="#ffffff" strokeWidth={4} strokeLinecap="round" />
      ))}
    </g>
  );
};

// Close-up ground: a big shaded rock with frost, a root, and a boardwalk plank; glints switch on at given times.
const Ground: React.FC<{ t: number; glints: [number, number, number] }> = ({ t, glints }) => {
  const g = (t0: number) => at(t, [t0, t0 + 0.2, t0 + 0.9], [0, 1, 0.55]);
  const Glint: React.FC<{ x: number; y: number; k: number }> = ({ x, y, k }) => (
    <g opacity={k}>
      <path d={`M${x - 60},${y} L${x + 60},${y} M${x},${y - 60} L${x},${y + 60}`} stroke="#ffffff" strokeWidth={6} strokeLinecap="round" />
      <circle cx={x} cy={y} r={18} fill="#ffffff" />
    </g>
  );
  return (
    <Svg>
      <rect x={-400} y={880} width={1880} height={1400} fill="#6f6448" />
      <rect x={-400} y={880} width={1880} height={1400} fill="rgba(40,60,90,0.25)" />
      {/* rock */}
      <path d="M60,1180 Q120,1020 330,1010 Q520,1000 560,1150 Q580,1260 320,1270 Q90,1270 60,1180 Z" fill={ROCKC} />
      <path d="M100,1150 Q160,1040 330,1036 Q490,1032 520,1130 Q420,1100 300,1110 Q170,1120 100,1150 Z" fill={FROST} opacity={0.95} />
      <path d="M180,1080 l150,-20" stroke="#ffffff" strokeWidth={10} strokeLinecap="round" opacity={0.9} />
      {/* root */}
      <path d="M560,1330 Q760,1250 1000,1300 Q1200,1340 1400,1290" stroke="#5a3e2a" strokeWidth={46} fill="none" strokeLinecap="round" />
      <path d="M600,1312 Q760,1240 980,1286" stroke={FROST} strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.85} />
      {/* boardwalk planks */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={-100 + i * 300} y={1420} width={286} height={420} rx={8} fill="#8a6a48" />
          <path d={`M${-80 + i * 300},${1500} h240 M${-80 + i * 300},${1620} h200 M${-80 + i * 300},${1740} h230`} stroke="#6e5238" strokeWidth={6} />
          <rect x={-100 + i * 300} y={1420} width={286} height={420} rx={8} fill="#dbe8ef" opacity={0.28} />
        </g>
      ))}
      <Glint x={330} y={1060} k={g(glints[0])} />
      <Glint x={820} y={1270} k={g(glints[1])} />
      <Glint x={480} y={1470} k={g(glints[2])} />
    </Svg>
  );
};

// ============ S1 HOOK MEDIUM: boot skids on a shaded rock on the descent (0 - 3.6) ============
const S1: React.FC = () => {
  const t = useT();
  const shake = at(t, [1.85, 2.0, 2.6], [0, 1, 0]);
  const hh = handheld(t, 0.8, shake);
  const cam: Cam = { x: t * 16 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, t / 3.6), rot: hh.rot + 1.2 };
  const g = 1400;
  const sl = at(t, [1.85, 2.3], [0, 1], outExpo);
  const ph = Math.min(t, 1.85) * 3.2;
  const p: HikerProps = {
    x: 420 + Math.min(t, 1.85) * 50 + sl * 60,
    y: g + 182 * 2.2 - 140,
    scale: 2.2,
    phase: mix(ph, ph + 1.3, sl),
    walk: mix(0.55, 1, sl),
    lean: mix(-0.04, -0.28, sl),
    poles: true,
    slope: -0.12,
  };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="a" treeY={g - 60} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} tilt={-0.12} shade={[-400, 1480]} />
        <Subject rimX={-4}>
          <Person {...p} outfit={MAYA} expression={t > 1.9 ? "tired" : "neutral"} />
          <Slide p={p} k={sl} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24443a" side="right" />
      </Plane>
      <Particles seed={101} n={26} col="#ffffff" fall={20} />
      <Grade sunX={820} sunY={520} warm="230,230,235" cool="40,60,90" />
      <Title text={"Her boot\nskidded\non frost"} t={t} t0={0} top={140} size={128} />
      <Chip text="Shaded rock" t={t} t0={2.3} x={80} y={560} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: frost on the rock (3.6 - 4.5) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.08, 1.16, lt / 0.9), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="b" treeY={900} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground t={t} glints={[3.7, 99, 99]} />
      </Plane>
      <Particles seed={102} n={20} col="#ffffff" fall={20} />
      <Grade sunX={820} sunY={520} warm="230,230,235" cool="40,60,90" vignette={0.6} />
      <Chip text="Frost" t={t} t0={3.66} x={80} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: sun is up, but the shady stretch stays icy (4.5 - 8.85) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: lt * 40 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 4.35), rot: hh.rot };
  const g = 1460;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={BRIGHT} uid="c" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={0.8}>
        <Svg>
          {/* tall pines on the right casting the shade band */}
          {[0, 1, 2].map((i) => (
            <Pine key={i} x={700 + i * 170} y={g + 20 + (i % 2) * 20} h={900 - i * 60} c="#2f5446" c2="#24443a" />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Trail y={g + 100} tilt={0.04} shade={[560, 1480]} />
        <Subject>
          <Person x={340} y={g + 120} scale={1.35} walk={0} lean={0.04} poles outfit={MAYA} expression="neutral" />
        </Subject>
      </Plane>
      <Rays x={BRIGHT.sun[0]} y={BRIGHT.sun[1]} strength={0.2} />
      <Particles seed={103} n={18} col="#fff3d6" fall={10} />
      <Grade sunX={860} sunY={460} warm="255,214,170" />
      <Chip text="November" t={t} t0={4.75} x={80} y={240} />
      <Chip text="Shade stays icy" t={t} t0={6.8} x={80} y={350} icon="x" big />
      <Chip text="Even after sunrise" t={t} t0={7.9} x={80} y={480} />
    </AbsoluteFill>
  );
};

// ============ S4 FIX: watch for shine on rock, roots, boardwalk (8.85 - 13.0) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: lt * 12 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 4.15), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="d" treeY={900} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground t={t} glints={[11.34, 11.66, 12.1]} />
      </Plane>
      <Particles seed={104} n={16} col="#ffffff" fall={16} />
      <Grade sunX={820} sunY={520} warm="230,230,235" cool="40,60,90" vignette={0.5} />
      <Title text={"Watch for\nshine."} t={t} t0={off + 0.15} top={170} size={150} />
      <Chip text="Rock" t={t} t0={11.34} x={80} y={520} icon="check" />
      <Chip text="Roots" t={t} t0={11.66} x={80} y={620} icon="check" />
      <Chip text="Boardwalk" t={t} t0={12.1} x={80} y={720} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: boot steps on gravel and the rough edge (13.0 - 16.22) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.2), rot: hh.rot };
  const step = at(t, [13.2, 13.7], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="e" treeY={1000} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={1150} width={1880} height={1100} fill="#6f6448" />
          {/* glazed strip on the left, gravel and leaves on the right edge */}
          <path d="M-400,1150 L560,1150 L520,2200 L-400,2200 Z" fill="#c9dbe6" />
          <path d="M-200,1260 l260,-30 M-100,1500 l300,-30" stroke="#ffffff" strokeWidth={12} strokeLinecap="round" opacity={0.8} />
          {Array.from({ length: 60 }, (_, i) => (
            <ellipse key={i} cx={600 + ((i * 97) % 520)} cy={1180 + ((i * 53) % 700)} rx={14 + (i % 4) * 4} ry={9 + (i % 3) * 3} fill={i % 3 ? "#9a9386" : "#7d776c"} />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <path key={`lf${i}`} d="M0,-16 Q14,0 0,16 Q-14,0 0,-16 Z" fill={i % 2 ? "#b77a28" : "#94461f"} transform={`translate(${640 + ((i * 131) % 460)},${1250 + ((i * 71) % 560)}) rotate(${i * 37}) scale(1.6)`} />
          ))}
          {/* boot coming down on the gravel side */}
          <g transform={`translate(${mix(480, 560, step)},${mix(900, 1180, step)})`}>
            <path d="M120,-560 Q200,-600 280,-560 L300,-120 L110,-120 Z" fill={MAYA.pants} />
            <path d="M70,-140 L320,-140 Q360,-80 470,-50 Q560,-20 560,40 L560,70 L50,70 Z" fill={MAYA.boot} stroke="rgba(0,0,0,0.3)" strokeWidth={4} />
            <path d="M110,-120 L300,-120" stroke="#c9b48e" strokeWidth={10} />
            <rect x={40} y={60} width={530} height={34} rx={14} fill={MAYA.sole} />
            {[0, 1, 2, 3, 4, 5, 6].map((k) => (
              <rect key={k} x={60 + k * 72} y={88} width={40} height={16} rx={4} fill={MAYA.sole} />
            ))}
          </g>
        </Svg>
      </Plane>
      <Particles seed={105} n={14} col="#ffffff" fall={16} />
      <Grade sunX={820} sunY={520} warm="230,230,235" cool="40,60,90" vignette={0.55} />
      <Chip text="Gravel" t={t} t0={13.52} x={80} y={230} icon="check" big />
      <Chip text="Leaves" t={t} t0={14.13} x={80} y={360} icon="check" big />
      <Chip text="The rough edge" t={t} t0={14.95} x={80} y={490} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 MEDIUM: short steps, weight over your feet (16.22 - 18.7) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 18 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.5), rot: hh.rot + 1 };
  const g = 1400;
  const ph = lt * 4.2;
  const p: HikerProps = { x: 470 + lt * 22, y: g + 182 * 2.4 - 150, scale: 2.4, phase: ph, walk: 0.35, lean: 0.0, poles: true, slope: -0.1 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="f" treeY={g - 60} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} tilt={-0.1} shade={[-400, 1480]} />
        <Subject rimX={5}>
          <Person {...p} outfit={MAYA} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24443a" side="left" />
      </Plane>
      <Particles seed={106} n={20} col="#ffffff" fall={18} />
      <Grade sunX={820} sunY={520} warm="230,230,235" cool="40,60,90" />
      <Chip text="Short steps" t={t} t0={16.4} x={80} y={230} icon="check" big />
      <Chip text="Weight over your feet" t={t} t0={17.4} x={80} y={360} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: plant the pole first (18.7 - 20.8) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const plant = at(t, [18.85, 19.3], [0, 1], outExpo);
  const shake = at(t, [19.3, 19.4, 19.8], [0, 0.4, 0]);
  const hh = handheld(t, 0.4, shake);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.1), rot: hh.rot };
  const tipY = mix(1180, 1360, plant);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="g" treeY={1000} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={1250} width={1880} height={1000} fill="#6f6448" />
          <rect x={-400} y={1250} width={1880} height={1000} fill="rgba(40,60,90,0.25)" />
          {Array.from({ length: 30 }, (_, i) => (
            <ellipse key={i} cx={-200 + ((i * 137) % 1500)} cy={1300 + ((i * 61) % 600)} rx={16} ry={10} fill="#8f897c" />
          ))}
          {/* pole: grip in gloved hand, shaft down to the ground */}
          <g transform={`rotate(-12 ${560} ${tipY})`}>
            <rect x={548} y={tipY - 1100} width={24} height={1100} rx={10} fill={MAYA.pole} />
            <rect x={545} y={tipY - 700} width={30} height={20} rx={6} fill="#555" />
            <rect x={545} y={tipY - 420} width={30} height={20} rx={6} fill="#555" />
            <rect x={530} y={tipY - 1120} width={60} height={220} rx={24} fill="#1d1d1d" />
            <ellipse cx={560} cy={tipY - 1010} rx={110} ry={90} fill={MAYA.glove ?? "#2C3B2E"} />
            <rect x={500} y={tipY - 1300} width={200} height={260} rx={70} fill={MAYA.jacket} />
            <path d={`M552,${tipY - 30} L568,${tipY - 30} L560,${tipY + 10} Z`} fill="#222" />
            <ellipse cx={560} cy={tipY - 50} rx={44} ry={10} fill="#333" />
          </g>
          <ellipse cx={560} cy={1362} rx={70 * plant} ry={10 * plant} fill="rgba(0,0,0,0.3)" />
        </Svg>
      </Plane>
      <Particles seed={107} n={14} col="#ffffff" fall={16} />
      <Grade sunX={820} sunY={520} warm="230,230,235" cool="40,60,90" vignette={0.55} />
      <Chip text="Pole first" t={t} t0={18.85} x={80} y={230} icon="check" big />
      <Chip text="Then the step" t={t} t0={19.6} x={80} y={360} />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF: whole trail glazed, she turns back (20.8 - 23.35) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 30 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.04], outExpo), rot: hh.rot };
  const g = 1420;
  const turned = t >= 22.4;
  const ph = (t - 22.4) * 3.4;
  const p: HikerProps = turned
    ? { x: 560 - (t - 22.4) * 70, y: g + 182 * 2.0 - 120, scale: 2.0, phase: ph, walk: 0.6, lean: 0.08, poles: true, slope: -0.08 }
    : { x: 560, y: g + 182 * 2.0 - 120, scale: 2.0, walk: 0, lean: 0.02, poles: true, slope: 0.08, breathe: Math.sin(t * 2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} tilt={-0.08} shade={[-400, 1480]} glaze={1} />
        <Subject rimX={turned ? -6 : 6}>
          <Person {...p} outfit={MAYA} expression="happy" flip={turned} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.28} col="255,214,150" />
      <Particles seed={108} n={24} col="#fff3d6" fall={14} />
      <Grade sunX={760} sunY={660} warm="255,190,120" />
      <Chip text="Whole trail glazed?" t={t} t0={21.0} x={80} y={240} icon="x" big />
      <Chip text="Turn back" t={t} t0={22.46} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
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
      save="Save this before your cold hike"
    />
  );
};

export const V72: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.65} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.6} to={4.55} fadeIn={0.05} fadeOut={0.08}>
      <S2 off={3.6} />
    </Scene>
    <Scene from={4.5} to={8.9} fadeIn={0.08} fadeOut={0.1}>
      <S3 off={4.5} />
    </Scene>
    <Scene from={8.85} to={13.05} fadeIn={0.1} fadeOut={0.08}>
      <S4 off={8.85} />
    </Scene>
    <Scene from={13.0} to={16.27} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={13.0} />
    </Scene>
    <Scene from={16.22} to={18.75} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={16.22} />
    </Scene>
    <Scene from={18.7} to={20.85} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={18.7} />
    </Scene>
    <Scene from={20.8} to={23.4} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={20.8} />
    </Scene>
    <Scene from={23.15} to={28.5} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.62, 1560],
        [3.62, 4.52, 1560],
        [4.52, 8.87, 1560],
        [8.87, 13.02, 1560],
        [13.02, 16.24, 1560],
        [16.24, 18.72, 1560],
        [18.72, 20.82, 1560],
        [20.82, 23.15, 1560],
      ]}
    />
  </AbsoluteFill>
);
