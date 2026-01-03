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

import type { PostMetadata, TechnologyMetadata } from "@/types/metadata";
import { formatDate } from "@/utils/formatting";
import { sortByFrequency } from "@/utils/sorting";
import { reactTechnologyIcons } from "@/utils/icons";

import SearchIcon from "@/assets/icons/search.svg?react";

interface BlogListFilterProps {
  filters: {
    search: string;
    categories: string[];
    technologies: string[];
    tags: string[];
  };
  onChange: (filters: BlogListFilterProps["filters"]) => void;
  postMetadata: PostMetadata[];
  technologyMetadata: TechnologyMetadata[];
}

export default function BlogListFilter({ filters, onChange, postMetadata, technologyMetadata }: BlogListFilterProps) {
  const categoriesUsed = Array.from(new Set(sortByFrequency(postMetadata.flatMap(post => post.categories ?? []))));
  const technologiesUsed = Array.from(new Set(sortByFrequency(postMetadata.flatMap(post => post.technologies ?? []))));
  const tagsUsed = Array.from(new Set(sortByFrequency(postMetadata.flatMap(post => post.tags ?? []))));

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    const current = filters[type];
    const newValues = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    onChange({ ...filters, [type]: newValues });
  };

  return (
    <aside className="flex flex-col gap-8">
      <div>
        <label className="text-sm font-bold mb-1 block">Search</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={filters.search}
            onChange={e => onChange({ ...filters, search: e.target.value })}
            placeholder="Search posts..."
            className="w-full border border-border bg-bg pl-8 pr-2 py-1 text-sm outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-bold mb-2">Categories</label>
        <div className="flex flex-wrap gap-2 text-xs">
          {categoriesUsed.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => toggleFilter("categories", category)}
              className={`border border-border px-1.5 py-0.5 filter-button ${filters.categories.includes(category) ? "is-active" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-bold mb-2">Technologies</label>
        <div className="flex flex-wrap gap-2 text-xs">
          {technologiesUsed.map((technology) => {
            const technologyEntry = technologyMetadata.find(entry => entry.id === technology);
            const TechnologyIcon = technologyEntry && reactTechnologyIcons[technologyEntry.icon];

            return (
              <button
                key={technology}
                type="button"
                onClick={() => toggleFilter("technologies", technology)}
                className={`border border-border px-1.5 py-0.5 filter-button ${filters.technologies.includes(technology) ? "is-active" : ""}`}
              >
                {technologyEntry && (
                  <span className="inline-flex items-center gap-1">
                    {TechnologyIcon && (
                      <TechnologyIcon className="size-3" />
                    )}
                    <span>{technologyEntry.name}</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-sm font-bold mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 text-xs">
          {tagsUsed.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleFilter("tags", tag)}
              className={`border border-border px-1.5 py-0.5 filter-button ${filters.tags.includes(tag) ? "is-active" : ""}`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-bold mb-2">Recent Posts</label>
        <ul className="flex flex-col gap-2">
          {postMetadata.slice(0, 5).map(post => (
            <li key={post.id}>
              <a href={`/blog/${post.id}`} className="text-sm hover:underline">
                {post.title}
              </a>
              <div className="text-xs text-text-subtle">
                {formatDate(post.date)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
