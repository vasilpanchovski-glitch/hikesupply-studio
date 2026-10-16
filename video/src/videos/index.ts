import React from "react";
import { V01 } from "./V01";

// Every video in the series. Add one line per new video: id must match the file name (V02 -> videos/V02.tsx).
export const VIDEOS: { id: string; component: React.FC; seconds: number }[] = [
  { id: "V01", component: V01, seconds: 30 },
];
