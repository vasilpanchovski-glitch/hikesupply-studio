// V107: "She turned back 300 feet below the summit." in the cinematic C01 style. Turnaround-time story for the Peak Bagger's
// Logbook (p14), posted Dec 3. Advice exactly as in the logbook's safety page: in the Colorado summer thunderstorms often build by
// early afternoon, set a turnaround time and keep it, start early. Each log card has "Summit" and "Turned back" boxes. $6.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { Desk } from "../trip";
import { LogCard } from "../peak";
import vo from "../vo/v107.json";

const words = vo.words as unknown as Word[];

const NOON: Sky = { top: "#3f6f9e", mid: "#9fbcd2", low: "#e6e4da", sun: [300, 420], sunR: 46, sunCol: "#fffbe8", glow: "#f1ecd8" };
const DARK: Sky = { top: "#2f3a48", mid: "#5f6b78", low: "#a3a7a8", sun: [300, 420], sunR: 30, sunCol: "#d9dcdc", glow: "#b8bcbc" };
const DAWN: Sky = { top: "#2f4f78", mid: "#c99288", low: "#ffd0a0", sun: [820, 900], sunR: 58, sunCol: "#fff0cc", glow: "#ffb47a" };
const LAMP = "255,200,140";

const ANA: Outfit = {
  ...JAKE,
  skin: "#C8906A",
  skinShade: "#A87452",
  hair: "#2a1a12",
  ponytail: "#2a1a12",
  beard: null,
  cap: "#2C6E63",
  capShade: "#1f5249",
  jacket: "#C9A23E",
  jacketShade: "#a5832c",
  pants: "#3a3d42",
  pantsShade: "#2a2c30",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};

// Towering cumulus that grows with k (0..1); base at y.
const Tower: React.FC<{ x: number; y: number; s: number; k: number; dark: number }> = ({ x, y, s, k, dark }) => {
  const puffs: [number, number, number][] = [
    [-200, 0, 150],
    [0, -20, 180],
    [210, 0, 150],
    [-110, -170, 150],
    [110, -190, 160],
    [0, -330, 160],
    [-60, -470, 130],
    [70, -520, 120],
    [0, -640, 110],
  ];
  const n = Math.max(3, Math.round(3 + k * (puffs.length - 3)));
  const top = mix(220, 255, 1 - dark);
  const bot = mix(120, 200, 1 - dark);
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {puffs.slice(0, n).map(([px, py, r], i) => (
        <circle key={i} cx={px} cy={py * mix(0.6, 1, k)} r={r} fill={`rgb(${top},${top},${top + 4})`} />
      ))}
      <ellipse cx={0} cy={60} rx={380} ry={110} fill={`rgb(${bot},${bot + 4},${bot + 10})`} />
    </g>
  );
};

const Bolt: React.FC<{ x: number; y: number; s?: number; k: number }> = ({ x, y, s = 1, k }) =>
  k <= 0 ? null : (
    <g transform={`translate(${x},${y}) scale(${s})`} opacity={k}>
      <path d="M0,0 L-40,140 L10,150 L-50,320 L-10,330 L-70,520" stroke="#fffbe0" strokeWidth={16} fill="none" strokeLinejoin="round" />
      <path d="M0,0 L-40,140 L10,150 L-50,320 L-10,330 L-70,520" stroke="#ffffff" strokeWidth={6} fill="none" strokeLinejoin="round" />
    </g>
  );

// Alpine world above treeline: sky, far peaks, haze, the summit cone, tree line far below.
const Alpine: React.FC<{ cam: Cam; sky: Sky; uid: string; y: number; t: number; storm: number; blur?: number; grow: number }> = ({ cam, sky, uid, y, t, storm, blur = 0, grow }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Svg>
        <Tower x={760} y={y - 640} s={1.1} k={grow} dark={storm} />
      </Svg>
      <Clouds y={520} col="#ffffff" seed={21} drift={t * 10} opacity={0.35 * (1 - storm)} />
      <Clouds y={430} col="#4a525b" seed={27} drift={t * 30} opacity={storm * 0.7} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2.6 + blur}>
      <Ridge seed={91} base={y - 380} amp={420} scale={260} col={storm > 0.5 ? "#6d7682" : "#8f9fb2"} lit={storm > 0.5 ? undefined : "#eef2f5"} peak={180} />
    </Plane>
    <Haze y={y - 560} h={360} col={sky.low} opacity={0.55} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Svg>
        <path d={`M-400,${y - 120} L380,${y - 760} Q470,${y - 820} 560,${y - 760} L1480,${y - 160} L1480,2600 L-400,2600 Z`} fill={storm > 0.5 ? "#6a645a" : "#8a7e6a"} />
        <path d={`M380,${y - 760} Q470,${y - 820} 560,${y - 760} L700,${y - 640} L480,${y - 700} Z`} fill="#ffffff" opacity={0.18} />
      </Svg>
    </Plane>
  </>
);

// Talus slope near the camera, rising to the right.
const Talus: React.FC<{ y: number; shift: number; tilt?: number }> = ({ y, shift, tilt = 0.12 }) => {
  const Y = (x: number) => y - tilt * (x - 540);
  return (
    <Svg>
      <path d={`M-400,${Y(-400)} L1480,${Y(1480)} L1480,2600 L-400,2600 Z`} fill="#7d7464" />
      <path d={`M-400,${Y(-400) + 6} L1480,${Y(1480) + 6} L1480,${Y(1480) + 60} L-400,${Y(-400) + 60} Z`} fill="#948a76" />
      {Array.from({ length: 16 }, (_, i) => {
        const x = ((((i * 150 - shift) % 2400) + 2400) % 2400) - 400;
        const yy = Y(x) + 90 + ((i * 97) % 420);
        return (
          <g key={i}>
            <path d={`M${x - 70},${yy} L${x - 30},${yy - 46} L${x + 40},${yy - 40} L${x + 76},${yy + 4} Z`} fill={i % 2 ? "#6a6256" : "#5d564c"} />
            <path d={`M${x - 30},${yy - 46} L${x + 40},${yy - 40} L${x + 10},${yy - 20} Z`} fill="#a59a84" opacity={0.6} />
          </g>
        );
      })}
    </Svg>
  );
};

// ============ S1 HOOK MEDIUM: Ana on the ridge, summit close, clouds building (0 - 5.35) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.02, 1.1, t / 5.35), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 380, y: g + 20, scale: 2.3, walk: 0, lean: 0.06, poles: true, handOverride: [40, 30], breathe: Math.sin(t * 2.6) * 2 };
  return (
    <AbsoluteFill>
      <Alpine cam={cam} sky={NOON} uid="a" y={g} t={t} storm={at(t, [2.5, 5.3], [0.1, 0.4])} grow={at(t, [0, 5.3], [0.3, 0.7])} blur={1.2} />
      <Plane cam={cam} depth={1}>
        <Talus y={g} shift={cam.x} />
        <Subject rimX={-5} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={ANA} expression="neutral" flip />
        </Subject>
      </Plane>
      <Particles seed={1071} n={14} col="#ffffff" fall={-10} />
      <Grade sunX={300} sunY={420} cool="120,140,170" />
      <Title text={"She turned back\n300 feet below\nthe summit."} t={t} t0={0} top={120} size={112} />
      <Chip text="300 ft to the top" t={t} t0={1.0} x={60} y={600} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: her watch, barely noon (5.35 - 6.83) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.14, lt / 1.48), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Alpine cam={cam} sky={NOON} uid="b" y={1600} t={t} storm={0.45} grow={0.75} blur={10} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(255,240,210,0.8)">
          <g transform="rotate(-18 540 1100)">
            <rect x={-200} y={960} width={1100} height={300} rx={140} fill={ANA.jacket} />
            <rect x={640} y={1010} width={260} height={200} rx={60} fill={ANA.skin} />
            <rect x={860} y={980} width={250} height={250} rx={110} fill={ANA.skin} />
            <rect x={900} y={990} width={150} height={60} rx={30} fill={ANA.skinShade} opacity={0.5} />
            <rect x={620} y={960} width={60} height={300} rx={20} fill={ANA.jacketShade} />
            <rect x={710} y={1000} width={40} height={220} fill="#2a2a2a" />
            <rect x={790} y={1000} width={40} height={220} fill="#2a2a2a" />
            <rect x={700} y={1000} width={140} height={220} rx={34} fill="#1d1f22" />
            <rect x={714} y={1016} width={112} height={188} rx={24} fill="#0d1a14" />
            <text x={770} y={1124} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={58} fill="#e8f5ec">
              11:58
            </text>
          </g>
        </Subject>
      </Plane>
      <Grade sunX={300} sunY={420} cool="120,140,170" vignette={0.55} />
      <Chip text="Barely noon" t={t} t0={5.4} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: the cloud tower grows over the peak (6.83 - 11.6) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 16, y: hh.y, zoom: mix(1.0, 1.08, lt / 4.77), rot: hh.rot };
  const g = 1560;
  const p: HikerProps = { x: 520, y: g + 30, scale: 1.4, walk: 0, lean: 0.04, poles: true, handOverride: [40, 30] };
  return (
    <AbsoluteFill>
      <Alpine cam={cam} sky={t > 9 ? DARK : NOON} uid="c" y={g} t={t} storm={at(t, [6.9, 10.5], [0.45, 1])} grow={at(t, [6.9, 10.5], [0.75, 1])} />
      <Plane cam={cam} depth={1}>
        <Talus y={g} shift={cam.x} />
        <Subject rimX={-4} col="rgba(220,228,240,0.7)">
          <Person {...p} outfit={ANA} expression="neutral" flip />
        </Subject>
      </Plane>
      <Particles seed={1073} n={18} col="#d8dde2" fall={-20} bokeh={false} />
      <Grade sunX={300} sunY={420} cool="120,140,170" />
      <Readout label="COLORADO SUMMER STORMS OFTEN BUILD BY" value="Early afternoon" ok={false} t={t} t0={7.33} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: Ana's face, a flash on the ridge (11.6 - 14.82) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const flash = at(t, [12.0, 12.1, 12.5], [0, 1, 0]);
  const hh = handheld(t, 0.4, at(t, [12.0, 12.2, 12.8], [0, 0.7, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.22), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 470, y: 1660 + 182 * s, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.6) * 2 };
  return (
    <AbsoluteFill>
      <Alpine cam={cam} sky={DARK} uid="d" y={1500} t={t} storm={1} grow={1} blur={8} />
      <Plane cam={cam} depth={0.1} blur={2}>
        <Svg>
          <Bolt x={860} y={260} s={1.2} k={flash} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(220,228,240,0.75)">
          <Person {...p} outfit={ANA} expression="tired" />
        </Subject>
      </Plane>
      <AbsoluteFill style={{ background: `rgba(240,245,255,${flash * 0.45})` }} />
      <Particles seed={1074} n={16} col="#d8dde2" fall={-30} bokeh={false} />
      <Grade sunX={800} sunY={300} cool="120,140,170" vignette={0.62} />
      <Chip text="Lightning on a bare ridge" t={t} t0={11.78} x={60} y={200} icon="x" big />
      <Chip text="No place to be" t={t} t0={13.34} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: flashback, the trailhead at dawn, turnaround time set (14.82 - 17.49) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: mix(1.1, 1.04, lt / 2.67), rot: hh.rot };
  const g = 1480;
  const p: HikerProps = { x: 640, y: g, scale: 2.3, walk: 0, lean: 0.06, poles: false, handOverride: [60, -50], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Alpine cam={cam} sky={DAWN} uid="e" y={g + 200} t={t} storm={0} grow={0} blur={2.5} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 40} width={1880} height={1000} fill="#5a5448" />
          <rect x={-400} y={g - 40} width={1880} height={20} fill="#6e6656" />
          <Car x={240} y={g + 10} s={2.1} body="#5E7E8A" shade="#4a6470" lights />
        </Svg>
        <Subject rimX={6} col="rgba(255,206,150,0.85)">
          <Person {...p} outfit={ANA} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f2a24" side="right" />
      </Plane>
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.26} col="255,210,160" />
      <Particles seed={1075} n={14} col="#ffe7c8" />
      <Grade sunX={820} sunY={900} warm="255,190,130" />
      <Chip text="At the trailhead" t={t} t0={14.85} x={60} y={200} icon="none" big />
      <Readout label="TURNAROUND TIME, SUMMIT OR NOT" value="12:00" ok={true} t={t} t0={15.48} x={60} y={330} />
    </AbsoluteFill>
  );
};

// ============ S6 MEDIUM: she kept it, heading down (17.49 - 18.67) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x - lt * 30, y: hh.y, zoom: mix(1.06, 1.1, lt / 1.18), rot: hh.rot };
  const g = 1520;
  const ph = t * 5;
  const p: HikerProps = { x: 600 - lt * 60, y: g + 20, scale: 2.3, phase: ph, walk: 0.6, lean: -0.02, poles: true };
  return (
    <AbsoluteFill>
      <Alpine cam={cam} sky={DARK} uid="f" y={g} t={t} storm={1} grow={1} blur={1.5} />
      <Plane cam={cam} depth={1}>
        <Talus y={g} shift={cam.x} />
        <Subject rimX={5} col="rgba(220,228,240,0.75)">
          <Person {...p} outfit={ANA} expression="neutral" flip />
        </Subject>
      </Plane>
      <Particles seed={1076} n={18} col="#d8dde2" fall={-30} bokeh={false} />
      <Grade sunX={800} sunY={300} cool="120,140,170" />
      <Chip text="She kept it" t={t} t0={17.5} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: that night, the log card, "Turned back" ticked (18.67 - 23.34) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(-20, 20, lt / 4.67), zoom: mix(1.0, 1.07, lt / 4.67), rot: hh.rot };
  const k = [at(t, [19.4, 19.8], [0, 1]), at(t, [19.8, 20.2], [0, 1]), at(t, [20.2, 20.6], [0, 1]), at(t, [20.6, 21.0], [0, 1])];
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-5} col="rgba(255,230,190,0.85)">
          <LogCard
            x={160}
            y={380}
            w={760}
            no="14ER · FIRST TRY"
            peak="300 FT SHORT"
            date="July 18"
            vals={["Standard route", "Start 6:40 · back 12:00", "Clouds building by noon", "Solo, plan left at home"]}
            k={k}
            tick={[0, at(t, [22.18, 22.6], [0, 1])]}
            hi={-1}
            rot={-2}
          />
        </Subject>
      </Plane>
      <Particles seed={1077} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm={LAMP} vignette={0.55} />
      <Chip text="That night" t={t} t0={18.7} x={60} y={200} icon="none" big />
      <Chip text="Ticked: turned back" t={t} t0={22.2} x={60} y={1340} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: next time, an earlier start, clear sky at dawn (23.34 - 25.1) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 24, y: hh.y, zoom: at(lt, [0, 1.2], [1.14, 1.04], outExpo), rot: hh.rot };
  const g = 1520;
  const ph = t * 4.5;
  const p: HikerProps = { x: 360 + lt * 70, y: g + 20, scale: 2.0, phase: ph, walk: 0.7, lean: 0.1, poles: true };
  return (
    <AbsoluteFill>
      <Alpine cam={cam} sky={DAWN} uid="g" y={g} t={t} storm={0} grow={0} />
      <Plane cam={cam} depth={1}>
        <Talus y={g} shift={cam.x} />
        <Subject rimX={6} col="rgba(255,214,160,0.9)">
          <Person {...p} outfit={ANA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2620" side="left" />
      </Plane>
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.32} col="255,214,160" />
      <Particles seed={1078} n={20} col="#fff0d0" />
      <Grade sunX={820} sunY={900} warm="255,196,140" />
      <Chip text="Next time: start earlier" t={t} t0={23.36} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/peak-baggers-logbook.jpg"
      photoH={720}
      spec="40 PAGES · A LOG CARD FOR EVERY PEAK"
      name={
        <>
          Peak Bagger's
          <br />
          Logbook
        </>
      }
      nameSize={104}
      price="$6.99"
      save="Save this before your next big climb"
    />
  );
};

export const V107: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={5.4} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={5.35} to={6.88} fadeIn={0.08} fadeOut={0.08}>
      <S2 off={5.35} />
    </Scene>
    <Scene from={6.83} to={11.65} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.83} />
    </Scene>
    <Scene from={11.6} to={14.87} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={11.6} />
    </Scene>
    <Scene from={14.82} to={17.54} fadeIn={0.1} fadeOut={0.08}>
      <S5 off={14.82} />
    </Scene>
    <Scene from={17.49} to={18.72} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={17.49} />
    </Scene>
    <Scene from={18.67} to={23.39} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={18.67} />
    </Scene>
    <Scene from={23.34} to={25.2} fadeIn={0.12} fadeOut={0.1}>
      <S8 off={23.34} />
    </Scene>
    <Scene from={25.0} to={29} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 5.35, 1560],
        [5.35, 6.83, 1560],
        [6.83, 11.6, 1560],
        [11.6, 14.82, 1560],
        [14.82, 17.49, 1560],
        [17.49, 18.67, 1560],
        [18.67, 23.34, 1560],
        [23.34, 25.0, 1560],
      ]}
    />
  </AbsoluteFill>
);
