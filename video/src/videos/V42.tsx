import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v42.json";

const words = vo.words as unknown as Word[];

const AFTERNOON: Palette = {
  sky: ["#4a7fb3", "#c9d6d8", "#f6e2b8"],
  sun: { x: 820, y: 860, r: 62, color: "#fff4d6", glow: "#ffd58e" },
  layers: ["#c5b9a6", "#a9a080", "#8a8a5e", "#6f7448", "#585e3a"],
  mist: "#f6e6c6",
};
const NIGHT: Palette = {
  sky: ["#0d1626", "#1f2f4a", "#3d4a66"],
  sun: { x: 900, y: 1300, r: 1, color: "#3d4a66", glow: "#3d4a66" },
  layers: ["#2f3a52", "#28324a", "#212a3e", "#1b2333", "#151b28"],
  mist: "#3a4660",
  stars: 1,
};
const MORNING: Palette = {
  sky: ["#4d86c0", "#bcd6ea", "#f8efd6"],
  sun: { x: 260, y: 780, r: 62, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#bcc6c8", "#a1ae9c", "#8c9a68", "#76844e", "#5d6a3e"],
  mist: "#f2f2e4",
};

const JOSH: Outfit = {
  ...JAKE,
  skin: "#B87C5C",
  skinShade: "#9A6247",
  hair: "#1f1712",
  beard: "#1f1712",
  cap: "#2F62B0",
  capShade: "#244C8A",
  jacket: "#C8963E",
  jacketShade: "#A37828",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};

const Trail: React.FC<{ y: number; grass?: string; dirt?: string }> = ({ y, grass = "#86945e", dirt = "#bf9f76" }) => (
  <g>
    <rect x={-300} y={y - 40} width={1700} height={700} fill={grass} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={dirt} />
  </g>
);
const Woods: React.FC<{ y: number; shift: number; dark?: boolean }> = ({ y, shift, dark }) => (
  <g>
    {Array.from({ length: 8 }, (_, i) => {
      const x = ((((-120 + i * 190 - shift) % 1520) + 1520) % 1520) - 220;
      return i % 3 === 1 ? (
        <LeafTree key={i} x={x} y={y + 20} h={440} c={dark ? "#4a3a2a" : "#c0843e"} c2={dark ? "#3a2c20" : "#9a6630"} />
      ) : (
        <Pine key={i} x={x} y={y + (i % 2) * 18} h={480 + (i % 3) * 60} c={dark ? "#1e3329" : "#3b6550"} c2={dark ? "#15261e" : "#2b4d3c"} />
      );
    })}
  </g>
);

// White card with a clock whose minute hand spins back one hour.
const ClockCard: React.FC<{ t: number; t0: number; t1?: number }> = ({ t, t0, t1 = 999 }) => {
  if (isClean()) return null;
  const o = at(t, [t0, t0 + 0.3], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]);
  const back = at(t, [t0 + 0.4, t0 + 1.6], [0, 1], outExpo);
  const minA = -360 * back;
  const hourA = 90 - 30 * back;
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 440,
        height: 440,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        overflow: "hidden",
        opacity: o,
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <svg width={920} height={440} viewBox="0 0 920 440">
        <circle cx={240} cy={220} r={160} fill="#f4f1ea" stroke="#3a3a36" strokeWidth={10} />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={236} y={74} width={8} height={i % 3 === 0 ? 30 : 18} rx={3} fill="#3a3a36" transform={`rotate(${i * 30} 240 220)`} />
        ))}
        <rect x={233} y={130} width={14} height={96} rx={7} fill="#3a3a36" transform={`rotate(${hourA} 240 220)`} />
        <rect x={236} y={92} width={8} height={134} rx={4} fill="#D9443A" transform={`rotate(${minA} 240 220)`} />
        <circle cx={240} cy={220} r={14} fill="#3a3a36" />
        <path d="M150,30 A190,190 0 0 0 60,140" stroke="#D9443A" strokeWidth={8} fill="none" strokeLinecap="round" opacity={back > 0.05 && back < 0.98 ? 1 : 0} />
        <text x={470} y={190} fontFamily={HEAD} fontWeight={800} fontSize={64} fill="#1f2421">
          CLOCKS
        </text>
        <text x={470} y={260} fontFamily={HEAD} fontWeight={800} fontSize={64} fill="#1f2421">
          GO BACK
        </text>
        <text x={470} y={320} fontFamily={HEAD} fontWeight={700} fontSize={34} letterSpacing={3} fill="#6b6b66">
          ONE HOUR
        </text>
      </svg>
    </div>
  );
};

// Timeline card: start, turnaround, back, sunset, with a one-hour buffer.
const PlanCard: React.FC<{ t: number; t0: number; t1?: number; sun: number; turn: number; buffer: number }> = ({ t, t0, t1 = 999, sun, turn, buffer }) => {
  if (isClean()) return null;
  const o = at(t, [t0, t0 + 0.3], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]);
  const Y = 250;
  const mark = (x: number, k: number, label: string, col: string) => (
    <g opacity={at(k, [0, 0.3], [0, 1])} transform={`translate(${x},${Y})`}>
      <circle r={mix(4, 22, at(k, [0, 0.6], [0, 1], outExpo))} fill={col} />
      <text y={70} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={30} letterSpacing={2} fill="#3b3b37">
        {label}
      </text>
    </g>
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 440,
        height: 440,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        overflow: "hidden",
        opacity: o,
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <svg width={920} height={440} viewBox="0 0 920 440">
        <text x={460} y={80} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={34} letterSpacing={4} fill="#6b6b66">
          YOUR HIKE TODAY
        </text>
        <rect x={80} y={Y - 6} width={760} height={12} rx={6} fill="#e3e0d8" />
        <rect x={80} y={Y - 6} width={mix(0, 560, turn)} height={12} rx={6} fill="#3E8E5A" />
        {mark(90, 1, "START", "#3E5F4B")}
        {mark(370, turn, "TURN AROUND", "#2F62B0")}
        {mark(640, buffer, "BACK", "#3E8E5A")}
        <g opacity={at(sun, [0, 0.3], [0, 1])} transform={`translate(820,${Y})`}>
          <circle r={30} fill="#f2b84b" />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={-4} y={-52} width={8} height={14} rx={4} fill="#f2b84b" transform={`rotate(${i * 45})`} />
          ))}
          <text y={70} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={30} letterSpacing={2} fill="#3b3b37">
            SUNSET
          </text>
        </g>
        <g opacity={at(buffer, [0.3, 0.7], [0, 1])}>
          <path d={`M640,${Y - 60} L640,${Y - 76} L820,${Y - 76} L820,${Y - 60}`} stroke="#3E8E5A" strokeWidth={6} fill="none" />
          <text x={730} y={Y - 92} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#3E8E5A">
            1 HOUR
          </text>
        </g>
      </svg>
    </div>
  );
};

// ============ S1 HOOK: last weekend, back just before dark (0 - 3.6) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1720;
  const ph = t * 4;
  const walk = t < 2.6 ? 0.8 : 0;
  const p: HikerProps = { x: 380 + Math.min(t, 2.6) * 60, y: groundY + 30, scale: 1.6, phase: ph, walk, lean: 0.06, poles: false, handOverride: freeHand(ph, walk) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={GOLDEN}
        camX={t * 14}
        zoom={mix(1.03, 1.08, t / 3.6)}
        foreground={
          <g>
            <Woods y={groundY - 30} shift={t * 30} />
            <Trail y={groundY} grass="#6f7a46" dirt="#b08c62" />
            <Car x={850} y={groundY + 40} s={1.6} body="#B5553A" shade="#8E3F2A" />
            <Person {...p} outfit={JOSH} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim h={900} />
      <Title text={"The clocks\nchanged.\nHis plan\ndidn't."} t={t} t0={0} top={130} size={140} />
      <Chip text="Back just before dark" t={t} t0={2.5} x={80} y={700} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S2a PROBLEM: clocks go back, sunset an hour earlier (3.55 - 7.1) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const p: HikerProps = { x: 620, y: groundY + 30, scale: 1.45, walk: 0, lean: 0.06, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={AFTERNOON}
        camX={lt * 10}
        zoom={mix(1.02, 1.06, lt / 3.55)}
        dim={at(t, [5.6, 7.1], [0, 0.25])}
        foreground={
          <g>
            <Woods y={groundY - 30} shift={0} />
            <Trail y={groundY} />
            <Person {...p} outfit={JOSH} expression="neutral" />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim />
      <Chip text="Today" t={t} t0={3.64} x={80} y={220} icon="none" />
      <ClockCard t={t} t0={4.1} />
      <Chip text="Sunset 1 hour earlier" t={t} t0={5.6} x={80} y={320} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2b PROBLEM: same plan, last mile in the dark (7.05 - 11.6) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const ph = lt * 3.2;
  const p: HikerProps = { x: 560, y: groundY + 30, scale: 1.45, phase: ph, walk: 0.55, lean: 0.12, poles: false, handOverride: freeHand(ph, 0.55) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={NIGHT}
        camX={lt * 16}
        dim={0.38}
        foreground={
          <g>
            <Woods y={groundY - 30} shift={lt * 50} dark />
            <Trail y={groundY} grass="#3a4630" dirt="#6b5a46" />
            <Person {...p} outfit={JOSH} expression="tired" />
          </g>
        }
      />
      <Vignette strength={0.5} />
      <Chip text="Same start time" t={t} t0={7.17} x={80} y={220} icon="none" />
      <Chip text="Same trail" t={t} t0={8.05} x={80} y={320} icon="none" />
      <Readout label="LAST MILE" value="IN THE DARK" ok={false} t={t} t0={9.98} x={80} y={440} pulseAt={9.98} />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: check sunset, set a turnaround time, turn around (11.55 - 21.75) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1820;
  const back = t >= 19.15;
  const ph = lt * 4;
  const walk = t > 17.8 ? 0.7 : 0;
  const x = back ? 700 - (t - 19.15) * 70 : t > 17.8 ? 560 + (t - 17.8) * 100 : 560;
  const p: HikerProps = { x, y: groundY + 20, scale: 1.4, phase: ph, walk: t > 18.9 && t < 19.4 ? 0 : walk, lean: 0.06, poles: false, handOverride: walk ? freeHand(ph, walk) : [30, 34], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={AFTERNOON}
        camX={lt * 6}
        foreground={
          <g>
            <path d={`M600,${groundY - 30} L930,${groundY - 860} L990,${groundY - 830} L1400,${groundY - 30} Z`} fill="#8a918b" />
            <path d={`M930,${groundY - 860} L990,${groundY - 830} L1040,${groundY - 700} L960,${groundY - 740} L900,${groundY - 790} Z`} fill="#eef1f2" />
            <path d={`M940,${groundY - 856} L940,${groundY - 960}`} stroke="#3a3a36" strokeWidth={7} />
            <path d={`M940,${groundY - 960} l54,17 l-54,17 Z`} fill="#3E5F4B" />
            <Woods y={groundY - 30} shift={0} />
            <Trail y={groundY} />
            <Person {...p} outfit={JOSH} expression="happy" flip={back} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={600} />
      <Title text={"Here's\nthe fix."} t={t} t0={11.7} t1={12.6} top={200} size={160} />
      <Chip text="Check today's sunset" t={t} t0={12.63} t1={17.7} x={80} y={220} icon="check" big />
      <PlanCard t={t} t0={12.63} t1={17.7} sun={at(t, [13.29, 13.6], [0, 1])} turn={at(t, [14.46, 15.2], [0, 1])} buffer={at(t, [16.38, 16.9], [0, 1])} />
      <Readout label="TURNAROUND TIME" value="NOW" ok={null} t={t} t0={18.13} x={80} y={200} pulseAt={18.13} />
      <Chip text="Turn around" t={t} t0={19.12} x={80} y={440} icon="check" big />
      <Chip text="Even if the top is close" t={t} t0={19.86} x={80} y={550} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: next weekend, an earlier start (21.7 - 24.35) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  const ph = lt * 4.2;
  const p: HikerProps = { x: 420 + lt * 40, y: groundY + 40, scale: 1.6, phase: ph, walk: 0.85, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.85) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l5"
        pal={MORNING}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <Woods y={groundY - 30} shift={lt * 40} />
            <Trail y={groundY} />
            <Car x={160} y={groundY + 40} s={1.6} body="#B5553A" shade="#8E3F2A" />
            <Person {...p} outfit={JOSH} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={800} />
      <Title text={"Next weekend:\nan earlier\nstart."} t={t} t0={off + 0.1} top={190} size={140} />
      <Chip text="Back in daylight" t={t} t0={22.9} x={80} y={640} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-trip-planner-card.jpg"
      spec="PRINTABLE · ONE PAGE PER HIKE"
      name={
        <>
          Hiking
          <br />
          Trip Planner
        </>
      }
      nameSize={100}
      price="$5.99"
      save="Save this before your next fall hike"
    />
  );
};

export const V42: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={3.6} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={3.55} to={7.1}>
        <S2a off={3.55} />
      </Scene>
      <Scene from={7.05} to={11.6}>
        <S2b off={7.05} />
      </Scene>
      <Scene from={11.55} to={21.75}>
        <S3 off={11.55} />
      </Scene>
      <Scene from={21.7} to={24.35} fadeIn={0.12}>
        <S4 off={21.7} />
      </Scene>
      <Scene from={24.3} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions words={words} windows={[[0.3, 3.55, 900], [3.55, 11.55, 960], [11.55, 21.7, 960], [21.7, 24.3, 900]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
