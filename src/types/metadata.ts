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

export type PostMetadata = {
  id: string;
  title: string;
  description?: string;
  date: Date;
  updated?: Date;
  categories?: string[];
  technologies?: string[];
  tags?: string[];
  imageSrc: string;
  imageAlt: string;
};

export type TechnologyMetadata = {
  id: string;
  name: string;
  href: string;
  icon: string;
};
