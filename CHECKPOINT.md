# SUVIVALACRAFT OPEN WORLD — CHECKPOINT

## Project
SuvivalAcraft Open World (2D Top-Down Survival · Offline-First · LAN-ready)

## Architecture
2D Top-Down · Offline-First · LAN Multiplayer (planned) · Online Update (planned)
Engine แยกออกจาก Renderer (game/ = logic Engine, web/ = Renderer/UI)

## หลักการ (จาก blueprint)
- ทุก Subtask เสร็จ = Checkpoint 1 ครั้ง (IMPLEMENT → VERIFY → CHECKPOINT → NEXT)
- ห้ามประกาศ DONE โดยไม่มี Evidence (test/check/build/commit)
- Read repo ก่อนเสมอ; อัปเดต CHECKPOINT.md ก่อนหยุด/เลิก Token

---

# MASTER TASK LIST

| ID | Task | Status | Owner |
|----|------|--------|-------|
| 01 | Core Engine (engine interface, state, tick, system manager, event bus) | DONE | master |
| 02 | Tile System (tile data: walkable/moveCost/temp/moisture/fertility/biome) | DONE | master |
| 03 | Chunk System (chunk 32x32, coord, storage, load) | DONE (16x16) | master |
| 04 | World Generator (seed -> biome/terrain/resource/creature) | DONE (basic) | master |
| 05 | Player (move, camera, hotbar, stats) | DONE (basic) | master |
| 06 | Survival System (health/hunger/thirst/stamina/temperature) | DONE (hp/hunger/thirst/stamina) | master |
| 07 | Inventory (item id/quantity/durability/metadata) | DONE (id/quantity) | master |
| 08 | Crafting (data-driven recipes, tiers) | DONE (basic) | master |
| 09 | Building (grid: foundation/wall/door/window/floor) | DONE (place block) | master |
| 10 | Creature AI (state machine: idle/wander/sense/search/chase/attack/flee) | DONE | master |
| 11 | Combat (weapon stats/damage/armor/crit) | DONE | master |
| 12 | Day/Night (cycle + visibility/temperature/creature activity) | IN_PROGRESS | master |
| 13 | Weather (clear/rain/storm/fog + gameplay effect) | PENDING | master |
| 14 | World Events (migration/storm/wildfire/merchant/camp...) | PENDING | master |
| 15 | Local Save (IndexedDB/PWA) + Save Migration (version) | PENDING | master |
| 16 | LAN Multiplayer (host-authoritative) | PENDING | master |
| 17 | Update Content System (engine/content pack) | PENDING | master |

---

# CURRENT WORK

Task: 18 Game Assets (copy CC0 tiles: ground/tree/fence/tools) + integrate renderer
Owner: master
Status: IN_PROGRESS

---

# COMPLETED

- [x] 01 Core Engine — `game/src/engine/`, `game/src/core/` (GameEngine, tick, event bus, rng, math)
- [x] 02 Tile System — `game/src/world/chunk.ts` (block+variant+data), tile data driven
- [x] 03 Chunk System — `game/src/world/world.ts` (chunk coord, storage, setBlock/get, radius)
- [x] 04 World Generator (basic) — `game/src/procedural/terrain.ts`, seeded deterministic
- [x] 05 Player (basic) — `game/src/player/`, web move+camera+hotbar
- [x] 06 Survival (basic) — `game/src/survival/` (hp/hunger/thirst/stamina)
- [x] 07 Inventory (basic) — `game/src/inventory/`
- [x] 08 Crafting (basic, data-driven) — `game/src/crafting/` + `shared/registries/recipes.ts`
- [x] 09 Building (basic) — `game/src/building/`
- [x] 11 Combat — `game/src/combat/`
- [x] Web build & GitHub Pages deploy

---

# REMAINING

- [x] 10 Creature AI — `game/src/ai/` state machine: IDLE/WANDER/SENSE/SEARCH/CHASE/ATTACK/FLEE/RETURN + Creature entity
- [ ] 12 Day/Night — วัฏจักร + effect ต่อ visibility/temperature/creature activity
- [ ] 13 Weather — clear/rain/storm/fog + effect ต่อ soil/water/visibility/fire
- [ ] 14 World Events — events เปลี่ยน World State จริง
- [ ] 15 Local Save — IndexedDB (web) + version migration
- [ ] 16 LAN Multiplayer — host-authoritative
- [ ] 17 Content Update — engine กับ content pack แยก
- [ ] 06 Temperature ต่อ survival
- [ ] 07 Inventory durability/metadata

---

# LAST COMPLETED

10.x Creature AI state machine + tests (7 tests)

---

# NEXT ACTION

Integrate CC0 game assets (ground/tree/fence/tools) into web renderer, then Day/Night effect

---

# BLOCKERS

None

---

# EVIDENCE

Files: game/src/core/, game/src/world/, game/src/ai/ (ใหม่), game/src/survival/, ...
Tests: `npm test` (47 PASS baseline)
Checks: `npm run check` PASS, `npm run build` PASS
Build: `npx vite build` PASS
Commit: f1a25b9 (web build), ดูรายหน่วยต่อไป

---

# LAST COMMIT

f1a25b9 (baseline before AI engine work)

---

# CHECKPOINT HISTORY

## CP-001
Task: Baseline + web build
Status: DONE
Evidence: tests 47/47, build PASS, Pages deployed
Commit: f1a25b9

## CP-002
Task: 10 Creature AI (state machine)
Status: DONE
Evidence: `game/src/ai/state-machine.ts` + `creature.ts` + `tests/ai.test.ts` (7 tests PASS); suite 54/54
Commit: (AI engine commit นี้)
