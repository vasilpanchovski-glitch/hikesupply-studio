// V56: "Boot sole flapping at mile four" in the cinematic illustrated style of C01.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v56.json";

const words = vo.words as unknown as Word[];

const FALL: Sky = { top: "#3f6f9c", mid: "#b7cbd9", low: "#f3e2c0", sun: [820, 600], sunR: 52, sunCol: "#fffbe8", glow: "#ffe0a0" };
const DUSK: Sky = { top: "#4b5f88", mid: "#d99a78", low: "#ffd29a", sun: [260, 880], sunR: 60, sunCol: "#fff1cc", glow: "#ffb878" };

const LEO: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#BC8262",
  hair: "#3a2a20",
  beard: "#3f2d22",
  cap: "#2F4A5E",
  capShade: "#233848",
  jacket: "#9C4A2E",
  jacketShade: "#7a3822",
  pants: "#4d5248",
  pantsShade: "#3a3e36",
  boot: "#7a5236",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e", "#e0b04a"];
const BOOT = "#7a5236";
const BOOT_D = "#5c3c26";
const SOLE = "#2A2421";
const TAPE = "#9aa1a3";

// ---------- scenery ----------
const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = 440 + (i % 3) * 70;
      if (i % 4 === 1) return <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c="#3b6550" c2="#2b4d3c" />;
      return <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={["#d08a34", "#b45a2c", "#d6a842"][i % 3]} c2={["#a86a22", "#8c4220", "#a8822e"][i % 3]} />;
    })}
  </Svg>
);

const Trail: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <rect x={-400} y={y - 40} width={1880} height={1000} fill="#7a6a4c" />
    <rect x={-400} y={y - 40} width={1880} height={40} fill="#8a7a58" />
    {Array.from({ length: 26 }, (_, i) => {
      const x = ((((i * 97 - shift) % 2080) + 2080) % 2080) - 400;
      return <ellipse key={i} cx={x} cy={y + 30 + ((i * 71) % 420)} rx={18} ry={7} fill={LEAVES[i % 4]} opacity={0.85} transform={`rotate(${(i * 37) % 60 - 30} ${x} ${y + 30 + ((i * 71) % 420)})`} />;
    })}
    {Array.from({ length: 5 }, (_, i) => {
      const x = ((((i * 410 - shift) % 2050) + 2050) % 2050) - 400;
      return <ellipse key={i} cx={x} cy={y + 120 + (i % 2) * 160} rx={70} ry={26} fill="#6a6560" />;
    })}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={21} drift={t * 10} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={61} base={treeY - 280} amp={340} scale={260} col="#93a3b8" />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.6} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={67} base={treeY - 120} amp={230} scale={190} col="#8a7a5a" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.4} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Woods y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Loose sole on the near boot of a Person: hinged at the heel, opens at the toe.
const Flap: React.FC<{ p: HikerProps; open: number; taped?: boolean }> = ({ p, open, taped }) => {
  const f = hikerGeometry(p).legs[1].foot;
  return (
    <g transform={hikerTransform(p)}>
      {!taped && <path d={`M${f[0] - 18},${f[1] - 3} L${f[0] + 40},${f[1] - 3} L${f[0] + 40},${f[1] + 1} Z`} fill="#1a1512" />}
      <g transform={`rotate(${open * 34} ${f[0] - 18} ${f[1]})`}>
        <rect x={f[0] - 20} y={f[1] - 4} width={60} height={8} rx={3} fill={SOLE} />
      </g>
      {taped && [0, 12].map((d) => <rect key={d} x={f[0] + d} y={f[1] - 22} width={8} height={28} rx={2} fill={TAPE} />)}
    </g>
  );
};

// Big side-view boot for close-ups. open = sole flap angle (0..1), wraps = tape bands shown (0..3).
const BigBoot: React.FC<{ x: number; y: number; s: number; open: number; wraps?: number; rot?: number }> = ({ x, y, s, open, wraps = 0, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    {/* pant leg */}
    <path d="M-70,-300 L66,-300 L56,-118 L-60,-118 Z" fill="#4d5248" />
    <path d="M30,-300 L66,-300 L56,-118 L24,-118 Z" fill="#3a3e36" />
    <path d="M-50,-230 q30,10 60,-4 M-46,-180 q24,8 50,-2" stroke="#3a3e36" strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M-62,-150 L56,-150 L56,-118 L-62,-118 Z" fill="#3a3e36" />
    {/* upper */}
    <path d="M-60,-130 L50,-130 L56,-60 Q80,-34 150,-26 Q196,-20 198,10 L-66,10 Z" fill={BOOT} />
    <path d="M-66,-10 L198,-10 L198,10 L-66,10 Z" fill={BOOT_D} />
    <path d="M-60,-130 L50,-130 L50,-112 L-60,-112 Z" fill={BOOT_D} />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <circle cx={-6 + i * 14} cy={-98 + i * 20} r={5} fill="#c8b48a" />
        <path d={`M${-16 + i * 14},${-104 + i * 20} l34,12`} stroke="#e0cfa8" strokeWidth={6} strokeLinecap="round" />
      </g>
    ))}
    {/* gap that opens as the sole peels */}
    <path d={`M-40,10 L198,10 L198,${10 + open * 56} Z`} fill="#140f0c" opacity={open > 0.02 ? 1 : 0} />
    {/* sole, hinged near the heel */}
    <g transform={`rotate(${open * 16} -40 14)`}>
      <rect x={-70} y={8} width={272} height={30} rx={10} fill={SOLE} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={-58 + i * 32} y={34} width={18} height={10} rx={3} fill={SOLE} />
      ))}
    </g>
    {/* tape wrapped around the midfoot and under the sole (the arch); grows turn by turn */}
    {wraps > 0 && (() => {
      const x0 = 30;
      const x1 = 30 + 130 * Math.min(1, wraps / 3);
      const top = (x: number) => (x < 56 ? -62 : x < 150 ? -60 + ((x - 56) / 94) * 32 : -28);
      return (
        <g>
          <path d={`M${x0},${top(x0)} L${x1},${top(x1)} L${x1 + 6},50 L${x0 - 6},50 Z`} fill={TAPE} stroke="#7a8183" strokeWidth={3} />
          {Array.from({ length: Math.ceil(wraps * 2) }, (_, i) => {
            const x = x0 + 8 + i * 22;
            if (x > x1 - 4) return null;
            return <path key={i} d={`M${x},${top(x) + 2} L${x + 14},48`} stroke="#80878a" strokeWidth={4} />;
          })}
          <path d={`M${x0 + 6},${top(x0) + 8} L${x1 - 6},${top(x1) + 8}`} stroke="rgba(255,255,255,0.5)" strokeWidth={5} strokeLinecap="round" />
        </g>
      );
    })()}
  </g>
);

// Roll of duct tape in the near hand.
const HandTape: React.FC<{ p: HikerProps }> = ({ p }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <circle cx={h[0] + 4} cy={h[1] - 18} r={20} fill={TAPE} />
      <circle cx={h[0] + 4} cy={h[1] - 18} r={9} fill="#5b5f60" />
      <path d={`M${h[0] - 12},${h[1] - 30} q-10,14 -4,30`} stroke="rgba(255,255,255,0.5)" strokeWidth={3} fill="none" />
    </g>
  );
};

// Flat-lay of the kit on a rock, seen from above.
const Bottle: React.FC<{ x: number; y: number; tape: number }> = ({ x, y, tape }) => (
  <g transform={`translate(${x},${y}) rotate(-12)`}>
    <rect x={-80} y={-250} width={160} height={480} rx={50} fill="#3E7FA6" />
    <rect x={-58} y={-300} width={116} height={64} rx={16} fill="#2b2b2b" />
    <rect x={-80} y={-250} width={30} height={480} rx={15} fill="rgba(255,255,255,0.18)" />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={-84} y={-40 + i * 34} width={168} height={32 * Math.max(0, Math.min(1, tape * 5 - i))} rx={4} fill={TAPE} stroke="#7f8688" strokeWidth={2} />
    ))}
  </g>
);

const Cord: React.FC<{ x: number; y: number; k: number }> = ({ x, y, k }) => (
  <g transform={`translate(${x},${y})`} opacity={k}>
    {[0, 1, 2, 3].map((i) => (
      <ellipse key={i} cx={i * 6} cy={i * 4} rx={120 - i * 14} ry={88 - i * 10} fill="none" stroke="#D9693A" strokeWidth={14} />
    ))}
    <path d="M110,30 q50,40 20,100" stroke="#D9693A" strokeWidth={14} fill="none" strokeLinecap="round" />
  </g>
);

const MultiTool: React.FC<{ x: number; y: number; k: number; open: number }> = ({ x, y, k, open }) => (
  <g transform={`translate(${x},${y}) rotate(${-20 + (1 - k) * 30}) scale(${0.8 + 0.2 * k})`} opacity={k}>
    <g transform={`rotate(${-open * 150} 120 0)`}>
      <path d="M110,-14 L-90,-14 Q-140,-4 -150,6 L110,14 Z" fill="#2c2f31" />
      <path d="M110,-14 L-90,-14 Q-140,-4 -150,6 L110,-2 Z" fill="#4a4f52" />
    </g>
    <rect x={-10} y={-34} width={260} height={68} rx={30} fill="#C0392B" />
    <rect x={-10} y={-34} width={260} height={18} rx={9} fill="#d9564a" />
    {[40, 120, 200].map((cx) => (
      <circle key={cx} cx={cx} cy={0} r={8} fill="#c9cdd0" />
    ))}
    <path d="M250,0 a26,26 0 1 1 1,0" stroke="#222" strokeWidth={8} fill="none" />
  </g>
);

const Rock: React.FC = () => (
  <Svg>
    <rect x={0} y={0} width={1080} height={1920} fill="#6f6a62" />
    {Array.from({ length: 40 }, (_, i) => (
      <circle key={i} cx={(i * 211) % 1080} cy={(i * 367) % 1920} r={6 + (i % 5) * 6} fill={i % 2 ? "#7c776e" : "#625d56"} opacity={0.6} />
    ))}
    {Array.from({ length: 14 }, (_, i) => (
      <ellipse key={i} cx={(i * 293) % 1080} cy={(i * 517) % 1920} rx={22} ry={9} fill={LEAVES[i % 4]} transform={`rotate(${(i * 41) % 90} ${(i * 293) % 1080} ${(i * 517) % 1920})`} />
    ))}
  </Svg>
);

// ============ S1 HOOK: close-up, the sole flaps with every step (0 - 3.23) ============
const S1: React.FC = () => {
  const t = useT();
  const step = (t * 1.6 + 0.3) % 1;
  const lift = Math.sin(step * Math.PI);
  const open = 0.25 + 0.75 * Math.max(0, Math.sin(step * Math.PI * 2 - 0.4));
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: t * 20 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 3.2), rot: hh.rot };
  const g = 1400;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={FALL} uid="a" treeY={g - 200} blur={8} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x * 2} />
        <Subject rimX={5}>
          <BigBoot x={400} y={g - 100 - lift * 60} s={2.3} open={open} rot={-lift * 6} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Particles seed={561} n={18} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={600} vignette={0.5} />
      <Title text={"His boot sole\npeeled off at\nmile four"} t={t} t0={0} top={130} size={110} />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: mile four, walking with the sole flapping (3.23 - 6.85) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const sh = handheld(t, 0.5, at(t, [5.1, 5.2, 5.5], [0, 1, 0]) * 0.6);
  const cam: Cam = { x: lt * 30 + sh.x, y: sh.y, zoom: mix(1.04, 1.1, lt / 3.6), rot: sh.rot };
  const g = 1480;
  const ph = t * 4.2;
  const p: HikerProps = { x: 330 + lt * 40, y: g, scale: 2.6, phase: ph, walk: 0.55, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.55) };
  const open = Math.max(0, Math.cos(ph + Math.PI));
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={FALL} uid="b" treeY={g - 60} blur={1.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject>
          <Person {...p} outfit={LEO} expression="tired" />
          <Flap p={p} open={open} />
        </Subject>
      </Plane>
      <Rays x={FALL.sun[0]} y={FALL.sun[1]} strength={0.2} />
      <Particles seed={562} n={20} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={600} />
      <Chip text="Mile 4" t={t} t0={3.73} x={80} y={240} icon="none" big />
      <Chip text="Sole flapping" t={t} t0={5.1} x={80} y={370} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: tape, nothing to cut it (6.85 - 9.25) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 2.4), rot: hh.rot };
  const p: HikerProps = { x: 440, y: 2330, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: [64, -40], breathe: Math.sin(t * 2.6) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={FALL} uid="c" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={LEO} expression="tired" />
          <HandTape p={p} />
        </Subject>
      </Plane>
      <Particles seed={563} n={14} leaves={LEAVES} fall={40} />
      <Grade sunX={820} sunY={600} vignette={0.62} />
      <Readout label="SOMETHING TO CUT TAPE" value="NONE" ok={false} t={t} t0={7.47} x={80} y={240} pulseAt={8.1} />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: here's the fix, a small repair kit (9.25 - 12.05) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 12 + hh.x, y: at(lt, [0, 1.4], [-40, 0]) + hh.y, zoom: mix(1.1, 1.04, lt / 2.8), rot: hh.rot };
  const g = 1480;
  const p: HikerProps = { x: 420, y: g, scale: 2.3, walk: 0, lean: 0.12, poles: false, handOverride: [60, -10], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={FALL} uid="d" treeY={g - 80} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject>
          <Person {...p} outfit={LEO} expression="neutral" />
          <HandTape p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Rays x={FALL.sun[0]} y={FALL.sun[1]} strength={0.26} />
      <Particles seed={564} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={820} sunY={600} />
      <Title text={"Carry a small\nrepair kit."} t={t} t0={10.28} top={200} size={130} />
    </AbsoluteFill>
  );
};

// ============ S3b TOP-DOWN CLOSE-UP: tape on the bottle, cord, multi-tool (12.05 - 17.5) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 5.4), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Rock />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col="rgba(255,230,180,0.6)">
          <Bottle x={300} y={980} tape={at(t, [12.15, 13.4], [0, 1])} />
          <Cord x={740} y={820} k={at(t, [14.6, 14.95], [0, 1])} />
          <MultiTool x={600} y={1180} k={at(t, [15.78, 16.2], [0, 1], outExpo)} open={at(t, [16.6, 17.0], [0, 1])} />
        </Subject>
      </Plane>
      <Particles seed={565} n={10} col="#ffe7c8" />
      <Grade sunX={820} sunY={300} vignette={0.5} />
      <Chip text="Tape on your bottle" t={t} t0={12.38} x={80} y={230} icon="check" big />
      <Chip text="Length of cord" t={t} t0={14.62} x={80} y={360} icon="check" big />
      <Chip text="Multi-tool to cut" t={t} t0={15.78} x={80} y={490} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3c CLOSE-UP: wrap it tight, under the arch (17.5 - 19.95) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.0, lt / 2.4), rot: hh.rot };
  const g = 1400;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DUSK} uid="e" treeY={g - 200} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={0} />
        <Subject rimX={-5} col="rgba(255,206,150,0.85)">
          <BigBoot x={400} y={g - 100} s={2.3} open={0} wraps={at(t, [17.55, 19.3], [0, 3])} />
        </Subject>
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.24} col="255,210,160" />
      <Particles seed={566} n={12} col="#ffe7c8" />
      <Grade sunX={260} sunY={880} warm="255,190,130" vignette={0.5} />
      <Chip text="Wrap it tight" t={t} t0={17.6} x={80} y={240} icon="check" big />
      <Chip text="Under the arch" t={t} t0={18.62} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: wide, golden light, walking out (19.95 - 22.3) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 26 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.1, 1.02]), rot: hh.rot };
  const g = 1460;
  const ph = t * 5;
  const p: HikerProps = { x: 260 + lt * 60, y: g, scale: 1.7, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DUSK} uid="f" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject rimX={-5} col="rgba(255,226,170,0.85)">
          <Person {...p} outfit={LEO} expression="happy" />
          <Flap p={p} open={0} taped />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2218" side="left" />
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.32} col="255,210,160" />
      <Particles seed={567} n={20} leaves={LEAVES} fall={40} />
      <Grade sunX={260} sunY={880} warm="255,190,130" />
      <Title text={"Walked out\nfine."} t={t} t0={off + 0.1} top={180} size={140} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/folding-multi-tool-cut.png"
      cutoutH={700}
      spec="14 TOOLS IN ONE · 143 G"
      name={
        <>
          14-in-1 Folding
          <br />
          Multi-Tool
        </>
      }
      nameSize={96}
      price="$17.99"
      save="Save this before your next long hike"
    />
  );
};

export const V56: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.28} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.23} to={6.9} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={3.23} />
    </Scene>
    <Scene from={6.85} to={9.3} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={6.85} />
    </Scene>
    <Scene from={9.25} to={12.1} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={9.25} />
    </Scene>
    <Scene from={12.05} to={17.55} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={12.05} />
    </Scene>
    <Scene from={17.5} to={20.0} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={17.5} />
    </Scene>
    <Scene from={19.95} to={22.35} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={19.95} />
    </Scene>
    <Scene from={22.2} to={27} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.23, 1560],
        [3.23, 6.85, 1560],
        [6.85, 9.25, 1560],
        [9.25, 12.05, 1560],
        [12.05, 17.5, 1560],
        [17.5, 19.95, 1560],
        [19.95, 22.2, 1560],
      ]}
    />
  </AbsoluteFill>
);
