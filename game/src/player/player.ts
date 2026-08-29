import type { PlayerState, ItemStack } from "../../../shared/types/state.js";
import { createStats } from "./stats.js";
import { Inventory } from "../inventory/inventory.js";

export class Player {
  state: PlayerState;
  inventory: Inventory;

  constructor(state?: Partial<PlayerState>) {
    this.inventory = new Inventory(27);
    this.state = {
      id: state?.id ?? "player-1",
      name: state?.name ?? "ผู้เล่น",
      pos: state?.pos ?? { x: 0, y: 0 },
      stats: state?.stats ?? createStats(),
      inventory: this.inventory.toState(),
      equipped: state?.equipped ?? {},
      queue: state?.queue ?? [],
    };
  }
}
