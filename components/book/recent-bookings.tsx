"use client";

import { CalendarDays } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { RecentBookingsSlimProps } from "@/types";

export function RecentBookings({ bookings }: RecentBookingsSlimProps) {
  return (
    <Card className="border-indigo-200 bg-white/80 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">
          Recent Bookings
        </CardTitle>
        <CardDescription>Your last {bookings.length} bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {bookings.map((booking, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border border-indigo-100 bg-indigo-50/50 p-3 dark:border-indigo-900 dark:bg-indigo-950/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">{booking.date}</p>
                  <p className="text-xs text-muted-foreground">
                    {booking.time}
                  </p>
                </div>
              </div>
              <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {booking.location}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}