// V83: "Twenty tabs and still no plan" in the cinematic C01 style. Black Friday teaser 2 of 2: what is inside the Smokies pack,
// no sale or price talk in the story. Contents from the live Shopify listing: Trip Planning Guide with 3, 5 and 7-day itineraries,
// seasons and seasonal roads, getting there, where to stay; 10 day-hike GPX files for AllTrails, Gaia GPS, Komoot or a watch,
// numbered to match the itineraries. Trail names on screen are from the listing. End card = Great Smoky Mountains Trip Pack, $19.99.
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, GUIDE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, HEAD, LeafTree, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Rays, Ridge, rim, Sky, SkyPlane, Svg } from "../cine";
import { Room, WindowView } from "../home";
import { Trail } from "../fall";
import vo from "../vo/v83.json";

const words = vo.words as unknown as Word[];

const NIGHT: Sky = { top: "#0f1a2c", mid: "#22324a", low: "#3a4a5e", sun: [820, 380], sunR: 30, sunCol: "#f4f1e0", glow: "#9fb0c8" };
const SPRING: Sky = { top: "#5b86b0", mid: "#b6cbd9", low: "#e9eee6", sun: [780, 600], sunR: 50, sunCol: "#fffbe8", glow: "#fff0c8" };
const SCREEN = "180,210,255";

const PRIYA: Outfit = {
  ...GUIDE,
  skin: "#B97F5A",
  skinShade: "#9A6446",
  hair: "#1d1410",
  ponytail: "#1d1410",
  beard: null,
  cap: "#1d1410",
  capShade: "#120c08",
  jacket: "#7a4f8a",
  jacketShade: "#5f3c6c",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  glove: null,
};
const PRIYA_T: Outfit = { ...PRIYA, jacket: "#2F7F86", jacketShade: "#256870", cap: "#E3B23C", capShade: "#b88d26", pack: "#C2662E", packShade: "#9B4E20", boot: "#5a3e2a", sole: "#1d1916" };

const Subject: React.FC<{ children: React.ReactNode; rimX?: number; col?: string }> = ({ children, rimX = 4, col }) => (
  <AbsoluteFill style={{ filter: rim(rimX, col) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

const Desk: React.FC<{ y: number }> = ({ y }) => (
  <Svg>
    <rect x={-400} y={y} width={1880} height={1600} fill="#6e4c34" />
    {Array.from({ length: 10 }, (_, i) => (
      <path key={i} d={`M-400,${y + 40 + i * 120} Q300,${y + 20 + i * 120} 1480,${y + 50 + i * 120}`} stroke="rgba(40,25,15,0.3)" strokeWidth={4} fill="none" />
    ))}
    <rect x={-400} y={y} width={1880} height={14} fill="rgba(255,240,220,0.18)" />
  </Svg>
);

// Laptop screen full of tabs (local units: screen w x h, top-left at 0,0). n = number of tabs shown.
const TabScreen: React.FC<{ w: number; h: number; n: number; t: number }> = ({ w, h, n, t }) => {
  const tw = w / Math.max(n, 6);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={10} fill="#e9eef4" />
      <rect x={0} y={0} width={w} height={h * 0.12} rx={10} fill="#c9d2dc" />
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={4 + i * tw} y={h * 0.03} width={tw - 4} height={h * 0.09} rx={4} fill={i === n - 1 ? "#e9eef4" : "#b4bfcb"} />
          <circle cx={4 + i * tw + tw * 0.3} cy={h * 0.075} r={Math.min(tw * 0.18, h * 0.025)} fill={["#D9443A", "#3e7d4f", "#2a3a8a", "#E3B23C"][i % 4]} />
        </g>
      ))}
      {/* page content: a jumble of boxes */}
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={w * 0.06} y={h * (0.2 + i * 0.12)} width={w * (0.4 + ((i * 37) % 40) / 100)} height={h * 0.05} rx={4} fill="#b9c3cf" />
      ))}
      <rect x={w * 0.62} y={h * 0.22} width={w * 0.3} height={h * 0.34} rx={6} fill="#9fb4a4" />
      {/* pop-up */}
      <g opacity={at(t, [1.2, 1.4], [0, 1])}>
        <rect x={w * 0.3} y={h * 0.4} width={w * 0.45} height={h * 0.3} rx={8} fill="#ffffff" stroke="#8a95a2" strokeWidth={3} />
        <rect x={w * 0.34} y={h * 0.46} width={w * 0.3} height={h * 0.05} rx={3} fill="#c9d2dc" />
        <rect x={w * 0.34} y={h * 0.56} width={w * 0.2} height={h * 0.07} rx={4} fill="#2a3a8a" />
      </g>
    </g>
  );
};

// Open laptop seen from the front-left, screen top-left at (x,y).
const Laptop: React.FC<{ x: number; y: number; w: number; n: number; t: number; open?: number }> = ({ x, y, w, n, t, open = 1 }) => {
  const h = w * 0.62;
  return (
    <g transform={`translate(${x},${y})`}>
      <g transform={`translate(0,${h}) scale(1,${open}) translate(0,${-h})`}>
        <rect x={-16} y={-16} width={w + 32} height={h + 32} rx={18} fill="#2a2e34" />
        <TabScreen w={w} h={h} n={n} t={t} />
      </g>
      <path d={`M${-40},${h + 16} L${w + 40},${h + 16} L${w + 90},${h + 60} L${-90},${h + 60} Z`} fill="#3a3f46" />
      <rect x={-90} y={h + 56} width={w + 180} height={14} rx={6} fill="#22262b" />
    </g>
  );
};

// Printed itinerary page with day columns (screen units, centre x).
const Itinerary: React.FC<{ x: number; y: number; t: number; t0: number }> = ({ x, y, t, t0 }) => {
  const tabs = ["3 DAYS", "5 DAYS", "7 DAYS"];
  const sel = t < t0 + 0.9 ? 0 : t < t0 + 1.5 ? 1 : 2;
  return (
    <g transform={`translate(${x},${y}) rotate(-2)`}>
      <rect x={-400} y={20} width={820} height={1000} rx={18} fill="rgba(0,0,0,0.3)" />
      <rect x={-420} y={0} width={820} height={1000} rx={18} fill="#f7f2e8" />
      <text x={-370} y={100} fontFamily={HEAD} fontWeight={800} fontSize={64} fill="#2C3B2E" letterSpacing={2}>
        SMOKIES ITINERARY
      </text>
      <line x1={-370} y1={130} x2={350} y2={130} stroke="#2C3B2E" strokeWidth={4} />
      {tabs.map((s, i) => {
        const k = at(t, [t0 + i * 0.6, t0 + i * 0.6 + 0.3], [0, 1]);
        return (
          <g key={s} opacity={0.3 + k * 0.7}>
            <rect x={-370 + i * 245} y={160} width={225} height={86} rx={14} fill={sel === i ? "#2C3B2E" : "#e6dccb"} />
            <text x={-370 + i * 245 + 112} y={220} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={50} fill={sel === i ? "#f7f2e8" : "#2C3B2E"}>
              {s}
            </text>
          </g>
        );
      })}
      {["Day 1", "Day 2", "Day 3"].map((d, i) => (
        <g key={d}>
          <text x={-370} y={340 + i * 200} fontFamily={HEAD} fontWeight={800} fontSize={54} fill="#2a3a8a">
            {d}
          </text>
          <circle cx={-330} cy={390 + i * 200} r={30} fill="#3e7d4f" />
          <text x={-330} y={402 + i * 200} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={36} fill="#fff">
            {i + 1}
          </text>
          <rect x={-280} y={372 + i * 200} width={480 - i * 60} height={30} rx={6} fill="#d8d0c0" />
          <rect x={-370} y={430 + i * 200} width={620} height={18} rx={6} fill="#e6dccb" />
        </g>
      ))}
    </g>
  );
};

// Phone with a GPX route line and a numbered start pin (screen units, centre).
const Phone: React.FC<{ x: number; y: number; s?: number; draw: number; rot?: number }> = ({ x, y, s = 1, draw, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-190} y={-380} width={380} height={760} rx={50} fill="#1d2126" />
    <rect x={-170} y={-350} width={340} height={700} rx={30} fill="#dfe8d8" />
    {/* topo lines */}
    {Array.from({ length: 7 }, (_, i) => (
      <path key={i} d={`M-170,${-260 + i * 90} Q-60,${-300 + i * 90} 40,${-250 + i * 90} Q120,${-210 + i * 90} 170,${-260 + i * 90}`} stroke="#b9c9b0" strokeWidth={4} fill="none" />
    ))}
    <path d="M-110,250 Q-120,120 -40,60 Q40,0 -10,-80 Q-60,-160 40,-220 Q100,-250 110,-280" stroke="#D9443A" strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={900} strokeDashoffset={900 * (1 - draw)} />
    <circle cx={-110} cy={250} r={34} fill="#3e7d4f" stroke="#fff" strokeWidth={6} />
    <text x={-110} y={264} textAnchor="middle" fontFamily={HEAD} fontWeight={800} fontSize={40} fill="#fff">
      1
    </text>
    <rect x={-150} y={290} width={300} height={44} rx={12} fill="#ffffff" />
    <text x={0} y={322} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize={30} fill="#2C3B2E">
      ALUM CAVE · GPX
    </text>
  </g>
);

// Spring Smokies backdrop: layered blue ridges in mist, fresh green tree line.
const SmokyBackdrop: React.FC<{ cam: Cam; uid: string; treeY: number; blur?: number; t: number }> = ({ cam, uid, treeY, blur = 0, t }) => (
  <>
    <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
      <SkyPlane sky={SPRING} uid={uid} />
      <Clouds y={400} col="#ffffff" seed={uid.charCodeAt(0)} drift={t * 12} opacity={0.45} />
    </Plane>
    <Plane cam={cam} depth={0.12} blur={3 + blur}>
      <Ridge seed={51} base={treeY - 330} amp={260} scale={260} col="#9fb2c8" />
    </Plane>
    <Haze y={treeY - 440} h={360} col="#e9eef6" opacity={0.7} />
    <Plane cam={cam} depth={0.22} blur={2.2 + blur}>
      <Ridge seed={57} base={treeY - 210} amp={220} scale={220} col="#7d93ab" />
    </Plane>
    <Haze y={treeY - 300} h={300} col="#e9eef6" opacity={0.6} />
    <Plane cam={cam} depth={0.34} blur={1.6 + blur}>
      <Ridge seed={61} base={treeY - 90} amp={180} scale={180} col="#5f7a86" />
    </Plane>
    <Haze y={treeY - 180} h={220} col="#e9eef6" opacity={0.4} />
    <Plane cam={cam} depth={0.55} blur={0.9 + blur}>
      <Svg>
        {Array.from({ length: 11 }, (_, i) => {
          const x = ((((-160 + i * 160 - cam.x * 0.2) % 1760) + 1760) % 1760) - 300;
          const h = 380 + (i % 3) * 90;
          const yy = treeY + (i % 2) * 20;
          return i % 3 === 1 ? <LeafTree key={i} x={x} y={yy} h={h * 0.9} c="#7fae4e" c2="#5f8f3a" /> : <Pine key={i} x={x} y={yy} h={h} c="#30513f" c2="#243f31" />;
        })}
      </Svg>
    </Plane>
  </>
);

// Night room behind the desk.
const NightRoom: React.FC<{ cam: Cam; depth?: number; blur?: number; uid: string; win: [number, number, number, number]; floorY: number }> = ({ cam, depth = 0.8, blur = 2, uid, win, floorY }) => (
  <Plane cam={cam} depth={depth} blur={blur}>
    <WindowView x={win[0]} y={win[1]} w={win[2]} h={win[3]} sky={NIGHT} uid={uid} snow={false} />
    <Room floorY={floorY} win={win} wall="#5a4c40" floor="#3a2c22" lamp={[180, 520]} />
  </Plane>
);

// ============ S1 HOOK CLOSE-UP: laptop crowded with tabs at night (0 - 2.9) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.12, t / 2.9), rot: hh.rot };
  const n = Math.round(at(t, [0, 2.4], [12, 20]));
  return (
    <AbsoluteFill style={{ background: "#120c08" }}>
      <NightRoom cam={cam} blur={10} uid="a" win={[600, 300, 420, 520]} floorY={1900} />
      <Plane cam={cam} depth={1}>
        <Desk y={1460} />
        <Subject rimX={-4} col={`rgba(${SCREEN},0.6)`}>
          <Laptop x={90} y={860} w={900} n={n} t={t} />
        </Subject>
        <Svg>
          <circle cx={540} cy={1100} r={600} fill={`rgb(${SCREEN})`} opacity={0.1} />
        </Svg>
      </Plane>
      <Particles seed={831} n={10} col="#c8d8ff" fall={4} />
      <Grade sunX={540} sunY={1100} warm={SCREEN} cool="10,20,50" vignette={0.65} />
      <Title text={"Twenty tabs\nand still\nno plan"} t={t} t0={0} top={120} size={136} />
    </AbsoluteFill>
  );
};

// ============ S2 MEDIUM: Priya at the desk, head in her hands (2.9 - 5.4) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.5), rot: hh.rot };
  const floorY = 1560;
  const p: HikerProps = { x: 560, y: floorY + 60, scale: 2.4, walk: 0, lean: 0.3, poles: false, handOverride: [96, -150], breathe: Math.sin(t * 2) * 1.5 };
  return (
    <AbsoluteFill style={{ background: "#120c08" }}>
      <NightRoom cam={cam} uid="b" win={[120, 360, 380, 480]} floorY={floorY - 140} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5} col={`rgba(${SCREEN},0.85)`}>
          <Person {...p} outfit={PRIYA} expression="tired" noPack />
        </Subject>
        <Desk y={floorY - 10} />
        <Svg>
          <g transform="translate(700,1240) scale(0.9,1)">
            <Laptop x={-300} y={-60} w={420} n={20} t={t} />
          </g>
          <circle cx={600} cy={1300} r={420} fill={`rgb(${SCREEN})`} opacity={0.12} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1a2420" side="left" top={300} />
      </Plane>
      <Particles seed={832} n={10} col="#c8d8ff" fall={4} />
      <Grade sunX={700} sunY={1250} warm={SCREEN} cool="10,20,50" vignette={0.6} />
      <Readout label="TABS OPEN" value="20" ok={false} t={t} t0={3.1} x={80} y={200} pulseAt={4.6} />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP: tired face in the screen glow (5.4 - 7.8) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.4), rot: hh.rot };
  const p: HikerProps = { x: 470, y: 1250 + 182 * 4.4, scale: 4.4, walk: 0, lean: 0.06, poles: false, handOverride: [60, 20], breathe: Math.sin(t * 2) * 1.2 };
  return (
    <AbsoluteFill style={{ background: "#120c08" }}>
      <NightRoom cam={cam} blur={9} uid="c" win={[560, 200, 500, 640]} floorY={1900} depth={0.6} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={6} col={`rgba(${SCREEN},0.9)`}>
          <Person {...p} outfit={PRIYA} expression="tired" noPack />
        </Subject>
      </Plane>
      <Particles seed={833} n={8} col="#c8d8ff" fall={4} />
      <Grade sunX={900} sunY={700} warm={SCREEN} cool="10,20,50" vignette={0.65} />
      <Chip text="Three nights in" t={t} t0={5.6} x={80} y={200} icon="x" big />
      <Chip text="Still no plan" t={t} t0={6.6} x={80} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 FIX: laptop closes, one printed plan on the desk (7.8 - 10.4) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.6), rot: hh.rot };
  const close = at(t, [8.0, 8.6], [1, 0.02], outExpo);
  const slide = at(t, [9.0, 9.7], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={0.7} blur={10}>
        <WindowView x={560} y={200} w={480} h={600} sky={SPRING} uid="d" snow={false} />
        <Room floorY={1900} win={[560, 200, 480, 600]} wall="#d8c6a8" lamp={[160, 560]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Desk y={1300} />
        <Svg>
          <g opacity={1 - slide * 0.8}>
            <Laptop x={150} y={860} w={780} n={20} t={t} open={close} />
          </g>
          <g transform={`translate(0,${mix(900, 0, slide)})`}>
            <Itinerary x={540} y={470} t={t} t0={99} />
          </g>
        </Svg>
      </Plane>
      <Particles seed={834} n={14} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Title text={"Start with\none plan."} t={t} t0={off + 0.05} t1={9.0} top={170} size={140} />
      <Chip text="One plan, not 20 tabs" t={t} t0={9.1} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: 3, 5 and 7-day itineraries (10.4 - 14.65) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(-40, 40, lt / 4.2), zoom: mix(1.02, 1.08, lt / 4.2), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={0.7} blur={12}>
        <Room floorY={1900} win={[560, 200, 480, 600]} wall="#d8c6a8" lamp={[160, 560]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Desk y={1200} />
        <Subject rimX={-4} col="rgba(255,230,190,0.8)">
          <Itinerary x={540} y={420} t={t} t0={11.6} />
        </Subject>
      </Plane>
      <Particles seed={835} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="Smokies Trip Pack" t={t} t0={10.5} x={80} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 MEDIUM: seasons, road openings, where to stay (14.65 - 17.3) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x - lt * 16, y: hh.y, zoom: mix(1.04, 1.1, lt / 2.6), rot: hh.rot };
  const floorY = 1560;
  const p: HikerProps = { x: 420, y: floorY + 40, scale: 2.4, walk: 0, lean: 0.12, poles: false, handOverride: [92, -10], breathe: Math.sin(t * 2) * 1.5 };
  const h = hikerGeometry(p).arms[1].hand;
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={0.8} blur={2}>
        <WindowView x={560} y={320} w={420} h={520} sky={SPRING} uid="f" snow={false} />
        <Room floorY={floorY - 140} win={[560, 320, 420, 520]} wall="#d8c6a8" lamp={[160, 560]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={5} col="rgba(255,226,180,0.85)">
          <Person {...p} outfit={PRIYA} expression="happy" noPack />
          <g transform={hikerTransform(p)}>
            <rect x={h[0] - 6} y={h[1] - 52} width={70} height={92} rx={4} fill="#f7f2e8" transform={`rotate(-12 ${h[0]} ${h[1]})`} />
          </g>
        </Subject>
        <Desk y={floorY - 10} />
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24402e" side="right" top={300} />
      </Plane>
      <Particles seed={836} n={14} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" />
      <Chip text="Seasons and road openings" t={t} t0={14.8} x={60} y={200} icon="check" />
      <Chip text="Where to stay" t={t} t0={16.4} x={60} y={320} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: phone with the GPX route, numbered like the plan (17.3 - 22.65) ============
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.07, lt / 5.3), rot: hh.rot };
  const draw = at(t, [18.4, 20.0], [0, 1]);
  const pg = at(t, [20.6, 21.2], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={0.7} blur={12}>
        <Room floorY={1900} win={[560, 200, 480, 600]} wall="#d8c6a8" lamp={[160, 560]} />
      </Plane>
      <Plane cam={cam} depth={1}>
        <Desk y={1150} />
        <Svg>
          <g transform={`translate(${mix(0, -200, pg)},0)`} opacity={pg}>
            <g transform="scale(0.62) translate(150,560)">
              <Itinerary x={540} y={420} t={t} t0={0} />
            </g>
          </g>
        </Svg>
        <Subject rimX={-5} col="rgba(255,230,190,0.85)">
          <Phone x={mix(540, 720, pg)} y={900} s={1.25} draw={draw} rot={mix(0, 6, pg)} />
        </Subject>
      </Plane>
      <Particles seed={837} n={12} col="#ffe8c0" fall={6} />
      <Grade sunX={800} sunY={500} warm="255,214,170" vignette={0.55} />
      <Chip text="10 day hikes as GPX files" t={t} t0={17.5} x={60} y={170} icon="check" big />
      <Chip text="Numbered to match the plan" t={t} t0={20.7} x={60} y={300} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF MEDIUM: Priya on a misty Smokies trail in spring (22.65 - 25.1) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 22, y: hh.y, zoom: at(lt, [0, 1.4], [1.14, 1.06], outExpo), rot: hh.rot };
  const g = 1400;
  const p: HikerProps = { x: 520, y: g + 182 * 2.3 - 130, scale: 2.3, phase: t * 3.2, walk: 0.6, lean: 0.08, poles: false, breathe: 0 };
  return (
    <AbsoluteFill>
      <SmokyBackdrop cam={cam} uid="h" treeY={g + 10} t={t} />
      <Plane cam={cam} depth={1}>
        <Trail y={g + 60} grass="#6f9a48" dirt="#9a7f5c" />
        <Subject rimX={6} col="rgba(255,236,190,0.9)">
          <Person {...p} outfit={PRIYA_T} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#3c6a2e" side="right" />
      </Plane>
      <Rays x={SPRING.sun[0]} y={SPRING.sun[1]} strength={0.3} col="255,240,200" />
      <Particles seed={838} n={22} col="#fffbe8" />
      <Grade sunX={780} sunY={600} warm="255,236,200" />
      <Chip text="First trail picked in 10 minutes" t={t} t0={22.9} x={60} y={200} icon="check" />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/great-smoky-mountains-trip-pack.jpg"
      photoH={720}
      spec="PLANNING GUIDE + 10 GPX DAY HIKES"
      name={
        <>
          Smokies
          <br />
          Trip Pack
        </>
      }
      nameSize={108}
      price="$19.99"
      save="Save this before you plan your trip"
    />
  );
};

export const V83: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.95} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.9} to={5.45} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={2.9} />
    </Scene>
    <Scene from={5.4} to={7.85} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={5.4} />
    </Scene>
    <Scene from={7.8} to={10.45} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.8} />
    </Scene>
    <Scene from={10.4} to={14.7} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={10.4} />
    </Scene>
    <Scene from={14.65} to={17.35} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={14.65} />
    </Scene>
    <Scene from={17.3} to={22.7} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={17.3} />
    </Scene>
    <Scene from={22.65} to={25.2} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={22.65} />
    </Scene>
    <Scene from={25.0} to={29.5} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.9, 1560],
        [2.9, 5.4, 1560],
        [5.4, 7.8, 1560],
        [7.8, 10.4, 1560],
        [10.4, 14.65, 1560],
        [14.65, 17.3, 1560],
        [17.3, 22.65, 1560],
        [22.65, 25.0, 1560],
      ]}
    />
  </AbsoluteFill>
);
