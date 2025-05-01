"use client"

import { RecentBookingsProps } from "@/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const RecentBookings = ({ bookings }: RecentBookingsProps) => {
  const router = useRouter();

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">Recent Bookings</h3>
      {bookings.length > 0 ? (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col md:flex-row md:items-center justify-between rounded-lg border p-3 hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => router.push(`/bookings/${booking.id}`)}
            >
              <div className="space-y-1">
                <div className="font-medium">{format(booking.date, "PPP")}</div>
                <div className="text-sm text-muted-foreground">{booking.timeSlot}</div>
              </div>
              <div className="space-y-1 mt-2 md:mt-0">
                <div className="font-medium">
                  {booking.floor}, {booking.workstation}
                </div>
                <div className="text-sm text-muted-foreground">{booking.hotDesk}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border p-6 text-center">
          <p className="text-muted-foreground">No recent bookings for this cluster.</p>
        </div>
      )}
    </div>
  );
};

export default RecentBookings;