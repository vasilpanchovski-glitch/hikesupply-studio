// V117: "She ate snow for water." in the cinematic C01 style. Story for the Hydration Bladder — Insulated Water Reservoir
// (from $14.99, live Shopify, 1L or 2L). Advice kept conservative: melting snow in your mouth costs body heat and a handful
// is very little water; carry enough water for the whole hike, keep the bladder inside the pack against your back, sip at
// every break even when not thirsty. No numbers, no medical claims.
// End card = real Shopify main photo, cut out with the infographic text removed (products/hydration-bladder-...-cut.png).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { SNOW, SNOW2, STORM, WGOLD, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v117.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const TEAL = "#5cc9bd";
const TEAL2 = "#3fa79c";
const CAP = "#2546b0";
const TUBE = "#2f7fd0";
const WATER = "#7fd3f0";

const NORA: Outfit = {
  ...JAKE,
  skin: "#F0C7A8",
  skinShade: "#D3A585",
  hair: "#8a4b2a",
  ponytail: "#8a4b2a",
  beard: null,
  cap: "#C9D3DA",
  capShade: "#A6B2BA",
  jacket: "#8E3B5B",
  jacketShade: "#702D47",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  boot: "#5a3a26",
  sole: "#262220",
  pack: "#3f5566",
  packShade: "#2f4050",
  glove: "#2a2a2a",
};
const GLOVE = "#2a2a2a";

const SnowGround: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y} Q540,${y - 30} 1480,${y} L1480,2600 L-400,2600 Z`} fill={SNOW} />
    <path d={`M-400,${y + 160} Q540,${y + 130} 1480,${y + 160} L1480,2600 L-400,2600 Z`} fill={SNOW2} opacity={0.6} />
    {Array.from({ length: 12 }, (_, i) => (
      <ellipse key={i} cx={-300 + i * 150} cy={y + 60 + ((i * 71) % 260)} rx={60} ry={8} fill="#cfd9df" opacity={0.6} />
    ))}
  </Svg>
);

// Drink tube from the pack's shoulder strap to the hand (person local units, drawn inside the hiker transform).
const Tube: React.FC<{ p: HikerProps; bite?: boolean }> = ({ p, bite = true }) => {
  const g = hikerGeometry(p);
  const [sx, sy] = g.sh;
  const h = g.arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${sx - 18},${sy + 6} Q${sx + 14},${sy + 50} ${h[0]},${h[1] + 4}`} stroke={TUBE} strokeWidth={7} fill="none" strokeLinecap="round" />
      {bite && <rect x={h[0] - 4} y={h[1] - 12} width={10} height={14} rx={3} fill="#e8eef2" />}
    </g>
  );
};

// Illustrated bladder (screen coords, centre top at x,y). level 0..1 water fill.
const BladderArt: React.FC<{ x: number; y: number; s: number; level: number; t: number; uid: string }> = ({ x, y, s, level, t, uid }) => {
  const W = 300;
  const H = 640;
  const wy = H - H * 0.86 * level - 40;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <defs>
        <clipPath id={`bl${uid}`}>
          <rect x={-W / 2} y={0} width={W} height={H} rx={46} />
        </clipPath>
      </defs>
      <rect x={-W / 2 + 14} y={14} width={W} height={H} rx={46} fill="rgba(0,0,0,0.22)" />
      <rect x={-W / 2} y={0} width={W} height={H} rx={46} fill={TEAL} opacity={0.75} />
      <g clipPath={`url(#bl${uid})`}>
        <path d={`M${-W / 2},${wy + Math.sin(t * 4) * 6} Q0,${wy - 14 + Math.sin(t * 4 + 1) * 6} ${W / 2},${wy + Math.sin(t * 4 + 2) * 6} L${W / 2},${H} L${-W / 2},${H} Z`} fill={TEAL2} opacity={0.95} />
        {level > 0.05 &&
          [0, 1, 2, 3].map((i) => {
            const k = (t * 0.8 + i * 0.25) % 1;
            return <circle key={i} cx={-80 + i * 55} cy={mix(H - 40, wy + 20, k)} r={8 + (i % 2) * 4} fill="#ffffff" opacity={0.45 * (1 - k)} />;
          })}
      </g>
      <rect x={-W / 2} y={0} width={W} height={H} rx={46} fill="none" stroke="#2f8a80" strokeWidth={6} />
      <rect x={-W / 2 + 26} y={30} width={60} height={14} rx={7} fill="#e9f3ef" />
      <rect x={W / 2 - 86} y={30} width={60} height={14} rx={7} fill="#e9f3ef" />
      <rect x={-W / 2 + 26} y={90} width={22} height={420} rx={11} fill="rgba(255,255,255,0.28)" />
      <circle cx={-10} cy={160} r={62} fill={CAP} />
      <circle cx={-10} cy={160} r={44} fill="#3358cc" />
      <rect x={-18} y={150} width={16} height={90} rx={6} fill="#1a1a1a" />
      <rect x={-40} y={H - 70} width={60} height={50} rx={14} fill="#e8eef2" />
      <path d={`M-10,${H - 20} Q-20,${H + 120} 120,${H + 140} Q260,${H + 150} 250,${H - 60}`} stroke={TUBE} strokeWidth={18} fill="none" strokeLinecap="round" />
    </g>
  );
};

// ============ S1 HOOK WIDE: Nora in the snowy woods, the tube gives nothing (0 - 3.0) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.03, 1.1, t / 3.0), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 380, y: g + 130, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [44, -150], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Subject rimX={6} col="rgba(230,235,255,0.8)">
          <Person {...p} outfit={NORA} expression="tired" />
          <Tube p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Particles seed={1171} n={26} col="#ffffff" fall={34} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="235,238,245" cool="40,60,90" />
      <Title text={"She ate\nsnow for\nwater."} t={t} t0={0} top={120} size={130} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: a gloved hand scoops a handful of snow and lifts it (3.0 - 5.36) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 2.36), rot: hh.rot };
  const scoop = at(t, [3.2, 3.9], [0, 1], outExpo);
  const lift = at(t, [4.2, 5.3], [0, 1]);
  const hx = mix(760, 520, scoop);
  const hy = mix(1240, 1180, scoop) - lift * 360;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={1000} t={t} blur={10} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-400,1240 Q300,1150 700,1230 Q1000,1290 1480,1240 L1480,2600 L-400,2600 Z" fill={SNOW} />
          <path d="M-400,1400 Q540,1350 1480,1420 L1480,2600 L-400,2600 Z" fill={SNOW2} opacity={0.6} />
          {scoop > 0.3 && <ellipse cx={560} cy={1250} rx={140} ry={34} fill="#c6d3dc" opacity={scoop} />}
          <g transform={`translate(${hx},${hy})`}>
            {/* sleeve */}
            <path d="M120,40 L620,260 L620,520 L60,200 Z" fill={NORA.jacket} />
            <path d="M120,40 L200,10 L640,230 L620,260 Z" fill={NORA.jacketShade} />
            {/* cupped glove */}
            <path d="M-170,-10 Q-180,110 -40,140 Q120,160 180,60 Q200,0 150,-30 L-150,-40 Z" fill={GLOVE} />
            <path d="M-150,-40 Q-160,-90 -110,-90 L120,-80 Q170,-70 150,-30 Z" fill="#3a3a3a" />
            {/* snow in the hand */}
            {scoop > 0.2 && <path d="M-150,-40 Q-120,-150 -10,-160 Q120,-150 150,-40 Z" fill="#ffffff" opacity={Math.min(1, scoop * 1.5)} />}
            {scoop > 0.2 && <path d="M-90,-70 Q-20,-130 60,-80" stroke={SNOW2} strokeWidth={10} fill="none" opacity={scoop} />}
          </g>
        </Svg>
      </Plane>
      <Particles seed={1172} n={18} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="235,238,245" cool="40,60,90" vignette={0.55} />
      <Chip text="An hour from the car" t={t} t0={3.05} x={60} y={200} icon="x" big />
      <Chip text="A handful of snow" t={t} t0={3.76} x={60} y={330} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: Nora shivers, arms in, breath clouds (5.36 - 7.59) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shiver = Math.sin(t * 38) * 3;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.04, 1.12, lt / 2.23), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 520 + shiver, y: g + 260, scale: 2.9, walk: 0, lean: 0.12, poles: false, handOverride: [60, -60], breathe: Math.sin(t * 9) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Subject rimX={5} col="rgba(230,235,255,0.8)">
          <Person {...p} outfit={NORA} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Particles seed={1173} n={30} col="#ffffff" fall={40} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="230,236,248" cool="30,55,95" />
      <Readout label="NORA" value="Colder" ok={false} t={t} t0={5.99} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the snow melts in her palm, warm glow drains into it (7.59 - 10.2) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 2.61), rot: hh.rot };
  const melt = at(t, [8.2, 10.2], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <g transform="translate(540,1180)">
            <path d="M260,80 L760,360 L760,700 L200,260 Z" fill={NORA.jacket} />
            {/* bare palm (glove off) */}
            <path d="M-300,20 Q-320,220 -60,260 Q220,280 300,100 Q320,20 250,-10 L-260,-20 Z" fill={NORA.skin} />
            <path d="M-260,-20 Q-290,-80 -220,-90 L-180,-30 M-150,-40 Q-160,-110 -90,-110 L-60,-40 M-30,-40 Q-30,-120 40,-110 L60,-30 M90,-30 Q110,-100 170,-80 L170,-20" fill={NORA.skin} stroke={NORA.skinShade} strokeWidth={8} />
            <path d="M-200,120 Q0,170 200,110" stroke={NORA.skinShade} strokeWidth={8} fill="none" />
            {/* warm glow leaving the palm into the snow */}
            {[0, 1, 2, 3, 4].map((i) => {
              const k = (t * 0.9 + i * 0.2) % 1;
              return <circle key={i} cx={-160 + i * 80} cy={120 - k * 180} r={18 + k * 20} fill="#ffb26b" opacity={0.5 * (1 - k) * (1 - melt * 0.4)} />;
            })}
            {/* snow mound shrinking to a little water */}
            <path d={`M${-220 * (1 - melt * 0.7)},-10 Q${-160 * (1 - melt * 0.7)},${-250 * (1 - melt * 0.85)} 0,${-270 * (1 - melt * 0.85)} Q${160 * (1 - melt * 0.7)},${-250 * (1 - melt * 0.85)} ${220 * (1 - melt * 0.7)},-10 Z`} fill="#ffffff" />
            <ellipse cx={0} cy={0} rx={60 + melt * 90} ry={10 + melt * 18} fill={WATER} opacity={0.8 * melt} />
          </g>
        </Svg>
      </Plane>
      <Particles seed={1174} n={14} col="#ffffff" fall={24} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="240,236,240" cool="40,60,90" vignette={0.55} />
      <Chip text="Melting costs body heat" t={t} t0={8.15} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: a cup, a pile of snow melts down to a sip at the bottom (10.2 - 13.0) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.8), rot: hh.rot };
  const melt = at(t, [10.3, 12.2], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="e" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={1460} />
        <Svg>
          <ellipse cx={560} cy={1470} rx={300} ry={40} fill="rgba(0,0,0,0.18)" />
          <g transform="translate(560,1460)">
            {/* clear cup */}
            <path d="M-220,-620 L220,-620 L180,0 L-180,0 Z" fill="rgba(220,240,250,0.35)" stroke="#e9f4f8" strokeWidth={10} />
            <path d={`M-186,-60 L186,-60 L180,0 L-180,0 Z`} fill={WATER} opacity={0.9 * melt} />
            {/* snow heap above the rim, sinking */}
            <path d={`M-210,${-620 + melt * 540} Q-140,${-900 + melt * 820} 0,${-930 + melt * 850} Q140,${-900 + melt * 820} 210,${-620 + melt * 540} Z`} fill="#ffffff" opacity={1 - melt * 0.9} />
            <path d="M-190,-560 L-200,-120" stroke="rgba(255,255,255,0.5)" strokeWidth={16} strokeLinecap="round" />
          </g>
        </Svg>
      </Plane>
      <Particles seed={1175} n={12} col="#ffffff" fall={20} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="240,236,240" cool="40,60,90" vignette={0.5} />
      <Readout label="A HANDFUL OF SNOW" value="Barely a sip" ok={false} t={t} t0={10.24} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the fix, the bladder fills to the top (13.0 - 16.5) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.12, at(lt, [0, 1.2], [0, 1], outExpo)), rot: hh.rot };
  const level = at(t, [13.6, 16.0], [0.1, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={1560} />
        <Subject rimX={4} col="rgba(255,246,225,0.8)">
          <Svg>
            <BladderArt x={500} y={760} s={1.12} level={level} t={t} uid="f" />
          </Svg>
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1] - 200} strength={0.2} col="255,246,220" />
      <Particles seed={1176} n={12} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="250,240,225" cool="40,60,90" vignette={0.5} />
      <Chip text="Here's the fix" t={t} t0={13.0} x={60} y={200} icon="none" big />
      <Chip text="Enough for the whole hike" t={t} t0={14.33} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: the bladder slides into the pack's back sleeve (16.5 - 19.31) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.81), rot: hh.rot };
  const k = at(t, [16.8, 18.0], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={1620} />
        <Subject rimX={4} col="rgba(255,246,225,0.8)">
          <Svg>
            <defs>
              <clipPath id="packin">
                <rect x={0} y={0} width={1080} height={820} />
              </clipPath>
            </defs>
            {/* pack seen from the back-panel side, top open */}
            <rect x={210} y={800} width={660} height={860} rx={140} fill={NORA.pack} />
            <rect x={250} y={760} width={580} height={110} rx={40} fill={NORA.packShade} />
            {/* the bladder going in behind the front lip */}
            <g clipPath="url(#packin)">
              <BladderArt x={540} y={mix(130, 520, k)} s={0.95} level={1} t={t} uid="g" />
            </g>
            <rect x={210} y={820} width={660} height={840} rx={140} fill={NORA.pack} />
            <path d="M300,880 Q540,840 780,880" stroke={NORA.packShade} strokeWidth={16} fill="none" />
            {/* shoulder straps and back padding: this side sits against her back */}
            <rect x={300} y={940} width={480} height={520} rx={90} fill={NORA.packShade} />
            <path d="M340,880 Q300,1200 380,1560 M740,880 Q780,1200 700,1560" stroke="#1f2c36" strokeWidth={56} fill="none" strokeLinecap="round" />
            <path d={`M540,${mix(720, 900, k)} Q560,1000 520,1100`} stroke={TUBE} strokeWidth={14} fill="none" opacity={k} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1177} n={12} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="250,240,225" cool="40,60,90" vignette={0.5} />
      <Chip text="Inside the pack" t={t} t0={16.93} x={60} y={200} icon="check" big />
      <Chip text="Against your back" t={t} t0={18.25} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 MEDIUM: on a break, Nora sips from the tube (19.31 - 22.89) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.58), rot: hh.rot };
  const g = 1500;
  const sip = at(t, [19.5, 20.0], [0, 1], outExpo);
  const hand: [number, number] = [mix(30, 44, sip), mix(20, -150, sip)];
  const p: HikerProps = { x: 520, y: g + 240, scale: 2.9, walk: 0, lean: 0.05, poles: false, handOverride: hand, breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="h" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Svg>
          <rect x={-100} y={g + 30} width={420} height={110} rx={50} fill="#6b4a32" />
          <ellipse cx={-100} cy={g + 85} rx={30} ry={55} fill="#8a6446" />
          <path d={`M-100,${g + 32} L300,${g + 30}`} stroke={SNOW} strokeWidth={22} strokeLinecap="round" />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={NORA} expression="neutral" />
          <Tube p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,246,220" />
      <Particles seed={1178} n={18} col="#ffffff" fall={20} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,225" />
      <Chip text="Sip at every break" t={t} t0={19.34} x={60} y={200} icon="check" big />
      <Chip text="Even when not thirsty" t={t} t0={20.76} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF WIDE: golden light, Nora walks out warm (22.89 - 24.9) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 26, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1480;
  const ph = t * 3.2;
  const p: HikerProps = { x: 330 + lt * 60, y: g + 110, scale: 2.3, phase: ph, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="i" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={NORA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.4} col="255,236,200" />
      <Particles seed={1179} n={22} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={600} warm="255,226,180" />
      <Chip text="Finished warm" t={t} t0={23.25} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/hydration-bladder-insulated-water-reservoir-cut.png"
      cutoutH={720}
      spec="1L OR 2L · INSULATED · DRINK TUBE"
      name={
        <>
          Insulated
          <br />
          Hydration Bladder
        </>
      }
      nameSize={100}
      price="from $14.99"
      save="Save this before your winter hike"
    />
  );
};

export const V117: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.05} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.0} to={5.41} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.0} />
    </Scene>
    <Scene from={5.36} to={7.64} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.36} />
    </Scene>
    <Scene from={7.59} to={10.25} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.59} />
    </Scene>
    <Scene from={10.2} to={13.05} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={10.2} />
    </Scene>
    <Scene from={13.0} to={16.55} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={13.0} />
    </Scene>
    <Scene from={16.5} to={19.36} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={16.5} />
    </Scene>
    <Scene from={19.31} to={22.94} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={19.31} />
    </Scene>
    <Scene from={22.89} to={24.9} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={22.89} />
    </Scene>
    <Scene from={24.4} to={28.5} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.0, 1560],
        [3.0, 7.59, 1560],
        [7.59, 13.0, 1560],
        [13.0, 16.5, 1560],
        [16.5, 19.31, 1560],
        [19.31, 24.4, 1560],
      ]}
    />
  </AbsoluteFill>
);
