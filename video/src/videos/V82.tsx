// V82: "Snow was melting in his boots" in the cinematic C01 style, first snow of the season.
// Advice: pull leg gaiters on over your laces before you reach the snow; the instep strap runs under the sole; the gaiter covers
// boot top to mid-calf; snow slides off instead of falling in. Water-repellent, not waterproof (no waterproof claim).
// End card = Hiking Leg Gaiters — 17 in (44 cm), Pair, polyester, $19.99 (live Shopify), real product photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, rim, Svg } from "../cine";
import { FrostTrail, SNOW, SNOW2, STORM, WGOLD, WINTER, WinterBackdrop } from "../winter";
import { Breath } from "../fall";
import vo from "../vo/v82.json";

const words = vo.words as unknown as Word[];

const MARCO: Outfit = {
  ...JAKE,
  skin: "#D9A07A",
  skinShade: "#B98060",
  hair: "#2b1d14",
  beard: "#2b1d14",
  cap: "#B83A55",
  capShade: "#8E2B42",
  jacket: "#2F5D8A",
  jacketShade: "#244a6f",
  pants: "#4a4e55",
  pantsShade: "#363a40",
  pack: "#C2662E",
  packShade: "#9B4E20",
  glove: "#2C3B2E",
};

const GAITER = "#1d2023";
const GAITER2 = "#2a2e32";

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Gaiters drawn over the Person's lower legs (same geometry as the figure). k = 0..1 fades them in.
const GaiterLegs: React.FC<{ p: HikerProps; k?: number }> = ({ p, k = 1 }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      {[1, 0].map((i) => {
        const L = g.legs[i];
        const kn = L.knee;
        const f = [L.foot[0] - 2, L.foot[1] - 18];
        const a = [mix(kn[0], f[0], 0.14), mix(kn[1], f[1], 0.14)];
        return (
          <g key={i}>
            <line x1={a[0]} y1={a[1]} x2={f[0]} y2={f[1]} stroke={i === 1 ? "#141618" : GAITER2} strokeWidth={34} strokeLinecap="round" />
            <line x1={a[0] - 14} y1={a[1]} x2={a[0] + 14} y2={a[1]} stroke="#3a3f44" strokeWidth={8} strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
};

// Snow lumps stuck on the boots and socks of a Person (no gaiters), for the medium shot.
const SnowCuffs: React.FC<{ p: HikerProps; k: number }> = ({ p, k }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      {[0, 1].map((i) => {
        const f = g.legs[i].foot;
        return (
          <g key={i}>
            <ellipse cx={f[0] + 4} cy={f[1] - 30} rx={24} ry={9} fill={SNOW} />
            <ellipse cx={f[0] + 16} cy={f[1] - 16} rx={18} ry={7} fill={SNOW} />
          </g>
        );
      })}
    </g>
  );
};

// Close-up of one lower leg and boot, side view, standing in snow.
// sink = how deep the boot is in the snow (px), gaiter 0..1 wraps up from the laces, wet 0..1 darkens the sock.
const LX = 560;
const BootClose: React.FC<{ t: number; sink: number; gaiter: number; wet: number; strap?: number; spill?: number }> = ({ t, sink, gaiter, wet, strap = 0, spill = 0 }) => {
  const top = mix(1010, 380, gaiter);
  const snowY = 1330 - sink;
  return (
    <g>
      {/* pants leg */}
      <path d={`M${LX - 120},-200 L${LX + 110},-200 L${LX + 116},960 L${LX - 126},960 Z`} fill={MARCO.pants} />
      <path d={`M${LX - 120},-200 L${LX - 60},-200 L${LX - 66},960 L${LX - 126},960 Z`} fill={MARCO.pantsShade} />
      {/* sock in the gap */}
      <rect x={LX - 112} y={940} width={222} height={90} fill="#c9c3b6" />
      <rect x={LX - 112} y={940} width={222} height={90} fill="#56697a" opacity={wet * 0.8} />
      {/* low hiking boot */}
      <path
        d={`M${LX - 130},1010 L${LX + 120},1010 L${LX + 130},1130 Q${LX + 230},1150 ${LX + 300},1200 Q${LX + 330},1225 ${LX + 320},1260 L${LX - 150},1260 Q${LX - 160},1140 ${LX - 130},1010 Z`}
        fill="#B88A5A"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth={3}
      />
      <path d={`M${LX - 130},1010 L${LX + 120},1010 L${LX + 118},1040 L${LX - 132},1040 Z`} fill="#3E3128" />
      <rect x={LX - 166} y={1250} width={500} height={40} rx={12} fill="#2A2421" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${LX + 60 + i * 34},${1060 + i * 34} l52,-14`} stroke="#e8d8b8" strokeWidth={9} strokeLinecap="round" />
      ))}
      {/* snow clumps on the sock when no gaiter */}
      {gaiter < 0.05 &&
        Array.from({ length: 7 }, (_, i) => (
          <ellipse key={i} cx={LX - 90 + i * 32} cy={1000 + (i % 2) * 14} rx={22 + (i % 3) * 6} ry={12} fill={SNOW} opacity={at(spill, [i / 9, i / 9 + 0.2], [0, 1])} />
        ))}
      {/* gaiter */}
      {gaiter > 0.01 && (
        <g opacity={at(gaiter, [0, 0.12], [0, 1])}>
          <path d={`M${LX - 134},${top} L${LX + 128},${top} L${LX + 150},1090 Q${LX + 210},1130 ${LX + 230},1170 L${LX - 150},1170 Z`} fill={GAITER} />
          <path d={`M${LX - 134},${top} L${LX - 60},${top} L${LX - 70},1170 L${LX - 150},1170 Z`} fill={GAITER2} />
          <path d={`M${LX + 20},${top + 20} L${LX + 30},1150`} stroke="#3a3f44" strokeWidth={6} strokeDasharray="22 14" />
          <rect x={LX - 134} y={top - 6} width={262} height={16} rx={6} fill="#33383d" />
          <rect x={LX + 120} y={top - 14} width={22} height={34} rx={8} fill="#555" />
          <circle cx={LX + 210} cy={1158} r={11} fill="#777" opacity={at(gaiter, [0.6, 0.9], [0, 1])} />
        </g>
      )}
      {/* instep strap under the sole */}
      {strap > 0 && (
        <g opacity={strap}>
          <path d={`M${LX - 30},1170 L${LX - 20},1300 L${LX + 120},1300 L${LX + 130},1170`} stroke="#111" strokeWidth={22} fill="none" strokeLinejoin="round" />
          <rect x={LX + 106} y={1196} width={50} height={40} rx={8} fill="#777" stroke="#333" strokeWidth={4} />
        </g>
      )}
      {/* snow surface in front of the boot */}
      <path d={`M-200,${snowY} Q${LX - 200},${snowY - 30} ${LX},${snowY - 10} Q${LX + 300},${snowY + 10} 1300,${snowY - 20} L1300,2200 L-200,2200 Z`} fill={SNOW} />
      <path d={`M-200,${snowY + 40} Q540,${snowY + 10} 1300,${snowY + 30}`} stroke={SNOW2} strokeWidth={16} fill="none" />
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={(i * 131 + 40) % 1100} cy={snowY + 120 + ((i * 61) % 260)} r={6} fill="#ffffff" opacity={0.5 + 0.3 * Math.sin(t * 3 + i)} />
      ))}
    </g>
  );
};

// Snow chunks falling toward the boot top. blocked: they slide off the gaiter instead of falling in.
const SnowFall: React.FC<{ t: number; t0: number; blocked: boolean; n?: number }> = ({ t, t0, blocked, n = 12 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const s = t0 + i * 0.22;
      const k = (t - s) / 1.0;
      if (k < 0 || k > 1) return null;
      const x0 = LX - 90 + ((i * 53) % 190);
      const stopY = blocked ? 520 + ((i * 71) % 380) : 990;
      const fall = Math.min(k / 0.6, 1);
      let x = x0;
      let y = mix(-60, stopY, fall * fall);
      let o = 1;
      if (k > 0.6) {
        const r = (k - 0.6) / 0.4;
        if (blocked) {
          x = x0 + (i % 2 ? 1 : -1) * r * 260;
          y = stopY + r * r * 420;
        } else {
          y = stopY + r * 30;
          o = 1 - r;
        }
      }
      return <ellipse key={i} cx={x} cy={y} rx={38 + (i % 3) * 12} ry={26 + (i % 2) * 8} fill={SNOW} stroke="#c9d6de" strokeWidth={3} opacity={o} />;
    })}
  </g>
);

// ============ S1 HOOK CLOSE-UP: boot sinks, snow spills over the top (0 - 4.1) ============
const S1: React.FC = () => {
  const t = useT();
  const sink = at(t, [0, 1.6], [40, 200], outExpo);
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, t / 4.1), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={1000} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <g transform="translate(540,1230) scale(1.45) translate(-540,-1000)">
            <BootClose t={t} sink={sink} gaiter={0} wet={at(t, [1.6, 4], [0, 0.6])} spill={at(t, [0.6, 3.2], [0, 1])} />
            <SnowFall t={t} t0={0.2} blocked={false} n={14} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Particles seed={821} n={26} col="#ffffff" fall={40} />
      <Grade sunX={800} sunY={560} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Title text={"Snow was\nmelting in\nhis boots"} t={t} t0={0} top={120} size={128} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: Marco on the snowy trail, snow over the boot tops (4.1 - 6.75) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x + lt * 20, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.6), rot: hh.rot };
  const g = 1400;
  const p: HikerProps = { x: 520, y: g + 182 * 2.3 - 130, scale: 2.3, phase: t * 3.4, walk: 0.55, lean: 0.14, poles: false, breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={g + 10} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 60} snow={1} />
        <Subject rimX={5}>
          <Person {...p} outfit={MARCO} expression="neutral" />
          <SnowCuffs p={p} k={1} />
          <Breath p={p} t={t} />
        </Subject>
        <Svg>
          <path d={`M-200,${g + 150} Q300,${g + 110} 700,${g + 140} Q1000,${g + 160} 1300,${g + 130} L1300,2400 L-200,2400 Z`} fill={SNOW} opacity={0.95} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Particles seed={822} n={30} col="#ffffff" fall={40} />
      <Grade sunX={800} sunY={560} warm="236,236,236" cool="20,40,70" />
      <Readout label="FRESH SNOW" value="Over the boot tops" ok={false} t={t} t0={4.3} x={80} y={200} />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: face, cold and miserable (6.75 - 9.6) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.8), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.1, poles: false, handOverride: [40, 10], breathe: Math.sin(t * 2.6) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(230,236,245,0.85)">
          <Person {...p} outfit={MARCO} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={823} n={26} col="#ffffff" fall={50} />
      <Grade sunX={820} sunY={520} warm="230,232,236" cool="20,40,70" vignette={0.65} />
      <Chip text="Wet socks" t={t} t0={7.9} x={80} y={200} icon="x" big />
      <Chip text="Numb toes" t={t} t0={8.6} x={80} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 FIX CLOSE-UP: the gaiter goes on over the laces (9.6 - 12.1) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.5), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1100} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <BootClose t={t} sink={30} gaiter={at(t, [10.9, 11.9], [0, 1], outExpo)} wet={0} />
        </Subject>
      </Plane>
      <Particles seed={824} n={14} col="#ffffff" fall={20} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Title text={"Gaiters over\nyour laces."} t={t} t0={off + 0.05} t1={11.2} top={170} size={130} />
      <Chip text="Leg gaiters" t={t} t0={11.3} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: at the trailhead, gaiters on before the snow (12.1 - 15.2) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 16, y: hh.y, zoom: mix(1.06, 1.12, lt / 3.1), rot: hh.rot };
  const g = 1400;
  const p: HikerProps = { x: 600, y: g + 182 * 2.3 - 130, scale: 2.3, walk: 0, lean: 0.05, poles: false, breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g + 10} blur={2} t={t} snow={0.8} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 60} snow={0.2} />
        <Svg>
          <Car x={180} y={g + 130} s={2.2} body="#7a8a94" shade="#5d6c75" />
          <path d={`M-200,${g - 20} L-200,${g - 60} L80,${g - 70}`} stroke="none" />
        </Svg>
        <Subject rimX={5}>
          <Person {...p} outfit={MARCO} expression="happy" />
          <GaiterLegs p={p} k={at(t, [12.5, 13.4], [0, 1])} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} />
      <Particles seed={825} n={16} col="#fff3d6" fall={10} />
      <Grade sunX={800} sunY={560} warm="255,226,190" />
      <Chip text="Put them on at the car" t={t} t0={12.4} x={80} y={200} icon="check" big />
      <Chip text="Before you reach the snow" t={t} t0={13.4} x={80} y={330} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: strap under the sole, buckle clicks (15.2 - 16.95) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const click = at(t, [15.75, 15.85, 16.0], [0, 1, 0]);
  const hh = handheld(t, 0.4, click * 3);
  const cam: Cam = { x: hh.x - 120, y: hh.y - 60, zoom: mix(1.18, 1.24, lt / 1.75), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1100} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <BootClose t={t} sink={-60} gaiter={1} wet={0} strap={at(t, [15.3, 15.8], [0, 1])} />
          {/* gloved hand pulling the strap */}
          <g transform={`translate(${mix(820, LX + 170, at(t, [15.3, 15.8], [0, 1], outExpo))},1180)`}>
            <ellipse cx={0} cy={0} rx={70} ry={52} fill={MARCO.glove ?? "#2C3B2E"} />
            <rect x={30} y={-30} width={260} height={70} rx={30} fill={MARCO.jacket} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={826} n={12} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.6} />
      <Chip text="Strap under the sole" t={t} t0={15.3} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: the gaiter top sits at mid-calf (16.95 - 18.9) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: mix(-140, 60, at(lt, [0, 1.6], [0, 1], outExpo)) + hh.y, zoom: 1.02, rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={1100} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <BootClose t={t} sink={20} gaiter={1} wet={0} />
          {/* height marker */}
          <g opacity={at(t, [17.3, 17.7], [0, 1])}>
            <line x1={LX + 230} y1={380} x2={LX + 230} y2={1010} stroke="#ffffff" strokeWidth={6} />
            <line x1={LX + 200} y1={380} x2={LX + 260} y2={380} stroke="#ffffff" strokeWidth={6} />
            <line x1={LX + 200} y1={1010} x2={LX + 260} y2={1010} stroke="#ffffff" strokeWidth={6} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={827} n={12} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Readout label="COVERS" value="Boot top to mid-calf" ok={true} t={t} t0={17.1} x={80} y={1140} />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: deep snow slides off the gaiter (18.9 - 21.6) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.7), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="h" treeY={1000} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <g transform="translate(540,1180) scale(1.35) translate(-540,-1000)">
            <BootClose t={t} sink={at(t, [18.9, 19.8], [40, 180], outExpo)} gaiter={1} wet={0} />
            <SnowFall t={t} t0={19.0} blocked n={10} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Particles seed={828} n={26} col="#ffffff" fall={40} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.2} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Chip text="Snow slides off" t={t} t0={19.4} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF MEDIUM: back at the car, dry socks (21.6 - 23.9) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 20, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.06], outExpo), rot: hh.rot };
  const g = 1400;
  const p: HikerProps = { x: 590, y: g + 182 * 2.3 - 130, scale: 2.3, phase: t * 2.6, walk: 0.35, lean: 0.02, poles: false, breathe: Math.sin(t * 2) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="i" treeY={g + 10} t={t} snow={1} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 60} snow={1} />
        <Svg>
          <Car x={250} y={g + 130} s={2.2} body="#7a8a94" shade="#5d6c75" />
        </Svg>
        <Subject rimX={6} col="rgba(255,190,120,0.9)">
          <Person {...p} outfit={MARCO} expression="happy" />
          <GaiterLegs p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={829} n={24} col="#ffe7b8" />
      <Grade sunX={760} sunY={640} warm="255,180,100" />
      <Chip text="Dry socks, whole loop" t={t} t0={21.9} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/hiking-leg-gaiters-cut.png"
      cutoutH={760}
      spec="17 IN (44 CM) · SOLD AS A PAIR"
      name={
        <>
          Hiking Leg
          <br />
          Gaiters
        </>
      }
      nameSize={108}
      price="$19.99"
      save="Save this before your first snow hike"
    />
  );
};

export const V82: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.15} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.1} to={6.8} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.1} />
    </Scene>
    <Scene from={6.75} to={9.65} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.75} />
    </Scene>
    <Scene from={9.6} to={12.15} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.6} />
    </Scene>
    <Scene from={12.1} to={15.25} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.1} />
    </Scene>
    <Scene from={15.2} to={17.0} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={15.2} />
    </Scene>
    <Scene from={16.95} to={18.95} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={16.95} />
    </Scene>
    <Scene from={18.9} to={21.65} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={18.9} />
    </Scene>
    <Scene from={21.6} to={24.0} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={21.6} />
    </Scene>
    <Scene from={23.8} to={28} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.1, 1560],
        [4.1, 6.75, 1560],
        [6.75, 9.6, 1560],
        [9.6, 12.1, 1560],
        [12.1, 15.2, 1560],
        [15.2, 16.95, 1560],
        [16.95, 18.9, 1560],
        [18.9, 21.6, 1560],
        [21.6, 23.8, 1560],
      ]}
    />
  </AbsoluteFill>
);
