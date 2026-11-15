// V156: "His pole skidded on the bare rock." in the cinematic C01 style. Story for the Trekking Pole Rubber Tips —
// Replacement Caps, Pack of 5 ($7.99, live Shopify). Advice: rubber tips on for bare rock, pavement and boardwalks (grip on
// hard surfaces, no clicking or scratching); off for mud, snow and ice so the metal tip bites; carry spares. No numbers.
// End card = real Shopify photo, cut out (products/trekking-pole-rubber-tips-5-pack-cut.png).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, FALL, GOLD, OVERCAST, Subject } from "../fall";
import vo from "../vo/v156.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC<{ k?: number }> = ({ k = 0.45 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: `linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,${k}) 45%, rgba(12,22,28,${k}) 70%, rgba(12,22,28,0) 100%)` }} />
);

const SHAFT = "#3d6f4f";
const SHAFT2 = "#2e5a3e";
const STEEL = "#c9d0d6";
const RUBBER = "#1d1d1f";
const ROCK = "#8b8e8c";
const ROCK2 = "#727573";
const ROCK3 = "#a3a6a2";

const BEN: Outfit = {
  ...JAKE,
  skin: "#E2AE86",
  skinShade: "#C28E68",
  hair: "#4a3020",
  beard: "#4a3020",
  cap: "#c9662e",
  capShade: "#a04f22",
  jacket: "#5a6b3a",
  jacketShade: "#46542c",
  pants: "#3a3f46",
  pantsShade: "#2a2e33",
  pack: "#2f5f7f",
  packShade: "#244a63",
  pole: SHAFT,
  grip: "#1a1a1a",
  glove: null,
};

// Smooth granite slab sloping down to the right, a few cracks and lichen spots.
const Slab: React.FC<{ y: number; tilt?: number }> = ({ y, tilt = 0.12 }) => {
  const Y = (x: number) => y + tilt * (x - 540);
  return (
    <Svg>
      <path d={`M-400,${Y(-400) - 40} L1480,${Y(1480) - 40} L1480,2600 L-400,2600 Z`} fill={ROCK} />
      <path d={`M-400,${Y(-400) - 40} L1480,${Y(1480) - 40} L1480,${Y(1480) - 14} L-400,${Y(-400) - 14} Z`} fill={ROCK3} />
      <path d={`M-100,${Y(-100) + 160} Q300,${Y(300) + 120} 700,${Y(700) + 210} T1400,${Y(1400) + 190}`} stroke={ROCK2} strokeWidth={9} fill="none" opacity={0.7} />
      <path d={`M120,${Y(120) + 40} L180,${Y(180) + 300} M820,${Y(820) + 30} L760,${Y(760) + 260}`} stroke={ROCK2} strokeWidth={7} opacity={0.6} />
      {[0, 1, 2, 3, 4].map((i) => {
        const x = -200 + i * 330;
        return <ellipse key={i} cx={x} cy={Y(x) + 90 + (i % 2) * 140} rx={34} ry={14} fill="#a9b07a" opacity={0.55} />;
      })}
    </Svg>
  );
};

// Close-up pole: tip point at (x,y), shaft going up at angle deg from vertical. cap = rubber tip pushed on (0..1 = sliding on).
const BigPole: React.FC<{ x: number; y: number; angle: number; cap: number; capOff?: number }> = ({ x, y, angle, cap, capOff = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${angle})`}>
    <rect x={-22} y={-1500} width={44} height={760} rx={8} fill={SHAFT} />
    <rect x={-22} y={-1500} width={14} height={760} fill="rgba(255,255,255,0.18)" />
    <rect x={-28} y={-760} width={56} height={60} rx={10} fill="#1a1a1a" />
    <rect x={-17} y={-700} width={34} height={560} rx={6} fill={SHAFT2} />
    <rect x={-17} y={-700} width={10} height={560} fill="rgba(255,255,255,0.15)" />
    <path d="M-20,-150 L20,-150 L16,-40 L-16,-40 Z" fill="#2a2a2a" />
    <path d="M-12,-40 L12,-40 L4,0 L-4,0 Z" fill={STEEL} />
    {cap > 0 && (
      <g transform={`translate(0,${(1 - cap) * 170 + capOff})`} opacity={Math.min(1, cap * 3)}>
        <path d="M-30,-130 L30,-130 L36,-10 Q36,24 0,24 Q-36,24 -36,-10 Z" fill={RUBBER} />
        {[-14, 0, 14].map((dx) => (
          <path key={dx} d={`M${dx},-120 L${dx * 1.2},-20`} stroke="#333336" strokeWidth={6} strokeLinecap="round" />
        ))}
        <rect x={-32} y={-130} width={64} height={14} rx={4} fill="#2e2e30" />
      </g>
    )}
  </g>
);

const Fist: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${r})`}>
    <rect x={-80} y={-60} width={160} height={120} rx={50} fill={BEN.skin} />
    {[0, 1, 2].map((i) => (
      <line key={i} x1={-40 + i * 40} y1={-56} x2={-40 + i * 40} y2={-20} stroke={BEN.skinShade} strokeWidth={6} strokeLinecap="round" />
    ))}
    <path d="M60,-40 L260,-60 L270,60 L60,60 Z" fill={BEN.jacket} />
  </g>
);

// ============ S1 HOOK MEDIUM: Ben on a smooth slab, planting his pole (0 - 4.99) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.03, 1.1, t / 5), rot: hh.rot };
  const g = 1480;
  const ph = t * 2.0;
  const p: HikerProps = { x: 400 + t * 24, y: g + 130, scale: 2.4, phase: ph, walk: mix(0.45, 0.1, at(t, [3.5, 4.8], [0, 1])), lean: 0.06, poles: true, slope: -0.12, breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="a" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <Slab y={g + 120} />
        <Subject rimX={6} col="rgba(240,236,225,0.8)">
          <Person {...p} outfit={BEN} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a2c" side="right" />
      </Plane>
      <Particles seed={1561} n={16} bokeh fall={10} leaves={FALL} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="240,234,222" cool="40,55,70" />
      <Title text={"His pole\nskidded on\nthe bare rock."} t={t} t0={0} top={120} size={124} />
      <Chip text="Smooth rock slab" t={t} t0={1.6} x={60} y={640} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the metal tip skids across the rock (4.99 - 7.71) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const skid = at(t, [5.6, 6.4], [0, 1], outExpo);
  const hh = handheld(t, 0.35, at(t, [5.6, 5.75, 6.3], [0, 1.6, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.12, lt / 2.7), rot: hh.rot };
  const tipX = mix(420, 760, skid);
  const tipY = 1180 + skid * 30;
  const ang = mix(14, 46, skid);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="b" treeY={1000} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,1150 Q400,1130 1300,1200 L1300,2400 L-200,2400 Z" fill={ROCK} />
          <path d="M-200,1150 Q400,1130 1300,1200 L1300,1222 Q400,1152 -200,1172 Z" fill={ROCK3} />
          <path d="M100,1400 L380,1600 M640,1350 L900,1700" stroke={ROCK2} strokeWidth={8} opacity={0.6} />
          {/* scratch mark left by the tip */}
          <path d={`M420,1184 L${tipX},${tipY + 4}`} stroke="#d6d8d4" strokeWidth={5} opacity={skid > 0.02 ? 0.9 : 0} strokeLinecap="round" />
        </Svg>
        <Subject rimX={6} col="rgba(240,236,225,0.8)">
          <Svg>
            <BigPole x={tipX} y={tipY} angle={ang} cap={0} />
            <Fist x={tipX + Math.sin((ang * Math.PI) / 180) * 1300} y={tipY - Math.cos((ang * Math.PI) / 180) * 1300} r={ang} />
          </Svg>
        </Subject>
      </Plane>
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="240,234,222" cool="40,55,70" vignette={0.55} />
      <Chip text="Metal tip on rock" t={t} t0={5.1} x={60} y={200} icon="none" big />
      <Chip text="Skidded out" t={t} t0={6.1} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: Ben catches himself (7.71 - 9.75) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6, at(t, [7.75, 7.9, 8.3], [0, 1.2, 0]));
  const cam: Cam = { x: hh.x - lt * 8, y: hh.y, zoom: mix(1.12, 1.06, lt / 2), rot: hh.rot };
  const g = 1480;
  const rec = at(t, [7.8, 8.8], [0, 1], outExpo);
  const p: HikerProps = { x: 560, y: g + 130, scale: 2.3, phase: 1.2, walk: 0.5, lean: mix(-0.3, 0.05, rec), poles: true, slope: -0.12, breathe: Math.sin(t * 6) * 3 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="c" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <Slab y={g + 120} />
        <Subject rimX={6} col="rgba(240,236,225,0.8)">
          <Person {...p} outfit={BEN} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a2c" side="left" />
      </Plane>
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="240,234,222" cool="40,55,70" />
      <Readout label="POLE ON BARE ROCK" value="Slipped" ok={false} t={t} t0={8.0} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the fix, bare rock, pavement and boardwalks (9.75 - 12.9) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y - lt * 4, zoom: mix(1.04, 1.1, lt / 3.15), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 620, y: g + 130, scale: 2.4, walk: 0, lean: 0.02, poles: true, slope: -0.12, breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="d" treeY={g - 140} t={t} />
      <Plane cam={cam} depth={1}>
        <Slab y={g + 120} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={BEN} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a2c" side="right" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} />
      <Particles seed={1564} n={14} bokeh fall={8} leaves={FALL} />
      <LowScrim />
      <Grade sunX={760} sunY={620} warm="255,230,190" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={11.1} top={200} size={124} />
      <Chip text="Bare rock" t={t} t0={11.15} x={60} y={200} icon="check" big />
      <Chip text="Pavement" t={t} t0={11.75} x={60} y={330} icon="check" big />
      <Chip text="Boardwalks" t={t} t0={12.3} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: hands push a rubber tip onto the pole (12.9 - 15.55) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.65), rot: hh.rot };
  const push = at(t, [13.3, 14.5], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="e" treeY={1100} blur={16} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Svg>
            {/* pole held upside down, tip pointing up */}
            <g transform="translate(540,620) rotate(180)">
              <BigPole x={0} y={0} angle={0} cap={1} capOff={-(1 - push) * 170} />
            </g>
            {/* thumb and fingers on the cap */}
            <g transform={`translate(${560},${mix(470, 620, push)})`}>
              <rect x={-70} y={-120} width={140} height={110} rx={50} fill={BEN.skin} />
              <path d="M-70,-60 Q-110,-40 -100,10" stroke={BEN.skinShade} strokeWidth={8} fill="none" />
            </g>
            <Fist x={520} y={1300} r={-90} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1565} n={12} bokeh fall={6} />
      <LowScrim />
      <Grade sunX={760} sunY={620} warm="255,230,190" vignette={0.5} />
      <Chip text="Push a rubber tip on" t={t} t0={13.4} x={60} y={200} icon="check" big />
      <Chip text="One on each pole" t={t} t0={14.4} x={60} y={1180} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: capped tip grips the rock, no clicking (15.55 - 19.23) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x - lt * 6, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.7), rot: hh.rot };
  const plant = at(t, [15.8, 16.4], [0, 1], outExpo);
  const ang = 14;
  const tipY = mix(1040, 1184, plant);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="f" treeY={1000} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,1150 Q400,1130 1300,1200 L1300,2400 L-200,2400 Z" fill={ROCK} />
          <path d="M-200,1150 Q400,1130 1300,1200 L1300,1222 Q400,1152 -200,1172 Z" fill={ROCK3} />
          <path d="M100,1400 L380,1600 M640,1350 L900,1700" stroke={ROCK2} strokeWidth={8} opacity={0.6} />
        </Svg>
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Svg>
            <BigPole x={500} y={tipY - 24} angle={ang} cap={1} />
            <Fist x={500 + Math.sin((ang * Math.PI) / 180) * 1300} y={tipY - 24 - Math.cos((ang * Math.PI) / 180) * 1300} r={ang} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1566} n={12} bokeh fall={6} leaves={FALL} />
      <LowScrim />
      <Grade sunX={760} sunY={620} warm="255,230,190" vignette={0.5} />
      <Readout label="RUBBER ON ROCK" value="Grips" ok={true} t={t} t0={16.3} x={60} y={200} />
      <Chip text="No clicking" t={t} t0={17.5} x={60} y={420} icon="check" big />
      <Chip text="No scratching" t={t} t0={18.2} x={60} y={550} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: on mud and snow the tip comes off and the metal bites (19.23 - 23.1) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.87), rot: hh.rot };
  const pull = at(t, [20.2, 21.0], [0, 1], outExpo);
  const plant = at(t, [21.4, 21.9], [0, 1], outExpo);
  const ang = 10;
  const tipY = mix(1100, 1240, plant);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="g" treeY={1000} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,1160 Q400,1140 1300,1190 L1300,2400 L-200,2400 Z" fill="#5a4532" />
          <path d="M-200,1160 Q400,1140 1300,1190 L1300,1214 Q400,1162 -200,1184 Z" fill="#6d543c" />
          <path d="M-200,1260 Q200,1220 520,1270 Q300,1330 -200,1320 Z" fill="#eef2f4" opacity={0.9} />
          <path d="M620,1300 Q900,1250 1300,1290 L1300,1380 Q900,1360 620,1300 Z" fill="#eef2f4" opacity={0.9} />
          <ellipse cx={820} cy={1500} rx={160} ry={24} fill="#8fa2ad" opacity={0.5} />
          {/* metal tip sunk in */}
          <ellipse cx={500 + 10} cy={1224} rx={30 * plant} ry={8 * plant} fill="#3e3024" />
        </Svg>
        <Subject rimX={6} col="rgba(240,236,225,0.8)">
          <Svg>
            <BigPole x={500} y={tipY} angle={ang} cap={pull < 0.99 ? 1 : 0} capOff={pull * 0} />
            {/* the cap being pulled off by a hand, then pocketed */}
            {pull > 0 && pull < 0.99 && <Fist x={500 + pull * 220 + 20} y={tipY - 70 - pull * 200} r={-25} />}
            {pull >= 0.99 && (
              <g>
                <g transform="translate(760,900) rotate(-30)">
                  <path d="M-30,-130 L30,-130 L36,-10 Q36,24 0,24 Q-36,24 -36,-10 Z" fill={RUBBER} />
                </g>
                <Fist x={780} y={930} r={-25} />
              </g>
            )}
            <Fist x={500 + Math.sin((ang * Math.PI) / 180) * 1300} y={tipY - Math.cos((ang * Math.PI) / 180) * 1300} r={ang} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1567} n={14} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="240,234,222" cool="40,55,70" vignette={0.55} />
      <Chip text="Mud, snow, ice" t={t} t0={19.4} x={60} y={200} icon="none" big />
      <Chip text="Tip off" t={t} t0={20.4} x={60} y={330} icon="check" big />
      <Chip text="Metal bites" t={t} t0={21.6} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: golden light, Ben strides across the slab (23.1 - 24.65) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y + lt * 6, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1500;
  const ph = t * 2.6;
  const p: HikerProps = { x: 340 + lt * 90, y: g + 130, scale: 2.4, phase: ph, walk: 0.6, lean: 0.04, poles: true, slope: -0.12, handOverride: null, breathe: 0 };
  void freeHand;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g - 140} t={t} />
      <Plane cam={cam} depth={1}>
        <Slab y={g + 120} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={BEN} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2a3a2c" side="right" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1] - 100} strength={0.45} />
      <Particles seed={1568} n={22} bokeh fall={8} leaves={FALL} />
      <LowScrim />
      <Grade sunX={760} sunY={620} warm="255,226,180" />
      <Readout label="SPARE TIPS" value="In the pocket" ok={true} t={t} t0={23.2} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/trekking-pole-rubber-tips-5-pack-cut.png"
      cutoutH={520}
      spec="REPLACEMENT CAPS · PACK OF 5"
      name={
        <>
          Trekking Pole
          <br />
          Rubber Tips
        </>
      }
      nameSize={96}
      price="$7.99"
      save="Save this before your next rocky hike"
    />
  );
};

export const V156: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={5.04} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.99} to={7.76} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.99} />
    </Scene>
    <Scene from={7.71} to={9.8} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={7.71} />
    </Scene>
    <Scene from={9.75} to={12.95} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.75} />
    </Scene>
    <Scene from={12.9} to={15.6} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.9} />
    </Scene>
    <Scene from={15.55} to={19.28} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={15.55} />
    </Scene>
    <Scene from={19.23} to={23.15} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={19.23} />
    </Scene>
    <Scene from={23.1} to={24.65} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={23.1} />
    </Scene>
    <Scene from={24.45} to={29} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.99, 1600],
        [4.99, 7.71, 1660],
        [7.71, 9.75, 1600],
        [9.75, 12.9, 1600],
        [12.9, 15.55, 1660],
        [15.55, 19.23, 1660],
        [19.23, 23.1, 1660],
        [23.1, 24.45, 1600],
      ]}
    />
  </AbsoluteFill>
);
