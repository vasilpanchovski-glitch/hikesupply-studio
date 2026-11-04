// V99: "She said 'hike more' every January." in the cinematic C01 style. Launch video for the 2027 Hiking Year Planner (p13).
// Facts from the live Shopify listing: 28 printable pages, goals page, a hike planned for every month, the Hike-a-Week Challenge
// (52 boxes), color-in mile posters, US and Canadian long weekends marked, keep it on the fridge. $5.99, instant PDF download.
// No sale wording (the planner is not in the Black Friday sale).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, rim, Sky, Svg } from "../cine";
import { Boots, Room, WindowView } from "../home";
import vo from "../vo/v99.json";

const words = vo.words as unknown as Word[];

const COLD: Sky = { top: "#4d6a86", mid: "#a9bac4", low: "#e6e3d4", sun: [790, 600], sunR: 46, sunCol: "#fbf7ea", glow: "#f1ecd8" };
const GREY: Sky = { top: "#5d6a78", mid: "#9aa4ac", low: "#cfd1cc", sun: [760, 640], sunR: 30, sunCol: "#f0f0ea", glow: "#dcdcd2" };
const LAMP = "255,200,140";

const JEN: Outfit = {
  ...JAKE,
  skin: "#D9A07C",
  skinShade: "#BB8261",
  hair: "#2a1d15",
  ponytail: "#2a1d15",
  beard: null,
  cap: "#2a1d15",
  capShade: "#1b120c",
  jacket: "#4f6f8f",
  jacketShade: "#3c566f",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  glove: null,
};
// Back from a hike: shell jacket and a cap.
const JEN_HIKE: Outfit = { ...JEN, jacket: "#C2662E", jacketShade: "#9B4E20", cap: "#2C6E63", capShade: "#1f5249" };

const PAPER = "#f7f2e8";
const INK = "#2C3B2E";
const MARK = "#3e7d4f";

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Wall calendar page with a month name and an optional note.
const WallCal: React.FC<{ x: number; y: number; w: number; month: string; note?: string; noteK?: number; cross?: number }> = ({ x, y, w, month, note, noteK = 1, cross = 0 }) => {
  const h = w * 1.2;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={8} y={12} width={w} height={h} rx={10} fill="rgba(0,0,0,0.2)" />
      <rect x={0} y={0} width={w} height={h} rx={10} fill={PAPER} />
      <rect x={0} y={0} width={w} height={w * 0.24} rx={10} fill={INK} />
      <text x={w / 2} y={w * 0.17} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={w * 0.14} fill="#ffffff" letterSpacing={3}>
        {month}
      </text>
      {Array.from({ length: 35 }, (_, i) => (
        <rect key={i} x={w * 0.06 + (i % 7) * w * 0.128} y={w * 0.3 + Math.floor(i / 7) * w * 0.15} width={w * 0.11} height={w * 0.12} rx={3} fill="#ebe4d6" />
      ))}
      {note && (
        <text x={w / 2} y={w * 0.72} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={w * 0.17} fill="#B83A55" opacity={noteK} transform={`rotate(-6 ${w / 2} ${w * 0.7})`}>
          {note}
        </text>
      )}
      {cross > 0 && <path d={`M${w * 0.15},${w * 0.8} L${w * 0.15 + w * 0.7 * cross},${w * 0.55}`} stroke="#5b625c" strokeWidth={w * 0.03} strokeLinecap="round" />}
    </g>
  );
};

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// The printed year page: 12 month boxes (trail picked, long weekend dots) and the 52-box Hike-a-Week grid.
const YearPage: React.FC<{ x: number; y: number; w: number; months: number; weekends: number; filled: number; t: number }> = ({ x, y, w, months, weekends, filled }) => {
  const h = w * 1.29;
  const cw = (w - 80) / 4;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={12} y={18} width={w} height={h} rx={14} fill="rgba(0,0,0,0.25)" />
      <rect x={0} y={0} width={w} height={h} rx={14} fill={PAPER} />
      <text x={40} y={w * 0.1} fontFamily="Fraunces" fontWeight={700} fontSize={w * 0.07} fill={INK}>
        My Hiking Year
      </text>
      <line x1={40} y1={w * 0.13} x2={w - 40} y2={w * 0.13} stroke={INK} strokeWidth={3} />
      {MONTHS.map((m, i) => {
        const cx = 40 + (i % 4) * cw;
        const cy = w * 0.17 + Math.floor(i / 4) * w * 0.17;
        const k = Math.max(0, Math.min(1, months * 12 - i));
        const lw = Math.max(0, Math.min(1, weekends * 12 - i));
        return (
          <g key={m}>
            <rect x={cx + 4} y={cy} width={cw - 12} height={w * 0.15} rx={6} fill="#ebe4d6" />
            <text x={cx + 16} y={cy + w * 0.045} fontFamily="Barlow Condensed" fontWeight={800} fontSize={w * 0.04} fill={INK}>
              {m}
            </text>
            <rect x={cx + 16} y={cy + w * 0.07} width={(cw - 44) * k} height={w * 0.022} rx={4} fill="#2a3a8a" opacity={0.75} />
            <rect x={cx + 16} y={cy + w * 0.105} width={(cw - 70) * k} height={w * 0.016} rx={4} fill="#2a3a8a" opacity={0.45} />
            {(i % 3 !== 1) && <circle cx={cx + cw - 30} cy={cy + w * 0.035} r={w * 0.014 * lw} fill="#C2662E" />}
          </g>
        );
      })}
      <text x={40} y={w * 0.72} fontFamily="Barlow Condensed" fontWeight={800} fontSize={w * 0.045} fill={INK} letterSpacing={2}>
        HIKE-A-WEEK CHALLENGE
      </text>
      {Array.from({ length: 52 }, (_, i) => {
        const bx = 40 + (i % 13) * ((w - 80) / 13);
        const by = w * 0.76 + Math.floor(i / 13) * w * 0.07;
        const on = i < filled;
        return <rect key={i} x={bx + 2} y={by} width={(w - 80) / 13 - 8} height={w * 0.055} rx={4} fill={on ? MARK : "none"} stroke={INK} strokeWidth={2.5} />;
      })}
    </g>
  );
};

// ============ S1 HOOK MEDIUM: January, Jen at the window, "HIKE MORE" on the wall calendar (0 - 4.02) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.03, 1.1, t / 4.02), rot: hh.rot };
  const floorY = 1560;
  const p: HikerProps = { x: 640, y: floorY, scale: 2.4, walk: 0, lean: 0.02, poles: false, handOverride: [40, 30], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={560} y={560} w={420} h={460} sky={COLD} uid="a" />
        <Room floorY={floorY} win={[560, 560, 420, 460]} lamp={[200, 600]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <WallCal x={110} y={720} w={330} month="JANUARY" note="HIKE MORE" noteK={at(t, [1.4, 1.9], [0, 1])} />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...p} outfit={JEN} expression="happy" noPack flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={300} />
      </Plane>
      <Particles seed={991} n={16} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={560} warm={LAMP} cool="40,40,60" />
      <Title text={"She said\n'hike more'\nevery January."} t={t} t0={0} top={130} size={116} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: March, the boots go back into the closet (4.02 - 6.85) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.83), rot: hh.rot };
  const shut = at(t, [5.6, 6.5], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={6}>
        <Room floorY={1500} win={[-400, 200, 200, 200]} wall="#cdb894" />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* closet interior */}
          <rect x={160} y={300} width={760} height={1300} fill="#3a2c22" />
          <rect x={160} y={420} width={760} height={18} fill="#5a4535" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${300 + i * 200},440 l0,40 l-60,180 l120,0 l-60,-180`} stroke="#6b5240" strokeWidth={6} fill={["#5f6b75", "#7a4a3a", "#4f6f8f"][i]} />
          ))}
          <Boots x={280} y={1440} s={2.2} />
        </Svg>
        <Subject rimX={4}>
          {/* closet door swinging shut from the right */}
          <rect x={mix(920, 160, shut)} y={290} width={mix(40, 770, shut)} height={1320} fill="#e9e1d1" />
          <rect x={mix(920, 160, shut)} y={290} width={mix(40, 770, shut)} height={1320} fill="none" stroke="#cfc3ad" strokeWidth={10} />
          <circle cx={mix(940, 230, shut)} cy={960} r={16} fill="#b59a6a" />
        </Subject>
      </Plane>
      <Particles seed={992} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={700} sunY={500} warm={LAMP} vignette={0.6} />
      <Chip text="March" t={t} t0={4.1} x={60} y={200} big />
      <Chip text="Boots in the closet" t={t} t0={5.1} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Jen thinking it over (6.85 - 9.78) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.93), rot: hh.rot };
  const s = 4.4;
  const seat = 1560;
  const p: HikerProps = { x: 520, y: seat + 182 * s, scale: s, walk: 0, lean: 0.06, poles: false, handOverride: [40, 30], breathe: Math.sin(t * 2) * 1 };
  const g = hikerGeometry(p);
  const neck = [p.x + g.sh[0] * s, seat + g.sh[1] * s];
  const tilt = at(t, [7.6, 8.4], [0, -4]);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={8}>
        <WindowView x={480} y={240} w={620} h={700} sky={GREY} uid="c" snow={false} />
        <Room floorY={1900} win={[480, 240, 620, 700]} lamp={[150, 400]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,236,200,0.85)">
          <g transform={`rotate(${tilt} ${neck[0]} ${neck[1]})`}>
            <Person {...p} outfit={JEN} expression="neutral" noPack />
          </g>
        </Subject>
      </Plane>
      <Particles seed={993} n={12} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={400} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Chip text="The goal: fine" t={t} t0={6.95} x={60} y={200} icon="check" big />
      <Chip text="The plan: none" t={t} t0={8.2} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

const Fridge: React.FC = () => (
  <g>
    <rect x={60} y={120} width={760} height={1900} rx={40} fill="#eef1f2" />
    <rect x={60} y={120} width={760} height={1900} rx={40} fill="none" stroke="#cfd5d8" strokeWidth={8} />
    <rect x={740} y={420} width={30} height={520} rx={14} fill="#b8c0c4" />
  </g>
);

// ============ S4 MEDIUM: Jen puts the printed plan on the fridge (9.78 - 13.08) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.07, lt / 3.3), rot: hh.rot };
  const place = at(t, [10.9, 11.8], [0, 1], outExpo);
  const s = 3.6;
  const p: HikerProps = { x: 960, y: 1700 + 182 * s - 600, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [mix(60, 100, place), -40], breathe: 0 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={8}>
        <Room floorY={2000} win={[-300, 300, 200, 300]} lamp={[200, 400]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <Fridge />
        </Svg>
        <Subject rimX={3} col="rgba(255,236,200,0.6)">
          <g transform={`translate(${mix(260, 120, place)},${mix(720, 500, place)}) rotate(${mix(8, -1, place)})`}>
            <YearPage x={0} y={0} w={560} months={0} weekends={0} filled={0} t={t} />
            <circle cx={280} cy={14} r={30} fill="#B83A55" opacity={at(t, [11.7, 11.8], [0, 1])} />
          </g>
          <Person {...p} outfit={JEN} expression="happy" noPack flip />
        </Subject>
      </Plane>
      <Particles seed={994} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={700} sunY={500} warm={LAMP} vignette={0.5} />
      <Chip text="This year: a plan" t={t} t0={9.9} x={60} y={200} icon="check" big />
      <Chip text="On the fridge" t={t} t0={11.8} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the page fills in: trails per month, long weekends, the weekly boxes (13.08 - 18.33) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(0, -60, lt / 5.25), zoom: mix(1.0, 1.06, lt / 5.25), rot: hh.rot };
  const months = at(t, [14.3, 16.0], [0, 1]);
  const weekends = at(t, [16.0, 17.2], [0, 1]);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.5} blur={10}>
        <Room floorY={2400} win={[-300, 300, 200, 300]} lamp={[300, 600]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#eef1f2" />
        </Svg>
        <Subject rimX={3} col="rgba(255,236,200,0.5)">
          <g transform="rotate(-1 540 1100)">
            <YearPage x={160} y={580} w={760} months={months} weekends={weekends} filled={at(t, [13.2, 14.0], [0, 1]) > 0.5 ? 1 : 0} t={t} />
            <circle cx={540} cy={596} r={34} fill="#B83A55" />
          </g>
        </Subject>
      </Plane>
      <Particles seed={995} n={8} col="#ffe8c0" fall={6} />
      <Grade sunX={700} sunY={500} warm={LAMP} vignette={0.45} />
      <Chip text="One hike a week" t={t} t0={13.2} x={60} y={200} icon="check" big />
      <Chip text="A trail every month" t={t} t0={14.5} x={60} y={330} icon="check" big />
      <Chip text="Long weekends marked" t={t} t0={16.2} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// Marker in a hand.
const Marker: React.FC<{ x: number; y: number; skin: string }> = ({ x, y, skin }) => (
  <g transform={`translate(${x},${y}) rotate(-35)`}>
    <rect x={-14} y={-150} width={28} height={150} rx={10} fill={MARK} />
    <path d="M-14,0 L14,0 L4,30 L-4,30 Z" fill="#2a2a2a" />
    <ellipse cx={0} cy={-90} rx={60} ry={50} fill={skin} />
  </g>
);

// ============ S6 CLOSE-UP: back from a hike, coloring in the miles (18.33 - 21.13) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.8), rot: hh.rot };
  const fill = at(t, [18.6, 20.6], [0, 1]);
  const x0 = 170;
  const x1 = 910;
  const mx = mix(x0, x1, fill);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#eef1f2" />
          <rect x={90} y={360} width={900} height={1160} rx={14} fill={PAPER} />
          <text x={140} y={500} fontFamily="Fraunces" fontWeight={700} fontSize={70} fill={INK}>
            100 Miles
          </text>
          {/* mountain-path poster: segments colored in as she goes */}
          {Array.from({ length: 10 }, (_, i) => {
            const y = 640 + i * 82;
            const on = (i + 1) / 10 <= fill + 0.02;
            return (
              <g key={i}>
                <rect x={x0} y={y} width={x1 - x0} height={58} rx={10} fill={on ? MARK : "none"} stroke={INK} strokeWidth={4} />
                <text x={x1 + 14} y={y + 42} fontFamily="Barlow Condensed" fontWeight={700} fontSize={34} fill={INK}>
                  {(i + 1) * 10}
                </text>
              </g>
            );
          })}
        </Svg>
        <Subject rimX={3} col="rgba(255,236,200,0.6)">
          <Marker x={mx} y={640 + Math.min(9, Math.floor(fill * 10)) * 82 + 20} skin={JEN.skin} />
          {/* her orange sleeve from the right */}
          <path d={`M1300,1900 Q${mx + 300},1500 ${mx + 80},${640 + Math.min(9, Math.floor(fill * 10)) * 82 - 40}`} stroke={JEN_HIKE.jacket} strokeWidth={110} fill="none" strokeLinecap="round" />
        </Subject>
      </Plane>
      <Grade sunX={700} sunY={500} warm={LAMP} vignette={0.45} />
      <Chip text="After every hike" t={t} t0={18.4} t1={19.3} x={60} y={200} big />
      <Chip text="Color in the miles" t={t} t0={19.4} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF MEDIUM: December, Jen in her hiking gear by the full page on the fridge (21.13 - 23.67) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: at(lt, [0, 1.3], [1.12, 1.04], outExpo), rot: hh.rot };
  const s = 3.2;
  const p: HikerProps = { x: 900, y: 1960, scale: s, walk: 0, lean: 0.0, poles: false, handOverride: [80, 10], breathe: Math.sin(t * 2) * 1 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={6}>
        <WindowView x={860} y={260} w={360} h={500} sky={COLD} uid="g" />
        <Room floorY={2000} win={[860, 260, 360, 500]} lamp={[300, 500]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <Fridge />
        </Svg>
        <Subject rimX={3} col="rgba(255,236,200,0.6)">
          <g transform="translate(120,480) rotate(-1)">
            <YearPage x={0} y={0} w={560} months={1} weekends={1} filled={52} t={t} />
            <circle cx={280} cy={14} r={30} fill="#B83A55" />
          </g>
          <Person {...p} outfit={JEN_HIKE} expression="happy" flip />
        </Subject>
      </Plane>
      <Rays x={1000} y={400} strength={0.2} col="255,236,200" />
      <Particles seed={997} n={14} col="#ffe8c0" fall={6} />
      <Grade sunX={900} sunY={420} warm={LAMP} />
      <Readout label="DECEMBER" value="Page full" ok={true} t={t} t0={21.3} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/2027-hiking-year-planner.jpg"
      spec="28 PRINTABLE PAGES · INSTANT DOWNLOAD"
      name={
        <>
          2027 Hiking
          <br />
          Year Planner
        </>
      }
      nameSize={100}
      price="$5.99"
      save="Save this before you set next year's goals"
    />
  );
};

export const V99: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.07} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.02} to={6.9} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.02} />
    </Scene>
    <Scene from={6.85} to={9.83} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.85} />
    </Scene>
    <Scene from={9.78} to={13.13} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.78} />
    </Scene>
    <Scene from={13.08} to={18.38} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={13.08} />
    </Scene>
    <Scene from={18.33} to={21.18} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={18.33} />
    </Scene>
    <Scene from={21.13} to={23.6} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={21.13} />
    </Scene>
    <Scene from={23.45} to={28} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.02, 1560],
        [4.02, 6.85, 1560],
        [6.85, 9.78, 1560],
        [9.78, 13.08, 1560],
        [13.08, 18.33, 1560],
        [18.33, 21.13, 1560],
        [21.13, 23.45, 1560],
      ]}
    />
  </AbsoluteFill>
);
