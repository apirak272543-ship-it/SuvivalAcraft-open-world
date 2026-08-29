import type { ItemDef } from "../../../shared/types/content.js";
import { ITEMS } from "../../../shared/registries/items.js";

export function getItem(id: string): ItemDef | undefined {
  return ITEMS[id];
}

export function itemName(id: string): string {
  return getItem(id)?.name ?? id;
}

export function isStackable(id: string): boolean {
  const def = getItem(id);
  return def ? def.stackLimit > 1 : true;
}
