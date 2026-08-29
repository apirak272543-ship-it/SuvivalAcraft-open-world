import { QUESTS } from "../../../shared/registries/quests.js";
import type { QuestDef, QuestObjective } from "../../../shared/types/content.js";
import type { QuestProgress } from "../../../shared/types/state.js";
import { addXp } from "../player/stats.js";
import type { StatBlock } from "../../../shared/types/state.js";

export interface QuestUpdate {
  questId: string;
  progress: number;
  complete: boolean;
  reward?: { xp: number; items: { item: string; count: number }[] };
}

export function createQuestQueue(ids: string[]): QuestProgress[] {
  return ids.map((id) => ({ questId: id, progress: 0, complete: false, claimed: false }));
}

export function progressQuests(
  queue: QuestProgress[],
  objectiveType: QuestObjective["type"],
  target: string,
  amount = 1,
  stats?: StatBlock,
): { queue: QuestProgress[]; updates: QuestUpdate[] } {
  const updates: QuestUpdate[] = [];
  for (const q of queue) {
    if (q.complete) continue;
    const quest: QuestDef | undefined = QUESTS[q.questId];
    if (!quest) continue;
    const o = quest.objective;
    if (o.type !== objectiveType) continue;
    if (o.target !== target) continue;
    q.progress = Math.min(o.count, q.progress + amount);
    if (q.progress >= o.count && !q.complete) {
      q.complete = true;
      const reward = {
        xp: quest.reward.xp ?? 0,
        items: quest.reward.items ?? [],
      };
      if (stats) addXp(stats, reward.xp);
      updates.push({ questId: q.questId, progress: q.progress, complete: true, reward });
    } else {
      updates.push({ questId: q.questId, progress: q.progress, complete: false });
    }
  }
  return { queue, updates };
}
