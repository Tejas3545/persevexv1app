import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId, projectId } = await req.json();

    if (!userId || !projectId) {
      return NextResponse.json(
        { error: "User ID and Project ID are required" },
        { status: 400 }
      );
    }

    const existingInterest = await prisma.studentProject.findUnique({
      where: {
        studentId_projectId: {
          studentId: userId,
          projectId: projectId,
        },
      },
    });

    if (!existingInterest) {
      return NextResponse.json(
        { error: "Project not found for this user" },
        { status: 404 }
      );
    }

    if (existingInterest.startedAt) {
      return NextResponse.json(
        { message: "Project already started", project: existingInterest },
        { status: 200 }
      );
    }

    const updatedProject = await prisma.studentProject.update({
      where: {
        studentId_projectId: {
          studentId: userId,
          projectId: projectId,
        },
      },
      data: {
        startedAt: new Date(),
        status: "IN_PROGRESS",
      },
    });

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error: any) {
    console.error("Error starting project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
