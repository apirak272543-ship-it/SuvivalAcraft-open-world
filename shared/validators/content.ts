import { BLOCKS } from "../registries/blocks.js";
import { ITEMS } from "../registries/items.js";
import { RECIPES } from "../registries/recipes.js";
import { CROPS } from "../registries/crops.js";
import { ENEMIES } from "../registries/enemies.js";
import { QUESTS } from "../registries/quests.js";

export interface ContentIssue {
  severity: "error" | "warning";
  where: string;
  message: string;
}

export function validateContent(): ContentIssue[] {
  const issues: ContentIssue[] = [];

  const knownItems = new Set(Object.keys(ITEMS));
  const knownBlocks = new Set(Object.keys(BLOCKS));

  // Recipes
  for (const recipe of RECIPES) {
    if (!knownItems.has(recipe.result.item)) {
      issues.push({ severity: "error", where: `recipe:${recipe.id}`, message: `ผลลัพธ์ ${recipe.result.item} ไม่มีใน ITEMS` });
    }
    for (const ing of recipe.ingredients) {
      if (!knownItems.has(ing.item)) {
        issues.push({ severity: "error", where: `recipe:${recipe.id}`, message: `วัตถุดิบ ${ing.item} ไม่มีใน ITEMS` });
      }
    }
  }

  // Crops
  for (const crop of Object.values(CROPS)) {
    if (!knownItems.has(crop.seedItem)) {
      issues.push({ severity: "error", where: `crop:${crop.id}`, message: `เมล็ด ${crop.seedItem} ไม่มีใน ITEMS` });
    }
    if (!knownItems.has(crop.harvest.item)) {
      issues.push({ severity: "error", where: `crop:${crop.id}`, message: `ผลผลิต ${crop.harvest.item} ไม่มีใน ITEMS` });
    }
    for (const stage of crop.stages) {
      if (!knownBlocks.has(stage.block)) {
        issues.push({ severity: "error", where: `crop:${crop.id}`, message: `บล็อกระยะ ${stage.block} ไม่มีใน BLOCKS` });
      }
    }
  }

  // Blocks drops
  for (const block of Object.values(BLOCKS)) {
    for (const drop of block.drops ?? []) {
      if (drop.min > drop.max) {
        issues.push({ severity: "warning", where: `block:${block.id}`, message: "min มากกว่า max ในการดรอป" });
      }
      if (!knownItems.has(drop.item)) {
        issues.push({ severity: "error", where: `block:${block.id}`, message: `ดรอป ${drop.item} ไม่มีใน ITEMS` });
      }
    }
  }

  // Enemies
  for (const enemy of Object.values(ENEMIES)) {
    for (const drop of enemy.drops) {
      if (!knownItems.has(drop.item)) {
        issues.push({ severity: "error", where: `enemy:${enemy.id}`, message: `ดรอป ${drop.item} ไม่มีใน ITEMS` });
      }
    }
  }

  // Quests
  for (const quest of Object.values(QUESTS)) {
    if (quest.objective.type === "gather") {
      if (!knownItems.has(quest.objective.target)) {
        issues.push({ severity: "error", where: `quest:${quest.id}`, message: `เป้าหมาย ${quest.objective.target} ไม่มีใน ITEMS` });
      }
    }
    for (const item of quest.reward.items ?? []) {
      if (!knownItems.has(item.item)) {
        issues.push({ severity: "error", where: `quest:${quest.id}`, message: `รางวัล ${item.item} ไม่มีใน ITEMS` });
      }
    }
  }

  return issues;
}
