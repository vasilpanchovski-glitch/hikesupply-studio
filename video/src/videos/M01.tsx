// M01: "Why pay $20 for one pair of socks?" Merino Wool Hiking Socks. Seven realistic Kling 3.0 clips
// (HikeSupply Creator Soul character + the real Black/Grey sock as reference), clip sound kept, real cutout end card.
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { at } from "../lib";
import { Chip, EndCard, Scene, Title, useT } from "../kit";
import cut from "../vo/m01_cuts.json";

const D = cut.d as number[]; // clip lengths in seconds, shots 1-7
const S = D.reduce<number[]>((a, d, i) => [...a, (a[i] ?? 0) + d], [0]); // start of each shot
export const M01_END = S[7];
export const M01_LEN = S[7] + 4.2;

const Clip: React.FC<{ n: number }> = ({ n }) => {
  const t = useT();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <OffthreadVideo src={staticFile(`footage/m01_s${n}.mp4`)} muted style={{ width: "100%", height: "100%", objectFit: "cover", scale: `${at(t, [0, D[n - 1]], [1.0, 1.035])}` }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(8,12,10,0.45) 0%, rgba(8,12,10,0) 30%, rgba(8,12,10,0) 62%, rgba(8,12,10,0.4) 100%)" }} />
    </AbsoluteFill>
  );
};

const Shot: React.FC<{ n: number; children?: React.ReactNode }> = ({ n, children }) => (
  <Scene from={S[n - 1]} to={S[n]} fadeIn={0} fadeOut={0}>
    <Clip n={n} />
    {children}
  </Scene>
);

const T: React.FC<{ text: string; size?: number; t0?: number }> = ({ text, size = 104, t0 = 0.05 }) => {
  const t = useT();
  return <Title text={text} t={t} t0={t0} top={190} size={size} />;
};
const P: React.FC<{ text: string; t0: number; y?: number; t1?: number }> = ({ text, t0, y = 1430, t1 }) => {
  const t = useT();
  return <Chip text={text} t={t} t0={t0} t1={t1} x={80} y={y} big />;
};

const End: React.FC = () => {
  const lt = useT();
  return (
    <EndCard
      lt={lt}
      cutout="products/merino-socks-blackgrey-cut.png"
      cutoutH={780}
      spec="80% MERINO · CUSHIONED CREW · FREE SHIPPING"
      name={<>Merino<br />Hiking Socks</>}
      nameSize={104}
      price="$19.99"
      save="Pick your color: link in bio"
    />
  );
};

export const M01: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Shot n={1}>
      <T text={"$20.\nFor ONE pair\nof socks."} size={124} t0={0} />
      <P text="Hikers keep buying them" t0={1.2} />
      <P text="Here's why" t0={2.0} y={1550} />
    </Shot>
    <Shot n={2}>
      <T text={"Reason 1:\nNo itch"} />
      <P text="It starts as merino fleece" t0={0.4} />
    </Shot>
    <Shot n={3}>
      <T text={"Reason 1:\nNo itch"} t0={0} />
      <P text="Fine fiber, soft on skin" t0={0.3} />
    </Shot>
    <Shot n={4}>
      <T text={"Reason 2:\nDay 2, no smell"} />
      <P text="Naturally odor-resistant" t0={0.8} />
      <P text="Wear them again tomorrow" t0={1.9} y={1550} />
    </Shot>
    <Shot n={5}>
      <T text={"Reason 3:\nWarm when wet"} />
      <P text="Merino stays warm when damp" t0={0.5} />
    </Shot>
    <Shot n={6}>
      <T text={"Reason 3:\nWarm when wet"} t0={0} />
      <P text="Cotton doesn't" t0={0.3} />
    </Shot>
    <Shot n={7}>
      <T text={"Cheap socks\ncost you\nthe hike."} size={118} />
    </Shot>
    <Scene from={M01_END - 0.05} to={M01_LEN} fadeIn={0.2} fadeOut={0}>
      <End />
    </Scene>
  </AbsoluteFill>
);
