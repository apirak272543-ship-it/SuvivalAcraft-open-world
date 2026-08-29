import type { StatBlock } from "../../../shared/types/state.js";

export interface HudSnapshot {
  hp: number;
  maxHp: number;
  hunger: number;
  maxHunger: number;
  thirst: number;
  maxThirst: number;
  stamina: number;
  maxStamina: number;
  level: number;
  xp: number;
  xpNormalized: number;
  hotbar: Array<{ item: string; count: number } | null>;
}

export function toHud(stats: StatBlock, hotbarSlots: Array<{ item: string; count: number } | null>): HudSnapshot {
  return {
    hp: Math.round(stats.hp),
    maxHp: stats.maxHp,
    hunger: Math.round(stats.hunger),
    maxHunger: stats.maxHunger,
    thirst: Math.round(stats.thirst),
    maxThirst: stats.maxThirst,
    stamina: Math.round(stats.stamina),
    maxStamina: stats.maxStamina,
    level: stats.level,
    xp: stats.xp,
    xpNormalized: stats.xp / (stats.level * 100),
    hotbar: hotbarSlots,
  };
}
