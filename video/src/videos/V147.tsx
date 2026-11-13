// V147: "He shrank his wool socks in the dryer." in the cinematic C01 style, laundry room + early-winter trail. Story for the
// Merino Wool Hiking Socks (80% Merino, Cushioned Crew, $19.99, live Shopify). Advice (common wool care, conservative):
// wash wool socks inside out on a cool wool cycle or by hand, no tumble dryer, dry them flat overnight, pack a dry spare pair.
// A hot spot is shown as a red glow only, no medical claims. End card = real Shopify product photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Backdrop, Subject, Trail } from "../fall";
import { Room, WindowView } from "../home";
import { WGOLD, WINTER, WinterBackdrop, FrostTrail } from "../winter";
import vo from "../vo/v147.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#121a30", mid: "#26334f", low: "#4a5672", sun: [800, 330], sunR: 30, sunCol: "#f1efe4", glow: "#8f9ab4" };
const LAMP = "255,214,170";
const SOCK = "#3E5A4A"; // green merino
const SOCK2 = "#2E4538";

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const MARK: Outfit = {
  ...JAKE,
  skin: "#E2A98A",
  skinShade: "#C4876A",
  hair: "#6b4a30",
  beard: "#6b4a30",
  cap: "#3E4F5C",
  capShade: "#2C3943",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#3E5A4A",
  packShade: "#2E4538",
};
const MARK_HOME: Outfit = { ...MARK, cap: MARK.hair, capShade: MARK.hair, jacket: "#5a6b78", jacketShade: "#46545e" };

// Side-view sock (local: cuff top-left, toe to the right). inside = lighter inside-out look.
const Sock: React.FC<{ x: number; y: number; s?: number; rot?: number; col?: string; heel?: string; inside?: number }> = ({ x, y, s = 1, rot = 0, col = SOCK, heel = SOCK2, inside = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M-40,-160 L40,-160 L40,-20 Q40,30 90,30 L120,30 Q150,30 150,60 Q150,90 110,90 L10,90 Q-40,90 -40,40 Z" fill={col} />
    <rect x={-40} y={-160} width={80} height={30} fill={heel} />
    <path d="M110,30 Q150,30 150,60 Q150,90 110,90 Z" fill={heel} />
    <path d="M-40,40 Q-40,90 10,90 L10,50 Q-10,50 -10,20 L-40,20 Z" fill={heel} />
    {inside > 0 && (
      <g opacity={inside}>
        <path d="M-40,-160 L40,-160 L40,-20 Q40,30 90,30 L120,30 Q150,30 150,60 Q150,90 110,90 L10,90 Q-40,90 -40,40 Z" fill="#8fa596" />
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1={-36} y1={-140 + i * 32} x2={36} y2={-140 + i * 32} stroke="#6f8676" strokeWidth={4} strokeDasharray="4 6" />
        ))}
      </g>
    )}
  </g>
);

// Front-loading machine (screen coords, top-left). spin = drum rotation (deg). label = dial text. hot = dryer heat glow.
const Machine: React.FC<{ x: number; y: number; s?: number; spin: number; label: string; dial?: number; hot?: number; water?: number; children?: React.ReactNode }> = ({ x, y, s = 1, spin, label, dial = 0, hot = 0, water = 0, children }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={0} y={0} width={500} height={600} rx={30} fill="#eef0f2" />
    <rect x={0} y={0} width={500} height={110} rx={30} fill="#dfe3e6" />
    <circle cx={400} cy={56} r={34} fill="#c9ced2" />
    <line x1={400} y1={56} x2={400 + 26 * Math.cos(dial)} y2={56 + 26 * Math.sin(dial)} stroke="#4a5058" strokeWidth={8} strokeLinecap="round" />
    <rect x={40} y={34} width={240} height={46} rx={10} fill="#2a3038" />
    <text x={160} y={70} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={36} fill="#9fe0b0" letterSpacing={3}>
      {label}
    </text>
    <circle cx={250} cy={350} r={190} fill="#c9ced2" />
    <circle cx={250} cy={350} r={160} fill={hot > 0 ? `rgb(${mix(40, 120, hot)},${mix(46, 60, hot)},${mix(56, 40, hot)})` : "#2c3640"} />
    <defs>
      <clipPath id={`drum${label.replace(/[^A-Za-z]/g, "")}`}>
        <circle cx={250} cy={350} r={156} />
      </clipPath>
    </defs>
    <g clipPath={`url(#drum${label.replace(/[^A-Za-z]/g, "")})`}>
      {water > 0 && <rect x={80} y={350 + 156 - 160 * water} width={340} height={400} fill="#6fa8c8" opacity={0.55} />}
      <g transform={`rotate(${spin} 250 350)`}>{children}</g>
    </g>
    <circle cx={250} cy={350} r={160} fill="none" stroke="#9aa1a6" strokeWidth={10} />
    <path d="M150,250 Q190,210 240,205" stroke="#ffffff" strokeWidth={10} fill="none" opacity={0.35} strokeLinecap="round" />
  </g>
);

// Red glow on the heel of the near foot.
const HotSpot: React.FC<{ p: HikerProps; t: number; on: number; size?: number }> = ({ p, t, on, size = 1 }) => {
  const g = hikerGeometry(p);
  const f = g.legs[1].foot;
  const pulse = 1 + 0.18 * Math.sin(t * 9);
  return (
    <g transform={hikerTransform(p)} opacity={on}>
      <circle cx={f[0] - 14} cy={f[1] - 12} r={26 * pulse * size} fill="#ff5a3c" opacity={0.35} />
      <circle cx={f[0] - 14} cy={f[1] - 12} r={13 * pulse * size} fill="#ff3b2a" opacity={0.85} />
    </g>
  );
};

// Close-up lower leg in a boot, side view (screen coords). slide 0..1: the sock cuff slips down into the boot and bunches.
const BootLeg: React.FC<{ slide: number; t: number }> = ({ slide, t }) => {
  const cuff = mix(960, 1200, slide);
  return (
    <g>
      {/* pants leg (rolled up a little) */}
      <rect x={380} y={-200} width={300} height={1060} rx={40} fill={MARK.pants} />
      <rect x={370} y={830} width={320} height={70} rx={20} fill={MARK.pantsShade} />
      {/* bare skin between pants and sock */}
      <rect x={410} y={890} width={240} height={370} fill={MARK.skin} />
      <rect x={410} y={890} width={60} height={370} fill={MARK.skinShade} opacity={0.6} />
      {/* sock */}
      <rect x={404} y={cuff} width={252} height={1300 - cuff} fill={SOCK} />
      <rect x={400} y={cuff} width={260} height={34} rx={10} fill={SOCK2} />
      {slide > 0.3 &&
        [0, 1, 2].map((i) => (
          <path key={i} d={`M404,${1180 + i * 26} q126,${-18 - i * 4} 252,0`} stroke={SOCK2} strokeWidth={8} fill="none" opacity={at(slide, [0.3, 0.8], [0, 1])} />
        ))}
      {/* boot */}
      <path d="M360,1240 L700,1240 L720,1520 Q900,1540 990,1600 Q1040,1640 1030,1720 L300,1720 Q280,1600 330,1500 Z" fill="#6B4630" />
      <path d="M360,1240 L700,1240 L700,1290 L360,1290 Z" fill="#8a5f42" />
      {[1330, 1400, 1470].map((yy) => (
        <path key={yy} d={`M420,${yy} l200,-14`} stroke="#d9c49a" strokeWidth={10} strokeLinecap="round" />
      ))}
      <rect x={290} y={1700} width={760} height={44} rx={14} fill="#2A2421" />
      {/* the hot spot at the heel */}
      <circle cx={390} cy={1560} r={60 * (1 + 0.15 * Math.sin(t * 9))} fill="#ff5a3c" opacity={0.35 * at(slide, [0.6, 1], [0, 1])} />
    </g>
  );
};

// ============ S1 HOOK MEDIUM: laundry room, Mark holds up a shrunk sock by the dryer (0 - 4.31) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.03, 1.1, t / 4.31), rot: hh.rot };
  const floorY = 1600;
  const lift = at(t, [0.9, 1.4], [0, 1], outExpo);
  const p: HikerProps = { x: 330, y: floorY, scale: 2.4, walk: 0, lean: 0.02, poles: false, handOverride: [mix(30, 70, lift), mix(20, -70, lift)], breathe: Math.sin(t * 2) * 1.2 };
  const g = hikerGeometry(p);
  return (
    <AbsoluteFill>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={80} y={420} w={300} h={380} sky={WINTER} uid="a" />
        <Room floorY={floorY} win={[80, 420, 300, 380]} lamp={[700, 500]} wall="#cfd6d2" floor="#9a8a74" />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <Machine x={560} y={floorY - 600} s={1} spin={t * 40} label="DRY · HIGH" dial={0.6} hot={0.8} />
        </Svg>
        <Subject rimX={5} col="rgba(255,236,200,0.8)">
          <Person {...p} outfit={MARK_HOME} expression={t > 2.2 ? "tired" : "neutral"} noPack />
          <g transform={hikerTransform(p)}>
            <Sock x={g.arms[1].hand[0] - 4} y={g.arms[1].hand[1] + 12} s={0.22} rot={-10} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="left" />
      </Plane>
      <Particles seed={1471} n={12} col="#ffe8c0" fall={6} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm={LAMP} cool="40,40,60" />
      <Title text={"He shrank his\nwool socks in\nthe dryer."} t={t} t0={0} top={110} size={124} />
      <Chip text="A size too small" t={t} t0={2.6} x={60} y={640} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: on the trail, the small sock slides down into the boot and bunches (4.31 - 6.6) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y - 60, zoom: mix(1.0, 1.06, lt / 2.29), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={1300} blur={12} t={t} snow={0} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={1700} snow={0} />
        <Subject rimX={5} col="rgba(255,240,215,0.8)">
          <BootLeg slide={at(t, [4.5, 6.2], [0, 1])} t={t} />
        </Subject>
      </Plane>
      <Particles seed={1472} n={12} col="#ffffff" fall={8} />
      <Grade sunX={820} sunY={520} warm="250,240,226" vignette={0.55} />
      <Chip text="Slid down" t={t} t0={4.6} x={60} y={200} icon="x" big />
      <Chip text="Bunched at the heel" t={t} t0={5.6} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: by mile three, a hot spot on his heel (6.6 - 9.59) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.99), rot: hh.rot };
  const g = 1540;
  const ph = t * 2.0;
  const p: HikerProps = { x: 420 + lt * 40, y: g + 40, scale: 2.4, phase: ph, walk: 0.35, lean: 0.12, poles: false, handOverride: freeHand(ph, 0.35), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={g - 240} t={t} snow={0} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={0} />
        <Subject rimX={6} col="rgba(255,246,225,0.85)">
          <Person {...p} outfit={MARK} expression="tired" />
          <HotSpot p={p} t={t} on={at(t, [7.6, 8.0], [0, 1])} size={1.4} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24403a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.25} col="255,246,226" />
      <Particles seed={1473} n={14} col="#ffffff" fall={8} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="250,240,226" cool="40,60,90" />
      <Readout label="MILE THREE" value="Hot spot" ok={false} t={t} t0={7.7} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: the fix: inside out, cool wool cycle or by hand (9.59 - 15.13) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 5.54), rot: hh.rot };
  const flip = at(t, [11.0, 11.6], [0, 1]);
  const inMachine = at(t, [12.2, 12.8], [0, 1], outExpo);
  const basin = at(t, [14.1, 14.5], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#2b2620" }}>
      <Plane cam={cam} depth={0.6} blur={12}>
        <Room floorY={2200} win={[-300, 300, 200, 300]} lamp={[700, 500]} wall="#cfd6d2" />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,236,200,0.6)">
          <Svg>
            <g opacity={1 - basin}>
              <Machine x={210} y={760} s={1.3} spin={inMachine > 0.9 ? (t - 12.8) * 50 : 0} label="WOOL · COOL" dial={-0.4} water={at(t, [12.8, 13.6], [0, 0.5])}>
                <g opacity={inMachine}>
                  <Sock x={200} y={420} s={1.0} rot={20} inside={1} />
                </g>
              </Machine>
              {/* sock being turned inside out, then going in */}
              <g opacity={1 - inMachine}>
                <Sock x={480} y={560} s={1.6} rot={-15} inside={flip} />
              </g>
            </g>
            {/* hand-wash basin */}
            <g opacity={basin}>
              <ellipse cx={540} cy={1200} rx={420} ry={110} fill="#d9dde0" />
              <path d="M120,1200 Q140,1500 540,1520 Q940,1500 960,1200 Z" fill="#c9ced2" />
              <ellipse cx={540} cy={1210} rx={380} ry={90} fill="#8fc0d8" opacity={0.85} />
              <Sock x={460} y={1180} s={1.1} rot={70} inside={1} />
              {[0, 1, 2].map((i) => {
                const k = (t * 0.6 + i / 3) % 1;
                return <circle key={i} cx={400 + i * 120} cy={1180 - k * 40} r={10} fill="#e8f6ff" opacity={0.7 * (1 - k)} />;
              })}
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1474} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={10.75} top={200} size={124} />
      <Chip text="Inside out" t={t} t0={11.0} x={60} y={200} icon="check" big />
      <Chip text="Cool wool cycle" t={t} t0={12.3} x={60} y={330} icon="check" big />
      <Chip text="Or by hand" t={t} t0={14.1} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: no tumble dryer; the socks dry flat overnight (15.13 - 18.2) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x - lt * 8, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.07), rot: hh.rot };
  const night = at(t, [16.3, 16.9], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#2b2620" }}>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={600} y={360} w={380} h={420} sky={night > 0.5 ? NIGHT : WINTER} uid="e" snow={false} />
        <Room floorY={1500} win={[600, 360, 380, 420]} lamp={[200, 500]} wall="#cfd6d2" floor="#9a8a74" />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,236,200,0.7)">
          <Svg>
            {/* dryer, crossed out */}
            <g opacity={1 - night}>
              <Machine x={80} y={900} s={1.0} spin={0} label="DRYER" dial={0} />
              <g transform="translate(330,1250)" opacity={at(t, [15.4, 15.6], [0, 1])}>
                <path d="M-210,-210 L210,210 M210,-210 L-210,210" stroke="#D9443A" strokeWidth={36} strokeLinecap="round" />
              </g>
            </g>
            {/* towel on a table, socks laid flat */}
            <g opacity={night}>
              <rect x={60} y={1260} width={960} height={50} rx={10} fill="#6e4c34" />
              <rect x={100} y={1310} width={40} height={300} fill="#55392a" />
              <rect x={940} y={1310} width={40} height={300} fill="#55392a" />
              <path d="M140,1250 L940,1250 L900,1150 L180,1150 Z" fill="#e9e2d2" />
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1={200 + i * 30} y1={1160} x2={170 + i * 30} y2={1245} stroke="#d8cfbb" strokeWidth={6} />
              ))}
              <g transform="translate(380,1205) scale(1.1,0.6)">
                <Sock x={0} y={0} s={1.1} rot={90} />
              </g>
              <g transform="translate(660,1205) scale(1.1,0.6)">
                <Sock x={0} y={0} s={1.1} rot={90} />
              </g>
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1475} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Chip text="No tumble dryer" t={t} t0={15.3} x={60} y={200} icon="x" big />
      <Chip text="Dry flat overnight" t={t} t0={16.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: a dry spare pair goes into the pack (18.2 - 20.27) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.07), rot: hh.rot };
  const drop = at(t, [18.5, 19.3], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={0.6} blur={14}>
        <Room floorY={1500} win={[-300, 300, 200, 300]} lamp={[300, 600]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(255,236,200,0.7)">
          <Svg>
            {/* open pack, front view */}
            <path d="M230,1000 Q230,900 330,900 L750,900 Q850,900 850,1000 L870,1600 Q870,1680 790,1680 L290,1680 Q210,1680 210,1600 Z" fill={MARK.pack} />
            <ellipse cx={540} cy={920} rx={300} ry={70} fill="#1e2a22" />
            {/* rolled pair of socks dropping in */}
            <g transform={`translate(540,${mix(420, 900, drop)}) rotate(${mix(-30, 0, drop)})`}>
              <ellipse cx={0} cy={0} rx={130} ry={80} fill={SOCK} />
              <ellipse cx={-20} cy={-10} rx={90} ry={50} fill={SOCK2} />
              <path d="M-110,10 Q0,60 110,10" stroke={SOCK2} strokeWidth={10} fill="none" />
            </g>
            <path d="M230,960 Q540,1060 850,960 L850,1000 Q540,1100 230,1000 Z" fill={MARK.packShade} />
            <rect x={380} y={1240} width={320} height={200} rx={30} fill={MARK.packShade} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1476} n={10} col="#ffe8c0" fall={4} />
      <LowScrim />
      <Grade sunX={700} sunY={400} warm={LAMP} vignette={0.6} />
      <Chip text="Pack a dry spare pair" t={t} t0={18.4} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: golden trail, his new pair still fits (20.27 - 22.2) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1540;
  const ph = t * 2.6;
  const p: HikerProps = { x: 380 + lt * 60, y: g + 40, scale: 2.3, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={WGOLD} uid="g" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...p} outfit={MARK} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2e2618" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.45} col="255,236,200" />
      <Particles seed={1477} n={22} col="#fff3d6" fall={6} />
      <LowScrim />
      <Grade sunX={760} sunY={560} warm="255,226,180" />
      <Readout label="HIS NEW PAIR" value="Still fits" ok={true} t={t} t0={20.4} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/merino-wool-hiking-socks-cut.png"
      cutoutH={720}
      spec="80% MERINO · CUSHIONED CREW"
      name={
        <>
          Merino Wool
          <br />
          Hiking Socks
        </>
      }
      nameSize={96}
      price="$19.99"
      save="Save this before laundry day"
    />
  );
};

export const V147: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.36} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.31} to={6.65} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.31} />
    </Scene>
    <Scene from={6.6} to={9.64} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.6} />
    </Scene>
    <Scene from={9.59} to={15.18} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.59} />
    </Scene>
    <Scene from={15.13} to={18.25} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={15.13} />
    </Scene>
    <Scene from={18.2} to={20.32} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={18.2} />
    </Scene>
    <Scene from={20.27} to={22.3} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={20.27} />
    </Scene>
    <Scene from={22.0} to={27.5} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.31, 1600],
        [4.31, 6.6, 1660],
        [6.6, 9.59, 1600],
        [9.59, 15.13, 1660],
        [15.13, 18.2, 1660],
        [18.2, 20.27, 1660],
        [20.27, 22.0, 1600],
      ]}
    />
  </AbsoluteFill>
);
