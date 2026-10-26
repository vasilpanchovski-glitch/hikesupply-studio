// V41B: v41 "Cold hands at the lookout" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v41b.json";

const words = vo.words as unknown as Word[];

const COLD: Sky = { top: "#45627f", mid: "#a7b8c6", low: "#e4e6e4", sun: [800, 620], sunR: 44, sunCol: "#f8f8f2", glow: "#e8ecec" };
const CLEAR: Sky = { top: "#3a6d9e", mid: "#b6cbdc", low: "#eef0e8", sun: [830, 580], sunR: 50, sunCol: "#fffbe8", glow: "#ffeac0" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const MIA: Outfit = {
  ...GUIDE,
  skin: "#E0B08C",
  skinShade: "#C4916E",
  hair: "#6b3f22",
  ponytail: "#6b3f22",
  beard: null,
  cap: "#2F4F5F",
  capShade: "#223b47",
  jacket: "#5f8fa8",
  jacketShade: "#4a7186",
  pants: "#3f4349",
  pantsShade: "#2e3136",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};
const MIA_WARM: Outfit = { ...MIA, jacket: "#C8693A", jacketShade: "#A2532B", glove: "#2E3438" };
const MIA_GLOVES: Outfit = { ...MIA, glove: "#2E3438" };

// ---------- scenery ----------
const Firs: React.FC<{ y: number; shift: number; frost?: boolean }> = ({ y, shift, frost }) => (
  <Svg>
    {Array.from({ length: 11 }, (_, i) => {
      const x = ((((-160 + i * 150 - shift) % 1650) + 1650) % 1650) - 300;
      const h = 380 + (i % 3) * 80;
      return <Pine key={i} x={x} y={y + (i % 2) * 22} h={h} c={frost ? "#4d6e62" : "#3b6550"} c2={frost ? "#3a574d" : "#2b4d3c"} />;
    })}
  </Svg>
);

// Rocky lookout ledge (subject stands on it), valley falls away behind.
const Ledge: React.FC<{ y: number; frost?: number }> = ({ y, frost = 0.6 }) => (
  <Svg>
    <path d={`M-400,${y + 10} L120,${y - 30} L460,${y - 10} L820,${y - 40} L1480,${y} L1480,${y + 900} L-400,${y + 900} Z`} fill="#6e6a62" />
    <path d={`M-400,${y + 10} L120,${y - 30} L460,${y - 10} L820,${y - 40} L1480,${y} L1480,${y + 40} L820,${y} L460,${y + 30} L120,${y + 10} L-400,${y + 50} Z`} fill="#e9eef0" opacity={frost} />
    <path d={`M60,${y + 120} l120,-40 l90,60 Z M640,${y + 200} l160,-50 l110,70 Z M300,${y + 380} l140,-40 l120,60 Z`} fill="#58554e" />
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#ffffff" seed={8} drift={t * 40} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.12} blur={2.8 + blur}>
      <Ridge seed={53} base={treeY - 300} amp={420} scale={240} col="#9aabba" lit="#f2f5f7" peak={200} />
    </Plane>
    <Haze y={treeY - 440} h={380} col={sky.low} opacity={0.7} />
    <Plane cam={cam} depth={0.25} blur={1.8 + blur}>
      <Ridge seed={59} base={treeY - 150} amp={260} scale={200} col="#7a8d94" lit="#dfe6ea" peak={90} />
    </Plane>
    <Haze y={treeY - 240} h={280} col={sky.low} opacity={0.5} />
    <Plane cam={cam} depth={0.5} blur={1 + blur}>
      <Firs y={treeY} shift={cam.x * 0.2} frost />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX, "rgba(235,240,255,0.8)") }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Wind streaks across the frame.
const Wind: React.FC<{ t: number; k?: number }> = ({ t, k = 1 }) => (
  <Svg>
    {Array.from({ length: 9 }, (_, i) => {
      const x = ((((i * 260 + t * 900 * (0.8 + (i % 3) * 0.2)) % 1800) + 1800) % 1800) - 400;
      const y = 300 + ((i * 197) % 1300);
      return <path key={i} d={`M${x},${y} q90,-14 180,0 t180,0`} stroke="#ffffff" strokeWidth={4} fill="none" opacity={0.28 * k} strokeLinecap="round" />;
    })}
  </Svg>
);

// Snack bag held in the near hand.
const SnackBag: React.FC<{ p: HikerProps; shake: number; open?: number }> = ({ p, shake, open = 0 }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] + 4 + shake},${h[1] - 34}) rotate(${-8 + shake * 2})`}>
        <path d="M-20,0 L20,0 L24,56 L-24,56 Z" fill="#E2B33C" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
        <rect x={-21} y={-6} width={42} height={8} rx={2} fill="#C9962A" />
        <rect x={-12} y={20} width={24} height={16} rx={3} fill="#fff6d8" opacity={0.85} />
        {open > 0 && <path d={`M-18,-6 L-10,${-6 - 12 * open} L4,${-6 - 6 * open}`} fill="#C9962A" />}
      </g>
    </g>
  );
};

// A pair of gloves (spare pair, or in the pack).
const Gloves: React.FC<{ x: number; y: number; s?: number; rot?: number; col?: string }> = ({ x, y, s = 1, rot = 0, col = "#2E3438" }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    {[0, 1].map((i) => (
      <g key={i} transform={`translate(${i * 46},${i * 8}) rotate(${i * 10})`}>
        <path d="M0,0 L40,0 L42,40 Q44,58 22,60 Q0,60 -2,40 Z" fill={col} />
        <rect x={2} y={-34} width={8} height={36} rx={4} fill={col} />
        <rect x={12} y={-42} width={8} height={44} rx={4} fill={col} />
        <rect x={22} y={-40} width={8} height={42} rx={4} fill={col} />
        <rect x={32} y={-30} width={8} height={32} rx={4} fill={col} />
        <path d="M0,10 Q-16,4 -18,-12" stroke={col} strokeWidth={9} strokeLinecap="round" fill="none" />
        <rect x={-2} y={44} width={46} height={10} rx={4} fill="#4b8f63" opacity={0.9} />
      </g>
    ))}
  </g>
);

// Pack on the rock with the gloves sticking out of the top.
const PackOnRock: React.FC<{ x: number; y: number; s: number; glow?: number }> = ({ x, y, s, glow = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-60} y={-200} width={120} height={200} rx={36} fill="#B5553A" stroke="rgba(0,0,0,0.25)" strokeWidth={2} />
    <rect x={-60} y={-200} width={40} height={200} rx={24} fill="#8E3F2A" />
    <rect x={-50} y={-226} width={100} height={46} rx={20} fill="#8E3F2A" />
    <rect x={-70} y={-90} width={30} height={70} rx={12} fill="#8E3F2A" />
    <g transform="translate(-8,-236) rotate(-18) scale(0.9)">
      <Gloves x={0} y={0} />
    </g>
    {glow > 0 && <circle cx={10} cy={-250} r={90} fill="none" stroke="#ffffff" strokeWidth={6} opacity={glow * 0.8} />}
  </g>
);

// ============ S1 HOOK: wide, windy lookout (0 - 2.65) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.9);
  const cam: Cam = { x: t * 20 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 2.65), rot: hh.rot };
  const g = 1400;
  const p: HikerProps = { x: 480, y: g - 10, scale: 1.9, walk: 0, lean: 0.12, poles: false, handOverride: [44, -6], breathe: Math.sin(t * 4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="a" treeY={1320} t={t} />
      <Plane cam={cam} depth={1}>
        <Ledge y={g} />
        <Subject>
          <Person {...p} outfit={MIA} expression="tired" />
          <SnackBag p={p} shake={Math.sin(t * 40) * 1.5} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24342c" side="right" sway={Math.sin(t * 5) * 12} />
      </Plane>
      <Wind t={t} />
      <Particles seed={61} n={26} col="#ffffff" fall={60} />
      <Grade sunX={800} sunY={620} cool="150,180,220" />
      <Title text={"She was too cold\nto open a zipper"} t={t} t0={0} top={130} size={100} />
      <Chip text="Windy lookout" t={t} t0={1.21} x={80} y={370} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2a CLOSE-UP: numb fingers on the snack bag (2.6 - 4.95) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.14, lt / 2.35), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 2330, scale: 4.4, walk: 0, lean: 0.1, poles: false, handOverride: [48, -16], breathe: Math.sin(t * 4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="b" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={MIA} expression="tired" />
          <SnackBag p={p} shake={Math.sin(t * 46) * 2} />
        </Subject>
      </Plane>
      <Wind t={t} k={0.8} />
      <Particles seed={62} n={22} col="#ffffff" fall={60} />
      <Grade sunX={800} sunY={620} vignette={0.6} cool="150,180,220" />
      <Readout label="FINGERS" value="NUMB" ok={false} t={t} t0={2.76} x={80} y={240} pulseAt={3.25} />
      <Chip text="Can't open the bag" t={t} t0={3.61} x={80} y={470} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b MEDIUM: her gloves are still in her pack (4.9 - 7.95) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 14 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 3.05), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 380, y: g - 10, scale: 2.3, walk: 0, lean: 0.1, poles: false, handOverride: [40, -4], breathe: Math.sin(t * 4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COLD} uid="c" treeY={1300} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Ledge y={g} />
        <Svg>
          <PackOnRock x={780} y={g - 20} s={1.5} glow={at(t, [5.2, 5.5], [0, 1]) * at(t, [7.4, 7.9], [1, 0])} />
        </Svg>
        <Subject>
          <Person {...p} outfit={MIA} expression="tired" />
        </Subject>
      </Plane>
      <Wind t={t} k={0.7} />
      <Particles seed={63} n={22} col="#ffffff" fall={60} />
      <Grade sunX={800} sunY={620} vignette={0.5} cool="150,180,220" />
      <Chip text="Gloves still in the pack" t={t} t0={5.16} x={80} y={240} icon="x" big />
      <Chip text="Saved for later" t={t} t0={6.62} x={80} y={370} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: the fix, gloves on before you get cold (7.9 - 12.5) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const on = t >= 9.5;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 8 + hh.x, y: at(lt, [0, 1.4], [-50, 0]) + hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.05]), rot: hh.rot };
  const g = 1420;
  const p: HikerProps = { x: 520, y: g - 10, scale: 2.3, walk: 0, lean: 0.06, poles: false, handOverride: on ? [36, 30] : [46, -20], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={1300} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Ledge y={g} frost={0.4} />
        <Subject>
          <Person {...p} outfit={on ? MIA_GLOVES : MIA} expression={on ? "happy" : "neutral"} />
          {!on && (
            <g transform={hikerTransform(p)}>
              <Gloves x={hikerGeometry(p).arms[1].hand[0] - 10} y={hikerGeometry(p).arms[1].hand[1] - 10} s={0.45} rot={-10} />
            </g>
          )}
        </Subject>
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.18} />
      <Particles seed={64} n={14} col="#ffffff" fall={40} />
      <Grade sunX={830} sunY={580} />
      <Title text={"Gloves on\nbefore you're cold."} t={t} t0={8.68} top={200} size={100} />
      <Chip text="Not after" t={t} t0={11.48} x={80} y={460} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: keep your core warm, the body protects the core first (12.45 - 17.8) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const warm = t >= 13.3;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 6 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 5.35), rot: hh.rot };
  const zipK = at(t, [12.9, 13.3], [0, 1]);
  const p: HikerProps = { x: 500, y: 2350, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: warm ? [30, 34] : [mix(34, 40, zipK), mix(30, -60, zipK)], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={warm ? MIA_WARM : MIA_GLOVES} expression="happy" />
        </Subject>
      </Plane>
      <Particles seed={65} n={14} col="#ffffff" fall={30} />
      <Grade sunX={830} sunY={580} vignette={0.6} />
      <Chip text="Warm layer on" t={t} t0={12.93} x={80} y={240} icon="check" big />
      <Readout label="CORE COOLS" value="HANDS GO FIRST" ok={false} t={t} t0={15.17} x={80} y={370} pulseAt={16.78} />
    </AbsoluteFill>
  );
};

// ============ S3c CLOSE-UP: eat a snack, carry a spare pair (17.75 - 19.95) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 8 + hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 2.2), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 2330, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: [48, -16], breathe: Math.sin(t * 2.2) * 2 };
  const spare = at(t, [18.9, 19.25], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={MIA_WARM} expression="happy" />
          <SnackBag p={p} shake={0} open={1} />
        </Subject>
        <Svg>
          <g opacity={spare}>
            <Gloves x={720} y={mix(1250, 1180, spare)} s={2.2} rot={12} col="#3E5F4B" />
          </g>
        </Svg>
      </Plane>
      <Particles seed={66} n={14} col="#ffffff" fall={30} />
      <Grade sunX={830} sunY={580} vignette={0.6} />
      <Chip text="Eat a snack" t={t} t0={17.95} x={80} y={240} icon="check" big />
      <Chip text="Spare pair" t={t} t0={19.0} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: next summit, warm hands (19.9 - 22.75) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 24 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.04]), rot: hh.rot };
  const g = 1400;
  const p: HikerProps = { x: 500, y: g - 10, scale: 2.0, walk: 0, lean: -0.04, poles: false, handOverride: [30, -150], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="g" treeY={1340} t={t} />
      <Plane cam={cam} depth={1}>
        <Ledge y={g} frost={0.5} />
        <Subject rimX={6}>
          <Person {...p} outfit={MIA_WARM} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={67} n={22} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"Warm hands\nat the top."} t={t} t0={off + 0.1} top={150} size={140} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/ultimate-hikers-toolkit-card.jpg"
      photoH={760}
      spec="DIGITAL DOWNLOAD · 7 PRINTABLE PDFS"
      name={
        <>
          Ultimate
          <br />
          Hiker's Toolkit
        </>
      }
      nameSize={92}
      price="$29.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V41B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.65} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={2.6} to={4.95} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={2.6} />
    </Scene>
    <Scene from={4.9} to={7.95} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={4.9} />
    </Scene>
    <Scene from={7.9} to={12.5} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={7.9} />
    </Scene>
    <Scene from={12.45} to={17.8} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={12.45} />
    </Scene>
    <Scene from={17.75} to={19.95} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={17.75} />
    </Scene>
    <Scene from={19.9} to={22.75} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={19.9} />
    </Scene>
    <Scene from={22.7} to={27.3} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.6, 1560],
        [2.6, 4.9, 1560],
        [4.9, 7.9, 1560],
        [7.9, 12.45, 1560],
        [12.45, 17.75, 1560],
        [17.75, 19.9, 1560],
        [19.9, 22.7, 1560],
      ]}
    />
  </AbsoluteFill>
);
