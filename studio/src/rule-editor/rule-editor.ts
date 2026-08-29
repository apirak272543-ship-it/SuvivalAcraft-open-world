import type { WorldRules } from "../../../shared/types/world.js";

export const DEFAULT_RULES: WorldRules = {
  friendlyFire: false,
  keepInventoryOnDeath: true,
  hungerEnabled: true,
  thirstEnabled: true,
  mobSpawning: true,
};

export class RuleEditor {
  private rules: WorldRules;

  constructor(rules?: Partial<WorldRules>) {
    this.rules = { ...DEFAULT_RULES, ...rules };
  }

  get(): WorldRules {
    return { ...this.rules };
  }

  set<T extends keyof WorldRules>(key: T, value: WorldRules[T]): WorldRules {
    this.rules[key] = value;
    return this.get();
  }

  toggle(key: keyof WorldRules): boolean {
    const current = this.rules[key];
    if (typeof current === "boolean") {
      this.rules[key] = !current as never;
    }
    return this.rules[key] as boolean;
  }
}
