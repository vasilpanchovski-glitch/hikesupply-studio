// V233: "No signal. Battery gone by noon." Short format (16.2 s, 43 words), cinematic C01 style, snowy forest trail.
// Product: Hiking Emergency Checklist, $5.99 (live Shopify). End card: the real store card image (boxed photo card, as in V179).
// Advice (standard, conservative): a phone that keeps searching for a signal drains its battery faster; where there is no
// signal, switch to airplane mode. GPS does not need cell signal, so a map downloaded before the hike still shows your position.
// No battery numbers or percentages on screen. Phone, sleeve and gloves built like V164.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { FrostTrail, STORM, WINTER, WGOLD, WinterBackdrop } from "../winter";
import vo from "../vo/v233.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const ZOE: Outfit = {
  ...JAKE,
  skin: "#E6B494",
  skinShade: "#C99574",
  hair: "#7a3e22",
  ponytail: "#7a3e22",
  beard: null,
  cap: "#6A4C93",
  capShade: "#523a73",
  jacket: "#2E7D6B",
  jacketShade: "#226152",
  pants: "#3a3f4a",
  pantsShade: "#2a2e36",
  pack: "#C2662E",
  packShade: "#9B4E20",
  glove: "#2a2a2a",
};
const GLOVE = "#2a2a2a";
const RED = "#c0392b";
const GREEN = "#2f8f5b";

// Phone face (local units, screen 340 x 700 centred). batt 0..1 level, dead 0..1 screen going black,
// search: animated "searching" in the status bar, plane 0..1 airplane-mode toggle (-1 hides the panel), gps: dot pulse on.
const Phone: React.FC<{ x: number; y: number; s: number; rot?: number; batt: number; dead?: number; search?: boolean; plane?: number; t: number; id: string }> = ({
  x,
  y,
  s,
  rot = 0,
  batt,
  dead = 0,
  search = false,
  plane = -1,
  t,
  id,
}) => {
  const low = batt < 0.25;
  const pulse = (t * 1.2) % 1;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      <defs>
        <clipPath id={id}>
          <rect x={-170} y={-350} width={340} height={700} rx={30} />
        </clipPath>
      </defs>
      <rect x={-190} y={-380} width={380} height={760} rx={50} fill="#1d2126" />
      <g clipPath={`url(#${id})`}>
        <rect x={-170} y={-350} width={340} height={700} fill="#e8ecdf" />
        {/* offline topo map with the trail and the blue position dot */}
        <path d="M-170,-350 L170,-350 L170,-60 Q40,-20 -40,-120 Q-120,-200 -170,-160 Z" fill="#b8d3a6" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M-170,${40 + i * 60} Q0,${-10 + i * 60} 170,${60 + i * 60}`} stroke="#c9b48a" strokeWidth={4} fill="none" />
        ))}
        <path d="M-20,350 L0,80 Q-60,-40 -150,-200" stroke="#c0392b" strokeWidth={9} strokeDasharray="18 12" fill="none" />
        <circle cx={-8} cy={160} r={16 + pulse * 30} fill="#2f6fd0" opacity={0.35 * (1 - pulse)} />
        <circle cx={-8} cy={160} r={16} fill="#2f6fd0" stroke="#fff" strokeWidth={5} />
        {/* status bar */}
        <rect x={-170} y={-350} width={340} height={56} fill="rgba(255,255,255,0.9)" />
        {plane > 0.5 ? (
          <path d="M-138,-322 l40,0 M-124,-336 l12,14 l-12,14 M-108,-322 l-10,-10 M-108,-322 l-10,10" stroke="#1d2126" strokeWidth={5} fill="none" strokeLinecap="round" />
        ) : (
          <>
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={-150 + i * 14} y={-312 - i * 7} width={9} height={9 + i * 7} fill={search && Math.floor(t * 4) % 4 === i ? "#6d7378" : "#c9cccf"} />
            ))}
            {search && (
              <text x={-86} y={-312} fontFamily="Inter" fontWeight={600} fontSize={17} fill="#6d7378">
                Searching{".".repeat(1 + (Math.floor(t * 3) % 3))}
              </text>
            )}
          </>
        )}
        {/* battery */}
        <rect x={96} y={-334} width={52} height={24} rx={5} fill="none" stroke="#1d2126" strokeWidth={3} />
        <rect x={149} y={-326} width={5} height={8} rx={2} fill="#1d2126" />
        <rect x={100} y={-330} width={44 * Math.max(0.04, batt)} height={16} rx={3} fill={low ? RED : "#1d2126"} />
        {/* airplane mode panel */}
        {plane >= 0 && (
          <g>
            <rect x={-150} y={170} width={300} height={130} rx={22} fill="#ffffff" />
            <g transform="translate(-112,236)">
              <circle cx={0} cy={0} r={26} fill={plane > 0.5 ? "#e8962e" : "#c9cccf"} />
              <path d="M-14,0 l28,0 M-4,-10 l8,10 l-8,10" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" />
            </g>
            <text x={-74} y={228} fontFamily="Inter" fontWeight={700} fontSize={23} fill="#1d2126">
              Airplane
            </text>
            <text x={-74} y={258} fontFamily="Inter" fontWeight={700} fontSize={23} fill="#1d2126">
              mode
            </text>
            <rect x={56} y={214} width={76} height={42} rx={21} fill={plane > 0.5 ? GREEN : "#c9cccf"} />
            <circle cx={mix(78, 110, plane)} cy={235} r={17} fill="#ffffff" />
          </g>
        )}
        {/* screen dying: black with an empty battery */}
        {dead > 0 && (
          <g opacity={dead}>
            <rect x={-170} y={-350} width={340} height={700} fill="#060708" />
            <rect x={-50} y={-30} width={100} height={52} rx={10} fill="none" stroke={RED} strokeWidth={6} opacity={0.6 + 0.4 * Math.sin(t * 8)} />
            <rect x={52} y={-12} width={10} height={16} rx={3} fill={RED} opacity={0.6 + 0.4 * Math.sin(t * 8)} />
            <rect x={-42} y={-22} width={10} height={36} rx={3} fill={RED} opacity={0.6 + 0.4 * Math.sin(t * 8)} />
          </g>
        )}
      </g>
    </g>
  );
};

// Gloved hand holding a small phone at the hiker's chest (hiker coords).
const HandPhone: React.FC<{ p: HikerProps }> = ({ p }) => {
  const [hx, hy] = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${hx + 4},${hy - 16}) rotate(-8)`}>
        <rect x={-11} y={-20} width={22} height={40} rx={4} fill="#1d2126" />
        <rect x={-8} y={-16} width={16} height={30} rx={2} fill="#cfe1d4" />
        <circle cx={-1} cy={2} r={2.6} fill="#2f6fd0" />
      </g>
      <circle cx={hx} cy={hy} r={9} fill={GLOVE} />
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Zoe on the snowy trail, phone in hand, always searching (0 - 3.28) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 3.28), rot: hh.rot };
  const g = 1500;
  const ph = t * 3;
  const p: HikerProps = { x: 330 + t * 40, y: g + 20, scale: 2.3, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: [56, -6], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={g - 200} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,240,220,0.8)">
          <Person {...p} outfit={ZOE} expression="neutral" />
          <HandPhone p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f3a3a" side="right" />
      </Plane>
      <Particles seed={2331} n={18} col="#ffffff" fall={8} bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="30,45,80" vignette={0.5} />
      <Title text={"No signal.\nBattery gone\nby noon."} t={t} t0={0} top={110} size={128} />
      <Chip text="Searching for signal" t={t} t0={1.5} x={60} y={600} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the battery runs down, the screen goes black with her map on it (3.28 - 5.93) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.12, 1.03], outExpo), rot: hh.rot };
  const batt = at(t, [3.3, 4.6], [0.55, 0.03]);
  const dead = at(t, [4.6, 4.9], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(230,236,245,0.8)">
          <Svg>
            <path d="M-80,1920 L-60,1420 Q160,1280 420,1300 L470,1460 Q230,1500 220,1920 Z" fill={ZOE.jacket} />
            <path d="M-80,1920 L-70,1600 Q100,1500 260,1500 L240,1920 Z" fill={ZOE.jacketShade} />
            <Phone x={560} y={900} s={1.45} batt={batt} dead={dead} search t={t} id="ph233a" />
            <path d="M250,1300 Q220,1140 290,1100 L360,1160 Q390,1270 350,1380 Q290,1420 250,1380 Z" fill={GLOVE} />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={760} y={980 + i * 80} width={90} height={56} rx={26} fill={GLOVE} />
            ))}
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2332} n={20} col="#ffffff" fall={20} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="40,60,90" vignette={0.55} />
      <Chip text="Dead by noon" t={t} t0={4.4} x={60} y={150} icon="x" big />
      <Chip text="Her map was on it" t={t} t0={5.2} x={60} y={280} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the rule, airplane mode switches on (5.93 - 9.2) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.27), rot: hh.rot };
  const plane = at(t, [8.2, 8.5], [0, 1], outExpo);
  const tap = at(t, [7.9, 8.2, 8.5], [0, 1, 0]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,240,210,0.8)">
          <Svg>
            <path d="M1160,1920 L1140,1420 Q920,1280 660,1300 L610,1460 Q850,1500 860,1920 Z" fill={ZOE.jacket} />
            <Phone x={520} y={1000} s={1.35} rot={2} batt={0.9} plane={plane} t={t} id="ph233b" />
            <path d="M230,1560 Q200,1420 260,1380 L330,1440 Q360,1530 330,1620 Q270,1660 230,1620 Z" fill={GLOVE} />
            {/* thumb (bare, for the touch screen) reaching for the toggle */}
            <g transform={`translate(${mix(860, 676, tap)},${mix(1560, 1350, tap)}) rotate(-28)`}>
              <rect x={-44} y={-40} width={88} height={240} rx={44} fill={ZOE.skin} />
              <ellipse cx={0} cy={-20} rx={32} ry={30} fill={ZOE.skinShade} opacity={0.35} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} col="255,246,220" />
      <Particles seed={2333} n={14} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" vignette={0.5} />
      <Chip text="The rule" t={t} t0={6.05} x={60} y={150} icon="none" big />
      <Chip text="No signal? Airplane mode" t={t} t0={7.3} x={60} y={280} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: golden light, Zoe walks on with her offline map showing where she is (9.2 - 11.9) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.7), rot: hh.rot };
  const g = 1500;
  const ph = t * 3;
  const p: HikerProps = { x: 300 + lt * 60, y: g + 20, scale: 2.5, phase: ph, walk: 0.5, lean: 0.05, poles: false, handOverride: [56, -6], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="d" treeY={g - 200} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,214,150,0.9)">
          <Person {...p} outfit={ZOE} expression="happy" />
          <HandPhone p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2f3a3a" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 200} strength={0.28} col="255,214,150" />
      <Particles seed={2334} n={12} col="#fff3d6" fall={4} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={600} warm="255,214,170" vignette={0.5} />
      <Chip text="Offline map still works" t={t} t0={9.6} x={60} y={150} icon="check" big />
      <Chip text="GPS needs no signal" t={t} t0={10.6} x={60} y={280} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-emergency-checklist-card.jpg"
      photoH={800}
      spec="PRINTABLE · YOUR KIT, CHECKS AND STEPS"
      name={
        <>
          Hiking Emergency
          <br />
          Checklist
        </>
      }
      nameSize={86}
      price="$5.99"
      save="Save this before your next hike"
    />
  );
};

export const V233: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.36} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.28} to={6.01} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.28} />
    </Scene>
    <Scene from={5.93} to={9.28} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.93} />
    </Scene>
    <Scene from={9.2} to={12.0} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={9.2} />
    </Scene>
    <Scene from={11.9} to={16.2} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.28, 1600],
        [3.28, 5.93, 1600],
        [5.93, 9.2, 1600],
        [9.2, 11.9, 1600],
      ]}
    />
  </AbsoluteFill>
);
