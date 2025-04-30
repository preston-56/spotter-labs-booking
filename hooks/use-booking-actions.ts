"use client";

import { useState } from "react";
import { BookingUpdateDetails } from "@/types/booking";
import { timeSlots } from "@/mocks/data";

export function useBookingActions(
  bookingId: string,
  initialDate: Date,
  initialTimeSlot: string,
  onReschedule: (id: string, details: BookingUpdateDetails) => void,
  onCancel: (id: string) => void
) {
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [newDate, setNewDate] = useState<Date | undefined>(initialDate);
  const [newTimeSlot, setNewTimeSlot] = useState(initialTimeSlot);

  const handleReschedule = () => {
    if (newDate) {
      onReschedule(bookingId, { date: newDate, timeSlot: newTimeSlot });
      setIsRescheduleOpen(false);
    }
  };

  const handleCancel = () => {
    onCancel(bookingId);
    setIsCancelOpen(false);
  };

  return {
    isRescheduleOpen,
    isCancelOpen,
    setIsRescheduleOpen,
    setIsCancelOpen,
    newDate,
    setNewDate,
    newTimeSlot,
    setNewTimeSlot,
    timeSlots,
    handleReschedule,
    handleCancel
  };
}
