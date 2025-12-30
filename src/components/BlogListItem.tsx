import type { CollectionEntry } from "astro:content";

interface BlogListItemProps {
  post: CollectionEntry<"posts">;
}

export default function BlogListItem({ post }: BlogListItemProps) {
  return (
    <article className="border rounded p-4">
      <h2 className="text-xl font-bold">{post.data.title}</h2>
      <p className="text-gray-600">{post.data.description}</p>
      <p className="text-sm text-gray-400">{post.data.date.toDateString()}</p>
    </article>
  );
}
