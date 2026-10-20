import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, JAKE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v32.json";

const words = vo.words as unknown as Word[];

const ROCKY: Palette = {
  sky: ["#4d84b8", "#b0cde0", "#f0efe2"],
  sun: { x: 300, y: 470, r: 56, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#b3bcc4", "#9aa6ac", "#8a8f80", "#77775f", "#61614c"],
  mist: "#eef2ee",
};
const MEADOW: Palette = {
  sky: ["#5b8fc0", "#bdd5e3", "#f1f0e4"],
  sun: { x: 820, y: 480, r: 58, color: "#fffbe8", glow: "#fff0b8" },
  layers: ["#b7c3cb", "#9cadb4", "#82967f", "#6a7d5e", "#56684a"],
  mist: "#eef3f0",
};

const JK: Outfit = {
  ...JAKE,
  hair: "#3a2a20",
  beard: "#4a3528",
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#C0603C",
  jacketShade: "#9A4A2D",
  pack: "#4A4E55",
  packShade: "#363A40",
};

// Steep descent: ground drops to the right.
const SL = 0.36;
const gy = (x: number) => 1440 + x * Math.tan(SL);

const Slope: React.FC<{ shift: number }> = ({ shift }) => (
  <g>
    <path d={`M-200,${gy(-200)} L1300,${gy(1300)} L1300,2200 L-200,2200 Z`} fill="#7a7458" />
    <path d={`M-200,${gy(-200) + 8} L1300,${gy(1300) + 8} L1300,${gy(1300) + 80} L-200,${gy(-200) + 80} Z`} fill="#b09a78" />
    {/* loose stones on the trail */}
    {Array.from({ length: 14 }, (_, i) => {
      const x = ((i * 97 - shift) % 1400 + 1400) % 1400 - 150;
      return <ellipse key={i} cx={x} cy={gy(x) + 26 + (i % 3) * 14} rx={9 + (i % 4) * 4} ry={6 + (i % 3) * 2} fill={i % 2 ? "#8d8670" : "#cfc4ae"} />;
    })}
    {[120, 470, 820].map((x, i) => (
      <Pine key={i} x={((x - shift * 0.6) % 1300 + 1300) % 1300 - 100} y={gy(((x - shift * 0.6) % 1300 + 1300) % 1300 - 100) - 230} h={300 + (i % 2) * 50} c="#4a6a48" c2="#36523a" />
    ))}
  </g>
);

// Close-up of a pole joint: lower section slides, the lock closes, weight test.
const PoleJoint: React.FC<{ t: number }> = ({ t }) => {
  const slide = at(t, [9.4, 10.0], [0, 1], outExpo); // set the length
  const lock = at(t, [10.6, 11.2], [0, 1], outExpo); // lock closes
  const press = at(t, [12.2, 12.7], [0, 1]) * at(t, [14.5, 14.9], [1, 0]);
  const slip = at(t, [15.2, 15.5], [0, 1]) * at(t, [15.9, 16.2], [1, 0]);
  const retight = at(t, [15.9, 16.3], [0, 1]);
  const ok = t > 13.4 && t < 15.2 ? 1 : t > 16.6 ? 1 : 0;
  const upperY = 40 + press * 10 + slip * 26;
  const lowerTop = mix(200, 150, slide);
  const lockCol = lock > 0.5 ? "#3E8E5A" : "#D9443A";
  return (
    <svg width={920} height={520} viewBox="0 0 920 520">
      <g transform="translate(452,250) scale(1.45) translate(-452,-250)">
      {/* lower section */}
      <rect x={430} y={lowerTop} width={44} height={520} rx={8} fill="#7d878c" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={430} x2={446} y1={lowerTop + 30 + i * 26} y2={lowerTop + 30 + i * 26} stroke="#fff" strokeWidth={3} opacity={0.7} />
      ))}
      {/* upper section */}
      <g transform={`translate(0,${upperY})`}>
        <rect x={418} y={-80} width={68} height={300} rx={10} fill="#2f3438" />
        <rect x={428} y={-80} width={14} height={300} fill="#fff" opacity={0.12} />
        {/* lock collar */}
        <rect x={404} y={190} width={96} height={64} rx={14} fill="#1f2326" />
        <rect x={410} y={196} width={84} height={10} rx={4} fill="#fff" opacity={0.12} />
        {/* lever */}
        <g transform={`translate(500,${222}) rotate(${mix(-62, 0, lock)})`}>
          <rect x={-6} y={-16} width={80} height={32} rx={14} fill={lockCol} />
        </g>
      </g>
      {/* press arrow */}
      <g opacity={press} transform={`translate(250,${60 + press * 20})`}>
        <path d="M0,0 L0,150" stroke="#fff" strokeWidth={22} strokeLinecap="round" />
        <path d="M-46,110 L0,170 L46,110" stroke="#fff" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* result dot */}
      <g opacity={Math.max(ok, slip)} transform="translate(700,250)">
        <circle r={64} fill={slip > 0.3 ? "#D9443A" : "#3E8E5A"} />
        {slip > 0.3 ? (
          <path d="M-24,-24 L24,24 M24,-24 L-24,24" stroke="#fff" strokeWidth={14} strokeLinecap="round" />
        ) : (
          <path d="M-28,2 L-8,24 L30,-22" stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </g>
      {/* tighten arc */}
      <g opacity={retight * at(t, [16.6, 16.9], [1, 0])} transform={`translate(452,${upperY + 222})`}>
        <path d="M-90,-50 A100,60 0 1,0 90,-50" stroke="#F2B544" strokeWidth={12} fill="none" strokeLinecap="round" />
        <path d="M70,-74 L94,-48 L62,-36" stroke="#F2B544" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      </g>
    </svg>
  );
};

// ============ S1 HOOK: steep, loose descent, leaning on the pole (0 - 4.0) ============
const S1: React.FC = () => {
  const t = useT();
  const ph = t * 3.4;
  const x = 470;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={ROCKY}
        camX={t * 14}
        zoom={mix(1.03, 1.08, t / 4)}
        foreground={
          <g>
            <Slope shift={t * 50} />
            <Person x={x} y={gy(x) + 60} scale={1.6} phase={ph} walk={0.6} lean={-0.22} slope={-SL * 0.75} poleLen={mix(240, 225, at(t, [2.7, 3.4], [0, 1]))} outfit={JK} expression="neutral" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Why your pole\nslips on the\nway down."} t={t} t0={0} top={150} size={124} />
      <Chip text="Steep, loose descent" t={t} t0={1.34} x={80} y={570} icon="none" />
      <Chip text="Weight on the pole" t={t} t0={2.75} x={80} y={670} icon="none" />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: the pole slides shorter, he stumbles (3.95 - 6.25) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const slideK = at(t, [4.15, 4.7], [0, 1], outExpo);
  const stumble = at(t, [4.6, 5.4], [0, 1], outExpo);
  const x = 500;
  const shake = Math.sin(t * 40) * 6 * at(t, [4.6, 5.0, 5.6], [0, 1, 0]);
  return (
    <AbsoluteFill style={{ translate: `${shake}px 0px` }}>
      <Landscape
        uid="l2"
        pal={ROCKY}
        camX={60 + lt * 8}
        zoom={mix(1.12, 1.16, lt / 2.3)}
        foreground={
          <g>
            <Slope shift={200 + lt * 20} />
            <Person
              x={x + stumble * 40}
              y={gy(x + stumble * 40) + 60 + stumble * 16}
              scale={1.6}
              phase={1.2 + stumble * 1.4}
              walk={0.7}
              lean={mix(-0.22, 0.28, stumble)}
              slope={-SL * 0.75}
              poleLen={mix(225, 165, slideK)}
              outfit={JK}
              expression={stumble > 0.3 ? "tired" : "neutral"}
            />
          </g>
        }
      />
      <Vignette strength={0.45} />
      <Scrim />
      <Readout label="POLE LOCK" value="SLIPPING" ok={false} t={t} t0={4.15} x={80} y={420} pulseAt={4.69} />
      <Chip text="He stumbles" t={t} t0={5.37} x={80} y={650} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 FIX: the 5-second pole check (6.2 - 17.5) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1830;
  const press = at(t, [12.2, 12.7], [0, 1]) * at(t, [14.5, 14.9], [1, 0]);
  return (
    <AbsoluteFill>
      <Landscape
        uid="l3"
        pal={MEADOW}
        camX={lt * 6}
        foreground={
          <g>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <Pine key={i} x={-80 + i * 190} y={groundY - 210 + (i % 2) * 14} h={420 + (i % 3) * 50} c="#36634a" c2="#254a37" />
            ))}
            <rect x={-100} y={groundY - 60} width={1300} height={400} fill="#62703f" />
            <rect x={-100} y={groundY - 20} width={1300} height={70} fill="#b39a72" />
            <Person x={700} y={groundY} scale={1.5} walk={0} lean={mix(0.08, 0.3, press)} poleLen={mix(240, 220, press)} outfit={JK} expression="neutral" breathe={Math.sin(t * 2.4) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={600} />
      <Title text={"The 5-second\npole check."} t={t} t0={6.3} t1={9.3} top={200} size={150} />
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
            opacity: at(t, [9.1, 9.4], [0, 1]),
            scale: `${at(t, [9.1, 9.6], [0.92, 1], outExpo)}`,
            display: "flex",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <PoleJoint t={t} />
        </div>
      )}
      <Chip text="Before every descent" t={t} t0={6.24} t1={9.2} x={80} y={540} icon="none" />
      <Chip text="Set the length" t={t} t0={9.39} t1={10.1} x={80} y={200} icon="check" big />
      <Chip text="Close every lock" t={t} t0={10.17} t1={12.05} x={80} y={200} icon="check" big />
      <Chip text="Full weight, flat ground" t={t} t0={12.15} t1={14.9} x={80} y={200} icon="check" big />
      <Chip text="Moves? Tighten, test again" t={t} t0={15.21} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: a pole that holds, recheck at every break (17.45 - 22.1) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const ph = lt * 3.8;
  const x = 470;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={GOLDEN}
        camX={lt * 20}
        zoom={at(lt, [0, 0.9], [1.2, 1.06], outExpo)}
        foreground={
          <g>
            <Slope shift={lt * 60} />
            <Person x={x} y={gy(x) + 60} scale={1.6} phase={ph} walk={0.75} lean={-0.2} slope={-SL * 0.75} poleLen={240} outfit={JK} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"A pole\nthat holds."} t={t} t0={off + 0.12} top={200} size={160} />
      <Chip text="Recheck at every break" t={t} t0={19.87} x={80} y={570} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/folding-trekking-pole-card.jpg"
      spec="4-SECTION ALUMINIUM · SOLD SINGLE"
      name={
        <>
          Folding
          <br />
          Trekking Pole
        </>
      }
      nameSize={96}
      price="$19.99"
      save="Save this before your next descent"
    />
  );
};

export const V32: React.FC = () => {
  void C;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={4.0} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={3.95} to={6.3}>
        <S2 off={3.95} />
      </Scene>
      <Scene from={6.2} to={17.55}>
        <S3 off={6.2} />
      </Scene>
      <Scene from={17.45} to={22.1} fadeIn={0.12}>
        <S4 off={17.45} />
      </Scene>
      <Scene from={22.0} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions words={words} windows={[[0.3, 3.95, 900], [3.95, 6.2, 760], [6.2, 17.45, 1050], [17.45, 22.0, 700]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
