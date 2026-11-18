// V186: "The catwalk was pure ice." Short format (17.0 s, 42 words), cinematic C01 style.
// Product: Banff & Jasper — Trip Planning Guide (Canadian Rockies), $9.99 (live Shopify; Johnston Canyon is one of its 12 hikes).
// Advice (conservative): in winter the Johnston Canyon trail and its catwalks beside the frozen falls are often icy; sneakers slide,
// bring ice cleats. No numbers.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { WinterBackdrop } from "../winter";
import { BootClose } from "../icy";
import vo from "../vo/v186.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const GORGE: Sky = { top: "#35557c", mid: "#9db6cc", low: "#e4ebee", sun: [820, 300], sunR: 40, sunCol: "#fffcef", glow: "#eae6d6" };

const EMMA: Outfit = {
  ...JAKE,
  skin: "#EDC2A2",
  skinShade: "#CFA282",
  hair: "#b5793a",
  beard: null,
  cap: "#2F7F86",
  capShade: "#236068",
  jacket: "#D9443A",
  jacketShade: "#b0352d",
  pants: "#2f3338",
  pantsShade: "#22262a",
  pack: "#3E6E8E",
  packShade: "#2F5670",
  glove: "#2a2a2a",
  boot: "#e9e9e6",
  sole: "#bdbdb8",
};

// Grey limestone gorge walls (screen coords), with icicles on the ledges.
const Gorge: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-300,-200 L320,-200 Q260,300 300,700 Q240,1100 280,${y - 80} L-300,${y - 60} Z`} fill="#5b6268" />
    <path d={`M1400,-200 L760,-200 Q840,320 780,760 Q840,1100 800,${y - 120} L1400,${y - 100} Z`} fill="#4c5258" />
    {[300, 520, 760, 980].map((yy, i) => (
      <path key={i} d={`M-300,${yy} Q0,${yy - 30} ${260 + (i % 2) * 30},${yy + 10}`} stroke="#6e767c" strokeWidth={10} fill="none" />
    ))}
    {[380, 640, 900].map((yy, i) => (
      <path key={`r${i}`} d={`M1400,${yy} Q1000,${yy - 20} ${800 - (i % 2) * 20},${yy + 14}`} stroke="#5e656b" strokeWidth={10} fill="none" />
    ))}
    {Array.from({ length: 14 }, (_, i) => {
      const x = i < 7 ? 40 + i * 36 : 820 + (i - 7) * 40;
      const yy = i < 7 ? 520 : 650;
      return <path key={`i${i}`} d={`M${x - 8},${yy} L${x},${yy + 50 + (i % 3) * 24} L${x + 8},${yy} Z`} fill="#e6f2f8" opacity={0.9} />;
    })}
  </Svg>
);

// Frozen waterfall curtain at the back of the gorge.
const FrozenFalls: React.FC<{ x: number; top: number; bot: number; w: number; t: number }> = ({ x, top, bot, w, t }) => (
  <Svg>
    <path d={`M${x - w / 2},${top} Q${x - w / 2 - 30},${(top + bot) / 2} ${x - w / 2 - 50},${bot} L${x + w / 2 + 50},${bot} Q${x + w / 2 + 30},${(top + bot) / 2} ${x + w / 2},${top} Z`} fill="#cfe4ee" />
    {Array.from({ length: 9 }, (_, i) => {
      const xx = x - w / 2 + (i + 0.5) * (w / 9);
      return <path key={i} d={`M${xx},${top + 10} Q${xx - 10},${(top + bot) / 2} ${xx + (i % 2 ? 8 : -8)},${bot - 10}`} stroke={i % 2 ? "#a9cadb" : "#f4fbff"} strokeWidth={16} fill="none" strokeLinecap="round" opacity={0.9} />;
    })}
    <ellipse cx={x} cy={bot} rx={w / 2 + 90} ry={36} fill="#e9f3f7" />
    <ellipse cx={x + 20} cy={top + 120} rx={30} ry={80} fill="#ffffff" opacity={0.35 + 0.15 * Math.sin(t * 3)} />
  </Svg>
);

// Bolted catwalk along the wall: steel deck glazed with ice, railing posts (screen coords).
const Catwalk: React.FC<{ y: number; tilt?: number; ice?: number; t: number }> = ({ y, tilt = 0, ice = 1, t }) => {
  const yy = (x: number) => y + (x - 540) * tilt;
  return (
    <Svg>
      <path d={`M-300,${yy(-300)} L1400,${yy(1400)} L1400,${yy(1400) + 90} L-300,${yy(-300) + 90} Z`} fill="#6b5e50" />
      <path d={`M-300,${yy(-300)} L1400,${yy(1400)} L1400,${yy(1400) + 40} L-300,${yy(-300) + 40} Z`} fill="#b9d3df" opacity={ice} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${-100 + i * 300},${yy(-100 + i * 300) + 16} l160,${160 * tilt - 4}`} stroke="#ffffff" strokeWidth={8} strokeLinecap="round" opacity={ice * (0.55 + 0.35 * Math.sin(t * 5 + i))} />
      ))}
      <path d={`M-300,${yy(-300) + 90} L1400,${yy(1400) + 90} L1400,2400 L-300,2400 Z`} fill="#2b3036" />
      {/* railing on the drop side */}
      <path d={`M-300,${yy(-300) - 120} L1400,${yy(1400) - 120}`} stroke="#3a3f44" strokeWidth={10} />
      {Array.from({ length: 10 }, (_, i) => {
        const x = -260 + i * 180;
        return <line key={`p${i}`} x1={x} y1={yy(x) + 30} x2={x} y2={yy(x) - 120} stroke="#3a3f44" strokeWidth={10} />;
      })}
      <path d={`M-300,${yy(-300) - 118} L1400,${yy(1400) - 118}`} stroke="#eef7fb" strokeWidth={4} opacity={0.8 * ice} />
    </Svg>
  );
};

// ============ S1 HOOK WIDE: Emma walks the catwalk deep in the gorge (0 - 3.2) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.03, 1.1, t / 3.2), rot: hh.rot };
  const g = 1500;
  const ph = t * 3.2;
  const p: HikerProps = { x: 380 + t * 30, y: g + 30, scale: 2.0, phase: ph, walk: 0.7, lean: 0.04, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={GORGE} uid="a" treeY={1000} t={t} snow={1} />
      <Plane cam={cam} depth={0.7} blur={3}>
        <FrozenFalls x={560} top={560} bot={1300} w={260} t={t} />
      </Plane>
      <Plane cam={cam} depth={0.85} blur={1.5}>
        <Gorge y={1440} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Catwalk y={g + 40} t={t} />
        <Subject rimX={5} col="rgba(240,248,252,0.85)">
          <Person {...p} outfit={EMMA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Particles seed={1861} n={16} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={300} warm="232,240,246" cool="30,45,80" />
      <Title text={"The catwalk\nwas pure\nice."} t={t} t0={0} top={110} size={130} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: sneakers on the glazed deck (3.2 - 5.9) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.1, lt / 2.7), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#3f4a54" }}>
      <Plane cam={cam} depth={0.5} blur={10}>
        <Svg>
          <rect x={-300} y={0} width={1700} height={1200} fill="#58616a" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-300} y={1150} width={1700} height={1300} fill="#b9d3df" />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${-150 + i * 330},${1300 + (i % 2) * 180} l240,-10`} stroke="#ffffff" strokeWidth={12} strokeLinecap="round" opacity={0.6 + 0.3 * Math.sin(t * 5 + i)} />
          ))}
          <g transform="translate(40,-80)">
            <BootClose toe={0} heel={0} pants={EMMA.pants} pantsShade={EMMA.pantsShade} boot={EMMA.boot} sole={EMMA.sole} />
          </g>
        </Svg>
      </Plane>
      <Particles seed={1862} n={10} col="#ffffff" fall={10} bokeh />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm="222,232,242" cool="30,45,80" vignette={0.55} />
      <Chip text="Sneakers" t={t} t0={3.4} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: the frozen waterfall beside the icy catwalk (5.9 - 8.4) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y - lt * 10, zoom: mix(1.0, 1.07, lt / 2.5), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={GORGE} uid="c" treeY={900} t={t} snow={1} blur={3} />
      <Plane cam={cam} depth={0.85}>
        <Gorge y={1500} />
      </Plane>
      <Plane cam={cam} depth={0.95}>
        <FrozenFalls x={600} top={380} bot={1360} w={380} t={t} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Catwalk y={1440} tilt={-0.06} t={t} />
      </Plane>
      <Rays x={GORGE.sun[0]} y={GORGE.sun[1]} strength={0.22} col="240,248,255" />
      <Particles seed={1863} n={18} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={820} sunY={300} warm="232,240,246" cool="30,45,80" />
      <Chip text="Solid ice" t={t} t0={5.95} x={60} y={200} icon="x" big />
      <Chip text="Frozen waterfalls" t={t} t0={6.9} x={60} y={330} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: she slides at the first bend, grabs the rail (8.4 - 10.05) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const slide = at(t, [8.7, 9.2], [0, 1], outExpo);
  const hh = handheld(t, 0.35, at(t, [8.75, 8.85, 9.4], [0, 1, 0]) * 7);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.12, lt / 1.65), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = {
    x: 470 + slide * 90,
    y: g + 182 * 2.4 - 210 + slide * 20,
    scale: 2.4,
    walk: 0,
    lean: mix(0.03, -0.22, slide),
    poles: false,
    handOverride: [mix(30, 80, slide), mix(40, -60, slide)],
  };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={GORGE} uid="d" treeY={900} t={t} snow={1} blur={4} />
      <Plane cam={cam} depth={0.85} blur={3}>
        <Gorge y={1400} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Catwalk y={g + 200} tilt={0.04} t={t} />
        <Svg>
          {slide > 0 &&
            [0, 1, 2].map((i) => (
              <line key={i} x1={420 - i * 20} y1={g + 230 + i * 14} x2={420 - i * 20 - 200 * slide} y2={g + 226 + i * 14} stroke="#ffffff" strokeWidth={9} strokeLinecap="round" opacity={0.9} />
            ))}
        </Svg>
        <Subject rimX={5} col="rgba(240,248,252,0.85)">
          <Person {...p} outfit={EMMA} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Particles seed={1864} n={12} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={300} warm="226,234,244" cool="30,45,80" vignette={0.55} />
      <Chip text="The first bend" t={t} t0={8.9} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: ice cleats go on before the canyon (10.05 - 12.7) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.65), rot: hh.rot };
  const toe = at(t, [10.4, 10.9], [0, 1], outExpo);
  const heel = at(t, [11.0, 11.6], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={GORGE} uid="e" treeY={900} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={1200} width={1880} height={900} fill="#b9d3df" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${-60 + i * 420},${1420 + i * 50} l240,-10`} stroke="#ffffff" strokeWidth={12} strokeLinecap="round" opacity={0.6 + 0.3 * Math.sin(t * 6 + i)} />
          ))}
          <BootClose toe={toe} heel={heel} hand={at(t, [10.9, 11.05, 11.7, 12.0], [0, 1, 1, 0])} pants={EMMA.pants} pantsShade={EMMA.pantsShade} boot={EMMA.boot} sole={EMMA.sole} />
        </Svg>
      </Plane>
      <Particles seed={1865} n={12} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={500} warm="236,236,240" cool="30,45,80" vignette={0.5} />
      <Chip text="The rule" t={t} t0={10.1} x={60} y={200} icon="none" big />
      <Chip text="Bring ice cleats" t={t} t0={10.7} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/banff-jasper-trip-planning-guide.jpg"
      photoH={800}
      spec="30 PRINTABLE PAGES · 12 DAY HIKES"
      name={
        <>
          Banff & Jasper
          <br />
          Trip Planning Guide
        </>
      }
      nameSize={80}
      price="$9.99"
      save="Save this before your Banff winter trip"
    />
  );
};

export const V186: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.28} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.2} to={5.98} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.2} />
    </Scene>
    <Scene from={5.9} to={8.48} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.9} />
    </Scene>
    <Scene from={8.4} to={10.13} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={8.4} />
    </Scene>
    <Scene from={10.05} to={12.7} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={10.05} />
    </Scene>
    <Scene from={12.6} to={17.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.2, 1600],
        [3.2, 5.9, 1660],
        [5.9, 8.4, 1600],
        [8.4, 10.05, 1600],
        [10.05, 12.6, 1660],
      ]}
    />
  </AbsoluteFill>
);
