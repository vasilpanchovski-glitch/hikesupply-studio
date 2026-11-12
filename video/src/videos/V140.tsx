// V140: "Her gift will arrive on December 29." in the cinematic C01 style, home before Christmas + a state park. Story for the
// State Parks Passport & Visit Log (All 50 States + Canada's Provinces, Printable, $5.99, live Shopify; 40 printable pages,
// maps to color in, visit logs with stamp boxes). Facts: it is an instant download, so it can be printed at home the same night.
// The tracking screen is generic (no carrier name or logo). His home state shown is a plain rectangle labelled COLORADO.
// End card = real Shopify cover image (photo card).
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, CLEAR, FALL, GOLD, Subject, Trail } from "../fall";
import { Room, WindowView } from "../home";
import vo from "../vo/v140.json";

const words = vo.words as unknown as Word[];

const COLD: Sky = { top: "#2c3f5c", mid: "#6f86a0", low: "#c9cfd2", sun: [790, 600], sunR: 30, sunCol: "#f4f0e2", glow: "#d9d6c8" };
const LAMP = "255,200,140";
const PAPER = "#f7f2e8";
const INK = "#24302a";
const RED = "#C2333A";
const COVER = "products/state-parks-passport-visit-log.jpg";

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const ELLA: Outfit = {
  ...JAKE,
  skin: "#C98F6B",
  skinShade: "#AB7353",
  hair: "#1f1612",
  ponytail: "#1f1612",
  beard: null,
  cap: "#1f1612",
  capShade: "#140e0b",
  jacket: "#8C3B4A",
  jacketShade: "#6E2D3A",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  glove: null,
};

// Dad: grey beard, green park jacket.
const DAD: Outfit = { ...GUIDE, jacket: "#3F6B55", jacketShade: "#2D5141", cap: "#7a5a3a", capShade: "#5e452c" };
const DAD_HOME: Outfit = { ...DAD, cap: GUIDE.hair, capShade: GUIDE.hair, jacket: "#9b3b33", jacketShade: "#7b2d27" };

// Christmas tree with warm lights (screen coords, base centre).
const XmasTree: React.FC<{ x: number; y: number; h: number; t: number }> = ({ x, y, h, t }) => (
  <g>
    <rect x={x - 70} y={y - 40} width={140} height={70} rx={10} fill="#8a3a2e" />
    <Pine x={x} y={y - 30} h={h} c="#2f5446" c2="#24443a" />
    {Array.from({ length: 22 }, (_, i) => {
      const k = (i % 6) / 6 + 0.06;
      const row = Math.floor(i / 6) + 1;
      const yy = y - 30 - h * (0.12 + row * 0.18);
      const w = h * (0.42 - row * 0.08);
      const xx = x - w + k * w * 2;
      const tw = 0.6 + 0.4 * Math.sin(t * 3 + i * 1.7);
      return <circle key={i} cx={xx} cy={yy + (i % 2) * 14} r={9} fill={i % 3 ? "#ffd27a" : "#ff9a6a"} opacity={tw} />;
    })}
    <path d={`M${x},${y - 30 - h - 30} l12,26 l28,2 l-22,18 l8,28 l-26,-16 l-26,16 l8,-28 l-22,-18 l28,-2 Z`} fill="#ffd27a" />
  </g>
);

// Wrapped gift box (screen coords, base centre).
const Gift: React.FC<{ x: number; y: number; w: number; h: number; col: string; rib?: string; rot?: number }> = ({ x, y, w, h, col, rib = "#f2d27a", rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot})`}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={6} fill={col} />
    <rect x={-w / 2} y={-h} width={w} height={h * 0.18} fill="rgba(255,255,255,0.18)" />
    <rect x={-w * 0.07} y={-h} width={w * 0.14} height={h} fill={rib} />
    <path d={`M0,${-h} q${-w * 0.3},${-h * 0.35} ${-w * 0.25},0 M0,${-h} q${w * 0.3},${-h * 0.35} ${w * 0.25},0`} stroke={rib} strokeWidth={10} fill="none" />
  </g>
);

// Phone with a generic tracking screen (local units, centre).
const TrackPhone: React.FC<{ x: number; y: number; s?: number; rot?: number; k: number }> = ({ x, y, s = 1, rot = 0, k }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-190} y={-380} width={380} height={760} rx={50} fill="#1d2126" />
    <rect x={-170} y={-350} width={340} height={700} rx={30} fill="#f4f5f6" />
    <text x={0} y={-270} textAnchor="middle" fontFamily="Inter" fontWeight={700} fontSize={30} fill="#5b625c">
      Your order
    </text>
    <rect x={-130} y={-230} width={260} height={150} rx={16} fill="#e3e6e8" />
    <Gift x={0} y={-100} w={110} h={90} col="#3E5A4A" />
    <text x={-130} y={-20} fontFamily="Inter" fontWeight={600} fontSize={26} fill="#7b827d">
      Estimated delivery
    </text>
    <text x={-130} y={40} fontFamily="Inter" fontWeight={800} fontSize={50} fill={k > 0.5 ? RED : INK}>
      Dec 29
    </text>
    {/* progress line */}
    <line x1={-130} y1={120} x2={130} y2={120} stroke="#d4d8db" strokeWidth={10} strokeLinecap="round" />
    <line x1={-130} y1={120} x2={-60} y2={120} stroke="#3e7d4f" strokeWidth={10} strokeLinecap="round" />
    {[-130, -43, 43, 130].map((cx, i) => (
      <circle key={i} cx={cx} cy={120} r={14} fill={i === 0 ? "#3e7d4f" : "#d4d8db"} />
    ))}
    <text x={-130} y={190} fontFamily="Inter" fontWeight={600} fontSize={24} fill="#7b827d">
      Christmas is Dec 25
    </text>
    <rect x={-50} y={318} width={100} height={8} rx={4} fill="rgba(0,0,0,0.25)" />
  </g>
);

// Passport page: map to color in, his home state (a rectangle) fills green with k (local units, top-left).
const MapPage: React.FC<{ x: number; y: number; w: number; k: number; rot?: number }> = ({ x, y, w, k, rot = 0 }) => {
  const h = w * 1.29;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <rect x={14} y={18} width={w} height={h} rx={10} fill="rgba(0,0,0,0.28)" />
      <rect x={0} y={0} width={w} height={h} rx={10} fill={PAPER} />
      <text x={w * 0.08} y={h * 0.1} fontFamily="Inter" fontWeight={800} fontSize={w * 0.06} fill={INK} letterSpacing={2}>
        MY STATE PARKS
      </text>
      {/* outline of the state, plain rectangle */}
      <rect x={w * 0.14} y={h * 0.2} width={w * 0.72} height={w * 0.52} fill="none" stroke={INK} strokeWidth={6} />
      <clipPath id="fillclip">
        <rect x={w * 0.14} y={h * 0.2} width={w * 0.72 * k} height={w * 0.52} />
      </clipPath>
      <rect x={w * 0.14 + 3} y={h * 0.2 + 3} width={w * 0.72 - 6} height={w * 0.52 - 6} fill="#5f9a6a" clipPath="url(#fillclip)" />
      <text x={w * 0.5} y={h * 0.2 + w * 0.3} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={w * 0.07} fill={k > 0.6 ? "#ffffff" : INK} letterSpacing={3}>
        COLORADO
      </text>
      {/* visit log lines + stamp box */}
      {[0, 1, 2].map((i) => (
        <line key={i} x1={w * 0.08} y1={h * 0.66 + i * h * 0.08} x2={w * 0.6} y2={h * 0.66 + i * h * 0.08} stroke="#c9c1b2" strokeWidth={4} />
      ))}
      <rect x={w * 0.66} y={h * 0.6} width={w * 0.26} height={w * 0.26} rx={8} fill="none" stroke="#b9b0a0" strokeWidth={4} strokeDasharray="12 10" />
    </g>
  );
};

// Printed page coming out of a home printer (screen coords). out 0..1.
const Printer: React.FC<{ x: number; y: number; out: number }> = ({ x, y, out }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-300} y={-40} width={600} height={60} rx={10} fill="#d9dcdf" />
    <g transform={`translate(0,${-40 - out * 520})`}>
      <rect x={-210} y={0} width={420} height={540} fill={PAPER} />
      <rect x={-170} y={40} width={340} height={30} fill="#3e5f4a" />
      <rect x={-170} y={100} width={340} height={200} fill="none" stroke={INK} strokeWidth={5} />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={-170} y1={350 + i * 50} x2={120} y2={350 + i * 50} stroke="#c9c1b2" strokeWidth={4} />
      ))}
    </g>
    <rect x={-340} y={0} width={680} height={260} rx={30} fill="#eef0f2" />
    <rect x={-340} y={0} width={680} height={60} rx={20} fill="#ffffff" />
    <rect x={-260} y={20} width={520} height={14} rx={7} fill="#9aa1a6" />
    <circle cx={260} cy={150} r={14} fill="#3e7d4f" />
  </g>
);

// ============ S1 HOOK MEDIUM: Ella at home a week before Christmas, phone in hand (0 - 3.89) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.03, 1.1, t / 3.89), rot: hh.rot };
  const floorY = 1560;
  const p: HikerProps = { x: 560, y: floorY, scale: 2.4, walk: 0, lean: 0.06, poles: false, handOverride: [44, -40], breathe: Math.sin(t * 2) * 1.2 };
  const g = hikerGeometry(p);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={620} y={520} w={400} h={460} sky={COLD} uid="a" />
        <Room floorY={floorY} win={[620, 520, 400, 460]} lamp={[200, 600]} />
      </Plane>
      <Plane cam={cam} depth={0.9} blur={3}>
        <Svg>
          <XmasTree x={180} y={floorY - 10} h={620} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...p} outfit={ELLA} expression={t > 2.0 ? "tired" : "neutral"} noPack />
          <g transform={hikerTransform(p)}>
            <rect x={g.arms[1].hand[0] - 6} y={g.arms[1].hand[1] - 40} width={30} height={56} rx={6} fill="#1d2126" transform={`rotate(-20,${g.arms[1].hand[0]},${g.arms[1].hand[1]})`} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" />
      </Plane>
      <Particles seed={1401} n={14} col="#ffe8c0" fall={8} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm={LAMP} cool="40,40,60" />
      <Title text={"Her gift will\narrive on\nDecember 29."} t={t} t0={0} top={110} size={124} />
      <Chip text="Ordered Dec 18" t={t} t0={1.6} x={60} y={640} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the tracking screen says Dec 29 (3.89 - 6.74) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 2.85), rot: hh.rot };
  const red = at(t, [5.0, 5.3], [0, 1]);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={16}>
        <Room floorY={2400} win={[-300, 300, 200, 300]} lamp={[300, 600]} />
        <Svg>
          <XmasTree x={860} y={1700} h={900} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,236,200,0.8)">
          <TrackPhone x={540} y={1020} s={1.45} rot={-4} k={red} />
          <path d={`M300,1700 Q330,1540 400,1480 L520,1440 Q560,1450 540,1500 L470,1560 Q440,1640 460,1800 Z`} fill={ELLA.skin} />
        </Subject>
      </Plane>
      <Particles seed={1402} n={12} col="#ffe8c0" fall={6} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm={LAMP} vignette={0.55} />
      <Chip text="After Christmas" t={t} t0={5.3} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: Dad hikes a different state park every month (6.74 - 11.11) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 20, y: hh.y, zoom: mix(1.0, 1.07, lt / 4.37), rot: hh.rot };
  const g = 1480;
  const ph = t * 2.4;
  const p: HikerProps = { x: 300 + lt * 80, y: g + 30, scale: 1.5, phase: ph, walk: 0.6, lean: 0.06, poles: true, breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="c" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          {/* plain wooden park sign */}
          <g transform={`translate(840,${g + 10})`}>
            <rect x={-12} y={-260} width={24} height={260} fill="#5a3e28" />
            <rect x={-170} y={-330} width={340} height={130} rx={12} fill="#6b4a30" />
            <rect x={-156} y={-316} width={312} height={102} rx={8} fill="none" stroke="#e8d9b8" strokeWidth={4} />
            <text x={0} y={-252} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={40} fill="#f2e6c8" letterSpacing={4}>
              STATE PARK
            </text>
          </g>
        </Svg>
        <Subject rimX={5}>
          <Person {...p} outfit={DAD} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2e2618" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.3} />
      <Particles seed={1403} n={16} leaves={FALL} fall={40} />
      <LowScrim />
      <Grade sunX={790} sunY={560} warm="255,224,180" />
      <Chip text="A new park every month" t={t} t0={7.0} x={60} y={200} icon="check" big />
      <Chip text="Never writes it down" t={t} t0={9.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the fix: a printable state parks passport (11.11 - 14.28) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 8, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.17), rot: hh.rot };
  const show = at(t, [12.3, 12.8], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.7} blur={10}>
        <Room floorY={2000} win={[-300, 300, 200, 300]} lamp={[200, 400]} />
        <Svg>
          <XmasTree x={900} y={1500} h={760} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* laptop */}
          <rect x={120} y={600} width={840} height={600} rx={26} fill="#2a2e33" />
          <rect x={150} y={630} width={780} height={540} rx={10} fill="#e9ecee" />
          <path d="M60,1200 L1020,1200 L1080,1270 L0,1270 Z" fill="#c9ced2" />
          <rect x={460} y={1210} width={160} height={14} rx={7} fill="#9aa1a6" />
        </Svg>
        <div style={{ position: "absolute", left: 540 - 190, top: 650, width: 380, height: 492, opacity: show, transform: `scale(${mix(0.9, 1, show)})`, boxShadow: "0 12px 30px rgba(0,0,0,0.35)" }}>
          <Img src={staticFile(COVER)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <Svg>
          {/* download arrow */}
          <g opacity={at(t, [13.3, 13.6], [0, 1])} transform="translate(840,1060)">
            <circle r={56} fill="#3e7d4f" />
            <path d="M0,-28 L0,20 M-20,2 L0,22 L20,2 M-24,30 L24,30" stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </Svg>
      </Plane>
      <Particles seed={1404} n={12} col="#ffe8c0" fall={6} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm={LAMP} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={12.2} top={200} size={124} />
      <Chip text="Printable passport" t={t} t0={12.4} x={60} y={200} icon="check" big />
      <Chip text="Instant download" t={t} t0={13.4} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: print it tonight, write his first park day (14.28 - 18.63) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 4.35), rot: hh.rot };
  const out = at(t, [14.6, 16.0], [0, 1]);
  const write = at(t, [16.8, 18.2], [0, 1]);
  const pen: [number, number] = [380 + write * 300 + Math.sin(t * 20) * 8 * (write > 0 && write < 1 ? 1 : 0), 1280];
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={16}>
        <Room floorY={2400} win={[700, 200, 300, 300]} lamp={[300, 600]} wall="#cdb894" />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={1400} width={1480} height={1000} fill="#6e4c34" />
          <g opacity={1 - at(t, [16.4, 16.7], [0, 1])}>
            <Printer x={540} y={1300} out={out} />
          </g>
          <g opacity={at(t, [16.4, 16.7], [0, 1])}>
            <rect x={150} y={760} width={780} height={760} rx={10} fill={PAPER} />
            <text x={210} y={860} fontFamily="Inter" fontWeight={800} fontSize={44} fill={INK} letterSpacing={2}>
              PARK VISIT LOG
            </text>
            <line x1={210} y1={1000} x2={860} y2={1000} stroke="#c9c1b2" strokeWidth={4} />
            <line x1={210} y1={1300} x2={860} y2={1300} stroke="#c9c1b2" strokeWidth={4} />
            <line x1={210} y1={1420} x2={860} y2={1420} stroke="#c9c1b2" strokeWidth={4} />
            <text x={210} y={980} fontFamily="Inter" fontWeight={600} fontSize={34} fill="#8a8172">
              Park
            </text>
            <clipPath id="writeclip">
              <rect x={370} y={1180} width={write * 320} height={140} />
            </clipPath>
            <text x={380} y={1280} fontFamily="Caveat, cursive" fontStyle="italic" fontWeight={700} fontSize={84} fill="#2f4f8a" clipPath="url(#writeclip)">
              Park day 1
            </text>
          </g>
        </Svg>
        <Subject rimX={4} col="rgba(255,236,200,0.8)">
          <g opacity={at(t, [16.6, 16.8], [0, 1])}>
            <path d={`M${pen[0]},${pen[1]} L${pen[0] + 26},${pen[1] - 18} L${pen[0] + 200},${pen[1] - 260} L${pen[0] + 170},${pen[1] - 282} L${pen[0] + 4},${pen[1] - 30} Z`} fill="#2b2f36" />
            <path d={`M${pen[0] + 90},${pen[1] - 120} Q${pen[0] + 200},${pen[1] - 90} ${pen[0] + 340},${pen[1] - 40} L${pen[0] + 400},${pen[1] - 240} Q${pen[0] + 260},${pen[1] - 300} ${pen[0] + 150},${pen[1] - 230} Z`} fill={ELLA.skin} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1405} n={10} col="#ffe8c0" fall={6} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm={LAMP} vignette={0.55} />
      <Chip text="Download tonight" t={t} t0={14.4} x={60} y={200} icon="check" big />
      <Chip text="Print at home" t={t} t0={15.5} x={60} y={330} icon="check" big />
      <Chip text="Write his first park day" t={t} t0={17.0} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 PAYOFF MEDIUM: Christmas morning, he colors in his home state (18.63 - 21.79) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const floorY = 1640;
  const color = at(t, [19.6, 21.0], [0, 1]);
  const p: HikerProps = { x: 300, y: floorY, scale: 2.3, walk: 0, lean: 0.12, poles: false, handOverride: [100 + Math.sin(t * 10) * 6 * (color > 0 && color < 1 ? 1 : 0), -10], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={3}>
        <WindowView x={560} y={360} w={420} h={480} sky={GOLD} uid="f" />
        <Room floorY={floorY} win={[560, 360, 420, 480]} lamp={[900, 520]} />
        <Svg>
          <XmasTree x={880} y={floorY - 10} h={640} t={t} />
          <Gift x={760} y={floorY + 10} w={150} h={120} col="#3E5A4A" />
          <Gift x={960} y={floorY + 20} w={120} h={90} col={RED} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={DAD_HOME} expression="happy" noPack />
        </Subject>
        <Svg>
          <MapPage x={430} y={1060} w={360} k={color} rot={-6} />
        </Svg>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1] - 100} strength={0.35} />
      <Particles seed={1406} n={18} col="#ffe8c0" fall={6} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,214,160" />
      <Readout label="CHRISTMAS MORNING" value="On time" ok={true} t={t} t0={18.8} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S7: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo={COVER}
      photoH={800}
      spec="40 PRINTABLE PAGES · 50 STATES + CANADA"
      name={
        <>
          State Parks
          <br />
          Passport
        </>
      }
      nameSize={104}
      price="$5.99"
      save="Save this for your last-minute gift list"
    />
  );
};

export const V140: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.94} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.89} to={6.79} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.89} />
    </Scene>
    <Scene from={6.74} to={11.16} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.74} />
    </Scene>
    <Scene from={11.11} to={14.33} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={11.11} />
    </Scene>
    <Scene from={14.28} to={18.68} fadeIn={0.08} fadeOut={0.1}>
      <S5 off={14.28} />
    </Scene>
    <Scene from={18.63} to={21.84} fadeIn={0.12} fadeOut={0.12}>
      <S6 off={18.63} />
    </Scene>
    <Scene from={21.6} to={27} fadeOut={0}>
      <S7 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.89, 1600],
        [3.89, 6.74, 1660],
        [6.74, 11.11, 1600],
        [11.11, 14.28, 1600],
        [14.28, 18.63, 1660],
        [18.63, 21.6, 1600],
      ]}
    />
  </AbsoluteFill>
);
