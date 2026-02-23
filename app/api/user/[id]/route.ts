import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_secret_key_change_me"
);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = req.cookies.get("session")?.value;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const { payload } = await jwtVerify(session, SECRET_KEY);

      if (payload.id !== id) {
        if (payload.role1 !== "admin" && payload.id !== id) {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
      }
    } catch (e) {
      return NextResponse.json({ error: "Invalid Session" }, { status: 401 });
    }

    const student = await prisma.students.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        domains: true,
        role1: true,
        month: true,
        createdAt: true,
        projects: {
          include: {
            project: true,
          },
        },
      },
    });

    if (!student) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ student });
  } catch (error: any) {
    console.error("Fetch user error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
