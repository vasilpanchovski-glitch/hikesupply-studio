import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v51.json";

const words = vo.words as unknown as Word[];

const PARK: Palette = {
  sky: ["#3f78b4", "#b6d3ea", "#f6ecd6"],
  sun: { x: 820, y: 660, r: 58, color: "#fffbe8", glow: "#ffeab0" },
  layers: ["#c9c3b2", "#b9a084", "#a8805e", "#8f6849", "#755239"],
  mist: "#f4e9d6",
};
const DULL: Palette = {
  sky: ["#71879a", "#bcc5ca", "#e6e2d8"],
  sun: { x: 250, y: 720, r: 42, color: "#f6f4ec", glow: "#e6e4dc" },
  layers: ["#bdbab0", "#a69d8c", "#8f8370", "#786c5a", "#615748"],
  mist: "#e8e4da",
};
const SPRING: Palette = {
  sky: ["#3a76b8", "#b0d2ec", "#f4f0dc"],
  sun: { x: 300, y: 760, r: 60, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#c4cdc8", "#a9b9a6", "#8ea488", "#76906f", "#5f7a5a"],
  mist: "#eef3e6",
};

const MIA: Outfit = {
  ...GUIDE,
  skin: "#E0AD8E",
  skinShade: "#C28E70",
  hair: "#6b3f22",
  ponytail: "#6b3f22",
  beard: null,
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#2F7F86",
  jacketShade: "#256870",
  pants: "#5B5546",
  pantsShade: "#45402F",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};

const Trail: React.FC<{ y: number; ground?: string; dirt?: string }> = ({ y, ground = "#b98f62", dirt = "#d9b88c" }) => (
  <g>
    <rect x={-300} y={y - 40} width={1700} height={700} fill={ground} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={dirt} />
    {Array.from({ length: 12 }, (_, i) => (
      <ellipse key={i} cx={(i * 149) % 1100} cy={y + 150 + ((i * 59) % 180)} rx={16} ry={7} fill="#a07a52" opacity={0.7} />
    ))}
  </g>
);
// Red rock buttes in the middle distance.
const Buttes: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <g>
    {[0, 1, 2].map((i) => {
      const x = ((((-200 + i * 560 - shift) % 1680) + 1680) % 1680) - 300;
      const w = 300 + (i % 2) * 120;
      const h = 360 + (i % 3) * 80;
      return (
        <g key={i}>
          <path d={`M${x},${y} L${x + 40},${y - h} L${x + w - 40},${y - h} L${x + w},${y} Z`} fill="#b65e3a" />
          <path d={`M${x + w * 0.55},${y - h} L${x + w - 40},${y - h} L${x + w},${y} L${x + w * 0.6},${y} Z`} fill="#94472a" />
          <rect x={x + 40} y={y - h} width={w - 80} height={14} fill="#c97a52" />
        </g>
      );
    })}
  </g>
);

// Grid of 63 parks; `filled` dots are seen, `ring` circles the next one.
const ParkGrid: React.FC<{ t: number; t0: number; t1: number; filled: number; ringAt?: number; title: string; top?: number }> = ({ t, t0, t1, filled, ringAt, title, top = 330 }) => {
  if (isClean()) return null;
  const o = at(t, [t0, t0 + 0.25], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]);
  const cols = 9;
  const ringIdx = 22;
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top,
        height: 560,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        opacity: o,
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <div style={{ position: "absolute", top: 28, left: 0, right: 0, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 36, letterSpacing: 4, color: "#6b6b66" }}>{title}</div>
      <svg width={920} height={560} viewBox="0 0 920 560" style={{ position: "absolute", top: 0, left: 0 }}>
        {Array.from({ length: 63 }, (_, i) => {
          const cx = 100 + (i % cols) * 90;
          const cy = 120 + Math.floor(i / cols) * 62;
          const on = i < filled;
          return <circle key={i} cx={cx} cy={cy} r={22} fill={on ? "#3E8E5A" : "#ece8df"} />;
        })}
        {ringAt !== undefined && t >= ringAt && (
          <circle
            cx={100 + (ringIdx % cols) * 90}
            cy={120 + Math.floor(ringIdx / cols) * 62}
            r={at(t, [ringAt, ringAt + 0.35], [60, 34], outExpo)}
            fill="none"
            stroke="#D9443A"
            strokeWidth={7}
          />
        )}
      </svg>
    </div>
  );
};

// ============ S1 HOOK: loved parks, kept pushing the trip (0 - 6.45) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1740;
  const ph = t * 3.6;
  const walking = t < 3.4;
  const p: HikerProps = {
    x: walking ? 300 + t * 50 : 470,
    y: groundY + 30,
    scale: 1.55,
    phase: ph,
    walk: walking ? 0.7 : 0,
    lean: 0.08,
    poles: false,
    handOverride: walking ? freeHand(ph, 0.7) : [30, 34],
    breathe: walking ? 0 : Math.sin(t * 2.2) * 2,
  };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={PARK}
        camX={t * 10}
        zoom={mix(1.03, 1.1, t / 6.45)}
        foreground={
          <g>
            <Buttes y={groundY - 60} shift={t * 20} />
            <Trail y={groundY} />
            <Person {...p} outfit={MIA} expression={t > 4.6 ? "tired" : "happy"} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={1000} />
      <Title text={"She'd seen 4\nnational parks.\nThere are 63."} t={t} t0={0} top={130} size={136} />
      <Chip text="Trip pushed back" t={t} t0={3.7} x={80} y={600} icon="x" />
      <Chip text="Every year" t={t} t0={4.4} x={80} y={700} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: 4 in ten years, there are 63 (6.4 - 8.25) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={DULL}
        camX={lt * 6}
        zoom={mix(1.06, 1.1, lt / 1.85)}
        dim={0.05}
        foreground={
          <g>
            <Buttes y={groundY - 60} shift={300} />
            <Trail y={groundY} />
            <Person x={560} y={groundY + 30} scale={1.55} walk={0} lean={0.06} poles={false} handOverride={[30, 34]} outfit={MIA} expression="tired" breathe={Math.sin(t * 2.2) * 2} />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim />
      <Readout label="PARKS IN 10 YEARS" value="4 OF 63" ok={false} t={t} t0={6.1} x={80} y={220} pulseAt={7.16} />
    </AbsoluteFill>
  );
};

// ============ S3a FIX: every park on one page, circle the next one (8.2 - 13.65) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={PARK}
        camX={lt * 6}
        foreground={
          <g>
            <Buttes y={groundY - 60} shift={600} />
            <Trail y={groundY} />
            <Person x={560} y={groundY + 30} scale={1.55} walk={0} lean={0.04} poles={false} handOverride={[56, -60]} outfit={MIA} expression="happy" breathe={Math.sin(t * 2.4) * 2} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Here's\nthe fix."} t={t} t0={8.35} t1={9.2} top={200} size={160} />
      <Chip text="Every park, one page" t={t} t0={9.22} x={80} y={220} icon="check" big />
      <ParkGrid t={t} t0={9.42} t1={13.65} filled={4} ringAt={11.21} title="ALL 63 US NATIONAL PARKS" />
      <Chip text="Circle the next one now" t={t} t0={11.21} x={80} y={910} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S3b FIX: one easy day hike, check nps.gov (13.6 - 21.9) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1780;
  const ph = lt * 3.6;
  const p: HikerProps = { x: 300 + lt * 40, y: groundY + 30, scale: 1.5, phase: ph, walk: 0.7, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={PARK}
        camX={lt * 14}
        foreground={
          <g>
            <Buttes y={groundY - 60} shift={lt * 30 + 900} />
            <Trail y={groundY} />
            <Person {...p} outfit={MIA} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Chip text="One easy day hike" t={t} t0={14.38} x={80} y={220} icon="check" big />
      <Readout label="BEFORE YOU GO, CHECK" value="NPS.GOV" ok={null} t={t} t0={16.9} x={80} y={360} />
      <Chip text="Timed entry?" t={t} t0={19.04} x={80} y={590} icon="check" />
      <Chip text="Reservations?" t={t} t0={20.3} x={80} y={690} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: booked by spring (21.85 - 24.5) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l5"
        pal={SPRING}
        camX={lt * 20}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <Pine x={-40} y={groundY - 40} h={420} c="#3b6550" c2="#2b4d3c" />
            <Pine x={1060} y={groundY - 50} h={460} c="#3b6550" c2="#2b4d3c" />
            <Trail y={groundY} ground="#8fa05e" dirt="#cdb489" />
            <Person x={540} y={groundY + 40} scale={1.65} walk={0} lean={0.04} poles={false} handOverride={[36, -40]} outfit={MIA} expression="happy" breathe={Math.sin(t * 2.4) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={800} />
      <Title text={"Booked by\nspring."} t={t} t0={off + 0.1} top={190} size={150} />
      <Chip text="Park number 5: planned" t={t} t0={22.55} x={80} y={540} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/national-parks-tracker-card.jpg"
      spec="26 PRINTABLE PAGES · 63 PARKS + CANADA"
      name={
        <>
          National Parks
          <br />
          Hiking Tracker
        </>
      }
      nameSize={88}
      price="$4.99"
      save="Save this while you plan next year"
    />
  );
};

export const V51: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={6.45} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={6.4} to={8.25}>
        <S2 off={6.4} />
      </Scene>
      <Scene from={8.2} to={13.65}>
        <S3a off={8.2} />
      </Scene>
      <Scene from={13.6} to={21.9}>
        <S3b off={13.6} />
      </Scene>
      <Scene from={21.85} to={24.5} fadeIn={0.12}>
        <S4 off={21.85} />
      </Scene>
      <Scene from={24.45} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions
        words={words}
        windows={[
          [0.3, 6.4, 960],
          [6.4, 8.2, 960],
          [8.2, 13.6, 1060],
          [13.6, 21.85, 960],
          [21.85, 24.45, 900],
        ]}
      />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
