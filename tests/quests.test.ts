import { describe, it, expect } from "vitest";
import { createQuestQueue, progressQuests } from "../game/src/quests/quests.js";
import { createStats } from "../game/src/player/stats.js";

describe("Quests", () => {
  it("progresses gather quest to completion", () => {
    const queue = createQuestQueue(["gather_wood"]); // need 5 wood
    const stats = createStats();
    let q = progressQuests(queue, "gather", "wood", 3, stats);
    expect(q.queue[0]?.complete).toBe(false);
    expect(q.queue[0]?.progress).toBe(3);
    q = progressQuests(q.queue, "gather", "wood", 2, stats);
    expect(q.queue[0]?.complete).toBe(true);
    expect(stats.xp).toBeGreaterThan(0);
  });

  it("ignores unrelated objectives", () => {
    const queue = createQuestQueue(["gather_wood"]);
    const q = progressQuests(queue, "kill", "slime", 1, createStats());
    expect(q.queue[0]?.progress).toBe(0);
    expect(q.updates.length).toBe(0);
  });
});
