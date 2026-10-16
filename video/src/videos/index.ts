import React from "react";
import { V01 } from "./V01";
import { V16 } from "./V16";
import { V17 } from "./V17";
import { V18 } from "./V18";

// Every video in the series. Add one line per new video: id must match the file name (V02 -> videos/V02.tsx).
export const VIDEOS: { id: string; component: React.FC; seconds: number }[] = [
  { id: "V01", component: V01, seconds: 30 },
  { id: "V16", component: V16, seconds: 30 },
  { id: "V17", component: V17, seconds: 30 },
  { id: "V18", component: V18, seconds: 30 },
];
