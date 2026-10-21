import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, GUIDE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v37.json";

const words = vo.words as unknown as Word[];

const COLD: Palette = {
  sky: ["#5f8fbf", "#bcd3e2", "#f3f0e2"],
  sun: { x: 820, y: 640, r: 56, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#b7c3cb", "#9cadb4", "#82967f", "#6a7d5e", "#56684a"],
  mist: "#eef3f0",
};
const SHADE: Palette = {
  sky: ["#58779a", "#a9bccb", "#dfe4e2"],
  sun: { x: 900, y: 520, r: 50, color: "#fffbef", glow: "#f6efd6" },
  layers: ["#a6b3bd", "#8e9ea6", "#738777", "#5c6f58", "#4a5c46"],
  mist: "#e8eef0",
};

const JESS: Outfit = {
  ...GUIDE,
  skin: "#E8B59A",
  skinShade: "#C9937A",
  hair: "#7a4a2a",
  ponytail: "#7a4a2a",
  beard: null,
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#2F62B0",
  jacketShade: "#244C8A",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#C8963E",
  packShade: "#A37828",
};

const Woods: React.FC<{ y: number; shift: number; dark?: boolean }> = ({ y, shift, dark }) => (
  <g>
    {Array.from({ length: 8 }, (_, i) => {
      const x = (((-120 + i * 190 - shift) % 1520) + 1520) % 1520 - 220;
      return i % 3 === 1 ? (
        <LeafTree key={i} x={x} y={y + 20} h={460} c={dark ? "#8a6a44" : "#b4824e"} c2={dark ? "#6e5232" : "#8f6640"} />
      ) : (
        <Pine key={i} x={x} y={y + (i % 2) * 18} h={480 + (i % 3) * 60} c={dark ? "#2f5442" : "#3b6550"} c2={dark ? "#223f31" : "#2b4d3c"} />
      );
    })}
  </g>
);

// Dry dirt trail in the sun.
const DryTrail: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={-300} y={y - 60} width={1700} height={700} fill="#8a9a6a" />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill="#c2a47c" />
    {Array.from({ length: 9 }, (_, i) => (
      <ellipse key={i} cx={-40 + i * 140} cy={y + 40 + (i % 3) * 14} rx={14} ry={6} fill="#a68a64" />
    ))}
  </g>
);

// Wooden footbridge over a creek. frost 0..1 paints the white frost layer and sparkles.
const Bridge: React.FC<{ y: number; x0: number; x1: number; frost: number; t: number }> = ({ y, x0, x1, frost, t }) => {
  const posts = [];
  for (let x = x0 + 30; x < x1; x += 170) posts.push(x);
  return (
    <g>
      {/* creek */}
      <rect x={-300} y={y + 40} width={1700} height={600} fill="#6f8a7a" />
      <rect x={-300} y={y + 90} width={1700} height={220} fill="#5e86a0" />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M${-100 + i * 130 + ((t * 30) % 130)},${y + 150 + (i % 3) * 40} q30,-8 60,0`} stroke="#9cc0d4" strokeWidth={5} fill="none" opacity={0.7} />
      ))}
      {/* banks */}
      <path d={`M-300,${y - 40} L${x0 + 40},${y - 30} L${x0 + 10},${y + 330} L-300,${y + 340} Z`} fill="#7d8c66" />
      <path d={`M${x1 - 40},${y - 30} L1400,${y - 40} L1400,${y + 340} L${x1 - 10},${y + 330} Z`} fill="#7d8c66" />
      {/* deck */}
      <rect x={x0} y={y - 14} width={x1 - x0} height={46} fill="#8a6440" />
      <rect x={x0} y={y + 22} width={x1 - x0} height={14} fill="#6a4a2e" />
      {Array.from({ length: Math.ceil((x1 - x0) / 46) }, (_, i) => (
        <line key={i} x1={x0 + i * 46} y1={y - 14} x2={x0 + i * 46} y2={y + 32} stroke="#5a3e26" strokeWidth={3} />
      ))}
      {/* frost on the deck */}
      <rect x={x0} y={y - 14} width={x1 - x0} height={30} fill="#eef6fa" opacity={0.75 * frost} />
      {Array.from({ length: 22 }, (_, i) => {
        const sx = x0 + 20 + ((i * 97) % (x1 - x0 - 40));
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(t * 3 + i));
        return <circle key={i} cx={sx} cy={y - 4 + (i % 3) * 6} r={3.5} fill="#ffffff" opacity={frost * tw} />;
      })}
      {/* rails */}
      <rect x={x0} y={y - 200} width={x1 - x0} height={14} rx={5} fill="#7a5636" />
      <rect x={x0} y={y - 110} width={x1 - x0} height={10} rx={4} fill="#7a5636" />
      <rect x={x0} y={y - 200} width={x1 - x0} height={4} fill="#eef6fa" opacity={0.8 * frost} />
      {posts.map((p) => (
        <g key={p}>
          <rect x={p - 9} y={y - 210} width={18} height={200} fill="#6a4a2e" />
          <rect x={p - 9} y={y - 214} width={18} height={6} fill="#eef6fa" opacity={0.8 * frost} />
        </g>
      ))}
    </g>
  );
};

// Shadow cast by the woods over the bridge: fades in from the treetops down.
const ShadeBand: React.FC<{ y: number; x0: number; x1: number; o?: number; id: string }> = ({ y, x0, x1, o = 0.28, id }) => (
  <g>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#14232c" stopOpacity={0} />
        <stop offset="0.45" stopColor="#14232c" stopOpacity={o} />
        <stop offset="1" stopColor="#14232c" stopOpacity={o} />
      </linearGradient>
      <linearGradient id={id + "h"} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity={0} />
        <stop offset="0.12" stopColor="#fff" stopOpacity={1} />
        <stop offset="1" stopColor="#fff" stopOpacity={1} />
      </linearGradient>
      <mask id={id + "m"}>
        <rect x={x0} y={y - 800} width={x1 - x0} height={1400} fill={`url(#${id}h)`} />
      </mask>
    </defs>
    <rect x={x0} y={y - 800} width={x1 - x0} height={1400} fill={`url(#${id})`} mask={`url(#${id}m)`} />
  </g>
);

// ============ S1 HOOK: dry trail, bright cold morning (0 - 2.95) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1680;
  const ph = t * 4.2;
  return (
    <AbsoluteFill>
      <Landscape
        uid="j1"
        pal={COLD}
        camX={t * 20}
        zoom={mix(1.03, 1.08, t / 2.95)}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={t * 60} />
            <DryTrail y={groundY} />
            <Person x={560} y={groundY + 40} scale={1.7} phase={ph} walk={0.85} lean={0.1} poles={false} handOverride={freeHand(ph, 0.85)} outfit={JESS} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"The trail\nwas dry.\nThe bridge\nwasn't."} t={t} t0={0} top={140} size={130} />
      <Chip text="Bright, cold morning" t={t} t0={0.93} x={80} y={690} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: frosty footbridge in the shade, she slips (2.9 - 8.15) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1600;
  const slip = 6.42;
  const walking = t < slip;
  const x = walking ? mix(250, 560, at(t, [3.0, slip], [0, 1])) : 560 + at(t, [slip, slip + 0.4], [0, 40], outExpo);
  const ph = lt * 4;
  const fall = at(t, [slip, slip + 0.45], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Landscape
        uid="j2"
        pal={SHADE}
        camX={lt * 8}
        zoom={mix(1.02, 1.07, lt / 5.25)}
        foreground={
          <g>
            <Woods y={groundY - 260} shift={300 + lt * 6} dark />
            <Bridge y={groundY} x0={60} x1={1180} frost={1} t={t} />
            <ShadeBand id="sb2" y={groundY} x0={-600} x1={1400} o={0.24} />
            <g transform={`rotate(${-80 * fall}, ${x - 30}, ${groundY - 20}) translate(0, ${-14 * fall})`}>
              <Person
                x={x}
                y={groundY - 14}
                scale={1.45}
                phase={walking ? ph : slip * 4}
                walk={walking ? 0.8 : 0.9}
                lean={walking ? 0.08 : -0.1}
                poles={false}
                handOverride={walking ? freeHand(ph, 0.8) : [60, -40]}
                outfit={JESS}
                expression={walking ? "neutral" : "tired"}
              />
            </g>
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim />
      <Chip text="Wooden footbridge" t={t} t0={4.43} t1={slip} x={80} y={220} icon="none" />
      <Chip text="In the shade" t={t} t0={5.37} t1={slip} x={80} y={320} icon="none" />
      <Readout label="THE BRIDGE DECK" value="FROST" ok={false} t={t} t0={slip} x={80} y={220} pulseAt={slip} />
    </AbsoluteFill>
  );
};

// ============ S3 PROBLEM 2: where frost hides (8.1 - 13.35) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1540;
  const shadeX = 580;
  return (
    <AbsoluteFill>
      <Landscape
        uid="j3"
        pal={COLD}
        camX={lt * 10}
        zoom={mix(1.06, 1.02, lt / 5.25)}
        foreground={
          <g>
            <Woods y={groundY - 80} shift={lt * 10} />
            <DryTrail y={groundY} />
            {/* boardwalk and a rock in the shade on the right */}
            <ShadeBand id="sb3" y={groundY} x0={shadeX - 120} x1={1400} o={0.32} />
            <rect x={shadeX} y={groundY - 24} width={900} height={50} fill="#7a5636" />
            <rect x={shadeX} y={groundY + 26} width={900} height={14} fill="#5a3e26" />
            {Array.from({ length: 12 }, (_, i) => (
              <line key={i} x1={shadeX + i * 46} y1={groundY - 24} x2={shadeX + i * 46} y2={groundY + 26} stroke="#4a3220" strokeWidth={3} />
            ))}
            <rect x={shadeX} y={groundY - 24} width={900} height={22} fill="#eef6fa" opacity={0.75} />
            <path d={`M760,${groundY + 250} Q770,${groundY + 150} 880,${groundY + 140} Q1010,${groundY + 135} 1030,${groundY + 250} Z`} fill="#7d817e" />
            <path d={`M790,${groundY + 175} Q880,${groundY + 140} 1000,${groundY + 170} Q900,${groundY + 160} 790,${groundY + 185} Z`} fill="#eef6fa" opacity={0.8} />
            {Array.from({ length: 18 }, (_, i) => {
              const tw = 0.4 + 0.6 * Math.abs(Math.sin(t * 3 + i));
              const onRock = i % 3 === 0;
              return <circle key={i} cx={onRock ? 800 + ((i * 37) % 200) : shadeX + 20 + ((i * 83) % 420)} cy={onRock ? groundY + 170 : groundY - 14} r={4} fill="#fff" opacity={tw} />;
            })}
            <Person x={300} y={groundY + 40} scale={1.3} walk={0} lean={0.02} poles={false} handOverride={[18, 36]} outfit={JESS} expression="neutral" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Frost hides\nin the shade."} t={t} t0={8.25} top={190} size={140} />
      <Chip text="Bridges" t={t} t0={9.06} x={80} y={500} icon="x" />
      <Chip text="Boardwalks" t={t} t0={9.66} x={80} y={590} icon="x" />
      <Chip text="Shady rocks" t={t} t0={10.8} x={80} y={680} icon="x" />
      <Chip text="Sun warms the trail first" t={t} t0={11.76} x={80} y={770} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S4 FIX: slow, short flat steps, hands free; solid ice = turn back (13.3 - 22.55) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1640;
  const ice = t >= 19.71;
  const x = ice ? 600 : mix(220, 620, at(t, [13.6, 19.6], [0, 1]));
  const ph = lt * 3.2;
  const walk = ice ? 0 : 0.35;
  return (
    <AbsoluteFill>
      <Landscape
        uid="j4"
        pal={SHADE}
        camX={lt * 6}
        foreground={
          <g>
            <Woods y={groundY - 260} shift={900 + lt * 4} dark />
            <Bridge y={groundY} x0={60} x1={1180} frost={1} t={t} />
            <ShadeBand id="sb4" y={groundY} x0={-600} x1={1400} o={0.2} />
            <Person
              x={x}
              y={groundY - 14}
              scale={1.45}
              phase={ph}
              walk={walk}
              lean={0.02}
              poles={false}
              handOverride={ice ? [18, 36] : [34 + Math.sin(ph) * 6, 20]}
              outfit={JESS}
              expression="neutral"
              flip={t >= 21.62}
            />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={700} />
      <Title text={"Slow down\nin the shade."} t={t} t0={13.45} t1={16.25} top={200} size={150} />
      <Chip text="Short, flat-footed steps" t={t} t0={16.34} t1={18.7} x={80} y={220} icon="check" big />
      <Chip text="Keep your hands free" t={t} t0={18.77} t1={19.65} x={80} y={220} icon="check" big />
      <Readout label="SOLID ICE?" value="TURN BACK" ok={null} t={t} t0={19.71} x={80} y={220} pulseAt={21.62} />
    </AbsoluteFill>
  );
};

// ============ S5 PAYOFF: steady on the next bridge (22.5 - 24.5) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1600;
  const ph = lt * 3.4;
  return (
    <AbsoluteFill>
      <Landscape
        uid="j5"
        pal={COLD}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <Woods y={groundY - 260} shift={lt * 30} />
            <Bridge y={groundY} x0={-100} x1={1300} frost={0.6} t={t} />
            <Person x={400 + lt * 70} y={groundY - 14} scale={1.45} phase={ph} walk={0.45} lean={0.04} poles={false} handOverride={[34 + Math.sin(ph) * 6, 20]} outfit={JESS} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Steady on\nthe next\nbridge."} t={t} t0={off + 0.1} top={200} size={150} />
      <Chip text="Short steps, hands free" t={t} t0={23.0} x={80} y={700} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S6 END CARD ============
const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/beginner-hiker-bundle-card.jpg"
      photoH={760}
      spec="DIGITAL DOWNLOAD · 3 GUIDES IN ONE"
      name={
        <>
          Beginner
          <br />
          Hiker
          <br />
          Bundle
        </>
      }
      nameSize={96}
      price="$16.99"
      save="Save this before your first frosty hike"
    />
  );
};

export const V37: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={2.95} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={2.9} to={8.15}>
        <S2 off={2.9} />
      </Scene>
      <Scene from={8.1} to={13.35}>
        <S3 off={8.1} />
      </Scene>
      <Scene from={13.3} to={22.55}>
        <S4 off={13.3} />
      </Scene>
      <Scene from={22.5} to={24.5} fadeIn={0.12}>
        <S5 off={22.5} />
      </Scene>
      <Scene from={24.4} to={30} fadeOut={0}>
        <S6 />
      </Scene>
      <Captions words={words} windows={[[0.3, 2.9, 900], [2.9, 8.1, 760], [8.1, 13.3, 910], [13.3, 22.5, 760], [22.5, 24.4, 900]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
