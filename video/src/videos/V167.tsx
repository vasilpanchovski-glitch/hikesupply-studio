// V167: "Arms full of firewood. No hand for the light." Short format (16.1 s, 42 words), cinematic C01 style, snowy cabin at night.
// Product: LED Beanie — Knit Hat with USB Rechargeable 4-LED Light, Unisex, $22.99 (live Shopify). End card: real studio photo, cut out.
// Claims only from the listing: 4 LEDs in the front cuff, USB rechargeable. No brightness or battery numbers.
// Beanie overlay and close-up face built like V162 (FaceLuis without the beard, for Ava).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { FrostTrail, WinterBackdrop } from "../winter";
import vo from "../vo/v167.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#0e1729", mid: "#1f3352", low: "#3a5272", sun: [840, 360], sunR: 26, sunCol: "#eef2ff", glow: "#7f95b8" };
const HAT = "#7a2f3a";
const HAT2 = "#94404c";
const LED = "#fff6d8";
const WOOD = "#8a5a36";
const WOOD2 = "#6b4428";
const CUT = "#e2c08a";

const AVA: Outfit = {
  ...GUIDE,
  skin: "#F0C4A2",
  skinShade: "#D3A282",
  hair: "#2b1d16",
  ponytail: "#2b1d16",
  beard: null,
  cap: "none",
  capShade: "none",
  jacket: "#2f4f6a",
  jacketShade: "#233d53",
  pants: "#33363e",
  pantsShade: "#25272d",
  boot: "#5a3e2a",
  sole: "#1d1916",
  glove: "#3a3a3a",
};
const AVA_HOOD: Outfit = { ...AVA, cap: "#2f3b45", capShade: "#222c34" };

const toScreen = (p: HikerProps, q: readonly number[]): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);
const Dark: React.FC = () => <AbsoluteFill style={{ background: "rgba(6,12,30,0.38)" }} />;

const Beam: React.FC<{ x: number; y: number; gx: number; gy: number; w: number; k?: number; uid: string }> = ({ x, y, gx, gy, w, k = 1, uid }) =>
  k <= 0 ? null : (
    <g opacity={k}>
      <defs>
        <linearGradient id={`bm${uid}`} x1={x} y1={y} x2={gx} y2={gy} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff4cf" stopOpacity={0.55} />
          <stop offset="1" stopColor="#fff4cf" stopOpacity={0.12} />
        </linearGradient>
        <filter id={`bf${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={18} />
        </filter>
      </defs>
      <path d={`M${x},${y} L${gx - w},${gy} L${gx + w},${gy} Z`} fill={`url(#bm${uid})`} filter={`url(#bf${uid})`} />
      <ellipse cx={gx} cy={gy} rx={w * 1.1} ry={w * 0.22} fill="#fff1c4" opacity={0.35} filter={`url(#bf${uid})`} />
    </g>
  );

// Small log cabin with a warm window (screen coords, base centre).
const Cabin: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <defs>
      <radialGradient id="cabwin">
        <stop offset="0" stopColor="#ffd890" stopOpacity="0.8" />
        <stop offset="1" stopColor="#ffd890" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect x={-260} y={-300} width={520} height={300} fill="#4a3324" />
    {Array.from({ length: 7 }, (_, i) => (
      <line key={i} x1={-260} y1={-286 + i * 42} x2={260} y2={-286 + i * 42} stroke="#352418" strokeWidth={6} />
    ))}
    <path d="M-320,-290 L0,-500 L320,-290 Z" fill="#2c2420" />
    <path d="M-330,-284 L0,-512 L330,-284" stroke="#f3f6f8" strokeWidth={26} fill="none" strokeLinejoin="round" />
    <rect x={-170} y={-220} width={130} height={110} fill="#ffcf7a" />
    <line x1={-105} y1={-220} x2={-105} y2={-110} stroke="#4a3324" strokeWidth={8} />
    <circle cx={-105} cy={-165} r={220} fill="url(#cabwin)" />
    <rect x={60} y={-200} width={110} height={200} fill="#2a1d14" />
    <rect x={150} y={-560} width={50} height={140} fill="#3a2e28" />
  </g>
);

// An armful of logs (hiker coords, centred on the hands).
const Armload: React.FC<{ p: HikerProps; rot?: number }> = ({ p, rot = 0 }) => {
  const g = hikerGeometry(p);
  const [hx, hy] = g.arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${hx - 4},${hy - 16}) rotate(${rot})`}>
        {[[-6, 6], [8, 0], [-2, -10], [12, -14]].map(([dx, dy], i) => (
          <g key={i} transform={`translate(${dx},${dy}) rotate(${-8 + i * 5})`}>
            <rect x={-34} y={-6} width={68} height={13} rx={6} fill={i % 2 ? WOOD2 : WOOD} />
            <ellipse cx={34} cy={0.5} rx={4} ry={6.5} fill={CUT} />
          </g>
        ))}
      </g>
    </g>
  );
};

// Flashlight tucked under the chin, pointing down and forward (hiker coords). wob swings the beam.
const ChinTorch: React.FC<{ p: HikerProps; wob: number }> = ({ p, wob }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${hx + 2},${hy + 36}) rotate(${48 + wob})`}>
        <rect x={-4} y={-5} width={24} height={10} rx={3} fill="#22262b" />
        <rect x={18} y={-7} width={6} height={14} rx={2} fill="#9aa1a8" />
        <circle cx={24} cy={0} r={6} fill={LED} opacity={0.8} />
      </g>
    </g>
  );
};

// LED beanie on a Person (hiker coords).
const LedBeanie: React.FC<{ p: HikerProps; on: number; t: number }> = ({ p, on, t }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 41} ${hx},${hy - 43} Q${hx + 28},${hy - 41} ${hx + 26},${hy - 7} Z`} fill={HAT} />
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 41} ${hx},${hy - 43} Q${hx - 14},${hy - 30} ${hx - 15},${hy - 5} Z`} fill={HAT2} />
      <rect x={hx - 29} y={hy - 14} width={57} height={12} rx={4} fill={HAT2} />
      <rect x={hx + 13} y={hy - 15} width={14} height={13} rx={3} fill="#d9dde2" />
      {on > 0 && <circle cx={hx + 22} cy={hy - 9} r={10 + Math.sin(t * 9) * 0.6} fill={LED} opacity={0.6 * on} />}
    </g>
  );
};

// Big close-up face (screen coords), three-quarter view to the right, wearing the LED beanie.
const FaceAva: React.FC<{ cx: number; cy: number; s: number; on: number; eyes?: "neutral" | "happy"; t: number }> = ({ cx, cy, s, on, eyes = "neutral", t }) => {
  const o = AVA;
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      <defs>
        <filter id="faBlur" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation={12} />
        </filter>
      </defs>
      {/* hair falling behind, jacket + collar */}
      <path d="M-110,-40 Q-150,120 -120,200 L-40,200 Q-70,100 -60,-20 Z" fill={o.hair} />
      <path d="M-170,190 Q-120,150 -40,150 L60,150 Q150,150 190,200 L190,280 L-170,280 Z" fill={o.jacket} />
      <path d="M-50,150 L70,150 L60,196 L-40,196 Z" fill={o.jacketShade} />
      <path d="M-36,60 L56,60 L58,150 L-38,150 Z" fill={o.skinShade} />
      {/* face */}
      <ellipse cx={20} cy={4} rx={82} ry={92} fill={o.skin} />
      <ellipse cx={-30} cy={14} rx={16} ry={22} fill={o.skinShade} opacity={0.6} />
      <ellipse cx={-62} cy={12} rx={20} ry={30} fill={o.skin} />
      <path d="M-66,-6 q-10,18 0,36" stroke={o.skinShade} strokeWidth={5} fill="none" strokeLinecap="round" />
      <ellipse cx={74} cy={36} rx={16} ry={10} fill="#e89a8a" opacity={0.45} />
      {[0, 46].map((dx, i) => (
        <g key={i}>
          {eyes === "happy" ? (
            <path d={`M${4 + dx},-10 q7,-8 14,0`} stroke="#2a1f1a" strokeWidth={5} fill="none" strokeLinecap="round" />
          ) : (
            <ellipse cx={11 + dx} cy={-12} rx={6.5} ry={8} fill="#2a1f1a" />
          )}
          <path d={`M${dx},-32 q11,-5 22,0`} stroke={o.hair} strokeWidth={4} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <path d="M44,0 q12,18 0,26" stroke={o.skinShade} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={eyes === "happy" ? "M22,50 q14,12 30,0" : "M24,52 q14,2 26,0"} stroke="#a2443a" strokeWidth={5} fill="none" strokeLinecap="round" />
      <ellipse cx={30} cy={-10} rx={70} ry={50} fill="#ffe9b0" opacity={0.18 * on} filter="url(#faBlur)" />
      {/* the beanie: knit body, folded cuff, LED module front-right */}
      <path d="M-100,-26 Q-112,-158 12,-160 Q132,-158 120,-30 Z" fill={HAT} />
      <path d="M-100,-26 Q-112,-158 12,-160 Q-40,-126 -46,-28 Z" fill={HAT2} />
      {[-40, -10, 20, 50].map((x) => (
        <path key={x} d={`M${x},-130 Q${x - 4},-100 ${x},-64`} stroke="#5e2430" strokeWidth={4} fill="none" opacity={0.8} />
      ))}
      <rect x={-110} y={-66} width={240} height={48} rx={18} fill={HAT2} />
      {[-90, -66, -42, -18, 6, 30].map((x) => (
        <path key={x} d={`M${x},-62 v40`} stroke={HAT} strokeWidth={5} opacity={0.7} />
      ))}
      <g transform="translate(84,-42)">
        <rect x={-34} y={-24} width={68} height={48} rx={12} fill="#d9dde2" stroke="#9aa1a8" strokeWidth={3} />
        <circle cx={0} cy={0} r={7} fill="#2a2c30" />
        {[[-18, -12], [18, -12], [-18, 12], [18, 12]].map(([x, y], i) => (
          <rect key={i} x={x - 7} y={y - 5} width={14} height={10} rx={2} fill={on > 0.3 ? LED : "#8a9096"} />
        ))}
        {on > 0 && <circle cx={0} cy={0} r={70 + Math.sin(t * 8) * 3} fill={LED} opacity={0.55 * on} filter="url(#faBlur)" />}
      </g>
      {on > 0 && <path d="M110,-50 L520,-260 L560,240 Z" fill="#fff4cf" opacity={0.16 * on} filter="url(#faBlur)" />}
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Ava walks from the woodpile, arms full, torch under her chin (0 - 3.42) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.04, 1.1, t / 3.42), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.0;
  const p: HikerProps = { x: 320 + t * 40, y: g + 30, scale: 2.3, phase: ph, walk: 0.5, lean: 0.02, poles: false, handOverride: [46, -46], breathe: 0 };
  const wob = Math.sin(t * 4.2) * 14;
  const head = toScreen(p, hikerGeometry(p).head);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="a" treeY={g - 220} t={t} snow={0.6} />
      <Dark />
      <Plane cam={cam} depth={0.85} blur={2}>
        <Svg>
          <Cabin x={880} y={g - 30} s={0.9} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <Beam x={head[0] + 50} y={head[1] + 60} gx={head[0] + 220 + wob * 12} gy={g + 80} w={110} k={0.85} uid="a" />
        </Svg>
        <Subject rimX={5} col="rgba(255,226,170,0.75)">
          <Person {...p} outfit={AVA_HOOD} expression="neutral" noPack />
          <Armload p={p} />
          <ChinTorch p={p} wob={wob} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0f1a22" side="left" />
      </Plane>
      <Particles seed={1671} n={18} col="#e8eeff" fall={10} />
      <LowScrim />
      <Grade sunX={760} sunY={1200} warm="255,214,150" cool="20,30,70" vignette={0.6} />
      <Title text={"Arms full\nof firewood.\nNo hand for\nthe light."} t={t} t0={0} top={100} size={112} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: logs and torch fall into the snow (3.42 - 5.23) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hit = 0.55;
  const hh = handheld(t, 0.35, at(lt, [hit, hit + 0.3], [1.4, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.03], outExpo), rot: hh.rot };
  const fall = at(lt, [0, hit], [0, 1]);
  const ease = fall * fall;
  const logs = [
    [260, -40, 1],
    [480, 10, -1],
    [700, -20, 1],
    [380, 60, -1],
  ];
  const tx = mix(560, 620, ease);
  const ty = mix(600, 1330, ease);
  const trot = mix(30, 170, ease);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="b" treeY={1100} blur={12} t={t} snow={0.6} />
      <Dark />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={1280} width={1480} height={900} fill="#c9d3dc" />
          <path d="M-200,1280 Q540,1240 1280,1290" stroke="#aebccb" strokeWidth={30} fill="none" />
        </Svg>
        <Subject rimX={5} col="rgba(255,226,170,0.7)">
          <Svg>
            {logs.map(([x, dy, dir], i) => {
              const y = mix(560 + dy, 1300 + dy * 0.6, Math.min(1, ease * (1 + i * 0.06)));
              const r = mix(-6 + i * 4, (dir as number) * (30 + i * 12), ease);
              return (
                <g key={i} transform={`translate(${x},${y}) rotate(${r})`}>
                  <rect x={-170} y={-32} width={340} height={64} rx={30} fill={i % 2 ? WOOD2 : WOOD} />
                  <path d="M-150,-12 h220 M-120,10 h200" stroke="#5a3a22" strokeWidth={5} opacity={0.6} />
                  <ellipse cx={170} cy={0} rx={18} ry={32} fill={CUT} />
                </g>
              );
            })}
            <g transform={`translate(${tx},${ty}) rotate(${trot})`}>
              <rect x={-20} y={-25} width={120} height={50} rx={12} fill="#22262b" />
              <rect x={96} y={-34} width={28} height={68} rx={8} fill="#9aa1a8" />
              <ellipse cx={128} cy={0} rx={8} ry={26} fill={LED} />
            </g>
            {/* snow puffs on impact */}
            {lt > hit &&
              [0, 1, 2, 3, 4].map((i) => {
                const k = at(lt, [hit, hit + 0.6], [0, 1]);
                return <circle key={i} cx={260 + i * 130} cy={1300 - k * (40 + (i % 2) * 30)} r={20 + k * 30} fill="#ffffff" opacity={0.7 * (1 - k)} />;
              })}
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1672} n={14} col="#e8eeff" fall={10} />
      <Grade sunX={600} sunY={1300} warm="255,214,150" cool="20,30,70" vignette={0.6} />
      <Chip text="Dropped both in the snow" t={t} t0={4.1} x={60} y={170} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the fix, the light on her head switches on (5.23 - 7.5) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.27), rot: hh.rot };
  const on = at(t, [5.85, 6.2], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="c" treeY={1250} blur={12} t={t} snow={0.6} />
      <Dark />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,236,190,0.7)">
          <Svg>
            <FaceAva cx={470} cy={1000} s={3.2} on={on} eyes={on > 0.5 ? "happy" : "neutral"} t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1673} n={12} col="#fff3d6" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={700} warm="255,226,180" cool="20,30,70" vignette={0.55} />
      <Chip text="The fix" t={t} t0={5.35} x={60} y={170} icon="none" big />
      <Chip text="Wear the light" t={t} t0={6.0} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: both arms for the logs, the path to the cabin lit from her hat (7.5 - 11.56) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.0, 1.06, lt / 4.06), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.0;
  const p: HikerProps = { x: 280 + lt * 50, y: g + 30, scale: 2.3, phase: ph, walk: 0.55, lean: 0.02, poles: false, handOverride: [46, -46], breathe: 0 };
  const head = toScreen(p, hikerGeometry(p).head);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="d" treeY={g - 220} t={t} snow={0.6} />
      <Dark />
      <Plane cam={cam} depth={0.85} blur={2}>
        <Svg>
          <Cabin x={900} y={g - 30} s={0.9} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <Beam x={head[0] + 50} y={head[1] - 20} gx={head[0] + 480} gy={g + 70} w={200} uid="d" />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,190,0.8)">
          <Person {...p} outfit={AVA} expression="happy" noPack />
          <LedBeanie p={p} on={1} t={t} />
          <Armload p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0f1a22" side="right" />
      </Plane>
      <Particles seed={1674} n={18} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={1200} warm="255,226,180" cool="20,30,70" vignette={0.55} />
      <Chip text="4 LEDs in the cuff" t={t} t0={8.5} x={60} y={170} icon="check" big />
      <Chip text="Charges by USB" t={t} t0={10.2} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/led-beanie-rechargeable-headlamp-hat-cut.png"
      cutoutH={760}
      spec="4 LEDS · USB RECHARGEABLE · UNISEX"
      name={<>LED Beanie</>}
      nameSize={112}
      price="$22.99"
      save="Save this before your next cabin night"
    />
  );
};

export const V167: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.5} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.42} to={5.31} fadeIn={0.04} fadeOut={0.08}>
      <S2 off={3.42} />
    </Scene>
    <Scene from={5.23} to={7.58} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.23} />
    </Scene>
    <Scene from={7.5} to={11.66} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={7.5} />
    </Scene>
    <Scene from={11.56} to={16.1} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.42, 1600],
        [3.42, 5.23, 1600],
        [5.23, 7.5, 1600],
        [7.5, 11.56, 1600],
      ]}
    />
  </AbsoluteFill>
);
