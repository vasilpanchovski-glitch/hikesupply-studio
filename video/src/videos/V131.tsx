// V131: "Her face cover froze stiff." in the cinematic C01 style. Story for the Fleece Balaclava (Windproof Hood, Face and
// Neck Warmer, $16.99, live Shopify). Advice as the listing says: push the face panel under your chin while you climb and
// warm up, pull it up over nose and mouth when the wind hits, and snug the drawstring hood. Breath soaks fleece; wet fleece
// can freeze in cold wind. End card = real Shopify product photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { Blizzard, FrostTrail, STORM, Summit, WGOLD, WINTER, WinterBackdrop } from "../winter";
import { Balaclava, FaceClose, Puff } from "../icy";
import vo from "../vo/v131.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const BAL = "#24272b";

const MIA: Outfit = {
  ...GUIDE,
  skin: "#E2AE8C",
  skinShade: "#C4906E",
  hair: "#3b2416",
  ponytail: null,
  beard: null,
  cap: BAL,
  capShade: "#16181b",
  jacket: "#2F7F86",
  jacketShade: "#256870",
  pants: "#3F4349",
  pantsShade: "#2E3136",
  boot: "#6b4630",
  sole: "#2a2421",
  pack: "#B5553A",
  packShade: "#8E3F2A",
  glove: "#2a2a2a",
};

const BG: Sky = { ...WINTER };

// Close-up backdrop: blurred snowy woods behind the face.
const CloseBack: React.FC<{ cam: Cam; sky: Sky; uid: string; t: number }> = ({ cam, sky, uid, t }) => (
  <WinterBackdrop cam={cam} sky={sky} uid={uid} treeY={1100} t={t} blur={12} />
);

// ============ S1 HOOK MEDIUM: Mia climbs with the face panel up, breath clouds (0 - 4.97) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 16, y: hh.y, zoom: mix(1.03, 1.1, t / 4.97), rot: hh.rot };
  const g = 1560;
  const ph = t * 2.8;
  const p: HikerProps = { x: 360 + t * 40, y: g + 40 - t * 12, scale: 2.4, phase: ph, walk: 0.6, lean: 0.14, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0, slope: 0.1 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={BG} uid="a" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={0.1} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={MIA} expression="neutral" />
          <Balaclava p={p} up={1} damp={at(t, [2.5, 4.9], [0, 0.6])} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Particles seed={1311} n={22} col="#ffffff" fall={20} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="248,240,228" cool="40,60,90" />
      <Title text={"Her face cover\nfroze stiff."} t={t} t0={0} top={110} size={130} />
      <Chip text="Face cover up the whole climb" t={t} t0={2.9} x={60} y={420} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: breath soaks the fleece over her mouth (4.97 - 6.76) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 1.79), rot: hh.rot };
  return (
    <AbsoluteFill>
      <CloseBack cam={cam} sky={BG} uid="b" t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,246,225,0.8)">
          <Svg>
            <FaceClose cx={500} cy={1000} s={3.2} skin={MIA.skin} skinShade={MIA.skinShade} up={1} damp={at(t, [5.0, 6.6], [0.5, 1])} eyes="tired" />
            <Puff x={880} y={1080} t={t} s={2.2} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1312} n={12} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="248,240,228" cool="40,60,90" vignette={0.55} />
      <Chip text="Every breath soaks it" t={t} t0={5.3} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 WIDE: the open ridge, wind and blowing snow (6.76 - 8.25) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6, 0.6);
  const cam: Cam = { x: hh.x - lt * 20, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.49), rot: hh.rot };
  const g = 1520;
  const ph = t * 2.6;
  const p: HikerProps = { x: 420 + lt * 40, y: g + 30, scale: 2.2, phase: ph, walk: 0.5, lean: 0.2, poles: false, handOverride: [40, -10], breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g + 120} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={6} col="rgba(230,238,246,0.85)">
          <Person {...p} outfit={MIA} expression="tired" />
          <Balaclava p={p} up={1} damp={0.8} frost={0.4} />
        </Subject>
      </Plane>
      <Blizzard seed={1313} n={34} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" />
      <Chip text="Windy ridge" t={t} t0={7.0} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the wet fleece freezes stiff against her chin (8.25 - 9.95) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35, at(t, [8.35, 8.45, 8.9], [0, 1, 0]) * 3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 1.7), rot: hh.rot };
  return (
    <AbsoluteFill>
      <CloseBack cam={cam} sky={STORM} uid="d" t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(230,238,246,0.8)">
          <Svg>
            <FaceClose cx={500} cy={1000} s={3.2} skin={MIA.skin} skinShade={MIA.skinShade} up={1} damp={0.9} frost={at(t, [8.3, 9.3], [0.2, 1])} eyes="tired" />
          </Svg>
        </Subject>
      </Plane>
      <Blizzard seed={1314} n={22} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="220,230,242" cool="30,45,80" vignette={0.6} />
      <Chip text="Frozen stiff" t={t} t0={8.4} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: next climb, panel pushed down under the chin, breath goes free (9.95 - 14.88) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: mix(1.04, 1.1, lt / 4.93), rot: hh.rot };
  const g = 1560;
  const ph = t * 2.8;
  const down = at(t, [12.6, 13.2], [0, 1], outExpo);
  const p: HikerProps = { x: 360 + lt * 40, y: g + 40 - lt * 12, scale: 2.5, phase: ph, walk: 0.6, lean: 0.14, poles: false, handOverride: down > 0 && down < 1 ? [56, -150] : freeHand(ph, 0.5), breathe: 0, slope: 0.1 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={BG} uid="e" treeY={g - 240} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} tilt={0.1} snow={1} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={MIA} expression={down > 0.5 ? "happy" : "neutral"} />
          <Balaclava p={p} up={1 - down} />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,246,226" />
      <Particles seed={1315} n={18} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,226" cool="40,60,90" />
      <Chip text="On the climb: panel down" t={t} t0={12.3} x={60} y={200} icon="check" big />
      <Chip text="Let your face breathe" t={t} t0={13.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: wind on the ridge: panel up over the nose, hood snugged (14.88 - 18.52) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.09, lt / 3.64), rot: hh.rot };
  const up = at(t, [15.75, 16.3], [0, 1], outExpo);
  const snug = at(t, [17.25, 17.75], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <CloseBack cam={cam} sky={STORM} uid="f" t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(230,238,246,0.8)">
          <Svg>
            <FaceClose cx={500} cy={1000} s={3.2} skin={MIA.skin} skinShade={MIA.skinShade} up={up} snug={snug} eyes="neutral" />
          </Svg>
        </Subject>
      </Plane>
      <Blizzard seed={1316} n={26} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="226,232,240" cool="30,45,80" vignette={0.55} />
      <Chip text="Wind hits: panel up" t={t} t0={15.6} x={60} y={200} icon="check" big />
      <Chip text="Snug the hood" t={t} t0={17.25} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: summit in golden light, panel down, warm dry face (18.52 - 22.9) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1520;
  const p: HikerProps = { x: 420, y: g + 40, scale: 2.5, walk: 0, lean: 0.02, poles: false, handOverride: [30, 20], breathe: Math.sin(t * 2.2) * 1.5 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="g" treeY={g + 120} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <Summit y={g} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={MIA} expression="happy" />
          <Balaclava p={p} up={0} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24403a" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.45} col="255,236,200" />
      <Particles seed={1317} n={22} col="#fff3d6" fall={8} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,226,180" />
      <Readout label="AT THE TOP" value="Warm and dry" ok={true} t={t} t0={18.7} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/fleece-balaclava-windproof-hood-cut.png"
      cutoutH={760}
      spec="FLEECE · PULL-DOWN FACE PANEL · DRAWSTRING HOOD"
      name={
        <>
          Fleece Balaclava
          <br />
          Hood &amp; Neck Warmer
        </>
      }
      nameSize={96}
      price="$16.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V131: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={5.02} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.97} to={6.81} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.97} />
    </Scene>
    <Scene from={6.76} to={8.3} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.76} />
    </Scene>
    <Scene from={8.25} to={10.0} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.25} />
    </Scene>
    <Scene from={9.95} to={14.93} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={9.95} />
    </Scene>
    <Scene from={14.88} to={18.57} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={14.88} />
    </Scene>
    <Scene from={18.52} to={22.95} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={18.52} />
    </Scene>
    <Scene from={22.85} to={27.3} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.97, 1600],
        [4.97, 6.76, 1660],
        [6.76, 8.25, 1600],
        [8.25, 9.95, 1660],
        [9.95, 14.88, 1600],
        [14.88, 18.52, 1660],
        [18.52, 22.85, 1600],
      ]}
    />
  </AbsoluteFill>
);
