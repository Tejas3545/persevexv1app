import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_secret_key_change_me"
);

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { projectIds } = await req.json();

    const session = req.cookies.get("session")?.value;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const { payload } = await jwtVerify(session, SECRET_KEY);
      if (payload.role1 !== "admin" && payload.id !== id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } catch (e) {
      return NextResponse.json({ error: "Invalid Session" }, { status: 401 });
    }

    if (!projectIds || !Array.isArray(projectIds) || projectIds.length < 2) {
      return NextResponse.json(
        { error: "Please select at least 2 projects." },
        { status: 400 }
      );
    }

    const student = await prisma.students.findUnique({ where: { id } });
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    await prisma.$transaction(
      projectIds.map((projectId: string) =>
        prisma.studentProject.create({
          data: {
            studentId: id,
            projectId: projectId,
            status: "SELECTED",
          },
        })
      )
    );

    return NextResponse.json({ message: "Projects selected successfully" });
  } catch (error: any) {
    console.error("Select projects error:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Some projects are already selected." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
