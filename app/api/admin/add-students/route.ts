import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      firstName,
      lastName,
      username,
      password,
      course1,
      role1,
      month,
    } = body;

    // Validate required fields
    if (!email || !month || !password) {
      return NextResponse.json(
        { error: "Email, password, and month are required" },
        { status: 400 }
      );
    }

    const domain = course1 || "";

    // Check if student already exists
    const existingStudent = await prisma.students.findUnique({
      where: { email },
    });

    if (existingStudent) {
      // Check if domain already exists in the array
      if (existingStudent.domains && existingStudent.domains.includes(domain)) {
        return NextResponse.json({
          message: "Student already enrolled in this domain",
          status: "skipped",
          student: existingStudent,
        });
      }

      // Add new domain
      const updatedStudent = await prisma.students.update({
        where: { email },
        data: {
          domains: {
            push: domain,
          },
        },
      });

      return NextResponse.json({
        message: "Added new domain to existing student",
        status: "updated",
        student: updatedStudent,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await prisma.students.create({
      data: {
        email,
        firstName: firstName || "",
        lastName: lastName || "",
        username: username || email.split("@")[0],
        password: hashedPassword,
        domains: [domain], // Initialize as array
        role1: role1 || "student",
        month,
      },
    });

    return NextResponse.json({
      message: "Student added successfully",
      status: "created",
      student,
    });
  } catch (error: any) {
    console.error("Add student error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
