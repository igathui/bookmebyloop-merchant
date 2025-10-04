import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    console.log("[v0] Login API route called");
    const { email, password } = await request.json();
    console.log("[v0] Login attempt for email:", email);

    // Find business including businessInfo relation
    console.log("[v0] Querying database for business...");
    const business = await prisma.business.findUnique({
      where: { email },
      include: { businessInfo: true },
    });

    if (!business) {
      console.log("[v0] No business found with email:", email);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    console.log("[v0] Business found:", business.id, "Name:", business.name);

    // Verify password
    console.log("[v0] Verifying password...");
    const isValidPassword = password === business.password;

    if (!isValidPassword) {
      console.log("[v0] Password verification failed");
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    console.log("[v0] Password verified successfully");

    const hasBusinessInfo = !!business.businessInfo;
    console.log("[v0] Business has info:", hasBusinessInfo);

    return NextResponse.json(
      {
        message: "Login successful",
        businessId: business.id,
        hasBusinessInfo,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[v0] Login error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
