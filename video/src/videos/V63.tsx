// V63: "She booked a 10-miler on 3-mile legs" in the cinematic C01 style, late autumn. End card = Trail Ready training plan (digital).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays } from "../cine";
import { Backdrop, CLEAR, FALL, GOLD, OVERCAST, Subject, Sweat, Trail } from "../fall";
import vo from "../vo/v63.json";

const words = vo.words as unknown as Word[];

const MAYA: Outfit = {
  ...GUIDE,
  skin: "#E3B08E",
  skinShade: "#C99272",
  hair: "#2f2219",
  ponytail: "#2f2219",
  beard: null,
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#2F7F86",
  jacketShade: "#256870",
  pants: "#3f444c",
  pantsShade: "#2e3238",
  pack: "#7a3b6e",
  packShade: "#5d2c54",
};
const FRIEND1: Outfit = { ...JAKE, jacket: "#C2662E", jacketShade: "#9B4E20" };
const FRIEND2: Outfit = { ...GUIDE, jacket: "#5E8FA8", jacketShade: "#4A7389", hair: "#b88a4a", ponytail: "#b88a4a", beard: null, skin: "#F0C6A8", skinShade: "#D6A888" };

const LEAVES = FALL;

// Wooden trail sign.
const Sign: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-10} y={-300} width={20} height={300} fill="#5a4030" />
    <path d="M-150,-300 L130,-300 L170,-262 L130,-224 L-150,-224 Z" fill="#7a5638" stroke="#4a3322" strokeWidth={4} />
    <text x={-130} y={-248} fontFamily="Barlow Condensed" fontWeight={800} fontSize={44} fill="#f5ead8" letterSpacing={2}>
      SUMMIT 10 MI
    </text>
  </g>
);

// Far mountain with a long switchback trail to the top.
const LongTrail: React.FC<{ k: number }> = ({ k }) => (
  <svg width={1080} height={1920} style={{ position: "absolute" }}>
    <path d="M60,1380 L520,760 Q560,720 600,760 L1080,1320 L1080,1500 L60,1500 Z" fill="#6d6f60" />
    <path d="M520,760 Q560,720 600,760 L640,800 Q560,780 480,812 Z" fill="#e9e2d2" opacity={0.8} />
    <path
      d="M300,1420 L720,1300 L380,1180 L700,1070 L440,975 L640,895 L520,830 L565,765"
      stroke="#d8c7a4"
      strokeWidth={9}
      fill="none"
      strokeLinejoin="round"
      strokeDasharray="1600"
      strokeDashoffset={1600 * (1 - k)}
    />
    <circle cx={565} cy={765} r={14} fill="#fff3d0" opacity={k} />
  </svg>
);

// ============ S1 HOOK: trailhead, the sign says 10 miles (0 - 3.08) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, t / 3.08), rot: hh.rot };
  const g = 1440;
  const p: HikerProps = { x: 400, y: g + 182 * 2.3 - 150, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [44, 30], breathe: Math.sin(t * 2.2) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="a" treeY={g - 60} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} />
        <Subject>
          <Sign x={860} y={g + 300} s={1.5} />
          <Person {...p} outfit={MAYA} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.16} />
      <Particles seed={21} n={18} col="#fff3d6" leaves={LEAVES} fall={60} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Title text={"She booked a\n10-miler. Her\nlongest hike\nwas 3."} t={t} t0={0} top={130} size={122} />
      <Chip text="10 miles with friends" t={t} t0={1.3} x={80} y={660} />
    </AbsoluteFill>
  );
};

// ============ S2: longest hike 3 mi vs 10 mi (3.03 - 5.57) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 20 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.5), rot: hh.rot };
  const g = 1560;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="b" treeY={1300} blur={1} t={t} />
      <Plane cam={cam} depth={0.7} blur={0.6}>
        <LongTrail k={at(lt, [0.2, 2.2], [0, 1])} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject>
          <Person x={250} y={g + 40} scale={1.3} walk={0} lean={-0.04} poles={false} handOverride={[40, 20]} outfit={MAYA} expression="neutral" breathe={Math.sin(t * 2) * 2} />
        </Subject>
      </Plane>
      <Particles seed={22} n={14} col="#fff3d6" leaves={LEAVES} fall={50} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Readout label="HER LONGEST HIKE" value="3 MI / 5 KM" ok={null} t={t} t0={3.15} x={80} y={200} />
      <Readout label="THIS HIKE" value="10 MI / 16 KM" ok={false} t={t} t0={4.1} x={80} y={420} pulseAt={4.6} />
    </AbsoluteFill>
  );
};

// ============ S3 PROBLEM: first climb (5.52 - 7.3) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 1);
  const cam: Cam = { x: lt * 26 + hh.x, y: -lt * 14 + hh.y, zoom: mix(1.05, 1.12, lt / 1.8), rot: hh.rot - 2 };
  const g = 1430;
  const ph = lt * 2.4;
  const p: HikerProps = { x: 430 + lt * 26, y: g + 182 * 2.3 - 150, scale: 2.3, phase: ph, walk: 0.55, lean: 0.3, poles: false, handOverride: freeHand(ph, 0.5), slope: 0.14 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="c" treeY={g - 140} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} tilt={0.14} />
        <Subject>
          <Person {...p} outfit={MAYA} expression="tired" />
          <Sweat p={p} t={t} on={at(t, [6.2, 6.6], [0, 1])} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={12}>
        <FrameLeaves col="#3a2a1a" side="right" />
      </Plane>
      <Particles seed={23} n={14} col="#fff3d6" leaves={LEAVES} fall={50} />
      <Grade sunX={760} sunY={640} warm="240,220,200" cool="30,50,70" />
      <Chip text="The first climb" t={t} t0={5.65} x={80} y={240} />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: legs burn, she keeps stopping (7.25 - 9.16) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [7.8, 7.95, 8.5], [0, 1, 0]);
  const hh = handheld(t, 0.8, shake);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.12, 1.04, lt / 1.9), rot: hh.rot };
  const p: HikerProps = { x: 280, y: 1180 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.55, poles: false, handOverride: [70, 70], breathe: Math.sin(t * 9) * 3 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="d" treeY={1200} blur={9} t={t} />
      <Plane cam={cam} depth={0.8} blur={8}>
        <Trail y={1300} tilt={0.1} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <Person {...p} outfit={MAYA} expression="tired" />
          <Sweat p={p} t={t} on={1} />
        </Subject>
      </Plane>
      <Particles seed={24} n={10} col="#fff3d6" fall={30} />
      <Grade sunX={760} sunY={640} warm="240,220,200" cool="30,50,70" vignette={0.65} />
      <Chip text="Legs burning" t={t} t0={7.4} x={80} y={1160} icon="x" />
      <Chip text="Stop. Again. And again." t={t} t0={7.9} x={80} y={1260} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 FIX: start training weeks before (9.11 - 11.92) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 14 + hh.x, y: at(lt, [0, 2.6], [-90, 0]) + hh.y, zoom: at(lt, [0, 2.6], [1.14, 1.03]), rot: hh.rot };
  const g = 1450;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 30} />
        <Subject>
          <Person x={700} y={g + 40} scale={1.4} walk={0} lean={0.03} poles={false} handOverride={[56, -50]} outfit={MAYA} expression="happy" breathe={Math.sin(t * 2.3) * 2} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.22} />
      <Particles seed={25} n={18} col="#fff3d6" leaves={LEAVES} fall={50} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Title text={"Start training\nweeks before."} t={t} t0={off + 0.15} top={190} size={150} />
      <Chip text="Not the week before" t={t} t0={10.4} x={80} y={540} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S6: five short sessions a week, walks and hills (11.87 - 14.4) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: lt * 40 + hh.x, y: -lt * 16 + hh.y, zoom: 1.06, rot: hh.rot - 1.5 };
  const g = 1420;
  const ph = lt * 3.6;
  const p: HikerProps = { x: 380 + lt * 50, y: g + 182 * 2.3 - 150, scale: 2.3, phase: ph, walk: 0.85, lean: 0.16, poles: false, handOverride: freeHand(ph, 0.85), slope: 0.1 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={g - 120} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} tilt={0.1} />
        <Subject>
          <Person {...p} outfit={MAYA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={12}>
        <FrameLeaves col="#3a2a1a" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.16} />
      <Particles seed={26} n={16} col="#fff3d6" leaves={LEAVES} fall={50} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Chip text="5 short sessions a week" t={t} t0={11.95} x={80} y={220} big />
      <Chip text="Walks" t={t} t0={12.9} x={80} y={360} icon="check" />
      <Chip text="Hills" t={t} t0={13.3} x={80} y={460} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S7: step-ups on a log step (14.35 - 16.95) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.6), rot: hh.rot };
  const g = 1500;
  const s = 3.2;
  const cyc = (t * 0.9) % 1; // one step-up per ~1.1 s
  const up = at(cyc, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);
  const stepH = 44;
  const p: HikerProps = {
    x: 470,
    y: g - up * stepH * s,
    scale: s,
    phase: cyc * Math.PI * 2,
    walk: Math.sin(cyc * Math.PI * 2) ** 2 * 0.5,
    lean: 0.12 + up * -0.06,
    poles: false,
    handOverride: [26, 40],
  };
  const top = g - stepH * s;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="g" treeY={1150} blur={7} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g - 40} />
        <Subject rimX={5}>
          {/* wooden step box */}
          <rect x={300} y={top} width={460} height={stepH * s + 12} rx={10} fill="#8a6440" stroke="#5a4030" strokeWidth={5} />
          <rect x={300} y={top} width={460} height={20} rx={8} fill="#a57b52" />
          <Person {...p} outfit={MAYA} expression="happy" />
        </Subject>
      </Plane>
      <Particles seed={27} n={12} col="#fff3d6" leaves={LEAVES} fall={40} />
      <Grade sunX={790} sunY={560} warm="255,214,160" vignette={0.55} />
      <Chip text="Step-ups" t={t} t0={14.9} x={80} y={220} icon="check" big />
      <Chip text="Simple strength moves" t={t} t0={15.5} x={80} y={360} />
    </AbsoluteFill>
  );
};

// Training log close-up: weekly bars grow a little each week, pen ticks them.
const Log: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const weeks = [0.3, 0.38, 0.46, 0.54, 0.62, 0.7];
  const pen = Math.min(5, Math.max(0, Math.floor((t - t0) / 0.42)));
  const [px, py] = [230 + pen * 120 + 40, 1040 - weeks[pen] * 560 - 30];
  return (
    <svg width={1080} height={1920} style={{ position: "absolute" }}>
      <g transform="rotate(-3 540 900)">
        <rect x={120} y={360} width={840} height={980} rx={26} fill="#f7f2e8" stroke="#d6cbb6" strokeWidth={4} />
        <rect x={420} y={330} width={240} height={70} rx={16} fill="#6b5a46" />
        <text x={180} y={480} fontFamily="Barlow Condensed" fontWeight={800} fontSize={64} fill="#2c3b2e" letterSpacing={2}>
          MY TRAINING LOG
        </text>
        <line x1={180} y1={1040} x2={900} y2={1040} stroke="#2c3b2e" strokeWidth={4} />
        {weeks.map((w, i) => {
          const k = at(t, [t0 + i * 0.42, t0 + i * 0.42 + 0.35], [0, 1], outExpo);
          const h = w * 560 * k;
          return (
            <g key={i}>
              <rect x={210 + i * 120} y={1040 - h} width={84} height={h} rx={10} fill={i === pen ? "#3E8E5A" : "#7aa88a"} />
              <text x={252 + i * 120} y={1100} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={700} fontSize={42} fill="#6b6b66">
                W{i + 1}
              </text>
              <path d={`M${232 + i * 120},${1020 - w * 560 - 20} l14,14 l26,-30`} stroke="#3E8E5A" strokeWidth={8} fill="none" strokeLinecap="round" opacity={k > 0.95 ? 1 : 0} />
            </g>
          );
        })}
        {/* hand with pen */}
        <g transform={`translate(${px},${py}) rotate(30)`}>
          <rect x={-8} y={-170} width={16} height={170} rx={6} fill="#2c3b2e" />
          <path d="M-8,0 L0,22 L8,0 Z" fill="#c9a77a" />
          <rect x={-10} y={-760} width={130} height={640} rx={50} fill={MAYA.jacket} transform="rotate(-20)" />
          <ellipse cx={20} cy={-120} rx={52} ry={44} fill={MAYA.skin} stroke="rgba(0,0,0,0.2)" strokeWidth={2} />
          <ellipse cx={-4} cy={-96} rx={18} ry={12} fill={MAYA.skinShade} />
        </g>
      </g>
    </svg>
  );
};

// ============ S8 CLOSE-UP: a little more each week (16.9 - 20.13) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 3.2), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="h" treeY={1200} blur={12} t={t} />
      <Plane cam={cam} depth={0.9} blur={6}>
        <Trail y={1250} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Log t={t} t0={17.2} />
      </Plane>
      <Particles seed={28} n={12} col="#fff3d6" fall={30} />
      <Grade sunX={790} sunY={560} warm="255,214,160" vignette={0.55} />
      <Chip text="A little more each week" t={t} t0={17.1} x={80} y={140} icon="check" />
      <Chip text="Never all at once" t={t} t0={18.6} x={80} y={1370} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF: summit with her friends (20.08 - 23.36) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 18 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.16, 1.04], outExpo), rot: hh.rot };
  const g = 1480;
  const arms = at(t, [20.3, 20.8], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="i" treeY={g + 170} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 30} grass="#8a7a48" />
        <Subject rimX={6}>
          <Person x={230} y={g + 40} scale={1.35} walk={0} lean={0.02} poles={false} handOverride={[50, -60]} outfit={FRIEND1} expression="happy" />
          <Person x={820} y={g + 50} scale={1.35} walk={0} lean={0.0} poles={false} handOverride={[40, 20]} outfit={FRIEND2} expression="happy" flip />
          <Person x={520} y={g + 70} scale={1.55} walk={0} lean={0.02} poles={false} handOverride={[mix(40, 60, arms), mix(20, -170, arms)]} outfit={MAYA} expression="happy" breathe={Math.sin(t * 2.4) * 2} />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={29} n={22} col="#ffe7b8" />
      <Grade sunX={740} sunY={660} warm="255,180,100" />
      <Chip text="10 miles. Top reached." t={t} t0={20.4} x={80} y={240} icon="check" big />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/trail-ready-8-week-beginner-hiking-training-plan-printable.jpg"
      photoH={800}
      spec="8 WEEKS · NO GYM NEEDED · PRINTABLE LOG"
      name={
        <>
          Trail Ready
          <br />
          Training Plan
        </>
      }
      nameSize={104}
      price="$12.99"
      save="Save this before you book your next big hike"
    />
  );
};

export const V63: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.08} fadeIn={0} fadeOut={0.1}>
      <S1 />
    </Scene>
    <Scene from={3.03} to={5.57} fadeIn={0.1} fadeOut={0.1}>
      <S2 off={3.03} />
    </Scene>
    <Scene from={5.52} to={7.3} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.52} />
    </Scene>
    <Scene from={7.25} to={9.16} fadeIn={0.08} fadeOut={0.1}>
      <S4 off={7.25} />
    </Scene>
    <Scene from={9.11} to={11.92} fadeIn={0.12} fadeOut={0.1}>
      <S5 off={9.11} />
    </Scene>
    <Scene from={11.87} to={14.4} fadeIn={0.1} fadeOut={0.1}>
      <S6 off={11.87} />
    </Scene>
    <Scene from={14.35} to={16.95} fadeIn={0.1} fadeOut={0.1}>
      <S7 off={14.35} />
    </Scene>
    <Scene from={16.9} to={20.13} fadeIn={0.1} fadeOut={0.1}>
      <S8 off={16.9} />
    </Scene>
    <Scene from={20.08} to={23.36} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={20.08} />
    </Scene>
    <Scene from={23.1} to={28} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.05, 1560],
        [3.05, 5.55, 1560],
        [5.55, 9.13, 1560],
        [9.13, 11.9, 1560],
        [11.9, 16.93, 1560],
        [16.93, 20.1, 1560],
        [20.1, 23.1, 1560],
      ]}
    />
  </AbsoluteFill>
);
