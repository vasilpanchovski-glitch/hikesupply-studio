// V115: "His spare socks were wetter than his feet." in the cinematic C01 style. Story for the Waterproof Dry Bag (from $16.99,
// live Shopify, 3L to 75L). Advice: snow melts on a pack all morning, so spare socks and gloves go into a dry bag, rolled shut
// three times, deep inside the pack. No waterproof claims beyond the roll-top dry bag itself.
// End card = real Shopify main photo, cut out (products/waterproof-dry-bag-cut.png, same as C01).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, STORM, WINTER, WinterBackdrop } from "../winter";
import vo from "../vo/v115.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const PACK = "#2f5d7c";
const PACK2 = "#22465e";
const BAG = "#F2C531";
const BAG2 = "#D9AC1E";

const MARK: Outfit = {
  ...JAKE,
  skin: "#C98E68",
  skinShade: "#A9724F",
  hair: "#2a1d15",
  beard: "#2a1d15",
  cap: "#3e5f4b",
  capShade: "#2e4a39",
  jacket: "#8a3b3b",
  jacketShade: "#6b2c2c",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: PACK,
  packShade: PACK2,
  glove: "#3a3a3a",
};

const Slush: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y} Q540,${y - 24} 1480,${y} L1480,2600 L-400,2600 Z`} fill="#c9d2d6" />
    <path d={`M-400,${y + 20} Q540,${y} 1480,${y + 20} L1480,${y + 120} Q540,${y + 100} -400,${y + 120} Z`} fill="#8e9a9c" opacity={0.7} />
    {Array.from({ length: 14 }, (_, i) => (
      <ellipse key={i} cx={-300 + i * 130} cy={y + 30 + ((i * 67) % 300)} rx={70 + (i % 3) * 30} ry={14} fill={i % 3 ? "#e9eef0" : "#7c8a8e"} opacity={0.8} />
    ))}
  </Svg>
);

const Sock: React.FC<{ x: number; y: number; s?: number; rot?: number; wet?: number; col?: string }> = ({ x, y, s = 1, rot = 0, wet = 0, col = "#9a7b5a" }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M-40,-160 L40,-160 L40,40 Q40,80 90,90 Q140,100 140,140 Q140,180 90,180 L-10,180 Q-40,180 -40,140 Z" fill={col} />
    <rect x={-40} y={-160} width={80} height={36} fill="#6f5640" />
    <path d="M-40,-90 L40,-90 M-40,-50 L40,-50" stroke="#b8987a" strokeWidth={6} opacity={0.6} />
    <path d="M-40,40 Q-40,180 90,180 Q140,180 140,140 Q60,150 0,120 Q-30,100 -40,40 Z" fill="#3b2c1e" opacity={0.5 * wet} />
    <path d="M-40,-160 L40,-160 L40,40 Q40,80 90,90 Q140,100 140,140 Q140,180 90,180 L-10,180 Q-40,180 -40,140 Z" fill="#1e2a33" opacity={0.35 * wet} />
  </g>
);

const Glove: React.FC<{ x: number; y: number; s?: number; rot?: number; wet?: number }> = ({ x, y, s = 1, rot = 0, wet = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M-60,120 L-60,-20 L-80,-60 Q-90,-80 -70,-86 Q-54,-88 -44,-60 L-44,-120 Q-44,-140 -28,-140 Q-12,-140 -12,-120 L-12,-140 Q-12,-160 4,-160 Q20,-160 20,-140 L20,-126 Q20,-146 36,-146 Q52,-146 52,-126 L52,-100 Q52,-116 66,-116 Q80,-116 80,-96 L80,120 Z" fill="#3a3a3a" />
    <rect x={-64} y={90} width={148} height={40} rx={8} fill="#2a2a2a" />
    <path d="M-60,120 L-60,-20 L80,-20 L80,120 Z" fill="#0f1a22" opacity={0.3 * wet} />
  </g>
);

const Drips: React.FC<{ x: number; y: number; t: number; w: number; on?: number }> = ({ x, y, t, w, on = 1 }) => (
  <g>
    {[0, 1, 2, 3].map((i) => {
      const k = (t * 1.3 + i * 0.27) % 1;
      return <ellipse key={i} cx={x - w / 2 + (i * w) / 3} cy={y + k * 260} rx={9} ry={14} fill="#cfe9f7" opacity={on * (1 - k)} />;
    })}
  </g>
);

// Dry bag (screen coords, base centre). roll 0..3 = number of folds done, fill 0..1 = how full.
const DryBagBig: React.FC<{ x: number; y: number; s?: number; roll: number; open?: number }> = ({ x, y, s = 1, roll, open = 0 }) => {
  const H = 520 - Math.min(3, roll) * 50;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <ellipse cx={20} cy={10} rx={200} ry={30} fill="rgba(0,0,0,0.25)" />
      <path d={`M-170,0 L-170,${-H + 60} Q-170,${-H} -110,${-H} L110,${-H} Q170,${-H} 170,${-H + 60} L170,0 Z`} fill={BAG} />
      <path d={`M60,0 L60,${-H} L110,${-H} Q170,${-H} 170,${-H + 60} L170,0 Z`} fill={BAG2} />
      <rect x={-140} y={-H + 30} width={26} height={H - 60} rx={12} fill="#fff2b0" opacity={0.5} />
      {open > 0 && <ellipse cx={0} cy={-H} rx={170} ry={40 * open} fill="#3a3220" />}
      {/* rolled folds */}
      {Array.from({ length: Math.floor(roll) }, (_, i) => (
        <rect key={i} x={-182} y={-H - 34 - i * 30} width={364} height={40} rx={18} fill={i % 2 ? BAG2 : "#e8ba28"} />
      ))}
      {roll >= 3 && (
        <g>
          <rect x={-200} y={-H - 128} width={60} height={44} rx={10} fill="#222" />
          <rect x={140} y={-H - 128} width={60} height={44} rx={10} fill="#222" />
        </g>
      )}
    </g>
  );
};

// ============ S1 HOOK CLOSE-UP: boots splashing through slush (0 - 2.49) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 20, y: hh.y, zoom: mix(1.04, 1.1, t / 2.49), rot: hh.rot };
  const g = 1750;
  const ph = t * 3.2;
  const p: HikerProps = { x: 470 + t * 60, y: g + 40, scale: 6.2, phase: ph, walk: 0.8, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={1300} t={t} blur={6} snow={0.6} />
      <Plane cam={cam} depth={1}>
        <Slush y={g - 40} />
        <Subject rimX={5} col="rgba(230,235,255,0.75)">
          <Person {...p} outfit={MARK} expression="neutral" />
          {[0, 1].map((j) => {
            const k = ((t * 1.0 + j * 0.5) % 1);
            return (
              <g key={j} opacity={1 - k}>
                {Array.from({ length: 7 }, (_, i) => (
                  <circle key={i} cx={p.x - 120 + j * 220 + Math.cos(i) * k * 160} cy={g - 40 - Math.sin((i / 7) * Math.PI) * k * 180} r={10 + (i % 3) * 5} fill="#b9c6cb" />
                ))}
              </g>
            );
          })}
        </Subject>
      </Plane>
      <Particles seed={1151} n={16} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="235,238,245" cool="40,60,90" />
      <Title text={"His spare\nsocks were\nwetter than\nhis feet."} t={t} t0={0} top={120} size={118} />
    </AbsoluteFill>
  );
};

// ============ S1b MEDIUM: Mark climbs on, the plan: dry socks at the summit (2.49 - 5.61) ============
const S1b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.12), rot: hh.rot };
  const g = 1500;
  const ph = t * 3;
  const p: HikerProps = { x: 360 + lt * 50, y: g + 110, scale: 2.4, phase: ph, walk: 0.7, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Slush y={g} />
        <Subject rimX={6} col="rgba(230,235,255,0.8)">
          <Person {...p} outfit={MARK} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Particles seed={1152} n={22} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="235,238,245" cool="40,60,90" />
      <Chip text="Wet boots" t={t} t0={2.6} x={60} y={200} icon="x" big />
      <Chip text="Plan: dry socks at the top" t={t} t0={3.6} x={60} y={330} icon="none" big />
    </AbsoluteFill>
  );
};

const SidePack: React.FC<{ x: number; y: number; s: number; wet?: number }> = ({ x, y, s, wet = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-150} y={-460} width={300} height={460} rx={90} fill={PACK} />
    <rect x={-120} y={-320} width={240} height={200} rx={50} fill={PACK2} />
    {/* mesh side pocket */}
    <path d="M110,-260 L190,-250 Q210,-120 180,-20 L110,-20 Z" fill="#1c2f3c" />
    {Array.from({ length: 6 }, (_, i) => (
      <path key={i} d={`M${112 + i * 14},-250 L${112 + i * 14},-24`} stroke="#4b6578" strokeWidth={3} />
    ))}
    {Array.from({ length: 6 }, (_, i) => (
      <path key={`h${i}`} d={`M112,${-240 + i * 38} L${190 - (i === 0 ? 0 : 6)},${-240 + i * 38}`} stroke="#4b6578" strokeWidth={3} />
    ))}
    <path d="M-150,-420 Q0,-500 150,-420" stroke="#f3f6f8" strokeWidth={30} fill="none" opacity={0.8 * wet} />
  </g>
);

// ============ S2 MEDIUM: at the summit, Mark reaches into the side pocket (5.61 - 7.78) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.0, 1.08, lt / 2.17), rot: hh.rot };
  const g = 1500;
  const reach = at(t, [5.8, 6.6], [0, 1]);
  const p: HikerProps = { x: 400, y: g + 90, scale: 2.4, walk: 0, lean: 0.25 * reach, poles: false, handOverride: [mix(30, 110, reach), mix(30, 90, reach)], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g + 60} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g} Q540,${g - 40} 1480,${g} L1480,2600 L-400,2600 Z`} fill={SNOW} />
          <path d={`M-400,${g + 150} Q540,${g + 120} 1480,${g + 150} L1480,2600 L-400,2600 Z`} fill={SNOW2} opacity={0.6} />
        </Svg>
        <Subject rimX={5} col="rgba(230,235,255,0.8)">
          <SidePack x={720} y={g + 110} s={0.75} />
          <Person {...p} outfit={MARK} expression="happy" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Particles seed={1153} n={18} col="#ffffff" fall={24} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="235,238,245" cool="40,60,90" />
      <Chip text="At the summit" t={t} t0={5.7} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the spare socks drip, the gloves too (7.78 - 11.47) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 3.69), rot: hh.rot };
  const up = at(t, [7.8, 8.4], [0, 1]);
  const glove = at(t, [9.5, 10.0], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(230,235,255,0.7)">
          <g transform={`translate(0,${mix(500, 0, up)})`}>
            <Sock x={330} y={900} s={2.2} rot={-8} wet={1} />
            <Drips x={330} y={1300} t={t} w={160} />
            <ellipse cx={330} cy={560} rx={84} ry={66} fill={MARK.glove ?? "#3a3a3a"} />
          </g>
          <g transform={`translate(${mix(500, 0, glove)},0)`}>
            <Glove x={790} y={1060} s={2.0} rot={12} wet={1} />
            <Drips x={810} y={1330} t={t + 0.4} w={180} on={glove} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1154} n={12} col="#ffffff" fall={22} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="235,238,245" cool="40,60,90" vignette={0.55} />
      <Readout label="SPARE SOCKS" value="Soaked" ok={false} t={t} t0={8.6} x={60} y={200} />
      <Chip text="Gloves too" t={t} t0={9.9} x={60} y={520} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: snow landing on the mesh pocket and melting in (11.47 - 13.97) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 2.5), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="e" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(230,235,255,0.7)">
          <SidePack x={300} y={1900} s={3.2} />
          {/* melt running into the pocket */}
          {[0, 1, 2, 3, 4].map((i) => {
            const k = (t * 0.8 + i * 0.2) % 1;
            return <ellipse key={i} cx={680 + i * 40} cy={1100 + k * 500} rx={10} ry={16} fill="#dff1f8" opacity={0.9 * (1 - k)} />;
          })}
        </Subject>
        <Svg>
          {Array.from({ length: 26 }, (_, i) => {
            const k = (t * (0.35 + (i % 5) / 25) + i / 26) % 1;
            return <circle key={i} cx={((i * 197) % 1180) - 50 + Math.sin(t + i) * 20} cy={mix(-80, 1500, k)} r={7 + (i % 4) * 3} fill="#ffffff" opacity={0.85} />;
          })}
        </Svg>
      </Plane>
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="235,238,245" cool="40,60,90" vignette={0.55} />
      <Chip text="Snow melting all morning" t={t} t0={11.6} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: socks and gloves into the dry bag, rolled shut three times (13.97 - 17.2) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 1.0], [1.0, 1.1], outExpo), rot: hh.rot };
  const inn = at(t, [14.2, 14.9], [0, 1]);
  const roll = at(t, [15.4, 16.9], [0, 3], (x) => x);
  const folds = Math.floor(roll + 0.001);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,246,225,0.8)">
          <DryBagBig x={540} y={1420} s={1.25} roll={folds} open={folds === 0 ? 1 : 0} />
          {inn < 1 && (
            <g opacity={1 - at(t, [14.8, 14.95], [0, 1])}>
              <Sock x={540} y={mix(300, 650, inn)} s={1.2} rot={-10} col="#9a7b5a" />
              <Glove x={640} y={mix(260, 640, inn)} s={1.0} rot={20} />
            </g>
          )}
          {/* hands on the roll */}
          {t > 15.2 && (
            <g>
              <ellipse cx={540 - 250} cy={1420 - (520 - folds * 50) * 1.25 - 40} rx={80} ry={64} fill={MARK.skin} />
              <ellipse cx={540 + 250} cy={1420 - (520 - folds * 50) * 1.25 - 40} rx={80} ry={64} fill={MARK.skin} />
            </g>
          )}
        </Subject>
      </Plane>
      <Particles seed={1155} n={12} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="245,240,228" cool="40,60,90" vignette={0.5} />
      <Chip text="Spares in a dry bag" t={t} t0={14.1} x={60} y={200} icon="check" big />
      <Chip text={`Rolled shut ${Math.max(1, folds)}x`} t={t} t0={15.5} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 MEDIUM: the bag goes deep inside the pack (17.2 - 19.82) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.62), rot: hh.rot };
  const down = at(t, [17.5, 18.7], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={1100} t={t} blur={10} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-400,1560 Q540,1530 1480,1560 L1480,2600 L-400,2600 Z" fill={SNOW} />
        </Svg>
        <Subject rimX={4} col="rgba(255,246,225,0.8)">
          {/* pack, top open, seen from above-front */}
          <rect x={210} y={700} width={660} height={900} rx={150} fill={PACK} />
          <ellipse cx={540} cy={740} rx={300} ry={90} fill="#14222c" />
          <g clipPath="url(#packMouth)">
            <DryBagBig x={540} y={mix(780, 1500, down)} s={0.62} roll={3} />
          </g>
          <defs>
            <clipPath id="packMouth">
              <rect x={0} y={-400} width={1080} height={1140 + 0} />
              <ellipse cx={540} cy={740} rx={300} ry={90} />
            </clipPath>
          </defs>
          <path d="M240,740 Q540,860 840,740" stroke={PACK2} strokeWidth={26} fill="none" />
          <rect x={300} y={1000} width={480} height={360} rx={80} fill={PACK2} />
          <ellipse cx={mix(380, 470, down)} cy={mix(620, 800, down)} rx={80} ry={64} fill={MARK.skin} opacity={at(t, [18.7, 19.0], [1, 0])} />
          <ellipse cx={mix(700, 610, down)} cy={mix(620, 800, down)} rx={80} ry={64} fill={MARK.skin} opacity={at(t, [18.7, 19.0], [1, 0])} />
        </Subject>
      </Plane>
      <Particles seed={1156} n={12} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="245,240,228" cool="40,60,90" vignette={0.5} />
      <Chip text="Deep inside the pack" t={t} t0={18.0} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF: summit in sun, dry socks on, Mark heads down warm (19.82 - 24.4) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 22, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1480;
  const ph = t * 3;
  const walk = at(t, [21.6, 22.2], [0, 0.7]);
  const p: HikerProps = { x: 380 + Math.max(0, t - 21.6) * 60, y: g + 100, scale: 2.4, phase: ph, walk, lean: 0.05, poles: false, handOverride: walk > 0.1 ? freeHand(ph, walk) : [40, -110], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="h" treeY={g + 80} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g} Q540,${g - 40} 1480,${g} L1480,2600 L-400,2600 Z`} fill={SNOW} />
          <path d={`M-400,${g + 150} Q540,${g + 120} 1480,${g + 150} L1480,2600 L-400,2600 Z`} fill={SNOW2} opacity={0.6} />
        </Svg>
        <Subject rimX={6} col="rgba(255,230,180,0.9)">
          <Person {...p} outfit={MARK} expression="happy" />
          {walk < 0.1 && <Sock x={p.x + 40 * 2.4} y={g + 100 - 182 * 2.4 - 110 * 2.4 + 150} s={0.7} rot={-10} col="#b08c64" />}
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.35} col="255,246,220" />
      <Particles seed={1157} n={22} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,236,200" />
      <Chip text="Dry socks" t={t} t0={20.2} x={60} y={200} icon="check" big />
      <Chip text="Dry gloves" t={t} t0={21.0} x={60} y={330} icon="check" big />
      <Chip text="Warm feet down" t={t} t0={22.2} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/waterproof-dry-bag-cut.png"
      spec="ROLL-TOP · TAPED SEAMS · 3L TO 75L"
      name={
        <>
          Waterproof
          <br />
          Dry Bag
        </>
      }
      nameSize={104}
      price="from $16.99"
      save="Save this before your next winter hike"
    />
  );
};

export const V115: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.54} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.49} to={5.66} fadeIn={0.06} fadeOut={0.08}>
      <S1b off={2.49} />
    </Scene>
    <Scene from={5.61} to={7.83} fadeIn={0.08} fadeOut={0.08}>
      <S2 off={5.61} />
    </Scene>
    <Scene from={7.78} to={11.52} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={7.78} />
    </Scene>
    <Scene from={11.47} to={14.02} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={11.47} />
    </Scene>
    <Scene from={13.97} to={17.25} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={13.97} />
    </Scene>
    <Scene from={17.2} to={19.87} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={17.2} />
    </Scene>
    <Scene from={19.82} to={24.4} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={19.82} />
    </Scene>
    <Scene from={24.1} to={28} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 5.61, 1560],
        [5.61, 7.78, 1560],
        [7.78, 11.47, 1560],
        [11.47, 13.97, 1560],
        [13.97, 19.82, 1560],
        [19.82, 24.1, 1560],
      ]}
    />
  </AbsoluteFill>
);
