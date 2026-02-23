import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Input must be a JSON array of projects." },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(
      body.map((project) => {
        if (
          !project.title ||
          !project.slug ||
          !project.domain ||
          !project.content
        ) {
          throw new Error(
            `Project "${project.title || "Unknown"
            }" is missing required fields.`
          );
        }

        return prisma.project.upsert({
          where: { slug: project.slug },

          update: {
            title: project.title,
            domain: project.domain,
            summary: project.summary,
            content: project.content,
          },

          create: {
            title: project.title,
            slug: project.slug,
            domain: project.domain,
            summary: project.summary,
            content: project.content,
          },
        });
      })
    );

    return NextResponse.json(
      {
        message: "Bulk import successful",
        count: result.length,
        projects: result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Bulk Import Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
