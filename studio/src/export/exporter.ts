import type { ContentPack } from "../generators/content-generator.js";
import { buildContentPack } from "../generators/content-generator.js";

export interface ExportResult {
  ok: boolean;
  files: Record<string, string>;
}

export function exportContentPack(pack?: ContentPack): ExportResult {
  const content = pack ?? buildContentPack();
  const files: Record<string, string> = {
    "content/manifest.json": JSON.stringify({ version: content.version, generatedAt: new Date().toISOString() }, null, 2),
    "content/items.json": JSON.stringify(content.items, null, 2),
    "content/blocks.json": JSON.stringify(content.blocks, null, 2),
    "content/biomes.json": JSON.stringify(content.biomes, null, 2),
    "content/recipes.json": JSON.stringify(content.recipes, null, 2),
    "content/crops.json": JSON.stringify(content.crops, null, 2),
    "content/enemies.json": JSON.stringify(content.enemies, null, 2),
    "content/quests.json": JSON.stringify(content.quests, null, 2),
    "content/npc.json": JSON.stringify(content.npc, null, 2),
  };
  return { ok: true, files };
}
