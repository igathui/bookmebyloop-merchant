import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const businessId = await getSession();

    if (!businessId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { description, location, tillNumber, services } =
      await request.json();

    // Create business info
    await prisma.businessInfo.create({
      data: {
        businessId,
        description,
        location,
        tillNumber,
      },
    });

    // Create services
    if (services && services.length > 0) {
      await prisma.service.createMany({
        data: services.map((service: { name: string; rate: number }) => ({
          businessId,
          name: service.name,
          rate: service.rate,
        })),
      });
    }

    return NextResponse.json(
      { message: "Business information saved successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("[v0] Business info error:", error);
    return NextResponse.json(
      { error: "Failed to save business information" },
      { status: 500 },
    );
  }
}
