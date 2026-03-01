import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get total counts
    const [totalStudents, totalProjects, totalBlogs] = await Promise.all([
      prisma.students.count(),
      prisma.project.count(),
      prisma.post.count(),
    ]);

    // Get students from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentStudents = await prisma.students.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    return NextResponse.json({
      totalStudents,
      totalProjects,
      totalBlogs,
      recentStudents,
    });
  } catch (error: any) {
    console.error("Stats fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats", details: error.message },
      { status: 500 }
    );
  }
}
