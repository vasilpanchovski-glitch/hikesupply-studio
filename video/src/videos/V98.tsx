// V98: "She wants to hike alone. He worries." in the cinematic C01 style. Black Friday sale day 2 (Nov 28, 12:00 ET), gift story.
// Contents from the live Shopify listing (Ultimate Hiker's Toolkit, 7 printable PDFs): beginner's guide, trip planner, packing
// checklist, safety guide, what to do if you get lost, solo hiking guide (plus emergency checklist and Start Here). Sale is real:
// offer o02, 25% off Nov 27 - Dec 1 (US Eastern). Base price $29.99 from live Shopify. No countdowns, no was-price.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, rim, Sky, Svg } from "../cine";
import { GadgetBox, PlanPage, Room, WindowView } from "../home";
import { FrostTrail, WinterBackdrop } from "../winter";
import vo from "../vo/v98.json";

const words = vo.words as unknown as Word[];

const COLD: Sky = { top: "#4d6a86", mid: "#a9bac4", low: "#e6e3d4", sun: [790, 600], sunR: 46, sunCol: "#fbf7ea", glow: "#f1ecd8" };
const RIDGE: Sky = { top: "#3f6e9c", mid: "#cfc6b8", low: "#ffe6bf", sun: [780, 620], sunR: 58, sunCol: "#fff6dc", glow: "#ffd08a" };
const LAMP = "255,200,140";

const DAD: Outfit = { ...GUIDE, hair: "#9a958e", beard: "#9a958e", cap: "#9a958e", capShade: "#7d7871", jacket: "#5d6b7a", jacketShade: "#46525e", pants: "#4b4f55", pantsShade: "#383b40", glove: null };
const EMMA: Outfit = {
  ...JAKE,
  skin: "#F0C3A4",
  skinShade: "#D3A386",
  hair: "#c08a4a",
  ponytail: "#c08a4a",
  beard: null,
  cap: "#2C6E63",
  capShade: "#1f5249",
  jacket: "#B83A55",
  jacketShade: "#8E2B42",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#3E4F5C",
  packShade: "#2C3943",
  boot: "#6B4630",
  glove: null,
};

const PAPER = "#f7f2e8";
const INK = "#2C3B2E";

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// A printed guide page with a title band (our own generic drawing, not the product art).
const Page: React.FC<{ x: number; y: number; w: number; rot?: number; title: string; band: string; k?: number }> = ({ x, y, w, rot = 0, title, band, k = 1 }) => {
  const h = w * 1.29;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`} opacity={k}>
      <rect x={-w / 2 + 10} y={-h / 2 + 14} width={w} height={h} rx={10} fill="rgba(0,0,0,0.25)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill={PAPER} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h * 0.42} rx={10} fill={band} />
      <path d={`M${-w / 2},${-h / 2 + h * 0.36} L${-w * 0.15},${-h / 2 + h * 0.2} L${w * 0.1},${-h / 2 + h * 0.3} L${w * 0.32},${-h / 2 + h * 0.14} L${w / 2},${-h / 2 + h * 0.28} L${w / 2},${-h / 2 + h * 0.42} L${-w / 2},${-h / 2 + h * 0.42} Z`} fill="rgba(255,255,255,0.18)" />
      <text x={-w / 2 + w * 0.09} y={-h / 2 + h * 0.55} fontFamily="Fraunces" fontWeight={700} fontSize={w * 0.1} fill={INK}>
        {title.split("\n").map((l, i) => (
          <tspan key={i} x={-w / 2 + w * 0.09} dy={i === 0 ? 0 : w * 0.12}>
            {l}
          </tspan>
        ))}
      </text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={-w / 2 + w * 0.09} y={-h / 2 + h * 0.72 + i * h * 0.055} width={w * (0.82 - (i % 2) * 0.2)} height={h * 0.018} rx={3} fill="#d8d0c0" />
      ))}
    </g>
  );
};

const GUIDES: [string, string, number][] = [
  ["Beginner's\nGuide", "#3e6b55", 9.55],
  ["Trip\nPlanner", "#5f7f95", 10.5],
  ["Packing\nLists", "#8a6a4a", 11.35],
  ["Safety\nGuide", "#7a4a3a", 12.7],
  ["If You\nGet Lost", "#4f5f70", 13.8],
  ["Solo\nHiking", "#2C6E63", 15.6],
];

// ============ S1 HOOK WIDE: Emma at the front door with her pack, dad behind her, worried (0 - 4.34) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - t * 8, y: hh.y, zoom: mix(1.03, 1.1, t / 4.34), rot: hh.rot };
  const floorY = 1540;
  const emma: HikerProps = { x: 330, y: floorY, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [64, 40], breathe: Math.sin(t * 2) * 1.2 };
  const dad: HikerProps = { x: 760, y: floorY + 20, scale: 2.4, walk: 0, lean: 0.1, poles: false, handOverride: [40, 20], breathe: Math.sin(t * 1.6) * 1.2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={560} y={420} w={420} h={480} sky={COLD} uid="a" />
        <Room floorY={floorY} win={[560, 420, 420, 480]} lamp={[900, 520]} />
        <Svg>
          {/* front door, ajar, cold daylight coming in */}
          <rect x={-40} y={560} width={360} height={980} fill="#e8eef2" />
          <rect x={-40} y={560} width={360} height={980} fill="url(#lampglow)" opacity={0} />
          <path d={`M320,560 L420,600 L420,1500 L320,1540 Z`} fill="#6b4a33" />
          <circle cx={404} cy={1060} r={10} fill="#c9a776" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...dad} outfit={DAD} expression="tired" noPack flip />
          <Person {...emma} outfit={EMMA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={300} />
      </Plane>
      <Rays x={140} y={900} strength={0.16} col="235,242,250" />
      <Particles seed={981} n={16} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={560} warm={LAMP} cool="40,40,60" />
      <Title text={"She wants to\nhike alone.\nHe worries."} t={t} t0={0} top={130} size={120} />
      <Chip text="Solo next summer" t={t} t0={2.6} x={60} y={600} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: dad's worried face (4.34 - 5.84) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.5), rot: hh.rot };
  const s = 4.4;
  const seat = 1560;
  const p: HikerProps = { x: 560, y: seat + 182 * s, scale: s, walk: 0, lean: 0.12, poles: false, handOverride: [40, 30], breathe: Math.sin(t * 2) * 1.2 };
  const g = hikerGeometry(p);
  const neck = [p.x - g.sh[0] * s, seat + g.sh[1] * s];
  const tilt = Math.sin(t * 1.5) * 2 - 3;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={8}>
        <WindowView x={480} y={240} w={620} h={700} sky={COLD} uid="b" />
        <Room floorY={1900} win={[480, 240, 620, 700]} lamp={[150, 400]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,236,200,0.85)">
          <g transform={`rotate(${tilt} ${neck[0]} ${neck[1]})`}>
            <Person {...p} outfit={DAD} expression="tired" noPack flip />
          </g>
        </Subject>
      </Plane>
      <Particles seed={982} n={12} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={400} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Chip text="Alone out there?" t={t} t0={4.45} x={60} y={200} big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: dad at the table pushes the gadget boxes aside and holds up the printed guides (5.84 - 9.52) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.68), rot: hh.rot };
  const floorY = 1620;
  const tableY = 1300;
  const push = at(t, [6.4, 7.2], [0, 1], outExpo);
  const lift = at(t, [7.6, 8.4], [0, 1], outExpo);
  const dad: HikerProps = { x: 660, y: floorY, scale: 2.5, walk: 0, lean: 0.06, poles: false, handOverride: [70, mix(70, -10, lift)], breathe: Math.sin(t * 2) * 1 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.7} blur={4}>
        <WindowView x={600} y={360} w={420} h={480} sky={COLD} uid="c" />
        <Room floorY={floorY} win={[600, 360, 420, 480]} lamp={[200, 500]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.85)">
          <Person {...dad} outfit={DAD} expression="happy" noPack flip />
        </Subject>
        <Svg>
          {/* table */}
          <rect x={-200} y={tableY} width={1480} height={40} rx={10} fill="#9b6d48" />
          <rect x={-200} y={tableY + 40} width={1480} height={600} fill="#7d5636" />
          {/* gadget boxes slide away to the right */}
          <g transform={`translate(${push * 420},0)`} opacity={1 - push * 0.6}>
            <GadgetBox x={700} y={tableY - 180} w={220} h={180} col="#5f6b75" />
            <GadgetBox x={880} y={tableY - 140} w={170} h={140} col="#7a4a3a" rot={4} />
          </g>
          {/* stack of printed guides held up */}
          <g transform={`translate(${mix(400, 330, lift)},${mix(tableY - 40, tableY - 230, lift)})`}>
            {GUIDES.slice(0, 3).map(([title, band], i) => (
              <Page key={i} x={i * 26} y={-i * 18} w={300} rot={-6 + i * 4} title={title} band={band} />
            ))}
          </g>
        </Svg>
      </Plane>
      <Particles seed={983} n={14} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={560} warm={LAMP} cool="40,40,60" />
      <Chip text="No gadgets" t={t} t0={6.4} x={60} y={200} icon="x" big />
      <Chip text="The whole system" t={t} t0={7.9} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4/S5 CLOSE-UP: the guides fan out one by one on the table (9.52 - 17.39) ============
const S4: React.FC<{ off: number; from: number; to: number }> = ({ off, from, to }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + (from === 0 ? -lt * 8 : lt * 8), y: hh.y, zoom: mix(1.0, 1.06, lt / 4), rot: hh.rot };
  const items = GUIDES.slice(from, to);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.5} blur={10}>
        <Room floorY={2400} win={[700, 200, 300, 300]} lamp={[300, 600]} wall="#cdb894" />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={560} width={1880} height={1700} fill="#9b6d48" />
          {Array.from({ length: 10 }, (_, i) => (
            <path key={i} d={`M-400,${620 + i * 140} Q300,${600 + i * 140} 1480,${630 + i * 140}`} stroke="rgba(80,50,30,0.25)" strokeWidth={4} fill="none" />
          ))}
        </Svg>
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          {items.map(([title, band, t0], i) => {
            const k = at(t, [t0, t0 + 0.45], [0, 1], outExpo);
            const x = 250 + i * 290;
            const y = 1060 + (i % 2) * 120;
            return (
              <g key={i} transform={`translate(0,${(1 - k) * 260})`}>
                <Page x={x} y={y} w={380} rot={-5 + i * 5} title={title} band={band} k={k} />
              </g>
            );
          })}
        </Subject>
      </Plane>
      <Particles seed={984 + from} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={700} sunY={500} warm={LAMP} vignette={0.5} />
      {items.map(([title, , t0], i) => (
        <Chip key={i} text={title.replace("\n", " ")} t={t} t0={t0 + 0.05} x={60} y={200 + i * 130} icon="check" big />
      ))}
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: Emma sticks her trip plan on the fridge (17.39 - 20.88) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.5), rot: hh.rot };
  const place = at(t, [17.5, 18.3], [0, 1], outExpo);
  const s = 3.6;
  const emma: HikerProps = { x: 960, y: 1700 + 182 * s - 600, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [mix(60, 96, place), -40], breathe: 0 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={8}>
        <Room floorY={2000} win={[-300, 300, 200, 300]} lamp={[200, 400]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* fridge door */}
          <rect x={60} y={120} width={760} height={1900} rx={40} fill="#eef1f2" />
          <rect x={60} y={120} width={760} height={1900} rx={40} fill="none" stroke="#cfd5d8" strokeWidth={8} />
          <rect x={740} y={420} width={30} height={520} rx={14} fill="#b8c0c4" />
        </Svg>
        <Subject rimX={3} col="rgba(255,236,200,0.6)">
          <g transform={`translate(${mix(260, 130, place)},${mix(700, 560, place)}) rotate(${mix(8, -2, place)})`}>
            <PlanPage x={0} y={0} w={560} rows={[["Trail", "Ridge Loop"], ["Back by", "3 pm"], ["Turn around", "1 pm"]]} t={t} t0={18.4} gap={0.5} />
            <circle cx={280} cy={10} r={30} fill="#B83A55" opacity={at(t, [18.2, 18.3], [0, 1])} />
          </g>
          <Person {...emma} outfit={EMMA} expression="happy" flip />
        </Subject>
      </Plane>
      <Particles seed={986} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={700} sunY={500} warm={LAMP} vignette={0.5} />
      <Chip text="Trip plan on the fridge" t={t} t0={18.0} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: Emma alone on a winter ridge trail, confident (20.88 - 25.74) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 26, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1540;
  const ph = t * 3.4;
  const p: HikerProps = { x: 260 + lt * 60, y: g, scale: 2.2, phase: ph, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={RIDGE} uid="g" treeY={g - 140} t={t} snow={0.6} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.8} />
        <Subject rimX={-6} col="rgba(255,200,140,0.9)">
          <Person {...p} outfit={{ ...EMMA, glove: "#2a2a2a" }} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="both" />
      </Plane>
      <Rays x={RIDGE.sun[0]} y={RIDGE.sun[1]} strength={0.34} col="255,214,160" />
      <Particles seed={987} n={20} col="#fff3d6" fall={10} />
      <Grade sunX={780} sunY={620} warm="255,200,140" />
      <Chip text="Plan left at home" t={t} t0={21.0} x={60} y={200} icon="check" big />
      <Chip text="25% off through Dec 1" t={t} t0={22.3} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <AbsoluteFill>
      <EndCard
        lt={lt}
        photo="products/ultimate-hikers-toolkit-card.jpg"
        photoH={760}
        spec="7 PRINTABLE PDFS · INSTANT DOWNLOAD"
        name={
          <>
            Ultimate
            <br />
            Hiker's Toolkit
          </>
        }
        nameSize={92}
        price="$29.99"
        save="Save this for your gift list"
      />
      <Chip text="25% off through Dec 1" t={lt} t0={0.5} x={270} y={1800} big />
    </AbsoluteFill>
  );
};

export const V98: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.39} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.34} to={5.89} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.34} />
    </Scene>
    <Scene from={5.84} to={9.57} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.84} />
    </Scene>
    <Scene from={9.52} to={12.72} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.52} from={0} to={3} />
    </Scene>
    <Scene from={12.67} to={17.44} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={12.67} from={3} to={6} />
    </Scene>
    <Scene from={17.39} to={20.93} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={17.39} />
    </Scene>
    <Scene from={20.88} to={25.7} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={20.88} />
    </Scene>
    <Scene from={25.55} to={30} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.34, 1560],
        [4.34, 5.84, 1560],
        [5.84, 9.52, 1560],
        [9.52, 12.67, 1560],
        [12.67, 17.39, 1560],
        [17.39, 20.88, 1560],
        [20.88, 25.55, 1560],
      ]}
    />
  </AbsoluteFill>
);
