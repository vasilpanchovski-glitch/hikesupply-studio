// V79: "His water filter froze overnight" in the cinematic C01 style, frosty November camp.
// Advice from the live Shopify product page (Care): don't let it freeze while wet, ice can crack the internal membrane.
// Shake it out after use, keep it in an inside pocket by day and in the sleeping bag at night, replace it if it freezes wet.
// No virus claims. End card = Personal Water Filter Straw — 4-Stage 0.01 Micron, $19.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, rim, Svg } from "../cine";
import { DAWN, FrostTrail, SNOW, SNOW2, WGOLD, WINTER, WinterBackdrop } from "../winter";
import { Breath } from "../fall";
import vo from "../vo/v79.json";

const words = vo.words as unknown as Word[];

const NATE: Outfit = {
  ...JAKE,
  skin: "#C99572",
  skinShade: "#A9765A",
  hair: "#2a1d14",
  beard: "#2a1d14",
  cap: "#2F5D3E",
  capShade: "#244a31",
  jacket: "#D07A2A",
  jacketShade: "#A85F1C",
  pants: "#3f4650",
  pantsShade: "#2e343c",
  pack: "#2F5D8A",
  packShade: "#244a6f",
  glove: null,
};

const BLUE = "#9CCBEA";
const BLUE_D = "#78ABD0";
const CAP = "#2840B0";
const CAP_D = "#1c2f86";

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Straw filter, vertical, centred at (0,0), 300 long in local units. frost 0..1, ice 0..1 (frozen solid look).
const Straw: React.FC<{ x: number; y: number; s?: number; rot?: number; frost?: number; ice?: number }> = ({ x, y, s = 1, rot = 0, frost = 0, ice = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-14} y={-160} width={28} height={30} rx={8} fill={CAP} />
    <path d="M-34,-132 L34,-132 L34,-104 L-34,-104 Z" fill={CAP} />
    <rect x={-34} y={-110} width={68} height={8} fill={CAP_D} />
    <rect x={-30} y={-104} width={60} height={210} fill={BLUE} />
    <rect x={10} y={-104} width={20} height={210} fill={BLUE_D} />
    <rect x={-22} y={-100} width={8} height={200} rx={4} fill="#ffffff" opacity={0.45} />
    <rect x={-36} y={104} width={72} height={46} rx={8} fill={CAP} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={-30 + i * 17} y={110} width={6} height={34} fill={CAP_D} />
    ))}
    {frost > 0 && (
      <g opacity={frost}>
        <rect x={-36} y={-134} width={72} height={286} rx={10} fill="#eaf6ff" opacity={0.35 + ice * 0.25} />
        {Array.from({ length: 22 }, (_, i) => {
          const cx = -28 + ((i * 37) % 58);
          const cy = -125 + ((i * 53) % 270);
          const r = 5 + (i % 3) * 3;
          return (
            <g key={i} transform={`translate(${cx},${cy}) rotate(${i * 27})`} stroke="#ffffff" strokeWidth={2.4} opacity={0.9}>
              <line x1={-r} y1={0} x2={r} y2={0} />
              <line x1={-r * 0.5} y1={-r * 0.87} x2={r * 0.5} y2={r * 0.87} />
              <line x1={-r * 0.5} y1={r * 0.87} x2={r * 0.5} y2={-r * 0.87} />
            </g>
          );
        })}
      </g>
    )}
  </g>
);

// Water bottle with the straw filter screwed on top (local, base at 0).
const BottleStraw: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-40} y={-170} width={80} height={170} rx={20} fill="#cfe6f2" opacity={0.85} />
    <rect x={-40} y={-90} width={80} height={90} rx={16} fill="#8fc1e0" opacity={0.7} />
    <Straw x={0} y={-240} s={0.45} />
  </g>
);

// Backpack side, close-up with a mesh side pocket (screen units).
const PackSide: React.FC<{ y: number; frost: number }> = ({ y, frost }) => (
  <g>
    <path d={`M-100,${y - 900} Q540,${y - 980} 1180,${y - 900} L1180,${y + 700} L-100,${y + 700} Z`} fill={NATE.pack} />
    <path d={`M-100,${y - 640} L1180,${y - 660}`} stroke={NATE.packShade} strokeWidth={22} />
    <path d={`M-100,${y - 600} L1180,${y - 620}`} stroke="#d9d9d9" strokeWidth={6} strokeDasharray="20 16" opacity={0.5} />
    {/* frost dusting on the fabric */}
    <rect x={-100} y={y - 980} width={1300} height={1700} fill="#eef6fb" opacity={0.22 * frost} />
  </g>
);

const MeshFront: React.FC<{ y: number; frost: number }> = ({ y, frost }) => (
  <g>
    <path d={`M150,${y - 120} Q540,${y - 170} 930,${y - 120} L960,${y + 380} Q540,${y + 440} 120,${y + 380} Z`} fill="#1d2f44" opacity={0.55} />
    {Array.from({ length: 13 }, (_, i) => (
      <line key={`a${i}`} x1={140 + i * 66} y1={y - 140} x2={120 + i * 66 + 40} y2={y + 400} stroke="#3c5470" strokeWidth={5} opacity={0.9} />
    ))}
    {Array.from({ length: 9 }, (_, i) => (
      <line key={`b${i}`} x1={130} y1={y - 110 + i * 60} x2={950} y2={y - 110 + i * 60} stroke="#3c5470" strokeWidth={5} opacity={0.9} />
    ))}
    <path d={`M150,${y - 120} Q540,${y - 170} 930,${y - 120}`} stroke="#203a56" strokeWidth={26} fill="none" strokeLinecap="round" />
    <path d={`M150,${y - 120} Q540,${y - 170} 930,${y - 120}`} stroke="#ffffff" strokeWidth={26} fill="none" strokeLinecap="round" opacity={0.5 * frost} />
  </g>
);

// Campfire (screen units, base centre).
const Fire: React.FC<{ x: number; y: number; s?: number; t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <circle cx={0} cy={-80} r={260} fill="#ffb05a" opacity={0.16} />
    <circle cx={0} cy={-60} r={150} fill="#ffc77a" opacity={0.22} />
    {[[-90, 0], [90, 0], [0, 10]].map(([dx, dy], i) => (
      <rect key={i} x={-110} y={-18} width={220} height={36} rx={18} fill={i === 2 ? "#5a3e2a" : "#6b4a2e"} transform={`translate(${dx * 0.3},${dy}) rotate(${i === 0 ? 18 : i === 1 ? -18 : 0})`} />
    ))}
    {[0, 1, 2, 3, 4].map((i) => {
      const f = Math.sin(t * 9 + i * 1.7) * 0.15 + 1;
      const h = (i === 2 ? 190 : 120 - Math.abs(i - 2) * 20) * f;
      const dx = (i - 2) * 34;
      return <path key={i} d={`M${dx - 34},-10 Q${dx - 30},${-h * 0.6} ${dx + Math.sin(t * 6 + i) * 12},${-h} Q${dx + 30},${-h * 0.6} ${dx + 34},-10 Z`} fill={i % 2 ? "#ffb347" : "#f06b2a"} />;
    })}
    {[0, 1].map((i) => (
      <path key={i} d={`M${-16 + i * 30},-10 Q${-12 + i * 30},-70 ${i * 30},-${90 + Math.sin(t * 11 + i) * 14} Q${12 + i * 30},-70 ${16 + i * 30},-10 Z`} fill="#ffe08a" />
    ))}
  </g>
);

// Sleeping bag on the tent floor, with the filter tucked inside (screen units).
const BagInTent: React.FC<{ t: number; tuck: number }> = ({ t, tuck }) => (
  <Svg>
    {/* tent walls */}
    <path d="M-100,0 L540,-200 L1180,0 L1180,2000 L-100,2000 Z" fill="#7a3a1c" />
    <path d="M540,-200 L-100,1500 L-100,0 Z" fill="#9b4e20" />
    <path d="M540,-200 L1180,1500 L1180,0 Z" fill="#8a4419" />
    <rect x={-100} y={1250} width={1300} height={800} fill="#5a2c14" />
    {/* sleeping bag */}
    <path d="M60,1080 Q60,880 300,860 L860,840 Q1040,850 1050,1000 L1050,1400 Q1040,1560 860,1560 L240,1560 Q60,1540 60,1380 Z" fill="#2F7F86" />
    <path d="M120,1000 Q540,930 1000,960" stroke="#256870" strokeWidth={16} fill="none" />
    {[0, 1, 2, 3].map((i) => (
      <path key={i} d={`M${220 + i * 200},880 Q${200 + i * 200},1220 ${230 + i * 200},1550`} stroke="#256870" strokeWidth={10} fill="none" />
    ))}
    {/* opening with the filter going in */}
    <path d="M140,1010 Q300,900 560,930 Q560,1050 300,1090 Q170,1100 140,1010 Z" fill="#1c4a4f" />
    <g opacity={1 - tuck * 0.8}>
      <Straw x={mix(700, 340, tuck)} y={mix(600, 1000, tuck)} s={1.4} rot={mix(-30, -70, tuck)} />
    </g>
    {tuck > 0.6 && (
      <g opacity={at(t, [16.9, 17.3], [0, 1])}>
        <path d="M200,1000 Q330,960 460,990" stroke="#ffe7b8" strokeWidth={6} fill="none" strokeDasharray="12 10" />
      </g>
    )}
    {/* headlamp glow */}
    <circle cx={540} cy={700} r={420} fill="#ffdca0" opacity={0.12} />
  </Svg>
);

// ============ S1 HOOK CLOSE-UP: frosted filter in the mesh side pocket (0 - 4.36) ============
const S1: React.FC = () => {
  const t = useT();
  const frost = at(t, [0, 2.6], [0.55, 1]);
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, t / 4.3), rot: hh.rot };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="a" treeY={1000} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <PackSide y={1320} frost={frost} />
        </Svg>
        <Subject rimX={-5} col="rgba(255,220,180,0.8)">
          <Straw x={560} y={1120} s={2.2} rot={8} frost={frost} ice={frost} />
        </Subject>
        <Svg>
          <MeshFront y={1300} frost={frost} />
        </Svg>
      </Plane>
      <Particles seed={791} n={22} col="#ffffff" fall={30} />
      <Rays x={DAWN.sun[0]} y={DAWN.sun[1]} strength={0.18} col="255,224,190" />
      <Grade sunX={300} sunY={760} warm="255,214,180" cool="20,40,70" vignette={0.6} />
      <Title text={"His water\nfilter froze\novernight"} t={t} t0={0} top={120} size={128} />
      <Chip text="Side pocket, all night" t={t} t0={2.2} x={80} y={1400} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: camp at dawn, frozen solid (4.36 - 6.5) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x - lt * 15, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.1), rot: hh.rot };
  const g = 1400;
  const p: HikerProps = { x: 560, y: g + 182 * 2.3 - 130, scale: 2.3, walk: 0, lean: 0.12, poles: false, handOverride: [56, -40], breathe: Math.sin(t * 2.4) * 2 };
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="b" treeY={g + 10} blur={2} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 60} snow={0.6} />
        <Svg>
          <g transform={`translate(160,${g + 120})`}>
            <path d="M-300,0 L-40,-330 L260,0 Z" fill="#c2662e" />
            <path d="M-40,-330 L260,0 L330,0 L20,-330 Z" fill="#9b4e20" />
            <path d="M-150,0 L-40,-220 L70,0 Z" fill="#5a2c14" />
            <path d="M-300,0 L-40,-330 L-10,-300 L-260,0 Z" fill="#ffffff" opacity={0.35} />
          </g>
        </Svg>
        <Subject rimX={5} col="rgba(255,214,170,0.85)">
          <Person {...p} outfit={NATE} expression="tired" />
          <Breath p={p} t={t} />
          <g transform={hikerTransform(p)}>
            <Straw x={h[0] + 4} y={h[1] - 34} s={0.3} rot={-10} frost={1} ice={1} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Particles seed={792} n={18} col="#ffffff" fall={20} />
      <Grade sunX={300} sunY={760} warm="255,214,180" cool="20,40,70" />
      <Readout label="BY MORNING" value="Frozen solid" ok={false} t={t} t0={4.6} x={80} y={200} />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: face and frozen filter in the hand (6.5 - 8.9) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.4), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.04, poles: false, handOverride: [64, -66], breathe: Math.sin(t * 2.2) * 1.5 };
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="c" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,214,170,0.85)">
          <Person {...p} outfit={NATE} expression="tired" />
          <Breath p={p} t={t} />
          <g transform={hikerTransform(p)}>
            <Straw x={h[0] + 2} y={h[1] - 30} s={0.28} rot={6} frost={1} ice={1} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={793} n={14} col="#ffffff" fall={20} />
      <Grade sunX={300} sunY={760} warm="255,214,180" cool="20,40,70" vignette={0.6} />
      <Chip text="Froze while wet" t={t} t0={6.7} x={80} y={200} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CUTAWAY: crack inside, you can't see the damage (8.9 - 11.37) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.5), rot: hh.rot };
  const open = at(t, [9.0, 9.7], [0, 1], outExpo);
  const crack = at(t, [9.6, 10.5], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1150} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <g transform="translate(540,960) rotate(-90)">
            {/* outer shell on the left half, cut open on the right half */}
            <g transform="scale(3.1)">
              <Straw x={0} y={0} />
            </g>
            <g opacity={open}>
              <rect x={-90} y={-300} width={180} height={630} fill="#e8f2f8" />
              {Array.from({ length: 14 }, (_, i) => (
                <line key={i} x1={-80 + i * 12} y1={-290} x2={-80 + i * 12} y2={320} stroke="#c7d3db" strokeWidth={6} />
              ))}
              <rect x={-90} y={-300} width={180} height={630} fill="none" stroke={CAP} strokeWidth={8} />
              {/* hairline cracks */}
              <g opacity={crack}>
                <path d="M-70,-120 L-30,-80 L-50,-20 L0,30 L-20,90" stroke="#D9443A" strokeWidth={16} fill="none" strokeLinecap="round" strokeDasharray={420} strokeDashoffset={420 * (1 - crack)} />
                <path d="M40,-220 L10,-160 L50,-100 L30,-40" stroke="#D9443A" strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={300} strokeDashoffset={300 * (1 - crack)} />
                <path d="M60,120 L20,180 L50,250" stroke="#D9443A" strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={200} strokeDashoffset={200 * (1 - crack)} />
              </g>
            </g>
          </g>
        </Subject>
      </Plane>
      <Particles seed={794} n={12} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Readout label="OUTSIDE" value="Looks fine" ok={true} t={t} t0={9.0} x={80} y={200} />
      <Readout label="INSIDE" value="Can crack" ok={false} t={t} t0={9.8} x={80} y={1240} pulseAt={10.4} />
    </AbsoluteFill>
  );
};

// ============ S5 FIX CLOSE-UP: shake it out after use (11.37 - 13.8) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const shake = Math.sin(t * 28) * at(t, [12.2, 12.4, 13.5, 13.7], [0, 1, 1, 0]);
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.4), rot: hh.rot };
  const p: HikerProps = { x: 460, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: [70, -60 + shake * 8], breathe: Math.sin(t * 2.2) * 1.5 };
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={1250} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          <Person {...p} outfit={NATE} expression="neutral" />
          <g transform={hikerTransform(p)}>
            <Straw x={h[0] + 4} y={h[1] - 30} s={0.28} rot={-20 + shake * 18} />
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const k = ((t * 2.2 + i / 6) % 1) * at(t, [12.2, 12.5], [0, 1]);
              return <circle key={i} cx={h[0] + 10 + (i - 2.5) * 10 * (1 + k * 3)} cy={h[1] + 18 + k * 50} r={2.6} fill="#9fd3f5" opacity={1 - k} />;
            })}
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Particles seed={795} n={14} col="#fff3d6" fall={10} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Title text={"Keep it\nfrom freezing."} t={t} t0={off + 0.05} t1={12.6} top={170} size={130} />
      <Chip text="Shake it out after use" t={t} t0={12.6} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 MEDIUM: inside pocket by day (13.8 - 16.05) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 18, y: hh.y, zoom: mix(1.06, 1.12, lt / 2.25), rot: hh.rot };
  const g = 1400;
  const tuck = at(t, [14.2, 15.0], [0, 1], outExpo);
  const p: HikerProps = { x: 540, y: g + 182 * 2.3 - 130, scale: 2.3, walk: 0, lean: 0.06, poles: false, handOverride: [mix(60, 14, tuck), mix(-40, -86, tuck)], breathe: Math.sin(t * 2.4) * 2 };
  const geo = hikerGeometry(p);
  const h = geo.arms[1].hand;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={g + 10} blur={2} t={t} snow={0.7} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 60} snow={0.4} />
        <Subject rimX={5}>
          <Person {...p} outfit={NATE} expression="happy" />
          <g transform={hikerTransform(p)}>
            <g opacity={1 - at(t, [14.9, 15.1], [0, 1])}>
              <Straw x={h[0] + 2} y={h[1] - 26} s={0.26} rot={mix(-10, 20, tuck)} />
            </g>
            {/* chest pocket zip line, glows once the filter is in */}
            <path d={`M${geo.sh[0] - 6},${geo.sh[1] + 18} L${geo.sh[0] + 20},${geo.sh[1] + 30}`} stroke="#ffe7b8" strokeWidth={3} opacity={at(t, [15.0, 15.3], [0, 1])} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.22} />
      <Particles seed={796} n={18} col="#fff3d6" fall={10} />
      <Grade sunX={800} sunY={560} warm="255,226,190" />
      <Chip text="Inside pocket by day" t={t} t0={14.0} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: in your sleeping bag at night (16.05 - 17.89) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 1.85), rot: hh.rot };
  const tuck = at(t, [16.2, 17.0], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#2a1408" }}>
      <Plane cam={cam} depth={1}>
        <BagInTent t={t} tuck={tuck} />
      </Plane>
      <Particles seed={797} n={10} col="#ffe7b8" bokeh />
      <Grade sunX={540} sunY={700} warm="255,200,140" vignette={0.65} />
      <Chip text="In the sleeping bag at night" t={t} t0={16.2} x={60} y={200} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S8 CLOSE-UP: if it ever freezes wet, replace it (17.89 - 20.18) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.3), rot: hh.rot };
  const swap = at(t, [18.9, 19.5], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={1150} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M-100,1420 Q300,1340 700,1380 Q1000,1400 1200,1360 L1200,2000 L-100,2000 Z" fill="#8a8f96" />
          <path d="M-100,1420 Q300,1340 700,1380 Q1000,1400 1200,1360" stroke={SNOW} strokeWidth={30} fill="none" />
          <path d="M-100,1470 Q400,1430 1200,1440" stroke={SNOW2} strokeWidth={12} fill="none" />
        </Svg>
        <Subject rimX={-5}>
          <g opacity={1 - swap * 0.6} transform={`translate(${mix(540, 300, swap)},0)`}>
            <Straw x={0} y={1060} s={2} rot={-8} frost={1} ice={1} />
            <g opacity={swap}>
              <line x1={-110} y1={850} x2={110} y2={1270} stroke="#D9443A" strokeWidth={22} strokeLinecap="round" />
              <line x1={110} y1={850} x2={-110} y2={1270} stroke="#D9443A" strokeWidth={22} strokeLinecap="round" />
            </g>
          </g>
          <g opacity={swap} transform={`translate(${mix(1100, 780, swap)},0)`}>
            <Straw x={0} y={1060} s={2} rot={6} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={798} n={12} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Readout label="FROZE WET?" value="Replace it" ok={null} t={t} t0={18.0} x={80} y={200} pulseAt={19.0} />
    </AbsoluteFill>
  );
};

// ============ S9 PAYOFF MEDIUM: filtered stream water by the fire (20.18 - 22.85) ============
const S9: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 20, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.06], outExpo), rot: hh.rot };
  const g = 1400;
  const sip = at(t, [20.6, 21.2], [0, 1], outExpo);
  const p: HikerProps = { x: 640, y: g + 182 * 2.3 - 130, scale: 2.3, walk: 0, lean: -0.04, poles: false, handOverride: [mix(50, 34, sip), mix(-30, -140, sip)], breathe: Math.sin(t * 2) * 2 };
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="h" treeY={g + 10} t={t} snow={0.5} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 60} snow={0.3} />
        <Svg>
          {/* stream behind */}
          <path d={`M-100,${g + 40} Q300,${g + 10} 600,${g + 50} Q900,${g + 80} 1200,${g + 30} L1200,${g + 110} Q900,${g + 150} 600,${g + 120} Q300,${g + 90} -100,${g + 120} Z`} fill="#7fb3cf" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${((t * 80 + i * 380) % 1300) - 100},${g + 80} q40,-8 80,0`} stroke="#e6f4fb" strokeWidth={5} fill="none" opacity={0.7} />
          ))}
        </Svg>
        <Subject rimX={6} col="rgba(255,190,120,0.9)">
          <Person {...p} outfit={NATE} expression="happy" />
          <g transform={hikerTransform(p)}>
            <BottleStraw x={h[0] + 4} y={h[1] + 20} s={0.38} rot={mix(0, -70, sip)} />
          </g>
        </Subject>
        <Svg>
          <Fire x={250} y={g + 120} s={1.1} t={t} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={799} n={24} col="#ffe7b8" />
      <Grade sunX={760} sunY={640} warm="255,180,100" />
      <Chip text="Filter still works" t={t} t0={20.4} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

const S10: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/personal-water-filter-straw-cut.png"
      cutoutH={740}
      spec="4-STAGE · 0.01 MICRON · 2.8 OZ (80 G)"
      name={
        <>
          Water Filter
          <br />
          Straw
        </>
      }
      nameSize={108}
      price="$19.99"
      save="Save this before your next cold trip"
    />
  );
};

export const V79: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.41} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.36} to={6.55} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.36} />
    </Scene>
    <Scene from={6.5} to={8.95} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={6.5} />
    </Scene>
    <Scene from={8.9} to={11.42} fadeIn={0.08} fadeOut={0.1}>
      <S4 off={8.9} />
    </Scene>
    <Scene from={11.37} to={13.85} fadeIn={0.1} fadeOut={0.08}>
      <S5 off={11.37} />
    </Scene>
    <Scene from={13.8} to={16.1} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={13.8} />
    </Scene>
    <Scene from={16.05} to={17.94} fadeIn={0.08} fadeOut={0.08}>
      <S7 off={16.05} />
    </Scene>
    <Scene from={17.89} to={20.23} fadeIn={0.08} fadeOut={0.1}>
      <S8 off={17.89} />
    </Scene>
    <Scene from={20.18} to={22.95} fadeIn={0.12} fadeOut={0.12}>
      <S9 off={20.18} />
    </Scene>
    <Scene from={22.7} to={27.5} fadeOut={0}>
      <S10 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.36, 1560],
        [4.36, 6.5, 1560],
        [6.5, 11.37, 1560],
        [11.37, 13.8, 1560],
        [13.8, 16.05, 1560],
        [16.05, 17.89, 1560],
        [17.89, 20.18, 1560],
        [20.18, 22.7, 1560],
      ]}
    />
  </AbsoluteFill>
);
