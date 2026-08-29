import { describe, it, expect } from "vitest";
import { updateAi, createMemory, type AiContext, type AiMemory } from "../game/src/ai/state-machine.js";
import { Creature } from "../game/src/ai/creature.js";
import { LivingEntity } from "../game/src/entities/entity.js";

function ctx(over: Partial<AiContext>): AiContext {
  return {
    pos: { x: 0, y: 0 },
    home: { x: 0, y: 0 },
    vision: 10,
    aggroRange: 6,
    speed: 2,
    wanderRadius: 4,
    attackRange: 1.2,
    cooldown: 1,
    ...over,
  };
}
const walkable = () => true;
let _c = 0; const rand = () => (_c = (_c + 0.17) % 1);

describe("Creature AI state machine", () => {
  it("wanders when no target", () => {
    const mem: AiMemory = createMemory();
    const d1 = updateAi(mem, ctx({}), { dt: 0.1, isWalkable: walkable, rand });
    expect(["IDLE", "WANDER", "RETURN"]).toContain(d1.state);
    // over time it should settle into wander and move somewhere
    let moved = false;
    for (let i = 0; i < 10; i++) {
      const d = updateAi(mem, ctx({}), { dt: 0.5, isWalkable: walkable, rand });
      if (d.dx !== 0 || d.dy !== 0) moved = true;
    }
    expect(moved).toBe(true);
  });

  it("chases when player in vision", () => {
    const mem: AiMemory = createMemory();
    const c = ctx({ pos: { x: 0, y: 0 }, target: { x: 5, y: 0 } });
    const d = updateAi(mem, c, { dt: 0.1, isWalkable: walkable, rand });
    expect(d.state).toBe("CHASE");
    expect(d.dx).toBeGreaterThan(0);
  });

  it("attacks when in range", () => {
    const mem: AiMemory = createMemory();
    const c = ctx({ pos: { x: 0, y: 0 }, target: { x: 1, y: 0 } });
    const d = updateAi(mem, c, { dt: 0.1, isWalkable: walkable, rand });
    expect(d.state).toBe("ATTACK");
    expect(d.wantsAttack).toBe(true);
  });

  it("does not attack during cooldown", () => {
    const mem: AiMemory = createMemory({ cooldown: 5 });
    const c = ctx({ pos: { x: 0, y: 0 }, target: { x: 1, y: 0 } });
    const d = updateAi(mem, c, { dt: 0.1, isWalkable: walkable, rand });
    expect(d.wantsAttack).toBe(false);
  });

  it("returns home when far", () => {
    const mem: AiMemory = createMemory();
    const c = ctx({ pos: { x: 20, y: 0 }, home: { x: 0, y: 0 } });
    const d = updateAi(mem, c, { dt: 0.1, isWalkable: walkable, rand });
    expect(d.state).toBe("RETURN");
    expect(d.dx).toBeLessThan(0);
  });
});

describe("Creature", () => {
  it("steps and can move", () => {
    const c = new Creature("wolf", { x: 0, y: 0 });
    const before = { x: c.pos.x, y: c.pos.y };
    const r = c.step({ x: 0, y: 0 }, 0.1, walkable, rand);
    expect(typeof r.wantsAttack).toBe("boolean");
    expect(c.pos.x).toBe(before.x); // target at same spot, no chase displacement outside range
  });

  it("hits target dealing damage (armor considered)", () => {
    const c = new Creature("wolf", { x: 0, y: 0 }); // damage 5, armor handled
    const target = new LivingEntity({ id: "t", name: "target", pos: { x: 1, y: 0 }, maxHp: 30, armor: 0 });
    const dealt = c.hit(target);
    expect(dealt).toBe(5);
    expect(target.hp).toBe(25);
  });
});
