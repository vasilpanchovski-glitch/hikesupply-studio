// V179: "Dark by five. The car won't start." Short format (16.0 s, 40 words), cinematic C01 style.
// Product: Hiking Emergency Checklist, $5.99 (live Shopify). End card: the real store card photo, boxed.
// Advice (standard winter driving and hiking practice, no numbers): keep a winter bag in the car with a warm layer,
// water, snacks, a light and a charged power bank, and tell someone your plan before you go.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Sky, Svg } from "../cine";
import { WinterBackdrop } from "../winter";
import { IceLot, SnowCar } from "../icy";
import { Subject } from "../fall";
import vo from "../vo/v179.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const NIGHT: Sky = { top: "#0f1830", mid: "#28345a", low: "#5a5a78", sun: [820, 1500], sunR: 1, sunCol: "#5a5a78", glow: "#5a5a78" };
const CARC = { body: "#5d7488", shade: "#465a6c" };
const RED = "#d9443a";
const GREEN = "#3e7d4f";

const MAYA: Outfit = {
  ...GUIDE,
  skin: "#8D5B3E",
  skinShade: "#714630",
  hair: "#18110c",
  ponytail: "#18110c",
  beard: null,
  cap: "#B83A55",
  capShade: "#922b42",
  jacket: "#2F7F86",
  jacketShade: "#236068",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  glove: null,
};

// ============ S1 HOOK WIDE: dark trailhead lot, Maya at her snowy car (0 - 2.0) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.1, t / 2.0), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 300, y: g + 60, scale: 2.1, walk: 0, lean: 0.04, poles: false, handOverride: [80, 40], breathe: Math.sin(t * 3) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="a" treeY={g - 200} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <IceLot y={g} shine={0.3} glaze={0.3} />
        <Svg>
          <SnowCar x={760} y={g + 20} s={3.0} body={CARC.body} shade={CARC.shade} open={1} />
        </Svg>
        <Subject rimX={4} col="rgba(170,190,230,0.7)">
          <Person {...p} outfit={MAYA} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0a0e14" side="right" />
      </Plane>
      <Particles seed={1791} n={22} col="#e6eefb" fall={12} />
      <LowScrim />
      <Grade sunX={540} sunY={400} warm="170,190,230" cool="10,15,40" vignette={0.6} />
      <Title text={"Dark by five.\nThe car\nwon't start."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: inside the car, key turns, battery light, nothing (2.0 - 3.95) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const turn = at(t, [2.3, 2.5], [0, 1], outExpo) - at(t, [3.0, 3.2], [0, 1]) + at(t, [3.4, 3.55], [0, 1], outExpo);
  const hh = handheld(t, 0.3, turn > 0.9 ? 1 : 0);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.12, lt / 1.95), rot: hh.rot };
  const blink = Math.sin(t * 14) > 0 ? 1 : 0.35;
  return (
    <AbsoluteFill style={{ background: "#0b0f18" }}>
      <Plane cam={cam} depth={0.4} blur={12}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={900} fill="#1a2440" />
          {Array.from({ length: 10 }, (_, i) => (
            <circle key={i} cx={(i * 137) % 1080} cy={200 + ((i * 71) % 400)} r={6} fill="#e6eefb" opacity={0.4} />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(170,190,230,0.6)">
          <Svg>
            {/* dashboard */}
            <path d="M-200,700 Q540,560 1280,700 L1280,2200 L-200,2200 Z" fill="#1f2328" />
            <rect x={140} y={760} width={800} height={360} rx={160} fill="#14171b" />
            {[340, 740].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy={940} r={150} fill="#0c0e11" stroke="#3a4048" strokeWidth={8} />
                <line x1={cx} y1={940} x2={cx - 90} y2={990} stroke="#e8e8e8" strokeWidth={8} strokeLinecap="round" />
              </g>
            ))}
            {/* battery warning */}
            <g transform="translate(540,880)" opacity={blink}>
              <rect x={-46} y={-30} width={92} height={60} rx={8} fill="none" stroke={RED} strokeWidth={8} />
              <rect x={-30} y={-44} width={14} height={14} fill={RED} />
              <rect x={16} y={-44} width={14} height={14} fill={RED} />
              <text x={-26} y={14} fontFamily={HEAD} fontWeight={800} fontSize={36} fill={RED}>
                − +
              </text>
            </g>
            {/* steering column and ignition with key */}
            <path d="M340,1900 L460,1180 L620,1180 L740,1900 Z" fill="#2a2f35" />
            <circle cx={820} cy={1200} r={60} fill="#3a4048" />
            <g transform={`rotate(${turn * 50} 820 1200)`}>
              <rect x={808} y={1080} width={24} height={110} rx={6} fill="#c9ccd0" />
              <rect x={780} y={1020} width={80} height={80} rx={20} fill="#2a2e34" />
            </g>
            {/* her gloved-less hand on the key */}
            <g transform={`rotate(${turn * 50} 820 1200)`}>
              <ellipse cx={890} cy={1070} rx={90} ry={60} fill={MAYA.skin} />
              <rect x={900} y={1070} width={240} height={140} rx={60} fill={MAYA.jacket} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1792} n={8} col="#e6eefb" fall={4} bokeh />
      <Grade sunX={540} sunY={900} warm="170,190,230" cool="10,15,40" vignette={0.65} />
      <Chip text="Won't start" t={t} t0={2.4} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// The winter bag (duffel), seen from above when open. screen units, centre x,y. open 0..1
const WinterBag: React.FC<{ x: number; y: number; s?: number; open?: number; children?: React.ReactNode }> = ({ x, y, s = 1, open = 1, children }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={250} rx={470} ry={50} fill="rgba(0,0,0,0.35)" />
    <rect x={-440} y={-240} width={880} height={480} rx={90} fill="#C2662E" />
    <rect x={-400} y={-200} width={800} height={400} rx={70} fill="#2a2420" opacity={open} />
    <g opacity={open}>{children}</g>
    <path d="M-440,-60 Q-560,0 -440,60 M440,-60 Q560,0 440,60" stroke="#9B4E20" strokeWidth={26} fill="none" />
    <rect x={-400} y={-240} width={800} height={30} rx={14} fill="#9B4E20" />
  </g>
);

// ============ S3 MEDIUM: Maya at the open trunk, the winter bag waiting there (3.95 - 6.21) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.3), rot: hh.rot };
  const g = 1460;
  const reach = at(t, [4.8, 5.5], [0, 1], outExpo);
  const p: HikerProps = { x: 260, y: g + 182 * 2.3 - 120, scale: 2.3, walk: 0, lean: 0.1, poles: false, handOverride: [mix(60, 150, reach), mix(30, -20, reach)], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={NIGHT} uid="c" treeY={g - 160} blur={2} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <IceLot y={g} shine={0.3} glaze={0.3} />
        <Svg>
          {/* SUV from behind, hatch open, dome light on */}
          <g transform={`translate(720,${g + 80})`}>
            <ellipse cx={0} cy={4} rx={360} ry={22} fill="rgba(0,0,0,0.3)" />
            <path d="M-280,-430 L280,-430 L250,-650 L-250,-650 Z" fill={CARC.body} />
            <path d="M-240,-470 L240,-470 L220,-620 L-220,-620 Z" fill="#2b3640" />
            <path d="M-250,-650 Q0,-690 250,-650 L240,-640 L-240,-640 Z" fill="#f3f6f8" />
            <rect x={-320} y={-440} width={640} height={380} rx={40} fill={CARC.body} />
            <rect x={-270} y={-410} width={540} height={210} rx={14} fill="#3a3326" />
            <circle cx={0} cy={-400} r={160} fill="#ffe6b0" opacity={0.25} />
            <rect x={-270} y={-240} width={540} height={40} fill="#3a332d" />
            <rect x={-200} y={-350} width={300} height={130} rx={34} fill="#C2662E" />
            <rect x={-180} y={-330} width={260} height={14} rx={6} fill="#9B4E20" />
            <rect x={-310} y={-400} width={36} height={90} rx={8} fill="#c43a30" />
            <rect x={274} y={-400} width={36} height={90} rx={8} fill="#c43a30" />
            <rect x={-330} y={-200} width={660} height={60} rx={14} fill="#3a3f44" />
            <rect x={-310} y={-140} width={100} height={140} rx={18} fill="#1f2222" />
            <rect x={210} y={-140} width={100} height={140} rx={18} fill="#1f2222" />
          </g>
        </Svg>
        <Subject rimX={5} col="rgba(255,226,170,0.85)">
          <Person {...p} outfit={MAYA} expression="neutral" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#0a0e14" side="left" />
      </Plane>
      <Particles seed={1793} n={18} col="#e6eefb" fall={12} />
      <LowScrim />
      <Grade sunX={720} sunY={1100} warm="255,220,170" cool="10,15,40" vignette={0.6} />
      <Chip text="The rule" t={t} t0={4.0} x={60} y={200} icon="none" big />
      <Chip text="A winter bag in the car" t={t} t0={4.8} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const Pop: React.FC<{ t: number; t0: number; x: number; y: number; children: React.ReactNode }> = ({ t, t0, x, y, children }) => {
  const k = at(t, [t0, t0 + 0.35], [0, 1], outExpo);
  return <g transform={`translate(${x},${y - (1 - k) * 260}) scale(${0.6 + 0.4 * k})`} opacity={k}>{children}</g>;
};

// ============ S4 CLOSE-UP: top view into the bag, each item drops in (6.21 - 9.86) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.08, lt / 3.65), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#1e1a17" }}>
      <Plane cam={cam} depth={0.5} blur={10}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#3a332d" />
          <rect x={-200} y={-200} width={1480} height={300} fill="#2b3640" />
          <circle cx={540} cy={200} r={500} fill="#ffe6b0" opacity={0.12} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,226,170,0.7)">
          <Svg>
            <WinterBag x={540} y={1140} s={1.05}>
              {/* warm layer: folded puffy jacket */}
              <Pop t={t} t0={6.33} x={-200} y={-60}>
                <rect x={-170} y={-110} width={340} height={220} rx={40} fill="#2E64B4" />
                {[-50, 10, 70].map((yy) => (
                  <line key={yy} x1={-160} y1={yy} x2={160} y2={yy} stroke="#234e8f" strokeWidth={8} />
                ))}
              </Pop>
              {/* water bottle */}
              <Pop t={t} t0={7.0} x={130} y={-70}>
                <rect x={-50} y={-130} width={100} height={250} rx={30} fill="#3f8fb0" />
                <rect x={-36} y={-160} width={72} height={44} rx={10} fill="#2b3640" />
              </Pop>
              {/* snacks */}
              <Pop t={t} t0={7.5} x={300} y={-80}>
                <rect x={-60} y={-90} width={120} height={180} rx={14} fill="#d9a34a" />
                <rect x={-60} y={-30} width={120} height={50} fill="#8e3f2a" />
              </Pop>
              {/* light */}
              <Pop t={t} t0={7.95} x={-150} y={120}>
                <rect x={-120} y={-34} width={240} height={68} rx={34} fill="#1f2326" />
                <rect x={-90} y={-14} width={160} height={28} rx={14} fill="#e8f04a" />
              </Pop>
              {/* power bank with cable */}
              <Pop t={t} t0={8.6} x={180} y={120}>
                <rect x={-110} y={-50} width={220} height={100} rx={20} fill="#e3e7ea" />
                {[0, 1, 2, 3].map((i) => (
                  <rect key={i} x={-80 + i * 40} y={-12} width={30} height={24} rx={4} fill={GREEN} />
                ))}
                <path d="M110,0 Q170,0 170,-60" stroke="#e3e7ea" strokeWidth={10} fill="none" />
              </Pop>
            </WinterBag>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1794} n={8} col="#ffe8c0" fall={4} bokeh />
      <Grade sunX={540} sunY={300} warm="255,220,170" vignette={0.55} />
      <Chip text="Warm layer" t={t} t0={6.33} x={60} y={150} icon="check" />
      <Chip text="Water" t={t} t0={7.0} x={60} y={250} icon="check" />
      <Chip text="Snacks" t={t} t0={7.5} x={60} y={350} icon="check" />
      <Chip text="A light" t={t} t0={7.95} x={60} y={450} icon="check" />
      <Chip text="Charged power bank" t={t} t0={8.6} x={60} y={550} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: before the hike, the text that tells someone the plan (9.86 - 11.2) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.35), rot: hh.rot };
  const sent = at(t, [10.3, 10.6], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#141a24" }}>
      <Plane cam={cam} depth={0.5} blur={14}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#2a3346" />
          <circle cx={820} cy={420} r={380} fill="#ffcf9c" opacity={0.15} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(210,230,255,0.6)">
          <Svg>
            <rect x={380} y={1700} width={440} height={500} rx={120} fill={MAYA.jacket} />
            <g transform="translate(540,1060) rotate(-3) scale(1.3)">
              <rect x={-190} y={-380} width={380} height={760} rx={50} fill="#1d2126" />
              <rect x={-170} y={-350} width={340} height={700} rx={30} fill="#f4f6f8" />
              <rect x={-170} y={-350} width={340} height={90} rx={30} fill="#2C3B2E" />
              <text x={0} y={-292} textAnchor="middle" fontFamily="Inter" fontWeight={700} fontSize={24} fill="#fff">
                Mom
              </text>
              <g opacity={sent} transform={`translate(0,${(1 - sent) * 40})`}>
                <rect x={-100} y={-200} width={250} height={150} rx={24} fill={GREEN} />
                <text x={-80} y={-150} fontFamily="Inter" fontWeight={600} fontSize={21} fill="#fff">
                  Hiking Pine Loop.
                </text>
                <text x={-80} y={-118} fontFamily="Inter" fontWeight={600} fontSize={21} fill="#fff">
                  Car at north lot.
                </text>
                <text x={-80} y={-86} fontFamily="Inter" fontWeight={600} fontSize={21} fill="#fff">
                  Back by 4.
                </text>
              </g>
              <rect x={-150} y={240} width={300} height={60} rx={30} fill="#e3e7ea" />
              <circle cx={120} cy={270} r={22} fill={GREEN} />
            </g>
            <ellipse cx={310} cy={1380} rx={64} ry={36} fill={MAYA.skin} transform="rotate(-30 310 1380)" />
            <ellipse cx={776} cy={1400} rx={64} ry={36} fill={MAYA.skinShade} transform="rotate(30 776 1400)" />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1795} n={8} col="#ffe8c0" fall={4} bokeh />
      <Grade sunX={820} sunY={420} warm="255,220,180" vignette={0.55} />
      <Chip text="Tell someone your plan" t={t} t0={9.9} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
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
      save="Save this for winter"
    />
  );
};

export const V179: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.08} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.0} to={4.05} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={2.0} />
    </Scene>
    <Scene from={3.95} to={6.31} fadeIn={0.06} fadeOut={0.1}>
      <S3 off={3.95} />
    </Scene>
    <Scene from={6.21} to={9.96} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={6.21} />
    </Scene>
    <Scene from={9.86} to={11.3} fadeIn={0.06} fadeOut={0.12}>
      <S5 off={9.86} />
    </Scene>
    <Scene from={11.2} to={16.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.0, 1600],
        [2.0, 3.95, 1600],
        [3.95, 6.21, 1600],
        [6.21, 9.86, 1600],
        [9.86, 11.2, 1600],
      ]}
    />
  </AbsoluteFill>
);
