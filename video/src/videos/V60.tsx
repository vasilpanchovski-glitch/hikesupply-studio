// V60: "Smokies summit road closed for ice" in the cinematic illustrated style of C01.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, GUIDE, Outfit } from "../Person";
import { at, mix } from "../lib";
import { Captions, Word } from "../Type";
import { Car, Chip, EndCard, freeHand, HEAD, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import vo from "../vo/v60.json";

const words = vo.words as unknown as Word[];

const ICY: Sky = { top: "#5f7a99", mid: "#a9bccd", low: "#e3e8ec", sun: [800, 560], sunR: 40, sunCol: "#f6f6f0", glow: "#dfe6ec" };
const FALLDAY: Sky = { top: "#3f6f9e", mid: "#9cc0d8", low: "#f2dcb2", sun: [820, 520], sunR: 54, sunCol: "#fff6dc", glow: "#ffd79a" };

const DAD: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#BB8262",
  hair: "#2e231c",
  beard: "#2e231c",
  cap: "#2f4a5e",
  capShade: "#223848",
  jacket: "#3E6E8E",
  jacketShade: "#2C5470",
};
const MOM: Outfit = {
  ...GUIDE,
  skin: "#EBC0A0",
  skinShade: "#CFA07E",
  hair: "#8a5a2e",
  ponytail: "#8a5a2e",
  beard: null,
  cap: "#C9B48E",
  capShade: "#A8946F",
  jacket: "#8E3D34",
  jacketShade: "#702f28",
  pants: "#4A4E55",
  pantsShade: "#363A40",
};
const FALL = ["#c9662e", "#d9a34a", "#b5553a", "#8e3f2a", "#e2b04a"];

// ---------- scenery ----------
const FrostWoods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 11 }, (_, i) => {
      const x = ((((-160 + i * 160 - shift) % 1760) + 1760) % 1760) - 300;
      const h = 420 + (i % 3) * 80;
      return (
        <g key={i}>
          <Pine x={x} y={y + (i % 2) * 20} h={h} c="#3a5048" c2="#2c3f39" />
          <path d={`M${x - h * 0.18},${y - h * 0.3 + (i % 2) * 20} l${h * 0.18},-${h * 0.13} l${h * 0.18},${h * 0.13}`} stroke="#f2f6fa" strokeWidth={10} fill="none" opacity={0.8} />
          <path d={`M${x - h * 0.12},${y - h * 0.58 + (i % 2) * 20} l${h * 0.12},-${h * 0.1} l${h * 0.12},${h * 0.1}`} stroke="#f2f6fa" strokeWidth={8} fill="none" opacity={0.8} />
        </g>
      );
    })}
  </Svg>
);

const FallWoods: React.FC<{ y: number; shift: number }> = ({ y, shift }) => (
  <Svg>
    {Array.from({ length: 10 }, (_, i) => {
      const x = ((((-160 + i * 180 - shift) % 1800) + 1800) % 1800) - 300;
      const h = 380 + (i % 3) * 90;
      return <LeafTree key={i} x={x} y={y + (i % 2) * 20} h={h} c={FALL[i % 5]} c2={FALL[(i + 2) % 5]} />;
    })}
  </Svg>
);

// Icy mountain road with a frosted shoulder.
const IcyRoad: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y - 60} width={1880} height={900} fill="#dfe6ea" />
    <path d={`M-400,${y - 10} L1480,${y - 10} L1480,${y + 130} L-400,${y + 130} Z`} fill="#56595e" />
    <path d={`M-400,${y + 20} L1480,${y + 40} L1480,${y + 70} L-400,${y + 46} Z`} fill="#c9dbe6" opacity={0.55} />
    {Array.from({ length: 12 }, (_, i) => (
      <rect key={i} x={-380 + i * 170} y={y + 58} width={90} height={8} fill="#e8d9a8" opacity={0.7} />
    ))}
    {Array.from({ length: 10 }, (_, i) => (
      <ellipse key={i} cx={-300 + i * 190} cy={y - 40} rx={50} ry={16} fill="#f6f9fb" />
    ))}
  </Svg>
);

// Striped "road closed" gate with a sign and icicles.
const Gate: React.FC<{ x: number; y: number; s?: number; sign?: boolean }> = ({ x, y, s = 1, sign = true }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-190} y={-150} width={14} height={150} fill="#5a5a5a" />
    <rect x={176} y={-150} width={14} height={150} fill="#5a5a5a" />
    <rect x={-200} y={-118} width={400} height={36} fill="#f2f0ea" />
    {Array.from({ length: 7 }, (_, i) => (
      <path key={i} d={`M${-190 + i * 56},-118 l26,0 l-20,36 l-26,0 Z`} fill="#c8432f" />
    ))}
    {Array.from({ length: 9 }, (_, i) => (
      <path key={i} d={`M${-180 + i * 44},-82 l8,0 l-4,${18 + (i % 3) * 10} Z`} fill="#e8f4fa" />
    ))}
    {sign && (
      <g transform="translate(0,-200)">
        <rect x={-130} y={-46} width={260} height={92} rx={8} fill="#f2f0ea" stroke="#c8432f" strokeWidth={8} />
        <text x={0} y={-4} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#c8432f">ROAD CLOSED</text>
        <text x={0} y={34} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={30} fill="#3a3a3a">ICE ON ROAD</text>
      </g>
    )}
  </g>
);

const Falls: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => (
  <Svg>
    <path d={`M${x - 300},${y} L${x - 230},${y - 600} L${x + 230},${y - 620} L${x + 300},${y} Z`} fill="#6e6a60" />
    <path d={`M${x - 230},${y - 600} L${x - 120},${y - 610} L${x - 180},${y} L${x - 300},${y} Z`} fill="#5a564e" />
    <rect x={x - 80} y={y - 600} width={160} height={600} fill="#cfe6ee" />
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={x - 70 + i * 18} y={y - 600 + ((t * 460 + i * 97) % 600)} width={6} height={100} fill="#ffffff" opacity={0.75} />
    ))}
    <ellipse cx={x} cy={y + 10} rx={280} ry={46} fill="#e8f4f6" opacity={0.85} />
  </Svg>
);

const Trail: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y - 50} width={1880} height={1000} fill="#6b6a3e" />
    <path d={`M-400,${y - 6} Q540,${y - 26} 1480,${y - 6} L1480,${y + 110} Q540,${y + 90} -400,${y + 110} Z`} fill="#9a7b5c" />
    {Array.from({ length: 16 }, (_, i) => (
      <path key={i} d={`M${-300 + i * 110},${y + 150 + (i % 3) * 60} l14,-10 l14,10 Z`} fill={FALL[i % 5]} opacity={0.8} />
    ))}
  </Svg>
);

const Backdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; blur?: number; t: number; fall?: boolean }> = ({ cam, sky, uid, treeY, blur = 0, t, fall }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={sky} uid={uid} />
      <Clouds y={420} col={fall ? "#ffffff" : "#e8edf2"} seed={29} drift={t * 10} opacity={0.5} />
    </Plane>
    <Plane cam={cam} depth={0.13} blur={2.6 + blur}>
      <Ridge seed={60} base={treeY - 300} amp={340} scale={260} col={fall ? "#5b6e8a" : "#7b8ea4"} lit={fall ? "#a9b8cc" : "#f4f7fa"} peak={90} />
    </Plane>
    <Haze y={treeY - 420} h={360} col={sky.low} opacity={0.55} />
    <Plane cam={cam} depth={0.28} blur={1.6 + blur}>
      <Ridge seed={64} base={treeY - 130} amp={230} scale={190} col={fall ? "#4a5e58" : "#5c7078"} />
    </Plane>
    <Haze y={treeY - 220} h={260} col={sky.low} opacity={0.35} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>{fall ? <FallWoods y={treeY} shift={cam.x * 0.2} /> : <FrostWoods y={treeY} shift={cam.x * 0.2} />}</Plane>
  </>
);

// Darker ground band behind the captions on bright snowy shots.
const Shade: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, bottom: 0, background: "linear-gradient(180deg, rgba(18,26,34,0) 0%, rgba(18,26,34,0.55) 35%, rgba(18,26,34,0.65) 100%)" }} />
);

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// ============ S1 HOOK: wide, car stopped at the closed gate (0 - 3.0) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.7);
  const cam: Cam = { x: t * 16 + hh.x, y: hh.y, zoom: mix(1.0, 1.07, t / 3), rot: hh.rot };
  const g = 1480;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={ICY} uid="a" treeY={g - 120} blur={1} t={t} />
      <Plane cam={cam} depth={1}>
        <IcyRoad y={g} />
        <Subject rimX={3} col="rgba(255,255,255,0.7)">
          <Gate x={720} y={g + 60} s={1.25} />
          <Car x={260} y={g + 120} s={1.45} body="#7f8c99" shade="#64707c" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.6} blur={12}>
        <FrameLeaves col="#1e2a28" side="right" />
      </Plane>
      <Particles seed={601} n={30} col="#ffffff" fall={60} bokeh={false} />
      <Shade />
      <Grade sunX={800} sunY={560} cool="190,210,235" vignette={0.5} />
      <Title text={"The road to\nthe summit\nwas closed"} t={t} t0={0} top={130} size={130} />
    </AbsoluteFill>
  );
};

// ============ S1b MEDIUM: the Parkers by the car, two hours of driving (3.0 - 6.05) ============
const S1b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.55);
  const cam: Cam = { x: -lt * 14 + hh.x, y: hh.y, zoom: mix(1.02, 1.09, lt / 3.05), rot: hh.rot };
  const g = 1500;
  const dad: HikerProps = { x: 640, y: g, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [30, 30], breathe: Math.sin(t * 2.3) * 2 };
  const mom: HikerProps = { x: 330, y: g + 20, scale: 2.3, walk: 0, lean: 0.02, poles: false, handOverride: [26, 32], breathe: Math.sin(t * 2.6) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={ICY} uid="b" treeY={g - 100} blur={3} t={t} />
      <Plane cam={cam} depth={1}>
        <IcyRoad y={g} />
        <Subject rimX={3} col="rgba(255,255,255,0.7)">
          <Car x={-80} y={g + 60} s={2.2} body="#7f8c99" shade="#64707c" />
          <Person {...mom} outfit={MOM} expression="tired" />
          <Person {...dad} outfit={DAD} expression="tired" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1e2a28" side="right" />
      </Plane>
      <Particles seed={602} n={26} col="#ffffff" fall={60} bokeh={false} />
      <Shade />
      <Grade sunX={800} sunY={560} cool="190,210,235" vignette={0.55} />
      <Chip text="2-hour drive" t={t} t0={3.1} x={80} y={220} icon="none" big />
      <Readout label="GOING TO" value="KUWOHI SUMMIT" ok={null} t={t} t0={3.5} x={80} y={350} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: the gate, shut for ice (6.0 - 7.85) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4, t > 7.2 && t < 7.4 ? 0.7 : 0);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, lt / 1.85), rot: hh.rot };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={ICY} uid="c" treeY={1300} blur={10} t={t} />
      <Plane cam={cam} depth={1}>
        <IcyRoad y={1500} />
        <Subject rimX={3} col="rgba(255,255,255,0.7)">
          <Gate x={540} y={1460} s={2.4} />
        </Subject>
      </Plane>
      <Particles seed={603} n={30} col="#ffffff" fall={60} bokeh={false} />
      <Shade />
      <Grade sunX={800} sunY={560} cool="190,210,235" vignette={0.6} />
      <Readout label="GATE" value="SHUT FOR ICE" ok={false} t={t} t0={6.1} x={80} y={220} pulseAt={7.22} />
    </AbsoluteFill>
  );
};

// ============ S3a WIDE: high road in late fall, snow and ice (7.85 - 11.6) ============
const S3a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 26 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3.75), rot: hh.rot };
  const g = 1560;
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={ICY} uid="d" treeY={g - 160} t={t} />
      <Plane cam={cam} depth={0.8}>
        <Svg>
          <path d={`M-200,${g - 40} Q300,${g - 260} 700,${g - 360} Q900,${g - 420} 1300,${g - 520}`} stroke="#56595e" strokeWidth={60} fill="none" />
          <path d={`M-200,${g - 40} Q300,${g - 260} 700,${g - 360} Q900,${g - 420} 1300,${g - 520}`} stroke="#c9dbe6" strokeWidth={14} fill="none" opacity={0.7} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-400} y={g} width={1880} height={500} fill="#e6ecef" />
        </Svg>
      </Plane>
      <Particles seed={604} n={44} col="#ffffff" fall={90} bokeh={false} />
      <Shade />
      <Grade sunX={800} sunY={560} cool="190,210,235" vignette={0.5} />
      <Chip text="Late fall" t={t} t0={8.18} x={80} y={220} icon="none" big />
      <Chip text="High roads can close" t={t} t0={8.78} x={80} y={350} icon="x" big />
      <Chip text="Snow and ice" t={t} t0={10.74} x={80} y={480} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S3b CLOSE-UP: Kuwohi Road closes for winter (11.6 - 15.75) ============
const S3b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.08, 1.02, lt / 4.15), rot: hh.rot };
  const mark = at(t, [14.2, 14.9], [0, 1]);
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={ICY} uid="e" treeY={1250} blur={12} t={t} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={3} col="rgba(255,255,255,0.7)">
          <g transform="translate(540,1080) rotate(-4)">
            <rect x={-12} y={0} width={24} height={600} fill="#5a4636" />
            <rect x={-330} y={-250} width={660} height={300} rx={18} fill="#3a4a3e" stroke="#e6dccb" strokeWidth={10} />
            <text x={0} y={-150} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={74} fill="#f2f0ea">KUWOHI ROAD</text>
            <text x={0} y={-70} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={50} fill="#e6dccb">CLOSED FOR WINTER</text>
            <rect x={-280} y={-30} width={560 * mark} height={56} rx={10} fill="#c8432f" />
            <text x={0} y={12} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#fff" opacity={mark}>FROM DECEMBER 1</text>
          </g>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={16}>
        <FrameLeaves col="#1e2a28" side="left" />
      </Plane>
      <Particles seed={605} n={30} col="#ffffff" fall={60} bokeh={false} />
      <Shade />
      <Grade sunX={800} sunY={560} cool="190,210,235" vignette={0.6} />
      <Chip text="Winter closure" t={t} t0={12.57} x={80} y={220} icon="x" big />
      <Chip text="End of November" t={t} t0={14.18} x={80} y={350} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S4a CLOSE-UP: check the park's road status the morning you go (15.75 - 19.6) ============
const S4a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.35);
  const cam: Cam = { x: hh.x, y: at(lt, [0, 1.2], [-40, 0]) + hh.y, zoom: mix(1.08, 1.02, lt / 3.85), rot: hh.rot };
  const scroll = at(t, [17.4, 18.0], [0, 1]);
  return (
    <AbsoluteFill style={{ background: "#1a1410" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 50% at 50% 45%, #6a4a2e 0%, #1a1410 75%)" }} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <rect x={-100} y={1300} width={1280} height={700} fill="#5a4636" />
          <g transform="translate(540,1040) rotate(-6)">
            <ellipse cx={0} cy={470} rx={330} ry={40} fill="#000" opacity={0.3} />
            <rect x={-230} y={-420} width={460} height={860} rx={50} fill="#1d2024" />
            <rect x={-205} y={-380} width={410} height={780} rx={22} fill="#f2f0ea" />
            <rect x={-205} y={-380} width={410} height={110} rx={22} fill="#2C3B2E" />
            <text x={0} y={-308} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#f2f0ea">PARK ROAD STATUS</text>
            {[0, 1, 2, 3].map((i) => (
              <g key={i} transform={`translate(0,${-200 + i * 130})`} opacity={at(t, [16.9 + i * 0.25, 17.2 + i * 0.25], [0, 1])}>
                <rect x={-180} y={-40} width={360} height={90} rx={14} fill="#e6dccb" />
                <rect x={-160} y={-14} width={170} height={16} rx={8} fill="#8a8476" />
                <rect x={-160} y={12} width={110} height={12} rx={6} fill="#b5ad9c" />
                <circle cx={140} cy={4} r={22} fill={i === 1 && scroll > 0.5 ? "#c8432f" : "#3E8E5A"} />
              </g>
            ))}
          </g>
          {/* thumb */}
          <g transform="translate(830,1420) rotate(-30)">
            <rect x={-60} y={-40} width={300} height={130} rx={60} fill="#D9A07E" />
            <ellipse cx={-50} cy={20} rx={60} ry={50} fill="#D9A07E" />
          </g>
        </Svg>
      </Plane>
      <Particles seed={606} n={12} col="#ffe2b0" />
      <Grade sunX={540} sunY={900} warm="255,190,130" vignette={0.6} />
      <Chip text="Check road status" t={t} t0={16.82} x={80} y={150} icon="check" big />
      <Chip text="The morning you go" t={t} t0={18.63} x={80} y={280} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S4b MEDIUM: plan B, a lower trail (19.55 - 22.25) ============
const S4b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 30 + hh.x, y: hh.y, zoom: mix(1.02, 1.08, lt / 2.7), rot: hh.rot };
  const g = 1480;
  const ph = t * 4.6;
  const dad: HikerProps = { x: 560 + lt * 40, y: g, scale: 2.3, phase: ph, walk: 0.55, lean: 0.06, poles: false, handOverride: freeHand(ph, 0.55) };
  const mom: HikerProps = { x: 260 + lt * 40, y: g + 20, scale: 2.3, phase: ph + 1.4, walk: 0.55, lean: 0.06, poles: false, handOverride: freeHand(ph + 1.4, 0.55) };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={FALLDAY} uid="f" treeY={g - 120} blur={2.5} t={t} fall />
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Svg>
          <g transform={`translate(${880},${g - 10})`}>
            <rect x={-10} y={-360} width={20} height={360} fill="#5a4636" />
            <path d="M-170,-340 L130,-340 L170,-300 L130,-260 L-170,-260 Z" fill="#7a5a3a" stroke="#4a3626" strokeWidth={5} />
            <text x={-10} y={-286} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={44} fill="#f2e6cc">PLAN B</text>
          </g>
        </Svg>
        <Subject rimX={4}>
          <Person {...mom} outfit={MOM} expression="happy" />
          <Person {...dad} outfit={DAD} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3a2a18" side="left" />
      </Plane>
      <Rays x={FALLDAY.sun[0]} y={FALLDAY.sun[1]} strength={0.18} />
      <Particles seed={607} n={20} col="#fff0d0" leaves={FALL} fall={40} />
      <Grade sunX={820} sunY={520} warm="255,205,160" vignette={0.5} />
      <Chip text="Plan B: a lower trail" t={t} t0={20.25} x={80} y={220} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 PAYOFF WIDE: they hiked to a waterfall (22.2 - 24.1) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: -lt * 14 + hh.x, y: hh.y, zoom: mix(1.1, 1.0, at(lt, [0, 1.2], [0, 1])), rot: hh.rot };
  const g = 1520;
  const dad: HikerProps = { x: 880, y: g, scale: 1.9, walk: 0, lean: 0.02, poles: false, handOverride: [40, 10], breathe: Math.sin(t * 2.3) * 2 };
  const mom: HikerProps = { x: 190, y: g + 20, scale: 1.9, walk: 0, lean: 0.02, poles: false, handOverride: [60, -170], breathe: Math.sin(t * 2.6) * 2 };
  return (
    <AbsoluteFill>
      <Backdrop cam={cam} sky={FALLDAY} uid="g" treeY={g - 260} blur={2} t={t} fall />
      <Plane cam={cam} depth={0.85}>
        <Falls x={560} y={g - 120} t={t} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Trail y={g} />
        <Subject rimX={4}>
          <Person {...mom} outfit={MOM} expression="happy" />
          <Person {...dad} outfit={DAD} expression="happy" flip />
        </Subject>
      </Plane>
      <Rays x={FALLDAY.sun[0]} y={FALLDAY.sun[1]} strength={0.22} />
      <Particles seed={608} n={24} col="#fff0d0" leaves={FALL} fall={40} />
      <Grade sunX={820} sunY={520} warm="255,205,160" vignette={0.45} />
      <Readout label="PLAN B" value="WATERFALL HIKE" ok={true} t={t} t0={22.3} x={80} y={220} pulseAt={22.96} />
    </AbsoluteFill>
  );
};

const S6: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/great-smoky-mountains-trip-pack-card.jpg"
      photoH={760}
      spec="PLANNING GUIDE + 10 GPX DAY HIKES"
      name={
        <>
          Smokies
          <br />
          Trip Pack
        </>
      }
      nameSize={96}
      price="$19.99"
      save="Save this before your Smokies trip"
    />
  );
};

export const V60: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.05} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.0} to={6.1} fadeIn={0.1} fadeOut={0.1}>
      <S1b off={3.0} />
    </Scene>
    <Scene from={6.05} to={7.9} fadeIn={0.1} fadeOut={0.1}>
      <S2 off={6.05} />
    </Scene>
    <Scene from={7.85} to={11.65} fadeIn={0.1} fadeOut={0.1}>
      <S3a off={7.85} />
    </Scene>
    <Scene from={11.6} to={15.8} fadeIn={0.1} fadeOut={0.1}>
      <S3b off={11.6} />
    </Scene>
    <Scene from={15.75} to={19.6} fadeIn={0.1} fadeOut={0.1}>
      <S4a off={15.75} />
    </Scene>
    <Scene from={19.55} to={22.25} fadeIn={0.1} fadeOut={0.1}>
      <S4b off={19.55} />
    </Scene>
    <Scene from={22.2} to={24.1} fadeIn={0.12} fadeOut={0.12}>
      <S5 off={22.2} />
    </Scene>
    <Scene from={23.95} to={28.5} fadeOut={0}>
      <S6 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.0, 1560],
        [3.0, 6.05, 1560],
        [6.05, 7.85, 1560],
        [7.85, 11.6, 1560],
        [11.6, 15.75, 1560],
        [15.75, 19.55, 1560],
        [19.55, 22.2, 1560],
        [22.2, 23.95, 1560],
      ]}
    />
  </AbsoluteFill>
);
