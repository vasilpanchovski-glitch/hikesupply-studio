// V84: "Grandpa was out of sight" in the cinematic C01 style, late-November family hike after Thanksgiving.
// Advice (standard group-hiking practice, no numbers): put the slowest hiker in front so the group moves at their pace and nobody
// is left behind; the most experienced hiker walks last and keeps an eye on everyone.
// End card = Beginner's Hiking Guide, 12 chapters, printable PDF, $9.99 (live Shopify). Store cover photo in the boxed card.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, Breath, CLEAR, FALL, GOLD, OVERCAST, Subject, Trail } from "../fall";
import vo from "../vo/v84.json";

const words = vo.words as unknown as Word[];

const BEN: Outfit = {
  ...JAKE,
  skin: "#E2A98A",
  skinShade: "#C4876A",
  hair: "#3a2418",
  beard: "#3a2418",
  cap: "#2F5D3E",
  capShade: "#244a31",
  jacket: "#C2662E",
  jacketShade: "#9B4E20",
  pack: "#2F5D8A",
  packShade: "#244a6f",
  glove: null,
};
const GRAMPS: Outfit = {
  ...GUIDE,
  skin: "#E6B497",
  skinShade: "#C89578",
  hair: "#d6d2cc",
  beard: "#d6d2cc",
  cap: "#8a2f3a",
  capShade: "#6c232c",
  jacket: "#3E5F7A",
  jacketShade: "#2E475C",
  pants: "#5B5546",
  pantsShade: "#45402F",
  pack: "#6E8B3D",
  packShade: "#566E2F",
  glove: null,
};
const MOM: Outfit = {
  ...GUIDE,
  skin: "#E8B996",
  skinShade: "#CC9A78",
  hair: "#5a3a22",
  ponytail: "#5a3a22",
  beard: null,
  cap: "#E3B23C",
  capShade: "#b88d26",
  jacket: "#2F7F86",
  jacketShade: "#256870",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  pack: "#B83A55",
  packShade: "#8E2B42",
  glove: null,
};
const KID: Outfit = { ...JAKE, skin: "#E8B996", skinShade: "#CC9A78", hair: "#7a4a22", beard: null, cap: "#B83A55", capShade: "#8E2B42", jacket: "#E3B23C", jacketShade: "#b88d26", pack: "#3E4F5C", packShade: "#2C3943", glove: null };

type Member = { o: Outfit; x: number; s: number; slow?: boolean; flip?: boolean; expr?: "tired" | "neutral" | "happy" };

// A line of walkers on one ground line. Everyone uses the same stride phase speed so they move together.
const Walkers: React.FC<{ g: number; t: number; list: Member[]; walk?: number; spd?: number }> = ({ g, t, list, walk = 0.6, spd = 3.0 }) => (
  <>
    {list.map((m, i) => {
      const p: HikerProps = { x: m.x, y: g + 182 * m.s - 60 * (m.s / 2.3), scale: m.s, phase: t * (m.slow ? spd * 0.8 : spd) + i * 1.3, walk, lean: m.slow ? 0.16 : 0.08, poles: false, breathe: 0 };
      return (
        <g key={i}>
          <Person {...p} outfit={m.o} expression={m.expr ?? "happy"} flip={m.flip} />
          <Breath p={p} t={t + i * 0.3} k={0.7} />
        </g>
      );
    })}
  </>
);

// ============ S1 HOOK MEDIUM: Ben at a bend looks back down an empty trail (0 - 3.95) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - t * 14, y: hh.y, zoom: mix(1.06, 1.12, t / 3.95), rot: hh.rot };
  const g = 1400;
  const p: HikerProps = { x: 760, y: g + 182 * 2.3 - 130, scale: 2.3, walk: 0, lean: 0.02, poles: false, breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="a" treeY={g + 10} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 60} tilt={-0.05} grass="#7a7a4a" />
        <Subject rimX={-5} col="rgba(255,226,180,0.8)">
          <Person {...p} outfit={BEN} expression="neutral" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="right" />
      </Plane>
      <Particles seed={841} n={20} col="#fff3d6" fall={30} leaves={FALL} />
      <Grade sunX={760} sunY={640} warm="240,226,200" cool="30,40,60" vignette={0.6} />
      <Title text={"Grandpa was\nout of sight"} t={t} t0={0} top={130} size={136} />
      <Chip text="Nobody behind him" t={t} t0={2.4} x={80} y={420} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: the family strung out, Ben far ahead (3.95 - 6.15) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 30, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.2), rot: hh.rot };
  const g = 1320;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="b" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} tilt={0.06} grass="#7a7a4a" />
        <Subject rimX={4}>
          <Walkers
            g={g}
            t={t}
            list={[
              { o: GRAMPS, x: 120, s: 1.2, slow: true, expr: "tired" },
              { o: MOM, x: 420, s: 1.3 },
              { o: KID, x: 560, s: 1.0 },
              { o: BEN, x: 930, s: 1.3, expr: "neutral" },
            ]}
          />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Particles seed={842} n={18} col="#fff3d6" fall={30} leaves={FALL} />
      <Grade sunX={760} sunY={640} warm="240,226,200" cool="30,40,60" />
      <Chip text="Fastest hiker in front" t={t} t0={4.2} x={80} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Grandpa alone, far behind (6.15 - 9.3) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.1), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0.15, phase: t * 2, lean: 0.14, poles: false, breathe: Math.sin(t * 2.6) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="c" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(240,230,210,0.85)">
          <Person {...p} outfit={GRAMPS} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={16}>
        <FrameLeaves col="#3a2a1a" side="right" />
      </Plane>
      <Particles seed={843} n={18} col="#fff3d6" fall={30} leaves={FALL} />
      <Grade sunX={760} sunY={640} warm="235,226,210" cool="30,40,60" vignette={0.65} />
      <Chip text="Far behind" t={t} t0={7.5} x={80} y={200} icon="x" big />
      <Chip text="Alone" t={t} t0={8.2} x={80} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 FIX MEDIUM: Grandpa steps to the front (9.3 - 12.45) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.1), rot: hh.rot };
  const g = 1420;
  const k = at(t, [10.6, 11.6], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={g - 20} blur={1} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 60} />
        <Subject rimX={5}>
          <Walkers
            g={g}
            t={t}
            walk={0.35}
            spd={2.4}
            list={[
              { o: BEN, x: mix(820, 120, k), s: 1.9 },
              { o: GRAMPS, x: mix(160, 820, k), s: 1.9, slow: true },
            ]}
          />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.24} />
      <Particles seed={844} n={18} col="#fff3d6" fall={20} leaves={FALL} />
      <Grade sunX={790} sunY={560} warm="255,226,190" />
      <Title text={"Slowest hiker\nin front."} t={t} t0={off + 0.05} t1={10.6} top={170} size={130} />
      <Chip text="Grandpa leads" t={t} t0={10.7} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 WIDE: the whole family in one line at Grandpa's pace (12.45 - 15.9) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 24, y: hh.y, zoom: mix(1.0, 1.05, lt / 3.4), rot: hh.rot };
  const g = 1320;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} tilt={0.04} />
        <Subject rimX={4}>
          <Walkers
            g={g}
            t={t}
            walk={0.4}
            spd={2.4}
            list={[
              { o: BEN, x: 170, s: 1.35 },
              { o: KID, x: 380, s: 1.05 },
              { o: MOM, x: 560, s: 1.3 },
              { o: GRAMPS, x: 800, s: 1.3, slow: true },
            ]}
          />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.24} />
      <Particles seed={845} n={18} col="#fff3d6" fall={20} leaves={FALL} />
      <Grade sunX={790} sunY={560} warm="255,226,190" />
      <Readout label="GROUP PACE" value="Grandpa's pace" ok={true} t={t} t0={12.6} x={80} y={200} />
      <Chip text="Nobody left behind" t={t} t0={14.2} x={80} y={420} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: Mom and Grandpa talking as they walk (15.9 - 17.8) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.9), rot: hh.rot };
  const a: HikerProps = { x: 260, y: 1300 + 182 * 3.6, scale: 3.6, walk: 0.2, phase: t * 2, lean: 0.06, poles: false, breathe: Math.sin(t * 2) * 1.5 };
  const b: HikerProps = { x: 760, y: 1300 + 182 * 3.6, scale: 3.6, walk: 0.2, phase: t * 2 + 2, lean: 0.12, poles: false, breathe: Math.sin(t * 2.3) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...b} outfit={GRAMPS} expression="happy" />
          <Person {...a} outfit={MOM} expression="happy" />
        </Subject>
      </Plane>
      <Particles seed={846} n={16} col="#fff3d6" fall={20} leaves={FALL} />
      <Grade sunX={790} sunY={560} warm="255,226,190" vignette={0.55} />
      <Chip text="Talk the whole way" t={t} t0={16.0} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 MEDIUM: Ben walks last and keeps an eye on everyone (17.8 - 22.45) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - 60 + lt * 26, y: hh.y, zoom: mix(1.08, 1.02, lt / 4.6), rot: hh.rot };
  const g = 1320;
  const eye = at(t, [19.5, 20.2], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="g" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} tilt={0.04} />
        <Subject rimX={5} col="rgba(255,200,130,0.9)">
          <Walkers
            g={g}
            t={t}
            walk={0.4}
            spd={2.4}
            list={[
              { o: BEN, x: 140, s: 1.6 },
              { o: KID, x: 360, s: 1.2 },
              { o: MOM, x: 560, s: 1.5 },
              { o: GRAMPS, x: 820, s: 1.5, slow: true },
            ]}
          />
        </Subject>
        <Svg>
          <g opacity={eye}>
            <path d={`M190,${g - 330} Q500,${g - 470} ${mix(200, 820, eye)},${g - 340}`} stroke="#ffffff" strokeWidth={6} strokeDasharray="18 14" fill="none" />
          </g>
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="right" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.28} col="255,214,150" />
      <Particles seed={847} n={20} col="#ffe7b8" fall={20} leaves={FALL} />
      <Grade sunX={740} sunY={660} warm="255,200,130" />
      <Chip text="Most experienced hiker last" t={t} t0={18.0} x={60} y={200} icon="check" />
      <Chip text="Eyes on everyone" t={t} t0={20.2} x={60} y={320} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF MEDIUM: everyone together at the overlook (22.45 - 24.3) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 18, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.06], outExpo), rot: hh.rot };
  const g = 1400;
  const people: [Outfit, number, number][] = [
    [BEN, 220, 1.7],
    [KID, 420, 1.3],
    [GRAMPS, 600, 1.7],
    [MOM, 820, 1.65],
  ];
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g + 180} t={t} far="#8f8aa6" mid="#6a6a58" />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d={`M-400,${g + 40} Q300,${g - 10} 700,${g + 20} Q1000,${g + 40} 1480,${g + 10} L1480,2600 L-400,2600 Z`} fill="#7d7468" />
          <path d={`M-400,${g + 80} Q500,${g + 50} 1480,${g + 70} L1480,2600 L-400,2600 Z`} fill="#665f55" />
        </Svg>
        <Subject rimX={-6} col="rgba(255,190,120,0.9)">
          {people.map(([o, x, s], i) => (
            <Person key={i} x={x} y={g + 182 * s - 40} scale={s} walk={0} lean={0} poles={false} breathe={Math.sin(t * 2 + i) * 1.5} outfit={o} expression="happy" flip={i % 2 === 1} />
          ))}
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.32} col="255,214,150" />
      <Particles seed={848} n={24} col="#ffe7b8" leaves={FALL} />
      <Grade sunX={740} sunY={660} warm="255,180,100" />
      <Chip text="Together at the overlook" t={t} t0={22.6} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/beginners-hiking-guide.jpg"
      spec="12 CHAPTERS · PRINTABLE PDF"
      name={
        <>
          Beginner's
          <br />
          Hiking Guide
        </>
      }
      nameSize={104}
      price="$9.99"
      save="Save this before your holiday hike"
    />
  );
};

export const V84: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.0} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.95} to={6.2} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.95} />
    </Scene>
    <Scene from={6.15} to={9.35} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.15} />
    </Scene>
    <Scene from={9.3} to={12.5} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.3} />
    </Scene>
    <Scene from={12.45} to={15.95} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.45} />
    </Scene>
    <Scene from={15.9} to={17.85} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={15.9} />
    </Scene>
    <Scene from={17.8} to={22.5} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={17.8} />
    </Scene>
    <Scene from={22.45} to={24.4} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={22.45} />
    </Scene>
    <Scene from={24.2} to={28.5} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.95, 1560],
        [3.95, 6.15, 1560],
        [6.15, 9.3, 1560],
        [9.3, 12.45, 1560],
        [12.45, 15.9, 1560],
        [15.9, 17.8, 1560],
        [17.8, 22.45, 1560],
        [22.45, 24.2, 1560],
      ]}
    />
  </AbsoluteFill>
);
