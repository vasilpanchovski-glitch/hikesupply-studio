// A05: Winter Hiking Guide story video. Six realistic Higgsfield clips (Kling 3.0, the HikeSupply character)
// in video/public/footage/a05_s*.mp4 (not in git), our voice, captions, chips and an end card with the real cover and real page.
import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile } from "remotion";
import { at, C, FPS, outExpo } from "../lib";
import { Captions, Word, SANS } from "../Type";
import { Chip, HEAD, Scene, Title, useT } from "../kit";
import vo from "../vo/a05.json";

const words = vo.words as unknown as Word[];

const Shot: React.FC<{ n: string; start: number; dur: number; zoom?: [number, number]; rate?: number; shake?: boolean }> = ({ n, start, dur, zoom = [1.03, 1.1], rate = 1, shake = false }) => {
  const t = useT();
  const sx = shake ? Math.sin(t * 37) * 4 + Math.sin(t * 23) * 3 : 0;
  const sy = shake ? Math.cos(t * 31) * 3 : 0;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <OffthreadVideo
        src={staticFile(`footage/a05_${n}.mp4`)}
        startFrom={Math.round(start * FPS)}
        playbackRate={rate}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover", scale: `${at(t, [0, dur], zoom)}`, translate: `${sx}px ${sy}px` }}
      />
      <AbsoluteFill
        style={{ background: "linear-gradient(180deg, rgba(10,16,14,0.15) 0%, rgba(10,16,14,0) 20%, rgba(10,16,14,0) 50%, rgba(10,16,14,0.65) 100%)" }}
      />
    </AbsoluteFill>
  );
};

// hook: freezing on the ridge
const S1: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot n="s1" start={0} dur={4.3} zoom={[1.0, 1.12]} shake />
      <Title text={"Your warmest\njacket is why\nyou're cold"} t={t} t0={0} top={1060} size={112} />
    </>
  );
};

const S2: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot n="s2" start={0.2} dur={2.1} />
      <Chip text="One big puffy coat" icon="x" t={t} t0={0.25} x={80} y={1360} />
    </>
  );
};

const S3: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot n="s3" start={2.8} dur={2.1} />
      <Chip text="Sweat on the climb" icon="x" t={t} t0={0.2} x={80} y={1360} />
    </>
  );
};

const S3b: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot n="s1b" start={2.0} dur={2.7} zoom={[1.0, 1.05]} shake />
      <Chip text="Wind + wet shirt = cold" icon="x" t={t} t0={0.3} x={80} y={1360} />
    </>
  );
};

const S4: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot n="s4" start={0} dur={5.3} zoom={[1.0, 1.06]} rate={0.95} />
      <Chip text="Base · fleece · shell" icon="check" t={t} t0={0.6} x={80} y={1325} />
      <Chip text="Puffy in the pack for stops" icon="check" t={t} t0={2.6} x={80} y={1415} />
    </>
  );
};

const S5: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot n="s5" start={0} dur={2.4} zoom={[1.0, 1.05]} />
      <Chip text="Warm and dry" icon="check" t={t} t0={0.3} x={80} y={1360} />
    </>
  );
};

const End: React.FC = () => {
  const lt = useT();
  const pill = (txt: string, d: number) => (
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 36, letterSpacing: 1, color: C.forestDeep, background: C.stone, padding: "6px 20px", borderRadius: 10, textTransform: "uppercase", opacity: at(lt, [d, d + 0.3], [0, 1]) }}>{txt}</div>
  );
  const page = (src: string, x: number, rot: number, d: number, w: number) => (
    <div
      style={{
        position: "absolute", top: 200, left: x, width: w, height: w * 1.294, borderRadius: 10, overflow: "hidden",
        boxShadow: "0 24px 50px rgba(0,0,0,0.5)", rotate: `${rot}deg`,
        opacity: at(lt, [d, d + 0.35], [0, 1]), translate: `0px ${at(lt, [d, d + 0.8], [40, 0], outExpo)}px`,
      }}
    >
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse 90% 70% at 50% 35%, #3a5244 0%, ${C.forestDeep} 80%)` }}>
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 40, letterSpacing: 10, color: C.stone, opacity: at(lt, [0, 0.3], [0, 1]) }}>HIKESUPPLY CO.</div>
      {page("products/winter-layering-page.jpg", 530, 5, 0.35, 440)}
      {page("products/winter-guide-cover.jpg", 110, -4, 0.1, 470)}
      <div style={{ position: "absolute", top: 860, left: 80, right: 80, fontFamily: HEAD, fontWeight: 800, fontSize: 100, lineHeight: 0.92, color: C.stone, textTransform: "uppercase", opacity: at(lt, [0.5, 0.85], [0, 1]) }}>
        Winter Hiking
        <br />
        Guide
      </div>
      <div style={{ position: "absolute", top: 1070, left: 80, right: 80 }}>
        {["What to wear by temperature, °F and °C", "Traction, short daylight, cold warning signs", "Printable winter checklists"].map((s, i) => (
          <div key={s} style={{ fontFamily: SANS, fontWeight: 600, fontSize: 38, lineHeight: 1.45, color: C.stone, opacity: at(lt, [0.9 + i * 0.35, 1.2 + i * 0.35], [0, 1]) }}>{s}</div>
        ))}
      </div>
      <div style={{ position: "absolute", top: 1290, left: 80, right: 80, display: "flex", gap: 14, flexWrap: "wrap" }}>
        {pill("22 pages", 2.0)}
        {pill("US Letter · A4", 2.15)}
        {pill("Instant download", 2.3)}
      </div>
      <div style={{ position: "absolute", top: 1430, left: 80, right: 80, display: "flex", alignItems: "center", gap: 28, opacity: at(lt, [2.4, 2.7], [0, 1]) }}>
        <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 96, color: C.forestDeep, background: C.stone, padding: "2px 28px", borderRadius: 14 }}>$7.99</div>
      </div>
      <div style={{ position: "absolute", top: 1640, left: 0, right: 0, textAlign: "center", fontFamily: SANS, fontWeight: 600, fontSize: 48, color: C.stone, opacity: at(lt, [3.4, 3.8], [0, 1]) }}>hikesupplyco.com</div>
    </AbsoluteFill>
  );
};

export const A05: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={4.3} fadeIn={0} fadeOut={0.1}>
      <S1 />
    </Scene>
    <Scene from={4.25} to={6.3} fadeIn={0.08} fadeOut={0.1}>
      <S2 />
    </Scene>
    <Scene from={6.25} to={8.4} fadeIn={0.08} fadeOut={0.1}>
      <S3 />
    </Scene>
    <Scene from={8.35} to={11.0} fadeIn={0.08} fadeOut={0.12}>
      <S3b />
    </Scene>
    <Scene from={10.95} to={16.3} fadeIn={0.1} fadeOut={0.12}>
      <S4 />
    </Scene>
    <Scene from={16.25} to={18.65} fadeIn={0.1} fadeOut={0.15}>
      <S5 />
    </Scene>
    <Scene from={18.6} to={25.6} fadeOut={0}>
      <End />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.25, 4.25, 1520],
        [4.25, 6.25, 1520],
        [6.25, 8.35, 1520],
        [8.35, 10.95, 1520],
        [10.95, 16.25, 1520],
        [16.25, 18.6, 1520],
      ]}
    />
  </AbsoluteFill>
);
