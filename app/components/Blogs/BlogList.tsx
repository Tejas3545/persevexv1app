"use client";

import Link from "next/link";
import type { Post } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";        

const truncateContent = (content: string, maxLength: number) => {
  if (content.length <= maxLength) return content;
  let trimmedString = content.substring(0, maxLength);
  trimmedString = trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
  return trimmedString + "...";
};


export default function BlogList({ blogs }: { blogs: Post[] }) {
  return (
    <div className="grid gap-8 max-w-4xl w-full">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="relative block p-6 border border-border rounded-lg hover:bg-background/50 transition-colors group"
        >
          <Link href={`/blogs/${blog.slug}`} className="block">
            {blog.title ? (
              <h2 className="text-3xl font-semibold mb-2">{blog.title}</h2>
            ) : (
              <div className="prose prose-invert max-w-none mb-2 prose-p:mt-0 prose-p:mb-2 prose-headings:my-3">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {truncateContent(blog.content, 250)}
                </ReactMarkdown>
              </div>
            )}
            
            {(blog.author || blog.createdAt) && (
              <p className="text-muted-foreground mb-2">
                {blog.author && `By ${blog.author} on `}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            )}
            
            {blog.description && (
              <p className="text-muted-foreground">{blog.description}</p>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
