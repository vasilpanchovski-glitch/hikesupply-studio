// V69: "She packed for the desert. Bryce was ice." in the cinematic C01 style, Bryce Canyon in early winter.
// Facts as NPS Bryce Canyon gives them (nps.gov/brca/planyourvisit/winter.htm): rim about 8,000 ft, trails can be packed and icy after snow,
// traction over winter footwear, trail closures listed in the park alerts. End card = Utah's Mighty 5 Trip Pack (digital).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v69.json";

const words = vo.words as unknown as Word[];

const WINTER: Sky = { top: "#3f6e9c", mid: "#a9c3d8", low: "#f1ece4", sun: [800, 560], sunR: 46, sunCol: "#fffdf2", glow: "#f6e8d2" };
const COLD: Sky = { top: "#56677a", mid: "#9aa8b3", low: "#dfe0e0", sun: [820, 520], sunR: 34, sunCol: "#f4f4ee", glow: "#dde0e0" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 640], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

// Desert outfit: light shirt, sun cap, white sneakers.
const DANA: Outfit = {
  ...GUIDE,
  skin: "#D9A07F",
  skinShade: "#BC8463",
  hair: "#6a3a22",
  ponytail: "#6a3a22",
  beard: null,
  cap: "#E8DCC0",
  capShade: "#C9BB9C",
  jacket: "#E3C98F",
  jacketShade: "#C7AC72",
  pants: "#8A7B66",
  pantsShade: "#6E614F",
  boot: "#EDEDED",
  sole: "#9a9a9a",
  pack: "#2F7F86",
  packShade: "#256870",
  glove: null,
};
// Winter-ready: warm jacket, beanie, boots.
const DANA_W: Outfit = { ...DANA, jacket: "#B83A55", jacketShade: "#8E2B42", cap: "#2C3B2E", capShade: "#1B2620", pants: "#3f444b", pantsShade: "#2e3238", boot: "#5a3e2a", sole: "#1d1916", glove: "#2C3B2E" };

const SNOW = "#f3f6f8";
const ROCK = ["#d9774a", "#c9643a", "#e08a5a", "#b8552f"];

// One hoodoo spire with bands and a snow cap. (x, y) = base centre.
const Hoodoo: React.FC<{ x: number; y: number; h: number; w: number; i: number; haze?: number }> = ({ x, y, h, w, i, haze = 0 }) => {
  const c = ROCK[i % 4];
  const wob = (k: number) => Math.sin(i * 1.7 + k * 5) * w * 0.12;
  const pts = [0, 0.2, 0.4, 0.6, 0.8, 1].map((k) => [(w / 2) * (1 - 0.3 * k) + wob(k) * 0.5 - (k === 0.6 ? w * 0.08 : 0), -h * k]);
  const right = pts.map(([px, py]) => `L${x + px},${y + py}`).join(" ");
  const left = [...pts].reverse().map(([px, py], k) => `L${x - px + wob(k + 3)},${y + py}`).join(" ");
  return (
    <g opacity={1 - haze * 0.5}>
      <path d={`M${x - w / 2},${y} ${right} ${left} Z`} fill={c} />
      <path d={`M${x - w / 2},${y} L${x - w * 0.15},${y} L${x - w * 0.2},${y - h} L${x - w * 0.42},${y - h} Z`} fill="rgba(0,0,0,0.12)" />
      {[0.3, 0.55, 0.78].map((k) => (
        <rect key={k} x={x - w / 2 - 4} y={y - h * k} width={w + 8} height={h * 0.05} fill="rgba(255,240,220,0.3)" />
      ))}
      <ellipse cx={x} cy={y - h - 4} rx={w * 0.48} ry={w * 0.2} fill={SNOW} />
      <ellipse cx={x - w * 0.1} cy={y - h * 0.55} rx={w * 0.3} ry={w * 0.06} fill={SNOW} opacity={0.8} />
      {haze > 0 && <path d={`M${x - w / 2},${y} ${right} ${left} Z`} fill="#dfe6ee" opacity={haze * 0.5} />}
    </g>
  );
};

const HoodooRow: React.FC<{ y: number; n: number; h: number; w: number; seed: number; shift: number; haze?: number }> = ({ y, n, h, w, seed, shift, haze }) => (
  <Svg>
    <rect x={-400} y={y - 10} width={1880} height={1400} fill={haze ? "#d8b7a0" : "#c9906c"} />
    {Array.from({ length: n }, (_, k) => {
      const span = 1700;
      const xx = ((((-200 + k * (span / n) - shift) % span) + span) % span) - 300;
      const hh = h * (0.7 + ((k * 37 + seed) % 10) / 20);
      return <Hoodoo key={k} x={xx} y={y + ((k * 13) % 3) * 12} h={hh} w={w * (0.8 + ((k * 7) % 5) / 10)} i={k + seed} haze={haze} />;
    })}
  </Svg>
);

const SnowPines: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 7 }, (_, i) => {
      const x = ((((-100 + i * 260 - shift) % 1820) + 1820) % 1820) - 300;
      const h = 420 + (i % 3) * 80;
      return (
        <g key={i}>
          <Pine x={x} y={y + (i % 2) * 20} h={h} c="#2f5446" c2="#24443a" />
          {[0, 1, 2].map((k) => {
            const w = h * (0.38 - k * 0.09);
            const ty = y - h * 0.15 - k * h * 0.24;
            return <path key={k} d={`M${x - w * 0.8},${ty - 4} Q${x - w * 0.2},${ty - h * 0.06} ${x + w * 0.3},${ty - 6} L${x + w * 0.1},${ty} Z`} fill={SNOW} opacity={0.9} />;
          })}
        </g>
      );
    })}
  </Svg>
);

// Sky, snowy far ridge, then the hoodoo amphitheater in three depths, rim pines.
const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; y: number; blur?: number; t: number; pines?: boolean }> = ({ cam, sky, uid, y, blur = 0, t, pines = true }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#ffffff" seed={7} drift={t * 12} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.12} blur={2.5 + blur}>
      <Ridge seed={17} base={y - 420} amp={260} scale={260} col="#b9c3cf" lit="#ffffff" peak={80} />
    </Plane>
    <Haze y={y - 520} h={360} col={sky.low} opacity={0.7} />
    <Plane cam={cam} depth={0.22} blur={2 + blur}>
      <HoodooRow y={y - 230} n={16} h={190} w={46} seed={3} shift={cam.x * 0.1} haze={1} />
    </Plane>
    <Haze y={y - 300} h={220} col={sky.low} opacity={0.4} />
    <Plane cam={cam} depth={0.36} blur={1.3 + blur}>
      <HoodooRow y={y - 90} n={11} h={300} w={70} seed={11} shift={cam.x * 0.18} />
    </Plane>
    {pines && (
      <Plane cam={cam} depth={0.6} blur={0.9 + blur}>
        <SnowPines y={y + 20} shift={cam.x * 0.25} />
      </Plane>
    )}
  </>
);

// Snowy rim trail with a glossy packed-ice strip. tilt > 0 rises to the right.
const IceTrail: React.FC<{ y: number; tilt?: number; ice?: number }> = ({ y, tilt = 0, ice = 1 }) => {
  const Y = (x: number) => y - tilt * (x - 540);
  return (
    <Svg>
      <path d={`M-400,${Y(-400) - 40} L1480,${Y(1480) - 40} L1480,2600 L-400,2600 Z`} fill="#e9eef1" />
      <path d={`M-400,${Y(-400) - 4} L1480,${Y(1480) - 4} L1480,${Y(1480) + 70} L-400,${Y(-400) + 70} Z`} fill="#c9d6de" />
      <path d={`M-400,${Y(-400) + 6} L1480,${Y(1480) + 6} L1480,${Y(1480) + 40} L-400,${Y(-400) + 40} Z`} fill="#a9c4d6" opacity={0.8 * ice} />
      {Array.from({ length: 8 }, (_, i) => {
        const x = -300 + i * 230;
        return <path key={i} d={`M${x},${Y(x) + 14} l70,-6`} stroke="#ffffff" strokeWidth={6} strokeLinecap="round" opacity={0.8 * ice} />;
      })}
      <path d={`M-400,${Y(-400) + 70} L1480,${Y(1480) + 70} L1480,2600 L-400,2600 Z`} fill="#b7c3cc" />
      {Array.from({ length: 10 }, (_, i) => (
        <ellipse key={`s${i}`} cx={-260 + i * 190} cy={Y(-260 + i * 190) + 160 + (i % 3) * 70} rx={80} ry={10} fill="#a3b1bb" />
      ))}
    </Svg>
  );
};

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

const Breath: React.FC<{ p: HikerProps; t: number }> = ({ p, t }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const k = (t * 0.7) % 1;
  return (
    <g transform={hikerTransform(p)}>
      <circle cx={hx + 50 + k * 60} cy={hy + 12 - k * 20} r={7 + k * 18} fill="#f2f4f6" opacity={0.4 * (1 - k)} />
    </g>
  );
};

// Traction spikes under both boots (local units, drawn with the hiker transform).
const Spikes: React.FC<{ p: HikerProps }> = ({ p }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)}>
      {g.legs.map((l, i) => (
        <g key={i}>
          <path d={`M${l.foot[0] - 18},${l.foot[1] + 2} ${[0, 1, 2, 3, 4].map((k) => `l5,7 l6,-7`).join(" ")}`} stroke="#3a3f44" strokeWidth={3} fill="none" />
          <path d={`M${l.foot[0] - 16},${l.foot[1] - 16} L${l.foot[0] + 24},${l.foot[1] - 8}`} stroke="#B83A55" strokeWidth={4} />
        </g>
      ))}
    </g>
  );
};

// Slide streaks behind sliding feet.
const Slide: React.FC<{ p: HikerProps; k: number }> = ({ p, k }) => {
  const g = hikerGeometry(p);
  const f = g.legs[0].foot;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      {[0, 1, 2].map((i) => (
        <line key={i} x1={f[0] - 30 - i * 10} y1={f[1] - 4 - i * 8} x2={f[0] - 90 - i * 20} y2={f[1] - 4 - i * 8} stroke="#ffffff" strokeWidth={4} strokeLinecap="round" />
      ))}
    </g>
  );
};

// ============ S1 HOOK: slipping on an icy switchback, hoodoos behind (0 - 3.57) ============
const S1: React.FC = () => {
  const t = useT();
  const shake = at(t, [0.4, 0.55, 1.1], [0, 1, 0]) + at(t, [2.2, 2.35, 2.8], [0, 0.6, 0]);
  const hh = handheld(t, 0.8, shake);
  const cam: Cam = { x: t * 16 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, t / 3.57), rot: hh.rot - 1.5 };
  const g = 1380;
  const wob = Math.sin(t * 7) * 0.08;
  const p: HikerProps = { x: 470 - t * 12, y: g + 182 * 2.2 - 140, scale: 2.2, phase: 1.2 + Math.sin(t * 5) * 0.4, walk: 0.7, lean: -0.22 + wob, poles: false, handOverride: [120, -110], slope: 0.12 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="a" y={g - 40} blur={2} t={t} pines={false} />
      <Plane cam={cam} depth={1}>
        <IceTrail y={g + 40} tilt={0.12} />
        <Subject rimX={-4}>
          <Person {...p} outfit={DANA} expression="tired" />
          <Slide p={p} k={0.8} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24443a" side="right" />
      </Plane>
      <Particles seed={91} n={30} col="#ffffff" fall={60} />
      <Grade sunX={820} sunY={520} warm="230,230,235" cool="40,60,90" />
      <Title text={"She packed for\nthe desert.\nBryce was ice."} t={t} t0={0} top={140} size={124} />
      <Chip text="Sneakers on ice" t={t} t0={0.4} x={80} y={620} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: Bryce Canyon under snow (3.57 - 5.32) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: lt * 40 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.75), rot: hh.rot };
  const g = 1520;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINTER} uid="b" y={g - 120} t={t} pines={false} />
      <Plane cam={cam} depth={0.7}>
        <HoodooRow y={g + 80} n={7} h={560} w={120} seed={21} shift={cam.x * 0.3} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <IceTrail y={g + 180} ice={0.3} />
        <Subject>
          <Person x={220} y={g + 160} scale={1.1} walk={0} lean={0.02} poles={false} handOverride={[40, 20]} outfit={DANA} expression="neutral" />
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.16} />
      <Particles seed={92} n={22} col="#ffffff" fall={40} />
      <Grade sunX={800} sunY={560} warm="250,240,225" />
      <Chip text="Bryce Canyon, Utah" t={t} t0={3.7} x={80} y={240} big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: the rim is high and cold (5.32 - 7.4) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 20 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.1), rot: hh.rot };
  const g = 1420;
  const p: HikerProps = { x: 640, y: g + 182 * 2.4 - 150, scale: 2.4, walk: 0, lean: 0.06, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 3) * 3 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="c" y={g - 60} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <IceTrail y={g + 40} ice={0.2} />
        <Subject rimX={5}>
          <Person {...p} outfit={DANA} expression="neutral" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={93} n={34} col="#ffffff" fall={70} />
      <Grade sunX={820} sunY={520} warm="230,230,235" cool="40,60,90" />
      <Readout label="BRYCE CANYON RIM" value="ABOUT 8,000 FT" ok={null} t={t} t0={5.45} x={80} y={220} pulseAt={6.0} />
      <Chip text="About 2,400 m" t={t} t0={6.2} x={80} y={470} />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: packed snow turns to ice (7.4 - 10.42) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 3), rot: hh.rot };
  const k = at(t, [7.8, 9.4], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="d" y={900} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={880} width={1880} height={1400} fill="#e9eef1" />
          <path d="M-400,1000 Q540,960 1480,1010 L1480,1900 L-400,1900 Z" fill="#d3dee5" />
          {/* footprints packing down */}
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse key={i} cx={-100 + i * 180} cy={1200 + (i % 2) * 220} rx={60} ry={26} fill="#bfccd5" />
          ))}
          {/* ice glaze spreading */}
          <path d={`M-400,1060 Q540,1020 1480,1070 L1480,${1060 + 820 * k} Q540,${1020 + 820 * k} -400,${1060 + 820 * k} Z`} fill="#9fbfd4" opacity={0.75} />
          {Array.from({ length: 7 }, (_, i) => (
            <path key={`g${i}`} d={`M${-50 + i * 170},${1150 + (i % 3) * 180} l120,-24`} stroke="#ffffff" strokeWidth={10} strokeLinecap="round" opacity={k * 0.9} />
          ))}
        </Svg>
      </Plane>
      <Grade sunX={820} sunY={520} warm="230,230,235" cool="40,60,90" vignette={0.55} />
      <Chip text="After snow" t={t} t0={7.5} x={80} y={240} />
      <Chip text="Trails pack into ice" t={t} t0={8.3} x={80} y={350} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: sneakers slide on the switchback (10.42 - 12.8) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [11.0, 11.15, 11.7], [0, 1, 0]);
  const hh = handheld(t, 0.6, shake);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.4), rot: hh.rot - 2 };
  const g = 1520;
  const sl = at(t, [10.9, 11.4], [0, 1], outExpo);
  const p: HikerProps = { x: 520 + sl * 120, y: g, scale: 5.2, phase: mix(0.3, 1.6, sl), walk: 1, lean: mix(0.05, -0.25, sl), poles: false, handOverride: [130, -100] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="e" y={1000} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <IceTrail y={g + 10} tilt={0.14} />
        <Subject rimX={6}>
          <Person {...p} outfit={DANA} expression="tired" />
          <Slide p={p} k={sl} />
        </Subject>
      </Plane>
      <Particles seed={95} n={20} col="#ffffff" fall={60} />
      <Grade sunX={820} sunY={520} warm="230,230,235" cool="40,60,90" vignette={0.6} />
      <Chip text="Sneakers" t={t} t0={10.5} x={80} y={240} icon="x" big />
      <Chip text="First switchback" t={t} t0={11.1} x={80} y={370} />
    </AbsoluteFill>
  );
};

// ============ S6 FIX title (12.8 - 15.05) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 14 + hh.x, y: at(lt, [0, 2.2], [-90, 0]) + hh.y, zoom: at(lt, [0, 2.2], [1.14, 1.03]), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 680, y: g + 40, scale: 1.55, walk: 0, lean: 0.04, poles: false, handOverride: [40, 10], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINTER} uid="f" y={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <IceTrail y={g + 30} ice={0.4} />
        <Subject>
          <Person {...p} outfit={DANA_W} expression="happy" />
          <Spikes p={p} />
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} />
      <Particles seed={96} n={20} col="#ffffff" fall={30} />
      <Grade sunX={800} sunY={560} warm="250,240,225" />
      <Title text={"Pack layers\nand traction."} t={t} t0={off + 0.15} top={180} size={150} />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: traction straps over the boot (15.05 - 17.3) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.25), rot: hh.rot };
  const k = at(t, [15.2, 16.0], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINTER} uid="g" y={1000} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={1200} width={1880} height={900} fill="#e9eef1" />
          <ellipse cx={560} cy={1330} rx={430} ry={40} fill="rgba(0,0,0,0.18)" />
          {/* leg and boot, side view */}
          <path d="M300,560 Q380,520 470,560 L500,1090 L280,1090 Z" fill={DANA_W.pants} />
          <path d="M330,640 Q360,800 330,960" stroke={DANA_W.pantsShade} strokeWidth={10} fill="none" />
          <path d="M240,1060 L520,1060 Q560,1120 700,1160 Q840,1190 850,1260 L850,1300 L220,1300 Z" fill={DANA_W.boot} stroke="rgba(0,0,0,0.3)" strokeWidth={4} />
          <path d="M300,1080 L500,1080" stroke="#c9b48e" strokeWidth={10} />
          <rect x={210} y={1290} width={650} height={34} rx={14} fill={DANA_W.sole} />
          {/* traction: rubber harness + chain and spikes, slides on */}
          <g transform={`translate(${(1 - k) * 700},${(1 - k) * 60})`} opacity={k}>
            <path d="M200,1250 Q190,1130 300,1100 M860,1280 Q900,1200 820,1170" stroke="#B83A55" strokeWidth={22} fill="none" strokeLinecap="round" />
            <path d="M200,1300 L870,1300" stroke="#B83A55" strokeWidth={18} />
            <path d={`M230,1324 ${Array.from({ length: 12 }, () => "l24,30 l26,-30").join(" ")}`} stroke="#3a3f44" strokeWidth={8} fill="none" strokeLinejoin="round" />
          </g>
        </Svg>
      </Plane>
      <Particles seed={97} n={18} col="#ffffff" fall={30} />
      <Grade sunX={800} sunY={560} warm="250,240,225" vignette={0.5} />
      <Chip text="Warm layers" t={t} t0={15.1} x={80} y={220} icon="check" big />
      <Chip text="Traction over your boots" t={t} t0={15.7} x={80} y={350} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: check the park alerts that morning (17.3 - 20.3) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 3), rot: hh.rot };
  const row = (i: number) => at(t, [17.7 + i * 0.4, 18.0 + i * 0.4], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINTER} uid="h" y={1100} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <ellipse cx={300} cy={1240} rx={110} ry={150} fill={DANA_W.glove ?? DANA.skin} stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
          <ellipse cx={780} cy={1240} rx={110} ry={150} fill={DANA_W.glove ?? DANA.skin} stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
          <rect x={290} y={500} width={500} height={900} rx={56} fill="#1d2226" />
          <rect x={310} y={520} width={460} height={860} rx={40} fill="#f4f1ea" />
          <rect x={310} y={520} width={460} height={130} rx={40} fill="#2C3B2E" />
          <rect x={310} y={600} width={460} height={50} fill="#2C3B2E" />
          <text x={540} y={612} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={52} fill="#fff" letterSpacing={2}>
            PARK ALERTS
          </text>
          {[0, 1, 2].map((i) => (
            <g key={i} opacity={row(i)}>
              <rect x={340} y={690 + i * 150} width={400} height={120} rx={18} fill={i === 0 ? "#fbe3dc" : "#e9ece6"} />
              <circle cx={390} cy={750 + i * 150} r={18} fill={i === 0 ? "#c9443a" : "#8a9488"} />
              <rect x={430} y={724 + i * 150} width={260} height={18} rx={9} fill="#3b4440" opacity={0.8} />
              <rect x={430} y={760 + i * 150} width={190} height={14} rx={7} fill="#3b4440" opacity={0.4} />
            </g>
          ))}
          <ellipse cx={360} cy={1350} rx={60} ry={40} fill="#1B2620" />
          <ellipse cx={720} cy={1350} rx={60} ry={40} fill="#1B2620" />
        </Svg>
      </Plane>
      <Grade sunX={800} sunY={560} warm="250,240,225" vignette={0.5} />
      <Chip text="Check park alerts" t={t} t0={17.4} x={80} y={220} icon="check" big />
      <Chip text="Closed trails, that morning" t={t} t0={18.2} x={80} y={350} />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF: steady among the hoodoos under snow (20.3 - 22.95) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 36 + hh.x, y: -lt * 8 + hh.y, zoom: at(lt, [0, 1.4], [1.16, 1.05], outExpo), rot: hh.rot };
  const g = 1440;
  const ph = lt * 3.4;
  const p: HikerProps = { x: 360 + lt * 50, y: g + 182 * 2.2 - 140, scale: 2.2, phase: ph, walk: 0.8, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.8), slope: 0.06 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="i" y={g - 50} t={t} pines={false} />
      <Plane cam={cam} depth={1}>
        <IceTrail y={g + 40} tilt={0.06} ice={0.4} />
        <Subject rimX={6}>
          <Person {...p} outfit={DANA_W} expression="happy" />
          <Spikes p={p} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={99} n={30} col="#ffffff" fall={30} />
      <Grade sunX={740} sunY={660} warm="255,190,120" />
      <Chip text="Same trail. Steady." t={t} t0={20.4} x={80} y={240} icon="check" big />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/utahs-mighty-5-trip-pack-card.jpg"
      photoH={760}
      spec="PLANNING GUIDE + 10 GPX DAY HIKES"
      name={
        <>
          Utah&apos;s Mighty 5
          <br />
          Trip Pack
        </>
      }
      nameSize={104}
      price="$19.99"
      save="Save this before your Utah trip"
    />
  );
};

export const V69: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.62} fadeIn={0} fadeOut={0.1}>
      <S1 />
    </Scene>
    <Scene from={3.57} to={5.37} fadeIn={0.08} fadeOut={0.08}>
      <S2 off={3.57} />
    </Scene>
    <Scene from={5.32} to={7.45} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.32} />
    </Scene>
    <Scene from={7.4} to={10.47} fadeIn={0.08} fadeOut={0.1}>
      <S4 off={7.4} />
    </Scene>
    <Scene from={10.42} to={12.85} fadeIn={0.08} fadeOut={0.1}>
      <S5 off={10.42} />
    </Scene>
    <Scene from={12.8} to={15.1} fadeIn={0.12} fadeOut={0.1}>
      <S6 off={12.8} />
    </Scene>
    <Scene from={15.05} to={17.35} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={15.05} />
    </Scene>
    <Scene from={17.3} to={20.35} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={17.3} />
    </Scene>
    <Scene from={20.3} to={23.0} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={20.3} />
    </Scene>
    <Scene from={22.75} to={27.5} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.59, 1560],
        [3.59, 5.34, 1560],
        [5.34, 7.42, 1560],
        [7.42, 10.44, 1560],
        [10.44, 12.82, 1560],
        [12.82, 17.1, 1560],
        [17.1, 20.32, 1560],
        [20.32, 22.75, 1560],
      ]}
    />
  </AbsoluteFill>
);
