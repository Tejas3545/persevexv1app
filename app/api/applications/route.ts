import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      fullName,
      email,
      phone,
      linkedIn,
      portfolio,
      resume,
      coverLetter,
      experience,
      jobTitle,
      jobId,
      timestamp,
    } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !resume || !coverLetter || !experience) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Google Sheets Integration
    // You can use Google Sheets API or a service like SheetDB, Sheety, or Google Forms
    // For now, using Google Sheets API with service account
    
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    
    if (GOOGLE_SHEETS_URL) {
      // Send to Google Sheets via webhook (Google Apps Script Web App)
      const sheetData = {
        timestamp: timestamp || new Date().toISOString(),
        jobTitle: jobTitle || "General Application",
        jobId: jobId || "general",
        fullName,
        email,
        phone,
        linkedIn: linkedIn || "N/A",
        portfolio: portfolio || "N/A",
        resume,
        experience,
        coverLetter,
      };

      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sheetData),
      });

      if (!response.ok) {
        console.error("Failed to submit to Google Sheets");
        // Continue anyway, don't fail the request
      }
    }

    // Optional: Send confirmation email to applicant
    // Optional: Send notification email to HR team

    return NextResponse.json(
      { 
        success: true, 
        message: "Application submitted successfully",
        applicantEmail: email 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json(
      { error: "Failed to process application" },
      { status: 500 }
    );
  }
}
