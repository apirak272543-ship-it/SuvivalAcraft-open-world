import type { Blueprint } from "../../../shared/types/state.js";
import { generateHouseBlueprint, generateCampfireBlueprint } from "../generators/blueprint-generator.js";

export class BlueprintManager {
  private blueprints = new Map<string, Blueprint>();

  constructor() {
    const house = generateHouseBlueprint();
    const campfire = generateCampfireBlueprint();
    this.blueprints.set(house.id, house);
    this.blueprints.set(campfire.id, campfire);
  }

  list(): Blueprint[] {
    return [...this.blueprints.values()];
  }

  get(id: string): Blueprint | undefined {
    return this.blueprints.get(id);
  }

  upsert(blueprint: Blueprint): void {
    this.blueprints.set(blueprint.id, blueprint);
  }

  delete(id: string): boolean {
    return this.blueprints.delete(id);
  }

  validate(blueprint: Blueprint): string[] {
    const errors: string[] = [];
    if (!blueprint.id) errors.push("blueprint ต้องมี id");
    if (blueprint.size.w < 1 || blueprint.size.h < 1) errors.push("ขนาด blueprint ต้องมากกว่า 0");
    for (const layer of blueprint.layers) {
      if (layer.rows.length !== blueprint.size.h) {
        errors.push(`layer "${layer.name}" มี ${layer.rows.length} แถว แต่ขนาดคือ ${blueprint.size.h}`);
      }
      for (const row of layer.rows) {
        if (row.length !== blueprint.size.w) {
          errors.push(`layer "${layer.name}" มีแถวยาว ${row.length} แต่ขนาดคือ ${blueprint.size.w}`);
        }
      }
    }
    return errors;
  }
}
