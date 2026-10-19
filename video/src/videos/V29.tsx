import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, GUIDE, JAKE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v29.json";

const words = vo.words as unknown as Word[];

const WOODS: Palette = {
  sky: ["#6b8fae", "#bccbd4", "#e8ebe2"],
  sun: { x: 820, y: 500, r: 54, color: "#fffbe8", glow: "#f6ecc4" },
  layers: ["#a9b6be", "#8d9ea4", "#71877e", "#58705a", "#465a48"],
  mist: "#e9eeec",
};

const RACHEL: Outfit = {
  ...GUIDE,
  skin: "#E8B996",
  skinShade: "#CC9A76",
  hair: "#7a4a2a",
  ponytail: "#7a4a2a",
  beard: null,
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#5F7F99",
  jacketShade: "#4A6478",
  pants: "#3E4650",
  pantsShade: "#2E353D",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};
const HIKER1: Outfit = { ...JAKE, jacket: "#C2662E", jacketShade: "#9B4E20" };
const HIKER2: Outfit = {
  ...GUIDE,
  skin: "#9A6247",
  skinShade: "#7E4E37",
  hair: "#1f1a18",
  ponytail: "#1f1a18",
  beard: null,
  jacket: "#3F6B55",
  jacketShade: "#2D5141",
  cap: "#C9B48E",
  capShade: "#A8946F",
};

const Trees: React.FC<{ y: number; shift: number; n?: number }> = ({ y, shift, n = 8 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const x = (((-120 + i * 190 - shift) % 1520) + 1520) % 1520 - 220;
      return <Pine key={i} x={x} y={y + (i % 2) * 18} h={460 + (i % 3) * 60} c="#36634a" c2="#254a37" />;
    })}
  </g>
);
const Ground: React.FC<{ y: number; base?: string; trail?: string }> = ({ y, base = "#56703f", trail = "#a8906c" }) => (
  <g>
    <rect x={-300} y={y - 60} width={1700} height={700} fill={base} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={trail} />
  </g>
);

// Wet boulder in front of Rachel: she sits behind it, legs hidden.
const Boulder: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-260,40 Q-250,-120 -120,-150 Q20,-176 150,-130 Q260,-90 270,40 Z" fill="#7d8384" />
    <path d="M20,-170 Q150,-130 150,-130 Q260,-90 270,40 L60,40 Z" fill="rgba(0,0,0,0.14)" />
    <path d="M-200,-90 Q-120,-130 -40,-128" stroke="rgba(255,255,255,0.45)" strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M-150,-60 Q-90,-80 -40,-78" stroke="rgba(255,255,255,0.3)" strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

// Sound rings from the mouth. strength 0..1 (voice = weak and short, whistle = strong and wide).
const Rings: React.FC<{ x: number; y: number; t: number; starts: number[]; reach: number; color?: string; w?: number }> = ({ x, y, t, starts, reach, color = "#fff", w = 8 }) => (
  <g>
    {starts.map((s, i) => {
      const k = (t - s) / 0.9;
      if (k < 0 || k > 1) return null;
      const r = 40 + Math.sqrt(k) * reach;
      return (
        <path
          key={i}
          d={`M${x + r * Math.cos(-0.7)},${y + r * Math.sin(-0.7)} A${r},${r} 0 0 1 ${x + r * Math.cos(0.7)},${y + r * Math.sin(0.7)}`}
          stroke={color}
          strokeWidth={w * (1 - k * 0.6)}
          fill="none"
          strokeLinecap="round"
          opacity={1 - k}
        />
      );
    })}
  </g>
);

const Whistle: React.FC<{ x: number; y: number; s: number; o: number }> = ({ x, y, s, o }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={o}>
    <rect x={0} y={-10} width={34} height={20} rx={5} fill="#E0784A" />
    <circle cx={34} cy={2} r={14} fill="#E0784A" />
    <rect x={8} y={-14} width={10} height={6} fill="#1F2421" />
  </g>
);

// ============ S1 HOOK: slipped, can't walk (0 - 2.8) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1700;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={WOODS}
        camX={t * 14}
        zoom={mix(1.04, 1.09, t / 2.8)}
        foreground={
          <g>
            <Trees y={groundY - 80} shift={t * 16} />
            <Ground y={groundY} />
            <Person x={560} y={groundY - 10 + 182 * 1.7} scale={1.7} walk={0} lean={0.02} poles={false} handOverride={[70, -20]} outfit={RACHEL} expression="tired" breathe={Math.sin(t * 3) * 2} />
            <Boulder x={540} y={groundY + 160} s={1.35} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Shouting for\nhelp won't\nwork."} t={t} t0={0} top={150} size={124} />
      <Chip text="Slipped on a wet rock" t={t} t0={1.48} x={80} y={570} icon="none" />
      <Chip text="Can't walk" t={t} t0={2.21} x={80} y={670} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: shouting until her voice is gone (2.75 - 7.0) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1720;
  const px = 380;
  const sc = 1.5;
  const hip = groundY - 10;
  const hipY = hip + 182 * sc;
  const mouth: [number, number] = [px + 52 * sc, hip - 148 * sc];
  const shouts = [3.19, 3.7, 4.33, 4.87];
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={WOODS}
        camX={40 + lt * 6}
        zoom={mix(1.02, 1.06, lt / 4.2)}
        dim={at(t, [5.6, 6.8], [0, 0.15])}
        foreground={
          <g>
            <Trees y={groundY - 120} shift={300 + lt * 6} />
            <Ground y={groundY} />
            <Person x={px} y={hipY} scale={sc} walk={0} lean={0.1} poles={false} handOverride={[48, -136]} outfit={RACHEL} expression="tired" breathe={Math.sin(t * 5) * 2.5} />
            <Boulder x={370} y={groundY + 140} s={1.2} />
            <Rings x={mouth[0]} y={mouth[1]} t={t} starts={shouts} reach={mix(260, 90, at(t, [3.2, 5.1], [0, 1]))} w={7} />
          </g>
        }
      />
      <Vignette strength={0.5} />
      <Scrim />
      <Readout label="HER VOICE" value="FADING" ok={false} t={t} t0={3.19} x={80} y={420} pulseAt={4.58} />
      <Chip text="No one heard" t={t} t0={5.71} x={80} y={650} icon="x" />
    </AbsoluteFill>
  );
};

// Three short dots: 3 blasts, wait, repeat.
const Blasts: React.FC<{ t: number; t0: number; x: number; y: number }> = ({ t, t0, x, y }) => (
  <div style={{ position: "absolute", left: x, top: y, display: "flex", gap: 26, opacity: at(t, [t0, t0 + 0.25], [0, 1]) }}>
    {[0, 1, 2].map((i) => {
      const s = t0 + 0.15 + i * 0.32;
      return (
        <div
          key={i}
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            background: t > s ? "#fff" : "rgba(255,255,255,0.3)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            scale: `${t > s ? at(t, [s, s + 0.25], [1.35, 1]) : 0.8}`,
          }}
        />
      );
    })}
  </div>
);

// ============ S3 FIX: a whistle, three blasts (6.95 - 19.45) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1760;
  const px = 380;
  const sc = 1.7;
  const hip = groundY - 10;
  const hipY = hip + 182 * sc;
  const blowing = t > 8.4 && t < 15.9;
  const mouth: [number, number] = [px + 52 * sc, hip - 148 * sc];
  const blasts = [8.5, 9.4, 10.3, 12.75, 13.07, 13.39, 15.4, 15.72, 16.04];
  const strap = at(t, [16.5, 16.9], [0, 1]);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={WOODS}
        camX={lt * 8}
        foreground={
          <g>
            <Trees y={groundY - 120} shift={500 + lt * 8} />
            <Ground y={groundY} />
            <Person
              x={px}
              y={hipY}
              scale={sc}
              walk={0}
              lean={0.1}
              poles={false}
              handOverride={blowing ? [48, -136] : [50, -40]}
              outfit={RACHEL}
              expression="neutral"
              breathe={Math.sin(t * 2.5) * 2}
            />
            <Whistle x={blowing ? mouth[0] - 4 : px + 48 * sc} y={blowing ? mouth[1] + 6 : hip - 40 * sc} s={1.3} o={at(t, [8.3, 8.45], [0, 1]) * (strap > 0 ? 1 - strap : 1)} />
            {/* whistle clipped on the shoulder strap */}
            <g opacity={strap}>
              <line x1={px + 20 * sc} y1={hip - 112 * sc} x2={px + 24 * sc} y2={hip - 84 * sc} stroke="#1F2421" strokeWidth={4} />
              <Whistle x={px + 18 * sc} y={hip - 78 * sc} s={1.2} o={1} />
            </g>
            <Rings x={mouth[0] + 30} y={mouth[1]} t={t} starts={blasts} reach={560} w={12} />
            <Boulder x={370} y={groundY + 160} s={1.4} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={760} />
      <Title text={"Here's\nthe fix."} t={t} t0={7.05} t1={8.2} top={200} size={160} />
      <Chip text="A whistle carries farther" t={t} t0={8.46} x={80} y={200} icon="check" big />
      <Chip text="Almost no energy" t={t} t0={10.67} t1={12.4} x={80} y={330} icon="check" />
      <Chip text="3 blasts = help" t={t} t0={12.48} x={80} y={330} icon="check" />
      <Blasts t={t} t0={12.6} x={110} y={440} />
      <Chip text="Wait, then repeat" t={t} t0={14.7} x={80} y={540} icon="check" />
      <Chip text="On your pack strap" t={t} t0={16.64} x={80} y={640} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: the next group heard it (19.4 - 22.3) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1680;
  const ph = lt * 4.6;
  const walkIn = at(lt, [0, 2.2], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={GOLDEN}
        camX={lt * 10}
        zoom={at(lt, [0, 0.9], [1.2, 1.05])}
        foreground={
          <g>
            <Trees y={groundY - 80} shift={lt * 10} />
            <Ground y={groundY} base="#7a7a40" trail="#c2a47b" />
            <Person x={260} y={groundY + 182 * 1.45} scale={1.45} walk={0} lean={0.04} poles={false} handOverride={[70, -170]} outfit={RACHEL} expression="happy" />
            <Boulder x={250} y={groundY + 150} s={1.1} />
            <Person x={mix(1150, 640, walkIn)} y={groundY + 40} scale={1.45} phase={ph + 1} walk={1 - walkIn * 0.7} lean={0.12} poles={false} handOverride={freeHand(ph + 1, 1)} outfit={HIKER2} expression="happy" flip />
            <Person x={mix(1350, 860, walkIn)} y={groundY + 50} scale={1.55} phase={ph} walk={1 - walkIn * 0.7} lean={0.12} poles={false} handOverride={freeHand(ph, 1)} outfit={HIKER1} expression="happy" flip />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"They heard\nher."} t={t} t0={off + 0.12} top={200} size={170} />
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
      photo="products/hiking-emergency-checklist-card.jpg"
      spec="PRINTABLE · YOUR KIT, CHECKS AND STEPS"
      name={
        <>
          Hiking Emergency
          <br />
          Checklist
        </>
      }
      nameSize={86}
      price="$5.99"
      save="Save this for someone you love"
    />
  );
};

export const V29: React.FC = () => {
  void C;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={2.85} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={2.75} to={7.05}>
        <S2 off={2.75} />
      </Scene>
      <Scene from={6.95} to={19.5}>
        <S3 off={6.95} />
      </Scene>
      <Scene from={19.4} to={22.3} fadeIn={0.12}>
        <S4 off={19.4} />
      </Scene>
      <Scene from={22.2} to={30} fadeOut={0}>
        <S5 off={22.2} />
      </Scene>
      <Captions words={words} windows={[[0.3, 2.8, 900], [2.8, 7.0, 300], [8.2, 19.4, 1150]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
