import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, GUIDE, Outfit } from "../Person";
import { hikerGeometry, hikerTransform, HikerProps } from "../Hiker";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v26.json";

const words = vo.words as unknown as Word[];

const OVERCAST: Palette = {
  sky: ["#7f95a6", "#c6cfd0", "#e6e4da"],
  sun: { x: 780, y: 520, r: 52, color: "#fbf8ec", glow: "#e8e4d0" },
  layers: ["#aeb6b2", "#959f98", "#7c887c", "#637260", "#4d5c4a"],
  mist: "#eceee6",
};
const WET: Palette = {
  sky: ["#6c7f8e", "#b4bcbc", "#d8d6cc"],
  sun: { x: 260, y: 460, r: 46, color: "#f2efe2", glow: "#d6d2c0" },
  layers: ["#98a09a", "#808a80", "#687464", "#545e4c", "#3e4838"],
  mist: "#dcdcd2",
};

const JESS: Outfit = {
  ...GUIDE,
  skin: "#D9A07E",
  skinShade: "#BC8462",
  hair: "#2b1d16",
  ponytail: "#2b1d16",
  beard: null,
  cap: "#8C3B52",
  capShade: "#6E2D40",
  jacket: "#3F6B55",
  jacketShade: "#2D5141",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#C9A23A",
  packShade: "#A8842A",
};

const FALL = [
  ["#D9822B", "#B8641E"],
  ["#C9A23A", "#A8842A"],
  ["#B04A2A", "#8E3A20"],
];
const Woods: React.FC<{ y: number; shift: number; n?: number }> = ({ y, shift, n = 8 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const x = (((-120 + i * 190 - shift) % 1520) + 1520) % 1520 - 220;
      const [c, c2] = FALL[i % 3];
      return i % 3 === 1 ? (
        <Pine key={i} x={x} y={y + 10} h={520} c="#36634a" c2="#254a37" />
      ) : (
        <LeafTree key={i} x={x} y={y + (i % 2) * 16} h={440 + (i % 3) * 50} c={c} c2={c2} />
      );
    })}
  </g>
);
const MudPath: React.FC<{ y: number; shift?: number }> = ({ y, shift = 0 }) => (
  <g>
    <rect x={-300} y={y - 60} width={1700} height={700} fill="#55603a" />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill="#7a5f42" />
    {Array.from({ length: 5 }, (_, i) => {
      const x = (((i * 260 - shift) % 1300) + 1300) % 1300 - 100;
      return <ellipse key={i} cx={x} cy={y + 50 + (i % 2) * 18} rx={70} ry={12} fill="#9fb0b4" opacity={0.55} />;
    })}
    {Array.from({ length: 14 }, (_, i) => (
      <ellipse key={i} cx={(((i * 97 - shift) % 1080) + 1080) % 1080} cy={y + 20 + ((i * 37) % 70)} rx={9} ry={5} fill={FALL[i % 3][0]} opacity={0.8} />
    ))}
  </g>
);

// Gaiters drawn over the Person's lower legs (same geometry as the figure).
const GaiterLegs: React.FC<{ p: HikerProps }> = ({ p }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)}>
      {[1, 0].map((i) => {
        const L = g.legs[i];
        const k = L.knee;
        const f = [L.foot[0] - 2, L.foot[1] - 18];
        const a = [mix(k[0], f[0], 0.12), mix(k[1], f[1], 0.12)];
        return (
          <g key={i}>
            <line x1={a[0]} y1={a[1]} x2={f[0]} y2={f[1]} stroke={i === 1 ? "#141618" : "#22262a"} strokeWidth={34} strokeLinecap="round" />
            <line x1={a[0]} y1={a[1]} x2={a[0] + 2} y2={a[1] + 4} stroke="#3a3f44" strokeWidth={36} strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
};

// Close-up: lower leg and boot, side view. gaiter = 0..1 wraps up from the laces.
const LEGX = 690;
const BootCloseUp: React.FC<{ t: number; gaiter: number; wetSock: number }> = ({ gaiter, wetSock }) => {
  const top = mix(1210, 640, gaiter);
  return (
    <g>
      {/* muddy ground */}
      <path d="M-50,1430 Q540,1405 1130,1430 L1130,1980 L-50,1980 Z" fill="#6a5238" />
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse key={i} cx={(i * 113) % 1080} cy={1480 + ((i * 53) % 380)} rx={i % 3 === 0 ? 70 : 20} ry={i % 3 === 0 ? 12 : 9} fill={i % 3 === 0 ? "#8fa0a4" : FALL[i % 3][0]} opacity={0.7} />
      ))}
      {/* pants leg */}
      <path d={`M${LEGX - 120},0 L${LEGX + 110},0 L${LEGX + 116},1120 L${LEGX - 126},1120 Z`} fill="#4A4E55" />
      <path d={`M${LEGX - 120},0 L${LEGX - 60},0 L${LEGX - 66},1120 L${LEGX - 126},1120 Z`} fill="#363A40" />
      {/* sock in the gap */}
      <rect x={LEGX - 112} y={1100} width={222} height={90} fill="#c9c3b6" />
      <rect x={LEGX - 112} y={1100} width={222} height={90} fill="#5b6a74" opacity={wetSock * 0.75} />
      {/* boot */}
      <path
        d={`M${LEGX - 130},1170 L${LEGX + 120},1170 L${LEGX + 130},1290 Q${LEGX + 230},1310 ${LEGX + 300},1360 Q${LEGX + 330},1385 ${LEGX + 320},1420 L${LEGX - 150},1420 Q${LEGX - 160},1300 ${LEGX - 130},1170 Z`}
        fill="#B88A5A"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth={3}
      />
      <path d={`M${LEGX - 130},1170 L${LEGX + 120},1170 L${LEGX + 118},1200 L${LEGX - 132},1200 Z`} fill="#3E3128" />
      <rect x={LEGX - 166} y={1410} width={500} height={40} rx={12} fill="#2A2421" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${LEGX + 60 + i * 34},${1220 + i * 34} l52,-14`} stroke="#e8d8b8" strokeWidth={9} strokeLinecap="round" />
      ))}
      {/* gaiter */}
      {gaiter > 0.01 && (
        <g>
          <path
            d={`M${LEGX - 134},${top} L${LEGX + 128},${top} L${LEGX + 150},1250 Q${LEGX + 210},1290 ${LEGX + 230},1330 L${LEGX - 150},1330 Z`}
            fill="#1d2023"
            opacity={at(gaiter, [0, 0.15], [0, 1])}
          />
          <path d={`M${LEGX - 134},${top} L${LEGX - 60},${top} L${LEGX - 70},1330 L${LEGX - 150},1330 Z`} fill="#2a2e32" opacity={at(gaiter, [0, 0.15], [0, 1])} />
          {/* drawcord + toggle at the top */}
          <rect x={LEGX - 134} y={top - 6} width={262} height={16} rx={6} fill="#33383d" />
          <rect x={LEGX + 120} y={top - 14} width={22} height={34} rx={8} fill="#555" />
          {/* strap under the boot */}
          <rect x={LEGX - 40} y={1322} width={150} height={20} rx={6} fill="#111" opacity={at(gaiter, [0.6, 0.9], [0, 1])} />
          {/* hook on the laces */}
          <circle cx={LEGX + 210} cy={1318} r={11} fill="#777" opacity={at(gaiter, [0.6, 0.9], [0, 1])} />
        </g>
      )}
    </g>
  );
};

// Debris falling toward the boot top. blocked: slides off the gaiter instead of falling in.
const Debris: React.FC<{ t: number; t0: number; blocked: boolean }> = ({ t, t0, blocked }) => (
  <g>
    {Array.from({ length: 12 }, (_, i) => {
      const s = t0 + i * 0.3;
      const k = (t - s) / 1.1;
      if (k < 0 || k > 1) return null;
      const kind = i % 3;
      const x0 = LEGX - 90 + ((i * 53) % 190);
      const stopY = blocked ? 700 + ((i * 71) % 400) : 1150;
      const fall = Math.min(k / 0.6, 1);
      let x = x0;
      let y = mix(-40, stopY, fall * fall);
      let o = 1;
      if (k > 0.6) {
        const r = (k - 0.6) / 0.4;
        if (blocked) {
          x = x0 + (i % 2 ? 1 : -1) * r * 260;
          y = stopY + r * r * 400;
        } else {
          y = stopY + r * 40;
          o = 1 - r;
        }
      }
      return (
        <g key={i} transform={`translate(${x},${y}) rotate(${t * 200 + i * 40})`} opacity={o}>
          {kind === 0 && <ellipse rx={32} ry={15} fill={FALL[i % 3][0]} stroke="#5a3418" strokeWidth={3} />}
          {kind === 1 && <circle r={17} fill="#c9c2b4" stroke="#6a645a" strokeWidth={3} />}
          {kind === 2 && <ellipse rx={18} ry={22} fill="#8a6440" stroke="#4a3420" strokeWidth={3} />}
        </g>
      );
    })}
  </g>
);

const CloseBg: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <AbsoluteFill style={{ background: dark ? "linear-gradient(180deg,#56604a 0%,#3e4634 100%)" : "linear-gradient(180deg,#6f7c5a 0%,#55603e 100%)" }} />
);

// ============ S1 HOOK: waterproof boots, wet socks (0 - 4.6) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1660;
  const ph = t * 4.2;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={OVERCAST}
        camX={t * 30}
        zoom={mix(1.03, 1.08, t / 4.6)}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={t * 40} />
            <MudPath y={groundY} shift={t * 40} />
            <Person x={520} y={groundY + 40} scale={1.75} phase={ph} walk={0.9} lean={0.1} poles={false} handOverride={freeHand(ph, 0.9)} outfit={JESS} expression="neutral" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Your boots\naren't the\nproblem."} t={t} t0={0} top={160} size={124} />
      <Chip text="Waterproof boots" t={t} t0={0.7} x={80} y={570} icon="check" />
      <Chip text="Wet socks anyway" t={t} t0={3.88} x={80} y={670} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: debris falls in over the top (4.5 - 8.8) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  return (
    <AbsoluteFill>
      <CloseBg dark />
      <svg width={1080} height={1920} style={{ position: "absolute", scale: `${mix(1.0, 1.05, lt / 4.3)}` }}>
        <BootCloseUp t={t} gaiter={0} wetSock={at(t, [6.0, 8.4], [0, 1])} />
        <Debris t={t} t0={4.6} blocked={false} />
      </svg>
      <Vignette strength={0.45} />
      <Chip text="Mud" t={t} t0={4.7} x={80} y={420} icon="x" />
      <Chip text="Wet leaves" t={t} t0={5.15} x={80} y={520} icon="x" />
      <Chip text="Little stones" t={t} t0={6.25} x={80} y={620} icon="x" />
      <Readout label="GETTING IN" value="OVER TOP" ok={false} t={t} t0={7.45} x={80} y={740} pulseAt={7.45} />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: the gaiter wraps up and debris slides off (8.7 - 19.1) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  return (
    <AbsoluteFill>
      <CloseBg />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <BootCloseUp t={t} gaiter={at(t, [11.2, 13.1], [0, 1], outExpo)} wetSock={0} />
        <Debris t={t} t0={15.6} blocked />
      </svg>
      <Vignette strength={0.3} />
      <Scrim h={560} />
      <Title text={"Here's\nthe fix."} t={t} t0={8.9} t1={10.0} top={200} size={160} />
      <Chip text="Leg gaiters" t={t} t0={10.09} x={80} y={220} icon="check" big />
      <Chip text="Laces to shin" t={t} t0={12.1} x={80} y={360} icon="check" />
      <Chip text="Covers the gap" t={t} t0={13.85} x={80} y={460} icon="check" />
      <Chip text="Debris slides off" t={t} t0={16.81} x={80} y={560} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: muddiest trail, dry feet (19.0 - 23.5) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1640;
  const ph = lt * 4.8;
  const p: HikerProps = { x: 430, y: groundY + 50, scale: 1.7, phase: ph, walk: 1, lean: 0.12, poles: false, handOverride: freeHand(ph, 1) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={lt < 0 ? WET : GOLDEN}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.25, 1.06], outExpo)}
        foreground={
          <g>
            <Woods y={groundY - 40} shift={lt * 50} n={8} />
            <MudPath y={groundY} shift={lt * 50} />
            <Person {...p} outfit={JESS} expression="happy" />
            <GaiterLegs p={p} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Muddy trail.\nDry feet."} t={t} t0={off + 0.12} top={200} size={150} />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  void off;
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-leg-gaiters-card.jpg"
      spec="44 CM · SOLD AS A PAIR · 5 COLORS"
      name={
        <>
          Hiking Leg
          <br />
          Gaiters
        </>
      }
      nameSize={110}
      price="$19.99"
      save="Save this before your next muddy hike"
    />
  );
};

export const V26: React.FC = () => {
  void C;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={4.6} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={4.5} to={8.8}>
        <S2 off={4.5} />
      </Scene>
      <Scene from={8.7} to={19.1}>
        <S3 off={8.7} />
      </Scene>
      <Scene from={19.0} to={23.5} fadeIn={0.12}>
        <S4 off={19.0} />
      </Scene>
      <Scene from={23.4} to={30} fadeOut={0}>
        <S5 off={23.4} />
      </Scene>
      <Captions words={words} windows={[[0.3, 4.55, 900], [4.55, 8.75, 1520], [10.0, 19.05, 1520]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
