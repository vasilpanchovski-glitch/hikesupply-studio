// V161: "He's said 'someday' for ten years." Short format (16.5 s, 44 words), cinematic C01 style.
// Product: Long Trail Planner — Section Hike & Thru-Hike Planning Workbook (Printable), $8.99 (live Shopify).
// Example section on the plan page: Springer Mountain to Neels Gap, Georgia (the AT's first ~31 miles), 4 days at about 8 mi/day.
// Permits only "checked" (rules differ by section; no claim about which permits are needed).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { PlanPage, Room, WindowView } from "../home";
import { Calendar, Desk, INK } from "../trip";
import vo from "../vo/v161.json";

const words = vo.words as unknown as Word[];

const EVE: Sky = { top: "#26345a", mid: "#6c6a8a", low: "#d99a78", sun: [800, 1100], sunR: 40, sunCol: "#ffd9a8", glow: "#f2a070" };
const LAMP = "255,214,160";

const MARK: Outfit = {
  ...JAKE,
  skin: "#C98E6A",
  skinShade: "#AA7150",
  hair: "#2e2620",
  beard: "#2e2620",
  cap: "#6a7a5a",
  capShade: "#556347",
  jacket: "#5a6f8a",
  jacketShade: "#45576e",
  pants: "#4a4e55",
  pantsShade: "#363a40",
  glove: null,
};

// Trail map poster on the wall: long green line from Georgia to Maine, a sticky note with "someday".
const Poster: React.FC<{ x: number; y: number; w: number; t: number }> = ({ x, y, w, t }) => {
  const h = w * 1.35;
  const pts = Array.from({ length: 14 }, (_, i) => {
    const f = i / 13;
    return [w * 0.22 + f * w * 0.56 + Math.sin(i * 1.7) * w * 0.05, h * 0.9 - f * h * 0.7];
  });
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={12} y={18} width={w} height={h} fill="rgba(0,0,0,0.25)" />
      <rect x={0} y={0} width={w} height={h} fill="#eee6d4" />
      <rect x={18} y={18} width={w - 36} height={h - 36} fill="none" stroke="#c9bda4" strokeWidth={4} />
      <text x={w / 2} y={h * 0.11} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={w * 0.075} fill={INK} letterSpacing={3}>
        APPALACHIAN TRAIL
      </text>
      <path d={`M${w * 0.1},${h * 0.95} Q${w * 0.3},${h * 0.5} ${w * 0.55},${h * 0.35} T${w * 0.92},${h * 0.12}`} stroke="#d7cbb2" strokeWidth={w * 0.18} fill="none" opacity={0.6} />
      <path d={d} stroke="#3e7d4f" strokeWidth={8} fill="none" strokeLinejoin="round" />
      <circle cx={pts[0][0]} cy={pts[0][1]} r={12} fill={INK} />
      <circle cx={pts[13][0]} cy={pts[13][1]} r={12} fill={INK} />
      <text x={pts[0][0] + 22} y={pts[0][1] + 10} fontFamily={HEAD} fontWeight={700} fontSize={w * 0.06} fill={INK}>
        GA
      </text>
      <text x={pts[13][0] - 22} y={pts[13][1] + 10} textAnchor="end" fontFamily={HEAD} fontWeight={700} fontSize={w * 0.06} fill={INK}>
        ME
      </text>
      {/* sticky note, faded with time */}
      <g transform={`translate(${w * 0.58},${h * 0.66}) rotate(${6 + Math.sin(t * 2) * 0.6})`}>
        <rect x={0} y={0} width={w * 0.34} height={w * 0.3} fill="#e9dc8e" />
        <text x={w * 0.17} y={w * 0.18} textAnchor="middle" fontFamily="Inter" fontStyle="normal" fontWeight={600} fontSize={w * 0.065} fill="#2a3a8a">
          someday
        </text>
      </g>
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Mark at home, looking at the AT poster again (0 - 3.52) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.03, 1.1, t / 3.52), rot: hh.rot };
  const floorY = 1620;
  const p: HikerProps = { x: 390, y: floorY, scale: 2.5, walk: 0, lean: -0.04, poles: false, handOverride: [30, 60], breathe: Math.sin(t * 1.8) * 1.5 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={-120} y={560} w={300} h={520} sky={EVE} uid="a" />
        <Room floorY={floorY} win={[-120, 560, 300, 520]} lamp={[900, 500]} wall="#cdbb9c" />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <Poster x={560} y={600} w={440} t={t} />
        </Svg>
        <Subject rimX={5} col="rgba(255,226,180,0.8)">
          <Person {...p} outfit={MARK} expression="neutral" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={300} />
      </Plane>
      <Particles seed={1611} n={14} col="#ffe8c0" fall={6} />
      <Grade sunX={900} sunY={500} warm={LAMP} cool="40,40,70" />
      <Title text={"He's said\n‘someday’\nfor ten years."} t={t} t0={0} top={110} size={112} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the wall calendar flips through ten years (3.52 - 5.07) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.55), rot: hh.rot };
  const yrs = at(lt, [0.1, 1.3], [0, 10]);
  const year = 2016 + Math.floor(yrs);
  const flip = yrs < 10 ? yrs % 1 : 0;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#cdbb9c" />
        </Svg>
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <Calendar x={250} y={720} w={580} month="MAY" year={String(year)} flip={flip} note="someday" k={0.5} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1612} n={14} col="#e8dcc8" fall={4} />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Readout label="STILL 'SOMEDAY'" value="10 YEARS" ok={false} t={t} t0={3.7} x={60} y={190} pulseAt={4.8} />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the plan on the desk, then the start day ringed (5.07 - 12.25) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.9], [1.1, 1.02], outExpo), rot: hh.rot };
  const swap = at(t, [10.55, 11.0], [0, 1], outExpo);
  const S = 1.08;
  const ring = at(t, [11.0, 11.6], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <Svg>
            <g transform={`translate(${120 - swap * 1000},330) scale(${S})`}>
              <PlanPage
                x={0}
                y={0}
                w={700}
                rows={[
                  ["One section", "Springer to Neels Gap"],
                  ["Dates", "May 9 to May 12"],
                  ["Honest miles per day", "About 8 mi · 13 km"],
                  ["Permits and rules", "Checked"],
                ]}
                t={t}
                t0={5.9}
                gap={1.33}
              />
            </g>
            <g opacity={swap} transform={`translate(${mix(700, 0, swap)},0)`}>
              <Calendar x={250} y={560} w={580} month="MAY" year="2027" ring={9} k={ring} note="AT · DAY 1" />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1613} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="Now someday has a date" t={t} t0={10.9} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S4: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/long-trail-planner.jpg"
      photoH={760}
      spec="PRINTABLE WORKBOOK · SECTION AND THRU-HIKE"
      name={
        <>
          Long Trail
          <br />
          Planner
        </>
      }
      nameSize={100}
      price="$8.99"
      save="Save this before you plan your year"
    />
  );
};

export const V161: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.58} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.52} to={5.15} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={3.52} />
    </Scene>
    <Scene from={5.07} to={12.35} fadeIn={0.06} fadeOut={0.12}>
      <S3 off={5.07} />
    </Scene>
    <Scene from={12.25} to={16.5} fadeOut={0}>
      <S4 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.52, 1600],
        [3.52, 5.07, 1600],
        [5.07, 12.25, 1600],
      ]}
    />
  </AbsoluteFill>
);
