// V32B: v32 "The 5-second pole check before a descent" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v32b.json";

const words = vo.words as unknown as Word[];

const COOL: Sky = { top: "#4d6a86", mid: "#a9bac4", low: "#e6e3d4", sun: [790, 600], sunR: 46, sunCol: "#fbf7ea", glow: "#f1ecd8" };
const WARM: Sky = { top: "#3a6d9e", mid: "#b9cfe0", low: "#f7e6c4", sun: [820, 620], sunR: 52, sunCol: "#fffbe8", glow: "#ffe2a6" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const JK: Outfit = {
  ...JAKE,
  hair: "#3a2a20",
  beard: "#4a3528",
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#C0603C",
  jacketShade: "#9A4A2D",
  pack: "#4A4E55",
  packShade: "#363A40",
  pole: "#2f3438",
};
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e"];

const Woods: React.FC<{ y: number; shift: number; s?: number }> = ({ y, shift, s = 1 }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = (440 + (i % 3) * 70) * s;
      return i % 3 === 1 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c="#3b6550" c2="#2b4d3c" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={i % 2 ? "#d9963a" : "#b9582c"} c2={i % 2 ? "#b77a28" : "#94461f"} />
      );
    })}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; trees?: boolean }> = ({ cam, sky, uid, treeY, blur = 0, t, trees = true }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={5} drift={t * 12} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={17} base={treeY - 280} amp={420} scale={240} col="#8fa3b4" lit="#e8eef2" peak={200} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.75} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={29} base={treeY - 120} amp={260} scale={180} col="#6f8577" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.45} />
    {trees && (
      <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
        <Woods y={treeY} shift={cam.x * 0.2} />
      </Plane>
    )}
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Steep, loose descent: ground drops to the right.
const SL = 0.36;
const Slope: React.FC<{ y0: number; shift: number; s?: number }> = ({ y0, shift, s = 1 }) => {
  const gy = (x: number) => y0 + x * Math.tan(SL);
  return (
    <Svg>
      <path d={`M-400,${gy(-400)} L1480,${gy(1480)} L1480,2600 L-400,2600 Z`} fill="#7a7458" />
      <path d={`M-400,${gy(-400) + 8 * s} L1480,${gy(1480) + 8 * s} L1480,${gy(1480) + 80 * s} L-400,${gy(-400) + 80 * s} Z`} fill="#b09a78" />
      {Array.from({ length: 16 }, (_, i) => {
        const x = ((((i * 97 - shift) % 1700) + 1700) % 1700) - 300;
        return <ellipse key={i} cx={x} cy={gy(x) + (26 + (i % 3) * 14) * s} rx={(9 + (i % 4) * 4) * s} ry={(6 + (i % 3) * 2) * s} fill={i % 2 ? "#8d8670" : "#cfc4ae"} />;
      })}
    </Svg>
  );
};
const gyAt = (y0: number, x: number) => y0 + x * Math.tan(SL);

// Big pole joint for the close-ups: upper section, flip lock, lower section. Global t drives it.
const Joint: React.FC<{ t: number }> = ({ t }) => {
  const slide = at(t, [9.45, 10.0], [0, 1], outExpo);
  const lock = at(t, [10.6, 11.2], [0, 1], outExpo);
  const slip = at(t, [15.2, 15.45], [0, 1]) * at(t, [15.85, 16.2], [1, 0]);
  const relock = at(t, [15.85, 16.3], [0, 1], outExpo);
  const lockK = t < 15.2 ? lock : t < 15.85 ? mix(1, 0.55, at(t, [15.2, 15.35], [0, 1])) : mix(0.55, 1, relock);
  const lowerTop = mix(1090, 980, slide);
  const upperY = slip * 60;
  const tight = relock * at(t, [16.4, 16.8], [1, 0]);
  return (
    <g>
      {/* lower section */}
      <rect x={500} y={lowerTop} width={80} height={1200} rx={12} fill="#7d878c" />
      <rect x={512} y={lowerTop} width={18} height={1200} fill="#fff" opacity={0.25} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={i} x1={500} x2={528} y1={lowerTop + 40 + i * 44} y2={lowerTop + 40 + i * 44} stroke="#fff" strokeWidth={5} opacity={0.6} />
      ))}
      {/* upper section */}
      <g transform={`translate(0,${upperY})`}>
        <rect x={478} y={-200} width={124} height={1130} rx={16} fill="#2f3438" />
        <rect x={494} y={-200} width={26} height={1130} fill="#fff" opacity={0.12} />
        {/* lock collar */}
        <rect x={452} y={900} width={176} height={120} rx={24} fill="#1f2326" />
        <rect x={462} y={912} width={156} height={18} rx={8} fill="#fff" opacity={0.12} />
        {/* lever */}
        <g transform={`translate(620,960) rotate(${mix(-20, 84, lockK)})`}>
          <rect x={-12} y={-30} width={150} height={60} rx={26} fill="#3a4148" />
          <rect x={0} y={-22} width={120} height={12} rx={6} fill="#fff" opacity={0.15} />
        </g>
      </g>
      {/* tighten hint */}
      <g opacity={tight} transform="translate(540,1020)">
        <path d="M-170,-90 A190,110 0 1,0 170,-90" stroke="#F2B544" strokeWidth={16} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};

// ============ S1 HOOK: wide, steep loose descent, leaning on the pole (0 - 4.0) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: t * 20 + hh.x, y: hh.y + t * 10, zoom: mix(1.0, 1.08, t / 4), rot: hh.rot };
  const y0 = 1300;
  const ph = t * 3.4;
  const x = 380 + t * 30;
  const p: HikerProps = { x, y: gyAt(y0, x) + 40, scale: 1.45, phase: ph, walk: 0.6, lean: -0.22, slope: -SL * 0.75, poleLen: mix(240, 228, at(t, [2.7, 3.4], [0, 1])) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COOL} uid="a" treeY={1240} t={t} />
      <Plane cam={cam} depth={1}>
        <Slope y0={y0} shift={t * 40} />
        <Subject>
          <Person {...p} outfit={JK} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Rays x={COOL.sun[0]} y={COOL.sun[1]} strength={0.16} />
      <Particles seed={51} n={20} />
      <Grade sunX={790} sunY={600} warm="255,214,170" />
      <Title text={"Why your pole\nslips on the\nway down"} t={t} t0={0} top={130} size={124} />
      <Chip text="Steep, loose descent" t={t} t0={1.34} x={80} y={540} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: it slides shorter, he stumbles (3.95 - 6.2) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [4.6, 4.7, 5.3], [0, 1, 0]);
  const hh = handheld(t, 0.8, shake);
  const cam: Cam = { x: 40 + lt * 10 + hh.x, y: hh.y, zoom: mix(1.05, 1.12, lt / 2.25) + shake * 0.04, rot: hh.rot };
  const y0 = 1250;
  const slideK = at(t, [4.15, 4.7], [0, 1], outExpo);
  const stumble = at(t, [4.6, 5.4], [0, 1], outExpo);
  const x = 420 + stumble * 60;
  const p: HikerProps = {
    x,
    y: gyAt(y0, x) + 90 + stumble * 30,
    scale: 2.3,
    phase: 1.2 + stumble * 1.4,
    walk: 0.7,
    lean: mix(-0.22, 0.3, stumble),
    slope: -SL * 0.75,
    poleLen: mix(228, 165, slideK),
  };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COOL} uid="b" treeY={1150} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Slope y0={y0} shift={200 + lt * 20} s={1.5} />
        <Subject>
          <Person {...p} outfit={JK} expression={stumble > 0.3 ? "tired" : "neutral"} />
        </Subject>
      </Plane>
      <Particles seed={52} n={14} />
      <Grade sunX={790} sunY={600} warm="255,214,170" cool="20,45,60" vignette={0.6} />
      <Readout label="THE POLE" value="SLIDES SHORTER" ok={false} t={t} t0={4.15} x={80} y={230} pulseAt={4.69} />
      <Chip text="He stumbles" t={t} t0={5.37} x={80} y={470} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a WIDE: flat ground at the top, the 5-second pole check (6.15 - 9.35) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 12 + hh.x, y: at(lt, [0, 3.2], [-120, 0]) + hh.y, zoom: at(lt, [0, 3.2], [1.14, 1.03]), rot: hh.rot };
  const g = 1440;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="c" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 40} width={1880} height={900} fill="#6b7a4a" />
          <path d={`M-400,${g - 6} Q540,${g - 24} 1480,${g - 4} L1480,${g + 130} Q540,${g + 100} -400,${g + 130} Z`} fill="#c0a67e" />
          {/* the drop-off starts on the right */}
          <path d={`M860,${g - 10} L1480,${g + 200} L1480,${g + 900} L860,${g + 900} Z`} fill="#7a7458" />
        </Svg>
        <Subject>
          <Person x={420} y={g + 30} scale={1.45} walk={0} lean={0.02} poleLen={240} outfit={JK} expression="neutral" breathe={Math.sin(t * 2.3) * 2} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#4a2e14" side="right" />
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.2} />
      <Particles seed={53} n={20} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} />
      <Chip text="Before you head down" t={t} t0={6.24} t1={7.45} x={80} y={240} icon="none" big />
      <Title text={"The 5-second\npole check"} t={t} t0={7.46} top={200} size={150} />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: set the length, close every lock (9.3 - 11.85) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.55), rot: hh.rot };
  const lock = at(t, [10.6, 10.9, 11.3], [0, 1, 0]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="d" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <g transform="rotate(8 540 960)">
            <Joint t={t} />
          </g>
          <circle cx={700} cy={1010} r={60 + lock * 60} fill="none" stroke="#fff" strokeWidth={5} opacity={lock} />
        </Subject>
      </Plane>
      <Particles seed={54} n={14} leaves={LEAVES} fall={40} />
      <Grade sunX={820} sunY={620} vignette={0.6} />
      <Chip text="Set the length" t={t} t0={9.39} x={80} y={240} icon="check" big />
      <Chip text="Close every lock" t={t} t0={10.17} x={80} y={370} icon="check" big />
      <Chip text="All the way" t={t} t0={11.13} x={80} y={500} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S3c CLOSE-UP: full weight into the pole on flat ground (11.8 - 14.9) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const press = at(t, [12.6, 13.1], [0, 1]) * at(t, [14.5, 14.85], [1, 0.4]);
  const hh = handheld(t, 0.5, press * 0.15);
  const cam: Cam = { x: hh.x, y: hh.y + press * 14, zoom: mix(1.04, 1.1, lt / 3.1), rot: hh.rot };
  const p: HikerProps = {
    x: 560,
    y: 1250 + 182 * 4.4 + press * 30,
    scale: 4.4,
    walk: 0,
    lean: 0.1 + press * 0.22,
    poles: true,
    handOverride: [mix(70, 84, press), mix(-10, 20, press)],
    breathe: Math.sin(t * 2.2) * 1.5,
  };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="e" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={JK} expression="neutral" />
        </Subject>
      </Plane>
      <Particles seed={55} n={16} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} vignette={0.6} />
      <Chip text="Full weight on it" t={t} t0={12.62} x={80} y={240} icon="check" big />
      <Chip text="On flat ground" t={t} t0={13.96} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3d CLOSE-UP: if it moves, tighten and test again (14.85 - 17.5) ============
const S3d: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [15.2, 15.28, 15.6], [0, 1, 0]);
  const hh = handheld(t, 0.5, shake * 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 2.65), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="f" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6}>
          <g transform="rotate(-6 540 960)">
            <Joint t={t} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={56} n={14} leaves={LEAVES} fall={40} />
      <Grade sunX={820} sunY={620} vignette={0.6} />
      <Chip text="It moves?" t={t} t0={15.21} x={80} y={240} icon="x" big />
      <Chip text="Tighten it" t={t} t0={15.8} x={80} y={370} icon="check" big />
      <Chip text="Test again" t={t} t0={16.49} x={80} y={500} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: golden light, heading down on a pole that holds (17.45 - 22.8) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 22 + hh.x, y: hh.y + lt * 10, zoom: at(lt, [0, 1.2], [1.16, 1.04], outExpo), rot: hh.rot };
  const y0 = 1270;
  const ph = lt * 3.2;
  const x = 360 + lt * 28;
  const p: HikerProps = { x, y: gyAt(y0, x) + 90, scale: 2.3, phase: ph, walk: 0.55, lean: -0.18, slope: -SL * 0.75, poleLen: 240 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={1170} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Slope y0={y0} shift={lt * 40} s={1.5} />
        <Subject rimX={6}>
          <Person {...p} outfit={JK} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.26} col="255,214,150" />
      <Particles seed={58} n={26} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"A pole\nthat holds."} t={t} t0={off + 0.1} top={170} size={150} />
      <Chip text="Recheck at every break" t={t} t0={19.87} x={80} y={520} icon="check" />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/folding-trekking-pole-cut.png"
      spec="4-SECTION ALUMINIUM · SOLD SINGLE · 4 COLOURS"
      name={
        <>
          Folding
          <br />
          Trekking Pole
        </>
      }
      nameSize={96}
      price="$19.99"
      save="Save this before your next descent"
    />
  );
};

export const V32B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.0} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.95} to={6.2} fadeIn={0.08} fadeOut={0.1}>
      <S2a off={3.95} />
    </Scene>
    <Scene from={6.15} to={9.35} fadeIn={0.12} fadeOut={0.1}>
      <S3a off={6.15} />
    </Scene>
    <Scene from={9.3} to={11.85} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={9.3} />
    </Scene>
    <Scene from={11.8} to={14.9} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={11.8} />
    </Scene>
    <Scene from={14.85} to={17.5} fadeIn={0.1} fadeOut={0.12}>
      <S3d off={14.85} />
    </Scene>
    <Scene from={17.45} to={22.8} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={17.45} />
    </Scene>
    <Scene from={22.75} to={27.5} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.95, 1560],
        [3.95, 6.15, 1560],
        [6.15, 9.3, 1560],
        [9.3, 11.8, 1560],
        [11.8, 14.85, 1560],
        [14.85, 17.45, 1560],
        [17.45, 22.75, 1560],
      ]}
    />
  </AbsoluteFill>
);
