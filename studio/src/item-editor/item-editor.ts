import { ITEMS } from "../../../shared/registries/items.js";
import type { ItemDef } from "../../../shared/types/content.js";
import { DataEditor } from "../editor/editor.js";

export class ItemEditor extends DataEditor {
  constructor(doc?: Record<string, unknown>) {
    super((doc ?? ITEMS) as unknown as Record<string, unknown>);
  }

  list(): ItemDef[] {
    return Object.values(this.getDocument()).map((v) => v as unknown as ItemDef);
  }
}
