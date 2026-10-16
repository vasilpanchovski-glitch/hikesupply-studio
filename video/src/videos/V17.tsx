import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, JAKE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v17.json";

const words = vo.words as unknown as Word[];

const FALL: Palette = {
  sky: ["#7aa6c8", "#d6d8cc", "#f4e2c2"],
  sun: { x: 800, y: 620, r: 58, color: "#fff6e0", glow: "#ffe0a0" },
  layers: ["#b8aa98", "#a58a70", "#8d6f52", "#715c40", "#55502f"],
  mist: "#f3e6cf",
};
const DUSKY: Palette = {
  sky: ["#43566a", "#8c8a80", "#c9b496"],
  sun: { x: 300, y: 900, r: 50, color: "#f7e7c8", glow: "#e9c08a" },
  layers: ["#7d7468", "#665c50", "#51493e", "#3e3a30", "#2c2b24"],
  mist: "#cdbb9c",
};

const DARK = { jacket: "#2E4A35", jacketShade: "#22382A", cap: "#3A4A3A", capShade: "#2A372A", pack: "#4A4A36", packShade: "#383826" };
const BLAZE = { jacket: "#FF6A13", jacketShade: "#D9530A", cap: "#FF6A13", capShade: "#D9530A", pack: "#FF7A1F", packShade: "#D9600E" };
const BEN: Outfit = { ...JAKE, ...DARK };

const TREES = [
  ["#D9822B", "#B8641E"],
  ["#C2452D", "#9C3522"],
  ["#E3B23C", "#C4952A"],
  ["#B5652A", "#93501F"],
];

// fall forest strip along a flat trail; scroll = camera x
const Forest: React.FC<{ groundY: number; scroll: number; blazes?: boolean; dim?: boolean }> = ({ groundY, scroll, blazes, dim }) => {
  const xs = [-80, 170, 430, 700, 950, 1200, 1460, 1720];
  return (
    <g>
      {xs.map((x0, i) => {
        const span = 1800;
        const x = ((((x0 - scroll * 0.55) % span) + span) % span) - 250;
        const [c, c2] = TREES[i % TREES.length];
        const h = 520 + (i % 3) * 90;
        return i % 4 === 3 ? (
          <Pine key={i} x={x} y={groundY - 40} h={h + 80} c={dim ? "#22352a" : "#2f5a43"} c2={dim ? "#1b2a21" : "#254a37"} />
        ) : (
          <g key={i}>
            <LeafTree x={x} y={groundY - 40} h={h} c={dim ? "#4a3a2c" : c} c2={dim ? "#3a2e23" : c2} trunk={dim ? "#2c241c" : "#5a4030"} />
            {blazes && i % 2 === 0 && <rect x={x - 10} y={groundY - 40 - h * 0.36} width={20} height={34} rx={2} fill="#fff" />}
          </g>
        );
      })}
      <rect x={-300} y={groundY - 40} width={1700} height={700} fill={dim ? "#3f4a30" : "#6f7d42"} />
      {/* fallen leaves */}
      {Array.from({ length: 26 }, (_, i) => {
        const span = 1500;
        const x = ((((i * 61 - scroll) % span) + span) % span) - 200;
        const y = groundY - 30 + ((i * 37) % 140);
        return <ellipse key={i} cx={x} cy={y} rx={9} ry={5} fill={dim ? "#5a4630" : TREES[i % 4][0]} opacity={0.8} />;
      })}
      <path d={`M-300,${groundY - 6} Q540,${groundY - 26} 1400,${groundY - 4} L1400,${groundY + 110} Q540,${groundY + 84} -300,${groundY + 110} Z`} fill={dim ? "#6b5a44" : "#b99a72"} />
    </g>
  );
};

// ============ S1 HOOK (0 - 7.1) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1640;
  const walk = at(t, [5.6, 6.1], [0.8, 0]);
  const scroll = t < 6.1 ? t * 60 : 6.1 * 60;
  const ring = (k: number) => at(t, [4.2 + k * 0.25, 5.6 + k * 0.25], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Landscape
        uid="b1"
        pal={FALL}
        camX={scroll * 0.4}
        zoom={mix(1.03, 1.1, at(t, [0, 7], [0, 1]))}
        children={
          <g>
            {[0, 1, 2].map((k) => (
              <circle key={k} cx={820} cy={1150} r={40 + ring(k) * 520} fill="none" stroke="#fff" strokeWidth={6 - k * 1.5} opacity={(1 - ring(k)) * (t > 4.2 + k * 0.25 ? 0.8 : 0)} />
            ))}
          </g>
        }
        foreground={
          <g>
            <Forest groundY={groundY} scroll={scroll} />
            <Person x={420} y={groundY + 40} scale={1.75} phase={t * 4.4} walk={walk} lean={mix(0.06, 0.18, walk / 0.8)} poleLen={240} outfit={BEN} expression={t < 4.4 ? "happy" : "neutral"} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim />
      <Title text={"It's hunting\nseason on\nyour trail."} t={t} t0={0} top={190} size={140} />
      <Chip text="Dark green jacket" t={t} t0={2.3} t1={6.9} x={80} y={650} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM (7.1 - 13.4) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  return (
    <AbsoluteFill>
      <Landscape
        uid="b2"
        pal={FALL}
        camX={120 + lt * 8}
        zoom={mix(1.0, 1.05, lt / 6.3)}
        foreground={
          <g>
            <Forest groundY={groundY} scroll={300 + lt * 6} />
            {/* hunting area sign */}
            <g transform={`translate(860,${groundY - 10})`}>
              <rect x={-9} y={-430} width={18} height={430} fill="#6a4a32" />
              <rect x={-150} y={-560} width={300} height={170} rx={12} fill="#F2C230" stroke="#3a2e1e" strokeWidth={7} />
              <text x={0} y={-485} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={62} fill="#1f1a12">HUNTING</text>
              <text x={0} y={-422} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={50} fill="#1f1a12">AREA</text>
            </g>
            <Person x={400} y={groundY + 30} scale={1.8} walk={0} lean={0.04} poleLen={240} outfit={BEN} expression="neutral" breathe={Math.sin(t * 2.4) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Chip text="Fall = hunting season" t={t} t0={7.6} t1={13.3} x={80} y={560} />
      <Chip text="Trails cross hunting land" t={t} t0={11.3} t1={13.3} x={80} y={660} icon="x" />
      <Readout label="VISIBILITY" value="LOW" ok={false} t={t} t0={9.4} t1={13.3} x={80} y={770} />
    </AbsoluteFill>
  );
};

// ============ S3 FIX (13.3 - 21.6) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1680;
  const orange = t > 17.9;
  const walk = at(t, [14.4, 14.9], [0, 0.8]);
  const scroll = lt * 50;
  return (
    <AbsoluteFill>
      <Landscape
        uid="b3"
        pal={FALL}
        camX={scroll * 0.3}
        foreground={
          <g>
            <Forest groundY={groundY} scroll={scroll} blazes={t > 19.9} />
            <Person x={360} y={groundY + 30} scale={1.75} phase={t * 4.4} walk={walk} lean={mix(0.05, 0.18, walk / 0.8)} poleLen={240} outfit={{ ...BEN, ...(orange ? BLAZE : DARK) }} expression="happy" />
            <g opacity={at(t, [17.85, 17.95, 18.4], [0, 0.8, 0])}>
              <circle cx={440} cy={groundY - 380} r={at(t, [17.85, 18.4], [60, 240])} fill="none" stroke="#fff" strokeWidth={6} />
            </g>
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Title text={"Here's\nthe fix."} t={t} t0={13.35} t1={14.5} top={200} size={160} />
      <Chip text="Check local season dates" t={t} t0={14.6} t1={21.5} x={80} y={420} icon="check" />
      <Chip text="Blaze orange, body + pack" t={t} t0={17.4} t1={21.5} x={80} y={520} icon="check" />
      <Chip text="Stay on the marked trail" t={t} t0={20.0} t1={21.5} x={80} y={620} icon="check" />
      <Readout label="VISIBILITY" value={orange ? "HIGH" : "LOW"} ok={orange} t={t} t0={14.8} t1={21.5} x={640} y={1080} pulseAt={17.9} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF (21.5 - 24.3) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  return (
    <AbsoluteFill>
      <Landscape
        uid="b4"
        pal={DUSKY}
        camX={lt * 14}
        zoom={at(lt, [0, 0.9], [1.25, 1.06], outExpo)}
        foreground={
          <g>
            <Forest groundY={groundY} scroll={500 + lt * 30} dim />
            <Person x={520} y={groundY + 30} scale={1.8} phase={lt * 4.4} walk={0.6} lean={0.14} poleLen={240} outfit={{ ...BEN, ...BLAZE }} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Title text={"The brightest\nthing in\nthe woods."} t={t} t0={off + 0.12} top={200} size={140} />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const BookArt: React.FC<{ lt: number }> = ({ lt }) => {
  const s = at(lt, [0.2, 1.1], [0.85, 1], outExpo);
  const o = at(lt, [0.1, 0.5], [0, 1]);
  return (
    <g transform={`translate(540,520) scale(${s}) rotate(-5)`} opacity={o}>
      {/* pages */}
      <rect x={-205} y={-285} width={430} height={590} rx={10} fill="#d9d2c4" />
      <rect x={-210} y={-292} width={425} height={588} rx={10} fill="#ece6da" />
      {/* cover */}
      <rect x={-225} y={-300} width={430} height={590} rx={12} fill={C.stone} />
      <rect x={-225} y={-300} width={26} height={590} rx={6} fill="#d8d0c0" />
      <rect x={-180} y={-250} width={340} height={250} rx={8} fill="#7aa6c8" />
      <path d="M-180,0 L-120,-110 L-70,-50 L0,-170 L80,-60 L120,-100 L160,-40 L160,0 Z" fill="#3f604f" />
      <path d="M0,-170 L-22,-132 L22,-132 Z" fill="#fff" />
      <circle cx={100} cy={-190} r={26} fill="#fff4d6" />
      <text x={-180} y={80} fontFamily={HEAD} fontWeight={800} fontSize={74} fill={C.forestDeep}>HIKING</text>
      <text x={-180} y={150} fontFamily={HEAD} fontWeight={800} fontSize={74} fill={C.forestDeep}>SAFETY GUIDE</text>
      <rect x={-180} y={180} width={120} height={8} rx={4} fill={C.forest} />
      <text x={-180} y={240} fontFamily={HEAD} fontWeight={600} fontSize={32} letterSpacing={3} fill="#6b6b66">HIKESUPPLY CO.</text>
    </g>
  );
};

const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  void off;
  return (
    <EndCard
      lt={lt}
      art={<BookArt lt={lt} />}
      spec="DIGITAL GUIDE · 10 CHAPTERS · INSTANT DOWNLOAD"
      name={
        <>
          Hiking
          <br />
          Safety Guide
        </>
      }
      shadowY={860}
      price="$8.99"
      save="Save this for your fall hikes"
    />
  );
};

export const V17: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={7.15} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={7.05} to={13.4}>
        <S2 off={7.05} />
      </Scene>
      <Scene from={13.3} to={21.6}>
        <S3 off={13.3} />
      </Scene>
      <Scene from={21.5} to={24.3} fadeIn={0.12}>
        <S4 off={21.5} />
      </Scene>
      <Scene from={24.2} to={30} fadeOut={0}>
        <S5 off={24.2} />
      </Scene>
      <Captions words={words} windows={[[0.3, 7.05, 860], [7.1, 13.3, 300], [14.5, 21.5, 860]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
