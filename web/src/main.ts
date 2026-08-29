import { generateChunk } from "../../game/src/procedural/terrain.js";
import { Chunk } from "../../game/src/world/chunk.js";
import { World } from "../../game/src/world/world.js";
import { Inventory } from "../../game/src/inventory/inventory.js";
import { craft, canCraft, listRecipes } from "../../game/src/crafting/crafting.js";
import { attackEnemy } from "../../game/src/combat/combat.js";
import { Enemy } from "../../game/src/enemies/enemy.js";
import { BIOMES } from "../../shared/registries/biomes.js";
import { BLOCKS } from "../../shared/registries/blocks.js";
import { ITEMS } from "../../shared/registries/items.js";
import { createStats, addXp, eat } from "../../game/src/player/stats.js";
import { applySurvivalTick, isStarving } from "../../game/src/survival/survival.js";
import { Farm } from "../../game/src/farming/farming.js";
import { Rng } from "../../game/src/core/rng.js";
import type { GameEvent } from "../../shared/contracts/events.js";
import type { StatBlock } from "../../shared/types/state.js";
import { createDayNight, tickDayNight, phaseLabel } from "../../game/src/world/daynight.js";
import { createWeather, tickWeather, weatherLabel } from "../../game/src/world/weather.js";
import { Creature } from "../../game/src/ai/creature.js";
import { ENEMIES } from "../../shared/registries/enemies.js";

// --- Canvas / DOM ---
const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// --- Sprite atlas (CC0-style placeholder: assets/tiles/atlas.png) ---
const atlasImg = new Image();
let atlas: HTMLImageElement | null = null;
let atlasTiles: Record<string, number> = {};
const ATLAS_TILE = 16;
atlasImg.onload = () => { atlas = atlasImg; };
atlasImg.src = "/tiles/atlas.png";
fetch("/tiles/index.json")
  .then((r) => r.json())
  .then((d: { tiles: Record<string, number> }) => { atlasTiles = d.tiles; })
  .catch(() => {});
const hotbarEl = document.getElementById("hotbar")!;
const panelEl = document.getElementById("panel")!;
const msgEl = document.getElementById("msg")!;
const startEl = document.getElementById("start")!;
const btnStart = document.getElementById("btn-start") as HTMLButtonElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const worldSelect = document.getElementById("world") as HTMLSelectElement;

// --- World presets ---
const PRESETS = [1337, 4242, 9001, 2026];
function seedOptions(): void {
  worldSelect.innerHTML = "";
  for (const s of PRESETS) {
    const o = document.createElement("option");
    o.value = String(s);
    o.textContent = `โลก seed ${s}`;
    worldSelect.appendChild(o);
  }
}
seedOptions();

// --- State ---
let world: World;
let inv: Inventory;
let stats: StatBlock;
let farm = new Farm();
let player = { x: 8 * 16 + 8, y: 8 * 16 + 8, px: 0, py: 0 };
let enemies: Enemy[] = [];
const rng = new Rng(Date.now() >> 3);
let camera = { x: 0, y: 0 };
let gameTime = 0;
let lastTick = 0;
let msg = "";
let msgT = 0;
let selectedSlot = 0;
let running = false;
const TILE = 24;
let dn = createDayNight(300, 0.45);
let weather = createWeather("clear", 0, 25);
let creatures: Creature[] = [];
const ENEMY_IDS = Object.keys(ENEMIES);

function makeWorld(seed: number): World {
  const w = new World({ seed, chunkSize: 16, radiusChunks: 0, dayLengthSeconds: 1200, spawn: { x: 0, y: 0 }, rules: { friendlyFire: false, keepInventoryOnDeath: true, hungerEnabled: true, thirstEnabled: true, mobSpawning: true } });
  return w;
}

function ensureChunks(w: World): void {
  const size = w.settings.chunkSize;
  const pcx = Math.floor(player.x / size);
  const pcz = Math.floor(player.y / size);
  for (let dz = -5; dz <= 5; dz++) {
    for (let dx = -5; dx <= 5; dx++) {
      const cx = pcx + dx;
      const cz = pcz + dz;
      if (!w.hasChunk(cx, cz)) {
        const c = new Chunk({ cx, cz }, size);
        generateChunk(c, w.settings.seed);
        w.setChunk(c);
      }
    }
  }
}

function spawnEnemies(w: World): void {
  enemies = [];
  creatures = [];
  const size = w.settings.chunkSize;
  for (let i = 0; i < 8; i++) {
    const eid = ENEMY_IDS[i % ENEMY_IDS.length]!;
    const x = Math.floor(player.x / size) * size + rng.int(-16, 16);
    const y = Math.floor(player.y / size) * size + rng.int(-16, 16);
    const c = new Creature(eid, { x, y });
    creatures.push(c);
  }
}

// --- Rendering ---
function draw(): void {
  const w = canvas.width / TILE;
  const h = canvas.height / TILE;
  ctx.fillStyle = "#0b0f1a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const camCX = Math.round(camera.x);
  const camCY = Math.round(camera.y);
  for (let ty = camCY - h; ty <= camCY + h; ty++) {
    for (let tx = camCX - w; tx <= camCX + w; tx++) {
      const block = world.blockAt(tx, ty);
      if (block === "air") continue;
      const sx = (tx - camCX) * TILE + canvas.width / 2;
      const sy = (ty - camCY) * TILE + canvas.height / 2;
      // draw from sprite atlas when available, else solid color
      const idx = atlasTiles[block];
      if (atlas && idx !== undefined) {
        const col = idx % 8;
        const row = Math.floor(idx / 8);
        ctx.drawImage(atlas, col * ATLAS_TILE, row * ATLAS_TILE, ATLAS_TILE, ATLAS_TILE,
          Math.round(sx), Math.round(sy), TILE, TILE);
      } else {
        ctx.fillStyle = colorForFallback(block);
        ctx.fillRect(Math.round(sx), Math.round(sy), TILE, TILE);
      }
    }
  }

  // creatures (AI)
  for (const e of creatures) {
    const sx = (e.pos.x - camCX) * TILE + canvas.width / 2;
    const sy = (e.pos.y - camCY) * TILE + canvas.height / 2;
    ctx.fillStyle = "#e0f0ff";
    ctx.beginPath();
    ctx.arc(sx + TILE / 2, sy + TILE / 2, TILE / 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#3949ab";
    ctx.font = "10px sans-serif";
    ctx.fillText(e.name.slice(0, 6), sx, sy + TILE + 6);
  }

  // player
  const psx = (player.x - camCX) * TILE + canvas.width / 2;
  const psy = (player.y - camCY) * TILE + canvas.height / 2;
  ctx.fillStyle = "#ffb74d";
  ctx.fillRect(psx + 4, psy + 4, TILE - 8, TILE - 8);
  ctx.fillStyle = "#5d4037";
  ctx.fillRect(psx + 9, psy - 2, 6, 6);

  // selected tile highlight
  const mx = camCX + Math.floor((mouse.x - canvas.width / 2) / TILE);
  const my = camCY + Math.floor((mouse.y - canvas.height / 2) / TILE);
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 2;
  ctx.strokeRect((mx - camCX) * TILE + canvas.width / 2, (my - camCY) * TILE + canvas.height / 2, TILE, TILE);
}

function colorForFallback(block: string): string {
  switch (block) {
    case "grass": return "#7cb342";
    case "dirt": return "#795548";
    case "sand": return "#f2e2a4";
    case "stone": return "#9e9e9e";
    case "cobblestone": case "cobblestone_block": return "#8d8d8d";
    case "iron_ore": return "#d7ccc8";
    case "coal_ore": return "#616161";
    case "wood_log": return "#6d4c41";
    case "wood_planks": return "#a1887f";
    case "leaves": return "#66bb6a";
    case "water": return "#42a5f5";
    case "glass": return "rgba(200,220,255,0.4)";
    case "torch": return "#ffca28";
    case "wheat_crop_0": return "#c5e1a5";
    case "wheat_crop_1": return "#aed581";
    case "wheat_crop_2": return "#8d6e63";
    default: return "#555";
  }
}

// --- Input ---
const keys = new Set<string>();
const mouse = { x: 0, y: 0 };
addEventListener("keydown", (ev) => {
  keys.add(ev.key.toLowerCase());
  if (ev.key >= "1" && ev.key <= "9") {
    const i = Number(ev.key) - 1;
    if (i < inv.size) selectedSlot = i;
  }
});
addEventListener("keyup", (ev) => keys.delete(ev.key.toLowerCase()));
canvas.addEventListener("mousemove", (ev) => {
  const r = canvas.getBoundingClientRect();
  mouse.x = (ev.clientX - r.left) * (canvas.width / r.width);
  mouse.y = (ev.clientY - r.top) * (canvas.height / r.height);
});
canvas.addEventListener("click", () => {
  const tx = camera.x + Math.floor((mouse.x - canvas.width / 2) / TILE);
  const ty = camera.y + Math.floor((mouse.y - canvas.height / 2) / TILE);
  const tool = inv.get(selectedSlot);
  const isPlaceable = !!tool && !!BLOCKS[tool.item]?.solid;
  const current = world.blockAt(tx, ty);
  if (isPlaceable && tool && current === "air") {
    world.setBlock(tx, ty, tool.item);
    inv.remove(tool.item, 1);
    updateHUD();
  } else if (current !== "air" && current !== "water") {
    const blockDef = BLOCKS[current];
    const toolType = tool?.item?.includes("pickaxe") ? "pickaxe" : tool?.item?.includes("axe") ? "axe" : undefined;
    const level = toolType && tool ? (tool.item.includes("iron") ? 3 : tool.item.includes("stone") ? 2 : 1) : 0;
    if (!blockDef?.tool || (toolType && blockDef.tool.type === toolType)) {
      const drops = rollDrops(current, toolType, level);
      for (const d of drops) inv.add(d.item, d.count);
      world.setBlock(tx, ty, "air");
      updateHUD();
      setMsg(`ขุดได้: ${drops.map((d) => ITEMS[d.item]?.name ?? d.item).join(", ") || "ไม่มีอะไร"}`);
      bumpQuests("gather", drops);
    } else {
      setMsg("ต้องใช้เครื่องมือที่ใช่ในการขุด");
    }
  }
});

function rollDrops(block: string, toolType?: string, level = 0): { item: string; count: number }[] {
  const def = BLOCKS[block];
  if (!def?.drops) return [];
  const out: { item: string; count: number }[] = [];
  for (const d of def.drops) {
    const count = rng.int(d.min, d.max);
    if (count > 0) out.push({ item: d.item, count });
  }
  return out;
}

function bumpQuests(kind: string, drops: { item: string; count: number }[]): void {
  for (const d of drops) {
    const q = playerQuests.find((p) => {
      const def = QUEST_DEFS[p.questId];
      return def?.objective.type === "gather" && def.objective.target === d.item;
    });
    if (q && !q.complete) {
      q.progress = Math.min(q.progress + d.count, 99);
      if (q.progress >= 99) q.complete = true;
    }
  }
}

// --- Quest state (lightweight inline) ---
const QUEST_DEFS: Record<string, { id: string; name: string; objective: { type: string; target: string; count: number } }> = {
  gather_wood: { id: "gather_wood", name: "เก็บไม้ 5", objective: { type: "gather", target: "wood", count: 5 } },
  kill_slime: { id: "kill_slime", name: "ล่าสไลม์ 3", objective: { type: "kill", target: "slime", count: 3 } },
};
let playerQuests = [
  { questId: "gather_wood", progress: 0, complete: false },
  { questId: "kill_slime", progress: 0, complete: false },
];

// --- Update loop ---
function update(dt: number): void {
  const speed = 6;
  let dx = 0, dy = 0;
  if (keys.has("w")) dy -= 1;
  if (keys.has("s")) dy += 1;
  if (keys.has("a")) dx -= 1;
  if (keys.has("d")) dx += 1;
  if (dx || dy) {
    const len = Math.hypot(dx, dy);
    player.x += (dx / len) * speed * dt;
    player.y += (dy / len) * speed * dt;
    ensureChunks(world);
  }

  // survival
  const surv = applySurvivalTick(stats, dt);
  if (surv.drained) setMsg("⚠️ ความหิว/กระหายหมด — HP ลด!");

  // day/night + weather
  tickDayNight(dn, dt);
  const biomeStats = { humidity: 0.5, temperature: 0.6 };
  tickWeather(weather, dt, biomeStats, () => rng.next());

  // creature AI + combat
  for (const c of creatures) {
    const r = c.step({ x: player.x, y: player.y }, dt, (x, y) => world.blockAt(x, y) !== "stone" && world.blockAt(x, y) !== "wall", () => rng.next());
    if (r.wantsAttack && Math.hypot(c.pos.x - player.x, c.pos.y - player.y) < c.attackRange + 0.5) {
      stats.hp = Math.max(0, stats.hp - c.damage);
      if (stats.hp <= 0) setMsg("💀 คุณตาย! ลองใหม่");
    }
  }
  creatures = creatures.filter((c) => c.isAlive());

  gameTime += dt;
}

// --- HUD ---
function el(id: string): HTMLElement { return document.getElementById(id)!; }
function updateHUD(): void {
  el("hud-pos").textContent = `${Math.floor(player.x)},${Math.floor(player.y)} · ${phaseLabel(dn.phase)} ${Math.round(dn.light * 100)}%`;
  el("hud-pos").textContent += ` · ${weatherLabel(weather.kind)}`;
  el("hud-level").textContent = `Lv ${stats.level}`;
  el("hud-xp").textContent = `${Math.round(stats.xp)} XP`;
  el("bar-hp").style.width = `${(stats.hp / stats.maxHp) * 100}%`;
  el("bar-hunger").style.width = `${(stats.hunger / stats.maxHunger) * 100}%`;
  el("bar-thirst").style.width = `${(stats.thirst / stats.maxThirst) * 100}%`;
  renderHotbar();
  renderPanel();
  renderQuests();
}

function renderHotbar(): void {
  hotbarEl.innerHTML = "";
  for (let i = 0; i < Math.min(inv.size, 9); i++) {
    const s = document.createElement("div");
    s.className = "slot" + (i === selectedSlot ? " active" : "");
    const item = inv.get(i);
    s.innerHTML = item ? `${item.item.split("_").join(" ")}<br/>x${item.count}` : "&nbsp;";
    hotbarEl.appendChild(s);
  }
}

function renderPanel(): void {
  panelEl.innerHTML = "<h3>🧰 คราฟต์ (C)</h3>";
  const recipes = listRecipes("crafting_table");
  for (const r of recipes) {
    const need = canCraft(inv, r.id, "crafting_table");
    const b = document.createElement("button");
    b.textContent = `${r.name} (${r.result.item})`;
    b.disabled = !need.ok;
    b.addEventListener("click", () => {
      const res = craft(inv, r.id, "crafting_table");
      if (res.ok) {
        setMsg(`ประดิษฐ์ ${r.result!.item} สำเร็จ`);
        bumpQuests("craft", [{ item: r.result!.item, count: r.result!.count }]);
        updateHUD();
      } else {
        setMsg(res.reason ?? "คราฟต์ไม่ได้");
      }
    });
    panelEl.appendChild(b);
  }
}

function renderQuests(): void {
  let s = "<h3>📜 ภารกิจ</h3>";
  for (const q of playerQuests) {
    const def = QUEST_DEFS[q.questId];
    s += `<div style="font-size:12px;margin:2px 0">${def?.name} — ${q.complete ? "✅ เสร็จ" : `${q.progress}/${def?.objective.count}`}</div>`;
  }
  panelEl.innerHTML += `<div style="margin-top:10px">${s}</div>`;
}

function setMsg(text: string): void {
  msg = text;
  msgT = 2;
}

// --- Game start ---
btnStart.addEventListener("click", () => {
  const seed = Number(worldSelect.value);
  world = makeWorld(seed);
  ensureChunks(world);
  spawnEnemies(world);
  inv = new Inventory(27);
  inv.add("wood_pickaxe", 1);
  inv.add("wood_axe", 1);
  inv.add("wood_sword", 1);
  inv.add("wood", 10);
  inv.add("apple", 5);
  inv.add("torch", 8);
  inv.add("stone", 4);
  stats = createStats();
  player = { x: 8 * 16 + 8, y: 8 * 16 + 8, px: 0, py: 0 };
  camera = { x: player.x, y: player.y };
  selectedSlot = 0;
  running = true;
  startEl.style.display = "none";
  updateHUD();
});

// --- Main loop ---
function loop(now: number): void {
  if (running) {
    const dt = Math.min((now - lastTick) / 1000, 0.05);
    lastTick = now;
    camera.x += (player.x - camera.x) * Math.min(1, dt * 6);
    camera.y += (player.y - camera.y) * Math.min(1, dt * 6);
    update(dt);
    // throttle HUD refresh
    if (msgT > 0) { msgT -= dt; msgEl.textContent = msg; if (msgT <= 0) msgEl.textContent = ""; }
    draw();
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame((t) => { lastTick = t; loop(t); });
