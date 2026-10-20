import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, GUIDE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v34.json";

const words = vo.words as unknown as Word[];

const RAINY: Palette = {
  sky: ["#5d6a76", "#8f9aa3", "#c3c9cb"],
  sun: { x: 780, y: 540, r: 50, color: "#d6dadb", glow: "#c3cacd" },
  layers: ["#959ea4", "#7f8a8f", "#677462", "#55614a", "#454f3b"],
  mist: "#d2d8d8",
};
const STORM: Palette = {
  sky: ["#4a535c", "#737d85", "#a4abae"],
  sun: { x: 780, y: 540, r: 50, color: "#b5babc", glow: "#a7aeb1" },
  layers: ["#848c91", "#6f787c", "#5a6656", "#4b5541", "#3d4534"],
  mist: "#bfc6c7",
};
const CLEARING: Palette = {
  sky: ["#6b8aa3", "#b4c4cc", "#e2e5df"],
  sun: { x: 820, y: 500, r: 54, color: "#f6f3e6", glow: "#ece6cc" },
  layers: ["#a3adb3", "#8c999d", "#738570", "#5f7052", "#4d5c42"],
  mist: "#e2e8e5",
};

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lerpC = (a: string, b: string, k: number) => {
  const A = hex(a);
  const B = hex(b);
  return "#" + A.map((v, i) => Math.round(mix(v, B[i], k)).toString(16).padStart(2, "0")).join("");
};

const LILY: Outfit = {
  ...GUIDE,
  skin: "#E8B49A",
  skinShade: "#CC9478",
  hair: "#7a4a2a",
  ponytail: "#7a4a2a",
  beard: null,
  cap: "#3E4F5C",
  capShade: "#2C3943",
  pants: "#3d4248",
  pantsShade: "#2c3035",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};
// Cheap jacket: k = 0 dry, 1 soaked through.
const cheap = (k: number) => ({ jacket: lerpC("#7FB0B5", "#3f6a70", k), jacketShade: lerpC("#64959a", "#2f5257", k) });
const SHELL = { jacket: "#2F5D8C", jacketShade: "#22476C" };

const Woods: React.FC<{ y: number; shift: number; n?: number }> = ({ y, shift, n = 8 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const x = (((-120 + i * 190 - shift) % 1520) + 1520) % 1520 - 220;
      return i % 3 === 1 ? (
        <LeafTree key={i} x={x} y={y + 20} h={470} c="#B9772E" c2="#975c1f" />
      ) : (
        <Pine key={i} x={x} y={y + (i % 2) * 18} h={460 + (i % 3) * 60} c="#335d46" c2="#244634" />
      );
    })}
  </g>
);
const Ground: React.FC<{ y: number; base?: string; trail?: string }> = ({ y, base = "#56623a", trail = "#8d7a5c" }) => (
  <g>
    <rect x={-300} y={y - 60} width={1700} height={700} fill={base} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={trail} />
    {[120, 430, 820].map((px, i) => (
      <ellipse key={i} cx={px} cy={y + 50 + (i % 2) * 20} rx={70} ry={10} fill="#a9b6bd" opacity={0.45} />
    ))}
  </g>
);
const Rain: React.FC<{ t: number; on: number; n?: number; speed?: number }> = ({ t, on, n = 90, speed = 1900 }) => (
  <g opacity={on} stroke="#e3eaf0" strokeLinecap="round">
    {Array.from({ length: n }, (_, i) => {
      const x = ((i * 157) % 1180) - 50;
      const y = (((t * speed + i * 293) % 2100) + 2100) % 2100 - 100;
      return <line key={i} x1={x} y1={y} x2={x - 10} y2={y + 58} strokeWidth={3} opacity={0.35 + (i % 4) * 0.1} />;
    })}
  </g>
);

// Fabric cross-section: rain on top, the wearer's side below.
// Taped seam, then the membrane stops drops, then sweat vapor rises out, then the water-resistant comparison.
const Section: React.FC<{ t: number }> = ({ t }) => {
  const tape = at(t, [12.8, 13.3], [0, 1], outExpo);
  const mem = at(t, [13.86, 14.3], [0, 1]);
  const vapor = at(t, [15.68, 16.2], [0, 1]);
  const vents = at(t, [18.2, 18.6], [0, 1]);
  const wr = at(t, [20.1, 20.5], [0, 1]);
  const label = { fontFamily: HEAD, fontWeight: 800, letterSpacing: 1 } as const;
  const fabY = 250;
  // Shell (membrane) on the left, water-resistant on the right after 20.1 s.
  const drops = (cx: number, stopY: number, leak: boolean, seed: number) =>
    Array.from({ length: 7 }, (_, i) => {
      const x = cx - 150 + i * 50 + (i % 2) * 12;
      const cyc = ((t * 1.3 + i * 0.37 + seed) % 1 + 1) % 1;
      const y = 40 + cyc * (leak && i % 2 === 0 ? 420 : stopY - 40);
      return <ellipse key={i} cx={x} cy={y} rx={9} ry={14} fill="#5aa2d6" opacity={0.9} />;
    });
  return (
    <svg width={920} height={540} viewBox="0 0 920 540">
      {/* left: waterproof shell */}
      <g transform={`translate(${mix(460, 230, wr)},${mix(-20, 0, wr)}) scale(${mix(1.3, 1, wr)})`}>
        <text x={0} y={50} textAnchor="middle" fill={C.ink} style={{ ...label, fontSize: 40 }}>
          {wr > 0.5 ? "WATERPROOF" : "RAIN"}
        </text>
        <g transform="translate(0,0)">{drops(0, fabY - 10, false, 0)}</g>
        <rect x={-190} y={fabY} width={380} height={44} rx={8} fill="#2F5D8C" />
        {/* seam line + tape */}
        <line x1={0} y1={fabY} x2={0} y2={fabY + 44} stroke="#fff" strokeWidth={4} strokeDasharray="8 7" />
        <rect x={-40} y={fabY + 44} width={80} height={16 * tape} fill="#E3B23C" />
        <rect x={-190} y={fabY + 60} width={380} height={14 * mem} fill="#9fd0b0" />
        {mem > 0.5 && (
          <text x={0} y={fabY + 108} textAnchor="middle" fill="#3E8E5A" style={{ ...label, fontSize: 30 }}>
            MEMBRANE
          </text>
        )}
        {tape > 0.5 && mem < 0.5 && (
          <text x={0} y={fabY + 108} textAnchor="middle" fill="#9C7A1F" style={{ ...label, fontSize: 30 }}>
            TAPED SEAM
          </text>
        )}
        {/* vapor wisps rising out */}
        {Array.from({ length: 4 }, (_, i) => {
          const cyc = ((t * 0.7 + i * 0.25) % 1 + 1) % 1;
          const x = -120 + i * 80;
          const y = 400 - cyc * 260;
          return (
            <path
              key={i}
              d={`M${x},${y} q14,-20 0,-40 q-14,-20 0,-40`}
              stroke="#8a8f93"
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
              opacity={vapor * (1 - cyc) * (1 + vents * 0.4) * 0.8}
            />
          );
        })}
        {vapor > 0.5 && (
          <text x={0} y={420} textAnchor="middle" fill={C.ink} style={{ ...label, fontSize: 30, opacity: vapor }}>
            {vents > 0.5 ? "VENTS OPEN: MORE OUT" : "SWEAT VAPOR OUT"}
          </text>
        )}
      </g>
      {/* right: water-resistant only */}
      <g transform="translate(690,0)" opacity={wr}>
        <text x={0} y={36} textAnchor="middle" fill={C.ink} style={{ ...label, fontSize: 40 }}>
          WATER-RESISTANT
        </text>
        {drops(0, fabY - 10, true, 0.5)}
        <rect x={-190} y={fabY} width={380} height={44} rx={8} fill={lerpC("#7FB0B5", "#3f6a70", at(t, [20.6, 22.4], [0, 1]))} />
        <text x={0} y={420} textAnchor="middle" fill="#D9443A" style={{ ...label, fontSize: 30 }}>
          LIGHT DRIZZLE ONLY
        </text>
      </g>
      {wr > 0 && <line x1={460} y1={20} x2={460} y2={520} stroke="#d6d2c8" strokeWidth={3} opacity={wr} />}
    </svg>
  );
};

// ============ S1 HOOK: cheap jacket, rainy fall hike (0 - 4.25) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1680;
  const ph = t * 4.4;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={RAINY}
        camX={t * 20}
        zoom={mix(1.03, 1.08, t / 4.25)}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={t * 60} />
            <Ground y={groundY} />
            <Person x={560} y={groundY + 40} scale={1.7} phase={ph} walk={0.9} lean={0.1} poles={false} handOverride={freeHand(ph, 0.9)} outfit={{ ...LILY, ...cheap(0) }} expression="neutral" />
            <Rain t={t} on={0.7} n={60} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Water-resistant\nis not\nwaterproof"} t={t} t0={0} top={150} size={124} />
      <Chip text="Cheap water-resistant jacket" t={t} t0={1.3} x={80} y={570} icon="none" />
      <Chip text="Rainy fall hike" t={t} t0={3.1} x={80} y={670} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: soaked shoulders, damp inside (4.2 - 9.0) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const wet = at(t, [4.6, 6.4], [0, 1]);
  const groundY = 1720;
  const ph = lt * (t > 7 ? 2.8 : 4.0);
  const walk = t > 7 ? 0.5 : 0.8;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={STORM}
        camX={30 + lt * 10}
        zoom={mix(1.02, 1.08, lt / 4.8)}
        foreground={
          <g>
            <Woods y={groundY - 120} shift={300 + lt * 30} n={7} />
            <Ground y={groundY} base="#4c5634" trail="#7e6d52" />
            <Person x={560} y={groundY + 40} scale={1.6} phase={ph} walk={walk} lean={0.12} poles={false} handOverride={freeHand(ph, walk)} outfit={{ ...LILY, ...cheap(wet) }} expression={t > 6.6 ? "tired" : "neutral"} light={0.88} />
            <Rain t={t} on={1} n={110} speed={2300} />
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim />
      <Readout label="SHOULDERS" value="SOAKED" ok={false} t={t} t0={5.75} x={80} y={420} pulseAt={5.75} />
      <Chip text="Damp inside from sweat" t={t} t0={7.15} x={80} y={650} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: how to choose (8.95 - 23.15) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1830;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={RAINY}
        camX={lt * 6}
        foreground={
          <g>
            <Woods y={groundY - 200} shift={600 + lt * 6} />
            <Ground y={groundY} />
            <Person x={720} y={groundY} scale={1.5} walk={0} lean={0.06} poles={false} handOverride={[30, 34]} outfit={{ ...LILY, ...SHELL }} expression="happy" breathe={Math.sin(t * 2.4) * 2} />
            <Rain t={t} on={0.35} n={50} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={600} />
      <Title text={"How to choose\na waterproof\njacket."} t={t} t0={9.1} t1={11.6} top={200} size={140} />
      {!isClean() && (
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            top: 330,
            height: 580,
            borderRadius: 30,
            background: "#fff",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            overflow: "hidden",
            opacity: at(t, [11.6, 11.9], [0, 1]),
            scale: `${at(t, [11.6, 12.1], [0.92, 1], outExpo)}`,
            display: "flex",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <Section t={t} />
        </div>
      )}
      <Chip text="Taped seams" t={t} t0={12.8} t1={13.8} x={80} y={200} icon="check" big />
      <Chip text="Waterproof membrane" t={t} t0={13.86} t1={15.6} x={80} y={200} icon="check" big />
      <Chip text="Breathable: sweat escapes" t={t} t0={15.68} t1={18.15} x={80} y={200} icon="check" big />
      <Chip text="Open the vents on climbs" t={t} t0={18.2} t1={20.05} x={80} y={200} icon="check" big />
      <Chip text="Water-resistant: drizzle only" t={t} t0={20.13} x={80} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: the new shell keeps her dry (23.1 - 25.8) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  const ph = lt * 4.6;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={CLEARING}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.22, 1.06], outExpo)}
        foreground={
          <g>
            <Woods y={groundY - 40} shift={lt * 50} />
            <Ground y={groundY} base="#62703f" trail="#a68d68" />
            <Person x={560} y={groundY + 40} scale={1.6} phase={ph} walk={1} lean={0.12} poles={false} handOverride={freeHand(ph, 1)} outfit={{ ...LILY, ...SHELL }} expression="happy" />
            <Rain t={t} on={0.7} n={70} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Dry\nall day."} t={t} t0={off + 0.12} top={200} size={170} />
      <Chip text="Taped seams + membrane" t={t} t0={23.9} x={80} y={560} icon="check" />
      <Chip text="Vents open on the climbs" t={t} t0={24.5} x={80} y={660} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/beginners-hiking-guide-card.jpg"
      spec="DIGITAL GUIDE · INSTANT DOWNLOAD"
      name={
        <>
          Beginner's
          <br />
          Hiking Guide
        </>
      }
      nameSize={100}
      price="$9.99"
      save="Save this before your next rainy hike"
    />
  );
};

export const V34: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={4.25} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={4.2} to={9.0}>
        <S2 off={4.2} />
      </Scene>
      <Scene from={8.95} to={23.15}>
        <S3 off={8.95} />
      </Scene>
      <Scene from={23.1} to={25.8} fadeIn={0.12}>
        <S4 off={23.1} />
      </Scene>
      <Scene from={25.7} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions words={words} windows={[[0.3, 4.2, 900], [4.2, 8.95, 760], [11.6, 23.1, 1050], [23.1, 25.7, 780]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
