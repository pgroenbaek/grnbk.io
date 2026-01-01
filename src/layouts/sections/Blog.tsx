import { useState, useMemo, useEffect } from "react";

import type { PostMetadata, TechnologyMetadata } from "@/types/metadata";
import BlogListItem from "@/components/BlogListItem";
import BlogListFilter from "@/components/BlogListFilter";
import Pagination from "@/components/Pagination";

interface BlogProps {
  postMetadata: PostMetadata[]
  technologyMetadata: TechnologyMetadata[];
}

const POSTS_PER_PAGE = 10;

export default function Blog({ postMetadata, technologyMetadata }: BlogProps) {

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
        technologies,
        tags,
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
    return postMetadata.filter(post => {
      const title = post.title.toLowerCase();
      const description = post.description?.toLowerCase() ?? "";

      const postCategories = post.categories?.map(category => category.toLowerCase()) ?? [];
      const postTechnologies = post.technologies?.map(technology => technology.toLowerCase()) ?? [];
      const postTags = post.tags?.map(tag => tag.toLowerCase()) ?? [];

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

      if (!matchesSearch(filters.search)) {
        return false;
      }

      if (!matchesAny(filters.categories, postCategories)) {
        return false;
      }

      if (!matchesAny(filters.technologies, postTechnologies)) {
        return false;
      }

      if (!matchesAny(filters.tags, postTags)) {
        return false;
      }

      return true;
    });
  }, [postMetadata, filters]);

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

    filters.categories.forEach(category => params.append("category", category));
    filters.technologies.forEach(technology => params.append("technology", technology));
    filters.tags.forEach(tag => params.append("tag", tag));

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
              <BlogListItem key={post.id} postMetadata={post} />
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

      <BlogListFilter
        postMetadata={postMetadata}
        technologyMetadata={technologyMetadata}
        filters={filters}
        onChange={setFilters}
      />
    </div>
  );
}
