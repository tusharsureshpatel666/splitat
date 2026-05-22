import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  imageSrc?: string | null;
  createdAt: Date;
};

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link href={`/common/blog/${blog.slug}`}>
      <div className="flex justify-between gap-6 p-[30px] rounded-2xl border mb-4  cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition">
        {/* LEFT SIDE */}
        <div className="flex-1 space-y-2">
          {/* Source / Author line */}
          <div className="text-xs text-gray-500">
            In <span className="font-medium">Your Blog</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold leading-snug line-clamp-2">
            {blog.title}
          </h2>

          {/* Subtitle / Excerpt */}
          {blog.excerpt && (
            <p className="text-gray-600 text-sm line-clamp-2">{blog.excerpt}</p>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
            <span>{new Date(blog.createdAt).toDateString()}</span>
            <span>👏 1.2K</span>
            <span>💬 120</span>
          </div>

          {/* Actions */}
          <Button>Read More</Button>
        </div>

        {/* RIGHT IMAGE */}
        {blog.imageSrc && (
          <div className="relative w-[160px] h-[160px] flex-shrink-0">
            <Image
              src={blog.imageSrc}
              alt={blog.title}
              fill
              className="object-cover rounded-full"
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default BlogCard;
