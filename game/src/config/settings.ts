import type { WorldSettings } from "../../../shared/types/world.js";
import type { GameConfig } from "./config.js";

export function worldSettingsFromConfig(cfg: GameConfig): WorldSettings {
  return {
    seed: cfg.seed,
    chunkSize: cfg.chunkSize,
    radiusChunks: cfg.radiusChunks,
    dayLengthSeconds: cfg.dayLengthSeconds,
    spawn: { x: 0, y: 0 },
    rules: {
      friendlyFire: false,
      keepInventoryOnDeath: true,
      hungerEnabled: true,
      thirstEnabled: true,
      mobSpawning: true,
    },
  };
}
