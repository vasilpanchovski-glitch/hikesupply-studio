// V199: "His park list is out of date." Short format (17.6 s, 44 words), cinematic C01 style.
// Product: All 64 US National Parks — Free Printable Checklist (Letter & A4), Free ($0, live Shopify). End card: the real page, whole.
// Facts: Chiricahua National Monument (Arizona) was redesignated Chiricahua National Park in October 2026, the 64th national
// park (NPS news release, DOI, AP coverage Oct 20-21 2026). Advice: check your list against nps.gov once a year.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { UtahBackdrop } from "../trip";
import { HeldList, ParkList, ParkPhone, Spires } from "../parks64";
import vo from "../vo/v199.json";

const words = vo.words as unknown as Word[];

const DESERT: Sky = { top: "#3f74a8", mid: "#a6c8e0", low: "#f3e2c2", sun: [800, 560], sunR: 50, sunCol: "#fff6dc", glow: "#f6d6a0" };

const BEN: Outfit = {
  ...JAKE,
  skin: "#E2AE8A",
  skinShade: "#C48E6C",
  hair: "#6a4a2a",
  beard: "#6a4a2a",
  cap: "#C9643A",
  capShade: "#a24d2a",
  jacket: "#4F6B3A",
  jacketShade: "#3c5230",
  pants: "#8a7a5e",
  pantsShade: "#6e614a",
  pack: "#5a4a3a",
  packShade: "#463a2e",
};

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(20,18,14,0) 0%, rgba(20,18,14,0.45) 45%, rgba(20,18,14,0.45) 70%, rgba(20,18,14,0) 100%)" }} />
);

const Ground: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y} width={1880} height={1400} fill="#c9a57a" />
    <path d={`M-400,${y} Q540,${y - 20} 1480,${y}`} stroke="#b08a60" strokeWidth={10} fill="none" />
    {Array.from({ length: 14 }, (_, i) => (
      <ellipse key={i} cx={-300 + i * 120 + ((i * 37) % 50)} cy={y + 40 + (i % 4) * 70} rx={30 + (i % 3) * 14} ry={10} fill="#a8875f" opacity={0.6} />
    ))}
    {Array.from({ length: 8 }, (_, i) => (
      <g key={`b${i}`} transform={`translate(${-250 + i * 210},${y + 10 + (i % 2) * 30})`}>
        <ellipse cx={0} cy={0} rx={46} ry={26} fill="#7d8a52" />
        <ellipse cx={14} cy={-8} rx={30} ry={18} fill="#929f62" />
      </g>
    ))}
  </Svg>
);

const ChiriBackdrop: React.FC<{ cam: Cam; uid: string; y: number; t: number; blur?: number }> = ({ cam, uid, y, t, blur = 0 }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={DESERT} uid={uid} />
      <Clouds y={380} col="#ffffff" seed={11} drift={t * 10} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.12} blur={3 + blur}>
      <Ridge seed={61} base={y - 420} amp={260} scale={220} col="#8a93a3" lit="#e6dccb" />
    </Plane>
    <Haze y={y - 560} h={340} col={DESERT.low} opacity={0.55} />
    <Plane cam={cam} depth={0.3} blur={2 + blur}>
      <Svg>
        <Spires x={540} y={y - 200} s={0.7} seed={3} n={11} col="#a89480" shade="#857261" />
      </Svg>
    </Plane>
    <Haze y={y - 300} h={220} col={DESERT.low} opacity={0.35} />
    <Plane cam={cam} depth={0.55} blur={0.8 + blur}>
      <Svg>
        <Spires x={600} y={y - 30} s={1.05} seed={7} n={8} />
      </Svg>
    </Plane>
  </>
);

// ============ S1 HOOK MEDIUM: Ben at a red rock overlook, ticking his old list (0 - 3.4) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.04, 1.1, t / 3.4), rot: hh.rot };
  const g = 1500;
  const p: HikerProps = { x: 520, y: g + 30, scale: 2.4, walk: 0, lean: 0.02, poles: false, handOverride: [56, 36], breathe: Math.sin(t * 2) * 1.4 };
  const hand = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <UtahBackdrop cam={cam} sky={DESERT} uid="a" y={g - 40} t={t} arch={false} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} />
        <Subject rimX={-6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={BEN} expression="happy" />
          <g transform={hikerTransform(p)}>
            <HeldList hx={hand[0] - 10} hy={hand[1] + 6} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a3420" side="right" />
      </Plane>
      <Rays x={DESERT.sun[0]} y={DESERT.sun[1]} strength={0.34} col="255,226,180" />
      <Particles seed={1991} n={14} col="#fff0d0" bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,226,180" cool="50,70,100" />
      <Title text={"His park\nlist is out\nof date."} t={t} t0={0} top={110} size={128} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: his old list, total 63 (3.4 - 6.4) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(10, -20, lt / 3), zoom: mix(1.04, 1.1, lt / 3), rot: hh.rot };
  const ring = at(t, [3.6, 4.0], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#3a2a1c" }}>
      <Plane cam={cam} depth={0.4} blur={10}>
        <AbsoluteFill style={{ background: "radial-gradient(circle at 70% 30%, #a98a68 0%, #5a4330 60%, #3a2a1c 100%)" }} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <Svg>
            <g transform="translate(170,420) rotate(-3)">
              <ParkList
                old
                title="MY PARKS"
                rows={[
                  { name: "Arches", tick: 1 },
                  { name: "Big Bend", tick: 1 },
                  { name: "Bryce Canyon", tick: 1 },
                  { name: "Canyonlands", tick: 1 },
                  { name: "Capitol Reef", tick: at(t, [3.5, 3.8], [0, 1]) },
                  { name: "Carlsbad Caverns" },
                ]}
                foot="TOTAL: 63 PARKS"
              />
              <ellipse cx={270} cy={792} rx={250} ry={62} fill="none" stroke="#c23a32" strokeWidth={8} strokeDasharray={600} strokeDashoffset={600 * (1 - ring)} transform="rotate(-3 270 792)" />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1992} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={800} sunY={400} warm="255,214,170" vignette={0.55} />
      <Chip text="His list: 63 parks" t={t} t0={3.5} x={60} y={170} icon="none" big />
      <Chip text="October 2026" t={t} t0={4.0} x={60} y={300} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: Chiricahua's rock spires, the newest national park (6.4 - 8.95) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 22, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.55), rot: hh.rot };
  const g = 1480;
  const ph = t * 3;
  const p: HikerProps = { x: 300 + lt * 60, y: g + 10, scale: 1.3, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <ChiriBackdrop cam={cam} uid="c" y={g} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} />
        <Subject rimX={-4} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={BEN} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a3420" side="left" />
      </Plane>
      <Rays x={DESERT.sun[0]} y={DESERT.sun[1]} strength={0.38} col="255,226,180" />
      <Particles seed={1993} n={16} col="#fff0d0" fall={-3} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,226,180" cool="50,70,100" />
      <Chip text="Chiricahua, Arizona" t={t} t0={6.5} x={60} y={200} icon="none" big />
      <Chip text="National park no. 64" t={t} t0={7.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the rule. Phone in his hand, the official park list (8.95 - 12.8) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.25);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.85), rot: hh.rot };
  const k = at(t, [10.9, 11.4], [0, 1]);
  return (
    <AbsoluteFill>
      <ChiriBackdrop cam={cam} uid="d" y={1500} t={t} blur={10} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,240,215,0.8)">
          <Svg>
            <path d="M120,1920 Q200,1580 330,1380 L470,1420 Q380,1620 360,1920 Z" fill={BEN.jacket} />
            <g transform="translate(600,1020) rotate(-6)">
              <ParkPhone head="nps.gov" big="64" sub="NATIONAL PARKS" lines={["Acadia", "Arches", "Badlands"]} k={k} />
            </g>
            <path d="M330,1300 q-40,-50 10,-130 l90,10 l-10,160 Z" fill={BEN.skin} />
            <path d="M850,1240 q40,-50 -10,-130 l-80,10 l10,150 Z" fill={BEN.skin} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1994} n={12} col="#fff0d0" bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,236,205" cool="50,70,100" />
      <Chip text="The rule" t={t} t0={9.05} x={60} y={170} icon="none" big />
      <Chip text="Check your list on nps.gov" t={t} t0={10.6} x={60} y={300} icon="check" big />
      <Chip text="Once a year" t={t} t0={11.6} x={60} y={430} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/all-64-us-national-parks-checklist-page.png"
      cutoutH={760}
      spec="ALL 64 PARKS · LETTER & A4 · PRINTABLE"
      name={
        <>
          All 64 US National
          <br />
          Parks Checklist
        </>
      }
      nameSize={78}
      price="Free"
      save="Save this for your next trip"
    />
  );
};

export const V199: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.48} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.4} to={6.48} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.4} />
    </Scene>
    <Scene from={6.4} to={9.03} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={6.4} />
    </Scene>
    <Scene from={8.95} to={12.9} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={8.95} />
    </Scene>
    <Scene from={12.8} to={17.6} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.4, 1600],
        [3.4, 8.95, 1600],
        [8.95, 12.8, 1600],
      ]}
    />
  </AbsoluteFill>
);
