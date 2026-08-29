import type { StatBlock } from "../../../shared/types/state.js";

export interface SurvivalConfig {
  hungerPerSecond: number;
  thirstPerSecond: number;
  regenHungerThreshold: number;
  regenPerSecond: number;
  starvationDamagePerSecond: number;
}

export const DEFAULT_SURVIVAL: SurvivalConfig = {
  hungerPerSecond: 0.08,
  thirstPerSecond: 0.06,
  regenHungerThreshold: 0.75,
  regenPerSecond: 0.5,
  starvationDamagePerSecond: 1,
};

export interface SurvivalResult {
  stats: StatBlock;
  drained: boolean;
  regen: boolean;
}

export function applySurvivalTick(stats: StatBlock, dt: number, config?: Partial<SurvivalConfig>): SurvivalResult {
  const cfg = { ...DEFAULT_SURVIVAL, ...config };
  stats.hunger = Math.max(0, stats.hunger - cfg.hungerPerSecond * dt);
  stats.thirst = Math.max(0, stats.thirst - cfg.thirstPerSecond * dt);

  let drained = false;
  let regen = false;
  const starved = stats.hunger === 0 || stats.thirst === 0;
  if (starved) {
    stats.hp = Math.max(0, stats.hp - cfg.starvationDamagePerSecond * dt);
    drained = true;
  } else if (stats.hunger / stats.maxHunger > cfg.regenHungerThreshold) {
    stats.hp = Math.min(stats.maxHp, stats.hp + cfg.regenPerSecond * dt);
    regen = true;
  }

  return { stats, drained, regen };
}

export function isStarving(stats: StatBlock): boolean {
  return stats.hunger === 0 || stats.thirst === 0;
}
