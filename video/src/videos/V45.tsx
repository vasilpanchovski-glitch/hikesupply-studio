import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v45.json";

const words = vo.words as unknown as Word[];

const AUTUMN: Palette = {
  sky: ["#4d86c0", "#bcd6ea", "#f6ead2"],
  sun: { x: 820, y: 640, r: 58, color: "#fffbe8", glow: "#ffeab0" },
  layers: ["#c2bfae", "#b0a07c", "#a07e52", "#8a6440", "#6e4e30"],
  mist: "#f4e8d0",
};
const LOT: Palette = {
  sky: ["#5a8fc2", "#c4d8e6", "#efe8da"],
  sun: { x: 240, y: 700, r: 56, color: "#fffbe8", glow: "#fff0c8" },
  layers: ["#b4bcc0", "#9ca694", "#8c8e66", "#76744e", "#5e5c3e"],
  mist: "#eef0e6",
};

const PRIYA: Outfit = {
  ...GUIDE,
  skin: "#B98262",
  skinShade: "#9C684B",
  hair: "#1d1512",
  ponytail: "#1d1512",
  beard: null,
  cap: "#C8963E",
  capShade: "#A37828",
  jacket: "#7A3E5A",
  jacketShade: "#5F2E46",
  pants: "#3E4650",
  pantsShade: "#2E353D",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};
const FRIEND: Outfit = {
  ...JAKE,
  skin: "#EDC3A4",
  skinShade: "#D0A283",
  hair: "#c08a4a",
  beard: null,
  cap: "#2F62B0",
  capShade: "#244C8A",
  jacket: "#4E6B3A",
  jacketShade: "#3C542C",
  pack: "#8E5B3E",
  packShade: "#734631",
};

const Trail: React.FC<{ y: number; grass?: string; dirt?: string }> = ({ y, grass = "#7c7a44", dirt = "#bf9f76" }) => (
  <g>
    <rect x={-300} y={y - 40} width={1700} height={700} fill={grass} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={dirt} />
    {Array.from({ length: 14 }, (_, i) => (
      <ellipse key={i} cx={(i * 137) % 1100} cy={y + 130 + ((i * 53) % 160)} rx={9} ry={5} fill={i % 2 ? "#d0702e" : "#e3a23a"} opacity={0.8} />
    ))}
  </g>
);
const FallWoods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <g>
    {Array.from({ length: 8 }, (_, i) => {
      const x = ((((-120 + i * 190 - shift) % 1520) + 1520) % 1520) - 220;
      return i % 4 === 2 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 18} h={500} c="#3b6550" c2="#2b4d3c" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={420 + (i % 3) * 50} c={i % 2 ? "#e0a03a" : "#c8642e"} c2={i % 2 ? "#bf8128" : "#a24c22"} />
      );
    })}
  </g>
);

// Waterfall pouring off a rock ledge into a pool.
const Falls: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => (
  <g transform={`translate(${x},${y})`}>
    <path d="M-220,0 L-200,-620 L-60,-700 L80,-680 L240,-560 L260,0 Z" fill="#7d7a72" />
    <path d="M-200,-620 L-60,-700 L-80,-560 L-180,-420 Z" fill="#94918a" />
    <rect x={-50} y={-670} width={110} height={660} fill="#d8ecf4" />
    {Array.from({ length: 6 }, (_, i) => {
      const yy = ((t * 600 + i * 120) % 660) - 670;
      return <rect key={i} x={-40 + (i % 3) * 30} y={yy} width={10} height={70} rx={5} fill="#ffffff" opacity={0.75} />;
    })}
    <ellipse cx={5} cy={0} rx={240} ry={40} fill="#8fc4d8" />
    <ellipse cx={5} cy={-8} rx={120} ry={18} fill="#ffffff" opacity={0.6} />
  </g>
);

// Small notebook held in the near hand.
const Notebook: React.FC<{ p: HikerProps; open?: number }> = ({ p, open = 1 }) => {
  const g = hikerGeometry(p);
  const h = g.arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] + 6},${h[1] - 10}) rotate(-12)`}>
        <rect x={-26} y={-34} width={52} height={44} rx={4} fill="#3E5F4B" />
        <rect x={-22} y={-31} width={22 * open} height={38} rx={2} fill="#f6f1e6" />
        <rect x={0} y={-31} width={22} height={38} rx={2} fill="#f6f1e6" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={4} y={-25 + i * 8} width={14} height={2.5} fill="#9a9488" />
        ))}
      </g>
    </g>
  );
};

// White card: the questions she can't answer.
const ForgotCard: React.FC<{ t: number; t0: number; k: number[] }> = ({ t, t0, k }) => {
  if (isClean()) return null;
  const rows = ["Trail name", "Distance", "Parking"];
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 330,
        height: 470,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        opacity: at(t, [t0, t0 + 0.3], [0, 1]),
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <div style={{ position: "absolute", top: 34, left: 0, right: 0, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 34, letterSpacing: 4, color: "#6b6b66" }}>
        BEST HIKE OF THE FALL
      </div>
      {rows.map((r, i) => (
        <div
          key={r}
          style={{
            position: "absolute",
            left: 50,
            right: 50,
            top: 110 + i * 116,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: i < 2 ? "3px solid #ece8df" : "none",
            paddingBottom: 18,
            opacity: at(t, [k[i], k[i] + 0.25], [0, 1]),
            translate: `${at(t, [k[i], k[i] + 0.4], [40, 0], outExpo)}px 0px`,
          }}
        >
          <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 64, color: C.ink, textTransform: "uppercase" }}>{r}</div>
          <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 80, color: "#D9443A" }}>?</div>
        </div>
      ))}
    </div>
  );
};

// White card: the trail log page filling in, line by line.
const LogCard: React.FC<{ t: number; t0: number; k: number[] }> = ({ t, t0, k }) => {
  if (isClean()) return null;
  const rows: [string, string][] = [
    ["Date", "Oct 18"],
    ["Trail", "Falls Loop"],
    ["Miles", "4.2 mi · 6.8 km"],
    ["Time", "2 h 15 min"],
    ["Weather", "Sunny, 58°F · 14°C"],
    ["Next time", "Pack gloves"],
  ];
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 200,
        height: 640,
        borderRadius: 30,
        background: "#fbf8f1",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        opacity: at(t, [t0, t0 + 0.3], [0, 1]),
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <div style={{ position: "absolute", top: 30, left: 50, fontFamily: HEAD, fontWeight: 700, fontSize: 34, letterSpacing: 4, color: "#6b6b66" }}>TRAIL LOG</div>
      {rows.map(([a, b], i) => (
        <div
          key={a}
          style={{
            position: "absolute",
            left: 50,
            right: 50,
            top: 90 + i * 88,
            display: "flex",
            alignItems: "baseline",
            gap: 24,
            borderBottom: "3px solid #ece8df",
            paddingBottom: 10,
            opacity: at(t, [k[i], k[i] + 0.25], [0, 1]),
          }}
        >
          <div style={{ width: 230, flexShrink: 0, fontFamily: HEAD, fontWeight: 700, fontSize: 40, letterSpacing: 1, color: "#6b6b66", textTransform: "uppercase" }}>{a}</div>
          <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 54, color: C.ink, textTransform: "uppercase", whiteSpace: "nowrap" }}>{b}</div>
        </div>
      ))}
    </div>
  );
};

// ============ S1 HOOK: the friend asks about her best hike (0 - 3.25) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1760;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={LOT}
        camX={t * 10}
        zoom={mix(1.03, 1.08, t / 3.25)}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={t * 14} />
            <Trail y={groundY} grass="#7c7a44" dirt="#b9a27e" />
            <Car x={150} y={groundY + 40} s={1.5} body="#4E6B8A" shade="#3a536c" />
            <Person x={420} y={groundY + 30} scale={1.45} walk={0} lean={0.04} poles={false} handOverride={[30, 34]} outfit={PRIYA} expression="happy" breathe={Math.sin(t * 2.4) * 2} />
            <Person x={790} y={groundY + 30} scale={1.45} walk={0} lean={0.04} poles={false} handOverride={[40, 20]} outfit={FRIEND} expression="happy" flip breathe={Math.sin(t * 2.2 + 1) * 2} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={950} />
      <Title text={"She forgot\nher favorite\ntrail's name"} t={t} t0={0} top={130} size={140} />
      <Chip text="Best hike this fall?" t={t} t0={1.89} x={80} y={590} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2a PROBLEM: the memory, golden trees and a waterfall (3.2 - 5.95) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const ph = lt * 4;
  const p: HikerProps = { x: 300 + lt * 50, y: groundY + 30, scale: 1.4, phase: ph, walk: 0.8, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.8) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={AUTUMN}
        camX={lt * 18}
        zoom={mix(1.08, 1.03, lt / 2.75)}
        foreground={
          <g>
            <Falls x={760} y={groundY - 60} t={t} />
            <FallWoods y={groundY - 30} shift={lt * 30 + 400} />
            <Trail y={groundY} />
            <Person {...p} outfit={PRIYA} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim />
      <Chip text="Golden trees" t={t} t0={3.3} x={80} y={220} icon="check" />
      <Chip text="A waterfall" t={t} t0={4.26} x={80} y={320} icon="check" />
      <Chip text="An easy loop" t={t} t0={5.06} x={80} y={420} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S2b PROBLEM: she can't remember the details (5.9 - 10.55) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={LOT}
        camX={40 + lt * 6}
        zoom={mix(1.04, 1.09, lt / 4.6)}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={60} />
            <Trail y={groundY} grass="#7c7a44" dirt="#b9a27e" />
            <Person x={420} y={groundY + 30} scale={1.45} walk={0} lean={0.02} poles={false} handOverride={[40, -60]} outfit={PRIYA} expression="tired" breathe={Math.sin(t * 2.4) * 2} />
            <Person x={790} y={groundY + 30} scale={1.45} walk={0} lean={0.04} poles={false} handOverride={[30, 34]} outfit={FRIEND} expression="neutral" flip breathe={Math.sin(t * 2.2 + 1) * 2} />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim h={900} />
      <ForgotCard t={t} t0={6.0} k={[7.59, 8.32, 9.36]} />
    </AbsoluteFill>
  );
};

// ============ S3a FIX: two minutes at the car (10.5 - 14.3) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const p: HikerProps = { x: 560, y: groundY + 30, scale: 1.5, walk: 0, lean: 0.12, poles: false, handOverride: [50, -70], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={GOLDEN}
        camX={lt * 6}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={500} />
            <Trail y={groundY} grass="#6f6a3c" dirt="#b08c62" />
            <Car x={250} y={groundY + 40} s={1.6} body="#4E6B8A" shade="#3a536c" />
            <Person {...p} outfit={PRIYA} expression="happy" />
            <Notebook p={p} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Here's\nthe fix."} t={t} t0={10.65} t1={11.5} top={200} size={160} />
      <Readout label="AT THE CAR" value="2 MIN" ok={null} t={t} t0={11.5} x={80} y={220} pulseAt={11.59} />
      <Chip text="After every hike" t={t} t0={12.99} x={80} y={470} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S3b FIX: the log fills in (14.25 - 20.0) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1800;
  const p: HikerProps = { x: 560, y: groundY + 30, scale: 1.4, walk: 0, lean: 0.12, poles: false, handOverride: [50, -70], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l5"
        pal={GOLDEN}
        camX={20 + lt * 5}
        dim={0.1}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={520} />
            <Trail y={groundY} grass="#6f6a3c" dirt="#b08c62" />
            <Car x={250} y={groundY + 40} s={1.5} body="#4E6B8A" shade="#3a536c" />
            <Person {...p} outfit={PRIYA} expression="happy" />
            <Notebook p={p} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <LogCard t={t} t0={14.3} k={[14.87, 15.25, 15.83, 16.46, 17.39, 18.37]} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: a year of hikes, her own guidebook (19.95 - 23.2) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1760;
  const pP: HikerProps = { x: 430, y: groundY + 30, scale: 1.45, walk: 0, lean: 0.04, poles: false, handOverride: [60, -50], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l6"
        pal={AUTUMN}
        camX={lt * 16}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={lt * 20 + 700} />
            <Trail y={groundY} />
            <Person {...pP} outfit={PRIYA} expression="happy" />
            <Notebook p={pP} />
            <Person x={800} y={groundY + 30} scale={1.45} walk={0} lean={0.06} poles={false} handOverride={[30, 34]} outfit={FRIEND} expression="happy" flip breathe={Math.sin(t * 2.2 + 1) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={800} />
      <Title text={"Your own\nguidebook."} t={t} t0={off + 0.1} top={190} size={150} />
      <Chip text="A year of trails" t={t} t0={20.88} x={80} y={540} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-journal-trail-log-printable-card.jpg"
      spec="PRINTABLE PDF · 52 HIKE PAGES"
      name={
        <>
          Hiking Journal
          <br />& Trail Log
        </>
      }
      nameSize={96}
      price="$7.99"
      save="Save this before your next hike"
    />
  );
};

export const V45: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={3.25} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={3.2} to={5.95}>
        <S2a off={3.2} />
      </Scene>
      <Scene from={5.9} to={10.55}>
        <S2b off={5.9} />
      </Scene>
      <Scene from={10.5} to={14.3}>
        <S3a off={10.5} />
      </Scene>
      <Scene from={14.25} to={20.0}>
        <S3b off={14.25} />
      </Scene>
      <Scene from={19.95} to={23.2} fadeIn={0.12}>
        <S4 off={19.95} />
      </Scene>
      <Scene from={23.15} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions
        words={words}
        windows={[
          [0.3, 3.2, 900],
          [3.2, 5.9, 960],
          [5.9, 10.5, 960],
          [10.5, 14.25, 960],
          [14.25, 19.95, 960],
          [19.95, 23.15, 900],
        ]}
      />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
