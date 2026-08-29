import { ENEMIES } from "../../../shared/registries/enemies.js";
import type { EnemyDef } from "../../../shared/types/content.js";
import type { Vec2 } from "../../../shared/types/world.js";
import { LivingEntity } from "../entities/entity.js";
import { dist2 } from "../core/math.js";

export class Enemy extends LivingEntity {
  defId: string;
  aggroRange: number;
  aggro: boolean;
  target?: string;

  constructor(defId: string, pos: Vec2) {
    const def = ENEMIES[defId] as EnemyDef | undefined;
    if (!def) throw new Error(`Unknown enemy: ${defId}`);
    super({
      id: `enemy-${pos.x}-${pos.y}-${Math.random().toString(36).slice(2)}`,
      name: def.name,
      pos,
      maxHp: def.maxHp,
      armor: def.armor,
      damage: def.damage,
      speed: def.speed,
      xp: def.xp,
    });
    this.defId = defId;
    this.aggroRange = def.aggroRange;
    this.aggro = false;
  }

  /** Returns true if the player is within aggro range. */
  updateAggro(playerPos: Vec2): void {
    this.aggro = dist2(this.pos, playerPos) <= this.aggroRange;
    this.target = this.aggro ? "player" : undefined;
  }

  moveToward(target: Vec2, dt: number): void {
    if (!this.aggro) return;
    const dx = target.x - this.pos.x;
    const dy = target.y - this.pos.y;
    const len = Math.hypot(dx, dy);
    if (len < 1) return;
    const step = this.speed * dt;
    this.pos.x += (dx / len) * step;
    this.pos.y += (dy / len) * step;
  }
}
