// Shared pieces for the "All 64 US National Parks" checklist videos (v199, v200).
import React from "react";
import { mix } from "./lib";

// Chiricahua-style rock spires: tall grey-tan rhyolite columns, some with balanced caps (local units, base at 0,0).
export const Spires: React.FC<{ x: number; y: number; s?: number; seed?: number; n?: number; col?: string; shade?: string; lichen?: string }> = ({
  x,
  y,
  s = 1,
  seed = 1,
  n = 9,
  col = "#b79a7c",
  shade = "#8c735c",
  lichen = "#9aa25a",
}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {Array.from({ length: n }, (_, i) => {
      const r = (k: number) => {
        const v = Math.sin((i + 1) * 12.9898 * (seed + k) + 78.233 * k) * 43758.5453;
        return v - Math.floor(v);
      };
      const cx = -n * 75 + i * 150 + (r(1) - 0.5) * 70;
      const w = 70 + r(2) * 70;
      const h = 220 + r(3) * 460;
      const cap = r(4) > 0.5;
      const nk = 0.55 + r(5) * 0.3; // neck width factor
      return (
        <g key={i}>
          <path
            d={`M${cx - w / 2},0 C${cx - w / 2 - 10},${-h * 0.3} ${cx - (w * nk) / 2},${-h * 0.45} ${cx - (w * nk) / 2},${-h * 0.6} C${cx - (w * nk) / 2},${-h * 0.8} ${cx - w / 2 + 4},${-h * 0.85} ${cx - w / 2.6},${-h * 0.97} Q${cx},${-h - 30} ${cx + w / 2.6},${-h * 0.97} C${cx + w / 2 - 4},${-h * 0.85} ${cx + (w * nk) / 2},${-h * 0.8} ${cx + (w * nk) / 2},${-h * 0.6} C${cx + (w * nk) / 2},${-h * 0.45} ${cx + w / 2 + 10},${-h * 0.3} ${cx + w / 2},0 Z`}
            fill={col}
          />
          <path d={`M${cx + w / 8},0 L${cx + w / 8},${-h * 0.98} Q${cx + w / 3},${-h * 0.96} ${cx + (w * nk) / 2},${-h * 0.6} C${cx + (w * nk) / 2},${-h * 0.45} ${cx + w / 2 + 10},${-h * 0.3} ${cx + w / 2},0 Z`} fill={shade} opacity={0.75} />
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1={cx - (w * nk) / 2 + 4} y1={-h * f} x2={cx + (w * nk) / 2 - 4} y2={-h * f + 6} stroke={shade} strokeWidth={4} opacity={0.6} />
          ))}
          <ellipse cx={cx - w / 6} cy={-h * 0.62} rx={w * 0.18} ry={16} fill={lichen} opacity={0.5} />
          {cap && <ellipse cx={cx + (r(6) - 0.5) * 20} cy={-h - 34} rx={w * 0.52} ry={36} fill={col} stroke={shade} strokeWidth={4} />}
        </g>
      );
    })}
  </g>
);

export type ListRow = { name: string; tick?: number; strike?: number; hi?: number };

// Paper checklist page (local units, top-left at 0,0, w x h).
export const ParkList: React.FC<{ title: string; rows: ListRow[]; foot?: string; footK?: number; w?: number; rowH?: number; old?: boolean }> = ({
  title,
  rows,
  foot,
  footK = 1,
  w = 760,
  rowH = 92,
  old = false,
}) => {
  const h = 190 + rows.length * rowH + (foot ? 130 : 40);
  return (
    <g>
      <rect x={16} y={22} width={w} height={h} rx={18} fill="rgba(0,0,0,0.3)" />
      <rect x={0} y={0} width={w} height={h} rx={18} fill={old ? "#efe6cf" : "#f7f2e8"} />
      {old && <path d={`M${w - 120},0 L${w},0 L${w},120 Z`} fill="#e0d4b6" />}
      <text x={56} y={110} fontFamily="Barlow Condensed" fontWeight={800} fontSize={72} fill="#2C3B2E" letterSpacing={2}>
        {title}
      </text>
      <line x1={56} y1={142} x2={w - 56} y2={142} stroke="#2C3B2E" strokeWidth={4} />
      {rows.map((r, i) => {
        const y = 190 + i * rowH;
        const tick = r.tick ?? 0;
        return (
          <g key={i}>
            {(r.hi ?? 0) > 0 && <rect x={36} y={y - 8} width={w - 72} height={rowH - 10} rx={10} fill="#f2d36b" opacity={0.55 * (r.hi ?? 0)} />}
            <rect x={56} y={y + 6} width={50} height={50} rx={8} fill="none" stroke="#2C3B2E" strokeWidth={4} />
            {tick > 0 && (
              <path d="M66,34 L80,50 L100,18" transform={`translate(0,${y})`} stroke="#2a3a8a" strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray={60} strokeDashoffset={60 * (1 - tick)} />
            )}
            <text x={130} y={y + 48} fontFamily="Inter" fontWeight={600} fontSize={44} fill="#2C3B2E">
              {r.name}
            </text>
            {(r.strike ?? 0) > 0 && <line x1={124} y1={y + 32} x2={mix(124, w - 70, r.strike ?? 0)} y2={y + 32} stroke="#c23a32" strokeWidth={8} strokeLinecap="round" />}
            <line x1={56} y1={y + rowH - 14} x2={w - 56} y2={y + rowH - 14} stroke="#d9cfba" strokeWidth={3} />
          </g>
        );
      })}
      {foot && (
        <text x={56} y={h - 60} fontFamily="Barlow Condensed" fontWeight={800} fontSize={60} fill="#2C3B2E" opacity={footK} letterSpacing={2}>
          {foot}
        </text>
      )}
    </g>
  );
};

// Phone showing a plain park list page (local units, centre at 0,0; about 460 x 920).
export const ParkPhone: React.FC<{ head: string; big: string; sub: string; lines?: string[]; k?: number }> = ({ head, big, sub, lines = [], k = 1 }) => (
  <g>
    <rect x={-230} y={-460} width={460} height={920} rx={56} fill="#15171b" />
    <rect x={-208} y={-436} width={416} height={872} rx={38} fill="#f4f1ea" />
    <rect x={-208} y={-436} width={416} height={120} rx={38} fill="#2f4a36" />
    <rect x={-208} y={-360} width={416} height={44} fill="#2f4a36" />
    <text x={0} y={-350} textAnchor="middle" fontFamily="Inter" fontWeight={700} fontSize={38} fill="#ffffff">
      {head}
    </text>
    <g opacity={k}>
      <text x={0} y={-150} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={190} fill="#2C3B2E">
        {big}
      </text>
      <text x={0} y={-70} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={700} fontSize={50} fill="#2C3B2E" letterSpacing={2}>
        {sub}
      </text>
      {lines.map((l, i) => (
        <g key={i}>
          <rect x={-170} y={10 + i * 90} width={340} height={66} rx={12} fill="#e6e0d2" />
          <text x={-146} y={56 + i * 90} fontFamily="Inter" fontWeight={600} fontSize={32} fill="#2C3B2E">
            {l}
          </text>
        </g>
      ))}
    </g>
  </g>
);

// Clipboard held at chest height (local units of a hiker, hand position given).
export const HeldList: React.FC<{ hx: number; hy: number; rot?: number }> = ({ hx, hy, rot = -8 }) => (
  <g transform={`translate(${hx},${hy}) rotate(${rot})`}>
    <rect x={-6} y={-70} width={62} height={84} rx={5} fill="#7a5a3a" />
    <rect x={0} y={-62} width={50} height={70} rx={3} fill="#f7f2e8" />
    {[0, 1, 2, 3, 4].map((i) => (
      <line key={i} x1={8} y1={-50 + i * 12} x2={42} y2={-50 + i * 12} stroke="#8a8f84" strokeWidth={2} />
    ))}
    <rect x={14} y={-76} width={22} height={10} rx={3} fill="#b9bcc0" />
  </g>
);
