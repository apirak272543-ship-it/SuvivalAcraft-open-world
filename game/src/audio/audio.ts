export type SoundId = "break" | "place" | "craft" | "eat" | "hurt" | "pickup" | "swing" | "levelup";

const SOUNDS: Record<SoundId, { freq: number; dur: number }> = {
  break: { freq: 220, dur: 0.06 },
  place: { freq: 320, dur: 0.07 },
  craft: { freq: 440, dur: 0.12 },
  eat: { freq: 200, dur: 0.1 },
  hurt: { freq: 110, dur: 0.15 },
  pickup: { freq: 660, dur: 0.06 },
  swing: { freq: 180, dur: 0.05 },
  levelup: { freq: 880, dur: 0.3 },
};

export interface AudioPlayer {
  play(sound: SoundId): void;
  setEnabled(enabled: boolean): void;
}

export class NoopAudioPlayer implements AudioPlayer {
  play(_sound: SoundId): void {}
  setEnabled(_enabled: boolean): void {}
}

export function soundProfile(id: SoundId): { freq: number; dur: number } {
  return SOUNDS[id];
}
