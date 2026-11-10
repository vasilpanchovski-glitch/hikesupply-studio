// V127: "Dark at five. Camp night over." in the cinematic C01 style, late-fall campground, posted Dec 13.
// Story for the Camp Night Set (Mini Lantern, Sit Pad & Camping Trip Planner, $33.99, live Shopify). Facts from the listing:
// the lantern hangs from a tent loop and gives a soft light, closed-cell foam sit pad keeps you off cold or damp ground,
// the planner has packing checklists. No stove or heater in the tent. No invented numbers on screen.
// End card = real Shopify main photo (products/camp-night-set.jpg, lantern in a hand, boxed photo card).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps, hikerGeometry, hikerTransform } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Pine, Readout, Scene, Title, useT } from "../kit";
import { Cam, Clouds, FrameLeaves, Grade, handheld, Haze, Particles, Plane, Ridge, Sky, SkyPlane, Svg } from "../cine";
import { Subject } from "../fall";
import { Mug } from "../home";
import { INK, PAPER } from "../trip";
import vo from "../vo/v127.json";

const words = vo.words as unknown as Word[];

const LowScrim: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 1380, height: 420, background: "linear-gradient(180deg, rgba(12,22,28,0) 0%, rgba(12,22,28,0.42) 45%, rgba(12,22,28,0.42) 70%, rgba(12,22,28,0) 100%)" }} />
);

const DUSK: Sky = { top: "#2a3658", mid: "#8a6a7a", low: "#f0a868", sun: [760, 1010], sunR: 56, sunCol: "#ffe0b0", glow: "#ff9a58" };
const NIGHT: Sky = { top: "#121a30", mid: "#26334f", low: "#4a5672", sun: [820, 330], sunR: 30, sunCol: "#f1efe4", glow: "#8f9ab4" };
const GLOW = "255,196,130";

const LEO: Outfit = { ...JAKE, skin: "#A8704E", skinShade: "#8A5639", hair: "#1e1a18", beard: "#1e1a18", cap: "#3E4F5C", capShade: "#2C3943", jacket: "#2F7F86", jacketShade: "#256870", glove: null };
const SAM: Outfit = {
  ...JAKE,
  skin: "#EDBE9E",
  skinShade: "#CF9E80",
  hair: "#c08a4a",
  ponytail: "#c08a4a",
  beard: null,
  cap: "#B83A55",
  capShade: "#8E2B42",
  jacket: "#C2662E",
  jacketShade: "#9B4E20",
  pants: "#3d4148",
  pantsShade: "#2c2f34",
  glove: null,
};

// ---------- scenery ----------
const Stars: React.FC<{ k?: number }> = ({ k = 1 }) => (
  <Svg>
    {Array.from({ length: 46 }, (_, i) => (
      <circle key={i} cx={(i * 263) % 1080} cy={60 + ((i * 151) % 760)} r={1.5 + (i % 3)} fill="#f4f1e6" opacity={(0.45 + (i % 4) * 0.12) * k} />
    ))}
  </Svg>
);

const Woods: React.FC<{ y: number; shift: number; c?: string; c2?: string }> = ({ y, shift, c = "#1d3328", c2 = "#152820" }) => (
  <Svg>
    {Array.from({ length: 12 }, (_, i) => {
      const x = ((((-160 + i * 150 - shift) % 1800) + 1800) % 1800) - 300;
      return <Pine key={i} x={x} y={y + (i % 2) * 20} h={420 + (i % 3) * 90} c={c} c2={c2} />;
    })}
  </Svg>
);

const CampBackdrop: React.FC<{ cam: Cam; sky: Sky; uid: string; treeY: number; t: number; blur?: number; stars?: number }> = ({ cam, sky, uid, treeY, t, blur = 0, stars = 1 }) => {
  const dusk = sky === DUSK;
  return (
    <>
      <Plane cam={cam} depth={0.04} blur={blur * 0.6}>
        <SkyPlane sky={sky} uid={uid} />
        {stars > 0 && <Stars k={stars} />}
        <Clouds y={300} col={dusk ? "#c88a7a" : "#5a6684"} seed={uid.charCodeAt(0)} drift={t * 10} opacity={0.35} />
      </Plane>
      <Plane cam={cam} depth={0.14} blur={2.6 + blur}>
        <Ridge seed={61} base={treeY - 260} amp={320} scale={250} col={dusk ? "#4a3e5a" : "#2f3a52"} lit={dusk ? "#c8826a" : "#6f7c98"} peak={110} />
      </Plane>
      <Haze y={treeY - 400} h={360} col={sky.low} opacity={0.4} />
      <Plane cam={cam} depth={0.3} blur={1.6 + blur}>
        <Ridge seed={67} base={treeY - 90} amp={180} scale={180} col={dusk ? "#352e40" : "#22303a"} />
      </Plane>
      <Plane cam={cam} depth={0.5} blur={1 + blur}>
        <Woods y={treeY} shift={cam.x * 0.2} c={dusk ? "#2a3a30" : "#1d3328"} c2={dusk ? "#1f2e26" : "#152820"} />
      </Plane>
    </>
  );
};

const Ground: React.FC<{ y: number; frost?: boolean }> = ({ y, frost = true }) => (
  <Svg>
    <path d={`M-400,${y} Q540,${y - 30} 1480,${y} L1480,2600 L-400,2600 Z`} fill="#3a4030" />
    <path d={`M-400,${y + 200} Q540,${y + 170} 1480,${y + 200} L1480,2600 L-400,2600 Z`} fill="#30362a" />
    {Array.from({ length: 20 }, (_, i) => {
      const x = -360 + i * 96;
      const yy = y + 40 + ((i * 59) % 300);
      return <path key={i} d={`M${x},${yy} q6,-26 12,-48 M${x + 10},${yy} q-4,-22 -10,-38`} stroke={frost ? "#8a9488" : "#4b5238"} strokeWidth={5} fill="none" strokeLinecap="round" />;
    })}
  </Svg>
);

// Dome tent. glow = warm lantern light around it. loop = draw the small fabric loop at the door top.
const Tent: React.FC<{ x: number; y: number; s?: number; glow?: number; dark?: number }> = ({ x, y, s = 1, glow = 0, dark = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <ellipse cx={0} cy={8} rx={230} ry={20} fill="rgba(0,0,0,0.35)" />
    <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill="#5f7a4a" />
    <path d="M0,-250 Q200,-230 220,0 L80,0 Q90,-150 0,-250 Z" fill="#4c6339" />
    {glow > 0 && <path d="M-220,0 Q-200,-230 0,-250 Q200,-230 220,0 Z" fill={`rgba(255,200,120,${0.22 * glow})`} />}
    <path d="M-90,0 Q-80,-160 0,-180 Q80,-160 90,0 Z" fill={dark > 0 ? "#1a2016" : "#2a3322"} />
    <path d="M-200,-60 Q0,-120 200,-60" stroke="#2f3f26" strokeWidth={5} fill="none" />
  </g>
);

// The squeeze lantern from the product photo: soft white body, grey top loop, short cord.
const Lantern: React.FC<{ x: number; y: number; s?: number; on?: number; cord?: number }> = ({ x, y, s = 1, on = 1, cord = 60 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <line x1={0} y1={-cord} x2={0} y2={-46} stroke="#2a2a2a" strokeWidth={6} />
    {on > 0 && <circle cx={0} cy={10} r={170} fill="#ffcf88" opacity={0.22 * on} />}
    {on > 0 && <circle cx={0} cy={10} r={90} fill="#ffdca0" opacity={0.3 * on} />}
    <path d="M-22,-30 Q-22,-56 0,-56 Q22,-56 22,-30" stroke="#9aa0a6" strokeWidth={10} fill="none" />
    <ellipse cx={0} cy={14} rx={50} ry={54} fill={on > 0 ? "#fff3d8" : "#e8e4dc"} />
    <path d="M0,-40 A50,54 0 0,0 0,68 Z" fill={on > 0 ? "#ffe8bc" : "#d8d4cc"} opacity={0.7} />
    <path d="M-24,-34 Q-22,-46 0,-46 Q22,-46 24,-34" fill="#9aa0a6" />
    <ellipse cx={0} cy={64} rx={26} ry={5} fill="#c8bca8" />
  </g>
);

const Breath: React.FC<{ p: HikerProps; t: number; flip?: boolean }> = ({ p, t, flip }) => {
  const [hx, hy] = hikerGeometry(p).head;
  const k = (t * 0.5) % 1;
  return (
    <g transform={hikerTransform(p)}>
      <circle cx={hx + (flip ? -1 : 1) * (55 + k * 70)} cy={hy + 10 - k * 24} r={8 + k * 22} fill="#e8eef6" opacity={0.3 * (1 - k)} />
    </g>
  );
};

// Folding foam pad: accordion panels unfolding to the right (open 0..1).
const SitPad: React.FC<{ x: number; y: number; w: number; open: number; h?: number; col?: string; shade?: string }> = ({ x, y, w, open, h = 80, col = "#2F7F86", shade = "#256870" }) => {
  const n = 6;
  const pw = w / n;
  const shown = 1 + (n - 1) * open;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-6} y={h / 2 - 20} width={pw * shown + 12} height={40} rx={12} fill="rgba(0,0,0,0.3)" />
      {Array.from({ length: Math.ceil(shown) }, (_, i) => {
        const frac = Math.min(1, shown - i);
        return (
          <g key={i}>
            <rect x={i * pw} y={-h / 2} width={pw * frac} height={h} rx={8} fill={i % 2 ? shade : col} />
            {Array.from({ length: 3 }, (_, j) => (
              <circle key={j} cx={i * pw + pw * 0.5} cy={-h / 4 + j * (h / 4)} r={7} fill="rgba(0,0,0,0.18)" opacity={frac > 0.6 ? 1 : 0} />
            ))}
          </g>
        );
      })}
    </g>
  );
};

// ============ S1 HOOK WIDE: the sun drops behind the ridge at the late-fall campground (0 - 2.6) ============
const S1: React.FC = () => {
  const t = useT();
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: hh.x + t * 8, y: hh.y, zoom: mix(1.03, 1.09, t / 2.6), rot: hh.rot };
  const g = 1500;
  const pL: HikerProps = { x: 620, y: g + 70, scale: 2.0, walk: 0, lean: 0.06, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 2) * 1.5 };
  const pS: HikerProps = { x: 840, y: g + 90, scale: 1.85, walk: 0, lean: 0.06, poles: false, handOverride: [40, 40], breathe: Math.sin(t * 2 + 1) * 1.5 };
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} sky={DUSK} uid="a" treeY={g - 240} t={t} stars={0.3} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} />
        <Svg>
          <Tent x={260} y={g + 80} s={1.3} />
        </Svg>
        <Subject rimX={-5} col="rgba(255,190,140,0.75)">
          <Person {...pL} outfit={LEO} expression="neutral" noPack flip />
          <Person {...pS} outfit={SAM} expression="neutral" noPack flip />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#1a2418" side="both" />
      </Plane>
      <Particles seed={1271} n={14} col="#ffd8b0" fall={8} />
      <Grade sunX={760} sunY={1010} warm="255,170,110" cool="40,40,90" vignette={0.6} />
      <Title text={"Dark at five.\nCamp night\nover."} t={t} t0={0} top={110} size={124} />
    </AbsoluteFill>
  );
};

// ============ S2 CLOSE-UP: Leo's watch reads 5:00, the last light fades (2.6 - 4.6) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 2.0), rot: hh.rot };
  const fade = at(t, [2.6, 4.6], [0, 1]);
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} sky={DUSK} uid="b" treeY={1000} t={t} blur={9} stars={0.3} />
      <AbsoluteFill style={{ background: `rgba(10,14,30,${0.45 * fade})` }} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,190,140,0.75)">
          <Svg>
            <rect x={-200} y={980} width={900} height={300} rx={140} fill={LEO.jacket} transform="rotate(-12 250 1130)" />
            <rect x={600} y={960} width={90} height={330} rx={30} fill={LEO.jacketShade} transform="rotate(-12 645 1125)" />
            <ellipse cx={780} cy={1090} rx={150} ry={120} fill={LEO.skin} transform="rotate(-12 780 1090)" />
            <g transform="translate(470,1060) rotate(-12)">
              <rect x={-60} y={-200} width={120} height={400} rx={30} fill="#2a2e34" />
              <circle cx={0} cy={0} r={130} fill="#3a3f46" />
              <circle cx={0} cy={0} r={108} fill="#e9e6dc" />
              <text x={0} y={22} textAnchor="middle" fontFamily="Barlow Condensed, Inter" fontWeight={800} fontSize={74} fill="#1b2a24">
                5:00
              </text>
              <text x={0} y={70} textAnchor="middle" fontFamily="Barlow Condensed, Inter" fontWeight={700} fontSize={30} fill="#5b625c">
                PM
              </text>
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1272} n={10} col="#ffd8b0" fall={6} />
      <Grade sunX={760} sunY={1010} warm="255,170,110" cool="40,40,90" vignette={0.6} />
      <Readout label="SUNSET" value="Five o'clock" ok={null} t={t} t0={2.7} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S3 MEDIUM: cold and bored, they crawl into the dark tent (4.6 - 7.39) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x - lt * 12, y: hh.y, zoom: mix(1.0, 1.07, lt / 2.79), rot: hh.rot };
  const g = 1560;
  const go = at(t, [5.6, 7.2], [0, 1]);
  const pL: HikerProps = { x: mix(760, 470, go), y: g + 60 + go * 80, scale: 2.3, walk: 0, lean: mix(0.12, 0.5, go), poles: false, handOverride: [60, 60], breathe: Math.sin(t * 6) * 2 };
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} sky={NIGHT} uid="c" treeY={g - 330} t={t} blur={3} />
      <Plane cam={cam} depth={1}>
        <Ground y={g - 60} />
        <Subject rimX={6} col="rgba(170,200,255,0.8)">
          <Person {...pL} outfit={LEO} expression="tired" noPack flip />
          <Breath p={pL} t={t} flip />
          <Svg>
            <Tent x={300} y={g + 60} s={1.7} dark={1} />
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#13241c" side="right" />
      </Plane>
      <Particles seed={1273} n={16} col="#dfe8ff" fall={10} />
      <LowScrim />
      <Grade sunX={820} sunY={330} warm="200,210,255" cool="20,30,70" vignette={0.6} />
      <Chip text="Into the tent" t={t} t0={4.7} x={60} y={200} icon="none" big />
      <Chip text="Cold and bored" t={t} t0={6.0} x={60} y={330} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S4 WIDE: the whole camp dark, a long night ahead; "here's the fix" (7.39 - 10.56) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x + lt * 10, y: hh.y, zoom: mix(1.08, 1.0, lt / 3.17), rot: hh.rot };
  const g = 1480;
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} sky={NIGHT} uid="d" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} />
        <Svg>
          <Tent x={540} y={g + 120} s={1.5} dark={1} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#13241c" side="both" />
      </Plane>
      <Particles seed={1274} n={16} col="#dfe8ff" fall={10} />
      <Grade sunX={820} sunY={330} warm="200,210,255" cool="20,30,70" vignette={0.65} />
      <Readout label="CAMP NIGHT" value="Over at sunset" ok={false} t={t} t0={7.45} x={60} y={200} />
      <Chip text="The fix" t={t} t0={9.35} x={60} y={480} icon="none" big />
    </AbsoluteFill>
  );
};

// ============ S5 CLOSE-UP: Sam clips the lantern to the tent loop, warm light fills camp (10.56 - 15.79) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const clip = at(t, [10.7, 11.9], [0, 1], outExpo);
  const on = at(t, [12.3, 12.7], [0, 1]);
  const hh = handheld(t, 0.3, at(t, [12.3, 12.4, 12.7], [0, 0.6, 0]));
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 5.23), rot: hh.rot };
  const swing = Math.sin(t * 2.4) * 4 * (1 - clip * 0.5);
  return (
    <AbsoluteFill style={{ background: "#0e1424" }}>
      <Plane cam={cam} depth={0.6} blur={10}>
        <Svg>
          <rect x={-300} y={-300} width={1680} height={2600} fill="#1a2238" />
          <path d="M-300,1300 Q540,1200 1380,1300 L1380,2300 L-300,2300 Z" fill="#2a3022" />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col={`rgba(${GLOW},0.8)`}>
          <Svg>
            {/* tent fabric with the door arch and the loop */}
            <path d="M-200,-200 L1280,-200 L1280,700 Q540,560 -200,700 Z" fill="#4c6339" />
            <path d="M-200,700 Q540,560 1280,700" stroke="#2f3f26" strokeWidth={14} fill="none" />
            <path d="M200,2300 Q220,900 540,820 Q860,900 880,2300 Z" fill="#2a3322" />
            <path d="M200,2300 Q220,900 540,820 Q860,900 880,2300 Z" fill={`rgba(255,200,120,${0.25 * on})`} />
            <path d="M510,600 Q540,680 570,600" stroke="#2f3f26" strokeWidth={14} fill="none" strokeLinecap="round" />
            {/* lantern hangs from the loop */}
            <g transform={`translate(540,${mix(1100, 680, clip)}) rotate(${swing})`}>
              <circle cx={0} cy={-30} r={20} fill="none" stroke="#1e1e1e" strokeWidth={9} />
              <Lantern x={0} y={160} s={1.9} on={on} cord={110} />
            </g>
            {/* Sam's hand, lifting the lantern, pulls away once it is on */}
            <g opacity={at(t, [12.6, 13.0], [1, 0])} transform={`translate(${mix(560, 600, clip)},${mix(1450, 1010, clip)})`}>
              <g transform="rotate(-38)">
                <rect x={-70} y={70} width={160} height={700} rx={70} fill={SAM.jacket} />
                <rect x={-70} y={70} width={160} height={50} rx={20} fill={SAM.jacketShade} />
                <ellipse cx={10} cy={30} rx={80} ry={66} fill={SAM.skin} />
                {[-48, -16, 16, 48].map((fx) => (
                  <rect key={fx} x={fx - 15} y={-60} width={30} height={80} rx={15} fill={SAM.skin} />
                ))}
              </g>
            </g>
          </Svg>
        </Subject>
      </Plane>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 60% 40% at 50% 45%, rgba(${GLOW},${0.28 * on}) 0%, rgba(0,0,0,0) 70%)` }} />
      <Particles seed={1275} n={12} col="#ffe2b0" fall={4} />
      <Grade sunX={540} sunY={900} warm={GLOW} cool="20,30,70" vignette={0.6} />
      <Chip text="Lantern on the tent loop" t={t} t0={10.9} x={60} y={200} icon="check" big />
      <Chip text="Soft light, no glare" t={t} t0={13.8} x={60} y={330} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: the foam pad unfolds on the frosty ground (15.79 - 18.69) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 2.9), rot: hh.rot };
  const open = at(t, [15.9, 16.9], [0, 1], outExpo);
  return (
    <AbsoluteFill style={{ background: "#141a24" }}>
      <Plane cam={cam} depth={0.6} blur={9}>
        <Svg>
          <rect x={-300} y={-300} width={1680} height={2600} fill="#1a2238" />
          <Tent x={760} y={760} s={2.2} glow={1} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col={`rgba(${GLOW},0.8)`}>
          <Svg>
            <path d="M-300,820 Q540,780 1380,820 L1380,2300 L-300,2300 Z" fill="#363c2e" />
            {Array.from({ length: 30 }, (_, i) => {
              const x = -260 + ((i * 97) % 1600);
              const y = 880 + ((i * 131) % 900);
              return <path key={i} d={`M${x},${y} q6,-30 12,-56 M${x + 10},${y} q-4,-26 -10,-44`} stroke="#c8d2d6" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.8} />;
            })}
            <g transform="translate(140,1120)">
              <SitPad x={0} y={0} w={800} h={300} open={open} />
            </g>
            <g opacity={at(t, [15.8, 16.0, 16.8, 17.1], [0, 1, 1, 0])} transform={`translate(${140 + 800 * open},1120)`}>
              <ellipse cx={0} cy={0} rx={70} ry={52} fill={SAM.skin} />
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1276} n={12} col="#ffe2b0" fall={4} />
      <Grade sunX={760} sunY={600} warm={GLOW} cool="20,30,70" vignette={0.6} />
      <Readout label="COLD GROUND" value="Foam pad on top" ok={true} t={t} t0={15.9} x={60} y={200} />
    </AbsoluteFill>
  );
};

// ============ S7 CLOSE-UP: the packing checklist, warm layers ticked (18.69 - 21.71) ============
const ITEMS = ["Warm hat", "Puffy jacket", "Dry socks", "Gloves", "Lantern"];
const S7: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.3);
  const cam: Cam = { x: hh.x, y: hh.y + mix(-10, 10, lt / 3), zoom: mix(1.02, 1.08, lt / 3.02), rot: hh.rot };
  return (
    <AbsoluteFill style={{ background: "#2a1c12" }}>
      <Plane cam={cam} depth={0.6} blur={8}>
        <Svg>
          <rect x={-300} y={-300} width={1680} height={2600} fill="#6e4c34" />
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1={-300} y1={-200 + i * 300} x2={1380} y2={-160 + i * 300} stroke="#5a3e2a" strokeWidth={10} />
          ))}
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-4} col="rgba(255,226,180,0.7)">
          <Svg>
            <g transform="translate(200,520) rotate(-3)">
              <rect x={14} y={18} width={700} height={900} rx={12} fill="rgba(0,0,0,0.3)" />
              <rect x={0} y={0} width={700} height={900} rx={12} fill={PAPER} />
              <rect x={0} y={0} width={700} height={110} rx={12} fill="#2f5446" />
              <text x={40} y={74} fontFamily="Barlow Condensed, Inter" fontWeight={800} fontSize={54} fill={PAPER} letterSpacing={2}>
                PACKING · NIGHTS
              </text>
              {ITEMS.map((it, i) => {
                const k = at(t, [18.9 + i * 0.4, 19.15 + i * 0.4], [0, 1]);
                const y = 190 + i * 130;
                return (
                  <g key={it}>
                    <rect x={40} y={y} width={70} height={70} rx={10} fill="none" stroke="#7a8078" strokeWidth={5} />
                    <path d={`M54,${y + 36} L72,${y + 56} L100,${y + 14}`} stroke="#2a3a8a" strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray={90} strokeDashoffset={90 * (1 - k)} />
                    <text x={140} y={y + 52} fontFamily="Inter" fontWeight={600} fontSize={48} fill={INK}>
                      {it}
                    </text>
                  </g>
                );
              })}
            </g>
          </Svg>
        </Subject>
      </Plane>
      <Particles seed={1277} n={10} col="#ffe8c0" fall={4} />
      <Grade sunX={300} sunY={500} warm="255,220,170" vignette={0.55} />
      <Chip text="Plan with a checklist" t={t} t0={18.75} x={60} y={200} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S8 PAYOFF WIDE: the next camp night, lantern glowing, mugs, still up (21.71 - 23.9) ============
const S8: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.45);
  const cam: Cam = { x: hh.x + lt * 14, y: hh.y, zoom: at(lt, [0, 1.2], [1.12, 1.03], outExpo), rot: hh.rot };
  const g = 1500;
  const pL: HikerProps = { x: 620, y: g + 80, scale: 2.1, walk: 0, lean: 0.03, poles: false, handOverride: [70, -20], breathe: Math.sin(t * 2) * 1.5 };
  const pS: HikerProps = { x: 860, y: g + 100, scale: 1.95, walk: 0, lean: 0.03, poles: false, handOverride: [70, -20], breathe: Math.sin(t * 2 + 1) * 1.5 };
  return (
    <AbsoluteFill>
      <CampBackdrop cam={cam} sky={NIGHT} uid="h" treeY={g - 260} t={t} />
      <Plane cam={cam} depth={1}>
        <Ground y={g} />
        <Svg>
          <circle cx={250} cy={g - 120} r={420} fill="#ffcf88" opacity={0.12} />
          <Tent x={250} y={g + 80} s={1.3} glow={1} />
          <Lantern x={250} y={g - 150} s={0.8} on={1} cord={40} />
        </Svg>
        <Subject rimX={-6} col={`rgba(${GLOW},0.9)`}>
          <Person {...pL} outfit={LEO} expression="happy" noPack flip />
          <Person {...pS} outfit={SAM} expression="happy" noPack flip />
          <Svg>
            <Mug x={560} y={g - 240} s={0.7} t={t} col="#B83A55" />
            <Mug x={808} y={g - 190} s={0.65} t={t} col="#2F7F86" />
          </Svg>
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#13241c" side="right" />
      </Plane>
      <Particles seed={1278} n={18} col="#ffe2b0" fall={6} bokeh />
      <LowScrim />
      <Grade sunX={250} sunY={g - 150} warm={GLOW} cool="20,30,70" vignette={0.55} />
      <Readout label="NEXT CAMP NIGHT" value="Still up past nine" ok={true} t={t} t0={21.8} x={60} y={200} />
    </AbsoluteFill>
  );
};

const S9: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/camp-night-set.jpg"
      photoH={760}
      spec="MINI LANTERN · SIT PAD · TRIP PLANNER"
      name={
        <>
          Camp Night
          <br />
          Set
        </>
      }
      nameSize={104}
      price="$33.99"
      save="Save this before your next camping trip"
    />
  );
};

export const V127: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.65} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.6} to={4.65} fadeIn={0.08} fadeOut={0.08}>
      <S2 off={2.6} />
    </Scene>
    <Scene from={4.6} to={7.44} fadeIn={0.08} fadeOut={0.08}>
      <S3 off={4.6} />
    </Scene>
    <Scene from={7.39} to={10.61} fadeIn={0.08} fadeOut={0.08}>
      <S4 off={7.39} />
    </Scene>
    <Scene from={10.56} to={15.84} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={10.56} />
    </Scene>
    <Scene from={15.79} to={18.74} fadeIn={0.08} fadeOut={0.08}>
      <S6 off={15.79} />
    </Scene>
    <Scene from={18.69} to={21.76} fadeIn={0.08} fadeOut={0.1}>
      <S7 off={18.69} />
    </Scene>
    <Scene from={21.71} to={23.95} fadeIn={0.12} fadeOut={0.12}>
      <S8 off={21.71} />
    </Scene>
    <Scene from={23.4} to={27.9} fadeOut={0}>
      <S9 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 2.6, 1560],
        [2.6, 4.6, 1640],
        [4.6, 7.39, 1560],
        [7.39, 10.56, 1640],
        [10.56, 15.79, 1700],
        [15.79, 18.69, 1700],
        [18.69, 21.71, 1640],
        [21.71, 23.4, 1560],
      ]}
    />
  </AbsoluteFill>
);
