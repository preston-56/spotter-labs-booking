"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/hooks/use-booking";
import { CalendarAvailabilityProps } from "@/types";

export function CalendarAvailability({ floorData }: CalendarAvailabilityProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedWorkstation, setSelectedWorkstation] = useState<{
    floorName: string;
    workstation: string;
  } | null>(null);

  const { booking, handleBooking } = useBooking();

  const handleWorkstationClick = (floorName: string, workstation: string) => {
    // If already selected, deselect it
    if (
      selectedWorkstation &&
      selectedWorkstation.floorName === floorName &&
      selectedWorkstation.workstation === workstation
    ) {
      setSelectedWorkstation(null);
    } else {
      setSelectedWorkstation({ floorName, workstation });
    }
  };

  const clearSelection = () => {
    setSelectedWorkstation(null);
    setDate(new Date()); // Reset to current date
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Left card: Calendar */}
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

      {/* Right card: Workstations */}
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
                    {floor.workstations.map((ws) => {
                      const isSelected =
                        selectedWorkstation?.floorName === floor.name &&
                        selectedWorkstation?.workstation === ws;

                      return (
                        <Badge
                          key={ws}
                          variant={isSelected ? "default" : "outline"}
                          className={`cursor-pointer justify-center ${
                            isSelected ? "bg-primary text-white" : ""
                          }`}
                          onClick={() => handleWorkstationClick(floor.name, ws)}
                        >
                          {ws}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              ))}

              <Button
                className="w-full mt-4"
                onClick={() =>
                  handleBooking(date, selectedWorkstation, clearSelection)
                }
                disabled={!selectedWorkstation || booking}
              >
                {booking ? "Booking..." : "Book Selected Date"}
              </Button>
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
