// R03: real-footage test format v2 (each clip once, white captions, 21 s) (Vasil 2026-11-16). "Loose rock under your feet?" Short format, 16 s, 43 words.
// Footage: Vasil's free scenic clips (Pexels/Mixkit, commercial license) from Downloads\HikeSupply scenic.
// Advice (conservative): on scree take short steps, weight over your feet, soft knees; never walk directly below another hiker; poles add contact points.
// End card: Telescoping Trekking Pole, $19.99 (live Shopify, 2026-11-16), cut-out photo.
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { at } from "../lib";
import { Captions, Word } from "../Type";
import { EndCard, Scene, Title, useT } from "../kit";
import vo from "../vo/r03.json";

const words = vo.words as unknown as Word[];

const TopScrim: React.FC<{ h?: number }> = ({ h = 620 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h, background: "linear-gradient(180deg, rgba(10,16,20,0.55) 0%, rgba(10,16,20,0.25) 60%, rgba(10,16,20,0) 100%)" }} />
);
const LowScrim: React.FC<{ top?: number; a?: number }> = ({ top = 1380, a = 0.45 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, height: 420, background: `linear-gradient(180deg, rgba(10,16,20,0) 0%, rgba(10,16,20,${a}) 40%, rgba(10,16,20,${a}) 72%, rgba(10,16,20,0) 100%)` }} />
);

// One real clip, with a slow push-in (zoom from z0 to z1 around an anchor point).
const Clip: React.FC<{ src: string; dur: number; z0?: number; z1?: number; ox?: string; oy?: string }> = ({ src, dur, z0 = 1, z1 = 1.08, ox = "50%", oy = "50%" }) => {
  const t = useT();
  const z = at(t, [0, dur], [z0, z1]);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${z})`, transformOrigin: `${ox} ${oy}` }}>
        <OffthreadVideo src={staticFile(src)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const S1: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Clip src="scenic/r03-a.mp4" dur={2.7} z0={1.05} z1={1.14} ox="30%" oy="85%" />
      <TopScrim />
      <LowScrim top={930} a={0.62} />
      <Title text={"Loose rock\nunder your feet?"} t={t} t0={0} top={150} size={128} />
    </AbsoluteFill>
  );
};

const S4: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/folding-trekking-pole-cut.png"
      cutoutH={800}
      spec="TUNGSTEN STEEL TIP · SOLD SINGLE"
      name={
        <>
          Telescoping
          <br />
          Trekking Pole
        </>
      }
      nameSize={100}
      price="$19.99"
      save="Save this before your next climb"
    />
  );
};

export const R03: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={2.65} fadeIn={0} fadeOut={0.08}>
      <S1 />
    </Scene>
    <Scene from={2.6} to={6.15} fadeIn={0.06} fadeOut={0.08}>
      <Clip src="scenic/r03-b.mp4" dur={3.6} z0={1.0} z1={1.06} />
      <LowScrim top={930} a={0.62} />
    </Scene>
    <Scene from={6.1} to={7.85} fadeIn={0.06} fadeOut={0.08}>
      <Clip src="scenic/r03-c.mp4" dur={1.8} z0={1.0} z1={1.05} />
      <LowScrim top={930} a={0.62} />
    </Scene>
    <Scene from={7.8} to={9.65} fadeIn={0.06} fadeOut={0.08}>
      <Clip src="scenic/r03-d.mp4" dur={1.9} z0={1.15} z1={1.25} ox="22%" oy="62%" />
      <LowScrim top={930} a={0.62} />
    </Scene>
    <Scene from={9.6} to={13.95} fadeIn={0.06} fadeOut={0.08}>
      <Clip src="scenic/r03-e.mp4" dur={4.4} z0={1.0} z1={1.08} />
      <LowScrim top={930} a={0.62} />
    </Scene>
    <Scene from={13.9} to={16.75} fadeIn={0.06} fadeOut={0.12}>
      <Clip src="scenic/r03-f.mp4" dur={2.8} z0={1.0} z1={1.06} />
      <LowScrim top={930} a={0.62} />
    </Scene>
    <Scene from={16.7} to={21.0} fadeOut={0}>
      <S4 />
    </Scene>
    <Captions
      words={words}
      accent="#fff"
      windows={[
        [0.3, 2.6, 1150],
        [2.6, 6.1, 1150],
        [6.1, 7.8, 1150],
        [7.8, 9.6, 1150],
        [9.6, 13.9, 1150],
        [13.9, 16.7, 1150],
      ]}
    />
  </AbsoluteFill>
);
