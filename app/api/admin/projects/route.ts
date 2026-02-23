import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain");

    if (!domain) {
      return NextResponse.json(
        { error: "Domain parameter is required" },
        { status: 400 }
      );
    }

    // Reuse fuzzy matching logic if desired, or simpler logic for admin
    const queryDomains = new Set([domain]);
    const lower = domain.toLowerCase();

    // Simple fuzzy map
    if (lower === "cyber security") queryDomains.add("Cybersecurity");
    if (lower === "cybersecurity") queryDomains.add("Cyber Security");
    if (lower === "data science") queryDomains.add("DataScience");
    // Add more if needed

    const projects = await prisma.project.findMany({
      where: {
        domain: {
          in: Array.from(queryDomains),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ projects });
  } catch (error: any) {
    console.error("Fetch projects error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, domain, summary, content } = body;

    if (!title || !slug || !domain || !summary || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        domain,
        summary,
        content,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error("Error creating project:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A project with this slug already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
