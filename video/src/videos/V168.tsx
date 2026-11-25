// V168: "The neighbors think grandpa moved in." Short format (16.0 s, 41 words), cinematic C01 style, shoveling snow at home.
// Product: Funny Old Man Ski Mask — Realistic 3D Print Balaclava, Unisex, from $17.99 (live Shopify; Lightweight $17.99, Winter $19.99).
// Advice (plain, no numbers beyond the story's snow depth): cold wind numbs bare skin; cover face and neck. The balaclava covers
// head, face and neck in one piece. Dark sunglasses stay on over the eye opening. Face close-ups built like V163.
// End card: the real Shopify cover (Grumpy Grandpa), cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { WINTER, WinterBackdrop, SNOW, SNOW2 } from "../winter";
import vo from "../vo/v168.json";

const words = vo.words as unknown as Word[];

const TOM: Outfit = {
  ...GUIDE,
  skin: "#E8B896",
  skinShade: "#C99472",
  hair: "#4a3020",
  ponytail: null,
  beard: null,
  cap: "none",
  capShade: "none",
  jacket: "#C2662E",
  jacketShade: "#9c4f22",
  pants: "#2b2f36",
  pantsShade: "#1f2228",
  boot: "#4a3a2c",
  sole: "#1d1916",
  glove: "#1f1f22",
};
const NEIGHBOR: Outfit = { ...GUIDE, jacket: "#2F7F86", jacketShade: "#24646a", cap: "none", capShade: "none" };
const PRINT = "#d79a80";
const PRINT2 = "#b97c64";
const STASH = "#f1efea";
const STASH2 = "#c9c6bf";
const SHADES = "#15171a";
const BLADE = "#2f5f9a";

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const Wind: React.FC<{ t: number; k?: number; n?: number }> = ({ t, k = 1, n = 14 }) => (
  <g opacity={k}>
    {Array.from({ length: n }, (_, i) => {
      const y = 200 + ((i * 137) % 1500);
      const x = ((t * (900 + (i % 4) * 200) + i * 271) % 1800) - 400;
      return <path key={i} d={`M${1080 - x},${y} q-120,-14 -260,0`} stroke="#ffffff" strokeWidth={4 + (i % 3) * 2} fill="none" strokeLinecap="round" opacity={0.35} />;
    })}
  </g>
);

const House: React.FC<{ x: number; y: number; s?: number; wall?: string }> = ({ x, y, s = 1, wall = "#8a9aa6" }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-300} y={-320} width={600} height={320} fill={wall} />
    <path d="M-350,-310 L0,-520 L350,-310 Z" fill="#3a3f46" />
    <path d="M-360,-304 L0,-532 L360,-304" stroke={SNOW} strokeWidth={30} fill="none" strokeLinejoin="round" />
    <rect x={-220} y={-240} width={130} height={110} fill="#ffe3a8" />
    <rect x={90} y={-240} width={130} height={110} fill="#ffe3a8" />
    <rect x={-50} y={-200} width={100} height={200} fill="#5a3a2a" />
    <rect x={-310} y={-14} width={620} height={24} fill={SNOW} />
  </g>
);

// Snow shovel held in both hands (screen coords). dig 0..1 lowers the blade into the snow.
const Shovel: React.FC<{ p: HikerProps; dig: number; load?: number }> = ({ p, dig, load = 0 }) => {
  const s = p.scale ?? 1;
  const g = hikerGeometry(p);
  const h = g.arms[1].hand;
  const hx = p.x + h[0] * s;
  const hy = p.y + (h[1] - 182) * s;
  const bx = p.x + (150 + 20 * dig) * s;
  const by = p.y - (30 - 26 * dig) * s;
  const ang = Math.atan2(by - hy, bx - hx);
  const gx = hx - Math.cos(ang) * 60 * s;
  const gy = hy - Math.sin(ang) * 60 * s;
  return (
    <g>
      <path d={`M${gx},${gy} L${bx},${by}`} stroke="#3a3f46" strokeWidth={7 * s} strokeLinecap="round" />
      <path d={`M${gx - 12 * s},${gy - 6 * s} L${gx + 10 * s},${gy + 6 * s}`} stroke="#2a2a2a" strokeWidth={9 * s} strokeLinecap="round" />
      <g transform={`translate(${bx},${by}) rotate(${(ang * 180) / Math.PI - 10})`}>
        <path d={`M0,${-30 * s} L${60 * s},${-34 * s} L${66 * s},${34 * s} L0,${30 * s} Z`} fill={BLADE} />
        {load > 0 && <ellipse cx={34 * s} cy={-26 * s} rx={34 * s} ry={14 * s} fill={SNOW} opacity={load} />}
      </g>
    </g>
  );
};

// Balaclava (printed grandpa) and sunglasses on a Person head (hiker coords).
const HeadKit: React.FC<{ p: HikerProps; mask: number }> = ({ p, mask }) => {
  const [hx, hy] = hikerGeometry(p).head;
  return (
    <g transform={hikerTransform(p)}>
      {mask > 0 && (
        <g opacity={mask}>
          <ellipse cx={hx} cy={hy - 4} rx={28} ry={32} fill={PRINT} />
          <rect x={hx - 16} y={hy + 14} width={30} height={26} fill={PRINT2} />
          <path d={`M${hx - 24},${hy - 22} q-6,14 0,26`} stroke="#e8e6e0" strokeWidth={6} fill="none" strokeLinecap="round" />
          <path d={`M${hx + 4},${hy + 8} q10,-6 24,4 q-10,8 -24,0 Z`} fill={STASH} />
          <circle cx={hx + 22} cy={hy + 2} r={4} fill="#c06a5a" />
        </g>
      )}
      <rect x={hx + 4} y={hy - 12} width={24} height={10} rx={4} fill={SHADES} />
    </g>
  );
};

// Big close-up face (screen coords), three-quarter view to the right, dark glasses on. mask 0..1 pulls the balaclava up.
const FaceTom: React.FC<{ cx: number; cy: number; s: number; sting: number; mask: number; t: number }> = ({ cx, cy, s, sting, mask, t }) => {
  const o = TOM;
  const pulse = 0.7 + 0.3 * Math.sin(t * 9);
  const top = mix(230, -230, mask);
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      <defs>
        <filter id="ftBlur" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation={10} />
        </filter>
        <clipPath id="ftMask">
          <rect x={-300} y={top} width={600} height={700} />
        </clipPath>
      </defs>
      <path d="M-36,60 L56,60 L58,170 L-38,170 Z" fill={o.skinShade} />
      <ellipse cx={20} cy={4} rx={84} ry={92} fill={o.skin} />
      <path d="M-66,-40 Q-60,-112 24,-112 Q100,-110 104,-46 Q80,-86 20,-84 Q-34,-84 -66,-40 Z" fill={o.hair} />
      <ellipse cx={-30} cy={10} rx={16} ry={22} fill={o.skinShade} />
      <ellipse cx={-62} cy={12} rx={20} ry={30} fill={o.skin} />
      <ellipse cx={60} cy={30} rx={34} ry={24} fill="#e2523e" opacity={0.25 + 0.4 * sting * pulse} />
      <ellipse cx={-14} cy={34} rx={26} ry={22} fill="#e2523e" opacity={0.2 + 0.35 * sting * pulse} />
      {sting > 0 && <ellipse cx={30} cy={36} rx={110} ry={44} fill="#ff6a50" opacity={0.25 * sting * pulse} filter="url(#ftBlur)" />}
      <path d="M44,4 q12,18 0,26" stroke={o.skinShade} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={sting > 0.5 ? "M22,56 q14,-6 28,0" : "M22,52 q14,2 28,0"} stroke="#5a2e22" strokeWidth={4} fill="none" strokeLinecap="round" />
      {mask > 0 && (
        <g clipPath="url(#ftMask)">
          <path d="M-70,90 L110,90 L130,250 L-90,250 Z" fill={PRINT2} />
          {[120, 150, 180, 210].map((y) => (
            <path key={y} d={`M-80,${y} q100,${-12} 200,0`} stroke="#9e6450" strokeWidth={4} fill="none" opacity={0.7} />
          ))}
          <ellipse cx={18} cy={-14} rx={100} ry={124} fill={PRINT} />
          <ellipse cx={-74} cy={10} rx={22} ry={34} fill={PRINT2} />
          <path d="M-96,-40 q-14,40 6,90 M-84,-60 q-18,50 2,100" stroke="#e8e6e0" strokeWidth={8} fill="none" strokeLinecap="round" />
          <path d="M-60,-118 q20,-16 40,-10" stroke="#e8e6e0" strokeWidth={7} fill="none" strokeLinecap="round" />
          {[-110, -92, -74].map((y) => (
            <path key={y} d={`M-30,${y} q50,-10 100,0`} stroke="#a86a54" strokeWidth={4} fill="none" />
          ))}
          <ellipse cx={58} cy={22} rx={22} ry={20} fill="#d07563" />
          <path d="M-10,52 Q20,30 56,46 Q92,30 122,52 Q130,74 112,66 Q90,56 56,60 Q22,56 0,66 Q-18,74 -10,52 Z" fill={STASH} />
          <path d="M6,56 Q30,46 56,54 M70,54 Q96,46 116,58" stroke={STASH2} strokeWidth={4} fill="none" />
          <path d="M34,90 q22,-10 44,0" stroke="#7a3e30" strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      )}
      {/* dark sunglasses over the eyes, always on */}
      <path d="M-70,-24 L-30,-20" stroke={SHADES} strokeWidth={8} />
      <rect x={-30} y={-40} width={66} height={42} rx={16} fill={SHADES} />
      <rect x={44} y={-40} width={66} height={42} rx={16} fill={SHADES} />
      <path d="M36,-24 h8" stroke={SHADES} strokeWidth={8} />
      <path d="M-18,-32 q20,-6 36,0 M56,-32 q20,-6 36,0" stroke="#ffffff" strokeWidth={4} opacity={0.5} fill="none" strokeLinecap="round" />
      {/* jacket collar */}
      <path d="M-190,250 Q-150,150 -60,140 L80,140 Q170,150 210,250 L210,320 L-190,320 Z" fill={o.jacket} />
      <path d="M-70,150 L90,150 L100,200 L-80,200 Z" fill={o.jacketShade} />
      <path d="M10,150 L10,320" stroke="#6e3816" strokeWidth={5} />
    </g>
  );
};

// A yard scene: house behind, snowy drive, Tom shoveling, optional neighbor waving across the street.
const Yard: React.FC<{ t: number; cam: Cam; uid: string; tomX: number; s: number; mask: number; neighbor?: number; g: number; house?: boolean }> = ({ t, cam, uid, tomX, s, mask, neighbor = 0, g, house = true }) => {
  const dig = 0.5 + 0.5 * Math.sin(t * 3.4);
  const p: HikerProps = { x: tomX, y: g + 20, scale: s, walk: 0, lean: 0.22 + 0.08 * dig, poles: false, handOverride: [64, 30 + 18 * dig], breathe: 0 };
  const wave = Math.sin(t * 8) * 16;
  const n: HikerProps = { x: 860, y: g - 120, scale: 1.0, walk: 0, lean: 0, poles: false, handOverride: [36 + wave, -222], breathe: 0 };
  return (
    <>
      <WinterBackdrop cam={cam} sky={WINTER} uid={uid} treeY={g - 260} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 160} width={1880} height={1400} fill={SNOW} />
          {house && <House x={880} y={g - 150} s={0.9} />}
          <path d={`M-400,${g - 40} L1480,${g - 70}`} stroke={SNOW2} strokeWidth={50} />
          <path d={`M-400,${g + 60} Q${tomX},${g + 40} ${tomX + 140 * s},${g + 50} L${tomX + 140 * s},${g + 300} L-400,${g + 300} Z`} fill="#c9d3da" />
        </Svg>
        {neighbor > 0 && (
          <g opacity={neighbor}>
            <Subject rimX={3} col="rgba(255,246,225,0.8)">
              <Person {...n} outfit={NEIGHBOR} expression="happy" noPack flip />
            </Subject>
          </g>
        )}
        <Subject rimX={6} col="rgba(255,246,225,0.9)">
          <Person {...p} outfit={TOM} expression={mask > 0.5 ? "happy" : "tired"} noPack />
          <Svg>
            <HeadKit p={p} mask={mask} />
            <Shovel p={p} dig={dig} load={dig > 0.5 ? 1 : 0} />
          </Svg>
        </Subject>
      </Plane>
    </>
  );
};

// ============ S1 HOOK WIDE: Tom in a grandpa face shovels the drive (0 - 2.5) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.03, 1.1, t / 2.5), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Yard t={t} cam={cam} uid="a" tomX={340} s={1.9} mask={1} neighbor={1} g={1430} />
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,246,225" />
      <Particles seed={1681} n={16} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,222" cool="40,60,90" />
      <Title text={"The neighbors\nthink grandpa\nmoved in."} t={t} t0={0} top={110} size={120} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: earlier, wind on his bare face while he shovels (2.5 - 4.4) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const shake = Math.sin(t * 30) * 4;
  const cam: Cam = { x: hh.x + shake, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.9), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,244,225,0.85)">
          <Svg>
            <FaceTom cx={470} cy={1000} s={3.0} sting={at(t, [2.6, 3.2], [0.3, 1])} mask={0} t={t} />
            <Wind t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1682} n={18} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,242,228" cool="40,60,100" vignette={0.55} />
      <Chip text="Eight inches of snow" t={t} t0={2.6} x={60} y={170} icon="none" big />
      <Chip text="Wind on bare skin" t={t} t0={3.4} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the fix, the balaclava comes up over face and neck (4.4 - 6.4) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.0), rot: hh.rot };
  const mask = at(t, [4.8, 5.7], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,244,225,0.85)">
          <Svg>
            <FaceTom cx={470} cy={1000} s={3.0} sting={1 - mask} mask={mask} t={t} />
            <Wind t={t} k={0.6} n={8} />
          </Svg>
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,246,225" />
      <Particles seed={1683} n={14} col="#ffffff" fall={18} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" vignette={0.5} />
      <Chip text="The fix" t={t} t0={4.45} x={60} y={170} icon="none" big />
      <Chip text="Cover face and neck" t={t} t0={4.9} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: back to shoveling, covered, the neighbor across the street waves (6.4 - 9.2) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.8), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Yard t={t} cam={cam} uid="d" tomX={300} s={2.2} mask={1} neighbor={1} g={1440} house={false} />
      <Particles seed={1684} n={16} col="#ffffff" fall={16} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Chip text="The neighbors keep waving" t={t} t0={9.4} x={60} y={170} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the payoff, his grumpy grandpa face in the sun (9.2 - 11.2) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.02, Math.min(1, lt / 2.8)), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6} col="rgba(255,240,210,0.9)">
          <Svg>
            <FaceTom cx={500} cy={1000} s={3.0} sting={0} mask={1} t={t} />
          </Svg>
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.35} col="255,240,210" />
      <Particles seed={1685} n={18} col="#fff6e0" bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,232,200" cool="40,60,90" vignette={0.5} />
      <Chip text="Old man's face printed on" t={t} t0={6.6} x={60} y={170} icon="check" big />
      <Chip text="Head, face and neck" t={t} t0={7.7} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/funny-old-man-ski-mask-balaclava-cut.png"
      cutoutH={800}
      spec="3D PRINT BALACLAVA · HEAD, FACE + NECK"
      name={
        <>
          Funny Old Man
          <br />
          Ski Mask
        </>
      }
      nameSize={88}
      price="from $17.99"
      save="Save this before the next snow day"
    />
  );
};

export const V168: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.58} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.5} to={4.48} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.5} />
    </Scene>
    <Scene from={4.4} to={6.48} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.4} />
    </Scene>
    <Scene from={6.4} to={9.28} fadeIn={0.06} fadeOut={0.08}>
      <S5 off={6.4} />
    </Scene>
    <Scene from={9.2} to={11.28} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={9.2} />
    </Scene>
    <Scene from={11.2} to={16.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.5, 1600],
        [2.5, 4.4, 1600],
        [4.4, 6.4, 1600],
        [6.4, 9.2, 1600],
        [9.2, 11.2, 1600],
      ]}
    />
  </AbsoluteFill>
);
