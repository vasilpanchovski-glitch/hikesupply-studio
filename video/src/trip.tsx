// Trip-planning pieces for the park trip pack stories (v103 Utah, v104 Smokies): desk, phone lock screen, GPX phone,
// itinerary page, wall calendar, red rock arch, Utah backdrop. Built on the depth planes from cine.tsx.
import React from "react";
import { at, mix } from "./lib";
import { HEAD, LeafTree, Pine } from "./kit";
import { Cam, Clouds, Haze, Plane, Ridge, Sky, SkyPlane, Svg } from "./cine";
import { Wall } from "./canyon";

export const PAPER = "#f7f2e8";
export const INK = "#2C3B2E";

export const Desk: React.FC<{ y: number; col?: string }> = ({ y, col = "#6e4c34" }) => (
  <Svg>
    <rect x={-400} y={y} width={1880} height={1600} fill={col} />
    {Array.from({ length: 10 }, (_, i) => (
      <path key={i} d={`M-400,${y + 40 + i * 120} Q300,${y + 20 + i * 120} 1480,${y + 50 + i * 120}`} stroke="rgba(40,25,15,0.3)" strokeWidth={4} fill="none" />
    ))}
    <rect x={-400} y={y} width={1880} height={14} fill="rgba(255,240,220,0.18)" />
  </Svg>
);

// A red rock arch on a sandstone fin (local units, base centre at 0,0, about 900 wide, 640 tall).
export const Arch: React.FC<{ x: number; y: number; s?: number; col?: string; shade?: string }> = ({ x, y, s = 1, col = "#c9643a", shade = "#a24d2a" }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-450,0 L-420,-260 Q-400,-560 -120,-640 Q0,-670 140,-630 Q420,-540 430,-240 L460,0 Z M-250,0 L-240,-220 Q-220,-430 -10,-450 Q210,-440 240,-230 L250,0 Z" fill={col} fillRule="evenodd" />
    <path d="M-420,-260 Q-400,-560 -120,-640 Q-300,-520 -330,-260 L-340,0 L-450,0 Z" fill={shade} opacity={0.7} />
    <path d="M-240,-220 Q-220,-430 -10,-450 Q-180,-400 -200,-220 L-205,0 L-250,0 Z" fill={shade} opacity={0.6} />
    {[-560, -470, -380].map((yy, i) => (
      <path key={i} d={`M${-380 + i * 30},${yy + 120} Q0,${yy - 10} ${380 - i * 30},${yy + 120}`} stroke="#e08a5a" strokeWidth={10} fill="none" opacity={0.45} />
    ))}
    <ellipse cx={0} cy={6} rx={560} ry={30} fill="rgba(80,30,10,0.25)" />
  </g>
);

// Desert sky with an arch in the middle distance and layered red mesas, blurred by depth.
export const UtahBackdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; y: number; blur?: number; t: number; arch?: boolean }> = ({ cam, sky, uid, y, blur = 0, t, arch = true }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={360} col="#ffffff" seed={7} drift={t * 10} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.12} blur={3 + blur}>
      <Wall seed={5} base={y - 380} amp={200} col="#d9a07a" band="#f1c9a2" uid={uid} step={60} />
    </Plane>
    <Haze y={y - 480} h={340} col={sky.low} opacity={0.6} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Svg>{arch && <Arch x={700} y={y - 60} s={0.75} />}</Svg>
    </Plane>
    <Plane cam={cam} depth={0.5} blur={1 + blur}>
      <Wall seed={23} base={y + 40} amp={160} col="#a85a35" band="#c8774a" uid={uid} />
    </Plane>
  </>
);

// Phone lock screen with a red rock arch wallpaper (local units, centre).
export const LockPhone: React.FC<{ x: number; y: number; s?: number; rot?: number; uid: string; time?: string }> = ({ x, y, s = 1, rot = 0, uid, time = "9:41" }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <defs>
      <linearGradient id={`lp${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3d6fa3" />
        <stop offset="0.55" stopColor="#f0c9a0" />
        <stop offset="1" stopColor="#e9a070" />
      </linearGradient>
      <clipPath id={`lc${uid}`}>
        <rect x={-170} y={-350} width={340} height={700} rx={30} />
      </clipPath>
    </defs>
    <rect x={-190} y={-380} width={380} height={760} rx={50} fill="#1d2126" />
    <g clipPath={`url(#lc${uid})`}>
      <rect x={-170} y={-350} width={340} height={700} fill={`url(#lp${uid})`} />
      <path d="M-200,240 L-150,120 L-60,150 L20,90 L120,140 L220,110 L220,400 L-200,400 Z" fill="#a85a35" />
      <Arch x={0} y={250} s={0.36} />
      <path d="M-200,300 Q0,270 220,300 L220,400 L-200,400 Z" fill="#8a4628" />
    </g>
    <text x={0} y={-210} textAnchor="middle" fontFamily="Inter" fontWeight={300} fontSize={92} fill="#ffffff">
      {time}
    </text>
    <rect x={-50} y={318} width={100} height={8} rx={4} fill="rgba(255,255,255,0.8)" />
  </g>
);

// Phone with a GPX route line and a numbered start pin (local units, centre). label = trail name.
export const GpxPhone: React.FC<{ x: number; y: number; s?: number; draw: number; rot?: number; label: string; land?: string; topo?: string }> = ({
  x,
  y,
  s = 1,
  draw,
  rot = 0,
  label,
  land = "#dfe8d8",
  topo = "#b9c9b0",
}) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-190} y={-380} width={380} height={760} rx={50} fill="#1d2126" />
    <rect x={-170} y={-350} width={340} height={700} rx={30} fill={land} />
    {Array.from({ length: 7 }, (_, i) => (
      <path key={i} d={`M-170,${-260 + i * 90} Q-60,${-300 + i * 90} 40,${-250 + i * 90} Q120,${-210 + i * 90} 170,${-260 + i * 90}`} stroke={topo} strokeWidth={4} fill="none" />
    ))}
    <path d="M-110,250 Q-120,120 -40,60 Q40,0 -10,-80 Q-60,-160 40,-220 Q100,-250 110,-280" stroke="#D9443A" strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={900} strokeDashoffset={900 * (1 - draw)} />
    <circle cx={-110} cy={250} r={34} fill="#3e7d4f" stroke="#fff" strokeWidth={6} />
    <text x={-110} y={264} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#fff">
      1
    </text>
    <rect x={-160} y={290} width={320} height={44} rx={12} fill="#ffffff" />
    <text x={0} y={322} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={30} fill={INK}>
      {label}
    </text>
  </g>
);

// Printed itinerary page with 3/5/7-day tabs (screen units, centre x). The tab steps from t0, 0.6 s apart.
export const Itinerary: React.FC<{ x: number; y: number; t: number; t0: number; title: string; days?: string[]; only3?: boolean }> = ({ x, y, t, t0, title, days = ["Day 1", "Day 2", "Day 3"], only3 = false }) => {
  const tabs = ["3 DAYS", "5 DAYS", "7 DAYS"];
  const sel = only3 ? 0 : t < t0 + 0.6 ? 0 : t < t0 + 1.2 ? 1 : 2;
  return (
    <g transform={`translate(${x},${y}) rotate(-2)`}>
      <rect x={-400} y={20} width={820} height={1000} rx={18} fill="rgba(0,0,0,0.3)" />
      <rect x={-420} y={0} width={820} height={1000} rx={18} fill={PAPER} />
      <text x={-370} y={100} fontFamily={HEAD} fontWeight={800} fontSize={64} fill={INK} letterSpacing={2}>
        {title}
      </text>
      <line x1={-370} y1={130} x2={350} y2={130} stroke={INK} strokeWidth={4} />
      {tabs.map((s, i) => {
        const k = only3 ? (i === 0 ? 1 : 0) : at(t, [t0 + i * 0.6, t0 + i * 0.6 + 0.3], [0, 1]);
        return (
          <g key={s} opacity={0.3 + k * 0.7}>
            <rect x={-370 + i * 245} y={160} width={225} height={86} rx={14} fill={sel === i ? INK : "#e6dccb"} />
            <text x={-370 + i * 245 + 112} y={220} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={50} fill={sel === i ? PAPER : INK}>
              {s}
            </text>
          </g>
        );
      })}
      {days.map((d, i) => (
        <g key={d}>
          <text x={-370} y={340 + i * 200} fontFamily={HEAD} fontWeight={800} fontSize={54} fill="#2a3a8a">
            {d}
          </text>
          <circle cx={-330} cy={390 + i * 200} r={30} fill="#3e7d4f" />
          <text x={-330} y={402 + i * 200} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={36} fill="#fff">
            {i + 1}
          </text>
          <rect x={-280} y={372 + i * 200} width={480 - i * 60} height={30} rx={6} fill="#d8d0c0" />
          <rect x={-370} y={430 + i * 200} width={620} height={18} rx={6} fill="#e6dccb" />
        </g>
      ))}
    </g>
  );
};

// Wall calendar page (screen units, top-left). month label, a big ring drawn around day `ring` by k, note under it.
export const Calendar: React.FC<{ x: number; y: number; w: number; month: string; year: string; ring?: number; k?: number; note?: string; flip?: number }> = ({
  x,
  y,
  w,
  month,
  year,
  ring = 0,
  k = 0,
  note,
  flip = 0,
}) => {
  const h = w * 1.25;
  const cw = (w - 60) / 7;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={14} y={20} width={w} height={h} rx={14} fill="rgba(0,0,0,0.28)" />
      <rect x={0} y={0} width={w} height={h} rx={14} fill={PAPER} />
      <rect x={0} y={0} width={w} height={h * 0.2} rx={14} fill="#3e5f4a" />
      <text x={30} y={h * 0.14} fontFamily={HEAD} fontWeight={800} fontSize={w * 0.11} fill={PAPER} letterSpacing={3}>
        {month}
      </text>
      <text x={w - 30} y={h * 0.14} textAnchor="end" fontFamily={HEAD} fontWeight={700} fontSize={w * 0.08} fill="rgba(247,242,232,0.85)">
        {year}
      </text>
      {Array.from({ length: 35 }, (_, i) => {
        const cx = 30 + (i % 7) * cw + cw / 2;
        const cy = h * 0.28 + Math.floor(i / 7) * cw * 1.05 + cw / 2;
        const day = i - 2;
        if (day < 1 || day > 30) return null;
        return (
          <g key={i}>
            <text x={cx} y={cy + cw * 0.15} textAnchor="middle" fontFamily="Inter" fontWeight={600} fontSize={cw * 0.4} fill="#5b625c">
              {day}
            </text>
            {day === ring && k > 0 && (
              <circle cx={cx} cy={cy} r={cw * 0.48} fill="none" stroke="#B83A55" strokeWidth={8} strokeDasharray={400} strokeDashoffset={400 * (1 - k)} transform={`rotate(-90 ${cx} ${cy})`} />
            )}
          </g>
        );
      })}
      {note && (
        <text x={w / 2} y={h - 30} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={w * 0.09} fill="#B83A55" opacity={k}>
          {note}
        </text>
      )}
      {flip > 0 && (
        <g transform={`translate(0,0) scale(1,${1 - flip})`} opacity={1 - flip}>
          <rect x={0} y={0} width={w} height={h} rx={14} fill="#efe6d6" />
        </g>
      )}
      {[0.25, 0.5, 0.75].map((f) => (
        <rect key={f} x={w * f - 8} y={-18} width={16} height={40} rx={6} fill="#7a7f86" />
      ))}
    </g>
  );
};

// Spring Smokies backdrop: layered blue ridges in mist, fresh green tree line, optional wildflowers in the ground band.
export const SmokyBackdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={400} col="#ffffff" seed={uid.charCodeAt(0)} drift={t * 12} opacity={0.45} />
    </Plane>
    <Plane cam={cam} depth={0.12} blur={3 + blur}>
      <RidgeWrap seed={51} base={treeY - 330} amp={260} col="#9fb2c8" />
    </Plane>
    <Haze y={treeY - 440} h={360} col="#e9eef6" opacity={0.7} />
    <Plane cam={cam} depth={0.22} blur={2.2 + blur}>
      <RidgeWrap seed={57} base={treeY - 210} amp={220} col="#7d93ab" />
    </Plane>
    <Haze y={treeY - 300} h={300} col="#e9eef6" opacity={0.6} />
    <Plane cam={cam} depth={0.34} blur={1.6 + blur}>
      <RidgeWrap seed={61} base={treeY - 90} amp={180} col="#5f7a86" />
    </Plane>
    <Haze y={treeY - 180} h={220} col="#e9eef6" opacity={0.4} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Svg>
        {Array.from({ length: 11 }, (_, i) => {
          const x = ((((-160 + i * 160 - cam.x * 0.2) % 1760) + 1760) % 1760) - 300;
          const h = 380 + (i % 3) * 90;
          const yy = treeY + (i % 2) * 20;
          return i % 3 === 1 ? <LeafTree key={i} x={x} y={yy} h={h * 0.9} c="#7fae4e" c2="#5f8f3a" /> : <Pine key={i} x={x} y={yy} h={h} c="#30513f" c2="#243f31" />;
        })}
      </Svg>
    </Plane>
  </>
);

const RidgeWrap: React.FC<{ seed: number; base: number; amp: number; col: string }> = ({ seed, base, amp, col }) => <Ridge seed={seed} base={base} amp={amp} scale={amp} col={col} />;

// Spring wildflowers scattered along a ground line (screen units).
export const Wildflowers: React.FC<{ y: number; n?: number; seed?: number; s?: number }> = ({ y, n = 26, seed = 3, s = 1 }) => (
  <Svg>
    {Array.from({ length: n }, (_, i) => {
      const r = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
      const f = r - Math.floor(r);
      const x = -100 + (i / n) * 1300 + f * 40;
      const yy = y + f * 120;
      const col = ["#f2f0f6", "#d9c2e8", "#f3d34a", "#e98fb0"][i % 4];
      const sz = (10 + f * 8) * s;
      return (
        <g key={i}>
          <line x1={x} y1={yy} x2={x + 4} y2={yy + 40 * s} stroke="#4f7a36" strokeWidth={4} />
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx={x + Math.cos((a * Math.PI) / 180) * sz} cy={yy + Math.sin((a * Math.PI) / 180) * sz} rx={sz * 0.8} ry={sz * 0.5} fill={col} transform={`rotate(${a} ${x + Math.cos((a * Math.PI) / 180) * sz} ${yy + Math.sin((a * Math.PI) / 180) * sz})`} />
          ))}
          <circle cx={x} cy={yy} r={sz * 0.45} fill="#e3b23c" />
        </g>
      );
    })}
  </Svg>
);

void mix;
