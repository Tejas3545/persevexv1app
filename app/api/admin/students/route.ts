import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const students = await prisma.students.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });

    return NextResponse.json({ students });
  } catch (error: any) {
    console.error("Fetch students error:", error);
    return NextResponse.json(
      { error: "Failed to fetch students", details: error.message },
      { status: 500 }
    );
  }
}
