"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    description: "",
    location: "",
    tillNumber: "",
  });
  const [services, setServices] = useState([{ name: "", rate: "" }]);

  const addService = () => setServices([...services, { name: "", rate: "" }]);
  const removeService = (index: number) =>
    setServices(services.filter((_, i) => i !== index));
  const updateService = (
    index: number,
    field: "name" | "rate",
    value: string,
  ) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // check passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // validate tillNumber (6 digits)
    if (!/^\d{6}$/.test(formData.tillNumber)) {
      setError("Till number must be exactly 6 digits");
      return;
    }

    const validServices = services.filter((s) => s.name && s.rate);

    try {
      const response = await fetch("/api/auth/register", {
        // <-- FIXED ENDPOINT
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
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
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="justify-items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-balance">
            Create your business account
          </h1>
          <p className="text-muted-foreground mt-2">
            Enter your business details to get started
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card space-y-4 rounded-lg border p-8"
        >
          {/* Business Info */}
          <div className="space-y-2">
            <Label htmlFor="name">Business Name</Label>
            <Input
              id="name"
              placeholder="Enter your Business Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="business@email.com"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="0712345678"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the business"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              className="bg-background min-h-24"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g. Nairobi CBD"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tillNumber">Till Number</Label>
            <Input
              id="tillNumber"
              value={formData.tillNumber}
              onChange={(e) =>
                setFormData({ ...formData, tillNumber: e.target.value })
              }
              placeholder="6-digit till number"
              maxLength={6}
              required
              className="bg-background"
            />
          </div>
          {/* Services Section */}
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
                  onChange={(e) => updateService(index, "name", e.target.value)}
                  className="bg-background"
                />
                <Input
                  placeholder="Rate"
                  type="number"
                  step="0.01"
                  value={service.rate}
                  onChange={(e) => updateService(index, "rate", e.target.value)}
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
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
