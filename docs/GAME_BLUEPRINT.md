ได้ครับ รอบนี้ผมเห็นภาพชัดแล้วว่า เราต้องหยุดคิดเรื่อง Game Generator ก่อนทั้งหมด แล้วทำ “ตัวเกมจริง” ให้เป็นรูปเป็นร่างก่อน
ผมไปดูแนวทางของ RPG/MMORPG และ mobile RPG มาแล้ว โดยเฉพาะโครงสร้างของ RPG ทั่วไป, mobile touch UI และ sandbox MMORPG อย่าง Albion Online ซึ่งมีวงจรสำคัญอย่าง สำรวจ → เก็บทรัพยากร → Craft → อุปกรณ์ → ต่อสู้ → พัฒนา → เศรษฐกิจ/สังคม รวมถึงระบบ Guild/พื้นที่/ตลาด �
Game-Ace +3
และสำหรับเกมมือถือ มีรูปแบบที่ควรมีตั้งแต่แรก เช่น touch joystick, camera control, inventory, quest, character, map และ quick actions �
Fab.com +1
ดังนั้นผมจะวาง Blueprint ใหม่ให้ AI เข้าใจว่า “มันกำลังสร้างเกม ไม่ใช่สร้างหน้าเว็บที่มีปุ่มเกม”
ด้านล่างนี้คือ ไฟล์หลักฉบับเดียว ที่คุณสามารถเอาไปใส่ Notebook/ไฟล์ Markdown แล้วส่งให้ AnyClaw ได้เลย
การเขียน
SURVIVAL OPEN WORLD CRAFT
GAME BLUEPRINT — GAME FIRST / TOOLS LATER
Version 1.0
0. คำสั่งสูงสุด
โปรเจกต์นี้คือเกม:
SURVIVAL OPEN WORLD CRAFT
ประเภท:
2D Top-Down
Open World
Survival
RPG
Sandbox
Crafting
Exploration
PvE
รองรับ Multiplayer แบบ Local LAN ในอนาคต
Offline-first
Mobile-first
Landscape / Horizontal
Touch Screen
Android เป็นแพลตฟอร์มหลัก
กฎสำคัญที่สุด
GAME FIRST
ตอนนี้ให้สร้าง:
เกมที่เปิดแล้วเล่นได้จริง
ห้ามเริ่มสร้าง:
Game Generator
Content Generator
World Generator Tool
Editor
Developer Dashboard
Procedural Content Studio
AI Game Builder
จนกว่า Core Game จะมี Gameplay Loop ที่เล่นได้จริง
เครื่องมือทั้งหมดจะสร้างใน Phase หลังจากเกมต้นแบบเล่นได้แล้ว
1. เป้าหมายของเกม
เกมต้องให้ผู้เล่นรู้สึกว่า:
"ฉันถูกส่งเข้ามาในโลกหนึ่ง และสามารถเอาชีวิตรอด สำรวจ เก็บทรัพยากร Craft ต่อสู้ สร้างบ้าน พัฒนาตัวละคร และสร้างเส้นทางชีวิตของตัวเองได้"
เกมไม่ควรเป็น:
Demo UI
หน้าเว็บจำลองเกม
Prototype ที่มีปุ่มแต่ระบบไม่เชื่อมกัน
หน้าจอที่แสดงค่า HP/XP แต่ไม่มี Gameplay จริง
Inventory ที่เปิดได้แต่ไม่มีระบบ Item จริง
Crafting ที่กดปุ่มแล้วไม่มีผลต่อโลก
ทุกระบบต้องเชื่อมต่อกันเป็น Gameplay Loop จริง
2. CORE GAME LOOP
Gameplay Loop หลัก:
EXPLORE ↓ GATHER ↓ SURVIVE ↓ CRAFT ↓ EQUIP ↓ BUILD ↓ FIGHT ↓ GAIN XP / LOOT ↓ UPGRADE CHARACTER ↓ EXPLORE FURTHER ↓ พบพื้นที่ใหม่ / ทรัพยากรใหม่ / ศัตรูใหม่ ↓ วนกลับ
Secondary Loop:
QUEST ↓ REWARD ↓ XP / ITEM / MONEY / REPUTATION ↓ PROGRESSION
Long-term Loop:
CHARACTER ↓ EQUIPMENT ↓ CRAFTING ↓ BASE ↓ EXPLORATION ↓ WORLD DISCOVERY ↓ SOCIAL / GUILD ↓ ECONOMY ↓ ENDGAME
3. PLATFORM
เป้าหมายแรก:
Android Mobile
หน้าจอ:
Landscape / Horizontal
ต้องออกแบบ UI สำหรับ:
โทรศัพท์จอเล็ก
โทรศัพท์จอใหญ่
Tablet
ห้ามออกแบบ Desktop UI แล้วเอามาย่อ
UI ต้องคิดจาก Mobile Touchscreen ตั้งแต่ต้น
4. GAME CAMERA
รูปแบบ:
2D Top-Down
กล้องมองจากด้านบน
ผู้เล่นอยู่ในโลก 2D ที่สามารถเดินได้ทุกทิศทาง
อย่างน้อย:
Up
Down
Left
Right
Diagonal movement
กล้องติดตาม Player แบบ smooth
ต้องมี:
Camera follow
Camera bounds
World bounds
Camera shake
Zoom
Min/Max zoom
อนาคต:
Mini Map
Full Map
Map markers
Fast Travel
5. MOBILE CONTROL
5.1 Virtual Joystick
ด้านซ้าย:
Virtual Joystick
ใช้สำหรับ:
Movement
ต้องรองรับ:
Dead zone
Analog movement
8-direction movement
Touch cancel
Touch release
5.2 Action Buttons
ด้านขวา:
ปุ่มหลัก:
Attack
Interact
Dodge
Skill
Use Item
Pick Up
ปุ่มต้องสามารถเปลี่ยนตาม Context
ตัวอย่าง:
เดินเข้าใกล้ต้นไม้
ปุ่ม:
INTERACT
เมื่ออยู่ใกล้ศัตรู:
ATTACK
เมื่ออยู่ใกล้ Chest:
OPEN
5.3 Touch Interaction
ต้องรองรับ:
Tap
Hold
Drag
Swipe
Double tap สามารถใช้ในระบบที่เหมาะสม เช่น:
Run
Quick interaction
6. MAIN MENU
ก่อนเข้าเกมต้องมี Main Menu จริง
หน้าหลักประกอบด้วย:
Logo
SURVIVAL OPEN WORLD CRAFT
Buttons
Continue
New Game
Load Game
Multiplayer
Settings
Credits
Exit
บน Android ไม่จำเป็นต้องมี Exit ถ้าระบบปฏิบัติการจัดการเอง
7. NEW GAME
เมื่อกด New Game:
แสดง:
World Name
ตั้งชื่อโลก
Character Name
ตั้งชื่อตัวละคร
World Seed
เลือก:
Random
Custom Seed
Difficulty
เริ่มต้น:
Normal
Hard
Survival
สามารถเพิ่ม Difficulty ภายหลัง
Game Mode
Phase แรก:
Offline
อนาคต:
LAN
8. CHARACTER CREATION
สร้างตัวละครก่อนเริ่มเกม
ต้องมี:
Name
Appearance
Gender presentation / visual preset
Hair
Hair Color
Skin tone
Outfit
Starting appearance
ระบบ Character ต้องออกแบบให้สามารถเพิ่ม cosmetic ภายหลังได้
9. IN-GAME HUD
เมื่อเข้าเกม หน้าจอหลักต้องมี HUD
ตัวอย่าง:
┌──────────────────────────────────────────────┐
│ HP ████████   HUNGER ██████   LV 1          │
│ XP ████░░░░                      💰 100      │
│                                              │
│                                              │
│                 WORLD                        │
│                                              │
│                  PLAYER                      │
│                                              │
│                                              │
│                               ⚔             │
│             ◉ JOYSTICK          ● ATTACK     │
│                                ● SKILL       │
│                                ● DODGE       │
└──────────────────────────────────────────────┘
HUD ต้องไม่บัง Gameplay
10. HUD COMPONENTS
อย่างน้อย:
Player Status
HP
Max HP
Hunger
Stamina
XP
Level
อนาคต:
Mana
Temperature
Thirst
Buff
Debuff
Status Effects
11. QUICK ACCESS
ด้านขวา/ล่าง:
Quick Slots
อย่างน้อย 4-8 ช่อง
ผู้เล่นสามารถ:
เปลี่ยนอาวุธ
ใช้ Potion
ใช้ Tool
ใช้ Food
โดยไม่ต้องเปิด Inventory ทุกครั้ง
12. INVENTORY
Inventory ต้องเป็นระบบจริง
ต้องรองรับ:
Item ID
Quantity
Stack
Weight
Rarity
Category
Durability
Description
Icon
Value
Crafting material
Equipment data
หมวด:
Weapons
Armor
Tools
Food
Potion
Resources
Materials
Quest Items
Misc
13. EQUIPMENT
ตัวละครต้องมี Equipment Slots
อย่างน้อย:
Head
Chest
Legs
Feet
Main Hand
Off Hand
Accessory 1
Accessory 2
Equipment มี:
Attack
Defense
Speed
Durability
Special Effects
14. CHARACTER STATS
Core Stats:
HP
Attack
Defense
Speed
Stamina
Critical Chance
Critical Damage
Survival Stats:
Hunger
Thirst
Temperature
Health Recovery
RPG Stats สามารถเพิ่ม:
Strength
Dexterity
Intelligence
Vitality
Luck
15. LEVEL / XP
ระบบ Level จริง
XP ได้จาก:
Combat
Quest
Exploration
Gathering
Crafting
Discovery
Boss
Achievement
Level Up ต้องมีผลจริง
เช่น:
Level 2:
+HP +Stat +Skill Point
16. SKILL SYSTEM
เริ่มต้นไม่ต้องทำ Skill Tree ใหญ่
Phase 1:
Basic Attack
Dodge
One Active Skill
One Passive Skill
ออกแบบ Architecture ให้สามารถเพิ่ม Skill ได้ในอนาคต
Skill ต้องมี:
ID
Name
Description
Cooldown
Cost
Damage
Range
Effect
17. WORLD
โลกต้องเป็น 2D Top-Down
ประกอบด้วย:
Grass
Dirt
Sand
Water
Stone
Mountain
Forest
River
Lake
Cave
Village
Ruins
Phase 1 ไม่จำเป็นต้องสร้างโลกขนาดมหาศาล
ให้สร้าง:
STARTING REGION
หนึ่งภูมิภาคที่เล่นได้จริง
ประกอบด้วย:
Spawn Area
Forest
River
Resource Area
Enemy Area
Small Village
Cave
Dungeon Entrance
18. WORLD STRUCTURE
โลกต้องมีแนวคิด:
World → Region → Zone → Chunk → Tile
แต่ใน Phase แรกไม่จำเป็นต้องสร้าง Generator Tool
ขอเพียง Runtime World Structure ที่ใช้งานจริง
19. BIOME
เริ่มต้น:
Grassland
Forest
River
Rocky Area
Cave
อนาคต:
Desert
Snow
Swamp
Jungle
Mountain
Volcano
Ocean
Ruins
Biome ต้องมี:
Visual
Resources
Creatures
Weather
Temperature
Music
Spawn Rules
20. DAY / NIGHT
ต้องมีระบบเวลา
Cycle:
Morning → Day → Evening → Night
ผลต่อ Gameplay:
กลางคืน:
Visibility ลดลง
Enemy บางชนิดเกิด
Resource บางชนิดเปลี่ยน
NPC บางตัวกลับบ้าน
Player ต้องใช้ Torch / Light
21. WEATHER
Phase 1:
Clear
Rain
อนาคต:
Storm
Fog
Snow
Heat
Wind
Weather ต้องมี Gameplay Effect
เช่น:
Rain:
Visibility ลด
Fire behavior เปลี่ยน
Water source เพิ่ม
บรรยากาศเปลี่ยน
22. RESOURCE SYSTEM
ทรัพยากร:
Wood
Stone
Fiber
Berry
Food
Ore
Coal
Iron
Hide
Resource Node ต้องมี:
Health
Resource Type
Respawn Time
Tool Requirement
Yield
23. GATHERING
Player ต้องสามารถ:
Chop Tree
Mine Rock
Gather Plant
Hunt Animal
Fish
เริ่มต้น:
Wood Stone Fiber
ก่อน
24. TOOLS
Tools:
Axe
Pickaxe
Knife
Fishing Rod
Tool มี:
Durability
Gathering Power
Gathering Speed
Tier
25. CRAFTING
Crafting ต้องเป็นระบบจริง
เริ่มต้น:
Tools
Wooden Axe
Wooden Pickaxe
Stone Axe
Stone Pickaxe
Weapons
Wooden Sword
Stone Sword
Bow
Survival
Campfire
Torch
Storage Chest
Building
Foundation
Wall
Door
Floor
Roof
26. CRAFTING STATIONS
อนาคต:
Workbench
Furnace
Forge
Cooking Station
Alchemy Station
Tailor
Carpenter
แต่ Phase แรก:
Workbench + Campfire
เพียงพอ
27. BUILDING
Player สามารถสร้าง Base
เริ่มต้น:
Floor
Wall
Door
Roof
Chest
Campfire
Workbench
ระบบต้องตรวจ:
Placement
Collision
Grid/Snap
Resource Cost
28. COMBAT
Combat ต้องเป็น Real-Time Action Combat
Player:
Basic Attack
Heavy Attack / Skill
Dodge
Block ถ้าอาวุธรองรับ
Enemy:
Detection
Chase
Attack
Retreat
Death
Loot
29. ENEMY SYSTEM
เริ่มต้น:
Wildlife
Rabbit
Deer
Boar
Hostile
Slime
Wolf
Bandit
แต่ละตัวต้องมี:
HP
Attack
Defense
Speed
Detection Range
Attack Range
Loot
XP
30. AI
Enemy AI State Machine:
IDLE ↓ PATROL ↓ DETECT ↓ CHASE ↓ ATTACK ↓ HURT ↓ DEAD
บางศัตรู:
ATTACK ↓ RETREAT ↓ RECOVER ↓ CHASE
31. LOOT
Enemy ตายแล้วต้องมี Loot จริง
Loot:
Resource
Food
Material
Equipment
Currency
Drop ต้องมี:
Drop Table
Quantity
Chance
Rarity
32. RARITY
เริ่มต้น:
Common
Uncommon
Rare
Epic
Legendary
แต่ระบบต้องไม่ทำให้เกมกลายเป็น “สุ่มสีไอเท็ม” อย่างเดียว
Rarity ต้องมีผลต่อ:
Stats
Special Effects
Value
33. SURVIVAL
Core Survival:
HP
Hunger
Stamina
เพิ่มภายหลัง:
Thirst
Temperature
Sleep
Injury
Poison
Bleeding
Hunger ต้องมีผลจริง
เช่น:
Hunger ต่ำ → Stamina Recovery ลด
Hunger critical → HP ลด
34. FOOD
อาหาร:
Berry
Meat
Cooked Meat
Bread
Vegetable
Food มี:
Hunger Restore
HP Restore
Buff
Duration
35. NPC
Starting Village มี NPC อย่างน้อย:
Elder
Merchant
Blacksmith
Crafter
Quest NPC
NPC ต้องสามารถ:
Talk
Give Quest
Buy
Sell
Craft
Repair
36. DIALOGUE
Dialogue System ต้องรองรับ:
NPC
Dialogue ID
Choices
Conditions
Rewards
Quest integration
ตัวอย่าง:
NPC:
"ช่วยนำไม้ 10 ชิ้นมาให้ฉัน"
Choices:
[รับภารกิจ] [ถามเพิ่มเติม] [ยกเลิก]
37. QUEST SYSTEM
Quest Types:
Gather
Kill
Explore
Talk
Craft
Deliver
Discover
Boss
Quest State:
AVAILABLE → ACTIVE → COMPLETED → TURNED IN
38. QUEST UI
ต้องมี:
Active Quest
Objectives
Rewards
Progress
HUD สามารถแสดง:
Quest: Gather Wood 5 / 10
39. MAP
Mini Map:
แสดง:
Player
NPC
Quest
Resource
Enemy
Village
Dungeon
Important Locations
Full Map:
Regions
Discovered Area
Markers
Fast Travel points
40. EXPLORATION
โลกต้องมี Exploration Reward
เช่น:
Discover New Area
Discover Cave
Discover Ruin
Discover Village
Discover Rare Resource
ทุกพื้นที่ที่ค้นพบควรมีเหตุผลให้ผู้เล่นเดินไป
41. DUNGEON
Phase 1:
สร้าง Dungeon ขนาดเล็ก 1 แห่ง
มี:
Entrance
Rooms
Enemies
Treasure
Mini Boss
Boss
Boss ต้องมี:
Phase
Attack Pattern
Reward
42. DEATH
เมื่อ Player HP = 0:
แสดง:
DEFEATED
ตัวเลือก:
Respawn
Return to Base
Phase แรกไม่ต้องทำ Full Loot
แต่ Architecture ต้องรองรับ Death Rules ในอนาคต
43. SAVE / LOAD
เกมนี้ Offline-first
ดังนั้น Save System สำคัญมาก
ต้อง Save:
Player
Level
XP
Stats
Inventory
Equipment
Quest
World State
Buildings
Resource State
NPC State
Time
World Seed
ต้องมี:
Auto Save
Manual Save
Save Slot
Load
44. OFFLINE-FIRST
เกมต้องเล่น Offline ได้เป็นหลัก
เมื่อไม่มี Internet:
ยังสามารถ:
Start Game
Play
Explore
Craft
Fight
Build
Save
Load
ได้ตามปกติ
Internet ไม่ควรเป็น dependency ของ Core Gameplay
45. UPDATE SYSTEM
Internet ใช้สำหรับ:
Game Update
Content Update
Patch
Version Check
เมื่อเปิดเกม:
ตรวจ:
LOCAL VERSION vs AVAILABLE VERSION
ถ้ามี Update:
แสดง:
NEW UPDATE AVAILABLE
ผู้เล่นเลือก:
UPDATE NOW
หรือ:
LATER
เกม Offline ที่ติดตั้งแล้วต้องยังเล่นได้แม้ไม่มี Internet
46. LOCAL LAN MULTIPLAYER
นี่เป็นระบบระยะถัดไป ไม่ใช่สิ่งที่ต้องทำก่อน Core Gameplay
เป้าหมาย:
ผู้เล่นอยู่ Wi-Fi เดียวกัน
ตัวอย่าง:
Player A: Create LAN World
Player B: Find LAN Games
Player B: Join
ไม่ต้องใช้ Internet Server สำหรับ LAN
47. LAN ARCHITECTURE
Host:
World Authority
Enemy State
NPC State
World State
Client:
Player Input
Camera
UI
Local Prediction
ต้องมี:
Discovery
Lobby
Join
Leave
Reconnect
Sync
Host Migration ในอนาคต
48. MMORPG DIRECTION
เกมต้องออกแบบ Architecture ให้สามารถขยายเป็น MMORPG ได้
แต่ห้ามทำ MMO Server ก่อน Core Game เสร็จ
ระบบ MMORPG ในอนาคต:
Persistent Character
Account
Friends
Party
Guild
Chat
Mail
Marketplace
Trading
Economy
World Events
Dungeon
Boss
PvE
PvP
Territory
Guild Base
49. PARTY
อนาคต:
Party Size:
4-5 Players
ระบบ:
Invite
Accept
Leave
Leader
Ready
Shared Quest
Party Loot
50. GUILD
Guild ต้องรองรับ:
Create
Join
Leave
Invite
Roles
Rank
Guild Chat
Guild Storage
Guild Quest
อนาคต:
Guild Base
Territory
Guild War
Sandbox MMORPG อย่าง Albion Online แสดงให้เห็นว่าระบบ Guild, Territory, Crafting และ Economy สามารถเชื่อมกันจนกลายเป็นแกนของโลกได้ ดังนั้น Architecture ของเกมนี้ควรเตรียมจุดเชื่อมไว้ตั้งแต่แรก แต่ไม่จำเป็นต้องสร้างทั้งหมดใน Alpha แรก
51. ECONOMY
เริ่มต้น:
Currency:
Gold
ระบบ:
Buy
Sell
Vendor
อนาคต:
Player Trading
Marketplace
Player Shops
Supply/Demand
Regional Prices
52. CRAFTING ECONOMY
ทรัพยากรต้องมีความสัมพันธ์:
RAW RESOURCE ↓ REFINE ↓ MATERIAL ↓ CRAFT ↓ EQUIPMENT ↓ USE / SELL
แนวคิดนี้ทำให้ Gathering, Crafting และ Economy เชื่อมกันจริง ซึ่งเป็นหนึ่งในจุดเด่นของ sandbox MMORPG เช่น Albion Online
53. SOCIAL SYSTEM
ในอนาคต:
Friends
Chat
Party
Guild
Trade
Mail
Emotes
Player Profile
แต่ Core Offline ต้องไม่พึ่งระบบเหล่านี้
54. SETTINGS
Main Settings:
Graphics
Quality
Resolution / Scale
FPS
Effects
Audio
Master
Music
SFX
Ambient
Controls
Joystick Size
Button Size
Button Position
Sensitivity
Gameplay
Damage Numbers
Auto Pickup
Show Quest Marker
Language
55. ACCESSIBILITY
ต้องมี:
UI Scale
Text Size
Button Scale
Vibration Toggle
Reduced Effects
Color-independent indicators
56. AUDIO
ต้องมี:
Footsteps
Attack
Hit
Pickup
Craft
UI Click
Level Up
Quest Complete
Enemy Death
Ambient
Rain
Wind
Day/Night Music
57. FEEDBACK SYSTEM
ทุก Action สำคัญต้อง Feedback
ตัวอย่าง:
Pickup:
+5 Wood
Craft:
CRAFTED: Stone Axe
Level:
LEVEL UP!
Quest:
QUEST COMPLETE
Combat:
Damage number
ระบบต้องมี:
Animation
Sound
Particle
Floating Text
UI feedback
58. TUTORIAL
ผู้เล่นใหม่ต้องสามารถเข้าใจเกมได้โดยไม่ต้องอ่านคู่มือยาว
Tutorial:
Move
Gather
Craft
Equip
Fight
Eat
Build
Quest
Explore
Save
Tutorial ต้องเป็น Gameplay ไม่ใช่ข้อความยาว ๆ อย่างเดียว
59. FIRST PLAYABLE EXPERIENCE
ผู้เล่นใหม่ต้องใช้เวลาไม่นานในการเข้าใจ:
"ฉันต้องทำอะไร?"
ตัวอย่าง:
Spawn ↓ NPC พบ Player ↓ Quest: Gather 5 Wood ↓ Player เดินไป Forest ↓ เก็บ Wood ↓ Craft Axe ↓ NPC ให้ Quest ใหม่ ↓ พบ Enemy ↓ Combat ↓ ได้ XP ↓ Level Up ↓ เปิดพื้นที่ใหม่
นี่คือ Vertical Slice แรก
60. FIRST PLAYABLE REGION
ต้องสร้างให้เล่นได้จริงหนึ่ง Region
ประกอบด้วย:
Village
NPC
Merchant
Workbench
Storage
Quest
Forest
Trees
Animals
Resources
Hostile Creature
River
Water
Fish
Crossing
Cave
Ore
Monsters
Treasure
Dungeon
Enemies
Boss
Reward
61. MINIMUM VIABLE GAME
เกมถือว่า "Playable" เมื่อผู้เล่นสามารถ:
เปิดเกม
สร้างตัวละคร
เริ่มโลก
เดินด้วย Touch
สำรวจ
เก็บ Resource
เปิด Inventory
Craft
Equip
ต่อสู้
ฆ่า Enemy
รับ XP
Level Up
รับ Quest
ทำ Quest
ได้ Reward
สร้างสิ่งปลูกสร้าง
กินอาหาร
สูญเสีย HP/Hunger
เข้า Dungeon
ฆ่า Boss
ได้ Loot
Save
ปิดเกม
เปิดใหม่
Load
เล่นต่อจากจุดเดิม
ถ้าข้อใดเป็นเพียง UI แต่ไม่มีระบบจริง ให้ถือว่า NOT COMPLETE
62. GAME STATE
Game State ต้องสามารถอธิบายได้ด้วยข้อมูล
อย่างน้อย:
PLAYER WORLD QUEST INVENTORY EQUIPMENT BUILDINGS NPC ENEMIES TIME WEATHER SAVE
ทุกระบบต้องมี State ที่ชัดเจน
63. DATA-DRIVEN DESIGN
Item ไม่ควร Hard-code ทุกตัว
Enemy ไม่ควร Hard-code ทุกตัว
Quest ไม่ควร Hard-code ทุกตัว
ให้ระบบออกแบบในรูปแบบ Data-driven
ตัวอย่าง:
Item Definition
ID
Name
Type
Stack
Weight
Value
Stats
Recipe
Icon
Enemy Definition
ID
HP
Attack
Defense
Speed
AI Type
Loot Table
XP
Quest Definition
ID
Type
Objective
Requirement
Reward
นี่จะเป็นพื้นฐานสำคัญสำหรับการสร้าง Tools ใน Phase หลัง
64. ARCHITECTURE PRINCIPLE
ระบบต้องแยกเป็น Module
ตัวอย่าง:
Player World Combat Inventory Equipment Crafting Building Quest Dialogue NPC AI Resource Survival Save Audio UI Input Map Time Weather
แต่ละระบบต้องมี Interface ระหว่างกัน
ห้ามทำทุกอย่างรวมอยู่ในไฟล์เดียว
65. UI ARCHITECTURE
UI ต้องแยก:
Main Menu Character Creation HUD Inventory Equipment Crafting Quest Map Character Settings Dialogue Shop Death Save/Load LAN Lobby
66. MAIN MENU FLOW
START
 ↓
MAIN MENU
 ├── Continue
 ├── New Game
 ├── Load Game
 ├── Multiplayer
 ├── Settings
 └── Credits
New Game:
New Game
 ↓
Character Creation
 ↓
World Settings
 ↓
Loading
 ↓
Spawn
 ↓
Tutorial
 ↓
Open World
67. GAME FLOW
MAIN MENU
 ↓
LOAD WORLD
 ↓
PLAYER SPAWN
 ↓
HUD
 ↓
EXPLORE
 ↓
INTERACT
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
REWARD
 ↓
LEVEL UP
 ↓
BUILD
 ↓
SAVE
68. PERFORMANCE
Mobile-first
ต้องระวัง:
RAM
CPU
GPU
Draw Calls
Texture Memory
Object Count
Particle Count
AI Count
ห้ามสร้าง Entity หลายพันตัวพร้อมกันโดยไม่มีเหตุผล
World ต้องมีแนวคิด:
Active Area + Loaded Area + Unloaded Area
69. MOBILE PERFORMANCE RULE
ต้องรองรับมือถือระดับกลาง/ต่ำ
เป้าหมาย:
Stable FPS
ไม่สร้างระบบที่ต้องใช้:
High-end GPU
Desktop-only feature
Massive real-time simulation
ระบบที่อยู่นอกจอควรลดการประมวลผลตามความเหมาะสม
70. ERROR HANDLING
ระบบต้องไม่พังเพราะ:
Item ไม่มี
Resource ไม่มี
Quest state ผิด
Save หาย
Player ตาย
Enemy หาย
World โหลดไม่ได้
ต้องมี:
Validation
Fallback
Error state
Logging
71. SAVE SAFETY
Save ต้องมี:
Version
Timestamp
Checksum/validation ตามความเหมาะสม
Migration path
หาก Save version เก่า:
OLD SAVE ↓ MIGRATION ↓ CURRENT SAVE
72. DEVELOPMENT PHASES
PHASE 0 — FOUNDATION
สร้าง:
Project
Scene
Input
Camera
Player
UI framework
PHASE 1 — PLAYABLE CORE
สร้าง:
Top-down movement
Touch joystick
Camera
World
Resource
Inventory
Crafting
Equipment
Combat
Enemy
Survival
XP
Level
Save
เป้าหมาย:
เกมต้องเล่นได้
PHASE 2 — RPG
เพิ่ม:
Quest
NPC
Dialogue
Merchant
Character progression
Skills
Equipment progression
Dungeon
Boss
PHASE 3 — OPEN WORLD
เพิ่ม:
Multiple regions
Biomes
Day/Night
Weather
Exploration
Map
Fast Travel
World events
PHASE 4 — SURVIVAL / SANDBOX
เพิ่ม:
Farming
Cooking
Building expansion
Storage
Resource tiers
Crafting stations
Base progression
PHASE 5 — LAN
เพิ่ม:
LAN discovery
Host
Join
Lobby
Player synchronization
World synchronization
Combat synchronization
Save authority
PHASE 6 — SOCIAL
เพิ่ม:
Party
Friends
Chat
Guild
Trading
PHASE 7 — ONLINE UPDATE
เพิ่ม:
Version check
Patch
Content manifest
Update
Rollback
Compatibility
PHASE 8 — MMORPG FOUNDATION
เฉพาะเมื่อ Core Game ผ่านแล้ว:
Account
Persistent Character
Server
Database
Economy
Marketplace
Guild
Territory
World Events
Persistent World
73. IMPORTANT: MMORPG SCOPE RULE
เกมนี้มีเป้าหมายระยะยาวเป็น MMORPG
แต่ ห้ามสร้าง MMORPG infrastructure ทั้งหมดในตอนแรก
ให้สร้าง:
MMORPG-READY
ไม่ใช่:
MMORPG-FIRST
กล่าวคือ:
ระบบ Offline ต้องทำงานได้ก่อน
แล้ว Architecture ต้องเปิดทางให้:
Offline → LAN → Online
โดยไม่ต้องเขียน Core Game ใหม่ทั้งหมด
74. CHECKPOINT SYSTEM
ต้องมีไฟล์:
CHECKPOINT.md
ทุกงานต้องมี Checkpoint
ตัวอย่าง:
CHECKPOINT #001

Task:
Mobile Core

Status:
COMPLETED

Completed:
- Player movement
- Touch joystick
- Camera
- HUD

Files:
...

Tests:
PASS

Visual Verification:
PASS / PENDING

Next:
Inventory
75. ONE TASK = ONE CHECKPOINT
กฎ:
ทำงาน 1 อย่าง → ตรวจ → Checkpoint
ห้าม:
ทำ 20 อย่าง → Checkpoint ครั้งเดียว
เพราะถ้า Token หมด Agent ตัวใหม่ต้องสามารถกลับมาทำต่อได้ทันที
76. AI_AGENT.md
AI Agent ต้อง:
อ่าน BLUEPRINT
อ่าน CHECKPOINT
ตรวจ Repository
วิเคราะห์สิ่งที่มีอยู่
ห้ามสร้างระบบซ้ำ
เลือก Task ถัดไป
ทำ Task
Test
Verify
Update CHECKPOINT
Commit
ไป Task ถัดไป
77. TOKEN-SAFE DEVELOPMENT
เนื่องจาก Agent มี Token จำกัด:
ห้ามอ่าน Repository ทั้งหมดซ้ำโดยไม่มีเหตุผล
ให้โหลดเฉพาะ:
Current Task
Relevant Files
Architecture
Checkpoint
Required Dependencies
เมื่อ Task เสร็จ:
สร้าง Checkpoint
อย่าทิ้ง Context ใหญ่โดยไม่จำเป็น
78. VISUAL VERIFICATION
AI สามารถตรวจ:
Code
Build
Test
Runtime logs
แต่หาก AI ไม่มี Visual Browser:
ห้ามประกาศว่า UI ผ่านเพียงเพราะ Build ผ่าน
สถานะต้องเป็น:
CODE: PASS
BUILD: PASS
TEST: PASS
RUNTIME: PASS
VISUAL: PENDING
มนุษย์สามารถตรวจหน้าจอจริงแล้วเปลี่ยน:
VISUAL: PASS
79. DEFINITION OF DONE
ระบบใดจะถือว่า DONE เมื่อ:
Implemented
Integrated
Tested
No known critical error
Gameplay works
UI works
Mobile touch works
Save state works ถ้าเกี่ยวข้อง
Checkpoint updated
Commit created
แค่:
"สร้างไฟล์แล้ว"
ไม่ถือว่า DONE
80. ห้ามสร้าง Fake Systems
ห้ามทำ:
Button → console.log("Crafted!")
แล้วถือว่า Crafting เสร็จ
ห้ามทำ:
Quest Button → Quest Complete
โดยไม่มี Objective
ห้ามทำ:
Attack Button → ลด HP แบบสุ่ม
โดยไม่มี Combat System
ห้ามทำ:
Inventory → เปิดหน้าต่างเฉย ๆ
โดยไม่มี Item State
ห้ามทำ:
Save Button → แสดงข้อความ Saved
โดยไม่มี Save จริง
ทุกระบบต้องมี State และผลต่อเกมจริง
81. NO PLACEHOLDER AS FINAL
Placeholder ใช้ได้ในช่วง Development
แต่ก่อน Checkpoint:
PLAYABLE
ต้องแทน Placeholder ที่จำเป็นด้วยระบบจริง
82. FIRST VERTICAL SLICE
ก่อนสร้างระบบจำนวนมาก ให้ทำ Vertical Slice ให้เสร็จ:
MAIN MENU
 ↓
CHARACTER CREATION
 ↓
WORLD
 ↓
MOVE
 ↓
GATHER WOOD
 ↓
INVENTORY
 ↓
CRAFT AXE
 ↓
EQUIP AXE
 ↓
FIGHT ENEMY
 ↓
GET XP
 ↓
LEVEL UP
 ↓
QUEST
 ↓
BUILD CAMPFIRE
 ↓
EAT FOOD
 ↓
NIGHT
 ↓
SAVE
 ↓
QUIT
 ↓
LOAD
 ↓
CONTINUE
เมื่อทั้งหมดนี้ทำงานจริง:
VERTICAL SLICE = PASS
จึงเริ่มขยายโลก
83. DEVELOPMENT PRIORITY
Priority:
P0 — MUST HAVE
Main Menu
Mobile Landscape
Touch Controls
Player
Camera
World
Inventory
Items
Resource
Gathering
Crafting
Equipment
Combat
Enemy
HP
Hunger
XP
Level
Save/Load
P1 — IMPORTANT
NPC
Quest
Dialogue
Merchant
Map
Day/Night
Building
Food
Dungeon
Boss
P2 — EXPANSION
Biomes
Weather
Farming
Advanced Crafting
Skills
Events
P3 — MULTIPLAYER
LAN
Party
Chat
Friends
P4 — MMORPG
Account
Persistent Server
Guild
Economy
Marketplace
Territory
Online World
84. CURRENT MISSION
ตอนเริ่มทำงาน ห้ามสร้างทุกระบบพร้อมกัน
ขั้นแรก:
STEP 1
ตรวจสอบ Repository ปัจจุบัน
STEP 2
เปรียบเทียบกับ Blueprint นี้
STEP 3
สร้าง:
GAME GAP REPORT
ระบุ:
มีอะไรแล้ว
อะไรใช้ต่อได้
อะไรต้องแก้
อะไรขาด
อะไรเป็น Fake/Placeholder
อะไรต้อง Refactor
อะไรต้องสร้างใหม่
STEP 4
สร้าง:
MASTER TASK LIST
พร้อม:
Task ID
Description
Dependencies
Priority
Files
Definition of Done
STEP 5
เริ่ม P0
STEP 6
สร้าง Vertical Slice
STEP 7
Checkpoint ทุก Task
85. ห้ามเปลี่ยนเป้าหมาย
ห้ามเปลี่ยนโปรเจกต์เป็น:
Game Generator
Editor
AI Game Builder
Tool Suite
จนกว่าจะผ่าน:
VERTICAL SLICE PASS
+
CORE GAME PASS
หลังจากนั้นจึงเริ่ม:
GAME TOOLS PHASE
ซึ่งจะสร้างเครื่องมือจากระบบจริงที่พิสูจน์แล้ว
86. FINAL DESIGN PRINCIPLE
เกมนี้ต้องยึดหลัก:
PLAYABLE FIRST
SYSTEMS MUST INTERACT
MOBILE FIRST
OFFLINE FIRST
MMORPG READY
DATA DRIVEN
CHECKPOINT EVERY COMPLETED TASK
NO FAKE SYSTEMS
NO UNNECESSARY TOOLS BEFORE THE GAME WORKS
BUILD THE GAME FIRST
BUILD THE TOOLS SECOND
87. FINAL SUCCESS CONDITION
Phase แรกถือว่าสำเร็จเมื่อผู้เล่นสามารถหยิบโทรศัพท์ Android แนวนอนขึ้นมา:
เปิดเกม → เห็น Main Menu → สร้างตัวละคร → เข้าโลก → เดินด้วย Touch → สำรวจ → เก็บของ → Craft → Equip → ต่อสู้ → รับ XP → Level Up → รับ Quest → ทำ Quest → สร้างของ → เอาชีวิตรอด → Save → ปิดเกม → เปิดใหม่ → Load → เล่นต่อ
และผู้เล่นต้องรู้สึกว่า:
นี่คือเกม Survival Open World RPG จริง
ไม่ใช่:
Application ที่มีปุ่มเลียนแบบเกม
END OF GAME BLUEPRINT
เครื่องมือสร้างเกมทั้งหมดให้สร้างใน Phase หลังจาก Core Game และ Vertical Slice ผ่านแล้วเท่านั้น
ทำไมผมถึงวางแบบนี้
ผมตั้งใจให้ ช่วงแรกไม่พยายามทำ MMORPG เต็มรูปแบบ แต่สร้าง “แกนเกม MMORPG” ให้ถูกก่อน เพราะระบบ RPG ที่ดีต้องเชื่อม stats/progression + inventory/equipment + combat + quests + save/load เข้าด้วยกัน ไม่ใช่สร้างแต่ละระบบแยกกัน �
GitHub +1
ส่วนแนว Sandbox/Survival + Crafting + Economy + Guild ผมเอาหลักคิดจากเกมอย่าง Albion มาเป็นแนวอ้างอิง แต่ไม่ได้หมายความว่าเราต้องลอก Albion — จุดที่น่าสนใจคือการทำให้ ทรัพยากร → Crafting → อุปกรณ์ → การสำรวจ/ต่อสู้ → Economy → Social เชื่อมเป็นระบบเดียวกัน �
Albion Online +1
และผมจงใจให้ Vertical Slice มาก่อน เพราะตอนนี้ปัญหาของเกมคุณไม่ใช่ “มีระบบน้อยเกินไป” แต่คือ ระบบที่มีอยู่ยังไม่ได้พิสูจน์ว่าเล่นเป็นเกมเดียวกันได้จริง ดังนั้นถ้า AnyClaw ทำตาม Blueprint นี้ มันจะต้องสร้างเส้นทาง:
Main Menu → เข้าเกม → เล่น → ตาย/รอด → Save → กลับมาเล่นต่อ
ให้ผ่านก่อน แล้วค่อยขยายโลกครับ.