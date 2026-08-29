export type WeatherKind = "clear" | "rain" | "heavy_rain" | "storm" | "fog" | "heat" | "cold";

export interface WeatherState {
  kind: WeatherKind;
  intensity: number; // 0..1
  remaining: number; // seconds
  temperature: number; // base game temperature with weather offset applied
}

export const WEATHER_EFFECTS: Record<WeatherKind, { tempOffset: number; soilMoisture: number; visibility: number }> = {
  clear: { tempOffset: 0, soilMoisture: 0, visibility: 1 },
  rain: { tempOffset: -1, soilMoisture: +3, visibility: 0.8 },
  heavy_rain: { tempOffset: -2, soilMoisture: +6, visibility: 0.55 },
  storm: { tempOffset: -3, soilMoisture: +8, visibility: 0.35 },
  fog: { tempOffset: 0, soilMoisture: +1, visibility: 0.3 },
  heat: { tempOffset: +4, soilMoisture: -2, visibility: 0.9 },
  cold: { tempOffset: -4, soilMoisture: 0, visibility: 0.9 },
};

export function createWeather(kind: WeatherKind = "clear", duration = 0, temperature = 25): WeatherState {
  return { kind, intensity: kind === "clear" ? 0 : 1, remaining: duration, temperature };
}

/** Deterministic-ish weather scheduler: pick next type based on humidity/temperature/seed. */
export function tickWeather(
  state: WeatherState,
  dt: number,
  biome: { humidity: number; temperature: number },
  rand: () => number,
): WeatherState {
  state.remaining -= dt;
  if (state.remaining > 0) return state;

  const humidity = biome.humidity;
  const temp = biome.temperature * 40 - 5 + state.temperature;
  let next: WeatherKind = "clear";
  const r = rand();
  if (humidity > 0.7) {
    if (r < 0.2) next = "storm";
    else if (r < 0.5) next = "heavy_rain";
    else if (r < 0.75) next = "rain";
    else next = "fog";
  } else if (temp > 30) {
    next = r < 0.3 ? "heat" : "clear";
  } else if (temp < 5) {
    next = r < 0.3 ? "cold" : "clear";
  } else {
    next = r < 0.15 ? "rain" : r < 0.25 ? "fog" : "clear";
  }
  state.kind = next;
  state.intensity = next === "clear" ? 0 : 0.3 + rand() * 0.7;
  state.remaining = 60 + rand() * 240;
  return state;
}

export function weatherLabel(kind: WeatherKind): string {
  const map: Record<WeatherKind, string> = {
    clear: "อากาศแจ่มใส",
    rain: "ฝนตก",
    heavy_rain: "ฝนตกหนัก",
    storm: "พายุ",
    fog: "หมอก",
    heat: "ร้อนจัด",
    cold: "หนาวจัด",
  };
  return map[kind];
}
