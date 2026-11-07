// V112: "He gave her three national parks for Christmas." in the cinematic C01 style. Gift story for the National Parks Trio
// ($24.99, live Shopify), posted Dec 5. Contents from the live listing: three trip planning guides (Great Smoky Mountains,
// Utah's Mighty 5, Yellowstone & Grand Teton) with when to go, where to stay, 3/5/7-day itineraries built around day hikes,
// and safety rules for each park. Instant download, nothing shipped. End card = the three real Shopify product images as a fan.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { Room, SofaBack, SofaFront, WindowView } from "../home";
import { Arch, Calendar, INK, Itinerary, PAPER } from "../trip";
import vo from "../vo/v112.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#1d2a44", mid: "#3e4e6c", low: "#6f7d92", sun: [800, 560], sunR: 26, sunCol: "#f4f1e6", glow: "#a8b2c4" };
const MORNING: Sky = { top: "#4f78a8", mid: "#b9cde0", low: "#fbe6c8", sun: [820, 520], sunR: 50, sunCol: "#fffaf0", glow: "#ffe0b0" };
const LAMP = "255,200,140";
const SOFA = "#5f7f8e";
const SOFA2 = "#4b6774";

const NORA: Outfit = {
  ...JAKE,
  skin: "#F0C3A4",
  skinShade: "#D3A386",
  hair: "#8a4a2a",
  ponytail: "#8a4a2a",
  beard: null,
  cap: "#8a4a2a",
  capShade: "#6e3a20",
  jacket: "#B83A55",
  jacketShade: "#8E2B42",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  glove: null,
};
const DANIEL: Outfit = {
  ...JAKE,
  skin: "#9A6546",
  skinShade: "#7d4f36",
  hair: "#1d1410",
  beard: "#1d1410",
  cap: "#1d1410",
  capShade: "#140e0b",
  jacket: "#3F6B55",
  jacketShade: "#2D5141",
  pants: "#4a4f57",
  pantsShade: "#363a40",
  glove: null,
};

// Christmas tree with soft twinkling lights.
const XmasTree: React.FC<{ x: number; y: number; h: number; t: number }> = ({ x, y, h, t }) => (
  <g>
    <Pine x={x} y={y} h={h} c="#2f5d46" c2="#244a38" />
    {Array.from({ length: 16 }, (_, i) => {
      const row = Math.floor(i / 4);
      const yy = y - h * 0.2 - row * h * 0.19;
      const w = h * (0.34 - row * 0.07);
      const xx = x - w + ((i % 4) + 0.5) * (w / 2);
      const on = 0.55 + 0.45 * Math.sin(t * 3 + i * 1.7);
      return <circle key={i} cx={xx} cy={yy} r={h * 0.016} fill={["#ffd36b", "#ff9a6b", "#fff1c4"][i % 3]} opacity={on} />;
    })}
    <path d={`M${x},${y - h * 1.0} l${h * 0.03},${h * 0.06} l${h * 0.06},0 l-${h * 0.05},${h * 0.04} l${h * 0.02},${h * 0.06} l-${h * 0.06},-${h * 0.035} l-${h * 0.06},${h * 0.035} l${h * 0.02},-${h * 0.06} l-${h * 0.05},-${h * 0.04} l${h * 0.06},0 Z`} fill="#ffd36b" />
  </g>
);

const GiftBox: React.FC<{ x: number; y: number; w: number; col: string; rib?: string; lid?: number }> = ({ x, y, w, col, rib = "#f3e6cf", lid = 0 }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={8} y={-w * 0.7 + 12} width={w} height={w * 0.7} rx={8} fill="rgba(0,0,0,0.25)" />
    <rect x={0} y={-w * 0.7} width={w} height={w * 0.7} rx={8} fill={col} />
    <rect x={w * 0.44} y={-w * 0.7} width={w * 0.12} height={w * 0.7} fill={rib} />
    <g transform={`translate(0,${-lid * w * 0.5}) rotate(${-lid * 12})`}>
      <rect x={-w * 0.04} y={-w * 0.82} width={w * 1.08} height={w * 0.16} rx={6} fill={col} />
      <rect x={w * 0.44} y={-w * 0.82} width={w * 0.12} height={w * 0.16} fill={rib} />
      <ellipse cx={w * 0.38} cy={-w * 0.86} rx={w * 0.12} ry={w * 0.06} fill={rib} />
      <ellipse cx={w * 0.62} cy={-w * 0.86} rx={w * 0.12} ry={w * 0.06} fill={rib} />
    </g>
  </g>
);

// Illustrated postcard of a park. kind: smokies | utah | yellowstone.
const Postcard: React.FC<{ x: number; y: number; w: number; rot: number; k: number; kind: string; label: string }> = ({ x, y, w, rot, k, kind, label }) => {
  const h = w * 0.68;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${mix(0.6, 1, k)})`} opacity={k}>
      <rect x={-w / 2 + 10} y={-h / 2 + 14} width={w} height={h} rx={8} fill="rgba(0,0,0,0.3)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={8} fill="#fbf8f1" />
      <clipPath id={`pc-${kind}`}>
        <rect x={-w / 2 + 16} y={-h / 2 + 16} width={w - 32} height={h - 96} />
      </clipPath>
      <g clipPath={`url(#pc-${kind})`}>
        {kind === "smokies" && (
          <g>
            <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#c9d8e6" />
            <path d={`M${-w / 2},${-h * 0.05} Q${-w * 0.2},${-h * 0.3} 0,${-h * 0.1} T${w / 2},${-h * 0.12} V${h / 2} H${-w / 2} Z`} fill="#8aa3be" />
            <path d={`M${-w / 2},${h * 0.08} Q${-w * 0.1},${-h * 0.12} ${w * 0.15},${h * 0.05} T${w / 2},${0} V${h / 2} H${-w / 2} Z`} fill="#5f7d9c" />
            <path d={`M${-w / 2},${h * 0.2} Q0,${h * 0.02} ${w / 2},${h * 0.16} V${h / 2} H${-w / 2} Z`} fill="#3f5f7c" />
          </g>
        )}
        {kind === "utah" && (
          <g>
            <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#f3c48e" />
            <rect x={-w / 2} y={h * 0.15} width={w} height={h} fill="#c9643a" />
            <Arch x={0} y={h * 0.2} s={w / 1500} />
          </g>
        )}
        {kind === "yellowstone" && (
          <g>
            <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#b8d0e2" />
            <path d={`M${-w / 2},${h * 0.05} L${-w * 0.25},${-h * 0.28} L${-w * 0.1},${-h * 0.08} L${w * 0.05},${-h * 0.36} L${w * 0.25},${-h * 0.06} L${w / 2},${-h * 0.2} V${h / 2} H${-w / 2} Z`} fill="#6c7e90" />
            <path d={`M${-w * 0.25},${-h * 0.28} l${w * 0.05},${h * 0.08} l-${w * 0.09},0 Z M${w * 0.05},${-h * 0.36} l${w * 0.06},${h * 0.1} l-${w * 0.11},0 Z`} fill="#fff" />
            <rect x={-w / 2} y={h * 0.1} width={w} height={h} fill="#5f7a4a" />
          </g>
        )}
      </g>
      <text x={0} y={h / 2 - 28} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={w * 0.11} fill={INK} letterSpacing={3}>
        {label}
      </text>
      <circle cx={0} cy={-h / 2 + 6} r={10} fill="#B83A55" />
    </g>
  );
};

// A printed trip planning guide (booklet). top colour = cover photo band.
const Guide: React.FC<{ x: number; y: number; w: number; rot: number; top: string; title: string[]; k?: number }> = ({ x, y, w, rot, top, title, k = 1 }) => {
  const h = w * 1.29;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`} opacity={k}>
      <rect x={-w / 2 + 12} y={-h / 2 + 16} width={w} height={h} rx={10} fill="rgba(0,0,0,0.3)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill={PAPER} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h * 0.55} rx={10} fill={top} />
      <path d={`M${-w / 2},${-h * 0.05} Q${-w * 0.1},${-h * 0.2} ${w / 2},${-h * 0.08} V${h * 0.05} H${-w / 2} Z`} fill="rgba(0,0,0,0.2)" />
      <text x={-w / 2 + w * 0.08} y={-h / 2 + w * 0.12} fontFamily="Inter" fontWeight={700} fontSize={w * 0.045} fill="#fff" letterSpacing={2}>
        HIKESUPPLY CO.
      </text>
      {title.map((l, i) => (
        <text key={i} x={-w / 2 + w * 0.08} y={h * 0.15 + i * w * 0.12} fontFamily="Fraunces" fontWeight={700} fontSize={w * 0.1} fill={INK}>
          {l}
        </text>
      ))}
      <text x={-w / 2 + w * 0.08} y={h * 0.15 + title.length * w * 0.12 + w * 0.02} fontFamily="Inter" fontWeight={600} fontSize={w * 0.05} fill="#5b625c">
        Trip Planning Guide
      </text>
    </g>
  );
};

// ============ S1 HOOK MEDIUM: December night, Nora at the window, Christmas tree lit (0 - 2.81) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.03, 1.08, t / 2.81), rot: hh.rot };
  const floorY = 1560;
  const p: HikerProps = { x: 640, y: floorY, scale: 2.4, walk: 0, lean: 0.04, poles: false, handOverride: [30, 20], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={560} y={600} w={420} h={460} sky={NIGHT} uid="a" />
        <Room floorY={floorY} win={[560, 600, 420, 460]} lamp={[200, 700]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <XmasTree x={210} y={floorY + 10} h={820} t={t} />
          <GiftBox x={60} y={floorY + 30} w={150} col="#B83A55" />
          <GiftBox x={250} y={floorY + 40} w={120} col="#2C6E63" />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...p} outfit={NORA} expression="neutral" noPack />
        </Subject>
      </Plane>
      <Particles seed={1121} n={16} col="#ffe8c0" fall={8} />
      <Grade sunX={300} sunY={700} warm={LAMP} cool="40,40,70" />
      <Title text={"He gave her\nthree national\nparks for\nChristmas."} t={t} t0={0} top={110} size={112} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: three park postcards pinned on the board, one by one (2.81 - 6.42) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.61), rot: hh.rot };
  const pop = (t0: number) => at(t, [t0, t0 + 0.35], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#d8c6a8" />
          <rect x={70} y={470} width={940} height={1080} rx={20} fill="#6b4a2e" />
          <rect x={95} y={495} width={890} height={1030} rx={12} fill="#b98d5e" />
          {Array.from({ length: 60 }, (_, i) => (
            <circle key={i} cx={110 + ((i * 137) % 860)} cy={510 + ((i * 251) % 1000)} r={3} fill="#a07a4e" />
          ))}
        </Svg>
        <Subject rimX={3} col="rgba(255,236,200,0.6)">
          <Postcard x={330} y={720} w={420} rot={-5} k={pop(3.71)} kind="smokies" label="SMOKIES" />
          <Postcard x={760} y={900} w={420} rot={4} k={pop(4.37)} kind="utah" label="UTAH" />
          <Postcard x={420} y={1260} w={440} rot={-2} k={pop(5.07)} kind="yellowstone" label="YELLOWSTONE" />
        </Subject>
      </Plane>
      <Particles seed={1122} n={8} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.5} />
      <Chip text="Every year: next year" t={t} t0={2.85} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Nora's face, the calendar behind her flips by, nothing on it (6.42 - 8.81) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.39), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 560, y: 1700 + 182 * s - 120, scale: s, walk: 0, lean: 0.06, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 2) * 1 };
  const flip = (t * 1.6) % 1;
  const months = ["MARCH", "JUNE", "SEPTEMBER", "DECEMBER"];
  const m = months[Math.min(3, Math.floor(at(t, [6.5, 8.3], [0, 3.99])))];
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.7} blur={6}>
        <Room floorY={2000} win={[1200, 0, 10, 10]} lamp={[200, 500]} />
        <Svg>
          <Calendar x={90} y={420} w={420} month={m} year="" flip={t < 8.3 ? flip : 0} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={NORA} expression="tired" noPack />
        </Subject>
      </Plane>
      <Particles seed={1123} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={500} warm={LAMP} cool="40,40,70" vignette={0.6} />
      <Readout label="TRIPS PLANNED" value="None" ok={false} t={t} t0={7.79} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: Daniel sets one wrapped gift under the tree (8.81 - 11.58) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.05, 1.0, lt / 2.77), rot: hh.rot };
  const floorY = 1580;
  const k = at(t, [9.2, 10.4], [0, 1], outExpo);
  const p: HikerProps = { x: 720, y: floorY, scale: 2.5, walk: 0, lean: mix(0.05, 0.35, k), poles: false, handOverride: [mix(60, 90, k), mix(-10, 60, k)], breathe: 0 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={600} y={420} w={380} h={440} sky={NIGHT} uid="d" />
        <Room floorY={floorY} win={[600, 420, 380, 440]} lamp={[200, 600]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <XmasTree x={300} y={floorY + 10} h={900} t={t} />
          <GiftBox x={mix(560, 380, k)} y={mix(floorY - 330, floorY + 40, k)} w={190} col="#B83A55" />
        </Svg>
        <Subject rimX={-5} col="rgba(255,236,200,0.8)">
          <Person {...p} outfit={DANIEL} expression="happy" noPack flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={300} />
      </Plane>
      <Particles seed={1124} n={16} col="#ffe8c0" fall={8} />
      <Grade sunX={300} sunY={700} warm={LAMP} cool="40,40,70" />
      <Chip text="Daniel wrapped all three" t={t} t0={10.25} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP (top-down): the open box, three guides inside (11.58 - 14.46) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.88), rot: hh.rot };
  const g = (t0: number) => at(t, [t0, t0 + 0.4], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#6b4a2e" />
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={-200} y={-200 + i * 260} width={1480} height={6} fill="#5c3f27" />
          ))}
          <rect x={60} y={520} width={960} height={1060} rx={16} fill="#B83A55" />
          <rect x={90} y={550} width={900} height={1000} rx={10} fill="#efe2cc" />
          <path d="M90,550 L300,700 L240,1100 L90,1300 Z M990,560 L800,720 L860,1150 L990,1300 Z" fill="#f7efe0" opacity={0.8} />
        </Svg>
        <Subject rimX={3} col="rgba(255,236,200,0.6)">
          <Guide x={300} y={880} w={330} rot={-8} top="#5f7d9c" title={["Great Smoky", "Mountains"]} k={g(11.6)} />
          <Guide x={780} y={870} w={330} rot={7} top="#c9643a" title={["Utah's", "Mighty 5"]} k={g(11.85)} />
          <Guide x={540} y={1240} w={350} rot={-1} top="#6c7e90" title={["Yellowstone &", "Grand Teton"]} k={g(12.1)} />
        </Subject>
      </Plane>
      <Particles seed={1125} n={8} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.45} />
      <Chip text="3 trip planning guides" t={t} t0={11.59} x={60} y={200} icon="check" big />
      <Chip text="When to go" t={t} t0={13.09} x={60} y={330} icon="check" big />
      <Chip text="Where to stay" t={t} t0={13.71} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: an itinerary page, 3, 5 and 7 days (14.46 - 17.45) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(0, -40, lt / 3), zoom: mix(1.0, 1.06, lt / 2.99), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#6b4a2e" />
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={-200} y={-200 + i * 260} width={1480} height={6} fill="#5c3f27" />
          ))}
        </Svg>
        <Subject rimX={3} col="rgba(255,236,200,0.5)">
          <Itinerary x={540} y={560} t={t} t0={14.6} title="SMOKIES ITINERARIES" days={["Day 1", "Day 2", "Day 3"]} />
        </Subject>
      </Plane>
      <Particles seed={1126} n={8} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.45} />
      <Chip text="Itineraries" t={t} t0={14.47} x={60} y={200} icon="check" big />
      <Chip text="Built around the best day hikes" t={t} t0={16.32} x={60} y={330} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S7 MEDIUM: Nora on the sofa, reading a guide, smiling (17.45 - 20.05) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.6), rot: hh.rot };
  const floorY = 1560;
  const seat = 1110;
  const s = 2.3;
  const p: HikerProps = { x: 600, y: seat + 182 * s, scale: s, walk: 0, lean: 0.06, poles: false, handOverride: [80, -10], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={560} y={300} w={440} h={480} sky={MORNING} uid="g" />
        <Room floorY={floorY} win={[560, 300, 440, 480]} lamp={[200, 500]} />
        <Svg>
          <XmasTree x={150} y={floorY + 10} h={760} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <SofaBack x={360} y={seat} w={620} col={SOFA} shade={SOFA2} />
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...p} outfit={NORA} expression="happy" noPack />
          <Guide x={600 + 100 * s} y={seat - 40} w={150} rot={-14} top="#6c7e90" title={["Yellowstone"]} />
        </Subject>
        <SofaFront x={360} y={seat} w={620} col={SOFA} shade={SOFA2} floorY={floorY + 10} />
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={300} />
      </Plane>
      <Rays x={MORNING.sun[0]} y={MORNING.sun[1]} strength={0.18} col="255,240,210" />
      <Particles seed={1127} n={14} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={520} warm="255,226,190" />
      <Chip text="Safety rules for each park" t={t} t0={17.89} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: Christmas morning, both at the wall calendar, the first dates circled (20.05 - 24.1) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: at(lt, [0, 1.3], [1.12, 1.03], outExpo), rot: hh.rot };
  const floorY = 1600;
  const s = 2.4;
  const ring = at(t, [21.33, 22.1], [0, 1]);
  const nora: HikerProps = { x: 600, y: floorY, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [mix(40, 105, at(t, [20.9, 21.4], [0, 1])), mix(40, -95, at(t, [20.9, 21.4], [0, 1]))], breathe: Math.sin(t * 2) * 1.2 };
  const dan: HikerProps = { x: 900, y: floorY, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 2 + 1) * 1.2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={640} y={380} w={400} h={460} sky={MORNING} uid="h" />
        <Room floorY={floorY} win={[640, 380, 400, 460]} lamp={[200, 500]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <Calendar x={90} y={600} w={430} month="MAY" year="2027" ring={14} k={ring} note="SMOKIES!" />
        </Svg>
        <Subject rimX={-5} col="rgba(255,236,200,0.85)">
          <Person {...nora} outfit={NORA} expression="happy" noPack flip />
          <Person {...dan} outfit={DANIEL} expression="happy" noPack flip />
        </Subject>
      </Plane>
      <Rays x={MORNING.sun[0]} y={MORNING.sun[1]} strength={0.3} col="255,240,210" />
      <Particles seed={1128} n={18} col="#fff3d6" fall={8} />
      <Grade sunX={820} sunY={520} warm="255,226,190" />
      <Chip text="Christmas morning" t={t} t0={20.25} x={60} y={200} icon="check" big />
      <Chip text="First dates circled" t={t} t0={21.33} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/national-parks-trio-cut.png"
      cutoutH={620}
      spec="3 TRIP PLANNING GUIDES · INSTANT DOWNLOAD"
      name={
        <>
          National Parks
          <br />
          Trio
        </>
      }
      nameSize={100}
      price="$24.99"
      save="Save this for the hiker on your list"
    />
  );
};

export const V112: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.86} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.81} to={6.47} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.81} />
    </Scene>
    <Scene from={6.42} to={8.86} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.42} />
    </Scene>
    <Scene from={8.81} to={11.63} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.81} />
    </Scene>
    <Scene from={11.58} to={14.51} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.58} />
    </Scene>
    <Scene from={14.46} to={17.5} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.46} />
    </Scene>
    <Scene from={17.45} to={20.1} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={17.45} />
    </Scene>
    <Scene from={20.05} to={24.1} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={20.05} />
    </Scene>
    <Scene from={23.85} to={28.6} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.81, 1560],
        [2.81, 6.42, 1560],
        [6.42, 8.81, 1560],
        [8.81, 11.58, 1560],
        [11.58, 14.46, 1560],
        [14.46, 17.45, 1560],
        [17.45, 20.05, 1560],
        [20.05, 23.85, 1560],
      ]}
    />
  </AbsoluteFill>
);
