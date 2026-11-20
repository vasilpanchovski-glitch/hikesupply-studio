// V195: "The first-aid kit was in the car." Short format (15.2 s, 40 words), cinematic C01 style, cold early-winter trail.
// Product: Trail First-Aid Pouch — MOLLE Organizer, $24.99 (live Shopify, an empty pouch you stock yourself).
// End card = real store photo, cut out. Advice (simple): a kit only helps if you carry it; keep it on the outside of the pack
// where you can reach it. No gore (a thin red line on the palm), no medical claims.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { WINTER, WGOLD, WinterBackdrop, FrostTrail } from "../winter";
import vo from "../vo/v195.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.45) 45%, rgba(12,22,28,0.45) 70%, rgba(12,22,28,0) 100%)" }} />
);

const TAN = "#B39A62";
const TAN_D = "#93804f";
const TAN_L = "#c4ad76";

const RYAN: Outfit = {
  ...JAKE,
  skin: "#D9A47E",
  skinShade: "#BC8662",
  hair: "#5a3a22",
  beard: "#5a3a22",
  cap: "#2E4C6D",
  capShade: "#223a54",
  jacket: "#4E6B3A",
  jacketShade: "#3c532c",
  pants: "#4a4540",
  pantsShade: "#36322e",
  pack: "#3F5873",
  packShade: "#30445a",
  glove: "#2a2a2a",
};

// Vertical tan MOLLE pouch with red cross patch (screen coords, centre x,y, width w). open 0..1 = lid folds down showing supplies.
const Pouch: React.FC<{ x: number; y: number; w: number; open?: number }> = ({ x, y, w, open = 0 }) => {
  const h = w * 1.7;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-w / 2 + 10} y={-h / 2 + 14} width={w} height={h} rx={w * 0.14} fill="rgba(0,0,0,0.28)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={w * 0.14} fill={TAN} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h * 0.08} rx={w * 0.08} fill={TAN_D} />
      <rect x={-w * 0.17} y={-h * 0.36} width={w * 0.34} height={h * 0.55} rx={6} fill={TAN_L} />
      <rect x={-w * 0.36} y={-h * 0.05} width={w * 0.72} height={h * 0.1} rx={6} fill={TAN_D} />
      <rect x={-w * 0.17} y={-h * 0.12} width={w * 0.34} height={w * 0.34} rx={w * 0.05} fill="#C9302C" />
      <rect x={-w * 0.04} y={-h * 0.12 + w * 0.06} width={w * 0.08} height={w * 0.22} fill="#fff" />
      <rect x={-w * 0.11} y={-h * 0.12 + w * 0.13} width={w * 0.22} height={w * 0.08} fill="#fff" />
      {open > 0 && (
        <g opacity={open}>
          <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={w * 0.14} fill={TAN_D} />
          <rect x={-w * 0.4} y={-h * 0.42} width={w * 0.8} height={h * 0.84} rx={w * 0.08} fill="#7a6a42" />
          <rect x={-w * 0.32} y={-h * 0.36} width={w * 0.28} height={h * 0.18} rx={6} fill="#f2e3cf" />
          <rect x={w * 0.04} y={-h * 0.36} width={w * 0.28} height={h * 0.18} rx={6} fill="#e6c9a4" />
          <rect x={-w * 0.32} y={-h * 0.12} width={w * 0.64} height={h * 0.1} rx={6} fill="#ffffff" />
          <rect x={-w * 0.3} y={h * 0.04} width={w * 0.6} height={h * 0.22} rx={8} fill="#d4a93a" opacity={0.9} />
          {[-0.3, -0.1, 0.1, 0.3].map((fx) => (
            <rect key={fx} x={w * fx - 6} y={h * 0.3} width={12} height={h * 0.08} rx={4} fill="#3a3a3a" />
          ))}
        </g>
      )}
    </g>
  );
};

// Thin red cut across the near palm of a walking Person.
const Cut: React.FC<{ p: HikerProps; k: number }> = ({ p, k }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <path d={`M${h[0] - 7},${h[1] - 1} l13,-4`} stroke="#c0392b" strokeWidth={2.4} strokeLinecap="round" opacity={k} />
    </g>
  );
};

// Big open palm with a thin cut (screen coords, palm centre x,y).
const Palm: React.FC<{ x: number; y: number; s?: number; rot?: number; cut: number }> = ({ x, y, s = 1, rot = 0, cut }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M-120,180 Q-150,600 -200,900 L200,900 Q150,600 120,180 Z" fill={RYAN.skinShade} />
    <path d="M-190,520 L190,520 L230,1100 L-230,1100 Z" fill={RYAN.jacket} />
    <rect x={-200} y={500} width={400} height={60} rx={24} fill={RYAN.jacketShade} />
    {[-96, -34, 30, 92].map((fx, i) => (
      <rect key={i} x={fx - 28} y={-330 + Math.abs(i - 1.5) * 34} width={56} height={260} rx={28} fill={RYAN.skin} />
    ))}
    <rect x={-210} y={-60} width={60} height={190} rx={30} fill={RYAN.skin} transform="rotate(-38 -180 40)" />
    <path d="M-130,-110 Q-140,200 -90,230 L90,230 Q140,200 130,-110 Z" fill={RYAN.skin} />
    <path d="M-80,40 Q0,70 90,20" stroke={RYAN.skinShade} strokeWidth={6} fill="none" opacity={0.6} />
    <path d="M-60,140 L70,110" stroke="#b8322a" strokeWidth={9} strokeLinecap="round" opacity={cut} />
    <path d="M-50,146 L60,120" stroke="#e8a090" strokeWidth={3} strokeLinecap="round" opacity={cut * 0.8} />
  </g>
);

// ============ S1 HOOK MEDIUM: Ryan stops on the trail, looking at his cut hand (0 - 2.5) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45, at(t, [0.6, 0.85], [0.6, 0]));
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.04, 1.1, t / 2.5), rot: hh.rot };
  const g = 1500;
  const walk = at(t, [0.4, 0.9], [0.7, 0]);
  const ph = t * 3;
  const p: HikerProps = { x: 420 + Math.min(t, 0.9) * 60, y: g + 40, scale: 2.5, phase: ph, walk, lean: 0.06, poles: false, handOverride: walk > 0.1 ? freeHand(ph, 0.5) : [62, -8] };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="a" treeY={g - 220} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0.4} />
        <Subject rimX={5} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={RYAN} expression={t > 0.8 ? "tired" : "neutral"} />
          <Cut p={p} k={at(t, [0.7, 1.0], [0, 1])} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.24} col="255,246,220" />
      <Particles seed={1951} n={14} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Title text={"The first-aid\nkit was in\nthe car."} t={t} t0={0} top={110} size={130} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the pouch on the car seat, back at the trailhead (2.5 - 5.48) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x + lt * 8, y: hh.y, zoom: mix(1.0, 1.08, lt / 2.98), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1300} t={t} snow={0.4} blur={10} />
      <Plane cam={cam} depth={0.6} blur={6}>
        <Svg>
          <Car x={880} y={1500} s={1.4} body="#9aa3a8" shade="#7c858a" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,240,210,0.6)">
          {/* car door frame and window */}
          <rect x={-200} y={300} width={1480} height={1700} fill="#5d6b74" />
          <rect x={80} y={420} width={920} height={900} rx={60} fill="#1f2a30" />
          {/* seat */}
          <path d="M180,1320 L180,760 Q190,640 330,640 L700,640 Q820,640 830,760 L830,1320 Z" fill="#3b3f44" />
          <path d="M220,1320 L220,800 Q230,700 340,700 L680,700 Q790,700 790,800 L790,1320 Z" fill="#474c52" />
          <Pouch x={505} y={1020} w={250} />
          {/* window glass reflection */}
          <path d="M80,420 L600,420 L200,1320 L80,1320 Z" fill="rgba(220,235,245,0.14)" />
          <path d="M700,420 L820,420 L420,1320 L360,1320 Z" fill="rgba(220,235,245,0.10)" />
          <rect x={80} y={420} width={920} height={900} rx={60} fill="none" stroke="#3e4a52" strokeWidth={30} />
        </Subject>
      </Plane>
      <Particles seed={1952} n={12} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" vignette={0.6} />
      <Chip text="Kit: in the car" t={t} t0={2.7} x={60} y={180} icon="x" big />
      <Chip text="Ryan: two miles away" t={t} t0={3.6} x={60} y={1340} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: his palm, a thin cut (5.48 - 7.7) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.2), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={1200} t={t} snow={0.4} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(255,240,210,0.85)">
          <Palm x={560} y={980} s={1.25} rot={-6} cut={1} />
        </Subject>
      </Plane>
      <Particles seed={1953} n={12} col="#ffffff" fall={10} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" vignette={0.6} />
      <Chip text="A kit only counts if it's on you" t={t} t0={5.6} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the pouch strapped to the outside of the pack, opened in seconds (7.7 - 10.51) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 8, y: hh.y, zoom: at(lt, [0, 1.0], [1.12, 1.03], outExpo), rot: hh.rot };
  const reach = at(t, [9.1, 9.6], [0, 1], outExpo);
  const open = at(t, [9.6, 10.0], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="d" treeY={1250} t={t} snow={0.4} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          {/* pack body */}
          <rect x={150} y={260} width={780} height={1700} rx={140} fill={RYAN.pack} />
          <rect x={150} y={260} width={180} height={1700} rx={90} fill={RYAN.packShade} />
          <rect x={260} y={330} width={560} height={140} rx={60} fill={RYAN.packShade} />
          {/* MOLLE webbing rows */}
          {[620, 720, 820, 920, 1020, 1120].map((yy) => (
            <g key={yy}>
              <rect x={290} y={yy} width={500} height={34} fill="#26384a" />
              {[340, 420, 500, 580, 660, 740].map((xx) => (
                <rect key={xx} x={xx} y={yy - 2} width={8} height={38} fill="#1c2a38" />
              ))}
            </g>
          ))}
          <path d="M150,1500 Q540,1560 930,1500" stroke="#26384a" strokeWidth={30} fill="none" />
          <Pouch x={540} y={900} w={300} open={open} />
          {/* hand reaching in from the right */}
          <g transform={`translate(${mix(1300, 900, reach)},${mix(1100, 820, reach)}) rotate(-25)`}>
            <rect x={0} y={-60} width={520} height={160} rx={70} fill={RYAN.jacket} />
            <rect x={-40} y={-54} width={90} height={150} rx={40} fill={RYAN.jacketShade} />
            <ellipse cx={-90} cy={20} rx={100} ry={70} fill={RYAN.skin} />
            {[-30, 10, 50].map((fy) => (
              <rect key={fy} x={-210} y={fy - 20} width={140} height={38} rx={19} fill={RYAN.skin} />
            ))}
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2e2618" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.35} col="255,236,200" />
      <Particles seed={1954} n={16} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,226,180" vignette={0.5} />
      <Chip text="The rule" t={t} t0={7.75} x={60} y={130} icon="none" big />
      <Chip text="On the outside of your pack" t={t} t0={8.47} x={60} y={260} icon="check" big />
    </AbsoluteFill>
  );
};

const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/trail-first-aid-pouch-cut.png"
      cutoutH={760}
      spec="MOLLE POUCH · STRAPS TO YOUR PACK"
      name={
        <>
          Trail First-Aid
          <br />
          Pouch
        </>
      }
      nameSize={100}
      price="$24.99"
      save="Save this before your next hike"
    />
  );
};

export const V195: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.58} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.5} to={5.56} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.5} />
    </Scene>
    <Scene from={5.48} to={7.78} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={5.48} />
    </Scene>
    <Scene from={7.7} to={10.51} fadeIn={0.06} fadeOut={0.1}>
      <S4 off={7.7} />
    </Scene>
    <Scene from={10.41} to={15.2} fadeOut={0}>
      <S5 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.5, 1600],
        [2.5, 5.48, 1600],
        [5.48, 7.7, 1600],
        [7.7, 10.41, 1600],
      ]}
    />
  </AbsoluteFill>
);
