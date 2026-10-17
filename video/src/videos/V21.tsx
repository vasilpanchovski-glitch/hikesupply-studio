import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, JAKE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v21.json";

const words = vo.words as unknown as Word[];

const WOODS: Palette = {
  sky: ["#6d8798", "#aebcc2", "#dfe2dc"],
  sun: { x: 860, y: 480, r: 50, color: "#f8f6ea", glow: "#e8e6d4" },
  layers: ["#9aaab0", "#81949a", "#687c7c", "#4f6656", "#3e5246"],
  mist: "#e6eae6",
};
const CLEAR: Palette = {
  sky: ["#5d8fbc", "#b3cfe0", "#eceee2"],
  sun: { x: 780, y: 500, r: 60, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#a0b6c6", "#86a0b0", "#6d8a88", "#557055", "#445a44"],
  mist: "#eef3f2",
};

const CHRIS: Outfit = {
  ...JAKE,
  jacket: "#7B3A2F",
  jacketShade: "#5E2C24",
  cap: "#2F3B45",
  capShade: "#222c34",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
  hair: "#2b1d16",
  beard: "#2b1d16",
};

const Forest: React.FC<{ y: number; shift: number; h?: number; n?: number }> = ({ y, shift, h = 480, n = 9 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const x = (((-150 + i * 170 - shift) % 1530) + 1530) % 1530 - 220;
      return <Pine key={i} x={x} y={y + (i % 2) * 20} h={h + (i % 3) * 60} c={i % 2 ? "#2f5a43" : "#36634a"} c2="#254a37" />;
    })}
  </g>
);

// ============ S1 HOOK: walking faster (0 - 4.8) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1660;
  const speed = mix(4.4, 8, at(t, [2.6, 4.4], [0, 1]));
  const ph = t * 4.4 + Math.max(0, t - 2.6) * (speed - 4.4) * 0.5;
  const scroll = t * 40 + Math.max(0, t - 2.6) ** 2 * 30;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={WOODS}
        camX={scroll * 0.2}
        zoom={mix(1.03, 1.08, t / 4.8)}
        foreground={
          <g>
            <Forest y={groundY - 60} shift={scroll * 0.7} h={540} />
            <rect x={-300} y={groundY - 60} width={1700} height={700} fill="#5a6a3a" />
            <path d={`M-300,${groundY - 6} Q540,${groundY - 26} 1400,${groundY - 4} L1400,${groundY + 110} Q540,${groundY + 84} -300,${groundY + 110} Z`} fill="#9a8260" />
            <Person x={420} y={groundY + 40} scale={1.75} phase={ph} walk={mix(0.75, 1, at(t, [2.6, 4.4], [0, 1]))} lean={0.16} poles={false} handOverride={freeHand(ph, 0.9)} outfit={CHRIS} expression={t < 2.6 ? "neutral" : "tired"} />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim />
      <Title text={"Lost on\nthe trail?\nDon't run."} t={t} t0={0} top={190} size={140} />
      <Chip text="Trail markers ran out" t={t} t0={1.15} t1={3.75} x={80} y={660} icon="x" />
      <Readout label="PACE" value="FASTER" ok={false} t={t} t0={3.81} t1={4.8} x={80} y={640} />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: every turn looks the same (4.7 - 9.0) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  const look = Math.sin(lt * 2.2) > 0;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={WOODS}
        camX={20 + lt * 6}
        zoom={mix(1.02, 1.08, lt / 4.3)}
        foreground={
          <g>
            <Forest y={groundY - 160} shift={60} h={500} />
            <rect x={-300} y={groundY - 170} width={1700} height={700} fill="#5a6a3a" />
            {/* fork: two identical paths */}
            <path d={`M380,2000 L700,2000 Q560,${groundY} 150,${groundY - 160} L60,${groundY - 160} Q420,${groundY + 40} 380,2000 Z`} fill="#9a8260" />
            <path d={`M380,2000 L700,2000 Q620,${groundY} 1020,${groundY - 160} L930,${groundY - 160} Q520,${groundY - 10} 380,2000 Z`} fill="#9a8260" />
            <Pine x={-10} y={groundY - 120} h={560} c="#36634a" c2="#254a37" />
            <Pine x={1080} y={groundY - 120} h={560} c="#36634a" c2="#254a37" />
            <Person x={540} y={groundY + 120} scale={1.75} walk={0} lean={0.04} poles={false} handOverride={[22, 34]} outfit={CHRIS} flip={look} expression="tired" breathe={Math.sin(t * 5) * 3} />
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim />
      <Chip text="Every turn looks the same" t={t} t0={4.87} t1={9.0} x={80} y={560} icon="x" />
      <Readout label="PANIC" value="MORE LOST" ok={false} t={t} t0={6.51} t1={9.0} x={80} y={680} />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: STOP (8.9 - 21.6) ============
const MapSheet: React.FC<{ x: number; y: number; s: number; o: number }> = ({ x, y, s, o }) => (
  <g transform={`translate(${x},${y}) scale(${s}) rotate(-6)`} opacity={o}>
    <rect x={-70} y={-50} width={140} height={100} rx={6} fill="#efe6cf" stroke="#b9a984" strokeWidth={3} />
    <path d="M-23,-50 L-23,50 M23,-50 L23,50" stroke="#d8cba8" strokeWidth={3} />
    <path d="M-55,30 C-30,0 -10,20 10,-10 S40,-30 55,-35" stroke="#B85C38" strokeWidth={5} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={0} rx={40} ry={26} fill="none" stroke="#a6b58f" strokeWidth={3} />
  </g>
);

const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1760;
  const s = 1.3;
  const x = 820;
  const mapK = at(t, [14.3, 14.7], [0, 1]) * at(t, [17.0, 17.3], [1, 0]);
  const hand: [number, number] = [mix(22, 74, mapK), mix(34, -50, mapK)];
  const hx = x - hand[0] * s;
  const hy = groundY + s * (hand[1] - 182);
  const calm = t > 11.45;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={t < 14.27 ? WOODS : CLEAR}
        camX={40 + lt * 4}
        foreground={
          <g>
            <Forest y={groundY - 220} shift={140} h={520} />
            <rect x={-300} y={groundY - 230} width={1700} height={700} fill="#5a6a3a" />
            <path d={`M-300,${groundY - 40} Q540,${groundY - 60} 1400,${groundY - 40} L1400,${groundY + 60} Q540,${groundY + 40} -300,${groundY + 60} Z`} fill="#9a8260" />
            <Person x={x} y={groundY} scale={s} walk={0} lean={0.04} poles={false} handOverride={hand} outfit={CHRIS} flip expression={calm ? "neutral" : "tired"} breathe={Math.sin(t * (calm ? 1.6 : 4)) * (calm ? 3 : 2)} />
            <MapSheet x={hx - 30} y={hy - 10} s={1.1} o={mapK} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Title text={"Here's\nthe fix."} t={t} t0={9.05} t1={10.15} top={200} size={160} />
      <Readout label="REMEMBER" value="S.T.O.P." ok={null} t={t} t0={10.23} x={80} y={380} />
      <Chip text="S · Stop moving" t={t} t0={11.45} x={80} y={580} icon="check" />
      <Chip text="T · Think: last known spot" t={t} t0={12.53} x={80} y={680} icon="check" />
      <Chip text="O · Observe: sun, water, map" t={t} t0={14.27} x={80} y={780} icon="check" />
      <Chip text="P · Plan your next move" t={t} t0={17.07} x={80} y={880} icon="check" />
      <Chip text="Truly lost? Stay put, whistle" t={t} t0={19.26} x={80} y={980} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: back on the trail (21.5 - 24.1) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1640;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={GOLDEN}
        camX={lt * 18}
        zoom={at(lt, [0, 0.9], [1.25, 1.06], outExpo)}
        foreground={
          <g>
            <Forest y={groundY - 40} shift={lt * 20} h={460} n={8} />
            <rect x={-300} y={groundY - 40} width={1700} height={700} fill="#7a7a40" />
            <path d={`M-300,${groundY - 6} Q540,${groundY - 26} 1400,${groundY - 4} L1400,${groundY + 110} Q540,${groundY + 84} -300,${groundY + 110} Z`} fill="#c2a47b" />
            {/* tree with a painted trail blaze */}
            <g transform={`translate(${860 - lt * 20},${groundY - 20})`}>
              <rect x={-26} y={-520} width={52} height={520} fill="#5a4030" />
              <rect x={-16} y={-340} width={32} height={56} fill="#f5f1ea" />
            </g>
            <Person x={400} y={groundY + 50} scale={1.7} phase={lt * 4.2} walk={0.7} lean={0.12} poles={false} handOverride={freeHand(lt * 4.2, 0.7)} outfit={CHRIS} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Back on\nthe trail."} t={t} t0={off + 0.12} top={200} size={180} />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const GuideArt: React.FC<{ lt: number }> = ({ lt }) => {
  const s = at(lt, [0.2, 1.1], [0.85, 1], outExpo);
  const o = at(lt, [0.1, 0.5], [0, 1]);
  const needle = Math.sin(lt * 3) * 18 * Math.exp(-lt * 0.6) + 20;
  return (
    <g transform={`translate(540,500) scale(${s})`} opacity={o}>
      <g transform="rotate(-5)">
        <rect x={-230} y={-330} width={460} height={620} rx={14} fill={C.stone} />
        <rect x={-190} y={-290} width={380} height={250} rx={10} fill="#3E5F4B" />
        <path d="M-190,-40 L-110,-150 L-50,-90 L30,-200 L190,-60 L190,-40 Z" fill="#2C4536" />
        {/* compass */}
        <g transform="translate(0,-165)">
          <circle r={62} fill={C.stone} stroke={C.forestDeep} strokeWidth={8} />
          <g transform={`rotate(${needle})`}>
            <path d="M0,-46 L12,0 L0,8 L-12,0 Z" fill="#C2452D" />
            <path d="M0,46 L12,0 L0,-8 L-12,0 Z" fill="#5b5546" />
          </g>
          <circle r={7} fill={C.forestDeep} />
        </g>
        <text x={-190} y={40} fontFamily={HEAD} fontWeight={800} fontSize={60} fill={C.forestDeep}>WHAT TO DO</text>
        <text x={-190} y={104} fontFamily={HEAD} fontWeight={800} fontSize={60} fill={C.forestDeep}>IF YOU GET LOST</text>
        <rect x={-190} y={130} width={110} height={8} rx={4} fill={C.forest} />
        {[170, 200, 230].map((yy) => (
          <rect key={yy} x={-190} y={yy} width={300 - (yy % 3) * 20} height={10} rx={5} fill="#d6cfc2" />
        ))}
      </g>
    </g>
  );
};

const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  void off;
  return (
    <EndCard
      lt={lt}
      art={<GuideArt lt={lt} />}
      spec="PRINTABLE GUIDE · INSTANT DOWNLOAD"
      name={
        <>
          What To Do
          <br />
          If You Get Lost
        </>
      }
      nameSize={96}
      shadowY={830}
      price="$5.99"
      save="Save this. It could get you home"
    />
  );
};

export const V21: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={4.8} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={4.7} to={9.0}>
        <S2 off={4.7} />
      </Scene>
      <Scene from={8.9} to={21.6}>
        <S3 off={8.9} />
      </Scene>
      <Scene from={21.5} to={24.1} fadeIn={0.12}>
        <S4 off={21.5} />
      </Scene>
      <Scene from={24.0} to={30} fadeOut={0}>
        <S5 off={24.0} />
      </Scene>
      <Captions words={words} windows={[[0.3, 4.7, 860], [4.75, 8.95, 300], [10.15, 21.5, 1110]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
