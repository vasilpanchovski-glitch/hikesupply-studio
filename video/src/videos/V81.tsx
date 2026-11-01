// V81: "Wrong size. Again." in the cinematic C01 style. Black Friday teaser 1 of 2: gift idea, no sale or price talk in the story.
// Product facts from the live Shopify listing: Trail Memories Gift Set = Hiking Journal & Trail Log (64 pages), US National Parks
// Hiking Tracker (63 parks + Canada), Hiking Trip Planner; printable PDF, no shipping. End card $15.99 (live Shopify).
// End card art = the three real store covers from the Shopify listing, fanned out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, rim, Sky, Svg } from "../cine";
import { GadgetBox, PlanPage, Room, WindowView } from "../home";
import { FrostTrail, WGOLD, WinterBackdrop } from "../winter";
import vo from "../vo/v81.json";

const words = vo.words as unknown as Word[];

const COLD: Sky = { top: "#4d6a86", mid: "#a9bac4", low: "#e6e3d4", sun: [790, 600], sunR: 46, sunCol: "#fbf7ea", glow: "#f1ecd8" };
const LAMP = "255,200,140";

// Indoors: sweaters, no packs, cap drawn in the hair colour.
const NORA: Outfit = {
  ...GUIDE,
  skin: "#E8B996",
  skinShade: "#CC9A78",
  hair: "#7a3f22",
  ponytail: "#7a3f22",
  beard: null,
  cap: "#7a3f22",
  capShade: "#5e2f18",
  jacket: "#2F7F86",
  jacketShade: "#256870",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  glove: null,
};
const BRO: Outfit = {
  ...JAKE,
  skin: "#E2B08F",
  skinShade: "#C4916F",
  hair: "#5a3a22",
  beard: "#5a3a22",
  cap: "#5a3a22",
  capShade: "#432a18",
  jacket: "#6b6f3a",
  jacketShade: "#555930",
  pants: "#4a4e55",
  pantsShade: "#363a40",
  glove: null,
};
const BRO_W: Outfit = { ...BRO, jacket: "#B83A55", jacketShade: "#8E2B42", cap: "#2C3B2E", capShade: "#1B2620", pack: "#2F5D8A", packShade: "#244a6f", boot: "#5a3e2a", sole: "#1d1916", glove: null };

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

const Table: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y} width={1880} height={1600} fill="#9b6d48" />
    {Array.from({ length: 12 }, (_, i) => (
      <path key={i} d={`M-400,${y + 40 + i * 110} Q300,${y + 20 + i * 110} 1480,${y + 50 + i * 110}`} stroke="rgba(80,50,30,0.25)" strokeWidth={4} fill="none" />
    ))}
    <rect x={-400} y={y} width={1880} height={16} fill="rgba(255,240,220,0.25)" />
  </Svg>
);

// Roll and sheet of wrapping paper (screen units).
const WrapPaper: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-320} y={-30} width={520} height={200} rx={8} fill="#B83A55" transform="rotate(-6)" />
    {Array.from({ length: 8 }, (_, i) => (
      <circle key={i} cx={-280 + i * 64} cy={40 + (i % 2) * 50} r={12} fill="#f2e6d0" opacity={0.8} transform="rotate(-6)" />
    ))}
    <rect x={160} y={-60} width={360} height={80} rx={40} fill="#2F5D3E" transform="rotate(8)" />
    <ellipse cx={170} cy={-18} rx={22} ry={40} fill="#244a31" transform="rotate(8)" />
  </g>
);

// Small hiking jacket held up by the shoulders (local units around the hand).
const TinyJacket: React.FC<{ x: number; y: number; s?: number; swing?: number }> = ({ x, y, s = 1, swing = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${swing}) scale(${s})`}>
    <path d="M-30,0 L30,0 L44,12 L40,40 L32,36 L32,62 L-32,62 L-32,36 L-40,40 L-44,12 Z" fill="#C2662E" />
    <path d="M0,4 L0,62" stroke="#9B4E20" strokeWidth={3} />
    <path d="M-10,0 Q0,10 10,0" stroke="#9B4E20" strokeWidth={4} fill="none" />
  </g>
);

// Wrapped gift with a ribbon (screen units, base centre).
const Gift: React.FC<{ x: number; y: number; s?: number; k: number }> = ({ x, y, s = 1, k }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-170} y={-60} width={340} height={60} rx={8} fill="#f7f2e8" />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={-150} y={-56 - i * 10} width={300} height={8} fill="#e6dccb" />
    ))}
    <g opacity={k}>
      <rect x={-190} y={-80} width={380} height={90} rx={10} fill="#B83A55" />
      <rect x={-18} y={-80} width={36} height={90} fill="#E3B23C" />
      <rect x={-190} y={-44} width={380} height={18} fill="#E3B23C" />
      <path d="M0,-80 Q-80,-160 -90,-100 Q-60,-80 0,-80 Q60,-80 90,-100 Q80,-160 0,-80 Z" fill="#E3B23C" />
    </g>
  </g>
);

// Open book page (journal / tracker), screen units.
const OpenBook: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => (
  <g transform="translate(540,1000) rotate(-3)">
    <rect x={-440} y={-520} width={880} height={980} rx={26} fill="#2C3B2E" />
    <rect x={-414} y={-494} width={828} height={928} rx={14} fill="#f6efe2" />
    <rect x={-414} y={-494} width={828} height={100} rx={14} fill="#e6dccb" />
    <text x={-370} y={-424} fontFamily={HEAD} fontWeight={800} fontSize={52} fill="#2C3B2E" letterSpacing={3}>
      {title}
    </text>
    {children}
  </g>
);

// ============ S1 HOOK MEDIUM: Nora holds up a jacket that is too small (0 - 3.66) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: t * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, t / 3.66), rot: hh.rot };
  const floorY = 1560;
  const n: HikerProps = { x: 330, y: floorY + 10, scale: 2.3, walk: 0, lean: -0.02, poles: false, handOverride: [96, -112], breathe: Math.sin(t * 2.2) * 1.5 };
  const b: HikerProps = { x: 760, y: floorY - 30, scale: 2.2, walk: 0, lean: -0.06, poles: false, handOverride: [20, 30], breathe: Math.sin(t * 2) * 1.5 };
  const nh = hikerGeometry(n).arms[1].hand;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={460} y={420} w={480} h={520} sky={COLD} uid="a" />
        <Room floorY={floorY - 120} win={[460, 420, 480, 520]} lamp={[160, 560]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...b} outfit={BRO} expression="tired" noPack flip />
          <Person {...n} outfit={NORA} expression="happy" noPack />
          <g transform={hikerTransform(n)}>
            <TinyJacket x={nh[0] + 6} y={nh[1] - 4} s={1.2} swing={Math.sin(t * 3) * 4} />
          </g>
        </Subject>
        <Table y={floorY + 40} />
        <Svg>
          <WrapPaper x={560} y={floorY + 180} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="left" top={300} />
      </Plane>
      <Particles seed={811} n={16} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={560} warm={LAMP} cool="40,40,60" />
      <Title text={"Wrong size.\nAgain."} t={t} t0={0} top={130} size={150} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: brother, unimpressed (3.66 - 5.6) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.94), rot: hh.rot };
  const p: HikerProps = { x: 560, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: -0.04, poles: false, handOverride: [20, 30], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={8}>
        <WindowView x={480} y={200} w={600} h={700} sky={COLD} uid="b" />
        <Room floorY={1900} win={[480, 200, 600, 700]} lamp={[150, 400]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={BRO} expression="tired" noPack flip />
        </Subject>
      </Plane>
      <Particles seed={812} n={12} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={400} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Chip text="Wrong size" t={t} t0={4.3} x={80} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: a shelf of gear he already owned (5.6 - 7.81) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 20, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.2), rot: hh.rot };
  const k = (i: number) => at(t, [5.7 + i * 0.25, 6.1 + i * 0.25], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={3}>
        <Room floorY={1700} win={[700, 300, 360, 420]} lamp={[200, 500]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          {[760, 1160].map((y) => (
            <g key={y}>
              <rect x={40} y={y} width={1000} height={30} rx={6} fill="#7d573c" />
              <rect x={40} y={y + 30} width={1000} height={14} fill="rgba(0,0,0,0.18)" />
            </g>
          ))}
          {[0, 1, 2].map((i) => (
            <g key={i} opacity={k(i)} transform={`translate(${200 + i * 300},${760 - (1 - k(i)) * 40})`}>
              {/* the same headlamp, three times */}
              <rect x={-80} y={-150} width={160} height={150} rx={14} fill="#2F5D8A" />
              <circle cx={0} cy={-80} r={44} fill="#f4f1e6" />
              <circle cx={0} cy={-80} r={26} fill="#E3B23C" />
            </g>
          ))}
          {[0, 1].map((i) => (
            <g key={i} opacity={k(i + 3)}>
              <GadgetBox x={300 + i * 420} y={1160} w={300} h={230} col={i ? "#B5553A" : "#3E5F4B"} />
            </g>
          ))}
        </Svg>
      </Plane>
      <Particles seed={813} n={12} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={560} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Chip text="Already owned" t={t} t0={6.2} x={80} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 FIX CLOSE-UP: Nora has the idea (7.81 - 11.82) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 4), rot: hh.rot };
  const p: HikerProps = { x: 600, y: 1480 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.02, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={8}>
        <WindowView x={-40} y={240} w={560} h={680} sky={COLD} uid="c" />
        <Room floorY={1900} win={[-40, 240, 560, 680]} lamp={[900, 400]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={NORA} expression="happy" noPack />
        </Subject>
      </Plane>
      <Particles seed={814} n={14} col="#ffe8c0" bokeh />
      <Grade sunX={900} sunY={400} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Title text={"Give him\nhis hikes."} t={t} t0={off + 0.05} t1={9.6} top={160} size={150} />
      <Chip text="Plan his hikes" t={t} t0={9.7} x={80} y={200} icon="check" big />
      <Chip text="Remember them" t={t} t0={10.4} x={80} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: a trail journal for every hike (11.82 - 13.66) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.84), rot: hh.rot };
  const rows: [string, string][] = [
    ["Trail", "Ridge loop"],
    ["Distance", "4.2 mi (6.8 km)"],
    ["Best part", "Frost on the pines"],
  ];
  return (
    <AbsoluteFill style={{ background: "#7d573c" }}>
      <Plane cam={cam} depth={1}>
        <Table y={0} />
        <Subject rimX={-4}>
          <OpenBook title="HIKE LOG">
            {rows.map(([a, b], i) => {
              const k = at(t, [12.0 + i * 0.4, 12.4 + i * 0.4], [0, 1]);
              const y = -280 + i * 220;
              return (
                <g key={i}>
                  <text x={-370} y={y} fontFamily="Inter" fontWeight={600} fontSize={36} fill="#5b625c">
                    {a}
                  </text>
                  <text x={-370} y={y + 70} fontFamily={HEAD} fontWeight={700} fontSize={64} fill="#2a3a8a" opacity={k}>
                    {b}
                  </text>
                  <line x1={-370} y1={y + 92} x2={370} y2={y + 92} stroke="#d8d0c0" strokeWidth={3} />
                </g>
              );
            })}
          </OpenBook>
        </Subject>
      </Plane>
      <Grade sunX={800} sunY={400} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Chip text="Trail journal" t={t} t0={11.9} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: a tracker for the national parks (13.66 - 15.63) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.97), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#7d573c" }}>
      <Plane cam={cam} depth={1}>
        <Table y={0} />
        <Subject rimX={-4}>
          <OpenBook title="NATIONAL PARKS">
            {Array.from({ length: 20 }, (_, i) => {
              const cx = -300 + (i % 4) * 200;
              const cy = -270 + Math.floor(i / 4) * 150;
              const stamped = [1, 6, 11].includes(i) && t > 14.0 + [1, 6, 11].indexOf(i) * 0.4;
              return (
                <g key={i}>
                  <circle cx={cx} cy={cy} r={56} fill="none" stroke="#c9bfa8" strokeWidth={5} strokeDasharray="10 8" />
                  {stamped && (
                    <g>
                      <circle cx={cx} cy={cy} r={56} fill="#3e7d4f" opacity={0.9} />
                      <path d={`M${cx - 30},${cy + 18} L${cx - 6},${cy - 22} L${cx + 6},${cy - 4} L${cx + 16},${cy - 16} L${cx + 32},${cy + 18} Z`} fill="#f6efe2" />
                    </g>
                  )}
                </g>
              );
            })}
          </OpenBook>
        </Subject>
      </Plane>
      <Grade sunX={800} sunY={400} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Chip text="National parks tracker" t={t} t0={13.75} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: a planner for the next trip (15.63 - 17.55) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.92), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#7d573c" }}>
      <Plane cam={cam} depth={1}>
        <Table y={0} />
        <Subject rimX={-4}>
          <g transform="rotate(2 540 1000)">
            <PlanPage
              x={150}
              y={430}
              w={780}
              t={t}
              t0={15.9}
              gap={0.35}
              rows={[
                ["Route", "Snowy lake loop"],
                ["Turnaround time", "1:30 pm"],
                ["Who knows where", "Nora"],
              ]}
            />
          </g>
        </Subject>
      </Plane>
      <Grade sunX={800} sunY={400} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Chip text="Trip planner" t={t} t0={15.7} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 MEDIUM: print it, wrap it, done (17.55 - 19.46) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.91), rot: hh.rot };
  const out = at(t, [17.6, 18.1], [0, 1], outExpo);
  const wrap = at(t, [18.2, 18.6], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={3}>
        <WindowView x={560} y={360} w={440} h={520} sky={COLD} uid="d" />
        <Room floorY={1100} win={[560, 360, 440, 520]} lamp={[200, 500]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Table y={1180} />
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          {/* printer */}
          <g transform="translate(300,1240)">
            <rect x={-200} y={-170} width={400} height={170} rx={20} fill="#d9d6cc" />
            <rect x={-170} y={-200} width={340} height={40} rx={10} fill="#bfbab0" />
            <rect x={-150} y={-60} width={300} height={16} rx={6} fill="#5a5a5a" />
            <rect x={-130} y={-60 + out * 10} width={260} height={out * 150} fill="#f7f2e8" opacity={1 - wrap} />
          </g>
          <Gift x={mix(300, 700, wrap)} y={1330} s={1.1} k={wrap} />
        </Subject>
      </Plane>
      <Particles seed={818} n={16} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={560} warm={LAMP} cool="40,40,60" />
      <Chip text="Print it" t={t} t0={17.6} x={80} y={200} icon="check" big />
      <Chip text="Wrap it" t={t} t0={18.1} x={80} y={330} icon="check" big />
      <Chip text="Done" t={t} t0={18.6} x={80} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF MEDIUM: February trail, brother writing in his journal (19.46 - 22.6) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 30 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.16, 1.06], outExpo), rot: hh.rot };
  const g = 1420;
  const p: HikerProps = { x: 560, y: g + 182 * 2.3 - 130, scale: 2.3, walk: 0, lean: 0.12, poles: false, handOverride: [40, -40], breathe: Math.sin(t * 2) * 2 };
  const h = hikerGeometry(p).arms[1].hand;
  const write = at(t, [19.8, 21.4], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="e" treeY={g + 20} t={t} snow={0.8} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 60} snow={0.8} />
        <Subject rimX={6} col="rgba(255,190,120,0.9)">
          <Person {...p} outfit={BRO_W} expression="happy" />
          <g transform={hikerTransform(p)}>
            <g transform={`translate(${h[0] - 10},${h[1] - 46}) rotate(-6)`}>
              <rect x={0} y={0} width={46} height={58} rx={4} fill="#2C3B2E" />
              <rect x={4} y={3} width={38} height={52} rx={2} fill="#f6efe2" />
              {[0, 1, 2, 3, 4].map((i) => (
                <rect key={i} x={8} y={10 + i * 9} width={(i + 1) * 6 < write * 40 ? 28 - (i % 2) * 8 : 0} height={2.6} rx={1} fill="#5a6a5e" />
              ))}
            </g>
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24443a" side="right" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={819} n={24} col="#ffe7b8" />
      <Grade sunX={760} sunY={640} warm="255,180,100" />
      <Readout label="BY FEBRUARY" value="6 hikes logged" ok={true} t={t} t0={19.7} x={80} y={200} pulseAt={21.0} />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/trail-memories-gift-set-cut.png"
      cutoutH={600}
      spec="JOURNAL · PARKS TRACKER · TRIP PLANNER"
      name={
        <>
          Trail Memories
          <br />
          Gift Set
        </>
      }
      nameSize={108}
      price="$15.99"
      save="Save this for your gift list"
    />
  );
};

export const V81: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.71} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.66} to={5.65} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.66} />
    </Scene>
    <Scene from={5.6} to={7.86} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.6} />
    </Scene>
    <Scene from={7.81} to={11.87} fadeIn={0.08} fadeOut={0.1}>
      <S4 off={7.81} />
    </Scene>
    <Scene from={11.82} to={13.71} fadeIn={0.1} fadeOut={0.08}>
      <S5 off={11.82} />
    </Scene>
    <Scene from={13.66} to={15.68} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={13.66} />
    </Scene>
    <Scene from={15.63} to={17.6} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={15.63} />
    </Scene>
    <Scene from={17.55} to={19.51} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={17.55} />
    </Scene>
    <Scene from={19.46} to={22.7} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={19.46} />
    </Scene>
    <Scene from={22.45} to={27} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.66, 1560],
        [3.66, 7.81, 1560],
        [7.81, 11.82, 1560],
        [11.82, 13.66, 1560],
        [13.66, 15.63, 1560],
        [15.63, 17.55, 1560],
        [17.55, 19.46, 1560],
        [19.46, 22.45, 1560],
      ]}
    />
  </AbsoluteFill>
);
