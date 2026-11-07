// V111: "Your shoulders shouldn't carry your pack." in the cinematic C01 style. Story for the First Overnight Set ($16.99,
// live Shopify), posted Dec 5. Advice (standard pack fitting, no numbers): hip belt first, sitting on the hip bones and pulled
// snug, then the shoulder straps just firm, heavy things packed close to your back, so the weight rides on the hips.
// End card = the three real Shopify product images of the set (guide cover, packing checklist, trip planner) as a cut-out fan.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky } from "../cine";
import { Backdrop, CLEAR, FALL, Subject, Sweat, Trail } from "../fall";
import vo from "../vo/v111.json";

const words = vo.words as unknown as Word[];

const GOLDEN: Sky = { top: "#3f6690", mid: "#d9b48c", low: "#ffe2b4", sun: [780, 600], sunR: 58, sunCol: "#fff6dc", glow: "#ffcb84" };

const ROSA: Outfit = {
  ...JAKE,
  skin: "#C99272",
  skinShade: "#AB7656",
  hair: "#2a1d14",
  ponytail: "#2a1d14",
  beard: null,
  cap: "#2C6E63",
  capShade: "#1f5249",
  jacket: "#C2662E",
  jacketShade: "#9B4E20",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#3E5F7A",
  packShade: "#2C465C",
  boot: "#6B4630",
  glove: null,
};
const FRIEND: Outfit = { ...JAKE, jacket: "#4F7F5A", jacketShade: "#3b6345", cap: "#B83A55", capShade: "#8E2B42", pack: "#6d7f4a", packShade: "#566539" };

// Hip belt and shoulder strap drawn over the side-view Person, in hiker local units.
// snug 0 = belt hanging loose below the hips, straps pulled down hard; 1 = belt on the hip bones, straps just firm.
const Harness: React.FC<{ p: HikerProps; o: Outfit; snug: number }> = ({ p, o, snug }) => {
  const g = hikerGeometry(p);
  const lean = g.lean;
  const u = [Math.sin(lean), -Math.cos(lean)];
  const n = [Math.cos(lean), Math.sin(lean)];
  const P = (b: readonly number[], a: number, f: number) => [b[0] + u[0] * a + n[0] * f, b[1] + u[1] * a + n[1] * f];
  const s = (q: number[]) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`;
  const drop = mix(-30, 6, snug);
  const back = P(g.hip, drop + 10, -30);
  const front = P(g.hip, mix(-44, 4, snug), 30);
  const mid = P(g.hip, mix(-48, 2, snug), 4);
  const top = P(g.sh, 6, -14);
  const over = P(g.sh, 14, 6);
  const chest = P(g.hip, mix(40, 58, snug), 26);
  return (
    <g transform={hikerTransform(p)}>
      {/* shoulder strap */}
      <path d={`M${s(top)} Q${s(over)} ${s(chest)}`} stroke={o.packShade} strokeWidth={mix(9, 11, snug)} fill="none" strokeLinecap="round" />
      {/* hip belt band */}
      <path d={`M${s(back)} Q${s(mid)} ${s(front)}`} stroke={o.pack} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d={`M${s(back)} Q${s(mid)} ${s(front)}`} stroke="rgba(0,0,0,0.2)" strokeWidth={3} fill="none" />
      {/* buckle and dangling webbing when loose */}
      <rect x={front[0] - 7} y={front[1] - 7} width={14} height={14} rx={3} fill="#222" />
      {snug < 0.5 && <path d={`M${s(front)} q6,${18} 2,${34}`} stroke="#222" strokeWidth={4} fill="none" opacity={1 - snug * 2} />}
    </g>
  );
};

// Front close-up of the waist and hips with the hip belt. lift 0 = low and loose, 1 = on the hip bones.
// shut 0..1 = buckle halves apart..clicked. pull 0..1 = webbing tails pulled snug by both hands.
const HipClose: React.FC<{ lift: number; shut: number; pull: number; guide?: number; hands?: number }> = ({ lift, shut, pull, guide = 0, hands = 0 }) => {
  const y = mix(1250, 1010, lift);
  const gap = mix(140, 0, shut);
  const sag = mix(60, 0, Math.max(lift, shut));
  const wing = mix(0, 26, pull);
  const o = ROSA;
  return (
    <g>
      {/* legs and pants */}
      <path d="M250,1000 L830,1000 L870,2000 L590,2000 L560,1300 L520,1300 L490,2000 L210,2000 Z" fill={o.pants} />
      <path d="M540,1100 L560,1300 L520,1300 Z" fill={o.pantsShade} />
      <rect x={250} y={990} width={580} height={40} fill={o.pantsShade} />
      {/* jacket */}
      <path d="M200,-100 L880,-100 L860,1040 Q540,1080 220,1040 Z" fill={o.jacket} />
      <path d="M200,-100 L330,-100 L320,1046 L220,1040 Z" fill={o.jacketShade} />
      <line x1={540} y1={-100} x2={540} y2={1060} stroke={o.jacketShade} strokeWidth={10} />
      {/* hip bone guide */}
      {guide > 0 && (
        <g opacity={guide}>
          <path d="M260,1010 Q320,960 400,990" stroke="#fff" strokeWidth={8} strokeDasharray="18 14" fill="none" />
          <path d="M820,1010 Q760,960 680,990" stroke="#fff" strokeWidth={8} strokeDasharray="18 14" fill="none" />
        </g>
      )}
      {/* belt wings from both sides */}
      <path d={`M60,${y - 90} Q300,${y - 90 + sag * 0.4 + wing} ${470 - gap},${y - 50 + sag} L${470 - gap},${y + 60 + sag} Q300,${y + 70 + sag * 0.4 - wing * 0.4} 60,${y + 110} Z`} fill={o.pack} />
      <path d={`M1020,${y - 90} Q780,${y - 90 + sag * 0.4 + wing} ${610 + gap},${y - 50 + sag} L${610 + gap},${y + 60 + sag} Q780,${y + 70 + sag * 0.4 - wing * 0.4} 1020,${y + 110} Z`} fill={o.pack} />
      <path d={`M60,${y - 70} Q300,${y - 70 + sag * 0.4 + wing} ${470 - gap},${y - 34 + sag}`} stroke={o.packShade} strokeWidth={8} fill="none" />
      <path d={`M1020,${y - 70} Q780,${y - 70 + sag * 0.4 + wing} ${610 + gap},${y - 34 + sag}`} stroke={o.packShade} strokeWidth={8} fill="none" />
      {/* webbing to the buckle */}
      <rect x={430 - gap} y={y - 22 + sag} width={60} height={50} fill="#262626" />
      <rect x={590 + gap} y={y - 22 + sag} width={60} height={50} fill="#262626" />
      {/* buckle halves */}
      <rect x={470 - gap} y={y - 40 + sag} width={70} height={86} rx={10} fill="#1a1a1a" />
      <rect x={540 + gap} y={y - 40 + sag} width={70} height={86} rx={10} fill="#2b2b2b" />
      <rect x={485 - gap} y={y - 22 + sag} width={40} height={50} rx={6} fill="#3a3a3a" />
      {/* tails pulled out to the sides */}
      <path d={`M470,${y + 20} Q${mix(420, 300, pull)},${y + 80} ${mix(390, 250, pull)},${y + mix(140, 120, pull)}`} stroke="#262626" strokeWidth={34} fill="none" opacity={shut} />
      <path d={`M610,${y + 20} Q${mix(660, 780, pull)},${y + 80} ${mix(690, 830, pull)},${y + mix(140, 120, pull)}`} stroke="#262626" strokeWidth={34} fill="none" opacity={shut} />
      {/* hands */}
      {hands > 0 && (
        <g opacity={hands}>
          <ellipse cx={mix(390, 250, pull)} cy={y + mix(150, 130, pull)} rx={62} ry={50} fill={o.skin} />
          <ellipse cx={mix(690, 830, pull)} cy={y + mix(150, 130, pull)} rx={62} ry={50} fill={o.skin} />
          <path d={`M${mix(390, 250, pull) - 40},${y + mix(165, 145, pull)} q40,18 80,0`} stroke={o.skinShade} strokeWidth={8} fill="none" />
          <path d={`M${mix(690, 830, pull) - 40},${y + mix(165, 145, pull)} q40,18 80,0`} stroke={o.skinShade} strokeWidth={8} fill="none" />
        </g>
      )}
    </g>
  );
};

// ============ S1 HOOK MEDIUM: mile two, Rosa hunched under her pack, hip belt hanging loose (0 - 4.42) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: hh.x + t * 12, y: hh.y, zoom: mix(1.02, 1.08, t / 4.42), rot: hh.rot };
  const g = 1500;
  const ph = t * 2.6;
  const p: HikerProps = { x: 470 + t * 30, y: g + 40, scale: 2.3, phase: ph, walk: 0.4, lean: 0.22, poles: false, handOverride: [10, -50], breathe: Math.sin(t * 4) * 3 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="a" treeY={g - 140} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={5}>
          <Person {...p} outfit={ROSA} expression="tired" />
          <Harness p={p} o={ROSA} snug={0} />
          <Sweat p={p} t={t} on={at(t, [1.5, 2.5], [0, 1])} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a18" side="right" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.16} />
      <Particles seed={1111} n={14} leaves={FALL} fall={28} />
      <Grade sunX={790} sunY={560} warm="255,214,170" />
      <Title text={"Your shoulders\nshouldn't carry\nyour pack."} t={t} t0={0} top={130} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP (front): the hip belt hangs loose around her waist (4.42 - 6.43) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y + Math.sin(t * 5) * 6, zoom: mix(1.0, 1.06, lt / 2.0), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="b" treeY={900} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <HipClose lift={0} shut={0} pull={0} />
        </Subject>
      </Plane>
      <Particles seed={1112} n={10} leaves={FALL} fall={28} />
      <Grade sunX={790} sunY={560} warm="255,214,170" vignette={0.55} />
      <Chip text="Hip belt hanging loose" t={t} t0={4.96} x={60} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: her face and shoulder, the strap dragging down (6.43 - 8.79) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.36), rot: hh.rot };
  const s = 4.4;
  const p: HikerProps = { x: 470, y: 1640 + 182 * s - 120, scale: s, walk: 0, lean: 0.2, poles: false, handOverride: [10, -40], breathe: Math.sin(t * 4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="c" treeY={1250} t={t} blur={10} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={ROSA} expression="tired" />
          <Harness p={p} o={ROSA} snug={0} />
          <Sweat p={p} t={t} on={1} />
        </Subject>
      </Plane>
      <Particles seed={1113} n={12} leaves={FALL} fall={28} />
      <Grade sunX={790} sunY={560} warm="255,214,170" vignette={0.55} />
      <Readout label="SHOULDER STRAPS CARRY" value="Everything" ok={false} t={t} t0={6.71} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S4 MEDIUM: her friend steps in (8.79 - 11.06) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.06, 1.0, lt / 2.27), rot: hh.rot };
  const g = 1500;
  const k = at(t, [9.0, 9.8], [0, 1], outExpo);
  const a: HikerProps = { x: 330, y: g, scale: 2.3, walk: 0, lean: 0.1, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 3) * 2 };
  const b: HikerProps = { x: mix(900, 760, k), y: g, scale: 2.3, walk: 0, lean: 0.06, poles: false, handOverride: [mix(30, 80, k), mix(30, 20, k)], breathe: Math.sin(t * 2 + 1) * 1.5 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="d" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={5}>
          <Person {...a} outfit={ROSA} expression="tired" />
          <Harness p={a} o={ROSA} snug={0} />
          <Person {...b} outfit={FRIEND} expression="happy" flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Rays x={CLEAR.sun[0]} y={CLEAR.sun[1]} strength={0.2} />
      <Particles seed={1114} n={16} leaves={FALL} fall={28} />
      <Grade sunX={790} sunY={560} warm="255,214,170" />
      <Chip text="A 30-second fix" t={t} t0={9.28} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP (front): hip belt up on the hip bones, buckled, pulled snug (11.06 - 14.51) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const click = at(t, [11.9, 12.0], [0, 1]);
  const hh = handheld(t, 0.3, at(t, [11.95, 12.25], [1, 0]) * click);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 3.45), rot: hh.rot };
  const lift = at(t, [11.2, 11.8], [0, 1], outExpo);
  const shut = at(t, [11.75, 11.95], [0, 1]);
  const pull = at(t, [13.3, 13.8], [0, 1], outExpo);
  const guide = at(t, [12.17, 12.5, 13.3, 13.6], [0, 1, 1, 0]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="e" treeY={900} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5}>
          <HipClose lift={lift} shut={shut} pull={pull} guide={guide} hands={at(t, [13.15, 13.35], [0, 1])} />
        </Subject>
      </Plane>
      <Particles seed={1115} n={10} col="#fff3d6" />
      <Grade sunX={790} sunY={560} warm="255,214,170" vignette={0.5} />
      <Chip text="Hip belt first" t={t} t0={11.07} x={60} y={200} icon="check" big />
      <Chip text="On the hip bones" t={t} t0={12.17} x={60} y={330} icon="check" big />
      <Chip text="Pulled snug" t={t} t0={13.37} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the shoulder strap tab, pulled just firm (14.51 - 16.72) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.03, 1.08, lt / 2.21), rot: hh.rot };
  const k = at(t, [15.4, 15.95], [0, 1], outExpo);
  const o = ROSA;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="f" treeY={1000} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          {/* shoulder and chest from the front */}
          <path d="M-100,820 Q240,560 640,620 Q900,660 1180,900 L1180,2100 L-100,2100 Z" fill={o.jacket} />
          <path d="M-100,820 Q240,560 640,620 L620,700 Q240,660 -100,920 Z" fill={o.jacketShade} />
          <path d="M560,640 Q600,560 700,600 Q620,610 600,660 Z" fill={o.jacketShade} />
          {/* padded strap over the shoulder */}
          <path d="M300,560 Q420,640 440,900 L470,1400 L330,1400 L310,900 Q300,700 180,620 Z" fill={o.pack} />
          <path d="M300,560 Q420,640 440,900 L470,1400" stroke={o.packShade} strokeWidth={10} fill="none" />
          {/* ladder lock and webbing */}
          <rect x={340} y={1390} width={120} height={60} rx={10} fill="#1a1a1a" />
          <rect x={372} y={1440} width={56} height={mix(260, 160, k)} fill="#262626" />
          <rect x={360} y={1440 + mix(260, 330, k)} width={80} height={60} rx={8} fill="#262626" />
          {/* hand pulling the tab down and out */}
          <g transform={`translate(${mix(400, 430, k)},${1440 + mix(250, 330, k)})`}>
            <ellipse cx={0} cy={40} rx={95} ry={72} fill={o.skin} />
            <path d="M-60,70 q50,24 110,0" stroke={o.skinShade} strokeWidth={8} fill="none" />
            <rect x={-40} y={90} width={150} height={400} rx={60} fill={o.jacketShade} transform="rotate(-20)" />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1116} n={10} col="#fff3d6" />
      <Grade sunX={790} sunY={560} warm="255,214,170" vignette={0.5} />
      <Chip text="Then the shoulder straps" t={t} t0={14.52} x={60} y={200} icon="check" big />
      <Chip text="Just firm" t={t} t0={15.81} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: inside the pack, heavy food bag right against the back (16.72 - 18.8) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.08), rot: hh.rot };
  const k = at(t, [16.8, 17.6], [0, 1], outExpo);
  const o = ROSA;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={CLEAR} uid="g" treeY={1100} t={t} blur={14} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <rect x={230} y={500} width={620} height={1000} rx={120} fill={o.pack} />
          <rect x={290} y={560} width={500} height={880} rx={80} fill="#1c2833" />
          <rect x={230} y={500} width={60} height={1000} rx={30} fill={o.packShade} />
          <rect x={310} y={1200} width={460} height={220} rx={90} fill="#2C6E63" />
          <rect x={310} y={600} width={460} height={180} rx={70} fill="#B83A55" />
          <g transform={`translate(${mix(560, 0, k)},${mix(-500, 0, k)})`}>
            <rect x={300} y={800} width={260} height={380} rx={50} fill="#5a4636" />
            <text x={430} y={1010} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={56} fill="#e9dfc4" letterSpacing={2}>
              HEAVY
            </text>
          </g>
          <rect x={580} y={810} width={180} height={360} rx={40} fill="#d9a34a" opacity={0.9} />
          <text x={250} y={470} fontFamily="Barlow Condensed" fontWeight={700} fontSize={40} fill="#fff" opacity={0.85} letterSpacing={3}>
            BACK SIDE
          </text>
        </Subject>
      </Plane>
      <Particles seed={1117} n={10} col="#fff3d6" bokeh />
      <Grade sunX={790} sunY={560} warm="255,214,170" vignette={0.55} />
      <Chip text="Heavy things close to your back" t={t} t0={16.73} x={60} y={200} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: Rosa walks tall on a golden ridge, belt snug (18.8 - 22.4) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 24, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1480;
  const ph = t * 3.2;
  const p: HikerProps = { x: 330 + lt * 60, y: g + 60, scale: 2.3, phase: ph, walk: 0.8, lean: 0.04, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLDEN} uid="h" treeY={g - 200} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={6} col="rgba(255,220,160,0.9)">
          <Person {...p} outfit={ROSA} expression="happy" />
          <Harness p={p} o={ROSA} snug={1} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Rays x={GOLDEN.sun[0]} y={GOLDEN.sun[1]} strength={0.36} col="255,226,170" />
      <Particles seed={1118} n={18} leaves={FALL} fall={22} />
      <Grade sunX={780} sunY={600} warm="255,206,150" />
      <Chip text="Weight on her hips" t={t} t0={19.7} x={60} y={200} icon="check" big />
      <Chip text="Shoulders let go" t={t} t0={20.77} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/first-overnight-set-cut.png"
      cutoutH={640}
      spec="GUIDE · PACKING CHECKLIST · TRIP PLANNER"
      name={
        <>
          First Overnight
          <br />
          Set
        </>
      }
      nameSize={100}
      price="$16.99"
      save="Save this before your first night on the trail"
    />
  );
};

export const V111: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.47} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.42} to={6.48} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.42} />
    </Scene>
    <Scene from={6.43} to={8.84} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.43} />
    </Scene>
    <Scene from={8.79} to={11.11} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.79} />
    </Scene>
    <Scene from={11.06} to={14.56} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.06} />
    </Scene>
    <Scene from={14.51} to={16.77} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.51} />
    </Scene>
    <Scene from={16.72} to={18.85} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={16.72} />
    </Scene>
    <Scene from={18.8} to={22.45} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={18.8} />
    </Scene>
    <Scene from={22.2} to={27} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.42, 1560],
        [4.42, 6.43, 1560],
        [6.43, 8.79, 1560],
        [8.79, 11.06, 1560],
        [11.06, 14.51, 1560],
        [14.51, 16.72, 1560],
        [16.72, 18.8, 1560],
        [18.8, 22.2, 1560],
      ]}
    />
  </AbsoluteFill>
);
