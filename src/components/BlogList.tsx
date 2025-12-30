import BlogListItem from "./BlogListItem";
import type { CollectionEntry } from "astro:content";

interface BlogListProps {
  posts: CollectionEntry<"posts">[];
}

export default function BlogList({ posts }: BlogListProps) {
  if (!posts.length) {
    return <p className="text-gray-500">No posts found.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map(post => (
        <BlogListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
