// V75: "The water tap was turned off" in the cinematic C01 style, Grand Canyon South Rim, Bright Angel Trail in November.
// Facts as NPS gives them: resthouse water on the Bright Angel is seasonal (May to October) and pipeline breaks can shut it off;
// carry all your water from the rim, bring salty snacks, check water status at the visitor center that morning.
// End card = Grand Canyon South Rim — Trip Planning Guide ($9.99, live Shopify, digital).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, rim, Svg } from "../cine";
import { CanyonBackdrop, CanyonTrail, DESERT, DUSK, Resthouse, SHADE, Tap } from "../canyon";
import vo from "../vo/v75.json";

const words = vo.words as unknown as Word[];

const LEO: Outfit = {
  ...GUIDE,
  skin: "#8E5B3E",
  skinShade: "#74472E",
  hair: "#1d1612",
  beard: "#1d1612",
  cap: "#2C3B2E",
  capShade: "#1B2620",
  jacket: "#C2662E",
  jacketShade: "#9B4E20",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#2F5D8A",
  packShade: "#244a6f",
  glove: null,
};

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Empty bottle in the near hand (local hiker units).
const HeldBottle: React.FC<{ p: HikerProps; hand: [number, number]; rot?: number; full?: boolean }> = ({ p, hand, rot = 0, full = false }) => (
  <g transform={hikerTransform(p)}>
    <g transform={`translate(${hand[0] + 4},${hand[1] + 26}) rotate(${rot}) scale(0.34)`}>
      <rect x={-34} y={-200} width={68} height={200} rx={20} fill={full ? "#3f8fb0" : "rgba(220,235,240,0.75)"} stroke="rgba(0,0,0,0.3)" strokeWidth={3} />
      <rect x={-24} y={-190} width={10} height={160} rx={5} fill="rgba(255,255,255,0.35)" />
      <rect x={-22} y={-232} width={44} height={36} rx={8} fill="#2b3a40" />
    </g>
  </g>
);

// ============ S1 HOOK MEDIUM: at the resthouse, he turns the tap, nothing (0 - 4.82) ============
const S1: React.FC = () => {
  const t = useT();
  const shake = at(t, [2.4, 2.55, 3.0], [0, 0.5, 0]);
  const hh = handheld(t, 0.6, shake);
  const cam: Cam = { x: t * 10 + hh.x, y: hh.y, zoom: mix(1.04, 1.12, t / 4.8), rot: hh.rot };
  const g = 1420;
  const turn = (Math.sin(t * 4) * 0.5 + 0.5) * at(t, [0.3, 0.6], [0, 1]);
  const p: HikerProps = { x: 760, y: g + 240, scale: 2.3, walk: 0, lean: 0.1, poles: false, handOverride: [90, 30], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={SHADE} uid="a" y={1150} blur={3} t={t} />
      <Plane cam={cam} depth={0.85} blur={1.5}>
        <Svg>
          <Resthouse x={170} y={g + 30} s={1.3} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <CanyonTrail y={g + 40} tilt={0.02} />
        <Svg>
          <Tap x={361} y={g + 200} s={1.2} turn={turn} />
        </Svg>
        <Subject rimX={5}>
          <Person {...p} outfit={LEO} expression="tired" flip />
          <g transform={`translate(${2 * p.x},0) scale(-1,1)`}>
            <HeldBottle p={p} hand={[90, 30]} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#4a3a22" side="left" />
      </Plane>
      <Particles seed={51} n={18} col="#ffe7c4" fall={8} />
      <Grade sunX={880} sunY={420} warm="255,214,170" cool="40,50,80" />
      <Title text={"The water\ntap was\nturned off"} t={t} t0={0} top={140} size={128} />
      <Chip text="3 Mile Resthouse" t={t} t0={1.7} x={80} y={560} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the tap is dry (4.82 - 6.17) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.12, lt / 1.35), rot: hh.rot };
  const p: HikerProps = { x: 380, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.12, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={SHADE} uid="b" y={1000} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-6}>
          <Person {...p} outfit={LEO} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.25}>
        <Svg>
          <Tap x={860} y={2000} s={2.2} turn={1} />
        </Svg>
      </Plane>
      <Particles seed={52} n={14} col="#ffe7c4" fall={8} />
      <Grade sunX={880} sunY={420} warm="255,214,170" cool="40,50,80" vignette={0.6} />
      <Chip text="Dry" t={t} t0={5.0} x={80} y={240} icon="x" big />
    </AbsoluteFill>
  );
};

// Season strip: 12 month blocks, May to October lit.
const Months: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const m = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return (
    <div style={{ position: "absolute", left: 80, right: 80, top: 560, display: "flex", gap: 8, opacity: at(t, [t0, t0 + 0.3], [0, 1]) }}>
      {m.map((l, i) => {
        const on = i >= 4 && i <= 9;
        const nov = i === 10;
        const k = at(t, [t0 + 0.2 + i * 0.08, t0 + 0.4 + i * 0.08], [0, 1]);
        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: 110,
              borderRadius: 14,
              background: on ? `rgba(62,142,90,${0.25 + 0.75 * k})` : nov && t > 8.9 ? "#D9443A" : "rgba(255,255,255,0.85)",
              color: on || (nov && t > 8.9) ? "#fff" : "#4a4a46",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              fontSize: 54,
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            {l}
          </div>
        );
      })}
    </div>
  );
};

// ============ S3 WIDE: water runs May through October (6.17 - 9.96) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.8), rot: hh.rot };
  const g = 1450;
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DESERT} uid="c" y={1250} t={t} />
      <Plane cam={cam} depth={1}>
        <CanyonTrail y={g} tilt={-0.04} />
        <Svg>
          <Resthouse x={760} y={g + 10} s={0.6} />
        </Svg>
        <Subject rimX={5}>
          <Person x={420} y={g + 110} scale={1.3} walk={0} lean={0.06} poles={false} outfit={LEO} expression="neutral" />
        </Subject>
      </Plane>
      <Rays x={DESERT.sun[0]} y={DESERT.sun[1]} strength={0.2} />
      <Particles seed={53} n={16} col="#fff3d6" fall={8} />
      <Grade sunX={820} sunY={520} warm="255,214,170" />
      <Chip text="Bright Angel Trail water" t={t} t0={6.7} x={80} y={420} />
      <Months t={t} t0={7.8} />
      <Chip text="May to October" t={t} t0={8.7} x={80} y={710} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: a pipe break can shut it off any time (9.96 - 12.46) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const crack = at(t, [11.4, 11.7], [0, 1], outExpo);
  const shake = at(t, [11.4, 11.5, 11.9], [0, 0.5, 0]);
  const hh = handheld(t, 0.4, shake);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.5), rot: hh.rot };
  const flow = (u: number) => ((t * 2.4 + u) % 1) * 600;
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DESERT} uid="d" y={1000} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={1200} width={1880} height={1100} fill="#9b5a36" />
          {/* pipe along the ground */}
          <rect x={-400} y={1060} width={1880} height={110} rx={50} fill="#7a7f86" />
          <rect x={-400} y={1072} width={1880} height={24} fill="rgba(255,255,255,0.22)" />
          {[120, 520, 920].map((x) => (
            <rect key={x} x={x} y={1046} width={50} height={138} rx={10} fill="#5f646a" />
          ))}
          {/* water inside (shown through a cutaway) until the break */}
          <rect x={-300} y={1090} width={600} height={50} rx={20} fill="#2e2e2e" opacity={0.6} />
          {crack < 1 &&
            [0, 0.33, 0.66].map((u, i) => <rect key={i} x={-300 + flow(u)} y={1100} width={70} height={30} rx={15} fill="#8fd0ea" opacity={1 - crack} />)}
          {/* the break */}
          <g opacity={crack}>
            <path d="M700,1060 l30,40 l-20,30 l30,40" stroke="#2b2b2b" strokeWidth={10} fill="none" />
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M720,1060 q${-60 + i * 30},${-120 - (i % 2) * 60} ${-100 + i * 50},${-200}`} stroke="#8fd0ea" strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.8} />
            ))}
          </g>
        </Svg>
      </Plane>
      <Particles seed={54} n={14} col="#fff3d6" fall={8} />
      <Grade sunX={820} sunY={520} warm="255,214,170" vignette={0.55} />
      <Chip text="A pipe breaks" t={t} t0={11.5} x={80} y={240} icon="x" big />
      <Chip text="Water off, any time" t={t} t0={11.9} x={80} y={370} icon="x" />
    </AbsoluteFill>
  );
};

// Close-up of an open pack with bottles and a bag of salty snacks going in.
const PackBottles: React.FC<{ t: number }> = ({ t }) => {
  const b = (i: number) => at(t, [13.2 + i * 0.35, 13.7 + i * 0.35], [0, 1], outExpo);
  const sn = at(t, [16.1, 16.6], [0, 1], outExpo);
  return (
    <Svg>
      <path d="M180,700 Q180,600 340,590 L760,590 Q900,600 900,740 L900,1440 Q900,1500 800,1500 L190,1500 Z" fill={LEO.pack} />
      <rect x={220} y={740} width={640} height={720} rx={30} fill="#1b2f45" />
      {[0, 1, 2].map((i) => (
        <g key={i} opacity={at(t, [13.2 + i * 0.35, 13.4 + i * 0.35], [0, 1])} transform={`translate(${320 + i * 190},${mix(820, 1180, b(i))})`}>
          <rect x={-70} y={-380} width={140} height={380} rx={40} fill="#3f8fb0" stroke="rgba(0,0,0,0.3)" strokeWidth={6} />
          <rect x={-50} y={-440} width={100} height={70} rx={14} fill="#2b3a40" />
          <rect x={-52} y={-340} width={20} height={300} rx={10} fill="rgba(255,255,255,0.25)" />
        </g>
      ))}
      <g transform={`translate(${mix(1200, 760, sn)},${mix(500, 900, sn)}) rotate(-14)`}>
        <rect x={-120} y={-150} width={240} height={300} rx={20} fill="#d9a441" />
        <rect x={-120} y={-150} width={240} height={50} rx={10} fill="#b8862c" />
        <circle cx={-30} cy={30} r={22} fill="#f3e6c4" />
        <circle cx={40} cy={60} r={18} fill="#f3e6c4" />
        <circle cx={10} cy={-10} r={14} fill="#f3e6c4" />
      </g>
    </Svg>
  );
};

// ============ S5 FIX CLOSE-UP: carry all your water from the rim, plus salty snacks (12.46 - 17.08) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 4.6), rot: hh.rot };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DESERT} uid="e" y={1100} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <PackBottles t={t} />
      </Plane>
      <Particles seed={55} n={14} col="#fff3d6" fall={8} />
      <Grade sunX={820} sunY={520} warm="255,214,170" vignette={0.55} />
      <Title text={"Carry all\nyour water."} t={t} t0={off + 0.1} t1={15.3} top={150} size={140} />
      <Chip text="Filled at the rim" t={t} t0={15.4} x={80} y={200} icon="check" big />
      <Chip text="Salty snacks" t={t} t0={16.1} x={80} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// Visitor center building with a sign.
const Center: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-420} y={-420} width={840} height={420} fill="#a98a6a" />
    <path d="M-480,-400 L0,-560 L480,-400 Z" fill="#6b4a32" />
    <rect x={-360} y={-320} width={200} height={170} fill="#3b4f5e" />
    <rect x={160} y={-320} width={200} height={170} fill="#3b4f5e" />
    <rect x={-80} y={-260} width={160} height={260} fill="#4a3424" />
    <rect x={-300} y={-120} width={600} height={0} fill="none" />
  </g>
);

// ============ S6 MEDIUM: ask at the visitor center that morning (17.08 - 20.18) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 16 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.1), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 330, y: g + 250, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DESERT} uid="f" y={1300} blur={4} t={t} />
      <Plane cam={cam} depth={0.85} blur={1.2}>
        <Svg>
          <Center x={760} y={g + 20} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g} width={1880} height={1200} fill="#b98a5e" />
          <rect x={-400} y={g} width={1880} height={30} fill="#a07448" />
        </Svg>
        <Subject rimX={5}>
          <Person {...p} outfit={LEO} expression="neutral" />
        </Subject>
      </Plane>
      <Rays x={DESERT.sun[0]} y={DESERT.sun[1]} strength={0.24} />
      <Particles seed={56} n={16} col="#fff3d6" fall={8} />
      <Grade sunX={820} sunY={520} warm="255,214,170" />
      <Chip text="Visitor center" t={t} t0={17.6} x={80} y={240} icon="check" big />
      <Readout label="ASK THAT MORNING" value="Water on?" ok={null} t={t} t0={18.6} x={80} y={380} />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF: his own water, climbing out strong (20.18 - 23.4) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 30 + hh.x, y: -lt * 12 + hh.y, zoom: at(lt, [0, 1.4], [1.16, 1.05], outExpo), rot: hh.rot };
  const g = 1400;
  const ph = lt * 3.6;
  const p: HikerProps = { x: 330 + lt * 70, y: g + 230 - lt * 8, scale: 2.2, phase: ph, walk: 0.85, lean: 0.14, poles: false, slope: 0.1 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DUSK} uid="g" y={1250} t={t} />
      <Plane cam={cam} depth={1}>
        <CanyonTrail y={g + 40} tilt={0.1} />
        <Subject rimX={6}>
          <Person {...p} outfit={LEO} expression="happy" />
          <HeldBottle p={p} hand={[18, 30]} full />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#4a3a22" side="right" />
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.3} col="255,200,140" />
      <Particles seed={57} n={24} col="#ffe2b8" fall={6} />
      <Grade sunX={760} sunY={700} warm="255,170,100" />
      <Chip text="His own water" t={t} t0={20.5} x={80} y={240} icon="check" big />
      <Chip text="Climbs out strong" t={t} t0={22.2} x={80} y={370} icon="check" />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/grand-canyon-south-rim-trip-planning-guide.jpg"
      photoH={800}
      spec="30 PAGES · 10 WALKS AND HIKES · MI + KM"
      name={
        <>
          Grand Canyon
          <br />
          Trip Guide
        </>
      }
      nameSize={100}
      price="$9.99"
      save="Save this before your canyon trip"
    />
  );
};

export const V75: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.87} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.82} to={6.22} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.82} />
    </Scene>
    <Scene from={6.17} to={10.01} fadeIn={0.08} fadeOut={0.1}>
      <S3 off={6.17} />
    </Scene>
    <Scene from={9.96} to={12.51} fadeIn={0.1} fadeOut={0.08}>
      <S4 off={9.96} />
    </Scene>
    <Scene from={12.46} to={17.13} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.46} />
    </Scene>
    <Scene from={17.08} to={20.23} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={17.08} />
    </Scene>
    <Scene from={20.18} to={23.5} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={20.18} />
    </Scene>
    <Scene from={23.2} to={28} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.82, 1560],
        [4.82, 6.17, 1560],
        [6.17, 9.96, 1560],
        [9.96, 12.46, 1560],
        [12.46, 17.08, 1560],
        [17.08, 20.18, 1560],
        [20.18, 23.2, 1560],
      ]}
    />
  </AbsoluteFill>
);
