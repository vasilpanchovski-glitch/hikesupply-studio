// V33B: v33 "What pants to wear hiking" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, FPS, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v33b.json";

const words = vo.words as unknown as Word[];

const COOL: Sky = { top: "#4d6a86", mid: "#a9bac4", low: "#e6e3d4", sun: [790, 600], sunR: 46, sunCol: "#fbf7ea", glow: "#f1ecd8" };
const GREY: Sky = { top: "#56616b", mid: "#98a2a8", low: "#cfd2cc", sun: [760, 560], sunR: 40, sunCol: "#eef0ea", glow: "#dfe2dc" };
const WARM: Sky = { top: "#3a6d9e", mid: "#b9cfe0", low: "#f7e6c4", sun: [820, 620], sunR: 52, sunCol: "#fffbe8", glow: "#ffe2a6" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lerpC = (a: string, b: string, k: number) => {
  const A = hex(a);
  const B = hex(b);
  return "#" + A.map((v, i) => Math.round(mix(v, B[i], k)).toString(16).padStart(2, "0")).join("");
};

const BEN: Outfit = {
  ...JAKE,
  hair: "#6b4a2e",
  beard: null,
  cap: "#4A4E55",
  capShade: "#363A40",
  jacket: "#C8963E",
  jacketShade: "#A37828",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};
// Jeans: k = 0 dry, 1 soaked (darker).
const jeans = (k: number): Outfit => ({ ...BEN, pants: lerpC("#5b7fa8", "#2c4260", k), pantsShade: lerpC("#46668b", "#213249", k) });
const NYLON: Outfit = { ...BEN, pants: "#55603F", pantsShade: "#414a30" };
const LEGGINGS: Outfit = { ...GUIDE, skin: "#E8B996", skinShade: "#CC9A76", hair: "#2a1f1a", ponytail: "#2a1f1a", beard: null, cap: "#8E5A7A", capShade: "#6F4560", jacket: "#3E6E8E", jacketShade: "#2f566f", pants: "#2b2f33", pantsShade: "#1f2226", pack: "#B5553A", packShade: "#8E3F2A" };
const CONVERT: Outfit = { ...GUIDE, jacket: "#5f8a6a", jacketShade: "#4a6e53", pants: "#a8987a", pantsShade: "#8a7c62", cap: "#C9B48E", capShade: "#A8946F" };
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

const Trail: React.FC<{ y: number; wet?: number }> = ({ y, wet = 0 }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={900} fill={lerpC("#5f7a44", "#4a6236", wet)} />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 4} L1480,${y + 120} Q540,${y + 90} -400,${y + 120} Z`} fill={lerpC("#c0a67e", "#8f7a5c", wet)} />
    {Array.from({ length: 14 }, (_, i) => (
      <path key={i} d={`M${-300 + i * 120},${y - 46} l-8,-30 m8,30 l6,-36 m-6,36 l14,-24`} stroke="#4d6436" strokeWidth={5} strokeLinecap="round" />
    ))}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={7} drift={t * 12} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={13} base={treeY - 260} amp={380} scale={250} col="#8fa3b4" lit="#e8eef2" peak={160} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.75} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={31} base={treeY - 120} amp={260} scale={180} col="#6f8577" />
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

// Screen-space drizzle.
const Drizzle: React.FC<{ on: number; blur?: number }> = ({ on, blur = 0 }) => {
  const t = useCurrentFrame() / FPS;
  if (on <= 0) return null;
  return (
    <AbsoluteFill style={{ filter: blur ? `blur(${blur}px)` : undefined }}>
      <Svg>
        <g opacity={on} stroke="#e8eef4" strokeLinecap="round">
          {Array.from({ length: 70 }, (_, i) => {
            const x = ((i * 157) % 1180) - 50;
            const y = ((((t * 1500 + i * 293) % 2100) + 2100) % 2100) - 100;
            return <line key={i} x1={x} y1={y} x2={x - 8} y2={y + 46} strokeWidth={3} opacity={0.35 + (i % 4) * 0.1} />;
          })}
        </g>
      </Svg>
    </AbsoluteFill>
  );
};

// Drops in local hiker units falling from the knees / hem (cotton drips), or bouncing off (nylon sheds).
const Drips: React.FC<{ p: HikerProps; t: number; on: number; bounce?: boolean }> = ({ p, t, on, bounce }) => {
  if (on <= 0) return null;
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={on}>
      {Array.from({ length: 8 }, (_, i) => {
        const leg = g.legs[i % 2];
        const src = i % 4 < 2 ? leg.knee : [leg.foot[0], leg.foot[1] - 30];
        const k = (t * 1.4 + i * 0.37) % 1;
        const dx = bounce ? (i % 2 ? 1 : -1) * k * 40 : 0;
        const dy = bounce ? -Math.sin(k * Math.PI) * 30 + k * 20 : k * 60;
        return <ellipse key={i} cx={src[0] + 14 + dx} cy={src[1] + dy} rx={2.6} ry={4} fill="#d8ecf7" opacity={1 - k} />;
      })}
    </g>
  );
};

// ============ S1 HOOK: wide, Ben in jeans on a cool fall hike (0 - 2.5) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: t * 18 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 2.5), rot: hh.rot };
  const g = 1440;
  const ph = t * 3.6;
  const p: HikerProps = { x: 240 + t * 70, y: g, scale: 1.4, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COOL} uid="a" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject>
          <Person {...p} outfit={jeans(0)} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={COOL.sun[0]} y={COOL.sun[1]} strength={0.16} />
      <Particles seed={61} n={22} leaves={LEAVES} fall={50} />
      <Grade sunX={790} sunY={600} warm="255,214,170" />
      <Title text={"What pants to\nwear hiking?\nNot jeans"} t={t} t0={0} top={130} size={124} />
      <Chip text="Jeans on a cool fall hike" t={t} t0={1.16} x={80} y={540} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: a light drizzle soaks them (2.45 - 4.85) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: lt * 20 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.4), rot: hh.rot };
  const g = 1380;
  const ph = lt * 3.2;
  const wet = at(t, [3.0, 4.6], [0, 1]);
  const p: HikerProps = { x: 380 + lt * 50, y: g + 200, scale: 2.3, phase: ph, walk: 0.6, lean: 0.14, poles: false, handOverride: freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="b" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} wet={wet} />
        <Subject rimX={2}>
          <Person {...p} outfit={jeans(wet)} expression={wet > 0.5 ? "tired" : "neutral"} />
        </Subject>
      </Plane>
      <Drizzle on={at(t, [2.5, 2.9], [0, 1])} />
      <Particles seed={62} n={10} col="#e8eef4" />
      <Grade sunX={760} sunY={560} warm="220,220,210" cool="25,45,65" vignette={0.6} />
      <Chip text="Light drizzle" t={t} t0={2.65} x={80} y={240} icon="none" big />
      <Chip text="Jeans soaked" t={t} t0={3.41} x={80} y={370} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: cotton stays cold and heavy (4.8 - 7.15) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.35), rot: hh.rot };
  const ph = 0.6 + lt * 1.6;
  const p: HikerProps = { x: 520, y: 1500, scale: 4.4, phase: ph, walk: 0.4, lean: 0.14, poles: false, handOverride: freeHand(ph, 0.4) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="c" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={1480} wet={1} />
        <Subject rimX={3}>
          <Person {...p} outfit={jeans(1)} expression="tired" />
          <Drips p={p} t={t} on={1} />
        </Subject>
      </Plane>
      <Drizzle on={0.8} blur={1} />
      <Grade sunX={760} sunY={560} warm="220,220,210" cool="25,45,65" vignette={0.65} />
      <Readout label="WET COTTON" value="COLD & HEAVY" ok={false} t={t} t0={5.0} x={80} y={230} pulseAt={5.76} />
      <Chip text="For hours" t={t} t0={6.22} x={80} y={470} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: here's what to wear instead (7.1 - 9.25) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: at(lt, [0, 2.15], [-80, 0]) + hh.y, zoom: at(lt, [0, 2.15], [1.12, 1.04]), rot: hh.rot };
  const g = 1380;
  const p: HikerProps = { x: 560, y: g + 200, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [40, 28], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="d" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject>
          <Person {...p} outfit={NYLON} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#4a2e14" side="left" />
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.2} />
      <Particles seed={63} n={20} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} />
      <Title text={"What to wear\ninstead."} t={t} t0={7.2} top={200} size={150} />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: quick-dry synthetic with stretch, a big step up (9.2 - 15.0) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 5.8), rot: hh.rot };
  // a big step up onto a rock: the near foot rises, body follows
  const up = at(t, [13.6, 14.6], [0, 1]);
  const ph = 0.8 + lt * 1.4;
  const p: HikerProps = { x: 430 + up * 200, y: 1500 - up * 80, scale: 4.4, phase: ph, walk: mix(0.45, 0.9, at(t, [13.4, 13.9], [0, 1])), lean: 0.12 + up * 0.08, poles: false, handOverride: freeHand(ph, 0.45) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="e" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={1480} />
        <Svg>
          <path d="M640,1520 Q660,1430 760,1418 L1300,1412 L1300,1560 Q900,1580 640,1520 Z" fill="#8d877b" />
          <path d="M664,1450 Q690,1424 780,1420 L1300,1414" stroke="#bdb6a6" strokeWidth={10} fill="none" strokeLinecap="round" />
        </Svg>
        <Subject rimX={6}>
          <Person {...p} outfit={NYLON} expression="happy" />
        </Subject>
      </Plane>
      <Particles seed={64} n={16} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} vignette={0.6} />
      <Chip text="Quick-dry synthetic" t={t} t0={10.32} x={80} y={240} icon="check" big />
      <Chip text="Like nylon" t={t} t0={12.21} x={80} y={370} icon="check" big />
      <Chip text="Stretch for big steps" t={t} t0={13.63} x={80} y={500} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3c WIDE: leggings, convertible pants, skip cotton (14.95 - 20.2) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: lt * 12 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 5.25), rot: hh.rot };
  const g = 1440;
  const ph = lt * 3.4;
  const walker = (x0: number, o: Outfit, shift: number, exp: "happy" | "neutral" = "happy") => {
    const q = ph + shift;
    return <Person x={x0 + lt * 46} y={g + (shift % 2) * 10} scale={1.3} phase={q} walk={0.6} lean={0.08} poles={false} handOverride={freeHand(q, 0.6)} outfit={o} expression={exp} />;
  };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="f" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject>
          {walker(120, CONVERT, 1.1)}
          {walker(400, NYLON, 0)}
          {walker(680, LEGGINGS, 2.3)}
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.2} />
      <Particles seed={65} n={22} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} />
      <Chip text="Leggings: dry days" t={t} t0={15.07} x={80} y={240} icon="check" big />
      <Chip text="Convertible: warm days" t={t} t0={16.79} x={80} y={370} icon="check" big />
      <Chip text="Skip cotton" t={t} t0={18.9} x={80} y={500} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: drizzle again, the pants shed it and dry (20.15 - 25.75) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 16 + hh.x, y: hh.y, zoom: at(lt, [0, 1.2], [1.16, 1.04]), rot: hh.rot };
  const g = 1380;
  const ph = lt * 3.2;
  const p: HikerProps = { x: 420 + lt * 30, y: g + 200, scale: 2.3, phase: ph, walk: 0.6, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.6) };
  const shell = at(t, [23.6, 24.0], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} wet={0.4} />
        <Subject rimX={6}>
          <Person {...p} outfit={shell > 0.5 ? { ...NYLON, jacket: "#2f566f", jacketShade: "#24445a" } : NYLON} expression="happy" />
          <Drips p={p} t={t} on={at(t, [20.4, 20.8], [0, 1]) * at(t, [22.6, 23.2], [1, 0])} bounce />
        </Subject>
      </Plane>
      <Drizzle on={at(t, [22.4, 23.4], [0.7, 0.25])} />
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.24} col="255,214,150" />
      <Particles seed={68} n={22} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"Dry while\nyou walk."} t={t} t0={off + 0.1} top={170} size={150} />
      <Chip text="Real rain? Add a rain shell" t={t} t0={23.53} x={80} y={520} icon="check" />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/cool-touch-trail-pants-mens-card.jpg"
      spec="MEN'S · QUICK-DRY · 4 COLOURS"
      name={
        <>
          Cool-Touch
          <br />
          Trail Pants
        </>
      }
      nameSize={100}
      price="$64.99"
      save="Save this before your next hike"
    />
  );
};

export const V33B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.5} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={2.45} to={4.85} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={2.45} />
    </Scene>
    <Scene from={4.8} to={7.15} fadeIn={0.08} fadeOut={0.12}>
      <S2b off={4.8} />
    </Scene>
    <Scene from={7.1} to={9.25} fadeIn={0.12} fadeOut={0.1}>
      <S3a off={7.1} />
    </Scene>
    <Scene from={9.2} to={15.0} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={9.2} />
    </Scene>
    <Scene from={14.95} to={20.2} fadeIn={0.1} fadeOut={0.12}>
      <S3c off={14.95} />
    </Scene>
    <Scene from={20.15} to={25.75} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={20.15} />
    </Scene>
    <Scene from={25.7} to={30} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.45, 1560],
        [2.45, 4.8, 1560],
        [4.8, 7.1, 1560],
        [7.1, 9.2, 1560],
        [9.2, 14.95, 1560],
        [14.95, 20.15, 1560],
        [20.15, 25.7, 1560],
      ]}
    />
  </AbsoluteFill>
);
