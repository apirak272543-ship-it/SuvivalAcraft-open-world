# AI_AGENT.md — MASTER RULES (จาก blueprint)

กฎนี้ใช้กับ AI Agent ทุกตัวที่ทำงานใน repo นี้

## RULE 1 — ห้ามเขียน Code ก่อนวิเคราะห์
ก่อน Implement: อ่าน Blueprint → ตรวจ Repo → ตรวจ `CHECKPOINT.md` → ตรวจ Git Status → วิเคราะห์ Dependency

## RULE 2 — Generate งานก่อน
สร้าง Master Task List จาก repo จริง (ดู `CHECKPOINT.md` หัวข้อ MASTER TASK LIST)

## RULE 3-4 — แตกงานเป็น Subtask + ทำทีละ Subtask
แต่ละ Task มี Subtask; ทำทีละหน่วย เสร็จแล้วค่อยไปหน่วยถัดไป

## RULE 5 — เสร็จ 1 อย่าง = Checkpoint 1 อย่าง
IMPLEMENT → VERIFY → CHECKPOINT → NEXT

## RULE 6 — CHECKPOINT.md คือ Source of Truth
อัปเดตทุกครั้ง: current task/status/completed/remaining/last completed/next action/evidence/commit

## RULE 7 — Checkpoint บอก "จุดที่หยุด"
`NEXT ACTION` ต้องชัดเจน ว่าหยุดตรงไหน เริ่มต่อตรงไหน

## RULE 8 — ห้ามลบ Checkpoint History
เก็บ `CHECKPOINT HISTORY` (CP-xxx) เสมอ

## RULE 9 — ทุก Checkpoint ต้องมี Evidence
Files/Tests/Checks/Build/Commit — ห้าม DONE จากความรู้สึก

## RULE 10 — ห้ามข้ามงาน
งานย่อยยังไม่เสร็จ ห้ามประกาศ Task ทั้งหมด = DONE

## RULE 11 — พบ Bug → สร้าง Subtask ใหม่ (BUG-xxx)
แก้แล้ว Checkpoint: BUG-xxx → DONE

## RULE 12 — พบ Architecture Problem → BLOCKED
บันทึก Problem/Cause/Impact/Solution ลง CHECKPOINT.md ห้ามฝืน Implement ต่อ

## RULE 13-14 — หลาย AI ทำงานพร้อมกัน
อ่านChecked CHECKPOINT.md ก่อน; Task สถานะ AVAILABLE/CLAIMED/IN_PROGRESS/BLOCKED/DONE; ห้ามแก้ Task ที่เจ้าของอื่นกำลังทำ

## RULE 15 — Token ใกล้หมด → หยุดที่ Safe Point + อัปเดต CHECKPOINT.md
อย่าหยุดกลางงานโดยไม่มีสถานะ

## RULE 16 — ลำดับ DONE: CODE → TEST → CHECK → VERIFY → CHECKPOINT → DONE

## RULE 17 — Commit รูปแบบ: `checkpoint: <task-id> <desc>`

## RULE 18 — ห้ามแก้สิ่งนอก Scope; พบปัญหาใหม่ → DISCOVERED Task ใหม่

## RULE 19 — ห้ามตรวจระบบเดิมซ้ำโดยไม่จำเป็นถ้า checkpoint ระบุ CLOSED

## RULE 20 — Definition of Done
Implementation + Validation + Test + Evidence + Checkpoint + Commit ครบ = DONE

---

### คำสั่งที่ใช้บ่อย
```bash
npm install
npm run check
npm test
npm run build
npm run build:web
npx vite build      # web
npx tsc -p web/tsconfig.json
```
