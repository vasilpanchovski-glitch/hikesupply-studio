// V200: "She counted this as a national park." Short format (16.9 s, 43 words), cinematic C01 style.
// Product: All 64 US National Parks — Free Printable Checklist (Letter & A4), Free ($0, live Shopify). End card: the real page, whole.
// Facts: Mount Rushmore is a National Memorial run by the NPS, not a national park. The NPS manages over 400 units;
// 64 of them are national parks (Chiricahua, Oct 2026). The dot board is illustrative, not a map.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Pine, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { HeldList, ParkList } from "../parks64";
import vo from "../vo/v200.json";

const words = vo.words as unknown as Word[];

const SUMMER: Sky = { top: "#3c6fa4", mid: "#a2c4de", low: "#eee4cc", sun: [820, 520], sunR: 50, sunCol: "#fff8e4", glow: "#f4dcae" };

const LENA: Outfit = {
  ...GUIDE,
  skin: "#EBC0A0",
  skinShade: "#CFA080",
  hair: "#2b1d16",
  ponytail: "#2b1d16",
  beard: null,
  cap: "#2F6B8F",
  capShade: "#23536f",
  jacket: "#B8483A",
  jacketShade: "#93382d",
  pants: "#4a4f45",
  pantsShade: "#373b33",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(14,18,16,0) 0%, rgba(14,18,16,0.45) 45%, rgba(14,18,16,0.45) 70%, rgba(14,18,16,0) 100%)" }} />
);

// Granite mountain with four carved heads, simplified (screen coords, base y).
const Carved: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-300,${y} L-200,${y - 420} Q0,${y - 700} 300,${y - 760} Q600,${y - 820} 820,${y - 680} Q1080,${y - 560} 1380,${y - 380} L1380,${y} Z`} fill="#a9a59c" />
    <path d={`M-300,${y} L-200,${y - 420} Q0,${y - 700} 300,${y - 760} Q120,${y - 560} 80,${y} Z`} fill="#8f8b83" />
    {[
      [260, 0.95],
      [450, 1.05],
      [620, 0.9],
      [790, 0.85],
    ].map(([x, s], i) => (
      <g key={i} transform={`translate(${x},${y - 520 + i * 14}) scale(${s})`}>
        <ellipse cx={0} cy={0} rx={78} ry={110} fill="#b9b5ab" />
        <path d="M-78,0 Q-70,90 0,112 Q-40,60 -44,-20 Z" fill="#9e9a91" />
        <ellipse cx={-22} cy={-10} rx={16} ry={9} fill="#8f8b83" />
        <ellipse cx={26} cy={-10} rx={16} ry={9} fill="#8f8b83" />
        <path d="M-6,4 L4,40 L-10,44" stroke="#8f8b83" strokeWidth={6} fill="none" />
      </g>
    ))}
    <path d={`M-300,${y - 120} Q200,${y - 240} 600,${y - 200} Q1000,${y - 160} 1380,${y - 240} L1380,${y} L-300,${y} Z`} fill="#b7b2a6" opacity={0.7} />
  </Svg>
);

const Pines: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    {Array.from({ length: 16 }, (_, i) => (
      <Pine key={i} x={-260 + i * 105 + ((i * 37) % 40)} y={y} h={200 + (i % 4) * 50} c="#3f5e46" c2="#2f4a37" />
    ))}
  </Svg>
);

const Terrace: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y} width={1880} height={1400} fill="#cfc6b4" />
    <rect x={-400} y={y - 70} width={1880} height={70} fill="#b9b09c" />
    <rect x={-400} y={y - 78} width={1880} height={12} fill="#e2dccd" />
    {Array.from({ length: 10 }, (_, i) => (
      <line key={i} x1={-300 + i * 200} y1={y} x2={-360 + i * 220} y2={y + 600} stroke="#b9b09c" strokeWidth={4} />
    ))}
  </Svg>
);

// ============ S1 HOOK MEDIUM: Lena on the viewing terrace, list in hand, the carved mountain behind (0 - 3.38) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.04, 1.1, t / 3.38), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 560, y: g + 40, scale: 2.4, walk: 0, lean: 0.02, poles: false, handOverride: [56, 36], breathe: Math.sin(t * 2) * 1.4 };
  const hand = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={SUMMER} uid="a" />
        <Clouds y={360} col="#ffffff" seed={21} drift={t * 10} opacity={0.4} />
      </Plane>
      <Plane cam={cam} depth={0.2} blur={2.5}>
        <Carved y={1320} />
      </Plane>
      <Haze y={1060} h={260} col={SUMMER.low} opacity={0.35} />
      <Plane cam={cam} depth={0.45} blur={1.2}>
        <Pines y={1440} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Terrace y={g} />
        <Subject rimX={-6} col="rgba(255,236,200,0.9)">
          <Person {...p} outfit={LENA} expression="happy" />
          <g transform={hikerTransform(p)}>
            <HeldList hx={hand[0] - 10} hy={hand[1] + 6} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#26382a" side="right" />
      </Plane>
      <Rays x={SUMMER.sun[0]} y={SUMMER.sun[1]} strength={0.3} col="255,236,200" />
      <Particles seed={2001} n={14} col="#fff4dc" bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="255,232,196" cool="50,70,100" />
      <Title text={"She counted\nthis as a\nnational park."} t={t} t0={0} top={110} size={118} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the sign says National Memorial (3.38 - 4.94) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 1.56), rot: hh.rot };
  const hi = at(t, [3.7, 4.1], [0, 1]);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.04}>
        <SkyPlane sky={SUMMER} uid="b" />
      </Plane>
      <Plane cam={cam} depth={0.3} blur={12}>
        <Carved y={1500} />
        <Pines y={1600} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(255,236,200,0.85)">
          <Svg>
            <rect x={170} y={1100} width={40} height={900} fill="#5a3e2c" />
            <rect x={870} y={1100} width={40} height={900} fill="#5a3e2c" />
            <rect x={90} y={560} width={900} height={620} rx={18} fill="#5b3a26" />
            <rect x={112} y={582} width={856} height={576} rx={10} fill="none" stroke="#e8d9b8" strokeWidth={6} />
            <text x={540} y={760} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={118} fill="#f1e6cc" letterSpacing={3}>
              MOUNT RUSHMORE
            </text>
            <rect x={150} y={850} width={780} height={150} rx={14} fill="#f2d36b" opacity={0.35 * hi} />
            <text x={540} y={960} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={104} fill="#f1e6cc" letterSpacing={3}>
              NATIONAL MEMORIAL
            </text>
            <line x1={210} y1={1060} x2={870} y2={1060} stroke="#e8d9b8" strokeWidth={4} opacity={0.6} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2002} n={12} col="#fff4dc" bokeh />
      <LowScrim />
      <Grade sunX={820} sunY={420} warm="255,232,196" cool="50,70,100" vignette={0.55} />
      <Chip text="Not a national park" t={t} t0={3.75} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// Board of park-service sites: 425 pins; `keep` = 0..1 fades all but 64 to grey.
const N_COL = 17;
const N_ROW = 25;
const RAND = Array.from({ length: 425 }, (_, i) => {
  const v = Math.sin(i * 91.17 + 3.3) * 43758.5453;
  return v - Math.floor(v);
});
const CUT = [...RAND].sort((a, b) => a - b)[63];
const isPark = (i: number) => RAND[i] <= CUT;
const SiteBoard: React.FC<{ show: number; keep: number }> = ({ show, keep }) => (
  <g>
    <rect x={16} y={22} width={900} height={1300} rx={20} fill="rgba(0,0,0,0.3)" />
    <rect x={0} y={0} width={900} height={1300} rx={20} fill="#f4efe3" />
    {Array.from({ length: N_COL * N_ROW }, (_, i) => {
      const c = i % N_COL;
      const r = Math.floor(i / N_COL);
      const vis = show * (N_COL * N_ROW) > i ? 1 : 0;
      const park = isPark(i);
      const col = park ? (keep > 0.5 ? "#2f7a52" : "#8a5a3a") : keep > 0.5 ? "#d6cfc0" : "#8a5a3a";
      return <circle key={i} cx={70 + c * 47} cy={70 + r * 47} r={park ? mix(14, 18, keep) : mix(14, 11, keep)} fill={col} opacity={vis} />;
    })}
  </g>
);

// ============ S3 WIDE: over 400 Park Service sites (4.94 - 7.7) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.76), rot: hh.rot };
  const show = at(t, [5.1, 7.0], [0, 1], (x) => x);
  return (
    <AbsoluteFill style={{ background: "#3a2a1c" }}>
      <Plane cam={cam} depth={0.4} blur={10}>
        <AbsoluteFill style={{ background: "radial-gradient(circle at 60% 30%, #a98a68 0%, #5a4330 60%, #3a2a1c 100%)" }} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,230,190,0.7)">
          <Svg>
            <g transform="translate(157,420) scale(0.85)">
              <SiteBoard show={show} keep={0} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2003} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={800} sunY={400} warm="255,214,170" vignette={0.55} />
      <Chip text="Park Service sites" t={t} t0={5.2} x={60} y={170} icon="none" big />
      <Chip text="Over 400" t={t} t0={6.8} x={60} y={300} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3b MEDIUM: only 64 are national parks (7.7 - 10.53) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.08, 1.14, lt / 2.83), rot: hh.rot };
  const keep = at(t, [8.4, 8.9], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#3a2a1c" }}>
      <Plane cam={cam} depth={0.4} blur={10}>
        <AbsoluteFill style={{ background: "radial-gradient(circle at 40% 30%, #a98a68 0%, #5a4330 60%, #3a2a1c 100%)" }} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,230,190,0.7)">
          <Svg>
            <g transform="translate(157,420) scale(0.85) rotate(2 450 650)">
              <SiteBoard show={1} keep={keep} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2004} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={800} sunY={400} warm="255,214,170" vignette={0.55} />
      <Chip text="National parks: 64" t={t} t0={8.6} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the rule. Her list, Mount Rushmore crossed off (10.53 - 12.7) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(10, -10, lt / 2.2), zoom: mix(1.04, 1.1, lt / 2.2), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#3a2a1c" }}>
      <Plane cam={cam} depth={0.4} blur={10}>
        <AbsoluteFill style={{ background: "radial-gradient(circle at 70% 30%, #b0a48a 0%, #5e5240 60%, #3a2a1c 100%)" }} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <Svg>
            <g transform="translate(170,460) rotate(-2)">
              <ParkList
                title="LENA'S PARKS"
                rows={[
                  { name: "Badlands", tick: 1 },
                  { name: "Mount Rushmore", tick: 1, strike: at(t, [10.9, 11.5], [0, 1]), hi: at(t, [10.6, 10.9], [0, 1]) },
                  { name: "Wind Cave", tick: 1 },
                  { name: "Yellowstone" },
                ]}
              />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={2005} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={800} sunY={400} warm="255,214,170" vignette={0.55} />
      <Chip text="The rule" t={t} t0={10.6} x={60} y={170} icon="none" big />
      <Chip text="Check the name on nps.gov" t={t} t0={11.3} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/all-64-us-national-parks-checklist-page.png"
      cutoutH={760}
      spec="ALL 64 PARKS · LETTER & A4 · PRINTABLE"
      name={
        <>
          All 64 US National
          <br />
          Parks Checklist
        </>
      }
      nameSize={78}
      price="Free"
      save="Save this before your next road trip"
    />
  );
};

export const V200: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.46} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.38} to={5.02} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.38} />
    </Scene>
    <Scene from={4.94} to={7.78} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.94} />
    </Scene>
    <Scene from={7.7} to={10.61} fadeIn={0.06} fadeOut={0.08}>
      <S3b off={7.7} />
    </Scene>
    <Scene from={10.53} to={12.8} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={10.53} />
    </Scene>
    <Scene from={12.7} to={16.9} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.38, 1600],
        [3.38, 10.53, 1600],
        [10.53, 12.7, 1600],
      ]}
    />
  </AbsoluteFill>
);
