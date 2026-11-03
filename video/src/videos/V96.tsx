// V96: "Slush at mile two. Numb toes by lunch." in the cinematic C01 style, wet late-November trail.
// Advice (standard, conservative): wet socks pull heat from your feet fast; carry a dry spare pair of wool socks in a sealed bag;
// at the break dry your feet and put on the spare pair; wool keeps you warmer than cotton when it gets damp. No numbers.
// End card = Merino Wool Hiking Socks — 80% Merino, Cushioned Crew, sold as 1 pair, $19.99 (live Shopify), real photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { FrostTrail, SNOW, SNOW2, WGOLD, WINTER, STORM, WinterBackdrop } from "../winter";
import vo from "../vo/v96.json";

const words = vo.words as unknown as Word[];

const LUIS: Outfit = {
  ...JAKE,
  skin: "#C98E6A",
  skinShade: "#A9724F",
  hair: "#1f1712",
  beard: "#1f1712",
  cap: "#B83A55",
  capShade: "#8E2B42",
  jacket: "#2F6F5E",
  jacketShade: "#22544a",
  pants: "#4a4f57",
  pantsShade: "#363a40",
  pack: "#C2662E",
  packShade: "#9a4f22",
  boot: "#6B4630",
  glove: "#2a2a2a",
};

const SOCK_T = "#4f5a52";
const SLUSH = "#a9b1b4";

const BigSock: React.FC<{ x: number; y: number; s?: number; rot?: number; body?: string; damp?: number; t: number; label?: string }> = ({
  x,
  y,
  s = 1,
  rot = 0,
  body = "#6f7a70",
  damp = 0,
  t,
  label,
}) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M0,0 L150,0 L150,240 Q152,282 200,298 L326,322 Q386,338 378,394 Q370,458 300,458 L92,458 Q0,458 0,366 Z" fill={body} stroke="rgba(0,0,0,0.2)" strokeWidth={5} />
    <rect x={0} y={0} width={150} height={56} fill={SOCK_T} />
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={12 + i * 13} y={70} width={5} height={170} fill="rgba(0,0,0,0.07)" />
    ))}
    <path d="M0,366 Q0,458 92,458 L118,458 Q60,412 68,340 Z" fill={SOCK_T} />
    <path d="M300,458 Q370,458 378,394 Q380,358 344,334 Q322,400 300,458 Z" fill={SOCK_T} />
    {label && (
      <text x={75} y={150} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={40} fill="rgba(255,255,255,0.85)" transform="rotate(-90 75 150)">
        {label}
      </text>
    )}
    {damp > 0 && (
      <g opacity={damp}>
        <path d="M0,300 Q120,340 220,300 L300,330 L300,458 L92,458 Q0,458 0,366 Z" fill="rgba(40,60,90,0.35)" />
        {[0, 1, 2].map((i) => {
          const k = (t * 0.9 + i * 0.33) % 1;
          return <path key={i} d={`M${100 + i * 90},${470 + k * 160} q-14,22 0,32 q14,-10 0,-32 Z`} fill="#8fc1e0" opacity={1 - k} />;
        })}
      </g>
    )}
  </g>
);

// Big side-view boot (toe to the right), sole bottom at (x, y).
const Boot: React.FC<{ x: number; y: number; s?: number; wet?: number }> = ({ x, y, s = 1, wet = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-150} y={-560} width={260} height={420} rx={30} fill={LUIS.pants} />
    <path d="M-170,-200 L140,-200 Q340,-170 380,-60 L380,0 L-190,0 L-190,-120 Z" fill="#6B4630" />
    <path d="M-190,-30 L380,-30 L380,10 L-190,10 Z" fill="#2b2b2b" />
    {[0, 1, 2, 3].map((i) => (
      <line key={i} x1={-40 + i * 50} y1={-180} x2={10 + i * 50} y2={-140} stroke="#d9c08a" strokeWidth={8} />
    ))}
    <path d="M-190,-110 Q60,-80 380,-60 L380,10 L-190,10 Z" fill="rgba(30,40,55,0.45)" opacity={wet} />
  </g>
);

// ============ S1 HOOK CLOSE-UP: a boot plunges into grey slush on a snowy trail (0 - 3.67) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4, at(t, [0.9, 1.0, 1.4], [0, 1.2, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, t / 3.67), rot: hh.rot };
  const sink = at(t, [0.5, 1.0], [0, 1], outExpo);
  const wet = at(t, [1.0, 2.4], [0, 1]);
  const g = 1500;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={1150} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-100} y={g - 40} width={1300} height={700} fill={SNOW2} />
          <ellipse cx={540} cy={g + 20} rx={560} ry={70} fill={SLUSH} />
        </Svg>
        <Subject rimX={6}>
          <Boot x={360} y={g - 100 + sink * 150} s={1.15} wet={wet} />
        </Subject>
        <Svg>
          {/* slush covering the sole */}
          <path d={`M-100,${g + 10} Q200,${g - 60} 540,${g - 20} Q880,${g - 60} 1200,${g + 10} L1200,2100 L-100,2100 Z`} fill={SLUSH} />
          <path d={`M-100,${g + 60} Q540,${g + 20} 1200,${g + 60} L1200,2100 L-100,2100 Z`} fill="#959ea2" />
          {/* splash */}
          {Array.from({ length: 9 }).map((_, i) => {
            const k = at(t, [0.95, 1.6], [0, 1]);
            const a = -Math.PI * (0.15 + (i / 8) * 0.7);
            return <circle key={i} cx={540 + Math.cos(a) * 380 * k} cy={g - 20 + Math.sin(a) * 260 * k + k * k * 160} r={18 - i % 3 * 4} fill="#c9d1d4" opacity={1 - k} />;
          })}
        </Svg>
      </Plane>
      <Particles seed={961} n={18} col="#ffffff" fall={24} />
      <Grade sunX={820} sunY={520} warm="225,232,240" vignette={0.55} />
      <Title text={"Slush at mile two.\nNumb toes by lunch."} t={t} t0={0} top={130} size={104} />
      <Chip text="Mile 2" t={t} t0={2.45} x={80} y={420} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM-WIDE: lunch stop on the snowy trail, Luis cold and miserable (3.67 - 6.04) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.37), rot: hh.rot };
  const g = 1520;
  const shiver = Math.sin(t * 40) * 2;
  const p: HikerProps = { x: 470 + shiver, y: g, scale: 2.2, walk: 0, lean: 0.14, poles: false, handOverride: [40, 30], breathe: Math.sin(t * 3) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={g - 180} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          {/* fallen log for the lunch stop */}
          <rect x={620} y={g - 110} width={520} height={100} rx={50} fill="#6b4a32" />
          <ellipse cx={1130} cy={g - 60} rx={30} ry={50} fill="#9a7a56" />
          <rect x={630} y={g - 120} width={500} height={24} rx={12} fill={SNOW} />
        </Svg>
        <Subject rimX={5} col="rgba(240,244,250,0.9)">
          <Person {...p} outfit={LUIS} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Particles seed={962} n={22} col="#ffffff" fall={26} />
      <Grade sunX={820} sunY={520} warm="225,232,240" />
      <Chip text="Lunch" t={t} t0={3.86} x={60} y={200} big />
      <Chip text="Toes numb" t={t} t0={4.97} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the soaked sock, heat streaming out of it (6.04 - 9.06) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.0), rot: hh.rot };
  const out = at(t, [6.6, 7.2], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={1200} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <ellipse cx={560} cy={1060} rx={460} ry={420} fill="rgba(90,150,210,0.18)" />
          <BigSock x={230} y={640} s={1.6} t={t} body="#9a9c96" damp={1} />
          {/* heat leaving: warm waves drifting out and fading to cold blue */}
          {Array.from({ length: 6 }).map((_, i) => {
            const k = (t * 0.7 + i / 6) % 1;
            const x0 = 300 + (i % 3) * 180;
            return (
              <path
                key={i}
                d={`M${x0 + k * 260},${980 - k * 420} q-26,-40 0,-80 q26,-40 0,-80`}
                stroke={k < 0.5 ? "#ffb98a" : "#9cc6e6"}
                strokeWidth={14}
                fill="none"
                strokeLinecap="round"
                opacity={out * 0.8 * (1 - k)}
              />
            );
          })}
        </Subject>
      </Plane>
      <Particles seed={963} n={14} col="#ffffff" fall={20} />
      <Grade sunX={820} sunY={520} warm="220,230,245" vignette={0.6} />
      <Chip text="Wet socks" t={t} t0={6.1} x={60} y={200} icon="x" big />
      <Chip text="Heat out, fast" t={t} t0={6.7} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: "Here's the fix" — dry wool pair in a sealed bag goes into the pack (9.06 - 13.85) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 4.8), rot: hh.rot };
  const slide = at(t, [10.6, 11.6], [0, 1], outExpo);
  const seal = at(t, [12.4, 12.9], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1200} blur={12} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <path d="M160,840 Q160,740 320,730 L760,730 Q920,740 920,890 L920,1600 Q920,1670 820,1670 L170,1670 Z" fill={LUIS.pack} />
          <path d="M200,810 L880,810" stroke={LUIS.packShade} strokeWidth={16} />
          <rect x={210} y={880} width={660} height={760} rx={30} fill="#3a2a1e" />
          <g transform={`translate(${mix(560, 540, slide)},${mix(560, 1180, slide)}) rotate(${mix(-10, 0, slide)})`}>
            <rect x={-230} y={-170} width={460} height={340} rx={24} fill="rgba(230,240,245,0.35)" stroke="rgba(255,255,255,0.8)" strokeWidth={6} />
            <BigSock x={-200} y={-140} s={0.6} t={t} body="#6f7a70" />
            <BigSock x={10} y={-140} s={0.6} t={t} body="#7d887c" />
            <rect x={-230} y={-170} width={460} height={340} rx={24} fill="rgba(230,240,245,0.18)" stroke="rgba(255,255,255,0.9)" strokeWidth={6} />
            {/* zip seal closing along the top */}
            <rect x={-230} y={-176} width={460 * seal} height={20} rx={8} fill="#3f8fb0" />
            <rect x={-200} y={-120} width={30} height={260} rx={15} fill="rgba(255,255,255,0.35)" />
          </g>
        </Subject>
      </Plane>
      <Particles seed={964} n={14} col="#ffffff" fall={18} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={9.9} top={200} size={124} />
      <Chip text="Dry spare pair" t={t} t0={10.69} x={60} y={200} icon="check" big />
      <Chip text="Wool" t={t} t0={11.65} x={60} y={330} icon="check" big />
      <Chip text="Sealed bag" t={t} t0={12.5} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// Bare foot, side view, toes to the right. Sole bottom at (x, y).
const Foot: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-60} y={-420} width={150} height={300} rx={60} fill={LUIS.skin} />
    <path d="M-80,-160 Q-90,-20 -20,0 L300,0 Q360,-4 360,-50 Q356,-90 300,-100 L120,-150 Q80,-170 80,-220 L-60,-220 Z" fill={LUIS.skin} />
    <path d="M-80,-60 Q-60,0 0,0 L300,0 Q340,0 350,-20 Q200,-10 -80,-60 Z" fill={LUIS.skinShade} />
    {[0, 1, 2, 3].map((i) => (
      <ellipse key={i} cx={300 - i * 30} cy={-70 + i * 6} rx={22} ry={18} fill={LUIS.skinShade} opacity={0.5} />
    ))}
    <rect x={-160} y={-560} width={330} height={180} rx={40} fill={LUIS.pants} />
  </g>
);

// ============ S5 CLOSE-UP: on the log at the break, drying the bare foot with a small towel (13.85 - 15.4) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.55), rot: hh.rot };
  const rub = Math.sin(t * 14) * 60 * at(t, [14.4, 14.6], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={1150} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-100} y={1200} width={1300} height={300} rx={140} fill="#6b4a32" />
          <rect x={-100} y={1190} width={1300} height={40} rx={20} fill={SNOW} />
          <rect x={-100} y={1500} width={1300} height={600} fill={SNOW2} />
        </Svg>
        <Subject rimX={6}>
          <Foot x={300} y={1320} s={1.3} />
          {/* towel + two hands */}
          <g transform={`translate(${560 + rub},${1180})`}>
            <rect x={-200} y={-110} width={400} height={170} rx={40} fill="#e3b23c" />
            <path d="M-200,-60 L200,-60 M-200,-20 L200,-20" stroke="#c99a2a" strokeWidth={8} />
            <ellipse cx={-170} cy={-110} rx={74} ry={58} fill={LUIS.skin} />
            <ellipse cx={170} cy={-110} rx={74} ry={58} fill={LUIS.skin} />
          </g>
          {/* the damp sock tossed aside */}
          <BigSock x={760} y={1260} s={0.5} rot={80} t={t} body="#9a9c96" damp={0.8} />
        </Subject>
      </Plane>
      <Particles seed={965} n={12} col="#ffffff" fall={14} />
      <Grade sunX={800} sunY={560} warm="250,236,214" vignette={0.55} />
      <Chip text="At the break" t={t} t0={13.9} x={60} y={200} big />
      <Chip text="Dry your feet" t={t} t0={14.57} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the dry spare pair slides on (15.4 - 17.27) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 1.2], [1.1, 1.03], outExpo), rot: hh.rot };
  const on = at(t, [15.5, 16.4], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1150} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-100} y={1200} width={1300} height={300} rx={140} fill="#6b4a32" />
          <rect x={-100} y={1190} width={1300} height={40} rx={20} fill={SNOW} />
          <rect x={-100} y={1500} width={1300} height={600} fill={SNOW2} />
        </Svg>
        <Subject rimX={6}>
          <Foot x={300} y={1320} s={1.3} />
          <g opacity={on}>
            <BigSock x={mix(700, 190, on)} y={mix(1200, 560, on)} s={1.6} rot={mix(30, 0, on)} t={t} body="#6f7a70" label="DRY" />
          </g>
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} col="255,250,235" />
      <Particles seed={966} n={12} col="#ffffff" fall={14} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.5} />
      <Chip text="Spare pair on" t={t} t0={16.12} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: damp wool vs damp cotton (17.27 - 20.81) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 3.5), rot: hh.rot };
  const a = at(t, [17.3, 17.8], [0, 1], outExpo);
  const b = at(t, [18.6, 19.1], [0, 1], outExpo);
  const warm = at(t, [17.8, 18.6], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={1200} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <ellipse cx={300} cy={1060} rx={300 * warm} ry={360 * warm} fill="rgba(255,190,120,0.32)" />
          <ellipse cx={800} cy={1060} rx={300 * b} ry={360 * b} fill="rgba(120,170,220,0.3)" />
          <g transform={`translate(0,${(1 - a) * 600})`} opacity={a}>
            <BigSock x={110} y={780} s={1.0} t={t} body="#6f7a70" damp={0.5} label="WOOL" />
          </g>
          <g transform={`translate(0,${(1 - b) * 600})`} opacity={b}>
            <BigSock x={610} y={780} s={1.0} t={t} body="#e6e2d8" damp={0.7} label="COTTON" />
          </g>
          {[0, 1, 2].map((i) => {
            const k = (t * 0.6 + i / 3) % 1;
            return <path key={i} d={`M${220 + i * 70},${760 - k * 160} q-20,-30 0,-60 q20,-30 0,-60`} stroke="#ffcf9c" strokeWidth={12} fill="none" strokeLinecap="round" opacity={warm * 0.8 * (1 - k)} />;
          })}
        </Subject>
      </Plane>
      <Particles seed={967} n={12} col="#ffffff" fall={14} />
      <Grade sunX={800} sunY={560} warm="250,236,214" vignette={0.55} />
      <Chip text="Wool: warm even damp" t={t} t0={17.3} x={60} y={200} icon="check" big />
      <Chip text="Cotton: cold when damp" t={t} t0={18.81} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE-MEDIUM: Luis hikes out through snowy woods in warm light (20.81 - 23.05) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: at(lt, [0, 1.3], [1.12, 1.04], outExpo), rot: hh.rot };
  const g = 1520;
  const ph = t * 3.4;
  const p: HikerProps = { x: 300 + lt * 70, y: g, scale: 2.0, phase: ph, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="h" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={-6} col="rgba(255,200,140,0.9)">
          <Person {...p} outfit={LUIS} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="both" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.34} col="255,214,160" />
      <Particles seed={968} n={20} col="#ffffff" fall={10} />
      <Grade sunX={760} sunY={640} warm="255,200,140" />
      <Readout label="TOES" value="Warm" ok={true} t={t} t0={21.8} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/merino-wool-hiking-socks-cut.png"
      cutoutH={780}
      spec="80% MERINO · CUSHIONED CREW · SOLD AS 1 PAIR"
      name={
        <>
          Merino
          <br />
          Hiking Socks
        </>
      }
      nameSize={104}
      price="$19.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V96: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.72} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.67} to={6.09} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.67} />
    </Scene>
    <Scene from={6.04} to={9.11} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.04} />
    </Scene>
    <Scene from={9.06} to={13.9} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.06} />
    </Scene>
    <Scene from={13.85} to={15.45} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={13.85} />
    </Scene>
    <Scene from={15.4} to={17.32} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={15.4} />
    </Scene>
    <Scene from={17.27} to={20.86} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={17.27} />
    </Scene>
    <Scene from={20.81} to={23.1} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={20.81} />
    </Scene>
    <Scene from={22.95} to={27.5} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.67, 1560],
        [3.67, 6.04, 1560],
        [6.04, 9.06, 1560],
        [9.06, 13.85, 1560],
        [13.85, 15.4, 1560],
        [15.4, 17.27, 1560],
        [17.27, 20.81, 1560],
        [20.81, 22.95, 1560],
      ]}
    />
  </AbsoluteFill>
);
