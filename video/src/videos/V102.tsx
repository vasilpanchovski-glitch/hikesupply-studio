// V102: "New hiking boots. He never wore them." in the cinematic C01 style. Gift story for the Beginner Hiker Bundle, posted Nov 30
// (Cyber Monday). Facts from the live Shopify listing: Beginner's Hiking Guide (how to choose a trail), Ultimate Hiking Packing
// Checklist, Hiking Trip Planner (one page per hike), instant download. $16.99 (live Shopify). Sale wording stays in the caption.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, Subject, Trail, CLEAR, FALL } from "../fall";
import { Boots, GadgetBox, PlanPage, Room, WindowView } from "../home";
import vo from "../vo/v102.json";

const words = vo.words as unknown as Word[];

const EVE: Sky = { top: "#2a3a5c", mid: "#6a7a96", low: "#c9b8a8", sun: [800, 620], sunR: 30, sunCol: "#f6efe0", glow: "#d8c0a8" };
const LAMP = "255,200,140";

const LEO: Outfit = {
  ...JAKE,
  skin: "#E7B596",
  skinShade: "#C99478",
  hair: "#3a2618",
  beard: null,
  cap: "#3a2618",
  capShade: "#2a1b10",
  jacket: "#5c6f8a",
  jacketShade: "#475670",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  glove: null,
};
const LEO_HIKE: Outfit = { ...LEO, jacket: "#C2662E", jacketShade: "#9B4E20", cap: "#2C6E63", capShade: "#1f5249", boot: "#5a4030" };

const SIS: Outfit = {
  ...JAKE,
  skin: "#E2AE8C",
  skinShade: "#C48F6E",
  hair: "#3a2618",
  ponytail: "#3a2618",
  beard: null,
  cap: "#3a2618",
  capShade: "#2a1b10",
  jacket: "#2C6E63",
  jacketShade: "#1f5249",
  pants: "#4a4f57",
  pantsShade: "#363a40",
  glove: null,
};

const PAPER = "#f7f2e8";
const INK = "#2C3B2E";
const BOX = "#a0643a";

// Shoebox, lid off by k (screen coords, base centre).
const ShoeBox: React.FC<{ x: number; y: number; w: number; lid: number; boots?: boolean; dust?: number }> = ({ x, y, w, lid, boots = true, dust = 0 }) => {
  const h = w * 0.42;
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={0} cy={6} rx={w * 0.56} ry={18} fill="rgba(0,0,0,0.25)" />
      {boots && (
        <g transform={`translate(${-w * 0.33},${-h * 0.55})`}>
          <Boots x={0} y={0} s={w / 380} col="#8a5a32" />
        </g>
      )}
      <rect x={-w / 2} y={-h} width={w} height={h} rx={8} fill={BOX} />
      <rect x={-w / 2} y={-h} width={w} height={h * 0.12} fill="rgba(0,0,0,0.15)" />
      <rect x={-w * 0.16} y={-h * 0.7} width={w * 0.32} height={h * 0.34} rx={6} fill="#f2e6d0" />
      <g transform={`translate(${mix(0, w * 0.75, lid)},${mix(-h - 6, -h * 0.4, lid)}) rotate(${mix(0, 18, lid)})`}>
        <rect x={-w / 2 - 10} y={-h * 0.18} width={w + 20} height={h * 0.2} rx={8} fill="#b8794b" />
      </g>
      {dust > 0 && <rect x={-w / 2 - 10} y={-h * 1.18 - 6} width={w + 20} height={h * 0.05} fill="#d9d0c0" opacity={dust} />}
    </g>
  );
};

// Printed page with a cover photo look: dark green band, title, a few lines (screen coords, top-left).
const Doc: React.FC<{ x: number; y: number; w: number; rot?: number; title: string; sub: string; k?: number; tone?: string }> = ({ x, y, w, rot = 0, title, sub, k = 1, tone = "#34503f" }) => {
  const h = w * 1.29;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`} opacity={k}>
      <rect x={12} y={18} width={w} height={h} rx={12} fill="rgba(0,0,0,0.28)" />
      <rect x={0} y={0} width={w} height={h} rx={12} fill={PAPER} />
      <rect x={0} y={0} width={w} height={h * 0.5} rx={12} fill={tone} />
      <path d={`M0,${h * 0.42} L${w * 0.3},${h * 0.22} L${w * 0.5},${h * 0.34} L${w * 0.72},${h * 0.16} L${w},${h * 0.36} L${w},${h * 0.5} L0,${h * 0.5} Z`} fill="rgba(255,255,255,0.18)" />
      <text x={w * 0.08} y={h * 0.62} fontFamily="Fraunces" fontWeight={700} fontSize={w * 0.088} fill={INK}>
        {title}
      </text>
      <text x={w * 0.08} y={h * 0.7} fontFamily="Inter" fontWeight={600} fontSize={w * 0.048} fill="#5b625c">
        {sub}
      </text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={w * 0.08} y={h * (0.77 + i * 0.05)} width={w * (0.84 - (i % 2) * 0.2)} height={8} rx={4} fill="#d8d0c0" />
      ))}
    </g>
  );
};

// Trail map with three trails, the easy one highlighted (k).
const TrailPick: React.FC<{ x: number; y: number; w: number; k: number }> = ({ x, y, w, k }) => {
  const h = w * 0.9;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={12} y={18} width={w} height={h} rx={14} fill="rgba(0,0,0,0.25)" />
      <rect x={0} y={0} width={w} height={h} rx={14} fill={PAPER} />
      <text x={40} y={70} fontFamily="Barlow Condensed" fontWeight={800} fontSize={42} fill={INK} letterSpacing={2}>
        PICK YOUR FIRST TRAIL
      </text>
      {[
        ["EASY", "2.1 mi · 300 ft", "#3e7d4f"],
        ["MODERATE", "5.4 mi · 1,200 ft", "#b8892e"],
        ["HARD", "8.8 mi · 3,100 ft", "#a03a3a"],
      ].map(([a, b, c], i) => {
        const y0 = 130 + i * ((h - 160) / 3);
        const on = i === 0 ? k : 0;
        return (
          <g key={a}>
            <rect x={30} y={y0} width={w - 60} height={(h - 200) / 3} rx={12} fill={on > 0.5 ? "#e3efe2" : "#ebe4d6"} stroke={on > 0.5 ? "#3e7d4f" : "none"} strokeWidth={6} />
            <circle cx={80} cy={y0 + (h - 200) / 6} r={22} fill={c} />
            <text x={130} y={y0 + (h - 200) / 6 - 4} fontFamily="Barlow Condensed" fontWeight={800} fontSize={46} fill={INK}>
              {a}
            </text>
            <text x={130} y={y0 + (h - 200) / 6 + 40} fontFamily="Inter" fontWeight={600} fontSize={30} fill="#5b625c">
              {b}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// ============ S1 HOOK MEDIUM: last holiday, Leo opens a box of new boots (0 - 3.46) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.03, 1.1, t / 3.46), rot: hh.rot };
  const floorY = 1560;
  const lid = at(t, [0.8, 1.6], [0, 1], outExpo);
  const p: HikerProps = { x: 330, y: floorY, scale: 2.4, walk: 0, lean: 0.14, poles: false, handOverride: [110, 90], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={560} y={560} w={420} h={460} sky={EVE} uid="a" />
        <Room floorY={floorY} win={[560, 560, 420, 460]} lamp={[200, 600]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...p} outfit={LEO} expression="happy" noPack />
        </Subject>
        <Svg>
          <ShoeBox x={760} y={floorY - 10} w={400} lid={lid} />
          {/* wrapping paper on the floor */}
          <path d={`M480,${floorY + 30} l120,-40 l90,50 l-60,40 Z`} fill="#B83A55" />
          <path d={`M820,${floorY + 40} l110,-30 l40,60 l-120,20 Z`} fill="#B83A55" opacity={0.85} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={300} />
      </Plane>
      <Particles seed={1021} n={16} col="#ffe8c0" fall={8} />
      <Grade sunX={300} sunY={600} warm={LAMP} cool="40,40,70" />
      <Title text={"New hiking boots.\nHe never\nwore them."} t={t} t0={0} top={120} size={108} />
      <Chip text="Last year's gift" t={t} t0={1.4} x={60} y={600} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the box on a closet shelf, dust settling (3.46 - 5.26) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.8), rot: hh.rot };
  const dust = at(t, [3.6, 5.0], [0, 1]);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#3a2c22" />
          <rect x={-200} y={1240} width={1480} height={30} fill="#5a4535" />
          <rect x={-200} y={640} width={1480} height={30} fill="#5a4535" />
          <GadgetBox x={180} y={640} w={260} h={200} col="#6b7f8a" dust={1} />
          <GadgetBox x={880} y={640} w={240} h={160} col="#8a6b5a" dust={1} />
        </Svg>
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <ShoeBox x={560} y={1240} w={620} lid={0} boots={false} dust={dust} />
        </Subject>
      </Plane>
      <Particles seed={1022} n={22} col="#e8dcc8" fall={4} />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.65} />
      <Chip text="Never left the box" t={t} t0={3.6} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Leo's face, three questions he couldn't answer (5.26 - 9.54) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 4.28), rot: hh.rot };
  const s = 4.4;
  const seat = 1600;
  const p: HikerProps = { x: 600, y: seat + 182 * s, scale: s, walk: 0, lean: 0.04, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 2) * 1 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={8}>
        <WindowView x={520} y={240} w={620} h={700} sky={EVE} uid="c" />
        <Room floorY={1900} win={[520, 240, 620, 700]} lamp={[150, 400]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={LEO} expression="tired" noPack flip />
        </Subject>
      </Plane>
      <Particles seed={1023} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={500} warm={LAMP} cool="40,40,70" vignette={0.6} />
      <Chip text="Which trail?" t={t} t0={5.9} x={60} y={200} icon="x" big />
      <Chip text="What to pack?" t={t} t0={6.9} x={60} y={330} icon="x" big />
      <Chip text="How long will it take?" t={t} t0={7.8} x={60} y={460} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: this year, his sister hands him the printed plan (9.54 - 13.03) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.03, 1.08, lt / 3.49), rot: hh.rot };
  const floorY = 1600;
  const give = at(t, [10.3, 11.4], [0, 1], outExpo);
  const leo: HikerProps = { x: 300, y: floorY, scale: 2.6, walk: 0, lean: 0.04, poles: false, handOverride: [mix(20, 100, give), mix(60, -10, give)], breathe: Math.sin(t * 2) * 1.2 };
  const sis: HikerProps = { x: 800, y: floorY, scale: 2.5, walk: 0, lean: 0.06, poles: false, handOverride: [mix(60, 110, give), -10], breathe: Math.sin(t * 2 + 1) * 1.2 };
  const px = mix(640, 520, give);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={3}>
        <WindowView x={420} y={500} w={360} h={440} sky={EVE} uid="d" />
        <Room floorY={floorY} win={[420, 500, 360, 440]} lamp={[960, 600]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...leo} outfit={LEO} expression={give > 0.5 ? "happy" : "neutral"} noPack />
          <Person {...sis} outfit={SIS} expression="happy" noPack flip />
          {/* the printed pages, tied with a red ribbon */}
          <g transform={`translate(${px},${1180}) rotate(-6)`}>
            <rect x={-90} y={-120} width={180} height={232} rx={8} fill={PAPER} stroke="#d8d0c0" strokeWidth={3} />
            <rect x={-90} y={-120} width={180} height={100} rx={8} fill="#34503f" />
            <rect x={-12} y={-120} width={24} height={232} fill="#B83A55" />
            <rect x={-90} y={-12} width={180} height={22} fill="#B83A55" />
          </g>
        </Subject>
        <Svg>
          <ShoeBox x={560} y={floorY + 20} w={300} lid={1} />
        </Svg>
      </Plane>
      <Particles seed={1024} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={900} sunY={600} warm={LAMP} />
      <Chip text="This year: the plan too" t={t} t0={9.7} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the three documents: pick an easy trail, pack list, trip planner (13.03 - 19.15) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + mix(0, -20, lt / 6.12), y: hh.y, zoom: mix(1.0, 1.05, lt / 6.12), rot: hh.rot };
  const a = at(t, [13.1, 13.6], [0, 1], outExpo);
  const pick = at(t, [14.4, 14.8], [0, 1]);
  const b = at(t, [15.4, 15.9], [0, 1], outExpo);
  const c = at(t, [16.9, 17.4], [0, 1], outExpo);
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
          <g transform={`translate(0,${mix(300, 0, a)})`} opacity={a}>
            <Doc x={90} y={600} w={380} rot={-5} title="Beginner's" sub="Hiking Guide" />
            <TrailPick x={100} y={1020} w={480} k={pick} />
          </g>
          <g transform={`translate(${mix(400, 0, b)},0)`} opacity={b}>
            <g transform="translate(600,640) scale(0.68)"><PlanPage x={0} y={0} w={600} rows={[["Water", "2 liters"], ["Layers", "Rain shell"], ["Snacks", "Packed"]]} t={t} t0={15.9} gap={0.35} /></g>
          </g>
          <g transform={`translate(${mix(400, 0, c)},0)`} opacity={c}>
            <Doc x={640} y={1150} w={300} rot={4} title="Trip Planner" sub="One page per hike" tone="#4f6f8f" />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1025} n={8} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.45} />
      <Chip text="Guide: an easy first trail" t={t} t0={13.2} x={60} y={200} icon="check" big />
      <Chip text="Packing checklist" t={t} t0={15.5} x={60} y={330} icon="check" big />
      <Chip text="Trip planner to fill in" t={t} t0={17.0} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// Mud splashes on boots (screen coords near the feet).
const Mud: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g>
    {[[-40, -20, 34], [10, -40, 26], [50, -10, 30], [-10, 0, 40], [80, -30, 20]].map(([dx, dy, r], i) => (
      <ellipse key={i} cx={x + dx * s * 0.5} cy={y + dy * s * 0.5} rx={r * s * 0.9} ry={r * s * 0.5} fill="#9a7a50" opacity={0.95} />
    ))}
  </g>
);

// ============ S6 PAYOFF WIDE: two weeks later, Leo on the trail, boots muddy (19.15 - 21.44) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 24, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.04], outExpo), rot: hh.rot };
  const g = 1580;
  const s = 2.5;
  const p: HikerProps = { x: 400 + lt * 90, y: g, scale: s, phase: t * 5, walk: 0.8, lean: 0.1, poles: true, breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={g - 280} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} dirt="#6f5438" />
        <Svg>
          {[0, 1, 2, 3].map((i) => (
            <ellipse key={i} cx={150 + i * 260} cy={g + 30} rx={70} ry={14} fill="#5a3f28" opacity={0.8} />
          ))}
        </Svg>
        <Subject rimX={5}>
          <Person {...p} outfit={LEO_HIKE} expression="happy" />
          <Mud x={p.x} y={g - 20} s={s} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a1a" side="both" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.28} />
      <Particles seed={1026} n={20} leaves={FALL} fall={24} />
      <Grade sunX={790} sunY={560} />
      <Readout label="2 WEEKS LATER" value="Boots: muddy" ok={true} t={t} t0={19.3} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S7: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/beginner-hiker-bundle-card.jpg"
      photoH={760}
      spec="DIGITAL DOWNLOAD · 3 GUIDES IN ONE"
      name={
        <>
          Beginner Hiker
          <br />
          Bundle
        </>
      }
      nameSize={104}
      price="$16.99"
      save="Save this if you're buying a hiker a gift"
    />
  );
};

export const V102: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.51} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.46} to={5.31} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.46} />
    </Scene>
    <Scene from={5.26} to={9.59} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.26} />
    </Scene>
    <Scene from={9.54} to={13.08} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.54} />
    </Scene>
    <Scene from={13.03} to={19.2} fadeIn={0.08} fadeOut={0.1}>
      <S5 off={13.03} />
    </Scene>
    <Scene from={19.15} to={21.5} fadeIn={0.12} fadeOut={0.12}>
      <S6 off={19.15} />
    </Scene>
    <Scene from={21.35} to={27.5} fadeOut={0}>
      <S7 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.46, 1560],
        [3.46, 5.26, 1560],
        [5.26, 9.54, 1560],
        [9.54, 13.03, 1560],
        [13.03, 19.15, 1560],
        [19.15, 21.35, 1560],
      ]}
    />
  </AbsoluteFill>
);
