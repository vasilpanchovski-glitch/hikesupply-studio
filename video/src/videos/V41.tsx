import React from "react";
import { AbsoluteFill } from "remotion";
import { hikerTransform, HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, HEAD, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v41.json";

const words = vo.words as unknown as Word[];

const LOOKOUT: Palette = {
  sky: ["#56779c", "#adbfcd", "#e6e8e4"],
  sun: { x: 800, y: 620, r: 50, color: "#fffbef", glow: "#f3eed8" },
  layers: ["#b5c0c8", "#9babb4", "#84948f", "#6d7c74", "#5a675f"],
  mist: "#eef2f3",
};
const SUMMIT: Palette = {
  sky: ["#3f73a8", "#b5d0e4", "#f4efdc"],
  sun: { x: 820, y: 760, r: 60, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#b7c3cb", "#9cadb4", "#8a9790", "#74827a", "#5f6c64"],
  mist: "#eef3f0",
};

const MIA: Outfit = {
  ...GUIDE,
  skin: "#E8B59A",
  skinShade: "#C9937A",
  hair: "#3a2418",
  ponytail: "#3a2418",
  beard: null,
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#3C4148",
  pantsShade: "#2C3036",
  pack: "#3E4F5C",
  packShade: "#2C3943",
};
const GLOVE = "#2F7F86";

const lerpHex = (a: string, b: string, k: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * Math.max(0, Math.min(1, k)))).join(",")})`;
};

const Rocks: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <path d={`M-300,${y - 40} L120,${y - 70} L380,${y - 50} L700,${y - 80} L1000,${y - 55} L1400,${y - 70} L1400,${y + 700} L-300,${y + 700} Z`} fill="#7d8580" />
    <path d={`M-300,${y - 10} L1400,${y - 20} L1400,${y + 700} L-300,${y + 700} Z`} fill="#6c746f" />
    {Array.from({ length: 7 }, (_, i) => (
      <path key={i} d={`M${-40 + i * 170},${y + 60 + (i % 2) * 40} l40,-30 l50,10 l20,30 Z`} fill="#5b625e" />
    ))}
  </g>
);
const Wind: React.FC<{ t: number; o?: number }> = ({ t, o = 0.6 }) => (
  <g>
    {Array.from({ length: 9 }, (_, i) => {
      const x = ((t * 700 + i * 260) % 1600) - 300;
      const y = 600 + ((i * 173) % 900);
      return <path key={i} d={`M${x},${y} q90,-14 180,0`} stroke="#fff" strokeWidth={4} fill="none" opacity={o * 0.6} strokeLinecap="round" />;
    })}
  </g>
);
// Wooden lookout rail.
const Rail: React.FC<{ y: number }> = ({ y }) => (
  <g>
    {[60, 330, 600, 870].map((x) => (
      <rect key={x} x={x} y={y - 170} width={22} height={180} rx={4} fill="#7a5a3c" />
    ))}
    <rect x={-40} y={y - 170} width={1160} height={18} rx={6} fill="#8d6a48" />
    <rect x={-40} y={y - 95} width={1160} height={14} rx={6} fill="#7a5a3c" />
  </g>
);

// Things held in the hand, drawn in the hiker's own coordinates.
const Held: React.FC<{ p: HikerProps; kind: "bag" | "bar" }> = ({ p, kind }) => {
  const h = p.handOverride ?? [30, 34];
  return (
    <g transform={hikerTransform(p)}>
      {kind === "bag" ? (
        <g transform={`translate(${h[0] - 2},${h[1] - 40})`}>
          <path d="M0,8 L56,8 L52,58 Q51,62 47,62 L9,62 Q5,62 4,58 Z" fill="#eef2f4" stroke="#9fb0b8" strokeWidth={2} />
          <rect x={-2} y={2} width={60} height={9} rx={3} fill="#4f97cf" />
          <rect x={22} y={-4} width={10} height={14} rx={3} fill="#2f5f86" />
          <rect x={12} y={24} width={32} height={26} rx={4} fill="#c47a45" opacity={0.85} />
        </g>
      ) : (
        <rect x={h[0] + 4} y={h[1] - 30} width={14} height={40} rx={4} fill="#c8963e" stroke="#9a6f22" strokeWidth={2} />
      )}
    </g>
  );
};
// Gloves sticking out of the top of the pack.
const PackGloves: React.FC<{ p: HikerProps }> = ({ p }) => (
  <g transform={hikerTransform(p)}>
    <g transform="translate(-44,-150) scale(1.7)">
      <path d="M-14,0 q-6,-30 8,-36 q14,-4 16,10 l2,26 Z" fill={GLOVE} stroke="rgba(0,0,0,0.25)" strokeWidth={1.2} />
      <path d="M2,0 q2,-32 18,-32 q14,2 10,16 l-6,16 Z" fill="#256870" stroke="rgba(0,0,0,0.25)" strokeWidth={1.2} />
    </g>
  </g>
);

// White info card: core warmth, blood flow to the hands, hand warmth (all 0..1).
const WarmCard: React.FC<{ t: number; t0: number; t1?: number; core: number; flow: number; hand: number }> = ({ t, t0, t1 = 999, core, flow, hand }) => {
  if (isClean()) return null;
  const o = at(t, [t0, t0 + 0.3], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]);
  const coreCol = lerpHex("#8fb6d6", "#e0784e", core);
  const handCol = lerpHex("#cfe1ee", "#E8B59A", hand);
  const w = mix(8, 34, flow);
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 440,
        height: 470,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        overflow: "hidden",
        opacity: o,
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <svg width={920} height={470} viewBox="0 0 920 470">
        {/* core: jacket torso with a warmth glow */}
        <path d="M110,110 Q110,70 160,62 L280,62 Q330,70 330,110 L340,380 Q340,400 320,400 L120,400 Q100,400 100,380 Z" fill="#B5553A" />
        <circle cx={220} cy={220} r={86} fill={coreCol} opacity={0.95} />
        <text x={220} y={236} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={46} letterSpacing={2} fill="#fff">
          CORE
        </text>
        {/* blood flow arrow */}
        <text x={480} y={170} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={30} letterSpacing={3} fill="#6b6b66">
          BLOOD FLOW
        </text>
        <path d="M360,230 L560,230" stroke="#c4583f" strokeWidth={w} strokeLinecap="round" opacity={mix(0.35, 1, flow)} />
        <path d={`M560,${230 - w - 10} L612,230 L560,${230 + w + 10} Z`} fill="#c4583f" opacity={mix(0.35, 1, flow)} />
        {/* hand */}
        <g transform="translate(640,110)">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={18 + i * 40} y={i === 0 || i === 3 ? 30 : 0} width={34} height={140} rx={17} fill={handCol} stroke="rgba(0,0,0,0.15)" strokeWidth={2} />
          ))}
          <rect x={10} y={110} width={170} height={150} rx={50} fill={handCol} stroke="rgba(0,0,0,0.15)" strokeWidth={2} />
          <rect x={-40} y={140} width={90} height={36} rx={18} fill={handCol} stroke="rgba(0,0,0,0.15)" strokeWidth={2} transform="rotate(-30 5 158)" />
        </g>
        <text x={735} y={430} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={30} letterSpacing={3} fill="#6b6b66">
          HANDS
        </text>
      </svg>
    </div>
  );
};

// ============ S1 HOOK: too cold to open the snack bag (0 - 4.85) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1700;
  const p: HikerProps = { x: 560, y: groundY + 40, scale: 1.7, walk: 0, lean: 0.08, poles: false, handOverride: [48, -86], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={LOOKOUT}
        camX={t * 12}
        zoom={mix(1.03, 1.08, t / 4.85)}
        foreground={
          <g>
            <Rocks y={groundY} />
            <Rail y={groundY - 10} />
            <Wind t={t} o={0.55} />
            <Person {...p} outfit={MIA} expression={t > 2.5 ? "tired" : "neutral"} />
            <Held p={p} kind="bag" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"She was\ntoo cold\nto open\na zipper."} t={t} t0={0} top={130} size={140} />
      <Chip text="Fingers numb" t={t} t0={2.76} x={80} y={700} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: gloves still in the pack (4.85 - 7.8) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1760;
  const p: HikerProps = { x: 600, y: groundY + 30, scale: 1.6, walk: 0, lean: 0.08, poles: false, handOverride: [48, -86], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={LOOKOUT}
        camX={lt * 10}
        zoom={mix(1.04, 1.12, lt / 2.95)}
        foreground={
          <g>
            <Rocks y={groundY} />
            <Rail y={groundY - 10} />
            <Wind t={t} />
            <Person {...p} outfit={MIA} expression="tired" />
            <Held p={p} kind="bag" />
            <PackGloves p={p} />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim />
      <Chip text="Gloves still in her pack" t={t} t0={5.06} x={80} y={220} icon="x" />
      <Chip text="Saved for later" t={t} t0={6.52} x={80} y={320} icon="none" />
      <Readout label="FINGERS" value="NUMB" ok={false} t={t} t0={6.95} x={80} y={440} pulseAt={6.95} />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: gloves on early, warm core, snack, spare pair (7.8 - 19.65) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1840;
  const gloved = t >= 9.4;
  const snack = t >= 17.6;
  const p: HikerProps = {
    x: 720,
    y: groundY,
    scale: 1.45,
    walk: 0,
    lean: 0.06,
    poles: false,
    handOverride: t < 9.4 || snack ? [44, -80] : [30, 34],
    breathe: Math.sin(t * 2.4) * 2,
  };
  const core = at(t, [14.3, 15.0], [1, 0]);
  const flow = at(t, [15.5, 16.2], [1, 0.2]);
  const hand = at(t, [16.4, 17.0], [1, 0]);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={LOOKOUT}
        camX={lt * 6}
        foreground={
          <g>
            <Rocks y={groundY} />
            <Wind t={t} o={0.35} />
            <Person {...p} outfit={{ ...MIA, glove: gloved ? GLOVE : null }} expression="happy" />
            {snack && <Held p={p} kind="bar" />}
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={600} />
      <Title text={"Here's\nthe fix."} t={t} t0={7.9} t1={8.85} top={200} size={160} />
      <Chip text="Gloves on before you're cold" t={t} t0={9.1} t1={12.25} x={80} y={220} icon="check" big />
      <Chip text="Not after" t={t} t0={11.38} t1={12.25} x={80} y={330} icon="x" big />
      <Chip text="Keep your core warm" t={t} t0={12.36} t1={17.5} x={80} y={220} icon="check" big />
      <WarmCard t={t} t0={12.36} t1={17.5} core={core} flow={flow} hand={hand} />
      <Chip text="Eat a snack" t={t} t0={17.63} x={80} y={220} icon="check" big />
      <Chip text="Carry a spare pair" t={t} t0={18.35} x={80} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: warm hands on the next summit (19.6 - 22.4) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  const p: HikerProps = { x: 540, y: groundY + 40, scale: 1.65, walk: 0, lean: 0.04, poles: false, handOverride: [36, -40], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={SUMMIT}
        camX={lt * 20}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <Pine x={-40} y={groundY - 40} h={420} c="#3b6550" c2="#2b4d3c" />
            <Pine x={1060} y={groundY - 50} h={460} c="#3b6550" c2="#2b4d3c" />
            <Rocks y={groundY} />
            <Person {...p} outfit={{ ...MIA, glove: GLOVE }} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={800} />
      <Title text={"Warm hands\nat the top."} t={t} t0={off + 0.1} top={190} size={150} />
      <Chip text="Gloves on early" t={t} t0={20.5} x={80} y={540} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/ultimate-hikers-toolkit-card.jpg"
      spec="DIGITAL TOOLKIT · INSTANT DOWNLOAD"
      name={
        <>
          Ultimate
          <br />
          Hiker's Toolkit
        </>
      }
      nameSize={96}
      price="$29.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V41: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={4.9} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={4.85} to={7.85}>
        <S2 off={4.85} />
      </Scene>
      <Scene from={7.8} to={19.65}>
        <S3 off={7.8} />
      </Scene>
      <Scene from={19.6} to={22.4} fadeIn={0.12}>
        <S4 off={19.6} />
      </Scene>
      <Scene from={22.35} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions words={words} windows={[[0.3, 4.85, 900], [4.85, 7.8, 960], [7.8, 19.6, 960], [19.6, 22.35, 900]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
