"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BusinessData {
  name: string;
  email: string;
  phone: string;
  description?: string;
  location?: string;
  tillNumber?: string;
  services?: Array<{ name: string; rate: number }>;
}

export function BusinessOverview() {
  const [business, setBusiness] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For MVP, we'll use mock data
    // In production, fetch from API using business ID from session
    setTimeout(() => {
      setBusiness({
        name: "Keith's Barber Shoppe",
        email: "keith@barbershop.com",
        phone: "+1234567890",
        description:
          "Professional barbershop offering quality haircuts and grooming services",
        location: "123 Main Street, Downtown",
        tillNumber: "123456",
        services: [
          { name: "Haircut", rate: 25 },
          { name: "Beard Trim", rate: 15 },
          { name: "Hot Towel Shave", rate: 30 },
        ],
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  if (!business) {
    return <div className="text-muted-foreground">No business data found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">{business.name}</h2>
        <p className="text-muted-foreground">Business overview and details</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-muted-foreground text-sm">Email</p>
              <p className="font-medium">{business.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Phone</p>
              <p className="font-medium">{business.phone}</p>
            </div>
            {business.location && (
              <div>
                <p className="text-muted-foreground text-sm">Location</p>
                <p className="font-medium">{business.location}</p>
              </div>
            )}
            {business.tillNumber && (
              <div>
                <p className="text-muted-foreground text-sm">Till Number</p>
                <p className="font-medium">{business.tillNumber}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {business.description || "No description provided"}
            </p>
          </CardContent>
        </Card>
      </div>

      {business.services && business.services.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Services & Rates</CardTitle>
            <CardDescription>Services offered by your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {business.services.map((service, index) => (
                <div
                  key={index}
                  className="border-border flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <span className="font-medium">{service.name}</span>
                  <span className="text-muted-foreground">
                    ${service.rate.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
