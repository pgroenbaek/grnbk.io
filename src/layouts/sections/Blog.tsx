import type { CollectionEntry } from "astro:content";
import { useState, useMemo, useEffect } from "react";

import BlogListItem from "@/components/BlogListItem";
import BlogListFilter from "@/components/BlogListFilter";
import Pagination from "@/components/Pagination";

interface BlogProps {
  posts: CollectionEntry<"posts">[];
  technologies: CollectionEntry<"technologies">[];
}

const POSTS_PER_PAGE = 3;

export default function Blog({ posts, technologies }: BlogProps) {

  const [filters, setFilters] = useState(() => {
    if (typeof window === "undefined") {
      return { searchParam: "", categoryParams: [], tagParams: [], technologyParams: [] };
    }

    const params = new URLSearchParams(window.location.search);
    const searchParam = (params.get("search") || "").toLowerCase();
    const categoryParams = params.getAll("category").map(c => c.toLowerCase());
    const tagParams = params.getAll("tag").map(t => t.toLowerCase());
    const technologyParams = params.getAll("technology").map(t => t.toLowerCase());

    return {
        searchParam,
        categoryParams,
        technologyParams,
        tagParams,
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

      const matchesSearch = (search?: string) => {
        if (!search) {
          return true;
        }

        const q = search.toLowerCase();
        return title.includes(q) || description.includes(q);
      };

      const matchesAny = (filters: string[], values: string[]) => {
        if (!filters.length) {
          return true;
        }

        return filters.some(filter =>
          values.includes(filter.toLowerCase())
        );
      };

      if (!matchesSearch(filters.searchParam)) {
        return false;
      }

      if (!matchesAny(filters.categoryParams, postCategories)) {
        return false;
      }

      if (!matchesAny(filters.technologyParams, postTechnologies)) {
        return false;
      }

      if (!matchesAny(filters.tagParams, postTags)) {
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

    if (filters.searchParam) {
      params.set("search", filters.searchParam);
    }

    filters.categoryParams.forEach(category => params.append("category", category));
    filters.technologyParams.forEach(technology => params.append("technology", technology));
    filters.tagParams.forEach(tag => params.append("tag", tag));

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
        {paginatedPosts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {paginatedPosts.map(post => (
              <BlogListItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <BlogListFilter posts={posts} technologies={technologies} filters={filters} onChange={setFilters} />
    </div>
  );
}
