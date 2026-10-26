// V43B: v43 "Angels Landing needs a permit" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v43b.json";

const words = vo.words as unknown as Word[];

const NOON: Sky = { top: "#2f6aa8", mid: "#8fb8dc", low: "#f2e2c8", sun: [820, 380], sunR: 44, sunCol: "#fffbe8", glow: "#fff0c8" };
const LATE: Sky = { top: "#3f6797", mid: "#d2a98a", low: "#f8d8aa", sun: [800, 640], sunR: 52, sunCol: "#fff4d8", glow: "#ffcf90" };
const DAWN: Sky = { top: "#45608e", mid: "#d79c86", low: "#ffd7a4", sun: [300, 900], sunR: 56, sunCol: "#fff2d0", glow: "#ffbf80" };

const ALEX: Outfit = {
  ...JAKE,
  skin: "#C98E6E",
  skinShade: "#A9725A",
  hair: "#2a201a",
  beard: "#2a201a",
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#C9A23E",
  jacketShade: "#a5832c",
  pants: "#5b5546",
  pantsShade: "#45402F",
  pack: "#4E6B8A",
  packShade: "#3a536c",
};
const RANGER: Outfit = {
  ...GUIDE,
  skin: "#E2A98A",
  skinShade: "#C4876A",
  hair: "#6b4a32",
  beard: null,
  ponytail: "#6b4a32",
  cap: "#8a6a3e",
  capShade: "#6f5430",
  jacket: "#7d8a6a",
  jacketShade: "#626e52",
  pants: "#4f4a3a",
  pantsShade: "#3c382c",
  pack: "#7d8a6a",
  packShade: "#626e52",
};

// Sandstone canyon walls with vertical streaks.
const Wall: React.FC<{ seed: number; base: number; amp: number; col: string; lit: string; side: "left" | "right" }> = ({ seed, base, amp, col, lit, side }) => {
  const xs = side === "left" ? [-400, 380] : [700, 1480];
  const pts: string[] = [];
  const n = 18;
  for (let i = 0; i <= n; i++) {
    const x = mix(xs[0], xs[1], i / n);
    const edge = side === "left" ? 1 - i / n : i / n;
    const h = base - amp * (0.35 + 0.65 * edge) - Math.sin(i * 1.7 + seed) * 40 - Math.sin(i * 0.6 + seed * 2) * 30;
    pts.push(`${x.toFixed(0)},${h.toFixed(0)}`);
  }
  const d = `M${xs[0]},${base + 900} L${pts.join(" L")} L${xs[1]},${base + 900} Z`;
  return (
    <Svg>
      <defs>
        <clipPath id={`w43${seed}`}>
          <path d={d} />
        </clipPath>
      </defs>
      <path d={d} fill={col} />
      <path d={d} fill={lit} opacity={0.3} transform={`translate(${side === "right" ? 18 : -18},0)`} />
      <g clipPath={`url(#w43${seed})`}>
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={mix(xs[0], xs[1], (i + 0.5) / 9)} y={base - amp * 1.2} width={10 + (i % 3) * 6} height={amp * 1.4} fill="rgba(60,20,10,0.18)" />
        ))}
      </g>
    </Svg>
  );
};

const Canyon: React.FC<{ cam: Cam; sky: Sky; uid: string; floorY: number; blur?: number; t: number }> = ({ cam, sky, uid, floorY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={360} col="#ffffff" seed={5} drift={t * 10} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={23} base={floorY - 420} amp={300} scale={200} col="#d6a88a" lit="#f6dcc6" peak={120} />
    </Plane>
    <Haze y={floorY - 640} h={420} col={sky.low} opacity={0.6} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Wall seed={3} base={floorY - 80} amp={760} col="#b05a36" lit="#f2b48a" side="left" />
      <Wall seed={7} base={floorY - 80} amp={700} col="#9c4e34" lit="#eaa47c" side="right" />
    </Plane>
    <Haze y={floorY - 280} h={260} col={sky.low} opacity={0.35} />
  </>
);

// Sandstone ledge the hikers stand on, with a few junipers.
const Ledge: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y - 20} Q300,${y - 50} 700,${y - 30} T1480,${y - 10} L1480,${y + 900} L-400,${y + 900} Z`} fill="#c98a5e" />
    <path d={`M-400,${y + 60} Q400,${y + 30} 1480,${y + 70} L1480,${y + 900} L-400,${y + 900} Z`} fill="#b47750" />
    {[-120, 980, 1240].map((x, i) => (
      <g key={i} transform={`translate(${x},${y - 30})`}>
        <rect x={-6} y={-60} width={12} height={60} fill="#5a4030" />
        <ellipse cx={0} cy={-90} rx={70} ry={50} fill="#5f6e44" />
        <ellipse cx={20} cy={-120} rx={44} ry={34} fill="#71804f" />
      </g>
    ))}
  </Svg>
);

// The narrow fin to the summit, with chain posts.
const Fin: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M80,${y} L420,${y - 520} L520,${y - 760} L600,${y - 900} L660,${y - 880} L760,${y - 600} L1000,${y} Z`} fill="#c07a4c" />
    <path d={`M420,${y - 520} L520,${y - 760} L600,${y - 900} L620,${y - 700} L520,${y - 480} Z`} fill="#e0a272" opacity={0.7} />
    <path d={`M80,${y} L420,${y - 520} L520,${y - 480} L300,${y} Z`} fill="#9c5a38" opacity={0.6} />
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const x = 300 + i * 52;
      const yy = y - 220 - i * 115;
      return <rect key={i} x={x - 4} y={yy - 40} width={8} height={40} fill="#4a4a4a" />;
    })}
    <path
      d={[0, 1, 2, 3, 4].map((i) => `M${300 + i * 52},${y - 260 - i * 115} Q${326 + i * 52},${y - 270 - i * 115 - 30} ${352 + i * 52},${y - 260 - (i + 1) * 115}`).join(" ")}
      stroke="#d7d4cc"
      strokeWidth={6}
      fill="none"
    />
  </Svg>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Phone in the near hand: the permit site, then a permit with a green check.
const Phone: React.FC<{ p: HikerProps; k: number; ok?: boolean }> = ({ p, k, ok }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      <g transform={`translate(${h[0] - 4},${h[1] - 66}) rotate(-8)`}>
        <rect x={0} y={0} width={44} height={80} rx={7} fill="#1b1f23" />
        <rect x={3} y={4} width={38} height={72} rx={5} fill="#f6efe2" />
        <text x={22} y={18} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={8.5} fill="#1f2a24" letterSpacing={0.5}>PERMIT</text>
        {ok ? (
          <>
            <circle cx={22} cy={40} r={11} fill="#3E8E5A" />
            <path d="M16,40 l5,5 l8,-10" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <rect x={8} y={28} width={28} height={6} rx={2} fill="#c9c3b3" />
            <rect x={8} y={38} width={20} height={6} rx={2} fill="#c9c3b3" />
          </>
        )}
        <rect x={10} y={58} width={24} height={8} rx={3} fill="#3E8E5A" />
      </g>
    </g>
  );
};

// ============ S1 HOOK: Alex climbs to Scout Lookout (0 - 4.05) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: t * 24 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 4), rot: hh.rot };
  const g = 1460;
  const ph = t * 5.2;
  const p: HikerProps = { x: 300 + t * 60, y: g + 40, scale: 1.9, phase: ph, walk: 0.7, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Canyon cam={cam} sky={NOON} uid="a" floorY={g} t={t} />
      <Plane cam={cam} depth={0.6} blur={1.2}>
        <AbsoluteFill style={{ transform: "translateX(300px)" }}>
          <Fin y={g + 40} />
        </AbsoluteFill>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Ledge y={g} />
        <Subject>
          <Person {...p} outfit={ALEX} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3d3a1e" side="right" />
      </Plane>
      <Rays x={NOON.sun[0]} y={NOON.sun[1]} strength={0.18} />
      <Particles seed={81} n={18} col="#fff0d0" />
      <Grade sunX={820} sunY={380} warm="255,205,160" />
      <Title text={"No permit?\nThe chains are\noff limits."} t={t} t0={0} top={130} size={112} />
      <Chip text="Scout Lookout" t={t} t0={1.77} x={80} y={520} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: a ranger asks for his permit (4.0 - 7.3) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.3), rot: hh.rot };
  const g = 1460;
  const a: HikerProps = { x: 330, y: g + 40, scale: 2.3, walk: 0, lean: 0.03, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.1) * 2 };
  const r: HikerProps = { x: 790, y: g + 40, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [60, -10], breathe: Math.sin(t * 1.8) * 2 };
  return (
    <AbsoluteFill>
      <Canyon cam={cam} sky={NOON} uid="b" floorY={g} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Ledge y={g} />
        <Subject>
          <Person {...a} outfit={ALEX} expression={t > 6.2 ? "tired" : "neutral"} />
          <Person {...r} outfit={RANGER} flip expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#3d3a1e" side="left" />
      </Plane>
      <Grade sunX={820} sunY={380} warm="255,205,160" vignette={0.55} />
      <Chip text="Permit, please" t={t} t0={4.37} x={80} y={240} icon="none" big />
      <Readout label="ALEX'S PERMIT" value="NONE" ok={false} t={t} t0={6.27} x={80} y={370} pulseAt={6.85} />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: the chains to the summit, permit only (7.25 - 11.2) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: at(lt, [0, 3.9], [-60, 40]) + hh.y, zoom: mix(1.06, 1.14, lt / 3.9), rot: hh.rot };
  const g = 1700;
  return (
    <AbsoluteFill>
      <Canyon cam={cam} sky={NOON} uid="c" floorY={1300} blur={6} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <g transform="translate(-40,0) scale(1.08)">
            <Fin y={g} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={82} n={14} col="#fff0d0" />
      <Grade sunX={820} sunY={380} warm="255,205,160" vignette={0.6} />
      <Chip text="Scout Lookout to the summit" t={t} t0={7.4} x={80} y={240} icon="none" />
      <Readout label="THE CHAINS" value="PERMIT ONLY" ok={false} t={t} t0={9.54} x={80} y={350} pulseAt={9.93} />
      <Chip text="All year" t={t} t0={10.42} x={80} y={600} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a CLOSE-UP: here's the fix, apply on recreation.gov (11.15 - 14.2) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 6 + hh.x, y: at(lt, [0, 1.2], [-40, 0]) + hh.y, zoom: mix(1.1, 1.04, lt / 3), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 2330, scale: 4.4, walk: 0, lean: 0.12, poles: false, handOverride: [52, -40], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Canyon cam={cam} sky={LATE} uid="d" floorY={1300} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={ALEX} expression="neutral" />
          <Phone p={p} k={at(t, [11.9, 12.2], [0, 1])} />
        </Subject>
      </Plane>
      <Particles seed={83} n={14} col="#ffe2c0" />
      <Grade sunX={800} sunY={640} vignette={0.6} />
      <Title text={"Apply on\nrecreation.gov"} t={t} t0={12.25} top={200} size={120} />
    </AbsoluteFill>
  );
};

// ============ S3b MEDIUM: the two lotteries (14.15 - 19.65) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 5.5), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 640, y: g + 40, scale: 2.3, walk: 0, lean: 0.08, poles: false, handOverride: [50, -36], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Canyon cam={cam} sky={LATE} uid="e" floorY={g} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Ledge y={g} />
        <Subject>
          <Person {...p} outfit={ALEX} expression="neutral" />
          <Phone p={p} k={1} />
        </Subject>
      </Plane>
      <Rays x={LATE.sun[0]} y={LATE.sun[1]} strength={0.18} col="255,214,160" />
      <Particles seed={84} n={16} col="#ffe2c0" />
      <Grade sunX={800} sunY={640} warm="255,190,130" />
      <Chip text="Seasonal lottery" t={t} t0={14.44} x={80} y={240} icon="check" big />
      <Chip text="Day-before lottery" t={t} t0={16.44} x={80} y={370} icon="check" big />
      <Readout label="DAY-BEFORE LOTTERY CLOSES" value="3 PM MT" ok={null} t={t} t0={17.88} x={80} y={500} pulseAt={18.88} />
    </AbsoluteFill>
  );
};

// ============ S3c WIDE: no luck? Scout Lookout needs no permit (19.6 - 23.65) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: -lt * 20 + hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 4), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 330, y: g + 40, scale: 1.7, walk: 0, lean: 0.0, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2) * 2 };
  return (
    <AbsoluteFill>
      <Canyon cam={cam} sky={LATE} uid="f" floorY={g + 200} t={t} />
      <Plane cam={cam} depth={0.5} blur={1.4}>
        <Svg>
          <path d={`M-400,${g + 120} Q540,${g - 40} 1480,${g + 120} L1480,${g + 600} L-400,${g + 600} Z`} fill="#6f7a4e" opacity={0.85} />
          <path d={`M-200,${g + 140} Q500,${g + 40} 1300,${g + 160}`} stroke="#5d8fa8" strokeWidth={22} fill="none" opacity={0.8} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Ledge y={g} />
        <Subject col="rgba(255,200,140,0.85)">
          <Person {...p} outfit={ALEX} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={LATE.sun[0]} y={LATE.sun[1]} strength={0.26} col="255,210,150" />
      <Particles seed={85} n={20} col="#ffe2c0" />
      <Grade sunX={800} sunY={640} warm="255,190,120" />
      <Chip text="No luck?" t={t} t0={19.61} x={80} y={240} icon="none" big />
      <Chip text="Scout Lookout: no permit" t={t} t0={20.17} x={80} y={370} icon="check" big />
      <Chip text="Huge view" t={t} t0={22.47} x={80} y={500} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: next morning, permit in hand (23.6 - 26.1) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 8 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.04]), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 2330, scale: 4.4, walk: 0, lean: 0.1, poles: false, handOverride: [52, -40], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Canyon cam={cam} sky={DAWN} uid="g" floorY={1300} blur={8} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,200,140,0.9)">
          <Person {...p} outfit={ALEX} expression="happy" />
          <Phone p={p} k={1} ok />
        </Subject>
      </Plane>
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={86} n={22} col="#ffe7b8" />
      <Grade sunX={300} sunY={900} warm="255,180,100" />
      <Title text={"Permit\nin hand."} t={t} t0={off + 0.1} top={160} size={140} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/utahs-mighty-5-trip-pack-card.jpg"
      photoH={760}
      spec="DIGITAL DOWNLOAD · GUIDE + 10 GPX HIKES"
      name={
        <>
          Utah's Mighty 5
          <br />
          Trip Pack
        </>
      }
      nameSize={96}
      price="$19.99"
      save="Save this before your Zion trip"
    />
  );
};

export const V43B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.05} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={4.0} to={7.3} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={4.0} />
    </Scene>
    <Scene from={7.25} to={11.2} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={7.25} />
    </Scene>
    <Scene from={11.15} to={14.2} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={11.15} />
    </Scene>
    <Scene from={14.15} to={19.65} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={14.15} />
    </Scene>
    <Scene from={19.6} to={23.65} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={19.6} />
    </Scene>
    <Scene from={23.6} to={26.1} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={23.6} />
    </Scene>
    <Scene from={25.95} to={30} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.0, 1560],
        [4.0, 7.25, 1560],
        [7.25, 11.15, 1560],
        [11.15, 14.15, 1560],
        [14.15, 19.6, 1560],
        [19.6, 23.6, 1560],
        [23.6, 25.95, 1560],
      ]}
    />
  </AbsoluteFill>
);
