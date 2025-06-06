"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookingInfoProps } from "@/types";
import BookingActions from "@/components/booking/booking-actions";
import { DateTimeInfo } from "@/components/booking/date-time-info";
import { LocationInfo } from "@/components/booking/location-info";
import { UserInfo } from "@/components/booking/user-info";
import { BookingStatus } from "@/components/booking/booking-status";

export function BookingInfo({
  booking,
  onReschedule,
  onCancel
}: BookingInfoProps) {
  // Guard clause - return early if booking is undefined
  if (!booking) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading booking details...</CardTitle>
          <CardDescription>
            Please wait while we fetch your booking information.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Use the userName directly from the booking object
  const userName = booking.userName || booking.user || "Unknown User";

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Booking Details</CardTitle>
          <BookingStatus />
        </div>
        <CardDescription>Booking ID: {booking.id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <DateTimeInfo date={booking.date} timeSlot={booking.timeSlot} />
        <Separator />
        <LocationInfo
          cluster={booking.cluster}
          floor={booking.floor}
          workstation={booking.workstation}
          hotDesk={booking.hotDesk}
        />
        <Separator />
        <UserInfo
          workstationId={booking.workstationId}
          deskIndex={booking.deskIndex}
          userName={userName} // Pass userName as fallback
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <BookingActions
          bookingId={booking.id}
          initialDate={booking.date}
          initialTimeSlot={booking.timeSlot}
          onReschedule={onReschedule}
          onCancel={onCancel}
          size="sm"
        />
      </CardFooter>
    </Card>
  );
}
