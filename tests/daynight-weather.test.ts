import { describe, it, expect } from "vitest";
import { createDayNight, tickDayNight, phaseLabel } from "../game/src/world/daynight.js";
import { createWeather, tickWeather, weatherLabel, WEATHER_EFFECTS } from "../game/src/world/weather.js";

describe("Day/Night", () => {
  it("cycles through phases and light changes", () => {
    const dn = createDayNight(100); // start 0.45 day
    expect(dn.phase).toBe("DAY");
    tickDayNight(dn, 40); // 0.85 -> night
    expect(dn.phase).toBe("NIGHT");
    tickDayNight(dn, 80); // wrap to day 2
    expect(dn.day).toBe(2);
    expect(dn.timeOfDay).toBeGreaterThanOrEqual(0);
    expect(dn.light).toBeGreaterThanOrEqual(0.05);
    expect(dn.light).toBeLessThanOrEqual(1);
  });

  it("phase labels exist", () => {
    expect(phaseLabel("NIGHT")).toBe("กลางคืน");
  });
});

describe("Weather", () => {
  it("starts clear and schedules new weather", () => {
    let r = 0.1;
    const w = createWeather("clear", 0, 25);
    const biome = { humidity: 0.9, temperature: 0.7 };
    tickWeather(w, 1, biome, () => { r += 0.1; return r; });
    expect(["rain", "heavy_rain", "storm", "fog"]).toContain(w.kind);
    expect(w.remaining).toBeGreaterThan(0);
  });

  it("applies weather effects", () => {
    expect(WEATHER_EFFECTS["rain"].soilMoisture).toBeGreaterThan(0);
    expect(WEATHER_EFFECTS["storm"].visibility).toBeLessThan(1);
    expect(weatherLabel("heat")).toBe("ร้อนจัด");
  });
});
