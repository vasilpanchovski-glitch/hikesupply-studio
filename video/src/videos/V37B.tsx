// V37B: v37 "Frost on the footbridge" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v37b.json";

const words = vo.words as unknown as Word[];

const CLEAR: Sky = { top: "#3c6f9f", mid: "#a8c3d8", low: "#eef0e6", sun: [820, 560], sunR: 50, sunCol: "#fffbea", glow: "#f6ecd0" };
const SHADY: Sky = { top: "#3a5876", mid: "#8fa6ba", low: "#d6dde0", sun: [860, 520], sunR: 40, sunCol: "#f4f4ee", glow: "#dfe4e6" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const JESS: Outfit = {
  ...GUIDE,
  skin: "#E8B996",
  skinShade: "#CC9A76",
  hair: "#5b3a24",
  ponytail: "#5b3a24",
  beard: null,
  cap: "#8E5A7A",
  capShade: "#6F4560",
  jacket: "#3E6E8E",
  jacketShade: "#2f566f",
  pants: "#3E4650",
  pantsShade: "#2E353D",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};
const LEAVES = ["#c9863a", "#a5552c", "#b57a3e"];

// ---------- scenery ----------
const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = 440 + (i % 3) * 70;
      return i % 3 === 1 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c="#466f5a" c2="#33584a" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={i % 2 ? "#c98a3e" : "#a8582e"} c2={i % 2 ? "#a96f2c" : "#87451f"} />
      );
    })}
  </Svg>
);

const Ground: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={900} fill="#6d7f4c" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 4} L1480,${y + 120} Q540,${y + 90} -400,${y + 120} Z`} fill="#c0a67e" />
    {Array.from({ length: 14 }, (_, i) => (
      <path key={i} d={`M${-300 + i * 120},${y - 46} l-8,-30 m8,30 l6,-36 m-6,36 l14,-24`} stroke="#53693a" strokeWidth={5} strokeLinecap="round" />
    ))}
  </Svg>
);

// Wooden footbridge over a creek, side view. y = deck top (where feet stand). frost 0..1 whitens the planks.
const Bridge: React.FC<{ y: number; x1: number; x2: number; s?: number; frost?: number; t: number; rail?: boolean }> = ({ y, x1, x2, s = 1, frost = 1, t, rail = true }) => {
  const n = Math.ceil((x2 - x1) / (34 * s));
  return (
    <Svg>
      {/* creek below */}
      <path d={`M${x1 - 70},${y + 20 * s} C${x1 + 40},${y + 220} ${x1 - 50},${y + 520} ${x1 + 60},${y + 1400} L${x2 - 60},${y + 1400} C${x2 + 50},${y + 520} ${x2 - 40},${y + 220} ${x2 + 70},${y + 20 * s} Z`} fill="#3f6a80" />
      {Array.from({ length: 10 }, (_, i) => {
        const x = ((((i * 190 + t * 120) % 1900) + 1900) % 1900) - 400;
        return <path key={i} d={`M${x},${y + 90 * s + (i % 4) * 60 * s} q30,-8 60,0 q30,8 60,0`} stroke="#d9ebf2" strokeWidth={4 * s} fill="none" opacity={0.5} />;
      })}
      {/* far railing */}
      {rail && (
        <g>
          {Array.from({ length: Math.ceil((x2 - x1) / (200 * s)) + 1 }, (_, i) => (
            <rect key={i} x={x1 + i * 200 * s} y={y - 150 * s} width={14 * s} height={150 * s} fill="#5e4632" />
          ))}
          <rect x={x1} y={y - 156 * s} width={x2 - x1} height={14 * s} rx={4} fill="#6e523a" />
          <rect x={x1} y={y - 84 * s} width={x2 - x1} height={10 * s} rx={3} fill="#5e4632" />
          <rect x={x1} y={y - 158 * s} width={x2 - x1} height={4 * s} fill="#eef4f6" opacity={frost * 0.85} />
        </g>
      )}
      {/* deck */}
      <rect x={x1} y={y - 2} width={x2 - x1} height={26 * s} fill="#8a6a48" />
      {Array.from({ length: n }, (_, i) => (
        <line key={i} x1={x1 + i * 34 * s} y1={y} x2={x1 + i * 34 * s} y2={y + 24 * s} stroke="#5e4632" strokeWidth={2 * s} />
      ))}
      <rect x={x1} y={y + 24 * s} width={x2 - x1} height={30 * s} fill="#5a4330" />
      {/* frost on the deck */}
      <rect x={x1} y={y - 5 * s} width={x2 - x1} height={9 * s} rx={3} fill="#f2f8fb" opacity={frost * 0.9} />
      {Array.from({ length: Math.floor(n * 1.5) }, (_, i) => {
        const x = x1 + ((i * 53.7) % (x2 - x1));
        const tw = 0.5 + 0.5 * Math.sin(t * 5 + i * 1.7);
        return <circle key={i} cx={x} cy={y - 2 * s + (i % 3) * 3 * s} r={(1.5 + (i % 3)) * s * 0.8} fill="#ffffff" opacity={frost * tw} />;
      })}
    </Svg>
  );
};

// Cool shade over part of the frame (trees block the sun there).
const Shade: React.FC<{ x: number; k?: number }> = ({ x, k = 1 }) => (
  <AbsoluteFill style={{ mixBlendMode: "multiply", pointerEvents: "none" }}>
    <Svg>
      <defs>
        <linearGradient id={`shd${Math.round(x)}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#7d93b4" />
        </linearGradient>
      </defs>
      <rect x={x - 160} y={-400} width={160} height={2800} fill={`url(#shd${Math.round(x)})`} opacity={k} />
      <rect x={x} y={-400} width={2000} height={2800} fill="#7d93b4" opacity={k} />
    </Svg>
  </AbsoluteFill>
);

const Rocks: React.FC<{ y: number; s?: number; frost?: number }> = ({ y, s = 1, frost = 1 }) => (
  <Svg>
    {[
      [120, 0, 260, 120],
      [430, 30, 200, 90],
      [760, 10, 300, 140],
    ].map(([x, dy, w, h], i) => (
      <g key={i}>
        <path d={`M${x - w / 2},${y + dy} Q${x - w / 2 + 20},${y + dy - h} ${x},${y + dy - h} Q${x + w / 2 - 10},${y + dy - h + 10} ${x + w / 2},${y + dy} Z`} transform={`scale(${s})`} fill="#7b8186" />
        <path d={`M${x - w / 2 + 16},${y + dy - h * 0.55} Q${x - w / 2 + 30},${y + dy - h} ${x},${y + dy - h} Q${x + w / 2 - 14},${y + dy - h + 12} ${x + w / 2 - 20},${y + dy - h * 0.5}`} transform={`scale(${s})`} stroke="#eef5f8" strokeWidth={10} fill="none" strokeLinecap="round" opacity={frost * 0.9} />
      </g>
    ))}
  </Svg>
);

const Ice: React.FC<{ y: number; x1: number; x2: number; t: number }> = ({ y, x1, x2, t }) => (
  <Svg>
    <path d={`M${x1},${y + 4} Q${(x1 + x2) / 2},${y - 18} ${x2},${y} L${x2},${y + 100} Q${(x1 + x2) / 2},${y + 80} ${x1},${y + 100} Z`} fill="#cfe5f0" />
    <path d={`M${x1 + 40},${y + 30} L${x2 - 60},${y + 18}`} stroke="#ffffff" strokeWidth={8} strokeLinecap="round" opacity={0.8} />
    <path d={`M${x1 + 120},${y + 64} L${x2 - 200},${y + 52}`} stroke="#ffffff" strokeWidth={5} strokeLinecap="round" opacity={0.6} />
    {Array.from({ length: 6 }, (_, i) => (
      <circle key={i} cx={x1 + 80 + i * ((x2 - x1 - 160) / 5)} cy={y + 20 + (i % 2) * 30} r={3 + 2 * Math.sin(t * 4 + i)} fill="#fff" opacity={0.9} />
    ))}
  </Svg>
);

// ---------- shared world ----------
const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#ffffff" seed={5} drift={t * 10} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={37} base={treeY - 260} amp={400} scale={250} col="#8fa3b4" lit="#f1f4f6" peak={180} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.75} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={41} base={treeY - 120} amp={260} scale={180} col="#6f8577" />
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

// ============ S1 HOOK: wide, bright cold morning, dry trail (0 - 2.95) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: t * 18 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 2.95), rot: hh.rot };
  const g = 1450;
  const ph = t * 3.4;
  const p: HikerProps = { x: 200 + t * 60, y: g, scale: 1.45, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="a" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} />
        <Bridge y={g - 2} x1={760} x2={1500} s={0.8} t={t} frost={1} />
        <Subject rimX={3}>
          <Person {...p} outfit={JESS} />
        </Subject>
      </Plane>
      <Shade x={760} k={0.55} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3328" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.18} />
      <Particles seed={11} n={22} leaves={LEAVES} fall={40} />
      <Grade sunX={820} sunY={560} warm="255,226,190" cool="30,50,80" />
      <Title text={"The trail was dry.\nThe bridge wasn't."} t={t} t0={0} top={130} size={104} />
      <Chip text="Dry trail" t={t} t0={2.1} x={80} y={380} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: onto the wooden footbridge in the shade (2.9 - 5.3) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: lt * 16 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.4), rot: hh.rot };
  const g = 1400;
  const ph = lt * 3;
  const p: HikerProps = { x: 300 + lt * 70, y: g + 190, scale: 2.3, phase: ph, walk: 0.55, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.55) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SHADY} uid="b" treeY={g - 80} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g + 190} />
        <Bridge y={g + 190} x1={330} x2={1600} s={1.4} t={t} frost={1} />
        <Subject rimX={2}>
          <Person {...p} outfit={JESS} />
        </Subject>
      </Plane>
      <Shade x={300} k={0.7} />
      <Particles seed={12} n={16} col="#ffffff" fall={20} />
      <Grade sunX={860} sunY={520} warm="230,235,245" cool="25,45,80" vignette={0.55} />
      <Chip text="Wooden footbridge" t={t} t0={4.43} x={80} y={240} icon="none" big />
      <Chip text="In the shade" t={t} t0={5.37} x={80} y={370} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: boots step onto the frosty planks (5.25 - 6.4) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: mix(1.04, 1.08, lt / 1.15), rot: hh.rot };
  const deck = 1720;
  const ph = lt * 2.6 + 0.6;
  const p: HikerProps = { x: 300 + lt * 90, y: deck, scale: 7, phase: ph, walk: 0.5, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SHADY} uid="c" treeY={1200} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Bridge y={deck} x1={-400} x2={1600} s={3.2} t={t} frost={1} rail={false} />
        <Subject rimX={2}>
          <Person {...p} outfit={JESS} />
        </Subject>
      </Plane>
      <Shade x={-400} k={0.45} />
      <Particles seed={13} n={18} col="#ffffff" fall={20} />
      <Grade sunX={860} sunY={520} warm="230,235,245" cool="25,45,80" vignette={0.65} />
      <Chip text="Frost on the planks" t={t} t0={5.66} x={80} y={240} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2c MEDIUM: her feet shoot out (6.35 - 8.15) ============
const S2c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [6.42, 6.5, 7.3], [0, 1, 0]);
  const hh = handheld(t, 0.7, shake);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.12, lt / 1.8) + shake * 0.05, rot: hh.rot };
  const g = 1400;
  const deck = g + 190;
  const slip = at(t, [6.42, 6.8], [0, 1]);
  const ph = Math.min(t, 6.42) * 3;
  const walk = 0.5 * (1 - slip);
  const p: HikerProps = { x: 470, y: deck, scale: 2.3, phase: ph, walk, lean: 0.06, poles: false, handOverride: slip > 0.1 ? [-20 - slip * 40, -30 - slip * 60] : freeHand(ph, walk) };
  const hipY = deck - 182 * 2.3;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SHADY} uid="c2" treeY={g - 80} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Bridge y={deck} x1={-400} x2={1600} s={1.4} t={t} frost={1} />
        <Subject rimX={2}>
          <g transform={`translate(${slip * 110},${slip * 345}) rotate(${-slip * 72} ${p.x} ${hipY})`}>
            <Person {...p} outfit={JESS} expression={slip > 0 ? "tired" : "neutral"} />
          </g>
        </Subject>
      </Plane>
      <Shade x={-400} k={0.45} />
      <Particles seed={23} n={16} col="#ffffff" fall={20} />
      <Grade sunX={860} sunY={520} warm="230,235,245" cool="25,45,80" vignette={0.6} />
      <Chip text="Feet shot out" t={t} t0={6.63} x={80} y={240} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a WIDE: frost stays on bridges and boardwalks (8.1 - 10.75) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 14 + hh.x, y: at(lt, [0, 2.6], [-60, 0]) + hh.y, zoom: at(lt, [0, 2.6], [1.12, 1.04]), rot: hh.rot };
  const g = 1460;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} />
        <Bridge y={g} x1={-400} x2={420} s={0.9} t={t} frost={1} />
        <Svg>
          {/* boardwalk in the far shade, right */}
          <rect x={620} y={g - 10} width={900} height={18} fill="#8a6a48" />
          <rect x={620} y={g - 14} width={900} height={7} fill="#f2f8fb" opacity={0.9} />
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={640 + i * 100} y={g + 8} width={10} height={40} fill="#5a4330" />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#2a3328" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.16} />
      <Particles seed={14} n={20} leaves={LEAVES} fall={40} />
      <Grade sunX={820} sunY={560} warm="255,226,190" cool="30,50,80" />
      <Chip text="Frost stays on:" t={t} t0={8.18} x={80} y={240} icon="none" big />
      <Chip text="Bridges" t={t} t0={9.06} x={80} y={370} icon="x" />
      <Chip text="Boardwalks" t={t} t0={9.66} x={80} y={470} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: shady rocks stay white while the sun warms the trail (10.7 - 13.35) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 8 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.65), rot: hh.rot };
  const p: HikerProps = { x: 640, y: 2330, scale: 4.4, walk: 0, lean: 0.12, poles: false, handOverride: [40, 30], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SHADY} uid="e" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3}>
          <Person {...p} outfit={JESS} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.5} blur={5}>
        <Rocks y={1800} s={1} frost={1} />
      </Plane>
      <Shade x={-400} k={0.3} />
      <Particles seed={15} n={18} col="#ffffff" fall={15} />
      <Grade sunX={860} sunY={520} warm="230,235,245" cool="25,45,80" vignette={0.6} />
      <Chip text="Shady rocks" t={t} t0={10.8} x={80} y={240} icon="x" big />
      <Readout label="SUNNY TRAIL" value="DRY" ok={true} t={t} t0={11.76} x={80} y={370} />
      <Readout label="IN THE SHADE" value="FROST" ok={false} t={t} t0={12.4} x={80} y={600} pulseAt={12.55} />
    </AbsoluteFill>
  );
};

// ============ S4a MEDIUM: the fix, slow down before shady spots (13.3 - 16.3) ============
const S4a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: at(lt, [0, 3], [-60, 0]) + hh.y, zoom: at(lt, [0, 3], [1.12, 1.04]), rot: hh.rot };
  const g = 1400;
  const slow = at(t, [14.4, 15.4], [0.55, 0.15]);
  const ph = lt * mix(3, 1.4, at(t, [14.4, 15.4], [0, 1]));
  const p: HikerProps = { x: 260 + Math.min(lt, 2.2) * 60, y: g + 190, scale: 2.3, phase: ph, walk: slow, lean: 0.03, poles: false, handOverride: freeHand(ph, slow) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={g - 80} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g + 190} />
        <Bridge y={g + 190} x1={700} x2={1700} s={1.4} t={t} frost={1} />
        <Subject rimX={4}>
          <Person {...p} outfit={JESS} expression="neutral" />
        </Subject>
      </Plane>
      <Shade x={700} k={0.6} />
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#2a3328" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.2} />
      <Particles seed={16} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={820} sunY={560} />
      <Title text={"Slow down\nbefore the\nshade."} t={t} t0={13.45} top={200} size={146} />
    </AbsoluteFill>
  );
};

// ============ S4b CLOSE-UP: short, flat-footed steps, hands free (16.25 - 19.65) ============
const S4b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.4), rot: hh.rot };
  const deck = 1720;
  const s = 7;
  const ph = lt * 2.2;
  const walk = 0.22;
  const p: HikerProps = { x: 330 + lt * 40, y: deck, scale: s, phase: ph, walk, lean: 0.02, poles: false, handOverride: [44, 4] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SHADY} uid="g" treeY={1200} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Bridge y={deck} x1={-400} x2={1600} s={3.2} t={t} frost={1} rail={false} />
        <Subject rimX={3}>
          <Person {...p} outfit={JESS} />
        </Subject>
      </Plane>
      <Shade x={-400} k={0.4} />
      <Particles seed={17} n={16} col="#ffffff" fall={15} />
      <Grade sunX={860} sunY={520} warm="230,235,245" cool="25,45,80" vignette={0.6} />
      <Chip text="Short, flat-footed steps" t={t} t0={16.54} x={80} y={240} icon="check" big />
      <Chip text="Hands free" t={t} t0={18.77} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4c WIDE: solid ice ahead, turn back (19.6 - 22.55) ============
const S4c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.95), rot: hh.rot };
  const g = 1440;
  const stop = at(t, [20.3, 20.8], [0, 1]);
  const back = t > 21.62;
  const ph = (back ? t - 21.62 : Math.min(t, 20.8) - 19.6) * 3.2;
  const walk = back ? at(t, [21.62, 21.9], [0, 0.6]) : 0.6 * (1 - stop);
  const p: HikerProps = {
    x: back ? 520 - (t - 21.62) * 70 : 300 + Math.min(lt, 1.2) * 180,
    y: g + 40,
    scale: 1.7,
    phase: ph,
    walk,
    lean: 0.06,
    poles: false,
    handOverride: freeHand(ph, walk),
  };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SHADY} uid="h" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g + 40} />
        <Ice y={g + 30} x1={600} x2={1500} t={t} />
        <Subject rimX={3}>
          <Person {...p} outfit={JESS} flip={back} expression="neutral" />
        </Subject>
      </Plane>
      <Shade x={-400} k={0.35} />
      <Particles seed={18} n={20} col="#ffffff" fall={25} />
      <Grade sunX={860} sunY={520} warm="230,235,245" cool="25,45,80" vignette={0.55} />
      <Chip text="Solid ice?" t={t} t0={20.81} x={80} y={240} icon="x" big />
      <Chip text="Turn back" t={t} t0={21.62} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 PAYOFF: steady across the next bridge (22.5 - 24.7) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 16 + hh.x, y: hh.y, zoom: at(lt, [0, 1.2], [1.16, 1.04]), rot: hh.rot };
  const g = 1400;
  const ph = lt * 2.4;
  const p: HikerProps = { x: 380 + lt * 40, y: g + 190, scale: 2.3, phase: ph, walk: 0.3, lean: 0.04, poles: false, handOverride: freeHand(ph, 0.3) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="i" treeY={g - 80} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Bridge y={g + 190} x1={-400} x2={1600} s={1.4} t={t} frost={0.6} />
        <Subject rimX={6}>
          <Person {...p} outfit={JESS} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.26} col="255,214,150" />
      <Particles seed={19} n={22} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"Steady\nacross."} t={t} t0={off + 0.1} top={200} size={160} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/beginner-hiker-bundle-card.jpg"
      photoH={760}
      spec="DIGITAL DOWNLOAD · 3 GUIDES IN ONE"
      name={
        <>
          Beginner
          <br />
          Hiker Bundle
        </>
      }
      nameSize={96}
      price="$16.99"
      save="Save this before your first frosty hike"
    />
  );
};

export const V37B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.95} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={2.9} to={5.3} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={2.9} />
    </Scene>
    <Scene from={5.25} to={6.4} fadeIn={0.08} fadeOut={0.06}>
      <S2b off={5.25} />
    </Scene>
    <Scene from={6.35} to={8.15} fadeIn={0.05} fadeOut={0.12}>
      <S2c off={6.35} />
    </Scene>
    <Scene from={8.1} to={10.75} fadeIn={0.12} fadeOut={0.1}>
      <S3a off={8.1} />
    </Scene>
    <Scene from={10.7} to={13.35} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={10.7} />
    </Scene>
    <Scene from={13.3} to={16.3} fadeIn={0.1} fadeOut={0.1}>
      <S4a off={13.3} />
    </Scene>
    <Scene from={16.25} to={19.65} fadeIn={0.1} fadeOut={0.1}>
      <S4b off={16.25} />
    </Scene>
    <Scene from={19.6} to={22.55} fadeIn={0.1} fadeOut={0.12}>
      <S4c off={19.6} />
    </Scene>
    <Scene from={22.5} to={24.7} fadeIn={0.12} fadeOut={0.12}>
      <S5 off={22.5} />
    </Scene>
    <Scene from={24.65} to={29} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.9, 1560],
        [2.9, 5.25, 1560],
        [5.25, 6.35, 1560],
        [6.35, 8.1, 1560],
        [8.1, 10.7, 1560],
        [10.7, 13.3, 1560],
        [13.3, 16.25, 1560],
        [16.25, 19.6, 1560],
        [19.6, 22.5, 1560],
        [22.5, 24.65, 1560],
      ]}
    />
  </AbsoluteFill>
);
