import React from "react";
import { ik } from "./lib";

export type HikerProps = {
  x: number;
  y: number; // ground point under hip
  scale?: number;
  phase?: number; // walk cycle radians
  walk?: number; // 0 standing, 1 full stride
  lean?: number; // radians forward
  poleLen?: number; // in local units (correct ~ 240, too long ~ 320)
  handOverride?: [number, number] | null; // near hand fixed position (local)
  poles?: boolean;
  color?: string;
  rim?: string | null;
  slope?: number; // radians, ground tilt (uphill to the right)
  breathe?: number;
  outline?: boolean; // line-art mode
  lineWidth?: number;
};

const G = 182; // ground y in local units (hip at 0)

const Limb: React.FC<{ pts: ReadonlyArray<readonly number[]>; w1: number; w2: number; color: string; outline?: boolean; lw?: number }> = ({
  pts,
  w1,
  w2,
  color,
  outline,
  lw = 4,
}) => {
  const [a, b, c] = pts;
  if (outline) {
    return (
      <path
        d={`M${a[0]},${a[1]} L${b[0]},${b[1]} L${c[0]},${c[1]}`}
        stroke={color}
        strokeWidth={lw}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }
  return (
    <g stroke={color} strokeLinecap="round" fill="none">
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} strokeWidth={w1} />
      <line x1={b[0]} y1={b[1]} x2={c[0]} y2={c[1]} strokeWidth={w2} />
    </g>
  );
};

export const hikerGeometry = (p: HikerProps) => {
  const phase = p.phase ?? 0;
  const walk = p.walk ?? 0;
  const lean = (p.lean ?? 0.08) + walk * 0.06;
  const bob = walk * 4 * Math.abs(Math.sin(phase)) + (p.breathe ?? 0);
  const hip: [number, number] = [0, bob - walk * 4];
  const T = 122;
  const sh: [number, number] = [hip[0] + Math.sin(lean) * T, hip[1] - Math.cos(lean) * T];
  const head: [number, number] = [sh[0] + Math.sin(lean) * 36 + 10, sh[1] - Math.cos(lean) * 36];

  const legs = [0, Math.PI].map((off) => {
    const ph = phase + off;
    const S = 46 * walk;
    const fx = S * Math.sin(ph) + 6;
    const lift = 20 * walk * Math.max(0, Math.cos(ph));
    const foot: [number, number] = [fx, G - lift];
    const knee = ik(hip[0], hip[1], foot[0], foot[1], 94, 92, -1);
    return { hip, knee, foot };
  });

  const L = p.poleLen ?? 240;
  const arms = [Math.PI, 0].map((off, i) => {
    const ph = phase + off;
    const swing = Math.sin(ph) * walk;
    let tipX = 70 + 52 * swing;
    let a = -0.12 + 0.22 * swing; // pole angle from vertical (+ = top leans back)
    let hand: [number, number] = [tipX - Math.sin(a) * L, G - Math.cos(a) * L];
    let LL = L;
    if (p.handOverride) {
      const ho = p.handOverride;
      hand = i === 1 ? ho : [ho[0] - 14, ho[1] + 4];
      tipX = hand[0] + (i === 1 ? 26 : 10);
      a = Math.atan2(tipX - hand[0], G - hand[1]);
      LL = Math.hypot(tipX - hand[0], G - hand[1]);
    }
    const s: [number, number] = [sh[0] - 4 + (i === 0 ? -6 : 4), sh[1] + 10];
    const elbow = ik(s[0], s[1], hand[0], hand[1], 68, 64, 1);
    const tip: [number, number] = [hand[0] + Math.sin(a) * LL, hand[1] + Math.cos(a) * LL];
    return { s, elbow, hand, tip, a };
  });
  return { hip, sh, head, legs, arms, lean };
};

export const Hiker: React.FC<HikerProps> = (p) => {
  const g = hikerGeometry(p);
  const color = p.color ?? "#111815";
  const body = (col: string, dx = 0, dy = 0) => {
    const { hip, sh, head, legs, arms, lean } = g;
    const u = [Math.sin(lean), -Math.cos(lean)];
    const n = [Math.cos(lean), Math.sin(lean)];
    const P = (b: readonly number[], a: number, f: number) => `${(b[0] + u[0] * a + n[0] * f).toFixed(1)},${(b[1] + u[1] * a + n[1] * f).toFixed(1)}`;
    const torso = `M${P(hip, -6, -25)} Q${P(hip, 60, -30)} ${P(sh, 0, -27)} Q${P(sh, 14, -6)} ${P(sh, 4, 20)} Q${P(hip, 92, 34)} ${P(hip, 40, 27)} L${P(hip, -6, 24)} Z`;
    const deg = (lean * 180) / Math.PI;
    const bpC = [hip[0] + u[0] * 78 - n[0] * 50, hip[1] + u[1] * 78 - n[1] * 50];
    const boot = (f: readonly number[]) =>
      `M${f[0] - 18},${f[1] - 20} L${f[0] + 8},${f[1] - 20} Q${f[0] + 30},${f[1] - 12} ${f[0] + 36},${f[1] - 2} L${f[0] + 36},${f[1] + 2} L${f[0] - 20},${f[1] + 2} Z`;
    const pole = (a: (typeof arms)[number], w: number) => (
      <>
        <line x1={a.hand[0]} y1={a.hand[1] - 16} x2={a.tip[0]} y2={a.tip[1]} stroke={col} strokeWidth={w} strokeLinecap="round" />
        <rect x={a.hand[0] - 8} y={a.hand[1] - 26} width={16} height={40} rx={7} fill={col} />
      </>
    );
    return (
      <g transform={`translate(${dx},${dy})`}>
        {p.poles !== false && pole(arms[0], 7)}
        <Limb pts={[arms[0].s, arms[0].elbow, arms[0].hand]} w1={24} w2={19} color={col} />
        <circle cx={arms[0].hand[0]} cy={arms[0].hand[1]} r={11} fill={col} />
        <Limb pts={[legs[1].hip, legs[1].knee, legs[1].foot]} w1={38} w2={29} color={col} />
        <path d={boot(legs[1].foot)} fill={col} stroke={col} strokeWidth={6} strokeLinejoin="round" />
        {/* backpack */}
        <g transform={`translate(${bpC[0]},${bpC[1]}) rotate(${deg})`}>
          <rect x={-31} y={-64} width={62} height={124} rx={22} fill={col} />
          <rect x={-27} y={-78} width={50} height={30} rx={12} fill={col} />
          <rect x={-40} y={-6} width={18} height={44} rx={8} fill={col} />
        </g>
        <path d={torso} fill={col} stroke={col} strokeWidth={4} strokeLinejoin="round" />
        <line x1={sh[0] + n[0] * 2} y1={sh[1] + n[1] * 2} x2={head[0] - 6} y2={head[1] + 12} stroke={col} strokeWidth={20} strokeLinecap="round" />
        <circle cx={head[0]} cy={head[1]} r={26} fill={col} />
        <path
          d={`M${head[0] - 27},${head[1] - 4} Q${head[0] - 24},${head[1] - 36} ${head[0] + 4},${head[1] - 34} Q${head[0] + 26},${head[1] - 30} ${head[0] + 27},${head[1] - 8} L${head[0] + 54},${head[1] - 4} Q${head[0] + 40},${head[1] + 3} ${head[0] + 20},${head[1] + 1} Z`}
          fill={col}
        />
        <Limb pts={[legs[0].hip, legs[0].knee, legs[0].foot]} w1={40} w2={30} color={col} />
        <path d={boot(legs[0].foot)} fill={col} stroke={col} strokeWidth={6} strokeLinejoin="round" />
        {p.poles !== false && pole(arms[1], 8)}
        <Limb pts={[arms[1].s, arms[1].elbow, arms[1].hand]} w1={25} w2={20} color={col} />
        <circle cx={arms[1].hand[0]} cy={arms[1].hand[1]} r={12} fill={col} />
      </g>
    );
  };
  return (
    <g transform={hikerTransform(p)}>
      {p.rim && body(p.rim, -3.5, -2.5)}
      {body(color)}
    </g>
  );
};

export const hikerTransform = (p: HikerProps) =>
  `translate(${p.x},${p.y}) rotate(${((p.slope ?? 0) * -180) / Math.PI}) scale(${p.scale ?? 1}) translate(0,${-G})`;
