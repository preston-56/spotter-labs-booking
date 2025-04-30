"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Users,
  Building,
  AlertCircle,
  BarChart3,
  Calendar,
  MapPin
} from "lucide-react";
import {
  clusterUtilization,
  mockBookings,
  availableWorkstations
} from "@/mocks/data";
import { format } from "date-fns";
import { fromUrlFriendly } from "@/utils/url-utils";

export default function ClusterDetailPage() {
  const params = useParams();
  const router = useRouter();

  // Use the utility function to convert URL-friendly slug back to display name
  const clusterName = fromUrlFriendly(params.name as string);

  // Find the cluster in our mock data
  const cluster = clusterUtilization.find((c) => c.name === clusterName);

  // If cluster not found, show error state
  if (!cluster) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Cluster Not Found</CardTitle>
            <CardDescription className="text-center">
              The cluster you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <AlertCircle className="h-16 w-16 text-muted-foreground" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/dashboard")}>
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Filter bookings for this cluster
  const clusterBookings = mockBookings.filter(
    (booking) => booking.cluster === clusterName
  );

  // Calculate utilization percentage
  const utilizationPercentage = Math.round(
    (cluster.booked / cluster.total) * 100
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{clusterName} Cluster</CardTitle>
              <Badge
                className={
                  utilizationPercentage > 80
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    : utilizationPercentage > 50
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                }
              >
                {utilizationPercentage}% Utilized
              </Badge>
            </div>
            <CardDescription>
              Manage workstations and bookings for this cluster
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4 text-center">
                <div className="text-sm font-medium text-muted-foreground">
                  Total Workstations
                </div>
                <div className="mt-2 flex items-center justify-center">
                  <Building className="mr-2 h-4 w-4 text-indigo-500" />
                  <span className="text-2xl font-bold">{cluster.total}</span>
                </div>
              </div>

              <div className="rounded-lg border p-4 text-center">
                <div className="text-sm font-medium text-muted-foreground">
                  Booked
                </div>
                <div className="mt-2 flex items-center justify-center">
                  <Calendar className="mr-2 h-4 w-4 text-indigo-500" />
                  <span className="text-2xl font-bold">{cluster.booked}</span>
                </div>
              </div>

              <div className="rounded-lg border p-4 text-center">
                <div className="text-sm font-medium text-muted-foreground">
                  Available
                </div>
                <div className="mt-2 flex items-center justify-center">
                  <MapPin className="mr-2 h-4 w-4 text-indigo-500" />
                  <span className="text-2xl font-bold">
                    {cluster.total - cluster.booked}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-4 text-lg font-medium">Utilization</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Utilization</span>
                  <span className="text-sm font-medium">
                    {utilizationPercentage}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full ${
                      utilizationPercentage > 80
                        ? "bg-red-500"
                        : utilizationPercentage > 50
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${utilizationPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-4 text-lg font-medium">Recent Bookings</h3>
              {clusterBookings.length > 0 ? (
                <div className="space-y-3">
                  {clusterBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex flex-col md:flex-row md:items-center justify-between rounded-lg border p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => router.push(`/bookings/${booking.id}`)}
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
                        <div className="font-medium">
                          {booking.floor}, {booking.workstation}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {booking.hotDesk}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border p-6 text-center">
                  <p className="text-muted-foreground">
                    No recent bookings for this cluster.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" /> Book Workstation
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" /> View Team Members
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" /> View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workstations by Floor</CardTitle>
              <CardDescription>Distribution across floors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(availableWorkstations).map(([floor, count]) => (
                <div key={floor} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{floor}</span>
                  </div>
                  <Badge variant="outline">
                    {Math.floor(count / 3)} workstations
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
