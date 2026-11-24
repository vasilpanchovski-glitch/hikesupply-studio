// V216: "How many hikes this year? No idea." Short format (16.7 s, 44 words), cinematic C01 style, winter trail and home desk.
// Product: Hiking Journal & Trail Log (Printable), $7.99 (live Shopify). End card: boxed store photo (as in V45).
// Advice (simple, safe): write each hike down the same day: date, trail, miles and who came. Owen's 12 vs 30 is his story,
// not a statistic. The log page shows an example entry only.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { Room, WindowView } from "../home";
import { Desk, INK } from "../trip";
import { WINTER, WGOLD, WinterBackdrop, FrostTrail } from "../winter";
import vo from "../vo/v216.json";

const words = vo.words as unknown as Word[];

const EVE: Sky = { top: "#26345a", mid: "#6c6a8a", low: "#d99a78", sun: [800, 1100], sunR: 40, sunCol: "#ffd9a8", glow: "#f2a070" };

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const OWEN: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#BB8262",
  hair: "#3a2a20",
  beard: "#3a2a20",
  cap: "#2f4f6a",
  capShade: "#233d53",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#3f444b",
  pantsShade: "#2e3237",
  pack: "#3E4F5C",
  packShade: "#2C3943",
  glove: "#2a2a2a",
};
const OWEN_HOME: Outfit = { ...OWEN, cap: "#6a7a5a", capShade: "#556347", jacket: "#5a6f8a", jacketShade: "#45576e", glove: null };
const FRIEND: Outfit = {
  ...GUIDE,
  skin: "#8E5B40",
  skinShade: "#734631",
  hair: "#1d1612",
  beard: null,
  ponytail: "#1d1612",
  cap: "#c9a24a",
  capShade: "#a08035",
  jacket: "#3E7C6A",
  jacketShade: "#2f6152",
  pants: "#33363e",
  pantsShade: "#25272d",
  pack: "#7a3b5a",
  packShade: "#5e2c45",
  glove: "#2a2a2a",
};

// A tiny landscape thumbnail for the photo grid (local units, w x w).
const Thumb: React.FC<{ x: number; y: number; w: number; i: number }> = ({ x, y, w, i }) => {
  const skies = ["#7fa7c9", "#e3b48a", "#9bb7cc", "#c9d6de", "#a8c4a0", "#d9a07a"];
  const lands = ["#3f6b55", "#8e5a3a", "#5d7a8a", "#f1f4f6", "#4e7a3e", "#6e4c34"];
  const k = i % 6;
  const pk = 0.3 + ((i * 37) % 40) / 100;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={0} y={0} width={w} height={w} fill={skies[k]} />
      <path d={`M0,${w * 0.75} L${w * pk},${w * 0.3} L${w * (pk + 0.25)},${w * 0.55} L${w},${w * 0.4} L${w},${w} L0,${w} Z`} fill={lands[k]} opacity={0.9} />
      <path d={`M0,${w * 0.85} Q${w / 2},${w * 0.75} ${w},${w * 0.88} L${w},${w} L0,${w} Z`} fill="#2d4a3c" opacity={0.8} />
    </g>
  );
};

// Phone held in two gloved hands, photo grid scrolling (screen coords).
const PhoneGrid: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const scroll = at(t, [t0, t0 + 2.6], [0, 520]);
  const cols = 3;
  const w = 168;
  return (
    <g>
      <defs>
        <clipPath id="pgclip">
          <rect x={290} y={470} width={500} height={900} rx={24} />
        </clipPath>
      </defs>
      {/* arms */}
      <path d="M-160,1960 Q120,1650 300,1380" stroke={OWEN_HOME.jacket} strokeWidth={180} strokeLinecap="round" fill="none" />
      <path d="M1240,1960 Q960,1650 780,1380" stroke={OWEN_HOME.jacket} strokeWidth={180} strokeLinecap="round" fill="none" />
      <path d="M1240,1960 Q960,1650 780,1380" stroke={OWEN_HOME.jacketShade} strokeWidth={60} strokeLinecap="round" fill="none" opacity={0.5} />
      <rect x={262} y={430} width={556} height={980} rx={56} fill="#1d2126" />
      <g clipPath="url(#pgclip)">
        <rect x={290} y={470} width={500} height={900} fill="#f4f4f2" />
        {Array.from({ length: 30 }, (_, i) => (
          <Thumb key={i} x={290 + (i % cols) * (w - 0)} y={560 + Math.floor(i / cols) * w - scroll} w={w - 4} i={i} />
        ))}
        <rect x={290} y={470} width={500} height={80} fill="#f4f4f2" />
        <text x={316} y={530} fontFamily="Inter" fontWeight={700} fontSize={38} fill="#1d2126">
          Photos
        </text>
      </g>
      {/* hands */}
      <ellipse cx={300} cy={1300} rx={80} ry={110} fill={OWEN.skin} />
      <ellipse cx={780} cy={1300} rx={80} ry={110} fill={OWEN.skin} />
      <path d="M760,1220 q30,-30 50,10" stroke={OWEN.skinShade} strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
  );
};

// Trail log page filling in row by row (local units, top-left).
const LogPage: React.FC<{ x: number; y: number; w: number; t: number; t0: number; gap: number }> = ({ x, y, w, t, t0, gap }) => {
  const rows: [string, string][] = [
    ["DATE", "Sat, Dec 13"],
    ["TRAIL", "Laurel Falls"],
    ["MILES", "2.6 mi · 4.2 km"],
    ["WHO CAME", "Maya and Leo"],
  ];
  const h = 200 + rows.length * 190;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={14} y={22} width={w} height={h} rx={18} fill="rgba(0,0,0,0.28)" />
      <rect x={0} y={0} width={w} height={h} rx={18} fill="#f7f2e8" />
      <text x={56} y={112} fontFamily={HEAD} fontWeight={800} fontSize={72} fill={INK} letterSpacing={2}>
        HIKE NO. 30
      </text>
      <line x1={56} y1={142} x2={w - 56} y2={142} stroke={INK} strokeWidth={4} />
      {rows.map(([a, b], i) => {
        const k = Math.max(0, Math.min(1, (t - t0 - i * gap) / 0.4));
        const yy = 240 + i * 190;
        const chars = Math.round(b.length * k);
        return (
          <g key={i}>
            <text x={56} y={yy} fontFamily="Inter" fontWeight={700} fontSize={36} fill="#7a8178" letterSpacing={3}>
              {a}
            </text>
            <text x={56} y={yy + 76} fontFamily="Barlow Condensed" fontWeight={700} fontSize={70} fill="#2a3a8a">
              {b.slice(0, chars)}
            </text>
            <line x1={56} y1={yy + 98} x2={w - 56} y2={yy + 98} stroke="#d8d0c0" strokeWidth={3} />
          </g>
        );
      })}
    </g>
  );
};

// Pencil held in a hand over the page (screen coords).
const Pencil: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <path d={`M${x + 123},${y - 104} Q${x + 380},${y - 60} 1340,${y + 260}`} stroke={OWEN_HOME.jacket} strokeWidth={120} strokeLinecap="round" fill="none" />
    <g transform={`translate(${x},${y}) rotate(28)`}>
      <rect x={-12} y={-260} width={24} height={250} fill="#e2b33c" />
      <path d="M-12,-10 L12,-10 L0,24 Z" fill="#e8cfa4" />
      <path d="M-4,12 L4,12 L0,24 Z" fill="#333" />
      <rect x={-12} y={-282} width={24} height={24} fill="#c9a0a0" />
      <ellipse cx={40} cy={-120} rx={62} ry={52} fill={OWEN.skin} />
      <path d="M0,-90 q-20,20 -6,50" stroke={OWEN.skin} strokeWidth={26} strokeLinecap="round" fill="none" />
    </g>
  </g>
);

// ============ S1 HOOK WIDE: Owen and a friend on a snowy trail, the friend asks (0 - 3.2) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.03, 1.1, t / 3.2), rot: hh.rot };
  const g = 1460;
  const ph = t * 3.2;
  const pf: HikerProps = { x: 300 + t * 60, y: g + 40, scale: 1.9, phase: ph + 1.4, walk: 0.7, lean: 0.04, poles: false, handOverride: freeHand(ph + 1.4, 0.6), breathe: 0 };
  const po: HikerProps = { x: 560 + t * 60, y: g + 40, scale: 1.9, phase: ph, walk: 0.7, lean: 0.04, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...pf} outfit={FRIEND} expression="happy" />
          <Person {...po} outfit={OWEN} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.26} col="255,246,220" />
      <Particles seed={2161} n={16} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Title text={"How many hikes\nthis year?\nNo idea."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: Owen guesses, unsure (3.2 - 4.19) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.03], outExpo), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 560, y: 1700 + 182 * s - 80, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [24, 40], breathe: Math.sin(t * 1.4) * 1.6 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="b" treeY={1250} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,226,180,0.9)">
          <Person {...p} outfit={OWEN} expression="neutral" />
        </Subject>
      </Plane>
      <Particles seed={2162} n={12} col="#fff1d6" fall={8} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,225,180" cool="40,50,80" vignette={0.5} />
      <Chip text="His guess: 12" t={t} t0={3.5} x={60} y={170} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: his phone photos, scrolling: thirty hikes, half the names gone (4.19 - 7.84) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.65), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={12}>
        <WindowView x={600} y={300} w={360} h={560} sky={EVE} uid="c" />
        <Room floorY={1700} win={[600, 300, 360, 560]} lamp={[200, 500]} wall="#cdbb9c" />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <Svg>
            <PhoneGrid t={t} t0={4.3} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2163} n={10} col="#ffe8c0" fall={4} bokeh />
      <Grade sunX={300} sunY={500} warm="255,214,170" vignette={0.55} />
      <Readout label="HIS PHOTOS" value="30 HIKES" ok={null} t={t} t0={4.9} x={60} y={150} />
      <Chip text="Half the trail names? Gone" t={t} t0={6.2} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: back home after a hike, Owen sits down to write (7.84 - 9.9) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 8, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.06), rot: hh.rot };
  const floorY = 1640;
  const p: HikerProps = { x: 420, y: floorY, scale: 2.4, walk: 0, lean: 0.14, poles: false, handOverride: [44, 30], breathe: Math.sin(t * 1.8) * 1.4 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={620} y={420} w={360} h={560} sky={EVE} uid="d" />
        <Room floorY={floorY} win={[620, 420, 360, 560]} lamp={[200, 520]} wall="#cdbb9c" />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,180,0.8)">
          <Person {...p} outfit={OWEN_HOME} expression="happy" noPack />
        </Subject>
        <Svg>
          {/* table in front, with the open log and a mug */}
          <rect x={300} y={1290} width={780} height={40} rx={8} fill="#6e4c34" />
          <rect x={340} y={1330} width={30} height={330} fill="#5a3e2a" />
          <rect x={1000} y={1330} width={30} height={330} fill="#5a3e2a" />
          <g transform="translate(560,1270) skewX(-18)">
            <rect x={0} y={-26} width={300} height={30} fill="#f7f2e8" />
            <line x1={150} y1={-26} x2={150} y2={4} stroke="#c9bda4" strokeWidth={4} />
          </g>
          <rect x={900} y={1210} width={60} height={70} rx={10} fill="#B83A55" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="left" top={300} />
      </Plane>
      <Particles seed={2164} n={12} col="#ffe8c0" fall={5} />
      <Grade sunX={200} sunY={520} warm="255,214,160" cool="40,40,70" />
      <Chip text="The rule" t={t} t0={7.9} x={60} y={170} icon="none" big />
      <Chip text="Write it down the same day" t={t} t0={8.4} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the log page fills: date, trail, miles, who came (9.9 - 12.34) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.8], [1.08, 1.02], outExpo), rot: hh.rot };
  const rowGap = 0.5;
  const t0 = 10.2;
  const row = Math.max(0, Math.min(3, Math.floor((t - t0) / rowGap)));
  const k = Math.max(0, Math.min(1, (t - t0 - row * rowGap) / 0.4));
  const px = 200 + 300 * k + Math.sin(t * 18) * 6;
  const py = 380 + 240 + row * 190 + 60;
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <Svg>
            <LogPage x={150} y={380} w={780} t={t} t0={t0} gap={rowGap} />
            <Pencil x={px} y={py} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2165} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-journal-trail-log-printable-card.jpg"
      photoH={780}
      spec="52 HIKE PAGES · MILES + KM · INSTANT PDF"
      name={
        <>
          Hiking Journal
          <br />& Trail Log
        </>
      }
      nameSize={100}
      price="$7.99"
      save="Save this for next year"
    />
  );
};

export const V216: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.28} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.2} to={4.27} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.2} />
    </Scene>
    <Scene from={4.19} to={7.92} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.19} />
    </Scene>
    <Scene from={7.84} to={9.98} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={7.84} />
    </Scene>
    <Scene from={9.9} to={12.44} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.9} />
    </Scene>
    <Scene from={12.34} to={16.7} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.2, 1600],
        [3.2, 4.19, 1600],
        [4.19, 7.84, 1600],
        [7.84, 9.9, 1600],
        [9.9, 12.34, 1600],
      ]}
    />
  </AbsoluteFill>
);
