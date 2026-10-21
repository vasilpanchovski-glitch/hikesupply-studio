// X01: first 3D story draft. Maya has hiked five national parks and forgets most of them;
// the fix is one log page per park and a circle coloured in for each. Product: US National Parks Hiking Tracker.
import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Grain, Vignette } from "../Landscape";
import { at, C, FPS, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, HEAD, Readout, Scene, Scrim, Title, useT } from "../kit";
import { Cloud, CountRing, Flag, Hiker3D, Island, IslandKind, lerp, Photo, ramp, rng, smooth } from "../three/World";
import vo from "../vo/x01.json";

const words = vo.words as unknown as Word[];

// ---------- the world layout: a column of parks receding into the distance ----------
type Park = { kind: IslandKind; pos: [number, number, number]; counted: number | null; seed: number };
const PARKS: Park[] = [
  { kind: "zion", pos: [0, 0, 0], counted: 19.4, seed: 11 },
  { kind: "peaks", pos: [-3.3, 0.5, -4.6], counted: 19.9, seed: 12 },
  { kind: "forest", pos: [3.1, 0.2, -7.4], counted: 20.4, seed: 13 },
  { kind: "lake", pos: [-2.7, 0.6, -11.2], counted: 20.9, seed: 14 },
  { kind: "geyser", pos: [2.8, 0.3, -14.6], counted: 21.4, seed: 15 },
  { kind: "arch", pos: [-0.4, 0.9, -18.6], counted: null, seed: 16 }, // the next park: not visited yet
];
const MAYA: [number, number, number] = [0.6, 0.14, 1.15];

// ---------- camera path ----------
type Key = [number, [number, number, number], [number, number, number]];
const KEYS: Key[] = [
  [0, [0.5, 9.5, 11], [0, 0, -8]],
  [4.4, [3.2, 8.2, 9.5], [0, 0, -7]],
  [6.3, [3.4, 2.9, 6.6], [0.3, 1.25, 0.2]],
  [10.9, [2.9, 2.7, 6.1], [0.3, 1.2, 0.3]],
  [12.4, [2.6, 3.3, 6.4], [0.4, 1.65, 0.5]],
  [18.25, [2.2, 3.1, 5.9], [0.4, 1.65, 0.6]],
  [19.5, [0, 17, 4], [0, 0, -8.5]],
  [22.0, [0, 16.2, 3.4], [0, 0, -8.5]],
  [23.0, [2.0, 2.8, 5.6], [-1.08, 1.06, -4.19]],
  [24.5, [2.4, 3.1, 6.3], [-1.56, 0.7, -5.03]],
];
const camAt = (t: number) => {
  let i = 0;
  while (i < KEYS.length - 1 && t > KEYS[i + 1][0]) i++;
  const a = KEYS[i];
  const b = KEYS[Math.min(i + 1, KEYS.length - 1)];
  const k = a === b ? 0 : smooth((t - a[0]) / (b[0] - a[0]));
  const mixv = (u: number[], v: number[]) => u.map((x, j) => lerp(x, v[j], k)) as [number, number, number];
  return { pos: mixv(a[1], b[1]), look: mixv(a[2], b[2]) };
};

const CameraRig: React.FC<{ t: number }> = ({ t }) => {
  const { camera } = useThree();
  const { pos, look } = camAt(t);
  camera.position.set(pos[0], pos[1], pos[2]);
  camera.lookAt(new THREE.Vector3(look[0], look[1], look[2]));
  camera.updateProjectionMatrix();
  return null;
};

// How "forgotten" (faded) each park is at time t.
const forgetOf = (p: Park, t: number) => {
  if (p.counted === null) return 0.75; // never visited: stays pale
  if (p.kind === "zion") return ramp(t, 6.5, 9.5) * 0.9 * (1 - ramp(t, 12.4, 14.0));
  return ramp(t, 4.8, 6.6) * (1 - ramp(t, p.counted - 0.1, p.counted + 0.4));
};

const PHOTO_COLS = ["#c2603a", "#3f8fb8", "#6f8f4f", "#e3a06a", "#2f5a40", "#9ab7cf", "#d6b46a", "#7c8079", "#b0473a"];

// ---------- the 3D world ----------
const World3D: React.FC<{ t: number }> = ({ t }) => {
  const photos = useMemo(() => {
    const r = rng(77);
    return Array.from({ length: 34 }, (_, i) => ({
      a: r() * Math.PI * 2,
      rad: 0.75 + r() * 1.05,
      y: 0.35 + r() * 1.5,
      spin: 0.5 + r() * 0.8,
      arrive: 8.35 + (i / 34) * 1.7,
      c: PHOTO_COLS[i % PHOTO_COLS.length],
      tilt: (r() - 0.5) * 0.9,
    }));
  }, []);

  const gloom = ramp(t, 5.0, 7.0) * (1 - ramp(t, 11.2, 13.0));
  const golden = ramp(t, 21.8, 23.2);
  const sun = new THREE.Color("#ffe2b0").lerp(new THREE.Color("#b9c3cc"), gloom).lerp(new THREE.Color("#ffc98a"), golden);
  const blow = ramp(t, 11.15, 12.3);

  // Maya: looks around at the parks during the problem, faces the camera in the fix, lifts an arm at the payoff.
  const look = t > 4.5 && t < 11 ? Math.sin((t - 4.5) * 1.6) * 0.7 : 0;
  const cheer = ramp(t, 22.3, 22.8) * 2.3;

  return (
    <>
      <CameraRig t={t} />
      <fog attach="fog" args={["#dfe7ea", 14, 42]} />
      <hemisphereLight args={["#eaf3ff", "#7a6a55", 0.9 - gloom * 0.25]} />
      <directionalLight position={[6, 10, 6]} intensity={2.4 - gloom * 0.9 + golden * 0.6} color={sun} />
      <directionalLight position={[-6, 4, -4]} intensity={0.5} color="#9fc0e0" />

      {/* sea of clouds below the parks */}
      <mesh position={[0, -2.6, -8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#eef2f3" />
      </mesh>
      {[
        [-5, -2.2, 2, 1.6],
        [5.5, -2.1, -2, 1.8],
        [-6.5, -2.0, -9, 2.0],
        [6.5, -2.3, -12, 1.7],
        [0, -2.4, -6, 2.2],
        [-4.5, -2.1, -16, 2.0],
        [4.5, -2.2, -20, 2.4],
      ].map(([x, y, z, s], i) => (
        <Cloud key={i} p={[x + Math.sin(t * 0.2 + i) * 0.4, y, z]} s={s} />
      ))}

      {PARKS.map((p, i) => {
        const f = forgetOf(p, t);
        const counted = p.counted === null ? 0 : ramp(t, p.counted, p.counted + 0.45);
        return (
          <group key={i}>
            <Island pos={p.pos} kind={p.kind} f={f} bob={t * 0.9 + i * 1.3} seed={p.seed} />
            <CountRing p={[p.pos[0], p.pos[1] - 0.05, p.pos[2]]} k={counted} />
            <Flag p={p.kind === "zion" ? [1.55, 0.12, 1.3] : [p.pos[0] + 1.5, p.pos[1] + 0.12, p.pos[2] + 0.6]} k={counted} t={t} />
          </group>
        );
      })}

      <Hiker3D p={MAYA} rotY={0.45} look={look} walk={0} phase={0} armUp={cheer} scale={1.0} />

      {/* the photo swirl: two thousand photos and no story */}
      {photos.map((ph, i) => {
        const inK = ramp(t, ph.arrive, ph.arrive + 0.5);
        if (inK <= 0 || blow >= 1) return null;
        const a = ph.a + t * ph.spin;
        const rad = ph.rad + blow * 4;
        const x = MAYA[0] + Math.cos(a) * rad;
        const z = MAYA[2] + Math.sin(a) * rad;
        const y = MAYA[1] + ph.y + (1 - inK) * 2.5 + blow * 2;
        return <Photo key={i} p={[x, y, z]} r={[ph.tilt, -a + Math.PI / 2, ph.tilt * 0.5]} c={ph.c} s={0.9} o={1 - blow} />;
      })}
    </>
  );
};

// ---------- 2D overlays ----------

// One page of the tracker, filling in field by field (white card, tilted in 3D as it arrives).
const LogCard: React.FC<{ t: number; t0: number; t1: number }> = ({ t, t0, t1 }) => {
  if (isClean()) return null;
  const o = at(t, [t0, t0 + 0.3], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]);
  const rows: [string, string, number][] = [
    ["DATE", "Oct 12", 14.53],
    ["TRAIL", "Watchman Trail", 15.16],
    ["DISTANCE", "3.3 mi / 5.3 km", 15.61],
    ["WHO WITH", "Dad", 16.16],
    ["HIGHLIGHT", "Sunset over the canyon", 17.5],
  ];
  return (
    <div style={{ position: "absolute", left: 80, right: 80, top: 250, perspective: 1400, opacity: o }}>
      <div
        style={{
          borderRadius: 30,
          background: "#fbfaf6",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          padding: "34px 44px 30px",
          transform: `rotateX(${at(t, [t0, t0 + 0.7], [38, 0], outExpo)}deg) translateY(${at(t, [t0, t0 + 0.7], [80, 0], outExpo)}px)`,
          transformOrigin: "50% 100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "3px solid #e4ddcf", paddingBottom: 14, marginBottom: 10 }}>
          <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 64, color: C.ink, textTransform: "uppercase" }}>Zion</div>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 32, letterSpacing: 3, color: "#6b6b66" }}>PARK VISIT 1</div>
        </div>
        {rows.map(([label, value, tw], i) => {
          const k = at(t, [tw, tw + 0.35], [0, 1], outExpo);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 22, padding: "13px 0", borderBottom: i < rows.length - 1 ? "2px dashed #e4ddcf" : "none" }}>
              <div style={{ width: 190, fontFamily: HEAD, fontWeight: 700, fontSize: 30, letterSpacing: 2, color: "#8a8a82" }}>{label}</div>
              <div style={{ flex: 1, fontFamily: HEAD, fontWeight: 700, fontSize: 46, color: C.ink, opacity: k, translate: `${(1 - k) * 24}px 0px`, whiteSpace: "nowrap" }}>{value}</div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  background: k > 0.5 ? "#3E8E5A" : "#e4ddcf",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  scale: `${k > 0.5 ? at(t, [tw, tw + 0.3], [1.3, 1]) : 1}`,
                }}
              >
                <svg width={26} height={26} viewBox="0 0 26 26">
                  <path d="M6 13 L11 18 L20 8" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={k > 0.5 ? 1 : 0} />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const countAt = (t: number) => PARKS.filter((p) => p.counted !== null && t >= p.counted).length;

// ---------- the timeline ----------
const Story: React.FC = () => {
  const t = useT();
  const n = countAt(t);
  const lastCount = PARKS.filter((p) => p.counted !== null && t >= p.counted).map((p) => p.counted as number).pop();
  const gloom = at(t, [5.0, 7.0], [0, 1]) * at(t, [11.2, 13.0], [1, 0]);
  const golden = at(t, [21.8, 23.2], [0, 1]);
  const mixHex = (a: string, b: string, k: number) => "#" + new THREE.Color(a).lerp(new THREE.Color(b), k).getHexString();
  const skyTop = mixHex(mixHex("#5d93c8", "#7d8c99", gloom), "#f2a868", golden * 0.7);
  const skyMid = mixHex("#bcd3e2", "#f3d2a8", golden * 0.8);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${skyTop} 0%, ${skyMid} 45%, #dfe7ea 70%, #eef2f3 100%)` }} />
      <ThreeCanvas width={1080} height={1920} gl={{ alpha: true, antialias: true }} camera={{ fov: 46, near: 0.1, far: 120, position: [0, 9, 11] }}>
        <World3D t={t} />
      </ThreeCanvas>
      <Vignette strength={0.35} />
      <Scrim h={t < 4.5 || (t > 22.1 && t < 24.4) ? 900 : 700} />

      {/* soft shade behind the captions so they stay readable over bright clouds */}
      {!isClean() && (
        <div style={{ position: "absolute", left: 0, right: 0, top: t < 4.5 || (t >= 18.35 && t < 22.2) ? 880 : t < 11.05 ? 1420 : t < 18.35 ? 1480 : 1620, height: 300, background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(10,20,16,0.42) 0%, rgba(10,20,16,0) 100%)" }} />
      )}

      {/* HOOK */}
      <Title text={"5 parks hiked.\nMost of them\nforgotten."} t={t} t0={0} t1={4.45} top={150} size={128} />
      <Chip text="Maya's national parks" t={t} t0={1.9} t1={4.45} x={80} y={600} icon="none" />

      {/* PROBLEM */}
      <Chip text="Which trail?" t={t} t0={4.58} t1={10.95} x={80} y={220} icon="x" />
      <Chip text="How many miles?" t={t} t0={6.14} t1={10.95} x={80} y={320} icon="x" />
      <Chip text="Who came along?" t={t} t0={7.45} t1={10.95} x={80} y={420} icon="x" />
      <Readout label="PHOTOS ON HER PHONE" value="2,000" ok={false} t={t} t0={9.37} t1={10.95} x={80} y={540} pulseAt={9.37} />

      {/* FIX */}
      <Title text={"Here's\nthe fix."} t={t} t0={11.1} t1={12.3} top={200} size={160} />
      <LogCard t={t} t0={12.3} t1={18.3} />

      {/* COUNT */}
      <Chip text="Color in a circle" t={t} t0={18.66} t1={22.1} x={80} y={220} icon="check" big />
      {t >= 19.2 && (
        <Readout label="PARKS HIKED" value={`${Math.max(n, 0)} / 63`} ok={null} t={t} t0={19.2} t1={22.1} x={80} y={340} pulseAt={lastCount ?? 19.4} />
      )}

      {/* PAYOFF */}
      <Title text={"Every park\nhas its\nstory."} t={t} t0={22.27} t1={24.4} top={170} size={140} />
    </AbsoluteFill>
  );
};

const End: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/national-parks-tracker-card.jpg"
      spec="PRINTABLE · ALL 63 PARKS + CANADA"
      name={
        <>
          National Parks
          <br />
          Hiking Tracker
        </>
      }
      nameSize={92}
      price="$4.99"
      save="Save this before your next park trip"
    />
  );
};

export const X01: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {frame < Math.round(24.45 * FPS) && <Story />}
      <Scene from={24.3} to={30} fadeIn={0.25} fadeOut={0}>
        <End />
      </Scene>
      <Captions words={words} windows={[[0.3, 4.5, 960], [4.5, 11.05, 1500], [11.05, 18.35, 1560], [18.35, 22.2, 960], [22.2, 24.3, 1700]]} />
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};
