"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Calendar, MapPin } from "lucide-react";
import { ClusterOverviewProps } from "@/types";

const ClusterOverview = ({
  cluster,
  utilizationPercentage
}: ClusterOverviewProps) => (
  <Card className="md:col-span-2">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>{cluster.name} Cluster</CardTitle>
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
    </CardContent>
  </Card>
);

export default ClusterOverview;
