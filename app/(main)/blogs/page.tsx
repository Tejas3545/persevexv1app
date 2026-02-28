import React from "react";
import BlogBackground from "@/app/components/Blogs/BlogBackground";
import BlogList from "@/app/components/Blogs/BlogList";
import prisma from "@/lib/prisma";
import { DUMMY_BLOGS } from "./dummyBlogs";

const getBlogs = async () => {
  try {
    const blogs = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return blogs.length > 0 ? blogs : DUMMY_BLOGS;
  } catch (error) {
    console.warn("Failed to fetch blogs from database. Returning dummy blogs.", error);
    return DUMMY_BLOGS;
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
