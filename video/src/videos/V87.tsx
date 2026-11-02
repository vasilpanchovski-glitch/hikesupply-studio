// V87: "Her bag was warm. The ground wasn't." in the cinematic C01 style, first backpacking night in November.
// Advice (standard, no numbers): cold comes up from the ground and the bag you lie on is squashed flat, so it can't hold heat.
// The pad matters as much as the bag: a pad made for cold ground, a bag rated colder than the forecast low, dry layers and a hat.
// No temperature numbers, we don't sell bags or pads. End card = First Backpacking Trip — Beginner's Guide & Planner (Printable),
// 32 pages, $8.99 (live Shopify), store cover photo in the boxed card.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { DAWN, FrostTrail, WinterBackdrop } from "../winter";
import { Subject } from "../fall";
import vo from "../vo/v87.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#0e1a2e", mid: "#22344e", low: "#3c4f68", sun: [820, 360], sunR: 30, sunCol: "#eef2f8", glow: "#9fb2cc" };

const LENA: Outfit = {
  ...GUIDE,
  skin: "#E8B996",
  skinShade: "#CC9A78",
  hair: "#2a1d14",
  ponytail: "#2a1d14",
  beard: null,
  cap: "#B83A55",
  capShade: "#8E2B42",
  jacket: "#4F7FA6",
  jacketShade: "#3c6385",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  pack: "#C2662E",
  packShade: "#9B4E20",
  glove: null,
};
const BAG = { c: "#C2662E", s: "#9B4E20", in: "#7a3a18" };
const THIN = "#d9c34a";
const THICK = { c: "#2F7F86", s: "#256870" };
const TENT = { wall: "#2b3d58", wall2: "#22324a", floor: "#1c2433" };

// Breath cloud near a head position (screen units).
const Puff: React.FC<{ x: number; y: number; t: number; dir?: number; s?: number }> = ({ x, y, t, dir = 1, s = 1 }) => (
  <g>
    {[0, 0.5].map((o) => {
      const q = (t * 0.7 + o) % 1;
      return <circle key={o} cx={x + dir * (20 + q * 80) * s} cy={y - q * 30 * s} r={(8 + q * 26) * s} fill="#eef3f8" opacity={0.45 * (1 - q)} />;
    })}
  </g>
);

const Frost: React.FC<{ n: number; y0: number; y1: number; seed: number; op?: number }> = ({ n, y0, y1, seed, op = 0.8 }) => (
  <g opacity={op}>
    {Array.from({ length: n }, (_, i) => {
      const x = (i * 157 + seed * 31) % 1180 - 50;
      const y = y0 + ((i * 97 + seed * 13) % Math.max(1, y1 - y0));
      const r = 6 + (i % 4) * 4;
      return (
        <g key={i} transform={`translate(${x},${y}) rotate(${i * 23})`} stroke="#e8f3ff" strokeWidth={2.4}>
          <line x1={-r} y1={0} x2={r} y2={0} />
          <line x1={-r * 0.5} y1={-r * 0.87} x2={r * 0.5} y2={r * 0.87} />
          <line x1={-r * 0.5} y1={r * 0.87} x2={r * 0.5} y2={-r * 0.87} />
        </g>
      );
    })}
  </g>
);

// Tent interior at night (screen units), floor at y.
const TentInside: React.FC<{ y: number; frost?: number; glow?: string }> = ({ y, frost = 1, glow = "#9fb2cc" }) => (
  <Svg>
    <rect x={-200} y={-200} width={1500} height={2400} fill={TENT.wall} />
    <path d={`M-200,${y} L540,-200 L1300,${y} Z`} fill={TENT.wall2} />
    <path d={`M540,-200 L540,${y}`} stroke="#1a2638" strokeWidth={10} />
    <path d={`M-200,${y - 600} Q540,${y - 760} 1300,${y - 600}`} stroke="#1a2638" strokeWidth={8} fill="none" />
    <circle cx={800} cy={300} r={500} fill={glow} opacity={0.08} />
    <Frost n={46} y0={-100} y1={y - 300} seed={3} op={frost} />
    <rect x={-200} y={y} width={1500} height={1200} fill={TENT.floor} />
  </Svg>
);

// Lena lying in her bag, head to the left. thick 0..1 swaps the thin pad for a thick one; hat shows a beanie.
const InBag: React.FC<{ x: number; y: number; s: number; t: number; shiver?: number; thick?: number; hat?: boolean; expr?: "tired" | "neutral" | "happy" }> = ({ x, y, s, t, shiver = 0, thick = 0, hat = false, expr = "tired" }) => {
  const j = Math.sin(t * 44) * 3 * shiver;
  const lift = thick * 34 * (s / 3);
  const p: HikerProps = { x: 0, y: 0, scale: s, walk: 0, lean: 0, poles: false, breathe: 0, handOverride: [8, -8] };
  return (
    <g transform={`translate(${x + j},${y - lift})`}>
      {/* pads under */}
      <rect x={-560 * (s / 3)} y={60 * (s / 3) + lift} width={1300 * (s / 3)} height={14 * (s / 3)} rx={6} fill={THIN} opacity={1 - thick} />
      <g opacity={thick}>
        <rect x={-560 * (s / 3)} y={40 * (s / 3)} width={1300 * (s / 3)} height={50 * (s / 3) + lift} rx={18} fill={THICK.c} />
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1={-500 * (s / 3) + i * 125 * (s / 3)} y1={44 * (s / 3)} x2={-500 * (s / 3) + i * 125 * (s / 3)} y2={84 * (s / 3) + lift} stroke={THICK.s} strokeWidth={6} />
        ))}
      </g>
      {/* the person, rotated to lie with the head on the left */}
      <g transform={`translate(${700 * (s / 3)},${-72 * (s / 3)}) rotate(-90)`}>
        <Person {...p} outfit={hat ? { ...LENA, cap: "#2F5D3E", capShade: "#244a31" } : LENA} expression={expr} noPack />
      </g>
      {/* mummy bag over the body */}
      <path
        d={`M${-330 * (s / 3)},${-70 * (s / 3)} Q${-200 * (s / 3)},${-180 * (s / 3)} ${200 * (s / 3)},${-165 * (s / 3)} Q${640 * (s / 3)},${-140 * (s / 3)} ${700 * (s / 3)},${-10 * (s / 3)} Q${720 * (s / 3)},${50 * (s / 3)} ${600 * (s / 3)},${60 * (s / 3)} L${-330 * (s / 3)},${60 * (s / 3)} Q${-380 * (s / 3)},${0} ${-330 * (s / 3)},${-70 * (s / 3)} Z`}
        fill={BAG.c}
      />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M${(-200 + i * 140) * (s / 3)},${-165 * (s / 3)} Q${(-220 + i * 140) * (s / 3)},${-30 * (s / 3)} ${(-200 + i * 140) * (s / 3)},${58 * (s / 3)}`} stroke={BAG.s} strokeWidth={7} fill="none" />
      ))}
      {/* hood around the face */}
      <path d={`M${-330 * (s / 3)},${-70 * (s / 3)} Q${-420 * (s / 3)},${-10 * (s / 3)} ${-330 * (s / 3)},${60 * (s / 3)}`} stroke={BAG.s} strokeWidth={22 * (s / 3)} fill="none" strokeLinecap="round" />
    </g>
  );
};

// ============ S1 HOOK CLOSE: Lena curled in her bag on a thin pad, frost on the tent wall (0 - 3.5) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.12, t / 3.5), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <TentInside y={1290} />
        <Subject rimX={5} col="rgba(200,220,255,0.6)">
          <InBag x={700} y={1200} s={3} t={t} shiver={0.6} />
        </Subject>
        <Svg>
          <Puff x={380} y={990} t={t} dir={1} s={1.4} />
        </Svg>
      </Plane>
      <Particles seed={871} n={14} col="#e6f0fb" fall={10} />
      <Grade sunX={800} sunY={300} warm="210,220,240" cool="10,20,50" vignette={0.65} />
      <Title text={"Her bag was warm.\nThe ground wasn't."} t={t} t0={0} top={130} size={118} />
      <Chip text="Thin summer pad" t={t} t0={2.0} x={80} y={420} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: the tent alone in a frosty camp at 2 a.m. (3.5 - 5.7) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 20, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.2), rot: hh.rot };
  const g = 1360;
  return (
    <AbsoluteFill style={{ background: NIGHT.top }}>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="b" treeY={g - 60} t={t} snow={0.4} />
      <Plane cam={cam} depth={0.05}>
        <Svg>
          {Array.from({ length: 50 }, (_, i) => (
            <circle key={i} cx={(i * 211) % 1100} cy={(i * 137) % 700} r={1.5 + (i % 3)} fill="#ffffff" opacity={0.4 + 0.4 * Math.sin(t * 2 + i)} />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 40} snow={0.5} />
        <Subject rimX={3} col="rgba(200,220,255,0.5)">
          <g transform={`translate(560,${g + 20})`}>
            <ellipse cx={0} cy={10} rx={300} ry={20} fill="rgba(0,0,0,0.35)" />
            <path d="M-280,0 L0,-300 L280,0 Z" fill="#C2662E" />
            <path d="M0,-300 L280,0 L120,0 Z" fill="#9B4E20" />
            <path d="M-60,0 L0,-200 L60,0 Z" fill="#3a1e10" />
            <path d="M-280,0 L0,-300 L280,0" stroke="#e8f3ff" strokeWidth={6} fill="none" opacity={0.5} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={872} n={14} col="#e6f0fb" fall={8} />
      <Grade sunX={820} sunY={360} warm="200,214,240" cool="10,20,50" vignette={0.6} />
      <Readout label="TIME" value="2 a.m." ok={null} t={t} t0={3.6} x={80} y={200} />
      <Chip text="Shivering" t={t} t0={4.6} x={80} y={420} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CUTAWAY: cold rising from the ground through the thin pad (5.7 - 7.7) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2), rot: hh.rot };
  const gy = 1180;
  return (
    <AbsoluteFill style={{ background: TENT.wall }}>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1500} height={2400} fill={TENT.wall} />
          {/* frozen ground */}
          <rect x={-200} y={gy} width={1500} height={1200} fill="#3b4450" />
          {Array.from({ length: 30 }, (_, i) => (
            <ellipse key={i} cx={(i * 173) % 1300 - 100} cy={gy + 80 + ((i * 91) % 700)} rx={30 + (i % 4) * 12} ry={12} fill="#2c333d" />
          ))}
          <Frost n={30} y0={gy + 30} y1={gy + 800} seed={7} op={0.7} />
          {/* tent floor, thin pad, flattened bag */}
          <rect x={-200} y={gy - 12} width={1500} height={12} fill="#1c2433" />
          <rect x={60} y={gy - 30} width={960} height={18} rx={6} fill={THIN} />
          <path d={`M60,${gy - 30} L60,${gy - 260} Q540,${gy - 420} 1020,${gy - 260} L1020,${gy - 30} Z`} fill={BAG.c} />
          <rect x={60} y={gy - 56} width={960} height={26} fill={BAG.in} />
          {/* cold arrows rising */}
          {Array.from({ length: 6 }, (_, i) => {
            const q = (t * 0.7 + i / 6) % 1;
            const x = 130 + i * 160;
            const y = gy + 420 - q * 520;
            return (
              <g key={i} opacity={Math.sin(q * Math.PI)}>
                <path d={`M${x},${y + 90} L${x},${y}`} stroke="#9fd0ff" strokeWidth={14} strokeLinecap="round" />
                <path d={`M${x - 24},${y + 24} L${x},${y} L${x + 24},${y + 24}`} stroke="#9fd0ff" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            );
          })}
        </Svg>
      </Plane>
      <Particles seed={873} n={10} col="#e6f0fb" fall={8} />
      <Grade sunX={540} sunY={400} warm="210,220,240" cool="10,20,50" vignette={0.6} />
      <Chip text="Cold comes up from the ground" t={t} t0={5.85} x={60} y={200} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: a hand presses the bag flat, no loft underneath (7.7 - 10.35) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.6), rot: hh.rot };
  const press = at(t, [8.0, 8.7], [0, 1], outExpo);
  const top = mix(860, 1120, press);
  return (
    <AbsoluteFill style={{ background: TENT.floor }}>
      <Plane cam={cam} depth={0.6} blur={10}>
        <TentInside y={1500} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(200,220,255,0.6)">
          <rect x={-200} y={1300} width={1500} height={900} fill="#1c2433" />
          <rect x={-200} y={1270} width={1500} height={30} rx={8} fill={THIN} />
          {/* bag fabric pressed down in the middle */}
          <path d={`M-200,1270 L-200,${860} Q200,${840} 360,${top - 20} Q540,${top + 10} 720,${top - 20} Q880,${840} 1300,${860} L1300,1270 Z`} fill={BAG.c} />
          {Array.from({ length: 7 }, (_, i) => (
            <path key={i} d={`M${-100 + i * 200},${i === 2 || i === 3 || i === 4 ? top : 880} L${-100 + i * 200},1268`} stroke={BAG.s} strokeWidth={8} />
          ))}
          {/* hand */}
          <g transform={`translate(540,${top - 60})`}>
            <rect x={-60} y={-420} width={120} height={360} rx={50} fill={LENA.jacket} />
            <ellipse cx={0} cy={0} rx={120} ry={70} fill={LENA.skin} />
            {[-80, -30, 20, 70].map((dx) => (
              <ellipse key={dx} cx={dx} cy={50} rx={26} ry={44} fill={LENA.skin} />
            ))}
            <ellipse cx={-30} cy={-20} rx={60} ry={30} fill={LENA.skinShade} opacity={0.5} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={874} n={10} col="#e6f0fb" fall={8} />
      <Grade sunX={540} sunY={400} warm="220,220,240" cool="10,20,50" vignette={0.55} />
      <Readout label="BAG UNDER YOU" value="Squashed flat" ok={false} t={t} t0={8.6} x={80} y={200} />
      <Chip text="Can't hold heat" t={t} t0={9.2} x={80} y={420} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 FIX CLOSE-UP: a thick pad unrolls on the tent floor (10.35 - 13.8) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.4), rot: hh.rot };
  const u = at(t, [11.9, 13.2], [0, 1], outExpo);
  const rx = mix(120, 980, u);
  const r = mix(110, 46, u);
  const gy = 1300;
  return (
    <AbsoluteFill style={{ background: TENT.floor }}>
      <Plane cam={cam} depth={0.6} blur={8}>
        <TentInside y={1500} frost={0.6} glow="#ffe2b0" />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,180,0.7)">
          <rect x={-200} y={gy} width={1500} height={900} fill={TENT.floor} />
          {/* thin pad for comparison, pushed aside */}
          <rect x={80} y={gy + 120} width={900} height={14} rx={6} fill={THIN} />
          {/* unrolled thick pad */}
          <rect x={100} y={gy - 70} width={Math.max(0, rx - 100)} height={70} rx={14} fill={THICK.c} />
          {Array.from({ length: 12 }, (_, i) => {
            const x = 150 + i * 75;
            return x < rx - 20 ? <line key={i} x1={x} y1={gy - 66} x2={x} y2={gy - 4} stroke={THICK.s} strokeWidth={6} /> : null;
          })}
          {/* the roll */}
          <circle cx={rx} cy={gy - r} r={r} fill={THICK.c} />
          <circle cx={rx} cy={gy - r} r={r * 0.62} fill="none" stroke={THICK.s} strokeWidth={8} />
          <circle cx={rx} cy={gy - r} r={r * 0.28} fill="none" stroke={THICK.s} strokeWidth={8} />
        </Subject>
      </Plane>
      <Particles seed={875} n={12} col="#ffe7b8" fall={8} />
      <Grade sunX={800} sunY={300} warm="255,226,190" vignette={0.55} />
      <Title text={"Your pad matters\nas much as\nyour bag."} t={t} t0={off + 0.05} t1={11.8} top={160} size={122} />
      <Chip text="Thick pad, off the cold ground" t={t} t0={11.9} x={60} y={200} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S6 MEDIUM: pad for cold ground, bag rated colder than the low (13.8 - 18.65) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + mix(-30, 30, lt / 4.85), y: hh.y, zoom: mix(1.1, 1.02, lt / 4.85), rot: hh.rot };
  const k = at(t, [13.9, 14.4], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <TentInside y={1290} frost={0.8} />
        <Subject rimX={5} col="rgba(255,226,180,0.6)">
          <InBag x={700} y={1200} s={3} t={t} thick={k} expr="neutral" />
        </Subject>
        <Svg>
          <Puff x={380} y={980} t={t} dir={1} s={1.2} />
        </Svg>
      </Plane>
      <Particles seed={876} n={12} col="#e6f0fb" fall={8} />
      <Grade sunX={800} sunY={300} warm="230,226,230" cool="10,20,50" vignette={0.6} />
      <Chip text="Pad made for cold ground" t={t} t0={14.0} x={60} y={200} icon="check" />
      <Readout label="BAG RATING" value="Colder than the low" ok={true} t={t} t0={15.9} x={60} y={330} />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: dry layers and a hat, cosy at last (18.65 - 21.0) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + 120, y: hh.y - 60, zoom: mix(1.45, 1.52, lt / 2.35), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <TentInside y={1290} frost={0.5} glow="#ffe2b0" />
        <Subject rimX={5} col="rgba(255,226,180,0.8)">
          <InBag x={700} y={1200} s={3} t={t} thick={1} hat expr="happy" />
          </Subject>
      </Plane>
      <Particles seed={877} n={12} col="#ffe7b8" fall={8} />
      <Grade sunX={800} sunY={300} warm="255,220,180" vignette={0.6} />
      <Chip text="Dry layers" t={t} t0={18.75} x={80} y={200} icon="check" big />
      <Chip text="And a hat" t={t} t0={19.8} x={80} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF MEDIUM: sunrise at the tent door, Lena stretches (21.0 - 23.8) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.04], outExpo), rot: hh.rot };
  const g = 1420;
  const up = at(t, [21.4, 22.2], [0, 1], outExpo);
  const p: HikerProps = { x: 620, y: g + 182 * 2.3 - 130, scale: 2.3, walk: 0, lean: -0.06 * up, poles: false, handOverride: [mix(30, 20, up), mix(-40, -230, up)], breathe: Math.sin(t * 2) * 1.5 };
  const geo = hikerGeometry(p);
  void geo;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="h" treeY={g - 40} t={t} snow={0.3} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 60} snow={0.3} />
        <Svg>
          <g transform={`translate(240,${g + 70})`}>
            <path d="M-300,0 L0,-360 L300,0 Z" fill="#C2662E" />
            <path d="M0,-360 L300,0 L140,0 Z" fill="#9B4E20" />
            <path d="M-90,0 L0,-240 L90,0 Z" fill="#5a2c14" />
          </g>
        </Svg>
        <Subject rimX={-6} col="rgba(255,200,140,0.9)">
          <Person {...p} outfit={LENA} expression="happy" noPack />
        </Subject>
      </Plane>
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.34} col="255,214,160" />
      <Particles seed={878} n={20} col="#ffe7b8" />
      <Grade sunX={300} sunY={760} warm="255,200,140" />
      <Chip text="Slept till sunrise" t={t} t0={21.15} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/first-backpacking-trip-beginners-guide-planner.jpg"
      spec="32 PAGES · PRINTABLE GUIDE & PLANNER"
      name={
        <>
          First Backpacking
          <br />
          Trip Guide
        </>
      }
      nameSize={92}
      price="$8.99"
      save="Save this before your first night out"
    />
  );
};

export const V87: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.55} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.5} to={5.75} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.5} />
    </Scene>
    <Scene from={5.7} to={7.75} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.7} />
    </Scene>
    <Scene from={7.7} to={10.4} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.7} />
    </Scene>
    <Scene from={10.35} to={13.85} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={10.35} />
    </Scene>
    <Scene from={13.8} to={18.7} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={13.8} />
    </Scene>
    <Scene from={18.65} to={21.05} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={18.65} />
    </Scene>
    <Scene from={21.0} to={23.8} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={21.0} />
    </Scene>
    <Scene from={23.65} to={28.3} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.5, 1560],
        [3.5, 5.7, 1560],
        [5.7, 7.7, 1560],
        [7.7, 10.35, 1560],
        [10.35, 13.8, 1560],
        [13.8, 18.65, 1560],
        [18.65, 21.0, 1560],
        [21.0, 23.65, 1560],
      ]}
    />
  </AbsoluteFill>
);
