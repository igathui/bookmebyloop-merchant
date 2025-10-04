"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Appointment {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export function AppointmentsView() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For MVP, we'll use mock data
    // In production, fetch from API
    setTimeout(() => {
      setAppointments([
        {
          id: "1",
          clientName: "John Doe",
          service: "Haircut",
          date: "2025-01-15",
          time: "10:00 AM",
          status: "confirmed",
        },
        {
          id: "2",
          clientName: "Jane Smith",
          service: "Beard Trim",
          date: "2025-01-15",
          time: "11:30 AM",
          status: "pending",
        },
        {
          id: "3",
          clientName: "Mike Johnson",
          service: "Hot Towel Shave",
          date: "2025-01-16",
          time: "2:00 PM",
          status: "confirmed",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "completed":
        return "bg-blue-500/10 text-blue-500";
      case "cancelled":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return <div className="text-muted-foreground">Loading appointments...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Appointments</h2>
        <p className="text-muted-foreground">
          Manage your customer appointments
        </p>
      </div>

      {appointments.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No appointments scheduled yet
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {appointment.clientName}
                    </CardTitle>
                    <CardDescription>{appointment.service}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p className="font-medium">{appointment.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
