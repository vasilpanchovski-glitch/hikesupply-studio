// V45B: v45 "Forgot her favorite trail" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v45b.json";

const words = vo.words as unknown as Word[];

const DAY: Sky = { top: "#3a6d9e", mid: "#b9cfe0", low: "#f3e8cc", sun: [830, 560], sunR: 52, sunCol: "#fffbe8", glow: "#ffe2a6" };
const GOLD: Sky = { top: "#4a6c98", mid: "#e9b487", low: "#ffdcaa", sun: [760, 760], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };
const LATE: Sky = { top: "#45608e", mid: "#d79c86", low: "#ffd7a4", sun: [300, 900], sunR: 56, sunCol: "#fff2d0", glow: "#ffbf80" };

const PRIYA: Outfit = {
  ...JAKE,
  skin: "#B87C5C",
  skinShade: "#9A6247",
  hair: "#1d1612",
  beard: null,
  ponytail: "#1d1612",
  cap: "#3E6E8E",
  capShade: "#2f566f",
  jacket: "#8E5A7A",
  jacketShade: "#6F4560",
  pants: "#3a3d42",
  pantsShade: "#2a2c30",
  pack: "#C9A23E",
  packShade: "#a5832c",
};
const FRIEND: Outfit = { ...GUIDE, skin: "#E8B996", skinShade: "#CC9A76", hair: "#a0662e", beard: null, ponytail: "#a0662e", cap: "#B5553A", capShade: "#8E3F2A", jacket: "#3E5F4B", jacketShade: "#2E4A39" };
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e", "#e0b040"];

const mixCol = (a: string, b: string, k: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return "#" + pa.map((v, i) => Math.round(mix(v, pb[i], k)).toString(16).padStart(2, "0")).join("");
};
// ---------- scenery ----------
const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = 440 + (i % 3) * 70;
      return i % 3 === 1 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c="#3b6550" c2="#2b4d3c" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={["#d9963a", "#b9582c", "#e0b040"][i % 3]} c2={["#b77a28", "#94461f", "#b88a2a"][i % 3]} />
      );
    })}
  </Svg>
);

const Trail: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={1000} fill="#76844c" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 6} L1480,${y + 110} Q540,${y + 90} -400,${y + 110} Z`} fill="#b8966c" />
    {Array.from({ length: 12 }, (_, i) => {
      const x = ((((i * 170 - shift) % 2040) + 2040) % 2040) - 400;
      return <circle key={i} cx={x} cy={y + 190 + (i % 3) * 50} r={9} fill={LEAVES[i % 4]} opacity={0.85} />;
    })}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; dark?: number }> = ({ cam, sky, uid, treeY, blur = 0, t, dark = 0 }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col={mixCol("#ffffff", "#2a3550", dark)} seed={9} drift={t * 10} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={83} base={treeY - 280} amp={340} scale={260} col={mixCol("#93a3b8", "#1e2a40", dark)} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.6 * (1 - dark * 0.6)} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={89} base={treeY - 120} amp={230} scale={190} col={mixCol("#6f8577", "#16202f", dark)} />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.4 * (1 - dark * 0.6)} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Small notebook + pen in the near hand.
const HandBook: React.FC<{ p: HikerProps; write?: number }> = ({ p, write = 0 }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] - 10},${h[1] - 46}) rotate(-6)`}>
        <rect x={0} y={0} width={46} height={58} rx={4} fill="#2C3B2E" />
        <rect x={4} y={3} width={38} height={52} rx={2} fill="#f6efe2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={8} y={10 + i * 9} width={(i + 1) * 6 < write * 40 ? 28 - (i % 2) * 8 : 0} height={2.6} rx={1} fill="#5a6a5e" />
        ))}
      </g>
    </g>
  );
};

// Waterfall over a rock ledge, with moving streaks.
const Falls: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => (
  <Svg>
    <path d={`M${x - 260},${y} L${x - 200},${y - 520} L${x + 200},${y - 540} L${x + 260},${y} Z`} fill="#6e6a60" />
    <rect x={x - 70} y={y - 520} width={140} height={520} fill="#cfe6ee" />
    {Array.from({ length: 7 }, (_, i) => (
      <rect key={i} x={x - 60 + i * 18} y={y - 520 + ((t * 420 + i * 97) % 520)} width={6} height={90} fill="#ffffff" opacity={0.7} />
    ))}
    <ellipse cx={x} cy={y + 10} rx={240} ry={40} fill="#e8f4f6" opacity={0.85} />
  </Svg>
);

const Lot: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y - 40} width={1880} height={1000} fill="#77805a" />
    <path d={`M-400,${y - 10} L1480,${y - 10} L1480,${y + 140} L-400,${y + 140} Z`} fill="#8d8478" />
    {Array.from({ length: 10 }, (_, i) => (
      <circle key={i} cx={-300 + i * 190} cy={y + 190 + (i % 3) * 40} r={9} fill={LEAVES[i % 4]} />
    ))}
  </Svg>
);

// Open journal page, filled in line by line.
const Page: React.FC<{ t: number; rows: [string, number][] }> = ({ t, rows }) => (
  <Svg>
    <g transform="translate(540,1000) rotate(-3)">
      <rect x={-420} y={-520} width={840} height={1000} rx={24} fill="#2C3B2E" />
      <rect x={-396} y={-496} width={792} height={952} rx={12} fill="#f6efe2" />
      <rect x={-396} y={-496} width={792} height={90} rx={12} fill="#e6dccb" />
      <text x={-350} y={-436} fontFamily={HEAD} fontWeight={800} fontSize={48} fill="#2C3B2E" letterSpacing={3}>TRAIL LOG</text>
      {rows.map(([label, t0], i) => {
        const y = -330 + i * 128;
        const k = at(t, [t0, t0 + 0.45], [0, 1]);
        return (
          <g key={i}>
            <text x={-350} y={y} fontFamily={HEAD} fontWeight={700} fontSize={50} fill="#2C3B2E" opacity={0.35 + 0.65 * Math.min(1, k * 3)}>{label}</text>
            <line x1={-350} y1={y + 26} x2={350} y2={y + 26} stroke="#c9bfae" strokeWidth={3} />
            <path
              d={`M-60,${y - 8} q30,-26 60,0 t60,0 t60,0 t60,0 t60,0 t60,0`}
              stroke="#3a5a8a"
              strokeWidth={7}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={420}
              strokeDashoffset={420 * (1 - k)}
            />
          </g>
        );
      })}
    </g>
  </Svg>
);

// ============ S1 HOOK: "What was the best hike of your fall?" (0 - 3.25) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: t * 12 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 3.25), rot: hh.rot };
  const g = 1460;
  const a: HikerProps = { x: 330, y: g + 40, scale: 2.3, walk: 0, lean: 0.03, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.1) * 2 };
  const b: HikerProps = { x: 790, y: g + 40, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [50, -10], breathe: Math.sin(t * 1.8) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAY} uid="a" treeY={g - 80} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject>
          <Person {...a} outfit={PRIYA} expression={t > 2.2 ? "tired" : "neutral"} />
          <Person {...b} outfit={FRIEND} flip expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a1d12" side="right" />
      </Plane>
      <Particles seed={61} n={20} leaves={LEAVES} fall={40} />
      <Grade sunX={830} sunY={560} />
      <Title text={"She forgot her\nfavorite trail's\nname"} t={t} t0={0} top={130} size={112} />
      <Chip text="Best hike of your fall?" t={t} t0={1.89} x={80} y={520} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2a WIDE memory: golden trees, a waterfall, an easy loop (3.2 - 5.95) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: mix(1.02, 1.09, lt / 2.75), rot: hh.rot };
  const g = 1460;
  const ph = t * 5;
  const p: HikerProps = { x: 260 + lt * 60, y: g + 40, scale: 1.7, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="b" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={0.7} blur={1.2}>
        <Falls x={800} y={g - 30} t={t} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject col="rgba(255,200,130,0.85)">
          <Person {...p} outfit={PRIYA} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={62} n={26} leaves={LEAVES} fall={50} />
      <Grade sunX={760} sunY={760} warm="255,190,110" />
      <Chip text="Golden trees" t={t} t0={3.3} x={80} y={240} icon="check" big />
      <Chip text="A waterfall" t={t} t0={4.26} x={80} y={370} icon="check" big />
      <Chip text="An easy loop" t={t} t0={5.06} x={80} y={500} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: she can't remember the name, the distance, the parking (5.9 - 10.65) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 4.75), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 2330, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.1) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DAY} uid="c" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={PRIYA} expression="tired" />
        </Subject>
      </Plane>
      <Particles seed={63} n={14} leaves={LEAVES} fall={30} />
      <Grade sunX={830} sunY={560} vignette={0.6} />
      <Chip text="Trail name?" t={t} t0={7.59} x={80} y={240} icon="x" big />
      <Chip text="Distance?" t={t} t0={8.32} x={80} y={370} icon="x" big />
      <Chip text="Where she parked?" t={t} t0={9.0} x={80} y={500} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: the fix, two minutes at the car (10.6 - 14.35) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: at(lt, [0, 1.4], [-40, 0]) + hh.y, zoom: mix(1.1, 1.04, lt / 3.75), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 330, y: g + 40, scale: 2.3, walk: 0, lean: 0.1, poles: false, handOverride: [52, -36], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LATE} uid="d" treeY={g - 80} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Lot y={g} />
        <Subject>
          <Car x={790} y={g + 50} s={2.0} body="#4E6B8A" shade="#3a536c" flip />
          <Person {...p} outfit={PRIYA} expression="happy" />
          <HandBook p={p} write={at(t, [12.4, 14.2], [0, 1])} />
        </Subject>
      </Plane>
      <Rays x={LATE.sun[0]} y={LATE.sun[1]} strength={0.24} col="255,210,160" />
      <Particles seed={64} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={300} sunY={900} warm="255,190,130" />
      <Title text={"Two minutes\nat the car."} t={t} t0={11.36} top={200} size={130} />
      <Chip text="After every hike" t={t} t0={12.99} x={80} y={480} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: write it down, line by line (14.3 - 20.0) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 5.7), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LATE} uid="e" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Page
          t={t}
          rows={[
            ["DATE", 14.87],
            ["TRAIL", 15.25],
            ["MILES", 15.83],
            ["TIME", 16.46],
            ["WEATHER", 17.39],
            ["PACK NEXT TIME", 18.15],
          ]}
        />
      </Plane>
      <Particles seed={65} n={12} leaves={LEAVES} fall={30} />
      <Grade sunX={300} sunY={900} warm="255,190,130" vignette={0.55} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: by the end of the year, your own guidebook (19.95 - 23.1) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 8 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.04]), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 2330, scale: 4.4, walk: 0, lean: 0.1, poles: false, handOverride: [52, -40], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="f" treeY={1250} blur={8} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,200,140,0.9)">
          <Person {...p} outfit={PRIYA} expression="happy" />
          <HandBook p={p} write={1} />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={66} n={24} leaves={LEAVES} fall={40} />
      <Grade sunX={760} sunY={760} warm="255,180,100" />
      <Title text={"Your own\nguidebook."} t={t} t0={off + 0.1} top={160} size={140} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-journal-trail-log-printable-card.jpg"
      photoH={760}
      spec="DIGITAL DOWNLOAD · PRINTABLE · 64 PAGES"
      name={
        <>
          Hiking Journal
          <br />& Trail Log
        </>
      }
      nameSize={96}
      price="$7.99"
      save="Save this before your next hike"
    />
  );
};

export const V45B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.25} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.2} to={5.95} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={3.2} />
    </Scene>
    <Scene from={5.9} to={10.65} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={5.9} />
    </Scene>
    <Scene from={10.6} to={14.35} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={10.6} />
    </Scene>
    <Scene from={14.3} to={20.0} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={14.3} />
    </Scene>
    <Scene from={19.95} to={23.1} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={19.95} />
    </Scene>
    <Scene from={22.95} to={27.5} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.2, 1560],
        [3.2, 5.9, 1560],
        [5.9, 10.6, 1560],
        [10.6, 14.3, 1560],
        [14.3, 19.95, 1560],
        [19.95, 22.95, 1560],
      ]}
    />
  </AbsoluteFill>
);
