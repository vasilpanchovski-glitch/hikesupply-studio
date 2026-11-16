// V173: '"Another park?" from the back seat.' Short format (15.2 s, 42 words), cinematic C01 style.
// Product: Parks Passport Pair — State Parks Passport & US National Parks Tracker, $8.99 (live Shopify).
// End card: the real store cover, whole. Story: give bored kids a job, a park log with date, one thing seen, a stamp box.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, Subject, Trail, Woods, FALL } from "../fall";
import { PenTip } from "../peak";
import { Desk } from "../trip";
import vo from "../vo/v173.json";

const words = vo.words as unknown as Word[];

const AUTUMN: Sky = { top: "#45709c", mid: "#a8c6dc", low: "#f2e2c0", sun: [780, 600], sunR: 48, sunCol: "#fff6dc", glow: "#f6d39c" };

const KID1: Outfit = {
  ...JAKE,
  skin: "#C68A64",
  skinShade: "#A66E4C",
  hair: "#1f1712",
  beard: null,
  cap: "#E0A23A",
  capShade: "#b88228",
  jacket: "#3F7FBF",
  jacketShade: "#2f6398",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
};
const KID2: Outfit = {
  ...GUIDE,
  skin: "#F2C8A6",
  skinShade: "#D6A684",
  hair: "#b5793e",
  ponytail: "#b5793e",
  beard: null,
  cap: "#7a4a8a",
  capShade: "#5c3768",
  jacket: "#D8573A",
  jacketShade: "#ad432b",
  pants: "#46504a",
  pantsShade: "#333b36",
};
const MIA: Outfit = {
  ...GUIDE,
  skin: "#B47A56",
  skinShade: "#94603F",
  hair: "#1f1712",
  ponytail: "#1f1712",
  beard: null,
  cap: "#2F6B4F",
  capShade: "#22513b",
  jacket: "#6E4A8E",
  jacketShade: "#53376b",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// ============ S1 HOOK MEDIUM: two bored kids on the back seat, woods rushing past the window (0 - 3.17) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y + Math.sin(t * 9) * 2, zoom: mix(1.04, 1.1, t / 3.17), rot: hh.rot };
  const seat = 1470;
  const s = 2.0;
  const k1: HikerProps = { x: 330, y: seat + 182 * s, scale: s, phase: 0, walk: 0, lean: -0.12, poles: false, breathe: Math.sin(t * 2) * 2 };
  const k2: HikerProps = { x: 720, y: seat + 182 * s, scale: s, phase: 0, walk: 0, lean: -0.18, poles: false, breathe: Math.sin(t * 2 + 1) * 2 };
  return (
    <AbsoluteFill style={{ background: "#1c1f24" }}>
      {/* the window view, scrolling fast */}
      <Plane cam={cam} depth={0.3} blur={5}>
        <Svg>
          <rect x={-300} y={-300} width={1680} height={2400} fill={AUTUMN.mid} />
          <rect x={-300} y={-300} width={1680} height={700} fill={AUTUMN.top} opacity={0.6} />
        </Svg>
        <Woods y={1180} shift={t * 1400} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* car body around a big side window */}
          <path d="M-200,-200 L1280,-200 L1280,2200 L-200,2200 Z M60,520 Q80,430 200,420 L900,420 Q1010,430 1030,520 L1030,1260 L60,1260 Z" fill="#2b2f36" fillRule="evenodd" />
          <rect x={500} y={420} width={40} height={840} fill="#22262c" />
          {/* seatbacks behind each kid */}
          {[k1, k2].map((k, i) => (
            <rect key={i} x={k.x - 150} y={seat - 420} width={110} height={470} rx={40} fill="#4a4f58" />
          ))}
        </Svg>
        <Subject rimX={4} col="rgba(255,236,200,0.8)">
          <Person {...k1} outfit={KID1} expression="tired" noPack />
          <Person {...k2} outfit={KID2} expression="tired" noPack />
        </Subject>
        <Svg>
          {/* seat cushion and front seat backs hide the legs */}
          <rect x={-200} y={seat - 10} width={1480} height={900} rx={40} fill="#3d424b" />
          <rect x={-200} y={seat - 10} width={1480} height={30} fill="#50555f" />
          <rect x={960} y={seat - 520} width={260} height={1400} rx={60} fill="#33373f" />
        </Svg>
      </Plane>
      <Particles seed={1731} n={14} col="#fff2d0" bokeh fall={-2} />
      <LowScrim />
      <Grade sunX={780} sunY={600} warm="255,226,180" cool="40,50,80" vignette={0.55} />
      <Title text={"\"Another park?\"\nfrom the\nback seat."} t={t} t0={0} top={110} size={118} />
    </AbsoluteFill>
  );
};

// Kid's park log page. kDate/kSaw: 0..1 writing; stamp: 0..1 the stamp landing.
const ParkLog: React.FC<{ kDate: number; kPark: number; kSaw: number; stamp: number }> = ({ kDate, kPark, kSaw, stamp }) => {
  const W = 760;
  const row = (y: number, label: string, val: string, k: number) => (
    <g>
      <text x={60} y={y} fontFamily="Barlow Condensed" fontWeight={700} fontSize={40} letterSpacing={3} fill="#5b625c">
        {label}
      </text>
      <line x1={60} y1={y + 90} x2={W - 60} y2={y + 90} stroke="#c9c1b0" strokeWidth={4} />
      <clipPath id={`cl${label.replace(/\W/g, "")}`}>
        <rect x={60} y={y + 10} width={(W - 120) * k} height={90} />
      </clipPath>
      <text x={70} y={y + 76} fontFamily="Fraunces" fontStyle="italic" fontSize={56} fill="#2a3a8a" clipPath={`url(#cl${label.replace(/\W/g, "")})`}>
        {val}
      </text>
    </g>
  );
  return (
    <g>
      <rect x={16} y={22} width={W} height={1000} rx={22} fill="rgba(0,0,0,0.3)" />
      <rect x={0} y={0} width={W} height={1000} rx={22} fill="#f7f2e8" />
      <text x={60} y={110} fontFamily="Barlow Condensed" fontWeight={800} fontSize={76} fill="#2C3B2E" letterSpacing={2}>
        PARK LOG
      </text>
      <line x1={60} y1={140} x2={W - 60} y2={140} stroke="#2C3B2E" strokeWidth={4} />
      {row(210, "DATE", "Nov 24", kDate)}
      {row(370, "PARK", "Pine Lake State Park", kPark)}
      {row(530, "ONE THING I SAW", "a blue heron", kSaw)}
      <text x={60} y={700} fontFamily="Barlow Condensed" fontWeight={700} fontSize={40} letterSpacing={3} fill="#5b625c">
        STAMP
      </text>
      <rect x={60} y={720} width={260} height={220} rx={14} fill="none" stroke="#2C3B2E" strokeWidth={4} strokeDasharray="14 10" />
      {stamp > 0 && (
        <g transform={`translate(190,830) rotate(-12) scale(${mix(1.5, 1, stamp)})`} opacity={stamp}>
          <circle r={88} fill="none" stroke="#2f7a52" strokeWidth={9} />
          <circle r={70} fill="none" stroke="#2f7a52" strokeWidth={3} />
          <path d="M-46,24 L-12,-30 L8,0 L22,-18 L48,24 Z" fill="#2f7a52" />
          <text y={58} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={24} fill="#2f7a52" letterSpacing={2}>
            VISITED
          </text>
        </g>
      )}
    </g>
  );
};

// ============ S2 CLOSE-UP: the job. The log page fills in: date, one thing seen, a stamp (3.17 - 8.83) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const slam = t > 8.36 && t < 8.6 ? 1 : 0;
  const hh = handheld(t, 0.3, slam);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.9], [1.12, 1.03], outExpo), rot: hh.rot };
  const kDate = at(t, [6.4, 6.95], [0, 1]);
  const kPark = at(t, [5.3, 6.2], [0, 1]);
  const kSaw = at(t, [7.1, 8.1], [0, 1]);
  const stamp = at(t, [8.3, 8.5], [0, 1]);
  // pen follows the line being written
  const px = t < 6.2 ? mix(150, 700, kPark) : t < 7.0 ? mix(150, 380, kDate) : mix(150, 560, kSaw);
  const py = t < 6.2 ? 860 : t < 7.0 ? 700 : 1020;
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <Svg>
            <g transform="translate(160,430)">
              <ParkLog kDate={kDate} kPark={kPark} kSaw={kSaw} stamp={stamp} />
            </g>
            {t < 8.15 && <PenTip x={px} y={py} s={1.5} skin={KID2.skin} wig={t} />}
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1732} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="Give them a job" t={t} t0={3.6} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3 PAYOFF MEDIUM: at the next park sign, kids ahead with their logs (8.83 - 10.6) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: mix(1.08, 1.03, lt / 1.8), rot: hh.rot };
  const g = 1540;
  const hop = (o: number) => Math.max(0, Math.sin(t * 7 + o)) * 18;
  const mia: HikerProps = { x: 300, y: g, scale: 2.3, phase: t * 2.4, walk: 0.35, lean: 0.06, poles: false };
  const a: HikerProps = { x: 600, y: g - hop(0), scale: 1.6, phase: t * 3, walk: 0.6, lean: 0.1, poles: false };
  const b: HikerProps = { x: 800, y: g - hop(1.6), scale: 1.55, phase: t * 3 + 1, walk: 0.6, lean: 0.1, poles: false };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={AUTUMN} uid="c" treeY={g - 230} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          {/* park entrance sign */}
          <rect x={900} y={g - 330} width={22} height={330} fill="#5a3e2c" />
          <rect x={1020} y={g - 330} width={22} height={330} fill="#5a3e2c" />
          <rect x={870} y={g - 420} width={200} height={130} rx={10} fill="#6b4a2e" />
          <rect x={884} y={g - 406} width={172} height={102} rx={6} fill="none" stroke="#e8d9b8" strokeWidth={4} />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,200,0.9)">
          <Person {...mia} outfit={MIA} expression="happy" />
          <Person {...a} outfit={KID1} expression="happy" noPack />
          <Person {...b} outfit={KID2} expression="happy" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2c1e" side="left" />
      </Plane>
      <Rays x={AUTUMN.sun[0]} y={AUTUMN.sun[1]} strength={0.35} col="255,226,180" />
      <Particles seed={1733} n={18} col="#e9c48a" fall={10} leaves={FALL} />
      <LowScrim />
      <Grade sunX={780} sunY={600} warm="255,226,180" cool="50,70,100" />
      <Chip text="“Which park is next?”" t={t} t0={9.0} x={60} y={190} icon="check" big />
    </AbsoluteFill>
  );
};

const S4: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/parks-passport-pair-cover-cut.png"
      cutoutH={800}
      spec="STATE PARKS PASSPORT + NATIONAL PARKS TRACKER"
      name={
        <>
          Parks Passport
          <br />
          Pair
        </>
      }
      nameSize={100}
      price="$8.99"
      save="Save this for your next road trip"
    />
  );
};

export const V173: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.25} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.17} to={8.93} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={3.17} />
    </Scene>
    <Scene from={8.83} to={10.7} fadeIn={0.06} fadeOut={0.12}>
      <S3 off={8.83} />
    </Scene>
    <Scene from={10.6} to={15.2} fadeOut={0}>
      <S4 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.17, 1600],
        [3.17, 8.83, 1600],
        [8.83, 10.6, 1600],
      ]}
    />
  </AbsoluteFill>
);
