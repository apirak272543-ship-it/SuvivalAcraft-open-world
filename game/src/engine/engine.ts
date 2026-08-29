import type { EventBus } from "../../../shared/contracts/events.js";
import { SimpleEventBus } from "../core/events.js";
import { TICK_SECONDS } from "../core/ticker.js";
import type { TickSubscriber } from "../core/ticker.js";

export class GameEngine {
  readonly eventBus: EventBus;
  private subscribers: TickSubscriber[] = [];
  private tickCount = 0;
  private time = 0;
  private running = false;
  private lastFrame?: number;

  constructor(eventBus?: EventBus) {
    this.eventBus = eventBus ?? new SimpleEventBus();
  }

  addSystem(system: TickSubscriber): void {
    this.subscribers.push(system);
  }

  start(): void {
    this.running = true;
    this.lastFrame = undefined;
  }

  stop(): void {
    this.running = false;
  }

  isRunning(): boolean {
    return this.running;
  }

  get elapsedSeconds(): number {
    return this.time;
  }

  get tick(): number {
    return this.tickCount;
  }

  /** Advance the simulation manually (deterministic tests use fixed steps). */
  step(dt = TICK_SECONDS): void {
    this.time += dt;
    this.tickCount += 1;
    for (const s of this.subscribers) s.onTick(dt, this.tickCount, this.eventBus);
  }

  /** Frame-driven loop for real-time use. */
  frame(nowMs: number): void {
    if (!this.running) return;
    if (this.lastFrame === undefined) {
      this.lastFrame = nowMs;
      return;
    }
    const dt = (nowMs - this.lastFrame) / 1000;
    this.lastFrame = nowMs;
    if (dt > 0) this.step(dt);
  }
}
