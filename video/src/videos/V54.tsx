import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v54.json";

const words = vo.words as unknown as Word[];

const AFTER_RAIN: Palette = {
  sky: ["#5e7690", "#b2bec6", "#e2e3dc"],
  sun: { x: 800, y: 660, r: 44, color: "#f6f4ec", glow: "#e6e4dc" },
  layers: ["#b4b9b4", "#9aa498", "#7f8c78", "#68765f", "#55624c"],
  mist: "#e8eae4",
};
const FALL: Palette = {
  sky: ["#3c72aa", "#b2cfe6", "#f5efdc"],
  sun: { x: 820, y: 700, r: 58, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#c9c6b4", "#b9a37e", "#a2845c", "#876a45", "#6c5436"],
  mist: "#f3ecdc",
};

const JAKE2: Outfit = {
  ...JAKE,
  jacket: "#3E5F4B",
  jacketShade: "#2E4A39",
  cap: "#B5553A",
  capShade: "#8E3F2A",
  pack: "#4E6B8A",
  packShade: "#3a536c",
};

const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <g>
    {Array.from({ length: 8 }, (_, i) => {
      const x = ((((-120 + i * 190 - shift) % 1520) + 1520) % 1520) - 220;
      return i % 3 === 1 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 18} h={500} c="#3b6550" c2="#2b4d3c" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={420 + (i % 3) * 50} c={i % 2 ? "#d9963a" : "#b9582c"} c2={i % 2 ? "#b77a28" : "#94461f"} />
      );
    })}
  </g>
);
const Bank: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={-300} y={y - 40} width={1700} height={700} fill="#7a7444" />
    <rect x={-300} y={y + 10} width={1700} height={700} fill="#6a5a40" />
  </g>
);
// Creek band: drawn twice, back (body of water) and front (surface over the legs).
const Water: React.FC<{ y: number; t: number; fast?: number; front?: boolean; depth?: number }> = ({ y, t, fast = 1, front, depth = 420 }) => {
  const flow = t * 260 * fast;
  return (
    <g opacity={front ? 0.82 : 1}>
      <rect x={-300} y={y} width={1700} height={depth} fill={front ? "#6f9db5" : "#4f7f99"} />
      {Array.from({ length: 10 }, (_, i) => {
        const x = ((((i * 197 + flow) % 1500) + 1500) % 1500) - 250;
        const yy = y + 30 + (i % 4) * (depth / 5);
        return <path key={i} d={`M${x},${yy} q30,-12 60,0 q30,12 60,0`} stroke="#d8ecf4" strokeWidth={6} fill="none" opacity={front ? 0.9 : 0.5} strokeLinecap="round" />;
      })}
      {front && <path d={`M-300,${y} Q0,${y - 10} 300,${y} T900,${y} T1500,${y}`} stroke="#e6f3f8" strokeWidth={8} fill="none" />}
    </g>
  );
};
// Hip belt: buckled at the front, or two loose straps when unclipped.
const HipBelt: React.FC<{ p: HikerProps; buckled: boolean }> = ({ p, buckled }) => {
  const g = hikerGeometry(p);
  const h = g.hip;
  return (
    <g transform={hikerTransform(p)}>
      {buckled ? (
        <g>
          <rect x={h[0] - 30} y={h[1] - 14} width={66} height={12} rx={4} fill="#222" />
          <rect x={h[0] + 22} y={h[1] - 18} width={20} height={20} rx={4} fill="#111" />
        </g>
      ) : (
        <g>
          <rect x={h[0] + 14} y={h[1] - 12} width={10} height={44} rx={4} fill="#222" transform={`rotate(-10 ${h[0] + 18} ${h[1] - 12})`} />
          <rect x={h[0] - 22} y={h[1] - 12} width={10} height={38} rx={4} fill="#222" transform={`rotate(12 ${h[0] - 18} ${h[1] - 12})`} />
        </g>
      )}
    </g>
  );
};
const Splash: React.FC<{ x: number; y: number; k: number }> = ({ x, y, k }) =>
  k <= 0 || k >= 1 ? null : (
    <g opacity={1 - k}>
      {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
        <circle key={i} cx={x + i * 40 * (0.5 + k)} cy={y - Math.sin((i + 3.5) / 7 * Math.PI) * 160 * k} r={12 - Math.abs(i)} fill="#e6f3f8" />
      ))}
    </g>
  );
// Yellow roll-top dry bag.
const DryBag: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-34} y={-70} width={68} height={120} rx={24} fill="#F2C531" />
    <rect x={8} y={-70} width={26} height={120} rx={12} fill="#D9AC1E" />
    <rect x={-38} y={-84} width={76} height={22} rx={8} fill="#E8BA28" />
    <rect x={-10} y={-100} width={20} height={22} rx={4} fill="#222" />
  </g>
);

// ============ S1 HOOK: at the high creek (0 - 3.25) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1700;
  const ph = t * 3.6;
  const walking = t < 2.2;
  const p: HikerProps = walking
    ? { x: 200 + t * 80, y: groundY + 30, scale: 1.5, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.7) }
    : { x: 376, y: groundY + 30, scale: 1.5, walk: 0, lean: 0.06, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={AFTER_RAIN}
        camX={t * 10}
        zoom={mix(1.03, 1.1, t / 3.25)}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={t * 15} />
            <Bank y={groundY} />
            <Water y={groundY + 10} t={t} fast={1.6} />
            <rect x={-300} y={groundY - 40} width={780} height={700} fill="#7a7444" />
            <Person {...p} outfit={JAKE2} expression="neutral" />
            <HipBelt p={p} buckled />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={1000} />
      <Title text={"He crossed the\ncreek with his\nhip belt buckled"} t={t} t0={0} top={130} size={128} />
      <Chip text="High after the rain" t={t} t0={1.9} x={80} y={590} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: buckled in, slips (3.2 - 8.3) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  const slip = at(t, [5.6, 5.9], [0, 1]) * at(t, [6.6, 7.2], [1, 0.4]);
  const ph = lt * 2.4;
  const p: HikerProps = {
    x: 420 + Math.min(lt, 2.3) * 40,
    y: groundY + 130 + slip * 70,
    scale: 1.5,
    phase: ph,
    walk: t < 5.6 ? 0.35 : 0,
    lean: 0.06 + slip * 0.5,
    poles: false,
    handOverride: slip > 0.2 ? [70, -60] : freeHand(ph, 0.35),
  };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={AFTER_RAIN}
        camX={lt * 6}
        zoom={mix(1.06, 1.12, lt / 5.1)}
        dim={0.05}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={400} />
            <Bank y={groundY} />
            <Water y={groundY + 10} t={t} fast={1.6} depth={520} />
            <Person {...p} outfit={JAKE2} expression={t > 5.6 ? "tired" : "neutral"} />
            <HipBelt p={p} buckled />
            <Water y={groundY + 70} t={t} fast={1.6} front depth={460} />
            <Splash x={p.x + 30} y={groundY + 80} k={(t - 5.62) / 0.8} />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim h={900} />
      <Chip text="Pack buckled tight" t={t} t0={4.45} x={80} y={220} icon="x" />
      <Chip text="One slip" t={t} t0={5.67} x={80} y={320} icon="x" />
      <Chip text="Spare layers: soaked" t={t} t0={6.5} x={80} y={420} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a FIX: wide, slow, shallow spot (8.25 - 11.9) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={FALL}
        camX={lt * 8}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={800 + lt * 10} />
            <Bank y={groundY} />
            <Water y={groundY + 20} t={t} fast={0.4} depth={300} />
            {[0, 1, 2, 3].map((i) => (
              <ellipse key={i} cx={420 + i * 150} cy={groundY + 60 + (i % 2) * 40} rx={50} ry={16} fill="#8a8a7c" />
            ))}
            <rect x={-300} y={groundY + 300} width={1700} height={400} fill="#6a5a40" />
            <Person x={200} y={groundY + 30} scale={1.5} walk={0} lean={0.04} poles={false} handOverride={[56, -50]} outfit={JAKE2} expression="happy" breathe={Math.sin(t * 2.3) * 2} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Here's\nthe fix."} t={t} t0={8.4} t1={9.28} top={200} size={160} />
      <Chip text="Wide" t={t} t0={9.93} x={80} y={220} icon="check" big />
      <Chip text="Slow" t={t} t0={10.4} x={80} y={340} icon="check" big />
      <Chip text="Shallow" t={t} t0={10.74} x={80} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3b FIX: unclip, face upstream, use a pole (11.85 - 17.2) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  const unclipped = t >= 12.6;
  const p: HikerProps = {
    x: 600 - lt * 12,
    y: groundY + 90,
    scale: 1.5,
    phase: lt * 1.6,
    walk: 0.2,
    lean: 0.1,
    poles: t >= 16.2,
    handOverride: t >= 16.2 ? null : unclipped && t < 13.4 ? [16, -14] : [30, 34],
    breathe: Math.sin(t * 2.2) * 2,
  };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={FALL}
        camX={lt * 6}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={1100} />
            <Bank y={groundY} />
            <Water y={groundY + 20} t={t} fast={0.6} depth={360} />
            <Person {...p} outfit={JAKE2} expression="happy" flip />
            <g transform={`translate(${2 * p.x},0) scale(-1,1)`}>
              <HipBelt p={p} buckled={!unclipped} />
            </g>
            <Water y={groundY + 25} t={t} fast={0.6} front depth={360} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Chip text="Hip belt unclipped" t={t} t0={11.89} x={80} y={220} icon="check" big />
      <Chip text="So you can drop the pack" t={t} t0={13.56} x={80} y={350} icon="check" />
      <Chip text="Face upstream" t={t} t0={15.19} x={80} y={450} icon="check" />
      <Chip text="Use a pole" t={t} t0={16.11} x={80} y={550} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S3c FIX: fast or above your knees, turn back (17.15 - 20.5) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  const back = t > 19.48;
  const ph = (t - 19.48) * 3.4;
  const p: HikerProps = back
    ? { x: 330 - (t - 19.48) * 60, y: groundY + 30, scale: 1.5, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6) }
    : { x: 330, y: groundY + 30, scale: 1.5, walk: 0, lean: 0.04, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l5"
        pal={AFTER_RAIN}
        camX={lt * 6}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={200} />
            <Bank y={groundY} />
            <Water y={groundY + 10} t={t} fast={2.2} depth={600} />
            <rect x={-300} y={groundY - 40} width={760} height={700} fill="#7a7444" />
            <Person {...p} outfit={JAKE2} expression="neutral" flip={back} />
            <HipBelt p={p} buckled={false} />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim h={900} />
      <Chip text="Fast water?" t={t} t0={18.13} x={80} y={220} icon="x" />
      <Chip text="Above your knees?" t={t} t0={18.57} x={80} y={320} icon="x" />
      <Readout label="THEN" value="TURN BACK" ok={null} t={t} t0={19.48} x={80} y={440} pulseAt={19.48} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: dry layers in a dry bag (20.45 - 22.8) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1720;
  const p: HikerProps = { x: 480, y: groundY + 40, scale: 1.6, walk: 0, lean: 0.04, poles: false, handOverride: [80, 10], breathe: Math.sin(t * 2.4) * 2 };
  const g = hikerGeometry(p);
  const hand = g.arms[1].hand;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l6"
        pal={FALL}
        camX={lt * 20}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={500 + lt * 20} />
            <Bank y={groundY} />
            <Person {...p} outfit={JAKE2} expression="happy" />
            <HipBelt p={p} buckled />
            <g transform={hikerTransform(p)}>
              <DryBag x={hand[0] + 14} y={hand[1] - 16} s={1} rot={-6} />
            </g>
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={800} />
      <Title text={"Dry layers\nin a dry bag."} t={t} t0={off + 0.1} top={190} size={150} />
      <Chip text="Across, and still dry" t={t} t0={21.45} x={80} y={540} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/waterproof-dry-bag-card.jpg"
      spec="ROLL-TOP · TAPED SEAMS · 3L TO 75L"
      name={
        <>
          Waterproof
          <br />
          Dry Bag
        </>
      }
      nameSize={104}
      price="from $16.99"
      save="Save this before your next fall hike"
    />
  );
};

export const V54: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={3.25} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={3.2} to={8.3}>
        <S2 off={3.2} />
      </Scene>
      <Scene from={8.25} to={11.9}>
        <S3a off={8.25} />
      </Scene>
      <Scene from={11.85} to={17.2}>
        <S3b off={11.85} />
      </Scene>
      <Scene from={17.15} to={20.5}>
        <S3c off={17.15} />
      </Scene>
      <Scene from={20.45} to={22.8} fadeIn={0.12}>
        <S4 off={20.45} />
      </Scene>
      <Scene from={22.75} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions
        words={words}
        windows={[
          [0.3, 3.2, 960],
          [3.2, 8.25, 960],
          [8.25, 11.85, 960],
          [11.85, 17.15, 960],
          [17.15, 20.45, 960],
          [20.45, 22.75, 900],
        ]}
      />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
