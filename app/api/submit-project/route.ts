import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const submissionId = body.meta_data;

    if (!submissionId) {
      return NextResponse.json(
        {
          message: "Meta Data (Submission ID) is required!",
        },
        { status: 400 }
      );
    }

    const existingStudentProject = await prisma?.studentProject.findUnique({
      where: {
        id: submissionId,
      },
    });

    if (!existingStudentProject) {
      return NextResponse.json(
        {
          message: "Student Project not found!",
        },
        { status: 404 }
      );
    }

    const updatedSubmission = await prisma?.studentProject.update({
      where: {
        id: submissionId,
      },
      data: {
        status: "SUBMITTED",
        completedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Submission updated successfully!",
        updatedSubmission,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        message: "Error while updating submission",
        error: error,
      },
      { status: 500 }
    );
  }
}
