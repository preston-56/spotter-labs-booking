"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-sonner";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { BookingDetails } from "@/types/book";

interface UseBookingFormProps {
  defaultBookingDetails?: Partial<BookingDetails>;
  redirectPath?: string;
  redirectDelay?: number;
}

export const useBookingForm = ({
  defaultBookingDetails = {},
  redirectPath = "/dashboard",
  redirectDelay = 2000
}: UseBookingFormProps = {}) => {
  // Default empty booking values
  const emptyBookingDetails: BookingDetails = {
    cluster: "",
    floor: "",
    workstation: "",
    hotDesk: "",
    date: new Date(),
    timeSlot: ""
  };

  // Combine default form values with any passed props
  const initialBookingDetails = {
    ...emptyBookingDetails,
    ...defaultBookingDetails
  };

  const [bookingDetails, setBookingDetails] = useState<BookingDetails>(
    initialBookingDetails
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const toast = useToast();
  const router = useRouter();

  // Helper to validate all fields are filled
  const validateForm = () => {
    const { cluster, floor, workstation, hotDesk, date, timeSlot } =
      bookingDetails;
    if (!cluster || !floor || !workstation || !hotDesk || !date || !timeSlot) {
      toast.error("Please fill in all fields");

      return false;
    }
    return true;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // In a real app, an API call would go here
      // await createBooking(bookingDetails);

      // Success notification
      toast.success(
        `Your booking for ${format(bookingDetails.date!, "PPP")} at ${
          bookingDetails.timeSlot
        } has been confirmed.`
      );

      // Redirect to dashboard after successful booking
      if (redirectPath) {
        setTimeout(() => {
          router.push(redirectPath);
        }, redirectDelay);
      }
    } catch (error) {
      // Handle API errors
      toast.error(
        "There was an error processing your booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to initial state
  const handleReset = () => {
    setBookingDetails(initialBookingDetails);
    toast.success("All form fields have been reset.");
  };

  // Save as draft
  const handleSaveDraft = () => {
    // In a real app, you might save to local storage or to the server
    // localStorage.setItem('bookingDraft', JSON.stringify(bookingDetails));

    toast.success("Your booking draft has been saved successfully.");
  };

  // Update individual field values
  const updateField = <K extends keyof BookingDetails>(
    field: K,
    value: BookingDetails[K]
  ) => {
    setBookingDetails((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle cluster change (also resets dependent fields)
  const handleClusterChange = (value: string) => {
    setBookingDetails((prev) => ({
      ...prev,
      cluster: value,
      floor: "",
      workstation: "",
      hotDesk: ""
    }));
  };

  // Handle floor change (also resets dependent fields)
  const handleFloorChange = (value: string) => {
    setBookingDetails((prev) => ({
      ...prev,
      floor: value,
      workstation: "",
      hotDesk: ""
    }));
  };

  // Handle workstation change (also resets dependent fields)
  const handleWorkstationChange = (value: string) => {
    setBookingDetails((prev) => ({
      ...prev,
      workstation: value,
      hotDesk: ""
    }));
  };

  // Toggle floor map
  const toggleMap = () => {
    setShowMap((prev) => !prev);
  };

  return {
    bookingDetails,
    setBookingDetails,
    isSubmitting,
    showMap,
    toggleMap,
    handleSubmit,
    handleReset,
    handleSaveDraft,
    updateField,
    handleClusterChange,
    handleFloorChange,
    handleWorkstationChange,
    validateForm
  };
};
