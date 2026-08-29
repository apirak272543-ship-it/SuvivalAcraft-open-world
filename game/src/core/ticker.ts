import type { EventBus } from "../../../shared/contracts/events.js";

export interface TickSubscriber {
  /** Called once per fixed tick. dt is in seconds. */
  onTick(dt: number, tick: number, eventBus: EventBus): void;
}

export const TICK_RATE = 20; // ticks per second
export const TICK_SECONDS = 1 / TICK_RATE;
