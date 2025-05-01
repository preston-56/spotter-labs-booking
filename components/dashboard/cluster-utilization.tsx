"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClusterUtilizationProps } from "@/types";

export function ClusterUtilization({ clusters }: ClusterUtilizationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cluster Utilization</CardTitle>
        <CardDescription>
          Current booking status by cluster
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clusters.map((cluster) => (
            <div key={cluster.name} className="flex items-center">
              <div className="w-1/3 font-medium truncate">
                {cluster.name}
              </div>
              <div className="w-2/3 flex items-center gap-2">
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{
                      width: `${(cluster.booked / cluster.total) * 100}%`
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
  );
}