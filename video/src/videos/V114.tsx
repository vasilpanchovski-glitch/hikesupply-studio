// V114: "Don't stand under a frozen waterfall." in the cinematic C01 style. Story for the Hiking Safety Guide ($8.99, live Shopify).
// Advice kept conservative: frozen falls can shed ice without warning, more so when the sun warms them; water can run under the
// ice at the base. Take the photo from a distance and stay off the ice. No numbers, no claims beyond that.
// End card = real Shopify cover photo (boxed card, the cover has no plain background to cut out).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, WINTER, WGOLD, WinterBackdrop } from "../winter";
import vo from "../vo/v114.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const TOM: Outfit = {
  ...JAKE,
  skin: "#E2B48F",
  skinShade: "#C4946F",
  hair: "#6b4a2e",
  beard: "#6b4a2e",
  cap: "#2f5f7a",
  capShade: "#244a60",
  jacket: "#c4552f",
  jacketShade: "#9a4024",
  pants: "#3b3f46",
  pantsShade: "#2a2d32",
  pack: "#4b5a3a",
  packShade: "#38452b",
  glove: "#262626",
};

const ROCK = "#4a5058";
const ROCK2 = "#363b42";

// Rock cliff with a frozen waterfall hanging down its face (screen coords). top = lip of the cliff, bot = base pool.
// crack 0..1 shows a crack line under the lip, gone 0..1 removes the chunk that falls.
const FrozenFall: React.FC<{ cx: number; top: number; bot: number; w: number; t: number; crack?: number; gone?: number; drip?: number }> = ({ cx, top, bot, w, t, crack = 0, gone = 0, drip = 0 }) => {
  const h = bot - top;
  const cols = 9;
  return (
    <g>
      {/* cliff */}
      <path d={`M-200,${top - 120} L${cx - w * 1.1},${top - 60} L${cx - w * 0.6},${top} L${cx + w * 0.6},${top} L${cx + w * 1.15},${top - 80} L1300,${top - 160} L1300,${bot + 40} L-200,${bot + 40} Z`} fill={ROCK} />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M${-100 + i * 180},${top + 40 + (i % 3) * 120} l${60 + (i % 2) * 40},${200 + (i % 3) * 60}`} stroke={ROCK2} strokeWidth={14} strokeLinecap="round" />
      ))}
      {/* snow on the lip */}
      <path d={`M-200,${top - 130} L${cx - w * 1.1},${top - 70} L${cx - w * 0.6},${top - 12} Q${cx},${top - 40} ${cx + w * 0.6},${top - 12} L${cx + w * 1.15},${top - 92} L1300,${top - 172} L1300,${top - 210} L-200,${top - 170} Z`} fill={SNOW} />
      {/* ice columns */}
      {Array.from({ length: cols }, (_, i) => {
        const k = i / (cols - 1);
        const x = cx - w / 2 + k * w;
        const cw = w / cols + 26;
        const len = h * (0.82 + 0.18 * Math.sin(i * 2.7));
        return (
          <g key={i}>
            <path d={`M${x - cw / 2},${top} Q${x - cw * 0.6},${top + len * 0.5} ${x - cw * 0.25},${top + len} L${x + cw * 0.25},${top + len} Q${x + cw * 0.6},${top + len * 0.5} ${x + cw / 2},${top} Z`} fill={i % 2 ? "#cfe6f2" : "#e8f4fa"} opacity={0.96} />
            <path d={`M${x - cw * 0.1},${top + 20} L${x - cw * 0.05},${top + len * 0.9}`} stroke="#ffffff" strokeWidth={8} opacity={0.7} strokeLinecap="round" />
            <path d={`M${x + cw * 0.2},${top + 40} L${x + cw * 0.18},${top + len * 0.7}`} stroke="#9cc6dc" strokeWidth={6} opacity={0.6} strokeLinecap="round" />
          </g>
        );
      })}
      {/* the chunk that breaks: icicles under the lip, right of centre */}
      {gone < 1 && (
        <g opacity={1 - gone}>
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${cx + w * 0.12 + i * 40},${top} l20,${150 + (i % 2) * 60} l20,${-150 - (i % 2) * 60} Z`} fill="#f4fbff" />
          ))}
        </g>
      )}
      {crack > 0 && <path d={`M${cx + w * 0.08},${top + 18} l40,10 l30,-8 l40,14 l36,-6`} stroke="#3c6e88" strokeWidth={6} fill="none" strokeDasharray={260} strokeDashoffset={260 * (1 - crack)} strokeLinecap="round" />}
      {/* drips */}
      {drip > 0 &&
        [0, 1, 2, 3, 4].map((i) => {
          const k = (t * 1.2 + i * 0.21) % 1;
          return <ellipse key={i} cx={cx - w * 0.4 + i * w * 0.2} cy={top + 200 + k * h * 0.6} rx={9} ry={15} fill="#8fc3dc" opacity={drip * (1 - k)} />;
        })}
      {/* frozen pool at the base */}
      <ellipse cx={cx} cy={bot + 10} rx={w * 1.2} ry={70} fill="#bcd8e6" />
      <ellipse cx={cx - 40} cy={bot} rx={w * 0.9} ry={40} fill="#e3f1f8" opacity={0.8} />
    </g>
  );
};

const Phone: React.FC<{ x: number; y: number; s: number; rot?: number }> = ({ x, y, s, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-16} y={-28} width={32} height={56} rx={6} fill="#1b1d22" />
    <rect x={-12} y={-23} width={24} height={44} rx={3} fill="#7fb2d0" />
  </g>
);

// hand position in screen coords from a HikerProps handOverride (no flip)
const handAt = (p: HikerProps): [number, number] => {
  const s = p.scale ?? 1;
  const [hx, hy] = p.handOverride ?? [0, 0];
  return [p.x + hx * s, p.y - 182 * s + hy * s];
};

const SnowFloor: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y} Q540,${y - 26} 1480,${y} L1480,2600 L-400,2600 Z`} fill={SNOW} />
    <path d={`M-400,${y + 170} Q540,${y + 140} 1480,${y + 170} L1480,2600 L-400,2600 Z`} fill={SNOW2} opacity={0.6} />
    {Array.from({ length: 9 }, (_, i) => (
      <ellipse key={i} cx={-250 + i * 190} cy={y + 70 + ((i * 83) % 240)} rx={70} ry={20} fill="#6c737b" opacity={0.85} />
    ))}
  </Svg>
);

// ============ S1 HOOK WIDE: the frozen waterfall, Tom walks towards it (0 - 3.3) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.02, 1.1, t / 3.3), rot: hh.rot };
  const g = 1520;
  const ph = t * 3;
  const p: HikerProps = { x: 250 + t * 70, y: g + 140, scale: 2.0, phase: ph, walk: 0.7, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={1000} t={t} />
      <Plane cam={cam} depth={0.8} blur={1.2}>
        <Svg>
          <FrozenFall cx={640} top={620} bot={1440} w={340} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <SnowFloor y={g} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={TOM} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0] + 120} y={300} strength={0.3} col="255,248,225" />
      <Particles seed={1141} n={22} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={900} sunY={320} warm="245,240,228" cool="40,60,90" />
      <Title text={"Don't stand\nunder a\nfrozen\nwaterfall."} t={t} t0={0} top={120} size={124} />
    </AbsoluteFill>
  );
};

// ============ S1b MEDIUM: right at the base, phone up for the photo (3.3 - 6.45) ============
const S1b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y - lt * 10, zoom: mix(1.0, 1.08, lt / 3.15), rot: hh.rot };
  const g = 1560;
  const p: HikerProps = { x: 330, y: g + 120, scale: 2.4, walk: 0, lean: -0.08, poles: false, handOverride: [70, -120], breathe: Math.sin(t * 2.4) * 1.5 };
  const [hx, hy] = handAt(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={900} t={t} blur={6} />
      <Plane cam={cam} depth={0.92}>
        <Svg>
          <FrozenFall cx={700} top={-80} bot={1500} w={520} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <SnowFloor y={g} />
        <Subject rimX={5} col="rgba(230,240,255,0.8)">
          <Person {...p} outfit={TOM} expression="happy" />
          <Phone x={hx} y={hy - 10} s={2.4} />
        </Subject>
      </Plane>
      <Particles seed={1142} n={14} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={900} sunY={300} warm="240,240,235" cool="40,60,90" />
      <Chip text="Right under it" t={t} t0={3.6} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: looking up, the lip cracks and a chunk lets go (6.45 - 8.3) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = t > 7.6 ? Math.max(0, 1 - (t - 7.6) * 2.5) : 0;
  const hh = handheld(t, 0.3, shake * 3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 1.85), rot: hh.rot };
  const crack = at(t, [6.6, 7.5], [0, 1]);
  const fall = at(t, [7.6, 8.3], [0, 1], (x) => x * x);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={2400} t={t} blur={4} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <g transform="translate(540,960) scale(1.3) translate(-540,-608)">
            <FrozenFall cx={540} top={300} bot={1400} w={420} t={t} crack={crack} gone={t > 7.6 ? 1 : 0} />
          </g>
          {t > 7.6 && (
            <g transform={`translate(${700 + fall * 60},${640 + fall * 1300}) rotate(${fall * 70}) scale(1.4)`}>
              <path d="M-90,-40 L90,-50 L70,40 L30,220 L-10,60 L-40,180 L-70,30 Z" fill="#d6ecf7" stroke="#6f9fb8" strokeWidth={6} />
            </g>
          )}
          {t > 7.6 &&
            Array.from({ length: 10 }, (_, i) => {
              const k = Math.min(1, fall * 1.2);
              return <circle key={i} cx={700 + Math.sin(i * 3.1) * 140 * k} cy={640 + k * (800 + (i % 4) * 160)} r={8 + (i % 3) * 5} fill="#cde4f0" opacity={1 - k * 0.6} />;
            })}
        </Svg>
      </Plane>
      <Particles seed={1143} n={10} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={860} sunY={260} warm="240,240,235" cool="40,60,90" vignette={0.55} />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: it smashes on the rocks a few feet from Tom (8.3 - 10.83) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = Math.max(0, 1 - lt * 2);
  const hh = handheld(t, 0.4, shake * 6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.12, 1.04]), rot: hh.rot };
  const g = 1560;
  const back = at(t, [8.4, 9.0], [0, 1]);
  const p: HikerProps = { x: 640 + back * 90, y: g + 120, scale: 2.4, walk: 0, lean: -0.2 * back, poles: false, handOverride: [60, -60], breathe: Math.sin(t * 6) * 2 };
  const [hx, hy] = handAt(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={900} t={t} blur={6} />
      <Plane cam={cam} depth={0.92}>
        <Svg>
          <FrozenFall cx={420} top={-120} bot={1500} w={520} t={t} gone={1} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <SnowFloor y={g} />
        <Svg>
          {/* shattered ice on the rocks */}
          {Array.from({ length: 16 }, (_, i) => {
            const k = at(lt, [0, 0.7], [0, 1]);
            const a = (i / 16) * Math.PI - Math.PI;
            const r = 40 + k * (120 + (i % 4) * 50);
            return <path key={i} d="M-20,-10 L18,-16 L24,12 L-10,20 Z" fill="#cfe6f2" stroke="#6f9fb8" strokeWidth={4} transform={`translate(${280 + Math.cos(a) * r},${g + 60 + Math.sin(a) * r * 0.6 + k * k * 60}) rotate(${i * 40 + k * 120}) scale(${1 + (i % 3) * 0.5})`} />;
          })}
          <ellipse cx={280} cy={g + 70} rx={170} ry={40} fill="#5f666e" />
        </Svg>
        <Subject rimX={5} col="rgba(230,240,255,0.8)">
          <Person {...p} outfit={TOM} expression="tired" />
          <Phone x={hx} y={hy} s={2.4} rot={20} />
        </Subject>
      </Plane>
      <Particles seed={1144} n={18} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={900} sunY={300} warm="240,240,235" cool="40,60,90" />
      <Chip text="A few feet away" t={t} t0={9.2} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: sun on the ice, meltwater dripping (10.83 - 16.46) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x - lt * 8, y: hh.y + lt * 6, zoom: mix(1.02, 1.12, lt / 5.63), rot: hh.rot };
  const sun = at(t, [12.6, 14.0], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={2400} t={t} blur={6} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <g transform="translate(540,960) scale(1.4) translate(-540,-486)">
            <FrozenFall cx={540} top={300} bot={1500} w={460} t={t} drip={sun} />
          </g>
        </Svg>
      </Plane>
      <Rays x={900} y={160} strength={0.15 + 0.35 * sun} col="255,240,200" />
      <Particles seed={1145} n={16} col="#fff6dc" fall={6} />
      <LowScrim />
      <Grade sunX={900} sunY={180} warm="255,236,200" cool="40,60,90" vignette={0.5} />
      <Chip text="Ice can drop without warning" t={t} t0={11.2} x={60} y={200} icon="x" big />
      <Chip text="More when the sun warms it" t={t} t0={13.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: thin ice at the base, water running under it (16.46 - 19.69) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.0, 1.08, lt / 3.23), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#1d2a33" }}>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={700} t={t} blur={10} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* dark water, seen through clear ice */}
          <rect x={-200} y={820} width={1500} height={1300} fill="#1f4a5e" />
          {Array.from({ length: 14 }, (_, i) => {
            const k = (t * 0.45 + i / 14) % 1;
            const y = 900 + (i % 7) * 140;
            return <path key={i} d={`M${-200 + k * 1500},${y} q60,-18 120,0 t120,0`} stroke="#5d97b0" strokeWidth={8} fill="none" opacity={0.7} />;
          })}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const k = (t * 0.3 + i / 6) % 1;
            return <circle key={i} cx={-100 + k * 1300} cy={960 + (i % 3) * 300} r={14} fill="#bfe3f2" opacity={0.6} />;
          })}
          {/* the ice sheet on top */}
          <rect x={-200} y={820} width={1500} height={1300} fill="#d9eef7" opacity={0.42} />
          <path d="M-200,820 L1300,820 L1300,850 L-200,850 Z" fill="#f4fbff" />
          {/* cracks */}
          <path d="M200,880 l120,140 l-40,120 l150,160 M620,860 l-60,180 l110,90 l-30,200 M880,900 l-90,140 l70,70" stroke="#ffffff" strokeWidth={6} fill="none" opacity={0.8} />
          {/* snow bank on top */}
          <path d="M-200,820 Q300,690 700,760 Q1000,800 1300,700 L1300,-200 L-200,-200 Z" fill={SNOW} />
        </Svg>
      </Plane>
      <Particles seed={1146} n={12} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={860} sunY={260} warm="240,240,235" cool="30,60,90" vignette={0.55} />
      <Chip text="Water runs under the ice" t={t} t0={16.8} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S6 PAYOFF WIDE: Tom takes the photo from the trail, well back (19.69 - 23.1) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1560;
  const p: HikerProps = { x: 300, y: g + 130, scale: 2.3, walk: 0, lean: -0.04, poles: false, handOverride: [70, -120], breathe: Math.sin(t * 2.2) * 1.5 };
  const [hx, hy] = handAt(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="g" treeY={1080} t={t} />
      <Plane cam={cam} depth={0.7} blur={1.5}>
        <Svg>
          <g transform="translate(760,1150) scale(0.5) translate(-640,-1440)">
            <FrozenFall cx={640} top={500} bot={1440} w={360} t={t} />
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <SnowFloor y={g} />
        <Svg>
          <path d={`M-200,${g + 40} Q500,${g + 10} 1400,${g + 60}`} stroke="#c9a77c" strokeWidth={60} fill="none" opacity={0.5} />
        </Svg>
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={TOM} expression="happy" />
          <Phone x={hx} y={hy - 10} s={2.3} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 120} strength={0.35} col="255,236,200" />
      <Particles seed={1147} n={22} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={520} warm="255,226,180" />
      <Chip text="Photo from a distance" t={t} t0={19.8} x={60} y={200} icon="check" big />
      <Chip text="Stay off the ice" t={t} t0={21.4} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S7: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-safety-guide.jpg"
      photoH={800}
      spec="10 CHAPTERS · PRINT + PHONE PDF"
      name={
        <>
          Hiking Safety
          <br />
          Guide
        </>
      }
      nameSize={104}
      price="$8.99"
      save="Save this before your next winter hike"
    />
  );
};

export const V114: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.35} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.3} to={6.5} fadeIn={0.06} fadeOut={0.08}>
      <S1b off={3.3} />
    </Scene>
    <Scene from={6.45} to={8.35} fadeIn={0.06} fadeOut={0.05}>
      <S2 off={6.45} />
    </Scene>
    <Scene from={8.3} to={10.88} fadeIn={0.03} fadeOut={0.08}>
      <S3 off={8.3} />
    </Scene>
    <Scene from={10.83} to={16.51} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={10.83} />
    </Scene>
    <Scene from={16.46} to={19.74} fadeIn={0.08} fadeOut={0.1}>
      <S5 off={16.46} />
    </Scene>
    <Scene from={19.69} to={23.2} fadeIn={0.12} fadeOut={0.12}>
      <S6 off={19.69} />
    </Scene>
    <Scene from={22.9} to={27.5} fadeOut={0}>
      <S7 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 6.45, 1560],
        [6.45, 10.83, 1560],
        [10.83, 16.46, 1560],
        [16.46, 19.69, 1560],
        [19.69, 22.9, 1560],
      ]}
    />
  </AbsoluteFill>
);
