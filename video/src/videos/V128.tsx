// V128: "Her blister tape peeled off in a mile." in the cinematic C01 style, late-fall trail, posted Dec 12.
// Advice (conservative, basic foot care): at a hot spot, dry the skin first, cut the tape a bit longer than the sore spot,
// round every corner so nothing catches on the sock, press it flat. No medical promises, no numbers on screen.
// The 14-in-1 Folding Multi-Tool has scissors (live Shopify listing). $17.99 (live Shopify).
// End card = real Shopify main photo, cut out (products/folding-multi-tool-cut.png, same as V56).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT, freeHand } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, FALL, GOLD, Subject, Trail } from "../fall";
import vo from "../vo/v128.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const LATE: Sky = { top: "#4f6a8c", mid: "#b4c0c6", low: "#ecdcc0", sun: [780, 600], sunR: 46, sunCol: "#fff3dc", glow: "#ffd9a0" };

const JEN: Outfit = {
  ...GUIDE,
  skin: "#E7B996",
  skinShade: "#C99878",
  hair: "#6b3b22",
  ponytail: "#6b3b22",
  beard: null,
  cap: "#2C6E63",
  capShade: "#1f5249",
  jacket: "#4E6B8A",
  jacketShade: "#3a536c",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#B83A55",
  packShade: "#8E2B42",
  glove: null,
};
const SKIN = JEN.skin;
const SKIN2 = JEN.skinShade;
const TAPE = "#e8d8bc";
const TAPE2 = "#cdb894";
const SOCK = "#7d8a7a";

// ---------- props ----------
// Bare foot, side view, heel on the left, sole on y=0 (local units).
const Foot: React.FC<{ x: number; y: number; s?: number; rot?: number; hot?: number; children?: React.ReactNode }> = ({ x, y, s = 1, rot = 0, hot = 1, children }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-80} y={-1500} width={290} height={1080} rx={40} fill={JEN.pants} />
    <rect x={-80} y={-470} width={290} height={50} fill={JEN.pantsShade} />
    <path d="M-50,-440 L-60,-260 Q-150,-170 -130,-60 Q-110,10 -20,10 L560,10 Q690,10 690,-50 Q690,-110 600,-120 Q380,-150 200,-290 L180,-440 Z" fill={SKIN} />
    <path d="M-120,-30 Q-100,10 -20,10 L560,10 Q690,10 690,-50 L600,-30 Q300,-10 -120,-30 Z" fill={SKIN2} />
    <path d="M-60,-260 Q-20,-230 -10,-180" stroke={SKIN2} strokeWidth={8} fill="none" strokeLinecap="round" />
    {[0, 1, 2, 3].map((i) => (
      <path key={i} d={`M${610 - i * 22},-108 Q${620 - i * 22},-60 ${600 - i * 22},-20`} stroke={SKIN2} strokeWidth={5} fill="none" opacity={0.6} />
    ))}
    {hot > 0 && <ellipse cx={-92} cy={-120} rx={56} ry={70} fill="#e0605a" opacity={0.45 * hot} />}
    {children}
  </g>
);

// A strip of tape on the heel (local units of Foot). r = corner radius, curl = how far the top corner has rolled.
const Tape: React.FC<{ x: number; y: number; w: number; h: number; r: number; rot?: number; curl?: number; press?: number }> = ({ x, y, w, h, r, rot = 0, curl = 0, press = 0 }) => {
  const lift = curl * h * 0.55;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <rect x={-w / 2 + 6} y={-h / 2 + lift + 8} width={w} height={h - lift} rx={r} fill="rgba(0,0,0,0.18)" />
      <rect x={-w / 2} y={-h / 2 + lift} width={w} height={h - lift} rx={r} fill={TAPE} />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={-w / 2 + 10} y1={-h / 2 + lift + 14 + i * ((h - lift - 24) / 5)} x2={w / 2 - 10} y2={-h / 2 + lift + 14 + i * ((h - lift - 24) / 5)} stroke={TAPE2} strokeWidth={2} opacity={0.6} />
      ))}
      {curl > 0 && (
        <g>
          <path d={`M${-w / 2},${-h / 2 + lift} Q${-w / 2 - 30 * curl},${-h / 2 + lift - 60 * curl} ${-w / 2 + 20},${-h / 2 + lift - 70 * curl} L${w / 2 - 10},${-h / 2 + lift - 70 * curl} Q${w / 2 + 20 * curl},${-h / 2 + lift - 50 * curl} ${w / 2},${-h / 2 + lift} Z`} fill={TAPE2} />
          <ellipse cx={0} cy={-h / 2 + lift - 34 * curl} rx={w / 2} ry={22 * curl + 2} fill="#b9a47e" />
          <path d={`M${-w / 2 + 14},${-h / 2 + lift - 40 * curl} L${w / 2 - 14},${-h / 2 + lift - 30 * curl}`} stroke="#8a7a5a" strokeWidth={5} opacity={0.6} />
        </g>
      )}
      {press > 0 && <rect x={-w / 2} y={-h / 2 + lift} width={w} height={h - lift} rx={r} fill="#fff" opacity={0.18 * press} />}
    </g>
  );
};

// The multi-tool with its small scissors folded out (open 0..1 = blades closed..open).
const MultiTool: React.FC<{ x: number; y: number; s?: number; rot?: number; open?: number }> = ({ x, y, s = 1, rot = 0, open = 0.5 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-360} y={-46} width={380} height={92} rx={40} fill="#3a3f46" />
    <rect x={-350} y={-38} width={360} height={30} rx={14} fill="#5a6068" />
    {[-300, -240, -180, -120].map((cx) => (
      <circle key={cx} cx={cx} cy={20} r={8} fill="#22262b" />
    ))}
    <circle cx={0} cy={0} r={16} fill="#9aa2aa" />
    <g transform={`rotate(${-8 - open * 14})`}>
      <path d="M0,-8 L200,-20 L196,-2 L0,8 Z" fill="#d8dde2" />
    </g>
    <g transform={`rotate(${8 + open * 14})`}>
      <path d="M0,-8 L200,2 L196,20 L0,8 Z" fill="#b8c0c8" />
    </g>
    <circle cx={6} cy={0} r={10} fill="#6c737a" />
  </g>
);

const Thumb: React.FC<{ x: number; y: number; rot?: number; s?: number }> = ({ x, y, rot = 0, s = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-80} y={-40} width={260} height={120} rx={60} fill={JEN.jacket} />
    <ellipse cx={-90} cy={20} rx={110} ry={70} fill={SKIN} />
    <ellipse cx={-190} cy={0} rx={70} ry={44} fill={SKIN} />
    <ellipse cx={-226} cy={-6} rx={26} ry={20} fill="#f2d2bc" />
  </g>
);

const Rock: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <g>
    <ellipse cx={x} cy={y + 8} rx={w * 0.55} ry={18} fill="rgba(0,0,0,0.3)" />
    <path d={`M${x - w / 2},${y} Q${x - w / 2 + 10},${y - h} ${x - w * 0.1},${y - h} Q${x + w * 0.3},${y - h - 10} ${x + w / 2},${y - h * 0.4} L${x + w / 2},${y} Z`} fill="#8a8a82" />
    <path d={`M${x - w * 0.1},${y - h} Q${x + w * 0.3},${y - h - 10} ${x + w / 2},${y - h * 0.4} L${x + w / 2},${y} L${x + w * 0.2},${y} Q${x + w * 0.25},${y - h * 0.6} ${x - w * 0.1},${y - h} Z`} fill="#6e6f68" />
  </g>
);

const Boot: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-60,-150 L40,-150 L50,-50 Q140,-40 150,0 L-70,0 Z" fill={JEN.boot} />
    <rect x={-74} y={-6} width={230} height={22} rx={8} fill={JEN.sole} />
    {[0, 1, 2].map((i) => (
      <line key={i} x1={-40} y1={-130 + i * 30} x2={30} y2={-126 + i * 30} stroke="#c9a46a" strokeWidth={5} />
    ))}
  </g>
);

// Seated hiker: Person placed low behind the rock (the rock hides the legs).
const seated = (x: number, g: number, t: number, hand: [number, number]): HikerProps => ({ x, y: g + 150, scale: 2.3, walk: 0, lean: 0.24, poles: false, handOverride: hand, breathe: Math.sin(t * 2) * 1.4 });

// ============ S1 HOOK CLOSE-UP: the tape rolled into a sticky curl on her red heel (0 - 2.7) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, t / 2.7), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LATE} uid="a" treeY={900} t={t} blur={10} />
      <Plane cam={cam} depth={1}>
        <Trail y={1500} />
        <Subject rimX={-5} col="rgba(255,232,196,0.75)">
          <Svg>
            <Foot x={360} y={1500} s={1.15} rot={-4}>
              <Tape x={-80} y={-130} w={150} h={170} r={2} rot={-8} curl={0.85} />
            </Foot>
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1c" side="right" top={900} />
      </Plane>
      <Particles seed={1281} n={14} leaves={FALL} fall={30} />
      <Grade sunX={780} sunY={600} warm="255,226,180" vignette={0.55} />
      <Title text={"Her blister tape\npeeled off\nin a mile."} t={t} t0={0} top={110} size={120} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: Jen sits on a rock and slaps on a square strip (2.7 - 5.66) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.03, 1.09, lt / 2.96), rot: hh.rot };
  const g = 1480;
  const p = seated(470, g, t, [70, 70]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LATE} uid="b" treeY={g - 90} t={t} blur={1.5} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={5} col="rgba(255,232,196,0.85)">
          <Person {...p} outfit={JEN} expression="tired" />
          <Svg>
            <Rock x={500} y={g + 190} w={560} h={430} />
            <Boot x={830} y={g + 200} s={1.2} />
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1c" side="left" top={300} />
      </Plane>
      <Particles seed={1282} n={16} leaves={FALL} fall={30} />
      <LowScrim />
      <Grade sunX={780} sunY={600} warm="255,226,180" />
      <Chip text="Hot spot on her heel" t={t} t0={2.8} x={60} y={200} icon="none" big />
      <Chip text="Square tape, quick" t={t} t0={4.2} x={60} y={330} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: a mile later, the square corner catches and the tape rolls up (5.66 - 8.41) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const jolt = at(t, [7.0, 7.1, 7.5], [0, 1, 0]);
  const hh = handheld(t, 0.3, jolt * 3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.12, lt / 2.75), rot: hh.rot };
  const curl = at(t, [6.2, 7.4], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LATE} uid="c" treeY={900} t={t} blur={10} />
      <Plane cam={cam} depth={1}>
        <Trail y={1560} />
        <Subject rimX={-5} col="rgba(255,232,196,0.75)">
          <Svg>
            <Foot x={260} y={1520} s={1.35} rot={-2}>
              <Tape x={-80} y={-130} w={150} h={170} r={2} rot={-8} curl={curl} />
              <path d={`M-150,-290 L-150,-440 L200,-440 L200,-300 Q60,${-300 + 40 * curl} -150,-290 Z`} fill={SOCK} opacity={0.0} />
            </Foot>
            <circle cx={170} cy={1340} r={70} fill="none" stroke="#fff" strokeWidth={8} opacity={at(t, [6.9, 7.1, 8.2], [0, 0.9, 0.9])} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1283} n={12} leaves={FALL} fall={26} />
      <Grade sunX={780} sunY={600} warm="255,226,180" vignette={0.55} />
      <Readout label="ONE MILE LATER" value="Tape rolled up" ok={false} t={t} t0={5.75} x={60} y={200} />
      <Chip text="Square corners catch" t={t} t0={7.0} x={60} y={480} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the fix starts: she dries her heel with a bandana (8.41 - 11.12) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.71), rot: hh.rot };
  const wipe = Math.sin(t * 9) * 26 * at(t, [9.6, 9.8, 10.8, 11.0], [0, 1, 1, 0]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LATE} uid="d" treeY={900} t={t} blur={10} />
      <Plane cam={cam} depth={1}>
        <Trail y={1560} />
        <Subject rimX={-5} col="rgba(255,232,196,0.8)">
          <Svg>
            <Foot x={300} y={1500} s={1.2} rot={-4} hot={0.8} />
            <g transform={`translate(${200 + wipe},${1330 + wipe * 0.4}) rotate(-20)`}>
              <path d="M-120,-70 L110,-90 L130,70 L-100,90 Z" fill="#B83A55" />
              <path d="M-100,-40 L100,-56 M-90,0 L110,-14 M-80,40 L120,26" stroke="#e8c0c8" strokeWidth={5} opacity={0.6} />
              <ellipse cx={150} cy={-10} rx={70} ry={50} fill={SKIN} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1284} n={12} leaves={FALL} fall={26} />
      <Grade sunX={780} sunY={600} warm="255,226,180" vignette={0.55} />
      <Chip text="The fix" t={t} t0={8.45} x={60} y={200} icon="none" big />
      <Chip text="Dry the skin first" t={t} t0={9.65} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the scissors on the multi-tool cut a longer strip (11.12 - 16.05) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const snip = Math.max(0, Math.sin((t - 12.6) * 10)) * at(t, [12.6, 12.7, 13.9, 14.0], [0, 1, 1, 0]);
  const hh = handheld(t, 0.3, snip);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 4.93), rot: hh.rot };
  const out = at(t, [11.2, 12.4], [0, 1], outExpo);
  const cut = at(t, [12.6, 14.0], [0, 1]);
  const len = mix(160, 520, out);
  const cx = 540 - 260 + len;
  const guide = at(t, [14.3, 14.8], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#3a2a1c" }}>
      <Plane cam={cam} depth={0.6} blur={10}>
        <Svg>
          <rect x={-300} y={-300} width={1680} height={2600} fill="#5a4a36" />
          <ellipse cx={540} cy={600} rx={700} ry={380} fill="#8a7a5a" opacity={0.5} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,232,196,0.8)">
          <Svg>
            {/* tape roll on the left, strip pulled across */}
            <circle cx={200} cy={1080} r={130} fill={TAPE} />
            <circle cx={200} cy={1080} r={70} fill="#5a4a36" />
            <rect x={280} y={1010} width={len} height={140} fill={TAPE} />
            {Array.from({ length: 5 }, (_, i) => (
              <line key={i} x1={290} y1={1030 + i * 25} x2={280 + len - 10} y2={1030 + i * 25} stroke={TAPE2} strokeWidth={2} opacity={0.6} />
            ))}
            {/* sore-spot length guide above the strip */}
            <g opacity={guide}>
              <rect x={440} y={940} width={200} height={34} rx={17} fill="#e0605a" opacity={0.75} />
              <line x1={360} y1={990} x2={360} y2={1000} stroke="#fff" strokeWidth={6} />
              <line x1={720} y1={990} x2={720} y2={1000} stroke="#fff" strokeWidth={6} />
              <line x1={360} y1={995} x2={720} y2={995} stroke="#fff" strokeWidth={4} strokeDasharray="12 10" />
            </g>
            <ellipse cx={240} cy={1230} rx={90} ry={56} fill={SKIN} />
            <MultiTool x={cx + 40 + 400 * 0.0} y={1080} s={1.1} rot={180 + 90} open={0.45 + snip * 0.4} />
            <ellipse cx={cx + 40} cy={1080 + 380} rx={86} ry={60} fill={SKIN2} opacity={cut > 0 ? 0 : 0} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1285} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm="255,220,170" vignette={0.55} />
      <Chip text="Scissors on the multi-tool" t={t} t0={11.9} x={60} y={200} icon="check" big />
      <Chip text="A bit longer than the sore spot" t={t} t0={14.3} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// One loose strip whose four corners get rounded one by one (radius r).
const Strip: React.FC<{ x: number; y: number; w: number; h: number; t: number; t0: number }> = ({ x, y, w, h, t, t0 }) => {
  const k = [0, 1, 2, 3].map((i) => at(t, [t0 + i * 0.42, t0 + i * 0.42 + 0.22], [0, 1], outExpo));
  const R = 60;
  const [a, b, c, d] = k.map((v) => v * R);
  const L = x - w / 2;
  const T = y - h / 2;
  const Rr = x + w / 2;
  const B = y + h / 2;
  const path = `M${L + a},${T} L${Rr - b},${T} Q${Rr},${T} ${Rr},${T + b} L${Rr},${B - c} Q${Rr},${B} ${Rr - c},${B} L${L + d},${B} Q${L},${B} ${L},${B - d} L${L},${T + a} Q${L},${T} ${L + a},${T} Z`;
  return (
    <g>
      <path d={path} transform="translate(8,10)" fill="rgba(0,0,0,0.25)" />
      <path d={path} fill={TAPE} />
      {Array.from({ length: 5 }, (_, i) => (
        <line key={i} x1={L + 30} y1={T + 30 + i * ((h - 60) / 4)} x2={Rr - 30} y2={T + 30 + i * ((h - 60) / 4)} stroke={TAPE2} strokeWidth={3} opacity={0.6} />
      ))}
    </g>
  );
};

// ============ S6 CLOSE-UP: round every corner (16.05 - 18.62) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 2.57), rot: hh.rot };
  const t0 = 16.3;
  const corners: [number, number][] = [
    [190, 830],
    [890, 830],
    [890, 1330],
    [190, 1330],
  ];
  const step = Math.min(3, Math.max(0, Math.floor((t - t0) / 0.42)));
  const local = (t - t0 - step * 0.42) / 0.42;
  const [tx, ty] = corners[step];
  const snip = Math.max(0, Math.sin(local * Math.PI * 2));
  return (
    <AbsoluteFill style={{ background: "#3a2a1c" }}>
      <Plane cam={cam} depth={0.6} blur={10}>
        <Svg>
          <rect x={-300} y={-300} width={1680} height={2600} fill="#5a4a36" />
          <ellipse cx={540} cy={600} rx={700} ry={380} fill="#8a7a5a" opacity={0.5} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,232,196,0.8)">
          <Svg>
            <Strip x={540} y={1080} w={700} h={500} t={t} t0={t0} />
            <MultiTool x={tx + (tx > 540 ? 40 : -40)} y={ty + (ty > 1080 ? 40 : -40)} s={0.95} rot={tx > 540 ? (ty > 1080 ? 225 : 135) : ty > 1080 ? -45 : 45} open={0.3 + snip * 0.6} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1286} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm="255,220,170" vignette={0.55} />
      <Chip text="Round every corner" t={t} t0={16.1} x={60} y={200} icon="check" big />
      <Chip text="Nothing to catch" t={t} t0={17.3} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: press it flat on the dry heel (18.62 - 20.03) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const press = at(t, [18.75, 19.1], [0, 1], outExpo);
  const hh = handheld(t, 0.3, press > 0.9 && press < 1 ? 1 : 0);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 1.41), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LATE} uid="g" treeY={900} t={t} blur={10} />
      <Plane cam={cam} depth={1}>
        <Trail y={1560} />
        <Subject rimX={-5} col="rgba(255,232,196,0.8)">
          <Svg>
            <Foot x={300} y={1500} s={1.2} rot={-4} hot={0.5}>
              <Tape x={-75} y={-140} w={170} h={230} r={44} rot={-8} press={press} />
            </Foot>
            <Thumb x={mix(-70, -20, press)} y={1335} rot={180} s={1.1} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1287} n={12} leaves={FALL} fall={26} />
      <Grade sunX={780} sunY={600} warm="255,226,180" vignette={0.55} />
      <Chip text="Press it flat" t={t} t0={18.7} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: golden light, Jen finishes the loop striding easy (20.03 - 22.6) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1520;
  const ph = t * 5;
  const p: HikerProps = { x: 420 + lt * 70, y: g + 110, scale: 2.3, phase: ph, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g - 90} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={6} col="rgba(255,236,200,0.9)">
          <Person {...p} outfit={JEN} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1c" side="right" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.5} />
      <Particles seed={1288} n={20} leaves={FALL} fall={30} />
      <LowScrim />
      <Grade sunX={740} sunY={660} warm="255,214,150" />
      <Readout label="END OF THE LOOP" value="Tape still on" ok={true} t={t} t0={20.1} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/folding-multi-tool-cut.png"
      cutoutH={760}
      spec="14 TOOLS · SCISSORS, KNIFE, SAW · 5 OZ"
      name={
        <>
          14-in-1 Folding
          <br />
          Multi-Tool
        </>
      }
      nameSize={100}
      price="$17.99"
      save="Save this before your next long hike"
    />
  );
};

export const V128: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.75} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.7} to={5.71} fadeIn={0.08} fadeOut={0.08}>
      <S2 off={2.7} />
    </Scene>
    <Scene from={5.66} to={8.46} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.66} />
    </Scene>
    <Scene from={8.41} to={11.17} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.41} />
    </Scene>
    <Scene from={11.12} to={16.1} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.12} />
    </Scene>
    <Scene from={16.05} to={18.67} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={16.05} />
    </Scene>
    <Scene from={18.62} to={20.08} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={18.62} />
    </Scene>
    <Scene from={20.03} to={22.65} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={20.03} />
    </Scene>
    <Scene from={22.1} to={27.0} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.7, 1640],
        [2.7, 5.66, 1560],
        [5.66, 8.41, 1700],
        [8.41, 11.12, 1700],
        [11.12, 16.05, 1640],
        [16.05, 18.62, 1640],
        [18.62, 20.03, 1700],
        [20.03, 22.1, 1560],
      ]}
    />
  </AbsoluteFill>
);
