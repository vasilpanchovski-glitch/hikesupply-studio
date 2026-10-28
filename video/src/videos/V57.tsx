// V57: "First-aid kit at the bottom of the pack" in the cinematic illustrated style of C01.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, LeafTree, Pine, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v57.json";

const words = vo.words as unknown as Word[];

const GREY: Sky = { top: "#53687c", mid: "#a9b5bc", low: "#dfe0d8", sun: [800, 620], sunR: 44, sunCol: "#f8f6ec", glow: "#ecebe0" };
const WARM: Sky = { top: "#3f6f9c", mid: "#c3cfd6", low: "#f6e2bc", sun: [790, 640], sunR: 56, sunCol: "#fffbe8", glow: "#ffdc9c" };

const NINA: Outfit = {
  ...JAKE,
  skin: "#C68E6C",
  skinShade: "#A8724F",
  hair: "#1f1612",
  beard: null,
  ponytail: "#1f1612",
  cap: "#3E6B5A",
  capShade: "#2f5446",
  jacket: "#C9A23E",
  jacketShade: "#a5832c",
  pants: "#3a3d42",
  pantsShade: "#2a2c30",
  pack: "#4E6E86",
  packShade: "#3C566A",
};
const MAYA: Outfit = {
  ...JAKE,
  skin: "#F0C8A8",
  skinShade: "#D4A888",
  hair: "#a8642e",
  beard: null,
  ponytail: "#a8642e",
  cap: "#7A3E4E",
  capShade: "#5e2f3c",
  jacket: "#4A6FA5",
  jacketShade: "#3a5884",
  pack: "#7a5a3a",
  packShade: "#5e4429",
};
const SAM: Outfit = { ...JAKE, cap: "#2F3B45", capShade: "#222c34", jacket: "#9C4A2E", jacketShade: "#7a3822" };
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e", "#8a6a2a"];
const TAN = "#B39A62";
const TAN_D = "#93804f";

// ---------- scenery ----------
const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = 440 + (i % 3) * 70;
      if (i % 3 === 1) return <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c="#3b6550" c2="#2b4d3c" />;
      return <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={["#c27e34", "#a8522a", "#b89a40"][i % 3]} c2={["#9a6222", "#843e1e", "#8e7630"][i % 3]} />;
    })}
  </Svg>
);

// Wet trail: dark mud, puddles, wet leaves.
const Mud: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <rect x={-400} y={y - 40} width={1880} height={1000} fill="#5a4a38" />
    <rect x={-400} y={y - 40} width={1880} height={36} fill="#6a5a44" />
    {Array.from({ length: 4 }, (_, i) => {
      const x = ((((i * 520 - shift) % 2080) + 2080) % 2080) - 400;
      return <ellipse key={i} cx={x} cy={y + 90 + (i % 2) * 180} rx={150} ry={26} fill="#8fa2ad" opacity={0.55} />;
    })}
    {Array.from({ length: 28 }, (_, i) => {
      const x = ((((i * 89 - shift) % 2080) + 2080) % 2080) - 400;
      const yy = y + 20 + ((i * 67) % 420);
      return <ellipse key={i} cx={x} cy={yy} rx={18} ry={7} fill={LEAVES[i % 4]} opacity={0.9} transform={`rotate(${((i * 37) % 60) - 30} ${x} ${yy})`} />;
    })}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={27} drift={t * 10} opacity={0.45} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={71} base={treeY - 280} amp={340} scale={260} col="#93a3b8" />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.6} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={73} base={treeY - 120} amp={230} scale={190} col="#7a7a5e" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.4} />
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

// Red scrape on the palm of the near hand.
const Scrape: React.FC<{ p: HikerProps; k: number; band?: number }> = ({ p, k, band = 0 }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${h[0] - 7},${h[1] - 2} l12,-4 M${h[0] - 6},${h[1] + 3} l11,-3`} stroke="#c0392b" strokeWidth={2.4} strokeLinecap="round" opacity={k * (1 - band)} />
      <rect x={h[0] - 11} y={h[1] - 5} width={22} height={9} rx={3} fill="#f2e3cf" stroke="#d8c6ae" strokeWidth={1} opacity={band} />
    </g>
  );
};

// The tan MOLLE pouch with a red cross patch, worn on the hip belt.
const PouchShape: React.FC<{ x: number; y: number; s: number; open?: number }> = ({ x, y, s, open = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-30} y={-40} width={60} height={80} rx={12} fill={TAN} />
    <rect x={-30} y={-40} width={60} height={12} rx={6} fill={TAN_D} />
    <rect x={-8} y={-34} width={16} height={56} rx={3} fill="#c4ad76" />
    <rect x={-11} y={-6} width={22} height={22} rx={4} fill="#C9302C" />
    <rect x={-2.5} y={-2} width={5} height={14} fill="#fff" />
    <rect x={-7} y={2.5} width={14} height={5} fill="#fff" />
    {open > 0 && (
      <g opacity={open}>
        <rect x={-30} y={-40 - 70 * open} width={60} height={70 * open} rx={10} fill={TAN_D} />
        <rect x={-22} y={-34 - 60 * open} width={44} height={14} rx={3} fill="#f2e3cf" />
        <rect x={-20} y={-16 - 60 * open} width={18} height={10} rx={2} fill="#ffffff" />
        <rect x={2} y={-16 - 60 * open} width={18} height={10} rx={2} fill="#e9d9c0" />
      </g>
    )}
  </g>
);
const HipPouch: React.FC<{ p: HikerProps; k?: number }> = ({ p, k = 1 }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      <PouchShape x={g.hip[0] + 30} y={g.hip[1] - 6} s={0.42} />
    </g>
  );
};
const HandPouch: React.FC<{ p: HikerProps; open: number }> = ({ p, open }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <PouchShape x={h[0] + 6} y={h[1] - 4} s={0.5} open={open} />
    </g>
  );
};

// Close-up of an open pack, items being pulled out; the kit sits at the very bottom.
const OpenPack: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const items = [
    { c: "#3E7FA6", w: 120, h: 300, x: -140, rot: -14 },
    { c: "#C9A23E", w: 260, h: 140, x: 60, rot: 10 },
    { c: "#7A3E4E", w: 200, h: 110, x: -40, rot: -4 },
    { c: "#e8e2d4", w: 150, h: 90, x: 120, rot: 18 },
  ];
  return (
    <g transform="translate(540,1020)">
      <path d="M-260,-250 Q-300,-420 -200,-470" stroke="#2b2b2b" strokeWidth={36} fill="none" strokeLinecap="round" />
      <path d="M260,-250 Q300,-420 200,-470" stroke="#2b2b2b" strokeWidth={36} fill="none" strokeLinecap="round" />
      <path d="M-320,-260 Q0,-330 320,-260 L360,420 Q0,470 -360,420 Z" fill={NINA.pack} />
      <path d="M-300,-250 Q0,-310 300,-250 L290,-150 Q0,-200 -290,-150 Z" fill="#1b2730" />
      {items.map((it, i) => {
        const k = at(t, [t0 + i * 0.55, t0 + i * 0.55 + 0.5], [0, 1], outExpo);
        return (
          <g key={i} transform={`translate(${it.x + k * (i % 2 ? 160 : -160)},${-170 - k * 380}) rotate(${it.rot + k * (i % 2 ? 25 : -25)})`} opacity={1 - Math.max(0, k - 0.85) * 4}>
            <rect x={-it.w / 2} y={-it.h / 2} width={it.w} height={it.h} rx={24} fill={it.c} />
            <rect x={-it.w / 2} y={-it.h / 2} width={it.w} height={it.h * 0.25} rx={20} fill="rgba(255,255,255,0.15)" />
          </g>
        );
      })}
      <path d="M-320,-160 Q0,-210 320,-160 L360,420 Q0,470 -360,420 Z" fill={NINA.pack} />
      <path d="M-320,-160 Q0,-210 320,-160 L326,-100 Q0,-150 -326,-100 Z" fill={NINA.packShade} />
      <path d="M-250,60 L250,60" stroke={NINA.packShade} strokeWidth={10} />
      <rect x={-110} y={110} width={220} height={150} rx={30} fill={NINA.packShade} />
      <rect x={-20} y={96} width={40} height={30} rx={6} fill="#2b2b2b" />
      <path d="M-340,0 L-300,0 L-290,380 L-352,380 Z" fill={NINA.packShade} />
      <path d="M340,0 L300,0 L290,380 L352,380 Z" fill={NINA.packShade} />
      <path d="M-330,-60 L-330,400 M330,-60 L330,400" stroke="#2b2b2b" strokeWidth={12} opacity={0.5} />
      {/* x-ray hint: the kit buried at the bottom */}
      <g opacity={at(t, [t0 + 2.3, t0 + 2.7], [0, 0.9])}>
        <rect x={-60} y={300} width={120} height={80} rx={14} fill="#ffffff" opacity={0.25} />
        <rect x={-14} y={315} width={28} height={50} rx={3} fill="#C9302C" />
        <rect x={-25} y={326} width={50} height={28} rx={3} fill="#C9302C" />
      </g>
    </g>
  );
};

// Gear dumped on the muddy trail.
const Spill: React.FC<{ t: number; t0: number; y: number }> = ({ t, t0, y }) => {
  const items = [
    { c: "#3E7FA6", w: 50, h: 120, x: 520, rot: 70 },
    { c: "#C9A23E", w: 150, h: 70, x: 700, rot: -8 },
    { c: "#7A3E4E", w: 110, h: 60, x: 860, rot: 14 },
    { c: "#e8e2d4", w: 90, h: 56, x: 640, rot: -22 },
    { c: "#2f4a3a", w: 130, h: 50, x: 960, rot: 6 },
  ];
  return (
    <g>
      {items.map((it, i) => {
        const k = at(t, [t0 + i * 0.22, t0 + i * 0.22 + 0.35], [0, 1]);
        return (
          <g key={i} transform={`translate(${it.x},${y + 40 - (1 - k) * 260}) rotate(${it.rot})`} opacity={k > 0 ? 1 : 0}>
            <rect x={-it.w / 2} y={-it.h / 2} width={it.w} height={it.h} rx={14} fill={it.c} />
            <path d={`M${-it.w / 2 + 6},${it.h / 2 - 8} l${it.w - 12},0`} stroke="#3a2c20" strokeWidth={8} opacity={0.6} />
          </g>
        );
      })}
    </g>
  );
};

// Close-up side view of a pack with the pouch on the hip belt; a hand reaches it.
const PackSide: React.FC<{ t: number; reachAt: number }> = ({ t, reachAt }) => {
  const r = at(t, [reachAt, reachAt + 0.6], [0, 1], outExpo);
  return (
    <g transform="translate(540,1180)">
      <path d="M-200,-560 Q-40,-620 120,-560 L170,300 Q0,340 -200,300 Z" fill={NINA.pack} />
      <path d="M-200,-560 Q-40,-620 120,-560 L110,-470 Q-40,-520 -190,-470 Z" fill={NINA.packShade} />
      <path d="M-196,-300 Q-40,-340 136,-300" stroke={NINA.packShade} strokeWidth={14} fill="none" />
      <path d="M-196,-60 Q-40,-90 150,-60" stroke={NINA.packShade} strokeWidth={14} fill="none" />
      <rect x={-60} y={-320} width={30} height={60} rx={5} fill="#2b2b2b" />
      <rect x={-60} y={-80} width={30} height={60} rx={5} fill="#2b2b2b" />
      <path d="M-170,-440 L-170,250" stroke={NINA.packShade} strokeWidth={30} opacity={0.6} />
      <path d="M150,-480 Q300,-300 260,40" stroke="#2b2b2b" strokeWidth={34} fill="none" strokeLinecap="round" />
      <rect x={-260} y={60} width={600} height={70} rx={20} fill="#2b2b2b" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={40 + i * 60} y={70} width={40} height={50} rx={4} fill="#3a3a3a" />
      ))}
      <PouchShape x={180} y={90} s={3.2} />
      {/* hand reaching */}
      <g transform={`translate(${mix(520, 210, r)},${mix(-120, 30, r)}) rotate(${mix(-30, 10, r)})`}>
        <path d="M0,0 L260,-140" stroke={NINA.jacket} strokeWidth={90} strokeLinecap="round" />
        <ellipse cx={0} cy={0} rx={52} ry={44} fill={NINA.skin} stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
        <path d="M-40,-16 q-26,8 -22,30" stroke={NINA.skinShade} strokeWidth={14} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};

// ============ S1 HOOK: medium two-shot, her friend slips on wet leaves (0 - 3.6) ============
const S1: React.FC = () => {
  const t = useT();
  const slip = at(t, [0.9, 1.25, 1.9], [0, 1, 0.35]);
  const sh = handheld(t, 0.6, at(t, [1.1, 1.2, 1.5], [0, 1, 0]) * 0.8);
  const cam: Cam = { x: t * 10 + sh.x, y: sh.y, zoom: mix(1.0, 1.07, t / 3.6), rot: sh.rot };
  const g = 1480;
  const friend: HikerProps = { x: 380, y: g, scale: 2.2, walk: 0, lean: 0.06 - slip * 0.35, poles: false, handOverride: [mix(30, 70, slip), mix(30, -60, Math.min(1, t / 1.6))], breathe: Math.sin(t * 2.6) * 2 };
  const nina: HikerProps = { x: 800, y: g + 30, scale: 2.0, walk: 0, lean: 0.12, poles: false, handOverride: [40, 20] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="a" treeY={g - 60} blur={1.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Mud y={g} shift={cam.x} />
        <Subject col="rgba(235,240,250,0.75)">
          <Person {...nina} outfit={NINA} expression="neutral" flip />
          <Person {...friend} outfit={MAYA} expression="tired" />
          <Scrape p={friend} k={at(t, [1.3, 1.6], [0, 1])} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2218" side="left" />
      </Plane>
      <Particles seed={571} n={24} leaves={LEAVES} fall={50} />
      <Grade sunX={800} sunY={620} cool="150,170,200" />
      <Title text={"Her first-aid kit\nwas under\neverything"} t={t} t0={0} top={130} size={104} />
      <Chip text="Scraped hand" t={t} t0={2.5} x={80} y={500} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2a CLOSE-UP: digging through the pack (3.6 - 7.3) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 3.7), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="b" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(235,240,250,0.7)">
          <OpenPack t={t} t0={3.8} />
        </Subject>
      </Plane>
      <Particles seed={572} n={14} leaves={LEAVES} fall={40} />
      <Grade sunX={800} sunY={620} vignette={0.6} cool="150,170,200" />
      <Chip text="First-aid kit?" t={t} t0={4.45} x={80} y={240} icon="none" big />
      <Chip text="Bottom of the pack" t={t} t0={6.1} x={80} y={370} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b MEDIUM: everything dumped onto the muddy trail (7.3 - 10.8) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 14 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.5), rot: hh.rot };
  const g = 1480;
  const nina: HikerProps = { x: 380, y: g, scale: 2.3, walk: 0, lean: 0.38, poles: false, handOverride: [110, 90], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GREY} uid="c" treeY={g - 80} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <Mud y={g} shift={cam.x} />
        <Svg>
          <Spill t={t} t0={7.55} y={g} />
        </Svg>
        <Subject col="rgba(235,240,250,0.75)">
          <Person {...nina} outfit={NINA} expression="tired" />
        </Subject>
      </Plane>
      <Particles seed={573} n={20} leaves={LEAVES} fall={50} />
      <Grade sunX={800} sunY={620} vignette={0.55} cool="150,170,200" />
      <Chip text="Everything in the mud" t={t} t0={8.9} x={80} y={240} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a CLOSE-UP: keep it on the outside (10.8 - 15.95) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: at(lt, [0, 1.2], [-30, 0]) + hh.y, zoom: mix(1.08, 1.0, lt / 5.1), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="d" treeY={1300} blur={11} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <PackSide t={t} reachAt={14.4} />
        </Subject>
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.24} />
      <Particles seed={574} n={14} col="#fff2d0" bokeh />
      <Grade sunX={790} sunY={640} vignette={0.5} />
      <Title text={"Keep it on\nthe outside."} t={t} t0={11.89} top={180} size={130} />
      <Chip text="Reach it in seconds" t={t} t0={14.69} x={80} y={470} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3b MEDIUM: tell your group where it is (15.95 - 18.8) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 16 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.85), rot: hh.rot };
  const g = 1500;
  const nina: HikerProps = { x: 330, y: g, scale: 2.3, walk: 0, lean: 0.08, poles: false, handOverride: [64, 10], breathe: Math.sin(t * 2.2) * 2 };
  const maya: HikerProps = { x: 700, y: g - 30, scale: 1.9, walk: 0, lean: 0.06, poles: false, handOverride: [30, 30] };
  const sam: HikerProps = { x: 900, y: g - 50, scale: 1.75, walk: 0, lean: 0.06, poles: false, handOverride: [30, 30] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="e" treeY={g - 80} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Mud y={g} shift={cam.x} />
        <Subject>
          <Person {...sam} outfit={SAM} expression="happy" flip />
          <Person {...maya} outfit={MAYA} expression="happy" flip />
          <Person {...nina} outfit={NINA} expression="happy" />
          <HipPouch p={nina} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2218" side="right" />
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.28} />
      <Particles seed={575} n={16} leaves={LEAVES} fall={40} />
      <Grade sunX={790} sunY={640} />
      <Chip text="Tell your group" t={t} t0={15.99} x={80} y={240} icon="check" big />
      <Chip text="Before you start" t={t} t0={17.36} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: kit open before her friend sits down (18.8 - 22.95) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 14 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.04]), rot: hh.rot };
  const g = 1480;
  const nina: HikerProps = { x: 640, y: g, scale: 2.3, walk: 0, lean: 0.1, poles: false, handOverride: [70, -20], breathe: Math.sin(t * 2.2) * 2 };
  const maya: HikerProps = { x: 300, y: g + 20, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [60, -10] };
  const open = at(t, [19.5, 20.1], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="f" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Mud y={g} shift={cam.x} />
        <Subject rimX={-5} col="rgba(255,226,170,0.85)">
          <Person {...maya} outfit={MAYA} expression="neutral" />
          <Scrape p={maya} k={1} band={at(t, [21.3, 21.7], [0, 1])} />
          <Person {...nina} outfit={NINA} expression="happy" flip />
          <g transform={`translate(${2 * nina.x},0) scale(-1,1)`}>
            <HandPouch p={nina} open={open} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f2e1c" side="left" />
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.3} />
      <Particles seed={576} n={20} col="#fff2d0" bokeh />
      <Grade sunX={790} sunY={640} />
      <Title text={"Open in\nseconds."} t={t} t0={off + 0.1} top={180} size={140} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/trail-first-aid-pouch-cut.png"
      cutoutH={760}
      spec="EMPTY POUCH · BUILD YOUR OWN KIT"
      name={
        <>
          Trail First-Aid
          <br />
          Pouch
        </>
      }
      nameSize={100}
      price="$24.99"
      save="Save this before your next group hike"
    />
  );
};

export const V57: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.65} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.6} to={7.35} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={3.6} />
    </Scene>
    <Scene from={7.3} to={10.85} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={7.3} />
    </Scene>
    <Scene from={10.8} to={16.0} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={10.8} />
    </Scene>
    <Scene from={15.95} to={18.85} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={15.95} />
    </Scene>
    <Scene from={18.8} to={23.0} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={18.8} />
    </Scene>
    <Scene from={22.85} to={27.5} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.6, 1560],
        [3.6, 7.3, 1560],
        [7.3, 10.8, 1560],
        [10.8, 15.95, 1560],
        [15.95, 18.8, 1560],
        [18.8, 22.85, 1560],
      ]}
    />
  </AbsoluteFill>
);
