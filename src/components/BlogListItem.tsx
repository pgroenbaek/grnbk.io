import type { CollectionEntry } from "astro:content";
import { formatDate } from "@/utils/formatting";

import ArrowRightIcon from "@/assets/icons/arrow-right.svg?react";

interface BlogListItemProps {
  post: CollectionEntry<"posts">;
}

export default function BlogListItem({ post }: BlogListItemProps) {
  const { data } = post;

  return (
    <article className="blog-post rounded-none bg-bg-subtle border border-border p-2 flex gap-4 group">
      {data.image && (
        <a
          href={`/blog/${post.id}`}
          className="shrink-0 w-48 aspect-[3/2] border border-border overflow-hidden"
        >
          <img
            src={data.image.src}
            alt={data.image.alt || "Image"}
            width={400}
            height={267}
            className="object-cover w-full h-full group-hover:scale-[1.025] transition-transform duration-500"
          />
        </a>
      )}

      <div className="flex flex-col gap-2 flex-1">
        <header className="flex flex-col gap-1">
          <a href={`/blog/${post.id}`} className="text-lg font-bold hover:underline">
            {data.title}
          </a>

          <div className="flex items-center gap-3 text-xs text-text-subtle">
            <time>{formatDate(data.date)}</time>

            {data.categories && (
              <div className="flex gap-2">
                {data.categories.map((category) => (
                  <span key={category} className="border border-border px-1.5 py-0.5">
                    <a
                      href={`/blog?category=${encodeURIComponent(category)}`}
                      className="hover:underline"
                    >
                      {category}
                    </a>
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <p className="text-sm text-text-subtle">{data.description}</p>

        <a
          href={`/blog/${post.id}`}
          className="inline-flex items-center gap-1 text-sm text-accent-subtle underline"
        >
          Read more
          <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

