// Illustrated dog (side view, facing right) for the dog-hiking videos. Screen units: (x, y) is the ground under the body.
import React from "react";

export type DogLook = { coat: string; shade: string; belly: string; ear: string; collar: string; nose: string };

export const JUNIPER: DogLook = { coat: "#C98B4A", shade: "#A46B33", belly: "#E6BD86", ear: "#8E5A2A", collar: "#2F7F86", nose: "#2a1d14" };

// Collar point in screen units (where a leash clips on).
export const dogCollar = (x: number, y: number, s: number, flip = false): [number, number] => [x + (flip ? -1 : 1) * 84 * s, y - 132 * s];

export const Dog: React.FC<{
  x: number;
  y: number;
  s?: number;
  phase?: number;
  walk?: number;
  look?: DogLook;
  mood?: "happy" | "sad" | "alert";
  tailWag?: number;
  headUp?: number; // 0 level, 1 looking up
  flip?: boolean;
}> = ({ x, y, s = 1, phase = 0, walk = 0, look = JUNIPER, mood = "happy", tailWag = 0, headUp = 0, flip = false }) => {
  const L = look;
  const sw = (o: number) => Math.sin(phase + o) * 0.42 * walk;
  const bob = Math.abs(Math.sin(phase)) * 4 * walk;
  const leg = (hx: number, a: number, col: string, w: number) => {
    const kx = hx + Math.sin(a) * 40;
    const ky = -50 + Math.cos(a) * 4;
    const px = hx + Math.sin(a) * 66;
    const lift = Math.max(0, Math.sin(a)) * 10 * walk;
    return (
      <g>
        <path d={`M${hx},-86 L${kx},${ky} L${px},${-lift}`} stroke={col} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <ellipse cx={px + 6} cy={-lift - 2} rx={13} ry={7} fill={col} />
      </g>
    );
  };
  const tail = Math.sin(tailWag) * 16 + (mood === "sad" ? 40 : 0);
  const earDrop = mood === "sad" ? 14 : mood === "alert" ? -8 : 0;
  const hy = -150 - headUp * 18;
  const hr = headUp * -18;
  return (
    <g transform={`translate(${x},${y - bob}) scale(${flip ? -s : s},${s})`}>
      <ellipse cx={0} cy={bob / s + 2} rx={110} ry={10} fill="rgba(0,0,0,0.25)" />
      {/* far legs */}
      {leg(56, sw(Math.PI), L.shade, 20)}
      {leg(-58, sw(0), L.shade, 22)}
      {/* tail */}
      <path d={`M-82,-104 Q-118,-120 ${-128 + tail * 0.2},${-150 + tail}`} stroke={L.coat} strokeWidth={16} strokeLinecap="round" fill="none" />
      {/* body */}
      <ellipse cx={0} cy={-98} rx={92} ry={36} fill={L.coat} />
      <ellipse cx={8} cy={-74} rx={70} ry={14} fill={L.belly} opacity={0.8} />
      <ellipse cx={-50} cy={-108} rx={38} ry={22} fill={L.shade} opacity={0.35} />
      {/* near legs */}
      {leg(62, sw(0), L.coat, 22)}
      {leg(-52, sw(Math.PI), L.coat, 24)}
      {/* neck + head */}
      <g transform={`rotate(${hr},78,-120)`}>
        <path d={`M48,-118 Q70,-150 92,${hy + 4} L112,${hy + 22} Q96,-110 78,-90 Z`} fill={L.coat} />
        <path d={`M70,-122 Q84,-128 98,-126`} stroke={L.collar} strokeWidth={12} strokeLinecap="round" fill="none" />
        <circle cx={86} cy={-122} r={5} fill="#e7c25a" />
        <circle cx={102} cy={hy} r={32} fill={L.coat} />
        <ellipse cx={136} cy={hy + 10} rx={28} ry={16} fill={L.coat} />
        <ellipse cx={132} cy={hy + 18} rx={22} ry={8} fill={L.belly} opacity={0.8} />
        <ellipse cx={162} cy={hy + 4} rx={8} ry={6.5} fill={L.nose} />
        <circle cx={114} cy={hy - 8} r={5} fill="#1d140e" />
        <circle cx={116} cy={hy - 10} r={1.6} fill="#fff" />
        {mood === "sad" ? <path d={`M106,${hy - 18} L122,${hy - 14}`} stroke={L.ear} strokeWidth={4} strokeLinecap="round" /> : null}
        {mood === "happy" ? <ellipse cx={142} cy={hy + 30} rx={8} ry={12} fill="#d9667a" /> : null}
        <path d={`M86,${hy - 22} Q72,${hy - 26} 70,${hy - 8 + earDrop} Q72,${hy + 22 + earDrop} 86,${hy + 18 + earDrop} Q96,${hy - 4} 86,${hy - 22} Z`} fill={L.ear} />
      </g>
    </g>
  );
};
