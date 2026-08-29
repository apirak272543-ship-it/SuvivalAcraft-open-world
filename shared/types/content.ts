export type ItemCategory = "material" | "tool" | "weapon" | "armor" | "food" | "seed" | "structure" | "misc";

export interface FoodEffect {
  hunger: number;
  thirst?: number;
  health?: number;
}

export interface ItemDef {
  id: string;
  name: string;
  category: ItemCategory;
  stackLimit: number;
  tier: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  description?: string;
  food?: FoodEffect;
  durability?: number;
}

export interface LootEntry {
  item: string;
  min: number;
  max: number;
  chance?: number;
}

export interface BlockDef {
  id: string;
  name: string;
  hardness: number;
  solid: boolean;
  transparent?: boolean;
  flammable?: boolean;
  soil?: boolean;
  tool?: { type: string; level: number };
  drops?: LootEntry[];
  replaceableBy?: string;
}

export interface BiomeDef {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  surface: string;
  subSoil: string;
  treeDensity: number;
  oreTier: number;
  enemies: string[];
}

export interface Ingredient {
  item: string;
  count: number;
}

export interface RecipeDef {
  id: string;
  name: string;
  station: string;
  result: { item: string; count: number };
  ingredients: Ingredient[];
}

export interface CropStage {
  durationTicks: number;
  block: string;
}

export interface CropDef {
  id: string;
  name: string;
  seedItem: string;
  soilGroups: string[];
  stages: CropStage[];
  harvest: LootEntry;
}

export interface EnemyDef {
  id: string;
  name: string;
  maxHp: number;
  damage: number;
  armor: number;
  speed: number;
  xp: number;
  aggroRange: number;
  habitat: string[];
  drops: LootEntry[];
}

export interface TradeOffer {
  receive: Ingredient;
  give: Ingredient;
}

export interface NpcDef {
  id: string;
  name: string;
  trades: TradeOffer[];
}

export interface QuestObjective {
  type: "gather" | "craft" | "kill" | "build" | "explore";
  target: string;
  count: number;
}

export interface QuestReward {
  xp?: number;
  items?: Ingredient[];
}

export interface QuestDef {
  id: string;
  name: string;
  description: string;
  objective: QuestObjective;
  reward: QuestReward;
}
