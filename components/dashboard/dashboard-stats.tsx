"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { Building, CalendarIcon, Clock, Users } from "lucide-react";
import { DashboardStatsProps } from "@/types";

export function DashboardStats({ stats }: DashboardStatsProps) {
  const { totalBookings, availableWorkstations, utilizationRate, peakHours } = stats;
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Bookings"
        value={totalBookings.value}
        subtext={totalBookings.subtext}
        icon={CalendarIcon}
      />
      <StatsCard
        title="Available Workstations"
        value={availableWorkstations.value}
        subtext={availableWorkstations.subtext}
        icon={Building}
      />
      <StatsCard
        title="Utilization Rate"
        value={utilizationRate.value}
        subtext={utilizationRate.subtext}
        icon={Users}
      />
      <StatsCard
        title="Peak Hours"
        value={peakHours.value}
        subtext={peakHours.subtext}
        icon={Clock}
      />
    </div>
  );
}