// V154: "The road trip cost twice her budget." in the cinematic C01 style, desert park road trip. Story for the
// National Parks Road Trip Planner ($7.99, live Shopify). Advice (simple, safe): before you book, cost out every day
// (miles and fuel, entrance or pass, a bed, food, one spare line for surprises); visiting several parks, compare an
// annual pass with single entry fees. No fee numbers on screen, no invented figures. End card = real Shopify cover (boxed card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { DESERT, DUSK, SHADE } from "../canyon";
import { UtahBackdrop } from "../trip";
import { PenTip } from "../peak";
import vo from "../vo/v154.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC<{ k?: number }> = ({ k = 0.55 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: `linear-gradient(180deg, rgba(20,16,14,0) 0%, rgba(20,16,14,${k}) 45%, rgba(20,16,14,${k}) 70%, rgba(20,16,14,0) 100%)` }} />
);

const RAINSKY = { top: "#4c5866", mid: "#8d96a0", low: "#c9c4bc", sun: [820, 480] as [number, number], sunR: 30, sunCol: "#eeeeea", glow: "#d8d4cc" };

const NORA: Outfit = {
  ...JAKE,
  skin: "#E2B08C",
  skinShade: "#C48F6C",
  hair: "#6b3e22",
  ponytail: "#6b3e22",
  beard: null,
  cap: "#3a6b5c",
  capShade: "#2c5447",
  jacket: "#c4553a",
  jacketShade: "#9f432c",
  pants: "#4a4f57",
  pantsShade: "#363a40",
  pack: "#3E4F5C",
  packShade: "#2C3943",
  glove: null,
};

const CAR = "#5f8aa0";
const CAR2 = "#4a6f82";

// Two-lane desert road, flat. Dashes scroll with `roll`.
const Road: React.FC<{ g: number; roll?: number }> = ({ g, roll = 0 }) => (
  <Svg>
    <path d={`M-300,${g - 70} L1400,${g - 70} L1400,2400 L-300,2400 Z`} fill="#c58a5c" />
    <path d={`M-300,${g - 60} L1400,${g - 60} L1400,${g + 90} L-300,${g + 90} Z`} fill="#4b4a4c" />
    <path d={`M-300,${g - 60} L1400,${g - 60}`} stroke="#e9e1cf" strokeWidth={6} />
    {Array.from({ length: 12 }, (_, i) => {
      const x = ((((i * 200 - roll) % 2400) + 2400) % 2400) - 600;
      return <rect key={i} x={x} y={g + 8} width={110} height={12} rx={4} fill="#f2c94c" />;
    })}
    <path d={`M-300,${g + 90} L1400,${g + 90} L1400,2400 L-300,2400 Z`} fill="#a86c44" />
    {Array.from({ length: 14 }, (_, i) => {
      const x = -260 + i * 110;
      const yy = g + 160 + ((i * 71) % 260);
      return <ellipse key={i} cx={x} cy={yy} rx={18 + (i % 3) * 8} ry={7} fill="#8f5a38" opacity={0.7} />;
    })}
  </Svg>
);

// Desert scrub in the foreground (blurred plane).
const Scrub: React.FC<{ side: "left" | "right" }> = ({ side }) => (
  <Svg>
    <g transform={side === "left" ? "translate(-60,1820)" : "translate(1140,1820) scale(-1,1)"}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M${i * 40},0 Q${i * 40 + 30},-${260 + (i % 3) * 80} ${i * 40 + 90},-${300 + (i % 2) * 90}`} stroke="#5d6a3c" strokeWidth={22} fill="none" strokeLinecap="round" />
      ))}
      <ellipse cx={120} cy={20} rx={220} ry={90} fill="#4a5530" />
    </g>
  </Svg>
);

// Paper receipt with a header word and grey lines (no numbers).
const Receipt: React.FC<{ x: number; y: number; rot: number; title: string; k: number }> = ({ x, y, rot, title, k }) => (
  <g transform={`translate(${x},${y - (1 - k) * 500}) rotate(${rot})`} opacity={k}>
    <rect x={-170} y={-260} width={340} height={520} fill="rgba(0,0,0,0.22)" transform="translate(14,16)" />
    <path d="M-170,-260 L170,-260 L170,240 L150,260 L130,240 L110,260 L90,240 L70,260 L50,240 L30,260 L10,240 L-10,260 L-30,240 L-50,260 L-70,240 L-90,260 L-110,240 L-130,260 L-150,240 L-170,260 Z" fill="#fbf8f1" />
    <text x={0} y={-170} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={58} fill="#2b2b2b" letterSpacing={3}>
      {title}
    </text>
    <line x1={-130} y1={-130} x2={130} y2={-130} stroke="#2b2b2b" strokeWidth={4} strokeDasharray="10 8" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x={-130} y={-90 + i * 60} width={150 - (i % 2) * 40} height={18} rx={6} fill="#cfcac0" />
        <rect x={70} y={-90 + i * 60} width={60} height={18} rx={6} fill="#cfcac0" />
      </g>
    ))}
    <rect x={-130} y={200} width={260} height={10} rx={5} fill="#2b2b2b" />
  </g>
);

const Rain: React.FC<{ t: number; n?: number }> = ({ t, n = 70 }) => (
  <Svg>
    {Array.from({ length: n }, (_, i) => {
      const sx = (i * 137) % 1240 - 80;
      const sp = 1500 + (i % 5) * 160;
      const y = (((t * sp + i * 263) % 2200) + 2200) % 2200 - 200;
      return <line key={i} x1={sx - y * 0.12} y1={y} x2={sx - y * 0.12 - 10} y2={y + 70} stroke="rgba(230,236,244,0.55)" strokeWidth={3} strokeLinecap="round" />;
    })}
  </Svg>
);

const Motel: React.FC<{ x: number; g: number; t: number }> = ({ x, g, t }) => (
  <g transform={`translate(${x},${g})`}>
    <rect x={-60} y={-420} width={900} height={420} fill="#d8c3a3" />
    <rect x={-80} y={-450} width={940} height={40} fill="#8e6a4c" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={10 + i * 210} y={-300} width={90} height={300} fill="#6e5440" />
        <rect x={120 + i * 210} y={-290} width={70} height={90} fill={i === 1 ? "#ffd98a" : "#9fb0bb"} />
      </g>
    ))}
    {/* sign: one word, glowing */}
    <rect x={-40} y={-720} width={20} height={280} fill="#5a4a3e" />
    <rect x={-170} y={-820} width={300} height={120} rx={16} fill="#2f3a44" />
    <text x={-20} y={-738} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={78} fill="#ffcf7a" letterSpacing={6} opacity={0.85 + Math.sin(t * 9) * 0.1}>
      MOTEL
    </text>
  </g>
);

const BudgetPage: React.FC<{ x: number; y: number; w: number; rows: [string, number][]; t: number }> = ({ x, y, w, rows, t }) => {
  const h = 230 + rows.length * 150;
  return (
    <g transform={`translate(${x},${y}) rotate(-2)`}>
      <rect x={16} y={22} width={w} height={h} rx={18} fill="rgba(0,0,0,0.28)" />
      <rect x={0} y={0} width={w} height={h} rx={18} fill="#f7f2e8" />
      <text x={56} y={112} fontFamily="Barlow Condensed" fontWeight={800} fontSize={72} fill="#2C3B2E" letterSpacing={2}>
        DAY 1 COSTS
      </text>
      <line x1={56} y1={142} x2={w - 56} y2={142} stroke="#2C3B2E" strokeWidth={4} />
      {rows.map(([a, t0], i) => {
        const k = Math.max(0, Math.min(1, (t - t0) / 0.35));
        const yy = 240 + i * 150;
        return (
          <g key={i} opacity={0.35 + 0.65 * Math.min(1, k * 2)}>
            <rect x={56} y={yy - 48} width={62} height={62} rx={12} fill="none" stroke="#2C3B2E" strokeWidth={5} />
            <path d={`M70,${yy - 18} l16,18 l28,-40`} stroke="#3e7d4f" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="80" strokeDashoffset={80 * (1 - k)} />
            <text x={150} y={yy + 4} fontFamily="Barlow Condensed" fontWeight={700} fontSize={60} fill="#2C3B2E">
              {a}
            </text>
            <line x1={w - 250} y1={yy + 14} x2={w - 60} y2={yy + 14} stroke="#b9b0a0" strokeWidth={4} />
            <line x1={150} y1={yy + 50} x2={w - 56} y2={yy + 50} stroke="#e2dacb" strokeWidth={3} />
          </g>
        );
      })}
    </g>
  );
};

// ============ S1 HOOK MEDIUM: Nora by her car at a desert park pullout, gas-only plan (0 - 4.11) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - t * 10, y: hh.y, zoom: mix(1.03, 1.1, t / 4.11), rot: hh.rot };
  const g = 1540;
  const p: HikerProps = { x: 760, y: g + 30, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [60, -40], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <UtahBackdrop cam={cam} sky={DESERT} uid="a" y={g - 140} t={t} />
      <Plane cam={cam} depth={1}>
        <Road g={g} />
        <Svg>
          <Car x={300} y={g + 40} s={2.5} body={CAR} shade={CAR2} />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,215,0.85)">
          <Person {...p} outfit={NORA} expression="happy" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <Scrub side="right" />
      </Plane>
      <Rays x={DESERT.sun[0]} y={DESERT.sun[1]} strength={0.3} col="255,240,214" />
      <Particles seed={1541} n={16} col="#fff3d6" fall={-6} />
      <LowScrim k={0.55} />
      <Grade sunX={820} sunY={520} warm="255,232,200" cool="50,60,90" />
      <Title text={"The road trip\ncost twice\nher budget."} t={t} t0={0} top={110} size={124} />
      <Chip text="Five parks" t={t} t0={1.3} x={60} y={520} icon="none" big />
      <Chip text="Planned for gas only" t={t} t0={3.0} x={60} y={650} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: receipts land on the passenger seat (4.11 - 6.4) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3, at(t, [4.6, 4.7, 5.0], [0, 0.8, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 2.3), rot: hh.rot };
  const k1 = at(t, [4.55, 4.85], [0, 1], outExpo);
  const k2 = at(t, [5.55, 5.85], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <UtahBackdrop cam={cam} sky={DESERT} uid="b" y={1200} blur={12} t={t} arch={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* car interior: seat and dash, window frame */}
          <path d="M-200,780 L1300,700 L1300,820 L-200,900 Z" fill="#2f3438" />
          <path d="M-200,1180 Q540,1080 1300,1180 L1300,2400 L-200,2400 Z" fill="#5b5048" />
          <path d="M-200,1180 Q540,1080 1300,1180 L1300,1240 Q540,1140 -200,1240 Z" fill="#6d6158" />
          <path d="M60,1300 Q540,1230 1020,1300" stroke="#4a4039" strokeWidth={10} fill="none" />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,206,0.8)">
          <Receipt x={400} y={1290} rot={-9} title="ENTRANCE" k={k1} />
          <Receipt x={700} y={1340} rot={8} title="CAMPSITE" k={k2} />
        </Subject>
      </Plane>
      <Particles seed={1542} n={10} col="#fff3d6" fall={-4} />
      <Grade sunX={820} sunY={520} warm="255,232,200" vignette={0.55} />
      <Chip text="Entrance fees" t={t} t0={4.6} x={60} y={200} icon="x" big />
      <Chip text="Campsites" t={t} t0={5.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: downpour, she runs from the car to a motel (6.4 - 8.0) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.6), rot: hh.rot };
  const g = 1540;
  const ph = t * 3.4;
  const x = 360 + lt * 120;
  const p: HikerProps = { x, y: g + 30, scale: 2.2, phase: ph, walk: 0.8, lean: 0.12, poles: false, handOverride: [40, -90], breathe: 0 };
  return (
    <AbsoluteFill>
      <UtahBackdrop cam={cam} sky={RAINSKY} uid="c" y={g - 160} t={t} arch={false} />
      <Plane cam={cam} depth={1}>
        <Road g={g} />
        <Svg>
          <Motel x={420} g={g - 70} t={t} />
          <Car x={150} y={g + 40} s={2.3} body={CAR} shade={CAR2} lights />
          {/* puddle shine */}
          <ellipse cx={620} cy={g + 40} rx={260} ry={18} fill="rgba(220,230,240,0.35)" />
        </Svg>
        <Subject rimX={5} col="rgba(255,214,150,0.7)">
          <Person {...p} outfit={NORA} expression="tired" />
        </Subject>
      </Plane>
      <Rain t={t} n={80} />
      <LowScrim k={0.6} />
      <Grade sunX={820} sunY={480} warm="220,226,236" cool="30,40,70" vignette={0.55} />
      <Chip text="A motel when it poured" t={t} t0={6.6} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: Nora's face over a pricey takeout lunch in a park town (8.0 - 10.16) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.16), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 600, y: g + 880, scale: 4.4, walk: 0, lean: 0.03, poles: false, handOverride: [70, -10], breathe: Math.sin(t * 2) * 2 };
  return (
    <AbsoluteFill>
      <UtahBackdrop cam={cam} sky={SHADE} uid="d" y={1450} blur={14} t={t} arch={false} />
      <Plane cam={cam} depth={0.6} blur={8}>
        <Svg>
          {/* blurred town storefronts behind her */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={-100 + i * 420} y={760} width={380} height={700} fill={["#b9876a", "#8f6f5a", "#c9a27e"][i]} />
              <rect x={-60 + i * 420} y={900} width={300} height={200} fill="#e8d9b0" opacity={0.8} />
            </g>
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={7} col="rgba(255,236,206,0.85)">
          <Person {...p} outfit={NORA} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.25}>
        <Svg>
          {/* takeout box in the foreground, sharp */}
          <g transform="translate(250,1560) rotate(-6)">
            <path d="M-170,-60 L170,-60 L140,160 L-140,160 Z" fill="#f1ece2" />
            <path d="M-170,-60 L170,-60 L150,-10 L-150,-10 Z" fill="#d9d1c2" />
            <ellipse cx={-30} cy={-80} rx={110} ry={40} fill="#d9a25b" />
            <ellipse cx={20} cy={-96} rx={70} ry={22} fill="#7aa35a" />
          </g>
        </Svg>
      </Plane>
      <Particles seed={1544} n={10} col="#fff3d6" fall={-4} />
      <LowScrim k={0.5} />
      <Grade sunX={880} sunY={420} warm="250,232,210" vignette={0.6} />
      <Chip text="Pricey park-town food" t={t} t0={8.3} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: phone budget bar drains to empty on day four (10.16 - 12.48) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3, at(t, [11.7, 11.8, 12.1], [0, 1, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 2.32), rot: hh.rot };
  const up = at(t, [10.16, 10.5], [0, 1], outExpo);
  const left = at(t, [10.6, 11.8], [0.35, 0], outExpo);
  return (
    <AbsoluteFill>
      <UtahBackdrop cam={cam} sky={DUSK} uid="e" y={1250} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,214,160,0.85)">
          <Svg>
            <g transform={`translate(0,${(1 - up) * 420})`}>
              <path d="M820,2100 L770,1520 Q770,1440 840,1430 L1200,1430 L1200,2100 Z" fill={NORA.jacket} />
              <g transform="translate(540,1080) rotate(-4) scale(1.3)">
                <rect x={-170} y={-330} width={340} height={660} rx={46} fill="#1f2326" />
                <rect x={-152} y={-306} width={304} height={612} rx={32} fill="#f4f6f8" />
                <text x={0} y={-210} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={700} fontSize={44} fill="#5a6066">TRIP BUDGET</text>
                <text x={0} y={-120} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={84} fill="#1f2326">DAY 4</text>
                <rect x={-120} y={-40} width={240} height={50} rx={25} fill="#e3e7ea" />
                <rect x={-120} y={-40} width={240 * left} height={50} rx={25} fill="#d9443a" />
                <text x={0} y={100} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={66} fill="#d9443a" opacity={at(t, [11.7, 11.9], [0, 1])}>EMPTY</text>
                <rect x={-110} y={170} width={220} height={12} rx={6} fill="#dde3e8" />
                <rect x={-110} y={210} width={160} height={12} rx={6} fill="#dde3e8" />
              </g>
              <ellipse cx={820} cy={1410} rx={110} ry={90} fill={NORA.skin} />
              <ellipse cx={300} cy={1330} rx={70} ry={50} fill={NORA.skinShade} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Grade sunX={760} sunY={700} warm="255,214,170" vignette={0.6} />
      <Readout label="HER BUDGET" value="Gone" ok={false} t={t} t0={11.75} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S6 MEDIUM: "Here's the fix" — Nora at a picnic table with the planner, before booking (12.48 - 16.16) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y - lt * 4, zoom: mix(1.04, 1.1, lt / 3.68), rot: hh.rot };
  const g = 1540;
  const write = Math.sin(t * 7) * 10;
  const p: HikerProps = { x: 560, y: g + 40, scale: 2.4, walk: 0, lean: 0.12, poles: false, handOverride: [90 + write * 0.3, 20], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <UtahBackdrop cam={cam} sky={DESERT} uid="f" y={g - 140} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-300,${g - 70} L1400,${g - 70} L1400,2400 L-300,2400 Z`} fill="#c58a5c" />
          <path d={`M-300,${g + 90} L1400,${g + 90} L1400,2400 L-300,2400 Z`} fill="#a86c44" />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,215,0.85)">
          <Person {...p} outfit={NORA} expression="neutral" />
          <Svg>
            {/* picnic table in front of her */}
            <rect x={300} y={g - 250} width={620} height={40} rx={8} fill="#8a5d3c" />
            <rect x={340} y={g - 210} width={30} height={260} fill="#6d4a30" />
            <rect x={850} y={g - 210} width={30} height={260} fill="#6d4a30" />
            {/* open planner on the table */}
            <path d={`M560,${g - 252} L700,${g - 270} L840,${g - 252} L700,${g - 246} Z`} fill="#f7f2e8" />
            <path d={`M700,${g - 270} L700,${g - 246}`} stroke="#c9bfae" strokeWidth={3} />
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <Scrub side="left" />
      </Plane>
      <Rays x={DESERT.sun[0]} y={DESERT.sun[1]} strength={0.32} col="255,240,214" />
      <Particles seed={1546} n={14} col="#fff3d6" fall={-6} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="255,232,200" />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={13.6} top={200} size={124} />
      <Chip text="Before you book" t={t} t0={13.7} x={60} y={200} icon="check" big />
      <Chip text="Cost out every day" t={t} t0={14.9} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: the day page fills in, line by line (16.16 - 21.91) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y - lt * 6, zoom: mix(1.03, 1.1, lt / 5.75), rot: hh.rot };
  const rows: [string, number][] = [
    ["Miles + fuel", 16.3],
    ["Entrance or pass", 17.5],
    ["A bed", 18.65],
    ["Food", 19.2],
    ["Spare for surprises", 20.2],
  ];
  const cur = rows.reduce((a, r, i) => (t >= r[1] - 0.1 ? i : a), 0);
  const penY = 600 + 240 + cur * 150;
  return (
    <AbsoluteFill>
      <UtahBackdrop cam={cam} sky={DESERT} uid="g" y={1100} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,520 L1300,480 L1300,2400 L-200,2400 Z" fill="#8a5d3c" />
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M-200,${620 + i * 300} L1300,${590 + i * 300}`} stroke="#6d4a30" strokeWidth={8} />
          ))}
        </Svg>
        <Subject rimX={5} col="rgba(255,236,206,0.8)">
          <Svg>
            <BudgetPage x={110} y={600} w={860} rows={rows} t={t} />
            <PenTip x={250 + Math.sin(t * 12) * 8} y={penY - 30} s={1.4} skin={NORA.skin} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1547} n={10} col="#fff3d6" fall={-4} />
      <Grade sunX={820} sunY={520} warm="255,232,200" vignette={0.5} />
      <Chip text="Every day of the trip" t={t} t0={16.3} x={60} y={200} icon="check" big />
      <Chip text="Plus a spare line" t={t} t0={20.2} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: golden hour, the car rolls past the arch to the next park (21.91 - 26.85) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1560;
  return (
    <AbsoluteFill>
      <UtahBackdrop cam={cam} sky={DUSK} uid="h" y={g - 140} t={t} />
      <Plane cam={cam} depth={1}>
        <Road g={g} roll={lt * 260} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Svg>
            <Car x={mix(260, 520, lt / 4.9)} y={g + 60} s={2.6} body={CAR} shade={CAR2} lights />
            {/* Nora's arm out of the window, relaxed */}
            <ellipse cx={mix(260, 520, lt / 4.9) + 60} cy={g - 200} rx={34} ry={26} fill={NORA.skin} />
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <Scrub side="right" />
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1] - 100} strength={0.45} col="255,226,180" />
      <Particles seed={1548} n={22} col="#fff0d0" fall={-6} />
      <LowScrim />
      <Grade sunX={760} sunY={700} warm="255,220,170" />
      <Chip text="Several parks this year?" t={t} t0={22.2} x={60} y={200} icon="none" big />
      <Chip text="Annual pass" t={t} t0={24.9} x={60} y={330} icon="check" big />
      <Chip text="vs single entry fees" t={t} t0={25.9} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/national-parks-road-trip-planner-card.jpg"
      photoH={800}
      spec="32 PRINTABLE PAGES · BUDGET + BOOKINGS"
      name={
        <>
          National Parks
          <br />
          Road Trip Planner
        </>
      }
      nameSize={88}
      price="$7.99"
      save="Save this while you plan your trip"
    />
  );
};

export const V154: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.16} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.11} to={6.45} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.11} />
    </Scene>
    <Scene from={6.4} to={8.05} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.4} />
    </Scene>
    <Scene from={8.0} to={10.21} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={8.0} />
    </Scene>
    <Scene from={10.16} to={12.53} fadeIn={0.06} fadeOut={0.08}>
      <S5 off={10.16} />
    </Scene>
    <Scene from={12.48} to={16.21} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={12.48} />
    </Scene>
    <Scene from={16.16} to={21.96} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={16.16} />
    </Scene>
    <Scene from={21.91} to={26.9} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={21.91} />
    </Scene>
    <Scene from={26.75} to={30.0} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.2, 4.11, 1600],
        [4.11, 6.4, 1660],
        [6.4, 8.0, 1600],
        [8.0, 10.16, 1660],
        [10.16, 12.48, 1660],
        [12.48, 16.16, 1600],
        [16.16, 21.91, 1660],
        [21.91, 26.75, 1600],
      ]}
    />
  </AbsoluteFill>
);
