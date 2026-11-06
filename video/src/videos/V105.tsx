// V105: "He climbed 23 peaks and can't prove one." in the cinematic C01 style. Gift story for the Peak Bagger's Logbook (p14),
// posted Dec 2. Facts from the product (products/p14): a progress board to color in for each list (NH 48 4,000-Footers among them)
// and a log card for every peak with date, route, times, weather and partners. $6.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, Subject, CLEAR } from "../fall";
import { FrostTrail, WINTER, WinterBackdrop } from "../winter";
import { Room, WindowView } from "../home";
import { Desk } from "../trip";
import { Cairn, LogCard, PhotoPhone, ProgressBoard } from "../peak";
import vo from "../vo/v105.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#1d2a44", mid: "#3e4e6c", low: "#6f7d92", sun: [800, 560], sunR: 26, sunCol: "#f4f1e6", glow: "#a8b2c4" };
const LAMP = "255,200,140";

const BEN: Outfit = {
  ...JAKE,
  skin: "#E2AE8C",
  skinShade: "#C48F6E",
  hair: "#3a2a1c",
  beard: "#3a2a1c",
  cap: "#2C6E63",
  capShade: "#1f5249",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  pack: "#3E4F5C",
  packShade: "#2C3943",
};
const BEN_HOME: Outfit = { ...BEN, jacket: "#5d6b7a", jacketShade: "#475361", cap: "#3a2a1c", capShade: "#2a1e14", glove: null };
const BEN_WINTER: Outfit = { ...BEN, jacket: "#2F6F8E", jacketShade: "#22546c", cap: "#C9A23E", capShade: "#a5832c", glove: "#2a2a2a" };

const SIS: Outfit = {
  ...JAKE,
  skin: "#E8B898",
  skinShade: "#CA9878",
  hair: "#6b4a2e",
  ponytail: "#6b4a2e",
  beard: null,
  cap: "#6b4a2e",
  capShade: "#55391f",
  jacket: "#6d7f4a",
  jacketShade: "#566539",
  pants: "#4a4f57",
  pantsShade: "#363a40",
  glove: null,
};

const PAPER = "#f7f2e8";
const INK = "#2C3B2E";

// Home printer with a page sliding out (k 0..1).
const Printer: React.FC<{ x: number; y: number; w: number; k: number }> = ({ x, y, w, k }) => {
  const h = w * 0.42;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={10} y={h + 10} width={w} height={30} rx={10} fill="rgba(0,0,0,0.25)" />
      <rect x={0} y={0} width={w} height={h} rx={28} fill="#e9ecee" />
      <rect x={0} y={h * 0.62} width={w} height={h * 0.38} rx={20} fill="#cfd5d8" />
      <rect x={w * 0.12} y={h * 0.52} width={w * 0.76} height={16} rx={8} fill="#2b2f33" />
      <circle cx={w * 0.86} cy={h * 0.25} r={12} fill="#3e7d4f" />
      <g transform={`translate(${w * 0.16},${h * 0.56})`}>
        <rect x={0} y={0} width={w * 0.68} height={mix(0, w * 0.6, k)} fill={PAPER} />
        {Array.from({ length: 12 }, (_, i) => {
          const cy = mix(0, w * 0.6, k) - w * 0.06 - Math.floor(i / 4) * w * 0.1;
          return cy > w * 0.02 ? <circle key={i} cx={w * 0.1 + (i % 4) * w * 0.16} cy={cy} r={w * 0.035} fill="none" stroke={INK} strokeWidth={3} /> : null;
        })}
      </g>
    </g>
  );
};

// Rocky alpine summit ground with low scrub (NH style).
const RockTop: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <path d={`M-400,${y - 20} Q540,${y - 80} 1480,${y - 10} L1480,${y + 960} L-400,${y + 960} Z`} fill="#8a8574" />
    {Array.from({ length: 7 }, (_, i) => {
      const x = ((((i * 330 - shift) % 2310) + 2310) % 2310) - 400;
      return (
        <g key={i}>
          <ellipse cx={x} cy={y + 90 + (i % 2) * 210} rx={110} ry={38} fill="#6f6b60" />
          <ellipse cx={x - 20} cy={y + 76 + (i % 2) * 210} rx={70} ry={12} fill="#a39d8a" opacity={0.6} />
        </g>
      );
    })}
    {Array.from({ length: 26 }, (_, i) => {
      const x = ((((i * 81 - shift) % 2100) + 2100) % 2100) - 400;
      const yy = y - 30 + ((i * 57) % 360);
      return <path key={i} d={`M${x},${yy} q8,-28 16,-48 M${x + 12},${yy} q-4,-22 -12,-38`} stroke={i % 2 ? "#a08a56" : "#8c7a48"} strokeWidth={6} fill="none" strokeLinecap="round" />;
    })}
  </Svg>
);

// ============ S1 HOOK MEDIUM: Ben on a summit by the cairn, phone out (0 - 5.35) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.02, 1.1, t / 5.35), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 400, y: g, scale: 2.3, walk: 0, lean: 0.03, poles: false, handOverride: [60, -40], breathe: Math.sin(t * 2.4) * 1.6 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="a" treeY={g - 260} blur={1.5} t={t} />
      <Plane cam={cam} depth={1}>
        <RockTop y={g} shift={cam.x} />
        <Svg>
          <Cairn x={820} y={g + 20} s={1.6} />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,190,0.85)">
          <Person {...p} outfit={BEN} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a22" side="left" top={1100} />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.26} />
      <Particles seed={1051} n={16} col="#fff2d0" />
      <Grade sunX={790} sunY={560} />
      <Title text={"He climbed 23 peaks\nand can't\nprove one."} t={t} t0={0} top={120} size={112} />
      <Chip text="23 of the NH 48" t={t} t0={3.13} x={60} y={600} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the phone, four years of blurry summit photos (5.35 - 10.43) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 5.08), rot: hh.rot };
  const scroll = at(t, [6.9, 10.2], [0, 1300]);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={0.6} blur={10}>
        <WindowView x={600} y={200} w={420} h={520} sky={NIGHT} uid="b" snow={false} />
        <Room floorY={1500} win={[600, 200, 420, 520]} wall="#5a4c40" floor="#3a2c22" lamp={[160, 500]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,226,180,0.7)">
          <g>
            <ellipse cx={560} cy={1320} rx={250} ry={160} fill={BEN_HOME.skin} />
            <ellipse cx={420} cy={1180} rx={70} ry={110} fill={BEN_HOME.skin} transform="rotate(-20 420 1180)" />
            <rect x={300} y={1380} width={520} height={600} rx={120} fill={BEN_HOME.jacket} />
          </g>
          <PhotoPhone x={560} y={920} s={1.2} scroll={scroll} rot={-4} uid="s2" />
        </Subject>
      </Plane>
      <Particles seed={1052} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={700} warm={LAMP} cool="40,40,70" vignette={0.6} />
      <Chip text="4 years of blurry photos" t={t} t0={7.8} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Ben's face, nothing written down (10.43 - 12.78) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.35), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 600, y: 1640 + 182 * s, scale: s, walk: 0, lean: 0.04, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 2) * 1 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={9}>
        <WindowView x={80} y={300} w={420} h={520} sky={NIGHT} uid="c" snow={false} />
        <Room floorY={1500} win={[80, 300, 420, 520]} wall="#5a4c40" floor="#3a2c22" lamp={[900, 500]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,180,0.85)">
          <Person {...p} outfit={BEN_HOME} expression="tired" noPack />
        </Subject>
      </Plane>
      <Particles seed={1053} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={900} sunY={500} warm={LAMP} cool="40,40,70" vignette={0.6} />
      <Chip text="Dates?" t={t} t0={10.44} x={60} y={200} icon="x" big />
      <Chip text="Routes?" t={t} t0={10.84} x={60} y={330} icon="x" big />
      <Chip text="Who was there?" t={t} t0={11.16} x={60} y={460} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: his sister prints a logbook (12.78 - 15.21) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 14, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.43), rot: hh.rot };
  const floorY = 1560;
  const p: HikerProps = { x: 330, y: floorY + 40, scale: 2.4, walk: 0, lean: 0.08, poles: false, handOverride: [80, 20], breathe: Math.sin(t * 2) * 1.4 };
  const k = at(t, [13.0, 14.8], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#120c08" }}>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={560} y={320} w={420} h={520} sky={NIGHT} uid="d" />
        <Room floorY={floorY - 140} win={[560, 320, 420, 520]} wall="#5a4c40" floor="#3a2c22" lamp={[180, 520]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,220,170,0.85)">
          <Person {...p} outfit={SIS} expression="happy" noPack />
        </Subject>
        <Desk y={1280} />
        <Subject rimX={-3} col="rgba(255,220,170,0.6)">
          <Printer x={560} y={1100} w={420} k={k} />
        </Subject>
      </Plane>
      <Particles seed={1054} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={900} warm={LAMP} cool="10,20,50" vignette={0.6} />
      <Chip text="His sister printed a logbook" t={t} t0={13.2} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: one board to color in (15.21 - 17.95) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(-20, 20, lt / 2.74), zoom: mix(1.02, 1.07, lt / 2.74), rot: hh.rot };
  const filled = Math.floor(at(t, [15.4, 17.4], [0, 23]));
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <ProgressBoard x={160} y={370} w={760} filled={filled} rot={-2} />
        </Subject>
      </Plane>
      <Particles seed={1055} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="One board to color in" t={t} t0={15.3} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: one card for every peak (17.95 - 21.0) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.05), rot: hh.rot };
  const k = [at(t, [18.15, 18.5], [0, 1]), at(t, [18.52, 18.9], [0, 1]), at(t, [18.98, 19.4], [0, 1]), at(t, [19.52, 20.0], [0, 1])];
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Svg>
          <g opacity={0.9}>
            <ProgressBoard x={-260} y={300} w={620} filled={23} rot={-10} />
          </g>
        </Svg>
        <Subject rimX={-5} col="rgba(255,230,190,0.85)">
          <LogCard
            x={190}
            y={400}
            w={760}
            no="PEAK 12"
            peak="MOUNT LAFAYETTE"
            date="Sept 14"
            vals={["Franconia Ridge loop", "Start 7:10 · top 10:40", "Clear, windy on top", "Me and Sam"]}
            k={k}
            tick={[at(t, [20.2, 20.5], [0, 1]), 0]}
            rot={3}
          />
        </Subject>
      </Plane>
      <Particles seed={1056} n={10} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="One card for every peak" t={t} t0={17.97} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: snowy trailhead, Ben writes peak 24 on the card at the car (21.0 - 23.0) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 22, y: hh.y, zoom: at(lt, [0, 1.2], [1.14, 1.04], outExpo), rot: hh.rot };
  const g = 1470;
  const p: HikerProps = { x: 560, y: g + 40, scale: 2.3, walk: 0, lean: 0.14, poles: false, handOverride: [80, 10], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 40} snow={1} />
        <Svg>
          <Car x={260} y={g + 60} s={2.1} body="#5E7E8A" shade="#4a6470" />
        </Svg>
        <Subject rimX={6} col="rgba(255,240,210,0.9)">
          <Person {...p} outfit={BEN_WINTER} expression="happy" />
        </Subject>
        <Svg>
          <g transform={`translate(${p.x + 150},${g - 270}) rotate(-12)`}>
            <rect x={0} y={0} width={110} height={130} rx={8} fill={PAPER} />
            <rect x={14} y={20} width={80} height={8} rx={4} fill={INK} />
            <rect x={14} y={44} width={60} height={6} rx={3} fill="#2a3a8a" />
            <rect x={14} y={62} width={70} height={6} rx={3} fill="#2a3a8a" />
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1f2e2a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,246,220" />
      <Particles seed={1057} n={24} col="#ffffff" fall={40} />
      <Grade sunX={800} sunY={560} warm="255,236,210" />
      <Chip text="Last weekend, at the trailhead" t={t} t0={21.05} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: circle 24 gets colored in (23.0 - 24.75) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.08, 1.16, lt / 1.75), rot: hh.rot };
  const k = at(t, [23.05, 23.6], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-300} y={-300} width={1680} height={2600} fill="#6a7880" />
        </Svg>
        <Subject rimX={4} col="rgba(255,240,210,0.7)">
          <ProgressBoard x={160} y={370} w={760} filled={23} next={23} k={k} rot={2} />
        </Subject>
      </Plane>
      <Particles seed={1058} n={16} col="#ffffff" fall={30} />
      <Grade sunX={800} sunY={500} warm="255,236,210" vignette={0.5} />
      <Chip text="Peak number 24" t={t} t0={23.05} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/peak-baggers-logbook.jpg"
      photoH={720}
      spec="40 PAGES · 3 PEAK LISTS · PRINTABLE"
      name={
        <>
          Peak Bagger's
          <br />
          Logbook
        </>
      }
      nameSize={104}
      price="$6.99"
      save="Save this for the peak bagger on your list"
    />
  );
};

export const V105: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={5.4} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={5.35} to={10.48} fadeIn={0.08} fadeOut={0.08}>
      <S2 off={5.35} />
    </Scene>
    <Scene from={10.43} to={12.83} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={10.43} />
    </Scene>
    <Scene from={12.78} to={15.26} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={12.78} />
    </Scene>
    <Scene from={15.21} to={18.0} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={15.21} />
    </Scene>
    <Scene from={17.95} to={21.05} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={17.95} />
    </Scene>
    <Scene from={21.0} to={23.05} fadeIn={0.12} fadeOut={0.08}>
      <S7 off={21.0} />
    </Scene>
    <Scene from={23.0} to={24.8} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={23.0} />
    </Scene>
    <Scene from={24.6} to={29} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 5.35, 1560],
        [5.35, 10.43, 1560],
        [10.43, 12.78, 1560],
        [12.78, 15.21, 1560],
        [15.21, 17.95, 1560],
        [17.95, 21.0, 1560],
        [21.0, 23.0, 1560],
        [23.0, 24.6, 1560],
      ]}
    />
  </AbsoluteFill>
);
