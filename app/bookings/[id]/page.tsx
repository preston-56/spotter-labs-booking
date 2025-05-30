"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useBookingDetails } from "@/hooks/use-booking-details";
import { BookingNotFound } from "@/components/booking/booking-not-found";
import { BookingInfo } from "@/components/booking/booking-info";
import { QuickActions } from "@/components/booking/quick-actions";
import { SimilarWorkstations } from "@/components/booking/similar-workstations";

export default function BookingDetailPage() {
  const { booking, handleReschedule, handleCancel, router } =
    useBookingDetails();

  const handleBack = () => {
    router.push("/bookings");
  };

  if (!booking) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Button variant="ghost" className="mb-6" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <BookingNotFound onReturn={() => router.push("/dashboard")} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 space-y-6">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Booking Overview</h1>
        <Button
          variant="ghost"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="w-full">
          <BookingInfo
            booking={booking}
            onReschedule={handleReschedule}
            onCancel={handleCancel}
          />
        </div>

        <div className="md:col-span-2 w-full space-y-3">
          <QuickActions className="w-full" />
          <SimilarWorkstations booking={booking} />
        </div>
      </div>
    </div>
  );
}
