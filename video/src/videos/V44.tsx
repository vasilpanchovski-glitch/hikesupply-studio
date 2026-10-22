import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v44.json";

const words = vo.words as unknown as Word[];

const DUSK: Palette = {
  sky: ["#2c3f66", "#b4788a", "#f4b77e"],
  sun: { x: 760, y: 1120, r: 70, color: "#ffe2b0", glow: "#ffaa66" },
  layers: ["#9a7484", "#7a5e72", "#584a5e", "#3a3446", "#221f2c"],
  mist: "#f0b490",
};
const NIGHT: Palette = {
  sky: ["#0b1322", "#1a2944", "#33415e"],
  sun: { x: 900, y: 1300, r: 1, color: "#33415e", glow: "#33415e" },
  layers: ["#2b3650", "#252f46", "#1f283b", "#192131", "#131925"],
  mist: "#36425c",
  stars: 1,
};

const SAM: Outfit = {
  ...JAKE,
  skin: "#E8B590",
  skinShade: "#C99572",
  hair: "#7a5232",
  beard: "#7a5232",
  cap: "#B5553A",
  capShade: "#8E3F2A",
  jacket: "#3E6E8E",
  jacketShade: "#2E5670",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#5B6B3E",
  packShade: "#46542F",
};

const Trail: React.FC<{ y: number; grass?: string; dirt?: string }> = ({ y, grass = "#3a4630", dirt = "#6b5a46" }) => (
  <g>
    <rect x={-300} y={y - 40} width={1700} height={700} fill={grass} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={dirt} />
    {[120, 420, 760, 980].map((x, i) => (
      <ellipse key={i} cx={x} cy={y + 30 + (i % 2) * 40} rx={34 + (i % 3) * 10} ry={14} fill="rgba(0,0,0,0.18)" />
    ))}
  </g>
);
const Woods: React.FC<{ y: number; shift: number; dark?: boolean }> = ({ y, shift, dark }) => (
  <g>
    {Array.from({ length: 8 }, (_, i) => {
      const x = ((((-120 + i * 190 - shift) % 1520) + 1520) % 1520) - 220;
      return i % 3 === 1 ? (
        <LeafTree key={i} x={x} y={y + 20} h={440} c={dark ? "#3c3026" : "#a8703a"} c2={dark ? "#2e241c" : "#87582c"} />
      ) : (
        <Pine key={i} x={x} y={y + (i % 2) * 18} h={480 + (i % 3) * 60} c={dark ? "#1b2e25" : "#2f5442"} c2={dark ? "#13221b" : "#223f31"} />
      );
    })}
  </g>
);

// Rocks for the scramble scene.
const Rocks: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <path d={`M560,${y + 10} L640,${y - 120} L760,${y - 160} L860,${y - 90} L900,${y + 10} Z`} fill="#2e3546" />
    <path d={`M640,${y - 120} L760,${y - 160} L740,${y - 110} L660,${y - 90} Z`} fill="#3c4458" />
    <path d={`M860,${y + 10} L930,${y - 60} L1040,${y - 70} L1120,${y + 10} Z`} fill="#272d3c" />
  </g>
);

// A cone of light, drawn in screen space.
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

// Screen position of a point given in a hiker's local units.
const toScreen = (p: HikerProps, q: readonly number[]) => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};

// Phone held in the near hand, screen lit.
const Phone: React.FC<{ p: HikerProps; lit?: number }> = ({ p, lit = 1 }) => {
  const g = hikerGeometry(p);
  const h = g.arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] + 4},${h[1] - 6}) rotate(-20)`}>
        <rect x={-11} y={-20} width={22} height={38} rx={4} fill="#1d1f1e" />
        <rect x={-8} y={-16} width={16} height={29} rx={2} fill={lit > 0 ? "#dfeef3" : "#3a4a50"} />
        <circle cx={6} cy={-14} r={3.5} fill="#fffbe0" opacity={lit} />
      </g>
    </g>
  );
};

// Headlamp strap and lamp drawn on top of the cap.
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

// ============ S1 HOOK: still on the trail at sunset (0 - 3.05) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1760;
  const ph = t * 3.6;
  const p: HikerProps = { x: 360 + t * 40, y: groundY + 30, scale: 1.5, phase: ph, walk: 0.7, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={DUSK}
        camX={t * 14}
        zoom={mix(1.03, 1.08, t / 3)}
        dim={at(t, [1.5, 3.05], [0, 0.2])}
        foreground={
          <g>
            <Woods y={groundY - 30} shift={t * 40} />
            <Trail y={groundY} grass="#4a5236" dirt="#86704f" />
            <Person {...p} outfit={SAM} expression="neutral" />
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim h={900} />
      <Title text={"His flashlight\nwas also\nhis map"} t={t} t0={0} top={130} size={140} />
      <Chip text="Sun going down" t={t} t0={2.15} x={80} y={590} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2a PROBLEM: phone flashlight on the rocks (3.0 - 9.75) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const ph = lt * 2.6;
  const walk = 0.45;
  const p: HikerProps = { x: 380 + lt * 18, y: groundY + 30, scale: 1.45, phase: ph, walk, lean: 0.14, poles: false, handOverride: [64, -70], breathe: Math.sin(t * 2.4) * 2 };
  const on = at(t, [3.6, 3.75], [0, 1]);
  const hand = toScreen(p, hikerGeometry(p).arms[1].hand);
  const flicker = 0.9 + 0.1 * Math.sin(t * 23);
  const batt = Math.round(at(t, [7.9, 9.8], [41, 20], (x) => x));
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={NIGHT}
        camX={lt * 10}
        dim={0.3}
        foreground={
          <g>
            <Woods y={groundY - 30} shift={lt * 24} dark />
            <Trail y={groundY} />
            <Rocks y={groundY} />
            <Beam id="b2" x={hand[0] + 10} y={hand[1] - 20} x1={hand[0] + 520} y1={groundY - 260} x2={hand[0] + 380} y2={groundY + 120} o={on * flicker * 0.8} />
            <Person {...p} outfit={SAM} expression="tired" />
            <Phone p={p} lit={on} />
          </g>
        }
      />
      <Vignette strength={0.5} />
      <Chip text="Phone flashlight" t={t} t0={3.33} x={80} y={220} icon="none" />
      <Chip text="One hand busy" t={t} t0={5.32} x={80} y={320} icon="x" />
      <Readout label="BATTERY · COLD" value={`${batt}%`} ok={batt > 30 ? null : false} t={t} t0={7.89} x={80} y={440} pulseAt={9.79} />
    </AbsoluteFill>
  );
};

// ============ S2b PROBLEM: map and only way to call are dying (9.7 - 13.95) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const p: HikerProps = { x: 500, y: groundY + 30, scale: 1.5, walk: 0, lean: 0.08, poles: false, handOverride: [44, -96], breathe: Math.sin(t * 2.4) * 2 };
  const hand = toScreen(p, hikerGeometry(p).arms[1].hand);
  const dim = at(t, [12.9, 13.9], [1, 0.4]);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={NIGHT}
        camX={40 + lt * 6}
        zoom={mix(1.04, 1.1, lt / 4.2)}
        dim={0.38}
        foreground={
          <g>
            <Woods y={groundY - 30} shift={200} dark />
            <Trail y={groundY} />
            <Beam id="b3" x={hand[0] + 6} y={hand[1] - 22} x1={hand[0] + 420} y1={groundY - 300} x2={hand[0] + 300} y2={groundY + 80} o={0.55 * dim} />
            <Person {...p} outfit={SAM} expression="tired" />
            <Phone p={p} lit={dim} />
          </g>
        }
      />
      <Vignette strength={0.55} />
      <Readout label="BATTERY" value="20%" ok={false} t={t} t0={9.75} x={80} y={220} />
      <Chip text="His map" t={t} t0={10.96} x={80} y={470} icon="x" big />
      <Chip text="His only way to call" t={t} t0={12.47} x={80} y={580} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: a separate light, both hands free (13.9 - 19.95) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const walking = t > 16.6;
  const ph = lt * 3.6;
  const p: HikerProps = {
    x: walking ? 420 + (t - 16.6) * 40 : 420,
    y: groundY + 30,
    scale: 1.5,
    phase: ph,
    walk: walking ? 0.7 : 0,
    lean: 0.1,
    poles: false,
    handOverride: walking ? freeHand(ph, 0.7) : [30, 34],
    breathe: Math.sin(t * 2.4) * 2,
  };
  const on = at(t, [15.4, 15.6], [0, 1]);
  const head = toScreen(p, hikerGeometry(p).head);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={NIGHT}
        camX={lt * 12}
        dim={0.3}
        foreground={
          <g>
            <Woods y={groundY - 30} shift={lt * 30} dark />
            <Trail y={groundY} />
            <Beam id="b4" x={head[0] + 48} y={head[1] - 24} x1={head[0] + 700} y1={groundY - 120} x2={head[0] + 300} y2={groundY + 160} o={on * 0.95} />
            <Person {...p} outfit={SAM} expression="happy" />
            <Lamp p={p} on={on} />
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim h={700} />
      <Title text={"Here's\nthe fix."} t={t} t0={14.0} t1={14.95} top={200} size={160} />
      <Chip text="A separate light" t={t} t0={14.92} x={80} y={220} icon="check" big />
      <Chip text="Both hands free" t={t} t0={17.27} x={80} y={340} icon="check" big />
      <Chip text="Lights the trail ahead" t={t} t0={18.43} x={80} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: phone saved for the map (19.9 - 23.05) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1740;
  const ph = lt * 4.2;
  const p: HikerProps = { x: 360 + lt * 45, y: groundY + 40, scale: 1.6, phase: ph, walk: 0.85, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.85) };
  const head = toScreen(p, hikerGeometry(p).head);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l5"
        pal={NIGHT}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        dim={0.22}
        foreground={
          <g>
            <Woods y={groundY - 30} shift={lt * 50} dark />
            <Trail y={groundY} />
            <Beam id="b5" x={head[0] + 50} y={head[1] - 26} x1={head[0] + 700} y1={groundY - 100} x2={head[0] + 280} y2={groundY + 160} o={0.95} />
            <Person {...p} outfit={SAM} expression="happy" />
            <Lamp p={p} on={1} />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim h={800} />
      <Readout label="PHONE" value="MAP + SOS" ok={true} t={t} t0={20.21} x={80} y={220} pulseAt={20.21} />
      <Chip text="Battery saved" t={t} t0={21.45} x={80} y={460} icon="check" />
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
      spec="RECHARGEABLE USB-C · WIDE BEAM"
      name={
        <>
          Motion-Sensor
          <br />
          Headlamp
        </>
      }
      nameSize={78}
      price="From $16.99"
      save="Save this before your next fall hike"
    />
  );
};

export const V44: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={3.05} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={3.0} to={9.75}>
        <S2a off={3.0} />
      </Scene>
      <Scene from={9.7} to={13.95}>
        <S2b off={9.7} />
      </Scene>
      <Scene from={13.9} to={19.95}>
        <S3 off={13.9} />
      </Scene>
      <Scene from={19.9} to={23.05} fadeIn={0.12}>
        <S4 off={19.9} />
      </Scene>
      <Scene from={23.0} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions
        words={words}
        windows={[
          [0.3, 3.0, 900],
          [3.0, 9.7, 960],
          [9.7, 13.9, 960],
          [13.9, 19.9, 960],
          [19.9, 23.0, 900],
        ]}
      />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
