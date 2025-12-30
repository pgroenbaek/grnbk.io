import type { CollectionEntry } from "astro:content";

interface FilterSidebarProps {
  filters: {
    search: string;
    categories: string[];
    tags: string[];
    technologies: string[];
  };
  onChange: (filters: FilterSidebarProps["filters"]) => void;
  posts: CollectionEntry<"posts">[];
}

export default function FilterSidebar({ filters, onChange, posts }: FilterSidebarProps) {
  const categories = Array.from(new Set(posts.flatMap(p => p.data.categories ?? [])));
  const tags = Array.from(new Set(posts.flatMap(p => p.data.tags ?? [])));
  const technologies = Array.from(new Set(posts.flatMap(p => p.data.technologies ?? [])));

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    const current = filters[type];
    const newValues = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    onChange({ ...filters, [type]: newValues });
  };

  return (
    <aside className="flex flex-col gap-4 border p-4 rounded bg-gray-50">
      <div>
        <label className="block font-medium mb-1">Search:</label>
        <input
          type="text"
          value={filters.search}
          onChange={e => onChange({ ...filters, search: e.target.value })}
          className="border p-2 rounded w-full"
          placeholder="Search posts..."
        />
      </div>

      <div>
        <h3 className="font-semibold mb-1">Categories</h3>
        {categories.map(c => (
          <label key={c} className="flex items-center gap-2">
            <input type="checkbox" checked={filters.categories.includes(c)} onChange={() => toggleFilter("categories", c)} />
            {c}
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-1">Tags</h3>
        {tags.map(t => (
          <label key={t} className="flex items-center gap-2">
            <input type="checkbox" checked={filters.tags.includes(t)} onChange={() => toggleFilter("tags", t)} />
            {t}
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-1">Technologies</h3>
        {technologies.map(t => (
          <label key={t} className="flex items-center gap-2">
            <input type="checkbox" checked={filters.technologies.includes(t)} onChange={() => toggleFilter("technologies", t)} />
            {t}
          </label>
        ))}
      </div>
    </aside>
  );
}
