// V58: "Forecast changed by noon" in the cinematic illustrated style of C01.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v58.json";

const words = vo.words as unknown as Word[];

const STORM: Sky = { top: "#2f3a48", mid: "#5f6b78", low: "#a3a7a8", sun: [820, 560], sunR: 30, sunCol: "#d9dcdc", glow: "#b8bcbc" };
const CLEAR: Sky = { top: "#3f74a8", mid: "#b6cfe2", low: "#f3e6c6", sun: [820, 600], sunR: 54, sunCol: "#fffbe8", glow: "#ffe2a6" };
const DAWN: Sky = { top: "#3b4f7a", mid: "#c99288", low: "#ffd0a0", sun: [300, 980], sunR: 62, sunCol: "#fff0cc", glow: "#ffb47a" };

const DANA: Outfit = {
  ...JAKE,
  skin: "#E8B898",
  skinShade: "#CA9878",
  hair: "#6b4a2e",
  beard: null,
  ponytail: "#6b4a2e",
  cap: "#C9A23E",
  capShade: "#a5832c",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#3a3d42",
  pantsShade: "#2a2c30",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};

// ---------- scenery ----------
const Woods: React.FC<{ y: number; shift: number; dark?: boolean }> = ({ y, shift, dark }) => (
  <Svg>
    {Array.from({ length: 11 }, (_, i) => {
      const x = ((((-160 + i * 160 - shift) % 1760) + 1760) % 1760) - 300;
      const h = 380 + (i % 3) * 80;
      return <Pine key={i} x={x} y={y + (i % 2) * 20} h={h} c={dark ? "#33463f" : "#3b6550"} c2={dark ? "#26352f" : "#2b4d3c"} />;
    })}
  </Svg>
);

// Open ridge top: rock and dry grass that bends in the wind.
const RidgeTop: React.FC<{ y: number; shift: number; wind: number; t: number }> = ({ y, shift, wind, t }) => (
  <Svg>
    <path d={`M-400,${y - 30} Q540,${y - 90} 1480,${y - 20} L1480,${y + 960} L-400,${y + 960} Z`} fill="#7d7258" />
    {Array.from({ length: 6 }, (_, i) => {
      const x = ((((i * 360 - shift) % 2160) + 2160) % 2160) - 400;
      return <ellipse key={i} cx={x} cy={y + 80 + (i % 2) * 200} rx={90} ry={34} fill="#6a6660" />;
    })}
    {Array.from({ length: 34 }, (_, i) => {
      const x = ((((i * 63 - shift) % 2140) + 2140) % 2140) - 400;
      const yy = y - 40 + ((i * 53) % 380);
      const bend = 14 + wind * (40 + Math.sin(t * 7 + i) * 18);
      return <path key={i} d={`M${x},${yy} q${bend * 0.4},-30 ${bend},-56`} stroke={i % 2 ? "#b8a26a" : "#a08a56"} strokeWidth={6} fill="none" strokeLinecap="round" />;
    })}
  </Svg>
);

// Rain curtain hanging from a cloud bank.
const RainCurtain: React.FC<{ x: number; y: number; w: number; t: number; k: number }> = ({ x, y, w, t, k }) => (
  <Svg>
    <g opacity={k}>
      {Array.from({ length: 30 }, (_, i) => {
        const xx = x + (i / 30) * w;
        const off = (t * 600 + i * 47) % 200;
        return <line key={i} x1={xx + off * 0.2} y1={y + off} x2={xx + off * 0.2 - 14} y2={y + off + 300} stroke="#c7cfd6" strokeWidth={3} opacity={0.45} />;
      })}
      <rect x={x} y={y} width={w} height={520} fill="#8d98a3" opacity={0.25} />
    </g>
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; storm?: number }> = ({ cam, sky, uid, treeY, blur = 0, t, storm = 0 }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={33} drift={t * 10} opacity={0.3 * (1 - storm)} />
      <Clouds y={380 + storm * 40} col="#3b434c" seed={39} drift={t * (30 + storm * 80)} opacity={storm * 0.95} />
      <Clouds y={560} col="#4a525b" seed={41} drift={t * (20 + storm * 60)} opacity={storm * 0.8} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={81} base={treeY - 280} amp={360} scale={260} col={storm > 0.5 ? "#6d7682" : "#93a3b8"} lit={storm > 0.5 ? undefined : "#eef2f5"} peak={110} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.6} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={87} base={treeY - 120} amp={230} scale={190} col={storm > 0.5 ? "#4f5c58" : "#6f8577"} />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.4} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} dark={storm > 0.5} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Phone in the near hand (glowing screen).
const HandPhone: React.FC<{ p: HikerProps; glow?: number }> = ({ p, glow = 1 }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <rect x={h[0] - 9} y={h[1] - 36} width={20} height={36} rx={4} fill="#1d1f22" />
      <rect x={h[0] - 7} y={h[1] - 33} width={16} height={28} rx={2} fill="#bfe3ff" opacity={0.6 + 0.4 * glow} />
    </g>
  );
};

// Hair and jacket flutter in the wind (small streamers behind the head).
const Wind: React.FC<{ p: HikerProps; t: number; k: number }> = ({ p, t, k }) => {
  const head = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${head[0] - 60 - i * 10},${head[1] - 10 + i * 14} q-40,${Math.sin(t * 9 + i) * 10} -90,${4 + i * 3}`} stroke="#ffffff" strokeWidth={3} fill="none" opacity={0.5} strokeLinecap="round" />
      ))}
    </g>
  );
};

// Forecast card: the town below vs the mountain itself.
const Forecast: React.FC<{ t: number; t0: number; markAt: number }> = ({ t, t0, markAt }) => {
  if (isClean()) return null;
  const m = at(t, [markAt, markAt + 0.4], [0, 1], outExpo);
  const row = (label: string, sub: string, val: string, bad: boolean, hi: number, y: number) => (
    <div
      style={{
        position: "absolute",
        left: 50,
        right: 50,
        top: y,
        height: 220,
        borderRadius: 24,
        background: hi > 0 ? (bad ? "#f7e3e1" : "#f1ede4") : "#f1ede4",
        border: `${hi * 8}px solid ${bad ? "#D9443A" : "transparent"}`,
        boxSizing: "border-box",
        padding: "30px 40px",
      }}
    >
      <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 70, color: "#2a2a26", letterSpacing: 1 }}>{label}</div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 44, color: "#6b6b66", letterSpacing: 1 }}>{sub}</div>
      <div style={{ position: "absolute", right: 40, top: 56, fontFamily: HEAD, fontWeight: 800, fontSize: 74, color: bad ? "#D9443A" : "#3E8E5A" }}>{val}</div>
    </div>
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 520,
        height: 700,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
        opacity: at(t, [t0, t0 + 0.2], [0, 1]),
      }}
    >
      <div style={{ position: "absolute", top: 36, left: 0, right: 0, textAlign: "center", fontFamily: HEAD, fontWeight: 800, fontSize: 60, letterSpacing: 3, color: "#2a2a26" }}>
        THIS MORNING
      </div>
      {row("TOWN BELOW", "where you sleep", "SUNNY", false, 0, 140)}
      {row("THE MOUNTAIN", "where you hike", "WIND, RAIN", true, m, 400)}
    </div>
  );
};

// ============ S1 HOOK: medium on the ridge, dark clouds rolling in (0 - 2.6) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: t * 24 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, t / 2.6), rot: hh.rot };
  const g = 1490;
  const p: HikerProps = { x: 420, y: g, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [40, 20], breathe: Math.sin(t * 2.6) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={STORM} uid="a" treeY={g - 120} blur={1.2} t={t} storm={1} />
      <Plane cam={cam} depth={0.2}>
        <RainCurtain x={600} y={620} w={520} t={t} k={0.8} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <RidgeTop y={g} shift={cam.x} wind={0.8} t={t} />
        <Subject col="rgba(220,228,240,0.7)">
          <Person {...p} outfit={DANA} expression="tired" />
          <Wind p={p} t={t} k={1} />
        </Subject>
      </Plane>
      <Particles seed={581} n={26} col="#d8dde2" fall={-30} bokeh={false} />
      <Grade sunX={820} sunY={560} cool="140,160,190" vignette={0.55} />
      <Title text={"She checked\nthe forecast\nthe night before"} t={t} t0={0} top={130} size={104} />
    </AbsoluteFill>
  );
};

// ============ S2a WIDE: noon on the ridge, wind up, gray clouds fast (2.6 - 6.9) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const storm = at(t, [2.6, 5.6], [0.35, 1]);
  const sh = handheld(t, 0.6, at(t, [3.9, 4.6], [0, 0.6]));
  const cam: Cam = { x: -lt * 20 + sh.x, y: sh.y, zoom: mix(1.0, 1.06, lt / 4.3), rot: sh.rot };
  const g = 1480;
  const p: HikerProps = { x: 560, y: g, scale: 1.5, walk: 0, lean: 0.1, poles: false, handOverride: [40, 20] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={storm > 0.6 ? STORM : CLEAR} uid="b" treeY={g - 140} t={t} storm={storm} />
      <Plane cam={cam} depth={1}>
        <RidgeTop y={g} shift={cam.x} wind={at(t, [3.9, 5], [0.1, 1])} t={t} />
        <Subject col="rgba(220,228,240,0.7)">
          <Person {...p} outfit={DANA} expression="neutral" />
          <Wind p={p} t={t} k={at(t, [3.9, 4.5], [0, 1])} />
        </Subject>
      </Plane>
      <Particles seed={582} n={24} col="#d8dde2" fall={-30} bokeh={false} />
      <Grade sunX={820} sunY={560} cool="140,160,190" />
      <Chip text="Noon" t={t} t0={2.9} x={80} y={240} icon="none" big />
      <Chip text="Wind picking up" t={t} t0={3.96} x={80} y={370} icon="x" big />
      <Chip text="Gray clouds, fast" t={t} t0={5.24} x={80} y={500} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: fall weather can turn in hours (6.9 - 10.3) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 3.4), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 2330, scale: 4.4, walk: 0, lean: 0.02, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.6) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={STORM} uid="c" treeY={1250} blur={10} t={t} storm={1} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(220,228,240,0.7)">
          <Person {...p} outfit={DANA} expression="tired" />
          <Wind p={p} t={t} k={1} />
        </Subject>
      </Plane>
      <Particles seed={583} n={18} col="#d8dde2" fall={-30} bokeh={false} />
      <Grade sunX={820} sunY={560} vignette={0.62} cool="140,160,190" />
      <Readout label="FALL MOUNTAIN WEATHER" value="CHANGES FAST" ok={false} t={t} t0={7.53} x={80} y={240} pulseAt={8.64} />
      <Chip text="In a few hours" t={t} t0={8.64} x={80} y={480} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: check again on the morning drive (10.3 - 13.0) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 12 + hh.x, y: at(lt, [0, 1.4], [-40, 0]) + hh.y, zoom: mix(1.1, 1.04, lt / 2.7), rot: hh.rot };
  const g = 1480;
  const p: HikerProps = { x: 660, y: g, scale: 2.3, walk: 0, lean: 0.08, poles: false, handOverride: [60, -50], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAWN} uid="d" treeY={g - 100} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 40} width={1880} height={1000} fill="#4a4a48" />
          <rect x={-400} y={g - 40} width={1880} height={20} fill="#5c5c58" />
          <Car x={260} y={g + 10} s={2.1} body="#5E7E8A" shade="#4a6470" lights />
        </Svg>
        <Subject col="rgba(255,206,150,0.85)">
          <Person {...p} outfit={DANA} expression="neutral" flip />
          <g transform={`translate(${2 * p.x},0) scale(-1,1)`}>
            <HandPhone p={p} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f2a24" side="right" />
      </Plane>
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.26} col="255,210,160" />
      <Particles seed={584} n={14} col="#ffe7c8" />
      <Grade sunX={300} sunY={980} warm="255,190,130" />
      <Title text={"Check again\nthis morning."} t={t} t0={11.25} top={200} size={130} />
    </AbsoluteFill>
  );
};

// ============ S3b CARD: the mountain, not the town below (13.0 - 16.3) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 3.3), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAWN} uid="e" treeY={1300} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Forecast t={t} t0={13.05} markAt={14.35} />
      </Plane>
      <Grade sunX={300} sunY={980} warm="255,190,130" vignette={0.55} />
      <Chip text="Not the town below" t={t} t0={14.93} x={80} y={1260} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3c MEDIUM: decide your turnaround signs first (16.3 - 21.65) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 14 + hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 5.35), rot: hh.rot };
  const g = 1480;
  const ph = t * 4;
  const p: HikerProps = { x: 380 + lt * 30, y: g, scale: 2.3, phase: ph, walk: 0.35, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.35) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={g - 80} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <RidgeTop y={g} shift={cam.x} wind={0.15} t={t} />
        <Subject>
          <Person {...p} outfit={DANA} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f2e1c" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.26} />
      <Particles seed={585} n={16} col="#fff2d0" bokeh />
      <Grade sunX={820} sunY={600} />
      <Title text={"Turn back if:"} t={t} t0={16.34} top={200} size={130} />
      <Chip text="Rising wind" t={t} t0={19.7} x={80} y={380} icon="x" big />
      <Chip text="Dark clouds" t={t} t0={20.57} x={80} y={510} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: wide, heading down early, rain stays on the peak (21.65 - 24.35) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: -lt * 26 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.1, 1.02]), rot: hh.rot };
  const g = 1470;
  const ph = t * 5;
  const p: HikerProps = { x: 620 - lt * 50, y: g, scale: 1.7, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="g" treeY={g - 60} t={t} storm={0.4} />
      <Plane cam={cam} depth={0.2}>
        <RainCurtain x={620} y={560} w={420} t={t} k={0.7} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <RidgeTop y={g} shift={cam.x} wind={0.3} t={t} />
        <Subject rimX={-5} col="rgba(255,226,170,0.85)">
          <Person {...p} outfit={DANA} expression="happy" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f2e1c" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.3} />
      <Particles seed={586} n={18} col="#fff2d0" bokeh />
      <Grade sunX={820} sunY={600} />
      <Title text={"Turned back\nearly."} t={t} t0={off + 0.1} top={180} size={140} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/stay-safe-bundle-card.jpg"
      photoH={760}
      spec="3 SAFETY GUIDES · INSTANT PDF"
      name={
        <>
          Stay Safe
          <br />
          Bundle
        </>
      }
      nameSize={104}
      price="$16.99"
      save="Save this before your next fall hike"
    />
  );
};

export const V58: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.65} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={2.6} to={6.95} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={2.6} />
    </Scene>
    <Scene from={6.9} to={10.35} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={6.9} />
    </Scene>
    <Scene from={10.3} to={13.05} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={10.3} />
    </Scene>
    <Scene from={13.0} to={16.35} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={13.0} />
    </Scene>
    <Scene from={16.3} to={21.7} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={16.3} />
    </Scene>
    <Scene from={21.65} to={24.4} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={21.65} />
    </Scene>
    <Scene from={24.25} to={28.5} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.6, 1560],
        [2.6, 6.9, 1560],
        [6.9, 10.3, 1560],
        [10.3, 13.0, 1560],
        [13.0, 16.3, 1560],
        [16.3, 21.65, 1560],
        [21.65, 24.25, 1560],
      ]}
    />
  </AbsoluteFill>
);
