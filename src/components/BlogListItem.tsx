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

import type { PostMetadata } from "@/types/metadata";
import { formatDate } from "@/utils/formatting";

import ArrowRightIcon from "@/assets/icons/arrow-right.svg?react";

interface BlogListItemProps {
  postMetadata: PostMetadata;
}

export default function BlogListItem({ postMetadata }: BlogListItemProps) {
  return (
    <article className="blog-post rounded-none bg-bg-subtle border border-border p-2 flex gap-4 group">
      {postMetadata.imageSrc && (
        <a
          href={`/blog/${postMetadata.id}`}
          className="shrink-0 w-48 aspect-[3/2] border border-border overflow-hidden"
        >
          <img
            src={postMetadata.imageSrc}
            alt={postMetadata.imageAlt || "Image"}
            width={400}
            height={267}
            className="object-cover w-full h-full group-hover:scale-[1.025] transition-transform duration-500"
          />
        </a>
      )}

      <div className="flex flex-col gap-2 flex-1">
        <header className="flex flex-col gap-1">
          <a href={`/blog/${postMetadata.id}`} className="text-lg font-bold hover:underline">
            {postMetadata.title}
          </a>

          <div className="flex items-center gap-3 text-xs text-text-subtle">
            <time>{formatDate(postMetadata.date)}</time>

            {postMetadata.categories && (
              <div className="flex gap-2">
                {postMetadata.categories.map((category) => (
                  <span key={category} className="border border-border px-1.5 py-0.5">
                    <a
                      href={`/blog?category=${encodeURIComponent(category).replace(/%20/g, "+")}`}
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

        <p className="text-sm text-text-subtle">{postMetadata.description}</p>

        <a
          href={`/blog/${postMetadata.id}`}
          className="inline-flex items-center gap-1 text-sm text-accent-subtle underline"
        >
          Read more
          <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

