// M01: "Why pay $20 for one pair of socks?" Merino Wool Hiking Socks.
// Realistic Kling 3.0 clips (HikeSupply Creator Soul + the real Black/Grey sock as reference), Kokoro voiceover,
// kinetic one-colour type (word punch-ins, shake, counter), white word-by-word captions, realistic product end shot.
import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { at, C, FPS, outExpo } from "../lib";
import { chunkWords, SANS, Word, isClean } from "../Type";
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
const SHAKES = [1.45, wt("here", 4), 17.7];

const useG = () => useCurrentFrame() / FPS;
const shake = (t: number) => {
  let x = 0, y = 0;
  for (const s of SHAKES) {
    const k = at(t, [s, s + 0.04, s + 0.35], [0, 1, 0]);
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

// a word that punches in: big -> normal, blurred -> sharp
const PunchWord: React.FC<{ w: string; t: number; t0: number; size: number }> = ({ w, t, t0, size }) => (
  <span
    style={{
      display: "inline-block",
      fontFamily: HEAD,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 0.95,
      letterSpacing: 1,
      textTransform: "uppercase",
      color: "#fff",
      textShadow: "0 8px 40px rgba(0,0,0,0.45)",
      opacity: at(t, [t0, t0 + 0.08], [0, 1]),
      scale: `${at(t, [t0, t0 + 0.3], [1.7, 1], outExpo)}`,
      filter: `blur(${at(t, [t0, t0 + 0.2], [14, 0])}px)`,
      translate: `0px ${at(t, [t0, t0 + 0.3], [-30, 0], outExpo)}px`,
      marginRight: size * 0.22,
    }}
  >
    {w}
  </span>
);

// headline: lines of [word, time]; leaves at t1 with a quick upward exit
const Head: React.FC<{ lines: [string, number][][]; size?: number; top?: number; t1: number; label?: string; labelT?: number }> = ({ lines, size = 130, top = 210, t1, label, labelT = 0 }) => {
  const t = useG();
  if (isClean()) return null;
  if (t > t1 + 0.25) return null;
  const out = at(t, [t1, t1 + 0.22], [0, 1]);
  return (
    <div style={{ position: "absolute", top, left: 80, right: 60, opacity: 1 - out, translate: `0px ${-60 * out}px`, filter: `blur(${8 * out}px)` }}>
      {label && (
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 58, letterSpacing: 8, color: "#fff", opacity: at(t, [labelT, labelT + 0.2], [0, 0.9]), translate: `${at(t, [labelT, labelT + 0.35], [-40, 0], outExpo)}px 0px`, marginBottom: 10 }}>
          {label}
        </div>
      )}
      {lines.map((ln, i) => (
        <div key={i} style={{ whiteSpace: "nowrap" }}>
          {ln.map(([w, t0], j) => (
            <PunchWord key={j} w={w} t={t} t0={t0} size={size} />
          ))}
        </div>
      ))}
    </div>
  );
};

const Counter: React.FC = () => {
  const t = useG();
  if (isClean() || t > 2.85) return null;
  const v = Math.round(at(t, [0.0, 0.75], [0, 20], outExpo));
  const k = at(t, [0.7, 0.78, 1.0], [1, 1.18, 1]);
  return (
    <div style={{ position: "absolute", top: 170, left: 80, fontFamily: HEAD, fontWeight: 800, fontSize: 300, lineHeight: 0.9, color: "#fff", textShadow: "0 10px 50px rgba(0,0,0,0.45)", scale: `${k}`, transformOrigin: "left center" }}>
      ${v}
    </div>
  );
};

// white word-by-word captions (no colour accents): spoken word full white and slightly larger, rest dimmed
const Caps: React.FC<{ until: number }> = ({ until }) => {
  const t = useG();
  if (isClean() || t >= until) return null;
  const chunks = chunkWords(words, 3);
  const idx = chunks.findIndex((c, i) => {
    const start = c[0].s - 0.05;
    const end = i < chunks.length - 1 ? chunks[i + 1][0].s - 0.05 : c[c.length - 1].e + 0.4;
    return t >= start && t < end;
  });
  if (idx < 0) return null;
  const c = chunks[idx];
  const t0 = c[0].s - 0.05;
  return (
    <div style={{ position: "absolute", left: 70, right: 70, top: 1500, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 20px", fontFamily: SANS, fontWeight: 800, fontSize: 74, lineHeight: 1.12, letterSpacing: -1, translate: `0px ${at(t, [t0, t0 + 0.22], [30, 0], outExpo)}px`, opacity: at(t, [t0, t0 + 0.1], [0, 1]) }}>
      {c.map((w, i) => {
        const on = t >= w.s - 0.03;
        const now = on && t < w.e + 0.05;
        return (
          <span key={i} style={{ display: "inline-block", color: on ? "#fff" : "rgba(255,255,255,0.42)", textShadow: "0 3px 18px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.8)", scale: now ? `${at(t, [w.s - 0.03, w.s + 0.12], [1.18, 1.06])}` : "1" }}>
            {w.w}
          </span>
        );
      })}
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
      <Counter />
      <Head lines={[[["For", wt("for", 0.5)], ["one", wt("one", 0.5)]], [["pair", wt("pair", 0.5)], ["of", wt("of", 1)]], [["socks.", wt("socks", 1)]]]} top={460} size={124} t1={2.75} />
      <Head lines={[[["Here's", wt("here", 4)]], [["why.", wt("why", 4)]]]} top={230} size={210} t1={5.75} />
      <Head label="REASON 1" labelT={r1} lines={[[["No", wt("doesnt", r1)], ["itch.", wt("itch", r1)]]]} size={170} t1={9.8} />
      <Head label="REASON 2" labelT={r2} lines={[[["No", wt("odor", r2)], ["smell.", wt("odor", r2) + 0.15]], [["On", wt("on", r2 + 1)], ["day", wt("day", r2)], ["2.", wt("two", r2)]]]} size={150} t1={13.9} />
      <Head label="REASON 3" labelT={r3} lines={[[["Warm", wt("warm", r3)]], [["when", wt("even", r3)], ["wet.", wt("damp", r3)]]]} size={160} t1={17.6} />
      <Head lines={[[["Cheap", wt("cheap", 17)], ["socks", wt("socks", 17)]], [["cost", wt("cost", 17)], ["you", wt("you", 17)]], [["the", wt("the", 17.5)], ["hike.", wt("hike", 17.5)]]]} size={150} top={300} t1={END0 - 0.05} />
      <Caps until={END0} />
      <Sequence from={Math.round(END0 * FPS)} layout="absolute-fill">
        <EndOverlay />
      </Sequence>
    </AbsoluteFill>
  );
};
