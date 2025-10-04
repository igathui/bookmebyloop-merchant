import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    console.log("[v0] Registration API called");
    const { name, email, phone, password } = await request.json();
    console.log("[v0] Received registration data:", {
      name,
      email,
      phone,
      hasPassword: !!password,
    });

    // Check if business already exists
    console.log("[v0] Checking if business email already exists");
    const existingBusiness = await prisma.business.findUnique({
      where: { email },
    });

    if (existingBusiness) {
      console.log("[v0] Registration failed: Email already registered");
      return NextResponse.json(
        { error: "Business email already registered" },
        { status: 400 },
      );
    }

    // Create business
    console.log("[v0] Creating business in database");
    const business = await prisma.business.create({
      data: {
        name,
        email,
        phone,
        password,
      },
    });
    console.log("[v0] Business created successfully with ID:", business.id);

    return NextResponse.json(
      { message: "Business registered successfully", businessId: business.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("[v0] Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register business" },
      { status: 500 },
    );
  }
}
