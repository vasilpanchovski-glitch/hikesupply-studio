// V86: "Five parks. Three days. All in the car." in the cinematic C01 style, Utah's Mighty 5.
// Advice: plan the drive before the hikes; some of the parks are hours apart, so on a short trip pick two or three and stay near each.
// No drive times or distances on screen. The map is a simple schematic, not to scale (labelled).
// End card = Utah's Mighty 5 — Trip Planning Guide, $9.99 (live Shopify, digital): drive times between the parks, 3/5/7-day itineraries.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, HEAD, Readout, Scene, Title, useT } from "../kit";
import { Cam, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { CanyonBackdrop, CanyonTrail, DESERT, DUSK } from "../canyon";
import { Subject } from "../fall";
import vo from "../vo/v86.json";

const words = vo.words as unknown as Word[];

const SUNRISE: Sky = { top: "#3f5a88", mid: "#e2a08a", low: "#ffd6a0", sun: [820, 900], sunR: 58, sunCol: "#fff2d0", glow: "#ffb878" };

const HANNAH: Outfit = {
  ...GUIDE,
  skin: "#E8B996",
  skinShade: "#CC9A78",
  hair: "#6a3b22",
  ponytail: "#6a3b22",
  beard: null,
  cap: "#2F7F86",
  capShade: "#256870",
  jacket: "#C9A23E",
  jacketShade: "#a5832c",
  pants: "#5B5546",
  pantsShade: "#45402F",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
  glove: null,
};
const CARC = { body: "#c9c4b8", shade: "#a8a397" };

// Desert highway seen side on (screen units).
const Highway: React.FC<{ y: number; t: number; speed?: number }> = ({ y, t, speed = 0 }) => (
  <Svg>
    <path d={`M-400,${y - 40} L1480,${y - 40} L1480,2600 L-400,2600 Z`} fill="#b06a3e" />
    <rect x={-400} y={y - 20} width={1900} height={90} fill="#3b3836" />
    {Array.from({ length: 14 }, (_, i) => {
      const x = ((i * 180 - t * speed) % 1980) - 300;
      return <rect key={i} x={x} y={y + 22} width={90} height={8} fill="#e8c34a" />;
    })}
    {Array.from({ length: 8 }, (_, i) => {
      const x = ((i * 290 - t * speed * 0.8) % 2300) - 400;
      return <ellipse key={`b${i}`} cx={x} cy={y + 140 + (i % 3) * 30} rx={50} ry={18} fill="#7a7f4a" />;
    })}
  </Svg>
);

// Schematic Utah map with the five parks (not to scale). sel: which parks are circled; dim: fade others.
const PARKS: { n: string; x: number; y: number; lx: number; ly: number; a: "start" | "end" | "middle"; tx: number; ty: number }[] = [
  { n: "Zion", x: 250, y: 1300, lx: 40, ly: 12, a: "start", tx: 0, ty: 0 },
  { n: "Bryce Canyon", x: 430, y: 1130, lx: 40, ly: 12, a: "start", tx: 0, ty: 0 },
  { n: "Capitol Reef", x: 590, y: 930, lx: -40, ly: 12, a: "end", tx: -190, ty: 34 },
  { n: "Canyonlands", x: 800, y: 1010, lx: 0, ly: 74, a: "middle", tx: -75, ty: 92 },
  { n: "Arches", x: 840, y: 650, lx: -40, ly: 12, a: "end", tx: -190, ty: 34 },
];
const UtahMap: React.FC<{ t: number; route: number; circle: number; stay: number; next: number }> = ({ t, route, circle, stay, next }) => {
  const path = `M${PARKS[0].x},${PARKS[0].y} L${PARKS[1].x},${PARKS[1].y} L${PARKS[2].x},${PARKS[2].y} L${PARKS[3].x},${PARKS[3].y} L${PARKS[4].x},${PARKS[4].y}`;
  return (
    <Svg>
      <rect x={-200} y={-200} width={1500} height={2400} fill="#3a2a1e" />
      <g transform="rotate(-3 540 1000)">
        <rect x={70} y={420} width={940} height={1100} rx={10} fill="#efe3c8" />
        <rect x={70} y={420} width={940} height={1100} rx={10} fill="none" stroke="#c9b48e" strokeWidth={6} />
        {/* faint relief */}
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${120 + i * 100},${480 + (i % 3) * 30} q60,120 0,260 q-50,140 20,300`} stroke="#d9c7a2" strokeWidth={8} fill="none" />
        ))}
        {/* state outline */}
        <path d="M150,480 L650,480 L650,640 L950,640 L950,1450 L150,1450 Z" fill="none" stroke="#9b7d5a" strokeWidth={6} strokeDasharray="22 12" />
        <path d={path} stroke="#B5553A" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2400" strokeDashoffset={2400 * (1 - route)} />
        {PARKS.map((p, i) => {
          const pick = i < 2;
          const op = pick ? 1 : 1 - next * 0.45;
          return (
            <g key={p.n} opacity={op}>
              <circle cx={p.x} cy={p.y} r={22} fill="#2F5D3E" stroke="#fff" strokeWidth={6} />
              <text x={p.x + p.lx} y={p.y + p.ly} textAnchor={p.a} fontFamily={HEAD} fontWeight={700} fontSize={46} fill="#2a2420">
                {p.n}
              </text>
              {pick && (
                <circle cx={p.x} cy={p.y} r={70 + Math.sin(t * 4) * 3} fill="none" stroke="#2F5D3E" strokeWidth={10} strokeDasharray={`${440 * circle} 440`} />
              )}
              {pick && (
                <g opacity={stay} transform={`translate(${p.x - 30},${p.y + 70})`}>
                  <path d="M0,30 L30,0 L60,30 L60,64 L0,64 Z" fill="#B5553A" />
                  <rect x={22} y={40} width={16} height={24} fill="#efe3c8" />
                </g>
              )}
              {!pick && next > 0 && (
                <g opacity={next} transform={`translate(${p.x + p.tx},${p.y + p.ty})`}>
                  <rect x={0} y={0} width={150} height={44} rx={22} fill="#5B5546" />
                  <text x={75} y={32} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={30} fill="#fff">
                    NEXT TRIP
                  </text>
                </g>
              )}
            </g>
          );
        })}
        <text x={980} y={1500} textAnchor="end" fontFamily={HEAD} fontWeight={600} fontSize={30} fill="#9b7d5a">
          Not to scale
        </text>
      </g>
    </Svg>
  );
};

// Bryce-style hoodoo amphitheater (screen units). y = rim line.
const Hoodoos: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    {Array.from({ length: 34 }, (_, i) => {
      const x = -260 + i * 50 + ((i * 37) % 30);
      const row = i % 3;
      const base = y + 520 + row * 60;
      const h = 260 + ((i * 53) % 200) - row * 40;
      const w = 34 + (i % 4) * 6;
      const col = ["#e58a52", "#d9774a", "#f0a36c"][row];
      return (
        <g key={i}>
          <path d={`M${x - w},${base} L${x - w * 0.8},${base - h * 0.4} Q${x - w * 1.1},${base - h * 0.55} ${x - w * 0.7},${base - h * 0.7} L${x - w * 0.6},${base - h} Q${x},${base - h - 24} ${x + w * 0.6},${base - h} L${x + w * 0.7},${base - h * 0.7} Q${x + w * 1.1},${base - h * 0.55} ${x + w * 0.8},${base - h * 0.4} L${x + w},${base} Z`} fill={col} />
          <rect x={x - w * 0.9} y={base - h * 0.5} width={w * 1.8} height={8} fill="#fff1d8" opacity={0.35} />
          <path d={`M${x + w * 0.2},${base - h + 10} L${x + w * 0.5},${base}`} stroke="#b85c34" strokeWidth={10} opacity={0.4} />
        </g>
      );
    })}
  </Svg>
);

// ============ S1 HOOK MEDIUM: Hannah behind the wheel, red rock rushing past, clock late (0 - 4.05) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.6);
  const out: Cam = { x: t * 260, y: 0, zoom: 1.0 };
  const cam: Cam = { x: hh.x - t * 8, y: hh.y, zoom: mix(1.06, 1.12, t / 4), rot: hh.rot };
  const p: HikerProps = { x: 500, y: 1180 + 182 * 3.2, scale: 3.2, walk: 0, lean: 0.02, poles: false, breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={out} sky={DUSK} uid="a" y={1250} blur={6} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={1160} width={1500} height={1100} fill="#2a2522" />
        </Svg>
        <Subject rimX={6} col="rgba(255,190,130,0.85)">
          <Person {...p} outfit={HANNAH} expression="tired" noPack />
        </Subject>
        <Svg>
          <path d="M-200,1240 L1300,1210 L1300,2200 L-200,2200 Z" fill={CARC.body} />
          <path d="M-200,1240 L1300,1210 L1300,1250 L-200,1280 Z" fill={CARC.shade} />
          <rect x={-200} y={540} width={1500} height={70} fill={CARC.shade} />
          <rect x={960} y={540} width={70} height={700} fill={CARC.shade} />
          <path d="M100,640 L330,640 L160,1100 L40,1100 Z" fill="#ffffff" opacity={0.07} />
          <ellipse cx={790} cy={1160} rx={170} ry={60} fill="none" stroke="#1c1a18" strokeWidth={34} />
          {/* dashboard clock */}
          <rect x={700} y={1300} width={250} height={100} rx={14} fill="#141414" />
          <text x={825} y={1374} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={70} fill="#7fd3ff">
            9:40 PM
          </text>
        </Svg>
      </Plane>
      <Particles seed={861} n={16} col="#ffe2b8" fall={10} />
      <Grade sunX={760} sunY={700} warm="255,190,140" cool="30,30,70" vignette={0.6} />
      <Title text={"Five parks.\nThree days.\nAll in the car."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: the car alone on a long desert highway (4.05 - 5.85) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.8), rot: hh.rot };
  const g = 1380;
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DUSK} uid="b" y={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Highway y={g} t={t} speed={60} />
        <Subject rimX={3}>
          <Car x={mix(200, 760, lt / 1.8)} y={g + 50} s={1.3} body={CARC.body} shade={CARC.shade} lights />
        </Subject>
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.2} col="255,200,150" />
      <Particles seed={862} n={16} col="#ffe2b8" />
      <Grade sunX={760} sunY={700} warm="255,200,150" />
      <Readout label="TIME ON THE TRIP" value="Mostly driving" ok={false} t={t} t0={4.2} x={80} y={200} />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Hannah checks her watch at a trailhead (5.85 - 7.95) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.1), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: [60, -100], breathe: Math.sin(t * 2.2) * 1.5 };
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DESERT} uid="c" y={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,180,0.85)">
          <Person {...p} outfit={HANNAH} expression="tired" />
          <g transform={hikerTransform(p)}>
            <rect x={h[0] - 16} y={h[1] + 4} width={22} height={18} rx={4} fill="#1c1f22" />
            <rect x={h[0] - 13} y={h[1] + 7} width={16} height={12} rx={2} fill="#7fd3ff" />
          </g>
        </Subject>
      </Plane>
      <Particles seed={863} n={14} col="#fff0d0" />
      <Grade sunX={820} sunY={520} warm="255,214,170" vignette={0.6} />
      <Chip text="One hour per trail" t={t} t0={6.0} x={80} y={200} icon="x" big />
      <Chip text="Back to the car" t={t} t0={6.9} x={80} y={330} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S4 FIX CLOSE-UP: the map, the drive first (7.95 - 11.05) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + 40, zoom: mix(1.0, 1.05, lt / 3.1), rot: hh.rot };
  const route = at(t, [9.4, 10.8], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#3a2a1e" }}>
      <Plane cam={cam} depth={1}>
        <UtahMap t={t} route={route} circle={0} stay={0} next={0} />
      </Plane>
      <Particles seed={864} n={10} col="#ffe7b8" fall={10} />
      <Grade sunX={540} sunY={500} warm="255,226,190" vignette={0.55} />
      <Title text={"Plan the drive\nbefore the hikes."} t={t} t0={off + 0.05} t1={9.3} top={160} size={124} />
      <Chip text="Drive first, then trails" t={t} t0={9.4} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: the empty highway to the horizon, hours between parks (11.05 - 13.05) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2), rot: hh.rot };
  const hz = 1080;
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DESERT} uid="e" y={hz + 30} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={hz} width={1500} height={1300} fill="#b56d40" />
          <path d={`M520,${hz} L560,${hz} L1300,2000 L-200,2000 Z`} fill="#3b3836" />
          {Array.from({ length: 7 }, (_, i) => {
            const q = ((i / 7 + lt * 0.35) % 1) ** 2;
            const y = hz + 10 + q * 900;
            const w = 4 + q * 30;
            return <rect key={i} x={540 - w / 2} y={y} width={w} height={20 + q * 120} fill="#e8c34a" />;
          })}
          {Array.from({ length: 6 }, (_, i) => (
            <ellipse key={i} cx={i % 2 ? 900 + i * 30 : 120 - i * 20} cy={hz + 120 + i * 110} rx={30 + i * 10} ry={12 + i * 4} fill="#7a7f4a" />
          ))}
        </Svg>
      </Plane>
      <Rays x={DESERT.sun[0]} y={DESERT.sun[1]} strength={0.2} />
      <Particles seed={865} n={16} col="#fff0d0" />
      <Grade sunX={820} sunY={520} warm="255,214,170" />
      <Chip text="Some parks are hours apart" t={t} t0={11.2} x={60} y={200} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: pick two, stay near each, the rest is next time (13.05 - 18.65) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + mix(-80, 40, lt / 5.6), y: hh.y + mix(160, 0, lt / 5.6), zoom: mix(1.18, 1.04, lt / 5.6), rot: hh.rot };
  const circle = at(t, [13.5, 14.3], [0, 1], outExpo);
  const stay = at(t, [15.3, 15.8], [0, 1], outExpo);
  const next = at(t, [16.7, 17.3], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#3a2a1e" }}>
      <Plane cam={cam} depth={1}>
        <UtahMap t={t} route={1} circle={circle} stay={stay} next={next} />
      </Plane>
      <Particles seed={866} n={10} col="#ffe7b8" fall={10} />
      <Grade sunX={540} sunY={500} warm="255,226,190" vignette={0.55} />
      <Chip text="Pick 2 or 3 parks" t={t} t0={13.5} x={80} y={200} icon="check" big />
      <Chip text="Stay near each one" t={t} t0={15.3} x={80} y={330} icon="check" />
      <Chip text="The rest: next trip" t={t} t0={16.7} x={80} y={430} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF: Hannah on the Bryce rim at sunrise among the hoodoos (18.65 - 22.6) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 16, y: hh.y, zoom: at(lt, [0, 1.6], [1.14, 1.04], outExpo), rot: hh.rot };
  const rimY = 1060;
  const p: HikerProps = { x: 300, y: 1420 + 182 * 2.2 - 120, scale: 2.2, walk: 0, lean: -0.02, poles: false, breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={SUNRISE} uid="g" y={rimY - 40} blur={2} t={t} />
      <Plane cam={cam} depth={0.7} blur={1.2}>
        <Hoodoos y={rimY} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <CanyonTrail y={1460} tilt={-0.03} />
        <Subject rimX={-6} col="rgba(255,190,120,0.9)">
          <Person {...p} outfit={HANNAH} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={SUNRISE.sun[0]} y={SUNRISE.sun[1]} strength={0.34} col="255,210,150" />
      <Particles seed={867} n={22} col="#ffe7b8" />
      <Grade sunX={820} sunY={900} warm="255,190,120" />
      <Chip text="Bryce at sunrise" t={t} t0={18.8} x={80} y={200} icon="check" big />
      <Chip text="No rush" t={t} t0={20.6} x={80} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/utahs-mighty-5-trip-planning-guide-card.jpg"
      spec="DRIVE TIMES · 3, 5 AND 7-DAY ITINERARIES"
      name={
        <>
          Utah's Mighty 5
          <br />
          Trip Planning Guide
        </>
      }
      nameSize={88}
      price="$9.99"
      save="Save this before you plan Utah"
    />
  );
};

export const V86: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.1} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.05} to={5.9} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.05} />
    </Scene>
    <Scene from={5.85} to={8.0} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.85} />
    </Scene>
    <Scene from={7.95} to={11.1} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.95} />
    </Scene>
    <Scene from={11.05} to={13.1} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.05} />
    </Scene>
    <Scene from={13.05} to={18.7} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={13.05} />
    </Scene>
    <Scene from={18.65} to={22.6} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={18.65} />
    </Scene>
    <Scene from={22.45} to={27.2} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.05, 1560],
        [4.05, 5.85, 1560],
        [5.85, 7.95, 1560],
        [7.95, 11.05, 1560],
        [11.05, 13.05, 1560],
        [13.05, 18.65, 1560],
        [18.65, 22.45, 1560],
      ]}
    />
  </AbsoluteFill>
);
