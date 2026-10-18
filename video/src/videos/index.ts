import React from "react";
import { V01 } from "./V01";
import { V16 } from "./V16";
import { V17 } from "./V17";
import { V18 } from "./V18";
import { V19 } from "./V19";
import { V20 } from "./V20";
import { V21 } from "./V21";
import { V22 } from "./V22";
import { V23 } from "./V23";
import { V24 } from "./V24";
import { V25 } from "./V25";
import { V26 } from "./V26";
import { V27 } from "./V27";

// Every video in the series. Add one line per new video: id must match the file name (V02 -> videos/V02.tsx).
export const VIDEOS: { id: string; component: React.FC; seconds: number }[] = [
  { id: "V01", component: V01, seconds: 30 },
  { id: "V16", component: V16, seconds: 30 },
  { id: "V17", component: V17, seconds: 30 },
  { id: "V18", component: V18, seconds: 30 },
  { id: "V19", component: V19, seconds: 30 },
  { id: "V20", component: V20, seconds: 30 },
  { id: "V21", component: V21, seconds: 30 },
  { id: "V22", component: V22, seconds: 30 },
  { id: "V23", component: V23, seconds: 30 },
  { id: "V24", component: V24, seconds: 30 },
  { id: "V25", component: V25, seconds: 30 },
  { id: "V26", component: V26, seconds: 30 },
  { id: "V27", component: V27, seconds: 30 },
];
