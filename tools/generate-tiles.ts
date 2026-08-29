// Generates a 16x16 pixel-art tile atlas (PNG) for the game.
// Placeholder art so the renderer is sprite-driven; easy to replace with CC0 tiles later.
import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";

// ---- minimal PNG encoder (RGBA) ----
function crc32(buf: Buffer): number {
  let c, table: number[] = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (const b of buf) crc = table[(crc ^ b) & 0xff]! ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const t = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}
function encodePng(w: number, h: number, rgba: Buffer): Buffer {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; // bit depth 8, color type 6 (RGBA)
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0; // filter none
    rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  const idat = deflateSync(raw);
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

// ---- tile definitions ----
interface Tile { id: string; draw: (px: Uint8ClampedArray, ox: number, oy: number) => void; }
function pix(px: Uint8ClampedArray, ox: number, oy: number, x: number, y: number, c: [number, number, number, number]): void {
  const i = ((oy + y) * 16 + (ox + x)) * 4;
  px[i] = c[0]; px[i + 1] = c[1]; px[i + 2] = c[2]; px[i + 3] = c[3];
}
function rect(px: Uint8ClampedArray, ox: number, oy: number, x0: number, y0: number, x1: number, y1: number, c: [number, number, number, number]): void {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) pix(px, ox, oy, x, y, c);
}
function noise(px: Uint8ClampedArray, ox: number, oy: number, n: number, base: [number, number, number, number], alt: [number, number, number, number]): void {
  let s = ox * 31 + oy * 17;
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const r = (s >> 16) & 1;
    if (r < n) pix(px, ox, oy, x, y, alt); else pix(px, ox, oy, x, y, base);
  }
}

const C = {
  grass: [106, 168, 79, 255] as [number, number, number, number],
  dirt: [121, 85, 72, 255] as [number, number, number, number],
  sand: [242, 226, 164, 255] as [number, number, number, number],
  stone: [155, 155, 155, 255] as [number, number, number, number],
  darkStone: [120, 120, 120, 255] as [number, number, number, number],
  water: [66, 165, 245, 255] as [number, number, number, number],
  waterDeep: [33, 122, 200, 255] as [number, number, number, number],
  wood: [109, 76, 65, 255] as [number, number, number, number],
  woodLight: [141, 110, 99, 255] as [number, number, number, number],
  leaf: [102, 187, 106, 255] as [number, number, number, number],
  leafDark: [67, 150, 84, 255] as [number, number, number, number],
  iron: [211, 211, 211, 255] as [number, number, number, number],
  coal: [54, 54, 54, 255] as [number, number, number, number],
  black: [30, 30, 30, 255] as [number, number, number, number],
  white: [255, 255, 255, 255] as [number, number, number, number],
  fence: [156, 110, 69, 255] as [number, number, number, number],
  fenceDark: [116, 80, 50, 255] as [number, number, number, number],
  door: [101, 67, 33, 255] as [number, number, number, number],
  glow: [255, 210, 80, 255] as [number, number, number, number],
};

const tiles: Tile[] = [
  { id: "grass", draw: (p, ox, oy) => { noise(p, ox, oy, 0.35, C.grass, [96, 154, 70, 255] as any); for (let y = 13; y < 16; y++) for (let x = 0; x < 16; x++) pix(p, ox, oy, x, y, C.dirt); } },
  { id: "dirt", draw: (p, ox, oy) => noise(p, ox, oy, 0.5, C.dirt, [104, 74, 62, 255] as any) },
  { id: "sand", draw: (p, ox, oy) => noise(p, ox, oy, 0.4, C.sand, [228, 208, 140, 255] as any) },
  { id: "stone", draw: (p, ox, oy) => { noise(p, ox, oy, 0.6, C.stone, C.darkStone); pix(p, ox, oy, 4, 5, C.white); } },
  { id: "cobblestone", draw: (p, ox, oy) => { noise(p, ox, oy, 0.7, [140, 140, 140, 255] as any, [110, 110, 110, 255] as any); } },
  { id: "water", draw: (p, ox, oy) => { noise(p, ox, oy, 0.3, C.water, C.waterDeep); } },
  { id: "wood_log", draw: (p, ox, oy) => { rect(p, ox, oy, 0, 0, 15, 3, C.woodLight); rect(p, ox, oy, 0, 3, 15, 5, C.wood); rect(p, ox, oy, 0, 5, 15, 8, C.woodLight); rect(p, ox, oy, 0, 8, 15, 11, C.wood); rect(p, ox, oy, 0, 11, 15, 13, C.woodLight); rect(p, ox, oy, 0, 13, 15, 15, C.wood); } },
  { id: "wood_planks", draw: (p, ox, oy) => { for (let r = 0; r < 4; r++) rect(p, ox, oy, 0, r * 4, 15, r * 4 + 1, r % 2 ? C.wood : C.woodLight); } },
  { id: "leaves", draw: (p, ox, oy) => { noise(p, ox, oy, 0.7, C.leaf, C.leafDark); } },
  { id: "iron_ore", draw: (p, ox, oy) => { noise(p, ox, oy, 0.6, C.stone, C.darkStone); pix(p, ox, oy, 4, 4, C.iron); pix(p, ox, oy, 9, 8, C.iron); pix(p, ox, oy, 12, 3, C.iron); } },
  { id: "coal_ore", draw: (p, ox, oy) => { noise(p, ox, oy, 0.6, C.stone, C.darkStone); pix(p, ox, oy, 5, 5, C.black); pix(p, ox, oy, 10, 10, C.black); } },
  { id: "fence", draw: (p, ox, oy) => { for (let x = 2; x < 14; x++) pix(p, ox, oy, x, 6, C.fence); for (let x = 2; x < 14; x++) pix(p, ox, oy, x, 9, C.fence); for (let y = 5; y <= 10; y++) { pix(p, ox, oy, 3, y, C.fenceDark); pix(p, ox, oy, 12, y, C.fenceDark); } } },
  { id: "wall", draw: (p, ox, oy) => { noise(p, ox, oy, 0.85, C.stone, C.darkStone); } },
  { id: "door", draw: (p, ox, oy) => { rect(p, ox, oy, 2, 1, 13, 14, C.door); rect(p, ox, oy, 3, 1, 12, 3, C.woodLight); for (let y = 6; y <= 14; y += 4) rect(p, ox, oy, 3, y, 12, y, C.black); } },
  { id: "torch", draw: (p, ox, oy) => { rect(p, ox, oy, 7, 6, 8, 13, C.woodLight); pix(p, ox, oy, 7, 5, C.glow); pix(p, ox, oy, 8, 4, C.glow); pix(p, ox, oy, 8, 5, [255, 240, 150, 255] as any); } },
  { id: "wheat_crop_0", draw: (p, ox, oy) => { noise(p, ox, oy, 0.5, [197, 225, 165, 255] as any, [174, 213, 129, 255] as any); for (let x = 2; x < 14; x += 3) pix(p, ox, oy, x, 8, [120, 180, 80, 255] as any); } },
  { id: "wheat_crop_1", draw: (p, ox, oy) => { noise(p, ox, oy, 0.4, [174, 205, 130, 255] as any, [150, 190, 90, 255] as any); for (let x = 2; x < 15; x += 3) for (let y = 5; y < 10; y++) rect(p, ox, oy, x, y, x, y, [180, 220, 110, 255] as any); } },
  { id: "wheat_crop_2", draw: (p, ox, oy) => { noise(p, ox, oy, 0.3, [174, 180, 90, 255] as any, [150, 160, 80, 255] as any); for (let x = 2; x < 15; x += 3) for (let y = 3; y < 11; y++) pix(p, ox, oy, x, y, [240, 220, 120, 255] as any); } },
  { id: "glass", draw: (p, ox, oy) => { noise(p, ox, oy, 0.4, [205, 228, 255, 255] as any, [180, 210, 245, 255] as any); rect(p, ox, oy, 0, 0, 15, 0, C.white); rect(p, ox, oy, 0, 15, 15, 15, C.white); rect(p, ox, oy, 0, 0, 0, 15, C.white); rect(p, ox, oy, 15, 0, 15, 15, C.white); } },
];

// ---- build atlas: 8 cols, 16x16 each ----
const TW = 16, TH = 16, COLS = 8;
const rows = Math.ceil(tiles.length / COLS);
const W = COLS * TW, H = rows * TH;
const rgba = new Uint8ClampedArray(W * H * 4).fill(0);
tiles.forEach((t, i) => {
  const ox = (i % COLS) * TW;
  const oy = Math.floor(i / COLS) * TH;
  t.draw(rgba, ox, oy);
});
const png = encodePng(W, H, Buffer.from(rgba));
writeFileSync("assets/tiles/atlas.png", png);

// write index mapping tile id -> atlas x,y
import { writeFileSync as wfs } from "node:fs";

writeFileSync("assets/tiles/index.json", JSON.stringify({ tileSize: TW, cols: COLS, rows, tiles: Object.fromEntries(tiles.map((t, i) => [t.id, i])) }, null, 2));
console.log(`Wrote assets/tiles/atlas.png (${W}x${H}), ${tiles.length} tiles`);

