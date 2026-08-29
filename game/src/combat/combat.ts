import type { ItemStack } from "../../../shared/types/state.js";
import { LivingEntity } from "../entities/entity.js";
import { ENEMIES } from "../../../shared/registries/enemies.js";
import { Rng } from "../core/rng.js";

export interface WeaponStats {
  damage: number;
  critChance: number;
  critMultiplier: number;
}

const WEAPON_BASE: Record<string, WeaponStats> = {
  wood_sword: { damage: 5, critChance: 0.05, critMultiplier: 1.5 },
  stone_sword: { damage: 8, critChance: 0.08, critMultiplier: 1.75 },
  iron_sword: { damage: 12, critChance: 0.12, critMultiplier: 2.0 },
};

export function weaponStats(mainHand?: string): WeaponStats {
  return WEAPON_BASE[mainHand ?? ""] ?? { damage: 1, critChance: 0, critMultiplier: 1.5 };
}

export interface AttackResult {
  dealt: number;
  blocked: number;
  crit: boolean;
  killed: boolean;
  drops: ItemStack[];
}

export function attackEnemy(
  enemy: LivingEntity,
  mainHand: string | undefined,
  rng: Rng,
): AttackResult {
  const ws = weaponStats(mainHand);
  const crit = rng.chance(ws.critChance);
  const raw = ws.damage * (crit ? ws.critMultiplier : 1);
  const blocked = Math.min(enemy.armor, raw * 0.5);
  const dealt = Math.max(0, raw - blocked);
  enemy.hp = Math.max(0, enemy.hp - dealt);

  const defId = enemyNameToDef(enemy.name);
  const def = defId ? ENEMIES[defId] : undefined;

  let drops: ItemStack[] = [];
  if (enemy.hp === 0 && def) {
    for (const entry of def.drops) {
      if (entry.min === 0 && rng.chance(entry.chance ?? 1)) {
        drops.push({ item: entry.item, count: 1 });
      } else {
        const count = rng.int(entry.min, entry.max);
        if (count > 0) drops.push({ item: entry.item, count });
      }
    }
  }

  return {
    dealt,
    blocked,
    crit,
    killed: enemy.hp === 0,
    drops,
  };
}

function enemyNameToDef(name: string): string | undefined {
  return Object.keys(ENEMIES).find((k) => ENEMIES[k]!.name === name);
}
