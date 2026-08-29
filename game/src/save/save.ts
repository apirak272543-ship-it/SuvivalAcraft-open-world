import type { Snapshot } from "../../../shared/types/state.js";
import { validateSnapshot } from "../../../shared/validators/save.js";

export const SAVE_VERSION = 1;

export function createSnapshot(snapshot: Snapshot): Snapshot {
  return { ...snapshot, version: SAVE_VERSION, savedAt: Date.now() };
}

export function serialize(snapshot: Snapshot): string {
  const errors = validateSnapshot(snapshot);
  if (errors.length > 0) {
    throw new Error(`Cannot serialize invalid save: ${errors.join("; ")}`);
  }
  return JSON.stringify(snapshot);
}

export function deserialize(json: string): Snapshot {
  const parsed = JSON.parse(json) as Snapshot;
  if (parsed.version !== SAVE_VERSION) {
    throw new Error(`Unsupported save version ${parsed.version} (expected ${SAVE_VERSION})`);
  }
  const errors = validateSnapshot(parsed);
  if (errors.length > 0) {
    throw new Error(`Save validation failed: ${errors.join("; ")}`);
  }
  return parsed;
}
