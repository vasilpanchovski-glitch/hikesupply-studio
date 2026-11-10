// V126: "She already owns all the gear." in the cinematic C01 style. Gift story for the 2027 Hiking Goals Gift Set
// (Year Planner, Peak Bagger's Logbook & Parks Tracker, $14.99, live Shopify), posted Dec 12. Facts from the listing:
// 2027 Hiking Year Planner with the 52-box Hike-a-Week Challenge; Peak Bagger's Logbook with progress boards and a log card for
// every peak on the Colorado 14ers, New Hampshire 4,000-Footers and Adirondack High Peaks lists; US National Parks Hiking Tracker
// with every US national park and stamp boxes; instant PDF, printable. No park count on screen (the count changed this year).
// End card = real Shopify cover (products/2027-hiking-goals-gift-set.jpg, boxed photo card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, rim, Sky, Svg } from "../cine";
import { GadgetBox, Room, WindowView } from "../home";
import { PenTip } from "../peak";
import vo from "../vo/v126.json";

const words = vo.words as unknown as Word[];

const COLD: Sky = { top: "#4d6a86", mid: "#a9bac4", low: "#e6e3d4", sun: [790, 600], sunR: 46, sunCol: "#fbf7ea", glow: "#f1ecd8" };
const NIGHTW: Sky = { top: "#141c34", mid: "#28365a", low: "#46557a", sun: [800, 300], sunR: 26, sunCol: "#f1efe4", glow: "#8f9ab4" };
const LAMP = "255,200,140";
const PEN = "#2a3a8a";

const LUCY: Outfit = {
  ...GUIDE,
  skin: "#D9A47E",
  skinShade: "#BB8662",
  hair: "#2a1a10",
  ponytail: "#2a1a10",
  beard: null,
  cap: "#2a1a10",
  capShade: "#1a100a",
  jacket: "#B83A55",
  jacketShade: "#8E2B42",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  glove: null,
};
const TOM: Outfit = {
  ...JAKE,
  skin: "#D9A47E",
  skinShade: "#BB8662",
  hair: "#2a1a10",
  beard: "#2a1a10",
  cap: "#2a1a10",
  capShade: "#1a100a",
  jacket: "#2C6E63",
  jacketShade: "#1f5249",
  pants: "#4a4e55",
  pantsShade: "#363a40",
  glove: null,
};

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
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

// Insulated bottle, same model twice.
const Bottle: React.FC<{ x: number; y: number; s?: number; col?: string }> = ({ x, y, s = 1, col = "#2F5D8A" }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-44} y={-250} width={88} height={250} rx={30} fill={col} />
    <rect x={-44} y={-250} width={30} height={250} rx={14} fill="rgba(255,255,255,0.15)" />
    <rect x={-30} y={-290} width={60} height={46} rx={10} fill="#2a2e34" />
    <path d="M-20,-290 Q0,-326 20,-290" stroke="#2a2e34" strokeWidth={8} fill="none" />
  </g>
);

// Open gift box with tissue and one bottle inside.
const OpenGift: React.FC<{ x: number; y: number; s?: number; lift?: number }> = ({ x, y, s = 1, lift = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <Bottle x={0} y={20 - lift * 160} s={0.9} />
    <rect x={-170} y={-60} width={340} height={170} rx={10} fill="#B83A55" />
    <rect x={-18} y={-60} width={36} height={170} fill="#E3B23C" />
    <path d="M-170,-60 L-120,-110 L120,-110 L170,-60 Z" fill="#f2ebdc" />
  </g>
);

// Open book page, screen units.
const OpenBook: React.FC<{ children: React.ReactNode; title: string; col?: string }> = ({ children, title, col = "#2C3B2E" }) => (
  <g transform="translate(540,1000) rotate(-3)">
    <rect x={-440} y={-520} width={880} height={980} rx={26} fill={col} />
    <rect x={-414} y={-494} width={828} height={928} rx={14} fill="#f6efe2" />
    <rect x={-414} y={-494} width={828} height={100} rx={14} fill="#e6dccb" />
    <text x={-370} y={-424} fontFamily={HEAD} fontWeight={800} fontSize={52} fill="#2C3B2E" letterSpacing={3}>
      {title}
    </text>
    {children}
  </g>
);

// ============ S1 HOOK MEDIUM: she unwraps another bottle, the same one on her shelf (0 - 2.6) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: t * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, t / 2.6), rot: hh.rot };
  const floorY = 1560;
  const p: HikerProps = { x: 300, y: floorY + 10, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [80, 20], breathe: Math.sin(t * 2.2) * 1.5 };
  const lift = at(t, [0.3, 1.4], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={520} y={380} w={440} h={480} sky={COLD} uid="a" />
        <Room floorY={floorY - 120} win={[520, 380, 440, 480]} lamp={[160, 560]} />
        <Svg>
          <rect x={560} y={980} width={420} height={24} rx={6} fill="#7d573c" />
          <Bottle x={650} y={980} s={0.7} />
          <Bottle x={760} y={980} s={0.7} />
          <Bottle x={870} y={980} s={0.7} col="#3E5F4B" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...p} outfit={LUCY} expression="neutral" noPack />
        </Subject>
        <Table y={floorY + 40} />
        <Svg>
          <OpenGift x={520} y={floorY + 40} s={1.15} lift={lift} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="left" top={300} />
      </Plane>
      <Particles seed={1261} n={16} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={560} warm={LAMP} cool="40,40,60" />
      <Title text={"She already\nowns all\nthe gear."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the new bottle next to the identical one on the shelf (2.6 - 5.21) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 2.61), rot: hh.rot };
  const set = at(t, [2.8, 3.6], [0, 1], outExpo);
  const k = (i: number) => at(t, [3.8 + i * 0.25, 4.2 + i * 0.25], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={3}>
        <Room floorY={1800} win={[700, 260, 360, 420]} lamp={[200, 500]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,236,200,0.8)">
          {[860, 1300].map((y) => (
            <g key={y}>
              <rect x={40} y={y} width={1000} height={30} rx={6} fill="#7d573c" />
              <rect x={40} y={y + 30} width={1000} height={14} fill="rgba(0,0,0,0.18)" />
            </g>
          ))}
          <Bottle x={330} y={860} s={1.5} />
          <Bottle x={mix(1000, 640, set)} y={860} s={1.5} />
          {[0, 1].map((i) => (
            <g key={i} opacity={k(i)}>
              <GadgetBox x={300 + i * 420} y={1300} w={300} h={230} col={i ? "#B5553A" : "#3E5F4B"} />
            </g>
          ))}
        </Subject>
      </Plane>
      <Particles seed={1262} n={12} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={560} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Readout label="GIFT FROM TOM" value="Already owns it" ok={false} t={t} t0={2.7} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Tom has a better idea (5.21 - 7.41) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.2), rot: hh.rot };
  const p: HikerProps = { x: 560, y: 1480 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.02, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={8}>
        <WindowView x={-40} y={240} w={560} h={680} sky={COLD} uid="c" />
        <Room floorY={1900} win={[-40, 240, 560, 680]} lamp={[900, 400]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={TOM} expression="happy" noPack />
        </Subject>
      </Plane>
      <Particles seed={1263} n={14} col="#ffe8c0" bokeh />
      <Grade sunX={900} sunY={400} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Chip text="This year: goals" t={t} t0={6.2} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the 2027 year planner, hike-a-week boxes (7.41 - 11.29) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.88), rot: hh.rot };
  const filled = Math.floor(at(t, [9.4, 10.9], [0, 9]));
  return (
    <AbsoluteFill style={{ background: "#7d573c" }}>
      <Plane cam={cam} depth={1}>
        <Table y={0} />
        <Subject rimX={-4}>
          <OpenBook title="HIKE A WEEK · 2027" col="#2f5446">
            {Array.from({ length: 52 }, (_, i) => {
              const cx = -340 + (i % 7) * 112;
              const cy = -320 + Math.floor(i / 7) * 96;
              const on = i < filled;
              return (
                <g key={i}>
                  <rect x={cx - 40} y={cy - 38} width={80} height={76} rx={10} fill={on ? "#3e7d4f" : "none"} stroke="#c9bfa8" strokeWidth={4} />
                  <text x={cx} y={cy + 12} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={30} fill={on ? "#f6efe2" : "#a39a88"}>
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </OpenBook>
        </Subject>
      </Plane>
      <Grade sunX={800} sunY={400} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Chip text="2027 year planner" t={t} t0={7.5} x={60} y={200} icon="check" big />
      <Chip text="Hike-a-week challenge" t={t} t0={9.4} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the peak logbook, three lists (11.29 - 17.91) ============
const LISTS = ["COLORADO 14ERS", "NH 4,000-FOOTERS", "ADIRONDACK HIGH PEAKS"];
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(-20, 20, lt / 6.6), zoom: mix(1.0, 1.06, lt / 6.6), rot: hh.rot };
  const show = [11.8, 13.6, 15.6];
  return (
    <AbsoluteFill style={{ background: "#7d573c" }}>
      <Plane cam={cam} depth={1}>
        <Table y={0} />
        <Subject rimX={-4}>
          <OpenBook title="PEAK BAGGER'S LOGBOOK" col="#3e4a5c">
            {LISTS.map((name, i) => {
              const k = at(t, [show[i], show[i] + 0.4], [0, 1], outExpo);
              const y = -320 + i * 260;
              return (
                <g key={name} opacity={k} transform={`translate(${(1 - k) * 40},0)`}>
                  <rect x={-370} y={y - 30} width={740} height={210} rx={16} fill="#ece2d0" />
                  <path d={`M-340,${y + 140} L-280,${y + 40} L-240,${y + 90} L-190,${y + 10} L-120,${y + 140} Z`} fill="#6f8a7a" />
                  <path d={`M-190,${y + 10} L-172,${y + 38} L-206,${y + 38} Z`} fill="#f6efe2" />
                  <text x={-80} y={y + 56} fontFamily={HEAD} fontWeight={800} fontSize={46} fill="#2C3B2E" letterSpacing={1}>
                    {name}
                  </text>
                  {Array.from({ length: 10 }, (_, j) => (
                    <circle key={j} cx={-60 + j * 40} cy={y + 120} r={14} fill="none" stroke="#a39a88" strokeWidth={4} />
                  ))}
                </g>
              );
            })}
          </OpenBook>
        </Subject>
      </Plane>
      <Grade sunX={800} sunY={400} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Chip text="Peak logbook" t={t} t0={11.4} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the national parks tracker, stamp boxes (17.91 - 20.09) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.18), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#7d573c" }}>
      <Plane cam={cam} depth={1}>
        <Table y={0} />
        <Subject rimX={-4}>
          <OpenBook title="NATIONAL PARKS">
            {Array.from({ length: 20 }, (_, i) => {
              const cx = -300 + (i % 4) * 200;
              const cy = -270 + Math.floor(i / 4) * 150;
              return <circle key={i} cx={cx} cy={cy} r={56} fill="none" stroke="#c9bfa8" strokeWidth={5} strokeDasharray="10 8" />;
            })}
          </OpenBook>
        </Subject>
      </Plane>
      <Grade sunX={800} sunY={400} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Chip text="Every national park" t={t} t0={18.0} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: that night she prints them and circles her first peak (20.09 - 23.06) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.97), rot: hh.rot };
  const out = at(t, [20.2, 20.9], [0, 1], outExpo);
  const circ = at(t, [21.6, 22.5], [0, 1]);
  const ang = circ * Math.PI * 2 - Math.PI / 2;
  const px = 640 + Math.cos(ang) * 120;
  const py = 1140 + Math.sin(ang) * 60;
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={0.6} blur={8}>
        <WindowView x={560} y={160} w={480} h={480} sky={NIGHTW} uid="g" />
        <Room floorY={1900} win={[560, 160, 480, 480]} wall="#6a5a4a" lamp={[160, 400]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Table y={760} />
        <Subject rimX={-4} col="rgba(255,226,180,0.75)">
          {/* printer behind, a stack of fresh pages in front */}
          <g transform="translate(260,880)">
            <rect x={-200} y={-170} width={400} height={170} rx={20} fill="#d9d6cc" />
            <rect x={-170} y={-200} width={340} height={40} rx={10} fill="#bfbab0" />
            <rect x={-150} y={-60} width={300} height={16} rx={6} fill="#5a5a5a" />
            <rect x={-130} y={-60 + out * 10} width={260} height={out * 150} fill="#f7f2e8" />
          </g>
          <g transform="translate(640,1150) rotate(-4)">
            <rect x={-330} y={-250} width={660} height={460} rx={10} fill="rgba(0,0,0,0.25)" transform="translate(10,14)" />
            <rect x={-330} y={-250} width={660} height={460} rx={10} fill="#f6efe2" />
            <text x={-290} y={-180} fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#2C3B2E" letterSpacing={2}>
              FIRST PEAK
            </text>
            <path d="M-260,140 L-120,-80 L-40,30 L60,-120 L260,140 Z" fill="#8fb0a0" />
            <path d="M60,-120 L90,-74 L30,-74 Z" fill="#fff" />
          </g>
          <ellipse cx={640} cy={1100} rx={120} ry={60} fill="none" stroke={PEN} strokeWidth={8} strokeDasharray={600} strokeDashoffset={600 * (1 - circ)} />
          {t > 21.4 && <PenTip x={px} y={py} s={1.1} rot={-30} skin={LUCY.skin} wig={t} />}
        </Subject>
      </Plane>
      <Particles seed={1267} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={160} sunY={400} warm={LAMP} vignette={0.6} />
      <Chip text="Printed that night" t={t} t0={20.2} x={60} y={200} icon="check" big />
      <Chip text="First peak circled" t={t} t0={21.8} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF MEDIUM: January, the year planned on her wall (23.06 - 25.9) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.04], outExpo), rot: hh.rot };
  const floorY = 1700;
  const p: HikerProps = { x: 300, y: floorY + 40, scale: 2.3, walk: 0, lean: -0.02, poles: false, handOverride: [96, -112], breathe: Math.sin(t * 2) * 1.2 };
  const hand = hikerGeometry(p).arms[1].hand;
  const pages = at(t, [23.2, 24.2], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#1a120c" }}>
      <Plane cam={cam} depth={0.8} blur={2.5}>
        <WindowView x={700} y={300} w={330} h={420} sky={COLD} uid="i" />
        <Room floorY={floorY} win={[700, 300, 330, 420]} wall="#d6c4a6" lamp={[160, 520]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.85)">
          {/* pinned pages: planner, logbook, tracker */}
          {[0, 1, 2].map((i) => (
            <g key={i} opacity={pages} transform={`translate(${440 + i * 190},${780 + (i % 2) * 40}) rotate(${(i - 1) * 4})`}>
              <rect x={-80} y={-110} width={160} height={220} fill="#f6efe2" stroke="#d8d0c0" strokeWidth={3} />
              <rect x={-60} y={-90} width={120} height={22} rx={4} fill={["#2f5446", "#3e4a5c", "#2C3B2E"][i]} />
              {Array.from({ length: 12 }, (_, j) => (
                <rect key={j} x={-60 + (j % 4) * 32} y={-50 + Math.floor(j / 4) * 40} width={22} height={22} rx={4} fill={j < [6, 2, 3][i] ? "#3e7d4f" : "none"} stroke="#c9bfa8" strokeWidth={3} />
              ))}
              <circle cx={0} cy={-104} r={8} fill="#B83A55" />
            </g>
          ))}
          <Person {...p} outfit={LUCY} expression="happy" noPack />
          <g transform={hikerTransform(p)}>
            <circle cx={hand[0]} cy={hand[1]} r={4} fill="none" />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={300} />
      </Plane>
      <Rays x={860} y={420} strength={0.3} />
      <Particles seed={1268} n={14} col="#fff1d6" fall={4} />
      <LowScrim />
      <Grade sunX={860} sunY={420} warm="255,230,180" />
      <Readout label="BY JANUARY" value="A plan for the year" ok={true} t={t} t0={23.15} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/2027-hiking-goals-gift-set.jpg"
      photoH={800}
      spec="YEAR PLANNER · PEAK LOGBOOK · PARKS TRACKER"
      name={
        <>
          2027 Hiking Goals
          <br />
          Gift Set
        </>
      }
      nameSize={96}
      price="$14.99"
      save="Save this for the hiker who has everything"
    />
  );
};

export const V126: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.65} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.6} to={5.26} fadeIn={0.08} fadeOut={0.08}>
      <S2 off={2.6} />
    </Scene>
    <Scene from={5.21} to={7.46} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.21} />
    </Scene>
    <Scene from={7.41} to={11.34} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.41} />
    </Scene>
    <Scene from={11.29} to={17.96} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.29} />
    </Scene>
    <Scene from={17.91} to={20.14} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={17.91} />
    </Scene>
    <Scene from={20.09} to={23.11} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={20.09} />
    </Scene>
    <Scene from={23.06} to={25.95} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={23.06} />
    </Scene>
    <Scene from={25.4} to={29.8} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.25, 2.6, 1640],
        [2.6, 5.21, 1640],
        [5.21, 7.41, 1700],
        [7.41, 11.29, 1640],
        [11.29, 17.91, 1640],
        [17.91, 20.09, 1640],
        [20.09, 23.06, 1700],
        [23.06, 25.4, 1560],
      ]}
    />
  </AbsoluteFill>
);
