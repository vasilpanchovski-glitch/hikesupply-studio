// V74: "She forgot the trail goes back up" in the cinematic C01 style, Grand Canyon South Rim, Bright Angel Trail.
// Facts as NPS gives them (nps.gov/places/000/bright-angel-trail.htm): 1.5 Mile Resthouse = 3 mi round trip, 1,120 ft elevation change.
// End card = Grand Canyon South Rim — Trip Planning Guide ($9.99, live Shopify, digital).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, rim, Svg } from "../cine";
import { CanyonBackdrop, CanyonTrail, DESERT, DUSK, Resthouse, SHADE, Switchbacks, Wall } from "../canyon";
import vo from "../vo/v74.json";

const words = vo.words as unknown as Word[];

const MAYA: Outfit = {
  ...GUIDE,
  skin: "#E2B08F",
  skinShade: "#C69373",
  hair: "#2a1d15",
  ponytail: "#2a1d15",
  beard: null,
  cap: "#E8DCC4",
  capShade: "#C9BB9F",
  jacket: "#2F7F86",
  jacketShade: "#256870",
  pants: "#5B5546",
  pantsShade: "#45402F",
  boot: "#5a3e2a",
  sole: "#1d1916",
  pack: "#C2662E",
  packShade: "#9B4E20",
  glove: null,
};

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Tall canyon wall right behind the hiker with switchbacks up to the rim (looking up from below).
const TallWall: React.FC<{ uid: string }> = ({ uid }) => (
  <Svg>
    <Wall seed={41} base={1500} amp={1100} col="#9a4f2e" band="#bf6c40" uid={uid} step={140} />
    <Switchbacks x={730} yBot={1400} yTop={640} n={9} w={380} lw={12} />
    <circle cx={730} cy={640} r={0} fill="none" />
  </Svg>
);

// ============ S1 HOOK: below the rim, the switchbacks climb far above her (0 - 2.62) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: mix(30, -60, t / 2.6) + hh.y, zoom: mix(1.1, 1.04, t / 2.6), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 250, y: g + 140, scale: 2.3, walk: 0, lean: -0.12, poles: false, handOverride: [10, 40], breathe: Math.sin(t * 2.6) * 3 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={SHADE} uid="a" y={900} blur={3} t={t} />
      <Plane cam={cam} depth={0.7} blur={1.2}>
        <TallWall uid="a" />
      </Plane>
      <Plane cam={cam} depth={1}>
        <CanyonTrail y={g} tilt={0.05} />
        <Subject rimX={-5}>
          <Person {...p} outfit={MAYA} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#4a3a22" side="right" />
      </Plane>
      <Particles seed={41} n={20} col="#ffe7c4" fall={8} />
      <Grade sunX={880} sunY={420} warm="255,214,170" cool="40,50,80" />
      <Title text={"She forgot\nthe trail goes\nback up"} t={t} t0={0} top={140} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: downhill feels easy, she keeps going (2.62 - 6.5) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 40 + hh.x, y: lt * 10 + hh.y, zoom: mix(1.02, 1.08, lt / 3.9), rot: hh.rot + 1 };
  const g = 1400;
  const ph = lt * 3.6;
  const p: HikerProps = { x: 380 + lt * 70, y: g + 260 + lt * 8, scale: 2.3, phase: ph, walk: 0.8, lean: -0.06, poles: false, slope: -0.12 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DESERT} uid="b" y={1150} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <CanyonTrail y={g + 40} tilt={-0.12} />
        <Svg>
          {/* the marker she planned to turn at, passed */}
          <g transform={`translate(${260 - lt * 0},${g + 20})`}>
            <rect x={-8} y={-220} width={16} height={220} fill="#6b4a32" />
            <rect x={-90} y={-250} width={180} height={70} rx={8} fill="#6b4a32" />
            <rect x={-80} y={-240} width={160} height={50} rx={6} fill="#8a6a48" />
          </g>
        </Svg>
        <Subject rimX={5}>
          <Person {...p} outfit={MAYA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#4a3a22" side="left" />
      </Plane>
      <Rays x={DESERT.sun[0]} y={DESERT.sun[1]} strength={0.2} />
      <Particles seed={42} n={18} col="#fff3d6" fall={8} />
      <Grade sunX={820} sunY={520} warm="255,214,170" />
      <Chip text="Downhill feels easy" t={t} t0={2.9} x={80} y={240} icon="check" big />
      <Chip text="Past her turnaround" t={t} t0={4.85} x={80} y={370} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: she turns around, the whole canyon is above her (6.5 - 9.88) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: mix(0, -80, at(t, [7.6, 9.2], [0, 1])) + hh.y, zoom: mix(1.04, 1.1, lt / 3.4), rot: hh.rot };
  const turned = t >= 7.15;
  const p: HikerProps = { x: turned ? 470 : 600, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: turned ? -0.2 : 0.06, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={SHADE} uid="c" y={1000} blur={8} t={t} />
      <Plane cam={cam} depth={0.7} blur={7}>
        <TallWall uid="c" />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={turned ? -6 : 6}>
          <Person {...p} outfit={MAYA} expression={turned ? "tired" : "happy"} flip={turned} />
        </Subject>
      </Plane>
      <Particles seed={43} n={16} col="#ffe7c4" fall={8} />
      <Grade sunX={880} sunY={420} warm="255,214,170" cool="40,50,80" vignette={0.6} />
      <Chip text="The whole canyon" t={t} t0={8.2} x={80} y={240} icon="x" big />
      <Chip text="is above her" t={t} t0={8.9} x={80} y={370} />
    </AbsoluteFill>
  );
};

// ============ S4 WIDE: down first, so the hard part comes last (9.88 - 13.55) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: lt * 14 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.7), rot: hh.rot };
  // route profile: rim (left) down into the canyon and back up
  const k = at(t, [10.2, 13.2], [0, 1], (x) => x);
  const route = (u: number): [number, number] => {
    const x = 170 + u * 740;
    const y = 640 + Math.sin(u * Math.PI) * 560;
    return [x, y];
  };
  const [dx, dy] = route(k);
  const up = k > 0.5;
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DESERT} uid="d" y={1500} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={Array.from({ length: 41 }, (_, i) => { const [x, y] = route(i / 40); return `${i ? "L" : "M"}${x},${y}`; }).join(" ")} stroke="#ffffff" strokeWidth={14} strokeDasharray="30 22" fill="none" strokeLinecap="round" opacity={0.9} />
          <circle cx={170} cy={640} r={22} fill="#ffffff" />
          <circle cx={910} cy={640} r={22} fill="#ffffff" />
          <circle cx={dx} cy={dy} r={34} fill={up ? "#D9443A" : "#3E8E5A"} stroke="#fff" strokeWidth={8} />
        </Svg>
      </Plane>
      <Rays x={DESERT.sun[0]} y={DESERT.sun[1]} strength={0.2} />
      <Particles seed={44} n={16} col="#fff3d6" fall={8} />
      <Grade sunX={820} sunY={520} warm="255,214,170" />
      <Chip text="Rim" t={t} t0={9.95} x={110} y={520} />
      <Chip text="Down first" t={t} t0={10.3} x={80} y={1320} icon="check" big />
      <Chip text="Hard part last" t={t} t0={11.9} x={470} y={1320} icon="x" big />
    </AbsoluteFill>
  );
};

// Trailhead sign at the rim.
const Sign: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-14} y={-420} width={28} height={420} fill="#5a3e2a" />
    <rect x={-200} y={-520} width={400} height={170} rx={12} fill="#6b4a32" />
    <rect x={-186} y={-506} width={372} height={142} rx={8} fill="#8a6a48" />
    <path d="M-150,-470 h300 M-150,-430 h220 M-150,-395 h260" stroke="#e8d7b8" strokeWidth={14} strokeLinecap="round" />
  </g>
);

// ============ S5 FIX MEDIUM: pick your turnaround point at the rim (13.55 - 17.45) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 14 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.9), rot: hh.rot };
  const g = 1430;
  const point = t > 15.2;
  const p: HikerProps = { x: 380, y: g + 250, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: point ? [110, -110] : [30, 34], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DESERT} uid="e" y={1350} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* rim edge: flat ground, a low stone wall */}
          <rect x={-400} y={g} width={1880} height={1200} fill="#b98a5e" />
          <rect x={-400} y={g} width={1880} height={30} fill="#a07448" />
          <Sign x={760} y={g + 60} />
        </Svg>
        <Subject rimX={5}>
          <Person {...p} outfit={MAYA} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={DESERT.sun[0]} y={DESERT.sun[1]} strength={0.2} />
      <Particles seed={45} n={16} col="#fff3d6" fall={8} />
      <Grade sunX={820} sunY={520} warm="255,214,170" />
      <Title text={"Pick your\nturnaround\nat the rim."} t={t} t0={off + 0.15} top={150} size={130} />
    </AbsoluteFill>
  );
};

// ============ S5b WIDE: the 1.5 Mile Resthouse (17.45 - 19.35) ============
const S5b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 1.9), rot: hh.rot };
  const g = 1350;
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DESERT} uid="f" y={1150} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <CanyonTrail y={g} tilt={0.02} />
        <Svg>
          <Resthouse x={640} y={g - 10} s={0.9} />
        </Svg>
      </Plane>
      <Particles seed={46} n={14} col="#fff3d6" fall={8} />
      <Grade sunX={820} sunY={520} warm="255,214,170" />
      <Chip text="1.5 Mile Resthouse" t={t} t0={17.6} x={80} y={240} icon="check" big />
      <Readout label="ROUND TRIP" value="3 mi" ok={null} t={t} t0={18.1} x={80} y={390} />
      <Readout label="CLIMB BACK UP" value="1,120 ft" ok={null} t={t} t0={18.5} x={500} y={390} />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: she turns there, still fresh (19.35 - 21.65) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 2.3), rot: hh.rot };
  const turned = t >= 19.55;
  const p: HikerProps = { x: turned ? 480 : 600, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DESERT} uid="g" y={1000} blur={8} t={t} />
      <Plane cam={cam} depth={0.8} blur={6}>
        <Svg>
          <Resthouse x={880} y={1300} s={1.2} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={turned ? -6 : 6}>
          <Person {...p} outfit={MAYA} expression="happy" flip={turned} />
        </Subject>
      </Plane>
      <Particles seed={47} n={16} col="#fff3d6" fall={8} />
      <Grade sunX={820} sunY={520} warm="255,214,170" vignette={0.6} />
      <Chip text="Turn here" t={t} t0={19.45} x={80} y={240} icon="check" big />
      <Chip text="While you feel fresh" t={t} t0={20.3} x={80} y={370} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF: up at the rim before dark, smiling (21.65 - 24.1) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 20 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.16, 1.05], outExpo), rot: hh.rot };
  const g = 1450;
  const ph = lt * 3.2;
  const p: HikerProps = { x: 300 + lt * 60, y: g + 230, scale: 2.1, phase: ph, walk: lt < 1.4 ? 0.7 : 0, lean: 0.06, poles: false, breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DUSK} uid="h" y={1300} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g} width={1880} height={1200} fill="#9c6a48" />
          <rect x={-400} y={g} width={1880} height={30} fill="#7d5236" />
        </Svg>
        <Subject rimX={6}>
          <Person {...p} outfit={MAYA} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.3} col="255,200,140" />
      <Particles seed={48} n={24} col="#ffe2b8" fall={6} />
      <Grade sunX={760} sunY={700} warm="255,170,100" />
      <Chip text="Out before dark" t={t} t0={21.9} x={80} y={240} icon="check" big />
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

export const V74: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.67} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.62} to={6.55} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.62} />
    </Scene>
    <Scene from={6.5} to={9.93} fadeIn={0.08} fadeOut={0.1}>
      <S3 off={6.5} />
    </Scene>
    <Scene from={9.88} to={13.6} fadeIn={0.1} fadeOut={0.08}>
      <S4 off={9.88} />
    </Scene>
    <Scene from={13.55} to={17.5} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={13.55} />
    </Scene>
    <Scene from={17.45} to={19.4} fadeIn={0.08} fadeOut={0.08}>
      <S5b off={17.45} />
    </Scene>
    <Scene from={19.35} to={21.7} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={19.35} />
    </Scene>
    <Scene from={21.65} to={24.15} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={21.65} />
    </Scene>
    <Scene from={23.9} to={28.5} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.62, 1560],
        [2.62, 6.5, 1560],
        [6.5, 9.88, 1560],
        [9.88, 13.55, 1560],
        [13.55, 17.45, 1560],
        [17.45, 19.35, 1560],
        [19.35, 21.65, 1560],
        [21.65, 23.9, 1560],
      ]}
    />
  </AbsoluteFill>
);
