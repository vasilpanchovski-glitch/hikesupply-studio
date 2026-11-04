// V100: "He forgot a gift for his hiking buddy." in the cinematic C01 style. Gift story for the 2027 Hiking Year Planner (p13),
// posted Nov 29 (Black Friday weekend). Facts from the live Shopify listing: 28 printable pages, a hike planned for every month,
// the Hike-a-Week Challenge (52 boxes), a gift page with space for a note and two cut-out gift tags, instant PDF download,
// nothing shipped. $5.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, Breath, Subject, Trail, CLEAR } from "../fall";
import { FrostTrail, WINTER, WinterBackdrop } from "../winter";
import { Room, WindowView } from "../home";
import { Marker, WallCal, YearPage } from "./V99";
import vo from "../vo/v100.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#1d2a44", mid: "#3e4e6c", low: "#6f7d92", sun: [800, 560], sunR: 26, sunCol: "#f4f1e6", glow: "#a8b2c4" };
const LAMP = "255,200,140";

const MARK: Outfit = {
  ...JAKE,
  skin: "#E2AE8C",
  skinShade: "#C48F6E",
  hair: "#5a3a22",
  beard: "#5a3a22",
  cap: "#5a3a22",
  capShade: "#46301c",
  jacket: "#6d7f4a",
  jacketShade: "#566539",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  glove: null,
};
const MARK_HIKE: Outfit = { ...MARK, jacket: "#2F6F8E", jacketShade: "#22546c", cap: "#B83A55", capShade: "#8E2B42", glove: "#2a2a2a" };

const DAN: Outfit = {
  ...JAKE,
  skin: "#9A6546",
  skinShade: "#7d4f36",
  hair: "#1d1410",
  beard: "#1d1410",
  cap: "#C2662E",
  capShade: "#9a4f22",
  jacket: "#C2662E",
  jacketShade: "#9B4E20",
  pants: "#4a4f57",
  pantsShade: "#363a40",
  pack: "#3E4F5C",
  packShade: "#2C3943",
};
const DAN_WINTER: Outfit = { ...DAN, cap: "#2C6E63", capShade: "#1f5249", glove: "#2a2a2a" };

const PAPER = "#f7f2e8";
const INK = "#2C3B2E";
const PEN = "#2a3a8a";

const headAt = (p: HikerProps, flip = false): [number, number] => {
  const s = p.scale ?? 1;
  const g = hikerGeometry(p);
  return [p.x + (flip ? -1 : 1) * g.head[0] * s, p.y - 182 * s + g.head[1] * s];
};

// Home printer with a page sliding out (k 0..1).
const Printer: React.FC<{ x: number; y: number; w: number; k: number }> = ({ x, y, w, k }) => {
  const h = w * 0.42;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={10} y={h + 10} width={w} height={30} rx={10} fill="rgba(0,0,0,0.25)" />
      <rect x={0} y={0} width={w} height={h} rx={28} fill="#e9ecee" />
      <rect x={0} y={h * 0.62} width={w} height={h * 0.38} rx={20} fill="#cfd5d8" />
      <rect x={w * 0.12} y={h * 0.52} width={w * 0.76} height={16} rx={8} fill="#2b2f33" />
      <circle cx={w * 0.86} cy={h * 0.25} r={12} fill="#3e7d4f" />
      {/* the page coming out of the slot */}
      <g transform={`translate(${w * 0.16},${h * 0.56})`}>
        <rect x={0} y={0} width={w * 0.68} height={mix(0, w * 0.6, k)} fill={PAPER} />
        <rect x={w * 0.05} y={mix(0, w * 0.6, k) - w * 0.08} width={w * 0.58} height={8} rx={4} fill={INK} opacity={k > 0.3 ? 0.8 : 0} />
        <rect x={w * 0.05} y={mix(0, w * 0.6, k) - w * 0.16} width={w * 0.4} height={8} rx={4} fill={INK} opacity={k > 0.5 ? 0.5 : 0} />
        <rect x={w * 0.05} y={mix(0, w * 0.6, k) - w * 0.24} width={w * 0.5} height={8} rx={4} fill={INK} opacity={k > 0.7 ? 0.5 : 0} />
      </g>
    </g>
  );
};

// Gift page with a hand-written first trail and a gift tag with a dashed cut line.
const GiftPage: React.FC<{ x: number; y: number; w: number; write: number; cut: number }> = ({ x, y, w, write, cut }) => {
  const h = w * 1.29;
  const tagY = h * 0.6;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={12} y={18} width={w} height={h} rx={14} fill="rgba(0,0,0,0.25)" />
      <rect x={0} y={0} width={w} height={h} rx={14} fill={PAPER} />
      <text x={w / 2} y={w * 0.13} textAnchor="middle" fontFamily="Fraunces" fontWeight={700} fontSize={w * 0.085} fill={INK}>
        A Year of Hiking
      </text>
      <text x={w * 0.08} y={w * 0.28} fontFamily="Inter" fontWeight={600} fontSize={w * 0.04} fill="#5b625c">
        Our first trail:
      </text>
      <line x1={w * 0.08} y1={w * 0.39} x2={w * 0.92} y2={w * 0.39} stroke="#c8bfae" strokeWidth={3} />
      <clipPath id="gpw">
        <rect x={w * 0.08} y={w * 0.28} width={w * 0.84 * write} height={w * 0.14} />
      </clipPath>
      <text x={w * 0.09} y={w * 0.37} fontFamily="Barlow Condensed" fontWeight={700} fontSize={w * 0.075} fill={PEN} clipPath="url(#gpw)">
        Jan 1, Bear Creek Loop
      </text>
      <text x={w * 0.08} y={w * 0.5} fontFamily="Inter" fontWeight={600} fontSize={w * 0.04} fill="#5b625c">
        From: Mark
      </text>
      {/* two gift tags */}
      {[0, 1].map((i) => {
        const tx = w * (0.08 + i * 0.46);
        const tw = w * 0.38;
        const th = w * 0.32;
        const off = i === 0 ? cut : 0;
        return (
          <g key={i} transform={`translate(${tx + off * 30},${tagY - off * 40}) rotate(${off * -8})`}>
            <path d={`M0,${th * 0.2} L${tw * 0.18},0 L${tw},0 L${tw},${th} L${tw * 0.18},${th} L0,${th * 0.8} Z`} fill={i === 0 && cut > 0.95 ? "#fbf8f1" : PAPER} stroke={INK} strokeWidth={3} strokeDasharray={i === 0 && cut > 0.95 ? "0" : "12 8"} />
            <circle cx={tw * 0.16} cy={th / 2} r={10} fill="none" stroke={INK} strokeWidth={3} />
            <text x={tw * 0.58} y={th * 0.58} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={tw * 0.16} fill={INK} letterSpacing={2}>
              FOR DAN
            </text>
          </g>
        );
      })}
    </g>
  );
};

// Scissors (screen coords), open amount o 0..1.
const Scissors: React.FC<{ x: number; y: number; s?: number; rot?: number; o: number }> = ({ x, y, s = 1, rot = 0, o }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <g transform={`rotate(${-10 * o})`}>
      <path d="M0,0 L150,-8 L150,4 Z" fill="#c9d0d6" stroke="#8b949b" strokeWidth={2} />
      <ellipse cx={-50} cy={-22} rx={34} ry={22} fill="none" stroke="#B83A55" strokeWidth={14} />
    </g>
    <g transform={`rotate(${10 * o})`}>
      <path d="M0,0 L150,8 L150,-4 Z" fill="#dfe4e8" stroke="#8b949b" strokeWidth={2} />
      <ellipse cx={-50} cy={22} rx={34} ry={22} fill="none" stroke="#B83A55" strokeWidth={14} />
    </g>
    <circle cx={0} cy={0} r={7} fill="#5b625c" />
  </g>
);

// Trailhead sign on two posts (base at x, y).
const Sign: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-120} y={-300} width={20} height={300} fill="#5a4030" />
    <rect x={100} y={-300} width={20} height={300} fill="#5a4030" />
    <rect x={-150} y={-360} width={300} height={110} rx={8} fill="#6b4a2e" />
    <rect x={-140} y={-350} width={280} height={90} rx={6} fill="none" stroke="#e9dcc0" strokeWidth={3} />
    <text x={0} y={-292} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={50} fill="#f3e6cf" letterSpacing={3}>
      TRAILHEAD
    </text>
  </g>
);

// ============ S1 HOOK MEDIUM: December night, Mark at the window, "DAN ?" on the calendar (0 - 4.82) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.03, 1.1, t / 4.82), rot: hh.rot };
  const floorY = 1560;
  const p: HikerProps = { x: 660, y: floorY, scale: 2.4, walk: 0, lean: 0.04, poles: false, handOverride: [30, -40], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={560} y={560} w={420} h={460} sky={NIGHT} uid="a" />
        <Room floorY={floorY} win={[560, 560, 420, 460]} lamp={[200, 600]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <WallCal x={110} y={740} w={320} month="DECEMBER" note="GIFT: DAN ?" noteK={at(t, [1.6, 2.1], [0, 1])} />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...p} outfit={MARK} expression="tired" noPack flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={300} />
      </Plane>
      <Particles seed={1001} n={16} col="#ffe8c0" fall={8} />
      <Grade sunX={300} sunY={600} warm={LAMP} cool="40,40,70" />
      <Title text={"He forgot\na gift for his\nhiking buddy."} t={t} t0={0} top={120} size={112} />
      <Chip text="2 days left" t={t} t0={2.4} x={60} y={600} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: flashback, Dan ahead on the climb waving Mark up (4.82 - 7.33) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.51), rot: hh.rot };
  const g = 1560;
  const tilt = 0.18;
  const ph = t * 5.2;
  const dan: HikerProps = { x: 880, y: g - tilt * (880 - 540), scale: 2.0, walk: 0, lean: 0.02, poles: false, handOverride: [60, -150], slope: -tilt * 0.9, breathe: 0 };
  const mark: HikerProps = { x: 250, y: g - tilt * (250 - 540), scale: 2.2, phase: ph, walk: 0.8, lean: 0.2, poles: true, slope: -tilt * 0.9, breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="b" treeY={g - 300} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} tilt={tilt} />
        <Subject rimX={5}>
          <Person {...dan} outfit={DAN} expression="happy" flip />
          <Person {...mark} outfit={MARK_HIKE} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.24} />
      <Particles seed={1002} n={18} leaves={["#c9662e", "#d9a34a", "#b5553a"]} fall={30} />
      <Grade sunX={790} sunY={560} />
      <Chip text="Dan: his hiking buddy" t={t} t0={5.0} x={60} y={200} big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Mark's face, phone shows the late delivery date (7.33 - 9.26) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.93), rot: hh.rot };
  const s = 4.4;
  const seat = 1560;
  const p: HikerProps = { x: 560, y: seat + 182 * s, scale: s, walk: 0, lean: 0.06, poles: false, handOverride: [60, -40], breathe: Math.sin(t * 2) * 1 };
  const [hx, hy] = headAt(p, true);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={8}>
        <WindowView x={480} y={240} w={620} h={700} sky={NIGHT} uid="c" />
        <Room floorY={1900} win={[480, 240, 620, 700]} lamp={[150, 400]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={MARK} expression="tired" noPack flip />
          {/* phone in his hand, screen glow on the face */}
          <g transform={`translate(${290 + hx * 0},${1250 + hy * 0}) rotate(-8)`}>
            <rect x={-80} y={-150} width={160} height={300} rx={24} fill="#1d1f22" />
            <rect x={-66} y={-130} width={132} height={250} rx={12} fill="#e9eef2" />
            <text x={0} y={-80} textAnchor="middle" fontFamily="Inter" fontWeight={700} fontSize={22} fill="#5b625c">
              Arrives
            </text>
            <text x={0} y={-40} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={42} fill="#B83A55">
              DEC 29
            </text>
          </g>
        </Subject>
      </Plane>
      <Particles seed={1003} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={500} warm={LAMP} cool="40,40,70" vignette={0.6} />
      <Chip text="No time to ship" t={t} t0={7.5} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: Mark at the desk, the planner coming out of the printer (9.26 - 12.03) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.07, lt / 2.77), rot: hh.rot };
  const k = at(t, [9.6, 11.6], [0, 1]);
  const s = 3.2;
  const p: HikerProps = { x: 820, y: 1900, scale: s, walk: 0, lean: 0.12, poles: false, handOverride: [110, 10], breathe: 0 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={8}>
        <WindowView x={360} y={260} w={420} h={480} sky={NIGHT} uid="d" />
        <Room floorY={2000} win={[360, 260, 420, 480]} lamp={[160, 420]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* desk */}
          <rect x={-100} y={1240} width={1300} height={40} fill="#6b4a2e" />
          <rect x={-100} y={1280} width={1300} height={700} fill="#4f3622" />
          <Printer x={90} y={990} w={560} k={k} />
        </Svg>
        <Subject rimX={-4} col="rgba(255,236,200,0.7)">
          <Person {...p} outfit={MARK} expression="happy" noPack flip />
        </Subject>
      </Plane>
      <Particles seed={1004} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.5} />
      <Chip text="Printed at home" t={t} t0={9.4} x={60} y={200} icon="check" big />
      <Chip text="Tonight" t={t} t0={10.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the year page fills in: a hike every month, the Hike-a-Week boxes (12.03 - 16.05) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(0, -60, lt / 4.02), zoom: mix(1.0, 1.06, lt / 4.02), rot: hh.rot };
  const months = at(t, [12.4, 14.2], [0, 1]);
  const filled = Math.floor(at(t, [14.3, 15.6], [0, 6]));
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#6b4a2e" />
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={-200} y={-200 + i * 260} width={1480} height={6} fill="#5c3f27" />
          ))}
        </Svg>
        <Subject rimX={3} col="rgba(255,236,200,0.5)">
          <g transform="rotate(-1.5 540 1100)">
            <YearPage x={160} y={560} w={760} months={months} weekends={months} filled={filled} t={t} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1005} n={8} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.45} />
      <Chip text="A hike every month" t={t} t0={12.4} x={60} y={200} icon="check" big />
      <Chip text="Hike-a-Week Challenge" t={t} t0={14.2} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: he writes their first trail on the gift page, then cuts out a tag (16.05 - 19.71) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.09, lt / 3.66), rot: hh.rot };
  const write = at(t, [16.2, 17.6], [0, 1]);
  const cutK = at(t, [17.9, 19.1], [0, 1]);
  const pageX = 120;
  const pageY = 520;
  const w = 840;
  // pen moves along the line, then scissors move along the first tag
  const penX = pageX + w * (0.1 + 0.8 * write);
  const penY = pageY + w * 0.36;
  const tagY = pageY + w * 1.29 * 0.6;
  const scX = pageX + w * 0.08 + w * 0.38 * cutK;
  const scY = tagY + w * 0.32 + 4;
  const pen = t < 17.75;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#6b4a2e" />
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={-200} y={-200 + i * 260} width={1480} height={6} fill="#5c3f27" />
          ))}
        </Svg>
        <Subject rimX={3} col="rgba(255,236,200,0.6)">
          <GiftPage x={pageX} y={pageY} w={w} write={write} cut={at(t, [19.15, 19.6], [0, 1], outExpo)} />
          {pen ? (
            <g>
              <path d={`M1300,1900 Q${penX + 300},1500 ${penX + 80},${penY - 40}`} stroke={MARK.jacket} strokeWidth={110} fill="none" strokeLinecap="round" />
              <Marker x={penX} y={penY + 20} skin={MARK.skin} />
            </g>
          ) : (
            <g opacity={at(t, [17.75, 17.9], [0, 1])}>
              <path d={`M1300,2000 Q${scX + 360},1700 ${scX + 140},${scY + 30}`} stroke={MARK.jacket} strokeWidth={110} fill="none" strokeLinecap="round" />
              <ellipse cx={scX + 130} cy={scY + 20} rx={56} ry={46} fill={MARK.skin} />
              <Scissors x={scX} y={scY} s={1.1} rot={180} o={Math.abs(Math.sin(t * 9)) * (cutK < 1 ? 1 : 0)} />
            </g>
          )}
        </Subject>
      </Plane>
      <Particles seed={1006} n={8} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.45} />
      <Chip text="Gift page: their first trail" t={t} t0={16.2} x={60} y={200} icon="check" big />
      <Chip text="Cut-out gift tag" t={t} t0={18.0} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: January 1, the two friends at a snowy trailhead (19.71 - 23.0) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: at(lt, [0, 1.3], [1.12, 1.04], outExpo), rot: hh.rot };
  const g = 1600;
  const s = 2.4;
  const mark: HikerProps = { x: 290, y: g, scale: s, walk: 0, lean: 0.02, poles: true, breathe: Math.sin(t * 2) * 1.2 };
  const dan: HikerProps = { x: 790, y: g, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 2 + 1) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <Sign x={560} y={g - 40} s={0.9} />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,210,0.9)">
          <Person {...mark} outfit={MARK_HIKE} expression="happy" />
          <Person {...dan} outfit={DAN_WINTER} expression="happy" flip />
          <Breath p={mark} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.26} />
      <Particles seed={1007} n={20} col="#ffffff" fall={12} />
      <Grade sunX={800} sunY={560} warm="255,236,210" />
      <Readout label="JANUARY 1" value="Trailhead, together" ok={true} t={t} t0={19.9} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/2027-hiking-year-planner.jpg"
      spec="28 PAGES · PRINT AT HOME · NO SHIPPING"
      name={
        <>
          2027 Hiking
          <br />
          Year Planner
        </>
      }
      nameSize={100}
      price="$5.99"
      save="Save this for your gift list"
    />
  );
};

export const V100: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.87} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.82} to={7.38} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.82} />
    </Scene>
    <Scene from={7.33} to={9.31} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={7.33} />
    </Scene>
    <Scene from={9.26} to={12.08} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.26} />
    </Scene>
    <Scene from={12.03} to={16.1} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.03} />
    </Scene>
    <Scene from={16.05} to={19.76} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={16.05} />
    </Scene>
    <Scene from={19.71} to={23.0} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={19.71} />
    </Scene>
    <Scene from={22.85} to={28} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.82, 1560],
        [4.82, 7.33, 1560],
        [7.33, 9.26, 1560],
        [9.26, 12.03, 1560],
        [12.03, 16.05, 1560],
        [16.05, 19.71, 1560],
        [19.71, 22.85, 1560],
      ]}
    />
  </AbsoluteFill>
);
