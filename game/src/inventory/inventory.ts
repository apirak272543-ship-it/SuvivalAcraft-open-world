import type { InventoryState, ItemStack } from "../../../shared/types/state.js";
import { ITEMS } from "../../../shared/registries/items.js";

export class Inventory {
  private slots: (ItemStack | null)[];

  constructor(size: number, slots?: (ItemStack | null)[]) {
    this.slots = slots ? slots.slice(0, size) : new Array<ItemStack | null>(size).fill(null);
  }

  get size(): number {
    return this.slots.length;
  }

  get(index: number): ItemStack | null {
    return this.slots[index] ?? null;
  }

  add(item: string, count: number): number {
    const def = ITEMS[item];
    const limit = def?.stackLimit ?? 64;
    let remaining = count;

    // Stack onto existing
    for (let i = 0; i < this.slots.length && remaining > 0; i++) {
      const slot = this.slots[i];
      if (slot && slot.item === item && slot.count < limit) {
        const space = limit - slot.count;
        const moved = Math.min(space, remaining);
        slot.count += moved;
        remaining -= moved;
      }
    }

    // Fill empty slots
    for (let i = 0; i < this.slots.length && remaining > 0; i++) {
      if (!this.slots[i]) {
        const moved = Math.min(limit, remaining);
        this.slots[i] = { item, count: moved };
        remaining -= moved;
      }
    }

    return remaining; // amount left over (not added)
  }

  count(item: string): number {
    return this.slots.reduce((sum, s) => (s && s.item === item ? sum + s.count : sum), 0);
  }

  /** Transactional remove: returns false (and changes nothing) if insufficient. */
  remove(item: string, count: number): boolean {
    if (!this.has(item, count)) return false;
    let remaining = count;
    for (let i = 0; i < this.slots.length && remaining > 0; i++) {
      const slot = this.slots[i];
      if (slot && slot.item === item) {
        const take = Math.min(slot.count, remaining);
        slot.count -= take;
        remaining -= take;
        if (slot.count <= 0) this.slots[i] = null;
      }
    }
    return remaining === 0;
  }

  has(item: string, count: number): boolean {
    return this.count(item) >= count;
  }

  isEmpty(): boolean {
    return this.slots.every((s) => s === null);
  }

  toState(): InventoryState {
    return { slots: this.slots.map((s) => (s ? { ...s } : null)) };
  }

  static fromState(state: InventoryState): Inventory {
    return new Inventory(state.slots.length, state.slots.map((s) => (s ? { ...s } : null)));
  }
}
