// V70: "His gift sat in a drawer all year" in the cinematic C01 style. Launch video 1 for the Hike Together Gift Coupons (p07).
// Product facts from the live Shopify listing: 44 coupons (sunrise hike, I drive to the trailhead, I carry the snacks), plan-the-hike page
// with turnaround time and weather check, 20 pages, $5.99. No Black Friday wording, no other prices.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Pine, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import { Coupon, Dresser, GadgetBox, Mug, PlanPage, Room, WindowView } from "../home";
import vo from "../vo/v70.json";

const words = vo.words as unknown as Word[];

const WINTER: Sky = { top: "#3f6e9c", mid: "#a9c3d8", low: "#f1ece4", sun: [800, 560], sunR: 46, sunCol: "#fffdf2", glow: "#f6e8d2" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 640], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

// Indoors: sweaters, no packs. Short hair = cap in the hair colour.
const LEO: Outfit = { ...JAKE, hair: "#3a2418", cap: "#3a2418", capShade: "#2a1a10", beard: "#3a2418", jacket: "#3E5F4B", jacketShade: "#2E4A39", pants: "#3f444b", pantsShade: "#2e3238", glove: null };
const SIS: Outfit = {
  ...GUIDE,
  skin: "#F0C6A8",
  skinShade: "#D6A888",
  hair: "#b5653a",
  ponytail: "#b5653a",
  beard: null,
  cap: "#b5653a",
  capShade: "#93502c",
  jacket: "#C9B48E",
  jacketShade: "#A8946E",
  pants: "#4a5560",
  pantsShade: "#38414a",
  glove: null,
};
// Outdoors in January: warm jackets, beanies, packs.
const LEO_W: Outfit = { ...LEO, jacket: "#C2662E", jacketShade: "#9B4E20", cap: "#2C3B2E", capShade: "#1B2620", pack: "#3E4F5C", packShade: "#2C3943", boot: "#5a3e2a", sole: "#1d1916", glove: "#2C3B2E" };
const SIS_W: Outfit = { ...SIS, jacket: "#5E8FA8", jacketShade: "#4A7389", cap: "#B83A55", capShade: "#8E2B42", pack: "#6E8B3D", packShade: "#566E2F", boot: "#5a3e2a", sole: "#1d1916", glove: "#B83A55" };

const SNOW = "#f3f6f8";
const LAMP = "255,200,140";

const SnowPines: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 8 }, (_, i) => {
      const x = ((((-100 + i * 240 - shift) % 1920) + 1920) % 1920) - 300;
      const h = 380 + (i % 3) * 90;
      return (
        <g key={i}>
          <Pine x={x} y={y + (i % 2) * 20} h={h} c="#2f5446" c2="#24443a" />
          {[0, 1, 2].map((k) => {
            const w = h * (0.38 - k * 0.09);
            const ty = y - h * 0.15 - k * h * 0.24;
            return <path key={k} d={`M${x - w * 0.8},${ty - 4} Q${x - w * 0.2},${ty - h * 0.06} ${x + w * 0.3},${ty - 6} L${x + w * 0.1},${ty} Z`} fill={SNOW} opacity={0.9} />;
          })}
        </g>
      );
    })}
  </Svg>
);

const WinterBackdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; y: number; blur?: number; t: number }> = ({ cam, sky, uid, y, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#ffffff" seed={5} drift={t * 12} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.14} blur={2.5 + blur}>
      <Ridge seed={13} base={y - 300} amp={360} scale={240} col="#aab7c6" lit="#ffffff" peak={140} />
    </Plane>
    <Haze y={y - 440} h={360} col={sky.low} opacity={0.7} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={29} base={y - 110} amp={220} scale={170} col="#7d8f9a" lit="#eef3f6" />
    </Plane>
    <Haze y={y - 200} h={240} col={sky.low} opacity={0.4} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <SnowPines y={y + 10} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const SnowGround: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y - 30} Q540,${y - 60} 1480,${y - 30} L1480,2600 L-400,2600 Z`} fill="#eef2f4" />
    <path d={`M-400,${y + 10} Q540,${y - 6} 1480,${y + 10} L1480,${y + 80} Q540,${y + 64} -400,${y + 80} Z`} fill="#d6dfe6" />
    {Array.from({ length: 10 }, (_, i) => (
      <ellipse key={i} cx={-260 + i * 190} cy={y + 180 + (i % 3) * 70} rx={80} ry={10} fill="#d3dce3" />
    ))}
  </Svg>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Wood table top filling the lower frame (close-ups).
const Table: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y} width={1880} height={1600} fill="#a5764f" />
    {Array.from({ length: 12 }, (_, i) => (
      <path key={i} d={`M-400,${y + 40 + i * 110} Q300,${y + 20 + i * 110} 1480,${y + 50 + i * 110}`} stroke="rgba(80,50,30,0.25)" strokeWidth={4} fill="none" />
    ))}
    <rect x={-400} y={y} width={1880} height={16} fill="rgba(255,240,220,0.25)" />
  </Svg>
);

// ============ S1 HOOK CLOSE-UP: the boxed gadget at the back of the drawer (0 - 3.98) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.12, t / 4), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.5} blur={7}>
        <WindowView x={600} y={260} w={420} h={700} sky={WINTER} uid="a" />
        <Room floorY={1800} win={[600, 260, 420, 700]} lamp={[200, 400]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Dresser x={90} y={1150} w={900} h={760} open={1}>
          <GadgetBox x={330} y={1222} w={250} h={290} col="#B5553A" dust={1} rot={-2} />
          <GadgetBox x={620} y={1222} w={210} h={230} col="#3E5F7A" rot={3} dust={1} />
          <GadgetBox x={850} y={1222} w={150} h={190} col="#6E8B3D" dust={1} />
        </Dresser>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="left" />
      </Plane>
      <Rays x={820} y={500} strength={0.14} col="255,236,200" />
      <Particles seed={70} n={26} col="#ffe8c0" fall={8} />
      <Grade sunX={820} sunY={500} warm={LAMP} cool="40,40,60" vignette={0.6} />
      <Title text={"His gift sat\nin a drawer\nall year"} t={t} t0={0} top={140} size={124} />
      <Chip text="Another hiking gadget" t={t} t0={2.5} x={80} y={560} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE: the room, the drawer, his sister at the window (3.98 - 7.42) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: lt * 18 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.45), rot: hh.rot };
  const floorY = 1480;
  const p: HikerProps = { x: 560, y: floorY, scale: 2.0, walk: 0, lean: 0.03, poles: false, handOverride: [26, 36], breathe: Math.sin(t * 2) * 2 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.85} blur={1.5}>
        <WindowView x={600} y={380} w={400} h={600} sky={WINTER} uid="b" />
        <Room floorY={floorY} win={[600, 380, 400, 600]} lamp={[160, 500]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Dresser x={20} y={1100} w={360} h={380} open={1}>
          <GadgetBox x={110} y={1129} w={90} h={100} col="#B5553A" dust={1} />
          <GadgetBox x={210} y={1129} w={80} h={84} col="#3E5F7A" dust={1} />
          <GadgetBox x={300} y={1129} w={64} h={70} col="#6E8B3D" dust={1} />
        </Dresser>
        <Subject rimX={5} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={SIS} expression="neutral" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={200} />
      </Plane>
      <Rays x={800} y={600} strength={0.12} col="255,236,200" />
      <Particles seed={71} n={18} col="#ffe8c0" fall={8} />
      <Grade sunX={800} sunY={600} warm={LAMP} cool="40,40,60" />
      <Chip text="Every January" t={t} t0={4.1} x={80} y={220} />
      <Chip text="Still in the box" t={t} t0={6.4} x={80} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: she looks out at the snowy peaks (7.42 - 10.07) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.65), rot: hh.rot };
  const p: HikerProps = { x: 430, y: 1380 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.02, poles: false, handOverride: [26, 36], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.6} blur={6}>
        <WindowView x={140} y={160} w={900} h={1100} sky={WINTER} uid="c" />
        <Room floorY={1900} win={[140, 160, 900, 1100]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={7} col="rgba(255,240,215,0.9)">
          <Person {...p} outfit={SIS} expression="neutral" noPack />
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.16} />
      <Particles seed={72} n={14} col="#ffffff" fall={10} />
      <Grade sunX={800} sunY={560} warm="250,235,215" cool="40,50,70" vignette={0.55} />
      <Chip text="What she wanted" t={t} t0={7.55} x={80} y={1130} />
      <Chip text="Time on the trail, together" t={t} t0={8.4} x={80} y={1240} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: Leo with a coupon, the fix (10.07 - 12.62) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 12 + hh.x, y: at(lt, [0, 2.2], [-60, 0]) + hh.y, zoom: at(lt, [0, 2.4], [1.12, 1.03]), rot: hh.rot };
  const floorY = 1540;
  const p: HikerProps = { x: 470, y: floorY, scale: 2.3, walk: 0, lean: 0.04, poles: false, handOverride: [76, -40], breathe: Math.sin(t * 2.2) * 2 };
  const g = hikerGeometry(p);
  const hand = g.arms[1].hand;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={3}>
        <WindowView x={560} y={300} w={460} h={680} sky={WINTER} uid="d" />
        <Room floorY={floorY} win={[560, 300, 460, 680]} lamp={[200, 600]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,236,200,0.85)">
          <Person {...p} outfit={LEO} expression="happy" noPack />
          <g transform={hikerTransform(p)}>
            <Coupon x={hand[0] + 46} y={hand[1] - 20} w={120} rot={-10} title="HIKE TOGETHER" lines={["Sunrise hike"]} k={1} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#24402e" side="left" top={300} />
      </Plane>
      <Rays x={820} y={560} strength={0.14} col="255,236,200" />
      <Particles seed={73} n={16} col="#ffe8c0" fall={8} />
      <Grade sunX={820} sunY={560} warm={LAMP} cool="40,40,60" />
      <Title text={"Give a hike,\nnot a thing."} t={t} t0={off + 0.1} top={170} size={146} />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: writing the coupon (12.62 - 16.62) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 4), rot: hh.rot };
  const k = at(t, [13.8, 14.3], [0, 1]) + at(t, [14.75, 15.05], [0, 1]) + at(t, [15.1, 16.0], [0, 1]);
  const line = Math.min(2, Math.floor(k));
  const v = k >= 3 ? 1 : k - line;
  const w = 880;
  const h = w * 0.62;
  const lens = [w * 0.62, w * 0.3, w * 0.68][line];
  const penX = 540 - w / 2 + 64 + lens * v;
  const penY = 1050 - h / 2 + h * 0.4 + line * h * 0.17 - 8;
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.5} blur={10}>
        <WindowView x={500} y={0} w={560} h={640} sky={WINTER} uid="e" />
        <Room floorY={1900} win={[500, 0, 560, 640]} lamp={[150, 300]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Table y={700} />
        <Svg>
          <Mug x={900} y={760} s={0.9} t={t} />
          <g transform="rotate(-3 540 1050)">
            <Coupon x={540} y={1050} w={w} title="HIKE TOGETHER COUPON" lines={["Sunrise hike", "I drive", "I carry the snacks"]} k={k} />
          </g>
          {/* pen in a hand */}
          <g transform={`translate(${penX},${penY}) rotate(35)`}>
            <rect x={-8} y={-240} width={22} height={240} rx={8} fill="#1d2226" />
            <path d="M-8,0 L14,0 L3,26 Z" fill="#c9b48e" />
            <ellipse cx={30} cy={-170} rx={70} ry={52} fill={LEO.skin} stroke="rgba(0,0,0,0.15)" strokeWidth={3} />
            <rect x={40} y={-300} width={130} height={260} rx={50} fill={LEO.jacket} />
          </g>
        </Svg>
      </Plane>
      <Particles seed={74} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={300} warm={LAMP} cool="40,40,60" vignette={0.55} />
      <Chip text="Write a coupon" t={t} t0={12.75} x={80} y={230} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: plan it together (16.62 - 21.12) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: lt * -8 + hh.y, zoom: mix(1.0, 1.06, lt / 4.5), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.5} blur={10}>
        <Room floorY={1900} win={[600, -200, 500, 500]} lamp={[300, 200]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Table y={340} />
        <Svg>
          <g transform="rotate(2 540 820)">
            <PlanPage
              x={120}
              y={400}
              w={840}
              rows={[
                ["Trail", "Picked together"],
                ["Turnaround time", "Set before we start"],
                ["Weather", "Checked that morning"],
              ]}
              t={t}
              t0={18.1}
              gap={0.95}
            />
          </g>
        </Svg>
      </Plane>
      <Particles seed={75} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={700} sunY={200} warm={LAMP} cool="40,40,60" vignette={0.5} />
      <Chip text="Plan it together" t={t} t0={16.8} x={80} y={230} big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF: January, on the trail together at sunrise (21.12 - 23.95) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 34 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.04]), rot: hh.rot };
  const g = 1430;
  const ph = lt * 3.4;
  const a: HikerProps = { x: 300 + lt * 60, y: g, scale: 1.7, phase: ph, walk: 0.75, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.75) };
  const b: HikerProps = { x: 610 + lt * 60, y: g + 20, scale: 1.75, phase: ph + 1.4, walk: 0.75, lean: 0.08, poles: false, handOverride: freeHand(ph + 1.4, 0.75) };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={GOLD} uid="g" y={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Subject rimX={-5}>
          <Person {...a} outfit={SIS_W} expression="happy" />
          <Person {...b} outfit={LEO_W} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24443a" side="right" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={76} n={24} col="#ffffff" fall={20} />
      <Grade sunX={760} sunY={640} warm="255,190,120" />
      <Chip text="January. Together." t={t} t0={21.3} x={80} y={240} icon="check" big />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/hike-together-gift-coupons-printable-trail-experience-gift-set.jpg"
      cutoutH={800}
      spec="PRINTABLE · 44 COUPONS · PRINT AT HOME"
      name={
        <>
          Hike Together
          <br />
          Gift Coupons
        </>
      }
      nameSize={100}
      price="$5.99"
      save="Save this for your gift list"
    />
  );
};

export const V70: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.03} fadeIn={0} fadeOut={0.1}>
      <S1 />
    </Scene>
    <Scene from={3.98} to={7.47} fadeIn={0.08} fadeOut={0.08}>
      <S2 off={3.98} />
    </Scene>
    <Scene from={7.42} to={10.12} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={7.42} />
    </Scene>
    <Scene from={10.07} to={12.67} fadeIn={0.1} fadeOut={0.08}>
      <S4 off={10.07} />
    </Scene>
    <Scene from={12.62} to={16.67} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.62} />
    </Scene>
    <Scene from={16.62} to={21.17} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={16.62} />
    </Scene>
    <Scene from={21.12} to={24.0} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={21.12} />
    </Scene>
    <Scene from={23.75} to={28.5} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.0, 1560],
        [4.0, 7.44, 1560],
        [7.44, 10.09, 1560],
        [10.09, 12.64, 1560],
        [12.64, 16.64, 1560],
        [16.64, 21.14, 1560],
        [21.14, 23.75, 1560],
      ]}
    />
  </AbsoluteFill>
);
