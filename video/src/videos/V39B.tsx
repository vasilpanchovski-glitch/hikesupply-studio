// V39B: v39 "Smokies parking tag" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, LeafTree, Pine, Readout, Scene, Title, useT, HEAD } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v39b.json";

const words = vo.words as unknown as Word[];

const SMOKY: Sky = { top: "#4a6f96", mid: "#a9bfd3", low: "#e6e7e0", sun: [800, 600], sunR: 46, sunCol: "#fffbea", glow: "#f3ead2" };
const NOON: Sky = { top: "#3a6d9e", mid: "#b9cfe0", low: "#f3e8cc", sun: [840, 560], sunR: 52, sunCol: "#fffbe8", glow: "#ffe2a6" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const SAM: Outfit = {
  ...JAKE,
  skin: "#C68A66",
  skinShade: "#A8704F",
  hair: "#1f1a18",
  beard: null,
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#6f8aa0",
  jacketShade: "#566f84",
  pants: "#8a7a5e",
  pantsShade: "#6d604a",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e", "#e0b040"];
const SAMCAR = { body: "#2f5f8a", shade: "#244a6c" };

// ---------- scenery ----------
const Woods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = 440 + (i % 3) * 70;
      return i % 4 === 1 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c="#3b6550" c2="#2b4d3c" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={["#d9963a", "#b9582c", "#e0b040"][i % 3]} c2={["#b77a28", "#94461f", "#b88a2a"][i % 3]} />
      );
    })}
  </Svg>
);

const Road: React.FC<{ y: number; t: number }> = ({ y, t }) => (
  <Svg>
    <rect x={-400} y={y - 60} width={1880} height={900} fill="#6b7a45" />
    <path d={`M-400,${y - 10} Q540,${y - 40} 1480,${y - 10} L1480,${y + 130} Q540,${y + 100} -400,${y + 130} Z`} fill="#4b4f52" />
    {Array.from({ length: 9 }, (_, i) => {
      const x = ((((i * 240 - t * 60) % 2160) + 2160) % 2160) - 400;
      return <rect key={i} x={x} y={y + 52 - Math.sin(((x + 400) / 1880) * Math.PI) * 26} width={110} height={8} rx={3} fill="#e9d27a" />;
    })}
    {Array.from({ length: 12 }, (_, i) => (
      <circle key={i} cx={-300 + i * 160} cy={y + 170 + (i % 3) * 40} r={10} fill={LEAVES[i % 4]} opacity={0.8} />
    ))}
  </Svg>
);

const Lot: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y - 60} width={1880} height={900} fill="#6b7a45" />
    <rect x={-400} y={y - 30} width={1880} height={700} fill="#55595c" />
    {Array.from({ length: 10 }, (_, i) => (
      <path key={i} d={`M${-300 + i * 220},${y + 10} L${-340 + i * 220},${y + 140}`} stroke="#e9e6dc" strokeWidth={6} />
    ))}
  </Svg>
);

// A parked car with (or without) a tag visible behind the windshield.
const ParkedCar: React.FC<{ x: number; y: number; s: number; body: string; shade: string; tag: boolean; flip?: boolean }> = ({ x, y, s, body, shade, tag, flip }) => (
  <g>
    <Car x={x} y={y} s={s} body={body} shade={shade} flip={flip} />
    {tag && <rect x={x + (flip ? -1 : 1) * 40 * s - 8 * s} y={y - 96 * s} width={16 * s} height={12 * s} rx={2} fill="#f6f3e8" stroke="#3E8E5A" strokeWidth={2 * s} />}
  </g>
);

// Close-up through a windshield: dashboard with (or without) a parking tag.
const Windshield: React.FC<{ tag: number; body: string; shade: string; t: number }> = ({ tag, body, shade, t }) => {
  const k = at(t % 6, [0, 6], [0, 1]);
  return (
    <Svg>
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fb7c8" stopOpacity={0.3} />
          <stop offset="1" stopColor="#2a3640" stopOpacity={0.25} />
        </linearGradient>
      </defs>
      {/* roof + pillars */}
      <path d="M60,430 L1020,430 L1120,1130 L-40,1130 Z" fill={shade} />
      <path d="M130,470 L950,470 L1040,1090 L40,1090 Z" fill="#1d2328" />
      {/* steering wheel */}
      <circle cx={280} cy={1060} r={150} fill="none" stroke="#0e1114" strokeWidth={30} />
      {/* dashboard */}
      <path d="M40,980 Q540,940 1040,980 L1060,1100 L20,1100 Z" fill="#2a2f33" />
      {/* glass with sky reflection */}
      <path d="M130,470 L950,470 L1040,1000 L40,1000 Z" fill="url(#glass)" />
      <path d={`M${200 + k * 500},470 L${330 + k * 500},470 L${190 + k * 500},1000 L${60 + k * 500},1000 Z`} fill="#ffffff" opacity={0.12} />
      <path d="M700,470 L760,470 L640,1000 L580,1000 Z" fill="#ffffff" opacity={0.08} />
      {/* tag */}
      {tag > 0 && (
        <g opacity={tag} transform={`translate(560,820) rotate(-4)`}>
          <rect x={0} y={0} width={300} height={170} rx={10} fill="#f6f3e8" />
          <rect x={0} y={0} width={300} height={46} rx={10} fill="#3E8E5A" />
          <rect x={0} y={30} width={300} height={16} fill="#3E8E5A" />
          <text x={150} y={34} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={30} fill="#fff" letterSpacing={2}>PARKING TAG</text>
          <text x={150} y={110} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={52} fill="#1f2a24">DAILY</text>
          <rect x={60} y={128} width={180} height={10} rx={4} fill="#c9c3b3" />
        </g>
      )}
      {/* hood */}
      <path d="M-60,1090 L1140,1090 L1240,2000 L-160,2000 Z" fill={body} />
      <path d="M-60,1090 L1140,1090 L1150,1150 L-70,1150 Z" fill={shade} />
      <path d="M300,1200 Q540,1170 780,1200" stroke="#ffffff" strokeWidth={10} opacity={0.2} fill="none" />
    </Svg>
  );
};

// Tag card held in the near hand (close-up).
const HeldTag: React.FC<{ p: HikerProps; k: number }> = ({ p, k }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)} opacity={k}>
      <g transform={`translate(${h[0] - 6},${h[1] - 46}) rotate(-6)`}>
        <rect x={0} y={0} width={66} height={40} rx={3} fill="#f6f3e8" stroke="rgba(0,0,0,0.2)" strokeWidth={0.8} />
        <rect x={0} y={0} width={66} height={11} rx={3} fill="#3E8E5A" />
        <text x={33} y={8.5} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={7.5} fill="#fff" letterSpacing={0.6}>PARKING TAG</text>
        <rect x={12} y={20} width={42} height={5} rx={2} fill="#9aa39d" />
        <rect x={18} y={29} width={30} height={4} rx={2} fill="#c9c3b3" />
      </g>
    </g>
  );
};

// ---------- shared world: smoky blue ridges ----------
const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={4} drift={t * 10} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.12} blur={3 + blur}>
      <Ridge seed={71} base={treeY - 300} amp={260} scale={300} col="#9fb2c6" />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.7} />
    <Plane cam={cam} depth={0.2} blur={2.4 + blur}>
      <Ridge seed={73} base={treeY - 200} amp={240} scale={260} col="#7f97ae" />
    </Plane>
    <Haze y={treeY - 300} h={300} col={sky.low} opacity={0.55} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={79} base={treeY - 110} amp={220} scale={200} col="#6c7f74" />
    </Plane>
    <Haze y={treeY - 200} h={240} col={sky.low} opacity={0.4} />
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

// ============ S1 HOOK: wide, driving into the Smokies for the fall colors (0 - 3.25) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: t * 30 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 3.25), rot: hh.rot };
  const g = 1460;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SMOKY} uid="a" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Road y={g} t={t} />
        <Svg>
          <Car x={120 + t * 160} y={g + 60} s={2.1} body={SAMCAR.body} shade={SAMCAR.shade} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={SMOKY.sun[0]} y={SMOKY.sun[1]} strength={0.18} />
      <Particles seed={51} n={24} leaves={LEAVES} fall={45} />
      <Grade sunX={800} sunY={600} />
      <Title text={"The Smokies are free.\nParking isn't."} t={t} t0={0} top={130} size={100} />
      <Chip text="Fall colors" t={t} t0={2.42} x={80} y={360} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: no gate, no fee (3.2 - 5.25) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 20 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.05), rot: hh.rot };
  const g = 1480;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={SMOKY} uid="b" treeY={g - 120} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Road y={g} t={t} />
        <Svg>
          {/* wooden welcome sign */}
          <rect x={690} y={g - 360} width={22} height={320} fill="#4a3526" />
          <rect x={950} y={g - 360} width={22} height={320} fill="#4a3526" />
          <rect x={640} y={g - 420} width={380} height={170} rx={14} fill="#5a3f2b" stroke="#3a2a1e" strokeWidth={8} />
          <text x={830} y={g - 345} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#efe6d2" letterSpacing={2}>GREAT SMOKY</text>
          <text x={830} y={g - 295} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#efe6d2" letterSpacing={2}>MOUNTAINS</text>
          <Car x={-100 + lt * 420} y={g + 70} s={2.5} body={SAMCAR.body} shade={SAMCAR.shade} />
        </Svg>
      </Plane>
      <Particles seed={52} n={20} leaves={LEAVES} fall={40} />
      <Grade sunX={800} sunY={600} vignette={0.55} />
      <Chip text="No entrance gate" t={t} t0={3.59} x={80} y={240} icon="check" big />
      <Chip text="No fee" t={t} t0={4.36} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S2b WIDE: the trailhead lot, every other car has a tag (5.2 - 7.6) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.4), rot: hh.rot };
  const g = 1440;
  const park = at(t, [5.2, 6.4], [0, 1], outExpo);
  const out = at(t, [6.6, 6.9], [0, 1]);
  const p: HikerProps = { x: 730, y: g + 150, scale: 1.7, walk: 0, lean: 0.04, poles: false, handOverride: [30, 30] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NOON} uid="c" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Lot y={g} />
        <Svg>
          <ParkedCar x={60} y={g + 100} s={1.6} body="#a63d2e" shade="#7f2e22" tag />
          <ParkedCar x={1000} y={g + 100} s={1.6} body="#d8d4c8" shade="#b3ad9c" tag />
          <ParkedCar x={mix(-400, 440, park)} y={g + 150} s={1.8} body={SAMCAR.body} shade={SAMCAR.shade} tag={false} />
        </Svg>
        {out > 0 && (
          <Subject rimX={3}>
            <g opacity={out}>
              <Person {...p} outfit={SAM} />
            </g>
          </Subject>
        )}
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Rays x={NOON.sun[0]} y={NOON.sun[1]} strength={0.16} />
      <Particles seed={53} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={840} sunY={560} />
      <Chip text="Trailhead lot" t={t} t0={6.14} x={80} y={240} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2c CLOSE-UP: a tag on the dashboard (7.55 - 10.4) ============
const S2c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 2.85), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NOON} uid="d" treeY={1100} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Windshield tag={1} body="#a63d2e" shade="#7f2e22" t={t} />
      </Plane>
      <Particles seed={54} n={16} leaves={LEAVES} fall={30} />
      <Grade sunX={840} sunY={560} vignette={0.6} />
      <Chip text="Every other car" t={t} t0={7.68} x={80} y={240} icon="none" big />
      <Chip text="A tag on the dash" t={t} t0={8.95} x={80} y={370} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Sam's face, any car over 15 minutes needs a tag (10.35 - 14.8) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 6 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 4.45), rot: hh.rot };
  const p: HikerProps = { x: 520, y: 2350, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: [36, 26], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NOON} uid="e" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={SAM} expression="tired" />
        </Subject>
      </Plane>
      <Particles seed={55} n={16} leaves={LEAVES} fall={30} />
      <Grade sunX={840} sunY={560} vignette={0.6} />
      <Readout label="PARKED OVER" value="15 MIN" ok={null} t={t} t0={12.59} x={80} y={240} pulseAt={12.96} />
      <Chip text="Needs a parking tag" t={t} t0={13.92} x={80} y={470} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4a MEDIUM: the fix (14.75 - 16.15) ============
const S4a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: at(lt, [0, 1.4], [-60, 0]) + hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.05]), rot: hh.rot };
  const g = 1400;
  const p: HikerProps = { x: 620, y: g + 200, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [36, 24], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NOON} uid="f" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Lot y={g + 120} />
        <Svg>
          <Car x={250} y={g + 230} s={2.3} body={SAMCAR.body} shade={SAMCAR.shade} />
        </Svg>
        <Subject>
          <Person {...p} outfit={SAM} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={NOON.sun[0]} y={NOON.sun[1]} strength={0.2} />
      <Particles seed={56} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={840} sunY={560} />
      <Title text={"Buy a tag\nbefore you go."} t={t} t0={14.85} top={200} size={140} />
    </AbsoluteFill>
  );
};

// ============ S4b CLOSE-UP: tag in hand; daily, weekly or annual (16.1 - 19.35) ============
const S4b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 8 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.25), rot: hh.rot };
  const p: HikerProps = { x: 440, y: 2350, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: [46, -6], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NOON} uid="g" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <Person {...p} outfit={SAM} expression="happy" />
          <HeldTag p={p} k={at(t, [16.15, 16.4], [0, 1])} />
        </Subject>
      </Plane>
      <Particles seed={57} n={16} leaves={LEAVES} fall={30} />
      <Grade sunX={840} sunY={560} vignette={0.6} />
      <Chip text="Daily" t={t} t0={16.21} x={80} y={240} icon="check" big />
      <Chip text="Weekly" t={t} t0={16.88} x={80} y={370} icon="check" big />
      <Chip text="Annual" t={t} t0={17.5} x={80} y={500} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4c WIDE: most trailheads have no tag machine (19.3 - 22.25) ============
const S4c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 12 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.95), rot: hh.rot };
  const g = 1460;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={NOON} uid="h" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Lot y={g} />
        <Svg>
          {/* trailhead signpost, no machine */}
          <rect x={700} y={g - 330} width={20} height={330} fill="#4a3526" />
          <rect x={620} y={g - 360} width={260} height={90} rx={8} fill="#5a3f2b" />
          <text x={750} y={g - 302} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#efe6d2" letterSpacing={2}>TRAIL</text>
          <ParkedCar x={200} y={g + 140} s={1.7} body="#a63d2e" shade="#7f2e22" tag />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Particles seed={58} n={18} leaves={LEAVES} fall={40} />
      <Grade sunX={840} sunY={560} vignette={0.5} />
      <Readout label="AT MOST TRAILHEADS" value="NO MACHINE" ok={false} t={t} t0={20.62} x={80} y={240} pulseAt={21.33} />
    </AbsoluteFill>
  );
};

// ============ S5 PAYOFF: next morning, the tag sits on the dash (22.2 - 24.95) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.16, 1.05]), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="i" treeY={1100} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Windshield tag={at(t, [23.3, 23.6], [0, 1])} body={SAMCAR.body} shade={SAMCAR.shade} t={t} />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.26} col="255,214,150" />
      <Particles seed={59} n={22} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"Tag on\nthe dash."} t={t} t0={off + 0.1} top={150} size={150} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/great-smoky-mountains-trip-planning-guide-card.jpg"
      photoH={760}
      spec="DIGITAL DOWNLOAD · DESTINATION GUIDE"
      name={
        <>
          Great Smoky
          <br />
          Mountains Trip
          <br />
          Planning Guide
        </>
      }
      nameSize={78}
      price="$9.99"
      save="Save this before your Smokies trip"
    />
  );
};

export const V39B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.25} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.2} to={5.25} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={3.2} />
    </Scene>
    <Scene from={5.2} to={7.6} fadeIn={0.1} fadeOut={0.1}>
      <S2b off={5.2} />
    </Scene>
    <Scene from={7.55} to={10.4} fadeIn={0.1} fadeOut={0.1}>
      <S2c off={7.55} />
    </Scene>
    <Scene from={10.35} to={14.8} fadeIn={0.1} fadeOut={0.1}>
      <S3 off={10.35} />
    </Scene>
    <Scene from={14.75} to={16.15} fadeIn={0.1} fadeOut={0.08}>
      <S4a off={14.75} />
    </Scene>
    <Scene from={16.1} to={19.35} fadeIn={0.08} fadeOut={0.1}>
      <S4b off={16.1} />
    </Scene>
    <Scene from={19.3} to={22.25} fadeIn={0.1} fadeOut={0.12}>
      <S4c off={19.3} />
    </Scene>
    <Scene from={22.2} to={24.95} fadeIn={0.12} fadeOut={0.12}>
      <S5 off={22.2} />
    </Scene>
    <Scene from={24.9} to={29.4} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.2, 1560],
        [3.2, 5.2, 1560],
        [5.2, 7.55, 1560],
        [7.55, 10.35, 1560],
        [10.35, 14.75, 1560],
        [14.75, 16.1, 1560],
        [16.1, 19.3, 1560],
        [19.3, 22.2, 1560],
        [22.2, 24.9, 1560],
      ]}
    />
  </AbsoluteFill>
);
