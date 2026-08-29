/** Minimal deterministic AI state machine: IDLE/WANDER/SEARCH/CHASE/ATTACK/FLEE/RETURN */

export type AiState =
  | "IDLE"
  | "WANDER"
  | "SENSE"
  | "SEARCH"
  | "CHASE"
  | "ATTACK"
  | "FLEE"
  | "RETURN";

export interface AiContext {
  /** world-relative position */
  pos: { x: number; y: number };
  /** home/wander anchor */
  home: { x: number; y: number };
  /** detected player position (if any) */
  target?: { x: number; y: number };
  /** rationality level, e.g. vision radius */
  vision: number;
  aggroRange: number;
  speed: number;
  wanderRadius: number;
  attackRange: number;
  cooldown: number;
}

export interface AiDecision {
  state: AiState;
  /** normalized direction vector * speed (engine applies) */
  dx: number;
  dy: number;
  wantsAttack: boolean;
  wantsFlee: boolean;
}

export interface AiMemory {
  state: AiState;
  stateTime: number;
  target?: { x: number; y: number };
  wanderTarget?: { x: number; y: number };
  lastSeen?: { x: number; y: number };
  cooldown: number;
}

export function createMemory(initial?: Partial<AiMemory>): AiMemory {
  return { state: "IDLE", stateTime: 0, cooldown: 0, ...initial };
}

function dist(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function dirTo(a: { x: number; y: number }, b: { x: number; y: number }): { dx: number; dy: number } {
  const d = dist(a, b);
  if (d < 0.001) return { dx: 0, dy: 0 };
  return { dx: (b.x - a.x) / d, dy: (b.y - a.y) / d };
}

export interface UpdateOptions {
  dt: number;
  /** function to check if a tile is walkable */
  isWalkable: (x: number, y: number) => boolean;
  /** random float [0,1) */
  rand: () => number;
}

const WANDER_SWITCH_TIME = 4;
const RETURN_EPS = 1;

export function updateAi(mem: AiMemory, ctx: AiContext, opts: UpdateOptions): AiDecision {
  mem.stateTime += opts.dt;
  mem.cooldown = Math.max(0, mem.cooldown - opts.dt);

  const dTarget = ctx.target ? dist(ctx.pos, ctx.target) : Infinity;
  const dHome = dist(ctx.pos, ctx.home);
  const canSeeTarget = ctx.target !== undefined && dTarget <= ctx.vision;
  const isAggro = ctx.target !== undefined && dTarget <= ctx.aggroRange;

  // Sense: acquire target (called externally with ctx.target set)
  if (canSeeTarget && mem.state !== "FLEE") {
    mem.lastSeen = { ...ctx.target! };
    if (mem.state !== "CHASE" && mem.state !== "ATTACK") mem.state = "SENSE";
  }

  // FLEE dominates (low hp or scared behavior)
  if (mem.state === "FLEE") {
    mem.stateTime += opts.dt;
    const { dx: toT } = dirTo(ctx.pos, ctx.target ?? mem.lastSeen ?? ctx.home);
    const dd = dist(ctx.pos, mem.lastSeen ?? ctx.home);
    if (dd < 0.5 || mem.stateTime > 8) {
      mem.state = "WANDER";
      return { state: mem.state, dx: 0, dy: 0, wantsAttack: false, wantsFlee: false };
    }
    return { state: "FLEE", dx: -toT, dy: -toT, wantsAttack: false, wantsFlee: true };
  }

  // Attack if in range & not cooling down
  if (isAggro && dTarget <= ctx.attackRange && mem.cooldown <= 0) {
    mem.cooldown = ctx.cooldown;
    mem.state = "ATTACK";
    return { state: "ATTACK", dx: 0, dy: 0, wantsAttack: true, wantsFlee: false };
  }

  // Chase target
  if (canSeeTarget) {
    mem.state = "CHASE";
    const { dx, dy } = dirTo(ctx.pos, ctx.target!);
    return { state: "CHASE", dx, dy, wantsAttack: false, wantsFlee: false };
  }

  // Lost target: search around last seen, then return
  if (mem.state === "CHASE" || mem.state === "SEARCH" || mem.lastSeen) {
    if (mem.lastSeen && dist(ctx.pos, mem.lastSeen) > 1 && mem.stateTime < 6) {
      mem.state = "SEARCH";
      const { dx, dy } = dirTo(ctx.pos, mem.lastSeen);
      return { state: "SEARCH", dx, dy, wantsAttack: false, wantsFlee: false };
    }
    mem.lastSeen = undefined;
    mem.state = "RETURN";
  }

  // Return home if too far
  if (dHome > ctx.wanderRadius) {
    mem.state = "RETURN";
    const { dx, dy } = dirTo(ctx.pos, ctx.home);
    if (dHome < RETURN_EPS) mem.state = "IDLE";
    return { state: mem.state, dx, dy, wantsAttack: false, wantsFlee: false };
  }

  // Wander — pick a new target when idle, timed out, or target was consumed
  if (mem.state !== "WANDER" || mem.stateTime > WANDER_SWITCH_TIME || !mem.wanderTarget) {
    mem.state = "WANDER";
    mem.stateTime = 0;
    // pick a target that is at least 1 tile away so small deltas don't churn
    for (let tries = 0; tries < 8; tries++) {
      const tx = ctx.home.x + (opts.rand() * 2 - 1) * ctx.wanderRadius;
      const ty = ctx.home.y + (opts.rand() * 2 - 1) * ctx.wanderRadius;
      if (Math.hypot(tx - ctx.pos.x, ty - ctx.pos.y) >= 1) {
        mem.wanderTarget = { x: tx, y: ty };
        break;
      }
    }
    if (!mem.wanderTarget) mem.wanderTarget = { x: ctx.home.x, y: ctx.home.y };
  }
  const target = mem.wanderTarget;
  const { dx, dy } = dirTo(ctx.pos, target);
  if (dist(ctx.pos, target) < 1) mem.wanderTarget = undefined;
  if (!opts.isWalkable(Math.round(ctx.pos.x + dx), Math.round(ctx.pos.y + dy))) {
    mem.wanderTarget = undefined;
    return { state: "IDLE", dx: 0, dy: 0, wantsAttack: false, wantsFlee: false };
  }
  return { state: "WANDER", dx, dy, wantsAttack: false, wantsFlee: false };
}
