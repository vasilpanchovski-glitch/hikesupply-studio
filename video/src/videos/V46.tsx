import React from "react";
import { AbsoluteFill } from "remotion";
import { hikerGeometry, hikerTransform, HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v46.json";

const words = vo.words as unknown as Word[];

const COLD: Palette = {
  sky: ["#5a7fa6", "#b7c8d6", "#eceee9"],
  sun: { x: 820, y: 640, r: 50, color: "#fffbef", glow: "#f1efe0" },
  layers: ["#c4ccd2", "#a9b5bc", "#8f9c9a", "#768480", "#62706a"],
  mist: "#f1f4f4",
};
const GREY: Palette = {
  sky: ["#6f8293", "#b3bcc2", "#dfe2e1"],
  sun: { x: 300, y: 700, r: 40, color: "#f4f4ee", glow: "#e2e4df" },
  layers: ["#b7bec2", "#9ea7aa", "#879190", "#717b78", "#5d6663"],
  mist: "#e8ebea",
};
const SUMMIT: Palette = {
  sky: ["#3f73a8", "#b5d0e4", "#f4efdc"],
  sun: { x: 820, y: 760, r: 60, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#c3ced5", "#a6b6bd", "#8f9d97", "#76857d", "#617069"],
  mist: "#eef3f0",
};

const DAN: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#BB8262",
  hair: "#2b211b",
  beard: "#2b211b",
  cap: "#B5553A",
  capShade: "#8E3F2A",
  jacket: "#2F5D8A",
  jacketShade: "#23476B",
  pants: "#3C4148",
  pantsShade: "#2C3036",
  pack: "#5B6B3E",
  packShade: "#46542F",
  glove: "#2b2f33",
};

// Snowy trail with patches of old snow.
const SnowTrail: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={-300} y={y - 40} width={1700} height={700} fill="#e9eef0" />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill="#a3a49c" />
    {[90, 380, 690, 960].map((x, i) => (
      <ellipse key={i} cx={x} cy={y + 40 + (i % 2) * 30} rx={60 + (i % 3) * 16} ry={14} fill="#dfe6e8" />
    ))}
    {Array.from({ length: 9 }, (_, i) => (
      <ellipse key={i} cx={(i * 151) % 1100} cy={y + 170 + ((i * 61) % 200)} rx={40} ry={9} fill="#d4dde1" />
    ))}
  </g>
);
const SnowWoods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <g>
    {Array.from({ length: 8 }, (_, i) => {
      const x = ((((-120 + i * 190 - shift) % 1520) + 1520) % 1520) - 220;
      const h = 460 + (i % 3) * 60;
      return (
        <g key={i}>
          <Pine x={x} y={y + (i % 2) * 18} h={h} c="#355b4a" c2="#27463a" />
          <path d={`M${x - 40},${y + (i % 2) * 18 - h * 0.55} l40,-22 l40,22 Z`} fill="#f2f5f6" opacity={0.85} />
        </g>
      );
    })}
  </g>
);
const Snowfall: React.FC<{ t: number; o?: number }> = ({ t, o = 0.8 }) => (
  <g>
    {Array.from({ length: 40 }, (_, i) => {
      const x = ((i * 97 + Math.sin(t * 0.8 + i) * 40 + t * 30) % 1180) - 50;
      const y = ((t * (70 + (i % 5) * 14) + i * 211) % 2000) - 40;
      return <circle key={i} cx={x} cy={y} r={3 + (i % 3)} fill="#fff" opacity={o} />;
    })}
  </g>
);

// Breath puffs in front of the face.
const Breath: React.FC<{ p: HikerProps; t: number; rate?: number }> = ({ p, t, rate = 1 }) => {
  const g = hikerGeometry(p);
  const [hx, hy] = g.head;
  const k = (t * 0.7 * rate) % 1;
  return (
    <g transform={hikerTransform(p)}>
      {[0, 1].map((j) => {
        const kk = (k + j * 0.5) % 1;
        return <circle key={j} cx={hx + 40 + kk * 50} cy={hy + 6 - kk * 16} r={8 + kk * 18} fill="#fff" opacity={0.55 * (1 - kk)} />;
      })}
    </g>
  );
};
// Shiver: small horizontal offset.
const shiver = (t: number, amt: number) => Math.sin(t * 70) * amt;

// Snack bar held in the near hand.
const Bar: React.FC<{ p: HikerProps }> = ({ p }) => {
  const g = hikerGeometry(p);
  const h = g.arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] + 4},${h[1] - 34}) rotate(-14)`}>
        <rect x={-8} y={0} width={18} height={44} rx={4} fill="#c8963e" stroke="#9a6f22" strokeWidth={2} />
        <rect x={-8} y={22} width={18} height={22} rx={3} fill="#d8d2c4" />
      </g>
    </g>
  );
};

// Clock icon that ticks around once per "hour".
const HourCard: React.FC<{ t: number; t0: number; t1: number }> = ({ t, t0, t1 }) => {
  if (isClean()) return null;
  const o = at(t, [t0, t0 + 0.3], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]);
  const marks = [0, 1, 2, 3];
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 360,
        height: 400,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        opacity: o,
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <div style={{ position: "absolute", top: 30, left: 0, right: 0, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 34, letterSpacing: 4, color: "#6b6b66" }}>
        A SMALL SNACK EVERY HOUR
      </div>
      <svg width={920} height={400} viewBox="0 0 920 400" style={{ position: "absolute", top: 0, left: 0 }}>
        <line x1={110} y1={250} x2={810} y2={250} stroke="#ece8df" strokeWidth={8} strokeLinecap="round" />
        {marks.map((i) => {
          const x = 110 + i * (700 / 3);
          const on = t >= t0 + 0.5 + i * 0.55;
          return (
            <g key={i}>
              <circle cx={x} cy={250} r={on ? 44 : 30} fill={on ? "#c8963e" : "#ece8df"} />
              <text x={x} y={340} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#1f2421">
                {i === 0 ? "START" : `${i} HR`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// Food -> fuel -> heat.
const FuelCard: React.FC<{ t: number; k: number[]; t1: number }> = ({ t, k, t1 }) => {
  if (isClean()) return null;
  const items = ["Food", "Fuel", "Heat"];
  const cols = ["#c8963e", "#B5553A", "#D9443A"];
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 360,
        height: 300,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        opacity: at(t, [k[0] - 0.1, k[0] + 0.2], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 30px",
      }}
    >
      {items.map((s, i) => (
        <React.Fragment key={s}>
          {i > 0 && (
            <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 80, color: "#bdb7ab", opacity: at(t, [k[i], k[i] + 0.2], [0, 1]) }}>›</div>
          )}
          <div
            style={{
              fontFamily: HEAD,
              fontWeight: 800,
              fontSize: 96,
              textTransform: "uppercase",
              color: cols[i],
              opacity: at(t, [k[i], k[i] + 0.2], [0, 1]),
              scale: `${at(t, [k[i], k[i] + 0.35], [0.8, 1], outExpo)}`,
            }}
          >
            {s}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

// ============ S1 HOOK: three cold hours, nothing to eat (0 - 4.3) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1740;
  const ph = t * 3.6;
  const p: HikerProps = { x: 330 + t * 40, y: groundY + 30, scale: 1.55, phase: ph, walk: 0.7, lean: 0.12, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={COLD}
        camX={t * 12}
        zoom={mix(1.03, 1.08, t / 4.3)}
        foreground={
          <g>
            <SnowWoods y={groundY - 30} shift={t * 36} />
            <SnowTrail y={groundY} />
            <Person {...p} outfit={DAN} expression="neutral" />
            <Breath p={p} t={t} />
            <Snowfall t={t} o={0.6} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={950} />
      <Title text={"He saved\nhis snacks\nfor the\nsummit."} t={t} t0={0} top={130} size={140} />
      <Chip text="3 cold hours" t={t} t0={1.95} x={80} y={700} icon="none" />
      <Chip text="Nothing to eat" t={t} t0={3.01} x={80} y={800} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: shivering and slow, nothing left to burn (4.25 - 10.5) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1760;
  const ph = lt * 2.2;
  const walk = at(t, [4.3, 8.0], [0.45, 0.15]);
  const p: HikerProps = {
    x: 470 + lt * 10 + shiver(t, t > 5.2 ? 2.5 : 0),
    y: groundY + 30,
    scale: 1.55,
    phase: ph,
    walk,
    lean: 0.2,
    poles: false,
    handOverride: [26, -40],
    breathe: Math.sin(t * 3.2) * 2,
  };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={GREY}
        camX={lt * 6}
        zoom={mix(1.04, 1.12, lt / 6.25)}
        dim={0.05}
        foreground={
          <g>
            <SnowWoods y={groundY - 30} shift={200 + lt * 8} />
            <SnowTrail y={groundY} />
            <Person {...p} outfit={DAN} expression="tired" />
            <Breath p={p} t={t} rate={1.6} />
            <Snowfall t={t} o={0.8} />
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim />
      <Chip text="Shivering and slow" t={t} t0={5.28} x={80} y={220} icon="x" />
      <Chip text="Even in warm layers" t={t} t0={6.62} x={80} y={320} icon="none" />
      <Readout label="ENERGY" value="EMPTY" ok={false} t={t} t0={8.14} x={80} y={440} pulseAt={9.66} />
    </AbsoluteFill>
  );
};

// ============ S3a FIX: small snack every hour (10.45 - 16.2) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const eating = t > 12.5;
  const p: HikerProps = {
    x: 560,
    y: groundY + 30,
    scale: 1.5,
    walk: 0,
    lean: 0.06,
    poles: false,
    handOverride: eating ? [52, -92] : [30, 34],
    breathe: Math.sin(t * 2.4) * 2,
  };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={COLD}
        camX={lt * 6}
        foreground={
          <g>
            <SnowWoods y={groundY - 30} shift={420} />
            <SnowTrail y={groundY} />
            <Person {...p} outfit={DAN} expression={eating ? "happy" : "neutral"} />
            {eating && <Bar p={p} />}
            <Breath p={p} t={t} />
            <Snowfall t={t} o={0.45} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Here's\nthe fix."} t={t} t0={10.65} t1={11.5} top={200} size={160} />
      <Chip text="Eat in the cold" t={t} t0={11.6} t1={16.2} x={80} y={220} icon="check" big />
      <HourCard t={t} t0={12.6} t1={16.2} />
      <Chip text="Before you feel hungry" t={t} t0={14.58} t1={16.2} x={80} y={800} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S3b FIX: food is fuel, bars in an inside pocket (16.15 - 22.3) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const ph = lt * 3.8;
  const p: HikerProps = { x: 380 + lt * 34, y: groundY + 30, scale: 1.5, phase: ph, walk: 0.75, lean: 0.12, poles: false, handOverride: freeHand(ph, 0.75) };
  const pocket = t > 18.3;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={COLD}
        camX={lt * 16}
        foreground={
          <g>
            <SnowWoods y={groundY - 30} shift={lt * 40 + 600} />
            <SnowTrail y={groundY} />
            <Person {...p} outfit={DAN} expression="happy" />
            {pocket && (
              <g transform={hikerTransform(p)}>
                {(() => {
                  const g = hikerGeometry(p);
                  const [sx, sy] = g.sh;
                  return (
                    <g>
                      <rect x={sx - 6} y={sy + 26} width={26} height={30} rx={4} fill="#23476B" stroke="#1a3550" strokeWidth={2} />
                      <rect x={sx} y={sy + 16} width={12} height={20} rx={3} fill="#c8963e" />
                    </g>
                  );
                })()}
              </g>
            )}
            <Breath p={p} t={t} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <FuelCard t={t} k={[16.24, 17.04, 17.81]} t1={18.35} />
      <Chip text="Bars in an inside pocket" t={t} t0={18.39} x={80} y={220} icon="check" big />
      <Readout label="CLOSE TO YOUR BODY" value="SOFT" ok={true} t={t} t0={20.4} x={80} y={360} pulseAt={21.37} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: warm at the top (22.25 - 24.3) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  const p: HikerProps = { x: 540, y: groundY + 40, scale: 1.65, walk: 0, lean: 0.04, poles: false, handOverride: [36, -40], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l5"
        pal={SUMMIT}
        camX={lt * 20}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <Pine x={-40} y={groundY - 40} h={420} c="#3b6550" c2="#2b4d3c" />
            <Pine x={1060} y={groundY - 50} h={460} c="#3b6550" c2="#2b4d3c" />
            <SnowTrail y={groundY} />
            <Person {...p} outfit={DAN} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={800} />
      <Title text={"Warm at\nthe top."} t={t} t0={off + 0.1} top={190} size={150} />
      <Chip text="Fed every hour" t={t} t0={22.9} x={80} y={540} icon="check" />
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

export const V46: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={4.3} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={4.25} to={10.5}>
        <S2 off={4.25} />
      </Scene>
      <Scene from={10.45} to={16.2}>
        <S3a off={10.45} />
      </Scene>
      <Scene from={16.15} to={22.3}>
        <S3b off={16.15} />
      </Scene>
      <Scene from={22.25} to={24.3} fadeIn={0.12}>
        <S4 off={22.25} />
      </Scene>
      <Scene from={24.25} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions
        words={words}
        windows={[
          [0.3, 4.25, 960],
          [4.25, 10.45, 960],
          [10.45, 16.15, 960],
          [16.15, 22.25, 960],
          [22.25, 24.25, 900],
        ]}
      />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
