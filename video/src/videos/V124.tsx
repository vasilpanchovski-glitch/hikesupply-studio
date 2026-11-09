// V124: "Rainy Saturday. No hike. She made this." in the cinematic C01 style. Story for the Pocket Trail Log ($3.99, live
// Shopify, printable). Facts from the live listing and products/p17: one sheet of paper, three folds and one cut make a
// small booklet that fits a pocket, no glue; hike pages have weather boxes and prompts "Best view today", "What I heard"
// and "Sketch it". No invented numbers on screen.
// End card = real Shopify cover (products/pocket-trail-log.jpg, boxed photo card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Readout, Scene, Title, useT, freeHand } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, Subject, Trail } from "../fall";
import { Room, WindowView } from "../home";
import { Desk, INK, PAPER, Wildflowers } from "../trip";
import { PenTip } from "../peak";
import vo from "../vo/v124.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const RAINY: Sky = { top: "#4a5664", mid: "#7f8a94", low: "#b8bec2", sun: [800, 560], sunR: 20, sunCol: "#d8dcde", glow: "#c0c4c6" };
const CLEAR: Sky = { top: "#3a6a98", mid: "#9fc2dc", low: "#f4e2bc", sun: [790, 560], sunR: 52, sunCol: "#fff6dc", glow: "#ffd79a" };
const SPRING: Sky = { top: "#4a7aa8", mid: "#a9cfe4", low: "#f2ecd0", sun: [780, 520], sunR: 50, sunCol: "#fff8e0", glow: "#ffe2a8" };
const LAMP = "255,200,140";
const PEN = "#2a3a8a";

const MIA: Outfit = {
  ...GUIDE,
  skin: "#C99572",
  skinShade: "#AB7A58",
  hair: "#2a1a10",
  ponytail: "#2a1a10",
  beard: null,
  cap: "#2a1a10",
  capShade: "#1a100a",
  jacket: "#E3B23C",
  jacketShade: "#b88d26",
  pants: "#3f6e8c",
  pantsShade: "#2f5670",
  pack: "#B83A55",
  packShade: "#8E2B42",
  glove: null,
};
const DAD: Outfit = { ...JAKE, skin: "#C99572", skinShade: "#AB7A58", hair: "#2a1a10", beard: "#2a1a10", jacket: "#2C6E63", jacketShade: "#1f5249", glove: null };

// Rain streaks over a window area.
const Rain: React.FC<{ x: number; y: number; w: number; h: number; t: number }> = ({ x, y, w, h, t }) => (
  <Svg>
    <defs>
      <clipPath id={`rn${x}`}>
        <rect x={x} y={y} width={w} height={h} />
      </clipPath>
    </defs>
    <g clipPath={`url(#rn${x})`}>
      {Array.from({ length: 34 }, (_, i) => {
        const sx = x + ((i * 97) % w);
        const sy = y + ((((i * 211) % h) + t * 900) % (h + 120)) - 60;
        return <line key={i} x1={sx} y1={sy} x2={sx - 8} y2={sy + 60} stroke="rgba(220,232,240,0.6)" strokeWidth={3} />;
      })}
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={`d${i}`} cx={x + ((i * 131) % w)} cy={y + ((i * 173) % h)} r={7} fill="rgba(230,240,248,0.55)" />
      ))}
    </g>
  </Svg>
);

// Finished booklet: cover with a small mountain (local units, centred).
const Booklet: React.FC<{ w: number; open?: number; col?: string }> = ({ w, open = 0, col = "#2f5446" }) => {
  const h = w * 1.55;
  return (
    <g>
      <rect x={-w / 2 + 10} y={-h / 2 + 14} width={w} height={h} rx={6} fill="rgba(0,0,0,0.3)" />
      {open > 0 && (
        <g transform={`translate(${-w / 2},0) scale(${-open},1) translate(${w / 2},0)`}>
          <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={6} fill="#efe8da" />
        </g>
      )}
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={6} fill={col} />
      <path d={`M${-w * 0.36},${h * 0.05} L${-w * 0.1},${-h * 0.14} L${w * 0.05},${-h * 0.03} L${w * 0.2},${-h * 0.12} L${w * 0.38},${h * 0.05} Z`} fill="#8fb0a0" />
      <path d={`M${-w * 0.1},${-h * 0.14} L${-w * 0.03},${-h * 0.09} L${-w * 0.17},${-h * 0.09} Z`} fill="#f7f2e8" />
      <text x={0} y={h * 0.22} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={w * 0.16} fill={PAPER} letterSpacing={2}>
        TRAIL LOG
      </text>
      <rect x={-w * 0.3} y={h * 0.28} width={w * 0.6} height={w * 0.05} rx={3} fill="rgba(247,242,232,0.5)" />
    </g>
  );
};

// ============ S1 HOOK CLOSE-UP: Mia's hands hold her finished trail log, rain on the window (0 - 2.4) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, t / 2.4), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#1a120c" }}>
      <Plane cam={cam} depth={0.6} blur={9}>
        <WindowView x={160} y={200} w={760} h={900} sky={RAINY} uid="a" snow={false} />
        <Room floorY={1900} win={[160, 200, 760, 900]} wall="#6a5a4a" floor="#3a2c22" lamp={[960, 700]} />
        <Rain x={160} y={200} w={760} h={900} t={t} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(255,226,180,0.7)">
          <Svg>
            <rect x={300} y={1580} width={480} height={500} rx={140} fill={MIA.jacket} />
            <g transform="translate(540,1220) rotate(-5)">
              <Booklet w={360} />
            </g>
            <ellipse cx={380} cy={1430} rx={64} ry={40} fill={MIA.skin} transform="rotate(-30 380 1430)" />
            <ellipse cx={700} cy={1440} rx={64} ry={40} fill={MIA.skinShade} transform="rotate(30 700 1440)" />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1241} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={900} sunY={800} warm={LAMP} cool="40,50,70" vignette={0.6} />
      <Title text={"Rainy Saturday.\nNo hike.\nShe made this."} t={t} t0={0} top={110} size={120} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: Mia at the window, the hike rained out (2.4 - 3.69) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.29), rot: hh.rot };
  const floorY = 1700;
  const p: HikerProps = { x: 520, y: floorY + 40, scale: 2.3, walk: 0, lean: 0.12, poles: false, handOverride: [40, -40], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill style={{ background: "#1a120c" }}>
      <Plane cam={cam} depth={0.8} blur={2.5}>
        <WindowView x={300} y={340} w={480} h={560} sky={RAINY} uid="b" snow={false} />
        <Room floorY={floorY} win={[300, 340, 480, 560]} wall="#b8a58a" lamp={[120, 560]} />
        <Rain x={300} y={340} w={480} h={560} t={t} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,180,0.8)">
          <Person {...p} outfit={MIA} expression="tired" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={300} />
      </Plane>
      <Particles seed={1242} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={120} sunY={560} warm={LAMP} cool="40,50,70" />
      <Readout label="SATURDAY HIKE" value="Rained out" ok={false} t={t} t0={2.5} x={60} y={200} />
    </AbsoluteFill>
  );
};

// The flat printed sheet: 8 mini pages, landscape (local units, centred).
const Sheet: React.FC<{ w: number; folds?: number; cut?: number }> = ({ w, folds = 0, cut = 0 }) => {
  const h = w * 0.77;
  const pw = w / 4;
  const ph = h / 2;
  return (
    <g>
      <rect x={-w / 2 + 10} y={-h / 2 + 16} width={w} height={h} fill="rgba(0,0,0,0.28)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} fill={PAPER} />
      {Array.from({ length: 8 }, (_, i) => {
        const cx = -w / 2 + (i % 4) * pw;
        const cy = -h / 2 + Math.floor(i / 4) * ph;
        return (
          <g key={i}>
            <rect x={cx + pw * 0.12} y={cy + ph * 0.1} width={pw * 0.76} height={ph * 0.12} rx={4} fill={i === 0 ? "#3e5f4a" : "#d8d0c0"} />
            {[0, 1, 2, 3].map((j) => (
              <rect key={j} x={cx + pw * 0.12} y={cy + ph * (0.34 + j * 0.13)} width={pw * (j === 3 ? 0.4 : 0.76)} height={ph * 0.05} rx={3} fill="#e2dacb" />
            ))}
          </g>
        );
      })}
      {[-pw, 0, pw].map((x, i) => (
        <line key={i} x1={x} y1={-h / 2} x2={x} y2={h / 2} stroke="#3e7d4f" strokeWidth={6} strokeDasharray="18 12" opacity={folds > 0 ? 1 : 0.25} />
      ))}
      <line x1={-w / 2} y1={0} x2={w / 2} y2={0} stroke="#3e7d4f" strokeWidth={6} strokeDasharray="18 12" opacity={folds > 0 ? 1 : 0.25} />
      <line x1={-pw} y1={0} x2={mix(-pw, pw, cut)} y2={0} stroke="#B83A55" strokeWidth={12} strokeLinecap="round" />
    </g>
  );
};

// ============ S3 CLOSE-UP: Dad's printer pushes out one sheet (3.69 - 5.89) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 2.2), rot: hh.rot };
  const out = at(t, [3.8, 5.3], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,226,180,0.7)">
          <Svg>
            <g transform={`translate(540,${mix(860, 1180, out)})`}>
              <Sheet w={760} />
            </g>
            <rect x={110} y={420} width={860} height={420} rx={40} fill="#e9e6e0" />
            <rect x={110} y={760} width={860} height={80} rx={20} fill="#c9c4bc" />
            <rect x={180} y={780} width={720} height={26} rx={10} fill="#2a2e34" />
            <circle cx={880} cy={520} r={18} fill="#3e7d4f" />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1243} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.6} />
      <Chip text="One sheet of paper" t={t} t0={3.8} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: three folds, one cut (5.89 - 8.6) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const snip = at(t, [7.0, 7.1, 7.4], [0, 1, 0]);
  const hh = handheld(t, 0.3, snip * 2);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 2.71), rot: hh.rot };
  const folds = at(t, [6.0, 6.4], [0, 1]);
  const cut = at(t, [7.0, 7.5], [0, 1]);
  const pw = 760 / 4;
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,226,180,0.7)">
          <Svg>
            <g transform="translate(540,1000)">
              <Sheet w={760} folds={folds} cut={cut} />
              {t > 6.85 && (
                <g transform={`translate(${mix(-pw, pw, cut) + 30},0) rotate(${snip * 12})`} opacity={at(t, [6.85, 6.95, 8.0, 8.2], [0, 1, 1, 0])}>
                  <path d="M0,0 L120,-26 L124,-14 Z" fill="#c9d0d6" />
                  <path d="M0,0 L120,26 L124,14 Z" fill="#aab2b8" />
                  <circle cx={150} cy={-34} r={28} fill="none" stroke="#c23a32" strokeWidth={14} />
                  <circle cx={150} cy={34} r={28} fill="none" stroke="#c23a32" strokeWidth={14} />
                </g>
              )}
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1244} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.6} />
      <Chip text="Three folds" t={t} t0={6.0} x={60} y={200} icon="check" big />
      <Chip text="One cut" t={t} t0={7.0} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: her own pocket trail log, the pages flip (8.6 - 10.3) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.1, at(lt, [0, 1.2], [0, 1], outExpo)), rot: hh.rot };
  const pop = at(t, [8.6, 9.1], [0, 1], outExpo);
  const flip = t - 9.3 > 0 ? ((t - 9.3) * 1.6) % 1 : 0;
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,226,180,0.8)">
          <Svg>
            <g transform={`translate(560,960) scale(${mix(0.6, 1, pop)}) rotate(-4)`}>
              <Booklet w={460} open={flip} />
            </g>
            <ellipse cx={330} cy={1180} rx={56} ry={36} fill={MIA.skin} transform="rotate(-20 330 1180)" />
            <ellipse cx={330} cy={1230} rx={52} ry={32} fill={MIA.skinShade} transform="rotate(-20 330 1230)" />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1245} n={12} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.55} />
      <Readout label="MIA'S OWN" value="Pocket trail log" ok={true} t={t} t0={8.7} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: it slips into her jacket pocket (10.3 - 12.39) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.09), rot: hh.rot };
  const drop = at(t, [10.4, 11.4], [0, 1], outExpo);
  const J = MIA.jacket;
  const J2 = MIA.jacketShade;
  return (
    <AbsoluteFill style={{ background: J }}>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill={J} />
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M-200,${-100 + i * 260} Q540,${-60 + i * 260} 1280,${-100 + i * 260}`} stroke={J2} strokeWidth={10} fill="none" opacity={0.5} />
          ))}
          <rect x={980} y={-200} width={40} height={2400} fill="#6a6a6a" />
          <defs>
            <clipPath id="jp">
              <rect x={0} y={-200} width={1080} height={1200} />
            </clipPath>
          </defs>
          <g clipPath="url(#jp)">
            <g transform={`translate(540,${mix(600, 1030, drop)}) rotate(-3)`}>
              <Booklet w={300} />
            </g>
          </g>
          <path d="M260,1000 L820,1000 L820,1480 Q540,1540 260,1480 Z" fill={J} stroke={J2} strokeWidth={12} />
          <path d="M260,1000 L820,1000" stroke="#8a6a1c" strokeWidth={18} strokeLinecap="round" />
          <rect x={500} y={980} width={80} height={36} rx={10} fill="#3a3f46" />
        </Svg>
      </Plane>
      <LowScrim />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.55} />
      <Chip text="Fits a jacket pocket" t={t} t0={10.5} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 WIDE: Sunday, sun after the rain, Mia and Dad on the trail (12.39 - 14.58) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.19), rot: hh.rot };
  const g = 1560;
  const ph = t * 5;
  const dad: HikerProps = { x: 560 + lt * 50, y: g + 120, scale: 2.0, phase: ph, walk: 0.7, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  const mia: HikerProps = { x: 330 + lt * 50, y: g + 170, scale: 1.45, phase: ph + 1.6, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph + 1.6, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="g" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          {[
            [200, 120],
            [720, 200],
            [460, 300],
          ].map(([px, py], i) => (
            <ellipse key={i} cx={px} cy={g + py} rx={90} ry={18} fill="rgba(170,200,220,0.7)" />
          ))}
        </Svg>
        <Subject rimX={5} col="rgba(255,240,215,0.85)">
          <Person {...dad} outfit={DAD} expression="happy" />
          <Person {...mia} outfit={MIA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f4a2a" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.4} />
      <Particles seed={1247} n={16} col="#fff1d6" fall={6} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,226,170" />
      <Chip text="Sunday: up the trail" t={t} t0={12.5} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// Inside page: weather boxes and the three prompts from the product.
const WX = ["SUN", "CLOUD", "RAIN", "SNOW", "WIND"];
const HikePage: React.FC<{ t: number; w: number }> = ({ t, w }) => {
  const h = w * 1.5;
  const tick = at(t, [14.7, 15.0], [0, 1]);
  const view = at(t, [15.4, 15.9], [0, 1]);
  const heard = at(t, [16.0, 16.5], [0, 1]);
  const sketch = at(t, [16.6, 17.5], [0, 1]);
  return (
    <g>
      <rect x={12} y={16} width={w} height={h} rx={10} fill="rgba(0,0,0,0.3)" />
      <rect x={0} y={0} width={w} height={h} rx={10} fill={PAPER} />
      <text x={40} y={90} fontFamily={HEAD} fontWeight={800} fontSize={64} fill={INK} letterSpacing={2}>
        HIKE 1
      </text>
      <line x1={40} y1={120} x2={w - 40} y2={120} stroke={INK} strokeWidth={4} />
      {WX.map((n, i) => {
        const x = 40 + i * ((w - 80) / 5);
        const bw = (w - 80) / 5 - 14;
        return (
          <g key={n}>
            <rect x={x} y={160} width={bw} height={bw} rx={8} fill="none" stroke="#9aa09a" strokeWidth={4} />
            {i === 0 && tick > 0 && <path d={`M${x + 14},${160 + bw * 0.5} L${x + bw * 0.42},${160 + bw - 16} L${x + bw - 12},${172}`} stroke={PEN} strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray={200} strokeDashoffset={200 * (1 - tick)} />}
            <text x={x + bw / 2} y={160 + bw + 40} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={26} fill="#5b625c">
              {n}
            </text>
          </g>
        );
      })}
      <text x={40} y={390} fontFamily={HEAD} fontWeight={800} fontSize={38} fill="#5b625c" letterSpacing={1}>
        BEST VIEW TODAY
      </text>
      <line x1={40} y1={460} x2={w - 40} y2={460} stroke="#d8d0c0" strokeWidth={3} />
      <text x={40} y={445} fontFamily="Caveat, Inter" fontStyle="italic" fontWeight={600} fontSize={42} fill={PEN} opacity={view}>
        the lake from the top
      </text>
      <text x={40} y={540} fontFamily={HEAD} fontWeight={800} fontSize={38} fill="#5b625c" letterSpacing={1}>
        WHAT I HEARD
      </text>
      <line x1={40} y1={610} x2={w - 40} y2={610} stroke="#d8d0c0" strokeWidth={3} />
      <text x={40} y={595} fontFamily="Caveat, Inter" fontStyle="italic" fontWeight={600} fontSize={42} fill={PEN} opacity={heard}>
        a woodpecker!
      </text>
      <text x={40} y={690} fontFamily={HEAD} fontWeight={800} fontSize={38} fill="#5b625c" letterSpacing={1}>
        SKETCH IT
      </text>
      <rect x={40} y={715} width={w - 80} height={400} rx={12} fill="#fff" stroke="#CFC7B6" strokeWidth={3} />
      <path
        d={`M90,1060 L250,850 L340,950 L470,790 L640,1060`}
        stroke={PEN}
        strokeWidth={7}
        fill="none"
        strokeLinejoin="round"
        strokeDasharray={1200}
        strokeDashoffset={1200 * (1 - sketch)}
      />
      <circle cx={590} cy={820} r={34} fill="none" stroke={PEN} strokeWidth={6} opacity={at(t, [17.3, 17.6], [0, 1])} />
    </g>
  );
};

// ============ S8 CLOSE-UP: at the top she fills a page: weather, view, sounds, a sketch (14.58 - 18.1) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(-20, 20, lt / 3.52), zoom: mix(1.02, 1.08, lt / 3.52), rot: hh.rot };
  const px = t < 15.2 ? 320 : t < 15.95 ? mix(240, 560, at(t, [15.4, 15.9], [0, 1])) : t < 16.55 ? mix(240, 470, at(t, [16.0, 16.5], [0, 1])) : mix(280, 720, at(t, [16.6, 17.5], [0, 1]));
  const py = t < 15.2 ? 720 : t < 15.95 ? 940 : t < 16.55 ? 1080 : 1300;
  return (
    <AbsoluteFill style={{ background: "#3a4a3a" }}>
      <Plane cam={cam} depth={0.5} blur={10}>
        <SkyPlaneLite />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,236,200,0.8)">
          <Svg>
            <g transform="translate(200,500) rotate(-2) scale(0.9)">
              <HikePage t={t} w={760} />
            </g>
            <PenTip x={px} y={py} s={1.2} rot={-30} skin={MIA.skin} wig={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1248} n={12} col="#fff1d6" fall={4} />
      <Grade sunX={780} sunY={300} warm="255,226,170" vignette={0.55} />
      <Chip text="Weather, view, sounds, sketch" t={t} t0={14.65} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// Blurred summit backdrop for the page close-up.
const SkyPlaneLite: React.FC = () => (
  <Svg>
    <defs>
      <linearGradient id="spl" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3a6a98" />
        <stop offset="0.5" stopColor="#9fc2dc" />
        <stop offset="1" stopColor="#5f7a4a" />
      </linearGradient>
    </defs>
    <rect x={-400} y={-400} width={1880} height={2800} fill="url(#spl)" />
    <path d="M-400,1100 L200,700 L500,900 L800,600 L1480,1100 L1480,2400 L-400,2400 Z" fill="#4f6a52" />
  </Svg>
);

// ============ S9 PAYOFF MEDIUM: spring, two filled booklets, she asks for a third (18.1 - 22.4) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.04], outExpo), rot: hh.rot };
  const floorY = 1700;
  const p: HikerProps = { x: 330, y: floorY + 40, scale: 2.2, walk: 0, lean: 0.02, poles: false, handOverride: [80, -60], breathe: Math.sin(t * 2) * 1.2 };
  const third = at(t, [19.9, 20.8], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#1a120c" }}>
      <Plane cam={cam} depth={0.8} blur={2.5}>
        <WindowView x={520} y={300} w={460} h={520} sky={SPRING} uid="i" snow={false} />
        <Room floorY={floorY} win={[520, 300, 460, 520]} wall="#d6c4a6" lamp={[160, 520]} />
        <Svg>
          <Wildflowers y={820} n={12} seed={9} s={0.6} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={MIA} expression="happy" noPack />
          <Svg>
            <rect x={520} y={1320} width={620} height={30} rx={6} fill="#6e4c34" />
            <rect x={560} y={1350} width={30} height={380} fill="#5a3e2a" />
            <g transform="translate(640,1200) rotate(-8)">
              <Booklet w={120} col="#2f5446" />
            </g>
            <g transform="translate(790,1206) rotate(6)">
              <Booklet w={120} col="#B83A55" />
            </g>
            <g transform={`translate(950,${mix(1330, 1214, third)}) rotate(-2)`} opacity={third}>
              <rect x={-60} y={-90} width={120} height={180} fill={PAPER} stroke="#d8d0c0" strokeWidth={3} />
              <rect x={-44} y={-70} width={88} height={14} rx={4} fill="#3e5f4a" />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a6a3a" side="left" top={200} />
      </Plane>
      <Rays x={760} y={360} strength={0.3} />
      <Particles seed={1249} n={14} col="#fff1d6" fall={4} />
      <LowScrim />
      <Grade sunX={760} sunY={360} warm="255,230,180" />
      <Readout label="BY SPRING" value="Two booklets filled" ok={true} t={t} t0={18.2} x={60} y={200} />
      <Chip text="Print a third, please" t={t} t0={20.0} x={60} y={480} icon="none" big />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/pocket-trail-log.jpg"
      photoH={800}
      spec="PRINT AND FOLD · 8-PAGE BOOKLETS · LETTER + A4"
      name={
        <>
          Pocket
          <br />
          Trail Log
        </>
      }
      nameSize={100}
      price="$3.99"
      save="Save this for the next rainy day"
    />
  );
};

export const V124: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.45} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.4} to={3.74} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.4} />
    </Scene>
    <Scene from={3.69} to={5.94} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={3.69} />
    </Scene>
    <Scene from={5.89} to={8.65} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={5.89} />
    </Scene>
    <Scene from={8.6} to={10.35} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={8.6} />
    </Scene>
    <Scene from={10.3} to={12.44} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={10.3} />
    </Scene>
    <Scene from={12.39} to={14.63} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={12.39} />
    </Scene>
    <Scene from={14.58} to={18.15} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={14.58} />
    </Scene>
    <Scene from={18.1} to={22.45} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={18.1} />
    </Scene>
    <Scene from={21.9} to={27.0} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.4, 1560],
        [2.4, 3.69, 1560],
        [3.69, 5.89, 1640],
        [5.89, 8.6, 1640],
        [8.6, 10.3, 1640],
        [10.3, 12.39, 1640],
        [12.39, 14.58, 1560],
        [14.58, 18.1, 1700],
        [18.1, 21.9, 1560],
      ]}
    />
  </AbsoluteFill>
);
