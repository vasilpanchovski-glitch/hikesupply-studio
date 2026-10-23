// R01: first "real footage" video. Free Pexels clips (video/public/footage, not in git) + our voice, captions, chips and end card.
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { at } from "../lib";
import { Captions, Word } from "../Type";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import vo from "../vo/r01.json";

const words = vo.words as unknown as Word[];

// One footage shot: slow push-in, light grade, dark gradient top (for the headline) and bottom (for captions).
const Shot: React.FC<{ src: string; zoom?: [number, number]; dur: number; topDark?: number }> = ({ src, zoom = [1.04, 1.12], dur, topDark = 0.45 }) => {
  const t = useT();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <OffthreadVideo
        src={staticFile(`footage/${src}.mp4`)}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover", scale: `${at(t, [0, dur], zoom)}`, filter: "saturate(1.05) contrast(1.04)" }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(10,16,14,${topDark}) 0%, rgba(10,16,14,0) 34%, rgba(10,16,14,0) 58%, rgba(10,16,14,0.55) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

const S1: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot src="hook" dur={4} topDark={0.6} />
      <Title text={"Why you freeze\nat the top"} t={t} t0={0} top={210} size={138} />
    </>
  );
};

const S2: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot src="climb" dur={2.6} />
      <Chip text="Warm jacket on the climb" icon="x" t={t} t0={0.5} x={80} y={300} />
      <Chip text="Shirt soaked with sweat" icon="x" t={t} t0={1.4} x={80} y={400} />
    </>
  );
};

const S3: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot src="ridge" dur={4.8} zoom={[1.02, 1.1]} />
      <Chip text="Wind at the summit" t={t} t0={0.9} x={80} y={300} />
      <Chip text="Wet layer + wind = cold" icon="x" t={t} t0={2.4} x={80} y={400} big />
    </>
  );
};

const S4a: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot src="layers" dur={2.7} />
      <Title text="The fix: layers" t={t} t0={0.05} top={210} size={120} />
      <Chip text="Start a little cool" icon="check" t={t} t0={0.9} x={80} y={360} />
    </>
  );
};

const S4b: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot src="poles" dur={2.7} />
      <Chip text="Warm layer off" icon="check" t={t} t0={0.2} x={80} y={300} />
      <Chip text="before you climb" t={t} t0={0.5} x={80} y={400} />
    </>
  );
};

const S5: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot src="fleece" dur={3.4} />
      <Chip text="Fleece in your pack" icon="check" t={t} t0={0.3} x={80} y={300} />
      <Chip text="On the moment you stop" icon="check" t={t} t0={1.2} x={80} y={400} />
    </>
  );
};

const S6: React.FC = () => {
  const t = useT();
  return (
    <>
      <Shot src="payoff" dur={2.5} zoom={[1.0, 1.06]} />
      <Chip text="Dry up · warm on top" icon="check" t={t} t0={0.3} x={80} y={300} big />
    </>
  );
};

const S7: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      photo="products/polar-fleece-soft-shell-jacket-mens-card.jpg"
      spec="320G FLEECE · WINDPROOF FACE · S TO 3XL"
      name={
        <>
          Polar Fleece
          <br />
          Jacket
        </>
      }
      nameSize={104}
      price="$39.99"
      save="Save this before your next cold hike"
    />
  );
};

export const R01: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Scene from={0} to={3.9} fadeIn={0} fadeOut={0.15}>
      <S1 />
    </Scene>
    <Scene from={3.85} to={6.45} fadeIn={0.12} fadeOut={0.15}>
      <S2 />
    </Scene>
    <Scene from={6.4} to={11.2} fadeIn={0.12} fadeOut={0.15}>
      <S3 />
    </Scene>
    <Scene from={11.15} to={13.85} fadeIn={0.12} fadeOut={0.15}>
      <S4a />
    </Scene>
    <Scene from={13.8} to={16.5} fadeIn={0.12} fadeOut={0.15}>
      <S4b />
    </Scene>
    <Scene from={16.45} to={19.8} fadeIn={0.12} fadeOut={0.15}>
      <S5 />
    </Scene>
    <Scene from={19.75} to={22.15} fadeIn={0.12} fadeOut={0.15}>
      <S6 />
    </Scene>
    <Scene from={22.1} to={30} fadeOut={0}>
      <S7 />
    </Scene>
    <Captions
      words={words}
      windows={[
        [0.3, 3.85, 1500],
        [3.85, 6.4, 1500],
        [6.4, 11.15, 1500],
        [11.15, 13.8, 1500],
        [13.8, 16.45, 1500],
        [16.45, 19.75, 1500],
        [19.75, 22.1, 1500],
      ]}
    />
  </AbsoluteFill>
);
