import type { CropDef } from "../types/content.js";

export const CROPS: Record<string, CropDef> = {
  wheat: {
    id: "wheat",
    name: "ข้าวสาลี",
    seedItem: "wheat_seed",
    soilGroups: ["dirt", "grass"],
    stages: [
      { durationTicks: 120, block: "wheat_crop_0" },
      { durationTicks: 120, block: "wheat_crop_1" },
      { durationTicks: 120, block: "wheat_crop_2" },
    ],
    harvest: { item: "wheat", min: 1, max: 3 },
  },
};

export function cropBySeed(seedItem: string): CropDef | undefined {
  return Object.values(CROPS).find((c) => c.seedItem === seedItem);
}
