import { hash01 } from "../core/rng.js";
import { biomeAt } from "../../../shared/registries/biomes.js";
import type { BiomeDef } from "../../../shared/types/content.js";
import type { Chunk } from "../world/chunk.js";

const WATER_LEVEL = 0.52;

function heightAt(x: number, z: number, seed: number): number {
  const a = hash01(Math.floor(x / 16), Math.floor(z / 16), seed) * 0.5;
  const fine = hash01(x, z, seed) * 0.5;
  return a + fine * 0.35;
}

function localNoise(x: number, z: number, seed: number, scale: number): number {
  const sx = Math.floor(x * scale);
  const sz = Math.floor(z * scale);
  return hash01(sx, sz, seed);
}

export function generateChunk(chunk: Chunk, seed: number): void {
  const size = chunk.size;
  const baseX = chunk.coord.cx * size;
  const baseZ = chunk.coord.cz * size;
  const biome = biomeAt(seed, chunk.coord.cx, chunk.coord.cz);

  for (let lz = 0; lz < size; lz++) {
    for (let lx = 0; lx < size; lx++) {
      const wx = baseX + lx;
      const wz = baseZ + lz;
      const h = heightAt(wx, wz, seed);
      const biomeAtPoint = surfaceBiome(biome, wx, wz, seed);

      if (h < WATER_LEVEL) {
        chunk.set(lx, lz, "water");
        continue;
      }

      chunk.set(lx, lz, biomeAtPoint.surface);

      // Trees
      if (biomeAtPoint.treeDensity > 0 && localNoise(wx, wz, seed, 3) < biomeAtPoint.treeDensity && h > WATER_LEVEL + 0.05) {
        chunk.set(lx, lz, "wood_log");
        if (localNoise(wx, wz, seed * 7, 7) < 0.6) {
          chunk.set(lx, lz, "leaves");
        }
      }

      // Ore veins on stone bedrock patches
      if (biomeAtPoint.surface === "stone" && localNoise(wx, wz, seed + 101, 5) < 0.08) {
        chunk.set(lx, lz, localNoise(wx, wz, seed + 202, 9) < 0.5 ? "coal_ore" : "iron_ore");
      }
    }
  }
}

function surfaceBiome(base: BiomeDef, wx: number, wz: number, seed: number): BiomeDef {
  // Small pockets: sometimes swap for variation using per-tile noise
  const n = hash01(wx, wz, seed * 3);
  if (n < 0.03) {
    return { ...base, surface: "sand", subSoil: "sand", treeDensity: 0 };
  }
  return base;
}
