import type { ItemDef } from "../types/content.js";

export const ITEMS: Record<string, ItemDef> = {
  // Materials
  wood: { id: "wood", name: "ไม้", category: "material", stackLimit: 64, tier: 1, tags: ["wood", "fuel", "material"] },
  stick: { id: "stick", name: "ไม้ท่อน", category: "material", stackLimit: 64, tier: 1, tags: ["wood", "material"] },
  stone: { id: "stone", name: "หิน", category: "material", stackLimit: 64, tier: 1, tags: ["stone", "material"] },
  flint: { id: "flint", name: "หินเหล็กไฟ", category: "material", stackLimit: 64, tier: 2, tags: ["stone", "material"] },
  iron_ore: { id: "iron_ore", name: "แร่เหล็ก", category: "material", stackLimit: 64, tier: 2, tags: ["ore", "material"] },
  iron_ingot: { id: "iron_ingot", name: "เหล็กแท่ง", category: "material", stackLimit: 64, tier: 3, tags: ["metal", "material"] },
  coal: { id: "coal", name: "ถ่านหิน", category: "material", stackLimit: 64, tier: 2, tags: ["fuel", "material"] },
  fiber: { id: "fiber", name: "เส้นใย", category: "material", stackLimit: 64, tier: 1, tags: ["fiber", "material"] },
  leather: { id: "leather", name: "หนัง", category: "material", stackLimit: 64, tier: 2, tags: ["material"] },
  // Materials (block drops)
  dirt: { id: "dirt", name: "ดิน", category: "material", stackLimit: 64, tier: 1, tags: ["material"] },
  sand: { id: "sand", name: "ทราย", category: "material", stackLimit: 64, tier: 1, tags: ["material"] },
  leaves: { id: "leaves", name: "ใบไม้", category: "material", stackLimit: 64, tier: 1, tags: ["material"] },
  cobblestone: { id: "cobblestone", name: "กรวด", category: "material", stackLimit: 64, tier: 1, tags: ["stone", "material"] },
  wood_planks: { id: "wood_planks", name: "ไม้กระดาน", category: "structure", stackLimit: 64, tier: 1, tags: ["wood"] },
  wood_block: { id: "wood_block", name: "บล็อกไม้", category: "structure", stackLimit: 64, tier: 1, tags: ["structure"] },
  stone_block: { id: "stone_block", name: "บล็อกหิน", category: "structure", stackLimit: 64, tier: 1, tags: ["structure"] },
  // Tools
  wood_pickaxe: { id: "wood_pickaxe", name: "จอบไม้", category: "tool", stackLimit: 1, tier: 1, tags: ["pickaxe"], durability: 60 },
  stone_pickaxe: { id: "stone_pickaxe", name: "จอบหิน", category: "tool", stackLimit: 1, tier: 2, tags: ["pickaxe"], durability: 130 },
  iron_pickaxe: { id: "iron_pickaxe", name: "จอบเหล็ก", category: "tool", stackLimit: 1, tier: 3, tags: ["pickaxe"], durability: 250 },
  wood_axe: { id: "wood_axe", name: "ขวานไม้", category: "tool", stackLimit: 1, tier: 1, tags: ["axe"], durability: 60 },
  stone_axe: { id: "stone_axe", name: "ขวานหิน", category: "tool", stackLimit: 1, tier: 2, tags: ["axe"], durability: 130 },
  // Weapons
  wood_sword: { id: "wood_sword", name: "ดาบไม้", category: "weapon", stackLimit: 1, tier: 1, tags: ["sword", "melee"], durability: 60 },
  stone_sword: { id: "stone_sword", name: "ดาบหิน", category: "weapon", stackLimit: 1, tier: 2, tags: ["sword", "melee"], durability: 130 },
  iron_sword: { id: "iron_sword", name: "ดาบเหล็ก", category: "weapon", stackLimit: 1, tier: 3, tags: ["sword", "melee"], durability: 250 },
  // Food
  apple: { id: "apple", name: "แอปเปิล", category: "food", stackLimit: 64, tier: 1, tags: ["food"], food: { hunger: 6 } },
  cooked_meat: { id: "cooked_meat", name: "เนื้อสุก", category: "food", stackLimit: 64, tier: 2, tags: ["food"], food: { hunger: 10 } },
  raw_meat: { id: "raw_meat", name: "เนื้อดิบ", category: "food", stackLimit: 64, tier: 1, tags: ["food"], food: { hunger: 5 } },
  bread: { id: "bread", name: "ขนมปัง", category: "food", stackLimit: 64, tier: 2, tags: ["food"], food: { hunger: 8 } },
  // Seeds / crops
  wheat_seed: { id: "wheat_seed", name: "เมล็ดข้าวสาลี", category: "seed", stackLimit: 64, tier: 1, tags: ["seed"] },
  wheat: { id: "wheat", name: "ข้าวสาลี", category: "material", stackLimit: 64, tier: 1, tags: ["crop", "material"] },
  cobblestone_block: { id: "cobblestone_block", name: "บล็อกกรวด", category: "structure", stackLimit: 64, tier: 1, tags: ["structure"] },
  // Misc
  torch: { id: "torch", name: "คบเพลิง", category: "misc", stackLimit: 64, tier: 1, tags: ["light"] },
};

export function getItem(id: string): ItemDef | undefined {
  return ITEMS[id];
}

export function isFood(id: string): boolean {
  return ITEMS[id]?.category === "food";
}
