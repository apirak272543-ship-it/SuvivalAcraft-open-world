import { CROPS } from "../../../shared/registries/crops.js";
import type { CropDef } from "../../../shared/types/content.js";
import { DataEditor } from "../editor/editor.js";

export class FarmingEditor extends DataEditor {
  constructor(doc?: Record<string, unknown>) {
    super((doc ?? CROPS) as unknown as Record<string, unknown>);
  }

  list(): CropDef[] {
    return Object.values(this.getDocument()).map((v) => v as unknown as CropDef);
  }
}
