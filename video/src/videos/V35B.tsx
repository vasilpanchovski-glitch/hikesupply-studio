// V35B: v35 "Zion at 10 am: the shuttle fix" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v35b.json";

const words = vo.words as unknown as Word[];

const NOON: Sky = { top: "#2f6aa8", mid: "#8fb8dc", low: "#f2e2c8", sun: [820, 380], sunR: 44, sunCol: "#fffbe8", glow: "#fff0c8" };
const HOT: Sky = { top: "#3a6ea6", mid: "#a6c4dd", low: "#f6dcb8", sun: [880, 420], sunR: 46, sunCol: "#fffbe8", glow: "#ffe7bd" };
const DAWN: Sky = { top: "#45608e", mid: "#d79c86", low: "#ffd7a4", sun: [300, 980], sunR: 56, sunCol: "#fff2d0", glow: "#ffbf80" };
const GOLD: Sky = { top: "#4a6c98", mid: "#e9b487", low: "#ffdcaa", sun: [760, 760], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const DAN: Outfit = {
  ...JAKE,
  hair: "#2e2620",
  beard: "#3a2e26",
  cap: "#B5553A",
  capShade: "#8E3F2A",
  jacket: "#6f8aa0",
  jacketShade: "#566f84",
  pants: "#8a7a5e",
  pantsShade: "#6d604a",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};
const RIDER_A: Outfit = { ...GUIDE, jacket: "#C9A23E", jacketShade: "#a5832c" };
const RIDER_B: Outfit = { ...JAKE, skin: "#8d5a3e", skinShade: "#734631", beard: null, hair: "#1d1612", jacket: "#9b3d3d", jacketShade: "#7c2f2f", cap: "#2F3B45", capShade: "#222c34" };

// Sandstone canyon walls: far (pale, hazy) and near (deep red), with vertical streaks.
const Wall: React.FC<{ seed: number; base: number; amp: number; col: string; lit: string; side: "left" | "right" | "both"; streak?: string }> = ({ seed, base, amp, col, lit, side, streak = "rgba(60,20,10,0.18)" }) => {
  const xs = side === "left" ? [-400, 380] : side === "right" ? [700, 1480] : [-400, 1480];
  const pts: string[] = [];
  const n = 18;
  for (let i = 0; i <= n; i++) {
    const x = mix(xs[0], xs[1], i / n);
    const edge = side === "left" ? 1 - i / n : side === "right" ? i / n : 0.5 + 0.5 * Math.cos((i / n) * Math.PI * 2);
    const h = base - amp * (0.35 + 0.65 * edge) - Math.sin(i * 1.7 + seed) * 40 - Math.sin(i * 0.6 + seed * 2) * 30;
    pts.push(`${x.toFixed(0)},${h.toFixed(0)}`);
  }
  const d = `M${xs[0]},${base + 900} L${pts.join(" L")} L${xs[1]},${base + 900} Z`;
  return (
    <Svg>
      <path d={d} fill={col} />
      <path d={d} fill={lit} opacity={0.35} transform={`translate(${side === "right" ? 18 : -18},0) scale(1,1)`} style={{ mixBlendMode: "screen" }} />
      <defs>
        <clipPath id={`wall${seed}`}>
          <path d={d} />
        </clipPath>
      </defs>
      <g clipPath={`url(#wall${seed})`}>
        {Array.from({ length: 9 }, (_, i) => {
          const x = mix(xs[0], xs[1], (i + 0.5) / 9);
          return <rect key={i} x={x} y={base - amp * 1.2} width={10 + (i % 3) * 6} height={amp * 1.4} fill={streak} />;
        })}
      </g>
    </Svg>
  );
};

const Road: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y - 60} width={1880} height={900} fill="#9a7b5c" />
    <path d={`M-400,${y - 10} L1480,${y - 10} L1480,${y + 120} L-400,${y + 120} Z`} fill="#4b4a4c" />
    {Array.from({ length: 12 }, (_, i) => (
      <rect key={i} x={-380 + i * 170} y={y + 50} width={90} height={8} fill="#e8d9a8" />
    ))}
    {Array.from({ length: 10 }, (_, i) => (
      <ellipse key={i} cx={-300 + i * 190} cy={y - 40} rx={46} ry={18} fill="#6f7a4e" />
    ))}
  </Svg>
);

const Trail: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={900} fill="#b0805a" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 4} L1480,${y + 120} Q540,${y + 90} -400,${y + 120} Z`} fill="#d9b48a" />
    {Array.from({ length: 9 }, (_, i) => (
      <ellipse key={i} cx={-260 + i * 200} cy={y - 34} rx={52} ry={20} fill="#6f7a4e" />
    ))}
  </Svg>
);

const Canyon: React.FC<{ cam: Cam; sky: Sky; uid: string; floorY: number; blur?: number; t: number; warm?: boolean }> = ({ cam, sky, uid, floorY, blur = 0, t, warm }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={360} col="#ffffff" seed={5} drift={t * 10} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={23} base={floorY - 380} amp={300} scale={200} col="#d6a88a" lit="#f6dcc6" peak={120} />
    </Plane>
    <Haze y={floorY - 600} h={420} col={sky.low} opacity={0.65} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Wall seed={3} base={floorY - 80} amp={760} col={warm ? "#b8603a" : "#a8553a"} lit="#f2b48a" side="left" />
      <Wall seed={7} base={floorY - 80} amp={700} col={warm ? "#b05a36" : "#9c4e34"} lit="#eaa47c" side="right" />
    </Plane>
    <Haze y={floorY - 260} h={240} col={sky.low} opacity={0.35} />
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Park shuttle bus, side view (local units, ground at y).
const Bus: React.FC<{ x: number; y: number; s?: number; riders?: boolean }> = ({ x, y, s = 1, riders = true }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={260} ry={12} fill="rgba(0,0,0,0.22)" />
    <path d="M-250,-30 L-250,-190 Q-250,-210 -228,-210 L226,-210 Q252,-210 254,-186 L258,-30 Z" fill="#e9e4d6" />
    <rect x={-250} y={-70} width={508} height={40} fill="#4f6b52" />
    <rect x={-250} y={-82} width={508} height={10} fill="#c7863e" />
    {Array.from({ length: 6 }, (_, i) => (
      <g key={i}>
        <rect x={-228 + i * 74} y={-184} width={62} height={70} rx={6} fill="#bcd4df" />
        {riders && i % 2 === 0 && <circle cx={-197 + i * 74} cy={-136} r={16} fill={i % 4 ? "#C4876A" : "#8d5a3e"} />}
        {riders && i % 2 === 0 && <rect x={-212 + i * 74} y={-124} width={30} height={12} rx={5} fill={i % 4 ? "#C9A23E" : "#9b3d3d"} />}
      </g>
    ))}
    <rect x={200} y={-184} width={46} height={150} rx={6} fill="#a9c3cf" />
    {[-170, 170].map((wx) => (
      <g key={wx}>
        <circle cx={wx} cy={-24} r={28} fill="#1f2222" />
        <circle cx={wx} cy={-24} r={12} fill="#9aa3a6" />
      </g>
    ))}
  </g>
);

// "Road closed" barrier: a simple striped gate with a sign.
const Gate: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-6} y={-150} width={12} height={150} fill="#5a5a5a" />
    <rect x={-170} y={-110} width={340} height={34} fill="#f2f0ea" />
    {Array.from({ length: 6 }, (_, i) => (
      <path key={i} d={`M${-160 + i * 56},-110 l26,0 l-20,34 l-26,0 Z`} fill="#c8432f" />
    ))}
  </g>
);

const CARS = [
  ["#7f8c99", "#64707c"],
  ["#c9c4b8", "#a8a296"],
  ["#4d6a8a", "#3b546f"],
  ["#8e3d34", "#702f28"],
  ["#2f3438", "#202427"],
  ["#d8d2c4", "#b8b2a2"],
];

// ============ S1 HOOK: wide, Dan drives into Zion at 10 am (0 - 2.75) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: t * 20 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 2.75), rot: hh.rot };
  const g = 1500;
  return (
    <AbsoluteFill>
      <Canyon cam={cam} sky={NOON} uid="a" floorY={g} t={t} />
      <Plane cam={cam} depth={1}>
        <Road y={g} />
        <Subject rimX={3}>
          <Car x={-120 + t * 240} y={g + 40} s={1.35} body="#4d6a8a" shade="#3b546f" />
        </Subject>
      </Plane>
      <Rays x={NOON.sun[0]} y={NOON.sun[1]} strength={0.18} />
      <Particles seed={51} n={18} col="#fff0d0" />
      <Grade sunX={820} sunY={380} warm="255,205,160" />
      <Title text={"Don't roll\ninto Zion\nat 10 AM"} t={t} t0={0} top={130} size={136} />
      <Chip text="10:00 AM" t={t} t0={1.54} x={80} y={640} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: lot full, canyon road closed to cars (2.7 - 7.1) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: lt * 12 + hh.x, y: hh.y, zoom: mix(1.03, 1.1, lt / 4.4), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 600, y: g + 230, scale: 2.3, walk: 0, lean: 0.03, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.1) * 2 };
  const gate = at(t, [5.6, 6.1], [0, 1]);
  return (
    <AbsoluteFill>
      <Canyon cam={cam} sky={HOT} uid="b" floorY={g} blur={2.5} t={t} />
      <Plane cam={cam} depth={0.8} blur={2}>
        <Svg>
          <rect x={-400} y={g - 60} width={1880} height={900} fill="#5b5a5c" />
          {Array.from({ length: 12 }, (_, i) => (
            <Car key={i} x={-260 + (i % 6) * 250} y={g + (i < 6 ? 0 : 120)} s={0.9} body={CARS[i % 6][0]} shade={CARS[i % 6][1]} flip={i % 2 === 1} />
          ))}
          <g opacity={gate}>
            <Gate x={880} y={g - 20} s={0.9} />
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={3}>
          <Person {...p} outfit={DAN} expression={t > 4.4 ? "tired" : "neutral"} />
        </Subject>
      </Plane>
      <Grade sunX={880} sunY={420} warm="255,200,150" vignette={0.55} />
      <Chip text="Visitor center lot: full" t={t} t0={4.11} x={80} y={240} icon="x" big />
      <Chip text="Canyon road: closed to cars" t={t} t0={5.96} x={80} y={370} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: the shuttle goes by, hikers ride it to the trailheads (7.05 - 10.5) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.45), rot: hh.rot };
  const g = 1300;
  const p: HikerProps = { x: 330, y: 2380, scale: 4.4, walk: 0, lean: 0.02, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.1) * 2 };
  return (
    <AbsoluteFill>
      <Canyon cam={cam} sky={HOT} uid="c" floorY={g} blur={8} t={t} />
      <Plane cam={cam} depth={0.7} blur={5}>
        <Svg>
          <rect x={-400} y={g - 30} width={1880} height={900} fill="#4b4a4c" />
          <Bus x={1500 - lt * 420} y={g + 60} s={1.2} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4}>
          <Person {...p} outfit={DAN} expression="tired" />
        </Subject>
      </Plane>
      <Grade sunX={880} sunY={420} warm="255,200,150" vignette={0.65} />
      <Chip text="Shuttle season" t={t} t0={7.54} x={80} y={240} icon="none" big />
      <Chip text="Hikers ride to the trailheads" t={t} t0={8.66} x={80} y={370} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: the fix, arrive before 8 (10.45 - 14.85) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 12 + hh.x, y: at(lt, [0, 2], [-70, 0]) + hh.y, zoom: at(lt, [0, 4.4], [1.12, 1.03]), rot: hh.rot };
  const g = 1440;
  const walking = at(t, [13.3, 13.6], [0, 1]);
  const ph = Math.max(0, t - 13.3) * 3.2;
  const p: HikerProps = { x: 470 + Math.max(0, t - 13.3) * 90, y: g + 230, scale: 2.3, phase: ph, walk: 0.6 * walking, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6 * walking), breathe: Math.sin(t * 2.1) * 2 };
  return (
    <AbsoluteFill>
      <Canyon cam={cam} sky={DAWN} uid="d" floorY={g} blur={2.5} t={t} warm />
      <Plane cam={cam} depth={0.8} blur={2}>
        <Svg>
          <rect x={-400} y={g - 60} width={1880} height={900} fill="#5b5a5c" />
          <Car x={150} y={g} s={0.9} body="#4d6a8a" shade="#3b546f" />
          <Car x={-140} y={g + 120} s={0.9} body="#c9c4b8" shade="#a8a296" flip />
          <Bus x={1050} y={g + 30} s={0.8} riders={false} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={DAN} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.24} col="255,210,160" />
      <Particles seed={53} n={18} col="#ffe2c0" />
      <Grade sunX={300} sunY={980} warm="255,190,130" />
      <Title text={"The fix."} t={t} t0={10.55} t1={11.7} top={200} size={170} />
      <Readout label="ARRIVE" value="BEFORE 8 AM" ok={true} t={t} t0={11.72} x={80} y={230} pulseAt={12.65} />
      <Chip text="Park" t={t} t0={12.84} x={80} y={470} icon="check" big />
      <Chip text="Catch an early shuttle" t={t} t0={13.41} x={80} y={600} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3b WIDE: lot full? park in Springdale, free town shuttle (14.8 - 19.8) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 16 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 5), rot: hh.rot };
  const g = 1480;
  const busX = at(t, [16.9, 18.6], [1500, 700]);
  const ph = lt * 3.2;
  return (
    <AbsoluteFill>
      <Canyon cam={cam} sky={NOON} uid="e" floorY={g} t={t} />
      <Plane cam={cam} depth={0.7} blur={1.2}>
        <Svg>
          {[[-60, "#d9c3a0", "#b8a07c"], [260, "#c8a27e", "#a5825f"], [560, "#e0d2b6", "#bfae90"], [860, "#b98f6c", "#987252"]].map(([x, c, c2], i) => (
            <g key={i}>
              <rect x={x as number} y={g - 330 - (i % 2) * 40} width={260} height={330 + (i % 2) * 40} fill={c as string} />
              <rect x={x as number} y={g - 330 - (i % 2) * 40} width={260} height={30} fill={c2 as string} />
              <rect x={(x as number) + 40} y={g - 250} width={60} height={70} fill="#7d93a0" />
              <rect x={(x as number) + 150} y={g - 250} width={60} height={70} fill="#7d93a0" />
              <rect x={(x as number) + 100} y={g - 140} width={60} height={140} fill="#6b4a32" />
            </g>
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Road y={g} />
        <Subject rimX={3}>
          <g transform={`translate(260,${g - 10})`}>
            <rect x={-5} y={-230} width={10} height={230} fill="#4a4a4a" />
            <rect x={-60} y={-280} width={120} height={70} rx={10} fill="#4f6b52" />
            <rect x={-40} y={-260} width={80} height={10} rx={4} fill="#f2f0ea" />
            <rect x={-40} y={-240} width={56} height={10} rx={4} fill="#f2f0ea" />
          </g>
          <Bus x={busX} y={g + 70} s={1.0} />
          <Person x={420} y={g + 20} scale={1.35} phase={ph} walk={0} lean={0.04} poles={false} handOverride={[30, 30]} outfit={DAN} expression="happy" breathe={Math.sin(t * 2) * 2} />
          <Person x={150} y={g + 26} scale={1.3} phase={ph} walk={0} lean={0.04} poles={false} handOverride={[30, 30]} outfit={RIDER_A} />
          <Person x={-10} y={g + 30} scale={1.3} phase={ph} walk={0} lean={0.04} poles={false} handOverride={[30, 30]} outfit={RIDER_B} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3d3a1e" side="right" />
      </Plane>
      <Rays x={NOON.sun[0]} y={NOON.sun[1]} strength={0.16} />
      <Particles seed={54} n={16} col="#fff0d0" />
      <Grade sunX={820} sunY={380} warm="255,205,160" />
      <Chip text="Lot full?" t={t} t0={14.91} x={80} y={240} icon="none" big />
      <Chip text="Park in Springdale" t={t} t0={16.08} x={80} y={370} icon="check" big />
      <Chip text="Free town shuttle" t={t} t0={17.73} x={80} y={500} icon="check" big />
      <Chip text="When it's running" t={t} t0={18.63} x={80} y={630} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S3c CLOSE-UP: check nps.gov for this season's schedule (19.75 - 23.0) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 8 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.25), rot: hh.rot };
  const p: HikerProps = { x: 520, y: 2380, scale: 4.4, walk: 0, lean: 0.12, poles: false, handOverride: [48, 4], breathe: Math.sin(t * 2.1) * 2 };
  return (
    <AbsoluteFill>
      <Canyon cam={cam} sky={NOON} uid="f" floorY={1300} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={DAN} expression="neutral" />
        </Subject>
      </Plane>
      <Particles seed={55} n={14} col="#fff0d0" />
      <Grade sunX={820} sunY={380} warm="255,205,160" vignette={0.6} />
      <Readout label="BEFORE YOU GO" value="CHECK NPS.GOV" ok={true} t={t} t0={19.85} x={80} y={230} pulseAt={20.3} />
      <Chip text="This season's shuttle schedule" t={t} t0={21.14} x={80} y={470} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: next morning, a quiet trail (22.95 - 25.65) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 16 + hh.x, y: hh.y, zoom: at(lt, [0, 1.2], [1.16, 1.04]), rot: hh.rot };
  const g = 1400;
  const ph = lt * 3.2;
  const p: HikerProps = { x: 400 + lt * 34, y: g + 200, scale: 2.3, phase: ph, walk: 0.6, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <Canyon cam={cam} sky={GOLD} uid="h" floorY={g - 40} blur={2.5} t={t} warm />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={6}>
          <Person {...p} outfit={DAN} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.26} col="255,214,150" />
      <Particles seed={58} n={22} col="#ffe7b8" />
      <Grade sunX={760} sunY={760} warm="255,180,100" />
      <Title text={"A quiet\ntrail."} t={t} t0={off + 0.1} top={180} size={160} />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/utahs-mighty-5-trip-planning-guide-card.jpg"
      photoH={760}
      spec="DIGITAL GUIDE · ZION TO ARCHES"
      name={
        <>
          Utah's Mighty 5
          <br />
          Trip Planning Guide
        </>
      }
      nameSize={78}
      price="$9.99"
      save="Save this before your Zion trip"
    />
  );
};

export const V35B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.75} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={2.7} to={7.1} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={2.7} />
    </Scene>
    <Scene from={7.05} to={10.5} fadeIn={0.08} fadeOut={0.12}>
      <S2b off={7.05} />
    </Scene>
    <Scene from={10.45} to={14.85} fadeIn={0.12} fadeOut={0.1}>
      <S3a off={10.45} />
    </Scene>
    <Scene from={14.8} to={19.8} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={14.8} />
    </Scene>
    <Scene from={19.75} to={23.0} fadeIn={0.1} fadeOut={0.12}>
      <S3c off={19.75} />
    </Scene>
    <Scene from={22.95} to={25.65} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={22.95} />
    </Scene>
    <Scene from={25.6} to={30} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.7, 1560],
        [2.7, 7.05, 1560],
        [7.05, 10.45, 1560],
        [10.45, 14.8, 1560],
        [14.8, 19.75, 1560],
        [19.75, 22.95, 1560],
        [22.95, 25.6, 1560],
      ]}
    />
  </AbsoluteFill>
);
