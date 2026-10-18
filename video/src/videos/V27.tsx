import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, GUIDE, JAKE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v27.json";

const words = vo.words as unknown as Word[];

const BRIGHT: Palette = {
  sky: ["#4f8cc0", "#b0d0e4", "#eef0e4"],
  sun: { x: 800, y: 520, r: 60, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#a8bcc8", "#8ca4b0", "#72908c", "#5a7458", "#475c46"],
  mist: "#eef3f2",
};
const HOT: Palette = {
  sky: ["#7da0bc", "#d8d8c8", "#f2e6c8"],
  sun: { x: 860, y: 420, r: 70, color: "#fffbe0", glow: "#fbe4a8" },
  layers: ["#c4b8a2", "#a89c84", "#8c806a", "#706650", "#585040"],
  mist: "#f4e8cc",
};

const KIM: Outfit = {
  ...GUIDE,
  skin: "#E3B08C",
  skinShade: "#C6926E",
  hair: "#1f1a18",
  ponytail: "#1f1a18",
  beard: null,
  cap: "#C9B48E",
  capShade: "#A8946F",
  jacket: "#C2662E",
  jacketShade: "#9B4E20",
  pants: "#3E4650",
  pantsShade: "#2E353D",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};
const FRIEND1: Outfit = { ...JAKE, jacket: "#5F7F99", jacketShade: "#4A6478", beard: null, hair: "#8a5a32", cap: "#2F3B45", capShade: "#222c34" };
const FRIEND2: Outfit = {
  ...GUIDE,
  skin: "#9A6247",
  skinShade: "#7E4E37",
  hair: "#1f1a18",
  ponytail: "#1f1a18",
  beard: null,
  jacket: "#6B4E8A",
  jacketShade: "#523B6B",
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};

const Trees: React.FC<{ y: number; shift: number; n?: number }> = ({ y, shift, n = 8 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const x = (((-120 + i * 190 - shift) % 1520) + 1520) % 1520 - 220;
      return <Pine key={i} x={x} y={y + (i % 2) * 18} h={440 + (i % 3) * 60} c="#36634a" c2="#254a37" />;
    })}
  </g>
);
const Ground: React.FC<{ y: number; base?: string; trail?: string }> = ({ y, base = "#5f7a44", trail = "#c0a67e" }) => (
  <g>
    <rect x={-300} y={y - 60} width={1700} height={700} fill={base} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={trail} />
  </g>
);

const TrailSign: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-10} y={-300} width={20} height={300} fill="#6b4a30" />
    <rect x={-150} y={-330} width={300} height={130} rx={10} fill="#7a5636" stroke="#5a3e26" strokeWidth={6} />
    <text x={0} y={-282} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={40} fill="#f1e5c8" letterSpacing={2}>
      LOOP TRAIL
    </text>
    <text x={0} y={-226} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={56} fill="#f1e5c8">
      5 MI
    </text>
  </g>
);

// Steep slope: ground line rising to the right.
const SL = 0.42;
const gy = (x: number) => 1880 - x * Math.tan(SL);

// Elevation profiles: same distance, different climb.
const Profile: React.FC<{ t: number; t0: number; steep: boolean; y: number; label: string }> = ({ t, t0, steep, y, label }) => {
  const k = at(t, [t0, t0 + 1.2], [0, 1], outExpo);
  const W = 760;
  const H = 210;
  const pts = Array.from({ length: 41 }, (_, i) => {
    const u = i / 40;
    const h = steep ? Math.min(1, Math.pow(u * 1.35, 1.6)) * (u < 0.74 ? 1 : 1 - (u - 0.74) * 3.6) : 0.18 * Math.sin(u * Math.PI) + 0.04 * Math.sin(u * 9);
    return [u * W, H - Math.max(0, h) * H] as const;
  });
  const d = `M0,${H} ` + pts.map(([x, yy]) => `L${x.toFixed(1)},${yy.toFixed(1)}`).join(" ") + ` L${W},${H} Z`;
  const col = steep ? "#D9443A" : "#3E8E5A";
  return (
    <div style={{ position: "absolute", left: 40, top: y, width: 840, opacity: at(t, [t0, t0 + 0.3], [0, 1]) }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: HEAD, fontWeight: 800, fontSize: 46, color: C.ink, textTransform: "uppercase", letterSpacing: 1 }}>
        <span>{label}</span>
        <span style={{ fontSize: 38, color: "#6b6b66" }}>5 mi</span>
      </div>
      <svg width={W + 40} height={H + 20} style={{ marginTop: 6 }}>
        <defs>
          <clipPath id={`c${steep ? 1 : 0}`}>
            <rect x={0} y={0} width={W * k} height={H + 20} />
          </clipPath>
        </defs>
        <line x1={0} y1={H} x2={W} y2={H} stroke="#c9c3b6" strokeWidth={4} />
        <g clipPath={`url(#c${steep ? 1 : 0})`}>
          <path d={d} fill={col} opacity={0.22} />
          <path d={"M" + pts.map(([x, yy]) => `${x.toFixed(1)},${yy.toFixed(1)}`).join(" L")} fill="none" stroke={col} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

// ============ S1 HOOK: picks a 5 mile trail (0 - 4.2) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1660;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={BRIGHT}
        camX={t * 20}
        zoom={mix(1.03, 1.08, t / 4.2)}
        foreground={
          <g>
            <Trees y={groundY - 60} shift={t * 25} />
            <Ground y={groundY} />
            <TrailSign x={820} y={groundY + 30} />
            <Person x={470} y={groundY + 40} scale={1.75} walk={0} lean={0.04} poles={false} handOverride={[22, 36]} outfit={KIM} expression="happy" breathe={Math.sin(t * 2.4) * 2} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"5 miles isn't\nthe number\nthat matters."} t={t} t0={0} top={160} size={118} />
      <Chip text="First hike: 5 miles" t={t} t0={1.05} x={80} y={560} icon="none" />
      <Chip text="Easy, she thought" t={t} t0={2.94} x={80} y={660} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: still climbing two hours later (4.1 - 9.9) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const ph = lt * 2.4;
  const xs = [700, 470, 260];
  const outfits = [KIM, FRIEND1, FRIEND2];
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={HOT}
        camX={20 + lt * 8}
        zoom={mix(1.02, 1.07, lt / 5.8)}
        foreground={
          <g>
            <path d={`M-100,${gy(-100)} L1200,${gy(1200)} L1200,2100 L-100,2100 Z`} fill="#6c6a3e" />
            <path d={`M-100,${gy(-100) + 10} L1200,${gy(1200) + 10} L1200,${gy(1200) + 90} L-100,${gy(-100) + 90} Z`} fill="#a88e66" />
            {[60, 330, 600, 900].map((x, i) => (
              <Pine key={i} x={x + 120} y={gy(x + 120) - 10} h={300 + (i % 2) * 60} c="#4a6a48" c2="#36523a" />
            ))}
            {xs.map((x, i) => (
              <Person
                key={i}
                x={x}
                y={gy(x) + 60}
                scale={i === 0 ? 1.35 : 1.2}
                phase={ph + i * 1.3}
                walk={0.5}
                lean={0.42}
                slope={SL * 0.75}
                poles={false}
                handOverride={i === 0 ? [40, 40] : freeHand(ph + i, 0.4)}
                outfit={outfits[i]}
                expression="tired"
              />
            ))}
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim />
      <Readout label="TWO HOURS IN" value="CLIMBING" ok={false} t={t} t0={4.3} x={80} y={420} pulseAt={4.3} />
      <Chip text="Friends miserable" t={t} t0={6.5} x={80} y={650} icon="x" />
      <Chip text="Only checked distance" t={t} t0={8.0} x={80} y={750} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: check the elevation gain (9.8 - 18.6) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1830;
  const ph = lt * 4.2;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={BRIGHT}
        camX={lt * 14}
        foreground={
          <g>
            <Trees y={groundY - 200} shift={200 + lt * 18} />
            <Ground y={groundY} />
            <Person x={560} y={groundY} scale={1.0} phase={ph} walk={0.8} lean={0.1} poles={false} handOverride={freeHand(ph, 0.8)} outfit={KIM} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={600} />
      <Title text={"Here's\nthe fix."} t={t} t0={9.95} t1={11.1} top={200} size={160} />
      <Chip text="Check elevation gain" t={t} t0={11.15} x={80} y={200} icon="check" big />
      {!isClean() && (
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            top: 330,
            height: 700,
            borderRadius: 30,
            background: "#fff",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            opacity: at(t, [11.6, 11.9], [0, 1]),
            scale: `${at(t, [11.6, 12.1], [0.92, 1], outExpo)}`,
          }}
        >
          <Profile t={t} t0={11.75} steep y={50} label="Steep climb" />
          <Profile t={t} t0={13.25} steep={false} y={370} label="Gentle climb" />
        </div>
      )}
      <Chip text="Not for a first hike" t={t} t0={12.4} t1={13.3} x={140} y={680} icon="x" />
      <Chip text="First hike: pick this" t={t} t0={14.05} t1={15.95} x={80} y={1050} icon="check" />
      <Chip text="Add more as you get stronger" t={t} t0={16.0} x={80} y={1050} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: a beautiful, easy loop (18.5 - 21.3) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1640;
  const ph = lt * 4.8;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={GOLDEN}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.25, 1.06], outExpo)}
        foreground={
          <g>
            <Trees y={groundY - 40} shift={lt * 50} />
            <Ground y={groundY} base="#7a7a40" trail="#c2a47b" />
            <Person x={210} y={groundY + 40} scale={1.3} phase={ph + 2} walk={1} lean={0.12} poles={false} handOverride={freeHand(ph + 2, 1)} outfit={FRIEND2} expression="happy" />
            <Person x={400} y={groundY + 45} scale={1.4} phase={ph + 1} walk={1} lean={0.12} poles={false} handOverride={freeHand(ph + 1, 1)} outfit={FRIEND1} expression="happy" />
            <Person x={620} y={groundY + 50} scale={1.55} phase={ph} walk={1} lean={0.12} poles={false} handOverride={freeHand(ph, 1)} outfit={KIM} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"The right\nfirst hike."} t={t} t0={off + 0.12} top={200} size={170} />
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
      photo="products/beginner-friendly-trails-usa-gpx-route-collection-card.jpg"
      spec="10 GPX ROUTES · ROUTE GUIDE INCLUDED"
      name={
        <>
          Beginner-Friendly
          <br />
          Trails USA
        </>
      }
      nameSize={86}
      price="$12.99"
      save="Save this before your first hike"
    />
  );
};

export const V27: React.FC = () => {
  void C;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={4.2} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={4.1} to={9.9}>
        <S2 off={4.1} />
      </Scene>
      <Scene from={9.8} to={18.6}>
        <S3 off={9.8} />
      </Scene>
      <Scene from={18.5} to={21.3} fadeIn={0.12}>
        <S4 off={18.5} />
      </Scene>
      <Scene from={21.2} to={30} fadeOut={0}>
        <S5 off={21.2} />
      </Scene>
      <Captions words={words} windows={[[0.3, 4.15, 900], [4.15, 9.85, 300], [11.1, 18.55, 1150]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
