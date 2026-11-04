// V97: "Twisted ankle. Two miles from the car." in the cinematic C01 style, snowy late-November trail.
// Advice (conservative, from the bivy listing FAQ): call for help, put on every dry layer and a hat, get off the cold ground
// (sit on your pack), then get into an emergency bivy: reflective lining sends body heat back, shell blocks the wind.
// It buys time, it is not insulation. No injury close-ups. End card = Emergency Bivy Sack, single $14.99 (live Shopify), real photo cut out.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Breath, Subject } from "../fall";
import { FrostTrail, SNOW, SNOW2, WINTER, STORM, WinterBackdrop } from "../winter";
import { Sky } from "../cine";
import vo from "../vo/v97.json";

const words = vo.words as unknown as Word[];

const DUSK: Sky = { top: "#2c3f63", mid: "#8c8fa8", low: "#e6b998", sun: [780, 700], sunR: 44, sunCol: "#fff0d8", glow: "#f2a878" };

const LEAH: Outfit = {
  ...JAKE,
  skin: "#E7B596",
  skinShade: "#C99478",
  hair: "#6a3f22",
  ponytail: "#6a3f22",
  beard: null,
  cap: "#6a3f22",
  capShade: "#55321b",
  jacket: "#2F6F8E",
  jacketShade: "#22546c",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: "#5B6B3A",
  packShade: "#46542C",
  boot: "#6B4630",
  glove: "#2a2a2a",
};
// After the fix: red beanie on.
const LEAH_HAT: Outfit = { ...LEAH, cap: "#B83A55", capShade: "#8E2B42" };

const MAYA: Outfit = {
  ...JAKE,
  skin: "#8E5B3E",
  skinShade: "#734631",
  hair: "#1d1410",
  ponytail: "#1d1410",
  beard: null,
  cap: "#C2662E",
  capShade: "#9a4f22",
  jacket: "#6b4a7a",
  jacketShade: "#52385e",
  pants: "#4a4f57",
  pantsShade: "#363a40",
  pack: "#3E4F5C",
  packShade: "#2C3943",
  glove: "#2a2a2a",
};

const ORANGE = "#E8642A";
const ORANGE2 = "#C24E1C";

// Screen position of the head for a Person (flip mirrors around p.x).
const headAt = (p: HikerProps, flip = false): [number, number] => {
  const s = p.scale ?? 1;
  const g = hikerGeometry(p);
  return [p.x + (flip ? -1 : 1) * g.head[0] * s, p.y - 182 * s + g.head[1] * s];
};

// Snow bank drawn in front of a sitting person (hides the legs).
const Bank: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <g>
    <path d={`M${x - w / 2},${y} C${x - w / 2},${y - h * 0.9} ${x - w * 0.2},${y - h} ${x},${y - h} C${x + w * 0.3},${y - h} ${x + w / 2},${y - h * 0.8} ${x + w / 2},${y} Z`} fill={SNOW} />
    <path d={`M${x + w * 0.1},${y - h} C${x + w * 0.3},${y - h} ${x + w / 2},${y - h * 0.8} ${x + w / 2},${y} L${x + w * 0.15},${y} Z`} fill={SNOW2} />
    <rect x={x - w / 2 - 200} y={y} width={w + 400} height={800} fill={SNOW2} />
  </g>
);

// Phone in a hand (screen coords).
const Phone: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-22} y={-40} width={44} height={80} rx={8} fill="#1d1f22" />
    <rect x={-17} y={-33} width={34} height={60} rx={4} fill="#7fb5d8" />
  </g>
);

// The orange bivy as a cocoon around a sitting person, top edge at (x, yTop), width w.
const Cocoon: React.FC<{ x: number; yTop: number; w: number; h: number; k?: number }> = ({ x, yTop, w, h, k = 1 }) => (
  <g opacity={k}>
    <path d={`M${x - w / 2},${yTop + 40} Q${x},${yTop - 30} ${x + w / 2},${yTop + 40} L${x + w / 2 + 30},${yTop + h} L${x - w / 2 - 30},${yTop + h} Z`} fill={ORANGE} />
    <path d={`M${x + w * 0.15},${yTop + 10} Q${x + w / 2},${yTop + 30} ${x + w / 2},${yTop + 40} L${x + w / 2 + 30},${yTop + h} L${x + w * 0.2},${yTop + h} Z`} fill={ORANGE2} />
    {[0.25, 0.5, 0.75].map((f) => (
      <path key={f} d={`M${x - w / 2 + 10},${yTop + h * f + 30} Q${x},${yTop + h * f} ${x + w / 2 + 10},${yTop + h * f + 30}`} stroke="rgba(0,0,0,0.12)" strokeWidth={6} fill="none" />
    ))}
    <path d={`M${x - w / 2},${yTop + 40} Q${x},${yTop - 30} ${x + w / 2},${yTop + 40}`} stroke="#d8dde2" strokeWidth={14} fill="none" />
  </g>
);

// ============ S1 HOOK: Leah sitting in the snow holding her ankle, Maya beside her (0 - 3.14) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.04, 1.1, t / 3.14), rot: hh.rot };
  const g = 1560;
  const seat = 1330;
  const s = 2.2;
  const leah: HikerProps = { x: 430, y: seat + 182 * s, scale: s, walk: 0, lean: 0.5, poles: false, handOverride: [96, 150], breathe: Math.sin(t * 3) * 1.2 };
  const maya: HikerProps = { x: 790, y: g, scale: 2.2, walk: 0, lean: 0.12, poles: false, handOverride: [60, 60], breathe: Math.sin(t * 2.4) * 1.2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={g - 200} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(240,244,250,0.9)">
          <Person {...maya} outfit={MAYA} expression="neutral" flip />
          <Person {...leah} outfit={LEAH} expression="tired" />
          <Breath p={leah} t={t} />
        </Subject>
        <Svg>
          <Bank x={420} y={g + 10} w={820} h={300} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Particles seed={971} n={22} col="#ffffff" fall={24} />
      <Grade sunX={820} sunY={520} warm="225,232,240" />
      <Title text={"Twisted ankle.\nTwo miles\nfrom the car."} t={t} t0={0} top={130} size={112} />
      <Chip text="2 miles to the car" t={t} t0={1.7} x={60} y={600} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: Maya on the phone calling for help (3.14 - 5.76) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 10, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.62), rot: hh.rot };
  const g = 1700;
  const s = 2.6;
  const maya: HikerProps = { x: 560, y: g, scale: s, walk: 0, lean: 0.04, poles: false, handOverride: [22, -92], breathe: Math.sin(t * 2.4) * 1.2 };
  const [hx, hy] = headAt(maya, true);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={g - 260} blur={4} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={-5} col="rgba(240,244,250,0.9)">
          <Person {...maya} outfit={MAYA} expression="neutral" flip />
          <Phone x={hx - 52} y={hy + 30} s={1.4} rot={-12} />
          <Breath p={maya} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Particles seed={972} n={22} col="#ffffff" fall={24} />
      <Grade sunX={820} sunY={520} warm="225,232,240" />
      <Chip text="Called for help" t={t} t0={3.4} x={60} y={200} icon="check" big />
      <Chip text="Now they wait" t={t} t0={4.5} x={60} y={330} big />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: Leah's face, shivering, breath in the cold (5.76 - 8.93) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 3.17), rot: hh.rot };
  const s = 4.4;
  const seat = 1560;
  const shiver = Math.sin(t * 46) * 4 * at(t, [6.8, 7.2], [0, 1]);
  const p: HikerProps = { x: 470 + shiver, y: seat + 182 * s, scale: s, walk: 0, lean: 0.1, poles: false, handOverride: [60, 40], breathe: Math.sin(t * 3) * 1 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={1250} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(230,238,250,0.9)">
          <Person {...p} outfit={LEAH} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Particles seed={973} n={26} col="#ffffff" fall={28} />
      <Grade sunX={820} sunY={520} warm="215,226,244" vignette={0.6} />
      <Chip text="Stopped moving" t={t} t0={5.9} x={60} y={200} icon="x" big />
      <Chip text="Shivering" t={t} t0={7.4} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: "Here's the fix" — extra dry layer zipped up, beanie pulled on (8.93 - 12.35) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.42), rot: hh.rot };
  const s = 4.4;
  const seat = 1600;
  const hatOn = at(t, [10.9, 11.5], [0, 1], outExpo);
  const layer = at(t, [9.9, 10.5], [0, 1], outExpo);
  const p: HikerProps = { x: 520, y: seat + 182 * s, scale: s, walk: 0, lean: 0.06, poles: false, handOverride: [50, -70 + 40 * layer], breathe: 0 };
  const [hx, hy] = headAt(p);
  const base: Outfit = layer > 0.5 ? { ...LEAH, jacket: "#3a3f46", jacketShade: "#2a2e33" } : LEAH;
  const outfit: Outfit = hatOn > 0.9 ? { ...base, cap: "#B83A55", capShade: "#8E2B42" } : base;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1250} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,190,0.9)">
          <Person {...p} outfit={outfit} expression="neutral" />
          {/* red beanie coming down onto the head */}
          <g transform={`translate(${hx},${mix(hy - 380, hy, hatOn)})`} opacity={at(t, [10.7, 10.9], [0, 1])}>
            <path d={`M${-30 * s},${-2 * s} Q${-30 * s},${-44 * s} 0,${-46 * s} Q${30 * s},${-44 * s} ${30 * s},${-2 * s} Z`} fill="#B83A55" />
            <rect x={-32 * s} y={-12 * s} width={64 * s} height={14 * s} rx={5 * s} fill="#8E2B42" />
            <circle cx={0} cy={-48 * s} r={9 * s} fill="#e9dfd4" />
          </g>
        </Subject>
      </Plane>
      <Particles seed={974} n={16} col="#ffffff" fall={18} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Title text={"Here's the fix."} t={t} t0={off + 0.02} t1={9.9} top={200} size={124} />
      <Chip text="Every dry layer" t={t} t0={10.0} x={60} y={200} icon="check" big />
      <Chip text="Hat on" t={t} t0={11.2} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 MEDIUM: off the snow, sitting on her pack (12.35 - 15.2) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.03, 1.09, lt / 2.85), rot: hh.rot };
  const g = 1600;
  const s = 2.4;
  const up = at(t, [13.4, 14.0], [0, 1], outExpo);
  const seat = g - 120 - up * 150;
  const p: HikerProps = { x: 480, y: seat + 182 * s, scale: s, walk: 0, lean: 0.18, poles: false, handOverride: [70, 120], breathe: Math.sin(t * 3) * 1 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="e" treeY={g - 220} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Subject rimX={5} col="rgba(255,236,210,0.9)">
          <Person {...p} outfit={LEAH_HAT} expression="neutral" noPack />
        </Subject>
        <Svg>
          {/* the pack she sits on */}
          <g opacity={up}>
            <rect x={340} y={seat - 10} width={300} height={g - seat + 20} rx={40} fill={LEAH.pack} />
            <rect x={360} y={seat + 20} width={260} height={30} rx={12} fill={LEAH.packShade} />
          </g>
          <Bank x={480} y={g + 20} w={720} h={170 + up * 10} />
          {/* cold ground glow before she moves */}
          <ellipse cx={480} cy={g - 30} rx={300} ry={40} fill="rgba(120,170,230,0.35)" opacity={1 - up} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Particles seed={975} n={18} col="#ffffff" fall={18} />
      <Grade sunX={800} sunY={560} warm="250,236,214" />
      <Chip text="Off the cold ground" t={t} t0={12.5} x={60} y={200} icon="check" big />
      <Chip text="Sit on your pack" t={t} t0={13.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: gloved hands pull the orange bivy out of its small bag (15.2 - 17.79) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 1.2], [1.1, 1.02], outExpo), rot: hh.rot };
  const open = at(t, [15.8, 17.0], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1250} blur={16} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6}>
          {/* unfolded sheet growing up and out */}
          <g transform={`translate(540,${1240}) scale(${mix(0.2, 1, open)},${mix(0.2, 1, open)})`} opacity={at(t, [15.8, 16.0], [0, 1])}>
            <path d="M-420,-520 Q0,-600 420,-520 L470,180 Q0,240 -470,180 Z" fill={ORANGE} />
            <path d="M80,-570 Q300,-560 420,-520 L470,180 Q280,210 120,220 Z" fill={ORANGE2} />
            {[-260, -40, 180].map((x) => (
              <path key={x} d={`M${x},-560 L${x + 30},210`} stroke="rgba(0,0,0,0.12)" strokeWidth={6} />
            ))}
          </g>
          {/* the small drawstring bag */}
          <g transform={`translate(${mix(540, 300, open)},${mix(1250, 1440, open)}) rotate(${mix(0, -18, open)})`}>
            <path d="M-110,-150 Q-120,-170 -90,-176 L90,-176 Q120,-170 110,-150 L120,130 Q120,160 90,160 L-90,160 Q-120,160 -120,130 Z" fill={ORANGE} />
            <path d="M30,-176 L90,-176 Q120,-170 110,-150 L120,130 Q120,160 90,160 L40,160 Z" fill={ORANGE2} />
            <rect x={-100} y={-180} width={200} height={26} rx={10} fill={ORANGE2} />
            <path d="M0,-178 q-30,-60 10,-90" stroke="#d9531f" strokeWidth={8} fill="none" />
            <rect x={-14} y={-210} width={28} height={36} rx={8} fill="#222" />
          </g>
          {/* arms in sleeves reaching in from the bottom corners, gloved hands holding the sheet's top corners */}
          {[-1, 1].map((side) => {
            const sc = mix(0.2, 1, open);
            const hx = 540 + side * 400 * sc;
            const hy = 1240 - 500 * sc;
            return (
              <g key={side}>
                <path d={`M${540 + side * 700},2100 Q${540 + side * 560},${hy + 500} ${hx},${hy + 40}`} stroke="#22546c" strokeWidth={130} fill="none" strokeLinecap="round" />
                <path d={`M${540 + side * 700},2100 Q${540 + side * 560},${hy + 500} ${hx},${hy + 40}`} stroke={LEAH.jacket} strokeWidth={100} fill="none" strokeLinecap="round" />
                <ellipse cx={hx} cy={hy} rx={62} ry={54} fill="#2a2a2a" />
                <ellipse cx={hx - side * 46} cy={hy - 18} rx={24} ry={34} fill="#2a2a2a" />
              </g>
            );
          })}
        </Subject>
      </Plane>
      <Particles seed={976} n={14} col="#ffffff" fall={16} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Chip text="Emergency bivy" t={t} t0={15.5} x={60} y={200} icon="check" big />
      <Chip text="Packs palm-size" t={t} t0={16.4} x={60} y={330} big />
    </AbsoluteFill>
  );
};

// ============ S7 MEDIUM-CLOSE: Leah inside the bivy, heat reflected back, wind blocked (17.79 - 21.03) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.24), rot: hh.rot };
  const s = 3.4;
  const seat = 1560;
  const p: HikerProps = { x: 540, y: seat + 182 * s, scale: s, walk: 0, lean: 0.06, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 2) * 1 };
  const [hx, hy] = headAt(p);
  const heat = at(t, [17.9, 18.4], [0, 1]);
  const wind = at(t, [19.4, 19.8], [0, 1]);
  const yTop = hy + 90;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={1250} blur={14} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col="rgba(255,226,190,0.9)">
          <Person {...p} outfit={LEAH_HAT} expression="neutral" noPack />
          <Cocoon x={hx - 20} yTop={yTop} w={560} h={1960 - yTop} />
          {/* heat arrows bouncing back inward */}
          {[0, 1, 2, 3].map((i) => {
            const k = (t * 0.8 + i / 4) % 1;
            const side = i % 2 === 0 ? -1 : 1;
            const y = yTop + 260 + (i >> 1) * 260;
            const x = hx - 20 + side * mix(60, 220, k < 0.5 ? k * 2 : 2 - k * 2);
            return <circle key={i} cx={x} cy={y} r={22} fill="#ffb06a" opacity={heat * 0.85} />;
          })}
          {/* wind lines hitting the shell and sliding off */}
          {[0, 1, 2, 3, 4].map((i) => {
            const k = (t * 1.1 + i / 5) % 1;
            const y = 900 + i * 170;
            const x0 = -200 + k * 520;
            return <path key={i} d={`M${x0},${y} h160`} stroke="#e8f2fa" strokeWidth={10} strokeLinecap="round" opacity={wind * (1 - k) * 0.9} />;
          })}
        </Subject>
      </Plane>
      <Particles seed={977} n={22} col="#ffffff" fall={30} />
      <Grade sunX={800} sunY={560} warm="255,220,180" vignette={0.55} />
      <Chip text="Heat reflects back" t={t} t0={18.2} x={60} y={200} icon="check" big />
      <Chip text="Blocks the wind" t={t} t0={19.6} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// Headlamp beams of the rescue team coming up the trail.
const Lamps: React.FC<{ t: number; k: number }> = ({ t, k }) => (
  <g opacity={k}>
    {[0, 1].map((i) => {
      const x = 900 + i * 110 - k * 80;
      const y = 1330 + i * 20 + Math.sin(t * 5 + i) * 4;
      return (
        <g key={i}>
          <path d={`M${x},${y} L${x - 420},${y + 120} L${x - 420},${y + 260} Z`} fill="rgba(255,244,210,0.18)" />
          <circle cx={x} cy={y} r={22} fill="rgba(255,244,210,0.45)" />
          <circle cx={x} cy={y} r={9} fill="#fffbe8" />
        </g>
      );
    })}
  </g>
);

// ============ S8 PAYOFF WIDE: dusk, Leah warm in the bivy, headlamps of the rescue team arrive (21.03 - 24.22) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 16, y: hh.y, zoom: at(lt, [0, 1.3], [1.12, 1.04], outExpo), rot: hh.rot };
  const g = 1560;
  const s = 2.1;
  const seat = g - 140;
  const leah: HikerProps = { x: 400, y: seat + 182 * s, scale: s, walk: 0, lean: 0.04, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 2) * 1 };
  const maya: HikerProps = { x: 640, y: g, scale: 2.1, walk: 0, lean: 0.02, poles: false, handOverride: [80, -40], breathe: 0 };
  const [hx, hy] = headAt(leah);
  const lamps = at(t, [21.4, 22.4], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DUSK} uid="h" treeY={g - 200} t={t} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g} snow={1} />
        <Svg>
          <Lamps t={t} k={lamps} />
        </Svg>
        <Subject rimX={-6} col="rgba(255,200,140,0.9)">
          <Person {...maya} outfit={MAYA} expression="happy" />
          <Person {...leah} outfit={LEAH_HAT} expression="happy" noPack />
          <Cocoon x={hx - 10} yTop={hy + 40} w={330} h={g + 20 - hy - 40} />
        </Subject>
        <Svg>
          <rect x={250} y={g - 10} width={300} height={40} rx={16} fill={LEAH.pack} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="both" />
      </Plane>
      <Rays x={DUSK.sun[0]} y={DUSK.sun[1]} strength={0.22} col="255,200,150" />
      <Particles seed={978} n={20} col="#ffffff" fall={12} />
      <Grade sunX={780} sunY={700} warm="255,190,140" />
      <Readout label="LEAH" value="Still warm" ok={true} t={t} t0={21.5} x={60} y={200} />
      <Chip text="Help arrives" t={t} t0={22.3} x={60} y={400} icon="check" big />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/emergency-bivy-sack-card-cut.png"
      cutoutH={760}
      spec="REFLECTIVE · WINDPROOF · PACKS PALM-SIZE"
      name={
        <>
          Emergency
          <br />
          Bivy Sack
        </>
      }
      nameSize={104}
      price="$14.99"
      save="Save this before your next winter hike"
    />
  );
};

export const V97: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.19} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.14} to={5.81} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.14} />
    </Scene>
    <Scene from={5.76} to={8.98} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.76} />
    </Scene>
    <Scene from={8.93} to={12.4} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={8.93} />
    </Scene>
    <Scene from={12.35} to={15.25} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.35} />
    </Scene>
    <Scene from={15.2} to={17.84} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={15.2} />
    </Scene>
    <Scene from={17.79} to={21.08} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={17.79} />
    </Scene>
    <Scene from={21.03} to={24.1} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={21.03} />
    </Scene>
    <Scene from={23.95} to={28.5} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.14, 1560],
        [3.14, 5.76, 1560],
        [5.76, 8.93, 1560],
        [8.93, 12.35, 1560],
        [12.35, 15.2, 1560],
        [15.2, 17.79, 1560],
        [17.79, 21.03, 1560],
        [21.03, 23.95, 1560],
      ]}
    />
  </AbsoluteFill>
);
