// M01: "Why pay $20 for one pair of socks?" Merino Wool Hiking Socks.
// Realistic Kling 3.0 clips (HikeSupply Creator Soul + the real Black/Grey sock as reference), Kokoro voiceover,
// kinetic one-colour type (word punch-ins, shake, counter), white word-by-word captions, realistic product end shot.
import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { at, C, FPS, outExpo } from "../lib";
import { Word, isClean } from "../Type";
import { HEAD } from "../kit";
import vo from "../vo/m01.json";

const words = vo.words as unknown as Word[];
// first word at/after time `from` whose text starts with `w`
const wt = (w: string, from = 0) => (words.find((x) => x.s >= from - 0.01 && x.w.toLowerCase().replace(/[^a-z0-9$]/g, "").startsWith(w)) ?? { s: from }).s;

// shot plan: clip n, global start/end, clip offset, playback rate
type Shot = { n: number; a: number; b: number; off?: number; rate?: number };
const END0 = 19.75;
export const M01_LEN = 25.2;
const SHOTS: Shot[] = [
  { n: 1, a: 0, b: 2.85 },
  { n: 6, a: 2.85, b: 5.85 },
  { n: 2, a: 5.85, b: 7.75 },
  { n: 3, a: 7.75, b: 9.85, off: 0.6 },
  { n: 4, a: 9.85, b: 13.95, rate: 0.985 },
  { n: 5, a: 13.95, b: 17.65, rate: 0.66 },
  { n: 7, a: 17.65, b: END0, off: 0.5 },
  { n: 8, a: END0, b: M01_LEN, rate: 0.93, off: 0 },
];
const EMPH = /^(twenty|dollars|why|itch|odor|two|warm|damp|cotton|cheap|hike)/;
const clean = (w: string) => w.toLowerCase().replace(/[^a-z0-9$]/g, "");
const SHAKES = [1.45, ...words.filter((w) => EMPH.test(clean(w.w)) && w.s < END0).map((w) => w.s)];

const useG = () => useCurrentFrame() / FPS;
const shake = (t: number) => {
  let x = 0, y = 0;
  for (const s of SHAKES) {
    const k = at(t, [s, s + 0.03, s + 0.25], [0, 0.8, 0]);
    x += Math.sin(t * 90) * 14 * k;
    y += Math.cos(t * 77) * 10 * k;
  }
  return { x, y };
};

const ClipLayer: React.FC<{ s: Shot }> = ({ s }) => {
  const f = useCurrentFrame();
  const lt = f / FPS;
  const d = s.b - s.a;
  const punch = at(lt, [0, 0.28], [1.12, 1], outExpo);
  const blur = at(lt, [0, 0.22], [10, 0]);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <OffthreadVideo
        src={staticFile(`footage/m01_s${s.n}.mp4`)}
        volume={s.n === 5 ? 0.12 : 0.28}
        playbackRate={s.rate ?? 1}
        startFrom={Math.round((s.off ?? 0) * FPS)}
        style={{ width: "100%", height: "100%", objectFit: "cover", scale: `${punch * at(lt, [0, d], [1.0, 1.04])}`, filter: s.n === 1 && s.a === 0 ? "none" : `blur(${blur}px)` }}
      />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(6,10,8,0.55) 0%, rgba(6,10,8,0) 32%, rgba(6,10,8,0) 58%, rgba(6,10,8,0.55) 100%)" }} />
    </AbsoluteFill>
  );
};

// OpusClip-style captions: 1-2 big words in the middle, white with a heavy black outline, each word pops in with a bounce
const groups = (() => {
  const g: Word[][] = [];
  let cur: Word[] = [];
  words.forEach((w, i) => {
    cur.push(w);
    const punct = /[,.?!]$/.test(w.w);
    const gap = i < words.length - 1 ? words[i + 1].s - w.e : 1;
    if (cur.length >= 2 || punct || gap > 0.22 || EMPH.test(clean(w.w))) {
      g.push(cur);
      cur = [];
    }
  });
  if (cur.length) g.push(cur);
  return g;
})();
const SHOW: Record<string, string> = { twenty: "$20", dollars: "", two: "2" };
const Caps: React.FC<{ until: number }> = ({ until }) => {
  const t = useG();
  if (isClean() || t >= until) return null;
  const idx = groups.findIndex((c, i) => {
    const start = c[0].s - 0.04;
    const end = i < groups.length - 1 ? groups[i + 1][0].s - 0.04 : c[c.length - 1].e + 0.3;
    return t >= start && t < end;
  });
  if (idx < 0) return null;
  const c = groups[idx];
  const tilt = idx % 3 === 0 ? -2.5 : idx % 3 === 1 ? 2 : 0;
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top: 1120, display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "0 26px", rotate: `${tilt}deg` }}>
      {c.map((w, i) => {
        if (t < w.s - 0.04) return null;
        const show = SHOW[clean(w.w)] ?? w.w.replace(/[.,]$/, "");
        if (!show) return null;
        const big = EMPH.test(clean(w.w));
        const s0 = w.s - 0.04;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              fontFamily: HEAD,
              fontWeight: 800,
              fontSize: big ? 190 : 140,
              lineHeight: 1,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "#fff",
              WebkitTextStroke: big ? "16px #000" : "13px #000",
              paintOrder: "stroke fill",
              textShadow: "0 12px 0 rgba(0,0,0,0.35), 0 18px 40px rgba(0,0,0,0.45)",
              scale: `${at(t, [s0, s0 + 0.07, s0 + 0.16, s0 + 0.24], [0.35, 1.22, 0.94, 1])}`,
              translate: `0px ${at(t, [s0, s0 + 0.09, s0 + 0.2], [40, -14, 0])}px`,
              opacity: at(t, [s0, s0 + 0.05], [0, 1]),
            }}
          >
            {show}
          </span>
        );
      })}
    </div>
  );
};

// small section label that slides in at the top left
const Label: React.FC<{ text: string; t0: number; t1: number }> = ({ text, t0, t1 }) => {
  const t = useG();
  if (isClean() || t < t0 || t > t1) return null;
  return (
    <div style={{ position: "absolute", top: 200, left: 80, fontFamily: HEAD, fontWeight: 800, fontSize: 64, letterSpacing: 10, color: "#fff", WebkitTextStroke: "8px #000", paintOrder: "stroke fill", opacity: Math.min(at(t, [t0, t0 + 0.15], [0, 1]), at(t, [t1 - 0.15, t1], [1, 0])), translate: `${at(t, [t0, t0 + 0.35], [-60, 0], outExpo)}px 0px` }}>
      {text}
    </div>
  );
};

const EndOverlay: React.FC = () => {
  const t = useG(); // local time inside the end Sequence
  if (isClean()) return null;
  const up = (d: number) => ({ opacity: at(t, [d, d + 0.25], [0, 1]), translate: `0px ${at(t, [d, d + 0.5], [50, 0], outExpo)}px` });
  const chip = (s: string, d: number) => (
    <div style={{ ...up(d), fontFamily: HEAD, fontWeight: 700, fontSize: 40, letterSpacing: 2, textTransform: "uppercase", color: C.forestDeep, background: "#fff", padding: "8px 22px", borderRadius: 12 }}>{s}</div>
  );
  return (
    <>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(6,10,8,0.78) 0%, rgba(6,10,8,0.55) 30%, rgba(6,10,8,0) 48%, rgba(6,10,8,0) 80%, rgba(6,10,8,0.5) 100%)" }} />
      <div style={{ position: "absolute", top: 120, left: 0, right: 0, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 52, letterSpacing: 12, color: "#fff", ...up(0.1) }}>HIKESUPPLY CO.</div>
      <div style={{ position: "absolute", top: 230, left: 80, right: 80 }}>
        <div style={{ display: "flex", gap: 12, ...up(0.2) }}>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 38, letterSpacing: 6, color: "rgba(255,255,255,0.85)" }}>IN OUR STORE NOW</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 6 }}>
          <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 116, lineHeight: 0.9, color: "#fff", textTransform: "uppercase", ...up(0.3) }}>
            Merino
            <br />
            Hiking Socks
          </div>
          <div style={{ ...up(0.55), textAlign: "right" }}>
            <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 92, color: C.forestDeep, background: "#fff", padding: "2px 22px", borderRadius: 14 }}>$19.99</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
          {chip("80% merino", 0.75)}
          {chip("Free shipping", 0.9)}
          {chip("4 colors", 1.05)}
        </div>
      </div>
      <div style={{ position: "absolute", top: 1720, left: 80, right: 80, display: "flex", alignItems: "center", gap: 22, padding: "24px 30px", borderRadius: 22, background: "#fff", ...up(1.3) }}>
        <svg width={44} height={56} viewBox="0 0 56 70" style={{ flexShrink: 0 }}>
          <path d="M6,4 H50 V66 L28,50 L6,66 Z" fill={t > 1.8 ? C.forest : "none"} stroke={C.forest} strokeWidth={5} strokeLinejoin="round" />
        </svg>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 50, color: C.forestDeep, textTransform: "uppercase", lineHeight: 1 }}>Save this · link in bio</div>
      </div>
    </>
  );
};

export const M01: React.FC = () => {
  const t = useG();
  const sh = shake(t);
  const r1 = wt("merino", 5);
  const r2 = wt("its", 9.5);
  const r3 = wt("and", 13.8);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ translate: `${sh.x}px ${sh.y}px`, scale: "1.03" }}>
        {SHOTS.map((s) => (
          <Sequence key={s.n + "-" + s.a} from={Math.round(s.a * FPS)} durationInFrames={Math.round((s.b - s.a) * FPS)} layout="absolute-fill">
            <ClipLayer s={s} />
          </Sequence>
        ))}
      </AbsoluteFill>
      <Label text="REASON 1" t0={r1 - 0.1} t1={9.8} />
      <Label text="REASON 2" t0={r2 - 0.1} t1={13.9} />
      <Label text="REASON 3" t0={r3 - 0.1} t1={17.6} />
      <Caps until={END0} />
      <Sequence from={Math.round(END0 * FPS)} layout="absolute-fill">
        <EndOverlay />
      </Sequence>
    </AbsoluteFill>
  );
};
