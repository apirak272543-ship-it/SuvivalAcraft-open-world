import { ENEMIES } from "../../../shared/registries/enemies.js";

export interface SpawnRule {
  enemyId: string;
  biome: string;
  weight: number;
  timeOfDay: "day" | "night" | "any";
}

export class SpawnEditor {
  constructor(private rules: SpawnRule[]) {}

  list(): SpawnRule[] {
    return this.rules;
  }

  add(rule: SpawnRule): void {
    this.rules.push(rule);
  }

  remove(enemyId: string, biome: string): boolean {
    const i = this.rules.findIndex((r) => r.enemyId === enemyId && r.biome === biome);
    if (i < 0) return false;
    this.rules.splice(i, 1);
    return true;
  }

  /** Build default rules from enemy habitats. */
  static buildDefaults(): SpawnRule[] {
    const rules: SpawnRule[] = [];
    for (const enemy of Object.values(ENEMIES)) {
      for (const biome of enemy.habitat) {
        rules.push({ enemyId: enemy.id, biome, weight: 1, timeOfDay: "any" });
      }
    }
    return rules;
  }
}
