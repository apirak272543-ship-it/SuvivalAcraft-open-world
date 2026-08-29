import { CROPS, cropBySeed } from "../../../shared/registries/crops.js";
import type { CropPlot, FarmState } from "../../../shared/types/state.js";
import { Rng } from "../core/rng.js";
import type { ItemStack } from "../../../shared/types/state.js";

export class Farm {
  state: FarmState;

  constructor(state?: FarmState) {
    this.state = state ?? { plots: {} };
  }

  plant(plotKey: string, seedItem: string, soilBlock: string, tick: number): boolean {
    const crop = cropBySeed(seedItem);
    if (!crop) return false;
    if (!crop.soilGroups.includes(soilBlock)) return false;
    if (this.state.plots[plotKey]) return false;
    const first = crop.stages[0]!;
    this.state.plots[plotKey] = {
      cropId: crop.id,
      stage: 0,
      ticksLeftInStage: first.durationTicks,
      plantedTick: tick,
      soilBlock,
    };
    return true;
  }

  /** Advance all plots by dtTicks. Returns plots that became harvestable. */
  tick(dtTicks: number): string[] {
    const ready: string[] = [];
    for (const [key, plot] of Object.entries(this.state.plots)) {
      const crop = CROPS[plot.cropId];
      if (!crop) continue;
      plot.ticksLeftInStage -= dtTicks;
      while (plot.ticksLeftInStage <= 0 && plot.stage < crop.stages.length - 1) {
        plot.stage += 1;
        plot.ticksLeftInStage += crop.stages[plot.stage]!.durationTicks;
      }
      if (plot.stage >= crop.stages.length - 1 && plot.ticksLeftInStage <= 0) {
        ready.push(key);
      }
    }
    return ready;
  }

  isMature(plotKey: string): boolean {
    const plot = this.state.plots[plotKey];
    if (!plot) return false;
    const crop = CROPS[plot.cropId];
    return !!crop && plot.stage >= crop.stages.length - 1;
  }

  harvest(plotKey: string, rng: Rng): ItemStack[] | null {
    const plot = this.state.plots[plotKey];
    if (!plot || !this.isMature(plotKey)) return null;
    const crop = CROPS[plot.cropId];
    if (!crop) return null;
    const count = rng.int(crop.harvest.min, crop.harvest.max);
    delete this.state.plots[plotKey];
    return count > 0 ? [{ item: crop.harvest.item, count }] : [];
  }
}
