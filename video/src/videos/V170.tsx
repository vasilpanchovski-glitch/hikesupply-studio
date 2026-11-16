// V170: "3 miles. In snow, 3 hours." Short format (16.5 s, 44 words), cinematic C01 style.
// Product: Hiking Trip Planner, $5.99 (live Shopify). End card uses the boxed planner photo (as in V42B).
// Advice (conservative): fresh snow can make the same miles take far longer; plan extra time (double as a rule of thumb)
// and set a turnaround time before the start.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { WinterBackdrop, FrostTrail, SNOW, SNOW2 } from "../winter";
import { BootClose } from "../icy";
import { PlanPage } from "../home";
import { Desk } from "../trip";
import vo from "../vo/v170.json";

const words = vo.words as unknown as Word[];

// Late afternoon, the sun already low over the ridge.
const LOW: Sky = { top: "#3e5a80", mid: "#d8a07a", low: "#ffd4a0", sun: [820, 900], sunR: 62, sunCol: "#fff0d0", glow: "#ffad6a" };

const MAYA: Outfit = {
  ...GUIDE,
  skin: "#E8B48E",
  skinShade: "#C98F6C",
  hair: "#2b1d16",
  ponytail: "#2b1d16",
  beard: null,
  cap: "#2F7F86",
  capShade: "#236068",
  jacket: "#B8452E",
  jacketShade: "#8E3322",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  boot: "#5a3e2c",
  sole: "#231d19",
  pack: "#3E4F5C",
  packShade: "#2C3943",
  glove: "#2f343a",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// Deep fresh snow drifts over the ground line y (screen coords). Covers boots up to the shin.
const Drift: React.FC<{ y: number; k?: number; seed?: number }> = ({ y, k = 1, seed = 1 }) => (
  <g>
    {Array.from({ length: 12 }, (_, i) => {
      const x = -160 + i * 120 + ((i * 37 * seed) % 50);
      return <ellipse key={i} cx={x} cy={y + ((i * 13) % 20) * k} rx={(110 + (i % 3) * 30) * k} ry={(44 + (i % 2) * 14) * k} fill={i % 3 === 0 ? SNOW2 : SNOW} />;
    })}
    <rect x={-200} y={y + 20 * k} width={1480} height={900} fill={SNOW} />
    {Array.from({ length: 8 }, (_, i) => (
      <ellipse key={`h${i}`} cx={-40 + i * 150 + ((i * 29) % 40)} cy={y + 60 * k + (i % 2) * 40} rx={50 * k} ry={10 * k} fill="#c9d6e0" opacity={0.7} />
    ))}
  </g>
);

// ============ S1 HOOK MEDIUM: Maya pushes through knee-deep snow, sun dropping (0 - 3.44) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.04, 1.1, t / 3.44), rot: hh.rot };
  const g = 1500;
  const ph = t * 2.4;
  const p: HikerProps = { x: 430 + t * 26, y: g + 20, scale: 2.3, phase: ph, walk: 0.5, lean: 0.14, poles: true, breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={LOW} uid="a" treeY={g - 220} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,214,170,0.9)">
          <Person {...p} outfit={MAYA} expression={t > 1.4 ? "tired" : "neutral"} />
        </Subject>
        <Svg>
          {/* postholes behind her */}
          {[0, 1, 2, 3].map((i) => (
            <ellipse key={i} cx={p.x - 160 - i * 110} cy={g - 6 + i * 4} rx={34} ry={12} fill="#9fb2c2" />
          ))}
          <Drift y={g - 46} k={1} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24323a" side="left" />
      </Plane>
      <Rays x={LOW.sun[0]} y={LOW.sun[1]} strength={0.3} col="255,210,160" />
      <Particles seed={1701} n={22} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={820} sunY={900} warm="255,200,150" cool="40,60,90" />
      <Title text={"3 miles.\nIn snow,\n3 hours."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the boot sinks to the shin, the clock and the low sun (3.44 - 6.73) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y - 30, zoom: mix(1.0, 1.07, lt / 3.3), rot: hh.rot };
  // the boot lifts out and plunges back in, twice
  const cyc = (lt * 0.75) % 1;
  const lift = Math.max(0, Math.sin(cyc * Math.PI * 2)) * 150 * at(lt, [0, 0.3], [0, 1]);
  const sink = 70 - lift * 0.9;
  const puff = cyc > 0.5 ? (cyc - 0.5) * 2 : 0;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={LOW} uid="b" treeY={1150} blur={12} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,210,160,0.9)">
          <Svg>
            <g transform="translate(60,0)">
              <BootClose toe={0} heel={0} pants={MAYA.pants} pantsShade={MAYA.pantsShade} boot={MAYA.boot} sole={MAYA.sole} y={sink} glove={null} />
            </g>
          </Svg>
        </Subject>
        <Svg>
          <Drift y={1250} k={2} seed={3} />
          {puff > 0 && puff < 1 && (
            <g opacity={1 - puff}>
              {Array.from({ length: 10 }, (_, i) => (
                <circle key={i} cx={420 + i * 60} cy={1240 - Math.sin((i / 9) * Math.PI) * 140 * puff} r={14 - (i % 3) * 3} fill="#ffffff" />
              ))}
            </g>
          )}
        </Svg>
      </Plane>
      <Rays x={820} y={900} strength={0.35} col="255,200,150" />
      <Particles seed={1702} n={14} col="#ffffff" fall={12} />
      <Grade sunX={820} sunY={900} warm="255,196,140" cool="40,60,100" vignette={0.55} />
      <Readout label="PLANNED" value="90 MIN" ok={null} t={t} t0={3.6} x={60} y={170} />
      <Readout label="IT TOOK" value="3 HRS" ok={false} t={t} t0={4.6} x={60} y={420} pulseAt={4.6} />
      <Chip text="Sun getting low" t={t} t0={5.9} x={60} y={680} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: at home, the plan: double the time, turnaround set (6.73 - 11.95) ============
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
            <g transform="translate(135,470) scale(1.2)">
              <PlanPage
                x={0}
                y={0}
                w={600}
                rows={[
                  ["Map distance", "3 mi · 4.8 km"],
                  ["Fresh snow? Double it", "3 hours, not 1.5"],
                  ["Turnaround time", "2:00 PM, firm"],
                ]}
                t={t}
                t0={7.6}
                gap={1.25}
              />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1703} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="Snow: plan double the time" t={t} t0={7.3} x={60} y={190} icon="check" big />
      <Chip text="Turnaround time before you start" t={t} t0={9.8} x={60} y={320} icon="check" big />
    </AbsoluteFill>
  );
};

const S4: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-trip-planner-card.jpg"
      photoH={760}
      spec="DIGITAL DOWNLOAD · PRINTABLE PLANNER"
      name={
        <>
          Hiking Trip
          <br />
          Planner
        </>
      }
      nameSize={100}
      price="$5.99"
      save="Save this before your next winter hike"
    />
  );
};

export const V170: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.5} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.44} to={6.83} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={3.44} />
    </Scene>
    <Scene from={6.73} to={12.05} fadeIn={0.06} fadeOut={0.12}>
      <S3 off={6.73} />
    </Scene>
    <Scene from={11.95} to={16.5} fadeOut={0}>
      <S4 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.44, 1600],
        [3.44, 6.73, 1600],
        [6.73, 11.95, 1600],
      ]}
    />
  </AbsoluteFill>
);
