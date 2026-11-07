// V116: "The ice at Grand Canyon is at the top." in the cinematic C01 style. Story for the Grand Canyon South Rim Trip Planning
// Guide ($9.99, live Shopify, digital). Facts as NPS gives them: in winter the upper parts of South Rim trails can be icy and
// over-the-shoe traction devices are recommended; it is milder down in the canyon. Check conditions before you go.
// End card = real Shopify cover photo in the boxed card (as V74/V75).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { CanyonBackdrop, DESERT, SHADE, Switchbacks, Wall } from "../canyon";
import { SNOW, SNOW2, WGOLD } from "../winter";
import vo from "../vo/v116.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const EMMA: Outfit = {
  ...GUIDE,
  skin: "#E6B796",
  skinShade: "#C89878",
  hair: "#2b1a12",
  ponytail: "#2b1a12",
  beard: null,
  cap: "#E8DCC0",
  capShade: "#C9BB9C",
  jacket: "#2F7F86",
  jacketShade: "#256870",
  pants: "#5a4e44",
  pantsShade: "#463c33",
  boot: "#6b4630",
  sole: "#2a2421",
  pack: "#B5553A",
  packShade: "#8E3F2A",
  glove: null,
};
const SPIKE = "#B83A55";

// Snowy rim ground (screen coords). The edge drops away on the right from x = edge.
const SnowRim: React.FC<{ y: number; edge?: number }> = ({ y, edge = 1300 }) => (
  <Svg>
    <path d={`M-400,${y} Q${edge * 0.5},${y - 20} ${edge},${y + 10} L${edge + 60},${y + 260} L${edge + 40},2600 L-400,2600 Z`} fill="#9b6a48" />
    <path d={`M-400,${y - 6} Q${edge * 0.5},${y - 26} ${edge},${y + 4} L${edge - 20},${y + 60} Q${edge * 0.5},${y + 40} -400,${y + 70} Z`} fill={SNOW} />
    <path d={`M-400,${y + 120} Q${edge * 0.5},${y + 100} ${edge - 60},${y + 140} L${edge - 40},2600 L-400,2600 Z`} fill={SNOW2} opacity={0.75} />
    {Array.from({ length: 7 }, (_, i) => (
      <ellipse key={i} cx={-250 + i * 170} cy={y + 200 + ((i * 71) % 220)} rx={60} ry={18} fill="#7a5a40" opacity={0.7} />
    ))}
  </Svg>
);

// Snow caps along the far canyon walls (screen coords) to make the rim look wintry.
const SnowCaps: React.FC<{ y: number; seed: number }> = ({ y, seed }) => (
  <Svg>
    {Array.from({ length: 9 }, (_, i) => {
      const x = -200 + i * 170 + ((i * seed * 37) % 60);
      const yy = y + ((i * 53 + seed) % 120);
      return <path key={i} d={`M${x - 90},${yy} Q${x},${yy - 34} ${x + 90},${yy} Q${x},${yy - 10} ${x - 90},${yy} Z`} fill="#ffffff" opacity={0.85} />;
    })}
  </Svg>
);

const Spikes: React.FC<{ p: HikerProps }> = ({ p }) => {
  const g = hikerGeometry(p);
  return (
    <g transform={hikerTransform(p)}>
      {g.legs.map((l, i) => (
        <g key={i}>
          <path d={`M${l.foot[0] - 18},${l.foot[1] + 2} ${[0, 1, 2, 3, 4].map(() => `l5,7 l6,-7`).join(" ")}`} stroke="#3a3f44" strokeWidth={3} fill="none" />
          <path d={`M${l.foot[0] - 16},${l.foot[1] - 16} L${l.foot[0] + 24},${l.foot[1] - 8}`} stroke={SPIKE} strokeWidth={4} />
        </g>
      ))}
    </g>
  );
};

// ============ S1 HOOK WIDE: Emma on the South Rim in snow (0 - 3.56) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.03, 1.1, t / 3.56), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 330, y: g + 120, scale: 2.3, walk: 0, lean: 0, poles: false, handOverride: [30, 20], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={SHADE} uid="a" y={1260} t={t} />
      <Plane cam={cam} depth={0.55} blur={1}>
        <SnowCaps y={1080} seed={3} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <SnowRim y={g} edge={860} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={EMMA} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a2c" side="left" />
      </Plane>
      <Particles seed={1161} n={28} col="#ffffff" fall={34} />
      <LowScrim />
      <Grade sunX={880} sunY={420} warm="245,238,228" cool="40,60,90" />
      <Title text={"The ice at\nGrand Canyon\nis at the top."} t={t} t0={0} top={120} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: looking down at the first switchbacks below the rim, white with ice (3.56 - 5.9) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y + lt * 20, zoom: mix(1.0, 1.08, lt / 2.34), rot: hh.rot };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={SHADE} uid="b" y={900} t={t} blur={2} />
      <Plane cam={cam} depth={0.85}>
        <Svg>
          <Wall seed={33} base={860} amp={140} col="#b3683f" band="#cf8a5c" uid="b2" />
          <rect x={-200} y={1000} width={1500} height={1100} fill="#a85a35" />
          {Array.from({ length: 6 }, (_, i) => (
            <rect key={i} x={-200} y={1080 + i * 150} width={1500} height={40} fill="#c8774a" opacity={0.5} />
          ))}
          <Switchbacks x={560} yBot={1820} yTop={900} n={6} w={520} col="#eef6fb" lw={34} />
          <SnowCaps y={960} seed={7} />
          <SnowCaps y={1300} seed={11} />
        </Svg>
      </Plane>
      <Particles seed={1162} n={30} col="#ffffff" fall={36} />
      <LowScrim />
      <Grade sunX={880} sunY={420} warm="245,238,228" cool="40,60,90" />
      <Chip text="Snow at the South Rim" t={t} t0={4.0} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: boot skids on packed ice on the switchback (5.9 - 8.8) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [7.3, 7.42, 7.9], [0, 1, 0]);
  const hh = handheld(t, 0.4, shake * 5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 2.9), rot: hh.rot };
  const slip = at(t, [7.25, 7.6], [0, 1]);
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={SHADE} uid="c" y={900} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-400,1260 L1480,1180 L1480,2600 L-400,2600 Z" fill="#dfeaf0" />
          <path d="M-400,1300 L1480,1220 L1480,1300 L-400,1380 Z" fill="#ffffff" opacity={0.8} />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${100 + i * 240},${1250 - i * 10} l140,-12`} stroke="#ffffff" strokeWidth={10} opacity={0.9} strokeLinecap="round" />
          ))}
          <g transform={`translate(${slip * 160},${slip * -10}) rotate(${-slip * 8} 520 1240)`}>
            <path d="M300,500 Q380,460 470,500 L500,1020 L280,1020 Z" fill={EMMA.pants} />
            <path d="M240,990 L520,990 Q560,1050 700,1090 Q840,1120 850,1190 L850,1230 L220,1230 Z" fill={EMMA.boot} stroke="rgba(0,0,0,0.3)" strokeWidth={4} />
            <path d="M300,1010 L500,1010" stroke="#c9b48e" strokeWidth={10} />
            <rect x={210} y={1220} width={650} height={34} rx={14} fill={EMMA.sole} />
          </g>
          {slip > 0 &&
            [0, 1, 2].map((i) => (
              <line key={i} x1={200 - i * 20} y1={1250 + i * 16} x2={200 - i * 20 - 220 * slip} y2={1252 + i * 16} stroke="#ffffff" strokeWidth={10} strokeLinecap="round" opacity={0.9} />
            ))}
        </Svg>
      </Plane>
      <Particles seed={1163} n={16} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={880} sunY={420} warm="245,238,228" cool="40,60,90" vignette={0.55} />
      <Chip text="Packed ice" t={t} t0={7.4} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 WIDE: the upper trail stays icy after the storm (8.8 - 12.4) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.0, 1.08, lt / 3.6), rot: hh.rot };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DESERT} uid="d" y={1100} t={t} />
      <Plane cam={cam} depth={0.55} blur={1}>
        <SnowCaps y={900} seed={5} />
      </Plane>
      <Plane cam={cam} depth={0.9}>
        <Svg>
          <path d="M-200,700 L300,640 L700,700 L1300,620 L1300,2100 L-200,2100 Z" fill="#b8693f" />
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} x={-200} y={760 + i * 180} width={1500} height={50} fill="#d08a5c" opacity={0.45} />
          ))}
          {/* snow and ice on the top band of the wall */}
          <path d="M-200,690 L300,630 L700,690 L1300,610 L1300,980 Q700,1040 300,960 Q60,930 -200,1000 Z" fill="#f4f8fa" opacity={0.92} />
          <Switchbacks x={520} yBot={1780} yTop={700} n={7} w={560} col="#f1c99d" lw={22} />
          <Switchbacks x={520} yBot={1000} yTop={700} n={2} w={560} col="#cfe6f2" lw={26} />
        </Svg>
      </Plane>
      <Rays x={DESERT.sun[0]} y={DESERT.sun[1] - 200} strength={0.2} col="255,246,220" />
      <Particles seed={1164} n={14} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={360} warm="250,236,214" cool="40,60,90" />
      <Readout label="UPPER TRAIL" value="Icy" ok={false} t={t} t0={9.9} x={60} y={200} />
      <Chip text="Long after a storm" t={t} t0={11.2} x={60} y={520} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: the camera tilts down to the warm canyon below (12.4 - 15.53) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const tilt = at(lt, [0, 2.4], [0, 1]);
  const cam: Cam = { x: hh.x, y: hh.y + tilt * 260, zoom: 1.05, rot: hh.rot };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={DESERT} uid="e" y={900} t={t} />
      <Plane cam={cam} depth={0.9}>
        <Svg>
          <rect x={-200} y={700} width={1500} height={1700} fill="#b8693f" />
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={-200} y={760 + i * 170} width={1500} height={50} fill="#d9945e" opacity={0.5} />
          ))}
          <path d="M-200,690 L1300,610 L1300,900 Q700,960 -200,920 Z" fill="#f4f8fa" opacity={0.9} />
          <Switchbacks x={520} yBot={2200} yTop={720} n={9} w={560} col="#f1c99d" lw={22} />
          <ellipse cx={540} cy={1900} rx={700} ry={300} fill="#ffd9a0" opacity={0.25} />
        </Svg>
      </Plane>
      <Rays x={760} y={1400} strength={0.35 * tilt} col="255,230,180" />
      <Particles seed={1165} n={16} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={760} sunY={1300} warm="255,226,180" cool="40,60,90" />
      <Readout label="DOWN IN THE CANYON" value="Milder" ok={true} t={t} t0={13.3} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: traction devices strap over the boot (15.53 - 19.22) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.69), rot: hh.rot };
  const k = at(t, [16.6, 17.5], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={SHADE} uid="f" y={900} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={1200} width={1880} height={900} fill="#e9eef1" />
          <ellipse cx={560} cy={1330} rx={430} ry={40} fill="rgba(0,0,0,0.18)" />
          <path d="M300,560 Q380,520 470,560 L500,1090 L280,1090 Z" fill={EMMA.pants} />
          <path d="M330,640 Q360,800 330,960" stroke={EMMA.pantsShade} strokeWidth={10} fill="none" />
          <path d="M240,1060 L520,1060 Q560,1120 700,1160 Q840,1190 850,1260 L850,1300 L220,1300 Z" fill={EMMA.boot} stroke="rgba(0,0,0,0.3)" strokeWidth={4} />
          <path d="M300,1080 L500,1080" stroke="#c9b48e" strokeWidth={10} />
          <rect x={210} y={1290} width={650} height={34} rx={14} fill={EMMA.sole} />
          <g transform={`translate(${(1 - k) * 700},${(1 - k) * 60})`} opacity={k}>
            <path d="M200,1250 Q190,1130 300,1100 M860,1280 Q900,1200 820,1170" stroke={SPIKE} strokeWidth={22} fill="none" strokeLinecap="round" />
            <path d="M200,1300 L870,1300" stroke={SPIKE} strokeWidth={18} />
            <path d={`M230,1324 ${Array.from({ length: 12 }, () => "l24,30 l26,-30").join(" ")}`} stroke="#3a3f44" strokeWidth={8} fill="none" strokeLinejoin="round" />
          </g>
        </Svg>
      </Plane>
      <Particles seed={1166} n={14} col="#ffffff" fall={24} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,225" cool="40,60,90" vignette={0.5} />
      <Chip text="The park recommends" t={t} t0={15.7} x={60} y={200} icon="none" big />
      <Chip text="Traction on icy trails" t={t} t0={16.7} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 MEDIUM: Emma turns around and walks back up to the rim (19.22 - 21.1) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 20, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.88), rot: hh.rot };
  const g = 1520;
  const ph = t * 3;
  const p: HikerProps = { x: 640 - lt * 70, y: g + 120, scale: 2.4, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={SHADE} uid="g" y={1260} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowRim y={g} edge={1300} />
        <Subject rimX={-6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={EMMA} expression="neutral" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a2c" side="right" />
      </Plane>
      <Particles seed={1167} n={20} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={880} sunY={420} warm="245,238,228" cool="40,60,90" />
      <Chip text="She turned around" t={t} t0={19.4} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF: next morning, golden light, microspikes on, down the icy switchback (21.1 - 25.0) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 24, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1500;
  const ph = t * 3;
  const p: HikerProps = { x: 320 + lt * 60, y: g + 140 + lt * 18, scale: 2.4, phase: ph, walk: 0.7, lean: -0.04, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0, slope: -0.08 };
  return (
    <AbsoluteFill>
      <CanyonBackdrop cam={cam} sky={WGOLD} uid="h" y={1240} t={t} />
      <Plane cam={cam} depth={0.55} blur={1}>
        <SnowCaps y={1060} seed={9} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g - 30} L1480,${g + 120} L1480,2600 L-400,2600 Z`} fill="#9b6a48" />
          <path d={`M-400,${g - 36} L1480,${g + 114} L1480,${g + 190} L-400,${g + 40} Z`} fill="#e9f2f6" />
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M${-200 + i * 330},${g - 20 + (i * 330 + 200) * 0.08} l120,10`} stroke="#ffffff" strokeWidth={8} strokeLinecap="round" />
          ))}
        </Svg>
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={EMMA} expression="happy" />
          <Spikes p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2a3a2c" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.4} col="255,236,200" />
      <Particles seed={1168} n={22} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,226,180" />
      <Chip text="Next morning" t={t} t0={21.1} x={60} y={200} icon="none" big />
      <Chip text="Microspikes on" t={t} t0={21.95} x={60} y={330} icon="check" big />
      <Chip text="Conditions checked" t={t} t0={23.4} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
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
          South Rim Guide
        </>
      }
      nameSize={100}
      price="$9.99"
      save="Save this before your winter trip"
    />
  );
};

export const V116: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.61} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.56} to={5.95} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.56} />
    </Scene>
    <Scene from={5.9} to={8.85} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.9} />
    </Scene>
    <Scene from={8.8} to={12.45} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.8} />
    </Scene>
    <Scene from={12.4} to={15.58} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.4} />
    </Scene>
    <Scene from={15.53} to={19.27} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={15.53} />
    </Scene>
    <Scene from={19.22} to={21.15} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={19.22} />
    </Scene>
    <Scene from={21.1} to={25.0} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={21.1} />
    </Scene>
    <Scene from={24.7} to={28} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.56, 1560],
        [3.56, 8.8, 1560],
        [8.8, 12.4, 1560],
        [12.4, 15.53, 1560],
        [15.53, 19.22, 1560],
        [19.22, 24.7, 1560],
      ]}
    />
  </AbsoluteFill>
);
