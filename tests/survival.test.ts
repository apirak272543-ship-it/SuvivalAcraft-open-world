import { describe, it, expect } from "vitest";
import { createStats } from "../game/src/player/stats.js";
import { applySurvivalTick, isStarving } from "../game/src/survival/survival.js";

describe("Survival", () => {
  it("drains hunger and thirst over time", () => {
    const stats = createStats();
    const r = applySurvivalTick(stats, 10);
    expect(stats.hunger).toBeLessThan(stats.maxHunger);
    expect(stats.thirst).toBeLessThan(stats.maxThirst);
    expect(r.drained).toBe(false);
  });

  it("deals starvation damage", () => {
    const stats = createStats({ hunger: 0, thirst: 10 });
    applySurvivalTick(stats, 2);
    expect(stats.hp).toBeLessThan(stats.maxHp);
    expect(isStarving(stats)).toBe(true);
  });

  it("regenerates when hunger is high", () => {
    const stats = createStats({ hp: 10, hunger: 19, thirst: 19 });
    const r = applySurvivalTick(stats, 1);
    expect(r.regen).toBe(true);
    expect(stats.hp).toBeGreaterThan(10);
  });
});
