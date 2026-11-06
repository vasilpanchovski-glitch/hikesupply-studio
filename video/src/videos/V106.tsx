// V106: "She booked a July campsite in December." in the cinematic C01 style. Story for the Camping Trip Planner & Checklists (p12),
// posted Dec 2. Facts from the product (products/p12): booking your site (popular campgrounds fill early, check when booking opens),
// meal planner, packing the car, kids and family add-on. Advice kept general: many popular campgrounds open bookings months ahead.
// $5.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { Room, WindowView } from "../home";
import { Desk, PAPER, INK } from "../trip";
import vo from "../vo/v106.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#1d2a44", mid: "#3e4e6c", low: "#6f7d92", sun: [800, 560], sunR: 26, sunCol: "#f4f1e6", glow: "#a8b2c4" };
const SUMMER: Sky = { top: "#3f74a8", mid: "#b6cfe2", low: "#f3e6c6", sun: [820, 600], sunR: 54, sunCol: "#fffbe8", glow: "#ffe2a6" };
const EVENING: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 820], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };
const LAMP = "255,200,140";
const PEN = "#2a3a8a";

const JESS: Outfit = {
  ...JAKE,
  skin: "#E8B898",
  skinShade: "#CA9878",
  hair: "#a0662e",
  ponytail: "#a0662e",
  beard: null,
  cap: "#a0662e",
  capShade: "#7f4f22",
  jacket: "#B83A55",
  jacketShade: "#8E2B42",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  glove: null,
};
const JESS_SUMMER: Outfit = { ...JESS, jacket: "#2F7F86", jacketShade: "#256870", cap: "#C9A23E", capShade: "#a5832c" };
const KID: Outfit = { ...JAKE, skin: "#E8B898", skinShade: "#CA9878", hair: "#a0662e", beard: null, cap: "#C2662E", capShade: "#9a4f22", jacket: "#C9A23E", jacketShade: "#a5832c", glove: null };

// ---------- scenery ----------
const Lake: React.FC<{ y: number; t: number; col?: [string, string] }> = ({ y, t, col = ["#5f8fb0", "#86b2cc"] }) => (
  <Svg>
    <rect x={-400} y={y} width={1880} height={240} fill={col[0]} />
    <rect x={-400} y={y} width={1880} height={30} fill={col[1]} opacity={0.8} />
    {Array.from({ length: 12 }, (_, i) => {
      const x = ((((i * 190 + t * 20) % 1900) + 1900) % 1900) - 400;
      return <rect key={i} x={x} y={y + 40 + (i % 4) * 46} width={90 + (i % 3) * 40} height={5} rx={3} fill="#e8f3f8" opacity={0.55} />;
    })}
  </Svg>
);

const Shore: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <path d={`M-400,${y} Q540,${y - 40} 1480,${y} L1480,2600 L-400,2600 Z`} fill="#7c8a4a" />
    <path d={`M-400,${y + 220} Q540,${y + 190} 1480,${y + 220} L1480,2600 L-400,2600 Z`} fill="#6a7840" />
    {Array.from({ length: 24 }, (_, i) => {
      const x = ((((i * 87 - shift) % 2100) + 2100) % 2100) - 400;
      const yy = y + 40 + ((i * 59) % 340);
      return <path key={i} d={`M${x},${yy} q6,-30 12,-56 M${x + 10},${yy} q-4,-26 -10,-44`} stroke={i % 2 ? "#8c9a52" : "#a39a4a"} strokeWidth={5} fill="none" strokeLinecap="round" />;
    })}
  </Svg>
);

const Tent: React.FC<{ x: number; y: number; s?: number; col?: string; shade?: string; glow?: number }> = ({ x, y, s = 1, col = "#C2662E", shade = "#9B4E20", glow = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={170} ry={16} fill="rgba(0,0,0,0.25)" />
    <path d="M-160,0 L0,-170 L160,0 Z" fill={col} />
    <path d="M0,-170 L160,0 L60,0 Z" fill={shade} />
    <path d="M-40,0 L0,-120 L40,0 Z" fill={glow > 0 ? `rgba(255,214,140,${0.6 + glow * 0.4})` : "#3a2a1e"} />
    <line x1={0} y1={-170} x2={0} y2={-190} stroke="#3a2a1e" strokeWidth={6} />
  </g>
);

const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 12 }, (_, i) => {
      const x = ((((-160 + i * 150 - shift) % 1800) + 1800) % 1800) - 300;
      const h = 380 + (i % 3) * 90;
      return <Pine key={i} x={x} y={y + (i % 2) * 20} h={h} c="#30513f" c2="#243f31" />;
    })}
  </Svg>
);

const LakeBackdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; t: number; blur?: number }> = ({ cam, sky, uid, treeY, t, blur = 0 }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#fbf3e8" seed={uid.charCodeAt(0)} drift={t * 12} opacity={0.5} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2.6 + blur}>
      <Ridge seed={51} base={treeY - 270} amp={340} scale={250} col="#7d8aa0" lit="#f0dcc4" peak={120} />
    </Plane>
    <Haze y={treeY - 420} h={380} col={sky.low} opacity={0.62} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={57} base={treeY - 100} amp={200} scale={180} col="#56634f" />
    </Plane>
    <Plane cam={cam} depth={0.45} blur={1.2 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
    <Plane cam={cam} depth={0.5} blur={1 + blur}>
      <Lake y={treeY + 10} t={t} />
    </Plane>
  </>
);

// Phone with a campsite booking calendar where every summer weekend shows FULL (k = how many are marked).
const BookPhone: React.FC<{ x: number; y: number; s?: number; k: number; rot?: number }> = ({ x, y, s = 1, k, rot = 0 }) => {
  const W = 380;
  const H = 760;
  const rows = ["Sat Jul 11", "Sun Jul 12", "Sat Jul 18", "Sun Jul 19", "Sat Jul 25", "Sun Jul 26"];
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-W / 2 - 14} y={-H / 2 - 14} width={W + 28} height={H + 28} rx={56} fill="#17191c" />
      <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={44} fill="#f4f5f2" />
      <rect x={-W / 2} y={-H / 2} width={W} height={150} rx={44} fill="#3e5f4a" />
      <rect x={-W / 2} y={-H / 2 + 100} width={W} height={50} fill="#3e5f4a" />
      <text x={-W / 2 + 30} y={-H / 2 + 80} fontFamily="Inter" fontWeight={700} fontSize={28} fill="#f7f2e8">
        Lakeside Loop
      </text>
      <text x={-W / 2 + 30} y={-H / 2 + 120} fontFamily="Inter" fontWeight={600} fontSize={20} fill="rgba(247,242,232,0.8)">
        Campsite availability
      </text>
      {rows.map((r, i) => {
        const yy = -H / 2 + 200 + i * 90;
        const on = k * rows.length > i;
        return (
          <g key={r}>
            <text x={-W / 2 + 30} y={yy + 40} fontFamily="Inter" fontWeight={600} fontSize={26} fill="#3a3d42">
              {r}
            </text>
            <rect x={W / 2 - 140} y={yy + 6} width={110} height={50} rx={12} fill={on ? "#D9443A" : "#d8dcd6"} />
            <text x={W / 2 - 85} y={yy + 41} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={30} fill="#ffffff" letterSpacing={2}>
              {on ? "FULL" : ""}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// A planner sheet with a title and tick rows (k = how many ticked).
const Sheet: React.FC<{ x: number; y: number; w: number; rot?: number; title: string; rows: string[]; k: number; hi?: number }> = ({ x, y, w, rot = 0, title, rows, k, hi = 0 }) => {
  const h = w * 1.3;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot} ${w / 2} ${h / 2})`}>
      <rect x={12} y={18} width={w} height={h} rx={14} fill="rgba(0,0,0,0.28)" />
      <rect x={0} y={0} width={w} height={h} rx={14} fill={PAPER} />
      {hi > 0 && <rect x={0} y={0} width={w} height={h} rx={14} fill="none" stroke="#f3d34a" strokeWidth={10 * hi} />}
      <rect x={0} y={0} width={w} height={w * 0.05} rx={14} fill="#3e5f4a" />
      <text x={w * 0.08} y={w * 0.17} fontFamily={HEAD} fontWeight={800} fontSize={w * 0.1} fill={INK} letterSpacing={1}>
        {title}
      </text>
      {rows.map((r, i) => {
        const yy = w * 0.3 + i * w * 0.14;
        const on = k * rows.length > i + 0.2;
        return (
          <g key={r}>
            <rect x={w * 0.08} y={yy - w * 0.05} width={w * 0.07} height={w * 0.07} rx={6} fill="none" stroke={INK} strokeWidth={4} />
            {on && <path d={`M${w * 0.09},${yy - w * 0.02} l${w * 0.02},${w * 0.025} l${w * 0.045},${w * -0.06}`} stroke={PEN} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
            <text x={w * 0.2} y={yy} fontFamily="Inter" fontWeight={600} fontSize={w * 0.055} fill="#3a3d42">
              {r}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// ============ S1 HOOK MEDIUM: December, snow at the window, Jess with the planner (0 - 2.6) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.03, 1.08, t / 2.6), rot: hh.rot };
  const floorY = 1560;
  const p: HikerProps = { x: 360, y: floorY + 40, scale: 2.4, walk: 0, lean: 0.06, poles: false, handOverride: [80, 0], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill style={{ background: "#120c08" }}>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={560} y={560} w={420} h={460} sky={NIGHT} uid="a" />
        <Room floorY={floorY - 140} win={[560, 560, 420, 460]} wall="#5a4c40" floor="#3a2c22" lamp={[200, 600]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...p} outfit={JESS} expression="happy" noPack />
        </Subject>
        <Desk y={floorY - 10} />
        <Svg>
          <g transform={`translate(560,${floorY - 30}) rotate(-4)`}>
            <rect x={0} y={-14} width={300} height={34} rx={6} fill={PAPER} />
            <rect x={30} y={-6} width={180} height={10} rx={4} fill="#3e5f4a" />
          </g>
          <circle cx={200} cy={1000} r={500} fill="#ffe2a8" opacity={0.1} />
        </Svg>
      </Plane>
      <Particles seed={1061} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={600} warm={LAMP} cool="40,40,70" vignette={0.55} />
      <Title text={"She booked\na July campsite\nin December."} t={t} t0={0} top={120} size={112} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: last summer, two weeks out, every weekend full (2.6 - 6.07) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.47), rot: hh.rot };
  const k = at(t, [4.4, 5.4], [0, 1]);
  return (
    <AbsoluteFill>
      <LakeBackdrop cam={cam} sky={SUMMER} uid="b" treeY={1150} t={t} blur={9} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,240,200,0.7)">
          <g>
            <ellipse cx={560} cy={1340} rx={250} ry={160} fill={JESS.skin} />
            <ellipse cx={420} cy={1200} rx={70} ry={110} fill={JESS.skin} transform="rotate(-20 420 1200)" />
            <rect x={300} y={1400} width={520} height={600} rx={120} fill={JESS_SUMMER.jacket} />
          </g>
          <BookPhone x={560} y={940} s={1.15} k={k} rot={-4} />
        </Subject>
      </Plane>
      <Particles seed={1062} n={12} col="#fff2d0" />
      <Grade sunX={820} sunY={600} vignette={0.55} />
      <Chip text="Last summer: 2 weeks out" t={t} t0={2.7} x={60} y={200} icon="none" big />
      <Chip text="Every weekend full" t={t} t0={4.45} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Jess's face, December, starting early (6.07 - 8.45) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.38), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 560, y: 1640 + 182 * s, scale: s, walk: 0, lean: 0.04, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 2) * 1 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={8}>
        <WindowView x={560} y={260} w={460} h={560} sky={NIGHT} uid="c" />
        <Room floorY={1500} win={[560, 260, 460, 560]} wall="#5a4c40" floor="#3a2c22" lamp={[120, 500]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,226,180,0.85)">
          <Person {...p} outfit={JESS} expression="happy" noPack flip />
        </Subject>
      </Plane>
      <Particles seed={1063} n={18} col="#ffffff" fall={30} />
      <Grade sunX={200} sunY={500} warm={LAMP} cool="40,40,70" vignette={0.6} />
      <Chip text="This December: start early" t={t} t0={6.1} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 WIDE: a busy lakeside campground in summer (8.45 - 14.03) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: mix(1.0, 1.08, lt / 5.58), rot: hh.rot };
  const g = 1420;
  return (
    <AbsoluteFill>
      <LakeBackdrop cam={cam} sky={SUMMER} uid="d" treeY={g - 300} t={t} />
      <Plane cam={cam} depth={1}>
        <Shore y={g} shift={cam.x} />
        <Svg>
          <Tent x={140} y={g + 80} s={1.1} />
          <Tent x={500} y={g + 40} s={0.9} col="#2F7F86" shade="#256870" />
          <Tent x={860} y={g + 90} s={1.15} col="#C9A23E" shade="#a5832c" />
          <Tent x={330} y={g + 300} s={1.4} col="#6d7f4a" shade="#566539" />
          <Tent x={780} y={g + 330} s={1.5} col="#B83A55" shade="#8E2B42" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="both" />
      </Plane>
      <Rays x={SUMMER.sun[0]} y={SUMMER.sun[1]} strength={0.26} />
      <Particles seed={1064} n={16} col="#fff2d0" />
      <Grade sunX={820} sunY={600} />
      <Readout label="MANY POPULAR CAMPGROUNDS OPEN BOOKINGS" value="Months ahead" ok={null} t={t} t0={8.8} x={60} y={200} />
      <Chip text="Summer weekends go fast" t={t} t0={11.95} x={60} y={440} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the booking page, park, opening date, reminder (14.03 - 18.44) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(-20, 20, lt / 4.41), zoom: mix(1.02, 1.07, lt / 4.41), rot: hh.rot };
  const rows: [string, string, number][] = [
    ["The park", "Lakeside State Park", 14.6],
    ["Booking opens", "Jan 10, 8:00 am", 15.6],
    ["Reminder", "Set on my phone", 17.05],
  ];
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <g transform="translate(110,420) rotate(-2 430 500)">
            <rect x={14} y={20} width={860} height={900} rx={18} fill="rgba(0,0,0,0.25)" />
            <rect x={0} y={0} width={860} height={900} rx={18} fill={PAPER} />
            <rect x={0} y={0} width={860} height={40} rx={18} fill="#3e5f4a" />
            <text x={56} y={150} fontFamily={HEAD} fontWeight={800} fontSize={84} fill={INK} letterSpacing={2}>
              BOOKING YOUR SITE
            </text>
            <line x1={56} y1={180} x2={804} y2={180} stroke={INK} strokeWidth={4} />
            {rows.map(([a, b, t0], i) => {
              const k = at(t, [t0, t0 + 0.4], [0, 1]);
              const yy = 300 + i * 200;
              return (
                <g key={a}>
                  <rect x={56} y={yy - 50} width={64} height={64} rx={12} fill="none" stroke={INK} strokeWidth={5} />
                  <path d={`M70,${yy - 18} l16,18 l28,-40`} stroke="#3e7d4f" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="80" strokeDashoffset={80 * (1 - k)} />
                  <text x={150} y={yy - 8} fontFamily="Inter" fontWeight={600} fontSize={40} fill="#5b625c">
                    {a}
                  </text>
                  <clipPath id={`bk${i}`}>
                    <rect x={150} y={yy} width={660 * k} height={80} />
                  </clipPath>
                  <text x={150} y={yy + 56} fontFamily="Barlow Condensed" fontWeight={700} fontSize={62} fill={PEN} clipPath={`url(#bk${i})`}>
                    {b}
                  </text>
                  <line x1={150} y1={yy + 72} x2={804} y2={yy + 72} stroke="#d8d0c0" strokeWidth={3} />
                </g>
              );
            })}
          </g>
        </Subject>
      </Plane>
      <Particles seed={1065} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="Picked the park" t={t} t0={14.9} x={60} y={170} icon="check" />
      <Chip text="Wrote down when booking opens" t={t} t0={15.6} x={60} y={280} icon="check" />
      <Chip text="Set a reminder" t={t} t0={17.05} x={60} y={1400} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the fun part, meals, car packing list, kids checklist (18.44 - 23.54) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + mix(-30, 30, lt / 5.1), y: hh.y, zoom: mix(1.0, 1.06, lt / 5.1), rot: hh.rot };
  const a = at(t, [19.34, 20.0], [0, 1]);
  const b = at(t, [20.56, 21.2], [0, 1]);
  const c = at(t, [21.75, 22.5], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.85)">
          <Sheet x={40} y={470} w={460} rot={-8} title="MEAL PLANNER" rows={["Fri dinner: tacos", "Sat breakfast", "Sat lunch", "Sat dinner", "S'mores"]} k={a} hi={a > 0 && b === 0 ? 1 : 0} />
          <Sheet x={570} y={430} w={460} rot={6} title="PACK THE CAR" rows={["Tent and poles", "Sleeping bags", "Cooler last in", "Camp stove", "Lantern"]} k={b} hi={b > 0 && c === 0 ? 1 : 0} />
          <Sheet x={310} y={880} w={440} rot={-2} title="KIDS ADD-ON" rows={["Extra socks", "Headlamp each", "Rain jackets", "Games"]} k={c} hi={c > 0 ? 1 : 0} />
        </Subject>
      </Plane>
      <Particles seed={1066} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.5} />
      <Chip text="Meals planned" t={t} t0={19.34} x={60} y={130} icon="check" />
      <Chip text="Car packing list" t={t} t0={20.56} x={60} y={230} icon="check" />
      <Chip text="Kids checklist" t={t} t0={21.75} x={60} y={330} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: July evening at the lakeside site, tent glowing (23.54 - 25.45) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 22, y: hh.y, zoom: at(lt, [0, 1.2], [1.14, 1.04], outExpo), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 300, y: g + 120, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [50, -20], breathe: Math.sin(t * 2) * 1.4 };
  const kid: HikerProps = { x: 470, y: g + 130, scale: 1.4, walk: 0, lean: 0, poles: false, handOverride: [30, -60] };
  return (
    <AbsoluteFill>
      <LakeBackdrop cam={cam} sky={EVENING} uid="g" treeY={g - 300} t={t} />
      <Plane cam={cam} depth={1}>
        <Shore y={g} shift={cam.x} />
        <Svg>
          <Tent x={800} y={g + 110} s={1.5} glow={1} />
          <circle cx={800} cy={g + 40} r={260} fill="#ffd690" opacity={0.12} />
        </Svg>
        <Subject rimX={6} col="rgba(255,214,160,0.9)">
          <Person {...p} outfit={JESS_SUMMER} expression="happy" noPack />
          <Person {...kid} outfit={KID} expression="happy" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="left" />
      </Plane>
      <Rays x={EVENING.sun[0]} y={EVENING.sun[1]} strength={0.32} col="255,214,160" />
      <Particles seed={1067} n={20} col="#ffe7b0" />
      <Grade sunX={760} sunY={820} warm="255,190,130" />
      <Chip text="One planner, one evening" t={t} t0={23.56} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/camping-trip-planner-checklists.jpg"
      photoH={720}
      spec="24 PAGES · PLANNER + CHECKLISTS"
      name={
        <>
          Camping Trip
          <br />
          Planner
        </>
      }
      nameSize={104}
      price="$5.99"
      save="Save this before summer weekends fill up"
    />
  );
};

export const V106: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.65} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.6} to={6.12} fadeIn={0.08} fadeOut={0.08}>
      <S2 off={2.6} />
    </Scene>
    <Scene from={6.07} to={8.5} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.07} />
    </Scene>
    <Scene from={8.45} to={14.08} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.45} />
    </Scene>
    <Scene from={14.03} to={18.49} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={14.03} />
    </Scene>
    <Scene from={18.44} to={23.59} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={18.44} />
    </Scene>
    <Scene from={23.54} to={25.5} fadeIn={0.12} fadeOut={0.1}>
      <S7 off={23.54} />
    </Scene>
    <Scene from={25.3} to={29} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.6, 1560],
        [2.6, 6.07, 1560],
        [6.07, 8.45, 1560],
        [8.45, 14.03, 1560],
        [14.03, 18.44, 1560],
        [18.44, 23.54, 1560],
        [23.54, 25.3, 1560],
      ]}
    />
  </AbsoluteFill>
);
