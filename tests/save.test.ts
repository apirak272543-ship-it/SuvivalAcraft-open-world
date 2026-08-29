import { describe, it, expect } from "vitest";
import { Inventory } from "../game/src/inventory/inventory.js";
import { createSnapshot, serialize, deserialize } from "../game/src/save/save.js";
import { createStats } from "../game/src/player/stats.js";
import type { Snapshot } from "../shared/types/state.js";

function makeSnapshot(): Snapshot {
  const inv = new Inventory(27);
  inv.add("wood", 10);
  return {
    version: 1,
    savedAt: 0,
    settings: { seed: 1, worldName: "t", dayLengthSeconds: 100 },
    player: {
      id: "p1", name: "ผู้เล่น", pos: { x: 0, y: 0 },
      stats: createStats(),
      inventory: inv.toState(),
      equipped: {},
      queue: [],
    },
    world: { timeSeconds: 0, chunks: {} },
    farms: { plots: {} },
    enemies: [],
    quests: [],
  };
}

describe("Save", () => {
  it("serializes and deserializes a valid snapshot", () => {
    const snap = createSnapshot(makeSnapshot());
    const json = serialize(snap);
    const back = deserialize(json);
    expect(back.player.id).toBe("p1");
    expect(back.player.inventory.slots[0]).toEqual({ item: "wood", count: 10 });
  });

  it("rejects inventory exceeding stack limit", () => {
    const snap = makeSnapshot();
    snap.player.inventory.slots[0] = { item: "wood", count: 100 }; // limit 64
    expect(() => serialize(createSnapshot(snap))).toThrow();
  });

  it("rejects unknown version", () => {
    const snap = makeSnapshot();
    expect(() => deserialize(JSON.stringify({ ...snap, version: 99 }))).toThrow();
  });
});
