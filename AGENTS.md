# AGENTS.md — คำแนะนำสำหรับ AI Agent ทุกตัว

อ่านและปฏิบัติตามไฟล์นี้เสมอเมื่อทำงานใน repo นี้

## 1. เริ่มงานทุกครั้ง
1. อ่าน `STATUS.md` ก่อนเสมอ — เป็นไฟล์กลางสำหรับสถานะ/เป้าหมาย/backlog/checkpoint
2. อ่าน `docs/ARCHITECTURE.md` และ `docs/GAME_RULES.md` เพื่อเข้าใจโครงสร้างและกติกาเกม
3. ตรวจ branch/commit ปัจจุบัน: `git status`, `git log --oneline -1`

## 2. ข้อบังคับ (hard rules)
- ทุกงานที่ทำต้องอัปเดต `STATUS.md` ให้ตรง (สถานะ/commit/backlog)
- ทุก commit ต้องผ่าน `npm run check` และ `npm test` (ตอนนี้ 47 tests)
- ห้ามสร้างไฟล์ใหญ่ซ้ำซ้อน; ใช้ `shared/registries` + `data/*.json` เป็นแหล่ง content หลัก (data-driven)
- ห้าม commit `.env`, `dist/`, `node_modules/` (ดู `.gitignore`)
- push ขึ้น `origin/main` เมื่องานเสร็จเท่านั้น และให้ working tree สะอาด

## 3. การทำงานพร้อมกันหลาย AI
- งานใดถูก mark `IN PROGRESS` ใน `STATUS.md` หมายถึงมี AI กำลังทำ — ห้ามแตะ
- ถ้าจะเริ่มงานใหม่ ให้ mark `IN PROGRESS` + ชื่อ/timestamp ใน `STATUS.md` ก่อนแก้ code
- เมื่อเสร็จ อัปเดตสถานะและ push; ถ้าขัดแย้งกับ remote ให้ `git pull --rebase` แล้ว push ใหม่
- งานที่ไม่มีเจ้าของใน Backlog (หัวข้อ 4) หรือ "เพิ่มงาน/คำสั่งใหม่" เลือกได้ตามสำคัญ

## 4. คำสั่งที่ใช้บ่อย
```bash
npm install
npm run check        # typecheck
npm test             # tests (vitest)
npm run build
npm run content:validate
npm run world:generate
```
