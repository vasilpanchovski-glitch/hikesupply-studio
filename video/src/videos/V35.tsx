import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, JAKE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, HEAD, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v35.json";

const words = vo.words as unknown as Word[];

const CANYON: Palette = {
  sky: ["#6f9cc6", "#bcd3e0", "#f1e6d4"],
  sun: { x: 820, y: 460, r: 56, color: "#fff8e6", glow: "#ffe6b0" },
  layers: ["#d8b9a4", "#cf9a78", "#b9714c", "#9a5636", "#7d4329"],
  mist: "#f4e2cf",
};
const EARLY: Palette = {
  sky: ["#4f6f96", "#e9b48e", "#ffe0b4"],
  sun: { x: 760, y: 900, r: 74, color: "#fff2d0", glow: "#ffc88a" },
  layers: ["#d2a493", "#bf8270", "#a2614c", "#80473a", "#63362d"],
  mist: "#ffd9b6",
};

const DAN: Outfit = {
  ...JAKE,
  hair: "#2e231c",
  beard: "#2e231c",
  skin: "#D9A07E",
  skinShade: "#BB8262",
  cap: "#B85C38",
  capShade: "#944a2c",
  jacket: "#4E6E8E",
  jacketShade: "#3A5670",
  pants: "#7d7563",
  pantsShade: "#625b4b",
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
const DAN_CAR = ["#3E8E5A", "#2f6e45"];

const Sand: React.FC<{ y: number; road?: boolean }> = ({ y, road = true }) => (
  <g>
    <rect x={-300} y={y - 170} width={1700} height={800} fill="#c48a5a" />
    {Array.from({ length: 9 }, (_, i) => (
      <ellipse key={i} cx={-80 + i * 160} cy={y - 150 + (i % 3) * 10} rx={70} ry={30} fill="#6f7a45" opacity={0.85} />
    ))}
    {road && <rect x={-300} y={y - 80} width={1700} height={250} fill="#5a5552" />}
  </g>
);

// Side-view shuttle bus facing right. y = ground.
const Bus: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={2} rx={250} ry={12} fill="rgba(0,0,0,0.22)" />
    <rect x={-250} y={-190} width={500} height={160} rx={22} fill="#eef0ea" />
    <rect x={-250} y={-60} width={500} height={30} fill="#3E6B55" />
    {Array.from({ length: 6 }, (_, i) => (
      <rect key={i} x={-225 + i * 72} y={-168} width={58} height={56} rx={8} fill="#a9c6d4" />
    ))}
    <rect x={210} y={-168} width={30} height={100} rx={6} fill="#a9c6d4" />
    <text x={-30} y={-80} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={34} fill="#3E6B55" letterSpacing={2}>
      SHUTTLE
    </text>
    {[-160, 160].map((wx) => (
      <g key={wx}>
        <circle cx={wx} cy={-24} r={28} fill="#1f2222" />
        <circle cx={wx} cy={-24} r={12} fill="#9aa3a6" />
      </g>
    ))}
  </g>
);

const Sign: React.FC<{ x: number; y: number; big: string; small: string; bg?: string; h?: number }> = ({ x, y, big, small, bg = "#7B3A2F", h = 460 }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-9} y={-h} width={18} height={h} fill="#5d4a36" />
    <rect x={-160} y={-h - 140} width={320} height={170} rx={12} fill={bg} stroke="#f3e6cf" strokeWidth={6} />
    <text x={0} y={-h - 66} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={58} fill="#f3e6cf">
      {big}
    </text>
    <text x={0} y={-h - 8} textAnchor="middle" fontFamily={HEAD} fontWeight={600} fontSize={34} fill="#f3e6cf">
      {small}
    </text>
  </g>
);

const Town: React.FC<{ y: number }> = ({ y }) => (
  <g>
    {[
      [-60, 260, "#d9c3a5"],
      [230, 200, "#b9805c"],
      [480, 280, "#e3d2b8"],
      [760, 220, "#c99a6e"],
      [1000, 250, "#d9c3a5"],
    ].map(([bx, bh, col], i) => (
      <g key={i}>
        <rect x={bx as number} y={y - 180 - (bh as number)} width={220} height={bh as number} fill={col as string} />
        <rect x={(bx as number) - 10} y={y - 190 - (bh as number)} width={240} height={18} fill="#7d4a33" />
        {[0, 1].map((k) => (
          <rect key={k} x={(bx as number) + 30 + k * 100} y={y - 140 - (bh as number) + 20} width={60} height={70} rx={6} fill="#8fb1c2" />
        ))}
      </g>
    ))}
  </g>
);

// ============ S1 HOOK: Dan rolls into Zion at 10 (0 - 2.7) ============
const S1: React.FC = () => {
  const t = useT();
  const roadY = 1640;
  const S = 2.7;
  const cx = 430 + Math.sin(t * 0.8) * 3;
  const s = 1.3;
  const px = cx + 40 * S - 18 * s;
  const py = roadY - 97 * S - 6 + 340 * s;
  const win = `M${cx + 6 * S},${roadY - 112 * S} L${cx + 48 * S},${roadY - 112 * S} Q${cx + 54 * S},${roadY - 112 * S} ${cx + 58 * S},${roadY - 106 * S} L${cx + 76 * S},${roadY - 82 * S} L${cx + 6 * S},${roadY - 82 * S} Z`;
  return (
    <AbsoluteFill>
      <Landscape
        uid="z1"
        pal={CANYON}
        camX={t * 14}
        zoom={mix(1.03, 1.08, t / 2.7)}
        foreground={
          <g>
            <Sand y={roadY} />
            {Array.from({ length: 8 }, (_, i) => (
              <rect key={i} x={-100 + i * 200 - ((t * 120) % 200)} y={roadY + 12} width={100} height={8} fill="#e9d98a" />
            ))}
            <Car x={cx} y={roadY} s={S} body={DAN_CAR[0]} shade={DAN_CAR[1]} />
            <defs>
              <clipPath id="danwin">
                <path d={win} />
              </clipPath>
            </defs>
            <g clipPath="url(#danwin)">
              <Person x={px} y={py} scale={s} walk={0} lean={0.04} poles={false} handOverride={[14, 30]} outfit={DAN} expression="happy" />
            </g>
            <path d={win} fill="rgba(255,255,255,0.12)" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Don't roll\ninto Zion\nat 10 AM"} t={t} t0={0} top={150} size={140} />
      <Readout label="ARRIVED AT ZION" value="10 AM" ok={false} t={t} t0={1.5} x={80} y={600} pulseAt={1.5} />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: lot full, road closed to cars, shuttle (2.65 - 10.45) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  const busX = at(t, [7.1, 9.6], [1500, 560], outExpo);
  return (
    <AbsoluteFill>
      <Landscape
        uid="z2"
        pal={CANYON}
        camX={60 + lt * 8}
        zoom={mix(1.0, 1.05, lt / 7.8)}
        foreground={
          <g>
            <Sand y={groundY} road={false} />
            <rect x={-300} y={groundY - 90} width={1700} height={260} fill="#55575a" />
            {t < 7.2 ? (
              <g>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Car key={i} x={-60 + i * 300} y={groundY - 60} s={1.15} body={CARS[i][0]} shade={CARS[i][1]} />
                ))}
                <Sign x={860} y={groundY + 60} big={t < 5.9 ? "LOT FULL" : "NO CARS"} small={t < 5.9 ? "VISITOR CENTER" : "SHUTTLE ONLY"} />
              </g>
            ) : (
              <g>
                <Sign x={160} y={groundY - 60} big="SHUTTLE" small="TO TRAILHEADS" bg="#3E6B55" h={420} />
                <Bus x={busX} y={groundY + 70} s={1.25} />
              </g>
            )}
            <Person x={t < 7.2 ? 330 : 860} y={groundY + 130} scale={1.75} walk={0} lean={0.04} poles={false} handOverride={[14, 30]} outfit={DAN} expression={t < 7.2 ? "tired" : "neutral"} breathe={Math.sin(t * 2) * 2} flip={t >= 7.2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Chip text="Visitor center lot full" t={t} t0={3.86} t1={7.1} x={80} y={560} icon="x" />
      <Chip text="Canyon road closed to cars" t={t} t0={5.96} t1={7.1} x={80} y={660} icon="x" />
      <Chip text="Shuttle runs to the trailheads" t={t} t0={7.54} x={80} y={560} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: arrive early, or park in Springdale (10.4 - 23.0) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  const town = t >= 14.85;
  const busX = town ? at(t, [17.3, 19.0], [1500, 700], outExpo) : 640;
  return (
    <AbsoluteFill>
      <Landscape
        uid={town ? "z3b" : "z3"}
        pal={town ? CANYON : EARLY}
        camX={140 + lt * 6}
        foreground={
          <g>
            <Sand y={groundY} road={false} />
            {town && <Town y={groundY + 40} />}
            <rect x={-300} y={groundY - 70} width={1700} height={240} fill="#55575a" />
            {!town && <Car x={-40} y={groundY - 40} s={1.15} body={DAN_CAR[0]} shade={DAN_CAR[1]} />}
            {!town && <Sign x={850} y={groundY - 40} big="SHUTTLE" small="FIRST BUSES" bg="#3E6B55" h={400} />}
            {town && <Sign x={850} y={groundY - 40} big="SPRINGDALE" small="TOWN SHUTTLE" bg="#3E6B55" h={400} />}
            <Bus x={busX} y={groundY + 60} s={1.1} />
            <Person x={town ? 260 : 300} y={groundY + 100} scale={1.7} walk={0} lean={0.04} poles={false} handOverride={[14, 30]} outfit={DAN} expression="happy" breathe={Math.sin(t * 2) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Title text={"Here's\nthe fix."} t={t} t0={10.55} t1={11.7} top={200} size={160} />
      <Readout label="ARRIVE BEFORE" value="8 AM" ok={true} t={t} t0={11.72} t1={14.85} x={80} y={300} pulseAt={11.72} />
      <Chip text="Park + catch an early shuttle" t={t} t0={12.84} t1={14.85} x={80} y={530} icon="check" />
      <Chip text="Lot full? Park in Springdale" t={t} t0={14.91} t1={19.8} x={80} y={300} icon="check" />
      <Chip text="Free town shuttle, when running" t={t} t0={17.38} t1={19.8} x={80} y={400} icon="check" />
      <Readout label="THIS SEASON'S SCHEDULE" value="NPS.GOV" ok={null} t={t} t0={19.85} x={80} y={300} pulseAt={19.85} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: quiet trail next morning (22.95 - 25.75) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  const ph = lt * 4.6;
  return (
    <AbsoluteFill>
      <Landscape
        uid="z4"
        pal={EARLY}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.22, 1.06], outExpo)}
        foreground={
          <g>
            <Sand y={groundY + 120} road={false} />
            <path d={`M-300,${groundY - 6} Q540,${groundY - 26} 1400,${groundY - 4} L1400,${groundY + 110} Q540,${groundY + 84} -300,${groundY + 110} Z`} fill="#d9ab7c" />
            <Person x={560} y={groundY + 40} scale={1.6} phase={ph} walk={1} lean={0.12} poles={false} handOverride={freeHand(ph, 1)} outfit={DAN} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"A quiet\ntrail."} t={t} t0={off + 0.12} top={200} size={170} />
      <Chip text="Early shuttle, easy start" t={t} t0={23.97} x={80} y={560} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/utahs-mighty-5-trip-planning-guide-card.jpg"
      photoH={760}
      spec="DIGITAL GUIDE · ZION TO ARCHES"
      name={
        <>
          Utah's Mighty 5
          <br />
          Trip Planning Guide
        </>
      }
      nameSize={78}
      price="$9.99"
      save="Save this before your Zion trip"
    />
  );
};

export const V35: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={2.7} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={2.65} to={10.45}>
        <S2 off={2.65} />
      </Scene>
      <Scene from={10.4} to={23.0}>
        <S3 off={10.4} />
      </Scene>
      <Scene from={22.95} to={25.75} fadeIn={0.12}>
        <S4 off={22.95} />
      </Scene>
      <Scene from={25.6} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions words={words} windows={[[0.3, 2.65, 900], [2.65, 10.4, 760], [11.7, 22.95, 900], [22.95, 25.6, 780]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
