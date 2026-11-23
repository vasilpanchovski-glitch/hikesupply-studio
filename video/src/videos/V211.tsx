// V211: "His shortcut crossed a steep snow slope." Short format (17.0 s, 37 words), cinematic C01 style, winter mountains.
// Product: Hiking Safety Guide, $8.99 (live Shopify), boxed store cover as in V180.
// Advice (conservative, standard avalanche-awareness basics, no numbers): steep, open snow slopes after a big snowfall are where
// avalanches start; without avalanche training, stay off them and out from under them, and check the local avalanche forecast.
// The forecast screen on the phone is generic (no real agency name or logo, no invented danger rating).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Pine, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { BootClose } from "../icy";
import { FrostTrail, SNOW, SNOW2, WGOLD, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v211.json";

const words = vo.words as unknown as Word[];

const RAY: Outfit = {
  ...JAKE,
  skin: "#D9A07C",
  skinShade: "#B98060",
  hair: "#3a2a1e",
  beard: "#3a2a1e",
  cap: "#2F5D3E",
  capShade: "#244a31",
  jacket: "#D2552F",
  jacketShade: "#A8401F",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  pack: "#2F6F8F",
  packShade: "#235670",
  glove: "#2a2a2a",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// The big, steep, open snow face (screen units). crack 0..1 draws a fracture line across it; slide 0..1 moves the slab below
// the crack a little down the fall line, with powder puffs along the crack.
const Face: React.FC<{ crack?: number; slide?: number; t: number }> = ({ crack = 0, slide = 0, t }) => {
  const dx = -60 * slide;
  const dy = 100 * slide;
  const crackPts = "M180,1010 L300,960 L360,985 L470,920 L560,945 L680,870 L760,890 L880,810 L980,835 L1100,760 L1220,780 L1400,700";
  return (
    <g>
      {/* the face above the crack */}
      <path d="M-300,1640 L120,1000 Q420,520 760,180 Q920,40 1050,-200 L1500,-200 L1500,1700 Z" fill="#e9eff3" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${700 + i * 120},${-100 + i * 40} L${100 + i * 120},${1500}`} stroke="#d2dde4" strokeWidth={8} opacity={0.5} />
      ))}
      {/* rock bands */}
      <path d="M820,330 l90,-40 l60,30 l-40,40 Z M1040,520 l120,-30 l40,40 l-110,30 Z" fill="#5d646b" />
      <path d="M820,330 l90,-40 l20,10 l-90,40 Z" fill="#f3f6f8" />
      {/* the slab below the crack */}
      <g transform={`translate(${dx},${dy})`}>
        <path d={`${crackPts} L1500,1700 L-300,1700 L-300,1640 Z`} fill={SNOW} />
        {Array.from({ length: 6 }, (_, i) => (
          <path key={i} d={`M${700 + i * 120},${860 - i * 30} L${300 + i * 160},1600`} stroke="#dbe4ea" strokeWidth={8} opacity={0.6} />
        ))}
      </g>
      {crack > 0 && (
        <path d={crackPts} stroke="#5f7383" strokeWidth={10 + slide * 14} fill="none" strokeLinejoin="round" pathLength={1} strokeDasharray={`${crack} 1`} />
      )}
      {slide > 0 &&
        Array.from({ length: 9 }, (_, i) => {
          const q = (t * 0.8 + i / 9) % 1;
          const x = 250 + i * 130;
          const y = 980 - i * 30;
          return <circle key={i} cx={x - q * 40} cy={y + 40 + q * 60} r={(50 + q * 90) * slide} fill="#f7f9fb" opacity={0.75 * (1 - q)} />;
        })}
    </g>
  );
};

// Trees along the safe side of the valley (screen units).
const Trees: React.FC<{ y: number; xs: number[]; h?: number }> = ({ y, xs, h = 520 }) => (
  <g>
    {xs.map((x, i) => (
      <g key={i}>
        <Pine x={x} y={y + (i % 2) * 20} h={h + (i % 3) * 70} c="#2f5446" c2="#24443a" />
        {[0, 1, 2].map((k) => {
          const hh = h + (i % 3) * 70;
          const w = hh * (0.42 - k * 0.08);
          const ty = y + (i % 2) * 20 - hh * 0.12 - k * hh * 0.21;
          return <path key={k} d={`M${x - w * 0.8},${ty - 4} Q${x - w * 0.2},${ty - hh * 0.06} ${x + w * 0.3},${ty - 6} L${x + w * 0.1},${ty} Z`} fill={SNOW} opacity={0.9} />;
        })}
      </g>
    ))}
  </g>
);

// Boot prints across the slope (screen units), from (x0,y0) towards (x1,y1), k = how far along.
const Prints: React.FC<{ x0: number; y0: number; x1: number; y1: number; k: number }> = ({ x0, y0, x1, y1, k }) => (
  <g>
    {Array.from({ length: 16 }, (_, i) => {
      const q = i / 15;
      if (q > k) return null;
      return <ellipse key={i} cx={mix(x0, x1, q)} cy={mix(y0, y1, q) + (i % 2 ? 10 : -10)} rx={16} ry={8} fill="#aebdc8" />;
    })}
  </g>
);

// ============ S1 HOOK WIDE: after a big snowfall Ray leaves the trees and cuts across the open slope (0 - 2.6) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + t * 20, y: hh.y, zoom: mix(1.02, 1.08, t / 2.6), rot: hh.rot };
  const k = at(t, [0, 2.6], [0.35, 0.55]);
  const x = mix(150, 1250, k);
  const y = mix(1500, 1080, k);
  const p: HikerProps = { x, y, scale: 1.4, phase: t * 4, walk: 0.8, lean: 0.12, poles: false };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={1300} t={t} snow={1} woods={false} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} col="255,248,230" />
      <Plane cam={cam} depth={1}>
        <Svg>
          <Face t={t} />
          <rect x={-300} y={1600} width={1800} height={800} fill={SNOW2} />
          <Prints x0={150} y0={1500} x1={1250} y1={1080} k={k - 0.02} />
          <Trees y={1640} xs={[-120, 40, 180]} />
        </Svg>
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={RAY} expression="neutral" />
        </Subject>
      </Plane>
      <Particles seed={2111} n={12} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="252,244,232" cool="40,60,90" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 700, background: "linear-gradient(180deg, rgba(20,36,52,0.6) 0%, rgba(20,36,52,0.35) 60%, rgba(20,36,52,0) 100%)" }} />
      <Title text={"His shortcut\ncrossed a steep\nsnow slope."} t={t} t0={0} top={110} size={120} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: boots sinking deep in the fresh snow on the slope (2.6 - 4.7) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.1), rot: -2 + hh.rot };
  const sink = at(t, [2.7, 3.4], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1050} blur={14} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <Svg>
            <g transform={`rotate(-14 540 1300) translate(0,${sink * 230 - 260})`}>
              <BootClose toe={0} heel={0} pants={RAY.pants} pantsShade={RAY.pantsShade} boot="#6B4630" sole="#2A2421" />
            </g>
            {/* deep fresh snow swallowing the boot, tilted with the slope */}
            <path d="M-300,1180 Q200,1120 540,1150 Q900,1170 1400,980 L1400,2300 L-300,2300 Z" fill={SNOW} />
            <path d="M-300,1180 Q200,1120 540,1150 Q900,1170 1400,980" stroke="#ffffff" strokeWidth={14} fill="none" />
            <path d="M220,1150 Q400,1100 600,1160" stroke="#c4d2dc" strokeWidth={18} fill="none" opacity={0.7} />
            {[0, 1, 2, 3, 4].map((i) => {
              const q = at(t, [2.8 + i * 0.05, 3.5 + i * 0.05], [0, 1]);
              return <circle key={i} cx={300 + i * 110} cy={1140 - Math.sin(q * Math.PI) * 140} r={18 + i * 3} fill="#ffffff" opacity={q < 1 ? 0.9 : 0} />;
            })}
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2112} n={16} col="#ffffff" fall={10} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={500} warm="252,244,232" cool="40,60,90" vignette={0.55} />
      <Chip text="Big snowfall" t={t} t0={2.7} x={60} y={170} icon="x" big />
      <Chip text="Steep, open slope" t={t} t0={3.6} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: a crack runs across the slope above him (4.7 - 6.5) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const crack = at(t, [4.8, 5.4], [0, 1]);
  const slide = at(t, [5.5, 6.4], [0, 1]);
  const hh = handheld(t, 0.4, slide > 0 && slide < 1 ? 1 : 0);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 1.8), rot: hh.rot };
  const p: HikerProps = { x: 700 - 60 * slide, y: 1290 + 100 * slide, scale: 1.4, walk: 0, lean: -0.05, poles: false };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={1300} t={t} snow={1} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <Face crack={crack} slide={slide} t={t} />
          <rect x={-300} y={1600} width={1800} height={800} fill={SNOW2} />
          <Prints x0={150} y0={1500} x1={1250} y1={1080} k={0.5} />
          <Trees y={1640} xs={[-120, 40, 180]} />
        </Svg>
        <Subject rimX={5} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={RAY} expression="tired" />
        </Subject>
      </Plane>
      <Particles seed={2113} n={14} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="248,244,236" cool="40,60,100" vignette={0.55} />
      <Chip text="Avalanche terrain" t={t} t0={5.0} x={60} y={170} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the rule: Ray on the trail through the trees, the slope far off (6.5 - 10.7) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x - lt * 18, y: hh.y, zoom: mix(1.04, 1.1, lt / 4.2), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 520, y: g, scale: 2.3, phase: t * 3.6, walk: 0.6, lean: 0.06, poles: false, breathe: Math.sin(t * 3) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="d" treeY={g - 240} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={RAY} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 200} strength={0.4} col="255,236,200" />
      <Particles seed={2114} n={14} col="#fff3d6" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={500} warm="255,226,180" vignette={0.5} />
      <Chip text="The rule" t={t} t0={6.6} x={60} y={170} icon="none" big />
      <Chip text="No training? Stay off steep snow" t={t} t0={7.8} x={60} y={300} icon="check" big />
      <Chip text="And out from under it" t={t} t0={9.2} x={60} y={430} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: gloved hands, phone with a generic avalanche forecast page (10.7 - 12.55) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.1, 1.03], outExpo), rot: hh.rot };
  const show = at(t, [10.9, 11.4], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="e" treeY={1100} blur={16} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,170,0.85)">
          <Svg>
            <g transform="translate(560,980) rotate(-4)">
              <path d="M-220,300 L-520,900" stroke={RAY.jacket} strokeWidth={200} strokeLinecap="round" />
              <path d="M220,300 L520,900" stroke={RAY.jacket} strokeWidth={200} strokeLinecap="round" />
              <rect x={-230} y={-430} width={460} height={900} rx={56} fill="#1d2126" />
              <rect x={-205} y={-400} width={410} height={840} rx={36} fill="#f4f6f8" />
              <rect x={-205} y={-400} width={410} height={150} rx={36} fill="#2F5D3E" />
              <rect x={-205} y={-300} width={410} height={50} fill="#2F5D3E" />
              <text x={0} y={-322} textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight={800} fontSize={44} fill="#ffffff">
                AVALANCHE FORECAST
              </text>
              <g opacity={show}>
                <path d="M-150,40 L-40,-150 L20,-60 L60,-110 L160,40 Z" fill="#cfd9e0" />
                <path d="M-40,-150 L-10,-100 L-60,-90 Z M60,-110 L80,-80 L40,-78 Z" fill="#ffffff" />
                {[0, 1, 2].map((i) => (
                  <rect key={i} x={-160} y={100 + i * 70} width={i === 2 ? 200 : 320} height={28} rx={14} fill="#c9d3da" />
                ))}
                <rect x={-160} y={330} width={320} height={70} rx={35} fill="#2F5D3E" />
                <text x={0} y={377} textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight={800} fontSize={36} fill="#ffffff">
                  CHECK BEFORE YOU GO
                </text>
              </g>
              <ellipse cx={-230} cy={260} rx={70} ry={110} fill={RAY.glove ?? "#2a2a2a"} />
              <ellipse cx={230} cy={260} rx={70} ry={110} fill={RAY.glove ?? "#2a2a2a"} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2115} n={12} col="#fff3d6" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={760} sunY={500} warm="255,226,180" vignette={0.5} />
      <Chip text="Check the avalanche forecast" t={t} t0={10.9} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-safety-guide.jpg"
      photoH={800}
      spec="10 CHAPTERS · PRINT + PHONE PDF"
      name={
        <>
          Hiking Safety
          <br />
          Guide
        </>
      }
      nameSize={104}
      price="$8.99"
      save="Save this for winter"
    />
  );
};

export const V211: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.68} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.6} to={4.78} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.6} />
    </Scene>
    <Scene from={4.7} to={6.58} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.7} />
    </Scene>
    <Scene from={6.5} to={10.78} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={6.5} />
    </Scene>
    <Scene from={10.7} to={12.63} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={10.7} />
    </Scene>
    <Scene from={12.55} to={17.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.6, 1600],
        [2.6, 4.7, 1600],
        [4.7, 6.5, 1600],
        [6.5, 10.7, 1600],
        [10.7, 12.55, 1600],
      ]}
    />
  </AbsoluteFill>
);
