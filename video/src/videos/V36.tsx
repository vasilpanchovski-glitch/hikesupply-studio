import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, JAKE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v36.json";

const words = vo.words as unknown as Word[];

const FROST: Palette = {
  sky: ["#7c9bb8", "#c6d4dd", "#eef0ea"],
  sun: { x: 800, y: 560, r: 52, color: "#fffbef", glow: "#f6efd6" },
  layers: ["#b6c2ca", "#a1b0b6", "#8a9b90", "#738670", "#5e7058"],
  mist: "#f0f4f4",
};
const MORNING: Palette = {
  sky: ["#5f8fbf", "#bcd3e2", "#f3f0e2"],
  sun: { x: 880, y: 860, r: 58, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#b7c3cb", "#9cadb4", "#82967f", "#6a7d5e", "#56684a"],
  mist: "#eef3f0",
};

const RYAN: Outfit = {
  ...JAKE,
  hair: "#3a2a1e",
  beard: "#3a2a1e",
  cap: "#3E4F5C",
  capShade: "#2C3943",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#C8963E",
  packShade: "#A37828",
};
const COAT = { jacket: "#7A2E2E", jacketShade: "#5E2222" };
const TEE = (damp: number) => ({ jacket: damp > 0.5 ? "#7b858b" : "#a9b1b6", jacketShade: damp > 0.5 ? "#626b70" : "#8d969b" });
const BASE = { jacket: "#5f7a8a", jacketShade: "#4a6170" };
const FLEECE = { jacket: "#2F62B0", jacketShade: "#244C8A" };
const SHELL = { jacket: "#3E5F4B", jacketShade: "#2E4A39" };

const Woods: React.FC<{ y: number; shift: number; n?: number }> = ({ y, shift, n = 8 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const x = (((-120 + i * 190 - shift) % 1520) + 1520) % 1520 - 220;
      return i % 3 === 1 ? (
        <LeafTree key={i} x={x} y={y + 20} h={460} c="#a97a4a" c2="#8a6038" />
      ) : (
        <Pine key={i} x={x} y={y + (i % 2) * 18} h={460 + (i % 3) * 60} c="#3b6550" c2="#2b4d3c" />
      );
    })}
  </g>
);
const FrostGround: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={-300} y={y - 60} width={1700} height={700} fill="#8e9d82" />
    <rect x={-300} y={y - 60} width={1700} height={700} fill="#e8eef0" opacity={0.35} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill="#b7a58a" />
    {Array.from({ length: 14 }, (_, i) => (
      <path key={i} d={`M${-60 + i * 85},${y - 40 + (i % 3) * 12} l8,-18 l8,18`} stroke="#f4f8fa" strokeWidth={4} fill="none" opacity={0.8} />
    ))}
  </g>
);
const SL = 0.22;
const slopeY = (x: number) => 1560 - (x - 540) * Math.tan(SL);
const Hill: React.FC = () => (
  <g>
    <path d={`M-300,${slopeY(-300)} L1400,${slopeY(1400)} L1400,2200 L-300,2200 Z`} fill="#8e9d82" />
    <path d={`M-300,${slopeY(-300)} L1400,${slopeY(1400)} L1400,${slopeY(1400) + 90} L-300,${slopeY(-300) + 90} Z`} fill="#b7a58a" />
    {Array.from({ length: 12 }, (_, i) => {
      const x = -60 + i * 100;
      return <path key={i} d={`M${x},${slopeY(x) + 140} l8,-18 l8,18`} stroke="#f4f8fa" strokeWidth={4} fill="none" opacity={0.7} />;
    })}
  </g>
);

// Three layers drawn as stacked bands, outermost on top.
const Layers: React.FC<{ t: number }> = ({ t }) => {
  const rows: [string, string, string, number][] = [
    ["SHELL", "WIND AND RAIN", SHELL.jacket, 15.19],
    ["FLEECE", "WARMTH", FLEECE.jacket, 13.64],
    ["BASE LAYER", "WICKS SWEAT", BASE.jacket, 11.97],
  ];
  const shellOff = at(t, [17.61, 17.9], [0, 1]) * at(t, [19.5, 19.8], [1, 0]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, padding: "34px 40px" }}>
      {rows.map(([name, job, col, t0], i) => {
        const on = at(t, [t0, t0 + 0.35], [0, 1]);
        const dim = i === 0 ? 1 - shellOff * 0.8 : 1;
        return (
          <div
            key={name}
            style={{
              height: 140,
              borderRadius: 20,
              background: col,
              opacity: on * dim,
              translate: `${at(t, [t0, t0 + 0.4], [-60, 0], outExpo)}px 0px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 36px",
              color: "#fff",
              fontFamily: HEAD,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 64, letterSpacing: 1 }}>{name}</div>
            <div style={{ fontWeight: 700, fontSize: 38, letterSpacing: 2, opacity: 0.9 }}>{i === 0 && shellOff > 0.5 ? "OFF FOR NOW" : job}</div>
          </div>
        );
      })}
    </div>
  );
};

// ============ S1 HOOK: heaviest coat on a frosty morning (0 - 3.85) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1680;
  const ph = t * 4.2;
  return (
    <AbsoluteFill>
      <Landscape
        uid="r1"
        pal={FROST}
        camX={t * 20}
        zoom={mix(1.03, 1.08, t / 3.85)}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={t * 60} />
            <FrostGround y={groundY} />
            <Person x={560} y={groundY + 40} scale={1.7} phase={ph} walk={0.85} lean={0.1} poles={false} handOverride={freeHand(ph, 0.85)} outfit={{ ...RYAN, ...COAT }} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"One big coat\nwas his\nmistake"} t={t} t0={0} top={150} size={140} />
      <Chip text="His heaviest coat" t={t} t0={1.0} x={80} y={600} icon="none" />
      <Chip text="Frosty November morning" t={t} t0={2.14} x={80} y={700} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: sweating on the climb, then cold in a damp tee (3.8 - 9.25) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const x = 540;
  const coatOff = t >= 5.9;
  const walk = t > 6.6 ? 0.35 : 0.8;
  const ph = lt * (t > 6.6 ? 2.6 : 3.8);
  const shiver = t > 7.0 ? Math.sin(t * 50) * 2.5 : 0;
  const sweat = at(t, [4.6, 5.0], [0, 1]) * at(t, [6.4, 6.8], [1, 0]);
  return (
    <AbsoluteFill>
      <Landscape
        uid="r2"
        pal={FROST}
        camX={40 + lt * 12}
        camY={lt * 6}
        zoom={mix(1.02, 1.08, lt / 5.4)}
        foreground={
          <g>
            <Hill />
            <Person
              x={x + shiver}
              y={slopeY(x) + 40}
              scale={1.6}
              slope={SL}
              phase={ph}
              walk={walk}
              lean={0.16}
              poles={false}
              handOverride={freeHand(ph, walk)}
              outfit={{ ...RYAN, ...(coatOff ? TEE(at(t, [6.4, 7.0], [0, 1])) : COAT) }}
              expression={t > 4.8 ? "tired" : "neutral"}
            />
            {Array.from({ length: 4 }, (_, i) => {
              const cyc = ((lt * 1.6 + i * 0.25) % 1 + 1) % 1;
              return <ellipse key={i} cx={x + 70 + i * 22} cy={slopeY(x) - 520 + cyc * 120} rx={8} ry={12} fill="#7fc0ea" opacity={sweat * (1 - cyc)} />;
            })}
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim />
      <Readout label="ON THE FIRST CLIMB" value="SWEATING" ok={false} t={t} t0={5.0} t1={7.7} x={80} y={420} pulseAt={5.0} />
      <Chip text="Coat off" t={t} t0={5.9} t1={7.7} x={80} y={650} icon="none" />
      <Readout label="DAMP T-SHIRT" value="FREEZING" ok={false} t={t} t0={7.79} x={80} y={420} pulseAt={7.79} />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: thin layers (9.2 - 20.55) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1830;
  const outer = t < 11.97 ? TEE(0) : t < 13.64 ? BASE : t < 15.19 ? FLEECE : t >= 17.61 && t < 19.5 ? FLEECE : SHELL;
  return (
    <AbsoluteFill>
      <Landscape
        uid="r3"
        pal={FROST}
        camX={lt * 6}
        foreground={
          <g>
            <Woods y={groundY - 200} shift={600 + lt * 6} />
            <FrostGround y={groundY} />
            <Person x={720} y={groundY} scale={1.5} walk={0} lean={0.06} poles={false} handOverride={[30, 34]} outfit={{ ...RYAN, ...outer }} expression="happy" breathe={Math.sin(t * 2.4) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={600} />
      <Title text={"Dress in\nthin layers."} t={t} t0={9.35} t1={11.75} top={200} size={160} />
      {!isClean() && (
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            top: 330,
            height: 560,
            borderRadius: 30,
            background: "#fff",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            overflow: "hidden",
            opacity: at(t, [11.75, 12.0], [0, 1]),
            scale: `${at(t, [11.75, 12.2], [0.92, 1], outExpo)}`,
          }}
        >
          <Layers t={t} />
        </div>
      )}
      <Chip text="Base layer wicks sweat" t={t} t0={11.97} t1={13.6} x={80} y={200} icon="check" big />
      <Chip text="Fleece for warmth" t={t} t0={13.64} t1={15.15} x={80} y={200} icon="check" big />
      <Chip text="Wind or rain shell on top" t={t} t0={15.19} t1={16.9} x={80} y={200} icon="check" big />
      <Chip text="Too warm? Take one off" t={t} t0={16.96} t1={18.3} x={80} y={200} icon="check" big />
      <Chip text="Cold at the break? Add it" t={t} t0={18.36} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: comfortable all morning (20.5 - 22.95) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  const ph = lt * 4.6;
  return (
    <AbsoluteFill>
      <Landscape
        uid="r4"
        pal={MORNING}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.22, 1.06], outExpo)}
        foreground={
          <g>
            <Woods y={groundY - 40} shift={lt * 50} />
            <FrostGround y={groundY} />
            <Person x={560} y={groundY + 40} scale={1.6} phase={ph} walk={1} lean={0.12} poles={false} handOverride={freeHand(ph, 1)} outfit={{ ...RYAN, ...FLEECE }} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Comfortable\nall morning."} t={t} t0={off + 0.12} top={200} size={150} />
      <Chip text="Thin layers, not one big coat" t={t} t0={21.11} x={80} y={560} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/polar-fleece-soft-shell-jacket-mens-card.jpg"
      photoH={760}
      spec="MEN'S · FULL-ZIP FLEECE MID-LAYER"
      name={
        <>
          Polar Fleece
          <br />
          Soft-Shell
          <br />
          Jacket
        </>
      }
      nameSize={84}
      price="$39.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V36: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={3.85} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={3.8} to={9.25}>
        <S2 off={3.8} />
      </Scene>
      <Scene from={9.2} to={20.55}>
        <S3 off={9.2} />
      </Scene>
      <Scene from={20.5} to={22.95} fadeIn={0.12}>
        <S4 off={20.5} />
      </Scene>
      <Scene from={22.85} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions words={words} windows={[[0.3, 3.8, 900], [3.8, 9.2, 760], [11.75, 20.5, 1050], [20.5, 22.85, 780]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
