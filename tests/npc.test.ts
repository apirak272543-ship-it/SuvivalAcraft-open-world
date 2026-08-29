import { describe, it, expect } from "vitest";
import { tradeWith } from "../game/src/npc/npc.js";
import { Inventory } from "../game/src/inventory/inventory.js";

describe("NPC trade", () => {
  it("trades wood for bread", () => {
    const inv = new Inventory(10);
    inv.add("wood", 8);
    const r = tradeWith("trader", 0, inv);
    expect(r.ok).toBe(true);
    expect(inv.count("bread")).toBe(1);
    expect(inv.count("wood")).toBe(0);
  });

  it("rejects trade when lacking resources", () => {
    const inv = new Inventory(10);
    inv.add("wood", 2);
    const r = tradeWith("trader", 0, inv);
    expect(r.ok).toBe(false);
  });

  it("rejects invalid trade index", () => {
    const inv = new Inventory(10);
    expect(tradeWith("trader", 99, inv).ok).toBe(false);
  });
});
