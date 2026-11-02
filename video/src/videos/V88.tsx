// V88: "She drove three hours. The dog couldn't go." in the cinematic C01 style. Launch video 1 for Hiking With Your Dog (p10).
// Facts (NPS pets pages): most national parks allow pets only on a few trails, roads and campgrounds; rules differ by park, so check
// the park's pets page before you go. National forests and many state parks allow leashed dogs on far more trails.
// Generic signs only, no real park logos. End card = Hiking With Your Dog — Trail Guide & Checklists (Printable), 20 pages, $5.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, CLEAR, FALL, GOLD, Subject, Trail } from "../fall";
import { Dog, dogCollar } from "../dog";
import vo from "../vo/v88.json";

const words = vo.words as unknown as Word[];

const NOON: Sky = { top: "#3f6f9c", mid: "#a8c6dc", low: "#f2e4c4", sun: [800, 520], sunR: 50, sunCol: "#fff8e4", glow: "#ffdca0" };

const SAM: Outfit = {
  ...GUIDE,
  skin: "#F0C4A0",
  skinShade: "#D4A27E",
  hair: "#6b3f22",
  ponytail: "#6b3f22",
  beard: null,
  cap: "#2F5D3E",
  capShade: "#244a31",
  jacket: "#B83A55",
  jacketShade: "#8E2B42",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  pack: "#3E4F5C",
  packShade: "#2C3943",
  glove: null,
};
const LEASH = "#2F7F86";
const WOOD = "#7a5a3c";
const WOOD2 = "#5e4430";

const toScreen = (p: HikerProps, q: readonly number[]): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};
const handOf = (p: HikerProps) => toScreen(p, hikerGeometry(p).arms[1].hand);

const Leash: React.FC<{ a: [number, number]; b: [number, number]; w?: number; sag?: number }> = ({ a, b, w = 6, sag = 60 }) => (
  <path d={`M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${Math.max(a[1], b[1]) + sag} ${b[0]},${b[1]}`} stroke={LEASH} strokeWidth={w} fill="none" strokeLinecap="round" />
);

// Paw print icon (centre cx, cy, size r).
const Paw: React.FC<{ cx: number; cy: number; r: number; col: string }> = ({ cx, cy, r, col }) => (
  <g fill={col}>
    <ellipse cx={cx} cy={cy + r * 0.25} rx={r * 0.48} ry={r * 0.4} />
    <ellipse cx={cx - r * 0.55} cy={cy - r * 0.25} rx={r * 0.18} ry={r * 0.24} />
    <ellipse cx={cx - r * 0.2} cy={cy - r * 0.55} rx={r * 0.18} ry={r * 0.24} />
    <ellipse cx={cx + r * 0.2} cy={cy - r * 0.55} rx={r * 0.18} ry={r * 0.24} />
    <ellipse cx={cx + r * 0.55} cy={cy - r * 0.25} rx={r * 0.18} ry={r * 0.24} />
  </g>
);

// Generic trailhead sign: NO PETS ON TRAILS with a crossed-out paw. Board centre (x, y), width w.
const NoPetsSign: React.FC<{ x: number; y: number; w: number; ground: number }> = ({ x, y, w, ground }) => {
  const h = w * 0.82;
  const r = w * 0.2;
  return (
    <g>
      <rect x={x - w * 0.36} y={y} width={w * 0.07} height={ground - y} fill={WOOD2} />
      <rect x={x + w * 0.29} y={y} width={w * 0.07} height={ground - y} fill={WOOD2} />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={w * 0.04} fill={WOOD} />
      <rect x={x - w / 2 + w * 0.05} y={y - h / 2 + w * 0.05} width={w * 0.9} height={h - w * 0.1} rx={w * 0.03} fill="#f3efe4" />
      <Paw cx={x} cy={y - h * 0.16} r={r * 0.75} col="#2b2b2b" />
      <circle cx={x} cy={y - h * 0.16} r={r} fill="none" stroke="#c9443a" strokeWidth={w * 0.045} />
      <line x1={x - r * 0.7} y1={y - h * 0.16 - r * 0.7} x2={x + r * 0.7} y2={y - h * 0.16 + r * 0.7} stroke="#c9443a" strokeWidth={w * 0.045} />
      <text x={x} y={y + h * 0.2} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={w * 0.13} fill="#2b2b2b" letterSpacing={2}>
        NO PETS
      </text>
      <text x={x} y={y + h * 0.36} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={w * 0.1} fill="#2b2b2b" letterSpacing={2}>
        ON TRAILS
      </text>
    </g>
  );
};

// Generic forest trail sign with a leashed-dog icon.
const LeashSign: React.FC<{ x: number; y: number; w: number; ground: number }> = ({ x, y, w, ground }) => {
  const h = w * 0.7;
  return (
    <g>
      <rect x={x - w * 0.04} y={y} width={w * 0.08} height={ground - y} fill={WOOD2} />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={w * 0.04} fill="#3d5a3a" />
      <rect x={x - w / 2 + w * 0.04} y={y - h / 2 + w * 0.04} width={w * 0.92} height={h - w * 0.08} rx={w * 0.03} fill="none" stroke="#e9dfc4" strokeWidth={w * 0.012} />
      <g transform={`translate(${x - w * 0.12},${y + h * 0.02}) scale(${w / 1100})`}>
        <Dog x={0} y={0} s={1} look={{ coat: "#e9dfc4", shade: "#e9dfc4", belly: "#e9dfc4", ear: "#e9dfc4", collar: "#e9dfc4", nose: "#e9dfc4" }} mood="alert" />
      </g>
      <path d={`M${x - w * 0.12 + 84 * (w / 1100)},${y + h * 0.02 - 132 * (w / 1100)} Q${x + w * 0.12},${y - h * 0.05} ${x + w * 0.3},${y - h * 0.22}`} stroke="#e9dfc4" strokeWidth={w * 0.014} fill="none" />
      <text x={x} y={y - h * 0.3} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={w * 0.085} fill="#e9dfc4" letterSpacing={3}>
        TRAIL
      </text>
      <text x={x} y={y + h * 0.36} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={w * 0.075} fill="#e9dfc4" letterSpacing={2}>
        LEASHED DOGS WELCOME
      </text>
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Sam and Juniper arrive at the trailhead, the sign says no (0 - 4.35) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.02, 1.08, t / 4.35), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.6;
  const stop = at(t, [0, 1.6], [0, 1], outExpo);
  const walk = 1 - stop;
  const p: HikerProps = { x: mix(260, 380, stop), y: g, scale: 2.3, phase: ph, walk: 0.7 * walk, lean: 0.04, poles: false, handOverride: walk > 0.2 ? freeHand(ph, 0.6) : [40, 20], breathe: Math.sin(t * 2.2) * 1.5 };
  const dx = mix(470, 560, stop);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NOON} uid="a" treeY={g - 140} t={t} />
      <Plane cam={cam} depth={0.7} blur={6}>
        <Svg>
          <Car x={-120} y={g - 40} s={1.6} body="#4f6f8c" shade="#3b5670" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          <NoPetsSign x={850} y={g - 520} w={320} ground={g + 10} />
        </Svg>
        <Subject rimX={5}>
          <Person {...p} outfit={SAM} expression={t > 2.2 ? "tired" : "happy"} />
          <Dog x={dx} y={g + 6} s={1.25} phase={t * 5} walk={walk} mood={t > 2.4 ? "sad" : "happy"} tailWag={t * 12 * (t < 2.4 ? 1 : 0.2)} headUp={at(t, [2, 2.8], [0, 1])} />
          <Leash a={handOf(p)} b={dogCollar(dx, g + 6, 1.25)} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Rays x={NOON.sun[0]} y={NOON.sun[1]} strength={0.14} />
      <Particles seed={881} n={18} leaves={FALL} fall={30} />
      <Grade sunX={800} sunY={520} warm="255,220,180" />
      <Title text={"She drove three hours.\nThe dog couldn't go."} t={t} t0={0} top={130} size={96} />
      <Chip text="3 hours of driving" t={t} t0={1.0} x={80} y={360} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the sign, Juniper looks up at it (4.35 - 7.5) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y - lt * 8, zoom: mix(1.0, 1.07, lt / 3.15), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NOON} uid="b" treeY={1500} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <NoPetsSign x={600} y={760} w={640} ground={2100} />
        </Svg>
        <Subject rimX={5}>
          <Dog x={140} y={1900} s={3.3} mood="sad" headUp={1} tailWag={t * 2} />
        </Subject>
      </Plane>
      <Particles seed={882} n={14} leaves={FALL} fall={30} />
      <Grade sunX={800} sunY={520} warm="255,220,180" vignette={0.55} />
      <Chip text="Turned away at the trailhead" t={t} t0={6.7} x={60} y={200} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: the big park, dogs only on a few trails, roads and campgrounds (7.5 - 12.88) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: mix(1.0, 1.06, lt / 5.4), rot: hh.rot };
  const g = 1380;
  const p: HikerProps = { x: 300, y: g + 60, scale: 1.1, walk: 0, lean: 0, poles: false, handOverride: [36, 26], breathe: Math.sin(t * 2) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NOON} uid="c" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 60} grass="#7d874e" dirt="#8a8a86" />
        <Svg>
          {/* campground tents and a road edge */}
          {[[640, "#C2662E"], [860, "#2F7F86"]].map(([x, c]) => (
            <g key={String(x)} transform={`translate(${x},${g + 40})`}>
              <path d="M-90,0 L0,-110 L90,0 Z" fill={c as string} />
              <path d="M-24,0 L0,-70 L24,0 Z" fill="rgba(0,0,0,0.35)" />
            </g>
          ))}
        </Svg>
        <Subject rimX={3}>
          <Person {...p} outfit={SAM} expression="tired" />
          <Dog x={400} y={g + 64} s={0.6} mood="sad" />
          <Leash a={handOf(p)} b={dogCollar(400, g + 64, 0.6)} w={3} sag={20} />
        </Subject>
      </Plane>
      <Rays x={NOON.sun[0]} y={NOON.sun[1]} strength={0.16} />
      <Particles seed={883} n={16} leaves={FALL} fall={26} />
      <Grade sunX={800} sunY={520} warm="255,220,180" />
      <Readout label="MOST NATIONAL PARKS" value="Most trails: no pets" ok={false} t={t} t0={7.6} x={60} y={200} />
      <Chip text="A few trails" t={t} t0={10.5} x={60} y={430} icon="check" />
      <Chip text="Roads" t={t} t0={11.05} x={60} y={560} icon="check" />
      <Chip text="Campgrounds" t={t} t0={11.7} x={60} y={690} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 FIX CLOSE-UP: the park's pets page on her phone (12.88 - 16.64) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 3.8), rot: hh.rot };
  const up = at(t, [13.7, 14.3], [0, 1], outExpo);
  const row = (i: number) => at(t, [14.6 + i * 0.35, 14.9 + i * 0.35], [0, 1]);
  const rows: [string, boolean][] = [
    ["CAMPGROUNDS", true],
    ["PAVED ROADS", true],
    ["SOME TRAILS", true],
    ["MOST TRAILS", false],
  ];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={1200} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4}>
          <g transform={`translate(0,${(1 - up) * 700})`}>
            <ellipse cx={300} cy={1300} rx={110} ry={150} fill={SAM.skin} stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
            <ellipse cx={780} cy={1300} rx={110} ry={150} fill={SAM.skin} stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
            <rect x={290} y={540} width={500} height={900} rx={56} fill="#1d2226" />
            <rect x={310} y={560} width={460} height={860} rx={40} fill="#f4f1ea" />
            <rect x={310} y={560} width={460} height={150} rx={40} fill="#2C3B2E" />
            <rect x={310} y={650} width={460} height={60} fill="#2C3B2E" />
            <Paw cx={400} cy={650} r={34} col="#e9dfc4" />
            <text x={570} y={672} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={58} fill="#fff" letterSpacing={3}>
              PETS
            </text>
            {rows.map(([label, ok], i) => (
              <g key={label} opacity={row(i)}>
                <rect x={340} y={750 + i * 150} width={400} height={120} rx={18} fill={ok ? "#e3efe2" : "#fbe3dc"} />
                <circle cx={392} cy={810 + i * 150} r={24} fill={ok ? "#3f8a4e" : "#c9443a"} />
                {ok ? (
                  <path d={`M380,${810 + i * 150} l9,10 l17,-20`} stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d={`M382,${800 + i * 150} l20,20 M402,${800 + i * 150} l-20,20`} stroke="#fff" strokeWidth={7} strokeLinecap="round" />
                )}
                <text x={432} y={826 + i * 150} fontFamily="Barlow Condensed" fontWeight={700} fontSize={44} fill="#2b2b2b">
                  {label}
                </text>
              </g>
            ))}
            <ellipse cx={360} cy={1410} rx={60} ry={40} fill={SAM.skinShade} />
            <ellipse cx={720} cy={1410} rx={60} ry={40} fill={SAM.skinShade} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={884} n={12} leaves={FALL} fall={26} />
      <Grade sunX={800} sunY={520} warm="255,226,190" vignette={0.5} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={13.75} top={200} size={124} />
      <Chip text="Check the park's pets page" t={t} t0={14.0} x={60} y={200} icon="check" />
      <Chip text="Before you go" t={t} t0={15.15} x={60} y={330} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: national forest trailhead, leashed dogs welcome (16.64 - 19.3) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.08, 1.02, lt / 2.66), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 300, y: g, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [40, 22], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={g - 160} t={t} mid="#4a5a40" />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          <LeashSign x={820} y={g - 560} w={360} ground={g + 10} />
        </Svg>
        <Subject rimX={5}>
          <Person {...p} outfit={SAM} expression="happy" />
          <Dog x={520} y={g + 6} s={1.25} mood="happy" tailWag={t * 14} />
          <Leash a={handOf(p)} b={dogCollar(520, g + 6, 1.25)} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.2} />
      <Particles seed={885} n={20} leaves={FALL} fall={30} />
      <Grade sunX={790} sunY={560} warm="255,214,170" />
      <Chip text="National forests" t={t} t0={16.7} x={60} y={200} icon="check" big />
      <Chip text="Many state parks" t={t} t0={18.1} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: leash clips onto Juniper's collar (19.3 - 21.81) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.5), rot: hh.rot };
  const s = 4.4;
  const dx = -60;
  const dy = 1980;
  const [cx, cy] = dogCollar(dx, dy, s);
  const k = at(t, [19.4, 20.0], [0, 1], outExpo);
  const click = at(t, [20.0, 20.1, 20.5], [0, 1, 0]);
  const hx = mix(cx - 260, cx - 30, k);
  const hy = mix(cy - 420, cy - 40, k);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={1300} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Dog x={dx} y={dy} s={s} mood="happy" tailWag={t * 12} />
          {/* leash runs up to her hand (off frame, top left); her fingers hold the clip */}
          <path d={`M${hx},${hy} Q${hx - 120},${hy - 300} -200,${hy - 700}`} stroke={LEASH} strokeWidth={22} fill="none" strokeLinecap="round" />
          <g transform={`translate(${hx},${hy}) rotate(${mix(-10, 20, k)})`}>
            <rect x={-22} y={-6} width={44} height={66} rx={12} fill="#b9c0c4" stroke="#7b8287" strokeWidth={5} />
            <path d="M-12,60 Q0,84 12,60" stroke="#7b8287" strokeWidth={8} fill="none" />
          </g>
          <g transform={`translate(${hx - 70},${hy - 40}) rotate(-35) scale(0.72)`}>
            <rect x={-70} y={-300} width={140} height={300} rx={50} fill={SAM.jacket} />
            <ellipse cx={0} cy={20} rx={80} ry={64} fill={SAM.skin} />
            {[-48, -16, 16, 48].map((d) => (
              <ellipse key={d} cx={d + 20} cy={70} rx={18} ry={32} fill={SAM.skin} />
            ))}
            <ellipse cx={-50} cy={30} rx={20} ry={34} fill={SAM.skin} transform="rotate(30,-50,30)" />
            <ellipse cx={-10} cy={0} rx={36} ry={20} fill={SAM.skinShade} opacity={0.5} />
          </g>
          <circle cx={cx} cy={cy + 10} r={30 + click * 60} fill="none" stroke="#fff" strokeWidth={6} opacity={click} />
        </Subject>
      </Plane>
      <Particles seed={886} n={14} leaves={FALL} fall={26} />
      <Grade sunX={790} sunY={560} warm="255,214,170" vignette={0.55} />
      <Chip text="Leashed dogs" t={t} t0={19.55} x={60} y={200} icon="check" big />
      <Chip text="Far more trails" t={t} t0={20.46} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF: Sam and Juniper on a leaf-covered forest trail (21.81 - 24.6) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.6;
  const px = 220 + lt * 70;
  const p: HikerProps = { x: px, y: g, scale: 2.0, phase: ph, walk: 0.8, lean: 0.06, poles: false, handOverride: [44, 18], breathe: 0 };
  const dx = px + 300;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="g" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} dirt="#a0683c" />
        <Subject rimX={-6} col="rgba(255,200,140,0.9)">
          <Person {...p} outfit={SAM} expression="happy" />
          <Dog x={dx} y={g + 6} s={1.1} phase={t * 6} walk={1} mood="happy" tailWag={t * 14} />
          <Leash a={handOf(p)} b={dogCollar(dx, g + 6, 1.1)} sag={40} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#4a2a14" side="both" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.34} col="255,214,160" />
      <Particles seed={887} n={26} leaves={FALL} fall={34} />
      <Grade sunX={740} sunY={660} warm="255,200,140" />
      <Chip text="Next weekend: on the trail" t={t} t0={22.05} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-with-your-dog-trail-guide.jpg"
      spec="20 PAGES · PRINTABLE GUIDE & CHECKLISTS"
      name={
        <>
          Hiking With
          <br />
          Your Dog
        </>
      }
      nameSize={96}
      price="$5.99"
      save="Save this before your next dog hike"
    />
  );
};

export const V88: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.4} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.35} to={7.55} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.35} />
    </Scene>
    <Scene from={7.5} to={12.93} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={7.5} />
    </Scene>
    <Scene from={12.88} to={16.69} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={12.88} />
    </Scene>
    <Scene from={16.64} to={19.35} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={16.64} />
    </Scene>
    <Scene from={19.3} to={21.86} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={19.3} />
    </Scene>
    <Scene from={21.81} to={24.6} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={21.81} />
    </Scene>
    <Scene from={24.45} to={28.9} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.35, 1560],
        [4.35, 7.5, 1560],
        [7.5, 12.88, 1560],
        [12.88, 16.64, 1560],
        [16.64, 19.3, 1560],
        [19.3, 21.81, 1560],
        [21.81, 24.45, 1560],
      ]}
    />
  </AbsoluteFill>
);
