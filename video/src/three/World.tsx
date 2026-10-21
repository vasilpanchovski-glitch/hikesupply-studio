// Low-poly 3D world for the 3D story videos: floating "park" islands above a sea of clouds,
// a 3D hiker, flags, count rings and a swirl of photos. Everything is driven by time t (seconds),
// so the render is deterministic frame by frame.
import React, { useMemo } from "react";
import * as THREE from "three";

export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const smooth = (x: number) => {
  const k = clamp01(x);
  return k * k * (3 - 2 * k);
};
export const ramp = (t: number, a: number, b: number) => smooth((t - a) / (b - a));

export const rng = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let x = s;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

const GREY = new THREE.Color("#8d918f");
// Mix a colour toward grey: k = 0 full colour, 1 fully faded ("forgotten").
export const fade = (hex: string, k: number) => {
  const c = new THREE.Color(hex);
  return "#" + c.lerp(GREY, clamp01(k) * 0.85).getHexString();
};

// ---------- small pieces ----------

export const Pine: React.FC<{ p: [number, number, number]; h?: number; f?: number }> = ({ p, h = 1, f = 0 }) => (
  <group position={p} scale={h}>
    <mesh position={[0, 0.12, 0]}>
      <cylinderGeometry args={[0.05, 0.06, 0.25, 5]} />
      <meshStandardMaterial color={fade("#6b4a33", f)} flatShading />
    </mesh>
    <mesh position={[0, 0.45, 0]}>
      <coneGeometry args={[0.3, 0.55, 6]} />
      <meshStandardMaterial color={fade("#2f5a40", f)} flatShading />
    </mesh>
    <mesh position={[0, 0.75, 0]}>
      <coneGeometry args={[0.22, 0.45, 6]} />
      <meshStandardMaterial color={fade("#3a6b4a", f)} flatShading />
    </mesh>
  </group>
);

const Peak: React.FC<{ p: [number, number, number]; r: number; h: number; f: number; rock?: string; snow?: boolean }> = ({ p, r, h, f, rock = "#7c8079", snow = true }) => (
  <group position={p}>
    <mesh position={[0, h / 2, 0]}>
      <coneGeometry args={[r, h, 5]} />
      <meshStandardMaterial color={fade(rock, f)} flatShading />
    </mesh>
    {snow && (
      <mesh position={[0, h * 0.82, 0]}>
        <coneGeometry args={[r * 0.36, h * 0.37, 5]} />
        <meshStandardMaterial color={fade("#f4f6f7", f * 0.5)} flatShading />
      </mesh>
    )}
  </group>
);

const Mesa: React.FC<{ p: [number, number, number]; r: number; h: number; f: number }> = ({ p, r, h, f }) => (
  <group position={p}>
    <mesh position={[0, h / 2, 0]}>
      <cylinderGeometry args={[r * 0.8, r, h, 6]} />
      <meshStandardMaterial color={fade("#c2603a", f)} flatShading />
    </mesh>
    <mesh position={[0, h * 0.78, 0]}>
      <cylinderGeometry args={[r * 0.81, r * 0.86, h * 0.12, 6]} />
      <meshStandardMaterial color={fade("#e3a06a", f)} flatShading />
    </mesh>
  </group>
);

export type IslandKind = "peaks" | "forest" | "zion" | "lake" | "geyser" | "arch";

// One national park: a floating rock island with its own landscape on top.
export const Island: React.FC<{ pos: [number, number, number]; kind: IslandKind; f: number; bob: number; seed: number }> = ({ pos, kind, f, bob, seed }) => {
  const trees = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: kind === "forest" ? 16 : 7 }, () => {
      const a = r() * Math.PI * 2;
      const d = 0.7 + r() * 1.3;
      return { x: Math.cos(a) * d, z: Math.sin(a) * d, h: 0.7 + r() * 0.6 };
    });
  }, [kind, seed]);
  const grass = kind === "zion" ? "#9a9a5a" : kind === "geyser" ? "#8f9b62" : "#6f8f4f";
  return (
    <group position={[pos[0], pos[1] + Math.sin(bob) * 0.08, pos[2]]}>
      {/* rock underside */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[2.25, 1.0, 1.5, 7]} />
        <meshStandardMaterial color={fade(kind === "zion" || kind === "arch" ? "#9c5536" : "#6d5847", f)} flatShading />
      </mesh>
      <mesh position={[0, -1.75, 0]}>
        <coneGeometry args={[1.0, 1.0, 7]} />
        <meshStandardMaterial color={fade("#5a4738", f)} flatShading />
      </mesh>
      {/* grass top */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[2.3, 2.25, 0.18, 7]} />
        <meshStandardMaterial color={fade(grass, f)} flatShading />
      </mesh>
      {kind === "peaks" && (
        <>
          <Peak p={[-0.4, 0.1, -0.5]} r={1.0} h={2.3} f={f} />
          <Peak p={[0.7, 0.1, -0.2]} r={0.75} h={1.6} f={f} />
        </>
      )}
      {kind === "zion" && (
        <>
          <Mesa p={[-0.9, 0.1, -0.7]} r={0.85} h={1.8} f={f} />
          <Mesa p={[0.6, 0.1, -1.0]} r={0.7} h={2.3} f={f} />
          <Mesa p={[1.4, 0.1, 0.1]} r={0.45} h={1.2} f={f} />
          {/* river through the canyon */}
          <mesh position={[-0.1, 0.15, 0.4]} rotation={[-Math.PI / 2, 0, 0.5]}>
            <planeGeometry args={[0.35, 3.6]} />
            <meshStandardMaterial color={fade("#5aa0c0", f)} />
          </mesh>
        </>
      )}
      {kind === "lake" && (
        <>
          <mesh position={[0.2, 0.15, 0.1]}>
            <cylinderGeometry args={[1.0, 1.0, 0.04, 9]} />
            <meshStandardMaterial color={fade("#3f8fb8", f)} />
          </mesh>
          <Peak p={[-0.6, 0.1, -1.1]} r={0.8} h={2.0} f={f} />
        </>
      )}
      {kind === "geyser" && (
        <>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.7, 0.75, 0.05, 10]} />
            <meshStandardMaterial color={fade("#2fb5b0", f)} />
          </mesh>
          <mesh position={[0, 0.16, 0]}>
            <cylinderGeometry args={[0.9, 0.95, 0.03, 10]} />
            <meshStandardMaterial color={fade("#e6a23c", f)} />
          </mesh>
          <mesh position={[0, 0.6 + Math.sin(bob * 3) * 0.08, 0]}>
            <coneGeometry args={[0.18, 1.0, 6]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
          </mesh>
        </>
      )}
      {kind === "arch" && (
        <mesh position={[0, 0.15, -0.4]}>
          <torusGeometry args={[0.8, 0.22, 5, 10, Math.PI]} />
          <meshStandardMaterial color={fade("#c2603a", f)} flatShading />
        </mesh>
      )}
      {trees.map((tr, i) => (
        <Pine key={i} p={[tr.x, 0.12, tr.z]} h={tr.h} f={f} />
      ))}
    </group>
  );
};

// Flag planted on a park: rises with k (0..1).
export const Flag: React.FC<{ p: [number, number, number]; k: number; t: number }> = ({ p, k, t }) => {
  if (k <= 0.001) return null;
  const wave = Math.sin(t * 6) * 0.15;
  return (
    <group position={p} scale={[1, smooth(k), 1]}>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.2, 5]} />
        <meshStandardMaterial color="#3a3a36" />
      </mesh>
      <mesh position={[0.22, 1.05, 0]} rotation={[0, wave, 0]}>
        <boxGeometry args={[0.44, 0.26, 0.02]} />
        <meshStandardMaterial color="#B85C38" />
      </mesh>
    </group>
  );
};

// Ring that lights up under a park once it is counted.
export const CountRing: React.FC<{ p: [number, number, number]; k: number }> = ({ p, k }) => (
  <mesh position={p} rotation={[-Math.PI / 2, 0, 0]}>
    <torusGeometry args={[2.6, 0.07 + 0.05 * k, 4, 40]} />
    <meshStandardMaterial color={k > 0.01 ? "#f2c14e" : "#d9dcd6"} emissive={"#f2c14e"} emissiveIntensity={k * 0.8} transparent opacity={0.25 + 0.75 * k} />
  </mesh>
);

// Low-poly hiker with rounded shapes. walk: 0..1 stride strength, phase: stride phase, look: head turn (radians).
export const Hiker3D: React.FC<{ p: [number, number, number]; rotY?: number; walk?: number; phase?: number; look?: number; scale?: number; armUp?: number }> = ({
  p,
  rotY = 0,
  walk = 0,
  phase = 0,
  look = 0,
  scale = 1,
  armUp = 0,
}) => {
  const sw = Math.sin(phase) * 0.6 * walk;
  const bounce = Math.abs(Math.sin(phase)) * 0.03 * walk;
  const skin = "#d9a07a";
  const jacket = "#2F62B0";
  const hair = "#4a2f1f";
  return (
    <group position={[p[0], p[1] + bounce, p[2]]} rotation={[0, rotY, 0]} scale={scale}>
      {/* legs: trousers + boots */}
      {[-1, 1].map((s) => (
        <group key={s} position={[0.075 * s, 0.44, 0]} rotation={[sw * s, 0, 0]}>
          <mesh position={[0, -0.19, 0]}>
            <capsuleGeometry args={[0.055, 0.3, 4, 8]} />
            <meshStandardMaterial color="#47524a" flatShading />
          </mesh>
          <mesh position={[0, -0.4, 0.035]}>
            <boxGeometry args={[0.12, 0.08, 0.2]} />
            <meshStandardMaterial color="#5a3d2b" flatShading />
          </mesh>
        </group>
      ))}
      {/* torso */}
      <mesh position={[0, 0.68, 0]}>
        <capsuleGeometry args={[0.15, 0.22, 4, 10]} />
        <meshStandardMaterial color={jacket} flatShading />
      </mesh>
      {/* jacket zip */}
      <mesh position={[0, 0.68, 0.147]}>
        <boxGeometry args={[0.012, 0.3, 0.01]} />
        <meshStandardMaterial color="#1f3f75" />
      </mesh>
      {/* backpack + straps */}
      <mesh position={[0, 0.72, -0.17]}>
        <capsuleGeometry args={[0.12, 0.16, 4, 8]} />
        <meshStandardMaterial color="#B85C38" flatShading />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[0.085 * s, 0.76, 0.13]}>
          <boxGeometry args={[0.035, 0.26, 0.02]} />
          <meshStandardMaterial color="#8a4228" />
        </mesh>
      ))}
      {/* arms */}
      {[-1, 1].map((s) => (
        <group key={s} position={[0.19 * s, 0.85, 0]} rotation={[-sw * s - (s === 1 ? armUp : 0), 0, 0.14 * s + (s === 1 ? armUp * 0.25 : 0)]}>
          <mesh position={[0, -0.17, 0]}>
            <capsuleGeometry args={[0.045, 0.26, 4, 8]} />
            <meshStandardMaterial color={jacket} flatShading />
          </mesh>
          <mesh position={[0, -0.36, 0]}>
            <sphereGeometry args={[0.045, 8, 6]} />
            <meshStandardMaterial color={skin} flatShading />
          </mesh>
        </group>
      ))}
      {/* neck + head */}
      <mesh position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.045, 0.05, 0.06, 8]} />
        <meshStandardMaterial color={skin} flatShading />
      </mesh>
      <group position={[0, 1.04, 0]} rotation={[0, look, 0]}>
        <mesh>
          <sphereGeometry args={[0.115, 14, 10]} />
          <meshStandardMaterial color={skin} />
        </mesh>
        {/* hair cap + ponytail */}
        <mesh position={[0, 0.02, -0.015]} scale={[1.04, 1.0, 1.04]}>
          <sphereGeometry args={[0.115, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshStandardMaterial color={hair} />
        </mesh>
        <mesh position={[0, -0.03, -0.13]} rotation={[0.35, 0, 0]}>
          <capsuleGeometry args={[0.035, 0.1, 4, 8]} />
          <meshStandardMaterial color={hair} />
        </mesh>
        {/* cap with brim */}
        <mesh position={[0, 0.07, 0]}>
          <sphereGeometry args={[0.122, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.42]} />
          <meshStandardMaterial color="#3E5F4B" />
        </mesh>
        <mesh position={[0, 0.075, 0.12]} rotation={[0.12, 0, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.012, 14, 1, false, -Math.PI / 2, Math.PI]} />
          <meshStandardMaterial color="#35513f" />
        </mesh>
        {/* eyes, nose, smile */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[0.04 * s, 0.005, 0.105]}>
            <sphereGeometry args={[0.014, 8, 6]} />
            <meshStandardMaterial color="#1f1712" />
          </mesh>
        ))}
        <mesh position={[0, -0.025, 0.113]}>
          <sphereGeometry args={[0.014, 8, 6]} />
          <meshStandardMaterial color="#c98d68" />
        </mesh>
        <mesh position={[0, -0.058, 0.1]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.025, 0.006, 4, 10, Math.PI]} />
          <meshStandardMaterial color="#7a3b2a" />
        </mesh>
      </group>
    </group>
  );
};

// A trip photo: white border card with a coloured "picture".
export const Photo: React.FC<{ p: [number, number, number]; r: [number, number, number]; c: string; s?: number; o?: number }> = ({ p, r, c, s = 1, o = 1 }) => (
  <group position={p} rotation={r} scale={s}>
    <mesh>
      <boxGeometry args={[0.36, 0.44, 0.008]} />
      <meshStandardMaterial color="#fbfaf6" emissive="#fbfaf6" emissiveIntensity={0.35} transparent opacity={o} />
    </mesh>
    <mesh position={[0, 0.04, 0.006]}>
      <planeGeometry args={[0.3, 0.3]} />
      <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.45} transparent opacity={o} />
    </mesh>
  </group>
);

export const Cloud: React.FC<{ p: [number, number, number]; s?: number; o?: number }> = ({ p, s = 1, o = 0.95 }) => (
  <group position={p} scale={s}>
    {[
      [0, 0, 0, 0.9],
      [0.8, -0.1, 0.1, 0.7],
      [-0.8, -0.15, 0, 0.65],
      [0.3, 0.35, -0.1, 0.6],
    ].map(([x, y, z, r], i) => (
      <mesh key={i} position={[x, y, z]}>
        <icosahedronGeometry args={[r, 0]} />
        <meshStandardMaterial color="#ffffff" flatShading transparent opacity={o} />
      </mesh>
    ))}
  </group>
);
