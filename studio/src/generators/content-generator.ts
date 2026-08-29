import { ITEMS } from "../../../shared/registries/items.js";
import { BLOCKS } from "../../../shared/registries/blocks.js";
import { BIOMES } from "../../../shared/registries/biomes.js";
import { RECIPES } from "../../../shared/registries/recipes.js";
import { CROPS } from "../../../shared/registries/crops.js";
import { ENEMIES } from "../../../shared/registries/enemies.js";
import { QUESTS } from "../../../shared/registries/quests.js";
import { NPC } from "../../../shared/registries/npc.js";

export type ContentPack = {
  version: number;
  items: typeof ITEMS;
  blocks: typeof BLOCKS;
  biomes: typeof BIOMES;
  recipes: typeof RECIPES;
  crops: typeof CROPS;
  enemies: typeof ENEMIES;
  quests: typeof QUESTS;
  npc: typeof NPC;
};

export function buildContentPack(version = 1): ContentPack {
  return {
    version,
    items: ITEMS,
    blocks: BLOCKS,
    biomes: BIOMES,
    recipes: RECIPES,
    crops: CROPS,
    enemies: ENEMIES,
    quests: QUESTS,
    npc: NPC,
  };
}
