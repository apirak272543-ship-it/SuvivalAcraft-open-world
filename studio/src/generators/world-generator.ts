import { generateChunk } from "../../../game/src/procedural/terrain.js";
import { Chunk } from "../../../game/src/world/chunk.js";
import { World } from "../../../game/src/world/world.js";
import type { WorldSettings } from "../../../shared/types/world.js";

export function generateWorld(settings: WorldSettings): World {
  const world = new World(settings);
  const r = settings.radiusChunks;
  for (let cz = -r; cz <= r; cz++) {
    for (let cx = -r; cx <= r; cx++) {
      const chunk = new Chunk({ cx, cz }, settings.chunkSize);
      generateChunk(chunk, settings.seed);
      world.setChunk(chunk);
    }
  }
  return world;
}
