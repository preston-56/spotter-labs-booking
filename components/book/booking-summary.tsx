"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { clusters, floors, hotDesks, workstations } from "@/mocks/data";
import { BookingDetails } from "@/types/book";

interface BookingSummaryProps {
  bookingDetails: BookingDetails;
  onReset: () => void;
  onSaveDraft: () => void;
}

export function BookingSummary({ bookingDetails, onReset, onSaveDraft }: BookingSummaryProps) {
  return (
    <Card className="border-indigo-200 bg-white/80 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">
          Booking Summary
        </CardTitle>
        <CardDescription>Review your booking details</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="text-sm text-muted-foreground">
              Cluster:
            </span>
            <span className="font-medium">
              {bookingDetails.cluster
                ? clusters.find((c) => c.id === bookingDetails.cluster)?.name
                : "Not selected"}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-sm text-muted-foreground">Floor:</span>
            <span className="font-medium">
              {bookingDetails.floor
                ? floors.find((f) => f.id === bookingDetails.floor)?.name
                : "Not selected"}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-sm text-muted-foreground">
              Workstation:
            </span>
            <span className="font-medium">
              {bookingDetails.workstation && bookingDetails.floor
                ? workstations[bookingDetails.floor as keyof typeof workstations]?.find(
                    (w) => w.id === bookingDetails.workstation
                  )?.name
                : "Not selected"}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-sm text-muted-foreground">
              Hot Desk:
            </span>
            <span className="font-medium">
              {bookingDetails.hotDesk && bookingDetails.workstation
                ? hotDesks[bookingDetails.workstation as keyof typeof hotDesks]?.find(
                    (h) => h.id === bookingDetails.hotDesk
                  )?.name
                : "Not selected"}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-sm text-muted-foreground">Date:</span>
            <span className="font-medium">
              {bookingDetails.date ? format(bookingDetails.date, "PPP") : "Not selected"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Time Slot:
            </span>
            <span className="font-medium">
              {bookingDetails.timeSlot || "Not selected"}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button
          variant="outline"
          className="border-indigo-200 dark:border-indigo-800 bg-black text-white"
          onClick={onReset}
        >
          Reset Form
        </Button>
        <Button
          variant="outline"
          className="border-indigo-200 dark:border-indigo-800 bg-black text-white"
          onClick={onSaveDraft}
        >
          Save Draft
        </Button>
      </CardFooter>
    </Card>
  );
}
