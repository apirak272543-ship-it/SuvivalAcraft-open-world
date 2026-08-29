import { fail, ok, type CommandResult } from "./base.js";

/**
 * Minimal CRUD editor over a JSON document tree.
 * Fields are addressed with dot paths, e.g. "items.wood.stackLimit".
 */
export class DataEditor {
  constructor(private doc: Record<string, unknown>) {}

  getDocument(): Record<string, unknown> {
    return this.doc;
  }

  get<T>(path: string): CommandResult<T> {
    const parts = path.split(".");
    let node: unknown = this.doc;
    for (const part of parts) {
      if (node && typeof node === "object" && part in (node as Record<string, unknown>)) {
        node = (node as Record<string, unknown>)[part];
      } else {
        return fail(`ไม่พบ path: ${path}`);
      }
    }
    return ok(node as T);
  }

  set(path: string, value: unknown): CommandResult<void> {
    const parts = path.split(".");
    const last = parts.pop();
    if (!last) return fail("path ว่าง");
    let node: Record<string, unknown> = this.doc;
    for (const part of parts) {
      const next = (node as Record<string, unknown>)[part];
      if (!next || typeof next !== "object") {
        const created: Record<string, unknown> = {};
        (node as Record<string, unknown>)[part] = created;
        node = created;
      } else {
        node = next as Record<string, unknown>;
      }
    }
    (node as Record<string, unknown>)[last] = value;
    return ok(undefined);
  }

  delete(path: string): CommandResult<void> {
    const parts = path.split(".");
    const last = parts.pop();
    if (!last) return fail("path ว่าง");
    let node: unknown = this.doc;
    for (const part of parts) {
      if (node && typeof node === "object" && part in (node as Record<string, unknown>)) {
        node = (node as Record<string, unknown>)[part];
      } else {
        return fail(`ไม่พบ path: ${path}`);
      }
    }
    delete (node as Record<string, unknown>)[last];
    return ok(undefined);
  }
}
