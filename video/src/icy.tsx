// Shared pieces for the icy-trail and cold-face winter videos (V129 ice cleats at the trailhead, V130 slush refreezes,
// V131 balaclava face panel). Built on the C01 cine kit and the winter scenery in winter.tsx.
import React from "react";
import { HikerProps, hikerGeometry, hikerTransform } from "./Hiker";
import { Svg } from "./cine";
import { Car } from "./kit";
import { SNOW, SNOW2 } from "./winter";

export const CLEAT = "#1f2326"; // black TPE harness, as on the product photo
export const CHAIN = "#b9c2c8";
export const ICE = "#cfe4ee";

// Chain cleats on both boots of a standing/walking Person (local hiker units).
export const Spikes: React.FC<{ p: HikerProps }> = ({ p }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)}>
      {g.legs.map((l, i) => (
        <g key={i}>
          <path d={`M${l.foot[0] - 18},${l.foot[1] + 2} ${[0, 1, 2, 3, 4].map(() => `l5,7 l6,-7`).join(" ")}`} stroke={CHAIN} strokeWidth={3} fill="none" />
          <path d={`M${l.foot[0] - 18},${l.foot[1] - 14} Q${l.foot[0] + 4},${l.foot[1] - 22} ${l.foot[0] + 26},${l.foot[1] - 6}`} stroke={CLEAT} strokeWidth={5} fill="none" />
        </g>
      ))}
    </g>
  );
};

// Icy parking lot / trailhead ground (screen coords): glazed ice with shine streaks and packed snow banks.
export const IceLot: React.FC<{ y: number; shine?: number; glaze?: number }> = ({ y, shine = 1, glaze = 1 }) => (
  <Svg>
    <path d={`M-400,${y - 30} L1480,${y - 50} L1480,2600 L-400,2600 Z`} fill={glaze > 0.5 ? "#b9ccd6" : "#8d8a80"} />
    <path d={`M-400,${y - 30} L1480,${y - 50} L1480,2600 L-400,2600 Z`} fill="#9a8f7f" opacity={1 - glaze} />
    {Array.from({ length: 9 }, (_, i) => (
      <path key={i} d={`M${-300 + i * 200},${y + 40 + (i % 3) * 90} l${150 + (i % 2) * 60},-6`} stroke="#ffffff" strokeWidth={9} strokeLinecap="round" opacity={0.75 * shine * glaze} />
    ))}
    {Array.from({ length: 12 }, (_, i) => (
      <ellipse key={`b${i}`} cx={-320 + i * 160} cy={y + 150 + ((i * 67) % 260)} rx={26} ry={9} fill="#8fa3ae" opacity={0.6 * glaze} />
    ))}
    <path d={`M-400,${y - 40} Q100,${y - 110} 520,${y - 60} L520,${y - 30} L-400,${y - 20} Z`} fill={SNOW} />
    <path d={`M-400,${y - 30} Q100,${y - 80} 520,${y - 40}`} stroke={SNOW2} strokeWidth={10} fill="none" />
  </Svg>
);

// A parked car on the lot with snow on its roof.
export const SnowCar: React.FC<{ x: number; y: number; s?: number; flip?: boolean; body?: string; shade?: string; open?: number }> = ({
  x,
  y,
  s = 1.6,
  flip,
  body = "#5d7488",
  shade = "#465a6c",
  open = 0,
}) => (
  <g>
    <Car x={x} y={y} s={s} body={body} shade={shade} flip={flip} />
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
      <path d="M-38,-122 Q8,-136 56,-122 L50,-118 L-34,-118 Z" fill={SNOW} />
      {open > 0 && <path d={`M-125,-74 L${-125 - 70 * open},${-110 - 10 * open} L${-125 - 70 * open},${-40} L-125,-34 Z`} fill={shade} />}
    </g>
  </g>
);

// Big close-up boot (screen coords) with the cleat going on: toe = toe loop over the toe (0..1), heel = harness over the heel (0..1).
export const BootClose: React.FC<{ toe: number; heel: number; pants: string; pantsShade: string; boot: string; sole: string; y?: number; slipX?: number; glove?: string | null; hand?: number }> = ({
  toe,
  heel,
  pants,
  pantsShade,
  boot,
  sole,
  y = 0,
  slipX = 0,
  glove = "#2a2a2a",
  hand = 0,
}) => (
  <g transform={`translate(${slipX},${y})`}>
    <ellipse cx={560} cy={1330} rx={430} ry={40} fill="rgba(0,0,0,0.2)" />
    <path d="M300,560 Q380,520 470,560 L500,1090 L280,1090 Z" fill={pants} />
    <path d="M330,640 Q360,800 330,960" stroke={pantsShade} strokeWidth={10} fill="none" />
    <path d="M240,1060 L520,1060 Q560,1120 700,1160 Q840,1190 850,1260 L850,1300 L220,1300 Z" fill={boot} stroke="rgba(0,0,0,0.3)" strokeWidth={4} />
    <path d="M300,1080 L500,1080" stroke="#c9b48e" strokeWidth={10} />
    {[0, 1, 2, 3].map((i) => (
      <path key={i} d={`M${540 + i * 46},${1130 + i * 14} l26,-18`} stroke="#c9b48e" strokeWidth={7} strokeLinecap="round" />
    ))}
    <rect x={210} y={1290} width={650} height={34} rx={14} fill={sole} />
    {/* chains + spikes under the sole, then the black harness: toe loop first, heel last */}
    {toe > 0 && (
      <g opacity={Math.min(1, toe * 1.4)}>
        <path d={`M${560 + (1 - toe) * 220},1318 ${Array.from({ length: 6 }, () => "l24,30 l24,-30").join(" ")}`} stroke={CHAIN} strokeWidth={8} fill="none" strokeLinejoin="round" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${600 + i * 90 + (1 - toe) * 220},1344 l8,26 l8,-26`} fill="#e8edf0" stroke="#7d868c" strokeWidth={2} />
        ))}
        <path d={`M${870 + (1 - toe) * 160},1300 Q${900 + (1 - toe) * 160},1200 ${780 + (1 - toe) * 120},${1150 - toe * 10} Q${700 + (1 - toe) * 100},1180 ${640 + (1 - toe) * 120},1300`} stroke={CLEAT} strokeWidth={24} fill="none" strokeLinecap="round" />
      </g>
    )}
    {heel > 0 && (
      <g>
        <path d={`M240,1318 ${Array.from({ length: 6 }, () => "l24,30 l24,-30").join(" ")}`} stroke={CHAIN} strokeWidth={8} fill="none" strokeLinejoin="round" opacity={heel} />
        {[0, 1].map((i) => (
          <path key={i} d={`M${290 + i * 120},1344 l8,26 l8,-26`} fill="#e8edf0" stroke="#7d868c" strokeWidth={2} opacity={heel} />
        ))}
        <path d={`M${640},1300 L${210 + (1 - heel) * -60},${1300 - (1 - heel) * 140}`} stroke={CLEAT} strokeWidth={22} strokeLinecap="round" />
        <path d={`M${210 + (1 - heel) * -60},${1300 - (1 - heel) * 140} Q${180 - (1 - heel) * 60},${1180 - (1 - heel) * 120} ${290},${1110 - (1 - heel) * 160}`} stroke={CLEAT} strokeWidth={22} fill="none" strokeLinecap="round" />
        {/* heel tab pulled by a gloved hand */}
        {hand > 0 && (
          <g opacity={hand}>
            <rect x={262} y={1060 - (1 - heel) * 160} width={40} height={60} rx={10} fill={CLEAT} />
            <path d={`M190,${990 - (1 - heel) * 160} q60,-40 120,10 l10,60 q-60,30 -130,0 Z`} fill={glove ?? "#2a2a2a"} />
          </g>
        )}
      </g>
    )}
  </g>
);

// Balaclava overlay on a Person: hood over head and ears, long neck section, face panel up (1) or down under the chin (0).
// frost 0..1 = ice crystals on the panel, damp 0..1 = darker wet patch over the mouth.
export const Balaclava: React.FC<{ p: HikerProps; col?: string; shade?: string; up: number; frost?: number; damp?: number; snug?: number }> = ({
  p,
  col = "#24272b",
  shade = "#16181b",
  up,
  frost = 0,
  damp = 0,
  snug = 0,
}) => {
  const g = hikerGeometry(p);
  const [hx, hy] = g.head;
  const o = 14 - snug * 3; // face opening half-width
  const panelTop = hy + 30 - up * 26; // up: covers nose (hy+4); down: under the chin
  return (
    <g transform={hikerTransform(p)}>
      {/* neck section down to the collar */}
      <path d={`M${hx - 30},${hy + 6} Q${hx - 34},${hy + 44} ${hx - 22},${hy + 62} L${hx + 22},${hy + 62} Q${hx + 30},${hy + 44} ${hx + 26},${hy + 26} Z`} fill={col} />
      {/* hood with the face opening cut out */}
      <path
        fillRule="evenodd"
        d={`M${hx - 33},${hy + 12} Q${hx - 38},${hy - 36} ${hx},${hy - 37} Q${hx + 34},${hy - 36} ${hx + 32},${hy + 2} L${hx + 30},${hy + 30} L${hx - 20},${hy + 40} Z
           M${hx + 15 - o},${hy - 2} Q${hx + 15},${hy - 18 + snug * 3} ${hx + 31},${hy - 6} L${hx + 31},${hy + 30} Q${hx + 14},${hy + 34} ${hx + 3},${hy + 22} Z`}
        fill={col}
      />
      <path d={`M${hx - 30},${hy - 14} Q${hx - 26},${hy - 34} ${hx},${hy - 35}`} stroke={shade} strokeWidth={5} fill="none" strokeLinecap="round" />
      {/* drawstring edge around the face */}
      <path d={`M${hx + 15 - o},${hy - 2} Q${hx + 15},${hy - 18 + snug * 3} ${hx + 31},${hy - 6}`} stroke={shade} strokeWidth={3.5} fill="none" />
      <path d={`M${hx + 4},${hy + 22} l-3,${18 + snug * 6} M${hx + 8},${hy + 24} l1,${20 + snug * 6}`} stroke="#9aa0a6" strokeWidth={1.6} />
      {/* face panel */}
      <path d={`M${hx + 2},${panelTop} Q${hx + 20},${panelTop - 4} ${hx + 34},${panelTop + 2} L${hx + 32},${hy + 40} Q${hx + 12},${hy + 46} ${hx - 4},${hy + 40} Z`} fill={col} />
      <path d={`M${hx + 4},${panelTop + 3} Q${hx + 20},${panelTop} ${hx + 33},${panelTop + 5}`} stroke={shade} strokeWidth={3} fill="none" />
      {damp > 0 && up > 0.5 && <ellipse cx={hx + 26} cy={hy + 18} rx={8 + damp * 3} ry={6 + damp * 3} fill="#0c0d0f" opacity={0.6 * damp} />}
      {frost > 0 &&
        up > 0.5 &&
        Array.from({ length: 14 }, (_, i) => {
          const fx = hx + 12 + ((i * 37) % 22);
          const fy = hy + 10 + ((i * 53) % 28);
          return <path key={i} d={`M${fx - 2.5},${fy} h5 M${fx},${fy - 2.5} v5`} stroke="#eaf6ff" strokeWidth={1.6} opacity={frost} />;
        })}
    </g>
  );
};

// Big close-up face (screen coords, centre cx, cy, s = scale) with a balaclava; for the face/fleece close-ups.
export const FaceClose: React.FC<{ cx: number; cy: number; s: number; skin: string; skinShade: string; col?: string; shade?: string; up: number; frost?: number; damp?: number; snug?: number; eyes?: "tired" | "happy" | "neutral" }> = ({
  cx,
  cy,
  s,
  skin,
  skinShade,
  col = "#24272b",
  shade = "#16181b",
  up,
  frost = 0,
  damp = 0,
  snug = 0,
  eyes = "neutral",
}) => {
  const panelTop = 40 - up * 70; // up: over the nose; down: under the chin
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      {/* shoulders / jacket collar */}
      <path d="M-170,170 Q-120,110 -40,110 L60,110 Q150,110 190,180 L190,260 L-170,260 Z" fill="#2F7F86" />
      <path d="M-40,110 L60,110 L50,160 L-30,160 Z" fill={col} />
      {/* face (three-quarter view to the right) */}
      <ellipse cx={14} cy={0} rx={70} ry={88} fill={skin} />
      <ellipse cx={-30} cy={10} rx={16} ry={22} fill={skinShade} />
      <ellipse cx={62} cy={20} rx={13} ry={9} fill="#d9826a" opacity={0.35} />
      {/* eyes */}
      {[0, 46].map((dx, i) => (
        <g key={i}>
          {eyes === "happy" ? (
            <path d={`M${2 + dx},-14 q9,-9 18,0`} stroke="#2a1f1a" strokeWidth={4.5} fill="none" strokeLinecap="round" />
          ) : (
            <ellipse cx={11 + dx} cy={-12} rx={6.5} ry={eyes === "tired" ? 4 : 8} fill="#2a1f1a" />
          )}
          <path d={`M${dx},-32 q11,${eyes === "tired" ? 3 : -5} 22,${eyes === "tired" ? 4 : 0}`} stroke="#3a2a1e" strokeWidth={4.5} fill="none" strokeLinecap="round" />
        </g>
      ))}
      {/* nose + mouth (hidden when the panel is up) */}
      <path d="M44,0 q12,18 0,26" stroke={skinShade} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={eyes === "happy" ? "M20,52 q16,12 32,0" : "M22,54 q14,2 28,0"} stroke="#5a2e22" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* hood */}
      <path
        fillRule="evenodd"
        d={`M-110,40 Q-120,-130 10,-138 Q130,-136 124,-10 L120,120 L-90,130 Z M${-40 + snug * 10},-30 Q${10},${-92 + snug * 12} ${92 - snug * 6},-40 L${96 - snug * 6},60 Q20,${110 - snug * 10} ${-36 + snug * 10},60 Z`}
        fill={col}
      />
      <path d={`M${-40 + snug * 10},-30 Q10,${-92 + snug * 12} ${92 - snug * 6},-40`} stroke={shade} strokeWidth={9} fill="none" />
      <path d="M-100,-40 Q-90,-110 0,-124" stroke={shade} strokeWidth={10} fill="none" strokeLinecap="round" />
      {/* drawstring + toggle */}
      <path d={`M-30,64 l-8,${70 + snug * 20} M-18,70 l2,${70 + snug * 20}`} stroke="#9aa0a6" strokeWidth={4} />
      <rect x={-46} y={128 + snug * 20} width={34} height={22} rx={8} fill="#55595e" />
      {/* face panel */}
      <path d={`M${-40},${panelTop} Q20,${panelTop - 10} 100,${panelTop} L104,122 Q20,140 -44,122 Z`} fill={col} />
      <path d={`M-38,${panelTop + 6} Q20,${panelTop - 4} 100,${panelTop + 6}`} stroke={shade} strokeWidth={7} fill="none" />
      {damp > 0 && up > 0.5 && <ellipse cx={38} cy={48} rx={28 + damp * 14} ry={20 + damp * 10} fill="#0a0b0c" opacity={0.65 * damp} />}
      {frost > 0 &&
        up > 0.5 &&
        Array.from({ length: 34 }, (_, i) => {
          const fx = -20 + ((i * 47) % 116);
          const fy = 4 + ((i * 29) % 100);
          const r = 4 + (i % 3) * 2;
          return <path key={i} d={`M${fx - r},${fy} h${2 * r} M${fx},${fy - r} v${2 * r} M${fx - r * 0.7},${fy - r * 0.7} l${1.4 * r},${1.4 * r} M${fx - r * 0.7},${fy + r * 0.7} l${1.4 * r},${-1.4 * r}`} stroke="#eef8ff" strokeWidth={2.4} opacity={frost} />;
        })}
      {frost > 0 && up > 0.5 && <path d="M-40,40 Q30,26 104,40 L104,122 Q20,140 -44,122 Z" fill="#dff0fb" opacity={0.18 * frost} />}
    </g>
  );
};

// Breath cloud in front of the close-up face (screen coords).
export const Puff: React.FC<{ x: number; y: number; t: number; k?: number; s?: number }> = ({ x, y, t, k = 1, s = 1 }) => {
  if (k <= 0) return null;
  const q = (t * 0.6) % 1;
  return (
    <g opacity={k}>
      <circle cx={x + q * 140 * s} cy={y - q * 40 * s} r={(20 + q * 60) * s} fill="#f2f6f8" opacity={0.45 * (1 - q)} />
      <circle cx={x + q * 90 * s + 30 * s} cy={y - q * 70 * s} r={(14 + q * 40) * s} fill="#f2f6f8" opacity={0.35 * (1 - q)} />
    </g>
  );
};

// Drawstring storage bag for the cleats (local, centre bottom at 0,0).
export const CleatBag: React.FC<{ x: number; y: number; s?: number; full?: number; rot?: number }> = ({ x, y, s = 1, full = 1, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M-90,0 Q-110,-${90 + full * 40} -70,-${150 + full * 20} L70,-${150 + full * 20} Q110,-${90 + full * 40} 90,0 Z`} fill="#2b2f33" />
    <path d={`M-70,-${150 + full * 20} Q0,-${130 + full * 20} 70,-${150 + full * 20}`} stroke="#15181a" strokeWidth={8} fill="none" />
    <path d={`M-10,-${140 + full * 20} q-20,-50 -40,-60 M10,-${140 + full * 20} q20,-50 44,-56`} stroke="#9aa0a6" strokeWidth={5} fill="none" />
    <rect x={-14} y={-(150 + full * 20) - 24} width={28} height={20} rx={6} fill="#55595e" />
  </g>
);
