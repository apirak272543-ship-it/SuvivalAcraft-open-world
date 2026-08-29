import type { RecipeDef } from "../types/content.js";

export const RECIPES: RecipeDef[] = [
  { id: "stick", name: "ไม้ท่อน", station: "crafting_table", result: { item: "stick", count: 4 }, ingredients: [{ item: "wood", count: 1 }] },
  { id: "wood_planks", name: "ไม้กระดาน", station: "crafting_table", result: { item: "wood_planks", count: 4 }, ingredients: [{ item: "wood", count: 1 }] },
  { id: "wood_pickaxe", name: "จอบไม้", station: "crafting_table", result: { item: "wood_pickaxe", count: 1 }, ingredients: [{ item: "stick", count: 2 }, { item: "wood_planks", count: 3 }] },
  { id: "wood_axe", name: "ขวานไม้", station: "crafting_table", result: { item: "wood_axe", count: 1 }, ingredients: [{ item: "stick", count: 2 }, { item: "wood_planks", count: 3 }] },
  { id: "wood_sword", name: "ดาบไม้", station: "crafting_table", result: { item: "wood_sword", count: 1 }, ingredients: [{ item: "stick", count: 1 }, { item: "wood_planks", count: 2 }] },
  { id: "stone_pickaxe", name: "จอบหิน", station: "crafting_table", result: { item: "stone_pickaxe", count: 1 }, ingredients: [{ item: "stick", count: 2 }, { item: "stone", count: 3 }] },
  { id: "stone_sword", name: "ดาบหิน", station: "crafting_table", result: { item: "stone_sword", count: 1 }, ingredients: [{ item: "stick", count: 1 }, { item: "stone", count: 2 }] },
  { id: "iron_ingot", name: "เหล็กแท่ง", station: "furnace", result: { item: "iron_ingot", count: 1 }, ingredients: [{ item: "iron_ore", count: 1 }, { item: "coal", count: 1 }] },
  { id: "iron_pickaxe", name: "จอบเหล็ก", station: "crafting_table", result: { item: "iron_pickaxe", count: 1 }, ingredients: [{ item: "stick", count: 2 }, { item: "iron_ingot", count: 3 }] },
  { id: "iron_sword", name: "ดาบเหล็ก", station: "crafting_table", result: { item: "iron_sword", count: 1 }, ingredients: [{ item: "stick", count: 1 }, { item: "iron_ingot", count: 2 }] },
  { id: "bread", name: "ขนมปัง", station: "furnace", result: { item: "bread", count: 1 }, ingredients: [{ item: "wheat", count: 3 }] },
  { id: "torch", name: "คบเพลิง", station: "crafting_table", result: { item: "torch", count: 4 }, ingredients: [{ item: "stick", count: 1 }, { item: "coal", count: 1 }] },
  { id: "fence", name: "รั้ว", station: "crafting_table", result: { item: "fence", count: 4 }, ingredients: [{ item: "stick", count: 2 }, { item: "wood_planks", count: 2 }] },
  { id: "wall", name: "กำแพงหิน", station: "crafting_table", result: { item: "wall", count: 1 }, ingredients: [{ item: "stone", count: 4 }] },
  { id: "door", name: "ประตู", station: "crafting_table", result: { item: "door", count: 1 }, ingredients: [{ item: "wood_planks", count: 6 }] },
  { id: "cobblestone_block", name: "บล็อกกรวด", station: "crafting_table", result: { item: "cobblestone_block", count: 1 }, ingredients: [{ item: "cobblestone", count: 4 }] },
];

export function recipesFor(station: string): RecipeDef[] {
  return RECIPES.filter((r) => r.station === station);
}

export function recipeById(id: string): RecipeDef | undefined {
  return RECIPES.find((r) => r.id === id);
}
