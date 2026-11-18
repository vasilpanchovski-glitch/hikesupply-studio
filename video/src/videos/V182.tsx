// V182: "She was warm. The baby wasn't." Short format (16.0 s, 43 words), cinematic C01 style.
// Product: Hiking With Babies & Toddlers — Parent's Guide & Checklists (Printable), $7.99 (live Shopify). End card: the real cover, boxed.
// Advice (common, conservative parenting guidance, no numbers): a baby riding in a carrier is not moving and does not warm up
// like the parent who carries it, so dress the baby in one more layer than you wear and check the back of the neck often.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT, freeHand } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { WinterBackdrop, WINTER, FrostTrail } from "../winter";
import { Subject, Sweat } from "../fall";
import vo from "../vo/v182.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const MIA: Outfit = {
  ...GUIDE,
  skin: "#C68E68",
  skinShade: "#A87352",
  hair: "#2a1a10",
  ponytail: "#2a1a10",
  beard: null,
  cap: "#3E7D4F",
  capShade: "#2f6040",
  jacket: "#7A4E9A",
  jacketShade: "#5f3b78",
  pants: "#3a3f47",
  pantsShade: "#2a2e34",
  glove: null,
};
const BABY_SKIN = "#E9B996";
const BABY_SHADE = "#CF9C78";
const FLEECE = "#E3B23C"; // thin fleece
const SUIT = "#2E64B4"; // the extra warm layer
const HAT_THIN = "#d6d0c4";
const HAT_WARM = "#C2662E";

// Baby in a back carrier, drawn in the parent's local hiker units (behind the parent).
const CarrierBaby: React.FC<{ p: HikerProps; layer?: number }> = ({ p, layer = 0 }) => {
  const { hip, sh, lean } = hikerGeometry(p);
  const u = [Math.sin(lean), -Math.cos(lean)];
  const n = [Math.cos(lean), Math.sin(lean)];
  const P = (b: readonly number[], a: number, f: number) => [b[0] + u[0] * a + n[0] * f, b[1] + u[1] * a + n[1] * f];
  const deg = (lean * 180) / Math.PI;
  const c = P(hip, 78, -64);
  const body = P(sh, 4, -64);
  const head = P(sh, 46, -60);
  return (
    <g transform={hikerTransform(p)}>
      {/* baby body above the carrier */}
      <ellipse cx={body[0]} cy={body[1]} rx={24} ry={30} fill={layer > 0.5 ? SUIT : FLEECE} transform={`rotate(${deg} ${body[0]} ${body[1]})`} />
      <circle cx={head[0]} cy={head[1]} r={20} fill={BABY_SKIN} />
      <circle cx={head[0] + 10} cy={head[1] - 2} r={2.4} fill="#2a1f1a" />
      <path d={`M${head[0] - 21},${head[1] - 4} Q${head[0]},${head[1] - 34} ${head[0] + 21},${head[1] - 4} Z`} fill={layer > 0.5 ? HAT_WARM : HAT_THIN} />
      {layer > 0.5 && <circle cx={head[0]} cy={head[1] - 24} r={7} fill="#f3e6cf" />}
      {/* carrier */}
      <g transform={`translate(${c[0]},${c[1]}) rotate(${deg})`}>
        <rect x={-34} y={-70} width={68} height={128} rx={22} fill="#3a4a5a" stroke="rgba(0,0,0,0.25)" strokeWidth={1.5} />
        <rect x={-34} y={-70} width={22} height={128} rx={14} fill="#2c3946" />
        <rect x={-30} y={-80} width={60} height={22} rx={10} fill="#2c3946" />
        <path d="M-40,60 L-60,96" stroke="#5a6773" strokeWidth={6} strokeLinecap="round" />
      </g>
    </g>
  );
};

// Big close-up of the baby's face in the carrier. cold 0..1, layer 0..1 (the warm suit and hat arriving).
const BabyClose: React.FC<{ cold: number; layer: number; t: number }> = ({ cold, layer, t }) => {
  const k = (t * 0.6) % 1;
  return (
    <g transform="translate(540,1000)">
      {/* parent's shoulder and carrier straps */}
      <path d="M-700,560 Q-300,420 0,470 Q300,420 700,560 L700,1200 L-700,1200 Z" fill={MIA.jacket} />
      <rect x={-380} y={60} width={760} height={760} rx={140} fill="#3a4a5a" />
      <rect x={-380} y={60} width={760} height={90} rx={40} fill="#2c3946" />
      {/* body: thin fleece, then the warm suit */}
      <ellipse cx={0} cy={300} rx={270} ry={230} fill={FLEECE} />
      <path d="M-40,120 L-40,500" stroke="#c99a2e" strokeWidth={8} opacity={1 - layer} />
      <g opacity={layer} transform={`translate(0,${(1 - layer) * -200}) scale(${0.85 + 0.15 * layer})`}>
        <ellipse cx={0} cy={300} rx={300} ry={250} fill={SUIT} />
        {[200, 290, 380].map((y) => (
          <path key={y} d={`M-260,${y} Q0,${y + 30} 260,${y}`} stroke="#234e8f" strokeWidth={10} fill="none" />
        ))}
      </g>
      {/* arms */}
      <ellipse cx={-250} cy={260} rx={70} ry={120} fill={layer > 0.5 ? SUIT : FLEECE} transform="rotate(25 -250 260)" />
      <ellipse cx={250} cy={260} rx={70} ry={120} fill={layer > 0.5 ? SUIT : FLEECE} transform="rotate(-25 250 260)" />
      <circle cx={-290} cy={360} r={46} fill={BABY_SKIN} />
      <circle cx={290} cy={360} r={46} fill={BABY_SKIN} />
      {/* head */}
      <circle cx={0} cy={-120} r={210} fill={BABY_SKIN} />
      <ellipse cx={-205} cy={-110} rx={34} ry={46} fill={BABY_SHADE} />
      <ellipse cx={205} cy={-110} rx={34} ry={46} fill={BABY_SHADE} />
      <ellipse cx={-72} cy={-110} rx={16} ry={cold > 0.5 ? 12 : 20} fill="#2a1f1a" />
      <ellipse cx={72} cy={-110} rx={16} ry={cold > 0.5 ? 12 : 20} fill="#2a1f1a" />
      <path d="M-20,-50 Q0,-36 20,-50" stroke={BABY_SHADE} strokeWidth={8} fill="none" strokeLinecap="round" />
      {cold > 0.5 ? (
        <path d="M-40,30 Q0,6 40,30" stroke="#7a3a30" strokeWidth={9} fill="none" strokeLinecap="round" />
      ) : (
        <path d="M-40,14 Q0,44 40,14" stroke="#7a3a30" strokeWidth={9} fill="none" strokeLinecap="round" />
      )}
      <ellipse cx={-120} cy={-20} rx={46} ry={28} fill="#e07a6a" opacity={0.35 * (1 - cold)} />
      <ellipse cx={120} cy={-20} rx={46} ry={28} fill="#e07a6a" opacity={0.35 * (1 - cold)} />
      {/* cold tint */}
      <circle cx={0} cy={-120} r={210} fill="#8fb6d9" opacity={0.3 * cold} />
      {/* thin hat, then the warm one */}
      <path d="M-214,-150 Q-200,-360 0,-370 Q200,-360 214,-150 Q0,-190 -214,-150 Z" fill={HAT_THIN} />
      <g opacity={layer} transform={`translate(0,${(1 - layer) * -260})`}>
        <path d="M-226,-140 Q-214,-380 0,-390 Q214,-380 226,-140 Q0,-190 -226,-140 Z" fill={HAT_WARM} />
        <rect x={-232} y={-176} width={464} height={56} rx={26} fill="#9B4E20" />
        <circle cx={0} cy={-400} r={56} fill="#f3e6cf" />
      </g>
      {/* breath in the cold air */}
      <circle cx={60 + k * 120} cy={40 - k * 60} r={20 + k * 50} fill="#f2f4f6" opacity={0.35 * (1 - k) * cold} />
    </g>
  );
};

// ============ S1 HOOK MEDIUM-WIDE: Mia climbs, sweating, baby on her back (0 - 1.95) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - t * 16, y: hh.y, zoom: mix(1.03, 1.1, t / 1.95), rot: hh.rot };
  const g = 1460;
  const ph = t * 5.4;
  const p: HikerProps = { x: mix(380, 520, t / 1.95), y: g + 60, scale: 2.2, phase: ph, walk: 1, lean: 0.2, poles: false, handOverride: freeHand(ph, 1), slope: 0.08 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 260} t={t} snow={0.4} />
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.18} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 60} tilt={0.08} />
        <Subject rimX={4} col="rgba(255,236,196,0.85)">
          <CarrierBaby p={p} />
          <Person {...p} outfit={MIA} expression="tired" noPack />
          <Sweat p={p} t={t} on={1} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1c2a24" side="right" />
      </Plane>
      <Particles seed={1821} n={18} col="#ffffff" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,232,196" cool="20,40,70" vignette={0.5} />
      <Title text={"She was warm.\nThe baby\nwasn't."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the baby, sitting still, getting cold (1.95 - 5.1) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.1, lt / 3.15), rot: hh.rot };
  const cold = at(t, [3.2, 4.4], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#9fb4c4" }}>
      <Plane cam={cam} depth={0.3} blur={14}>
        <Svg>
          <rect x={-300} y={-200} width={1680} height={2400} fill="#b9c9d4" />
          <circle cx={800} cy={400} r={300} fill="#ffffff" opacity={0.4} />
          {[100, 360, 700, 980].map((x, i) => (
            <rect key={i} x={x} y={200} width={60} height={1400} fill="#5f6c66" opacity={0.6} />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,255,255,0.7)">
          <BabyClose cold={cold} layer={0} t={t} />
        </Subject>
      </Plane>
      <Particles seed={1822} n={16} col="#ffffff" fall={8} />
      <Grade sunX={800} sunY={400} warm="225,235,255" cool="20,40,70" vignette={0.55} />
      <Chip text="Sitting still" t={t} t0={2.5} x={60} y={200} icon="none" big />
      <Chip text="Getting cold" t={t} t0={4.1} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: Mia walks warm, the baby rides still (5.1 - 7.1) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: mix(1.06, 1.12, lt / 2), rot: hh.rot };
  const g = 1460;
  const ph = t * 5.4;
  const p: HikerProps = { x: 470, y: g + 182 * 2.6 - 160, scale: 2.6, phase: ph, walk: 1, lean: 0.14, poles: false, handOverride: freeHand(ph, 1) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={g - 200} blur={2} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 200} />
        <Subject rimX={5} col="rgba(255,226,170,0.85)">
          <CarrierBaby p={p} />
          <Person {...p} outfit={MIA} expression="neutral" noPack />
          <Sweat p={p} t={t} on={0.8} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1c2a24" side="left" />
      </Plane>
      <Particles seed={1823} n={16} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,226,180" cool="20,40,70" vignette={0.55} />
      <Chip text="Walking warms Mia" t={t} t0={5.3} x={60} y={200} icon="check" big />
      <Chip text="Not the baby" t={t} t0={6.1} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the baby gets one more layer (7.1 - 9.1) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.1, 1.04, lt / 2), rot: hh.rot };
  const layer = at(t, [7.7, 8.2], [0, 1], outExpo);
  const cold = 1 - at(t, [8.0, 8.6], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#b9c9d4" }}>
      <Plane cam={cam} depth={0.3} blur={14}>
        <Svg>
          <rect x={-300} y={-200} width={1680} height={2400} fill="#c9d6de" />
          <circle cx={800} cy={400} r={320} fill="#fff4dc" opacity={0.6} />
        </Svg>
      </Plane>
      <Rays x={800} y={400} strength={0.2} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,236,196,0.85)">
          <BabyClose cold={cold} layer={layer} t={t} />
        </Subject>
      </Plane>
      <Particles seed={1824} n={10} col="#fff6e0" fall={4} bokeh />
      <Grade sunX={800} sunY={400} warm="255,232,196" cool="20,40,70" vignette={0.5} />
      <Chip text="The rule" t={t} t0={7.25} x={60} y={200} icon="none" big />
      <Chip text="One more layer than you" t={t} t0={7.8} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP from behind: Mia checks the back of the baby's neck (9.1 - 11.4) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.3), rot: hh.rot };
  const reach = at(t, [9.3, 9.9], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#8fa3b1" }}>
      <Plane cam={cam} depth={0.4} blur={14}>
        <Svg>
          <rect x={-300} y={-200} width={1680} height={2400} fill="#a7b9c5" />
          <circle cx={300} cy={500} r={340} fill="#ffffff" opacity={0.35} />
          {[60, 420, 880].map((x, i) => (
            <rect key={i} x={x} y={300} width={70} height={1300} fill="#56635c" opacity={0.6} />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,236,196,0.8)">
          <Svg>
            <g transform="translate(540,960)">
              {/* carrier top edge */}
              <rect x={-420} y={330} width={840} height={800} rx={120} fill="#3a4a5a" />
              <rect x={-420} y={330} width={840} height={80} rx={40} fill="#2c3946" />
              {/* warm suit shoulders and collar */}
              <ellipse cx={0} cy={360} rx={330} ry={150} fill={SUIT} />
              <rect x={-120} y={170} width={240} height={160} rx={60} fill={BABY_SKIN} />
              <path d="M-150,250 Q0,300 150,250 L150,320 Q0,350 -150,320 Z" fill="#234e8f" />
              {/* back of the head with the warm hat */}
              <circle cx={0} cy={-40} r={230} fill={BABY_SKIN} />
              <ellipse cx={-226} cy={-20} rx={34} ry={50} fill={BABY_SHADE} />
              <ellipse cx={226} cy={-20} rx={34} ry={50} fill={BABY_SHADE} />
              <path d="M-246,-30 Q-236,-300 0,-310 Q236,-300 246,-30 Q0,-80 -246,-30 Z" fill={HAT_WARM} />
              <rect x={-250} y={-74} width={500} height={60} rx={28} fill="#9B4E20" />
              <circle cx={0} cy={-322} r={60} fill="#f3e6cf" />
              {/* Mia's hand: two fingers slide under the collar to the back of the neck */}
              <g transform={`translate(${mix(560, 60, reach)},${mix(320, 200, reach)}) rotate(-20)`}>
                <rect x={0} y={-30} width={420} height={140} rx={60} fill={MIA.jacket} />
                <ellipse cx={0} cy={40} rx={90} ry={70} fill={MIA.skin} />
                <rect x={-150} y={0} width={170} height={40} rx={20} fill={MIA.skin} />
                <rect x={-140} y={46} width={160} height={38} rx={19} fill={MIA.skinShade} />
              </g>
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1825} n={10} col="#ffffff" fall={5} bokeh />
      <Grade sunX={300} sunY={500} warm="255,232,196" cool="20,40,70" vignette={0.55} />
      <Chip text="Check the back of the neck" t={t} t0={9.6} x={60} y={200} icon="check" big />
      <Chip text="Often" t={t} t0={10.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/hiking-with-babies-toddlers-guide.jpg"
      photoH={800}
      spec="24 PRINTABLE PAGES · BIRTH TO ABOUT AGE 4"
      name={
        <>
          Hiking With
          <br />
          Babies & Toddlers
        </>
      }
      nameSize={86}
      price="$7.99"
      save="Save this before your family hike"
    />
  );
};

export const V182: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.03} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={1.95} to={5.2} fadeIn={0.06} fadeOut={0.1}>
      <S2 off={1.95} />
    </Scene>
    <Scene from={5.1} to={7.2} fadeIn={0.06} fadeOut={0.1}>
      <S3 off={5.1} />
    </Scene>
    <Scene from={7.1} to={9.2} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={7.1} />
    </Scene>
    <Scene from={9.1} to={11.4} fadeIn={0.06} fadeOut={0.12}>
      <S5 off={9.1} />
    </Scene>
    <Scene from={11.3} to={16.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 1.95, 1600],
        [1.95, 5.1, 1600],
        [5.1, 7.1, 1600],
        [7.1, 9.1, 1600],
        [9.1, 11.3, 1600],
      ]}
    />
  </AbsoluteFill>
);
