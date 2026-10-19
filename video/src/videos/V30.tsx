import React from "react";
import { AbsoluteFill } from "remotion";
import { hikerGeometry, hikerTransform, HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v30.json";

const words = vo.words as unknown as Word[];

const FALL: Palette = {
  sky: ["#4f86b6", "#b2cfe0", "#efeedf"],
  sun: { x: 800, y: 520, r: 58, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#adb9c2", "#93a3a8", "#7c8c78", "#677556", "#525c42"],
  mist: "#eef1ec",
};
const SUMMIT: Palette = {
  sky: ["#5d8fbf", "#bcd4e2", "#f0efe4"],
  sun: { x: 860, y: 430, r: 60, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#b8c4cc", "#9eaeb6", "#84968e", "#6a7c66", "#566650"],
  mist: "#eef3f2",
};

const MARK: Outfit = {
  ...JAKE,
  hair: "#2a2220",
  beard: null,
  cap: "#B85C38",
  capShade: "#93462A",
  jacket: "#4E6E86",
  jacketShade: "#3C566A",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};

const Woods: React.FC<{ y: number; shift: number; n?: number }> = ({ y, shift, n = 8 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const x = (((-120 + i * 190 - shift) % 1520) + 1520) % 1520 - 220;
      return i % 3 === 1 ? (
        <LeafTree key={i} x={x} y={y + 20} h={480} c="#C9822F" c2="#A8641F" />
      ) : (
        <Pine key={i} x={x} y={y + (i % 2) * 18} h={460 + (i % 3) * 60} c="#36634a" c2="#254a37" />
      );
    })}
  </g>
);
const Ground: React.FC<{ y: number; base?: string; trail?: string }> = ({ y, base = "#62703f", trail = "#b39a72" }) => (
  <g>
    <rect x={-300} y={y - 60} width={1700} height={700} fill={base} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={trail} />
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

// Close-up of a bare heel, side view. Hot spot, then dried, then a bandage over it.
const Heel: React.FC<{ t: number }> = ({ t }) => {
  const dry = at(t, [13.4, 13.9], [0, 1]);
  const tape = at(t, [15.5, 15.9], [0, 1], outExpo);
  const pulse = 1 + 0.12 * Math.sin(t * 8);
  return (
    <svg width={920} height={520} viewBox="0 0 920 520">
      {/* lower leg and foot */}
      <path d="M250,0 L430,0 L440,250 Q446,330 520,360 L760,388 Q850,400 850,440 Q846,478 780,480 L250,480 Q170,478 160,420 Q150,360 200,300 L230,250 Z" fill="#E2A98A" />
      <path d="M160,420 Q170,478 250,480 L780,480 Q846,478 850,440 L850,452 Q840,500 780,500 L250,500 Q160,498 160,420 Z" fill="#C4876A" />
      <path d="M430,0 L440,250 Q446,330 520,360" stroke="#C4876A" strokeWidth={6} fill="none" />
      {/* sock line */}
      <path d="M240,40 L436,40" stroke="#C4876A" strokeWidth={4} opacity={0.5} />
      {/* hot spot on the back of the heel */}
      <circle cx={205} cy={400} r={58 * pulse} fill="#ff5a3c" opacity={0.3 * (1 - tape)} />
      <circle cx={205} cy={400} r={34} fill="#e84a35" opacity={0.75 * (1 - tape)} />
      {/* drying: a few drops vanish */}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${250 + i * 40},${330 + (i % 2) * 40} q8,14 0,20 q-8,-6 0,-20 Z`} fill="#8fd0ff" opacity={1 - dry} />
      ))}
      {/* bandage / tape */}
      <g opacity={tape} transform={`translate(205,400) rotate(-12) scale(${mix(1.3, 1, tape)})`}>
        <rect x={-82} y={-46} width={164} height={92} rx={28} fill="#E9D3B4" stroke="#C9AE8A" strokeWidth={4} />
        <rect x={-34} y={-30} width={68} height={60} rx={10} fill="#F6EBDD" />
      </g>
    </svg>
  );
};

// ============ S1 HOOK: hot spot two miles in (0 - 3.1) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1680;
  const ph = t * 4.4;
  const p: HikerProps = { x: 560, y: groundY + 40, scale: 1.7, phase: ph, walk: 0.9, lean: 0.1, poles: false, handOverride: freeHand(ph, 0.9) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={FALL}
        camX={t * 20}
        zoom={mix(1.03, 1.08, t / 3.1)}
        foreground={
          <g>
            <Woods y={groundY - 60} shift={t * 60} />
            <Ground y={groundY} />
            <Person {...p} outfit={MARK} expression="neutral" />
            <HotSpot p={p} t={t} on={at(t, [0.9, 1.2], [0, 1])} size={1.2} />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Stop at the\nfirst hot\nspot."} t={t} t0={0} top={150} size={124} />
      <Chip text="Hot spot on the heel" t={t} t0={0.96} x={80} y={570} icon="none" />
      <Chip text="2 miles in" t={t} t0={2.13} x={80} y={670} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: kept going, full blister by the summit (3.05 - 9.1) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const down = t > 7.3;
  const groundY = 1720;
  const ph = lt * (down ? 3.0 : 4.2);
  const limp = down ? Math.max(0, Math.sin(ph)) * 8 : 0;
  const p: HikerProps = {
    x: 560,
    y: groundY + 40 + limp,
    scale: 1.6,
    phase: ph,
    walk: down ? 0.55 : 0.85,
    lean: down ? -0.04 : 0.22,
    poles: false,
    handOverride: freeHand(ph, down ? 0.4 : 0.85),
  };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l2"
        pal={SUMMIT}
        camX={30 + lt * 10}
        zoom={mix(1.02, 1.08, lt / 6)}
        foreground={
          <g>
            <Woods y={groundY - 120} shift={300 + lt * 30} n={7} />
            <Ground y={groundY} base="#6c7448" />
            <g transform={down ? `translate(${2 * 560},0) scale(-1,1)` : undefined}>
              <Person {...p} outfit={MARK} expression={t > 5.4 ? "tired" : "neutral"} />
              <HotSpot p={p} t={t} on={1} size={mix(1.1, 1.7, at(t, [5.4, 7.0], [0, 1]))} />
            </g>
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim />
      <Chip text="Deal with it at the top" t={t} t0={3.26} t1={5.35} x={80} y={420} icon="x" />
      <Readout label="AT THE SUMMIT" value="BLISTER" ok={false} t={t} t0={6.87} x={80} y={420} pulseAt={6.87} />
      <Chip text="Every step down hurts" t={t} t0={8.14} x={80} y={650} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: stop, boot off, dry, tape (9.05 - 18.0) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1830;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={FALL}
        camX={lt * 6}
        foreground={
          <g>
            <Woods y={groundY - 200} shift={600 + lt * 6} />
            <Ground y={groundY} />
            <Person x={720} y={groundY} scale={1.5} walk={0} lean={0.3} poles={false} handOverride={[70, 120]} outfit={MARK} expression="neutral" breathe={Math.sin(t * 2.4) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={600} />
      <Title text={"Here's\nthe fix."} t={t} t0={9.25} t1={10.35} top={200} size={160} />
      <Chip text="Stop at the first rubbing" t={t} t0={10.42} x={80} y={200} icon="check" big />
      {!isClean() && (
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            top: 330,
            height: 560,
            borderRadius: 30,
            background: "#fff",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            overflow: "hidden",
            opacity: at(t, [12.1, 12.4], [0, 1]),
            scale: `${at(t, [12.1, 12.6], [0.92, 1], outExpo)}`,
            display: "flex",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <Heel t={t} />
        </div>
      )}
      <Chip text="Boot off" t={t} t0={12.22} t1={13.3} x={120} y={920} icon="check" />
      <Chip text="Dry the skin" t={t} t0={13.38} t1={15.45} x={120} y={920} icon="check" />
      <Chip text="Tape or a bandage" t={t} t0={15.53} t1={16.6} x={120} y={920} icon="check" />
      <Chip text="Before it breaks" t={t} t0={16.67} x={120} y={920} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: carries a small kit, stops early (17.95 - 21.95) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  const ph = lt * 4.8;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={GOLDEN}
        camX={lt * 24}
        zoom={at(lt, [0, 0.9], [1.22, 1.06], outExpo)}
        foreground={
          <g>
            <Woods y={groundY - 40} shift={lt * 50} />
            <Ground y={groundY} base="#7a7a40" trail="#c2a47b" />
            <Person x={560} y={groundY + 40} scale={1.6} phase={ph} walk={1} lean={0.12} poles={false} handOverride={freeHand(ph, 1)} outfit={MARK} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Stop early.\nFinish happy."} t={t} t0={off + 0.12} top={200} size={150} />
      <Chip text="Small first-aid kit" t={t} t0={19.4} x={80} y={560} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  void off;
  return (
    <EndCard
      lt={lt}
      photo="products/trail-first-aid-kit-13-pieces-card.jpg"
      photoH={760}
      spec="13 PIECES · FITS ANY DAYPACK"
      name={
        <>
          Trail
          <br />
          First-Aid Kit
        </>
      }
      nameSize={96}
      price="$16.99"
      save="Save this before your next long hike"
    />
  );
};

export const V30: React.FC = () => {
  void C;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={3.15} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={3.05} to={9.15}>
        <S2 off={3.05} />
      </Scene>
      <Scene from={9.05} to={18.05}>
        <S3 off={9.05} />
      </Scene>
      <Scene from={17.95} to={21.95} fadeIn={0.12}>
        <S4 off={17.95} />
      </Scene>
      <Scene from={21.85} to={30} fadeOut={0}>
        <S5 off={21.85} />
      </Scene>
      <Captions words={words} windows={[[0.3, 3.1, 900], [3.1, 9.1, 300], [10.35, 17.95, 1050], [17.95, 21.85, 700]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
