import React from "react";
import { AbsoluteFill } from "remotion";
import { Person, GUIDE, Outfit } from "../Person";
import { GOLDEN, Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, C, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v18.json";

const words = vo.words as unknown as Word[];

const SMOKY: Palette = {
  sky: ["#7f9fbc", "#c9cfd2", "#e9e0cf"],
  sun: { x: 820, y: 600, r: 56, color: "#fff6e0", glow: "#ffe2a8" },
  layers: ["#a7b2bd", "#8f9cab", "#7a8697", "#7a6a50", "#6a5a3a"],
  mist: "#eef0f0",
};
const SUNRISE: Palette = {
  sky: ["#3e5a7a", "#e7a07a", "#ffd9a0"],
  sun: { x: 760, y: 1000, r: 80, color: "#fff2d0", glow: "#ffbe7a" },
  layers: ["#c49a8a", "#a07c78", "#7d6468", "#5a4a4e", "#3a3236"],
  mist: "#ffd2a8",
};

const SARA: Outfit = {
  ...GUIDE,
  jacket: "#8C3B52",
  jacketShade: "#6E2D40",
  skin: "#C68B6A",
  skinShade: "#A86F50",
  hair: "#2b1d16",
  ponytail: "#2b1d16",
  beard: null,
  cap: "#2F3B45",
  capShade: "#222c34",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};
const CARS = [
  ["#5F7F99", "#4A6478"],
  ["#C9C3B6", "#A9A396"],
  ["#7A4E3A", "#5E3B2C"],
  ["#3E4F5C", "#2C3943"],
  ["#A23B32", "#7E2D26"],
];
const SARA_CAR = ["#E3B23C", "#C4952A"];
const FALL_TREES = [
  ["#D9822B", "#B8641E"],
  ["#C2452D", "#9C3522"],
  ["#E3B23C", "#C4952A"],
];

const TreeRow: React.FC<{ y: number; shift: number; h?: number }> = ({ y, shift, h = 460 }) => (
  <g>
    {Array.from({ length: 8 }, (_, i) => {
      const x = -120 + i * 190 - shift;
      const [c, c2] = FALL_TREES[i % 3];
      return i % 3 === 1 ? <Pine key={i} x={x} y={y} h={h + 60} c="#2f5a43" c2="#254a37" /> : <LeafTree key={i} x={x} y={y} h={h + (i % 2) * 60} c={c} c2={c2} />;
    })}
  </g>
);

// ============ S1 HOOK: stuck in traffic (0 - 5.3) ============
const S1: React.FC = () => {
  const t = useT();
  const roadY = 1640;
  const S = 2.7;
  const cx = 430 + Math.sin(t * 0.8) * 3;
  // Sara sits in the driver seat: place Person so her head sits in the front window, clip to the window.
  const s = 1.3;
  const px = cx + 40 * S - 18 * s;
  const py = roadY - 97 * S - 6 + 340 * s;
  const win = `M${cx + 6 * S},${roadY - 112 * S} L${cx + 48 * S},${roadY - 112 * S} Q${cx + 54 * S},${roadY - 112 * S} ${cx + 58 * S},${roadY - 106 * S} L${cx + 76 * S},${roadY - 82 * S} L${cx + 6 * S},${roadY - 82 * S} Z`;
  return (
    <AbsoluteFill>
      <Landscape
        uid="c1"
        pal={SMOKY}
        camX={t * 6}
        zoom={mix(1.03, 1.08, t / 5.3)}
        foreground={
          <g>
            <TreeRow y={roadY - 150} shift={t * 4} />
            <rect x={-300} y={roadY - 160} width={1700} height={700} fill="#6f7d42" />
            <rect x={-300} y={roadY - 60} width={1700} height={150} fill="#4a4c4e" />
            {Array.from({ length: 8 }, (_, i) => (
              <rect key={i} x={-100 + i * 200} y={roadY + 12} width={100} height={8} fill="#e9d98a" />
            ))}
            <Car x={-330} y={roadY} s={S} body={CARS[0][0]} shade={CARS[0][1]} />
            <Car x={1180} y={roadY} s={S} body={CARS[1][0]} shade={CARS[1][1]} />
            <Car x={cx} y={roadY} s={S} body={SARA_CAR[0]} shade={SARA_CAR[1]} />
            <defs>
              <clipPath id="sarawin">
                <path d={win} />
              </clipPath>
            </defs>
            <g clipPath="url(#sarawin)">
              <Person x={px} y={py} scale={s} walk={0} lean={0.04} poles={false} handOverride={[14, 30]} outfit={SARA} expression={t < 2.8 ? "neutral" : "tired"} />
            </g>
            <path d={win} fill="rgba(255,255,255,0.12)" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim />
      <Title text={"The Smokies\nin October:\ndon't do this."} t={t} t0={0} top={190} size={140} />
      <Readout label="IN TRAFFIC" value="2 HRS" ok={false} t={t} t0={3.3} t1={5.3} x={80} y={640} />
    </AbsoluteFill>
  );
};

// ============ S2 PROBLEM: every lot full (5.2 - 8.5) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1660;
  return (
    <AbsoluteFill>
      <Landscape
        uid="c2"
        pal={SMOKY}
        camX={60 + lt * 10}
        zoom={mix(1.0, 1.05, lt / 3.3)}
        foreground={
          <g>
            <TreeRow y={groundY - 170} shift={60} h={420} />
            <rect x={-300} y={groundY - 180} width={1700} height={700} fill="#6f7d42" />
            <rect x={-300} y={groundY - 90} width={1700} height={260} fill="#55575a" />
            {[0, 1, 2, 3, 4].map((i) => (
              <Car key={i} x={-60 + i * 300} y={groundY - 60} s={1.15} body={CARS[i][0]} shade={CARS[i][1]} />
            ))}
            {/* lot full sign */}
            <g transform={`translate(860,${groundY + 60})`}>
              <rect x={-9} y={-460} width={18} height={460} fill="#5d4a36" />
              <rect x={-150} y={-600} width={300} height={170} rx={12} fill="#7B3A2F" stroke="#f3e6cf" strokeWidth={6} />
              <text x={0} y={-526} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={62} fill="#f3e6cf">LOT FULL</text>
              <text x={0} y={-466} textAnchor="middle" fontFamily={HEAD} fontWeight={600} fontSize={36} fill="#f3e6cf">NO SPACES</text>
            </g>
            <Person x={330} y={groundY + 130} scale={1.75} walk={0} lean={0.04} poles={false} handOverride={[14, 30]} outfit={SARA} expression="tired" breathe={Math.sin(t * 2) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Chip text="Every lot full" t={t} t0={5.9} t1={8.5} x={80} y={560} icon="x" />
      <Chip text="No parking tag" t={t} t0={7.3} t1={8.5} x={80} y={660} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3 FIX 1: parking tag (8.4 - 15.7) ============
const TagCard: React.FC<{ t: number; t0: number; t1: number; x: number; y: number }> = ({ t, t0, t1, x, y }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      padding: "18px 26px 20px",
      borderRadius: 22,
      background: "#fff",
      boxShadow: "0 14px 40px rgba(0,0,0,0.25)",
      opacity: at(t, [t0, t0 + 0.3], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]),
      scale: `${at(t, [t0, t0 + 0.4], [0.85, 1], outExpo)}`,
      rotate: `${Math.sin(t * 2.2) * 2}deg`,
      transformOrigin: "50% 0%",
    }}
  >
    <svg width={260} height={300} viewBox="0 0 260 300">
      <rect x={30} y={20} width={200} height={270} rx={18} fill={C.forest} />
      <circle cx={130} cy={70} r={30} fill="#fff" />
      <text x={130} y={170} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={46} fill={C.stone}>PARKING</text>
      <text x={130} y={222} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={60} fill={C.stone}>TAG</text>
      <rect x={70} y={244} width={120} height={8} rx={4} fill="#E3B23C" />
    </svg>
  </div>
);

const S3: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1700;
  return (
    <AbsoluteFill>
      <Landscape
        uid="c3"
        pal={SMOKY}
        camX={140 + lt * 8}
        foreground={
          <g>
            <TreeRow y={groundY - 150} shift={200} h={440} />
            <rect x={-300} y={groundY - 160} width={1700} height={700} fill="#6f7d42" />
            <rect x={-300} y={groundY - 70} width={1700} height={240} fill="#55575a" />
            <Car x={740} y={groundY + 20} s={1.6} body={SARA_CAR[0]} shade={SARA_CAR[1]} flip />
            <Person x={270} y={groundY + 60} scale={1.75} walk={0} lean={0.04} poles={false} handOverride={[14, 30]} outfit={SARA} expression="happy" breathe={Math.sin(t * 2) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Title text={"Here's\nthe fix."} t={t} t0={8.55} t1={9.75} top={200} size={160} />
      <Chip text="Buy your tag before you go" t={t} t0={9.9} t1={15.6} x={80} y={420} icon="check" />
      <Chip text="Parked 15+ min = tag needed" t={t} t0={12.9} t1={15.6} x={80} y={520} icon="check" />
      <TagCard t={t} t0={10.4} t1={15.6} x={680} y={1060} />
    </AbsoluteFill>
  );
};

// ============ S4 FIX 2: sunrise on a weekday (15.6 - 21.4) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1680;
  const scroll = lt * 40;
  return (
    <AbsoluteFill>
      <Landscape
        uid="c4"
        pal={SUNRISE}
        camX={scroll * 0.3}
        foreground={
          <g>
            <TreeRow y={groundY - 40} shift={scroll * 0.6 % 380} h={520} />
            <rect x={-300} y={groundY - 40} width={1700} height={700} fill="#6a6a3a" />
            <path d={`M-300,${groundY - 6} Q540,${groundY - 26} 1400,${groundY - 4} L1400,${groundY + 110} Q540,${groundY + 84} -300,${groundY + 110} Z`} fill="#c2a47b" />
            {/* trailhead post */}
            <g transform={`translate(${900 - scroll},${groundY - 10})`}>
              <rect x={-8} y={-260} width={16} height={260} fill="#6a4a32" />
              <rect x={-90} y={-300} width={180} height={70} rx={8} fill="#8a6342" stroke="#5c4029" strokeWidth={5} />
              <text x={0} y={-252} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={36} fill="#f3e6cf">TRAILHEAD</text>
            </g>
            <Person x={380} y={groundY + 30} scale={1.75} phase={t * 4.4} walk={0.75} lean={0.16} poles={false} handOverride={freeHand(t * 4.4, 0.75)} outfit={SARA} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim />
      <Chip text="Sunrise start" t={t} t0={16.4} t1={21.3} x={80} y={420} icon="check" />
      <Chip text="Weekday" t={t} t0={17.2} t1={21.3} x={80} y={520} icon="check" />
      <Readout label="TRAIL" value="QUIET" ok={true} t={t} t0={20.0} t1={21.3} x={640} y={1080} />
    </AbsoluteFill>
  );
};

// ============ S5 PAYOFF (21.3 - 23.7) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const crestY = 1560;
  return (
    <AbsoluteFill>
      <Landscape
        uid="c5"
        pal={GOLDEN}
        camX={lt * 18}
        zoom={at(lt, [0, 0.9], [1.25, 1.06], outExpo)}
        foreground={
          <g>
            <TreeRow y={crestY + 40} shift={lt * 10} h={380} />
            <path d={`M-300,2200 L-300,${crestY + 60} Q540,${crestY - 10} 1400,${crestY + 60} L1400,2200 Z`} fill="#8a7a40" />
            <path d={`M-300,${crestY + 110} Q540,${crestY + 40} 1400,${crestY + 110} L1400,${crestY + 190} Q540,${crestY + 120} -300,${crestY + 190} Z`} fill="#c7a77a" />
            <Person x={560} y={crestY + 120} scale={1.7} walk={0} lean={0.02} poles={false} handOverride={[14, 30]} outfit={SARA} expression="happy" breathe={Math.sin(lt * 2) * 2} />
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Title text={"Pure\ngold."} t={t} t0={off + 0.12} top={200} size={200} />
    </AbsoluteFill>
  );
};

// ============ S6 END CARD ============
const PackArt: React.FC<{ lt: number }> = ({ lt }) => {
  const s = at(lt, [0.2, 1.1], [0.85, 1], outExpo);
  const o = at(lt, [0.1, 0.5], [0, 1]);
  const draw = at(lt, [0.6, 1.8], [0, 1]);
  return (
    <g transform={`translate(540,520) scale(${s})`} opacity={o}>
      {/* guide booklet behind */}
      <g transform="translate(-120,10) rotate(-8)">
        <rect x={-170} y={-260} width={340} height={480} rx={12} fill={C.stone} />
        <rect x={-130} y={-220} width={260} height={180} rx={8} fill="#D9822B" />
        <path d="M-130,-40 L-70,-130 L-20,-80 L40,-170 L130,-60 L130,-40 Z" fill="#7a5a3a" />
        <text x={-130} y={30} fontFamily={HEAD} fontWeight={800} fontSize={50} fill={C.forestDeep}>SMOKIES</text>
        <text x={-130} y={78} fontFamily={HEAD} fontWeight={800} fontSize={50} fill={C.forestDeep}>TRIP GUIDE</text>
        <rect x={-130} y={100} width={90} height={7} rx={3} fill={C.forest} />
      </g>
      {/* phone with GPX route */}
      <g transform="translate(170,40) rotate(6)">
        <rect x={-130} y={-260} width={260} height={520} rx={36} fill="#1d1f1e" />
        <rect x={-116} y={-244} width={232} height={488} rx={26} fill="#e9e3d2" />
        {/* contour lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse key={i} cx={10} cy={-20} rx={40 + i * 26} ry={30 + i * 22} fill="none" stroke="#c9bfa6" strokeWidth={3} />
        ))}
        <path
          d="M-80,200 C-60,120 -100,80 -40,40 S40,-20 20,-80 S60,-160 70,-190"
          fill="none"
          stroke="#B8641E"
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={520}
          strokeDashoffset={520 * (1 - draw)}
        />
        <circle cx={-80} cy={200} r={12} fill={C.forest} />
        <circle cx={70} cy={-190} r={12} fill="#C2452D" opacity={draw > 0.95 ? 1 : 0} />
        <rect x={-40} y={-236} width={80} height={14} rx={7} fill="#1d1f1e" />
      </g>
    </g>
  );
};

const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  void off;
  return (
    <EndCard
      lt={lt}
      art={<PackArt lt={lt} />}
      spec="PLANNING GUIDE + 10 GPX DAY HIKES"
      name={
        <>
          Great Smoky
          <br />
          Mountains
          <br />
          Trip Pack
        </>
      }
      nameSize={92}
      shadowY={850}
      price="$19.99"
      save="Save this before your Smokies trip"
    />
  );
};

export const V18: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={5.3} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={5.2} to={8.5}>
        <S2 off={5.2} />
      </Scene>
      <Scene from={8.4} to={15.7}>
        <S3 off={8.4} />
      </Scene>
      <Scene from={15.6} to={21.4}>
        <S4 off={15.6} />
      </Scene>
      <Scene from={21.3} to={23.7} fadeIn={0.12}>
        <S5 off={21.3} />
      </Scene>
      <Scene from={23.6} to={30} fadeOut={0}>
        <S6 off={23.6} />
      </Scene>
      <Captions words={words} windows={[[0.3, 5.2, 860], [5.25, 8.4, 300], [9.75, 21.3, 860]]} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
