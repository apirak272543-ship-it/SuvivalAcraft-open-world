import { RECIPES } from "../../../shared/registries/recipes.js";
import type { RecipeDef } from "../../../shared/types/content.js";
import { DataEditor } from "../editor/editor.js";

export class RecipeEditor extends DataEditor {
  constructor(doc?: Record<string, unknown>) {
    super((doc ?? { recipes: RECIPES }) as Record<string, unknown>);
  }

  list(): RecipeDef[] {
    const raw = this.get<{ recipes: RecipeDef[] }>("recipes");
    return raw.ok && raw.value ? raw.value.recipes : [];
  }
}
