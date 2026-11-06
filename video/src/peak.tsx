// Shared pieces for the Peak Bagger's Logbook videos (v105, v107): progress board, log card, phone of blurry photos, cairn, pen.
import React from "react";
import { HEAD } from "./kit";
import { PAPER, INK } from "./trip";
import { mix } from "./lib";

export const PEN = "#2a3a8a";
const FILL = "#3e5f4a";

// Progress board: n numbered circles, the first `filled` colored in, circle `next` filling with k (0..1).
export const ProgressBoard: React.FC<{ x: number; y: number; w: number; n?: number; cols?: number; filled: number; next?: number; k?: number; title?: string; sub?: string; rot?: number }> = ({
  x,
  y,
  w,
  n = 48,
  cols = 6,
  filled,
  next = -1,
  k = 0,
  title = "NH 4,000-FOOTERS",
  sub = "Color in every summit",
  rot = 0,
}) => {
  const rows = Math.ceil(n / cols);
  const pad = w * 0.07;
  const cw = (w - pad * 2) / cols;
  const top = w * 0.26;
  const h = top + rows * cw * 0.92 + pad;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot} ${w / 2} ${h / 2})`}>
      <rect x={14} y={20} width={w} height={h} rx={14} fill="rgba(0,0,0,0.28)" />
      <rect x={0} y={0} width={w} height={h} rx={14} fill={PAPER} />
      <text x={pad} y={w * 0.12} fontFamily={HEAD} fontWeight={800} fontSize={w * 0.085} fill={INK} letterSpacing={2}>
        {title}
      </text>
      <text x={pad} y={w * 0.19} fontFamily="Inter" fontWeight={600} fontSize={w * 0.036} fill="#6b6f66">
        {sub}
      </text>
      {Array.from({ length: n }, (_, i) => {
        const cx = pad + (i % cols) * cw + cw / 2;
        const cy = top + Math.floor(i / cols) * cw * 0.92 + cw * 0.42;
        const r = cw * 0.36;
        const full = i < filled;
        const isNext = i === next;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill={full ? FILL : "none"} stroke={full ? FILL : "#b9b2a2"} strokeWidth={3} />
            {isNext && k > 0 && <circle cx={cx} cy={cy} r={r * Math.min(1, k * 1.1)} fill="#B5553A" />}
            {isNext && k > 0 && <circle cx={cx} cy={cy} r={r + 10} fill="none" stroke="#B5553A" strokeWidth={5} opacity={Math.max(0, 1 - k) * 0.9 + (k >= 1 ? 0.6 : 0)} />}
            <text x={cx} y={cy + r * 0.32} textAnchor="middle" fontFamily="Inter" fontWeight={700} fontSize={r * 0.8} fill={full || (isNext && k > 0.6) ? PAPER : "#8b8578"}>
              {i + 1}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// One log card per peak. k = reveal of each hand-written field [route, times, weather, who]. tick: [summit, turned back] 0..1.
export const LogCard: React.FC<{
  x: number;
  y: number;
  w: number;
  no: string;
  peak: string;
  date?: string;
  vals?: string[];
  k?: number[];
  tick?: [number, number];
  rot?: number;
  hi?: number;
}> = ({ x, y, w, no, peak, date = "", vals = ["", "", "", ""], k = [0, 0, 0, 0], tick = [0, 0], rot = 0, hi = -1 }) => {
  const h = w * 1.18;
  const pad = w * 0.07;
  const labels = ["ROUTE", "TIMES", "WEATHER", "WHO CAME ALONG"];
  const fy = (i: number) => w * 0.42 + i * w * 0.15;
  const id = `lc${no.replace(/\W/g, "")}${Math.round(x)}`;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot} ${w / 2} ${h / 2})`}>
      <rect x={14} y={20} width={w} height={h} rx={14} fill="rgba(0,0,0,0.28)" />
      <rect x={0} y={0} width={w} height={h} rx={14} fill={PAPER} />
      <rect x={0} y={0} width={w} height={w * 0.06} rx={14} fill={FILL} />
      <text x={pad} y={w * 0.17} fontFamily={HEAD} fontWeight={800} fontSize={w * 0.06} fill="#8b8578" letterSpacing={2}>
        {no}
      </text>
      <text x={pad} y={w * 0.27} fontFamily={HEAD} fontWeight={800} fontSize={w * 0.09} fill={INK} letterSpacing={1}>
        {peak}
      </text>
      <circle cx={w - pad - w * 0.08} cy={w * 0.19} r={w * 0.08} fill="none" stroke="#b9b2a2" strokeWidth={3} strokeDasharray="10 7" />
      {date && (
        <text x={pad} y={w * 0.34} fontFamily="Barlow Condensed" fontWeight={700} fontSize={w * 0.05} fill={PEN}>
          {date}
        </text>
      )}
      {labels.map((l, i) => (
        <g key={l}>
          {hi === i && <rect x={pad * 0.5} y={fy(i) - w * 0.06} width={w - pad} height={w * 0.135} rx={10} fill="#f3d34a" opacity={0.35} />}
          <text x={pad} y={fy(i)} fontFamily="Inter" fontWeight={700} fontSize={w * 0.032} fill="#6b6f66" letterSpacing={1}>
            {l}
          </text>
          <line x1={pad} y1={fy(i) + w * 0.06} x2={w - pad} y2={fy(i) + w * 0.06} stroke="#c8bfae" strokeWidth={3} />
          <clipPath id={`${id}c${i}`}>
            <rect x={pad} y={fy(i)} width={(w - pad * 2) * (k[i] ?? 0)} height={w * 0.08} />
          </clipPath>
          <text x={pad + 4} y={fy(i) + w * 0.05} fontFamily="Barlow Condensed" fontWeight={700} fontSize={w * 0.058} fill={PEN} clipPath={`url(#${id}c${i})`}>
            {vals[i]}
          </text>
        </g>
      ))}
      {["Summit", "Turned back"].map((l, i) => {
        const bx = pad + i * w * 0.42;
        const by = h - w * 0.13;
        const tk = tick[i];
        return (
          <g key={l}>
            <rect x={bx} y={by} width={w * 0.06} height={w * 0.06} rx={6} fill="none" stroke={INK} strokeWidth={4} />
            {tk > 0 && (
              <path
                d={`M${bx + w * 0.01},${by + w * 0.03} L${bx + w * 0.026},${by + w * 0.05} L${bx + w * 0.07},${by - w * 0.01}`}
                stroke={PEN}
                strokeWidth={7}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={200}
                strokeDashoffset={200 * (1 - tk)}
              />
            )}
            <text x={bx + w * 0.085} y={by + w * 0.05} fontFamily="Inter" fontWeight={700} fontSize={w * 0.045} fill={INK}>
              {l}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// Phone held upright, scrolling a grid of blurry summit photos (scroll in px).
export const PhotoPhone: React.FC<{ x: number; y: number; s?: number; scroll: number; rot?: number; uid: string }> = ({ x, y, s = 1, scroll, rot = 0, uid }) => {
  const W = 360;
  const H = 740;
  const cell = (W - 40) / 3;
  const pals = [
    ["#9fb6c8", "#6f8577", "#3f5a52"],
    ["#c9b79a", "#8a7d64", "#5b5644"],
    ["#b7c4cf", "#7d8aa0", "#4a5866"],
    ["#d9b88a", "#a07b52", "#5a4632"],
    ["#a9c3d8", "#e9eef1", "#8ea1ad"],
    ["#8fa3b4", "#56634f", "#30513f"],
  ];
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      <rect x={-W / 2 - 14} y={-H / 2 - 14} width={W + 28} height={H + 28} rx={56} fill="#17191c" />
      <clipPath id={`pp${uid}`}>
        <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={44} />
      </clipPath>
      <g clipPath={`url(#pp${uid})`}>
        <rect x={-W / 2} y={-H / 2} width={W} height={H} fill="#0e0f11" />
        <g filter={`url(#ppb${uid})`}>
          {Array.from({ length: 36 }, (_, i) => {
            const cx = -W / 2 + 10 + (i % 3) * (cell + 10);
            const cy = -H / 2 + 90 + Math.floor(i / 3) * (cell + 10) - scroll;
            if (cy < -H / 2 - cell || cy > H / 2) return null;
            const p = pals[(i * 7) % pals.length];
            return (
              <g key={i}>
                <rect x={cx} y={cy} width={cell} height={cell} fill={p[0]} />
                <path d={`M${cx},${cy + cell * 0.6} L${cx + cell * 0.35},${cy + cell * 0.3} L${cx + cell * 0.6},${cy + cell * 0.5} L${cx + cell},${cy + cell * 0.25} L${cx + cell},${cy + cell} L${cx},${cy + cell} Z`} fill={p[1]} />
                <rect x={cx} y={cy + cell * 0.78} width={cell} height={cell * 0.22} fill={p[2]} />
              </g>
            );
          })}
        </g>
        <defs>
          <filter id={`ppb${uid}`}>
            <feGaussianBlur stdDeviation={3.5} />
          </filter>
        </defs>
        <rect x={-W / 2} y={-H / 2} width={W} height={80} fill="#0e0f11" />
        <text x={-W / 2 + 24} y={-H / 2 + 60} fontFamily="Inter" fontWeight={700} fontSize={30} fill="#f2f2f2">
          Photos
        </text>
        <text x={W / 2 - 24} y={-H / 2 + 60} textAnchor="end" fontFamily="Inter" fontWeight={600} fontSize={22} fill="#9aa0a6">
          2,814
        </text>
      </g>
    </g>
  );
};

// Summit cairn of stacked rocks (base center at x,y).
export const Cairn: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {[
      [0, -20, 90, 26, "#7a7e82"],
      [6, -62, 72, 22, "#8a8e92"],
      [-4, -98, 56, 18, "#6f7378"],
      [4, -128, 40, 15, "#93979b"],
      [0, -152, 26, 11, "#7d8185"],
    ].map(([cx, cy, rx, ry, c], i) => (
      <g key={i}>
        <ellipse cx={cx as number} cy={cy as number} rx={rx as number} ry={ry as number} fill={c as string} />
        <ellipse cx={(cx as number) - (rx as number) * 0.25} cy={(cy as number) - (ry as number) * 0.35} rx={(rx as number) * 0.5} ry={(ry as number) * 0.3} fill="#ffffff" opacity={0.18} />
      </g>
    ))}
  </g>
);

// Pen held at (x,y) = tip; draws with a small wiggle w.
export const PenTip: React.FC<{ x: number; y: number; s?: number; rot?: number; skin: string; wig?: number }> = ({ x, y, s = 1, rot = -35, skin, wig = 0 }) => (
  <g transform={`translate(${x + Math.sin(wig * 30) * 6},${y + Math.cos(wig * 24) * 3}) rotate(${rot}) scale(${s})`}>
    <rect x={-8} y={-230} width={16} height={210} rx={7} fill="#2a3a8a" />
    <path d="M-8,-20 L8,-20 L0,0 Z" fill="#c9d0d6" />
    <ellipse cx={0} cy={-150} rx={46} ry={62} fill={skin} />
    <ellipse cx={-30} cy={-120} rx={18} ry={30} fill={skin} />
  </g>
);

export const pop = (t: number, t0: number) => mix(0, 1, Math.max(0, Math.min(1, (t - t0) / 0.35)));
