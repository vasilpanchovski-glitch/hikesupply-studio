// V62: "Dew-soaked leggings at dawn" in the cinematic illustrated style of C01.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v62.json";

const words = vo.words as unknown as Word[];

const DAWN: Sky = { top: "#3d5378", mid: "#b8a2a8", low: "#f3c99a", sun: [300, 1180], sunR: 46, sunCol: "#fff0d0", glow: "#ffc888" };
const GREY: Sky = { top: "#56657a", mid: "#9aa4ae", low: "#cfd2cf", sun: [760, 700], sunR: 30, sunCol: "#eef0ec", glow: "#d8dad4" };
const SUN: Sky = { top: "#3f6f9e", mid: "#9cc0d8", low: "#f6e2b8", sun: [780, 560], sunR: 56, sunCol: "#fff6dc", glow: "#ffd79a" };

const EMMA_BASE: Outfit = {
  ...GUIDE,
  skin: "#EBC0A0",
  skinShade: "#CFA07E",
  hair: "#5a3a22",
  ponytail: "#5a3a22",
  beard: null,
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#2F7F86",
  jacketShade: "#256870",
  pack: "#C2662E",
  packShade: "#9B4E20",
  pants: "#9aa0a8",
  pantsShade: "#82888f",
};
// Soaked cotton: darker, heavier grey.
const EMMA_WET: Outfit = { ...EMMA_BASE, pants: "#565c64", pantsShade: "#454a51" };
// Quick-dry nylon trail pants.
const EMMA_NYLON: Outfit = { ...EMMA_BASE, pants: "#7a2350", pantsShade: "#5e1a3d" };

const FALL = ["#c9662e", "#d9a34a", "#b5553a", "#8e3f2a"];

// ---------- scenery ----------
const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 180 - shift) % 1800) + 1800) % 1800) - 300;
      const h = 380 + (i % 3) * 90;
      return <LeafTree key={i} x={x} y={y + (i % 2) * 20} h={h} c={FALL[i % 4]} c2={FALL[(i + 2) % 4]} />;
    })}
  </Svg>
);

// Grassy meadow trail; blades with dew.
const Meadow: React.FC<{ y: number; shift: number; dew: number; t: number }> = ({ y, shift, dew, t }) => (
  <Svg>
    <rect x={-400} y={y - 60} width={1880} height={1000} fill="#6f7a48" />
    <path d={`M-400,${y + 10} Q540,${y - 10} 1480,${y + 10} L1480,${y + 90} Q540,${y + 70} -400,${y + 90} Z`} fill="#8a7a58" />
    {Array.from({ length: 90 }, (_, i) => {
      const x = ((((i * 23 - shift) % 2000) + 2000) % 2000) - 400;
      const yy = y - 40 + ((i * 37) % 360);
      const h = 50 + (i % 5) * 14;
      const sw = Math.sin(t * 1.4 + i) * 4;
      return (
        <g key={i}>
          <path d={`M${x},${yy} q${4 + sw},-${h / 2} ${8 + sw},-${h}`} stroke={i % 3 ? "#8c9a52" : "#a7b061"} strokeWidth={5} fill="none" strokeLinecap="round" />
          {i % 2 === 0 && dew > 0 && <circle cx={x + 6 + sw} cy={yy - h * 0.7} r={3.5} fill="#f4fbff" opacity={dew * (0.6 + 0.4 * Math.sin(t * 3 + i))} />}
        </g>
      );
    })}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#f4e8e0" seed={62} drift={t * 10} opacity={0.5} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={62} base={treeY - 280} amp={320} scale={260} col="#6a6f8a" lit="#e8c8b0" peak={80} />
    </Plane>
    <Haze y={treeY - 420} h={380} col={sky.low} opacity={0.6} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={66} base={treeY - 120} amp={220} scale={190} col="#55604e" />
    </Plane>
    <Haze y={treeY - 200} h={260} col={sky.low} opacity={0.4} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Water on the lower legs: drips for wet cotton, beads rolling off for nylon.
const Water: React.FC<{ p: HikerProps; t: number; mode: "drip" | "bead"; k?: number }> = ({ p, t, mode, k = 1 }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      {g.legs.map((l, li) =>
        Array.from({ length: 4 }, (_, i) => {
          const f = (t * (mode === "bead" ? 1.4 : 0.8) + i * 0.25 + li * 0.13) % 1;
          const ax = mix(l.knee[0], l.foot[0], 0.2 + i * 0.18);
          const ay = mix(l.knee[1], l.foot[1], 0.2 + i * 0.18);
          return mode === "drip" ? (
            <ellipse key={`${li}${i}`} cx={ax + (i % 2 ? 6 : -6)} cy={ay + f * 30} rx={2.4} ry={3.6} fill="#dff2ff" opacity={0.85 * (1 - f)} />
          ) : (
            <circle key={`${li}${i}`} cx={ax + (i % 2 ? 9 : -9) + f * 10} cy={ay + f * 20} r={3.2} fill="#eaf7ff" opacity={0.9 * (1 - f)} />
          );
        }),
      )}
    </g>
  );
};

// Breath clouds in the cold.
const Breath: React.FC<{ p: HikerProps; t: number }> = ({ p, t }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const k = (t * 0.5) % 1;
  return (
    <g transform={hikerTransform(p)}>
      <circle cx={hx + 55 + k * 70} cy={hy + 10 - k * 24} r={8 + k * 22} fill="#f2f4f6" opacity={0.3 * (1 - k)} />
    </g>
  );
};

// Macro: grass blades with dew drops.
const Macro: React.FC<{ t: number }> = ({ t }) => (
  <Svg>
    {Array.from({ length: 14 }, (_, i) => {
      const x = 40 + i * 78 + (i % 3) * 14;
      const h = 900 + (i % 4) * 160;
      const sw = Math.sin(t * 1.2 + i) * 10;
      const blur = i % 3 === 0;
      return (
        <g key={i} opacity={blur ? 0.55 : 1}>
          <path d={`M${x},1950 q${30 + sw},-${h / 2} ${60 + sw},-${h}`} stroke={i % 2 ? "#7c8c44" : "#93a24f"} strokeWidth={blur ? 46 : 30} fill="none" strokeLinecap="round" />
          {[0.45, 0.62, 0.8].map((q, j) => (
            <g key={j}>
              <circle cx={x + (60 + sw) * q * q + 18} cy={1950 - h * q} r={14 + ((i + j) % 3) * 5} fill="#e9f6ff" opacity={0.85} />
              <circle cx={x + (60 + sw) * q * q + 13} cy={1950 - h * q - 5} r={4} fill="#fff" />
            </g>
          ))}
        </g>
      );
    })}
  </Svg>
);

// Rain shell folded on top of the open pack.
const Shell: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const s = at(t, [t0, t0 + 0.4], [0.9, 1]);
  return (
    <Svg>
      <g transform={`translate(540,1200) scale(${s})`}>
        <ellipse cx={0} cy={320} rx={420} ry={50} fill="#000" opacity={0.3} />
        <path d="M-330,-60 Q-340,300 -300,320 L300,320 Q340,300 330,-60 Z" fill="#C2662E" />
        <path d="M-330,-60 L330,-60 L300,-130 L-300,-130 Z" fill="#9B4E20" />
        <path d="M-260,-140 Q0,-300 260,-140 L250,-40 Q0,-110 -250,-40 Z" fill="#2C5470" />
        <path d="M-200,-170 Q0,-260 200,-170" stroke="#3E6E8E" strokeWidth={14} fill="none" />
        <rect x={-60} y={-250} width={120} height={30} rx={10} fill="#1f3e54" />
        <path d="M-300,80 L300,80" stroke="#9B4E20" strokeWidth={10} />
      </g>
    </Svg>
  );
};

// ============ S1 HOOK: dawn meadow, soaked leggings (0 - 2.45) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: t * 26 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, t / 2.45), rot: hh.rot };
  const g = 1460;
  const ph = t * 4.8;
  const p: HikerProps = { x: 420 + t * 40, y: g, scale: 2.4, phase: ph, walk: 0.5, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAWN} uid="a" treeY={g - 140} blur={1.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Meadow y={g} shift={cam.x} dew={1} t={t} />
        <Subject rimX={-3} col="rgba(255,214,160,0.85)">
          <Person {...p} outfit={EMMA_WET} expression="tired" />
          <Water p={p} t={t} mode="drip" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#2a3018" side="right" />
      </Plane>
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.2} />
      <Particles seed={621} n={20} col="#fff0d6" />
      <Grade sunX={300} sunY={1180} warm="255,200,150" vignette={0.55} />
      <Title text={"Her leggings\nwere soaked\nby mile one"} t={t} t0={0} top={130} size={128} />
    </AbsoluteFill>
  );
};

// ============ S1b MACRO: every blade covered in cold dew (2.4 - 5.6) ============
const S1b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: lt * 14 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.2), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAWN} uid="b" treeY={1250} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Macro t={t} />
      </Plane>
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.25} />
      <Particles seed={622} n={16} col="#fff0d6" />
      <Grade sunX={300} sunY={1180} warm="255,200,150" vignette={0.6} />
      <Chip text="Every blade" t={t} t0={3.02} x={80} y={220} icon="none" big />
      <Chip text="Cold dew" t={t} t0={4.18} x={80} y={350} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: legs, cotton soaked and clinging (5.55 - 9.0) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4, t > 6.95 && t < 7.15 ? 0.5 : 0);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.45), rot: hh.rot };
  const g = 1880;
  const ph = t * 4.2;
  const p: HikerProps = { x: 470, y: g, scale: 6.6, phase: ph, walk: 0.5, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5) };
  const wet = at(t, [5.6, 7.0], [0.2, 1]);
  const outfit: Outfit = wet > 0.6 ? EMMA_WET : EMMA_BASE;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAWN} uid="c" treeY={1300} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Meadow y={1560} shift={cam.x * 1.4} dew={1} t={t} />
        <Subject rimX={-3} col="rgba(255,214,160,0.85)">
          <Person {...p} outfit={{ ...outfit, glove: "#2b2f33" }} expression="tired" />
          <Water p={p} t={t} mode="drip" k={wet} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.5} blur={10}>
        <Meadow y={1820} shift={cam.x * 2} dew={0.8} t={t} />
      </Plane>
      <Grade sunX={300} sunY={1180} warm="255,200,150" vignette={0.6} />
      <Chip text="Cotton leggings" t={t} t0={5.83} x={80} y={220} icon="none" big />
      <Chip text="Soaked" t={t} t0={6.98} x={80} y={350} icon="x" big />
      <Chip text="Clinging" t={t} t0={7.53} x={80} y={480} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b MEDIUM: wet cotton pulls heat (8.95 - 12.3) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 10 + hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 3.35), rot: hh.rot };
  const g = 1480;
  const shiver = Math.sin(t * 40) * 1.5;
  const p: HikerProps = { x: 560 + shiver, y: g, scale: 2.4, walk: 0, lean: 0.1, poles: false, handOverride: [40, -40], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAWN} uid="d" treeY={g - 120} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Meadow y={g} shift={cam.x} dew={1} t={t} />
        <Subject rimX={3} col="rgba(255,214,160,0.85)">
          <Person {...p} outfit={EMMA_WET} expression="tired" flip />
          <g transform={`translate(${2 * p.x},0) scale(-1,1)`}>
            <Water p={p} t={t} mode="drip" />
            <Breath p={p} t={t} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3018" side="left" />
      </Plane>
      <Particles seed={624} n={16} col="#fff0d6" />
      <Grade sunX={300} sunY={1180} cool="170,190,220" vignette={0.6} />
      <Readout label="WET COTTON" value="PULLS HEAT FROM YOU" ok={false} t={t} t0={9.05} x={80} y={220} pulseAt={10.66} />
    </AbsoluteFill>
  );
};

// ============ S3a CLOSE-UP: quick-dry nylon, water-repellent finish (12.25 - 16.85) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: mix(1.08, 1.02, lt / 4.6), rot: hh.rot };
  const g = 1880;
  const ph = t * 4.2;
  const p: HikerProps = { x: 470, y: g, scale: 6.6, phase: ph, walk: 0.5, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAWN} uid="e" treeY={1300} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Meadow y={1560} shift={cam.x * 1.4} dew={1} t={t} />
        <Subject rimX={-3} col="rgba(255,214,160,0.85)">
          <Person {...p} outfit={{ ...EMMA_NYLON, glove: "#2b2f33" }} expression="happy" />
          <Water p={p} t={t} mode="bead" k={at(t, [14.8, 15.3], [0, 1])} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.5} blur={10}>
        <Meadow y={1820} shift={cam.x * 2} dew={0.8} t={t} />
      </Plane>
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.2} />
      <Grade sunX={300} sunY={1180} warm="255,200,150" vignette={0.55} />
      <Title text={"Quick-dry\nnylon pants."} t={t} t0={13.22} top={200} size={124} />
      <Chip text="Water-repellent finish" t={t} t0={15.14} x={80} y={480} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3b WIDE: sheds dew and drizzle, dries fast in the sun (16.8 - 20.9) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 24 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 4.1), rot: hh.rot };
  const g = 1480;
  const ph = t * 4.6;
  const sun = at(t, [18.7, 19.6], [0, 1]);
  const p: HikerProps = { x: 380 + lt * 40, y: g, scale: 2.4, phase: ph, walk: 0.55, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.55) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={sun > 0.5 ? SUN : GREY} uid={sun > 0.5 ? "f2" : "f1"} treeY={g - 140} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <Meadow y={g} shift={cam.x} dew={1 - sun} t={t} />
        <Subject rimX={4} col={sun > 0.5 ? "rgba(255,214,150,0.85)" : "rgba(220,230,240,0.6)"}>
          <Person {...p} outfit={EMMA_NYLON} expression="happy" />
          <Water p={p} t={t} mode="bead" k={1 - sun} />
        </Subject>
      </Plane>
      {sun < 1 && <Particles seed={625} n={40} col="#dfe8f0" fall={260} bokeh={false} />}
      {sun > 0 && <Rays x={SUN.sun[0]} y={SUN.sun[1]} strength={0.24 * sun} />}
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#2a3018" side="right" />
      </Plane>
      <Grade sunX={780} sunY={560} warm="255,205,160" vignette={0.5} />
      <Chip text="Sheds dew" t={t} t0={17.09} x={80} y={220} icon="check" big />
      <Chip text="And light drizzle" t={t} t0={18.0} x={80} y={350} icon="check" big />
      <Chip text="Dries fast in the sun" t={t} t0={18.82} x={80} y={480} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: rain shell packed for real rain (20.85 - 23.0) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: -lt * 10 + hh.x, y: hh.y, zoom: mix(1.1, 1.03, lt / 2.15), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SUN} uid="g" treeY={1250} blur={11} t={t} />
      <Plane cam={cam} depth={1}>
        <Meadow y={1560} shift={cam.x} dew={0} t={t} />
        <Shell t={t} t0={20.9} />
      </Plane>
      <Plane cam={cam} depth={1.7} blur={16}>
        <FrameLeaves col="#2a3018" side="left" />
      </Plane>
      <Rays x={SUN.sun[0]} y={SUN.sun[1]} strength={0.22} />
      <Particles seed={626} n={18} col="#fff0d0" leaves={FALL} fall={40} />
      <Grade sunX={780} sunY={560} warm="255,205,160" vignette={0.55} />
      <Title text={"Rain shell\nfor real rain."} t={t} t0={21.21} top={200} size={124} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/cool-touch-trail-pants-womens-card.jpg"
      photoH={760}
      spec="WOMEN'S · QUICK-DRY · DWR FINISH"
      name={
        <>
          Cool-Touch
          <br />
          Trail Pants
        </>
      }
      nameSize={88}
      price="$64.99"
      save="Save this before your next morning hike"
    />
  );
};

export const V62: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.5} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={2.45} to={5.6} fadeIn={0.1} fadeOut={0.1}>
      <S1b off={2.45} />
    </Scene>
    <Scene from={5.55} to={9.0} fadeIn={0.1} fadeOut={0.1}>
      <S2 off={5.55} />
    </Scene>
    <Scene from={8.95} to={12.3} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={8.95} />
    </Scene>
    <Scene from={12.25} to={16.85} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={12.25} />
    </Scene>
    <Scene from={16.8} to={20.9} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={16.8} />
    </Scene>
    <Scene from={20.85} to={23.0} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={20.85} />
    </Scene>
    <Scene from={22.9} to={27.5} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.45, 1560],
        [2.45, 5.55, 1560],
        [5.55, 8.95, 1560],
        [8.95, 12.25, 1560],
        [12.25, 16.8, 1560],
        [16.8, 20.85, 1560],
        [20.85, 22.9, 1560],
      ]}
    />
  </AbsoluteFill>
);
