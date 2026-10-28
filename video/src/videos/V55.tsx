// V55: "Same trail, different month" in the cinematic illustrated style of C01.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v55.json";

const words = vo.words as unknown as Word[];

const ICE: Sky = { top: "#4c6680", mid: "#a9b8c4", low: "#e2e5e4", sun: [790, 640], sunR: 40, sunCol: "#f6f6f0", glow: "#e6e9e8" };
const LATE: Sky = { top: "#45608e", mid: "#d79c86", low: "#ffd7a4", sun: [300, 900], sunR: 56, sunCol: "#fff2d0", glow: "#ffbf80" };
const SPRING: Sky = { top: "#3a74ac", mid: "#b8d6e8", low: "#f4f0d8", sun: [800, 620], sunR: 56, sunCol: "#fffbe8", glow: "#ffe9b0" };

const EMMA: Outfit = {
  ...JAKE,
  skin: "#EBC0A0",
  skinShade: "#CFA080",
  hair: "#2a1d16",
  beard: null,
  ponytail: "#2a1d16",
  cap: "#7A3E4E",
  capShade: "#5e2f3c",
  jacket: "#3F6F8F",
  jacketShade: "#305770",
  pants: "#3a3d42",
  pantsShade: "#2a2c30",
  pack: "#C9A23E",
  packShade: "#a5832c",
};
const EMMA_SPRING: Outfit = { ...EMMA, jacket: "#5E9A6A", jacketShade: "#4a7d55" };
const SNOW = "#ffffff";

const mixCol = (a: string, b: string, k: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return "#" + pa.map((v, i) => Math.round(mix(v, pb[i], k)).toString(16).padStart(2, "0")).join("");
};

// ---------- scenery ----------
// bare = November (dark firs, leafless grey crowns), else spring green.
const Woods: React.FC<{ y: number; shift: number; bare?: boolean }> = ({ y, shift, bare }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = 440 + (i % 3) * 70;
      if (i % 3 === 1) return <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c={bare ? "#3f5a52" : "#3b6550"} c2={bare ? "#2f4640" : "#2b4d3c"} />;
      return bare ? (
        <g key={i}>
          <path d={`M${x - 10},${y + 20} L${x - 5},${y - h * 0.7} L${x + 5},${y - h * 0.7} L${x + 10},${y + 20} Z`} fill="#5c5650" />
          {[0, 1, 2, 3].map((j) => (
            <path key={j} d={`M${x},${y - h * (0.3 + j * 0.12)} l${(j % 2 ? 1 : -1) * h * 0.2},${-h * 0.14}`} stroke="#5c5650" strokeWidth={7} strokeLinecap="round" />
          ))}
          <circle cx={x} cy={y - h * 0.68} r={h * 0.25} fill="#8c8780" opacity={0.35} />
        </g>
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={["#6aa35a", "#4e8a4a", "#8bbf62"][i % 3]} c2={["#4e8040", "#3a6b38", "#6a9a48"][i % 3]} />
      );
    })}
  </Svg>
);

// Stone steps up the trail. ice = 0..1 glaze.
const Steps: React.FC<{ y: number; shift: number; ice: number }> = ({ y, shift, ice }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={1000} fill={mixCol("#6f8a4c", "#9aa3a2", ice)} />
    {Array.from({ length: 6 }, (_, i) => {
      const x = ((((i * 330 - shift) % 1980) + 1980) % 1980) - 400;
      const yy = y + 10 + (i % 2) * 14;
      return (
        <g key={i}>
          <rect x={x} y={yy} width={280} height={70} rx={14} fill="#8b857a" />
          <rect x={x} y={yy + 50} width={280} height={20} rx={8} fill="#6c665c" />
          <rect x={x + 8} y={yy - 4} width={264} height={22} rx={10} fill="#e4f2f6" opacity={ice * 0.95} />
          <path d={`M${x + 40},${yy + 6} l60,-4 M${x + 150},${yy + 10} l70,-3`} stroke="#ffffff" strokeWidth={5} strokeLinecap="round" opacity={ice} />
        </g>
      );
    })}
    {Array.from({ length: 14 }, (_, i) => {
      const x = ((((i * 149 - shift) % 2040) + 2040) % 2040) - 400;
      return <ellipse key={i} cx={x} cy={y + 190 + ((i * 59) % 300)} rx={22} ry={8} fill={ice > 0.5 ? "#eef4f6" : "#5d7a40"} opacity={0.75} />;
    })}
  </Svg>
);

// Waterfall over a rock ledge. flow 1 = full, 0.3 = half dry. ice adds icicles.
const Falls: React.FC<{ x: number; y: number; t: number; flow: number; ice: number }> = ({ x, y, t, flow, ice }) => {
  const w = 160 * flow;
  return (
    <Svg>
      <path d={`M${x - 280},${y} L${x - 210},${y - 560} L${x + 210},${y - 580} L${x + 280},${y} Z`} fill="#6e6a60" />
      <path d={`M${x - 210},${y - 560} L${x + 210},${y - 580} L${x + 200},${y - 540} L${x - 200},${y - 524} Z`} fill={ice > 0.5 ? "#eef3f4" : "#5e7a46"} />
      <rect x={x - w / 2} y={y - 560} width={w} height={560} fill="#cfe6ee" />
      {Array.from({ length: Math.max(2, Math.round(8 * flow)) }, (_, i) => (
        <rect key={i} x={x - w / 2 + 8 + i * 18} y={y - 560 + ((t * 420 + i * 97) % 560)} width={6} height={90} fill="#ffffff" opacity={0.7} />
      ))}
      {ice > 0 &&
        Array.from({ length: 11 }, (_, i) => {
          const ix = x - 190 + i * 38;
          if (Math.abs(ix - x) < w / 2 + 6) return null;
          const L = 60 + ((i * 53) % 110);
          return <path key={i} d={`M${ix - 9},${y - 548} L${ix + 9},${y - 550} L${ix},${y - 548 + L} Z`} fill="#e9f5f8" opacity={ice} />;
        })}
      <ellipse cx={x} cy={y + 10} rx={160 + 100 * flow} ry={36} fill={ice > 0.5 ? "#dfeef2" : "#e8f4f6"} opacity={0.85} />
    </Svg>
  );
};

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; bare?: boolean }> = ({ cam, sky, uid, treeY, blur = 0, t, bare }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={15} drift={t * 10} opacity={bare ? 0.5 : 0.35} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={93} base={treeY - 280} amp={340} scale={260} col={bare ? "#9aa6b2" : "#93a3b8"} lit={bare ? "#f0f3f5" : undefined} peak={bare ? 120 : 0} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.6} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={97} base={treeY - 120} amp={230} scale={190} col={bare ? "#6d7c80" : "#6f8577"} />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.4} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} bare={bare} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Breath puffs in the cold.
const Breath: React.FC<{ p: HikerProps; t: number }> = ({ p, t }) => {
  const g = hikerGeometry(p);
  const head = g.head;
  const k = (t * 0.8) % 1;
  return (
    <g transform={hikerTransform(p)}>
      <circle cx={head[0] + 34 + k * 40} cy={head[1] + 8 - k * 16} r={8 + k * 18} fill="#ffffff" opacity={0.5 * (1 - k)} />
    </g>
  );
};

// Small notebook + pen in the near hand.
const HandBook: React.FC<{ p: HikerProps; write?: number }> = ({ p, write = 0 }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] - 10},${h[1] - 46}) rotate(-6)`}>
        <rect x={0} y={0} width={46} height={58} rx={4} fill="#2C3B2E" />
        <rect x={4} y={3} width={38} height={52} rx={2} fill="#f6efe2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={8} y={10 + i * 9} width={(i + 1) * 6 < write * 40 ? 28 - (i % 2) * 8 : 0} height={2.6} rx={1} fill="#5a6a5e" />
        ))}
      </g>
    </g>
  );
};

// Open trail log page, filled in line by line.
const Page: React.FC<{ t: number; rows: [string, number][] }> = ({ t, rows }) => (
  <Svg>
    <g transform="translate(540,1010) rotate(-3)">
      <rect x={-420} y={-470} width={840} height={900} rx={24} fill="#2C3B2E" />
      <rect x={-396} y={-446} width={792} height={852} rx={12} fill="#f6efe2" />
      <rect x={-396} y={-446} width={792} height={90} rx={12} fill="#e6dccb" />
      <text x={-350} y={-386} fontFamily={HEAD} fontWeight={800} fontSize={48} fill="#2C3B2E" letterSpacing={3}>TRAIL LOG</text>
      {rows.map(([label, t0], i) => {
        const y = -260 + i * 150;
        const k = at(t, [t0, t0 + 0.45], [0, 1]);
        return (
          <g key={i}>
            <text x={-350} y={y} fontFamily={HEAD} fontWeight={700} fontSize={52} fill="#2C3B2E" opacity={0.35 + 0.65 * Math.min(1, k * 3)}>{label}</text>
            <line x1={-350} y1={y + 28} x2={350} y2={y + 28} stroke="#c9bfae" strokeWidth={3} />
            <path
              d={`M20,${y - 8} q25,-24 50,0 t50,0 t50,0 t50,0 t50,0 t50,0`}
              stroke="#3a5a8a"
              strokeWidth={7}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={380}
              strokeDashoffset={380 * (1 - k)}
            />
          </g>
        );
      })}
    </g>
  </Svg>
);

// Card: twelve months from her own notes, the best one gets circled.
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const MonthCard: React.FC<{ t: number; t0: number; ringAt: number }> = ({ t, t0, ringAt }) => {
  if (isClean()) return null;
  const ring = at(t, [ringAt, ringAt + 0.5], [0, 1]);
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 320,
        height: 760,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
        opacity: at(t, [t0, t0 + 0.2], [0, 1]),
      }}
    >
      <div style={{ position: "absolute", top: 40, left: 0, right: 0, textAlign: "center", fontFamily: HEAD, fontWeight: 800, fontSize: 66, letterSpacing: 2, color: "#2a2a26" }}>
        WATERFALL TRAIL
      </div>
      <svg width={920} height={760} viewBox="0 0 920 760" style={{ position: "absolute", top: 0, left: 0 }}>
        {MONTHS.map((m, i) => {
          const cx = 140 + (i % 4) * 213;
          const cy = 220 + Math.floor(i / 4) * 170;
          const best = i === 4;
          const bad = i === 10;
          return (
            <g key={m}>
              <rect x={cx - 90} y={cy - 60} width={180} height={120} rx={18} fill={best && ring > 0 ? "#e3f1e7" : bad ? "#f7e3e1" : "#f1ede4"} />
              <text x={cx} y={cy + 20} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={58} fill={best && ring > 0 ? "#3E8E5A" : bad ? "#D9443A" : "#5d594f"}>
                {m}
              </text>
              {best && ring > 0 && (
                <path
                  d={`M${cx + 104},${cy} A104,74 0 1 1 ${cx + 104 * Math.cos(Math.PI * 2 * ring - 0.01)},${cy + 74 * Math.sin(Math.PI * 2 * ring - 0.01)}`}
                  stroke="#3E8E5A"
                  strokeWidth={10}
                  fill="none"
                  strokeLinecap="round"
                />
              )}
            </g>
          );
        })}
      </svg>
      <div style={{ position: "absolute", bottom: 40, left: 60, right: 60, display: "flex", justifyContent: "space-between", fontFamily: HEAD, fontWeight: 700, fontSize: 46, letterSpacing: 1 }}>
        <span style={{ color: "#3E8E5A", opacity: ring }}>MAY: FALLS FULL</span>
        <span style={{ color: "#D9443A" }}>NOV: ICY STEPS</span>
      </div>
    </div>
  );
};

// ============ S1 HOOK: wide, icy steps below a half-dry waterfall (0 - 3.45) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: t * 14 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 3.45), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 330, y: g + 40, scale: 1.9, walk: 0, lean: 0.04, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.6) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={ICE} uid="a" treeY={g - 60} blur={1.5} t={t} bare />
      <Plane cam={cam} depth={0.7} blur={1.2}>
        <Falls x={780} y={g - 30} t={t} flow={0.3} ice={1} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Steps y={g} shift={cam.x} ice={1} />
        <Subject col="rgba(235,240,255,0.8)">
          <Person {...p} outfit={EMMA} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#232c2a" side="left" />
      </Plane>
      <Particles seed={551} n={26} col={SNOW} fall={50} />
      <Grade sunX={790} sunY={640} cool="150,180,220" />
      <Title text={"She went back to\nher favorite trail.\nIt was ice."} t={t} t0={0} top={130} size={100} />
      <Chip text="Loved it last spring" t={t} t0={0.77} x={80} y={490} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: November, icy steps, falls half dry (3.45 - 7.65) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 18 + hh.x, y: hh.y, zoom: mix(1.04, 1.11, lt / 4.2), rot: hh.rot };
  const g = 1460;
  const slip = at(t, [5.5, 5.75, 6.1], [0, 1, 0]);
  const p: HikerProps = { x: 470, y: g + 40, scale: 2.3, walk: 0, lean: 0.06 - slip * 0.12, poles: false, handOverride: [60 + slip * 30, -30 - slip * 40], breathe: Math.sin(t * 2.6) * 2 };
  const sh = handheld(t, 0.5, slip * 0.6);
  const c2: Cam = { ...cam, x: cam.x + sh.x - hh.x, y: cam.y + sh.y - hh.y };
  return (
    <AbsoluteFill>
      <Backdrop cam={c2} sky={ICE} uid="b" treeY={g - 80} blur={3} t={t} bare />
      <Plane cam={c2} depth={0.7} blur={3}>
        <Falls x={820} y={g - 50} t={t} flow={0.3} ice={1} />
      </Plane>
      <Plane cam={c2} depth={1}>
        <Steps y={g} shift={c2.x} ice={1} />
        <Subject col="rgba(235,240,255,0.8)">
          <Person {...p} outfit={EMMA} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={552} n={22} col={SNOW} fall={50} />
      <Grade sunX={790} sunY={640} vignette={0.55} cool="150,180,220" />
      <Chip text="November" t={t} t0={4.42} x={80} y={240} icon="none" big />
      <Chip text="Icy steps" t={t} t0={5.47} x={80} y={370} icon="x" big />
      <Chip text="Falls half dry" t={t} t0={6.72} x={80} y={500} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: she'd forgotten what it was like, and when (7.65 - 10.35) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 2.7), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 2330, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.6) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={ICE} uid="c" treeY={1250} blur={10} t={t} bare />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(235,240,255,0.8)">
          <Person {...p} outfit={EMMA} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={553} n={18} col={SNOW} fall={40} />
      <Grade sunX={790} sunY={640} vignette={0.62} cool="150,180,220" />
      <Readout label="NOTES FROM LAST TIME" value="NONE" ok={false} t={t} t0={8.0} x={80} y={240} pulseAt={9.4} />
      <Chip text="Which month was it good?" t={t} t0={9.37} x={80} y={500} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: the fix, after every hike (10.35 - 12.7) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: at(lt, [0, 1.4], [-40, 0]) + hh.y, zoom: mix(1.1, 1.04, lt / 2.35), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 420, y: g + 40, scale: 2.3, walk: 0, lean: 0.1, poles: false, handOverride: [52, -36], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LATE} uid="d" treeY={g - 80} blur={2.5} t={t} bare />
      <Plane cam={cam} depth={1}>
        <Steps y={g} shift={cam.x} ice={0.3} />
        <Subject col="rgba(255,206,150,0.85)">
          <Person {...p} outfit={EMMA} expression="happy" />
          <HandBook p={p} write={at(t, [11.4, 12.6], [0, 1])} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2218" side="right" />
      </Plane>
      <Rays x={LATE.sun[0]} y={LATE.sun[1]} strength={0.24} col="255,210,160" />
      <Particles seed={554} n={16} col="#ffe7c8" />
      <Grade sunX={300} sunY={900} warm="255,190,130" />
      <Title text={"After every\nhike."} t={t} t0={11.44} top={200} size={140} />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: date, weather, trail conditions, not just the name (12.65 - 17.15) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 4.5), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={LATE} uid="e" treeY={1250} blur={12} t={t} bare />
      <Plane cam={cam} depth={1}>
        <Page
          t={t}
          rows={[
            ["DATE", 13.5],
            ["WEATHER", 14.05],
            ["CONDITIONS", 14.86],
            ["TRAIL NAME", 16.5],
          ]}
        />
      </Plane>
      <Particles seed={555} n={12} col="#ffe7c8" />
      <Grade sunX={300} sunY={900} warm="255,190,130" vignette={0.55} />
      <Chip text="Not just the name" t={t} t0={15.92} x={80} y={230} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3c CARD: next time you'll know the best month (17.1 - 19.8) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.7), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SPRING} uid="f" treeY={1300} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <MonthCard t={t} t0={17.2} ringAt={18.37} />
      </Plane>
      <Grade sunX={800} sunY={620} vignette={0.55} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: spring, full falls, plans from her own notes (19.75 - 22.7) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 24 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.04]), rot: hh.rot };
  const g = 1460;
  const ph = t * 5;
  const p: HikerProps = { x: 300 + lt * 40, y: g + 40, scale: 2.3, phase: ph, walk: 0.5, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SPRING} uid="g" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={0.7} blur={1.2}>
        <Falls x={820} y={g - 30} t={t} flow={1} ice={0} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Steps y={g} shift={cam.x} ice={0} />
        <Subject rimX={-5} col="rgba(255,226,170,0.85)">
          <Person {...p} outfit={EMMA_SPRING} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f2e1c" side="left" />
      </Plane>
      <Rays x={SPRING.sun[0]} y={SPRING.sun[1]} strength={0.3} />
      <Particles seed={556} n={20} col="#fff2d0" bokeh />
      <Grade sunX={800} sunY={620} />
      <Title text={"Planned from\nher own notes."} t={t} t0={off + 0.1} top={160} size={124} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-journal-trail-log-printable-card.jpg"
      photoH={760}
      spec="DIGITAL DOWNLOAD · PRINTABLE"
      name={
        <>
          Hiking Journal
          <br />& Trail Log
        </>
      }
      nameSize={96}
      price="$7.99"
      save="Save this before your next hike"
    />
  );
};

export const V55: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.5} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.45} to={7.7} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={3.45} />
    </Scene>
    <Scene from={7.65} to={10.4} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={7.65} />
    </Scene>
    <Scene from={10.35} to={12.7} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={10.35} />
    </Scene>
    <Scene from={12.65} to={17.15} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={12.65} />
    </Scene>
    <Scene from={17.1} to={19.8} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={17.1} />
    </Scene>
    <Scene from={19.75} to={22.7} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={19.75} />
    </Scene>
    <Scene from={22.55} to={27.5} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.45, 1560],
        [3.45, 7.65, 1560],
        [7.65, 10.35, 1560],
        [10.35, 12.65, 1560],
        [12.65, 17.1, 1560],
        [17.1, 19.75, 1560],
        [19.75, 22.55, 1560],
      ]}
    />
  </AbsoluteFill>
);
