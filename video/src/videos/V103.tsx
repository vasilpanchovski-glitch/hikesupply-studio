// V103: "Same Utah photo. Three years. No trip." in the cinematic C01 style. Black Friday sale last day (Dec 1), Utah story.
// Facts from the live Shopify listing: Trip Planning Guide (seasons and road access, getting there, park fees, where to stay,
// 3/5/7-day itineraries) and GPX day hikes (Delicate Arch is one of them) for AllTrails, Gaia GPS, Komoot or a watch.
// No drive-time numbers on screen (not invented). End card = Utah's Mighty 5 Trip Pack, $19.99 (live Shopify). Sale wording in the caption.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { CanyonTrail, DESERT } from "../canyon";
import { Room, WindowView } from "../home";
import { Arch, Calendar, Desk, GpxPhone, INK, Itinerary, LockPhone, PAPER, UtahBackdrop } from "../trip";
import vo from "../vo/v103.json";

const words = vo.words as unknown as Word[];

const EVE: Sky = { top: "#2a3a5c", mid: "#6a7a96", low: "#c9b8a8", sun: [800, 620], sunR: 30, sunCol: "#f6efe0", glow: "#d8c0a8" };
const SPRING: Sky = { ...DESERT, low: "#f6e2c4" };
const LAMP = "255,200,140";
const SCREEN = "255,214,170";

const SAM: Outfit = {
  ...JAKE,
  skin: "#C68E6A",
  skinShade: "#A8724F",
  hair: "#2a1c12",
  beard: "#2a1c12",
  cap: "#2a1c12",
  capShade: "#1c120a",
  jacket: "#4f6a5a",
  jacketShade: "#3c5244",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  glove: null,
};
const SAM_H: Outfit = { ...SAM, jacket: "#2a5f8a", jacketShade: "#1f4a6c", cap: "#E3B23C", capShade: "#b88d26", boot: "#5a4030" };

const ROSA: Outfit = {
  ...GUIDE,
  skin: "#E2AE8C",
  skinShade: "#C48F6E",
  hair: "#6a3a1e",
  ponytail: "#6a3a1e",
  beard: null,
  cap: "#6a3a1e",
  capShade: "#4a2814",
  jacket: "#B83A55",
  jacketShade: "#8E2B42",
  pants: "#4a4f57",
  pantsShade: "#363a40",
  glove: null,
};
const ROSA_H: Outfit = { ...ROSA, jacket: "#C2662E", jacketShade: "#9B4E20", cap: "#2C6E63", capShade: "#1f5249" };

// ============ S1 HOOK CLOSE-UP: the arch wallpaper on Sam's phone (0 - 2.6) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, t / 2.6), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#1a120c" }}>
      <Plane cam={cam} depth={0.6} blur={10}>
        <WindowView x={560} y={260} w={480} h={560} sky={EVE} uid="a" snow={false} />
        <Room floorY={1900} win={[560, 260, 480, 560]} wall="#5a4c40" floor="#3a2c22" lamp={[180, 560]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col={`rgba(${SCREEN},0.7)`}>
          {/* hand holding the phone from below */}
          <rect x={400} y={1560} width={400} height={500} rx={120} fill={SAM.jacket} />
          <LockPhone x={540} y={1080} s={1.12} rot={-4} uid="a" time="7:12" />
          <ellipse cx={540} cy={1530} rx={200} ry={70} fill={SAM.skinShade} />
          <ellipse cx={330} cy={1260} rx={60} ry={34} fill={SAM.skin} transform="rotate(-30 330 1260)" />
          <ellipse cx={756} cy={1290} rx={60} ry={34} fill={SAM.skinShade} transform="rotate(30 756 1290)" />
        </Subject>
      </Plane>
      <Particles seed={1031} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={540} sunY={1000} warm={SCREEN} cool="30,30,60" vignette={0.65} />
      <Title text={"Same Utah photo.\nThree years.\nNo trip."} t={t} t0={0} top={120} size={118} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: Sam on the sofa, staring at the wallpaper (2.6 - 5.37) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.77), rot: hh.rot };
  const floorY = 1640;
  const p: HikerProps = { x: 440, y: floorY, scale: 2.4, walk: 0, lean: 0.12, poles: false, handOverride: [96, -30], breathe: Math.sin(t * 2) * 1.2 };
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill style={{ background: "#1a120c" }}>
      <Plane cam={cam} depth={0.8} blur={2.5}>
        <WindowView x={600} y={420} w={380} h={460} sky={EVE} uid="b" snow={false} />
        <Room floorY={floorY} win={[600, 420, 380, 460]} lamp={[180, 600]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,180,0.8)">
          <Person {...p} outfit={SAM} expression="neutral" noPack />
          <g transform={hikerTransform(p)}>
            <g transform={`translate(${h[0] + 8},${h[1] - 34}) rotate(-14)`}>
              <rect x={-22} y={-40} width={44} height={80} rx={8} fill="#1d2126" />
              <rect x={-18} y={-36} width={36} height={72} rx={6} fill="#e9a070" />
              <path d="M-18,20 Q-8,-6 0,-6 Q8,-6 18,20 L18,36 L-18,36 Z" fill="#c9643a" />
            </g>
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="left" top={300} />
      </Plane>
      <Particles seed={1032} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={600} warm={LAMP} cool="40,40,70" />
      <Readout label="WALLPAPER" value="3 years" ok={null} t={t} t0={2.8} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the calendar flips through the springs, "next year" (5.37 - 7.63) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.26), rot: hh.rot };
  const f1 = at(t, [5.9, 6.2], [0, 1]);
  const f2 = at(t, [6.6, 6.9], [0, 1]);
  const year = f2 >= 1 ? "NEXT YEAR?" : f1 >= 1 ? "2025" : "2024";
  const flip = f2 > 0 && f2 < 1 ? f2 : f1 > 0 && f1 < 1 ? f1 : 0;
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#cbb89a" />
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={-200 + i * 120} y={-200} width={4} height={2400} fill="rgba(0,0,0,0.05)" />
          ))}
        </Svg>
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Calendar x={170} y={420} w={740} month="APRIL" year={year} flip={flip} />
        </Subject>
      </Plane>
      <Particles seed={1033} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Chip text="Every spring: next year" t={t} t0={5.5} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// Utah map with five park pins and dashed drive lines (screen units).
const PARKS: [string, number, number, boolean][] = [
  ["ZION", 270, 1250, true],
  ["BRYCE", 380, 1140, true],
  ["CAPITOL REEF", 520, 990, false],
  ["CANYONLANDS", 720, 1080, false],
  ["ARCHES", 790, 900, false],
];
const UtahMap: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => (
  <g>
    <rect x={140} y={500} width={810} height={900} rx={16} fill="rgba(0,0,0,0.3)" transform="translate(14,20)" />
    <rect x={140} y={500} width={810} height={900} rx={16} fill="#efe2c8" />
    <path d="M220,560 L560,560 L560,700 L880,700 L880,1340 L220,1340 Z" fill="#e3c9a2" stroke="#a0643a" strokeWidth={6} />
    <text x={240} y={640} fontFamily={HEAD} fontWeight={800} fontSize={60} fill={INK} letterSpacing={3}>
      UTAH
    </text>
    {PARKS.slice(1).map(([, x, y], i) => {
      const [, x0, y0] = PARKS[i];
      const k = at(t, [t0 + 1.4 + i * 0.35, t0 + 1.75 + i * 0.35], [0, 1]);
      return <line key={i} x1={x0} y1={y0} x2={mix(x0, x, k)} y2={mix(y0, y, k)} stroke="#B83A55" strokeWidth={8} strokeDasharray="22 14" />;
    })}
    {PARKS.map(([n, x, y, right], i) => {
      const k = at(t, [t0 + i * 0.22, t0 + i * 0.22 + 0.25], [0, 1], outExpo);
      return (
        <g key={n} opacity={k}>
          <circle cx={x} cy={y} r={26 * k} fill="#3e7d4f" stroke="#fff" strokeWidth={6} />
          <text x={right ? x + 40 : x - 40} y={y + 14} textAnchor={right ? "start" : "end"} fontFamily={HEAD} fontWeight={800} fontSize={40} fill={INK}>
            {n}
          </text>
        </g>
      );
    })}
  </g>
);

// ============ S4 CLOSE-UP: the map: five parks, long drives, shuttles and permits (7.63 - 12.5) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + mix(10, -10, lt / 4.87), y: hh.y, zoom: mix(1.0, 1.06, lt / 4.87), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} col="#5a3e2a" />
        <Subject rimX={-4} col="rgba(255,226,180,0.7)">
          <UtahMap t={t} t0={8.9} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <Svg>
          <rect x={860} y={1380} width={300} height={200} rx={20} fill="#3a2a1e" transform="rotate(-12 1000 1480)" />
        </Svg>
      </Plane>
      <Particles seed={1034} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.6} />
      <Chip text="5 parks" t={t} t0={9.0} x={60} y={200} icon="x" big />
      <Chip text="Long drives" t={t} t0={9.75} x={60} y={330} icon="x" big />
      <Chip text="Shuttles and permits" t={t} t0={10.5} x={60} y={1440} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: his partner hands him the printed plan (12.5 - 14.66) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.03, 1.08, lt / 2.16), rot: hh.rot };
  const floorY = 1600;
  const give = at(t, [12.7, 13.6], [0, 1], outExpo);
  const sam: HikerProps = { x: 300, y: floorY, scale: 2.6, walk: 0, lean: 0.04, poles: false, handOverride: [mix(20, 100, give), mix(60, -10, give)], breathe: Math.sin(t * 2) * 1.2 };
  const rosa: HikerProps = { x: 800, y: floorY, scale: 2.5, walk: 0, lean: 0.06, poles: false, handOverride: [mix(60, 110, give), -10], breathe: Math.sin(t * 2 + 1) * 1.2 };
  const px = mix(640, 520, give);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={3}>
        <WindowView x={420} y={500} w={360} h={440} sky={EVE} uid="e" snow={false} />
        <Room floorY={floorY} win={[420, 500, 360, 440]} lamp={[960, 600]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...sam} outfit={SAM} expression={give > 0.5 ? "happy" : "neutral"} noPack />
          <Person {...rosa} outfit={ROSA} expression="happy" noPack flip />
          <g transform={`translate(${px},${1180}) rotate(-6)`}>
            <rect x={-90} y={-120} width={180} height={232} rx={8} fill={PAPER} stroke="#d8d0c0" strokeWidth={3} />
            <rect x={-90} y={-120} width={180} height={100} rx={8} fill="#c9643a" />
            <path d="M-60,-20 Q-50,-80 0,-84 Q50,-80 60,-20 L36,-20 Q30,-60 0,-62 Q-30,-60 -36,-20 Z" fill="#8a3a1e" />
            <rect x={-70} y={10} width={140} height={10} rx={4} fill="#d8d0c0" />
            <rect x={-70} y={36} width={110} height={10} rx={4} fill="#d8d0c0" />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={300} />
      </Plane>
      <Particles seed={1035} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={900} sunY={600} warm={LAMP} />
      <Chip text="So she made the plan" t={t} t0={12.7} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// Route page: the five parks in order with a car icon between them (no invented numbers).
const RoutePage: React.FC<{ x: number; y: number; t: number; t0: number }> = ({ x, y, t, t0 }) => (
  <g transform={`translate(${x},${y}) rotate(2)`}>
    <rect x={14} y={20} width={720} height={980} rx={18} fill="rgba(0,0,0,0.3)" />
    <rect x={0} y={0} width={720} height={980} rx={18} fill={PAPER} />
    <text x={50} y={100} fontFamily={HEAD} fontWeight={800} fontSize={62} fill={INK} letterSpacing={2}>
      PARK TO PARK
    </text>
    <line x1={50} y1={130} x2={670} y2={130} stroke={INK} strokeWidth={4} />
    {PARKS.map(([n], i) => {
      const k = at(t, [t0 + i * 0.25, t0 + i * 0.25 + 0.3], [0, 1]);
      const yy = 220 + i * 165;
      return (
        <g key={n} opacity={0.25 + 0.75 * k}>
          <circle cx={90} cy={yy} r={30} fill="#3e7d4f" />
          <text x={90} y={yy + 13} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={36} fill="#fff">
            {i + 1}
          </text>
          <text x={150} y={yy + 18} fontFamily={HEAD} fontWeight={800} fontSize={54} fill={INK}>
            {n}
          </text>
          {i < 4 && (
            <g>
              <line x1={90} y1={yy + 34} x2={90} y2={yy + 131} stroke="#B83A55" strokeWidth={6} strokeDasharray="12 10" />
              <rect x={150} y={yy + 66} width={64} height={30} rx={10} fill="#4f6f8f" />
              <circle cx={166} cy={yy + 98} r={9} fill="#2a2e34" />
              <circle cx={198} cy={yy + 98} r={9} fill="#2a2e34" />
              <rect x={232} y={yy + 72} width={200 - i * 20} height={18} rx={6} fill="#d8d0c0" />
            </g>
          )}
        </g>
      );
    })}
  </g>
);

// ============ S6 CLOSE-UP: drive times page, then the 3/5/7-day routes (14.66 - 18.7) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(-30, 30, lt / 4.04), zoom: mix(1.02, 1.07, lt / 4.04), rot: hh.rot };
  const it = at(t, [16.3, 16.8], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <g transform={`translate(${mix(0, -560, it)},0)`} opacity={1 - it * 0.4}>
            <RoutePage x={180} y={460} t={t} t0={14.8} />
          </g>
          <g transform={`translate(${mix(900, 0, it)},0)`} opacity={it}>
            <Itinerary x={560} y={520} t={t} t0={16.45} title="UTAH ITINERARY" />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1036} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="Drive times between parks" t={t} t0={14.8} x={60} y={200} icon="check" big />
      <Chip text="3, 5 and 7-day routes" t={t} t0={16.5} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: the day hikes on his phone as GPX routes (18.7 - 21.5) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.8), rot: hh.rot };
  const draw = at(t, [19.0, 20.6], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Svg>
          <g transform="translate(-40,180) scale(0.6) rotate(-8 540 900)" opacity={0.9}>
            <Itinerary x={540} y={420} t={t} t0={0} title="UTAH ITINERARY" />
          </g>
        </Svg>
        <Subject rimX={-5} col="rgba(255,230,190,0.85)">
          <GpxPhone x={640} y={960} s={1.25} draw={draw} rot={5} label="DELICATE ARCH · GPX" land="#f1dcc0" topo="#e0bf98" />
        </Subject>
      </Plane>
      <Particles seed={1037} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="Day hikes ready on his phone" t={t} t0={18.8} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: spring in Utah, the two of them under the arch (21.5 - 24.2) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 22, y: hh.y, zoom: at(lt, [0, 1.2], [1.14, 1.04], outExpo), rot: hh.rot };
  const g = 1560;
  const sam: HikerProps = { x: 330 + lt * 70, y: g, scale: 2.3, phase: t * 5, walk: 0.8, lean: 0.1, poles: false, breathe: 0 };
  const rosa: HikerProps = { x: 560 + lt * 70, y: g + 10, scale: 2.2, phase: t * 5 + 1.6, walk: 0.8, lean: 0.1, poles: false, breathe: 0 };
  return (
    <AbsoluteFill>
      <UtahBackdrop cam={cam} sky={SPRING} uid="h" y={g - 250} t={t} arch={false} />
      <Plane cam={cam} depth={0.7} blur={0.6}>
        <Svg>
          <Arch x={640} y={g - 140} s={1.0} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <CanyonTrail y={g} tilt={0.02} />
        <Subject rimX={5} col="rgba(255,226,170,0.9)">
          <Person {...sam} outfit={SAM_H} expression="happy" />
          <Person {...rosa} outfit={ROSA_H} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <Svg>
          <ellipse cx={1040} cy={1880} rx={260} ry={180} fill="#7a3e22" />
          <ellipse cx={20} cy={1900} rx={220} ry={150} fill="#6a3620" />
        </Svg>
      </Plane>
      <Rays x={SPRING.sun[0]} y={SPRING.sun[1]} strength={0.3} />
      <Particles seed={1038} n={22} col="#fff1d6" />
      <Grade sunX={820} sunY={520} warm="255,226,180" />
      <Readout label="THIS SPRING" value="On the calendar" ok={true} t={t} t0={21.65} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/utahs-mighty-5-trip-pack-card.jpg"
      photoH={760}
      spec="PLANNING GUIDE + 10 GPX DAY HIKES"
      name={
        <>
          Utah's Mighty 5
          <br />
          Trip Pack
        </>
      }
      nameSize={100}
      price="$19.99"
      save="Save this if Utah is on your list"
    />
  );
};

export const V103: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.65} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.6} to={5.42} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.6} />
    </Scene>
    <Scene from={5.37} to={7.68} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.37} />
    </Scene>
    <Scene from={7.63} to={12.55} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.63} />
    </Scene>
    <Scene from={12.5} to={14.71} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.5} />
    </Scene>
    <Scene from={14.66} to={18.75} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.66} />
    </Scene>
    <Scene from={18.7} to={21.55} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={18.7} />
    </Scene>
    <Scene from={21.5} to={24.25} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={21.5} />
    </Scene>
    <Scene from={24.05} to={28} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.6, 1560],
        [2.6, 5.37, 1560],
        [5.37, 7.63, 1560],
        [7.63, 12.5, 1660],
        [12.5, 14.66, 1560],
        [14.66, 18.7, 1560],
        [18.7, 21.5, 1560],
        [21.5, 24.05, 1560],
      ]}
    />
  </AbsoluteFill>
);
