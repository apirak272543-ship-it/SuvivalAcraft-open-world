import type { Ingredient } from "./content.js";

export interface ItemStack {
  item: string;
  count: number;
}

export interface InventoryState {
  slots: (ItemStack | null)[];
}

export interface StatBlock {
  hp: number;
  maxHp: number;
  hunger: number;
  maxHunger: number;
  thirst: number;
  maxThirst: number;
  stamina: number;
  maxStamina: number;
  xp: number;
  level: number;
}

export interface PlayerState {
  id: string;
  name: string;
  pos: { x: number; y: number };
  stats: StatBlock;
  inventory: InventoryState;
  equipped: { mainHand?: string; armor?: Record<string, string> };
  queue: QuestProgress[];
}

export interface QuestProgress {
  questId: string;
  progress: number;
  complete: boolean;
  claimed: boolean;
}

export interface CropPlot {
  cropId: string;
  stage: number;
  ticksLeftInStage: number;
  plantedTick: number;
  soilBlock: string;
}

export interface FarmState {
  plots: Record<string, CropPlot>;
}

export interface EnemyState {
  id: string;
  defId: string;
  pos: { x: number; y: number };
  hp: number;
  aggro: boolean;
  target?: string;
}

export interface Blueprint {
  id: string;
  name: string;
  size: { w: number; h: number };
  layers: {
    name: string;
    rows: string[];
  }[];
}

export interface Snapshot {
  version: number;
  savedAt: number;
  settings: { seed: number; worldName: string; dayLengthSeconds: number };
  player: PlayerState;
  world: {
    timeSeconds: number;
    chunks: Record<string, string[]>;
  };
  farms: FarmState;
  enemies: EnemyState[];
  quests: QuestProgress[];
}
