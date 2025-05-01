import { useState } from "react";
import { useToast } from "@/hooks/use-sonner";
import { format } from "date-fns";

// Custom hook for booking functionality
export function useBooking() {
  const [booking, setBooking] = useState(false);
  const toast = useToast();

  const handleBooking = async (
    date: Date | undefined,
    selectedWorkstation: { floorName: string; workstation: string } | null,
    clearSelection: () => void
  ) => {
    if (!date || !selectedWorkstation) return;

    setBooking(true);

    try {
      // Simulate booking API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // You could replace the above with a real API call like:
      // await fetch('/api/book', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ date, workstation: selectedWorkstation }),
      // });

      clearSelection(); // Clear selection after successful booking
      // Format the date and show the success message in the toast
      const formattedDate = format(date, "PPPP"); // Format the date to 'May 13th, 2025'
      toast.success(
        `Booking successful for ${selectedWorkstation.workstation} on ${formattedDate}!`
      );
    } catch (err) {
      console.error("Booking failed:", err);
      toast.error("Booking failed. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  return { booking, handleBooking };
}
