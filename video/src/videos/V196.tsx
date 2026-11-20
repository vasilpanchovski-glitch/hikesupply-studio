// V196: "The rock by the falls moved." Short format (17.0 s, 45 words), cinematic C01 style, a Smokies waterfall in December.
// Product: Great Smoky Mountains — Trip Planning Guide, $9.99 (live Shopify). End card = boxed store card (as in V39B).
// Advice (NPS Great Smoky Mountains): never climb on rocks around waterfalls; they are slippery with algae and spray.
// Take the photo from the trail. No numbers, no injury shown (her boot slides, she steps back).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, OVERCAST, Subject, Trail } from "../fall";
import vo from "../vo/v196.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const GRACE: Outfit = {
  ...JAKE,
  skin: "#C98E6A",
  skinShade: "#AA7252",
  hair: "#2b1d16",
  beard: null,
  cap: "#C9A23A",
  capShade: "#a6852c",
  jacket: "#3F6E8C",
  jacketShade: "#2f566e",
  pants: "#4a4238",
  pantsShade: "#383128",
  pack: "#8a3b2c",
  packShade: "#6c2e22",
  glove: "#2a2a2a",
};

const CLIFF = "#4b4f52";
const CLIFF2 = "#373a3d";
const ALGAE = "#4f6b3a";

// Running waterfall: cliff, white water column with moving streaks, plunge pool and mist.
const Falls: React.FC<{ cx: number; top: number; bot: number; w: number; t: number }> = ({ cx, top, bot, w, t }) => {
  const h = bot - top;
  return (
    <g>
      <path d={`M${cx - w * 2.2},${bot + 40} L${cx - w * 1.6},${top - 120} Q${cx},${top - 180} ${cx + w * 1.6},${top - 120} L${cx + w * 2.2},${bot + 40} Z`} fill={CLIFF} />
      <path d={`M${cx - w * 1.6},${top - 120} L${cx - w * 1.2},${bot} L${cx - w * 2.2},${bot + 40} Z`} fill={CLIFF2} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${cx - w * 1.5 + i * w * 0.7},${top + (i % 2) * 120} l${w * 0.4},${h * 0.3}`} stroke={CLIFF2} strokeWidth={10} opacity={0.7} />
      ))}
      <path d={`M${cx - w / 2},${top} Q${cx},${top - 20} ${cx + w / 2},${top} L${cx + w * 0.62},${bot} L${cx - w * 0.62},${bot} Z`} fill="#dfeef2" />
      {Array.from({ length: 14 }, (_, i) => {
        const k = (t * 1.6 + i * 0.137) % 1;
        const x = cx - w * 0.45 + ((i * 37) % 10) * w * 0.09;
        return <rect key={i} x={x} y={top + k * h - 60} width={10} height={120} rx={5} fill={i % 3 ? "#ffffff" : "#b9d3dc"} opacity={0.85 * (1 - Math.abs(k - 0.5))} />;
      })}
      <ellipse cx={cx} cy={bot + 30} rx={w * 1.9} ry={70} fill="#5d8590" />
      <ellipse cx={cx} cy={bot + 20} rx={w * 1.2} ry={40} fill="#cfe3e8" opacity={0.7} />
      {Array.from({ length: 7 }, (_, i) => {
        const k = (t * 0.4 + i * 0.15) % 1;
        return <circle key={i} cx={cx - w + (i * w) / 3} cy={bot - k * 220} r={60 + k * 80} fill="#ffffff" opacity={0.28 * (1 - k)} />;
      })}
    </g>
  );
};

// Wet boulder; film = 0..1 how clearly the green algae film and wet shine show.
const Boulder: React.FC<{ x: number; y: number; w: number; h: number; film?: number }> = ({ x, y, w, h, film = 0.4 }) => (
  <g>
    <path d={`M${x - w / 2},${y} Q${x - w / 2},${y - h} ${x},${y - h} Q${x + w / 2},${y - h} ${x + w / 2},${y} Z`} fill="#6a6e70" />
    <path d={`M${x - w / 2},${y} Q${x - w / 2},${y - h * 0.6} ${x - w * 0.1},${y - h * 0.5} L${x - w * 0.1},${y} Z`} fill="#55595b" />
    <path d={`M${x - w * 0.42},${y - h * 0.55} Q${x},${y - h * 1.02} ${x + w * 0.42},${y - h * 0.55}`} stroke={ALGAE} strokeWidth={h * 0.18} fill="none" opacity={film} strokeLinecap="round" />
    <path d={`M${x - w * 0.18},${y - h * 0.86} Q${x + w * 0.05},${y - h * 0.97} ${x + w * 0.24},${y - h * 0.84}`} stroke="#ffffff" strokeWidth={8} fill="none" opacity={0.6 * film} strokeLinecap="round" />
  </g>
);

const Phone: React.FC<{ x: number; y: number; s: number; rot?: number }> = ({ x, y, s, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-16} y={-28} width={32} height={56} rx={6} fill="#1b1d22" />
    <rect x={-12} y={-23} width={24} height={44} rx={3} fill="#9cc6d6" />
  </g>
);

const handAt = (p: HikerProps): [number, number] => {
  const s = p.scale ?? 1;
  const [hx, hy] = p.handOverride ?? [0, 0];
  return [p.x + hx * s, p.y - 182 * s + hy * s];
};

// ============ S1 HOOK WIDE: the falls, Grace on the trail with her phone up (0 - 2.9) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.03, 1.1, t / 2.9), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 300, y: g + 130, scale: 2.1, walk: 0, lean: -0.04, poles: false, handOverride: [70, -110], breathe: Math.sin(t * 2.2) * 1.4 };
  const [hx, hy] = handAt(p);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="a" treeY={1000} t={t} />
      <Plane cam={cam} depth={0.82} blur={1.2}>
        <Svg>
          <Falls cx={700} top={620} bot={1400} w={170} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          <Boulder x={760} y={g + 40} w={300} h={150} />
          <Boulder x={980} y={g + 70} w={220} h={110} />
        </Svg>
        <Subject rimX={6} col="rgba(255,244,225,0.85)">
          <Person {...p} outfit={GRACE} expression="happy" />
          <Phone x={hx} y={hy - 10} s={2.1} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402f" side="left" />
      </Plane>
      <Rays x={880} y={260} strength={0.22} col="255,246,225" />
      <Particles seed={1961} n={18} col="#ffffff" bokeh />
      <LowScrim />
      <Grade sunX={880} sunY={300} warm="245,238,225" cool="40,60,80" />
      <Title text={"The rock\nby the falls\nmoved."} t={t} t0={0} top={110} size={135} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: she steps off the trail onto the rocks, they look dry (2.9 - 4.35) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.45), rot: hh.rot };
  const g = 1540;
  const ph = t * 3;
  const up = at(t, [3.0, 4.0], [0, 1]);
  const p: HikerProps = { x: mix(260, 470, up), y: g + 150 - up * 120, scale: 2.4, phase: ph, walk: 0.55, lean: 0.12, poles: false, handOverride: [60, -20], breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="b" treeY={900} t={t} blur={4} />
      <Plane cam={cam} depth={0.9} blur={3}>
        <Svg>
          <Falls cx={820} top={-100} bot={1350} w={260} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Trail y={g + 60} />
        <Svg>
          <Boulder x={520} y={g + 160} w={520} h={260} film={0.25} />
          <Boulder x={900} y={g + 120} w={360} h={190} film={0.25} />
        </Svg>
        <Subject rimX={5} col="rgba(230,240,250,0.8)">
          <Person {...p} outfit={GRACE} expression="happy" />
        </Subject>
      </Plane>
      <Particles seed={1962} n={20} col="#ffffff" fall={-20} />
      <LowScrim />
      <Grade sunX={880} sunY={300} warm="240,238,230" cool="40,60,80" />
      <Chip text="Looks dry" t={t} t0={3.05} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: boot on the rock, a green film shows, the boot slides (4.35 - 7.05) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const slip = at(t, [5.6, 5.9], [0, 1]);
  const shake = t > 5.6 ? Math.max(0, 1 - (t - 5.6) * 2.5) : 0;
  const hh = handheld(t, 0.3, shake * 3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 2.7), rot: hh.rot };
  const film = at(t, [4.5, 5.3], [0.2, 1]);
  const back = at(t, [6.2, 6.9], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="c" treeY={800} t={t} blur={10} />
      <Plane cam={cam} depth={0.85} blur={9}>
        <Svg>
          <Falls cx={760} top={-300} bot={1100} w={360} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,1500 Q300,1200 1300,1330 L1300,2400 L-200,2400 Z" fill="#6a6e70" />
          <path d="M-200,1560 Q300,1300 1300,1420 L1300,2400 L-200,2400 Z" fill="#5c6062" />
          <path d="M-100,1440 Q300,1240 1200,1330" stroke={ALGAE} strokeWidth={70} fill="none" opacity={film} strokeLinecap="round" />
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse key={i} cx={80 + i * 140} cy={1350 - Math.sin(i) * 40 + (i % 2) * 30} rx={34} ry={10} fill="#ffffff" opacity={0.5 * film} />
          ))}
          {Array.from({ length: 10 }, (_, i) => {
            const k = (t * 1.3 + i * 0.1) % 1;
            return <circle key={`d${i}`} cx={100 + i * 100} cy={900 + k * 450} r={6} fill="#dfeef2" opacity={0.7 * (1 - k)} />;
          })}
        </Svg>
        <Subject rimX={4} col="rgba(230,240,250,0.7)">
          <g transform={`translate(${-80 + slip * 160 - back * 260},${-10 + slip * 30}) rotate(${slip * 8 - back * 8},560,1300)`}>
            <path d="M300,560 Q380,520 470,560 L500,1090 L280,1090 Z" fill={GRACE.pants} />
            <path d="M330,640 Q360,800 330,960" stroke={GRACE.pantsShade} strokeWidth={10} fill="none" />
            <path d="M240,1060 L520,1060 Q560,1120 700,1160 Q840,1190 850,1260 L850,1300 L220,1300 Z" fill="#5a3f2c" stroke="rgba(0,0,0,0.3)" strokeWidth={4} />
            <path d="M300,1080 L500,1080" stroke="#c9b48e" strokeWidth={10} />
            {[0, 1, 2, 3].map((i) => (
              <path key={i} d={`M${540 + i * 46},${1130 + i * 14} l26,-18`} stroke="#c9b48e" strokeWidth={7} strokeLinecap="round" />
            ))}
            <rect x={210} y={1290} width={650} height={34} rx={14} fill="#2a2522" />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={10}>
        <Svg>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={160 + i * 380} cy={300 + (i % 2) * 260} r={40} fill="#ffffff" opacity={0.18} />
          ))}
        </Svg>
      </Plane>
      <LowScrim />
      <Grade sunX={880} sunY={300} warm="235,238,232" cool="40,60,80" vignette={0.6} />
      <Chip text="Algae + spray" t={t} t0={5.2} x={60} y={200} icon="x" big />
      <Chip text="Slick as ice" t={t} t0={5.9} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: Grace's face, back on the trail, the rule (7.05 - 10.9) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x - lt * 8, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.85), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 560, y: 1700 + 182 * s - 80, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 1.4) * 1.6 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="d" treeY={1150} t={t} blur={8} />
      <Plane cam={cam} depth={0.85} blur={8}>
        <Svg>
          <Falls cx={250} top={300} bot={1500} w={180} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(240,240,235,0.85)">
          <Person {...p} outfit={GRACE} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402f" side="right" />
      </Plane>
      <Particles seed={1964} n={16} col="#ffffff" bokeh />
      <LowScrim />
      <Grade sunX={880} sunY={300} warm="240,236,228" cool="40,60,80" vignette={0.6} />
      <Chip text="The Smokies rule" t={t} t0={7.2} x={60} y={200} icon="none" big />
      <Chip text="Never climb rocks" t={t} t0={8.3} x={60} y={330} icon="x" big />
      <Chip text="around waterfalls" t={t} t0={9.6} x={60} y={460} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: hands frame the falls on the phone, feet on the trail (10.9 - 12.7) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.8), rot: hh.rot };
  const snap = t > 11.9 && t < 12.05 ? 0.6 : 0;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="e" treeY={1050} t={t} blur={6} />
      <Plane cam={cam} depth={0.8} blur={5}>
        <Svg>
          <Falls cx={560} top={520} bot={1320} w={150} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,244,225,0.8)">
          <Svg>
            <path d="M120,1900 Q200,1500 330,1300 L420,1340 Q330,1560 300,1900 Z" fill={GRACE.jacket} />
            <path d="M960,1900 Q880,1500 760,1300 L670,1340 Q760,1560 780,1900 Z" fill={GRACE.jacketShade} />
            <rect x={330} y={760} width={430} height={760} rx={50} fill="#1b1d22" />
            <rect x={354} y={786} width={382} height={708} rx={30} fill="#7f9aa6" />
            <rect x={354} y={786} width={382} height={300} fill="#a9bfcc" />
            <path d="M354,1100 L460,960 L560,1060 L650,940 L736,1060 L736,1494 L354,1494 Z" fill="#4e5f55" />
            <path d="M520,980 L600,980 L615,1360 L505,1360 Z" fill="#e6f1f4" />
            <ellipse cx={560} cy={1380} rx={140} ry={30} fill="#6f99a3" />
            <rect x={354} y={1440} width={382} height={54} fill="rgba(0,0,0,0.35)" />
            <circle cx={545} cy={1467} r={18} fill="#ffffff" />
            <path d="M300,1300 q-40,-40 0,-100 l60,0 l0,140 Z" fill={GRACE.skin} />
            <path d="M790,1300 q40,-40 0,-100 l-60,0 l0,140 Z" fill={GRACE.skinShade} />
          </Svg>
        </Subject>
      </Plane>
      <AbsoluteFill style={{ background: `rgba(255,255,255,${snap})` }} />
      <Particles seed={1965} n={14} col="#ffffff" bokeh />
      <LowScrim />
      <Grade sunX={880} sunY={300} warm="245,238,225" cool="40,60,80" />
      <Chip text="Photo from the trail" t={t} t0={11.0} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/great-smoky-mountains-trip-planning-guide-card.jpg"
      photoH={760}
      spec="DIGITAL DOWNLOAD · DESTINATION GUIDE"
      name={
        <>
          Great Smoky
          <br />
          Mountains Trip
          <br />
          Planning Guide
        </>
      }
      nameSize={78}
      price="$9.99"
      save="Save this before your Smokies trip"
    />
  );
};

export const V196: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.98} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.9} to={4.43} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.9} />
    </Scene>
    <Scene from={4.35} to={7.13} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.35} />
    </Scene>
    <Scene from={7.05} to={10.98} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={7.05} />
    </Scene>
    <Scene from={10.9} to={12.8} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={10.9} />
    </Scene>
    <Scene from={12.7} to={17.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.9, 1600],
        [2.9, 4.35, 1600],
        [4.35, 7.05, 1600],
        [7.05, 10.9, 1600],
        [10.9, 12.7, 1600],
      ]}
    />
  </AbsoluteFill>
);
