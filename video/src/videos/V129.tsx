// V129: "She fell before she left the parking lot." in the cinematic C01 style. Story for the Chain Ice Cleats (Stainless
// Steel Spikes for Boots, Pair, $26.99, live Shopify). Advice kept to what the listing and common winter guidance say:
// trailheads get packed by many boots, melt by day and refreeze at night, so they are often the iciest part of a hike.
// Put the cleats on at the car, toe loop first, then over the heel; short flat-footed steps; chain cleats are not crampons,
// so on steep ice turn back. End card = real Shopify product photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, WINTER, WGOLD, WinterBackdrop, FrostTrail } from "../winter";
import { BootClose, CleatBag, IceLot, SnowCar, Spikes, ICE } from "../icy";
import vo from "../vo/v129.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const MORNING: Sky = { top: "#456f9a", mid: "#b5c8d8", low: "#f3ece0", sun: [820, 600], sunR: 44, sunCol: "#fffcf0", glow: "#f7ead2" };
const NIGHT: Sky = { top: "#18213a", mid: "#33405e", low: "#5d6782", sun: [860, 380], sunR: 26, sunCol: "#e9eef6", glow: "#8090b0" };

const ANA: Outfit = {
  ...GUIDE,
  skin: "#D9A584",
  skinShade: "#BC8866",
  hair: "#3b2416",
  ponytail: "#3b2416",
  beard: null,
  cap: "#B5553A",
  capShade: "#8E3F2A",
  jacket: "#3E6E8E",
  jacketShade: "#2F5670",
  pants: "#3F4349",
  pantsShade: "#2E3136",
  boot: "#6b4630",
  sole: "#2a2421",
  pack: "#D9A34A",
  packShade: "#B5843A",
  glove: "#2a2a2a",
};

// ============ S1 HOOK MEDIUM: Ana at the car, cleats bag in hand, summit far behind (0 - 2.74) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.03, 1.09, t / 2.74), rot: hh.rot };
  const g = 1540;
  const p: HikerProps = { x: 360, y: g + 60, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [70, 30], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={MORNING} uid="a" treeY={g - 200} t={t} />
      <Plane cam={cam} depth={1}>
        <IceLot y={g} />
        <Svg>
          <SnowCar x={860} y={g + 40} s={2.2} flip />
        </Svg>
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={ANA} expression="happy" />
          <Svg>
            <CleatBag x={360 + 70 * 2.3 + 10} y={g + 60 - 182 * 2.3 + 30 * 2.3 + 150} s={0.9} />
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Particles seed={1291} n={22} col="#ffffff" fall={22} />
      <LowScrim />
      <Grade sunX={820} sunY={600} warm="248,240,228" cool="40,60,90" />
      <Title text={"She fell before\nshe left the\nparking lot."} t={t} t0={0} top={110} size={120} />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: first steps across the glazed lot, she slips and falls (2.74 - 5.27) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const fall = at(t, [3.0, 3.42], [0, 1], outExpo);
  const shake = at(t, [3.38, 3.5, 4.0], [0, 1, 0]);
  const hh = handheld(t, 0.45, shake * 6);
  const cam: Cam = { x: hh.x - lt * 8, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.53), rot: hh.rot };
  const g = 1500;
  const ph = t * 3;
  const walk = 0.5 * (1 - fall);
  const px = 700 + Math.min(t - 2.74, 0.3) * 120 + fall * 40;
  const p: HikerProps = { x: px, y: g + 60, scale: 2.1, phase: ph, walk, lean: mix(0.04, -0.3, fall), poles: false, handOverride: fall > 0.2 ? [60, -40] : freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={MORNING} uid="b" treeY={g - 220} t={t} />
      <Plane cam={cam} depth={1}>
        <IceLot y={g} />
        <Svg>
          <SnowCar x={-260} y={g + 30} s={1.7} />
          <SnowCar x={1080} y={g - 40} s={1.2} flip body="#8a5b4a" shade="#6c4538" />
        </Svg>
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <g transform={`rotate(${-fall * 58} ${px - 40} ${g + 60 + 10}) translate(0 ${fall * 30})`}>
            <Person {...p} outfit={ANA} expression={fall > 0.3 ? "tired" : "neutral"} />
          </g>
        </Subject>
        {fall > 0 && (
          <Svg>
            {[0, 1, 2].map((i) => (
              <line key={i} x1={px + 40} y1={g + 70 + i * 14} x2={px + 40 + 200 * fall} y2={g + 72 + i * 14} stroke="#ffffff" strokeWidth={8} strokeLinecap="round" opacity={0.8 * (1 - at(t, [4.2, 4.8], [0, 1]))} />
            ))}
          </Svg>
        )}
      </Plane>
      <Particles seed={1292} n={22} col="#ffffff" fall={22} />
      <LowScrim />
      <Grade sunX={820} sunY={600} warm="248,240,228" cool="40,60,90" />
      <Chip text="Cleats still in the bag" t={t} t0={3.5} x={60} y={200} icon="x" big />
      <Chip text="Ten steps from the car" t={t} t0={4.2} x={60} y={330} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the trailhead snow, packed down by boot after boot (5.27 - 7.72) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y - lt * 14, zoom: mix(1.04, 1.12, lt / 2.45), rot: hh.rot };
  const prints = Array.from({ length: 22 }, (_, i) => ({
    x: 120 + ((i * 197) % 860),
    y: 760 + ((i * 131) % 980),
    r: ((i * 41) % 50) - 25,
    t0: 5.4 + i * 0.085,
  }));
  return (
    <AbsoluteFill style={{ background: SNOW2 }}>
      <Plane cam={cam} depth={0.5} blur={10}>
        <Svg>
          <rect x={-300} y={0} width={1700} height={700} fill="#c9d6de" />
          <SnowCar x={300} y={640} s={2.4} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-300,620 L1400,560 L1400,2400 L-300,2400 Z" fill="#dfe8ee" />
          {prints.map((q, i) => {
            const k = at(t, [q.t0, q.t0 + 0.25], [0, 1], outExpo);
            return (
              <g key={i} transform={`translate(${q.x},${q.y}) rotate(${q.r})`} opacity={k}>
                <path d="M-34,-70 Q0,-92 34,-70 L30,10 Q0,22 -30,10 Z" fill="#b6c8d3" />
                <path d="M-26,30 Q0,22 26,30 L24,72 Q0,82 -24,72 Z" fill="#b6c8d3" />
                {[-14, 0, 14].map((dx) => (
                  <rect key={dx} x={dx - 4} y={-60} width={8} height={56} rx={3} fill="#a3b8c5" />
                ))}
              </g>
            );
          })}
          {/* the packed lane turns glassy as the prints fill in */}
          <path d="M-300,1100 Q540,1040 1400,1120 L1400,1500 Q540,1420 -300,1520 Z" fill={ICE} opacity={at(t, [6.6, 7.6], [0, 0.55])} />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${60 + i * 260},${1260 - (i % 2) * 30} l170,-10`} stroke="#ffffff" strokeWidth={12} strokeLinecap="round" opacity={at(t, [6.8, 7.6], [0, 0.9])} />
          ))}
        </Svg>
      </Plane>
      <Particles seed={1293} n={12} col="#ffffff" fall={18} />
      <LowScrim />
      <Grade sunX={820} sunY={400} warm="248,240,228" cool="40,60,90" vignette={0.55} />
      <Chip text="Hundreds of boots" t={t} t0={6.6} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 WIDE: same lot, sun to night: puddles melt by day, glaze over at night (7.72 - 9.88) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.16), rot: hh.rot };
  const g = 1460;
  const night = at(t, [8.5, 9.2], [0, 1]);
  const melt = at(t, [7.8, 8.3], [0, 1]) * (1 - night);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={night > 0.5 ? NIGHT : WINTER} uid={night > 0.5 ? "dn" : "dd"} treeY={g - 220} t={t} />
      <Plane cam={cam} depth={1}>
        <IceLot y={g} glaze={night} shine={night} />
        <Svg>
          {[[200, 1640, 140], [620, 1760, 190], [880, 1580, 110]].map(([x, y, r], i) => (
            <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.22} fill={night > 0.5 ? "#e4f1f8" : "#7f97a6"} opacity={Math.max(melt, night) * 0.85} />
          ))}
          <SnowCar x={780} y={g + 20} s={1.8} flip />
        </Svg>
      </Plane>
      <AbsoluteFill style={{ background: `rgba(10,16,34,${0.35 * night})` }} />
      <Particles seed={1294} n={14} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={820} sunY={600} warm={night > 0.5 ? "200,214,240" : "250,240,226"} cool="30,45,80" />
      <Readout label="BY DAY" value="Melts" ok={null} t={t} t0={7.85} x={60} y={200} />
      <Readout label="AT NIGHT" value="Refreezes" ok={false} t={t} t0={8.7} x={60} y={520} />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: from the glazed lot up the trail to the summit: the ice is at the start (9.88 - 12.53) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y + mix(160, 0, at(lt, [0, 2.4], [0, 1])), zoom: mix(1.08, 1.0, lt / 2.65), rot: hh.rot };
  const g = 1420;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <IceLot y={g} />
        <Svg>
          <SnowCar x={160} y={g + 40} s={1.4} />
          <SnowCar x={500} y={g + 30} s={1.3} body="#8a5b4a" shade="#6c4538" />
          {/* trailhead sign and the trail climbing away in soft snow */}
          <rect x={840} y={g - 220} width={14} height={200} fill="#5a4030" />
          <rect x={770} y={g - 250} width={160} height={70} rx={8} fill="#6b4630" />
          <rect x={786} y={g - 236} width={128} height={10} rx={4} fill="#e8dcc0" />
          <rect x={786} y={g - 214} width={90} height={10} rx={4} fill="#e8dcc0" />
          <path d={`M880,${g - 40} Q1000,${g - 140} 960,${g - 240} Q920,${g - 320} 1100,${g - 380}`} stroke={SNOW} strokeWidth={46} fill="none" strokeLinecap="round" />
          {/* the glazed lot pulses brighter */}
          <path d={`M-400,${g + 40} L1480,${g + 20} L1480,${g + 420} L-400,${g + 460} Z`} fill="#ffffff" opacity={0.18 + 0.12 * Math.sin(t * 5)} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} col="255,246,226" />
      <Particles seed={1295} n={16} col="#ffffff" fall={12} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="248,240,228" cool="40,60,90" />
      <Readout label="ICIEST PART OF THE HIKE" value="Often the trailhead" ok={false} t={t} t0={10.5} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: at the car, cleat on: toe loop first, then over the heel (12.53 - 17.62) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 5.09), rot: hh.rot };
  const toe = at(t, [15.35, 15.95], [0, 1], outExpo);
  const heel = at(t, [16.25, 17.0], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={MORNING} uid="f" treeY={900} t={t} blur={12} />
      <Plane cam={cam} depth={0.7} blur={9}>
        <Svg>
          <SnowCar x={760} y={1180} s={3.4} flip />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={1200} width={1880} height={900} fill="#c4d6df" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${-100 + i * 420},${1420 + i * 40} l220,-8`} stroke="#ffffff" strokeWidth={10} strokeLinecap="round" opacity={0.7} />
          ))}
          <BootClose toe={toe} heel={heel} hand={at(t, [16.1, 16.3, 17.1, 17.4], [0, 1, 1, 0])} pants={ANA.pants} pantsShade={ANA.pantsShade} boot={ANA.boot} sole={ANA.sole} />
        </Svg>
      </Plane>
      <Particles seed={1296} n={12} col="#ffffff" fall={20} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,225" cool="40,60,90" vignette={0.5} />
      <Chip text="Cleats on at the car" t={t} t0={14.6} x={60} y={200} icon="check" big />
      <Chip text="Toe loop first" t={t} t0={15.4} x={60} y={330} icon="check" big />
      <Chip text="Then over the heel" t={t} t0={16.3} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 MEDIUM: short, flat-footed steps across the lot (17.62 - 19.62) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.0), rot: hh.rot };
  const g = 1500;
  const ph = t * 4.2;
  const p: HikerProps = { x: 340 + lt * 60, y: g + 80, scale: 2.4, phase: ph, walk: 0.32, lean: 0.06, poles: false, handOverride: [40, 40], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={MORNING} uid="g" treeY={g - 200} t={t} />
      <Plane cam={cam} depth={1}>
        <IceLot y={g} />
        <Svg>
          <SnowCar x={-120} y={g + 40} s={2.0} flip />
        </Svg>
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={ANA} expression="neutral" />
          <Spikes p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Particles seed={1297} n={18} col="#ffffff" fall={18} />
      <LowScrim />
      <Grade sunX={820} sunY={600} warm="248,240,228" cool="40,60,90" />
      <Chip text="Short steps" t={t} t0={17.8} x={60} y={200} icon="check" big />
      <Chip text="Feet flat" t={t} t0={18.35} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 WIDE: a steep icy slab ahead; cleats are not crampons, she turns back (19.62 - 21.7) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.08), rot: hh.rot };
  const g = 1560;
  const turn = t > 20.55;
  const p: HikerProps = { x: 360 - (turn ? (t - 20.55) * 90 : 0), y: g + 60, scale: 2.2, phase: t * 3, walk: turn ? 0.45 : 0, lean: 0.04, poles: false, handOverride: turn ? freeHand(t * 3, 0.4) : [30, 30], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="h" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          {/* steep glazed slab rising to the right */}
          <path d={`M500,${g + 20} L1480,${g - 900} L1480,${g + 200} L500,${g + 80} Z`} fill="#7fa6bd" />
          <path d={`M500,${g + 20} L1480,${g - 900} L1480,${g - 800} L560,${g + 50} Z`} fill="#e6f3fa" opacity={0.85} />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${620 + i * 190},${g - 120 - i * 180} l130,-120`} stroke="#ffffff" strokeWidth={9} strokeLinecap="round" opacity={0.8} />
          ))}
        </Svg>
        <Subject rimX={turn ? -6 : 6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={ANA} expression="neutral" flip={turn} />
          {!turn && <Spikes p={p} />}
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Particles seed={1298} n={18} col="#ffffff" fall={18} />
      <LowScrim />
      <Grade sunX={820} sunY={560} warm="248,240,228" cool="40,60,90" />
      <Chip text="Steep ice ahead" t={t} t0={19.8} x={60} y={200} icon="x" big />
      <Chip text="Turn back" t={t} t0={20.5} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF WIDE: golden light, Ana walks steady up the snowy trail (21.7 - 23.25) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 26, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1520;
  const ph = t * 3;
  const p: HikerProps = { x: 330 + lt * 60, y: g + 40 - lt * 10, scale: 2.4, phase: ph, walk: 0.6, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0, slope: 0.05 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="i" treeY={g - 200} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={0.05} snow={1} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={ANA} expression="happy" />
          <Spikes p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.45} col="255,236,200" />
      <Particles seed={1299} n={22} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,226,180" />
      <Readout label="FROM THE CAR" value="Steady" ok={true} t={t} t0={21.8} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/chain-ice-cleats-cut.png"
      cutoutH={560}
      shadowY={760}
      spec="PAIR · STAINLESS CHAINS · FITS US W4 - M11"
      name={
        <>
          Chain Ice Cleats
          <br />
          for Boots, Pair
        </>
      }
      nameSize={100}
      price="$26.99"
      save="Save this before your next winter hike"
    />
  );
};

export const V129: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.79} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.74} to={5.32} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.74} />
    </Scene>
    <Scene from={5.27} to={7.77} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.27} />
    </Scene>
    <Scene from={7.72} to={9.93} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.72} />
    </Scene>
    <Scene from={9.88} to={12.58} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={9.88} />
    </Scene>
    <Scene from={12.53} to={17.67} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={12.53} />
    </Scene>
    <Scene from={17.62} to={19.67} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={17.62} />
    </Scene>
    <Scene from={19.62} to={21.75} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={19.62} />
    </Scene>
    <Scene from={21.7} to={23.3} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={21.7} />
    </Scene>
    <Scene from={23.2} to={27.6} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.74, 1600],
        [2.74, 5.27, 1600],
        [5.27, 7.72, 1660],
        [7.72, 9.88, 1600],
        [9.88, 12.53, 1600],
        [12.53, 17.62, 1660],
        [17.62, 19.62, 1600],
        [19.62, 21.7, 1600],
        [21.7, 23.2, 1600],
      ]}
    />
  </AbsoluteFill>
);
