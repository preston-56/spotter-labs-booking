"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkstationOptionProps } from "@/types";

export function WorkstationOption({
  floor,
  workstation,
  hotDesk,
  availability
}: WorkstationOptionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{floor}</CardTitle>
        <CardDescription>
          {workstation}, {hotDesk}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{availability}</p>
      </CardContent>
    </Card>
  );
}