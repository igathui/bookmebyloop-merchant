"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalAppointments: number;
  lastVisit: string;
}

export function ClientsView() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For MVP, we'll use mock data
    // In production, fetch from API
    setTimeout(() => {
      setClients([
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "+1234567890",
          totalAppointments: 5,
          lastVisit: "2025-01-10",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+1234567891",
          totalAppointments: 3,
          lastVisit: "2025-01-08",
        },
        {
          id: "3",
          name: "Mike Johnson",
          email: "mike@example.com",
          phone: "+1234567892",
          totalAppointments: 7,
          lastVisit: "2025-01-12",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="text-muted-foreground">Loading clients...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Clients</h2>
        <p className="text-muted-foreground">Your customer directory</p>
      </div>

      {clients.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No clients yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <Card key={client.id}>
              <CardHeader>
                <CardTitle>{client.name}</CardTitle>
                <CardDescription>{client.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-muted-foreground text-sm">Phone</p>
                  <p className="text-sm font-medium">{client.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">
                    Total Appointments
                  </p>
                  <p className="text-sm font-medium">
                    {client.totalAppointments}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Last Visit</p>
                  <p className="text-sm font-medium">
                    {new Date(client.lastVisit).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
