import { ENEMIES } from "../../../shared/registries/enemies.js";
import type { EnemyDef } from "../../../shared/types/content.js";
import { DataEditor } from "../editor/editor.js";

export class MobEditor extends DataEditor {
  constructor(doc?: Record<string, unknown>) {
    super((doc ?? ENEMIES) as unknown as Record<string, unknown>);
  }

  list(): EnemyDef[] {
    return Object.values(this.getDocument()).map((v) => v as unknown as EnemyDef);
  }
}
