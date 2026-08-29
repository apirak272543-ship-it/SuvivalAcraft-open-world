import { describe, it, expect } from "vitest";
import { priceOf, sellValue, buyCost } from "../game/src/economy/economy.js";

describe("Economy", () => {
  it("has prices for known items", () => {
    expect(priceOf("wood")).toBeDefined();
    expect(priceOf("does-not-exist")).toBeUndefined();
  });

  it("computes bulk sell value", () => {
    expect(sellValue("wood", 10)).toBe(10);
  });

  it("computes buy cost", () => {
    expect(buyCost("bread", 3)).toBe(30);
  });
});
