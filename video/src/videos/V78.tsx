// V78: "Trailhead was dry. The top was snow." in the cinematic C01 style, November climb.
// Advice kept conservative: in November conditions can change as you climb; call the ranger station or check the trail report for
// the upper miles, not just the trailhead; pack warm layers; agree on a turnaround if you hit snow. No numbers beyond the story's
// 2,000 ft. End card = Hiking Safety Guide, 10 chapters, digital, $8.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, rim, Svg } from "../cine";
import { Blizzard, FrostTrail, SNOW, SNOW2, STORM, WGOLD, WinterBackdrop } from "../winter";
import { Backdrop as FallBackdrop, CLEAR } from "../fall";
import { Breath } from "../fall";
import vo from "../vo/v78.json";

const words = vo.words as unknown as Word[];

const JESS: Outfit = {
  ...GUIDE,
  skin: "#A8714F",
  skinShade: "#8C5A3C",
  hair: "#1f1612",
  ponytail: "#1f1612",
  beard: null,
  cap: "#E3B23C",
  capShade: "#C4952A",
  jacket: "#2F7F86",
  jacketShade: "#256870",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  boot: "#8a8f96",
  sole: "#2a2a2a",
  pack: "#B5553A",
  packShade: "#8E3F2A",
  glove: null,
};
const JESS_WARM: Outfit = { ...JESS, jacket: "#B83A55", jacketShade: "#8E2B42", boot: "#5a3e2a", glove: "#2C3B2E" };

const MESH = "#9aa3ab";
const MESH_D = "#6f7880";

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Mesh trail runner, side view, toe right (screen units, sole bottom at y). wet 0..1.
const Runner: React.FC<{ x: number; y: number; s?: number; wet?: number; t: number }> = ({ x, y, s = 1, wet = 0, t }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {/* ankle / sock */}
    <path d="M-150,-330 L-20,-330 L-10,-200 L-170,-200 Z" fill="#3f444b" />
    <path d="M-200,-60 Q-210,-220 -150,-230 L-20,-230 Q20,-180 120,-150 Q300,-110 330,-40 L330,-10 L-200,-10 Z" fill={MESH} stroke="rgba(0,0,0,0.3)" strokeWidth={5} />
    {Array.from({ length: 36 }, (_, i) => (
      <circle key={i} cx={-170 + ((i * 47) % 470)} cy={-190 + ((i * 29) % 160)} r={6} fill={MESH_D} opacity={0.6} />
    ))}
    <path d="M-40,-225 L110,-150" stroke="#e8e8e8" strokeWidth={10} strokeDasharray="22 18" strokeLinecap="round" />
    <rect x={-215} y={-20} width={560} height={50} rx={22} fill="#f0f0ea" />
    <rect x={-215} y={18} width={560} height={22} rx={10} fill="#2a2a2a" />
    {wet > 0 && (
      <g opacity={wet}>
        <path d="M-200,-60 Q-210,-140 -170,-150 Q0,-110 330,-60 L330,-10 L-200,-10 Z" fill="rgba(40,60,90,0.5)" />
        {[0, 1, 2, 3].map((i) => {
          const k = (t * 0.9 + i * 0.25) % 1;
          return <path key={i} d={`M${-120 + i * 110},${40 + k * 150} q-14,22 0,32 q14,-10 0,-32 Z`} fill="#8fc1e0" opacity={1 - k} />;
        })}
      </g>
    )}
  </g>
);

// Snow bank in front, covering everything below y (screen units).
const SnowFront: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-200,${y + 20} Q200,${y - 40} 540,${y} Q860,${y + 30} 1280,${y - 20} L1280,2200 L-200,2200 Z`} fill={SNOW} />
    <path d={`M-200,${y + 90} Q300,${y + 40} 700,${y + 80} Q1000,${y + 110} 1280,${y + 70}`} stroke={SNOW2} strokeWidth={30} fill="none" />
  </Svg>
);

// Big mountain cross-section with a trail line and snow above snowY (screen units).
const Mountain: React.FC<{ t: number; dot: number; snowY: number; hi?: number }> = ({ t, dot, snowY, hi = 0 }) => {
  const path = (k: number): [number, number] => [mix(140, 820, k), mix(1420, 560, k) + Math.sin(k * 14) * 30];
  const [dx, dy] = path(dot);
  return (
    <Svg>
      <defs>
        <clipPath id="mtn78">
          <path d="M-100,1500 L540,420 Q600,380 660,430 L1200,1500 Z" />
        </clipPath>
      </defs>
      <path d="M-100,1500 L540,420 Q600,380 660,430 L1200,1500 Z" fill="#6f7d64" />
      <g clipPath="url(#mtn78)">
        <rect x={-100} y={snowY} width={1400} height={1200} fill="#7e8a5c" />
        <path d={`M-100,${snowY} Q300,${snowY + 30} 600,${snowY - 10} Q900,${snowY - 30} 1300,${snowY + 10} L1300,0 L-100,0 Z`} fill={SNOW} />
        <rect x={-100} y={0} width={1400} height={snowY - 120} fill="#ffffff" opacity={hi} />
      </g>
      <polyline points={Array.from({ length: 30 }, (_, i) => path(i / 29).join(",")).join(" ")} fill="none" stroke="#5a4532" strokeWidth={10} strokeDasharray="20 16" />
      <circle cx={dx} cy={dy} r={26} fill="#E3B23C" stroke="#fff" strokeWidth={8} />
      <g transform={`translate(${path(0)[0]},${path(0)[1]})`}>
        <rect x={-6} y={-90} width={12} height={90} fill="#5a4532" />
        <rect x={-60} y={-130} width={120} height={50} rx={8} fill="#5a4532" />
      </g>
    </Svg>
  );
};

// ============ S1 HOOK CLOSE-UP: trail runner steps off bare dirt into deep snow (0 - 3.34) ============
const S1: React.FC = () => {
  const t = useT();
  const step = at(t, [0.0, 0.8], [0.45, 1], outExpo);
  const sink = at(t, [0.5, 1.4], [0, 1], outExpo);
  const shake = at(t, [0.6, 0.7, 1.1], [0, 0.6, 0]);
  const hh = handheld(t, 0.6, shake);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.12, t / 3.3), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={1100} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* ground: bare dirt on the left, a deep snow layer begins on the right */}
          <rect x={-200} y={1250} width={1500} height={1000} fill="#8a7560" />
          <rect x={-200} y={1250} width={1500} height={14} fill="#6f5d4a" />
          <rect x={-200} y={1420} width={1500} height={900} fill="#6b5a48" />
          {[[60, 1300], [260, 1340], [140, 1380]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx={30} ry={10} fill="#7b6448" />
          ))}
        </Svg>
        <Subject rimX={-5}>
          <Runner x={mix(80, 660, step)} y={1250 + sink * 85} s={0.95} t={t} wet={at(t, [1.5, 2.3], [0, 1])} />
        </Subject>
        <Svg>
          <path d="M440,1250 Q500,1180 680,1172 L1300,1165 L1300,1440 L440,1440 Z" fill={SNOW} />
          <path d="M470,1215 Q560,1178 700,1176 L1300,1170" stroke="#ffffff" strokeWidth={12} fill="none" />
          <path d="M440,1440 L1300,1440" stroke={SNOW2} strokeWidth={14} />
          {/* powder puff on impact */}
          {[0, 1, 2, 3, 4].map((i) => {
            const k = at(t, [0.6, 1.4], [0, 1]);
            return <circle key={i} cx={740 + (i - 2) * 70 * (1 + k)} cy={1170 - k * (60 + (i % 2) * 50)} r={20 + k * 20} fill="#ffffff" opacity={(1 - k) * 0.85} />;
          })}
        </Svg>
      </Plane>
      <Blizzard seed={81} n={20} />
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Title text={"Trailhead\nwas dry.\nThe top\nwas snow."} t={t} t0={0} top={120} size={118} />
      <Chip text="Trail runners" t={t} t0={1.7} x={80} y={1430} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: sunny start, 2,000 ft higher (3.34 - 5.40) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.06), rot: hh.rot };
  const dot = at(t, [3.5, 5.2], [0, 0.85]);
  return (
    <AbsoluteFill>
      <FallBackdrop cam={cam} sky={CLEAR} uid="b" treeY={1500} blur={8} t={t} />
      <Plane cam={cam} depth={1}>
        <Mountain t={t} dot={dot} snowY={820} />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.2} />
      <Particles seed={82} n={16} col="#fff3d6" fall={8} />
      <Grade sunX={790} sunY={560} warm="255,226,190" />
      <Chip text="Sunny trailhead" t={t} t0={3.4} x={80} y={1340} icon="check" />
      <Readout label="CLIMB" value="+2,000 ft" ok={null} t={t} t0={4.2} x={80} y={200} />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: buried in snow, shoes soaked (5.40 - 7.93) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6, 0.1);
  const cam: Cam = { x: lt * 20 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.5), rot: hh.rot };
  const g = 1420;
  const p: HikerProps = { x: 520 + lt * 20, y: g + 182 * 2.3 - 130, scale: 2.3, phase: t * 2.2, walk: 0.35, lean: 0.16, poles: false };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g + 20} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 60} snow={1} />
        <Subject rimX={5}>
          <Person {...p} outfit={JESS} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
        <SnowFront y={g + 330} />
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24443a" side="left" />
      </Plane>
      <Blizzard seed={83} />
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="20,40,70" />
      <Chip text="Path buried in snow" t={t} t0={5.6} x={80} y={240} icon="x" big />
      <Chip text="Shoes soaked" t={t} t0={6.9} x={80} y={370} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: soaked shoe; in November conditions change as you climb (7.93 - 11.19) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.26), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={1150} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <Runner x={500} y={1260} s={1.3} wet={1} t={t} />
        </Subject>
        <SnowFront y={1180} />
      </Plane>
      <Blizzard seed={84} n={18} />
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Chip text="November" t={t} t0={8.0} x={80} y={200} big />
      <Readout label="TRAILHEAD" value="Dry" ok={true} t={t} t0={8.9} x={80} y={330} />
      <Readout label="UPPER MILES" value="Snow" ok={false} t={t} t0={9.7} x={80} y={540} />
    </AbsoluteFill>
  );
};

// Phone in a hand with a trail report screen (screen units).
const Phone: React.FC<{ x: number; y: number; t: number; rows: number; hi?: number }> = ({ x, y, t, rows, hi = 0 }) => {
  const items: [string, string][] = [
    ["Trailhead", "Clear"],
    ["Upper miles", "Snow"],
    ["Ranger station", "Call"],
  ];
  return (
    <g transform={`translate(${x},${y})`}>
      {/* hand + sleeve */}
      <rect x={-360} y={330} width={300} height={500} rx={90} fill={JESS.jacket} transform="rotate(-20)" />
      <rect x={-250} y={-470} width={500} height={940} rx={60} fill="#1c1f22" />
      <rect x={-224} y={-430} width={448} height={860} rx={36} fill="#f4f2ec" />
      <rect x={-224} y={-430} width={448} height={130} rx={36} fill="#2F5D3E" />
      <text x={0} y={-345} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={58} fill="#fff">
        TRAIL REPORT
      </text>
      {items.map(([a, b], i) => {
        const o = at(t, [0, 0.3], [0, 1]) * (i < rows ? 1 : 0);
        const bad = b === "Snow";
        return (
          <g key={i} opacity={o} transform={`translate(0,${-200 + i * 200})`}>
            <rect x={-200} y={-70} width={400} height={160} rx={22} fill={bad && hi > 0 ? `rgba(217,68,58,${0.15 * hi})` : "#ffffff"} stroke={bad && hi > 0 ? "#D9443A" : "#d9d6cc"} strokeWidth={6} />
            <text x={-170} y={-10} fontFamily="Barlow Condensed" fontWeight={700} fontSize={44} fill="#4a4a46">
              {a}
            </text>
            <text x={-170} y={60} fontFamily="Barlow Condensed" fontWeight={800} fontSize={62} fill={bad ? "#D9443A" : "#2F5D3E"}>
              {b}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// ============ S5 FIX CLOSE-UP: call the ranger station or check the trail report (11.19 - 15.27) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 4.1), rot: hh.rot };
  const inK = at(t, [11.3, 12.0], [0, 1], outExpo);
  const rows = t > 14.2 ? 3 : t > 13.6 ? 2 : t > 13.0 ? 1 : 0;
  return (
    <AbsoluteFill>
      <FallBackdrop cam={cam} sky={CLEAR} uid="e" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <Phone x={600} y={mix(1900, 1080, inK)} t={lt} rows={rows} />
        </Subject>
      </Plane>
      <Particles seed={85} n={14} col="#fff3d6" fall={8} />
      <Grade sunX={790} sunY={560} warm="255,226,190" vignette={0.55} />
      <Title text={"Check\nthe top."} t={t} t0={off + 0.1} t1={12.8} top={170} size={150} />
      <Chip text="Call the ranger station" t={t} t0={12.9} x={80} y={200} icon="check" big />
      <Chip text="Or the trail report" t={t} t0={13.9} x={80} y={330} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S6 WIDE: the upper miles, not just the trailhead (15.27 - 17.81) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: mix(30, -30, lt / 2.5) + hh.y, zoom: mix(1.04, 1.1, lt / 2.5), rot: hh.rot };
  const hi = Math.sin(t * 5) * 0.25 + 0.35;
  return (
    <AbsoluteFill>
      <FallBackdrop cam={cam} sky={CLEAR} uid="f" treeY={1500} blur={8} t={t} />
      <Plane cam={cam} depth={1}>
        <Mountain t={t} dot={0} snowY={820} hi={at(t, [15.4, 15.8], [0, 1]) * hi} />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.2} />
      <Particles seed={86} n={16} col="#fff3d6" fall={8} />
      <Grade sunX={790} sunY={560} warm="255,226,190" />
      <Chip text="The upper miles" t={t} t0={15.4} x={80} y={200} icon="check" big />
      <Chip text="Not just the trailhead" t={t} t0={16.4} x={80} y={1340} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: pack warm layers, agree on a turnaround (17.81 - 21.56) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 3.75), rot: hh.rot };
  const k = (i: number) => at(t, [17.9 + i * 0.4, 18.5 + i * 0.4], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <FallBackdrop cam={cam} sky={CLEAR} uid="g" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M160,760 Q160,660 320,650 L760,650 Q920,660 920,810 L920,1420 Q920,1480 820,1480 L170,1480 Z" fill={JESS.pack} />
          <path d="M200,730 L880,730" stroke={JESS.packShade} strokeWidth={16} />
          <rect x={210} y={800} width={660} height={660} rx={30} fill="#3a1f18" />
          {/* puffy jacket */}
          <g transform={`translate(${mix(1300, 420, k(0))},${mix(300, 1060, k(0))}) rotate(${mix(-30, -8, k(0))})`}>
            <rect x={-170} y={-150} width={340} height={300} rx={60} fill="#2F5D8A" />
            {[0, 1, 2].map((r) => (
              <line key={r} x1={-160} y1={-70 + r * 80} x2={160} y2={-70 + r * 80} stroke="#244a6f" strokeWidth={10} />
            ))}
          </g>
          {/* beanie */}
          <g transform={`translate(${mix(-300, 700, k(1))},${mix(300, 1000, k(1))})`}>
            <path d="M-110,40 Q-110,-110 0,-110 Q110,-110 110,40 Z" fill="#C2662E" />
            <rect x={-120} y={20} width={240} height={50} rx={16} fill="#9B4E20" />
            <circle cx={0} cy={-120} r={30} fill="#f0e6d4" />
          </g>
          {/* gloves */}
          <g transform={`translate(${mix(1300, 690, k(2))},${mix(1600, 1260, k(2))}) rotate(20)`}>
            <rect x={-60} y={-90} width={120} height={180} rx={50} fill="#2C3B2E" />
            <rect x={60} y={-60} width={60} height={110} rx={30} fill="#2C3B2E" transform="rotate(25 60 -60)" />
          </g>
        </Svg>
      </Plane>
      <Particles seed={87} n={14} col="#fff3d6" fall={8} />
      <Grade sunX={790} sunY={560} warm="255,226,190" vignette={0.55} />
      <Chip text="Warm layers" t={t} t0={18.0} x={80} y={200} icon="check" big />
      <Readout label="TURNAROUND, AGREED" value="If we hit snow" ok={true} t={t} t0={19.6} x={80} y={330} />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF MEDIUM: next time she turns at the snow line, dry (21.56 - 24.63) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 30 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.16, 1.06], outExpo), rot: hh.rot };
  const g = 1420;
  const turn = t > 22.6;
  const p: HikerProps = {
    x: turn ? 640 - (t - 22.6) * 90 : 600 + lt * 40,
    y: g + 182 * 2.3 - 130,
    scale: 2.3,
    phase: t * 3.4,
    walk: turn ? 0.8 : 0.3,
    lean: 0.1,
    poles: false,
  };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="h" treeY={g + 20} t={t} snow={0.6} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 60} />
        <Svg>
          {/* snow line starts on the right */}
          <path d={`M740,${g + 30} Q820,${g - 30} 1000,${g - 80} L1700,${g - 230} L1700,2400 L660,2400 Q670,${g + 160} 740,${g + 30} Z`} fill={SNOW} />
          <path d={`M770,${g} Q840,${g - 36} 1010,${g - 78} L1700,${g - 226}`} stroke="#ffffff" strokeWidth={12} fill="none" />
          {[[900, 120], [1080, 60], [1000, 260]].map(([x, dy], i) => (
            <ellipse key={i} cx={x} cy={g + dy} rx={60} ry={14} fill={SNOW2} />
          ))}
        </Svg>
        <Subject rimX={6}>
          <Person {...p} outfit={JESS_WARM} expression="happy" flip={turn} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24443a" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={88} n={24} col="#ffe7b8" />
      <Grade sunX={760} sunY={640} warm="255,180,100" />
      <Chip text="Turns at the snow line" t={t} t0={21.8} x={80} y={240} icon="check" big />
      <Chip text="Dry feet" t={t} t0={23.0} x={80} y={370} icon="check" />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-safety-guide.jpg"
      photoH={800}
      spec="10 CHAPTERS · PRINT + PHONE PDF"
      name={
        <>
          Hiking
          <br />
          Safety Guide
        </>
      }
      nameSize={104}
      price="$8.99"
      save="Save this before your next climb"
    />
  );
};

export const V78: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.39} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.34} to={5.45} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.34} />
    </Scene>
    <Scene from={5.4} to={7.98} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.4} />
    </Scene>
    <Scene from={7.93} to={11.24} fadeIn={0.08} fadeOut={0.1}>
      <S4 off={7.93} />
    </Scene>
    <Scene from={11.19} to={15.32} fadeIn={0.1} fadeOut={0.08}>
      <S5 off={11.19} />
    </Scene>
    <Scene from={15.27} to={17.86} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={15.27} />
    </Scene>
    <Scene from={17.81} to={21.61} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={17.81} />
    </Scene>
    <Scene from={21.56} to={24.7} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={21.56} />
    </Scene>
    <Scene from={24.4} to={29} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.34, 1560],
        [3.34, 7.93, 1560],
        [7.93, 11.19, 1560],
        [11.19, 15.27, 1560],
        [15.27, 17.81, 1560],
        [17.81, 21.56, 1560],
        [21.56, 24.4, 1560],
      ]}
    />
  </AbsoluteFill>
);
