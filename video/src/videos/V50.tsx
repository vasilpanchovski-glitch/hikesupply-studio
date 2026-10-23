import React from "react";
import { AbsoluteFill } from "remotion";
import { hikerGeometry, hikerTransform, HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v50.json";

const words = vo.words as unknown as Word[];

const AUTUMN: Palette = {
  sky: ["#4d86c0", "#bcd6ea", "#f6ead2"],
  sun: { x: 820, y: 640, r: 58, color: "#fffbe8", glow: "#ffeab0" },
  layers: ["#c2bfae", "#b0a07c", "#a07e52", "#8a6440", "#6e4e30"],
  mist: "#f4e8d0",
};
const DEEP: Palette = {
  sky: ["#5c7e9e", "#b8c7cf", "#e4ddcd"],
  sun: { x: 240, y: 700, r: 44, color: "#fffbe8", glow: "#fff0c8" },
  layers: ["#aeac9c", "#988c6e", "#826c50", "#6c543c", "#56422f"],
  mist: "#e6dfd0",
};
const MORNING: Palette = {
  sky: ["#5a8fc4", "#c4dbec", "#f8ecd6"],
  sun: { x: 300, y: 780, r: 56, color: "#fffbe8", glow: "#ffe9b0" },
  layers: ["#c6c2b0", "#b3a37f", "#a38054", "#8c6642", "#705032"],
  mist: "#f6ead4",
};

const DAD: Outfit = {
  ...JAKE,
  skin: "#B47A58",
  skinShade: "#965F40",
  hair: "#2a1d16",
  beard: "#2a1d16",
  cap: "#B5553A",
  capShade: "#8E3F2A",
  jacket: "#3E5F4B",
  jacketShade: "#2E4A39",
  pack: "#4E6B8A",
  packShade: "#3a536c",
};
const LEO: Outfit = {
  ...JAKE,
  skin: "#C08562",
  skinShade: "#A26A49",
  hair: "#2a1d16",
  beard: null,
  cap: "#2F7F86",
  capShade: "#256870",
  jacket: "#E0A33A",
  jacketShade: "#B9822A",
  pants: "#3E4650",
  pantsShade: "#2E353D",
  pack: "#C8476A",
  packShade: "#A23552",
};
const KID = 1.0;

const Trail: React.FC<{ y: number; grass?: string; dirt?: string }> = ({ y, grass = "#7c7a44", dirt = "#bf9f76" }) => (
  <g>
    <rect x={-300} y={y - 40} width={1700} height={700} fill={grass} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={dirt} />
    {Array.from({ length: 14 }, (_, i) => (
      <ellipse key={i} cx={(i * 137) % 1100} cy={y + 130 + ((i * 53) % 160)} rx={9} ry={5} fill={i % 2 ? "#d0702e" : "#e3a23a"} opacity={0.8} />
    ))}
  </g>
);
// Forest floor without a clear path (off trail).
const Floor: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={-300} y={y - 40} width={1700} height={700} fill="#6f6a3c" />
    {Array.from({ length: 26 }, (_, i) => (
      <ellipse key={i} cx={(i * 97) % 1100} cy={y + 10 + ((i * 41) % 260)} rx={11} ry={6} fill={i % 3 ? "#c8642e" : "#e0a03a"} opacity={0.85} />
    ))}
  </g>
);
const FallWoods: React.FC<{ y: number; shift: number; dense?: boolean }> = ({ y, shift, dense }) => (
  <g>
    {Array.from({ length: dense ? 10 : 8 }, (_, i) => {
      const step = dense ? 150 : 190;
      const x = ((((-120 + i * step - shift) % 1520) + 1520) % 1520) - 220;
      return i % 4 === 2 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 18} h={500} c="#3b6550" c2="#2b4d3c" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={420 + (i % 3) * 50} c={i % 2 ? "#e0a03a" : "#c8642e"} c2={i % 2 ? "#bf8128" : "#a24c22"} />
      );
    })}
  </g>
);
const Creek: React.FC<{ x0: number; y: number; t: number }> = ({ x0, y, t }) => (
  <g>
    <path d={`M${x0},${y - 10} Q${x0 + 200},${y - 30} 1400,${y - 20} L1400,${y + 90} Q${x0 + 200},${y + 80} ${x0 - 60},${y + 90} Z`} fill="#5d9fc2" />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M${x0 + ((i * 160 + t * 120) % 500)},${y + 20 + i * 20} q30,-8 60,0`} stroke="#e2f2f8" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.75} />
    ))}
  </g>
);
// Thick trunk the child can hug.
const Trunk: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <rect x={x - 38} y={y - 1700} width={76} height={1700} fill="#5a4030" />
    <rect x={x + 8} y={y - 1700} width={30} height={1700} fill="#4a3426" />
    <ellipse cx={x} cy={y - 1760} rx={320} ry={200} fill="#c8642e" />
    <ellipse cx={x + 150} cy={y - 1700} rx={190} ry={130} fill="#a24c22" />
  </g>
);
// Orange whistle in the near hand, plus sound arcs when blowing.
const Whistle: React.FC<{ p: HikerProps; blow: number }> = ({ p, blow }) => {
  const g = hikerGeometry(p);
  const h = g.arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] - 2},${h[1] - 10})`}>
        <rect x={0} y={-8} width={26} height={16} rx={4} fill="#E0784A" />
        <circle cx={26} cy={2} r={11} fill="#E0784A" />
      </g>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${h[0] + 50 + i * 26},${h[1] - 40} q18,30 0,60`}
          stroke="#fff"
          strokeWidth={7}
          fill="none"
          strokeLinecap="round"
          opacity={blow * (0.9 - i * 0.25)}
        />
      ))}
    </g>
  );
};

// Three whistle blasts card.
const BlastCard: React.FC<{ t: number; t0: number; k: number[]; t1: number }> = ({ t, t0, k, t1 }) => {
  if (isClean()) return null;
  const o = at(t, [t0, t0 + 0.25], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]);
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 360,
        height: 330,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        opacity: o,
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <div style={{ position: "absolute", top: 30, left: 0, right: 0, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 34, letterSpacing: 4, color: "#6b6b66" }}>
        WHISTLE: 3 BLASTS, THEN AGAIN
      </div>
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 60 }}>
        {k.map((kk, i) => (
          <div
            key={i}
            style={{
              width: 160,
              height: 160,
              borderRadius: 80,
              background: t >= kk ? "#E0784A" : "#ece8df",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: HEAD,
              fontWeight: 800,
              fontSize: 90,
              color: t >= kk ? "#fff" : "#bdb7ab",
              scale: `${t >= kk ? at(t, [kk, kk + 0.3], [1.15, 1]) : 1}`,
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ S1 HOOK: ran ahead to the creek, turned around, dad gone (0 - 5.8) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1760;
  const running = t < 2.5;
  const ph = t * 5;
  const pL: HikerProps = {
    x: running ? 300 + t * 150 : 675,
    y: groundY + 40,
    scale: 1.2,
    phase: ph,
    walk: running ? 1 : 0,
    lean: running ? 0.14 : 0.02,
    poles: false,
    handOverride: running ? freeHand(ph, 1) : [24, 30],
    breathe: running ? 0 : Math.sin(t * 4) * 1.5,
  };
  const turned = t > 2.6;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={AUTUMN}
        camX={Math.min(t, 2.5) * 30}
        zoom={mix(1.03, 1.1, t / 5.8)}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={Math.min(t, 2.5) * 60} />
            <Trail y={groundY} />
            <Creek x0={820} y={groundY + 30} t={t} />
            <Person {...pL} outfit={LEO} expression={turned && t > 4.5 ? "tired" : turned ? "neutral" : "happy"} flip={turned} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={950} />
      <Title text={"Why he told\nhis son to\nhug a tree."} t={t} t0={0} top={130} size={140} />
      <Chip text="Ran ahead to the creek" t={t} t0={0.66} x={80} y={590} icon="none" />
      <Chip text="Turned around" t={t} t0={2.84} x={80} y={690} icon="none" />
      <Chip text="Dad: gone" t={t} t0={5.12} x={80} y={790} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: he wanted to run (5.75 - 7.35) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const pL: HikerProps = { x: 560, y: groundY + 40, scale: 1.25, walk: 0, lean: 0.12, poles: false, handOverride: [24, 30], breathe: Math.sin(t * 7) * 2.5 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={DEEP}
        camX={lt * 10}
        zoom={mix(1.12, 1.2, lt / 1.6)}
        dim={0.06}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={400} dense />
            <Floor y={groundY} />
            <Person {...pL} outfit={LEO} expression="tired" flip={Math.floor(t * 1.6) % 2 === 0} />
          </g>
        }
      />
      <Vignette strength={0.5} />
      <Scrim />
      <Chip text="Wanted to run" t={t} t0={6.1} x={80} y={220} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a FIX: taught at the trailhead: stay put, hug a tree (7.3 - 11.9) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={MORNING}
        camX={lt * 6}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={700} />
            <Trail y={groundY} />
            <Person x={360} y={groundY + 30} scale={1.5} walk={0} lean={0.06} poles={false} handOverride={t > 9.6 ? [70, -60] : [30, 34]} outfit={DAD} expression="happy" breathe={Math.sin(t * 2.2) * 2} />
            <Person x={680} y={groundY + 40} scale={KID} walk={0} lean={0.02} poles={false} handOverride={[24, 30]} outfit={LEO} expression="happy" flip breathe={Math.sin(t * 2.6) * 1.5} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Here's\nthe fix."} t={t} t0={7.5} t1={8.3} top={200} size={160} />
      <Chip text="Taught before the hike" t={t} t0={8.3} x={80} y={220} icon="none" />
      <Chip text="Lost? Stay put" t={t} t0={10.1} x={80} y={330} icon="check" big />
      <Chip text="Hug a tree" t={t} t0={10.97} x={80} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3b FIX: hugging a tree, three blasts, easier to find (11.85 - 17.75) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const blowing = t > 12.4 && t < 14.6;
  const blow = blowing ? Math.max(0, Math.sin((t - 12.4) * 9)) : 0;
  const pL: HikerProps = {
    x: 470,
    y: groundY + 40,
    scale: 1.3,
    walk: 0,
    lean: 0.04,
    poles: false,
    handOverride: blowing ? [36, -118] : [64, -40],
    breathe: Math.sin(t * 2.6) * 1.5,
  };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={DEEP}
        camX={lt * 8}
        zoom={mix(1.04, 1.1, lt / 5.9)}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={900} dense />
            <Floor y={groundY} />
            <Trunk x={470 + 64 * 1.3 + 6} y={groundY + 50} />
            <Person {...pL} outfit={LEO} expression="neutral" />
            {blowing && <Whistle p={pL} blow={blow} />}
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim h={900} />
      <BlastCard t={t} t0={12.0} k={[12.67, 12.91, 13.2]} t1={14.6} />
      <Chip text="Keep blowing" t={t} t0={13.65} t1={14.6} x={80} y={220} icon="check" big />
      <Chip text="Stay in one place" t={t} t0={15.04} x={80} y={220} icon="check" big />
      <Readout label="FOR SEARCHERS" value="EASIER TO FIND" ok={true} t={t} t0={16.33} x={80} y={360} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: dad heard the whistle; teach it at the trailhead (17.7 - 22.65) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1720;
  const arrive = Math.min(lt, 1.6);
  const walking = lt < 1.6;
  const ph = lt * 3.6;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l5"
        pal={AUTUMN}
        camX={lt * 14}
        zoom={at(lt, [0, 0.9], [1.18, 1.05], outExpo)}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={1100} />
            <Floor y={groundY} />
            <Trunk x={760} y={groundY + 50} />
            <Person
              x={120 + arrive * 140}
              y={groundY + 30}
              scale={1.5}
              phase={ph}
              walk={walking ? 0.7 : 0}
              lean={0.08}
              poles={false}
              handOverride={walking ? freeHand(ph, 0.7) : [60, -30]}
              outfit={DAD}
              expression="happy"
            />
            <Person x={560} y={groundY + 40} scale={1.1} walk={0} lean={0.02} poles={false} handOverride={[24, 30]} outfit={LEO} expression="happy" flip breathe={Math.sin(t * 2.6) * 1.5} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={900} />
      <Title text={"Found in\nminutes."} t={t} t0={off + 0.1} top={190} size={150} />
      <Chip text="He stayed put" t={t} t0={18.5} x={80} y={540} icon="check" />
      <Chip text="Teach it at the trailhead" t={t} t0={19.92} x={80} y={640} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/kids-trail-explorer-pack-scavenger-hunts-junior-hiker-journal-card.jpg"
      spec="24 PRINTABLE PAGES · AGES 4 TO 10"
      name={
        <>
          Kids Trail
          <br />
          Explorer Pack
        </>
      }
      nameSize={96}
      price="$4.99"
      save="Save this for your next family hike"
    />
  );
};

export const V50: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={5.8} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={5.75} to={7.35}>
        <S2 off={5.75} />
      </Scene>
      <Scene from={7.3} to={11.9}>
        <S3a off={7.3} />
      </Scene>
      <Scene from={11.85} to={17.75}>
        <S3b off={11.85} />
      </Scene>
      <Scene from={17.7} to={22.65} fadeIn={0.12}>
        <S4 off={17.7} />
      </Scene>
      <Scene from={22.6} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions
        words={words}
        windows={[
          [0.3, 5.75, 960],
          [5.75, 7.3, 960],
          [7.3, 11.85, 960],
          [11.85, 17.7, 960],
          [17.7, 22.6, 960],
        ]}
      />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
