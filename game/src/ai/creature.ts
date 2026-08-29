import { ENEMIES } from "../../../shared/registries/enemies.js";
import type { EnemyDef } from "../../../shared/types/content.js";
import type { Vec2 } from "../../../shared/types/world.js";
import { LivingEntity } from "../entities/entity.js";
import { createMemory, updateAi, type AiMemory } from "./state-machine.js";

export class Creature extends LivingEntity {
  defId: string;
  memory: AiMemory;
  wanderRadius: number;
  attackRange: number;
  cooldown: number;
  vision: number;
  aggroRange: number;
  home: Vec2;

  constructor(defId: string, pos: Vec2) {
    const def: EnemyDef | undefined = ENEMIES[defId];
    if (!def) throw new Error(`Unknown creature: ${defId}`);
    super({
      id: `creature-${pos.x}-${pos.y}-${Math.random().toString(36).slice(2)}`,
      name: def.name,
      pos,
      maxHp: def.maxHp,
      armor: def.armor,
      damage: def.damage,
      speed: def.speed,
      xp: def.xp,
    });
    this.defId = defId;
    this.home = { ...pos };
    this.vision = def.aggroRange * 1.4;
    this.aggroRange = def.aggroRange;
    this.attackRange = 1.2;
    this.cooldown = 1;
    this.wanderRadius = 8;
    this.memory = createMemory();
  }

  step(
    playerPos: Vec2,
    dt: number,
    isWalkable: (x: number, y: number) => boolean,
    rand: () => number,
  ): { wantsAttack: boolean } {
    const ctx = {
      pos: this.pos,
      home: this.home,
      target: playerPos,
      vision: this.vision,
      aggroRange: this.aggroRange,
      speed: this.speed,
      wanderRadius: this.wanderRadius,
      attackRange: this.attackRange,
      cooldown: this.cooldown,
    };
    const decision = updateAi(this.memory, ctx, { dt, isWalkable, rand });
    const stepDist = this.speed * dt;
    this.pos.x += decision.dx * stepDist;
    this.pos.y += decision.dy * stepDist;
    return { wantsAttack: decision.wantsAttack };
  }

  /** Resolve attack against target living entity. */
  hit(target: LivingEntity): number {
    const raw = this.damage;
    const blocked = Math.min(target.armor, raw * 0.5);
    const dealt = Math.max(0, raw - blocked);
    target.takeDamage(dealt);
    return dealt;
  }
}
