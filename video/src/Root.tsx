import { Composition, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";
import { VIDEOS } from "./videos";

loadFont({ family: "Barlow Condensed", url: staticFile("BarlowCondensed-SemiBold.ttf"), weight: "600" });
loadFont({ family: "Barlow Condensed", url: staticFile("BarlowCondensed-Bold.ttf"), weight: "700" });
loadFont({ family: "Barlow Condensed", url: staticFile("BarlowCondensed-ExtraBold.ttf"), weight: "800" });
loadFont({ family: "Inter", url: staticFile("Inter.ttf"), weight: "100 900" });
loadFont({ family: "Fraunces", url: staticFile("Fraunces.ttf"), weight: "100 900" });

export const RemotionRoot: React.FC = () => (
  <>
    {VIDEOS.map((v) => (
      <Composition key={v.id} id={v.id} component={v.component} durationInFrames={Math.round(v.seconds * 30)} fps={30} width={1080} height={1920} />
    ))}
  </>
);
