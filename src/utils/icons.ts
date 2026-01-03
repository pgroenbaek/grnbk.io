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

import type { FC, SVGProps } from "react";

const reactTechIcons = import.meta.glob(
  "/src/assets/technologies/*.svg",
  { eager: true, query: '?react', import: 'default' }
);

export const reactTechnologyIcons: Record<string, FC<SVGProps<SVGSVGElement>>> = Object.fromEntries(
  Object.entries(reactTechIcons).map(([path, mod]) => [
    path.split("/").pop()!,
    mod as FC<SVGProps<SVGSVGElement>>,
  ])
);

const astroTechIcons = import.meta.glob(
  '/src/assets/technologies/*.svg',
  { eager: true, query: '?raw', import: 'default' }
);

export const astroTechnologyIcons: Record<string, string> = Object.fromEntries(
  Object.entries(astroTechIcons).map(([path, mod]) => [
    path.split("/").pop()!,
    mod as string,
  ])
);