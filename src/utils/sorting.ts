/*
 * This file is part of grnbk.io.
 * 
 * Copyright (C) 2025 Peter Grønbæk Andersen <peter@grnbk.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

export function sortByFrequency<T extends string | number>(items: T[]): T[] {
  const counts: Record<string, number> = {};

  for (const item of items) {
    counts[item as unknown as string] = (counts[item as unknown as string] ?? 0) + 1;
  }

  return Array.from(new Set(items)).sort((a, b) => (counts[b as unknown as string] ?? 0) - (counts[a as unknown as string] ?? 0));
}