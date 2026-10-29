// V64: "The bison was closer than it looked" in the cinematic C01 style, Yellowstone in autumn. End card = Yellowstone & Grand Teton guide (digital).
// Distances exactly as NPS Yellowstone gives them: 25 yards (23 m) from bison and elk, 100 yards (91 m) from bears and wolves.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Backdrop, CLEAR, GOLD, OVERCAST, Subject, Trail } from "../fall";
import vo from "../vo/v64.json";

const words = vo.words as unknown as Word[];

const JAKE2: Outfit = { ...JAKE, jacket: "#C2662E", jacketShade: "#9B4E20", cap: "#2C3B2E", capShade: "#1B2620" };
const GRASS = "#a3954f";
const DIRT = "#a3954f";

// Bison, side view facing left. (x, y) = ground under the middle. head 0 = grazing, 1 = head up.
const Bison: React.FC<{ x: number; y: number; s?: number; head?: number; t: number; snort?: number }> = ({ x, y, s = 1, head = 0, t, snort = 0 }) => {
  const tail = Math.sin(t * 3) * 12;
  const rot = mix(38, -4, head);
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <ellipse cx={0} cy={6} rx={300} ry={22} fill="rgba(0,0,0,0.22)" />
      {/* far legs */}
      <rect x={-190} y={-170} width={40} height={170} rx={14} fill="#2a1c12" />
      <rect x={150} y={-150} width={40} height={150} rx={14} fill="#2a1c12" />
      {/* tail */}
      <path d={`M300,-250 q30,40 ${20 + tail},110`} stroke="#2a1c12" strokeWidth={12} fill="none" strokeLinecap="round" />
      <ellipse cx={322 + tail} cy={-136} rx={12} ry={22} fill="#2a1c12" />
      {/* hindquarters */}
      <ellipse cx={150} cy={-230} rx={170} ry={120} fill="#5a3d27" />
      <ellipse cx={170} cy={-200} rx={130} ry={80} fill="#4a3220" opacity={0.6} />
      {/* near legs */}
      <rect x={-120} y={-170} width={46} height={172} rx={16} fill="#3a271a" />
      <rect x={200} y={-160} width={46} height={162} rx={16} fill="#3a271a" />
      <rect x={-124} y={-12} width={54} height={14} rx={5} fill="#1a120c" />
      <rect x={196} y={-12} width={54} height={14} rx={5} fill="#1a120c" />
      {/* shaggy hump and front */}
      <path d="M-260,-200 Q-280,-420 -80,-470 Q60,-480 110,-330 Q120,-200 40,-140 L-200,-130 Q-250,-150 -260,-200 Z" fill="#7a5434" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${-230 + i * 34},${-420 + Math.abs(i - 3) * 22} q12,30 -4,58`} stroke="#5f3f25" strokeWidth={8} fill="none" strokeLinecap="round" />
      ))}
      <path d="M-200,-140 q20,60 -10,90 q40,-20 60,10 q10,-40 40,-60 Z" fill="#6a4529" />
      {/* head on a neck pivot */}
      <g transform={`translate(-230,-260) rotate(${-rot})`}>
        <path d="M-10,-40 Q-140,-80 -170,20 Q-180,110 -110,130 Q-40,140 -10,70 Z" fill="#3a2618" />
        <path d="M-60,-60 Q-120,-110 -150,-40 Q-120,-50 -90,-30 Z" fill="#5f3f25" />
        {/* horn */}
        <path d="M-80,-56 Q-90,-110 -50,-120 Q-70,-100 -64,-60 Z" fill="#e6dccb" />
        {/* beard */}
        <path d="M-120,110 Q-110,190 -70,200 Q-60,150 -40,110 Z" fill="#4a3220" />
        {/* eye */}
        <ellipse cx={-110} cy={-6} rx={11} ry={9} fill="#120c08" />
        <circle cx={-114} cy={-9} r={3.5} fill="#fff" opacity={0.6 + 0.4 * head} />
        <ellipse cx={-158} cy={90} rx={14} ry={10} fill="#1a120c" />
        {snort > 0 && (
          <g opacity={1 - snort}>
            <circle cx={-190 - snort * 80} cy={100} r={20 + snort * 40} fill="#ffffff" opacity={0.5} />
            <circle cx={-170 - snort * 50} cy={130} r={14 + snort * 30} fill="#ffffff" opacity={0.4} />
          </g>
        )}
      </g>
    </g>
  );
};

// Geothermal steam plumes on the far plain.
const Steam: React.FC<{ x: number; y: number; t: number; s?: number }> = ({ x, y, t, s = 1 }) => (
  <g>
    {Array.from({ length: 7 }, (_, i) => {
      const k = (t * 0.18 + i / 7) % 1;
      return <circle key={i} cx={x + Math.sin(k * 6 + i) * 30 * s + k * 60 * s} cy={y - k * 420 * s} r={(30 + k * 90) * s} fill="#ffffff" opacity={0.45 * (1 - k)} />;
    })}
  </g>
);

// Phone held in the near hand.
const HandPhone: React.FC<{ p: HikerProps; glow?: number }> = ({ p, glow = 0.6 }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] + 6},${h[1] - 26}) rotate(-8)`}>
        <rect x={-14} y={-26} width={28} height={50} rx={6} fill="#1d2226" />
        <rect x={-11} y={-22} width={22} height={40} rx={4} fill="#9fd0ea" opacity={glow} />
      </g>
    </g>
  );
};

// ============ S1 HOOK: walking up to a bison for a photo (0 - 3.49) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: hh.x + t * 16, y: hh.y, zoom: mix(1.02, 1.12, t / 3.49), rot: hh.rot };
  const g = 1450;
  const ph = t * 2.4;
  const p: HikerProps = { x: 230 + t * 34, y: g + 182 * 1.7 - 120, scale: 1.7, phase: ph, walk: 0.5, lean: 0.06, poles: false, handOverride: [64, -86] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="a" treeY={g - 150} blur={2} t={t} />
      <Plane cam={cam} depth={0.4} blur={2}>
        <Svg>
          <Steam x={180} y={g - 160} t={t} s={0.6} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} grass={GRASS} dirt={DIRT} />
        <Subject>
          <Bison x={800} y={g + 150} s={0.95} head={0} t={t} />
          <Person {...p} outfit={JAKE2} expression="happy" />
          <HandPhone p={p} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.14} />
      <Particles seed={31} n={16} col="#fff3d6" fall={30} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Title text={"The bison was\ncloser than\nit looked"} t={t} t0={0} top={140} size={134} />
      <Chip text="Just one photo..." t={t} t0={1.3} x={80} y={560} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: grazing, calm and slow (3.44 - 4.93) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 20 + hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.5), rot: hh.rot };
  const g = 1500;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="b" treeY={1150} blur={8} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g - 120} grass={GRASS} dirt={DIRT} />
        <Subject rimX={6}>
          <Bison x={1000} y={g + 260} s={2.1} head={0} t={t} />
        </Subject>
      </Plane>
      <Particles seed={32} n={14} col="#fff3d6" fall={20} />
      <Grade sunX={790} sunY={560} warm="255,214,160" vignette={0.55} />
      <Chip text="Looks calm. Looks slow." t={t} t0={3.55} x={80} y={240} />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: head up, staring (4.88 - 7.4) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const head = at(t, [5.0, 5.9], [0, 1]);
  const shake = at(t, [6.15, 6.3, 6.9], [0, 1, 0]);
  const hh = handheld(t, 0.8, shake);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 2.5], [1.0, 1.14]), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="c" treeY={1100} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <Bison x={1500} y={1950} s={3.1} head={head} t={t} snort={at(t, [6.2, 7.0], [0, 1])} />
        </Subject>
      </Plane>
      <Grade sunX={760} sunY={640} warm="235,220,200" cool="30,40,60" vignette={0.7} />
      <Chip text="Head up. Staring at you." t={t} t0={6.1} x={80} y={240} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4: bison are fast, too close is dangerous (7.35 - 11.09) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: -lt * 20 + hh.x, y: hh.y, zoom: mix(1.1, 1.02, lt / 3.7), rot: hh.rot };
  const g = 1460;
  const back = at(t, [8.4, 10.6], [0, 1]);
  const ph = t * 2.6;
  const p: HikerProps = { x: 420 - back * 120, y: g + 182 * 1.7 - 120, scale: 1.7, phase: ph, walk: back > 0 && back < 1 ? 0.45 : 0, lean: -0.05, poles: false, handOverride: back > 0 ? freeHand(ph, 0.3) : [60, -80] };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="d" treeY={g - 150} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} grass={GRASS} dirt={DIRT} />
        <Subject rimX={-4}>
          <Bison x={830} y={g + 150} s={0.95} head={1} t={t} snort={at(t, [7.6, 8.3], [0, 1])} />
          <Person {...p} outfit={JAKE2} expression="tired" flip={back > 0} />
          {back === 0 && <HandPhone p={p} />}
        </Subject>
      </Plane>
      <Particles seed={34} n={12} col="#fff3d6" fall={30} />
      <Grade sunX={760} sunY={640} warm="235,220,200" cool="30,40,60" vignette={0.6} />
      <Chip text="Bison are fast" t={t} t0={7.5} x={80} y={240} icon="x" />
      <Chip text="Too close = you get hurt" t={t} t0={9.0} x={80} y={340} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 FIX title (11.04 - 13.6) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 14 + hh.x, y: at(lt, [0, 2.5], [-90, 0]) + hh.y, zoom: at(lt, [0, 2.5], [1.14, 1.03]), rot: hh.rot };
  const g = 1460;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={0.4} blur={2}>
        <Svg>
          <Steam x={820} y={g - 130} t={t} s={0.7} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Trail y={g + 30} grass={GRASS} dirt={DIRT} />
        <Subject>
          <Bison x={860} y={g + 80} s={0.45} head={0} t={t} />
          <Person x={260} y={g + 120} scale={1.5} walk={0} lean={0.02} poles={false} handOverride={[40, 20]} outfit={JAKE2} expression="neutral" />
        </Subject>
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.2} />
      <Particles seed={35} n={14} col="#fff3d6" fall={30} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Title text={"Keep your\ndistance."} t={t} t0={off + 0.15} top={190} size={160} />
    </AbsoluteFill>
  );
};

// ============ S6: 25 yards from bison and elk (13.55 - 16.14) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.08, 1.0, lt / 2.6), rot: hh.rot };
  const g = 1240;
  const k = at(t, [13.7, 14.6], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={g - 150} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 30} grass={GRASS} dirt={DIRT} />
        <Subject>
          <Bison x={880} y={g + 120} s={0.42} head={0} t={t} />
          <Person x={160} y={g + 150} scale={1.25} walk={0} lean={0.02} poles={false} handOverride={[40, 20]} outfit={JAKE2} expression="happy" />
          <line x1={240} y1={g + 190} x2={240 + 470 * k} y2={g + 190} stroke="#ffffff" strokeWidth={8} strokeDasharray="24 16" strokeLinecap="round" />
          <circle cx={240} cy={g + 190} r={12} fill="#fff" />
          <circle cx={240 + 470 * k} cy={g + 190} r={12} fill="#fff" opacity={k} />
        </Subject>
      </Plane>
      <Particles seed={36} n={12} col="#fff3d6" fall={30} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Readout label="BISON AND ELK: AT LEAST" value="25 YD / 23 M" ok={true} t={t} t0={13.7} x={80} y={220} pulseAt={14.6} />
      <Chip text="Yellowstone park rule" t={t} t0={14.4} x={80} y={470} />
    </AbsoluteFill>
  );
};

// ============ S7: 100 yards from bears and wolves (16.09 - 18.55) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 24 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.5), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 330, y: g + 182 * 2.3 - 150, scale: 2.3, walk: 0, lean: 0.0, poles: false, handOverride: [40, 20], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="g" treeY={g - 40} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} grass={GRASS} dirt={DIRT} />
        <Subject rimX={5}>
          <Person {...p} outfit={JAKE2} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a3a2a" side="right" />
      </Plane>
      <Particles seed={37} n={12} col="#fff3d6" fall={30} />
      <Grade sunX={760} sunY={640} warm="240,224,200" />
      <Readout label="BEARS AND WOLVES: AT LEAST" value="100 YD / 91 M" ok={true} t={t} t0={16.2} x={80} y={220} pulseAt={17.0} />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: use your zoom (18.5 - 19.93) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.4), rot: hh.rot };
  const z = at(t, [18.7, 19.4], [0.35, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="h" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={0.9} blur={8}>
        <Trail y={1300} grass={GRASS} dirt={DIRT} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <defs>
            <clipPath id="scr64">
              <rect x={310} y={520} width={460} height={860} rx={40} />
            </clipPath>
          </defs>
          {/* hands */}
          <ellipse cx={300} cy={1240} rx={110} ry={150} fill={JAKE2.skin} stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
          <ellipse cx={780} cy={1240} rx={110} ry={150} fill={JAKE2.skin} stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
          <rect x={290} y={500} width={500} height={900} rx={56} fill="#1d2226" />
          <g clipPath="url(#scr64)">
            <rect x={310} y={520} width={460} height={860} fill="#9fc2dc" />
            <rect x={310} y={1000} width={460} height={380} fill={GRASS} />
            <g transform={`translate(540,1060) scale(${z * 0.6}) translate(-540,-1060)`}>
              <Bison x={560} y={1150} s={0.6} head={0} t={t} />
            </g>
          </g>
          <rect x={470} y={1300} width={140} height={44} rx={22} fill="rgba(0,0,0,0.5)" />
          <text x={540} y={1332} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={34} fill="#fff">
            {z > 0.95 ? "5x" : "1x"}
          </text>
          <ellipse cx={360} cy={1350} rx={60} ry={40} fill={JAKE2.skinShade} />
          <ellipse cx={720} cy={1350} rx={60} ry={40} fill={JAKE2.skinShade} />
        </Svg>
      </Plane>
      <Grade sunX={790} sunY={560} warm="255,214,160" vignette={0.5} />
      <Chip text="Use your zoom" t={t} t0={18.6} x={80} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF: the shot from a safe distance (19.88 - 22.09) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 18 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.16, 1.04], outExpo), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 300, y: g + 182 * 1.8 - 110, scale: 1.8, walk: 0, lean: 0.02, poles: false, handOverride: [64, -86], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="i" treeY={g - 120} t={t} />
      <Plane cam={cam} depth={0.4} blur={2}>
        <Svg>
          <Steam x={700} y={g - 120} t={t} s={0.6} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} grass="#b39a58" dirt="#b39a58" />
        <Subject rimX={6}>
          <Bison x={900} y={g + 90} s={0.36} head={0} t={t} />
          <Person {...p} outfit={JAKE2} expression="happy" />
          <HandPhone p={p} glow={1} />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={39} n={22} col="#ffe7b8" />
      <Grade sunX={740} sunY={660} warm="255,180,100" />
      <Chip text="Great shot. Safe distance." t={t} t0={20.1} x={80} y={240} icon="check" big />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/yellowstone-grand-teton-trip-planning-guide.jpg"
      photoH={800}
      spec="30 PAGES · 16 DAY HIKES · MI + KM"
      name={
        <>
          Yellowstone &amp;
          <br />
          Grand Teton Guide
        </>
      }
      nameSize={96}
      price="$9.99"
      save="Save this before your Yellowstone trip"
    />
  );
};

export const V64: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.49} fadeIn={0} fadeOut={0.1}>
      <S1 />
    </Scene>
    <Scene from={3.44} to={4.93} fadeIn={0.08} fadeOut={0.08}>
      <S2 off={3.44} />
    </Scene>
    <Scene from={4.88} to={7.4} fadeIn={0.08} fadeOut={0.1}>
      <S3 off={4.88} />
    </Scene>
    <Scene from={7.35} to={11.09} fadeIn={0.1} fadeOut={0.1}>
      <S4 off={7.35} />
    </Scene>
    <Scene from={11.04} to={13.6} fadeIn={0.12} fadeOut={0.1}>
      <S5 off={11.04} />
    </Scene>
    <Scene from={13.55} to={16.14} fadeIn={0.1} fadeOut={0.1}>
      <S6 off={13.55} />
    </Scene>
    <Scene from={16.09} to={18.55} fadeIn={0.1} fadeOut={0.1}>
      <S7 off={16.09} />
    </Scene>
    <Scene from={18.5} to={19.93} fadeIn={0.08} fadeOut={0.08}>
      <S8 off={18.5} />
    </Scene>
    <Scene from={19.88} to={22.09} fadeIn={0.1} fadeOut={0.12}>
      <S9 off={19.88} />
    </Scene>
    <Scene from={21.85} to={27} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.45, 1560],
        [3.45, 4.9, 1560],
        [4.9, 7.38, 1560],
        [7.38, 11.05, 1560],
        [11.05, 16.1, 1560],
        [16.1, 18.52, 1560],
        [18.52, 19.9, 1560],
        [19.9, 21.85, 1560],
      ]}
    />
  </AbsoluteFill>
);
