import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v43.json";

const words = vo.words as unknown as Word[];

// Zion: blue sky over red and cream sandstone.
const ZION: Palette = {
  sky: ["#3f7fc0", "#a9cbe6", "#f3e6cf"],
  sun: { x: 820, y: 520, r: 56, color: "#fffbe8", glow: "#fff0c0" },
  layers: ["#e2b896", "#d29a74", "#c07a56", "#a75f40", "#8a4a32"],
  mist: "#f6e2cc",
};
const ZION_AM: Palette = {
  sky: ["#4a86c4", "#c4daec", "#fbe8cc"],
  sun: { x: 230, y: 760, r: 60, color: "#fffbe8", glow: "#ffe2a8" },
  layers: ["#e8c4a4", "#d8a684", "#c4865e", "#ab6a46", "#8e5236"],
  mist: "#fbe6cc",
};

const ALEX: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#BB8262",
  hair: "#2b1d16",
  beard: null,
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#2F62B0",
  jacketShade: "#244C8A",
  pants: "#5B5546",
  pantsShade: "#45402F",
  pack: "#C8963E",
  packShade: "#A37828",
};
const RANGER: Outfit = {
  ...GUIDE,
  skin: "#8E5B3E",
  skinShade: "#734631",
  hair: "#1a1410",
  beard: null,
  cap: "#7A6A48",
  capShade: "#5E5036",
  jacket: "#B9A77E",
  jacketShade: "#9A8A62",
  pants: "#4E5A3E",
  pantsShade: "#3B452E",
  pack: "#4E5A3E",
  packShade: "#3B452E",
};

// Sandy rock ground with a pale trail.
const Rock: React.FC<{ y: number; base?: string; trail?: string }> = ({ y, base = "#b9784f", trail = "#e2c29c" }) => (
  <g>
    <rect x={-300} y={y - 40} width={1700} height={700} fill={base} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={trail} />
  </g>
);

// The Angels Landing fin: a tall sandstone ridge with the chain route on its spine.
const Fin: React.FC<{ x: number; y: number; s?: number; chain?: number }> = ({ x, y, s = 1, chain = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-330,0 L-220,-260 L-140,-420 L-60,-600 L10,-700 L70,-690 L130,-560 L210,-380 L320,-120 L380,0 Z" fill="#b5603c" />
    <path d="M-330,0 L-220,-260 L-140,-420 L-60,-600 L10,-700 L-20,-520 L-90,-300 L-160,0 Z" fill="#8f4528" opacity={0.8} />
    <path d="M10,-700 L70,-690 L130,-560 L90,-580 Z" fill="#e6c2a0" opacity={0.7} />
    {Array.from({ length: 5 }, (_, i) => (
      <path key={i} d={`M${-250 + i * 120},${-60 - i * 20} q60,-12 120,0`} stroke="#9a4e30" strokeWidth={5} fill="none" opacity={0.6} />
    ))}
    <path d="M-220,-260 L-140,-420 L-60,-600 L10,-700" stroke="#2c2a28" strokeWidth={5} strokeDasharray="10 8" fill="none" opacity={chain} />
    {[[-220, -260], [-140, -420], [-60, -600], [10, -700]].map(([a, b], i) => (
      <circle key={i} cx={a} cy={b} r={7} fill="#2c2a28" opacity={chain} />
    ))}
  </g>
);

const Junipers: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <g>
    {Array.from({ length: 6 }, (_, i) => {
      const x = ((((-100 + i * 260 - shift) % 1560) + 1560) % 1560) - 240;
      return <Pine key={i} x={x} y={y + (i % 2) * 14} h={240 + (i % 3) * 50} c="#5b7048" c2="#465a38" />;
    })}
  </g>
);

// White card: the permit zone between Scout Lookout and the summit.
const ZoneCard: React.FC<{ t: number; t0: number; t1?: number }> = ({ t, t0, t1 = 999 }) => {
  if (isClean()) return null;
  const o = at(t, [t0, t0 + 0.3], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]);
  const draw = at(t, [t0 + 0.5, t0 + 1.8], [0, 1]);
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 330,
        height: 520,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        overflow: "hidden",
        opacity: o,
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <svg width={920} height={520} viewBox="0 0 920 520">
        <text x={460} y={70} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={34} letterSpacing={4} fill="#6b6b66">
          ANGELS LANDING
        </text>
        <path d="M90,430 L330,330" stroke="#c9b9a2" strokeWidth={12} strokeLinecap="round" />
        <path d="M330,330 L560,220 L790,130" stroke="#e7e2d8" strokeWidth={16} strokeLinecap="round" />
        <path d="M330,330 L560,220 L790,130" stroke="#D9443A" strokeWidth={16} strokeLinecap="round" pathLength={1} strokeDasharray={`${draw} 1`} />
        <circle cx={90} cy={430} r={16} fill="#3E5F4B" />
        <circle cx={330} cy={330} r={22} fill="#2F62B0" />
        <circle cx={790} cy={130} r={22} fill="#3a3a36" />
        <text x={330} y={400} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#1f2421">
          SCOUT LOOKOUT
        </text>
        <text x={790} y={200} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#1f2421">
          SUMMIT
        </text>
        <g opacity={at(draw, [0.7, 1], [0, 1])}>
          <rect x={470} y={250} width={300} height={64} rx={14} fill="#D9443A" />
          <text x={620} y={295} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} letterSpacing={2} fill="#fff">
            PERMIT ZONE
          </text>
        </g>
      </svg>
    </div>
  );
};

// White card: how to apply on recreation.gov.
const ApplyCard: React.FC<{ t: number; t0: number; t1?: number; r1: number; r2: number; r3: number }> = ({ t, t0, t1 = 999, r1, r2, r3 }) => {
  if (isClean()) return null;
  const o = at(t, [t0, t0 + 0.3], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]);
  const row = (k: number, title: string, sub: string, y: number) => (
    <div
      style={{
        position: "absolute",
        left: 40,
        right: 40,
        top: y,
        display: "flex",
        alignItems: "center",
        gap: 24,
        opacity: at(t, [k, k + 0.25], [0, 1]),
        translate: `${at(t, [k, k + 0.4], [40, 0], outExpo)}px 0px`,
      }}
    >
      <svg width={64} height={64} viewBox="0 0 64 64" style={{ flexShrink: 0 }}>
        <rect x={4} y={8} width={56} height={52} rx={10} fill="#f1ede4" stroke="#3a3a36" strokeWidth={4} />
        <rect x={4} y={8} width={56} height={14} rx={6} fill="#3E5F4B" />
        <rect x={16} y={2} width={6} height={14} rx={3} fill="#3a3a36" />
        <rect x={42} y={2} width={6} height={14} rx={3} fill="#3a3a36" />
      </svg>
      <div>
        <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 56, lineHeight: 1, color: C.ink, textTransform: "uppercase" }}>{title}</div>
        <div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 34, letterSpacing: 1, color: "#6b6b66", textTransform: "uppercase" }}>{sub}</div>
      </div>
    </div>
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 330,
        height: 520,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        overflow: "hidden",
        opacity: o,
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 110, background: "#3E5F4B", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 50, color: "#fff", letterSpacing: -0.5 }}>recreation.gov</div>
      </div>
      {row(r1, "Seasonal lottery", "Apply well ahead", 150)}
      {row(r2, "Day-before lottery", "Apply the day before", 280)}
      {row(r3, "Closes 3 pm", "Mountain Time, day before", 410)}
    </div>
  );
};

// ============ S1 HOOK: Alex reaches Scout Lookout (0 - 4.05) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1760;
  const ph = t * 4;
  const walk = t < 2.4 ? 0.8 : 0;
  const p: HikerProps = { x: 300 + Math.min(t, 2.4) * 70, y: groundY + 30, scale: 1.5, phase: ph, walk, lean: 0.08, poles: false, handOverride: walk ? freeHand(ph, walk) : [30, 34], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={ZION}
        camX={t * 12}
        zoom={mix(1.03, 1.08, t / 4)}
        foreground={
          <g>
            <Fin x={790} y={groundY - 40} s={1.05} />
            <Junipers y={groundY - 30} shift={t * 20} />
            <Rock y={groundY} />
            <Person {...p} outfit={ALEX} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={950} />
      <Title text={"No permit?\nThe chains are\noff limits."} t={t} t0={0} top={130} size={130} />
      <Chip text="Scout Lookout" t={t} t0={1.77} x={80} y={560} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S2a PROBLEM: the ranger asks for his permit (4.0 - 7.3) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={ZION}
        camX={60 + lt * 8}
        zoom={mix(1.04, 1.08, lt / 3.3)}
        foreground={
          <g>
            <Fin x={900} y={groundY - 60} s={0.9} />
            <Junipers y={groundY - 30} shift={80} />
            <Rock y={groundY} />
            <Person x={330} y={groundY + 30} scale={1.45} walk={0} lean={0.04} poles={false} handOverride={[30, 34]} outfit={ALEX} expression={t > 5.76 ? "tired" : "neutral"} breathe={Math.sin(t * 2.4) * 2} />
            <Person x={760} y={groundY + 30} scale={1.45} walk={0} lean={0.02} poles={false} handOverride={[52, -40]} outfit={RANGER} expression="neutral" flip breathe={Math.sin(t * 2.1 + 1) * 2} />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim />
      <Chip text="Ranger check" t={t} t0={4.37} x={80} y={230} icon="none" />
      <Readout label="PERMIT" value="NONE" ok={false} t={t} t0={6.27} x={80} y={340} pulseAt={6.27} />
    </AbsoluteFill>
  );
};

// ============ S2b PROBLEM: the permit zone, all year (7.25 - 11.4) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1800;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={ZION}
        camX={lt * 10}
        dim={0.12}
        foreground={
          <g>
            <Fin x={620} y={groundY - 40} s={1.15} />
            <Junipers y={groundY - 30} shift={200 + lt * 10} />
            <Rock y={groundY} />
            <Person x={300} y={groundY + 30} scale={1.35} walk={0} lean={0.04} poles={false} handOverride={[30, 34]} outfit={ALEX} expression="tired" breathe={Math.sin(t * 2.4) * 2} />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim h={900} />
      <ZoneCard t={t} t0={7.4} />
      <Chip text="Needed all year" t={t} t0={10.52} x={80} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a FIX: apply on recreation.gov (11.35 - 19.85) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1800;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={ZION_AM}
        camX={lt * 6}
        foreground={
          <g>
            <Fin x={880} y={groundY - 60} s={0.85} />
            <Junipers y={groundY - 30} shift={40} />
            <Rock y={groundY} />
            <Person x={330} y={groundY + 30} scale={1.35} walk={0} lean={0.04} poles={false} handOverride={[44, -96]} outfit={ALEX} expression="neutral" breathe={Math.sin(t * 2.4) * 2} />
            <g transform={`translate(${330 + 44 * 1.35},${groundY + 30 + 1.35 * (-96 - 182)}) scale(1.35)`}>
              <rect x={-11} y={-20} width={22} height={38} rx={4} fill="#1d1f1e" />
              <rect x={-8} y={-16} width={16} height={29} rx={2} fill="#dfeef3" />
            </g>
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={900} />
      <Title text={"Here's\nthe fix."} t={t} t0={11.45} t1={12.5} top={200} size={160} />
      <ApplyCard t={t} t0={13.1} r1={14.64} r2={16.64} r3={18.77} />
    </AbsoluteFill>
  );
};

// ============ S3b FIX: no luck? Scout Lookout needs no permit (19.8 - 23.9) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1760;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l5"
        pal={ZION}
        camX={lt * 14}
        zoom={at(lt, [0, 1.2], [1.15, 1.04], outExpo)}
        foreground={
          <g>
            <Fin x={760} y={groundY - 40} s={1.0} chain={0.4} />
            <Junipers y={groundY - 30} shift={300} />
            <Rock y={groundY} />
            <Person x={330} y={groundY + 30} scale={1.45} walk={0} lean={0.02} poles={false} handOverride={[30, 34]} outfit={ALEX} expression="happy" breathe={Math.sin(t * 2.4) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Chip text="No luck?" t={t} t0={19.86} x={80} y={230} icon="none" big />
      <Readout label="SCOUT LOOKOUT" value="NO PERMIT" ok={true} t={t} t0={21.15} x={80} y={360} pulseAt={21.15} />
      <Chip text="Huge view" t={t} t0={22.72} x={80} y={600} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: next morning, permit in hand (23.85 - 26.45) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1720;
  const ph = lt * 4.2;
  const p: HikerProps = { x: 300 + lt * 50, y: groundY + 40, scale: 1.55, phase: ph, walk: 0.85, lean: 0.12, poles: false, handOverride: freeHand(ph, 0.85) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l6"
        pal={ZION_AM}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <Fin x={800} y={groundY - 40} s={1.1} />
            <Junipers y={groundY - 30} shift={lt * 40} />
            <Rock y={groundY} />
            <Person {...p} outfit={ALEX} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={800} />
      <Title text={"Next morning:\npermit\nin hand."} t={t} t0={off + 0.1} top={190} size={140} />
      <Chip text="Permit approved" t={t} t0={25.2} x={80} y={640} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/utahs-mighty-5-trip-pack-card.jpg"
      photoH={760}
      spec="PLANNING GUIDE + 10 GPX DAY HIKES"
      name={
        <>
          Utah's Mighty 5
          <br />
          Trip Pack
        </>
      }
      nameSize={92}
      price="$19.99"
      save="Save this before your Zion trip"
    />
  );
};

export const V43: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={4.05} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={4.0} to={7.3}>
        <S2a off={4.0} />
      </Scene>
      <Scene from={7.25} to={11.4}>
        <S2b off={7.25} />
      </Scene>
      <Scene from={11.35} to={19.85}>
        <S3a off={11.35} />
      </Scene>
      <Scene from={19.8} to={23.9}>
        <S3b off={19.8} />
      </Scene>
      <Scene from={23.85} to={26.45} fadeIn={0.12}>
        <S4 off={23.85} />
      </Scene>
      <Scene from={26.4} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions
        words={words}
        windows={[
          [0.3, 4.0, 900],
          [4.0, 7.25, 960],
          [7.25, 11.35, 1000],
          [11.35, 13.1, 960],
          [13.1, 19.8, 1000],
          [19.8, 23.85, 960],
          [23.85, 26.4, 900],
        ]}
      />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
