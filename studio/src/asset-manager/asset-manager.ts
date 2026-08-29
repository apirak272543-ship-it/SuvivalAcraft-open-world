export interface AssetEntry {
  id: string;
  kind: "image" | "audio" | "json" | "font";
  path: string;
  sizeBytes: number;
  sha256?: string;
}

export class AssetManager {
  private assets = new Map<string, AssetEntry>();

  register(entry: AssetEntry): void {
    this.assets.set(entry.id, entry);
  }

  unregister(id: string): boolean {
    return this.assets.delete(id);
  }

  get(id: string): AssetEntry | undefined {
    return this.assets.get(id);
  }

  list(): AssetEntry[] {
    return [...this.assets.values()];
  }

  byKind(kind: AssetEntry["kind"]): AssetEntry[] {
    return this.list().filter((a) => a.kind === kind);
  }

  size(entry: AssetEntry): AssetEntry {
    return { ...entry, sizeBytes: entry.sizeBytes };
  }
}
