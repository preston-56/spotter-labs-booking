"use client";

import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-sonner";
import { BookingUpdateDetails, Booking } from "@/types";
import { useEffect, useState } from "react";
import { mockBookings } from "@/mocks";

export const useBookingDetails = () => {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const [booking, setBooking] = useState<Booking | null>(null);

  // Extract the booking ID from the URL parameters
  const bookingId = params?.id;

  useEffect(() => {
    // Find the booking in the mock data
    if (bookingId) {
      const foundBooking = mockBookings.find((b) => b.id === bookingId);
      setBooking(foundBooking || null);
    }
  }, [bookingId]);

  const handleReschedule = (id: string, details: BookingUpdateDetails) => {
    // Simulate API call
    console.log(
      `Rescheduling booking ${id} to ${format(details.date, "PP")} at ${
        details.timeSlot
      }`
    );

    toast.success(
      `Your booking has been rescheduled to ${format(details.date, "PP")} at ${
        details.timeSlot
      }.`
    );

    setTimeout(() => {
      router.back();
    }, 1500);
  };

  const handleCancel = (id: string) => {
    // Simulate API call
    console.log(`Cancelling booking ${id}`);

    toast.success("Your booking has been cancelled successfully.");

    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return {
    booking,
    handleReschedule,
    handleCancel,
    router
  };
};
