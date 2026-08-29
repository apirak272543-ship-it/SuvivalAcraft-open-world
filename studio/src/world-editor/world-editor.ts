import { World } from "../../../game/src/world/world.js";
import type { Vec2 } from "../../../shared/types/world.js";
import { generateChunk } from "../../../game/src/procedural/terrain.js";
import { Chunk } from "../../../game/src/world/chunk.js";

export class WorldEditor {
  constructor(private world: World) {}

  setBlock(pos: Vec2, block: string): void {
    this.world.setBlock(pos.x, pos.y, block);
  }

  getBlock(pos: Vec2): string {
    return this.world.blockAt(pos.x, pos.y);
  }

  regenerateRectangle(from: Vec2, to: Vec2): number {
    const size = this.world.settings.chunkSize;
    const cx1 = Math.floor(from.x / size);
    const cz1 = Math.floor(from.y / size);
    const cx2 = Math.floor(to.x / size);
    const cz2 = Math.floor(to.y / size);
    let regenerated = 0;
    for (let cz = cz1; cz <= cz2; cz++) {
      for (let cx = cx1; cx <= cx2; cx++) {
        const chunk = new Chunk({ cx, cz }, size);
        generateChunk(chunk, this.world.settings.seed);
        this.world.setChunk(chunk);
        regenerated++;
      }
    }
    return regenerated;
  }
}
