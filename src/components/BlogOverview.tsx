import { useState, useMemo, useEffect } from "react";
import type { CollectionEntry } from "astro:content";
import BlogList from "@/components/BlogList";
import FilterSidebar from "@/components/FilterSidebar";
import type { TechnologyEntry } from "@/components/FilterSidebar";

interface BlogOverviewProps {
  posts: CollectionEntry<"posts">[];
  technologyEntries: TechnologyEntry[];
}

const POSTS_PER_PAGE = 3;

export default function BlogOverview({ posts, technologyEntries }: BlogOverviewProps) {

  const [filters, setFilters] = useState(() => {
    if (typeof window === "undefined") {
      return { search: "", categories: [], tags: [], technologies: [] };
    }

    const params = new URLSearchParams(window.location.search);
    const search = (params.get("search") || "").toLowerCase();
    const categories = params.getAll("category").map(c => c.toLowerCase());
    const tags = params.getAll("tag").map(t => t.toLowerCase());
    const technologies = params.getAll("technology").map(t => t.toLowerCase());

    return {
        search,
        categories,
        tags,
        technologies,
    };
  });

  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window === "undefined") {
      return 1;
    }

    const params = new URLSearchParams(window.location.search);

    return Math.max(parseInt(params.get("page") ?? "1", 10), 1);
  });

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const title = post.data.title.toLowerCase();
      const description = post.data.description?.toLowerCase() ?? "";

      const postCategories = post.data.categories?.map(c => c.toLowerCase()) ?? [];
      const postTags = post.data.tags?.map(t => t.toLowerCase()) ?? [];
      const postTechnologies = post.data.technologies?.map(t => t.toLowerCase()) ?? [];

      if (filters.search && !title.includes(filters.search) && !description.includes(filters.search)) {
        return false;
      }

      if (filters.categories.length && !filters.categories.some(c => postCategories.includes(c))) {
        return false;
      }

      if (filters.tags.length && !filters.tags.some(t => postTags.includes(t))) {
        return false;
      }

      if (filters.technologies.length && !filters.technologies.some(t => postTechnologies.includes(t))) {
        return false;
      }

      return true;
    });
  }, [posts, filters]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  useEffect(() => setCurrentPage(1), [filters]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) {
      params.set("search", filters.search);
    }

    filters.categories.forEach(c => params.append("category", c));
    filters.tags.forEach(t => params.append("tag", t));
    filters.technologies.forEach(t => params.append("technology", t));

    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    const paramsString = params.toString();
    const newUrl = paramsString
      ? `${window.location.pathname}?${paramsString}`
      : window.location.pathname;

    window.history.replaceState(null, "", newUrl);
  }, [filters, currentPage]);

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-8">
      <div>
        <BlogList posts={paginatedPosts} />

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Prev
            </button>
            <span className="text-sm">Page {currentPage} of {totalPages}</span>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <FilterSidebar posts={posts} filters={filters} onChange={setFilters} technologyEntries={technologyEntries} />
    </div>
  );
}
