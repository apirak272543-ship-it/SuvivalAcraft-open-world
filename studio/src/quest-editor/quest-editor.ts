import { QUESTS } from "../../../shared/registries/quests.js";
import type { QuestDef } from "../../../shared/types/content.js";
import { DataEditor } from "../editor/editor.js";

export class QuestEditor extends DataEditor {
  constructor(doc?: Record<string, unknown>) {
    super((doc ?? QUESTS) as unknown as Record<string, unknown>);
  }

  list(): QuestDef[] {
    return Object.values(this.getDocument()).map((v) => v as unknown as QuestDef);
  }
}
