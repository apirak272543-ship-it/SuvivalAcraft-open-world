import type { InventoryState } from "../types/state.js";

export interface CraftRequest {
  recipeId: string;
  station: string;
  inventory: InventoryState;
}

export interface CraftResult {
  ok: boolean;
  reason?: string;
  inventory?: InventoryState;
  result?: { item: string; count: number };
}

export interface TradeRequest {
  npcId: string;
  tradeIndex: number;
  inventory: InventoryState;
}

export interface TradeResult {
  ok: boolean;
  reason?: string;
  inventory?: InventoryState;
}
