// V67: "He left his spare bottle in the car" in the cinematic C01 style, cold November day hike.
// End card = Collapsible Silicone Water Bottle 20 oz (600 ml), real Shopify photo. Facts from the product page: 600 ml, folds to about 4.3 x 3.7 in.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, Bottle, Breath, CLEAR, FALL, GOLD, OVERCAST, Subject, Sweat, Trail } from "../fall";
import vo from "../vo/v67.json";

const words = vo.words as unknown as Word[];

const NATE: Outfit = { ...JAKE, skin: "#C98E6E", skinShade: "#AA7254", hair: "#2a1d15", beard: "#2a1d15", jacket: "#3E5F7A", jacketShade: "#2E475C", cap: "#B83A55", capShade: "#8E2B42", pack: "#5B6B3A", packShade: "#46542C", glove: null };
const LEAVES = FALL;
const BLUE = "#6cc0cf";
const BLUE2 = "#4fa3b3";

// Collapsible bottle, local units, base at (0,0). squash 0 = full, 1 = folded flat puck.
const Soft: React.FC<{ x: number; y: number; s?: number; rot?: number; squash?: number }> = ({ x, y, s = 1, rot = 0, squash = 0 }) => {
  const h = mix(300, 70, squash);
  const w = mix(110, 150, squash);
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      <path d={`M${-w / 2},0 L${-w / 2},${-h * 0.7} Q${-w / 2 - 8},${-h * 0.85} ${-w / 2 + 10},${-h} L${w / 2 - 10},${-h} Q${w / 2 + 8},${-h * 0.85} ${w / 2},${-h * 0.7} L${w / 2},0 Z`} fill={BLUE} stroke="rgba(0,0,0,0.22)" strokeWidth={3} />
      {squash < 0.6 ? (
        <path d={`M${-w / 2},${-h * 0.75} L0,${-h * 0.5} L${w / 2},${-h * 0.75} M${-w / 2},${-h * 0.25} L0,${-h * 0.5} L${w / 2},${-h * 0.25} M0,${-h * 0.5} L0,${-h * 0.95}`} stroke={BLUE2} strokeWidth={4} fill="none" opacity={1 - squash} />
      ) : (
        [0.25, 0.5, 0.75].map((k) => <line key={k} x1={-w / 2} y1={-h * k} x2={w / 2} y2={-h * k} stroke={BLUE2} strokeWidth={5} />)
      )}
      <rect x={-w / 2 + 4} y={-h - 26} width={w - 8} height={30} rx={8} fill={BLUE} stroke="rgba(0,0,0,0.22)" strokeWidth={3} />
      <rect x={-22} y={-h - 60} width={44} height={36} rx={8} fill={BLUE2} />
      <rect x={-w / 2 + 14} y={-h * 0.9} width={12} height={h * 0.6} rx={6} fill="rgba(255,255,255,0.28)" />
    </g>
  );
};

// Overstuffed daypack behind the body with a fleece sleeve hanging out.
const StuffedPack: React.FC<{ p: HikerProps }> = ({ p }) => {
  const g = hikerGeometry(p);
  const n = [Math.cos(g.lean), Math.sin(g.lean)];
  const cx = (g.sh[0] + g.hip[0]) / 2 - n[0] * 46;
  const cy = (g.sh[1] + g.hip[1]) / 2 - n[1] * 46 - 6;
  const deg = (g.lean * 180) / Math.PI;
  return (
    <g transform={`${hikerTransform(p)} translate(${cx},${cy}) rotate(${deg})`}>
      <rect x={-60} y={-90} width={98} height={164} rx={40} fill={NATE.pack} stroke="rgba(0,0,0,0.3)" strokeWidth={2} />
      <rect x={-60} y={-90} width={30} height={164} rx={18} fill={NATE.packShade} />
      <path d="M-50,-92 Q-10,-130 30,-96 Z" fill="#B83A55" />
      <path d="M-56,-60 q-30,30 -18,70" stroke="#C2662E" strokeWidth={22} fill="none" strokeLinecap="round" />
    </g>
  );
};

// Bottle held up to the mouth, upside-down.
const Drink: React.FC<{ p: HikerProps; tip: number }> = ({ p, tip }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] + 4},${h[1] + 6}) rotate(${mix(-150, -200, tip)})`}>
        <Bottle x={0} y={30} s={0.3} col="#3f8fb0" />
      </g>
    </g>
  );
};

// ============ S1 HOOK: walking away from the car, spare bottle left on the roof (0 - 4.4) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: t * 26 + hh.x, y: hh.y, zoom: mix(1.03, 1.1, t / 4.4), rot: hh.rot };
  const g = 1420;
  const ph = t * 3.4;
  const p: HikerProps = { x: 560 + t * 40, y: g + 30, scale: 2.0, phase: ph, walk: 0.8, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.8) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="a" treeY={g - 150} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} grass="#7d7a52" />
        <Subject>
          <Car x={60} y={g + 70} s={3.2} body="#8c97a2" shade="#6f7a85" />
          <Bottle x={150} y={g + 70 - 124 * 3.2 + 4} s={0.6} col="#3f8fb0" />
          <StuffedPack p={p} />
          <Person {...p} outfit={NATE} expression="happy" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="right" />
      </Plane>
      <Particles seed={71} n={14} col="#fff3d6" leaves={LEAVES} fall={50} />
      <Grade sunX={760} sunY={640} warm="240,224,200" cool="30,50,70" />
      <Title text={"He left his\nspare bottle\nin the car"} t={t} t0={0} top={140} size={132} />
      <Chip text="Pack: stuffed with layers" t={t} t0={1.0} x={80} y={600} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the spare bottle behind the car window (4.4 - 6.5) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 2.1), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="b" treeY={1100} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-100} y={560} width={1300} height={1500} rx={60} fill="#8c97a2" />
          <rect x={-100} y={1350} width={1300} height={700} fill="#6f7a85" />
          <path d="M60,640 L1020,640 L1020,1260 L60,1260 Z" fill="#2c3238" />
          {/* seat */}
          <path d="M120,1260 L120,860 Q130,780 220,780 L560,780 Q640,790 640,880 L640,1260 Z" fill="#3d444b" />
          <path d="M600,1260 L600,1060 L980,1060 L980,1260 Z" fill="#454d55" />
          <g transform="translate(780,1080)">
            <Bottle x={0} y={0} s={1.3} col="#3f8fb0" />
          </g>
          <path d="M60,640 L1020,640 L1020,1260 L60,1260 Z" fill="#cfe3ee" opacity={0.16} />
          <path d={`M${200 + lt * 80},640 L${420 + lt * 80},640 L${180 + lt * 80},1260 L${-40 + lt * 80},1260 Z`} fill="#ffffff" opacity={0.12} />
          <rect x={60} y={1300} width={140} height={26} rx={10} fill="#56616b" />
        </Svg>
      </Plane>
      <Grade sunX={760} sunY={640} warm="240,224,200" vignette={0.6} />
      <Chip text="Spare bottle" t={t} t0={4.5} x={80} y={240} />
      <Chip text="Left in the car" t={t} t0={5.1} x={80} y={350} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 PROBLEM: the last climb, the only bottle is empty (6.5 - 9.75) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [8.0, 8.15, 8.7], [0, 1, 0]);
  const hh = handheld(t, 0.8, shake);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.06, 1.14, lt / 3.25), rot: hh.rot - 1.5 };
  const g = 1440;
  const tip = at(t, [6.8, 7.8], [0, 1]);
  const p: HikerProps = { x: 420, y: g + 182 * 2.4 - 150, scale: 2.4, walk: 0, lean: -0.08, poles: false, handOverride: [40, -150], slope: 0.12, breathe: Math.sin(t * 4) * 3 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="c" treeY={g - 120} blur={3} t={t} far="#7d8597" mid="#4f5a4c" />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} tilt={0.12} grass="#7d7a52" />
        <Subject rimX={-4}>
          <StuffedPack p={p} />
          <Person {...p} outfit={NATE} expression="tired" />
          <Drink p={p} tip={tip} />
          <Sweat p={p} t={t} on={at(t, [7.6, 8.0], [0, 1])} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={12}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Particles seed={73} n={12} col="#fff3d6" leaves={LEAVES} fall={60} />
      <Grade sunX={760} sunY={640} warm="235,220,200" cool="30,50,70" vignette={0.62} />
      <Chip text="The last climb" t={t} t0={6.6} x={80} y={240} />
      <Chip text="Bottle: empty" t={t} t0={8.0} x={80} y={350} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 FIX title (9.75 - 12.45) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 14 + hh.x, y: at(lt, [0, 2.7], [-90, 0]) + hh.y, zoom: at(lt, [0, 2.7], [1.14, 1.03]), rot: hh.rot };
  const g = 1450;
  const p: HikerProps = { x: 640, y: g + 40, scale: 1.5, walk: 0, lean: 0.04, poles: false, handOverride: [60, -30], breathe: Math.sin(t * 2.3) * 2 };
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 30} />
        <Subject>
          <StuffedPack p={p} />
          <Person {...p} outfit={NATE} expression="happy" />
          <g transform={hikerTransform(p)}>
            <Soft x={h[0] + 6} y={h[1] + 40} s={0.32} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.22} />
      <Particles seed={74} n={16} col="#fff3d6" leaves={LEAVES} fall={50} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Title text={"Carry a\ncollapsible\nbottle."} t={t} t0={off + 0.15} top={170} size={150} />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: it holds 600 ml (12.45 - 14.47) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2), rot: hh.rot };
  const fill = at(t, [12.6, 13.6], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={1200} blur={12} t={t} />
      <Plane cam={cam} depth={0.9} blur={6}>
        <Trail y={1300} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <ellipse cx={540} cy={1400} rx={260} ry={30} fill="rgba(0,0,0,0.25)" />
          <Soft x={540} y={1400} s={2.2} />
          <defs>
            <clipPath id="fill67">
              <rect x={540 - 121} y={1400 - 300 * 2.2 * fill * 0.9} width={242} height={300 * 2.2 * fill * 0.9} />
            </clipPath>
          </defs>
          <g clipPath="url(#fill67)" opacity={0.35}>
            <rect x={540 - 121} y={1400 - 660} width={242} height={660} fill="#1f6f9a" />
          </g>
        </Svg>
      </Plane>
      <Grade sunX={790} sunY={560} warm="255,214,160" vignette={0.5} />
      <Readout label="HOLDS" value="20 OZ / 600 ML" ok={true} t={t} t0={12.55} x={80} y={220} pulseAt={13.6} />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: squash it flat into the hip-belt pocket (14.47 - 18.0) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 3.5), rot: hh.rot };
  const sq = at(t, [14.8, 15.8], [0, 1], outExpo);
  const slide = at(t, [16.3, 17.1], [0, 1], outExpo);
  const bx = mix(540, 560, slide);
  const by = mix(1180, 1430, slide);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={1100} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* jacket and hip belt, close */}
          <rect x={-100} y={900} width={1300} height={1200} fill={NATE.jacket} />
          <rect x={-100} y={900} width={260} height={1200} fill={NATE.jacketShade} />
          <line x1={600} y1={900} x2={600} y2={1340} stroke={NATE.jacketShade} strokeWidth={10} />
          <rect x={590} y={1000} width={20} height={44} rx={5} fill="#c9b48e" />
          <path d="M200,1000 q80,120 40,300 M960,980 q-60,140 -20,320" stroke={NATE.jacketShade} strokeWidth={8} fill="none" opacity={0.7} />
          <rect x={-100} y={1330} width={1300} height={240} rx={30} fill="#3b3f36" />
          <rect x={900} y={1380} width={180} height={120} rx={16} fill="#1f2320" />
          <rect x={940} y={1400} width={100} height={80} rx={10} fill="#2c3330" />
          <rect x={300} y={1300} width={520} height={260} rx={36} fill="#4d5345" stroke="rgba(0,0,0,0.3)" strokeWidth={4} />
          <path d="M320,1320 L800,1320" stroke="#c9b48e" strokeWidth={8} strokeLinecap="round" />
          <rect x={780} y={1306} width={28} height={40} rx={6} fill="#c9b48e" />
          {/* bottle, squashing then going in */}
          <g transform={`translate(${bx},${by})`} opacity={slide > 0.95 ? 0 : 1}>
            <Soft x={0} y={0} s={1.5} squash={sq} />
          </g>
          {/* pocket front, drawn over the bottle */}
          <rect x={300} y={1340} width={520} height={220} rx={36} fill="#4d5345" opacity={slide > 0.3 ? 1 : 0} />
          <path d={`M320,1340 Q560,${1340 - 30 * slide} 800,1340`} stroke="#3a3f33" strokeWidth={6} fill="none" opacity={slide} />
          {/* hands */}
          <ellipse cx={bx - 170} cy={by - 60} rx={70} ry={90} fill={NATE.skin} stroke="rgba(0,0,0,0.2)" strokeWidth={3} opacity={slide > 0.95 ? 0 : 1} />
          <ellipse cx={bx + 170} cy={by - 60} rx={70} ry={90} fill={NATE.skin} stroke="rgba(0,0,0,0.2)" strokeWidth={3} opacity={slide > 0.95 ? 0 : 1} />
        </Svg>
      </Plane>
      <Particles seed={76} n={10} col="#fff3d6" leaves={LEAVES} fall={40} />
      <Grade sunX={790} sunY={560} warm="255,214,160" vignette={0.5} />
      <Chip text="Empty? Squash it flat" t={t} t0={14.6} x={80} y={220} icon="check" big />
      <Chip text="Folded: about 4.3 x 3.7 in" t={t} t0={15.6} x={80} y={350} />
      <Chip text="Into the hip-belt pocket" t={t} t0={16.4} x={80} y={450} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF: layers and extra water (18.0 - 21.45) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 34 + hh.x, y: -lt * 8 + hh.y, zoom: at(lt, [0, 1.4], [1.16, 1.05], outExpo), rot: hh.rot - 1 };
  const g = 1440;
  const ph = lt * 3.8;
  const p: HikerProps = { x: 380 + lt * 40, y: g + 182 * 2.2 - 140, scale: 2.2, phase: ph, walk: 0.9, lean: 0.14, poles: false, handOverride: freeHand(ph, 0.9), slope: 0.1 };
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="g" treeY={g - 110} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} tilt={0.1} grass="#8a7a48" />
        <Subject rimX={6}>
          <StuffedPack p={p} />
          <Person {...p} outfit={NATE} expression="happy" />
          <g transform={hikerTransform(p)}>
            <Soft x={h[0] + 4} y={h[1] + 34} s={0.3} />
          </g>
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={77} n={22} col="#ffe7b8" leaves={LEAVES} />
      <Grade sunX={740} sunY={660} warm="255,180,100" />
      <Chip text="Warm layers" t={t} t0={18.2} x={80} y={240} icon="check" big />
      <Chip text="Extra water" t={t} t0={19.2} x={80} y={370} icon="check" big />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/collapsible-silicone-water-bottle-600ml.jpg"
      photoH={800}
      spec="20 OZ / 600 ML · FOLDS FLAT · BPA-FREE"
      name={
        <>
          Collapsible
          <br />
          Water Bottle
        </>
      }
      nameSize={104}
      price="$14.99"
      save="Save this before your next cold hike"
    />
  );
};

export const V67: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.45} fadeIn={0} fadeOut={0.1}>
      <S1 />
    </Scene>
    <Scene from={4.4} to={6.55} fadeIn={0.08} fadeOut={0.08}>
      <S2 off={4.4} />
    </Scene>
    <Scene from={6.5} to={9.8} fadeIn={0.08} fadeOut={0.1}>
      <S3 off={6.5} />
    </Scene>
    <Scene from={9.75} to={12.5} fadeIn={0.12} fadeOut={0.1}>
      <S4 off={9.75} />
    </Scene>
    <Scene from={12.45} to={14.52} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.45} />
    </Scene>
    <Scene from={14.47} to={18.05} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={14.47} />
    </Scene>
    <Scene from={18.0} to={21.6} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={18.0} />
    </Scene>
    <Scene from={21.35} to={27} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.42, 1560],
        [4.42, 6.52, 1560],
        [6.52, 9.77, 1560],
        [9.77, 12.47, 1560],
        [12.47, 14.49, 1560],
        [14.49, 18.02, 1560],
        [18.02, 21.35, 1560],
      ]}
    />
  </AbsoluteFill>
);
