// node stills.mjs <ID> <outdir> f1 f2 ...  (bundles once, renders many stills)
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "path";
const [id, out, ...frames] = process.argv.slice(2);
const browserExecutable = process.env.CHROME_EXE;
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const comp = await selectComposition({ serveUrl, id, inputProps: {}, browserExecutable });
for (const f of frames) {
  await renderStill({ composition: comp, serveUrl, output: `${out}/${id.toLowerCase()}_${f}.png`, frame: Number(f), inputProps: {}, browserExecutable });
  console.log("still", f);
}
