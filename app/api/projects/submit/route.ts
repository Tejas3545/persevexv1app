import { NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    const projectId = formData.get("projectId") as string;

    if (!file || !userId || !projectId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (file.type !== "application/zip" && !file.name.endsWith(".zip")) {
      return NextResponse.json(
        { error: "Only ZIP files are allowed" },
        { status: 400 }
      );
    }

    const MAX_SIZE = 100 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 100MB limit" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "project_submissions",
          public_id: `${userId}-${projectId}-${Date.now()}`,
          format: "zip",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    await prisma.studentProject.update({
      where: {
        studentId_projectId: {
          studentId: userId,
          projectId: projectId,
        },
      },
      data: {
        submissionLink: uploadResult.secure_url,
        status: "SUBMITTED",
        completedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
