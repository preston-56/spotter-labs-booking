"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Building, CalendarIcon, Clock, MapPin, Users } from "lucide-react";

// Mock data for bookings
const mockBookings = [
  {
    id: "booking1",
    date: new Date(2025, 3, 10),
    timeSlot: "09:00 - 10:00",
    cluster: "HR",
    floor: "Floor 1",
    workstation: "Workstation 2",
    hotDesk: "HD 1"
  },
  {
    id: "booking2",
    date: new Date(2025, 3, 12),
    timeSlot: "14:00 - 15:00",
    cluster: "IT & Facilities",
    floor: "Floor 3",
    workstation: "Workstation 1",
    hotDesk: "HD 2"
  }
];

// Mock data for available workstations
const availableWorkstations = {
  "Floor 1": 15,
  "Floor 2": 10,
  "Floor 3": 20,
};

// Mock data for cluster utilization
const clusterUtilization = [
  { name: "General Direction", booked: 6, total: 15 },
  { name: "HR", booked: 10, total: 25 },
  { name: "Comms & Fundraising", booked: 5, total: 15 },
  { name: "IT & Facilities", booked: 7, total: 10 },
  { name: "Finance", booked: 4, total: 10 }
];

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Bookings
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Available Workstations
                </CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">35</div>
                <p className="text-xs text-muted-foreground">
                  Across all floors
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Utilization Rate
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65%</div>
                <p className="text-xs text-muted-foreground">
                  +10% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Peak Hours
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10:00 - 14:00</div>
                <p className="text-xs text-muted-foreground">
                  Highest booking demand
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cluster Utilization</CardTitle>
                <CardDescription>
                  Current booking status by cluster
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clusterUtilization.map((cluster) => (
                    <div key={cluster.name} className="flex items-center">
                      <div className="w-1/3 font-medium truncate">
                        {cluster.name}
                      </div>
                      <div className="w-2/3 flex items-center gap-2">
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{
                              width: `${
                                (cluster.booked / cluster.total) * 100
                              }%`
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {cluster.booked}/{cluster.total}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Workstations by Floor</CardTitle>
                <CardDescription>Current availability status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(availableWorkstations).map(
                    ([floor, count]) => (
                      <div
                        key={floor}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{floor}</span>
                        </div>
                        <Badge
                          variant={
                            count > 10
                              ? "default"
                              : count > 5
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {count} available
                        </Badge>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bookings</CardTitle>
              <CardDescription>
                View and manage your workstation bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mockBookings.length > 0 ? (
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">
                          {format(booking.date, "PPP")}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {booking.timeSlot}
                        </div>
                      </div>
                      <div className="space-y-1 mt-2 md:mt-0">
                        <div className="font-medium">{booking.cluster}</div>
                        <div className="text-sm text-muted-foreground">
                          {booking.floor} - {booking.workstation} -{" "}
                          {booking.hotDesk}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">
                    You don't have any bookings yet.
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/book">Book a Workstation</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Check Availability</CardTitle>
                <CardDescription>
                  Select a date to see available workstations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="mx-auto"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Workstations</CardTitle>
                <CardDescription>
                  {date
                    ? format(date, "PPP")
                    : "Select a date to view availability"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {date ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Floor 1</h3>
                      <div className="grid grid-cols-3 gap-2">
                        <Badge variant="outline" className="justify-center">
                          WS 1 - HD 1
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          WS 1 - HD 2
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          WS 2 - HD 1
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          WS 3 - HD 1
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          WS 3 - HD 2
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Floor 2</h3>
                      <div className="grid grid-cols-3 gap-2">
                        <Badge variant="outline" className="justify-center">
                          WS 1 - HD 1
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          WS 1 - HD 2
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          WS 2 - HD 1
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Floor 3</h3>
                      <div className="grid grid-cols-3 gap-2">
                        <Badge variant="outline" className="justify-center">
                          WS 1 - HD 1
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          WS 2 - HD 1
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          WS 3 - HD 1
                        </Badge>
                        <Badge variant="outline" className="justify-center">
                          WS 4 - HD 1
                        </Badge>
                      </div>
                    </div>

                    <Button className="w-full mt-4">Book Selected Date</Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">
                      Please select a date to view availability
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
