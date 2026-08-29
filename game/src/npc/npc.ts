import { NPC } from "../../../shared/registries/npc.js";
import type { ItemStack } from "../../../shared/types/state.js";
import { Inventory } from "../inventory/inventory.js";

export interface TradeResult {
  ok: boolean;
  reason?: string;
  give?: ItemStack;
  receive?: ItemStack;
  inventory?: Array<ItemStack | null>;
}

export function tradeWith(npcId: string, tradeIndex: number, inventory: Inventory): TradeResult {
  const npc = NPC[npcId];
  if (!npc) return { ok: false, reason: "NPC ไม่มีอยู่" };
  const offer = npc.trades[tradeIndex];
  if (!offer) return { ok: false, reason: "ไม่มีดีลนี้" };
  if (!inventory.has(offer.receive.item, offer.receive.count)) {
    return { ok: false, reason: `ขาด ${offer.receive.item}` };
  }
  inventory.remove(offer.receive.item, offer.receive.count);
  inventory.add(offer.give.item, offer.give.count);
  return {
    ok: true,
    give: { item: offer.give.item, count: offer.give.count },
    receive: { item: offer.receive.item, count: offer.receive.count },
    inventory: inventory.toState().slots,
  };
}
