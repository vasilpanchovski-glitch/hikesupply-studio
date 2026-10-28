// V52B: v52 "Nothing to stamp at the visitor center" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v52b.json";

const words = vo.words as unknown as Word[];

const ZION: Sky = { top: "#3a6fa8", mid: "#b6d0e4", low: "#f6e6c8", sun: [820, 600], sunR: 54, sunCol: "#fffbe8", glow: "#ffe2a6" };
const GOLD: Sky = { top: "#4a6c98", mid: "#e9b487", low: "#ffdcaa", sun: [760, 760], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const BEN: Outfit = {
  ...JAKE,
  skin: "#C68E6A",
  skinShade: "#A87352",
  hair: "#2b211b",
  beard: "#2b211b",
  ponytail: null,
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#5a5046",
  pantsShade: "#463e36",
  pack: "#2F4F5F",
  packShade: "#223b47",
};
const LILY: Outfit = {
  ...GUIDE,
  skin: "#C68E6A",
  skinShade: "#A87352",
  hair: "#2b211b",
  ponytail: "#2b211b",
  beard: null,
  cap: "#E2B33C",
  capShade: "#C9962A",
  jacket: "#6A5A9A",
  jacketShade: "#54487c",
  pants: "#3a3d42",
  pantsShade: "#2a2c30",
  pack: "#3E8E5A",
  packShade: "#2f6e45",
};
const INK = "#5b3f8f";

// ---------- scenery ----------
const Buttes: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {[0, 1, 2, 3].map((i) => {
      const x = ((((-200 + i * 480 - shift) % 1920) + 1920) % 1920) - 400;
      const w = 300 + (i % 2) * 140;
      const h = 380 + (i % 3) * 90;
      return (
        <g key={i}>
          <path d={`M${x},${y} L${x + 40},${y - h} L${x + w - 40},${y - h} L${x + w},${y} Z`} fill="#b65e3a" />
          <path d={`M${x + w * 0.55},${y - h} L${x + w - 40},${y - h} L${x + w},${y} L${x + w * 0.6},${y} Z`} fill="#94472a" />
          <rect x={x + 40} y={y - h} width={w - 80} height={16} fill="#c97a52" />
          <rect x={x + 30} y={y - h * 0.55} width={w - 60} height={10} fill="#a5532f" opacity={0.7} />
        </g>
      );
    })}
    {Array.from({ length: 7 }, (_, i) => {
      const x = ((((i * 260 - shift * 1.3) % 1820) + 1820) % 1820) - 300;
      return <Pine key={i} x={x} y={y + 30 + (i % 2) * 16} h={180 + (i % 3) * 40} c="#5b7a4a" c2="#46613a" />;
    })}
  </Svg>
);

const Trail: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={1000} fill="#c49468" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 6} L1480,${y + 110} Q540,${y + 90} -400,${y + 110} Z`} fill="#e0c196" />
    {Array.from({ length: 14 }, (_, i) => {
      const x = ((((i * 149 - shift) % 2040) + 2040) % 2040) - 400;
      return <ellipse key={i} cx={x} cy={y + 170 + ((i * 59) % 260)} rx={18} ry={8} fill="#a07a52" opacity={0.7} />;
    })}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#ffffff" seed={21} drift={t * 10} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={71} base={treeY - 300} amp={300} scale={280} col="#c79b86" />
    </Plane>
    <Haze y={treeY - 430} h={360} col={sky.low} opacity={0.6} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={77} base={treeY - 140} amp={180} scale={200} col="#b17a5c" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.35} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Buttes y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

// Visitor center interior: warm wood wall with a big window onto the canyon, and a ranger desk.
const Interior: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,-400 H1480 V${y + 900} H-400 Z M60,360 H1020 V${y - 260} H60 Z`} fill="#8a6446" fillRule="evenodd" />
    {Array.from({ length: 16 }, (_, i) => (
      <rect key={i} x={-400 + i * 120} y={-400} width={6} height={y + 1300} fill="#6f4f36" opacity={0.5} />
    ))}
    <rect x={50} y={350} width={980} height={20} fill="#5d412c" />
    <rect x={50} y={y - 270} width={980} height={20} fill="#5d412c" />
    <rect x={530} y={360} width={20} height={y - 620} fill="#5d412c" />
    <rect x={-400} y={y - 40} width={1880} height={1000} fill="#6b5240" />
  </Svg>
);

// The counter with the stamp station. stamp: 0 up, 1 pressed. prints: how many impressions are visible.
const Desk: React.FC<{ y: number; stamp: number; book?: boolean; x0?: number; sx?: number }> = ({ y, stamp, book = true, x0 = -400, sx = 520 }) => (
  <Svg>
    <rect x={x0} y={y} width={1880} height={60} rx={8} fill="#a77a52" />
    <rect x={x0} y={y + 60} width={1880} height={900} fill="#7c573a" />
    <rect x={x0 + 20} y={y + 120} width={1840} height={10} fill="#6a4a30" />
    <rect x={sx + 120} y={y - 26} width={150} height={30} rx={6} fill="#2b2f33" />
    <rect x={sx + 130} y={y - 22} width={130} height={18} rx={4} fill={INK} />
    {book && (
      <g>
        <rect x={sx - 110} y={y - 14} width={200} height={16} rx={3} fill="#2E4A39" />
        <rect x={sx - 102} y={y - 18} width={184} height={8} rx={2} fill="#f3eee2" />
      </g>
    )}
    <g transform={`translate(${sx},${y - 30 - (1 - stamp) * 70})`}>
      <rect x={-20} y={-90} width={40} height={70} rx={16} fill="#8a5a36" />
      <rect x={-40} y={-24} width={80} height={20} rx={4} fill="#5d412c" />
      <rect x={-36} y={-6} width={72} height={8} rx={2} fill={INK} />
    </g>
  </Svg>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Round park cancellation stamp impression.
const StampMark: React.FC<{ x: number; y: number; r: number; k: number; rot?: number }> = ({ x, y, r, k, rot = -8 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot})`} opacity={k * 0.92}>
    <circle r={r} fill="none" stroke={INK} strokeWidth={r * 0.06} />
    <circle r={r * 0.8} fill="none" stroke={INK} strokeWidth={r * 0.025} />
    <text y={-r * 0.38} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={r * 0.26} fill={INK} letterSpacing={2}>ZION</text>
    <text y={-r * 0.1} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={r * 0.15} fill={INK} letterSpacing={1}>NATIONAL PARK</text>
    <rect x={-r * 0.62} y={r * 0.02} width={r * 1.24} height={r * 0.3} fill={INK} />
    <text y={r * 0.25} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={r * 0.22} fill="#f6efe2" letterSpacing={2}>OCT 12 2026</text>
  </g>
);

// Close-up: the stamp comes down on a page and leaves the park name and date.
const StampPress: React.FC<{ t: number; pressAt: number }> = ({ t, pressAt }) => {
  const down = at(t, [pressAt - 0.35, pressAt], [0, 1]) * at(t, [pressAt + 0.25, pressAt + 0.6], [1, 0]);
  const mark = at(t, [pressAt, pressAt + 0.05], [0, 1]);
  return (
    <Svg>
      <rect x={-200} y={-200} width={1480} height={2400} fill="#8a6446" />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M-200,${120 + i * 170} Q540,${90 + i * 170} 1280,${130 + i * 170}`} stroke="#77553b" strokeWidth={8} fill="none" opacity={0.6} />
      ))}
      <g transform="rotate(-3 540 1000)">
        <rect x={150} y={520} width={780} height={980} rx={10} fill="#fbf8f1" />
        <rect x={150} y={520} width={780} height={980} rx={10} fill="none" stroke="#d9d2c2" strokeWidth={4} />
        <rect x={230} y={600} width={620} height={480} rx={14} fill="none" stroke="#c9bfae" strokeWidth={5} strokeDasharray="18 12" />
        <StampMark x={540} y={840} r={190} k={mark} />
        {[1180, 1290, 1400].map((y) => (
          <line key={y} x1={230} y1={y} x2={850} y2={y} stroke="#d9d2c2" strokeWidth={4} />
        ))}
      </g>
      <g transform={`translate(540,${mix(-120, 760, down)})`}>
        <rect x={-60} y={-420} width={120} height={300} rx={50} fill="#8a5a36" />
        <rect x={-210} y={-130} width={420} height={90} rx={14} fill="#5d412c" />
        <rect x={-200} y={-44} width={400} height={30} rx={6} fill={INK} />
      </g>
    </Svg>
  );
};

// Close-up: the page with the stamp, trail and date written beside it.
const LogPage: React.FC<{ t: number; rows: [string, string, number][] }> = ({ t, rows }) => (
  <Svg>
    <rect x={-200} y={-200} width={1480} height={2400} fill="#8a6446" />
    {Array.from({ length: 12 }, (_, i) => (
      <path key={i} d={`M-200,${120 + i * 170} Q540,${90 + i * 170} 1280,${130 + i * 170}`} stroke="#77553b" strokeWidth={8} fill="none" opacity={0.6} />
    ))}
    <g transform="rotate(2 540 1000)">
      <rect x={130} y={500} width={820} height={1000} rx={10} fill="#fbf8f1" />
      <rect x={190} y={560} width={300} height={300} rx={14} fill="none" stroke="#c9bfae" strokeWidth={5} strokeDasharray="16 10" />
      <StampMark x={340} y={710} r={120} k={1} />
      {rows.map(([label, val, t0], i) => {
        const y = 960 + i * 150;
        const k = at(t, [t0, t0 + 0.6], [0, 1]);
        return (
          <g key={i}>
            <text x={200} y={y} fontFamily={HEAD} fontWeight={700} fontSize={50} fill="#2C3B2E">{label}</text>
            <line x1={200} y1={y + 24} x2={880} y2={y + 24} stroke="#d9d2c2" strokeWidth={4} />
            <text x={430} y={y} fontFamily={HEAD} fontWeight={600} fontSize={52} fill="#3a5a8a" opacity={Math.min(1, k * 1.5)} style={{ clipPath: `inset(0 ${(1 - k) * 100}% 0 0)` }}>
              {val}
            </text>
          </g>
        );
      })}
      <text x={560} y={640} fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#2C3B2E" letterSpacing={2}>ZION</text>
      <text x={560} y={696} fontFamily={HEAD} fontWeight={600} fontSize={34} fill="#7a7466">UTAH</text>
    </g>
  </Svg>
);

// ============ S1 HOOK: father and daughter finish their first Zion hike (0 - 3.2) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: t * 26 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 3.2), rot: hh.rot };
  const g = 1460;
  const ph = t * 5;
  const ben: HikerProps = { x: 360 + t * 30, y: g + 40, scale: 2.3, phase: ph, walk: 0.55, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.55) };
  const lily: HikerProps = { x: 620 + t * 30, y: g + 50, scale: 1.55, phase: ph + 1.4, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph + 1.4, 0.6) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={ZION} uid="a" treeY={g - 80} blur={1} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject rimX={-5} col="rgba(255,226,170,0.85)">
          <Person {...ben} outfit={BEN} expression="happy" />
          <Person {...lily} outfit={LILY} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2a1c" side="right" />
      </Plane>
      <Rays x={ZION.sun[0]} y={ZION.sun[1]} strength={0.28} />
      <Particles seed={521} n={18} col="#fff2d0" />
      <Grade sunX={820} sunY={600} />
      <Title text={"He walked past\nthe free park\nstamp"} t={t} t0={0} top={130} size={112} />
      <Chip text="First hike in Zion" t={t} t0={1.38} x={80} y={520} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: visitor center, people stamping books at the desk (3.2 - 6.6) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: lt * 14 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.4), rot: hh.rot };
  const g = 1500;
  const press = Math.max(0, Math.sin((t - 4.9) * 5));
  const visitor: HikerProps = { x: 330, y: g + 40, scale: 2.3, walk: 0, lean: 0.14, poles: false, handOverride: [74, -40 + press * 30], breathe: Math.sin(t * 2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={ZION} uid="b" treeY={1250} blur={5} t={t} />
      <Plane cam={cam} depth={0.85}>
        <Interior y={g} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,226,170,0.7)">
          <Person {...visitor} outfit={{ ...GUIDE, jacket: "#4E6B8A", jacketShade: "#3a536c" }} expression="happy" />
        </Subject>
        <Desk y={g - 380} stamp={press} sx={510} />
      </Plane>
      <Particles seed={522} n={12} col="#ffe7c8" />
      <Grade sunX={540} sunY={700} warm="255,205,150" vignette={0.55} />
      <Chip text="Visitor center" t={t} t0={3.6} x={80} y={240} icon="none" big />
      <Chip text="People stamping books" t={t} t0={5.06} x={80} y={370} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: Ben had nothing to stamp (6.55 - 9.55) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 3), rot: hh.rot };
  const p: HikerProps = { x: 460, y: 2330, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: [64, -40], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={ZION} uid="c" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={0.85} blur={8}>
        <Interior y={1500} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,226,170,0.7)">
          <Person {...p} outfit={BEN} expression="tired" />
        </Subject>
      </Plane>
      <Particles seed={523} n={10} col="#ffe7c8" />
      <Grade sunX={540} sunY={700} warm="255,205,150" vignette={0.62} />
      <Readout label="PAGE TO STAMP" value="NONE" ok={false} t={t} t0={7.01} x={80} y={240} pulseAt={7.72} />
      <Chip text="So they walked out" t={t} t0={8.24} x={80} y={500} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: the fix, most visitor centers keep a free stamp (9.5 - 12.4) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: -lt * 12 + hh.x, y: at(lt, [0, 1.2], [-40, 0]) + hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.04]), rot: hh.rot };
  const g = 1500;
  const ben: HikerProps = { x: 240, y: g + 40, scale: 2.3, walk: 0, lean: 0.06, poles: false, handOverride: [46, 20], breathe: Math.sin(t * 2.2) * 2 };
  const lily: HikerProps = { x: 470, y: g + 50, scale: 1.55, walk: 0, lean: 0.04, poles: false, handOverride: [50, -60], breathe: Math.sin(t * 2.6) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={ZION} uid="d" treeY={1250} blur={5} t={t} />
      <Plane cam={cam} depth={0.85}>
        <Interior y={g} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,226,170,0.7)">
          <Person {...ben} outfit={BEN} expression="happy" />
          <Person {...lily} outfit={LILY} expression="happy" />
        </Subject>
        <Desk y={g - 330} stamp={0} book={false} x0={660} sx={860} />
      </Plane>
      <Particles seed={524} n={12} col="#ffe7c8" />
      <Grade sunX={540} sunY={700} warm="255,205,150" vignette={0.5} />
      <Title text={"Most visitor centers\nhave a free stamp."} t={t} t0={10.72} top={200} size={100} />
    </AbsoluteFill>
  );
};

// ============ S3b PROP CLOSE-UP: ink stamp with the park's name and date (12.35 - 15.9) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const shake = at(t, [13.85, 13.9, 14.15], [0, 1, 0]);
  const sh = handheld(t, 0.3, shake * 0.5);
  const cam: Cam = { x: sh.x, y: sh.y, zoom: mix(1.0, 1.07, lt / 3.55), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#5a4030" }}>
      <Plane cam={cam} depth={1}>
        <StampPress t={t} pressAt={13.84} />
      </Plane>
      <Particles seed={525} n={10} col="#ffe7b8" />
      <Grade sunX={540} sunY={700} warm="255,215,170" vignette={0.6} />
      <Chip text="Free ink stamp" t={t} t0={13.34} x={80} y={150} icon="check" big />
      <Chip text="Park name" t={t} t0={14.5} x={80} y={280} icon="check" big />
      <Chip text="Date" t={t} t0={15.35} x={470} y={280} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3c PROP CLOSE-UP: bring a page, log the trail and date beside it (15.85 - 19.75) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.0, lt / 3.9), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#5a4030" }}>
      <Plane cam={cam} depth={1}>
        <LogPage
          t={t}
          rows={[
            ["TRAIL", "Riverside Walk", 17.5],
            ["DATE", "Oct 12", 18.2],
            ["WITH", "Lily", 18.8],
          ]}
        />
      </Plane>
      <Particles seed={526} n={10} col="#ffe7b8" />
      <Grade sunX={540} sunY={700} warm="255,215,170" vignette={0.6} />
      <Chip text="Bring a page" t={t} t0={15.94} x={80} y={150} icon="check" big />
      <Chip text="Log the trail + date" t={t} t0={17.2} x={80} y={280} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: every trip leaves a mark (19.7 - 22.6) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 22 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.04]), rot: hh.rot };
  const g = 1460;
  const ben: HikerProps = { x: 340, y: g + 40, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [40, 20], breathe: Math.sin(t * 2.2) * 2 };
  const lily: HikerProps = { x: 640, y: g + 50, scale: 1.55, walk: 0, lean: -0.04, poles: false, handOverride: [40, -200], breathe: Math.sin(t * 2.6) * 2 };
  const h = hikerGeometry(lily).arms[1].hand;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="e" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject rimX={-5} col="rgba(255,200,140,0.85)">
          <Person {...ben} outfit={BEN} expression="happy" />
          <Person {...lily} outfit={LILY} expression="happy" />
          <g transform={hikerTransform(lily)}>
            <g transform={`translate(${h[0] - 30},${h[1] - 70}) rotate(6)`}>
              <rect x={0} y={0} width={64} height={80} rx={4} fill="#fbf8f1" />
              <circle cx={32} cy={30} r={18} fill="none" stroke={INK} strokeWidth={3} />
              <rect x={10} y={58} width={44} height={4} fill="#9a9488" />
              <rect x={10} y={67} width={30} height={4} fill="#9a9488" />
            </g>
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2a1c" side="right" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.32} col="255,200,150" />
      <Particles seed={527} n={20} col="#ffe7b8" bokeh />
      <Grade sunX={760} sunY={760} warm="255,190,120" />
      <Title text={"Every trip\nleaves a mark."} t={t} t0={off + 0.1} top={170} size={130} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/national-parks-tracker-card.jpg"
      photoH={760}
      spec="STAMP BOX + VISIT LOG FOR ALL 63 PARKS"
      name={
        <>
          National Parks
          <br />
          Hiking Tracker
        </>
      }
      nameSize={88}
      price="$4.99"
      save="Save this before your next park visit"
    />
  );
};

export const V52B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.25} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.2} to={6.6} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={3.2} />
    </Scene>
    <Scene from={6.55} to={9.55} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={6.55} />
    </Scene>
    <Scene from={9.5} to={12.4} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={9.5} />
    </Scene>
    <Scene from={12.35} to={15.9} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={12.35} />
    </Scene>
    <Scene from={15.85} to={19.75} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={15.85} />
    </Scene>
    <Scene from={19.7} to={22.6} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={19.7} />
    </Scene>
    <Scene from={22.45} to={27.5} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.2, 1560],
        [3.2, 6.55, 1560],
        [6.55, 9.5, 1560],
        [9.5, 12.35, 1560],
        [12.35, 15.85, 1560],
        [15.85, 19.7, 1560],
        [19.7, 22.45, 1560],
      ]}
    />
  </AbsoluteFill>
);
