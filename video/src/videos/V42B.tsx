// V42B: v42 "Clocks go back: set a turnaround time" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v42b.json";

const words = vo.words as unknown as Word[];

const DUSK: Sky = { top: "#33466e", mid: "#c98b6a", low: "#f2b47a", sun: [780, 1020], sunR: 56, sunCol: "#ffe6b8", glow: "#ff9a5a" };
const DAY: Sky = { top: "#3a6d9e", mid: "#b9cfe0", low: "#f3e8cc", sun: [830, 560], sunR: 52, sunCol: "#fffbe8", glow: "#ffe2a6" };
const NIGHT: Sky = { top: "#0e1628", mid: "#1d2a44", low: "#3a4660", sun: [820, 1500], sunR: 1, sunCol: "#3a4660", glow: "#3a4660" };
const MORN: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [300, 760], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const JOSH: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#B98262",
  hair: "#3a2a20",
  beard: "#3a2a20",
  cap: "#B5553A",
  capShade: "#8E3F2A",
  jacket: "#3E5F4B",
  jacketShade: "#2E4A39",
  pack: "#4E6B8A",
  packShade: "#3a536c",
};
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e", "#e0b040"];

const mixCol = (a: string, b: string, k: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return "#" + pa.map((v, i) => Math.round(mix(v, pb[i], k)).toString(16).padStart(2, "0")).join("");
};
const skyMix = (a: Sky, b: Sky, k: number): Sky => ({
  top: mixCol(a.top, b.top, k),
  mid: mixCol(a.mid, b.mid, k),
  low: mixCol(a.low, b.low, k),
  sun: [mix(a.sun[0], b.sun[0], k), mix(a.sun[1], b.sun[1], k)],
  sunR: mix(a.sunR, b.sunR, k),
  sunCol: mixCol(a.sunCol, b.sunCol, k),
  glow: mixCol(a.glow, b.glow, k),
});

// ---------- scenery ----------
const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = 440 + (i % 3) * 70;
      return i % 3 === 1 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c="#3b6550" c2="#2b4d3c" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={["#d9963a", "#b9582c", "#e0b040"][i % 3]} c2={["#b77a28", "#94461f", "#b88a2a"][i % 3]} />
      );
    })}
  </Svg>
);

const Trail: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={1000} fill="#76844c" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 6} L1480,${y + 110} Q540,${y + 90} -400,${y + 110} Z`} fill="#b8966c" />
    {Array.from({ length: 12 }, (_, i) => {
      const x = ((((i * 170 - shift) % 2040) + 2040) % 2040) - 400;
      return <circle key={i} cx={x} cy={y + 190 + (i % 3) * 50} r={9} fill={LEAVES[i % 4]} opacity={0.85} />;
    })}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; dark?: number }> = ({ cam, sky, uid, treeY, blur = 0, t, dark = 0 }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col={mixCol("#ffffff", "#2a3550", dark)} seed={9} drift={t * 10} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={83} base={treeY - 280} amp={340} scale={260} col={mixCol("#93a3b8", "#1e2a40", dark)} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.6 * (1 - dark * 0.6)} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={89} base={treeY - 120} amp={230} scale={190} col={mixCol("#6f8577", "#16202f", dark)} />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.4 * (1 - dark * 0.6)} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Night: React.FC<{ k: number }> = ({ k }) => (k <= 0 ? null : <AbsoluteFill style={{ background: `rgba(8,14,32,${0.62 * k})` }} />);

const Stars: React.FC<{ k: number }> = ({ k }) =>
  k <= 0 ? null : (
    <Svg>
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={(i * 263) % 1080} cy={80 + ((i * 151) % 700)} r={1.5 + (i % 3)} fill="#f4f1e6" opacity={k * (0.5 + (i % 4) * 0.12)} />
      ))}
    </Svg>
  );

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Big wristwatch face; hour hand winds back one hour.
const Watch: React.FC<{ back: number }> = ({ back }) => {
  const hourDeg = (5 - back) * 30 + 10; // 5 o'clock -> 4 o'clock
  const minDeg = 60 - back * 360;
  return (
    <Svg>
      <g transform="translate(540,1080)">
        <rect x={-120} y={-470} width={240} height={940} rx={60} fill="#2b2f33" />
        <circle r={300} fill="#1f2326" />
        <circle r={270} fill="#f4f1e6" />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={-7} y={-250} width={14} height={i % 3 === 0 ? 46 : 26} rx={4} fill="#2b2f33" transform={`rotate(${i * 30})`} />
        ))}
        <rect x={-11} y={-150} width={22} height={170} rx={10} fill="#1f2326" transform={`rotate(${hourDeg})`} />
        <rect x={-7} y={-220} width={14} height={240} rx={7} fill="#1f2326" transform={`rotate(${minDeg})`} />
        <circle r={20} fill="#B5553A" />
      </g>
    </Svg>
  );
};

// Phone in the near hand showing today's sunset.
const Phone: React.FC<{ p: HikerProps; k: number }> = ({ p, k }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      <g transform={`translate(${h[0] - 4},${h[1] - 66}) rotate(-8)`}>
        <rect x={0} y={0} width={44} height={80} rx={7} fill="#1b1f23" />
        <rect x={3} y={4} width={38} height={72} rx={5} fill="#f6efe2" />
        <circle cx={22} cy={34} r={8} fill="#F2A541" />
        <rect x={8} y={42} width={28} height={4} fill="#f6efe2" />
        <path d="M8,42 L36,42" stroke="#B5553A" strokeWidth={2.5} />
        <text x={22} y={20} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={8.5} fill="#1f2a24" letterSpacing={0.5}>SUNSET</text>
        <rect x={10} y={54} width={24} height={6} rx={2} fill="#3E8E5A" />
        <rect x={13} y={64} width={18} height={4} rx={2} fill="#c9c3b3" />
      </g>
    </g>
  );
};

// ============ S1 HOOK: last weekend, finished just before dark (0 - 3.7) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: t * 26 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 3.7), rot: hh.rot };
  const g = 1440;
  const ph = t * 5.4;
  const x = 300 + t * 70;
  const p: HikerProps = { x, y: g + 40, scale: 1.9, phase: ph, walk: 0.7, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DUSK} uid="a" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject col="rgba(255,190,120,0.85)">
          <Person {...p} outfit={JOSH} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a1d12" side="right" />
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.22} col="255,190,130" />
      <Particles seed={71} n={22} leaves={LEAVES} fall={40} />
      <Grade sunX={780} sunY={1020} warm="255,160,90" />
      <Title text={"The clocks changed.\nHis plan didn't."} t={t} t0={0} top={130} size={100} />
      <Chip text="Last weekend: back just before dark" t={t} t0={0.64} x={80} y={370} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S2a CLOSE-UP: the watch winds back an hour (3.65 - 7.35) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const back = at(t, [4.45, 5.2], [0, 1]);
  const hh = handheld(t, 0.4, t > 5.15 && t < 5.3 ? 0.8 : 0);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 3.7), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAY} uid="b" treeY={1150} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Watch back={back} />
      </Plane>
      <Particles seed={72} n={14} leaves={LEAVES} fall={30} />
      <Grade sunX={830} sunY={560} vignette={0.65} />
      <Chip text="Today: clocks went back" t={t} t0={3.74} x={80} y={240} icon="none" big />
      <Readout label="SUNSET" value="1 HOUR EARLIER" ok={false} t={t} t0={5.7} x={80} y={370} pulseAt={6.31} />
    </AbsoluteFill>
  );
};

// ============ S2b MEDIUM: same start, same trail, the last mile in the dark (7.3 - 11.9) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const dark = at(t, [8.6, 10.4], [0, 1]);
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 4.6), rot: hh.rot };
  const g = 1460;
  const ph = t * 5;
  const x = 420 + lt * 40;
  const p: HikerProps = { x, y: g + 40, scale: 2.3, phase: ph, walk: 0.6, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={skyMix(DUSK, NIGHT, dark)} uid="c" treeY={g - 80} blur={2.5} t={t} dark={dark} />
      <Stars k={at(t, [9.8, 10.8], [0, 1])} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject rimX={mix(4, 2, dark)} col={dark > 0.5 ? "rgba(170,190,230,0.6)" : "rgba(255,190,120,0.85)"}>
          <Person {...p} outfit={JOSH} expression={dark > 0.5 ? "tired" : "neutral"} />
        </Subject>
      </Plane>
      <Night k={dark * 0.9} />
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#120d08" side="left" />
      </Plane>
      <Grade sunX={780} sunY={1020} vignette={0.5 + dark * 0.2} />
      <Chip text="Same start time" t={t} t0={7.37} x={80} y={240} icon="none" big />
      <Chip text="Same trail" t={t} t0={8.25} x={80} y={370} icon="none" big />
      <Readout label="THE LAST MILE" value="IN THE DARK" ok={false} t={t} t0={10.18} x={80} y={500} pulseAt={11.15} />
    </AbsoluteFill>
  );
};

// ============ S3a CLOSE-UP: here's the fix, check today's sunset (11.85 - 14.2) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 6 + hh.x, y: at(lt, [0, 1.2], [-40, 0]) + hh.y, zoom: mix(1.1, 1.04, lt / 2.35), rot: hh.rot };
  const p: HikerProps = { x: 460, y: 2330, scale: 4.4, walk: 0, lean: 0.12, poles: false, handOverride: [52, -40], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAY} uid="d" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={JOSH} expression="neutral" />
          <Phone p={p} k={at(t, [12.5, 12.8], [0, 1])} />
        </Subject>
      </Plane>
      <Particles seed={73} n={14} leaves={LEAVES} fall={30} />
      <Grade sunX={830} sunY={560} vignette={0.6} />
      <Title text={"Check today's\nsunset."} t={t} t0={12.83} top={200} size={130} />
    </AbsoluteFill>
  );
};

// ============ S3b MEDIUM: set a turnaround time an hour before it (14.15 - 18.05) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.9), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 560, y: g + 40, scale: 2.3, walk: 0, lean: 0.08, poles: false, handOverride: [50, -36], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAY} uid="e" treeY={g - 80} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject>
          <Person {...p} outfit={JOSH} expression="happy" />
          <Phone p={p} k={1} />
        </Subject>
      </Plane>
      <Rays x={DAY.sun[0]} y={DAY.sun[1]} strength={0.18} />
      <Particles seed={74} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={830} sunY={560} />
      <Readout label="TURNAROUND TIME" value="SET" ok={true} t={t} t0={14.66} x={80} y={240} pulseAt={15.46} />
      <Chip text="Back 1 hour before sunset" t={t} t0={16.58} x={80} y={490} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3c WIDE: time comes, turn around, even if the top is close (18.0 - 22.1) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const turned = t >= 19.4;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 12 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 4.1), rot: hh.rot };
  const g = 1460;
  const ph = t * 5;
  const x = turned ? 640 - (t - 19.4) * 80 : 520 + lt * 50;
  const p: HikerProps = { x, y: g + 40, scale: 1.9, phase: ph, walk: t > 19.0 && t < 19.4 ? 0 : 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={skyMix(DAY, DUSK, 0.45)} uid="f" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={0.5} blur={1.4}>
        <Svg>
          {/* the summit, close */}
          <path d="M600,1420 L860,980 L930,1040 L1000,960 L1300,1420 Z" fill="#8a8578" />
          <path d="M860,980 L930,1040 L1000,960 L960,1090 L900,1060 Z" fill="#a9a395" />
          <rect x={996} y={900} width={8} height={70} fill="#4a3526" />
          <path d="M1004,902 l46,14 l-46,14 Z" fill="#B5553A" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject>
          <Person {...p} outfit={JOSH} flip={turned} expression={turned ? "happy" : "neutral"} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Rays x={780} y={760} strength={0.18} col="255,210,150" />
      <Particles seed={75} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={800} sunY={760} warm="255,190,120" />
      <Chip text="Time's up: turn around" t={t} t0={18.72} x={80} y={240} icon="check" big />
      <Chip text="Even if the top is close" t={t} t0={20.11} x={80} y={370} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: next weekend, he started earlier (22.05 - 24.75) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 36 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.04]), rot: hh.rot };
  const g = 1440;
  const ph = t * 5.6;
  const x = 300 + lt * 90;
  const p: HikerProps = { x, y: g + 40, scale: 2.0, phase: ph, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.8) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={MORN} uid="g" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject rimX={-6}>
          <Person {...p} outfit={JOSH} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={MORN.sun[0]} y={MORN.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={76} n={24} col="#ffe7b8" />
      <Grade sunX={300} sunY={760} warm="255,180,100" />
      <Title text={"Earlier start.\nBack in daylight."} t={t} t0={off + 0.1} top={150} size={110} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-trip-planner-card.jpg"
      photoH={760}
      spec="DIGITAL DOWNLOAD · PRINTABLE PLANNER"
      name={
        <>
          Hiking Trip
          <br />
          Planner
        </>
      }
      nameSize={100}
      price="$5.99"
      save="Save this before your next fall hike"
    />
  );
};

export const V42B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.7} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.65} to={7.35} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={3.65} />
    </Scene>
    <Scene from={7.3} to={11.9} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={7.3} />
    </Scene>
    <Scene from={11.85} to={14.2} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={11.85} />
    </Scene>
    <Scene from={14.15} to={18.05} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={14.15} />
    </Scene>
    <Scene from={18.0} to={22.1} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={18.0} />
    </Scene>
    <Scene from={22.05} to={24.75} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={22.05} />
    </Scene>
    <Scene from={24.65} to={29.2} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.65, 1560],
        [3.65, 7.3, 1560],
        [7.3, 11.85, 1560],
        [11.85, 14.15, 1560],
        [14.15, 18.0, 1560],
        [18.0, 22.05, 1560],
        [22.05, 24.65, 1560],
      ]}
    />
  </AbsoluteFill>
);
