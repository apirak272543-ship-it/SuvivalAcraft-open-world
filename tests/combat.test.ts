import { describe, it, expect } from "vitest";
import { Enemy } from "../game/src/enemies/enemy.js";
import { attackEnemy, weaponStats } from "../game/src/combat/combat.js";
import { Rng } from "../game/src/core/rng.js";

describe("Combat", () => {
  it("weapon stats for unarmed is minimal", () => {
    expect(weaponStats(undefined).damage).toBe(1);
  });

  it("attacks damage enemy armor and kills it", () => {
    const enemy = new Enemy("wolf", { x: 5, y: 5 }); // 25hp, 0 armor
    const rng = new Rng(1);
    let total = 0;
    while (enemy.isAlive() && total < 50) {
      const r = attackEnemy(enemy, "iron_sword", rng);
      total += r.dealt;
    }
    expect(enemy.isAlive()).toBe(false);
    expect(total).toBeGreaterThan(0);
  });

  it("aggro activates within range", () => {
    const enemy = new Enemy("wolf", { x: 0, y: 0 }); // range 10
    enemy.updateAggro({ x: 5, y: 0 });
    expect(enemy.aggro).toBe(true);
    enemy.updateAggro({ x: 50, y: 50 });
    expect(enemy.aggro).toBe(false);
  });

  it("golem armor reduces damage", () => {
    const enemy = new Enemy("golem", { x: 0, y: 0 });
    const before = enemy.hp;
    const rng = new Rng(3);
    const r = attackEnemy(enemy, "stone_sword", rng);
    expect(r.dealt).toBeLessThan(before);
  });
});
