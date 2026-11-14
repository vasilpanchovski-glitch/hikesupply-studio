// V153: "The wind pulled her tent stakes out." in the cinematic C01 style, a cold windy camp night. Story for the
// Aluminum Tent Stakes — 7 in (18 cm), Pack of 10 with Hooks (from $16.99, live Shopify). Advice (simple, safe): push each stake
// in at about 45 degrees with the top leaning away from the tent, all the way down so only the hook shows; stake the windward
// side first, then tighten every guyline. No numbers beyond the angle, no claims. End card = real Shopify photo, cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import vo from "../vo/v153.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#0f1830", mid: "#22304c", low: "#45526e", sun: [820, 330], sunR: 28, sunCol: "#f1efe4", glow: "#8f9ab4" };
const DAWN: Sky = { top: "#2f4f78", mid: "#9db2c9", low: "#f1d9c0", sun: [300, 760], sunR: 50, sunCol: "#fff2dc", glow: "#ffcf9c" };

const LENA: Outfit = {
  ...JAKE,
  skin: "#E8B896",
  skinShade: "#C99676",
  hair: "#6a3f24",
  ponytail: "#6a3f24",
  beard: null,
  cap: "#B83A55",
  capShade: "#8E2B42",
  jacket: "#2F7F86",
  jacketShade: "#246970",
  pants: "#3a3e46",
  pantsShade: "#2a2d33",
  glove: null,
};

const LowScrim: React.FC<{ k?: number }> = ({ k = 0.55 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: `linear-gradient(180deg, rgba(10,16,26,0) 0%, rgba(10,16,26,${k}) 45%, rgba(10,16,26,${k}) 70%, rgba(10,16,26,0) 100%)` }} />
);

// ---------- scenery ----------
const Stars: React.FC = () => (
  <Svg>
    {Array.from({ length: 46 }, (_, i) => (
      <circle key={i} cx={(i * 263) % 1080} cy={60 + ((i * 151) % 760)} r={1.5 + (i % 3)} fill="#f4f1e6" opacity={0.45 + (i % 4) * 0.12} />
    ))}
  </Svg>
);

const Woods: React.FC<{ y: number; shift: number; c?: string; c2?: string }> = ({ y, shift, c = "#1b2f27", c2 = "#13241d" }) => (
  <Svg>
    {Array.from({ length: 12 }, (_, i) => {
      const x = ((((-160 + i * 150 - shift) % 1800) + 1800) % 1800) - 300;
      return <Pine key={i} x={x} y={y + (i % 2) * 20} h={420 + (i % 3) * 90} c={c} c2={c2} />;
    })}
  </Svg>
);

const CampBackdrop: React.FC<{ cam: Cam; uid: string; treeY: number; t: number; blur?: number; sky?: Sky }> = ({ cam, uid, treeY, t, blur = 0, sky = NIGHT }) => {
  const night = sky === NIGHT;
  return (
    <>
      <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
        <SkyPlane sky={sky} uid={uid} />
        {night && <Stars />}
        <Clouds y={300} col={night ? "#5a6684" : "#f3d9c4"} seed={uid.charCodeAt(0)} drift={t * (night ? 60 : 10)} opacity={0.35} />
      </Plane>
      <Plane cam={cam} depth={0.14} blur={2.6 + blur}>
        <Ridge seed={61} base={treeY - 260} amp={320} scale={250} col={night ? "#2f3a52" : "#6f7f98"} lit={night ? "#6f7c98" : "#f0d2b4"} peak={110} />
      </Plane>
      <Haze y={treeY - 400} h={360} col={sky.low} opacity={0.4} />
      <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
        <Ridge seed={67} base={treeY - 90} amp={180} scale={180} col={night ? "#22303a" : "#4c5e66"} />
      </Plane>
      <Plane cam={cam} depth={0.5} blur={1 + blur}>
        <Woods y={treeY} shift={cam.x * 0.2} c={night ? "#1b2f27" : "#2b4a3a"} c2={night ? "#13241d" : "#21392d"} />
      </Plane>
    </>
  );
};

const Ground: React.FC<{ y: number; frost?: number }> = ({ y, frost = 0.5 }) => (
  <Svg>
    <path d={`M-400,${y} Q540,${y - 30} 1480,${y} L1480,2600 L-400,2600 Z`} fill="#3d4232" />
    <path d={`M-400,${y} Q540,${y - 30} 1480,${y} L1480,${y + 26} Q540,${y - 4} -400,${y + 26} Z`} fill={`rgba(220,230,236,${0.35 * frost})`} />
    <path d={`M-400,${y + 200} Q540,${y + 170} 1480,${y + 200} L1480,2600 L-400,2600 Z`} fill="#32372b" />
    {Array.from({ length: 20 }, (_, i) => {
      const x = -360 + i * 96;
      const yy = y + 40 + ((i * 59) % 300);
      return <path key={i} d={`M${x},${yy} q6,-26 12,-48 M${x + 10},${yy} q-4,-22 -10,-38`} stroke="#545b40" strokeWidth={5} fill="none" strokeLinecap="round" />;
    })}
  </Svg>
);

// Wind streaks blowing left to right.
const Wind: React.FC<{ t: number; k?: number; seed?: number }> = ({ t, k = 1, seed = 1 }) => (
  <Svg>
    {Array.from({ length: 14 }, (_, i) => {
      const sp = 900 + ((i * 137 + seed * 53) % 500);
      const y = 300 + ((i * 211 + seed * 97) % 1200);
      const x = (((t * sp + i * 431 + seed * 71) % 1700) + 1700) % 1700 - 300;
      const len = 120 + (i % 4) * 60;
      return <path key={i} d={`M${x},${y} q${len / 2},-14 ${len},0`} stroke="#dfe8f2" strokeWidth={3 + (i % 3)} strokeLinecap="round" fill="none" opacity={0.28 * k} />;
    })}
  </Svg>
);

// Dome tent. flap = side wall flutter, fold = right corner caving in, glow = lantern light, taut = guylines drawn tight.
const WindTent: React.FC<{ x: number; y: number; s?: number; t: number; flap?: number; fold?: number; glow?: number; lines?: number }> = ({ x, y, s = 1, t, flap = 0, fold = 0, glow = 0, lines = 0 }) => {
  const f = Math.sin(t * 17) * 18 * flap + Math.sin(t * 29) * 8 * flap;
  const rx = 220 - fold * 70; // right corner pulls in
  const ry = -fold * 60;
  const right = `Q${200 + f},${-230 + f * 0.4} ${rx},${ry}`;
  const body = `M-220,0 Q-200,-230 0,-250 ${right} Z`;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <ellipse cx={0} cy={8} rx={240} ry={20} fill="rgba(0,0,0,0.35)" />
      {lines > 0 && (
        <g stroke="#e9e3d2" strokeWidth={2.5} opacity={0.85 * lines}>
          <path d="M-150,-170 L-340,0" />
          <path d={`M150,-170 L340,0`} />
        </g>
      )}
      <path d={body} fill="#c2662e" />
      <path d={`M0,-250 ${right} L80,0 Q90,-150 0,-250 Z`} fill="#9b4e20" />
      {glow > 0 && <path d={body} fill={`rgba(255,200,120,${0.28 * glow})`} />}
      <path d="M-90,0 Q-80,-160 0,-180 Q80,-160 90,0 Z" fill={glow > 0 ? `rgba(255,214,150,${0.5 + glow * 0.35})` : "#3a2a1c"} />
      <path d={`M-200,-60 Q0,-120 ${190 - fold * 60 + f * 0.6},${-60 - fold * 30}`} stroke="#6e3814" strokeWidth={5} fill="none" />
      {fold > 0 && <path d={`M${rx},${ry} L${rx + 10},${ry + 20} L220,0`} stroke="#6e3814" strokeWidth={4} fill="none" strokeDasharray="10 8" opacity={fold} />}
    </g>
  );
};

// Hook stake in local coords: top of the hook at (0,0), shaft down along +y, length L.
const Stake: React.FC<{ L?: number; w?: number }> = ({ L = 520, w = 18 }) => (
  <g>
    <path d={`M-58,22 Q-60,-14 -20,-14 L4,-14 Q20,-14 20,10 L20,${L - 30} L0,${L} L-12,${L - 30} L-12,10`} fill="none" stroke="#9aa3ab" strokeWidth={w} strokeLinejoin="round" strokeLinecap="round" />
    <path d={`M-52,14 Q-52,-6 -20,-6 L2,-6 Q12,-6 12,12 L12,${L - 40}`} fill="none" stroke="#e8edf1" strokeWidth={w * 0.32} strokeLinecap="round" />
  </g>
);

// Simple illustrated hand (palm down), fingers to the left. skin colours from the outfit.
const Hand: React.FC<{ o: Outfit; sleeve?: string }> = ({ o, sleeve }) => (
  <g>
    {sleeve && <path d="M120,-70 L520,-90 L520,90 L120,70 Z" fill={sleeve} />}
    <path d="M-110,-50 Q-130,0 -110,50 L60,70 Q140,60 150,0 Q140,-60 60,-70 Z" fill={o.skin} />
    {[-40, -12, 16, 42].map((y, i) => (
      <path key={i} d={`M-100,${y} L-${190 - Math.abs(i - 1.5) * 18},${y + 4}`} stroke={o.skin} strokeWidth={26} strokeLinecap="round" />
    ))}
    <path d="M40,-64 Q-20,-110 -70,-100" stroke={o.skin} strokeWidth={30} strokeLinecap="round" fill="none" />
    <path d="M-110,50 L60,70 Q140,60 150,0" stroke={o.skinShade} strokeWidth={10} fill="none" />
  </g>
);

const HeadLamp: React.FC<{ p: HikerProps; on: number; flip?: boolean }> = ({ p, on }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${hx - 26},${hy - 12} Q${hx},${hy - 6} ${hx + 24},${hy - 14}`} stroke="#1d2024" strokeWidth={6} fill="none" />
      <rect x={hx + 14} y={hy - 23} width={20} height={14} rx={4} fill="#1d2024" />
      <rect x={hx + 16} y={hy - 20} width={14} height={4} rx={2} fill="#fff6a8" />
      <circle cx={hx + 34} cy={hy - 16} r={10} fill="#fff6c8" opacity={0.75 * on} />
    </g>
  );
};

const Beam: React.FC<{ from: [number, number]; to: [number, number]; w: number; k?: number }> = ({ from, to, w, k = 1 }) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const L = Math.hypot(dx, dy);
  const nx = -dy / L;
  const ny = dx / L;
  return (
    <Svg>
      <path d={`M${from[0]},${from[1]} L${to[0] + nx * w},${to[1] + ny * w} L${to[0] - nx * w},${to[1] - ny * w} Z`} fill={`rgba(255,246,200,${0.16 * k})`} />
      <ellipse cx={to[0]} cy={to[1]} rx={w * 1.1} ry={w * 0.4} fill={`rgba(255,246,200,${0.22 * k})`} />
    </Svg>
  );
};

const lampPos = (p: HikerProps): [number, number] => {
  const [hx, hy] = hikerGeometry(p).head;
  const s = p.scale ?? 1;
  return [p.x + (hx + 34) * s, p.y + (hy - 16 - 182) * s];
};

// ============ S1 HOOK MEDIUM: 2 a.m., Lena outside her flapping tent, headlamp on (0 - 4.45) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x - t * 10, y: hh.y, zoom: mix(1.03, 1.1, t / 4.45), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 300, y: g + 40, scale: 2.3, walk: 0, lean: 0.05, poles: false, handOverride: [40, 30], breathe: Math.sin(t * 4) * 2 };
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} uid="a" treeY={1260} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} />
        <Svg>
          <WindTent x={720} y={g + 10} s={1.45} t={t} flap={1} glow={0.8} lines={1} />
        </Svg>
        <Beam from={lampPos(p)} to={[640, g - 120]} w={110} k={0.9} />
        <Subject rimX={6} col="rgba(255,214,160,0.8)">
          <Person {...p} outfit={LENA} noPack expression="tired" />
          <Svg>
            <HeadLamp p={p} on={1} />
          </Svg>
        </Subject>
      </Plane>
      <Wind t={t} seed={1} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#13241d" side="left" sway={Math.sin(t * 6) * 6} />
      </Plane>
      <Particles seed={1531} n={14} col="#ffffff" fall={10} />
      <LowScrim k={0.6} />
      <Grade sunX={820} sunY={330} warm="230,232,244" cool="20,30,60" vignette={0.6} />
      <Title text={"The wind pulled\nher tent stakes\nout."} t={t} t0={0} top={110} size={124} />
      <Chip text="2 a.m." t={t} t0={1.2} x={60} y={640} icon="none" big />
      <Chip text="Tent flapping" t={t} t0={3.3} x={60} y={770} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: a stake lies pulled out of soft ground, guyline whipping (4.45 - 6.6) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4, at(t, [5.3, 5.45, 5.75], [0, 1, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.05, 1.13, lt / 2.15), rot: hh.rot };
  const out = at(t, [5.2, 5.55], [0, 1], outExpo);
  const whip = Math.sin(t * 14) * 60;
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} uid="b" treeY={1000} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-200,1080 Q540,1030 1300,1080 L1300,2400 L-200,2400 Z" fill="#4a4436" />
          <path d="M-200,1080 Q540,1030 1300,1080 L1300,1110 Q540,1060 -200,1110 Z" fill="rgba(220,230,236,0.25)" />
          {Array.from({ length: 14 }, (_, i) => (
            <path key={i} d={`M${-100 + i * 95},${1180 + ((i * 71) % 260)} q8,-30 14,-54`} stroke="#5f6648" strokeWidth={7} fill="none" strokeLinecap="round" />
          ))}
          {/* the hole the stake left */}
          <ellipse cx={560} cy={1290} rx={46} ry={16} fill="#231e17" />
          <ellipse cx={560} cy={1284} rx={70} ry={22} fill="none" stroke="#6b5d48" strokeWidth={8} />
        </Svg>
        <Subject rimX={5} col="rgba(255,230,200,0.75)">
          <Svg>
            {/* guyline from upper left (tent) to the loose stake, whipping */}
            <path d={`M-60,520 Q${380 + whip},${760 - out * 80} ${mix(560, 720, out)},${mix(1270, 1150, out)}`} stroke="#e9e3d2" strokeWidth={7} fill="none" />
            <g transform={`translate(${mix(560, 720, out)},${mix(1270, 1150, out)}) rotate(${mix(0, 72, out) + whip * 0.05})`}>
              <g transform={`translate(0,${mix(-120, 0, out)})`}>
                <g transform="scale(1.7)">
                  <Stake L={420} w={22} />
                </g>
              </g>
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Wind t={t} seed={2} />
      <Particles seed={1532} n={10} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={330} warm="232,232,240" cool="20,30,60" vignette={0.6} />
      <Chip text="Stake pulled out" t={t} t0={5.3} x={60} y={200} icon="x" big />
      <Chip text="Soft ground" t={t} t0={6.2} x={60} y={330} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE-MEDIUM: the corner caves in on her (6.6 - 9.05) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.7, at(t, [7.2, 7.35, 7.7], [0, 1, 0]));
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.04, 1.12, lt / 2.45), rot: hh.rot };
  const fold = at(t, [6.9, 7.9], [0, 1], outExpo);
  const g = 1460;
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} uid="c" treeY={1240} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} />
        <Subject rimX={5} col="rgba(255,214,160,0.7)">
          <Svg>
            <WindTent x={540} y={g + 20} s={2.15} t={t} flap={1.3} fold={fold} glow={0.9} />
          </Svg>
        </Subject>
      </Plane>
      <Wind t={t} seed={3} k={1.3} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#13241d" side="right" sway={Math.sin(t * 6) * 8} />
      </Plane>
      <Particles seed={1533} n={14} col="#ffffff" fall={12} />
      <LowScrim k={0.6} />
      <Grade sunX={820} sunY={330} warm="230,232,244" cool="20,30,60" vignette={0.6} />
      <Readout label="TENT CORNER" value="Folding in" ok={false} t={t} t0={7.2} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: the fix, Lena bends at the corner with a stake (9.05 - 11.9) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 8, y: hh.y, zoom: mix(1.05, 1.12, lt / 2.85), rot: hh.rot };
  const g = 1500;
  const bend = at(t, [9.6, 10.6], [0.1, 0.75], outExpo);
  const p: HikerProps = { x: 640, y: g + 40, scale: 2.4, walk: 0, lean: bend, poles: false, handOverride: [mix(40, 120, bend), mix(30, 110, bend)], breathe: 0 };
  const [hx, hy] = (() => {
    const s = p.scale ?? 1;
    const h = p.handOverride ?? [0, 0];
    return [p.x - h[0] * s, p.y + (h[1] - 182) * s];
  })();
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} uid="d" treeY={1260} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} />
        <Svg>
          <WindTent x={180} y={g + 10} s={1.5} t={t} flap={0.6} fold={0.6} glow={0.8} />
        </Svg>
        <Beam from={lampPos({ ...p, x: p.x, scale: p.scale })} to={[360, g + 10]} w={90} k={0.9} />
        <Subject rimX={-6} col="rgba(255,214,160,0.8)">
          <Person {...p} flip outfit={LENA} noPack expression="neutral" />
          <Svg>
            <g transform={`translate(${p.x},0) scale(-1,1) translate(${-p.x},0)`}>
              <HeadLamp p={p} on={1} />
            </g>
            <g transform={`translate(${hx - 10},${hy - 10}) rotate(${mix(0, -40, bend)}) scale(0.55)`}>
              <Stake L={300} w={24} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Wind t={t} seed={4} k={0.8} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#13241d" side="right" />
      </Plane>
      <Particles seed={1534} n={12} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={330} warm="236,232,236" cool="20,30,60" vignette={0.55} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={10.4} top={200} size={124} />
      <Chip text="Each stake" t={t} t0={10.8} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: stake goes in at about 45 degrees, top leaning away from the tent (11.9 - 15.45) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.55), rot: hh.rot };
  const gy = 1200; // ground line
  const push = at(t, [12.2, 13.3], [0, 1], outExpo);
  const arc = at(t, [12.3, 12.9], [0, 1]);
  const lean = at(t, [13.5, 14.2], [0, 1]);
  // stake tip enters at (520, gy); shaft at 45 deg, top up and to the right (away from tent on the left)
  const depth = mix(80, 250, push);
  const ang = 45;
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} uid="e" treeY={950} t={t} blur={14} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-200,${gy} L1300,${gy - 10} L1300,2400 L-200,2400 Z`} fill="#4a4436" />
          <path d={`M-200,${gy} L1300,${gy - 10} L1300,${gy + 24} L-200,${gy + 34} Z`} fill="rgba(220,230,236,0.25)" />
          {/* tent wall on the left edge */}
          <path d={`M-200,${gy} L-200,300 Q60,420 140,${gy} Z`} fill="#c2662e" />
          <path d={`M140,${gy} Q60,420 -200,300 L-200,360 Q30,470 90,${gy} Z`} fill="#9b4e20" />
        </Svg>
        <Subject rimX={5} col="rgba(255,230,190,0.85)">
          <Svg>
            {/* guyline from tent to the hook */}
            <path d={`M120,620 L${520 + Math.cos(((-ang) * Math.PI) / 180) * (420 - depth) * 1},${gy - Math.sin((ang * Math.PI) / 180) * (420 - depth)}`} stroke="#e9e3d2" strokeWidth={6} />
            <g transform={`translate(${520 + Math.cos((ang * Math.PI) / 180) * (420 - depth)},${gy - Math.sin((ang * Math.PI) / 180) * (420 - depth)}) rotate(${ang})`}>
              <Stake L={420} w={26} />
            </g>
            {/* soil covering the buried part */}
            <path d={`M-200,${gy} L1300,${gy - 10} L1300,${gy + 600} L-200,${gy + 600} Z`} fill="#4a4436" />
            <path d={`M-200,${gy} L1300,${gy - 10} L1300,${gy + 24} L-200,${gy + 34} Z`} fill="rgba(220,230,236,0.25)" />
            {/* angle arc and lean arrow */}
            <g opacity={arc}>
              <path d={`M${520 + 230},${gy - 4} A230,230 0 0 0 ${520 + 230 * Math.cos(Math.PI / 4)},${gy - 230 * Math.sin(Math.PI / 4)}`} stroke="#fff6dc" strokeWidth={7} fill="none" strokeDasharray="16 12" />
              <path d={`M520,${gy - 4} L800,${gy - 4}`} stroke="#fff6dc" strokeWidth={5} strokeDasharray="10 10" opacity={0.7} />
            </g>
            <g opacity={lean}>
              <path d={`M640,${gy - 520} q140,-30 220,40`} stroke="#fff6dc" strokeWidth={9} fill="none" strokeLinecap="round" />
              <path d={`M860,${gy - 480} l-50,-6 l26,-40 Z`} fill="#fff6dc" />
            </g>
          </Svg>
          {/* hand pressing the stake top */}
          <Svg>
            <g transform={`translate(${520 + Math.cos(Math.PI / 4) * (420 - depth) + 40},${gy - Math.sin(Math.PI / 4) * (420 - depth) - 70}) rotate(-35) scale(1.0)`} opacity={at(t, [11.95, 12.15], [0, 1])}>
              <Hand o={LENA} sleeve={LENA.jacket} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1535} n={8} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={820} sunY={330} warm="240,232,226" cool="20,30,60" vignette={0.55} />
      <Chip text="About 45 degrees" t={t} t0={12.2} x={60} y={200} icon="check" big />
      <Chip text="Top leans away from tent" t={t} t0={13.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: pushed all the way down, only the hook shows, guyline on the hook (15.45 - 17.95) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3, at(t, [16.15, 16.3, 16.6], [0, 0.6, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.08, 1.16, lt / 2.5), rot: hh.rot };
  const gy = 1180;
  const down = at(t, [15.6, 16.2], [0, 1], outExpo);
  const loop = at(t, [16.6, 17.3], [0, 1], outExpo);
  const exposed = mix(260, 40, down); // shaft length still above ground
  const ang = 45;
  const c = Math.cos((ang * Math.PI) / 180);
  const s = Math.sin((ang * Math.PI) / 180);
  const top: [number, number] = [470 + c * exposed, gy - s * exposed];
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} uid="f" treeY={900} t={t} blur={16} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,230,190,0.85)">
          <Svg>
            <g transform={`translate(${top[0]},${top[1]}) rotate(${ang}) scale(2.2)`}>
              <Stake L={420} w={22} />
            </g>
            <path d={`M-200,${gy} L1300,${gy - 6} L1300,2400 L-200,2400 Z`} fill="#4a4436" />
            <path d={`M-200,${gy} L1300,${gy - 6} L1300,${gy + 26} L-200,${gy + 32} Z`} fill="rgba(220,230,236,0.28)" />
            {Array.from({ length: 10 }, (_, i) => (
              <path key={i} d={`M${-60 + i * 130},${gy + 90 + ((i * 53) % 200)} q8,-30 14,-54`} stroke="#5f6648" strokeWidth={8} fill="none" strokeLinecap="round" />
            ))}
            {/* guyline loop slips over the hook */}
            <path d={`M-100,${mix(500, 560, loop)} Q${mix(200, 260, loop)},${mix(700, 780, loop)} ${mix(top[0] - 300, top[0] - 60, loop)},${mix(top[1] - 200, top[1] - 20, loop)}`} stroke="#e9e3d2" strokeWidth={9} fill="none" />
            <ellipse cx={mix(top[0] - 300, top[0] - 50, loop)} cy={mix(top[1] - 200, top[1] - 10, loop)} rx={34} ry={18} fill="none" stroke="#e9e3d2" strokeWidth={8} transform={`rotate(-30 ${mix(top[0] - 300, top[0] - 50, loop)} ${mix(top[1] - 200, top[1] - 10, loop)})`} />
          </Svg>
          {/* palm pushing it down */}
          <Svg>
            <g transform={`translate(${top[0] + 70},${top[1] - mix(110, 70, down) - at(t, [16.4, 16.9], [0, 400])}) rotate(-30) scale(1.4)`} opacity={at(t, [16.5, 16.9], [1, 0])}>
              <Hand o={LENA} sleeve={LENA.jacket} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1536} n={8} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={820} sunY={330} warm="240,232,226" cool="20,30,60" vignette={0.55} />
      <Chip text="All the way down" t={t} t0={15.7} x={60} y={200} icon="check" big />
      <Chip text="Only the hook shows" t={t} t0={17.0} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 MEDIUM: windward side first, then she tightens every guyline (17.95 - 21.75) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.8), rot: hh.rot };
  const g = 1500;
  const tight = at(t, [19.8, 20.9], [0, 1], outExpo);
  const pull = Math.sin(at(t, [19.8, 20.9], [0, Math.PI * 3])) * 10;
  const p: HikerProps = { x: 300, y: g + 40, scale: 2.3, walk: 0, lean: 0.35, poles: false, handOverride: [mix(70, 30, tight) + pull, 40], breathe: 0 };
  const sag = mix(70, 0, tight);
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} uid="g" treeY={1260} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} />
        <Svg>
          <WindTent x={650} y={g + 10} s={1.4} t={t} flap={mix(0.5, 0.05, tight)} glow={0.85} />
          {/* windward guylines (left), sagging, then taut */}
          <path d={`M${650 - 150 * 1.4},${g + 10 - 170 * 1.4} Q${380},${g - 60 + sag} ${180},${g + 14}`} stroke="#e9e3d2" strokeWidth={4} fill="none" />
          <path d={`M${650 + 150 * 1.4},${g + 10 - 170 * 1.4} L${1000},${g + 14}`} stroke="#e9e3d2" strokeWidth={4} opacity={0.6} />
          <g transform={`translate(180,${g + 10}) rotate(-45) scale(0.3)`}>
            <Stake L={160} w={28} />
          </g>
          {/* windward side marker */}
          <g opacity={at(t, [18.4, 18.8], [0, 1])}>
            <path d={`M60,${g - 560} L260,${g - 560}`} stroke="#fff6dc" strokeWidth={10} strokeLinecap="round" />
            <path d={`M280,${g - 560} l-46,-26 l0,52 Z`} fill="#fff6dc" />
          </g>
        </Svg>
        <Beam from={lampPos(p)} to={[200, g - 20]} w={70} k={0.8} />
        <Subject rimX={6} col="rgba(255,214,160,0.8)">
          <Person {...p} outfit={LENA} noPack expression="neutral" />
          <Svg>
            <HeadLamp p={p} on={1} />
          </Svg>
        </Subject>
      </Plane>
      <Wind t={t} seed={7} k={0.7} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#13241d" side="right" />
      </Plane>
      <Particles seed={1537} n={12} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={330} warm="236,232,236" cool="20,30,60" vignette={0.55} />
      <Chip text="Windward side first" t={t} t0={18.5} x={60} y={200} icon="check" big />
      <Chip text="Tighten every guyline" t={t} t0={20.0} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: dawn, the tent stands taut, Lena smiles (21.75 - 23.95) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 300, y: g + 40, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2) * 2 };
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} uid="h" treeY={1260} t={t} sky={DAWN} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} frost={1} />
        <Svg>
          <WindTent x={700} y={g + 10} s={1.45} t={t} lines={1} />
        </Svg>
        <Subject rimX={6} col="rgba(255,214,160,0.9)">
          <Person {...p} outfit={LENA} noPack expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1f3a2c" side="left" />
      </Plane>
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.42} col="255,226,190" />
      <Particles seed={1538} n={20} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={300} sunY={760} warm="255,222,186" />
      <Readout label="TILL MORNING" value="Tent held" ok={true} t={t} t0={22.0} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/aluminum-tent-stakes-10-pack-cut.png"
      cutoutH={700}
      spec="7 IN (18 CM) · PACK OF 10 · HOOKS"
      name={
        <>
          Aluminum
          <br />
          Tent Stakes
        </>
      }
      nameSize={96}
      price="From $16.99"
      save="Save this before your next camp night"
    />
  );
};

export const V153: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.5} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.45} to={6.65} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.45} />
    </Scene>
    <Scene from={6.6} to={9.1} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.6} />
    </Scene>
    <Scene from={9.05} to={11.95} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.05} />
    </Scene>
    <Scene from={11.9} to={15.5} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.9} />
    </Scene>
    <Scene from={15.45} to={18.0} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={15.45} />
    </Scene>
    <Scene from={17.95} to={21.8} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={17.95} />
    </Scene>
    <Scene from={21.75} to={24.0} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={21.75} />
    </Scene>
    <Scene from={23.8} to={28.5} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.45, 1600],
        [4.45, 6.6, 1660],
        [6.6, 9.05, 1600],
        [9.05, 11.9, 1600],
        [11.9, 15.45, 1660],
        [15.45, 17.95, 1660],
        [17.95, 21.75, 1600],
        [21.75, 23.8, 1600],
      ]}
    />
  </AbsoluteFill>
);
