export interface Price {
  buy: number;
  sell: number;
}

const PRICES: Record<string, Price> = {
  wood: { buy: 2, sell: 1 },
  stone: { buy: 2, sell: 1 },
  iron_ingot: { buy: 30, sell: 20 },
  bread: { buy: 10, sell: 5 },
  torch: { buy: 4, sell: 2 },
  apple: { buy: 5, sell: 3 },
};

export function priceOf(item: string): Price | undefined {
  return PRICES[item];
}

export function sellValue(item: string, count: number): number {
  const p = PRICES[item];
  if (!p) return 0;
  return p.sell * count;
}

export function buyCost(item: string, count: number): number {
  const p = PRICES[item];
  if (!p) return Infinity;
  return p.buy * count;
}
