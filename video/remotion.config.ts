import { Config } from "@remotion/cli/config";
import fs from "fs";
import path from "path";

// Use the preinstalled headless Chromium when the cloud machine has one; otherwise Remotion downloads its own.
// The folder version changes between machines, so look for any chromium_headless_shell-* folder.
const findLocal = (): string | null => {
  const base = "/opt/pw-browsers";
  if (!fs.existsSync(base)) return null;
  for (const d of fs.readdirSync(base).filter((n) => n.startsWith("chromium_headless_shell-")).sort().reverse()) {
    for (const sub of ["chrome-linux", "chrome-headless-shell-linux64"]) {
      for (const exe of ["headless_shell", "chrome-headless-shell"]) {
        const p = path.join(base, d, sub, exe);
        if (fs.existsSync(p)) return p;
      }
    }
  }
  return null;
};
const local = findLocal();
if (local) Config.setBrowserExecutable(local);
Config.setVideoImageFormat("jpeg");
