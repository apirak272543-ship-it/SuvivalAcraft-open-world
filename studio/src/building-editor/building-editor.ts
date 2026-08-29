import { World } from "../../../game/src/world/world.js";
import type { Vec2 } from "../../../shared/types/world.js";
import { place } from "../../../game/src/building/building.js";

export class BuildingEditor {
  constructor(private world: World) {}

  placeBlock(pos: Vec2, blockId: string): boolean {
    return place(this.world, pos, blockId);
  }

  replaceBlocks(blockId: string, area: { from: Vec2; to: Vec2 }): number {
    let placed = 0;
    for (let y = area.from.y; y <= area.to.y; y++) {
      for (let x = area.from.x; x <= area.to.x; x++) {
        if (place(this.world, { x, y }, blockId)) placed++;
      }
    }
    return placed;
  }
}
