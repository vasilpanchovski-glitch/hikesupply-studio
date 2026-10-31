// V76: "Laced tight, toes frozen" in the cinematic C01 style, frosty November trail.
// Advice: boots laced too tight squeeze circulation and feet get cold; leave room to wiggle your toes; merino socks stay warm
// when damp; carry a dry spare pair and change at lunch. End card = Merino Wool Hiking Socks, 80% merino, cushioned crew,
// sold as 1 pair, $19.99 (live Shopify).
import React from "react";
import { AbsoluteFill } from "remotion";
import { HikerProps } from "../Hiker";
import { Person, JAKE, Outfit } from "../Person";
import { at, mix, outExpo } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Readout, Scene, Title, useT } from "../kit";
import { Cam, FrameLeaves, Grade, handheld, Particles, Plane, Rays, rim, Svg } from "../cine";
import { DAWN, FrostTrail, WGOLD, WINTER, WinterBackdrop } from "../winter";
import { Breath } from "../fall";
import vo from "../vo/v76.json";

const words = vo.words as unknown as Word[];

const SAM: Outfit = {
  ...JAKE,
  skin: "#D9A07E",
  skinShade: "#BC8463",
  hair: "#3a2a1e",
  beard: "#3a2a1e",
  cap: "#2C3B2E",
  capShade: "#1B2620",
  jacket: "#B5553A",
  jacketShade: "#8E3F2A",
  pants: "#3f444b",
  pantsShade: "#2e3238",
  pack: "#2F5D8A",
  packShade: "#244a6f",
  boot: "#6B4630",
  glove: "#2a2a2a",
};

const BOOT = "#7a5236";
const BOOT_D = "#5b3c27";
const LACE = "#d9c08a";
const SOCK_C = "#8d8f88";
const SOCK_T = "#4f5a52";

const Subject: React.FC<{ children: React.ReactNode; rimX?: number }> = ({ children, rimX = 4 }) => (
  <AbsoluteFill style={{ filter: rim(rimX) }}>
    <Svg>{children}</Svg>
  </AbsoluteFill>
);

// Eyelet pairs along the boot front, top to bottom. gap = half distance between the two rows.
const eyelets = (gap: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const k = i / 5;
    const cx = mix(560, 700, k);
    const cy = mix(720, 1110, k);
    return [
      [cx - gap * 0.9, cy - gap * 0.35],
      [cx + gap * 0.9, cy + gap * 0.35],
    ] as [number, number][];
  });

// Big boot close-up, side view, toe to the right (screen units).
// tight 0..1, xray 0..1 shows the foot inside, cold 0..1 turns toes blue, flow 0..1 how far warm blood reaches,
// damp 0..1 dark wet sock, wig = toe wiggle offset.
const BootCut: React.FC<{ t: number; tight: number; xray?: number; cold?: number; flow?: number; damp?: number; wig?: number; sock?: string }> = ({
  t,
  tight,
  xray = 0,
  cold = 0,
  flow = 1,
  damp = 0,
  wig = 0,
  sock = SOCK_C,
}) => {
  const pinch = tight * 18;
  const outline = `M${300 + pinch * 0.4},690 L${600 - pinch},690 L${640 - pinch},1080 Q700,1150 780,1170 Q910,1195 920,1290 L920,1350 L270,1350 Q250,1200 ${300 + pinch * 0.4},690 Z`;
  const ey = eyelets(mix(46, 22, tight));
  const toe = `rgb(${Math.round(mix(214, 120, cold))},${Math.round(mix(150, 160, cold))},${Math.round(mix(120, 210, cold))})`;
  // dashed blood path from the leg down to the toes
  const bloodLen = 900;
  return (
    <g>
      <path d={outline} fill={BOOT} stroke="rgba(0,0,0,0.35)" strokeWidth={6} />
      <path d={`M280,1250 L920,1250 L920,1350 L270,1350 Z`} fill={BOOT_D} />
      <rect x={250} y={1340} width={690} height={46} rx={18} fill="#2a2421" />
      <path d={`M${300 + pinch * 0.4},690 L${600 - pinch},690 L${606 - pinch},740 L${302 + pinch * 0.4},740 Z`} fill="#4a3424" />
      {/* x-ray of the foot inside */}
      {xray > 0 && (
        <g opacity={xray}>
          <path d={outline} fill="rgba(20,30,40,0.55)" />
          {/* sock-covered leg and foot */}
          <path
            d={`M${350 + pinch * 0.6},700 L${560 - pinch},700 L${590 - pinch},1090 Q700,1160 800,1180 Q890,1200 890,1280 Q886,1320 840,1322 L330,1322 Q300,1300 310,1200 Z`}
            fill={sock}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={4}
          />
          <path d={`M330,1322 Q300,1300 310,1200 L330,1100 Q420,1180 420,1322 Z`} fill={SOCK_T} opacity={0.8} />
          <path d={`M800,1180 Q890,1200 890,1280 Q886,1320 840,1322 L790,1322 Q830,1260 800,1180 Z`} fill={SOCK_T} opacity={0.8} />
          {/* damp patch */}
          {damp > 0 && (
            <g opacity={damp}>
              <path d={`M400,1100 Q600,1060 800,1190 Q880,1220 880,1300 L340,1310 Q330,1180 400,1100 Z`} fill="rgba(40,60,90,0.45)" />
              {[0, 1, 2, 3].map((i) => {
                const k = (t * 0.8 + i * 0.25) % 1;
                return <path key={i} d={`M${460 + i * 100},${1130 + k * 120} q-10,16 0,24 q10,-8 0,-24 Z`} fill="#8fc1e0" opacity={1 - k} />;
              })}
            </g>
          )}
          {/* toes */}
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={i} cx={850 - i * 26} cy={1290 - (i === 0 ? 4 : 0) + (i % 2 ? wig : -wig)} rx={16 - i} ry={12} fill={toe} opacity={0.9} />
          ))}
          {/* blood flow */}
          <path
            d={`M455,700 L470,1000 Q520,1150 700,1220 L850,1270`}
            stroke="#e0483c"
            strokeWidth={12}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${bloodLen * flow} ${bloodLen}`}
            opacity={0.85}
          />
          <path
            d={`M455,700 L470,1000 Q520,1150 700,1220 L850,1270`}
            stroke="#ffd2c8"
            strokeWidth={5}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`20 40`}
            strokeDashoffset={-t * 120}
            opacity={0.7}
            style={{ clipPath: `inset(0 ${100 - flow * 100}% 0 0)` }}
          />
        </g>
      )}
      {/* tongue + laces */}
      <path d={`M${560 - pinch * 0.5},700 L${700 - pinch * 0.3},1110`} stroke="#4a3424" strokeWidth={mix(70, 30, tight)} strokeLinecap="round" opacity={0.9} />
      {ey.map((pair, i) => (
        <g key={i}>
          {pair.map(([x, y], j) => (
            <circle key={j} cx={x} cy={y} r={11} fill="#c9c2b4" stroke="#2a2421" strokeWidth={4} />
          ))}
        </g>
      ))}
      {ey.slice(0, -1).map((pair, i) => {
        const nxt = ey[i + 1];
        return (
          <g key={i}>
            <line x1={pair[0][0]} y1={pair[0][1]} x2={nxt[1][0]} y2={nxt[1][1]} stroke={LACE} strokeWidth={9} strokeLinecap="round" />
            <line x1={pair[1][0]} y1={pair[1][1]} x2={nxt[0][0]} y2={nxt[0][1]} stroke={LACE} strokeWidth={9} strokeLinecap="round" />
          </g>
        );
      })}
      {/* squeeze arrows */}
      {tight > 0.6 && xray > 0 && (
        <g opacity={(tight - 0.6) / 0.4}>
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${mix(560, 700, 0.4 + i * 0.3)},${mix(720, 1110, 0.4 + i * 0.3)})`}>
              <path d="M-120,-40 L-50,-10 M-120,20 L-50,-10" stroke="#ffffff" strokeWidth={10} strokeLinecap="round" />
              <path d="M120,40 L50,10 M120,-20 L50,10" stroke="#ffffff" strokeWidth={10} strokeLinecap="round" />
            </g>
          ))}
        </g>
      )}
    </g>
  );
};

// Gloved fist with a jacket cuff coming from the top of frame.
const Fist: React.FC<{ x: number; y: number; rot?: number }> = ({ x, y, rot = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${rot})`}>
    <rect x={-70} y={-420} width={140} height={360} rx={50} fill={SAM.jacket} />
    <rect x={-70} y={-120} width={140} height={60} rx={20} fill={SAM.jacketShade} />
    <rect x={-66} y={-70} width={132} height={120} rx={46} fill="#2a2a2a" />
    {[0, 1, 2].map((k) => (
      <path key={k} d={`M${-40 + k * 30},-10 l0,46`} stroke="rgba(255,255,255,0.12)" strokeWidth={6} strokeLinecap="round" />
    ))}
  </g>
);

// ============ S1 HOOK CLOSE-UP: hands yank the laces tight at a frosty trailhead (0 - 3.13) ============
const S1: React.FC = () => {
  const t = useT();
  const yank = (k: number) => at(t, [k, k + 0.18, k + 0.5], [0, 1, 0.75], outExpo);
  const y = yank(0.4) * 0.5 + yank(1.4) * 0.5 + at(t, [2.2, 2.4], [0, 0.3]);
  const tight = at(t, [0.3, 2.4], [0.3, 1]);
  const shake = at(t, [1.4, 1.5, 1.8], [0, 0.6, 0]);
  const hh = handheld(t, 0.6, shake);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.04, 1.1, t / 3.1), rot: hh.rot };
  const handY = 560 - y * 140;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="a" treeY={1150} blur={9} t={t} snow={0.3} />
      <Plane cam={cam} depth={0.9} blur={2}>
        <Svg>
          {/* frosty bench */}
          <rect x={-200} y={1380} width={1500} height={70} rx={10} fill="#7b6448" />
          <rect x={-200} y={1372} width={1500} height={14} rx={6} fill="#eef3f6" opacity={0.85} />
        </Svg>
      </Plane>
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <g transform="translate(0,40)">
            <BootCut t={t} tight={tight} />
            <line x1={mix(560, 700, 0) - 40} y1={705} x2={420} y2={handY + 30} stroke={LACE} strokeWidth={9} strokeLinecap="round" />
            <line x1={mix(560, 700, 0) + 40} y1={735} x2={760} y2={handY + 30} stroke={LACE} strokeWidth={9} strokeLinecap="round" />
            <Fist x={420} y={handY} rot={10} />
            <Fist x={760} y={handY} rot={-10} />
          </g>
        </Subject>
      </Plane>
      {/* breath cloud drifting in */}
      <Svg>
        {[0, 1].map((i) => {
          const k = (t * 0.5 + i * 0.5) % 1;
          return <ellipse key={i} cx={1000 - k * 200} cy={900 - k * 60} rx={80 + k * 120} ry={50 + k * 60} fill="#ffffff" opacity={0.22 * (1 - k)} />;
        })}
      </Svg>
      <Particles seed={61} n={18} col="#ffffff" fall={20} />
      <Grade sunX={300} sunY={760} warm="255,214,170" cool="30,50,90" vignette={0.6} />
      <Title text={"Laced tight.\nToes frozen."} t={t} t0={0} top={140} size={124} />
      <Chip text="Laced extra tight" t={t} t0={1.5} x={80} y={1240} icon="x" big />
    </AbsoluteFill>
  );
};

// ============ S2 WIDE/MEDIUM: an hour in on the frosty trail, toes numb (3.13 - 5.17) ============
const S2: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 40 + hh.x, y: hh.y, zoom: mix(1.0, 1.08, lt / 2), rot: hh.rot };
  const g = 1420;
  const ph = t * 3.0;
  const p: HikerProps = { x: 470 + lt * 30, y: g + 182 * 2.3 - 130, scale: 2.3, phase: ph, walk: 0.5, lean: 0.12, poles: false };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="b" treeY={g + 40} blur={2} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 60} />
        <Subject rimX={5}>
          <Person {...p} outfit={SAM} expression="tired" />
          <Breath p={p} t={t} />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24443a" side="right" />
      </Plane>
      <Rays x={WINTER.sun[0]} y={WINTER.sun[1]} strength={0.16} />
      <Particles seed={62} n={20} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="236,236,236" cool="20,40,70" />
      <Chip text="1 hour in" t={t} t0={3.3} x={80} y={240} big />
      <Readout label="TOES" value="Numb" ok={false} t={t} t0={4.0} x={80} y={380} />
    </AbsoluteFill>
  );
};

// ============ S3 CLOSE-UP X-RAY: tight laces squeeze the blood flow, sweaty sock (5.17 - 9.92) ============
const S3: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.02, 1.1, lt / 4.75), rot: hh.rot };
  const flow = at(t, [5.4, 6.6], [1, 0.42]);
  const cold = at(t, [6.0, 7.4], [0, 1]);
  const damp = at(t, [8.0, 8.8], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="c" treeY={1200} blur={12} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <g transform="translate(-20,80)">
            <BootCut t={t} tight={1} xray={at(t, [5.2, 5.6], [0, 1])} flow={flow} cold={cold} damp={damp} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={63} n={14} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="236,236,236" cool="20,40,70" vignette={0.6} />
      <Chip text="Too tight: less blood flow" t={t} t0={5.6} x={80} y={240} icon="x" big />
      <Chip text="Cold toes" t={t} t0={6.9} x={80} y={370} icon="x" />
      <Chip text="Socks damp with sweat" t={t} t0={8.1} x={80} y={470} icon="x" />
    </AbsoluteFill>
  );
};

// ============ S4 FIX CLOSE-UP: loosen, room to wiggle your toes (9.92 - 12.88) ============
const S4: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 3), rot: hh.rot };
  const tight = at(t, [10.0, 10.9], [1, 0.25], outExpo);
  const wig = t > 11.2 ? Math.sin(t * 14) * 8 : 0;
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="d" treeY={1200} blur={12} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <Subject rimX={-5}>
          <g transform="translate(-20,160)">
            <BootCut t={t} tight={tight} xray={1} flow={at(t, [10.4, 11.4], [0.42, 1])} cold={at(t, [10.6, 12.2], [1, 0])} wig={wig} />
          </g>
        </Subject>
      </Plane>
      <Particles seed={64} n={14} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Title text={"Room to\nwiggle."} t={t} t0={off + 0.3} top={150} size={150} />
      <Chip text="Snug, not tight" t={t} t0={11.3} x={80} y={500} icon="check" big />
    </AbsoluteFill>
  );
};

// Big crew sock, side view, toe right (local units ~ 380 x 460 at s=1).
const BigSock: React.FC<{ x: number; y: number; s?: number; rot?: number; body?: string; damp?: number; t: number; label?: string }> = ({
  x,
  y,
  s = 1,
  rot = 0,
  body = SOCK_C,
  damp = 0,
  t,
  label,
}) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <path d="M0,0 L150,0 L150,240 Q152,282 200,298 L326,322 Q386,338 378,394 Q370,458 300,458 L92,458 Q0,458 0,366 Z" fill={body} stroke="rgba(0,0,0,0.2)" strokeWidth={5} />
    <rect x={0} y={0} width={150} height={56} fill={SOCK_T} />
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={12 + i * 13} y={70} width={5} height={170} fill="rgba(0,0,0,0.07)" />
    ))}
    <path d="M0,366 Q0,458 92,458 L118,458 Q60,412 68,340 Z" fill={SOCK_T} />
    <path d="M300,458 Q370,458 378,394 Q380,358 344,334 Q322,400 300,458 Z" fill={SOCK_T} />
    {label && (
      <text x={75} y={150} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight={800} fontSize={40} fill="rgba(255,255,255,0.85)" transform="rotate(-90 75 150)">
        {label}
      </text>
    )}
    {damp > 0 && (
      <g opacity={damp}>
        <path d="M0,300 Q120,340 220,300 L300,330 L300,458 L92,458 Q0,458 0,366 Z" fill="rgba(40,60,90,0.35)" />
        {[0, 1, 2].map((i) => {
          const k = (t * 0.9 + i * 0.33) % 1;
          return <path key={i} d={`M${100 + i * 90},${470 + k * 160} q-14,22 0,32 q14,-10 0,-32 Z`} fill="#8fc1e0" opacity={1 - k} />;
        })}
      </g>
    )}
  </g>
);

// ============ S5 CLOSE-UP: merino socks stay warm when damp (12.88 - 15.51) ============
const S5: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: lt * 10 + hh.x, y: hh.y, zoom: mix(1.0, 1.06, lt / 2.6), rot: hh.rot };
  const inK = at(t, [12.9, 13.5], [0, 1], outExpo);
  const warm = at(t, [14.0, 14.8], [0, 1]);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={DAWN} uid="e" treeY={1200} blur={12} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* warm glow behind the sock */}
          <ellipse cx={560} cy={1000} rx={520 * warm} ry={520 * warm} fill="rgba(255,190,120,0.3)" />
          <BigSock x={mix(1200, 250, inK)} y={620} s={1.65} rot={-4} t={t} body="#6f7a70" damp={at(t, [13.6, 14.0], [0, 0.5])} label="MERINO" />
          {/* warm waves */}
          {[0, 1, 2].map((i) => {
            const k = (t * 0.6 + i / 3) % 1;
            return <path key={i} d={`M${420 + i * 110},${700 - k * 160} q-26,-40 0,-80 q26,-40 0,-80`} stroke="#ffcf9c" strokeWidth={14} fill="none" strokeLinecap="round" opacity={warm * 0.7 * (1 - k)} />;
          })}
        </Svg>
      </Plane>
      <Particles seed={65} n={16} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="255,214,170" vignette={0.55} />
      <Chip text="Merino socks" t={t} t0={13.0} x={80} y={240} icon="check" big />
      <Chip text="Warm even when damp" t={t} t0={14.0} x={80} y={370} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S6 CLOSE-UP: a dry spare pair goes in the pack, for lunch (15.51 - 17.70) ============
const S6: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: mix(1.0, 1.05, lt / 2.2), rot: hh.rot };
  const slide = at(t, [15.6, 16.5], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WINTER} uid="f" treeY={1200} blur={12} t={t} snow={0.4} />
      <Plane cam={cam} depth={1}>
        <Svg>
          <path d="M160,640 Q160,540 320,530 L760,530 Q920,540 920,690 L920,1400 Q920,1470 820,1470 L170,1470 Z" fill={SAM.pack} />
          <path d="M200,610 L880,610" stroke={SAM.packShade} strokeWidth={16} />
          <rect x={210} y={680} width={660} height={760} rx={30} fill="#1b2f45" />
          {/* zip bag with folded socks */}
          <g transform={`translate(${mix(560, 540, slide)},${mix(240, 980, slide)}) rotate(${mix(-12, 0, slide)})`}>
            <rect x={-230} y={-170} width={460} height={340} rx={24} fill="rgba(230,240,245,0.35)" stroke="rgba(255,255,255,0.8)" strokeWidth={6} />
            <rect x={-230} y={-170} width={460} height={34} rx={10} fill="#3f8fb0" opacity={0.8} />
            <BigSock x={-200} y={-140} s={0.6} t={t} body="#6f7a70" />
            <BigSock x={10} y={-140} s={0.6} t={t} body="#7d887c" />
            <rect x={-230} y={-170} width={460} height={340} rx={24} fill="rgba(230,240,245,0.18)" stroke="rgba(255,255,255,0.9)" strokeWidth={6} />
            <rect x={-200} y={-120} width={30} height={260} rx={15} fill="rgba(255,255,255,0.35)" />
          </g>
        </Svg>
      </Plane>
      <Particles seed={66} n={14} col="#ffffff" fall={20} />
      <Grade sunX={800} sunY={560} warm="255,226,190" vignette={0.55} />
      <Chip text="Dry spare pair" t={t} t0={15.7} x={80} y={150} icon="check" big />
      <Chip text="Change at lunch" t={t} t0={16.4} x={80} y={280} icon="check" />
    </AbsoluteFill>
  );
};

// ============ S7a CLOSE-UP PAYOFF: the swap on a sunny rock (17.70 - 19.60) ============
const S7a: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.4);
  const cam: Cam = { x: hh.x, y: hh.y, zoom: at(lt, [0, 1.2], [1.14, 1.04], outExpo), rot: hh.rot };
  const off1 = at(t, [17.8, 18.4], [0, 1], outExpo);
  const on = at(t, [18.4, 19.1], [0, 1], outExpo);
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="g" treeY={1150} blur={10} t={t} snow={0.3} />
      <Plane cam={cam} depth={1}>
        <Svg>
          {/* rock */}
          <path d="M-100,1380 Q60,1180 400,1170 Q800,1150 1000,1260 Q1180,1350 1180,1600 L-100,1600 Z" fill="#7d8288" />
          <path d="M60,1230 Q400,1180 800,1200" stroke="rgba(255,255,255,0.3)" strokeWidth={14} fill="none" />
          {/* old damp sock pulled away, fresh one slides on */}
          <BigSock x={mix(200, 700, off1)} y={mix(560, 1050, off1)} s={mix(1.3, 0.55, off1)} rot={mix(0, 30, off1)} t={t} body="#6f7270" damp={1} />
          <g opacity={on}>
            <BigSock x={mix(-400, 200, on)} y={560} s={1.3} t={t} body="#6f7a70" label="DRY" />
          </g>
        </Svg>
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.26} col="255,214,150" />
      <Particles seed={67} n={20} col="#ffe7b8" />
      <Grade sunX={760} sunY={640} warm="255,180,100" vignette={0.5} />
      <Chip text="Swap at lunch" t={t} t0={17.9} x={80} y={240} icon="check" big />
    </AbsoluteFill>
  );
};

// ============ S7b MEDIUM: walking on, feet warming (19.60 - 21.27) ============
const S7b: React.FC<{ off: number }> = ({ off }) => {
  const lt = useT();
  const t = lt + off;
  const hh = handheld(t, 0.5);
  const cam: Cam = { x: lt * 40 + hh.x, y: hh.y, zoom: mix(1.06, 1.1, lt / 1.7), rot: hh.rot };
  const g = 1420;
  const ph = t * 3.6;
  const p: HikerProps = { x: 420 + lt * 60, y: g + 182 * 2.3 - 130, scale: 2.3, phase: ph, walk: 0.85, lean: 0.12, poles: false };
  return (
    <AbsoluteFill>
      <WinterBackdrop cam={cam} sky={WGOLD} uid="h" treeY={g + 40} blur={2} t={t} snow={0.3} />
      <Plane cam={cam} depth={1}>
        <FrostTrail y={g + 60} />
        <Subject rimX={6}>
          <Person {...p} outfit={SAM} expression="happy" />
        </Subject>
      </Plane>
      <Plane cam={cam} depth={1.7} blur={14}>
        <FrameLeaves col="#24443a" side="left" />
      </Plane>
      <Rays x={WGOLD.sun[0]} y={WGOLD.sun[1]} strength={0.3} col="255,214,150" />
      <Particles seed={68} n={24} col="#ffe7b8" />
      <Grade sunX={760} sunY={640} warm="255,180,100" />
      <Readout label="TOES" value="Warming up" ok={true} t={t} t0={19.8} x={80} y={240} />
    </AbsoluteFill>
  );
};

const S8: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/merino-wool-hiking-socks-cut.png"
      cutoutH={780}
      spec="80% MERINO · CUSHIONED CREW · SOLD AS 1 PAIR"
      name={
        <>
          Merino
          <br />
          Hiking Socks
        </>
      }
      nameSize={104}
      price="$19.99"
      save="Save this before your cold hike"
    />
  );
};

export const V76: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.18} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={3.13} to={5.22} fadeIn={0.06} fadeOut={0.08}>
      <S2 off={3.13} />
    </Scene>
    <Scene from={5.17} to={9.97} fadeIn={0.08} fadeOut={0.1}>
      <S3 off={5.17} />
    </Scene>
    <Scene from={9.92} to={12.93} fadeIn={0.1} fadeOut={0.08}>
      <S4 off={9.92} />
    </Scene>
    <Scene from={12.88} to={15.56} fadeIn={0.08} fadeOut={0.08}>
      <S5 off={12.88} />
    </Scene>
    <Scene from={15.51} to={17.75} fadeIn={0.08} fadeOut={0.1}>
      <S6 off={15.51} />
    </Scene>
    <Scene from={17.7} to={19.65} fadeIn={0.12} fadeOut={0.08}>
      <S7a off={17.7} />
    </Scene>
    <Scene from={19.6} to={21.35} fadeIn={0.08} fadeOut={0.12}>
      <S7b off={19.6} />
    </Scene>
    <Scene from={21.1} to={27} fadeOut={0}>
      <S8 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.13, 1560],
        [3.13, 5.17, 1560],
        [5.17, 9.92, 1560],
        [9.92, 12.88, 1560],
        [12.88, 15.51, 1560],
        [15.51, 17.7, 1560],
        [17.7, 21.1, 1560],
      ]}
    />
  </AbsoluteFill>
);
