import { describe, it, expect } from "vitest";
import { GameEngine } from "../game/src/engine/engine.js";
import type { TickSubscriber } from "../game/src/core/ticker.js";
import type { EventBus } from "../shared/contracts/events.js";

class Counter implements TickSubscriber {
  calls = 0;
  onTick(_dt: number, _tick: number, _bus: EventBus): void {
    this.calls++;
  }
}

describe("GameEngine", () => {
  it("steps fixed ticks and accumulates time", () => {
    const engine = new GameEngine();
    const counter = new Counter();
    engine.addSystem(counter);
    engine.step(0.05);
    engine.step(0.05);
    expect(engine.tick).toBe(2);
    expect(counter.calls).toBe(2);
    expect(engine.elapsedSeconds).toBeCloseTo(0.1);
  });

  it("frame only ticks when running", () => {
    const engine = new GameEngine();
    const counter = new Counter();
    engine.addSystem(counter);
    engine.frame(1000);
    expect(counter.calls).toBe(0); // just sets lastFrame
    engine.start();
    engine.frame(2000); // initializes lastFrame
    engine.frame(3000); // dt=1
    expect(counter.calls).toBe(1);
  });
});
