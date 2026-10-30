import { R01 } from "./R01";
import { C01 } from "./C01";
import { V68 } from "./V68";
import { V63 } from "./V63";
import { V64 } from "./V64";
import { V65 } from "./V65";
import { V66 } from "./V66";
import { V67 } from "./V67";
import { V69 } from "./V69";
import { V70 } from "./V70";
import { V71 } from "./V71";
import { V72 } from "./V72";
import { X01 } from "./X01";
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
import { V28 } from "./V28";
import { V29 } from "./V29";
import { V30 } from "./V30";
import { V31 } from "./V31";
import { V32 } from "./V32";
import { V33 } from "./V33";
import { V34 } from "./V34";
import { V35 } from "./V35";
import { V36 } from "./V36";
import { V37 } from "./V37";
import { V38 } from "./V38";
import { V39 } from "./V39";
import { V40 } from "./V40";
import { V41 } from "./V41";
import { V42 } from "./V42";
import { V43 } from "./V43";
import { V44 } from "./V44";
import { V45 } from "./V45";
import { V46 } from "./V46";
import { V47 } from "./V47";
import { V48 } from "./V48";
import { V49 } from "./V49";
import { V50 } from "./V50";
import { V51 } from "./V51";
import { V52 } from "./V52";
import { V53 } from "./V53";
import { V54 } from "./V54";
import { V28B } from "./V28B";
import { V29B } from "./V29B";
import { V30B } from "./V30B";
import { V31B } from "./V31B";
import { V32B } from "./V32B";
import { V33B } from "./V33B";
import { V34B } from "./V34B";
import { V35B } from "./V35B";
import { V36B } from "./V36B";
import { V37B } from "./V37B";
import { V38B } from "./V38B";
import { V39B } from "./V39B";
import { V40B } from "./V40B";
import { V41B } from "./V41B";
import { V42B } from "./V42B";
import { V43B } from "./V43B";
import { V44B } from "./V44B";
import { V45B } from "./V45B";
import { V46B } from "./V46B";
import { V47B } from "./V47B";
import { V48B } from "./V48B";
import { V49B } from "./V49B";
import { V50B } from "./V50B";
import { V51B } from "./V51B";
import { V52B } from "./V52B";
import { V53B } from "./V53B";
import { V55 } from "./V55";
import { V56 } from "./V56";
import { V57 } from "./V57";
import { V58 } from "./V58";
import { V61 } from "./V61";
import { V59 } from "./V59";
import { V60 } from "./V60";
import { V62 } from "./V62";
import { A04 } from "./A04";

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
  { id: "V28", component: V28, seconds: 30 },
  { id: "V29", component: V29, seconds: 30 },
  { id: "V30", component: V30, seconds: 30 },
  { id: "V31", component: V31, seconds: 30 },
  { id: "V32", component: V32, seconds: 30 },
  { id: "V33", component: V33, seconds: 30 },
  { id: "V34", component: V34, seconds: 30 },
  { id: "V35", component: V35, seconds: 30 },
  { id: "V36", component: V36, seconds: 30 },
  { id: "V37", component: V37, seconds: 30 },
  { id: "V38", component: V38, seconds: 30 },
  { id: "V39", component: V39, seconds: 30 },
  { id: "V40", component: V40, seconds: 30 },
  { id: "V41", component: V41, seconds: 30 },
  { id: "V42", component: V42, seconds: 30 },
  { id: "V43", component: V43, seconds: 30 },
  { id: "V44", component: V44, seconds: 30 },
  { id: "V45", component: V45, seconds: 30 },
  { id: "V46", component: V46, seconds: 30 },
  { id: "V47", component: V47, seconds: 30 },
  { id: "V48", component: V48, seconds: 30 },
  { id: "V49", component: V49, seconds: 30 },
  { id: "V50", component: V50, seconds: 30 },
  { id: "V51", component: V51, seconds: 30 },
  { id: "V52", component: V52, seconds: 30 },
  { id: "V53", component: V53, seconds: 30 },
  { id: "V54", component: V54, seconds: 30 },
  { id: "X01", component: X01, seconds: 30 },
  { id: "R01", component: R01, seconds: 30 },
  { id: "C01", component: C01, seconds: 27.5 },
  { id: "V68", component: V68, seconds: 26.5 },
  { id: "V63", component: V63, seconds: 28 },
  { id: "V64", component: V64, seconds: 27 },
  { id: "V65", component: V65, seconds: 27.3 },
  { id: "V66", component: V66, seconds: 27.5 },
  { id: "V67", component: V67, seconds: 27 },
  { id: "V69", component: V69, seconds: 27.5 },
  { id: "V70", component: V70, seconds: 28.5 },
  { id: "V71", component: V71, seconds: 27 },
  { id: "V72", component: V72, seconds: 28.5 },
  { id: "V28B", component: V28B, seconds: 28.5 },
  { id: "V29B", component: V29B, seconds: 27 },
  { id: "V30B", component: V30B, seconds: 27 },
  { id: "V31B", component: V31B, seconds: 30 },
  { id: "V32B", component: V32B, seconds: 27.5 },
  { id: "V33B", component: V33B, seconds: 30 },
  { id: "V34B", component: V34B, seconds: 30 },
  { id: "V35B", component: V35B, seconds: 30 },
  { id: "V36B", component: V36B, seconds: 27.5 },
  { id: "V37B", component: V37B, seconds: 29 },
  { id: "V38B", component: V38B, seconds: 27 },
  { id: "V39B", component: V39B, seconds: 29.4 },
  { id: "V40B", component: V40B, seconds: 27.5 },
  { id: "V41B", component: V41B, seconds: 27.3 },
  { id: "V42B", component: V42B, seconds: 29.2 },
  { id: "V43B", component: V43B, seconds: 30 },
  { id: "V44B", component: V44B, seconds: 27.5 },
  { id: "V45B", component: V45B, seconds: 27.5 },
  { id: "V46B", component: V46B, seconds: 29 },
  { id: "V47B", component: V47B, seconds: 28 },
  { id: "V48B", component: V48B, seconds: 28 },
  { id: "V49B", component: V49B, seconds: 28 },
  { id: "V50B", component: V50B, seconds: 28 },
  { id: "V51B", component: V51B, seconds: 29 },
  { id: "V52B", component: V52B, seconds: 27.5 },
  { id: "V53B", component: V53B, seconds: 27.5 },
  { id: "V55", component: V55, seconds: 27.5 },
  { id: "V56", component: V56, seconds: 27 },
  { id: "V57", component: V57, seconds: 27.5 },
  { id: "V58", component: V58, seconds: 28.5 },
  { id: "V61", component: V61, seconds: 29 },
  { id: "V59", component: V59, seconds: 27 },
  { id: "V60", component: V60, seconds: 28.5 },
  { id: "V62", component: V62, seconds: 27.5 },
  { id: "A04", component: A04, seconds: 22.5 },
];
