// V83M: "Twenty tabs and still no plan", realistic remake of V83 with six Higgsfield clips (Kling 3.0 Pro, saved
// "HikeSupply Creator" character, named Maddie in the voiceover). Frame 3 shows the real Trip Planning Guide cover and
// frame 5 the real Alum Cave page from the route guide. Clips in video/public/footage/v83m_s*.mp4 (not in git).
// Same music, sfx and timing as V83; voice re-recorded with "Maddie". End card = Great Smoky Mountains Trip Pack, $19.99.
import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile } from "remotion";
import { at, FPS } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import vo from "../vo/v83m.json";

const words = vo.words as unknown as Word[];

const Shot: React.FC<{ n: number; start?: number; rate?: number; dur: number; zoom?: [number, number]; topDark?: number }> = ({ n, start = 0, rate = 1, dur, zoom = [1.0, 1.05], topDark = 0.4 }) => {
  const t = useT();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <OffthreadVideo src={staticFile(`footage/v83m_s${n}.mp4`)} startFrom={Math.round(start * FPS)} playbackRate={rate} muted
        style={{ width: "100%", height: "100%", objectFit: "cover", scale: `${at(t, [0, dur], zoom)}` }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(10,16,14,${topDark * 0.5}) 0%, rgba(10,16,14,0) 24%, rgba(10,16,14,0) 55%, rgba(10,16,14,0.6) 100%)` }} />
    </AbsoluteFill>
  );
};

const S1: React.FC = () => { const t = useT(); return (<><Shot n={1} rate={0.93} dur={5.45} topDark={0.8} /><Title text={"Planning a\nSmokies hike?\nDon't do this"} t={t} t0={0} t1={2.9} top={140} size={130} /><Img src={staticFile("smokies-sign.jpg")} style={{ position: "absolute", left: 56, top: 590, width: 380, border: "8px solid #fff", borderRadius: 6, boxShadow: "0 14px 30px rgba(0,0,0,0.55)", transform: `rotate(-3deg) scale(${Math.min(1, 0.85 + t * 1.5)})`, opacity: Math.min(1, t * 6) }} /></>); };
const S2: React.FC = () => { const t = useT(); return (<><Shot n={2} dur={5.05} /><Chip text="Three nights in" t={t} t0={0.2} x={80} y={200} icon="x" big /><Chip text="Still no plan" t={t} t0={1.2} x={80} y={330} icon="x" big /></>); };
const S3: React.FC = () => { const t = useT(); return (<><Shot n={3} dur={4.3} /><Chip text="Smokies Trip Pack" t={t} t0={0.1} x={80} y={200} icon="check" big /></>); };
const S4: React.FC = () => { const t = useT(); return (<><Shot n={4} start={0} dur={2.7} zoom={[1.0, 1.03]} /><Chip text="Seasons and road openings" t={t} t0={0.15} x={60} y={200} icon="check" /><Chip text="Where to stay" t={t} t0={1.75} x={60} y={320} icon="check" /></>); };
const S5: React.FC = () => { const t = useT(); return (<><Shot n={5} rate={0.93} dur={5.4} zoom={[1.0, 1.04]} /><Chip text="10 day hikes as GPX files" t={t} t0={0.2} x={60} y={170} icon="check" big /></>); };
const S6: React.FC = () => { const t = useT(); return (<><Shot n={6} start={1.6} dur={2.4} zoom={[1.02, 1.07]} /><Chip text="First trail picked in 10 minutes" t={t} t0={0.25} x={60} y={200} icon="check" /></>); };
const S9: React.FC = () => {
  const lt = useT();
  return <EndCard lt={lt} photo="products/great-smoky-mountains-trip-pack.jpg" photoH={720} spec="PLANNING GUIDE + 10 GPX DAY HIKES" name={<>Smokies<br />Trip Pack</>} nameSize={108} price="$19.99" save="Save this before you plan your trip" />;
};

export const V83M: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={5.45} fadeIn={0} fadeOut={0.08}><S1 /></Scene>
    <Scene from={5.4} to={10.45} fadeIn={0.08} fadeOut={0.08}><S2 /></Scene>
    <Scene from={10.4} to={14.7} fadeIn={0.08} fadeOut={0.08}><S3 /></Scene>
    <Scene from={14.65} to={17.35} fadeIn={0.08} fadeOut={0.08}><S4 /></Scene>
    <Scene from={17.3} to={22.7} fadeIn={0.08} fadeOut={0.1}><S5 /></Scene>
    <Scene from={22.65} to={25.05} fadeIn={0.12} fadeOut={0.12}><S6 /></Scene>
    <Scene from={25.0} to={29.5} fadeOut={0}><S9 /></Scene>
    <Captions words={words} windows={[[0.3, 2.9, 1560], [2.9, 5.4, 1560], [5.4, 7.8, 1560], [7.8, 10.4, 1560], [10.4, 14.65, 1560], [14.65, 17.3, 1560], [17.3, 22.65, 1560], [22.65, 25.0, 1560]]} />
  </AbsoluteFill>
);
