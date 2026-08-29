import { z } from "zod";

export const itemStackSchema = z.object({
  item: z.string(),
  count: z.number().int().positive(),
});

export const inventorySchema = z.object({
  slots: z.array(itemStackSchema.nullable()),
});

export const statBlockSchema = z.object({
  hp: z.number().nonnegative(),
  maxHp: z.number().positive(),
  hunger: z.number().nonnegative(),
  maxHunger: z.number().positive(),
  thirst: z.number().nonnegative(),
  maxThirst: z.number().positive(),
  stamina: z.number().nonnegative(),
  maxStamina: z.number().positive(),
  xp: z.number().nonnegative(),
  level: z.number().int().positive(),
});

export const questProgressSchema = z.object({
  questId: z.string(),
  progress: z.number().int().nonnegative(),
  complete: z.boolean(),
  claimed: z.boolean(),
});

export const playerStateSchema = z.object({
  id: z.string(),
  name: z.string(),
  pos: z.object({ x: z.number(), y: z.number() }),
  stats: statBlockSchema,
  inventory: inventorySchema,
  equipped: z.object({
    mainHand: z.string().optional(),
    armor: z.record(z.string(), z.string()).optional(),
  }),
  queue: z.array(questProgressSchema),
});
