"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Building2, Calendar, Users, LogOut } from "lucide-react";
import { BusinessOverview } from "@/components/dashboard/business-overview";
import { AppointmentsView } from "@/components/dashboard/appointments-view";
import { ClientsView } from "@/components/dashboard/clients-view";

type View = "overview" | "appointments" | "clients";

export default function DashboardPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<View>("overview");

  const handleLogout = () => {
    router.push("/");
  };

  const navItems = [
    { id: "overview" as View, label: "Business Overview", icon: Building2 },
    { id: "appointments" as View, label: "Appointments", icon: Calendar },
    { id: "clients" as View, label: "Clients", icon: Users },
  ];

  return (
    <div className="bg-background flex min-h-screen">
      <aside className="border-border bg-card sticky top-0 h-screen w-64 border-r p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                  activeView === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute right-6 bottom-6 left-6">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full gap-2 bg-transparent"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        {activeView === "overview" && <BusinessOverview />}
        {activeView === "appointments" && <AppointmentsView />}
        {activeView === "clients" && <ClientsView />}
      </main>
    </div>
  );
}
