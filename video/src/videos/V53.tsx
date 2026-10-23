import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v53.json";

const words = vo.words as unknown as Word[];

const OVERLOOK: Palette = {
  sky: ["#4a7aa8", "#b8cbd8", "#efeee6"],
  sun: { x: 820, y: 640, r: 54, color: "#fffbef", glow: "#f3eedc" },
  layers: ["#c4ccd2", "#a8b3b7", "#8d9a96", "#75837c", "#5f6c66"],
  mist: "#eff2f1",
};
const CHILL: Palette = {
  sky: ["#61768a", "#aab5bd", "#d9dedd"],
  sun: { x: 250, y: 720, r: 40, color: "#f4f4ee", glow: "#e2e4df" },
  layers: ["#b3bbbf", "#99a3a6", "#838d8c", "#6d7875", "#58625f"],
  mist: "#e4e8e7",
};
const CLEAR: Palette = {
  sky: ["#3c72aa", "#b2cfe6", "#f5efdc"],
  sun: { x: 300, y: 760, r: 60, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#c5d0d6", "#a7b7be", "#8f9e98", "#77867e", "#617069"],
  mist: "#eef3f0",
};

// Kate in a thin base layer; WARM is her puffy jacket over it.
const KATE: Outfit = {
  ...GUIDE,
  skin: "#E3B394",
  skinShade: "#C59475",
  hair: "#8a5a2b",
  ponytail: "#8a5a2b",
  beard: null,
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#8FB3C9",
  jacketShade: "#7397ad",
  pants: "#3C4148",
  pantsShade: "#2C3036",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};
const WARM: Outfit = { ...KATE, jacket: "#2F5D8A", jacketShade: "#23476B" };

const RockyTrail: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={-300} y={y - 40} width={1700} height={700} fill="#8c8f78" />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill="#b8ad96" />
    {Array.from({ length: 9 }, (_, i) => (
      <path key={i} d={`M${-40 + i * 140},${y + 160 + (i % 2) * 60} l40,-30 l50,10 l20,30 Z`} fill="#6f7365" />
    ))}
  </g>
);
// A flat boulder drawn in front of a sitting person (hides the legs).
const Boulder: React.FC<{ x: number; y: number; w?: number; h?: number }> = ({ x, y, w = 420, h = 190 }) => (
  <g>
    <ellipse cx={x} cy={y + 6} rx={w / 2 + 30} ry={20} fill="rgba(0,0,0,0.22)" />
    <path d={`M${x - w / 2},${y} C${x - w / 2},${y - h * 0.8} ${x - w * 0.3},${y - h} ${x},${y - h} C${x + w * 0.35},${y - h} ${x + w / 2},${y - h * 0.7} ${x + w / 2},${y} Z`} fill="#8a8d86" />
    <path d={`M${x + w * 0.05},${y - h} C${x + w * 0.35},${y - h} ${x + w / 2},${y - h * 0.7} ${x + w / 2},${y} L${x + w * 0.1},${y} Z`} fill="#757870" />
    <path d={`M${x - w * 0.35},${y - h * 0.82} C${x - w * 0.1},${y - h * 0.95} ${x + w * 0.2},${y - h * 0.95} ${x + w * 0.35},${y - h * 0.82}`} stroke="#a3a69f" strokeWidth={10} fill="none" />
  </g>
);
const Overlook: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={760} y={y - 120} width={14} height={120} fill="#6b4b30" />
    <rect x={1000} y={y - 120} width={14} height={120} fill="#6b4b30" />
    <rect x={740} y={y - 128} width={380} height={16} rx={6} fill="#7a5638" />
    <rect x={740} y={y - 74} width={380} height={12} rx={5} fill="#7a5638" />
  </g>
);
// Sweat drops near the head.
const Sweat: React.FC<{ p: HikerProps; t: number; o: number }> = ({ p, t, o }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={o}>
      {[0, 1, 2].map((i) => {
        const k = (t * 1.3 + i * 0.33) % 1;
        return <path key={i} d={`M${g.head[0] - 40 + i * 34},${g.head[1] - 30 + k * 40} q-7,12 0,16 q7,-4 0,-16 Z`} fill="#bfe3f6" opacity={1 - k} />;
      })}
    </g>
  );
};
// Little cold puffs and shiver lines.
const Shiver: React.FC<{ p: HikerProps; t: number; o: number }> = ({ p, t, o }) => {
  const g = hikerGeometry(p);
  const j = Math.sin(t * 70) * 4;
  return (
    <g transform={hikerTransform(p)} opacity={o}>
      <path d={`M${g.head[0] - 62 + j},${g.head[1] - 10} q-8,14 0,28 q8,14 0,28`} stroke="#eef6fb" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d={`M${g.head[0] + 50 - j},${g.head[1] - 10} q8,14 0,28 q-8,14 0,28`} stroke="#eef6fb" strokeWidth={5} fill="none" strokeLinecap="round" />
      <circle cx={g.head[0] + 46} cy={g.head[1] + 4 - ((t * 30) % 20)} r={8 + ((t * 10) % 6)} fill="#f4f8fa" opacity={0.5} />
    </g>
  );
};

// ============ S1 HOOK: reaching the overlook, warm and sweaty (0 - 2.7) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1760;
  const ph = t * 3.8;
  const p: HikerProps = { x: 280 + t * 70, y: groundY + 30, scale: 1.55, phase: ph, walk: 0.8, lean: 0.14, poles: false, handOverride: freeHand(ph, 0.8) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={OVERLOOK}
        camX={t * 14}
        zoom={mix(1.04, 1.1, t / 2.7)}
        foreground={
          <g>
            <Pine x={-60} y={groundY - 30} h={480} c="#4f6b5a" c2="#3a5244" />
            <RockyTrail y={groundY} />
            <Overlook y={groundY} />
            <Person {...p} outfit={KATE} expression="happy" />
            <Sweat p={p} t={t} o={at(t, [1.4, 1.8], [0, 1])} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={1050} />
      <Title text={"She sat down\nsweaty. Ten\nminutes later,\nshe was shivering."} t={t} t0={0} top={120} size={118} />
      <Chip text="Warm and sweaty" t={t} t0={1.49} x={80} y={640} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: sits, lunch, photos, then shivering (2.7 - 10.6) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const cold = at(t, [6.6, 7.4], [0, 1]);
  const shake = cold > 0 ? Math.sin(t * 70) * 3 * cold : 0;
  const eating = t > 3.9 && t < 4.6;
  const photo = t > 4.6 && t < 5.6;
  const hand: [number, number] = cold > 0.5 ? [36, -34] : eating ? [44, -70] : photo ? [70, -90] : [40, 10];
  const BXs = 540;
  const p: HikerProps = { x: BXs - 20 + shake, y: groundY + 110, scale: 1.5, walk: 0, lean: cold > 0.5 ? 0.22 : 0.08, poles: false, handOverride: hand, breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={t > 6.2 ? CHILL : OVERLOOK}
        camX={lt * 6}
        zoom={mix(1.04, 1.1, lt / 7.9)}
        dim={0.06 * cold}
        foreground={
          <g>
            <RockyTrail y={groundY} />
            <Overlook y={groundY} />
            <Person {...p} outfit={KATE} expression={cold > 0.3 ? "tired" : "happy"} />
            <Sweat p={p} t={t} o={at(t, [2.7, 3.0], [1, 1]) * at(t, [5.2, 5.8], [1, 0])} />
            <Shiver p={p} t={t} o={cold} />
            <Boulder x={BXs} y={groundY + 120} w={480} h={280} />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim h={900} />
      <Chip text="Sat on a rock" t={t} t0={2.99} x={80} y={220} icon="none" />
      <Chip text="Lunch, photos" t={t} t0={4.36} x={80} y={320} icon="none" />
      <Readout label="10 MINUTES LATER" value="SHIVERING" ok={false} t={t} t0={5.74} x={80} y={440} pulseAt={7.24} />
      <Chip text="Cold all the way down" t={t} t0={8.24} x={80} y={670} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: jacket on, then sit (10.6 - 18.6) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const on = t >= 15.3;
  const sitting = t >= 17.2;
  const pulling = t > 14.9 && t < 15.6;
  const p: HikerProps = sitting
    ? { x: 680, y: groundY + 110, scale: 1.5, walk: 0, lean: 0.06, poles: false, handOverride: [40, 10], breathe: Math.sin(t * 2) * 1.5 }
    : { x: 330, y: groundY + 30, scale: 1.5, walk: 0, lean: 0.04, poles: false, handOverride: pulling ? [30, -80] : [30, 34], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={OVERLOOK}
        camX={lt * 5}
        foreground={
          <g>
            <RockyTrail y={groundY} />
            <Overlook y={groundY} />
            <Person {...p} outfit={on ? WARM : KATE} expression="happy" />
            <Boulder x={700} y={groundY + 120} w={480} h={280} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={950} />
      <Title text={"Here's\nthe rule."} t={t} t0={10.75} t1={11.5} top={200} size={160} />
      <Title text={"Jacket on,\nthen sit."} t={t} t0={11.52} t1={13.3} top={200} size={160} />
      <Chip text="You stop on a cold day" t={t} t0={13.4} x={80} y={220} icon="check" big />
      <Chip text="Warm layer on first" t={t} t0={15.21} x={80} y={360} icon="check" />
      <Chip text="Before your body cools" t={t} t0={16.77} x={80} y={460} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 FIX: off again before you walk (18.55 - 21.05) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const offNow = t >= 19.1;
  const walking = t > 19.9;
  const ph = (t - 19.9) * 3.6;
  const p: HikerProps = walking
    ? { x: 400 + (t - 19.9) * 70, y: groundY + 30, scale: 1.5, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.7) }
    : { x: 400, y: groundY + 30, scale: 1.5, walk: 0, lean: 0.04, poles: false, handOverride: t > 18.8 && t < 19.3 ? [30, -80] : [30, 34], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={OVERLOOK}
        camX={lt * 8}
        foreground={
          <g>
            <RockyTrail y={groundY} />
            <Person {...p} outfit={offNow ? KATE : WARM} expression="happy" />
            <Boulder x={860} y={groundY + 120} w={300} h={140} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Chip text="Moving again? Layer off" t={t} t0={18.58} x={80} y={220} icon="check" big />
      <Chip text="So you don't sweat it through" t={t} t0={19.62} x={80} y={360} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 PAYOFF: warm all the way down (21.0 - 22.75) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1720;
  const ph = lt * 3.6;
  const p: HikerProps = { x: 380 + lt * 40, y: groundY + 40, scale: 1.6, phase: ph, walk: 0.7, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.7) };
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
            <RockyTrail y={groundY} />
            <Person {...p} outfit={KATE} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={800} />
      <Title text={"Warm all the\nway down."} t={t} t0={off + 0.1} top={190} size={150} />
    </AbsoluteFill>
  );
};

// ============ S6 END CARD ============
const S6: React.FC = () => {
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

export const V53: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={2.75} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={2.7} to={10.65}>
        <S2 off={2.7} />
      </Scene>
      <Scene from={10.6} to={18.6}>
        <S3 off={10.6} />
      </Scene>
      <Scene from={18.55} to={21.05}>
        <S4 off={18.55} />
      </Scene>
      <Scene from={21.0} to={22.75} fadeIn={0.12}>
        <S5 off={21.0} />
      </Scene>
      <Scene from={22.7} to={30} fadeOut={0}>
        <S6 />
      </Scene>
      <Captions
        words={words}
        windows={[
          [0.3, 2.7, 960],
          [2.7, 10.6, 960],
          [10.6, 18.55, 960],
          [18.55, 21.0, 960],
          [21.0, 22.7, 900],
        ]}
      />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
