import { describe, it, expect } from "vitest";
import { Rng, hash01 } from "../game/src/core/rng.js";

describe("Rng", () => {
  it("produces values in [0,1)", () => {
    const rng = new Rng(1);
    for (let i = 0; i < 1000; i++) {
      const v = rng.next();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it("is deterministic for same seed", () => {
    const a = new Rng(7);
    const b = new Rng(7);
    expect(a.next()).toBe(b.next());
    expect(a.int(1, 10)).toBe(b.int(1, 10));
  });

  it("hash01 is deterministic and in [0,1)", () => {
    const v = hash01(3, 4, 99);
    expect(v).toBe(hash01(3, 4, 99));
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThan(1);
  });
});
