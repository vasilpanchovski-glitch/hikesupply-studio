// V184: "Put them on before you slip." Short format (15.8 s, 41 words), cinematic C01 style.
// Product: Icy Trail Kit — Chain Ice Cleats + Merino Wool Hiking Socks, $39.99 (live Shopify). End card: our real cleats and
// socks cut-outs (one pair of each, as in the kit).
// Advice (conservative): traction in the pack does not help; when the trail starts to shine, stop and put it on before the first slip.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { FrostTrail, WinterBackdrop } from "../winter";
import { BootClose, CleatBag } from "../icy";
import vo from "../vo/v184.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const MORN: Sky = { top: "#3a6fa6", mid: "#a4c6df", low: "#eef3f0", sun: [760, 520], sunR: 50, sunCol: "#fffef4", glow: "#f6f0da" };
const SHADE: Sky = { top: "#33507a", mid: "#8ea3bb", low: "#d3dbe2", sun: [860, 700], sunR: 40, sunCol: "#fff6e6", glow: "#e9dcc4" };

const JK: Outfit = {
  ...JAKE,
  skin: "#E2AE88",
  skinShade: "#C48F6A",
  hair: "#5a3a22",
  beard: "#5a3a22",
  cap: "#2E4A6B",
  capShade: "#223a55",
  jacket: "#3E7D4F",
  jacketShade: "#2f6040",
  pants: "#3d4148",
  pantsShade: "#2c2f35",
  pack: "#B5553A",
  packShade: "#8E3F2A",
  glove: "#2a2a2a",
};

// Close-up trail surface: packed snow turning to shiny ice (k 0..1), screen coords.
const IceRuts: React.FC<{ k: number; y?: number; t: number }> = ({ k, y = 1100, t }) => (
  <Svg>
    <path d={`M-300,${y} L1400,${y - 60} L1400,2400 L-300,2400 Z`} fill="#dfe6ea" />
    <path d={`M-300,${y} L1400,${y - 60} L1400,2400 L-300,2400 Z`} fill="#a9c2cf" opacity={k} />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M-300,${y + 180 + i * 260} Q540,${y + 120 + i * 260} 1400,${y + 140 + i * 250}`} stroke={k > 0.5 ? "#7ea1b5" : "#c4ced4"} strokeWidth={60 - i * 8} fill="none" strokeLinecap="round" />
    ))}
    {[0, 1, 2, 3].map((i) => (
      <path key={`s${i}`} d={`M${-200 + i * 330},${y + 160 + (i % 3) * 230} l240,-12`} stroke="#ffffff" strokeWidth={12} strokeLinecap="round" opacity={k * (0.6 + 0.35 * Math.sin(t * 5 + i))} />
    ))}
  </Svg>
);

// ============ S1 HOOK WIDE: Jake hikes the snowy trail, cleats bag clipped to his pack (0 - 2.2) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.09, t / 2.2), rot: hh.rot };
  const g = 1540;
  const ph = t * 3;
  const p: HikerProps = { x: 470 + t * 40, y: g + 40, scale: 2.3, phase: ph, walk: 0.7, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={MORN} uid="a" treeY={g - 220} t={t} snow={0.9} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={JK} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={MORN.sun[0]} y={MORN.sun[1]} strength={0.28} col="255,248,230" />
      <Particles seed={1841} n={18} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={520} warm="252,244,228" cool="40,60,90" />
      <Title text={"Put them on\nbefore you\nslip."} t={t} t0={0} top={110} size={130} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the cleats ride in their bag, strapped on the pack (2.2 - 4.3) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const sway = Math.sin(t * 6) * 3;
  const cam: Cam = { x: hh.x, y: hh.y + Math.sin(t * 6) * 4, zoom: mix(1.04, 1.1, lt / 2.1), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={MORN} uid="b" treeY={900} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* back of the pack, filling the frame */}
          <path d="M140,2000 L170,820 Q180,640 380,610 L700,610 Q900,640 910,820 L940,2000 Z" fill={JK.pack} />
          <path d="M260,1000 L820,1000 L840,1500 L240,1500 Z" fill={JK.packShade} />
          <path d="M240,760 Q540,700 840,760" stroke={JK.packShade} strokeWidth={22} fill="none" />
          {/* compression straps holding the bag */}
          <g transform={`rotate(${sway} 540 1180)`}>
            <CleatBag x={540} y={1400} s={2.6} />
          </g>
          <rect x={200} y={1150} width={680} height={36} rx={10} fill="#2b2b2b" />
          <rect x={500} y={1140} width={80} height={56} rx={8} fill="#5a5f64" />
          <rect x={210} y={1320} width={660} height={36} rx={10} fill="#2b2b2b" />
        </Svg>
      </Plane>
      <Particles seed={1842} n={12} col="#ffffff" fall={8} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={520} warm="252,244,228" cool="40,60,90" vignette={0.55} />
      <Chip text="Saved for the icy part" t={t} t0={2.4} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: shiny ice in the shade, his boot skids (4.3 - 5.9) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const slip = at(t, [4.8, 5.1], [0, 1]);
  const hh = handheld(t, 0.35, at(t, [4.95, 5.05, 5.6], [0, 1, 0]) * 6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 1.6), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#40566c" }}>
      <Plane cam={cam} depth={0.5} blur={10}>
        <Svg>
          <rect x={-300} y={0} width={1700} height={1200} fill="#5d6e85" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <IceRuts k={1} y={1080} t={t} />
        <Svg>
          <g transform={`translate(${slip * 180},${-120 - slip * 8}) rotate(${-slip * 10} 520 1240) scale(0.9) translate(60,60)`}>
            <BootClose toe={0} heel={0} pants={JK.pants} pantsShade={JK.pantsShade} boot={JK.boot} sole={JK.sole} />
          </g>
          {slip > 0 &&
            [0, 1, 2].map((i) => (
              <line key={i} x1={240 - i * 20} y1={1260 + i * 16} x2={240 - i * 20 - 230 * slip} y2={1262 + i * 16} stroke="#ffffff" strokeWidth={10} strokeLinecap="round" opacity={0.9} />
            ))}
        </Svg>
      </Plane>
      <Particles seed={1843} n={10} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={700} sunY={500} warm="210,222,240" cool="30,45,80" vignette={0.55} />
      <Chip text="The ice came first" t={t} t0={4.5} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the trail ahead shines, Jake stops (5.9 - 8.4) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.5), rot: hh.rot };
  const g = 1500;
  const ph = 8.0 * 3;
  const p: HikerProps = { x: 300, y: g + 182 * 2.3 - 200, scale: 2.3, phase: ph, walk: 0, lean: -0.03, poles: false, handOverride: [30, 40], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={SHADE} uid="d" treeY={g - 220} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <path d={`M420,${g + 20} L1400,${g - 20} L1400,${g + 260} L380,${g + 300} Z`} fill="#b8cfdb" opacity={0.95} />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${520 + i * 200},${g + 80 + (i % 2) * 90} l150,-8`} stroke="#ffffff" strokeWidth={10} strokeLinecap="round" opacity={0.5 + 0.4 * Math.sin(t * 5 + i)} />
          ))}
        </Svg>
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={JK} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Particles seed={1844} n={14} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={860} sunY={700} warm="230,232,240" cool="30,45,80" />
      <Chip text="The rule" t={t} t0={6.0} x={60} y={200} icon="none" big />
      <Chip text="The trail shines" t={t} t0={7.5} x={60} y={330} icon="none" big />
      <Chip text="Stop" t={t} t0={8.0} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: cleats go on, toe loop then heel (8.4 - 11.15) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.75), rot: hh.rot };
  const toe = at(t, [8.6, 9.1], [0, 1], outExpo);
  const heel = at(t, [9.3, 9.9], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={SHADE} uid="e" treeY={900} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={1200} width={1880} height={900} fill="#b0c6d2" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${-60 + i * 420},${1420 + i * 50} l240,-10`} stroke="#ffffff" strokeWidth={12} strokeLinecap="round" opacity={0.6 + 0.3 * Math.sin(t * 6 + i)} />
          ))}
          <BootClose toe={toe} heel={heel} hand={at(t, [9.1, 9.25, 10.0, 10.3], [0, 1, 1, 0])} pants={JK.pants} pantsShade={JK.pantsShade} boot={JK.boot} sole={JK.sole} />
        </Svg>
      </Plane>
      <Particles seed={1845} n={12} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={700} warm="230,226,236" cool="30,45,80" vignette={0.5} />
      <Chip text="Traction on" t={t} t0={8.7} x={60} y={200} icon="check" big />
      <Chip text="Before the first slip" t={t} t0={9.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/icy-trail-kit-cut.png"
      cutoutH={720}
      spec="ICE CLEATS + MERINO SOCKS · ONE PAIR EACH"
      name={
        <>
          Icy Trail Kit
        </>
      }
      nameSize={110}
      price="$39.99"
      save="Save this before your next winter hike"
    />
  );
};

export const V184: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.28} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.2} to={4.38} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.2} />
    </Scene>
    <Scene from={4.3} to={5.98} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.3} />
    </Scene>
    <Scene from={5.9} to={8.48} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={5.9} />
    </Scene>
    <Scene from={8.4} to={11.2} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={8.4} />
    </Scene>
    <Scene from={11.1} to={15.8} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.2, 1600],
        [2.2, 4.3, 1660],
        [4.3, 5.9, 1660],
        [5.9, 8.4, 1600],
        [8.4, 11.1, 1660],
      ]}
    />
  </AbsoluteFill>
);
