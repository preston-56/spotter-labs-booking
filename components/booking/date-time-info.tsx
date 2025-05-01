"use client";

import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { DateTimeInfoProps } from "@/types";

export function DateTimeInfo({ date, timeSlot }: DateTimeInfoProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-1">
        <div className="text-sm font-medium text-muted-foreground">
          Date
        </div>
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-indigo-500" />
          <span>{format(date, "PPP")}</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-sm font-medium text-muted-foreground">
          Time Slot
        </div>
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4 text-indigo-500" />
          <span>{timeSlot}</span>
        </div>
      </div>
    </div>
  );
}