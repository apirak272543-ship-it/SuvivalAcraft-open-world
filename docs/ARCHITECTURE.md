# SuvivalAcraft Open World — สถาปัตยกรรม

## หลักการออกแบบ

เกมใช้สถาปัตยกรรม **data-driven + core logic แยกชั้น** เพื่อให้เพิ่มเนื้อหาโดยไม่ต้องแก้ engine:

```text
Studio (ผู้พัฒนา) → data/*.json (content) → Registries (shared) → Game core → World/Save
```

## ชั้นงาน

| ชั้น | ประกอบด้วย | หน้าที่ |
|---|---|---|
| `shared/registries` | items, blocks, biomes, recipes, crops, enemies, npc, quests | แคตตาล็อกเนื้อหาที่ game และ studio ใช้ร่วมกัน |
| `shared/schemas` | zod schema | validate โครงสร้างข้อมูล content/state |
| `shared/validators` | content, save | ตรวจ reference ครบถ้วน & สมเหตุสมผลก่อน build/commit |
| `game/src` | core, engine, world, player, inventory, crafting, farming, combat, survival, quests, save, economy, building, npc | logic หลักของเกม (ไม่ขึ้นกับ UI) |
| `studio/src` | editors, generators, blueprint, world-editor, preview, export | เครื่องมือผู้พัฒนา; อ่าน/เขียนข้อมูล |

## แนวทางย่อย

- **Deterministic**: world gen ใช้ seeded RNG -> โลกเดิมจาก seed เดิมเสมอ
- **Transaction**: crafting/build/save ตรวจก่อนแล้วค่อยเปลี่ยนสถานะ; rollback เมื่อช่องเต็ม
- **Data integrity**: save ต้อง validate ผ่านก่อน serialize; quest/item อ้าง id ที่มีจริง
- **ขยายง่าย**: เพิ่ม item/recipe/enemy ได้จาก registry + data JSON โดยไม่แตะ engine
