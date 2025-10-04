import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    console.log("[v0] Registration API called");
    const {
      name,
      email,
      phone,
      password,
      description,
      location,
      tillNumber,
      services,
    } = await request.json();

    // Check if business already exists
    const existingBusiness = await prisma.business.findUnique({
      where: { email },
    });
    if (existingBusiness) {
      return NextResponse.json(
        { error: "Business email already registered" },
        { status: 400 },
      );
    }

    // 1. Create Business
    const business = await prisma.business.create({
      data: {
        name,
        email,
        phone,
        password,
      },
    });

    // 2. Create BusinessInfo
    const businessInfo = await prisma.businessInfo.create({
      data: {
        businessId: business.id,
        description,
        location,
        tillNumber,
      },
    });

    // 3. Create Services (if any)
    if (services && services.length > 0) {
      await prisma.service.createMany({
        data: services.map((s: { name: string; rate: number }) => ({
          name: s.name,
          rate: s.rate,
          businessInfoId: businessInfo.id, // <-- Correct relation!
        })),
      });
    }

    return NextResponse.json(
      { message: "Business registered successfully", business },
      { status: 201 },
    );
  } catch (error) {
    console.error("[v0] Registration error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to register business";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
