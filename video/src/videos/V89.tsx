// V89: "His traction twisted off the heel" in the cinematic C01 style, icy November trail.
// Advice (standard, conservative): fit slip-on traction on your own boots at home with the heel strap pulled fully over the heel,
// test it on a step, carry it where you can reach it; on steep or hard ice use proper microspikes, or turn back.
// No brand names on the traction, no product claim (we don't sell traction). End card = Hiking Safety Guide, $8.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { STORM, WGOLD, WINTER, WinterBackdrop } from "../winter";
import { Breath, Subject } from "../fall";
import vo from "../vo/v89.json";

const words = vo.words as unknown as Word[];

const THEO: Outfit = {
  ...GUIDE,
  skin: "#C99572",
  skinShade: "#AB7A58",
  hair: "#3a2a1e",
  beard: "#3a2a1e",
  cap: "#C2662E",
  capShade: "#9B4E20",
  jacket: "#2F5D3E",
  jacketShade: "#244a31",
  pants: "#4a4f57",
  pantsShade: "#353a41",
  boot: "#5a3e2a",
  sole: "#1d1916",
  pack: "#B83A55",
  packShade: "#8E2B42",
  glove: "#2b2f35",
};
const RUB = "#3a7bb0"; // traction rubber harness
const RUB2 = "#2c5f8a";
const CHAIN = "#3a3f44";

// Glazed ice path. tilt > 0 rises to the right.
const IceTrail: React.FC<{ y: number; tilt?: number }> = ({ y, tilt = 0 }) => {
  const Y = (x: number) => y - tilt * (x - 540);
  return (
    <Svg>
      <path d={`M-400,${Y(-400) - 40} L1480,${Y(1480) - 40} L1480,2600 L-400,2600 Z`} fill="#e9eef1" />
      <path d={`M-400,${Y(-400) - 4} L1480,${Y(1480) - 4} L1480,${Y(1480) + 70} L-400,${Y(-400) + 70} Z`} fill="#b9cfdc" />
      {Array.from({ length: 8 }, (_, i) => {
        const x = -300 + i * 230;
        return <path key={i} d={`M${x},${Y(x) + 16} l90,-8`} stroke="#ffffff" strokeWidth={6} strokeLinecap="round" opacity={0.9} />;
      })}
      <path d={`M-400,${Y(-400) + 70} L1480,${Y(1480) + 70} L1480,2600 L-400,2600 Z`} fill="#b7c3cc" />
      {Array.from({ length: 10 }, (_, i) => (
        <ellipse key={`s${i}`} cx={-260 + i * 190} cy={Y(-260 + i * 190) + 160 + (i % 3) * 70} rx={80} ry={10} fill="#a3b1bb" />
      ))}
    </Svg>
  );
};

// Traction under both boots in a medium shot. twist 0..1 = the near one slips sideways off the heel.
const Traction: React.FC<{ p: HikerProps; twist?: number }> = ({ p, twist = 0 }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)}>
      {g.legs.map((l, i) => {
        const tw = i === 0 ? twist : 0;
        return (
          <g key={i} transform={`rotate(${tw * 28},${l.foot[0] + 30},${l.foot[1]}) translate(${tw * 10},${tw * 6})`}>
            <path d={`M${l.foot[0] - 18},${l.foot[1] + 2} ${[0, 1, 2, 3, 4].map(() => "l5,7 l6,-7").join(" ")}`} stroke={CHAIN} strokeWidth={3} fill="none" />
            <path d={`M${l.foot[0] - 20},${l.foot[1] - 2} L${l.foot[0] + 36},${l.foot[1] - 2}`} stroke={RUB} strokeWidth={4} />
            <path d={`M${l.foot[0] - 20},${l.foot[1] - 2} Q${l.foot[0] - 26},${l.foot[1] - 18 + tw * 24} ${l.foot[0] - 14},${l.foot[1] - 20 + tw * 26}`} stroke={RUB} strokeWidth={4} fill="none" />
          </g>
        );
      })}
    </g>
  );
};

// Big side-view boot (close-ups). Toe to the right, sole on y = 1300 + oy.
const Boot: React.FC<{ ox?: number; oy?: number; pants?: string; pantsShade?: string }> = ({ ox = 0, oy = 0, pants = THEO.pants, pantsShade = THEO.pantsShade }) => (
  <g transform={`translate(${ox},${oy})`}>
    <path d="M300,560 Q380,520 470,560 L500,1090 L280,1090 Z" fill={pants} />
    <path d="M330,640 Q360,800 330,960" stroke={pantsShade} strokeWidth={10} fill="none" />
    <path d="M240,1060 L520,1060 Q560,1120 700,1160 Q840,1190 850,1260 L850,1300 L220,1300 Z" fill={THEO.boot} stroke="rgba(0,0,0,0.3)" strokeWidth={4} />
    <path d="M300,1080 L500,1080" stroke="#c9b48e" strokeWidth={10} />
    {[0, 1, 2, 3].map((i) => (
      <path key={i} d={`M${520 + i * 50},${1140 + i * 12} l40,-22`} stroke="#c9b48e" strokeWidth={8} strokeLinecap="round" />
    ))}
    <rect x={210} y={1290} width={650} height={34} rx={14} fill={THEO.sole} />
  </g>
);

// Close-up traction: toe cup, sole chain, heel strap. heel 0 = strap hanging below/behind the heel, 1 = pulled fully over the heel.
// twist rotates the whole device sideways (off the boot).
const BigTraction: React.FC<{ heel: number; twist?: number; ox?: number; oy?: number }> = ({ heel, twist = 0, ox = 0, oy = 0 }) => {
  const hx = mix(170, 215, heel);
  const hy = mix(1380, 1150, heel);
  return (
    <g transform={`translate(${ox},${oy}) rotate(${twist * 22},700,1310) translate(${-twist * 80},${twist * 50})`}>
      {/* toe cup */}
      <path d="M860,1300 Q905,1210 820,1170" stroke={RUB} strokeWidth={22} fill="none" strokeLinecap="round" />
      {/* sole frame */}
      <path d="M200,1306 L870,1306" stroke={RUB} strokeWidth={18} />
      {/* chain + small spikes */}
      <path d={`M230,1330 ${Array.from({ length: 12 }, () => "l24,30 l26,-30").join(" ")}`} stroke={CHAIN} strokeWidth={8} fill="none" strokeLinejoin="round" />
      {/* heel strap */}
      <path d={`M210,1306 Q${hx - 60},${(hy + 1306) / 2} ${hx},${hy} Q${hx + 120},${hy - 30 * heel} 330,${mix(1300, 1120, heel)}`} stroke={RUB2} strokeWidth={22} fill="none" strokeLinecap="round" />
    </g>
  );
};

// ============ S1 HOOK CLOSE-UP: the traction twisted off the heel on the ice (0 - 3.3) ============
const S1: React.FC = () => {
  const t = useT();
  const shake = at(t, [0, 0.4], [1, 0]);
  const hh = handheld(t, 0.5, shake * 6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, t / 3.3), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={1060} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <IceTrail y={1300} />
        <Subject rimX={5} col="rgba(220,235,255,0.7)">
          <ellipse cx={540} cy={1330} rx={440} ry={36} fill="rgba(0,0,0,0.18)" />
          <Boot oy={-10} />
          <BigTraction heel={0} twist={1} oy={-10} />
          {[0, 1, 2].map((i) => (
            <line key={i} x1={120 - i * 30} y1={1300 + i * 20} x2={-40 - i * 40} y2={1300 + i * 20} stroke="#ffffff" strokeWidth={6} strokeLinecap="round" opacity={0.8} />
          ))}
        </Subject>
      </Plane>
      <Particles seed={891} n={18} col="#ffffff" fall={30} />
      <Grade sunX={820} sunY={520} warm="230,236,245" cool="10,25,50" vignette={0.55} />
      <Title text={"His traction twisted\noff the heel"} t={t} t0={0} top={130} size={112} />
      <Chip text="Brand new. Never tried on." t={t} t0={2.8} x={80} y={480} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: Theo crouches at the icy stretch, pulling it on for the first time (3.3 - 5.47) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.06, 1.02, lt / 2.17), rot: hh.rot };
  const g = 1480;
  const sw = Math.sin(t * 3) * 4;
  const p: HikerProps = { x: 380, y: g, scale: 2.3, walk: 0, lean: 0.12, poles: false, handOverride: [64, -10], breathe: Math.sin(t * 3) * 2 };
  const s = 2.3;
  const hand = hikerGeometry(p).arms[1].hand;
  const hx = p.x + hand[0] * s;
  const hy = p.y + (hand[1] - 182) * s;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={g - 140} t={t} />
      <Plane cam={cam} depth={1}>
        <IceTrail y={g} />
        <Subject rimX={5} col="rgba(220,235,255,0.7)">
          <Person {...p} outfit={THEO} expression="neutral" />
          <Breath p={p} t={t} />
          {/* brand-new traction dangling from his hand, still with the tag on */}
          <g transform={`translate(${hx},${hy + 10}) rotate(${sw})`}>
            <path d="M0,0 Q-40,60 -10,140 Q30,190 70,140 Q90,60 0,0 Z" fill="none" stroke={RUB} strokeWidth={12} />
            <path d={`M-10,40 ${Array.from({ length: 5 }, () => "l8,18 l8,-18").join(" ")}`} stroke={CHAIN} strokeWidth={5} fill="none" transform="rotate(70,-10,40)" />
            <rect x={60} y={10} width={44} height={60} rx={6} fill="#f4f1ea" transform="rotate(20,60,10)" />
            <line x1={30} y1={10} x2={62} y2={14} stroke="#f4f1ea" strokeWidth={3} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2a3530" side="right" />
      </Plane>
      <Particles seed={892} n={20} col="#ffffff" fall={30} />
      <Grade sunX={820} sunY={520} warm="230,236,245" cool="10,25,50" />
      <Chip text="First time on: at the ice" t={t} t0={3.84} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: two steps, the traction twists off his heel (5.47 - 8.39) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const imp = at(t, [6.6, 6.7, 7.2], [0, 1, 0]);
  const hh = handheld(t, 0.6, imp * 8);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.9), rot: hh.rot };
  const g = 1480;
  const walking = t < 6.6;
  const ph = t * 3.4;
  const tw = at(t, [6.55, 6.9], [0, 1], outExpo);
  const p: HikerProps = walking
    ? { x: 260 + (t - 5.47) * 110, y: g, scale: 2.3, phase: ph, walk: 0.55, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5) }
    : { x: 384, y: g, scale: 2.3, walk: 0, lean: mix(0.06, -0.14, tw), poles: false, handOverride: [mix(30, 70, tw), mix(30, -120, tw)], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g - 140} t={t} />
      <Plane cam={cam} depth={1}>
        <IceTrail y={g} />
        <Subject rimX={5} col="rgba(220,235,255,0.7)">
          <Person {...p} outfit={THEO} expression={t > 6.7 ? "tired" : "neutral"} />
          <Traction p={p} twist={tw} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={893} n={20} col="#ffffff" fall={30} />
      <Grade sunX={820} sunY={520} warm="230,236,245" cool="10,25,50" />
      <Readout label="TWO STEPS LATER" value="Twisted off the heel" ok={false} t={t} t0={6.6} x={60} y={200} />
    </AbsoluteFill>
  );
};

// Porch at home: wall, door, two steps. Step top at y.
const Porch: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-200} y={-200} width={1500} height={2400} fill="#c8b79c" />
    {Array.from({ length: 30 }, (_, i) => (
      <rect key={i} x={-200} y={-200 + i * 70} width={1500} height={6} fill="#b5a386" />
    ))}
    <rect x={560} y={y - 1000} width={420} height={1000} fill="#2F5D3E" />
    <rect x={600} y={y - 950} width={340} height={420} fill="none" stroke="#244a31" strokeWidth={14} />
    <rect x={600} y={y - 480} width={340} height={400} fill="none" stroke="#244a31" strokeWidth={14} />
    <circle cx={620} cy={y - 500} r={16} fill="#d9a34a" />
    <rect x={-200} y={y} width={1500} height={60} fill="#8a7a66" />
    <rect x={-200} y={y + 60} width={1500} height={200} fill="#9c8b74" />
    <rect x={-200} y={y + 260} width={1500} height={60} fill="#8a7a66" />
    <rect x={-200} y={y + 320} width={1500} height={900} fill="#7d8a6a" />
    <rect x={120} y={y - 14} width={380} height={18} rx={6} fill="#6e4e3a" />
  </Svg>
);

// ============ S4 FIX CLOSE-UP: at home, on his own boots (8.39 - 11.69) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 3.3), rot: hh.rot };
  const k = at(t, [9.6, 10.4], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={10}>
        <Porch y={1330} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,226,180,0.7)">
          <ellipse cx={540} cy={1340} rx={440} ry={36} fill="rgba(0,0,0,0.2)" />
          <Boot />
          <g transform={`translate(${(1 - k) * 700},${(1 - k) * 60})`} opacity={k}>
            <BigTraction heel={0} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={894} n={10} col="#fff3d6" bokeh />
      <Grade sunX={800} sunY={400} warm="255,226,190" vignette={0.55} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={9.3} top={200} size={124} />
      <Chip text="Fit it at home" t={t} t0={9.31} x={60} y={200} icon="check" big />
      <Chip text="On your own boots" t={t} t0={10.52} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: gloved hands pull the heel strap fully over the heel (11.69 - 14.34) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + 60, y: hh.y, zoom: mix(1.12, 1.18, lt / 2.65), rot: hh.rot };
  const heel = at(t, [12.0, 13.1], [0, 1], outExpo);
  const hx = mix(170, 215, heel);
  const hy = mix(1380, 1150, heel);
  const ring = at(t, [13.1, 13.2, 13.8], [0, 1, 0]);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={10}>
        <Porch y={1330} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,226,180,0.7)">
          <ellipse cx={540} cy={1340} rx={440} ry={36} fill="rgba(0,0,0,0.2)" />
          <Boot />
          <BigTraction heel={heel} />
          {/* gloved hand gripping the strap */}
          <g transform={`translate(${hx - 30},${hy - 40}) rotate(${mix(20, -10, heel)})`}>
            <rect x={-60} y={-360} width={120} height={330} rx={46} fill={THEO.jacket} />
            <ellipse cx={0} cy={0} rx={82} ry={66} fill={THEO.glove ?? THEO.skin} />
            {[-48, -16, 16, 48].map((d) => (
              <ellipse key={d} cx={d} cy={56} rx={18} ry={30} fill={THEO.glove ?? THEO.skin} />
            ))}
            <ellipse cx={-20} cy={-20} rx={40} ry={20} fill="#444a52" opacity={0.6} />
          </g>
          <circle cx={215} cy={1150} r={50 + ring * 70} fill="none" stroke="#fff" strokeWidth={6} opacity={ring} />
        </Subject>
      </Plane>
      <Particles seed={895} n={10} col="#fff3d6" bokeh />
      <Grade sunX={800} sunY={400} warm="255,226,190" vignette={0.55} />
      <Chip text="Heel strap fully over the heel" t={t} t0={11.99} x={60} y={200} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S6 MEDIUM: test it on a step (14.34 - 15.84) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.0, lt / 1.5), rot: hh.rot };
  const g = 1500;
  const up = at(t, [14.5, 15.1], [0, 1], outExpo);
  const p: HikerProps = { x: mix(330, 420, up), y: g - up * 70, scale: 2.3, phase: mix(0, Math.PI, up), walk: 0.6 * (1 - Math.abs(up - 0.5) * 2) + 0.05, lean: 0.06, poles: false, handOverride: [30, 30], breathe: 0 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={1}>
        <Porch y={g - 70} />
        <Subject rimX={4} col="rgba(255,226,180,0.7)">
          <Person {...p} outfit={THEO} expression="neutral" noPack />
          <Traction p={p} />
        </Subject>
      </Plane>
      <Particles seed={896} n={10} col="#fff3d6" bokeh />
      <Grade sunX={800} sunY={400} warm="255,226,190" vignette={0.5} />
      <Chip text="Test it on a step" t={t} t0={14.4} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: traction tucked in the pack's outer pocket, within reach (15.84 - 17.78) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.95), rot: hh.rot };
  const k = at(t, [15.95, 16.6], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={1200} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          {/* pack body and stretch outer pocket */}
          <rect x={180} y={420} width={720} height={1240} rx={140} fill={THEO.pack} />
          <rect x={180} y={420} width={720} height={240} rx={120} fill={THEO.packShade} />
          <path d="M260,900 L820,900 L800,1500 Q540,1560 280,1500 Z" fill="#2b2f35" opacity={0.9} />
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d={`M${280 + i * 72},905 L${290 + i * 70},1500`} stroke="#3c424a" strokeWidth={6} />
          ))}
          {/* the traction going in, chain and harness showing at the top */}
          <g transform={`translate(0,${(1 - k) * -420})`}>
            <path d="M380,980 Q540,820 700,980" stroke={RUB} strokeWidth={26} fill="none" strokeLinecap="round" />
            <path d={`M400,960 ${Array.from({ length: 6 }, () => "l24,30 l26,-30").join(" ")}`} stroke={CHAIN} strokeWidth={9} fill="none" />
          </g>
          <path d="M260,900 L820,900" stroke="#1d2024" strokeWidth={18} strokeLinecap="round" />
        </Subject>
      </Plane>
      <Particles seed={897} n={14} col="#ffffff" fall={24} />
      <Grade sunX={800} sunY={560} warm="250,240,225" vignette={0.55} />
      <Chip text="Where you can reach it" t={t} t0={16.29} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 WIDE: steep, hard ice ahead: microspikes, or turn back (17.78 - 22.1) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.0, 1.06, lt / 4.3), rot: hh.rot };
  const g = 1500;
  const back = t > 20.75;
  const p: HikerProps = { x: 260, y: g, scale: 1.5, walk: 0, lean: 0.02, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="h" treeY={g - 300} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* steep glazed slope rising to the right */}
          <path d={`M380,${g} L1300,${g - 900} L1300,2400 L380,2400 Z`} fill="#c9dbe6" />
          <path d={`M380,${g} L1300,${g - 900}`} stroke="#ffffff" strokeWidth={14} opacity={0.9} />
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M${470 + i * 90},${g - 60 - i * 90} l70,-40`} stroke="#ffffff" strokeWidth={7} strokeLinecap="round" opacity={0.8} />
          ))}
        </Svg>
        <IceTrail y={g} />
        <Subject rimX={4} col="rgba(220,235,255,0.7)">
          <Person {...p} outfit={THEO} expression="neutral" flip={back} />
          <Traction p={p} />
        </Subject>
      </Plane>
      <Particles seed={898} n={24} col="#ffffff" fall={34} />
      <Grade sunX={820} sunY={520} warm="230,236,245" cool="10,25,50" />
      <Readout label="STEEP OR HARD ICE" value="Not for slip-ons" ok={false} t={t} t0={17.9} x={60} y={200} />
      <Chip text="Proper microspikes" t={t} t0={19.66} x={60} y={430} icon="check" big />
      <Chip text="Or turn back" t={t} t0={20.7} x={60} y={560} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF: Theo crosses the icy patch steady, golden winter light (22.1 - 23.95) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: at(lt, [0, 1.2], [1.1, 1.03], outExpo), rot: hh.rot };
  const g = 1480;
  const ph = t * 3.4;
  const p: HikerProps = { x: 300 + lt * 90, y: g, scale: 2.3, phase: ph, walk: 0.5, lean: 0.05, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="i" treeY={g - 140} t={t} />
      <Plane cam={cam} depth={1}>
        <IceTrail y={g} />
        <Subject rimX={-6} col="rgba(255,200,140,0.9)">
          <Person {...p} outfit={THEO} expression="happy" />
          <Traction p={p} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2a3530" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.32} col="255,214,160" />
      <Particles seed={899} n={22} col="#ffe7b8" />
      <Grade sunX={760} sunY={640} warm="255,200,140" />
      <Chip text="Steady on the ice" t={t} t0={22.38} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-safety-guide.jpg"
      photoH={800}
      spec="10 CHAPTERS · PRINT + PHONE PDF"
      name={
        <>
          Hiking
          <br />
          Safety Guide
        </>
      }
      price="$8.99"
      save="Save this before your next icy hike"
    />
  );
};

export const V89: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.35} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.3} to={5.52} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.3} />
    </Scene>
    <Scene from={5.47} to={8.44} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.47} />
    </Scene>
    <Scene from={8.39} to={11.74} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.39} />
    </Scene>
    <Scene from={11.69} to={14.39} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.69} />
    </Scene>
    <Scene from={14.34} to={15.89} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.34} />
    </Scene>
    <Scene from={15.84} to={17.83} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={15.84} />
    </Scene>
    <Scene from={17.78} to={22.15} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={17.78} />
    </Scene>
    <Scene from={22.1} to={23.95} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={22.1} />
    </Scene>
    <Scene from={23.8} to={28.3} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.3, 1560],
        [3.3, 5.47, 1560],
        [5.47, 8.39, 1560],
        [8.39, 11.69, 1560],
        [11.69, 14.34, 1560],
        [14.34, 15.84, 1560],
        [15.84, 17.78, 1560],
        [17.78, 22.1, 1560],
        [22.1, 23.8, 1560],
      ]}
    />
  </AbsoluteFill>
);
