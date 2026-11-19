// V191: "Slickrock. Now add snow." Short format (17 s, 44 words), cinematic C01 style, Arches in December.
// Product: Utah's Mighty 5 — Trip Planning Guide, $9.99 (live Shopify). Boxed photo card (cover is a designed card).
// Advice (simple, safe): the open slickrock on the Delicate Arch trail can ice over in winter; ask at the visitor center
// about trail ice and bring traction. No numbers, no official logos.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, Clouds, Grade, Haze, handheld, Particles, Plane, Rays, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { Wall, Resthouse } from "../canyon";
import { BootClose } from "../icy";
import vo from "../vo/v191.json";

const words = vo.words as unknown as Word[];

const WDAWN: Sky = { top: "#3a5c8a", mid: "#c9b6c4", low: "#f6d9bf", sun: [300, 820], sunR: 54, sunCol: "#fff4e0", glow: "#ffc996" };
const WCOLD: Sky = { top: "#4c6a8e", mid: "#b7c6d4", low: "#ece4dc", sun: [820, 520], sunR: 40, sunCol: "#fffaf0", glow: "#f2e2cc" };

const LUKE: Outfit = {
  ...JAKE,
  skin: "#E2B48E",
  skinShade: "#C39470",
  hair: "#5a3a22",
  beard: "#5a3a22",
  cap: "#2c3a4a",
  capShade: "#1f2a36",
  jacket: "#2F6E8E",
  jacketShade: "#245670",
  pants: "#4a4238",
  pantsShade: "#383128",
  boot: "#6B4630",
  sole: "#2A2421",
  pack: "#7a3f2c",
  packShade: "#5e3022",
  glove: "#2a2a2a",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// A freestanding sandstone arch with snow on its top (screen units, base centre x,y, scale s).
const Arch: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path
      fillRule="evenodd"
      d="M-290,0 Q-215,-120 -205,-330 Q-185,-470 -60,-495 Q60,-510 150,-450 Q215,-380 205,-200 Q205,-80 270,0 Z
         M-125,0 Q-130,-160 -110,-290 Q-80,-430 20,-440 Q110,-440 130,-320 Q145,-200 135,0 Z"
      fill="#c4683c"
    />
    <path d="M-200,-330 Q-180,-470 -60,-500 Q60,-520 150,-450" stroke="#f4f6f8" strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M-150,-60 Q-160,-200 -140,-300" stroke="#a5532e" strokeWidth={18} fill="none" opacity={0.7} />
    <path d="M170,-60 Q175,-200 160,-320" stroke="#a5532e" strokeWidth={18} fill="none" opacity={0.7} />
  </g>
);

// Arches backdrop: sky, snowy La Sal-like mountains far away, red fins, the arch on its rim.
const ArchBackdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; y: number; blur?: number; t: number; arch?: boolean }> = ({ cam, sky, uid, y, blur = 0, t, arch = true }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={360} col="#ffffff" seed={7} drift={t * 8} opacity={0.3} />
    </Plane>
    <Plane cam={cam} depth={0.1} blur={3 + blur}>
      <Svg>
        <path d={`M-400,${y - 420} L-100,${y - 640} L120,${y - 520} L380,${y - 720} L640,${y - 540} L900,${y - 680} L1500,${y - 430} L1500,2600 L-400,2600 Z`} fill="#8796ad" />
        <path d={`M-160,${y - 604} L-100,${y - 640} L-40,${y - 602} L-70,${y - 594} L-100,${y - 610} L-130,${y - 596} Z`} fill="#f2f4f7" />
        <path d={`M320,${y - 684} L380,${y - 720} L440,${y - 682} L410,${y - 674} L380,${y - 690} L350,${y - 676} Z`} fill="#f2f4f7" />
        <path d={`M840,${y - 644} L900,${y - 680} L960,${y - 642} L930,${y - 634} L900,${y - 650} L870,${y - 636} Z`} fill="#f2f4f7" />
      </Svg>
    </Plane>
    <Haze y={y - 520} h={300} col={sky.low} opacity={0.6} />
    <Plane cam={cam} depth={0.3} blur={1.8 + blur}>
      <Wall seed={11} base={y - 220} amp={260} col="#c47a4c" band="#e09a66" uid={uid} />
    </Plane>
    <Plane cam={cam} depth={0.5} blur={1 + blur}>
      <Svg>{arch && <Arch x={760} y={y - 120} s={0.9} />}</Svg>
    </Plane>
  </>
);

// Open slickrock: smooth sandstone slope, snow patches and a glassy glaze of ice (screen units).
const Slickrock: React.FC<{ y: number; tilt?: number; ice?: number; t: number }> = ({ y, tilt = 0.12, ice = 1, t }) => {
  const Y = (x: number) => y - tilt * (x - 540);
  return (
    <Svg>
      <path d={`M-400,${Y(-400)} Q540,${Y(540) - 30} 1480,${Y(1480)} L1480,2600 L-400,2600 Z`} fill="#c98258" />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M-400,${Y(-400) + 60 + i * 70} Q540,${Y(540) + 30 + i * 70} 1480,${Y(1480) + 60 + i * 70}`} stroke="#b06c46" strokeWidth={8} fill="none" opacity={0.5} />
      ))}
      {Array.from({ length: 7 }, (_, i) => {
        const x = -250 + i * 260 + ((i * 47) % 90);
        return <ellipse key={i} cx={x} cy={Y(x) + 40 + (i % 3) * 60} rx={110 + (i % 3) * 30} ry={18} fill="#f3f5f7" opacity={0.9} />;
      })}
      {ice > 0 && (
        <g opacity={ice}>
          <path d={`M-400,${Y(-400) + 8} Q540,${Y(540) - 22} 1480,${Y(1480) + 8} L1480,${Y(1480) + 200} Q540,${Y(540) + 170} -400,${Y(-400) + 200} Z`} fill="#cfe6f2" opacity={0.42} />
          {Array.from({ length: 5 }, (_, i) => {
            const x = ((t * 120 + i * 300) % 1600) - 300;
            return <path key={i} d={`M${x},${Y(x) + 40} l120,-14`} stroke="#ffffff" strokeWidth={8} strokeLinecap="round" opacity={0.7} />;
          })}
        </g>
      )}
    </Svg>
  );
};

// ============ S1 HOOK WIDE: Luke walks up the slickrock toward the arch at a cold dawn (0 - 3.48) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.02, 1.1, t / 3.48), rot: hh.rot };
  const g = 1520;
  const ph = t * 3.1;
  const p: HikerProps = { x: 260 + t * 40, y: g - 0.12 * (260 + t * 40 - 540), scale: 1.7, phase: ph, walk: 0.7, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <ArchBackdrop cam={cam} sky={WDAWN} uid="a" y={1300} t={t} />
      <Plane cam={cam} depth={1}>
        <Slickrock y={g} ice={0.6} t={t} />
        <Subject rimX={5} col="rgba(255,226,190,0.85)">
          <Person {...p} outfit={LUKE} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={WDAWN.sun[0]} y={WDAWN.sun[1]} strength={0.28} col="255,226,190" />
      <Particles seed={1911} n={12} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={300} sunY={820} warm="255,218,180" cool="40,55,95" />
      <Title text={"Slickrock.\nNow add\nsnow."} t={t} t0={0} top={110} size={140} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: boot on the glazed rock, the sole slides (3.48 - 6.08) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const slip = at(t, [4.9, 5.4], [0, 1], outExpo);
  const cam: Cam = { x: hh.x + Math.sin(t * 50) * 6 * at(t, [4.9, 5.1, 5.5], [0, 1, 0]), y: hh.y, zoom: mix(1.0, 1.08, lt / 2.6), rot: hh.rot };
  return (
    <AbsoluteFill>
      <ArchBackdrop cam={cam} sky={WCOLD} uid="b" y={1100} blur={12} t={t} arch={false} />
      <Plane cam={cam} depth={1}>
        <Slickrock y={1300} tilt={0} ice={1} t={t} />
        <Subject rimX={6} col="rgba(236,242,248,0.85)">
          <Svg>
            <BootClose toe={0} heel={0} pants={LUKE.pants} pantsShade={LUKE.pantsShade} boot={LUKE.boot as string} sole={LUKE.sole as string} y={-24} slipX={slip * 170} />
            {slip > 0.05 && <path d={`M260,1310 l${slip * 170},0`} stroke="#ffffff" strokeWidth={10} strokeLinecap="round" opacity={0.8} />}
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1912} n={12} col="#ffffff" fall={10} />
      <Grade sunX={820} sunY={520} warm="236,236,240" cool="30,45,90" vignette={0.55} />
      <Chip text="Thin ice on bare rock" t={t} t0={3.7} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: Luke's feet slide, arms out for balance (6.08 - 7.38) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5, 2);
  const wob = Math.sin(t * 11) * 0.06;
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.12, lt / 1.3), rot: (hh.rot ?? 0) + wob * 10 };
  const g = 1560;
  const p: HikerProps = { x: 520 + Math.sin(t * 7) * 20, y: g, scale: 2.4, phase: 0.6, walk: 0.5, lean: wob - 0.04, poles: false, handOverride: [70, -40], breathe: 0 };
  return (
    <AbsoluteFill>
      <ArchBackdrop cam={cam} sky={WCOLD} uid="c" y={1340} blur={4} t={t} />
      <Plane cam={cam} depth={1}>
        <Slickrock y={g + 10} tilt={0.06} ice={1} t={t} />
        <Subject rimX={5} col="rgba(236,242,248,0.85)">
          <Person {...p} outfit={LUKE} expression="tired" />
        </Subject>
      </Plane>
      <Particles seed={1913} n={14} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="236,236,240" cool="30,45,90" />
      <Chip text="Every step slid" t={t} t0={6.2} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the visitor center desk, ask about trail ice (7.38 - 10.0) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.6), rot: hh.rot };
  const g = 1560;
  const p: HikerProps = { x: 360, y: g, scale: 2.3, phase: 0, walk: 0, lean: 0.02, poles: false, handOverride: [40, 20], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <ArchBackdrop cam={cam} sky={WCOLD} uid="d" y={1300} blur={8} t={t} arch={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 20} width={1900} height={800} fill="#b9a48c" />
          <rect x={-400} y={g - 20} width={1900} height={14} fill="#f1f3f5" />
          <Resthouse x={730} y={g - 10} s={1.3} />
          <rect x={530} y={g - 500} width={400} height={70} rx={10} fill="#4a3a2a" />
          <text x={730} y={g - 452} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={44} fill="#ffffff">VISITOR CENTER</text>
        </Svg>
        <Subject rimX={5} col="rgba(255,240,220,0.85)">
          <Person {...p} outfit={LUKE} expression="neutral" />
        </Subject>
      </Plane>
      <Particles seed={1914} n={10} col="#ffffff" fall={6} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="250,236,220" cool="30,45,90" />
      <Chip text="The rule" t={t} t0={7.5} x={60} y={170} icon="none" big />
      <Chip text="Ask about trail ice" t={t} t0={8.6} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: traction goes on the boot (10.0 - 12.55) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 1.0], [1.12, 1.03], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill>
      <ArchBackdrop cam={cam} sky={WDAWN} uid="e" y={1100} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Slickrock y={1300} tilt={0} ice={1} t={t} />
        <Subject rimX={6} col="rgba(255,226,190,0.9)">
          <Svg>
            <BootClose toe={at(t, [10.2, 10.9], [0, 1], outExpo)} heel={at(t, [11.0, 11.8], [0, 1], outExpo)} pants={LUKE.pants} pantsShade={LUKE.pantsShade} boot={LUKE.boot as string} sole={LUKE.sole as string} y={-24} glove={LUKE.glove} hand={at(t, [10.9, 11.1, 11.9, 12.1], [0, 1, 1, 0])} />
          </Svg>
        </Subject>
      </Plane>
      <Rays x={WDAWN.sun[0]} y={WDAWN.sun[1]} strength={0.3} col="255,226,190" />
      <Particles seed={1915} n={12} col="#fff3d6" fall={6} />
      <Grade sunX={300} sunY={820} warm="255,218,180" vignette={0.5} />
      <Chip text="Bring traction" t={t} t0={11.3} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/utahs-mighty-5-trip-planning-guide-card.jpg"
      photoH={760}
      spec="DIGITAL GUIDE · ZION TO ARCHES"
      name={
        <>
          Utah's Mighty 5
          <br />
          Trip Planning Guide
        </>
      }
      nameSize={80}
      price="$9.99"
      save="Save this before your Utah trip"
    />
  );
};

export const V191: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.56} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.48} to={6.16} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.48} />
    </Scene>
    <Scene from={6.08} to={7.46} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={6.08} />
    </Scene>
    <Scene from={7.38} to={10.08} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={7.38} />
    </Scene>
    <Scene from={10.0} to={12.65} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={10.0} />
    </Scene>
    <Scene from={12.55} to={17.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.48, 1600],
        [3.48, 6.08, 1600],
        [6.08, 7.38, 1600],
        [7.38, 12.55, 1600],
      ]}
    />
  </AbsoluteFill>
);
