// V113: "Wet snow soaked everything in his pack." in the cinematic C01 style. Story for the 18L Hydration Backpack ($54.99,
// live Shopify), posted Dec 6. Facts from the live listing: built-in rain cover that stows in its own pocket and pulls over the
// pack when the weather turns. Advice: wet snow melts on a pack, so pull the cover over early. No waterproof claims beyond that.
// End card = real Shopify main photo (teal colourway), cut out from its studio background.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, freeHand, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, Svg } from "../cine";
import { Subject } from "../fall";
import { SNOW, SNOW2, WINTER, STORM, WinterBackdrop } from "../winter";
import vo from "../vo/v113.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.38) 45%, rgba(12,22,28,0.38) 70%, rgba(12,22,28,0) 100%)" }} />
);

const PACK = "#2b8a96";
const PACK2 = "#1f6a74";
const ORANGE = "#e2662a";
const COVER = "#3f5566";
const COVER2 = "#2f4050";

const KAI: Outfit = {
  ...JAKE,
  skin: "#D9A47F",
  skinShade: "#BC8763",
  hair: "#1d1410",
  beard: null,
  cap: "#B83A55",
  capShade: "#8E2B42",
  jacket: "#3a4f6a",
  jacketShade: "#2c3c52",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  pack: PACK,
  packShade: PACK2,
  glove: "#2a2a2a",
};
const KAI_COVERED: Outfit = { ...KAI, pack: COVER, packShade: COVER2 };

const SnowGround: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <path d={`M-400,${y} Q540,${y - 30} 1480,${y} L1480,2600 L-400,2600 Z`} fill={SNOW} />
    <path d={`M-400,${y + 160} Q540,${y + 130} 1480,${y + 160} L1480,2600 L-400,2600 Z`} fill={SNOW2} opacity={0.6} />
    {Array.from({ length: 12 }, (_, i) => (
      <ellipse key={i} cx={-300 + i * 150} cy={y + 60 + ((i * 71) % 260)} rx={60} ry={8} fill="#cfd9df" opacity={0.6} />
    ))}
  </Svg>
);

// Big back view of the daypack (screen coords). wet 0..1 darkens it with melt patches; cover 0..1 pulls the rain cover up over it.
const BigPack: React.FC<{ x: number; y: number; s: number; wet: number; cover: number; t: number; zip?: number; peek?: number }> = ({ x, y, s, wet, cover, t, zip = 0, peek = 0 }) => {
  const H = 1000;
  const W = 640;
  const ch = H * cover;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x={-W / 2 + 20} y={-H + 30} width={W} height={H} rx={150} fill="rgba(0,0,0,0.25)" />
      <rect x={-W / 2} y={-H} width={W} height={H} rx={150} fill={PACK} />
      <rect x={-W / 2 + 70} y={-H + 260} width={W - 140} height={560} rx={110} fill={PACK2} />
      <path d={`M${-W / 2 + 90},${-H + 270} Q0,${-H + 230} ${W / 2 - 90},${-H + 270}`} stroke={ORANGE} strokeWidth={14} fill="none" />
      <path d={`M${-W / 2 + 120},${-H + 380} L${W / 2 - 120},${-H + 700} M${W / 2 - 120},${-H + 380} L${-W / 2 + 120},${-H + 700}`} stroke="#1b1b1b" strokeWidth={8} />
      <rect x={-30} y={-H + 120} width={60} height={110} rx={10} fill="#c9d0d6" />
      {/* wet melt patches */}
      {Array.from({ length: 14 }, (_, i) => {
        const k = Math.max(0, Math.min(1, wet * 1.6 - (i % 7) * 0.09));
        return <ellipse key={i} cx={-W / 2 + 90 + (0.5 + 0.5 * Math.sin(i * 12.9898)) * (W - 180)} cy={-H + 130 + (0.5 + 0.5 * Math.sin(i * 78.233 + 1.3)) * (H - 300)} rx={30 + 40 * k} ry={22 + 30 * k} fill="#0f3a40" opacity={0.55 * k} />;
      })}
      {/* bottom pocket with a zip */}
      <rect x={-W / 2 + 60} y={-150} width={W - 120} height={120} rx={40} fill={PACK2} />
      <line x1={-W / 2 + 90} y1={-90} x2={W / 2 - 90} y2={-90} stroke="#111" strokeWidth={8} />
      <line x1={-W / 2 + 90} y1={-90} x2={mix(-W / 2 + 90, W / 2 - 90, zip)} y2={-90} stroke="#0a0a0a" strokeWidth={20} opacity={zip > 0 ? 1 : 0} />
      <rect x={mix(-W / 2 + 80, W / 2 - 110, zip)} y={-108} width={30} height={46} rx={6} fill="#c9d0d6" />
      {peek > 0 && <path d={`M${-W / 2 + 120},-90 Q0,${-90 - 80 * peek} ${W / 2 - 120},-90 Z`} fill={COVER} />}
      {/* rain cover pulled up from the bottom */}
      {cover > 0 && (
        <g>
          <path d={`M${-W / 2 - 24},${12} L${-W / 2 - 24},${12 - ch + 160 * Math.min(1, cover * 1.2)} Q${-W / 2 - 24},${12 - ch - 10} 0,${12 - ch - 30} Q${W / 2 + 24},${12 - ch - 10} ${W / 2 + 24},${12 - ch + 160 * Math.min(1, cover * 1.2)} L${W / 2 + 24},${12} Z`} fill={COVER} />
          <path d={`M${-W / 2 - 24},${12 - ch + 60} Q0,${12 - ch - 30} ${W / 2 + 24},${12 - ch + 60}`} stroke={COVER2} strokeWidth={14} fill="none" />
          <path d={`M${-W / 2 + 40},${-ch * 0.5} L${-W / 2 + 120},${-ch * 0.5 - 60}`} stroke="rgba(255,255,255,0.35)" strokeWidth={16} strokeLinecap="round" opacity={cover} />
          {/* beads of water running off the cover */}
          {cover > 0.95 &&
            [0, 1, 2, 3].map((i) => {
              const k = (t * 0.9 + i * 0.27) % 1;
              return <ellipse key={i} cx={-W / 2 + 120 + i * 140} cy={-H + 200 + k * 700} rx={9} ry={14} fill="#dff1f8" opacity={0.8 * (1 - k)} />;
            })}
        </g>
      )}
    </g>
  );
};

// Falling wet snowflakes that land and vanish (screen coords).
const WetFlakes: React.FC<{ t: number; seed: number; n?: number; y0?: number; y1?: number }> = ({ t, seed, n = 30, y0 = -100, y1 = 1500 }) => (
  <Svg>
    {Array.from({ length: n }, (_, i) => {
      const sp = 0.35 + ((i * 37 + seed) % 10) / 30;
      const k = (t * sp + ((i * 53 + seed) % 100) / 100) % 1;
      const x = ((i * 191 + seed * 7) % 1180) - 50 + Math.sin(t * 1.3 + i) * 20;
      const y = mix(y0, y1, k);
      return <circle key={i} cx={x} cy={y} r={7 + (i % 4) * 3} fill="#ffffff" opacity={0.85 * (1 - k * 0.4)} />;
    })}
  </Svg>
);

// ============ S1 HOOK WIDE: light snow at the trailhead, Kai sets off (0 - 4.12) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 14, y: hh.y, zoom: mix(1.03, 1.1, t / 4.12), rot: hh.rot };
  const g = 1460;
  const ph = t * 3;
  const p: HikerProps = { x: 330 + t * 45, y: g + 120, scale: 2.3, phase: ph, walk: 0.7, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.5), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="a" treeY={g - 60} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Svg>
          <g transform={`translate(880,${g + 40})`}>
            <rect x={-12} y={-300} width={24} height={300} fill="#5a4030" />
            <rect x={-150} y={-360} width={300} height={100} rx={8} fill="#6b4a2e" />
            <rect x={-150} y={-372} width={300} height={22} rx={10} fill={SNOW} />
            <text x={0} y={-292} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={46} fill="#f3e6cf" letterSpacing={3}>
              TRAILHEAD
            </text>
          </g>
        </Svg>
        <Subject rimX={6} col="rgba(230,235,255,0.8)">
          <Person {...p} outfit={KAI} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Particles seed={1131} n={26} col="#ffffff" fall={34} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="235,238,245" cool="40,60,90" />
      <Title text={"Wet snow\nsoaked\neverything\nin his pack."} t={t} t0={0} top={120} size={118} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: flakes land on the pack and melt into dark wet patches (4.12 - 7.65) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y + Math.sin(t * 5.5) * 8, zoom: mix(1.02, 1.08, lt / 3.53), rot: hh.rot };
  const wet = at(t, [4.6, 7.4], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="b" treeY={1000} t={t} blur={10} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(230,235,255,0.7)">
          <rect x={300} y={1500} width={480} height={500} rx={60} fill={KAI.jacket} />
          <BigPack x={540} y={1640} s={1.15} wet={wet} cover={0} t={t} />
        </Subject>
        <WetFlakes t={t} seed={3} n={34} />
      </Plane>
      <Particles seed={1132} n={14} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="235,238,245" cool="40,60,90" vignette={0.55} />
      <Chip text="Landing on the pack" t={t} t0={4.87} x={60} y={200} icon="x" big />
      <Chip text="And melting" t={t} t0={6.17} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: at the top, Kai opens his pack (7.65 - 9.6) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.0, 1.07, lt / 1.95), rot: hh.rot };
  const g = 1480;
  const p: HikerProps = { x: 420, y: g + 80, scale: 2.4, walk: 0, lean: 0.3, poles: false, handOverride: [90, 60], breathe: Math.sin(t * 3) * 2 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="c" treeY={g + 40} t={t} woods={false} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Subject rimX={5} col="rgba(230,235,255,0.8)">
          <Person {...p} outfit={KAI} expression="neutral" noPack />
          <g transform={`translate(${p.x + 150},${g + 90}) scale(0.32)`}>
            <BigPack x={0} y={0} s={1} wet={1} cover={0} t={t} />
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e3a32" side="right" />
      </Plane>
      <Particles seed={1133} n={24} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="235,238,245" cool="40,60,90" />
      <Chip text="At the top" t={t} t0={7.7} x={60} y={200} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4 CLOSE-UP: damp spare layer and soggy snacks in his gloved hands (9.6 - 11.94) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.34), rot: hh.rot };
  const snack = at(t, [10.0, 10.4], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="d" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={4} col="rgba(230,235,255,0.7)">
          {/* fleece held up */}
          <g transform="translate(330,880) rotate(-6)">
            <path d="M-210,-220 L-90,-260 Q0,-200 90,-260 L210,-220 L260,60 L170,80 L170,360 L-170,360 L-170,80 L-260,60 Z" fill="#7a8f5a" />
            <path d="M-90,-260 Q0,-200 90,-260 L60,-240 Q0,-190 -60,-240 Z" fill="#5f7246" />
            {[[-80, -60, 70], [60, 40, 90], [-40, 200, 80], [120, 220, 60], [-150, 100, 50]].map(([x, y, r], i) => (
              <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.75} fill="#3f4e30" opacity={0.6} />
            ))}
            {[0, 1, 2].map((i) => {
              const k = (t * 1.1 + i / 3) % 1;
              return <ellipse key={i} cx={-100 + i * 110} cy={370 + k * 260} rx={10} ry={15} fill="#cfe9f7" opacity={1 - k} />;
            })}
          </g>
          <ellipse cx={130} cy={630} rx={80} ry={64} fill={KAI.glove ?? "#2a2a2a"} />
          <ellipse cx={530} cy={630} rx={80} ry={64} fill={KAI.glove ?? "#2a2a2a"} />
          {/* soggy snack bag */}
          <g transform={`translate(${mix(1100, 800, snack)},1180) rotate(${mix(20, 8, snack)})`}>
            <path d="M-130,-200 L130,-200 Q150,0 120,190 Q0,230 -120,190 Q-150,0 -130,-200 Z" fill="#d9a34a" />
            <path d="M-130,-200 L130,-200 L130,-160 L-130,-160 Z" fill="#b5553a" />
            <path d="M-100,40 Q-20,80 40,30 Q90,10 110,60 L110,180 Q0,220 -110,180 Z" fill="#8a6a30" opacity={0.6} />
            <text x={0} y={-60} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={60} fill="#5a2e22">
              TRAIL MIX
            </text>
            <ellipse cx={170} cy={-30} rx={80} ry={64} fill={KAI.glove ?? "#2a2a2a"} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={1134} n={14} col="#ffffff" fall={24} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="235,238,245" cool="40,60,90" vignette={0.55} />
      <Readout label="SPARE LAYER" value="Damp" ok={false} t={t} t0={9.0} x={60} y={200} />
      <Chip text="Snacks soggy" t={t} t0={10.15} x={60} y={520} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: the fix was already there, the bottom pocket unzips (11.94 - 14.35) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.12, at(lt, [0, 1.2], [0, 1], outExpo)), rot: hh.rot };
  const zip = at(t, [13.3, 14.1], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="e" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={1500} />
        <Subject rimX={4} col="rgba(230,235,255,0.7)">
          <BigPack x={540} y={1330} s={1.0} wet={1} cover={0} t={t} zip={zip} peek={at(t, [13.9, 14.3], [0, 1])} />
          <ellipse cx={mix(290, 790, zip)} cy={1250} rx={70} ry={56} fill={KAI.glove ?? "#2a2a2a"} opacity={at(t, [13.1, 13.3], [0, 1])} />
        </Subject>
      </Plane>
      <Particles seed={1135} n={14} col="#ffffff" fall={24} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="235,238,245" cool="40,60,90" vignette={0.5} />
      <Chip text="Already on his pack" t={t} t0={12.4} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the rain cover comes out of its pocket and goes over the pack (14.35 - 17.29) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.94), rot: hh.rot };
  const cover = at(t, [14.6, 16.3], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={STORM} uid="f" treeY={1100} t={t} blur={12} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={1500} />
        <Subject rimX={4} col="rgba(230,235,255,0.7)">
          <BigPack x={540} y={1400} s={1.0} wet={1} cover={cover} t={t} zip={1} />
          <ellipse cx={540 - 345} cy={1400 - 1000 * cover + 100} rx={70} ry={56} fill={KAI.glove ?? "#2a2a2a"} opacity={cover < 1 ? 1 : at(t, [16.3, 16.6], [1, 0])} />
          <ellipse cx={540 + 345} cy={1400 - 1000 * cover + 100} rx={70} ry={56} fill={KAI.glove ?? "#2a2a2a"} opacity={cover < 1 ? 1 : at(t, [16.3, 16.6], [1, 0])} />
        </Subject>
        <WetFlakes t={t} seed={9} n={24} />
      </Plane>
      <Particles seed={1136} n={12} col="#ffffff" fall={24} />
      <LowScrim />
      <Grade sunX={820} sunY={520} warm="235,238,245" cool="40,60,90" vignette={0.5} />
      <Chip text="Built-in rain cover" t={t} t0={14.46} x={60} y={200} icon="check" big />
      <Chip text="In its own pocket" t={t} t0={15.59} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7 PAYOFF WIDE: snow still falling, Kai heads on, pack covered and dry (17.29 - 21.6) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + lt * 26, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1480;
  const ph = t * 3.2;
  const p: HikerProps = { x: 330 + lt * 55, y: g + 100, scale: 2.3, phase: ph, walk: 0.8, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6), breathe: 0 };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="g" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <SnowGround y={g} />
        <Subject rimX={6} col="rgba(255,240,210,0.9)">
          <Person {...p} outfit={KAI_COVERED} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={14}>
        <FrameLeaves col="#1e3a32" side="left" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.3} col="255,246,220" />
      <Particles seed={1137} n={26} col="#ffffff" fall={30} />
      <LowScrim />
      <Grade sunX={800} sunY={560} warm="255,236,200" />
      <Chip text="30 seconds" t={t} t0={17.3} x={60} y={200} icon="check" big />
      <Chip text="Pack stayed dry" t={t} t0={18.84} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/hydration-backpack-18l-main-cut.png"
      cutoutH={760}
      spec="18L · BUILT-IN RAIN COVER · UNISEX"
      name={
        <>
          18L Hydration
          <br />
          Backpack
        </>
      }
      nameSize={100}
      price="$54.99"
      save="Save this before your next snowy hike"
    />
  );
};

export const V113: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.17} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={4.12} to={7.7} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={4.12} />
    </Scene>
    <Scene from={7.65} to={9.65} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={7.65} />
    </Scene>
    <Scene from={9.6} to={11.99} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={9.6} />
    </Scene>
    <Scene from={11.94} to={14.4} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={11.94} />
    </Scene>
    <Scene from={14.35} to={17.34} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={14.35} />
    </Scene>
    <Scene from={17.29} to={21.6} fadeIn={0.12} fadeOut={0.12}>
      <S7 off={17.29} />
    </Scene>
    <Scene from={21.3} to={27} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 4.12, 1560],
        [4.12, 7.65, 1560],
        [7.65, 9.6, 1560],
        [9.6, 11.94, 1560],
        [11.94, 14.35, 1560],
        [14.35, 17.29, 1560],
        [17.29, 21.3, 1560],
      ]}
    />
  </AbsoluteFill>
);
