import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v48.json";

const words = vo.words as unknown as Word[];

const PREDAWN: Palette = {
  sky: ["#101a2e", "#243556", "#4a5878"],
  sun: { x: 900, y: 1300, r: 1, color: "#4a5878", glow: "#4a5878" },
  layers: ["#3a4660", "#323d55", "#2a344a", "#222b3d", "#1a2130"],
  mist: "#4a5670",
  stars: 1,
};
const FIRSTLIGHT: Palette = {
  sky: ["#22355a", "#7c6f8c", "#e8b48a"],
  sun: { x: 300, y: 1060, r: 60, color: "#ffe2b0", glow: "#ffb46b" },
  layers: ["#9a8a98", "#7a6e80", "#5a5468", "#3c3a4c", "#262634"],
  mist: "#e8b896",
  stars: 0.3,
};

const GLOVE = "#2b2f33";
const JEN: Outfit = {
  ...GUIDE,
  skin: "#F0C8A8",
  skinShade: "#D2A688",
  hair: "#a8642e",
  ponytail: "#a8642e",
  beard: null,
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#3C4148",
  pantsShade: "#2C3036",
  pack: "#3E4F5C",
  packShade: "#2C3943",
};

// Frosty gravel lot / trail.
const Frost: React.FC<{ y: number; dark?: boolean }> = ({ y, dark }) => (
  <g>
    <rect x={-300} y={y - 40} width={1700} height={700} fill={dark ? "#4a5466" : "#8d93a0"} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={dark ? "#5e6676" : "#a4a6aa"} />
    {Array.from({ length: 16 }, (_, i) => (
      <ellipse key={i} cx={(i * 131) % 1100} cy={y + 20 + ((i * 67) % 380)} rx={26 + (i % 4) * 10} ry={6} fill="#dfe8f0" opacity={dark ? 0.35 : 0.6} />
    ))}
  </g>
);
const Woods: React.FC<{ y: number; shift: number; dark?: boolean }> = ({ y, shift, dark }) => (
  <g>
    {Array.from({ length: 8 }, (_, i) => {
      const x = ((((-120 + i * 190 - shift) % 1520) + 1520) % 1520) - 220;
      return <Pine key={i} x={x} y={y + (i % 2) * 18} h={480 + (i % 3) * 60} c={dark ? "#1b2e25" : "#2f5442"} c2={dark ? "#13221b" : "#223f31"} />;
    })}
  </g>
);

// Cone of light in screen space.
const Beam: React.FC<{ x: number; y: number; x1: number; y1: number; x2: number; y2: number; o?: number; id: string }> = ({ x, y, x1, y1, x2, y2, o = 1, id }) => (
  <g opacity={o}>
    <defs>
      <radialGradient id={id} cx={x} cy={y} r={Math.hypot(x1 - x, y1 - y) * 1.05} gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fff8d8" stopOpacity="0.85" />
        <stop offset="1" stopColor="#fff8d8" stopOpacity="0" />
      </radialGradient>
    </defs>
    <path d={`M${x},${y} L${x1},${y1} L${x2},${y2} Z`} fill={`url(#${id})`} />
  </g>
);
const toScreen = (p: HikerProps, q: readonly number[]) => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};
// Headlamp on the cap.
const Lamp: React.FC<{ p: HikerProps; on: number }> = ({ p, on }) => {
  const g = hikerGeometry(p);
  const [hx, hy] = g.head;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${hx - 26},${hy - 12} Q${hx},${hy - 18} ${hx + 20},${hy - 15}`} stroke="#1d1f1e" strokeWidth={6} fill="none" />
      <rect x={hx + 14} y={hy - 25} width={18} height={18} rx={4} fill="#1d1f1e" />
      <rect x={hx + 28} y={hy - 22} width={5} height={12} rx={2} fill={on > 0 ? "#fff6c8" : "#666"} />
      {on > 0 && <circle cx={hx + 32} cy={hy - 16} r={14} fill="#fff6c8" opacity={0.35 * on} />}
    </g>
  );
};
// Gloves held in the far hand (taken off).
const HeldGloves: React.FC<{ p: HikerProps }> = ({ p }) => {
  const g = hikerGeometry(p);
  const h = g.arms[0].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] - 6},${h[1] + 2})`}>
        <path d="M-10,0 q-6,26 6,34 q12,4 16,-8 l-2,-26 Z" fill={GLOVE} />
        <path d="M2,0 q4,28 18,30 q12,-2 8,-16 l-8,-14 Z" fill="#3a3f44" />
      </g>
    </g>
  );
};

// ============ S1 HOOK: 5 a.m., frosty trailhead (0 - 2.7) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1760;
  const p: HikerProps = { x: 600, y: groundY + 30, scale: 1.55, walk: 0, lean: 0.06, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={PREDAWN}
        camX={t * 10}
        zoom={mix(1.03, 1.08, t / 2.7)}
        dim={0.15}
        foreground={
          <g>
            <Woods y={groundY - 30} shift={t * 10} dark />
            <Frost y={groundY} dark />
            <Car x={230} y={groundY + 50} s={1.5} body="#4E6B8A" shade="#3a536c" lights />
            <Person {...p} outfit={{ ...JEN, glove: GLOVE }} expression="neutral" />
            <Lamp p={p} on={0} />
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim h={950} />
      <Title text={"She took off\nher gloves\nfor a light."} t={t} t0={0} top={130} size={140} />
      <Chip text="5 AM · Frost on the ground" t={t} t0={0.97} x={80} y={590} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: bare fingers on a tiny button (2.65 - 11.2) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const fumbling = t < 7.3;
  const p: HikerProps = {
    x: 560,
    y: groundY + 30,
    scale: 1.6,
    walk: 0,
    lean: 0.05,
    poles: false,
    handOverride: fumbling ? [58 + Math.sin(t * 9) * 3, -150] : [26, -40],
    breathe: Math.sin(t * 3.2) * 2,
  };
  const on = at(t, [7.2, 7.35], [0, 1]);
  const head = toScreen(p, hikerGeometry(p).head);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={PREDAWN}
        camX={20 + lt * 5}
        zoom={mix(1.05, 1.12, lt / 8.5)}
        dim={0.2}
        foreground={
          <g>
            <Woods y={groundY - 30} shift={200} dark />
            <Frost y={groundY} dark />
            <Beam id="b2" x={head[0] + 48} y={head[1] - 26} x1={head[0] + 600} y1={groundY - 140} x2={head[0] + 260} y2={groundY + 160} o={on * 0.9} />
            <Person {...p} outfit={JEN} expression={t > 8 ? "tired" : "neutral"} />
            <Lamp p={p} on={on} />
            <HeldGloves p={p} />
          </g>
        }
      />
      <Vignette strength={0.5} />
      <Scrim h={800} />
      <Chip text="Gloves off" t={t} t0={3.31} x={80} y={220} icon="x" />
      <Chip text="Tiny button" t={t} t0={4.71} x={80} y={320} icon="x" />
      <Readout label="FINGERS" value="NUMB" ok={false} t={t} t0={8.5} x={80} y={440} pulseAt={8.63} />
      <Chip text="Before the first step" t={t} t0={9.39} x={80} y={690} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S3a FIX: gloves on, wave to switch (11.15 - 17.6) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  // three waves: on, off, on
  const waves = [14.9, 15.65, 16.3];
  const waving = waves.some((w) => t >= w && t < w + 0.45);
  const wv = waves.find((w) => t >= w && t < w + 0.45) ?? 0;
  const on = t < waves[0] + 0.25 ? 0 : t < waves[1] + 0.25 ? 1 : t < waves[2] + 0.25 ? 0 : 1;
  const p: HikerProps = {
    x: 520,
    y: groundY + 30,
    scale: 1.6,
    walk: 0,
    lean: 0.05,
    poles: false,
    handOverride: waving ? [mix(40, 110, Math.sin(((t - wv) / 0.45) * Math.PI)), -165] : [30, 34],
    breathe: Math.sin(t * 2.4) * 2,
  };
  const head = toScreen(p, hikerGeometry(p).head);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={PREDAWN}
        camX={lt * 5}
        dim={0.15}
        foreground={
          <g>
            <Woods y={groundY - 30} shift={420} dark />
            <Frost y={groundY} dark />
            <Beam id="b3" x={head[0] + 48} y={head[1] - 26} x1={head[0] + 600} y1={groundY - 140} x2={head[0] + 260} y2={groundY + 160} o={on * 0.9} />
            <Person {...p} outfit={{ ...JEN, glove: GLOVE }} expression="happy" />
            <Lamp p={p} on={on} />
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim h={900} />
      <Title text={"Here's\nthe fix."} t={t} t0={11.3} t1={12.15} top={200} size={160} />
      <Chip text="Keep your gloves on" t={t} t0={12.2} x={80} y={220} icon="check" big />
      <Chip text="Sensor mode on" t={t} t0={13.81} x={80} y={340} icon="check" />
      <Readout label="WAVE" value={on ? "ON" : "OFF"} ok={null} t={t} t0={14.7} x={80} y={450} pulseAt={on ? (t > waves[2] ? waves[2] + 0.25 : waves[0] + 0.25) : waves[1] + 0.25} />
    </AbsoluteFill>
  );
};

// ============ S3b FIX: charge it, carry a spare (17.55 - 21.7) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const ph = lt * 3.6;
  const p: HikerProps = { x: 360 + lt * 40, y: groundY + 30, scale: 1.5, phase: ph, walk: 0.7, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.7) };
  const head = toScreen(p, hikerGeometry(p).head);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={PREDAWN}
        camX={lt * 14}
        dim={0.15}
        foreground={
          <g>
            <Woods y={groundY - 30} shift={lt * 34 + 600} dark />
            <Frost y={groundY} dark />
            <Beam id="b4" x={head[0] + 48} y={head[1] - 26} x1={head[0] + 700} y1={groundY - 120} x2={head[0] + 300} y2={groundY + 160} o={0.95} />
            <Person {...p} outfit={{ ...JEN, glove: GLOVE }} expression="happy" />
            <Lamp p={p} on={1} />
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim h={800} />
      <Chip text="Charge it the night before" t={t} t0={17.65} x={80} y={220} icon="check" big />
      <Readout label="USB-C" value="100%" ok={true} t={t} t0={18.4} x={80} y={340} pulseAt={18.62} />
      <Chip text="Spare light on longer hikes" t={t} t0={19.14} x={80} y={600} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: started warm (21.65 - 23.4) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1740;
  const ph = lt * 4.2;
  const p: HikerProps = { x: 380 + lt * 50, y: groundY + 40, scale: 1.6, phase: ph, walk: 0.85, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.85) };
  const head = toScreen(p, hikerGeometry(p).head);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l5"
        pal={FIRSTLIGHT}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <Woods y={groundY - 30} shift={lt * 50} />
            <Frost y={groundY} />
            <Beam id="b5" x={head[0] + 50} y={head[1] - 26} x1={head[0] + 700} y1={groundY - 100} x2={head[0] + 280} y2={groundY + 160} o={0.5} />
            <Person {...p} outfit={{ ...JEN, glove: GLOVE }} expression="happy" />
            <Lamp p={p} on={1} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={800} />
      <Title text={"She started\nwarm."} t={t} t0={off + 0.1} top={190} size={150} />
      <Chip text="Gloves stayed on" t={t} t0={22.35} x={80} y={540} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/motion-sensor-rechargeable-headlamp-card.jpg"
      photoH={760}
      spec="MOTION SENSOR · USB-C RECHARGEABLE"
      name={
        <>
          Motion-Sensor
          <br />
          Headlamp
        </>
      }
      nameSize={78}
      price="From $16.99"
      save="Save this for early starts"
    />
  );
};

export const V48: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={2.7} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={2.65} to={11.2}>
        <S2 off={2.65} />
      </Scene>
      <Scene from={11.15} to={17.6}>
        <S3a off={11.15} />
      </Scene>
      <Scene from={17.55} to={21.7}>
        <S3b off={17.55} />
      </Scene>
      <Scene from={21.65} to={23.4} fadeIn={0.12}>
        <S4 off={21.65} />
      </Scene>
      <Scene from={23.35} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions
        words={words}
        windows={[
          [0.3, 2.65, 960],
          [2.65, 11.15, 960],
          [11.15, 17.55, 960],
          [17.55, 21.65, 960],
          [21.65, 23.35, 900],
        ]}
      />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
