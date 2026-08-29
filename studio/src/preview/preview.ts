import type { World } from "../../../game/src/world/world.js";
import type { Vec2 } from "../../../shared/types/world.js";

const CHARS: Record<string, string> = {
  air: " ",
  water: "~",
  grass: ".",
  dirt: ",",
  sand: ".",
  stone: "#",
  cobblestone: "#",
  iron_ore: "%",
  coal_ore: "@",
  wood_log: "T",
  leaves: "&",
  wood_planks: "=",
  glass: "o",
  torch: "*",
  wheat_crop_0: ";",
  wheat_crop_1: "s",
  wheat_crop_2: "S",
  cobblestone_block: "#",
};

export function charFor(block: string): string {
  return CHARS[block] ?? "?";
}

/** Render a square region of the world as ASCII lines. */
export function renderPreview(world: World, topLeft: Vec2, size: Vec2): string[] {
  const lines: string[] = [];
  for (let y = 0; y < size.y; y++) {
    let line = "";
    for (let x = 0; x < size.x; x++) {
      const block = world.blockAt(topLeft.x + x, topLeft.y + y);
      line += charFor(block);
    }
    lines.push(line);
  }
  return lines;
}
