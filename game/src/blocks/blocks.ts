import { BLOCKS } from "../../../shared/registries/blocks.js";
import type { BlockDef } from "../../../shared/types/content.js";
import { Rng } from "../core/rng.js";
import type { ItemStack } from "../../../shared/types/state.js";

export function getBlock(id: string): BlockDef | undefined {
  return BLOCKS[id];
}

export function isSolid(id: string): boolean {
  return BLOCKS[id]?.solid ?? false;
}

export function isSoil(id: string): boolean {
  return BLOCKS[id]?.soil ?? false;
}

export function canBreak(blockId: string, toolType?: string, toolLevel = 0): boolean {
  const block = BLOCKS[blockId];
  if (!block) return false;
  if (!block.tool) return true; // hand-breakable (e.g. leaves)
  if (!toolType) return false; // requires tool
  if (block.tool.type !== toolType) return false;
  return toolLevel >= block.tool.level;
}

export function breakBlock(blockId: string, rng: Rng, toolType?: string, toolLevel = 0): ItemStack[] {
  if (!canBreak(blockId, toolType, toolLevel)) return [];
  const block = BLOCKS[blockId];
  if (!block) return [];
  const drops: ItemStack[] = [];
  for (const entry of block.drops ?? []) {
    const count = rng.int(entry.min, entry.max);
    if (count > 0) drops.push({ item: entry.item, count });
  }
  return drops;
}
