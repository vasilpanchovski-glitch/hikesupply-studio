// V68: "Be bold, start cold" in the cinematic style (C01 kit), winter setting, end card = Winter Hiking Guide (digital).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Pine, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v68.json";

const words = vo.words as unknown as Word[];

const WINTER: Sky = { top: "#3f6e9c", mid: "#a9c3d8", low: "#eef1ee", sun: [800, 560], sunR: 46, sunCol: "#fffdf2", glow: "#f3efe0" };
const STORM: Sky = { top: "#56677a", mid: "#9aa8b3", low: "#d9dde0", sun: [820, 520], sunR: 34, sunCol: "#f4f4ee", glow: "#dde0e0" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 640], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const FLEECE = { jacket: "#B83A55", jacketShade: "#8E2B42" };
const BASE = { jacket: "#5E8FA8", jacketShade: "#4A7389" };
const MAYA: Outfit = {
  ...GUIDE,
  ...FLEECE,
  skin: "#EDBB9C",
  skinShade: "#D29C7C",
  hair: "#5a3322",
  ponytail: "#5a3322",
  beard: null,
  cap: "#D9CBB0",
  capShade: "#B9AA8C",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
  glove: null,
};
const SNOW = "#f3f6f8";

// Snowy pine line.
const SnowWoods: React.FC<{ y: number; shift: number; s?: number }> = ({ y, shift, s = 1 }) => (
  <Svg>
    {Array.from({ length: 11 }, (_, i) => {
      const x = ((((-160 + i * 150 - shift) % 1650) + 1650) % 1650) - 300;
      const h = (460 + (i % 3) * 90) * s;
      const yy = y + (i % 2) * 22;
      return (
        <g key={i}>
          <Pine x={x} y={yy} h={h} c="#2f5446" c2="#24443a" />
          {[0, 1, 2, 3].map((k) => {
            const w = h * (0.42 - k * 0.08);
            const ty = yy - h * 0.12 - k * h * 0.21;
            return <path key={k} d={`M${x - w * 0.8},${ty - 4} Q${x - w * 0.2},${ty - h * 0.06} ${x + w * 0.3},${ty - 6} L${x + w * 0.1},${ty} Z`} fill={SNOW} opacity={0.9} />;
          })}
        </g>
      );
    })}
  </Svg>
);

const SnowGround: React.FC<{ y: number; tilt?: number }> = ({ y, tilt = 0 }) => (
  <Svg>
    <path d={`M-400,${y + tilt * 400} L1480,${y - tilt * 1480} L1480,2600 L-400,2600 Z`} fill="#e9eef1" />
    <path d={`M-400,${y + 30 + tilt * 400} L1480,${y + 30 - tilt * 1480} L1480,2600 L-400,2600 Z`} fill="#dbe3e8" />
    {Array.from({ length: 9 }, (_, i) => (
      <ellipse key={i} cx={-200 + i * 200} cy={y + 90 + (i % 3) * 60 - tilt * (-200 + i * 200)} rx={70} ry={10} fill="#cfd9e0" />
    ))}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#ffffff" seed={5} drift={t * 14} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={13} base={treeY - 260} amp={420} scale={240} col="#b9c7d3" lit="#ffffff" peak={180} />
    </Plane>
    <Haze y={treeY - 430} h={380} col={sky.low} opacity={0.75} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={29} base={treeY - 110} amp={250} scale={170} col="#8ea1ad" lit="#e9f0f4" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.45} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <SnowWoods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Sweat drops near the head.
const Sweat: React.FC<{ p: HikerProps; t: number; on: number }> = ({ p, t, on }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={on}>
      {[0, 1, 2].map((i) => {
        const k = (t * 1.3 + i / 3) % 1;
        return <path key={i} d="M0,-9 Q7,2 0,8 Q-7,2 0,-9 Z" fill="#cfe9f7" stroke="#8fbcd4" strokeWidth={1.5} transform={`translate(${g.head[0] + 30 + i * 12},${g.head[1] - 8 + k * 50})`} opacity={1 - k} />;
      })}
    </g>
  );
};

// Zip pull flash on the chest (close-ups).
const ZipFlash: React.FC<{ p: HikerProps; k: number }> = ({ p, k }) => {
  const g = hikerGeometry(p);
  if (k <= 0 || k >= 1) return null;
  return (
    <g transform={hikerTransform(p)}>
      <circle cx={(g.hip[0] + g.sh[0]) / 2 + 26} cy={(g.hip[1] + g.sh[1]) / 2} r={20 + k * 70} fill="none" stroke="#fff" strokeWidth={4} opacity={1 - k} />
    </g>
  );
};

// ============ S1 HOOK: trailhead, zipped to the chin (0 - 2.95) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, t / 2.95), rot: hh.rot };
  const g = 1420;
  const p: HikerProps = { x: 470, y: g + 182 * 2.3 - 160, scale: 2.3, walk: 0, lean: 0.03, poles: false, handOverride: t < 1.6 ? [mix(34, 40, t / 1.6), mix(10, -70, t / 1.6)] : [40, -70], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINTER} uid="a" treeY={g - 60} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g + 40} />
        <Subject>
          <Person {...p} outfit={MAYA} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f3a30" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.14} />
      <Particles seed={11} n={30} col="#ffffff" fall={70} />
      <Grade sunX={800} sunY={560} warm="255,226,190" cool="30,60,90" />
      <Title text={"You're wearing\ntoo much"} t={t} t0={0} top={150} size={134} />
      <Chip text="Zipped to the chin" t={t} t0={1.4} x={80} y={470} />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: climbing, soaked in sweat (2.9 - 5.25) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.9);
  const cam: Cam = { x: lt * 30 + hh.x, y: -lt * 12 + hh.y, zoom: mix(1.06, 1.12, lt / 2.35), rot: hh.rot - 1.5 };
  const g = 1400;
  const ph = lt * 3.2;
  const p: HikerProps = { x: 420 + lt * 40, y: g + 182 * 2.3 - 150, scale: 2.3, phase: ph, walk: 0.7, lean: 0.24, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINTER} uid="b" treeY={g - 80} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g + 40} tilt={0.06} />
        <Subject>
          <Person {...p} outfit={MAYA} expression="tired" />
          <Sweat p={p} t={t} on={at(t, [3.4, 3.8], [0, 1])} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={12}>
        <FrameLeaves col="#1f3a30" side="left" />
      </Plane>
      <Particles seed={12} n={20} col="#ffffff" fall={60} />
      <Grade sunX={800} sunY={560} warm="255,210,170" cool="30,60,90" />
      <Chip text="20 minutes up" t={t} t0={3.0} x={80} y={240} />
      <Chip text="Soaked in sweat" t={t} t0={4.1} x={80} y={340} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 PROBLEM: windy summit, wet shirt turns ice cold (5.2 - 8.7) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shiver = at(t, [7.0, 7.2, 8.6], [0, 1, 0.6]);
  const hh = handheld(t, 1.1, shiver * 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.1, lt / 3.5), rot: hh.rot };
  const g = 1480;
  const p: HikerProps = { x: 520 + Math.sin(t * 40) * 2 * shiver, y: g + 10, scale: 1.5, walk: 0, lean: -0.02, poles: false, handOverride: [40, -40], breathe: Math.sin(t * 9) * 2 * shiver };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={STORM} uid="c" treeY={g + 160} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g + 30} L300,${g - 40} Q520,${g - 70} 760,${g - 30} L1480,${g + 60} L1480,2600 L-400,2600 Z`} fill="#e3e9ec" />
          <path d={`M-400,${g + 70} L300,${g + 10} Q520,${g - 20} 760,${g + 20} L1480,${g + 100} L1480,2600 L-400,2600 Z`} fill="#cfd8de" />
        </Svg>
        <Subject rimX={-3}>
          <Person {...p} outfit={MAYA} expression="tired" />
        </Subject>
      </Plane>
      {/* blowing snow, sideways */}
      <AbsoluteFill style={{ transform: "rotate(-62deg) scale(1.8)" }}>
        <Particles seed={13} n={60} col="#ffffff" fall={520} bokeh={false} />
      </AbsoluteFill>
      <Grade sunX={820} sunY={520} warm="230,236,240" cool="20,40,70" vignette={0.65} />
      <Chip text="Wind at the summit" t={t} t0={5.6} x={80} y={240} />
      <Chip text="Wet shirt = ice cold" t={t} t0={7.0} x={80} y={340} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 FIX: Be bold, start cold (8.65 - 11.15) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 14 + hh.x, y: at(lt, [0, 2.5], [-100, 0]) + hh.y, zoom: at(lt, [0, 2.5], [1.14, 1.03]), rot: hh.rot };
  const g = 1440;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINTER} uid="d" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g + 30} />
        <Subject>
          <Person x={300} y={g + 40} scale={1.4} walk={0} lean={0.03} poles={false} handOverride={[56, -50]} outfit={{ ...MAYA, ...BASE }} expression="happy" breathe={Math.sin(t * 2.3) * 2} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#1f3a30" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} />
      <Particles seed={14} n={26} col="#ffffff" fall={50} />
      <Grade sunX={800} sunY={560} warm="255,226,190" />
      <Title text={"Be bold,\nstart cold."} t={t} t0={off + 0.15} top={190} size={160} />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: layer off before you sweat (11.1 - 15.1) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 4), rot: hh.rot };
  const off1 = t >= 12.7;
  const p: HikerProps = { x: 620, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: t > 12.0 && t < 13.2 ? [44, -90] : [30, 34], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINTER} uid="e" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={0.8} blur={8}>
        <SnowGround y={1330} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={off1 ? { ...MAYA, ...BASE } : MAYA} expression="happy" />
          <ZipFlash p={p} k={(t - 12.7) / 0.6} />
        </Subject>
      </Plane>
      <Particles seed={15} n={18} col="#ffffff" fall={40} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.6} />
      <Chip text="Start a little chilly" t={t} t0={11.3} x={80} y={1160} icon="check" />
      <Chip text="Layer off before you sweat" t={t} t0={12.8} x={80} y={1260} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: warm layer back on when you stop (15.05 - 17.7) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.65), rot: hh.rot };
  const on = t >= 15.9;
  const p: HikerProps = { x: 600, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: t > 15.3 && t < 16.4 ? [44, -90] : [30, 34], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={STORM} uid="f" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={0.8} blur={8}>
        <SnowGround y={1330} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <Person {...p} outfit={on ? MAYA : { ...MAYA, ...BASE }} expression="happy" />
          <ZipFlash p={p} k={(t - 15.9) / 0.6} />
        </Subject>
      </Plane>
      <AbsoluteFill style={{ transform: "rotate(-62deg) scale(1.8)" }}>
        <Particles seed={16} n={30} col="#ffffff" fall={320} bokeh={false} />
      </AbsoluteFill>
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Chip text="Stop = warm layer on" t={t} t0={15.3} x={80} y={1160} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF: dry and warm on top (17.65 - 21.0) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 18 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.16, 1.04], outExpo), rot: hh.rot };
  const g = 1470;
  const p: HikerProps = { x: 470, y: g + 20, scale: 1.6, walk: 0, lean: 0.02, poles: false, handOverride: [60, -150], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="g" treeY={g + 160} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g + 40} L300,${g - 30} Q520,${g - 60} 760,${g - 20} L1480,${g + 70} L1480,2600 L-400,2600 Z`} fill="#f4ede2" />
          <path d={`M-400,${g + 80} L300,${g + 20} Q520,${g - 10} 760,${g + 30} L1480,${g + 110} L1480,2600 L-400,2600 Z`} fill="#e2d8c9" />
        </Svg>
        <Subject rimX={6}>
          <Person {...p} outfit={MAYA} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.28} col="255,214,150" />
      <Particles seed={17} n={26} col="#ffe7b8" />
      <Grade sunX={760} sunY={640} warm="255,180,100" />
      <Chip text="Dry and warm on top" t={t} t0={18.0} x={80} y={240} icon="check" big />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/winter-hiking-guide-cold-weather-checklist.jpg"
      photoH={800}
      spec="22 PAGES · °F + °C · PRINTABLE CHECKLISTS"
      name={
        <>
          Winter Hiking
          <br />
          Guide
        </>
      }
      nameSize={104}
      price="$7.99"
      save="Save this before your winter hike"
    />
  );
};

export const V68: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.95} fadeIn={0} fadeOut={0.1}>
      <S1 />
    </Scene>
    <Scene from={2.9} to={5.25} fadeIn={0.1} fadeOut={0.1}>
      <S2 off={2.9} />
    </Scene>
    <Scene from={5.2} to={8.7} fadeIn={0.08} fadeOut={0.12}>
      <S3 off={5.2} />
    </Scene>
    <Scene from={8.65} to={11.15} fadeIn={0.12} fadeOut={0.1}>
      <S4 off={8.65} />
    </Scene>
    <Scene from={11.1} to={15.1} fadeIn={0.1} fadeOut={0.1}>
      <S5 off={11.1} />
    </Scene>
    <Scene from={15.05} to={17.9} fadeIn={0.1} fadeOut={0.1}>
      <S6 off={15.05} />
    </Scene>
    <Scene from={17.65} to={21.0} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={17.65} />
    </Scene>
    <Scene from={20.95} to={26.5} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.9, 1560],
        [2.9, 5.2, 1560],
        [5.2, 8.65, 1560],
        [8.65, 11.1, 1560],
        [11.1, 15.05, 1560],
        [15.05, 17.65, 1560],
        [17.65, 20.95, 1560],
      ]}
    />
  </AbsoluteFill>
);
