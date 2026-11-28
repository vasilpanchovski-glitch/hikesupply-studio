// V234: "The blog said open. It wasn't." Short format (15.8 s, 42 words), cinematic C01 style, forest road in winter.
// Product: Hiking Trip Planner, $5.99 (live Shopify). End card: the real store card image (boxed photo card, as in V42).
// Advice (plain, conservative): trail blogs go out of date; check current road and trail conditions with the park or forest
// office the day before you drive. Gate sign and status page are generic (no agency logos). No numbers beyond the story's "two hours".
// Gate road, car and breath built like V214; phone like V177.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, WinterBackdrop } from "../winter";
import { SnowCar } from "../icy";
import { PlanPage, Room, WindowView } from "../home";
import { INK, PAPER } from "../trip";
import vo from "../vo/v234.json";

const words = vo.words as unknown as Word[];

const FOREST: Sky = { top: "#45698f", mid: "#a8bdd0", low: "#e9e8e2", sun: [790, 560], sunR: 42, sunCol: "#fffaec", glow: "#efe2c8" };
const EVE: Sky = { top: "#2c3f63", mid: "#8a8fae", low: "#e8b894", sun: [300, 780], sunR: 40, sunCol: "#fff0d8", glow: "#ffc89a" };

const NOAH: Outfit = {
  ...GUIDE,
  skin: "#E0AC88",
  skinShade: "#C18D6A",
  hair: "#5a3a22",
  ponytail: null,
  beard: "#5a3a22",
  cap: "#2F5F8A",
  capShade: "#234868",
  jacket: "#B5562E",
  jacketShade: "#8E4123",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  boot: "#5a3e2c",
  sole: "#231d19",
  pack: "#3F6B55",
  packShade: "#2D5141",
  glove: "#2a2a2a",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const Breath: React.FC<{ p: HikerProps; t: number }> = ({ p, t }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const k = (t * 0.5) % 1;
  return (
    <g transform={hikerTransform(p)}>
      <circle cx={hx + 55 + k * 70} cy={hy + 10 - k * 24} r={8 + k * 22} fill="#ffffff" opacity={0.35 * (1 - k)} />
    </g>
  );
};

// Snowy forest road with a locked swing gate and a generic closed sign.
const GateRoad: React.FC<{ y: number; gx?: number; s?: number }> = ({ y, gx = 720, s = 1 }) => (
  <Svg>
    <rect x={-400} y={y - 30} width={1880} height={1400} fill={SNOW} />
    <path d={`M-400,${y + 60} L1480,${y - 10} L1480,${y + 120} L-400,${y + 300} Z`} fill="#6a6f74" />
    <path d={`M-400,${y + 60} L1480,${y - 10} L1480,${y + 30} L-400,${y + 110} Z`} fill={SNOW2} opacity={0.8} />
    <path d={`M-400,${y + 300} L1480,${y + 120} L1480,${y + 150} L-400,${y + 340} Z`} fill={SNOW2} />
    <g transform={`translate(${gx},${y + 60}) scale(${s})`}>
      <rect x={-270} y={-160} width={26} height={180} fill="#5d6166" />
      <rect x={244} y={-170} width={26} height={190} fill="#5d6166" />
      <rect x={-250} y={-150} width={500} height={22} rx={6} fill="#e2b93b" />
      <rect x={-250} y={-80} width={500} height={22} rx={6} fill="#e2b93b" />
      <path d="M-240,-62 L240,-140" stroke="#c99f2a" strokeWidth={16} />
      <path d="M-252,-150 Q-120,-170 0,-158 Q120,-170 252,-152" stroke={SNOW} strokeWidth={12} fill="none" strokeLinecap="round" />
      <g transform="translate(232,-110)">
        <path d="M-14,-30 q-14,30 0,60 M14,-30 q14,30 0,60" stroke="#8a8f94" strokeWidth={6} fill="none" />
        <rect x={-22} y={20} width={44} height={40} rx={6} fill="#3a3d40" />
        <path d="M-12,22 v-14 a12,12 0 0 1 24,0 v14" stroke="#8a8f94" strokeWidth={6} fill="none" />
      </g>
      <rect x={-8} y={-290} width={16} height={140} fill="#5d6166" />
      <rect x={-200} y={-420} width={400} height={150} rx={10} fill="#c23a32" />
      <rect x={-190} y={-410} width={380} height={130} rx={8} fill="none" stroke="#ffffff" strokeWidth={4} />
      <text x={0} y={-355} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={58} fill="#fff" letterSpacing={3}>
        ROAD CLOSED
      </text>
      <text x={0} y={-302} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={36} fill="#fff" letterSpacing={3}>
        FOR WINTER
      </text>
    </g>
  </Svg>
);

const Phone: React.FC<{ x: number; y: number; s?: number; rot?: number; children: React.ReactNode; uid: string }> = ({ x, y, s = 1, rot = 0, children, uid }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <defs>
      <clipPath id={`pc${uid}`}>
        <rect x={-170} y={-350} width={340} height={700} rx={30} />
      </clipPath>
    </defs>
    <rect x={-190} y={-380} width={380} height={760} rx={50} fill="#1d2126" />
    <g clipPath={`url(#pc${uid})`}>
      <g transform="translate(-170,-350)">{children}</g>
    </g>
    <rect x={-50} y={330} width={100} height={8} rx={4} fill="rgba(255,255,255,0.7)" />
  </g>
);

// Noah's hands holding the phone (screen units).
const Hands: React.FC = () => (
  <g>
    <rect x={360} y={1680} width={440} height={500} rx={120} fill={NOAH.jacket} />
    <ellipse cx={300} cy={1390} rx={64} ry={36} fill={NOAH.skin} transform="rotate(-30 300 1390)" />
    <ellipse cx={780} cy={1410} rx={64} ry={36} fill={NOAH.skinShade} transform="rotate(30 780 1410)" />
    <g transform="translate(850,1800)">
      <rect x={-60} y={-80} width={120} height={300} rx={58} fill={NOAH.skin} />
      <ellipse cx={0} cy={-60} rx={46} ry={40} fill={NOAH.skinShade} opacity={0.4} />
    </g>
  </g>
);

const GREEN = "#3e7d4f";
const RED = "#c23a32";

// ============ S1 HOOK WIDE: Noah drives the snowy forest road, blog directions on the dash (0 - 2.7) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 18, y: hh.y, zoom: mix(1.03, 1.1, t / 2.7), rot: hh.rot };
  const y = 1240;
  const cx = 100 + t * 200;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={FOREST} uid="a" treeY={y + 200} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={y + 330} width={1880} height={800} fill={SNOW} />
          <rect x={-400} y={y + 380} width={1880} height={150} fill="#6a6f74" />
          <path d={`M-400,${y + 455} L1480,${y + 455}`} stroke="#e9d36a" strokeWidth={6} strokeDasharray="60 40" />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,215,0.85)">
          <SnowCar x={cx} y={y + 500} s={2.2} body="#3f5f7a" shade="#2e4659" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={FOREST.sun[0]} y={FOREST.sun[1]} strength={0.22} col="255,246,225" />
      <Particles seed={2341} n={16} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,240,222" cool="40,60,90" />
      <Title text={"The blog said\nopen. It wasn't."} t={t} t0={0} top={110} size={124} />
      <Chip text="A trail blog from last summer" t={t} t0={1.2} x={60} y={430} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: two hours later, Noah at the locked gate (2.7 - 5.3) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.6), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 380, y: g + 270, scale: 2.4, walk: 0, lean: -0.04, poles: false, handOverride: [60, 20], breathe: Math.sin(t * 2) * 1.4 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={FOREST} uid="b" treeY={g - 80} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <GateRoad y={g} gx={790} s={0.95} />
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={NOAH} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={2342} n={20} col="#ffffff" fall={22} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="250,242,232" cool="40,60,90" />
      <Readout label="DRIVE" value="2 HOURS" ok={null} t={t} t0={3.1} x={60} y={170} />
      <Chip text="Closed for winter" t={t} t0={4.2} x={60} y={420} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the rule, current conditions on the phone (5.3 - 8.95) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.8], [1.12, 1.03], outExpo) + lt * 0.01, rot: hh.rot };
  const rows = at(t, [6.3, 6.8], [0, 1]);
  const upd = at(t, [7.3, 7.8], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#141824" }}>
      <Plane cam={cam} depth={0.5} blur={16}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#3a4658" />
          <circle cx={820} cy={460} r={420} fill="#ffd9a8" opacity={0.16} />
          <circle cx={180} cy={320} r={110} fill="#e8f0ff" opacity={0.2} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(220,235,255,0.6)">
          <Svg>
            <Phone x={540} y={1040} s={1.3} rot={-3} uid="c">
              <rect x={0} y={0} width={340} height={700} fill="#f4f6f8" />
              <rect x={0} y={0} width={340} height={110} fill="#2C3B2E" />
              <text x={24} y={62} fontFamily={HEAD} fontWeight={800} fontSize={32} fill={PAPER} letterSpacing={2}>
                CURRENT
              </text>
              <text x={24} y={96} fontFamily={HEAD} fontWeight={800} fontSize={32} fill={PAPER} letterSpacing={2}>
                CONDITIONS
              </text>
              <rect x={20} y={136} width={300} height={56} rx={12} fill="#e3f0e6" opacity={upd} />
              <circle cx={46} cy={164} r={10} fill={GREEN} opacity={upd} />
              <text x={68} y={173} fontFamily="Inter" fontWeight={700} fontSize={22} fill={INK} opacity={upd}>
                Updated today
              </text>
              {[
                ["Forest road", "Gate closed", RED],
                ["Trailhead", "Snow, no plowing", "#c2662e"],
                ["Reopens", "Late spring", INK],
              ].map(([a, b, c], i) => (
                <g key={i} opacity={Math.max(0, Math.min(1, rows * 3 - i))}>
                  <text x={24} y={250 + i * 110} fontFamily="Inter" fontWeight={500} fontSize={21} fill="#5b625c">
                    {a}
                  </text>
                  <text x={24} y={290 + i * 110} fontFamily="Inter" fontWeight={700} fontSize={27} fill={c}>
                    {b}
                  </text>
                  <line x1={24} y1={312 + i * 110} x2={316} y2={312 + i * 110} stroke="#dfe3e6" strokeWidth={3} />
                </g>
              ))}
              {[0, 1].map((i) => (
                <rect key={i} x={24} y={590 + i * 44} width={i ? 170 : 280} height={16} rx={6} fill="#cfd5da" />
              ))}
            </Phone>
            <Hands />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2343} n={10} col="#e8f0ff" fall={4} bokeh />
      <Grade sunX={800} sunY={480} warm="250,236,220" cool="30,40,70" vignette={0.55} />
      <Chip text="The rule" t={t} t0={5.45} x={60} y={170} icon="none" big />
      <Chip text="Check current conditions" t={t} t0={6.2} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the day before, at home, the plan page (8.95 - 11.5) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.55), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={8}>
        <WindowView x={520} y={220} w={600} h={640} sky={EVE} uid="d" />
        <Room floorY={2000} win={[520, 220, 600, 640]} lamp={[160, 420]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={1300} width={1480} height={800} fill="#7a573c" />
          <rect x={-200} y={1300} width={1480} height={16} fill="#8e6849" />
        </Svg>
        <Subject rimX={4} col="rgba(255,226,180,0.7)">
          <Svg>
            <g transform="translate(170,470) rotate(-2) scale(1.3)">
              <PlanPage x={0} y={0} w={560} rows={[["Checked with", "Forest office"], ["When", "The day before"], ["Gate", "Open"]]} t={t} t0={9.0} gap={0.55} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <Svg>
          <rect x={760} y={1500} width={300} height={500} rx={40} fill={NOAH.jacket} transform="rotate(-18 900 1700)" />
        </Svg>
      </Plane>
      <Particles seed={2344} n={10} col="#ffe2c8" fall={3} bokeh />
      <LowScrim />
      <Grade sunX={300} sunY={600} warm="255,214,170" cool="30,40,70" vignette={0.55} />
      <Chip text="The day before" t={t} t0={9.4} x={60} y={170} icon="check" big />
      <Chip text="Not an old post" t={t} t0={10.2} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-trip-planner-card.jpg"
      photoH={800}
      spec="PRINTABLE · ONE PAGE PER HIKE"
      name={
        <>
          Hiking Trip
          <br />
          Planner
        </>
      }
      nameSize={104}
      price="$5.99"
      save="Save this before you drive out"
    />
  );
};

export const V234: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.78} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.7} to={5.38} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.7} />
    </Scene>
    <Scene from={5.3} to={9.03} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.3} />
    </Scene>
    <Scene from={8.95} to={11.6} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={8.95} />
    </Scene>
    <Scene from={11.5} to={15.8} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.7, 1600],
        [2.7, 5.3, 1600],
        [5.3, 8.95, 1600],
        [8.95, 11.5, 1600],
      ]}
    />
  </AbsoluteFill>
);
