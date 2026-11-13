// V146: "Every January he says he'll hike more." in the cinematic C01 style, home in winter + a state park on New Year's Day.
// Story for the State Parks Passport & Visit Log (All 50 States + Canada's Provinces, Printable, $5.99, live Shopify).
// Facts kept general and true: many state parks run guided First Day Hikes on January 1, often free; check your state parks
// website and sign up; then visit one new park a month and log each visit. No official logos, no named parks, no statistics.
// End card = real Shopify cover image (photo card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, Subject, Trail } from "../fall";
import { Boots, Room, WindowView } from "../home";
import { Calendar, Desk } from "../trip";
import { FrostTrail, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v146.json";

const words = vo.words as unknown as Word[];

const COLD: Sky = { top: "#2c3f5c", mid: "#6f86a0", low: "#c9cfd2", sun: [790, 600], sunR: 30, sunCol: "#f4f0e2", glow: "#d9d6c8" };
const SPRING: Sky = { top: "#3f74a6", mid: "#a6c8e2", low: "#f2e6c4", sun: [800, 520], sunR: 52, sunCol: "#fff8e0", glow: "#ffe1a0" };
const LAMP = "255,206,150";
const PAPER = "#f7f2e8";
const INK = "#24302a";
const GREEN = "#3e7d4f";
const COVER = "products/state-parks-passport-visit-log.jpg";

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const BEN: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#BB8262",
  hair: "#2b2018",
  beard: "#2b2018",
  cap: "#2b2018",
  capShade: "#1d150f",
  jacket: "#2E5E7A",
  jacketShade: "#21465C",
  pants: "#4a4540",
  pantsShade: "#36322e",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};
const BEN_OUT: Outfit = { ...BEN, cap: "#C2333A", capShade: "#8F2229" };
const LEADER: Outfit = { ...GUIDE, jacket: "#3F6B55", jacketShade: "#2D5141", cap: "#7a5a3a", capShade: "#5e452c" };
const HIKER2: Outfit = { ...JAKE, beard: null, ponytail: "#a8642e", hair: "#a8642e", cap: "#D9D3C7", capShade: "#B8B0A2", jacket: "#7A2F3B", jacketShade: "#5E222D" };

// Plain wooden park sign (screen coords, post base).
const ParkSign: React.FC<{ x: number; y: number; text: string; snow?: boolean }> = ({ x, y, text, snow }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-12} y={-260} width={24} height={260} fill="#5a3e28" />
    <rect x={-190} y={-330} width={380} height={130} rx={12} fill="#6b4a30" />
    <rect x={-176} y={-316} width={352} height={102} rx={8} fill="none" stroke="#e8d9b8" strokeWidth={4} />
    <text x={0} y={-252} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={46} fill="#f2e6c8" letterSpacing={4}>
      {text}
    </text>
    {snow && <path d="M-196,-332 Q0,-352 196,-332 L190,-322 Q0,-338 -190,-322 Z" fill="#f3f6f8" />}
  </g>
);

// Visit log page with four stamp boxes that fill one by one (k 0..4) (screen coords).
const LogPage: React.FC<{ k: number; rot?: number }> = ({ k, rot = -2 }) => {
  const months = ["JAN", "FEB", "MAR", "APR"];
  return (
    <g transform={`rotate(${rot} 540 980)`}>
      <rect x={164} y={474} width={780} height={940} rx={12} fill="rgba(0,0,0,0.28)" />
      <rect x={150} y={460} width={780} height={940} rx={12} fill={PAPER} />
      <text x={210} y={570} fontFamily={HEAD} fontWeight={800} fontSize={70} fill={INK} letterSpacing={2}>
        MY PARK VISITS
      </text>
      <path d="M210,600 L870,600" stroke={INK} strokeWidth={4} opacity={0.4} />
      {months.map((m, i) => {
        const cx = 360 + (i % 2) * 360;
        const cy = 800 + Math.floor(i / 2) * 360;
        const on = at(k, [i, i + 0.35], [0, 1]);
        return (
          <g key={i}>
            <rect x={cx - 150} y={cy - 150} width={300} height={300} rx={14} fill="none" stroke="#b9b0a0" strokeWidth={5} strokeDasharray="14 10" />
            <g opacity={on} transform={`translate(${cx},${cy}) rotate(${-8 + i * 5}) scale(${mix(1.5, 1, on)})`}>
              <circle r={115} fill="none" stroke={i % 2 ? "#2f5a8a" : GREEN} strokeWidth={10} />
              <circle r={92} fill="none" stroke={i % 2 ? "#2f5a8a" : GREEN} strokeWidth={4} />
              <path d="M0,-62 L40,10 L18,10 L46,52 L-46,52 L-18,10 L-40,10 Z" fill={i % 2 ? "#2f5a8a" : GREEN} />
              <text x={0} y={92} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={36} fill={i % 2 ? "#2f5a8a" : GREEN} letterSpacing={3}>
                {m}
              </text>
            </g>
          </g>
        );
      })}
    </g>
  );
};

// Laptop with a generic state parks event page and a sign-up button (screen coords).
const SignUpLaptop: React.FC<{ click: number; t: number }> = ({ click }) => (
  <g>
    <rect x={120} y={560} width={840} height={600} rx={26} fill="#2a2e33" />
    <rect x={150} y={590} width={780} height={540} rx={10} fill="#f4f5f2" />
    <rect x={150} y={590} width={780} height={90} fill="#3e5f4a" />
    <text x={190} y={650} fontFamily={HEAD} fontWeight={800} fontSize={46} fill="#f4f5f2" letterSpacing={3}>
      STATE PARKS · EVENTS
    </text>
    <text x={190} y={760} fontFamily={HEAD} fontWeight={800} fontSize={68} fill={INK}>
      First Day Hike
    </text>
    <text x={190} y={825} fontFamily="Inter" fontWeight={600} fontSize={34} fill="#6b726c">
      January 1 · Guided walk
    </text>
    {[0, 1].map((i) => (
      <rect key={i} x={190} y={870 + i * 46} width={i ? 380 : 520} height={22} rx={8} fill="#dcded8" />
    ))}
    <g transform={`translate(540,1040) scale(${1 - 0.06 * at(click, [0, 0.3, 0.6], [0, 1, 0])})`}>
      <rect x={-200} y={-50} width={400} height={100} rx={50} fill={click > 0.5 ? GREEN : "#C9A23A"} />
      <text x={0} y={16} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={48} fill="#fff" letterSpacing={3}>
        {click > 0.5 ? "SIGNED UP" : "SIGN UP"}
      </text>
    </g>
    <path d="M60,1160 L1020,1160 L1080,1230 L0,1230 Z" fill="#c9ced2" />
    <rect x={460} y={1170} width={160} height={14} rx={7} fill="#9aa1a6" />
  </g>
);

// ============ S1 HOOK MEDIUM: January, Ben by the window, new boots in hand (0 - 3.03) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.03, 1.1, t / 3.03), rot: hh.rot };
  const floorY = 1580;
  const p: HikerProps = { x: 520, y: floorY, scale: 2.4, walk: 0, lean: 0.04, poles: false, handOverride: [60, -10], breathe: Math.sin(t * 2) * 1.2 };
  const g = hikerGeometry(p);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={600} y={480} w={420} h={480} sky={COLD} uid="a" />
        <Room floorY={floorY} win={[600, 480, 420, 480]} lamp={[200, 600]} />
        <Svg>
          <Calendar x={120} y={560} w={300} month="JANUARY" year="" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...p} outfit={BEN} expression="happy" noPack />
          <g transform={hikerTransform(p)}>
            <g transform={`translate(${g.arms[1].hand[0] - 30},${g.arms[1].hand[1] + 60}) scale(0.4)`}>
              <Boots x={0} y={0} s={1} col="#6b4a2e" />
            </g>
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" />
      </Plane>
      <Particles seed={1461} n={14} col="#ffe8c0" fall={8} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm={LAMP} cool="40,40,60" />
      <Title text={"Every January\nhe says he'll\nhike more."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: by March the boots are back in the closet (3.03 - 5.64) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 2.61), rot: hh.rot };
  const shut = at(t, [4.6, 5.3], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#2b2620" }}>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1500} height={2400} fill="#cdb894" />
          {/* closet inside */}
          <rect x={140} y={300} width={800} height={1400} fill="#3a2e24" />
          <rect x={140} y={300} width={800} height={30} fill="#2a2018" />
          <line x1={160} y1={420} x2={920} y2={420} stroke="#8a8f94" strokeWidth={12} />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${260 + i * 170},420 l-70,80 l0,420 l160,0 l0,-420 Z`} fill={["#5a6b78", "#7a2f3b", "#4a5a46", "#9a8a70"][i]} opacity={0.9} />
          ))}
          <rect x={140} y={1460} width={800} height={24} fill="#5a4636" />
          <Boots x={360} y={1460} s={1.7} col="#6b4a2e" />
          {/* door closing from the right */}
          <rect x={940 - shut * 800} y={300} width={800} height={1400} fill="#efe6d6" />
          <rect x={940 - shut * 800} y={300} width={800} height={1400} fill="none" stroke="#d8ccb8" strokeWidth={10} />
          <circle cx={1000 - shut * 800} cy={1000} r={14} fill="#b9a27a" opacity={shut} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.2} blur={4}>
        <Svg>
          <Calendar x={60} y={120} w={260} month="MARCH" year="" />
        </Svg>
      </Plane>
      <Particles seed={1462} n={12} col="#ffe8c0" fall={6} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm={LAMP} vignette={0.6} />
      <Chip text="By March" t={t} t0={3.2} x={420} y={200} icon="none" big />
      <Chip text="Boots back in the closet" t={t} t0={4.3} x={60} y={420} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: this year, Ben tries something else (5.64 - 7.67) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.06, 1.12, lt / 2.03), rot: hh.rot };
  const floorY = 1580;
  const p: HikerProps = { x: 420, y: floorY, scale: 2.6, walk: 0, lean: -0.02, poles: false, handOverride: [40, 20], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={3}>
        <WindowView x={560} y={420} w={460} h={560} sky={WINTER} uid="c" />
        <Room floorY={floorY} win={[560, 420, 460, 560]} lamp={[160, 500]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={BEN_OUT} expression="neutral" />
        </Subject>
      </Plane>
      <Rays x={800} y={600} strength={0.25} col="255,246,226" />
      <Particles seed={1463} n={14} col="#ffe8c0" fall={6} />
      <LowScrim />
      <Grade sunX={800} sunY={600} warm="250,236,214" />
      <Chip text="This year: something new" t={t} t0={5.8} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 WIDE: the fix: a guided First Day Hike at a state park on January 1 (7.67 - 13.79) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: mix(1.02, 1.1, lt / 6.12), rot: hh.rot };
  const g = 1540;
  const ph = t * 2.4;
  const walker = (x: number, i: number, s: number): HikerProps => ({ x: x + lt * 25, y: g + 30 + i * 8, scale: s, phase: ph + i * 1.3, walk: 0.55, lean: 0.06, poles: false, handOverride: freeHand(ph + i * 1.3, 0.55), breathe: 0 });
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <ParkSign x={190} y={g + 10} text="STATE PARK" snow />
        </Svg>
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <Person {...walker(800, 0, 1.6)} outfit={LEADER} expression="happy" />
          <Person {...walker(580, 1, 1.65)} outfit={HIKER2} expression="happy" />
          <Person {...walker(360, 2, 1.7)} outfit={BEN_OUT} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,246,226" />
      <Particles seed={1464} n={18} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,226" cool="40,60,90" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={8.85} top={200} size={124} />
      <Chip text="January 1" t={t} t0={8.9} x={60} y={200} icon="none" big />
      <Chip text="First Day Hikes" t={t} t0={10.3} x={60} y={330} icon="check" big />
      <Chip text="Guided, often free" t={t} t0={12.6} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: check your state parks website, sign up (13.79 - 16.76) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.97), rot: hh.rot };
  const click = at(t, [15.3, 15.6], [0, 1]);
  const hand: [number, number] = [mix(950, 720, at(t, [14.6, 15.3], [0, 1], outExpo)), mix(1500, 1090, at(t, [14.6, 15.3], [0, 1], outExpo))];
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <SignUpLaptop click={click} t={t} />
            <path d={`M${hand[0]},${hand[1]} l-20,-60 q-6,-20 14,-22 q16,0 20,18 l14,50 l60,10 q40,10 40,60 l-10,240 l-180,0 Z`} fill={BEN.skin} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1465} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Chip text="Check your state parks site" t={t} t0={13.95} x={60} y={200} icon="check" big />
      <Chip text="Sign up and go" t={t} t0={15.5} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: one new park a month, each visit logged with a stamp (16.76 - 21.55) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 4.79), rot: hh.rot };
  const k = at(t, [18.6, 21.2], [0, 3.6]);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <LogPage k={k} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1466} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Chip text="One new park a month" t={t} t0={16.9} x={60} y={200} icon="check" big />
      <Chip text="Log each visit" t={t} t0={19.4} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: spring, Ben at his fourth state park (21.55 - 24.4) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.3], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1540;
  const wave = at(t, [22.3, 22.6], [0, 1], outExpo);
  const p: HikerProps = { x: 380, y: g + 50, scale: 2.4, walk: 0, lean: -0.04, poles: false, handOverride: [mix(30, 70, wave), mix(20, -200, wave) + Math.sin(t * 8) * 10 * wave], breathe: Math.sin(t * 2) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SPRING} uid="g" treeY={g - 160} t={t} mid="#4f7a4a" />
      <Plane cam={cam} depth={1}>
        <Trail y={g} grass="#6f9a4a" />
        <Svg>
          <ParkSign x={820} y={g + 10} text="STATE PARK" />
          {Array.from({ length: 14 }, (_, i) => (
            <circle key={i} cx={-100 + i * 90} cy={g + 160 + ((i * 53) % 200)} r={10} fill={["#f2d27a", "#ffffff", "#e88aa0"][i % 3]} />
          ))}
        </Svg>
        <Subject rimX={6} col="rgba(255,236,190,0.9)">
          <Person {...p} outfit={BEN_OUT} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2c4a2e" side="left" />
      </Plane>
      <Rays x={SPRING.sun[0]} y={SPRING.sun[1]} strength={0.4} />
      <Particles seed={1467} n={20} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={800} sunY={520} warm="255,232,190" />
      <Readout label="BY SPRING" value="4 parks" ok={true} t={t} t0={21.7} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo={COVER}
      photoH={800}
      spec="40 PRINTABLE PAGES · 50 STATES + CANADA"
      name={
        <>
          State Parks
          <br />
          Passport
        </>
      }
      nameSize={104}
      price="$5.99"
      save="Save this for New Year's Day"
    />
  );
};

export const V146: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.08} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.03} to={5.69} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.03} />
    </Scene>
    <Scene from={5.64} to={7.72} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.64} />
    </Scene>
    <Scene from={7.67} to={13.84} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.67} />
    </Scene>
    <Scene from={13.79} to={16.81} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={13.79} />
    </Scene>
    <Scene from={16.76} to={21.6} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={16.76} />
    </Scene>
    <Scene from={21.55} to={24.45} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={21.55} />
    </Scene>
    <Scene from={24.3} to={28.5} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.03, 1600],
        [3.03, 5.64, 1660],
        [5.64, 7.67, 1600],
        [7.67, 13.79, 1600],
        [13.79, 16.76, 1660],
        [16.76, 21.55, 1660],
        [21.55, 24.3, 1600],
      ]}
    />
  </AbsoluteFill>
);
