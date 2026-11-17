// V175: "The nearest park was 20 minutes away." Short format (16.3 s, 43 words), cinematic C01 style.
// Product: Parks Passport Pair — State Parks Passport & US National Parks Tracker, $8.99 (live Shopify). Cutout as in V173.
// Advice: find the closest park to home and go this weekend, then the next one. No invented numbers (20 minutes is Lena's story).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, Subject, Trail, FALL } from "../fall";
import { Room, SofaBack, SofaFront, WindowView, Mug } from "../home";
import { Desk } from "../trip";
import vo from "../vo/v175.json";

const words = vo.words as unknown as Word[];

const LATEFALL: Sky = { top: "#4a6f96", mid: "#b4c9d8", low: "#f0dcbc", sun: [800, 620], sunR: 50, sunCol: "#fff6dc", glow: "#f6cf98" };

const LENA_IN: Outfit = {
  ...GUIDE,
  skin: "#E2B08C",
  skinShade: "#C48F6C",
  hair: "#6b3f22",
  ponytail: "#6b3f22",
  beard: null,
  cap: "#6b3f22",
  capShade: "#4f2e18",
  jacket: "#8a6a9a",
  jacketShade: "#6b5078",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  glove: null,
};
const LENA: Outfit = { ...LENA_IN, cap: "#2F6B4F", capShade: "#22513b", jacket: "#C2662E", jacketShade: "#9B4E20", pack: "#3E4F5C", packShade: "#2C3943", boot: "#5a3e2a", sole: "#1d1916" };

const SOFA = "#6f8a8f";
const SOFA2 = "#566e73";

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// ============ S1 HOOK MEDIUM: Lena on the sofa, "we should visit more parks" (0 - 3.2) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: t * 10 + hh.x, y: hh.y, zoom: mix(1.03, 1.1, t / 3.2), rot: hh.rot };
  const floorY = 1520;
  const seat = 1110;
  const s = 2.3;
  const p: HikerProps = { x: 640, y: seat + 182 * s, scale: s, walk: 0, lean: -0.08, poles: false, handOverride: [40, 30], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={560} y={360} w={440} h={520} sky={LATEFALL} uid="a" snow={false} />
        <Room floorY={floorY} win={[560, 360, 440, 520]} lamp={[200, 500]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <SofaBack x={440} y={seat} w={600} col={SOFA} shade={SOFA2} />
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...p} outfit={LENA_IN} expression="neutral" noPack flip />
        </Subject>
        <SofaFront x={440} y={seat} w={600} col={SOFA} shade={SOFA2} floorY={floorY + 10} />
        <Svg>
          <Mug x={930} y={1500} s={1.3} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={300} />
      </Plane>
      <Rays x={800} y={560} strength={0.12} col="255,236,200" />
      <Particles seed={1751} n={16} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={560} warm="255,220,170" cool="40,40,60" />
      <Title text={"The nearest park\nwas 20 minutes\naway."} t={t} t0={0} top={110} size={118} />
    </AbsoluteFill>
  );
};

// Phone with a simple map: home pin, dotted drive, park pin. k 0..1 draws the route.
const MapPhone: React.FC<{ x: number; y: number; s?: number; k: number; pin: number }> = ({ x, y, s = 1, k, pin }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <defs>
      <clipPath id="mp175">
        <rect x={-170} y={-350} width={340} height={700} rx={30} />
      </clipPath>
    </defs>
    <rect x={-190} y={-380} width={380} height={760} rx={50} fill="#1d2126" />
    <g clipPath="url(#mp175)">
      <rect x={-170} y={-350} width={340} height={700} fill="#ece6d6" />
      {/* roads */}
      <path d="M-200,180 L220,120" stroke="#ffffff" strokeWidth={22} />
      <path d="M-60,400 L40,-400" stroke="#ffffff" strokeWidth={18} />
      <path d="M-200,-60 L220,-20" stroke="#ffffff" strokeWidth={12} />
      {/* park area */}
      <path d="M-170,-350 L170,-350 L170,-170 Q60,-120 -20,-200 Q-110,-260 -170,-220 Z" fill="#a9c99a" />
      <ellipse cx={90} cy={-270} rx={50} ry={26} fill="#8fb8d6" />
      {/* route */}
      <path d="M-40,250 L0,90 L20,-60 L30,-190" stroke="#2f6fd0" strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray="420" strokeDashoffset={420 * (1 - k)} />
      {/* home */}
      <circle cx={-40} cy={250} r={22} fill="#2C3B2E" />
      <circle cx={-40} cy={250} r={10} fill="#ffffff" />
      {/* park pin */}
      <g transform={`translate(30,-190) scale(${pin})`}>
        <path d="M0,0 C-30,-40 -34,-70 0,-80 C34,-70 30,-40 0,0 Z" fill="#2f7a52" />
        <circle cx={0} cy={-56} r={12} fill="#ffffff" />
      </g>
      <rect x={-150} y={240} width={300} height={100} rx={18} fill="#ffffff" opacity={at(pin, [0.5, 1], [0, 1])} />
      <text x={-130} y={286} fontFamily="Inter" fontWeight={700} fontSize={30} fill="#2C3B2E" opacity={at(pin, [0.5, 1], [0, 1])}>
        State park
      </text>
      <text x={-130} y={324} fontFamily="Inter" fontWeight={500} fontSize={26} fill="#5b625c" opacity={at(pin, [0.5, 1], [0, 1])}>
        20 min drive
      </text>
    </g>
  </g>
);

// ============ S2 CLOSE-UP: she looks it up, the map pins a state park 20 minutes away (3.2 - 6.89) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.8], [1.14, 1.04], outExpo), rot: hh.rot };
  const k = at(t, [3.6, 4.6], [0, 1]);
  const pin = at(t, [4.5, 4.9], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#3a2a20" }}>
      <Plane cam={cam} depth={0.4} blur={14}>
        <Svg>
          <rect x={-200} y={-200} width={1500} height={2400} fill="#c9b494" />
          <rect x={-200} y={1400} width={1500} height={800} fill="#6f8a8f" />
          <circle cx={820} cy={420} r={380} fill="#fff1d0" opacity={0.35} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <Svg>
            {/* her hand holding the phone */}
            <ellipse cx={330} cy={1500} rx={70} ry={100} fill={LENA_IN.skin} transform="rotate(-30 330 1500)" />
            <rect x={170} y={1560} width={210} height={420} rx={60} fill={LENA_IN.jacket} transform="rotate(-30 270 1700)" />
            <MapPhone x={560} y={900} s={1.5} k={k} pin={pin} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1752} n={10} col="#ffe8c0" fall={6} bokeh />
      <Grade sunX={820} sunY={420} warm="255,220,170" vignette={0.55} />
      <Readout label="NEAREST STATE PARK" value="20 MIN" ok={true} t={t} t0={4.9} x={60} y={170} pulseAt={4.9} />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: Saturday, Lena walks past the state park sign (6.89 - 10.62) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.1, 1.03, lt / 3.7), rot: hh.rot };
  const g = 1540;
  const p: HikerProps = { x: 380 + lt * 40, y: g, scale: 2.3, phase: t * 2.4, walk: 0.45, lean: 0.08, poles: false, breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LATEFALL} uid="c" treeY={g - 230} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          {/* park entrance sign */}
          <rect x={830} y={g - 330} width={22} height={330} fill="#5a3e2c" />
          <rect x={1010} y={g - 330} width={22} height={330} fill="#5a3e2c" />
          <rect x={800} y={g - 440} width={262} height={150} rx={10} fill="#6b4a2e" />
          <rect x={814} y={g - 426} width={234} height={122} rx={6} fill="none" stroke="#e8d9b8" strokeWidth={4} />
          <text x={931} y={g - 376} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={40} fill="#e8d9b8" letterSpacing={2}>
            STATE PARK
          </text>
        </Svg>
        <Subject rimX={5} col="rgba(255,236,200,0.9)">
          <Person {...p} outfit={LENA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2c1e" side="left" />
      </Plane>
      <Rays x={LATEFALL.sun[0]} y={LATEFALL.sun[1]} strength={0.35} col="255,226,180" />
      <Particles seed={1753} n={18} col="#e9c48a" fall={10} leaves={FALL} />
      <LowScrim />
      <Grade sunX={800} sunY={620} warm="255,226,180" cool="50,70,100" />
      <Chip text="Closest park, this weekend" t={t} t0={7.4} x={60} y={190} icon="check" big />
    </AbsoluteFill>
  );
};

// Her park list on the desk: park 1 ticked, park 2 waiting.
const ParkList: React.FC<{ k1: number; k2: number }> = ({ k1, k2 }) => {
  const W = 760;
  const row = (y: number, name: string, when: string, k: number, done: boolean) => (
    <g>
      <rect x={60} y={y - 54} width={70} height={70} rx={12} fill="none" stroke="#2C3B2E" strokeWidth={5} />
      {done && <path d={`M74,${y - 20} l18,20 l30,-44`} stroke="#3e7d4f" strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="90" strokeDashoffset={90 * (1 - k)} />}
      <text x={160} y={y - 4} fontFamily="Fraunces" fontStyle="italic" fontSize={54} fill="#2a3a8a" opacity={done ? 1 : k}>
        {name}
      </text>
      <text x={160} y={y + 50} fontFamily="Inter" fontWeight={600} fontSize={32} fill="#5b625c" opacity={done ? 1 : k}>
        {when}
      </text>
      <line x1={60} y1={y + 80} x2={W - 60} y2={y + 80} stroke="#d8d0c0" strokeWidth={3} />
    </g>
  );
  return (
    <g>
      <rect x={16} y={22} width={W} height={640} rx={22} fill="rgba(0,0,0,0.3)" />
      <rect x={0} y={0} width={W} height={640} rx={22} fill="#f7f2e8" />
      <text x={60} y={110} fontFamily="Barlow Condensed" fontWeight={800} fontSize={76} fill="#2C3B2E" letterSpacing={2}>
        PARKS NEAR HOME
      </text>
      <line x1={60} y1={140} x2={W - 60} y2={140} stroke="#2C3B2E" strokeWidth={4} />
      {row(270, "Closest state park", "Visited Saturday", k1, true)}
      {row(470, "The next one", "Next weekend", k2, false)}
    </g>
  );
};

// ============ S4 CLOSE-UP: park one ticked, the next one written in (10.62 - 12.0) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.8], [1.12, 1.04], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <Svg>
            <g transform="translate(160,620)">
              <ParkList k1={at(t, [10.7, 11.0], [0, 1])} k2={at(t, [11.0, 11.4], [0, 1])} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1754} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="Then the next one" t={t} t0={10.7} x={60} y={190} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
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
      save="Save this for your days off"
    />
  );
};

export const V175: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.28} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.2} to={6.98} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={3.2} />
    </Scene>
    <Scene from={6.89} to={10.72} fadeIn={0.06} fadeOut={0.1}>
      <S3 off={6.89} />
    </Scene>
    <Scene from={10.62} to={12.05} fadeIn={0.06} fadeOut={0.12}>
      <S4 off={10.62} />
    </Scene>
    <Scene from={11.95} to={16.3} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.2, 1600],
        [3.2, 6.89, 1600],
        [6.89, 10.62, 1600],
        [10.62, 11.95, 1600],
      ]}
    />
  </AbsoluteFill>
);
