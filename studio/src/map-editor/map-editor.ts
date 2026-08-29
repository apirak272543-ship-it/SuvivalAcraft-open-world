import { BIOMES } from "../../../shared/registries/biomes.js";

export interface MapMarker {
  id: string;
  name: string;
  biome: string;
  x: number;
  y: number;
}

export class MapEditor {
  private markers: MapMarker[] = [];

  add(marker: MapMarker): void {
    this.markers.push(marker);
  }

  remove(id: string): boolean {
    const i = this.markers.findIndex((m) => m.id === id);
    if (i < 0) return false;
    this.markers.splice(i, 1);
    return true;
  }

  list(): MapMarker[] {
    return [...this.markers];
  }

  biomes(): string[] {
    return Object.keys(BIOMES);
  }
}
