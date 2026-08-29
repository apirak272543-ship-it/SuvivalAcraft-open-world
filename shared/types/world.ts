export interface Vec2 {
  x: number;
  y: number;
}

export interface ChunkCoord {
  cx: number;
  cz: number;
}

export interface Tile {
  block: string;
  variant?: number;
  data?: number;
}

export interface ChunkData {
  coord: ChunkCoord;
  /** Tiles flattened row-major, each encoded as blockId:variant:data */
  tiles: string[];
}

export interface WorldSettings {
  seed: number;
  chunkSize: number;
  radiusChunks: number;
  dayLengthSeconds: number;
  spawn: Vec2;
  rules: WorldRules;
}

export interface WorldRules {
  friendlyFire: boolean;
  keepInventoryOnDeath: boolean;
  hungerEnabled: boolean;
  thirstEnabled: boolean;
  mobSpawning: boolean;
}
