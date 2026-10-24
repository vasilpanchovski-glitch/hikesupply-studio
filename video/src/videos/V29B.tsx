// V29B: v29 "Three whistle blasts" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v29b.json";

const words = vo.words as unknown as Word[];

const WOODS: Sky = { top: "#4d6a86", mid: "#a9bac4", low: "#e6e3d4", sun: [790, 600], sunR: 46, sunCol: "#fbf7ea", glow: "#f1ecd8" };
const DIM: Sky = { top: "#33475c", mid: "#7e8f9a", low: "#c4c6bd", sun: [800, 640], sunR: 36, sunCol: "#e9e6da", glow: "#cfd0c4" };
const WARM: Sky = { top: "#3a6d9e", mid: "#b9cfe0", low: "#f7e6c4", sun: [820, 620], sunR: 52, sunCol: "#fffbe8", glow: "#ffe2a6" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const RACHEL: Outfit = { ...GUIDE, skin: "#E8B996", skinShade: "#CC9A76", hair: "#7a4a2a", ponytail: "#7a4a2a", beard: null, cap: "#3E5F4B", capShade: "#2E4A39", jacket: "#5F7F99", jacketShade: "#4A6478", pants: "#3E4650", pantsShade: "#2E353D", pack: "#B5553A", packShade: "#8E3F2A" };
const HIKER1: Outfit = { ...JAKE, jacket: "#C2662E", jacketShade: "#9B4E20" };
const HIKER2: Outfit = { ...GUIDE, skin: "#9A6247", skinShade: "#7E4E37", hair: "#1f1a18", ponytail: "#1f1a18", beard: null, jacket: "#3F6B55", jacketShade: "#2D5141", cap: "#C9B48E", capShade: "#A8946F" };
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e"];

const Woods: React.FC<{ y: number; shift: number; s?: number }> = ({ y, shift, s = 1 }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = (440 + (i % 3) * 70) * s;
      return i % 3 === 1 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c="#3b6550" c2="#2b4d3c" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={i % 2 ? "#d9963a" : "#b9582c"} c2={i % 2 ? "#b77a28" : "#94461f"} />
      );
    })}
  </Svg>
);

const Trail: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={900} fill="#5f7a44" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 4} L1480,${y + 120} Q540,${y + 90} -400,${y + 120} Z`} fill="#c0a67e" />
    {Array.from({ length: 14 }, (_, i) => (
      <path key={i} d={`M${-300 + i * 120},${y - 46} l-8,-30 m8,30 l6,-36 m-6,36 l14,-24`} stroke="#4d6436" strokeWidth={5} strokeLinecap="round" />
    ))}
  </Svg>
);

// ---------- shared world: sky -> far ridge -> haze -> mid ridge -> tree line ----------
const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; trees?: boolean }> = ({ cam, sky, uid, treeY, blur = 0, t, trees = true }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={3} drift={t * (trees ? 12 : 40)} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={11} base={treeY - 260} amp={380} scale={250} col="#8fa3b4" lit="#e8eef2" peak={160} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.75} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={23} base={treeY - 120} amp={260} scale={180} col="#6f8577" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.45} />
    {trees && (
      <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
        <Woods y={treeY} shift={cam.x * 0.2} />
      </Plane>
    )}
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);


const Boulder: React.FC<{ x: number; y: number; s?: number; wet?: boolean }> = ({ x, y, s = 1, wet = true }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M-260,40 Q-250,-120 -120,-150 Q20,-176 150,-130 Q260,-90 270,40 Z" fill="#7d8384" />
    <path d="M20,-170 Q150,-130 150,-130 Q260,-90 270,40 L60,40 Z" fill="rgba(0,0,0,0.16)" />
    <path d="M-200,-90 Q-120,-130 -40,-128" stroke="rgba(255,255,255,0.5)" strokeWidth={8} fill="none" strokeLinecap="round" />
    {wet && <path d="M-150,-60 Q-90,-80 -40,-78" stroke="rgba(220,240,255,0.55)" strokeWidth={6} fill="none" strokeLinecap="round" />}
    <path d="M-120,-150 Q-60,-168 10,-166" stroke="#5f7a44" strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.7} />
  </g>
);

// Sound arcs from a point (local coords). Weak voice = short reach, whistle = wide reach.
const Rings: React.FC<{ x: number; y: number; t: number; starts: number[]; reach: number; w?: number; col?: string }> = ({ x, y, t, starts, reach, w = 8, col = "#fff" }) => (
  <g>
    {starts.map((s, i) => {
      const k = (t - s) / 0.9;
      if (k < 0 || k > 1) return null;
      const r = 30 + Math.sqrt(k) * reach;
      return (
        <path key={i} d={`M${x + r * Math.cos(-0.7)},${y + r * Math.sin(-0.7)} A${r},${r} 0 0 1 ${x + r * Math.cos(0.7)},${y + r * Math.sin(0.7)}`} stroke={col} strokeWidth={w * (1 - k * 0.6)} fill="none" strokeLinecap="round" opacity={1 - k} />
      );
    })}
  </g>
);

const Whistle: React.FC<{ x: number; y: number; s: number; o?: number; rot?: number }> = ({ x, y, s, o = 1, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={0} y={-10} width={34} height={20} rx={5} fill="#E0784A" />
    <circle cx={34} cy={2} r={14} fill="#E0784A" />
    <circle cx={34} cy={2} r={6} fill="#b85a33" />
    <rect x={8} y={-14} width={10} height={6} fill="#1F2421" />
  </g>
);

// Three dots: 3 blasts, then repeat.
const Blasts: React.FC<{ t: number; starts: number[]; x: number; y: number; t0: number }> = ({ t, starts, x, y, t0 }) => (
  <div style={{ position: "absolute", left: x, top: y, display: "flex", gap: 26, opacity: at(t, [t0, t0 + 0.25], [0, 1]) }}>
    {starts.map((s, i) => (
      <div key={i} style={{ width: 70, height: 70, borderRadius: 35, background: t > s ? "#fff" : "rgba(255,255,255,0.3)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)", scale: `${t > s ? at(t, [s, s + 0.25], [1.35, 1]) : 0.8}` }} />
    ))}
  </div>
);

const mouthOf = (p: HikerProps): [number, number] => {
  const h = hikerGeometry(p).head;
  return [h[0] + 30, h[1] + 14];
};

// ============ S1 HOOK: wide, slipped on a wet rock, can't walk (0 - 2.85) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: t * 14 + hh.x, y: hh.y, zoom: mix(1.0, 1.08, t / 2.85), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 330, y: g + 40, scale: 1.45, walk: 0, lean: 0.14, poles: false, handOverride: [80, -6], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WOODS} uid="a" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          <Boulder x={640} y={g + 130} s={1.1} />
        </Svg>
        <Subject>
          <Person {...p} outfit={RACHEL} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={WOODS.sun[0]} y={WOODS.sun[1]} strength={0.14} />
      <Particles seed={21} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={790} sunY={600} warm="255,214,170" />
      <Title text={"Shouting for\nhelp won't\nwork."} t={t} t0={0} top={130} size={124} />
      <Chip text="Can't walk" t={t} t0={2.21} x={80} y={570} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2a CLOSE-UP: shouting until her voice is gone (2.8 - 5.7) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 2.9), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: [48, -136], breathe: Math.sin(t * 5) * 1.5 };
  const m = mouthOf(p);
  const shouts = [3.19, 3.7, 4.33, 4.87];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WOODS} uid="b" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={RACHEL} expression="tired" />
          <g transform={hikerTransform(p)}>
            <Rings x={m[0] + 10} y={m[1]} t={t} starts={shouts} reach={mix(70, 22, at(t, [3.2, 5.1], [0, 1]))} w={3} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={22} n={12} leaves={LEAVES} fall={40} />
      <Grade sunX={790} sunY={600} warm="255,214,170" vignette={0.6} />
      <Readout label="HER VOICE" value="FADING" ok={false} t={t} t0={3.19} x={80} y={1120} pulseAt={4.58} />
    </AbsoluteFill>
  );
};

// ============ S2b EXTREME WIDE: nobody hears (5.65 - 7.0) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: at(lt, [0, 1.35], [0, -40]) + hh.y, zoom: mix(1.0, 0.96, lt / 1.35), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 540, y: g, scale: 0.6, walk: 0, lean: 0.14, poles: false, handOverride: [80, -6] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DIM} uid="c" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={0.85} blur={1}>
        <Svg>
          {Array.from({ length: 7 }, (_, i) => (
            <Pine key={i} x={-60 + i * 190} y={g + 40 + (i % 2) * 30} h={620 + (i % 3) * 80} c="#2f5443" c2="#223e31" />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={2}>
          <Person {...p} outfit={RACHEL} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f2418" side="both" />
      </Plane>
      <Particles seed={23} n={10} />
      <Grade sunX={800} sunY={640} warm="210,210,200" cool="20,40,60" vignette={0.7} />
      <Chip text="No one heard" t={t} t0={5.71} x={80} y={240} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: here's the fix, a whistle (6.95 - 9.3) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: at(lt, [0, 2.35], [-80, 0]) + hh.y, zoom: at(lt, [0, 2.35], [1.12, 1.03]), rot: hh.rot };
  const g = 1380;
  const p: HikerProps = { x: 420, y: g + 200, scale: 2.3, walk: 0, lean: 0.08, poles: false, handOverride: t > 8.3 ? [72, -40] : [30, 34], breathe: Math.sin(t * 2.3) * 2 };
  const hand = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="d" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          <Boulder x={820} y={g + 260} s={1.3} />
        </Svg>
        <Subject>
          <Person {...p} outfit={RACHEL} expression="neutral" />
          <g transform={hikerTransform(p)}>
            <Whistle x={hand[0] - 6} y={hand[1] - 18} s={1.2} o={at(t, [8.35, 8.5], [0, 1])} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#4a2e14" side="left" />
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.2} />
      <Particles seed={24} n={20} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} />
      <Title text={"Here's\nthe fix."} t={t} t0={7.0} t1={8.25} top={200} size={160} />
      <Chip text="A whistle" t={t} t0={8.46} x={80} y={240} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: whistle at the lips, carries farther (9.25 - 12.4) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 3.15), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: [48, -136], breathe: Math.sin(t * 2.2) * 1.5 };
  const m = mouthOf(p);
  const blasts = [9.4, 10.2, 11.0, 11.8];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="e" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={RACHEL} expression="neutral" />
          <g transform={hikerTransform(p)}>
            <Whistle x={m[0] - 6} y={m[1] + 2} s={0.75} />
            <Rings x={m[0] + 40} y={m[1]} t={t} starts={blasts} reach={240} w={4} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={25} n={16} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} vignette={0.6} />
      <Chip text="Carries much farther" t={t} t0={9.32} x={80} y={1160} icon="check" big />
      <Chip text="Almost no energy" t={t} t0={10.89} x={80} y={1290} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3c WIDE: three blasts, wait, repeat (12.35 - 16.05) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 3.7), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 300, y: g + 40, scale: 1.45, walk: 0, lean: 0.08, poles: false, handOverride: [48, -136], breathe: Math.sin(t * 2.2) * 2 };
  const m = mouthOf(p);
  const b1 = [12.72, 13.13, 13.49];
  const b2 = [15.37, 15.62, 15.87];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WOODS} uid="f" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          <Boulder x={150} y={g + 200} s={1.0} />
        </Svg>
        <Subject>
          <Person {...p} outfit={RACHEL} expression="neutral" />
          <g transform={hikerTransform(p)}>
            <Whistle x={m[0] - 6} y={m[1] + 2} s={0.75} />
            <Rings x={m[0] + 40} y={m[1]} t={t} starts={[...b1, ...b2]} reach={520} w={7} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2e2618" side="right" />
      </Plane>
      <Rays x={WOODS.sun[0]} y={WOODS.sun[1]} strength={0.16} />
      <Particles seed={26} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={790} sunY={600} warm="255,214,170" />
      <Readout label="THREE BLASTS" value="HELP" ok={null} t={t} t0={12.48} x={80} y={220} pulseAt={13.49} />
      <Blasts t={t} starts={b1} x={80} y={420} t0={12.5} />
      <Chip text="Wait, then repeat" t={t} t0={14.7} x={80} y={530} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3d CLOSE-UP: on the pack strap, not buried inside (16.0 - 19.4) ============
const S3d: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: -lt * 8 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.4), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.05, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.2) * 1.5 };
  const g = hikerGeometry(p);
  const clip = at(t, [16.5, 17.0], [0, 1], outExpo);
  const sx = g.sh[0] + 4;
  const sy = g.sh[1] + 40;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="g" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={RACHEL} expression="happy" />
          <g transform={hikerTransform(p)}>
            {/* shoulder strap with the whistle clipped on */}
            <path d={`M${g.sh[0] - 14},${g.sh[1] - 6} Q${g.sh[0] + 8},${g.sh[1] + 50} ${g.hip[0] + 4},${g.hip[1] - 30}`} stroke="#2a2a2a" strokeWidth={9} fill="none" strokeLinecap="round" />
            <line x1={sx} y1={sy} x2={sx + 4} y2={sy + 18 * clip} stroke="#222" strokeWidth={2} />
            <Whistle x={sx - 10} y={sy + 22 + (1 - clip) * 40} s={0.9} rot={90} o={clip} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={27} n={14} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} vignette={0.6} />
      <Chip text="On your pack strap" t={t} t0={16.64} x={80} y={1160} icon="check" big />
      <Chip text="Not buried inside" t={t} t0={17.88} x={80} y={1290} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: golden light, the next group heard her (19.35 - 22.35) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 12 + hh.x, y: hh.y, zoom: at(lt, [0, 1.2], [1.14, 1.04], outExpo), rot: hh.rot };
  const g = 1420;
  const walkIn = at(t, [19.4, 21.6], [0, 1], outExpo);
  const ph = t * 4;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g - 40} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          <Boulder x={250} y={g + 220} s={1.1} />
        </Svg>
        <Subject rimX={6}>
          <Person x={260} y={g + 182 * 1.5 - 120} scale={1.5} walk={0} lean={0.04} poles={false} handOverride={[70, -170]} outfit={RACHEL} expression="happy" />
          <Person x={mix(1150, 620, walkIn)} y={g + 70} scale={1.5} phase={ph + 1} walk={1 - walkIn * 0.8} lean={0.1} poles={false} handOverride={freeHand(ph + 1, 1 - walkIn * 0.8)} outfit={HIKER2} expression="happy" flip />
          <Person x={mix(1380, 850, walkIn)} y={g + 90} scale={1.6} phase={ph} walk={1 - walkIn * 0.8} lean={0.1} poles={false} handOverride={freeHand(ph, 1 - walkIn * 0.8)} outfit={HIKER1} expression="happy" flip />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.26} col="255,214,150" />
      <Particles seed={28} n={26} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"They heard\nthe whistle."} t={t} t0={off + 0.1} top={170} size={140} />
      <Chip text="Help on the way" t={t} t0={20.88} x={80} y={500} icon="check" />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-emergency-checklist-card.jpg"
      spec="PRINTABLE · YOUR KIT, CHECKS AND STEPS"
      name={
        <>
          Emergency
          <br />
          Checklist
        </>
      }
      nameSize={104}
      price="$5.99"
      save="Save this for someone you love"
    />
  );
};

export const V29B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.85} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={2.8} to={5.7} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={2.8} />
    </Scene>
    <Scene from={5.65} to={7.0} fadeIn={0.1} fadeOut={0.12}>
      <S2b off={5.65} />
    </Scene>
    <Scene from={6.95} to={9.3} fadeIn={0.12} fadeOut={0.1}>
      <S3a off={6.95} />
    </Scene>
    <Scene from={9.25} to={12.4} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={9.25} />
    </Scene>
    <Scene from={12.35} to={16.05} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={12.35} />
    </Scene>
    <Scene from={16.0} to={19.4} fadeIn={0.1} fadeOut={0.12}>
      <S3d off={16.0} />
    </Scene>
    <Scene from={19.35} to={22.35} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={19.35} />
    </Scene>
    <Scene from={22.3} to={27} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.8, 1560],
        [2.8, 5.65, 1560],
        [5.65, 6.95, 1560],
        [6.95, 9.25, 1560],
        [9.25, 12.35, 1560],
        [12.35, 16.0, 1560],
        [16.0, 19.35, 1560],
        [19.35, 22.3, 1560],
      ]}
    />
  </AbsoluteFill>
);
