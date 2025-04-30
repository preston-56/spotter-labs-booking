"use client";

import { format } from "date-fns";

import { Booking, BookingUpdateDetails } from "@/types/booking";
import BookingActions from "@/components/booking/booking-actions";

export interface BookingItemProps {
  booking: Booking;
  onReschedule: (bookingId: string, newDetails: BookingUpdateDetails) => void;
  onCancel: (bookingId: string) => void;
}

export function BookingItem({
  booking,
  onReschedule,
  onCancel
}: BookingItemProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
      <div className="space-y-1">
        <div className="font-medium">{format(booking.date, "PPP")}</div>
        <div className="text-sm text-muted-foreground">{booking.timeSlot}</div>
      </div>
      <div className="space-y-1 mt-2 md:mt-0">
        <div className="font-medium">{booking.cluster}</div>
        <div className="text-sm text-muted-foreground">
          {booking.floor} - {booking.workstation} - {booking.hotDesk}
        </div>
      </div>
      <BookingActions
        bookingId={booking.id}
        initialDate={booking.date}
        initialTimeSlot={booking.timeSlot}
        onReschedule={onReschedule}
        onCancel={onCancel}
        size="sm"
      />
    </div>
  );
}
