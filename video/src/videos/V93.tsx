// V93: "The road was closed on Thanksgiving" in the cinematic C01 style. Launch video 1 for the Rocky Mountain National Park guide (p11).
// Facts from nps.gov/romo: Trail Ridge Road is closed to through travel from mid-October to late May; in winter the east side
// has lighter snow on lower trails; check with rangers about snow, ice and avalanche hazards; traction or poles when icy; short days.
// Generic gate and signs only, no NPS logos. End card = Rocky Mountain National Park — Trip Planning Guide, $9.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { DAWN, FrostTrail, SNOW, SNOW2, WGOLD, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v93.json";

const words = vo.words as unknown as Word[];

const MIA: Outfit = {
  ...GUIDE,
  skin: "#F0C4A0",
  skinShade: "#D4A27E",
  hair: "#8a5a2b",
  ponytail: "#8a5a2b",
  beard: null,
  cap: "#B83A55",
  capShade: "#8E2B42",
  jacket: "#2F5D8A",
  jacketShade: "#244a6f",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  pack: "#C2662E",
  packShade: "#9a4f22",
  glove: "#2b2b2b",
};
const RANGER: Outfit = {
  ...GUIDE,
  skin: "#B98463",
  skinShade: "#98684b",
  hair: "#2a1d14",
  ponytail: null,
  beard: "#2a1d14",
  cap: "#8a7a52",
  capShade: "#6e603f",
  jacket: "#5d6b3a",
  jacketShade: "#46512b",
  pants: "#6b5a3e",
  pantsShade: "#54462f",
  pack: "#5d6b3a",
  packShade: "#46512b",
  glove: null,
};

const toScreen = (p: HikerProps, q: readonly number[]): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + q[0] * s, p.y + (q[1] - 182) * s];
};
const handOf = (p: HikerProps) => toScreen(p, hikerGeometry(p).arms[1].hand);

// Generic swing gate across a snowy road with a ROAD CLOSED board. Gate spans x0..x1 at height y (ground g).
const Gate: React.FC<{ x0: number; x1: number; g: number; s?: number }> = ({ x0, x1, g, s = 1 }) => {
  const h = 150 * s;
  return (
    <g>
      <rect x={x0 - 18 * s} y={g - h - 40 * s} width={36 * s} height={h + 40 * s} fill="#5a5f66" />
      <rect x={x1 - 18 * s} y={g - h - 40 * s} width={36 * s} height={h + 40 * s} fill="#5a5f66" />
      <rect x={x0} y={g - h} width={x1 - x0} height={18 * s} fill="#e8e8e2" />
      <rect x={x0} y={g - h * 0.45} width={x1 - x0} height={14 * s} fill="#e8e8e2" />
      {Array.from({ length: Math.floor((x1 - x0) / (80 * s)) }).map((_, i) => (
        <rect key={i} x={x0 + 20 * s + i * 80 * s} y={g - h} width={34 * s} height={18 * s} fill="#c9443a" />
      ))}
      {/* sign board hung on the gate */}
      <rect x={(x0 + x1) / 2 - 120 * s} y={g - h - 10 * s} width={240 * s} height={110 * s} rx={8 * s} fill="#f5f2e8" stroke="#2b2b2b" strokeWidth={5 * s} />
      <text x={(x0 + x1) / 2} y={g - h + 40 * s} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={44 * s} fill="#2b2b2b" letterSpacing={2}>
        ROAD
      </text>
      <text x={(x0 + x1) / 2} y={g - h + 84 * s} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={44 * s} fill="#2b2b2b" letterSpacing={2}>
        CLOSED
      </text>
      {/* snow on top rail */}
      <rect x={x0} y={g - h - 8 * s} width={x1 - x0} height={10 * s} rx={5 * s} fill={SNOW} />
    </g>
  );
};

const Road: React.FC<{ g: number }> = ({ g }) => (
  <Svg>
    <path d={`M-200,2100 L-200,${g} L1300,${g} L1300,2100 Z`} fill={SNOW2} />
    <path d={`M80,2100 L380,${g} L720,${g} L1100,2100 Z`} fill="#5d6064" />
    <path d={`M540,${g + 10} L548,2100`} stroke="#e8c45a" strokeWidth={10} strokeDasharray="60 50" />
    <path d={`M-200,${g} L1300,${g}`} stroke="#ffffff" strokeWidth={6} opacity={0.6} />
    {/* drifted snow over the road edges */}
    <path d={`M80,2100 Q260,${g + 240} 380,${g} L440,${g} Q300,${g + 300} 200,2100 Z`} fill={SNOW} />
    <path d={`M1100,2100 Q860,${g + 240} 720,${g} L660,${g} Q820,${g + 300} 960,2100 Z`} fill={SNOW} />
  </Svg>
);

const Mug: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-22} y={-50} width={44} height={56} rx={8} fill="#2F7F86" />
    <path d="M22,-38 q20,0 20,16 q0,16 -20,16" stroke="#2F7F86" strokeWidth={8} fill="none" />
    <path d="M-8,-60 q-8,-14 0,-28 M8,-60 q8,-14 0,-28" stroke="#ffffff" strokeWidth={4} fill="none" opacity={0.6} />
  </g>
);

// ============ S1 HOOK WIDE-MEDIUM: Mia at the closed gate, big snowy peak behind (0 - 3.86) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.02, 1.08, t / 3.86), rot: hh.rot };
  const g = 1450;
  const p: HikerProps = { x: 250, y: g + 60, scale: 2.2, walk: 0, lean: 0.02, poles: false, handOverride: [56, -40], breathe: Math.sin(t * 2) * 1.5 };
  const h = handOf(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 60} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Road g={g} />
        <Svg>
          <Gate x0={380} x1={1060} g={g + 40} s={1.3} />
        </Svg>
        <Subject rimX={5} col="rgba(255,240,220,0.9)">
          <Person {...p} outfit={MIA} expression={t > 2 ? "tired" : "neutral"} />
          <Mug x={h[0] + 10} y={h[1] + 20} s={1.1} />
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.16} col="255,250,235" />
      <Particles seed={931} n={22} col="#ffffff" fall={22} />
      <Grade sunX={800} sunY={560} warm="235,240,250" />
      <Title text={"The road was closed\non Thanksgiving"} t={t} t0={0} top={130} size={98} />
      <Chip text="Planned: the high road" t={t} t0={1.0} x={80} y={360} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the ROAD CLOSED board, chain and lock (3.86 - 5.27) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35, at(t, [4.4, 4.5, 4.8], [0, 1, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.4), rot: hh.rot };
  const sw = Math.sin(t * 5) * 4 * at(t, [4.4, 5.2], [1, 0.3]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1400} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <g transform="translate(-1460,760)">
            <Gate x0={1100} x1={2900} g={900} s={3.2} />
          </g>
          {/* chain + padlock */}
          <g transform={`rotate(${sw},280,1180)`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <ellipse key={i} cx={280} cy={1180 + i * 46} rx={18} ry={28} fill="none" stroke="#9aa0a6" strokeWidth={10} />
            ))}
            <rect x={230} y={1450} width={100} height={110} rx={16} fill="#c9a23a" />
            <path d="M250,1450 v-40 a30,30 0 0 1 60,0 v40" stroke="#9aa0a6" strokeWidth={14} fill="none" />
            <circle cx={280} cy={1500} r={12} fill="#6b5420" />
          </g>
        </Svg>
      </Plane>
      <Particles seed={932} n={16} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="235,240,250" vignette={0.55} />
      <Chip text="Gate closed" t={t} t0={4.1} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: the snowed-in road climbing into the peaks (5.27 - 8.97) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y - lt * 6, zoom: mix(1.0, 1.06, lt / 3.7), rot: hh.rot };
  const g = 1300;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={g} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-200,2100 L-200,${g} L1300,${g} L1300,2100 Z`} fill={SNOW2} />
          {/* switchback road disappearing under snow */}
          <path d={`M300,2100 C340,1800 820,1760 760,1580 C700,1440 380,1460 420,1360 C450,1300 620,${g + 10} 700,${g}`} stroke="#7a7d82" strokeWidth={70} fill="none" />
          {[[160, 1700], [960, 1500], [120, 1420]].map(([x, y], i) => (
            <path key={i} d={`M${x - 120},${y} Q${x},${y - 60} ${x + 120},${y} Z`} fill={SNOW} />
          ))}
        </Svg>
      </Plane>
      <Particles seed={933} n={22} col="#ffffff" fall={26} />
      <Grade sunX={800} sunY={560} warm="235,240,250" />
      <Readout label="THROUGH TRAFFIC" value="Closed" ok={false} t={t} t0={5.4} x={60} y={200} />
      <Chip text="Mid-October" t={t} t0={7.0} x={60} y={450} icon="x" big />
      <Chip text="to late May" t={t} t0={7.85} x={60} y={580} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: "Here's the fix" — Mia turns from the gate (8.97 - 11.34) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.08, 1.02, lt / 2.37), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 520, y: g, scale: 2.4, walk: 0, lean: 0.02, poles: false, handOverride: [56, -40], breathe: Math.sin(t * 2.2) * 1.5 };
  const h = handOf(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,240,220,0.9)">
          <Person {...p} outfit={MIA} expression="happy" />
          <Mug x={h[0] + 10} y={h[1] + 20} s={1.2} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} col="255,250,235" />
      <Particles seed={934} n={20} col="#ffffff" fall={22} />
      <Grade sunX={800} sunY={560} warm="235,240,250" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={10.0} top={200} size={124} />
      <Chip text="In winter" t={t} t0={10.1} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: east side, lower trail through the pines, lighter snow (11.34 - 15.1) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 24, y: hh.y, zoom: mix(1.0, 1.05, lt / 3.76), rot: hh.rot };
  const g = 1440;
  const ph = t * 3.4;
  const px = 200 + lt * 70;
  const p: HikerProps = { x: px, y: g, scale: 1.6, phase: ph, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 80} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.3} />
        <Subject rimX={4} col="rgba(255,240,220,0.9)">
          <Person {...p} outfit={MIA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} col="255,250,235" />
      <Particles seed={935} n={14} col="#ffffff" fall={14} />
      <Grade sunX={800} sunY={560} warm="240,236,226" />
      <Chip text="East side" t={t} t0={11.35} x={60} y={200} icon="check" big />
      <Chip text="Lower trails" t={t} t0={12.4} x={60} y={330} icon="check" big />
      <Chip text="Lighter snow" t={t} t0={13.65} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 MEDIUM: Mia asks a ranger at the visitor desk outside (15.1 - 18.78) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.07, lt / 3.68), rot: hh.rot };
  const g = 1520;
  const pm: HikerProps = { x: 260, y: g, scale: 2.3, walk: 0, lean: 0.03, poles: false, handOverride: [40, 22], breathe: Math.sin(t * 2.2) * 1.5 };
  const pr: HikerProps = { x: 800, y: g, scale: 2.35, walk: 0, lean: 0.02, poles: false, handOverride: [mix(40, 70, at(t, [16.4, 16.8], [0, 1])), mix(22, -60, at(t, [16.4, 16.8], [0, 1]))], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={g - 180} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,240,220,0.9)">
          <Person {...pm} outfit={MIA} expression="neutral" />
          <Person {...pr} outfit={{ ...RANGER, pack: RANGER.jacket, packShade: RANGER.jacketShade }} expression="happy" flip noPack />
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.16} col="255,250,235" />
      <Particles seed={936} n={18} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="235,240,250" />
      <Chip text="Ask a ranger" t={t} t0={15.15} x={60} y={200} icon="check" big />
      <Chip text="Snow" t={t} t0={16.45} x={60} y={330} big />
      <Chip text="Ice" t={t} t0={16.8} x={60} y={460} big />
      <Chip text="Avalanche danger" t={t} t0={17.3} x={60} y={590} big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: traction slips over her boot (18.78 - 20.27) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.5), rot: hh.rot };
  const on = at(t, [18.85, 19.6], [0, 1], outExpo);
  const by = 1300;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={1100} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-100} y={by + 120} width={1300} height={700} fill={SNOW2} />
          <ellipse cx={540} cy={by + 130} rx={600} ry={40} fill={SNOW} />
        </Svg>
        <Subject rimX={6}>
          {/* boot, side view, big */}
          <rect x={300} y={by - 520} width={300} height={420} rx={40} fill={MIA.pants} />
          <path d={`M280,${by - 160} L620,${by - 160} Q860,${by - 120} 880,${by + 20} L880,${by + 90} L240,${by + 90} L240,${by - 100} Z`} fill="#6b4a32" />
          <path d={`M240,${by + 60} L880,${by + 60} L880,${by + 110} L240,${by + 110} Z`} fill="#2b2b2b" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={360 + i * 50} y1={by - 140} x2={420 + i * 50} y2={by - 100} stroke="#d9c7a4" strokeWidth={8} />
          ))}
          {/* traction: rubber harness + chains + spikes, sliding up from below */}
          <g transform={`translate(0,${(1 - on) * 260})`} opacity={at(t, [18.8, 19.0], [0, 1])}>
            <path d={`M220,${by + 100} Q560,${by + 150} 900,${by + 100}`} stroke="#c9443a" strokeWidth={26} fill="none" />
            <path d={`M240,${by + 100} Q230,${by - 60} 330,${by - 150}`} stroke="#c9443a" strokeWidth={22} fill="none" />
            <path d={`M880,${by + 100} Q900,${by - 20} 820,${by - 110}`} stroke="#c9443a" strokeWidth={22} fill="none" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i}>
                <path d={`M${280 + i * 110},${by + 110} l20,40 l20,-40`} stroke="#b9c0c4" strokeWidth={8} fill="none" />
                <path d={`M${290 + i * 110},${by + 140} l10,28 l10,-28 Z`} fill="#8a9196" />
              </g>
            ))}
          </g>
          {/* gloved hands pulling the harness up */}
          <g transform={`translate(${mix(260, 300, on)},${by - mix(-60, 140, on)})`}>
            <ellipse cx={0} cy={0} rx={70} ry={54} fill="#2b2b2b" />
            <rect x={-200} y={-50} width={180} height={100} rx={44} fill={MIA.jacket} transform="rotate(-20)" />
          </g>
          <g transform={`translate(${mix(900, 840, on)},${by - mix(-40, 100, on)})`}>
            <ellipse cx={0} cy={0} rx={70} ry={54} fill="#2b2b2b" />
            <rect x={20} y={-50} width={180} height={100} rx={44} fill={MIA.jacket} transform="rotate(20)" />
          </g>
        </Subject>
      </Plane>
      <Particles seed={937} n={12} col="#ffffff" fall={14} />
      <Grade sunX={800} sunY={560} warm="235,240,250" vignette={0.55} />
      <Chip text="Poles or traction" t={t} t0={18.9} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: layers and food go in the pack, poles ready, early start (20.27 - 22.44) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y - lt * 8, zoom: mix(1.0, 1.05, lt / 2.17), rot: hh.rot };
  const a = at(t, [20.3, 20.7], [0, 1], outExpo);
  const b = at(t, [20.75, 21.15], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="h" treeY={1100} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,214,170,0.9)">
          {/* open pack */}
          <path d="M240,1700 L240,1060 Q540,960 840,1060 L840,1700 Z" fill={MIA.pack} />
          <path d="M240,1060 Q540,1000 840,1060 L840,1120 Q540,1060 240,1120 Z" fill={MIA.packShade} />
          {/* folded puffy layer dropping in */}
          <g transform={`translate(0,${(1 - a) * -700})`}>
            <rect x={300} y={900} width={300} height={150} rx={40} fill="#6a3d7a" />
            {[0, 1, 2].map((i) => (
              <line key={i} x1={310} y1={940 + i * 36} x2={590} y2={940 + i * 36} stroke="#55306a" strokeWidth={6} />
            ))}
          </g>
          {/* food bars */}
          <g transform={`translate(0,${(1 - b) * -700})`}>
            <rect x={620} y={930} width={180} height={60} rx={10} fill="#e0b84a" transform="rotate(-12,710,960)" />
            <rect x={600} y={990} width={180} height={60} rx={10} fill="#c9443a" transform="rotate(8,690,1020)" />
          </g>
          {/* poles leaning beside */}
          <line x1={940} y1={1800} x2={1010} y2={700} stroke="#3a3f45" strokeWidth={18} />
          <line x1={980} y1={1800} x2={1060} y2={720} stroke="#3a3f45" strokeWidth={18} />
          <rect x={990} y={690} width={34} height={110} rx={12} fill="#2b2b2b" transform="rotate(4,1007,745)" />
          <rect x={1040} y={710} width={34} height={110} rx={12} fill="#2b2b2b" transform="rotate(4,1057,765)" />
        </Subject>
      </Plane>
      <Particles seed={938} n={14} col="#ffe7c8" />
      <Grade sunX={300} sunY={760} warm="255,210,170" vignette={0.55} />
      <Chip text="Layers" t={t} t0={20.3} x={60} y={200} icon="check" big />
      <Chip text="Food" t={t} t0={20.8} x={60} y={330} icon="check" big />
      <Chip text="Start early" t={t} t0={21.35} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 WIDE: the low winter sun already dropping toward the ridge (22.44 - 23.8) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.0, 1.04, lt / 1.36), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 300, y: g, scale: 1.3, walk: 0, lean: 0.0, poles: false, handOverride: [40, 22], breathe: 0 };
  const sky = { ...WGOLD, sun: [760, mix(820, 880, lt / 1.36)] as [number, number] };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={sky} uid="i" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={-5} col="rgba(255,200,140,0.9)">
          <Person {...p} outfit={MIA} expression="neutral" />
        </Subject>
      </Plane>
      <Rays x={760} y={840} strength={0.3} col="255,200,140" />
      <Particles seed={939} n={14} col="#ffe7b8" />
      <Grade sunX={760} sunY={840} warm="255,190,120" />
      <Chip text="Days are short" t={t} t0={22.5} x={60} y={200} big />
    </AbsoluteFill>
  );
};

// ============ S10 PAYOFF: Mia on a snowy lower trail by a frozen lake, peaks in warm light (23.8 - 25.8) ============
const S10: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x + lt * 26, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.4;
  const px = 260 + lt * 60;
  const p: HikerProps = { x: px, y: g, scale: 2.1, phase: ph, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="j" treeY={g - 120} t={t} woods={false} />
      <Plane cam={cam} depth={0.8} blur={2}>
        <Svg>
          {/* frozen lake */}
          <ellipse cx={600} cy={g - 110} rx={720} ry={90} fill="#cfe2ec" />
          <ellipse cx={600} cy={g - 120} rx={600} ry={50} fill="#e8f2f7" opacity={0.8} />
          <path d="M200,1385 l120,10 M700,1400 l160,-6" stroke="#ffffff" strokeWidth={6} opacity={0.8} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={-6} col="rgba(255,200,140,0.9)">
          <Person {...p} outfit={MIA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="both" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.34} col="255,214,160" />
      <Particles seed={940} n={20} col="#ffffff" fall={12} />
      <Grade sunX={760} sunY={640} warm="255,200,140" />
      <Chip text="Back in town for dinner" t={t} t0={24.0} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S11: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/rocky-mountain-national-park-trip-planning-guide.jpg"
      spec="30 PAGES · PRINTABLE TRIP PLANNER"
      name={
        <>
          Rocky Mountain
          <br />
          Trip Guide
        </>
      }
      nameSize={96}
      price="$9.99"
      save="Save this before your Rocky trip"
    />
  );
};

export const V93: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.91} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.86} to={5.32} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.86} />
    </Scene>
    <Scene from={5.27} to={9.02} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.27} />
    </Scene>
    <Scene from={8.97} to={11.39} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.97} />
    </Scene>
    <Scene from={11.34} to={15.15} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.34} />
    </Scene>
    <Scene from={15.1} to={18.83} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={15.1} />
    </Scene>
    <Scene from={18.78} to={20.32} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={18.78} />
    </Scene>
    <Scene from={20.27} to={22.49} fadeIn={0.08} fadeOut={0.08}>
      <S8 off={20.27} />
    </Scene>
    <Scene from={22.44} to={23.85} fadeIn={0.08} fadeOut={0.1}>
      <S9 off={22.44} />
    </Scene>
    <Scene from={23.8} to={25.8} fadeIn={0.12} fadeOut={0.12}>
      <S10 off={23.8} />
    </Scene>
    <Scene from={25.65} to={29.6} fadeOut={0}>
      <S11 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.86, 1560],
        [3.86, 5.27, 1560],
        [5.27, 8.97, 1560],
        [8.97, 11.34, 1560],
        [11.34, 15.1, 1560],
        [15.1, 18.78, 1560],
        [18.78, 20.27, 1560],
        [20.27, 22.44, 1560],
        [22.44, 23.8, 1560],
        [23.8, 25.65, 1560],
      ]}
    />
  </AbsoluteFill>
);
