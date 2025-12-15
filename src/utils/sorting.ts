export function sortByFrequency<T extends string | number>(items: T[]): T[] {
  const counts: Record<string, number> = {};

  for (const item of items) {
    counts[item as unknown as string] = (counts[item as unknown as string] ?? 0) + 1;
  }

  return Array.from(new Set(items)).sort((a, b) => (counts[b as unknown as string] ?? 0) - (counts[a as unknown as string] ?? 0));
}