// V183: "Two-year-old. Four-mile plan." Short format (16.5 s, 43 words), cinematic C01 style.
// Product: Hiking With Babies & Toddlers — Parent's Guide & Checklists (Printable), $7.99 (live Shopify). End card: the real cover, boxed.
// Advice (common family-hiking guidance, no numbers): toddlers walk from one interesting thing to the next, so pick a short
// loop and turn back while they are still happy.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT, freeHand } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, CLEAR, GOLD, Trail, Subject, FALL } from "../fall";
import vo from "../vo/v183.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const DAN: Outfit = {
  ...JAKE,
  skin: "#D6A07A",
  skinShade: "#B8835F",
  hair: "#2a1d14",
  beard: "#2a1d14",
  cap: "#3E7D4F",
  capShade: "#2f6040",
  jacket: "#2F7F86",
  jacketShade: "#236068",
  pants: "#4a4136",
  pantsShade: "#373027",
};
const ZOE: Outfit = {
  ...JAKE,
  skin: "#E8B898",
  skinShade: "#CA9878",
  hair: "#7a4a22",
  beard: null,
  cap: "#D9443A",
  capShade: "#b0352d",
  jacket: "#E3B23C",
  jacketShade: "#c0952c",
  pants: "#7A4E9A",
  pantsShade: "#5f3b78",
  glove: null,
};

const Rock: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={110} ry={18} fill="rgba(0,0,0,0.25)" />
    <path d="M-100,0 Q-110,-60 -40,-90 Q20,-110 70,-80 Q115,-50 105,0 Z" fill="#8a8a84" />
    <path d="M-60,-70 Q0,-100 60,-76 Q20,-80 -40,-56 Z" fill="#b4b3ac" />
    <path d="M30,-20 Q60,-30 90,-10" stroke="#6e6e68" strokeWidth={5} fill="none" />
  </g>
);

const Sign: React.FC<{ x: number; y: number; s?: number; text: string }> = ({ x, y, s = 1, text }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-10} y={-230} width={20} height={230} fill="#6b4a2e" />
    <rect x={-150} y={-260} width={300} height={90} rx={8} fill="#8a6440" stroke="#5a3e24" strokeWidth={4} />
    <text x={0} y={-202} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={40} fill="#f3e6cf">
      {text}
    </text>
  </g>
);

// ============ S1 HOOK WIDE: Dan and his two-year-old at the four-mile sign (0 - 1.8) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.1, t / 1.8), rot: hh.rot };
  const g = 1500;
  const dan: HikerProps = { x: 520, y: g + 60, scale: 2.1, walk: 0, lean: 0.02, poles: false, handOverride: [40, 70], breathe: Math.sin(t * 2) * 1.5 };
  const zoe: HikerProps = { x: 720, y: g + 70, scale: 1.05, walk: 0, lean: 0.02, poles: false, handOverride: [-40, -20], breathe: Math.sin(t * 3) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="a" treeY={g - 240} t={t} />
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.18} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} />
        <Svg>
          <Sign x={250} y={g + 50} s={1.15} text="LOOP 4 MI" />
        </Svg>
        <Subject rimX={4} col="rgba(255,226,170,0.85)">
          <Person {...dan} outfit={DAN} expression="happy" />
          <Person {...zoe} outfit={ZOE} expression="happy" noPack flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2a1a" side="right" />
      </Plane>
      <Particles seed={1831} n={14} col="#fff1d6" leaves={FALL} fall={20} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,226,170" vignette={0.5} />
      <Title text={"Two-year-old.\nFour-mile\nplan."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: she stops at the first rock (1.8 - 3.75) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.95), rot: hh.rot };
  const g = 1500;
  const zoe: HikerProps = { x: 380, y: g + 80, scale: 2.9, walk: 0, lean: 0.42, poles: false, handOverride: [112, 112], breathe: Math.sin(t * 3) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="b" treeY={g - 300} blur={4} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g - 40} />
        <Subject rimX={5} col="rgba(255,226,170,0.85)">
          <Rock x={700} y={g + 92} s={1.9} />
          <Person {...zoe} outfit={ZOE} expression="happy" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2a1a" side="left" />
      </Plane>
      <Particles seed={1832} n={10} col="#fff1d6" fall={5} bokeh />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,226,170" vignette={0.5} />
      <Chip text="The first rock" t={t} t0={2.6} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: every rock after, Dan waits (3.75 - 5.7) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 20, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.95), rot: hh.rot };
  const g = 1480;
  const hop = at(t, [4.3, 4.9], [0, 1]);
  const ph = t * 7;
  const zoe: HikerProps = { x: mix(440, 600, hop), y: g + 50, scale: 1.1, phase: ph, walk: hop > 0 && hop < 1 ? 1 : 0, lean: hop >= 1 ? 0.3 : 0.05, poles: false, handOverride: hop >= 1 ? [50, 40] : freeHand(ph, hop > 0 ? 1 : 0) };
  const dan: HikerProps = { x: 880, y: g + 40, scale: 2.0, walk: 0, lean: 0, poles: false, handOverride: [-10, 20], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="c" treeY={g - 250} blur={1} t={t} />
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.16} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 30} />
        <Svg>
          {[[120, 1560, 0.9], [300, 1520, 0.6], [470, 1545, 0.7], [680, 1550, 0.8], [1000, 1580, 1.0]].map(([x, y, s], i) => (
            <Rock key={i} x={x} y={y} s={s} />
          ))}
        </Svg>
        <Subject rimX={4} col="rgba(255,226,170,0.85)">
          <Person {...dan} outfit={DAN} expression="tired" flip />
          <Person {...zoe} outfit={ZOE} expression="happy" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2a1a" side="right" />
      </Plane>
      <Particles seed={1833} n={14} col="#fff1d6" leaves={FALL} fall={20} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,226,170" vignette={0.5} />
      <Chip text="Every rock after" t={t} t0={4.3} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the next thing, a pinecone, not the summit (5.7 - 8.35) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 2.65), rot: hh.rot };
  const g = 1500;
  const lift = at(t, [6.0, 6.6], [0, 1]);
  const zoe: HikerProps = { x: 420, y: g + 330, scale: 3.2, walk: 0, lean: 0.04, poles: false, handOverride: [mix(70, 60, lift), mix(40, -60, lift)], breathe: Math.sin(t * 3) * 1.5 };
  // pinecone in the near hand (local hand -> screen)
  const hx = zoe.x + zoe.handOverride![0] * 3.2;
  const hy = zoe.y - 182 * 3.2 + zoe.handOverride![1] * 3.2;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="d" treeY={g - 420} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g - 120} />
        <Subject rimX={5} col="rgba(255,214,150,0.9)">
          <Person {...zoe} outfit={ZOE} expression="happy" noPack />
          <g transform={`translate(${hx + 20},${hy - 30}) scale(0.75)`}>
            <ellipse cx={0} cy={0} rx={44} ry={66} fill="#7a4e2c" />
            {[-40, -15, 10, 35].map((y) => (
              <path key={y} d={`M-40,${y} Q0,${y + 18} 40,${y}`} stroke="#5a3a20" strokeWidth={6} fill="none" />
            ))}
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2a1a" side="both" />
      </Plane>
      <Particles seed={1834} n={12} col="#fff1d6" leaves={FALL} fall={16} />
      <LowScrim />
      <Grade sunX={740} sunY={660} warm="255,214,150" vignette={0.5} />
      <Chip text="The next thing" t={t} t0={6.2} x={60} y={200} icon="check" big />
      <Chip text="Not the summit" t={t} t0={7.3} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: the short loop, heading back while she's happy (8.35 - 12.05) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.7), rot: hh.rot };
  const g = 1460;
  const ph = t * 5;
  const x0 = mix(300, 470, lt / 3.7);
  const dan: HikerProps = { x: x0, y: g + 182 * 2.4 - 180, scale: 2.4, phase: ph, walk: 0.8, lean: 0.04, poles: false, handOverride: [40, 70] };
  const zoe: HikerProps = { x: x0 + 190, y: g + 182 * 2.4 - 170, scale: 1.25, phase: ph * 1.4, walk: 1, lean: 0.04, poles: false, handOverride: [-30, -40] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="e" treeY={g - 220} blur={1.5} t={t} />
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.24} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 200} />
        <Svg>
          <Sign x={930} y={g + 220} s={1.1} text="SHORT LOOP" />
        </Svg>
        <Subject rimX={5} col="rgba(255,214,150,0.9)">
          <Person {...dan} outfit={DAN} expression="happy" />
          <Person {...zoe} outfit={ZOE} expression="happy" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2a1a" side="left" />
      </Plane>
      <Particles seed={1835} n={16} col="#fff1d6" leaves={FALL} fall={16} />
      <LowScrim />
      <Grade sunX={740} sunY={660} warm="255,214,150" vignette={0.5} />
      <Chip text="The rule" t={t} t0={8.55} x={60} y={200} icon="none" big />
      <Chip text="Pick a short loop" t={t} t0={9.4} x={60} y={330} icon="check" big />
      <Chip text="Turn back while she's happy" t={t} t0={10.3} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-with-babies-toddlers-guide.jpg"
      photoH={800}
      spec="24 PRINTABLE PAGES · BIRTH TO ABOUT AGE 4"
      name={
        <>
          Hiking With
          <br />
          Babies & Toddlers
        </>
      }
      nameSize={86}
      price="$7.99"
      save="Save this for your family hike"
    />
  );
};

export const V183: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={1.88} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={1.8} to={3.85} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={1.8} />
    </Scene>
    <Scene from={3.75} to={5.8} fadeIn={0.06} fadeOut={0.1}>
      <S3 off={3.75} />
    </Scene>
    <Scene from={5.7} to={8.45} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={5.7} />
    </Scene>
    <Scene from={8.35} to={12.1} fadeIn={0.06} fadeOut={0.12}>
      <S5 off={8.35} />
    </Scene>
    <Scene from={12.0} to={16.5} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 1.8, 1600],
        [1.8, 3.75, 1600],
        [3.75, 5.7, 1600],
        [5.7, 8.35, 1600],
        [8.35, 12.0, 1600],
      ]}
    />
  </AbsoluteFill>
);
