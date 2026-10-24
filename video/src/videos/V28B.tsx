// V28B: v28 "Wind on the ridge" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v28b.json";

const words = vo.words as unknown as Word[];

const WARM: Sky = { top: "#3a6d9e", mid: "#b9cfe0", low: "#f7e6c4", sun: [820, 620], sunR: 52, sunCol: "#fffbe8", glow: "#ffe2a6" };
const COLD: Sky = { top: "#3f5a74", mid: "#9fb0bd", low: "#dfe2dc", sun: [800, 560], sunR: 42, sunCol: "#f6f6ee", glow: "#e6e9e0" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const TOM: Outfit = { ...JAKE, jacket: "#B8473A", jacketShade: "#93362B", hair: "#3a2a20", beard: "#4a3528", cap: "#2F3B45", capShade: "#222c34", pack: "#3E5F4B", packShade: "#2E4A39" };
// Tom in the packable shell (colour of the store windbreaker).
const TOM_SHELL: Outfit = { ...TOM, jacket: "#6E8C8E", jacketShade: "#566F71" };
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e"];

// ---------- scenery pieces ----------
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

const Trail: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={900} fill="#5f7a44" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 4} L1480,${y + 120} Q540,${y + 90} -400,${y + 120} Z`} fill="#c0a67e" />
    {Array.from({ length: 14 }, (_, i) => (
      <path key={i} d={`M${-300 + i * 120},${y - 46} l-8,-30 m8,30 l6,-36 m-6,36 l14,-24`} stroke="#4d6436" strokeWidth={5} strokeLinecap="round" />
    ))}
  </Svg>
);

// Open rocky ridge top: no trees, grass and stones.
const RidgeTop: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <path d={`M-400,${y - 40} Q300,${y - 90} 700,${y - 60} Q1000,${y - 40} 1480,${y - 20} L1480,2300 L-400,2300 Z`} fill="#7b8466" />
    <path d={`M-400,${y + 10} Q540,${y - 14} 1480,${y + 14} L1480,${y + 100} Q540,${y + 80} -400,${y + 110} Z`} fill="#b3a68a" />
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const x = ((((i * 260 - shift) % 1560) + 1560) % 1560) - 240;
      const s = 0.7 + (i % 3) * 0.25;
      return (
        <g key={i} transform={`translate(${x},${y + 170 + (i % 2) * 50}) scale(${s})`}>
          <path d="M-60,0 Q-50,-48 -6,-56 Q40,-52 60,0 Z" fill="#9a9a90" />
          <path d="M-6,-56 Q40,-52 60,0 L10,0 Z" fill="rgba(0,0,0,0.14)" />
        </g>
      );
    })}
  </Svg>
);

// Wind streaks blowing right to left. deflect > 0: streaks bend away around x0 (the shell blocks them).
const Wind: React.FC<{ t: number; k?: number; n?: number; y0?: number; h?: number }> = ({ t, k = 1, n = 16, y0 = 380, h = 1300 }) => (
  <Svg>
    <g opacity={0.8 * k}>
      {Array.from({ length: n }, (_, i) => {
        const y = y0 + ((i * 137) % h);
        const speed = 1500 + (i % 4) * 300;
        const len = 180 + (i % 3) * 100;
        const x = 1400 - ((((t + i * 0.37) * speed) % 2000) + 2000) % 2000;
        const wave = Math.sin(t * 6 + i) * 10;
        return <path key={i} d={`M${x},${y + wave} q${len * 0.3},-14 ${len * 0.6},0 t${len * 0.4},0`} stroke="#fff" strokeWidth={6 - (i % 3)} strokeLinecap="round" fill="none" opacity={0.35 + (i % 3) * 0.2} />;
      })}
    </g>
  </Svg>
);

// Packed windbreaker: small stuff sack, the same colour as the shell.
const ShellPouch: React.FC<{ x: number; y: number; s: number; o?: number; rot?: number }> = ({ x, y, s, o = 1, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-30} y={-40} width={60} height={82} rx={18} fill="#6E8C8E" />
    <rect x={-30} y={-40} width={22} height={82} rx={11} fill="#5f7c7e" />
    <rect x={-30} y={-40} width={60} height={18} rx={9} fill="#566F71" />
    <path d="M-6,-40 Q0,-58 6,-40" stroke="#2a2a2a" strokeWidth={4} fill="none" />
    <rect x={-3} y={-52} width={6} height={10} rx={2} fill="#2a2a2a" />
  </g>
);

// Breath / cold shiver marks near the face.
const Shiver: React.FC<{ p: HikerProps; t: number; k: number }> = ({ p, t, k }) => {
  if (k <= 0) return null;
  const h = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${h[0] + 44 + i * 14},${h[1] + 10 + i * 9} q8,-8 16,0 q8,8 16,0`} stroke="#eaf3f7" strokeWidth={3} fill="none" strokeLinecap="round" transform={`translate(${Math.sin(t * 30 + i) * 2},0)`} />
      ))}
    </g>
  );
};

// ---------- shared world: sky -> far ridge -> haze -> mid ridge -> tree line ----------
const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; trees?: boolean }> = ({ cam, sky, uid, treeY, blur = 0, t, trees = true }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={3} drift={t * (trees ? 12 : 40)} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={11} base={treeY - 260} amp={380} scale={250} col="#8fa3b4" lit="#e8eef2" peak={160} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.75} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={23} base={treeY - 120} amp={260} scale={180} col="#6f8577" />
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

// ============ S1 HOOK: wide, mild forest, no jacket (0 - 4.35) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: t * 16 + hh.x, y: hh.y, zoom: mix(1.0, 1.08, t / 4.35), rot: hh.rot };
  const g = 1440;
  const ph = t * 3.6;
  const p: HikerProps = { x: 150 + t * 70, y: g, scale: 1.3, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="a" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject>
          <Person {...p} outfit={TOM} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.2} />
      <Particles seed={11} n={22} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} />
      <Title text={"This is why\nthe ridge feels\nfreezing"} t={t} t0={0} top={130} size={124} />
      <Chip text="Jacket: left in the car" t={t} t0={2.92} x={80} y={570} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: out onto the open ridge (4.35 - 7.05) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: lt * 22 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.7), rot: hh.rot };
  const g = 1360;
  const ph = lt * 3.2;
  const p: HikerProps = { x: 300 + lt * 60, y: g + 200, scale: 2.3, phase: ph, walk: 0.6, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="b" treeY={g + 260} blur={2} t={t} trees={false} />
      <Plane cam={cam} depth={1}>
        <RidgeTop y={g} shift={cam.x} />
        <Subject>
          <Person {...p} outfit={TOM} />
        </Subject>
      </Plane>
      <Wind t={t} k={at(lt, [1.2, 2.6], [0, 0.6])} n={10} />
      <Particles seed={12} n={14} />
      <Grade sunX={800} sunY={560} warm="235,225,205" cool="25,50,70" />
      <Chip text="Open ridge" t={t} t0={6.21} x={80} y={240} big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: the wind hits, sweaty shirt turns cold (7.05 - 11.3) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [7.6, 7.7, 8.4], [0, 1, 0]);
  const hh = handheld(t, 0.7, shake);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 4.25) + shake * 0.04, rot: hh.rot };
  const hunch = at(t, [7.7, 8.4], [0, 1]);
  const p: HikerProps = { x: 560, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.04 + hunch * 0.12, poles: false, handOverride: hunch > 0.5 ? [44, -40] : [30, 34], breathe: Math.sin(t * 5) * 1.5 * hunch };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="c" treeY={1500} blur={9} t={t} trees={false} />
      <Plane cam={cam} depth={0.8} blur={8}>
        <RidgeTop y={1400} shift={0} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={TOM} expression={t > 7.7 ? "tired" : "neutral"} />
          <Shiver p={p} t={t} k={at(t, [9.6, 10.1], [0, 1])} />
        </Subject>
      </Plane>
      <Wind t={t} k={at(t, [7.25, 7.7], [0, 1])} n={22} y0={260} h={1300} />
      <Particles seed={13} n={10} />
      <Grade sunX={800} sunY={560} warm="225,225,215" cool="20,50,80" vignette={0.65} />
      <Chip text="Wind hits" t={t} t0={7.67} x={80} y={240} icon="x" big />
      <Readout label="SWEATY SHIRT" value="COLD" ok={false} t={t} t0={10.07} x={80} y={1120} pulseAt={10.07} />
    </AbsoluteFill>
  );
};

// ============ S2c WIDE: the ridge pulls heat off fast (11.3 - 13.7) ============
const S2c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.9);
  const cam: Cam = { x: -lt * 10 + hh.x, y: hh.y, zoom: mix(1.1, 1.02, lt / 2.4), rot: hh.rot };
  const g = 1420;
  const p: HikerProps = { x: 520, y: g + 40, scale: 1.25, walk: 0, lean: 0.18, poles: false, handOverride: [44, -40], breathe: Math.sin(t * 6) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="d" treeY={g + 300} t={t} trees={false} />
      <Plane cam={cam} depth={1}>
        <RidgeTop y={g} shift={cam.x + 300} />
        <Subject rimX={3}>
          <Person {...p} outfit={TOM} expression="tired" />
        </Subject>
      </Plane>
      <Wind t={t} k={1} n={18} y0={500} h={1200} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2e2618" side="left" sway={Math.sin(t * 8) * 10} />
      </Plane>
      <Particles seed={14} n={14} />
      <Grade sunX={800} sunY={560} warm="225,225,215" cool="20,45,70" vignette={0.6} />
      <Chip text="Wind pulls heat off fast" t={t} t0={11.4} x={80} y={240} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: here's the fix, a light windbreaker (13.65 - 16.55) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: at(lt, [0, 2.9], [-80, 0]) + hh.y, zoom: at(lt, [0, 2.9], [1.12, 1.03]), rot: hh.rot };
  const g = 1380;
  const p: HikerProps = { x: 470, y: g + 200, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: t > 15.0 ? [70, -10] : [30, 34], breathe: Math.sin(t * 2.3) * 2 };
  const hand = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="e" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject>
          <Person {...p} outfit={TOM} expression="happy" />
          <g transform={hikerTransform(p)}>
            <ShellPouch x={hand[0] + 6} y={hand[1] - 30} s={0.9} o={at(t, [15.0, 15.3], [0, 1])} rot={-6} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#4a2e14" side="left" />
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.2} />
      <Particles seed={15} n={20} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} />
      <Title text={"Here's\nthe fix."} t={t} t0={13.75} t1={14.9} top={200} size={160} />
      <Chip text="Carry a light windbreaker" t={t} t0={15.36} x={80} y={240} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: it packs small (16.5 - 18.9) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 2.4), rot: hh.rot };
  const p: HikerProps = { x: 600, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.05, poles: false, handOverride: [64, -24], breathe: Math.sin(t * 2.2) * 1.5 };
  const hand = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="f" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={TOM} expression="happy" />
          <g transform={hikerTransform(p)}>
            <ShellPouch x={hand[0] + 4} y={hand[1] - 30} s={at(t, [16.6, 17.2], [0.7, 0.95], outExpo)} rot={-8} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={16} n={16} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} vignette={0.6} />
      <Chip text="Packs small" t={t} t0={16.68} x={80} y={1160} icon="check" big />
      <Chip text="Blocks the wind" t={t} t0={17.53} x={80} y={1290} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3c MEDIUM: shell on at the open ground, wind blocked (18.85 - 21.8) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 12 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.95), rot: hh.rot };
  const g = 1360;
  const on = t >= 19.1;
  const flash = at(t, [19.0, 19.1, 19.5], [0, 0.7, 0]);
  const p: HikerProps = { x: 520, y: g + 200, scale: 2.3, walk: 0, lean: 0.05, poles: false, handOverride: on ? [30, 34] : [50, -60], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="g" treeY={g + 260} blur={2} t={t} trees={false} />
      <Plane cam={cam} depth={1}>
        <RidgeTop y={g} shift={cam.x} />
        <Subject rimX={4}>
          <Person {...p} outfit={on ? TOM_SHELL : TOM} expression={on ? "happy" : "neutral"} />
        </Subject>
      </Plane>
      <Wind t={t} k={0.8} n={16} />
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
      <Particles seed={17} n={14} />
      <Grade sunX={800} sunY={560} warm="245,225,195" cool="25,50,70" />
      <Chip text="On at the open ground" t={t} t0={18.91} x={80} y={240} icon="check" big />
      <Readout label="WIND" value="BLOCKED" ok={true} t={t} t0={20.0} x={80} y={380} pulseAt={20.0} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: golden light, next ridge, comfortable (21.75 - 24.1) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 16 + hh.x, y: hh.y, zoom: at(lt, [0, 1.2], [1.16, 1.04], outExpo), rot: hh.rot };
  const ph = t * 3;
  const p: HikerProps = { x: 430 + lt * 30, y: 1420 + 182 * 3, scale: 3, phase: ph, walk: 0.45, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.45), breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={1700} blur={6} t={t} trees={false} />
      <Plane cam={cam} depth={0.85} blur={5}>
        <RidgeTop y={1560} shift={cam.x * 2} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={TOM_SHELL} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.26} col="255,214,150" />
      <Particles seed={18} n={26} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"Shell on\nbefore the wind."} t={t} t0={off + 0.1} top={170} size={118} />
      <Chip text="Next ridge: comfortable" t={t} t0={22.2} x={80} y={470} icon="check" />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/packable-upf50-windbreaker-unisex-card.jpg"
      spec="PACKS INTO ITS OWN POUCH · UPF 50+"
      name={
        <>
          Packable
          <br />
          Windbreaker
        </>
      }
      nameSize={104}
      price="$29.99"
      save="Save this before your next ridge hike"
    />
  );
};

export const V28B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.35} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={4.3} to={7.1} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={4.3} />
    </Scene>
    <Scene from={7.05} to={11.35} fadeIn={0.08} fadeOut={0.12}>
      <S2b off={7.05} />
    </Scene>
    <Scene from={11.3} to={13.7} fadeIn={0.1} fadeOut={0.12}>
      <S2c off={11.3} />
    </Scene>
    <Scene from={13.65} to={16.55} fadeIn={0.12} fadeOut={0.1}>
      <S3a off={13.65} />
    </Scene>
    <Scene from={16.5} to={18.9} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={16.5} />
    </Scene>
    <Scene from={18.85} to={21.8} fadeIn={0.1} fadeOut={0.12}>
      <S3c off={18.85} />
    </Scene>
    <Scene from={21.75} to={24.1} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={21.75} />
    </Scene>
    <Scene from={24.05} to={28.5} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.3, 1560],
        [4.3, 7.05, 1560],
        [7.05, 11.3, 1560],
        [11.3, 13.65, 1560],
        [13.65, 16.5, 1560],
        [16.5, 18.85, 1560],
        [18.85, 21.75, 1560],
        [21.75, 24.05, 1560],
      ]}
    />
  </AbsoluteFill>
);
