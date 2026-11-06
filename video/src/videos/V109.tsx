// V109: "The earliest sunset isn't on the shortest day." in the cinematic C01 style. Story for the Winter Ready Set (headlamp,
// neck gaiter, Winter Hiking Guide), posted Dec 4. Fact kept general: across much of the US the earliest sunsets come in early
// December, about two weeks before the winter solstice (Dec 21). No clock times invented for the chart; 4:30 is the story's moment.
// Set contents and $29.99 from the live Shopify listing. End card shows the set's headlamp (the listing's main photo).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { Room, WindowView } from "../home";
import { FrostTrail, Summit, WinterBackdrop, Blizzard } from "../winter";
import { Desk, PAPER, INK } from "../trip";
import vo from "../vo/v109.json";

const words = vo.words as unknown as Word[];

// Soft dark band behind the lower-third captions on bright snow.
const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.38) 45%, rgba(12,22,28,0.38) 70%, rgba(12,22,28,0) 100%)" }} />
);

const AFTERNOON: Sky = { top: "#4f6f93", mid: "#e2b892", low: "#ffe0b4", sun: [760, 880], sunR: 58, sunCol: "#fff3d6", glow: "#ffc98a" };
const DUSK: Sky = { top: "#2a3656", mid: "#8a6f86", low: "#e8a27a", sun: [820, 1180], sunR: 54, sunCol: "#ffd9a8", glow: "#f29a6a" };
const EVE: Sky = { top: "#1d2742", mid: "#3e4c6c", low: "#7d7f92", sun: [800, 1300], sunR: 30, sunCol: "#e8d6c0", glow: "#9a8aa0" };
const LAMP = "255,200,140";

const LEO: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#BB8262",
  hair: "#3a2a1e",
  beard: "#3a2a1e",
  cap: "#3E4F5C",
  capShade: "#2C3943",
  jacket: "#3F6B55",
  jacketShade: "#2D5141",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#B5553A",
  packShade: "#8E3F2A",
  glove: "#2a2a2a",
};
const LEO_IN: Outfit = { ...LEO, glove: null };

// Headlamp strapped over the cap. on = brightness 0..1
const HeadLamp: React.FC<{ p: HikerProps; on: number }> = ({ p, on }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${hx - 26},${hy - 12} Q${hx},${hy - 6} ${hx + 24},${hy - 14}`} stroke="#1d2024" strokeWidth={6} fill="none" />
      <rect x={hx + 14} y={hy - 23} width={20} height={14} rx={4} fill="#1d2024" />
      <rect x={hx + 16} y={hy - 20} width={14} height={4} rx={2} fill={on > 0.1 ? "#fff6a8" : "#c8c23a"} />
      {on > 0.05 && <circle cx={hx + 34} cy={hy - 16} r={10} fill="#fff6c8" opacity={0.7 * on} />}
    </g>
  );
};

// Neck gaiter pulled up over chin and mouth.
const Gaiter: React.FC<{ p: HikerProps; k: number; col?: string }> = ({ p, k, col = "#5f7f95" }) => {
  if (k <= 0) return null;
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      <path d={`M${hx - 24},${hy + 4} Q${hx + 6},${hy - 2} ${hx + 30},${hy + 4} L${hx + 26},${hy + 34} Q${hx},${hy + 40} ${hx - 22},${hy + 34} Z`} fill={col} />
      <path d={`M${hx - 20},${hy + 18} Q${hx + 4},${hy + 14} ${hx + 26},${hy + 18}`} stroke="#4a6578" strokeWidth={3} fill="none" />
    </g>
  );
};

const Beam: React.FC<{ from: [number, number]; to: [number, number]; w: number; k: number; id: string }> = ({ from, to, w, k, id }) => {
  if (k <= 0.01) return null;
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const L = Math.hypot(dx, dy);
  const nx = -dy / L;
  const ny = dx / L;
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen" }}>
      <Svg>
        <defs>
          <linearGradient id={`bm${id}`} gradientUnits="userSpaceOnUse" x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]}>
            <stop offset="0" stopColor="#fff4c8" stopOpacity={0.85 * k} />
            <stop offset="1" stopColor="#fff4c8" stopOpacity={0.05 * k} />
          </linearGradient>
          <filter id={`bf${id}`}>
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        <path d={`M${from[0]},${from[1]} L${to[0] + nx * w},${to[1] + ny * w} L${to[0] - nx * w},${to[1] - ny * w} Z`} fill={`url(#bm${id})`} filter={`url(#bf${id})`} />
        <ellipse cx={to[0]} cy={to[1]} rx={w * 1.1} ry={w * 0.35} fill="#fff1c0" opacity={0.35 * k} filter={`url(#bf${id})`} />
      </Svg>
    </AbsoluteFill>
  );
};

const headScreen = (p: HikerProps): [number, number] => {
  const [hx, hy] = hikerGeometry(p).head;
  const s = p.scale ?? 1;
  return [p.x + (hx + 34) * s, p.y + (hy - 16 - 182) * s];
};

const Night: React.FC<{ k: number }> = ({ k }) => (k <= 0 ? null : <AbsoluteFill style={{ background: `rgba(8,14,32,${0.6 * k})` }} />);

// Wall calendar, December, with the 21st ringed (cross = how far the ring is crossed out).
const WallCal: React.FC<{ x: number; y: number; w: number; ring: number; cross?: number }> = ({ x, y, w, ring, cross = 0 }) => {
  const cell = w / 7;
  const h = cell * 6.4;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={10} y={14} width={w} height={h} rx={12} fill="rgba(0,0,0,0.25)" />
      <rect x={0} y={0} width={w} height={h} rx={12} fill={PAPER} />
      <rect x={0} y={0} width={w} height={cell * 1.2} rx={12} fill="#3e5f4a" />
      <text x={w / 2} y={cell * 0.85} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={cell * 0.6} fill="#f7f2e8" letterSpacing={4}>
        DECEMBER
      </text>
      {Array.from({ length: 31 }, (_, i) => {
        const d = i + 1;
        const col = i % 7;
        const row = Math.floor(i / 7);
        const cx = col * cell + cell / 2;
        const cy = cell * 1.75 + row * cell;
        return (
          <g key={d}>
            <text x={cx} y={cy + cell * 0.15} textAnchor="middle" fontFamily="Inter" fontWeight={600} fontSize={cell * 0.36} fill={INK}>
              {d}
            </text>
            {d === 21 && ring > 0 && (
              <circle cx={cx} cy={cy} r={cell * 0.42} fill="none" stroke="#2a3a8a" strokeWidth={cell * 0.07} strokeDasharray={`${cell * 2.7}`} strokeDashoffset={cell * 2.7 * (1 - ring)} />
            )}
            {d === 21 && cross > 0 && (
              <path d={`M${cx - cell * 0.42},${cy - cell * 0.42} L${cx - cell * 0.42 + cell * 0.84 * cross},${cy - cell * 0.42 + cell * 0.84 * cross}`} stroke="#c0392b" strokeWidth={cell * 0.08} strokeLinecap="round" />
            )}
          </g>
        );
      })}
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Leo at home, December calendar with the 21st ringed (0 - 3.83) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.03, 1.09, t / 3.83), rot: hh.rot };
  const floorY = 1600;
  const p: HikerProps = { x: 330, y: floorY, scale: 2.4, walk: 0, lean: 0.04, poles: false, handOverride: [90, -40], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={140} y={560} w={300} h={420} sky={AFTERNOON} uid="a" snow />
        <Room floorY={floorY - 120} win={[140, 560, 300, 420]} wall="#cdb894" floor="#7a5a40" lamp={[900, 560]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <WallCal x={560} y={700} w={430} ring={at(t, [1.6, 2.6], [0, 1])} />
          <Person {...p} outfit={LEO_IN} expression="happy" noPack />
        </Subject>
      </Plane>
      <Particles seed={1091} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={600} warm={LAMP} vignette={0.5} />
      <Title text={"The earliest sunset\nisn't on the\nshortest day."} t={t} t0={0} top={120} size={108} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the ringed 21st gets crossed out: wrong date (3.83 - 5.04) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3, at(lt, [0.05, 0.25], [1, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.21), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#cdb894" }}>
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col="rgba(255,236,200,0.6)">
          <g transform="translate(-1620,-1420) scale(2.6)">
            <WallCal x={560} y={700} w={430} ring={1} cross={at(t, [3.9, 4.3], [0, 1])} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1092} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={700} sunY={500} warm={LAMP} vignette={0.55} />
      <Chip text="Shortest day: Dec 21" t={t} t0={3.85} x={60} y={200} icon="none" big />
      <Chip text="Wrong date" t={t} t0={4.17} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: low afternoon sun over a snowy ridge, Leo hiking (5.04 - 8.56) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 22, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.52), rot: hh.rot };
  const g = 1520;
  const ph = t * 3.2;
  const p: HikerProps = { x: 300 + lt * 50, y: g, scale: 2.2, phase: ph, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={AFTERNOON} uid="c" treeY={g - 140} t={t} snow={0.8} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.8} />
        <Subject rimX={6} col="rgba(255,200,140,0.9)">
          <Person {...p} outfit={LEO} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="both" />
      </Plane>
      <Rays x={AFTERNOON.sun[0]} y={AFTERNOON.sun[1]} strength={0.34} col="255,214,160" />
      <Particles seed={1093} n={18} col="#fff3d6" fall={10} />
      <LowScrim />
      <Grade sunX={760} sunY={880} warm="255,200,140" />
      <Readout label="EARLIEST SUNSETS, MUCH OF THE US" value="Early December" ok={null} t={t} t0={7.3} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: a simple sunset-time card: earliest sunset dot comes before the shortest day (8.56 - 11.96) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.07, lt / 3.4), rot: hh.rot };
  const draw = at(t, [8.6, 9.6], [0, 1]);
  const d1 = at(t, [9.3, 9.7], [0, 1], outExpo);
  const d2 = at(t, [10.6, 11.0], [0, 1], outExpo);
  // curve: sunset time across December (schematic), lowest point in early December
  const X0 = 90;
  const X1 = 770;
  const yAt = (u: number) => 560 - 260 * (1 - Math.pow((u - 0.25) / 0.75, 2)) * (u < 0.25 ? 1 - Math.pow((0.25 - u) / 0.25, 2) * 0.15 : 1);
  const pts = Array.from({ length: 41 }, (_, i) => i / 40)
    .filter((u) => u <= draw)
    .map((u) => `${X0 + (X1 - X0) * u},${820 - yAt(u)}`)
    .join(" ");
  const ex = X0 + (X1 - X0) * 0.25;
  const sx = X0 + (X1 - X0) * (20 / 30);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <g transform="translate(110,430) rotate(-2 430 450)">
            <rect x={14} y={20} width={860} height={900} rx={18} fill="rgba(0,0,0,0.25)" />
            <rect x={0} y={0} width={860} height={900} rx={18} fill={PAPER} />
            <rect x={0} y={0} width={860} height={40} rx={18} fill="#3e5f4a" />
            <text x={56} y={140} fontFamily={HEAD} fontWeight={800} fontSize={70} fill={INK} letterSpacing={2}>
              SUNSET TIME IN DECEMBER
            </text>
            <line x1={X0} y1={820} x2={X1} y2={820} stroke={INK} strokeWidth={4} />
            <text x={X0} y={870} fontFamily="Inter" fontWeight={600} fontSize={30} fill="#5b625c">Dec 1</text>
            <text x={X1} y={870} textAnchor="end" fontFamily="Inter" fontWeight={600} fontSize={30} fill="#5b625c">Dec 31</text>
            <text x={X0 - 10} y={250} textAnchor="end" fontFamily="Inter" fontWeight={600} fontSize={26} fill="#5b625c" transform={`rotate(-90 ${X0 - 30} 400)`}>later</text>
            <polyline points={pts} fill="none" stroke="#2a3a8a" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
            <g opacity={d1}>
              <circle cx={ex} cy={820 - yAt(0.25)} r={22} fill="#C2662E" />
              <text x={ex} y={820 - yAt(0.25) + 70} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill={INK}>EARLIEST</text>
              <text x={ex} y={820 - yAt(0.25) + 110} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill={INK}>SUNSET</text>
            </g>
            <g opacity={d2}>
              <line x1={sx} y1={300} x2={sx} y2={820} stroke="#5b625c" strokeWidth={4} strokeDasharray="12 10" />
              <text x={sx} y={280} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill={INK}>SHORTEST DAY</text>
            </g>
          </g>
        </Subject>
      </Plane>
      <Particles seed={1094} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="About 2 weeks before the solstice" t={t} t0={9.7} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: 4:30 on the ridge, the light goes (11.96 - 15.21) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.08, 1.0, lt / 3.25), rot: hh.rot };
  const g = 1500;
  const dark = at(t, [13.6, 14.8], [0, 1]);
  const p: HikerProps = { x: 620, y: g, scale: 2.0, walk: 0, lean: 0.08, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 3) * 1.4 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={dark > 0.5 ? EVE : DUSK} uid={dark > 0.5 ? "e2" : "e"} treeY={g + 40} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={-5} col="rgba(255,170,120,0.8)">
          <Person {...p} outfit={LEO} expression="tired" />
        </Subject>
      </Plane>
      <Night k={dark} />
      <Particles seed={1095} n={16} col="#e8eef6" fall={20} />
      <LowScrim />
      <Grade sunX={820} sunY={1180} warm="255,170,120" cool="30,40,80" vignette={0.6} />
      <Chip text="4:30 pm, still on the ridge" t={t} t0={12.2} x={60} y={200} icon="none" big />
      <Chip text="The light is gone" t={t} t0={14.2} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: wind, numb face (15.21 - 17.72) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.51), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 560, y: 1700 + 182 * s - 80, scale: s, walk: 0, lean: 0.1, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 3) * 1 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={EVE} uid="f" treeY={1250} t={t} blur={8} woods={false} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(170,190,255,0.8)">
          <Person {...p} outfit={LEO} expression="tired" />
        </Subject>
      </Plane>
      <Night k={0.6} />
      <Blizzard seed={1096} n={30} />
      <Grade sunX={800} sunY={1300} warm="200,210,255" cool="20,30,70" vignette={0.65} />
      <Chip text="Wind on the ridge" t={t} t0={15.35} x={60} y={200} icon="x" big />
      <Chip text="Face numb" t={t} t0={16.47} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: what he packs now: charged headlamp, neck gaiter, winter plan (17.72 - 22.0) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + mix(-30, 30, lt / 4.28), y: hh.y, zoom: mix(1.0, 1.06, lt / 4.28), rot: hh.rot };
  const a = at(t, [19.25, 19.75], [0, 1], outExpo);
  const b = at(t, [20.55, 21.05], [0, 1], outExpo);
  const charge = at(t, [19.4, 20.3], [0.2, 1]);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.85)">
          {/* open pack top */}
          <path d="M120,1500 Q120,1180 300,1150 L780,1150 Q960,1180 960,1500 L960,1700 L120,1700 Z" fill="#B5553A" />
          <path d="M180,1180 L900,1180 L880,1260 L200,1260 Z" fill="#8E3F2A" />
          <g opacity={a} transform={`translate(0,${(1 - a) * 160})`}>
            {/* headlamp: band + lamp body with a light strip + battery bar */}
            <ellipse cx={360} cy={900} rx={230} ry={90} fill="none" stroke="#1d2024" strokeWidth={28} />
            <rect x={250} y={920} width={220} height={90} rx={26} fill="#1d2024" />
            <rect x={270} y={940} width={180} height={18} rx={9} fill="#e6dc3a" />
            <rect x={270} y={968} width={180} height={18} rx={9} fill="#e6dc3a" />
            <rect x={240} y={1060} width={240} height={46} rx={12} fill="#f7f2e8" />
            <rect x={250} y={1070} width={220 * charge} height={26} rx={6} fill="#3e7d4f" />
          </g>
          <g opacity={b} transform={`translate(0,${(1 - b) * 160})`}>
            {/* neck gaiter: soft tube */}
            <path d="M600,800 Q700,770 800,800 L830,1080 Q720,1110 610,1080 Z" fill="#5f7f95" />
            <path d="M600,800 Q700,830 800,800" stroke="#4a6578" strokeWidth={8} fill="none" />
            <path d="M615,940 Q720,960 815,940" stroke="#4a6578" strokeWidth={5} fill="none" opacity={0.6} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1097} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.5} />
      <Chip text="He packs 3 things now" t={t} t0={17.8} x={60} y={200} icon="none" big />
      <Chip text="Charged headlamp" t={t} t0={19.25} x={60} y={330} icon="check" big />
      <Chip text="Neck gaiter for the wind" t={t} t0={20.55} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: dusk trail, headlamp on, gaiter up, Leo walks down calm (22.0 - 23.7) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 24, y: hh.y, zoom: at(lt, [0, 1.2], [1.14, 1.04], outExpo), rot: hh.rot };
  const g = 1540;
  const ph = t * 3.2;
  const p: HikerProps = { x: 420 + lt * 50, y: g, scale: 2.3, phase: ph, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  const hs = headScreen(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSK} uid="h" treeY={g - 140} t={t} snow={0.8} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.8} />
        <Subject rimX={6} col="rgba(255,190,140,0.9)">
          <Person {...p} outfit={LEO} expression="happy" />
          <Gaiter p={p} k={1} />
          <HeadLamp p={p} on={1} />
        </Subject>
      </Plane>
      <Night k={0.35} />
      <Beam from={[hs[0] - cam.x, hs[1]]} to={[hs[0] + 360 - cam.x, g + 60]} w={130} k={1} id="h" />
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.24} col="255,190,150" />
      <Particles seed={1098} n={18} col="#fff3d6" fall={10} />
      <Grade sunX={820} sunY={1180} warm="255,190,140" />
      <Chip text="And a winter plan" t={t} t0={22.27} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/motion-sensor-rechargeable-headlamp-cut.png"
      cutoutH={700}
      spec="HEADLAMP + NECK GAITER + WINTER GUIDE"
      name={
        <>
          Winter Ready
          <br />
          Set
        </>
      }
      nameSize={100}
      price="$29.99"
      save="Save this before your next afternoon hike"
    />
  );
};

export const V109: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.88} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.83} to={5.09} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.83} />
    </Scene>
    <Scene from={5.04} to={8.61} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.04} />
    </Scene>
    <Scene from={8.56} to={12.01} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.56} />
    </Scene>
    <Scene from={11.96} to={15.26} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.96} />
    </Scene>
    <Scene from={15.21} to={17.77} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={15.21} />
    </Scene>
    <Scene from={17.72} to={22.05} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={17.72} />
    </Scene>
    <Scene from={22.0} to={23.75} fadeIn={0.12} fadeOut={0.1}>
      <S8 off={22.0} />
    </Scene>
    <Scene from={23.55} to={28.5} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.83, 1560],
        [3.83, 5.04, 1560],
        [5.04, 8.56, 1560],
        [8.56, 11.96, 1560],
        [11.96, 15.21, 1560],
        [15.21, 17.72, 1560],
        [17.72, 22.0, 1560],
        [22.0, 23.55, 1560],
      ]}
    />
  </AbsoluteFill>
);
