import type { Blueprint } from "../../../shared/types/state.js";

export function generateHouseBlueprint(id = "house_basic"): Blueprint {
  return {
    id,
    name: "บ้านไม้พื้นฐาน",
    size: { w: 7, h: 7 },
    layers: [
      {
        name: "พื้น",
        rows: [
          "XXXXXXX",
          "X.....X",
          "X.....X",
          "X.....X",
          "X.....X",
          "X.....X",
          "XXXXXXX",
        ],
      },
      {
        name: "ผนัง",
        rows: [
          "XXXXXXX",
          "X..D..X",
          "X.....X",
          "X.....X",
          "X.....X",
          "X.....X",
          "XXXXXXX",
        ],
      },
    ],
  };
}

export function generateCampfireBlueprint(id = "campfire"): Blueprint {
  return {
    id,
    name: "แคมป์ไฟ",
    size: { w: 3, h: 3 },
    layers: [
      {
        name: "พื้น",
        rows: ["...", ".F.", "..."],
      },
    ],
  };
}
