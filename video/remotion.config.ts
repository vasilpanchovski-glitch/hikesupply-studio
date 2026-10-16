import { Config } from "@remotion/cli/config";
import fs from "fs";

// Use the preinstalled headless Chromium when the cloud machine has one; otherwise Remotion downloads its own.
const local = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
if (fs.existsSync(local)) Config.setBrowserExecutable(local);
Config.setVideoImageFormat("jpeg");
