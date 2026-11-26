// Shared bits for cold-weather clothing stories (v221-v223): shorts, wet patches, snow on shoulders,
// a generic face close-up and a fabric close-up with snowflakes landing and melting.
import React from "react";
import { HikerProps, hikerGeometry, hikerTransform } from "./Hiker";
import { Outfit } from "./Person";
import { mix } from "./lib";

// Shorts drawn over bare legs (set the outfit's pants to the skin colours).
export const Shorts: React.FC<{ p: HikerProps; col: string; shade: string }> = ({ p, col, shade }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)}>
      {[1, 0].map((i) => {
        const l = g.legs[i];
        const e = [mix(l.hip[0], l.knee[0], 0.62), mix(l.hip[1], l.knee[1], 0.62)];
        return <line key={i} x1={l.hip[0]} y1={l.hip[1] - 4} x2={e[0]} y2={e[1]} stroke={i ? shade : col} strokeWidth={42} strokeLinecap="round" />;
      })}
      <rect x={g.hip[0] - 26} y={g.hip[1] - 14} width={52} height={24} rx={10} fill={col} />
    </g>
  );
};

// Dark wet patches on the shirt (k 0..1).
export const WetPatch: React.FC<{ p: HikerProps; k: number }> = ({ p, k }) => {
  const g = hikerGeometry(p);
  const mx = mix(g.hip[0], g.sh[0], 0.5);
  const my = mix(g.hip[1], g.sh[1], 0.5);
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      <ellipse cx={mx + 8} cy={my} rx={18} ry={34} fill="rgba(10,20,30,0.32)" />
      <ellipse cx={g.sh[0] + 6} cy={g.sh[1] + 14} rx={14} ry={12} fill="rgba(10,20,30,0.28)" />
    </g>
  );
};

// Snow resting on the shoulders, cap and pack (k 0..1).
export const SnowCoat: React.FC<{ p: HikerProps; k: number }> = ({ p, k }) => {
  const g = hikerGeometry(p);
  const [hx, hy] = g.head;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      <ellipse cx={g.sh[0] + 4} cy={g.sh[1] - 22} rx={26 * k + 6} ry={7} fill="#f6f9fb" />
      <ellipse cx={hx} cy={hy - 33} rx={22 * k + 4} ry={6} fill="#f6f9fb" />
      <ellipse cx={g.sh[0] - 46} cy={g.sh[1] - 26} rx={22 * k + 4} ry={6} fill="#f6f9fb" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={g.sh[0] - 10 + i * 8} cy={mix(g.sh[1], g.hip[1], 0.2 + i * 0.13)} r={3} fill="#ffffff" opacity={0.8} />
      ))}
    </g>
  );
};

// Shell jacket drawn over the person's torso (a lighter, shinier layer). Pass the same p.
export const ShellSheen: React.FC<{ p: HikerProps }> = ({ p }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${g.sh[0] + 2},${g.sh[1] - 18} Q${mix(g.hip[0], g.sh[0], 0.5) + 18},${mix(g.hip[1], g.sh[1], 0.5)} ${g.hip[0] + 14},${g.hip[1] - 6}`} stroke="rgba(255,255,255,0.35)" strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  );
};

// Close-up face, three-quarter view to the right (local units, scaled by s).
// shiver: 0..1 jitter + pale lips; sweat: 0..1 drops on the forehead; hat: beanie colour or null (then hair on top).
export const FaceCU: React.FC<{
  cx: number;
  cy: number;
  s: number;
  o: Outfit;
  t: number;
  hat?: [string, string] | null;
  shiver?: number;
  sweat?: number;
  eyes?: "tired" | "happy" | "neutral" | "squint";
  collar?: string;
  collarShade?: string;
  wet?: number;
}> = ({ cx, cy, s, o, t, hat = null, shiver = 0, sweat = 0, eyes = "neutral", collar, collarShade, wet = 0 }) => {
  const jx = shiver * Math.sin(t * 70) * 3;
  const c1 = collar ?? o.jacket;
  const c2 = collarShade ?? o.jacketShade;
  return (
    <g transform={`translate(${cx + jx},${cy}) scale(${s})`}>
      {o.ponytail && <path d="M-70,-60 Q-150,-30 -130,90 Q-120,130 -96,100 Q-100,20 -60,-20 Z" fill={o.ponytail} />}
      <path d="M-200,190 Q-140,120 -50,118 L80,118 Q170,120 220,200 L230,320 L-210,320 Z" fill={c1} />
      <path d="M-50,118 L80,118 L70,200 L-40,200 Z" fill={c2} />
      {wet > 0 && <ellipse cx={20} cy={230} rx={110} ry={70} fill="rgba(10,20,30,0.3)" opacity={wet} />}
      <path d="M-20,90 L50,90 L56,130 L-26,130 Z" fill={o.skinShade} />
      <ellipse cx={20} cy={4} rx={84} ry={94} fill={o.skin} />
      <ellipse cx={-34} cy={12} rx={16} ry={22} fill={o.skinShade} />
      <ellipse cx={70} cy={30} rx={26} ry={16} fill="#d9826a" opacity={0.25} />
      {[0, 46].map((dx, i) => (
        <g key={i}>
          {eyes === "happy" ? (
            <path d={`M${2 + dx},-14 q9,-9 18,0`} stroke="#1c1410" strokeWidth={4.5} fill="none" strokeLinecap="round" />
          ) : eyes === "squint" ? (
            <path d={`M${2 + dx},-12 l18,0`} stroke="#1c1410" strokeWidth={5} fill="none" strokeLinecap="round" />
          ) : (
            <ellipse cx={11 + dx} cy={-12} rx={6.5} ry={eyes === "tired" ? 4 : 8} fill="#1c1410" />
          )}
          <path d={eyes === "squint" || eyes === "tired" ? `M${dx - 2},-34 q12,4 24,-2` : `M${dx - 2},-38 q12,-6 24,0`} stroke={o.hair} strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      ))}
      <path d="M44,0 q12,18 0,26" stroke={o.skinShade} strokeWidth={4} fill="none" strokeLinecap="round" />
      {eyes === "happy" ? (
        <path d="M20,54 q16,12 32,0" stroke="#4a2418" strokeWidth={4} fill="none" strokeLinecap="round" />
      ) : shiver > 0.3 ? (
        <path d={`M20,56 l6,${3 + Math.sin(t * 60) * 2} l6,-4 l6,4 l6,-4 l6,4`} stroke="#7a5a5a" strokeWidth={4} fill="none" strokeLinecap="round" />
      ) : (
        <path d="M22,56 q14,2 28,0" stroke="#4a2418" strokeWidth={4} fill="none" strokeLinecap="round" />
      )}
      {/* sweat drops */}
      {sweat > 0 &&
        [0, 1, 2].map((i) => {
          const k = (t * 0.9 + i / 3) % 1;
          return <path key={i} d="M0,-12 Q9,2 0,10 Q-9,2 0,-12 Z" fill="#cfe9f7" stroke="#8fbcd4" strokeWidth={2} transform={`translate(${-10 + i * 40},${-60 + k * 70})`} opacity={sweat * (1 - k)} />;
        })}
      {hat ? (
        <g>
          <path d="M-92,-30 Q-96,-140 20,-146 Q130,-140 118,-30 Z" fill={hat[0]} />
          <rect x={-98} y={-52} width={222} height={34} rx={14} fill={hat[1]} />
          {Array.from({ length: 7 }, (_, i) => (
            <line key={i} x1={-70 + i * 30} y1={-130 + Math.abs(i - 3) * 4} x2={-74 + i * 30} y2={-56} stroke={hat[1]} strokeWidth={4} opacity={0.6} />
          ))}
        </g>
      ) : (
        <path d="M-84,10 Q-100,-110 20,-112 Q110,-110 104,-44 Q60,-70 -10,-60 Q-50,-50 -60,20 Z" fill={o.hair} />
      )}
    </g>
  );
};

// Breath cloud in front of a close-up face (screen units).
export const BreathCU: React.FC<{ x: number; y: number; t: number; s?: number }> = ({ x, y, t, s = 1 }) => {
  const k = (t * 0.8) % 1;
  return <ellipse cx={x + k * 160 * s} cy={y - k * 60 * s} rx={(30 + k * 90) * s} ry={(20 + k * 60) * s} fill="#f2f4f6" opacity={0.45 * (1 - k)} />;
};
