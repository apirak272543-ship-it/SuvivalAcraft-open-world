export type DayPhase = "DAWN" | "DAY" | "EVENING" | "NIGHT";

export interface DayNightState {
  /** seconds elapsed in current day cycle */
  timeOfDay: number;
  dayLength: number;
  phase: DayPhase;
  /** 0 (midnight) .. 1 (noon) sunlight intensity */
  light: number;
  day: number;
}

const DAWN_START = 0.22;
const DAY_START = 0.32;
const EVENING_START = 0.68;
const NIGHT_START = 0.78;

export function createDayNight(dayLength: number, startTime = 0.45): DayNightState {
  return {
    timeOfDay: startTime * dayLength,
    dayLength,
    phase: "DAY",
    light: 1,
    day: 1,
  };
}

/** Advance simulation by dt seconds; returns the new state (mutates in place). */
export function tickDayNight(state: DayNightState, dt: number): DayNightState {
  state.timeOfDay += dt;
  if (state.timeOfDay >= state.dayLength) {
    state.timeOfDay -= state.dayLength;
    state.day += 1;
  }
  const t = state.timeOfDay / state.dayLength;

  // phase boundaries
  if (t >= NIGHT_START || t < DAWN_START) state.phase = "NIGHT";
  else if (t >= EVENING_START) state.phase = "EVENING";
  else if (t >= DAY_START) state.phase = "DAY";
  else state.phase = "DAWN";

  // smooth light curve: 1 at noon, 0 at midnight
  const angle = ((t - 0.25) % 1) * Math.PI * 2;
  const light = (Math.sin(angle) + 1) / 2;
  state.light = Math.max(0.05, Math.min(1, light));
  return state;
}

export function phaseLabel(phase: DayPhase): string {
  switch (phase) {
    case "DAWN": return "รุ่งสาง";
    case "DAY": return "กลางวัน";
    case "EVENING": return "เย็น";
    case "NIGHT": return "กลางคืน";
  }
}
