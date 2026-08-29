export interface Vec2 {
  x: number;
  y: number;
}

export function dist2(a: Vec2, b: Vec2): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function manhattan(a: Vec2, b: Vec2): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function key(x: number, y: number): string {
  return `${x},${y}`;
}

export function parseKey(k: string): { x: number; y: number } {
  const [x, y] = k.split(",").map(Number);
  return { x: x ?? 0, y: y ?? 0 };
}
