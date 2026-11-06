// V108: "Never warm your tent with a camp stove." in the cinematic C01 style. Story for the Camping Trip Planner & Checklists (p12),
// posted Dec 3. Safety fact kept plain and conservative: fuel-burning stoves and heaters inside a tent can build up carbon monoxide,
// which has no colour or smell. Safer ways to warm up: warm drink made outside, dry socks, a hat, a sleeping pad under the bag.
// $5.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { Mug } from "../home";
import vo from "../vo/v108.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#121a30", mid: "#26334f", low: "#4a5672", sun: [800, 330], sunR: 30, sunCol: "#f1efe4", glow: "#8f9ab4" };
const FIRE = "255,190,120";

const MIA: Outfit = {
  ...JAKE,
  skin: "#EDBE9E",
  skinShade: "#CF9E80",
  hair: "#3b2a20",
  ponytail: "#3b2a20",
  beard: null,
  cap: "#2C6E63",
  capShade: "#1f5249",
  jacket: "#C2662E",
  jacketShade: "#9B4E20",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  glove: null,
};
const NOAH: Outfit = { ...JAKE, skin: "#A8704E", skinShade: "#8A5639", hair: "#1e1a18", beard: "#1e1a18", cap: "#3E4F5C", capShade: "#2C3943", jacket: "#2F7F86", jacketShade: "#256870", glove: null };

const toScreen = (p: HikerProps, l: [number, number], flip = false): [number, number] => {
  const s = p.scale ?? 1;
  return [p.x + (flip ? -1 : 1) * l[0] * s, p.y + (l[1] - 182) * s];
};

// ---------- scenery ----------
const Stars: React.FC = () => (
  <Svg>
    {Array.from({ length: 46 }, (_, i) => (
      <circle key={i} cx={(i * 263) % 1080} cy={60 + ((i * 151) % 760)} r={1.5 + (i % 3)} fill="#f4f1e6" opacity={0.45 + (i % 4) * 0.12} />
    ))}
  </Svg>
);

const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 12 }, (_, i) => {
      const x = ((((-160 + i * 150 - shift) % 1800) + 1800) % 1800) - 300;
      return <Pine key={i} x={x} y={y + (i % 2) * 20} h={420 + (i % 3) * 90} c="#1d3328" c2="#152820" />;
    })}
  </Svg>
);

const NightBackdrop: React.FC<{ cam: Cam; uid: string; treeY: number; t: number; blur?: number }> = ({ cam, uid, treeY, t, blur = 0 }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={NIGHT} uid={uid} />
      <Stars />
      <Clouds y={300} col="#5a6684" seed={uid.charCodeAt(0)} drift={t * 10} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2.6 + blur}>
      <Ridge seed={61} base={treeY - 260} amp={320} scale={250} col="#2f3a52" lit="#6f7c98" peak={110} />
    </Plane>
    <Haze y={treeY - 400} h={360} col={NIGHT.low} opacity={0.4} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={67} base={treeY - 90} amp={180} scale={180} col="#22303a" />
    </Plane>
    <Plane cam={cam} depth={0.5} blur={1 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Ground: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y} Q540,${y - 30} 1480,${y} L1480,2600 L-400,2600 Z`} fill="#3a4030" />
    <path d={`M-400,${y + 200} Q540,${y + 170} 1480,${y + 200} L1480,2600 L-400,2600 Z`} fill="#30362a" />
    {Array.from({ length: 20 }, (_, i) => {
      const x = -360 + i * 96;
      const yy = y + 40 + ((i * 59) % 300);
      return <path key={i} d={`M${x},${yy} q6,-26 12,-48 M${x + 10},${yy} q-4,-22 -10,-38`} stroke="#4b5238" strokeWidth={5} fill="none" strokeLinecap="round" />;
    })}
  </Svg>
);

// Dome tent. glow = warm light from a battery lantern inside.
const Tent: React.FC<{ x: number; y: number; s?: number; glow?: number; open?: number }> = ({ x, y, s = 1, glow = 0, open = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={8} rx={230} ry={20} fill="rgba(0,0,0,0.35)" />
    <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill="#5f7a4a" />
    <path d="M0,-250 Q200,-230 220,0 L80,0 Q90,-150 0,-250 Z" fill="#4c6339" />
    {glow > 0 && <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill={`rgba(255,200,120,${0.3 * glow})`} />}
    <path d="M-90,0 Q-80,-160 0,-180 Q80,-160 90,0 Z" fill={glow > 0 ? `rgba(255,214,150,${0.55 + glow * 0.35})` : "#2a3322"} />
    {open > 0 && <path d={`M-90,0 Q-80,-160 0,-180 L${-40 * open},0 Z`} fill="#3f5232" />}
    <path d="M-200,-60 Q0,-120 200,-60" stroke="#2f3f26" strokeWidth={5} fill="none" />
  </g>
);

// Canister camp stove with a small blue flame.
const Stove: React.FC<{ x: number; y: number; s?: number; t: number; flame?: number }> = ({ x, y, s = 1, t, flame = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={70} ry={11} fill="rgba(0,0,0,0.35)" />
    <rect x={-52} y={-82} width={104} height={82} rx={24} fill="#3f6f9a" />
    <rect x={-52} y={-82} width={104} height={18} rx={9} fill="#2f5678" />
    <rect x={-30} y={-50} width={60} height={22} rx={4} fill="#e9e3d2" opacity={0.85} />
    <rect x={-14} y={-108} width={28} height={28} fill="#a7adb3" />
    <path d="M-56,-112 L56,-112 M-44,-112 L-30,-100 M44,-112 L30,-100" stroke="#8b9197" strokeWidth={7} strokeLinecap="round" />
    {flame > 0 && (
      <g opacity={flame}>
        <ellipse cx={0} cy={-126} rx={34 + Math.sin(t * 23) * 3} ry={14} fill="#4aa3ff" opacity={0.75} />
        <ellipse cx={0} cy={-130} rx={20 + Math.sin(t * 31) * 2} ry={9} fill="#cfe8ff" opacity={0.85} />
      </g>
    )}
  </g>
);

const Lantern: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <circle cx={0} cy={-60} r={120} fill="#ffd690" opacity={0.18} />
    <rect x={-30} y={-100} width={60} height={86} rx={12} fill="#fff1c8" />
    <rect x={-36} y={-112} width={72} height={18} rx={6} fill="#2f3a2c" />
    <rect x={-36} y={-18} width={72} height={18} rx={6} fill="#2f3a2c" />
    <path d="M-20,-112 Q0,-150 20,-112" stroke="#2f3a2c" strokeWidth={6} fill="none" />
  </g>
);

const Breath: React.FC<{ p: HikerProps; t: number; flip?: boolean }> = ({ p, t, flip }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const k = (t * 0.5) % 1;
  return (
    <g transform={hikerTransform(p)}>
      <circle cx={hx + (flip ? -1 : 1) * (55 + k * 70)} cy={hy + 10 - k * 24} r={8 + k * 22} fill="#e8eef6" opacity={0.3 * (1 - k)} />
    </g>
  );
};

const Sock: React.FC<{ x: number; y: number; s?: number; rot?: number; col?: string }> = ({ x, y, s = 1, rot = 0, col = "#8a8f96" }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M-40,-160 L40,-160 L40,-20 Q40,30 90,30 L120,30 Q150,30 150,60 Q150,90 110,90 L10,90 Q-40,90 -40,40 Z" fill={col} />
    <rect x={-40} y={-160} width={80} height={36} fill="#e8e2d0" />
    <path d="M110,30 Q150,30 150,60 Q150,90 110,90 Z" fill="#6c7178" />
  </g>
);

const Beanie: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M-110,0 Q-110,-150 0,-150 Q110,-150 110,0 Z" fill="#B83A55" />
    {[-70, -35, 0, 35, 70].map((dx) => (
      <line key={dx} x1={dx} y1={-10} x2={dx * 0.8} y2={-130} stroke="#8E2B42" strokeWidth={6} />
    ))}
    <rect x={-118} y={-30} width={236} height={46} rx={14} fill="#8E2B42" />
    <circle cx={0} cy={-160} r={30} fill="#e8e2d0" />
  </g>
);

// ============ S1 HOOK WIDE: cold night at the campground, Mia shivering near the stove (0 - 4.0) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.03, 1.09, t / 4), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 660, y: g + 60, scale: 2.3, walk: 0, lean: 0.12, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 6) * 2 };
  return (
    <AbsoluteFill>
      <NightBackdrop cam={cam} uid="a" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} />
        <Svg>
          <Tent x={240} y={g + 70} s={1.25} />
          <Stove x={900} y={g + 150} s={1.1} t={t} />
          <circle cx={900} cy={g + 10} r={160} fill="#7fb4ff" opacity={0.08} />
        </Svg>
        <Subject rimX={-5} col="rgba(170,200,255,0.75)">
          <Person {...p} outfit={MIA} expression="tired" noPack />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#13241c" side="both" />
      </Plane>
      <Particles seed={1081} n={18} col="#dfe8ff" fall={14} />
      <Grade sunX={800} sunY={330} warm="200,210,255" cool="20,30,70" vignette={0.6} />
      <Title text={"Never warm\nyour tent with\na camp stove."} t={t} t0={0} top={120} size={116} />
      <Chip text="Cold night at camp" t={t} t0={0.9} x={60} y={600} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: numb fingers held over the stove flame (4.0 - 6.11) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.09, lt / 2.11), rot: hh.rot };
  const rub = Math.sin(t * 9) * 14;
  return (
    <AbsoluteFill>
      <NightBackdrop cam={cam} uid="b" treeY={1000} t={t} blur={9} />
      <Plane cam={cam} depth={1}>
        <Ground y={1300} />
        <Svg>
          <Stove x={540} y={1640} s={3.2} t={t} />
          <circle cx={540} cy={1230} r={260} fill="#7fb4ff" opacity={0.12} />
        </Svg>
        <Subject rimX={-4} col="rgba(170,200,255,0.8)">
          {[-1, 1].map((d) => (
            <g key={d} transform={`translate(${540 + d * (150 + rub * d)},${960}) rotate(${d * 18})`}>
              <rect x={-90} y={-30} width={180} height={300} rx={60} fill={MIA.jacket} transform={`rotate(${-d * 30})`} />
              <ellipse cx={d * -20} cy={-40} rx={78} ry={96} fill={MIA.skin} />
              {[0, 1, 2, 3].map((f) => (
                <rect key={f} x={d * -20 - 64 + f * 34} y={-170} width={28} height={110} rx={14} fill={MIA.skin} />
              ))}
              <ellipse cx={d * -20} cy={-120} rx={70} ry={34} fill="#d9a3a0" opacity={0.55} />
            </g>
          ))}
        </Subject>
      </Plane>
      <Particles seed={1082} n={14} col="#dfe8ff" fall={14} />
      <Grade sunX={540} sunY={1200} warm="170,200,255" cool="20,30,70" vignette={0.6} />
      <Chip text="Fingers numb" t={t} t0={4.05} x={60} y={200} icon="none" big />
      <Chip text="The stove is right there" t={t} t0={4.55} x={60} y={330} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: Mia carries the lit stove toward the tent door (6.11 - 8.86) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.75), rot: hh.rot };
  const g = 1560;
  const ph = t * 3;
  const p: HikerProps = { x: mix(860, 640, at(lt, [0, 2.4], [0, 1])), y: g, scale: 2.4, phase: ph, walk: 0.4, lean: 0.1, poles: false, handOverride: [70, 60], breathe: 0 };
  const [sx, sy] = toScreen(p, [70, 60], true);
  return (
    <AbsoluteFill>
      <NightBackdrop cam={cam} uid="c" treeY={g - 330} t={t} blur={3} />
      <Plane cam={cam} depth={1}>
        <Ground y={g - 60} />
        <Svg>
          <Tent x={170} y={g + 40} s={1.6} open={1} />
        </Svg>
        <Subject rimX={6} col="rgba(170,200,255,0.8)">
          <Person {...p} outfit={MIA} expression="neutral" noPack flip />
          <Stove x={sx} y={sy + 80} s={0.75} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#13241c" side="right" />
      </Plane>
      <Particles seed={1083} n={16} col="#dfe8ff" fall={14} />
      <Grade sunX={800} sunY={330} warm="200,210,255" cool="20,30,70" vignette={0.6} />
      <Chip text="Stove into the tent?" t={t} t0={7.0} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: her friend Noah, hand up: stop (8.86 - 10.44) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35, at(lt, [0.1, 0.3], [1, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.5], [1.12, 1.05], outExpo), rot: hh.rot };
  const s = 4.4;
  const lift = at(lt, [0.1, 0.45], [0, 1], outExpo);
  const p: HikerProps = { x: 520, y: 1700 + 182 * s - 120, scale: s, walk: 0, lean: 0.02, poles: false, handOverride: [mix(40, 100, lift), mix(60, -120, lift)], breathe: Math.sin(t * 2) * 1 };
  return (
    <AbsoluteFill>
      <NightBackdrop cam={cam} uid="d" treeY={1100} t={t} blur={9} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(170,200,255,0.85)">
          <Person {...p} outfit={NOAH} expression="neutral" noPack />
        </Subject>
      </Plane>
      <Particles seed={1084} n={14} col="#dfe8ff" fall={14} />
      <Grade sunX={300} sunY={600} warm="200,210,255" cool="20,30,70" vignette={0.6} />
      <Chip text="Her friend: stop" t={t} t0={9.1} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: tent cutaway, stove inside, invisible gas slowly filling it (10.44 - 13.87) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 3.43), rot: hh.rot };
  const g = 1460;
  const fill = at(t, [12.4, 13.9], [0, 1]);
  return (
    <AbsoluteFill>
      <NightBackdrop cam={cam} uid="e" treeY={g - 320} t={t} blur={4} />
      <Plane cam={cam} depth={1}>
        <Ground y={g - 40} />
        <Subject rimX={4} col="rgba(170,200,255,0.6)">
          <g transform={`translate(540,${g + 60}) scale(2.2)`}>
            <ellipse cx={0} cy={8} rx={230} ry={20} fill="rgba(0,0,0,0.35)" />
            <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill="#2a3524" />
            <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill="none" stroke="#5f7a4a" strokeWidth={10} />
            <rect x={-200} y={-30} width={400} height={30} rx={8} fill="#556a8a" />
            <clipPath id="tentc">
              <path d="M-215,-2 Q-196,-226 0,-246 Q196,-226 215,-2 Z" />
            </clipPath>
            <g clipPath="url(#tentc)">
              <rect x={-230} y={-2 - 250 * fill} width={460} height={260} fill="#9aa3b0" opacity={0.22} />
              {[0, 1, 2].map((i) => (
                <path key={i} d={`M-220,${-10 - 250 * fill + i * 30} q55,-14 110,0 t110,0 t110,0 t110,0`} stroke="#c8cfd8" strokeWidth={3} fill="none" opacity={0.3 * fill} strokeDasharray="10 14" />
              ))}
            </g>
          </g>
          <Stove x={540} y={g + 20} s={1.2} t={t} />
        </Subject>
      </Plane>
      <Particles seed={1085} n={14} col="#dfe8ff" fall={14} />
      <Grade sunX={540} sunY={1300} warm="200,210,255" cool="20,30,70" vignette={0.6} />
      <Chip text="Fuel stove inside a tent" t={t} t0={10.6} x={60} y={200} icon="x" big />
      <Chip text="Heater inside a tent" t={t} t0={11.45} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: Mia's face, listening, the readout card (13.87 - 17.57) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.7), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 600, y: 1700 + 182 * s - 80, scale: s, walk: 0, lean: 0.04, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 2) * 1 };
  return (
    <AbsoluteFill>
      <NightBackdrop cam={cam} uid="f" treeY={1150} t={t} blur={9} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(170,200,255,0.85)">
          <Person {...p} outfit={MIA} expression="neutral" noPack flip />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={1086} n={14} col="#dfe8ff" fall={14} />
      <Grade sunX={800} sunY={330} warm="200,210,255" cool="20,30,70" vignette={0.6} />
      <Readout label="CARBON MONOXIDE" value="No color, no smell" ok={false} t={t} t0={13.95} x={60} y={200} pulseAt={15.75} />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: the safe way: warm drink outside, dry socks, a hat (17.57 - 21.19) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + mix(-30, 30, lt / 3.62), y: hh.y, zoom: mix(1.0, 1.06, lt / 3.62), rot: hh.rot };
  const a = at(t, [18.2, 18.7], [0, 1], outExpo);
  const b = at(t, [19.4, 19.9], [0, 1], outExpo);
  const c = at(t, [20.27, 20.77], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <NightBackdrop cam={cam} uid="g" treeY={900} t={t} blur={10} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={1080} width={1880} height={1600} fill="#6e4c34" />
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1={-400} y1={1140 + i * 110} x2={1480} y2={1140 + i * 110} stroke="#5a3d29" strokeWidth={8} />
          ))}
          <Lantern x={900} y={1170} s={1.4} />
        </Svg>
        <Subject rimX={-4} col="rgba(255,214,160,0.8)">
          <g opacity={a} transform={`translate(0,${(1 - a) * 120})`}>
            <Mug x={250} y={1260} s={1.7} t={t} col="#2F7F86" />
          </g>
          <g opacity={b} transform={`translate(0,${(1 - b) * 120})`}>
            <Sock x={480} y={1330} s={1.1} rot={-6} />
            <Sock x={600} y={1350} s={1.1} rot={8} col="#7b8088" />
          </g>
          <g opacity={c} transform={`translate(0,${(1 - c) * 120})`}>
            <Beanie x={720} y={1060} s={1.1} rot={6} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1087} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={900} sunY={1100} warm={FIRE} vignette={0.55} />
      <Chip text="Warm drink, made outside" t={t} t0={18.2} x={60} y={200} icon="check" big />
      <Chip text="Dry socks" t={t} t0={19.4} x={60} y={330} icon="check" big />
      <Chip text="A hat" t={t} t0={20.27} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF MEDIUM: Mia warm in her bag on a sleeping pad, lantern on, stove outside (21.19 - 23.4) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: at(lt, [0, 1.2], [1.14, 1.04], outExpo), rot: hh.rot };
  const g = 1500;
  const pad = at(t, [21.3, 21.8], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <NightBackdrop cam={cam} uid="h" treeY={g - 340} t={t} blur={3} />
      <Plane cam={cam} depth={1}>
        <Ground y={g - 40} />
        <Svg>
          <g transform={`translate(470,${g + 60}) scale(2.0)`}>
            <ellipse cx={0} cy={8} rx={230} ry={20} fill="rgba(0,0,0,0.35)" />
            <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill="#4a3a26" />
            <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill="rgba(255,200,120,0.32)" />
            <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill="none" stroke="#5f7a4a" strokeWidth={12} />
          </g>
          <circle cx={470} cy={g - 200} r={360} fill="#ffd690" opacity={0.12} />
          <Lantern x={720} y={g - 30} s={0.9} />
          <Stove x={980} y={g + 150} s={0.8} t={t} flame={0} />
        </Svg>
        <Subject rimX={-5} col="rgba(255,214,160,0.85)">
          {/* sleeping pad slides under the bag */}
          <rect x={mix(-500, 70, pad)} y={g + 10} width={720} height={44} rx={20} fill="#2F7F86" />
          <path d={`M90,${g + 12} Q90,${g - 110} 260,${g - 110} L700,${g - 90} Q760,${g - 60} 720,${g + 12} Z`} fill="#C9A23E" />
          <path d={`M300,${g - 104} L700,${g - 86}`} stroke="#a5832c" strokeWidth={6} />
          <circle cx={190} cy={g - 150} r={58} fill={MIA.skin} />
          <path d={`M132,${g - 160} Q190,${g - 260} 248,${g - 160} Z`} fill="#B83A55" />
          <circle cx={190} cy={g - 252} r={16} fill="#e8e2d0" />
          <circle cx={212} cy={g - 148} r={6} fill="#2a2a2a" />
          <path d={`M200,${g - 122} q14,10 28,0`} stroke="#2a2a2a" strokeWidth={5} fill="none" strokeLinecap="round" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#13241c" side="left" />
      </Plane>
      <Rays x={470} y={g - 300} strength={0.18} col="255,214,160" />
      <Particles seed={1088} n={16} col="#ffe7b0" fall={8} />
      <Grade sunX={470} sunY={g - 200} warm={FIRE} vignette={0.55} />
      <Chip text="Sleeping pad under the bag" t={t} t0={21.3} x={60} y={200} icon="check" big />
      <Chip text="Stove stays outside" t={t} t0={22.3} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/camping-trip-planner-checklists.jpg"
      photoH={720}
      spec="24 PAGES · STOVE SAFETY + CHECKLISTS"
      name={
        <>
          Camping Trip
          <br />
          Planner
        </>
      }
      nameSize={104}
      price="$5.99"
      save="Save this before your next camping trip"
    />
  );
};

export const V108: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.05} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.0} to={6.16} fadeIn={0.08} fadeOut={0.08}>
      <S2 off={4.0} />
    </Scene>
    <Scene from={6.11} to={8.91} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.11} />
    </Scene>
    <Scene from={8.86} to={10.49} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={8.86} />
    </Scene>
    <Scene from={10.44} to={13.92} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={10.44} />
    </Scene>
    <Scene from={13.87} to={17.62} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={13.87} />
    </Scene>
    <Scene from={17.57} to={21.24} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={17.57} />
    </Scene>
    <Scene from={21.19} to={23.5} fadeIn={0.12} fadeOut={0.1}>
      <S8 off={21.19} />
    </Scene>
    <Scene from={23.3} to={28} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.0, 1560],
        [4.0, 6.11, 1560],
        [6.11, 8.86, 1560],
        [8.86, 10.44, 1560],
        [10.44, 13.87, 1560],
        [13.87, 17.57, 1560],
        [17.57, 21.19, 1560],
        [21.19, 23.3, 1560],
      ]}
    />
  </AbsoluteFill>
);
