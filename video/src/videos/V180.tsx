// V180: "The lake looked frozen solid." Short format (16.5 s, 43 words), cinematic C01 style.
// Product: Hiking Safety Guide, $8.99 (live Shopify). End card: the real store photo, boxed.
// Advice (conservative, no numbers): ice thickness changes from spot to spot and you cannot judge it by eye,
// so on a hike stay off frozen lakes and streams and take the shore trail.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT, freeHand, Pine } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { WinterBackdrop, WINTER, SNOW, SNOW2 } from "../winter";
import { BootClose } from "../icy";
import { Subject, Breath } from "../fall";
import vo from "../vo/v180.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const TOM: Outfit = {
  ...JAKE,
  skin: "#E2B08C",
  skinShade: "#C48F6C",
  hair: "#5a3a22",
  beard: "#5a3a22",
  cap: "#2E64B4",
  capShade: "#234e8f",
  jacket: "#C2662E",
  jacketShade: "#9B4E20",
  pants: "#39424a",
  pantsShade: "#2a3036",
};

// Frozen lake: ice from y to the bottom, faint snow drifts and shine streaks; snowy shore on the left.
const Lake: React.FC<{ y: number; shore?: number }> = ({ y, shore = 1 }) => (
  <Svg>
    <defs>
      <linearGradient id="ice180" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#d9eaf2" />
        <stop offset="0.35" stopColor="#b3d2e0" />
        <stop offset="1" stopColor="#8fb6c9" />
      </linearGradient>
    </defs>
    <path d={`M-400,${y} Q540,${y - 20} 1480,${y} L1480,2600 L-400,2600 Z`} fill="url(#ice180)" />
    {Array.from({ length: 9 }, (_, i) => (
      <path key={i} d={`M${-200 + i * 170},${y + 80 + (i % 3) * 120} l${220 + (i % 2) * 80},${-10}`} stroke="#ffffff" strokeWidth={6} opacity={0.45} strokeLinecap="round" />
    ))}
    {Array.from({ length: 7 }, (_, i) => (
      <ellipse key={`d${i}`} cx={-100 + i * 200} cy={y + 200 + ((i * 97) % 380)} rx={120 + (i % 3) * 40} ry={14} fill="#eef4f7" opacity={0.6} />
    ))}
    {shore > 0 && (
      <g opacity={shore}>
        <path d={`M-400,${y - 30} Q120,${y - 10} 260,${y + 120} Q320,${y + 300} 120,2600 L-400,2600 Z`} fill={SNOW2} />
        <path d={`M-400,${y - 40} Q100,${y - 24} 230,${y + 110} Q280,${y + 260} 90,2600 L-400,2600 Z`} fill={SNOW} />
      </g>
    )}
  </Svg>
);

// Wooden trail sign on the shore, arrow pointing around the lake.
const TrailSign: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-10} y={-220} width={20} height={220} fill="#6b4a2e" />
    <path d="M-120,-220 L90,-220 L130,-185 L90,-150 L-120,-150 Z" fill="#8a6440" stroke="#5a3e24" strokeWidth={4} />
    <text x={-95} y={-172} fontFamily="Inter" fontWeight={800} fontSize={34} fill="#f3e6cf">
      SHORE TRAIL
    </text>
    <ellipse cx={0} cy={-224} rx={140} ry={10} fill={SNOW} />
  </g>
);

// ============ S1 HOOK WIDE: Tom steps off the snowy shore onto the lake (0 - 3.45) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - t * 12, y: hh.y, zoom: mix(1.03, 1.1, t / 3.45), rot: hh.rot };
  const g = 1430;
  const ph = t * 6.2;
  const x = mix(150, 600, at(t, [0, 3.45], [0, 1]));
  const p: HikerProps = { x, y: g + 40, scale: 2.0, phase: ph, walk: 1, lean: 0.06, poles: false, handOverride: freeHand(ph, 1) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 300} t={t} snow={1} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.16} />
      <Plane cam={cam} depth={1}>
        <Lake y={g - 260} />
        <Svg>
          <TrailSign x={130} y={g - 120} s={1.1} />
        </Svg>
        <Subject rimX={4} col="rgba(255,240,210,0.8)">
          <Person {...p} outfit={TOM} expression="neutral" />
          <Breath p={p} t={t} k={0.8} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1c2a24" side="right" />
      </Plane>
      <Particles seed={1801} n={20} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,215" cool="20,40,70" vignette={0.5} />
      <Title text={"The lake looked\nfrozen solid."} t={t} t0={0} top={120} size={132} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP CROSS-SECTION: thick ice here, thin ice a step later (3.45 - 5.75) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x - lt * 30, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.3), rot: hh.rot };
  const top = 980;
  // ice bottom edge: thick on the left, thin on the right
  const thick = (x: number) => (x < 380 ? 330 : x > 640 ? 60 : mix(330, 60, (x - 380) / 260));
  const pts = Array.from({ length: 31 }, (_, i) => {
    const x = -200 + i * 50;
    return `${x},${top + thick(x) + Math.sin(i * 1.7) * 10}`;
  }).join(" L");
  const step = at(t, [4.3, 4.75], [0, 1], outExpo);
  const bx = mix(260, 800, step);
  const lift = Math.sin(step * Math.PI) * 120;
  return (
    <AbsoluteFill style={{ background: "#0d2230" }}>
      <Plane cam={cam} depth={0.4} blur={10}>
        <Svg>
          <rect x={-300} y={-200} width={1680} height={1180} fill="#cfe2ec" />
          {[[-100, 420], [200, 380], [520, 440], [860, 400], [1180, 430]].map(([x, h], i) => (
            <Pine key={i} x={x} y={900} h={h} c="#56707a" c2="#465e68" />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col="rgba(255,255,255,0.7)">
          <Svg>
            {/* dark water under the ice */}
            <rect x={-300} y={top} width={1680} height={1400} fill="#163a50" />
            {Array.from({ length: 8 }, (_, i) => (
              <circle key={i} cx={-100 + i * 170} cy={top + 500 + ((i * 89) % 500)} r={6 + (i % 3) * 3} fill="#5c90ab" opacity={0.5} />
            ))}
            {/* the ice slab */}
            <path d={`M-200,${top} L1300,${top} L${pts.split(" L").reverse().join(" L")} Z`} fill="#bfe0ee" opacity={0.95} />
            <path d={`M-200,${top} L1300,${top} L1300,${top + 30} L-200,${top + 30} Z`} fill="#eef7fb" />
            {Array.from({ length: 10 }, (_, i) => (
              <path key={`b${i}`} d={`M${-150 + i * 140},${top + 60} l40,${Math.min(200, thick(-150 + i * 140) - 80)}`} stroke="#ffffff" strokeWidth={4} opacity={0.35} />
            ))}
            {/* snow on top */}
            <rect x={-300} y={top - 30} width={1680} height={34} rx={14} fill={SNOW} />
            {/* boot stepping across */}
            <g transform={`translate(${bx},${top - 30 - lift})`}>
              <path d="M-90,-150 L20,-150 Q30,-90 90,-70 Q130,-58 130,-30 L130,0 L-100,0 Z" fill="#4a3a2a" stroke="rgba(0,0,0,0.3)" strokeWidth={3} />
              <rect x={-104} y={-10} width={240} height={16} rx={6} fill="#1f1f1f" />
              <rect x={-90} y={-1400} width={110} height={1270} rx={20} fill={TOM.pants} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1802} n={10} col="#ffffff" fall={4} bokeh />
      <Grade sunX={540} sunY={300} warm="235,245,255" cool="10,30,50" vignette={0.55} />
      <Chip text="Thick here" t={t} t0={3.65} x={60} y={200} icon="check" big />
      <Chip text="Thin a step later" t={t} t0={4.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: his boot on the ice, a crack runs out from under it (5.75 - 8.16) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const crack = at(t, [6.2, 7.0], [0, 1], outExpo);
  const hh = handheld(t, 0.3, t > 6.2 && t < 6.7 ? 1.4 : 0);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.05, 1.12, lt / 2.4), rot: hh.rot };
  const lines: [number, number][][] = [
    [[560, 1320], [380, 1400], [210, 1380], [40, 1470]],
    [[560, 1320], [720, 1420], [900, 1400], [1080, 1500]],
    [[560, 1320], [520, 1500], [600, 1680], [560, 1900]],
    [[380, 1400], [330, 1560], [180, 1640]],
    [[720, 1420], [800, 1590], [960, 1660]],
  ];
  return (
    <AbsoluteFill style={{ background: "#9fc3d4" }}>
      <Plane cam={cam} depth={0.4} blur={12}>
        <Svg>
          <rect x={-300} y={-200} width={1680} height={900} fill="#dbe9f1" />
          <rect x={-300} y={560} width={1680} height={200} fill="#6f8c99" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Lake y={700} shore={0} />
        <Svg>
          {lines.map((l, i) => {
            const d = "M" + l.map(([x, y]) => `${x},${y}`).join(" L");
            return (
              <g key={i}>
                <path d={d} stroke="#ffffff" strokeWidth={10} fill="none" pathLength={1} strokeDasharray={`${crack} 1`} strokeLinecap="round" />
                <path d={d} stroke="#2a5a72" strokeWidth={4} fill="none" pathLength={1} strokeDasharray={`${crack} 1`} transform="translate(3,3)" />
              </g>
            );
          })}
        </Svg>
        <Subject rimX={-4} col="rgba(255,255,255,0.7)">
          <Svg>
            <rect x={300} y={-300} width={170} height={960} fill={TOM.pants} />
            <BootClose toe={0} heel={0} pants={TOM.pants} pantsShade={TOM.pantsShade} boot="#4a3a2a" sole="#1f1f1f" y={40} glove={null} />
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <Svg>
          <ellipse cx={980} cy={1850} rx={260} ry={90} fill={SNOW} opacity={0.8} />
        </Svg>
      </Plane>
      <Particles seed={1803} n={12} col="#ffffff" fall={6} bokeh />
      <Grade sunX={800} sunY={300} warm="240,248,255" cool="10,30,50" vignette={0.55} />
      <Chip text="Looks the same on top" t={t} t0={6.6} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: Tom takes the shore trail around the lake, sun out (8.16 - 12.05) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: mix(1.1, 1.04, lt / 3.9), rot: hh.rot };
  const g = 1440;
  const ph = t * 6;
  const p: HikerProps = { x: mix(330, 560, lt / 3.9), y: g + 160, scale: 2.4, phase: ph, walk: 1, lean: 0.08, poles: false, handOverride: freeHand(ph, 1) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={g - 420} blur={1.5} t={t} snow={1} />
      <Plane cam={cam} depth={0.7} blur={2}>
        <Lake y={g - 380} shore={0} />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* snowy shore bank with the packed trail */}
          <path d={`M-400,${g - 120} Q540,${g - 170} 1480,${g - 110} L1480,2600 L-400,2600 Z`} fill={SNOW2} />
          <path d={`M-400,${g + 120} Q540,${g + 90} 1480,${g + 130} L1480,${g + 220} Q540,${g + 190} -400,${g + 220} Z`} fill="#d3dde3" />
          <path d={`M-400,${g - 130} Q540,${g - 182} 1480,${g - 120} L1480,${g - 100} Q540,${g - 160} -400,${g - 106} Z`} fill={SNOW} />
          <TrailSign x={900} y={g + 60} s={1.2} />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,196,0.9)">
          <Person {...p} outfit={TOM} expression="happy" />
          <Breath p={p} t={t} k={0.8} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1c2a24" side="left" />
      </Plane>
      <Particles seed={1804} n={18} col="#fff6e0" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,232,190" cool="20,40,70" vignette={0.5} />
      <Chip text="The rule" t={t} t0={8.3} x={60} y={200} icon="none" big />
      <Chip text="Stay off frozen lakes" t={t} t0={9.3} x={60} y={330} icon="check" big />
      <Chip text="And frozen streams" t={t} t0={10.4} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-safety-guide.jpg"
      photoH={800}
      spec="PDF GUIDE · TEN SHORT CHAPTERS"
      name={
        <>
          Hiking Safety
          <br />
          Guide
        </>
      }
      nameSize={96}
      price="$8.99"
      save="Save this for winter"
    />
  );
};

export const V180: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.53} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.45} to={5.85} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={3.45} />
    </Scene>
    <Scene from={5.75} to={8.26} fadeIn={0.06} fadeOut={0.1}>
      <S3 off={5.75} />
    </Scene>
    <Scene from={8.16} to={12.1} fadeIn={0.06} fadeOut={0.12}>
      <S4 off={8.16} />
    </Scene>
    <Scene from={12.0} to={16.5} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.45, 1600],
        [3.45, 5.75, 1600],
        [5.75, 8.16, 1600],
        [8.16, 12.0, 1600],
      ]}
    />
  </AbsoluteFill>
);
