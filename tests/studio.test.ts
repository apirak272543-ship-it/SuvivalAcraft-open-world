import { describe, it, expect } from "vitest";
import { DataEditor } from "../studio/src/editor/editor.js";
import { runStudioValidation } from "../studio/src/validators/validators.js";
import { BlueprintManager } from "../studio/src/blueprint-manager/blueprint-manager.js";
import { generateWorld } from "../studio/src/generators/world-generator.js";
import { World } from "../game/src/world/world.js";
import { renderPreview, charFor } from "../studio/src/preview/preview.js";
import { exportContentPack } from "../studio/src/export/exporter.js";
import { BuildingEditor } from "../studio/src/building-editor/building-editor.js";

describe("Studio", () => {
  it("DataEditor set/get/delete works", () => {
    const ed = new DataEditor({});
    expect(ed.set("a.b.c", 5).ok).toBe(true);
    expect(ed.get<number>("a.b.c").value).toBe(5);
    expect(ed.delete("a.b.c").ok).toBe(true);
    expect(ed.get<number>("a.b.c").ok).toBe(false);
  });

  it("content validation passes", () => {
    const report = runStudioValidation();
    expect(report.passed).toBe(true);
  });

  it("blueprint manager has defaults and validates size", () => {
    const bm = new BlueprintManager();
    const house = bm.get("house_basic");
    expect(house).toBeDefined();
    expect(bm.validate(house!)).toEqual([]);
    // corrupt it
    const bad = { ...house!, size: { w: 3, h: 7 } };
    expect(bm.validate(bad).length).toBeGreaterThan(0);
  });

  it("preview renders ascii and export produces files", () => {
    const world = generateWorld({ seed: 1, chunkSize: 16, radiusChunks: 1, dayLengthSeconds: 100, spawn: { x: 0, y: 0 }, rules: { friendlyFire: false, keepInventoryOnDeath: true, hungerEnabled: true, thirstEnabled: true, mobSpawning: true } });
    const lines = renderPreview(world, { x: 0, y: 0 }, { x: 8, y: 4 });
    expect(lines.length).toBe(4);
    expect(lines.every((l) => l.length === 8)).toBe(true);
    expect(typeof charFor("grass")).toBe("string");

    const exp = exportContentPack();
    expect(Object.keys(exp.files).length).toBeGreaterThan(5);
  });

  it("building editor places blocks", () => {
    const world = new World({ seed: 1, chunkSize: 16, radiusChunks: 1, dayLengthSeconds: 100, spawn: { x: 0, y: 0 }, rules: { friendlyFire: false, keepInventoryOnDeath: true, hungerEnabled: true, thirstEnabled: true, mobSpawning: true } });
    const be = new BuildingEditor(world);
    expect(be.placeBlock({ x: 0, y: 0 }, "stone")).toBe(true);
    expect(world.blockAt(0, 0)).toBe("stone");
  });
});
