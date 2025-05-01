"use client";

import { Building, MapPin } from "lucide-react";
import { LocationInfoProps } from "@/types";

export function LocationInfo({ cluster, floor, workstation, hotDesk }: LocationInfoProps) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-muted-foreground">
        Location
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Building className="mr-2 h-4 w-4 text-indigo-500" />
          <span>Cluster: {cluster}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-indigo-500" />
          <span>
            {floor}, {workstation}, {hotDesk}
          </span>
        </div>
      </div>
    </div>
  );
}