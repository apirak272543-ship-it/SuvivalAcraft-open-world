import type { Vec2 } from "../../../shared/types/world.js";
import { World } from "../world/world.js";
import { BLOCKS } from "../../../shared/registries/blocks.js";

export function canPlace(world: World, pos: Vec2, blockId: string): boolean {
  const target = BLOCKS[blockId];
  if (!target || !target.solid) return false;
  const existing = world.blockAt(pos.x, pos.y);
  return existing === "air";
}

export function place(world: World, pos: Vec2, blockId: string): boolean {
  if (!canPlace(world, pos, blockId)) return false;
  world.setBlock(pos.x, pos.y, blockId);
  return true;
}
