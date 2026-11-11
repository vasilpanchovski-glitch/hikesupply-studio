// V138: "He dug a toilet hole with his boot heel." in the cinematic C01 style, forest trail. Story for the Lightweight
// Backpacking Trowel (Leave No Trace Cathole Shovel, $17.99, live Shopify, orange). Advice (Leave No Trace): walk about 200 feet
// (about 70 big steps) from water, trail and camp; dig a cathole 6-8 inches (15-20 cm) deep with a small trowel; cover it well;
// pack out the paper. Tasteful: only the boot scrape, the walk, the digging and covering are shown. End card = real product photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, CLEAR, FALL, GOLD, OVERCAST, Subject, Trail } from "../fall";
import { BootClose } from "../icy";
import vo from "../vo/v138.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const SAM: Outfit = {
  ...JAKE,
  skin: "#C68E6A",
  skinShade: "#A87252",
  hair: "#1e1611",
  beard: null,
  cap: "#3E5A4A",
  capShade: "#2E4538",
  jacket: "#4B5D78",
  jacketShade: "#38475E",
  pants: "#5B5546",
  pantsShade: "#45402F",
  pack: "#C9822E",
  packShade: "#A06520",
  glove: null,
};

const ORANGE = "#F26A1B";
const ORANGE2 = "#C4520F";
const SOIL = "#6b4f36";
const SOIL2 = "#4f3826";
const SOIL3 = "#3a281a";

// Orange trowel, local coords: grip end at 0,0, blade tip at (len,0).
const Trowel: React.FC<{ x: number; y: number; s: number; rot?: number; o?: number }> = ({ x, y, s, rot = 0, o = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M0,-26 L170,-30 L190,-40 L290,-20 Q330,0 290,20 L190,40 L170,30 L0,26 Q-14,0 0,-26 Z" fill={ORANGE} />
    <path d="M0,-26 L170,-30 L190,-40 L290,-20 Q310,-8 300,0 L0,0 Z" fill="#ff8a45" opacity={0.5} />
    <path d="M190,-40 L290,-20 Q330,0 290,20 L190,40" stroke={ORANGE2} strokeWidth={4} fill="none" />
    {[30, 75, 120].map((dx) => (
      <path key={dx} d={`M${dx},0 l14,-12 l14,12 l-14,12 Z`} fill="#ffffff" />
    ))}
    {[0, 1, 2, 3, 4].map((i) => (
      <path key={i} d={`M${196 + i * 16},${-38 + i * 4} l6,-6`} stroke={ORANGE2} strokeWidth={4} />
    ))}
  </g>
);

const Glove: React.FC<{ x: number; y: number; s?: number; rot?: number; col?: string }> = ({ x, y, s = 1, rot = 0, col = SAM.jacket }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M-40,-60 L-300,-200 L-340,-120 L-60,40 Z" fill={col} />
    <path d="M-60,-46 Q-30,-70 10,-46 Q40,-30 34,4 Q28,40 -10,46 Q-50,44 -66,14 Z" fill={SAM.skin} />
    <path d="M-20,-46 q20,-6 36,6 M-24,46 q20,6 36,-6" stroke={SAM.skinShade} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

// Ground cross-section with a hole (screen coords). depth in px, fill 0..1 = soil put back.
const Dig: React.FC<{ y: number; depth: number; fill: number; mound: number; leaves?: number }> = ({ y, depth, fill, mound, leaves = 0 }) => {
  const d = depth * (1 - fill);
  return (
    <Svg>
      <path d={`M-200,${y} L1300,${y} L1300,2400 L-200,2400 Z`} fill={SOIL} />
      <path d={`M-200,${y + 220} Q540,${y + 200} 1300,${y + 240} L1300,2400 L-200,2400 Z`} fill={SOIL2} />
      {Array.from({ length: 18 }, (_, i) => (
        <ellipse key={i} cx={-100 + i * 80} cy={y + 60 + ((i * 97) % 380)} rx={12 + (i % 3) * 6} ry={8} fill={SOIL3} opacity={0.6} />
      ))}
      {/* grass + forest floor */}
      <path d={`M-200,${y} L1300,${y} L1300,${y + 26} L-200,${y + 26} Z`} fill="#5f6a3c" />
      {Array.from({ length: 30 }, (_, i) => {
        const x = -160 + i * 48;
        if (x > 380 && x < 700) return null;
        return <path key={`g${i}`} d={`M${x},${y + 4} q6,-34 12,-58 M${x + 12},${y + 4} q-2,-24 -10,-40`} stroke={i % 2 ? "#8c9a52" : "#a39a4a"} strokeWidth={6} fill="none" strokeLinecap="round" />;
      })}
      {/* the hole */}
      {d > 2 && <path d={`M400,${y} Q410,${y + d} 540,${y + d} Q670,${y + d} 680,${y} Z`} fill={SOIL3} />}
      {/* dug soil pile beside it */}
      <path d={`M700,${y + 2} Q780,${y - 70 * mound} 880,${y + 2} Z`} fill={SOIL2} />
      {/* filled back in: slightly domed */}
      {fill > 0 && <path d={`M400,${y + 1} Q540,${y - 26 * fill} 680,${y + 1} Z`} fill={SOIL2} opacity={fill} />}
      {leaves > 0 &&
        [0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={430 + i * 56} cy={y - 10 - (i % 2) * 8} rx={22} ry={10} fill={FALL[i % 4]} opacity={leaves} transform={`rotate(${(i * 37) % 50 - 25},${430 + i * 56},${y - 10})`} />)}
    </Svg>
  );
};

// ============ S1 HOOK MEDIUM: two hours in, Sam stops and looks around (0 - 3.13) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 3.13), rot: hh.rot };
  const g = 1560;
  const stop = at(t, [1.4, 2.0], [0, 1]);
  const ph = Math.min(t, 1.8) * 2.6;
  const p: HikerProps = { x: 380 + Math.min(t, 1.8) * 50, y: g + 40, scale: 2.4, phase: ph, walk: mix(0.55, 0, stop), lean: 0.08, poles: false, handOverride: stop > 0.5 ? [30, 20] : freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="a" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={6}>
          <Person {...p} outfit={SAM} expression={stop > 0.5 ? "tired" : "neutral"} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2e2618" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.25} />
      <Particles seed={1381} n={16} leaves={FALL} fall={40} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,224,180" />
      <Title text={"He dug a\ntoilet hole with\nhis boot heel."} t={t} t0={0} top={110} size={124} />
      <Chip text="Two hours in" t={t} t0={1.0} x={60} y={640} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: nothing but forest, no toilet anywhere (3.13 - 4.45) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 30, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.32), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 620, y: g + 30, scale: 1.4, walk: 0, lean: 0.02, poles: false, handOverride: [30, 20], breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="b" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} tilt={0.04} />
        <Subject rimX={5}>
          <Person {...p} outfit={SAM} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2e2618" side="both" />
      </Plane>
      <Particles seed={1382} n={14} leaves={FALL} fall={40} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,224,180" />
      <Chip text="No toilet anywhere" t={t} t0={3.3} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: boot heel scrapes a shallow hole, right beside the trail (4.45 - 8.30) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const scrape = at(t, [4.7, 6.8], [0, 1]);
  const kick = Math.sin(t * 11) * 60 * at(t, [4.7, 4.9, 6.6, 6.8], [0, 1, 1, 0]);
  const hh = handheld(t, 0.4, Math.abs(kick) / 60);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.85), rot: hh.rot };
  const y = 1324;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="c" treeY={1050} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-200,${y} L1300,${y} L1300,2400 L-200,2400 Z`} fill="#5f6a3c" />
          {/* trail edge right beside */}
          <path d={`M640,${y} L1300,${y} L1300,2400 L760,2400 Z`} fill="#9a7f5c" />
          <path d={`M640,${y} L760,2400`} stroke="#7b6448" strokeWidth={10} />
          {/* shallow scrape */}
          <path d={`M40,${y} Q240,${y + 40 * scrape} 480,${y} Z`} fill={SOIL} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse key={i} cx={-40 + i * 50} cy={y - 8 - (i % 2) * 12} rx={12} ry={7} fill={SOIL} opacity={scrape} />
          ))}
        </Svg>
        <Subject rimX={6}>
          <Svg>
            <g transform={`translate(${-40 + kick},${4}) rotate(-4,560,1300)`}>
              <BootClose toe={0} heel={0} pants={SAM.pants} pantsShade={SAM.pantsShade} boot={SAM.boot} sole={SAM.sole} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1383} n={10} leaves={FALL} fall={30} />
      <Grade sunX={790} sunY={560} warm="240,230,214" vignette={0.55} />
      <Chip text="Shallow scrape" t={t} t0={5.3} x={60} y={200} icon="x" big />
      <Chip text="Right by the trail" t={t} t0={6.9} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the fix: walk about 70 big steps off the trail (8.30 - 11.25) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 20, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.95), rot: hh.rot };
  const g = 1560;
  const go = t > 9.5;
  const ph = t * 2.8;
  const p: HikerProps = { x: go ? 380 + (t - 9.5) * 120 : 380, y: g + 40, scale: 2.4, phase: ph, walk: go ? 0.8 : 0, lean: 0.08, poles: false, handOverride: go ? freeHand(ph, 0.6) : [30, 20], breathe: 0 };
  const steps = Math.round(at(t, [9.6, 11.0], [0, 70]));
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={6}>
          <Person {...p} outfit={SAM} expression="neutral" />
          <g transform={hikerTransform(p)}>
            <Trowel x={hikerGeometry(p).arms[1].hand[0]} y={hikerGeometry(p).arms[1].hand[1]} s={0.18} rot={80} o={at(t, [9.0, 9.3], [0, 1])} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2e2618" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.3} />
      <Particles seed={1384} n={16} leaves={FALL} fall={40} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,224,180" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={9.45} top={200} size={124} />
      <Readout label="BIG STEPS" value={`${steps}`} ok={null} t={t} t0={9.55} x={60} y={200} />
      <Chip text="About 200 ft (60 m)" t={t} t0={11.3} x={60} y={420} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: far from the stream, the trail and camp (11.25 - 14.35) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.1), rot: hh.rot };
  const g = 1420;
  const ph = t * 2.4;
  const p: HikerProps = { x: 820, y: 1130, scale: 1.0, phase: ph, walk: 0.5, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={1140} t={t} />
      <Plane cam={cam} depth={0.8}>
        <Subject rimX={3}>
          <Person {...p} outfit={SAM} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          {/* tent (camp) */}
          <g transform={`translate(260,${g - 20}) scale(0.9)`}>
            <ellipse cx={0} cy={8} rx={230} ry={20} fill="rgba(0,0,0,0.3)" />
            <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill="#C9822E" />
            <path d="M0,-250 Q200,-230 220,0 L80,0 Q90,-150 0,-250 Z" fill="#A06520" />
            <path d="M-90,0 Q-80,-160 0,-180 Q80,-160 90,0 Z" fill="#3a2a16" />
          </g>
          {/* stream in front */}
          <path d={`M-200,1760 Q300,1700 600,1740 Q900,1780 1300,1720 L1300,1900 Q900,1960 600,1920 Q300,1880 -200,1940 Z`} fill="#4f8fb0" />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${-100 + i * 340 + ((t * 80) % 340)},${1800 + (i % 2) * 40} q40,-10 80,0`} stroke="#bfe3f2" strokeWidth={6} fill="none" strokeLinecap="round" />
          ))}
        </Svg>
      </Plane>
      <Particles seed={1385} n={14} leaves={FALL} fall={40} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,224,180" />
      <Chip text="Away from water" t={t} t0={12.94} x={60} y={200} icon="check" big />
      <Chip text="Away from the trail" t={t} t0={13.42} x={60} y={330} icon="check" big />
      <Chip text="Away from camp" t={t} t0={14.0} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: dig a cathole 6-8 inches deep with a small trowel (14.35 - 17.98) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const dig = at(t, [14.6, 17.0], [0, 1]);
  const stroke = Math.sin(t * 7) * at(t, [14.6, 14.8, 16.9, 17.1], [0, 1, 1, 0]);
  const hh = handheld(t, 0.3, Math.abs(stroke) * 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.63), rot: hh.rot };
  const y = 1000;
  const depth = dig * 240;
  const tip: [number, number] = [560 + stroke * 30, y + Math.max(30, depth - 20) - Math.abs(stroke) * 40];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={900} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Dig y={y} depth={depth} fill={0} mound={dig} />
        <Subject rimX={6}>
          <Svg>
            <Trowel x={tip[0] + 300 * Math.cos(-1.1)} y={tip[1] - 300 * Math.sin(1.1)} s={1} rot={116} />
            <Glove x={tip[0] + 300 * Math.cos(-1.1) + 40} y={tip[1] - 300 * Math.sin(1.1) - 30} s={1} rot={97} />
            {/* depth marker */}
            <g opacity={at(t, [16.0, 16.3], [0, 1])}>
              <path d={`M360,${y} L360,${y + 240}`} stroke="#ffffff" strokeWidth={6} />
              <path d={`M340,${y} L380,${y} M340,${y + 240} L380,${y + 240}`} stroke="#ffffff" strokeWidth={6} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1386} n={10} leaves={FALL} fall={30} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,226,190" vignette={0.55} />
      <Chip text="Small trowel" t={t} t0={14.9} x={60} y={200} icon="check" big />
      <Readout label="CATHOLE DEPTH" value="6-8 in · 15-20 cm" ok={true} t={t} t0={15.75} x={60} y={330} />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: cover it well, pack out the paper (17.98 - 20.15) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const fill = at(t, [18.1, 18.9], [0, 1]);
  const leaves = at(t, [18.9, 19.2], [0, 1]);
  const bag = at(t, [19.25, 19.6], [0, 1], outExpo);
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.09, lt / 2.17), rot: hh.rot };
  const y = 1000;
  const push = Math.sin(t * 9) * at(t, [18.1, 18.2, 18.8, 18.9], [0, 1, 1, 0]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="g" treeY={900} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Dig y={y} depth={240} fill={fill} mound={1 - fill} leaves={leaves} />
        <Subject rimX={6}>
          <Svg>
            <g opacity={1 - at(t, [19.0, 19.2], [0, 1])}>
              <Trowel x={780 + push * 40} y={y - 160} s={1} rot={160} />
            </g>
            {/* pack-out bag with the used paper inside */}
            <g transform={`translate(${mix(1200, 800, bag)},${y - 30}) rotate(-6)`} opacity={bag}>
              <rect x={-110} y={-260} width={220} height={260} rx={24} fill="rgba(220,236,248,0.3)" stroke="rgba(240,248,255,0.9)" strokeWidth={6} />
              <path d="M-80,-220 L80,-220" stroke="#3c7fbf" strokeWidth={10} strokeLinecap="round" />
              <rect x={-60} y={-170} width={120} height={140} rx={10} fill="#f4f1ea" />
              <path d="M-40,-140 L40,-140 M-40,-110 L30,-110 M-40,-80 L36,-80" stroke="#d9d3c7" strokeWidth={6} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1387} n={10} leaves={FALL} fall={30} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,226,190" vignette={0.55} />
      <Chip text="Cover it well" t={t} t0={18.15} x={60} y={200} icon="check" big />
      <Chip text="Pack out paper" t={t} t0={19.4} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF MEDIUM: the next hiker walks past, clean trail (20.15 - 22.10) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1560;
  const ph = t * 2.6;
  const p: HikerProps = { x: 300 + lt * 90, y: g + 40, scale: 2.4, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={GUIDE} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2e2618" side="right" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1] - 100} strength={0.45} />
      <Particles seed={1388} n={22} leaves={FALL} fall={30} />
      <LowScrim />
      <Grade sunX={740} sunY={660} warm="255,214,160" />
      <Readout label="THE NEXT HIKER" value="Never knew" ok={true} t={t} t0={20.3} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/backpacking-trowel-cut.png"
      cutoutH={640}
      spec="LEAVE NO TRACE · LIGHTWEIGHT"
      name={
        <>
          Backpacking
          <br />
          Trowel
        </>
      }
      nameSize={96}
      price="$17.99"
      save="Save this before your next long hike"
    />
  );
};

export const V138: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.18} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.13} to={4.5} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.13} />
    </Scene>
    <Scene from={4.45} to={8.35} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={4.45} />
    </Scene>
    <Scene from={8.3} to={11.3} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.3} />
    </Scene>
    <Scene from={11.25} to={14.4} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.25} />
    </Scene>
    <Scene from={14.35} to={18.03} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.35} />
    </Scene>
    <Scene from={17.98} to={20.2} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={17.98} />
    </Scene>
    <Scene from={20.15} to={22.15} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={20.15} />
    </Scene>
    <Scene from={22.0} to={27} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.13, 1600],
        [3.13, 4.45, 1600],
        [4.45, 8.3, 1660],
        [8.3, 11.25, 1600],
        [11.25, 14.35, 1600],
        [14.35, 17.98, 1660],
        [17.98, 20.15, 1660],
        [20.15, 22.0, 1600],
      ]}
    />
  </AbsoluteFill>
);
