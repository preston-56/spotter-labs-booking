"use client";

import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  clusterUtilization,
  mockBookings,
  availableWorkstations
} from "@/mocks";
import { fromUrlFriendly } from "@/utils/url-utils";
import ClusterNotFound from "@/components/cluster/cluster-not-found";
import ClusterOverview from "@/components/cluster/cluster-overview";
import UtilizationProgress from "@/components/cluster/utilization-progress";
import { RecentBookings } from "@/components/book/recent-bookings";
import QuickActions from "@/components/workstation/quick-actions";
import WorkstationsByFloor from "@/components/workstation/workstation-by-floor";
import { ArrowLeft } from "lucide-react";

export default function ClusterDetailPage() {
  const params = useParams(); // Extracts dynamic route parameters
  const router = useRouter(); // Allows navigation (e.g., back)

  // Converts URL param to readable cluster name and normalize to lower case
  const clusterName = fromUrlFriendly(params.name as string).toLowerCase();

  // Find the matching cluster with a case-insensitive comparison
  const cluster = clusterUtilization.find(
    (c) => c.name.toLowerCase() === clusterName
  );

  if (!cluster) {
    return <ClusterNotFound />; // Fallback UI if cluster doesn't exist
  }

  // Filter and format bookings for the selected cluster
  const clusterBookings = mockBookings
    .filter((booking) => booking.cluster === clusterName)
    .map((booking) => ({
      id: booking.id,
      date: format(booking.date, "MMM dd, yyyy"),
      time: booking.timeSlot,
      location: `${booking.floor}, ${booking.workstation}`
    }));

  // Calculate utilization as a percentage
  const utilizationPercentage = Math.round(
    (cluster.booked / cluster.total) * 100
  );

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Back button to return to previous page */}
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      {/* Main cluster details and quick actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <ClusterOverview
          cluster={cluster}
          utilizationPercentage={utilizationPercentage}
        />
        <div className="space-y-6">
          <QuickActions />
          <WorkstationsByFloor floors={availableWorkstations} />
        </div>
      </div>

      {/* Utilization and recent bookings */}
      <div>
        <UtilizationProgress utilizationPercentage={utilizationPercentage} />
        <RecentBookings bookings={clusterBookings} />
      </div>
    </div>
  );
}
