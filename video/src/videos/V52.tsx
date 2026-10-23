import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerTransform } from "../Hiker";
import { Person, GUIDE, JAKE, Outfit } from "../Person";
import { Grain, Landscape, Palette, Vignette } from "../Landscape";
import { at, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Scrim, Title, useT } from "../kit";
import vo from "../vo/v52.json";

const words = vo.words as unknown as Word[];

const ZION: Palette = {
  sky: ["#3f78b4", "#b6d3ea", "#f6ecd6"],
  sun: { x: 820, y: 660, r: 58, color: "#fffbe8", glow: "#ffeab0" },
  layers: ["#d4b8a0", "#c99872", "#b8774f", "#9c5a3a", "#7d452c"],
  mist: "#f4e9d6",
};
const LATE: Palette = {
  sky: ["#4a7fb2", "#e2c7a0", "#f6dcb4"],
  sun: { x: 300, y: 780, r: 64, color: "#fff4d8", glow: "#ffd890" },
  layers: ["#d6b49a", "#c99070", "#b5704c", "#985436", "#7a4029"],
  mist: "#f4dfc4",
};

const BEN: Outfit = {
  ...JAKE,
  skin: "#C99273",
  skinShade: "#AA7558",
  hair: "#2e231c",
  beard: "#2e231c",
  cap: "#C9B48E",
  capShade: "#A8946F",
  jacket: "#4E6B8A",
  jacketShade: "#3a536c",
  pack: "#3E5F4B",
  packShade: "#2E4A39",
};
const ELLA: Outfit = {
  ...GUIDE,
  skin: "#D9A788",
  skinShade: "#BB896A",
  hair: "#2e231c",
  ponytail: "#2e231c",
  beard: null,
  cap: "#E0A33A",
  capShade: "#B9822A",
  jacket: "#C8476A",
  jacketShade: "#A23552",
  pants: "#3E4650",
  pantsShade: "#2E353D",
  pack: "#2F7F86",
  packShade: "#256870",
};
const VISITOR: Outfit = {
  ...GUIDE,
  skin: "#E2B08F",
  skinShade: "#C48F70",
  hair: "#b07a3c",
  ponytail: "#b07a3c",
  beard: null,
  cap: "#2F3B45",
  capShade: "#222c34",
  jacket: "#7A9A4E",
  jacketShade: "#5f7a3a",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};
const KID = 1.0;

const Trail: React.FC<{ y: number; ground?: string; dirt?: string }> = ({ y, ground = "#b98f62", dirt = "#d9b88c" }) => (
  <g>
    <rect x={-300} y={y - 40} width={1700} height={700} fill={ground} />
    <path d={`M-300,${y - 6} Q540,${y - 26} 1400,${y - 4} L1400,${y + 110} Q540,${y + 84} -300,${y + 110} Z`} fill={dirt} />
    {Array.from({ length: 12 }, (_, i) => (
      <ellipse key={i} cx={(i * 149) % 1100} cy={y + 150 + ((i * 59) % 180)} rx={16} ry={7} fill="#a07a52" opacity={0.7} />
    ))}
  </g>
);

// Tall sandstone cliffs, Zion style.
const Cliffs: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <g>
    {[0, 1, 2].map((i) => {
      const x = ((((-260 + i * 600 - shift) % 1800) + 1800) % 1800) - 360;
      const w = 420 + (i % 2) * 120;
      const h = 620 + (i % 3) * 90;
      return (
        <g key={i}>
          <path d={`M${x},${y} C${x + 10},${y - h * 0.6} ${x + 60},${y - h} ${x + w * 0.45},${y - h} C${x + w * 0.8},${y - h} ${x + w - 30},${y - h * 0.5} ${x + w},${y} Z`} fill="#c6744a" />
          <path d={`M${x + w * 0.55},${y - h * 0.98} C${x + w * 0.85},${y - h * 0.9} ${x + w - 20},${y - h * 0.5} ${x + w},${y} L${x + w * 0.6},${y} Z`} fill="#a65836" />
          <path d={`M${x + 30},${y - h * 0.55} L${x + w - 40},${y - h * 0.5}`} stroke="#d99a6e" strokeWidth={10} />
        </g>
      );
    })}
  </g>
);

// Visitor center: wall, roof, sign. The desk is drawn separately, in front of people.
const Building: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <rect x={40} y={y - 760} width={1000} height={760} fill="#d8c3a2" />
    <rect x={40} y={y - 760} width={1000} height={40} fill="#c2aa86" />
    <path d={`M0,${y - 740} L540,${y - 900} L1080,${y - 740} Z`} fill="#6b4b30" />
    <path d={`M0,${y - 740} L1080,${y - 740} L1080,${y - 716} L0,${y - 716} Z`} fill="#563b25" />
    <rect x={250} y={y - 690} width={580} height={86} rx={10} fill="#4a3a2a" />
    {/* big window to the cliffs */}
    <rect x={90} y={y - 560} width={300} height={300} rx={8} fill="#a9cbe4" stroke="#6b4b30" strokeWidth={14} />
    <path d={`M100,${y - 290} C160,${y - 420} 220,${y - 470} 290,${y - 430} C330,${y - 400} 360,${y - 330} 380,${y - 290} Z`} fill="#c6744a" />
    <line x1={240} y1={y - 560} x2={240} y2={y - 260} stroke="#6b4b30" strokeWidth={10} />
    <rect x={40} y={y - 40} width={1000} height={40} fill="#b8a07c" />
  </g>
);
const BuildingSign: React.FC<{ y: number }> = ({ y }) =>
  isClean() ? null : (
    <text x={540} y={y - 632} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={58} letterSpacing={6} fill="#f2e6cf">
      VISITOR CENTER
    </text>
  );
// Front desk with an ink stamp and pad on top.
const Desk: React.FC<{ x: number; y: number; t: number; stampAt?: number[] }> = ({ x, y, t, stampAt = [] }) => {
  const down = stampAt.some((s) => t > s && t < s + 0.22);
  return (
    <g>
      <rect x={x} y={y - 250} width={440} height={250} fill="#7a5638" />
      <rect x={x - 14} y={y - 268} width={468} height={26} rx={6} fill="#8f6744" />
      <rect x={x + 30} y={y - 200} width={380} height={8} fill="#6a4a30" />
      <rect x={x + 60} y={y - 286} width={90} height={18} rx={4} fill="#3a3a44" />
      <g transform={`translate(${x + 300},${y - 268 - (down ? 0 : 34)})`}>
        <rect x={-22} y={-14} width={44} height={14} rx={3} fill="#2b2b33" />
        <rect x={-8} y={-62} width={16} height={50} rx={6} fill="#B5553A" />
        <circle cx={0} cy={-66} r={14} fill="#B5553A" />
      </g>
    </g>
  );
};
// Little booklet held in a hand (other visitors).
const Booklet: React.FC<{ x: number; y: number; c?: string }> = ({ x, y, c = "#2F5D8A" }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-26} y={-6} width={52} height={36} rx={3} fill={c} />
    <rect x={-2} y={-6} width={4} height={36} fill="#1f3f5f" />
  </g>
);

// The park page with a stamp box and a trail log.
const ParkPage: React.FC<{ t: number; t0: number; t1: number; stampAt: number; trailAt: number; dateAt: number; top?: number }> = ({ t, t0, t1, stampAt, trailAt, dateAt, top = 300 }) => {
  if (isClean()) return null;
  const o = at(t, [t0, t0 + 0.25], [0, 1]) * at(t, [t1 - 0.3, t1], [1, 0]);
  const stamped = t >= stampAt;
  const hit = at(t, [stampAt, stampAt + 0.25], [1.5, 1], outExpo);
  const row = (label: string, value: string, tt: number, y: number) => (
    <div style={{ position: "absolute", left: 50, right: 50, top: y, opacity: at(t, [tt, tt + 0.25], [0, 1]), display: "flex", alignItems: "baseline", gap: 18, borderBottom: "4px solid #e2ddd2", paddingBottom: 10 }}>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 40, letterSpacing: 3, color: "#6b6b66", width: 150 }}>{label}</div>
      <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 64, color: "#2a2a28" }}>{value}</div>
    </div>
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 110,
        right: 110,
        top,
        height: 700,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        opacity: o,
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <div style={{ position: "absolute", top: 30, left: 50, fontFamily: HEAD, fontWeight: 700, fontSize: 40, letterSpacing: 4, color: "#6b6b66" }}>ZION NATIONAL PARK</div>
      <div style={{ position: "absolute", top: 100, left: 50, width: 340, height: 300, border: "5px dashed #c9c2b2", borderRadius: 16 }}>
        {!stamped && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 40, letterSpacing: 3, color: "#c9c2b2" }}>STAMP</div>}
        {stamped && (
          <svg width={330} height={290} viewBox="0 0 330 290" style={{ position: "absolute", top: 0, left: 0, scale: `${hit}`, rotate: "-8deg" }}>
            <circle cx={165} cy={145} r={120} fill="none" stroke="#2F5D8A" strokeWidth={9} opacity={0.88} />
            <circle cx={165} cy={145} r={100} fill="none" stroke="#2F5D8A" strokeWidth={4} opacity={0.88} />
            <text x={165} y={118} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={46} fill="#2F5D8A" opacity={0.9}>ZION</text>
            <text x={165} y={160} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={26} letterSpacing={2} fill="#2F5D8A" opacity={0.9}>NATIONAL PARK</text>
            <text x={165} y={204} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={34} fill="#2F5D8A" opacity={0.9}>OCT 18 2026</text>
          </svg>
        )}
      </div>
      <div style={{ position: "absolute", top: 120, left: 430, right: 40, fontFamily: HEAD, fontWeight: 700, fontSize: 38, lineHeight: 1.25, color: "#9a9488", letterSpacing: 2 }}>
        VISIT
        <br />
        NO. 1
      </div>
      {row("TRAIL", "Riverside Walk", trailAt, 450)}
      {row("DATE", "Oct 18, 2026", dateAt, 570)}
    </div>
  );
};

// ============ S1 HOOK: first hike in Zion done (0 - 3.25) ============
const S1: React.FC = () => {
  const t = useT();
  const groundY = 1760;
  const ph = t * 3.6;
  const pB: HikerProps = { x: 300 + t * 50, y: groundY + 30, scale: 1.55, phase: ph, walk: 0.7, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.7) };
  const pE: HikerProps = { x: 520 + t * 50, y: groundY + 60, scale: KID, phase: ph * 1.25 + 1, walk: 0.8, lean: 0.08, poles: false, handOverride: freeHand(ph * 1.25 + 1, 0.8) };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l1"
        pal={ZION}
        camX={t * 12}
        zoom={mix(1.03, 1.1, t / 3.25)}
        foreground={
          <g>
            <Cliffs y={groundY - 60} shift={t * 20} />
            <Trail y={groundY} />
            <Person {...pB} outfit={BEN} expression="happy" />
            <Person {...pE} outfit={ELLA} expression="happy" />
          </g>
        }
      />
      <Vignette strength={0.35} />
      <Scrim h={1000} />
      <Title text={"He walked past\nthe free park\nstamp"} t={t} t0={0} top={130} size={136} />
      <Chip text="First hike in Zion: done" t={t} t0={1.38} x={80} y={600} icon="check" />
    </AbsoluteFill>
  );
};

// Visitor center scene, shared by S2 and S3a.
const Center: React.FC<{ t: number; lt: number; uid: string; leaving?: number; happy?: boolean; atDesk?: boolean }> = ({ t, lt, uid, leaving, happy, atDesk }) => {
  const groundY = 1800;
  const out = leaving !== undefined && t > leaving ? t - leaving : 0;
  const walking = out > 0;
  const ph = out * 3.6;
  const bx = atDesk ? 330 : 200 - out * 120;
  const ex = atDesk ? 470 : 360 - out * 120;
  const stampHand = (s: number) => (t > s && t < s + 0.22 ? -6 : -40);
  const pB: HikerProps = walking
    ? { x: bx, y: groundY + 30, scale: 1.45, phase: ph, walk: 0.6, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.6) }
    : { x: bx, y: groundY + 30, scale: 1.45, walk: 0, lean: 0.04, poles: false, handOverride: atDesk ? [50, -10] : [30, 34], breathe: Math.sin(t * 2.2) * 2 };
  const pE: HikerProps = walking
    ? { x: ex, y: groundY + 60, scale: KID, phase: ph * 1.2, walk: 0.7, lean: 0.06, poles: false, handOverride: freeHand(ph * 1.2, 0.7) }
    : { x: ex, y: groundY + 60, scale: KID, walk: 0, lean: 0.04, poles: false, handOverride: [30, 34], breathe: Math.sin(t * 2.6) * 1.5 };
  return (
    <Landscape
      uid={uid}
      pal={ZION}
      camX={lt * 4}
      zoom={mix(1.03, 1.07, Math.min(1, lt / 6))}
      foreground={
        <g>
          <Building y={groundY} />
          <BuildingSign y={groundY} />
          <rect x={-300} y={groundY - 10} width={1700} height={700} fill="#a8916e" />
          {/* other visitor stamping a booklet, behind the desk */}
          <Person x={800} y={groundY - 10} scale={1.4} walk={0} lean={0.1} poles={false} handOverride={[60, stampHand(5.06) + (t > 13.3 ? 0 : 0)]} outfit={VISITOR} expression="happy" flip breathe={Math.sin(t * 2) * 2} />
          <Desk x={560} y={groundY} t={t} stampAt={[5.06, 5.7, 13.6]} />
          {!atDesk && <Booklet x={720} y={groundY - 300} />}
          <Person {...pB} outfit={BEN} expression={happy ? "happy" : t > 6.7 ? "tired" : "neutral"} flip={walking} />
          <Person {...pE} outfit={ELLA} expression={happy ? "happy" : t > 6.7 ? "tired" : "neutral"} flip={walking} />
        </g>
      }
    />
  );
};

// ============ S2 PROBLEM: people stamping, nothing to stamp (3.2 - 9.65) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  return (
    <AbsoluteFill>
      <Center t={t} lt={lt} uid="l2" leaving={8.35} />
      <Vignette strength={0.4} />
      <Scrim h={900} />
      <Chip text="People stamping little books" t={t} t0={5.06} x={80} y={220} icon="none" />
      <Chip text="Ben: nothing to stamp" t={t} t0={7.72} x={80} y={320} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S3a FIX: the free ink stamp (9.6 - 15.95) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  return (
    <AbsoluteFill>
      <Center t={t} lt={lt} uid="l3" happy atDesk />
      <Vignette strength={0.35} />
      <Scrim h={900} />
      <Title text={"Here's\nthe fix."} t={t} t0={9.75} t1={10.7} top={200} size={160} />
      <Chip text="Most visitor centers" t={t} t0={10.72} x={80} y={220} icon="check" big />
      <Readout label="AT THE DESK" value="FREE STAMP" ok={null} t={t} t0={13.34} x={80} y={360} />
      <Chip text="Park name + date" t={t} t0={14.5} x={80} y={590} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S3b FIX: bring a page, log trail and date (15.9 - 19.75) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  return (
    <AbsoluteFill>
      <Landscape
        uid="l4"
        pal={ZION}
        camX={lt * 8}
        foreground={
          <g>
            <Cliffs y={1760} shift={900 + lt * 15} />
            <Trail y={1820} />
            <Person x={330} y={1850} scale={1.4} walk={0} lean={0.04} poles={false} handOverride={[30, 34]} outfit={BEN} expression="happy" breathe={Math.sin(t * 2.2) * 2} />
            <Person x={520} y={1880} scale={KID} walk={0} lean={0.04} poles={false} handOverride={[30, 34]} outfit={ELLA} expression="happy" breathe={Math.sin(t * 2.6) * 1.5} />
          </g>
        }
      />
      <Vignette strength={0.4} />
      <Scrim h={1100} />
      <Chip text="Bring a page for it" t={t} t0={15.94} x={80} y={150} icon="check" big />
      <ParkPage t={t} t0={16.0} t1={19.8} stampAt={16.62} trailAt={17.55} dateAt={18.23} top={300} />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: every trip leaves a mark (19.7 - 22.75) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const t = useT() + off;
  const lt = t - off;
  const groundY = 1720;
  const pE: HikerProps = { x: 640, y: groundY + 70, scale: 1.05, walk: 0, lean: 0.02, poles: false, handOverride: [50, -50], breathe: Math.sin(t * 2.8) * 1.5 };
  return (
    <AbsoluteFill>
      <Landscape
        uid="l5"
        pal={LATE}
        camX={lt * 18}
        zoom={at(lt, [0, 0.9], [1.2, 1.05], outExpo)}
        foreground={
          <g>
            <Cliffs y={groundY - 60} shift={500 + lt * 20} />
            <Pine x={1040} y={groundY - 40} h={420} c="#4f6b4a" c2="#3a5237" />
            <Trail y={groundY} />
            <Person x={420} y={groundY + 40} scale={1.6} walk={0} lean={0.04} poles={false} handOverride={[30, 34]} outfit={BEN} expression="happy" breathe={Math.sin(t * 2.4) * 2} />
            <Person {...pE} outfit={ELLA} expression="happy" />
            <g transform={hikerTransform(pE)}>
              <g transform="translate(66,-92) rotate(-6)">
                <rect x={-40} y={-50} width={80} height={100} rx={4} fill="#fbf8f1" stroke="#c9c2b2" strokeWidth={3} />
                <circle cx={0} cy={-14} r={24} fill="none" stroke="#2F5D8A" strokeWidth={5} />
                <rect x={-26} y={22} width={52} height={5} fill="#9a9488" />
                <rect x={-26} y={34} width={36} height={5} fill="#9a9488" />
              </g>
            </g>
          </g>
        }
      />
      <Vignette strength={0.3} />
      <Scrim h={800} />
      <Title text={"Every trip\nleaves a mark."} t={t} t0={off + 0.1} top={190} size={150} />
      <Chip text="Park number 1: stamped" t={t} t0={20.48} x={80} y={540} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S5 END CARD ============
const S5: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/national-parks-tracker-card.jpg"
      spec="STAMP BOX + VISIT LOG FOR ALL 63 PARKS"
      name={
        <>
          National Parks
          <br />
          Hiking Tracker
        </>
      }
      nameSize={88}
      price="$4.99"
      save="Save this before your next park visit"
    />
  );
};

export const V52: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Scene from={0} to={3.25} fadeIn={0}>
        <S1 />
      </Scene>
      <Scene from={3.2} to={9.65}>
        <S2 off={3.2} />
      </Scene>
      <Scene from={9.6} to={15.95}>
        <S3a off={9.6} />
      </Scene>
      <Scene from={15.9} to={19.75}>
        <S3b off={15.9} />
      </Scene>
      <Scene from={19.7} to={22.75} fadeIn={0.12}>
        <S4 off={19.7} />
      </Scene>
      <Scene from={22.7} to={30} fadeOut={0}>
        <S5 />
      </Scene>
      <Captions
        words={words}
        windows={[
          [0.3, 3.2, 960],
          [3.2, 9.6, 960],
          [9.6, 15.9, 1000],
          [15.9, 19.7, 1050],
          [19.7, 22.7, 900],
        ]}
      />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
