ได้ครับ และรอบนี้ผมแนะนำให้ทำเป็น ไฟล์ UI_BLUEPRINT.md แยกจาก Game Blueprint เลย เพราะ UI ของเกมคุณควรมีสเปกละเอียดระดับที่ AI อ่านแล้วรู้ว่า “อะไรอยู่ตรงไหน ทำอะไร และเมื่อกดแล้วต้องเปิดอะไร”
ผมไปดูแนวทาง UI ของเกมมือถือ RPG/MMORPG และ RoV เพิ่มแล้ว จุดที่น่าสนใจมากคือ RoV รองรับการปรับตำแหน่ง/ขนาดปุ่มและระยะห่างของปุ่มสกิล ซึ่งเหมาะกับแนวคิดของคุณมาก � ขณะเดียวกัน MMORPG บนมือถือมักใช้หลัก ซ้าย = movement / ขวา = combat / บน = information เพื่อให้สองนิ้วทำงานแยกกันชัดเจน �
Arena of Valor +1
Realm of Legends +1
แต่ผมจะ ไม่ให้มันลอก RoV แบบ 1:1 เพราะเกมคุณเป็น Survival Open World ไม่ใช่ MOBA และบาง UI ของ RoV เช่น scoreboard 5v5 ไม่เหมาะกับเกมเรา ผมจะเอา หลัก UX ที่ทำให้ RoV เล่นด้วยนิ้วได้ดี มาปรับเป็น MMORPG ของเรา
นี่คือ Blueprint ที่ผมอยากให้คุณเอาไปไว้เป็น UI_BLUEPRINT.md:
การเขียน
SURVIVAL OPEN WORLD CRAFT
UI_BLUEPRINT.md
MOBILE LANDSCAPE MMORPG / SURVIVAL UI SYSTEM
Version 1.0
0. PURPOSE
เอกสารนี้กำหนด UI/UX ทั้งหมดของเกม:
SURVIVAL OPEN WORLD CRAFT
ประเภท:
2D Top-Down
Open World
Survival
RPG
MMORPG-ready
Sandbox
Crafting
Exploration
Offline-first
LAN-ready
Android Mobile
Landscape / Horizontal
Touchscreen-first
เอกสารนี้เป็น UI Blueprint เท่านั้น
GAMEPLAY SYSTEMS ให้ยึดตาม:
GAME_BLUEPRINT.md
1. CORE UI PRINCIPLE
UI ต้องออกแบบโดยคิดว่า:
ผู้เล่นมีเพียง 2 นิ้วที่กำลังควบคุมเกม
หลักการ:
LEFT HAND
MOVEMENT / NAVIGATION
RIGHT HAND
COMBAT / INTERACTION
TOP
INFORMATION / STATUS
BOTTOM
ACTIVE GAMEPLAY CONTROLS
CENTER
WORLD / GAMEPLAY
ห้ามวางปุ่มสำคัญทับบริเวณที่ผู้เล่นต้องมองเห็นโลก
2. LANDSCAPE BASE RESOLUTION
Reference:
1920 × 1080
Aspect Ratio:
16:9
แต่ต้อง Responsive
รองรับ:
16:9 18:9 19.5:9 20:9 Tablet
ห้ามใช้ตำแหน่ง Pixel แบบตายตัว
ให้ใช้:
Anchors
Safe Area
Relative Position
Responsive Scaling
3. SAFE AREA
ต้องเว้นพื้นที่จาก:
Notch
Camera hole
Rounded corners
Navigation area
UI สำคัญห้ามติดขอบจอ
4. MAIN MENU
หน้าหลักต้องเป็นหน้าแรกก่อนเข้าโลกเกม
โครงสร้าง:
┌─────────────────────────────────────────────────────────────┐
│ LOGO                                      VERSION / STATUS   │
│                                                             │
│                                                             │
│                   GAME ART / WORLD                          │
│                                                             │
│                  SURVIVAL                                   │
│                OPEN WORLD                                   │
│                  CRAFT                                      │
│                                                             │
│                         ┌──────────────┐                    │
│                         │  CONTINUE    │                    │
│                         ├──────────────┤                    │
│                         │  NEW GAME    │                    │
│                         ├──────────────┤                    │
│                         │  LOAD GAME   │                    │
│                         ├──────────────┤                    │
│                         │ MULTIPLAYER  │                    │
│                         ├──────────────┤                    │
│                         │  SETTINGS    │                    │
│                         └──────────────┘                    │
│                                                             │
│                      © SURVIVAL OPEN WORLD                  │
└─────────────────────────────────────────────────────────────┘
5. MAIN MENU BUTTONS
CONTINUE
เปิด Save ล่าสุด
แสดง:
Character
Level
World
Last location
Play time
Last save
ตัวอย่าง:
CONTINUE
"Apirak — Lv.12" "Forest Region" "Last played 12 min ago"
6. NEW GAME
เปิด:
Character Creation
↓
World Creation
↓
Game Start
7. LOAD GAME
แสดง Save Slots
แต่ละ Slot:
Character
Level
World
Screenshot
Location
Playtime
Date
Save version
Buttons:
LOAD DELETE
การ Delete ต้องมี Confirmation
8. MULTIPLAYER
หน้า Multiplayer เป็น Hub
MULTIPLAYER

┌───────────────────────┐
│ CREATE LAN WORLD      │
├───────────────────────┤
│ FIND LAN WORLD        │
├───────────────────────┤
│ JOIN BY CODE          │
├───────────────────────┤
│ BACK                  │
└───────────────────────┘
Phase แรก:
LAN
อนาคต:
ONLINE
9. CHARACTER CREATION
Layout:
┌──────────────────────────────────────────────────────────┐
│ BACK                         CREATE CHARACTER             │
│                                                          │
│   CUSTOMIZATION             CHARACTER PREVIEW            │
│                                                          │
│   Name                      ┌──────────────┐              │
│   [____________]            │              │              │
│                             │   CHARACTER  │              │
│   Appearance                │              │              │
│   Hair                      │              │              │
│   Face                      └──────────────┘              │
│   Outfit                                                   │
│                                                          │
│                     [ CREATE ]                            │
└──────────────────────────────────────────────────────────┘
10. WORLD CREATION
ต้องมี:
WORLD NAME
SEED
DIFFICULTY
GAME MODE
11. WORLD CREATION UI
WORLD CREATION

World Name
[ My World ]

Seed
[ RANDOM ]

Difficulty
[ NORMAL ]

Mode
[ OFFLINE ]

        [ CREATE WORLD ]
12. LOADING SCREEN
ก่อนเข้าโลก:
แสดง:
World artwork
Loading progress
Tips
Game version
World name
ตัวอย่าง:
LOADING WORLD
████████████████░░░░
Generating World...
Tip:
"กลางคืนศัตรูบางชนิดจะออกล่า"
13. MAIN GAME HUD
นี่คือหน้าที่สำคัญที่สุด
ตำแหน่ง:
┌──────────────────────────────────────────────────────────────┐
│ PLAYER        QUEST                 TIME       MINIMAP        │
│ STATUS                              WEATHER    MAP            │
│                                                              │
│                                                              │
│                                                              │
│                         GAME WORLD                            │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│ JOYSTICK                                      ACTIONS        │
│                                              SKILL           │
│                                      INTERACT    ATTACK      │
│                                                              │
│ XP BAR                                                       │
└──────────────────────────────────────────────────────────────┘
14. TOP LEFT — PLAYER STATUS
ตำแหน่ง:
TOP LEFT
แสดง:
Character portrait
Character name
Level
HP
Hunger
Stamina
ตัวอย่าง:
┌─────────────────────────┐
│ 👤 APIRAK       Lv.12   │
│ ❤️ █████████░  850/900  │
│ 🍖 ██████░░░░   60%     │
│ ⚡ ███████░░░   72%     │
└─────────────────────────┘
15. PLAYER PORTRAIT
แตะ:
เปิด Character Screen
Long Press:
แสดง Quick Profile
16. BUFF / DEBUFF
ถัดจาก Player Status
แสดง Icon ขนาดเล็ก:
Poison
Bleeding
Burning
Hunger
Buff
Defense
Attack
แตะ Icon:
แสดงรายละเอียด
17. TOP CENTER — QUEST TRACKER
บริเวณ:
TOP CENTER-LEFT
แสดง Quest ปัจจุบัน
ตัวอย่าง:
MAIN QUEST

Gather Wood
5 / 10

Distance:
120m
แตะ:
เปิด Quest Panel
18. QUEST TRACKER RULE
ห้ามแสดง Quest ยาวเกินไป
แสดง:
Quest Name + Objective + Progress + Distance
เท่านั้น
19. TOP CENTER — WORLD INFORMATION
สามารถแสดง:
Time
Weather
Zone
Event
ตัวอย่าง:
FOREST
☀ 14:32
Clear
20. TOP RIGHT — MINIMAP
ตำแหน่ง:
TOP RIGHT
Mini Map:
วงกลมหรือสี่เหลี่ยมมุมโค้ง
แสดง:
Player
NPC
Quest
Enemy
Resource
Dungeon
Village
Party Members
21. MINIMAP INTERACTION
Tap:
เปิด Full Map
Pinch:
Zoom
Drag:
Pan
22. MINIMAP BUTTONS
รอบ Mini Map:
Zoom
Zoom Map
และ:
Compass
23. FULL MAP
เมื่อเปิด:
เกมโลกถูกปิดด้วย Map Overlay
แสดง:
Current Region
Discovered Area
Player
Quest
NPC
Dungeon
Village
Resource
Fast Travel
24. MAP FILTER
Filter:
☑ Quest ☑ NPC ☑ Resource ☑ Dungeon ☑ Village ☑ Party ☑ Events
25. TOP RIGHT SECONDARY ICONS
ถัดจาก/ใต้ Mini Map:
Mail
Friends
Party
Guild
Notifications
แต่ไม่ให้แย่งพื้นที่ Mini Map
ใช้ Collapsible Menu ได้
26. LEFT SIDE — SECONDARY MENU
แนวตั้งด้านซ้ายบน
ไอคอน:
👤 Character 🎒 Inventory ⚔ Equipment 📜 Quest 🗺 Map 🔨 Craft 🏠 Building
แต่ต้องมีปุ่ม:
MORE
เพื่อซ่อนเมนู
27. IMPORTANT RULE
อย่าแสดง Icon ทั้งหมดตลอดเวลา
Default:
แสดงเฉพาะ:
Character Inventory Quest Map
ระบบอื่น:
MORE
เพราะหน้าจอมือถือมีพื้นที่จำกัด
28. BOTTOM LEFT — MOVEMENT
Virtual Joystick
ตำแหน่ง:
BOTTOM LEFT
ขนาด:
ใหญ่พอสำหรับนิ้วโป้ง
ต้องรองรับ:
360 degree
8 direction
Dead zone
Dynamic joystick
Fixed joystick
Adjustable size
Adjustable position
29. JOYSTICK BEHAVIOR
ผู้เล่นลาก:
เดิน
ลากสุด:
Run
ปล่อย:
Stop
Double Tap / Hold:
Sprint ตาม Setting
30. RIGHT HAND AREA
ด้านขวาล่างเป็น Combat / Interaction
หลัก:
ATTACK
อยู่บริเวณ:
BOTTOM RIGHT
ขนาดใหญ่ที่สุด
31. ATTACK BUTTON
ปุ่ม:
⚔ ATTACK
ทำหน้าที่:
Basic Attack
แตะ:
Attack
Hold:
Charged Attack ถ้าอาวุธรองรับ
32. SKILL BUTTONS
รอบ Attack:
Skill 1 Skill 2 Skill 3 Ultimate
รูปแบบคล้าย Mobile Action/MOBA
แต่จำนวนเริ่มต้น:
3 + 1
33. SKILL LAYOUT
SKILL 1

       SKILL 2       SKILL 3

                  ATTACK

                 ULTIMATE
หรือจัดเป็นวงกลมรอบ Attack ตามพื้นที่หน้าจอ
34. SKILL STATES
ทุก Skill ต้องแสดง:
Icon
Cooldown
Cost
Disabled
Ready
Targeting
35. TARGETING
Skill ที่ต้องเล็ง:
เมื่อ Hold:
แสดง:
Range
Direction
Target Area
ลากนิ้ว:
Aim
ปล่อย:
Cast
ระบบนี้ได้รับแรงบันดาลใจจากรูปแบบการเล็ง/ล็อกเป้าของเกม Mobile MOBA ซึ่งเหมาะกับการควบคุมด้วยนิ้วมาก
36. INTERACT BUTTON
ปุ่ม Contextual
ตำแหน่ง:
ข้าง Attack หรือเหนือ Attack
เปลี่ยนตามสถานการณ์:
TREE → CHOP
CHEST → OPEN
NPC → TALK
RESOURCE → GATHER
DOOR → OPEN
37. DODGE
ปุ่มเล็ก:
DODGE
ตำแหน่ง:
ใกล้ Attack
ต้องกดง่ายด้วยนิ้วโป้ง
Cooldown แสดงชัดเจน
38. QUICK ITEM BAR
บริเวณ:
BOTTOM CENTER / RIGHT
แสดง:
Food
Potion
Torch
Tool
สามารถ Swipe เปลี่ยน Item
39. INVENTORY QUICK BAR
ผู้เล่นควรมี:
4–8 Quick Slots
แต่ไม่ควรแสดง Inventory ทั้งหมดบน HUD
40. XP BAR
ตำแหน่ง:
BOTTOM EDGE
แสดง:
Current XP Required XP Level
ตัวอย่าง:
Lv.12     █████████████░░░     8,250 / 10,000
XP bar ต้องไม่บัง Joystick หรือ Combat
41. CHAT
Chat ต้องเป็น Collapsible
ตำแหน่ง:
BOTTOM LEFT เหนือ Joystick
Default:
ซ่อน
เมื่อมีข้อความ:
แสดง Notification
แตะ:
เปิด Chat
42. CHAT CHANNELS
Local
Party
Guild
System
Trade
Offline:
Local/System เท่านั้น
LAN:
Local/Party
Online:
ทั้งหมดตามสิทธิ์
43. NOTIFICATION SYSTEM
แสดงข้อความชั่วคราว:
+5 Wood +20 XP Quest Complete New Recipe Level Up Rare Item
ไม่ควรบังกลางจอเป็นเวลานาน
44. PICKUP FEEDBACK
เมื่อเก็บของ:
+5 WOOD
+2 FIBER
Icon + Quantity
แล้ว Fade Out
45. COMBAT FEEDBACK
เมื่อโจมตี:
Damage Number
Hit Effect
Sound
Animation
Critical:
CRITICAL!
46. DEATH UI
เมื่อ Player ตาย:
โลกหยุด/เข้าสู่ Death State
แสดง:
YOU DIED
สาเหตุ:
Defeated by Wolf
Buttons:
RESPAWN RETURN TO BASE LOAD SAVE
47. PAUSE / SYSTEM MENU
เปิดด้วย:
Menu Button
หรือ Back gesture
แสดง:
┌────────────────────────────┐
│          MENU              │
│                            │
│ Continue                   │
│ Inventory                  │
│ Character                  │
│ Quest                      │
│ Map                        │
│ Settings                   │
│ Save                       │
│ Exit to Main Menu          │
└────────────────────────────┘
48. CHARACTER SCREEN
เปิดจาก:
Player Portrait
หรือ Main Menu
แสดง:
CHARACTER

        CHARACTER MODEL

Name
Level
XP

HP
Attack
Defense
Speed
Stamina

Equipment
Stats
Skills
Tabs:
Overview
Equipment
Stats
Skills
49. INVENTORY SCREEN
ต้องเป็น Full Screen Overlay
ไม่ใช่กล่องเล็ก
Layout:
┌──────────────────────────────────────────────────────────┐
│ INVENTORY                                      GOLD      │
│                                                          │
│ CATEGORIES        ITEMS                    DETAILS       │
│                                                          │
│ All               [ ][ ][ ][ ]             Item Name     │
│ Weapons           [ ][ ][ ][ ]             Description   │
│ Armor             [ ][ ][ ][ ]             Stats         │
│ Food              [ ][ ][ ][ ]             Value         │
│ Materials         [ ][ ][ ][ ]                           │
│ Quest             [ ][ ][ ][ ]                           │
│                                                          │
└──────────────────────────────────────────────────────────┘
50. INVENTORY TOUCH
Tap:
Select Item
Double Tap:
Use / Equip
Long Press:
Item Details
Drag:
Move Item
Drag to:
Equipment
Drop
Quick Slot
51. EQUIPMENT SCREEN
Slots:
Head Chest Legs Feet Main Hand Off Hand Accessory 1 Accessory 2
Tap:
Equip
Long Press:
Details
52. CRAFTING SCREEN
Tabs:
Tools
Weapons
Armor
Food
Building
Materials
แต่ละ Recipe:
Stone Axe

Wood       5/5 ✓
Stone      3/3 ✓
Fiber      2/2 ✓

[CRAFT]
53. CRAFTING FEEDBACK
เมื่อ Craft:
เสียง + Animation + Notification
"CRAFTED STONE AXE"
Item เข้า Inventory จริง
54. BUILDING MODE
เมื่อกด Building:
HUD เปลี่ยน
แสดง:
BUILD MODE
ด้านซ้าย:
Category
ด้านล่าง:
Building Pieces
ด้านขวา:
Rotate Place Cancel
55. BUILDING TOUCH
ลาก/แตะ:
เลือกตำแหน่ง
Pinch:
Zoom
Rotate gesture:
Rotate Object
Tap:
Place
56. QUEST SCREEN
Tabs:
Main
Side
Daily
Event
แต่ละ Quest:
Name Description Objectives Progress Reward Location
57. QUEST DETAIL
แสดง:
THE FIRST CAMP

Gather:
Wood 10/10
Stone 5/10

Reward:
50 XP
20 Gold
Recipe: Campfire

[TRACK]
58. NPC DIALOGUE
Dialogue UI:
ด้านล่าง:
NPC Portrait
Name
Dialogue
Choices
ตัวอย่าง:
ELDER

"ป่าทางเหนือเริ่มมีหมาป่าเพิ่มขึ้น"

[ถามเรื่องป่า]
[รับภารกิจ]
[ซื้อของ]
[ลาก่อน]
59. SHOP UI
Shop:
ซ้าย:
Categories
กลาง:
Items
ขวา:
Item Details
Bottom:
BUY SELL
แสดง:
Gold
60. MAP UI
Map ต้องเป็น Full Screen
แต่ยังมี:
Close Zoom Filter Current Position
61. GUILD UI
Tabs:
Overview Members Guild Quest Storage Chat Settings
อนาคต:
Territory Guild Base Guild War
62. PARTY UI
Party panel:
แสดง:
Player Portrait Name HP Distance
ตำแหน่ง:
ใต้ Mini Map
สามารถ Collapse ได้
63. FRIEND UI
แสดง:
Online Offline Requests
Actions:
Invite
Party
Whisper
Guild
Block
64. MAIL UI
Tabs:
Inbox System Rewards
แสดง:
Sender Subject Date Attachments
65. EVENT UI
Event icon:
ด้านบน
เมื่อ Event active:
แสดง:
Event Name Time Remaining Objective
ตัวอย่าง:
WORLD EVENT
"WOLF HUNT"
08:32
66. SETTINGS
Tabs:
Graphics
Quality
FPS
Effects
Shadows
Audio
Master
Music
SFX
Controls
Joystick Size
Button Size
Button Position
Sensitivity
Interface
HUD Scale
Chat
Minimap
Quest Tracker
Gameplay
Auto Pickup
Damage Numbers
Auto Run
Language
Thai
English
Future languages
67. CUSTOM HUD
นี่เป็นระบบสำคัญมาก
ผู้เล่นสามารถ:
Drag Button
Resize Button
Change Opacity
Reset Layout
ปรับได้:
Joystick Attack Skills Dodge Interact Quick Slots
แนวทางนี้สอดคล้องกับการออกแบบของ RoV ที่รองรับการปรับตำแหน่งและขนาดของส่วนควบคุมเพื่อให้เหมาะกับอุปกรณ์และนิ้วของผู้เล่น
68. ONE-HAND / TWO-HAND MODE
Default:
Two-Hand
Optional:
Left-Handed
Right-Handed
ผู้เล่นสามารถสลับตำแหน่ง:
Movement Combat Quick Slots
69. ACCESSIBILITY
ต้องมี:
UI Scale
Small Medium Large
Button Scale:
80% 100% 120% 140%
Opacity:
50% 75% 100%
70. TOUCH FEEDBACK
ทุกปุ่มต้องมี:
Visual Press
Sound
Haptic ถ้าเปิด
Cooldown state
ผู้เล่นต้องรู้ว่าการแตะถูกอ่านแล้ว
71. TOUCH TARGET SIZE
ปุ่มสำคัญต้องมีพื้นที่กดใหญ่พอสำหรับนิ้ว
ห้ามทำ:
Tiny Icon Button
โดยเฉพาะ:
Attack Dodge Skill Interact Joystick
72. CONTEXTUAL UI
UI ต้องเปลี่ยนตามสถานการณ์
ตัวอย่าง:
กำลังสำรวจ:
Movement Interact Map
กำลังต่อสู้:
Attack Skills Dodge Target
กำลัง Craft:
Craft UI
กำลัง Build:
Build UI
กำลังคุย NPC:
Dialogue UI
73. COMBAT MODE
เมื่อศัตรูเข้าระยะ:
HUD เปลี่ยนเล็กน้อย
เพิ่ม:
Target Frame
┌──────────────────────────┐
│ 🐺 WOLF Lv.5             │
│ HP ███████░░              │
└──────────────────────────┘
แสดง:
Target HP Level Distance
74. TARGET LOCK
ผู้เล่นสามารถ:
Tap Enemy
→ Lock Target
Target มี:
Highlight
HP bar
Direction indicator
Tap อีกครั้ง:
Unlock
75. AIM MODE
สำหรับ:
Bow Magic Ranged Weapon
กด Skill ค้าง:
เข้าสู่ Aim Mode
แสดง:
Target Direction Range Area
ปล่อยนิ้ว:
Fire
76. AUTO PICKUP
Option:
ON/OFF
ถ้า ON:
เดินใกล้ Item
→ Pickup
ถ้า OFF:
ต้องกด Interact
77. AUTO INTERACT
Option:
ON/OFF
ไม่ควรเปิดเป็นค่าเริ่มต้นสำหรับสิ่งที่อาจมีความเสี่ยง
78. NOTIFICATION PRIORITY
Priority:
CRITICAL ↓ IMPORTANT ↓ NORMAL ↓ COSMETIC
Critical:
Death Save Error Low HP
Important:
Quest Complete Level Up
Normal:
Pickup Craft
Cosmetic:
Minor notifications
79. UI LAYERS
UI ต้องแบ่ง Layer:
LAYER 0 World
LAYER 1 World Effects
LAYER 2 Gameplay HUD
LAYER 3 Notifications
LAYER 4 Context UI
LAYER 5 Menus
LAYER 6 Modal / Confirmation
LAYER 7 Critical Overlay
80. MODAL RULE
เมื่อเปิด:
Inventory Map Crafting Settings
ต้องลด/ซ่อน Combat Buttons ตามความเหมาะสม
ห้ามมีปุ่มที่มองไม่เห็นแต่ยังรับ Touch
81. GESTURE SYSTEM
รองรับ:
Tap Double Tap Long Press Drag Swipe Pinch Two Finger Gesture
แต่ต้องไม่ใช้ Gesture ซ้อนกันจนผู้เล่นสับสน
82. MOBILE UX PRINCIPLE
อย่าพยายามเอา UI MMORPG PC ทั้งหมดมายัดมือถือ
หลักสำคัญ:
SHOW WHAT PLAYER NEEDS NOW
ข้อมูลอื่น:
เปิดเมื่อจำเป็น
นี่เป็นหลักเดียวกับแนวทางออกแบบ MMORPG บนมือถือที่เน้น Context-sensitive UI แทนการย่อ UI PC ทั้งหมดลงบนหน้าจอเล็ก
83. FIRST-TIME PLAYER HUD
เมื่อผู้เล่นเข้าเกมครั้งแรก:
แสดง Tutorial Overlay:
MOVE ↓ INTERACT ↓ ATTACK ↓ INVENTORY ↓ QUEST ↓ CRAFT
ห้าม Tutorial ปิด Gameplay ทั้งหน้าจอนานเกินไป
84. FIRST SESSION UI FLOW
MAIN MENU
 ↓
NEW GAME
 ↓
CHARACTER CREATION
 ↓
WORLD CREATION
 ↓
LOADING
 ↓
SPAWN
 ↓
MOVE TUTORIAL
 ↓
GATHER
 ↓
CRAFT
 ↓
EQUIP
 ↓
COMBAT
 ↓
QUEST
 ↓
BUILD
 ↓
SAVE
85. MAIN MENU INFORMATION ARCHITECTURE
หน้าหลักควรมี:
PRIMARY:
Continue New Game Load Game Multiplayer
SECONDARY:
Character Achievements Collection Settings Credits
แต่ Secondary ไม่ควรแย่งความสนใจจาก Continue/New Game
86. FUTURE HOME / MMORPG HUB
เมื่อระบบ MMORPG พร้อม:
หน้า Home สามารถเพิ่ม:
Character
World
Guild
Friends
Mail
Events
Rewards
Shop
Achievements
Season
แต่ห้ามทำทั้งหมดใน Alpha
87. HOME SCREEN PRINCIPLE
หน้า Home ต้องตอบได้ทันที:
ฉันคือใคร?
ฉันอยู่ World ไหน?
ฉันเล่นต่อจากไหน?
ฉันทำอะไรต่อ?
มีอะไรใหม่?
88. WORLD HUD PRIORITY
บนหน้าจอ Gameplay:
PRIORITY 1:
World Player Movement Combat
PRIORITY 2:
HP Hunger Quest Map
PRIORITY 3:
Inventory Chat Social
PRIORITY 4:
Other Systems
89. DEFAULT HUD
ค่าเริ่มต้น:
TOP LEFT
Player Status

TOP CENTER
Quest

TOP RIGHT
Mini Map

LEFT
Joystick

BOTTOM LEFT
Quick Utility

RIGHT
Combat

BOTTOM RIGHT
Attack / Skills

BOTTOM
XP

FLOATING
Notifications
90. MINIMAL HUD MODE
ผู้เล่นสามารถเปิด:
Minimal HUD
ซ่อน:
Quest
Extra Icons
Chat
Secondary UI
เหลือ:
Player World Joystick Attack Skills Map
91. IMMERSION MODE
ซ่อน UI ที่ไม่จำเป็น
เหลือเฉพาะ:
HP Joystick Combat Minimal Map
เหมาะกับ Exploration
92. UI DESIGN LANGUAGE
Visual Direction:
Modern Fantasy Survival
ไม่ควรเหมือน:
Generic HTML
Dashboard
Web App
Admin Panel
UI ต้องดูเป็น:
GAME UI
93. VISUAL STYLE
หลัก:
Large readable icons
Clear hierarchy
Semi-transparent panels
Rounded/soft shapes
Strong contrast
Game-like feedback
Consistent icon language
94. COLOR SEMANTICS
ใช้สีตามความหมาย:
HP = Health
Hunger = Food
Stamina = Energy
XP = Progress
Quest = Objective
Rare = Rarity
Warning = Danger
ห้ามใช้สีเพียงเพื่อความสวยงามจนผู้เล่นแยกความหมายไม่ได้
95. UI ANIMATION
ใช้ Animation:
Open
Close
Hover/Press
Reward
Level Up
Quest Complete
Item Pickup
Damage
Cooldown
Animation ต้องเร็ว
ไม่ขัดจังหวะ Gameplay
96. PERFORMANCE
UI ต้องไม่สร้าง:
DOM/Object จำนวนมาก
Animation ที่ทำงานตลอดเวลา
Particle ที่ไม่จำเป็น
Re-render ทุก Frame
เฉพาะข้อมูลที่เปลี่ยนต้อง Update
97. UI STATE
ทุกหน้าต้องมี:
OPEN CLOSED ACTIVE DISABLED LOADING ERROR
เช่น Inventory:
LOADING → READY → ERROR
98. NO DEAD BUTTON
ปุ่มทุกปุ่มที่แสดงต้อง:
ทำงานจริง
หรือ:
แสดง Disabled พร้อมเหตุผล
ห้ามมี:
"Coming Soon"
เต็มหน้าจอจนเกมดูเหมือน Demo
99. UI TEST
ทุก UI ต้องตรวจ:
Touch Landscape Small Screen Large Screen Tablet Safe Area Overlap Button Size Text Readability
100. VISUAL VERIFICATION
AI Agent หากไม่มี Browser/Device Preview:
ห้ามประกาศ:
UI VERIFIED
ให้รายงาน:
CODE = PASS BUILD = PASS FUNCTION = PASS VISUAL = PENDING
มนุษย์ตรวจบนโทรศัพท์จริง:
VISUAL = PASS
101. UI CHECKPOINT
ทุกหน้าที่เสร็จ:
CHECKPOINT.md
ตัวอย่าง:
UI CHECKPOINT #001

Screen:
Main Menu

Status:
COMPLETED

Implemented:
✓ Logo
✓ Continue
✓ New Game
✓ Load
✓ Multiplayer
✓ Settings

Touch:
PASS

Landscape:
PASS

Safe Area:
PASS

Visual:
PENDING

Next:
Character Creation
102. UI DEVELOPMENT ORDER
ต้องทำตามลำดับ:
UI-001
Main Menu
↓
UI-002
Character Creation
↓
UI-003
World Creation
↓
UI-004
Loading Screen
↓
UI-005
Core Gameplay HUD
↓
UI-006
Touch Controls
↓
UI-007
Inventory
↓
UI-008
Character
↓
UI-009
Equipment
↓
UI-010
Crafting
↓
UI-011
Quest
↓
UI-012
Map
↓
UI-013
Dialogue
↓
UI-014
Shop
↓
UI-015
Building
↓
UI-016
Combat Target
↓
UI-017
Party
↓
UI-018
Guild
↓
UI-019
Settings
↓
UI-020
LAN Lobby
103. UI FIRST PLAYABLE REQUIREMENT
ก่อนจะไปสร้าง UI ใหญ่ ๆ ทั้งหมด
ต้องทำ:
MAIN MENU + CHARACTER CREATION + WORLD CREATION + GAME HUD + TOUCH CONTROL
ให้ใช้งานจริงก่อน
104. FIRST MOBILE PLAYABLE SCREEN
เมื่อเข้าโลกครั้งแรก ผู้เล่นต้องเห็น:
TOP LEFT: Player
TOP CENTER: Quest
TOP RIGHT: Mini Map
CENTER: World
BOTTOM LEFT: Joystick
BOTTOM RIGHT: Attack + Skills
BOTTOM: XP
นี่คือ Default HUD
105. MOST IMPORTANT UX RULE
ผู้เล่นต้องไม่ต้องถามว่า:
"ฉันต้องกดตรงไหน?"
ทุก Action สำคัญต้อง:
มองเห็น + กดง่าย + มี Feedback
106. ROv-INSPIRED PRINCIPLE
นำแนวคิดจาก Mobile MOBA เช่น RoV มาใช้เฉพาะในส่วน:
Two-thumb control
Large combat buttons
Adjustable control layout
Target locking
Skill aiming
Clear HUD hierarchy
Minimap placement
Fast interaction
ห้ามคัดลอก:
Hero UI
5v5 scoreboard
MOBA lanes
MOBA shop structure
MOBA-specific systems
เพราะเกมนี้เป็น:
SURVIVAL OPEN WORLD RPG
ไม่ใช่ MOBA
107. MMORPG UI PRINCIPLE
ระบบ MMORPG ที่ต้องเตรียม UI:
Character Inventory Equipment Quest Map NPC Shop Craft Skills Party Guild Chat Friends Mail Events Settings Achievements Trading Marketplace World Map
แต่ UI จะถูกเปิดแบบ:
Contextual / Overlay
ไม่ใช่เอาทุกอย่างขึ้นหน้าจอพร้อมกัน
108. FINAL UI ARCHITECTURE
MAIN MENU
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       CHARACTER      WORLD       MULTIPLAYER
          │             │             │
          └─────────────┼─────────────┘
                        ↓
                    GAME HUD
                        │
       ┌────────────────┼────────────────┐
       │                │                │
    PLAYER            WORLD           COMBAT
       │                │                │
       │                │                │
   Inventory         Map             Skills
   Equipment         Quest           Attack
   Character         NPC             Dodge
   Craft             Event           Target
       │                │                │
       └────────────────┼────────────────┘
                        ↓
                  SAVE / STATE
                        ↓
                    MAIN MENU
109. FINAL UI GOAL
เมื่อผู้เล่นเปิดเกม:
ต้องรู้สึกว่า:
"นี่คือเกมมือถือ RPG จริง"
ไม่ใช่:
"นี่คือเว็บ Application ที่เอาปุ่มเกมมาวาง"
เมื่อเข้าโลก:
ซ้ายมือ:
เดิน
ขวามือ:
ต่อสู้
ด้านบน:
ดูสถานะ / Quest / Map
ตรงกลาง:
เล่นเกม
เมนู:
เปิดเมื่อจำเป็น
ทุกอย่าง:
Touch-first
Landscape-first
Mobile-first
110. DEVELOPMENT RULE
สร้าง GAME UI ก่อน
สร้าง GAMEPLAY ให้เชื่อมกับ UI
ตรวจ Touch
ตรวจ Landscape
ตรวจ Mobile
ตรวจ Visual
สร้าง CHECKPOINT
แล้วจึงไปหน้าถัดไป
ห้ามสร้าง UI ทั้งหมดเป็น Mockup แล้วค่อยเชื่อมทีหลัง
END OF UI_BLUEPRINT.md
จุดสำคัญที่ผมอยากเน้นมาก: ผมไม่ได้แนะนำให้เอา UI ของ RoV มาทั้งชุด แต่ให้เอา “ภาษาการควบคุม” ของ RoV มาใช้กับเกมคุณ — สองนิ้ว, ซ้ายเดิน, ขวาต่อสู้, ปุ่มใหญ่, ลากเพื่อเล็ง, ปรับตำแหน่งปุ่มได้, และไม่ยัดข้อมูลทุกอย่างลงจอพร้อมกัน ซึ่งเป็นแนวทางที่เหมาะกับมือถือมากกว่าเอา MMORPG PC มาย่อทั้งจอ �
Arena of Valor +1
อีกอย่างที่ผมตั้งใจวางไว้คือ Mini Map ขวาบน + Joystick ซ้ายล่าง + Combat ขวาล่าง ซึ่งเป็น pattern ที่พบในเกม MMORPG มือถือและ mobile RPG หลายแบบ และ Albion เองก็ปรับ mobile HUD โดยใช้ joystick พร้อมย้าย minimap ไปด้านขวาบนเพื่อให้เหมาะกับจอมือถือ �
Albion Online Forum +1
ดังนั้นตอนนี้คุณมี 2 เอกสารที่ควรให้ AnyClaw อ่าน ก่อนเริ่มแก้เกม:
GAME_BLUEPRINT.md — เกมต้องมีอะไร
UI_BLUEPRINT.md — หน้าจอและ UI ต้องอยู่ตรงไหน/ทำอะไร
แล้วค่อยตามด้วย AI_AGENT.md + CHECKPOINT.md เพื่อควบคุมการทำงานของ Agent ตามที่เราคุยกันก่อนหน้านี้ครับ