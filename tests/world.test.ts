import { describe, it, expect } from "vitest";
import { Chunk } from "../game/src/world/chunk.js";
import { World } from "../game/src/world/world.js";
import { generateWorld } from "../studio/src/generators/world-generator.js";

describe("World", () => {
  it("chunk stores and reads blocks", () => {
    const chunk = new Chunk({ cx: 0, cz: 0 }, 16);
    chunk.set(1, 2, "stone");
    expect(chunk.get(1, 2)).toBe("stone");
    expect(chunk.get(0, 0)).toBe("air");
  });

  it("world setBlock/blockAt roundtrip", () => {
    const world = new World({ seed: 1, chunkSize: 16, radiusChunks: 1, dayLengthSeconds: 100, spawn: { x: 0, y: 0 } , rules: { friendlyFire: false, keepInventoryOnDeath: true, hungerEnabled: true, thirstEnabled: true, mobSpawning: true }});
    const chunk = new Chunk({ cx: 0, cz: 0 }, 16);
    world.setChunk(chunk);
    chunk.set(0, 0, "grass");
    expect(world.blockAt(0, 0)).toBe("grass");
    world.setBlock(0, 0, "sand");
    expect(world.blockAt(0, 0)).toBe("sand");
  });

  it("generation is deterministic per seed", () => {
    const a = generateWorld({ seed: 42, chunkSize: 16, radiusChunks: 2, dayLengthSeconds: 100, spawn: { x: 0, y: 0 }, rules: { friendlyFire: false, keepInventoryOnDeath: true, hungerEnabled: true, thirstEnabled: true, mobSpawning: true } });
    const b = generateWorld({ seed: 42, chunkSize: 16, radiusChunks: 2, dayLengthSeconds: 100, spawn: { x: 0, y: 0 }, rules: { friendlyFire: false, keepInventoryOnDeath: true, hungerEnabled: true, thirstEnabled: true, mobSpawning: true } });
    const sa = JSON.stringify(a.loadedChunks().map((c) => c.toFlat()));
    const sb = JSON.stringify(b.loadedChunks().map((c) => c.toFlat()));
    expect(sa).toBe(sb);
    // different seed should differ at least somewhere
    expect(sa).not.toBe(JSON.stringify(generateWorld({ seed: 43, chunkSize: 16, radiusChunks: 2, dayLengthSeconds: 100, spawn: { x: 0, y: 0 }, rules: { friendlyFire: false, keepInventoryOnDeath: true, hungerEnabled: true, thirstEnabled: true, mobSpawning: true } }).loadedChunks().map((c) => c.toFlat())));
  });
});
