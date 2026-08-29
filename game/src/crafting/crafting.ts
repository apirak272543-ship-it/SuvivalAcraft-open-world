import { RECIPES } from "../../../shared/registries/recipes.js";
import type { RecipeDef } from "../../../shared/types/content.js";
import type { InventoryState } from "../../../shared/types/state.js";
import { Inventory } from "../inventory/inventory.js";

export interface CraftOutcome {
  ok: boolean;
  reason?: string;
  recipe?: RecipeDef;
  result?: { item: string; count: number };
  inventory?: InventoryState;
}

export function canCraft(inventory: Inventory, recipeId: string, station: string): CraftOutcome {
  const recipe = RECIPES.find((r) => r.id === recipeId);
  if (!recipe) return { ok: false, reason: "ไม่พบสูตรนี้" };
  if (recipe.station !== station) return { ok: false, reason: `ต้องใช้ ${recipe.station}` };
  for (const ing of recipe.ingredients) {
    if (!inventory.has(ing.item, ing.count)) {
      return { ok: false, reason: `ขาดวัตถุดิบ ${ing.item}` };
    }
  }
  return { ok: true, recipe, result: recipe.result, inventory: inventory.toState() };
}

export function craft(inventory: Inventory, recipeId: string, station: string): CraftOutcome {
  const check = canCraft(inventory, recipeId, station);
  if (!check.ok || !check.recipe) return check;

  for (const ing of check.recipe.ingredients) {
    inventory.remove(ing.item, ing.count);
  }
  const leftover = inventory.add(check.recipe!.result.item, check.recipe!.result.count);
  if (leftover > 0) {
    // Inventory full; restore - revert transaction
    return { ok: false, reason: "ช่องเก็บของเต็ม" };
  }
  return { ok: true, recipe: check.recipe, result: check.result, inventory: inventory.toState() };
}

export function listRecipes(station: string): RecipeDef[] {
  return RECIPES.filter((r) => r.station === station);
}
