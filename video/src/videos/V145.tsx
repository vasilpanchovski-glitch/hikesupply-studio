// V145: "The fog came in. Her group was gone." in the cinematic C01 style, foggy early-winter ridge. Story for the Emergency
// Whistle (Aluminum Dual-Tube, with Key Ring, $6.99, live Shopify). Advice (common group practice): every hiker carries a
// whistle on a pack strap; agree on simple signals before you start (here: one blast = stop and wait, three = help);
// if you get separated, stay where you are. No statistics, no medical claims.
// End card = real Shopify product photo (red variant) cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { FrostTrail, STORM, WGOLD, WINTER, WinterBackdrop } from "../winter";
import { INK, PAPER } from "../trip";
import vo from "../vo/v145.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const HANNAH: Outfit = {
  ...JAKE,
  skin: "#F0C4A4",
  skinShade: "#D3A383",
  hair: "#a8642e",
  ponytail: "#a8642e",
  beard: null,
  cap: "#2E5E7A",
  capShade: "#21465C",
  jacket: "#C9A23A",
  jacketShade: "#A0801F",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#3E5A4A",
  packShade: "#2E4538",
  glove: null,
};
const FRIEND: Outfit = { ...GUIDE, jacket: "#7A2F3B", jacketShade: "#5E222D", pack: "#B5553A", packShade: "#8E3F2A" };
const FRIEND2: Outfit = { ...JAKE, jacket: "#2F6B5A", jacketShade: "#225044", cap: "#D9D3C7", capShade: "#B8B0A2" };

const RED = "#C2333A";
const RED2 = "#8F2229";
const FOGC = "236,240,242";

// Drifting fog banks (screen coords). k = density 0..1.
const Fog: React.FC<{ t: number; k: number; top?: number; seed?: number }> = ({ t, k, top = 700, seed = 1 }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    {Array.from({ length: 7 }, (_, i) => {
      const w = 900 + ((i * 337 + seed * 91) % 600);
      const x = ((((i * 410 + seed * 170 + t * (18 + (i % 3) * 10)) % 2200) + 2200) % 2200) - 700;
      const y = top + ((i * 233) % 900);
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: w,
            height: w * 0.42,
            borderRadius: "50%",
            background: `radial-gradient(ellipse at center, rgba(${FOGC},${0.75 * k}) 0%, rgba(${FOGC},${0.35 * k}) 45%, rgba(${FOGC},0) 70%)`,
            filter: "blur(30px)",
          }}
        />
      );
    })}
    <div style={{ position: "absolute", inset: 0, background: `rgba(${FOGC},${0.38 * k})` }} />
  </AbsoluteFill>
);

// Aluminum dual-tube whistle, local coords (mouth end at 0,0, pointing +x).
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

// Sound arcs from a point (dir 1 = right, -1 = left).
const Rings: React.FC<{ x: number; y: number; t: number; starts: number[]; reach: number; w?: number; col?: string; dir?: number }> = ({ x, y, t, starts, reach, w = 8, col = "#fff", dir = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${dir},1)`}>
    {starts.map((s, i) => {
      const k = (t - s) / 0.9;
      if (k < 0 || k > 1) return null;
      const r = 30 + Math.sqrt(k) * reach;
      return <path key={i} d={`M${r * Math.cos(-0.7)},${r * Math.sin(-0.7)} A${r},${r} 0 0 1 ${r * Math.cos(0.7)},${r * Math.sin(0.7)}`} stroke={col} strokeWidth={w * (1 - k * 0.6)} fill="none" strokeLinecap="round" opacity={1 - k} />;
    })}
  </g>
);

// Wind streaks blowing left (screen coords).
const Wind: React.FC<{ t: number; k: number; y0?: number }> = ({ t, k, y0 = 500 }) => (
  <Svg>
    {Array.from({ length: 9 }, (_, i) => {
      const q = (t * 0.9 + i / 9) % 1;
      const x = 1300 - q * 1800;
      const y = y0 + ((i * 157) % 900);
      return <path key={i} d={`M${x},${y} q120,-26 260,0 t260,-8`} stroke="#ffffff" strokeWidth={6} fill="none" strokeLinecap="round" opacity={k * 0.55 * Math.sin(q * Math.PI)} />;
    })}
  </Svg>
);

const mouthOf = (p: HikerProps): [number, number] => {
  const h = hikerGeometry(p).head;
  return [h[0] + 30, h[1] + 14];
};

// One rock at the trail side (screen coords).
const Rock: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-120,0 Q-110,-90 -20,-104 Q90,-110 120,-30 L130,0 Z" fill="#6f757b" />
    <path d="M-120,0 Q-110,-90 -20,-104 Q-40,-60 -60,0 Z" fill="#878e94" />
  </g>
);

// Signal card held up at the trailhead: one dot STOP & WAIT, three dots HELP (screen coords).
const SignalCard: React.FC<{ k1: number; k2: number; rot?: number }> = ({ k1, k2, rot = -2 }) => {
  const dot = (cx: number, cy: number, on: number) => <circle cx={cx} cy={cy} r={34} fill={INK} opacity={0.15 + 0.85 * on} transform={`translate(${cx},${cy}) scale(${mix(0.6, 1, on)}) translate(${-cx},${-cy})`} />;
  return (
    <g transform={`rotate(${rot} 540 980)`}>
      <rect x={140} y={560} width={800} height={820} rx={14} fill={PAPER} />
      <rect x={140} y={560} width={800} height={820} rx={14} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={4} />
      <text x={200} y={680} fontFamily="Barlow Condensed" fontWeight={800} fontSize={76} fill={INK} letterSpacing={2}>
        OUR WHISTLE SIGNALS
      </text>
      <path d="M200,712 L880,712" stroke={INK} strokeWidth={4} opacity={0.4} />
      <g opacity={at(k1, [0, 0.3], [0.25, 1])}>
        {dot(250, 850, k1)}
        <text x={340} y={875} fontFamily="Barlow Condensed" fontWeight={800} fontSize={74} fill={INK}>
          STOP AND WAIT
        </text>
      </g>
      <path d="M200,960 L880,960" stroke={INK} strokeWidth={3} opacity={0.2} strokeDasharray="12 14" />
      <g opacity={at(k2, [0, 0.3], [0.25, 1])}>
        {dot(250, 1100, at(k2, [0, 0.33], [0, 1]))}
        {dot(340, 1100, at(k2, [0.33, 0.66], [0, 1]))}
        {dot(430, 1100, at(k2, [0.66, 1], [0, 1]))}
        <text x={510} y={1125} fontFamily="Barlow Condensed" fontWeight={800} fontSize={74} fill={RED}>
          HELP
        </text>
      </g>
      <text x={200} y={1290} fontFamily="Barlow Condensed" fontWeight={700} fontSize={50} fill={INK} opacity={0.7}>
        Lost? Stay where you are.
      </text>
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Hannah fixes her boot on a rock, the group walks on into the fog (0 - 3.6) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.03, 1.1, t / 3.6), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 330, y: g + 40, scale: 2.4, walk: 0, lean: 0.55, poles: false, handOverride: [70, 140 + Math.sin(t * 7) * 6], breathe: Math.sin(t * 2.2) * 1.2 };
  const ph = t * 2.6;
  const away = (i: number): HikerProps => ({ x: 760 + i * 150 + t * 40, y: g - 20 - i * 16, scale: 1.05 - i * 0.08, phase: ph + i, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph + i, 0.6), breathe: 0 });
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={g - 240} t={t} snow={0} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0} />
        <Subject rimX={4} col="rgba(240,244,248,0.7)">
          <g opacity={at(t, [0.6, 3.2], [1, 0.25])}>
            <Person {...away(0)} outfit={FRIEND} flip />
            <Person {...away(1)} outfit={FRIEND2} flip />
          </g>
        </Subject>
      </Plane>
      <Fog t={t} k={at(t, [0, 3.2], [0.35, 0.8])} top={600} seed={1} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <Rock x={430} y={g + 200} s={1.2} />
        </Svg>
        <Subject rimX={6} col="rgba(255,246,225,0.8)">
          <Person {...p} outfit={HANNAH} expression="neutral" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Particles seed={1451} n={14} col="#ffffff" fall={6} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="236,238,240" cool="40,55,80" />
      <Title text={"The fog came in.\nHer group\nwas gone."} t={t} t0={0} top={100} size={120} />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: she looks up, the trail ahead is white and empty (3.6 - 5.56) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.0, 1.07, lt / 1.96), rot: hh.rot };
  const g = 1560;
  const p: HikerProps = { x: 300, y: g + 40, scale: 2.0, walk: 0, lean: -0.04, poles: false, handOverride: [30, 20], breathe: Math.sin(t * 2.4) * 1.4 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={g - 260} t={t} snow={0} blur={4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={0.06} snow={0} />
      </Plane>
      <Fog t={t} k={0.95} top={500} seed={2} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(240,244,248,0.8)">
          <Person {...p} outfit={HANNAH} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={1452} n={12} col="#ffffff" fall={6} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="236,238,240" cool="40,55,80" vignette={0.55} />
      <Chip text="Trail gone in the fog" t={t} t0={3.75} x={60} y={200} icon="x" big />
      <Chip text="Group out of sight" t={t} t0={4.5} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: she shouts, the wind takes her voice (5.56 - 7.92) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4, at(t, [5.6, 5.7, 6.1], [0, 1, 0]) * 2);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.12, lt / 2.36), rot: hh.rot };
  const p: HikerProps = { x: 430, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: -0.05, poles: false, handOverride: [56, -120], breathe: Math.sin(t * 2.2) * 1.5 };
  const m = mouthOf(p);
  const shout = at(t, [5.6, 5.8, 6.7, 6.9], [0, 1, 1, 0]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={1250} blur={12} t={t} snow={0} />
      <Fog t={t} k={0.7} top={300} seed={3} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(240,244,248,0.85)">
          <Person {...p} outfit={HANNAH} expression="tired" />
          <g transform={hikerTransform(p)}>
            <ellipse cx={m[0] - 4} cy={m[1] + 2} rx={6 * shout + 1} ry={7 * shout + 1} fill="#5a2a24" opacity={shout} />
            {/* voice arcs, short: the wind cuts them off */}
            <Rings x={m[0] + 10} y={m[1]} t={t} starts={[5.65, 5.95, 6.25]} reach={60} w={4} />
          </g>
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Wind t={t} k={at(t, [6.5, 6.9], [0, 1])} y0={300} />
      <Particles seed={1453} n={16} col="#ffffff" fall={30} />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" vignette={0.6} />
      <Chip text="She shouted" t={t} t0={5.7} x={60} y={200} icon="none" big />
      <Chip text="Wind took her voice" t={t} t0={6.9} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the fix: at the trailhead, every hiker has a whistle (7.92 - 10.6) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.68), rot: hh.rot };
  const g = 1560;
  const lift = at(t, [9.3, 9.8], [0, 1], outExpo);
  const ps: [HikerProps, Outfit, boolean][] = [
    [{ x: 230, y: g + 30, scale: 2.0, walk: 0, lean: 0.02, poles: false, handOverride: [mix(30, 60, lift), mix(20, -50, lift)], breathe: Math.sin(t * 2) }, FRIEND, false],
    [{ x: 540, y: g + 60, scale: 2.2, walk: 0, lean: 0.02, poles: false, handOverride: [mix(30, 60, lift), mix(20, -50, lift)], breathe: Math.sin(t * 2 + 1) }, HANNAH, false],
    [{ x: 850, y: g + 30, scale: 2.0, walk: 0, lean: 0.02, poles: false, handOverride: [mix(30, 60, lift), mix(20, -50, lift)], breathe: Math.sin(t * 2 + 2) }, FRIEND2, true],
  ];
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={g - 260} t={t} snow={0} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          {ps.map(([p, o, f], i) => {
            const gg = hikerGeometry(p);
            return (
              <g key={i}>
                <Person {...p} outfit={o} flip={f} expression="happy" />
                <g transform={hikerTransform(p)}>
                  <TubeWhistle x={gg.arms[1].hand[0] + 6} y={gg.arms[1].hand[1] - 6} s={1.2} rot={-20} o={lift} />
                </g>
              </g>
            );
          })}
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,246,226" />
      <Particles seed={1454} n={16} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,226" cool="40,60,90" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={9.05} top={200} size={124} />
      <Chip text="Every hiker" t={t} t0={9.2} x={60} y={200} icon="check" big />
      <Chip text="Carries a whistle" t={t} t0={9.9} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the whistle clips onto the pack strap (10.6 - 12.35) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: -lt * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.75), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.05, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.2) * 1.5 };
  const g = hikerGeometry(p);
  const clip = at(t, [10.75, 11.25], [0, 1], outExpo);
  const sx = g.sh[0] + 4;
  const sy = g.sh[1] + 40;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={1250} blur={12} t={t} snow={0} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,240,220,0.85)">
          <Person {...p} outfit={HANNAH} expression="neutral" />
          <g transform={hikerTransform(p)}>
            <path d={`M${g.sh[0] - 14},${g.sh[1] - 6} Q${g.sh[0] + 8},${g.sh[1] + 50} ${g.hip[0] + 4},${g.hip[1] - 30}`} stroke="#2a2a2a" strokeWidth={9} fill="none" strokeLinecap="round" />
            <TubeWhistle x={sx} y={sy + (1 - clip) * 40} s={0.7} rot={90 + Math.sin(t * 6) * 4} o={clip} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1455} n={12} col="#fff3d6" fall={6} />
      <Grade sunX={820} sunY={560} warm="252,240,224" vignette={0.6} />
      <Chip text="On the pack strap" t={t} t0={11.1} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: signals agreed before you start: one = stop and wait, three = help (12.35 - 18.29) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 5.94), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1300} blur={14} t={t} snow={0} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <SignalCard k1={at(t, [15.1, 15.4], [0, 1])} k2={at(t, [17.0, 17.9], [0, 1])} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1456} n={12} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,226" vignette={0.55} />
      <Chip text="Agree before you start" t={t} t0={12.5} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 MEDIUM: back in the fog, she stays where she is (18.29 - 19.74) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.08, 1.04, lt / 1.45), rot: hh.rot };
  const g = 1560;
  const p: HikerProps = { x: 480, y: g + 60, scale: 2.4, walk: 0, lean: 0, poles: false, handOverride: [30, 20], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="g" treeY={g - 260} t={t} snow={0} blur={4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0} />
      </Plane>
      <Fog t={t} k={0.8} top={500} seed={4} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(240,244,248,0.8)">
          <Person {...p} outfit={HANNAH} expression="neutral" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={1457} n={12} col="#ffffff" fall={6} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="236,238,240" cool="40,55,80" />
      <Chip text="Stay where you are" t={t} t0={18.4} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: Hannah blows once (19.74 - 21.3) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.1, lt / 1.56), rot: hh.rot };
  const p: HikerProps = { x: 430, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: [48, -136], breathe: Math.sin(t * 2.2) * 1.5 };
  const m = mouthOf(p);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="h" treeY={1250} blur={12} t={t} snow={0} />
      <Fog t={t} k={0.6} top={300} seed={5} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(240,244,248,0.85)">
          <Person {...p} outfit={HANNAH} expression="neutral" />
          <g transform={hikerTransform(p)}>
            <TubeWhistle x={m[0] - 8} y={m[1] + 2} s={0.6} />
            <Rings x={m[0] + 40} y={m[1]} t={t} starts={[20.0]} reach={300} w={7} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1458} n={12} col="#ffffff" fall={6} />
      <Grade sunX={820} sunY={520} warm="236,236,240" cool="30,45,80" vignette={0.55} />
      <Readout label="ONE BLAST" value="Stop and wait" ok={null} t={t} t0={19.95} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF WIDE: the fog thins, one whistle answers from just ahead (21.3 - 23.5) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: at(lt, [0, 1.3], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1560;
  const wave = at(t, [21.9, 22.2], [0, 1], outExpo);
  const p: HikerProps = { x: 250, y: g + 50, scale: 2.3, walk: 0, lean: -0.04, poles: false, handOverride: [30, 20], breathe: Math.sin(t * 2) };
  const f: HikerProps = { x: 820, y: g - 20, scale: 1.7, walk: 0, lean: -0.04, poles: false, handOverride: [mix(30, 70, wave), mix(20, -200, wave) + Math.sin(t * 9) * 12 * wave], breathe: 0 };
  const fm = mouthOf(f);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="i" treeY={g - 260} t={t} snow={0} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={0.05} snow={0} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...f} outfit={FRIEND} flip expression="happy" />
          <g transform={hikerTransform(f)}>
            <Rings x={fm[0] - 70} y={fm[1]} t={t} starts={[21.45]} reach={180} w={4} col="#fff6e0" dir={-1} />
          </g>
          <Person {...p} outfit={HANNAH} expression="happy" />
        </Subject>
      </Plane>
      <Fog t={t} k={at(t, [21.3, 22.6], [0.6, 0.15])} top={500} seed={6} />
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.45} col="255,236,200" />
      <Particles seed={1459} n={20} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,226,180" />
      <Readout label="ONE WHISTLE ANSWERED" value="Just ahead" ok={true} t={t} t0={21.4} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/emergency-whistle-red-cut.png"
      cutoutH={360}
      spec="ALUMINUM · DUAL TUBE · KEY RING"
      name={
        <>
          Emergency
          <br />
          Whistle
        </>
      }
      nameSize={96}
      price="$6.99"
      save="Save this before your next group hike"
    />
  );
};

export const V145: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.65} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.6} to={5.61} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.6} />
    </Scene>
    <Scene from={5.56} to={7.97} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.56} />
    </Scene>
    <Scene from={7.92} to={10.65} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.92} />
    </Scene>
    <Scene from={10.6} to={12.4} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={10.6} />
    </Scene>
    <Scene from={12.35} to={18.34} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={12.35} />
    </Scene>
    <Scene from={18.29} to={19.79} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={18.29} />
    </Scene>
    <Scene from={19.74} to={21.35} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={19.74} />
    </Scene>
    <Scene from={21.3} to={23.6} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={21.3} />
    </Scene>
    <Scene from={23.45} to={28} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.6, 1600],
        [3.6, 5.56, 1600],
        [5.56, 7.92, 1660],
        [7.92, 10.6, 1600],
        [10.6, 12.35, 1660],
        [12.35, 18.29, 1660],
        [18.29, 19.74, 1600],
        [19.74, 21.3, 1660],
        [21.3, 23.45, 1600],
      ]}
    />
  </AbsoluteFill>
);
