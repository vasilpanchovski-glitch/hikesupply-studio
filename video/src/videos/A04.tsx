// A04: Meta ad for the Ultimate Hiker's Toolkit. Five realistic Higgsfield clips (Kling 3.0, saved "HikeSupply Creator" character)
// in video/public/footage/a04_s*.mp4 (not in git), our voice, captions, chips and a real-cover end card listing every guide.
import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile } from "remotion";
import { at, C, FPS, outExpo } from "../lib";
import { Captions, Word, SANS } from "../Type";
import { Chip, HEAD, Scene, Title, useT } from "../kit";
import vo from "../vo/a04.json";

const words = vo.words as unknown as Word[];

const Shot: React.FC<{ n: number; start: number; dur: number; zoom?: [number, number]; topDark?: number }> = ({ n, start, dur, zoom = [1.02, 1.08], topDark = 0.4 }) => {
  const t = useT();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <OffthreadVideo
        src={staticFile(`footage/a04_s${n}.mp4`)}
        startFrom={Math.round(start * FPS)}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover", scale: `${at(t, [0, dur], zoom)}` }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(10,16,14,${topDark * 0.3}) 0%, rgba(10,16,14,0) 20%, rgba(10,16,14,0) 52%, rgba(10,16,14,0.62) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

const S1: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot n={1} start={0} dur={3.7} topDark={0.6} />
      <Title text={"Your first hikes,\nplanned"} t={t} t0={0} top={1120} size={132} />
    </>
  );
};

const S2: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot n={2} start={0.4} dur={2.7} />
      <Chip text="Packing Checklist" icon="check" t={t} t0={0.3} x={80} y={1330} />
    </>
  );
};

const S3: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot n={3} start={2.6} dur={2.1} />
      <Chip text="One page per hike" icon="check" t={t} t0={0.2} x={80} y={1330} />
    </>
  );
};

const S4: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot n={4} start={0.3} dur={3.7} />
      <Chip text="7 guides for beginners" icon="check" t={t} t0={0.3} x={80} y={1410} />
    </>
  );
};

const S5: React.FC = () => {
  return <Shot n={5} start={1.4} dur={2.8} zoom={[1.0, 1.05]} />;
};

const GROUPS: [string, string[]][] = [
  ["Learn", ["Beginner's Hiking Guide", "Solo Hiking Guide"]],
  ["Plan & pack", ["Hiking Trip Planner", "Ultimate Packing Checklist"]],
  ["Stay safe", ["Hiking Safety Guide", "Hiking Emergency Checklist", "What To Do If You Get Lost + pocket card"]],
];

const End: React.FC = () => {
  const lt = useT();
  const pill = (txt: string, d: number) => (
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 36, letterSpacing: 1, color: C.forestDeep, background: C.stone, padding: "6px 20px", borderRadius: 10, textTransform: "uppercase", opacity: at(lt, [d, d + 0.3], [0, 1]) }}>{txt}</div>
  );
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse 90% 70% at 50% 35%, #3a5244 0%, ${C.forestDeep} 80%)` }}>
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 40, letterSpacing: 10, color: C.stone, opacity: at(lt, [0, 0.3], [0, 1]) }}>HIKESUPPLY CO.</div>
      <div
        style={{
          position: "absolute", top: 190, left: 50, width: 980, height: 323, borderRadius: 18, overflow: "hidden", boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
          opacity: at(lt, [0, 0.35], [0, 1]), scale: `${at(lt, [0, 0.8], [0.94, 1], outExpo)}`,
        }}
      >
        <Img src={staticFile("products/toolkit-covers-strip.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", top: 548, left: 80, right: 80, fontFamily: HEAD, fontWeight: 800, fontSize: 104, lineHeight: 0.92, color: C.stone, textTransform: "uppercase", opacity: at(lt, [0.25, 0.6], [0, 1]) }}>
        Ultimate Hiker's
        <br />
        Toolkit
      </div>
      <div style={{ position: "absolute", top: 770, left: 80, right: 80 }}>
        {GROUPS.map(([g, items], gi) => {
          const d = 0.7 + gi * 0.9;
          return (
            <div key={g} style={{ marginBottom: 26, opacity: at(lt, [d, d + 0.35], [0, 1]), translate: `0px ${at(lt, [d, d + 0.5], [24, 0], outExpo)}px` }}>
              <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 34, letterSpacing: 4, color: C.sage, textTransform: "uppercase" }}>{g}</div>
              {items.map((it) => (
                <div key={it} style={{ fontFamily: SANS, fontWeight: 600, fontSize: 38, lineHeight: 1.32, color: C.stone }}>{it}</div>
              ))}
            </div>
          );
        })}
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 34, color: "rgba(245,241,234,0.8)", opacity: at(lt, [3.4, 3.7], [0, 1]) }}>Plus a Start Here guide</div>
      </div>
      <div style={{ position: "absolute", top: 1420, left: 80, right: 80, display: "flex", gap: 14, flexWrap: "wrap" }}>
        {pill("24 PDF files", 3.8)}
        {pill("US Letter · A4 · phone", 3.95)}
        {pill("Instant download", 4.1)}
      </div>
      <div style={{ position: "absolute", top: 1640, left: 80, right: 80, display: "flex", alignItems: "center", gap: 28, opacity: at(lt, [4.2, 4.5], [0, 1]) }}>
        <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 96, color: C.forestDeep, background: C.stone, padding: "2px 28px", borderRadius: 14 }}>$29.99</div>
        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 60, color: "rgba(245,241,234,0.6)", textDecoration: "line-through" }}>$49.93</div>
      </div>
      <div style={{ position: "absolute", top: 1810, left: 0, right: 0, textAlign: "center", fontFamily: SANS, fontWeight: 600, fontSize: 46, color: C.stone, opacity: at(lt, [4.4, 4.8], [0, 1]) }}>hikesupplyco.com</div>
    </AbsoluteFill>
  );
};

export const A04: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.7} fadeIn={0} fadeOut={0.12}>
      <S1 />
    </Scene>
    <Scene from={3.65} to={6.35} fadeIn={0.1} fadeOut={0.12}>
      <S2 />
    </Scene>
    <Scene from={6.3} to={8.35} fadeIn={0.1} fadeOut={0.12}>
      <S3 />
    </Scene>
    <Scene from={8.3} to={11.95} fadeIn={0.1} fadeOut={0.12}>
      <S4 />
    </Scene>
    <Scene from={11.9} to={14.7} fadeIn={0.1} fadeOut={0.15}>
      <S5 />
    </Scene>
    <Scene from={14.65} to={22.5} fadeOut={0}>
      <End />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.65, 1500],
        [3.65, 6.3, 1500],
        [6.3, 8.3, 1500],
        [8.3, 11.9, 1500],
        [11.9, 14.65, 1500],
      ]}
    />
  </AbsoluteFill>
);
