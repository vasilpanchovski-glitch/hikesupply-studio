// V38B: v38 "Frozen drink tube" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v38b.json";

const words = vo.words as unknown as Word[];

const WINDY: Sky = { top: "#3f5873", mid: "#93a7b8", low: "#dfe5e8", sun: [800, 560], sunR: 40, sunCol: "#f6f6f0", glow: "#e3e8ea" };
const BRIGHT: Sky = { top: "#3c6f9f", mid: "#a8c3d8", low: "#eef0e6", sun: [820, 560], sunR: 50, sunCol: "#fffbea", glow: "#f6ecd0" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const LUKE: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#BC8464",
  hair: "#2e2620",
  beard: "#2e2620",
  cap: "#3b4650",
  capShade: "#2b343c",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#3E4650",
  pantsShade: "#2E353D",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
  glove: "#2b2f33",
};

// ---------- scenery ----------
const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = (380 + (i % 3) * 70) * 1.1;
      return (
        <g key={i}>
          <Pine x={x} y={y + (i % 2) * 20} h={h} c="#5f7f74" c2="#4a675d" />
          <path d={`M${x - 30},${y + (i % 2) * 20 - h * 0.55} l30,-40 l30,40 Z`} fill="#eef3f5" opacity={0.85} />
        </g>
      );
    })}
  </Svg>
);

const Snow: React.FC<{ y: number; slope?: number }> = ({ y, slope = 0 }) => (
  <Svg>
    <path d={`M-400,${y + 400 * slope} L1480,${y - 1480 * slope} L1480,2600 L-400,2600 Z`} fill="#dfe6ea" />
    <path d={`M-400,${y + 400 * slope + 30} L1480,${y - 1480 * slope + 30} L1480,2600 L-400,2600 Z`} fill="#cdd7de" />
    {Array.from({ length: 12 }, (_, i) => {
      const x = -300 + i * 150;
      const yy = y + (400 - (x + 400)) * slope + 50 + (i % 3) * 30;
      return <ellipse key={i} cx={x} cy={yy} rx={50} ry={7} fill="#ffffff" opacity={0.7} />;
    })}
    {Array.from({ length: 8 }, (_, i) => {
      const x = -260 + i * 230;
      const yy = y + (400 - (x + 400)) * slope - 8;
      return <path key={i} d={`M${x},${yy} q20,-34 60,-30 q30,4 40,30 Z`} fill="#7d868c" />;
    })}
  </Svg>
);

// Drink tube: from the pack over the near shoulder to the mouth (sip) or hanging on the chest strap.
// water 0..1 = how much of the tube is full (from the pack end). ice 0..1 = frozen look.
const Tube: React.FC<{ p: HikerProps; sip: number; water?: number; ice?: number; tucked?: boolean; t: number }> = ({ p, sip, water = 0, ice = 0, tucked, t }) => {
  const g = hikerGeometry(p);
  const sh = g.sh;
  const hd = g.head;
  const start: [number, number] = [sh[0] - 26, sh[1] - 4];
  const over: [number, number] = [sh[0] + 6, sh[1] - 26];
  const hang: [number, number] = [sh[0] + 26, sh[1] + 54];
  const mouth: [number, number] = [hd[0] + 26, hd[1] + 19];
  const end: [number, number] = tucked ? [sh[0] + 18, sh[1] + 2] : [mix(hang[0], mouth[0], sip), mix(hang[1], mouth[1], sip)];
  const c1: [number, number] = [sh[0] + 30, mix(sh[1] + 10, sh[1] - 10, sip)];
  const d = `M${start[0]},${start[1]} Q${over[0]},${over[1] - 10} ${sh[0] + 14},${sh[1] - 8} Q${c1[0]},${c1[1]} ${end[0]},${end[1]}`;
  const ang = Math.atan2(end[1] - c1[1], end[0] - c1[0]);
  return (
    <g transform={hikerTransform(p)}>
      <path d={d} stroke="#1f3a52" strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d={d} stroke="#d6e4ec" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.85} />
      {water > 0 && <path d={d} stroke="#1f6fb5" strokeWidth={5} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${water} 1`} />}
      {ice > 0 && (
        <g opacity={ice}>
          <path d={d} stroke="#f2fafe" strokeWidth={4.5} fill="none" strokeLinecap="round" strokeDasharray="5 4" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={end[0] - Math.cos(ang) * (8 + i * 12)} cy={end[1] - Math.sin(ang) * (8 + i * 12)} r={1.6 + Math.sin(t * 5 + i) * 0.8} fill="#ffffff" />
          ))}
        </g>
      )}
      {/* bite valve */}
      {!tucked && <rect x={end[0] - 5} y={end[1] - 5} width={14} height={10} rx={4} fill="#2d4a5e" transform={`rotate(${(ang * 180) / Math.PI} ${end[0]} ${end[1]})`} />}
      {tucked && <path d={`M${sh[0] + 8},${sh[1] - 2} q12,10 22,4`} stroke={LUKE.jacketShade} strokeWidth={6} fill="none" strokeLinecap="round" />}
    </g>
  );
};

const Breath: React.FC<{ p: HikerProps; t: number; on: number }> = ({ p, t, on }) => {
  if (on <= 0) return null;
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={on}>
      {Array.from({ length: 3 }, (_, i) => {
        const k = (t * 0.6 + i / 3) % 1;
        return <ellipse key={i} cx={g.head[0] + 34 + k * 60} cy={g.head[1] + 10 - k * 20} rx={8 + k * 18} ry={6 + k * 10} fill="#ffffff" opacity={(1 - k) * 0.5} />;
      })}
    </g>
  );
};

// Soft bladder held in front of the chest, with steam above when warm.
const Bladder: React.FC<{ p: HikerProps; t: number; steam: number }> = ({ p, t, steam }) => {
  const g = hikerGeometry(p);
  const h = g.arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <rect x={h[0] - 4} y={h[1] - 70} width={46} height={92} rx={16} fill="#8fd0d6" opacity={0.95} />
      <rect x={h[0] + 2} y={h[1] - 62} width={8} height={70} rx={4} fill="#ffffff" opacity={0.5} />
      <rect x={h[0] + 8} y={h[1] - 82} width={22} height={14} rx={4} fill="#2a52a0" />
      {steam > 0 &&
        [0, 1, 2].map((i) => {
          const k = (t * 0.5 + i / 3) % 1;
          return <path key={i} d={`M${h[0] + 14 + i * 6},${h[1] - 90 - k * 60} q8,-10 0,-20 q-8,-10 0,-20`} stroke="#ffffff" strokeWidth={3} fill="none" opacity={(1 - k) * 0.7 * steam} />;
        })}
    </g>
  );
};

// ---------- shared world ----------
const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#ffffff" seed={8} drift={t * 30} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={53} base={treeY - 260} amp={420} scale={250} col="#9aabb9" lit="#ffffff" peak={200} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.75} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={59} base={treeY - 120} amp={260} scale={180} col="#7b8f8c" lit="#eef3f5" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.45} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// ============ S1 HOOK: wide, windy ridge, he tries to drink (0 - 3.95) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.9);
  const cam: Cam = { x: t * 14 + hh.x, y: hh.y, zoom: mix(1.0, 1.08, t / 3.95), rot: hh.rot };
  const g = 1480;
  const sip = at(t, [1.2, 1.7], [0, 1]);
  const p: HikerProps = { x: 470, y: g, scale: 1.6, walk: 0, lean: 0.04, poles: false, handOverride: sip > 0.5 ? [36, -40] : [30, 30], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINDY} uid="a" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Snow y={g} slope={0.04} />
        <Subject rimX={3}>
          <Person {...p} outfit={LUKE} expression={t > 2.6 ? "tired" : "neutral"} />
          <Tube p={p} sip={sip} ice={1} t={t} />
          <Breath p={p} t={t} on={1} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3328" side="right" />
      </Plane>
      <Particles seed={31} n={40} col="#ffffff" fall={90} />
      <Grade sunX={800} sunY={560} warm="225,230,240" cool="25,45,80" />
      <Title text={"His water froze\nin the tube"} t={t} t0={0} top={130} size={118} />
      <Chip text="2 liters on his back" t={t} t0={1.5} x={80} y={400} icon="none" />
      <Chip text="Not a drop" t={t} t0={2.85} x={80} y={500} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: cold, windy ridge (3.9 - 6.5) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.9);
  const cam: Cam = { x: lt * 12 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.6), rot: hh.rot };
  const g = 1400;
  const ph = lt * 2.6;
  const p: HikerProps = { x: 340 + lt * 40, y: g + 200, scale: 2.3, phase: ph, walk: 0.45, lean: 0.14, poles: false, handOverride: freeHand(ph, 0.45), slope: 0.08 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINDY} uid="b" treeY={g - 80} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Snow y={g + 230} slope={0.08} />
        <Subject rimX={3}>
          <Person {...p} outfit={LUKE} expression="tired" />
          <Tube p={p} sip={0} ice={0.6} t={t} />
          <Breath p={p} t={t} on={1} />
        </Subject>
      </Plane>
      <Particles seed={32} n={50} col="#ffffff" fall={120} />
      <Grade sunX={800} sunY={560} warm="225,230,240" cool="25,45,80" vignette={0.55} />
      <Chip text="Cold" t={t} t0={4.29} x={80} y={240} icon="none" big />
      <Chip text="Windy ridge" t={t} t0={4.75} x={80} y={370} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: frozen solid in the tube (6.45 - 9.2) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.05, 1.13, lt / 2.75), rot: hh.rot };
  const p: HikerProps = { x: 440, y: 2350, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: [40, -50], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINDY} uid="c" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3}>
          <Person {...p} outfit={LUKE} expression="tired" />
          <Tube p={p} sip={1} ice={at(t, [6.9, 7.8], [0.3, 1])} t={t} />
          <Breath p={p} t={t} on={0.7} />
        </Subject>
      </Plane>
      <Particles seed={33} n={36} col="#ffffff" fall={100} />
      <Grade sunX={800} sunY={560} warm="215,220,235" cool="20,40,75" vignette={0.65} />
      <Readout label="DRINK TUBE" value="FROZEN" ok={false} t={t} t0={7.68} x={80} y={240} pulseAt={8.05} />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: the fix (9.15 - 11.3) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: at(lt, [0, 2.1], [-70, 0]) + hh.y, zoom: at(lt, [0, 2.1], [1.12, 1.04]), rot: hh.rot };
  const g = 1400;
  const sip = at(t, [10.3, 10.7], [0, 1]);
  const p: HikerProps = { x: 560, y: g + 200, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: sip > 0.5 ? [36, -40] : [30, 30], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={BRIGHT} uid="d" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Snow y={g + 200} />
        <Subject>
          <Person {...p} outfit={LUKE} expression="happy" />
          <Tube p={p} sip={sip} water={sip} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#2a3328" side="left" />
      </Plane>
      <Rays x={BRIGHT.sun[0]} y={BRIGHT.sun[1]} strength={0.2} />
      <Particles seed={34} n={20} col="#ffffff" fall={30} />
      <Grade sunX={820} sunY={560} warm="255,226,190" cool="30,50,80" />
      <Title text={"Blow it back."} t={t} t0={9.3} top={200} size={150} />
      <Chip text="After every sip" t={t} t0={10.14} x={80} y={380} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: sip, then blow the water back down (11.25 - 15.05) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 6 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 3.8), rot: hh.rot };
  const water = at(t, [11.3, 12.9], [1, 0]);
  const sip = at(t, [13.6, 14.0], [1, 0]);
  const p: HikerProps = { x: 440, y: 2350, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: sip > 0.5 ? [40, -50] : [34, 30], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={BRIGHT} uid="e" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={LUKE} expression="happy" />
          <Tube p={p} sip={sip} water={water} t={t} />
        </Subject>
      </Plane>
      <Particles seed={35} n={18} col="#ffffff" fall={30} />
      <Grade sunX={820} sunY={560} vignette={0.6} />
      <Chip text="Blow it back into the bladder" t={t} t0={11.32} x={80} y={240} icon="check" />
      <Chip text="Tube stays empty" t={t} t0={14.0} x={80} y={350} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S3c CLOSE-UP: tube tucked under the jacket (15.0 - 17.9) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 8 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.9), rot: hh.rot };
  const tucked = t > 15.6;
  const p: HikerProps = { x: 500, y: 2350, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: tucked ? [34, 26] : [40, -6], breathe: Math.sin(t * 2.3) * 2 };
  const flash = at(t, [15.6, 15.68, 15.95], [0, 1, 0]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINDY} uid="f" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3}>
          <Person {...p} outfit={LUKE} expression="happy" />
          <Tube p={p} sip={0} tucked={tucked} t={t} />
          <Breath p={p} t={t} on={0.6} />
        </Subject>
      </Plane>
      <AbsoluteFill style={{ background: "#fff", opacity: flash * 0.2 }} />
      <Particles seed={36} n={30} col="#ffffff" fall={80} />
      <Grade sunX={800} sunY={560} warm="225,230,240" cool="25,45,80" vignette={0.6} />
      <Chip text="Tube under your jacket" t={t} t0={15.24} x={80} y={240} icon="check" big />
      <Chip text="Close to your body" t={t} t0={16.67} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3d MEDIUM: fill up with warm water, not hot (17.85 - 20.6) ============
const S3d: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.03, 1.09, lt / 2.75), rot: hh.rot };
  const g = 1400;
  const p: HikerProps = { x: 470, y: g + 200, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [44, -10], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={BRIGHT} uid="g" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Snow y={g + 200} />
        <Subject rimX={4}>
          <Person {...p} outfit={LUKE} expression="happy" />
          <Bladder p={p} t={t} steam={0.5} />
        </Subject>
      </Plane>
      <Rays x={BRIGHT.sun[0]} y={BRIGHT.sun[1]} strength={0.18} />
      <Particles seed={37} n={18} col="#ffffff" fall={25} />
      <Grade sunX={820} sunY={560} />
      <Readout label="FILL UP WITH" value="WARM" ok={true} t={t} t0={18.87} x={80} y={240} />
      <Chip text="Not hot" t={t} t0={19.56} x={80} y={470} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: sipping all the way to the top (20.55 - 22.55) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 16 + hh.x, y: hh.y, zoom: at(lt, [0, 1.2], [1.16, 1.04]), rot: hh.rot };
  const g = 1400;
  const sip = at(t, [20.8, 21.2], [0, 1]);
  const p: HikerProps = { x: 480, y: g + 200, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: sip > 0.5 ? [36, -40] : [30, 30] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Snow y={g + 200} />
        <Subject rimX={6}>
          <Person {...p} outfit={LUKE} expression="happy" />
          <Tube p={p} sip={sip} water={sip} t={t} />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.26} col="255,214,150" />
      <Particles seed={38} n={22} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"Sipping to\nthe top."} t={t} t0={off + 0.1} top={200} size={150} />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hydration-bladder-insulated-water-reservoir-card.jpg"
      photoH={760}
      spec="INSULATED · 1L OR 2L · DRINK TUBE"
      name={
        <>
          Hydration
          <br />
          Bladder
        </>
      }
      nameSize={100}
      price="From $14.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V38B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.95} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.9} to={6.5} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={3.9} />
    </Scene>
    <Scene from={6.45} to={9.2} fadeIn={0.08} fadeOut={0.12}>
      <S2b off={6.45} />
    </Scene>
    <Scene from={9.15} to={11.3} fadeIn={0.12} fadeOut={0.1}>
      <S3a off={9.15} />
    </Scene>
    <Scene from={11.25} to={15.05} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={11.25} />
    </Scene>
    <Scene from={15.0} to={17.9} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={15.0} />
    </Scene>
    <Scene from={17.85} to={20.6} fadeIn={0.1} fadeOut={0.12}>
      <S3d off={17.85} />
    </Scene>
    <Scene from={20.55} to={22.55} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={20.55} />
    </Scene>
    <Scene from={22.5} to={27} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.9, 1560],
        [3.9, 6.45, 1560],
        [6.45, 9.15, 1560],
        [9.15, 11.25, 1560],
        [11.25, 15.0, 1560],
        [15.0, 17.85, 1560],
        [17.85, 20.55, 1560],
        [20.55, 22.5, 1560],
      ]}
    />
  </AbsoluteFill>
);
