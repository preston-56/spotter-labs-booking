import { useState } from "react";
import { Booking, BookingUpdateDetails } from "@/types/booking";
import { useToast } from "@/hooks/use-sonner";

interface UseBookingsProps {
  initialBookings: Booking[];
}

export const useBookings = ({ initialBookings }: UseBookingsProps) => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const toast = useToast();

  const rescheduleBooking = (bookingId: string, newDetails: BookingUpdateDetails) => {
    setBookings((prevBookings) => {
      const updatedBookings = prevBookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, date: newDetails.date, timeSlot: newDetails.timeSlot }
          : booking
      );
      return updatedBookings;
    });
    toast.success("Booking rescheduled successfully");
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
    toast.success("Booking cancelled successfully");
  };

  return {
    bookings,
    rescheduleBooking,
    cancelBooking,
  };
};
