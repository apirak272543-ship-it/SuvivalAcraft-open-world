import { NPC } from "../../../shared/registries/npc.js";
import type { NpcDef } from "../../../shared/types/content.js";
import { DataEditor } from "../editor/editor.js";

export class NpcEditor extends DataEditor {
  constructor(doc?: Record<string, unknown>) {
    super((doc ?? NPC) as unknown as Record<string, unknown>);
  }

  list(): NpcDef[] {
    return Object.values(this.getDocument()).map((v) => v as unknown as NpcDef);
  }
}
