import { playerStateSchema, inventorySchema, statBlockSchema, questProgressSchema } from "../schemas/state.js";
import { ITEMS } from "../registries/items.js";
import type { PlayerState, Snapshot } from "../types/state.js";

export function validatePlayer(player: PlayerState): string[] {
  const errors: string[] = [];

  // stat consistency
  const stat = playerStateSchema.shape.stats.safeParse(player.stats);
  if (!stat.success) errors.push(`stats: ${stat.error.issues.map((i) => i.message).join("; ")}`);

  const maxMap: Record<"hp" | "hunger" | "thirst" | "stamina", "maxHp" | "maxHunger" | "maxThirst" | "maxStamina"> = {
    hp: "maxHp",
    hunger: "maxHunger",
    thirst: "maxThirst",
    stamina: "maxStamina",
  };
  for (const [cur, max] of Object.entries(maxMap) as Array<["hp" | "hunger" | "thirst" | "stamina", "maxHp" | "maxHunger" | "maxThirst" | "maxStamina"]>) {
    if (player.stats[cur] > player.stats[max]) {
      errors.push(`${cur} เกินค่า max`);
    }
  }

  // inventory item refs + stack limits
  for (const slot of player.inventory.slots) {
    if (!slot) continue;
    const def = ITEMS[slot.item];
    if (!def) {
      errors.push(`สินค้า ${slot.item} ไม่มีในแคตตาล็อก`);
    } else if (slot.count > def.stackLimit) {
      errors.push(`${slot.item} เกิน stack limit (${slot.count} > ${def.stackLimit})`);
    }
  }

  return errors;
}

export function validateSnapshot(snapshot: Snapshot): string[] {
  return validatePlayer(snapshot.player);
}
