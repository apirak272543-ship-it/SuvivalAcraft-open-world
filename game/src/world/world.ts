import type { WorldSettings, Vec2 } from "../../../shared/types/world.js";
import { Chunk } from "./chunk.js";

export class World {
  readonly settings: WorldSettings;
  private chunks = new Map<string, Chunk>();

  constructor(settings: WorldSettings) {
    this.settings = settings;
  }

  private coordKey(cx: number, cz: number): string {
    return `${cx},${cz}`;
  }

  chunk(cx: number, cz: number): Chunk | undefined {
    return this.chunks.get(this.coordKey(cx, cz));
  }

  hasChunk(cx: number, cz: number): boolean {
    return this.chunks.has(this.coordKey(cx, cz));
  }

  setChunk(chunk: Chunk): void {
    this.chunks.set(this.coordKey(chunk.coord.cx, chunk.coord.cz), chunk);
  }

  deleteChunk(cx: number, cz: number): void {
    this.chunks.delete(this.coordKey(cx, cz));
  }

  loadedChunks(): Chunk[] {
    return [...this.chunks.values()];
  }

  /** World tile -> block id */
  blockAt(wx: number, wz: number): string {
    const size = this.settings.chunkSize;
    const cx = Math.floor(wx / size);
    const cz = Math.floor(wz / size);
    const chunk = this.chunk(cx, cz);
    if (!chunk) return "air";
    const lx = ((wx % size) + size) % size;
    const lz = ((wz % size) + size) % size;
    return chunk.get(lx, lz);
  }

  setBlock(wx: number, wz: number, block: string, variant = 0, data = 0): void {
    const size = this.settings.chunkSize;
    const cx = Math.floor(wx / size);
    const cz = Math.floor(wz / size);
    let chunk = this.chunk(cx, cz);
    if (!chunk) {
      chunk = new Chunk({ cx, cz }, size);
      this.setChunk(chunk);
    }
    const lx = ((wx % size) + size) % size;
    const lz = ((wz % size) + size) % size;
    chunk.set(lx, lz, block, variant, data);
  }

  /** Cache/keep chunks in the loaded radius around a point. */
  tickRadius(center: Vec2, radiusChunks: number): number {
    const size = this.settings.chunkSize;
    const ccx = Math.floor(center.x / size);
    const ccz = Math.floor(center.y / size);
    let count = 0;
    for (let dz = -radiusChunks; dz <= radiusChunks; dz++) {
      for (let dx = -radiusChunks; dx <= radiusChunks; dx++) {
        const cx = ccx + dx;
        const cz = ccz + dz;
        if (!this.chunks.has(this.coordKey(cx, cz))) {
          count++;
        }
      }
    }
    return count;
  }
}
