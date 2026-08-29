export interface StudioConfig {
  workspace: string;
  defaultBiome: string;
  previewSize: { w: number; h: number };
}

export const DEFAULT_STUDIO_CONFIG: StudioConfig = {
  workspace: "./blueprints",
  defaultBiome: "plain",
  previewSize: { w: 32, h: 16 },
};
