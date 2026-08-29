# SuvivalAcraft Open World

เกม survival / open-world crafting ภาษา TypeScript — มี game core, data-driven content, studio tools และ test suite ครบชุด

## โครงสร้าง

```text
game/    game logic core (world, player, inventory, crafting, farming, combat, survival, quests, save, engine)
shared/  types, zod schemas, registries (items/blocks/biomes/recipes/crops/enemies/npc/quests), validators, contracts
studio/  เครื่องมือสำหรับผู้พัฒนา (editors, generators, blueprint, world editor, preview, export)
data/    data-driven content (JSON) ที่เครื่องมือใช้ export
assets/  รูป tile SVG ตัวอย่าง
tools/   CLI scripts (generate-world, validate-content)
tests/   vitest test suite
```

## คำสั่งที่ใช้

```bash
npm install
npm run check      # typecheck (tsc --noEmit)
npm test           # รัน test suite (vitest)
npm run build      # compile
npm run world:generate   # สร้าง world + preview
npm run content:validate # ตรวจสอบความสอดคล้องของ content
```

## ระบบหลัก

- **World gen**: chunk-based, deterministic seeded terrain + biome (ที่ราบ/ป่า/ทะเลทราย/ภูเขา/หนอง) + ต้นไม้/แร่
- **Inventory**: stack-aware, จำกัดตาม `stackLimit`
- **Crafting**: สูตรที่ station (crafting_table / furnace) ตรวจวัตถุดิบแบบ transaction
- **Farming**: พืชหลายระยะ (crop stages), ต้องดินที่เข้ากันได้, เก็บเกี่ยว loot
- **Combat**: อาวุธมี stat (damage/crit), ศัตรูมี armour/hp/xp, โจมตี drop loot
- **Survival**: ความหิว/กระหาย/HP/stamina, starvation damage, regeneration
- **Quests**: ภารกิจ gather/craft/kill พร้อม reward และ level/xp
- **Save**: snapshot เต็มทั้งภาพ + validate ก่อน serialize

## เกณฑ์การตรวจสอบเนื้อหา

`npm run content:validate` ตรวจว่าทุก item/block/recipe/crop/enemy/quest อ้างอิง id ที่มีอยู่จริง และค่า min/max ถูกต้อง — ผ่านจึงจะ commit ได้
