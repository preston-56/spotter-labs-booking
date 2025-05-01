"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchBar } from "@/components/search/search-bar";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { ClusterUtilization } from "@/components/dashboard/cluster-utilization";
import { FloorAvailability } from "@/components/dashboard/floor-availability";
import { BookingsList } from "@/components/booking/booking-list";
import { CalendarAvailability } from "@/components/dashboard/calendar-availability";
import { DataFlowDiagram } from "@/diagrams/data-flow-diagram";

// Import all required mock data
import {
  availableWorkstations,
  clusterUtilization,
  mockBookings,
  statsData,
  floors,
  workstations,
  hotDesks
} from "@/mocks";

// Create floorData structure for CalendarAvailability component
const floorData = floors.map(floor => {
  // Create a safer way to access workstations by floor
  const floorKey = floor.id as keyof typeof workstations;
  const floorWorkstations = workstations[floorKey] || [];

  // Create array of workstation-hotdesk combinations
  const workstationHotDesks = floorWorkstations.flatMap(ws => {
    // Create a safer way to access hot desks by workstation
    const wsKey = ws.id as keyof typeof hotDesks;
    const wsHotDesks = hotDesks[wsKey] || [];

    return wsHotDesks.map(hd => `${ws.name} - ${hd.name}`);
  });

  return {
    name: floor.name,
    workstations: workstationHotDesks
  };
});


export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <SearchBar />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="system">System Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <DashboardStats stats={statsData} />

          <div className="grid gap-4 md:grid-cols-2">
            <ClusterUtilization clusters={clusterUtilization} />
            <FloorAvailability floors={availableWorkstations} />
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <BookingsList initialBookings={mockBookings} />
        </TabsContent>

        <TabsContent value="availability" className="space-y-6">
          <CalendarAvailability floorData={floorData} />
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>System Architecture</CardTitle>
                <CardDescription>Understanding the workstation booking system</CardDescription>
              </div>
              <Info className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                These diagrams illustrate how data flows through the workstation booking system, from user interactions
                to database operations.
              </p>
              <DataFlowDiagram />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}