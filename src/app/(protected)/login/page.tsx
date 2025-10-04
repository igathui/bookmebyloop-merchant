"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("[v0] Login form submitted with email:", formData.email);

    try {
      console.log("[v0] Sending login request to API...");
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("[v0] Received response, status:", response.status);
      const data = await response.json();
      console.log("[v0] Response data:", data);

      if (!response.ok) {
        console.log("[v0] Login failed with error:", data.error);
        setError(data.error || "Failed to login");
        setLoading(false);
        return;
      }

      console.log(
        "[v0] Login successful, hasBusinessInfo:",
        data.hasBusinessInfo,
      );
      if (data.hasBusinessInfo) {
        console.log("[v0] Redirecting to dashboard...");
        router.push("/dashboard");
      } else {
        console.log("[v0] Redirecting to business-info...");
        router.push("/business-info");
      }
    } catch (err) {
      console.error("[v0] Login exception:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="justify-items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-balance">
            Welcome back
          </h1>
          <p className="text-muted-foreground mt-2">
            Log in to your business account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="border-border bg-card space-y-4 rounded-lg border p-8">
            <div className="space-y-2">
              <Label htmlFor="email">Business Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@keithsbarbershoppe.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                required
                className="bg-background"
              />
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </div>
        </form>

        <p className="text-muted-foreground text-center text-sm">
          {"Don't have an account? "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
