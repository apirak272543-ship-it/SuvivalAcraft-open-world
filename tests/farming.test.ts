import { describe, it, expect } from "vitest";
import { Farm } from "../game/src/farming/farming.js";
import { Rng } from "../game/src/core/rng.js";

describe("Farming", () => {
  it("rejects planting on incompatible soil", () => {
    const farm = new Farm();
    expect(farm.plant("p1", "wheat_seed", "sand", 0)).toBe(false);
    expect(Object.keys(farm.state.plots).length).toBe(0);
  });

  it("plants and matures wheat over time", () => {
    const farm = new Farm();
    expect(farm.plant("p1", "wheat_seed", "dirt", 0)).toBe(true);
    expect(farm.isMature("p1")).toBe(false);
    // 3 stages * 120 ticks
    const ready = farm.tick(400);
    expect(ready).toContain("p1");
    expect(farm.isMature("p1")).toBe(true);
  });

  it("harvests mature crop", () => {
    const farm = new Farm();
    farm.plant("p1", "wheat_seed", "dirt", 0);
    farm.tick(400);
    const rng = new Rng(5);
    const drops = farm.harvest("p1", rng);
    expect(drops).not.toBeNull();
    expect(drops?.[0]?.item).toBe("wheat");
    expect(farm.isMature("p1")).toBe(false);
  });
});
