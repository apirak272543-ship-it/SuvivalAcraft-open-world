import type { EventBus, GameEvent } from "../../../shared/contracts/events.js";

export class SimpleEventBus implements EventBus {
  private handlers = new Set<(event: GameEvent) => void>();

  emit(event: GameEvent): void {
    for (const handler of this.handlers) handler(event);
  }

  subscribe(fn: (event: GameEvent) => void): () => void {
    this.handlers.add(fn);
    return () => this.handlers.delete(fn);
  }
}
