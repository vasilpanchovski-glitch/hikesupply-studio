// node stills.mjs <ID> <outdir> <frame,frame,...>  (one bundle, many stills, low memory)
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "path";
const [id, out, frames] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const browserExecutable = process.env.EXE;
const comp = await selectComposition({ serveUrl, id, browserExecutable });
for (const f of frames.split(",").map(Number)) {
  await renderStill({ serveUrl, composition: comp, frame: f, output: `${out}/${id}_${f}.png`, scale: 0.4, browserExecutable });
  console.log("ok", f);
}
