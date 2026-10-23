import React from "react";
import { AbsoluteFill } from "remotion";
import { hikerGeometry, hikerTransform, HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v49.json";

const words = vo.words as unknown as Word[];

const FROST: Palette = {
  sky: ["#4f79a6", "#b3c9da", "#eef0ea"],
  sun: { x: 800, y: 620, r: 52, color: "#fffbef", glow: "#f3efdc" },
  layers: ["#c9d1d6", "#aebbc1", "#93a19f", "#7a8984", "#63726c"],
  mist: "#f2f5f5",
};
const GREY: Palette = {
  sky: ["#6b7f92", "#b1bac1", "#dde1e0"],
  sun: { x: 260, y: 700, r: 40, color: "#f4f4ee", glow: "#e2e4df" },
  layers: ["#b5bcc0", "#9ca5a8", "#868f8e", "#707a77", "#5c6562"],
  mist: "#e6e9e8",
};
const CLEAR: Palette = {
  sky: ["#3c72aa", "#b2cfe6", "#f5efdc"],
  sun: { x: 820, y: 760, r: 60, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#c5d0d6", "#a7b7be", "#8f9e98", "#77867e", "#617069"],
  mist: "#eef3f0",
};

const MAYA: Outfit = {
  ...GUIDE,
  skin: "#C99070",
  skinShade: "#AA7354",
  hair: "#231915",
  ponytail: "#231915",
  beard: null,
  cap: "#2F5D8A",
  capShade: "#23476B",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#3C4148",
  pantsShade: "#2C3036",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};

// Frosty ridge trail: pale grass with frost, grey path.
const FrostTrail: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={-300} y={y - 40} width={1700} height={700} fill="#cfd8d4" />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill="#9c9b92" />
    {Array.from({ length: 16 }, (_, i) => (
      <path key={i} d={`M${(i * 131) % 1100},${y + 150 + ((i * 47) % 200)} l6,-22 l6,22`} stroke="#eef3f2" strokeWidth={4} fill="none" />
    ))}
    {[120, 470, 820].map((x, i) => (
      <ellipse key={x} cx={x} cy={y + 44 + (i % 2) * 26} rx={52} ry={11} fill="#e3e9e9" />
    ))}
  </g>
);
const RidgePines: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <g>
    {Array.from({ length: 6 }, (_, i) => {
      const x = ((((-100 + i * 250 - shift) % 1500) + 1500) % 1500) - 200;
      return <Pine key={i} x={x} y={y + (i % 2) * 20} h={380 + (i % 3) * 60} c="#3d6352" c2="#2c4a3d" />;
    })}
  </g>
);
const Breath: React.FC<{ p: HikerProps; t: number }> = ({ p, t }) => {
  const g = hikerGeometry(p);
  const [hx, hy] = g.head;
  const k = (t * 0.7) % 1;
  return (
    <g transform={hikerTransform(p)}>
      {[0, 1].map((j) => {
        const kk = (k + j * 0.5) % 1;
        return <circle key={j} cx={hx + 40 + kk * 50} cy={hy + 6 - kk * 16} r={8 + kk * 18} fill="#fff" opacity={0.5 * (1 - kk)} />;
      })}
    </g>
  );
};

// Trail junction sign post.
const SignPost: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <rect x={x - 9} y={y - 330} width={18} height={330} fill="#6b4a32" />
    <path d={`M${x - 10},${y - 320} h170 l26,24 l-26,24 h-170 Z`} fill="#8a5e3c" />
    <path d={`M${x + 10},${y - 250} h-170 l-26,24 l26,24 h170 Z`} fill="#7a5234" />
    <rect x={x + 10} y={y - 306} width={120} height={8} rx={4} fill="#e9dcc4" opacity={0.8} />
    <rect x={x - 140} y={y - 236} width={110} height={8} rx={4} fill="#e9dcc4" opacity={0.8} />
  </g>
);

// Phone held in the near hand. lit: 1 screen on, 0 black.
const Phone: React.FC<{ p: HikerProps; lit: number }> = ({ p, lit }) => {
  const g = hikerGeometry(p);
  const h = g.arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] + 4},${h[1] - 8}) rotate(-18)`}>
        <rect x={-12} y={-22} width={24} height={40} rx={4} fill="#1d1f1e" />
        <rect x={-9} y={-18} width={18} height={31} rx={2} fill={lit > 0 ? "#dfeef3" : "#111"} />
        {lit > 0 && <circle cx={0} cy={-2} r={22} fill="#eaf6fa" opacity={0.25} />}
      </g>
    </g>
  );
};

// Phone tucked in a chest pocket of the jacket.
const ChestPocket: React.FC<{ p: HikerProps; k: number }> = ({ p, k }) => {
  const g = hikerGeometry(p);
  const [sx, sy] = g.sh;
  return (
    <g transform={hikerTransform(p)}>
      <rect x={sx - 2} y={sy + 6 + (1 - k) * -30} width={16} height={28} rx={3} fill="#1d1f1e" opacity={k > 0 ? 1 : 0} />
      <rect x={sx - 8} y={sy + 22} width={30} height={30} rx={4} fill="#8E3F2A" stroke="#6e2f1f" strokeWidth={2} />
    </g>
  );
};

// Big phone screen with a battery bar that drains to black.
const BatteryCard: React.FC<{ t: number; t0: number; tDead: number; t1: number }> = ({ t, t0, tDead, t1 }) => {
  if (isClean()) return null;
  const o = at(t, [t0, t0 + 0.25], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]);
  const pct = t < tDead - 0.5 ? 40 : Math.round(at(t, [tDead - 0.5, tDead], [40, 0]));
  const dead = t >= tDead;
  return (
    <div
      style={{
        position: "absolute",
        left: 310,
        top: 250,
        width: 460,
        height: 560,
        borderRadius: 60,
        background: "#1d1f1e",
        boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        opacity: o,
        scale: `${at(t, [t0, t0 + 0.4], [0.9, 1], outExpo)}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 22,
          borderRadius: 42,
          background: dead ? "#050505" : "#eef4f6",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        {!dead && (
          <>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 36, letterSpacing: 4, color: "#6b6b66" }}>BATTERY</div>
            <div style={{ width: 300, height: 130, borderRadius: 22, border: "8px solid #1f2421", padding: 10, position: "relative" }}>
              <div style={{ width: `${pct}%`, height: "100%", borderRadius: 10, background: pct > 20 ? "#3E8E5A" : "#D9443A" }} />
              <div style={{ position: "absolute", right: -26, top: 36, width: 16, height: 42, borderRadius: 4, background: "#1f2421" }} />
            </div>
            <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 120, color: C.ink, lineHeight: 1 }}>{pct}%</div>
          </>
        )}
      </div>
    </div>
  );
};

// Airplane mode toggle card.
const ToggleCard: React.FC<{ t: number; t0: number; tOn: number; t1: number }> = ({ t, t0, tOn, t1 }) => {
  if (isClean()) return null;
  const o = at(t, [t0, t0 + 0.25], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]);
  const k = at(t, [tOn, tOn + 0.25], [0, 1], outExpo);
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 360,
        height: 190,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        opacity: o,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 50px",
      }}
    >
      <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 76, textTransform: "uppercase", color: C.ink }}>Airplane mode</div>
      <div style={{ width: 190, height: 104, borderRadius: 52, background: k > 0.5 ? "#3E8E5A" : "#cfcac0", position: "relative" }}>
        <div style={{ position: "absolute", top: 8, left: 8 + k * 86, width: 88, height: 88, borderRadius: 44, background: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.25)" }} />
      </div>
    </div>
  );
};

// ============ S1 HOOK: phone in the hip belt pocket on a freezing ridge (0 - 3.85) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1740;
  const ph = t * 3.6;
  const p: HikerProps = { x: 330 + t * 40, y: groundY + 30, scale: 1.55, phase: ph, walk: 0.7, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={FROST}
        camX={t * 12}
        zoom={mix(1.03, 1.08, t / 3.85)}
        foreground={
          <g>
            <RidgePines y={groundY - 30} shift={t * 36} />
            <FrostTrail y={groundY} />
            <Person {...p} outfit={MAYA} expression="neutral" />
            <Breath p={p} t={t} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={950} />
      <Title text={"Her phone\ndied at\n40 percent."} t={t} t0={0} top={130} size={150} />
      <Chip text="Phone in hip belt pocket" t={t} t0={1.73} x={80} y={640} icon="none" />
      <Chip text="Freezing ridge" t={t} t0={2.91} x={80} y={740} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: at the junction, 40 percent, then black (3.8 - 10.95) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1760;
  const ph = lt * 3.4;
  const walking = t < 4.6;
  const holding = t > 4.85;
  const dead = t >= 7.27;
  const p: HikerProps = {
    x: walking ? 300 + lt * 120 : 396,
    y: groundY + 30,
    scale: 1.55,
    phase: ph,
    walk: walking ? 0.6 : 0,
    lean: 0.06,
    poles: false,
    handOverride: holding ? [56, -70] : walking ? freeHand(ph, 0.6) : [30, 34],
    breathe: Math.sin(t * 3) * 2,
  };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={GREY}
        camX={lt * 6}
        zoom={mix(1.04, 1.1, lt / 7.15)}
        dim={0.05}
        foreground={
          <g>
            <RidgePines y={groundY - 30} shift={300 + lt * 6} />
            <FrostTrail y={groundY} />
            <SignPost x={760} y={groundY + 40} />
            <Person {...p} outfit={MAYA} expression={dead ? "tired" : "neutral"} />
            {holding && <Phone p={p} lit={dead ? 0 : 1} />}
            <Breath p={p} t={t} />
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim />
      <Chip text="Junction: check the map" t={t} t0={4.14} t1={6.1} x={80} y={220} icon="none" />
      <BatteryCard t={t} t0={6.1} tDead={7.27} t1={7.8} />
      <Readout label="PHONE" value="DEAD" ok={false} t={t} t0={7.75} x={80} y={220} pulseAt={8.0} />
      <Chip text="Cold drains batteries faster" t={t} t0={8.6} x={80} y={440} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3a FIX: inside pocket, close to your body (10.9 - 15.65) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const tucked = at(t, [13.1, 13.6], [0, 1]);
  const p: HikerProps = {
    x: 560,
    y: groundY + 30,
    scale: 1.55,
    walk: 0,
    lean: 0.04,
    poles: false,
    handOverride: t < 13.1 ? [56, -70] : t < 13.7 ? [40, -110] : [30, 34],
    breathe: Math.sin(t * 2.4) * 2,
  };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={FROST}
        camX={lt * 6}
        zoom={mix(1.1, 1.16, lt / 4.75)}
        foreground={
          <g>
            <RidgePines y={groundY - 30} shift={520} />
            <FrostTrail y={groundY} />
            <Person {...p} outfit={MAYA} expression="happy" />
            {t < 13.1 && <Phone p={p} lit={1} />}
            <ChestPocket p={p} k={tucked} />
            <Breath p={p} t={t} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Here's\nthe fix."} t={t} t0={11.1} t1={11.95} top={200} size={160} />
      <Chip text="Inside pocket" t={t} t0={13.1} x={80} y={220} icon="check" big />
      <Readout label="CLOSE TO YOUR BODY" value="WARM" ok={true} t={t} t0={14.09} x={80} y={360} />
    </AbsoluteFill>
  );
};

// ============ S3b FIX: airplane mode, power bank (15.6 - 20.75) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const ph = lt * 3.8;
  const p: HikerProps = { x: 380 + lt * 34, y: groundY + 30, scale: 1.5, phase: ph, walk: 0.75, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.75) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={FROST}
        camX={lt * 16}
        foreground={
          <g>
            <RidgePines y={groundY - 30} shift={lt * 40 + 700} />
            <FrostTrail y={groundY} />
            <Person {...p} outfit={MAYA} expression="happy" />
            <ChestPocket p={p} k={1} />
            <Breath p={p} t={t} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <ToggleCard t={t} t0={15.72} tOn={16.64} t1={18.3} />
      <Chip text="When you're not using it" t={t} t0={16.9} t1={18.3} x={80} y={600} icon="check" />
      <Chip text="Small charged power bank" t={t} t0={18.92} x={80} y={220} icon="check" big />
      <Readout label="BACKUP" value="CHARGED" ok={true} t={t} t0={19.65} x={80} y={360} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: lasted the whole loop (20.7 - 23.15) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  const p: HikerProps = { x: 540, y: groundY + 40, scale: 1.65, walk: 0, lean: 0.04, poles: false, handOverride: [56, -70], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l5"
        pal={CLEAR}
        camX={lt * 20}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <Pine x={-40} y={groundY - 40} h={420} c="#3b6550" c2="#2b4d3c" />
            <Pine x={1060} y={groundY - 50} h={460} c="#3b6550" c2="#2b4d3c" />
            <FrostTrail y={groundY} />
            <Person {...p} outfit={MAYA} expression="happy" />
            <Phone p={p} lit={1} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={800} />
      <Title text={"Lasted the\nwhole loop."} t={t} t0={off + 0.1} top={190} size={150} />
      <Chip text="Warm phone, full map" t={t} t0={21.3} x={80} y={540} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/winter-hiking-guide-cold-weather-checklist-card.jpg"
      spec="PRINTABLE PDF · 22 PAGES · °F + °C"
      name={
        <>
          Winter
          <br />
          Hiking Guide
        </>
      }
      nameSize={96}
      price="$7.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V49: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={3.85} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={3.8} to={10.95}>
        <S2 off={3.8} />
      </Scene>
      <Scene from={10.9} to={15.65}>
        <S3a off={10.9} />
      </Scene>
      <Scene from={15.6} to={20.75}>
        <S3b off={15.6} />
      </Scene>
      <Scene from={20.7} to={23.15} fadeIn={0.12}>
        <S4 off={20.7} />
      </Scene>
      <Scene from={23.1} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions
        words={words}
        windows={[
          [0.3, 3.8, 960],
          [3.8, 10.9, 960],
          [10.9, 15.6, 960],
          [15.6, 20.7, 960],
          [20.7, 23.1, 900],
        ]}
      />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
