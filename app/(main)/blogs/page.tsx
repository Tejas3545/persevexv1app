import React from "react";
import BlogBackground from "@/app/components/Blogs/BlogBackground";
import BlogList from "@/app/components/Blogs/BlogList";
import prisma from "@/lib/prisma";

const getBlogs = async () => {
  try {
    const blogs = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return blogs;
  } catch (error) {
    console.warn("Failed to fetch blogs from database. Returning empty array.", error);
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
          <p>No blog posts found. Create one!</p>
        )}
      </div>
    </main>
  );
}
