import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filename, fileType, projectId, studentName } = body;

    if (!filename || !projectId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const targetFileName = `${studentName}_${projectId}_${filename}`;

    const response = await auth.request({
      url: "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Upload-Content-Type": fileType,
        "X-Upload-Content-Length": body.fileSize,
      },
      data: {
        name: targetFileName,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
        mimeType: fileType,
      },
    });

    const uploadUrl =
      (response.headers as any).location ||
      (response.headers as any).get?.("location");

    if (!uploadUrl) {
      throw new Error("Failed to generate upload URL");
    }

    return NextResponse.json({ uploadUrl });
  } catch (error: any) {
    console.error("Session creation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
