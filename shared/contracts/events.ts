export type GameEvent =
  | { type: "block_break"; pos: { x: number; y: number }; block: string; drops: string[] }
  | { type: "block_place"; pos: { x: number; y: number }; block: string }
  | { type: "item_crafted"; recipe: string; result: string; count: number }
  | { type: "item_gathered"; item: string; count: number }
  | { type: "enemy_killed"; enemy: string; xp: number }
  | { type: "player_damaged"; amount: number; hp: number }
  | { type: "player_healed"; amount: number; hp: number }
  | { type: "quest_progress"; questId: string; progress: number }
  | { type: "quest_complete"; questId: string }
  | { type: "crop_planted"; cropId: string; plotKey: string }
  | { type: "crop_harvested"; cropId: string; plotKey: string }
  | { type: "survival_tick"; hunger: number; thirst: number; hp: number };

export interface EventBus {
  emit(event: GameEvent): void;
  subscribe(fn: (event: GameEvent) => void): () => void;
}
