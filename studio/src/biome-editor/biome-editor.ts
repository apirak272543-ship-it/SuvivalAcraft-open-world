import { BIOMES } from "../../../shared/registries/biomes.js";
import type { BiomeDef } from "../../../shared/types/content.js";
import { DataEditor } from "../editor/editor.js";

export class BiomeEditor extends DataEditor {
  constructor(doc?: Record<string, unknown>) {
    super((doc ?? BIOMES) as unknown as Record<string, unknown>);
  }

  list(): BiomeDef[] {
    return Object.values(this.getDocument()).map((v) => v as unknown as BiomeDef);
  }

  byId(id: string): BiomeDef | undefined {
    return this.list().find((b) => b.id === id);
  }
}
