// V176: "Her boots froze solid overnight." Short format (15.2 s, 40 words), cinematic C01 style.
// Product: First Backpacking Trip — Beginner's Guide & Planner (Printable), 32 pages, $8.99 (live Shopify), boxed store cover as in V87.
// Advice (standard winter camping practice): loosen the laces, put the boots in a bag, keep them inside the tent;
// in deep cold, the bagged boots go inside your sleeping bag. No temperature numbers.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { DAWN, FrostTrail, WinterBackdrop } from "../winter";
import { Subject } from "../fall";
import vo from "../vo/v176.json";

const words = vo.words as unknown as Word[];

const LENA: Outfit = {
  ...GUIDE,
  skin: "#C68A64",
  skinShade: "#A66E4C",
  hair: "#1f1712",
  ponytail: "#1f1712",
  beard: null,
  cap: "#2F6B4F",
  capShade: "#22513b",
  jacket: "#6E4A8E",
  jacketShade: "#53376b",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  pack: "#C2662E",
  packShade: "#9B4E20",
  glove: null,
};
const SOCK = "#2f3e5c";
const SOCK2 = "#25314a";
const BOOT = { c: "#6b4a2e", s: "#4f3520", sole: "#231d19", lace: "#c9b48e" };
const SACK = { c: "#2F7F86", s: "#236068" };
const BAG = { c: "#C2662E", s: "#9B4E20", in: "#7a3a18" };
const THIN = "#d9c34a";
const THICK = { c: "#2F7F86", s: "#256870" };
const TENT = { wall: "#2b3d58", wall2: "#22324a", floor: "#1c2433" };

// Breath cloud near a head position (screen units).
const Puff: React.FC<{ x: number; y: number; t: number; dir?: number; s?: number }> = ({ x, y, t, dir = 1, s = 1 }) => (
  <g>
    {[0, 0.5].map((o) => {
      const q = (t * 0.7 + o) % 1;
      return <circle key={o} cx={x + dir * (20 + q * 80) * s} cy={y - q * 30 * s} r={(8 + q * 26) * s} fill="#eef3f8" opacity={0.45 * (1 - q)} />;
    })}
  </g>
);

const Frost: React.FC<{ n: number; y0: number; y1: number; seed: number; op?: number }> = ({ n, y0, y1, seed, op = 0.8 }) => (
  <g opacity={op}>
    {Array.from({ length: n }, (_, i) => {
      const x = (i * 157 + seed * 31) % 1180 - 50;
      const y = y0 + ((i * 97 + seed * 13) % Math.max(1, y1 - y0));
      const r = 6 + (i % 4) * 4;
      return (
        <g key={i} transform={`translate(${x},${y}) rotate(${i * 23})`} stroke="#e8f3ff" strokeWidth={2.4}>
          <line x1={-r} y1={0} x2={r} y2={0} />
          <line x1={-r * 0.5} y1={-r * 0.87} x2={r * 0.5} y2={r * 0.87} />
          <line x1={-r * 0.5} y1={r * 0.87} x2={r * 0.5} y2={-r * 0.87} />
        </g>
      );
    })}
  </g>
);

// Tent interior at night (screen units), floor at y.
const TentInside: React.FC<{ y: number; frost?: number; glow?: string }> = ({ y, frost = 1, glow = "#9fb2cc" }) => (
  <Svg>
    <rect x={-200} y={-200} width={1500} height={2400} fill={TENT.wall} />
    <path d={`M-200,${y} L540,-200 L1300,${y} Z`} fill={TENT.wall2} />
    <path d={`M540,-200 L540,${y}`} stroke="#1a2638" strokeWidth={10} />
    <path d={`M-200,${y - 600} Q540,${y - 760} 1300,${y - 600}`} stroke="#1a2638" strokeWidth={8} fill="none" />
    <circle cx={800} cy={300} r={500} fill={glow} opacity={0.08} />
    <Frost n={46} y0={-100} y1={y - 300} seed={3} op={frost} />
    <rect x={-200} y={y} width={1500} height={1200} fill={TENT.floor} />
  </Svg>
);

// Lena lying in her bag, head to the left. thick 0..1 swaps the thin pad for a thick one; hat shows a beanie.
const InBag: React.FC<{ x: number; y: number; s: number; t: number; shiver?: number; thick?: number; hat?: boolean; expr?: "tired" | "neutral" | "happy" }> = ({ x, y, s, t, shiver = 0, thick = 0, hat = false, expr = "tired" }) => {
  const j = Math.sin(t * 44) * 3 * shiver;
  const lift = thick * 34 * (s / 3);
  const p: HikerProps = { x: 0, y: 0, scale: s, walk: 0, lean: 0, poles: false, breathe: 0, handOverride: [8, -8] };
  return (
    <g transform={`translate(${x + j},${y - lift})`}>
      {/* pads under */}
      <rect x={-560 * (s / 3)} y={60 * (s / 3) + lift} width={1300 * (s / 3)} height={14 * (s / 3)} rx={6} fill={THIN} opacity={1 - thick} />
      <g opacity={thick}>
        <rect x={-560 * (s / 3)} y={40 * (s / 3)} width={1300 * (s / 3)} height={50 * (s / 3) + lift} rx={18} fill={THICK.c} />
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1={-500 * (s / 3) + i * 125 * (s / 3)} y1={44 * (s / 3)} x2={-500 * (s / 3) + i * 125 * (s / 3)} y2={84 * (s / 3) + lift} stroke={THICK.s} strokeWidth={6} />
        ))}
      </g>
      {/* the person, rotated to lie with the head on the left */}
      <g transform={`translate(${700 * (s / 3)},${-72 * (s / 3)}) rotate(-90)`}>
        <Person {...p} outfit={hat ? { ...LENA, cap: "#2F5D3E", capShade: "#244a31" } : LENA} expression={expr} noPack />
      </g>
      {/* mummy bag over the body */}
      <path
        d={`M${-330 * (s / 3)},${-70 * (s / 3)} Q${-200 * (s / 3)},${-180 * (s / 3)} ${200 * (s / 3)},${-165 * (s / 3)} Q${640 * (s / 3)},${-140 * (s / 3)} ${700 * (s / 3)},${-10 * (s / 3)} Q${720 * (s / 3)},${50 * (s / 3)} ${600 * (s / 3)},${60 * (s / 3)} L${-330 * (s / 3)},${60 * (s / 3)} Q${-380 * (s / 3)},${0} ${-330 * (s / 3)},${-70 * (s / 3)} Z`}
        fill={BAG.c}
      />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M${(-200 + i * 140) * (s / 3)},${-165 * (s / 3)} Q${(-220 + i * 140) * (s / 3)},${-30 * (s / 3)} ${(-200 + i * 140) * (s / 3)},${58 * (s / 3)}`} stroke={BAG.s} strokeWidth={7} fill="none" />
      ))}
      {/* hood around the face */}
      <path d={`M${-330 * (s / 3)},${-70 * (s / 3)} Q${-420 * (s / 3)},${-10 * (s / 3)} ${-330 * (s / 3)},${60 * (s / 3)}`} stroke={BAG.s} strokeWidth={22 * (s / 3)} fill="none" strokeLinecap="round" />
    </g>
  );
};


const Tent: React.FC<{ x: number; y: number; s?: number; glow?: number }> = ({ x, y, s = 1, glow = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={8} rx={230} ry={20} fill="rgba(0,0,0,0.35)" />
    <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill="#5f7a4a" />
    <path d="M0,-250 Q200,-230 220,0 L80,0 Q90,-150 0,-250 Z" fill="#4c6339" />
    {glow > 0 && <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill={`rgba(255,200,120,${0.3 * glow})`} />}
    <path d="M-90,0 Q-80,-160 0,-180 Q80,-160 90,0 Z" fill={glow > 0 ? `rgba(255,214,150,${0.55 + glow * 0.35})` : "#2a3322"} />
    <path d="M-200,-60 Q0,-120 200,-60" stroke="#2f3f26" strokeWidth={5} fill="none" />
  </g>
);

// Side-view sock (local: cuff top-left, toe to the right). damp = dark sweat patches.
const Sock: React.FC<{ x: number; y: number; s?: number; rot?: number; col?: string; heel?: string; damp?: number }> = ({ x, y, s = 1, rot = 0, col = SOCK, heel = SOCK2, damp = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M-40,-160 L40,-160 L40,-20 Q40,30 90,30 L120,30 Q150,30 150,60 Q150,90 110,90 L10,90 Q-40,90 -40,40 Z" fill={col} />
    <rect x={-40} y={-160} width={80} height={30} fill={heel} />
    {[-148, -140].map((yy) => (
      <line key={yy} x1={-40} y1={yy} x2={40} y2={yy} stroke={col} strokeWidth={2} opacity={0.6} />
    ))}
    <path d="M110,30 Q150,30 150,60 Q150,90 110,90 Z" fill={heel} />
    <path d="M-40,40 Q-40,90 10,90 L10,50 Q-10,50 -10,20 L-40,20 Z" fill={heel} />
    {damp > 0 && (
      <g opacity={damp}>
        <path d="M-40,-10 Q-40,90 10,90 L110,90 Q150,90 150,60 Q140,40 100,44 Q40,40 20,10 Q0,-20 -40,-10 Z" fill="#1b2026" opacity={0.35} />
        <path d="M-40,-120 Q0,-90 40,-110 L40,-60 Q0,-40 -40,-70 Z" fill="#1b2026" opacity={0.18} />
      </g>
    )}
  </g>
);

// Hiking boot alone, side view, toe to the right (local: sole bottom at y=0, ~620 wide).
// frost 0..1 ice on it; loose 0..1 laces opened and tongue pulled out; sack 0..1 a stuff sack drawn up over it.
const LoneBoot: React.FC<{ x: number; y: number; s?: number; frost?: number; loose?: number; sack?: number }> = ({ x, y, s = 1, frost = 0, loose = 0, sack = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={300} cy={20} rx={360} ry={30} fill="rgba(0,0,0,0.25)" />
    {/* shaft and foot */}
    <path d="M20,-520 L280,-520 Q300,-360 330,-280 Q420,-220 560,-180 Q640,-150 640,-60 L640,-20 L0,-20 Z" fill={BOOT.c} />
    <path d="M20,-520 L60,-520 L40,-20 L0,-20 Z" fill={BOOT.s} />
    {/* collar padding */}
    <rect x={10} y={-540} width={280} height={40} rx={18} fill={BOOT.s} />
    {/* tongue, pulled out when loose */}
    <path d={`M180,${-540 - loose * 90} Q240,${-560 - loose * 100} 300,${-530 - loose * 70} L330,-300 L230,-300 Z`} fill="#7d5a3a" />
    {/* laces: tight crossings, or opened wide */}
    {[0, 1, 2, 3, 4].map((i) => {
      const yy = -470 + i * 60;
      const gap = loose * (60 - i * 8);
      return (
        <g key={i}>
          <circle cx={180 + i * 22 - gap} cy={yy} r={9} fill="#c9c1b0" />
          <circle cx={300 + i * 22 + gap} cy={yy + 10} r={9} fill="#c9c1b0" />
          {loose < 0.5 && <path d={`M${180 + i * 22},${yy} L${300 + i * 22},${yy + 70}`} stroke={BOOT.lace} strokeWidth={9} strokeLinecap="round" opacity={1 - loose * 2} />}
          {loose < 0.5 && <path d={`M${300 + i * 22},${yy + 10} L${180 + i * 22},${yy + 60}`} stroke={BOOT.lace} strokeWidth={9} strokeLinecap="round" opacity={1 - loose * 2} />}
        </g>
      );
    })}
    {loose > 0 && (
      <g opacity={loose}>
        <path d={`M${180 - 60},-470 Q100,-620 60,-600`} stroke={BOOT.lace} strokeWidth={9} fill="none" strokeLinecap="round" />
        <path d={`M${300 + 60},-460 Q420,-600 470,-560`} stroke={BOOT.lace} strokeWidth={9} fill="none" strokeLinecap="round" />
      </g>
    )}
    <rect x={-10} y={-30} width={660} height={40} rx={16} fill={BOOT.sole} />
    {/* frost */}
    {frost > 0 && (
      <g opacity={frost}>
        <path d="M20,-520 L280,-520 Q300,-360 330,-280 Q420,-220 560,-180 Q640,-150 640,-60 L640,-20 L0,-20 Z" fill="#dfeaf4" opacity={0.35} />
        {Array.from({ length: 26 }, (_, i) => (
          <circle key={i} cx={40 + ((i * 137) % 580)} cy={-40 - ((i * 89) % 460)} r={5 + (i % 3) * 3} fill="#f4f9ff" opacity={0.85} />
        ))}
        <rect x={10} y={-544} width={280} height={14} rx={7} fill="#f4f9ff" />
      </g>
    )}
    {/* stuff sack drawn up from below */}
    {sack > 0 && (
      <g>
        <path d={`M-40,30 L-40,${30 - sack * 640} Q300,${-20 - sack * 680} 680,${30 - sack * 600} L680,30 Z`} fill={SACK.c} />
        {Array.from({ length: 5 }, (_, i) => (
          <path key={i} d={`M${40 + i * 140},30 Q${60 + i * 140},${-sack * 300} ${30 + i * 140},${30 - sack * 600}`} stroke={SACK.s} strokeWidth={8} fill="none" />
        ))}
        {sack > 0.95 && <path d="M300,-640 q-30,-70 -70,-80 M300,-640 q30,-70 74,-76" stroke="#9aa0a6" strokeWidth={8} fill="none" />}
      </g>
    )}
  </g>
);

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

// ============ S1 HOOK MEDIUM: cold dawn at camp, boots left out by the tent are frozen (0 - 2.18) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, t / 2.2), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 330, y: g, scale: 2.3, walk: 0, lean: 0.02, poles: false, breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="a" treeY={g - 230} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <Tent x={790} y={g + 10} s={1.5} />
        </Svg>
        <Subject rimX={5} col="rgba(255,226,190,0.9)">
          <Person {...p} outfit={{ ...LENA, boot: SOCK, sole: SOCK2 }} expression="tired" noPack />
        </Subject>
        <Svg>
          <Puff x={p.x + 40} y={g - 380 * 1.0 - 40} t={t} dir={1} s={1.3} />
          <LoneBoot x={540} y={g + 30} s={0.42} frost={1} />
          <LoneBoot x={620} y={g + 40} s={0.42} frost={1} />
        </Svg>
      </Plane>
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.3} col="255,220,180" />
      <Particles seed={1761} n={18} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={300} sunY={760} warm="255,214,170" cool="30,50,90" />
      <Title text={"Her boots\nfroze solid\novernight."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the frozen boot, her socked foot won't go in (2.18 - 3.83) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const push = Math.max(0, Math.sin(lt * 6)) * 30;
  const hh = handheld(t, 0.4, push > 25 ? 1 : 0);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.12, 1.04], outExpo), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="b" treeY={1150} blur={12} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={1420} width={1500} height={800} fill="#eef2f4" />
        </Svg>
        <Subject rimX={5} col="rgba(255,220,180,0.9)">
          <Svg>
            <LoneBoot x={260} y={1480} s={1.15} frost={1} />
            {/* her sock foot jammed at the stiff collar */}
            <Sock x={330} y={720 - push} s={1.6} rot={-8} col={SOCK} heel={SOCK2} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1762} n={14} col="#ffffff" fall={8} />
      <Grade sunX={300} sunY={760} warm="255,214,170" cool="30,50,90" vignette={0.55} />
      <Chip text="Frozen stiff" t={t} t0={2.5} x={60} y={170} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the fix: laces loosened, boot into a stuff sack (3.83 - 6.41) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.8], [1.1, 1.02], outExpo), rot: hh.rot };
  const loose = at(t, [4.4, 5.0], [0, 1], outExpo);
  const sack = at(t, [5.5, 6.2], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#141c28" }}>
      <Plane cam={cam} depth={1}>
        <TentInside y={1480} frost={0.4} glow="#ffd9a0" />
        <Subject rimX={-4} col="rgba(255,226,180,0.8)">
          <Svg>
            <LoneBoot x={230} y={1500} s={1.1} loose={loose} sack={sack} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1763} n={10} col="#ffe8c0" fall={4} bokeh />
      <Grade sunX={800} sunY={400} warm="255,214,170" cool="20,30,60" vignette={0.55} />
      <Chip text="Loosen the laces" t={t} t0={4.2} x={60} y={170} icon="check" big />
      <Chip text="Bag the boots" t={t} t0={5.4} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: night in the tent, the bagged boots inside, then in the sleeping bag (6.41 - 10.38) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 4), rot: hh.rot };
  const into = at(t, [8.2, 9.0], [0, 1], outExpo);
  // sack slides from the tent floor into the foot of the bag
  const sx = mix(880, 760, into);
  const sy = mix(1430, 1250, into);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <TentInside y={1440} frost={0.8} />
        <Subject rimX={5} col="rgba(200,220,255,0.6)">
          <InBag x={430} y={1380} s={2.3} t={t} thick={1} hat expr={into > 0.5 ? "happy" : "neutral"} />
          <Svg>
            <g opacity={1 - into * 0.85}>
              <LoneBoot x={sx - 120} y={sy} s={0.36} sack={1} />
            </g>
          </Svg>
        </Subject>
        <Svg>
          <Puff x={250} y={1250} t={t} dir={-1} s={1} />
        </Svg>
      </Plane>
      <Particles seed={1764} n={14} col="#e6f0fb" fall={10} />
      <Grade sunX={800} sunY={300} warm="210,220,240" cool="10,20,50" vignette={0.6} />
      <Chip text="Inside the tent" t={t} t0={6.6} x={60} y={170} icon="check" big />
      <Chip text="Deep cold: in your sleeping bag" t={t} t0={8.1} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/first-backpacking-trip-beginners-guide-planner.jpg"
      spec="32 PAGES · PRINTABLE GUIDE & PLANNER"
      name={
        <>
          First Backpacking
          <br />
          Trip Guide
        </>
      }
      nameSize={92}
      price="$8.99"
      save="Save this before your first winter night out"
    />
  );
};

export const V176: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.26} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.18} to={3.93} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={2.18} />
    </Scene>
    <Scene from={3.83} to={6.51} fadeIn={0.06} fadeOut={0.1}>
      <S3 off={3.83} />
    </Scene>
    <Scene from={6.41} to={10.48} fadeIn={0.06} fadeOut={0.12}>
      <S4 off={6.41} />
    </Scene>
    <Scene from={10.38} to={15.2} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.18, 1600],
        [2.18, 3.83, 1600],
        [3.83, 6.41, 1600],
        [6.41, 10.38, 1600],
      ]}
    />
  </AbsoluteFill>
);
