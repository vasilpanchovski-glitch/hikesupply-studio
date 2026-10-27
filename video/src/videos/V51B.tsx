// V51B: v51 "Four parks in ten years" rebuilt in the cinematic illustrated style of C01 (same script, hook, product).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, isClean, Word } from "../Type";
import { Chip, EndCard, freeHand, HEAD, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v51b.json";

const words = vo.words as unknown as Word[];

const PARK: Sky = { top: "#3a6fa8", mid: "#b6d0e4", low: "#f6e6c8", sun: [820, 600], sunR: 54, sunCol: "#fffbe8", glow: "#ffe2a6" };
const DULL: Sky = { top: "#5e6c7a", mid: "#a6adb2", low: "#d8d6cc", sun: [240, 720], sunR: 38, sunCol: "#f2f0e6", glow: "#e0ddd0" };
const GOLD: Sky = { top: "#4a6c98", mid: "#e9b487", low: "#ffdcaa", sun: [760, 760], sunR: 60, sunCol: "#fff6dc", glow: "#ffc77a" };

const MIA: Outfit = {
  ...GUIDE,
  skin: "#E0B08E",
  skinShade: "#C29070",
  hair: "#6a3e22",
  ponytail: "#6a3e22",
  beard: null,
  cap: "#3E5F4B",
  capShade: "#2E4A39",
  jacket: "#2F7F86",
  jacketShade: "#256870",
  pants: "#5a5046",
  pantsShade: "#463e36",
  pack: "#B5553A",
  packShade: "#8E3F2A",
};

// ---------- scenery ----------
const Buttes: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {[0, 1, 2, 3].map((i) => {
      const x = ((((-200 + i * 480 - shift) % 1920) + 1920) % 1920) - 400;
      const w = 300 + (i % 2) * 140;
      const h = 380 + (i % 3) * 90;
      return (
        <g key={i}>
          <path d={`M${x},${y} L${x + 40},${y - h} L${x + w - 40},${y - h} L${x + w},${y} Z`} fill="#b65e3a" />
          <path d={`M${x + w * 0.55},${y - h} L${x + w - 40},${y - h} L${x + w},${y} L${x + w * 0.6},${y} Z`} fill="#94472a" />
          <rect x={x + 40} y={y - h} width={w - 80} height={16} fill="#c97a52" />
          <rect x={x + 30} y={y - h * 0.55} width={w - 60} height={10} fill="#a5532f" opacity={0.7} />
        </g>
      );
    })}
    {Array.from({ length: 7 }, (_, i) => {
      const x = ((((i * 260 - shift * 1.3) % 1820) + 1820) % 1820) - 300;
      return <Pine key={i} x={x} y={y + 30 + (i % 2) * 16} h={180 + (i % 3) * 40} c="#5b7a4a" c2="#46613a" />;
    })}
  </Svg>
);

const Trail: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={1000} fill="#c49468" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 6} L1480,${y + 110} Q540,${y + 90} -400,${y + 110} Z`} fill="#e0c196" />
    {Array.from({ length: 14 }, (_, i) => {
      const x = ((((i * 149 - shift) % 2040) + 2040) % 2040) - 400;
      return <ellipse key={i} cx={x} cy={y + 170 + ((i * 59) % 260)} rx={18} ry={8} fill="#a07a52" opacity={0.7} />;
    })}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, sky, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col="#ffffff" seed={33} drift={t * 10} opacity={0.4} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={71} base={treeY - 300} amp={300} scale={280} col="#c79b86" />
    </Plane>
    <Haze y={treeY - 430} h={360} col={sky.low} opacity={0.6} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={77} base={treeY - 140} amp={180} scale={200} col="#b17a5c" />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.35} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Buttes y={treeY} shift={cam.x * 0.2} />
    </Plane>
  </>
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Phone held in the near hand.
const Phone: React.FC<{ p: HikerProps }> = ({ p }) => {
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <g transform={hikerTransform(p)}>
      <g transform={`translate(${h[0] + 4},${h[1] - 8}) rotate(-18)`}>
        <rect x={-12} y={-22} width={24} height={40} rx={4} fill="#1d1f1e" />
        <rect x={-9} y={-18} width={18} height={31} rx={2} fill="#dfeef3" />
        <rect x={-6} y={-14} width={12} height={4} rx={1} fill="#3E5F4B" />
        <rect x={-6} y={-6} width={12} height={2} fill="#9a9488" />
        <rect x={-6} y={-2} width={9} height={2} fill="#9a9488" />
      </g>
    </g>
  );
};

// Close-up prop: the tracker page on a table with all 63 parks, a pen circles the next one.
const TrackerPage: React.FC<{ t: number; t0: number; ringAt: number; filled: number }> = ({ t, t0, ringAt, filled }) => {
  const cols = 7;
  const ringIdx = 26;
  const appear = at(t, [t0, t0 + 0.5], [0, 1], outExpo);
  const ring = at(t, [ringAt, ringAt + 0.6], [0, 1]);
  const rc = [230 + (ringIdx % cols) * 104, 520 + Math.floor(ringIdx / cols) * 92];
  const pen = at(t, [ringAt - 0.3, ringAt], [0, 1], outExpo);
  return (
    <Svg>
      <rect x={-200} y={-200} width={1480} height={2400} fill="#7a5a3e" />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M-200,${120 + i * 170} Q540,${90 + i * 170} 1280,${130 + i * 170}`} stroke="#6a4c33" strokeWidth={8} fill="none" opacity={0.6} />
      ))}
      <g transform={`translate(0,${mix(80, 0, appear) + 110}) rotate(-2 540 960) translate(540 960) scale(0.88) translate(-540 -960)`} opacity={appear}>
        <rect x={120} y={330} width={840} height={1150} rx={10} fill="#fbf8f1" />
        <rect x={120} y={330} width={840} height={1150} rx={10} fill="none" stroke="#d9d2c2" strokeWidth={4} />
        <rect x={190} y={390} width={420} height={30} rx={6} fill="#2E4A39" />
        <rect x={190} y={436} width={280} height={14} rx={5} fill="#b5ad9c" />
        {Array.from({ length: 63 }, (_, i) => {
          const cx = 230 + (i % cols) * 104;
          const cy = 520 + Math.floor(i / cols) * 92;
          return (
            <g key={i}>
              <rect x={cx - 34} y={cy - 30} width={68} height={60} rx={8} fill={i < filled ? "#3E8E5A" : "#efeadf"} stroke="#d9d2c2" strokeWidth={2} />
            </g>
          );
        })}
        {ring > 0 && (
          <path
            d={`M${rc[0] + 56},${rc[1]} A56,48 0 1 1 ${rc[0] + 56 * Math.cos(Math.PI * 2 * ring - 0.01)},${rc[1] + 48 * Math.sin(Math.PI * 2 * ring - 0.01)}`}
            stroke="#D9443A"
            strokeWidth={9}
            fill="none"
            strokeLinecap="round"
          />
        )}
      </g>
      {/* pen */}
      <g transform={`translate(0,110) translate(540 960) scale(0.88) translate(-540 -960) translate(${mix(1000, rc[0] + 60 + Math.cos(Math.PI * 2 * ring) * 30, pen)},${mix(1500, rc[1] + 40 + Math.sin(Math.PI * 2 * ring) * 26, pen)}) rotate(35)`}>
        <rect x={-14} y={0} width={28} height={300} rx={12} fill="#2b2f33" />
        <path d="M-14,0 L0,-40 L14,0 Z" fill="#c9a77c" />
        <path d="M-4,-28 L0,-40 L4,-28 Z" fill="#D9443A" />
      </g>
    </Svg>
  );
};

// Card: 4 of 63 seen.
const SeenCard: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  if (isClean()) return null;
  const n = Math.round(at(t, [t0 + 0.2, t0 + 0.8], [0, 4]));
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 300,
        height: 640,
        borderRadius: 30,
        background: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        scale: `${at(t, [t0, t0 + 0.4], [0.92, 1], outExpo)}`,
      }}
    >
      <div style={{ position: "absolute", top: 34, left: 0, right: 0, textAlign: "center", fontFamily: HEAD, fontWeight: 800, fontSize: 64, letterSpacing: 2, color: "#2a2a26" }}>
        PARKS SEEN: {n} OF 63
      </div>
      <svg width={920} height={640} viewBox="0 0 920 640" style={{ position: "absolute", top: 0, left: 0 }}>
        {Array.from({ length: 63 }, (_, i) => {
          const cx = 100 + (i % 9) * 90;
          const cy = 170 + Math.floor(i / 9) * 64;
          return <circle key={i} cx={cx} cy={cy} r={23} fill={i < n ? "#3E8E5A" : "#ece8df"} />;
        })}
      </svg>
    </div>
  );
};

// ============ S1 HOOK: Mia loved national parks (0 - 2.2) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: t * 24 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 2.2), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 380, y: g + 40, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={PARK} uid="a" treeY={g - 80} blur={1} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject rimX={-5} col="rgba(255,226,170,0.85)">
          <Person {...p} outfit={MIA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2a1c" side="right" />
      </Plane>
      <Rays x={PARK.sun[0]} y={PARK.sun[1]} strength={0.28} />
      <Particles seed={511} n={18} col="#fff2d0" />
      <Grade sunX={820} sunY={600} />
      <Title text={"She'd seen 4 national\nparks. There are 63."} t={t} t0={0} top={130} size={100} />
      <Chip text="Loved national parks" t={t} t0={0.61} x={80} y={420} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S2a CLOSE-UP: every year the trip got pushed back (2.15 - 6.6) ============
const S2a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.14, lt / 4.45), rot: hh.rot };
  const p: HikerProps = { x: 450, y: 2330, scale: 4.4, walk: 0, lean: 0.12, poles: false, handOverride: [56, -84], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DULL} uid="b" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col="rgba(240,236,226,0.6)">
          <Person {...p} outfit={MIA} expression="tired" />
          <Phone p={p} />
        </Subject>
      </Plane>
      <Particles seed={512} n={12} col="#f2efe6" />
      <Grade sunX={240} sunY={720} warm="230,228,222" vignette={0.65} />
      <Chip text="Trip pushed back" t={t} t0={3.71} x={80} y={240} icon="x" big />
      <Readout label="IN 10 YEARS" value="4 PARKS" ok={false} t={t} t0={4.73} x={80} y={370} pulseAt={6.1} />
    </AbsoluteFill>
  );
};

// ============ S2b CARD: there are 63 (6.55 - 8.3) ============
const S2b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 1.75), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={DULL} uid="c" treeY={1300} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <SeenCard t={t} t0={6.6} />
      </Plane>
      <Grade sunX={240} sunY={720} warm="230,228,222" vignette={0.6} />
    </AbsoluteFill>
  );
};

// ============ S3a PROP CLOSE-UP: every park on one page, circle the next one (8.25 - 13.7) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 5.45), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#5a4030" }}>
      <Plane cam={cam} depth={1}>
        <TrackerPage t={t} t0={8.4} ringAt={11.3} filled={4} />
      </Plane>
      <Particles seed={513} n={10} col="#ffe7b8" bokeh />
      <Grade sunX={540} sunY={700} warm="255,215,170" vignette={0.6} />
      <Title text={"Every park\non one page."} t={t} t0={9.22} t1={11.15} top={130} size={120} />
      <Chip text="Circle the next one" t={t} t0={11.21} x={80} y={130} icon="check" big />
      <Chip text="Plan it in the off season" t={t} t0={12.57} x={80} y={260} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3b MEDIUM: one easy day hike there (13.65 - 17.35) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: mix(1.04, 1.1, lt / 3.7), rot: hh.rot };
  const g = 1460;
  const ph = t * 5;
  const p: HikerProps = { x: 300 + lt * 50, y: g + 40, scale: 2.3, phase: ph, walk: 0.6, lean: 0.08, poles: false, handOverride: freeHand(ph, 0.6) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={PARK} uid="d" treeY={g - 80} blur={1.5} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject rimX={-5} col="rgba(255,226,170,0.85)">
          <Person {...p} outfit={MIA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2a1c" side="left" />
      </Plane>
      <Rays x={PARK.sun[0]} y={PARK.sun[1]} strength={0.25} />
      <Particles seed={514} n={16} col="#fff2d0" />
      <Grade sunX={820} sunY={600} />
      <Chip text="One easy day hike" t={t} t0={14.38} x={80} y={240} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S3c CLOSE-UP: check nps.gov for timed entry or reservations (17.3 - 21.9) ============
const S3c: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 4.6), rot: hh.rot };
  const p: HikerProps = { x: 430, y: 2330, scale: 4.4, walk: 0, lean: 0.1, poles: false, handOverride: [58, -88], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={PARK} uid="e" treeY={1250} blur={9} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col="rgba(255,226,170,0.85)">
          <Person {...p} outfit={MIA} expression="neutral" />
          <Phone p={p} />
        </Subject>
      </Plane>
      <Particles seed={515} n={12} col="#fff2d0" />
      <Grade sunX={820} sunY={600} vignette={0.6} />
      <Chip text="Check the park's page on nps.gov" t={t} t0={16.7} x={80} y={240} icon="check" big />
      <Chip text="Timed entry?" t={t} t0={19.04} x={80} y={370} icon="check" big />
      <Chip text="Reservations?" t={t} t0={20.3} x={80} y={500} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4 PAYOFF: by spring, the summer trip was booked (21.85 - 24.55) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.6);
  const cam: Cam = { x: lt * 26 + hh.x, y: hh.y, zoom: at(lt, [0, 1.4], [1.12, 1.04]), rot: hh.rot };
  const g = 1460;
  const p: HikerProps = { x: 420, y: g + 40, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [46, -196], breathe: Math.sin(t * 2.4) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={GOLD} uid="f" treeY={g - 80} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g} shift={cam.x} />
        <Subject rimX={-5} col="rgba(255,200,140,0.85)">
          <Person {...p} outfit={MIA} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#2a2a1c" side="right" />
      </Plane>
      <Rays x={GOLD.sun[0]} y={GOLD.sun[1]} strength={0.32} col="255,200,150" />
      <Particles seed={516} n={20} col="#ffe7b8" bokeh />
      <Grade sunX={760} sunY={760} warm="255,190,120" />
      <Title text={"Summer trip:\nbooked."} t={t} t0={off + 0.1} top={170} size={140} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/national-parks-tracker-card.jpg"
      photoH={760}
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
      save="Save this while you plan next year"
    />
  );
};

export const V51B: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.2} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={2.15} to={6.6} fadeIn={0.1} fadeOut={0.1}>
      <S2a off={2.15} />
    </Scene>
    <Scene from={6.55} to={8.3} fadeIn={0.08} fadeOut={0.1}>
      <S2b off={6.55} />
    </Scene>
    <Scene from={8.25} to={13.7} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={8.25} />
    </Scene>
    <Scene from={13.65} to={17.35} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={13.65} />
    </Scene>
    <Scene from={17.3} to={21.9} fadeIn={0.1} fadeOut={0.1}>
      <S3c off={17.3} />
    </Scene>
    <Scene from={21.85} to={24.55} fadeIn={0.12} fadeOut={0.12}>
      <S4 off={21.85} />
    </Scene>
    <Scene from={24.45} to={29} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.15, 1560],
        [2.15, 6.55, 1560],
        [6.55, 8.25, 1560],
        [8.25, 13.65, 1560],
        [13.65, 17.3, 1560],
        [17.3, 21.85, 1560],
        [21.85, 24.45, 1560],
      ]}
    />
  </AbsoluteFill>
);
