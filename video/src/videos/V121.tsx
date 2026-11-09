// V121: "Her gift for a hiker: one sheet of paper." in the cinematic C01 style. Gift story for the Pocket Trail Log
// ($3.99, live Shopify, printable). Facts from the live listing and products/p17: one sheet of paper, three folds and one
// cut make an 8-page booklet that fits a shirt pocket, no glue; hike pages have weather boxes (sun, cloud, rain, snow,
// wind) and short prompts (best view, trail snack verdict); the Gift edition has a trail promise ("a hike together").
// End card = real Shopify cover (products/pocket-trail-log.jpg, boxed photo card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Sky, Svg } from "../cine";
import { Subject } from "../fall";
import { Room, WindowView } from "../home";
import { Desk, INK, PAPER } from "../trip";
import { PenTip } from "../peak";
import { FrostTrail, WGOLD, WinterBackdrop } from "../winter";
import vo from "../vo/v121.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.4) 45%, rgba(12,22,28,0.4) 70%, rgba(12,22,28,0) 100%)" }} />
);

const NIGHT: Sky = { top: "#1f2e4c", mid: "#4a5a7a", low: "#9aa6b8", sun: [800, 620], sunR: 26, sunCol: "#eef0f4", glow: "#b8c0cc" };
const LAMP = "255,200,140";
const PEN = "#2a3a8a";

const ANA: Outfit = {
  ...GUIDE,
  skin: "#E2AE8C",
  skinShade: "#C48F6E",
  hair: "#3a2416",
  ponytail: "#3a2416",
  beard: null,
  cap: "#3a2416",
  capShade: "#24160c",
  jacket: "#B83A55",
  jacketShade: "#8E2B42",
  pants: "#4a4f57",
  pantsShade: "#363a40",
  glove: null,
};
const ANA_H: Outfit = { ...ANA, jacket: "#2C6E63", jacketShade: "#1f5249", cap: "#c9662e", capShade: "#a04f22", pack: "#c9662e", packShade: "#a04f22" };
const LEA: Outfit = {
  ...JAKE,
  skin: "#9A6A4C",
  skinShade: "#7E5338",
  hair: "#1a120c",
  beard: null,
  cap: "#E3B23C",
  capShade: "#b88d26",
  jacket: "#4f6f8f",
  jacketShade: "#3c5670",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  pack: "#6a8a5a",
  packShade: "#526c45",
  glove: null,
};

const Stocking: React.FC<{ x: number; y: number; s?: number; sway?: number; paper?: number }> = ({ x, y, s = 1, sway = 0, paper = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${sway}) scale(${s})`}>
    {paper > 0 && (
      <g transform={`translate(10,${-40 - paper * 90}) rotate(-8)`}>
        <rect x={-70} y={-110} width={140} height={190} rx={4} fill={PAPER} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-50} y={-80 + i * 34} width={i === 3 ? 60 : 100} height={10} rx={4} fill="#c9c0b0" />
        ))}
      </g>
    )}
    <path d="M-90,0 L90,0 L90,260 Q90,330 160,350 Q230,370 220,430 Q210,480 140,470 L-20,440 Q-90,420 -90,340 Z" fill="#B83A55" />
    <path d="M-90,0 L90,0 L90,260 Q90,330 160,350" fill="none" stroke="#8E2B42" strokeWidth={10} opacity={0.5} />
    <rect x={-110} y={-70} width={220} height={90} rx={30} fill="#f7f2e8" />
    <rect x={-6} y={-130} width={12} height={70} fill="#7a5a3a" />
  </g>
);

const Mantel: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-200} y={y} width={1480} height={50} rx={8} fill="#7a5236" />
    <rect x={-200} y={y + 50} width={1480} height={18} fill="#5a3a24" />
    {Array.from({ length: 12 }, (_, i) => (
      <circle key={i} cx={-100 + i * 110} cy={y + 64 + (i % 2) * 14} r={9} fill={["#ffd27a", "#ff8a6a", "#9ad0ff"][i % 3]} />
    ))}
  </Svg>
);

// ============ S1 HOOK CLOSE-UP: a stocking on the mantel, one sheet of paper rising out (0 - 2.5) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, t / 2.5), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1810" }}>
      <Plane cam={cam} depth={0.6} blur={10}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill="#6a4a36" />
          <circle cx={200} cy={500} r={420} fill="rgba(255,210,150,0.35)" />
          <Pine x={900} y={1500} h={1000} c="#2f5446" c2="#24443a" />
          {Array.from({ length: 14 }, (_, i) => (
            <circle key={i} cx={800 + ((i * 53) % 220)} cy={700 + i * 55} r={14} fill={["#ffd27a", "#ff8a6a", "#9ad0ff"][i % 3]} />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Mantel y={900} />
        <Subject rimX={-5} col="rgba(255,214,160,0.7)">
          <Svg>
            <Stocking x={500} y={1040} s={1.5} sway={Math.sin(t * 2) * 2} paper={1} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1211} n={14} col="#ffe2a8" fall={4} />
      <Grade sunX={300} sunY={600} warm={LAMP} cool="30,30,60" vignette={0.6} />
      <Title text={"Her gift for\na hiker: one\nsheet of paper."} t={t} t0={0} top={110} size={118} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: Ana in the living room, thinking about a small gift (2.5 - 5.33) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 12, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.83), rot: hh.rot };
  const floorY = 1700;
  const p: HikerProps = { x: 640, y: floorY, scale: 2.6, walk: 0, lean: 0.02, poles: false, handOverride: [60, -60], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill style={{ background: "#1a120c" }}>
      <Plane cam={cam} depth={0.8} blur={2.5}>
        <WindowView x={560} y={340} w={380} h={460} sky={NIGHT} uid="b" snow />
        <Room floorY={floorY} win={[560, 340, 380, 460]} wall="#cdb89a" lamp={[180, 560]} />
        <Svg>
          <Stocking x={60} y={1000} s={0.8} />
          <Stocking x={250} y={1000} s={0.8} />
          <rect x={-200} y={900} width={600} height={30} rx={6} fill="#7a5236" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,180,0.8)">
          <Person {...p} outfit={ANA} expression="neutral" noPack />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={300} />
      </Plane>
      <Particles seed={1212} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={300} sunY={600} warm={LAMP} />
      <Readout label="GIFT FOR" value="Her hiking friend" ok={null} t={t} t0={2.6} x={60} y={200} />
      <Chip text="Has to fit a stocking" t={t} t0={3.75} x={60} y={490} icon="none" big />
    </AbsoluteFill>
  );
};

// The flat printed sheet: 8 mini pages, landscape (local units, centred).
const Sheet: React.FC<{ w: number; folds?: number; cut?: number }> = ({ w, folds = 0, cut = 0 }) => {
  const h = w * 0.77;
  const pw = w / 4;
  const ph = h / 2;
  return (
    <g>
      <rect x={-w / 2 + 10} y={-h / 2 + 16} width={w} height={h} fill="rgba(0,0,0,0.28)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} fill={PAPER} />
      {Array.from({ length: 8 }, (_, i) => {
        const cx = -w / 2 + (i % 4) * pw;
        const cy = -h / 2 + Math.floor(i / 4) * ph;
        return (
          <g key={i}>
            <rect x={cx + pw * 0.12} y={cy + ph * 0.1} width={pw * 0.76} height={ph * 0.12} rx={4} fill={i === 0 ? "#3e5f4a" : "#d8d0c0"} />
            {[0, 1, 2, 3].map((j) => (
              <rect key={j} x={cx + pw * 0.12} y={cy + ph * (0.34 + j * 0.13)} width={pw * (j === 3 ? 0.4 : 0.76)} height={ph * 0.05} rx={3} fill="#e2dacb" />
            ))}
          </g>
        );
      })}
      {/* fold lines */}
      {[-pw, 0, pw].map((x, i) => (
        <line key={i} x1={x} y1={-h / 2} x2={x} y2={h / 2} stroke="#3e7d4f" strokeWidth={6} strokeDasharray="18 12" opacity={folds > 0 ? 1 : 0.25} />
      ))}
      <line x1={-w / 2} y1={0} x2={w / 2} y2={0} stroke="#3e7d4f" strokeWidth={6} strokeDasharray="18 12" opacity={folds > 0 ? 1 : 0.25} />
      {/* the one cut, in the middle */}
      <line x1={-pw} y1={0} x2={mix(-pw, pw, cut)} y2={0} stroke="#B83A55" strokeWidth={12} strokeLinecap="round" />
    </g>
  );
};

// ============ S3 CLOSE-UP: the printer pushes out one sheet (5.33 - 7.44) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 2.11), rot: hh.rot };
  const out = at(t, [5.5, 7.0], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,226,180,0.7)">
          <Svg>
            <g transform={`translate(540,${mix(860, 1180, out)})`}>
              <Sheet w={760} />
            </g>
            {/* printer body in front of the sheet's top edge */}
            <rect x={110} y={420} width={860} height={420} rx={40} fill="#e9e6e0" />
            <rect x={110} y={760} width={860} height={80} rx={20} fill="#c9c4bc" />
            <rect x={180} y={780} width={720} height={26} rx={10} fill="#2a2e34" />
            <circle cx={880} cy={520} r={18} fill="#3e7d4f" />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1213} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.6} />
      <Chip text="One sheet of paper" t={t} t0={5.6} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// Finished booklet: cover with a small mountain (local units, centred).
const Booklet: React.FC<{ w: number; open?: number }> = ({ w, open = 0 }) => {
  const h = w * 1.55;
  return (
    <g>
      <rect x={-w / 2 + 10} y={-h / 2 + 14} width={w} height={h} rx={6} fill="rgba(0,0,0,0.3)" />
      {open > 0 && (
        <g transform={`translate(${-w / 2},0) scale(${-open},1) translate(${w / 2},0)`}>
          <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={6} fill="#efe8da" />
        </g>
      )}
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={6} fill="#2f5446" />
      <path d={`M${-w * 0.36},${h * 0.05} L${-w * 0.1},${-h * 0.14} L${w * 0.05},${-h * 0.03} L${w * 0.2},${-h * 0.12} L${w * 0.38},${h * 0.05} Z`} fill="#8fb0a0" />
      <path d={`M${-w * 0.1},${-h * 0.14} L${-w * 0.03},${-h * 0.09} L${-w * 0.17},${-h * 0.09} Z`} fill="#f7f2e8" />
      <text x={0} y={h * 0.22} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={w * 0.16} fill={PAPER} letterSpacing={2}>
        TRAIL LOG
      </text>
      <rect x={-w * 0.3} y={h * 0.28} width={w * 0.6} height={w * 0.05} rx={3} fill="rgba(247,242,232,0.5)" />
    </g>
  );
};

// ============ S4 CLOSE-UP: three folds, one cut, no glue (7.44 - 9.9) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const snip = at(t, [8.14, 8.24, 8.5], [0, 1, 0]);
  const hh = handheld(t, 0.3, snip * 2);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 2.46), rot: hh.rot };
  const folds = at(t, [7.45, 7.8], [0, 1]);
  const cut = at(t, [8.14, 8.6], [0, 1]);
  const pw = 760 / 4;
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,226,180,0.7)">
          <Svg>
            <g transform="translate(540,1000)">
              <Sheet w={760} folds={folds} cut={cut} />
              {/* scissors moving along the cut */}
              {t > 8.0 && (
                <g transform={`translate(${mix(-pw, pw, cut) + 30},0) rotate(${snip * 12})`} opacity={at(t, [8.0, 8.1, 9.2, 9.4], [0, 1, 1, 0])}>
                  <path d="M0,0 L120,-26 L124,-14 Z" fill="#c9d0d6" />
                  <path d="M0,0 L120,26 L124,14 Z" fill="#aab2b8" />
                  <circle cx={150} cy={-34} r={28} fill="none" stroke="#c23a32" strokeWidth={14} />
                  <circle cx={150} cy={34} r={28} fill="none" stroke="#c23a32" strokeWidth={14} />
                </g>
              )}
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1214} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.6} />
      <Chip text="Three folds" t={t} t0={7.45} x={60} y={200} icon="check" big />
      <Chip text="One cut" t={t} t0={8.14} x={60} y={330} icon="check" big />
      <Chip text="No glue" t={t} t0={8.72} x={60} y={460} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: it becomes an 8-page booklet, the pages flip (9.9 - 12.2) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.1, at(lt, [0, 1.2], [0, 1], outExpo)), rot: hh.rot };
  const pop = at(t, [9.9, 10.4], [0, 1], outExpo);
  const flip = (t - 10.8) > 0 ? ((t - 10.8) * 1.6) % 1 : 0;
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,226,180,0.8)">
          <Svg>
            <g transform={`translate(560,960) scale(${mix(0.6, 1, pop)}) rotate(-4)`}>
              <Booklet w={460} open={flip} />
            </g>
            {/* fingers holding the booklet */}
            <ellipse cx={330} cy={1180} rx={70} ry={44} fill={ANA.skin} transform="rotate(-20 330 1180)" />
            <ellipse cx={330} cy={1240} rx={64} ry={40} fill={ANA.skinShade} transform="rotate(-20 330 1240)" />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1215} n={12} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.55} />
      <Readout label="ONE SHEET BECOMES" value="An 8-page trail log" ok={true} t={t} t0={10.64} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: it slips into a shirt pocket (12.2 - 14.54) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.34), rot: hh.rot };
  const drop = at(t, [12.3, 13.3], [0, 1], outExpo);
  const SHIRT = "#7a4a3a";
  const SHIRT2 = "#5e382c";
  return (
    <AbsoluteFill style={{ background: SHIRT }}>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-200} y={-200} width={1480} height={2400} fill={SHIRT} />
          {Array.from({ length: 14 }, (_, i) => (
            <rect key={i} x={-200 + i * 110} y={-200} width={24} height={2400} fill={SHIRT2} opacity={0.5} />
          ))}
          {Array.from({ length: 22 }, (_, i) => (
            <rect key={`h${i}`} x={-200} y={-200 + i * 110} width={1480} height={24} fill={SHIRT2} opacity={0.4} />
          ))}
          <defs>
            <clipPath id="sp">
              <rect x={0} y={-200} width={1080} height={1200} />
            </clipPath>
          </defs>
          <g clipPath="url(#sp)">
            <g transform={`translate(540,${mix(600, 1030, drop)}) rotate(-3)`}>
              <Booklet w={300} />
            </g>
          </g>
          {/* pocket in front */}
          <path d="M280,1000 L800,1000 L800,1480 Q540,1560 280,1480 Z" fill={SHIRT} stroke={SHIRT2} strokeWidth={10} />
          {Array.from({ length: 5 }, (_, i) => (
            <rect key={i} x={280} y={1010 + i * 100} width={520} height={20} fill={SHIRT2} opacity={0.4} />
          ))}
          <path d="M280,1000 L800,1000" stroke="#3e2418" strokeWidth={16} strokeLinecap="round" />
          <circle cx={540} cy={960} r={16} fill="#e9e0cc" />
        </Svg>
      </Plane>
      <LowScrim />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.55} />
      <Chip text="Fits a shirt pocket" t={t} t0={12.84} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// Inside page: one hike with weather boxes and prompts.
const WX = ["SUN", "CLOUD", "RAIN", "SNOW", "WIND"];
const HikePage: React.FC<{ t: number; w: number }> = ({ t, w }) => {
  const h = w * 1.4;
  const tick = at(t, [16.0, 16.3], [0, 1]);
  const view = at(t, [16.7, 17.3], [0, 1]);
  const snack = at(t, [17.35, 17.95], [0, 1]);
  return (
    <g>
      <rect x={12} y={16} width={w} height={h} rx={10} fill="rgba(0,0,0,0.3)" />
      <rect x={0} y={0} width={w} height={h} rx={10} fill={PAPER} />
      <text x={40} y={90} fontFamily={HEAD} fontWeight={800} fontSize={64} fill={INK} letterSpacing={2}>
        HIKE 1
      </text>
      <text x={w - 40} y={90} textAnchor="end" fontFamily={HEAD} fontWeight={700} fontSize={40} fill="#8a8f88">
        OF 5
      </text>
      <line x1={40} y1={120} x2={w - 40} y2={120} stroke={INK} strokeWidth={4} />
      {WX.map((n, i) => {
        const x = 40 + i * ((w - 80) / 5);
        const bw = (w - 80) / 5 - 14;
        return (
          <g key={n}>
            <rect x={x} y={160} width={bw} height={bw} rx={8} fill="none" stroke="#9aa09a" strokeWidth={4} />
            {i === 0 && tick > 0 && <path d={`M${x + 14},${160 + bw * 0.5} L${x + bw * 0.42},${160 + bw - 16} L${x + bw - 12},${172}`} stroke={PEN} strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray={200} strokeDashoffset={200 * (1 - tick)} />}
            <text x={x + bw / 2} y={160 + bw + 40} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={26} fill="#5b625c">
              {n}
            </text>
          </g>
        );
      })}
      <text x={40} y={400} fontFamily={HEAD} fontWeight={800} fontSize={38} fill="#5b625c" letterSpacing={1}>
        BEST VIEW TODAY
      </text>
      <line x1={40} y1={470} x2={w - 40} y2={470} stroke="#d8d0c0" strokeWidth={3} />
      <text x={40} y={455} fontFamily="Caveat, Inter" fontStyle="italic" fontWeight={600} fontSize={42} fill={PEN} opacity={view}>
        frozen falls from the bridge
      </text>
      <text x={40} y={560} fontFamily={HEAD} fontWeight={800} fontSize={38} fill="#5b625c" letterSpacing={1}>
        TRAIL SNACK VERDICT
      </text>
      <line x1={40} y1={630} x2={w - 40} y2={630} stroke="#d8d0c0" strokeWidth={3} />
      <text x={40} y={615} fontFamily="Caveat, Inter" fontStyle="italic" fontWeight={600} fontSize={42} fill={PEN} opacity={snack}>
        peanut butter cups, 10/10
      </text>
    </g>
  );
};

// ============ S7 CLOSE-UP: a hike page: weather, view, snack verdict (14.54 - 18.56) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(-20, 20, lt / 4.02), zoom: mix(1.02, 1.08, lt / 4.02), rot: hh.rot };
  const px = t < 16.4 ? 330 : t < 17.2 ? mix(330, 700, at(t, [16.6, 17.2], [0, 1])) : mix(140, 640, at(t, [17.35, 17.95], [0, 1]));
  const py = t < 16.4 ? 820 : t < 17.2 ? 1060 : 1220;
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,226,180,0.8)">
          <Svg>
            <g transform="translate(190,560) rotate(-2) scale(0.9)">
              <HikePage t={t} w={780} />
            </g>
            <PenTip x={px} y={py} s={1.4} rot={-30} skin={ANA.skin} wig={t} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1217} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.55} />
      <Chip text="Five hikes" t={t} t0={14.55} x={60} y={200} icon="check" big />
      <Chip text="Weather, view, snack verdict" t={t} t0={15.95} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: the promise: "a hike together", written on the back page (18.56 - 22.04) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 3.48), rot: hh.rot };
  const wr = at(t, [20.2, 21.3], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={1}>
        <Desk y={-200} />
        <Subject rimX={-4} col="rgba(255,226,180,0.8)">
          <Svg>
            <g transform="translate(170,520) rotate(2)">
              <rect x={12} y={16} width={740} height={980} rx={10} fill="rgba(0,0,0,0.3)" />
              <rect x={0} y={0} width={740} height={980} rx={10} fill={PAPER} />
              <text x={370} y={130} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={60} fill={INK} letterSpacing={3}>
                A PROMISE
              </text>
              <line x1={60} y1={170} x2={680} y2={170} stroke={INK} strokeWidth={4} />
              {["A ride to the trailhead", "Trail snacks on me", "A hike together"].map((s, i) => (
                <g key={s}>
                  <rect x={70} y={250 + i * 120} width={60} height={60} rx={8} fill="none" stroke="#9aa09a" strokeWidth={4} />
                  <text x={160} y={296 + i * 120} fontFamily="Inter" fontWeight={600} fontSize={40} fill="#3a423b">
                    {s}
                  </text>
                </g>
              ))}
              {wr > 0 && <path d="M80,510 L100,546 L140,486" stroke={PEN} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray={140} strokeDashoffset={140 * (1 - Math.min(1, wr * 3))} />}
              <line x1={70} y1={880} x2={670} y2={880} stroke="#d8d0c0" strokeWidth={3} />
              <defs>
                <clipPath id="wrc">
                  <rect x={60} y={760} width={620 * wr} height={140} />
                </clipPath>
              </defs>
              <text x={80} y={860} clipPath="url(#wrc)" fontFamily="Caveat, Inter" fontStyle="italic" fontWeight={600} fontSize={64} fill={PEN}>
                Love, Ana. Pick a trail!
              </text>
            </g>
            <PenTip x={mix(260, 800, wr)} y={1390} s={1.4} rot={-30} skin={ANA.skin} wig={t * wr} />
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1218} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm={LAMP} vignette={0.55} />
      <Chip text="On the back page" t={t} t0={18.8} x={60} y={200} icon="none" big />
      <Chip text="A hike together" t={t} t0={20.56} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF WIDE: late winter, the two friends on the trail, log in hand (22.04 - 23.9) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 24, y: hh.y, zoom: at(lt, [0, 1.2], [1.14, 1.04], outExpo), rot: hh.rot };
  const g = 1560;
  const a: HikerProps = { x: 320 + lt * 60, y: g + 120, scale: 2.3, phase: t * 5, walk: 0.8, lean: 0.06, poles: false, breathe: 0 };
  const b: HikerProps = { x: 590 + lt * 60, y: g + 130, scale: 2.3, phase: t * 5 + 1.6, walk: 0.8, lean: 0.06, poles: false, breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="i" treeY={g - 80} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 120} snow={0.4} />
        <Subject rimX={6} col="rgba(255,226,170,0.9)">
          <Person {...a} outfit={ANA_H} expression="happy" />
          <Person {...b} outfit={LEA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#2a3a2c" side="right" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1] - 100} strength={0.4} col="255,236,200" />
      <Particles seed={1219} n={20} col="#fff1d6" fall={4} />
      <LowScrim />
      <Grade sunX={760} sunY={640} warm="255,226,180" />
      <Readout label="FIVE HIKES LOGGED" value="By March" ok={true} t={t} t0={22.23} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/pocket-trail-log.jpg"
      photoH={800}
      spec="PRINT AND FOLD · 8-PAGE BOOKLETS · LETTER + A4"
      name={
        <>
          Pocket
          <br />
          Trail Log
        </>
      }
      nameSize={100}
      price="$3.99"
      save="Save this for your gift list"
    />
  );
};

export const V121: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.55} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.5} to={5.38} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.5} />
    </Scene>
    <Scene from={5.33} to={7.49} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.33} />
    </Scene>
    <Scene from={7.44} to={9.95} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.44} />
    </Scene>
    <Scene from={9.9} to={12.25} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={9.9} />
    </Scene>
    <Scene from={12.2} to={14.59} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={12.2} />
    </Scene>
    <Scene from={14.54} to={18.61} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={14.54} />
    </Scene>
    <Scene from={18.56} to={22.09} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={18.56} />
    </Scene>
    <Scene from={22.04} to={24.05} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={22.04} />
    </Scene>
    <Scene from={23.85} to={27.5} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.5, 1560],
        [2.5, 5.33, 1560],
        [5.33, 7.44, 1560],
        [7.44, 9.9, 1560],
        [9.9, 12.2, 1560],
        [12.2, 14.54, 1700],
        [14.54, 18.56, 1600],
        [18.56, 22.04, 1640],
        [22.04, 23.85, 1560],
      ]}
    />
  </AbsoluteFill>
);
