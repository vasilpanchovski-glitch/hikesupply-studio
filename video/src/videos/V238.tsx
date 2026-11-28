// V238: "The Narrows in January? Ice water." Short format (17.0 s, 41 words), cinematic C01 style, Zion slot canyon in winter.
// Product: Utah's Mighty 5 Trip Pack — Planning Guide + 10 GPX Day Hikes, $19.99 (live Shopify). End card: real store cover (boxed photo card).
// Advice (plain, conservative): the Narrows means wading the Virgin River; in winter the water is very cold. Check river
// conditions at the Zion visitor center first, or pick a dry trail that day. No temperatures or flow numbers on screen.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, Grade, handheld, Haze, Particles, Plane, Rays, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { CanyonBackdrop, CanyonTrail } from "../canyon";
import { PlanPage } from "../home";
import vo from "../vo/v238.json";

const words = vo.words as unknown as Word[];

const SLOT: Sky = { top: "#5d7ea3", mid: "#b6c8d8", low: "#e8ecef", sun: [560, 120], sunR: 30, sunCol: "#fffdf4", glow: "#f0e6d8" };
const RIM: Sky = { top: "#3f6e9c", mid: "#b3c9dc", low: "#f2e6d6", sun: [820, 520], sunR: 46, sunCol: "#fffdf2", glow: "#f6e2c6" };

const JAKE2: Outfit = {
  ...GUIDE,
  skin: "#D9A07F",
  skinShade: "#BC8463",
  hair: "#4a2e1c",
  ponytail: null,
  beard: "#4a2e1c",
  cap: "#C2662E",
  capShade: "#9B4E20",
  jacket: "#3E6E8E",
  jacketShade: "#2f566f",
  pants: "#5a5f48",
  pantsShade: "#454a36",
  pack: "#7a3a2e",
  packShade: "#5e2c23",
  glove: null,
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// One sandstone wall of the slot, from the frame edge in towards the middle. side -1 = left, 1 = right.
const SlotWall: React.FC<{ side: -1 | 1; inner: number; col: string; band: string; seed: number; snow?: boolean }> = ({ side, inner, col, band, seed, snow }) => {
  const pts: string[] = [];
  for (let i = 0; i <= 20; i++) {
    const y = -300 + i * 130;
    const w = inner + Math.sin(i * 1.3 + seed) * 40 + Math.sin(i * 0.5 + seed * 2) * 60;
    pts.push(`${side < 0 ? w : 1080 - w},${y}`);
  }
  const edge = side < 0 ? -400 : 1480;
  const d = `M${edge},-300 L${pts.join(" L")} L${edge},2400 Z`;
  return (
    <g>
      <path d={d} fill={col} />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <path key={k} d={`M${edge},${100 + k * 320} L${side < 0 ? inner - 40 : 1120 - inner},${160 + k * 320 + side * 20}`} stroke={band} strokeWidth={14} opacity={0.5} />
      ))}
      {snow && [0, 1, 2].map((k) => <ellipse key={`s${k}`} cx={side < 0 ? inner - 60 : 1140 - inner} cy={420 + k * 460} rx={70} ry={12} fill="#f3f6f8" opacity={0.9} />)}
    </g>
  );
};

const NarrowsBackdrop: React.FC<{ cam: Cam; uid: string; blur?: number }> = ({ cam, uid, blur = 0 }) => (
  <>
    <Plane cam={cam} depth={0.05} blur={blur * 0.6}>
      <SkyPlane sky={SLOT} uid={uid} />
    </Plane>
    <Plane cam={cam} depth={0.2} blur={4 + blur}>
      <Svg>
        <path d="M-400,2400 L-400,-300 L380,-300 Q420,800 470,1300 L610,1300 Q660,800 700,-300 L1480,-300 L1480,2400 Z" fill="#b8805e" />
      </Svg>
    </Plane>
    <Haze y={1000} h={420} col="#dfe6ea" opacity={0.55} />
    <Plane cam={cam} depth={0.45} blur={2 + blur}>
      <Svg>
        <SlotWall side={-1} inner={330} col="#9a5c3c" band="#b87450" seed={2} />
        <SlotWall side={1} inner={330} col="#8e5434" band="#a86a46" seed={5} />
      </Svg>
    </Plane>
    <Plane cam={cam} depth={0.75} blur={1 + blur}>
      <Svg>
        <SlotWall side={-1} inner={180} col="#7c4428" band="#93573a" seed={7} />
        <SlotWall side={1} inner={160} col="#72402a" band="#8a5236" seed={9} />
      </Svg>
    </Plane>
  </>
);

// River surface from y down, ripples move with t. Drawn in front of the wader so the legs vanish under it.
const River: React.FC<{ y: number; t: number; alpha?: number }> = ({ y, t, alpha = 0.86 }) => (
  <Svg>
    <defs>
      <linearGradient id="riv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7fa3a8" stopOpacity={alpha} />
        <stop offset="1" stopColor="#3d5f66" stopOpacity={Math.min(1, alpha + 0.1)} />
      </linearGradient>
    </defs>
    <rect x={-400} y={y} width={1880} height={1400} fill="url(#riv)" />
    {Array.from({ length: 9 }, (_, i) => {
      const yy = y + 24 + i * 46;
      const off = ((t * 60 + i * 97) % 240) - 120;
      return <path key={i} d={`M${-200 + off},${yy} q120,-10 240,0 t240,0 t240,0 t240,0 t240,0 t240,0`} stroke="#dff1f2" strokeWidth={4} fill="none" opacity={0.45 - i * 0.03} />;
    })}
    <rect x={-400} y={y - 4} width={1880} height={8} fill="#e8f6f6" opacity={0.6} />
  </Svg>
);

const Breath: React.FC<{ p: HikerProps; t: number }> = ({ p, t }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const k = (t * 0.6) % 1;
  return (
    <g transform={hikerTransform(p)}>
      <circle cx={hx + 55 + k * 70} cy={hy + 10 - k * 24} r={8 + k * 22} fill="#ffffff" opacity={0.4 * (1 - k)} />
    </g>
  );
};

// ============ S1 HOOK WIDE: Jake at the edge of the river in the slot canyon (0 - 3.0) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y - t * 6, zoom: mix(1.03, 1.1, t / 3.0), rot: hh.rot };
  const g = 1560;
  const ph = t * 2.6;
  const p: HikerProps = { x: 420 + t * 20, y: g, scale: 2.2, phase: ph, walk: 0.4, lean: 0.04, poles: true };
  return (
    <AbsoluteFill>
      <NarrowsBackdrop cam={cam} uid="a" />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(230,240,255,0.7)">
          <Person {...p} outfit={JAKE2} expression="happy" />
          <Breath p={p} t={t} />
        </Subject>
        <River y={g - 70} t={t} />
      </Plane>
      <Rays x={560} y={0} strength={0.22} col="235,244,255" />
      <Particles seed={2381} n={12} col="#f4f8ff" fall={3} bokeh />
      <LowScrim />
      <Grade sunX={560} sunY={120} warm="240,236,230" cool="40,60,90" vignette={0.55} />
      <Title text={"The Narrows\nin January?\nIce water."} t={t} t0={0} top={110} size={120} />
      <Chip text="Zion Narrows, January" t={t} t0={1.4} x={60} y={560} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: a few steps in, the water is above his knees (3.0 - 5.1) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shiver = Math.sin(t * 40) * 2;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + shiver, y: hh.y, zoom: at(lt, [0, 0.7], [1.12, 1.03], outExpo), rot: hh.rot };
  const wy = 1470;
  const p: HikerProps = { x: 470, y: 1900, scale: 4.4, walk: 0, lean: 0.02, poles: false, handOverride: [70, -30], breathe: Math.sin(t * 30) * 2 };
  return (
    <AbsoluteFill>
      <NarrowsBackdrop cam={cam} uid="b" blur={10} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(230,240,255,0.7)">
          <Person {...p} outfit={JAKE2} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
        <River y={wy} t={t} alpha={0.88} />
        <Svg>
          {[0, 1, 2].map((i) => {
            const k = (t * 0.8 + i / 3) % 1;
            return <ellipse key={i} cx={560} cy={wy + 6} rx={200 + k * 260} ry={18 + k * 14} stroke="#eaf7f7" strokeWidth={5} fill="none" opacity={0.5 * (1 - k)} />;
          })}
        </Svg>
      </Plane>
      <Particles seed={2382} n={10} col="#f4f8ff" fall={3} bokeh />
      <LowScrim />
      <Grade sunX={560} sunY={120} warm="236,236,236" cool="30,60,100" vignette={0.6} />
      <Chip text="A few steps in" t={t} t0={3.1} x={60} y={170} icon="none" big />
      <Readout label="RIVER" value="ICE COLD" ok={false} t={t} t0={4.4} x={60} y={1180} />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: he turns back and wades out (5.1 - 7.6) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.5), rot: hh.rot };
  const g = 1640;
  const ph = t * 2.2;
  const p: HikerProps = { x: 700 - lt * 50, y: g, scale: 2.4, phase: ph, walk: 0.35, lean: 0.12, poles: true, breathe: Math.sin(t * 5) * 2 };
  return (
    <AbsoluteFill>
      <NarrowsBackdrop cam={cam} uid="c" />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(230,240,255,0.7)">
          <Person {...p} outfit={JAKE2} expression="tired" flip />
          <Breath p={{ ...p }} t={t} />
        </Subject>
        <River y={g - 150} t={t} />
      </Plane>
      <Rays x={560} y={0} strength={0.18} col="235,244,255" />
      <Particles seed={2383} n={12} col="#f4f8ff" fall={3} bokeh />
      <LowScrim />
      <Grade sunX={560} sunY={120} warm="236,236,236" cool="30,60,100" vignette={0.55} />
      <Chip text="Above his knees" t={t} t0={5.3} x={60} y={170} icon="x" big />
      <Chip text="He turned back" t={t} t0={6.6} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the rule, check at the visitor center first (7.6 - 10.4) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.8), rot: hh.rot };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={RIM} uid="d" y={1300} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,236,200,0.7)">
          <Svg>
            <g transform="translate(170,470) rotate(-2) scale(1.3)">
              <PlanPage x={0} y={0} w={560} rows={[["First stop", "Visitor center"], ["Ask", "River conditions"], ["Too cold?", "Pick a dry trail"]]} t={t} t0={8.4} gap={0.7} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2384} n={10} col="#fff3d6" fall={3} bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="255,236,210" cool="40,60,90" vignette={0.55} />
      <Chip text="The rule" t={t} t0={7.75} x={60} y={170} icon="none" big />
      <Chip text="Check the river first" t={t} t0={9.0} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: a dry canyon trail in the winter sun instead (10.4 - 13.45) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.02, 1.07, lt / 3.05), rot: hh.rot };
  const g = 1500;
  const ph = t * 3;
  const p: HikerProps = { x: 380 + lt * 34, y: g + 20, scale: 2.3, phase: ph, walk: 0.55, lean: 0.06, poles: true };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={RIM} uid="e" y={1300} t={t} />
      <Rays x={RIM.sun[0]} y={RIM.sun[1]} strength={0.28} col="255,240,210" />
      <Plane cam={cam} depth={1}>
        <CanyonTrail y={g} tilt={0.04} />
        <Svg>
          {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={-100 + i * 300} cy={g + 70 + (i % 2) * 30} rx={90} ry={10} fill="#f3f6f8" opacity={0.85} />)}
        </Svg>
        <Subject rimX={5} col="rgba(255,226,180,0.85)">
          <Person {...p} outfit={JAKE2} expression="happy" />
        </Subject>
      </Plane>
      <Particles seed={2385} n={14} col="#fff3d6" bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="255,226,180" cool="40,60,90" />
      <Chip text="Or a dry trail that day" t={t} t0={12.2} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/utahs-mighty-5-trip-pack-card.jpg"
      photoH={760}
      spec="PLANNING GUIDE + 10 GPX DAY HIKES"
      name={
        <>
          Utah's Mighty 5
          <br />
          Trip Pack
        </>
      }
      nameSize={100}
      price="$19.99"
      save="Save this before your Zion trip"
    />
  );
};

export const V238: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.08} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.0} to={5.18} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.0} />
    </Scene>
    <Scene from={5.1} to={7.68} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.1} />
    </Scene>
    <Scene from={7.6} to={10.48} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={7.6} />
    </Scene>
    <Scene from={10.4} to={13.55} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={10.4} />
    </Scene>
    <Scene from={13.45} to={17.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.0, 1600],
        [3.0, 5.1, 1600],
        [5.1, 7.6, 1600],
        [7.6, 10.4, 1600],
        [10.4, 13.45, 1600],
      ]}
    />
  </AbsoluteFill>
);
