"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface BlogData {
  slug: string; 
  title?: string;
  author?: string;
  description?: string; 
  content: string;
}

export async function createBlog(data: BlogData) {
  const { slug, title, author, description, content } = data;

  try {
    await prisma.post.create({
      data: {
        slug, 
        title,
        author,
        description,
        content,
      },
    });

    revalidatePath("/blogs");

    return { success: true };
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      return {
        success: false,
        error: "A blog post with this slug already exists.",
      };
    }

    return {
      success: false,
      error: "Something went wrong. Failed to create post.",
    };
  }
}

export async function deleteBlog(id: string) {
  try {
    await prisma.post.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/blogs");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete blog post." };
  }
}