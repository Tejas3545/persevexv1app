import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const domainsParam = searchParams.get("domains");
    const userId = searchParams.get("userId");

    if (!domainsParam && !userId) {
      return NextResponse.json(
        { error: "Domains or User ID parameter is required" },
        { status: 400 }
      );
    }

    let domains: string[] = [];
    if (userId) {
      const student = await prisma.students.findUnique({
        where: { id: userId },
        select: { domains: true },
      });
      if (student) {
        domains = student.domains;
      }
    } else if (domainsParam) {
      domains = domainsParam.split(",").map((d) => d.trim());
    }
    const queryDomains = new Set(domains);

    domains.forEach((d) => {
      const lower = d.toLowerCase();

      if (lower === "cyber security") queryDomains.add("Cybersecurity");
      if (lower === "cybersecurity") queryDomains.add("Cyber Security");
      if (lower === "data science") queryDomains.add("DataScience");
      if (lower === "datascience") queryDomains.add("Data Science");
    });

    const projects = await prisma.project.findMany({
      where: {
        domain: {
          in: Array.from(queryDomains),
        },
      },
      select: {
        id: true,
        title: true,
        domain: true,
        summary: true,
        slug: true,
        content: true,
      },
    });

    return NextResponse.json({ projects });
  } catch (error: any) {
    console.error("Fetch projects error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
