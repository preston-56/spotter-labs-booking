"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FloorWorkstations } from "@/types/booking";

interface CalendarAvailabilityProps {
  floorData: FloorWorkstations[];
}

export function CalendarAvailability({ floorData }: CalendarAvailabilityProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
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
            {date ? format(date, "PPP") : "Select a date to view availability"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {date ? (
            <div className="space-y-4">
              {floorData.map((floor) => (
                <div key={floor.name} className="space-y-2">
                  <h3 className="font-medium">{floor.name}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {floor.workstations.map((ws) => (
                      <Badge key={ws} variant="outline" className="justify-center">
                        {ws}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}

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
  );
}