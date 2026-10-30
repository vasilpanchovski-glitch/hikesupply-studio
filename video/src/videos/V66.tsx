// V66: "One step off the boardwalk" in the cinematic C01 style, Yellowstone geyser basin in autumn.
// End card = Yellowstone & Grand Teton Trip Planning Guide (digital). Safety line as NPS gives it: stay on boardwalks and marked trails in thermal areas.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, CLEAR, GOLD, OVERCAST, Subject } from "../fall";
import vo from "../vo/v66.json";

const words = vo.words as unknown as Word[];

const LENA: Outfit = {
  ...GUIDE,
  skin: "#EDBB9C",
  skinShade: "#D29C7C",
  hair: "#3a2418",
  ponytail: "#3a2418",
  beard: null,
  cap: "#2C3B2E",
  capShade: "#1B2620",
  jacket: "#2F7F86",
  jacketShade: "#256870",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#C2662E",
  packShade: "#9B4E20",
  glove: null,
};
const KID: Outfit = { ...LENA, jacket: "#d9a34a", jacketShade: "#b8862f", cap: "#B83A55", capShade: "#8E2B42", hair: "#3a2418", ponytail: null, pack: "#3E5F4B", packShade: "#2E4A39" };

const CRUST = "#d9d2bf";
const CRUST2 = "#c8bea6";
const FAR = "#8794a6";
const MID = "#5b6656";

// Pale geyser-basin ground with orange microbial streaks.
const Basin: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <defs>
      <linearGradient id={`bas${y}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={CRUST2} />
        <stop offset="0.35" stopColor="#8f8670" />
        <stop offset="1" stopColor="#5f594a" />
      </linearGradient>
    </defs>
    <rect x={-400} y={y - 30} width={1880} height={2600} fill={CRUST} />
    <rect x={-400} y={y + 60} width={1880} height={800} fill={`url(#bas${y})`} />
    {Array.from({ length: 10 }, (_, i) => (
      <ellipse key={i} cx={-300 + i * 190} cy={y + 40 + (i % 3) * 70} rx={90 + (i % 4) * 30} ry={8} fill={i % 2 ? "#d99a4e" : "#c9b48e"} opacity={0.55} />
    ))}
  </Svg>
);

// Boardwalk seen from the side: deck top at y, posts below. Ends at x1.
const Boardwalk: React.FC<{ y: number; x0?: number; x1?: number; s?: number }> = ({ y, x0 = -400, x1 = 1480, s = 1 }) => (
  <g>
    {Array.from({ length: Math.ceil((x1 - x0) / (150 * s)) }, (_, i) => (
      <rect key={i} x={x0 + 40 * s + i * 150 * s} y={y} width={18 * s} height={46 * s} fill="#6b4b30" />
    ))}
    <rect x={x0} y={y - 6 * s} width={x1 - x0} height={30 * s} rx={4} fill="#b08a5a" stroke="rgba(0,0,0,0.25)" strokeWidth={2} />
    <rect x={x0} y={y - 6 * s} width={x1 - x0} height={8 * s} fill="#c9a272" />
    {Array.from({ length: Math.ceil((x1 - x0) / (60 * s)) }, (_, i) => (
      <line key={`p${i}`} x1={x0 + i * 60 * s} y1={y - 6 * s} x2={x0 + i * 60 * s} y2={y + 24 * s} stroke="rgba(0,0,0,0.18)" strokeWidth={2} />
    ))}
  </g>
);

// Hot spring seen at a low angle: orange rim, yellow ring, teal, deep blue centre.
const Pool: React.FC<{ cx: number; cy: number; rx: number; ry: number; t: number }> = ({ cx, cy, rx, ry, t }) => (
  <g>
    <ellipse cx={cx} cy={cy} rx={rx * 1.18} ry={ry * 1.25} fill="#d9873a" opacity={0.85} />
    <ellipse cx={cx} cy={cy} rx={rx * 1.05} ry={ry * 1.08} fill="#e8c25a" />
    <ellipse cx={cx} cy={cy} rx={rx * 0.9} ry={ry * 0.9} fill="#5fbfb8" />
    <ellipse cx={cx} cy={cy} rx={rx * 0.66} ry={ry * 0.64} fill="#2a86b8" />
    <ellipse cx={cx} cy={cy} rx={rx * 0.38} ry={ry * 0.36} fill="#15578a" />
    <ellipse cx={cx - rx * 0.2} cy={cy - ry * 0.25} rx={rx * 0.35} ry={ry * 0.12} fill="#ffffff" opacity={0.18 + 0.06 * Math.sin(t * 2)} />
  </g>
);

const Steam: React.FC<{ x: number; y: number; t: number; s?: number; n?: number }> = ({ x, y, t, s = 1, n = 8 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const k = (t * 0.16 + i / n) % 1;
      return <circle key={i} cx={x + Math.sin(k * 6 + i) * 40 * s + (i % 3 - 1) * 60 * s + k * 50 * s} cy={y - k * 460 * s} r={(34 + k * 100) * s} fill="#ffffff" opacity={0.42 * (1 - k)} />;
    })}
  </g>
);

const HandPhone: React.FC<{ p: HikerProps; glow?: number }> = ({ p, glow = 0.6 }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] + 6},${h[1] - 26}) rotate(-8)`}>
        <rect x={-14} y={-26} width={28} height={50} rx={6} fill="#1d2226" />
        <rect x={-11} y={-22} width={22} height={40} rx={4} fill="#9fd0ea" opacity={glow} />
      </g>
    </g>
  );
};

// ============ S1 HOOK: at the end of the boardwalk, leaning toward the pool (0 - 3.88) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: hh.x + t * 18, y: hh.y, zoom: mix(1.03, 1.12, t / 3.88), rot: hh.rot };
  const g = 1380;
  const p: HikerProps = { x: 470, y: g - 6, scale: 1.9, walk: 0, lean: 0.16 + 0.03 * Math.sin(t * 1.4), poles: false, handOverride: [74, -70], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="a" treeY={g - 170} blur={2} t={t} far={FAR} mid={MID} />
      <Plane cam={cam} depth={0.45} blur={2}>
        <Svg>
          <Steam x={150} y={g - 190} t={t} s={0.5} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Basin y={g} />
        <Svg>
          <Pool cx={850} cy={g + 90} rx={330} ry={58} t={t} />
          <Steam x={850} y={g + 80} t={t} s={0.9} />
          <Boardwalk y={g} x1={600} />
        </Svg>
        <Subject>
          <Person {...p} outfit={LENA} expression="happy" />
          <HandPhone p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a2a" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.14} />
      <Particles seed={61} n={14} col="#fff3d6" fall={20} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Title text={"One step off\nthe boardwalk"} t={t} t0={0} top={150} size={140} />
      <Chip text="Just a closer photo..." t={t} t0={1.2} x={80} y={500} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the bright blue pool (3.88 - 5.36) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: lt * 16 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 1.5), rot: hh.rot };
  const g = 1150;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="b" treeY={g - 60} blur={9} t={t} far={FAR} mid={MID} />
      <Plane cam={cam} depth={1}>
        <Basin y={g} />
        <Svg>
          <Pool cx={560} cy={1500} rx={620} ry={250} t={t} />
          <Steam x={560} y={1420} t={t} s={1.6} n={10} />
        </Svg>
      </Plane>
      <Particles seed={62} n={12} col="#ffffff" fall={-20} />
      <Grade sunX={790} sunY={560} warm="255,214,160" vignette={0.5} />
      <Chip text="So blue..." t={t} t0={4.0} x={80} y={260} big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: one foot over the edge (5.36 - 8.02) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const crack = at(t, [6.7, 7.1], [0, 1]);
  const hh = handheld(t, 0.5, at(t, [6.7, 6.85, 7.3], [0, 1, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.6), rot: hh.rot };
  const g = 1560;
  const ph = at(t, [5.6, 6.7], [-Math.PI / 2, Math.PI / 2 - 0.05]);
  const p: HikerProps = { x: 430, y: g, scale: 5.2, phase: ph, walk: 1, lean: 0.1, poles: false, handOverride: [80, -60] };
  const edge = 540;
  const fx = 430 + (46 * Math.sin(ph) + 6) * 5.2;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="c" treeY={1000} blur={12} t={t} far={FAR} mid={MID} />
      <Plane cam={cam} depth={1}>
        <Basin y={g + 10} />
        <Svg>
          <Pool cx={1100} cy={g + 260} rx={420} ry={110} t={t} />
          <Steam x={1000} y={g + 200} t={t} s={1.2} />
          <Boardwalk y={g + 6} x0={-400} x1={edge} s={2.4} />
          <g opacity={crack}>
            <path d={`M${fx - 120},${g + 40} l60,30 l40,-20 l50,40 l70,-10 M${fx - 40},${g + 70} l-20,60 M${fx + 60},${g + 60} l30,70`} stroke="#4a3e2c" strokeWidth={9} fill="none" strokeLinecap="round" />
          </g>
          <Steam x={fx + 40} y={g + 40} t={t * 1.5} s={0.8 * crack + 0.01} n={6} />
        </Svg>
        <Subject rimX={6}>
          <Person {...p} outfit={LENA} expression="neutral" />
        </Subject>
      </Plane>
      <Grade sunX={790} sunY={560} warm="255,214,160" vignette={0.55} />
      <Chip text="Off the boardwalk" t={t} t0={5.55} x={80} y={240} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CUTAWAY: a thin crust over scalding water (8.02 - 11.52) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [9.2, 9.35, 9.9], [0, 1, 0]);
  const hh = handheld(t, 0.5, shake);
  const cam: Cam = { x: hh.x, y: at(lt, [0, 3.4], [-40, 30]) + hh.y, zoom: mix(1.0, 1.06, lt / 3.4), rot: hh.rot };
  const top = 900;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="d" treeY={top - 40} blur={6} t={t} far={FAR} mid={MID} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <defs>
            <linearGradient id="hot66" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3d9cc9" />
              <stop offset="1" stopColor="#15456e" />
            </linearGradient>
          </defs>
          {/* ground cut open */}
          <rect x={-400} y={top} width={1880} height={1400} fill="#7d6a4f" />
          <path d={`M-400,${top + 70} Q540,${top + 40} 1480,${top + 80} L1480,${top + 900} Q540,${top + 980} -400,${top + 900} Z`} fill="url(#hot66)" />
          {Array.from({ length: 16 }, (_, i) => {
            const k = (t * 0.5 + i / 16) % 1;
            return <circle key={i} cx={-60 + ((i * 97) % 1200)} cy={top + 880 - k * 780} r={8 + (i % 4) * 5} fill="#bfe6f5" opacity={0.6 * (1 - k)} />;
          })}
          {/* the thin crust */}
          <path d={`M-400,${top - 10} L1480,${top - 10} L1480,${top + 74} Q540,${top + 44} -400,${top + 70} Z`} fill={CRUST} stroke={CRUST2} strokeWidth={4} />
          <rect x={-400} y={top - 40} width={1880} height={34} fill={CRUST} />
          {/* boot on top */}
          <g transform={`translate(560,${top - 34})`}>
            <rect x={-40} y={-260} width={80} height={220} rx={30} fill={LENA.pants} />
            <path d="M-60,-60 L80,-60 Q140,-50 150,-10 L150,0 L-70,0 Z" fill={LENA.boot} />
            <rect x={-74} y={-8} width={230} height={14} rx={6} fill={LENA.sole} />
          </g>
          <path d={`M420,${top - 6} l40,40 l50,-10 l40,30 M640,${top - 6} l-20,40 l40,20`} stroke="#5a4a32" strokeWidth={6} fill="none" opacity={at(t, [9.2, 9.4], [0, 1])} />
          <Steam x={300} y={top - 40} t={t} s={0.6} n={6} />
          <Steam x={820} y={top - 40} t={t + 3} s={0.6} n={6} />
        </Svg>
      </Plane>
      <Grade sunX={760} sunY={640} warm="240,224,200" cool="30,50,70" vignette={0.6} />
      <Chip text="Thin crust" t={t} t0={8.3} x={80} y={220} icon="x" big />
      <Readout label="UNDER IT, IN PLACES" value="SCALDING WATER" ok={false} t={t} t0={9.2} x={80} y={1180} pulseAt={9.6} />
    </AbsoluteFill>
  );
};

// ============ S5 FIX title (11.52 - 14.3) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 14 + hh.x, y: at(lt, [0, 2.7], [-90, 0]) + hh.y, zoom: at(lt, [0, 2.7], [1.14, 1.03]), rot: hh.rot };
  const g = 1400;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={g - 150} t={t} far={FAR} mid={MID} />
      <Plane cam={cam} depth={1}>
        <Basin y={g} />
        <Svg>
          <Pool cx={820} cy={g + 95} rx={260} ry={50} t={t} />
          <Steam x={820} y={g + 85} t={t} s={0.8} />
          <Boardwalk y={g} />
        </Svg>
        <Subject>
          <Person x={300} y={g - 6} scale={1.6} walk={0} lean={0.02} poles={false} handOverride={[40, 20]} outfit={LENA} expression="neutral" />
        </Subject>
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.2} />
      <Particles seed={65} n={14} col="#fff3d6" fall={20} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Title text={"Stay on the\nboardwalk."} t={t} t0={off + 0.15} top={190} size={160} />
    </AbsoluteFill>
  );
};

// ============ S6 MEDIUM: boardwalks and marked trails only (14.3 - 16.78) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 40 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.5), rot: hh.rot };
  const g = 1380;
  const ph = lt * 3.4;
  const p: HikerProps = { x: 300 + lt * 60, y: g - 6, scale: 2.3, phase: ph, walk: 0.8, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.8) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={g - 120} blur={2} t={t} far={FAR} mid={MID} />
      <Plane cam={cam} depth={1}>
        <Basin y={g} />
        <Svg>
          <Pool cx={900} cy={g + 95} rx={300} ry={52} t={t} />
          <Steam x={900} y={g + 85} t={t} s={0.8} />
          <Boardwalk y={g} />
        </Svg>
        <Subject rimX={6}>
          <Person {...p} outfit={LENA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a2a" side="right" />
      </Plane>
      <Particles seed={66} n={14} col="#fff3d6" fall={20} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Chip text="In thermal areas" t={t} t0={14.4} x={80} y={220} />
      <Chip text="Boardwalks" t={t} t0={15.0} x={80} y={330} icon="check" big />
      <Chip text="Marked trails" t={t} t0={15.6} x={80} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 MEDIUM: keep kids close (16.78 - 18.05) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 20 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.3), rot: hh.rot };
  const g = 1400;
  const ph = lt * 3;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="g" treeY={g - 120} blur={3} t={t} far={FAR} mid={MID} />
      <Plane cam={cam} depth={1}>
        <Basin y={g} />
        <Svg>
          <Pool cx={860} cy={g + 95} rx={280} ry={50} t={t} />
          <Steam x={860} y={g + 85} t={t} s={0.8} />
          <Boardwalk y={g} />
        </Svg>
        <Subject rimX={5}>
          <Person x={560} y={g - 6} scale={1.25} phase={ph} walk={0.6} lean={0.06} poles={false} handOverride={[-40, -10]} outfit={KID} expression="happy" />
          <Person x={330} y={g - 6} scale={2.1} phase={ph * 0.8} walk={0.5} lean={0.06} poles={false} handOverride={[90, 20]} outfit={LENA} expression="happy" />
        </Subject>
      </Plane>
      <Particles seed={67} n={12} col="#fff3d6" fall={20} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Chip text="Keep kids close" t={t} t0={16.85} x={80} y={260} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: lean on your zoom (18.05 - 20.18) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.1), rot: hh.rot };
  const z = at(t, [18.4, 19.3], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="h" treeY={1200} blur={12} t={t} far={FAR} mid={MID} />
      <Plane cam={cam} depth={0.9} blur={8}>
        <Basin y={1300} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <defs>
            <clipPath id="scr66">
              <rect x={310} y={520} width={460} height={860} rx={40} />
            </clipPath>
          </defs>
          <ellipse cx={300} cy={1240} rx={110} ry={150} fill={LENA.skin} stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
          <ellipse cx={780} cy={1240} rx={110} ry={150} fill={LENA.skin} stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
          <rect x={290} y={500} width={500} height={900} rx={56} fill="#1d2226" />
          <g clipPath="url(#scr66)">
            <rect x={310} y={520} width={460} height={860} fill="#9fc2dc" />
            <rect x={310} y={960} width={460} height={420} fill={CRUST} />
            <g transform={`translate(540,1080) scale(${mix(0.45, 1.5, z)}) translate(-540,-1080)`}>
              <Pool cx={540} cy={1080} rx={260} ry={80} t={t} />
              <Steam x={540} y={1060} t={t} s={0.5} />
            </g>
          </g>
          <rect x={470} y={1300} width={140} height={44} rx={22} fill="rgba(0,0,0,0.5)" />
          <text x={540} y={1332} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={34} fill="#fff">
            {z > 0.9 ? "5x" : "1x"}
          </text>
          <ellipse cx={360} cy={1350} rx={60} ry={40} fill={LENA.skinShade} />
          <ellipse cx={720} cy={1350} rx={60} ry={40} fill={LENA.skinShade} />
        </Svg>
      </Plane>
      <Grade sunX={790} sunY={560} warm="255,214,160" vignette={0.5} />
      <Chip text="Zoom in, not your feet" t={t} t0={18.15} x={80} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF: best photo, from the boardwalk (20.18 - 22.5) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 18 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.16, 1.04], outExpo), rot: hh.rot };
  const g = 1400;
  const p: HikerProps = { x: 330, y: g - 6, scale: 1.9, walk: 0, lean: 0.03, poles: false, handOverride: [74, -70], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="i" treeY={g - 150} t={t} far={FAR} mid={MID} />
      <Plane cam={cam} depth={1}>
        <Basin y={g} />
        <Svg>
          <Pool cx={800} cy={g + 95} rx={320} ry={55} t={t} />
          <Steam x={800} y={g + 85} t={t} s={0.9} />
          <Boardwalk y={g} />
        </Svg>
        <Subject rimX={6}>
          <Person {...p} outfit={LENA} expression="happy" />
          <HandPhone p={p} glow={1} />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={69} n={22} col="#ffe7b8" />
      <Grade sunX={740} sunY={660} warm="255,180,100" />
      <Chip text="Best photo of the trip" t={t} t0={20.3} x={80} y={240} icon="check" big />
      <Chip text="Taken from the boardwalk" t={t} t0={21.0} x={80} y={370} />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/yellowstone-grand-teton-trip-planning-guide.jpg"
      photoH={800}
      spec="30 PAGES · 16 DAY HIKES · MI + KM"
      name={
        <>
          Yellowstone &amp;
          <br />
          Grand Teton Guide
        </>
      }
      nameSize={96}
      price="$9.99"
      save="Save this before your Yellowstone trip"
    />
  );
};

export const V66: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.93} fadeIn={0} fadeOut={0.1}>
      <S1 />
    </Scene>
    <Scene from={3.88} to={5.41} fadeIn={0.08} fadeOut={0.08}>
      <S2 off={3.88} />
    </Scene>
    <Scene from={5.36} to={8.07} fadeIn={0.08} fadeOut={0.1}>
      <S3 off={5.36} />
    </Scene>
    <Scene from={8.02} to={11.57} fadeIn={0.08} fadeOut={0.1}>
      <S4 off={8.02} />
    </Scene>
    <Scene from={11.52} to={14.35} fadeIn={0.12} fadeOut={0.1}>
      <S5 off={11.52} />
    </Scene>
    <Scene from={14.3} to={16.83} fadeIn={0.1} fadeOut={0.1}>
      <S6 off={14.3} />
    </Scene>
    <Scene from={16.78} to={18.1} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={16.78} />
    </Scene>
    <Scene from={18.05} to={20.23} fadeIn={0.08} fadeOut={0.08}>
      <S8 off={18.05} />
    </Scene>
    <Scene from={20.18} to={22.55} fadeIn={0.1} fadeOut={0.12}>
      <S9 off={20.18} />
    </Scene>
    <Scene from={22.3} to={27.5} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.9, 1560],
        [3.9, 5.38, 1560],
        [5.38, 8.04, 1560],
        [8.04, 11.54, 1560],
        [11.54, 16.75, 1560],
        [16.75, 18.05, 1560],
        [18.05, 20.18, 1560],
        [20.18, 22.3, 1560],
      ]}
    />
  </AbsoluteFill>
);
