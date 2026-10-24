// V30B: v30 "Stop at the first hot spot" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v30b.json";

const words = vo.words as unknown as Word[];

const WARM: Sky = { top: "#3a6d9e", mid: "#b9cfe0", low: "#f7e6c4", sun: [820, 620], sunR: 52, sunCol: "#fffbe8", glow: "#ffe2a6" };
const COOL: Sky = { top: "#4d6a86", mid: "#a9bac4", low: "#e6e3d4", sun: [790, 600], sunR: 46, sunCol: "#fbf7ea", glow: "#f1ecd8" };
const GOLD: Sky = { top: "#4f6f93", mid: "#e8b98a", low: "#ffe0ae", sun: [760, 700], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const MARK: Outfit = { ...JAKE, hair: "#2a2220", beard: null, cap: "#B85C38", capShade: "#93462A", jacket: "#4E6E86", jacketShade: "#3C566A", pack: "#3E5F4B", packShade: "#2E4A39" };
const LEAVES = ["#d9963a", "#b9582c", "#c77a2e"];

const Woods: React.FC<{ y: number; shift: number; s?: number }> = ({ y, shift, s = 1 }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 170 - shift) % 1700) + 1700) % 1700) - 300;
      const h = (440 + (i % 3) * 70) * s;
      return i % 3 === 1 ? (
        <Pine key={i} x={x} y={y + (i % 2) * 20} h={h * 1.15} c="#3b6550" c2="#2b4d3c" />
      ) : (
        <LeafTree key={i} x={x} y={y + 20 + (i % 2) * 14} h={h} c={i % 2 ? "#d9963a" : "#b9582c"} c2={i % 2 ? "#b77a28" : "#94461f"} />
      );
    })}
  </Svg>
);

const Trail: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={900} fill="#5f7a44" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 4} L1480,${y + 120} Q540,${y + 90} -400,${y + 120} Z`} fill="#c0a67e" />
    {Array.from({ length: 14 }, (_, i) => (
      <path key={i} d={`M${-300 + i * 120},${y - 46} l-8,-30 m8,30 l6,-36 m-6,36 l14,-24`} stroke="#4d6436" strokeWidth={5} strokeLinecap="round" />
    ))}
  </Svg>
);

// ---------- shared world: sky -> far ridge -> haze -> mid ridge -> tree line ----------
const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; trees?: boolean }> = ({ cam, sky, uid, treeY, blur = 0, t, trees = true }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={430} col="#ffffff" seed={3} drift={t * (trees ? 12 : 40)} opacity={0.35} />
    </Plane>
    <Plane cam={cam} depth={0.15} blur={2.5 + blur}>
      <Ridge seed={11} base={treeY - 260} amp={380} scale={250} col="#8fa3b4" lit="#e8eef2" peak={160} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.75} />
    <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
      <Ridge seed={23} base={treeY - 120} amp={260} scale={180} col="#6f8577" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.45} />
    {trees && (
      <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
        <Woods y={treeY} shift={cam.x * 0.2} />
      </Plane>
    )}
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);


// Pulsing hot spot on the back of the far-side heel.
const HotSpot: React.FC<{ p: HikerProps; t: number; on: number; size?: number }> = ({ p, t, on, size = 1 }) => {
  if (on <= 0) return null;
  const f = hikerGeometry(p).legs[1].foot;
  const pulse = 1 + 0.18 * Math.sin(t * 9);
  return (
    <g transform={hikerTransform(p)} opacity={on}>
      <circle cx={f[0] - 14} cy={f[1] - 12} r={26 * pulse * size} fill="#ff5a3c" opacity={0.35} />
      <circle cx={f[0] - 14} cy={f[1] - 12} r={13 * pulse * size} fill="#ff3b2a" opacity={0.85} />
    </g>
  );
};

// Close-up of a bare heel, side view. blister: full raised blister. dry: drops vanish. tape: bandage on.
const Heel: React.FC<{ t: number; blister?: number; dry?: number; tape?: number }> = ({ t, blister = 0, dry = 1, tape = 0 }) => {
  const pulse = 1 + 0.12 * Math.sin(t * 8);
  return (
    <g>
      <path d="M250,-900 L430,-900 L430,0 L440,250 Q446,330 520,360 L760,388 Q850,400 850,440 Q846,478 780,480 L250,480 Q170,478 160,420 Q150,360 200,300 L230,250 Z" fill="#E2A98A" />
      <path d="M160,420 Q170,478 250,480 L780,480 Q846,478 850,440 L850,452 Q840,500 780,500 L250,500 Q160,498 160,420 Z" fill="#C4876A" />
      <path d="M430,-900 L430,0 L440,250 Q446,330 520,360" stroke="#C4876A" strokeWidth={6} fill="none" />
      {/* sock rolled down */}
      <path d="M238,10 Q340,-10 436,10 L438,70 Q340,52 234,72 Z" fill="#8C8F86" />
      <path d="M238,10 Q340,-10 436,10" stroke="#6f726a" strokeWidth={6} fill="none" />
      <circle cx={205} cy={400} r={58 * pulse} fill="#ff5a3c" opacity={0.3 * (1 - tape)} />
      <circle cx={205} cy={400} r={34} fill="#e84a35" opacity={0.75 * (1 - tape)} />
      {blister > 0 && (
        <g opacity={blister}>
          <ellipse cx={196} cy={398} rx={44} ry={36} fill="#f3d9c4" stroke="#d4614a" strokeWidth={5} />
          <ellipse cx={186} cy={386} rx={14} ry={9} fill="#fff" opacity={0.7} />
        </g>
      )}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${250 + i * 40},${330 + (i % 2) * 40} q8,14 0,20 q-8,-6 0,-20 Z`} fill="#8fd0ff" opacity={1 - dry} />
      ))}
      <g opacity={tape} transform={`translate(205,400) rotate(-12) scale(${mix(1.3, 1, tape)})`}>
        <rect x={-82} y={-46} width={164} height={92} rx={28} fill="#E9D3B4" stroke="#C9AE8A" strokeWidth={4} />
        <rect x={-34} y={-30} width={68} height={60} rx={10} fill="#F6EBDD" />
      </g>
    </g>
  );
};

const Boot: React.FC<{ x: number; y: number; s: number; o?: number; rot?: number }> = ({ x, y, s, o = 1, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M-40,-120 L40,-120 L44,-40 Q60,-20 120,-12 Q160,-6 160,20 L-48,20 Z" fill="#6B4630" />
    <rect x={-52} y={16} width={216} height={22} rx={8} fill="#2A2421" />
    <path d="M-10,-100 l30,12 M-6,-76 l30,12 M-2,-52 l30,12" stroke="rgba(255,255,255,0.4)" strokeWidth={5} />
  </g>
);

// Small red first-aid pouch (illustration).
const AidKit: React.FC<{ x: number; y: number; s: number; rot?: number }> = ({ x, y, s, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-46} y={-32} width={92} height={64} rx={12} fill="#C9302C" />
    <rect x={-46} y={-32} width={92} height={12} rx={6} fill="#a52521" />
    <rect x={-8} y={-16} width={16} height={40} rx={2} fill="#fff" />
    <rect x={-20} y={-4} width={40} height={16} rx={2} fill="#fff" />
  </g>
);

// ============ S1 HOOK: wide, hot spot two miles in (0 - 3.15) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.8);
  const cam: Cam = { x: t * 18 + hh.x, y: hh.y, zoom: mix(1.0, 1.08, t / 3.15), rot: hh.rot };
  const g = 1440;
  const ph = t * 3.6;
  const p: HikerProps = { x: 200 + t * 70, y: g, scale: 1.4, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="a" treeY={g - 40} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject>
          <Person {...p} outfit={MARK} />
          <HotSpot p={p} t={t} on={at(t, [1.0, 1.3], [0, 1])} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.2} />
      <Particles seed={31} n={22} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} />
      <Title text={"Stop at the\nfirst hot spot"} t={t} t0={0} top={130} size={136} />
      <Chip text="Two miles in" t={t} t0={2.13} x={80} y={460} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2a MEDIUM: he keeps going, deal with it at the top (3.1 - 5.4) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: lt * 24 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.3), rot: hh.rot };
  const g = 1380;
  const ph = lt * 3.4;
  const p: HikerProps = { x: 380 + lt * 50, y: g + 200, scale: 2.3, phase: ph, walk: 0.65, lean: 0.12, poles: false, handOverride: freeHand(ph, 0.65) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="b" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject>
          <Person {...p} outfit={MARK} expression="neutral" />
          <HotSpot p={p} t={t} on={1} size={0.9} />
        </Subject>
      </Plane>
      <Particles seed={32} n={16} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} />
      <Chip text="Deal with it at the top?" t={t} t0={3.48} x={80} y={240} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2b CLOSE-UP: full blister, every step down hurt (5.35 - 9.15) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = at(t, [8.1, 8.2, 8.7], [0, 1, 0]);
  const hh = handheld(t, 0.7, shake);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.06, 1.14, lt / 3.8) + shake * 0.03, rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={COOL} uid="c" treeY={1250} blur={10} t={t} trees={false} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <g transform="translate(60,560) scale(1.05)">
            <Heel t={t} blister={at(t, [6.6, 7.0], [0, 1])} />
          </g>
        </Svg>
      </Plane>
      <Particles seed={33} n={10} />
      <Grade sunX={790} sunY={600} warm="240,220,200" cool="25,50,70" vignette={0.65} />
      <Chip text="Full blister" t={t} t0={6.87} x={80} y={240} icon="x" big />
      <Readout label="EVERY STEP DOWN" value="HURTS" ok={false} t={t} t0={7.58} x={80} y={1190} pulseAt={8.51} />
    </AbsoluteFill>
  );
};

// ============ S3a MEDIUM: here's the fix, stop the moment you feel rubbing (9.1 - 12.2) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 10 + hh.x, y: at(lt, [0, 3.1], [-80, 0]) + hh.y, zoom: at(lt, [0, 3.1], [1.12, 1.03]), rot: hh.rot };
  const g = 1380;
  const stop = at(t, [10.3, 10.6], [1, 0]);
  const ph = t * 3.2;
  const p: HikerProps = { x: 300 + Math.min(lt, 1.2) * 70, y: g + 200, scale: 2.3, phase: ph, walk: 0.6 * stop, lean: 0.06 + 0.06 * stop, poles: false, handOverride: stop > 0.5 ? freeHand(ph, 0.6) : [40, 20], breathe: Math.sin(t * 2.3) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="d" treeY={g - 60} blur={2.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject>
          <Person {...p} outfit={MARK} expression="neutral" />
          <HotSpot p={p} t={t} on={at(t, [10.4, 10.7], [0, 0.8])} size={0.6} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#4a2e14" side="left" />
      </Plane>
      <Rays x={WARM.sun[0]} y={WARM.sun[1]} strength={0.2} />
      <Particles seed={34} n={20} leaves={LEAVES} fall={50} />
      <Grade sunX={820} sunY={620} />
      <Title text={"Here's\nthe fix."} t={t} t0={9.2} t1={10.35} top={200} size={160} />
      <Chip text="Stop at the first rubbing" t={t} t0={10.42} x={80} y={240} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: boot off, dry, tape before it breaks (12.15 - 18.0) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: -lt * 6 + hh.x, y: hh.y, zoom: mix(1.04, 1.14, lt / 5.85), rot: hh.rot };
  const bootOff = at(t, [12.3, 12.9], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WARM} uid="e" treeY={1300} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <g transform="translate(60,620) scale(1.05)">
            <Heel t={t} dry={at(t, [13.4, 13.9], [0, 1])} tape={at(t, [15.5, 15.9], [0, 1], outExpo)} />
          </g>
          <Boot x={mix(330, 1200, bootOff)} y={mix(1100, 1230, bootOff)} s={2.4} rot={mix(0, 18, bootOff)} o={1 - at(t, [12.8, 13.0], [0, 1])} />
        </Subject>
      </Plane>
      <Particles seed={35} n={16} leaves={LEAVES} fall={40} />
      <Grade sunX={820} sunY={620} vignette={0.6} />
      <Chip text="Boot off" t={t} t0={12.4} x={80} y={220} icon="check" big />
      <Chip text="Dry the skin" t={t} t0={13.38} x={80} y={340} icon="check" big />
      <Chip text="Tape or a bandage" t={t} t0={15.53} x={80} y={460} icon="check" big />
      <Readout label="BEFORE IT" value="BREAKS" ok={true} t={t} t0={16.67} x={80} y={1200} pulseAt={16.67} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: golden light, first-aid kit, stops early (17.95 - 21.9) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 14 + hh.x, y: hh.y, zoom: at(lt, [0, 1.2], [1.16, 1.04], outExpo), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 1420 + 182 * 3, scale: 3, walk: 0, lean: 0.04, poles: false, handOverride: [80, 10], breathe: Math.sin(t * 2.4) * 2 };
  const hand = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="h" treeY={1420} blur={6} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={MARK} expression="happy" />
          <g transform={hikerTransform(p)}>
            <AidKit x={hand[0] + 24} y={hand[1] - 18} s={1} rot={-6} />
          </g>
        </Subject>
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.26} col="255,214,150" />
      <Particles seed={38} n={26} col="#ffe7b8" />
      <Grade sunX={760} sunY={700} warm="255,180,100" />
      <Title text={"Stop early.\nFinish happy."} t={t} t0={off + 0.1} top={170} size={140} />
      <Chip text="Small first-aid kit" t={t} t0={19.52} x={80} y={500} icon="check" />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/trail-first-aid-kit-13-pieces-card.jpg"
      spec="13 PIECES · FITS ANY DAYPACK"
      name={
        <>
          Trail
          <br />
          First-Aid Kit
        </>
      }
      nameSize={104}
      price="$16.99"
      save="Save this before your next long hike"
    />
  );
};

export const V30B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.15} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.1} to={5.4} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={3.1} />
    </Scene>
    <Scene from={5.35} to={9.15} fadeIn={0.08} fadeOut={0.12}>
      <S2b off={5.35} />
    </Scene>
    <Scene from={9.1} to={12.2} fadeIn={0.12} fadeOut={0.1}>
      <S3a off={9.1} />
    </Scene>
    <Scene from={12.15} to={18.0} fadeIn={0.1} fadeOut={0.12}>
      <S3b off={12.15} />
    </Scene>
    <Scene from={17.95} to={21.9} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={17.95} />
    </Scene>
    <Scene from={21.85} to={27} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.1, 1560],
        [3.1, 5.35, 1560],
        [5.35, 9.1, 1560],
        [9.1, 12.15, 1560],
        [12.15, 17.95, 1560],
        [17.95, 21.85, 1560],
      ]}
    />
  </AbsoluteFill>
);
