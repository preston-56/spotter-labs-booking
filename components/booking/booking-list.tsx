"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingItem } from "@/components/booking/booking-item";
import { useBookings } from "@/hooks/use-bookings";
import { BookingsListProps } from "@/types";

export function BookingsList({ initialBookings }: BookingsListProps) {
  const { bookings, rescheduleBooking, cancelBooking } = useBookings({ initialBookings });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings</CardTitle>
        <CardDescription>
          View and manage your workstation bookings
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={booking}
                onReschedule={rescheduleBooking}
                onCancel={cancelBooking}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">
              You don't have any bookings yet.
            </p>
            <Button className="mt-4" asChild>
              <a href="/book">Book a Workstation</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
