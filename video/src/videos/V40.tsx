import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v40.json";

const words = vo.words as unknown as Word[];

const FALL: Palette = {
  sky: ["#4d82b5", "#b9d2e2", "#f4ead2"],
  sun: { x: 820, y: 700, r: 58, color: "#fffbe8", glow: "#ffe9b0" },
  layers: ["#b9c2c4", "#a3ae9e", "#8c9a72", "#77845a", "#5f6c46"],
  mist: "#f1efe2",
};
const VALLEY: Palette = {
  sky: ["#3f7cb8", "#b8d4e8", "#f6efd8"],
  sun: { x: 300, y: 720, r: 60, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#bcc6c8", "#a1ae9c", "#889868", "#728250", "#5b6a40"],
  mist: "#f2f2e4",
};

const KARA: Outfit = {
  ...GUIDE,
  skin: "#C98E6A",
  skinShade: "#AB7151",
  hair: "#2b1d16",
  ponytail: "#2b1d16",
  beard: null,
  cap: "#C8963E",
  capShade: "#A37828",
  jacket: "#7B4B8F",
  jacketShade: "#5F386F",
  pants: "#4A4E55",
  pantsShade: "#363A40",
  pack: "#9AA3A8",
  packShade: "#7C858A",
};

const K = 0.17; // downhill slope (drops to the right)
const groundAt = (x: number, x0: number, y0: number) => y0 + (x - x0) * K;

// Sloped dirt trail with grass, dropping to the right.
const Descent: React.FC<{ x0: number; y0: number; shift: number }> = ({ x0, y0, shift }) => {
  const yl = groundAt(-300, x0, y0);
  const yr = groundAt(1400, x0, y0);
  return (
    <g>
      <path d={`M-300,${yl - 40} L1400,${yr - 40} L1400,${yr + 900} L-300,${yl + 900} Z`} fill="#86945e" />
      <path d={`M-300,${yl - 8} L1400,${yr - 8} L1400,${yr + 90} L-300,${yl + 90} Z`} fill="#bf9f76" />
      {Array.from({ length: 10 }, (_, i) => {
        const x = ((((i * 190 - shift) % 1700) + 1700) % 1700) - 300;
        const y = groundAt(x, x0, y0);
        return <path key={i} d={`M${x},${y + 30} l26,-12 l30,6 l10,14 Z`} fill="#8f7658" />;
      })}
    </g>
  );
};

const Trees: React.FC<{ x0: number; y0: number; shift: number }> = ({ x0, y0, shift }) => (
  <g>
    {Array.from({ length: 7 }, (_, i) => {
      const x = ((((-100 + i * 230 - shift) % 1610) + 1610) % 1610) - 260;
      const y = groundAt(x, x0, y0) - 40;
      return i % 2 === 0 ? (
        <LeafTree key={i} x={x} y={y} h={420 + (i % 3) * 50} c="#c0843e" c2="#9a6630" />
      ) : (
        <Pine key={i} x={x} y={y} h={460 + (i % 3) * 50} c="#3b6550" c2="#2b4d3c" />
      );
    })}
  </g>
);

// White info card: side view of the pack against the back.
// order 0 = heavy things on the outside, 1 = heavy things against the back. sway = loose pack swinging. chest/waist/snug = straps 0..1.
const PackCard: React.FC<{ t: number; t0: number; t1?: number; order: number; sway: number; chest: number; waist: number; snug: number }> = ({
  t,
  t0,
  t1 = 999,
  order,
  sway,
  chest,
  waist,
  snug,
}) => {
  if (isClean()) return null;
  const o = at(t, [t0, t0 + 0.3], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]);
  const gap = mix(44, 6, Math.max(snug, chest * 0.5));
  const rot = Math.sin(t * 7) * 9 * sway;
  const heavyX = mix(250, 64, order);
  const lightX = mix(64, 236, order);
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 440,
        height: 470,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        overflow: "hidden",
        opacity: o,
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <svg width={920} height={470} viewBox="0 0 920 470">
        {/* the hiker's back */}
        <rect x={150} y={40} width={60} height={360} rx={30} fill="#7B4B8F" />
        <text x={180} y={440} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={28} letterSpacing={3} fill="#6b6b66">
          YOUR BACK
        </text>
        <g transform={`translate(${210 + gap},70) rotate(${rot})`}>
          {/* shoulder strap */}
          <path d={`M10,10 Q${-gap - 30},-20 ${-gap - 20},60`} stroke="#5d666b" strokeWidth={14} fill="none" strokeLinecap="round" />
          {/* pack body */}
          <rect x={0} y={0} width={340} height={340} rx={44} fill="#e7eaec" stroke="#9AA3A8" strokeWidth={6} />
          {/* heavy: water bottle + food */}
          <g transform={`translate(${heavyX},40)`}>
            <rect x={0} y={0} width={70} height={150} rx={18} fill="#4f97cf" />
            <rect x={14} y={-14} width={42} height={20} rx={6} fill="#2f5f86" />
            <rect x={-6} y={168} width={84} height={90} rx={12} fill="#c47a45" />
            <text x={36} y={286} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={26} letterSpacing={2} fill="#3b3b37">
              HEAVY
            </text>
          </g>
          {/* light: spare layer */}
          <g transform={`translate(${lightX},50)`}>
            <path d="M0,40 Q0,0 40,0 Q80,0 80,40 L80,190 Q80,220 40,220 Q0,220 0,190 Z" fill="#9ec49a" />
            <text x={40} y={256} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={26} letterSpacing={2} fill="#3b3b37">
              LIGHT
            </text>
          </g>
        </g>
        {/* chest + waist straps */}
        {[
          [110, chest, "CHEST STRAP"],
          [350, waist, "WAIST STRAP"],
        ].map(([y, k, label]) => (
          <g key={label as string} opacity={at(k as number, [0, 0.3], [0, 1])}>
            <rect x={100} y={(y as number) - 9} width={170} height={18} rx={8} fill="#2E3438" />
            <rect x={160} y={(y as number) - 15} width={44} height={30} rx={8} fill="#3E8E5A" />
            <text x={610} y={(y as number) + 10} fontFamily={HEAD} fontWeight={700} fontSize={30} letterSpacing={3} fill="#3E8E5A">
              {label as string}
            </text>
          </g>
        ))}
        {sway > 0.3 && (
          <g opacity={sway}>
            <path d="M650,230 q50,-40 100,0" stroke="#D9443A" strokeWidth={8} fill="none" strokeLinecap="round" />
            <path d="M650,260 q50,40 100,0" stroke="#D9443A" strokeWidth={8} fill="none" strokeLinecap="round" />
            <text x={700} y={330} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={30} letterSpacing={3} fill="#D9443A">
              SWINGS
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// ============ S1 HOOK: pack swinging on the steep descent (0 - 4.45) ============
const S1: React.FC = () => {
  const t = useT();
  const x0 = 540;
  const y0 = 1700;
  const ph = t * 4.2;
  const p: HikerProps = { x: x0, y: y0 + 40, scale: 1.6, phase: ph, walk: 0.7, lean: -0.24, slope: -K, poles: false, handOverride: freeHand(ph, 0.7) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={FALL}
        camX={t * 20}
        zoom={mix(1.03, 1.08, t / 4.45)}
        foreground={
          <g>
            <Trees x0={x0} y0={y0} shift={t * 90} />
            <Descent x0={x0} y0={y0 + 40} shift={t * 160} />
            <Person {...p} outfit={KARA} expression={t > 2.4 ? "tired" : "neutral"} packSwing={Math.sin(t * 7.5) * 16} packOut={14} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Her pack\nfought her\non every\nstep down."} t={t} t0={0} top={130} size={140} />
      <Chip text="Steep way down" t={t} t0={0.76} x={80} y={700} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: bottle thumping, losing balance (4.45 - 8.4) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const x0 = 640;
  const y0 = 1760;
  const ph = lt * 4;
  const wob = t > 7.0 ? Math.sin(t * 9) * 0.08 : 0;
  const p: HikerProps = { x: x0, y: y0 + 40, scale: 1.25, phase: ph, walk: 0.6, lean: -0.24 + wob, slope: -K, poles: false, handOverride: t > 7.0 ? [60, -40] : freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={FALL}
        camX={lt * 22}
        zoom={mix(1.02, 1.06, lt / 3.95)}
        foreground={
          <g>
            <Trees x0={x0} y0={y0} shift={lt * 80} />
            <Descent x0={x0} y0={y0 + 40} shift={lt * 150} />
            <Person {...p} outfit={KARA} expression="tired" packSwing={Math.sin(t * 7.5) * 16} packOut={14} />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim />
      <Chip text="Bottle thumping her back" t={t} t0={5.5} x={80} y={220} icon="x" />
      <PackCard t={t} t0={4.75} order={0} sway={1} chest={0} waist={0} snug={0} />
      <Readout label="BALANCE" value="OFF" ok={false} t={t} t0={7.04} x={80} y={300} pulseAt={7.04} />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: heavy close to the back, clip and tighten (8.4 - 20.3) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const x0 = 720;
  const y0 = 1820;
  const order = at(t, [11.5, 12.9], [0, 1], outExpo);
  const chest = at(t, [14.9, 15.2], [0, 1]);
  const waist = at(t, [15.98, 16.3], [0, 1]);
  const snug = at(t, [17.3, 18.1], [0, 1]);
  const sway = Math.max(0, 1 - order) * (1 - chest);
  const p: HikerProps = { x: x0, y: y0 + 20, scale: 1.35, walk: 0, lean: 0.04, poles: false, handOverride: t > 14.5 && t < 18.3 ? [40, -70] : [30, 34], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={FALL}
        camX={lt * 6}
        foreground={
          <g>
            <Trees x0={x0} y0={y0 + 120} shift={0} />
            <rect x={-300} y={y0 - 20} width={1700} height={600} fill="#86945e" />
            <path d={`M-300,${y0 + 6} Q540,${y0 - 14} 1400,${y0 + 6} L1400,${y0 + 110} Q540,${y0 + 90} -300,${y0 + 110} Z`} fill="#bf9f76" />
            <Person {...p} outfit={KARA} expression="happy" packSwing={Math.sin(t * 7.5) * 10 * sway} packOut={mix(14, 0, snug)} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={600} />
      <Title text={"Here's\nthe fix."} t={t} t0={8.5} t1={9.45} top={200} size={160} />
      <PackCard t={t} t0={9.4} order={order} sway={sway} chest={chest} waist={waist} snug={snug} />
      <Chip text="Heavy close to your back" t={t} t0={11.82} t1={14.2} x={80} y={200} icon="check" big />
      <Chip text="Light things outside" t={t} t0={12.77} t1={14.2} x={80} y={310} icon="check" big />
      <Chip text="Clip the chest strap" t={t} t0={14.91} t1={17.2} x={80} y={200} icon="check" big />
      <Chip text="Clip the waist strap" t={t} t0={15.98} t1={17.2} x={80} y={310} icon="check" big />
      <Chip text="Shoulder straps snug" t={t} t0={17.31} t1={18.55} x={80} y={200} icon="check" big />
      <Readout label="PACK" value="STEADY" ok={true} t={t} t0={18.63} x={80} y={180} pulseAt={18.63} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: steady and quick on the next descent (20.3 - 22.8) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const x0 = 500;
  const y0 = 1680;
  const ph = lt * 5;
  const p: HikerProps = { x: x0, y: y0 + 40, scale: 1.6, phase: ph, walk: 0.9, lean: -0.2, slope: -K, poles: false, handOverride: freeHand(ph, 0.9) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={VALLEY}
        camX={lt * 30}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <Trees x0={x0} y0={y0} shift={lt * 120} />
            <Descent x0={x0} y0={y0 + 40} shift={lt * 220} />
            <Person {...p} outfit={KARA} expression="happy" packSwing={0} packOut={0} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={800} />
      <Title text={"Steady\nand quick."} t={t} t0={off + 0.1} top={190} size={150} />
      <Chip text="Pack moves with her" t={t} t0={21.0} x={80} y={540} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/lightweight-trail-backpack-card.jpg"
      photoH={760}
      spec="SLIM DAYPACK · UNISEX"
      name={
        <>
          Lightweight
          <br />
          Trail Backpack
        </>
      }
      nameSize={96}
      price="$39.99"
      save="Save this before your next steep hike"
    />
  );
};

export const V40: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={4.5} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={4.45} to={8.45}>
        <S2 off={4.45} />
      </Scene>
      <Scene from={8.4} to={20.35}>
        <S3 off={8.4} />
      </Scene>
      <Scene from={20.3} to={22.8} fadeIn={0.12}>
        <S4 off={20.3} />
      </Scene>
      <Scene from={22.75} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions words={words} windows={[[0.3, 4.45, 900], [4.45, 8.4, 960], [8.4, 20.3, 960], [20.3, 22.75, 900]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
