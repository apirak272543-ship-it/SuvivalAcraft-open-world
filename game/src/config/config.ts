import { z } from "zod";

export const gameConfigSchema = z.object({
  worldName: z.string(),
  seed: z.number().int(),
  chunkSize: z.number().int().positive(),
  radiusChunks: z.number().int().positive(),
  dayLengthSeconds: z.number().positive(),
  survival: z.object({
    hungerPerSecond: z.number().nonnegative(),
    thirstPerSecond: z.number().nonnegative(),
    regenHungerThreshold: z.number().min(0).max(1),
    regenPerSecond: z.number().nonnegative(),
    starvationDamagePerSecond: z.number().nonnegative(),
  }),
});

export type GameConfig = z.infer<typeof gameConfigSchema>;

export const DEFAULT_CONFIG: GameConfig = {
  worldName: "โลกลิขิต",
  seed: 1337,
  chunkSize: 16,
  radiusChunks: 3,
  dayLengthSeconds: 1200,
  survival: {
    hungerPerSecond: 0.08,
    thirstPerSecond: 0.06,
    regenHungerThreshold: 0.75,
    regenPerSecond: 0.5,
    starvationDamagePerSecond: 1,
  },
};

export function loadConfig(cfg: unknown): GameConfig {
  return gameConfigSchema.parse(cfg ?? DEFAULT_CONFIG);
}
