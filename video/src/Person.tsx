import React from "react";
import { hikerGeometry, hikerTransform, HikerProps } from "./Hiker";

export type Outfit = {
  skin: string;
  skinShade: string;
  hair: string;
  beard?: string | null;
  cap: string;
  capShade: string;
  jacket: string;
  jacketShade: string;
  pants: string;
  pantsShade: string;
  boot: string;
  sole: string;
  pack: string;
  packShade: string;
  pole: string;
  grip: string;
};

export const JAKE: Outfit = {
  skin: "#E2A98A",
  skinShade: "#C4876A",
  hair: "#4A3326",
  beard: "#5A3E2E",
  cap: "#C9B48E",
  capShade: "#A8946F",
  jacket: "#3F6B55",
  jacketShade: "#2D5141",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  boot: "#6B4630",
  sole: "#2A2421",
  pack: "#B5553A",
  packShade: "#8E3F2A",
  pole: "#B9C0C4",
  grip: "#222",
};

export const GUIDE: Outfit = {
  skin: "#B87C5C",
  skinShade: "#9A6247",
  hair: "#8E8A84",
  beard: "#8E8A84",
  cap: "#2F3B45",
  capShade: "#222c34",
  jacket: "#C2662E",
  jacketShade: "#9B4E20",
  pants: "#5B5546",
  pantsShade: "#45402F",
  boot: "#3E3128",
  sole: "#1d1916",
  pack: "#3E4F5C",
  packShade: "#2C3943",
  pole: "#B9C0C4",
  grip: "#222",
};

const capsule = (a: readonly number[], b: readonly number[], r1: number, r2: number) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const d = Math.hypot(dx, dy) || 1;
  const nx = -dy / d;
  const ny = dx / d;
  const ang = Math.atan2(dy, dx);
  const deg = (v: number) => v;
  // polygon with round caps approximated by arcs
  return `M${a[0] + nx * r1},${a[1] + ny * r1} L${b[0] + nx * r2},${b[1] + ny * r2} A${r2},${r2} 0 0 0 ${b[0] - nx * r2},${b[1] - ny * r2} L${a[0] - nx * r1},${a[1] - ny * r1} A${r1},${r1} 0 0 0 ${a[0] + nx * r1},${a[1] + ny * r1} Z${deg(ang) ? "" : ""}`;
};

const Limb: React.FC<{
  a: readonly number[];
  b: readonly number[];
  c: readonly number[];
  r: [number, number, number];
  fill: string;
  line?: string;
}> = ({ a, b, c, r, fill, line = "rgba(0,0,0,0.18)" }) => (
  <g>
    <path d={capsule(a, b, r[0], r[1])} fill={fill} stroke={line} strokeWidth={1.5} />
    <path d={capsule(b, c, r[1], r[2])} fill={fill} stroke={line} strokeWidth={1.5} />
    <circle cx={b[0]} cy={b[1]} r={r[1] - 0.8} fill={fill} />
  </g>
);

export const Person: React.FC<HikerProps & { outfit?: Outfit; light?: number; flip?: boolean; expression?: "tired" | "neutral" | "happy" }> = (p) => {
  const o = p.outfit ?? JAKE;
  const g = hikerGeometry(p);
  const { hip, sh, head, legs, arms, lean } = g;
  const u = [Math.sin(lean), -Math.cos(lean)];
  const n = [Math.cos(lean), Math.sin(lean)];
  const P = (b: readonly number[], a: number, f: number) => [b[0] + u[0] * a + n[0] * f, b[1] + u[1] * a + n[1] * f];
  const pt = (q: number[]) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`;
  const deg = (lean * 180) / Math.PI;
  const expr = p.expression ?? "neutral";

  const boot = (f: readonly number[], fill: string, sole: string) => (
    <g>
      <path
        d={`M${f[0] - 17},${f[1] - 30} L${f[0] + 6},${f[1] - 30} Q${f[0] + 10},${f[1] - 18} ${f[0] + 26},${f[1] - 13} Q${f[0] + 38},${f[1] - 9} ${f[0] + 38},${f[1] - 2} L${f[0] - 19},${f[1] - 2} Z`}
        fill={fill}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1.5}
      />
      <rect x={f[0] - 20} y={f[1] - 4} width={60} height={8} rx={3} fill={sole} />
      <path d={`M${f[0] - 4},${f[1] - 26} l10,6 M${f[0]},${f[1] - 20} l10,6`} stroke="rgba(255,255,255,0.35)" strokeWidth={2} />
    </g>
  );

  const pole = (a: (typeof arms)[number], near: boolean) => (
    <g>
      <line x1={a.hand[0]} y1={a.hand[1]} x2={a.tip[0]} y2={a.tip[1]} stroke={near ? o.pole : "#8f979b"} strokeWidth={near ? 6 : 5} strokeLinecap="round" />
      <line x1={a.tip[0]} y1={a.tip[1]} x2={a.tip[0] - (a.tip[0] - a.hand[0]) * 0.06} y2={a.tip[1] - (a.tip[1] - a.hand[1]) * 0.06} stroke="#333" strokeWidth={near ? 7 : 6} strokeLinecap="round" />
      <ellipse cx={a.tip[0] - (a.tip[0] - a.hand[0]) * 0.07} cy={a.tip[1] - (a.tip[1] - a.hand[1]) * 0.07} rx={11} ry={3} fill="#2a2a2a" />
      <rect x={a.hand[0] - 7} y={a.hand[1] - 24} width={14} height={40} rx={6} fill={o.grip} />
    </g>
  );

  const hand = (h: readonly number[], fill: string) => (
    <g>
      <ellipse cx={h[0]} cy={h[1]} rx={12.5} ry={11} fill={fill} stroke="rgba(0,0,0,0.2)" strokeWidth={1.2} />
      <path d={`M${h[0] - 6},${h[1] - 7} q8,-3 13,3`} stroke="rgba(0,0,0,0.18)" strokeWidth={1.5} fill="none" />
    </g>
  );

  // torso (jacket)
  const torso = `M${pt(P(hip, -8, -26))} Q${pt(P(hip, 60, -32))} ${pt(P(sh, 0, -28))} Q${pt(P(sh, 16, -6))} ${pt(P(sh, 6, 22))} Q${pt(P(hip, 92, 34))} ${pt(P(hip, 40, 28))} L${pt(P(hip, -8, 26))} Z`;
  const torsoShade = `M${pt(P(hip, -8, -26))} Q${pt(P(hip, 60, -32))} ${pt(P(sh, 0, -28))} L${pt(P(sh, -6, -6))} Q${pt(P(hip, 55, -10))} ${pt(P(hip, -8, -4))} Z`;
  const hem = `M${pt(P(hip, -10, -27))} L${pt(P(hip, -10, 27))} L${pt(P(hip, 4, 28))} L${pt(P(hip, 4, -28))} Z`;
  const zip = `M${pt(P(hip, -6, 25))} Q${pt(P(hip, 60, 33))} ${pt(P(sh, 6, 18))}`;
  const bpC = P(hip, 82, -46);
  const hx = head[0];
  const hy = head[1];

  const face = (
    <g>
      {/* neck */}
      <path d={capsule(P(sh, 0, 4), [hx - 4, hy + 14], 11, 10)} fill={o.skinShade} />
      {/* skull */}
      <circle cx={hx} cy={hy} r={25} fill={o.skin} />
      {/* jaw + chin */}
      <path d={`M${hx - 14},${hy + 10} Q${hx - 4},${hy + 30} ${hx + 16},${hy + 26} Q${hx + 26},${hy + 22} ${hx + 24},${hy + 12} L${hx + 10},${hy} Z`} fill={o.skin} />
      {/* nose */}
      <path d={`M${hx + 22},${hy - 4} Q${hx + 33},${hy + 7} ${hx + 25},${hy + 10} L${hx + 21},${hy + 9} Z`} fill={o.skin} />
      {/* beard */}
      {o.beard && (
        <path
          d={`M${hx - 12},${hy + 6} Q${hx - 6},${hy + 30} ${hx + 16},${hy + 28} Q${hx + 27},${hy + 24} ${hx + 25},${hy + 14} Q${hx + 18},${hy + 13} ${hx + 12},${hy + 16} Q${hx + 2},${hy + 16} ${hx - 2},${hy + 4} Z`}
          fill={o.beard}
          opacity={0.92}
        />
      )}
      {/* mouth */}
      {expr === "happy" ? (
        <path d={`M${hx + 13},${hy + 16} q6,4 10,-1`} stroke="#5a2e22" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      ) : (
        <path d={`M${hx + 14},${hy + 17} q5,${expr === "tired" ? -2 : 0} 9,0`} stroke="#5a2e22" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      )}
      {/* ear */}
      <ellipse cx={hx - 3} cy={hy + 3} rx={5.5} ry={7.5} fill={o.skinShade} />
      {/* hair back */}
      <path d={`M${hx - 25},${hy - 2} Q${hx - 26},${hy + 14} ${hx - 14},${hy + 16} L${hx - 9},${hy - 4} Z`} fill={o.hair} />
      {/* eye + brow */}
      <ellipse cx={hx + 14} cy={hy - 2} rx={2.6} ry={expr === "tired" ? 1.6 : 3} fill="#2a1f1a" />
      <path d={`M${hx + 9},${hy - 9} q6,${expr === "tired" ? 1 : -3} 11,${expr === "tired" ? 2 : 0}`} stroke={o.hair} strokeWidth={2.6} fill="none" strokeLinecap="round" />
      {expr === "tired" && <path d={`M${hx + 9},${hy + 3} q5,2 9,0`} stroke={o.skinShade} strokeWidth={1.8} fill="none" />}
      {/* cheek */}
      <ellipse cx={hx + 8} cy={hy + 8} rx={6} ry={4} fill="#d9826a" opacity={expr === "tired" ? 0.5 : 0.25} />
      {/* cap */}
      <path d={`M${hx - 27},${hy - 4} Q${hx - 26},${hy - 34} ${hx + 2},${hy - 35} Q${hx + 25},${hy - 33} ${hx + 26},${hy - 9} Z`} fill={o.cap} />
      <path d={`M${hx - 27},${hy - 4} Q${hx - 26},${hy - 34} ${hx + 2},${hy - 35} Q${hx - 12},${hy - 26} ${hx - 14},${hy - 6} Z`} fill={o.capShade} />
      <path d={`M${hx + 18},${hy - 10} L${hx + 52},${hy - 6} Q${hx + 44},${hy + 1} ${hx + 18},${hy - 3} Z`} fill={o.capShade} />
      <rect x={hx - 27} y={hy - 9} width={53} height={6} rx={2} fill={o.capShade} />
    </g>
  );

  const body = (
    <g>
      {p.poles !== false && pole(arms[0], false)}
      <Limb a={arms[0].s} b={arms[0].elbow} c={arms[0].hand} r={[12, 10.5, 9]} fill={o.jacketShade} />
      {hand(arms[0].hand, o.skinShade)}
      <Limb a={legs[1].hip} b={legs[1].knee} c={[legs[1].foot[0] - 2, legs[1].foot[1] - 24]} r={[19, 15, 13]} fill={o.pantsShade} />
      {boot(legs[1].foot, o.boot, o.sole)}
      {/* backpack */}
      <g transform={`translate(${bpC[0]},${bpC[1]}) rotate(${deg})`}>
        <rect x={-29} y={-58} width={58} height={112} rx={20} fill={o.pack} stroke="rgba(0,0,0,0.25)" strokeWidth={1.5} />
        <rect x={-29} y={-58} width={20} height={112} rx={13} fill={o.packShade} />
        <rect x={-25} y={-72} width={46} height={28} rx={12} fill={o.packShade} />
        <rect x={-40} y={-2} width={18} height={40} rx={8} fill={o.packShade} />
        <rect x={-24} y={10} width={48} height={5} rx={2} fill="rgba(0,0,0,0.25)" />
      </g>
      {/* torso */}
      <path d={torso} fill={o.jacket} stroke="rgba(0,0,0,0.22)" strokeWidth={1.5} strokeLinejoin="round" />
      <path d={torsoShade} fill={o.jacketShade} opacity={0.75} />
      <path d={hem} fill={o.jacketShade} />
      <path d={zip} stroke="rgba(0,0,0,0.3)" strokeWidth={2} fill="none" />
      {/* shoulder strap */}
      <path d={`M${pt(P(sh, 2, -8))} Q${pt(P(sh, -40, 14))} ${pt(P(hip, 30, 18))}`} stroke={o.packShade} strokeWidth={8} fill="none" strokeLinecap="round" />
      {face}
      <Limb a={legs[0].hip} b={legs[0].knee} c={[legs[0].foot[0] - 2, legs[0].foot[1] - 24]} r={[20, 16, 13.5]} fill={o.pants} />
      <path d={capsule(legs[0].knee, legs[0].knee, 6, 6)} fill={o.pantsShade} opacity={0.5} />
      {boot(legs[0].foot, o.boot, o.sole)}
      {p.poles !== false && pole(arms[1], true)}
      <Limb a={arms[1].s} b={arms[1].elbow} c={arms[1].hand} r={[13, 11, 9.5]} fill={o.jacket} />
      {hand(arms[1].hand, o.skin)}
      <rect x={arms[1].hand[0] - 4} y={arms[1].hand[1] - 28} width={8} height={10} rx={3} fill={o.grip} />
    </g>
  );

  return (
    <g transform={p.flip ? `translate(${2 * p.x},0) scale(-1,1)` : undefined}>
      {/* ground shadow */}
      <ellipse cx={p.x + 20 * (p.scale ?? 1)} cy={p.y + 2} rx={90 * (p.scale ?? 1)} ry={12 * (p.scale ?? 1)} fill="rgba(0,0,0,0.22)" />
      <g transform={hikerTransform(p)}>{body}</g>
    </g>
  );
};
