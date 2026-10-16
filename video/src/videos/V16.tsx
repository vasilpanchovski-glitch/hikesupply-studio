import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, inOut, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v16.json";

const words = vo.words as unknown as Word[];

const MORNING: Palette = {
  sky: ["#6f9cc0", "#b9cfd8", "#f1dfbf"],
  sun: { x: 820, y: 640, r: 60, color: "#fff6e0", glow: "#ffe2a8" },
  layers: ["#a9bccb", "#8aa3b3", "#6f8f8a", "#557868", "#3f604f"],
  mist: "#f3ead8",
};
const WINDY: Palette = {
  sky: ["#5d7489", "#9fb0bd", "#d6dde0"],
  sun: { x: 300, y: 560, r: 50, color: "#f2f4f2", glow: "#dfe6ea" },
  layers: ["#9aa8b2", "#7f8f9a", "#677780", "#4f5f66", "#3b484e"],
  mist: "#e6ebee",
};
const SUMMIT: Palette = {
  sky: ["#4f7fae", "#f0c48c", "#ffe7bb"],
  sun: { x: 760, y: 860, r: 90, color: "#fff7df", glow: "#ffcf86" },
  layers: ["#d8b291", "#b88d74", "#8a6c5f", "#5d4c46", "#3b3230"],
  mist: "#ffe6c2",
};

const FLEECE = { jacket: "#B83A55", jacketShade: "#8E2B42" };
const MAYA: Outfit = {
  ...GUIDE,
  ...FLEECE,
  skin: "#EDBB9C",
  skinShade: "#D29C7C",
  hair: "#5a3322",
  ponytail: "#5a3322",
  beard: null,
  cap: "#D9CBB0",
  capShade: "#B9AA8C",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};
const BASE = { jacket: "#5E8FA8", jacketShade: "#4A7389" };
const OLD: Outfit = { ...GUIDE, jacket: "#7A5A3A", jacketShade: "#5E452C", cap: "#3E4F5C", capShade: "#2C3943" };

const Drops: React.FC<{ p: HikerProps; t: number; on: number }> = ({ p, t, on }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={on}>
      {[0, 1, 2].map((i) => {
        const k = ((t * 0.9 + i * 0.33) % 1 + 1) % 1;
        const x = g.head[0] + 30 + i * 6;
        const y = g.head[1] - 10 + k * 40;
        return <path key={i} d={`M${x},${y - 8} Q${x + 5},${y} ${x},${y + 4} Q${x - 5},${y} ${x},${y - 8} Z`} fill="#8fd0ff" opacity={1 - k} />;
      })}
    </g>
  );
};

// ============ S1 HOOK: zipped up on the climb (0 - 5.4) ============
const S1: React.FC = () => {
  const t = useT();
  const k = 0.22;
  const sl = Math.atan(k);
  const gy = (x: number) => 1760 - (x + 100) * k;
  const ground = `M-300,2200 L-300,${gy(-300)} L1500,${gy(1500)} L1500,2200 Z`;
  const trail = `M-300,${gy(-300) + 30} L1500,${gy(1500) + 30} L1500,${gy(1500) + 120} L-300,${gy(-300) + 120} Z`;
  const mx = 420;
  const maya: HikerProps = { x: mx, y: gy(mx) + 70, scale: 1.5, phase: t * 4.2, walk: 0.75, lean: 0.3, poles: false, handOverride: freeHand(t * 4.2, 0.75), slope: sl * 0.75 };
  const sweat = at(t, [3.0, 5.2], [0.12, 0.92], inOut);
  return (
    <AbsoluteFill>
      <Landscape
        uid="a1"
        pal={MORNING}
        camX={t * 28}
        zoom={mix(1.03, 1.1, t / 5.4)}
        foreground={
          <g>
            {[-40, 140, 960, 1100].map((x, i) => (
              <Pine key={i} x={x - t * 10} y={gy(x) + 10} h={380 + (i % 2) * 80} c="#2f5a43" c2="#254a37" />
            ))}
            <path d={ground} fill="#5f8a4f" />
            <path d={trail} fill="#b99a72" />
            {Array.from({ length: 14 }, (_, i) => {
              const x = -100 + i * 95;
              return <path key={i} d={`M${x},${gy(x) + 8} l8,-22 l6,20 l7,-16 l5,18 Z`} fill="#4d7a40" />;
            })}
            <Person {...maya} outfit={MAYA} expression={t < 3.2 ? "neutral" : "tired"} />
            <Drops p={maya} t={t} on={at(t, [3.0, 3.4], [0, 1])} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim />
      <Title text={"You're\nwearing\ntoo much."} t={t} t0={0} top={190} size={150} />
      <Chip text="Fleece zipped to the chin" t={t} t0={0.9} t1={3.0} x={80} y={690} icon="x" />
      <div style={{ position: "absolute", top: 690, left: 80, opacity: at(t, [3.0, 3.3], [0, 1]) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 22px", borderRadius: 16, background: "rgba(255,255,255,0.94)", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 34, letterSpacing: 2, color: C.ink }}>SWEAT</div>
          <div style={{ width: 260, height: 16, borderRadius: 8, background: "#e3e0d8", overflow: "hidden" }}>
            <div style={{ width: 260 * sweat, height: 16, background: sweat > 0.6 ? "#D9443A" : "#E8A33D" }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: windy summit, old hiker (5.4 - 11.1) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  const shiver = t > 7.0 ? Math.sin(t * 46) * 2.5 : 0;
  const ox = mix(1300, 790, at(t, [8.9, 10.3], [0, 1], inOut));
  const oWalk = at(t, [9.9, 10.4], [1, 0]);
  return (
    <AbsoluteFill>
      <Landscape
        uid="a2"
        pal={WINDY}
        camX={40 + lt * 8}
        zoom={mix(1.0, 1.05, lt / 5.6)}
        foreground={
          <g>
            <path d={`M-300,2200 L-300,${groundY - 10} Q540,${groundY - 60} 1400,${groundY - 6} L1400,2200 Z`} fill="#7b8a6a" />
            <path d={`M-300,${groundY + 30} Q540,${groundY - 10} 1400,${groundY + 30} L1400,${groundY + 110} Q540,${groundY + 70} -300,${groundY + 110} Z`} fill="#a89a80" />
            {/* summit cairn */}
            <g transform={`translate(1000,${groundY - 30})`}>
              <ellipse cx={0} cy={0} rx={70} ry={26} fill="#8d8a84" />
              <ellipse cx={0} cy={-34} rx={52} ry={22} fill="#a19d96" />
              <ellipse cx={0} cy={-62} rx={34} ry={16} fill="#8d8a84" />
            </g>
            <g transform={`translate(${shiver},0)`}>
              <Person x={360} y={groundY} scale={1.8} walk={0} lean={0.02} poles={false} handOverride={[14, 30]} outfit={{ ...MAYA, ...FLEECE }} expression="tired" breathe={Math.sin(t * 3) * 2} />
            </g>
            <Person x={ox} y={groundY} scale={1.75} walk={oWalk} phase={t * 5} lean={0.08} poleLen={240} outfit={OLD} flip expression="happy" />
            {/* wind streaks */}
            {Array.from({ length: 9 }, (_, i) => {
              const y = 700 + i * 110 + (i % 3) * 25;
              const x = ((t * 900 + i * 337) % 1800) - 400;
              return <path key={i} d={`M${x},${y} q120,-14 240,0`} stroke="#fff" strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.55} />;
            })}
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim />
      <Chip text="Wet shirt" t={t} t0={7.0} t1={8.8} x={80} y={560} icon="x" />
      <Chip text="Cold wind" t={t} t0={7.5} t1={8.8} x={80} y={660} icon="x" />
      <Readout label="FEELS" value="ICE COLD" ok={false} t={t} t0={7.9} t1={8.85} x={80} y={760} />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: start cold, layers off, warm layer on at stops (11.0 - 19.1) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const k = 0.16;
  const sl = Math.atan(k);
  const gy = (x: number) => 1780 - (x + 100) * k;
  const ground = `M-300,2200 L-300,${gy(-300)} L1500,${gy(1500)} L1500,2200 Z`;
  const trail = `M-300,${gy(-300) + 30} L1500,${gy(1500) + 30} L1500,${gy(1500) + 120} L-300,${gy(-300) + 120} Z`;
  const walk = at(t, [16.2, 16.7], [0.8, 0]);
  const fleeceOn = t > 17.3;
  const mx = 330;
  // keep the walk phase continuous while slowing down
  const phase = t * 4.2;
  const scroll = t < 16.5 ? lt * 26 : (16.5 - off) * 26;
  return (
    <AbsoluteFill>
      <Landscape
        uid="a3"
        pal={MORNING}
        camX={scroll}
        foreground={
          <g>
            {[-60, 560, 1060, 1500].map((x, i) => (
              <Pine key={i} x={x - scroll * 0.6} y={gy(x - scroll * 0.6) + 10} h={420 + (i % 2) * 90} c="#2f5a43" c2="#254a37" />
            ))}
            <path d={ground} fill="#5f8a4f" />
            <path d={trail} fill="#b99a72" />
            <Person x={mx} y={gy(mx) + 70} scale={1.7} phase={phase} walk={walk} lean={mix(0.06, 0.24, walk)} poles={false} handOverride={freeHand(phase, walk)} slope={sl * mix(0, 0.75, walk / 0.8)} outfit={{ ...MAYA, ...(fleeceOn ? FLEECE : BASE) }} expression="happy" />
            {/* puff when the fleece goes on */}
            <g opacity={at(t, [17.25, 17.35, 17.8], [0, 0.8, 0])}>
              <circle cx={mx + 60} cy={gy(mx) - 300} r={at(t, [17.25, 17.8], [60, 220])} fill="none" stroke="#fff" strokeWidth={6} />
            </g>
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Title text={"Be bold,\nstart cold."} t={t} t0={11.05} t1={12.6} top={200} size={170} />
      <Chip text="Start a little chilly" t={t} t0={13.3} t1={19.0} x={80} y={420} icon="check" />
      <Chip text="Layers off before you sweat" t={t} t0={14.7} t1={19.0} x={80} y={520} icon="check" />
      <Chip text="Warm layer on when you stop" t={t} t0={17.0} t1={19.0} x={80} y={620} icon="check" />
      <Readout label="WARM LAYER" value={fleeceOn ? "ON" : "OFF"} ok={fleeceOn ? true : null} t={t} t0={12.8} t1={19.0} x={640} y={1120} pulseAt={17.3} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF (19.0 - 22.4) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const crestY = 1540;
  const ground = `M-300,2200 L-300,1700 Q250,1560 620,${crestY} Q900,1548 1400,1720 L1400,2200 Z`;
  return (
    <AbsoluteFill>
      <Landscape
        uid="a4"
        pal={SUMMIT}
        camX={lt * 18}
        zoom={at(lt, [0, 0.9], [1.25, 1.06], outExpo)}
        foreground={
          <g>
            <g opacity={0.25} transform={`rotate(${lt * 5},760,860)`}>
              {Array.from({ length: 10 }, (_, i) => (
                <path key={i} d={`M760,860 L${760 + 1800 * Math.cos((i / 10) * Math.PI * 2)},${860 + 1800 * Math.sin((i / 10) * Math.PI * 2)} L${760 + 1800 * Math.cos((i / 10 + 0.025) * Math.PI * 2)},${860 + 1800 * Math.sin((i / 10 + 0.025) * Math.PI * 2)} Z`} fill="#fff3d0" />
              ))}
            </g>
            <path d={ground} fill="#7d8f55" />
            <path d={`M-300,1760 Q250,1610 620,${crestY + 30} Q900,1590 1400,1770 L1400,1820 Q900,1640 620,${crestY + 80} Q250,1660 -300,1820 Z`} fill="#c7a77a" />
            <Person x={600} y={crestY + 46} scale={1.6} walk={0} lean={0.02} poles={false} handOverride={[14, 30]} outfit={MAYA} expression="happy" breathe={Math.sin(lt * 2) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Dry and warm\non top."} t={t} t0={off + 0.12} top={200} size={160} />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const FleeceArt: React.FC<{ lt: number }> = ({ lt }) => {
  const s = at(lt, [0.2, 1.1], [0.85, 1], outExpo);
  const o = at(lt, [0.1, 0.5], [0, 1]);
  const J = "#B83A55";
  const JS = "#8E2B42";
  return (
    <g transform={`translate(540,540) scale(${s})`} opacity={o}>
      {/* sleeves */}
      <path d="M-150,-235 Q-215,-215 -245,-120 L-300,190 Q-300,215 -270,218 L-215,222 Q-195,220 -192,195 L-160,-40 Z" fill={JS} />
      <path d="M150,-235 Q215,-215 245,-120 L300,190 Q300,215 270,218 L215,222 Q195,220 192,195 L160,-40 Z" fill={J} />
      <rect x={-300} y={190} width={88} height={34} rx={10} fill="#5a1d2c" transform="rotate(4,-256,207)" />
      <rect x={212} y={190} width={88} height={34} rx={10} fill="#5a1d2c" transform="rotate(-4,256,207)" />
      {/* body */}
      <path d="M-160,-240 Q-80,-275 0,-270 Q80,-275 160,-240 L178,300 Q0,322 -178,300 Z" fill={J} />
      <path d="M-160,-240 Q-80,-275 0,-270 L0,312 Q-90,312 -178,300 Z" fill={JS} opacity={0.45} />
      {/* fleece texture */}
      {Array.from({ length: 60 }, (_, i) => {
        const x = -150 + ((i * 53) % 300);
        const y = -220 + ((i * 97) % 500);
        return <circle key={i} cx={x} cy={y} r={3} fill="rgba(255,255,255,0.07)" />;
      })}
      {/* hem band */}
      <path d="M-178,272 Q0,294 178,272 L178,302 Q0,324 -178,302 Z" fill="#5a1d2c" />
      {/* collar */}
      <path d="M-78,-268 L-70,-338 Q0,-354 70,-338 L78,-268 Q0,-248 -78,-268 Z" fill={JS} />
      {/* zip */}
      <line x1={0} y1={-346} x2={0} y2={316} stroke="#3d121d" strokeWidth={7} />
      <rect x={-9} y={-300} width={18} height={40} rx={5} fill="#c9ced2" />
      {/* chest pocket */}
      <line x1={50} y1={-150} x2={130} y2={-120} stroke="#3d121d" strokeWidth={6} strokeLinecap="round" />
      {/* hand pockets */}
      <line x1={-150} y1={60} x2={-110} y2={190} stroke="#3d121d" strokeWidth={6} strokeLinecap="round" />
      <line x1={150} y1={60} x2={110} y2={190} stroke="#3d121d" strokeWidth={6} strokeLinecap="round" />
    </g>
  );
};

const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  void off;
  return (
    <EndCard
      lt={lt}
      art={<FleeceArt lt={lt} />}
      spec="WOMEN'S · 320G POLAR FLEECE MID-LAYER"
      name={
        <>
          Polar Fleece
          <br />
          Soft-Shell
          <br />
          Jacket
        </>
      }
      nameSize={92}
      shadowY={890}
      price="$39.99"
      save="Save this before your next fall hike"
    />
  );
};

export const V16: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={5.5} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={5.4} to={11.1}>
        <S2 off={5.4} />
      </Scene>
      <Scene from={11.0} to={19.1}>
        <S3 off={11.0} />
      </Scene>
      <Scene from={19.0} to={22.4} fadeIn={0.12}>
        <S4 off={19.0} />
      </Scene>
      <Scene from={22.3} to={30} fadeOut={0}>
        <S5 off={22.3} />
      </Scene>
      <Captions words={words} windows={[[0.3, 5.4, 860], [5.45, 11.0, 300], [12.6, 19.0, 860]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
