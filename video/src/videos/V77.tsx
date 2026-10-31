// V77: "Her hoodie was the problem" in the cinematic C01 style, windy November summit.
// Advice: cotton soaks up sweat, holds water and loses its warmth when wet; wear a synthetic or wool base layer and a fleece
// as the warm layer; fleece keeps much of its warmth when damp and dries fast (kept modest). End card = Polar Fleece
// Soft-Shell Jacket — Women's, 320g polar fleece mid-layer, $39.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, rim, Svg } from "../cine";
import { Blizzard, FrostTrail, STORM, Summit, WGOLD, WINTER, WinterBackdrop } from "../winter";
import { Breath, Sweat } from "../fall";
import vo from "../vo/v77.json";

const words = vo.words as unknown as Word[];

const HOODIE = "#8d9196";
const HOODIE_D = "#6c7075";
const WET = "#4f5359";
const FLEECE = "#C8245E";
const FLEECE_D = "#9E1A49";

const AVA: Outfit = {
  ...GUIDE,
  skin: "#E2B08F",
  skinShade: "#C69373",
  hair: "#5a3a22",
  ponytail: "#5a3a22",
  beard: null,
  cap: "#2C3B2E",
  capShade: "#1B2620",
  jacket: HOODIE,
  jacketShade: HOODIE_D,
  pants: "#3f444b",
  pantsShade: "#2e3238",
  boot: "#5a3e2a",
  sole: "#1d1916",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
  glove: null,
};
const AVA_WET: Outfit = { ...AVA, jacket: "#6f7378", jacketShade: WET };
const AVA_FLEECE: Outfit = { ...AVA, jacket: FLEECE, jacketShade: FLEECE_D };

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Front view garment (screen units, centred on x, top of shoulders at y). kind: tee, hoodie, fleece.
const Garment: React.FC<{ x: number; y: number; s?: number; kind: "tee" | "base" | "hoodie" | "fleece"; col: string; shade: string; wet?: number; t: number; label?: string }> = ({
  x,
  y,
  s = 1,
  kind,
  col,
  shade,
  wet = 0,
  t,
  label,
}) => {
  const long = kind !== "tee";
  const body = `M-170,0 Q-90,-30 -50,-20 Q0,30 50,-20 Q90,-30 170,0 L${long ? 330 : 270},${long ? 420 : 170} L${long ? 260 : 210},${long ? 450 : 210} L190,170 L190,560 L-190,560 L-190,170 L${long ? -260 : -210},${long ? 450 : 210} L${long ? -330 : -270},${long ? 420 : 170} Z`;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d={body} fill={col} stroke="rgba(0,0,0,0.25)" strokeWidth={5} strokeLinejoin="round" />
      <path d="M-190,170 L-190,560 L-120,560 L-130,190 Z" fill={shade} opacity={0.6} />
      {kind === "hoodie" && (
        <g>
          <path d="M-110,-10 Q-120,-150 0,-160 Q120,-150 110,-10 Q0,60 -110,-10 Z" fill={shade} stroke="rgba(0,0,0,0.25)" strokeWidth={5} />
          <path d="M-150,330 L150,330 L120,470 L-120,470 Z" fill={shade} opacity={0.8} />
          <path d="M-30,20 L-36,150 M30,20 L36,150" stroke="#e8e8e8" strokeWidth={8} strokeLinecap="round" />
        </g>
      )}
      {kind === "fleece" && (
        <g>
          <path d="M-80,-40 L80,-40 L70,30 Q0,50 -70,30 Z" fill={shade} stroke="rgba(0,0,0,0.25)" strokeWidth={4} />
          <line x1={0} y1={-40} x2={0} y2={560} stroke="#2a2a2a" strokeWidth={8} />
          <rect x={-10} y={-20} width={20} height={44} rx={6} fill="#2a2a2a" />
          {/* fleece texture */}
          {Array.from({ length: 40 }, (_, i) => (
            <circle key={i} cx={-170 + ((i * 97) % 340)} cy={60 + ((i * 53) % 480)} r={6} fill="rgba(255,255,255,0.08)" />
          ))}
        </g>
      )}
      {(kind === "tee" || kind === "base") && <path d="M-50,-20 Q0,30 50,-20" stroke={shade} strokeWidth={14} fill="none" />}
      {label && (
        <text x={0} y={kind === "tee" || kind === "base" ? 330 : 260} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={58} fill="rgba(255,255,255,0.9)">
          {label}
        </text>
      )}
      {wet > 0 && (
        <g opacity={wet}>
          <path d="M-190,170 Q-120,120 -40,200 Q40,140 120,210 Q170,180 190,230 L190,560 L-190,560 Z" fill={WET} opacity={0.75} />
          <path d="M-60,-10 Q0,60 60,-10 L90,60 Q0,120 -90,60 Z" fill={WET} opacity={0.7} />
          {[0, 1, 2, 3].map((i) => {
            const k = (t * 0.8 + i * 0.25) % 1;
            return <path key={i} d={`M${-120 + i * 80},${570 + k * 140} q-12,20 0,28 q12,-8 0,-28 Z`} fill="#8fc1e0" opacity={1 - k} />;
          })}
        </g>
      )}
    </g>
  );
};

// Horizontal warmth meter chip.
const Warmth: React.FC<{ t: number; t0: number; v: number; x: number; y: number; label: string }> = ({ t, t0, v, x, y, label }) => {
  const o = at(t, [t0, t0 + 0.3], [0, 1]);
  const col = v > 0.55 ? "#3E8E5A" : v > 0.3 ? "#D9A441" : "#D9443A";
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 600, padding: "20px 26px", borderRadius: 22, background: "rgba(255,255,255,0.94)", boxShadow: "0 10px 26px rgba(0,0,0,0.25)", opacity: o, translate: `0px ${(1 - o) * 20}px` }}>
      <div style={{ fontFamily: "Barlow Condensed", fontWeight: 700, fontSize: 34, letterSpacing: 3, color: "#4a4a46" }}>{label}</div>
      <div style={{ marginTop: 12, height: 34, borderRadius: 17, background: "#e2e2dc", overflow: "hidden" }}>
        <div style={{ width: `${Math.max(0.04, v) * 100}%`, height: "100%", borderRadius: 17, background: col }} />
      </div>
    </div>
  );
};

// ============ S1 HOOK MEDIUM: windy summit, wet hoodie, hugging herself (0 - 2.65) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7, 0.15);
  const cam: Cam = { x: t * 12 + hh.x, y: hh.y, zoom: mix(1.06, 1.14, t / 2.65), rot: hh.rot };
  const g = 1430;
  const shiver = Math.sin(t * 46) * 3;
  const p: HikerProps = { x: 600 + shiver, y: g + 182 * 2.8 - 160, scale: 2.8, walk: 0, lean: 0.12, poles: false, handOverride: [46, -70], breathe: Math.sin(t * 5) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={g + 120} blur={3} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={-5}>
          <Person {...p} outfit={AVA_WET} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24443a" side="left" />
      </Plane>
      <Blizzard seed={71} />
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="20,40,70" />
      <Title text={"Her hoodie\nwas the\nproblem"} t={t} t0={0} top={140} size={128} />
      <Chip text="Cotton hoodie" t={t} t0={1.2} x={80} y={590} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: on the climb she sweats (2.65 - 4.40) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 40 + hh.x, y: -lt * 10 + hh.y, zoom: mix(1.02, 1.08, lt / 1.75), rot: hh.rot };
  const g = 1420;
  const p: HikerProps = { x: 420 + lt * 50, y: g + 182 * 2.3 - 130 - lt * 8, scale: 2.3, phase: t * 3.2, walk: 0.8, lean: 0.2, poles: false, slope: 0.12 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={g + 20} blur={2} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 60} tilt={0.12} />
        <Subject rimX={5}>
          <Person {...p} outfit={AVA} expression="tired" />
          <Sweat p={p} t={t} on={at(t, [3.0, 3.4], [0, 1])} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24443a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.18} />
      <Particles seed={72} n={20} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="255,226,190" />
      <Chip text="The climb" t={t} t0={2.8} x={80} y={240} big />
      <Chip text="Sweating" t={t} t0={3.4} x={80} y={370} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: the hoodie soaks it up and stays wet (4.40 - 6.26) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 1.86), rot: hh.rot };
  const wet = at(t, [4.5, 5.6], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={1200} blur={12} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <Garment x={540} y={680} s={1.25} kind="hoodie" col={HOODIE} shade={HOODIE_D} wet={wet} t={t} label="COTTON" />
        </Subject>
      </Plane>
      <Particles seed={73} n={14} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Chip text="Soaks up sweat" t={t} t0={4.6} x={80} y={200} icon="x" big />
      <Chip text="Stays wet" t={t} t0={5.4} x={80} y={330} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: shivering at the windy top (6.26 - 8.29) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [6.3, 6.4, 6.9], [0, 0.5, 0]);
  const hh = handheld(t, 0.6, shake);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2), rot: hh.rot };
  const shiver = Math.sin(t * 50) * 4;
  const p: HikerProps = { x: 560 + shiver, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.1, poles: false, handOverride: [46, -70], breathe: Math.sin(t * 6) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={1250} blur={9} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6}>
          <Person {...p} outfit={AVA_WET} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      {/* wind streaks */}
      <Svg>
        {[0, 1, 2, 3, 4].map((i) => {
          const k = (t * 1.6 + i * 0.2) % 1;
          return <path key={i} d={`M${-200 + k * 1500},${520 + i * 170} q120,-20 240,0`} stroke="#ffffff" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.35 * Math.sin(k * Math.PI)} />;
        })}
      </Svg>
      <Blizzard seed={74} />
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Chip text="Windy top" t={t} t0={6.4} x={80} y={240} big />
      <Readout label="AVA" value="Shivering" ok={false} t={t} t0={7.0} x={80} y={370} />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: cotton holds water and loses its warmth when wet (8.29 - 11.56) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.27), rot: hh.rot };
  const wet = at(t, [8.5, 9.6], [0, 1], outExpo);
  const warm = at(t, [9.8, 10.9], [0.85, 0.12]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="e" treeY={1200} blur={12} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* fabric swatch with weave */}
          <g transform="translate(540,1000) rotate(-4)">
            <rect x={-360} y={-260} width={720} height={520} rx={30} fill={HOODIE} />
            {Array.from({ length: 18 }, (_, i) => (
              <line key={i} x1={-360} y1={-250 + i * 29} x2={360} y2={-250 + i * 29} stroke="rgba(0,0,0,0.07)" strokeWidth={6} />
            ))}
            <ellipse cx={0} cy={0} rx={330 * wet} ry={240 * wet} fill={WET} opacity={0.8} />
            {[0, 1, 2, 3, 4].map((i) => {
              const k = Math.min(1, Math.max(0, (t - 8.4 - i * 0.18) / 0.5));
              return <path key={i} d={`M${-200 + i * 100},${-520 + k * 520} q-24,38 0,56 q24,-18 0,-56 Z`} fill="#8fc1e0" opacity={k < 1 ? 1 : 0} />;
            })}
          </g>
        </Svg>
      </Plane>
      <Particles seed={75} n={14} col="#ffffff" fall={20} />
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="20,40,70" vignette={0.55} />
      <Chip text="Cotton holds water" t={t} t0={8.5} x={80} y={200} icon="x" big />
      <Warmth t={t} t0={9.6} v={warm} x={80} y={340} label="WARMTH WHEN WET" />
    </AbsoluteFill>
  );
};

// ============ S5 FIX CLOSE-UP: a synthetic or wool base layer (11.56 - 14.88) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 3.3), rot: hh.rot };
  const inK = at(t, [12.6, 13.3], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1200} blur={12} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <g opacity={inK}>
            <Garment x={540} y={mix(1300, 880, inK)} s={1.15} kind="base" col="#2F5D8A" shade="#244a6f" t={t} label="BASE LAYER" />
          </g>
        </Subject>
      </Plane>
      <Particles seed={76} n={14} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Title text={"Layer it\nright."} t={t} t0={off + 0.1} t1={12.7} top={170} size={150} />
      <Chip text="Base layer" t={t} t0={12.8} x={80} y={240} icon="check" big />
      <Chip text="Synthetic or wool" t={t} t0={13.5} x={80} y={370} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: a fleece as the warm layer (14.88 - 16.85) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2), rot: hh.rot };
  const inK = at(t, [14.95, 15.6], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={1200} blur={12} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <Garment x={540} y={880} s={1.15} kind="base" col="#2F5D8A" shade="#244a6f" t={t} />
          <Garment x={mix(1500, 540, inK)} y={830} s={1.25} kind="fleece" col={FLEECE} shade={FLEECE_D} t={t} label="FLEECE" />
        </Subject>
      </Plane>
      <Particles seed={77} n={14} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="255,214,170" vignette={0.55} />
      <Chip text="Fleece on top" t={t} t0={15.1} x={80} y={240} icon="check" big />
      <Chip text="Your warm layer" t={t} t0={15.7} x={80} y={370} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: fleece keeps much of its warmth when damp and dries fast (16.85 - 20.35) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.5), rot: hh.rot };
  const damp = at(t, [17.0, 17.6], [0, 0.6]) * at(t, [18.6, 19.8], [1, 0]);
  const warm = at(t, [17.4, 18.0], [0.9, 0.72]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="h" treeY={1200} blur={12} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <g transform="translate(540,1000) rotate(3)">
            <rect x={-360} y={-260} width={720} height={520} rx={30} fill={FLEECE} />
            {Array.from({ length: 70 }, (_, i) => (
              <circle key={i} cx={-340 + ((i * 97) % 680)} cy={-240 + ((i * 61) % 480)} r={9} fill="rgba(255,255,255,0.1)" />
            ))}
            <ellipse cx={0} cy={0} rx={300} ry={200} fill={FLEECE_D} opacity={damp} />
            {/* drying wisps */}
            {[0, 1, 2].map((i) => {
              const k = (t * 0.7 + i / 3) % 1;
              return <path key={i} d={`M${-160 + i * 160},${-280 - k * 200} q-24,-40 0,-80 q24,-40 0,-80`} stroke="#ffffff" strokeWidth={12} fill="none" strokeLinecap="round" opacity={at(t, [18.6, 19.0], [0, 1]) * 0.5 * (1 - k)} />;
            })}
          </g>
        </Svg>
      </Plane>
      <Particles seed={78} n={14} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="255,214,170" vignette={0.55} />
      <Warmth t={t} t0={17.2} v={warm} x={80} y={200} label="FLEECE, DAMP: STILL WARM" />
      <Chip text="Dries fast" t={t} t0={18.7} x={80} y={390} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF MEDIUM: she zips up at the top, warm (20.35 - 22.40) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 18 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.16, 1.06], outExpo), rot: hh.rot };
  const g = 1440;
  const zip = at(t, [20.5, 21.2], [0, 1], outExpo);
  const hand: [number, number] = [mix(30, 44, zip), mix(10, -95, zip)];
  const p: HikerProps = { x: 520, y: g + 182 * 2.3 - 150, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: hand, breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="i" treeY={g + 120} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={6}>
          <Person {...p} outfit={AVA_FLEECE} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={79} n={26} col="#ffe7b8" />
      <Grade sunX={760} sunY={640} warm="255,180,100" />
      <Chip text="Zipped up" t={t} t0={20.6} x={80} y={240} icon="check" big />
      <Chip text="Warm at the top" t={t} t0={21.3} x={80} y={370} icon="check" />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/polar-fleece-soft-shell-jacket-womens-cut.png"
      cutoutH={760}
      spec="320G POLAR FLEECE · WOMEN'S · MID-LAYER"
      name={
        <>
          Women's
          <br />
          Fleece Jacket
        </>
      }
      nameSize={104}
      price="$39.99"
      save="Save this before your cold hike"
    />
  );
};

export const V77: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.7} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.65} to={4.45} fadeIn={0.06} fadeOut={0.08}>
      <S2a off={2.65} />
    </Scene>
    <Scene from={4.4} to={6.31} fadeIn={0.08} fadeOut={0.08}>
      <S2b off={4.4} />
    </Scene>
    <Scene from={6.26} to={8.34} fadeIn={0.08} fadeOut={0.1}>
      <S3 off={6.26} />
    </Scene>
    <Scene from={8.29} to={11.61} fadeIn={0.1} fadeOut={0.08}>
      <S4 off={8.29} />
    </Scene>
    <Scene from={11.56} to={14.93} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.56} />
    </Scene>
    <Scene from={14.88} to={16.9} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.88} />
    </Scene>
    <Scene from={16.85} to={20.4} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={16.85} />
    </Scene>
    <Scene from={20.35} to={22.5} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={20.35} />
    </Scene>
    <Scene from={22.2} to={27.5} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.65, 1560],
        [2.65, 6.26, 1560],
        [6.26, 8.29, 1560],
        [8.29, 11.56, 1560],
        [11.56, 14.88, 1560],
        [14.88, 16.85, 1560],
        [16.85, 20.35, 1560],
        [20.35, 22.2, 1560],
      ]}
    />
  </AbsoluteFill>
);
