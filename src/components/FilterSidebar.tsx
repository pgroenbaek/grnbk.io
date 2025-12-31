import type { CollectionEntry } from "astro:content";
import { sortByFrequency } from "@/utils/sorting";
import { formatDate } from "@/utils/formatting";

import SearchIcon from "@/assets/icons/search.svg?react";

export interface TechnologyEntry {
  id: string;
  name: string;
  href?: string;
  content: React.ComponentType;
}

interface FilterSidebarProps {
  filters: {
    search: string;
    categories: string[];
    technologies: string[];
    tags: string[];
  };
  onChange: (filters: FilterSidebarProps["filters"]) => void;
  posts: CollectionEntry<"posts">[];
  technologyEntries: TechnologyEntry[];
}

export default function FilterSidebar({ filters, onChange, posts, technologyEntries }: FilterSidebarProps) {
  const categories = Array.from(new Set(sortByFrequency(posts.flatMap(post => post.data.categories ?? []))));
  const technologies = Array.from(new Set(sortByFrequency(posts.flatMap(post => post.data.technologies ?? []))));
  const tags = Array.from(new Set(sortByFrequency(posts.flatMap(post => post.data.tags ?? []))));

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
          {categories.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => toggleFilter("categories", category)}
              className={`border border-border px-1.5 py-0.5 filter-btn ${filters.categories.includes(category) ? "is-active" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-bold mb-2">Technologies</label>
        <div className="flex flex-wrap gap-2 text-xs">
          {technologies.map((techId) => {
            const techEntry = technologyEntries.find(entry => entry.id === techId);
            const TechnologyIcon = techEntry?.content;

            return (
              <button
                key={techId}
                type="button"
                onClick={() => toggleFilter("technologies", techId)}
                className={`border border-border px-1.5 py-0.5 filter-btn ${filters.technologies.includes(techId) ? "is-active" : ""}`}
              >
                {techEntry && (
                  <span className="inline-flex items-center gap-1">
                    {TechnologyIcon ? <TechnologyIcon /> : null}
                    <span>{techEntry.name}</span>
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
          {tags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleFilter("tags", tag)}
              className={`border border-border px-1.5 py-0.5 filter-btn ${filters.tags.includes(tag) ? "is-active" : ""}`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-bold mb-2">Recent Posts</label>
        <ul className="flex flex-col gap-2">
          {posts.slice(0, 5).map(post => (
            <li key={post.id}>
              <a href={`/blog/${post.id}`} className="text-sm hover:underline">
                {post.data.title}
              </a>
              <div className="text-xs text-text-subtle">
                {formatDate(post.data.date)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
