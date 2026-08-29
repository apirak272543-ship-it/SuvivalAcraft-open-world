import type { StatBlock } from "../../../shared/types/state.js";
import { clamp } from "../core/math.js";

export function createStats(overrides: Partial<StatBlock> = {}): StatBlock {
  return {
    hp: 20, maxHp: 20,
    hunger: 20, maxHunger: 20,
    thirst: 20, maxThirst: 20,
    stamina: 100, maxStamina: 100,
    xp: 0, level: 1,
    ...overrides,
  };
}

export function xpForLevel(level: number): number {
  return level * 100;
}

export function addXp(stats: StatBlock, amount: number): { leveledUp: boolean; stats: StatBlock } {
  stats.xp += amount;
  let leveledUp = false;
  while (stats.xp >= xpForLevel(stats.level)) {
    stats.xp -= xpForLevel(stats.level);
    stats.level += 1;
    leveledUp = true;
  }
  return { leveledUp, stats };
}

export function heal(stats: StatBlock, amount: number): StatBlock {
  stats.hp = clamp(stats.hp + amount, 0, stats.maxHp);
  return stats;
}

export function damage(stats: StatBlock, amount: number): StatBlock {
  stats.hp = clamp(stats.hp - amount, 0, stats.maxHp);
  return stats;
}

export function eat(stats: StatBlock, hunger: number, thirst = 0, health = 0): StatBlock {
  stats.hunger = clamp(stats.hunger + hunger, 0, stats.maxHunger);
  stats.thirst = clamp(stats.thirst + thirst, 0, stats.maxThirst);
  if (health) stats.hp = clamp(stats.hp + health, 0, stats.maxHp);
  return stats;
}
