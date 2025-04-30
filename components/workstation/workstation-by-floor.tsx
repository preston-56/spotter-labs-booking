"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from "@/components/ui/card";
import { Building } from "lucide-react";

interface WorkstationsByFloorProps {
  floors: { [key: string]: number };
}

const WorkstationsByFloor = ({ floors }: WorkstationsByFloorProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Workstations by Floor</CardTitle>
      <CardDescription>Distribution across floors</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {Object.entries(floors).map(([floor, count]) => (
        <div key={floor} className="flex items-center justify-between">
          <div className="flex items-center">
            <Building className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{floor}</span>
          </div>
          <Badge variant="outline">{Math.floor(count / 3)} workstations</Badge>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default WorkstationsByFloor;
