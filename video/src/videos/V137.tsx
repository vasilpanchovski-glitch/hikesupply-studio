// V137: "She blew her whistle. Nothing came out." in the cinematic C01 style, winter trail. Story for the Emergency Whistle
// (Aluminum Dual-Tube, with Key Ring, $6.99, live Shopify). Advice: a pea whistle (ball inside) can freeze stuck when wet; carry a
// whistle with no ball inside, clip it outside on the pack strap, shake it dry after rain; three blasts, a pause, repeat.
// No medical claims. End card = real Shopify product photo (red variant) cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { Blizzard, FrostTrail, SNOW, SNOW2, STORM, WGOLD, WINTER, WinterBackdrop } from "../winter";
import { ICE } from "../icy";
import vo from "../vo/v137.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const MIA: Outfit = {
  ...JAKE,
  skin: "#E9B896",
  skinShade: "#CB9879",
  hair: "#2b1c14",
  ponytail: "#2b1c14",
  beard: null,
  cap: "none",
  capShade: "none",
  jacket: "#7A2F3B",
  jacketShade: "#5E222D",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#3E5A4A",
  packShade: "#2E4538",
  glove: null,
};

const BEANIE = "#D9D3C7";
const BEANIE2 = "#B8B0A2";
const OLD = "#E0784A";
const OLD2 = "#b85a33";
const RED = "#C2333A";
const RED2 = "#8F2229";

// Beanie over the Person's head (hiker coords).
const Beanie: React.FC<{ p: HikerProps }> = ({ p }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 39} ${hx},${hy - 41} Q${hx + 28},${hy - 39} ${hx + 26},${hy - 7} Z`} fill={BEANIE} />
      <path d={`M${hx - 27},${hy - 3} Q${hx - 29},${hy - 39} ${hx},${hy - 41} Q${hx - 14},${hy - 30} ${hx - 15},${hy - 5} Z`} fill={BEANIE2} />
      <rect x={hx - 29} y={hy - 12} width={57} height={10} rx={4} fill={BEANIE2} />
      <circle cx={hx} cy={hy - 43} r={7} fill={BEANIE2} />
    </g>
  );
};

// Old pea whistle (ball inside), local coords.
const PeaWhistle: React.FC<{ x: number; y: number; s: number; rot?: number }> = ({ x, y, s, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={0} y={-10} width={34} height={20} rx={5} fill={OLD} />
    <circle cx={34} cy={2} r={14} fill={OLD} />
    <circle cx={34} cy={2} r={6} fill={OLD2} />
    <rect x={8} y={-14} width={10} height={6} fill="#1F2421" />
  </g>
);

// New aluminum dual-tube whistle, local coords (mouth end at 0,0, pointing +x).
const TubeWhistle: React.FC<{ x: number; y: number; s: number; rot?: number; o?: number }> = ({ x, y, s, rot = 0, o = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={0} y={-9} width={60} height={18} rx={4} fill={RED} />
    <rect x={0} y={-9} width={60} height={6} rx={3} fill="#e0656b" />
    <rect x={30} y={-10} width={8} height={4} fill={RED2} />
    <circle cx={62} cy={-3} r={3} fill={RED2} />
    <circle cx={62} cy={4} r={3} fill={RED2} />
    <circle cx={-4} cy={0} r={6} fill="none" stroke="#c9ced2" strokeWidth={2.5} />
  </g>
);

// Sound arcs from a point.
const Rings: React.FC<{ x: number; y: number; t: number; starts: number[]; reach: number; w?: number; col?: string }> = ({ x, y, t, starts, reach, w = 8, col = "#fff" }) => (
  <g>
    {starts.map((s, i) => {
      const k = (t - s) / 0.9;
      if (k < 0 || k > 1) return null;
      const r = 30 + Math.sqrt(k) * reach;
      return (
        <path key={i} d={`M${x + r * Math.cos(-0.7)},${y + r * Math.sin(-0.7)} A${r},${r} 0 0 1 ${x + r * Math.cos(0.7)},${y + r * Math.sin(0.7)}`} stroke={col} strokeWidth={w * (1 - k * 0.6)} fill="none" strokeLinecap="round" opacity={1 - k} />
      );
    })}
  </g>
);

// Three dots: blasts lighting up.
const Blasts: React.FC<{ t: number; starts: number[]; x: number; y: number; t0: number }> = ({ t, starts, x, y, t0 }) => (
  <div style={{ position: "absolute", left: x, top: y, display: "flex", gap: 26, opacity: at(t, [t0, t0 + 0.25], [0, 1]) }}>
    {starts.map((s, i) => (
      <div key={i} style={{ width: 70, height: 70, borderRadius: 35, background: t > s ? "#fff" : "rgba(255,255,255,0.3)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)", scale: `${t > s ? at(t, [s, s + 0.25], [1.35, 1]) : 0.8}` }} />
    ))}
  </div>
);

const mouthOf = (p: HikerProps): [number, number] => {
  const h = hikerGeometry(p).head;
  return [h[0] + 30, h[1] + 14];
};

// Icy rock steps (screen coords).
const IcySteps: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-200,${y + 60} L360,${y + 60} L380,${y - 10} L1300,${y - 10} L1300,2400 L-200,2400 Z`} fill="#6f757b" />
    <path d={`M-200,${y + 60} L360,${y + 60} L380,${y - 10} L1300,${y - 10} L1300,${y + 10} L392,${y + 10} L372,${y + 80} L-200,${y + 80} Z`} fill={SNOW} />
    <ellipse cx={560} cy={y + 2} rx={150} ry={12} fill={ICE} opacity={0.95} />
    <path d={`M470,${y - 2} L640,${y - 4}`} stroke="#ffffff" strokeWidth={4} opacity={0.9} strokeLinecap="round" />
    <path d={`M-200,${y + 200} L1300,${y + 160} L1300,2400 L-200,2400 Z`} fill={SNOW2} />
  </Svg>
);

// ============ S1 HOOK MEDIUM: icy step, she slips (0 - 3.46) ============
const S1: React.FC = () => {
  const t = useT();
  const slip = at(t, [1.0, 1.35], [0, 1], outExpo);
  const hh = handheld(t, 0.5, at(t, [1.1, 1.2, 1.7], [0, 1, 0]) * 4);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.04, 1.1, t / 3.46), rot: hh.rot };
  const g = 1500;
  const ph = t * 2.4;
  const walking = t < 1.0;
  const p: HikerProps = {
    x: 470 + Math.min(t, 1.0) * 60,
    y: g + 40 + slip * 46,
    scale: 2.4,
    phase: ph,
    walk: walking ? 0.5 : 0,
    lean: mix(0.08, 0.36, slip),
    poles: false,
    handOverride: walking ? freeHand(ph, 0.5) : [mix(30, 70, slip), mix(20, 120, slip)],
    breathe: 0,
  };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 220} t={t} />
      <Plane cam={cam} depth={1}>
        <IcySteps y={g} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={MIA} expression={slip > 0.3 ? "tired" : "neutral"} />
          <Beanie p={p} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Particles seed={1371} n={18} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="248,240,228" cool="40,60,90" />
      <Title text={"She blew\nher whistle.\nNothing came out."} t={t} t0={0} top={110} size={124} />
      <Chip text="Icy step" t={t} t0={0.7} x={60} y={640} icon="none" big />
      <Chip text="Twisted ankle" t={t} t0={2.2} x={60} y={770} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: her partner is out of sight below (3.46 - 5.44) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y + lt * 16, zoom: mix(1.0, 1.06, lt / 1.98), rot: hh.rot };
  const g = 980;
  const p: HikerProps = { x: 760, y: g + 30, scale: 1.5, walk: 0, lean: 0.3, poles: false, handOverride: [70, 120], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={g - 60} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-200,${g + 80} L520,${g + 40} Q780,${g} 1300,${g + 20} L1300,2400 L-200,2400 Z`} fill={SNOW} />
          {/* switchbacks going down */}
          <path d={`M720,${g + 50} L180,${g + 260} L880,${g + 460} L200,${g + 700} L760,${g + 1000}`} stroke={SNOW2} strokeWidth={46} fill="none" strokeLinejoin="round" />
          <path d={`M720,${g + 50} L180,${g + 260} L880,${g + 460} L200,${g + 700} L760,${g + 1000}`} stroke="#c4ced5" strokeWidth={6} strokeDasharray="14 22" fill="none" />
          {[[90, 380], [320, 420], [980, 330], [640, 600], [420, 640], [90, 860], [980, 820], [520, 880], [300, 980]].map(([x, dy], i) => (
            <Pine key={i} x={x} y={g + dy} h={300 + (i % 3) * 60} c="#2f5446" c2="#24403a" />
          ))}
        </Svg>
        <Subject rimX={5} col="rgba(230,238,246,0.85)">
          <Person {...p} outfit={MIA} expression="tired" />
          <Beanie p={p} />
        </Subject>
      </Plane>
      <Blizzard seed={1372} n={20} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" />
      <Chip text="Partner below" t={t} t0={3.6} x={60} y={200} icon="none" big />
      <Chip text="Out of sight" t={t} t0={4.5} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: old whistle at her lips, nothing (5.44 - 7.73) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.1, lt / 2.29), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: [48, -136], breathe: Math.sin(t * 2.2) * 1.5 };
  const m = mouthOf(p);
  const puff = at(t, [6.0, 6.2, 6.5, 6.7, 6.9], [0, 1, 0, 1, 0]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(230,238,246,0.85)">
          <Person {...p} outfit={MIA} expression="tired" />
          <Beanie p={p} />
          <g transform={hikerTransform(p)}>
            <PeaWhistle x={m[0] - 6} y={m[1] + 2} s={0.75} />
            <circle cx={m[0] + 40} cy={m[1] + 2} r={4 + puff * 8} fill="#f2f4f6" opacity={0.6 * puff} />
          </g>
        </Subject>
      </Plane>
      <Blizzard seed={1373} n={20} />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" vignette={0.6} />
      <Chip text="Old whistle" t={t} t0={5.6} x={60} y={200} icon="none" big />
      <Chip text="Nothing" t={t} t0={7.0} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MACRO: inside the old whistle, the wet ball freezes stuck (7.73 - 11.93) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 4.2), rot: hh.rot };
  const wet = at(t, [8.3, 8.9], [0, 1]);
  const ice = at(t, [9.8, 10.9], [0, 1]);
  const jiggle = t > 11.0 ? 0 : Math.sin(t * 30) * 6 * at(t, [8.0, 8.6, 9.6], [0, 1, 0]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={1150} blur={16} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <g transform="translate(540,1000)">
            {/* body (cutaway) */}
            <rect x={-420} y={-110} width={480} height={220} rx={40} fill={OLD} />
            <rect x={-420} y={-110} width={480} height={60} rx={30} fill="#ec9068" />
            <circle cx={120} cy={10} r={210} fill={OLD} />
            <circle cx={120} cy={10} r={170} fill="#5a2a14" />
            <circle cx={120} cy={10} r={170} fill="#ffffff" opacity={0.06} />
            <rect x={-200} y={-150} width={90} height={48} fill="#1F2421" />
            {/* the ball */}
            <g transform={`translate(${130 + jiggle},${90})`}>
              <circle r={62} fill="#efe9dc" />
              <circle cx={-18} cy={-20} r={16} fill="#ffffff" opacity={0.7} />
              {/* water */}
              <ellipse cx={0} cy={58} rx={110 * wet} ry={18 * wet} fill="#9ccbe2" opacity={0.8 * (1 - ice * 0.5)} />
              {[[-40, -50], [36, -40], [50, 20]].map(([x, y], i) => (
                <path key={i} d="M0,-14 Q11,3 0,13 Q-11,3 0,-14 Z" transform={`translate(${x},${y})`} fill="#cfeaf8" stroke="#8fbcd4" strokeWidth={3} opacity={wet * (1 - ice)} />
              ))}
              {/* ice */}
              <ellipse cx={0} cy={56} rx={120} ry={24} fill={ICE} opacity={ice} />
              {Array.from({ length: 9 }, (_, i) => {
                const a = -Math.PI * 0.05 + (i / 8) * Math.PI * 1.1;
                const r1 = 64;
                const r2 = 64 + 34 * ice;
                return <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2} stroke="#ffffff" strokeWidth={6} strokeLinecap="round" opacity={ice} />;
              })}
            </g>
            {/* frost on the shell */}
            <circle cx={120} cy={10} r={190} fill="none" stroke="#ffffff" strokeWidth={16} strokeDasharray="6 26" opacity={0.7 * ice} />
            <rect x={-410} y={-100} width={460} height={200} rx={36} fill="none" stroke="#ffffff" strokeWidth={10} strokeDasharray="4 30" opacity={0.6 * ice} />
          </g>
        </Svg>
      </Plane>
      <Particles seed={1374} n={16} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" vignette={0.55} />
      <Chip text="Ball inside, wet" t={t} t0={8.6} x={60} y={200} icon="x" big />
      <Chip text="Frozen stuck" t={t} t0={10.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: the fix: a whistle with no ball inside (11.93 - 15.30) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.37), rot: hh.rot };
  const g = 1560;
  const show = at(t, [13.7, 14.2], [0, 1], outExpo);
  const p: HikerProps = { x: 470, y: g + 40, scale: 2.5, walk: 0, lean: 0.04, poles: false, handOverride: [mix(30, 60, show), mix(20, -40, show)], breathe: Math.sin(t * 2.4) * 1.2 };
  const g2 = hikerGeometry(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={MIA} expression="neutral" />
          <Beanie p={p} />
          <g transform={hikerTransform(p)}>
            <TubeWhistle x={g2.arms[1].hand[0] + 6} y={g2.arms[1].hand[1] - 6} s={1.1} rot={-20} o={show} />
          </g>
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,246,226" />
      <Particles seed={1375} n={16} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,226" cool="40,60,90" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={13.1} top={200} size={124} />
      <Chip text="No ball inside" t={t} t0={14.45} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: clipped outside on the pack strap, shaken dry (15.30 - 19.23) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: -lt * 8 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.93), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.05, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.2) * 1.5 };
  const g = hikerGeometry(p);
  const clip = at(t, [15.5, 16.0], [0, 1], outExpo);
  const shake = at(t, [17.55, 17.7, 18.7, 18.85], [0, 1, 1, 0]);
  const sx = g.sh[0] + 4;
  const sy = g.sh[1] + 40;
  const rot = 90 + Math.sin(t * 38) * 22 * shake;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,240,220,0.85)">
          <Person {...p} outfit={MIA} expression="neutral" />
          <Beanie p={p} />
          <g transform={hikerTransform(p)}>
            <path d={`M${g.sh[0] - 14},${g.sh[1] - 6} Q${g.sh[0] + 8},${g.sh[1] + 50} ${g.hip[0] + 4},${g.hip[1] - 30}`} stroke="#2a2a2a" strokeWidth={9} fill="none" strokeLinecap="round" />
            <TubeWhistle x={sx} y={sy + (1 - clip) * 40} s={0.7} rot={rot} o={clip} />
            {shake > 0 &&
              [0, 1, 2, 3, 4].map((i) => {
                const q = (t * 2.2 + i / 5) % 1;
                const a = -1.2 + i * 0.6;
                return <circle key={i} cx={sx + Math.cos(a) * (10 + q * 40)} cy={sy + 30 + Math.sin(a) * (10 + q * 40)} r={2.6} fill="#cfeaf8" stroke="#8fbcd4" strokeWidth={0.8} opacity={shake * (1 - q)} />;
              })}
          </g>
        </Subject>
      </Plane>
      <Particles seed={1376} n={14} col="#ffffff" fall={12} />
      <Grade sunX={820} sunY={560} warm="252,240,224" vignette={0.6} />
      <Chip text="Outside on your strap" t={t} t0={15.75} x={60} y={200} icon="check" big />
      <Chip text="Shake dry after rain" t={t} t0={17.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 WIDE: back on the icy step, three blasts, a pause, repeat (19.23 - 21.17) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.94), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 520, y: g + 86, scale: 2.2, walk: 0, lean: 0.3, poles: false, handOverride: [48, -136], breathe: Math.sin(t * 2.2) * 1.5 };
  const m = mouthOf(p);
  const b1 = [19.4, 19.62, 19.84];
  const b2 = [20.6, 20.82, 21.04];
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="g" treeY={g - 220} t={t} />
      <Plane cam={cam} depth={1}>
        <IcySteps y={g} />
        <Subject rimX={6} col="rgba(230,238,246,0.85)">
          <Person {...p} outfit={MIA} expression="neutral" />
          <Beanie p={p} />
          <g transform={hikerTransform(p)}>
            <TubeWhistle x={m[0] - 8} y={m[1] + 2} s={0.6} />
            <Rings x={m[0] + 40} y={m[1]} t={t} starts={[...b1, ...b2]} reach={420} w={7} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1377} n={16} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="236,236,240" cool="30,45,80" />
      <Readout label="THREE BLASTS" value="Pause, repeat" ok={null} t={t} t0={19.35} x={60} y={200} />
      <Blasts t={t} starts={b1} x={60} y={420} t0={19.36} />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF MEDIUM: her partner on the switchback hears her (21.17 - 23.10) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1560;
  const wave = at(t, [21.9, 22.2], [0, 1], outExpo);
  const p: HikerProps = { x: 520, y: g + 40, scale: 2.4, walk: 0, lean: -0.06, poles: false, handOverride: wave > 0 ? [mix(30, 70, wave), mix(20, -200, wave) + Math.sin(t * 9) * 12 * wave] : [30, 20], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="h" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={-0.12} snow={1} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={GUIDE} expression="happy" />
        </Subject>
        <Svg>
          <Rings x={960} y={520} t={t} starts={[21.2, 21.42, 21.64]} reach={200} w={6} col="#fff6e0" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.45} col="255,236,200" />
      <Particles seed={1378} n={22} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,226,180" />
      <Readout label="FROM THE SWITCHBACK" value="He heard her" ok={true} t={t} t0={21.35} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/emergency-whistle-red-cut.png"
      cutoutH={360}
      spec="ALUMINUM · DUAL TUBE · NO BALL"
      name={
        <>
          Emergency
          <br />
          Whistle
        </>
      }
      nameSize={96}
      price="$6.99"
      save="Save this before your winter hike"
    />
  );
};

export const V137: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.51} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.46} to={5.49} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.46} />
    </Scene>
    <Scene from={5.44} to={7.78} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.44} />
    </Scene>
    <Scene from={7.73} to={11.98} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.73} />
    </Scene>
    <Scene from={11.93} to={15.35} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.93} />
    </Scene>
    <Scene from={15.3} to={19.28} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={15.3} />
    </Scene>
    <Scene from={19.23} to={21.22} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={19.23} />
    </Scene>
    <Scene from={21.17} to={23.15} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={21.17} />
    </Scene>
    <Scene from={23.0} to={28} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.46, 1600],
        [3.46, 5.44, 1600],
        [5.44, 7.73, 1660],
        [7.73, 11.93, 1660],
        [11.93, 15.3, 1600],
        [15.3, 19.23, 1660],
        [19.23, 21.17, 1600],
        [21.17, 23.0, 1600],
      ]}
    />
  </AbsoluteFill>
);
