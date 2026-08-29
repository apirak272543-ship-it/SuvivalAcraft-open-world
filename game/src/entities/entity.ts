import type { Vec2 } from "../../../shared/types/world.js";

export interface Entity {
  id: string;
  kind: "player" | "enemy" | "npc" | "item";
  pos: Vec2;
}

export class LivingEntity {
  id: string;
  name: string;
  pos: Vec2;
  hp: number;
  maxHp: number;
  armor: number;
  damage: number;
  speed: number;
  xp: number;

  constructor(init: {
    id: string; name: string; pos: Vec2;
    maxHp: number; armor?: number; damage?: number; speed?: number; xp?: number;
  }) {
    this.id = init.id;
    this.name = init.name;
    this.pos = init.pos;
    this.maxHp = init.maxHp;
    this.hp = init.maxHp;
    this.armor = init.armor ?? 0;
    this.damage = init.damage ?? 1;
    this.speed = init.speed ?? 2;
    this.xp = init.xp ?? 0;
  }

  isAlive(): boolean {
    return this.hp > 0;
  }

  takeDamage(amount: number): number {
    const blocked = Math.min(this.armor, amount * 0.5);
    const dealt = Math.max(0, amount - blocked);
    this.hp = Math.max(0, this.hp - dealt);
    return dealt;
  }
}
