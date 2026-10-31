// V73: "His water bottle froze shut" in the cinematic C01 style, winter summit.
// Advice: water freezes at the top first (at the lid threads); start with warm (not hot) water, pack the bottle upside down,
// keep it inside the pack close to your back, not in the side pocket. End card = Winter Hiking Guide & Cold-Weather Checklist ($7.99, live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Pine, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v73.json";

const words = vo.words as unknown as Word[];

const WINTER: Sky = { top: "#3f6e9c", mid: "#a9c3d8", low: "#eef1ee", sun: [800, 560], sunR: 46, sunCol: "#fffdf2", glow: "#f3efe0" };
const STORM: Sky = { top: "#56677a", mid: "#9aa8b3", low: "#d9dde0", sun: [820, 520], sunR: 34, sunCol: "#f4f4ee", glow: "#dde0e0" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 640], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const BEN: Outfit = {
  ...GUIDE,
  skin: "#C98E6A",
  skinShade: "#AD7553",
  hair: "#2b2018",
  beard: "#2b2018",
  cap: "#C2662E",
  capShade: "#9B4E20",
  jacket: "#2F5D8A",
  jacketShade: "#244a6f",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
  glove: "#2a2a2a",
};
const SNOW = "#f3f6f8";
const ICE = "#dff1fb";
const BOTTLE = "#3f8fb0";

const SnowWoods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 11 }, (_, i) => {
      const x = ((((-160 + i * 150 - shift) % 1650) + 1650) % 1650) - 300;
      const h = 460 + (i % 3) * 90;
      const yy = y + (i % 2) * 22;
      return (
        <g key={i}>
          <Pine x={x} y={yy} h={h} c="#2f5446" c2="#24443a" />
          {[0, 1, 2, 3].map((k) => {
            const w = h * (0.42 - k * 0.08);
            const ty = yy - h * 0.12 - k * h * 0.21;
            return <path key={k} d={`M${x - w * 0.8},${ty - 4} Q${x - w * 0.2},${ty - h * 0.06} ${x + w * 0.3},${ty - 6} L${x + w * 0.1},${ty} Z`} fill={SNOW} opacity={0.9} />;
          })}
        </g>
      );
    })}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; woods?: boolean }> = ({ cam, sky, uid, treeY, blur = 0, t, woods = true }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#ffffff" seed={8} drift={t * 14} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={17} base={treeY - 260} amp={420} scale={240} col="#b9c7d3" lit="#ffffff" peak={180} />
    </Plane>
    <Haze y={treeY - 430} h={380} col={sky.low} opacity={0.75} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={31} base={treeY - 110} amp={250} scale={170} col="#8ea1ad" lit="#e9f0f4" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.45} />
    {woods && (
      <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
        <SnowWoods y={treeY} shift={cam.x * 0.2} />
      </Plane>
    )}
  </>
);

// Rocky snowy summit ground.
const Summit: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y + 30} L200,${y - 20} Q520,${y - 50} 820,${y - 10} L1480,${y + 60} L1480,2600 L-400,2600 Z`} fill="#7d8288" />
    <path d={`M-400,${y + 50} L200,${y} Q520,${y - 30} 820,${y + 10} L1480,${y + 80} L1480,2600 L-400,2600 Z`} fill="#e9eef1" />
    <path d={`M-400,${y + 120} L1480,${y + 150} L1480,2600 L-400,2600 Z`} fill="#dbe3e8" />
    {[[-80, 70], [960, 110], [300, 180], [700, 240]].map(([x, dy], i) => (
      <g key={i}>
        <ellipse cx={x} cy={y + dy} rx={90} ry={34} fill="#6f747a" />
        <ellipse cx={x - 8} cy={y + dy - 18} rx={74} ry={14} fill={SNOW} />
      </g>
    ))}
  </Svg>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Bottle held in the near hand (local hiker units).
const HeldBottle: React.FC<{ p: HikerProps; hand: [number, number]; rot?: number; twist?: number; open?: number }> = ({ p, hand, rot = 0, twist = 0, open = 0 }) => (
  <g transform={hikerTransform(p)}>
    <g transform={`translate(${hand[0] + 4},${hand[1] + 26}) rotate(${rot}) scale(0.34)`}>
      <rect x={-34} y={-200} width={68} height={200} rx={20} fill={BOTTLE} stroke="rgba(0,0,0,0.25)" strokeWidth={3} />
      <rect x={-34} y={-150} width={68} height={60} fill="rgba(255,255,255,0.18)" />
      <rect x={-24} y={-190} width={10} height={160} rx={5} fill="rgba(255,255,255,0.25)" />
      <g transform={`translate(0,${-open * 40}) rotate(${twist * 10} 0 -214)`}>
        <rect x={-22} y={-232} width={44} height={36} rx={8} fill="#2b3a40" />
      </g>
    </g>
  </g>
);

// Big close-up bottle (screen units). frost: ice at the neck 0..1, flip: 0 upright .. 1 upside down, iceBottom: ice at the base 0..1.
const BigBottle: React.FC<{ x: number; y: number; s?: number; frost?: number; flip?: number; iceBase?: number; level?: number; steam?: number; t: number }> = ({
  x,
  y,
  s = 1,
  frost = 0,
  flip = 0,
  iceBase = 0,
  level = 0.85,
  steam = 0,
  t,
}) => {
  const W = 300;
  const H = 820;
  const top = -H;
  // water surface: upright -> near the neck; upside down -> near the base (which is at the top of the screen)
  return (
    <g transform={`translate(${x},${y}) scale(${s}) translate(0,${-H / 2}) rotate(${flip * 180}) translate(0,${H / 2})`}>
      <defs>
        <clipPath id="bb">
          <rect x={-W / 2} y={top} width={W} height={H} rx={80} />
        </clipPath>
      </defs>
      <rect x={-W / 2} y={top} width={W} height={H} rx={80} fill="#2e6f8c" />
      <g clipPath="url(#bb)">
        {/* water */}
        <rect x={-W / 2} y={flip > 0.5 ? top : top + H * (1 - level)} width={W} height={H * level} fill="#4aa6c8" />
        <rect x={-W / 2 + 30} y={top + 40} width={40} height={H - 80} rx={20} fill="rgba(255,255,255,0.22)" />
        {/* ice in the neck area (top of the bottle) */}
        <rect x={-W / 2} y={top} width={W} height={150 * frost} fill={ICE} opacity={0.95} />
        {frost > 0.2 && <path d={`M${-W / 2 + 40},${top + 60} l70,30 l40,-20 l60,40`} stroke="#ffffff" strokeWidth={8} fill="none" opacity={frost} />}
        {/* ice at the base */}
        <rect x={-W / 2} y={-H * (1 - level) - 150 * iceBase} width={W} height={150 * iceBase} fill={ICE} opacity={0.95} />
        {iceBase > 0.2 && <path d={`M${-W / 2 + 50},${-H * (1 - level) - 70} l60,-30 l50,20 l70,-30`} stroke="#ffffff" strokeWidth={8} fill="none" opacity={iceBase} />}
      </g>
      <rect x={-W / 2} y={top} width={W} height={H} rx={80} fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth={6} />
      {/* lid with threads */}
      <rect x={-110} y={top - 120} width={220} height={130} rx={24} fill="#2b3a40" />
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={-110} y={top - 100 + k * 28} width={220} height={8} fill="rgba(255,255,255,0.12)" />
      ))}
      {frost > 0 && (
        <g opacity={frost}>
          <rect x={-124} y={top - 14} width={248} height={30} rx={12} fill={ICE} />
          {[-90, -40, 20, 70].map((dx, i) => (
            <path key={i} d={`M${dx},${top + 14} l10,${30 + (i % 2) * 16} l10,${-30 - (i % 2) * 16} Z`} fill={ICE} />
          ))}
        </g>
      )}
      {/* steam above the open bottle when filling with warm water */}
      {steam > 0 &&
        [0, 1, 2].map((i) => {
          const k = (t * 0.6 + i / 3) % 1;
          return <path key={i} d={`M${-40 + i * 40},${top - 140 - k * 160} q-20,-40 0,-80 q20,-40 0,-80`} stroke="#ffffff" strokeWidth={12} fill="none" strokeLinecap="round" opacity={steam * 0.45 * (1 - k)} />;
        })}
    </g>
  );
};

// ============ S1 HOOK MEDIUM: summit, the lid won't turn (0 - 2.4) ============
const S1: React.FC = () => {
  const t = useT();
  const shake = at(t, [1.4, 1.55, 2.0], [0, 0.7, 0]);
  const hh = handheld(t, 0.7, shake);
  const cam: Cam = { x: t * 14 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, t / 2.4), rot: hh.rot };
  const g = 1430;
  const tw = Math.sin(t * 9) * 0.5 + 0.5;
  const p: HikerProps = { x: 560, y: g + 182 * 2.3 - 150, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [44, -60], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={STORM} uid="a" treeY={g + 120} blur={3} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={-5}>
          <Person {...p} outfit={BEN} expression="tired" />
          <HeldBottle p={p} hand={[44, -60]} twist={tw} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24443a" side="left" />
      </Plane>
      <AbsoluteFill style={{ transform: "rotate(-55deg) scale(1.8)" }}>
        <Particles seed={31} n={26} col="#ffffff" fall={240} bokeh={false} />
      </AbsoluteFill>
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="20,40,70" />
      <Title text={"His water\nbottle\nfroze shut"} t={t} t0={0} top={140} size={128} />
    </AbsoluteFill>
  );
};

// ============ S1b CLOSE-UP: twisting, it won't budge (2.4 - 4.5) ============
const S1b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [3.5, 3.6, 4.0], [0, 0.6, 0]);
  const hh = handheld(t, 0.6, shake);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.1), rot: hh.rot };
  const tw = Math.sin(t * 12) * 0.5 + 0.5;
  const hand: [number, number] = [40, -40];
  const p: HikerProps = { x: 600, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: hand, breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={STORM} uid="b" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6}>
          <Person {...p} outfit={BEN} expression="tired" />
          <HeldBottle p={p} hand={hand} twist={tw} />
        </Subject>
      </Plane>
      <AbsoluteFill style={{ transform: "rotate(-55deg) scale(1.8)" }}>
        <Particles seed={32} n={26} col="#ffffff" fall={240} bokeh={false} />
      </AbsoluteFill>
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Chip text="Lid won't turn" t={t} t0={3.5} x={80} y={240} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: ice forms at the top first, at the lid (4.5 - 8.25) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: mix(-40, 30, lt / 3.75) + hh.y, zoom: mix(1.0, 1.08, lt / 3.75), rot: hh.rot };
  const frost = at(t, [4.9, 6.6], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={STORM} uid="c" treeY={1200} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <BigBottle x={620} y={1450} s={1} frost={frost} t={t} />
        </Svg>
      </Plane>
      <Particles seed={33} n={18} col="#ffffff" fall={30} />
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Chip text="Freezes at the top first" t={t} t0={5.0} x={80} y={240} icon="x" big />
      <Chip text="Right at the lid" t={t} t0={6.7} x={80} y={370} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: warm water, not hot (8.25 - 11.35) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.1), rot: hh.rot };
  const level = at(t, [9.2, 10.6], [0.15, 0.85]);
  const pour = t > 9.1 && t < 10.7 ? 1 : 0;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINTER} uid="d" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <BigBottle x={520} y={1560} s={0.8} level={level} steam={at(t, [9.4, 10.0], [0, 1])} t={t} />
          {/* warm water stream from a jug */}
          <g transform={`translate(${mix(1250, 900, at(t, [8.5, 9.1], [0, 1], outExpo))},650) rotate(${pour ? -38 : -10})`}>
            <rect x={-130} y={-120} width={260} height={300} rx={40} fill="#8a9aa3" />
            <rect x={-130} y={-120} width={260} height={50} rx={20} fill="#6f7f88" />
            <path d="M-130,-60 L-200,-90 L-200,-60 L-130,-20 Z" fill="#6f7f88" />
          </g>
          {pour > 0 && <path d={`M720,560 Q560,600 540,880`} stroke="#7cc3df" strokeWidth={26} fill="none" strokeLinecap="round" opacity={0.85} />}
        </Svg>
      </Plane>
      <Particles seed={34} n={14} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Title text={"Warm,\nnot hot."} t={t} t0={off + 0.9} top={170} size={150} />
      <Chip text="Fill at the trailhead" t={t} t0={9.3} x={80} y={500} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: pack it upside down, ice forms at the bottom (11.35 - 15.45) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 4.1), rot: hh.rot };
  const flip = at(t, [11.5, 12.4], [0, 1], outExpo);
  const ice = at(t, [13.2, 14.6], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINTER} uid="e" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <BigBottle x={620} y={1240} s={0.85} flip={flip} iceBase={ice} t={t} />
        </Svg>
      </Plane>
      <Particles seed={35} n={14} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Chip text="Pack it upside down" t={t} t0={11.6} x={80} y={240} icon="check" big />
      <Chip text="Lid stays clear" t={t} t0={13.3} x={80} y={1360} icon="check" big />
    </AbsoluteFill>
  );
};

// Big backpack, seen from the side it opens (close-up). Bottle slides into the inner sleeve against the back panel.
const PackCut: React.FC<{ t: number; slide: number; xOut: number }> = ({ slide, xOut }) => (
  <Svg>
    {/* back panel (against the hiker's back, left side) */}
    <rect x={180} y={420} width={90} height={1000} rx={40} fill="#2b3a40" />
    {/* pack body */}
    <path d="M260,420 Q260,330 420,320 L760,320 Q900,330 900,470 L900,1360 Q900,1440 800,1440 L270,1440 Z" fill={BEN.pack} />
    <path d="M300,400 L860,400" stroke={BEN.packShade} strokeWidth={14} />
    {/* opened inside showing the warm core */}
    <rect x={300} y={470} width={540} height={900} rx={30} fill="#24392d" />
    {/* jacket bundle inside */}
    <path d="M520,900 Q620,820 760,880 Q820,960 780,1080 Q660,1140 540,1080 Q480,980 520,900 Z" fill="#B83A55" />
    <path d="M520,1140 Q640,1100 780,1150 Q820,1240 760,1320 Q620,1360 520,1300 Z" fill="#5E8FA8" />
    {/* side pocket on the outside right */}
    <path d="M900,700 L1010,720 Q1040,900 1000,1080 L900,1090 Z" fill={BEN.packShade} />
    {/* bottle sliding down next to the back panel, upside down */}
    <g transform={`translate(${mix(xOut, 380, slide)},${mix(260, 900, slide)}) rotate(180) scale(0.34)`}>
      <rect x={-150} y={-820} width={300} height={820} rx={80} fill={BOTTLE} stroke="rgba(0,0,0,0.3)" strokeWidth={8} />
      <rect x={-110} y={-940} width={220} height={130} rx={24} fill="#2b3a40" />
      <rect x={-120} y={-760} width={40} height={700} rx={20} fill="rgba(255,255,255,0.22)" />
    </g>
    {/* warmth glow from the back */}
    <rect x={270} y={470} width={60} height={900} fill="rgba(255,190,120,0.35)" />
  </Svg>
);

// ============ S5 CLOSE-UP: inside the pack, close to your back, not the side pocket (15.45 - 19.65) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 4.2), rot: hh.rot };
  const slide = at(t, [15.6, 16.7], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WINTER} uid="f" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <PackCut t={t} slide={slide} xOut={420} />
        <Svg>
          {/* cross on the side pocket */}
          <g opacity={at(t, [17.8, 18.1], [0, 1])}>
            <circle cx={960} cy={900} r={70} fill="#D9443A" />
            <path d="M930,870 l60,60 M990,870 l-60,60" stroke="#fff" strokeWidth={14} strokeLinecap="round" />
          </g>
        </Svg>
      </Plane>
      <Particles seed={36} n={14} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Chip text="Inside your pack" t={t} t0={15.6} x={80} y={150} icon="check" big />
      <Chip text="Close to your back" t={t} t0={16.9} x={80} y={270} icon="check" />
      <Chip text="Side pocket" t={t} t0={17.9} x={80} y={1420} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S6 PAYOFF WIDE: lid opens, he drinks at the top (19.65 - 22.5) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 18 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.16, 1.06], outExpo), rot: hh.rot };
  const g = 1440;
  const drink = t > 20.9;
  const hand: [number, number] = drink ? [40, -150] : [44, -60];
  const p: HikerProps = { x: 470, y: g + 182 * 2.0 - 140, scale: 2.0, walk: 0, lean: drink ? -0.06 : 0.04, poles: false, handOverride: hand, breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="g" treeY={g + 120} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={6}>
          <Person {...p} outfit={BEN} expression="happy" />
          <HeldBottle p={p} hand={hand} rot={drink ? -120 : 0} open={t > 20.3 ? 1 : 0} />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.28} col="255,214,150" />
      <Particles seed={37} n={26} col="#ffe7b8" />
      <Grade sunX={760} sunY={640} warm="255,180,100" />
      <Chip text="Opens at the top" t={t} t0={20.4} x={80} y={240} icon="check" big />
    </AbsoluteFill>
  );
};

const S7: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/winter-hiking-guide-cold-weather-checklist.jpg"
      photoH={800}
      spec="22 PAGES · °F + °C · PRINTABLE CHECKLISTS"
      name={
        <>
          Winter Hiking
          <br />
          Guide
        </>
      }
      nameSize={104}
      price="$7.99"
      save="Save this before your cold hike"
    />
  );
};

export const V73: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.45} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.4} to={4.55} fadeIn={0.06} fadeOut={0.08}>
      <S1b off={2.4} />
    </Scene>
    <Scene from={4.5} to={8.3} fadeIn={0.08} fadeOut={0.1}>
      <S2 off={4.5} />
    </Scene>
    <Scene from={8.25} to={11.4} fadeIn={0.1} fadeOut={0.08}>
      <S3 off={8.25} />
    </Scene>
    <Scene from={11.35} to={15.5} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={11.35} />
    </Scene>
    <Scene from={15.45} to={19.7} fadeIn={0.08} fadeOut={0.1}>
      <S5 off={15.45} />
    </Scene>
    <Scene from={19.65} to={22.6} fadeIn={0.12} fadeOut={0.12}>
      <S6 off={19.65} />
    </Scene>
    <Scene from={22.4} to={27.5} fadeOut={0}>
      <S7 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.5, 1560],
        [4.5, 8.25, 1560],
        [8.25, 11.35, 1560],
        [11.35, 15.45, 1560],
        [15.45, 19.65, 1560],
        [19.65, 22.4, 1560],
      ]}
    />
  </AbsoluteFill>
);
