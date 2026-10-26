// V40B: v40 "Pack swinging on the descent" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v40b.json";

const words = vo.words as unknown as Word[];

const COOL: Sky = { top: "#4a6f96", mid: "#b3c6d4", low: "#ece6d6", sun: [820, 640], sunR: 48, sunCol: "#fffbea", glow: "#f5e8c8" };
const WARM: Sky = { top: "#3a6d9e", mid: "#b9cfe0", low: "#f7e6c4", sun: [840, 600], sunR: 52, sunCol: "#fffbe8", glow: "#ffe2a6" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const KARA: Outfit = {
  ...GUIDE,
  skin: "#C98E6A",
  skinShade: "#AB7151",
  hair: "#2b1d16",
  ponytail: "#2b1d16",
  beard: null,
  cap: "#C8963E",
  capShade: "#A37828",
  jacket: "#7B4B8F",
  jacketShade: "#5F386F",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#9AA3A8",
  packShade: "#7C858A",
};
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e", "#e0b040"];

const K = 0.17; // downhill slope (drops to the right)
const groundAt = (x: number, x0: number, y0: number) => y0 + (x - x0) * K;

// ---------- scenery ----------
const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = 440 + (i % 3) * 70;
      return i % 3 === 1 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c="#3b6550" c2="#2b4d3c" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={["#d9963a", "#b9582c", "#e0b040"][i % 3]} c2={["#b77a28", "#94461f", "#b88a2a"][i % 3]} />
      );
    })}
  </Svg>
);

// Sloped dirt trail with grass and rocks, dropping to the right.
const Descent: React.FC<{ x0: number; y0: number; shift: number }> = ({ x0, y0, shift }) => {
  const yl = groundAt(-400, x0, y0);
  const yr = groundAt(1480, x0, y0);
  return (
    <Svg>
      <path d={`M-400,${yl - 40} L1480,${yr - 40} L1480,${yr + 1200} L-400,${yl + 1200} Z`} fill="#7e8a52" />
      <path d={`M-400,${yl - 8} L1480,${yr - 8} L1480,${yr + 100} L-400,${yl + 100} Z`} fill="#b8966c" />
      <path d={`M-400,${yl + 100} L1480,${yr + 100} L1480,${yr + 120} L-400,${yl + 120} Z`} fill="#9a7b56" opacity={0.6} />
      {Array.from({ length: 11 }, (_, i) => {
        const x = ((((i * 190 - shift) % 1900) + 1900) % 1900) - 400;
        const y = groundAt(x, x0, y0);
        return <path key={i} d={`M${x},${y + 34} l26,-14 l30,6 l12,16 Z`} fill="#8f7658" />;
      })}
      {Array.from({ length: 14 }, (_, i) => {
        const x = ((((i * 150 + 60 - shift) % 2100) + 2100) % 2100) - 400;
        const y = groundAt(x, x0, y0) + 170 + (i % 3) * 60;
        return <circle key={i} cx={x} cy={y} r={9} fill={LEAVES[i % 4]} opacity={0.85} />;
      })}
    </Svg>
  );
};

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={6} drift={t * 10} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2.6 + blur}>
      <Ridge seed={31} base={treeY - 280} amp={360} scale={260} col="#93a6b6" lit="#e8eef2" peak={140} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.7} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={37} base={treeY - 120} amp={240} scale={190} col="#71866f" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.45} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Chest strap + waist strap drawn over the Person (local hiker units). k = 0 open, 1 clipped.
const Straps: React.FC<{ p: HikerProps; chest: number; waist: number }> = ({ p, chest, waist }) => {
  const g = hikerGeometry(p);
  const { hip, sh, lean } = g;
  const u = [Math.sin(lean), -Math.cos(lean)];
  const n = [Math.cos(lean), Math.sin(lean)];
  const P = (b: readonly number[], a: number, f: number) => [b[0] + u[0] * a + n[0] * f, b[1] + u[1] * a + n[1] * f];
  const deg = (lean * 180) / Math.PI;
  const c = P(sh, -30, 14);
  const w = P(hip, 8, 18);
  const buckle = (q: number[], k: number, wdt: number) => (
    <g transform={`translate(${q[0]},${q[1]}) rotate(${deg})`}>
      {k > 0.5 ? (
        <g>
          <rect x={-wdt / 2} y={-5} width={wdt} height={10} rx={3} fill="#22272b" />
          <rect x={wdt / 2 - 18} y={-8} width={16} height={16} rx={4} fill="#111" />
          <rect x={wdt / 2 - 15} y={-2} width={10} height={4} rx={1} fill="#4b8f63" />
        </g>
      ) : (
        <g>
          <rect x={-wdt / 2} y={-5} width={wdt * 0.35} height={10} rx={3} fill="#22272b" transform={`rotate(${18} ${-wdt / 2} 0)`} />
          <rect x={wdt * 0.1} y={4} width={wdt * 0.3} height={9} rx={3} fill="#22272b" transform={`rotate(${-24} ${wdt * 0.1} 4)`} />
        </g>
      )}
    </g>
  );
  return (
    <g transform={hikerTransform(p)}>
      {buckle(c, chest, 42)}
      {buckle(w, waist, 62)}
    </g>
  );
};

// Water bottle bouncing against her back (close-up of the problem).
const Bottle: React.FC<{ p: HikerProps; swing: number }> = ({ p, swing }) => {
  const g = hikerGeometry(p);
  const { hip, lean } = g;
  const u = [Math.sin(lean), -Math.cos(lean)];
  const n = [Math.cos(lean), Math.sin(lean)];
  const q = [hip[0] + u[0] * 90 + n[0] * -86, hip[1] + u[1] * 90 + n[1] * -86];
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${q[0]},${q[1]}) rotate(${(lean * 180) / Math.PI + swing * 0.8})`}>
        <rect x={-11} y={-30} width={22} height={52} rx={7} fill="#4f97cf" />
        <rect x={-7} y={-38} width={14} height={10} rx={3} fill="#2f5f86" />
        <rect x={-7} y={-24} width={4} height={36} rx={2} fill="#bfe0f5" opacity={0.6} />
      </g>
    </g>
  );
};

// Open pack seen from above: heavy items go next to the back panel, light ones outside.
const OpenPack: React.FC<{ t: number }> = ({ t }) => {
  const water = at(t, [10.95, 11.5], [0, 1]);
  const food = at(t, [11.6, 12.1], [0, 1]);
  const jacket = at(t, [12.9, 13.5], [0, 1]);
  return (
    <Svg>
      <g transform="translate(540,1080)">
        {/* pack body */}
        <rect x={-330} y={-420} width={660} height={760} rx={110} fill="#9AA3A8" stroke="rgba(0,0,0,0.25)" strokeWidth={4} />
        <rect x={-300} y={-390} width={600} height={700} rx={90} fill="#2b3135" />
        {/* back panel side (left) */}
        <rect x={-300} y={-390} width={90} height={700} rx={40} fill="#5d666b" />
        <rect x={-282} y={-360} width={20} height={640} rx={10} fill="#7c858a" opacity={0.6} />
        {/* heavy: bottle + food against the back panel */}
        <g transform={`translate(${-190},${mix(-700, -320, water)})`} opacity={water}>
          <rect x={0} y={0} width={120} height={300} rx={36} fill="#4f97cf" />
          <rect x={28} y={-30} width={64} height={40} rx={10} fill="#2f5f86" />
          <rect x={16} y={30} width={16} height={230} rx={8} fill="#bfe0f5" opacity={0.6} />
        </g>
        <g transform={`translate(${-190},${mix(-600, 20, food)})`} opacity={food}>
          <rect x={0} y={0} width={150} height={220} rx={26} fill="#c47a45" />
          <rect x={0} y={0} width={150} height={44} rx={20} fill="#a8622f" />
        </g>
        {/* light: rolled spare layer on the outside */}
        <g transform={`translate(${60},${mix(-700, -280, jacket)})`} opacity={jacket}>
          <rect x={0} y={0} width={190} height={520} rx={90} fill="#9ec49a" />
          <path d="M20,120 Q95,90 170,120 M20,260 Q95,230 170,260 M20,400 Q95,370 170,400" stroke="#7fa67c" strokeWidth={10} fill="none" />
        </g>
        {/* top lip */}
        <rect x={-330} y={-430} width={660} height={60} rx={30} fill="#7C858A" />
      </g>
    </Svg>
  );
};

// ============ S1 HOOK: wide, pack swinging on the steep way down (0 - 4.5) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: t * 26 + hh.x, y: hh.y, zoom: mix(1.0, 1.08, t / 4.5), rot: hh.rot };
  const x0 = 540;
  const y0 = 1380;
  const ph = t * 5.6;
  const x = 340 + t * 40;
  const swing = Math.sin(t * 5.6) * 16;
  const p: HikerProps = { x, y: groundAt(x, x0, y0) + 40, scale: 1.9, phase: ph, walk: 0.7, lean: -0.22 + Math.sin(t * 2.8) * 0.04, slope: -K, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COOL} uid="a" treeY={1140} t={t} />
      <Plane cam={cam} depth={1}>
        <Descent x0={x0} y0={y0} shift={cam.x} />
        <Subject>
          <Person {...p} outfit={KARA} expression="tired" packSwing={swing} packOut={10 + Math.abs(swing) * 0.6} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={COOL.sun[0]} y={COOL.sun[1]} strength={0.16} />
      <Particles seed={41} n={22} leaves={LEAVES} fall={45} />
      <Grade sunX={820} sunY={640} />
      <Title text={"Her pack fought her\non every step down"} t={t} t0={0} top={130} size={96} />
      <Chip text="Pack swinging" t={t} t0={2.13} x={80} y={360} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2a CLOSE-UP: the bottle thumps her back (4.5 - 6.45) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const thump = Math.max(0, Math.sin(t * 6.2));
  const hh = handheld(t, 0.6, thump > 0.97 ? 1 : 0);
  const cam: Cam = { x: hh.x, y: hh.y + thump * 6, zoom: mix(1.06, 1.12, lt / 1.95), rot: hh.rot };
  const swing = Math.sin(t * 6.2) * 14;
  const p: HikerProps = { x: 640, y: 1260 + 182 * 4.4, scale: 4.4, walk: 0.15, phase: t * 6.2, lean: -0.12, poles: false, handOverride: [24, 40], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COOL} uid="b" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={KARA} expression="tired" packSwing={swing} packOut={14 + Math.abs(swing) * 0.8} />
          <Bottle p={p} swing={swing} />
        </Subject>
      </Plane>
      <Particles seed={42} n={16} leaves={LEAVES} fall={30} />
      <Grade sunX={820} sunY={640} vignette={0.6} />
      <Chip text="Bottle thumping her back" t={t} t0={5.17} x={80} y={240} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b MEDIUM: she keeps losing her balance (6.4 - 8.6) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const slip = at(t, [7.1, 7.4], [0, 1]) * at(t, [7.8, 8.3], [1, 0]);
  const hh = handheld(t, 0.7, slip > 0.6 ? 1.2 : 0);
  const cam: Cam = { x: lt * 14 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.2), rot: hh.rot };
  const x0 = 540;
  const y0 = 1460;
  const ph = t * 5;
  const x = 560 + lt * 30;
  const swing = Math.sin(t * 5) * 16 + slip * 10;
  const p: HikerProps = { x, y: groundAt(x, x0, y0) + 40, scale: 2.3, phase: ph, walk: 0.5 * (1 - slip), lean: -0.22 - slip * 0.18, slope: -K, poles: false, handOverride: slip > 0.3 ? [-40, -30] : freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COOL} uid="c" treeY={1200} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Descent x0={x0} y0={y0} shift={cam.x} />
        <Subject>
          <Person {...p} outfit={KARA} expression="tired" packSwing={swing} packOut={12 + Math.abs(swing) * 0.6} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Particles seed={43} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={820} sunY={640} vignette={0.5} />
      <Readout label="BALANCE" value="OFF" ok={false} t={t} t0={7.14} x={80} y={240} pulseAt={7.71} />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: here's the fix, she opens the pack (8.55 - 10.45) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 8 + hh.x, y: at(lt, [0, 1.4], [-50, 0]) + hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.05]), rot: hh.rot };
  const x0 = 540;
  const y0 = 1420;
  const x = 520;
  const p: HikerProps = { x, y: groundAt(x, x0, y0) + 40, scale: 2.3, walk: 0, lean: 0.04, slope: -K * 0.4, poles: false, handOverride: [40, 20], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="d" treeY={1160} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Descent x0={x0} y0={y0} shift={cam.x} />
        <Subject>
          <Person {...p} outfit={KARA} expression="neutral" />
        </Subject>
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.2} />
      <Particles seed={44} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={840} sunY={600} />
      <Title text={"Heavy in.\nLight out."} t={t} t0={9.29} top={200} size={150} />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: inside the pack, heavy things against the back (10.4 - 14.45) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 4.05), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="e" treeY={1100} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <OpenPack t={t} />
      </Plane>
      <Particles seed={45} n={14} leaves={LEAVES} fall={30} />
      <Grade sunX={840} sunY={600} vignette={0.6} />
      <Chip text="Water + food: against your back" t={t} t0={10.97} x={80} y={240} icon="check" />
      <Chip text="Light things: outside" t={t} t0={12.87} x={80} y={350} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S3c CLOSE-UP: clip chest strap and waist strap (14.4 - 16.85) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const chest = at(t, [15.4, 15.5], [0, 1]);
  const waist = at(t, [16.3, 16.4], [0, 1]);
  const hh = handheld(t, 0.5, (t > 15.4 && t < 15.55) || (t > 16.3 && t < 16.45) ? 0.8 : 0);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 2.45), rot: hh.rot };
  const hand: [number, number] = t < 15.6 ? [44, -70] : [40, 6];
  const p: HikerProps = { x: 560, y: 1200 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: hand, breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="f" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={KARA} expression="neutral" />
          <Straps p={p} chest={chest} waist={waist} />
        </Subject>
      </Plane>
      <Particles seed={46} n={16} leaves={LEAVES} fall={40} />
      <Grade sunX={840} sunY={600} vignette={0.6} />
      <Chip text="Chest strap" t={t} t0={15.06} x={80} y={240} icon="check" big />
      <Chip text="Waist strap" t={t} t0={16.13} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3d CLOSE-UP: face, shoulder straps pulled snug (16.8 - 18.8) ============
const S3d: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const tug = at(t, [17.0, 17.5], [0, 1]);
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 8 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 2), rot: hh.rot };
  const p: HikerProps = { x: 480, y: 2350, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: [mix(26, 34, tug), mix(-74, -40, tug)], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="g" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={KARA} expression="happy" packOut={mix(8, 0, tug)} />
          <Straps p={p} chest={1} waist={1} />
        </Subject>
      </Plane>
      <Particles seed={47} n={16} leaves={LEAVES} fall={30} />
      <Grade sunX={840} sunY={600} vignette={0.6} />
      <Chip text="Shoulder straps snug" t={t} t0={17.46} x={80} y={240} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: now the pack moves with you (18.75 - 20.6) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.85), rot: hh.rot };
  const x0 = 540;
  const y0 = 1440;
  const ph = t * 5.6;
  const x = 420 + lt * 60;
  const p: HikerProps = { x, y: groundAt(x, x0, y0) + 40, scale: 2.3, phase: ph, walk: 0.7, lean: -0.2, slope: -K, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="h" treeY={1180} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Descent x0={x0} y0={y0} shift={cam.x} />
        <Subject>
          <Person {...p} outfit={KARA} expression="happy" packSwing={Math.sin(ph) * 1.5} />
          <Straps p={p} chest={1} waist={1} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.2} />
      <Particles seed={48} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={840} sunY={600} />
      <Title text={"It moves\nwith you."} t={t} t0={18.9} top={200} size={150} />
    </AbsoluteFill>
  );
};

// ============ S5 PAYOFF: wide golden descent, steady and quick (20.55 - 23.05) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 40 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.04]), rot: hh.rot };
  const x0 = 540;
  const y0 = 1400;
  const ph = t * 6.4;
  const x = 260 + lt * 110;
  const p: HikerProps = { x, y: groundAt(x, x0, y0) + 40, scale: 1.9, phase: ph, walk: 0.9, lean: -0.18, slope: -K, poles: false, handOverride: freeHand(ph, 0.9) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="i" treeY={1160} t={t} />
      <Plane cam={cam} depth={1}>
        <Descent x0={x0} y0={y0} shift={cam.x} />
        <Subject rimX={6}>
          <Person {...p} outfit={KARA} expression="happy" packSwing={Math.sin(ph) * 1.5} />
          <Straps p={p} chest={1} waist={1} />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.28} col="255,214,150" />
      <Particles seed={49} n={24} leaves={LEAVES} fall={45} />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"Steady\nand quick."} t={t} t0={off + 0.1} top={150} size={150} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/lightweight-trail-backpack-cut.png"
      spec="DAYPACK · UNISEX"
      name={
        <>
          Lightweight
          <br />
          Trail Backpack
        </>
      }
      nameSize={92}
      price="$39.99"
      save="Save this before your next steep hike"
    />
  );
};

export const V40B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.5} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={4.45} to={6.45} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={4.45} />
    </Scene>
    <Scene from={6.4} to={8.6} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={6.4} />
    </Scene>
    <Scene from={8.55} to={10.45} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={8.55} />
    </Scene>
    <Scene from={10.4} to={14.45} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={10.4} />
    </Scene>
    <Scene from={14.4} to={16.85} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={14.4} />
    </Scene>
    <Scene from={16.8} to={18.8} fadeIn={0.1} fadeOut={0.1}>
      <S3d off={16.8} />
    </Scene>
    <Scene from={18.75} to={20.6} fadeIn={0.1} fadeOut={0.1}>
      <S4 off={18.75} />
    </Scene>
    <Scene from={20.55} to={23.05} fadeIn={0.12} fadeOut={0.12}>
      <S5 off={20.55} />
    </Scene>
    <Scene from={23.0} to={27.5} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.45, 1560],
        [4.45, 6.4, 1560],
        [6.4, 8.55, 1560],
        [8.55, 10.4, 1560],
        [10.4, 14.4, 1560],
        [14.4, 16.8, 1560],
        [16.8, 18.75, 1560],
        [18.75, 20.55, 1560],
        [20.55, 23.0, 1560],
      ]}
    />
  </AbsoluteFill>
);
