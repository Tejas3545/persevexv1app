import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createPostSchema = z.object({
  slug: z.string().min(1, { message: "Slug is required" }).regex(/^[a-z0-9-]+$/, { message: "Slug must be lowercase alphanumeric with hyphens" }),
  title: z.string().optional(),
  author: z.string().optional(),
  description: z.string().optional(),
  content: z.string().min(1, { message: "Content is required" }),
});

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${process.env.API_SECRET_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const validation = createPostSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { slug, title, author, description, content } = validation.data;

    const newPost = await prisma.post.create({
      data: {
        slug, 
        title,
        author,
        description,
        content,
      },
    });

    let siteUrl;
    if (process.env.VERCEL_ENV === 'production') {
      siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.persevex.com';
    } else if (process.env.VERCEL_URL) {
      siteUrl = `https://${process.env.VERCEL_URL}`;
    } else {
      siteUrl = `http://localhost:3000`;
    }

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${newPost.slug}`);

    return NextResponse.json(
      {
        message: "Blog post created successfully",
        url: `${siteUrl}/blogs/${newPost.slug}`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A post with this slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create blog post." },
      { status: 500 }
    );
  }
}
