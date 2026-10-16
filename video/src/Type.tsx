import React from "react";
import { getInputProps, useCurrentFrame } from "remotion";

// clean=true hides all text, for Pinterest background frames
export const isClean = () => Boolean((getInputProps() as { clean?: boolean }).clean);
import { at, C, FPS, outExpo } from "./lib";

export type Word = { w: string; s: number; e: number };

export const SERIF = "Fraunces";
export const SANS = "Inter";

// group words into readable chunks (<= maxWords, break after punctuation)
export const chunkWords = (words: Word[], maxWords = 4) => {
  const chunks: Word[][] = [];
  let cur: Word[] = [];
  words.forEach((w, i) => {
    cur.push(w);
    const punct = /[,.?!]$/.test(w.w);
    const gapNext = i < words.length - 1 ? words[i + 1].s - w.e : 1;
    if (cur.length >= maxWords || punct || gapNext > 0.25) {
      chunks.push(cur);
      cur = [];
    }
  });
  if (cur.length) chunks.push(cur);
  return chunks;
};

export const Captions: React.FC<{ words: Word[]; windows: [number, number, number][]; dark?: (t: number) => boolean }> = ({
  words,
  windows,
  dark,
}) => {
  const t = useCurrentFrame() / FPS;
  if (isClean()) return null;
  const win = windows.find(([a, b]) => t >= a && t < b);
  if (!win) return null;
  const y = win[2];
  const chunks = chunkWords(words);
  const idx = chunks.findIndex((c, i) => {
    const start = c[0].s - 0.05;
    const end = i < chunks.length - 1 ? chunks[i + 1][0].s - 0.05 : c[c.length - 1].e + 0.6;
    return t >= start && t < end;
  });
  if (idx < 0) return null;
  const c = chunks[idx];
  const t0 = c[0].s - 0.05;
  const onDark = dark ? dark(t) : true;
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: y,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 18px",
        fontFamily: SANS,
        fontWeight: 800,
        fontSize: 70,
        lineHeight: 1.15,
        letterSpacing: -1,
        translate: `0px ${at(t, [t0, t0 + 0.25], [24, 0])}px`,
        opacity: at(t, [t0, t0 + 0.12], [0, 1]),
      }}
    >
      {c.map((w, i) => {
        const active = t >= w.s - 0.03;
        const now = t >= w.s - 0.03 && t < w.e + 0.05;
        return (
          <span
            key={i}
            style={{
              color: active ? (now ? C.clayHot : onDark ? "#fff" : C.ink) : onDark ? "rgba(255,255,255,0.45)" : "rgba(31,36,33,0.35)",
              textShadow: onDark ? "0 3px 18px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.7)" : "none",
              scale: now ? `${at(t, [w.s - 0.03, w.s + 0.1], [1.12, 1.0])}` : "1",
              display: "inline-block",
            }}
          >
            {w.w}
          </span>
        );
      })}
    </div>
  );
};

export const Label: React.FC<{ text: string; t0: number; color?: string; top?: number; t1?: number }> = ({
  text,
  t0,
  color = "rgba(255,255,255,0.85)",
  top = 170,
  t1 = 999,
}) => {
  const t = useCurrentFrame() / FPS;
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 90,
        display: "flex",
        alignItems: "center",
        gap: 18,
        fontFamily: SANS,
        fontWeight: 600,
        fontSize: 30,
        letterSpacing: 7,
        textTransform: "uppercase",
        color,
        opacity: at(t, [t0, t0 + 0.4, t1 - 0.3, t1], [0, 1, 1, 0]),
      }}
    >
      <div style={{ width: at(t, [t0, t0 + 0.6], [0, 54]), height: 3, background: C.clayHot }} />
      {text}
    </div>
  );
};

// big serif headline with per-word rise reveal
export const Headline: React.FC<{
  text: string;
  t0: number;
  t1?: number;
  top?: number;
  size?: number;
  color?: string;
  stagger?: number;
  align?: "left" | "center";
  italicWords?: string[];
  accent?: string[];
}> = ({ text, t0, t1 = 999, top = 230, size = 104, color = "#fff", stagger = 0.06, align = "left", accent = [] }) => {
  const t = useCurrentFrame() / FPS;
  const words = text.split(" ");
  const out = at(t, [t1 - 0.35, t1], [1, 0]);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 90,
        right: 90,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: `0 ${size * 0.24}px`,
        fontFamily: SERIF,
        fontWeight: 560,
        fontVariationSettings: "'SOFT' 60, 'opsz' 144",
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: -size * 0.025,
        color,
        opacity: out,
      }}
    >
      {words.map((w, i) => {
        const ws = t0 + i * stagger;
        const isAccent = accent.includes(w.replace(/[.,]/g, ""));
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", paddingBottom: size * 0.12, paddingRight: isAccent ? size * 0.1 : 0, marginRight: isAccent ? -size * 0.1 : 0 }}>
            <span
              style={{
                display: "inline-block",
                color: isAccent ? C.clayHot : color,
                fontStyle: isAccent ? "italic" : "normal",
                translate: `0px ${at(t, [ws, ws + 0.55], [size * 1.1, 0], outExpo)}px`,
                rotate: `${at(t, [ws, ws + 0.55], [6, 0])}deg`,
              }}
            >
              {w}
            </span>
          </span>
        );
      })}
    </div>
  );
};
