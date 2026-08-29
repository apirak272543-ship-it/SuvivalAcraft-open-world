import { z } from "zod";

export const foodEffectSchema = z.object({
  hunger: z.number().int().nonnegative(),
  thirst: z.number().int().nonnegative().optional(),
  health: z.number().int().optional(),
});

export const itemDefSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(["material", "tool", "weapon", "armor", "food", "seed", "structure", "misc"]),
  stackLimit: z.number().int().positive(),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  tags: z.array(z.string()),
  description: z.string().optional(),
  food: foodEffectSchema.optional(),
  durability: z.number().int().positive().optional(),
});

export const lootEntrySchema = z.object({
  item: z.string(),
  min: z.number().int().nonnegative(),
  max: z.number().int().nonnegative(),
  chance: z.number().min(0).max(1).optional(),
});

export const blockDefSchema = z.object({
  id: z.string(),
  name: z.string(),
  hardness: z.number().nonnegative(),
  solid: z.boolean(),
  transparent: z.boolean().optional(),
  flammable: z.boolean().optional(),
  soil: z.boolean().optional(),
  tool: z.object({ type: z.string(), level: z.number().int().positive() }).optional(),
  drops: z.array(lootEntrySchema).optional(),
});

export const biomeDefSchema = z.object({
  id: z.string(),
  name: z.string(),
  temperature: z.number().min(0).max(1),
  humidity: z.number().min(0).max(1),
  surface: z.string(),
  subSoil: z.string(),
  treeDensity: z.number().min(0).max(1),
  oreTier: z.number().int().positive(),
  enemies: z.array(z.string()),
});

export const ingredientSchema = z.object({
  item: z.string(),
  count: z.number().int().positive(),
});

export const recipeDefSchema = z.object({
  id: z.string(),
  name: z.string(),
  station: z.string(),
  result: z.object({ item: z.string(), count: z.number().int().positive() }),
  ingredients: z.array(ingredientSchema),
});

export const cropDefSchema = z.object({
  id: z.string(),
  name: z.string(),
  seedItem: z.string(),
  soilGroups: z.array(z.string()),
  stages: z.array(z.object({
    durationTicks: z.number().int().positive(),
    block: z.string(),
  })),
  harvest: lootEntrySchema,
});

export const enemyDefSchema = z.object({
  id: z.string(),
  name: z.string(),
  maxHp: z.number().positive(),
  damage: z.number().nonnegative(),
  armor: z.number().nonnegative(),
  speed: z.number().nonnegative(),
  xp: z.number().nonnegative(),
  aggroRange: z.number().nonnegative(),
  habitat: z.array(z.string()),
  drops: z.array(lootEntrySchema),
});

export const npcDefSchema = z.object({
  id: z.string(),
  name: z.string(),
  trades: z.array(z.object({
    receive: ingredientSchema,
    give: ingredientSchema,
  })),
});

export const questDefSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  objective: z.object({
    type: z.enum(["gather", "craft", "kill", "build", "explore"]),
    target: z.string(),
    count: z.number().int().positive(),
  }),
  reward: z.object({
    xp: z.number().nonnegative().optional(),
    items: z.array(ingredientSchema).optional(),
  }),
});
