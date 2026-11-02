// V90: "35 pounds for one night" in the cinematic C01 style. Launch video 2 for First Backpacking Trip (p09).
// Advice (standard): lay everything out at home and weigh it, write each item down, question what you never used on day hikes,
// borrow or rent the big pieces before you buy, pack heavy things close to your back. 35 lb is Marco's pack in the story, not a statistic.
// End card = First Backpacking Trip — Beginner's Guide & Planner (Printable), 32 pages, $8.99 (live Shopify), store cover photo in the boxed card.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, CLEAR, FALL, Subject, Sweat, Trail } from "../fall";
import vo from "../vo/v90.json";

const words = vo.words as unknown as Word[];

const DUSK: Sky = { top: "#2f4468", mid: "#c98f78", low: "#ffcf9a", sun: [760, 700], sunR: 58, sunCol: "#fff0d0", glow: "#ffb874" };

const MARCO: Outfit = {
  ...GUIDE,
  skin: "#B8835E",
  skinShade: "#9A6847",
  hair: "#1f1612",
  beard: null,
  cap: "#2F7F86",
  capShade: "#256870",
  jacket: "#C2662E",
  jacketShade: "#9B4E20",
  pants: "#4a4f57",
  pantsShade: "#353a41",
  pack: "#3E5F4A",
  packShade: "#2C4536",
  glove: null,
};
const FRIEND: Outfit = { ...JAKE, jacket: "#4F7FA6", jacketShade: "#3c6385", cap: "#B83A55", capShade: "#8E2B42" };
const FLOOR = "#b89a74";
const FLOOR2 = "#a88a64";

// Pack on the hiker's back. big 0..1 = neat to overstuffed with gear hanging off. Drawn in hiker local units behind the Person.
const Pack: React.FC<{ p: HikerProps; big: number; t: number }> = ({ p, big, t }) => {
  const g = hikerGeometry(p);
  const lean = g.lean;
  const u = [Math.sin(lean), -Math.cos(lean)];
  const n = [Math.cos(lean), Math.sin(lean)];
  const sz = mix(1, 1.9, big);
  const c = [g.hip[0] + u[0] * 82 * mix(1, 1.15, big) - n[0] * 46 * sz, g.hip[1] + u[1] * 82 * mix(1, 1.15, big) - n[1] * 46 * sz];
  const deg = (lean * 180) / Math.PI;
  const sway = Math.sin(t * 3.2) * 6 * big;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${c[0]},${c[1]}) rotate(${deg})`}>
        {big > 0.3 && (
          <g opacity={Math.min(1, (big - 0.3) * 3)}>
            {/* camp chair bundle on top, extra boots and a frying pan swinging */}
            <rect x={-70} y={-200} width={140} height={44} rx={20} fill="#B83A55" />
            <rect x={-56} y={-236} width={112} height={36} rx={16} fill="#d9a34a" />
            <g transform={`rotate(${sway},-60,40)`}>
              <line x1={-60} y1={40} x2={-80} y2={110} stroke="#555" strokeWidth={3} />
              <circle cx={-84} cy={130} r={26} fill="#2b2b2b" />
              <rect x={-90} y={150} width={12} height={40} fill="#2b2b2b" />
            </g>
            <g transform={`rotate(${-sway},50,70)`}>
              <path d="M40,70 l-6,50 l40,0 l10,-12 l-14,-38 Z" fill="#6e4e3a" />
            </g>
            <rect x={60} y={-80} width={26} height={70} rx={8} fill="#c9443a" />
            <circle cx={-64} cy={-40} r={16} fill="#e7c25a" />
          </g>
        )}
        <rect x={-31 * sz} y={-64 * sz} width={62 * sz} height={124 * sz} rx={22 * sz} fill={MARCO.pack} />
        <rect x={-27 * sz} y={-78 * sz} width={50 * sz} height={30 * sz} rx={12 * sz} fill={MARCO.packShade} />
        <rect x={-38 * sz} y={-6 * sz} width={16 * sz} height={44 * sz} rx={8} fill={MARCO.packShade} />
      </g>
    </g>
  );
};

// One piece of gear for the floor layouts (top-down). kind decides the shape.
type Item = { k: string; x: number; y: number; w: number; h: number; c: string; out?: boolean };
const GEAR: Item[] = [
  { k: "tent", x: 140, y: 560, w: 300, h: 110, c: "#2F7F86" },
  { k: "bag", x: 500, y: 540, w: 160, h: 300, c: "#C2662E" },
  { k: "pad", x: 720, y: 520, w: 120, h: 340, c: "#2F5D3E" },
  { k: "stove", x: 160, y: 760, w: 120, h: 120, c: "#9aa4ac" },
  { k: "food", x: 330, y: 740, w: 140, h: 160, c: "#3E4F5C" },
  { k: "water", x: 880, y: 600, w: 70, h: 200, c: "#3f8fb0" },
  { k: "jacket", x: 520, y: 900, w: 220, h: 150, c: "#B83A55" },
  { k: "lamp", x: 160, y: 960, w: 80, h: 80, c: "#e7c25a" },
  { k: "pan", x: 790, y: 930, w: 150, h: 150, c: "#2b2b2b", out: true },
  { k: "chair", x: 300, y: 980, w: 160, h: 120, c: "#B83A55", out: true },
  { k: "boots", x: 600, y: 1100, w: 150, h: 100, c: "#6e4e3a", out: true },
  { k: "lantern", x: 860, y: 1130, w: 90, h: 120, c: "#d9a34a", out: true },
];

const GearPiece: React.FC<{ it: Item }> = ({ it }) => {
  const { k, w, h, c } = it;
  if (k === "pan")
    return (
      <g>
        <circle cx={w / 2} cy={h / 2} r={w / 2} fill={c} />
        <circle cx={w / 2} cy={h / 2} r={w / 2 - 14} fill="#3a3a3a" />
        <rect x={w - 6} y={h / 2 - 10} width={90} height={20} rx={8} fill={c} />
      </g>
    );
  if (k === "stove" || k === "lamp")
    return (
      <g>
        <circle cx={w / 2} cy={h / 2} r={w / 2} fill={c} />
        <circle cx={w / 2} cy={h / 2} r={w / 4} fill="rgba(0,0,0,0.25)" />
      </g>
    );
  if (k === "boots")
    return (
      <g fill={c}>
        <rect x={0} y={0} width={w * 0.45} height={h} rx={30} />
        <rect x={w * 0.55} y={0} width={w * 0.45} height={h} rx={30} />
      </g>
    );
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={Math.min(w, h) * 0.3} fill={c} />
      <rect x={w * 0.1} y={h * 0.1} width={w * 0.8} height={h * 0.18} rx={8} fill="rgba(255,255,255,0.18)" />
      {k === "pad" &&
        Array.from({ length: 6 }, (_, i) => <line key={i} x1={10} y1={40 + i * 50} x2={w - 10} y2={40 + i * 50} stroke="rgba(0,0,0,0.2)" strokeWidth={6} />)}
    </g>
  );
};

const Floor: React.FC = () => (
  <Svg>
    <rect x={-200} y={-200} width={1500} height={2400} fill={FLOOR} />
    {Array.from({ length: 14 }, (_, i) => (
      <rect key={i} x={-200 + i * 120} y={-200} width={6} height={2400} fill={FLOOR2} />
    ))}
  </Svg>
);

// ============ S1 HOOK MEDIUM: Marco under a huge pack with gear hanging off (0 - 4.15) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.02, 1.08, t / 4.15), rot: hh.rot };
  const g = 1500;
  const ph = t * 2.6;
  const p: HikerProps = { x: 520 + t * 30, y: g + 40, scale: 1.9, phase: ph, walk: 0.35, lean: 0.2, poles: false, handOverride: [20, -40], breathe: Math.sin(t * 4) * 3 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="a" treeY={g - 140} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={5}>
          <Pack p={p} big={1} t={t} />
          <Person {...p} outfit={MARCO} expression="tired" noPack />
          <Sweat p={p} t={t} on={at(t, [1, 2], [0, 1])} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.16} />
      <Particles seed={901} n={16} leaves={FALL} fall={28} />
      <Grade sunX={790} sunY={560} warm="255,214,170" />
      <Title text={"35 pounds for\none night"} t={t} t0={0} top={130} size={128} />
      <Chip text="Packed like he was moving out" t={t} t0={2.47} x={60} y={380} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the pack on the bathroom scale (4.15 - 6.26) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.1), rot: hh.rot };
  const n = Math.round(at(t, [4.2, 4.9], [0, 35], outExpo));
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1500} height={2400} fill="#dfe3e2" />
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={-200} y={-200 + i * 260} width={1500} height={6} fill="#c9cfcd" />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <rect key={i} x={-200 + i * 260} y={-200} width={6} height={2400} fill="#c9cfcd" />
          ))}
        </Svg>
        <Subject rimX={4}>
          {/* scale */}
          <rect x={190} y={1220} width={700} height={170} rx={50} fill="#f4f6f6" stroke="#b5bcbc" strokeWidth={6} />
          <rect x={410} y={1260} width={260} height={90} rx={16} fill="#1d2226" />
          <text x={540} y={1330} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={72} fill="#7fe0a0">
            {`${n} lb`}
          </text>
          {/* overstuffed pack standing on it */}
          <g transform="translate(540,1230)">
            <rect x={-200} y={-760} width={400} height={760} rx={110} fill={MARCO.pack} />
            <rect x={-170} y={-860} width={330} height={160} rx={60} fill={MARCO.packShade} />
            <rect x={-230} y={-940} width={460} height={110} rx={50} fill="#B83A55" />
            <rect x={-180} y={-1020} width={360} height={90} rx={40} fill="#d9a34a" />
            <rect x={-170} y={-420} width={340} height={300} rx={60} fill={MARCO.packShade} />
            <g transform="translate(-260,-520)">
              <circle cx={0} cy={0} r={90} fill="#2b2b2b" />
              <circle cx={0} cy={0} r={70} fill="#3a3a3a" />
            </g>
            <path d="M190,-600 l40,0 l30,180 l-80,40 Z" fill="#6e4e3a" />
          </g>
        </Subject>
      </Plane>
      <Grade sunX={540} sunY={300} warm="250,240,225" vignette={0.5} />
      <Readout label="PACK FOR ONE NIGHT" value="35 lb" ok={false} t={t} t0={4.7} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: mile two, his shoulders burn (6.26 - 8.78) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x - lt * 16, y: hh.y, zoom: mix(1.08, 1.14, lt / 2.5), rot: hh.rot };
  const g = 1500;
  const ph = t * 2.4;
  const p: HikerProps = { x: 470, y: g, scale: 2.3, phase: ph, walk: 0.3, lean: 0.28, poles: false, handOverride: [6, -60], breathe: Math.sin(t * 5) * 3, slope: 0.08 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="c" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} tilt={0.08} />
        <Subject rimX={5}>
          <Pack p={p} big={1} t={t} />
          <Person {...p} outfit={MARCO} expression="tired" noPack />
          <Sweat p={p} t={t} on={1} />
        </Subject>
      </Plane>
      <Particles seed={903} n={16} leaves={FALL} fall={28} />
      <Grade sunX={790} sunY={560} warm="255,214,170" />
      <Readout label="MILE TWO" value="Shoulders burning" ok={false} t={t} t0={6.3} x={60} y={200} />
    </AbsoluteFill>
  );
};

// Top-down gear layout. aside 0..1 moves the "out" items to a leave-at-home pile at the bottom.
const Layout: React.FC<{ t: number; t0: number; aside: number }> = ({ t, t0, aside }) => (
  <Svg>
    {GEAR.map((it, i) => {
      const k = at(t, [t0 + i * 0.12, t0 + 0.4 + i * 0.12], [0, 1], outExpo);
      const pileY = 1300 + (i % 2) * 20;
      const pileX = 120 + ((i * 230) % 840);
      const x = it.out ? mix(it.x, pileX, aside) : it.x;
      const y = it.out ? mix(it.y, pileY, aside) : it.y;
      return (
        <g key={i} transform={`translate(${x},${y - (1 - k) * 80})`} opacity={k}>
          <rect x={6} y={10} width={it.w} height={it.h} rx={30} fill="rgba(0,0,0,0.15)" />
          <GearPiece it={it} />
        </g>
      );
    })}
  </Svg>
);

// ============ S4 FIX WIDE (top-down): everything laid out at home, then weighed (8.78 - 12.25) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.5), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Floor />
        <Subject rimX={3} col="rgba(255,236,200,0.6)">
          <Layout t={t} t0={9.7} aside={0} />
        </Subject>
      </Plane>
      <Particles seed={904} n={10} col="#fff3d6" bokeh />
      <Grade sunX={800} sunY={300} warm="255,226,190" vignette={0.5} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={9.6} top={200} size={124} />
      <Chip text="Lay everything out at home" t={t} t0={9.7} x={60} y={200} icon="check" />
      <Chip text="Weigh it" t={t} t0={11.26} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: writing each item down, weight column (12.25 - 13.89) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.64), rot: hh.rot };
  const rows = 6;
  const w = (i: number) => at(t, [12.3 + i * 0.22, 12.5 + i * 0.22], [0, 1]);
  const pen = Math.min(rows - 1, Math.floor((t - 12.3) / 0.22));
  const px = 300 + w(Math.max(0, pen)) * 300;
  const py = 820 + Math.max(0, pen) * 110;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Floor />
        <Subject rimX={3} col="rgba(255,236,200,0.6)">
          <rect x={150} y={520} width={780} height={1000} rx={10} fill="#f8f5ee" transform="rotate(-3,540,1000)" />
          <g transform="rotate(-3,540,1000)">
            <text x={210} y={640} fontFamily="Barlow Condensed" fontWeight={800} fontSize={60} fill="#2C3B2E">
              GEAR LIST
            </text>
            <text x={720} y={640} fontFamily="Barlow Condensed" fontWeight={700} fontSize={40} fill="#6b6b6b">
              lb / kg
            </text>
            <line x1={690} y1={680} x2={690} y2={1460} stroke="#c9c2b2" strokeWidth={4} />
            {Array.from({ length: rows }, (_, i) => (
              <g key={i}>
                <line x1={200} y1={760 + i * 110} x2={880} y2={760 + i * 110} stroke="#d9d2c2" strokeWidth={3} />
                <rect x={210} y={720 + i * 110} width={w(i) * (240 + ((i * 70) % 160))} height={16} rx={8} fill="#3b4440" opacity={0.75} />
                <rect x={720} y={720 + i * 110} width={w(i) * 90} height={16} rx={8} fill="#3b4440" opacity={0.75} />
              </g>
            ))}
            {/* pen and hand */}
            <g transform={`translate(${px},${py})`}>
              <line x1={0} y1={0} x2={130} y2={-200} stroke="#2F7F86" strokeWidth={22} strokeLinecap="round" />
              <ellipse cx={150} cy={-170} rx={90} ry={70} fill={MARCO.skin} />
              <ellipse cx={110} cy={-120} rx={30} ry={22} fill={MARCO.skin} />
              <rect x={170} y={-300} width={130} height={200} rx={50} fill={MARCO.jacket} transform="rotate(-30,170,-300)" />
            </g>
          </g>
        </Subject>
      </Plane>
      <Grade sunX={800} sunY={300} warm="255,226,190" vignette={0.55} />
      <Chip text="Write each item down" t={t} t0={12.26} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 TOP-DOWN: the things he never used on day hikes go to a leave-at-home pile (13.89 - 17.03) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.0, lt / 3.1), rot: hh.rot };
  const aside = at(t, [15.6, 16.4], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Floor />
        <Svg>
          <rect x={60} y={1270} width={960} height={210} rx={30} fill="none" stroke="#7a6248" strokeWidth={8} strokeDasharray="30 20" opacity={aside} />
        </Svg>
        <Subject rimX={3} col="rgba(255,236,200,0.6)">
          <Layout t={t + 10} t0={0} aside={aside} />
        </Subject>
      </Plane>
      <Particles seed={906} n={10} col="#fff3d6" bokeh />
      <Grade sunX={800} sunY={300} warm="255,226,190" vignette={0.5} />
      <Chip text="Never used it on a day hike?" t={t} t0={13.95} x={60} y={200} icon="x" />
      <Chip text="Ask if you need it" t={t} t0={15.57} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 MEDIUM: a friend lends him a tent (17.03 - 19.98) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.06, 1.0, lt / 2.95), rot: hh.rot };
  const g = 1500;
  const k = at(t, [17.2, 18.0], [0, 1], outExpo);
  const a: HikerProps = { x: 300, y: g, scale: 2.2, walk: 0, lean: 0.02, poles: false, handOverride: [mix(30, 70, k), mix(30, -30, k)], breathe: Math.sin(t * 2) * 1.5 };
  const b: HikerProps = { x: 790, y: g, scale: 2.2, walk: 0, lean: 0.02, poles: false, handOverride: [mix(70, 40, k), -30], breathe: Math.sin(t * 2 + 1) * 1.5 };
  const bag = [mix(790 - 70 * 2.2, 300 + 70 * 2.2, k * 0.55), g + (-30 - 182) * 2.2 + 20];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="g" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={5}>
          <Person {...a} outfit={MARCO} expression="happy" noPack />
          <Person {...b} outfit={FRIEND} expression="happy" noPack flip />
          <g transform={`translate(${bag[0]},${bag[1]})`}>
            <rect x={-60} y={-40} width={170} height={90} rx={40} fill="#2F7F86" />
            <rect x={-40} y={-30} width={130} height={14} rx={7} fill="#256870" />
            <path d="M-60,0 L-80,0" stroke="#256870" strokeWidth={10} strokeLinecap="round" />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.2} />
      <Particles seed={907} n={18} leaves={FALL} fall={28} />
      <Grade sunX={790} sunY={560} warm="255,214,170" />
      <Chip text="Borrow or rent the big pieces" t={t} t0={17.05} x={60} y={200} icon="check" />
      <Chip text="Before you buy" t={t} t0={18.64} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: inside the pack, heavy food bag right against the back (19.98 - 22.38) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.4), rot: hh.rot };
  const k = at(t, [20.2, 21.0], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.7} blur={10}>
        <Floor />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          {/* open pack, back panel on the left */}
          <rect x={230} y={500} width={620} height={1000} rx={120} fill={MARCO.pack} />
          <rect x={290} y={560} width={500} height={880} rx={80} fill="#1f2d24" />
          <rect x={230} y={500} width={60} height={1000} rx={30} fill={MARCO.packShade} />
          {/* sleeping bag at the bottom, jacket on top */}
          <rect x={310} y={1200} width={460} height={220} rx={90} fill="#C2662E" />
          <rect x={310} y={600} width={460} height={180} rx={70} fill="#B83A55" />
          {/* heavy food bag slides in against the back */}
          <g transform={`translate(${mix(560, 0, k)},${mix(-500, 0, k)})`}>
            <rect x={300} y={800} width={260} height={380} rx={50} fill="#3E4F5C" />
            <text x={430} y={1010} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={56} fill="#e9dfc4" letterSpacing={2}>
              HEAVY
            </text>
          </g>
          <rect x={580} y={810} width={180} height={360} rx={40} fill="#d9a34a" opacity={0.9} />
        </Subject>
      </Plane>
      <Particles seed={908} n={10} col="#fff3d6" bokeh />
      <Grade sunX={800} sunY={300} warm="255,226,190" vignette={0.55} />
      <Chip text="Heavy things close to your back" t={t} t0={20.47} x={60} y={200} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF: lakeside camp at dusk, a neat pack, Marco smiling (22.38 - 24.33) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 20, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1480;
  const p: HikerProps = { x: 640, y: g, scale: 2.3, walk: 0, lean: 0, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DUSK} uid="i" treeY={g - 260} t={t} far="#6a6f8a" mid="#4a4a52" />
      <Plane cam={cam} depth={0.8}>
        <Svg>
          <rect x={-300} y={g - 230} width={1700} height={200} fill="#e8a27a" opacity={0.85} />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={-200 + i * 180 + Math.sin(t * 2 + i) * 10} y={g - 200 + (i % 3) * 50} width={90} height={6} rx={3} fill="#ffe0b8" opacity={0.7} />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Trail y={g} grass="#5c6a3e" dirt="#7d6a50" />
        <Svg>
          <g transform={`translate(260,${g + 40})`}>
            <path d="M-220,0 L0,-280 L220,0 Z" fill="#2F7F86" />
            <path d="M0,-280 L220,0 L100,0 Z" fill="#256870" />
            <path d="M-60,0 L0,-170 L60,0 Z" fill="#163e42" />
          </g>
        </Svg>
        <Subject rimX={-6} col="rgba(255,200,140,0.9)">
          <Pack p={p} big={0} t={t} />
          <Person {...p} outfit={MARCO} expression="happy" noPack />
        </Subject>
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.36} col="255,204,150" />
      <Particles seed={909} n={22} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,196,140" />
      <Chip text="Made camp smiling" t={t} t0={22.4} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
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
      save="Save this before your first backpacking trip"
    />
  );
};

export const V90: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.2} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.15} to={6.31} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.15} />
    </Scene>
    <Scene from={6.26} to={8.83} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.26} />
    </Scene>
    <Scene from={8.78} to={12.3} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.78} />
    </Scene>
    <Scene from={12.25} to={13.94} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.25} />
    </Scene>
    <Scene from={13.89} to={17.08} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={13.89} />
    </Scene>
    <Scene from={17.03} to={20.03} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={17.03} />
    </Scene>
    <Scene from={19.98} to={22.43} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={19.98} />
    </Scene>
    <Scene from={22.38} to={24.4} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={22.38} />
    </Scene>
    <Scene from={24.25} to={29.2} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.5, 4.15, 1560],
        [4.15, 6.26, 1560],
        [6.26, 8.78, 1560],
        [8.78, 12.25, 1560],
        [12.25, 13.89, 1560],
        [13.89, 17.03, 1560],
        [17.03, 19.98, 1560],
        [19.98, 22.38, 1560],
        [22.38, 24.25, 1560],
      ]}
    />
  </AbsoluteFill>
);
