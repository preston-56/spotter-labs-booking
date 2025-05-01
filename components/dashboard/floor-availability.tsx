"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { FloorAvailabilityProps } from "@/types";

export function FloorAvailability({ floors }: FloorAvailabilityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Workstations by Floor</CardTitle>
        <CardDescription>Current availability status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(floors).map(([floor, count]) => (
            <div key={floor} className="flex items-center justify-between">
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
}