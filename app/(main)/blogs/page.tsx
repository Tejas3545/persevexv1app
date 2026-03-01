import React from "react";
import BlogBackground from "@/app/components/Blogs/BlogBackground";
import BlogList from "@/app/components/Blogs/BlogList";
import prisma from "@/lib/prisma";
import Link from "next/link";

const getBlogs = async () => {
  try {
    const blogs = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return blogs;
  } catch (error) {
    console.error("Failed to fetch blogs from database.", error);
    return [];
  }
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="relative min-h-screen w-full text-foreground overflow-x-hidden">
      <BlogBackground />
      <div className="flex flex-col items-center justify-start pt-24 min-h-screen w-full px-4 sm:px-8">
        <h1 className="text-5xl font-bold mb-12">Our Blog</h1>
        {blogs.length > 0 ? (
          <BlogList blogs={blogs} />
        ) : (
          <div className="text-center py-20">
            <div className="mb-6">
              <svg
                className="mx-auto h-24 w-24 text-muted-foreground/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No blog posts yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We're working on creating valuable content for you. Check back soon for insightful articles, tips, and updates!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
