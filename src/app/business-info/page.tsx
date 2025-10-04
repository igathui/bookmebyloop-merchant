"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BusinessInfoPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [services, setServices] = useState([{ name: "", rate: "" }]);

  const addService = () => {
    setServices([...services, { name: "", rate: "" }]);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const updateService = (
    index: number,
    field: "name" | "rate",
    value: string,
  ) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const tillNumber = formData.get("tillNumber") as string;

    // Validate till number is 6 digits
    if (!/^\d{6}$/.test(tillNumber)) {
      setError("Till number must be exactly 6 digits");
      return;
    }

    // Filter out empty services
    const validServices = services.filter((s) => s.name && s.rate);

    try {
      const response = await fetch("/api/business-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          location,
          tillNumber,
          services: validServices.map((s) => ({
            name: s.name,
            rate: Number.parseFloat(s.rate),
          })),
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to save business information");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Business Details</h1>
          <p className="text-muted-foreground">
            Tell us more about your business
          </p>
        </div>

        <div className="border-border bg-card rounded-lg border p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your business..."
                required
                className="bg-background min-h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Business address or area"
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tillNumber">Till Number</Label>
              <Input
                id="tillNumber"
                name="tillNumber"
                type="text"
                placeholder="6-digit till number"
                maxLength={6}
                pattern="\d{6}"
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Services & Rates</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addService}
                >
                  Add Service
                </Button>
              </div>

              {services.map((service, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Service name"
                    value={service.name}
                    onChange={(e) =>
                      updateService(index, "name", e.target.value)
                    }
                    className="bg-background"
                  />
                  <Input
                    placeholder="Rate"
                    type="number"
                    step="0.01"
                    value={service.rate}
                    onChange={(e) =>
                      updateService(index, "rate", e.target.value)
                    }
                    className="bg-background w-32"
                  />
                  {services.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeService(index)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {error && <p className="text-destructive text-sm">{error}</p>}

            <Button type="submit" className="w-full">
              Complete Setup
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
