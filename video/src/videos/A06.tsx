// A06: UGC-style talking video for the Winter Hiking Guide. Two 10 s Kling 3.0 clips of the HikeSupply character
// speaking to camera (her own voice is in the clips), captions from the real speech, hook headline, real-cover end card.
import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile } from "remotion";
import { at, C, outExpo } from "../lib";
import { Captions, Word, SANS } from "../Type";
import { Chip, HEAD, Scene, Title, useT } from "../kit";
import vo from "../vo/a06.json";

const words = vo.words as unknown as Word[];
const CLIP = 10.04;

const Talk: React.FC<{ n: number; dur: number }> = ({ n, dur }) => {
  const t = useT();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <OffthreadVideo src={staticFile(`footage/a06_s${n}.mp4`)} muted style={{ width: "100%", height: "100%", objectFit: "cover", scale: `${at(t, [0, dur], [1.0, 1.03])}` }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,16,14,0.1) 0%, rgba(10,16,14,0) 18%, rgba(10,16,14,0) 60%, rgba(10,16,14,0.55) 100%)" }} />
    </AbsoluteFill>
  );
};

const S1: React.FC = () => {
  const t = useT();
  return (
    <>
      <Talk n={1} dur={CLIP} />
      <Title text={"Your warmest jacket\nis why you're cold"} t={t} t0={0.1} t1={4.4} top={1180} size={96} />
      <Chip text="One big puffy coat" icon="x" t={t} t0={4.7} t1={7.9} x={80} y={1400} />
      <Chip text="Wind + wet shirt" icon="x" t={t} t0={8.0} x={80} y={1400} />
    </>
  );
};

const S2: React.FC = () => {
  const t = useT();
  return (
    <>
      <Talk n={2} dur={CLIP} />
      <Chip text="Base · fleece · shell" icon="check" t={t} t0={0.4} x={80} y={1400} />
      <Chip text="Puffy in the pack for stops" icon="check" t={t} t0={4.2} x={80} y={1400} />
    </>
  );
};

const End: React.FC = () => {
  const lt = useT();
  const pill = (txt: string, d: number) => (
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 36, letterSpacing: 1, color: C.forestDeep, background: C.stone, padding: "6px 20px", borderRadius: 10, textTransform: "uppercase", opacity: at(lt, [d, d + 0.3], [0, 1]) }}>{txt}</div>
  );
  const page = (src: string, x: number, rot: number, d: number, w: number) => (
    <div style={{ position: "absolute", top: 200, left: x, width: w, height: w * 1.294, borderRadius: 10, overflow: "hidden", boxShadow: "0 24px 50px rgba(0,0,0,0.5)", rotate: `${rot}deg`, opacity: at(lt, [d, d + 0.35], [0, 1]), translate: `0px ${at(lt, [d, d + 0.8], [40, 0], outExpo)}px` }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse 90% 70% at 50% 35%, #3a5244 0%, ${C.forestDeep} 80%)` }}>
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 40, letterSpacing: 10, color: C.stone, opacity: at(lt, [0, 0.3], [0, 1]) }}>HIKESUPPLY CO.</div>
      {page("products/winter-layering-page.jpg", 530, 5, 0.3, 440)}
      {page("products/winter-guide-cover.jpg", 110, -4, 0.05, 470)}
      <div style={{ position: "absolute", top: 860, left: 80, right: 80, fontFamily: HEAD, fontWeight: 800, fontSize: 100, lineHeight: 0.92, color: C.stone, textTransform: "uppercase", opacity: at(lt, [0.4, 0.75], [0, 1]) }}>
        Winter Hiking
        <br />
        Guide
      </div>
      <div style={{ position: "absolute", top: 1070, left: 80, right: 80 }}>
        {["What to wear by temperature, °F and °C", "Traction, short daylight, cold warning signs", "Printable winter checklists"].map((s, i) => (
          <div key={s} style={{ fontFamily: SANS, fontWeight: 600, fontSize: 38, lineHeight: 1.45, color: C.stone, opacity: at(lt, [0.7 + i * 0.3, 1.0 + i * 0.3], [0, 1]) }}>{s}</div>
        ))}
      </div>
      <div style={{ position: "absolute", top: 1290, left: 80, right: 80, display: "flex", gap: 14, flexWrap: "wrap" }}>
        {pill("22 pages", 1.6)}
        {pill("US Letter · A4", 1.75)}
        {pill("Instant download", 1.9)}
      </div>
      <div style={{ position: "absolute", top: 1430, left: 80, right: 80, display: "flex", alignItems: "center", gap: 28, opacity: at(lt, [2.0, 2.3], [0, 1]) }}>
        <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 96, color: C.forestDeep, background: C.stone, padding: "2px 28px", borderRadius: 14 }}>$7.99</div>
      </div>
      <div style={{ position: "absolute", top: 1640, left: 0, right: 0, textAlign: "center", fontFamily: SANS, fontWeight: 600, fontSize: 48, color: C.stone, opacity: at(lt, [2.4, 2.8], [0, 1]) }}>hikesupplyco.com · link in bio</div>
    </AbsoluteFill>
  );
};

export const A06: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={CLIP} fadeIn={0} fadeOut={0}>
      <S1 />
    </Scene>
    <Scene from={CLIP} to={CLIP * 2} fadeIn={0} fadeOut={0.15}>
      <S2 />
    </Scene>
    <Scene from={CLIP * 2 - 0.05} to={CLIP * 2 + 5} fadeIn={0.15} fadeOut={0}>
      <End />
    </Scene>
    <Captions words={words} windows={[[0, CLIP * 2, 1540]]} />
  </AbsoluteFill>
);
