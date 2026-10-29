// V65: "He trained with an empty pack" in the cinematic C01 style, late autumn. End card = Trail Ready training plan (digital).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays } from "../cine";
import { Backdrop, Bottle, CLEAR, FALL, GOLD, OVERCAST, Subject, Sweat, Trail } from "../fall";
import vo from "../vo/v65.json";

const words = vo.words as unknown as Word[];

const BEN: Outfit = { ...JAKE, jacket: "#6E8B3D", jacketShade: "#566E2F", pack: "#B83A55", packShade: "#8E2B42", cap: "#C2662E", capShade: "#9B4E20" };
const LEAVES = FALL;

// A full, bulging daypack drawn behind the body, with a bottle and a rolled jacket on top.
const BigPack: React.FC<{ p: HikerProps }> = ({ p }) => {
  const g = hikerGeometry(p);
  const n = [Math.cos(g.lean), Math.sin(g.lean)];
  const cx = (g.sh[0] + g.hip[0]) / 2 - n[0] * 44;
  const cy = (g.sh[1] + g.hip[1]) / 2 - n[1] * 44 - 6;
  const deg = (g.lean * 180) / Math.PI;
  return (
    <g transform={`${hikerTransform(p)} translate(${cx},${cy}) rotate(${deg})`}>
      <rect x={-56} y={-86} width={92} height={160} rx={36} fill={BEN.pack} stroke="rgba(0,0,0,0.3)" strokeWidth={2} />
      <rect x={-56} y={-86} width={30} height={160} rx={18} fill={BEN.packShade} />
      <rect x={-4} y={-116} width={22} height={40} rx={7} fill="#3f8fb0" />
      <rect x={-1} y={-126} width={16} height={12} rx={3} fill="#2b3a40" />
      <rect x={-50} y={-106} width={46} height={26} rx={13} fill="#2F7F86" />
      <rect x={-62} y={10} width={20} height={50} rx={8} fill={BEN.packShade} />
    </g>
  );
};

// Open pack seen from above-front, items dropping in.
const PackFill: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  const drop = (i: number) => at(t, [t0 + i * 0.75, t0 + i * 0.75 + 0.45], [-700, 0], outExpo);
  const fat = at(t, [t0, t0 + 2.6], [0, 1]);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute" }}>
      <g transform="translate(540,1080)">
        <path d={`M${-300 - fat * 40},-200 Q${-340 - fat * 60},300 -260,420 L260,420 Q${340 + fat * 60},300 ${300 + fat * 40},-200 Z`} fill={BEN.pack} stroke="rgba(0,0,0,0.3)" strokeWidth={4} />
        <path d={`M${-300 - fat * 40},-200 Q${-340 - fat * 60},300 -260,420 L-170,420 Q-230,300 -220,-200 Z`} fill={BEN.packShade} />
        <rect x={-180} y={60} width={360} height={240} rx={40} fill={BEN.packShade} stroke="rgba(0,0,0,0.25)" strokeWidth={3} />
        <path d="M-160,90 L160,90" stroke="#2c1018" strokeWidth={6} />
        <rect x={-250} y={-150} width={34} height={540} rx={12} fill="#2c1018" opacity={0.75} />
        <rect x={216} y={-150} width={34} height={540} rx={12} fill="#2c1018" opacity={0.75} />
        <ellipse cx={0} cy={-200} rx={300 + fat * 40} ry={70} fill="#4a1d2a" />
        <g transform={`translate(-120,${drop(0) - 180})`}>
          <Bottle x={0} y={0} s={1.15} rot={-8} />
        </g>
        <g transform={`translate(110,${drop(0.6) - 170})`}>
          <Bottle x={0} y={0} s={1.15} rot={10} col="#3E8E5A" />
        </g>
        <g transform={`translate(0,${drop(1.4) - 250})`}>
          <rect x={-150} y={-60} width={300} height={110} rx={50} fill="#2F7F86" stroke="rgba(0,0,0,0.25)" strokeWidth={3} />
          <path d="M-100,-40 q100,30 200,0" stroke="#256870" strokeWidth={10} fill="none" />
        </g>
        <g transform={`translate(-30,${drop(2.2) - 300}) rotate(-12)`}>
          <rect x={-110} y={-40} width={220} height={80} rx={14} fill="#d9a34a" stroke="rgba(0,0,0,0.25)" strokeWidth={3} />
          <rect x={-40} y={-40} width={80} height={80} fill="#c9662e" />
        </g>
        <path d="M-300,-200 Q-200,-260 -40,-250" stroke="#2c1018" strokeWidth={14} fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
};

// Weekly weight builder: one more bottle each week.
const Weeks: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => (
  <svg width={1080} height={1920} style={{ position: "absolute" }}>
    <rect x={90} y={560} width={900} height={760} rx={30} fill="#f7f2e8" stroke="#d6cbb6" strokeWidth={4} />
    {[0, 1, 2, 3].map((w) => {
      const y = 680 + w * 165;
      const k = at(t, [t0 + w * 0.55, t0 + w * 0.55 + 0.3], [0, 1]);
      return (
        <g key={w} opacity={k}>
          <text x={140} y={y + 30} fontFamily="Barlow Condensed" fontWeight={800} fontSize={54} fill="#2c3b2e" letterSpacing={2}>
            WEEK {w + 1}
          </text>
          {Array.from({ length: w + 1 }, (_, b) => (
            <g key={b} transform={`translate(${420 + b * 120},${y + 60}) scale(0.55)`}>
              <Bottle x={0} y={0} col={b === w ? "#3E8E5A" : "#3f8fb0"} />
            </g>
          ))}
        </g>
      );
    })}
  </svg>
);

// ============ S1 HOOK: hill walks with an empty pack (0 - 3.23) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: t * 30 + hh.x, y: -t * 12 + hh.y, zoom: mix(1.04, 1.1, t / 3.2), rot: hh.rot - 1.5 };
  const g = 1430;
  const ph = t * 3.8;
  const p: HikerProps = { x: 400 + t * 44, y: g + 182 * 2.3 - 150, scale: 2.3, phase: ph, walk: 0.9, lean: 0.14, poles: false, handOverride: freeHand(ph, 0.9), slope: 0.1 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="a" treeY={g - 120} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} tilt={0.1} />
        <Subject>
          <Person {...p} outfit={BEN} expression="happy" packSwing={Math.sin(ph) * 6} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.14} />
      <Particles seed={51} n={16} col="#fff3d6" leaves={LEAVES} fall={60} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Title text={"He trained\nfor weeks with\nan empty pack"} t={t} t0={0} top={150} size={124} />
      <Chip text="Pack: empty" t={t} t0={0.2} x={80} y={580} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the empty pack bounces (3.18 - 5.07) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 1.9), rot: hh.rot };
  const ph = t * 3.6;
  const p: HikerProps = { x: 600, y: 1150 + 182 * 4.4, scale: 4.4, phase: ph, walk: 0.5, lean: 0.12, poles: false, handOverride: freeHand(ph, 0.5) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="b" treeY={1200} blur={9} t={t} />
      <Plane cam={cam} depth={0.8} blur={8}>
        <Trail y={1330} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={BEN} expression="happy" packSwing={Math.sin(ph * 2) * 10} />
        </Subject>
      </Plane>
      <Particles seed={52} n={12} col="#fff3d6" leaves={LEAVES} fall={40} />
      <Grade sunX={790} sunY={560} warm="255,214,160" vignette={0.55} />
      <Chip text="Light and easy... too easy" t={t} t0={3.3} x={80} y={240} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: trip day, the pack fills up (5.02 - 8.1) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="c" treeY={1200} blur={12} t={t} />
      <Plane cam={cam} depth={0.9} blur={6}>
        <Trail y={1250} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <PackFill t={t} t0={5.2} />
      </Plane>
      <Grade sunX={760} sunY={640} warm="240,224,200" vignette={0.55} />
      <Chip text="Trip day" t={t} t0={5.1} x={80} y={200} />
      <Chip text="Water" t={t} t0={5.6} x={80} y={320} icon="check" />
      <Chip text="Food" t={t} t0={6.7} x={80} y={420} icon="check" />
      <Chip text="Warm layers" t={t} t0={7.3} x={80} y={520} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PROBLEM: mile two, it feels like a brick (8.05 - 10.67) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [9.0, 9.15, 9.7], [0, 1, 0]);
  const hh = handheld(t, 1, shake);
  const cam: Cam = { x: lt * 18 + hh.x, y: -lt * 10 + hh.y, zoom: mix(1.06, 1.12, lt / 2.6), rot: hh.rot - 2 };
  const g = 1430;
  const ph = lt * 2.2;
  const p: HikerProps = { x: 470 + lt * 20, y: g + 182 * 2.3 - 150, scale: 2.3, phase: ph, walk: 0.45, lean: 0.36, poles: false, handOverride: freeHand(ph, 0.4), slope: 0.14 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={OVERCAST} uid="d" treeY={g - 140} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} tilt={0.14} />
        <Subject rimX={-4}>
          <BigPack p={p} />
          <Person {...p} outfit={BEN} expression="tired" />
          <Sweat p={p} t={t} on={at(t, [8.6, 9.0], [0, 1])} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={12}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Particles seed={54} n={12} col="#fff3d6" leaves={LEAVES} fall={40} />
      <Grade sunX={760} sunY={640} warm="240,220,200" cool="30,50,70" vignette={0.6} />
      <Chip text="Mile 2" t={t} t0={8.2} x={80} y={240} />
      <Chip text="Feels like a brick" t={t} t0={9.0} x={80} y={340} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 FIX: train with the pack you will carry (10.62 - 13.58) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 14 + hh.x, y: at(lt, [0, 2.8], [-90, 0]) + hh.y, zoom: at(lt, [0, 2.8], [1.14, 1.03]), rot: hh.rot };
  const g = 1450;
  const p: HikerProps = { x: 700, y: g + 40, scale: 1.45, walk: 0, lean: 0.04, poles: false, handOverride: [40, 10], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 30} />
        <Subject>
          <BigPack p={p} />
          <Person {...p} outfit={BEN} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#3a2a1a" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.22} />
      <Particles seed={55} n={16} col="#fff3d6" leaves={LEAVES} fall={50} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Title text={"Train with\nthe pack you\nwill carry."} t={t} t0={off + 0.15} top={170} size={140} />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: one more bottle each week (13.53 - 16.87) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.3), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={1200} blur={12} t={t} />
      <Plane cam={cam} depth={0.9} blur={6}>
        <Trail y={1250} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Weeks t={t} t0={13.75} />
      </Plane>
      <Grade sunX={790} sunY={560} warm="255,214,160" vignette={0.5} />
      <Chip text="A little more each week" t={t} t0={13.65} x={80} y={250} icon="check" big />
      <Chip text="1 L of water = 2.2 lb / 1 kg" t={t} t0={15.2} x={80} y={1360} />
    </AbsoluteFill>
  );
};

// ============ S7: one long dress rehearsal hike (16.82 - 20.18) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: lt * 46 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.4), rot: hh.rot };
  const g = 1500;
  const ph = lt * 3.4;
  const p: HikerProps = { x: 300 + lt * 60, y: g + 182 * 1.5 - 90, scale: 1.5, phase: ph, walk: 0.85, lean: 0.12, poles: false, handOverride: freeHand(ph, 0.85) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="g" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} />
        <Subject>
          <BigPack p={p} />
          <Person {...p} outfit={BEN} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a1a" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.16} />
      <Particles seed={57} n={16} col="#fff3d6" leaves={LEAVES} fall={50} />
      <Grade sunX={790} sunY={560} warm="255,214,160" />
      <Chip text="1 long dress rehearsal" t={t} t0={17.0} x={80} y={240} icon="check" big />
      <Chip text="Full pack, before the trip" t={t} t0={18.2} x={80} y={380} />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF: the climb feels normal (20.13 - 22.31) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 30 + hh.x, y: -lt * 10 + hh.y, zoom: at(lt, [0, 1.4], [1.16, 1.05], outExpo), rot: hh.rot - 1 };
  const g = 1440;
  const ph = lt * 3.8;
  const p: HikerProps = { x: 420 + lt * 40, y: g + 182 * 2.2 - 140, scale: 2.2, phase: ph, walk: 0.9, lean: 0.14, poles: false, handOverride: freeHand(ph, 0.9), slope: 0.1 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={g - 110} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 40} tilt={0.1} grass="#8a7a48" />
        <Subject rimX={6}>
          <BigPack p={p} />
          <Person {...p} outfit={BEN} expression="happy" />
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={58} n={22} col="#ffe7b8" leaves={LEAVES} />
      <Grade sunX={740} sunY={660} warm="255,180,100" />
      <Chip text="Same climb. Felt normal." t={t} t0={20.3} x={80} y={240} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/trail-ready-8-week-beginner-hiking-training-plan-printable.jpg"
      photoH={800}
      spec="8 WEEKS · MI + KM, LB + KG · PRINTABLE LOG"
      name={
        <>
          Trail Ready
          <br />
          Training Plan
        </>
      }
      nameSize={104}
      price="$12.99"
      save="Save this before your next training walk"
    />
  );
};

export const V65: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.23} fadeIn={0} fadeOut={0.1}>
      <S1 />
    </Scene>
    <Scene from={3.18} to={5.07} fadeIn={0.08} fadeOut={0.08}>
      <S2 off={3.18} />
    </Scene>
    <Scene from={5.02} to={8.1} fadeIn={0.08} fadeOut={0.1}>
      <S3 off={5.02} />
    </Scene>
    <Scene from={8.05} to={10.67} fadeIn={0.08} fadeOut={0.1}>
      <S4 off={8.05} />
    </Scene>
    <Scene from={10.62} to={13.58} fadeIn={0.12} fadeOut={0.1}>
      <S5 off={10.62} />
    </Scene>
    <Scene from={13.53} to={16.87} fadeIn={0.1} fadeOut={0.1}>
      <S6 off={13.53} />
    </Scene>
    <Scene from={16.82} to={20.18} fadeIn={0.1} fadeOut={0.1}>
      <S7 off={16.82} />
    </Scene>
    <Scene from={20.13} to={22.31} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={20.13} />
    </Scene>
    <Scene from={22.05} to={27.3} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.2, 1560],
        [3.2, 5.05, 1560],
        [5.05, 8.08, 1560],
        [8.08, 10.64, 1560],
        [10.64, 13.55, 1560],
        [13.55, 16.85, 1560],
        [16.85, 20.15, 1560],
        [20.15, 22.05, 1560],
      ]}
    />
  </AbsoluteFill>
);
