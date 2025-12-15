import { useEffect } from "react";

export default function BlogList() {
  const applyFilters = () => {
    const params = new URLSearchParams(window.location.search);

    const search = params.get("search")?.toLowerCase() ?? "";
    const categories = params.getAll("category");
    const tags = params.getAll("tag");
    const technologies = params.getAll("technology");

    document.querySelectorAll<HTMLElement>("[data-post]").forEach((el) => {
      const title = el.dataset.title ?? "";
      const description = el.dataset.description ?? "";
      const postCategories = el.dataset.categories?.split(",") ?? [];
      const postTags = el.dataset.tags?.split(",") ?? [];
      const postTechnologies = el.dataset.technologies?.split(",") ?? [];

      let visible = true;

      // Search
      if (
        search &&
        !title.includes(search) &&
        !description.includes(search)
      ) visible = false;

      // OR logic
      if (
        categories.length &&
        !categories.some(c => postCategories.includes(c))
      ) visible = false;

      // OR logic
      if (
        tags.length &&
        !tags.some(t => postTags.includes(t))
      ) visible = false;

      // OR logic
      if (
        technologies.length &&
        !technologies.some(t => postTechnologies.includes(t))
      ) visible = false;

      const hasFilters =
        search || categories.length || tags.length || technologies.length;

      el.classList.toggle("is-visible", !hasFilters || visible);
    });
  };

  useEffect(() => {
    applyFilters();
    window.addEventListener("popstate", applyFilters);
    return () => window.removeEventListener("popstate", applyFilters);
  }, []);

  return null;
}
