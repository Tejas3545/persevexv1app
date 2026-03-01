import React from "react";
import { notFound } from "next/navigation";
import BlogBackground from "@/app/components/Blogs/BlogBackground";
import { MDXRemote } from "next-mdx-remote/rsc";
import prisma from "@/lib/prisma";

const getBlog = async (slug: string) => {
  try {
    const blog = await prisma.post.findUnique({
      where: {
        slug: slug,
      },
    });
    return blog;
  } catch (error) {
    console.error("Failed to fetch blog from database:", error);
    return null;
  }
};

type Params = Promise<{ slug: string }>
export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } =await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }
  const hasAllMetadata = blog.title && blog.author && blog.description;

  return (
    <main className="relative min-h-screen w-full text-foreground overflow-x-hidden">
      <BlogBackground />
      <div className="flex flex-col items-center justify-start pt-24 min-h-screen w-full px-4 sm:px-8">
        <div className="max-w-4xl w-full">

          {hasAllMetadata ? (
            <>
              <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>
              <p className="text-muted-foreground mb-8">
                By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xl text-muted-foreground mb-12 border-l-4 border-muted pl-4 italic">
                {blog.description}
              </p>
            </>
          ) : (
            
            <p className="text-muted-foreground mb-8">
              Posted on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          )}

          <article className="prose dark:prose-invert prose-slate bg-transparent backdrop-blur-xl lg:prose-xl lg:mb-8 max-w-none">
            <MDXRemote source={blog.content} />
          </article>
        </div>
      </div>
    </main>
  );
}