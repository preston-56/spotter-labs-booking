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

  // Get booking ID from URL
  const bookingId = params?.id;

  useEffect(() => {
    // Find booking in mock data
    if (bookingId) {
      const foundBooking = mockBookings.find((b) => b.id === bookingId);

      if (foundBooking) {
        // Transform mock data to Booking interface
        const transformedBooking: Booking = {
          id: foundBooking.id,
          date: foundBooking.date,
          timeSlot: foundBooking.timeSlot,
          cluster: foundBooking.cluster,
          floor: foundBooking.floor,
          workstation: foundBooking.workstation,
          workstations: foundBooking.workstation, // Map to workstations
          // Generate workstationId from floor and workstation
          workstationId: `${foundBooking.floor.toLowerCase().replace(' ', '')}-${foundBooking.workstation.toLowerCase().replace(' ', '-')}`,
          hotDesk: foundBooking.hotDesk,
          // Default deskIndex since not in mock data
          deskIndex: 0, // Default since mock lacks deskIndex
          user: foundBooking.userName, // Map userName to user
          userId: foundBooking.userId,
          userName: foundBooking.userName,
          userEmail: foundBooking.userEmail,
          bookedBy: foundBooking.userName,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        setBooking(transformedBooking);
      } else {
        setBooking(null);
      }
    }
  }, [bookingId]);

  const handleReschedule = (id: string, details: BookingUpdateDetails) => {
    // Mock API call
    /*
    console.log(
      `Rescheduling booking ${id} to ${format(details.date, "PP")} at ${
        details.timeSlot
      }`
    );
    */

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
    // Mock API call
    /*console.log(`Cancelling booking ${id}`);*/

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