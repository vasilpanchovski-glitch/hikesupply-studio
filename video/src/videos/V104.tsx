// V104: "The Smokies trip she called 'someday'." in the cinematic C01 style. Posted Dec 1, last day of the Black Friday sale o02
// (25% off guides until 23:59 US Eastern, Dec 1). Facts from the live Shopify listing: Trip Planning Guide (getting there, where
// to stay, 3/5/7-day itineraries) and 10 day-hike GPX routes (Alum Cave is one). End card = Great Smoky Mountains Trip Pack, $19.99.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject, Trail } from "../fall";
import { Room, WindowView } from "../home";
import { Calendar, Desk, GpxPhone, Itinerary, PAPER, SmokyBackdrop, Wildflowers } from "../trip";
import vo from "../vo/v104.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#0f1a2c", mid: "#22324a", low: "#3a4a5e", sun: [820, 380], sunR: 30, sunCol: "#f4f1e0", glow: "#9fb0c8" };
const SPRING: Sky = { top: "#5b86b0", mid: "#b6cbd9", low: "#e9eee6", sun: [780, 600], sunR: 50, sunCol: "#fffbe8", glow: "#fff0c8" };
const LAMP = "255,206,150";

const MAYA: Outfit = {
  ...GUIDE,
  skin: "#8E5B3E",
  skinShade: "#73462E",
  hair: "#1d1410",
  ponytail: "#1d1410",
  beard: null,
  cap: "#1d1410",
  capShade: "#120c08",
  jacket: "#C9A24A",
  jacketShade: "#a5832f",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  glove: null,
};
const MAYA_T: Outfit = { ...MAYA, jacket: "#2F7F86", jacketShade: "#256870", cap: "#B83A55", capShade: "#8E2B42", pack: "#C2662E", packShade: "#9B4E20", boot: "#5a3e2a", sole: "#1d1916" };

// Framed misty ridge poster with a sticky note (screen units, top-left). note k = opacity.
const Poster: React.FC<{ x: number; y: number; w: number; note?: number; noteS?: number }> = ({ x, y, w, note = 1, noteS = 1 }) => {
  const h = w * 0.72;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={10} y={16} width={w} height={h} fill="rgba(0,0,0,0.28)" />
      <rect x={0} y={0} width={w} height={h} fill="#3a2a1e" />
      <rect x={w * 0.04} y={w * 0.04} width={w * 0.92} height={h - w * 0.08} fill="#cfdbe6" />
      <path d={`M${w * 0.04},${h * 0.5} Q${w * 0.25},${h * 0.3} ${w * 0.45},${h * 0.45} Q${w * 0.7},${h * 0.25} ${w * 0.96},${h * 0.42} L${w * 0.96},${h - w * 0.04} L${w * 0.04},${h - w * 0.04} Z`} fill="#9fb2c8" />
      <path d={`M${w * 0.04},${h * 0.66} Q${w * 0.3},${h * 0.5} ${w * 0.55},${h * 0.62} Q${w * 0.8},${h * 0.5} ${w * 0.96},${h * 0.6} L${w * 0.96},${h - w * 0.04} L${w * 0.04},${h - w * 0.04} Z`} fill="#6f8aa0" />
      <path d={`M${w * 0.04},${h * 0.8} Q${w * 0.35},${h * 0.68} ${w * 0.6},${h * 0.78} Q${w * 0.8},${h * 0.7} ${w * 0.96},${h * 0.76} L${w * 0.96},${h - w * 0.04} L${w * 0.04},${h - w * 0.04} Z`} fill="#3f5a52" />
      <rect x={w * 0.04} y={h * 0.4} width={w * 0.92} height={h * 0.1} fill="#ffffff" opacity={0.35} />
      <g transform={`translate(${w * 0.66},${h * 0.62}) rotate(6) scale(${noteS})`} opacity={note}>
        <rect x={4} y={6} width={w * 0.3} height={w * 0.26} fill="rgba(0,0,0,0.2)" />
        <rect x={0} y={0} width={w * 0.3} height={w * 0.26} fill="#f3d34a" />
        <text x={w * 0.15} y={w * 0.155} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={w * 0.06} fill="#3a2a1e">
          SOMEDAY
        </text>
      </g>
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Maya in front of the Smokies poster, "someday" note on it (0 - 3.35) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.03, 1.1, t / 3.35), rot: hh.rot };
  const floorY = 1620;
  const p: HikerProps = { x: 330, y: floorY, scale: 2.5, walk: 0, lean: 0.04, poles: false, handOverride: [40, 60], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.85} blur={1.5}>
        <Svg>
          <rect x={-300} y={-300} width={1680} height={2600} fill="#d8c6a8" />
          <rect x={-300} y={floorY} width={1680} height={600} fill="#8a6446" />
          <rect x={-300} y={floorY - 26} width={1680} height={30} fill="#efe6d6" />
          <Poster x={470} y={700} w={540} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...p} outfit={MAYA} expression="neutral" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={1100} />
      </Plane>
      <Particles seed={1041} n={14} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={600} warm={LAMP} />
      <Title text={"The Smokies trip\nshe called\n'someday'."} t={t} t0={0} top={120} size={112} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the sticky note, years old (3.35 - 5.19) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.84), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#d8c6a8" }}>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Poster x={-380} y={420} w={1500} noteS={1} />
        </Subject>
      </Plane>
      <Particles seed={1042} n={18} col="#efe4d0" fall={3} />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Chip text="For years: someday" t={t} t0={3.5} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Maya's face, she never sat down to plan it (5.19 - 8.76) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.57), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 560, y: 1600 + 182 * s, scale: s, walk: 0, lean: 0.04, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 2) * 1 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={8}>
        <Svg>
          <rect x={-300} y={-300} width={1680} height={2600} fill="#cdb998" />
          <Poster x={-80} y={300} w={620} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={MAYA} expression="tired" noPack flip />
        </Subject>
      </Plane>
      <Particles seed={1043} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.6} />
      <Chip text="Never sat down to plan it" t={t} t0={5.9} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: tonight, at the desk, she opens the plan (8.76 - 10.14) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.38), rot: hh.rot };
  const floorY = 1560;
  const p: HikerProps = { x: 440, y: floorY + 40, scale: 2.4, walk: 0, lean: 0.14, poles: false, handOverride: [96, 0], breathe: Math.sin(t * 2) * 1.4 };
  const open = at(t, [8.9, 9.5], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#120c08" }}>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={560} y={320} w={420} h={520} sky={NIGHT} uid="d" snow={false} />
        <Room floorY={floorY - 140} win={[560, 320, 420, 520]} wall="#5a4c40" floor="#3a2c22" lamp={[180, 520]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,220,170,0.85)">
          <Person {...p} outfit={MAYA} expression="happy" noPack />
        </Subject>
        <Desk y={floorY - 10} />
        <Svg>
          <g transform={`translate(700,${floorY - 40})`}>
            <rect x={-150} y={-20} width={300} height={40} rx={6} fill={PAPER} />
            <g transform={`translate(-150,0) scale(1,${mix(1, -1, open)})`}>
              <rect x={0} y={-200} width={300} height={200} rx={6} fill="#3e5f4a" opacity={open < 0.5 ? 1 : 0} />
            </g>
            <rect x={-150} y={-200 * open} width={300} height={200 * open} rx={6} fill={PAPER} opacity={open} />
            <rect x={-120} y={-160 * open} width={240} height={14} rx={6} fill="#d8d0c0" opacity={open} />
            <rect x={-120} y={-120 * open} width={180} height={14} rx={6} fill="#d8d0c0" opacity={open} />
          </g>
          <circle cx={200} cy={1000} r={500} fill="#ffe2a8" opacity={0.1} />
        </Svg>
      </Plane>
      <Particles seed={1044} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={900} warm={LAMP} cool="10,20,50" vignette={0.6} />
      <Chip text="Tonight she did" t={t} t0={8.85} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: where to stay, which entrance, a 3-day route (10.14 - 13.3) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(-30, 30, lt / 3.16), zoom: mix(1.02, 1.07, lt / 3.16), rot: hh.rot };
  const a = at(t, [10.15, 10.6], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <g transform={`translate(81,${mix(870, 170, a)}) scale(0.85)`}>
            <Itinerary x={560} y={500} t={t} t0={0} title="SMOKIES ITINERARY" only3 />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1045} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="Where to stay" t={t} t0={10.2} x={60} y={170} icon="check" />
      <Chip text="Which entrance to use" t={t} t0={11.0} x={60} y={280} icon="check" />
      <Chip text="A 3-day route" t={t} t0={12.4} x={60} y={390} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: ten day hikes as GPX routes on her phone (13.3 - 16.04) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.74), rot: hh.rot };
  const draw = at(t, [13.6, 15.2], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Svg>
          <g transform="translate(-40,180) scale(0.6) rotate(-8 540 900)" opacity={0.9}>
            <Itinerary x={540} y={420} t={t} t0={0} title="SMOKIES ITINERARY" only3 />
          </g>
        </Svg>
        <Subject rimX={-5} col="rgba(255,230,190,0.85)">
          <GpxPhone x={640} y={960} s={1.25} draw={draw} rot={5} label="ALUM CAVE · GPX" />
        </Subject>
      </Plane>
      <Particles seed={1046} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="10 day hikes on her phone" t={t} t0={13.4} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: a misty spring trail with wildflowers (16.04 - 18.26) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 24, y: hh.y, zoom: at(lt, [0, 1.2], [1.14, 1.04], outExpo), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 420 + lt * 70, y: g + 120, scale: 2.3, phase: t * 4.5, walk: 0.7, lean: 0.08, poles: false, breathe: 0 };
  return (
    <AbsoluteFill>
      <SmokyBackdrop cam={cam} sky={SPRING} uid="g" treeY={g + 10} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 100} grass="#6f9a48" dirt="#9a7f5c" />
        <Wildflowers y={g + 40} n={30} seed={4} />
        <Subject rimX={6} col="rgba(255,236,190,0.9)">
          <Person {...p} outfit={MAYA_T} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={10}>
        <Wildflowers y={1780} n={14} seed={9} s={2.4} />
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3c6a2e" side="left" />
      </Plane>
      <Rays x={SPRING.sun[0]} y={SPRING.sun[1]} strength={0.3} col="255,240,200" />
      <Particles seed={1047} n={22} col="#fffbe8" />
      <Grade sunX={780} sunY={600} warm="255,236,200" />
      <Chip text="April: spring wildflowers" t={t} t0={16.15} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: the calendar, April circled (18.26 - 21.3) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.04), rot: hh.rot };
  const k = at(t, [19.7, 20.5], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#cbb89a" />
        </Svg>
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Calendar x={170} y={460} w={740} month="APRIL" year="2027" ring={17} k={k} note="SMOKIES TRIP" />
        </Subject>
      </Plane>
      <Particles seed={1048} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.55} />
      <Chip text="Someday got a date" t={t} t0={19.7} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 MEDIUM: Maya at the desk with the plan, last day of the sale (21.3 - 25.0) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.04, 1.09, lt / 3.85), rot: hh.rot };
  const floorY = 1560;
  const p: HikerProps = { x: 420, y: floorY + 40, scale: 2.4, walk: 0, lean: 0.1, poles: false, handOverride: [96, -10], breathe: Math.sin(t * 2) * 1.4 };
  return (
    <AbsoluteFill style={{ background: "#120c08" }}>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={560} y={320} w={420} h={520} sky={NIGHT} uid="i" snow={false} />
        <Room floorY={floorY - 140} win={[560, 320, 420, 520]} wall="#5a4c40" floor="#3a2c22" lamp={[180, 520]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,220,170,0.85)">
          <Person {...p} outfit={MAYA} expression="happy" noPack />
        </Subject>
        <Desk y={floorY - 10} />
        <Svg>
          <g transform={`translate(720,${floorY - 30}) rotate(-4)`}>
            <rect x={-160} y={-12} width={320} height={30} rx={6} fill={PAPER} />
            <rect x={-130} y={-4} width={200} height={10} rx={4} fill="#d8d0c0" />
          </g>
          <circle cx={200} cy={1000} r={500} fill="#ffe2a8" opacity={0.1} />
        </Svg>
      </Plane>
      <Particles seed={1049} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={900} warm={LAMP} cool="10,20,50" vignette={0.55} />
      <Readout label="LAST DAY OF THE SALE" value="This pack 25% off" ok={true} t={t} t0={21.45} x={60} y={200} />
      <Chip text="Until midnight Eastern" t={t} t0={23.9} x={60} y={420} icon="check" />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/great-smoky-mountains-trip-pack.jpg"
      photoH={720}
      spec="PLANNING GUIDE + 10 GPX DAY HIKES"
      name={
        <>
          Smokies
          <br />
          Trip Pack
        </>
      }
      nameSize={108}
      price="$19.99"
      save="Save this before your next big trip"
    />
  );
};

export const V104: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.4} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.35} to={5.24} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.35} />
    </Scene>
    <Scene from={5.19} to={8.81} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.19} />
    </Scene>
    <Scene from={8.76} to={10.19} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.76} />
    </Scene>
    <Scene from={10.14} to={13.35} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={10.14} />
    </Scene>
    <Scene from={13.3} to={16.09} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={13.3} />
    </Scene>
    <Scene from={16.04} to={18.31} fadeIn={0.12} fadeOut={0.1}>
      <S7 off={16.04} />
    </Scene>
    <Scene from={18.26} to={21.35} fadeIn={0.08} fadeOut={0.08}>
      <S8 off={18.26} />
    </Scene>
    <Scene from={21.3} to={25.15} fadeIn={0.08} fadeOut={0.1}>
      <S9 off={21.3} />
    </Scene>
    <Scene from={25.0} to={29} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.35, 1560],
        [3.35, 5.19, 1560],
        [5.19, 8.76, 1560],
        [8.76, 10.14, 1560],
        [10.14, 13.3, 1560],
        [13.3, 16.04, 1560],
        [16.04, 18.26, 1560],
        [18.26, 21.3, 1560],
        [21.3, 25.0, 1560],
      ]}
    />
  </AbsoluteFill>
);
