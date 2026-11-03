// V92: "His dog sat down at mile five" in the cinematic C01 style. Launch video 2 for Hiking With Your Dog (p10).
// Advice from the live Shopify listing (start with your vet, build up distance week by week, water and paw checks,
// signs your dog needs a rest). Not vet advice: always "ask your vet first". No invented numbers beyond the script's story.
// End card = Hiking With Your Dog — Trail Guide & Checklists (Printable), 20 pages, $5.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, CLEAR, FALL, GOLD, Subject, Trail } from "../fall";
import { Dog, DogLook, dogCollar } from "../dog";
import vo from "../vo/v92.json";

const words = vo.words as unknown as Word[];

const NOON: Sky = { top: "#3f6f9c", mid: "#a8c6dc", low: "#f2e4c4", sun: [820, 500], sunR: 50, sunCol: "#fff8e4", glow: "#ffdca0" };

const JK: Outfit = {
  ...JAKE,
  skin: "#D9A47E",
  skinShade: "#B8835F",
  hair: "#3b2a1c",
  beard: "#3b2a1c",
  cap: "#2F5D8A",
  capShade: "#244a6f",
  jacket: "#C2662E",
  jacketShade: "#9a4f22",
  pants: "#454b52",
  pantsShade: "#33383d",
  pack: "#2F5D3E",
  packShade: "#244a31",
  glove: null,
};
// Rocky: a black-and-tan dog.
const ROCKY: DogLook = { coat: "#3a2c24", shade: "#2a1f19", belly: "#b9824e", ear: "#2a1f19", collar: "#C9443A", nose: "#141010" };
const LEASH = "#C9443A";
const WOOD = "#7a5a3c";
const WOOD2 = "#5e4430";

const toScreen = (p: HikerProps, q: readonly number[]): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};
const handOf = (p: HikerProps) => toScreen(p, hikerGeometry(p).arms[1].hand);

const Leash: React.FC<{ a: [number, number]; b: [number, number]; w?: number; sag?: number }> = ({ a, b, w = 6, sag = 60 }) => (
  <path d={`M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${Math.max(a[1], b[1]) + sag} ${b[0]},${b[1]}`} stroke={LEASH} strokeWidth={w} fill="none" strokeLinecap="round" />
);

// Rocky lying flat: the standing dog lowered so the legs fold away, front paws stretched forward.
const LyingDog: React.FC<{ x: number; y: number; s: number; t: number; pant?: number }> = ({ x, y, s, t, pant = 1 }) => {
  const id = `ld${Math.round(x)}${Math.round(y)}`;
  const breath = Math.sin(t * 9) * 2 * pant;
  return (
    <g>
      <ellipse cx={x} cy={y + 4} rx={150 * s} ry={14 * s} fill="rgba(0,0,0,0.25)" />
      <defs>
        <clipPath id={id}>
          <rect x={x - 400 * s} y={y - 400 * s} width={800 * s} height={400 * s - 2} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <g transform={`translate(0,${(62 + breath) * s})`}>
          <Dog x={x} y={y} s={s} look={ROCKY} mood="sad" headUp={-1.6} tailWag={0} />
        </g>
      </g>
      {/* front paws stretched forward on the ground */}
      <ellipse cx={x + 130 * s} cy={y - 8 * s} rx={46 * s} ry={11 * s} fill={ROCKY.coat} />
      <ellipse cx={x + 160 * s} cy={y - 6 * s} rx={16 * s} ry={9 * s} fill={ROCKY.belly} />
    </g>
  );
};

// Generic wooden mile post.
const MilePost: React.FC<{ x: number; ground: number; h: number }> = ({ x, ground, h }) => (
  <g>
    <rect x={x - h * 0.09} y={ground - h} width={h * 0.18} height={h} fill={WOOD} />
    <rect x={x + h * 0.04} y={ground - h} width={h * 0.05} height={h} fill={WOOD2} />
    <path d={`M${x - h * 0.09},${ground - h} L${x},${ground - h - h * 0.08} L${x + h * 0.09},${ground - h} Z`} fill={WOOD2} />
    <text x={x} y={ground - h * 0.78} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={h * 0.09} fill="#f3efe4" letterSpacing={2}>
      MILE
    </text>
    <text x={x} y={ground - h * 0.6} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={h * 0.16} fill="#f3efe4">
      5
    </text>
  </g>
);

// ============ S1 HOOK MEDIUM: Rocky lies flat on the trail at mile five, Jake stands over him (0 - 3.33) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.02, 1.08, t / 3.33), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 300, y: g, scale: 2.3, walk: 0, lean: 0.12, poles: false, handOverride: [60, 40], breathe: Math.sin(t * 3) * 2 };
  const dx = 560;
  const ds = 1.5;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NOON} uid="a" treeY={g - 150} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          <MilePost x={900} ground={g + 10} h={420} />
        </Svg>
        <Subject rimX={5}>
          <Person {...p} outfit={JK} expression="tired" />
          <LyingDog x={dx} y={g + 6} s={ds} t={t} />
          <Leash a={handOf(p)} b={[dx + 70 * ds, g - 70 * ds]} sag={30} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Rays x={NOON.sun[0]} y={NOON.sun[1]} strength={0.14} />
      <Particles seed={921} n={18} leaves={FALL} fall={30} />
      <Grade sunX={820} sunY={500} warm="255,220,180" />
      <Title text={"His dog sat down\nat mile five"} t={t} t0={0} top={130} size={104} />
      <Chip text="An 8-mile hike" t={t} t0={1.0} x={80} y={380} />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: the morning start, both happy, Rocky's longest walk so far (3.33 - 6.32) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: mix(1.0, 1.05, lt / 3), rot: hh.rot };
  const g = 1420;
  const ph = t * 3.6;
  const px = 200 + lt * 60;
  const p: HikerProps = { x: px, y: g, scale: 1.5, phase: ph, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  const dx = px + 230;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="b" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={4}>
          <Person {...p} outfit={JK} expression="happy" />
          <Dog x={dx} y={g + 4} s={0.85} phase={t * 6} walk={1} look={ROCKY} mood="happy" tailWag={t * 14} />
          <Leash a={handOf(p)} b={dogCollar(dx, g + 4, 0.85)} w={4} sag={30} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.18} />
      <Particles seed={922} n={18} leaves={FALL} fall={30} />
      <Grade sunX={790} sunY={560} warm="255,214,170" />
      <Readout label="ROCKY'S LONGEST WALK" value="2 miles" ok={null} t={t} t0={3.6} x={60} y={200} />
      <Chip text="Today: 8 miles" t={t} t0={5.0} x={60} y={440} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Rocky flat on the ground, panting, Jake's hand on his back (6.32 - 9.58) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35, at(t, [7.9, 8.0, 8.3], [0, 0.8, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.26), rot: hh.rot };
  const s = 4.0;
  const dx = 260;
  const dy = 1500;
  const pat = Math.sin(t * 3) * 10;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NOON} uid="c" treeY={1300} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-100} y={dy - 20} width={1300} height={700} fill="#9a7f5c" />
          <path d={`M-100,${dy - 20} L1200,${dy - 20}`} stroke="#76804a" strokeWidth={30} />
        </Svg>
        <Subject rimX={6}>
          <LyingDog x={dx} y={dy} s={s} t={t} />
          {/* Jake's hand resting on Rocky's back */}
          <g transform={`translate(${dx - 60 + pat},${dy - 330}) rotate(-35)`}>
            <rect x={-60} y={-520} width={130} height={520} rx={60} fill={JK.jacket} />
            <ellipse cx={4} cy={10} rx={80} ry={52} fill={JK.skin} />
            {[-48, -16, 16, 48].map((d) => (
              <ellipse key={d} cx={d + 4} cy={52} rx={18} ry={30} fill={JK.skin} stroke={JK.skinShade} strokeWidth={2} />
            ))}
          </g>
        </Subject>
      </Plane>
      <Particles seed={923} n={12} leaves={FALL} fall={26} />
      <Grade sunX={820} sunY={500} warm="255,220,180" vignette={0.55} />
      <Chip text="Mile 5" t={t} t0={6.4} x={60} y={200} big />
      <Chip text="Wouldn't move" t={t} t0={8.0} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: "Here's the fix" — ask your vet first (9.58 - 11.71) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.08, 1.02, lt / 2.13), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 330, y: g, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [40, 22], breathe: Math.sin(t * 2.2) * 1.5 };
  const dx = 560;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={g - 160} t={t} mid="#4a5a40" />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={5}>
          <Person {...p} outfit={JK} expression="neutral" />
          <Dog x={dx} y={g + 6} s={1.25} look={ROCKY} mood="alert" headUp={0.6} tailWag={t * 8} />
          <Leash a={handOf(p)} b={dogCollar(dx, g + 6, 1.25)} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.2} />
      <Particles seed={924} n={18} leaves={FALL} fall={30} />
      <Grade sunX={790} sunY={560} warm="255,214,170" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={10.45} top={200} size={124} />
      <Chip text="Ask your vet first" t={t} t0={10.5} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: build up slowly — the same trail, a little further each week (11.71 - 15.37) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.0, 1.05, lt / 3.66), rot: hh.rot };
  const g = 1420;
  const ph = t * 3.6;
  const px = 160 + lt * 70;
  const p: HikerProps = { x: px, y: g, scale: 1.4, phase: ph, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  const dx = px + 220;
  // four bars, each a little taller (no numbers: the shape of a slow build-up)
  const bars = [0, 1, 2, 3].map((i) => at(t, [12.2 + i * 0.45, 12.6 + i * 0.45], [0, 1], outExpo));
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={4}>
          <Person {...p} outfit={JK} expression="happy" />
          <Dog x={dx} y={g + 4} s={0.82} phase={t * 6} walk={1} look={ROCKY} mood="happy" tailWag={t * 14} />
          <Leash a={handOf(p)} b={dogCollar(dx, g + 4, 0.82)} w={4} sag={30} />
        </Subject>
      </Plane>
      <Particles seed={925} n={16} leaves={FALL} fall={28} />
      <Grade sunX={790} sunY={560} warm="255,214,170" />
      <AbsoluteFill>
        <Svg>
          <rect x={60} y={330} width={520} height={420} rx={26} fill="#fff" opacity={bars[0] > 0 ? 0.96 : 0} />
          <text x={100} y={390} fontFamily="Barlow Condensed" fontWeight={700} fontSize={32} letterSpacing={3} fill="#6b6b66" opacity={bars[0] > 0 ? 1 : 0}>
            DISTANCE, WEEK BY WEEK
          </text>
          {bars.map((k, i) => {
            const h = (110 + i * 70) * k;
            return <rect key={i} x={110 + i * 115} y={710 - h} width={80} height={h} rx={10} fill={i === 3 ? "#3E8E5A" : "#8fb89a"} />;
          })}
        </Svg>
      </AbsoluteFill>
      <Chip text="Build up slowly" t={t} t0={12.0} x={60} y={180} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: water just for Rocky, poured into a folding bowl (15.37 - 17.12) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.75), rot: hh.rot };
  const pour = at(t, [15.5, 15.9], [0, 1], outExpo);
  const lvl = at(t, [15.8, 16.8], [0, 1]);
  const bx = 560;
  const by = 1420;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={1200} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-100} y={by - 60} width={1300} height={800} fill="#9a7f5c" />
          <path d={`M-100,${by - 60} L1200,${by - 60}`} stroke="#76804a" strokeWidth={30} />
        </Svg>
        <Subject rimX={6}>
          {/* folding bowl */}
          <path d={`M${bx - 230},${by - 150} L${bx + 230},${by - 150} L${bx + 170},${by} L${bx - 170},${by} Z`} fill="#2F7F86" />
          <ellipse cx={bx} cy={by - 150} rx={230} ry={40} fill="#246067" />
          <ellipse cx={bx} cy={by - 146} rx={200 * lvl + 1} ry={30 * lvl + 1} fill="#7fb3cf" opacity={lvl} />
          {[0.35, 0.7].map((k) => (
            <line key={k} x1={bx - 230 + 60 * k} y1={by - 150 + 150 * k} x2={bx + 230 - 60 * k} y2={by - 150 + 150 * k} stroke="#246067" strokeWidth={6} />
          ))}
          {/* bottle tipping in from above */}
          <g transform={`translate(${bx + 140},${mix(200, 640, pour)}) rotate(${mix(0, 120, pour)})`}>
            <rect x={-60} y={-260} width={120} height={260} rx={30} fill="#3f8fb0" />
            <rect x={-38} y={-300} width={76} height={50} rx={10} fill="#2b3a40" />
            <rect x={-48} y={-240} width={16} height={220} rx={8} fill="#fff" opacity={0.3} />
          </g>
          {pour > 0.9 && <path d={`M${bx + 280},${mix(560, 720, pour)} Q${bx + 120},${by - 300} ${bx + 40},${by - 150}`} stroke="#bfe3f2" strokeWidth={20} fill="none" strokeLinecap="round" />}
          {/* Rocky's head dipping in from the left */}
          <g transform={`translate(-110,${by + 20})`}>
            <Dog x={0} y={0} s={2.6} look={ROCKY} mood="happy" headUp={-1.4} tailWag={t * 10} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={926} n={12} leaves={FALL} fall={24} />
      <Grade sunX={790} sunY={560} warm="255,220,180" vignette={0.5} />
      <Chip text="Water just for your dog" t={t} t0={15.45} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: checking a paw pad at the break (17.12 - 19.19) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.07), rot: hh.rot };
  const lift = at(t, [17.2, 17.7], [0, 1], outExpo);
  const cx = 560;
  const cy = mix(1250, 1000, lift);
  const thumb = Math.sin(t * 4) * 8;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="g" treeY={1200} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          {/* Rocky's leg coming down from above */}
          <path d={`M${cx - 40},-100 Q${cx - 70},${cy - 300} ${cx - 10},${cy - 60}`} stroke={ROCKY.coat} strokeWidth={170} fill="none" strokeLinecap="round" />
          {/* paw underside with pads */}
          <ellipse cx={cx} cy={cy} rx={170} ry={150} fill={ROCKY.coat} />
          <ellipse cx={cx} cy={cy + 40} rx={80} ry={62} fill="#3d3330" />
          {[-90, -32, 32, 90].map((d, i) => (
            <ellipse key={d} cx={cx + d} cy={cy - 50 - (i === 1 || i === 2 ? 20 : 0)} rx={30} ry={38} fill="#3d3330" />
          ))}
          {/* Jake's hands holding the paw */}
          <g transform={`translate(${cx - 230},${cy + 70}) rotate(30)`}>
            <rect x={-400} y={-70} width={330} height={140} rx={60} fill={JK.jacket} />
            <ellipse cx={-40} cy={0} rx={90} ry={66} fill={JK.skin} />
            <ellipse cx={50} cy={-30 + thumb} rx={60} ry={22} fill={JK.skin} stroke={JK.skinShade} strokeWidth={3} />
          </g>
          <g transform={`translate(${cx + 230},${cy + 90}) rotate(-30) scale(-1,1)`}>
            <rect x={-400} y={-70} width={330} height={140} rx={60} fill={JK.jacket} />
            <ellipse cx={-40} cy={0} rx={90} ry={66} fill={JK.skin} />
            <ellipse cx={50} cy={-30} rx={60} ry={22} fill={JK.skin} stroke={JK.skinShade} strokeWidth={3} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={927} n={14} col="#ffe7b8" />
      <Grade sunX={740} sunY={660} warm="255,200,140" vignette={0.55} />
      <Chip text="Check paws at every break" t={t} t0={17.3} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 MEDIUM: Rocky lags and pants, Jake turns back early (19.19 - 22.39) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 18, y: hh.y, zoom: mix(1.02, 1.07, lt / 3.2), rot: hh.rot };
  const g = 1500;
  const turn = at(t, [21.0, 21.3], [0, 1]);
  const ph = t * 3.4;
  const px = turn > 0.5 ? 600 - (t - 21.15) * 90 : 600;
  const p: HikerProps = { x: px, y: g, scale: 2.2, phase: ph, walk: turn > 0.5 ? 0.7 : 0, lean: 0.04, poles: false, handOverride: turn > 0.5 ? freeHand(ph, 0.5) : [30, 26], breathe: Math.sin(t * 2) * 1.5 };
  const dx = turn > 0.5 ? px - 300 : 260;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="h" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={5}>
          <Person {...p} outfit={JK} expression="neutral" flip={turn > 0.5} />
          <Dog x={dx} y={g + 6} s={1.15} phase={t * 4} walk={turn > 0.5 ? 0.8 : 0.3} look={ROCKY} mood={turn > 0.5 ? "happy" : "sad"} tailWag={t * 6} flip={turn > 0.5} />
          {turn <= 0.5 && <ellipse cx={dx + 160 * 1.15} cy={g - 125 * 1.15 + Math.sin(t * 9) * 3} rx={8} ry={16} fill="#d9667a" />}
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.18} />
      <Particles seed={928} n={18} leaves={FALL} fall={30} />
      <Grade sunX={790} sunY={560} warm="255,214,170" />
      <Chip text="Lagging behind?" t={t} t0={20.4} x={60} y={200} big />
      <Chip text="Panting hard?" t={t} t0={21.0} x={60} y={330} big />
      <Chip text="Turn back early" t={t} t0={21.5} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF: a month later, Jake and Rocky at the viewpoint together (22.39 - 24.6) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x + lt * 26, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 360, y: g, scale: 2.2, walk: 0, lean: -0.02, poles: false, handOverride: [40, 22], breathe: Math.sin(t * 2) * 1.5 };
  const dx = 600;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="i" treeY={g + 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-100,2100 L-100,${g + 10} Q300,${g - 30} 700,${g} Q900,${g + 20} 1200,${g + 60} L1200,2100 Z`} fill="#7d7f78" />
          <path d={`M-100,${g + 30} Q300,${g - 10} 700,${g + 20}`} stroke="#9a9c94" strokeWidth={12} fill="none" />
        </Svg>
        <Subject rimX={-6} col="rgba(255,200,140,0.9)">
          <Person {...p} outfit={JK} expression="happy" />
          <Dog x={dx} y={g + 6} s={1.2} look={ROCKY} mood="happy" headUp={0.4} tailWag={t * 14} />
          <Leash a={handOf(p)} b={dogCollar(dx, g + 6, 1.2)} sag={50} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#4a2a14" side="both" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.34} col="255,214,160" />
      <Particles seed={929} n={26} leaves={FALL} fall={34} />
      <Grade sunX={740} sunY={660} warm="255,200,140" />
      <Chip text="A month later: together" t={t} t0={22.6} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-with-your-dog-trail-guide.jpg"
      spec="20 PAGES · PRINTABLE GUIDE & CHECKLISTS"
      name={
        <>
          Hiking With
          <br />
          Your Dog
        </>
      }
      nameSize={96}
      price="$5.99"
      save="Save this before your next dog hike"
    />
  );
};

export const V92: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.38} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.33} to={6.37} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.33} />
    </Scene>
    <Scene from={6.32} to={9.63} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.32} />
    </Scene>
    <Scene from={9.58} to={11.76} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.58} />
    </Scene>
    <Scene from={11.71} to={15.42} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.71} />
    </Scene>
    <Scene from={15.37} to={17.17} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={15.37} />
    </Scene>
    <Scene from={17.12} to={19.24} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={17.12} />
    </Scene>
    <Scene from={19.19} to={22.44} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={19.19} />
    </Scene>
    <Scene from={22.39} to={24.6} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={22.39} />
    </Scene>
    <Scene from={24.45} to={29.0} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.33, 1560],
        [3.33, 6.32, 1560],
        [6.32, 9.58, 1560],
        [9.58, 11.71, 1560],
        [11.71, 15.37, 1560],
        [15.37, 17.12, 1560],
        [17.12, 19.19, 1560],
        [19.19, 22.39, 1560],
        [22.39, 24.45, 1560],
      ]}
    />
  </AbsoluteFill>
);
