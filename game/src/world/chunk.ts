import type { ChunkCoord } from "../../../shared/types/world.js";

export class Chunk {
  readonly coord: ChunkCoord;
  readonly size: number;
  /** tile block ids, row-major */
  readonly blocks: string[];
  readonly variants: Int8Array;
  readonly data: Int16Array;

  constructor(coord: ChunkCoord, size: number) {
    this.coord = coord;
    this.size = size;
    const total = size * size;
    this.blocks = new Array<string>(total).fill("air");
    this.variants = new Int8Array(total);
    this.data = new Int16Array(total);
  }

  index(localX: number, localZ: number): number {
    return localZ * this.size + localX;
  }

  inBounds(lx: number, lz: number): boolean {
    return lx >= 0 && lx < this.size && lz >= 0 && lz < this.size;
  }

  get(localX: number, localZ: number): string {
    return this.blocks[this.index(localX, localZ)] ?? "air";
  }

  set(localX: number, localZ: number, block: string, variant = 0, data = 0): void {
    const i = this.index(localX, localZ);
    this.blocks[i] = block;
    this.variants[i] = variant;
    this.data[i] = data;
  }

  fill(block: string): void {
    this.blocks.fill(block);
  }

  /** Flattened tile codes for saving. */
  toFlat(): string[] {
    return this.blocks.map((b, i) => `${b}:${this.variants[i]}:${this.data[i]}`);
  }

  static fromFlat(coord: ChunkCoord, size: number, tiles: string[]): Chunk {
    const chunk = new Chunk(coord, size);
    for (let i = 0; i < Math.min(tiles.length, size * size); i++) {
      const parts = tiles[i]?.split(":");
      if (!parts) continue;
      const block = parts[0] ?? "air";
      const variant = Number(parts[1] ?? 0);
      const data = Number(parts[2] ?? 0);
      chunk.blocks[i] = block;
      chunk.variants[i] = variant;
      chunk.data[i] = data;
    }
    return chunk;
  }
}
