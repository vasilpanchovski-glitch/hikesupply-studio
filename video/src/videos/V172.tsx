// V172: "The tide came in. He was stuck." Short format (15.5 s, 40 words), cinematic C01 style.
// Product: Acadia National Park — Trip Planning Guide, $9.99 (live Shopify). End card: the real store cover, whole.
// Advice (NPS Acadia): the Bar Island sand bar is walkable only about 1.5 hours either side of low tide;
// check the tide chart before you go. If the tide covers it you wait for the next low tide.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { BootClose } from "../icy";
import { PlanPage } from "../home";
import { Desk } from "../trip";
import vo from "../vo/v172.json";

const words = vo.words as unknown as Word[];

// Grey-blue Maine afternoon over the bay.
const BAY: Sky = { top: "#4d6b8c", mid: "#a3b9c9", low: "#e7e2d6", sun: [780, 640], sunR: 40, sunCol: "#fff6e2", glow: "#f0d4a8" };
const SEA = "#3f6f80";
const SEA2 = "#2f5866";
const SAND = "#b9a27c";
const SAND2 = "#9c8662";

const DAN: Outfit = {
  ...JAKE,
  skin: "#D9A07A",
  skinShade: "#B98060",
  hair: "#3a2a1e",
  beard: "#3a2a1e",
  cap: "#3E5F7A",
  capShade: "#2d475c",
  jacket: "#C8962E",
  jacketShade: "#9c7220",
  pants: "#46504a",
  pantsShade: "#333b36",
  boot: "#5a3e2c",
  sole: "#231d19",
  pack: "#2f3a33",
  packShade: "#212923",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Far shore, Bar Island and the bay.
const CoastBackdrop: React.FC<{ cam: Cam; uid: string; y: number; blur?: number; t: number }> = ({ cam, uid, y, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={BAY} uid={uid} />
      <Clouds y={430} col="#f4efe6" seed={uid.charCodeAt(0)} drift={t * 10} opacity={0.55} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2.6 + blur}>
      <Ridge seed={83} base={y - 240} amp={180} scale={260} col="#6f8396" lit="#e8dccb" />
    </Plane>
    <Haze y={y - 360} h={300} col={BAY.low} opacity={0.6} />
    <Plane cam={cam} depth={0.3} blur={1.4 + blur}>
      <Svg>
        <rect x={-400} y={y - 90} width={1880} height={1600} fill={SEA2} />
        {/* Bar Island: wooded hump on the right */}
        <path d={`M520,${y - 80} Q640,${y - 300} 820,${y - 320} Q1020,${y - 300} 1300,${y - 80} Z`} fill="#2f4a3a" />
        {Array.from({ length: 9 }, (_, i) => (
          <Pine key={i} x={600 + i * 70} y={y - 90 - Math.sin((i / 8) * Math.PI) * 200} h={130} c="#2c4a38" c2="#203a2b" />
        ))}
      </Svg>
    </Plane>
    <Haze y={y - 160} h={180} col={BAY.low} opacity={0.35} />
  </>
);

// Gravel bar running away from camera, sea closing in from both sides. k: 0 dry, 1 covered.
const Bar: React.FC<{ y: number; k: number; t: number }> = ({ y, k, t }) => {
  const half = mix(380, 40, k); // half-width at the bottom of the frame
  const far = mix(70, 0, k);
  return (
    <Svg>
      <rect x={-300} y={y} width={1680} height={1400} fill={SEA} />
      <path d={`M${540 - far},${y} L${540 + far},${y} L${540 + half + 300},2000 L${540 - half - 300},2000 Z`} fill={SAND} opacity={1 - k * 0.6} />
      <path d={`M${540 - far * 0.6},${y} L${540 + far * 0.6},${y} L${540 + half},2000 L${540 - half},2000 Z`} fill={SAND2} opacity={0.5 * (1 - k)} />
      {Array.from({ length: 10 }, (_, i) => {
        const yy = y + 40 + i * 70 + ((t * 30) % 70);
        return <path key={i} d={`M-200,${yy} Q200,${yy - 10} 540,${yy} T1300,${yy}`} stroke="#9fc3cf" strokeWidth={3} fill="none" opacity={0.35} />;
      })}
    </Svg>
  );
};

// ============ S1 HOOK MEDIUM: Dan on the bar as the sea closes over it (0 - 2.93) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, t / 2.93), rot: hh.rot };
  const g = 1560;
  const k = at(t, [0, 2.9], [0.35, 0.85]);
  const p: HikerProps = { x: 520, y: g, scale: 2.3, phase: 0, walk: 0, lean: 0, poles: false, breathe: Math.sin(t * 4) * 3 };
  return (
    <AbsoluteFill>
      <CoastBackdrop cam={cam} uid="a" y={1180} t={t} />
      <Plane cam={cam} depth={1}>
        <Bar y={1180} k={k} t={t} />
        <Subject rimX={5} col="rgba(255,236,200,0.9)">
          <Person {...p} outfit={DAN} expression={t > 1.2 ? "tired" : "neutral"} />
          {/* water around his ankles */}
          <ellipse cx={p.x} cy={g + 6} rx={150} ry={18} fill={SEA} opacity={at(t, [1.2, 2.4], [0, 0.85])} />
        </Subject>
      </Plane>
      <Rays x={BAY.sun[0]} y={BAY.sun[1]} strength={0.25} col="255,236,200" />
      <Particles seed={1721} n={14} col="#ffffff" bokeh fall={-4} />
      <LowScrim />
      <Grade sunX={780} sunY={640} warm="255,226,190" cool="40,70,100" />
      <Title text={"The tide\ncame in.\nHe was stuck."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: boots, the sea running over the path (2.93 - 5.715) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y - 30, zoom: mix(1.0, 1.07, lt / 2.8), rot: hh.rot };
  const lvl = mix(1330, 1180, at(lt, [0, 2.6], [0, 1]));
  return (
    <AbsoluteFill>
      <CoastBackdrop cam={cam} uid="b" y={1000} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-300} y={1150} width={1680} height={900} fill={SAND2} />
        </Svg>
        <Subject rimX={5} col="rgba(255,226,190,0.85)">
          <Svg>
            <g transform="translate(60,0)">
              <BootClose toe={0} heel={0} pants={DAN.pants} pantsShade={DAN.pantsShade} boot={DAN.boot} sole={DAN.sole} y={0} glove={null} />
            </g>
          </Svg>
        </Subject>
        <Svg>
          <rect x={-300} y={lvl} width={1680} height={1000} fill={SEA} opacity={0.82} />
          {Array.from({ length: 6 }, (_, i) => {
            const yy = lvl + 10 + i * 60;
            const sh = Math.sin(t * 2 + i) * 30;
            return <path key={i} d={`M-200,${yy} Q${200 + sh},${yy - 14} 540,${yy} T1300,${yy}`} stroke="#cfe4ea" strokeWidth={i === 0 ? 8 : 3} fill="none" opacity={i === 0 ? 0.8 : 0.35} />;
          })}
        </Svg>
      </Plane>
      <Particles seed={1722} n={12} col="#ffffff" bokeh fall={-3} />
      <Grade sunX={780} sunY={640} warm="255,214,180" cool="40,70,110" vignette={0.55} />
      <Readout label="LOW TIDE" value="11:40 AM" ok={null} t={t} t0={3.1} x={60} y={170} />
      <Readout label="WALKING BACK" value="2:30 PM" ok={false} t={t} t0={3.9} x={60} y={420} pulseAt={3.9} />
      <Chip text="Path under the sea" t={t} t0={4.7} x={60} y={680} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the plan with the tide chart, the safe window (5.715 - 10.95) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.9], [1.1, 1.02], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <Svg>
            <g transform="translate(135,520) scale(1.2)">
              <PlanPage
                x={0}
                y={0}
                w={600}
                rows={[
                  ["Low tide (tide chart)", "11:40 AM"],
                  ["Cross no earlier than", "10:10 AM"],
                  ["Back on shore by", "1:10 PM"],
                ]}
                t={t}
                t0={6.6}
                gap={1.1}
              />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1723} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="Within 1.5 h of low tide" t={t} t0={6.2} x={60} y={190} icon="check" big />
      <Chip text="Check the tide chart first" t={t} t0={9.2} x={60} y={320} icon="check" big />
    </AbsoluteFill>
  );
};

const S4: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/acadia-national-park-trip-planning-guide-cover-cut.png"
      cutoutH={800}
      spec="30-PAGE TRIP PLANNING GUIDE · DOWNLOAD"
      name={
        <>
          Acadia National Park
          <br />
          Trip Planning Guide
        </>
      }
      nameSize={72}
      price="$9.99"
      save="Save this before Acadia"
    />
  );
};

export const V172: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.0} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.93} to={5.8} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={2.93} />
    </Scene>
    <Scene from={5.715} to={11.05} fadeIn={0.06} fadeOut={0.12}>
      <S3 off={5.715} />
    </Scene>
    <Scene from={10.95} to={15.5} fadeOut={0}>
      <S4 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.93, 1600],
        [2.93, 5.715, 1600],
        [5.715, 10.95, 1600],
      ]}
    />
  </AbsoluteFill>
);
