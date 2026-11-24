// V164: "No signal. The map won't load." Short format (16.0 s, 41 words), cinematic C01 style, snowy forest fork.
// Product: What To Do If You Get Lost, $5.99 (live Shopify). End card = boxed store photo (as in V193).
// Advice (conservative, standard navigation guidance): phone maps need signal unless downloaded first; download the offline
// map before leaving home, carry a paper map, and if unsure, stop before walking on. No numbers, no claims.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, WINTER, STORM, WinterBackdrop } from "../winter";
import vo from "../vo/v164.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const BEN: Outfit = {
  ...JAKE,
  skin: "#D9A47E",
  skinShade: "#B98462",
  hair: "#2e2018",
  beard: "#2e2018",
  cap: "#B8452F",
  capShade: "#933624",
  jacket: "#2F6B7A",
  jacketShade: "#24535f",
  pants: "#3a3f4a",
  pantsShade: "#2a2e36",
  pack: "#7a6a4a",
  packShade: "#5e5138",
  glove: "#2a2a2a",
};
const GLOVE = "#2a2a2a";
const SLEEVE = BEN.jacket;
const SLEEVE2 = BEN.jacketShade;

// Snow ground with a trail that splits into two (screen coords, y = horizon of the ground).
const ForkGround: React.FC<{ y: number; cx: number }> = ({ y, cx }) => (
  <Svg>
    <path d={`M-400,${y} Q540,${y - 30} 1480,${y} L1480,2600 L-400,2600 Z`} fill={SNOW} />
    {/* main trail from the bottom, splitting just below the tree line */}
    <path d={`M${cx - 300},2600 L${cx - 50},${y + 90} L${cx + 50},${y + 90} L${cx + 300},2600 Z`} fill="#c9d3da" />
    {/* left branch */}
    <path d={`M${cx - 50},${y + 92} Q${cx - 220},${y + 40} ${cx - 560},${y + 14} L${cx - 540},${y + 2} Q${cx - 200},${y + 20} ${cx},${y + 80} Z`} fill="#c9d3da" />
    {/* right branch */}
    <path d={`M${cx + 50},${y + 92} Q${cx + 220},${y + 40} ${cx + 560},${y + 10} L${cx + 540},${y - 2} Q${cx + 200},${y + 20} ${cx},${y + 80} Z`} fill="#c9d3da" />
    {/* a bare signpost at the split */}
    <rect x={cx - 8} y={y - 90} width={16} height={180} fill="#5a4636" />
    <path d={`M${cx - 70},${y - 80} L${cx + 6},${y - 80} L${cx + 6},${y - 52} L${cx - 70},${y - 52} L${cx - 88},${y - 66} Z`} fill="#7a5e44" />
    <path d={`M${cx - 6},${y - 44} L${cx + 70},${y - 44} L${cx + 88},${y - 30} L${cx + 70},${y - 16} L${cx - 6},${y - 16} Z`} fill="#7a5e44" />
    <path d={`M-400,${y + 200} Q540,${y + 170} 1480,${y + 200}`} stroke={SNOW2} strokeWidth={30} fill="none" opacity={0.5} />
    {Array.from({ length: 10 }, (_, i) => (
      <ellipse key={i} cx={-300 + i * 180} cy={y + 80 + ((i * 71) % 260)} rx={60} ry={8} fill="#cfd9df" opacity={0.5} />
    ))}
  </Svg>
);

// Phone in a gloved hand: the map screen. gray = 0..1 tiles gone gray, dl = 0..1 offline download progress (-1 hides it).
const Phone: React.FC<{ x: number; y: number; s: number; gray: number; dl: number; t: number; id: string }> = ({ x, y, s, gray, dl, t, id }) => {
  const spin = (t * 360) % 360;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <defs>
        <clipPath id={id}>
          <rect x={-170} y={-350} width={340} height={700} rx={30} />
        </clipPath>
      </defs>
      <rect x={-190} y={-380} width={380} height={760} rx={50} fill="#1d2126" />
      <g clipPath={`url(#${id})`}>
        <rect x={-170} y={-350} width={340} height={700} fill="#e8ecdf" />
        {/* topo map: forest, trails, contour lines */}
        <path d="M-170,-350 L170,-350 L170,-60 Q40,-20 -40,-120 Q-120,-200 -170,-160 Z" fill="#b8d3a6" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M-170,${40 + i * 60} Q0,${-10 + i * 60} 170,${60 + i * 60}`} stroke="#c9b48a" strokeWidth={4} fill="none" />
        ))}
        <path d="M0,350 L0,80 Q-60,-40 -150,-200" stroke="#c0392b" strokeWidth={9} strokeDasharray="18 12" fill="none" />
        <path d="M0,80 Q70,-30 160,-120" stroke="#c0392b" strokeWidth={9} strokeDasharray="18 12" fill="none" />
        <circle cx={0} cy={140} r={16} fill="#2f6fd0" stroke="#fff" strokeWidth={5} />
        {/* gray, unloaded tiles */}
        {gray > 0 &&
          Array.from({ length: 12 }, (_, i) => {
            const cx = -170 + (i % 3) * 114;
            const cy = -350 + Math.floor(i / 3) * 176;
            const k = at(gray, [(i % 5) * 0.1, (i % 5) * 0.1 + 0.5], [0, 1]);
            return <rect key={i} x={cx} y={cy} width={113} height={175} fill="#b9bcbf" stroke="#c9cccf" strokeWidth={3} opacity={k} />;
          })}
        {gray > 0.6 && (
          <g opacity={at(gray, [0.6, 1], [0, 1])}>
            <circle cx={0} cy={0} r={42} stroke="#8a8d90" strokeWidth={10} fill="none" strokeDasharray="160 120" transform={`rotate(${spin})`} />
          </g>
        )}
        {/* status bar: signal bars */}
        <rect x={-170} y={-350} width={340} height={56} fill="rgba(255,255,255,0.85)" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={90 + i * 16} y={-310 - i * 8} width={10} height={10 + i * 8} fill={gray > 0 ? "#c9cccf" : "#1d2126"} />
        ))}
        {gray > 0 && <path d="M80,-332 l24,24 M104,-332 l-24,24" stroke="#c0392b" strokeWidth={6} opacity={at(gray, [0, 0.3], [0, 1])} />}
        {/* offline download panel */}
        {dl >= 0 && (
          <g>
            <rect x={-150} y={170} width={300} height={150} rx={20} fill="#ffffff" />
            <path d="M-110,214 l0,30 M-122,232 l12,12 l12,-12 M-126,252 h32" stroke="#2f6b4f" strokeWidth={6} fill="none" strokeLinecap="round" />
            <rect x={-70} y={206} width={190} height={16} rx={8} fill="#2C3B2E" opacity={0.85} />
            <rect x={-70} y={236} width={130} height={12} rx={6} fill="#9aa39c" />
            <rect x={-130} y={280} width={260} height={18} rx={9} fill="#dfe5df" />
            <rect x={-130} y={280} width={260 * dl} height={18} rx={9} fill="#2f6b4f" />
            {dl >= 1 && <path d="M90,214 l14,14 l26,-28" stroke="#2f6b4f" strokeWidth={8} fill="none" strokeLinecap="round" />}
          </g>
        )}
      </g>
    </g>
  );
};

// Unfolded paper map (screen coords, centred at x,y). k = 0..1 unfolding.
const PaperMap: React.FC<{ x: number; y: number; s: number; k: number }> = ({ x, y, s, k }) => {
  const w = mix(220, 760, k);
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x={-w / 2 + 14} y={-300 + 18} width={w} height={600} fill="rgba(0,0,0,0.25)" />
      <rect x={-w / 2} y={-300} width={w} height={600} fill="#efe6cf" />
      <defs>
        <clipPath id="pm164">
          <rect x={-w / 2} y={-300} width={w} height={600} />
        </clipPath>
      </defs>
      <g clipPath="url(#pm164)">
        <path d="M-380,-300 L380,-300 L380,-60 Q120,-10 -60,-140 Q-220,-240 -380,-180 Z" fill="#c6dbb2" />
        {Array.from({ length: 7 }, (_, i) => (
          <ellipse key={i} cx={180} cy={60} rx={60 + i * 50} ry={40 + i * 32} stroke="#c9a874" strokeWidth={3} fill="none" />
        ))}
        <path d="M-40,300 L-20,60 Q-140,-40 -330,-220" stroke="#b03a2e" strokeWidth={8} strokeDasharray="20 12" fill="none" />
        <path d="M-20,60 Q120,-60 330,-200" stroke="#b03a2e" strokeWidth={8} strokeDasharray="20 12" fill="none" />
        <path d="M-380,180 Q-200,140 -120,240 Q-60,300 -40,340" stroke="#6fa6cf" strokeWidth={10} fill="none" />
        {/* folds */}
        {[-1, 0, 1].map((i) => (
          <line key={i} x1={i * (w / 4)} y1={-300} x2={i * (w / 4)} y2={300} stroke="#d6caa9" strokeWidth={3} />
        ))}
        <line x1={-w / 2} y1={0} x2={w / 2} y2={0} stroke="#d6caa9" strokeWidth={3} />
        {/* north arrow */}
        <path d="M300,-250 l20,50 l-20,-12 l-20,12 Z" fill="#2C3B2E" />
      </g>
    </g>
  );
};

// ============ S1 HOOK WIDE: Ben arrives at a fork in the snow, phone up (0 - 2.2) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 10, y: hh.y, zoom: mix(1.03, 1.1, t / 2.2), rot: hh.rot };
  const g = 1420;
  const walk = at(t, [0, 1.4], [0.6, 0]);
  const ph = t * 3;
  const p: HikerProps = { x: 300, y: g + 380, scale: 2.0, phase: ph, walk, lean: 0.03, poles: false, handOverride: walk > 0.2 ? freeHand(ph, 0.5) : [60, -40], breathe: Math.sin(t * 2) * 1.4 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <ForkGround y={g} cx={680} />
        <Subject rimX={6} col="rgba(255,240,210,0.8)">
          <Person {...p} outfit={BEN} expression="neutral" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Particles seed={1641} n={18} col="#ffffff" fall={24} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="240,236,228" cool="40,60,90" />
      <Title text={"No signal.\nThe map\nwon't load."} t={t} t0={0} top={110} size={135} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the phone map turns gray, no bars (2.2 - 4.38) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 0.6], [1.12, 1.03], outExpo), rot: hh.rot };
  const gray = at(t, [2.6, 3.8], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(230,236,245,0.8)">
          <Svg>
            <path d="M-80,1920 L-60,1420 Q160,1280 420,1300 L470,1460 Q230,1500 220,1920 Z" fill={SLEEVE} />
            <path d="M-80,1920 L-70,1600 Q100,1500 260,1500 L240,1920 Z" fill={SLEEVE2} />
            <Phone x={560} y={900} s={1.45} gray={gray} dl={-1} t={t} id="ph164a" />
            <path d="M250,1300 Q220,1140 290,1100 L360,1160 Q390,1270 350,1380 Q290,1420 250,1380 Z" fill={GLOVE} />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={760} y={980 + i * 80} width={90} height={56} rx={26} fill={GLOVE} />
            ))}
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1642} n={20} col="#ffffff" fall={24} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="236,236,236" cool="40,60,90" vignette={0.55} />
      <Chip text="No signal" t={t} t0={2.6} x={60} y={170} icon="x" big />
      <Chip text="Map won't load" t={t} t0={3.4} x={60} y={300} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: the fix, at home the night before: download the offline map (4.38 - 7.64) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.26), rot: hh.rot };
  const dl = at(t, [5.0, 7.0], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#3a2a20" }}>
      <Plane cam={cam} depth={0.4} blur={14}>
        <Svg>
          <rect x={-200} y={-200} width={1500} height={2400} fill="#b89c78" />
          <rect x={-200} y={1400} width={1500} height={800} fill="#6a4a34" />
          <circle cx={820} cy={420} r={380} fill="#fff1d0" opacity={0.4} />
          <rect x={80} y={300} width={260} height={380} rx={10} fill="#2f4a5a" opacity={0.5} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <Svg>
            <ellipse cx={330} cy={1380} rx={70} ry={100} fill={BEN.skin} transform="rotate(-30 330 1380)" />
            <rect x={160} y={1450} width={220} height={520} rx={60} fill="#7a8a6a" transform="rotate(-30 270 1650)" />
            <Phone x={560} y={880} s={1.45} gray={0} dl={dl} t={t} id="ph164b" />
            <ellipse cx={790} cy={1060} rx={46} ry={34} fill={BEN.skin} />
            <ellipse cx={800} cy={1140} rx={44} ry={32} fill={BEN.skin} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1643} n={10} col="#ffe8c0" fall={6} bokeh />
      <Grade sunX={820} sunY={420} warm="255,220,170" vignette={0.55} />
      <Chip text="The fix" t={t} t0={4.45} x={60} y={170} icon="none" big />
      <Chip text="Offline map, before you go" t={t} t0={5.0} x={60} y={300} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the paper map unfolds in gloved hands (7.64 - 9.5) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.07, lt / 1.86), rot: hh.rot };
  const k = at(t, [7.7, 8.4], [0, 1], outExpo);
  const w = mix(220, 760, k) * 1.25;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,240,210,0.8)">
          <Svg>
            <PaperMap x={540} y={1000} s={1.25} k={k} />
            <ellipse cx={540 - w / 2 + 10} cy={1080} rx={70} ry={95} fill={GLOVE} />
            <ellipse cx={540 + w / 2 - 10} cy={1080} rx={70} ry={95} fill={GLOVE} />
            <path d={`M${540 - w / 2 - 60},1160 L${540 - w / 2 - 260},1920 L${540 - w / 2 + 80},1920 L${540 - w / 2 + 60},1160 Z`} fill={SLEEVE} />
            <path d={`M${540 + w / 2 + 60},1160 L${540 + w / 2 + 260},1920 L${540 + w / 2 - 80},1920 L${540 + w / 2 - 60},1160 Z`} fill={SLEEVE2} />
          </Svg>
        </Subject>
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} col="255,246,220" />
      <Particles seed={1644} n={16} col="#ffffff" fall={14} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" vignette={0.5} />
      <Chip text="Carry a paper map" t={t} t0={7.75} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: unsure, Ben stops at the fork and checks before walking on (9.5 - 11.47) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.97), rot: hh.rot };
  const g = 1300;
  const p: HikerProps = { x: 470, y: g + 520, scale: 2.4, walk: 0, lean: 0.02, poles: false, handOverride: [64, -20], breathe: Math.sin(t * 1.6) * 1.4 };
  const [hx, hy] = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 60} t={t} blur={2} />
      <Plane cam={cam} depth={1}>
        <ForkGround y={g} cx={760} />
        <Subject rimX={6} col="rgba(255,240,210,0.85)">
          <Person {...p} outfit={BEN} expression="neutral" />
          <g transform={hikerTransform(p)}>
            <rect x={hx - 6} y={hy - 34} width={70} height={52} fill="#efe6cf" stroke="#d6caa9" strokeWidth={2} />
            <path d={`M${hx + 4},${hy + 10} q20,-24 50,-34`} stroke="#b03a2e" strokeWidth={3} strokeDasharray="5 4" fill="none" />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.24} col="255,246,220" />
      <Particles seed={1645} n={18} col="#ffffff" fall={18} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,240,220" cool="40,60,90" />
      <Chip text="Unsure? Stop first" t={t} t0={9.9} x={60} y={170} icon="check" big />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/what-to-do-if-you-get-lost.jpg"
      photoH={720}
      spec="PRINTABLE GUIDE · INSTANT DOWNLOAD"
      name={
        <>
          What To Do If
          <br />
          You Get Lost
        </>
      }
      nameSize={96}
      price="$5.99"
      save="Save this before your next hike"
    />
  );
};

export const V164: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.28} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.2} to={4.46} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.2} />
    </Scene>
    <Scene from={4.38} to={7.72} fadeIn={0.06} fadeOut={0.08}>
      <S3 off={4.38} />
    </Scene>
    <Scene from={7.64} to={9.58} fadeIn={0.06} fadeOut={0.08}>
      <S4 off={7.64} />
    </Scene>
    <Scene from={9.5} to={11.57} fadeIn={0.06} fadeOut={0.1}>
      <S5 off={9.5} />
    </Scene>
    <Scene from={11.47} to={16.0} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.2, 1600],
        [2.2, 4.38, 1600],
        [4.38, 7.64, 1600],
        [7.64, 9.5, 1600],
        [9.5, 11.47, 1600],
      ]}
    />
  </AbsoluteFill>
);
