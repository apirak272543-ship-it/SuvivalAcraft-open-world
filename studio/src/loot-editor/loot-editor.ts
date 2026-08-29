import { BLOCKS } from "../../../shared/registries/blocks.js";
import { ENEMIES } from "../../../shared/registries/enemies.js";
import type { LootEntry } from "../../../shared/types/content.js";

export interface LootTable {
  source: string;
  kind: "block" | "enemy";
  entries: LootEntry[];
}

export class LootEditor {
  tables(): LootTable[] {
    const blockTables: LootTable[] = Object.values(BLOCKS)
      .filter((b) => b.drops && b.drops.length > 0)
      .map((b) => ({ source: b.id, kind: "block", entries: b.drops ?? [] }));
    const enemyTables: LootTable[] = Object.values(ENEMIES).map((e) => ({ source: e.id, kind: "enemy", entries: e.drops }));
    return [...blockTables, ...enemyTables];
  }

  maxRoll(table: LootTable): number {
    return table.entries.reduce((sum, e) => sum + e.max, 0);
  }
}
