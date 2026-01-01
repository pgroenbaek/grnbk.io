import type { CollectionEntry } from "astro:content";

import { formatDate } from "@/utils/formatting";
import { sortByFrequency } from "@/utils/sorting";
import { reactTechnologyIcons } from "@/utils/icons";

import SearchIcon from "@/assets/icons/search.svg?react";

interface BlogListFilterProps {
  filters: {
    searchParam: string;
    categoryParams: string[];
    technologyParams: string[];
    tagParams: string[];
  };
  onChange: (filters: BlogListFilterProps["filters"]) => void;
  posts: CollectionEntry<"posts">[];
  technologies: CollectionEntry<"technologies">[];
}

export default function BlogListFilter({ filters, onChange, posts, technologies }: BlogListFilterProps) {
  const categoriesUsed = Array.from(new Set(sortByFrequency(posts.flatMap(post => post.data.categories ?? []))));
  const technologiesUsed = Array.from(new Set(sortByFrequency(posts.flatMap(post => post.data.technologies ?? []))));
  const tagsUsed = Array.from(new Set(sortByFrequency(posts.flatMap(post => post.data.tags ?? []))));

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
            value={filters.searchParam}
            onChange={e => onChange({ ...filters, searchParam: e.target.value })}
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
              onClick={() => toggleFilter("categoryParams", category)}
              className={`border border-border px-1.5 py-0.5 filter-btn ${filters.categoryParams.includes(category) ? "is-active" : ""}`}
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
            const technologyEntry = technologies.find(entry => entry.id === technology);
            const TechnologyIcon = technologyEntry && reactTechnologyIcons[technologyEntry.data.icon];

            return (
              <button
                key={technology}
                type="button"
                onClick={() => toggleFilter("technologyParams", technology)}
                className={`border border-border px-1.5 py-0.5 filter-btn ${filters.technologyParams.includes(technology) ? "is-active" : ""}`}
              >
                {technologyEntry && (
                  <span className="inline-flex items-center gap-1">
                    {TechnologyIcon && (
                      <TechnologyIcon className="size-3" />
                    )}
                    <span>{technologyEntry.data.name}</span>
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
              onClick={() => toggleFilter("tagParams", tag)}
              className={`border border-border px-1.5 py-0.5 filter-btn ${filters.tagParams.includes(tag) ? "is-active" : ""}`}
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
