import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, GUIDE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v20.json";

const words = vo.words as unknown as Word[];

const RIDGE: Palette = {
  sky: ["#4f86b8", "#a9cbe0", "#eef1e4"],
  sun: { x: 820, y: 420, r: 64, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#a4b8c8", "#8aa2b4", "#6e8796", "#566f62", "#46594c"],
  mist: "#eef3f2",
};
const VALLEY: Palette = {
  sky: ["#6f9cc4", "#b9d2e2", "#e8eee6"],
  sun: { x: 220, y: 520, r: 56, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#9fb4c4", "#86a0b0", "#6f8a8a", "#5b7550", "#4a6040"],
  mist: "#eef3f2",
};

const NORA: Outfit = {
  ...GUIDE,
  skin: "#E8B494",
  skinShade: "#C9947A",
  hair: "#8a4a2a",
  ponytail: "#8a4a2a",
  beard: null,
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#C2662E",
  jacketShade: "#9B4E20",
  pants: "#3f4650",
  pantsShade: "#2e343c",
  pack: "#2F5D7C",
  packShade: "#234862",
};
const PARTNER: Outfit = {
  ...GUIDE,
  hair: "#1d1612",
  beard: null,
  skin: "#7A4E36",
  skinShade: "#5E3B28",
  jacket: "#4B5D8A",
  jacketShade: "#3A4A6E",
  cap: "#B9B2A0",
  capShade: "#99927f",
  pack: "#7B3A2F",
  packShade: "#5E2C24",
};

// hand position in world coords for a Person
const handAt = (x: number, y: number, s: number, h: [number, number], flip = false): [number, number] => [x + (flip ? -1 : 1) * h[0] * s, y + s * (h[1] - 182)];

const Bottle: React.FC<{ x: number; y: number; s?: number; rot?: number; empty?: boolean }> = ({ x, y, s = 1, rot = 0, empty }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-16} y={-70} width={32} height={86} rx={10} fill="#d7e8ef" stroke="#5f7f99" strokeWidth={3} />
    {!empty && <rect x={-13} y={-30} width={26} height={43} rx={7} fill="#6fb0d6" />}
    <rect x={-11} y={-84} width={22} height={16} rx={4} fill="#3E4F5C" />
  </g>
);

const Pines: React.FC<{ y: number; shift: number; h?: number }> = ({ y, shift, h = 460 }) => (
  <g>
    {Array.from({ length: 8 }, (_, i) => (
      <Pine key={i} x={-120 + i * 190 - shift} y={y} h={h + (i % 2) * 70} c={i % 2 ? "#2f5a43" : "#3a6a4e"} c2="#254a37" />
    ))}
  </g>
);

const Creek: React.FC<{ y: number; t: number }> = ({ y, t }) => (
  <g>
    <path d={`M-300,${y - 30} Q540,${y - 60} 1400,${y - 30} L1400,${y + 150} Q540,${y + 120} -300,${y + 150} Z`} fill="#5d9fc2" />
    <path d={`M-300,${y - 30} Q540,${y - 60} 1400,${y - 30} L1400,${y - 10} Q540,${y - 40} -300,${y - 10} Z`} fill="#8cc4dc" opacity={0.6} />
    {[0, 1, 2, 3, 4].map((i) => (
      <path
        key={i}
        d={`M${-200 + ((i * 330 + t * 160) % 1700)},${y + 20 + (i % 3) * 34} q40,-10 80,0`}
        stroke="#e2f2f8"
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
        opacity={0.75}
      />
    ))}
    {[120, 520, 960].map((x, i) => (
      <ellipse key={x} cx={x} cy={y + 60 + (i % 2) * 40} rx={60} ry={18} fill="#8d8a80" />
    ))}
  </g>
);

// ============ S1 HOOK: empty bottle on the ridge (0 - 3.3) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1640;
  const s = 1.75;
  const x = 360;
  const tip = at(t, [1.9, 2.5], [0, 1], outExpo);
  const hand: [number, number] = [mix(22, 92, tip), mix(34, -110, tip)];
  const [bx, by] = handAt(x, groundY + 60, s, hand);
  return (
    <AbsoluteFill>
      <Landscape
        uid="w1"
        pal={RIDGE}
        camX={t * 8}
        zoom={mix(1.03, 1.08, t / 3.3)}
        foreground={
          <g>
            <path d={`M-300,2200 L-300,${groundY - 30} Q540,${groundY - 110} 1400,${groundY - 10} L1400,2200 Z`} fill="#7d7a52" />
            <path d={`M-300,${groundY + 20} Q540,${groundY - 40} 1400,${groundY + 40} L1400,${groundY + 130} Q540,${groundY + 60} -300,${groundY + 120} Z`} fill="#b39a72" />
            <Person x={x} y={groundY + 60} scale={s} walk={0} lean={0.04} poles={false} handOverride={hand} outfit={NORA} expression={t < 2.4 ? "neutral" : "tired"} breathe={Math.sin(t * 2.5) * 2} />
            <Bottle x={bx + 6} y={by + 20} s={1.4} rot={mix(0, 160, tip)} empty />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim />
      <Title text={"That stream\nlooks clean.\nIt isn't."} t={t} t0={0} top={190} size={140} />
      <Readout label="BOTTLE" value="EMPTY" ok={false} t={t} t0={2.4} t1={3.3} x={80} y={640} />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: the clear creek (3.2 - 8.8) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1620;
  const bend = at(t, [5.6, 6.3], [0, 1], outExpo) * at(t, [7.7, 8.2], [1, 0.35]);
  const px = at(t, [6.8, 7.8], [1300, 860], outExpo);
  const pWalk = t > 6.8 && t < 7.8 ? 0.8 : 0;
  const stopHand: [number, number] = [118, -70];
  return (
    <AbsoluteFill>
      <Landscape
        uid="w2"
        pal={VALLEY}
        camX={30 + lt * 6}
        zoom={mix(1.0, 1.05, lt / 5.6)}
        foreground={
          <g>
            <Pines y={groundY - 130} shift={80} h={430} />
            <rect x={-300} y={groundY - 140} width={1700} height={700} fill="#6a7a40" />
            <path d={`M-300,${groundY - 20} Q540,${groundY - 40} 1400,${groundY - 20} L1400,${groundY + 90} Q540,${groundY + 70} -300,${groundY + 90} Z`} fill="#a88a62" />
            <Creek y={groundY + 150} t={t} />
            <path d={`M-300,${groundY + 290} Q540,${groundY + 260} 1400,${groundY + 290} L1400,2200 L-300,2200 Z`} fill="#5f6e3c" />
            <Person
              x={380}
              y={groundY + 60}
              scale={1.75}
              walk={0}
              lean={mix(0.06, 0.42, bend)}
              poles={false}
              handOverride={[mix(22, 96, bend), mix(34, 60, bend)]}
              outfit={NORA}
              expression={t > 7.7 ? "neutral" : "happy"}
              breathe={Math.sin(t * 2) * 2}
            />
            <Person
              x={px}
              y={groundY + 60}
              scale={1.75}
              phase={t * 5}
              walk={pWalk}
              lean={0.06}
              poles={false}
              handOverride={t > 7.6 ? stopHand : freeHand(t * 5, pWalk)}
              outfit={PARTNER}
              flip
              expression="neutral"
            />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Chip text="Looks crystal clear" t={t} t0={4.68} t1={8.8} x={80} y={560} icon="none" />
      <Chip text="Wait. Don't drink that." t={t} t0={7.71} t1={8.8} x={80} y={660} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 WHAT YOU CAN'T SEE (8.7 - 12.9) ============
const Microbes: React.FC<{ t: number; r: number }> = ({ t, r }) => (
  <g>
    {Array.from({ length: 14 }, (_, i) => {
      const a = i * 2.39996;
      const d = (0.2 + ((i * 37) % 70) / 100) * r * 0.85;
      const x = Math.cos(a + t * 0.3 * (i % 2 ? 1 : -1)) * d;
      const y = Math.sin(a + t * 0.3 * (i % 2 ? 1 : -1)) * d;
      const rot = (a * 180) / Math.PI + t * 30;
      return i % 3 === 0 ? (
        <g key={i} transform={`translate(${x},${y}) rotate(${rot})`}>
          <ellipse cx={0} cy={0} rx={30} ry={18} fill="#9bc46a" stroke="#5d7f3a" strokeWidth={4} />
          <path d={`M-30,0 q-18,${Math.sin(t * 8 + i) * 10} -36,0`} stroke="#5d7f3a" strokeWidth={4} fill="none" strokeLinecap="round" />
        </g>
      ) : (
        <g key={i} transform={`translate(${x},${y}) rotate(${rot})`}>
          <rect x={-22} y={-9} width={44} height={18} rx={9} fill="#d98a6a" stroke="#a65a3e" strokeWidth={4} />
        </g>
      );
    })}
  </g>
);

const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1620;
  const lens = at(lt, [0.3, 1.0], [0, 1], outExpo);
  const cx = 600;
  const cy = 1260;
  const R = 300 * lens;
  return (
    <AbsoluteFill>
      <Landscape
        uid="w3"
        pal={VALLEY}
        camX={60 + lt * 5}
        zoom={1.05}
        foreground={
          <g>
            <Pines y={groundY - 130} shift={120} h={430} />
            <rect x={-300} y={groundY - 140} width={1700} height={700} fill="#6a7a40" />
            <path d={`M-300,${groundY - 20} Q540,${groundY - 40} 1400,${groundY - 20} L1400,${groundY + 90} Q540,${groundY + 70} -300,${groundY + 90} Z`} fill="#a88a62" />
            <Creek y={groundY + 150} t={t} />
            <path d={`M-300,${groundY + 290} Q540,${groundY + 260} 1400,${groundY + 290} L1400,2200 L-300,2200 Z`} fill="#5f6e3c" />
            <defs>
              <clipPath id="lensclip">
                <circle cx={cx} cy={cy} r={Math.max(1, R)} />
              </clipPath>
            </defs>
            <line x1={cx + R * 0.7} y1={cy + R * 0.7} x2={cx + R * 1.15} y2={cy + R * 1.15} stroke="#3a3a38" strokeWidth={34} strokeLinecap="round" opacity={lens} />
            <g clipPath="url(#lensclip)">
              <rect x={cx - 320} y={cy - 320} width={640} height={640} fill="#7dbad8" />
              <g transform={`translate(${cx},${cy})`} opacity={at(lt, [0.8, 1.3], [0, 1])}>
                <Microbes t={t} r={300} />
              </g>
            </g>
            <circle cx={cx} cy={cy} r={Math.max(1, R)} fill="none" stroke="#f5f1ea" strokeWidth={18} opacity={lens} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Chip text="Bacteria" t={t} t0={10.29} t1={12.9} x={80} y={560} icon="x" />
      <Chip text="Parasites" t={t} t0={10.98} t1={12.9} x={80} y={660} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S4 FIX (12.8 - 22.2) ============
const Straw: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-34} y={-150} width={68} height={300} rx={30} fill="#2F6E9A" />
    <rect x={-34} y={-150} width={22} height={300} rx={11} fill="#3d84b5" opacity={0.6} />
    <rect x={-38} y={-160} width={76} height={44} rx={14} fill="#3a3a38" />
    <rect x={-14} y={-196} width={28} height={44} rx={10} fill="#3a3a38" />
    <rect x={-38} y={116} width={76} height={44} rx={14} fill="#3a3a38" />
    {[-60, -30, 0, 30, 60].map((yy) => (
      <rect key={yy} x={-26} y={yy} width={52} height={4} rx={2} fill="rgba(255,255,255,0.25)" />
    ))}
  </g>
);

const StrawCard: React.FC<{ t: number; t0: number; t1: number; x: number; y: number }> = ({ t, t0, t1, x, y }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      padding: "18px 26px 20px",
      borderRadius: 22,
      background: "#fff",
      boxShadow: "0 14px 40px rgba(0,0,0,0.25)",
      opacity: at(t, [t0, t0 + 0.3], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]),
      scale: `${at(t, [t0, t0 + 0.4], [0.85, 1], outExpo)}`,
      rotate: `${Math.sin(t * 2.2) * 2}deg`,
      transformOrigin: "50% 0%",
    }}
  >
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 30, letterSpacing: 3, color: "#6b6b66" }}>FILTER STRAW</div>
    <svg width={240} height={300} viewBox="0 0 240 300">
      <Straw x={120} y={160} s={0.62} rot={18} />
      {[0, 1, 2].map((i) => {
        const k = ((t * 0.8 + i * 0.33) % 1 + 1) % 1;
        return <path key={i} d={`M${70 + i * 16},${250 - k * 60} q-8,12 0,18 q8,-6 0,-18 Z`} fill="#6fb0d6" opacity={1 - k} />;
      })}
    </svg>
  </div>
);

const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1620;
  const scroll = lt * 36;
  return (
    <AbsoluteFill>
      <Landscape
        uid="w4"
        pal={VALLEY}
        camX={scroll * 0.3}
        foreground={
          <g>
            <Pines y={groundY - 130} shift={(scroll * 0.6) % 380} h={470} />
            <rect x={-300} y={groundY - 140} width={1700} height={700} fill="#6a7a40" />
            <path d={`M-300,${groundY - 20} Q540,${groundY - 40} 1400,${groundY - 20} L1400,${groundY + 90} Q540,${groundY + 70} -300,${groundY + 90} Z`} fill="#a88a62" />
            <Creek y={groundY + 150} t={t * 1.6} />
            <path d={`M-300,${groundY + 290} Q540,${groundY + 260} 1400,${groundY + 290} L1400,2200 L-300,2200 Z`} fill="#5f6e3c" />
            <Person x={340} y={groundY + 60} scale={1.75} phase={t * 4.4} walk={0.75} lean={0.14} poles={false} handOverride={freeHand(t * 4.4, 0.75)} outfit={NORA} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Title text={"Here's\nthe fix."} t={t} t0={12.9} t1={14.05} top={200} size={160} />
      <Chip text="Drink through a filter straw" t={t} t0={14.7} t1={22.1} x={80} y={420} icon="check" />
      <Chip text="Or filter as you fill" t={t} t0={16.52} t1={22.1} x={80} y={520} icon="check" />
      <Chip text="Pick flowing water" t={t} t0={19.25} t1={22.1} x={80} y={620} icon="check" />
      <Chip text="Away from trails and camps" t={t} t0={20.28} t1={22.1} x={80} y={720} icon="check" />
      <StrawCard t={t} t0={15.1} t1={22.1} x={720} y={1060} />
    </AbsoluteFill>
  );
};

// ============ S5 PAYOFF (22.1 - 24.5) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const crestY = 1560;
  return (
    <AbsoluteFill>
      <Landscape
        uid="w5"
        pal={GOLDEN}
        camX={lt * 18}
        zoom={at(lt, [0, 0.9], [1.25, 1.06], outExpo)}
        foreground={
          <g>
            <Pines y={crestY + 40} shift={lt * 10} h={380} />
            <path d={`M-300,2200 L-300,${crestY + 60} Q540,${crestY - 10} 1400,${crestY + 60} L1400,2200 Z`} fill="#8a7a40" />
            <path d={`M-300,${crestY + 110} Q540,${crestY + 40} 1400,${crestY + 110} L1400,${crestY + 190} Q540,${crestY + 120} -300,${crestY + 190} Z`} fill="#c7a77a" />
            <Person x={480} y={crestY + 120} scale={1.7} phase={lt * 4.2} walk={0.7} lean={0.12} poles={false} handOverride={freeHand(lt * 4.2, 0.7)} outfit={NORA} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"The hike\ngoes on."} t={t} t0={off + 0.12} top={200} size={180} />
    </AbsoluteFill>
  );
};

// ============ S6 END CARD ============
const StrawArt: React.FC<{ lt: number }> = ({ lt }) => {
  const s = at(lt, [0.2, 1.1], [0.85, 1], outExpo);
  const o = at(lt, [0.1, 0.5], [0, 1]);
  return (
    <g transform={`translate(540,480) scale(${s})`} opacity={o}>
      <Straw x={0} y={0} s={1.9} rot={28} />
      {[0, 1, 2].map((i) => {
        const k = ((lt * 0.7 + i * 0.33) % 1 + 1) % 1;
        return <path key={i} d={`M${-170 + i * 40},${330 - k * 90} q-14,22 0,32 q14,-10 0,-32 Z`} fill="#8cc4dc" opacity={(1 - k) * 0.9} />;
      })}
    </g>
  );
};

const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  void off;
  return (
    <EndCard
      lt={lt}
      art={<StrawArt lt={lt} />}
      spec="4-STAGE · 0.01 MICRON"
      name={
        <>
          Personal
          <br />
          Water Filter
          <br />
          Straw
        </>
      }
      nameSize={92}
      shadowY={880}
      price="$19.99"
      save="Save this before your next long hike"
    />
  );
};

export const V20: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={3.3} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={3.2} to={8.8}>
        <S2 off={3.2} />
      </Scene>
      <Scene from={8.7} to={12.9}>
        <S3 off={8.7} />
      </Scene>
      <Scene from={12.8} to={22.2}>
        <S4 off={12.8} />
      </Scene>
      <Scene from={22.1} to={24.5} fadeIn={0.12}>
        <S5 off={22.1} />
      </Scene>
      <Scene from={24.4} to={30} fadeOut={0}>
        <S6 off={24.4} />
      </Scene>
      <Captions words={words} windows={[[0.3, 3.2, 860], [3.25, 12.85, 300], [14.05, 22.1, 860]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
