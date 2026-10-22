import React from "react";
import { AbsoluteFill } from "remotion";
import { hikerGeometry, hikerTransform, HikerProps } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v47.json";

const words = vo.words as unknown as Word[];

const AUTUMN: Palette = {
  sky: ["#4d86c0", "#bcd6ea", "#f6ead2"],
  sun: { x: 820, y: 640, r: 58, color: "#fffbe8", glow: "#ffeab0" },
  layers: ["#c2bfae", "#b0a07c", "#a07e52", "#8a6440", "#6e4e30"],
  mist: "#f4e8d0",
};
const SHADE: Palette = {
  sky: ["#6a8db0", "#c3d2dc", "#ece6d8"],
  sun: { x: 240, y: 700, r: 50, color: "#fffbe8", glow: "#fff0c8" },
  layers: ["#b9b8a8", "#a39878", "#8e7656", "#785c40", "#5f4732"],
  mist: "#eee6d6",
};

const TOM: Outfit = {
  ...JAKE,
  skin: "#C68E6E",
  skinShade: "#A87253",
  hair: "#3b2a20",
  beard: "#3b2a20",
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#4E6B8A",
  jacketShade: "#3a536c",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};
const LILY: Outfit = {
  ...GUIDE,
  skin: "#D6A383",
  skinShade: "#B88566",
  hair: "#5a3a24",
  ponytail: "#5a3a24",
  beard: null,
  cap: "#E0A33A",
  capShade: "#B9822A",
  jacket: "#C8476A",
  jacketShade: "#A23552",
  pants: "#3E4650",
  pantsShade: "#2E353D",
  pack: "#2F7F86",
  packShade: "#256870",
};
const KID = 1.0; // Lily's scale next to Tom's 1.5

const Trail: React.FC<{ y: number; grass?: string; dirt?: string }> = ({ y, grass = "#7c7a44", dirt = "#bf9f76" }) => (
  <g>
    <rect x={-300} y={y - 40} width={1700} height={700} fill={grass} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={dirt} />
    {Array.from({ length: 14 }, (_, i) => (
      <ellipse key={i} cx={(i * 137) % 1100} cy={y + 130 + ((i * 53) % 160)} rx={9} ry={5} fill={i % 2 ? "#d0702e" : "#e3a23a"} opacity={0.8} />
    ))}
  </g>
);
const FallWoods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <g>
    {Array.from({ length: 8 }, (_, i) => {
      const x = ((((-120 + i * 190 - shift) % 1520) + 1520) % 1520) - 220;
      return i % 4 === 2 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 18} h={500} c="#3b6550" c2="#2b4d3c" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={420 + (i % 3) * 50} c={i % 2 ? "#e0a03a" : "#c8642e"} c2={i % 2 ? "#bf8128" : "#a24c22"} />
      );
    })}
  </g>
);

// A fallen log, drawn in front of a sitting child (hides the legs).
const Log: React.FC<{ x: number; y: number; w?: number; h?: number }> = ({ x, y, w = 380, h = 78 }) => (
  <g>
    <ellipse cx={x} cy={y + 8} rx={w / 2 + 20} ry={16} fill="rgba(0,0,0,0.2)" />
    <rect x={x - w / 2} y={y - h} width={w} height={h + 4} rx={h / 2} fill="#7a5638" />
    <rect x={x - w / 2 + 20} y={y - h} width={w - 40} height={h * 0.25} rx={h * 0.12} fill="#8f6744" />
    <ellipse cx={x + w / 2 - 10} cy={y - h / 2} rx={h * 0.38} ry={h * 0.5} fill="#b48a5e" />
    <ellipse cx={x + w / 2 - 10} cy={y - h / 2} rx={h * 0.2} ry={h * 0.26} fill="none" stroke="#8f6744" strokeWidth={4} />
  </g>
);

// A tree trunk with a painted trail blaze.
const BlazeTree: React.FC<{ x: number; y: number; glow?: number }> = ({ x, y, glow = 0 }) => (
  <g>
    <rect x={x - 26} y={y - 620} width={52} height={624} fill="#5a4030" />
    <rect x={x - 26} y={y - 620} width={16} height={624} fill="#4a3426" />
    {glow > 0 && <rect x={x - 32} y={y - 400} width={64} height={92} rx={10} fill="#fff6c8" opacity={0.5 * glow} />}
    <rect x={x - 16} y={y - 384} width={32} height={60} rx={3} fill="#f2f0e6" />
  </g>
);
// Junction signpost with two arms.
const Signpost: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <rect x={x - 9} y={y - 260} width={18} height={264} fill="#6b4b30" />
    <path d={`M${x - 10},${y - 250} h150 l26,22 l-26,22 h-150 Z`} fill="#8d6a48" />
    <path d={`M${x + 10},${y - 190} h-150 l-26,22 l26,22 h150 Z`} fill="#7a5a3c" />
  </g>
);

// Paper card held in the near hand.
const Paper: React.FC<{ p: HikerProps }> = ({ p }) => {
  const g = hikerGeometry(p);
  const h = g.arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] + 4},${h[1] - 18}) rotate(-8)`}>
        <rect x={-22} y={-30} width={46} height={58} rx={3} fill="#fbf8f1" stroke="#c9c2b2" strokeWidth={2} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <circle cx={-12} cy={-18 + i * 13} r={3.5} fill="#3E8E5A" />
            <rect x={-4} y={-20 + i * 13} width={22} height={3} fill="#9a9488" />
          </g>
        ))}
      </g>
    </g>
  );
};

// Scavenger hunt list, items ticking off.
const HuntCard: React.FC<{ t: number; t0: number; k: number[] }> = ({ t, t0, k }) => {
  if (isClean()) return null;
  const rows: [string, string][] = [
    ["A red leaf", "#c8442e"],
    ["A pinecone", "#8a5a34"],
    ["A mushroom", "#d9b48a"],
    ["A trail blaze", "#f2f0e6"],
  ];
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 330,
        height: 560,
        borderRadius: 30,
        background: "#fbf8f1",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        opacity: at(t, [t0, t0 + 0.3], [0, 1]),
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <div style={{ position: "absolute", top: 30, left: 50, fontFamily: HEAD, fontWeight: 700, fontSize: 36, letterSpacing: 4, color: "#6b6b66" }}>SCAVENGER HUNT</div>
      {rows.map(([a, col], i) => {
        const done = t >= k[i] + 0.3;
        return (
          <div
            key={a}
            style={{
              position: "absolute",
              left: 50,
              right: 50,
              top: 100 + i * 110,
              display: "flex",
              alignItems: "center",
              gap: 30,
              borderBottom: i < 3 ? "3px solid #ece8df" : "none",
              paddingBottom: 18,
              opacity: at(t, [k[i] - 0.15, k[i] + 0.1], [0.35, 1]),
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 14,
                border: `5px solid ${done ? "#3E8E5A" : "#cfc9bc"}`,
                background: done ? "#3E8E5A" : "#fff",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 44,
                fontWeight: 800,
                fontFamily: "Inter",
                scale: `${done ? at(t, [k[i] + 0.3, k[i] + 0.55], [1.25, 1]) : 1}`,
                flexShrink: 0,
              }}
            >
              {done ? "✓" : ""}
            </div>
            <div style={{ width: 30, height: 30, borderRadius: 15, background: col, border: "3px solid rgba(0,0,0,0.15)", flexShrink: 0 }} />
            <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 66, color: C.ink, textTransform: "uppercase", whiteSpace: "nowrap" }}>{a}</div>
          </div>
        );
      })}
    </div>
  );
};

// ============ S1 HOOK: first fall hike (0 - 3.05) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1760;
  const ph = t * 3.6;
  const pT: HikerProps = { x: 300 + t * 40, y: groundY + 30, scale: 1.5, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.7) };
  const pL: HikerProps = { x: 560 + t * 40, y: groundY + 40, scale: KID, phase: ph * 1.3, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph * 1.3, 0.8) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={AUTUMN}
        camX={t * 14}
        zoom={mix(1.03, 1.08, t / 3)}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={t * 40} />
            <Trail y={groundY} />
            <Person {...pT} outfit={TOM} expression="happy" />
            <Person {...pL} outfit={LILY} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={950} />
      <Title text={"\"Are we\nthere yet?\"\nAt mile one."} t={t} t0={0} top={130} size={140} />
      <Chip text="Her first fall hike" t={t} t0={2.03} x={80} y={590} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: one mile in, she sits on a log (3.0 - 7.15) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const pL: HikerProps = { x: 640, y: groundY + 100, scale: KID, walk: 0, lean: 0.2, poles: false, handOverride: [40, 10], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={SHADE}
        camX={lt * 6}
        zoom={mix(1.04, 1.1, lt / 4.15)}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={300} />
            <Trail y={groundY} grass="#76713f" dirt="#b9a27e" />
            <Person x={300} y={groundY + 30} scale={1.5} walk={0} lean={0.04} poles={false} handOverride={[30, 34]} outfit={TOM} expression="neutral" breathe={Math.sin(t * 2.2) * 2} />
            <Person {...pL} outfit={LILY} expression={t > 4.1 ? "tired" : "neutral"} flip />
            <Log x={640} y={groundY + 110} h={170} />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim h={900} />
      <Readout label="DISTANCE" value="1 MILE" ok={null} t={t} t0={3.12} x={80} y={220} />
      <Chip text="Sat down on a log" t={t} t0={4.11} x={80} y={440} icon="x" />
      <Chip text="“Are we there yet?”" t={t} t0={5.66} x={80} y={540} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3a FIX: a mission, a scavenger hunt (7.1 - 15.85) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1800;
  const handed = t > 10.6;
  const pL: HikerProps = { x: 640, y: groundY + 40, scale: KID, walk: 0, lean: 0.04, poles: false, handOverride: handed ? [44, -40] : [30, 34], breathe: Math.sin(t * 2.6) * 1.5 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={GOLDEN}
        camX={lt * 5}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={520} />
            <Trail y={groundY} grass="#6f6a3c" dirt="#b08c62" />
            <Person x={360} y={groundY + 30} scale={1.5} walk={0} lean={0.06} poles={false} handOverride={handed ? [30, 34] : [70, -10]} outfit={TOM} expression="happy" breathe={Math.sin(t * 2.4) * 2} />
            <Person {...pL} outfit={LILY} expression={handed ? "happy" : "neutral"} flip />
            {handed && <Paper p={{ ...pL }} />}
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Here's\nthe fix."} t={t} t0={7.25} t1={8.05} top={200} size={160} />
      <Chip text="A mission" t={t} t0={8.09} t1={10.4} x={80} y={220} icon="check" big />
      <Chip text="Not a distance" t={t} t0={9.1} t1={10.4} x={80} y={340} icon="x" big />
      <HuntCard t={t} t0={10.42} k={[12.38, 13.14, 14.13, 14.83]} />
    </AbsoluteFill>
  );
};

// ============ S3b FIX: she leads to the next blaze, stop at junctions (15.8 - 19.65) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const stop = t > 17.9;
  const lx = stop ? 300 + (17.9 - off) * 60 : 300 + lt * 60;
  const ph = lt * 5;
  const pL: HikerProps = stop
    ? { x: lx, y: groundY + 40, scale: KID, walk: 0, lean: 0.04, poles: false, handOverride: [44, -40], breathe: Math.sin(t * 2.6) * 1.5 }
    : { x: lx, y: groundY + 40, scale: KID, phase: ph, walk: 0.85, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.85) };
  const tx = 80 + Math.min(lt, 2.1) * 55;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={AUTUMN}
        camX={lt * 8}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={760} />
            <Trail y={groundY} />
            <BlazeTree x={920} y={groundY + 10} glow={at(t, [16.9, 17.2], [0, 1]) * (0.6 + 0.4 * Math.sin(t * 6))} />
            <Signpost x={620} y={groundY + 30} />
            <Person x={tx} y={groundY + 30} scale={1.5} phase={lt * 3.4} walk={lt < 2.1 ? 0.6 : 0} lean={0.06} poles={false} handOverride={lt < 2.1 ? freeHand(lt * 3.4, 0.6) : [30, 34]} outfit={TOM} expression="happy" />
            <Person {...pL} outfit={LILY} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Chip text="She leads to the next blaze" t={t} t0={15.87} x={80} y={220} icon="check" big />
      <Chip text="Stop at every junction" t={t} t0={17.68} x={80} y={340} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: racing ahead, asks for another hike (19.6 - 23.5) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1760;
  const atCar = t > 21.25;
  const ph = lt * 6;
  const pL: HikerProps = atCar
    ? { x: 640, y: groundY + 40, scale: KID, walk: 0, lean: 0.02, poles: false, handOverride: [40, -70], breathe: Math.sin(t * 3) * 1.5 }
    : { x: 560 + lt * 200, y: groundY + 40, scale: KID, phase: ph, walk: 1, lean: 0.16, poles: false, handOverride: freeHand(ph, 1) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l5"
        pal={GOLDEN}
        camX={lt * 18}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <FallWoods y={groundY - 30} shift={atCar ? 980 : lt * 60 + 900} />
            <Trail y={groundY} grass="#6f6a3c" dirt="#b08c62" />
            {atCar && <Car x={880} y={groundY + 50} s={1.5} body="#4E6B8A" shade="#3a536c" flip />}
            {atCar ? (
              <Person x={380} y={groundY + 30} scale={1.5} walk={0} lean={0.04} poles={false} handOverride={[30, 34]} outfit={TOM} expression="happy" breathe={Math.sin(t * 2.2) * 2} />
            ) : (
              <Person x={160 + lt * 70} y={groundY + 30} scale={1.5} phase={lt * 3.8} walk={0.75} lean={0.08} poles={false} handOverride={freeHand(lt * 3.8, 0.75)} outfit={TOM} expression="happy" />
            )}
            <Person {...pL} outfit={LILY} expression="happy" flip={atCar} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={800} />
      <Title text={"Racing\nahead."} t={t} t0={off + 0.1} t1={21.3} top={190} size={150} />
      <Title text={"\"Another\nhike?\""} t={t} t0={21.35} top={190} size={150} />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/kids-trail-explorer-pack-scavenger-hunts-junior-hiker-journal-card.jpg"
      spec="24 PRINTABLE PAGES · AGES 4 TO 10"
      name={
        <>
          Kids Trail
          <br />
          Explorer Pack
        </>
      }
      nameSize={96}
      price="$4.99"
      save="Save this for your next family hike"
    />
  );
};

export const V47: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={3.05} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={3.0} to={7.15}>
        <S2 off={3.0} />
      </Scene>
      <Scene from={7.1} to={15.85}>
        <S3a off={7.1} />
      </Scene>
      <Scene from={15.8} to={19.65}>
        <S3b off={15.8} />
      </Scene>
      <Scene from={19.6} to={23.5} fadeIn={0.12}>
        <S4 off={19.6} />
      </Scene>
      <Scene from={23.45} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions
        words={words}
        windows={[
          [0.3, 3.0, 960],
          [3.0, 7.1, 960],
          [7.1, 15.8, 960],
          [15.8, 19.6, 960],
          [19.6, 23.45, 900],
        ]}
      />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
