import { Easing, interpolate } from "remotion";

export const C = {
  forest: "#2C3B2E",
  forestDeep: "#1B2620",
  clay: "#B85C38",
  clayHot: "#E0784A",
  stone: "#F5F1EA",
  paper: "#EFE8DC",
  charcoal: "#3A3A38",
  ink: "#1F2421",
  sage: "#8A9A7E",
  night: "#101814",
};

export const FPS = 30;

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const outExpo = Easing.bezier(0.16, 1, 0.3, 1);
export const inOut = Easing.bezier(0.65, 0, 0.35, 1);

// time helper: seconds -> value with clamp & easing
export const at = (
  t: number,
  input: number[],
  output: number[],
  easing = outExpo,
) => interpolate(t, input, output, { ...clamp, easing });

// deterministic value noise
const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};
export const noise1 = (x: number, seed: number) => {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash(i + seed * 1013) * (1 - u) + hash(i + 1 + seed * 1013) * u;
};
export const fbm = (x: number, seed: number, oct = 5) => {
  let v = 0;
  let a = 0.5;
  let fr = 1;
  for (let o = 0; o < oct; o++) {
    v += a * noise1(x * fr, seed + o * 7);
    a *= 0.5;
    fr *= 2.03;
  }
  return v;
};

// mountain ridge path. width covers [-pad, W+pad]
export const ridgePath = (
  seed: number,
  W: number,
  H: number,
  baseY: number,
  amp: number,
  scale: number,
  shift = 0,
  peakBias = 0,
) => {
  const pts: string[] = [];
  const pad = 300;
  for (let x = -pad; x <= W + pad; x += 12) {
    const n = fbm((x + shift) / scale, seed);
    const ridgeN = 1 - Math.abs(2 * n - 1); // sharper peaks
    const y = baseY - (ridgeN * 0.7 + n * 0.3) * amp - peakBias * Math.exp(-(((x - W * 0.62) / (W * 0.25)) ** 2));
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M${-pad},${H + 50} L${pts.join(" L")} L${W + pad},${H + 50} Z`;
};

// two-bone IK: returns joint position
export const ik = (
  ax: number,
  ay: number,
  bx: number,
  by: number,
  l1: number,
  l2: number,
  bend: number,
) => {
  let dx = bx - ax;
  let dy = by - ay;
  let d = Math.hypot(dx, dy);
  const maxD = l1 + l2 - 0.01;
  if (d > maxD) {
    dx = (dx / d) * maxD;
    dy = (dy / d) * maxD;
    d = maxD;
  }
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  const mx = ax + (dx * a) / d;
  const my = ay + (dy * a) / d;
  return [mx + (bend * h * -dy) / d, my + (bend * h * dx) / d] as const;
};

export const mix = (a: number, b: number, k: number) => a + (b - a) * k;
