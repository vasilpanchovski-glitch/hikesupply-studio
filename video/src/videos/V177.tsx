// V177: "No reservation. No sunrise." Short format (17.0 s, 41 words), cinematic C01 style.
// Product: Acadia National Park — Trip Planning Guide, $9.99 (live Shopify). End card: the real store cover, whole.
// Facts (NPS Acadia): from late spring to fall, driving the Cadillac Summit Road needs a vehicle reservation from
// Recreation.gov; part of the reservations open about 90 days ahead, the rest 2 days before. No prices on screen.
// The phone UI is generic (no Recreation.gov or NPS branding).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, HEAD, Pine, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, Haze, handheld, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { INK, PAPER } from "../trip";
import vo from "../vo/v177.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const PREDAWN: Sky = { top: "#1f2d4f", mid: "#6f6a8e", low: "#f2a982", sun: [760, 980], sunR: 26, sunCol: "#ffe2c0", glow: "#ff9f72" };
const SCREEN = "210,230,255";
const GREEN = "#3e7d4f";

const KIM: Outfit = {
  ...GUIDE,
  skin: "#E2B48F",
  skinShade: "#C4946F",
  hair: "#2a1d14",
  ponytail: "#2a1d14",
  beard: null,
  cap: "#B83A55",
  capShade: "#922b42",
  jacket: "#2E64B4",
  jacketShade: "#234e8f",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  glove: null,
};

const Phone: React.FC<{ x: number; y: number; s?: number; rot?: number; children: React.ReactNode; uid: string }> = ({ x, y, s = 1, rot = 0, children, uid }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <defs>
      <clipPath id={`pc${uid}`}>
        <rect x={-170} y={-350} width={340} height={700} rx={30} />
      </clipPath>
    </defs>
    <rect x={-190} y={-380} width={380} height={760} rx={50} fill="#1d2126" />
    <g clipPath={`url(#pc${uid})`}>
      <g transform="translate(-170,-350)">{children}</g>
    </g>
    <rect x={-50} y={330} width={100} height={8} rx={4} fill="rgba(255,255,255,0.7)" />
  </g>
);

// Reservation checkpoint at the foot of the summit road: barrier arm and sign.
const Gate: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-300} y={-150} width={26} height={150} fill="#6a6a6a" />
    <rect x={-300} y={-150} width={620} height={30} rx={8} fill="#f4f4f4" />
    {Array.from({ length: 6 }, (_, i) => (
      <rect key={i} x={-280 + i * 100} y={-150} width={50} height={30} fill="#c23a32" />
    ))}
    <rect x={300} y={-160} width={26} height={160} fill="#6a6a6a" />
    <g transform="translate(-40,-420)">
      <rect x={-6} y={120} width={20} height={150} fill="#5a4030" />
      <rect x={-220} y={-30} width={460} height={170} rx={10} fill="#6b4a2e" stroke="#f3e6cf" strokeWidth={6} />
      <text x={10} y={36} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#f3e6cf" letterSpacing={2}>
        SUMMIT ROAD
      </text>
      <text x={10} y={96} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={34} fill="#f3e6cf" letterSpacing={1}>
        RESERVATION REQUIRED
      </text>
    </g>
  </g>
);

// Rounded granite summit dome with the dawn glow behind it.
const Dome: React.FC<{ g: number; lit?: string }> = ({ g, lit = "#ffb48a" }) => (
  <Svg>
    <path d={`M-300,${g - 180} Q200,${g - 520} 560,${g - 560} Q900,${g - 540} 1400,${g - 220} L1400,${g + 400} L-300,${g + 400} Z`} fill="#4c4a62" />
    <path d={`M200,${g - 470} Q480,${g - 572} 760,${g - 556}`} stroke={lit} strokeWidth={10} fill="none" opacity={0.8} />
  </Svg>
);

const Backdrop177: React.FC<{ cam: Cam; uid: string; g: number; blur?: number; t: number }> = ({ cam, uid, g, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04}>
      <SkyPlane sky={PREDAWN} uid={uid} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2.4 + blur}>
      <Dome g={g - 120} />
    </Plane>
    <Haze y={g - 520} h={300} col={PREDAWN.low} opacity={0.3} />
    <Plane cam={cam} depth={0.3} blur={1.4 + blur}>
      <Ridge seed={41} base={g - 120} amp={200} scale={120} col="#343a50" lit="#c98a78" />
    </Plane>
    <Plane cam={cam} depth={0.45} blur={0.8 + blur}>
      <Svg>
        {Array.from({ length: 16 }, (_, i) => (
          <Pine key={i} x={-300 + i * 110} y={g - 40 + (i % 2) * 10} h={240 + (i % 3) * 60 + Math.sin(t + i) * 2} c="#1f3330" c2="#172826" />
        ))}
      </Svg>
    </Plane>
  </>
);

// ============ S1 HOOK WIDE: before dawn, Kim's car stopped at the summit road checkpoint (0 - 2.42) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.09, t / 2.42), rot: hh.rot };
  const g = 1500;
  const roll = at(t, [0, 1.2], [0.6, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop177 cam={cam} uid="a" g={g} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 40} width={1880} height={1400} fill="#3c4436" />
          <path d={`M300,${g - 40} L780,${g - 40} L1300,2200 L-200,2200 Z`} fill="#4a4f56" />
          <path d={`M538,${g - 40} L542,${g - 40} L560,2200 L520,2200 Z`} fill="#d9c25a" />
          <Gate x={600} y={g + 120} s={1.1} />
        </Svg>
        <Svg>
          <g transform={`translate(${mix(-120, 230, roll)},${g + 160}) scale(1.4)`}>
            <Car x={0} y={0} body="#b84a3a" shade="#8f382c" lights />
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#141f1c" side="right" />
      </Plane>
      <Rays x={PREDAWN.sun[0]} y={PREDAWN.sun[1] - 300} strength={0.18} col="255,190,150" />
      <Particles seed={1771} n={14} col="#ffe2c8" fall={4} />
      <LowScrim />
      <Grade sunX={760} sunY={700} warm="255,190,150" cool="25,30,70" />
      <Title text={"No reservation.\nNo sunrise."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: Kim beside her car at the barrier, the summit glowing above, turned back (2.42 - 5.83) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.4), rot: hh.rot };
  const g = 1560;
  const p: HikerProps = { x: 430, y: g + 200, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [70, 70], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill>
      <Backdrop177 cam={cam} uid="b" g={g - 60} t={t} blur={1.5} />
      <Plane cam={cam} depth={0.6} blur={2.4}>
        <Svg>
          <g transform={`translate(820,${g - 20}) scale(0.9)`}>
            <rect x={-300} y={-150} width={620} height={30} rx={8} fill="#f4f4f4" />
            {Array.from({ length: 6 }, (_, i) => (
              <rect key={i} x={-280 + i * 100} y={-150} width={50} height={30} fill="#c23a32" />
            ))}
            <rect x={300} y={-160} width={26} height={160} fill="#6a6a6a" />
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g - 20} width={1880} height={1400} fill="#4a4f56" />
          <g transform={`translate(1000,${g + 230}) scale(2.2)`}>
            <Car x={0} y={0} body="#b84a3a" shade="#8f382c" flip lights />
          </g>
        </Svg>
        <Subject rimX={5} col="rgba(255,190,150,0.85)">
          <Person {...p} outfit={KIM} expression="tired" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#141f1c" side="left" />
      </Plane>
      <Particles seed={1772} n={12} col="#ffe2c8" fall={5} />
      <LowScrim />
      <Grade sunX={760} sunY={700} warm="255,190,150" cool="25,30,70" />
      <Chip text="No reservation" t={t} t0={2.6} x={60} y={200} icon="x" big />
      <Chip text="Turned back" t={t} t0={4.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// Kim's hands holding the phone (screen units).
const Hands: React.FC<{ tap: number; tx: number }> = ({ tap, tx }) => (
  <g>
    <ellipse cx={310} cy={1380} rx={64} ry={36} fill={KIM.skin} transform="rotate(-30 310 1380)" />
    <ellipse cx={776} cy={1400} rx={64} ry={36} fill={KIM.skinShade} transform="rotate(30 776 1400)" />
    <g transform={`translate(${tx},${1820 - tap * 30})`}>
      <rect x={-60} y={-80} width={120} height={300} rx={58} fill={KIM.skin} />
      <ellipse cx={0} cy={-60} rx={46} ry={40} fill={KIM.skinShade} opacity={0.4} />
    </g>
  </g>
);

const Sleeve: React.FC = () => <rect x={380} y={1700} width={440} height={500} rx={120} fill={KIM.jacket} />;

// ============ S3 CLOSE-UP: the rule on her phone, summit road needs a vehicle reservation in summer and fall (5.83 - 10.3) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.8], [1.12, 1.03], outExpo) + lt * 0.01, rot: hh.rot };
  const hi = at(t, [8.2, 8.7], [0, 1]);
  const season = at(t, [6.9, 7.4], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#141824" }}>
      <Plane cam={cam} depth={0.5} blur={16}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#2a2f48" />
          <circle cx={800} cy={500} r={420} fill="#ff9f72" opacity={0.18} />
          <circle cx={200} cy={300} r={90} fill="#ffd9b0" opacity={0.25} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col={`rgba(${SCREEN},0.6)`}>
          <Svg>
            <Sleeve />
            <Phone x={540} y={1060} s={1.3} rot={-3} uid="c">
              <rect x={0} y={0} width={340} height={700} fill="#f4f6f8" />
              <rect x={0} y={0} width={340} height={120} fill="#2C3B2E" />
              <text x={24} y={66} fontFamily={HEAD} fontWeight={800} fontSize={30} fill={PAPER} letterSpacing={2}>
                CADILLAC SUMMIT
              </text>
              <text x={24} y={100} fontFamily={HEAD} fontWeight={700} fontSize={26} fill={PAPER} letterSpacing={2}>
                ROAD
              </text>
              <rect x={20} y={150} width={300} height={130} rx={14} fill="#ffe7a8" opacity={season} />
              <text x={36} y={200} fontFamily="Inter" fontWeight={700} fontSize={23} fill={INK}>
                Summer and fall:
              </text>
              <text x={36} y={240} fontFamily="Inter" fontWeight={500} fontSize={21} fill={INK}>
                reservation needed
              </text>
              <rect x={20} y={310} width={300} height={170} rx={14} fill={hi > 0.5 ? "#e3f0e6" : "#e9ecef"} />
              <g transform="translate(70,395)">
                <rect x={-34} y={-22} width={68} height={34} rx={10} fill={GREEN} opacity={0.3 + hi * 0.7} />
                <circle cx={-18} cy={14} r={9} fill="#2a2e34" />
                <circle cx={18} cy={14} r={9} fill="#2a2e34" />
              </g>
              <text x={124} y={380} fontFamily="Inter" fontWeight={700} fontSize={22} fill={INK}>
                Vehicle
              </text>
              <text x={124} y={412} fontFamily="Inter" fontWeight={700} fontSize={22} fill={INK}>
                reservation
              </text>
              {Array.from({ length: 3 }, (_, i) => (
                <rect key={i} x={24} y={520 + i * 44} width={i === 2 ? 160 : 280} height={16} rx={6} fill="#cfd5da" />
              ))}
            </Phone>
            <Hands tap={0} tx={850} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1773} n={10} col="#ffe2c8" fall={4} bokeh />
      <Grade sunX={800} sunY={500} warm="255,200,170" cool="25,30,70" vignette={0.55} />
      <Chip text="Summer and fall" t={t} t0={6.9} x={60} y={170} icon="check" big />
      <Chip text="Vehicle reservation" t={t} t0={8.6} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: two release dates on the booking calendar, then she books (10.3 - 13.55) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const tap = at(t, [12.5, 12.65, 12.9], [0, 1, 0]);
  const hh = handheld(t, 0.3, tap * 2);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.1, lt / 3.25), rot: hh.rot };
  const a = at(t, [10.5, 10.9], [0, 1], outExpo);
  const b = at(t, [12.2, 12.6], [0, 1], outExpo);
  const booked = t > 12.7;
  return (
    <AbsoluteFill style={{ background: "#1a1410" }}>
      <Plane cam={cam} depth={0.5} blur={16}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#4a3a2e" />
          <circle cx={820} cy={420} r={380} fill="#ffcf9c" opacity={0.2} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,190,0.8)">
          <Svg>
            <Sleeve />
            <Phone x={540} y={1040} s={1.3} rot={3} uid="d">
              <rect x={0} y={0} width={340} height={700} fill="#f4f6f8" />
              <rect x={0} y={0} width={340} height={96} fill="#2C3B2E" />
              <text x={24} y={62} fontFamily={HEAD} fontWeight={800} fontSize={32} fill={PAPER} letterSpacing={2}>
                RESERVATIONS
              </text>
              {/* month grid */}
              {Array.from({ length: 35 }, (_, i) => {
                const c = i % 7;
                const r = Math.floor(i / 7);
                const early = i === 8;
                const late = i === 30;
                return (
                  <rect
                    key={i}
                    x={22 + c * 43}
                    y={124 + r * 52}
                    width={36}
                    height={42}
                    rx={8}
                    fill={early ? `rgba(62,125,79,${0.15 + a * 0.85})` : late ? `rgba(194,102,46,${0.15 + b * 0.85})` : "#e3e7ea"}
                  />
                );
              })}
              <rect x={22} y={400} width={296} height={60} rx={12} fill="#e3f0e6" opacity={a} />
              <text x={40} y={440} fontFamily="Inter" fontWeight={700} fontSize={22} fill={INK} opacity={a}>
                Some: 90 days ahead
              </text>
              <rect x={22} y={474} width={296} height={60} rx={12} fill="#f6e3d6" opacity={b} />
              <text x={40} y={514} fontFamily="Inter" fontWeight={700} fontSize={22} fill={INK} opacity={b}>
                The rest: 2 days before
              </text>
              <rect x={24} y={590} width={292} height={76} rx={38} fill={booked ? GREEN : "#2C3B2E"} />
              <text x={170} y={640} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={34} fill="#fff" letterSpacing={3}>
                {booked ? "BOOKED" : "BOOK"}
              </text>
            </Phone>
            <Hands tap={tap} tx={mix(860, 760, at(t, [11.9, 12.5], [0, 1]))} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1774} n={10} col="#ffe8c0" fall={4} bokeh />
      <Grade sunX={820} sunY={420} warm="255,220,180" vignette={0.55} />
      <Chip text="Some open 90 days ahead" t={t} t0={10.5} x={60} y={170} icon="check" big />
      <Chip text="The rest: 2 days before" t={t} t0={12.2} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/acadia-national-park-trip-planning-guide-cover-cut.png"
      cutoutH={800}
      spec="30-PAGE TRIP PLANNING GUIDE · DOWNLOAD"
      name={
        <>
          Acadia National Park
          <br />
          Trip Planning Guide
        </>
      }
      nameSize={72}
      price="$9.99"
      save="Save this for Acadia"
    />
  );
};

export const V177: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.5} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.42} to={5.93} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={2.42} />
    </Scene>
    <Scene from={5.83} to={10.4} fadeIn={0.06} fadeOut={0.1}>
      <S3 off={5.83} />
    </Scene>
    <Scene from={10.3} to={13.65} fadeIn={0.06} fadeOut={0.12}>
      <S4 off={10.3} />
    </Scene>
    <Scene from={13.55} to={17.0} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.42, 1600],
        [2.42, 5.83, 1600],
        [5.83, 10.3, 1600],
        [10.3, 13.55, 1600],
      ]}
    />
  </AbsoluteFill>
);
