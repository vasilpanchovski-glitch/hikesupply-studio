// V118: "His pole tip stayed in the mud." in the cinematic C01 style. Story for the Telescoping Trekking Pole — 4-Section
// Aluminum (Single) ($19.99, live Shopify; tungsten steel tip). Advice: rubber tip caps are for pavement, rock slabs and
// boardwalks; on mud, snow and loose dirt they slip and can get pulled off, so take them off at the trailhead, keep them in
// a pocket and let the metal tip grip. No numbers, no claims beyond that.
// End card = real Shopify photo, cut out (products/folding-trekking-pole-cut.png, same as V72).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, FALL, GOLD, OVERCAST, Subject } from "../fall";
import vo from "../vo/v118.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const SHAFT = "#B8323A";
const SHAFT2 = "#8E252C";
const STEEL = "#c9d0d6";
const RUBBER = "#1d1d1f";
const MUD = "#5a4532";
const MUD2 = "#6d543c";

const SAM: Outfit = {
  ...JAKE,
  skin: "#C68E68",
  skinShade: "#A8724E",
  hair: "#20160f",
  beard: "#20160f",
  cap: "#4a5a3a",
  capShade: "#38452c",
  jacket: "#2F6E8C",
  jacketShade: "#245670",
  pants: "#55493d",
  pantsShade: "#40372e",
  boot: "#5a3a26",
  sole: "#262220",
  pack: "#c9662e",
  packShade: "#a04f22",
  pole: SHAFT,
  grip: "#1a1a1a",
  glove: null,
};

// Muddy trail sloping down to the right (screen coords), with puddles, wet leaves and a few old snow patches.
const MudSlope: React.FC<{ y: number; tilt?: number; snow?: boolean }> = ({ y, tilt = 0.1, snow = true }) => {
  const Y = (x: number) => y + tilt * (x - 540);
  return (
    <Svg>
      <path d={`M-400,${Y(-400) - 50} L1480,${Y(1480) - 50} L1480,2600 L-400,2600 Z`} fill="#5f6a3c" />
      <path d={`M-400,${Y(-400) - 10} L1480,${Y(1480) - 10} L1480,${Y(1480) + 260} L-400,${Y(-400) + 260} Z`} fill={MUD} />
      <path d={`M-400,${Y(-400) - 10} L1480,${Y(1480) - 10} L1480,${Y(1480) + 16} L-400,${Y(-400) + 16} Z`} fill={MUD2} />
      {[0, 1, 2].map((i) => {
        const x = -100 + i * 480;
        return <ellipse key={i} cx={x} cy={Y(x) + 110 + (i % 2) * 70} rx={130} ry={22} fill="#8fa2ad" opacity={0.5} />;
      })}
      {Array.from({ length: 22 }, (_, i) => {
        const x = -360 + i * 86;
        const yy = Y(x) + 30 + ((i * 67) % 220);
        return <ellipse key={i} cx={x} cy={yy} rx={16} ry={6} fill={FALL[i % 4]} opacity={0.85} transform={`rotate(${((i * 37) % 60) - 30} ${x} ${yy})`} />;
      })}
      {snow &&
        [0, 1, 2, 3].map((i) => {
          const x = -250 + i * 430;
          return <path key={`s${i}`} d={`M${x - 110},${Y(x) + 320} Q${x},${Y(x) + 270} ${x + 120},${Y(x) + 330} Z`} fill="#eef2f4" opacity={0.85} />;
        })}
    </Svg>
  );
};

// Close-up pole (screen coords): tip point at (x,y), shaft going up at angle deg from vertical (+ = top leans right).
// cap: rubber cap on the tip.
const BigPole: React.FC<{ x: number; y: number; angle: number; cap: boolean; s?: number }> = ({ x, y, angle, cap, s = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${angle}) scale(${s})`}>
    {/* upper shaft, joint, lower section */}
    <rect x={-22} y={-1500} width={44} height={760} rx={8} fill={SHAFT} />
    <rect x={-22} y={-1500} width={14} height={760} fill="rgba(255,255,255,0.18)" />
    <rect x={-28} y={-760} width={56} height={60} rx={10} fill="#1a1a1a" />
    <rect x={-17} y={-700} width={34} height={560} rx={6} fill={SHAFT2} />
    <rect x={-17} y={-700} width={10} height={560} fill="rgba(255,255,255,0.15)" />
    {/* ferrule and tungsten tip */}
    <path d="M-20,-150 L20,-150 L16,-40 L-16,-40 Z" fill="#2a2a2a" />
    <path d="M-12,-40 L12,-40 L4,0 L-4,0 Z" fill={STEEL} />
    {cap && (
      <g>
        <path d="M-30,-130 L30,-130 L34,-20 Q40,10 60,14 L60,24 L-40,24 L-40,-20 Z" fill={RUBBER} />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={-36 + i * 26} y1={24} x2={-36 + i * 26} y2={14} stroke="#3a3a3a" strokeWidth={6} />
        ))}
        <rect x={-30} y={-130} width={60} height={14} rx={4} fill="#2e2e30" />
      </g>
    )}
  </g>
);

const Fist: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${r})`}>
    <rect x={-80} y={-60} width={160} height={120} rx={50} fill={SAM.skin} />
    {[0, 1, 2].map((i) => (
      <line key={i} x1={-40 + i * 40} y1={-56} x2={-40 + i * 40} y2={-20} stroke={SAM.skinShade} strokeWidth={6} strokeLinecap="round" />
    ))}
    <path d="M60,-40 L260,-60 L270,60 L60,60 Z" fill={SAM.jacket} />
  </g>
);

// ============ S1 HOOK MEDIUM: Sam on a muddy switchback, planting his pole (0 - 2.87) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 2.87), rot: hh.rot };
  const g = 1500;
  const ph = t * 2.2;
  const p: HikerProps = { x: 420 + t * 30, y: g + 150, scale: 2.4, phase: ph, walk: 0.45, lean: -0.02, poles: true, slope: -0.1, breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="a" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <MudSlope y={g + 120} />
        <Subject rimX={6} col="rgba(240,236,225,0.8)">
          <Person {...p} outfit={SAM} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a2c" side="right" />
      </Plane>
      <Particles seed={1181} n={18} bokeh fall={10} leaves={FALL} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="240,234,222" cool="40,55,70" />
      <Title text={"His pole tip\nstayed in\nthe mud."} t={t} t0={0} top={120} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the pole comes out of the mud, the rubber cap stays behind (2.87 - 5.85) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [4.49, 4.6, 5.0], [0, 1, 0]);
  const hh = handheld(t, 0.4, shake * 5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 2.98), rot: hh.rot };
  const pull = at(t, [3.0, 4.4], [0, 1], outExpo);
  const surf = 1300;
  const tipY = 1350 - pull * 360;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="b" treeY={1000} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={surf - 220} width={1880} height={240} fill="#5f6a3c" opacity={0.9} />
          {/* the cap left in the mud, drawn behind the surface */}
          {pull > 0.15 && (
            <g transform={`translate(520,1350) scale(1.5)`}>
              <path d="M-30,-130 L30,-130 L34,-20 L-34,-20 Z" fill={RUBBER} />
              <rect x={-30} y={-130} width={60} height={14} rx={4} fill="#2e2e30" />
              <ellipse cx={0} cy={-128} rx={20} ry={6} fill="#0c0c0c" />
            </g>
          )}
          <BigPole x={520 + pull * 40} y={tipY} angle={6} cap={pull < 0.15} s={1.5} />
          {/* mud surface in front */}
          <path d={`M-400,${surf} Q540,${surf - 26} 1480,${surf} L1480,2600 L-400,2600 Z`} fill={MUD} />
          <path d={`M-400,${surf} Q540,${surf - 26} 1480,${surf} L1480,${surf + 22} Q540,${surf - 4} -400,${surf + 22} Z`} fill={MUD2} />
          <ellipse cx={520} cy={surf - 10} rx={70 + pull * 20} ry={16} fill="#3e2f22" />
          {Array.from({ length: 10 }, (_, i) => {
            const x = 60 + i * 110;
            const yy = surf + 70 + ((i * 53) % 280);
            return <ellipse key={i} cx={x} cy={yy} rx={18} ry={7} fill={FALL[i % 4]} opacity={0.85} transform={`rotate(${((i * 37) % 60) - 30} ${x} ${yy})`} />;
          })}
          {/* mud drips off the bare tip */}
          {pull > 0.3 &&
            [0, 1].map((i) => {
              const k = (t * 1.3 + i * 0.5) % 1;
              return <ellipse key={i} cx={524 + pull * 40} cy={tipY + 10 + k * 160} rx={7} ry={10} fill={MUD} opacity={1 - k} />;
            })}
        </Svg>
      </Plane>
      <Particles seed={1182} n={10} bokeh fall={6} leaves={FALL} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="240,234,222" cool="40,55,70" vignette={0.55} />
      <Chip text="Rubber tip gone" t={t} t0={4.66} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the capped tip on pavement, rock slab, boardwalk (5.85 - 9.97) ============
const Surface: React.FC<{ kind: number; y: number }> = ({ kind, y }) => {
  if (kind === 0)
    return (
      <Svg>
        <rect x={-400} y={y} width={1880} height={1400} fill="#5c6166" />
        {Array.from({ length: 70 }, (_, i) => (
          <circle key={i} cx={(i * 157) % 1180 - 50} cy={y + 30 + ((i * 89) % 560)} r={3 + (i % 3) * 2} fill={i % 2 ? "#71767b" : "#4b5055"} />
        ))}
        <rect x={-400} y={y + 320} width={1880} height={36} fill="#d9c25a" opacity={0.85} />
      </Svg>
    );
  if (kind === 1)
    return (
      <Svg>
        <path d={`M-400,${y + 20} Q300,${y - 30} 1480,${y + 10} L1480,2600 L-400,2600 Z`} fill="#8d867c" />
        <path d={`M-400,${y + 20} Q300,${y - 30} 1480,${y + 10} L1480,${y + 60} Q300,${y + 10} -400,${y + 70} Z`} fill="#a59e93" />
        <path d={`M120,${y + 80} L260,${y + 260} L240,${y + 480} M760,${y + 60} L700,${y + 300}`} stroke="#6e685f" strokeWidth={8} fill="none" />
        <ellipse cx={880} cy={y + 380} rx={120} ry={40} fill="#7d8a5a" opacity={0.6} />
      </Svg>
    );
  return (
    <Svg>
      <rect x={-400} y={y} width={1880} height={1400} fill="#8a6446" />
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect x={-400} y={y + i * 120} width={1880} height={110} fill={i % 2 ? "#9a7352" : "#87603f"} />
          <line x1={-400} y1={y + i * 120 + 112} x2={1480} y2={y + i * 120 + 112} stroke="#4e3826" strokeWidth={8} />
          <circle cx={180 + (i % 2) * 40} cy={y + i * 120 + 55} r={7} fill="#3a2a1c" />
          <circle cx={880 - (i % 2) * 40} cy={y + i * 120 + 55} r={7} fill="#3a2a1c" />
        </g>
      ))}
    </Svg>
  );
};

const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const kind = t < 8.12 ? 0 : t < 8.83 ? 1 : 2;
  const tap = [6.9, 8.12, 8.83].reduce((m, t0) => Math.max(m, at(t, [t0, t0 + 0.08, t0 + 0.3], [0, 1, 0])), 0);
  const hh = handheld(t, 0.3, tap * 2);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 4.12), rot: hh.rot };
  const sy = 1240;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="c" treeY={1000} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Surface kind={kind} y={sy} />
        <Svg>
          <ellipse cx={560} cy={sy + 30} rx={110} ry={18} fill="rgba(0,0,0,0.3)" />
          <BigPole x={540} y={sy + 6 - tap * 8} angle={-8} cap s={1.5} />
        </Svg>
      </Plane>
      <Particles seed={1183} n={10} bokeh fall={6} leaves={FALL} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="240,234,222" cool="40,55,70" vignette={0.5} />
      <Chip text="Rubber caps" t={t} t0={5.9} x={60} y={200} icon="none" big />
      <Chip text="Pavement" t={t} t0={7.29} x={60} y={330} icon="check" big />
      <Chip text="Rock slabs" t={t} t0={8.12} x={60} y={460} icon="check" big />
      <Chip text="Boardwalks" t={t} t0={8.83} x={60} y={590} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: on mud and old snow the capped pole skids (9.97 - 13.57) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const slip = at(t, [11.5, 11.75], [0, 1]) * at(t, [12.3, 12.9], [1, 0.3]);
  const shake = at(t, [11.5, 11.6, 12.0], [0, 1, 0]);
  const hh = handheld(t, 0.45, shake * 6);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.02, 1.1, lt / 3.6), rot: hh.rot };
  const g = 1480;
  const p: HikerProps = { x: 470, y: g + 230, scale: 2.8, walk: 0, lean: -0.05 - slip * 0.22, poles: true, slope: -0.1, handOverride: [mix(90, 150, slip), mix(10, 40, slip)], breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="d" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <MudSlope y={g + 160} />
        <Subject rimX={5} col="rgba(240,236,225,0.8)">
          <Person {...p} outfit={SAM} expression={slip > 0.3 ? "tired" : "neutral"} />
        </Subject>
        {slip > 0.1 && (
          <Svg>
            {[0, 1, 2].map((i) => (
              <line key={i} x1={760 + i * 10} y1={g + 220 + i * 14} x2={760 + i * 10 + 160 * slip} y2={g + 236 + i * 14} stroke={MUD2} strokeWidth={10} strokeLinecap="round" />
            ))}
          </Svg>
        )}
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a2c" side="left" />
      </Plane>
      <Particles seed={1184} n={14} bokeh fall={8} leaves={FALL} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="240,234,222" cool="40,55,70" />
      <Readout label="MUD, SNOW, LOOSE DIRT" value="Caps slip" ok={false} t={t} t0={10.24} x={60} y={200} />
      <Chip text="And get sucked off" t={t} t0={12.0} x={60} y={520} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: at the trailhead, the cap comes off (13.57 - 16.77) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.1, at(lt, [0, 1.2], [0, 1], outExpo)), rot: hh.rot };
  const off2 = at(t, [15.3, 15.9], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="e" treeY={1150} t={t} blur={12} />
      <Plane cam={cam} depth={0.7} blur={8}>
        <Svg>
          <g transform="translate(860,1450)">
            <rect x={-14} y={-420} width={28} height={420} fill="#5a4030" />
            <rect x={-170} y={-480} width={340} height={110} rx={8} fill="#6b4a2e" />
            <text x={0} y={-405} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={50} fill="#f3e6cf" letterSpacing={3}>
              TRAILHEAD
            </text>
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(240,236,225,0.7)">
          <Svg>
            {/* pole held across the frame, tip to the lower left, shaft up to the right */}
            <g transform="translate(250,1240) rotate(55)">
              <BigPole x={0} y={0} angle={0} cap={false} s={1.3} />
            </g>
            <Fist x={830} y={850} r={55} />
            {/* the cap, pulled off the tip by the other hand */}
            <g transform={`translate(${250 - off2 * 150},${1240 + off2 * 105}) rotate(55) scale(1.3)`}>
              <path d="M-30,-130 L30,-130 L34,-20 Q40,10 60,14 L60,24 L-40,24 L-40,-20 Z" fill={RUBBER} />
              <rect x={-30} y={-130} width={60} height={14} rx={4} fill="#2e2e30" />
            </g>
            <g transform={`translate(${215 - off2 * 150},${1270 + off2 * 105}) rotate(-35)`}>
              <path d="M-40,60 L-120,420 L120,420 L60,60 Z" fill={SAM.jacket} />
              <rect x={-90} y={-70} width={180} height={140} rx={56} fill={SAM.skin} />
              {[0, 1, 2].map((i) => (
                <line key={i} x1={-50 + i * 45} y1={-66} x2={-50 + i * 45} y2={-24} stroke={SAM.skinShade} strokeWidth={6} strokeLinecap="round" />
              ))}
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1185} n={10} bokeh fall={6} leaves={FALL} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="245,238,226" cool="40,55,70" vignette={0.5} />
      <Chip text="Here's the fix" t={t} t0={13.6} x={60} y={200} icon="none" big />
      <Chip text="Caps off at the trailhead" t={t} t0={14.89} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the caps drop into a jacket pocket (16.77 - 18.07) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.3), rot: hh.rot };
  const drop = at(t, [16.9, 17.5], [0, 1]);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: SAM.jacket }} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={0} width={1480} height={1920} fill={SAM.jacket} />
          <path d="M120,0 L160,1920" stroke={SAM.jacketShade} strokeWidth={30} />
          <path d="M150,0 L190,1920" stroke="#1b1b1b" strokeWidth={10} />
          {/* pocket */}
          <rect x={300} y={980} width={560} height={600} rx={40} fill={SAM.jacketShade} />
          <path d="M320,1000 L840,1000" stroke="#111" strokeWidth={22} strokeLinecap="round" />
          <path d="M330,1000 Q590,1080 830,1000" fill="#0e2230" />
          <rect x={790} y={970} width={34} height={70} rx={8} fill="#c9d0d6" />
          <defs>
            <clipPath id="pk">
              <rect x={0} y={0} width={1080} height={1010} />
            </clipPath>
          </defs>
          <g clipPath="url(#pk)">
            {[0, 1].map((i) => (
              <g key={i} transform={`translate(${520 + i * 110},${mix(700, 1120, drop) + i * 30}) rotate(${-20 + i * 40})`}>
                <path d="M-30,-130 L30,-130 L34,-20 Q40,10 60,14 L60,24 L-40,24 L-40,-20 Z" fill={RUBBER} />
                <rect x={-30} y={-130} width={60} height={14} rx={4} fill="#2e2e30" />
              </g>
            ))}
          </g>
          <g transform={`translate(600,${mix(560, 880, drop)})`} opacity={at(t, [17.4, 17.7], [1, 0])}>
            <rect x={-110} y={-620} width={220} height={560} rx={70} fill={SAM.jacketShade} />
            <rect x={-100} y={-80} width={200} height={150} rx={60} fill={SAM.skin} />
          </g>
        </Svg>
      </Plane>
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="245,238,226" cool="40,55,70" vignette={0.55} />
      <Chip text="Keep them in a pocket" t={t} t0={16.8} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: the bare tungsten tip bites into the mud (18.07 - 20.55) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const bite = at(t, [19.1, 19.45], [0, 1]);
  const shake = at(t, [19.42, 19.52, 19.9], [0, 1, 0]);
  const hh = handheld(t, 0.3, shake * 4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.12, lt / 2.48), rot: hh.rot };
  const surf = 1300;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="f" treeY={1000} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={surf - 220} width={1880} height={240} fill="#5f6a3c" opacity={0.9} />
          <BigPole x={540} y={mix(1000, surf + 50, bite)} angle={-6} cap={false} s={1.5} />
          <path d={`M-400,${surf} Q540,${surf - 26} 1480,${surf} L1480,2600 L-400,2600 Z`} fill={MUD} />
          <path d={`M-400,${surf} Q540,${surf - 26} 1480,${surf} L1480,${surf + 22} Q540,${surf - 4} -400,${surf + 22} Z`} fill={MUD2} />
          {bite > 0.9 && <ellipse cx={540} cy={surf - 10} rx={40} ry={10} fill="#3e2f22" />}
          {bite > 0.95 &&
            [0, 1, 2, 3, 4].map((i) => {
              const k = at(t, [19.45, 19.9], [0, 1]);
              const a = -2.5 + i * 0.5;
              return <circle key={i} cx={540 + Math.cos(a) * 120 * k} cy={surf - 20 + Math.sin(a) * 90 * k + k * k * 60} r={10 - i % 2 * 3} fill={MUD2} opacity={1 - k} />;
            })}
          {Array.from({ length: 10 }, (_, i) => {
            const x = 60 + i * 110;
            const yy = surf + 70 + ((i * 53) % 280);
            return <ellipse key={i} cx={x} cy={yy} rx={18} ry={7} fill={FALL[i % 4]} opacity={0.85} transform={`rotate(${((i * 37) % 60) - 30} ${x} ${yy})`} />;
          })}
        </Svg>
      </Plane>
      <Particles seed={1187} n={10} bokeh fall={6} leaves={FALL} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="245,238,226" cool="40,55,70" vignette={0.5} />
      <Chip text="Bare metal tip" t={t} t0={18.5} x={60} y={200} icon="check" big />
      <Chip text="Bites in" t={t} t0={19.41} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: golden light, Sam walks down the muddy switchback, poles gripping (20.55 - 23.0) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 24, y: hh.y + lt * 6, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1460;
  const ph = t * 3;
  const p: HikerProps = { x: 330 + lt * 60, y: g + 150 + lt * 6, scale: 2.3, phase: ph, walk: 0.7, lean: -0.04, poles: true, slope: -0.1, breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="g" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <MudSlope y={g + 120} snow={false} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={SAM} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2a3a2c" side="left" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1] - 100} strength={0.4} col="255,236,200" />
      <Particles seed={1188} n={20} bokeh fall={10} leaves={FALL} />
      <LowScrim />
      <Grade sunX={760} sunY={620} warm="255,226,180" />
      <Chip text="Grips every step down" t={t} t0={20.98} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/folding-trekking-pole-cut.png"
      cutoutH={800}
      spec="TUNGSTEN STEEL TIP · SOLD SINGLE"
      name={
        <>
          Telescoping
          <br />
          Trekking Pole
        </>
      }
      nameSize={100}
      price="$19.99"
      save="Save this before your muddy hike"
    />
  );
};

export const V118: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.92} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.87} to={5.9} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.87} />
    </Scene>
    <Scene from={5.85} to={10.02} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.85} />
    </Scene>
    <Scene from={9.97} to={13.62} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.97} />
    </Scene>
    <Scene from={13.57} to={16.82} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={13.57} />
    </Scene>
    <Scene from={16.77} to={18.12} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={16.77} />
    </Scene>
    <Scene from={18.07} to={20.6} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={18.07} />
    </Scene>
    <Scene from={20.55} to={23.0} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={20.55} />
    </Scene>
    <Scene from={22.6} to={27.5} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.87, 1560],
        [2.87, 5.85, 1560],
        [5.85, 9.97, 1560],
        [9.97, 13.57, 1560],
        [13.57, 16.77, 1560],
        [16.77, 20.55, 1560],
        [20.55, 22.6, 1560],
      ]}
    />
  </AbsoluteFill>
);
