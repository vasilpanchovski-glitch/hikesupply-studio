// V203: "Every step, she sank to her knee." Short format (16.0 s, 44 words), cinematic C01 style, deep fresh snow.
// Product: Winter Hiking Guide & Cold-Weather Checklist, $7.99 (live Shopify). End card: the real store cover, cut out.
// Advice (conservative, widely taught, no numbers): when the snow is deeper than your boot tops, wear snowshoes or pick a
// packed trail. Sweating through layers in the cold is a real risk, shown only as "soaked in sweat".
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { WinterBackdrop, FrostTrail, SNOW, SNOW2 } from "../winter";
import { BootClose } from "../icy";
import vo from "../vo/v203.json";

const words = vo.words as unknown as Word[];

// Bright cold midday, low winter sun.
const COLD: Sky = { top: "#3a6a98", mid: "#a8c2d8", low: "#eef0ea", sun: [780, 620], sunR: 48, sunCol: "#fffdf2", glow: "#f6ecd6" };

const AVA: Outfit = {
  ...GUIDE,
  skin: "#C98E6A",
  skinShade: "#A9714F",
  hair: "#1f1612",
  ponytail: "#1f1612",
  beard: null,
  cap: "#6B3F7A",
  capShade: "#52305e",
  jacket: "#2F7A6A",
  jacketShade: "#235c50",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  boot: "#6a4a32",
  sole: "#231d19",
  pack: "#C8803A",
  packShade: "#9e6429",
  glove: "#2f343a",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.6) 40%, rgba(12,22,28,0.6) 72%, rgba(12,22,28,0) 100%)" }} />
);

// Deep fresh snow over the ground line y (screen coords).
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

const Snowshoes: React.FC<{ p: HikerProps }> = ({ p }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)}>
      {g.legs.map((l, i) => (
        <g key={i}>
          <ellipse cx={l.foot[0] + 6} cy={l.foot[1] + 4} rx={58} ry={13} fill="#2c3238" />
          <ellipse cx={l.foot[0] + 6} cy={l.foot[1] + 4} rx={50} ry={8} fill="#5f6b74" />
          <path d={`M${l.foot[0] - 40},${l.foot[1] + 4} L${l.foot[0] + 52},${l.foot[1] + 4}`} stroke="#c23a32" strokeWidth={4} />
        </g>
      ))}
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Ava sinks to the knee with every step (0 - 3.69) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.04, 1.1, t / 3.69), rot: hh.rot };
  const g = 1500;
  const ph = t * 2.2;
  const p: HikerProps = { x: 680 + t * 18, y: g + 60, scale: 2.3, phase: ph, walk: 0.5, lean: 0.16, poles: true, breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={COLD} uid="a" treeY={g - 220} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,240,215,0.85)">
          <Person {...p} outfit={AVA} expression={t > 1.6 ? "tired" : "neutral"} />
        </Subject>
        <Svg>
          <Drift y={g - 150} k={1} />
          {[0, 1, 2, 3].map((i) => (
            <ellipse key={i} cx={p.x - 170 - i * 110} cy={g - 140 + i * 4} rx={34} ry={12} fill="#9fb2c2" />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24323a" side="left" />
      </Plane>
      <Rays x={COLD.sun[0]} y={COLD.sun[1]} strength={0.26} col="255,246,225" />
      <Particles seed={2031} n={20} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={780} sunY={620} warm="255,240,220" cool="40,60,90" />
      <Title text={"Every step,\nshe sank\nto her knee."} t={t} t0={0} top={110} size={124} />
      <Chip text="Fresh snow, looked light" t={t} t0={1.0} x={60} y={640} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the boot plunges in to the shin, one mile, one hour (3.69 - 5.45) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y - 30, zoom: mix(1.0, 1.07, lt / 1.76), rot: hh.rot };
  const cyc = (lt * 0.9) % 1;
  const lift = Math.max(0, Math.sin(cyc * Math.PI * 2)) * 150 * at(lt, [0, 0.3], [0, 1]);
  const sink = 70 - lift * 0.9;
  const puff = cyc > 0.5 ? (cyc - 0.5) * 2 : 0;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={COLD} uid="b" treeY={1150} blur={12} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,240,215,0.85)">
          <Svg>
            <g transform="translate(60,0)">
              <BootClose toe={0} heel={0} pants={AVA.pants} pantsShade={AVA.pantsShade} boot={AVA.boot} sole={AVA.sole} y={sink} glove={null} />
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
      <Rays x={780} y={620} strength={0.3} col="255,246,225" />
      <Particles seed={2032} n={14} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={780} sunY={620} warm="255,240,220" cool="40,60,100" vignette={0.55} />
      <Readout label="DISTANCE" value="1 MILE" ok={null} t={t} t0={3.8} x={60} y={170} />
      <Readout label="IT TOOK" value="1 HOUR" ok={false} t={t} t0={4.6} x={60} y={420} pulseAt={4.6} />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Ava's face, flushed and soaked in sweat in the cold (5.45 - 6.73) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.28), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 540, y: 1700 + 182 * s - 80, scale: s, walk: 0, lean: 0.06, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 5) * 3 };
  const [hx, hy] = hikerGeometry(p).head;
  const drop = (i: number) => ((lt * 0.9 + i * 0.37) % 1);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={COLD} uid="c" treeY={1250} blur={12} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,240,215,0.85)">
          <Person {...p} outfit={AVA} expression="tired" />
          <g transform={hikerTransform(p)}>
            {[0, 1, 2].map((i) => (
              <ellipse key={i} cx={hx - 30 + i * 34} cy={hy - 30 + drop(i) * 50} rx={4} ry={6} fill="#dff2ff" opacity={0.9 * (1 - drop(i))} />
            ))}
            <ellipse cx={hx + 18} cy={hy + 10} rx={12} ry={6} fill="#e0705a" opacity={0.35} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={2033} n={16} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={780} sunY={620} warm="255,240,220" cool="40,60,90" vignette={0.6} />
      <Chip text="Soaked in sweat" t={t} t0={5.55} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the rule, the snow line above the boot top (6.73 - 9.48) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y - 30, zoom: mix(1.0, 1.05, lt / 2.75), rot: hh.rot };
  const rise = at(t, [7.7, 8.6], [0, 1]);
  const snowTop = mix(1240, 980, rise);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={COLD} uid="d" treeY={1150} blur={12} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,240,215,0.85)">
          <Svg>
            <g transform="translate(60,0)">
              <BootClose toe={0} heel={0} pants={AVA.pants} pantsShade={AVA.pantsShade} boot={AVA.boot} sole={AVA.sole} y={0} glove={null} />
            </g>
          </Svg>
        </Subject>
        <Svg>
          {/* cut-away snow layer: see the boot inside it */}
          <rect x={-200} y={snowTop} width={1480} height={1200} fill="#eef3f7" opacity={0.72} />
          <path d={`M-200,${snowTop} Q300,${snowTop - 24} 640,${snowTop} T1480,${snowTop}`} stroke="#ffffff" strokeWidth={10} fill="none" />
          {/* boot-top reference line */}
          <path d="M140,1060 L1000,1060" stroke="#c23a32" strokeWidth={8} strokeDasharray="34 22" opacity={at(t, [7.2, 7.5], [0, 1])} />
        </Svg>
      </Plane>
      <Rays x={780} y={620} strength={0.25} col="255,246,225" />
      <Particles seed={2034} n={12} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={780} sunY={620} warm="255,240,220" cool="40,60,100" vignette={0.55} />
      <Chip text="The rule" t={t} t0={6.85} x={60} y={200} icon="none" big />
      <Chip text="Snow over your boot tops?" t={t} t0={8.4} x={60} y={330} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: on snowshoes along a packed trail, easy steps (9.48 - 11.49) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 22, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.0), rot: hh.rot };
  const g = 1460;
  const ph = t * 3;
  const p: HikerProps = { x: 360 + lt * 120, y: g, scale: 2.4, phase: ph, walk: 0.7, lean: 0.05, poles: true, breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={COLD} uid="e" treeY={g - 200} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <rect x={-400} y={g + 10} width={1880} height={1000} fill={SNOW} />
          <path d={`M-400,${g + 40} L1480,${g + 40} L1480,${g + 150} L-400,${g + 150} Z`} fill="#dfe7ec" />
          {Array.from({ length: 14 }, (_, i) => (
            <ellipse key={i} cx={-360 + i * 70} cy={g + 80 + (i % 2) * 30} rx={44} ry={9} fill="#c3cfd6" opacity={-360 + i * 70 < p.x - 80 ? 1 : 0} />
          ))}
        </Svg>
        <Subject rimX={6} col="rgba(255,240,215,0.85)">
          <Person {...p} outfit={AVA} expression="happy" />
          <Snowshoes p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24323a" side="right" />
      </Plane>
      <Rays x={COLD.sun[0]} y={COLD.sun[1]} strength={0.32} col="255,246,225" />
      <Particles seed={2035} n={16} col="#ffffff" bokeh />
      <LowScrim />
      <Grade sunX={780} sunY={620} warm="255,240,220" cool="40,60,90" />
      <Chip text="Wear snowshoes" t={t} t0={9.6} x={60} y={200} icon="check" big />
      <Chip text="or pick a packed trail" t={t} t0={10.5} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/winter-hiking-guide-cold-weather-checklist-cover-cut.png"
      cutoutH={800}
      spec="22 PRINTABLE PAGES · COLD-WEATHER CHECKLIST"
      name={
        <>
          Winter Hiking
          <br />
          Guide
        </>
      }
      nameSize={100}
      price="$7.99"
      save="Save this for winter"
    />
  );
};

export const V203: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.77} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.69} to={5.53} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.69} />
    </Scene>
    <Scene from={5.45} to={6.81} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.45} />
    </Scene>
    <Scene from={6.73} to={9.56} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={6.73} />
    </Scene>
    <Scene from={9.48} to={11.59} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.48} />
    </Scene>
    <Scene from={11.49} to={16.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.69, 1600],
        [3.69, 6.73, 1600],
        [6.73, 11.49, 1600],
      ]}
    />
  </AbsoluteFill>
);
