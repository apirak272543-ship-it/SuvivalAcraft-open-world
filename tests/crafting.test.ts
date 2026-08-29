import { describe, it, expect } from "vitest";
import { Inventory } from "../game/src/inventory/inventory.js";
import { craft, canCraft } from "../game/src/crafting/crafting.js";

describe("Crafting", () => {
  it("crafts wood to sticks", () => {
    const inv = new Inventory(10);
    inv.add("wood", 1);
    const result = craft(inv, "stick", "crafting_table");
    expect(result.ok).toBe(true);
    expect(result.result).toEqual({ item: "stick", count: 4 });
    expect(inv.count("stick")).toBe(4);
    expect(inv.count("wood")).toBe(0);
  });

  it("rejects crafting if missing ingredients", () => {
    const inv = new Inventory(10);
    const result = craft(inv, "wood_pickaxe", "crafting_table");
    expect(result.ok).toBe(false);
    expect(result.reason).toContain("ขาดวัตถุดิบ");
  });

  it("requires the correct station", () => {
    const inv = new Inventory(10);
    inv.add("iron_ore", 1);
    inv.add("coal", 1);
    const result = craft(inv, "iron_ingot", "crafting_table");
    expect(result.ok).toBe(false);
    expect(result.reason).toContain("ต้องใช้");
  });

  it("canCraft reports readiness", () => {
    const inv = new Inventory(10);
    inv.add("wood", 3);
    expect(canCraft(inv, "wood_planks", "crafting_table").ok).toBe(true);
    expect(canCraft(inv, "wood_pickaxe", "crafting_table").ok).toBe(false);
  });
});
