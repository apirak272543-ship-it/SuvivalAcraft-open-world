import { describe, it, expect } from "vitest";
import { canBreak, breakBlock, isSoil } from "../game/src/blocks/blocks.js";
import { Rng } from "../game/src/core/rng.js";

describe("Blocks", () => {
  it("stone requires pickaxe", () => {
    expect(canBreak("stone", undefined)).toBe(false);
    expect(canBreak("stone", "pickaxe", 1)).toBe(true);
  });

  it("iron ore requires pickaxe level 2", () => {
    expect(canBreak("iron_ore", "pickaxe", 1)).toBe(false);
    expect(canBreak("iron_ore", "pickaxe", 2)).toBe(true);
  });

  it("leaves break by hand", () => {
    expect(canBreak("leaves")).toBe(true);
  });

  it("breaks block and returns drops", () => {
    const drops = breakBlock("wood_log", new Rng(1), "axe", 1);
    expect(drops.length).toBeGreaterThan(0);
    expect(drops[0]?.item).toBe("wood");
  });

  it("identifies soil blocks", () => {
    expect(isSoil("grass")).toBe(true);
    expect(isSoil("stone")).toBe(false);
  });
});
