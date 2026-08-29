export interface JoystickOutput {
  dx: number;
  dy: number;
  magnitude: number;
}

export class TouchJoystick {
  private active = false;
  private id: number | null = null;
  private ox = 0;
  private oy = 0;
  private cx = 0;
  private cy = 0;
  public radius = 54;
  private maxDist = 54;

  attach(zone: HTMLElement, base: HTMLElement, knob: HTMLElement): void {
    zone.addEventListener("touchstart", (e) => {
      if (this.active) return;
      const t = e.changedTouches[0]!;
      this.id = t.identifier;
      this.active = true;
      this.ox = t.clientX;
      this.oy = t.clientY;
      this.cx = t.clientX;
      this.cy = t.clientY;
      base.classList.remove("joy-move");
      knob.classList.remove("joy-move");
      knob.style.transition = "none";
    }, { passive: true });

    zone.addEventListener("touchmove", (e) => {
      if (!this.active) return;
      for (const t of [...e.changedTouches]) {
        if (t.identifier === this.id) {
          this.cx = t.clientX;
          this.cy = t.clientY;
          break;
        }
      }
      this.updateKnob(knob);
    }, { passive: true });

    zone.addEventListener("touchend", (e) => {
      for (const t of [...e.changedTouches]) {
        if (t.identifier === this.id) {
          this.active = false;
          this.id = null;
          base.classList.add("joy-move");
          knob.classList.add("joy-move");
          knob.style.transition = "";
          knob.style.left = "50%";
          knob.style.top = "50%";
          knob.style.transform = "translate(-50%,-50%)";
          break;
        }
      }
    }, { passive: true });

    zone.addEventListener("touchcancel", (e) => {
      for (const t of [...e.changedTouches]) {
        if (t.identifier === this.id) {
          this.active = false;
          this.id = null;
          base.classList.add("joy-move");
          knob.classList.add("joy-move");
          knob.style.transition = "";
          knob.style.left = "50%";
          knob.style.top = "50%";
          knob.style.transform = "translate(-50%,-50%)";
          break;
        }
      }
    }, { passive: true });
  }

  private updateKnob(knob: HTMLElement): void {
    const dx = this.cx - this.ox;
    const dy = this.cy - this.oy;
    const dist = Math.min(Math.hypot(dx, dy), this.maxDist);
    const angle = Math.atan2(dy, dx);
    const nx = Math.cos(angle) * dist;
    const ny = Math.sin(angle) * dist;
    knob.style.left = `calc(50% + ${nx}px)`;
    knob.style.top = `calc(50% + ${ny}px)`;
    knob.style.transform = "translate(-50%,-50%)";
  }

  read(): JoystickOutput {
    if (!this.active) return { dx: 0, dy: 0, magnitude: 0 };
    const dx = this.cx - this.ox;
    const dy = this.cy - this.oy;
    const dist = Math.min(Math.hypot(dx, dy), this.maxDist);
    const magnitude = dist / this.maxDist;
    if (dist < 5) return { dx: 0, dy: 0, magnitude: 0 };
    return { dx: dx / dist, dy: dy / dist, magnitude };
  }
}

export class KeyboardInput {
  private keys = new Set<string>();

  constructor() {
    addEventListener("keydown", (e) => this.keys.add(e.key.toLowerCase()));
    addEventListener("keyup", (e) => this.keys.delete(e.key.toLowerCase()));
  }

  read(): JoystickOutput {
    let dx = 0, dy = 0;
    if (this.keys.has("w") || this.keys.has("arrowup")) dy -= 1;
    if (this.keys.has("s") || this.keys.has("arrowdown")) dy += 1;
    if (this.keys.has("a") || this.keys.has("arrowleft")) dx -= 1;
    if (this.keys.has("d") || this.keys.has("arrowright")) dx += 1;
    const mag = Math.hypot(dx, dy);
    if (mag > 0) { dx /= mag; dy /= mag; }
    return { dx, dy, magnitude: mag > 0 ? 1 : 0 };
  }

  isDown(key: string): boolean {
    return this.keys.has(key.toLowerCase());
  }
}

export function setupButton(el: HTMLElement, onDown: () => void, onUp?: () => void): void {
  let active = false;
  el.addEventListener("touchstart", (e) => { e.preventDefault(); active = true; onDown(); }, { passive: false });
  el.addEventListener("touchend", (e) => { e.preventDefault(); if (active && onUp) onUp(); active = false; }, { passive: false });
  el.addEventListener("touchcancel", () => { if (active && onUp) onUp(); active = false; }, { passive: true });
}
