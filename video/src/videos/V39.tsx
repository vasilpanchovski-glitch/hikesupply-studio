import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, JAKE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v39.json";

const words = vo.words as unknown as Word[];

const SMOKY: Palette = {
  sky: ["#7f9fbc", "#c9cfd2", "#e9e0cf"],
  sun: { x: 820, y: 600, r: 56, color: "#fff6e0", glow: "#ffe2a8" },
  layers: ["#a7b2bd", "#8f9cab", "#7a8697", "#7a6a50", "#6a5a3a"],
  mist: "#eef0f0",
};
const MORNING: Palette = {
  sky: ["#5d86b0", "#d9c4a8", "#f6dcb0"],
  sun: { x: 300, y: 900, r: 70, color: "#fff2d0", glow: "#ffcf8a" },
  layers: ["#b4a6a8", "#968c98", "#7a7486", "#6c5a48", "#5a4a34"],
  mist: "#f6dcc0",
};

const SAM: Outfit = {
  ...JAKE,
  skin: "#8D5A3C",
  skinShade: "#734631",
  hair: "#1d1410",
  beard: "#1d1410",
  cap: "#3E4F5C",
  capShade: "#2C3943",
  jacket: "#C8963E",
  jacketShade: "#A37828",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};
const CARS = [
  ["#5F7F99", "#4A6478"],
  ["#C9C3B6", "#A9A396"],
  ["#7A4E3A", "#5E3B2C"],
  ["#3E4F5C", "#2C3943"],
  ["#A23B32", "#7E2D26"],
];
const SAM_CAR = ["#3E6B55", "#2D5141"];
const FALL_TREES = [
  ["#D9822B", "#B8641E"],
  ["#C2452D", "#9C3522"],
  ["#E3B23C", "#C4952A"],
];

const TreeRow: React.FC<{ y: number; shift: number; h?: number }> = ({ y, shift, h = 460 }) => (
  <g>
    {Array.from({ length: 9 }, (_, i) => {
      const x = (((-120 + i * 190 - shift) % 1710) + 1710) % 1710 - 300;
      const [c, c2] = FALL_TREES[i % 3];
      return i % 3 === 1 ? <Pine key={i} x={x} y={y} h={h + 60} c="#2f5a43" c2="#254a37" /> : <LeafTree key={i} x={x} y={y} h={h + (i % 2) * 60} c={c} c2={c2} />;
    })}
  </g>
);

// Parking tag on the front passenger-side dashboard (car-local units, car faces right).
const DashTag: React.FC<{ x: number; y: number; s: number; on: number; glow?: number }> = ({ x, y, s, on, glow = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={on}>
    {glow > 0 && <circle cx={58} cy={-90} r={30} fill="#fff6c8" opacity={0.6 * glow} />}
    <rect x={44} y={-97} width={28} height={14} rx={2} fill="#f2f2ec" stroke="#2D5141" strokeWidth={1.4} />
    <rect x={47} y={-94} width={11} height={8} fill="#3E8E5A" />
  </g>
);

// ============ S1 HOOK: driving into the Smokies, no gate, no fee (0 - 5.2) ============
const S1: React.FC = () => {
  const t = useT();
  const roadY = 1640;
  const S = 2.7;
  const cx = 440 + Math.sin(t * 0.8) * 3;
  const s = 1.3;
  const px = cx + 40 * S - 18 * s;
  const py = roadY - 97 * S - 6 + 340 * s;
  const win = `M${cx + 6 * S},${roadY - 112 * S} L${cx + 48 * S},${roadY - 112 * S} Q${cx + 54 * S},${roadY - 112 * S} ${cx + 58 * S},${roadY - 106 * S} L${cx + 76 * S},${roadY - 82 * S} L${cx + 6 * S},${roadY - 82 * S} Z`;
  return (
    <AbsoluteFill>
      <Landscape
        uid="m1"
        pal={SMOKY}
        camX={t * 6}
        zoom={mix(1.03, 1.08, t / 5.2)}
        foreground={
          <g>
            <TreeRow y={roadY - 150} shift={t * 160} />
            <rect x={-300} y={roadY - 160} width={1700} height={700} fill="#6f7d42" />
            <rect x={-300} y={roadY - 60} width={1700} height={150} fill="#4a4c4e" />
            {Array.from({ length: 10 }, (_, i) => (
              <rect key={i} x={(((-100 + i * 200 - t * 500) % 2000) + 2000) % 2000 - 300} y={roadY + 12} width={100} height={8} fill="#e9d98a" />
            ))}
            <Car x={cx} y={roadY} s={S} body={SAM_CAR[0]} shade={SAM_CAR[1]} />
            <defs>
              <clipPath id="samwin1">
                <path d={win} />
              </clipPath>
            </defs>
            <g clipPath="url(#samwin1)">
              <Person x={px} y={py} scale={s} walk={0} lean={0.04} poles={false} handOverride={[14, 30]} outfit={SAM} expression="happy" />
            </g>
            <path d={win} fill="rgba(255,255,255,0.12)" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"The Smokies\nare free.\nParking\nisn't."} t={t} t0={0} top={140} size={130} />
      <Chip text="Fall colors" t={t} t0={2.42} x={80} y={690} icon="none" />
      <Chip text="No entrance gate, no fee" t={t} t0={3.59} x={80} y={790} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: trailhead lot, every other car has a tag (5.15 - 10.4) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1560;
  const tags = at(t, [8.85, 9.2], [0, 1]);
  const glow = 0.5 + 0.5 * Math.sin(t * 8);
  const cars = [0, 1, 3, 4];
  const walkIn = at(t, [5.6, 7.2], [0, 1]);
  const ph = lt * 4;
  const walking = t > 5.6 && t < 7.2;
  return (
    <AbsoluteFill>
      <Landscape
        uid="m2"
        pal={SMOKY}
        camX={60 + lt * 10}
        zoom={mix(1.0, 1.05, lt / 5.25)}
        foreground={
          <g>
            <TreeRow y={groundY - 170} shift={60} h={420} />
            <rect x={-300} y={groundY - 180} width={1700} height={900} fill="#6f7d42" />
            <rect x={-300} y={groundY - 90} width={1700} height={420} fill="#55575a" />
            {Array.from({ length: 7 }, (_, i) => (
              <rect key={i} x={-130 + i * 240} y={groundY - 90} width={8} height={170} fill="#e9e5d6" opacity={0.7} />
            ))}
            {cars.map((c, i) => (
              <g key={c}>
                <Car x={40 + i * 300} y={groundY + 60} s={1.1} body={CARS[c][0]} shade={CARS[c][1]} />
                <DashTag x={40 + i * 300} y={groundY + 60} s={1.1} on={tags} glow={glow * tags} />
              </g>
            ))}
            <Person
              x={mix(1150, 860, walkIn)}
              y={groundY + 330}
              scale={1.2}
              phase={ph}
              walk={walking ? 0.8 : 0}
              lean={0.06}
              poles={false}
              handOverride={walking ? freeHand(ph, 0.8) : [18, 36]}
              outfit={SAM}
              expression={t > 9.0 ? "tired" : "neutral"}
              flip
            />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim />
      <Chip text="Trailhead lot" t={t} t0={6.14} t1={8.85} x={80} y={220} icon="none" />
      <Chip text="Every other car..." t={t} t0={7.68} t1={8.85} x={80} y={320} icon="none" />
      <Readout label="EVERY OTHER CAR" value="TAG ON THE DASH" ok={null} t={t} t0={8.95} x={80} y={200} pulseAt={8.95} />
    </AbsoluteFill>
  );
};

// ============ S3 THE RULE: over 15 minutes needs a tag (10.35 - 14.8) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  const S = 2.6;
  const cx = 420;
  return (
    <AbsoluteFill>
      <Landscape
        uid="m3"
        pal={SMOKY}
        camX={lt * 8}
        zoom={mix(1.08, 1.02, lt / 4.45)}
        foreground={
          <g>
            <TreeRow y={groundY - 170} shift={400} h={440} />
            <rect x={-300} y={groundY - 180} width={1700} height={900} fill="#55575a" />
            <rect x={-300} y={groundY - 186} width={1700} height={10} fill="#6f7d42" />
            <Car x={cx} y={groundY} s={S} body={SAM_CAR[0]} shade={SAM_CAR[1]} />
            {/* empty dash spot */}
            <g transform={`translate(${cx},${groundY}) scale(${S})`}>
              <rect x={44} y={-97} width={28} height={14} rx={2} fill="none" stroke="#D9443A" strokeWidth={2} strokeDasharray="3 2" opacity={at(t, [11.35, 11.6], [0, 1])} />
            </g>
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"In this park:"} t={t} t0={10.45} top={200} size={130} />
      <Readout label="ANY CAR PARKED OVER" value="15 MIN" ok={null} t={t} t0={11.16} x={80} y={360} />
      <Chip text="Needs a parking tag" t={t} t0={13.41} x={80} y={600} icon="x" big />
    </AbsoluteFill>
  );
};

const Tag: React.FC<{ label: string; t: number; t0: number; col: string }> = ({ label, t, t0, col }) => (
  <div
    style={{
      width: 230,
      height: 300,
      borderRadius: 18,
      background: "#f5f1ea",
      border: `6px solid ${col}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingBottom: 26,
      position: "relative",
      opacity: at(t, [t0, t0 + 0.25], [0, 1]),
      translate: `0px ${at(t, [t0, t0 + 0.4], [40, 0], outExpo)}px`,
      boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
    }}
  >
    <div style={{ position: "absolute", top: 26, width: 54, height: 54, borderRadius: 27, border: `6px solid ${col}` }} />
    <div style={{ position: "absolute", top: 110, left: 24, right: 24, height: 70, borderRadius: 10, background: col }} />
    <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 52, letterSpacing: 2, color: col }}>{label}</div>
  </div>
);

// ============ S4 FIX: buy a tag before you go (14.75 - 22.2) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1840;
  return (
    <AbsoluteFill>
      <Landscape
        uid="m4"
        pal={SMOKY}
        camX={lt * 6}
        foreground={
          <g>
            <TreeRow y={groundY - 150} shift={800 + lt * 4} h={440} />
            <rect x={-300} y={groundY - 160} width={1700} height={700} fill="#6f7d42" />
            <Person x={760} y={groundY} scale={1.5} walk={0} lean={0.05} poles={false} handOverride={[30, 34]} outfit={SAM} expression="happy" breathe={Math.sin(t * 2.4) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={600} />
      <Title text={"Buy it before\nyou go."} t={t} t0={15.0} t1={16.1} top={200} size={150} />
      {!isClean() && (
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            top: 340,
            height: 420,
            borderRadius: 30,
            background: "#fff",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            display: "flex",
            gap: 25,
            alignItems: "center",
            justifyContent: "center",
            opacity: at(t, [15.95, 16.2], [0, 1]),
            scale: `${at(t, [15.95, 16.4], [0.92, 1], outExpo)}`,
          }}
        >
          <Tag label="DAILY" t={t} t0={16.21} col="#3E8E5A" />
          <Tag label="WEEKLY" t={t} t0={16.88} col="#2F62B0" />
          <Tag label="ANNUAL" t={t} t0={17.5} col="#7A4E3A" />
        </div>
      )}
      <Chip text="Before you go" t={t} t0={18.12} x={80} y={200} icon="check" big />
      <Readout label="MOST TRAILHEADS" value="NO TAG MACHINE" ok={false} t={t} t0={19.84} x={80} y={800} pulseAt={21.08} />
    </AbsoluteFill>
  );
};

// ============ S5 PAYOFF: next morning, tag on the dash (22.15 - 25.05) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1640;
  const S = 2.6;
  const cx = 400;
  const ph = lt * 4.4;
  const walk = lt > 1.3 ? 1 : 0;
  return (
    <AbsoluteFill>
      <Landscape
        uid="m5"
        pal={MORNING}
        camX={lt * 20}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <TreeRow y={groundY - 170} shift={lt * 20} h={440} />
            <rect x={-300} y={groundY - 180} width={1700} height={900} fill="#55575a" />
            <rect x={-300} y={groundY - 186} width={1700} height={10} fill="#6f7d42" />
            <Car x={cx} y={groundY} s={S} body={SAM_CAR[0]} shade={SAM_CAR[1]} />
            <DashTag x={cx} y={groundY} s={S} on={1} glow={at(t, [23.4, 23.7], [0, 1]) * (0.6 + 0.4 * Math.sin(t * 6))} />
            <Person x={820 + (walk ? (lt - 1.3) * 160 : 0)} y={groundY + 140} scale={1.35} phase={ph} walk={walk} lean={0.1} poles={false} handOverride={walk ? freeHand(ph, 1) : [18, 36]} outfit={SAM} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Tag on\nthe dash."} t={t} t0={off + 0.1} top={200} size={160} />
      <Chip text="Ready to hike" t={t} t0={23.51} x={80} y={560} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S6 END CARD ============
const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/great-smoky-mountains-trip-planning-guide-card.jpg"
      photoH={760}
      spec="DIGITAL DOWNLOAD · DESTINATION GUIDE"
      name={
        <>
          Great Smoky
          <br />
          Mountains
          <br />
          Trip Planning
          <br />
          Guide
        </>
      }
      nameSize={76}
      price="$9.99"
      save="Save this before your Smokies trip"
    />
  );
};

export const V39: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={5.2} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={5.15} to={10.4}>
        <S2 off={5.15} />
      </Scene>
      <Scene from={10.35} to={14.8}>
        <S3 off={10.35} />
      </Scene>
      <Scene from={14.75} to={22.2}>
        <S4 off={14.75} />
      </Scene>
      <Scene from={22.15} to={25.05} fadeIn={0.12}>
        <S5 off={22.15} />
      </Scene>
      <Scene from={24.95} to={30} fadeOut={0}>
        <S6 />
      </Scene>
      <Captions words={words} windows={[[0.3, 5.15, 920], [5.15, 10.35, 760], [10.35, 14.75, 780], [14.75, 22.15, 1060], [22.15, 24.95, 860]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
