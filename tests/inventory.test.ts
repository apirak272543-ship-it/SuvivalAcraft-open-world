import { describe, it, expect } from "vitest";
import { Inventory } from "../game/src/inventory/inventory.js";

describe("Inventory", () => {
  it("adds items and respects stack limits", () => {
    const inv = new Inventory(3);
    expect(inv.add("wood", 70)).toBe(0);
    expect(inv.count("wood")).toBe(70);
    expect(inv.get(0)).toEqual({ item: "wood", count: 64 });
    expect(inv.get(1)).toEqual({ item: "wood", count: 6 });

    const one = new Inventory(1);
    expect(one.add("wood", 70)).toBe(6);
    expect(one.count("wood")).toBe(64);
  });

  it("removes items and nulls empty slots", () => {
    const inv = new Inventory(2);
    inv.add("stone", 5);
    expect(inv.remove("stone", 3)).toBe(true);
    expect(inv.count("stone")).toBe(2);
    expect(inv.remove("stone", 2)).toBe(true);
    expect(inv.isEmpty()).toBe(true);
  });

  it("fails removal when insufficient", () => {
    const inv = new Inventory(1);
    inv.add("wood", 2);
    expect(inv.remove("wood", 5)).toBe(false);
    expect(inv.count("wood")).toBe(2);
  });

  it("does not exceed container size", () => {
    const inv = new Inventory(2);
    const leftover = inv.add("wood", 300);
    expect(inv.count("wood")).toBe(128);
    expect(leftover).toBe(172);
  });
});
