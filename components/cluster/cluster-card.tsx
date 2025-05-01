"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users } from "lucide-react";
import { toUrlFriendly } from "@/utils/url-utils";
import { useRouter } from "next/navigation";
import { ClusterCardProps } from "@/types";

export const ClusterCard = ({ cluster }: ClusterCardProps) => {
  const router = useRouter();
  const utilizationPercentage = Math.round((cluster.booked / cluster.total) * 100);

  return (
    <Card
      key={cluster.name}
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => router.push(`/admin/clusters/${toUrlFriendly(cluster.name)}`)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{cluster.name}</span>
          <span
            className={`text-sm ${
              utilizationPercentage > 80
                ? "text-red-500"
                : utilizationPercentage > 50
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {utilizationPercentage}%
          </span>
        </CardTitle>
        <CardDescription>
          {cluster.booked} of {cluster.total} workstations booked
        </CardDescription>
      </CardHeader>
      <CardContent>
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

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <Building className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{cluster.total} workstations</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{Math.floor(cluster.total * 0.8)} capacity</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};