import { loadConfig, DEFAULT_CONFIG } from "../game/src/config/config.js";
import { generateWorld } from "../studio/src/generators/world-generator.js";
import { renderPreview } from "../studio/src/preview/preview.js";
import { worldSettingsFromConfig } from "../game/src/config/settings.js";
import { writeFileSync } from "node:fs";

const config = loadConfig(process.env.SAC_CONFIG || DEFAULT_CONFIG);
const world = generateWorld(worldSettingsFromConfig(config));
const preview = renderPreview(world, { x: -24, y: -24 }, { x: 48, y: 24 });

console.log(`World "${config.worldName}" seed=${config.seed}`);
console.log("Preview:");
console.log(preview.map((l) => `|${l}|`).join("\n"));
const total = world.loadedChunks().length;
writeFileSync("./studio/exports/world-preview.txt", preview.join("\n"));
console.log(`Generated ${total} chunks -> studio/exports/world-preview.txt`);
