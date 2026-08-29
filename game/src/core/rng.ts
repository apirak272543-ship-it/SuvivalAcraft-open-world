export class Rng {
  private state: number;

  constructor(seed: number) {
    this.state = seed >>> 0;
  }

  /** Next float in [0, 1) */
  next(): number {
    this.state = (this.state * 1664525 + 1013904223) >>> 0;
    return this.state / 4294967296;
  }

  int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  chance(p: number): boolean {
    return this.next() < p;
  }
}

/** Deterministic hash from integers -> [0,1) */
export function hash01(x: number, z: number, seed: number): number {
  let h = x * 374761393 + z * 668265263 + seed * 1442695040888963407;
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  return (h >>> 0) / 4294967296;
}
